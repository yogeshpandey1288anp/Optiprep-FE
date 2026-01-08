from bson import ObjectId
from typing import Optional
from db.mongo import db

collection = db["director_tool_data"]


def serialize(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        **{k: v for k, v in doc.items() if k != "_id"}
    }


async def get_by_id(record_id: str) -> Optional[dict]:
    doc = await collection.find_one({"_id": ObjectId(record_id)})
    return serialize(doc) if doc else None


async def get_by_external_case_id(external_case_id: str) -> Optional[dict]:
    doc = await collection.find_one({"external_case_id": external_case_id})
    return serialize(doc) if doc else None


async def create(data: dict) -> dict:
    result = await collection.insert_one(data)
    data["_id"] = result.inserted_id
    return serialize(data)
