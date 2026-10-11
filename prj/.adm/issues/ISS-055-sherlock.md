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
7. **Sherlock is a compiler for papers, and its registry is the mind palace**
   (author, 11 Oct): an edit re-checks what it touches; every claim, value and
   analogy lives in one relational vocabulary; the Soma Machine is the way in,
   its zoom across the scale levels the walk through the palace (claims and
   findings shown where they live). Design for it: everything Sherlock knows
   is data in the registry, addressable by document, claim, scale level and
   concept, so the app can show it.

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
- **D8. Claims are anchored by their quote, not by line numbers** (author,
  11 Oct: "if I delete a line, is that an error or an improvement?"). A delta
  re-finds each claim's quote in a new version and classifies it:
  unchanged (lines moved), edited (re-extract, re-check), gone (a
  contradicted finding gone is probably the fix; a supporting claim gone, or
  a value other documents quote, is a warning); text no claim covers is new
  and gets the extraction prompt, on the delta only. Sherlock proposes, the
  author confirms. Line numbers are derived.
- **D9. Numbers are data.** Arithmetic claims use a small library of Lean
  templates (count equals list length, two values differ, sum, ratio within
  a range, monotone) that read their values from the registry, so an edited
  number is re-checked without editing Lean. Hand-written Lean stays for
  what the templates cannot say.
- **D10. Equations have formal twins.** A labelled equation gets a formal
  twin (SymPy or Lean) and the document a symbol table (each symbol's type
  and unit, declared once); Sherlock checks that the LaTeX and the twin
  agree, the units (an exponent must be dimensionless: delete the t from
  e^{-iEt/ħ} and it fails), unbound variables and values at the paper's own
  parameters. Arbitrary LaTeX is not parsed. Visualize's `expect_*` checks
  are the first, partial form of this.
- **D11. Language models at the ends, Lean in the middle** (author, 11 Oct).
  A language model extracts claims and proposes mappings at the start
  (candidates, D7); Lean decides; NotebookLM is the final UAT check, a
  reader's eye on the published version (do the fixes read right; does a
  reader still find the problem). The NotebookLM experiments measure how far
  a model gets alone; a locally run model with Sherlock choosing what it sees
  (chain finder, the slice) is the comparison: retrieval by Lean, explanation
  by the model.

## The end-to-end slice (author, 11 Oct: "the red way")

Every feature first working, roughly, on P11; then each refined; then all
documents. State of the slice:

- Registry and validator (ISS-056): `registry/affidavits/` for P11 and P22,
  `sherlock/registry.py check|report` (frozen SHA-256, every quote found in
  the frozen text, lines in range), `Tools/Names.lean` (every cited theorem
  exists), `TTheoryVocabularyMt` shared by the document affidavits.
- Chain finder (ISS-057): `sherlock/chain.py genls|isa|disjoint`, printing
  the Lean term; it found the richer chain for P11's percept (an
  `IntentionalMentalEvent`).
- Ledger (ISS-058): `sherlock/ledger.py extract|judge|report` with
  `Ledger/Judge.lean`, one Lean process per programme module (environments
  cannot be shared: OSforGFF and Physlib both define `SpaceTime`; one process
  for all reached 31 GB). On P11: 52 citations; the seven "kernel-checked"
  claims rest on no sorry; `universe_is_11D_organism` "axiom" is a def.
  To refine: "was an axiom; it is now a theorem" read as "axiom"; library
  names cited bare (`exp_pos`); table columns headed "Axiom".
- Mapping assistant (ISS-060): `sherlock/lookup.py WORD` (FrameNet semantic
  translations, canonical names, constant names, with comment, isa, genls).
- Values across documents (ISS-061): `bld/sherlock/values.md`; P11 and P22
  agree on 3/11, 7/11 and 0.2645; P11's two internal disagreements flagged.
- Rules (ISS-062): `sherlock/gen_rules.py`: 408 Horn rules (233 not Horn, 1
  unrestricted) in `CycRules`, importing only `Cyc.Rules` (`Sees m n`): no
  facts rebuild, so no overnight build. A rule fires (`Queries/Rules.lean`).
  Rules naming a constant in their conclusion are tried first (80%), fully
  general ones last (10%), or the search loses itself in `isa_genls`.
