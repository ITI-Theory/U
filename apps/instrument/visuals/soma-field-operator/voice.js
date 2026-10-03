// Voice for MOTHER and H-AL. H-AL speaks in the HAL 9000 Piper voice, synthesised
// by the local bridge (POST /speak; private use, model kept outside the repo).
// MOTHER, and H-AL when the bridge has no voice, use the browser's built-in
// speech engine (Web Speech API), H-AL pitched lower and slower.

const PERSONA_VOICE = {
  mother: { rate: 1.0, pitch: 1.0, prefer: /(female|zira|hazel|susan|libby|sonia|samantha|serena|karen|moira)/i },
  hal: { rate: 0.88, pitch: 0.55, prefer: /(male|david|george|daniel|ryan|guy|alex|fred|thomas|oliver)/i },
};

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
    return pool.find(voice => PERSONA_VOICE[persona].prefer.test(voice.name)) ?? pool.find(voice => voice.default) ?? pool[0] ?? null;
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

  function stopAll() {
    request += 1;
    if (supported) synth.cancel();
    if (audio) { audio.pause(); URL.revokeObjectURL(audio.src); audio = null; }
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
    await audio.play();
  }

  return {
    supported,
    stop: stopAll,
    // bridge: base URL of the local bridge when H-AL's Piper voice should be used.
    async speak(markdown, persona = 'mother', bridge = '') {
      const text = speakableText(markdown);
      if (!text) return 'silent';
      stopAll();
      if (persona === 'hal' && bridge) {
        try {
          await speakWithBridge(text, bridge);
          return 'piper';
        } catch {
          // fall through to the browser voice
        }
      }
      if (!supported) return 'silent';
      const settings = PERSONA_VOICE[persona] ?? PERSONA_VOICE.mother;
      const voice = pickVoice(persona in PERSONA_VOICE ? persona : 'mother');
      for (const chunk of chunks(text)) {
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.rate = settings.rate;
        utterance.pitch = settings.pitch;
        if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
        synth.speak(utterance);
      }
      return 'browser';
    },
  };
}
