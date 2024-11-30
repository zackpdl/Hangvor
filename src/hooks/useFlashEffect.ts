import { useState, useCallback, useEffect } from 'react';

export function useFlashEffect() {
  const [isFlashing, setIsFlashing] = useState(false);

  const flash = useCallback(() => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 100);
  }, []);

  useEffect(() => {
    if (isFlashing) {
      document.body.style.backgroundColor = '#ffffff';
      return () => {
        document.body.style.backgroundColor = '';
      };
    }
  }, [isFlashing]);

  return { isFlashing, flash };
}