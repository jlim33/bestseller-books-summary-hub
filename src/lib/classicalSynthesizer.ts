// Web Audio API Procedural Classical Synthesizer Engine
// Generates studio-grade acoustic piano, cello, and chamber string harmonic sonorities for Bach, Vivaldi, Chopin & Satie

export interface NoteEvent {
  note: string; // Note name (e.g. "C4", "D4", "G3", "Eb5", "F#4") or "REST"
  duration: number; // in seconds
}

// Frequency lookup table
const NOTE_FREQS: Record<string, number> = {
  REST: 0,
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.0, A2: 110.0, B2: 123.47,
  C3: 130.81, "C#3": 138.59, Db3: 138.59, D3: 146.83, "D#3": 155.56, Eb3: 155.56, E3: 164.81, F3: 174.61, "F#3": 185.0, Gb3: 185.0, G3: 196.0, "G#3": 207.65, Ab3: 207.65, A3: 220.0, "A#3": 233.08, Bb3: 233.08, B3: 246.94,
  C4: 261.63, "C#4": 277.18, Db4: 277.18, D4: 293.66, "D#4": 311.13, Eb4: 311.13, E4: 329.63, F4: 349.23, "F#4": 369.99, Gb4: 369.99, G4: 392.0, "G#4": 415.3, Ab4: 415.3, A4: 440.0, "A#4": 466.16, Bb4: 466.16, B4: 493.88,
  C5: 523.25, "C#5": 554.37, Db5: 554.37, D5: 587.33, "D#5": 622.25, Eb5: 622.25, E5: 659.25, F5: 698.46, "F#5": 739.99, Gb5: 739.99, G5: 783.99, "G#5": 830.61, Ab5: 830.61, A5: 880.0, "A#5": 932.33, Bb5: 932.33, B5: 987.77,
  C6: 1046.5, D6: 1174.66, E6: 1318.51, F6: 1396.91, G6: 1567.98,
};

// 1. Bach - Air on the G String (BWV 1068) Melody & Bass Harmony
export const SCORE_BACH_AIR_ON_G_STRING: NoteEvent[] = [
  { note: "B4", duration: 2.0 }, { note: "B4", duration: 0.5 }, { note: "A4", duration: 0.5 }, { note: "G4", duration: 1.0 },
  { note: "G4", duration: 2.0 }, { note: "F#4", duration: 1.0 }, { note: "E4", duration: 1.0 },
  { note: "D4", duration: 2.5 }, { note: "E4", duration: 0.5 }, { note: "F#4", duration: 1.0 },
  { note: "G4", duration: 2.0 }, { note: "A4", duration: 1.0 }, { note: "B4", duration: 1.0 },
  { note: "C5", duration: 1.5 }, { note: "B4", duration: 0.5 }, { note: "A4", duration: 1.0 }, { note: "G4", duration: 1.0 },
  { note: "F#4", duration: 2.5 }, { note: "G4", duration: 0.5 }, { note: "A4", duration: 1.0 },
  { note: "D4", duration: 2.0 }, { note: "REST", duration: 0.5 },
  { note: "D5", duration: 2.0 }, { note: "C5", duration: 0.5 }, { note: "B4", duration: 0.5 }, { note: "A4", duration: 1.0 },
  { note: "B4", duration: 2.0 }, { note: "G4", duration: 2.0 },
  { note: "E4", duration: 1.5 }, { note: "F#4", duration: 0.5 }, { note: "G4", duration: 1.0 }, { note: "A4", duration: 1.0 },
  { note: "D4", duration: 3.0 },
];

// 2. Bach - Cello Suite No. 1 in G major (BWV 1007 - Prelude)
export const SCORE_BACH_CELLO_SUITE_1: NoteEvent[] = [
  { note: "G2", duration: 0.25 }, { note: "D3", duration: 0.25 }, { note: "B3", duration: 0.25 }, { note: "A3", duration: 0.25 },
  { note: "B3", duration: 0.25 }, { note: "D3", duration: 0.25 }, { note: "B3", duration: 0.25 }, { note: "D3", duration: 0.25 },
  { note: "G2", duration: 0.25 }, { note: "D3", duration: 0.25 }, { note: "B3", duration: 0.25 }, { note: "A3", duration: 0.25 },
  { note: "B3", duration: 0.25 }, { note: "D3", duration: 0.25 }, { note: "B3", duration: 0.25 }, { note: "D3", duration: 0.25 },
  { note: "G2", duration: 0.25 }, { note: "E3", duration: 0.25 }, { note: "C4", duration: 0.25 }, { note: "B3", duration: 0.25 },
  { note: "C4", duration: 0.25 }, { note: "E3", duration: 0.25 }, { note: "C4", duration: 0.25 }, { note: "E3", duration: 0.25 },
  { note: "G2", duration: 0.25 }, { note: "F#3", duration: 0.25 }, { note: "C4", duration: 0.25 }, { note: "B3", duration: 0.25 },
  { note: "C4", duration: 0.25 }, { note: "F#3", duration: 0.25 }, { note: "C4", duration: 0.25 }, { note: "F#3", duration: 0.25 },
  { note: "G2", duration: 0.25 }, { note: "D3", duration: 0.25 }, { note: "B3", duration: 0.25 }, { note: "A3", duration: 0.25 },
  { note: "B3", duration: 0.25 }, { note: "G3", duration: 0.25 }, { note: "F#3", duration: 0.25 }, { note: "G3", duration: 0.25 },
  { note: "E2", duration: 0.25 }, { note: "B2", duration: 0.25 }, { note: "G3", duration: 0.25 }, { note: "F#3", duration: 0.25 },
  { note: "G3", duration: 0.25 }, { note: "B2", duration: 0.25 }, { note: "G3", duration: 0.25 }, { note: "B2", duration: 0.25 },
  { note: "G2", duration: 1.0 },
];

