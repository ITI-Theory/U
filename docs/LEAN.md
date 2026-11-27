# Lean in this repository

The standard is Mathlib's, pointed to, not copied; below are only the rules that are this programme's own.
The plan these rules serve is ISSUES.md, ISS-141 ([T]-Theory as a Lean model).

## The standard

- Style: the [Mathlib style guide](https://leanprover-community.github.io/contribute/style.html) (two spaces,
  lines under 100 characters, one tactic per line, `·` for subgoals).
- Names: the [Mathlib naming conventions](https://leanprover-community.github.io/contribute/naming.html)
  (`UpperCamelCase` for types, classes and namespaces; `lowerCamelCase` for definitions; `snake_case` for
  theorems).
- Documentation: the [Mathlib documentation guide](https://leanprover-community.github.io/contribute/doc.html)
  (a `/-! -/` module header, a `/-- -/` docstring on every definition and theorem a reader meets).

## Headers

Every Lean file starts with Mathlib's header. The licences are decided in `registry/licences.yaml`: code and
Lean proofs are Apache-2.0, the holder as written there.

```lean
/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
```

Third-party material keeps its own licence, and its header says so:

- **OpenCyc, generated from NextKB**, is NextKB's data, under CC BY 4.0, not Apache-2.0. Every generated file's
  header carries the credit text NextKB's licence asks for (`bld/sherlock/raw/nextkb/license.txt`, "To give
  credit to NextKB in software"), the source archive and its SHA-256, and what the translation changed
  (CC BY asks that changes be indicated). The generator's own code is Apache-2.0 and has our header.
- **Software that ships OpenCyc** (the `sherlock` binary, the editor extensions) shows the same credit text in a
  user-visible place, as NextKB's licence asks.
- **Papers that use NextKB** cite Forbus and Hinrichs (2017), as NextKB's licence asks.
- **Libraries we depend on** (Mathlib, physlib, OSforGFF, Aesop) are imported, never copied. A patch to one of
  them (`lean/patches/`) keeps that library's header and licence.

## The programme's own rules

- **No Python** in the model or its tools; strings only as an interpreter's output (ISS-141).
- **No Cyc vocabulary in the model.** OpenCyc's knowledge is Lean: one carrier `Thing`; a collection is a set
  of things; "every A is a B" is `A ⊆ B`, written `fact A ⊑ B`; disjointness is Mathlib's `Disjoint`; the sorts
  (the collections OpenCyc uses as argument types) are types, subtypes of `Thing`. OpenCyc's words (`genls`,
  `isa`, `Holds`) appear only in the provenance: the microtheory and fact a declaration came from.
- **OpenCyc's names as they are** (`HomoSapiens`, `BrainStem`), a deliberate exception to Mathlib's
  `lowerCamelCase` for terms, so a reader recognises them; a name with a hyphen in guillemets
  (`«Anticipation-Feeling»`).
- **Microtheories are classes** of assumptions over the carrier: their facts are fields, `genlMt` is `extends`,
  a claim that holds in one says so (`∀ T [M T], ...`). A contradictory microtheory has no instance; the
  contradiction stays a theorem about it, and Lean's kernel stays consistent.
- **`axiom` only for a paper's stated assumption**, named for what it assumes and listed by `#print axioms`.
  OpenCyc needs none (its facts are microtheory fields).
- **`sorry` only as a marked frontier**: a claim stated exactly and not yet proved. `#status` shows it.
- **Claims** are `Claim`s with a witness or a refutation as an instance (`TTheory.Claims`); their state is computed
  by `#status`, never typed.
- **A chapter** (one per paper, `TTheory/P<n>.lean`) reads like the paper: a module header naming the paper
  (its id, pointing to `Dist/PAPERS.yaml`), sections in the paper's order with a few lines of its argument,
  the equations as Lean (the paper's own proofs imported, not restated), and at the end its claims and
  `#status`.
- **Notation** of the programme's own (`⊑`, `⊔`, `⊓`) is `scoped` to the namespace that defines it.
- **At most two Lean processes at a time** on this machine (the author, 13 Oct).
