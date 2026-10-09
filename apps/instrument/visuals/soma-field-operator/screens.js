// screens.js: several windows of the Soma Machine on one machine (tablets attached as
// extra displays, e.g. with spacedesk), kept in step with a BroadcastChannel.
//
// Open a window with ?screen=<role>:
//   level   (default) the Soma Machine as it is; runs tours and speaks.
//   cockpit the view out of the window: panels hidden, HAL's line as a HUD; follows
//           the level shown in any other window. Camera: external or follow (drone).
//   engine  the engine room: every setting in one place, FX, camera, open windows.
// Any window that changes the view (a click, a tour step) tells the others; a window
// only follows, it never answers back, so there is no echo.

const CHANNEL = 'soma-screens';
const SHARED_KEYS = ['level', 'path', 'lens', 'dim', 'model', 'reader', 'era', 'compare', 'contours', 'labels', 'styleoff'];
export const ROLES = ['level', 'cockpit', 'engine'];

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

  document.body.classList.add(`screen-${screenRole}`);
  if (screenRole !== 'level') post({ type: 'hello', role: screenRole });
  applyFx(fx);
  if (screenRole === 'cockpit') hooks.setCameraMode(cameraMode);

  function post(message) {
    channel?.postMessage(message);
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

  channel?.addEventListener('message', ({ data }) => {
    if (!data || typeof data !== 'object') return;
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
  });

  // Full screen at the display's full resolution: F, or the button in the corner.
  const fullButton = document.createElement('button');
  fullButton.type = 'button';
  fullButton.className = 'screen-fullscreen';
  fullButton.textContent = 'FULL SCREEN';
  fullButton.title = 'Full screen (F)';
  fullButton.addEventListener('click', toggleFullscreen);
  document.body.append(fullButton);
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
    fullButton.hidden = Boolean(document.fullscreenElement);
    dispatchEvent(new Event('resize'));
  });

  return {
    publish,
    // The tour player reports each stop, so cockpit windows can show HAL's line.
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
        <p class="engine-room__hint">Drag a window to a tablet, then press F for full screen.</p>
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
  const banks = room.querySelector('.engine-room__banks');
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
