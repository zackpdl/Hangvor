import React, { useState } from 'react';
import type { Player } from '../types/game';

interface NeverHaveIEverProps {
  players: Player[];
  onEndGame: () => void;
}

export function NeverHaveIEver({ players, onEndGame }: NeverHaveIEverProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [statement, setStatement] = useState(getRandomStatement());
  
  const currentPlayer = players[currentPlayerIndex];

  function getRandomStatement(): string {
    const statements = [
      "traveled to another continent",
      "broken a bone",
      "gone skydiving",
      "eaten sushi",
      "been in a TV show or movie",
      "met a celebrity",
      "gotten a tattoo",
      "run a marathon",
      "learned to play a musical instrument",
      "spoken more than two languages",
      "gone camping",
      "cooked a full meal from scratch",
      "been on a blind date",
      "participated in a protest",
      "written a song",
      "started a business",
      "gone surfing",
      "lived in another country",
      "performed on stage",
      "won a competition"
    ];
    
    return statements[Math.floor(Math.random() * statements.length)];
  }

  function nextTurn() {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    setStatement(getRandomStatement());
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">
          {currentPlayer.name}'s Turn
        </h2>
        <p className="text-white/80 text-sm">
          Read the statement and drink if you have done it!
        </p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
        <p className="text-xl text-white text-center font-medium">
          Never have I ever...
        </p>
        <p className="text-2xl text-white text-center font-bold mt-4">
          {statement}
        </p>
      </div>

      <button
        onClick={nextTurn}
        className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors font-bold"
      >
        Next Player
      </button>

      <button
        onClick={onEndGame}
        className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-bold"
      >
        End Game
      </button>
    </div>
  );
}
