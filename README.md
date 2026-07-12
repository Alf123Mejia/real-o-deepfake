# 🕵️‍♂️ Real o Deepfake - Supervivencia Visual

Un minijuego web interactivo con arquitectura Cliente-Servidor diseñado para entrenar el ojo humano en la detección de anomalías generadas por Inteligencia Artificial (Deepfakes). 

Este proyecto integra un motor de IA generativa de ultra-baja latencia para proporcionar retroalimentación dinámica y técnica al jugador en tiempo real.

---

## 1. Tecnologías y Arquitectura

El proyecto fue diseñado bajo el principio de **Separación de Responsabilidades (Clean Architecture)** para garantizar modularidad, seguridad y escalabilidad:

### Frontend (Interfaz de Usuario)
* **React + Vite:** Seleccionados por su extrema rapidez en el entorno de desarrollo y su capacidad de actualización de estados (HMR).
* **Tailwind CSS:** Framework de utilidades CSS utilizado para crear una interfaz moderna (UI/UX) sin depender de pesadas hojas de estilo externas.
* **Lucide React:** Librería de iconografía vectorial ligera.

### Backend (Lógica y Seguridad)
* **Python + FastAPI:** Elegido por su manejo asíncrono nativo y rapidez. El backend actúa como un escudo de seguridad: su propósito principal es mantener las credenciales (API Keys) ocultas del cliente y orquestar las peticiones HTTP.
* **Uvicorn:** Servidor ASGI para correr FastAPI en desarrollo y producción.

### Motor de Inteligencia Artificial
* **Groq API (Modelo Llama 3.1 - 8B):** Inicialmente concebido con Google Gemini, se realizó un pivoteo arquitectónico hacia Groq. La decisión técnica se basó en los LPUs (Language Processing Units) de Groq, que ofrecen inferencia en milisegundos, eliminando los cuellos de botella en la experiencia del usuario y evitando los errores de disponibilidad detectados en los niveles gratuitos de Gemini.

---

## 2. Personalización de Agentes (IA Skills)

Este proyecto no solo consume una API, sino que utiliza **Prompt Engineering Avanzado** para crear agentes con roles específicos:

### A. Agente In-Game (Generador de Pistas Técnico)
Ubicado en el backend (`skills.py`). Este agente recibe el tema del nivel y genera un objeto JSON puro. Su rol está restringido para no saludar ni divagar; debe proveer un `hint` misterioso y una `explanation` técnica de por qué los modelos difusivos fallan en aspectos anatómicos o de refracción de luz (ej. la incapacidad de la IA para renderizar la estructura ósea 3D de las manos). **Funciona mediante un blindaje anti-crash en React**, que convierte cualquier error de formato de la IA en texto seguro para evitar que la pantalla colapse.

### B. Agente Auditor de Código (Directorio `ia_skills`)
Una herramienta de control de calidad interna documentada en `ia_skills/Auditor_Codigo.md`. Es un "Prompt Estructural" que parametriza a cualquier LLM externo para actuar como un Arquitecto de Software Senior.
* **Por qué funciona:** Está limitado por reglas estrictas. Utiliza un *trigger* ("analiza el código") y opera en modo de **Solo Lectura**. Tiene prohibido reescribir código; únicamente diagnostica deudas técnicas (como configuraciones de CORS inseguras) y propone refactorizaciones, respetando el criterio del Líder de Proyecto.

---

## 3. Clonar y preparar el entorno

Para que un nuevo desarrollador pueda ejecutar este proyecto localmente, debe seguir estos pasos.

```bash
git clone [https://github.com/Alf123Mejia/real-o-deepfake.git](https://github.com/Alf123Mejia/real-o-deepfake.git)
cd real-o-deepfake
```

---

## 4. Ejecución del Proyecto (Entorno de Desarrollo)

El sistema requiere que el Cliente (React) y el Servidor (Python) corran simultáneamente. **Debes abrir dos terminales separadas.**

### Terminal 1: Explorar e Iniciar el Servidor (Backend)
Las credenciales nunca van en el código: se leen de variables de entorno.

```bash
cd backend

# 1. Crear entorno virtual (Recomendado)
python -m venv .venv

# 2. Activar entorno (Windows)
.venv\Scripts\activate

# 3. Instalar dependencias necesarias
pip install fastapi uvicorn requests python-dotenv

# 4. Crear variables de entorno
# Crea un archivo .env en la carpeta backend y agrega:
# GROQ_API_KEY="tu_api_key_aqui"

# 5. Ejecutar el servidor Python
python -m uvicorn main:app --reload
```
*El servidor estará escuchando de forma segura en `http://127.0.0.1:8000` con protección CORS activada.*

### Terminal 2: Iniciar la Interfaz (Frontend)
Con la terminal ubicada en la raíz del proyecto (`real-o-deepfake`):

```bash
# 1. Instalar módulos de Node
npm install

# 2. Levantar el entorno de Vite
npm run dev
```
*El juego estará disponible en tu navegador en `http://localhost:5173`.*

---

## 5. Estructura del Repo

El proyecto está organizado en bloques modulares para garantizar su escalabilidad:

```text
.
├── backend/                  # Servidor y Lógica de IA
│   ├── .env                  # (Ignorado en Git) Variables de entorno secretas
│   ├── agent.py              # Extracción y validación de la API Key
│   ├── main.py               # Servidor FastAPI, Rutas y Middleware (CORS seguro)
│   └── skills.py             # Prompting del Agente In-Game y conexión REST a Groq
│
├── ia_skills/                # Herramientas internas de desarrollo
│   └── Auditor_Codigo.md     # Prompt estructural para auditoría de código
│
├── public/                   # Archivos estáticos públicos

│
├── src/                      # Código fuente del Frontend
│   └── images/               # Assets del juego (indexación optimizada de Vite)
│   │    ├── 1-real.jpg
│   │    └── 1-ia.jpg
│   ├── components/           # UI dividida por responsabilidades
│   │   ├── Inicio.jsx        # Pantalla de bienvenida
│   │   ├── Tablero.jsx       # Interfaz principal del juego y temporizador
│   │   └── Victoria.jsx      # Pantallas de resultado final
│   ├── App.jsx               # Orquestador: Manejo de estados (Hooks) y peticiones fetch
│   ├── main.jsx              # Punto de entrada de React
│   └── index.css             # Directivas globales de Tailwind
│
├── .gitignore                # Reglas de exclusión de seguridad (node_modules, .env)
├── package.json              # Dependencias y scripts de Node.js
├── tailwind.config.js        # Configuración de diseño
└── README.md                 # Documentación técnica del proyecto
```
