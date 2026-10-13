// Voice for MOTHER and H-AL, set by RICE's VOICE (rice.js voiceStyle):
//  - 'ms' (default): the browser's speech engine (Web Speech API), Microsoft's Natural
//    voices first when the browser offers them (Edge, Windows 11), for every persona.
//  - 'hal': H-AL speaks in the HAL 9000 Piper voice, synthesised by the local bridge
//    (POST /speak; private use, model kept outside the repo), with the HAL effect: a
//    little lower and slower, and a small room. Without the bridge, the browser voice
//    pitched lower and slower. MOTHER keeps the Natural voice.

// In 'ms' style H-AL is a Natural male voice, only a shade lower: the neural voices
// break up when pitched far down.
const NATURAL_HAL = { rate: 0.94, pitch: 0.85 };
const PERSONA_VOICE = {
  mother: { rate: 1.0, pitch: 1.0, prefer: /(female|zira|hazel|susan|libby|sonia|samantha|serena|karen|moira)/i },
  hal: { rate: 0.88, pitch: 0.55, prefer: /(male|david|george|daniel|ryan|guy|alex|fred|thomas|oliver)/i },
  // MUNCH: the project's own playful monster (bedtime tours); gruff, quick and happy.
  munch: { rate: 1.12, pitch: 0.05, prefer: /(male|david|george|guy|mark|fred|ryan|thomas)/i },
};

import { pronounce } from './lexicon.js';
import { voiceStyle } from './rice.js';

// Turn Markdown-with-LaTeX into something a speech engine can read.
export function speakableText(markdown) {
  return String(markdown ?? '')
    .replace(/```[\s\S]*?```/g, ' (code block omitted) ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' (equation) ')
    .replace(/\$([^$\n]{1,40})\$/g, (_, tex) => tex.replace(/\\[a-zA-Z]+/g, ' ').replace(/[{}_^\\]/g, ' '))
    .replace(/\$[^$\n]+\$/g, ' (equation) ')
    .replace(/\[(\d+(?:[,\s-]+\d+)*)\]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function createVoice() {
  const synth = globalThis.speechSynthesis;
  const supported = Boolean(synth && globalThis.SpeechSynthesisUtterance);
  let voices = [];
  const loadVoices = () => { voices = supported ? synth.getVoices() : []; };
  if (supported) {
    loadVoices();
    synth.addEventListener?.('voiceschanged', loadVoices);
  }

  function pickVoice(persona) {
    const english = voices.filter(voice => /^en(-|_|$)/i.test(voice.lang));
    const pool = english.length ? english : voices;
    const natural = pool.filter(voice => /natural/i.test(voice.name));
    const prefer = PERSONA_VOICE[persona].prefer;
    return natural.find(voice => prefer.test(voice.name)) ?? natural[0]
      ?? pool.find(voice => prefer.test(voice.name)) ?? pool.find(voice => voice.default) ?? pool[0] ?? null;
  }

  // The HAL effect on the Piper audio: a semitone and a bit lower (and so a little slower),
  // a soft top end, and a short room. WebAudio, so it needs the page to have been touched.
  let ctx = null;
  function halEffect(element) {
    try {
      element.preservesPitch = false;
      element.playbackRate = 0.92;
      ctx = ctx ?? new AudioContext();
      const source = ctx.createMediaElementSource(element);
      const tone = ctx.createBiquadFilter();
      tone.type = 'lowpass';
      tone.frequency.value = 5200;
      const room = ctx.createConvolver();
      const length = Math.floor(ctx.sampleRate * 0.45);
      const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
      for (let c = 0; c < 2; c += 1) {
        const data = impulse.getChannelData(c);
        for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
      }
      room.buffer = impulse;
      const dry = ctx.createGain(); dry.gain.value = 0.85;
      const wet = ctx.createGain(); wet.gain.value = 0.18;
      source.connect(tone);
      tone.connect(dry).connect(ctx.destination);
      tone.connect(room).connect(wet).connect(ctx.destination);
      if (ctx.state === 'suspended') ctx.resume();
    } catch { /* plain playback */ }
  }

  // Long answers are split into sentences: some engines stop after ~15 s of one utterance.
  function chunks(text) {
    const parts = text.match(/[^.!?]+[.!?]+|\S[^.!?]*$/g) ?? [text];
    const out = [];
    let current = '';
    for (const part of parts) {
      if ((current + part).length > 220 && current) { out.push(current.trim()); current = ''; }
      current += part;
    }
    if (current.trim()) out.push(current.trim());
    return out;
  }

  let audio = null;
  let request = 0;
  let finish = null;

  // Resolves when the current speech ends or is stopped, so tours can wait for it.
  function waitForEnd() {
    return new Promise(resolve => { finish = resolve; });
  }

  function stopAll() {
    request += 1;
    if (supported) synth.cancel();
    if (audio) { audio.pause(); URL.revokeObjectURL(audio.src); audio = null; }
    const done = finish; finish = null; done?.();
  }

  async function speakWithBridge(text, bridge) {
    const mine = ++request;
    const response = await fetch(`${bridge}/speak`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error(`voice HTTP ${response.status}`);
    const blob = await response.blob();
    if (mine !== request) return;
    audio = new Audio(URL.createObjectURL(blob));
    halEffect(audio);
    const ended = waitForEnd();
    audio.addEventListener('ended', () => { const done = finish; finish = null; done?.(); }, { once: true });
    await audio.play();
    await ended;
  }

  // Chrome sometimes leaves the engine paused, or drops an utterance queued in the same
  // tick as cancel(); resume it, and give the voices list a moment to arrive.
  async function ready() {
    if (!supported) return;
    if (!voices.length) {
      await new Promise(resolve => { const t = setTimeout(resolve, 1500); synth.addEventListener?.('voiceschanged', () => { clearTimeout(t); resolve(); }, { once: true }); });
      loadVoices();
    }
    synth.resume();
    await new Promise(resolve => setTimeout(resolve, 60));
  }

  return {
    supported,
    stop: stopAll,
    // Call from a click: a silent utterance so the browser counts speech as allowed.
    unlock() {
      if (!supported) return;
      try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; synth.speak(u); } catch { /* ignore */ }
    },
    // bridge: base URL of the local bridge when H-AL's Piper voice should be used.
    // Resolves with 'piper', 'browser' or 'silent' once the speech has finished or been stopped.
    async speak(markdown, persona = 'mother', bridge = '') {
      const text = pronounce(speakableText(markdown));
      if (!text) return 'silent';
      stopAll();
      const style = voiceStyle();
      if (persona === 'hal' && bridge && style === 'hal') {
        try {
          await speakWithBridge(text, bridge);
          return 'piper';
        } catch {
          // fall through to the browser voice
        }
      }
      if (!supported) return 'silent';
      const mine = request;
      await ready();
      if (mine !== request) return 'silent';
      const settings = persona === 'hal' && style === 'ms' ? NATURAL_HAL : PERSONA_VOICE[persona] ?? PERSONA_VOICE.mother;
      const voice = pickVoice(persona in PERSONA_VOICE ? persona : 'mother');
      const ended = waitForEnd();
      const parts = chunks(text);
      parts.forEach((chunk, index) => {
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.rate = settings.rate;
        utterance.pitch = settings.pitch;
        if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
        if (index === parts.length - 1) {
          const done = () => { const resolve = finish; finish = null; resolve?.(); };
          utterance.onend = done;
          utterance.onerror = done;
        }
        synth.speak(utterance);
      });
      await ended;
      return 'browser';
    },
  };
}
