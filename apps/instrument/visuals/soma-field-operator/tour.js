// soma-tour: a tiny tour language for the Soma Machine (spec: docs/TOUR-LANGUAGE.md).
// A tour is a list of steps; each step sets a view (a hash fragment), says a line,
// and dwells. Presets live in registry/tours. Every step is checked against the
// app's real ids before it runs; unknown steps are dropped, and nothing in a tour
// is ever executed as code.

import { eras, levels, models, paths, questions, tours } from './generated/app-data.js';

export const EVIDENCE_LABELS = ['kernel-verified', 'derived-under-assumptions', 'simulated', 'empirical-result', 'interpretive', 'open-hypothesis'];
const TOUR_KEYS = new Set(['level', 'path', 'lens', 'dim', 'model', 'reader', 'era', 'compare', 'contours', 'q', 'labels']);
const FIXED = {
  lens: ['on', 'off'], dim: ['4', '8', '11'], reader: ['cookie', 'general', 'specialist'],
  compare: ['0', '1'], contours: ['0', '1'], labels: ['on', 'off'],
};
const IDS = {
  level: new Set(levels.map(item => item.id)),
  path: new Set(paths.map(item => item.id)),
  model: new Set(models.map(item => item.id)),
  era: new Set(eras.map(item => item.id)),
  q: new Set(questions.map(item => item.id)),
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
    else if (IDS[key] && !IDS[key].has(value)) problems.push(`unknown ${key} ${value}`);
  }
  return problems;
}

function unquote(value) {
  const text = value.trim();
  return /^(["']).*\1$/.test(text) ? text.slice(1, -1) : text;
}

// Parse the restricted block: `tour: <preset>`, `title: ...`, then steps starting with
// `- view: ...` followed by `say:`, `dwell:` and `label:` lines. Anything else is ignored.
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
    else if (step && ['view', 'say', 'label'].includes(key)) step[key] = value;
    else if (step && key === 'dwell') step.dwell = Number(value);
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
    const problems = viewProblems(step.view);
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
    <p class="tour-card__label"></p>
    <p class="tour-card__say"></p>
    <p class="tour-card__note" hidden></p>
    <nav class="tour-card__controls" aria-label="Tour controls">
      <button type="button" data-act="prev" aria-label="Previous stop">&#9664; PREV</button>
      <button type="button" data-act="auto" aria-label="Play or pause"></button>
      <button type="button" data-act="next" aria-label="Next stop">NEXT &#9654;</button>
      <button type="button" data-act="end" aria-label="End tour">END</button>
    </nav>`;
  document.body.append(card);
  const titleEl = card.querySelector('.tour-card__title');
  const countEl = card.querySelector('.tour-card__count');
  const labelEl = card.querySelector('.tour-card__label');
  const sayEl = card.querySelector('.tour-card__say');
  const noteEl = card.querySelector('.tour-card__note');
  const autoButton = card.querySelector('[data-act="auto"]');

  let tour = null;
  let index = 0;
  let auto = false;
  let token = 0;
  let timer = null;

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
    labelEl.textContent = step.label ? LABEL_TEXT[step.label] : '';
    labelEl.dataset.label = step.label ?? '';
    sayEl.textContent = step.say;
    showView(step.view);
    const settings = narration();
    if (settings.speak) await voice.speak(step.say, settings.persona, settings.bridge);
    if (mine !== token || !auto) return;
    if (index >= tour.steps.length - 1) {
      auto = false;
      syncAuto();
      return;
    }
    const wait = settings.speak ? 1200 : step.dwell * 1000;
    timer = setTimeout(() => { if (mine === token && auto) go(index + 1); }, wait);
  }

  function end() {
    token += 1;
    clearTimeout(timer);
    voice.stop();
    tour = null;
    card.hidden = true;
  }

  card.addEventListener('click', event => {
    const act = event.target.closest('button')?.dataset.act;
    if (act === 'prev') go(index - 1);
    if (act === 'next') go(index + 1);
    if (act === 'end') end();
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
    auto = autoplay;
    syncAuto();
    card.hidden = false;
    noteEl.hidden = !resolved.dropped.length;
    noteEl.textContent = resolved.dropped.length ? `Skipped ${resolved.dropped.length} invalid stop(s): ${resolved.dropped.join('; ')}` : '';
    go(start);
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

  return { play, end, fromHash, get active() { return Boolean(tour); } };
}
