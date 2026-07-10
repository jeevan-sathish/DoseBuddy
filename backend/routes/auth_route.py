from database.db import get_db
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.exc import SQLAlchemyError
from schemas.auth_credentail_schema import UserCredentail
from google.oauth2 import id_token
from google.auth.transport import requests
from google.auth.exceptions import GoogleAuthError
from dotenv import load_dotenv
from models.login_user_model import User
from utils.jwt_handler import (
    create_access_token,
    create_refresh_token,
)
import os

load_dotenv()

auth_router = APIRouter()


@auth_router.post("/login")
def handle_auth(
    payload: UserCredentail,
    db=Depends(get_db),
):
    try:
       
        user_credential = id_token.verify_oauth2_token(
            payload.token,
            requests.Request(),
            os.getenv("GOOGLE_CLIENT_ID"),
        )

        email = user_credential.get("email")

        if not email:
            raise HTTPException(
                status_code=400,
                detail="Email not found in Google account.",
            )

        existing_user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

       
        if existing_user:

            access_token = create_access_token(
                data={"sub": existing_user.email,"type":"access"}
            )

            refresh_token = create_refresh_token(
                data={"sub": existing_user.email,"type": "refresh"}
            )

            return {
                "user": {
                    "user_id": existing_user.id,
                    "email": existing_user.email,
                    "name": existing_user.name,
                    "picture": existing_user.picture,
                },
                "access_token_db": access_token,
                "refresh_token_db": refresh_token,
            }

      
        new_user = User(
            google_id=user_credential.get("sub"),
            name=user_credential.get("name"),
            email=email,
            picture=user_credential.get("picture"),
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        access_token = create_access_token(
            data={"sub": new_user.email,"type":"access"}
        )

        refresh_token = create_refresh_token(
            data={"sub": new_user.email,"type": "refresh"}
        )

        return {
            "user": {
                "user_id": new_user.id,
                "email": new_user.email,
                "name": new_user.name,
                "picture": new_user.picture,
            },
            "access_token_db": access_token,
            "refresh_token_db": refresh_token,
        }

    except GoogleAuthError:
        raise HTTPException(
            status_code=401,
            detail="Invalid Google authentication token.",
        )

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Database error occurred.",
        )

    except HTTPException:
        raise

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail="Something went wrong. Please try again later.",
        )