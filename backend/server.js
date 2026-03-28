// server.js — SnapCode Express API

const config = require("./config");

// ── Sentry — initialise before anything else so it can catch all errors ───────
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: config.sentryDsn,
  environment: config.nodeEnv,
  enabled: !!config.sentryDsn,       // silently disabled when DSN is absent
  tracesSampleRate: 0.2,             // capture 20 % of transactions for perf monitoring
});

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { randomUUID } = require("crypto");
const logger = require("./logger");

const { reviewCode, reviewCodeStream, reviewRepo } = require("./reviewer");
const { saveReview, getUserReviews, getCachedRepoReview } = require("./supabaseClient");
const { getCachedReview, setCachedReview } = require("./cache");
const { githubReviewQueue } = require("./queue");
const {
  fetchCombinedCode,
  GitHubFetchError,
  RepoNotFoundError,
  RateLimitError,
} = require("./githubFetcher");
const { requireAuth, optionalAuth } = require("./auth");
const { generalLimiter, reviewLimiter, githubReviewLimiter } = require("./middleware/rateLimiter");
const {
  validate,
  validateQuery,
  reviewSchema,
  githubReviewSchema,
  paginationQuerySchema,
} = require("./middleware/validate");

const app = express();

// ── Global Middleware ─────────────────────────────────────────────────────────

// Attach a unique reviewId to every request so all log lines for one session
// share the same ID — makes it easy to trace a review end-to-end in the logs.
app.use((req, _res, next) => {
  req.reviewId = randomUUID();
  req.log = logger.child({ reviewId: req.reviewId });
  next();
});

// Helmet sets ~11 secure HTTP headers (X-Frame-Options, HSTS, CSP, etc.) in one call.
// Must come before any route that sends a response.
app.use(helmet());

