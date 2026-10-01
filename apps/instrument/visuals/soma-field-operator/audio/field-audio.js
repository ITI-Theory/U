// Optional browser audio for the Soma Machine. Off until the user switches it on
// (browsers only allow audio after a gesture). No hardware, MIDI, or OSC.
//
// Mapping (see SOMA-MACHINE-MVP.md, "Audio Contract"):
// - Poke = J(t): a struck resonator. A short noise click is the delta impulse; the
//   decaying partials are the medium's impulse response, timed to match the visual
//   exp(-3.4 t) decay over the poke display span. Pitch follows the level's length scale.
// - Field drone: lens off = a plain sine (physics baseline); lens on = a filtered
//   saw whose brightness follows the limbic and cognitive sliders.
// - BRECVEMA (human level, lens on, inspector open), one behaviour per field action:
//   B  brainstem reflex     J(t)        sharp startle transient (and louder pokes)
//   R  rhythmic entrainment gamma       beat-locked gating of the drone plus a soft tick
//   E1 evaluative cond.     b           consonant bias: a perfect fifth joins the drone
//   C  emotional contagion  kappa       a second, voice-like (formant) field couples in
//   V  visual imagery       J_internal  sparse endogenous sparkles
//   E2 episodic memory      K(tau)      longer memory tail (echo and reverb)
//   M  musical expectancy   Delta V     cadence that sometimes resolves deceptively
//   A  aesthetic judgement  b           brighter, wider overtones

const midiToHz = midi => 440 * 2 ** ((midi - 69) / 12);

export function levelPitchMidi(level) {
  const match = /10\^(-?\d+)/.exec(level?.length_scale ?? '');
  const exponent = match ? Number(match[1]) : 0;
  // Planck length (1e-35 m) sits high, the observable universe (1e26 m) sits low.
  return 93 - (exponent + 35) * (72 / 61);
}

function impulseResponse(ctx, seconds, decay) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay;
  }
  return buffer;
}

export class FieldAudio {
  constructor({ pokeSeconds = 4, pokeRate = 3.4 } = {}) {
    this.ctx = null;
    this.enabled = false;
    this.tau = pokeSeconds / pokeRate;
    this.mechanisms = new Set();
    this.nextBeat = 0;
    this.beatIndex = 0;
    this.nextSparkle = 0;
  }

  async enable() {
    if (!this.ctx) this.build();
    await this.ctx.resume();
    this.enabled = true;
    this.master.gain.setTargetAtTime(0.8, this.ctx.currentTime, 0.2);
  }

  disable() {
    if (!this.ctx) return;
    this.enabled = false;
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    setTimeout(() => { if (!this.enabled) this.ctx.suspend(); }, 400);
  }

