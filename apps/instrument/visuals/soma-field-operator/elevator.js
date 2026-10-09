// elevator.js: the zoom as a lift (ISS-052). The levels of the current model are the
// floors, smallest at the bottom; the car rides the app's own zoom (state.visualScale),
// so the ride is the level view's animation, not a copy. Each floor shows its length
// scale, the dimension layers it has (4/8/11) and its claim badges (physical, field,
// mind: SOURCED or INTERPRETIVE). Floors with a close-up in the mind-body explorer have
// STEP OUT; the explorer's STEP BACK IN returns here. Above the shaft the law that does
// not change between floors, (∇² + k²) G = δ, and the floor's carrier field.

const ROW = 28;
const CLAIM_KEYS = [['physical', 'P'], ['field', 'F'], ['mind', 'M']];

function escapeHtml(text) {
  return String(text ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
}

const fmt = v => (Number.isInteger(v) ? String(v) : v.toFixed(1));
const scaleText = exponent => (exponent === null || exponent === undefined ? '' : `10^${fmt(exponent)} m`);

// hooks: { onFloor(index), onStepOut(stop) }
export function createElevator(hooks = {}) {
  const element = document.createElement('section');
  element.className = 'elevator';
  element.setAttribute('aria-label', 'Elevator: the zoom as floors');
  element.innerHTML = `
    <header class="elevator__hud">
      <div class="elevator__law" title="The same law on every floor; only the substrate and the boundary change">(∇² + k²) G = δ</div>
      <div class="elevator__readout" aria-live="polite"></div>
      <div class="elevator__field"></div>
    </header>
    <div class="elevator__shaft">
      <div class="elevator__car" aria-hidden="true"></div>
      <ol class="elevator__floors"></ol>
    </div>`;
  const floorsEl = element.querySelector('.elevator__floors');
  const car = element.querySelector('.elevator__car');
  const readout = element.querySelector('.elevator__readout');
  const fieldEl = element.querySelector('.elevator__field');
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
        ${f.stop ? `<button type="button" class="elevator__step" data-step="${escapeHtml(f.stop)}" title="Step out into the mind-body explorer here">STEP OUT ▸</button>` : ''}
      </li>`).join('');
  }

  element.addEventListener('click', event => {
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
    let text = `FLOOR ${floors.indexOf(target) + 1} / ${floors.length} · ${target?.label ?? ''} · ℓ ≈ ${scaleText(target?.exponent)}`;
    if (moving && target && near && target.exponent !== null && near.exponent !== null && target.id !== near.id) {
      const d = target.exponent - near.exponent;
      text = `RIDING ${d >= 0 ? 'UP' : 'DOWN'} · scale ×10^${fmt(d)} · k ×10^${fmt(-d)} · ${near.label} → ${target.label}`;
    }
    if (text !== lastText) {
      lastText = text;
      readout.textContent = text;
      fieldEl.textContent = target ? `carrier field: ${target.field ?? ''}` : '';
    }
  }

  return { element, setFloors, update };
}
