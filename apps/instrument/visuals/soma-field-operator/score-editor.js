// score-editor.js: you set the knobs (ISS-053). The film's seven modes over story-time;
// pick a mode, drag a keyframe to set its value, add a keyframe where the film is now, and
// give each keyframe the sentence it came from (the interview's provenance,
// docs/INTERVIEW.md). PLAY MINE plays your score in this browser; SAVE downloads it as
// YAML. Kept in this browser only (localStorage): your film is private until you share it.

const KEY = 'soma-score-mine';
const MODES = ['S', 'F', 'C', 'A', 'G', 'L', 'PV'];
const NAMES = { S: 'Safety', F: 'Fear', C: 'Curiosity', A: 'Awe', G: 'Grief', L: 'Language', PV: 'Pre-verbal' };

export function loadMine() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
}

function store(score) {
  try { localStorage.setItem(KEY, JSON.stringify(score)); } catch { /* private mode */ }
}

// a fresh score of your own from a film: same modes, thresholds and phases, your keyframes
export function mineFrom(base) {
  return {
    id: 'mine', title: 'My film', version: 1, source: `edited from ${base.id}`, minutes: base.minutes ?? 90,
    modes: base.modes, coupling: base.coupling ?? [], thresholds: base.thresholds ?? [], phases: base.phases ?? [],
    defaults: base.defaults ?? {}, keyframes: base.keyframes.map(([t, v]) => [Number(t), v.map(Number)]), because: {},
  };
}

const num = x => String(Math.round(x * 1000) / 1000);

export function scoreToYaml(s) {
  const q = x => JSON.stringify(String(x ?? ''));
  const lines = [
    '# My film: a score composed in the Soma Machine (ISS-053). Private unless you share it.',
    `id: ${s.id}`, `title: ${q(s.title)}`, `version: ${s.version ?? 1}`, `source: ${q(s.source)}`, `minutes: ${s.minutes}`,
    'modes:', ...s.modes.map(m => `  - {id: ${m.id}, name: ${q(m.name)}}`),
    'keyframes:', ...s.keyframes.map(([t, v]) => `- [${num(t)}, [${v.map(num).join(', ')}]]`),
    'because:', ...Object.entries(s.because ?? {}).sort((a, b) => Number(a[0]) - Number(b[0])).map(([t, why]) => `  "${t}": ${q(why)}`),
    'thresholds:', ...(s.thresholds ?? []).map(th => `  - {id: ${th.id}, t: ${num(th.t)}${th.condition ? `, condition: ${q(th.condition)}` : ''}${th.hold ? ', hold: true' : ''}}`),
    'phases:', ...(s.phases ?? []).map(p => `  - {t: ${num(p.t)}, name: ${q(p.name)}, line: ${q(p.line)}}`),
  ];
  return lines.join('\n') + '\n';
}

