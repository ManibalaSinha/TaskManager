from fastapi import FastAPI
from app.api.routes.task import router as task_router
from app.db.base import Base
from app.db.session import engine

# create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root():
    return {"message": "TaskManager API running"}
app.include_router(task_router, prefix="/tasks")
#app.include_router(jobs_router, prefix="/jobs")
