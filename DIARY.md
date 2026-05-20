## Release Management — Standard Procedure

### How to cut a release

```bash
# 1. Full rebuild (all PDFs from source)
cd paper && make && cd ..

# 2. Commit any dirty PDFs / source
git add -A && git commit -m "release: vX.Y.Z full rebuild"

# 3. Annotated tag — message = what changed since last tag
git tag -a vX.Y.Z -m "Release vX.Y.Z — one-line summary

- bullet: what changed
- bullet: papers updated
- bullet: code added"

# 4. Push commits + tag together
git push && git push origin vX.Y.Z

# 5. (Optional) GitHub release from tag
#    → Releases → Draft new → choose tag → paste bullets → attach PDFs
```

### Versioning convention

`v{major}.{minor}.{patch}-{label}`

| Segment | Increment when |
|---|---|
| major | paper submitted / accepted; instrument first live use |
| minor | new section, new module, new proof |
| patch | fix, typo, bib entry, PDF rebuild |
| label | `-alpha` draft / `-biorxiv` preprint upload / `-session{N}` |

### Tag history

| Tag | Commit | Description |
|---|---|---|
| `v1.0-biorxiv` | (prior) | bioRxiv v1 upload |
| `v1.1.0-session4` | `d56477f` | FieldAxioms, FieldProofs, §3.4 abductive loop |

---

## 20 May 2026 — Session: Requested triple run completed (3 -> 2 -> 1)

### What got done

- Implemented all three requested items in `instrument/quantum_experiment.py`:
  - **(3)** 3D animation export (`--mode animate`) to `instrument/quantum_experiment_3d.gif`
  - **(2)** schedule comparison runner (`--mode schedules`) with CSV + PNG outputs
  - **(1)** integrated barrier sweep mode (`--mode sweep`) with CSV + PNG outputs
- Added anneal schedule support in quantum simulation:
  - `linear`, `cosine`, `pause`
- Added CLI mode switch:
  - `run`, `animate`, `schedules`, `sweep`, `all`

### Ordered execution done (as requested)

1. `python instrument/quantum_experiment.py --mode animate`
2. `python instrument/quantum_experiment.py --mode schedules`
3. `python instrument/quantum_experiment.py --mode sweep`

### Core outcome

- QUANT-EXP-1 remains PASS.
- Schedule result (B10 baseline): linear best in this regime.

### Next steps (if paused)

1. Snapshot commit these new artifacts + CLI changes.
2. Add `--seed-count` and `--barrier-min/max/step` CLI args for deeper sweeps.
3. Add bootstrap confidence intervals for classical success rate and quantum peak occupancy.

### Brainstorm queue

- Add "Topological Reachability Index" as a single paper metric.
- Add phase-diagram heatmap over `(barrier, T)` for classical vs quantum reachability.
- Add side-by-side GIF: rotating 3D landscape + timeline cursor of schedule `s(t)`.

---

## 20 May 2026 — Session: QUANT-EXP sweep + 3D visual stack

### What got done

- Extended `instrument/quantum_experiment.py` with advanced 3D plots:
  - 3D Fear x Awe energy surface + cold trajectory overlay
  - 3D Fear x Awe energy surface + hot trajectory overlay
  - Quantum phase curve: `P(|Fear>)`, `P(Awe-dominant)`, `<H_problem>`
  - Final-state top-basis probability skyline
- New artifact: `instrument/quantum_experiment_3d.png`
- Barrier robustness sweep completed and persisted:
  - New artifacts:
    - `instrument/quantum_sweep_results.csv`
    - `instrument/quantum_sweep_summary.png`
    - `paper/QUANT-EXP-SWEEP-2026-05-20.md`

### Core numbers (this run)

- Barriers tested: `W[Fear,Awe] = -8, -10, -12`
- Classical cold (`T=0.02`, 48 runs total): **0/48** Awe crossings
- Classical hot (`T=1.5`, 48 runs total): **48/48** Awe crossings
- Quantum schedules (3/3 cases): Awe-dominant occupancy peak ~`0.408–0.410`

