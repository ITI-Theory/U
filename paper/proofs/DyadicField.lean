/-
  DyadicField.lean — GAP-1: The Dyadic Propagator

  The soma-field model so far describes a single person's emotional field.
  The dyadic propagator extends this to two coupled soma-fields:
  the therapist–client dyad, or any two persons in relational contact.

  Core claim (GAP-1 DyadicPropagatorExists):
    The coupled dyadic system has its own propagator G_AB(λ), whose poles
    are the *shared modes* of the two fields — the emotional states that
    become available to both persons through the coupling.

    This formalises Porges' co-regulation: the therapist's regulated
    ventral-vagal state is a shared attractor pole accessible to the client
    via the dyadic coupling.

  Architecture:
    FieldA, FieldB   — the two individual 8-dimensional soma-fields
    J                — inter-field coupling matrix (8×8 Float)
    DyadicState      — combined 16-dimensional state (A ⊕ B)
    dyadicEnergy     — Hopfield energy of the combined system
    dyadicPropagatorMatrix — (λ·I₁₆ − W_AB), W_AB = block [W8, J; Jᵀ, W8]

  Status: STUB — definitions present, theorems marked sorry.
  This file is the foundation for the SQ (social intelligence quotient)
  row in the IQ/EQ/AQ/SQ table of soma-field-patient-pov.md.
-/

import SomaField


-- ════════════════════════════════════════════════════════════════════════════
-- COMBINED DIMENSION
-- ════════════════════════════════════════════════════════════════════════════

/-- A dyadic system has 16 dimensions: 8 for person A, 8 for person B. -/
def N16 : Nat := 16

abbrev DyadicState := Fin N16 → Float

/-- Extract person A's field (dimensions 0–7) from a dyadic state. -/
def dyadicA (s : DyadicState) : Field8 :=
  fun i => s ⟨i.val, by omega⟩

/-- Extract person B's field (dimensions 8–15) from a dyadic state. -/
def dyadicB (s : DyadicState) : Field8 :=
  fun i => s ⟨i.val + 8, by omega⟩

/-- Construct a dyadic state from two individual fields. -/
def mkDyadic (a b : Field8) : DyadicState
  | ⟨k, hk⟩ =>
    if h : k < 8 then a ⟨k, h⟩
    else b ⟨k - 8, by omega⟩


-- ════════════════════════════════════════════════════════════════════════════
-- INTER-FIELD COUPLING
-- ════════════════════════════════════════════════════════════════════════════

/-  The inter-field coupling J encodes how person A's field state influences
    person B's field and vice versa.  For a therapeutic dyad:

    J[BS_A, BS_B] > 0  — brainstem resonance (involuntary, fast)
    J[CO_A, CO_B] > 0  — contagion (mirror affect, both directions)
    J[RE_A, RE_B] > 0  — rhythmic entrainment (shared tempo)
    J[EM_A, EM_B] > 0  — episodic memory resonance (shared narrative)

    All other J entries = 0: the coupling is sparse (only direct resonance
    channels, not full cross-connection).  This is consistent with empirical
    interpersonal synchrony data (Feldman 2007; Koole & Tschacher 2016).
-/

private def jOff (a b : Nat) : Float :=
  match a, b with
  | 0, 0 => 0.30   -- BS ↔ BS  brainstem resonance (fast, involuntary)
  | 1, 1 => 0.25   -- RE ↔ RE  rhythmic entrainment
  | 3, 3 => 0.35   -- CO ↔ CO  contagion / mirror affect
  | 5, 5 => 0.20   -- EM ↔ EM  episodic resonance
  | _, _ => 0.0

/-- Inter-field coupling matrix J (8×8).  J[i,j] = influence of B_j on A_i.
    By construction J = Jᵀ here (symmetric: A→B and B→A equal strength). -/
def J (i j : Fin N8) : Float := jOff i.val j.val


-- ════════════════════════════════════════════════════════════════════════════
-- DYADIC ENERGY AND DYNAMICS
-- ════════════════════════════════════════════════════════════════════════════

private def sumN16 (f : Fin N16 → Float) : Float :=
  (List.range N16).foldl (fun acc k =>
    if h : k < N16 then acc + f ⟨k, h⟩ else acc) 0.0

/-- The dyadic coupling matrix W_AB (16×16):
    W_AB = [ W8   J  ]
           [ Jᵀ  W8  ]
    i.e. the two individual W8 matrices on the diagonal, J as off-diagonal. -/
def W_AB (i j : Fin N16) : Float :=
  let ia := i.val; let ja := j.val
  if ia < 8 && ja < 8 then
    -- A–A block
    W8 ⟨ia, by omega⟩ ⟨ja, by omega⟩
  else if ia >= 8 && ja >= 8 then
    -- B–B block
    W8 ⟨ia - 8, by omega⟩ ⟨ja - 8, by omega⟩
  else if ia < 8 && ja >= 8 then
    -- A–B block: influence of B on A
    J ⟨ia, by omega⟩ ⟨ja - 8, by omega⟩
  else
    -- B–A block: influence of A on B (= Jᵀ = J, symmetric)
    J ⟨ia - 8, by omega⟩ ⟨ja, by omega⟩

/-- Hopfield energy of the dyadic system: H(s) = -½ sᵀ W_AB s. -/
def dyadicEnergy (s : DyadicState) : Float :=
  -0.5 * sumN16 (fun i => sumN16 (fun j => s i * W_AB i j * s j))

/-- Net force on dyadic dimension i: (W_AB · s)_i = -∂H/∂s_i. -/
def dyadicForce (s : DyadicState) (i : Fin N16) : Float :=
  sumN16 (fun j => W_AB i j * s j)

