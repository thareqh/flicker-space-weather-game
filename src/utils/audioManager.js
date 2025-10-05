export class AudioManager {
  constructor(){
    this.enabled = true;
    this.sounds = {};
    this.preloadSounds();
  }
  
  setEnabled(v){ this.enabled = !!v; }
  
  preloadSounds() {
    // Create synthetic sounds using Web Audio API
    this.sounds = {
      sparkle: this.createSparkleSound(),
      solarFlare: this.createSolarFlareSound(),
      success: this.createSuccessSound(),
      click: this.createClickSound(),
      whoosh: this.createWhooshSound(),
      twinkle: this.createTwinkleSound()
    };
  }
  
  createSparkleSound() {
    return () => this.playTone(800, 0.1, 'sine');
  }
  
  createSolarFlareSound() {
    return () => {
      this.playTone(400, 0.3, 'sawtooth');
      setTimeout(() => this.playTone(600, 0.2, 'sine'), 100);
    };
  }
  
  createSuccessSound() {
    return () => {
      this.playTone(523, 0.2, 'sine'); // C
      setTimeout(() => this.playTone(659, 0.2, 'sine'), 150); // E
      setTimeout(() => this.playTone(784, 0.3, 'sine'), 300); // G
    };
  }
  
  createClickSound() {
    return () => this.playTone(1000, 0.05, 'square');
  }
  
  createWhooshSound() {
    return () => this.playTone(200, 0.5, 'sawtooth');
  }
  
  createTwinkleSound() {
    return () => {
      this.playTone(1000, 0.1, 'sine');
      setTimeout(() => this.playTone(1200, 0.1, 'sine'), 100);
      setTimeout(() => this.playTone(800, 0.1, 'sine'), 200);
    };
  }
  
  playTone(frequency, duration, type = 'sine') {
    if (!this.enabled) return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      // Fallback for browsers without Web Audio API
      console.log('Audio not available');
    }
  }
  
  playSound(soundName) {
    if (!this.enabled || !this.sounds[soundName]) return;
    this.sounds[soundName]();
  }
  
  playFile(path){
    if (!this.enabled || !path) return;
    const audio = new Audio(path);
    const p = audio.play();
    if (p && p.catch) p.catch(() => {});
  }
}

// Create a global instance
export const audioManager = new AudioManager();


