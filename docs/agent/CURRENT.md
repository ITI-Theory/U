# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (13 Oct 2026, through the night; the author asleep)

**The Lean is clean.** No `sorry`, no theorem of `True` and nothing resting on `sorryAx`
in the programme's own Lean: `greens_fn_is_SHO` proves the classical SHO Green's-function
identity, `scale_shift_preserves_structure` a real skeleton statement, and ScaleUniverse
uses its own `FLRWData` (physlib's `Cosmology.FLRW` is a `sorry` placeholder; offering
ours upstream is ISS-085). Towers export at 641f3b4: 1,116 declarations, 0 on sorry,
0 of True. The ledger (now reading the data files too): 460 citations in 122 documents,
0 disagree with the Lean. About 20 books and papers no longer say "five sorries remain".
Rule: at most two Lean processes at a time.

**Sherlock.** 45 affidavits (P25's new: its counts, and the three toy results it proposes
proved in Lean); `make -C sherlock check` 414 of 414. The QP check found the P6 Calm-Shame
+0.2, a slip in two figure macros, fixed (author: "your call"). ISS-063's inversion test
(the author's FIS notes: film personas mapped onto institutions) is written up and waits
for the OWL-types work.

**Field Atlas (ISS-087):** The Voyage Inside (15 stops, 25 plates captured from the app
with `npm run capture -- --only voyage`), a world opening each sector, the mind palace
spread, a Sherlock/reading/Part I panel on every level, the city of code after T4, the
Tensor's score in four settings. A3 313 pages, the Lulu A4-landscape edition 348 pages
(`make -C Part2/book/field-atlas lulu`); the Jumbo (max 300) needs trimming before it is
ordered.

**Licences (ISS-086, closed):** a licence line in every book and paper from the registry
(`lib/format/licence.lua`); `check_licences.py --pdfs --zenodo` (release check 14c):
files, READMEs, manifests, every PDF, CREDITS coverage, all 39 Zenodo records.

**Visualize (ISS-051):** every display equation has a figure (papers 234, books 38,
course 142); in HTML each equation is a tab panel (EQUATION, FIGURES, LEAN, READ MORE;
no JavaScript), every figure also as SVG and CSV. Left: sweep strips and animations,
and the Soma Machine's own panel.

**Volumes:** section ids are made unique per book by the assembler (Vol II had 32
repeats; now 0, no broken links); Vol I 592, II 508, III 562 pages.

**Soma Machine (ISS-052), later in the night:** every stop the issue named is now in true 3D
(body, limbic hinge as an hourglass of the eleven dimensions, emotion and thought, neuron); the
Mandelbulb dive is driven by the landscape state (H, |grad H|, T, a new valley a burst); the mind
palace is in the address (`palace=1&pf=N`) with its tour (the method of loci); CLIENT caps the
stereo depth at ×0.6. explorer-check covers the new behaviour; all pass.

**Sherlock (ISS-063):** the OWL-types design note (docs/SHERLOCK.md) and spike: "a percept is a
pole", read literally, is a contradiction in NextKB; the coherent reading is a map.

**Private (Me):** the FIS film notes (2021) in three layers, the author's accepted
version at the top; the chat saved (Me 2a93ad0).

## Next

Working rules (author, 11-13 Oct): work first; ask only about important things;
books and papers before the Soma Machine; new requirements go into ISSUES.md.

1. Author: the ISS-081 desk (photograph the A5 film pages, stereo calibration, read the
   course); check tonight's editorial choices (the Atlas's Part I pairings per sector,
   Sector III's world, the voyage texts); the UAT list (`uat/checklist.yaml`: the film,
   hardware).
2. Release (ISS-001): NotebookLM UAT, P21 to pending-upload, Zenodo sandbox, `make dist`,
   the Lulu order (the volumes and the Atlas proof), the Jumbo trimmed to 300.
3. Author's decisions: ISS-063 (restate every "X IS Y" axiom as a typed map?), ISS-051's
   sweep strips and animations (GIF or animated SVG?), the CLIENT depth (×0.6?).
4. ISS-063's inversion test (the FIS cases), then ISS-052's rest (branching paths, the sound
   of motion, a flow solver; the film's titles and anatomy).
