// pokefx.js: POKE, made plain for learning (ISS-108, author 16 Oct: "POKE needs to be more pronounced,
// more visual, for learning"). Over any view, the same three phases of a response: the IMPULSE
// (a pulse, J(t), arrives at the field), the RESPONSE (it spreads, the field rings), the RETURN
// (it settles back: relaxation to the attractor). A ring expands from the point poked, a second
// echoes it, and a small readout names each phase as it happens with the mechanisms chosen.
// The picture is the model's response kernel, drawn; interpretive, not a measurement.

const PHASES = [
  [0, 'IMPULSE', 'J(t): a pulse arrives at the field'],
  [0.25, 'RESPONSE', 'it spreads: the field rings'],
  [1.1, 'RETURN', 'it settles back to its basin'],
];

export function createPokeFx() {
  const canvas = document.createElement('canvas');
  canvas.className = 'pokefx';
  const tag = document.createElement('p');
  tag.className = 'pokefx__tag';
  tag.hidden = true;
  document.body.append(canvas, tag);
  const g = canvas.getContext('2d');
  const pokes = [];
  let raf = 0;
  const size = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();
  addEventListener('resize', size);
  function frame(now) {
    g.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = pokes.length - 1; i >= 0; i--) {
      const p = pokes[i];
      const t = (now - p.born) / 1000;
      if (t > 2.6) { pokes.splice(i, 1); continue; }
      const R = Math.hypot(innerWidth, innerHeight) * 0.42;
      // the impulse: a bright dot falling in from above
      if (t < 0.25) {
        const k = t / 0.25;
        const y = p.y - (1 - k) * 160;
        g.fillStyle = `rgba(255,255,255,${0.4 + 0.6 * k})`;
        g.beginPath(); g.arc(p.x, y, 4 + 6 * k, 0, Math.PI * 2); g.fill();
        g.strokeStyle = 'rgba(255,209,102,0.7)'; g.lineWidth = 2;
        g.beginPath(); g.moveTo(p.x, y - 40 * (1 - k)); g.lineTo(p.x, y); g.stroke();
      } else {
        // the response: rings, in the colour of the field, then the echo
        for (const [delay, col, w] of [[0.25, p.color, 3], [0.55, '#5ee7ff', 2], [0.9, '#a78bfa', 1.5]]) {
          const u = (t - delay) / 1.5;
          if (u <= 0 || u >= 1) continue;
          g.strokeStyle = col; g.globalAlpha = (1 - u) ** 1.5 * p.strength;
          g.lineWidth = w * (1 + 2 * (1 - u));
          g.beginPath(); g.arc(p.x, p.y, 12 + R * u, 0, Math.PI * 2); g.stroke();
        }
        g.globalAlpha = 1;
        // the return: the centre settles, a fading glow
        const glow = Math.exp(-(t - 0.25) * 1.6) * p.strength;
        const grd = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, 70);
        grd.addColorStop(0, `rgba(255,255,255,${0.55 * glow})`); grd.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = grd; g.beginPath(); g.arc(p.x, p.y, 70, 0, Math.PI * 2); g.fill();
      }
      if (i === pokes.length - 1) {
        const ph = [...PHASES].reverse().find(([at]) => t >= at);
        tag.hidden = false;
        tag.style.left = `${Math.min(innerWidth - 300, p.x + 24)}px`;
        tag.style.top = `${Math.max(60, p.y - 70)}px`;
        tag.innerHTML = `<b>${ph[1]}</b> ${ph[2]}${p.mech ? `<small>${p.mech}</small>` : ''}`;
      }
    }
    if (!pokes.length) { tag.hidden = true; raf = 0; return; }
    raf = requestAnimationFrame(frame);
  }
  return {
    // x, y: where (screen pixels; the middle by default); strength 0..1; mech: the mechanisms' names
    fire({ x = innerWidth / 2, y = innerHeight * 0.48, strength = 1, color = '#ff7ad9', mech = '' } = {}) {
      if (document.body.classList.contains('atlas-capture')) return;
      pokes.push({ x, y, strength: Math.max(0.35, Math.min(1, strength)), color, mech, born: performance.now() });
      if (pokes.length > 4) pokes.shift();
      if (!raf) raf = requestAnimationFrame(frame);
    },
  };
}
