import os
from typing import Optional
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase credentials not found in .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def save_review(
    code: str,
    review: str,
    language: str,
    user_id: Optional[str] = None,
    repo_url: Optional[str] = None
):
    try:
        data = {
            "code": code,
            "review": review,
            "language": language,
            "user_id": user_id
        }
        if repo_url:
            data["repo_url"] = repo_url

        response = supabase.table("reviews").insert(data).execute()
        return response

    except Exception as e:
        print("Supabase save error:", str(e))
        raise


def get_user_reviews(user_id: str):
    try:
        response = supabase.table("reviews") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("created_at", desc=True) \
            .execute()
        return response.data

    except Exception as e:
        print("Error fetching reviews:", str(e))
        return []


def get_cached_repo_review(repo_url: str, user_id: Optional[str] = None):
    """
    Check if a GitHub repo has already been reviewed using the dedicated repo_url column.
    Returns the most recent matching review, or None if no cache hit.
    """
    try:
        query = supabase.table("reviews") \
            .select("*") \
            .eq("language", "github-repo") \
            .eq("repo_url", repo_url) \
            .order("created_at", desc=True) \
            .limit(1)

        if user_id:
            query = query.eq("user_id", user_id)

        response = query.execute()
        return response.data[0] if response.data else None

    except Exception as e:
        print("Cache lookup error:", str(e))
        return None
