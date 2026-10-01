
import { createContourLayer } from './renderers/lib/contours.js';

const QUESTION_LABELS = {
  'kernel-verified': 'KERNEL-VERIFIED',
  'derived-under-assumptions': 'DERIVED UNDER ASSUMPTIONS',
  simulated: 'SIMULATED',
  'empirical-result': 'EMPIRICAL RESULT',
  interpretive: 'INTERPRETIVE',
  'open-hypothesis': 'OPEN HYPOTHESIS',
};

function renderAnswerText(container, text) {
  container.dataset.mathSource = String(text);
  let waitingForKatex = false;
  container.replaceChildren();
  for (const paragraphText of String(text).split('\n\n')) {
    const paragraph = document.createElement('p');
    const parts = paragraphText.split(/(\$[^$]+\$|`[^`]+`)/g).filter(Boolean);
    for (const part of parts) {
      if (part.startsWith('$') && part.endsWith('$')) {
        const span = document.createElement('span');
        if (globalThis.katex) globalThis.katex.render(part.slice(1, -1), span, { throwOnError: false });
        else {
          span.textContent = part.slice(1, -1);
          waitingForKatex = true;
        }
        paragraph.append(span);
      } else if (part.startsWith('`') && part.endsWith('`')) {
        const code = document.createElement('code');
        code.textContent = part.slice(1, -1);
        paragraph.append(code);
      } else {
        paragraph.append(document.createTextNode(part));
      }
    }
    container.append(paragraph);
  }
  if (waitingForKatex) {
    setTimeout(() => {
      if (container.dataset.mathSource === String(text) && globalThis.katex) renderAnswerText(container, text);
    }, 120);
  }
}

const GRAVITY_NUMBERS = {
  mass: '3.0e12 solar masses',
  lambdaObs: '1.090e-52 m^-2',
  lambdaUsf: '1.013e-52 m^-2',
  rObs: '1.607 Mpc',
  rUsf: '1.647 Mpc',
  shift: '+2.47%',
};

function makeTextSprite(THREE, lines, { width = 820, height = 210, color = '#eaf5ff', border = '#14e5ff', background = 'rgba(5,7,14,0.78)' } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = border;
  ctx.lineWidth = 3;
  ctx.strokeRect(3, 3, width - 6, height - 6);
  ctx.font = '700 28px Space Mono, monospace';
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  lines.forEach((line, index) => ctx.fillText(line, 24, 22 + index * 38));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.userData.dispose = () => { texture.dispose(); material.dispose(); };
  return sprite;
}

function makeEllipseLine(THREE, rx, ry, color, opacity = 0.7, segments = 180, dashed = false) {
  if (dashed) {
    const positions = [];
    const dashSegments = 28;
    const dashArc = (Math.PI * 2) / dashSegments * 0.58;
    for (let index = 0; index < dashSegments; index += 1) {
      const start = (index / dashSegments) * Math.PI * 2;
      const steps = 4;
      for (let step = 0; step < steps; step += 1) {
        const a = start + (step / steps) * dashArc;
        const b = start + ((step + 1) / steps) * dashArc;
        positions.push(Math.cos(a) * rx, Math.sin(a) * ry, 0.02, Math.cos(b) * rx, Math.sin(b) * ry, 0.02);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
    return new THREE.LineSegments(geometry, material);
  }
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(t) * rx, Math.sin(t) * ry, 0.02));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
  return new THREE.Line(geometry, material);
}

function makeClock(THREE, radius, label, color) {
  const group = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.12, 0.006, 8, 44),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.88, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  const hand = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0.01), new THREE.Vector3(0.075, 0.045, 0.01)]),
    new THREE.LineBasicMaterial({ color: 0xeaf5ff, transparent: true, opacity: 0.8, depthWrite: false }),
  );
  const text = makeTextSprite(THREE, [label], { width: 320, height: 74, color: '#eaf5ff', border: color === 0xf6c75a ? '#f6c75a' : '#14e5ff', background: 'rgba(5,7,14,0.58)' });
  text.scale.set(0.75, 0.17, 1);
  text.position.set(0.03, -0.23, 0.04);
  group.add(ring, hand, text);
  group.position.set(radius, -1.92 + Math.abs(radius) * 0.12, 0.14);
  return group;
}

function orderedQuestions(questions) {
  const byId = new Map(questions.map(question => [question.id, question]));
  const seen = new Set();
  const ordered = [];
  let cursor = byId.get('gravity-time-bending') ?? questions[0];
  while (cursor && !seen.has(cursor.id)) {
    ordered.push(cursor);
    seen.add(cursor.id);
    cursor = byId.get(cursor.next);
  }
  for (const question of questions) {
    if (!seen.has(question.id)) ordered.push(question);
  }
  return ordered;
}

function createGravityScene(scene, THREE) {
  const group = new THREE.Group();
  scene.add(group);
  const readouts = document.createElement('section');
  readouts.className = 'gravity-question-readouts';
  readouts.hidden = true;
  readouts.innerHTML = `
    <article class="gravity-question-readout gravity-question-readout--left">
      <p class="gravity-question-readout__kicker">4D / PHYSICS BASELINE / SOURCED</p>
      <h3>Einstein GR + measured Lambda</h3>
      <dl>
        <div><dt>Lambda_obs</dt><dd>${GRAVITY_NUMBERS.lambdaObs}</dd></div>
        <div><dt>r₀ ring</dt><dd>${GRAVITY_NUMBERS.rObs}</dd></div>
        <div><dt>clock glyphs</dt><dd>same weak-field GR time dilation</dd></div>
      </dl>
    </article>
    <article class="gravity-question-readout gravity-question-readout--right">
      <p class="gravity-question-readout__kicker">T-THEORY / DERIVED UNDER ASSUMPTIONS</p>
      <h3>Same local GR; derived Lambda origin</h3>
      <dl>
        <div><dt>Lambda_USF</dt><dd>${GRAVITY_NUMBERS.lambdaUsf}</dd></div>
        <div><dt>r₀ ring</dt><dd>${GRAVITY_NUMBERS.rUsf}</dd></div>
        <div><dt>visible shift</dt><dd>${GRAVITY_NUMBERS.shift} farther out</dd></div>
      </dl>
      <div class="gravity-question-ruler" aria-label="Zero-gravity radius shift ruler">
        <span class="gravity-question-ruler__track"></span>
        <span class="gravity-question-ruler__mark gravity-question-ruler__mark--gr">GR 1.607</span>
        <span class="gravity-question-ruler__mark gravity-question-ruler__mark--t">T 1.647</span>
        <strong>+2.5%</strong>
      </div>
    </article>`;
  document.body.append(readouts);
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(8.2, 4.75),
    new THREE.MeshBasicMaterial({ color: 0x05070e, transparent: true, opacity: 0.22, depthWrite: false }),
  );
  plane.position.z = -0.08;
  group.add(plane);

  const contourLevels = [-1.75, -1.25, -0.92, -0.68, -0.49, -0.34, -0.22, -0.13];
  const contours = createContourLayer(THREE, { levels: contourLevels, colors: ['#14e5ff', '#56f0a2', '#f6c75a', '#ff3bce'], opacity: 0.9 });
  contours.object.rotation.x = 0;
  contours.object.scale.z = 0.025;
  contours.object.position.z = 0.06;
  group.add(contours.object);

  const r0Obs = new THREE.Group();
  const r0Usf = new THREE.Group();
  for (const offset of [-0.025, 0, 0.025]) {
    r0Obs.add(makeEllipseLine(THREE, 2.42 + offset, 1.42 + offset * 0.6, 0xf6c75a, 0.9, 220, true));
    r0Usf.add(makeEllipseLine(THREE, 2.48 + offset, 1.46 + offset * 0.6, 0xff3bce, 0.95, 220, true));
  }
  group.add(r0Obs, r0Usf);
  const r0Label = makeTextSprite(THREE, ['zero-gravity radius r0', 'Lambda term balances attraction'], { width: 520, height: 110, color: '#f3ead0', border: '#f6c75a', background: 'rgba(5,7,14,0.62)' });
  r0Label.position.set(2.13, 1.42, 0.16);
  r0Label.scale.set(1.42, 0.31, 1);
  group.add(r0Label);
  const orbitA = makeEllipseLine(THREE, 0.82, 0.46, 0x14e5ff, 0.55);
  const orbitB = makeEllipseLine(THREE, 1.36, 0.82, 0x8f47ff, 0.48);
  const orbitC = makeEllipseLine(THREE, 1.92, 1.08, 0x56f0a2, 0.42);
  orbitA.rotation.z = 0.32; orbitB.rotation.z = -0.22; orbitC.rotation.z = 0.08;
  group.add(orbitA, orbitB, orbitC);

  const mass = new THREE.Mesh(
    new THREE.CircleGeometry(0.16, 48),
    new THREE.MeshBasicMaterial({ color: 0xf6c75a, transparent: true, opacity: 0.98, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  mass.position.z = 0.09;
  group.add(mass);
  const clocks = [makeClock(THREE, -1.25, 'slow clocks near mass', 0x14e5ff), makeClock(THREE, 1.55, 'weak-field GR clocks', 0xf6c75a)];
  clocks.forEach(clock => group.add(clock));

  const headline = makeTextSprite(THREE, ['Same where tested.', 'T-Theory says where Lambda comes from.'], { width: 920, height: 150, color: '#f3ead0', border: '#f6c75a', background: 'rgba(5,7,14,0.72)' });
  headline.position.set(0, 2.03, 0.18);
  headline.scale.set(3.15, 0.52, 1);
  group.add(headline);
  let panel = makeTextSprite(THREE, ['', '', '', ''], { width: 920, height: 210, color: '#eaf5ff', border: '#14e5ff', background: 'rgba(5,7,14,0.72)' });
  panel.position.set(0, -1.78, 0.2);
  panel.scale.set(3.05, 0.68, 1);
  group.add(panel);

  function updatePanel(lensOn) {
    const lines = lensOn
      ? ['RIGHT: T-THEORY / DERIVED UNDER ASSUMPTIONS', `Lambda_USF = ${GRAVITY_NUMBERS.lambdaUsf}`, `r0(${GRAVITY_NUMBERS.mass}) = ${GRAVITY_NUMBERS.rUsf} (${GRAVITY_NUMBERS.shift})`, 'same local clocks/contours where tested']
      : ['LEFT: EINSTEIN GR + MEASURED LAMBDA / SOURCED', `Lambda_obs = ${GRAVITY_NUMBERS.lambdaObs}`, `r0(${GRAVITY_NUMBERS.mass}) = ${GRAVITY_NUMBERS.rObs}`, 'weak-field Schwarzschild-de Sitter contours'];
    const replacement = makeTextSprite(THREE, lines, { width: 920, height: 210, color: lensOn ? '#ffd9fb' : '#dffbff', border: lensOn ? '#ff3bce' : '#14e5ff', background: 'rgba(5,7,14,0.72)' });
    replacement.position.copy(panel.position);
    replacement.scale.copy(panel.scale);
    const old = panel;
    group.remove(old);
    old.userData.dispose?.();
    panel = replacement;
    group.add(panel);
  }

  let lastLens = null;
  return {
    group,
    update(renderState, time, pulse, questionId) {
      const active = questionId === 'gravity-time-bending';
      group.visible = active;
      readouts.hidden = !active;
      if (!active) return;
      const lensOn = Boolean(renderState.tTheory);
      if (lensOn !== lastLens) { updatePanel(lensOn); lastLens = lensOn; }
      const lambdaScale = lensOn ? 0.9294 : 1;
      contours.update({
        columns: 122,
        rows: 76,
        x: col => -3.75 + (col / 121) * 7.5,
        y: row => -2.1 + (row / 75) * 4.2,
        height: (col, row) => {
          const x = -3.75 + (col / 121) * 7.5;
          const y = -2.1 + (row / 75) * 4.2;
          const r = Math.hypot(x, y * 1.18) + 0.12;
          return -1.0 / r - 0.024 * lambdaScale * r * r;
        },
        visible: renderState.contours || true,
        lift: 0.015,
      });
      r0Obs.visible = true;
      for (const line of r0Obs.children) line.material.opacity = lensOn ? 0.28 : 0.95;
      r0Usf.visible = lensOn;
      headline.visible = false;
      panel.visible = false;
      r0Label.visible = false;
      group.rotation.z = Math.sin(time * 0.05) * 0.012;
      for (const [index, orbit] of [orbitA, orbitB, orbitC].entries()) orbit.rotation.z += (renderState.style?.motion === false ? 0 : 0.0009 * (index + 1));
      mass.scale.setScalar(1 + pulse * 0.2 + Math.sin(time * 0.9) * 0.02);
    },
    dispose() {
      contours.dispose();
      group.traverse(object => {
        object.geometry?.dispose?.();
        if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => material.dispose?.());
        object.userData?.dispose?.();
      });
      scene.remove(group);
      readouts.remove();
    },
  };
}

function groupQuestions(questions, levelsById) {
  const labels = new Map([
    ['micro-physical', 'Microphysics'], ['biological', 'Life + body'], ['collective', 'Collective systems'],
    ['geological', 'Earth + matter'], ['cosmological', 'Cosmos'],
  ]);
  const groups = new Map();
  for (const question of questions) {
    const sector = levelsById.get(question.level)?.sector ?? 'other';
    const label = labels.get(sector) ?? sector.replace(/-/g, ' ');
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(question);
  }
  return groups;
}

export function createQuestionTours({ questions, levelsById, getActiveQuestionId, getLevelId, onSelect, onMother, scene, THREE }) {
  const tourQuestions = orderedQuestions(questions);
  const byId = new Map(questions.map(question => [question.id, question]));
  const byLevel = new Map();
  for (const question of tourQuestions) {
    if (!byLevel.has(question.level)) byLevel.set(question.level, []);
    byLevel.get(question.level).push(question);
  }

  const button = document.createElement('button');
  button.id = 'questions-open';
  button.type = 'button';
  button.className = 'mode-button questions-open';
  button.textContent = "WHAT'S DIFFERENT?";
  document.querySelector('#library-panel')?.after(button);

  const panel = document.createElement('section');
  panel.className = 'questions-panel';
  panel.hidden = true;
  panel.innerHTML = '<p class="inspector-kicker">CURATED QUESTION TOURS</p><h2>What\'s Different?</h2><div class="questions-list"></div>';
  button.after(panel);
  const list = panel.querySelector('.questions-list');
  for (const [group, groupQuestionsList] of groupQuestions(tourQuestions, levelsById)) {
    const section = document.createElement('section');
    section.className = 'questions-group';
    const heading = document.createElement('h3');
    heading.textContent = group;
    section.append(heading);
    for (const question of groupQuestionsList) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'question-list-item';
      item.dataset.questionId = question.id;
      item.innerHTML = `<span>${question.question}</span><small>${QUESTION_LABELS[question.badge] ?? question.badge}</small>`;
      item.addEventListener('click', () => onSelect(question.id));
      section.append(item);
    }
    list.append(section);
  }
  button.addEventListener('click', () => { panel.hidden = !panel.hidden; });

  const card = document.createElement('aside');
  card.className = 'question-card';
  card.hidden = true;
  card.innerHTML = '<p class="question-card__badge"></p><h2></h2><div class="question-card__answer"></div><div class="question-card__actions"><button type="button" class="question-card__mother">ASK MOTHER</button><button type="button" class="question-card__next"></button><button type="button" class="question-card__close">CLEAR</button></div>';
  document.body.append(card);
  const badge = card.querySelector('.question-card__badge');
  const title = card.querySelector('h2');
  const answer = card.querySelector('.question-card__answer');
  const mother = card.querySelector('.question-card__mother');
  const next = card.querySelector('.question-card__next');
  const close = card.querySelector('.question-card__close');
  mother.addEventListener('click', () => {
    const question = byId.get(getActiveQuestionId());
    if (question) onMother(question.mother_prompt || question.question);
  });
  next.addEventListener('click', () => {
    const question = byId.get(getActiveQuestionId());
    if (question?.next) onSelect(question.next);
  });
  close.addEventListener('click', () => onSelect(null));

  const nudge = document.createElement('button');
  nudge.type = 'button';
  nudge.className = 'question-nudge';
  nudge.hidden = true;
  document.body.append(nudge);

  const gravityScene = createGravityScene(scene, THREE);

  function sync(activeId = getActiveQuestionId(), levelId = getLevelId()) {
    const active = byId.get(activeId);
    document.body.classList.toggle('question-active', Boolean(active));
    document.body.classList.toggle('question-gravity-active', activeId === 'gravity-time-bending');
    card.hidden = !active;
    if (active) {
      badge.textContent = QUESTION_LABELS[active.badge] ?? active.badge;
      title.textContent = active.question;
      renderAnswerText(answer, active.short_answer);
      next.hidden = !active.next;
      next.textContent = active.next ? `Next: ${byId.get(active.next)?.question ?? active.next}` : '';
    }
    for (const item of list.querySelectorAll('.question-list-item')) item.classList.toggle('active', item.dataset.questionId === activeId);
    const levelQuestion = (byLevel.get(levelId) ?? [])[0];
    nudge.hidden = Boolean(active) || !levelQuestion;
    if (levelQuestion) {
      nudge.textContent = `Ask: ${levelQuestion.question}`;
      nudge.onclick = () => onSelect(levelQuestion.id);
    }
  }

  return {
    sync,
    updateOverlay(renderState, time, pulse) {
      gravityScene.update(renderState, time, pulse, getActiveQuestionId());
    },
    getQuestion: id => byId.get(id),
  };
}
