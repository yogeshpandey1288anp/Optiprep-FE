from typing import Optional
from datetime import datetime
from bson import ObjectId
from database import db

collection = db["task_data"]


def serialize(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        **{k: v for k, v in doc.items() if k != "_id"}
    }


async def get_by_id(record_id: str) -> Optional[dict]:
    doc = await collection.find_one({"_id": ObjectId(record_id)})
    return serialize(doc) if doc else None


async def create(data: dict) -> dict:
    now = datetime.utcnow()

    data.update({
        "created_at": now,
        "updated_at": now,
        "source": "manual",
    })

    result = await collection.insert_one(data)
    data["_id"] = result.inserted_id
    return serialize(data)