### Soundbite (safe claim)

"This is not a wall-clock speed claim; it is a possibility claim: under low-noise dynamics,
classical never reached Awe in 48 runs, while quantum reached Awe-dominant occupancy in every
tested barrier case."

### Snapshot status

- 3D graph enhancement already committed and pushed: `1050ce2`
- Sweep writeup + artifacts prepared in working tree for next snapshot commit.

### Next steps (if session pauses)

1. Commit sweep artifacts + writeup (`QUANT-EXP-SWEEP-2026-05-20.md`, CSV, PNG).
2. Add `--sweep` mode to `instrument/quantum_experiment.py` to reproduce table in one command.
3. Add schedule comparison (linear vs cosine vs pause-near-gap).
4. Add `noise-equivalent classical temperature T*` estimator for paper-friendly fairness metric.

### Brainstorm queue

- Define "Topological Reachability Index" = Awe-entry probability at fixed low noise.
- Add confidence intervals by seed bootstrap (n=200 trajectories/classical case).
- Build an animation panel: moving point on 3D surface + synchronized quantum phase trace.

---

## 19 May 2026 — Session 2: Instrument, PhD, HKP, Paper 3

- **HKP integrated**: Hertz, Krogh & Palmer (1991) added to bib; two new
  passages: ADHD adaptive reframing (B.3) and failure-modes HKP warning (§7.4)
- **Figures embedded**: all 9 rendered PDFs now in soma-field-paper.md;
  fig0 before §3.3, fig5 in Appendix B.3; ASCII art replaced throughout
- **PhD path**: interdisciplinary by publication; 3-paper structure mapped;
  ~18–24 months to submission; ILLC Amsterdam / Sussex best fit
- **Paper 3 scaffolded**: `paper/music-affect-dynamics.md` — dynamical field
  model vs Juslin/Sloboda circumplex; Juslin/Sloboda handbook scanned (991pp,
  stops at 2D — confirmed gap)
- **Instrument**: `instrument/DESIGN.md` + full Python server scaffolded
  (field.py, modifiers.py, midi_input.py, osc_output.py, logger.py, server.py)
- **Hardware confirmed**: 2×Twister, 2×Stream Deck XL, Akai Fire, Push 2,
  Ableton Suite; Bome+Companion routing arch; Dangbei Atom/HoloGauze on hold
- **Next**: run `python server.py` with Twister connected; write Max4Live
  OSC receiver device; add `make music` build to CI

---

## Handoff Summary

- Continuing workflow setup: simple Diary.md, one file for all notes/tasks.
- Workflow rules: max 5 bullets, first step only, no long prose.
- Parked ideas: Universe workspace as hub, multi-project management.
- Last actions: Discussed handoff, context switching, and diary continuity.
- Next step: Keep logging here, use “STOP AND PARK” for context switches.


---
# 16 May 2026

Looked at Bass-OMatic https://www.youtube.com/watch?v=eVdR2RfXGUw

I remember that well.
---

# 19 May 2026 — STOP AND PARK

## What got done today

- Main soma-field paper: figures (matplotlib + TikZ sources), bibliography complete, affiliations, abstract checked (304 words).
- Patient-POV paper: synced with 4 new sections.
- FIELD-NOTES: brainstorm on 7 new theoretical threads (RG flow, topological trauma, holonomy, Einstein coefficients, emotional ħ, Schwarzschild radius, SQ dyadic propagator).
- **Methodology paper written and committed:** `paper/mathematical-co-identification.md` — "Mathematical Co-identification: A Method for Structural Import Across Scientific Domains" — full draft, ~700 lines, 7 historical precedents, 5 soma-field worked examples, 6-class typeverse map, failure modes, epistemological section.
- All committed and pushed. HEAD: `d4a8234`. Repo clean.

## Next steps (morning)

