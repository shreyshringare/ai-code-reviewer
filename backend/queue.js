// queue.js — BullMQ background job queue for GitHub repository reviews
//
// Why: GitHub repo reviews take 30–60 s.  Blocking the HTTP request that long
// is fragile (timeouts, dropped connections, no retry).  Instead the API
// returns a job ID immediately (202) and the worker processes the review in the
// background.  The client polls GET /review-job/:id until state === "completed".
//
// Architecture:
//   server.js  →  githubReviewQueue.add()  →  Redis (BullMQ)
//   worker (same process, could be split)  ←  picks up job, runs AI, saves DB
//   client      →  GET /review-job/:id     ←  reads job state from Redis

const { Queue, Worker } = require("bullmq");
const config = require("./config");
const logger = require("./logger");
const { fetchCombinedCode, RepoNotFoundError, RateLimitError, GitHubFetchError } = require("./githubFetcher");
const { reviewRepo } = require("./reviewer");
const { saveReview } = require("./supabaseClient");

const connection = {
  host: config.redisHost,
  port: config.redisPort,
  ...(config.redisPassword ? { password: config.redisPassword } : {}),
};

// ── Queue (producer side — used by server.js to enqueue jobs) ─────────────────
const githubReviewQueue = new Queue("github-review", {
  connection,
  defaultJobOptions: {
    attempts: 2,                          // retry once on transient failure
    backoff: { type: "exponential", delay: 10_000 },
    removeOnComplete: { age: 60 * 60 },  // keep completed jobs for 1 hour
    removeOnFail: { age: 24 * 60 * 60 }, // keep failed jobs for 24 hours
  },
});

// ── Worker (consumer side — runs in the same process for simplicity) ──────────
// For production with high load, move this to a separate worker.js entry point.
const githubReviewWorker = new Worker(
  "github-review",
  async (job) => {
    const { repo_url, userId } = job.data;
    const log = logger.child({ jobId: job.id, repo_url });

    log.info("GitHub review job started");

    // Fetch repo files — propagate typed errors so BullMQ stores them cleanly
    let combinedCode, filePaths, truncated;
    try {
      ({ combinedCode, filePaths, truncated } = await fetchCombinedCode(repo_url));
    } catch (err) {
      // Tag the error so the status endpoint can map it to the right HTTP code
      if (err instanceof RepoNotFoundError) err.code = "REPO_NOT_FOUND";
      if (err instanceof RateLimitError)    err.code = "RATE_LIMIT";
      if (err instanceof GitHubFetchError)  err.code = "FETCH_ERROR";
      log.error({ err: err.message, code: err.code }, "Repo fetch failed");
      throw err;
    }

    log.info({ fileCount: filePaths.length, truncated }, "Repo fetched — running AI review");
    await job.updateProgress(30);

    let review = await reviewRepo(combinedCode, filePaths);
    if (truncated) {
      review =
        `> ⚠️ **Partial Review:** The repository was too large to analyze in full. ` +
        `Only the files listed above were included.\n\n${review}`;
    }

    await job.updateProgress(90);

    await saveReview({
      code: JSON.stringify({ files: filePaths }),
      review,
      language: "github-repo",
      userId,
      repoUrl: repo_url,
    });

    log.info({ fileCount: filePaths.length }, "GitHub review job complete");

    // Return value is stored in job.returnvalue — readable via GET /review-job/:id
    return { review, filePaths, repo_url, truncated };
  },
  {
    connection,
    concurrency: 2, // process up to 2 repo reviews in parallel
  }
);

githubReviewWorker.on("failed", (job, err) => {
  logger.error(
    { jobId: job?.id, repo_url: job?.data?.repo_url, err: err.message },
    "GitHub review job failed"
  );
});

githubReviewWorker.on("error", (err) => {
  logger.error({ err: err.message }, "BullMQ worker error");
});

module.exports = { githubReviewQueue };
