// gallery.js: A Gallery of Thoughts in the Soma Machine (ISS-097). The art book's rooms, on the
// programme's own clock (registry/gallery.yaml): each room its dates, its text and its plates, as the
// book prints them, each plate with its caption and its [T]-stop (what stood out when it was taken).
// Opened from GALLERY in the explorer's top bar (event 'soma-gallery'); a plate opens large;
// ← → move through the room's plates, Esc goes back. Every picture is the programme's own
// (sherlock/gallery_sources.py). Interpretive: pictures of a model, not measurements.

import { gallery } from './generated/app-data.js';

const esc = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

export function createGallery() {
  const rooms = gallery?.rooms ?? [];
  const root = document.createElement('section');
  root.className = 'gallery';
  root.hidden = true;
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-label', 'A Gallery of Thoughts');
  root.innerHTML = `
    <header class="gallery__head"><h2>${esc(gallery?.title ?? 'A Gallery of Thoughts')}</h2><p>${esc(gallery?.subtitle ?? '')}</p><button type="button" data-act="close" title="Close (Esc)">✕</button></header>
    <nav class="gallery__rooms" aria-label="Rooms"></nav>
    <article class="gallery__room"></article>
    <figure class="gallery__plate" hidden><img alt="" /><figcaption></figcaption><button type="button" data-act="prev" title="Previous (←)">◀</button><button type="button" data-act="next" title="Next (→)">▶</button><button type="button" data-act="back" title="Back to the room (Esc)">BACK</button></figure>`;
  document.body.append(root);
  const nav = root.querySelector('.gallery__rooms');
  const roomEl = root.querySelector('.gallery__room');
  const plateEl = root.querySelector('.gallery__plate');
  let roomIndex = 0, plateIndex = -1;

  nav.innerHTML = rooms.map((r, i) => `<button type="button" data-room="${i}"><b>${esc(r.title)}</b><small>${esc(r.when)}</small></button>`).join('');

  function showRoom(i) {
    roomIndex = Math.max(0, Math.min(rooms.length - 1, i));
    const r = rooms[roomIndex];
    if (!r) { roomEl.innerHTML = '<p>No plates yet: build them with make -C Part2/book/gallery-of-thoughts plates.</p>'; return; }
    for (const b of nav.querySelectorAll('button')) b.classList.toggle('active', Number(b.dataset.room) === roomIndex);
    roomEl.innerHTML = `<h3>${esc(r.title)} <small>${esc(r.when)}</small></h3>${r.text.map(p => `<p>${esc(p).replace(/\*([^*]+)\*/g, '<em>$1</em>')}</p>`).join('')}
      <div class="gallery__grid">${r.plates.map((p, k) => `<button type="button" data-plate="${k}" title="${esc(p.caption)}"><img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy" /></button>`).join('')}</div>`;
    roomEl.scrollTop = 0;
  }
  function showPlate(k) {
    const r = rooms[roomIndex];
    if (!r) return;
    plateIndex = (k + r.plates.length) % r.plates.length;
    const p = r.plates[plateIndex];
    plateEl.querySelector('img').src = p.src;
    plateEl.querySelector('img').alt = p.caption;
    plateEl.querySelector('figcaption').innerHTML = `${esc(p.caption)}<small>${esc(p.tstop)} · ${plateIndex + 1} / ${r.plates.length} · ${esc(r.title)}</small>`;
    plateEl.hidden = false;
  }
  function closePlate() { plateEl.hidden = true; plateIndex = -1; }
  function open() { root.hidden = false; showRoom(roomIndex); }
  function close() { closePlate(); root.hidden = true; }

  root.addEventListener('click', event => {
    event.stopPropagation();
    const b = event.target.closest('button');
    if (!b) return;
    if (b.dataset.room !== undefined) { closePlate(); showRoom(Number(b.dataset.room)); }
    else if (b.dataset.plate !== undefined) showPlate(Number(b.dataset.plate));
    else if (b.dataset.act === 'close') close();
    else if (b.dataset.act === 'back') closePlate();
    else if (b.dataset.act === 'prev') showPlate(plateIndex - 1);
    else if (b.dataset.act === 'next') showPlate(plateIndex + 1);
  });
  addEventListener('keydown', event => {
    if (root.hidden) return;
    if (event.key === 'Escape') { event.stopPropagation(); if (!plateEl.hidden) closePlate(); else close(); }
    else if (!plateEl.hidden && event.key === 'ArrowRight') showPlate(plateIndex + 1);
    else if (!plateEl.hidden && event.key === 'ArrowLeft') showPlate(plateIndex - 1);
  }, true);
  addEventListener('soma-gallery', open);
  return { open, close, get rooms() { return rooms.length; } };
}
