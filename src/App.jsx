import { useState, useEffect } from 'react'
import { Eye, ShieldAlert, Timer, Heart, Play, Trophy, CheckCircle, XCircle, Award } from 'lucide-react'

// 1. TU BASE DE DATOS (Con los 8 niveles de tu documento original)
// *Nota: He puesto imágenes de relleno. Luego te enseñaré a poner tus fotos reales.

// 1. TU BASE DE DATOS (Con imágenes de prueba a prueba de fallos)
const GAME_LEVELS = [
  {
    id: 1, category: "Manos y Dedos",
    realUrl: "/images/1-real.jpg", 
    aiUrl: "/images/1-ia.jpg",
    hint: "La anatomía humana es el talón de Aquiles de la IA.",
    explanation: "Los modelos difusivos aprenden patrones 2D, no la estructura ósea 3D. Generan manos con 6 dedos o pulgares en ángulos imposibles."
  },
  {
    id: 2, category: "Texto y Carteles",
    realUrl: "/images/2-real.jpg", 
    aiUrl: "/images/2-ia.jpg",
    hint: "Busca letras, letreros de fondo o marcas en ropa.",
    explanation: "La IA gráfica no procesa el lenguaje como texto, dibuja formas que se asemejan a letras, creando símbolos incomprensibles."
  },
  {
    id: 3, category: "Ojos y Simetría",
    realUrl: "/images/3-real.jpg", 
    aiUrl: "/images/3-ia.jpg",
    hint: "El alma está en los ojos. Míralos de cerca.",
    explanation: "La IA suele procesar cada ojo por separado según su contexto inmediato, perdiendo la simetría facial y creando reflejos opuestos."
  },
  {
    id: 4, category: "Accesorios",
    realUrl: "/images/4-real.jpg", 
    aiUrl: "/images/4-ia.jpg",
    hint: "Gafas, pendientes, collares. Revisa cómo interactúan con la piel.",
    explanation: "Dificultad para entender la separación de capas (metal vs tejido humano), fundiendo los aros de las gafas directamente con la mejilla."
  },
  {
    id: 5, category: "Física y Reflejos",
    realUrl: "/images/5-real.jpg", 
    aiUrl: "/images/5-ia.jpg",
    hint: "Las leyes de la física no aplican para la Inteligencia Artificial.",
    explanation: "La IA no simula la luz ni la óptica; simplemente colorea píxeles. Esto crea sombras erróneas o reflejos rotos en el agua o espejos."
  },
  {
    id: 6, category: "Multitudes y Fondos",
    realUrl: "/images/6-real.jpg", 
    aiUrl: "/images/6-ia.jpg",
    hint: "No mires el sujeto principal, mira a la gente de atrás.",
    explanation: "La IA concentra sus recursos en el sujeto principal (prompt focus), descuidando el ruido de fondo y creando personas derretidas."
  },
  {
    id: 7, category: "Dientes",
    realUrl: "/images/7-real.jpg", 
    aiUrl: "/images/7-ia.jpg",
    hint: "Las sonrisas de la IA pueden ser aterradoras si cuentas bien.",
    explanation: "La IA entiende el patrón 'blanco-línea-blanco', pero no conoce el número límite ni la estructura maxilar, creando bocas con exceso de dientes."
  },
  {
    id: 8, category: "Arquitectura Ilógica",
    realUrl: "/images/8-real.jpg", 
    aiUrl: "/images/8-ia.jpg",
    hint: "Sigue las líneas de las estructuras.",
    explanation: "Pérdida de la coherencia estructural a largo plazo. Escaleras que terminan en la nada o ventanas mezcladas con ladrillos."
  }
]

const TIME_PER_LEVEL = 15;

