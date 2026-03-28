// githubFetcher.js — Fetch source code from public GitHub repositories

/**
 * Fetches source code files from a public GitHub repository
 * and returns them combined into a single string for a one-shot Gemini review.
 */

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const HEADERS = { Accept: "application/vnd.github+json" };
if (GITHUB_TOKEN) {
  HEADERS.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

const EXT_LANGUAGE_MAP = {
  py: "python",
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  cpp: "cpp",
  cc: "cpp",
  cxx: "cpp",
  c: "c",
  h: "c",
  cs: "csharp",
  java: "java",
  go: "go",
  rs: "rust",
  kt: "kotlin",
  php: "php",
  rb: "ruby",
  swift: "swift",
  sh: "shell",
  bash: "shell",
  html: "html",
  htm: "html",
  css: "css",
  scss: "scss",
  sql: "sql",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  xml: "xml",
  md: "markdown",
};

const SKIP_PATH_PATTERNS = [
  "node_modules/",
  ".git/",
  "dist/",
  "build/",
  "__pycache__/",
  ".venv/",
  "venv/",
  ".mypy_cache/",
  "coverage/",
  "vendor/",
  "target/",
  "bin/",
  "obj/",
  "package-lock.json",
  "yarn.lock",
  "poetry.lock",
];

const MAX_FILE_SIZE_BYTES = 60 * 1024; // 60 KB per file
const MAX_FILES = 20;
const MAX_COMBINED_CHARS = 30_000;
const MAX_WORKERS = 5;
const REQUEST_TIMEOUT = 12_000; // ms

// --- Custom Error Classes ---

class GitHubFetchError extends Error {
  constructor(message) {
    super(message);
    this.name = "GitHubFetchError";
  }
}

class RepoNotFoundError extends GitHubFetchError {
  constructor(message) {
    super(message);
    this.name = "RepoNotFoundError";
  }
}

class RateLimitError extends GitHubFetchError {
  constructor(message) {
    super(message);
    this.name = "RateLimitError";
  }
}

// --- Helpers ---

function parseGithubUrl(repoUrl) {
  const url = repoUrl.trim().replace(/\/+$/, "");

  // Match: https://github.com/owner/repo/tree/branch
  let match = url.match(
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/tree\/([^/]+)\/?$/
  );
  if (match) {
    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, ""),
      branch: match[3],
    };
  }

  // Match: https://github.com/owner/repo
  match = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/);
  if (match) {
    return { owner: match[1], repo: match[2], branch: null };
  }

  throw new GitHubFetchError(`Invalid GitHub URL: '${repoUrl}'`);
}

async function fetchWithRetry(url, retries = 3) {
  let delay = 2000;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      const resp = await fetch(url, {
        headers: HEADERS,
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (resp.ok) return resp;

      if (resp.status === 404) {
        throw new RepoNotFoundError(`Repository not found: ${url}`);
      }

      if (resp.status === 403 || resp.status === 429) {
        const reset = resp.headers.get("X-RateLimit-Reset") || "unknown";
        throw new RateLimitError(
          `GitHub rate limit exceeded. Reset at: ${reset}. Add GITHUB_TOKEN to .env for higher limits.`
        );
      }

      if (resp.status >= 500 && attempt < retries - 1) {
        await new Promise((r) => setTimeout(r, delay));
        delay *= 2;
        continue;
      }

      throw new GitHubFetchError(
        `GitHub API returned ${resp.status} for ${url}`
      );
    } catch (err) {
      if (
        err instanceof GitHubFetchError ||
        err instanceof RepoNotFoundError ||
        err instanceof RateLimitError
      ) {
        throw err;
      }
      if (attempt === retries - 1) {
        throw new GitHubFetchError(`Network error: ${err.message || err}`);
      }
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2;
    }
  }

  throw new GitHubFetchError(`Failed to GET ${url} after ${retries} attempts.`);
}

