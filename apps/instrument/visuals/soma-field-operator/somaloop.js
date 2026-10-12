// somaloop.js: the body and the mind as one loop (ISS-077, the author's "Everest"). The stone's
// pain goes up; the head, already busy, heats (Phi rises): bigger, more frequent bursts, pain
// bursts among them; the heat comes back down as muscle tension: stronger spasms (the vicious
// circle). Then the limbic system answers: past a threshold it imposes slow deep breathing
// (as in labour, as the way out of freeze), and each slow breath is a calming wave that rolls
// down through the head and the body: Phi falls, the spasms soften. The conditions (P13's model
// operators, pictures, not diagnoses): ADHD, a busier head; ASD, pain amplified in one channel;
// C-PTSD, each pain echoes back, the calming breath comes late and the field is slow to fall.
// A model for a picture, interpretive; numbers are for the eye, not measurements.

export function createSomaLoop() {
  let phi = 0.3;        // the head's field (the limbic heat)
  let breath = 0;       // the calming breath's depth, 0 .. 1
  let breathPhase = 0;  // where in the breath, 0 .. 2 pi
  let echo = 0;         // C-PTSD: pain coming back
  let echoQueue = [];   // [time, strength]
  let time = 0;
  let painIn = 0;       // the pain arriving from the body
  let lastPainPeak = 0;
  const trace = [];
  let traceClock = 0;
  return {
    get phi() { return phi; },
    get breath() { return breath; },
    get breathPhase() { return breathPhase; },
    // a calming wave's front: 0 .. 1 down the body, once per out-breath
    get calmFront() { return breath > 0.05 ? (breathPhase % (2 * Math.PI)) / (2 * Math.PI) : -1; },
    get painIn() { return painIn; },
    get echo() { return echo; },
    get trace() { return trace; },
    // what the head does to the body: tension makes spasms stronger; the breath softens them
    get bodyGain() { return 0.7 + 0.8 * phi - 0.35 * breath; },
    // the head's bursts: how many per second, and how many are pain
    burstRate(base = 3) { return base * (0.6 + 1.6 * phi); },
    painShare() { return Math.min(0.7, 0.6 * painIn); },

    // pain: the body's pain this step (0 .. 1.5); ca, cs, cp: the conditions (0 .. 1);
    // mindful: attending without grasping: the pain still arrives, but heats the head less
    // (mindfulness changes the suffering more than the sensation: Zeidan et al. 2011)
    step(dt, { pain = 0, ca = 0, cs = 0, cp = 0, rest = 0.3, mindful = false } = {}) {
      time += dt;
      // ASD: one channel amplified (here, the pain), more intense and focused
      let p = pain * (1 + 0.8 * cs);
      // C-PTSD: a pain peak returns, fading, as an echo
      if (p > 0.6 && time - lastPainPeak > 2.5) {
        lastPainPeak = time;
        if (cp > 0.05) for (let k = 1; k <= 3; k++) echoQueue.push([time + 2.2 * k, p * Math.pow(0.45 + 0.35 * cp, k)]);
      }
      echo *= Math.exp(-dt / 0.8);
      echoQueue = echoQueue.filter(([at, s]) => { if (at <= time) { echo = Math.max(echo, s); return false; } return true; });
      painIn = Math.min(1.5, p + echo);
      // the limbic answer: past a threshold, slow deep breathing; C-PTSD comes to it late
      const threshold = 0.55 + 0.3 * cp;
      const wantBreath = painIn > threshold || phi > 0.8 ? 1 : 0;
      breath += (wantBreath - breath) * Math.min(1, dt / (wantBreath ? 2 + 4 * cp : 6));
      // about 6 breaths a minute when deep
      breathPhase += dt * (2 * Math.PI / (10 - 4 * (1 - breath)));
      // the field: heated by pain and by a busy head (ADHD), cooled by the breath; C-PTSD slow
      const target = Math.min(1, rest + 0.15 * ca + (mindful ? 0.3 : 0.55) * painIn - 0.45 * breath * (0.6 + 0.4 * Math.sin(breathPhase) ** 2));
      phi += (Math.max(0, target) - phi) * Math.min(1, dt / (1.5 + 4 * cp));
      traceClock += dt;
      while (traceClock >= 0.25) { traceClock -= 0.25; trace.push([painIn, phi, breath]); if (trace.length > 240) trace.shift(); }
    },
  };
}
