from fastapi import APIRouter, HTTPException
from bson import ObjectId
from schema.mdr_schema import (
    DocumentCreateSchema,
    DocumentResponseSchema,
)
from service.mdr_service import DocumentService

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.post("/", response_model=dict)
async def create_document(payload: DocumentCreateSchema):
    document_id = await DocumentService.create_dummy_document(payload)
    return {"document_id": document_id}


@router.get("/{document_id}", response_model=dict)
async def get_document(document_id: str):
    document = await DocumentService.get_document_by_id(document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    document["id"] = str(document["_id"])
    document.pop("_id")
    return document


@router.get("/", response_model=list)
async def list_documents():
    documents = await DocumentService.list_documents()
    for doc in documents:
        doc["id"] = str(doc["_id"])
        doc.pop("_id")
    return documents