export function createScoreEditor(root, { base, colors, now, onPlay }) {
  let score = loadMine() ?? null;
  let mode = 'F';
  let selected = -1;
  let drag = false;
  const panel = document.createElement('aside');
  panel.className = 'explorer__editor';
  panel.hidden = true;
  panel.innerHTML = `
    <header><strong>MY FILM</strong> <span class="explorer__editor-hint">you set the knobs: drag a point; each point keeps the sentence it came from</span>
      <button type="button" data-ed="close" aria-label="Close the editor">✕</button></header>
    <nav>${MODES.map(m => `<button type="button" data-mode="${m}" title="${NAMES[m]}">${m}</button>`).join('')}</nav>
    <canvas width="760" height="260"></canvas>
    <label class="explorer__editor-why">BECAUSE <input type="text" maxlength="200" placeholder="the sentence this point came from (your words)" /></label>
    <footer>
      <button type="button" data-ed="add">+ POINT AT NOW</button>
      <button type="button" data-ed="del">− POINT</button>
      <button type="button" data-ed="play">PLAY MINE</button>
      <button type="button" data-ed="save">SAVE (YAML)</button>
      <button type="button" data-ed="reset">START AGAIN FROM THIS FILM</button>
    </footer>`;
  root.append(panel);
  const canvas = panel.querySelector('canvas');
  const why = panel.querySelector('input');
  const g = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const px = t => 30 + (W - 40) * t;
  const py = v => H - 20 - (H - 40) * v;
  const k = () => MODES.indexOf(mode);

  function ensure() {
    if (!score) { score = mineFrom(base()); store(score); }
  }

  function draw() {
    if (panel.hidden || !score) return;
    g.clearRect(0, 0, W, H);
    g.fillStyle = 'rgba(2,6,12,0.85)';
    g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(232,238,252,0.15)';
    for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(px(0), py(i / 4)); g.lineTo(px(1), py(i / 4)); g.stroke(); }
    for (const th of score.thresholds ?? []) {
      g.strokeStyle = 'rgba(63,208,233,0.5)';
      g.setLineDash([4, 4]); g.beginPath(); g.moveTo(px(th.t), py(0)); g.lineTo(px(th.t), py(1)); g.stroke(); g.setLineDash([]);
      g.fillStyle = '#3fd0e9'; g.font = '11px "Space Mono", monospace'; g.fillText(th.id, px(th.t) + 3, py(1) + 10);
    }
    MODES.forEach((m, j) => {
      g.strokeStyle = colors[m] ?? '#fff';
      g.globalAlpha = m === mode ? 1 : 0.28;
      g.lineWidth = m === mode ? 2.5 : 1.2;
      g.beginPath();
      score.keyframes.forEach(([t, v], i) => (i ? g.lineTo(px(t), py(v[j])) : g.moveTo(px(t), py(v[j]))));
      g.stroke();
    });
    g.globalAlpha = 1;
    score.keyframes.forEach(([t, v], i) => {
      g.fillStyle = i === selected ? '#ffffff' : colors[mode] ?? '#fff';
      g.beginPath(); g.arc(px(t), py(v[k()]), i === selected ? 7 : 5, 0, Math.PI * 2); g.fill();
      if (score.because?.[num(t)]) { g.strokeStyle = '#ffd166'; g.lineWidth = 2; g.beginPath(); g.arc(px(t), py(v[k()]), 9, 0, Math.PI * 2); g.stroke(); }
    });
    const tn = now();
    g.strokeStyle = '#ffffff'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(px(tn), py(0)); g.lineTo(px(tn), py(1)); g.stroke();
    g.fillStyle = '#e8eefc'; g.font = '12px "Space Mono", monospace';
    g.fillText(`${NAMES[mode]} · ${score.keyframes.length} points · gold ring: has its sentence`, 34, 16);
    for (const b of panel.querySelectorAll('[data-mode]')) b.classList.toggle('active', b.dataset.mode === mode);
  }

  function pick(event) {
    const r = canvas.getBoundingClientRect();
    const x = (event.clientX - r.left) * (W / r.width);
    const y = (event.clientY - r.top) * (H / r.height);
    let best = -1, d = 14;
    score.keyframes.forEach(([t, v], i) => { const dd = Math.hypot(px(t) - x, py(v[k()]) - y); if (dd < d) { d = dd; best = i; } });
    return { best, y };
  }

  function select(i) {
    selected = i;
    why.value = i >= 0 ? score.because?.[num(score.keyframes[i][0])] ?? '' : '';
    why.disabled = i < 0;
    draw();
  }

  canvas.addEventListener('pointerdown', event => {
    const { best } = pick(event);
    select(best);
    drag = best >= 0;
    if (drag) canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (!drag || selected < 0) return;
    const { y } = pick(event);
    score.keyframes[selected][1][k()] = Math.max(0, Math.min(1, Math.round(((H - 20 - y) / (H - 40)) * 100) / 100));
    draw();
  });
  canvas.addEventListener('pointerup', () => { if (drag) { drag = false; store(score); } });
  why.addEventListener('change', () => {
    if (selected < 0) return;
    score.because ??= {};
    const key = num(score.keyframes[selected][0]);
    if (why.value.trim()) score.because[key] = why.value.trim(); else delete score.because[key];
    store(score);
    draw();
  });

  panel.addEventListener('click', event => {
    const b = event.target.closest('button');
    if (!b) return;
    event.stopPropagation();
    if (b.dataset.mode) { mode = b.dataset.mode; draw(); return; }
    const act = b.dataset.ed;
    if (act === 'close') api.close();
    else if (act === 'add') {
      const t = Math.round(now() * 1000) / 1000;
      const ks = score.keyframes;
      if (ks.some(([kt]) => Math.abs(kt - t) < 0.005)) return;
      const after = ks.findIndex(([kt]) => kt > t);
      const a = ks[Math.max(0, after < 0 ? ks.length - 1 : after - 1)];
      const c = ks[after < 0 ? ks.length - 1 : after];
      const s = c[0] === a[0] ? 0 : (t - a[0]) / (c[0] - a[0]);
      const v = a[1].map((x, j) => Math.round((x + (c[1][j] - x) * s) * 100) / 100);
      ks.splice(after < 0 ? ks.length : after, 0, [t, v]);
      store(score);
      select(after < 0 ? ks.length - 1 : after);
    } else if (act === 'del' && selected > 0 && selected < score.keyframes.length - 1) {
      delete score.because?.[num(score.keyframes[selected][0])];
      score.keyframes.splice(selected, 1);
      store(score);
      select(-1);
    } else if (act === 'play') onPlay(score);
    else if (act === 'save') {
      const url = URL.createObjectURL(new Blob([scoreToYaml(score)], { type: 'text/yaml' }));
      const a = Object.assign(document.createElement('a'), { href: url, download: 'my-film.yaml' });
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } else if (act === 'reset') {
      score = mineFrom(base());
      store(score);
      select(-1);
    }
  });

  let raf = 0;
  const loop = () => { if (!panel.hidden) { draw(); raf = requestAnimationFrame(loop); } };
  const api = {
    get open() { return !panel.hidden; },
    get score() { return score; },
    show() { ensure(); panel.hidden = false; select(-1); cancelAnimationFrame(raf); loop(); },
    close() { panel.hidden = true; cancelAnimationFrame(raf); },
    toggle() { if (panel.hidden) api.show(); else api.close(); },
  };
  return api;
}
