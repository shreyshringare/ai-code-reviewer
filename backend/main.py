from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import the review function from reviewer.py
from reviewer import review_code

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


# 2. True Health Check Endpoint
@app.get("/")
def health_check():
    return {
        "status": "Backend is running",
        "message": "AI Code Reviewer API Ready"
    }


# 3. Main Review Endpoint
@app.post("/review")
def review_endpoint(request: ReviewRequest):
    """
    Endpoint that receives code from the frontend and returns an AI review.
    """

    try:

        # Because of Pydantic, request.code is guaranteed to be a string.
        # We just need to ensure it's not entirely empty/whitespace.
        if not request.code.strip():
            raise HTTPException(
                status_code=400,
                detail="Code field cannot be empty"
            )


        # Call reviewer.py function
        result = review_code(request.code)


        # Return response
        return {
            "success": True,
            "review": result
        }


    except Exception as e:
        # Print the actual error to the server console for debugging
        print("Server Error in /review:", str(e))
        
        # Return a generic 500 error to the user so you don't leak server secrets
        raise HTTPException(
            status_code=500,
            detail="An internal server error occurred."
        )