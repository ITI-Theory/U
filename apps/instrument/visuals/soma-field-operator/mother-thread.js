// mother-thread.js: MOTHER follows a wandering chat (ISS-083, from ISS-047 note 11). Every
// question is a turn in a thread kept in this browser: its parent, a topic tag, the view it was
// asked from and the start of its answer. A turn whose topic differs from its parent's is a
// departure, logged and marked with a rising tone; /path draws the thread as a branching tree,
// and RETURN on a turn restores its view and continues from there (a falling tone). The thread
// is the author's own, in localStorage; nothing leaves the machine but the follow-up line in
// the next question.

const TOPICS = {
  cosmos: ['cosmo', 'universe', 'galax', 'dark matter', 'dark energy', 'lambda', 'gravity', 'star', 'planet', 'orbit'],
  quantum: ['quantum', 'planck', 'string', 'foam', 'tunnel', 'atom', 'photon'],
  cells: ['cell', 'neuron', 'synap', 'membrane', 'molecul', 'ion'],
  brain: ['brain', 'cortex', 'cemi', 'thought', 'conscious', 'cathedral', 'ventricle'],
  limbic: ['limbic', 'amygdala', 'fear', 'alarm', 'threat', 'hippocamp'],
  trauma: ['trauma', 'ptsd', 'c-ptsd', 'freeze', 'flashback', 'therapy', 'therap'],
  body: ['body', 'heart', 'breath', 'vagal', 'pain', 'ureter', 'stone', 'somatic'],
  music: ['music', 'tempo', 'score', 'tensor', 'chord', 'rhythm', 'song'],
  people: ['dyad', 'couple', 'crowd', 'group', 'society', 'city', 'flock', 'swarm'],
  earth: ['earthquake', 'rock', 'fault', 'geolog', 'ocean', 'climate'],
  proof: ['lean', 'proof', 'theorem', 'axiom', 'sorry', 'sherlock', 'kernel'],
};

/** The topic of a question: the topic whose words it uses most; else the level it was asked from. */
export function topicOf(question, context = {}) {
  const q = String(question).toLowerCase();
  let best = '', most = 0;
  for (const [topic, words] of Object.entries(TOPICS)) {
    const n = words.reduce((k, w) => k + (q.split(w).length - 1), 0);
    if (n > most) { most = n; best = topic; }
  }
  return best || (context.levelLabel ? `view: ${context.levelLabel}` : 'general');
}

const memoryStorage = () => {
  const m = new Map();
  return { getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k) };
};

export function createThread(key = 'mother-thread', storage = (typeof localStorage !== 'undefined' ? localStorage : memoryStorage())) {
  let turns = [];
  let current = null;
  try {
    const saved = JSON.parse(storage.getItem(key) || '{}');
    turns = Array.isArray(saved.turns) ? saved.turns.slice(-200) : [];
    current = turns.some(t => t.id === saved.current) ? saved.current : (turns.at(-1)?.id ?? null);
  } catch { /* a broken thread starts again */ }
  let seq = turns.reduce((m, t) => Math.max(m, t.id), 0);
  const save = () => { try { storage.setItem(key, JSON.stringify({ turns, current })); } catch { /* storage full or off */ } };
  const byId = id => turns.find(t => t.id === id) ?? null;
  return {
    get turns() { return turns; },
    get current() { return byId(current); },
    parentOf(turn) { return turn ? byId(turn.parent) : null; },
    /** A new question: returns the turn and, if its topic differs from its parent's, the departure. */
    add(question, context = {}, view = '') {
      const parent = byId(current);
      const turn = { id: ++seq, parent: parent?.id ?? null, q: String(question).slice(0, 300), tag: topicOf(question, context), view, at: Date.now(), a: '' };
      turns.push(turn);
      current = turn.id;
      save();
      return { turn, departure: parent && parent.tag !== turn.tag ? { from: parent.tag, to: turn.tag } : null };
    },
    answer(id, text) {
      const t = byId(id);
      if (t) { t.a = String(text ?? '').replace(/\s+/g, ' ').slice(0, 280); save(); }
    },
    /** Go back to a turn: the next question continues from it, as a new branch. */
    returnTo(id) {
      const t = byId(id);
      if (t) { current = t.id; save(); }
      return t;
    },
    clear() { turns = []; current = null; seq = 0; save(); },
    /** The thread as a tree, depth-first in time order: [{ turn, depth, branch }]. */
    tree() {
      const kids = new Map();
      for (const t of turns) {
        const p = turns.some(x => x.id === t.parent) ? t.parent : null;
        if (!kids.has(p)) kids.set(p, []);
        kids.get(p).push(t);
      }
      const out = [];
      const walk = (p, depth) => {
        const list = kids.get(p) ?? [];
        list.forEach((t, k) => {
          out.push({ turn: t, depth, branch: k > 0 || (p !== null && byId(p)?.tag !== t.tag) });
          walk(t.id, depth + 1);
        });
      };
      walk(null, 0);
      return out;
    },
  };
}

/** A short tone: 'departure' rises, 'return' falls. Quiet, and silent where audio is unavailable. */
export function chirp(kind) {
  try {
    const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!AC) return;
    const ac = chirp.ac || (chirp.ac = new AC());
    const notes = kind === 'return' ? [784, 523] : [523, 784];
    notes.forEach((f, k) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      const t0 = ac.currentTime + k * 0.09;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.06, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
      o.connect(g).connect(ac.destination);
      o.start(t0);
      o.stop(t0 + 0.18);
    });
  } catch { /* no sound */ }
}
