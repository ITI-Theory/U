// rooms.js: the Music Room and the Cinema (ISS-122), beside the Engine Room and A Gallery of Thoughts. Author,
// 19 Oct 2026: "if we have an engine room, have we got a music room, and or a gallery? ... Cinema". A room is a
// workplace with its purpose, its people and its four outputs (registry/rooms.yaml). A room shows what exists
// and opens the tools; it makes nothing: music is made in Ableton Live (ISS-120, the rule), films by the
// compiler (docs/PIPELINE.md). The public side (the rooms, the studio standard, the viewers) is the registry's;
// the private side (the suite, the print, Live's bounces, the compiled films, the recordings) comes through
// MOTHER's bridge, local only. Opened from the explorer's top bar (events 'soma-music-room', 'soma-cinema').

import { rooms as ROOMS, studio as STUDIO, viewers as VIEWERS } from './generated/app-data.js';

const esc = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
function bridge() {
  try { return (localStorage.getItem('mother-bridge-url') || 'http://127.0.0.1:8765').replace(/\/$/, ''); } catch { return 'http://127.0.0.1:8765'; }
}
async function fetchJson(path) {
  try {
    const res = await fetch(`${bridge()}${path}`);
    return await res.json();
  } catch { return { error: 'MOTHER\'s bridge is not running (make mother-bridge): the private side is the author\'s, on his machine' }; }
}
const mb = n => `${(n / 1048576).toFixed(n > 1048576 * 10 ? 0 : 1)} MB`;
const when = s => new Date(s * 1000).toLocaleString();
const VIEWER = new Map((VIEWERS ?? []).map(v => [v.id, v.title]));

function createRoom(id, sectionsOf) {
  const room = ROOMS?.[id] ?? { title: id.toUpperCase(), outputs: [] };
  const root = document.createElement('section');
  root.className = `gallery room room--${id}`;
  root.hidden = true;
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-label', room.title);
  root.innerHTML = `
    <header class="gallery__head"><h2>${esc(room.title)}</h2><p>for ${esc(room.for)} · ${esc(room.say)}</p><button type="button" data-act="close" title="Close (Esc)">✕</button></header>
    <nav class="gallery__rooms" aria-label="Sections"></nav>
    <article class="gallery__room"></article>`;
  document.body.append(root);
  const nav = root.querySelector('.gallery__rooms');
  const body = root.querySelector('.gallery__room');
  let data = null, section = 0, sections = [];

  function show(i) {
    section = Math.max(0, Math.min(sections.length - 1, i));
    for (const b of nav.querySelectorAll('button')) b.classList.toggle('active', Number(b.dataset.section) === section);
    body.innerHTML = sections[section]?.html ?? '';
    body.scrollTop = 0;
  }
  async function open() {
    root.hidden = false;
    body.innerHTML = '<p>Looking at what exists…</p>';
    data = await fetchJson(`/${id === 'music' ? 'music' : 'cinema'}/room`);
    sections = sectionsOf(room, data);
    nav.innerHTML = sections.map((s, i) => `<button type="button" data-section="${i}"><b>${esc(s.title)}</b><small>${esc(s.sub ?? '')}</small></button>`).join('');
    show(section);
  }
  function close() { root.hidden = true; for (const m of root.querySelectorAll('audio, video')) m.pause(); }
  root.addEventListener('click', event => {
    event.stopPropagation();
    const b = event.target.closest('button');
    if (!b) return;
    if (b.dataset.section !== undefined) show(Number(b.dataset.section));
    else if (b.dataset.act === 'close') close();
    else if (b.dataset.event) { close(); dispatchEvent(new CustomEvent(b.dataset.event)); }
    else if (b.dataset.film) playFilm(b.dataset.film, close, b);
  });
  addEventListener('keydown', event => { if (!root.hidden && event.key === 'Escape') { event.stopPropagation(); close(); } }, true);
  return { open, close, root };
}

// the four outputs, each with how it is made and, where it exists, what there is
function outputs(room, status) {
  return `<div class="room__outputs">${room.outputs.map((o, i) => `<div class="room__output${status[i] ? ' is-made' : ''}"><b>${esc(o.name.toUpperCase())}</b><span>${status[i] ? esc(status[i]) : 'not made yet'}</span><small>${esc(o.how)}${o.private ? ' · private' : ''}</small></div>`).join('')}</div>`;
}
const privateNote = data => data?.error ? `<p class="room__note">${esc(data.error)}</p>` : '';

