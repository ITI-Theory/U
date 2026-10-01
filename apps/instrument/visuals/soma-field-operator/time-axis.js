const BAND_DEFS = [
  { id: 'cosmic', label: 'COSMIC', share: 0.25 },
  { id: 'geological', label: 'EARTH', share: 0.15 },
  { id: 'palaeontology', label: 'LIFE', share: 0.20 },
  { id: 'human', label: 'HUMAN', share: 0.15 },
  { id: 'philosophy', label: 'PHILOSOPHY', share: 0.25 },
];

const BAND_LABELS = Object.fromEntries(BAND_DEFS.map(band => [band.id, band.label]));

const BAND_COLORS = {
  cosmic: '#14e5ff',
  geological: '#f6c75a',
  palaeontology: '#56f0a2',
  human: '#ff3bce',
  philosophy: '#8f47ff',
};

function buildTimeline(ordered) {
  const byBand = new Map(BAND_DEFS.map(band => [band.id, []]));
  for (const era of ordered) {
    if (byBand.has(era.band)) byBand.get(era.band).push(era);
  }
  const positions = new Map();
  const segments = [];
  let offset = 0;
  for (const band of BAND_DEFS) {
    const bandEras = byBand.get(band.id) ?? [];
    segments.push({ ...band, start: offset, end: offset + band.share, eras: bandEras });
    const count = bandEras.length;
    for (let index = 0; index < count; index += 1) {
      const local = count === 1 ? 0.5 : index / (count - 1);
      positions.set(bandEras[index].id, offset + local * band.share);
    }
    offset += band.share;
  }
  return { positions, segments };
}

function positionOf(era, positions) {
  return positions.get(era?.id) ?? 0;
}

function nearestEra(eras, value, positions) {
  const normalized = value / 100;
  return eras.reduce((best, era) => (
    Math.abs(positionOf(era, positions) - normalized) < Math.abs(positionOf(best, positions) - normalized) ? era : best
  ), eras[0]);
}

function injectTimeAxisStyles() {
  if (document.querySelector('#time-axis-styles')) return;
  const style = document.createElement('style');
  style.id = 'time-axis-styles';
  style.textContent = `
    .time-axis { margin: 12px 0; padding: 10px; border: 1px solid rgba(246,199,90,.52); background: rgba(246,199,90,.055); }
    .time-axis__head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 7px; }
    .time-axis__title { margin: 0; color: var(--gold); font: 700 8px/1.2 'Space Mono', monospace; }
    .time-axis__play { width: auto; min-width: 58px; margin: 0; padding: 5px 7px; color: var(--ink); background: var(--gold); font-size: 8px; }
    .time-axis__play.active { background: var(--pink); box-shadow: 0 0 18px rgba(255,59,206,.36); }
    .time-axis__clear { width: auto; margin: 0; padding: 5px 7px; color: var(--text); border: 1px solid rgba(234,245,255,.24); background: rgba(234,245,255,.06); font-size: 8px; }
    .time-axis input { width: 100%; }
    .time-axis__ticks { position: relative; height: 11px; margin-top: 2px; }
    .time-axis__tick { position: absolute; top: 1px; width: 2px; height: 7px; transform: translateX(-50%); border-radius: 999px; background: currentColor; opacity: .76; }
    .time-axis__tick.active { top: 0; height: 11px; opacity: 1; box-shadow: 0 0 8px currentColor; }
    .time-axis__bands { display: flex; height: 18px; margin-top: 3px; overflow: hidden; border: 1px solid rgba(234,245,255,.14); }
    .time-axis__band { display: flex; align-items: center; justify-content: center; min-width: 0; color: var(--ink); font: 700 6px/1 'Space Mono', monospace; text-align: center; }
    .time-axis__hover { min-height: 11px; margin: 4px 0 0; color: var(--gold); font: 700 7px/1.2 'Space Mono', monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .time-axis__card { margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(246,199,90,.24); }
    .time-axis__meta, .time-axis__summary, .time-axis__level { margin: 0; color: #d7e8f6; font: 7px/1.35 'Space Mono', monospace; }
    .time-axis__meta { color: var(--gold); text-transform: uppercase; }
    .time-axis__label { margin: 4px 0 5px; color: var(--text); font: 800 13px/1.1 'Syne', sans-serif; }
    .time-axis__summary { margin-top: 5px; }
    .time-axis__equation { margin: 6px 0 0; overflow-x: auto; color: var(--cyan); font-size: 10px; }
    .time-axis__empty { margin: 0; color: #aeb8ce; font: 7px/1.35 'Space Mono', monospace; }
  `;
  document.head.append(style);
}

