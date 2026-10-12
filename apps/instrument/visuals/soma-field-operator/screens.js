// screens.js: several windows of the Soma Machine on one machine (tablets attached as
// extra displays, e.g. with spacedesk), kept in step with a BroadcastChannel.
//
// Open a window with ?screen=<role>:
//   level   (default) the Soma Machine as it is; runs tours and speaks.
//   cockpit the view out of the window: panels hidden, H-AL's line as a HUD; follows
//           the level shown in any other window. Camera: external or follow (drone).
//   engine  the engine room: every setting in one place, FX, camera, open windows.
// LAYOUT (in the engine room) opens a whole arrangement of windows (ISS-069): the main
// window stays where it is, the others are placed on the other monitors when Chrome's
// Window Management API is allowed, else opened cascaded to be dragged. A/B (`ab`) is per
// window, not shared: the screen beneath the main one shows the viewer's version (B).
// Any window that changes the view (a click, a tour step) tells the others; a window
// only follows, it never answers back, so there is no echo.
// Across devices (tablets, a second machine): the relay (apps/instrument/mother/relay.py)
// carries the same messages; open the app with ?relay=<url>&token=<token> once, or set it
// in the Engine Room. Each message has an id, so one heard twice (channel and relay) counts
// once. ROLE (beside FULL SCREEN) turns any window into any role: any view to any screen.

import { createVoice } from './voice.js';
import { DEFAULT_NAMES, displayNames, setDisplayName } from './names.js';
import { rice, setRice, voiceStyle, setVoiceStyle } from './rice.js';
import { midiOutSetting, setMidiOut, MIDI_CC, PHASE_NOTE, THRESHOLD_NOTE } from './midi-out.js';
import { midiInOn, setMidiIn, MIDI_IN_MAP } from './midi-in.js';

const CHANNEL = 'soma-screens';
const RELAY_KEY = 'soma-relay';

// the relay: from the address (?relay=&token=, then remembered) or the Engine Room
export function relaySetting() {
  const q = new URLSearchParams(location.search);
  if (q.get('relay') && q.get('token')) {
    const value = { url: q.get('relay').replace(/\/$/, ''), token: q.get('token') };
    try { localStorage.setItem(RELAY_KEY, JSON.stringify(value)); } catch { /* private mode */ }
    return value;
  }
  try { return JSON.parse(localStorage.getItem(RELAY_KEY) || 'null'); } catch { return null; }
}

export function setRelay(value) {
  try {
    if (value?.url && value?.token) localStorage.setItem(RELAY_KEY, JSON.stringify({ url: value.url.replace(/\/$/, ''), token: value.token }));
    else localStorage.removeItem(RELAY_KEY);
  } catch { /* private mode */ }
}
export const SHARED_KEYS = ['level', 'path', 'lens', 'dim', 'model', 'reader', 'era', 'compare', 'contours', 'labels', 'styleoff',
  'voyage', 'phi', 'feel', 'resource', 'kv', 'st', 'bpm', 'kr', 'kd', 'kt', 'kw', 'km', 'kc',
  'kf', 'tw', 'pv', 'ca', 'cs', 'cp', 'kx', 'ap', 'uo'];
export const ROLES = ['level', 'cockpit', 'engine', 'maintenance'];

export const screenRole = (() => {
  const role = new URLSearchParams(location.search).get('screen');
  return ROLES.includes(role) ? role : 'level';
})();