function musicSections(room, data) {
  const bounces = data?.bounces ?? [];
  const masters = bounces.filter(b => /(^|\/)master\.[a-z0-9]+$/i.test(b.name));
  const stems = bounces.filter(b => !masters.includes(b));
  const pr = data?.print;
  const suite = data?.suite;
  const live = data?.live_sets ?? [];
  const status = [
    pr ? `${pr.conductor_pages} A3 pages (about ${pr.conductor_cost} ${pr.currency}); ${pr.parts} parts, ${pr.parts_pages} A4 pages (about ${pr.parts_cost} ${pr.currency})` : '',
    stems.length ? `${stems.length} stems` : '',
    masters.length ? `${masters.length} master${masters.length === 1 ? '' : 's'}` : '',
    live.length ? `${live.length} set${live.length === 1 ? '' : 's'}; the latest ${live.slice().sort((a, b) => b.modified - a.modified)[0].name}` : '',
  ];
  const parts = [];
  for (const m of suite?.movements ?? []) {
    const p = parts.find(x => x.name === (m.part ?? '')) ?? (parts.push({ name: m.part ?? '', movements: [] }), parts.at(-1));
    p.movements.push(m);
  }
  const player = b => `<li><b>${esc(b.name)}</b> <small>${mb(b.bytes)} · ${esc(when(b.modified))}</small><br><audio controls preload="none" src="${esc(`${bridge()}/music/bounce/${b.name.split('/').map(encodeURIComponent).join('/')}`)}"></audio></li>`;
  const versions = (VIEWERS ?? []).map(v => {
    const mine = bounces.filter(b => b.name.toLowerCase().startsWith(`${v.id}/`));
    return `<h4>${esc(v.title)} <small>${esc(v.id)}</small></h4>${mine.length ? `<ul class="room__list">${mine.map(player).join('')}</ul>` : '<p class="room__note">Not bounced yet: Live bounces this version (the same slots, its own settings and macro automation).</p>'}`;
  }).join('');
  const slot = s => `<tr><td>${esc(s.slot)}</td><td>${esc(s.role)}</td><td>${esc(s.device)}</td><td>${esc(s.default)}</td></tr>`;
  return [
    { title: 'THE FOUR OUTPUTS', sub: 'what this room makes', html: `<h3>${esc(room.title)} <small>its four outputs</small></h3>${privateNote(data)}${outputs(room, status)}
      <p>Every sound here is Live's own bounce: music is made in Ableton Live, never outside it. Live is the instrument behind this room.</p>
      <p class="room__actions"><button type="button" data-event="soma-deck">OPEN THE DECK</button> <button type="button" disabled title="ISS-120: Console 1's idea over the author's plugins">THE CONSOLE · to come</button></p>` },
    { title: 'THE SCORE', sub: suite ? `${suite.movements.length} movements` : 'private', html: suite
      ? `<h3>${esc(suite.title)} <small>${esc(suite.take)}</small></h3>${parts.map(p => `<h4>${esc(p.name)}</h4><ul class="room__list room__list--plain">${p.movements.map(m => `<li><b>${esc(m.title)}</b> <small>${esc((m.phases ?? []).join(', '))} · ${m.bars} bars · ${m.minutes} min</small></li>`).join('')}</ul>`).join('')}
        <p class="room__note">The movements are named by their two leading feelings until the author names them (Me/music/movements.yaml).</p>`
      : `<h3>THE SCORE</h3>${privateNote(data)}<p class="room__note">No printed suite yet: make -C ../Me/music print.</p>` },
    { title: 'THE VERSIONS', sub: `${(VIEWERS ?? []).length} viewers`, html: `<h3>THE VERSIONS <small>the neutral master, then each viewer's</small></h3>${privateNote(data)}${versions}` },
    { title: 'THE STANDARD', sub: STUDIO?.status ? `version ${STUDIO.version}, ${STUDIO.status}` : '', html: STUDIO?.track
      ? `<h3>THE STUDIO STANDARD <small>version ${esc(STUDIO.version)} · ${esc(STUDIO.status)} · registry/studio/standard.yaml</small></h3>
        <p>Every track has the same shape; a slot not needed is off, never removed; anything not declared is a proposal to the author.</p>
        <h4>A TRACK</h4><table class="room__table"><tr><th>slot</th><th>role</th><th>device</th><th>default</th></tr>${STUDIO.track.slots.map(slot).join('')}</table>
        <h4>A GROUP <small>${esc((STUDIO.group?.names ?? []).join(', '))}</small></h4><table class="room__table"><tr><th>slot</th><th>role</th><th>device</th><th>default</th></tr>${(STUDIO.group?.slots ?? []).map(slot).join('')}</table>
        <h4>THE MASTER</h4><table class="room__table"><tr><th>slot</th><th>role</th><th>device</th><th>default</th></tr>${(STUDIO.master?.slots ?? []).map(s => slot({ ...s, default: '' })).join('')}</table>`
      : '<p>No studio standard yet (registry/studio/standard.yaml).</p>' },
  ];
}

