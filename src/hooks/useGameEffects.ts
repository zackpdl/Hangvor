import { useState, useCallback, useEffect, useRef } from 'react';

interface GameEffectsState {
  isFlashing: boolean;
  flashIntensity: number;
}

export function useGameEffects(timeRemaining: number) {
  const [effects, setEffects] = useState<GameEffectsState>({
    isFlashing: false,
    flashIntensity: 0
  });
  
  const flashInterval = useRef<number>();
  
  // Calculate flash rate based on remaining time
  const getFlashRate = useCallback(() => {
    const timePercent = timeRemaining / 60000;
    if (timePercent > 0.75) return 2000;
    if (timePercent > 0.5) return 1500;
    if (timePercent > 0.25) return 1000;
    return 500;
  }, [timeRemaining]);

  // Calculate flash intensity based on remaining time
  const getFlashIntensity = useCallback(() => {
    const timePercent = timeRemaining / 60000;
    if (timePercent > 0.75) return 0.2;
    if (timePercent > 0.5) return 0.4;
    if (timePercent > 0.25) return 0.6;
    return 0.8;
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      if (flashInterval.current) {
        clearInterval(flashInterval.current);
      }
      return;
    }

    const startFlashing = () => {
      const rate = getFlashRate();
      const intensity = getFlashIntensity();

      if (flashInterval.current) {
        clearInterval(flashInterval.current);
      }

      flashInterval.current = window.setInterval(() => {
        setEffects(prev => ({
          isFlashing: !prev.isFlashing,
          flashIntensity: intensity
        }));
      }, rate);
    };

    startFlashing();

    return () => {
      if (flashInterval.current) {
        clearInterval(flashInterval.current);
      }
    };
  }, [timeRemaining, getFlashRate, getFlashIntensity]);

  return effects;
}