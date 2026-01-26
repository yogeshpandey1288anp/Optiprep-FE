from fastapi import FastAPI, APIRouter, HTTPException, status
from typing import Optional

from schema.createtask_schema import TaskCreate, TaskOut
from service.createtask_service import create_task, get_task

app = FastAPI(title="Task API")

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.post(
    "/",
    response_model=TaskOut,
    status_code=status.HTTP_201_CREATED
)
async def create_task_api(payload: TaskCreate):
    """
    Create a new task
    """
    try:
        task = await create_task(payload)
        return task
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get(
    "/{task_id}",
    response_model=TaskOut
)
async def get_task_api(task_id: str):
    """
    Get task by ID
    """
    task = await get_task(task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


app.include_router(router)