// 3. Bach - Goldberg Variations: Aria (BWV 988)
export const SCORE_BACH_GOLDBERG_ARIA: NoteEvent[] = [
  { note: "G4", duration: 1.0 }, { note: "G4", duration: 0.5 }, { note: "A4", duration: 0.5 }, { note: "B4", duration: 1.0 },
  { note: "A4", duration: 1.0 }, { note: "D4", duration: 1.0 }, { note: "B4", duration: 1.0 },
  { note: "C5", duration: 1.0 }, { note: "B4", duration: 0.5 }, { note: "A4", duration: 0.5 }, { note: "G4", duration: 1.0 },
  { note: "F#4", duration: 1.5 }, { note: "G4", duration: 0.5 }, { note: "A4", duration: 1.0 },
  { note: "D4", duration: 2.0 }, { note: "E4", duration: 0.5 }, { note: "F#4", duration: 0.5 },
  { note: "G4", duration: 1.5 }, { note: "F#4", duration: 0.5 }, { note: "G4", duration: 1.0 },
  { note: "E4", duration: 1.0 }, { note: "C4", duration: 1.0 }, { note: "D4", duration: 1.0 },
  { note: "G3", duration: 3.0 },
];

// 4. Bach - Minuet in G major (BWV Anh. 114)
export const SCORE_BACH_MINUET_IN_G: NoteEvent[] = [
  { note: "D5", duration: 0.5 }, { note: "G4", duration: 0.25 }, { note: "A4", duration: 0.25 }, { note: "B4", duration: 0.25 }, { note: "C5", duration: 0.25 },
  { note: "D5", duration: 0.5 }, { note: "G4", duration: 0.5 }, { note: "G4", duration: 0.5 },
  { note: "E5", duration: 0.5 }, { note: "C5", duration: 0.25 }, { note: "D5", duration: 0.25 }, { note: "E5", duration: 0.25 }, { note: "F#5", duration: 0.25 },
  { note: "G5", duration: 0.5 }, { note: "G4", duration: 0.5 }, { note: "G4", duration: 0.5 },
  { note: "C5", duration: 0.5 }, { note: "D5", duration: 0.25 }, { note: "C5", duration: 0.25 }, { note: "B4", duration: 0.25 }, { note: "A4", duration: 0.25 },
  { note: "B4", duration: 0.5 }, { note: "C5", duration: 0.25 }, { note: "B4", duration: 0.25 }, { note: "A4", duration: 0.25 }, { note: "G4", duration: 0.25 },
  { note: "F#4", duration: 0.5 }, { note: "G4", duration: 0.25 }, { note: "A4", duration: 0.25 }, { note: "B4", duration: 0.25 }, { note: "G4", duration: 0.25 },
  { note: "A4", duration: 1.0 }, { note: "D4", duration: 0.5 },
];

// 5. Vivaldi - The Four Seasons: Spring (La Primavera - Allegro)
export const SCORE_VIVALDI_SPRING: NoteEvent[] = [
  { note: "E5", duration: 0.5 }, { note: "G#5", duration: 0.25 }, { note: "G#5", duration: 0.25 }, { note: "G#5", duration: 0.5 },
  { note: "F#5", duration: 0.25 }, { note: "E5", duration: 0.25 }, { note: "B4", duration: 0.5 }, { note: "B4", duration: 0.5 },
  { note: "E5", duration: 0.5 }, { note: "G#5", duration: 0.25 }, { note: "G#5", duration: 0.25 }, { note: "G#5", duration: 0.5 },
  { note: "F#5", duration: 0.25 }, { note: "E5", duration: 0.25 }, { note: "B4", duration: 1.0 },
  { note: "E5", duration: 0.25 }, { note: "F#5", duration: 0.25 }, { note: "G#5", duration: 0.25 }, { note: "A5", duration: 0.25 },
  { note: "B5", duration: 0.5 }, { note: "G#5", duration: 0.5 },
  { note: "F#5", duration: 0.25 }, { note: "E5", duration: 0.25 }, { note: "D#5", duration: 0.25 }, { note: "E5", duration: 0.25 },
  { note: "F#5", duration: 1.0 },
  { note: "B4", duration: 0.5 }, { note: "D#5", duration: 0.25 }, { note: "F#5", duration: 0.25 }, { note: "E5", duration: 1.0 },
];

