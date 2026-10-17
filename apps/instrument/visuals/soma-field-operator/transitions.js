// transitions.js: the `via:` grammar of a tour step (registry/transitions.yaml): how a place is
// arrived at, for the picture and the sound alike. Shared by tour.js and scripts/compile-film.mjs;
// scripts/generate.py checks the same rules at build.
//   via ::= kind [ seconds "s" ] [ "on" sync ]

import { transitions } from './generated/app-data.js';

export const TRANSITION_KINDS = Object.keys(transitions?.kinds ?? {});
export const TRANSITION_SYNCS = Object.keys(transitions?.syncs ?? {});
export const STYLE_MAX = transitions?.style?.max_length ?? 80;
const MAX_SECONDS = transitions?.max_seconds ?? 20;

// { kind, seconds, sync } with the kind's defaults filled in, or { problem }
export function parseVia(text) {
  const m = String(text ?? '').trim().match(/^([a-z]+)(?:\s+(\d+(?:\.\d+)?)s)?(?:\s+on\s+([a-z]+))?$/);
  if (!m) return { problem: `via ${JSON.stringify(text)} is not: kind [seconds"s"] [on sync]` };
  const [, kind, secs, sync] = m;
  const def = transitions?.kinds?.[kind];
  if (!def) return { problem: `via kind ${kind} not one of ${TRANSITION_KINDS.join(', ')}` };
  if (sync && !TRANSITION_SYNCS.includes(sync)) return { problem: `via sync ${sync} not one of ${TRANSITION_SYNCS.join(', ')}` };
  const seconds = secs === undefined ? def.seconds : Number(secs);
  if (seconds > MAX_SECONDS) return { problem: `via ${seconds}s longer than ${MAX_SECONDS}s` };
  return { kind, seconds, sync: sync ?? def.sync, speed: def.speed };
}

export function styleProblem(style) {
  if (style === undefined) return null;
  return typeof style === 'string' && style.trim() && style.length <= STYLE_MAX ? null : `style must be words, at most ${STYLE_MAX} characters`;
}
