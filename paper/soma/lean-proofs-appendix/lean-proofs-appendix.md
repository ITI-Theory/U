---
title: "Appendix: Formal Lean 4 Verifications"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
---

# Appendix: Formal Lean 4 Verifications

## What is Lean 4?

Lean 4 is a *dependent type theory* proof assistant and programming language
developed at Microsoft Research and now maintained by the Lean FRO.  A Lean 4
file is simultaneously a proof and a program: when the Lean kernel accepts a
file, it has verified — with mathematical certainty — that every claimed
theorem follows from its stated premises, and that every definition is
well-typed.

This is a qualitatively different standard from informal mathematical argument.
An informal proof can contain gaps, ambiguities, or subtly incorrect steps that
survive peer review for years.  A Lean proof cannot: either the kernel closes
it, or it does not compile.  There is no middle ground.

## What Mathlib provides

The theorems in this appendix are built on top of **Mathlib** — the community
Lean 4 library containing over 200,000 proved results in algebra, analysis,
topology, number theory, and linear algebra.  When a proof in this appendix
writes `import Mathlib.Analysis.Matrix.Spectrum`, it is loading the entire
verified machinery of matrix spectral theory.  The Hopfield energy descent,
the propagator poles, the WKB amplitude, the M-theory isomorphism — all are
built on this verified foundation.

## What is established in this appendix

The eleven files that follow collectively establish:

| File | Core result | Status |
|---|---|---|
| `Hopfield.lean` | Hopfield energy function; Hebbian weight construction | Compiles; theorem-level declarations are cited below |
| `EmotionOntology.lean` | Final-tagless emotion algebra; 5 interpreters; LEAN-1 | Compiles; theorem-level declarations are cited below |
| `FieldProofs.lean` | Promoted axioms; `awe_is_universal` closes with `rfl` | Compiles; contains axioms and theorem-level declarations |
| `SomaField.lean` | 8D BRECVEMA soma-field; propagator resolvent | Compiles; contains kernel-verified declarations and open sorries listed below |
| `DyadicField.lean` | Dyadic propagator; co-regulation poles | Compiles; contains kernel-verified declarations and open sorries listed below |
| `LimbicTunnel.lean` | WKB amplitude; classical trapping; quantum advantage | Compiles; theorem-level declarations are cited below |
| `MTheoryIsomorphism.lean` | 11D isomorphism; organism hierarchy | Compiles; theorem-level declarations are cited below |
| `LimbicHopfield.lean` | FM-HN Correspondence Principle; clinical operators | Compiles; theorem-level declarations are cited below |
| `SwarmPropagator.lean` | O(N²) < O(NK) coordination; jam resistance | Compiles; theorem-level declarations are cited below |
| `UniversalSomaticField.lean` | Scale invariance; consciousness threshold; universality | Compiles; contains axioms and theorem-level declarations |
| `Movie.lean` | The River Film as Lean data; typeclass renderer architecture | Compiles; data and renderer declarations |

**On proof status and axioms:** Lean accepts the files, but a build is not a
file-level proof certificate. There are seven real Lean `sorry` stubs:
`BRECVEMAVariational` (2), `DyadicField` (2), `SomaField` (2), and
`SomaNetwork` (1). Individual declarations may be kernel-verified theorems,
axioms, definitions, arithmetic facts, imported theorem applications, or
sorry-backed placeholders. Open work is represented as named axioms, explicit
gap markers, or scoped future formalisation, each documented in source.

## How to verify these proofs yourself

```bash
# 1. Install Lean 4 (elan toolchain manager)
curl https://raw.githubusercontent.com/leanprover/elan/master/elan-init.sh | sh

# 2. Clone the repository
git clone https://github.com/ITI-Theory/U.git
cd U

# 3. Build the Lean project (downloads Mathlib cache — ~2 GB first run)
lake exe cache get
lake build

# 4. The proofs are in paper/proofs/
# A build means Lean accepted the file; individual declarations may be axioms,
# definitions, arithmetic, imported theorem applications, or sorry-backed placeholders.
```

The source files are reproduced in full below, in dependency order.

```{=latex}
\leanappendixstart
```

::: {.lean-include dir="proofs" order="Hopfield.lean,EmotionOntology.lean,FieldProofs.lean,SomaField.lean,DyadicField.lean,LimbicTunnel.lean,MTheoryIsomorphism.lean,LimbicHopfield.lean,SwarmPropagator.lean,UniversalSomaticField.lean,Movie.lean,QuantumSim.lean,SomaNetwork.lean,ScaleUniverse.lean,Benchmark.lean"}
:::
