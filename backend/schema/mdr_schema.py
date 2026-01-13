from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum


class DocumentStatus(str, Enum):
    RECEIVED = "received"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class MDRMetadata(BaseModel):
    source_system: str = "MDR"
    received_at: datetime = Field(default_factory=datetime.utcnow)
    extra: Optional[Dict[str, Any]] = None


class DocumentCreateSchema(BaseModel):
    mdr_document_id: str
    document_name: str
    document_type: str
    content: Optional[str] = None
    metadata: Optional[MDRMetadata] = None


class DocumentResponseSchema(BaseModel):
    id: str
    mdr_document_id: str
    document_name: str
    document_type: str
    status: DocumentStatus
    created_at: datetime
    updated_at: datetime
