export interface Player {
  id: string;
  name: string;
}

export interface Question {
  id: number;
  text: string;
  category: string;
}

export interface GameState {
  isPlaying: boolean;
  timeRemaining: number;
  currentQuestion: Question | null;
  loser: string | null;
  players: Player[];
  currentPlayerIndex: number;
}

export type GamePhase = 'setup' | 'playing' | 'gameover';