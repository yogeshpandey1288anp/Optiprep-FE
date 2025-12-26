#backend/model/user.py

from datetime import datetime
from typing import Optional
from bson import ObjectId
from passlib.context import CryptContext

from db.mongo import db
from schema.user_schema import UserCreate

user_collection = db["users"]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


async def create_user(user: UserCreate) -> ObjectId:
    user_dict = user.dict(exclude={"password"})

    user_dict.update({
        "email": user.email.lower(),
        "hashed_password": hash_password(user.password),
        "created_at": datetime.utcnow(),
        "last_login": None,
        "disabled": False,
    })

    result = await user_collection.insert_one(user_dict)
    return result.inserted_id


async def get_user_by_email(email: str) -> Optional[dict]:
    return await user_collection.find_one({"email": email})


async def get_user_by_id(user_id: ObjectId) -> Optional[dict]:
    return await user_collection.find_one({"_id": user_id})


async def update_last_login(user_id: ObjectId):
    await user_collection.update_one(
        {"_id": user_id},
        {"$set": {"last_login": datetime.utcnow()}}
    )
