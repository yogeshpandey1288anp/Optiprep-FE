#backend/service/user_service.py
from fastapi import HTTPException
from datetime import timedelta

from model.user_model import (
    create_user,
    get_user_by_email,
    get_user_by_id,
    verify_password,
    update_last_login
)
from schema.user_schema import UserCreate
from core.security import create_access_token

ACCESS_TOKEN_EXPIRE_MINUTES = 120


async def register_user(user: UserCreate):

    email = user.email.lower() 

    existing_user = await get_user_by_email(email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    user_id = await create_user(user)
    created_user = await get_user_by_id(user_id)

    return {
        "id": str(created_user["_id"]),
        "firstname": created_user["firstname"],
        "lastname": created_user["lastname"],
        "email": created_user["email"],
        "role": created_user["role"],
        "created_at": created_user["created_at"],
        "last_login": created_user.get("last_login"),
    }


async def login_user(email: str, password: str):

    email = email.lower()  
    user = await get_user_by_email(email)
    if not user or not verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    await update_last_login(user["_id"])

    token = create_access_token(
        {"sub": email},
        timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }