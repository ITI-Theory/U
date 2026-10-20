// console.js: the console (ISS-120), opened from the Music Room. Softube Console 1's idea over the author's own
// plugins, on a big screen like SSL 360's mixer but not by SSL, and not like Live (the author, 17 Oct: "a big screen
// mixer, like the SSL one"). Fixed sections in a fixed order (registry/audio/console.yaml): SOURCE, FEEL, WRONG,
// EQ AND FILTER, DYNAMICS, DRIVE, SPACE, OUT. The studio standard (registry/studio/standard.yaml) says what sits on
// a track, a group, a return and the master, and which desk (SSL, iZotope, UAD, Live) fills the strip, glue,
// colour, hall and master; the plugins' controls come from their NKS presets (the private index, Me/music/console,
// through MOTHER's bridge). Two views: the CHANNEL (one track, its chain spread over the sections) and the DESK
// (every group, the returns and the master as vertical strips). Below them two virtual MIDI Fighter Twisters (the
// author, May 2026): bank 1 the app's knobs, bank 2 the channel's fixed jobs; a knob lights when it is turned or
// pushed. The console shows and listens; it sends nothing: Live does the sound (ISS-120, the rule).

import { consoleRules as RULES, studio as STUDIO } from './generated/app-data.js';
import { MIDI_IN_MAP } from './midi-in.js';

const esc = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
function bridge() {
  try { return (localStorage.getItem('mother-bridge-url') || 'http://127.0.0.1:8765').replace(/\/$/, ''); } catch { return 'http://127.0.0.1:8765'; }
}
async function fetchJson(path) {
  try { return await (await fetch(`${bridge()}${path}`)).json(); }
  catch { return { error: 'MOTHER\'s bridge is not running (make mother-bridge): the plugins\' controls are the author\'s, on his machine' }; }
}

const SECTIONS = ['source', ...(RULES?.order ?? [])];
const NAME = id => RULES?.sections?.[id]?.name ?? id.toUpperCase();
const PATTERNS = Object.fromEntries((RULES?.order ?? []).map(id => [id, (RULES.sections[id].patterns ?? []).map(p => new RegExp(p, 'i'))]));
const SHOWN = 8;

// a plugin's name as the index knows it: case, spaces, a maker's prefix and a version tag do not matter (sherlock/studio.py's rule)
const norm = s => String(s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '').replace(/v\d+$/, '');
export function lookup(plugins, name) {
  const want = norm(name);
  if (!want) return null;
  const hit = Object.keys(plugins ?? {}).find(k => { const n = norm(k); return n === want || n.endsWith(want) || want.endsWith(n); });
  return hit ? { name: hit, ...plugins[hit] } : null;
}

const onOff = v => v === true || v === 'on' || v === 'standard';
const list = v => (Array.isArray(v) ? v : v ? [v] : []).map(String).filter(n => !/\bopen\b/.test(n));

// what fills a slot with this desk on: a desk slot the house's device(s), else the device (a group's own source first)
function fill(slot, desk, group) {
  if (slot.desk) return list(STUDIO?.desks?.houses?.[desk]?.[slot.desk]);
  return list(slot.by_group?.[group] ?? slot.device);
}

// a container the standard declares (Snap Heap, Modular, Serum 2, Phase Plant): its macros are the feelings
const isContainer = device => Object.keys(RULES?.homes ?? {}).some(h => norm(h) && (norm(device).endsWith(norm(h)) || norm(h).endsWith(norm(device))));

// the sections a device sits in. A container (a declared home: Snap Heap, Modular, Serum 2, Phase Plant) sits where
// its slot's role says, and in FEEL for its macros; any other plugin in its own section (its name, else its index's
// home, else its slot's) and every section its NKS controls land in.
export function placement(device, role, plug) {
  const roleHome = RULES?.roles?.[role] ?? 'out';
  const declared = isContainer(device);
  if (declared || plug?.kind === 'INST') return [...new Set([roleHome, ...(plug?.sections?.feel?.length || declared ? ['feel'] : [])])];
  const byName = (RULES?.order ?? []).find(id => PATTERNS[id].some(p => p.test(device)));
  const own = byName ?? plug?.home ?? roleHome;
  const more = Object.keys(plug?.sections ?? {}).filter(s => s !== 'other' && s !== 'source' && s !== 'feel');
  return [own, ...SECTIONS.filter(s => s !== own && more.includes(s))];
}

