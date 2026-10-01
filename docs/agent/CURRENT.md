# Current Work

## Purpose

Resume [T]-Theory work quickly. Read this file, then `SOURCES.md`,
`THEORY-STATUS.md`, and the brief for the active task.

## Resume Here (paused 2026-10-02, 00:20)

Done on 2026-10-01 evening (all pushed; last commit 76c498e):
- H-AL persona (MOTHER | H-AL switch, API mode) — 8c2bc96.
- High-DPI fix for compare / 3D SBS; A3 Atlas picture pages now use
  full-screen 16:10 captures (1920x1200 @2.585) with a caption band — 67ae40f.
- Time axis (`registry/eras.yaml`, TIME / ERA slider, `era=`), What's
  Different? tours (`registry/questions/`, `q=`, flagship gravity + time
  bending), 8D hysteresis / 11D QUANT-EXP-1 demos (`dynamics.js`), and the
  differences ledger `DIFFERENCES.md` — 76c498e.

Next, in the author's order of interest:
1. Rebuild the A3 Atlas (`python build_atlas.py --a3`; it now has the Time
   Axis and What's Different? sections) and recheck before printfactory.ch.
2. Penrose index: chapter/equation index of *The Road to Reality*
   (`C:\Users\alist\OneDrive\tmp\books\road to reality-roger penrose.pdf`)
   mapped to level ids and difference classes; no verbatim text. Other useful
   baselines in that folder: OpenStax Astronomy 2e / Psychology 2e /
   Introduction to Philosophy (CC BY), Physical Geology 2e, Carroll & Ostlie,
   Juslin, Koelsch, Gabriel *Fields of Sense*.
3. More "same poke, different outcome" demos (dyad phase-lock, cellular
   threshold) from `DIFFERENCES.md` section 3.
4. Cosmetic: gravity-scene clock labels cut at the compare split; world-space
   label boxes under side panels.
5. Still queued: Zenodo tokens + sandbox run; MOTHER terminal (xterm.js,
   Git Bash tab); Piper HAL voice; offline MOTHER/H-AL (Ollama).

Agent note: background agents are cancelled if the author's message interrupts
a blocking tool call; launch them, then end the turn.

## Active Task: the Philosophy Book

Brief: `PHILOSOPHY-BOOK-BRIEF.md`. The philosophy volume is the programme's
last book: a philosopher's retrospective treatment of [T]-Theory, organised
around Russell's history of philosophy as the history of philosophy's effects,
the time-invariant response grammar, the Soma Machine's time axis, and
Sherlock as modern philosophy of knowledge representation.

State on 2026-10-01:

- Both anchors, the Sherlock/Russell/origin chats, the Collected Works
  notebook, `uat/`, the Lean surface, and the Visual Operator have been read.
- First full draft written: `books/T-Theory/philosophy/book-philosophy.md`
  (Prologue, 19 chapters, Appendices A-D; about 88,000 words), plus
  `booklet-philosophy.md` and a rewritten `book-philosophy` record in
  `books.yaml`. Drafted in parallel, then fact-checked and label-checked;
  the source file is now the single authority for the text.
- The generic `book-%`/`booklet-%` rules build it
  (`make bld/booklet-philosophy.pdf bld/book-philosophy.pdf`, about 270
  pages). The Makefile `DOMAINS` list still names this domain
  `consciousness`; aggregate targets do not include it yet.
- 63 new references were added to `paper/bibliography.bib` (normalised to
  LF); `russell1910` now lists Whitehead first.
- Awaiting author review of voice, label density, and the subtitle.

## Fractal Thesis Status (2026-10-01, overnight)

- All fifteen books are source-owned (`books/T-Theory/<id>/book-<id>.md`):
  original prose in each field's voice (Volume I books about 12,000 words,
  Volume II about 16,000; Philosophy about 88,000), a reading guide per
  embedded paper, an evidence ledger, fact-checked and hardened, with every
  reference resolved in `paper/bibliography.bib`.
- Print volumes print each canonical paper once; later books show a
  cross-reference. Last build: Volume I 681 pages, Volume II 649 (cap 800).
- Titles follow "[T]-Theory: <Name>" across parts, volumes, `books.yaml`,
  and booklets. Cheat-sheet text is hardened and labelled.
- Papers hardened (72 edits across 23 papers; Lean appendix generator and
  one Lean doc comment updated). Published papers need new Zenodo versions.
