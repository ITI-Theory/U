// soma-tour: a tiny tour language for the Soma Machine (spec: docs/TOUR-LANGUAGE.md).
// A tour is a list of steps; each step sets a view (a hash fragment), says a line,
// and dwells. Presets live in registry/tours. Every step is checked against the
// app's real ids before it runs; unknown steps are dropped, and nothing in a tour
// is ever executed as code.

import { eras, levels, models, paths, questions, scores, tours, viewers, zUSFAbstract } from './generated/app-data.js';
import { OVERLAYS, createPresentationStage } from './presentation.js';
import { FEELINGS, STOPS as VOYAGE_STOPS } from './explorer.js';
import { companion } from './who.js';
import { parseVia, styleProblem } from './transitions.js';
import { createVeil } from './veil.js';

export const EVIDENCE_LABELS = ['kernel-verified', 'derived-under-assumptions', 'simulated', 'empirical-result', 'interpretive', 'open-hypothesis'];
const TOUR_KEYS = new Set(['level', 'path', 'lens', 'dim', 'model', 'reader', 'era', 'compare', 'contours', 'q', 'labels', 'ui',
  'voyage', 'phi', 'feel', 'resource', 'kv', 'st', 'bpm', 'kr', 'kd', 'kt', 'kw', 'km', 'kc',
  'kf', 'tw', 'pv', 'ca', 'cs', 'cp', 'kx', 'ab', 'ap', 'tower', 'floor', 'uo', 'uv', 'palace', 'pf', 'hall', 'cave', 'choices', 'golf', 'band', 'bhz', 'lfly', 'led', 'glass', 'art']);
const FIXED = {
  lens: ['on', 'off'], dim: ['4', '8', '11'], reader: ['cookie', 'general', 'specialist'],
  compare: ['0', '1'], contours: ['0', '1'], labels: ['on', 'off'], ui: ['clean'],
  // The mind explorer (explorer.js): its stops, feelings and the RESOURCE switch.
  voyage: VOYAGE_STOPS, feel: Object.keys(FEELINGS), resource: ['0', '1'], kr: ['0', '0.5', '1'], kc: ['mind', 'river', 'body', 'session', 'cave'], tw: ['0', '1'], kx: ['0', '1', '2', '3', '4'], ab: ['a', 'b'], ap: ['auto', 'co', 'manual'], uo: ['1', '2', '3', '4'], uv: ['in', 'out', 'both'],
  palace: ['0', '1'], hall: ['0', '1'], cave: ['0', '1'], choices: ['0', '1'], golf: ['0', '1'],
  band: ['delta', 'theta', 'alpha', 'beta', 'gamma'], lfly: ['0', '1'], led: ['0', '1'], glass: ['0', '1'], art: ['pencil', 'retro', 'distort'],
};
// phi (the limbic field, the FX bar) is a number from 0 to 1.
const PHI = /^(0(\.\d{1,3})?|1(\.0{1,3})?)$/;
// km: the modes a score is rendered with (score.js MODE_IDS)
const SCORE_MODES = ['S', 'F', 'C', 'A', 'G', 'L', 'PV'];
// Presentation steps: `abstract: <n>` shows the opening abstract (0: no highlight,
// n: paragraph n highlighted); `overlay: <name>` draws one idea faintly over the view;
// `pause: <s>` holds the view for s more seconds after the line.
// `poke: weak|strong|twice` fires the app's poke at the stop (twice: two strong pokes 2 s
// apart, inside a neuron's refractory period and after the human state has flipped).
const POKES = { weak: [0.2], strong: [1.0], twice: [1.0, 1.0] };
// voices a step may ask for (voice.js personas)
const VOICES = ['hal', 'mother', 'munch'];
const ABSTRACT_PARAGRAPHS = String(zUSFAbstract ?? '').split('\n\n').length;

