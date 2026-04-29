from celery.result import AsyncResult
from app.workers.celery_app import celery_app

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.task import TaskCreate, TaskResponse
from app.services.task_service import create_task, get_tasks, get_task_cached
from app.api.deps import get_db

router = APIRouter()

@router.post("/", response_model=TaskResponse)
def create(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(db, task)

@router.get("/", response_model=list[TaskResponse])
def read_tasks(db: Session = Depends(get_db)):
    return get_tasks(db)

@router.get("/{task_id}")
def get_task(task_id: int):
    cached = get_task_cached(task_id)
    if cached:
        return {"source": "redis", "data": cached}

    return {"source": "db", "message": "Not cached yet"}

@router.get("/status/{celery_task_id}")
def get_task_status(celery_task_id: str):

    result = AsyncResult(celery_task_id, app=celery_app)

    response = {
        "task_id": celery_task_id,
        "status": result.status,
        "result": result.result if result.successful() else None
    }

   # return response

