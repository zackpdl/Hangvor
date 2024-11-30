import React from 'react';
import type { Question as QuestionType } from '../types/game';

interface QuestionProps {
  question: QuestionType;
}

export function Question({ question }: QuestionProps) {
  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-lg">
      <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-white bg-purple-500 rounded-full">
        {question.category}
      </span>
      <h2 className="text-xl font-bold text-gray-800">
        {question.text}
      </h2>
    </div>
  );
}