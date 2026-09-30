# Corpus Entry Manifest

This file defines the first-pass reading architecture for the
philosophy/visual-operator design work. It deliberately uses the existing
omnibus Markdown bodies rather than a hand-picked subset of papers or books.

The omnibus files are generated reading snapshots. They are the correct entry
points for synthesis; their constituent source files, the paper registry, and
Lean proofs remain the authority for an individual claim when a question needs
resolution.

## Packet

- `docs/agent/CURRENT.md` — active architecture, priorities, and guardrails.
- `docs/agent/THEORY-STATUS.md` — required evidence labels and wording discipline.
- `docs/agent/PHILOSOPHY-ATLAS-BRIEF.md` — requested design problem and first deliverable.

## Programme and Release Context

- `PROCESS.md` — build and release workflow.
- `ISSUES.md` — canonical open work, especially `ISS-001`, `ISS-031`, and `ISS-035`.
- `paper/FIELD-NOTES.md` — read only its final 100 lines for the latest historical research context.

## Omnibus Reading Anchors

- `paper/bld/omnibus-body.md` -- the Soma-Field collected papers omnibus.
- `Part2/fractal-programme/bld/ttheory-omnibus-body.md` -- the complete
	[T]-Theory fractal-programme books omnibus.

Start with these two files. Do not create replacements or manually merge their
members. When an omnibus makes a claim whose exact source or status matters,
resolve it through the canonical registry and the named underlying source.

## Visual Operator Application

The app relevant to this work is the JavaScript/Three.js Visual Operator, not
the Python instrument server.

- `apps/instrument/visuals/soma-field-operator/README.md` -- visual language,
	runtime contract, source authority, and generated-data boundary.
- `apps/instrument/visuals/soma-field-operator/operator-theory.yaml` -- visual
	routes, scale transitions, and claim boundaries.
- `apps/instrument/visuals/soma-field-operator/GEMINI-OPERATOR-BRIEF.md` --
	accepted visual-operator requirements and implementation constraints.
- `apps/instrument/visuals/soma-field-operator/SOMA-MACHINE-MVP.md` -- current
	product and interaction context.

## Chat Research Corpus

The raw chat corpus is intentionally retained in `Me/chats/`, outside this U
repository. It is original research/process material, not disposable prompt
history. New files enter unchanged through `Me/chats/Inbox/`.

No chat omnibus is defined by this manifest yet. Do not infer that omitted chat
material is unimportant, public, or safe to delete. The next corpus task is to
choose the existing chat-derived reading files and record their provenance
without duplicating or rewriting the raw archive.

## Required Agent Response

1. State that this manifest was read and no repository-wide search was performed.
2. Begin with the two omnibus anchors and the Visual Operator contract.
3. Separate source-backed statements from assumptions, interpretations, and open hypotheses.
4. Follow the book-only deliverable in `PHILOSOPHY-ATLAS-BRIEF.md`; do not
	substitute an Atlas, app, ontology, or Lean proposal.
5. Do not run builds, install packages, access the network, or generate
	derivative OpenStax content.
