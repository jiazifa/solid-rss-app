from fastapi import APIRouter

router = APIRouter(prefix='/auth', tags=['auth'])

@router.get("/register/")
async def register():
    return {"message": "Hello World"}