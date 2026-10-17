// elevator.js: the zoom as a lift (ISS-052). The levels of the current model are the
// floors, smallest at the bottom; the car rides the app's own zoom (state.visualScale),
// so the ride is the level view's animation, not a copy. Each floor shows its length
// scale, the dimension layers it has (4/8/11) and its claim badges (physical, field,
// mind: SOURCED or INTERPRETIVE). Floors with a close-up in the mind-body explorer have
// STEP OUT; the explorer's STEP BACK IN returns here. Above the shaft the law that does
// not change between floors, (∇² + k²) G = δ, and the floor's carrier field.
// Three elevators, one per axis of the field (ISS-101): SCALE (the zoom, above), DIMENSION (D1 to
// D11 in the model's bands, P20 and P14: spacetime D1-4, the propagator space D5-7, the limbic
// hinge D8, the cortical mind field D9-11; the limbic view is its picture) and FREQUENCY (the
// brain's rhythms by EEG band, sourced; which of the model's types a band carries is a model gap,
// labelled). Under the bands, the RADIO (ISS-095): tune any frequency, entrainment; ROOTED's,
// greyed n/a for everyone else.

import { BANDS } from './explorer.js';
import { rooted } from './who.js';

const ROW = 28;
// the dimension floors, top first: d, the band, its layer button (4/8/11) and where it opens
const DIM_FLOORS = [
  { d: 11, band: 'MIND · cortical field (D9-11)', dim: 11, stop: 'thought' },
  { d: 10, band: 'MIND · cortical field (D9-11)', dim: 11, stop: 'thought' },
  { d: 9, band: 'MIND · cortical field (D9-11)', dim: 11, stop: 'thought' },
  { d: 8, band: 'THE LIMBIC HINGE (D8)', dim: 8, stop: 'limbic' },
  { d: 7, band: 'propagator space (D5-7)', dim: 8, stop: 'body' },
  { d: 6, band: 'propagator space (D5-7)', dim: 8, stop: 'body' },
  { d: 5, band: 'propagator space (D5-7)', dim: 8, stop: 'body' },
  { d: 4, band: 'spacetime: time (D1-4)', dim: 4, stop: 'body' },
  { d: 3, band: 'spacetime: space (D1-4)', dim: 4, stop: 'body' },
  { d: 2, band: 'spacetime: space (D1-4)', dim: 4, stop: 'body' },
  { d: 1, band: 'spacetime: space (D1-4)', dim: 4, stop: 'body' },
];
export const DIMENSION_FLOORS = DIM_FLOORS;
const CLAIM_KEYS = [['physical', 'P'], ['field', 'F'], ['mind', 'M']];

