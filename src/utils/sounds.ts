class SoundManager {
  private tickSound: HTMLAudioElement;
  private explosionSound: HTMLAudioElement;
  private tickInterval: number | null = null;
  private currentVolume: number = 0.2;

  constructor() {
    this.tickSound = new Audio('https://cdn.freesound.org/previews/263/263133_2064400-lq.mp3');
    this.explosionSound = new Audio('/explosion.wav');
    this.explosionSound.volume = 0.6;
  }

  startTicking(timeRemaining: number) {
    if (this.tickInterval) this.stopTicking();
    
    let currentRate = 1500;  // Start with 1.5 seconds between ticks
    const minRate = 300;     // Don't go faster than 1 tick per 0.3 seconds
    
    const tick = () => {
      // Preload the sound
      this.tickSound.load();
      this.tickSound.volume = this.currentVolume;
      
      const playPromise = this.tickSound.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handle any errors that occur during playback
          console.warn('Audio playback failed');
        });
      }
      
      // Calculate remaining time in seconds
      const secondsRemaining = timeRemaining / 1000;
      
      // Only start speeding up in the last 10 seconds
      if (secondsRemaining <= 10) {
        // Exponential acceleration in the last 10 seconds
        const acceleration = Math.pow((10 - secondsRemaining) / 10, 2);
        currentRate = 1500 - (1200 * acceleration); // Will go from 1500ms to 300ms
        this.currentVolume = 0.2 + (0.6 * acceleration);
      } else {
        // Before 10 seconds, maintain steady rate with slight acceleration
        const slowAcceleration = (40 - secondsRemaining) / 40;
        currentRate = 1500 - (200 * slowAcceleration); // Will only speed up slightly
        this.currentVolume = 0.2;
      }
      
      currentRate = Math.max(minRate, currentRate);
      this.currentVolume = Math.min(0.8, this.currentVolume);
      
      if (this.tickInterval) {
        clearTimeout(this.tickInterval);
      }
      this.tickInterval = window.setTimeout(tick, currentRate);
    };

    // Start with a preload
    this.tickSound.load();
    this.explosionSound.load();
    tick();
  }

  stopTicking() {
    if (this.tickInterval) {
      clearTimeout(this.tickInterval);
      this.tickInterval = null;
    }
    this.currentVolume = 0.2;
    this.tickSound.pause();
    this.tickSound.currentTime = 0;
  }

  playExplosion() {
    this.explosionSound.load();
    const playPromise = this.explosionSound.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.warn('Explosion sound playback failed');
      });
    }
  }

  cleanup() {
    this.stopTicking();
    this.tickSound.pause();
    this.explosionSound.pause();
  }
}

export const soundManager = new SoundManager();