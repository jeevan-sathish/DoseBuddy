from database.db import get_db
from fastapi import APIRouter, HTTPException,Depends
from schemas.auth_credentail_schema import UserCredentail
from google.oauth2 import id_token
from google.auth.transport import requests
import os
from dotenv import load_dotenv
from models.login_user_model import User 
from utils.jwt_handler import create_access_token

load_dotenv()

auth_router = APIRouter()
@auth_router.post('/login')
def handle_auth(payload:UserCredentail,db=Depends(get_db)):
    user_credentail =id_token.verify_oauth2_token(payload.token, requests.Request(), os.getenv("GOOGLE_CLIENT_ID"))
    user_info ={
        "email":user_credentail.get("email"),
            "name":user_credentail.get("name"),
            "picture":user_credentail.get("picture")
    }
    exesting_user =db.query(User).filter(User.email == user_info["email"]).first()
    if(exesting_user):
        print("user  found")
        access_token =create_access_token(data={"sub":exesting_user.email})
       
        return {
            "user":{
                "user_id":exesting_user.id,
                "email":exesting_user.email,
                "name":exesting_user.name,
                "picture":exesting_user.picture
            },
            "access_token_db":access_token
        }
        
    
    else:
        print("user not found")
        new_user = User(
            google_id=user_credentail.get("sub"),
            name=user_credentail.get("name"),
            email=user_credentail.get("email"),
            picture=user_credentail.get("picture")
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        print("new user created")
        access_token =create_access_token(data={"sub":new_user.email})
        present_user =db.query(User).filter(User.email == new_user.email).first()
        
        return {
            "user":{
                "id":present_user.id,
                "email":present_user.email,
                "name":present_user.name,
                "picture":present_user.picture
            },
            "access_token_db":access_token
        }
    

    
