import { Heart, Award } from 'lucide-react';

export default function Victoria({ gameState, score, onRestart }) {
  if (gameState === 'gameover') {
    return (
      <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center animate-fade-in-up">
        <Heart className="w-20 h-20 text-red-500 mx-auto mb-6 flex-shrink-0" />
        <h1 className="text-5xl font-black text-red-500 mb-4">GAME OVER</h1>
        <p className="text-xl text-slate-300 mb-8">Te dejaste engañar por la máquina.</p>
        <div className="bg-slate-900 rounded-lg p-4 mb-8 border border-slate-700">
          <p className="text-sm text-slate-400">Puntuación Final</p>
          <p className="text-3xl font-black text-cyan-400">{score}</p>
        </div>
        <button onClick={onRestart} className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-xl transition-all">
          Reintentar
        </button>
      </div>
    );
  }

  if (gameState === 'victory') {
    return (
      <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-yellow-500/50 shadow-[0_0_50px_rgba(234,179,8,0.2)] text-center animate-fade-in-up">
        <Award className="w-24 h-24 text-yellow-400 mx-auto mb-6 flex-shrink-0" />
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-4">¡VICTORIA!</h1>
        <p className="text-xl text-slate-300 mb-8">Tu ojo humano es superior al algoritmo. Has completado el entrenamiento.</p>
        <div className="bg-slate-900 rounded-lg p-4 mb-8 border border-slate-700">
          <p className="text-sm text-slate-400">Puntuación Final</p>
          <p className="text-4xl font-black text-yellow-400">{score}</p>
        </div>
        <button onClick={onRestart} className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all">
          Jugar de nuevo
        </button>
      </div>
    );
  }

  return null;
}