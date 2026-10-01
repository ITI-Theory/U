# App and Atlas Design: Registry, Models, Paths

Status: proposal for author review (2026-10-01). Evidence base: an architecture
review of `apps/instrument/visuals/soma-field-operator/` and
`Part2/book/wave-atlas/` on 2026-10-01.

## Problem

The app has no single source of truth. `operator-theory.yaml` declares itself
the authority but is never read; runtime data lives in five hand-written JS
tables (`theory-atlas.js`, `scale-morphisms.js`, `system-partonomy.js`,
`cheat-sheet-registry.js`, `zoom-implementations.js`) that disagree: sigma 7 is
"Whole Brain" in one and "Animal Swarm" in another; levels are counted as 0-19,
1-20, and `Fin(21)`. Scenes are hard-coded in `main.js` (quantum foam, cells,
astral, organism-to-flock), so a new level touches about seven files and a new
path touches `main.js`. The README already forbids new hard-coded tables and
plans `make operator-generate`; nothing implements it yet.

## Decision (author, 2026-10-01)

No global level numbering. Levels are nodes with stable ids; paths are graphs
over levels; a model is a named set of paths that assigns its own coordinates.
The existing USF models become data:

- `canonical-5`: the five physics-derived bands (I-V);
- `universal-21`: the twenty-one-tick ladder (the Wave Atlas dial, 0-20);
- `bird-flock`: a named solution (bird, flock, colony roost).

## Registry layout

One registry, shared by the app, the Wave Atlas, the books, and Sherlock:

```text
registry/
  levels/<level-id>.yaml        one node: substrate, length scale, operator,
                                equation, Physical/Field/Mind rows (Atlas plate
                                grammar), claim badge per layer, sources
                                (paper ids), renderer id, partonomy, lenses
  paths/<path-id>/path.yaml     a graph: nodes (level ids) and edges
  paths/<path-id>/edges/<from>--<to>.md
                                front matter: preserves, retypes, adds,
                                kernel, render operation, claim badge;
                                prose: what changes at this step
  models/<model-id>.yaml        named set of paths; per-level coordinate and
                                label for this model
  lenses.yaml                   T-Theory off/on; 4D, 7D, 8D, 11D;
                                affect OFF / INTERPRETIVE / HUMAN-CLINICAL
  eras.yaml                     time axis (Big Bang to the present), seeded
                                from the Philosophy book's Appendix C
  concepts/<concept-id>.yaml    later (Sherlock): ontology class, Lean type,
                                status, papers, levels
```

Rules: every displayed claim carries FORMAL, SOURCED, or INTERPRETIVE (mapped
to the six evidence labels in `THEORY-STATUS.md`); cross-substrate edges never
assert literal identity; publication metadata stays in `Dist/PAPERS.yaml`.

## Generator and renderers

- `make operator-generate` validates the registry (schema, dangling ids,
  missing renderers, claim badges) and emits one generated app-data module, a
  renderer coverage report, and Wave Atlas plate fragments.
- A renderer registry: one JS module per renderer id (`renderers/quantum-foam.js`
  and so on), registered by id. Missing ids render as labelled placeholders.
  Scenes leave `main.js`.
- The Wave Atlas plates and app screenshots come from the same level files, so
  the Atlas can include a screenshot per level and per extra system (for
  example belief systems) without separate authoring.

## Lenses

- **T-Theory off**: ordinary 4D physics only; every [T]-Theory layer is hidden.
  Users add layers back one at a time, each with its claim badge.
- Display axis: `4d-baseline`, `7d-usf-field`, `8d-life`, `11d-mind`,
  independent of zoom.
- 3D: the scene is already Three.js 3D; stereo output (side-by-side,
  top-bottom, anaglyph, or WebXR) is a renderer option chosen for the
  projector.

## First vertical slice

1. Registry skeleton with the existing levels migrated (no new content).
2. Generator plus renderer registry; quantum foam moved out of `main.js`.
3. T-Theory off/on lens.
4. Quantum Foam to Thoughts: thoughts and emotions as noise-driven threshold
   crossings (Langevin noise lifting a mode above `T_c`), visually like the
   foam, badged INTERPRETIVE. The papers treat the soma field as classical, so
   the app must not call these quantum events.

## Later

- Penrose, *The Road to Reality*: a private chapter-to-equation-to-level index
  built from the author's text copy; the app shows standard equations and
  cites the chapter, never Penrose's prose or figures (copyright).
- Sherlock concept registry: concept, ontology class (OpenCyc/OWL), Lean type
  (Mathlib, PhysLib, or programme), proof status, papers, levels; gaps become
  visible.

## Open questions

- Which stereo input does the 3D projector accept (side-by-side, top-bottom,
  frame-sequential)?
- Should `universal-21` keep the Wave Atlas labels (Scale 7 = Animal Swarm)
  or the app's (sigma 7 = Whole Brain)? A level id per substrate removes the
  clash; the model then only orders them.
