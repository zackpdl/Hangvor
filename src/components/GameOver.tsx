import React from 'react';
import { Beer } from 'lucide-react';

interface GameOverProps {
  loser: string;
  onRestart: () => void;
}

export function GameOver({ loser, onRestart }: GameOverProps) {
  return (
    <div className="text-center">
      <Beer className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
      <h2 className="text-2xl font-bold text-red-500 mb-2">BOOM!</h2>
      <p className="text-white mb-4">{loser} needs to drink! 🍻</p>
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
}