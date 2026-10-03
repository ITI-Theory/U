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

The twenty-five files that follow collectively establish:

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
| `QuantumSim.lean` | Minimal quantum simulator; two-state WKB-gate reachability | Compiles; 5 theorems, no axioms |
| `SomaNetwork.lean` | Common typeclass interface for Hopfield-style networks | Compiles; 2 theorems, 1 open sorry (`sft_ne_classical`) |
| `ScaleUniverse.lean` | `T_TheoryUniverse`: the scale-indexed dependent type, with Physlib field types per scale | Compiles; 3 theorems |
| `Benchmark.lean` | Timed comparison of network update rules (1982, 2016, 2020, FM-HN) | Compiles; executable benchmark, no theorems |
| `BFSSIsomorphism.lean` | Correspondence with a simplified BFSS matrix model | Compiles; 9 theorems, 2 axioms |
| `BRECVEMAField.lean` | Typed 8D to 7D map from the BRECVEMA field to `CompactX7` | Compiles; 2 theorems |
| `BRECVEMAVariational.lean` | Neurodynamical Lagrangian; G₂ holonomy target | Compiles; 4 theorems, 2 open sorries listed below |
| `LocalGR.lean` | Local gate: linearised general relativity | Compiles; 2 theorems, 3 axioms (standard GR premises) |
| `LocalGeometry.lean` | Local gate: compact geometry | Compiles; 5 theorems, 2 axioms |
| `CosmologicalConstant.lean` | Vacuum amplitude $\Lambda \equiv \langle \operatorname{tr}\Phi\rangle_0$ and its dimensional bookkeeping | Compiles; 17 theorems, no new axioms; inherits the gate axioms above, so results are derived under assumptions |
| `G2Compactification.lean` | Geometric architecture of the 11D compactification | Compiles; 6 theorems, 1 axiom |
| `RenormalisationGroup.lean` | Structural renormalisation-group equations for the field | Compiles; 2 theorems, 1 axiom |
| `TemporalDynamics.lean` | Causality of the retarded propagator | Compiles; 4 theorems, no axioms |
| `USF_OSAxioms.lean` | The free field in four dimensions satisfies all Osterwalder–Schrader axioms, by identification with the Gaussian free field proved in the OSforGFF library | Compiles; 4 theorems, no axioms of its own |

**On proof status and axioms:** Lean accepts the files, but a build is not a
file-level proof certificate. There are five real Lean `sorry` stubs:
`BRECVEMAVariational` (2), `DyadicField` (2), and
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

# 3. Fetch dependencies, apply the one-line compatibility patch in
#    lean/patches/v4.33/, download the Mathlib cache (~2 GB first run) and
#    build all 25 libraries (Lean, Mathlib and physlib v4.33.0)
bash lean/upgrade-build.sh        # or: make lean-update

# 4. The proofs are in paper/proofs/
# A build means Lean accepted the file; individual declarations may be axioms,
# definitions, arithmetic, imported theorem applications, or sorry-backed placeholders.
```

The source files are reproduced in full below, in dependency order.

```{=latex}
\leanappendixstart
```

::: {.lean-include dir="proofs" order="Hopfield.lean,EmotionOntology.lean,FieldProofs.lean,SomaField.lean,DyadicField.lean,LimbicTunnel.lean,MTheoryIsomorphism.lean,LimbicHopfield.lean,SwarmPropagator.lean,UniversalSomaticField.lean,Movie.lean,QuantumSim.lean,SomaNetwork.lean,ScaleUniverse.lean,Benchmark.lean,BFSSIsomorphism.lean,BRECVEMAField.lean,BRECVEMAVariational.lean,LocalGR.lean,LocalGeometry.lean,CosmologicalConstant.lean,G2Compactification.lean,RenormalisationGroup.lean,TemporalDynamics.lean,USF_OSAxioms.lean"}
:::
