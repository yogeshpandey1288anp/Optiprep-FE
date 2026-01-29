from fastapi import APIRouter, HTTPException, status
from schema.directortool_schema import BorrowerDirectoryCreate, BorrowerDirectoryOut
from service.directortool_service import (
    create_directortool_data,
    get_director_tool_data,
    get_all_director_tool_data,

)

router = APIRouter(prefix="/directortool", tags=["Director Tool"])



@router.post(
    "/", response_model=BorrowerDirectoryOut, status_code=status.HTTP_201_CREATED
)
async def create_directory(payload: BorrowerDirectoryCreate):
    try:
        return await create_directortool_data(payload)

    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/{external_case_id}", response_model=BorrowerDirectoryOut)
async def fetch_directory(external_case_id: str):
    record = await get_director_tool_data(external_case_id)

    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Record not found"
        )

    return record


@router.get("/", response_model=list[BorrowerDirectoryOut])
async def fetch_all_director_tool_data():
         records = await get_all_director_tool_data()
         if not records:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="No records found"
                )
         return records
        
