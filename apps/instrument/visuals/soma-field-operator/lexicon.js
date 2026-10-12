// lexicon.js: how H-AL and MOTHER say the programme's words (ISS-054). Piper and the
// browsers' engines support little SSML, so the lines are rewritten before they are
// spoken: symbols said as words (mathematics belongs on screen, not in speech), names
// spelled as they sound. Applied to every spoken line, Piper and browser alike. Entries
// marked `check` are guesses for the author to confirm by ear.

export const LEXICON = [
  // names
  [/\bH-AL\b/g, 'Hal'], // check: "Hal", as in HAL 9000 (H-AL: Hologram Alistair)
  [/\[T\]-Theory\b/g, 'T Theory'],
  [/\bOpenCyc\b/g, 'Open Syke'],
  [/\bCyc\b/g, 'Syke'],
  [/\bBRECVEMA\b/g, 'Breck-vemma'], // check
  [/\bKuramoto\b/g, 'Kurah-moto'],
  [/\bSOMA\b/g, 'Soma'],
  [/\bMOTHER\b/g, 'Mother'],
  [/\bMU\/TH\/UR\b/g, 'Mother'],
  [/\bZSF\b/g, 'Z S F'],
  [/\bUSF\b/g, 'U S F'],
  [/\bWKB\b/g, 'W K B'],
  [/\bHRV\b/g, 'H R V'],
  [/\bweddellite\b/gi, 'weddel-ite'],
  // symbols and units
  [/Φ|φ/g, 'phi'],
  [/Ψ|ψ/g, 'psi'],
  [/τ/g, 'tau'],
  [/κ/g, 'kappa'],
  [/σ/g, 'sigma'],
  [/[ωΩ]/g, 'omega'],
  [/λ/g, 'lambda'],
  [/β/g, 'beta'],
  [/ħ/g, 'h-bar'],
  [/∇/g, 'nabla'],
  [/≈/g, ' about '],
  [/≠/g, ' is not '],
  [/≤/g, ' at most '],
  [/≥/g, ' at least '],
  [/∞/g, 'infinity'],
  [/×/g, ' times '],
  [/→/g, ' to '],
  [/(\d)\s?µm\b/g, '$1 micrometres'],
  [/(\d)\s?mm\b/g, '$1 millimetres'],
  [/(\d)\s?nm\b/g, '$1 nanometres'],
  [/(\d)\s?%/g, '$1 percent'],
  [/\b10\^\(?(−|-)?(\d+)\)?/g, (_, minus, n) => `ten to the ${minus ? 'minus ' : ''}${n}`],
  [/(\d)M\b/g, '$1 million'],
  [/♥/g, 'heart'],
  [/Ḣ/g, 'heart trend'],
];

export function pronounce(text) {
  let out = String(text ?? '');
  for (const [pattern, said] of LEXICON) out = out.replace(pattern, said);
  return out.replace(/\s+/g, ' ').trim();
}