// 6. Vivaldi - The Four Seasons: Winter (L'Inverno - Largo)
export const SCORE_VIVALDI_WINTER: NoteEvent[] = [
  { note: "Eb4", duration: 0.5 }, { note: "F4", duration: 0.5 }, { note: "G4", duration: 0.5 }, { note: "Ab4", duration: 0.5 },
  { note: "Bb4", duration: 1.0 }, { note: "G4", duration: 1.0 },
  { note: "C5", duration: 0.75 }, { note: "Bb4", duration: 0.25 }, { note: "Ab4", duration: 0.5 }, { note: "G4", duration: 0.5 },
  { note: "F4", duration: 1.5 }, { note: "Eb4", duration: 0.5 },
  { note: "D4", duration: 0.5 }, { note: "Eb4", duration: 0.5 }, { note: "F4", duration: 0.5 }, { note: "D4", duration: 0.5 },
  { note: "Eb4", duration: 2.0 },
];

// 7. Vivaldi - The Four Seasons: Summer (L'Estate - Presto Storm)
export const SCORE_VIVALDI_SUMMER: NoteEvent[] = [
  { note: "G4", duration: 0.15 }, { note: "G4", duration: 0.15 }, { note: "G4", duration: 0.15 }, { note: "G4", duration: 0.15 },
  { note: "Bb4", duration: 0.3 }, { note: "G4", duration: 0.3 },
  { note: "D5", duration: 0.15 }, { note: "D5", duration: 0.15 }, { note: "D5", duration: 0.15 }, { note: "D5", duration: 0.15 },
  { note: "F5", duration: 0.3 }, { note: "D5", duration: 0.3 },
  { note: "G5", duration: 0.15 }, { note: "F5", duration: 0.15 }, { note: "Eb5", duration: 0.15 }, { note: "D5", duration: 0.15 },
  { note: "C5", duration: 0.15 }, { note: "Bb4", duration: 0.15 }, { note: "A4", duration: 0.15 }, { note: "G4", duration: 0.15 },
  { note: "D5", duration: 0.6 }, { note: "G4", duration: 0.6 },
];

// 8. Chopin - Nocturne in E-flat major, Op. 9 No. 2
export const SCORE_CHOPIN_NOCTURNE: NoteEvent[] = [
  { note: "Bb4", duration: 0.5 }, { note: "G5", duration: 0.75 }, { note: "F5", duration: 0.25 }, { note: "Eb5", duration: 0.5 }, { note: "D5", duration: 0.5 },
  { note: "Eb5", duration: 0.5 }, { note: "C5", duration: 1.0 }, { note: "Ab4", duration: 0.5 },
  { note: "Bb4", duration: 0.5 }, { note: "G5", duration: 0.75 }, { note: "F5", duration: 0.25 }, { note: "Eb5", duration: 0.5 }, { note: "D5", duration: 0.5 },
  { note: "Eb5", duration: 1.5 }, { note: "Bb4", duration: 0.5 },
  { note: "C5", duration: 0.75 }, { note: "D5", duration: 0.25 }, { note: "Eb5", duration: 0.5 }, { note: "F5", duration: 0.5 },
  { note: "G5", duration: 1.5 }, { note: "Eb5", duration: 0.5 },
  { note: "F5", duration: 1.0 }, { note: "Bb4", duration: 1.0 },
];

// 9. Erik Satie - Gymnopédie No. 1
export const SCORE_SATIE_GYMNOPEDIE: NoteEvent[] = [
  { note: "G3", duration: 1.5 }, { note: "B4", duration: 1.5 }, { note: "D5", duration: 1.5 },
  { note: "F#5", duration: 3.0 }, { note: "E5", duration: 1.5 },
  { note: "D5", duration: 1.5 }, { note: "B4", duration: 1.5 }, { note: "C5", duration: 1.5 },
  { note: "D5", duration: 3.0 }, { note: "B4", duration: 1.5 },
  { note: "A4", duration: 3.0 }, { note: "G4", duration: 1.5 },
  { note: "B4", duration: 3.0 },
];