app.use(
  cors({
    origin: config.frontendUrl,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(generalLimiter);

// ── Response Helpers ──────────────────────────────────────────────────────────

/** Send a successful JSON response with a consistent shape. */
function ok(res, data = {}, message = "OK", status = 200) {
  return res.status(status).json({ success: true, status, message, ...data });
}

/** Send an error JSON response with a consistent shape. */
function fail(res, status, message, error = null) {
  const body = { success: false, status, message };
  if (error) body.error = error;
  return res.status(status).json(body);
}

function isRateLimitError(err) {
  const msg = String(err?.message || err);
  return msg.includes("429") || /quota|rate.?limit/i.test(msg);
}

// ── Routes ────────────────────────────────────────────────────────────────────

// 1. Health Check
app.get("/", (_req, res) => {
  ok(res, { api: "SnapCode", version: "1.0.0" }, "API is running");
});

// 2. GET /reviews — paginated review history (requires auth)
app.get("/reviews", requireAuth, validateQuery(paginationQuerySchema), async (req, res) => {
  try {
    const { limit, page } = req.query;
    const result = await getUserReviews(req.user_id, { limit, page });
    req.log.info({ count: result.reviews.length, page }, "Reviews fetched");
    return ok(res, result, "Reviews fetched successfully");
  } catch (err) {
    req.log.error({ err: err.message }, "GET /reviews failed");
    return fail(res, 500, "Failed to fetch reviews", err.message);
  }
});

// 3. POST /review — single code snippet review (blocking, optional auth)
//    Checks Redis cache first — returns instantly on hit, saves AI cost on miss.
app.post("/review", optionalAuth, reviewLimiter, validate(reviewSchema), async (req, res) => {
  const { code, language } = req.body;
  req.log.info({ language, codeLength: code.length }, "Review requested");

  // ── Cache check ────────────────────────────────────────────────────────────
  const cached = await getCachedReview(code);
  if (cached) {
    req.log.info({ language }, "Review cache hit");
    return ok(res, { review: cached, cached: true }, "Review returned from cache");
  }

  // ── AI review ──────────────────────────────────────────────────────────────
  try {
    const review = await reviewCode(code);

    // Write to cache in background — never block the response
    setCachedReview(code, review).catch(() => {});

    // Persist to Supabase in background — save failure must not fail the response
    saveReview({ code, review, language, userId: req.user_id }).catch((err) =>
      req.log.warn({ err: err.message }, "Supabase save warning (non-fatal)")
    );

    req.log.info({ language }, "Review generated successfully");
    return ok(res, { review, cached: false }, "Review generated successfully");
  } catch (err) {
    req.log.error({ err: err.message }, "POST /review failed");
    if (isRateLimitError(err))
      return fail(res, 429, "AI rate limit reached", "Please wait a moment and try again.");
    return fail(res, 500, "Review failed", "An error occurred while reviewing your code.");
  }
});

// 4. POST /review/stream — SSE streaming code review (optional auth)
app.post(
  "/review/stream",
  optionalAuth,
  reviewLimiter,
  validate(reviewSchema),
  async (req, res) => {
    const { code, language } = req.body;

    // Set SSE headers before any streaming begins
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no"); // disable Nginx proxy buffering
    res.flushHeaders();

    const sendEvent = (payload) => {
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
      if (typeof res.flush === "function") res.flush();
    };

    let fullReview = "";

    // Graceful teardown if the client disconnects mid-stream
    let aborted = false;
    req.on("close", () => { aborted = true; });

    req.log.info({ language, codeLength: code.length }, "Stream review requested");
    try {
      await reviewCodeStream(code, (chunk) => {
        if (aborted) return;
        fullReview += chunk;
        sendEvent({ type: "token", content: chunk });
      });

      if (!aborted) {
        sendEvent({ type: "done" });
        req.log.info({ language, reviewLength: fullReview.length }, "Stream review complete");

        // Background: cache + persist
        setCachedReview(code, fullReview).catch(() => {});
        saveReview({ code, review: fullReview, language, userId: req.user_id }).catch((err) =>
          req.log.warn({ err: err.message }, "Supabase save warning (non-fatal)")
        );
      }
    } catch (err) {
      req.log.error({ err: err.message }, "POST /review/stream failed");
      if (!aborted) {
        sendEvent({
          type: "error",
          status: isRateLimitError(err) ? 429 : 500,
          message: isRateLimitError(err)
            ? "AI rate limit reached — please wait and try again."
            : "Review failed — an unexpected error occurred.",
        });
      }
    } finally {
      res.end();
    }
  }
);

// 5. POST /github-review — enqueue a background repo review, return job ID
//    Heavy work (fetch repo + AI) runs in the BullMQ worker so this responds
//    in milliseconds.  Poll GET /review-job/:id to get the result.
app.post(
  "/github-review",
  optionalAuth,
  githubReviewLimiter,
  validate(githubReviewSchema),
  async (req, res) => {
    const { repo_url } = req.body;
    req.log.info({ repo_url }, "GitHub review requested");

    // ── Supabase cache check (sync DB lookup, fast) ─────────────────────────
    try {
      const cached = await getCachedRepoReview(repo_url, req.user_id).catch(() => null);
      if (cached) {
        let filePaths = [];
        try { filePaths = JSON.parse(cached.code)?.files || []; } catch {}
        req.log.info({ repo_url, fileCount: filePaths.length }, "GitHub review cache hit");
        return ok(
          res,
          {
            cached: true,
            repo_url: cached.repo_url || repo_url,
            files_reviewed: filePaths.length,
            file_paths: filePaths,
            review: cached.review,
          },
          "Cached review returned"
        );
      }
    } catch (err) {
      req.log.warn({ err: err.message }, "Cache lookup failed — proceeding to queue");
    }

    // ── Enqueue background job ──────────────────────────────────────────────
    try {
      const job = await githubReviewQueue.add("review", {
        repo_url,
        userId: req.user_id,
      });
      req.log.info({ repo_url, jobId: job.id }, "GitHub review job enqueued");
      return ok(
        res,
        { jobId: job.id },
        "Review queued — poll GET /review-job/:id for progress",
        202
      );
    } catch (err) {
      req.log.error({ err: err.message, repo_url }, "Failed to enqueue GitHub review job");
      return fail(res, 500, "Failed to queue review", err.message);
    }
  }
);

// 6. GET /review-job/:id — poll for a background job's status and result
app.get("/review-job/:id", async (req, res) => {
  try {
    const job = await githubReviewQueue.getJob(req.params.id);
    if (!job) return fail(res, 404, "Job not found");

    const state = await job.getState();   // waiting | active | completed | failed
    const progress = job.progress || 0;

    if (state === "completed") {
      const { review, filePaths, repo_url, truncated } = job.returnvalue;
      return ok(
        res,
        {
          state,
          progress: 100,
          repo_url,
          files_reviewed: filePaths.length,
          file_paths: filePaths,
          truncated,
          review,
        },
        "Review complete"
      );
    }

    if (state === "failed") {
      // Map error codes back to HTTP statuses so the client can react correctly
      const reason = job.failedReason || "";
      if (reason.includes("REPO_NOT_FOUND"))
        return fail(res, 404, "Repository not found", reason);
      if (reason.includes("RATE_LIMIT"))
        return fail(res, 429, "GitHub API rate limit exceeded", reason);
      return fail(res, 500, "Review failed", reason);
    }

    return ok(res, { state, progress }, `Job is ${state}`);
  } catch (err) {
    logger.error({ err: err.message, jobId: req.params.id }, "GET /review-job failed");
    return fail(res, 500, "Failed to fetch job status", err.message);
  }
});

// ── 404 Fallback ──────────────────────────────────────────────────────────────
app.use((_req, res) => fail(res, 404, "Route not found"));

// ── Sentry Error Handler ──────────────────────────────────────────────────────
// Must be the last middleware registered — captures any unhandled throws.
Sentry.setupExpressErrorHandler(app);

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(config.port, () => {
  logger.info({ port: config.port }, "SnapCode API running");
});
