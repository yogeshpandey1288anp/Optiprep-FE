#backend/controller/user_controller.py
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from schema.user_schema import UserCreate, UserResponse
from service.user_service import register_user, login_user
from core.security import get_current_user


router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate):
    return await register_user(user)


@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    return await login_user(form.username, form.password)


@router.get("/me", response_model=UserResponse)
async def get_me(current_user=Depends(get_current_user)):
    return UserResponse(
        id=str(current_user["_id"]),
        first_name=current_user["first_name"],
        last_name=current_user["last_name"],
        email=current_user["email"],
        role=current_user["role"],
        created_at=current_user["created_at"],
        last_login=current_user.get("last_login"),
    )
