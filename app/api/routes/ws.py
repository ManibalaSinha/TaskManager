from fastapi import APIRouter, WebSocket

router = APIRouter()

connections = []

@router.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    connections.append(ws)

    while True:
        data = await ws.receive_text()
        for conn in connections:
            await conn.send_text(f"Update: {data}")
