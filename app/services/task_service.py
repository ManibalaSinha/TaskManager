from sqlalchemy.orm import Session
from app.models.task import Task
from app.workers.tasks import process_task
from app.core.redis_client import redis_client
import json

def create_task(db: Session, task):

    db_task = Task(title=task.title, description=task.description)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    #  Send to Celery worker (async processing)
    process_task.delay(db_task.id, db_task.title)

    #  Cache result in Redis
    redis_client.set(
        f"task:{db_task.id}",
        json.dumps({
            "id": db_task.id,
            "title": db_task.title,
            "description": db_task.description
        }),
        ex=60  # cache 60 sec
    )

    return db_task


def get_task_cached(task_id: int):
    cached = redis_client.get(f"task:{task_id}")
    if cached:
        return json.loads(cached)
    return None

def get_tasks(db: Session):
    return db.query(Task).all()