// deck.js: the remix deck (ISS-118; the author, 19 Oct: "NI's remix approach, 4 x 4 ... the key is a drop-down
// box to pick the underlying MIDI, directly or not"). Four slots (lead, harmony, bass, texture), each a drop-down
// of the loaded pack's MIDI sources; four levels (calm, moving, tense, peak) that launch Live's scenes. A pick
// goes through MOTHER's bridge to the author's private deck (Me/music/deck.py), which rebuilds the clips and
// loads them into Live. Only on the author's machine: elsewhere the panel says the deck is not here.

function bridge() {
  try { return (localStorage.getItem('mother-bridge-url') || 'http://127.0.0.1:8765').replace(/\/$/, ''); } catch { return 'http://127.0.0.1:8765'; }
}
async function call(body) {
  try {
    const res = await fetch(`${bridge()}/deck`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    return await res.json();
  } catch { return { error: 'MOTHER\'s bridge is not running (make mother-bridge)' }; }
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function createDeck() {
  const panel = document.createElement('section');
  panel.className = 'show-panel deck-panel';
  panel.hidden = true;
  panel.innerHTML = `
    <h2>DECK · THE REMIX DECK</h2>
    <p>Four slots, four levels. Pick each slot's source; the clips are rebuilt and loaded into Live. The levels launch Live's scenes.</p>
    <div class="deck-slots"></div>
    <div class="show-panel__go deck-levels"></div>
    <p class="show-panel__status">loading the pack...</p>
    <div class="show-panel__go"><button type="button" data-act="close">CLOSE</button></div>`;
  document.body.append(panel);
  const status = panel.querySelector('.show-panel__status');
  const slotsEl = panel.querySelector('.deck-slots');
  const levelsEl = panel.querySelector('.deck-levels');

  async function load() {
    status.textContent = 'loading the pack...';
    const r = await call({ cmd: 'list' });
    if (r.error) { status.textContent = r.error; slotsEl.innerHTML = ''; levelsEl.innerHTML = ''; return; }
    slotsEl.innerHTML = r.slots.map(slot => `
      <label class="deck-slot"><span>${esc(slot.toUpperCase())}</span>
        <select data-slot="${esc(slot)}">${(r.options[slot] || []).map(([id, label]) =>
          `<option value="${esc(id)}"${r.selection[slot] === id ? ' selected' : ''}>${esc(label)}</option>`).join('')}</select>
      </label>`).join('');
    levelsEl.innerHTML = r.levels.map((lv, k) => `<button type="button" data-level="${k}">${k + 1}: ${esc(lv.toUpperCase())}</button>`).join('');
    status.textContent = 'pick a source, or a level';
  }

  slotsEl.addEventListener('change', async event => {
    const sel = event.target.closest('select');
    if (!sel) return;
    for (const s of slotsEl.querySelectorAll('select')) s.disabled = true;
    status.textContent = `${sel.dataset.slot}: rebuilding the clips and loading them into Live...`;
    const r = await call({ cmd: 'set', slot: sel.dataset.slot, option: sel.value });
    status.textContent = r.error ? r.error : `${r.set}. ${r.live || ''}`;
    for (const s of slotsEl.querySelectorAll('select')) s.disabled = false;
  });
  levelsEl.addEventListener('click', async event => {
    const b = event.target.closest('button[data-level]');
    if (!b) return;
    const r = await call({ cmd: 'level', level: Number(b.dataset.level) });
    status.textContent = r.error ? r.error : `level ${r.level + 1} launched in Live`;
  });
  panel.addEventListener('click', event => { if (event.target.closest('button')?.dataset.act === 'close') panel.hidden = true; });
  addEventListener('soma-deck', () => { panel.hidden = false; load(); });
  return { open() { panel.hidden = false; load(); } };
}