// Same rules as scripts/generate.py tour_stage_errors.
export function stageProblems(step) {
  const problems = [];
  if (step.overlay !== undefined && !OVERLAYS.includes(step.overlay)) problems.push(`unknown overlay ${step.overlay}`);
  if (step.poke !== undefined && !POKES[step.poke]) problems.push(`poke ${step.poke} not one of ${Object.keys(POKES).join(', ')}`);
  if (step.voice !== undefined && !VOICES.includes(step.voice)) problems.push(`voice ${step.voice} not one of ${VOICES.join(', ')}`);
  if (step.pause !== undefined && !(Number.isFinite(step.pause) && step.pause >= 0 && step.pause <= 30)) problems.push(`pause ${step.pause} not in 0..30 seconds`);
  if (step.overview !== undefined && ![0, 1].includes(step.overview)) problems.push(`overview ${step.overview} not 0 or 1`);
  if (step.via !== undefined && parseVia(step.via).problem) problems.push(parseVia(step.via).problem);
  if (styleProblem(step.style)) problems.push(styleProblem(step.style));
  if (step.abstract !== undefined && !(Number.isInteger(step.abstract) && step.abstract >= 0 && step.abstract <= ABSTRACT_PARAGRAPHS)) problems.push(`abstract ${step.abstract} not in 0..${ABSTRACT_PARAGRAPHS}`);
  return problems;
}
const IDS = {
  level: new Set(levels.map(item => item.id)),
  path: new Set(paths.map(item => item.id)),
  model: new Set(models.map(item => item.id)),
  era: new Set(eras.map(item => item.id)),
  q: new Set(questions.map(item => item.id)),
  kf: new Set((scores ?? []).map(item => item.id)),
  pv: new Set((viewers ?? []).map(item => item.id)),
};
const PRESETS = new Map(tours.map(tour => [tour.id, tour]));
// main.js rewrites the hash on start-up, so keep the one the page was opened with.
const INITIAL_HASH = location.hash;

export const presetIds = () => [...PRESETS.keys()];