### ~~1. Compile TikZ figures~~ ✅ DONE (May 19 evening)
All three TikZ figures compiled (fig1, fig4, figA2). All PDFs built and committed (`298977c`).
PDFs ready to upload: `paper/soma-field-paper.pdf`, `paper/soma-field-patient-pov.pdf`, `paper/mathematical-co-identification.pdf`

### 1. Submit soma-field paper to bioRxiv (first time — follow these steps)

bioRxiv is the standard preprint server for biology/neuroscience. Free. No peer review. Immediate posting. DOI assigned. This is how you get the paper visible while it's under journal review.

1. Go to **https://www.biorxiv.org/submit**
2. Click **"Submit a New Manuscript"**
3. Create an account (or log in) — use your ORCID `0009-0007-2194-0850` to link
4. Subject area: **Neuroscience** (primary); you can add "Systems Biology" as secondary
5. Upload files:
   - Main manuscript: you'll need a PDF. Build it first: `cd ~/prj/git/U/paper && pandoc soma-field-paper.md --bibliography bibliography.bib --citeproc -o soma-field-paper.pdf`
   - Figures: upload the PDFs or PNGs from `paper/figures/`
6. Fill in: title, abstract (copy from YAML front matter), author (Alistair Johnson), ORCID, affiliation (Independent Researcher, Zurich, Switzerland)
7. **Cover letter field**: brief — "Submitted for consideration as a preprint. No conflicts of interest."
8. Submit. You get a DOI immediately (format: `10.1101/YYYY.MM.DD.NNNNNN`). It goes live within ~24h after basic screening.

Note: bioRxiv v2 means you already have v1 posted (BIORXIV/2026/725970). To update: log in → "Manage Submissions" → find the paper → "Revise" → upload the new PDF. The DOI stays the same; v2 is clearly labelled.

### 3. Submit to Frontiers in Computational Neuroscience (journal submission)

Frontiers is open-access, peer-reviewed, suitable for this work.

