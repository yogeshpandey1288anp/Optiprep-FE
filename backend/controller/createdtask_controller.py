from fastapi import FastAPI, APIRouter, HTTPException, status
from schema.createtask_schema import TaskCreate, TaskOut
from service.createtask_service import create_task, get_task

app = FastAPI(title="Task API", version="1.0.0")

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.post("", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
async def create_task_api(payload: TaskCreate):
    try:
        return await create_task(payload)

    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create task",
        )


@router.get("/{task_id}", response_model=TaskOut, status_code=status.HTTP_200_OK)
async def get_task_api(task_id: str):

    task = await get_task(task_id)

    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )

    return task


app.include_router(router)
