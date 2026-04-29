import time
import redis

r = redis.Redis()

def is_allowed(user_id, limit=10, window=60):
    key = f"rate:{user_id}"
    count = r.get(key)

    if count and int(count) >= limit:
        return False

    pipe = r.pipeline()
    pipe.incr(key, 1)
    pipe.expire(key, window)
    pipe.execute()

    return True
