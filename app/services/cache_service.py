import redis
import json

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

def get_cache(key):
    data = r.get(key)
    return json.loads(data) if data else None

def set_cache(key, value, ttl=60):
    r.setex(key, ttl, json.dumps(value))

