// explorer-music.js: calm generative music for the mind-body explorer (ISS-052). Opt-in
// (off by default) and soft, after H-AL's cautions (uat/RC3/hal-flight-2026-10-10.md):
// no beat, no sharp transients, a low-pass filter. A slow pad on a pentatonic chord per
// world (sector), a few bell notes, a long echo for the "reverb blanket". Phi brightens
// the filter and quickens the bells a little; the RESOURCE settles the pad on its root.

const ROOTS = {
  cosmological: 45, 'micro-physical': 57, organismal: 50, 'named-solution': 50,
  collective: 52, geological: 40, network: 55, systemic: 55,
};
const PENTATONIC = [0, 2, 4, 7, 9, 12, 14, 16];
const hz = midi => 440 * 2 ** ((midi - 69) / 12);

export function createExplorerMusic() {
  let ctx = null;
  let master;
  let filter;
  let echo;
  let pad = [];
  let enabled = false;
  let sector = 'organismal';
  let chordAt = 0;
  let bellAt = 0;
  let phi = 0.2;
  let resource = false;

  function build() {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0;
    filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.61;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.45;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    echo = ctx.createGain();
    echo.connect(delay).connect(feedback).connect(delay);
    delay.connect(wet).connect(filter);
    filter.connect(master).connect(ctx.destination);
    pad = [0, 1, 2, 3].map(() => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      const gain = ctx.createGain();
      gain.gain.value = 0.0;
      osc.connect(gain);
      gain.connect(filter);
      gain.connect(echo);
      osc.start();
      return { osc, gain };
    });
  }

  function chord(now) {
    const root = ROOTS[sector] ?? 50;
    const steps = resource ? [0, 7, 12, 16] : [0, ...[1, 2, 3].map(() => PENTATONIC[1 + Math.floor(Math.random() * 6)])];
    pad.forEach((voice, i) => {
      voice.osc.frequency.setTargetAtTime(hz(root + steps[i] - (i === 0 ? 12 : 0)), now, 1.5);
      voice.osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);
      voice.gain.gain.setTargetAtTime(i === 0 ? 0.05 : 0.03, now, 2);
    });
  }

  function bell(now) {
    const root = ROOTS[sector] ?? 50;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = hz(root + 24 + PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)]);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.035, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
    osc.connect(gain);
    gain.connect(filter);
    gain.connect(echo);
    osc.start(now);
    osc.stop(now + 3.6);
  }

  return {
    get enabled() { return enabled; },
    async enable() {
      if (!ctx) build();
      await ctx.resume();
      enabled = true;
      chordAt = 0;
      master.gain.setTargetAtTime(0.7, ctx.currentTime, 1.5);
    },
    disable() {
      if (!ctx) return;
      enabled = false;
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.6);
    },
    // called every frame by the explorer
    update(state) {
      if (!enabled || !ctx) return;
      const now = ctx.currentTime;
      if (state.sector && state.sector !== sector) {
        sector = state.sector;
        chordAt = 0;
      }
      if (state.resource !== resource) {
        resource = state.resource;
        chordAt = 0;
      }
      phi = state.phi ?? phi;
      filter.frequency.setTargetAtTime(600 + 1800 * phi, now, 0.8);
      if (now >= chordAt) {
        chord(now);
        chordAt = now + 9;
      }
      if (now >= bellAt) {
        bell(now);
        bellAt = now + 2.5 + Math.random() * (6 - 3 * phi);
      }
    },
    poke() {
      if (enabled && ctx) bell(ctx.currentTime);
    },
  };
}