function App() {
  const [gameState, setGameState] = useState('start') // start, playing, gameover, victory
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0)
  
  const [shuffledImages, setShuffledImages] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_LEVEL)

  const currentLevel = GAME_LEVELS[currentLevelIndex]

  useEffect(() => {
    if (gameState !== 'playing' || feedback !== null) return;
    if (timeLeft <= 0) {
      handleWrongChoice();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [gameState, feedback, timeLeft]);

  const loadLevel = (index) => {
    const level = GAME_LEVELS[index]
    const images = [
      { isAi: false, url: level.realUrl, id: 'real' },
      { isAi: true, url: level.aiUrl, id: 'ai' }
    ]
    images.sort(() => Math.random() - 0.5)
    setShuffledImages(images)
    setFeedback(null)
    setTimeLeft(TIME_PER_LEVEL)
  }

  const startGame = () => {
    setLives(3)
    setScore(0)
    setCurrentLevelIndex(0)
    loadLevel(0)
    setGameState('playing')
  }

  const handleWrongChoice = () => {
    setFeedback('incorrect')
    setLives((prevLives) => {
      const nuevasVidas = prevLives - 1;
      if (nuevasVidas <= 0) {
        setTimeout(() => setGameState('gameover'), 1500)
      }
      return nuevasVidas;
    })
  }

  const handleImageClick = (isAi) => {
    if (feedback) return
    if (isAi) {
      setFeedback('correct')
      setScore((prevScore) => prevScore + (timeLeft * 10))
    } else {
      handleWrongChoice()
    }
  }

  // NUEVO: Función para avanzar de nivel o ganar el juego
  const handleNextLevel = () => {
    const nextIndex = currentLevelIndex + 1;
    if (nextIndex < GAME_LEVELS.length) {
      // Si hay más niveles, avanzamos al siguiente
      setCurrentLevelIndex(nextIndex);
      loadLevel(nextIndex);
    } else {
      // Si ya no hay niveles (pasó el nivel 8), ¡GANA EL JUEGO!
      setGameState('victory');
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex items-center justify-center p-4">
      
      {/* VISTA DE INICIO */}
      {gameState === 'start' && (
        <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl text-center">
          <Eye className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">Real o Deepfake</h1>
          <p className="text-xl text-slate-300 font-semibold mb-6">Supervivencia Visual</p>
          <button onClick={startGame} className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
            <Play className="w-5 h-5 fill-slate-900" /> Comenzar Entrenamiento
          </button>
        </div>
      )}
      
      {/* VISTA DE JUEGO */}
      {gameState === 'playing' && (
        <div className="w-full max-w-6xl flex flex-col h-[90vh]">
          
          <header className="flex justify-between items-center bg-slate-800 p-4 rounded-t-2xl border-b border-slate-700 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 h-1 bg-slate-700 w-full z-0">
               <div className="h-full bg-cyan-400 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / TIME_PER_LEVEL) * 100}%` }}></div>
            </div>
            <div className="flex gap-2 z-10">
              {[...Array(Math.max(0, lives))].map((_, i) => (
                <Heart key={i} className="w-8 h-8 text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              ))}
            </div>
            <div className="text-center z-10 flex flex-col items-center">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">NIVEL {currentLevelIndex + 1}/{GAME_LEVELS.length}</p>
              <h2 className="text-xl font-black text-cyan-400">{currentLevel.category}</h2>
              <p className={`text-sm font-bold flex items-center gap-1 mt-1 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}>
                <Timer className="w-4 h-4" /> 00:{timeLeft.toString().padStart(2, '0')}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 z-10">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-xl font-black text-white">{score}</span>
            </div>
          </header>

          <div className="flex-1 bg-slate-800/50 p-6 flex flex-col items-center justify-between">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl flex-1 max-h-[60vh] mt-4">
                {shuffledImages.map((image) => (
                  <button 
                    key={image.id} onClick={() => handleImageClick(image.isAi)} disabled={feedback !== null}
                    className={`relative w-full h-full rounded-xl overflow-hidden border-4 transition-all duration-300 transform ${
                      feedback === null ? 'border-transparent hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]' :
                      (feedback === 'correct' && image.isAi) ? 'border-green-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]' :
                      (feedback === 'incorrect' && !image.isAi) ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' :
                      'border-transparent opacity-50 grayscale'
                    }`}
                  >
                    <img src={image.url} alt="Opción" className="absolute inset-0 w-full h-full object-cover" />
                    {feedback !== null && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
                         {image.isAi ? (
                           <div className="bg-green-500 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold text-xl"><CheckCircle className="w-6 h-6" /> Falsa (IA)</div>
                         ) : (
                           <div className="bg-slate-700 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold text-xl"><XCircle className="w-6 h-6" /> Original</div>
                         )}
                      </div>
                    )}
                  </button>
                ))}
             </div>

             <div className="w-full max-w-3xl mt-6">
                {feedback === null ? (
                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
                    <ShieldAlert className="text-yellow-500 w-6 h-6 flex-shrink-0" />
                    <p className="text-slate-300"><strong className="text-slate-100">Tip visual:</strong> {currentLevel.hint}</p>
                  </div>
                ) : (
                  <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 text-center animate-fade-in-up shadow-2xl relative -top-10">
                    <h4 className="text-cyan-400 font-bold text-lg mb-2 flex items-center justify-center gap-2">
                      <Eye className="w-5 h-5" /> Análisis de la IA
                    </h4>
                    <p className="text-slate-300 text-lg mb-4">{currentLevel.explanation}</p>
                    <button 
                      onClick={handleNextLevel} // Ahora este botón sí hace algo
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    >
                      Siguiente Nivel →
                    </button>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}

      {/* VISTA DE GAME OVER */}
      {gameState === 'gameover' && (
        <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center animate-fade-in-up">
          <Heart className="w-20 h-20 text-red-500 mx-auto mb-6 flex-shrink-0" />
          <h1 className="text-5xl font-black text-red-500 mb-4">GAME OVER</h1>
          <p className="text-xl text-slate-300 mb-8">Te dejaste engañar por la máquina.</p>
          <div className="bg-slate-900 rounded-lg p-4 mb-8 border border-slate-700">
             <p className="text-sm text-slate-400">Puntuación Final</p>
             <p className="text-3xl font-black text-cyan-400">{score}</p>
          </div>
          <button onClick={startGame} className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-xl transition-all">
            Reintentar
          </button>
        </div>
      )}

      {/* NUEVO: VISTA DE VICTORIA */}
      {gameState === 'victory' && (
        <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-yellow-500/50 shadow-[0_0_50px_rgba(234,179,8,0.2)] text-center animate-fade-in-up">
          <Award className="w-24 h-24 text-yellow-400 mx-auto mb-6 flex-shrink-0" />
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-4">¡VICTORIA!</h1>
          <p className="text-xl text-slate-300 mb-8">Tu ojo humano es superior al algoritmo. Has completado el entrenamiento.</p>
          <div className="bg-slate-900 rounded-lg p-4 mb-8 border border-slate-700">
             <p className="text-sm text-slate-400">Puntuación Final</p>
             <p className="text-4xl font-black text-yellow-400">{score}</p>
          </div>
          <button onClick={startGame} className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all">
            Jugar de nuevo
          </button>
        </div>
      )}

    </div>
  )
}

export default App