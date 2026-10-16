// who.js: the three users (ISS-108, author 16 Oct). After the splash a small screen asks who
// you are: U (blue, left: anyone, universal; monsters live here; first a companion to the Field
// Atlas) or THE SCIENTIST (red, right: everything at a high level; first a companion to the
// papers). The third, ROOTED (first a companion to the Fractal Thesis), is never offered: you
// ask MOTHER for access and give her the clearance code (it is in the page's source, for those
// who look). Nothing in ROOTED is dangerous; it is tone, effects and extras, not secrets. Kept
// in this browser only.

import { users } from './generated/app-data.js';

// the profiles, their names and companions: registry/users.yaml (generate.py resolves the links)
const fromRegistry = id => ({ id, ...users[id], companion: users[id]?.companion?.name ?? '', links: users[id]?.companion?.items ?? [] });
export const PROFILES = { u: fromRegistry('u'), scientist: fromRegistry('scientist') };
export const ROOTED_PROFILE = fromRegistry('rooted');
// names that differ by who you are (the ids never change)
const NAMES = { u: users.u?.names ?? {}, scientist: users.scientist?.names ?? {}, rooted: users.rooted?.names ?? {} };
// your companion now: ROOTED's when rooted, else the profile's (THE GUIDE shows it)
export function companion() { return rooted() ? ROOTED_PROFILE : profile(); }
const KEY = 'soma-who', ROOT = 'soma-rooted';
// the clearance code MOTHER asks for (also in index.html, in a comment, for those who look)
export const CLEARANCE = 'helloworld';

const read = k => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch { /* private mode */ } };
const tell = () => globalThis.dispatchEvent?.(new CustomEvent('soma-who', { detail: { who: who(), rooted: rooted() } }));

export function who() { const w = read(KEY); return PROFILES[w] ? w : null; }
export function profile() { return PROFILES[who() ?? 'u']; }
export function setWho(id) { if (!PROFILES[id]) return; write(KEY, id); tell(); }
export function rooted() { return read(ROOT) === '1'; }
// ROOTED switches RICE on (the author's extras: neon, code rain, the Root Monster's tours), and off
// again on leaving if it was ROOTED that switched it (rice.js; private art still needs the local
// bridge, so nothing private reaches anyone else)
export function setRooted(on) {
  write(ROOT, on ? '1' : null);
  import('./rice.js').then(({ rice, setRice }) => {
    if (on && !rice()) { setRice(true); write('soma-rice-by-root', '1'); }
    if (!on && read('soma-rice-by-root') === '1') { setRice(false); write('soma-rice-by-root', null); }
  });
  tell();
}
export const clearanceOk = text => String(text ?? '').replace(/[\s_\-.,!'"]/g, '').toLowerCase() === CLEARANCE;
export function placeName(key) { return (rooted() ? NAMES.rooted : NAMES[who() ?? 'u'])[key] ?? key; }
