import json
import requests
from agent import get_api_key

def generate_level_clues(theme: str) -> dict:
    try:
        api_key = get_api_key()
        url = "https://api.groq.com/openai/v1/chat/completions"
        
        prompt = f"""Eres la IA de un juego de detectar Deepfakes. El nivel trata sobre: '{theme}'.
        Genera JSON puro EXACTAMENTE con esta estructura y nada más:
        {{
            "hint": "escribe una pista corta aquí",
            "explanation": "escribe la explicación técnica aquí"
        }}
        NO anides objetos, NO uses markdown, y NO agregues otras claves."""
        
        payload = {
            "model": "llama-3.1-8b-instant",
            "messages": [{"role": "user", "content": prompt}],
            "response_format": {"type": "json_object"}
        }
        
        headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
        response = requests.post(url, json=payload, headers=headers)
        
        if not response.ok:
            return {"hint": "Error", "explanation": "No se pudo conectar con la IA."}
            
        return json.loads(response.json()['choices'][0]['message']['content'])
    except Exception as e:
        return {"hint": "Error", "explanation": str(e)}