import redis
import json

r = redis.Redis(host="localhost", port=6379, db=2)


def publish_task_update(task_id: str, data: dict):
    r.publish(f"task:{task_id}", json.dumps(data))