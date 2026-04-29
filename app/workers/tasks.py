import time
from app.workers.celery_app import celery_app

@celery_app.task(bind=True, autoretry_for=(Exception,), retry_backoff=True, max_retries=3)
def process_task(self, task_id: int, title: str):
    # simulate heavy work
    time.sleep(3)

    return {
        "task_id": task_id,
        "status": "processed",
        "title": title
    }