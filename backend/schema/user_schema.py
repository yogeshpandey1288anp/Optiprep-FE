# backend/schemas/user_schema.py

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    user = "user"
    admin = "admin"


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    role: UserRole = UserRole.user
    disabled: bool = False


class UserCreate(UserBase):
    password: str


class UserInDB(UserBase):
    id: str = Field(alias="_id")
    hashed_password: str
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        populate_by_name = True


class UserResponse(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: EmailStr
    role: UserRole
    created_at: datetime
    last_login: Optional[datetime]

    class Config:
        populate_by_name = True
