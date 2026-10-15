// snap.js: SNAP (ISS-097, author 14 Oct): the photographer's way into A Gallery of Thoughts.
// You play the machine; at the moment (a thought arriving in the cathedral, the palace at full
// colour) you press SNAP or S, and the picture is saved as a somagram: a PNG of the view as
// it is on the screen (at the screen's resolution: full screen on a 4K display is 3840 wide)
// and beside it a JSON file with its [T]-stop, the reading of the field when it was taken
// (the address, which makes the view again; the stop; Φ; the dimension; the score's seven
// feelings at that moment). Shift+S keeps the app's labels in the picture. SNAP + SAY (V):
// after the picture the app listens for up to 8 s and what you say becomes the somagram's
// caption (`said`). Speech recognition is the browser's (Chrome sends the audio to Google, Edge
// to Microsoft); without it, SAY is skipped.
// Saving: Chrome and Edge ask once per session for a folder (choose bld/gallery/snaps; the
// Gallery's renderer reads it); other browsers download the two files.
//
// THE FILM STOCK (ISS-104; the author, 15 Oct: a photograph records its film and ISO): the
// user's base, the settings in force when the first somagram of a session was taken (the
// neurotype operators, the viewer preset, the resting heart, the loop, the start's Φ, level and
// dimension, the model's fixed constants), recorded once and carried by every somagram of the
// session, so two pictures can be compared fairly (a passing state against a lasting base).
const STOCK_KEY = 'soma-film-stock';
function filmStock(current) {
  try {
    const kept = JSON.parse(sessionStorage.getItem(STOCK_KEY) || 'null');
    if (kept) return kept;
    const stock = { loaded: new Date().toISOString(), ...current };
    sessionStorage.setItem(STOCK_KEY, JSON.stringify(stock));
    return stock;
  } catch { return { loaded: new Date().toISOString(), ...current }; }
}

// A WebGL canvas is cleared after it is shown, so the picture is copied inside the frame
// that drew it: request() marks the wish, the explorer's frame calls take() after drawing.

// SAY: up to 8 s of speech, the browser's recognition, the best transcript (or '' if none)
function hear(tell) {
  const Recognition = globalThis.SpeechRecognition ?? globalThis.webkitSpeechRecognition;
  if (!Recognition) {
    tell('SAY: this browser has no speech recognition (use Chrome or Edge)');
    return Promise.resolve('');
  }
  return new Promise(resolve => {
    const r = new Recognition();
    r.lang = navigator.language || 'en-GB';
    r.interimResults = false;
    r.maxAlternatives = 1;
    let text = '';
    const stop = setTimeout(() => r.stop(), 8000);
    r.onresult = event => { text = Array.from(event.results).map(x => x[0].transcript).join(' ').trim(); };
    r.onerror = () => {};
    r.onend = () => { clearTimeout(stop); resolve(text); };
    tell('SAY IT NOW: a caption for this picture (8 s)');
    try { r.start(); } catch { clearTimeout(stop); resolve(''); }
  });
}

export function createSnapper() {
  let wanted = null;
  let dirPromise = null;
  let toast = null;

  function folder() {
    if (!globalThis.showDirectoryPicker) return Promise.resolve(null);
    dirPromise ??= globalThis.showDirectoryPicker({ id: 'soma-snaps', mode: 'readwrite' }).catch(() => { dirPromise = null; return null; });
    return dirPromise;
  }

  async function save(name, blob) {
    const dir = await folder();
    if (dir) {
      const handle = await dir.getFileHandle(name, { create: true });
      const out = await handle.createWritable();
      await out.write(blob);
      await out.close();
      return dir.name;
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    return 'Downloads';
  }

  function say(text) {
    if (!toast) {
      toast = document.createElement('p');
      toast.className = 'snap-toast';
      toast.setAttribute('aria-live', 'polite');
      document.body.append(toast);
    }
    toast.textContent = text;
    toast.classList.remove('snap-toast--on');
    void toast.offsetWidth;
    toast.classList.add('snap-toast--on');
  }

  return {
    get wanted() { return Boolean(wanted); },
    // from a click or a key (a user gesture, so the folder can be asked for now)
    request(withLabels = false, say = false) {
      wanted = { withLabels, say };
      folder();
    },
    // gl: the stop's 3D canvas (or null), overlay: the explorer's 2D canvas, reading: the [T]-stop,
    // base: the settings now, kept as the film stock if this is the session's first somagram
    take(gl, overlay, reading, base = {}) {
      const { withLabels, say: listen } = wanted;
      wanted = null;
      const source = gl ?? overlay;
      const out = document.createElement('canvas');
      out.width = source.width;
      out.height = source.height;
      const c = out.getContext('2d');
      c.fillStyle = '#05070e';
      c.fillRect(0, 0, out.width, out.height);
      if (gl) c.drawImage(gl, 0, 0, out.width, out.height);
      if (withLabels || !gl) c.drawImage(overlay, 0, 0, out.width, out.height);
      const now = new Date();
      const two = n => String(n).padStart(2, '0');   // local time: the moment as the author lived it
      const stamp = `${now.getFullYear()}${two(now.getMonth() + 1)}${two(now.getDate())}-${two(now.getHours())}${two(now.getMinutes())}${two(now.getSeconds())}`;
      const name = `somagram-${stamp}-${reading.stop ?? 'view'}`;
      const stock = filmStock(base);
      const record = { stock, taken: now.toISOString(), local: `${stamp.slice(0, 8)} ${stamp.slice(9, 11)}:${stamp.slice(11, 13)}`, width: out.width, height: out.height, labels: withLabels, ...reading };
      out.toBlob(async blob => {
        try {
          const where = await save(`${name}.png`, blob);
          if (listen) {
            const said = await hear(text => say(text));
            if (said) record.said = said;
          }
          await save(`${name}.json`, new Blob([`${JSON.stringify(record, null, 2)}\n`], { type: 'application/json' }));
          say(`SNAP: ${name} (${out.width} x ${out.height}) saved to ${where}${record.said ? `: "${record.said}"` : ''}`);
        } catch (error) {
          say(`SNAP failed: ${error.message ?? error}`);
        }
      }, 'image/png');
    },
  };
}
