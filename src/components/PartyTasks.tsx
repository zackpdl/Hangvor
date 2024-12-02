import React, { useState, useEffect } from 'react';
import type { Player } from '../types/game';

interface PartyTasksProps {
  players: Player[];
  onEndGame: () => void;
}

export function PartyTasks({ players, onEndGame }: PartyTasksProps) {
  const [currentTask, setCurrentTask] = useState('');
  const [cardsPlayed, setCardsPlayed] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const tasks = [
    // Social Tasks
    "*name must compliment every player in the room",
    "*name and *name must have a staring contest, loser drinks",
    "Everyone votes on who's the best dancer, winner gives out 3 sips",
    "*name must tell an embarrassing story or drink 3 times",
    "*name becomes the game master until the next round",
    
    // Challenges
    "First person to touch their nose gives 2 sips",
    "*name must speak in an accent until their next turn",
    "Everyone who's wearing black drinks",
    "*name must do their best celebrity impression",
    "Waterfall! Starting with *name",
    
    // Fun Tasks
    "*name must show the most recent photo in their phone",
    "Categories! *name picks a category, first to fail drinks",
    "*name must dance to the next song that plays",
    "Truth or Dare! *name chooses and *name asks",
    "*name must speak in rhymes until their next turn",
    
    // Group Activities
    "Everyone who's ever been to a festival drinks",
    "Never have I ever - 3 rounds starting with *name",
    "Rock, paper, scissors tournament! Loser drinks",
    "Everyone must switch seats! *name organizes",
    "*name creates a new rule for the game",
    
    // Final Cards
    "Everyone drinks!",
    "Cheers to a great game!",
    "Last person standing wins!",
    "Game master gives out 5 sips",
    "Everyone high-five *name"
  ];

  useEffect(() => {
    nextTask();
  }, []);

  function replaceName(text: string): string {
    const parts = text.split('*name');
    if (parts.length === 1) return text;

    let result = parts[0];
    for (let i = 1; i < parts.length; i++) {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      result += randomPlayer.name + parts[i];
    }
    return result;
  }

  function nextTask() {
    if (cardsPlayed >= 20) {
      setCurrentTask("Game Over! Thanks for playing! 🎉");
      return;
    }

    setIsAnimating(true);
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const task = replaceName(tasks[randomIndex]);
    
    // Remove used task
    tasks.splice(randomIndex, 1);
    
    setCurrentTask(task);
    setCardsPlayed(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 300);
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white dark:text-white mb-2">
          Party Tasks
        </h2>
        <p className="text-white/80 dark:text-white/70 text-sm">
          Complete the tasks or drink!
        </p>
      </div>

      <div 
        className={`bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-lg p-6 transform transition-all duration-300 ${
          isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        <p className="text-2xl text-white dark:text-white text-center font-bold">
          {currentTask}
        </p>
      </div>

      <button
        onClick={nextTask}
        className="w-full px-6 py-3 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-white rounded-lg transition-colors font-bold"
      >
        Next Task
      </button>

      <button
        onClick={onEndGame}
        className="w-full px-6 py-3 bg-red-500 dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-800 text-white rounded-lg transition-colors font-bold"
      >
        End Game
      </button>
    </div>
  );
}
