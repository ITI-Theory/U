---
fields: issue=ISS-055
---

# Sherlock: every document's claims checked, and the programme's claims compared

**Issue:** [ISS-055](../../../ISSUES.md#iss-055-sherlock-three-ways-of-reasoning-over-opencyc-consistency-proof-analogy--open)

## Scope

Author, 11 Oct: do all of the essential and next items; then the two later
items (structure-mapping analogy; the Law book's affidavit chapter and the
Russell reading). Parked: QP simulation, HermiT explanations, sketches. All
papers and books are rebuilt anyway, and Sherlock touches every one.

Done so far (ISS-055): OpenCyc (NextKB) in Lean 4 + Aesop, microtheories as
scopes (`sherlock/`, `make -C sherlock`); `docs/SHERLOCK.md`; the findings
report; paper SH1 with exhibits A (The Tensor), B (three containers),
C (the Claude advert); exhibit D, ZSF (P11), with the first ledger against
the programme's own Lean.

## End state

1. Every paper and book has an affidavit: its checkable claims, each with
   the quote and line it comes from, a verdict and an evidence label, frozen
   to a commit and SHA-256. The author disposes of each finding: fixed in a
   new version, or kept as an exhibit.
2. `make -C sherlock affidavits` re-checks everything (part of the release
   gate) and reports findings per document.
3. Claims about the programme's own Lean (theorem names, axioms, sorries,
   "kernel-checked") are checked against the Lean, programme-wide.
4. Values quoted in more than one document agree, or the disagreement is a
   finding.
5. Structure mapping compares affidavits: "where else is this structure
   claimed?", the containers test, precedent for the Law book.
6. The Law book has an affidavit chapter (claims, exhibits, precedent) and the
   Philosophy book reads the history of philosophy (Russell) as affidavits.

## Design decisions (made for the end state)

- **D1. Claims are data; Lean is the judge.** Each affidavit's claims live in
  `registry/affidavits/<doc>.yaml`: id, quote, lines, kind, reading, formal
  form, verdict, label, the Lean theorem that proves it, disposition. The
  Lean files prove; the registry describes. One format feeds the findings
  report, the release gate, cross-document values (4), structure mapping (5)
  and the Law chapter (6). A check ties each finding to an existing,
  compiled theorem.
- **D2. One relational vocabulary.** Formal forms use OpenCyc constants and
  CycL-shaped sentences (predicate and arguments), including numeric claims
  (`quotedValue doc quantity value unit`). Programme concepts used by several
  documents (the Soma-Field, scale levels, the score) are defined once, in a
  shared `TTheoryVocabularyMt` inheriting `UniversalVocabularyMt`, not per
  paper. Structure mapping needs the same predicates across documents.
- **D3. A microtheory per document, and per reading.** `<Doc>Mt` inherits
  `TTheoryVocabularyMt`; two readings of one claim get two microtheories.
  Cross-document consistency is a microtheory inheriting several document
  microtheories: a contradiction there is between documents.
- **D4. Freeze and version.** An affidavit names its document's commit and
  SHA-256. When a document is fixed, its new version gets a new affidavit;
  the old one stays (precedent, for the Law book).
- **D5. Python extracts and reports, Lean decides.** Scripts read sources and
  write data (JSON, YAML, reports); Lean reads data at run time where it
  judges many items (the ledger) rather than having Lean generated, except
  the knowledge base itself.
- **D6. Cost-aware layout.** Arithmetic affidavits are core Lean (seconds);
  OpenCyc typing imports `UniversalVocabularyMt` (1-5 minutes, a few GB),
  one module at a time; anything that changes the generated KB (rules)
  means an overnight rebuild, run by the author.
- **D7. AI extracts, a person or a second check confirms.** The extraction
  prompt is in `docs/SHERLOCK.md`; one in eight candidates was wrong on ZSF,
  so every candidate is verified before it becomes Lean.

## Sub-issues and order

1. ISS-056 claims registry and validator (D1-D4; migrate exhibits A-D).
2. ISS-057 chain finder.
3. ISS-058 programme-wide ledger.
4. ISS-060 mapping assistant (NextKB lexicon).
5. ISS-059 an affidavit for every paper and book; release gate; SH1 update.
6. ISS-061 values quoted across documents (fills in during ISS-059).
7. ISS-062 OpenCyc's simple rules into Lean (overnight rebuild).
8. ISS-063 structure mapping over affidavits (later).
9. ISS-064 the Law book's affidavit chapter and the Russell reading (later).

## Documents (ISS-059)

Papers: P1 soma-field-paper, P2 quantum-soma-penrose, P3
mathematical-co-identification, P4 soma-field-synthesis, P5
soma-physical-substrate, P6 soma-field-book, P7 soma-field-patient-pov,
P8 the-tensor (done, exhibit A), P9 music-affect-dynamics, P10
soma-temporal-dynamics, P11 zoomable-somatic-field (done, exhibit D), P12
experimental-validation, P13 missing-limbic-layer, P14 usf-euclidean-qft,
P15 usf-interacting-qft, P16 geographic-somatic-field, P17
gestalt-field-dynamics, P18 preverbal-manifold, P19 swarm-propagator, P20
universal-somatic-field, P21 cosmological-constant-derivation, P22
dark-matter-spatial-vacuum, P23 ttheory-phenomena, P24 g2-symmetry-breaking.

Books and others: the fifteen domain books (C2-book-01 to C2-book-15), the
course book (Part2 field-atlas-textbook), CS1 the cheatsheet, D1
SFT-DEMO-CASE, D2 the Lean proofs appendix (ledger), SH1 itself.
