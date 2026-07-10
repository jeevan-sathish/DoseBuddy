from pydantic import BaseModel

class refreshTokenSchema(BaseModel):
    token:str