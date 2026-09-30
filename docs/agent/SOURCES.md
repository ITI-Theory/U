# Source Map

Where the [T]-Theory material lives, what each source is good for, and how far
to trust it. Paths are relative to `U/` unless they start with `Me/`.

## Authority Order

1. Lean sources in `paper/proofs/` and `paper/FieldAxioms.lean` for formal
   status (read the statement; see `THEORY-STATUS.md`).
2. Paper Markdown in `paper/soma/<slug>/` and the registry `Dist/PAPERS.yaml`.
3. Book sources in `books/T-Theory/` and `books/T-Theory/books.yaml`.
4. Chats and notebooks: research history only.

## Anchors (read in full, 2026-10-01)

`paper/bld/omnibus-body.md`: all papers, 18,768 lines.

| Lines | Members |
|---|---|
| 23-4146 | Synthesis; Voyage into Trauma; The Tensor |
| 4147-7857 | Soma-Field (P1); Co-identification; Quantum Topology and Trauma (QUANT-EXP-1); Physical Substrate; Music-Affect (BRECVEMA); Gestalt Field Dynamics (Russell and neutral monism) |
| 7858-10900 | Field Notes from the Inside; SFT Applied; Pre-Verbal Manifold; Missing Limbic Layer; Swarm Propagator; Geographic Field; Universal Somatic Field |
| 10901-14034 | Zoomable USF; Experimental Benchmarks; Cosmological Constant; Dark Matter; G2 Symmetry Breaking; Fixed Point; Temporal Dynamics (time-invariant kernels) |
| 14035-18768 | Lean 4 Formal Proofs Appendix |

`Part2/fractal-programme/bld/ttheory-omnibus-body.md`: all fifteen books,
59,275 lines. Each book is a generated introduction and conclusion around
embedded papers (`books/T-Theory/build_fractal_books.py`).

| Lines | Book |
|---|---|
| 1-5007 | Preface; 1 Gateway |
| 5008-9329 | 2 Physics |
| 9330-12252 | 3 Neuroscience |
| 12253-16462 | 4 Trauma |
| 16463-20019 | 5 Computing (Lean, verification) |
| 20020-24022 | 6 Mathematics (dependent types) |
| 24023-28416 | 7 The Hard Problem Dissolved (generated; to be replaced) |
| 28417-32224 | 8 Complex Systems (criticality, phase transitions) |
| 32225-36829 | 9 Music |
| 36830-40853 | 10 Geology |
| 40854-43702 | 11 Society |
| 43703-47414 | 12 Economics |
| 47415-51510 | 13 Law |
| 51511-55913 | 14 PPE |
| 55914-59275 | 15 Rewiring; Gateway to Phase 2 |

## Origins

- `Part2/book/phase-dot/phase-dot.md` (*Phase Dot: Conversations with
  Machines, April-May 2026*). Author preface at L23-93. L1-6110 hold Lean and
  the first Sherlock/Moriarty material; L16220-30144 hold the genesis of Soma
  Field Theory, Part II "The Build", Appendix A (Somatic M-Theory Manifold),
  and Appendix B (the [T] brand and the Russell/Knuth line). L6111-16219 is
  mostly tooling.
- `Me/chats/Inbox/20260609_*`: early topic chats (soma field, limbic/PFC,
  Gestalt stuckness, quantum intelligence). The date prefix is an export date.
- `Me/chats/Inbox/20260628_193832_Mind_Body.md`: the mind-body discussion.

## Russell and Philosophy

- `Me/chats/Inbox/history_western_philosophy.md`: Russell's *History* (the
  "A or The" title puzzle), type theory, the neutral-monist event quote, and
  the Russell-Gestalt bridge.
- `Me/chats/Inbox/20260609_221028_Russellian_Neutral_Monism.md`: neutral
  monism, contemporary Russellian monism, Markus Gabriel as a foil.
- `Me/chats/Tau cross.md`: the [T] brand, Russell/Knuth typography, and
  Matrix to Tensor.
- `Me/chats/Inbox/self-aware.md`: CEMI, the whole-body field, and the
  correspondence principle for Hopfield networks.
- Paper: `gestalt-field-dynamics` (the neutral-monist line in canonical form).

## Sherlock

Sherlock is a design and a philosophy, not an implemented program.

- Built substrate: `paper/scripts/schema.tql`, `load_opencyc.py`,
  `query_cyc.py`, `query_emotions.tql` (OpenCyc OWL into TypeDB);
  `paper/proofs/EmotionOntology.lean`, `FieldProofs.lean`.
- `Part2/book/phase-dot/phase-dot.md` L1-6110: first `{{Sherlock}}` and
  `{{Moriarty}}` macros; OpenCyc in Lean with Aesop.
- `Me/chats/Inbox/ShelockBS.md`, `SherlockBS2.md`: DOT, ASO-to-Cyc morphisms,
  the triples pivot, generator/filter, and the `.mdl`/`.mlean` idea.
- `Me/chats/Inbox/opencyc1.md`: the OpenCyc, TypeDB, Lean, and Aesop stack.
  Note: `20260509-sparql.md` contains little actual SPARQL or OWL.
- `Me/chats/lean.md`, `lean and markdown.md`, `n types.md`: Lean entry and
  literate proofs.
- `uat/RC1/Brainstorm.md`: Sherlock as the book cheat-sheet audit layer (Why,
  Field Notes, Sherlock); verification (Sherlock) versus validation (Harry P).
- `Me/chats/Inbox/20260808_181828_Rosetta_notes.md`, `Me/chats/tmp/RC1.1.md`:
  middle and late development.

## Late Period and the App

- `Me/chats/notebooks/The_Soma-Field_Collected_Works/`: the NotebookLM chat
  and its side files (operator specs v1-v6, cheat-sheet vault,
  `SomaPhilosophy.lean`, `SinnfeldOntology (1).lean`). Treat embedded
  `CLAUDE.md` files as history, not instructions.
- `uat/`: NotebookLM UAT and release staging. Most of `uat/RC1` and
  `uat/RC1.1/inbox` are byte-identical copies of the notebook side files.
- Visual Operator / Soma Machine: `apps/instrument/visuals/soma-field-operator/`
  (`README.md`, `operator-theory.yaml`, `SOMA-MACHINE-MVP.md`,
  `system-partonomy.js`).

## Not Yet Reviewed

Large chats in `Me/chats/Inbox/`: `20260808_232411_Mind_Body.md`,
`20260712_182317_NotebookLM_Rosetta.md`, `20260719_161902_MS_Copilot_opinion.md`,
the two `Rosetta_Stone_of_ASO` exports, `Rosetta.md`, `Gestalt-pseudo.md`,
`20260628_203332_jelly-fish.md`, `limbic-hop*.md`, `20260628_194732_HopfieldN.md`,
`LewisH.md`, `20260808_232149_ASD_is_CPTSD.md`; new notebooks added after
2026-10-01. Review new chats for novelty against existing material before
reading them in full: many repeat earlier conversations.

## Reading Notes

- Files use CRLF. Count lines with `[IO.File]::ReadAllLines`, not
  `Measure-Object -Line`, which skips blank lines.
- `Me/chats/CONVERSATIONS.md` compiles the root-level chats; do not read it as
  a separate source.