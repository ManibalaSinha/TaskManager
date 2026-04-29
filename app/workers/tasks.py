import time
from app.workers.celery_app import celery_app
from app.ws.manager import ConnectionManager

manager = ConnectionManager()


@celery_app.task(bind=True)
def process_task(self, task_id: int, title: str):

    try:
        manager.active_connections  # ensure import works

        # Step 1
        self.update_state(state="STARTED")
        # (optional WebSocket update)
        # asyncio can't run directly in celery → we simulate via sync call

        time.sleep(2)

        # Step 2
        time.sleep(2)

        result = {
            "task_id": task_id,
            "title": title,
            "status": "completed"
        }

        return result

    except Exception as e:
        raise

