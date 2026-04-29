from celery.result import AsyncResult
from app.workers.celery_app import celery_app


@router.get("/monitor/{task_id}")
def monitor(task_id: str):

    result = AsyncResult(task_id, app=celery_app)

    return {
        "task_id": task_id,
        "state": result.state,
        "info": result.info,
        "successful": result.successful()
    }