function sharedState(hash) {
  const params = new URLSearchParams(String(hash ?? '').replace(/^#/, ''));
  const shared = new URLSearchParams();
  for (const key of SHARED_KEYS) if (params.has(key)) shared.set(key, params.get(key));
  return shared.toString();
}

// hooks: { applyShared(sharedQuery), setCameraMode(mode), setFx(value) }
export function createScreens(hooks) {
  const channel = 'BroadcastChannel' in globalThis ? new BroadcastChannel(CHANNEL) : null;
  let lastShared = sharedState(location.hash);
  let fx = Number(localStorage.getItem('soma-fx') ?? 0.5);
  let cameraMode = localStorage.getItem('soma-camera') ?? 'external';
  const hud = screenRole === 'cockpit' ? createHud() : null;
  const self = Math.random().toString(36).slice(2);
  const heard = new Set();
  const relay = relaySetting();
  let relayStatus = relay ? 'connecting' : 'off';

  document.body.classList.add(`screen-${screenRole}`);
  if (screenRole !== 'level') post({ type: 'hello', role: screenRole });
  applyFx(fx);
  if (screenRole === 'cockpit') hooks.setCameraMode(cameraMode);

  function post(message) {
    const m = { ...message, mid: `${self}-${Math.random().toString(36).slice(2, 10)}`, from: self };
    heard.add(m.mid);
    channel?.postMessage(m);
    if (relay) fetch(`${relay.url}/send?token=${encodeURIComponent(relay.token)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(m) })
      .then(r => { relayStatus = r.ok ? 'connected' : `refused (${r.status})`; }).catch(() => { relayStatus = 'not reachable'; });
  }
  if (relay && 'EventSource' in globalThis) {
    const events = new EventSource(`${relay.url}/events?token=${encodeURIComponent(relay.token)}`);
    events.onopen = () => { relayStatus = 'connected'; };
    events.onerror = () => { relayStatus = 'not reachable (retrying)'; };
    events.onmessage = event => { try { receive(JSON.parse(event.data)); } catch { /* not ours */ } };
  }

  // A new window adopts the current view instead of announcing its own start-up view:
  // it asks, and windows that lead answer. Until then (or for 2 s) it does not publish.
  const leads = screenRole !== 'cockpit';
  let settled = false;
  setTimeout(() => { settled = true; lastShared = sharedState(location.hash); }, 2000);

  // Called by main.js whenever its hash state is written or applied.
  function publish(hash, { force = false } = {}) {
    const shared = sharedState(hash);
    if (!leads || !settled) {
      lastShared = shared;
      return;
    }
    if (shared === lastShared && !force) return;
    lastShared = shared;
    post({ type: 'view', shared });
  }

  function applyFx(value) {
    fx = Math.max(0, Math.min(1, Number(value)));
    document.documentElement.style.setProperty('--fx', String(fx));
    hooks.setFx?.(fx);
  }

  channel?.addEventListener('message', ({ data }) => receive(data));
  function receive(data) {
    if (!data || typeof data !== 'object' || data.from === self) return;
    if (data.mid) {
      if (heard.has(data.mid)) return;
      heard.add(data.mid);
      if (heard.size > 500) heard.clear();
    }
    // A level window keeps the view it was opened with (a link, a tour) until it has settled.
    if (data.type === 'view' && screenRole === 'level' && !settled) {
      return;
    }
    if (data.type === 'view' && typeof data.shared === 'string' && data.shared !== lastShared) {
      lastShared = data.shared;
      settled = true;
      hooks.applyShared(data.shared);
    } else if (data.type === 'hello' && leads && settled) {
      publish(location.hash, { force: true });
    } else if (data.type === 'step') {
      hud?.show(data);
    } else if (data.type === 'tour-end') {
      hud?.hide();
    } else if (data.type === 'fx') {
      applyFx(data.value);
    } else if (data.type === 'camera' && screenRole === 'cockpit') {
      cameraMode = data.mode;
      hooks.setCameraMode(cameraMode);
    }
  }

  // Full screen at the display's full resolution: F, or the button in the corner.
  const fullButton = document.createElement('button');
  fullButton.type = 'button';
  fullButton.className = 'screen-fullscreen';
  fullButton.textContent = 'FULL SCREEN';
  fullButton.title = 'Full screen (F)';
  fullButton.addEventListener('click', toggleFullscreen);
  document.body.append(fullButton);
  // ROLE: any view to any screen; the window reopens in the next role, the view kept
  const roleButton = document.createElement('button');
  roleButton.type = 'button';
  roleButton.className = 'screen-role';
  roleButton.textContent = `ROLE: ${screenRole.toUpperCase()}`;
  roleButton.title = 'Turn this window into another role: level, cockpit, engine room, maintenance';
  roleButton.addEventListener('click', () => {
    const url = new URL(location.href);
    url.searchParams.set('screen', ROLES[(ROLES.indexOf(screenRole) + 1) % ROLES.length]);
    location.href = url.toString();
  });
  document.body.append(roleButton);
  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.({ navigationUI: 'hide' });
  }
  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.key.toLowerCase() !== 'f') return;
    if (event.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    event.preventDefault();
    toggleFullscreen();
  });
  document.addEventListener('fullscreenchange', () => {
    fullButton.hidden = roleButton.hidden = Boolean(document.fullscreenElement);
    dispatchEvent(new Event('resize'));
  });

  return {
    publish,
    // The tour player reports each stop, so cockpit windows can show H-AL's line.
    step: data => post({ type: 'step', ...data }),
    tourEnd: () => post({ type: 'tour-end' }),
    setFx: value => {
      applyFx(value);
      localStorage.setItem('soma-fx', String(fx));
      post({ type: 'fx', value: fx });
    },
    setCamera: mode => {
      cameraMode = mode;
      localStorage.setItem('soma-camera', mode);
      post({ type: 'camera', mode });
      if (screenRole === 'cockpit') hooks.setCameraMode(mode);
    },
    get fx() { return fx; },
    get relayStatus() { return relayStatus; },
    get cameraMode() { return cameraMode; },
  };
}

function createHud() {
  const element = document.createElement('section');
  element.className = 'screen-hud';
  element.hidden = true;
  element.setAttribute('aria-live', 'polite');
  element.innerHTML = '<p class="screen-hud__label"></p><p class="screen-hud__say"></p>';
  document.body.append(element);
  const label = element.querySelector('.screen-hud__label');
  const say = element.querySelector('.screen-hud__say');
  return {
    show(data) {
      label.textContent = data.labelText ?? '';
      label.dataset.label = data.label ?? '';
      say.textContent = data.say ?? '';
      element.hidden = !data.say;
    },
    hide() { element.hidden = true; },
  };
}

// Layout profiles (ISS-069, the author's three): where each window goes, relative to the
// main screen, and what it shows. place: beneath | left | right | tablet1-3 | side.
export const LAYOUTS = {
  't': { title: 'INVERTED T', windows: [
    { place: 'beneath', role: 'level', hash: 'ab=b', note: 'your version (B), as synthetic vision' },
    { place: 'left', role: 'engine' },
    { place: 'right', role: 'cockpit' },
  ] },
  sim: { title: 'SIMULATOR', windows: [
    { place: 'left', role: 'cockpit', note: 'glass cockpit 1' },
    { place: 'right', role: 'level', hash: 'ab=b', note: 'glass cockpit 2: your version' },
    { place: 'tablet1', role: 'engine', note: 'the flight bag' },
  ] },
  desk: { title: 'DESK', windows: [
    { place: 'tablet1', role: 'cockpit' },
    { place: 'tablet2', role: 'level', hash: 'ab=b' },
    { place: 'tablet3', role: 'engine' },
    { place: 'side', role: 'level', note: 'the laptop screen' },
  ] },
};

// The other monitors, ordered for a place: below the main screen first for beneath and
// tablets (left to right), left of it for left, right of it for right and side.
function pickScreen(screens, main, place, used) {
  const free = screens.filter(s => s !== main && !used.has(s));
  const below = free.filter(s => s.top >= main.top + main.height - 40).sort((a, b) => a.left - b.left);
  const left = free.filter(s => s.left + s.width <= main.left + 40).sort((a, b) => b.left - a.left);
  const right = free.filter(s => s.left >= main.left + main.width - 40).sort((a, b) => a.left - b.left);
  const order = place === 'left' ? [...left, ...below, ...free]
    : place === 'right' || place === 'side' ? [...right, ...below, ...free]
      : [...below, ...free];
  return order[0] ?? null;
}

export async function openLayout(id) {
  const layout = LAYOUTS[id];
  if (!layout) return 0;
  localStorage.setItem('soma-layout', id);
  let screens = null;
  let main = null;
  try {
    const details = await globalThis.getScreenDetails?.(); // Chrome asks the user once
    screens = details?.screens ?? null;
    main = details?.currentScreen ?? null;
  } catch { /* not allowed: cascade */ }
  const used = new Set();
  layout.windows.forEach((w, k) => {
    const url = new URL(location.href);
    url.searchParams.set('screen', w.role);
    const shared = sharedState(location.hash);
    url.hash = [shared, w.hash].filter(Boolean).join('&');
    let features = `popup,width=1280,height=800,left=${80 + 40 * k},top=${80 + 40 * k}`;
    const target = screens && main ? pickScreen(screens, main, w.place, used) : null;
    if (target) {
      used.add(target);
      features = `popup,left=${target.availLeft},top=${target.availTop},width=${target.availWidth},height=${target.availHeight}`;
    }
    window.open(url.toString(), `soma-${id}-${w.place}`, features);
  });
  return layout.windows.length;
}

const MAINTENANCE_KEY = 'soma-maintenance-reminders';

export function createMaintenanceDeck({ reminders = [] } = {}) {
  const deck = document.createElement('section');
  deck.className = 'maintenance-deck';
  deck.innerHTML = `
    <header>
      <p class="maintenance-deck__kicker">[T]-THEORY / H-AL</p>
      <h1>MAINTENANCE</h1>
      <p class="maintenance-deck__hint">Static admin reminders from the issue register. Read private material in place; never copy secrets. This browser stores only DONE and SNOOZE.</p>
      <button type="button" class="maintenance-deck__brief" data-brief>BRIEF ME</button>
    </header>
    <div class="maintenance-deck__list"></div>`;
  document.body.append(deck);
  const list = deck.querySelector('.maintenance-deck__list');

  function load() {
    try { return JSON.parse(localStorage.getItem(MAINTENANCE_KEY) || '{}'); } catch { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(MAINTENANCE_KEY, JSON.stringify(state)); } catch { /* private mode */ }
  }
  function render() {
    const state = load();
    const now = Date.now();
    const visible = reminders.filter(item => !state[item.id]?.done && (state[item.id]?.snoozeUntil ?? 0) <= now);
    list.replaceChildren();
    if (!visible.length) {
      const empty = document.createElement('p');
      empty.className = 'maintenance-deck__empty';
      empty.textContent = 'No reminders due. Snoozed items will return tomorrow; done items stay hidden in this browser.';
      list.append(empty);
      return;
    }
    for (const item of visible) {
      const card = document.createElement('article');
      card.className = 'maintenance-card';
      card.innerHTML = `<p class="maintenance-card__source">${item.source}</p><h2></h2><p></p><nav><button type="button" data-done="${item.id}">DONE</button><button type="button" data-snooze="${item.id}">SNOOZE</button></nav>`;
      card.querySelector('h2').textContent = item.title;
      card.querySelector('p:not(.maintenance-card__source)').textContent = item.text;
      list.append(card);
    }
  }
  // H-AL's briefing (ISS-065): the due steps read aloud, H-AL's Piper voice through the
  // bridge when it runs (MOTHER's bridge setting), else the browser's voice
  const voice = createVoice();
  const briefButton = deck.querySelector('[data-brief]');
  let briefing = false;
  async function brief() {
    if (briefing) { voice.stop(); return; }
    const state = load();
    const now = Date.now();
    const due = reminders.filter(item => !state[item.id]?.done && (state[item.id]?.snoozeUntil ?? 0) <= now);
    const text = due.length
      ? `${due.length} step${due.length === 1 ? '' : 's'} on your desk. ` + due.map((item, i) => `${i + 1}. ${item.title}.`).join(' ') + ' That is all.'
      : 'Nothing is due. Your desk is clear.';
    const bridge = (() => { try { return localStorage.getItem('mother-bridge-url') || 'http://127.0.0.1:8765'; } catch { return ''; } })();
    briefing = true;
    briefButton.textContent = 'STOP';
    try { await voice.speak(text, 'hal', bridge); } finally { briefing = false; briefButton.textContent = 'BRIEF ME'; }
  }
  deck.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.brief !== undefined) { brief(); return; }
    const id = button.dataset.done || button.dataset.snooze;
    if (!id) return;
    const state = load();
    state[id] = button.dataset.done ? { done: true } : { snoozeUntil: Date.now() + 24 * 60 * 60 * 1000 };
    save(state);
    render();
  });
  render();
  return { refresh: render };
}

// The engine room: one page with every setting, for its own window or tablet.
export function createEngineRoom({ screens, setParam, readParams, styleKeys }) {
  const room = document.createElement('section');
  room.className = 'engine-room';
  const choices = [
    ['lens', 'THEORY LENS', [['on', 'ON'], ['off', 'OFF (PHYSICS)']]],
    ['dim', 'DIMENSION', [['4', '4D BODY'], ['8', '8D FEELING'], ['11', '11D MIND']]],
    ['compare', 'COMPARE', [['1', 'SIDE BY SIDE'], ['0', 'OFF']]],
    ['contours', 'CONTOURS', [['1', 'ON'], ['0', 'OFF']]],
    ['labels', 'LABELS', [['on', 'ON'], ['off', 'OFF']]],
    ['reader', 'READER', [['cookie', 'COOKIE'], ['general', 'GENERAL'], ['specialist', 'SPECIALIST']]],
  ];
  room.innerHTML = `
    <header><p class="engine-room__kicker">[T]-THEORY / SOMA MACHINE</p><h1>ENGINE ROOM</h1>
    <p class="engine-room__hint">Every setting in one place. Changes go to every open window.</p></header>
    <div class="engine-room__grid">
      ${choices.map(([key, title, options]) => `<fieldset data-key="${key}"><legend>${title}</legend>${options.map(([value, text]) => `<button type="button" data-value="${value}">${text}</button>`).join('')}</fieldset>`).join('')}
      <fieldset data-style><legend>STYLE</legend>${styleKeys.map(key => `<button type="button" data-style-key="${key}">${key.toUpperCase()}</button>`).join('')}</fieldset>
      <fieldset><legend>FX</legend><input class="engine-room__fx" type="range" min="0" max="1" step="0.05" aria-label="Effects intensity" /><span class="engine-room__fx-value"></span></fieldset>
      <fieldset data-camera><legend>COCKPIT CAMERA</legend><button type="button" data-camera="external">EXTERNAL</button><button type="button" data-camera="follow">FOLLOW (DRONE)</button></fieldset>
      <fieldset><legend>WINDOWS</legend>
        <button type="button" data-open="level">OPEN LEVEL VIEW</button>
        <button type="button" data-open="cockpit">OPEN COCKPIT VIEW</button>
        <button type="button" data-open="engine">OPEN ENGINE ROOM</button>
        <button type="button" data-open="maintenance">OPEN MAINTENANCE</button>
        <p class="engine-room__hint">Drag a window to a tablet, then press F for full screen.</p>
        <p class="engine-room__hint">LAYOUT: open a whole arrangement around the main window (Chrome may ask to place windows on your screens).</p>
        ${Object.entries(LAYOUTS).map(([id, l]) => `<button type="button" data-layout="${id}" title="${l.windows.map(w => `${w.place}: ${w.role}${w.hash ? ` (${w.hash})` : ''}${w.note ? `, ${w.note}` : ''}`).join('; ')}">${l.title}</button>`).join('')}
      </fieldset>
      <fieldset data-rice><legend>RICE</legend>
        <p class="engine-room__hint">The author's options (ricing): crew alerts at the score stop, and more as they arrive. Every window of this browser follows.</p>
        <button type="button" data-rice="1">ON</button><button type="button" data-rice="0">OFF</button>
        <p class="engine-room__hint">VOICE: MS, the browser's Microsoft Natural voices (Edge, Windows 11); H-AL, his Piper voice through the bridge with the HAL effect (MOTHER stays Natural).</p>
        <button type="button" data-voice-style="ms">VOICE: MS</button><button type="button" data-voice-style="hal">VOICE: H-AL</button>
      </fieldset>
      <fieldset data-midi><legend>MIDI OUT (ABLETON)</legend>
        <p class="engine-room__hint">The score as MIDI, channel 1: CC ${Object.entries(MIDI_CC).map(([id, cc]) => `${cc} ${id}`).join(', ')}; a phase plays note ${PHASE_NOTE}+, a threshold note ${THRESHOLD_NOTE}+. Into a virtual port (loopMIDI), then Ableton's MIDI Map. Chrome asks once.</p>
        <label>PORT<input type="text" maxlength="60" data-midi-port placeholder="loopMIDI" /></label>
        <button type="button" data-midi="1">ON</button><button type="button" data-midi="0">OFF</button>
      </fieldset>
      <fieldset data-midiin><legend>MIDI IN (CONTROLLER)</legend>
        <p class="engine-room__hint">A controller turns the knobs live (a MIDI Fighter Twister's factory CCs): ${Object.entries(MIDI_IN_MAP).map(([cc, id]) => `CC ${cc} ${id}`).join(', ')}. The mode knobs act in CO-PILOT and MANUAL. Reload the windows after switching.</p>
        <button type="button" data-midiin="1">ON</button><button type="button" data-midiin="0">OFF</button>
      </fieldset>
      <fieldset data-relay><legend>RELAY (TABLETS)</legend>
        <p class="engine-room__hint">Tablets and a second machine follow this one through the relay: run <code>python apps/instrument/mother/relay.py --lan</code>, enter its address and token here and on each device (or open the app there with ?relay=…&amp;token=…), and serve the app on the network (npm run start -- --host). Reload to connect.</p>
        <label>ADDRESS<input type="text" maxlength="80" data-relay-url placeholder="http://192.168.1.10:8766" /></label>
        <label>TOKEN<input type="text" maxlength="40" data-relay-token /></label>
        <button type="button" data-relay="1">SAVE</button><button type="button" data-relay="0">OFF</button>
        <p class="engine-room__hint engine-room__relay-status"></p>
      </fieldset>
      <fieldset class="engine-room__names"><legend>NAMES</legend>
        <p class="engine-room__hint">Your own name for each persona and layer. Kept in this browser only; empty restores the default.</p>
        ${Object.entries(DEFAULT_NAMES).map(([id, name]) => `<label>${name}<input type="text" maxlength="40" data-name="${id}" placeholder="${name}" /></label>`).join('')}
      </fieldset>
      <fieldset class="engine-room__fuel"><legend>FUEL: KNOWLEDGE BANKS</legend>
        <p class="engine-room__hint">The notebooks MOTHER and H-AL answer from (local bridge), and the NotebookLM compute left.</p>
        <div class="engine-room__gauges"></div>
        <div class="engine-room__banks">Bridge not checked.</div>
        <button type="button" data-fuel="refresh">CHECK BRIDGE</button>
      </fieldset>
    </div>`;
  document.body.append(room);
  const fxInput = room.querySelector('.engine-room__fx');
  const names = displayNames();
  for (const input of room.querySelectorAll('[data-name]')) {
    if (names[input.dataset.name] !== DEFAULT_NAMES[input.dataset.name]) input.value = names[input.dataset.name];
    input.addEventListener('change', () => setDisplayName(input.dataset.name, input.value));
  }
  const banks = room.querySelector('.engine-room__banks');
  room.querySelector('[data-midi-port]').value = midiOutSetting() ?? '';
  const relayNow = relaySetting();
  room.querySelector('[data-relay-url]').value = relayNow?.url ?? '';
  room.querySelector('[data-relay-token]').value = relayNow?.token ?? '';
  const bridge = () => (localStorage.getItem('mother-bridge-url') || 'http://127.0.0.1:8765').replace(/\/$/, '');

  const gauges = room.querySelector('.engine-room__gauges');

  // A dial per usage window: the arc is the fuel left (green, amber below 35 %, red below 15 %).
  function gauge(title, remaining, resets, note) {
    const left = Math.max(0, Math.min(100, remaining));
    const colour = left < 15 ? '#ff5470' : left < 35 ? '#f6c75a' : '#56f0a2';
    const radius = 46;
    const half = Math.PI * radius;
    const element = document.createElement('figure');
    element.className = 'engine-room__gauge';
    element.innerHTML = `
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <path d="M 14 62 A 46 46 0 0 1 106 62" fill="none" stroke="rgba(234,245,255,.14)" stroke-width="10" stroke-linecap="round"/>
        <path d="M 14 62 A 46 46 0 0 1 106 62" fill="none" stroke="${colour}" stroke-width="10" stroke-linecap="round"
          stroke-dasharray="${(half * left / 100).toFixed(1)} ${half.toFixed(1)}"/>
        <text x="60" y="58" text-anchor="middle" fill="#f3ead0" font-size="17" font-weight="700">${Math.round(left)}%</text>
      </svg>
      <figcaption><strong>${title}</strong><span>${note}</span><span>resets ${resets}</span></figcaption>`;
    return element;
  }

  async function loadUsage() {
    try {
      const response = await fetch(`${bridge()}/usage`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || response.status);
      gauges.replaceChildren(...data.windows.map(window => gauge(
        window.kind === 'five_hour' ? 'FIVE-HOUR' : 'WEEKLY',
        window.remaining_percent,
        window.resets_local,
        window.kind === 'five_hour' ? `about ${data.questions_left} questions left` : `${window.used_percent.toFixed(1)}% used this week`,
      )));
    } catch (error) {
      gauges.textContent = `Usage not available (${error.message}).`;
    }
  }

  async function loadFuel() {
    loadUsage();
    banks.textContent = 'Checking the bridge...';
    try {
      const response = await fetch(`${bridge()}/fuel`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || response.status);
      banks.replaceChildren(...data.banks.map(bank => {
        const row = document.createElement('details');
        row.className = `engine-room__bank${bank.active ? ' active' : ''}`;
        const summary = document.createElement('summary');
        summary.textContent = `${bank.name}  ${bank.count} sources${bank.role === 'hal' && bank.active ? '  (H-AL NOW)' : ''}`;
        row.append(summary);
        if (bank.role === 'hal' && !bank.active) {
          const use = document.createElement('button');
          use.type = 'button';
          use.dataset.useHal = bank.name.replace(/ \(unreadable.*$/, '');
          use.textContent = 'USE FOR H-AL';
          row.append(use);
        }
        const list = document.createElement('ul');
        for (const title of bank.titles) {
          const item = document.createElement('li');
          item.textContent = title;
          list.append(item);
        }
        row.append(list);
        return row;
      }));
    } catch (error) {
      banks.textContent = `Bridge not reachable (${error.message}). Start it with: make mother-bridge`;
    }
  }
  const fxValue = room.querySelector('.engine-room__fx-value');

  function sync() {
    for (const b of room.querySelectorAll('[data-rice]')) b.classList.toggle('active', (b.dataset.rice === '1') === rice());
    for (const b of room.querySelectorAll('[data-voice-style]')) b.classList.toggle('active', b.dataset.voiceStyle === voiceStyle());
    const relayLine = room.querySelector('.engine-room__relay-status');
    if (!relayLine.textContent.startsWith('Saved')) relayLine.textContent = `Relay: ${screens.relayStatus}`;
    for (const b of room.querySelectorAll('[data-midiin]')) b.classList.toggle('active', (b.dataset.midiin === '1') === midiInOn());
    for (const b of room.querySelectorAll('[data-midi]')) b.classList.toggle('active', (b.dataset.midi === '1') === (midiOutSetting() !== null));
    const params = readParams();
    for (const fieldset of room.querySelectorAll('fieldset[data-key]')) {
      const current = params.get(fieldset.dataset.key);
      for (const button of fieldset.querySelectorAll('button')) button.classList.toggle('active', button.dataset.value === current);
    }
    const off = new Set((params.get('styleoff') ?? '').split('.').filter(Boolean));
    for (const button of room.querySelectorAll('[data-style-key]')) button.classList.toggle('active', !off.has(button.dataset.styleKey));
    for (const button of room.querySelectorAll('[data-camera]')) button.classList.toggle('active', button.dataset.camera === screens.cameraMode);
    fxInput.value = String(screens.fx);
    fxValue.textContent = `${Math.round(screens.fx * 100)}%`;
  }

  room.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const fieldset = button.closest('fieldset');
    if (fieldset?.dataset.key) setParam(fieldset.dataset.key, button.dataset.value);
    if (button.dataset.styleKey) {
      const params = readParams();
      const off = new Set((params.get('styleoff') ?? '').split('.').filter(Boolean));
      if (off.has(button.dataset.styleKey)) off.delete(button.dataset.styleKey);
      else off.add(button.dataset.styleKey);
      setParam('styleoff', [...off].join('.'));
    }
    if (button.dataset.camera) screens.setCamera(button.dataset.camera);
    if (button.dataset.fuel === 'refresh') loadFuel();
    if (button.dataset.useHal) {
      fetch(`${bridge()}/hal-notebook`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: button.dataset.useHal }) })
        .then(() => loadFuel());
    }
    if (button.dataset.layout) openLayout(button.dataset.layout);
    if (button.dataset.rice) setRice(button.dataset.rice === '1');
    if (button.dataset.voiceStyle) { setVoiceStyle(button.dataset.voiceStyle); sync(); }
    if (button.dataset.midiin) setMidiIn(button.dataset.midiin === '1');
    if (button.dataset.relay) {
      setRelay(button.dataset.relay === '1' ? { url: room.querySelector('[data-relay-url]').value.trim(), token: room.querySelector('[data-relay-token]').value.trim() } : null);
      room.querySelector('.engine-room__relay-status').textContent = 'Saved: reload each window to connect.';
    }
    if (button.dataset.midi) setMidiOut(button.dataset.midi === '1' ? (room.querySelector('[data-midi-port]').value.trim() || 'loopMIDI') : null);
    if (button.dataset.open) {
      const url = new URL(location.href);
      url.searchParams.set('screen', button.dataset.open);
      window.open(url.toString(), `soma-${button.dataset.open}-${Date.now()}`, 'popup,width=1280,height=800');
    }
    setTimeout(sync, 120);
  });
  fxInput.addEventListener('input', () => {
    screens.setFx(fxInput.value);
    fxValue.textContent = `${Math.round(screens.fx * 100)}%`;
  });
  addEventListener('hashchange', sync);
  setInterval(sync, 1500);
  setInterval(loadUsage, 120000);
  loadUsage();
  sync();
}
