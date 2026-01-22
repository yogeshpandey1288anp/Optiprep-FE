from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from enum import Enum
from typing_extensions import Literal


class CategoryEnum(str, Enum):
    document_requirement = "Document Requirement"
 


class TaskCreate(BaseModel):
    id: int = Field(..., alias="Task ID")
    created_at: date= Field()
    created_by: str = Field()
    category: CategoryEnum = Field(..., example="Document Requirement")
    attach_file_url: Optional[str] = Field(None, description="URL or path to attached PDF file")
    description: Optional[str] = Field(
        None
    )


class TaskOut(TaskCreate):
    id: str
    created_at: date
    updated_at: date
    source: Literal[None] = "manual"
