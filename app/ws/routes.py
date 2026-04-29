from fastapi import APIRouter, WebSocket
from app.ws.manager import ConnectionManager

router = APIRouter()
manager = ConnectionManager()


@router.websocket("/ws/{task_id}")
async def task_ws(websocket: WebSocket, task_id: str):
    await manager.connect(task_id, websocket)

    try:
        while True:
            await websocket.receive_text()
    except:
        await manager.disconnect(task_id, websocket)