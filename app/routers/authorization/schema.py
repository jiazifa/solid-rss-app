from pydantic import BaseModel, EmailStr

class RegisterUserRequest(BaseModel):
    email: EmailStr
    password: str
    
class RegisterUserResponse(BaseModel):
    user_id: int
    message: str