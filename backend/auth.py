import os
from jose import jwt
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")


def get_user_id_from_token(authorization_header):

    try:

        if not authorization_header:
            print("AUTH: No authorization header received")
            return None

        token = authorization_header.replace("Bearer ", "")

        if not JWT_SECRET:
            print("AUTH: SUPABASE_JWT_SECRET is missing from .env")
            return None

        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=["HS256"],
            options={"verify_aud": False}   # Supabase tokens fail aud check otherwise
        )

        print("AUTH: JWT decoded successfully. Payload sub:", payload.get("sub"))

        return payload.get("sub")

    except Exception as e:

        print("AUTH JWT ERROR:", str(e))

        return None