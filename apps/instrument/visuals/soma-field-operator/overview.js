// overview.js (ISS-100): the whole cockpit at once. A flight simulator's cockpit makes sense
// in one look; one small screen at a time it takes a while. This page draws the author's desk,
// one main screen and three tablets beneath, each a live Soma Machine view (?link=mood: they
// share the field's state, each keeps its own place) with a label saying what it is for.
// Click a screen to make it big (its controls come back); MINIMISE or Esc puts it back.

// The desk's presets (?desk=<id>): THE DAY, the default below; THE THREE ELEVATORS (ISS-101): the
// main screen the scale elevator (the jellyfish human, the lift beside it), one tablet the dimension
// elevator's picture (the limbic hinge, D8), one the frequency elevator's (the brain's field by
// band), one the limbic road (the cathedral's way on through the limbic system): one field, three axes.
export const DESKS = {
  elevators: {
    title: 'THE THREE ELEVATORS',
    screens: [
      { id: 'main', place: 'main', view: 'voyage=human&dim=11&phi=0.6', title: 'THE MAIN SCREEN: SCALE', say: 'The scale elevator: the jellyfish human, and the lift beside it from a cell to the cosmos. One field, its first axis.' },
      { id: 'dimension', place: 'tablet', view: 'level=whole-brain-cemi&voyage=limbic&dim=8&phi=0.6', title: 'TABLET 1: DIMENSION', say: 'The dimension elevator\'s picture: the limbic hinge, D8, between the body\'s D1-7 and the mind\'s D9-11 (P20, P14).' },
      { id: 'frequency', place: 'tablet', view: 'level=whole-brain-cemi&voyage=brain&dim=11&band=gamma&phi=0.6', title: 'TABLET 2: FREQUENCY', say: 'The frequency elevator: the brain\'s field by EEG band (sourced), drawn slowed; what a band means in the model is a gap.' },
      { id: 'road', place: 'tablet', view: 'level=whole-brain-cemi&voyage=brain&cave=1&lfly=1&dim=11&phi=0.5', title: 'TABLET 3: THE LIMBIC ROAD', say: 'From the cathedral\'s temporal horn on through the limbic system: amygdala, hippocampus, fornix, the mammillary bodies.' },
    ],
  },
};

export const SCREENS = [
  { id: 'main', place: 'main', view: 'voyage=human&dim=11&phi=0.6',
    title: 'THE MAIN SCREEN: YOU',
    say: 'The jellyfish human: the body as one field. The elevator beside it takes you up and down the levels, from a cell to the cosmos. With one screen, this is the screen.' },
  { id: 'thought', place: 'tablet', view: 'voyage=thought&dim=11&phi=0.6',
    title: 'TABLET 1: WHAT YOU ARE THINKING',
    say: 'Emotion and thought: poke a feeling and watch the thought answer.' },
  { id: 'body', place: 'tablet', view: 'voyage=body&dim=4&phi=0.6',
    title: 'TABLET 2: WHAT YOUR BODY FEELS',
    say: 'The feeling as a shape in the body, the same field drawn from the inside.' },
  { id: 'score', place: 'tablet', view: 'voyage=score&dim=11&st=0.45&kv=0.1&kc=mind',
    title: 'TABLET 3: THE SCORE',
    say: 'The session as a score: where the mood has been, and where it is going.' },
];

function frameUrl(screen, { small }) {
  const url = new URL('./index.html', location.href);
  url.searchParams.set('link', 'mood');
  url.hash = small ? `${screen.view}&atlas=1` : screen.view;
  return url.toString();
}

// Show or hide the frame's controls without reloading it: its state is in the hash.
function setSmall(frame, small) {
  try {
    const params = new URLSearchParams(frame.contentWindow.location.hash.replace(/^#/, ''));
    if (small) params.set('atlas', '1'); else params.delete('atlas');
    frame.contentWindow.location.hash = params.toString();
  } catch { /* not loaded yet */ }
}

function build() {
  const desk = DESKS[new URLSearchParams(location.search).get('desk')] ?? null;
  const screens = desk?.screens ?? SCREENS;
  const switcher = document.querySelector('#ov-desk');
  if (switcher) {
    switcher.textContent = desk ? 'THE DESK: THE DAY' : 'THE DESK: THE THREE ELEVATORS';
    switcher.addEventListener('click', () => {
      const url = new URL(location.href);
      if (desk) url.searchParams.delete('desk'); else url.searchParams.set('desk', 'elevators');
      location.href = url.toString();
    });
  }
  const main = document.querySelector('#ov-main');
  const tablets = document.querySelector('#ov-tablets');
  let expanded = null;

  const collapse = () => {
    if (!expanded) return;
    expanded.classList.remove('ov-screen--big');
    setSmall(expanded.querySelector('iframe'), true);
    document.body.classList.remove('ov-has-big');
    expanded = null;
  };
  const expand = figure => {
    collapse();
    expanded = figure;
    figure.classList.add('ov-screen--big');
    document.body.classList.add('ov-has-big');
    setSmall(figure.querySelector('iframe'), false);
    figure.querySelector('.ov-min').focus();
  };

  screens.forEach((screen, k) => {
    const figure = document.createElement('figure');
    figure.className = `ov-screen ov-screen--${screen.place}`;
    figure.dataset.screen = screen.id;
    figure.innerHTML = `
      <div class="ov-bezel">
        <iframe title="${screen.title}" allow="fullscreen; autoplay"></iframe>
        <button type="button" class="ov-glass" aria-label="Make ${screen.title.toLowerCase()} big"></button>
        <button type="button" class="ov-min">MINIMISE (Esc)</button>
      </div>
      <figcaption><strong></strong><span></span></figcaption>`;
    figure.querySelector('strong').textContent = screen.title;
    figure.querySelector('span').textContent = screen.say;
    const frame = figure.querySelector('iframe');
    // The main screen first, the tablets one after another: four machines starting at once stutter.
    setTimeout(() => { frame.src = frameUrl(screen, { small: true }); }, k * 1500);
    frame.addEventListener('load', () => {
      try { frame.contentWindow.addEventListener('keydown', e => { if (e.key === 'Escape') collapse(); }); } catch { /* other origin */ }
    });
    figure.querySelector('.ov-glass').addEventListener('click', () => expand(figure));
    figure.querySelector('.ov-min').addEventListener('click', collapse);
    (screen.place === 'main' ? main : tablets).append(figure);
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') collapse(); });
  // Shrink each real-size screen to its bezel.
  const fit = new ResizeObserver(entries => {
    for (const { target } of entries) target.style.setProperty('--s', String(target.clientWidth / 1600));
  });
  document.querySelectorAll('.ov-bezel').forEach(bezel => fit.observe(bezel));

  document.querySelector('#ov-open').addEventListener('click', () => {
    screens.forEach((screen, k) => {
      window.open(frameUrl(screen, { small: false }), `soma-overview-${screen.id}`,
        `popup,width=${screen.place === 'main' ? 1280 : 900},height=${screen.place === 'main' ? 800 : 600},left=${60 + 60 * k},top=${60 + 50 * k}`);
    });
  });
}

build();
