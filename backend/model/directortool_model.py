from bson import ObjectId
from typing import Optional
from decimal import Decimal, ROUND_HALF_UP
from db.mongo import db

collection = db["director_tool_data"]


def serialize(doc: dict) -> dict:
    return {"id": str(doc["_id"]), **{k: v for k, v in doc.items() if k != "_id"}}


def normalize_numbers(obj):
    """
    Converts Decimal to float with 2 decimal precision
    (MongoDB safe)
    """
    if isinstance(obj, Decimal):
        return float(obj.quantize(Decimal("0.00"), rounding=ROUND_HALF_UP))

    if isinstance(obj, dict):
        return {k: normalize_numbers(v) for k, v in obj.items()}

    if isinstance(obj, list):
        return [normalize_numbers(i) for i in obj]

    return obj


async def get_by_id(record_id: str) -> Optional[dict]:
    if not ObjectId.is_valid(record_id):
        return None

    doc = await collection.find_one({"_id": ObjectId(record_id)})
    return serialize(doc) if doc else None


async def get_by_external_case_id(external_case_id: str) -> Optional[dict]:
    doc = await collection.find_one({"external_case_id": external_case_id})
    return serialize(doc) if doc else None


async def create(data: dict) -> dict:
    clean_data = normalize_numbers(data)

    result = await collection.insert_one(clean_data)
    clean_data["_id"] = result.inserted_id

    return serialize(clean_data)