- P7 (`soma-field-patient-pov`) had lost 25 lines (end of front matter,
  epigraph, opening of "A Note on Method") in the 2026-05-30 restructure;
  restored from `60110e2`. Any P7 or paper-omnibus PDF built since 30 May
  may show the damaged opening: check before Zenodo or Lulu.
- Full candidate build passes (2026-10-01 03:30): omnibus 1,296 pages,
  Volume I 680, Volume II 655, all fifteen standalone books, zero citation
  warnings.
- Next: visual QA of the PDFs, NotebookLM check, Lulu preview (author), then
  the app and Atlas.

## Release Hand-off (2026-10-01, 04:10)

- Candidates built in U: `paper/bld/omnibus-a4.pdf` (427 pages),
  `books/T-Theory/bld/ttheory-vol1.pdf` (680), `ttheory-vol2.pdf` (655),
  `ttheory-omnibus.pdf` (1,296), all fifteen domain books and booklets.
- Staged for NotebookLM UAT with SHA-256 manifests (re-staged 2026-10-01
  late morning): `uat/staging/papers/` (every changed paper and dataset plus
  the omnibus) and `uat/staging/ttheory/` (thesis, both volumes, Philosophy,
  Gateway booklet). The earlier `ttheory` stage held stale August builds:
  `uat/manifest.yaml`, the Lulu cover jobs, `check_lulu_pages.py`,
  `release-check`, and `PROCESS.md` still pointed at the retired
  `Part2/fractal-programme/bld`; all now use `books/T-Theory/bld`.
- Zenodo is scripted: `bin/zenodo-publish` (`plan`, `new-version`, `create`;
  sandbox first; drafts by default; live publish needs `--publish --yes`;
  refuses Dist files whose SHA-256 is not in a staging manifest). Metadata:
  `Dist/zenodo/metadata.yaml`. Tokens: `ZENODO_SANDBOX_TOKEN`, `ZENODO_TOKEN`.
- Dist registry updated: `discipline` and `level` on every record; public
  Zenodo titles kept, with `source_title` for the paper's own title (P2, P4,
  P20 renamed for hardening); statuses current; book records retitled.
- Author decision (2026-10-01): UAT is ready but not started; the app and
  Atlas review comes first so errors found there reach the release.
- t-theory.org: QR assets already encode `https://www.t-theory.org/` and all
  U renderers use them (ISS-032). Remaining: site content in
  `ITI-Theory/t-theory.org`, domain check, and `Dist/stuff/t-theory-sticker.png`
  (old GitHub QR).
- Lulu (author): preview Volumes I and II and the paper omnibus, then order.
  Promote to Dist with `make lulu` (or the copy rule) after acceptance.
- Zenodo new versions needed (content changed 2026-10-01): D1, D2, P1-P20
  (P11 and P12 were already `needs-new-version`). P4's standalone title is now
  "The Soma-Field Research Programme: Method, Model, and Computational Test"
  (the registry title "A Synthesis" is unchanged). First uploads: P21
  (pending-review), P22, P23, P24 (pending-upload).
- Build environment notes: `paper/mk/common.mk` hard-codes `PYTHON`; run
  `make PYTHON=python ...` here. `omnibus-a4` needs Perl for latexmk (Git for
  Windows: `C:\Program Files\Git\usr\bin` on PATH). `make -B` fails on the
  `bld` directory rule; delete targets instead.

## App, Atlas, MOTHER, UAT automation (2026-10-01)

Design and decisions: `APP-ATLAS-DESIGN.md` (canonical set, brainstorm).

- **Registry** (`registry/`) is the single source for app and Atlas: 31
  levels (`<id>.yaml` data + `<id>.md` Atlas entry text), 10 canonical paths
  (graphs; one `edges/<from>--<to>.md` per step), models `canonical-5` (I-V
  bands), `universal-21` (0-20) and `bird-flock`, `lenses.yaml`, worked
  examples (`examples/`), SpaceEngine object checklist (`catalogues/`).
  New level `human-group`; `animal-to-church` and `community-to-institution`
  merged into `human-assembly-to-institution` (old links aliased). Every
  level has a characteristic response time τ (order of magnitude).
