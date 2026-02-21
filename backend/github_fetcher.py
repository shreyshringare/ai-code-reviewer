"""
github_fetcher.py

Fetches source code files from a public GitHub repository
and returns them combined into a single string for a one-shot Gemini review.
"""

import os
import re
import time
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

HEADERS = {"Accept": "application/vnd.github+json"}
if GITHUB_TOKEN:
    HEADERS["Authorization"] = f"Bearer {GITHUB_TOKEN}"

EXT_LANGUAGE_MAP = {
    "py": "python",
    "js": "javascript", "jsx": "javascript",
    "ts": "typescript", "tsx": "typescript",
    "cpp": "cpp", "cc": "cpp", "cxx": "cpp",
    "c": "c", "h": "c",
    "cs": "csharp",
    "java": "java",
    "go": "go",
    "rs": "rust",
    "kt": "kotlin",
    "php": "php",
    "rb": "ruby",
    "swift": "swift",
    "sh": "shell", "bash": "shell",
    "html": "html", "htm": "html",
    "css": "css", "scss": "scss",
    "sql": "sql",
    "json": "json",
    "yaml": "yaml", "yml": "yaml",
    "xml": "xml",
    "md": "markdown",
}

SKIP_PATH_PATTERNS = [
    "node_modules/", ".git/", "dist/", "build/", "__pycache__/",
    ".venv/", "venv/", ".mypy_cache/", "coverage/",
    "vendor/", "target/", "bin/", "obj/",
    "package-lock.json", "yarn.lock", "poetry.lock",
]

MAX_FILE_SIZE_BYTES = 60 * 1024    # 60 KB per file
MAX_FILES = 20                      # Max files fetched
MAX_COMBINED_CHARS = 30_000        # Hard cap before sending to Gemini
MAX_WORKERS = 5
REQUEST_TIMEOUT = 12


# --- Exceptions ---

class GitHubFetchError(Exception):
    pass

class RepoNotFoundError(GitHubFetchError):
    pass

class RateLimitError(GitHubFetchError):
    pass


# --- Helpers ---

def parse_github_url(repo_url: str) -> tuple[str, str, str | None]:
    url = repo_url.strip().rstrip("/")
    match = re.match(r"https?://github\.com/([^/]+)/([^/]+)/tree/([^/]+)/?$", url)
    if match:
        return match.group(1), match.group(2).removesuffix(".git"), match.group(3)
    match = re.match(r"https?://github\.com/([^/]+)/([^/]+?)(?:\.git)?$", url)
    if match:
        return match.group(1), match.group(2), None
    raise GitHubFetchError(f"Invalid GitHub URL: '{repo_url}'")


def _get(url: str, retries: int = 3) -> requests.Response:
    delay = 2
    for attempt in range(retries):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        except requests.RequestException as e:
            if attempt == retries - 1:
                raise GitHubFetchError(f"Network error: {e}") from e
            time.sleep(delay); delay *= 2; continue

        if resp.status_code == 200:
            return resp
        if resp.status_code == 404:
            raise RepoNotFoundError(f"Repository not found: {url}")
        if resp.status_code in (403, 429):
            reset = resp.headers.get("X-RateLimit-Reset", "unknown")
            raise RateLimitError(
                f"GitHub rate limit exceeded. Reset at: {reset}. "
                "Add GITHUB_TOKEN to .env for higher limits."
            )
        if resp.status_code >= 500 and attempt < retries - 1:
            time.sleep(delay); delay *= 2; continue
        resp.raise_for_status()

    raise GitHubFetchError(f"Failed to GET {url} after {retries} attempts.")


def _resolve_default_branch(owner: str, repo: str) -> str:
    url = f"https://api.github.com/repos/{owner}/{repo}"
    return _get(url).json().get("default_branch", "main")


def _get_tree(owner: str, repo: str, branch: str) -> list[dict]:
    url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1"
    data = _get(url).json()
    if data.get("truncated"):
        print(f"WARNING: Repo tree truncated at {len(data['tree'])} items.")
    return data.get("tree", [])


def _ext_from_path(path: str) -> str:
    return path.rsplit(".", 1)[-1].lower() if "." in path else ""


def _should_skip(path: str) -> bool:
    return any(p in path for p in SKIP_PATH_PATTERNS)


def _fetch_raw(owner: str, repo: str, branch: str, path: str) -> str | None:
    url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}"
    try:
        return _get(url).text
    except Exception as e:
        print(f"  Skipping '{path}': {e}")
        return None


# --- Main functions ---

def fetch_repo_files(repo_url: str) -> list[dict]:
    """
    Fetch individual file dicts. Kept for advanced use.
    Returns: [{"path", "content", "language", "size"}, ...]
    """
    owner, repo, branch = parse_github_url(repo_url)
    if not branch:
        branch = _resolve_default_branch(owner, repo)

    tree = _get_tree(owner, repo, branch)

    candidates = sorted([
        item for item in tree
        if item.get("type") == "blob"
        and _ext_from_path(item["path"]) in EXT_LANGUAGE_MAP
        and item.get("size", 0) <= MAX_FILE_SIZE_BYTES
        and not _should_skip(item["path"])
    ], key=lambda x: x["path"])[:MAX_FILES]

    results = []
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {
            executor.submit(_fetch_raw, owner, repo, branch, item["path"]): item
            for item in candidates
        }
        for future in as_completed(futures):
            item = futures[future]
            content = future.result()
            if content:
                ext = _ext_from_path(item["path"])
                results.append({
                    "path": item["path"],
                    "content": content,
                    "language": EXT_LANGUAGE_MAP.get(ext, "text"),
                    "size": len(content.encode())
                })

    results.sort(key=lambda x: x["path"])
    return results


def fetch_combined_code(repo_url: str) -> tuple[str, list[str]]:
    """
    Fetch all code files from a repo and combine into a SINGLE string
    formatted for one Gemini call. Enforces the MAX_COMBINED_CHARS cap.

    Returns:
        combined_code (str): All file contents joined with headers
        file_paths (list[str]): List of included file paths
    """
    files = fetch_repo_files(repo_url)

    if not files:
        raise GitHubFetchError("No reviewable source files found in this repository.")

    combined = ""
    included_paths = []

    for f in files:
        header = f"\n\n{'='*60}\n// FILE: {f['path']}  [{f['language']}]\n{'='*60}\n"
        block = header + f["content"]

        if len(combined) + len(block) > MAX_COMBINED_CHARS:
            print(f"  Token cap reached. Skipping remaining files (stopped at {f['path']}).")
            break

        combined += block
        included_paths.append(f["path"])

    print(f"Combined {len(included_paths)} files → {len(combined):,} chars (cap: {MAX_COMBINED_CHARS:,})")
    return combined, included_paths