- Delta (D8): `sherlock/delta.py ID [--rev|--file]`; a scratch copy of P11
  with five edits was classified right (fix, two edits with changed numbers,
  lost support with the cross-document warning, new text).
- Structure mapping (ISS-063): `sherlock/sme.py` with
  `registry/analogies/zsf-double-wells.yaml`: P11's "identical in structure"
  (molecular and limbic double-wells) maps at 66%; candidate inferences: a
  process that minimises the limbic potential (as protein folding does the
  molecular one), eigenmodes of the CEMI field; trapping and the traumatic
  basin have no molecular counterpart.
- Law and Russell (ISS-064): the Law chapter takes its cases from the
  registry (claims, frozen exhibits, dispositions; a delta between versions
  is the record of what was argued and changed, D4, D8) and its precedent
  search from structure mapping over affidavits (MAC/FAC). The Russell
  reading writes each philosopher's position as a small affidavit in the
  same vocabulary (D2), so SME can show which positions share structure
  across centuries, the time-invariance the author wants from Russell.
## Refinement (11 Oct, evening)

- Registry: all four affidavits (The Tensor, the Claude advert, P11, P22),
  26 Lean theorems and 14 template checks; claims carry `levels` and
  `concepts` (the mind palace index, `bld/sherlock/palace.json`).
- D9 numbers as data: `Tools/Checks.lean` reads `checks.json` and adds one
  kernel-checked theorem per check (`decide` on exact rationals); a wrong
  number fails with the claim named.
- D10 equation twins: `sherlock/equations.py` (units without dependencies,
  the Visualize expression syntax): symbols declared, both sides alike,
  exp/log/sin arguments dimensionless, values at the document's numbers.
  P11's six equations pass (its neural wavenumber is 41.9 for "≈ 40");
  e^{-iEt/ħ} without its t fails ("the argument has dimension s^-1").
- Ledger over all papers (186 citations, 28 documents, about 9 minutes, one
  Lean process per module): 16 disagreements after refining the reading
  (table columns, was/now, clauses, status columns, tactics, Sherlock's own
  names, namespaces). Real: P13 cites `softmax_limit_argmax`,
  `energy_descent_modern` and `correspondence_limit`, named only in a
  comment of LimbicHopfield.lean, never declared; P19 cites
  `Rat.div_lt_div_right`, not in the current Mathlib; P11's axiom table
  (four "axioms": one axiom, one def, two theorems) and the axioms it omits;
  P20 and P21 list axioms but omit their cited modules' own.
## Can a language model do Sherlock's job? (11 Oct, NotebookLM)

Notebook Sherlock-UAT (private; `Me/notebooklm/Sherlock-UAT/sources.yaml`):
P8 and P11 as sources, and OpenCyc three ways: all of NextKB (898 files,
10.6M words, `sherlock/fulltext.py`, 24 sources; one 6.8 MB part failed to
process and went up in halves), Sherlock's slice (`sherlock/pack.py`, 487
constants, 32k words) and one microtheory, UniversalVocabularyMt (3.6M words,
12 sources). `sherlock/nlm_test.py --exp N` asks five questions per
condition (three need OpenCyc typing, two are arithmetic controls) and keeps
answers in `bld/sherlock/nlm-exp<N>.json`. Asks over all of OpenCyc are
expensive: four of them used the whole five-hour window.

Exp0, first two questions (none vs all of OpenCyc): with everything, Gemini
cites real OpenCyc facts (Fear, Shame, Grief are EmotionalQuantityType;
Safety maps to Security-Emotion, as Sherlock found) but misplaces Curiosity,
says Language as an emotion "would create a category error" without citing
the disjointness or deriving it, and hedges; on "the same film" it reasons
about type and token as well without OpenCyc as with it, and never finds
`genlWorks`, OpenCyc's relation for exactly this. Retrieval of prominent
facts works; finding the specific relation and chaining facts into a proof
do not. Still to run: exp0 Q3-Q5, exp1 (the slice), exp2 (one
microtheory): does slicing help a language model, when the Lean reasoner
needs none?
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
