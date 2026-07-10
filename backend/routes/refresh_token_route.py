from fastapi import APIRouter, HTTPException
from jose import jwt, JWTError
from dotenv import load_dotenv
from schemas.refreshTokenSchema import RefreshTokenSchema
from utils.jwt_handler import create_access_token
import os

load_dotenv()

refresh_router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"


@refresh_router.post("/refresh")
def refresh_access_token(payload: RefreshTokenSchema):
    try:
        decoded_token = jwt.decode(
            payload.refresh_token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        
        if decoded_token.get("type") != "refresh":
            raise HTTPException(
                status_code=401,
                detail="Invalid token type",
            )

        email = decoded_token.get("sub")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid refresh token",
            )

        new_access_token = create_access_token(
            data={"sub": email}
        )

        return {
            "access_token_db": new_access_token
        }

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Refresh token expired or invalid",
        )

    except HTTPException:
        raise

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail="Something went wrong",
        )