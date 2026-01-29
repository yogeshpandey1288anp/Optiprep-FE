from datetime import datetime, timezone
from schema.directortool_schema import BorrowerDirectoryCreate, BorrowerDirectoryOut
from model.directortool_model import create, get_by_external_case_id, get_all


async def create_directortool_data(
    payload: BorrowerDirectoryCreate, source: str = "manual"
) -> BorrowerDirectoryOut:

    existing = await get_by_external_case_id(payload.external_case_id)
    if existing:
        raise ValueError("Borrower directory already exists")

    now = datetime.now(timezone.utc)

    data = payload.model_dump()
    data.update({"source": source, "created_at": now, "updated_at": now})

    saved = await create(data)
    return BorrowerDirectoryOut(**saved)


async def get_director_tool_data(external_case_id: str) -> BorrowerDirectoryOut | None:

    record = await get_by_external_case_id(external_case_id)
    return BorrowerDirectoryOut(**record) if record else None


async def get_all_director_tool_data() -> list[BorrowerDirectoryOut]:
    records = await get_all()
    return [BorrowerDirectoryOut(**record) for record in records]
    