// one track's chain: its slots in order, each device with its on/off, then the sends
export function channel(track, group, desk) {
  const out = [];
  for (const s of STUDIO?.track?.slots ?? []) {
    for (const d of fill(s, desk, group)) out.push({ where: `slot ${s.slot}`, role: s.role, device: d, on: onOff(s.default) });
  }
  for (const send of STUDIO?.track?.sends ?? []) out.push({ where: 'send', role: 'hall', device: `send to ${send.to}`, on: onOff(send.default), send: true });
  return out;
}

function groupChain(desk) {
  return (STUDIO?.group?.slots ?? []).flatMap(s => fill(s, desk).map(d => ({ where: `slot ${s.slot}`, role: s.role, device: d, on: onOff(s.default) })));
}
function returnChain(r, desk) {
  return (r.desk ? list(STUDIO?.desks?.houses?.[desk]?.[r.desk]) : list(r.device)).map(d => ({ where: r.role, role: 'hall', device: d, on: true }));
}
function masterChain(desk) {
  return (STUDIO?.master?.slots ?? []).flatMap(s => fill(s, desk).map(d => ({ where: `slot ${s.slot}`, role: 'master', device: d, on: true })));
}

// the feelings as the app sends them (the standard's CC lanes 20-26 and 29: "S, safety: Macro 1")
function feelings() {
  return Object.entries(STUDIO?.cc ?? {}).filter(([k, v]) => /^\d+$/.test(k) && /Macro \d/.test(String(v)))
    .map(([cc, v]) => { const m = String(v).match(/^([^,]+),\s*([^:]+):\s*(Macro \d)/); return { cc: Number(cc), mode: m?.[1] ?? '', name: m?.[2] ?? String(v), macro: m?.[3] ?? '' }; });
}

// the channel's sixteen jobs (bank 2) with what each turns on this track with this desk
export function channelKnobs(chain, plugins) {
  const strip = chain.find(c => c.role === 'strip');
  const stripPlug = strip && lookup(plugins, strip.device);
  return (RULES?.twister?.knobs ?? []).map((k, i) => {
    let target = '';
    if (k.strip) {
      const hit = stripPlug && Object.values(stripPlug.sections ?? {}).flat().find(c => c.section === k.strip[0] && c.name === k.strip[1]);
      target = hit ? `${stripPlug.name}: ${hit.section} ${hit.name}` : strip ? `${strip.device}: its ${k.job} (to map)` : '';
    } else if (k.slot) {
      const d = chain.find(c => c.where === `slot ${k.slot}`);
      target = d ? `${d.device}: its mix` : '';
    } else if (k.send) target = `send to ${k.send}`;
    return { cc: (RULES.twister.cc_first ?? 16) + i, section: k.section, job: k.job, target };
  });
}

function appKnobs() {
  const say = { S: 'Safety', F: 'Fear', C: 'Curiosity', A: 'Awe', G: 'Grief', L: 'Language', PV: 'the Pre-verbal', phi: 'Φ, the field', kd: 'depth κd', kv: 'velocity κv' };
  return Array.from({ length: 16 }, (_, cc) => ({ cc, section: cc < 8 ? 'feel' : cc in MIDI_IN_MAP ? 'out' : '', job: say[MIDI_IN_MAP[cc]] ?? '', target: cc < 8 ? 'the app: the feelings (sent to Live as CC 20-26, 29)' : cc in MIDI_IN_MAP ? 'the app' : 'free' }));
}