- **App** (`apps/instrument/visuals/soma-field-operator/`): all 31 levels
  have dedicated renderers (`renderers/*.js`, auto-registered; guide in
  `renderers/README.md`); fluorescence-microscopy cells and circuits,
  false-colour astronomy, QCD-vacuum and 3D foam isosurfaces. Features:
  deep links (`level`, `path`, `lens`, `model`, `reader`, `compare`,
  `contours`, `styleoff`), T-Theory lens, 4D|T compare view with worked
  example cards, CONTOURS, RICE panel (fluorescence / false colour / glow /
  motion), Poke on wall-clock time with per-level τ, optional Web Audio
  (poke resonator, drone, BRECVEMA mechanisms), human breathing and
  heartbeat, library panel, reader registers, SBS 3D.
- **MOTHER** (Settings): OFF / WEB (copy question with the view as context,
  open the public notebook `https://notebook.google.com/notebook/16368cb3-6c5f-47b3-8e79-781b77084944`)
  / API (local bridge `apps/instrument/mother/`, notebooklm-py, unofficial,
  author's login, localhost only). Live-tested: grounded, cited answers in
  about 40 s that separate established science from interpretation.
- **Field Atlas** (`Part2/book/field-atlas/`): rebuilt as a reference atlas
  from the registry (`atlas.yaml` + `build_atlas.py`): front matter, five
  sectors of level spreads (data panel, app plates lens off/on, entry text,
  worked examples, transitions), Part II models, Part III paths, back
  matter; about 65,000 words, ~226 pages. Old first-person draft and
  personal material deleted (author decision). Plates: `npm run capture`.
- **UAT automation**: `uat/scripts/nlm_uat.py <papers|ttheory>` creates a
  private notebook, uploads `uat/staging/<track>/`, asks each worksheet item
  (re-verifying), and writes `uat/results/<track>-<stamp>.md`; a human
  transfers accepted findings to the worksheet.
- Not yet checked: 3D SBS on the Dangbei Atom; audio by ear.
- Next: review UAT results; recapture plates and rebuild the Atlas; then
  Lulu and Zenodo.
- 2026-10-01 evening: added `registry/questions/` records for Soma
  Machine/Field Atlas "What's Different?" tours (`#q=<id>`). Flagship:
  Einstein gravity/time bending remains locally GR where tested; [T]-Theory
  adds a derived-under-assumptions cosmological Lambda origin and the
  dark-matter spatial-vacuum fraction. Later: MOTHER GO buttons and per-level audio explainers;
  type guard (dependent types on/off with a generated Lean file); Penrose
  chapter index; Sherlock concept registry.
- 2026-10-01 evening: built the time axis. `registry/eras.yaml` now drives the
  app `TIME / ERA` control (`#era=<id>`) and the Field Atlas Time Axis section;
  era prose keeps sourced science separate from Appendix C interpretations.
- 2026-10-01 evening: added Soma Machine dimension-dynamics demos for the
  human/vertebrate level with the T lens on: 4D damped poke return, 8D
  Langevin double-well hysteresis plus P10 memory, and 11D QUANT-EXP-1
  simulated tunnelling replay.

## Book Architecture

- Reader-facing book content is source-owned Markdown under
  `books/T-Theory/<domain>/`.
- Makefiles own the build graph; `lib/format/macros.lua` owns reusable Pandoc
  directives. Lua transforms source into presentation and is not a content
  store.
- A booklet is front matter with `book_id` plus the `{{Booklet...}}` macros.
  Its text comes from the matching record in `books/T-Theory/books.yaml` and
  the shared `books/T-Theory/booklet/booklet_body.md`.
- The Gateway is exceptional: its noir page precedes the local TOC
  (`books/T-Theory/format/gateway-template.tex`).
- PDF-only inserts use `{{AddPDF ...}}` or `{{AddBooklet ...}}`.

## Deferred Work (agreed, not started)

In the author's order (2026-10-01; target: Fractal Thesis to the printer
before Monday 2026-10-05):

1. Fractal Thesis: every book source-owned, padded, and hardened; each paper
   printed once per print volume (in progress).
2. Paper omnibus: harden the papers (including the Planck decision below and
   any `ISS-035` path-integral change); new Zenodo versions only through the
   Papers track.
3. Visual app (Soma Machine / Soma Field Operator): bring it up to date with
   the papers, books, and the philosophy book's time axis (Appendix C).
   First registry-driven slice done; see "App and Atlas: First Slice".