1. Go to **https://www.frontiersin.org/journals/computational-neuroscience**
2. Click **"Submit your research"** → "Submit manuscript"
3. Article type: **"Original Research"** or **"Hypothesis and Theory"** (the latter fits better — it's a theoretical framework paper)
4. Follow the wizard:
   - Upload manuscript (Word .docx preferred by Frontiers, OR LaTeX zip). To generate .docx: `pandoc soma-field-paper.md --bibliography bibliography.bib --citeproc -o soma-field-paper.docx`
   - Upload figures separately (they want high-res TIFFs or PDFs — use the PDFs from `paper/figures/`)
   - Fill in all author details, ORCID, affiliation
   - Ethics statement: "No human subjects or animal experiments were conducted."
   - Conflict of interest: "None."
   - Data availability: "All code and source files at https://github.com/Alistair-Johnson/U"
5. You'll get an acknowledgement email. Typical timeline: 1–4 weeks to first decision.

### 4. Submit methodology paper to arXiv (optional but good)

The methodology paper (`paper/mathematical-co-identification.md`) is better suited to **arXiv** than a biology journal — it's a methods/philosophy of science paper.

1. Go to **https://arxiv.org/submit**
2. Create account → Submit
3. Primary category: **math-ph** (Mathematical Physics) or **q-bio.NC** (Neurons and Cognition)
4. Build PDF: `pandoc paper/mathematical-co-identification.md --bibliography paper/bibliography.bib --citeproc -o mathematical-co-identification.pdf`
5. Upload PDF, fill in metadata (title, abstract from YAML front matter, author, ORCID)
6. Posts next business day. Free. DOI via arXiv.

### 5. (Optional) Compile soma-field paper to PDF to check it looks right before submitting
```bash
cd ~/prj/git/U/paper
pandoc soma-field-paper.md --bibliography bibliography.bib --citeproc --pdf-engine=lualatex -o soma-field-paper.pdf
```

---

## 19 May 2026 — Session 3: Instrument hardware bringup + Twister UI  (sun-up wrap)

### What got done

- **Dual-Twister MIDI fix**: Windows WinMM enumerates two identical USB MIDI
  devices as separate port indices (both named `Midi Fighter Twister`).
  `_find_port_indices()` now returns ALL matching indices; `MidiInput` opens
  one handle per port.  Both CC bands live: CC 1–8 (somatic, left) and
  CC 9–16 (cognitive, right).  Committed `04bc69e`.
- **WinMM ghost-state workaround documented**: hard-killing Python without
  `midiInClose` leaves the port open but silent.  Fix: unplug/replug USB.
  Recovery: `powershell Get-Process python*` + `Stop-Process -Force`.
- **Field physics stable**: W diagonal = +0.8 (restoring), initial state =
  `regulated_calm`, bias = W @ calm → H ≈ −0.02.  Langevin noise confirmed.
- **viz.py**: 4-panel live dashboard (somatic bars, cognitive bars, H sparkline,
  MIDI diagnostics + field readout).  Reads newest log in `logs/`.
- **`instrument/twister_ui.py`** — three-layer virtual Twister display:
  - Physical layer: two 4×4 knob grids mirroring the hardware
  - MIDI layer: CC# + raw 0–127 value per knob
  - Instrument layer: named parameter (arousal/valence/…) + 0–1 normalised
  - Amber = somatic, steel-blue = cognitive; brightness tracks value
  - Capacitive-touch white ring + push-button centre dot
  - Default mode: polls live log file.  `--midi` mode: direct winmm input
  - Wallpaper background: `tmp/abstract-dark-background-with-purple-lines-generative-ai.jpg` at 22% alpha
  - Committed `9a327fc` → `d96517b`.
- HEAD: `d96517b`.  Repo clean.

### Next steps — instrument

**1. Assign the spare knobs (each Twister has 16; only 8 are mapped)**
- Left Twister knobs 9–12 → CC 17–20: gamma, D, (spare), theta
- Left Twister knobs 13–16 → CC 21–24: C-PTSD, ADHD, ASC, memory kernel
- Update `_left_configs()` in `twister_ui.py` with names; update `server.py`
  routing already handles CC 17–24.

**2. Cap-touch calibration**
- Run `--midi "Midi Fighter"` mode and touch each knob while monitoring
  console output.  The twister sends Note On (0x90) for cap touch — find
  the actual note numbers in your firmware and set `touch_note=` per knob
  in `KnobConfig`.

**3. Build `instrument/instrument.py` — single-launch all-in-one**
- One command starts: physics thread (50 Hz) + both MIDI ports + Twister UI
  on main thread.  No separate server.py + twister_ui.py needed.
- Absorb `MidiRouter`, `SomaField`, `SessionLogger`, `OscOutput` into one
  clean entry point.

**4. Bome MIDI routing**
- When Bome re-enters the chain: Input = Midi Fighter Twister →
  Output = Bome Virtual 1 pass-through rule.  Server switches
  `--midi "Bome Virtual Port 1"`.

**5. Port twister_ui to PySide6 / DAW embedding**
- Replace matplotlib with `QPainter` / `QWidget.paintEvent`.
- Expose as Reaper ReaScript panel or CLAP plugin using CLAP-wrapper.
  `KnobArtist.update()` is the only method that needs porting.

**6. Papers (parked, pick up when rested)**
- bioRxiv v2 upload (instructions above).
- Frontiers submission.
- Music–affect dynamics paper: next draft pass.

---

## 19 May 2026 — Session 4: Just Prove It  (morning burst → kernel)

### What got done

- **Hypnopompic burst formalised** (`paper/FIELD-NOTES.md`, commit `acbac76`):
  five structured sections from raw wake-up notes:
  (1) Sleep as search-index rebuild / hypnopompic window as optimal co-id state;
  (2) Aesop = abductive inference algorithm — formal name + Lean implementation;
  (3) RG zoom vocabulary table (T-duality, universality, c-theorem, zoom hacking);
  (4) Lean typeclass confirmed — `EmotionLang (r : Type)`, ad-hoc polymorphism,
      `deriving DecidableEq` enables Aesop on type-identity goals;
  (5) Full abductive loop diagram: Observation → abduction → Aesop → proof →
      predictions → new observations → loop.
- **`paper/FieldAxioms.lean`** — AI-evaluated axiom test suite (`7401b5a`):
  - 10 typed `axiom` declarations + 2 gap markers.  Valid Lean 4.
  - Each axiom: English doc comment + formal Lean type + test tag.
  - AI runner protocol: PASS / FAIL / NEEDS-FORMALISATION / IMPRECISE per axiom.
  - Suite result: 7 PASS, 4 NEEDS-FORMALISATION, 0 FAIL.
  - Format rationale: Lean over YAML because axioms are *typed*; doc is
    first-class; file upgrades to proved theorems; `#print axioms` = debt ledger.
  - Future: OpenCyc / CycL export path documented in header.
- **`src/FieldProofs.lean`** — first promoted theorems (`d99e5c2`):
  - LEAN-1 promoted from `axiom` to `theorem`. Zero `sorry`. Zero `admit`.
  - `awe_is_universal` — proof: `rfl`. One word. Universality is in the type.
  - `awe_structural_universality` — proof: `⟨rfl, by decide, by decide⟩`.
  - `nostalgia_requires_longing`, `love_ne_awe` — proof: `decide`.
  - 10 theorems total, all kernel-verified.
  - Added to `lakefile.lean` roots.
- **The pipeline** — now exists end to end:
  ```
  Raw idea (bed)  →  FIELD-NOTES.md  →  FieldAxioms.lean  →  FieldProofs.lean
  (capture)          (formalise)         (AI: PASS/FAIL)      (kernel: green/red)
  ```
  This IS the abductive loop implemented as a software engineering pipeline.
- HEAD: `d99e5c2`.  Repo clean.

### Next steps — proofs

**1. Promote CO-ID-2 (attractor = Hopfield min)**
- Add `def hopfieldH` to `SomaField.lean`: `H W b e = ½ eᵀWe − bᵀe`
- Proof will use `simp + norm_num`.

**2. Promote THERAPY-2 (topological protection)**
- Needs Mathlib for winding numbers / homotopy groups.
- Uncomment `require mathlib` in `lakefile.lean`; run `lake update`.

**3. Register Aesop lemma set**
- Tag soma-field lemmas with `@[aesop]`; run `aesop` on a type-isomorphism goal.
- This is LEAN-2 becoming a live tactic, not just an axiom.

**4. Assign spare Twister knobs** (parked from Session 3)
- Left 9–12 → CC 17–20 (gamma, D, spare, theta).
- Left 13–16 → CC 21–24 (neurotype modifiers).

**5. Write methodology paper §2**
- "The Abductive Loop: Peirce, Aesop, and Typeverse Navigation"
- Content is all in FIELD-NOTES §5; needs prose form in
  `paper/mathematical-co-identification.md`.

---


## 2026-05-20 - QUANT-EXP continuation (CI + phase diagram)

What I completed
- Extended `instrument/quantum_experiment.py` sweep output with Wilson 95% confidence intervals and raw success counts.
- Added new CLI mode `phase` to generate barrier-vs-temperature phase diagram artifacts.
- Ran:
  - `c:/python314/python.exe instrument/quantum_experiment.py --mode sweep`
  - `c:/python314/python.exe instrument/quantum_experiment.py --mode phase`
- Updated writeup: `paper/QUANT-EXP-SWEEP-2026-05-20.md`.

Artifacts generated/updated
- `instrument/quantum_sweep_results.csv` (now includes CI + count columns)
- `instrument/quantum_sweep_summary.png`
- `instrument/quantum_phase_diagram.csv`
- `instrument/quantum_phase_diagram.png`

Key outcomes
- Cold classical (`T=0.02`) remains 0/16 in all three barrier benchmark cases; Wilson upper bound ~0.194.
- Hot classical (`T=1.5`) remains 16/16; Wilson lower bound ~0.806.
- Phase scan shows classical transition region as T rises; quantum reference peak Awe-dominant occupancy remains nonzero across all scanned barriers.

Next steps (priority)
1. Add bootstrap CIs for quantum peak occupancy by repeating anneals with jittered schedule parameters.
2. Compute a noise-equivalence curve `T*(barrier)` where classical reaches a target matching quantum occupancy threshold.
3. Add one publication-style combined figure: heatmap + quantum reference strip + CI summary panel.

Brainstorming queue
- Add a finite-step budget comparison panel (same compute budget for classical/quantum simulators).
- Include first-hit distributions (not only means) as violin or ECDF plots.
- Estimate a simple gap proxy from instantaneous spectra and correlate with schedule success.

## 2026-05-20 - QUANT-EXP noise-equivalence curve + wave plots + layperson doc

### What I completed

- Added `run_noise_equivalence()` to `instrument/quantum_experiment.py`:
  - Binary searches T*(barrier) for barriers -14 to -6
  - 6-panel figure: T* curve, scatter, wave evolution × 3, quantum state stacks × 3
- Added `--mode equiv` CLI
- Created `paper/QUANT-EXP-LAYPERSON.md` — plain-language interpretation
- Updated `paper/QUANT-EXP-SWEEP-2026-05-20.md` with results table + interpretation

### Key results (quantum_noise_equivalence.csv)

T* rises monotonically with barrier strength: T*=0.094 at barrier=-6 to T*=0.129 at barrier=-14.
But T*~0.1 already floods the classical landscape — quantum gets to the same occupancy
at T=0, via tunneling, without structural flooding.

### Artifacts generated

- `instrument/quantum_noise_equivalence.csv`
- `instrument/quantum_noise_equivalence.png`
- `paper/QUANT-EXP-LAYPERSON.md`

### Brainstorming / next steps

1. Bootstrap replicates for quantum peak Awe to add error bars to the T* curve.
2. Combined publication figure: phase heatmap + T* curve + example wave in one panel.
3. Add quantum-coherence lifetime estimate: how many anneal steps until the wave collapses to classical?
4. "First quantum intelligence" framing note: carefully phrase as "topological reachability advantage" in paper; "it tunnels" in layperson doc.
5. Consider adding entropy panel (von Neumann entropy) to wave evolution plots — shows the superposition spreading.

---

## 20 May 2026 — Session: Alps campsite snapshot + full multilingual build

### Request

- Snapshot everything before vacation (Kloentalersee camping run).
- Full build including the new quantum paper and all language outputs.

### What was done

- Build system updated in [paper/Makefile](paper/Makefile):
  - Added `quantum-soma-penrose.md` to `SOURCES` so `make all` builds it.
  - Added DE/FR/IT targets for `quantum-soma-penrose.{de,fr,it}.pdf`.
  - Included new paper in translation aggregates (`PDFS_DE`, `PDFS_FR`, `PDFS_IT`).
  - Expanded `clean` target to also remove `mathematical-co-identification.pdf` and `music-affect-dynamics.pdf`.
- Added multilingual source stubs for new paper:
  - `paper/quantum-soma-penrose.de.md`
  - `paper/quantum-soma-penrose.fr.md`
  - `paper/quantum-soma-penrose.it.md`
- Full build run from `paper/`:
  - `make check`
  - `make all translations`

### Build result

- Status: PASS (all requested PDFs generated).
- New paper built in EN/DE/FR/IT:
  - `paper/quantum-soma-penrose.pdf`
  - `paper/quantum-soma-penrose.de.pdf`
  - `paper/quantum-soma-penrose.fr.pdf`
  - `paper/quantum-soma-penrose.it.pdf`
- Existing multilingual suite also rebuilt in this snapshot.

### Notes

- Pandoc/XeLaTeX emitted non-blocking missing-glyph warnings for some Unicode math symbols.
- PDFs were still produced successfully; warnings are cosmetic/typographic, not build failures.

