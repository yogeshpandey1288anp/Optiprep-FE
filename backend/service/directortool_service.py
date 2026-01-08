from datetime import datetime
from schema.directortool_schema import (
    BorrowerDirectoryCreate,
    BorrowerDirectoryOut
)
from model.directortool_model import (
    create,
    get_by_external_case_id
)


async def create_borrower_directory(
    payload: BorrowerDirectoryCreate,
    source: str = "dummy"
) -> BorrowerDirectoryOut:


    existing = await get_by_external_case_id(payload.external_case_id)
    if existing:
        raise ValueError("Borrower directory already exists")

    data = payload.model_dump()
    data.update({
        "source": source,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    })

    saved = await create(data)
    return BorrowerDirectoryOut(**saved)


async def get_borrower_directory(
    external_case_id: str
) -> BorrowerDirectoryOut | None:
    record = await get_by_external_case_id(external_case_id)
    return BorrowerDirectoryOut(**record) if record else None
