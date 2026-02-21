# reviewer.py

import os
from dotenv import load_dotenv
from google import genai
from google.genai import types


# Load environment variables
load_dotenv()


# Get API key
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")


# Initialize Gemini client
client = genai.Client(api_key=API_KEY)


# Use free-tier safe model
MODEL = "gemini-2.5-flash"


def review_code(code: str) -> str:
    """
    Reviews code using Gemini AI and returns suggestions.
    """

    try:

        # Validate input
        if not isinstance(code, str) or not code.strip():
            return "Error: Invalid code input."


        # Create structured prompt
        prompt = f"""
Review the following code carefully.

Provide:

1. Bugs or errors
2. Improvements
3. Performance optimizations
4. Best practices
5. Security concerns (if any)

Code:
{code}
"""


        # Call Gemini API
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=(
                    "You are a senior software engineer and expert code reviewer."
                ),
                temperature=0.3
            )
        )


        # Return response safely
        if response and response.text:
            return response.text

        return "No suggestions generated."


    except Exception as e:

        print("Gemini API Error:", str(e))

        return "Error reviewing code. Please try again."