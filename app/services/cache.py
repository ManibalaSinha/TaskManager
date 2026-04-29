import json
import redis

r = redis.Redis(host="localhost", port=6379, db=2, decode_responses=True)


def get_cache(key: str):
    data = r.get(key)
    return json.loads(data) if data else None


def set_cache(key: str, value: dict, ttl=300):
    r.setex(key, ttl, json.dumps(value))