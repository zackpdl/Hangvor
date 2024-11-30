import React from 'react';
import { Bomb } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
}

export function Timer({ timeRemaining }: TimerProps) {
  const percentage = (timeRemaining / 60000) * 100;
  const seconds = Math.ceil(timeRemaining / 1000);
  
  return (
    <div className="relative w-32 h-32 mx-auto mb-6">
      <div 
        className="absolute inset-0 rounded-full border-4 border-red-500"
        style={{
          background: `conic-gradient(from 0deg, #ef4444 ${percentage}%, transparent ${percentage}%)`
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <Bomb className="w-12 h-12 text-red-500 animate-pulse" />
        <span className="text-white font-bold mt-1">{seconds}s</span>
      </div>
    </div>
  );
}