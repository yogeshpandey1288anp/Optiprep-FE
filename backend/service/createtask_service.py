from datetime import datetime, timezone
from typing import Optional

from schema.createtask_schema import TaskCreate, TaskOut
from model.createtask_model import create, get_by_id


async def create_task(
    payload: TaskCreate,
    source: str = "manual"
) -> TaskOut:
    now = datetime.now(timezone.utc)

    data = payload.model_dump()
    data.update({
        "source": source,
        "created_at": now,
        "updated_at": now,
    })

    saved = await create(data)
    return TaskOut(**saved)


async def get_task(
    task_id: str
) -> Optional[TaskOut]:
    record = await get_by_id(task_id)
    return TaskOut(**record) if record else None
