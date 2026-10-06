# Current Work

## Purpose

Resume [T]-Theory work quickly. Read this file, then `SOURCES.md`,
`THEORY-STATUS.md`, and the brief for the active task.

## Now (6 Oct 2026): admin before release - ISS-044

Agreed plan in ISSUES.md ISS-044: README front door, Makefile command
handlers, HAL vocabulary (T.Dot/DESIGN.md), `.OBSOLETE`, one chat process.
Do that first, then the scope check and UAT below. Chat: `write_a_book`
(Me/chats/Inbox). Done 6 Oct evening: HAL runs on Git Bash (platform checks,
dry run `-n`, HAL.cmd, `copilot start|save|wrapup`, `chat new|list`), one bash
standard in U.Dot. Next: the author runs `U.Dot/bin/HAL1 -n init` then
`HAL1 init` on the laptop; then `mother ask` / `hal ask` / `uat scope`.

## Course book night (5 Oct 2026, 01:00-03:30) - state for the next session

[T]-Theory: A Course (ISS-041), `make -C Part2/book/field-atlas-textbook check`
-> `bld/textbook/ttheory-course.pdf` (A4 portrait, about 265 pages; HTML too).
Complete draft, all pushed:
- Part 0 toolkit M1-M6; Part I chapters 1-4 (new 3 Frequencies, new 4 Zooming
  from Atlas T3); Part II ladder 5-12; Part III 13 Eleven Dimensions (T4),
  14 Dark Sectors (T5), 15 Evidence and Proof (T6 + QUANT-EXP-1 lab);
  appendices A-F lettered, F = Reading with the Field Atlas (atlas-map.yaml).
- Numbering generated (Lua + pandoc-crossref, BUILD.md 4b).
- `{{Visualize}}` (docs/VISUALIZE.md, BUILD.md 4c): 52 figures drawn from
  equations, many with `expect_*` checks; retrofitted into chapters 5-8, 10-12.
- Every quoted number in `scripts/verify_answers.py` (several hundred checks).
Also done by 03:45: chapter-opening banners for the new chapters (Visualize
`opener=true`), Visualize in chapters 1, 2, 5-8, 10-12 (65 figures in all),
Maths You Need boxes in every chapter, breakable boxes (254 pp), glossary
+26 terms, HTML double-caption fix in shared plates.lua (Atlas too).
release-check: 15 PASS, 0 FAIL after all of it.
Next: the author's read-through; Visualize for chapter 9 (needs a flock
primitive); decide whether the course ships in this release. pandoc-crossref 0.3.25 lives in `%LOCALAPPDATA%\Pandoc` (ISS-043).

## Morning: UAT release candidate (prepared 2026-10-04, 00:30)

Everything below is built, checked and pushed. Start with step 1.

1. P21 sign-off (you): read `bld/papers/cosmological-constant-derivation.pdf`
   (cover now renders correctly). If happy, set P21 `status: pending-upload`
   in `Dist/PAPERS.yaml`, then `make generate` in U.
2. NotebookLM UAT (you): new private `nlm-uat` notebook, upload from
   `uat/staging/papers/` and `uat/staging/ttheory/` (hashes in each
   `MANIFEST.md`); run Sherlock, Harry Potter, Cookie Monster (PROCESS.md);
   log in `paper/UAT.md`.
3. Lulu preview of the volumes (you).
4. Promote: `make dist` (copies candidates into Dist), compare against the
   manifests, commit Dist. Do not run it before UAT passes: I ran it early
   tonight and reverted Dist to 4e5a42c.
5. Zenodo (needs your tokens in the environment): sandbox plan and drafts,
   then live. Plan already passes: 44 records, 0 errors.

Not in the UAT tracks but built and current: textbook
(`bld/textbook/ttheory-course.pdf`, A4 course book; HTML in
`bld/textbook/html/`), Field Atlas (`bld/atlas/field-atlas-a3.pdf`, 200 pp).
Decide whether they ship in this release.

