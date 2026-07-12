import os
from dotenv import load_dotenv

load_dotenv()

def get_api_key():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("¡Falta la GROQ_API_KEY en el archivo .env!")
    return api_key