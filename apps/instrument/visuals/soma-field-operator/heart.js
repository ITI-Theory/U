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