4. Field Atlas: use app screenshots at all twenty levels, plus the extra
   systems at each level (for example belief systems).

Not now: completing *Phase Dot* (valuable but not core; the philosophy book
already treats it as an incomplete source record).

## Notebook Review (2026-10-01)

The seven notebooks added on 2026-10-01 were triaged against everything
already read. Verdict: little new theory; most is NotebookLM restating the
programme with inflated certainty. *The Rosetta Stone of Systems and
Processes* is a re-export of the Rosetta notes chat. Usable material, by
roadmap item:

- **Done:** P21 used $H_0 = 70$ for $\Lambda_\text{USF}$ but Planck $H_0$ for
  $\Lambda_\text{obs}$; fixed (1.01 vs 1.09 $\times10^{-52}$ m$^{-2}$), and
  "$\Omega_\Lambda(z)$ = const" corrected to "$\Lambda$ ($\rho_\Lambda$) is
  constant".
- **Decision needed (cosmology):** P21/P22 compare against rounded values
  (0.683, 0.265, 0.049). Exact Planck 2018 (TT,TE,EE+lowE+lensing) gives
  $\Omega_\Lambda = 0.6847$, $\Omega_c \approx 0.2645$, $\Omega_b \approx
  0.0493$, $H_0 = 67.36$: discrepancies 7.1%, 3.1%, 7.8% (not 6.8%, 2.9%,
  7.2%). Adopting them breaks the "within 3%" dark-matter theorem in
  `paper/proofs/CosmologicalConstant.lean`, so papers and Lean change
  together. The Lean doc comments `dΩ_Λ/dz = 0` (CosmologicalConstant,
  G2Compactification, LocalGR) share the $\Omega_\Lambda(z)$ wording error.
  P22 could add a falsifiable null prediction: no direct-detection signal if
  dark matter is a spatial-block vacuum without Standard Model charge.
- **Papers / ISS-035:** a path-integral change means defining a state space,
  admissible paths, an action functional (barrier sum, Kramers cost, control
  effort, or an Onsager-Machlup functional), and observables that separate
  one high barrier from many coordinated micro-transitions, including path
  history (monodromy). Host it in Temporal Dynamics (P10) or a follow-up;
  Quantum Topology (P2) keeps its WKB/instanton wording. Source:
  `Me/chats/notebooks/Papers_Omnibus_NotebookLM_UAT_Deployment_Guide/wkb_path_integral_note-v2.md`, `-v3.md`.
- **Books:** each book needs a domain introduction spread (specialist
  label, G-ID, zoom note); a per-book G-ID registry; "61 decades of
  magnitude" as the headline with twenty scales as tick marks; a print guide
  of about 32,000 words and 80-110 A4 pages per book.
- **App:** a display-mode axis `4d-baseline | 7d-usf-field | 8d-life |
  11d-mind` in `operator-theory.yaml`; a gravity view pairing a baseline GR
  render with the Green-function render; mind rank $N(\sigma)$ beside physical
  scale; the user source term $J_\text{user}(t)$ as a control; a benchmark
  suite for validation. Keep theory data out of browser JS (README freeze).
- **Field Atlas:** a twenty-scale G-ID registry; Physical/Field/Mind parallel
  layout; notebook figures 1, 2, 4, 5 are usable only if redrawn and badged
  `INTERPRETIVE`.
- **Quarantined:** the claim that autism is pre-verbal C-PTSD (at most a
  research question); the C-PTSD pilot protocol (needs ethics, consent, and
  safeguarding before any use); the post-operative case (N=1 field note);
  all NotebookLM "verified", "zero sorries", and "proves" statements.

## Known Issues

- `paper/soma/lean-proofs-appendix` and several generated book passages say
  "no sorries"; seven real `sorry`s remain (see `THEORY-STATUS.md`).
- Published papers change only through new Zenodo versions. Flag problems;
  do not edit published papers in place.

## Focused Checks

```bash
cd books/T-Theory && make -B bld/book-gateway.pdf bld/booklet-gateway.pdf
bin/issues-check
git diff --check
.venv/Scripts/python paper/scripts/paper_status.py
```

## Guardrails

- Run `git status -sb` before any commit.
- Do not present an interpretation, simulation, or planned experiment as a
  proved or empirical result.
- Do not commit generated candidate PDFs from ignored build directories.
- Do not modify legacy `gateway.md.OBSOLETE`.