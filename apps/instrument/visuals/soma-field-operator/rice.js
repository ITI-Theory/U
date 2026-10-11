// RICE (ricing, ISS-075): the author's switch for his own options. Off by default, so the
// public app stays calm; on, it reveals the extras (crew alerting at the score stop first;
// neon themes, code rain and the Root Monster's tours as they arrive). Kept per browser and
// shared by its windows (localStorage), so the Engine Room can switch every window at once.
const KEY = 'soma-rice';
let cached = null;

export function rice() {
  if (cached === null) {
    try { cached = localStorage.getItem(KEY) === '1'; } catch { cached = false; }
  }
  return cached;
}

export function setRice(on) {
  cached = Boolean(on);
  try { localStorage.setItem(KEY, cached ? '1' : '0'); } catch { /* private mode */ }
  globalThis.dispatchEvent?.(new CustomEvent('soma-rice', { detail: { on: cached } }));
}

// another window changed it
globalThis.addEventListener?.('storage', event => { if (event.key === KEY) cached = event.newValue === '1'; });
