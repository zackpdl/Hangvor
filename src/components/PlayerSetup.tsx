import React, { useState } from 'react';
import { UserPlus, Users, Play } from 'lucide-react';
import type { Player } from '../types/game';

interface PlayerSetupProps {
  onStartGame: (players: Player[]) => void;
}

export function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      setPlayers([...players, { id: crypto.randomUUID(), name: newPlayerName.trim() }]);
      setNewPlayerName('');
    }
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Users className="w-16 h-16 mx-auto mb-4 text-white" />
        <h2 className="text-2xl font-bold text-white mb-2">Who's Playing?</h2>
        <p className="text-white/80">Add at least 2 players to start</p>
      </div>

      <form onSubmit={handleAddPlayer} className="flex gap-2">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Enter player name"
          className="flex-1 px-4 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <UserPlus className="w-6 h-6" />
        </button>
      </form>

      <div className="space-y-2">
        {players.map(player => (
          <div
            key={player.id}
            className="flex items-center justify-between bg-white/90 p-3 rounded-lg"
          >
            <span className="font-medium text-gray-800">{player.name}</span>
            <button
              onClick={() => handleRemovePlayer(player.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {players.length >= 2 && (
        <button
          onClick={() => onStartGame(players)}
          className="w-full px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-bold flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          Start Game
        </button>
      )}
    </div>
  );
}