// score-from-cues.mjs: a mix's cue sheet (lib/show/cues.py) written as a score (ISS-107 B), so the
// music drives the model and the mix can be compiled into a film like any score. The file stays in
// bld (the mix is the author's, never published).
//
//   node scripts/score-from-cues.mjs --cues ../../../../bld/show/cues.json [--id my-mix] [--out <file>]

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scoreFromCues } from '../music-score.js';

const here = dirname(fileURLToPath(import.meta.url));
const arg = (name, fallback) => { const i = process.argv.indexOf(`--${name}`); return i > 0 ? process.argv[i + 1] : fallback; };
const cuesPath = resolve(arg('cues', resolve(here, '../../../../../bld/show/cues.json')));
const cues = JSON.parse(readFileSync(cuesPath, 'utf8'));
const id = arg('id', String(cues.source ?? 'music').replace(/\.[^.]+$/, '').replace(/[^\w-]+/g, '-').toLowerCase());
const score = scoreFromCues(cues, { id });
const out = resolve(arg('out', resolve(here, '../../../../../bld/show', `${id}.score.json`)));
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(score, null, 1));
console.log(`${out}: ${score.keyframes.length} keyframes, ${score.thresholds.length} drops as thresholds, ${score.minutes} min`);