export function createTimeAxis({ eras, levelsById, state, onSelect }) {
  const ordered = [...(eras ?? [])].sort((a, b) => Number(a.time?.seconds_after_big_bang) - Number(b.time?.seconds_after_big_bang));
  if (!ordered.length) return null;
  injectTimeAxisStyles();

  const { positions, segments } = buildTimeline(ordered);
  let selectedId = state.eraId ?? null;
  let playTimer = 0;
  const ticksById = new Map();

  const host = document.querySelector('#scale-readout');
  const panel = document.createElement('section');
  panel.className = 'time-axis';
  panel.setAttribute('aria-label', 'Time / era control');
  panel.innerHTML = `
    <div class="time-axis__head">
      <p class="time-axis__title">TIME / ERA</p>
      <button class="time-axis__play" type="button">PLAY</button>
      <button class="time-axis__clear" type="button">CLEAR</button>
    </div>
    <input id="time-era-slider" type="range" min="0" max="100" step="0.01" autocomplete="off" aria-label="Time / era">
    <div class="time-axis__ticks" aria-hidden="true"></div>
    <div class="time-axis__bands" aria-hidden="true"></div>
    <p class="time-axis__hover">DRAG TO SELECT ERA</p>
    <article id="time-axis-card" class="time-axis__card" aria-live="polite"></article>
  `;
  host.insertAdjacentElement('afterend', panel);

  const slider = panel.querySelector('#time-era-slider');
  const ticks = panel.querySelector('.time-axis__ticks');
  const bands = panel.querySelector('.time-axis__bands');
  const hover = panel.querySelector('.time-axis__hover');
  const card = panel.querySelector('#time-axis-card');
  const play = panel.querySelector('.time-axis__play');
  const clear = panel.querySelector('.time-axis__clear');

  for (const segment of segments) {
    const bandLabel = document.createElement('span');
    bandLabel.className = 'time-axis__band';
    bandLabel.style.flex = `${segment.share} 0 ${segment.share * 100}%`;
    bandLabel.style.background = BAND_COLORS[segment.id] ?? '#eaf5ff';
    bandLabel.textContent = segment.label;
    bands.append(bandLabel);
  }
  for (const era of ordered) {
    const tick = document.createElement('span');
    tick.className = 'time-axis__tick';
    tick.style.left = `${positionOf(era, positions) * 100}%`;
    tick.style.color = BAND_COLORS[era.band] ?? '#eaf5ff';
    tick.title = `${era.label} / ${era.time?.display ?? ''}`;
    ticks.append(tick);
    ticksById.set(era.id, tick);
  }

  function setHover(era) {
    hover.textContent = era ? `${era.time?.display ?? ''} — ${era.label}` : 'DRAG TO SELECT ERA';
  }

  function updateTicks(era) {
    for (const [id, tick] of ticksById) tick.classList.toggle('active', id === era?.id);
  }

  function previewFromPointer(event) {
    const rect = slider.getBoundingClientRect();
    const value = ((event.clientX - rect.left) / rect.width) * 100;
    setHover(nearestEra(ordered, Math.max(0, Math.min(100, value)), positions));
  }

  function stopPlay() {
    if (playTimer) clearInterval(playTimer);
    playTimer = 0;
    play.classList.remove('active');
    play.textContent = 'PLAY';
  }

  function render(era) {
    if (!era) {
      slider.value = '100';
      card.innerHTML = '<p class="time-axis__empty">NO ERA SELECTED / CURRENT VIEW UNCHANGED</p>';
      updateTicks(null);
      setHover(null);
      return;
    }
    slider.value = String(positionOf(era, positions) * 100);
    updateTicks(era);
    setHover(era);
    const level = levelsById.get(era.level);
    const badgeClass = String(era.badge ?? '').toLowerCase();
    card.replaceChildren();
    const badge = document.createElement('p');
    badge.className = `claim-badge ${badgeClass}`;
    badge.textContent = era.badge ?? 'INTERPRETIVE';
    const meta = document.createElement('p');
    meta.className = 'time-axis__meta';
    meta.textContent = `${era.time?.display ?? ''} / ${BAND_LABELS[era.band] ?? era.band}`;
    const title = document.createElement('h2');
    title.className = 'time-axis__label';
    title.textContent = era.label;
    const levelLine = document.createElement('p');
    levelLine.className = 'time-axis__level';
    levelLine.textContent = `LEVEL / ${level?.label ?? era.level}`;
    const summary = document.createElement('p');
    summary.className = 'time-axis__summary';
    summary.textContent = era.summary;
    card.append(badge, meta, title, levelLine, summary);
    if (era.equation) {
      const equation = document.createElement('div');
      equation.className = 'time-axis__equation';
      if (globalThis.katex) globalThis.katex.render(era.equation, equation, { displayMode: false, throwOnError: false });
      else equation.textContent = era.equation;
      card.append(equation);
    }
  }

  function select(era, options = {}) {
    selectedId = era?.id ?? null;
    render(era ?? null);
    onSelect?.(era ?? null, options);
  }

  slider.addEventListener('input', () => {
    stopPlay();
    select(nearestEra(ordered, Number(slider.value), positions), { source: 'slider' });
  });
  slider.addEventListener('pointermove', previewFromPointer);
  slider.addEventListener('focus', () => setHover(ordered.find(era => era.id === selectedId) ?? null));
  slider.addEventListener('mouseleave', () => setHover(ordered.find(era => era.id === selectedId) ?? null));
  play.addEventListener('click', () => {
    if (playTimer) {
      stopPlay();
      return;
    }
    play.classList.add('active');
    play.textContent = 'STOP';
    const start = Math.max(0, ordered.findIndex(era => era.id === selectedId));
    let index = start < 0 ? 0 : start;
    select(ordered[index], { source: 'play' });
    playTimer = setInterval(() => {
      index += 1;
      if (index >= ordered.length) {
        stopPlay();
        return;
      }
      select(ordered[index], { source: 'play' });
    }, 2200);
  });
  clear.addEventListener('click', () => {
    stopPlay();
    select(null, { source: 'clear' });
  });

  document.addEventListener('pointerdown', event => {
    if (playTimer && !panel.contains(event.target)) stopPlay();
  }, true);
  document.addEventListener('keydown', event => {
    if (playTimer && !panel.contains(event.target)) stopPlay();
  }, true);
  document.addEventListener('input', event => {
    if (playTimer && !panel.contains(event.target)) stopPlay();
  }, true);

  render(ordered.find(era => era.id === selectedId) ?? null);
  return {
    setSelected(id) {
      selectedId = id ?? null;
      render(ordered.find(era => era.id === selectedId) ?? null);
    },
    stopPlay,
  };
}
