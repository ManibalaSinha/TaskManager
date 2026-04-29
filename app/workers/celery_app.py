from celery import Celery

celery_app = Celery(
    "taskmanager",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1"
)

celery_app.conf.task_routes = {
    "app.workers.tasks.*": {"queue": "default"}
}

celery_app.conf.update(
    task_track_started=True,
)