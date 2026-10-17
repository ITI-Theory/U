// rooted-gate.js: the gate into ROOTED (ISS-095). After MOTHER's clearance code, the rule
// (registry/rooted.yaml: what ROOTED allows, what it never does, the flashing-light warning) and a
// confirmation; only ENTER sets ROOTED. A confirmation, not age verification.

import { rootedRule } from './generated/app-data.js';
import { setRooted } from './who.js';

const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function openRootedGate({ onEnter, onDecline } = {}) {
  const rule = rootedRule?.rule ?? {};
  const gate = document.createElement('section');
  gate.className = 'who-choice rooted-gate';
  gate.setAttribute('role', 'dialog');
  gate.setAttribute('aria-label', 'ROOTED: the rule');
  gate.innerHTML = `
    <div class="rooted-gate__card">
      <h2>${esc(rule.title ?? 'ROOTED IS OVER 18')}</h2>
      <p class="rooted-gate__warning">⚠ ${esc(rule.warning ?? '')}</p>
      <h3>ROOTED ALLOWS</h3><ul>${(rule.allows ?? []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <h3>IT NEVER</h3><ul>${(rule.never ?? []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <nav><button type="button" data-gate="enter">I AM OVER 18 · ENTER ROOTED</button><button type="button" data-gate="no">NOT NOW</button></nav>
    </div>`;
  document.body.append(gate);
  gate.querySelector('[data-gate="no"]').focus();
  gate.addEventListener('click', event => {
    const act = event.target.closest('[data-gate]')?.dataset.gate;
    if (!act) return;
    gate.remove();
    if (act === 'enter') { setRooted(true); onEnter?.(); } else onDecline?.();
  });
}
