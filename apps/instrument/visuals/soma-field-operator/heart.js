// heart.js: a Bluetooth heart-rate chest strap for The Tensor's somatic loop (ISS-052).
// Uses the standard GATT Heart Rate service (0x180D), Heart Rate Measurement (0x2A37),
// through Web Bluetooth (Chrome and Edge on desktop and Android; a secure page:
// https or localhost). Any standard strap (Polar, Garmin, Wahoo, ...) should work.
// The beat-to-beat (RR) intervals are kept for heart-rate variability later.

export const supported = () => typeof navigator !== 'undefined' && Boolean(navigator.bluetooth?.requestDevice);

// Heart Rate Measurement (Bluetooth SIG, GATT 0x2A37): byte 0 flags (bit 0: 16-bit rate;
// bit 3: energy expended present; bit 4: RR intervals present), then the rate, then
// optional energy (uint16), then RR intervals (uint16, 1/1024 s each).
export function parseHeartRate(view) {
  const flags = view.getUint8(0);
  let i = 1;
  const bpm = flags & 0x01 ? view.getUint16(i, true) : view.getUint8(i);
  i += flags & 0x01 ? 2 : 1;
  if (flags & 0x08) i += 2;
  const rr = [];
  if (flags & 0x10) for (; i + 1 < view.byteLength; i += 2) rr.push(view.getUint16(i, true) / 1024);
  return { bpm, rr };
}

// onBeat({ bpm, rr }), onStatus(text): 'connecting', 'connected: <name>', 'disconnected', or an error
export function createHeartStrap({ onBeat = () => {}, onStatus = () => {} } = {}) {
  let device = null;
  let characteristic = null;
  const handle = event => onBeat(parseHeartRate(event.target.value));
  const dropped = () => onStatus('disconnected');
  return {
    get connected() { return Boolean(device?.gatt?.connected); },
    // must be called from a click (the browser shows its device chooser)
    async connect() {
      if (!supported()) { onStatus('Web Bluetooth is not available in this browser (use Chrome or Edge)'); return false; }
      try {
        onStatus('connecting');
        device = await navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] });
        device.addEventListener('gattserverdisconnected', dropped);
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('heart_rate');
        characteristic = await service.getCharacteristic('heart_rate_measurement');
        characteristic.addEventListener('characteristicvaluechanged', handle);
        await characteristic.startNotifications();
        onStatus(`connected: ${device.name ?? 'heart-rate strap'}`);
        return true;
      } catch (error) {
        onStatus(error?.name === 'NotFoundError' ? 'no strap chosen' : `strap error: ${error?.message ?? error}`);
        return false;
      }
    },
    disconnect() {
      characteristic?.removeEventListener('characteristicvaluechanged', handle);
      device?.removeEventListener('gattserverdisconnected', dropped);
      if (device?.gatt?.connected) device.gatt.disconnect();
      device = null;
      characteristic = null;
      onStatus('disconnected');
    },
  };
}

// Heart-rate variability from the strap's RR intervals (seconds), the last `window` s:
//   rmssd       root mean square of successive differences (ms): short-term, vagal
//   breath      breaths per minute, from the respiratory rhythm in the heart rate (the
//               peak of the spectrum between 0.12 and 0.4 Hz: 7 to 24 breaths a minute)
//   coherence   0..1, the share of the 0.04-0.4 Hz power in one narrow peak (0.04-0.26 Hz),
//               the slow, regular rhythm of calm breathing
// Estimates for the film's somatic loop, not clinical measures. null with too few beats.
export function hrvFromRR(rr, window = 60) {
  const beats = [];
  let time = 0;
  for (const x of rr) if (x > 0.25 && x < 2.5) { time += x; beats.push([time, x]); }
  if (beats.length < 20 || time < 20) return null;
  const start = Math.max(0, time - window);
  const recent = beats.filter(([at]) => at >= start);
  let sq = 0;
  for (let i = 1; i < recent.length; i++) sq += ((recent[i][1] - recent[i - 1][1]) * 1000) ** 2;
  const rmssd = Math.sqrt(sq / Math.max(1, recent.length - 1));
  // the RR series resampled at 4 Hz, mean removed, Hann window
  const fs = 4;
  const t0 = recent[0][0], t1 = recent[recent.length - 1][0];
  const n = Math.floor((t1 - t0) * fs);
  const x = new Float64Array(n);
  let j = 0;
  for (let i = 0; i < n; i++) {
    const at = t0 + i / fs;
    while (j + 1 < recent.length - 1 && recent[j + 1][0] < at) j++;
    const [ta, a] = recent[j];
    const [tb, b] = recent[Math.min(j + 1, recent.length - 1)];
    x[i] = tb > ta ? a + ((b - a) * (at - ta)) / (tb - ta) : a;
  }
  const mean = x.reduce((s, v) => s + v, 0) / n;
  for (let i = 0; i < n; i++) x[i] = (x[i] - mean) * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1)));
  const power = f => {
    let re = 0, im = 0;
    for (let i = 0; i < n; i++) { const w = (2 * Math.PI * f * i) / fs; re += x[i] * Math.cos(w); im -= x[i] * Math.sin(w); }
    return re * re + im * im;
  };
  const df = 0.005;
  const spec = [];
  for (let f = 0.04; f <= 0.4 + 1e-9; f += df) spec.push([f, power(f)]);
  const total = spec.reduce((s, [, p]) => s + p, 0) || 1;
  const peakIn = (lo, hi) => spec.filter(([f]) => f >= lo && f <= hi).reduce((best, s) => (s[1] > best[1] ? s : best), [0, -1]);
  const [fb] = peakIn(0.12, 0.4);
  const [fc] = peakIn(0.04, 0.26);
  const near = spec.filter(([f]) => Math.abs(f - fc) <= 0.015).reduce((s, [, p]) => s + p, 0);
  return { rmssd, breath: fb * 60, coherence: near / total };
}
