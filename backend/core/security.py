# backend/core/security.py

from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.context import CryptContext

from db.mongo import db

# ---------------- CONFIG ---------------- #

SECRET_KEY = "0a0bf142ad271aa8d540eb131d2bfd82f061619dda8df953d72a20385d6100c5"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
user_collection = db["users"]

# ---------------- PASSWORD ---------------- #

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# ---------------- TOKEN ---------------- #

def create_access_token(
    data: dict,
    expires_delta: Optional[timedelta] = None
) -> str:
    to_encode = data.copy()

    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ---------------- CURRENT USER ---------------- #

async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")

        if not email:
            raise credentials_exception

        email = email.lower()

    except JWTError as e: 
        raise credentials_exception

    user = await user_collection.find_one({"email": email})
    if not user:
        raise credentials_exception

    return user