// Same rules as scripts/generate.py tour_view_errors.
export function viewProblems(view) {
  const params = new URLSearchParams(String(view ?? '').replace(/^#/, ''));
  const problems = [];
  if (![...params.keys()].length) problems.push('empty view');
  for (const [key, value] of params) {
    if (!TOUR_KEYS.has(key)) problems.push(`unknown key ${key}`);
    else if (FIXED[key] && !FIXED[key].includes(value)) problems.push(`${key}=${value} not allowed`);
    else if (['phi', 'st', 'kd', 'kt', 'ca', 'cs', 'cp'].includes(key) && !PHI.test(value)) problems.push(`${key}=${value} not a number from 0 to 1`);
    else if (key === 'kw' && !(Number(value) >= 0.5 && Number(value) <= 2)) problems.push(`kw=${value} not from 0.5 to 2`);
    else if (key === 'km' && !value.split(',').every(id => SCORE_MODES.includes(id))) problems.push(`km=${value} not a list of ${SCORE_MODES.join(',')}`);
    else if (key === 'kv' && !(Number(value) >= 0.1 && Number(value) <= 3)) problems.push(`kv=${value} not from 0.1 to 3`);
    else if (key === 'bhz' && !(/^\d+(\.\d+)?$/.test(value) && Number(value) >= 0.5 && Number(value) <= 100)) problems.push(`bhz=${value} not from 0.5 to 100 Hz`);
    else if (key === 'bpm' && !(/^\d+$/.test(value) && Number(value) >= 50 && Number(value) <= 140)) problems.push(`bpm=${value} not from 50 to 140`);
    else if (IDS[key] && !IDS[key].has(value)) problems.push(`unknown ${key} ${value}`);
  }
  return problems;
}

function unquote(value) {
  const text = value.trim();
  return /^(["']).*\1$/.test(text) ? text.slice(1, -1) : text;
}

// Parse the restricted block: `tour: <preset>`, `title: ...`, then steps starting with
// `- view: ...` followed by `say:`, `dwell:`, `label:`, `overlay:`, `abstract:`, `pause:` and `poke:` lines.
// Anything else is ignored.
export function parseTourBlock(text) {
  const parsed = { tour: null, title: null, steps: [] };
  let step = null;
  for (const raw of String(text ?? '').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const startsStep = line.startsWith('- ');
    const body = startsStep ? line.slice(2).trim() : line;
    const match = body.match(/^([a-z]+)\s*:\s*(.*)$/i);
    if (!match) continue;
    const key = match[1].toLowerCase();
    const value = unquote(match[2]);
    if (startsStep) {
      step = {};
      parsed.steps.push(step);
    }
    if (!step && key === 'tour') parsed.tour = value;
    else if (!step && key === 'title') parsed.title = value;
    else if (step && ['view', 'say', 'label', 'overlay', 'poke', 'via', 'style'].includes(key)) step[key] = value;
    else if (step && key === 'dwell') step.dwell = Number(value);
    else if (step && key === 'abstract') step.abstract = Number(value);
    else if (step && key === 'overview') step.overview = Number(value);
    else if (step && key === 'pause') step.pause = Number(value);
  }
  return parsed;
}

// Split a Markdown answer into its prose and the first ```soma-tour block (or ~~~).
export function extractTourBlock(markdown) {
  const text = String(markdown ?? '');
  const match = text.match(/(```|~~~)[ \t]*soma-tour[ \t]*\r?\n([\s\S]*?)\1/i);
  if (!match) return { prose: text, block: null };
  return { prose: (text.slice(0, match.index) + text.slice(match.index + match[0].length)).trim(), block: match[2] };
}

function defaultDwell(say) {
  const words = String(say ?? '').split(/\s+/).filter(Boolean).length;
  return Math.min(20, Math.max(4, Math.round(words / 2.6) + 2));
}

// Turn a parsed block (or a preset id) into a runnable tour. Invalid steps are dropped
// and reported, never run.
export function resolveTour(parsed) {
  const dropped = [];
  const steps = [];
  let title = parsed.title ?? null;
  let id = null;
  if (parsed.tour) {
    const preset = PRESETS.get(parsed.tour);
    if (preset) {
      id = preset.id;
      title = title ?? preset.title;
      steps.push(...preset.steps.map(step => ({ ...step })));
    } else {
      dropped.push(`unknown preset ${parsed.tour}`);
    }
  }
  for (const step of parsed.steps ?? []) {
    const problems = [...viewProblems(step.view), ...stageProblems(step)];
    if (!step.say?.trim()) problems.push('no say line');
    if (problems.length) {
      dropped.push(`${step.view ?? '(no view)'}: ${problems.join(', ')}`);
      continue;
    }
    steps.push({ ...step });
  }
  for (const step of steps) {
    if (!EVIDENCE_LABELS.includes(step.label)) delete step.label;
    step.dwell = Number.isFinite(step.dwell) && step.dwell >= 2 && step.dwell <= 60 ? step.dwell : defaultDwell(step.say);
  }
  return { id, title: title ?? 'Tour', steps, dropped };
}

export const presetTour = id => resolveTour({ tour: id, steps: [] });

// TABS (ISS-110, author 16 Oct: "a panel with tabs, like a terminal with several tabs"): each
// stop of a tour is a tab, named by its place; the same panel is the route planner (+ HERE adds
// where you are to MY ROUTE) and the guide (the tours to choose from).
const PLACE_NAMES = { worlds: 'THE WORLDS', human: 'HUMAN', body: 'BODY', wayin: 'WAY IN', brain: 'BRAIN', limbic: 'LIMBIC', thought: 'THOUGHT', neuron: 'NEURON', network: 'MEMORY', landscape: 'LANDSCAPE', dyad: 'DYAD', tunnel: 'WAY UP', ureter: 'URETER', flight: 'FLY', score: 'SCORE' };
const HALL_NAMES = { brain: 'GREAT HALL', body: 'THE HEART', neuron: 'THE SOMA', thought: 'MIND CHAMBER' };
const LEVEL_LABEL = new Map(levels.map(l => [l.id, l.label]));
export function placeOf(view) {
  const p = new URLSearchParams(String(view ?? '').replace(/^#/, ''));
  const v = p.get('voyage');
  if (v) {
    if (p.get('hall') === '1' && HALL_NAMES[v]) return HALL_NAMES[v];
    if (v === 'brain' && p.get('cave') === '1') return 'CATHEDRAL';
    if (v === 'brain' && p.get('palace') === '1') return 'PALACE';
    if (v === 'thought' && p.get('choices') === '1') return 'THE COURSE';
    if (v === 'landscape' && p.get('golf') === '1') return 'MINI GOLF';
    return PLACE_NAMES[v] ?? v.toUpperCase();
  }
  const l = p.get('level');
  return l ? String(LEVEL_LABEL.get(l) ?? l).toUpperCase() : 'HERE';
}
const ROUTE_KEY = 'soma-route';
export function myRoute() { try { return JSON.parse(localStorage.getItem(ROUTE_KEY) || '[]'); } catch { return []; } }
function saveRoute(r) { try { localStorage.setItem(ROUTE_KEY, JSON.stringify(r.slice(0, 24))); } catch { /* private mode */ } globalThis.dispatchEvent?.(new CustomEvent('soma-route')); }
// where you are, as a tour view (the keys a tour may set)
function hereView() {
  const p = new URLSearchParams(location.hash.slice(1));
  const keep = new URLSearchParams();
  for (const [k, v] of p) if (TOUR_KEYS.has(k) && !viewProblems(`${k}=${v}`).length) keep.set(k, v);
  return keep.toString();
}

const LABEL_TEXT = {
  'kernel-verified': 'KERNEL-VERIFIED', 'derived-under-assumptions': 'DERIVED UNDER ASSUMPTIONS', simulated: 'SIMULATED',
  'empirical-result': 'EMPIRICAL RESULT', interpretive: 'INTERPRETIVE', 'open-hypothesis': 'OPEN HYPOTHESIS',
};

// voice: from voice.js. narration(): { speak: bool, persona, bridge } at the moment of speaking.
export function createTourPlayer({ voice, narration }) {
  const card = document.createElement('section');
  card.className = 'tour-card';
  card.hidden = true;
  card.setAttribute('role', 'region');
  card.setAttribute('aria-label', 'Soma tour');
  card.innerHTML = `
    <header><span class="tour-card__title"></span><span class="tour-card__count"></span></header>
    <nav class="tour-card__tabs" aria-label="Stops"></nav>
    <p class="tour-card__label"></p>
    <p class="tour-card__say"></p>
    <p class="tour-card__note" hidden></p>
    <nav class="tour-card__controls" aria-label="Tour controls">
      <button type="button" data-act="prev" aria-label="Previous stop">&#9664; PREV</button>
      <button type="button" data-act="auto" aria-label="Play or pause"></button>
      <button type="button" data-act="next" aria-label="Next stop">NEXT &#9654;</button>
      <button type="button" data-act="end" aria-label="End tour">END</button>
      <button type="button" data-act="sound" aria-label="Narration on or off"></button>
      <button type="button" data-act="here" title="Add where you are to MY ROUTE (the route planner)">+ HERE</button>
      <button type="button" data-act="guide" title="The tours, and MY ROUTE">TOURS ▾</button>
    </nav>
    <button type="button" class="tour-card__start" data-act="start" hidden>&#9654; START THE TOUR (with sound)</button>`;
  document.body.append(card);
  const stage = createPresentationStage();
  const titleEl = card.querySelector('.tour-card__title');
  const countEl = card.querySelector('.tour-card__count');
  const labelEl = card.querySelector('.tour-card__label');
  const sayEl = card.querySelector('.tour-card__say');
  const noteEl = card.querySelector('.tour-card__note');
  const autoButton = card.querySelector('[data-act="auto"]');
  const soundButton = card.querySelector('[data-act="sound"]');
  const startButton = card.querySelector('[data-act="start"]');
  const tabsEl = card.querySelector('.tour-card__tabs');
  function renderTabs() {
    if (!tour) { tabsEl.innerHTML = ''; return; }
    tabsEl.innerHTML = tour.steps.map((st, k) => `<button type="button" data-tab="${k}" class="${k === index ? 'active' : ''}" title="${(st.say ?? '').replace(/"/g, '&quot;').slice(0, 140)}"><i>${k + 1}</i> ${placeOf(st.view)}</button>`).join('');
    tabsEl.querySelector('.active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  // the guide: the tours, as a menu in the card (no tour running)
  function showGuide() {
    end(true);
    card.hidden = false;
    titleEl.textContent = 'THE GUIDE';
    countEl.textContent = '';
    labelEl.textContent = '';
    noteEl.hidden = true;
    const route = myRoute();
    const who = (() => { try { return localStorage.getItem('soma-who') || 'u'; } catch { return 'u'; } })();
    const welcome = who === 'scientist' ? 'welcome-scientist' : 'welcome-u';
    const isRooted = (() => { try { return localStorage.getItem('soma-rooted') === '1'; } catch { return false; } })();
    // the Root Monster's tour is ROOTED's (ISS-108)
    const ids = [welcome, ...presetIds().filter(id => !id.startsWith('welcome-') && (isRooted || id !== 'root-monster'))];
    tabsEl.innerHTML = '';
    sayEl.innerHTML = `<span class="tour-card__menu">${ids.map(id => `<button type="button" data-preset="${id}">${PRESETS.get(id)?.title ?? id}</button>`).join('')}<button type="button" data-preset="my-route" ${route.length ? '' : 'disabled'}>MY ROUTE (${route.length})</button>${route.length ? '<button type="button" data-act="clear-route">CLEAR MY ROUTE</button>' : ''}</span><small>+ HERE, on any tour or here, adds where you are to MY ROUTE.</small>${companionHtml()}`;
  }
  // your companion (registry/users.yaml, ISS-108): links where published, "coming" where not
  function companionHtml() {
    const c = companion();
    if (!c?.links?.length) return '';
    const esc = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    const items = c.links.map(l => l.url ? `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.title)}</a>` : `<span>${esc(l.title)} (coming)</span>`);
    return `<span class="tour-card__companion"><b>YOUR COMPANION: ${esc(c.companion).toUpperCase()}</b>${items.join('')}</span>`;
  }
  // Tours are narrated unless the visitor turns the sound off (kept in localStorage).
  let sound = (() => { try { return localStorage.getItem('tour-sound') !== 'off'; } catch { return true; } })();
  function syncSound() { soundButton.textContent = sound ? '🔊 SOUND' : '🔇 MUTED'; }
  syncSound();

  let tour = null;
  let index = 0;
  let auto = false;
  let token = 0;
  let timer = null;
  let veil = null;

  // the style in force at a step: the last `style:` at or before it (`none` clears it)
  function styleAt(k) {
    for (let i = k; i >= 0; i--) {
      const st = tour.steps[i].style;
      if (st !== undefined) return st === 'none' ? null : st;
    }
    return null;
  }

  function showView(view) {
    const params = new URLSearchParams(view);
    // A step without q leaves any open question card, so clear it explicitly.
    if (!params.has('q')) params.set('q', '');
    location.hash = params.toString();
  }

  function syncAuto() {
    autoButton.textContent = auto ? '❚❚ PAUSE' : '▶ PLAY';
  }

  async function go(next) {
    if (!tour) return;
    index = Math.max(0, Math.min(tour.steps.length - 1, next));
    const mine = ++token;
    clearTimeout(timer);
    voice.stop();
    const step = tour.steps[index];
    titleEl.textContent = tour.title;
    countEl.textContent = `${index + 1} / ${tour.steps.length}`;
    renderTabs();
    labelEl.textContent = step.label ? LABEL_TEXT[step.label] : '';
    labelEl.dataset.label = step.label ?? '';
    sayEl.textContent = step.say;
    // the jump into this step, declared or not, and the style in force: for the sound
    // (registry/transitions.yaml); a declared fade or wormhole is drawn by the veil
    const via = step.via ? parseVia(step.via) : null;
    dispatchEvent(new CustomEvent('soma-transition', { detail: { index, view: step.view, via: step.via ?? null, kind: via?.kind ?? null, seconds: via?.seconds ?? null, sync: via?.sync ?? null, style: styleAt(index) } }));
    if (step.via) {
      veil ??= createVeil();
      await veil.run(step.via, () => { if (mine === token) showView(step.view); });
      if (mine !== token) return;
    } else showView(step.view);
    stage.setOverlay(step.overlay ?? null);
    // Other windows (screens.js) show the line as a HUD.
    dispatchEvent(new CustomEvent('soma-tour-step', { detail: { title: tour.title, count: countEl.textContent, label: step.label ?? '', labelText: step.label ? LABEL_TEXT[step.label] : '', say: step.say } }));
    stage.setAbstract(Number.isInteger(step.abstract) ? step.abstract : null);
    stage.setOverview(step.overview === 1);
    (POKES[step.poke] ?? []).forEach((strength, number) => {
      setTimeout(() => {
        if (mine === token) dispatchEvent(new CustomEvent('soma-tour-poke', { detail: { strength } }));
      }, 1800 + number * 2000);
    });
    const settings = narration();
    // a step may name its own voice (voice: munch); otherwise the narrator's
    if (sound || settings.speak) await voice.speak(step.say, step.voice ?? settings.persona, step.voice ? '' : settings.bridge);
    if (mine !== token || !auto) return;
    if (index >= tour.steps.length - 1) {
      auto = false;
      syncAuto();
      return;
    }
    // pause: extra seconds to hold the view after the line (presentations).
    const wait = (sound || settings.speak ? 1200 : step.dwell * 1000) + (step.pause ?? 0) * 1000;
    timer = setTimeout(() => { if (mine === token && auto) go(index + 1); }, wait);
  }

  function end(keepOpen = false) {
    token += 1;
    clearTimeout(timer);
    voice.stop();
    stage.clear();
    tour = null;
    renderTabs();
    card.hidden = !keepOpen;
    document.body.classList.remove('tour-active');
    dispatchEvent(new CustomEvent('soma-tour-end'));
  }

  card.addEventListener('click', event => {
    const b = event.target.closest('button');
    if (b?.dataset.tab) { go(Number(b.dataset.tab)); return; }
    if (b?.dataset.preset) {
      if (b.dataset.preset === 'my-route') play(resolveTour({ title: 'My route', steps: myRoute() }), { autoplay: false });
      else play(presetTour(b.dataset.preset), { autoplay: false });
      return;
    }
    const act = b?.dataset.act;
    if (act === 'guide') { showGuide(); return; }
    if (act === 'clear-route') { saveRoute([]); showGuide(); return; }
    if (act === 'here') {
      const view = hereView();
      if (!view) return;
      const r = myRoute();
      r.push({ view, say: `A stop on my route: ${placeOf(view).toLowerCase()}.` });
      saveRoute(r);
      b.textContent = `+ HERE ✓ (${r.length})`;
      setTimeout(() => { b.textContent = '+ HERE'; }, 1600);
      if (!tour) showGuide();
      return;
    }
    if (act === 'prev') go(index - 1);
    if (act === 'next') go(index + 1);
    if (act === 'end') end();
    if (act === 'sound') {
      sound = !sound;
      try { localStorage.setItem('tour-sound', sound ? 'on' : 'off'); } catch { /* private mode */ }
      syncSound();
      if (!sound) voice.stop();
    }
    if (act === 'start') {
      // The click is the user gesture Chrome needs before it lets the page speak.
      startButton.hidden = true;
      voice.unlock?.();
      auto = true;
      syncAuto();
      go(index);
    }
    if (act === 'auto') {
      auto = !auto;
      syncAuto();
      if (auto) go(index);
      else { token += 1; clearTimeout(timer); voice.stop(); }
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && tour) end();
  });

  function play(resolved, { autoplay = true, start = 0 } = {}) {
    // A tour is an explicit request to look, so step past the opening splash (its own Enter logic).
    const splash = document.querySelector('#abstract-splash');
    if (splash && !splash.hidden) document.querySelector('#abstract-splash-enter')?.click();
    if (!resolved?.steps?.length) {
      tour = null;
      card.hidden = false;
      titleEl.textContent = resolved?.title ?? 'Tour';
      countEl.textContent = '0 / 0';
      labelEl.textContent = '';
      sayEl.textContent = 'This tour has no valid stops.';
      noteEl.hidden = !resolved?.dropped?.length;
      noteEl.textContent = resolved?.dropped?.length ? `Skipped: ${resolved.dropped.join('; ')}` : '';
      return false;
    }
    tour = resolved;
    document.body.classList.add('tour-active');
    // Browsers refuse speech before the first click or key on the page: a narrated tour
    // opened from a link waits at its first stop behind one START button.
    const blocked = sound && autoplay && navigator.userActivation && !navigator.userActivation.hasBeenActive;
    auto = autoplay && !blocked;
    syncAuto();
    card.hidden = false;
    startButton.hidden = !blocked;
    noteEl.hidden = !resolved.dropped.length;
    noteEl.textContent = resolved.dropped.length ? `Skipped ${resolved.dropped.length} invalid stop(s): ${resolved.dropped.join('; ')}` : '';
    if (blocked) {
      index = start;
      const step = resolved.steps[start];
      titleEl.textContent = resolved.title;
      countEl.textContent = `${start + 1} / ${resolved.steps.length}`;
      sayEl.textContent = step.say;
      showView(step.view);
    } else go(start);
    return true;
  }

  // #tour=<preset>[&stop=<n>] starts a preset (stop counts from 1).
  function fromHash(hash = INITIAL_HASH) {
    const params = new URLSearchParams(String(hash).replace(/^#/, ''));
    const id = params.get('tour');
    if (!id) return;
    const stop = Math.max(1, Number(params.get('stop')) || 1);
    // A bare #tour=<id> plays through; #tour=<id>&stop=<n> opens that stop and waits (add play=1 to run on).
    play(presetTour(id), { autoplay: params.get('play') === '1' || !params.has('stop'), start: stop - 1 });
  }
  // main.js normalises the hash in its own hashchange handler, so read the URL the event carried.
  addEventListener('hashchange', event => fromHash(new URL(event.newURL).hash));

  return { play, end, fromHash, guide: showGuide, get active() { return Boolean(tour); } };
}
