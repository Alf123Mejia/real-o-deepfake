import { useState, useEffect } from 'react';
import Inicio from './components/Inicio';
import Tablero from './components/Tablero';
import Victoria from './components/Victoria';

const GAME_LEVELS = [
  {
    id: 1, category: "Manos y Dedos",
    realUrl: "/src/assets/images/1-real.jpg", aiUrl: "/src/assets/images/1-ia.jpg",
    hint: "La anatomía humana es el talón de Aquiles de la IA.",
    explanation: "Los modelos difusivos aprenden patrones 2D, no la estructura ósea 3D. Generan manos con 6 dedos o pulgares en ángulos imposibles."
  },
  {
    id: 2, category: "Texto y Carteles",
    realUrl: "/src/assets/images/2-real.jpg", aiUrl: "/src/assets/images/2-ia.jpg",
    hint: "Busca letras, letreros de fondo o marcas en ropa.",
    explanation: "La IA gráfica no procesa el lenguaje como texto, dibuja formas que se asemejan a letras, creando símbolos incomprensibles."
  },
  {
    id: 3, category: "Ojos y Simetría",
    realUrl: "/src/assets/images/3-real.jpg", aiUrl: "/src/assets/images/3-ia.jpg",
    hint: "El alma está en los ojos. Míralos de cerca.",
    explanation: "La IA suele procesar cada ojo por separado según su contexto inmediato, perdiendo la simetría facial y creando reflejos opuestos."
  },
  {
    id: 4, category: "Accesorios",
    realUrl: "/src/assets/images/4-real.jpg", aiUrl: "/src/assets/images/4-ia.jpg",
    hint: "Gafas, pendientes, collares. Revisa cómo interactúan con la piel.",
    explanation: "Dificultad para entender la separación de capas (metal vs tejido humano), fundiendo los aros de las gafas directamente con la mejilla."
  },
  {
    id: 5, category: "Física y Reflejos",
    realUrl: "/src/assets/images/5-real.jpg", aiUrl: "/src/assets/images/5-ia.jpg",
    hint: "Las leyes de la física no aplican para la Inteligencia Artificial.",
    explanation: "La IA no simula la luz ni la óptica; simplemente colorea píxeles. Esto crea sombras erróneas o reflejos rotos en el agua o espejos."
  },
  {
    id: 6, category: "Multitudes y Fondos",
    realUrl: "/src/assets/images/6-real.jpg", aiUrl: "/src/assets/images/6-ia.jpg",
    hint: "No mires el sujeto principal, mira a la gente de atrás.",
    explanation: "La IA concentra sus recursos en el sujeto principal (prompt focus), descuidando el ruido de fondo y creando personas derretidas."
  },
  {
    id: 7, category: "Dientes",
    realUrl: "/src/assets/images/7-real.jpg", aiUrl: "/src/assets/images/7-ia.jpg",
    hint: "Las sonrisas de la IA pueden ser aterradoras si cuentas bien.",
    explanation: "La IA entiende el patrón 'blanco-línea-blanco', pero no conoce el número límite ni la estructura maxilar, creando bocas con exceso de dientes."
  },
  {
    id: 8, category: "Arquitectura Ilógica",
    realUrl: "/src/assets/images/8-real.jpg", aiUrl: "/src/assets/images/8-ia.jpg",
    hint: "Sigue las líneas de las estructuras.",
    explanation: "Pérdida de la coherencia estructural a largo plazo. Escaleras que terminan en la nada o ventanas mezcladas con ladrillos."
  }
];

const TIME_PER_LEVEL = 15;

function App() {
  const [gameState, setGameState] = useState('start');
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_LEVEL);
  const [agentData, setAgentData] = useState({ hint: "", explanation: "", loading: false });

  const currentLevel = GAME_LEVELS[currentLevelIndex];

  useEffect(() => {
    if (gameState !== 'playing' || feedback !== null) return;
    if (timeLeft <= 0) {
      handleWrongChoice();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [gameState, feedback, timeLeft]);

  const pedirPistaAlAgente = async (nivelActual) => {
    setAgentData({ hint: "", explanation: "", loading: true });
    try {
      const respuesta = await fetch("http://127.0.0.1:8000/api/get-clues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: nivelActual.category }),
      });

      if (respuesta.ok) {
        const datosIA = await respuesta.json();
        const pistaSegura = typeof datosIA.hint === 'string' ? datosIA.hint : JSON.stringify(datosIA.hint || nivelActual.hint);
        const explicacionSegura = typeof datosIA.explanation === 'string' ? datosIA.explanation : JSON.stringify(datosIA.explanation || nivelActual.explanation);
        
        setAgentData({ hint: pistaSegura, explanation: explicacionSegura, loading: false });
      } else {
        setAgentData({ hint: nivelActual.hint, explanation: nivelActual.explanation, loading: false });
      }
    } catch (error) {
      setAgentData({ hint: nivelActual.hint, explanation: nivelActual.explanation, loading: false });
    }
  };

  const loadLevel = (index) => {
    const level = GAME_LEVELS[index];
    const images = [
      { isAi: false, url: level.realUrl, id: 'real' },
      { isAi: true, url: level.aiUrl, id: 'ai' }
    ];
    images.sort(() => Math.random() - 0.5);
    setShuffledImages(images);
    setFeedback(null);
    setTimeLeft(TIME_PER_LEVEL);
    pedirPistaAlAgente(level);
  };

  const startGame = () => {
    setLives(3);
    setScore(0);
    setCurrentLevelIndex(0);
    loadLevel(0);
    setGameState('playing');
  };

  const handleWrongChoice = () => {
    setFeedback('incorrect');
    setLives((prevLives) => prevLives - 1);
  };

  const handleImageClick = (isAi) => {
    if (feedback) return;
    if (isAi) {
      setFeedback('correct');
      setScore((prevScore) => prevScore + (timeLeft * 10));
    } else {
      handleWrongChoice();
    }
  };

  const handleNextLevel = () => {
    if (lives <= 0) {
      setGameState('gameover');
      return;
    }
    const nextIndex = currentLevelIndex + 1;
    if (nextIndex < GAME_LEVELS.length) {
      setCurrentLevelIndex(nextIndex);
      loadLevel(nextIndex);
    } else {
      setGameState('victory');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex items-center justify-center p-4">
      {gameState === 'start' && <Inicio onStart={startGame} />}
      
      {gameState === 'playing' && (
        <Tablero 
          lives={lives} 
          score={score} 
          currentLevelIndex={currentLevelIndex} 
          shuffledImages={shuffledImages} 
          feedback={feedback} 
          timeLeft={timeLeft} 
          currentLevel={currentLevel} 
          handleImageClick={handleImageClick} 
          handleNextLevel={handleNextLevel} 
          agentData={agentData} 
        />
      )}

      {(gameState === 'gameover' || gameState === 'victory') && (
        <Victoria gameState={gameState} score={score} onRestart={startGame} />
      )}
    </div>
  );
}

export default App;