export const SYNTH_CLASSICAL_SCORES: Record<string, { title: string; composer: string; score: NoteEvent[]; instrument: "piano" | "strings" | "cello" }> = {
  "synth-bach-air": {
    title: "Bach - Air on the G String (BWV 1068)",
    composer: "Johann Sebastian Bach",
    score: SCORE_BACH_AIR_ON_G_STRING,
    instrument: "strings",
  },
  "synth-bach-cello": {
    title: "Bach - Cello Suite No. 1 in G major (Prelude)",
    composer: "Johann Sebastian Bach",
    score: SCORE_BACH_CELLO_SUITE_1,
    instrument: "cello",
  },
  "synth-bach-goldberg": {
    title: "Bach - Goldberg Variations (Aria BWV 988)",
    composer: "Johann Sebastian Bach",
    score: SCORE_BACH_GOLDBERG_ARIA,
    instrument: "piano",
  },
  "synth-bach-minuet": {
    title: "Bach - Minuet in G major (BWV Anh. 114)",
    composer: "Johann Sebastian Bach",
    score: SCORE_BACH_MINUET_IN_G,
    instrument: "piano",
  },
  "synth-vivaldi-spring": {
    title: "Vivaldi - Four Seasons: Spring (La Primavera)",
    composer: "Antonio Vivaldi",
    score: SCORE_VIVALDI_SPRING,
    instrument: "strings",
  },
  "synth-vivaldi-winter": {
    title: "Vivaldi - Four Seasons: Winter (L'Inverno)",
    composer: "Antonio Vivaldi",
    score: SCORE_VIVALDI_WINTER,
    instrument: "strings",
  },
  "synth-vivaldi-summer": {
    title: "Vivaldi - Four Seasons: Summer (L'Estate Storm)",
    composer: "Antonio Vivaldi",
    score: SCORE_VIVALDI_SUMMER,
    instrument: "strings",
  },
  "synth-chopin-nocturne": {
    title: "Chopin - Nocturne in E-flat major, Op. 9 No. 2",
    composer: "Frederic Chopin",
    score: SCORE_CHOPIN_NOCTURNE,
    instrument: "piano",
  },
  "synth-satie-gymnopedie": {
    title: "Erik Satie - Gymnopédie No. 1",
    composer: "Erik Satie",
    score: SCORE_SATIE_GYMNOPEDIE,
    instrument: "piano",
  },
};

// Procedural Web Audio Engine Class
export class ClassicalAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTimeout: NodeJS.Timeout | null = null;
  private noteIndex = 0;
  private volume = 0.35;
  private activeScore: NoteEvent[] = SCORE_BACH_AIR_ON_G_STRING;
  private activeInstrument: "piano" | "strings" | "cello" = "strings";
  private onTrackEnded?: () => void;

  public init() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public playTrack(
    trackId: string,
    onEnded?: () => void
  ) {
    this.stop();
    this.init();
    this.onTrackEnded = onEnded;

    const trackConfig = SYNTH_CLASSICAL_SCORES[trackId] || SYNTH_CLASSICAL_SCORES["synth-bach-air"];
    this.activeScore = trackConfig.score;
    this.activeInstrument = trackConfig.instrument;
    this.noteIndex = 0;
    this.isPlaying = true;

    this.scheduleNextNote();
  }

  private playSingleNote(freq: number, duration: number) {
    if (!this.ctx || freq <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    if (this.activeInstrument === "strings") {
      // Warm Chamber String Sawtooth + Lowpass Filter
      osc.type = "sawtooth";
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1.5, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.45, now + 0.15); // soft string attack
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.3); // natural acoustic decay
    } else if (this.activeInstrument === "cello") {
      // Deep Warm Cello Triangle + Harmonic Resonance
      osc.type = "triangle";
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.55, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.4);
    } else {
      // Acoustic Grand Piano Sine + Triangle Harmonic Overtones
      osc.type = "triangle";
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2800, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.6, now + 0.02); // quick hammer strike
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.6); // long piano sustain
    }

    osc.frequency.setValueAtTime(freq, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.7);
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;

    if (this.noteIndex >= this.activeScore.length) {
      this.noteIndex = 0; // Loop or trigger next track
      if (this.onTrackEnded) {
        this.onTrackEnded();
        return;
      }
    }

    const current = this.activeScore[this.noteIndex];
    const freq = NOTE_FREQS[current.note] || 0;

    if (freq > 0) {
      this.playSingleNote(freq, current.duration);
    }

    this.noteIndex++;
    this.currentTimeout = setTimeout(() => {
      this.scheduleNextNote();
    }, current.duration * 1000);
  }

  public stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  public resume() {
    if (!this.isPlaying && this.activeScore.length > 0) {
      this.isPlaying = true;
      this.init();
      this.scheduleNextNote();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}
