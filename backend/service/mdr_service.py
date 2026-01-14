from bson import ObjectId
from datetime import datetime
from typing import List, Optional

from db.mongo import db
from model.mdr_model import DocumentModel
from schema.mdr_schema import DocumentCreateSchema


document_collection = db["mdr_documents"]


class DocumentService:

    @staticmethod
    async def create_dummy_document(payload: DocumentCreateSchema) -> str:
        document = DocumentModel(
            mdr_document_id=payload.mdr_document_id,
            document_name=payload.document_name,
            document_type=payload.document_type,
            content=payload.content,
            metadata=payload.metadata.dict() if payload.metadata else {},
        )

        result = await document_collection.insert_one(document.to_dict())
        return str(result.inserted_id)

    @staticmethod
    async def get_document_by_id(document_id: str) -> Optional[dict]:
        doc = await document_collection.find_one(
            {"_id": ObjectId(document_id)}
        )

        if not doc:
            return None

        doc["_id"] = str(doc["_id"])
        return doc

    @staticmethod
    async def list_documents() -> List[dict]:
        documents = []
        cursor = document_collection.find().sort("created_at", -1)

        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            documents.append(doc)

        return documents

    @staticmethod
    async def update_status(document_id: str, status: str) -> bool:
        result = await document_collection.update_one(
            {"_id": ObjectId(document_id)},
            {
                "$set": {
                    "status": status,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        return result.modified_count == 1
