# Theory Status Ledger

Use these labels in all proposals and drafts. A label describes the evidence
state; it is not a rhetorical flourish.

| Label | Meaning |
|---|---|
| `kernel-verified` | A named Lean theorem compiles without `sorry` in the named proof surface. |
| `derived-under-assumptions` | A mathematical result follows from explicitly stated assumptions, axioms, or model choices. |
| `simulated` | A computational model or numerical experiment produced the stated output. |
| `empirical-result` | A documented measurement or experiment produced the stated result. |
| `interpretive` | A conceptual mapping, explanatory reading, or philosophical position. |
| `open-hypothesis` | A proposed claim with a stated path to formal or empirical discrimination. |

Visual Operator badges map onto these labels: `FORMAL` means
`kernel-verified` with a named file and theorem; `SOURCED` means a named paper,
cheat sheet, or citation; `INTERPRETIVE` means `interpretive` or
`open-hypothesis`.

## What a Lean Theorem Establishes

The kernel checks a formal statement against its definitions and axioms. It
does not check that the definitions mean what the prose says. The standard
example is `UniversalSomaticField.lean`:

```lean
noncomputable def consciousnessThreshold : ℝ := Real.sqrt 2
def isConscious (φ : LimbicAmplitude) : Prop := consciousnessThreshold ≤ φ
theorem consciousness_dichotomy (φ) : isPreconscious φ ∨ isConscious φ :=
  lt_or_ge φ consciousnessThreshold
```

This is `kernel-verified` as a statement about real numbers. That consciousness
is a threshold crossing of a limbic amplitude is `open-hypothesis`: it needs an
operational measure and empirical calibration of the threshold.

## Proof Surface Facts (checked in source, 2026-10-01; not rebuilt)

- Toolchain `leanprover/lean4:v4.31.0`; direct dependencies are Mathlib,
  Physlib, and OSforGFF (Aesop arrives transitively through Mathlib).
- `paper/FieldAxioms.lean` is an axiom registry (20 axioms), for example
  percept-as-propagator-pole and attractor-as-Hopfield-minimum. Results that
  depend on it are `derived-under-assumptions`, not `kernel-verified` facts
  about the world.
- Seven real `sorry`s in four files: `BRECVEMAVariational.lean` (2),
  `DyadicField.lean` (2), `SomaField.lean` (2), `SomaNetwork.lean` (1). Prose
  that says "no sorries" across the whole surface is wrong until these close.
- Many theorems are true by definition, `rfl`, `decide`, or arithmetic. Label
  them as such when they are cited in prose.
- `MTheoryIsomorphism.somaField_iso_mtheory` is a type/product isomorphism,
  not a physical M-theory derivation.
- The Osterwalder-Schrader results apply imported OSforGFF theorems to the
  Gaussian free field; identifying that field with the USF is interpretive.

## Core Evidence Boundaries

- QUANT-EXP-1 is an exact 8-qubit (256-state) statevector simulation; no
  quantum hardware was used. It shows model-class reachability, not runtime
  advantage, therapy, or consciousness.
- Cosmological numbers ($\Omega_\Lambda = 7/11$, $\Omega_{DM} = 3/11$) are
  model-derived comparisons that depend on named compactification and GR
  axioms. They are not independent confirmation.
- M-theory compactification, the Universal Somatic Field, and cross-scale
  mappings keep their stated assumptions. Distinguish analogy,
  mathematical co-identification, and identity.
- Clinical, trauma, and lived-experience language (including the author's N=1
  case) is testimony and hypothesis, not established medical mechanism.
- Chat and notebook material is research history. AI-generated hashes,
  certificates, citations, and "verified" or "production" claims are discarded
  unless confirmed in the repository.

## Current Open Extension

`ISS-035` proposes path-sensitive transition dynamics. It extends, rather than
replaces, the energy-landscape account:

- A local barrier describes the cost of a state change at a point in state space.
- A path-sensitive account asks whether cumulative action or coordination cost
  across many constrained micro-transitions limits the transition.
- Candidate formalisms include minimum-action and stochastic-path models; a
  literal Feynman path integral is not assumed.
- This is an `open-hypothesis` until its state space, action functional,
  predictions, and discriminating evidence are defined.

## Required Wording Discipline

Every new book section, app explanation, Atlas panel, or agent report must
distinguish:

1. what the source explicitly proves or measures;
2. what follows under stated assumptions;
3. what is an interpretation;
4. what remains an open research proposal.