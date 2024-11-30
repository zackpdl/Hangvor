import React from 'react';
import { useGame } from './hooks/useGame';
import { GameScreen } from './components/GameScreen';
import { GameOver } from './components/GameOver';
import { PlayerSetup } from './components/PlayerSetup';

function App() {
  const { gameState, startGame, nextQuestion, initializePlayers, endGame } = useGame();
  const { isPlaying, currentQuestion, loser, players, timeRemaining } = gameState;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Hangver
        </h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
          {!isPlaying && !loser && players.length === 0 && (
            <PlayerSetup 
              onStartGame={(players) => {
                initializePlayers(players);
                startGame();
              }} 
            />
          )}

          {!isPlaying && !loser && players.length > 0 && (
            <div className="text-center">
              <button
                onClick={startGame}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-bold"
              >
                Start Game
              </button>
            </div>
          )}

          {isPlaying && currentQuestion && (
            <GameScreen 
              question={currentQuestion}
              timeRemaining={timeRemaining}
              onTap={nextQuestion}
            />
          )}

          {loser && <GameOver loser={loser} onRestart={startGame} />}
        </div>

        {(isPlaying || players.length > 0) && (
          <button
            onClick={endGame}
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