New tonight: tours and observatory mode (ISS-038). `#tour=cell-to-cosmos`,
`#tour=gravity`, `#tour=blue-rubber-ball`, `#tour=whats-different`,
`#tour=textbook` in the app; OBSERVATORY toggle and `/tour`, `/tours`, `/play`
in the MOTHER terminal. Upload `bld/app/observatory-guide.md`
(`make observatory-guide`) to the MOTHER and H-AL notebooks before trying
observatory answers. Spec: `docs/TOUR-LANGUAGE.md`.

Also new tonight: HAL speech (ISS-037). Tick SPEAK in the MOTHER terminal; H-AL
speaks in the HAL 9000 Piper voice via the bridge (installed in the bridge
venv; model in `~/.voice-admin/models/hal9000/`, private).

Outstanding, not for this release: ISS-011 HopfieldNet2 port (probe in `../probe-nn`);
ISS-036 five Lean sorries and the `euler_lagrange_BRECVEMA` restatement;
OSforGFF PR mrdouglasny/OSforGFF#22 awaiting review; ISS-037 voice follow-ups;
optional cleanup `git worktree remove ../U-lean-v433`.

## Resume Here (updated 2026-10-03, 23:45)

Done 2026-10-03 (all pushed): build standard (`docs/BUILD.md`; Make + pandoc +
Lua, POSIX recipes, one root `bld/`); papers, Fractal Thesis and Field Atlas on
it; programme papers cited, not bare ids (`lib/format/programme-refs.lua`,
release-check section 14); Lean upgraded to v4.33.0 on main (25 libraries, 0
errors; `make lean-update`; upstream PR mrdouglasny/OSforGFF#22); Lean
appendix (D2) now has all 25 proof files; two SomaField sorries closed (five
remain); ISS-011 HopfieldNet2 assessment (fork plan, port probe in
`../probe-nn`). Dist PROMPTS.md gained an "Observatory walk-throughs" section
(the blue rubber ball; Dist 4e5a42c).

Fixed 2026-10-03 22:00: `programme-refs.lua` walked into explicit citations,
so `[@P1; @P10]` rendered as one narrative cite and dropped P1. It now skips
Cite elements. Every book, paper and Atlas build that uses the filter
picks this up at its next rebuild.

Course book ([T]-Theory: A Course, `Part2/book/field-atlas-textbook/`, A4 portrait + HTML,
`make -C Part2/book/field-atlas-textbook check a4 html`; was the A3 textbook edition until 5 Oct):
- ALL TEN chapters rewritten to the model standard (textbook A3 52 pp): learning objectives,
  worked examples (Strategy / Solution / Significance), Worked Homework with
  full solutions, "Try it" app links, Penrose chapter baselines, every number
  checked in `scripts/verify_answers.py`, shared prose checker passes.
  Ch3 "Lines as poles" (percept-as-pole, P1/P3 COID-PROP-1, Lean theorem);
  ch4 Hodgkin-Huxley simulated banner, cable Green's function, Hopfield,
  FM-HN (P13) with labels; ch5 double well, Kramers (checked against a
  simulation), fast-in/slow-out (P10), memory kernel, critical slowing,
  QUANT-EXP-1 (P2) labelled `simulated`, "brains tunnel" marked not claimed.
- Layout: boxes are unbreakable (breakable tcolorbox inside multicols left
  headings alone at column tops); `\raggedcolumns`; `\needspace` before
  sections and before full-width tables (textbook-layout.lua).
- Promised forward links to keep: critical slowing for the climate in
  Chapter 8; two people falling into step in Chapter 6; stellar
  classification by hydrogen lines and 21 cm mapping in Chapter 9.
- Ch6 Adler/Kuramoto (simulated, matches theory), applause, coupled landscapes;
  DyadicField coupling theorem labelled "Lean proof incomplete" (depends on
  `dyadic_block_decomp` sorry; Lean comments corrected). Ch7 Vicsek banner,
  topological neighbours, turn wave vs diffusion (attanasi2014information
  added to bibliography), swarm propagator arithmetic plus set-up cost.
  Ch8 radioactive clocks, plates, Coulomb + fluid pressure (Glarus),
  rate-and-state memory, Gutenberg-Richter, ice-albedo bistability, P16.
- Ch9 Wien/Stefan-Boltzmann, Cannon/Payne + Saha-Boltzmann Balmer peak,
  parallax, lifetimes, GPS relativity, rotation curves. Ch10 Hubble,
  Friedmann, CMB, acoustic peaks, P21/P22 7/11 3/11 1/22 (Lambda ratio is
  H0-independent), coincidence problem and falsifiers.
- Appendices A (constants), C (glossary as key-terms), D (answer key
  describes inline solutions), E (credits), F (References heading) done.
- Fixed 2026-10-03 23:40: `citeproc: true` in lib/defaults/base-*.yaml ran
  citeproc twice (duplicate reference lists in the textbook). Removed;
  BUILD.md rule 4a updated. Atlas still 200 pp, 156 unique references.
- STOP POINT (author, 2026-10-03 23:26): do NOT start the "stax"/tour work
  (`#tour=` language, observatory mode) until the author says so.
- Release reminder: books and papers pick up the programme-refs and
  citeproc fixes at their next rebuild; rebuild before release.

Agents: write content and review myself; agents only for mechanical jobs.

## Resume Here (updated 2026-10-02, 23:20)

Session 2026-10-02 (evening). Pushed: Penrose index 7e46b57, baseline
sources 2f6a1be, app work 83dc48f (window manager + clean mode `ui=clean`,
era themes incl. art movements, MOTHER CHAT|SHELL, dyad/cellular demos).

In progress when paused or interrupted (uncommitted; check `git status`):
- Atlas Part I theory REWRITE (`Part2/book/field-atlas/theory/`): first
  attempt failed review (85% templated filler, broken M-theory figures,
  figures lost in A3 multicols). Rewrite brief: no padding, checker
  `scripts/check_prose.py` must pass, 12-18k real words, >= 25 figures,
  figures must appear in both PDFs.
- Atlas plates: `capture.mjs --only atlas-plates` (clean 4D/8D/11D captures,
  renderer anchors) -> `scripts/plates.py` -> triptych + callout plates in
  `figures/plates/`, replacing console screenshots in the level spreads.
- Then: OpenStax-style edition in a separate folder with its own build (CC BY
  figures from BASELINE-SOURCES.md, licence-checked); then PAUSE (author's
  instruction).
- Later: final A3 print check; Piper HAL voice; offline MOTHER/H-AL (Ollama);
  Zenodo (needs author tokens).

Note: Copilot can stop without warning when prepaid budget runs out; agents
then die mid-task. Commit each verified piece promptly.

## Resume Here (paused 2026-10-02, 00:20)

Done on 2026-10-01 evening (all pushed; last commit 76c498e):
- H-AL persona (MOTHER | H-AL switch, API mode) — 8c2bc96.
- High-DPI fix for compare / 3D SBS; A3 Atlas picture pages now use
  full-screen 16:10 captures (1920x1200 @2.585) with a caption band — 67ae40f.
- Time axis (`registry/eras.yaml`, TIME / ERA slider, `era=`), What's
  Different? tours (`registry/questions/`, `q=`, flagship gravity + time
  bending), 8D hysteresis / 11D QUANT-EXP-1 demos (`dynamics.js`), and the
  differences ledger `DIFFERENCES.md` — 76c498e.
- Field Atlas Part I theory restoration is in progress in `Part2/book/field-atlas/theory/` with original theory figures in `figures/theory/`.
- MOTHER/H-AL terminal now has CHAT history/completion plus opt-in local SHELL (Git Bash / venv Python / Neovim when installed).

Active 2026-10-02: adding era themes to the Soma Machine time axis with sourced historical maths and art-movement idea cards; coordinator commits.
- Panel window manager / Clean Mode now lives in `apps/instrument/visuals/soma-field-operator/panels.js` (`H`, `Esc`, `ui=clean`, `labels=off`).
- Field Atlas plate refresh in progress: clean `atlas-plates` capture, anchor JSON, triptych/callout compositor, and atlas integration replace app-manual screenshots as primary figures.

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
- 2026-10-02 evening: extended the same STATE panel to DYAD (Adler/Kuramoto
  drift/slip/lock with re-lock time) and CELLULAR-SYNAPTIC (cable decay,
  spike threshold, refractory memory, and 11D transition grammar).

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
  "no sorries"; five real `sorry`s remain (see `THEORY-STATUS.md`).
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