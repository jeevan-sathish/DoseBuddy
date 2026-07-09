from fastapi import Depends, APIRouter, HTTPException
from database.db import get_db
from models.login_user_model import User
from utils.get_current_user import get_current_user

profile_router =APIRouter()

@profile_router.get("/profile")
def get_profile(
    email: str = Depends(get_current_user),
    db=Depends(get_db),
):
    print("Profile router loaded")

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(404, "User not found")

    return {
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
        "picture": user.picture,
    }