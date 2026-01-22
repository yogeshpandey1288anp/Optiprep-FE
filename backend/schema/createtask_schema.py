from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from enum import Enum
from typing_extensions import Literal


class CategoryEnum(str, Enum):
    document_requirement = "Document Requirement"
    # Add other categories here if needed


class TaskCreate(BaseModel):
    task_id: int = Field(..., alias="Task ID", example=675793)
    date: date = Field(..., example="2025-07-11")
    name: str = Field(..., example="Naresh Kumar")
    category: CategoryEnum = Field(..., example="Document Requirement")
    attach_file_url: Optional[str] = Field(None, description="URL or path to attached PDF file")
    description: Optional[str] = Field(
        None,
        example=(
            "Please share the SMART Integrated Portal document, as it is a mandatory "
            "requirement for verification and processing. Please ensure that the document "
            "is complete and valid before submission to avoid any delays in the evaluation process."
        )
    )


class TaskOut(TaskCreate):
    id: str
    created_at: date
    updated_at: date
    source: Literal["manual", "system", "api"] = "manual"
