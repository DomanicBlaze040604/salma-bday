class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private bgOscillators: OscillatorNode[] = [];
  private bgGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private audioElem: HTMLAudioElement | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play soft chime / click sound
  playPop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {
      // AudioContext policy
    }
  }

  // Play celebratory harp / sparkle chime
  playSparkle() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const start = this.ctx.currentTime + idx * 0.06;
        gain.gain.setValueAtTime(0.1, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch {
      // Fail silently
    }
  }

  // Wheel tick sound
  playTick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // AudioContext policy
    }
  }

  // Card match win sound
  playWin() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const melody = [440, 554.37, 659.25, 880];
      melody.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = this.ctx.currentTime + idx * 0.1;
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch {
      // Ignore
    }
  }

  // Toggle Background Music
  toggleBgm(): boolean {
    this.initCtx();
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  getIsMuted(): boolean {
    return this.isMuted;
  }

  private startBgm() {
    if (this.isBgmPlaying) return;
    
    // Check if an external audio file exists
    if (!this.audioElem) {
      this.audioElem = new Audio('/music.mp3');
      this.audioElem.loop = true;
      this.audioElem.volume = 0.4;
    }

    const playPromise = this.audioElem.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isBgmPlaying = true;
        })
        .catch(() => {
          // Fallback to soothing ambient synth chords if no MP3
          this.startAmbientSynth();
          this.isBgmPlaying = true;
        });
    }
  }

  private startAmbientSynth() {
    if (!this.ctx) return;
    try {
      this.bgGain = this.ctx.createGain();
      this.bgGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      this.bgGain.connect(this.ctx.destination);

      // Sweet chord: C4, E4, G4, B4 (Cmaj7)
      const freqs = [261.63, 329.63, 392.00, 493.88];
      this.bgOscillators = freqs.map((f) => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f;
        osc.connect(this.bgGain!);
        osc.start();
        return osc;
      });
    } catch {
      // Synth failed
    }
  }

  private stopBgm() {
    if (this.audioElem) {
      this.audioElem.pause();
    }
    this.bgOscillators.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch {}
    });
    this.bgOscillators = [];
    if (this.bgGain) {
      try { this.bgGain.disconnect(); } catch {}
      this.bgGain = null;
    }
    this.isBgmPlaying = false;
  }
}

export const sound = new SoundManager();
