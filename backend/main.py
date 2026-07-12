from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from skills import generate_level_clues

app = FastAPI(title="Agente IA - Deepfake Game")

# Configuración SEGURA: Solo permitimos peticiones de nuestro frontend local
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

class LevelRequest(BaseModel):
    theme: str

@app.post("/api/get-clues")
async def get_clues(request: LevelRequest):
    return generate_level_clues(request.theme)