  build() {
    const ctx = new AudioContext();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -12;
    this.master.connect(limiter).connect(ctx.destination);

    this.dry = ctx.createGain();
    this.dry.connect(this.master);
    this.reverb = ctx.createConvolver();
    this.reverb.buffer = impulseResponse(ctx, 3, 3);
    this.reverbWet = ctx.createGain();
    this.reverbWet.gain.value = 0.18;
    this.reverb.connect(this.reverbWet).connect(this.master);
    this.echo = ctx.createDelay(2);
    this.echo.delayTime.value = 0.375;
    this.echoFeedback = ctx.createGain();
    this.echoFeedback.gain.value = 0;
    this.echoOut = ctx.createGain();
    this.echoOut.gain.value = 0;
    this.echo.connect(this.echoFeedback).connect(this.echo);
    this.echo.connect(this.echoOut).connect(this.master);
    this.bus = ctx.createGain();
    this.bus.connect(this.dry);
    this.bus.connect(this.reverb);
    this.bus.connect(this.echo);

    // Field drone: sine (baseline) and saw (field layers) through one low-pass filter.
    this.droneFilter = ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.value = 600;
    this.droneGate = ctx.createGain();
    this.droneGate.gain.value = 1;
    this.droneGain = ctx.createGain();
    this.droneGain.gain.value = 0.05;
    this.droneFilter.connect(this.droneGate).connect(this.droneGain).connect(this.bus);
    this.sine = ctx.createOscillator();
    this.sine.type = 'sine';
    this.saw = ctx.createOscillator();
    this.saw.type = 'sawtooth';
    this.sawGain = ctx.createGain();
    this.sawGain.gain.value = 0;
    this.fifth = ctx.createOscillator();
    this.fifth.type = 'triangle';
    this.fifthGain = ctx.createGain();
    this.fifthGain.gain.value = 0;
    this.wide = ctx.createOscillator();
    this.wide.type = 'sawtooth';
    this.wideGain = ctx.createGain();
    this.wideGain.gain.value = 0;
    const widePan = ctx.createStereoPanner();
    widePan.pan.value = 0.7;
    this.sine.connect(this.droneFilter);
    this.saw.connect(this.sawGain).connect(this.droneFilter);
    this.fifth.connect(this.fifthGain).connect(this.droneFilter);
    this.wide.connect(this.wideGain).connect(widePan).connect(this.droneFilter);

    // Contagion: a voice-like second field (saw through two vowel formants).
    this.voice = ctx.createOscillator();
    this.voice.type = 'sawtooth';
    this.voiceGain = ctx.createGain();
    this.voiceGain.gain.value = 0;
    const vibrato = ctx.createOscillator();
    vibrato.frequency.value = 5.2;
    const vibratoDepth = ctx.createGain();
    vibratoDepth.gain.value = 3;
    vibrato.connect(vibratoDepth).connect(this.voice.frequency);
    for (const [freq, q] of [[700, 8], [1220, 10]]) {
      const formant = ctx.createBiquadFilter();
      formant.type = 'bandpass';
      formant.frequency.value = freq;
      formant.Q.value = q;
      this.voice.connect(formant).connect(this.voiceGain);
    }
    const voicePan = ctx.createStereoPanner();
    voicePan.pan.value = -0.5;
    this.voiceGain.connect(voicePan).connect(this.bus);

    for (const node of [this.sine, this.saw, this.fifth, this.wide, this.voice, vibrato]) node.start();
    this.setPitch(57);
  }

  setPitch(midi) {
    if (!this.ctx || this.midi === midi) return;
    this.midi = midi;
    const t = this.ctx.currentTime;
    const f0 = midiToHz(midi - 12);
    this.sine.frequency.setTargetAtTime(f0, t, 0.3);
    this.saw.frequency.setTargetAtTime(f0, t, 0.3);
    this.fifth.frequency.setTargetAtTime(f0 * 1.5, t, 0.3);
    this.wide.frequency.setTargetAtTime(f0 * 2.006, t, 0.3);
    this.voice.frequency.setTargetAtTime(f0 * 2, t, 0.3);
  }

