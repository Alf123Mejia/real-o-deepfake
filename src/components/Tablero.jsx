import { Heart, Timer, Trophy, ShieldAlert, CheckCircle, XCircle, Eye } from 'lucide-react';

export default function Tablero(props) {
  return (
    <div className="w-full max-w-6xl flex flex-col h-[90vh]">
      <header className="flex justify-between items-center bg-slate-800 p-4 rounded-t-2xl border-b border-slate-700 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-1 bg-slate-700 w-full z-0">
          <div className="h-full bg-cyan-400 transition-all duration-1000 ease-linear" style={{ width: `${(props.timeLeft / 15) * 100}%` }}></div>
        </div>
        <div className="flex gap-2 z-10">
          {[...Array(Math.max(0, props.lives))].map((_, i) => (
            <Heart key={i} className="w-8 h-8 text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          ))}
        </div>
        <div className="text-center z-10 flex flex-col items-center">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">NIVEL {props.currentLevelIndex + 1}/8</p>
          <h2 className="text-xl font-black text-cyan-400">{props.currentLevel.category}</h2>
          <p className={`text-sm font-bold flex items-center gap-1 mt-1 ${props.timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}>
            <Timer className="w-4 h-4" /> 00:{props.timeLeft.toString().padStart(2, '0')}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 z-10">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-black text-white">{props.score}</span>
        </div>
      </header>

      <div className="flex-1 bg-slate-800/50 p-6 flex flex-col items-center justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl flex-1 max-h-[60vh] mt-4">
          {props.shuffledImages.map((image) => (
            <button
              key={image.id} onClick={() => props.handleImageClick(image.isAi)} disabled={props.feedback !== null}
              className={`relative w-full h-full rounded-xl overflow-hidden border-4 transition-all duration-300 transform ${props.feedback === null ? 'border-transparent hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]' :
                (props.feedback === 'correct' && image.isAi) ? 'border-green-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]' :
                  (props.feedback === 'incorrect' && !image.isAi) ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' :
                    'border-transparent opacity-50 grayscale'
                }`}
            >
              <img src={image.url} alt="Opción" className="absolute inset-0 w-full h-full object-cover" />
              {props.feedback !== null && (
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
          {props.feedback === null ? (
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
              <ShieldAlert className="text-yellow-500 w-6 h-6 flex-shrink-0" />
              <p className="text-slate-300"><strong className="text-slate-100">Tip visual:</strong> {props.agentData.loading ? "El Agente IA está analizando la imagen..." : props.agentData.hint}</p>
            </div>
          ) : (
            <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 text-center animate-fade-in-up shadow-2xl relative -top-10">
              <h4 className="text-cyan-400 font-bold text-lg mb-2 flex items-center justify-center gap-2">
                <Eye className="w-5 h-5" /> Análisis de la IA
              </h4>
              <p className="text-slate-300 text-lg mb-4">{props.agentData.explanation}</p>
              <button
                onClick={props.handleNextLevel}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                {props.lives <= 0 ? "Finalizar Juego" : "Siguiente Nivel →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}