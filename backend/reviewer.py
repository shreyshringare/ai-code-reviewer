# reviewer.py

import os
import time
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

client = genai.Client(api_key=API_KEY)
MODEL = "gemini-2.5-flash"

SYSTEM_INSTRUCTION = (
    "You are a senior software engineer and expert code reviewer. "
    "You write precise, actionable, and structured feedback."
)


def safe_generate(prompt: str) -> str:
    """
    Calls Gemini with automatic retry on rate-limit (429) errors.
    Waits 60 seconds before retrying. Re-raises all other errors immediately.
    """
    while True:
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_INSTRUCTION,
                    temperature=0.3
                )
            )
            return response.text if response and response.text else "No suggestions generated."
        except Exception as e:
            if "429" in str(e) or "quota" in str(e).lower() or "rate" in str(e).lower():
                print(f"Gemini rate limit hit. Waiting 60 seconds before retry... ({e})")
                time.sleep(60)
            else:
                raise



def review_code(code: str) -> str:
    """Review a single code snippet with Gemini AI."""
    if not isinstance(code, str) or not code.strip():
        return "Error: Invalid code input."
    try:
        prompt = f"""Review the following code carefully.

Provide:
1. Bugs or errors
2. Improvements
3. Performance optimizations
4. Best practices
5. Security concerns (if any)

Code:
{code}
"""
        return safe_generate(prompt)
    except Exception as e:
        print("Gemini API Error:", str(e))
        return "Error reviewing code. Please try again."


def review_repo(combined_code: str, file_paths: list[str]) -> str:
    """
    Review an entire GitHub repository in ONE Gemini call.
    Receives pre-combined code string and list of included file paths.
    """
    if not isinstance(combined_code, str) or not combined_code.strip():
        return "Error: No code provided."

    file_list = "\n".join(f"  - {p}" for p in file_paths)

    try:
        prompt = f"""You are reviewing a GitHub repository.

The following files were included in this review:
{file_list}

Analyze the entire codebase and provide a structured report covering:

1. **Overall Architecture** — structure, design patterns, module organisation
2. **Major Bugs & Errors** — logic errors, potential crashes, incorrect assumptions
3. **Security Concerns** — injection risks, exposed secrets, insecure operations
4. **Performance Issues** — inefficient algorithms, unnecessary computation, I/O bottlenecks
5. **Code Quality** — readability, naming conventions, dead code, duplication
6. **Best Practices** — SOLID principles, error handling, testing, documentation
7. **Actionable Recommendations** — a prioritised list of the most important changes to make

--- CODEBASE START ---
{combined_code}
--- CODEBASE END ---
"""
        return safe_generate(prompt)
    except Exception as e:
        print("Gemini Repo Review Error:", str(e))
        return f"Error reviewing repository: {str(e)}"