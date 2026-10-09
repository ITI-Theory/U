// presentation.js: the stage for spoken presentations (registry/tours with `abstract:`
// and `overlay:` steps; spec: docs/TOUR-LANGUAGE.md).
//
// - abstract stage: the opening abstract (already rendered on the splash) with one
//   paragraph highlighted, so the guide can talk about it in plain words;
// - overlays: faint, slow drawings of one idea at a time (the Green's function as a
//   ripple, the 4+3+1+3 split, the zoom dial, ...). They sweep past; they are not
//   figures to study, and they never take pointer events.

export const OVERLAYS = ['ripple', 'dimensions', 'zoom', 'split', 'threshold', 'landscape', 'network'];

const CYAN = '20,229,255';
const MAGENTA = '255,79,216';
const GOLD = '246,199,90';
const GREEN = '86,240,162';

function rgba(colour, alpha) {
  return `rgba(${colour},${Math.max(0, Math.min(1, alpha))})`;
}

const DRAW = {
  // Tap once, and the field rings: rings spread from the tap (the Green's function).
  ripple(context, box, time) {
    const { width, height } = box;
    const cx = width * 0.5;
    const cy = height * 0.52;
    const span = Math.hypot(width, height) * 0.5;
    for (let ring = 0; ring < 7; ring += 1) {
      const phase = (time * 0.11 + ring / 7) % 1;
      context.strokeStyle = rgba(CYAN, 0.5 * (1 - phase));
      context.lineWidth = 2;
      context.beginPath();
      context.arc(cx, cy, phase * span, 0, Math.PI * 2);
      context.stroke();
    }
    context.fillStyle = rgba(GOLD, 0.6 + 0.4 * Math.sin(time * 3));
    context.beginPath();
    context.arc(cx, cy, 6, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = rgba(MAGENTA, 0.35);
    context.beginPath();
    for (let x = 0; x <= width; x += 6) {
      const distance = Math.abs(x - cx) / width;
      const y = height * 0.9 + Math.sin(distance * 40 - time * 2.4) * 26 * Math.exp(-distance * 3);
      if (x === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
  },

  // 4 + 3 + 1 + 3 = 11: four bands slide together into one bar.
  dimensions(context, box, time) {
    const { width, height } = box;
    const parts = [[4, 'SPACETIME', CYAN], [3, 'RESPONSE', GREEN], [1, 'FEELING', MAGENTA], [3, 'THINKING', GOLD]];
    const join = (Math.sin(time * 0.5) + 1) / 2;
    const unit = width * 0.84 / 11;
    let x = width * 0.08;
    const y = height * 0.5;
    context.font = '600 12px "Space Mono", monospace';
    context.textAlign = 'center';
    parts.forEach(([size, label, colour], index) => {
      const gap = (1 - join) * 26 * (index - 1.5);
      const left = x + gap;
      context.fillStyle = rgba(colour, 0.32);
      context.fillRect(left, y, size * unit - 4, 30);
      context.fillStyle = rgba(colour, 0.75);
      context.fillText(`${size}D`, left + size * unit / 2, y - 26);
      context.fillText(label, left + size * unit / 2, y - 10);
      x += size * unit;
    });
    context.fillStyle = rgba('234,245,255', 0.25 + 0.5 * join);
    context.font = '800 22px Syne, sans-serif';
    context.fillText('= 11', width * 0.5, y + 66);
  },

  // The zoom dial: one marker travels a ruler from 10^-35 m to 10^26 m.
  zoom(context, box, time) {
    const { width, height } = box;
    const left = width * 0.08;
    const right = width * 0.92;
    const y = height * 0.55;
    context.strokeStyle = rgba(CYAN, 0.45);
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(left, y);
    context.lineTo(right, y);
    context.stroke();
    context.font = '12px "Space Mono", monospace';
    context.textAlign = 'center';
    for (let step = 0; step <= 20; step += 1) {
      const x = left + (right - left) * step / 20;
      context.strokeStyle = rgba(CYAN, 0.4);
      context.beginPath();
      context.moveTo(x, y - 8);
      context.lineTo(x, y + 8);
      context.stroke();
      if (step % 5 === 0) {
        context.fillStyle = rgba(CYAN, 0.6);
        context.fillText(String(step), x, y + 26);
      }
    }
    context.fillStyle = rgba(CYAN, 0.55);
    context.fillText('10^-35 m', left, y - 20);
    context.fillText('10^26 m', right, y - 20);
    const position = (Math.sin(time * 0.35 - Math.PI / 2) + 1) / 2;
    const x = left + (right - left) * position;
    context.fillStyle = rgba(GOLD, 0.85);
    context.beginPath();
    context.arc(x, y, 9, 0, Math.PI * 2);
    context.fill();
    for (let ring = 1; ring <= 3; ring += 1) {
      context.strokeStyle = rgba(GOLD, 0.3 / ring);
      context.beginPath();
      context.arc(x, y, 9 + ring * 14 + (time * 20) % 14, 0, Math.PI * 2);
      context.stroke();
    }
  },

  // A cake cut in eleven: seven pieces, then three more.
  split(context, box, time) {
    const { width, height } = box;
    const cx = width * 0.5;
    const cy = height * 0.5;
    const radius = Math.min(width, height) * 0.28;
    const grow = Math.min(1, (time * 0.25) % 1.6);
    const slices = [[7, GOLD, '7/11'], [3, MAGENTA, '3/11']];
    let start = -Math.PI / 2;
    context.font = '700 18px "Space Mono", monospace';
    context.textAlign = 'center';
    for (const [count, colour, label] of slices) {
      const end = start + (Math.PI * 2 * count / 11) * grow;
      context.fillStyle = rgba(colour, 0.3);
      context.beginPath();
      context.moveTo(cx, cy);
      context.arc(cx, cy, radius, start, end);
      context.closePath();
      context.fill();
      const middle = (start + end) / 2;
      context.fillStyle = rgba(colour, 0.8 * grow);
      context.fillText(label, cx + Math.cos(middle) * radius * 0.62, cy + Math.sin(middle) * radius * 0.62);
      start = start + Math.PI * 2 * count / 11;
    }
    context.strokeStyle = rgba('234,245,255', 0.3);
    for (let piece = 0; piece < 11; piece += 1) {
      const angle = -Math.PI / 2 + Math.PI * 2 * piece / 11;
      context.beginPath();
      context.moveTo(cx, cy);
      context.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      context.stroke();
    }
  },

  // Activity below a line is real but unfelt; a crossing glows.
  threshold(context, box, time) {
    const { width, height } = box;
    const line = height * 0.45;
    context.setLineDash([10, 8]);
    context.strokeStyle = rgba(MAGENTA, 0.55);
    context.beginPath();
    context.moveTo(0, line);
    context.lineTo(width, line);
    context.stroke();
    context.setLineDash([]);
    context.lineWidth = 2;
    let previous = null;
    for (let x = 0; x <= width; x += 4) {
      const t = x / width * 14 + time * 1.4;
      const swell = Math.max(0, Math.sin(t * 0.21)) ** 6;
      const y = height * 0.8 - (Math.sin(t) * 0.5 + 0.5) * (height * 0.12 + swell * height * 0.4);
      if (previous) {
        context.strokeStyle = y < line ? rgba(GOLD, 0.9) : rgba(CYAN, 0.45);
        context.beginPath();
        context.moveTo(previous[0], previous[1]);
        context.lineTo(x, y);
        context.stroke();
      }
      previous = [x, y];
    }
  },

  // A landscape with valleys: a ball rests, is poked over the hill, settles again.
  landscape(context, box, time) {
    const { width, height } = box;
    const base = height * 0.7;
    const curve = x => {
      const u = (x / width - 0.5) * 4;
      return base - 60 + (u * u - 1.6) ** 2 * 26 - u * 8;
    };
    context.strokeStyle = rgba(GREEN, 0.5);
    context.lineWidth = 2.5;
    context.beginPath();
    for (let x = 0; x <= width; x += 5) {
      if (x === 0) context.moveTo(x, curve(x));
      else context.lineTo(x, curve(x));
    }
    context.stroke();
    const cycle = (time * 0.18) % 1;
    const leftWell = width * (0.5 - 1.28 / 4);
    const rightWell = width * (0.5 + 1.28 / 4);
    const travel = cycle < 0.35 ? 0 : cycle < 0.6 ? (cycle - 0.35) / 0.25 : 1;
    const eased = travel * travel * (3 - 2 * travel);
    const x = leftWell + (rightWell - leftWell) * eased;
    context.fillStyle = rgba(GOLD, 0.9);
    context.beginPath();
    context.arc(x, curve(x) - 12, 11, 0, Math.PI * 2);
    context.fill();
  },

  // One shared field instead of everyone messaging everyone.
  network(context, box, time) {
    const { width, height } = box;
    const cx = width * 0.5;
    const cy = height * 0.5;
    const count = 14;
    const radius = Math.min(width, height) * 0.42;
    for (let node = 0; node < count; node += 1) {
      const angle = Math.PI * 2 * node / count + time * 0.05;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius * 0.6;
      const pulse = (Math.sin(time * 2 - node * 0.7) + 1) / 2;
      context.strokeStyle = rgba(CYAN, 0.12 + pulse * 0.3);
      context.beginPath();
      context.moveTo(cx, cy);
      context.lineTo(x, y);
      context.stroke();
      context.fillStyle = rgba(MAGENTA, 0.5 + pulse * 0.4);
      context.beginPath();
      context.arc(x, y, 6, 0, Math.PI * 2);
      context.fill();
    }
    for (let ring = 0; ring < 3; ring += 1) {
      const phase = (time * 0.3 + ring / 3) % 1;
      context.strokeStyle = rgba(GOLD, 0.4 * (1 - phase));
      context.beginPath();
      context.ellipse(cx, cy, phase * radius, phase * radius * 0.6, 0, 0, Math.PI * 2);
      context.stroke();
    }
  },
};

export function createPresentationStage() {
  const stage = document.createElement('section');
  stage.className = 'presentation-abstract';
  stage.hidden = true;
  stage.setAttribute('aria-label', 'Abstract');
  stage.innerHTML = `
    <p class="presentation-abstract__kicker">[T]-THEORY / THE ABSTRACT, IN PLAIN WORDS</p>
    <h2 class="presentation-abstract__title">THE ZOOMABLE UNIVERSAL SOMATIC FIELD</h2>
    <div class="presentation-abstract__copy"></div>`;
  const copy = stage.querySelector('.presentation-abstract__copy');
  const canvas = document.createElement('canvas');
  canvas.className = 'presentation-overlay';
  canvas.hidden = true;
  canvas.setAttribute('aria-hidden', 'true');
  document.body.append(canvas, stage);
  const context = canvas.getContext('2d');

  let overlay = null;
  let frame = 0;
  let started = 0;

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * ratio);
    canvas.height = Math.round(innerHeight * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw(now) {
    if (!overlay) return;
    const time = (now - started) / 1000;
    context.clearRect(0, 0, innerWidth, innerHeight);
    const box = overlayBox();
    context.save();
    context.translate(box.left, box.top);
    context.beginPath();
    context.rect(0, 0, box.width, box.height);
    context.clip();
    DRAW[overlay](context, box, time);
    context.restore();
    frame = requestAnimationFrame(draw);
  }

  // Where an overlay draws: beside the abstract text when it is shown, otherwise the
  // middle of the window; always above the HUD card at the bottom.
  function overlayBox() {
    const bottom = innerHeight * 0.72;
    if (!stage.hidden) {
      const left = Math.min(innerWidth * 0.62, 980);
      return { left, top: innerHeight * 0.1, width: innerWidth - left - 24, height: bottom - innerHeight * 0.1 };
    }
    return { left: innerWidth * 0.1, top: innerHeight * 0.08, width: innerWidth * 0.8, height: bottom - innerHeight * 0.08 };
  }

  function setOverlay(name) {
    const next = OVERLAYS.includes(name) ? name : null;
    if (next === overlay) return;
    cancelAnimationFrame(frame);
    overlay = next;
    canvas.hidden = !overlay;
    canvas.classList.remove('is-visible');
    if (!overlay) return;
    resize();
    started = performance.now();
    frame = requestAnimationFrame(draw);
    requestAnimationFrame(() => canvas.classList.add('is-visible'));
  }

  // paragraph: 0 shows the abstract with nothing highlighted; 1..n highlights one.
  function setAbstract(paragraph) {
    if (!Number.isInteger(paragraph) || paragraph < 0) {
      stage.hidden = true;
      return;
    }
    if (!copy.childElementCount) copy.innerHTML = document.querySelector('#abstract-splash-copy')?.innerHTML ?? '';
    const paragraphs = [...copy.querySelectorAll('p')];
    paragraphs.forEach((element, index) => element.classList.toggle('is-current', index + 1 === paragraph));
    stage.classList.toggle('has-current', paragraph > 0);
    stage.hidden = false;
    paragraphs[paragraph - 1]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  function clear() {
    setOverlay(null);
    setAbstract(null);
  }

  addEventListener('resize', () => { if (overlay) resize(); });
  return { setOverlay, setAbstract, clear };
}