function knobHtml(k, bank) {
  return `<div class="twister__knob" data-bank="${bank}" data-cc="${k.cc}" data-section="${esc(k.section)}" title="${esc(`CC ${k.cc}: ${k.job}${k.target ? ` · ${k.target}` : ''}`)}">
    <span class="twister__ring" style="--v:0"></span><span class="twister__dot"></span>
    <b>${esc(k.job || '·')}</b><small>CC ${k.cc}</small></div>`;
}

export function createConsole() {
  const root = document.createElement('section');
  root.className = 'console';
  root.hidden = true;
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-label', 'The console');
  const groups = STUDIO?.group?.members ?? {};
  const houses = Object.keys(STUDIO?.desks?.houses ?? {});
  root.innerHTML = `
    <header class="console__head">
      <h2>THE CONSOLE</h2>
      <nav class="console__views"><button type="button" data-view="channel" class="active">CHANNEL</button><button type="button" data-view="desk">DESK</button></nav>
      <label>TRACK <select data-track>${Object.entries(groups).map(([g, ts]) => `<optgroup label="${esc(g)}">${ts.map(t => `<option value="${esc(t)}" data-group="${esc(g)}">${esc(t)}</option>`).join('')}</optgroup>`).join('')}</select></label>
      <label>DESK <select data-desk>${houses.map(h => `<option value="${esc(h)}"${h === STUDIO.desks.default ? ' selected' : ''}>${esc(h.toUpperCase())}</option>`).join('')}</select></label>
      <button type="button" data-act="listen" title="Light the knobs from the Twisters (Web MIDI: Chrome, Edge)">LISTEN</button>
      <button type="button" data-act="close" title="Close (Esc)">✕</button>
    </header>
    <p class="console__status"></p>
    <div class="console__board"></div>
    <div class="console__twisters"></div>`;
  document.body.append(root);
  const board = root.querySelector('.console__board');
  const twisters = root.querySelector('.console__twisters');
  const status = root.querySelector('.console__status');
  const trackSel = root.querySelector('[data-track]');
  const deskSel = root.querySelector('[data-desk]');
  let plugins = {}, note = '', view = 'channel', midi = null, focus = RULES?.m32?.focus ?? 'eq';

  // the knobs first; switches (on/off, routing, bypass) after them
  const SWITCH = /\benable|\bbypass|invert|\bto\b|\bpre\b|\bsolo\b|\bsafe\b|listen|\block\b|oversampl|external|\bcut\b|\bpeak\b|fast attack|series|\bbell\b/i;
  function controls(plug, section) {
    const cs = [...(plug?.sections?.[section] ?? [])].sort((a, b) => SWITCH.test(a.name) - SWITCH.test(b.name));
    if (!plug) return '<li class="console__none">no NKS map: its own window</li>';
    if (!cs.length) return '';
    return cs.slice(0, SHOWN).map(c => `<li><span class="console__k"></span>${esc(c.name)}<small>${esc(c.section)}</small></li>`).join('')
      + (cs.length > SHOWN ? `<li class="console__more">+${cs.length - SHOWN} more</li>` : '');
  }

  // the M32: its knobs on the section in focus, the NKS names of the first devices there with controls (knobs first)
  function m32(cols) {
    const n = RULES?.m32?.knobs ?? 8;
    const names = cols[focus].filter(c => c.plug).flatMap(c => [...(c.plug.sections?.[focus] ?? [])]
      .sort((a, b) => SWITCH.test(a.name) - SWITCH.test(b.name)).map(k => ({ device: c.device, ...k }))).slice(0, n);
    const knobs = Array.from({ length: n }, (_, i) => names[i]);
    return `<div class="m32" data-section="${esc(focus)}"><h4>M32 · ${esc(NAME(focus))} <small>click a section to bring it here</small></h4>
      <div class="m32__display">${knobs.map(k => `<div class="m32__knob"><span class="console__k"></span><b>${esc(k?.name ?? '—')}</b><small>${esc(k ? `${k.device.replace(/^SSL Native /, '')} · ${k.section}` : '')}</small></div>`).join('')}</div></div>`;
  }
  // the F1: the deck's slots by its levels (a pad launches that level), its faders the slots' levels
  function f1() {
    const slots = RULES?.f1?.slots ?? [], levels = RULES?.f1?.levels ?? [];
    return `<div class="f1"><h4>F1 · THE DECK <small>pads: the slots by the levels · faders: the slots</small></h4>
      <div class="f1__pads">${levels.map((lv, r) => slots.map(s => `<span class="f1__pad" style="--r:${r}" title="${esc(`${s}, ${lv}`)}">${esc(lv)}</span>`).join('')).join('')}</div>
      <div class="f1__faders">${slots.map(s => `<div class="f1__fader"><div class="console__fader"><span></span></div><small>${esc(s)}</small></div>`).join('')}</div></div>`;
  }

  function renderChannel() {
    const opt = trackSel.selectedOptions[0];
    const track = opt?.value ?? '', group = opt?.dataset.group ?? '', desk = deskSel.value;
    const chain = channel(track, group, desk);
    const cols = Object.fromEntries(SECTIONS.map(s => [s, []]));
    for (const c of chain) {
      const plug = c.send ? null : lookup(plugins, c.device);
      const where = c.send ? ['space'] : placement(c.device, c.role, plug);
      for (const s of where) cols[s].push({ ...c, plug });
    }
    const feel = feelings();
    board.className = 'console__board console__board--channel';
    board.innerHTML = SECTIONS.map(s => `
      <div class="console__section" data-section="${s}">
        <h3>${esc(NAME(s))}</h3><p>${esc(RULES?.sections?.[s]?.say ?? '')}</p>
        ${s === 'feel' ? `<ul class="console__feelings">${feel.map(f => `<li><b>${esc(f.name)}</b><small>CC ${f.cc} · ${esc(f.macro)}</small></li>`).join('')}</ul>` : ''}
        ${cols[s].map(c => `<div class="console__device${c.on ? ' is-on' : ''}"><header><span class="console__led"></span><b>${esc(c.device)}</b><small>${esc(c.where)} · ${c.on ? 'on' : 'off'}</small></header>
          ${c.send ? '' : `<ul>${s === 'feel' && (!c.plug || isContainer(c.device)) ? '<li class="console__none">its macros 1-8: the feelings</li>' : controls(c.plug, s)}</ul>`}</div>`).join('')
          || '<p class="console__empty">nothing on this track</p>'}
      </div>`).join('');
    twisters.innerHTML = `
      <div class="twister"><h4>TWISTER · BANK 1 <small>the app's knobs</small></h4><div class="twister__grid">${appKnobs().map(k => knobHtml(k, 1)).join('')}</div></div>
      <div class="twister"><h4>TWISTER · BANK ${esc(RULES?.twister?.bank ?? 2)} <small>${esc(track)}'s fixed jobs · a proposal</small></h4><div class="twister__grid">${channelKnobs(chain, plugins).map(k => knobHtml(k, 2)).join('')}</div></div>
      ${m32(cols)}${f1()}`;
    board.querySelector(`.console__section[data-section="${focus}"]`)?.classList.add('is-focus');
    status.textContent = `${track} (${group}) · the ${desk.toUpperCase()} desk · ${note}`;
  }

  function strip(title, sub, chain) {
    return `<div class="console__strip"><h3>${esc(title)}</h3><small>${esc(sub)}</small>${chain.map(c => {
      const plug = lookup(plugins, c.device);
      const s = placement(c.device, c.role, plug)[0];
      return `<div class="console__slot${c.on ? ' is-on' : ''}" data-section="${esc(s)}"><span class="console__led"></span><b>${esc(c.device)}</b><small>${esc(NAME(s))} · ${esc(c.where)}</small></div>`;
    }).join('')}<div class="console__fader"><span></span></div></div>`;
  }

  function renderDesk() {
    const desk = deskSel.value;
    board.className = 'console__board console__board--desk';
    board.innerHTML = Object.entries(groups).map(([g, ts]) => strip(g, ts.join(', '), groupChain(desk))).join('')
      + (STUDIO?.returns ?? []).map(r => strip(r.name, r.role, returnChain(r, desk))).join('')
      + strip('MASTER', STUDIO?.master?.delivery ? `delivery: ${STUDIO.master.delivery}` : '', masterChain(desk));
    twisters.innerHTML = '';
    status.textContent = `the stems: ${Object.keys(groups).length} groups, ${(STUDIO?.returns ?? []).length} returns, the master · the ${desk.toUpperCase()} desk · ${note}`;
  }

  const render = () => (view === 'desk' ? renderDesk() : renderChannel());

  async function open() {
    root.hidden = false;
    const r = await fetchJson('/music/console');
    plugins = r.plugins ?? {};
    note = r.error ? r.error : `${Object.keys(plugins).length} plugins' NKS maps`;
    render();
  }
  function close() { root.hidden = true; }

  // a knob lights when the Twister turns it (encoders: channel 1) or pushes it (switches: channel 2)
  function light(bank, cc, value, push) {
    const k = twisters.querySelector(`.twister__knob[data-bank="${bank}"][data-cc="${cc}"]`);
    if (!k) return;
    if (push) k.classList.toggle('is-pushed', value > 0);
    else k.querySelector('.twister__ring').style.setProperty('--v', String(value / 127));
    k.classList.add('is-touched');
    board.querySelector(`.console__section[data-section="${k.dataset.section}"]`)?.classList.add('is-touched');
    clearTimeout(k._t);
    k._t = setTimeout(() => { k.classList.remove('is-touched'); board.querySelector(`.console__section[data-section="${k.dataset.section}"]`)?.classList.remove('is-touched'); }, 1200);
  }
  function onMidi(event) {
    const [st, cc, v] = event.data ?? [];
    if ((st & 0xf0) !== 0xb0) return;
    const ch = st & 0x0f, first = RULES?.twister?.cc_first ?? 16;
    if (ch > 1) return;
    if (cc < 16) light(1, cc, v, ch === 1);
    else if (cc >= first && cc < first + 16) light(2, cc, v, ch === 1);
  }
  async function listen(button) {
    if (midi) return;
    try {
      midi = await navigator.requestMIDIAccess?.();
      if (!midi) { button.textContent = 'NO WEB MIDI'; return; }
      const bind = () => { for (const input of midi.inputs.values()) { input.removeEventListener('midimessage', onMidi); input.addEventListener('midimessage', onMidi); } };
      bind();
      midi.addEventListener('statechange', bind);
      button.textContent = `LISTENING (${midi.inputs.size})`;
      button.classList.add('active');
    } catch { button.textContent = 'MIDI REFUSED'; }
  }

  root.addEventListener('click', event => {
    event.stopPropagation();
    const b = event.target.closest('button');
    if (!b) {
      const sec = event.target.closest('.console__board--channel .console__section');
      if (sec) { focus = sec.dataset.section; render(); }
      return;
    }
    if (b.dataset.view) {
      view = b.dataset.view;
      for (const x of root.querySelectorAll('[data-view]')) x.classList.toggle('active', x === b);
      trackSel.disabled = view === 'desk';
      render();
    } else if (b.dataset.act === 'close') close();
    else if (b.dataset.act === 'listen') listen(b);
  });
  root.addEventListener('change', () => render());
  // a knob on the screen shows where it acts
  twisters.addEventListener('pointerover', event => {
    const k = event.target.closest('.twister__knob');
    for (const s of board.querySelectorAll('.console__section')) s.classList.toggle('is-pointed', !!k && s.dataset.section === k.dataset.section);
  });
  twisters.addEventListener('pointerleave', () => { for (const s of board.querySelectorAll('.console__section')) s.classList.remove('is-pointed'); });
  addEventListener('keydown', event => { if (!root.hidden && event.key === 'Escape') { event.stopPropagation(); close(); } }, true);
  addEventListener('soma-console', () => open());
  return { open, close, root, light };
}
