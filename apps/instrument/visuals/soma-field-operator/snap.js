// snap.js: SNAP (ISS-097, author 14 Oct): the photographer's way into A Gallery of Thoughts.
// You play the machine; at the moment (a thought arriving in the cathedral, the palace at full
// colour) you press SNAP or S, and the picture is saved as a somagram: a PNG of the view as
// it is on the screen (at the screen's resolution: full screen on a 4K display is 3840 wide)
// and beside it a JSON file with its [T]-stop, the reading of the field when it was taken
// (the address, which makes the view again; the stop; Φ; the dimension; the score's seven
// feelings at that moment). Shift+S keeps the app's labels in the picture.
// Saving: Chrome and Edge ask once per session for a folder (choose bld/gallery/snaps; the
// Gallery's renderer reads it); other browsers download the two files.
//
// A WebGL canvas is cleared after it is shown, so the picture is copied inside the frame
// that drew it: request() marks the wish, the explorer's frame calls take() after drawing.

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
    request(withLabels = false) {
      wanted = { withLabels };
      folder();
    },
    // gl: the stop's 3D canvas (or null), overlay: the explorer's 2D canvas, reading: the [T]-stop
    take(gl, overlay, reading) {
      const { withLabels } = wanted;
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
      const record = { taken: now.toISOString(), local: `${stamp.slice(0, 8)} ${stamp.slice(9, 11)}:${stamp.slice(11, 13)}`, width: out.width, height: out.height, labels: withLabels, ...reading };
      out.toBlob(async blob => {
        try {
          const where = await save(`${name}.png`, blob);
          await save(`${name}.json`, new Blob([`${JSON.stringify(record, null, 2)}\n`], { type: 'application/json' }));
          say(`SNAP: ${name} (${out.width} x ${out.height}) saved to ${where}`);
        } catch (error) {
          say(`SNAP failed: ${error.message ?? error}`);
        }
      }, 'image/png');
    },
  };
}