async function resolveDefaultBranch(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const resp = await fetchWithRetry(url);
  const data = await resp.json();
  return data.default_branch || "main";
}

async function getTree(owner, repo, branch) {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  const resp = await fetchWithRetry(url);
  const data = await resp.json();
  if (data.truncated) {
    console.log(
      `WARNING: Repo tree truncated at ${data.tree?.length || 0} items.`
    );
  }
  return data.tree || [];
}

function extFromPath(path) {
  if (!path.includes(".")) return "";
  return path.split(".").pop().toLowerCase();
}

function shouldSkip(path) {
  return SKIP_PATH_PATTERNS.some((pattern) => path.includes(pattern));
}

async function fetchRaw(owner, repo, branch, path) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
  try {
    const resp = await fetchWithRetry(url);
    return await resp.text();
  } catch (err) {
    console.log(`  Skipping '${path}': ${err.message || err}`);
    return null;
  }
}

// --- Main Functions ---

/**
 * Fetch individual file dicts from a GitHub repo.
 * Returns: [{ path, content, language, size }, ...]
 */
async function fetchRepoFiles(repoUrl) {
  const { owner, repo, branch: explicitBranch } = parseGithubUrl(repoUrl);
  const branch = explicitBranch || (await resolveDefaultBranch(owner, repo));

  const tree = await getTree(owner, repo, branch);

  // Filter and sort candidates
  const candidates = tree
    .filter(
      (item) =>
        item.type === "blob" &&
        extFromPath(item.path) in EXT_LANGUAGE_MAP &&
        (item.size || 0) <= MAX_FILE_SIZE_BYTES &&
        !shouldSkip(item.path)
    )
    .sort((a, b) => a.path.localeCompare(b.path))
    .slice(0, MAX_FILES);

  // Fetch files in parallel batches (MAX_WORKERS at a time)
  const results = [];
  for (let i = 0; i < candidates.length; i += MAX_WORKERS) {
    const batch = candidates.slice(i, i + MAX_WORKERS);
    const batchResults = await Promise.all(
      batch.map(async (item) => {
        const content = await fetchRaw(owner, repo, branch, item.path);
        if (content) {
          const ext = extFromPath(item.path);
          return {
            path: item.path,
            content,
            language: EXT_LANGUAGE_MAP[ext] || "text",
            size: Buffer.byteLength(content, "utf8"),
          };
        }
        return null;
      })
    );
    results.push(...batchResults.filter(Boolean));
  }

  results.sort((a, b) => a.path.localeCompare(b.path));
  return results;
}

/**
 * Fetch all code files from a repo and combine into a SINGLE string
 * formatted for one Gemini call. Enforces the MAX_COMBINED_CHARS cap.
 *
 * @returns {{ combinedCode: string, filePaths: string[] }}
 */
async function fetchCombinedCode(repoUrl) {
  const files = await fetchRepoFiles(repoUrl);

  if (!files.length) {
    throw new GitHubFetchError(
      "No reviewable source files found in this repository."
    );
  }

  let combined = "";
  const includedPaths = [];
  let truncated = false;

  for (const f of files) {
    const header = `\n\n${"=".repeat(60)}\n// FILE: ${f.path}  [${f.language}]\n${"=".repeat(60)}\n`;
    const block = header + f.content;

    if (combined.length + block.length > MAX_COMBINED_CHARS) {
      console.log(
        `  Token cap reached. Skipping remaining files (stopped at ${f.path}).`
      );
      truncated = true;
      break;
    }

    combined += block;
    includedPaths.push(f.path);
  }

  console.log(
    `Combined ${includedPaths.length} files → ${combined.length.toLocaleString()} chars (cap: ${MAX_COMBINED_CHARS.toLocaleString()})`
  );

  return { combinedCode: combined, filePaths: includedPaths, truncated };
}

module.exports = {
  fetchCombinedCode,
  fetchRepoFiles,
  GitHubFetchError,
  RepoNotFoundError,
  RateLimitError,
};
