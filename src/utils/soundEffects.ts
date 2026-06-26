"use client";

class SoundEffects {
  private ctx: AudioContext | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const unlockAudio = () => {
        this.init();
        if (this.ctx) {
          try {
            // Play a micro silent oscillator sweep to satisfy Safari's unlock gesture
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(this.ctx.destination);
            osc.frequency.setValueAtTime(1000, this.ctx.currentTime);
            gainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);
            osc.start(0);
            osc.stop(0.01);
          } catch (e) {
            console.warn("Silent trigger error:", e);
          }

          if (this.ctx.state === "suspended") {
            this.ctx.resume().then(() => {
              if (this.ctx && this.ctx.state === "running") {
                cleanup();
              }
            });
          } else if (this.ctx.state === "running") {
            cleanup();
          }
        }
      };

      const cleanup = () => {
        window.removeEventListener("click", unlockAudio);
        window.removeEventListener("touchstart", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
      };

      window.addEventListener("click", unlockAudio);
      window.addEventListener("touchstart", unlockAudio);
      window.addEventListener("keydown", unlockAudio);
    }
  }

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  // ── AI SYSTEM CLICK: Digital confirmation pulse ──
  // Sub-bass mechanical thud + high-frequency data-burst = "command acknowledged"
  playClick() {
    this.init();
    if (!this.ctx) return;
    
    try {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // Layer 1: Sub-bass mechanical thud (like a relay engaging)
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.type = "sine";
      sub.frequency.setValueAtTime(80, now);
      sub.frequency.exponentialRampToValueAtTime(40, now + 0.08);
      subGain.gain.setValueAtTime(0.15, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      sub.start(now);
      sub.stop(now + 0.08);

      // Layer 2: Sharp digital confirmation blip (high-freq data burst)
      const blip = this.ctx.createOscillator();
      const blipGain = this.ctx.createGain();
      const blipFilter = this.ctx.createBiquadFilter();
      blip.connect(blipFilter);
      blipFilter.connect(blipGain);
      blipGain.connect(this.ctx.destination);
      blip.type = "square";
      blipFilter.type = "bandpass";
      blipFilter.frequency.setValueAtTime(2200, now);
      blipFilter.Q.setValueAtTime(8, now);
      blip.frequency.setValueAtTime(1800, now);
      blip.frequency.exponentialRampToValueAtTime(2400, now + 0.02);
      blipGain.gain.setValueAtTime(0.07, now);
      blipGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      blip.start(now);
      blip.stop(now + 0.05);

      // Layer 3: Quick descending "data processed" tail
      const tail = this.ctx.createOscillator();
      const tailGain = this.ctx.createGain();
      tail.connect(tailGain);
      tailGain.connect(this.ctx.destination);
      tail.type = "sine";
      tail.frequency.setValueAtTime(1200, now + 0.03);
      tail.frequency.exponentialRampToValueAtTime(600, now + 0.1);
      tailGain.gain.setValueAtTime(0.04, now + 0.03);
      tailGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
      tail.start(now + 0.03);
      tail.stop(now + 0.1);
    } catch (e) {
      console.warn("Audio feedback error:", e);
    }
  }

  // ── AI SYSTEM HOVER: Scanning radar ping ──
  // Quick resonant sweep like a sensor detecting a target
  playHover() {
    if (!this.ctx || this.ctx.state !== "running") return;

    try {
      const now = this.ctx.currentTime;

      // Layer 1: Ultra-short resonant scan ping
      const ping = this.ctx.createOscillator();
      const pingGain = this.ctx.createGain();
      const pingFilter = this.ctx.createBiquadFilter();
      ping.connect(pingFilter);
      pingFilter.connect(pingGain);
      pingGain.connect(this.ctx.destination);
      ping.type = "sine";
      pingFilter.type = "highpass";
      pingFilter.frequency.setValueAtTime(800, now);
      pingFilter.Q.setValueAtTime(5, now);
      ping.frequency.setValueAtTime(1400, now);
      ping.frequency.exponentialRampToValueAtTime(1800, now + 0.025);
      pingGain.gain.setValueAtTime(0.05, now);
      pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      ping.start(now);
      ping.stop(now + 0.04);

      // Layer 2: Tiny sub-harmonic warmth (machine hum sensation)
      const hum = this.ctx.createOscillator();
      const humGain = this.ctx.createGain();
      hum.connect(humGain);
      humGain.connect(this.ctx.destination);
      hum.type = "triangle";
      hum.frequency.setValueAtTime(200, now);
      humGain.gain.setValueAtTime(0.02, now);
      humGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      hum.start(now);
      hum.stop(now + 0.03);
    } catch (e) {
      console.warn("Audio feedback error:", e);
    }
  }

  // ── AI SYSTEM LIKE: Neural activation cascade ──
  // Layered ascending tones + white noise burst = "neural pathway activated"
  playLike() {
    this.init();
    if (!this.ctx) return;

    try {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // Layer 1: White noise burst (data processing crunch)
      const bufferSize = this.ctx.sampleRate * 0.12;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        noiseData[i] = (Math.random() * 2 - 1) * 0.3;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseGain = this.ctx.createGain();
      const noiseFilter = this.ctx.createBiquadFilter();
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(3000, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(6000, now + 0.1);
      noiseFilter.Q.setValueAtTime(2, now);
      noiseGain.gain.setValueAtTime(0.06, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      noise.start(now);

      // Layer 2: Ascending neural cascade (3 stacked sine tones rising)
      const neuralFreqs = [400, 800, 1200];
      neuralFreqs.forEach((baseFreq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = "sine";
        const startTime = now + i * 0.04;
        osc.frequency.setValueAtTime(baseFreq, startTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, startTime + 0.15);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.07, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.18);
        osc.start(startTime);
        osc.stop(startTime + 0.18);
      });

      // Layer 3: "System confirmed" — a final bright bell ping
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.connect(bellGain);
      bellGain.connect(this.ctx.destination);
      bell.type = "sine";
      bell.frequency.setValueAtTime(2400, now + 0.18);
      bellGain.gain.setValueAtTime(0.06, now + 0.18);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      bell.start(now + 0.18);
      bell.stop(now + 0.4);
    } catch (e) {
      console.warn("Audio feedback error:", e);
    }
  }

  // ── AI SYSTEM LOADING: Full boot-up sequence ──
  // Power-up sweep → data stream processing → system-ready confirmation
  playLoading() {
    this.init();
    if (!this.ctx) return;

    try {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // Phase 1: Power-up low-frequency sweep (0s – 0.3s)
      const powerUp = this.ctx.createOscillator();
      const powerGain = this.ctx.createGain();
      powerUp.connect(powerGain);
      powerGain.connect(this.ctx.destination);
      powerUp.type = "sawtooth";
      powerUp.frequency.setValueAtTime(50, now);
      powerUp.frequency.exponentialRampToValueAtTime(400, now + 0.3);
      powerGain.gain.setValueAtTime(0.08, now);
      powerGain.gain.linearRampToValueAtTime(0.04, now + 0.15);
      powerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      powerUp.start(now);
      powerUp.stop(now + 0.3);

      // Phase 2: Digital data stream — rapid staccato beeps (0.1s – 0.5s)
      const dataFreqs = [600, 900, 750, 1100, 850, 1300, 1000, 1500, 1200, 1800];
      dataFreqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = "square";
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.04);
        filter.Q.setValueAtTime(10, now + 0.1 + idx * 0.04);
        osc.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.04);
        gain.gain.setValueAtTime(0, now + 0.1 + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.05, now + 0.1 + idx * 0.04 + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1 + idx * 0.04 + 0.03);
        osc.start(now + 0.1 + idx * 0.04);
        osc.stop(now + 0.1 + idx * 0.04 + 0.03);
      });

      // Phase 3: System online — warm confirmation chord (0.5s – 0.9s)
      const chordFreqs = [440, 554, 659]; // A4, C#5, E5 — major triad
      chordFreqs.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + 0.52);
        gain.gain.setValueAtTime(0, now + 0.52);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.56);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
        osc.start(now + 0.52);
        osc.stop(now + 0.9);
      });

      // Phase 3b: White noise fade-in behind chord (system initializing ambience)
      const noiseDur = 0.35;
      const nBufSize = Math.floor(this.ctx.sampleRate * noiseDur);
      const nBuf = this.ctx.createBuffer(1, nBufSize, this.ctx.sampleRate);
      const nData = nBuf.getChannelData(0);
      for (let i = 0; i < nBufSize; i++) {
        nData[i] = (Math.random() * 2 - 1) * 0.15;
      }
      const nSrc = this.ctx.createBufferSource();
      nSrc.buffer = nBuf;
      const nGain = this.ctx.createGain();
      const nFilter = this.ctx.createBiquadFilter();
      nSrc.connect(nFilter);
      nFilter.connect(nGain);
      nGain.connect(this.ctx.destination);
      nFilter.type = "highpass";
      nFilter.frequency.setValueAtTime(4000, now + 0.52);
      nGain.gain.setValueAtTime(0.03, now + 0.52);
      nGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
      nSrc.start(now + 0.52);
    } catch (e) {
      console.warn("Audio feedback error:", e);
    }
  }
}

export const playSound = new SoundEffects();

