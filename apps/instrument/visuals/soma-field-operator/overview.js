// overview.js (ISS-100): the whole cockpit at once. A flight simulator's cockpit makes sense
// in one look; one small screen at a time it takes a while. This page draws the author's desk,
// one main screen and three tablets beneath, each a live Soma Machine view (?link=mood: they
// share the field's state, each keeps its own place) with a label saying what it is for.
// Click a screen to make it big (its controls come back); MINIMISE or Esc puts it back.

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

  SCREENS.forEach((screen, k) => {
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
    SCREENS.forEach((screen, k) => {
      window.open(frameUrl(screen, { small: false }), `soma-overview-${screen.id}`,
        `popup,width=${screen.place === 'main' ? 1280 : 900},height=${screen.place === 'main' ? 800 : 600},left=${60 + 60 * k},top=${60 + 50 * k}`);
    });
  });
}

build();
