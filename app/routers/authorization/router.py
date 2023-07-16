from uuid import uuid4
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models import User
from app.schema import ResponseError, ResponseSuccess
from app.app import get_db
from .schema import RegisterUserRequest, RegisterUserResponse

router = APIRouter(prefix='/auth', tags=['auth'])

@router.post("/register/", summary="Register new user")
async def register(data: RegisterUserRequest, session: Session = Depends(get_db)):
    from .utils import hash_password
    user = session.query(User).filter(User.email == data.email).first()
    if user:
        return ResponseError(message="User already exists")
    new_user = User(uuid=str(uuid4()), username=None, email=data.email, hashed_password=hash_password(data.password))
    session.add(new_user)
    return ResponseSuccess(data=RegisterUserResponse(user_id=new_user.user_id, message="ok"))