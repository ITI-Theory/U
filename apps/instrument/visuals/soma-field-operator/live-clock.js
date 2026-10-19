// live-clock.js: Live's clock in the app (ISS-112, one clock; ISS-117, the cut on the beat). MOTHER's bridge
// holds the line to Ableton Live (AbletonOSC) and streams each beat (GET /live/clock); a declared
// transition's `on beat | bar | phrase` (registry/transitions.yaml) then lands on Live's next one: the
// veil starts early enough that the cut, at its midpoint, falls on it. Only on the author's machine (a
// local page, or a bridge address set in MOTHER); elsewhere nothing connects and every transition runs at
// once, as before.

const PHRASE_BARS = 16;  // a phrase of sixteen bars, as the show's cue sheets count them
let source = null, last = null, triedAt = -Infinity;

function bridge() {
  try { return (localStorage.getItem('mother-bridge-url') || 'http://127.0.0.1:8765').replace(/\/$/, ''); } catch { return 'http://127.0.0.1:8765'; }
}
const local = () => {
  try { return /^(127\.0\.0\.1|localhost)$/.test(location.hostname) || Boolean(localStorage.getItem('mother-bridge-url')); } catch { return false; }
};

// connect once the bridge answers; try again at most once a minute
export async function connectLiveClock() {
  if (source || !local() || typeof EventSource === 'undefined' || performance.now() - triedAt < 60000) return;
  triedAt = performance.now();
  try {
    const res = await fetch(`${bridge()}/live/state`);
    if (!res.ok) return;
  } catch { return; }
  source = new EventSource(`${bridge()}/live/clock`);
  source.onmessage = event => {
    try {
      const s = JSON.parse(event.data);
      if (s.beat === null || s.beat === undefined) return;
      last = { ...s, seen: performance.now() };
      dispatchEvent(new CustomEvent('soma-live-beat', { detail: last }));
    } catch { /* a malformed message: wait for the next */ }
  };
  source.onerror = () => { if (source?.readyState === EventSource.CLOSED) source = null; };
}

// Live's clock when it is playing and has just ticked, else null
export function liveClock() {
  if (!last || !last.playing || !(last.tempo > 0)) return null;
  return performance.now() - last.seen < 4 * 60000 / last.tempo ? last : null;
}

// the length of a beat, a bar or a phrase at Live's tempo, in milliseconds (null: no live clock)
export function periodMs(sync) {
  const c = liveClock();
  if (!c) return null;
  const beats = sync === 'beat' ? 1 : sync === 'bar' ? (c.numerator || 4) : (c.numerator || 4) * PHRASE_BARS;
  return beats * 60000 / c.tempo;
}

// milliseconds to Live's next beat, bar or phrase (null: no live clock, or `now`)
export function msToNext(sync) {
  const c = liveClock();
  if (!c || !sync || sync === 'now') return null;
  const beatMs = 60000 / c.tempo;
  const per = sync === 'beat' ? 1 : sync === 'bar' ? (c.numerator || 4) : (c.numerator || 4) * PHRASE_BARS;
  const position = c.beat + (performance.now() - c.seen) / beatMs;
  const next = (Math.floor(position / per + 1e-6) + 1) * per;
  return (next - position) * beatMs;
}
