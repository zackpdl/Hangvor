import React from 'react';
import { Question as QuestionType } from '../types/game';
import { useGameEffects } from '../hooks/useGameEffects';

interface GameScreenProps {
  question: QuestionType;
  onTap: () => void;
  timeRemaining: number;
}

export function GameScreen({ question, onTap, timeRemaining }: GameScreenProps) {
  const { isFlashing, flashIntensity } = useGameEffects(timeRemaining);

  const handleTap = () => {
    onTap();
  };

  const backgroundColor = isFlashing 
    ? `rgba(255, 0, 0, ${flashIntensity})`
    : 'transparent';

  return (
    <div 
      onClick={handleTap}
      className="transition-colors duration-100 min-h-[200px] rounded-lg p-4"
      style={{ backgroundColor }}
    >
      <div className="text-center p-6 bg-white/90 rounded-lg shadow-lg">
        <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-white bg-purple-500 rounded-full">
          {question.category}
        </span>
        <h2 className="text-xl font-bold text-gray-800">
          {question.text}
        </h2>
        <p className="mt-4 text-sm text-gray-600">
          Tap anywhere to continue
        </p>
      </div>
    </div>
  );
}