  tone({ freq, start, gain = 0.1, decay = 0.4, type = 'sine' }) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, start);
    env.gain.linearRampToValueAtTime(gain, start + 0.005);
    env.gain.setTargetAtTime(0, start + 0.005, decay);
    osc.connect(env).connect(this.bus);
    osc.start(start);
    osc.stop(start + 0.005 + decay * 7);
  }

  click({ start, gain = 0.3, seconds = 0.03, highpass = 200 }) {
    const ctx = this.ctx;
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 4;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = highpass;
    const env = ctx.createGain();
    env.gain.value = gain;
    source.connect(filter).connect(env).connect(this.bus);
    source.start(start);
  }

  poke({ level, gain = 1 }) {
    if (!this.enabled) return;
    const t = this.ctx.currentTime + 0.01;
    const f0 = midiToHz(levelPitchMidi(level));
    const startle = this.mechanisms.has('B');
    this.click({ start: t, gain: (startle ? 0.55 : 0.25) * gain });
    // Partials of a struck free bar: the medium answers the delta with its own modes.
    [[1, 0.22], [2.756, 0.1], [5.404, 0.05], [8.933, 0.025]].forEach(([ratio, amp], index) => {
      this.tone({ freq: f0 * ratio, start: t, gain: amp * gain, decay: this.tau / (1 + index * 0.6) });
    });
  }

  update({ level, lensOn, limbic, cognitive, mechanisms, bpm }) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    this.setPitch(Math.round(levelPitchMidi(level)));

    const added = mechanisms.filter(id => !this.mechanisms.has(id));
    this.mechanisms = new Set(mechanisms);
    if (added.includes('B')) this.click({ start: t + 0.01, gain: 0.5, seconds: 0.06, highpass: 1200 });
    const has = id => this.mechanisms.has(id);

    const brightness = 300 + (lensOn ? limbic * 900 + cognitive * 900 : 0) + (has('A') ? 1800 : 0);
    this.droneFilter.frequency.setTargetAtTime(brightness, t, 0.25);
    this.sawGain.gain.setTargetAtTime(lensOn ? 0.35 : 0, t, 0.3);
    this.fifthGain.gain.setTargetAtTime(has('E1') ? 0.45 : 0, t, 0.4);
    this.wideGain.gain.setTargetAtTime(has('A') ? 0.18 : 0, t, 0.4);
    this.voiceGain.gain.setTargetAtTime(has('C') ? 0.5 : 0, t, 0.5);
    this.reverbWet.gain.setTargetAtTime(has('E2') ? 0.55 : 0.18, t, 0.5);
    this.echoFeedback.gain.setTargetAtTime(has('E2') ? 0.45 : 0, t, 0.5);
    this.echoOut.gain.setTargetAtTime(has('E2') ? 0.6 : 0, t, 0.5);

    const beat = 60 / (bpm || 92);
    if (!has('R') && !has('M')) {
      this.nextBeat = 0;
      this.droneGate.gain.cancelScheduledValues(t);
      this.droneGate.gain.setTargetAtTime(1, t, 0.1);
    } else {
      if (!this.nextBeat || this.nextBeat < t) { this.nextBeat = t + 0.05; this.beatIndex = 0; }
      while (this.nextBeat < t + 0.2) {
        this.scheduleBeat(this.nextBeat, beat);
        this.nextBeat += beat;
      }
    }

    if (has('V')) {
      if (!this.nextSparkle || this.nextSparkle < t) this.nextSparkle = t + 0.1;
      while (this.nextSparkle < t + 0.2) {
        const midi = this.midi + 24 + [0, 3, 7, 10, 12, 14][Math.floor(Math.random() * 6)];
        this.tone({ freq: midiToHz(midi), start: this.nextSparkle, gain: 0.035, decay: 0.12 });
        this.nextSparkle += -Math.log(1 - Math.random()) / 1.6;
      }
    }
  }

  scheduleBeat(start, beat) {
    const index = this.beatIndex;
    this.beatIndex += 1;
    if (this.mechanisms.has('R')) {
      this.droneGate.gain.setValueAtTime(1, start);
      this.droneGate.gain.setTargetAtTime(0.35, start + 0.04, beat * 0.25);
      this.click({ start, gain: index % 4 === 0 ? 0.12 : 0.06, seconds: 0.015, highpass: 3000 });
    }
    if (this.mechanisms.has('M') && index % 4 === 0) {
      // I - IV - V, then either the expected I or a deceptive vi: a transient barrier.
      const bar = Math.floor(index / 4) % 4;
      const deceptive = bar === 3 && Math.random() < 0.5;
      const roots = [0, 5, 7, deceptive ? 9 : 0];
      const root = this.midi + roots[bar];
      for (const interval of [0, deceptive ? 3 : 4, 7]) {
        this.tone({ freq: midiToHz(root + interval), start, gain: 0.05, decay: beat * 1.2, type: 'triangle' });
      }
    }
  }
}
