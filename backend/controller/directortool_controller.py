from fastapi import APIRouter, HTTPException
from schema.directortool_schema import (
    BorrowerDirectoryCreate,
    BorrowerDirectoryOut
)
from service.directortool_service import (
    create_borrower_directory,
    get_borrower_directory
)

router = APIRouter(
    prefix="/directortool",
    tags=["Director Tool"]
)


@router.post("/", response_model=BorrowerDirectoryOut)
async def create_directory(payload: BorrowerDirectoryCreate):
    try:
        return await create_borrower_directory(payload)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{external_case_id}", response_model=BorrowerDirectoryOut)
async def fetch_directory(external_case_id: str):
    record = await get_borrower_directory(external_case_id)
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    return record



    
    # id: str   jfjhfejfjefjejejfeiereefe
