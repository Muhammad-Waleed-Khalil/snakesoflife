/**
 * ABYSSAL VIPER CULT - Audio Engine
 * The sonic manifestation of dread
 */

export class AbyssalAudioEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOscillator: OscillatorNode | null = null;
  private enabled: boolean = false;
  private screamSamples: AudioBuffer[] = [];

  async init(): Promise<void> {
    if (typeof window === 'undefined') return;

    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = 0.15; // Low ambient volume
    this.masterGain.connect(this.audioContext.destination);
  }

  async enable(): Promise<void> {
    if (!this.audioContext) await this.init();

    this.enabled = true;
    this.startDrone();
  }

  disable(): void {
    this.enabled = false;
    this.stopDrone();
  }

  private startDrone(): void {
    if (!this.audioContext || !this.masterGain) return;

    // Low frequency drone at ~40Hz (safe alternative to 19Hz which can be dangerous)
    this.droneOscillator = this.audioContext.createOscillator();
    this.droneOscillator.type = 'sine';
    this.droneOscillator.frequency.value = 40;

    const droneGain = this.audioContext.createGain();
    droneGain.gain.value = 0.3;

    // Add some modulation for unease
    const lfo = this.audioContext.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // Very slow modulation

    const lfoGain = this.audioContext.createGain();
    lfoGain.gain.value = 10; // Slight frequency modulation

    lfo.connect(lfoGain);
    lfoGain.connect(this.droneOscillator.frequency);

    this.droneOscillator.connect(droneGain);
    droneGain.connect(this.masterGain);

    this.droneOscillator.start();
    lfo.start();
  }

  private stopDrone(): void {
    if (this.droneOscillator) {
      this.droneOscillator.stop();
      this.droneOscillator = null;
    }
  }

  playScream(): void {
    if (!this.audioContext || !this.masterGain || !this.enabled) return;

    // Generate a synthetic scream-like sound
    const now = this.audioContext.currentTime;
    const duration = 0.5;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    // Scream characteristics: high pitched with noise
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + duration);

    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 10;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  playHiss(): void {
    if (!this.audioContext || !this.masterGain || !this.enabled) return;

    const now = this.audioContext.currentTime;
    const duration = 2;

    // Create white noise
    const bufferSize = this.audioContext.sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 2;

    const gain = this.audioContext.createGain();
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
  }

  playBloodMoonSound(): void {
    if (!this.audioContext || !this.masterGain || !this.enabled) return;

    const now = this.audioContext.currentTime;
    const duration = 3;

    // Deep, ominous tone
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = 66;

    osc2.type = 'sine';
    osc2.frequency.value = 99;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.5);
    gain.gain.setValueAtTime(0.3, now + 2);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  setMasterVolume(volume: number): void {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }
}

export const audioEngine = new AbyssalAudioEngine();
