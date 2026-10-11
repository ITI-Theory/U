// Display names (ISS-070): the user may give any persona or layer a name of their own. The
// ids, files and published defaults never change; a chosen name is kept in this browser only
// (localStorage), never shipped, so the defaults stay clear of third-party names (ISS-066).
export const DEFAULT_NAMES = {
  hal: 'H-AL',
  mother: 'MOTHER',
  sherlock: 'Sherlock',
  wizard: 'the Wizard',
  monster: 'the Monster',
  'chocolate-biscuit-monster': 'the Chocolate Biscuit Monster',
  'root-monster': 'the Root Monster',
  munch: 'MUNCH',
};
const KEY = 'soma-names';

function stored() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; }
}

export function displayNames() { return { ...DEFAULT_NAMES, ...stored() }; }

export function displayName(id) { return displayNames()[id] ?? id; }

export function isRenamed(id) { return Boolean(stored()[id]); }

// an empty name restores the default; listeners hear 'soma-names' on window
export function setDisplayName(id, name) {
  const names = stored();
  const clean = String(name ?? '').trim().slice(0, 40);
  if (clean && clean !== DEFAULT_NAMES[id]) names[id] = clean;
  else delete names[id];
  try { localStorage.setItem(KEY, JSON.stringify(names)); } catch { /* private mode */ }
  globalThis.dispatchEvent?.(new CustomEvent('soma-names', { detail: { id, name: displayName(id) } }));
}