function escapeHtml(text) {
  return String(text ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
}

const fmt = v => (Number.isInteger(v) ? String(v) : v.toFixed(1));
const scaleText = exponent => (exponent === null || exponent === undefined ? '' : `10^${fmt(exponent)} m`);

// hooks: { onFloor(index), onStepOut(stop), onFly(index) }
export function createElevator(hooks = {}) {
  const element = document.createElement('section');
  element.className = 'elevator';
  element.setAttribute('aria-label', 'Elevator: the zoom as floors');
  element.innerHTML = `
    <nav class="elevator__axes" role="tablist" aria-label="Three elevators">
      <button type="button" data-axis="scale" class="active" title="SCALE: the zoom, a cell to the cosmos">SCALE</button>
      <button type="button" data-axis="dimension" title="DIMENSION: D1 to D11, the model's bands (P20); the limbic hinge is D8">DIMENSION</button>
      <button type="button" data-axis="frequency" title="FREQUENCY: the brain's rhythms by EEG band (sourced); the RADIO is ROOTED's">FREQUENCY</button>
    </nav>
    <div class="elevator__axis" data-panel="dimension" hidden>
      <p class="elevator__note">The model's eleven dimensions in three bands (P20; the limbic hinge, P14): D1-4 spacetime, physically real; D5-7 the propagator space; D8 the limbic hinge; D9-11 the cortical mind field. A type correspondence, not physical M-theory (derived under assumptions). A floor opens its picture at its layer.</p>
      <ol class="elevator__dims">${DIM_FLOORS.map(f => `<li><button type="button" data-dfloor="${f.d}" class="${f.d === 8 ? 'is-hinge' : ''}"><b>D${f.d}</b> <span>${f.band}</span></button></li>`).join('')}</ol>
    </div>
    <div class="elevator__axis" data-panel="frequency" hidden>
      <p class="elevator__note">The brain's rhythms at the whole-brain level, as EEG measures them (sourced: the standard bands, Buzsaki and Draguhn 2004). Drawn 20x slower than real. Which of the model's types a band carries no paper says yet: a model gap (interpretive).</p>
      <ol class="elevator__bands">${BANDS.slice().reverse().map(b => `<li><button type="button" data-band="${b.id}" style="--band:${b.color}"><b>${b.id.toUpperCase()}</b> <span>${b.lo}-${b.hi} Hz · ${b.say}</span></button></li>`).join('')}</ol>
      <fieldset class="elevator__radio" disabled>
        <legend>RADIO · entrainment <i class="elevator__na">n/a · ROOTED</i></legend>
        <input type="range" min="-0.3" max="2" step="0.01" value="0.368" data-radio aria-label="Tune, 0.5 to 100 Hz">
        <output data-radio-out>2.33 Hz</output>
        <button type="button" data-radio-preset="2.3333">140 BPM</button>
        <small>Experimental: a rhythm to entrain with (Arnold tongues; the trance and freeze flip of the chats), not a reading of the brain.</small>
      </fieldset>
    </div>
    <header class="elevator__hud" data-panel="scale">
      <div class="elevator__law" title="The same law on every floor; only the substrate and the boundary change">(∇² + k²) G = δ</div>
      <div class="elevator__readout" aria-live="polite"></div>
      <div class="elevator__field"></div>
    </header>
    <div class="elevator__shaft" data-panel="scale">
      <div class="elevator__car" aria-hidden="true"></div>
      <ol class="elevator__floors"></ol>
    </div>`;
  const floorsEl = element.querySelector('.elevator__floors');
  const car = element.querySelector('.elevator__car');
  const readout = element.querySelector('.elevator__readout');
  const fieldEl = element.querySelector('.elevator__field');
  const radio = element.querySelector('.elevator__radio');
  const radioIn = element.querySelector('[data-radio]');
  const radioOut = element.querySelector('[data-radio-out]');
  let axis = 'scale';
  function showAxis(next) {
    axis = next;
    for (const b of element.querySelectorAll('[data-axis]')) b.classList.toggle('active', b.dataset.axis === axis);
    for (const el of element.querySelectorAll('[data-panel]')) el.hidden = el.dataset.panel !== axis;
    syncRadio();
  }
  // the radio is ROOTED's: greyed n/a for everyone else (a tease, ISS-095)
  function syncRadio() {
    const on = rooted();
    radio.disabled = !on;
    radio.querySelector('.elevator__na').hidden = on;
  }
  addEventListener('soma-who', syncRadio);
  const hzOf = v => 10 ** Number(v);
  radioIn.addEventListener('input', () => { radioOut.textContent = `${hzOf(radioIn.value).toFixed(2)} Hz`; });
  radioIn.addEventListener('change', () => hooks.onRadio?.(hzOf(radioIn.value)));
  let floors = [];
  let key = '';
  let lastTop = -1;
  let lastText = '';
  let lastCurrent = '';

  function setFloors(list) {
    const next = list.map(f => `${f.id}:${f.dims[8] ? 1 : 0}${f.dims[11] ? 1 : 0}:${f.stop ?? ''}`).join('|');
    if (next === key) return;
    key = next;
    floors = list;
    lastTop = -1;
    lastCurrent = '';
    floorsEl.style.height = `${floors.length * ROW}px`;
    floorsEl.innerHTML = floors.map((f, i) => `
      <li class="elevator__floor" data-floor="${i}" style="top:${(floors.length - 1 - i) * ROW}px" title="${escapeHtml(f.label)}: ${escapeHtml(f.field)}">
        <span class="elevator__scale">${escapeHtml(scaleText(f.exponent))}</span>
        <span class="elevator__name">${escapeHtml(f.label)}</span>
        <span class="elevator__lamps"><b class="on">4</b><b class="${f.dims[8] ? 'on' : ''}">8</b><b class="${f.dims[11] ? 'on' : ''}">11</b></span>
        <span class="elevator__claims">${CLAIM_KEYS.map(([k, letter]) => `<i data-claim="${escapeHtml(f.claims?.[k] ?? '')}" title="${k}: ${escapeHtml(f.claims?.[k] ?? 'n/a')}">${letter}</i>`).join('')}</span>
        ${f.stop ? `<button type="button" class="elevator__step" data-step="${escapeHtml(f.stop)}" title="Step out into the mind-body explorer here">OUT ▸</button>` : ''}
        <button type="button" class="elevator__step elevator__fly" data-fly="${i}" title="Fly through this level's world">FLY ▸</button>
        ${f.id === 'compact-object' ? '<button type="button" class="elevator__step" data-wormhole="1" title="A Morris-Thorne wormhole: an exact solution of general relativity, ray-traced (none observed)">WORMHOLE ▸</button>' : ''}
      </li>`).join('');
  }

  element.addEventListener('click', event => {
    const ax = event.target.closest('[data-axis]');
    if (ax) { showAxis(ax.dataset.axis); return; }
    const df = event.target.closest('[data-dfloor]');
    if (df) {
      const f = DIM_FLOORS.find(x => x.d === Number(df.dataset.dfloor));
      for (const b of element.querySelectorAll('[data-dfloor]')) b.classList.toggle('is-current', b === df);
      hooks.onDimension?.(f);
      return;
    }
    const band = event.target.closest('[data-band]');
    if (band) {
      for (const b of element.querySelectorAll('[data-band]')) b.classList.toggle('is-current', b === band);
      hooks.onBand?.(band.dataset.band);
      return;
    }
    const preset = event.target.closest('[data-radio-preset]');
    if (preset && rooted()) {
      const hz = Number(preset.dataset.radioPreset);
      radioIn.value = String(Math.log10(hz));
      radioOut.textContent = `${hz.toFixed(2)} Hz`;
      hooks.onRadio?.(hz);
      return;
    }
    if (event.target.closest('[data-wormhole]')) { event.stopPropagation(); hooks.onWormhole?.(); return; }
    const fly = event.target.closest('[data-fly]');
    if (fly) {
      event.stopPropagation();
      hooks.onFly?.(Number(fly.dataset.fly));
      return;
    }
    const step = event.target.closest('[data-step]');
    if (step) {
      event.stopPropagation();
      hooks.onStepOut?.(step.dataset.step);
      return;
    }
    const floor = event.target.closest('[data-floor]');
    if (floor) hooks.onFloor?.(Number(floor.dataset.floor));
  });

  // carIndex: continuous floor position of the car; currentId: the floor it is heading for
  function update({ carIndex, currentId, moving }) {
    if (!floors.length) return;
    const top = Math.round((floors.length - 1 - carIndex) * ROW);
    if (top !== lastTop) {
      lastTop = top;
      car.style.transform = `translateY(${top}px)`;
    }
    if (currentId !== lastCurrent) {
      lastCurrent = currentId;
      for (const li of floorsEl.children) li.classList.toggle('is-current', floors[Number(li.dataset.floor)]?.id === currentId);
    }
    const target = floors.find(f => f.id === currentId);
    const near = floors[Math.max(0, Math.min(floors.length - 1, Math.round(carIndex)))];
    let text = `FLOOR ${floors.indexOf(target) + 1} / ${floors.length} · ${target?.label ?? ''} · ℓ ≈ ${scaleText(target?.exponent)}${target?.tau ? ` · τ ≈ ${target.tau}` : ''}`;
    if (moving && target && near && target.exponent !== null && near.exponent !== null && target.id !== near.id) {
      const d = target.exponent - near.exponent;
      text = `RIDING ${d >= 0 ? 'UP' : 'DOWN'} · scale ×10^${fmt(d)} · k ×10^${fmt(-d)} · ${near.label} → ${target.label}`;
    }
    if (text !== lastText) {
      lastText = text;
      readout.textContent = text;
      // the carrier field retypes as the car passes the floors (H-AL): the one it is passing,
      // then the one it is riding to
      fieldEl.textContent = !target ? '' : moving && near && near.id !== target.id
        ? `carrier field: ${near.field ?? ''} → ${target.field ?? ''}`
        : `carrier field: ${target.field ?? ''}`;
    }
  }

  syncRadio();
  return { element, setFloors, update, showAxis, get axis() { return axis; } };
}
