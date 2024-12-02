import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import { GameScreen } from './components/GameScreen';
import { GameOver } from './components/GameOver';
import { PlayerSetup } from './components/PlayerSetup';
import { GameSelector, GameType } from './components/GameSelector';
import { NeverHaveIEver } from './components/NeverHaveIEver';
import { PartyTasks } from './components/PartyTasks';

function App() {
  const { gameState, startGame, nextQuestion, initializePlayers, endGame } = useGame();
  const { isPlaying, currentQuestion, loser, players, timeRemaining } = gameState;
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

  const handleEndGame = () => {
    endGame();
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Hangver
        </h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
          {!selectedGame && !isPlaying && !loser && players.length === 0 && (
            <PlayerSetup 
              onStartGame={(players) => {
                initializePlayers(players);
              }} 
            />
          )}

          {!selectedGame && !isPlaying && !loser && players.length > 0 && (
            <GameSelector onSelectGame={(gameType) => {
              setSelectedGame(gameType);
              if (gameType === 'hangver') {
                startGame();
              }
            }} />
          )}

          {selectedGame === 'hangver' && isPlaying && currentQuestion && (
            <GameScreen 
              question={currentQuestion}
              timeRemaining={timeRemaining}
              onTap={nextQuestion}
            />
          )}

          {selectedGame === 'never-have-i-ever' && players.length > 0 && (
            <NeverHaveIEver 
              players={players}
              onEndGame={handleEndGame}
            />
          )}

          {selectedGame === 'party-tasks' && players.length > 0 && (
            <PartyTasks
              players={players}
              onEndGame={handleEndGame}
            />
          )}

          {loser && <GameOver loser={loser} onRestart={startGame} />}
        </div>

        {((isPlaying && selectedGame === 'hangver') || (players.length > 0 && !selectedGame)) && (
          <button
            onClick={handleEndGame}
            className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            End Game
          </button>
        )}
      </div>
    </div>
  );
}

export default App;