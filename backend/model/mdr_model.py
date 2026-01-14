from datetime import datetime
from typing import Dict, Any, Optional


class DocumentModel:
    def __init__(
        self,
        mdr_document_id: str,
        document_name: str,
        document_type: str,
        content: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ):
        self.mdr_document_id = mdr_document_id
        self.document_name = document_name
        self.document_type = document_type
        self.content = content
        self.metadata = metadata or {}
        self.status = "received"
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def to_dict(self) -> dict:
        return {
            "mdr_document_id": self.mdr_document_id,
            "document_name": self.document_name,
            "document_type": self.document_type,
            "content": self.content,
            "metadata": self.metadata,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
