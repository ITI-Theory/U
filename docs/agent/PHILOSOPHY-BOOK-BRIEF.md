# Philosophy Book Brief

## Commission

Write the philosophy volume of the [T]-Theory Fractal Programme as source-owned
Markdown:

- `books/T-Theory/philosophy/book-philosophy.md`
- `books/T-Theory/philosophy/booklet-philosophy.md`

Registered title: *The Hard Problem Dissolved: Consciousness as Phase
Transition* (`book-philosophy` in `books/T-Theory/books.yaml`). Agreed new
title: *[T]-Theory: Philosophy*; every book will carry the "[T]-Theory:"
prefix. The subtitle is open. Update the `books.yaml` title with the book.

This book replaces the generated Book 7 in `build_fractal_books.py`
(`id: consciousness`). That volume is a short AI-generated introduction and
conclusion wrapped around seven embedded papers; it contains no Bertrand
Russell, neutral monism, Nagel, or Sherlock. Use it as a quarry, not a model.

## What Kind of Book This Is

Agreed with the author on 2026-10-01:

1. **The last book.** It wraps up the whole programme: papers, the fifteen
   domain books, the Soma Machine, and Sherlock.
2. **Written as a philosopher would.** An outside, retrospective philosophical
   treatment of [T]-Theory for philosophers: the book someone else might write
   ten years after the programme worked. It is not today's philosophy of
   science. It does not impersonate any real philosopher; the author remains
   Alistair Johnson.
3. **Russell's method: philosophy as effect.** Russell's *A History of Western
   Philosophy and Its Connection with Political and Social Circumstances from
   the Earliest Times to the Present Day* describes what philosophers did to
   their societies and why they were useful. The Soma field is a theory of
   response (the propagator), not of the push. The book reads the history of
   philosophy as the social field's response to philosophical impulses.
4. **Time-invariance.** The papers already make the response grammar
   time-translation invariant (P10: memory kernel $K(t-t')$, retarded
   propagator with $\delta(t-t')$). The book reads the history of philosophy
   through that grammar: the same kernel across eras, with changing parameters.
   Cite P10; do not re-derive it.
5. **Soma Machine time axis.** The app (named after Hawkwind's *Silver
   Machine*) is intended to run from an expanded Big Bang, through standard
   geological and palaeontological models, into human history, where each era
   shows how its society thought through its philosophers (for example
   Pythagoras). The book supplies that human-history layer. The current app
   code has response time only; `SOMA-MACHINE-MVP.md` defers historical and
   cosmological timelines.
6. **Sherlock is philosophy, not a framework.** It is the book's account of
   modern philosophy of knowledge representation. In OWL, order does not
   matter: a knowledge base is a set of assertions plus entailments (instances,
   implied facts). A paper is ordered and promissory: the abstract claims, the
   proof follows. A program is ordered. Sherlock concerns what happens to
   knowledge as it moves between these forms, bridged to Lean. It is the modern
   counterpart to Russell's logical atomism and type theory.

## Working Outline

The chapter-by-chapter proposal is in `PHILOSOPHY-BOOK-OUTLINE.md` (draft for
author review). Its six parts: the object; Russell's method; the
time-invariant history; knowledge, order, and proof; the hard problem
revisited; wrap-up.

The philosophy content must still cover explanation, models, evidence,
prediction, falsification, underdetermination, abduction, ontology,
AI-assisted research, and formal verification.

## Evidence Discipline

Use `THEORY-STATUS.md` labels throughout. In particular:

- A Lean theorem establishes only its formal statement under its definitions
  and axioms (see the consciousness-threshold example in `THEORY-STATUS.md`).
- QUANT-EXP-1 is a simulation result.
- Cosmological numbers are model-derived comparisons.
- Clinical and lived-experience material is testimony and hypothesis, not
  medical mechanism.
- Chat and notebook material is research history, not authority; AI-generated
  hashes, certificates, citations, and "verified" claims are discarded unless
  confirmed in the repository.

## Deliverable Boundary

Produce the two source files. Do not claim they have been built. Makefile
registration, app changes, and edits to published papers are separate tasks
(papers change only through new Zenodo versions). The book must include a
clearly labelled Sherlock source-note appendix identifying which ideas still
need formal, empirical, or source-level verification.

## Open Questions for the Author

- The subtitle.
- Which Russell primary texts anchor Part II (*History*, *The Analysis of
  Mind*, *The Analysis of Matter*, logical atomism, type theory).
- The canonical Sherlock vocabulary (Sherlock, Moriarty, DOT, Sheer Luck, ASO).