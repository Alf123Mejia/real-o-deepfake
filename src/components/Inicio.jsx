import { Eye, Play } from 'lucide-react';

export default function Inicio({ onStart }) {
  return (
    <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl text-center">
      <Eye className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
      <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">Real o Deepfake</h1>
      <p className="text-xl text-slate-300 font-semibold mb-6">Supervivencia Visual</p>
      <button onClick={onStart} className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
        <Play className="w-5 h-5 fill-slate-900" /> Comenzar Entrenamiento
      </button>
    </div>
  );
}