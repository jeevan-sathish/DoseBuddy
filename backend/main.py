from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_route import auth_router
from database.db import Base, engine
from models.login_user_model import User
from routes.userProfile_route import profile_router



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(profile_router,prefix="/login")