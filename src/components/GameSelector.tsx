import React from 'react';

export type GameType = 'hangver' | 'never-have-i-ever' | 'party-tasks';

interface GameSelectorProps {
  onSelectGame: (gameType: GameType) => void;
}

export function GameSelector({ onSelectGame }: GameSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white dark:text-white text-center mb-6">
        Choose Your Game
      </h2>
      
      <button
        onClick={() => onSelectGame('hangver')}
        className="w-full px-6 py-4 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-white rounded-lg transition-colors"
      >
        <h3 className="text-xl font-bold mb-2">Hangver</h3>
        <p className="text-sm opacity-80">
          Pass the phone around and answer questions before time runs out!
        </p>
      </button>

      <button
        onClick={() => onSelectGame('never-have-i-ever')}
        className="w-full px-6 py-4 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-white rounded-lg transition-colors"
      >
        <h3 className="text-xl font-bold mb-2">Never Have I Ever</h3>
        <p className="text-sm opacity-80">
          Take turns revealing what you've never done!
        </p>
      </button>

      <button
        onClick={() => onSelectGame('party-tasks')}
        className="w-full px-6 py-4 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-white rounded-lg transition-colors"
      >
        <h3 className="text-xl font-bold mb-2">Party Tasks</h3>
        <p className="text-sm opacity-80">
          Complete fun challenges and tasks or drink! Perfect for getting the party started!
        </p>
      </button>
    </div>
  );
}
