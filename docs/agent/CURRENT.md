# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (11 Oct 2026, afternoon)

**Sherlock works on its first document** (ISS-055). All of OpenCyc (NextKB:
1,366,193 facts, 678 microtheories as scopes) builds in Lean 4 + Aesop in the
private U.Ops repo (`make -C opencyc lean-gen lean`, one Lean process at a
time; `make -C opencyc affidavits`). The Tensor's affidavit proves, as
theorems: three operating modes under "Two"; Projection drops the screen
signal from the model equation; Threshold 1 is never reached by the score;
Threshold 2 holds at 0.70, not 0.74; the chart and the keyframes differ in 11
of 77 values; Language as an "emotional mode" is a contradiction in OpenCyc
(Safety and Pre-verbal are not OpenCyc emotions). The OWL route (OpenCyc
repaired to OWL 2 DL, 0 violations) found the flattened KB inconsistent,
which is why microtheories stay separate.

**The Tensor in the app** (ISS-052): the Mandelbulb dive, knobs kd/kt/kw/km,
one score in four settings (`kc=mind|river|body|session`, a real jungle
river), HRV and breathing from a Bluetooth chest strap (`heart.js`), the full
90-minute film narration (`?film=1`). EmotionML export: `make emotionml`.

**Visualize** (ISS-051): papers 116 of 233 equations, books 35 of 38, the
course in progress (52 of 142 at the start of 11 Oct). New primitives:
type-decomposition, matrix-heatmap, process-diagram, data-points; the reader
now brace-balances macros.

## Next

1. Author: decide the paper fixes the affidavit found (`the-tensor.md`), or
   keep it as Sherlock's first exhibit. UAT the strap and the film narration
   (`?film=1#voyage=score&st=0&kv=1&kc=river`; touch the page once).
2. Sherlock: the analogy test ("all three containers are the same film")
   needs the Body and Session phases written (ISS-053); then a second
   document (a paper's affidavit), and the Law book's affidavit chapter.
3. Visualize: finish the course; the remaining papers' equations.
4. Release path (ISS-047 / ISS-001), the film recording, the book.
5. The final project: Sergeant Major (ISS-065): admin reminders read from the
   repos and pushed to H-AL, a Maintenance deck below the engine room, H-AL
   speaking in a stock Piper voice with the H-AL-ifier (the author's own voice
   parked). Epic: prj/.adm/issues/ISS-065-sergeant-major.md.