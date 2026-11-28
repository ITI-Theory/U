/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P10
import USF_OSAxioms
import TemporalDynamics

/-!
# P14 · The Universal Somatic Field as a Euclidean Quantum Field Theory

[T]-Theory's fourteenth paper, as Lean. Source: `paper/soma/usf-euclidean-qft/usf-euclidean-qft.md`;
its id, title and DOI are in `Dist/PAPERS.yaml` (P14).

P14 takes the free-field USF, `(p² + k²) φ̃ = J̃`, to the Gaussian Free Field of mass `m = k`, and
so to the five Osterwalder–Schrader axioms that OSforGFF (Douglas, Hoback, Mei, Nissim 2026)
proves for it. Here the USF measure is opaque and the identification is a context, so the master
claim is derived under that assumption, as the paper says it is. The propagators coincide once the
library's momentum convention (`(2π)²‖k‖²`) is written out. Two things the paper attributes to the
proofs are not in them: OS4 as formalised is clustering without a rate (the library proves the
covariance decays at rate `k/2`; the paper's `e^{-k|x|}` is open), and the retarded propagator
`θ(t) e^{-γt} sin(ωt)/ω` it cites `TemporalDynamics.lean` for is not the one proved causal there,
which never changes sign.

This is also the home P10's memory kernel needed: `e^{-kvτ}` is the field's correlation in
imaginary time (P10's `cEuclidean`).
-/

namespace TTheory.P14

open TTheory OSforGFF

/-! ## The identification

"`G_USF(p) = 1/(p² + k²) = C_GFF(p)|_{m=k}`" -/

/-- The USF's Euclidean propagator in four dimensions. -/
noncomputable def usfPropagator (k : ℝ) (p : EuclideanSpace ℝ (Fin 4)) : ℝ := 1 / (‖p‖ ^ 2 + k ^ 2)

/-- OSforGFF writes momentum as frequency (`p = 2πξ`): with that, the two coincide. -/
theorem propagators_coincide (k : ℝ) (ξ : EuclideanSpace ℝ (Fin 4)) :
    usfPropagator k ((2 * Real.pi) • ξ) = freePropagatorMom 4 k ξ := by
  unfold usfPropagator freePropagatorMom
  rw [norm_smul, mul_pow, Real.norm_eq_abs, abs_of_pos (by positivity)]

/-- "for the `k = 0.5` curve the program checked the peak value `1/k² = 4` at `p = 0`"; "the checked
    value at `p = 0` is `1` for the shared `k = m = 1` case". -/
theorem peaks : usfPropagator 0.5 0 = 4 ∧ usfPropagator 1 0 = 1 ∧ freePropagatorMom 4 1 0 = 1 := by
  refine ⟨?_, ?_, ?_⟩ <;> norm_num [usfPropagator, freePropagatorMom]

/-- The free-field USF's Euclidean measure: what the paper takes to be the GFF's. -/
noncomputable opaque usfMeasure (k : ℝ) [Fact (0 < k)] :
    MeasureTheory.ProbabilityMeasure (FieldConfiguration 4) := μ_GFF 4 k

/-- The identification `m ↔ k`: "identifying this representation with the physical USF remains a
    model assumption". -/
class Identification : Prop where
  eq : ∀ (k : ℝ) [Fact (0 < k)], usfMeasure k = μ_GFF 4 k

/-! ## Clustering

"The clustering axiom (OS4) states that connected two-point functions decay exponentially ...
`⟨φ(x)φ(0)⟩_conn ~ e^{-k|x|}`". OSforGFF's `OS4_Clustering` says the generating functional
factorises at large separation, with no rate. The rate is in its covariance lemma `decayBound`:
`k/2`. -/

theorem covariance_decays (k : ℝ) [Fact (0 < k)] : ∃ A : ℝ, 0 ≤ A ∧
    ∀ x : EuclideanSpace ℝ (Fin 4), 1 ≤ ‖x‖ →
      |freeCovariance 4 k x 0| ≤ A * Real.exp (-(k / 2) * ‖x‖) := by
  obtain ⟨A, hA, h⟩ := GFFPropagator.decayBound (d := 4) (m := k)
  exact ⟨A, hA, fun x hx => by simpa [freeCovariance] using h ‖x‖ hx⟩

/-! ## The retarded propagator

"The temporal dynamics companion paper contains a Lean theorem for the model retarded propagator:
`G_R(t) = θ(t) e^{-γt} sin(ωt)/ω`". The theorem (`somaticRetardedPropagator_isRetarded`) is about
`θ(τ) e^{-k v_s τ}`, which is positive for `τ > 0`; the cited form is negative at `ωτ = 3π/2`. -/

theorem not_oscillating (k vs : ℝ) : ¬ ∃ γ ω : ℝ, 0 < ω ∧ ∀ τ : ℝ,
    SomaField.Temporal.retardedDecayFactor k vs τ =
      if 0 < τ then Real.exp (-γ * τ) * Real.sin (ω * τ) / ω else 0 := by
  rintro ⟨γ, ω, hω, h⟩
  have hτ : 0 < 3 * Real.pi / 2 / ω := by positivity
  have hs : Real.sin (ω * (3 * Real.pi / 2 / ω)) = -1 := by
    rw [show ω * (3 * Real.pi / 2 / ω) = Real.pi / 2 + Real.pi by field_simp; ring,
      Real.sin_add_pi, Real.sin_pi_div_two]
  have := h (3 * Real.pi / 2 / ω)
  rw [if_pos hτ, hs, SomaField.Temporal.retardedDecayFactor, if_pos hτ] at this
  have hl := Real.exp_pos (-k * vs * (3 * Real.pi / 2 / ω))
  have hr : Real.exp (-γ * (3 * Real.pi / 2 / ω)) * -1 / ω < 0 := by
    have := Real.exp_pos (-γ * (3 * Real.pi / 2 / ω))
    apply div_neg_of_neg_of_pos _ hω
    linarith
  linarith

/-! ## P14's claims -/

def cIdentification : Claim where
  id := "P14.identification"
  text := "G_USF(p) = 1/(p² + k²) = C_GFF(p)|_{m=k}: the formal covariance kernels coincide (the \
    peak 1/k² = 4 at k = 0.5; 1 at k = m = 1)."
  statement := (∀ (k : ℝ) (ξ : EuclideanSpace ℝ (Fin 4)),
      usfPropagator k ((2 * Real.pi) • ξ) = freePropagatorMom 4 k ξ) ∧
    (usfPropagator 0.5 0 = 4 ∧ usfPropagator 1 0 = 1 ∧ freePropagatorMom 4 1 0 = 1)

instance : Witness cIdentification := .of ⟨propagators_coincide, peaks⟩

def cMaster : Claim where
  id := "P14.master"
  text := "Under the identification m ↔ k the free-field USF inherits all five \
    Osterwalder–Schrader axioms (freefield_USF_satisfies_OS_axioms), with no sorry."
  statement := ∀ [Identification] (k : ℝ) [Fact (0 < k)], SatisfiesAllOS (usfMeasure k)

instance : Witness cMaster := .of (by
  intro _ k _
  rw [Identification.eq k]; exact SomaField.OSAxioms.freefield_USF_satisfies_OS_axioms k)

def cGFF : Claim where
  id := "P14.gff"
  text := "Theorem (Douglas et al. 2026): for every m > 0 the GFF measure satisfies OS0–OS4 \
    (OS4 as clustering and as ergodicity)."
  statement := ∀ (m : ℝ) [Fact (0 < m)], SatisfiesAllOS (μ_GFF 4 m)

instance : Witness cGFF := .of fun m _ => gaussianFreeField_satisfies_all_OS_axioms_dim4 m

def cDecay : Claim where
  id := "P14.decay"
  text := "OS4: connected two-point functions decay exponentially at large Euclidean separation \
    (the library's covariance bound, rate k/2)."
  statement := ∀ (k : ℝ) [Fact (0 < k)], ∃ A : ℝ, 0 ≤ A ∧
    ∀ x : EuclideanSpace ℝ (Fin 4), 1 ≤ ‖x‖ →
      |freeCovariance 4 k x 0| ≤ A * Real.exp (-(k / 2) * ‖x‖)

instance : Witness cDecay := .of fun k _ => covariance_decays k

def cRate : Claim where
  id := "P14.rate"
  text := "⟨φ(x)φ(0)⟩_conn ~ e^{-k|x|} as |x| → ∞: the clustering rate is k = 1/τ_m."
  statement := ∀ (k : ℝ) [Fact (0 < k)], ∃ A : ℝ, 0 ≤ A ∧
    ∀ x : EuclideanSpace ℝ (Fin 4), 1 ≤ ‖x‖ →
      |freeCovariance 4 k x 0| ≤ A * Real.exp (-k * ‖x‖)

def cMemory : Claim where
  id := "P14.memory-kernel"
  text := "This motivates the Somatic Memory Kernel K(τ) = K₀ e^{-τ/τ_m} θ(τ): the decaying \
    exponential is the field's Euclidean correlation (P10)."
  statement := P10.cEuclidean.statement

instance [h : Witness P10.cEuclidean] : Witness cMemory := .of h.proof

def cRetarded : Claim where
  id := "P14.retarded"
  text := "TemporalDynamics.lean contains a Lean theorem for the model retarded propagator \
    G_R(t) = θ(t) e^{-γt} sin(ωt)/ω: causal and bounded."
  statement := ∀ k vs : ℝ, ∃ γ ω : ℝ, 0 < ω ∧ ∀ τ : ℝ,
    SomaField.Temporal.retardedDecayFactor k vs τ =
      if 0 < τ then Real.exp (-γ * τ) * Real.sin (ω * τ) / ω else 0

/-- The propagator proved causal there never changes sign. -/
instance : Refutation cRetarded := .of fun h => not_oscillating 1 1 (h 1 1)

def cCausal : Claim where
  id := "P14.causal"
  text := "Minkowski: the retarded propagator is causal (somaticRetardedPropagator_isRetarded)."
  statement := ∀ k vs : ℝ,
    SomaField.Temporal.IsRetarded (SomaField.Temporal.somaticRetardedPropagator k vs)

instance : Witness cCausal := .of SomaField.Temporal.somaticRetardedPropagator_isRetarded

/-- That the Hopfield coupling is quartic in the field and so in the φ⁴ universality class
    (P15's question). -/
opaque quarticClass : Prop

def cInteracting : Claim where
  id := "P14.interacting"
  text := "The Hopfield interaction is quartic in field space, placing it in the same universality \
    class as φ⁴."
  statement := quarticClass

/-- P14's claims, in the paper's order. -/
def claims : List Claim :=
  [cIdentification, cGFF, cMaster, cRetarded, cCausal, cDecay, cRate, cMemory, cInteracting]

#status claims

end TTheory.P14
