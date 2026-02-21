from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from reviewer import review_code, review_repo
from supabase_client import save_review, get_user_reviews, get_cached_repo_review
from typing import Optional
from auth import get_user_id_from_token
from github_fetcher import fetch_combined_code, GitHubFetchError, RepoNotFoundError, RateLimitError

app = FastAPI(
    title = "Ai Code Reviewer API",
    version = "1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_headers = ["*"],
    allow_methods = ["*"],
)


# 1. Use Pydantic for Data Validation
class ReviewRequest(BaseModel):
    code: str
    language: str = "javascript"
    user_id: Optional[str] = None


class GithubReviewRequest(BaseModel):
    repo_url: str
    user_id: Optional[str] = None


# 2. True Health Check Endpoint
@app.get("/")
def health_check():
    return {
        "status": "Backend is running",
        "message": "AI Code Reviewer API Ready"
    }



# 3.5 Get User Reviews Endpoint
@app.get("/reviews")
def get_reviews(user_id: str):

    try:

        if not user_id:
            return {
                "success": False,
                "error": "user_id is required"
            }

        reviews = get_user_reviews(user_id)

        return {
            "success": True,
            "reviews": reviews
        }

    except Exception as e:

        print("Get reviews error:", str(e))

        return {
            "success": False,
            "error": str(e)
        }


# 4. Main Review Endpoint
@app.post("/review")
def review_endpoint(request: ReviewRequest):

    try:

        if not request.code.strip():

            raise HTTPException(
                status_code=400,
                detail="Code cannot be empty"
            )

        # Use user_id directly from request body (sent by frontend)
        user_id = request.user_id
        print(f"DEBUG MAIN: user_id from request body: {user_id}")

        # Call Gemini reviewer
        result = review_code(request.code)

        # Detect language (optional simple detection)
        language = request.language

        # Save to Supabase
        save_review(
            code=request.code,
            review=result,
            language=language,
            user_id=user_id
        )

        return {
            "success": True,
            "review": result
        }

    except Exception as e:

        print("Review endpoint error:", str(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to review code"
        )


# 5. GitHub Repo Review Endpoint
@app.post("/github-review")
def github_review_endpoint(request: GithubReviewRequest):
    """
    Fetch all source files from a GitHub repo, combine them,
    then review in ONE Gemini call. Saves result to Supabase.
    """
    try:
        if not request.repo_url.strip():
            raise HTTPException(status_code=400, detail="repo_url cannot be empty")

        # Step 1 — Check cache (avoid redundant Gemini calls)
        cached = get_cached_repo_review(request.repo_url, request.user_id)
        if cached:
            print(f"Cache hit for {request.repo_url}")
            import json
            try:
                file_paths = json.loads(cached["code"]).get("files", [])
            except Exception:
                file_paths = []
            return {
                "success": True,
                "cached": True,
                "repo_url": cached.get("repo_url", request.repo_url),
                "files_reviewed": len(file_paths),
                "file_paths": file_paths,
                "review": cached["review"]
            }

        # Step 2 — Fetch + combine all files into one string
        try:
            combined_code, file_paths = fetch_combined_code(request.repo_url)
        except RepoNotFoundError as e:
            raise HTTPException(status_code=404, detail=str(e))
        except RateLimitError as e:
            raise HTTPException(status_code=429, detail=str(e))
        except GitHubFetchError as e:
            raise HTTPException(status_code=400, detail=str(e))

        # Step 3 — ONE Gemini call for the whole repo
        review = review_repo(combined_code, file_paths)


        # Step 4 — Save to Supabase
        import json
        try:
            save_review(
                code=json.dumps({"files": file_paths}),
                review=review,
                language="github-repo",
                user_id=request.user_id,
                repo_url=request.repo_url
            )
        except Exception as e:
            print(f"Supabase save warning (non-fatal): {e}")



        return {
            "success": True,
            "repo_url": request.repo_url,
            "files_reviewed": len(file_paths),
            "file_paths": file_paths,
            "review": review
        }

    except HTTPException:
        raise
    except Exception as e:
        print("GitHub review endpoint error:", str(e))
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
