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

