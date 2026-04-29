import time
from app.workers.celery_app import celery_app

@celery_app.task(bind=True)
def process_task(self, task_id: int, title: str):

    # mark start
    self.update_state(
        state="STARTED",
        meta={"task_id": task_id, "status": "processing"}
    )

    try:
        time.sleep(5)  # simulate heavy work

        result = {
            "task_id": task_id,
            "title": title,
            "status": "completed"
        }

        return result

    except Exception as e:
        self.update_state(
            state="FAILURE",
            meta={"error": str(e)}
        )
        raise