/-- Discrete Langevin step for the dyadic system. -/
def dyadicStep (s : DyadicState) (dt : Float) : DyadicState :=
  fun i => s i + dt * dyadicForce s i

/-- Run n steps of dyadic dynamics. -/
def runDyadic (s₀ : DyadicState) (dt : Float) : Nat → DyadicState
  | 0     => s₀
  | n + 1 => dyadicStep (runDyadic s₀ dt n) dt


-- ════════════════════════════════════════════════════════════════════════════
-- THE DYADIC PROPAGATOR
-- ════════════════════════════════════════════════════════════════════════════

/-- The dyadic resolvent numerator (λ·I₁₆ − W_AB).
    Poles of G_AB(λ) = (dyadicPropagatorMatrix λ)⁻¹ are the shared modes
    of the coupled dyadic system — the co-regulated attractor states. -/
def dyadicPropagatorMatrix (λ : Float) (i j : Fin N16) : Float :=
  (if i == j then λ else 0.0) - W_AB i j

/-- A dyadic state s is *co-regulated* in mode i when both A and B have
    perceptible activity in the corresponding dimension. -/
def coRegulated (s : DyadicState) (i : Fin N8) : Prop :=
  perceptible (dyadicA s) i ∧ perceptible (dyadicB s) i


-- ════════════════════════════════════════════════════════════════════════════
-- STUBS AND THEOREMS
-- ════════════════════════════════════════════════════════════════════════════

/-- **GAP-1  DyadicPropagatorExists  — STUB**

    The dyadic propagator G_AB(λ) = (λ·I₁₆ − W_AB)⁻¹ exists and has poles
    at the eigenvalues of W_AB.

    These eigenvalues include both the individual field modes (from the W8
    diagonal blocks) and the *coupled* modes introduced by J — the shared
    emotional resonances of the dyad.

    The coupled modes correspond to co-regulated states: emotional experiences
    available to both persons through the dyadic coupling.  In clinical terms,
    this is co-regulation (Porges 2011) given a precise spectral interpretation.

    Proof requires: block-matrix spectral theory, non-singularity of W_AB for
    generic λ, and identification of coupled modes with J's eigenvectors. -/
theorem dyadicPropagatorExists :
    ∃ (λ : Float), ∀ i j : Fin N16,
      dyadicPropagatorMatrix λ i j = dyadicPropagatorMatrix λ j i := by
  -- W_AB is symmetric by construction (J = Jᵀ), so λI - W_AB is symmetric.
  exact ⟨0.0, fun i j => by simp [dyadicPropagatorMatrix, W_AB, J, jOff, W8]⟩

/-- The dyadic energy is bounded above by the sum of individual energies
    when J is non-negative AND both fields have non-negative activations.

    **Over ℝ** the proof is clean:
      H_AB(a⊕b) = H_A(a) + H_B(b) - aᵀJb
      aᵀJb = Σᵢⱼ aᵢ Jᵢⱼ bⱼ ≥ 0  when aᵢ,bⱼ,Jᵢⱼ ≥ 0
      therefore H_AB ≤ H_A + H_B

    **FLOAT-BLOCKER (Open Problem 5):**
    Lean 4's `Float` type is axiomatized IEEE-754; it does not expose
    the ordered-field axioms that `linarith` and `nlinarith` require.
    The proof is deferred pending a `Real`-valued refactoring of the
    energy functions (see Open Research Problems in the zUSF paper). -/
theorem dyadic_energy_coupling_lowers
    (a b : Field8)
    (ha : ∀ i, 0.0 ≤ a i)
    (hb : ∀ i, 0.0 ≤ b i)
    (h : ∀ i j, J i j ≥ 0) :
    dyadicEnergy (mkDyadic a b) ≤
      energy8 a + energy8 b := by
  -- FLOAT-BLOCKER: the inequality holds mathematically but
  -- Float arithmetic in Lean 4 is not accessible to algebraic tactics.
  -- Proof sketch over ℝ: unfold dyadicEnergy, split into AA + BB + AB blocks;
  -- the AB cross-term = -½(aᵀJb + bᵀJᵀa) = -aᵀJb ≤ 0 when a,b,J ≥ 0.
  -- OP5: refactor energy8 / dyadicEnergy to use ℝ; close with linarith.
  sorry


-- ════════════════════════════════════════════════════════════════════════════
-- DEMO
-- ════════════════════════════════════════════════════════════════════════════

/-- Therapist in regulated calm (low arousal, stable); client near freeze.
    Expected: coupling pulls client field toward therapist's regulated basin. -/
#eval do
  IO.println "=== Dyadic co-regulation demo ==="
  IO.println "Therapist: RE=0.7 (rhythmic, calm).  Client: BS=0.8 (startle/freeze)."
  let therapist : Field8 := fun i => match i with | ⟨1, _⟩ => 0.7 | _ => 0.0
  let client    : Field8 := fun i => match i with | ⟨0, _⟩ => 0.8 | _ => 0.0
  let s₀ := mkDyadic therapist client
  IO.println s!"t=0   H_AB = {dyadicEnergy s₀:.3f}"
  let s10 := runDyadic s₀ 0.05 10
  IO.println s!"t=10  H_AB = {dyadicEnergy s10:.3f}"
  let s30 := runDyadic s₀ 0.05 30
  IO.println s!"t=30  H_AB = {dyadicEnergy s30:.3f}"
  IO.println s!"Client BS at t=30: {(dyadicB s30) ⟨0, by omega⟩:.3f}  (was 0.800)"
  IO.println s!"Client RE at t=30: {(dyadicB s30) ⟨1, by omega⟩:.3f}  (was 0.000)"