async function playFilm(name, close, button) {
  button.disabled = true;
  try {
    const doc = await (await fetch(`${bridge()}/cinema/film/${encodeURIComponent(name)}`)).json();
    close();
    dispatchEvent(new CustomEvent('soma-film-load', { detail: { doc, play: true } }));
  } catch {
    button.textContent = 'MOTHER\'s bridge is not running';
  } finally { button.disabled = false; }
}

function cinemaSections(room, data) {
  const films = data?.films ?? [];
  const recs = data?.recordings ?? [];
  const viewersWithFilm = new Set(films.map(f => f.viewer));
  const status = [
    films.length ? `${films.length} compiled film${films.length === 1 ? '' : 's'}` : '',
    viewersWithFilm.size ? `${viewersWithFilm.size} version${viewersWithFilm.size === 1 ? '' : 's'}: ${[...viewersWithFilm].map(v => VIEWER.get(v) ?? v).join(', ')}` : '',
    '',
    recs.length ? `${recs.length} recording${recs.length === 1 ? '' : 's'}` : '',
  ];
  return [
    { title: 'THE FOUR OUTPUTS', sub: 'what this room makes', html: `<h3>${esc(room.title)} <small>its four outputs</small></h3>${privateNote(data)}${outputs(room, status)}
      <p>A film is compiled once, with a viewer's baseline in it, and played on its own clock (with Live's beats when Live runs); the knobs move it from there.</p>` },
    { title: 'THE FILMS', sub: `${films.length} compiled`, html: `<h3>THE FILMS <small>bld/film</small></h3>${privateNote(data)}${films.length
      ? `<ul class="room__list">${films.map(f => `<li><button type="button" data-film="${esc(f.name)}">▶ PLAY</button> <b>${esc(f.tour)} · ${esc(f.score)}</b> <small>for ${esc(VIEWER.get(f.viewer) ?? f.viewer)} · ${f.minutes} min · ${f.places} places · ${f.jumps} jumps</small></li>`).join('')}</ul><p class="room__note">Esc ends a film. FILM's own panel (MOTHER /film) sets the speed.</p>`
      : '<p class="room__note">No compiled film yet: node scripts/compile-film.mjs in the app\'s folder.</p>'}` },
    { title: 'THE VERSIONS', sub: `${(VIEWERS ?? []).length} viewers`, html: `<h3>THE VERSIONS <small>one film per viewer's baseline</small></h3>${(VIEWERS ?? []).map(v => `<h4>${esc(v.title)} <small>${esc(v.id)}</small></h4><p class="room__note">${viewersWithFilm.has(v.id) ? 'Compiled: in THE FILMS.' : `Not compiled: node scripts/compile-film.mjs --viewer ${esc(v.id)}`}</p>`).join('')}` },
    { title: 'THE RECORDINGS', sub: `${recs.length}`, html: `<h3>THE RECORDINGS <small>OBS, the Soma collection</small></h3>${privateNote(data)}${recs.length
      ? `<ul class="room__list">${recs.map(r => `<li><b>${esc(r.name)}</b> <small>${mb(r.bytes)} · ${esc(when(r.modified))}</small><br><video controls preload="none" src="${esc(`${bridge()}/cinema/recording/${r.name.split('/').map(encodeURIComponent).join('/')}`)}"></video></li>`).join('')}</ul>`
      : '<p class="room__note">No recordings yet: OBS records the show into Videos\\Soma (make obs-soma).</p>'}` },
  ];
}

export function createRooms() {
  const music = createRoom('music', musicSections);
  const cinema = createRoom('cinema', cinemaSections);
  addEventListener('soma-music-room', () => music.open());
  addEventListener('soma-cinema', () => cinema.open());
  return { music, cinema };
}
