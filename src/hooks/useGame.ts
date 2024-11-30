import { useState, useCallback, useEffect, useRef } from 'react';
import { questions } from '../data/questions';
import { soundManager } from '../utils/sounds';
import type { GameState, Question, Player } from '../types/game';

const GAME_DURATION = 40000; // 40 seconds

export function useGame() {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    timeRemaining: GAME_DURATION,
    currentQuestion: null,
    loser: null,
    players: [],
    currentPlayerIndex: 0
  });
  
  const explosionTimeout = useRef<number>();
  const timerInterval = useRef<number>();

  const getRandomQuestion = useCallback(() => {
    if (gameState.players.length < 2) return null;

    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const nextPlayer = gameState.players[(gameState.currentPlayerIndex + 1) % gameState.players.length];

    if (!currentPlayer || !nextPlayer) return null;

    const text = question.text
      .replace('[CURRENT]', currentPlayer.name)
      .replace('[NEXT]', nextPlayer.name);

    return { ...question, text };
  }, [gameState.players, gameState.currentPlayerIndex]);

  const nextQuestion = useCallback(() => {
    const newQuestion = getRandomQuestion();
    if (!newQuestion) return;

    setGameState(prev => ({
      ...prev,
      currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
      currentQuestion: newQuestion
    }));
  }, [getRandomQuestion]);

  const initializePlayers = useCallback((players: Player[]) => {
    if (players.length < 2) return;
    
    setGameState(prev => ({
      ...prev,
      players,
      currentPlayerIndex: 0,
      isPlaying: false,
      currentQuestion: null,
      loser: null,
      timeRemaining: GAME_DURATION
    }));
  }, []);

  const startGame = useCallback(() => {
    if (gameState.players.length < 2) return;
    
    if (explosionTimeout.current) {
      clearTimeout(explosionTimeout.current);
    }
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    const newQuestion = getRandomQuestion();
    if (!newQuestion) return;
    
    const startTime = Date.now();
    
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      timeRemaining: GAME_DURATION,
      currentQuestion: newQuestion,
      loser: null,
      currentPlayerIndex: 0
    }));

    soundManager.startTicking(GAME_DURATION);

    // Update timer every 100ms for smooth countdown
    timerInterval.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, GAME_DURATION - elapsed);
      
      setGameState(prev => ({
        ...prev,
        timeRemaining: remaining
      }));
    }, 100);

    explosionTimeout.current = window.setTimeout(() => {
      const currentPlayer = gameState.players[gameState.currentPlayerIndex];
      soundManager.stopTicking();
      soundManager.playExplosion();
      
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      
      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        timeRemaining: 0,
        loser: currentPlayer?.name ?? 'Someone'
      }));
    }, GAME_DURATION);
  }, [getRandomQuestion, gameState.players, gameState.currentPlayerIndex]);

  const endGame = useCallback(() => {
    if (explosionTimeout.current) {
      clearTimeout(explosionTimeout.current);
    }
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    soundManager.stopTicking();
    
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      timeRemaining: GAME_DURATION,
      currentQuestion: null,
      loser: null,
      players: [],
      currentPlayerIndex: 0
    }));
  }, []);

  useEffect(() => {
    return () => {
      if (explosionTimeout.current) {
        clearTimeout(explosionTimeout.current);
      }
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      soundManager.cleanup();
    };
  }, []);

  return {
    gameState,
    startGame,
    nextQuestion,
    initializePlayers,
    endGame
  };
}