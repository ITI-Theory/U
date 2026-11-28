/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P14

/-!
# P15 · Osterwalder–Schrader Axioms for the Interacting Universal Somatic Field

[T]-Theory's fifteenth paper, as Lean. Source:
`paper/soma/usf-interacting-qft/usf-interacting-qft.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P15).

P15 adds the Hopfield coupling, `S_κ = S₀ + κV`, `V = -½ Σ W_ab ∫ φᵃφᵇ`, and sets out four proof
obligations. The single-component reduction is a mass renormalisation, `k² → k² - κW`; the theorem
the paper proposes for it ("not yet present in the proof surface") is proved here, under the
reduction as a context, and Conjecture 1's lower bound holds mode by mode. Two of its statements
fail for the `V` it writes: `V` is a quadratic form in any number of components, never quartic, so
the multi-component theory is Gaussian too; and above `κ_c` a quadratic action with negative mass
is unbounded below, so it has no attractor to settle into. The trauma phase needs a quartic term
the paper's `V` does not have. The ultraviolet and infinite-volume limits stay open.
-/

namespace TTheory.P15

open TTheory OSforGFF

/-! ## The action and its figures -/

/-- The free action density and the single-component interaction, per mode:
    `½(p² + k²)|φ̃|²` and `-(W/2)|φ̃|²`. -/
noncomputable def freeDensity (k p a : ℝ) : ℝ := 1 / 2 * (p ^ 2 + k ^ 2) * a
noncomputable def interaction (W a : ℝ) : ℝ := -(W / 2) * a

/-- "which is a mass renormalisation: `k² → k² - κW`". -/
theorem mass_renormalisation (k κ W p a : ℝ) :
    freeDensity k p a + κ * interaction W a = 1 / 2 * (p ^ 2 + (k ^ 2 - κ * W)) * a := by
  unfold freeDensity interaction; ring

/-- The illustrative Hopfield weights of the first figure. -/
def wFig : Matrix (Fin 4) (Fin 4) ℝ :=
  !![0, 0.4, -0.2, 0.3; 0.4, 0, 0.5, -0.1; -0.2, 0.5, 0, 0.3; 0.3, -0.1, 0.3, 0]

/-- The effective mass `k_eff = √(k² - κW)`. -/
noncomputable def kEff (k κ W : ℝ) : ℝ := Real.sqrt (k ^ 2 - κ * W)

/-- The figures: `κ = 0` leaves the free action (`1`); the free density `0.125` at `k = 0.5`,
    `φ = 1`, `p = 0`; the interaction `-0.25` at `W = 0.5`; the weights symmetric; `k_eff = 0` at
    `κ_c = k²/W = 4` (`k = 2`, `W = 1`). -/
theorem figures : (1 : ℝ) + 0 * 0.6 = 1 ∧ freeDensity 0.5 0 1 = 0.125 ∧ interaction 0.5 1 = -0.25 ∧
    wFig.transpose = wFig ∧ kEff 2 4 1 = 0 := by
  refine ⟨by norm_num, by norm_num [freeDensity], by norm_num [interaction], ?_, ?_⟩
  · ext i j; fin_cases i <;> fin_cases j <;> simp [wFig]
  · norm_num [kEff]

/-! ## Obligation 1, one mode at a time

"`S_κ[φ] ≥ c_κ ‖φ‖²_{H¹} - C_κ`": below `κ_c` each mode's weight `p² + k_eff²` is at least
`c (p² + 1)` with `c = min(1, k_eff²) > 0`, the `H¹` weight; `C_κ = 0`. -/

theorem mode_bound {m2 : ℝ} (hm : 0 < m2) :
    0 < min 1 m2 ∧ ∀ p : ℝ, min 1 m2 * (p ^ 2 + 1) ≤ p ^ 2 + m2 := by
  refine ⟨lt_min one_pos hm, fun p => ?_⟩
  have h1 := min_le_left 1 m2
  have h2 := min_le_right 1 m2
  nlinarith [sq_nonneg p, lt_min one_pos hm]

/-! ## The proposed theorem

"`theorem interacting_USF_satisfies_OS_axioms_below_critical ... SatisfiesAllOS (μ_GFF (k_eff k κ
W).val)` ... A checked Lean theorem for that reduction is proposed, not yet present". As the paper
writes it, it does not compile (`μ_GFF` takes the dimension first, and `k_eff` needs its
positivity as an instance). With those: -/

theorem below_critical (k κ W : ℝ) (h : κ * W < k ^ 2) :
    haveI : Fact (0 < kEff k κ W) := ⟨Real.sqrt_pos.mpr (by linarith)⟩
    SatisfiesAllOS (μ_GFF 4 (kEff k κ W)) :=
  haveI : Fact (0 < kEff k κ W) := ⟨Real.sqrt_pos.mpr (by linarith)⟩
  gaussianFreeField_satisfies_all_OS_axioms_dim4 _

/-- The interacting single-component measure, `dμ_κ ∝ e^{-κV} dμ₀`. -/
noncomputable opaque interactingMeasure (k κ W : ℝ) [Fact (0 < kEff k κ W)] :
    MeasureTheory.ProbabilityMeasure (FieldConfiguration 4) := μ_GFF 4 (kEff k κ W)

/-- The reduction: the interacting single-component measure is the free one at `k_eff`. -/
class Reduction : Prop where
  eq : ∀ (k κ W : ℝ) [Fact (0 < kEff k κ W)], interactingMeasure k κ W = μ_GFF 4 (kEff k κ W)

/-! ## The multi-component interaction, and the trauma phase -/

/-- One mode of the action, `½(k² - κW) φ²`. -/
noncomputable def modeAction (k κ W φ : ℝ) : ℝ := 1 / 2 * (k ^ 2 - κ * W) * φ ^ 2

/-- Above `κ_c` it has no minimum: every value is undercut. -/
theorem no_attractor {k κ W : ℝ} (h : k ^ 2 < κ * W) (φ : ℝ) :
    modeAction k κ W (|φ| + 1) < modeAction k κ W φ := by
  unfold modeAction
  have hsq : φ ^ 2 < (|φ| + 1) ^ 2 := by
    nlinarith [sq_abs φ, abs_nonneg φ]
  nlinarith

/-! ## P15's claims -/

def cFigures : Claim where
  id := "P15.figures"
  text := "The figures: κ = 0 leaves the free action; the free density 0.125 and the interaction \
    -0.25; the weights symmetric; k_eff falls to 0 at κ_c = k²/W_max = 4."
  statement := (1 : ℝ) + 0 * 0.6 = 1 ∧ freeDensity 0.5 0 1 = 0.125 ∧ interaction 0.5 1 = -0.25 ∧
    wFig.transpose = wFig ∧ kEff 2 4 1 = 0

instance : Witness cFigures := .of figures

def cMass : Claim where
  id := "P15.mass"
  text := "For a single-component field V = -(W/2)∫φ², which is a mass renormalisation \
    k² → k² - κW."
  statement := ∀ k κ W p a : ℝ,
    freeDensity k p a + κ * interaction W a = 1 / 2 * (p ^ 2 + (k ^ 2 - κ * W)) * a

instance : Witness cMass := .of mass_renormalisation

def cLowerBound : Claim where
  id := "P15.lower-bound"
  text := "Conjecture 1: below κ_c, S_κ[φ] ≥ c_κ‖φ‖²_{H¹} - C_κ with c_κ > 0 (single component, \
    mode by mode)."
  statement := ∀ k κ W : ℝ, κ * W < k ^ 2 → ∃ c : ℝ, 0 < c ∧
    ∀ p : ℝ, c * (p ^ 2 + 1) ≤ p ^ 2 + (k ^ 2 - κ * W)

instance : Witness cLowerBound := .of fun _ _ _ h =>
  ⟨_, (mode_bound (sub_pos.mpr h)).1, (mode_bound (sub_pos.mpr h)).2⟩

def cBelowCritical : Claim where
  id := "P15.below-critical"
  text := "interacting_USF_satisfies_OS_axioms_below_critical (proposed): the single-component \
    interacting USF below κ_c satisfies OS0–OS4, by the free-field result with k_eff."
  statement := ∀ [Reduction] (k κ W : ℝ) [Fact (0 < kEff k κ W)],
    SatisfiesAllOS (interactingMeasure k κ W)

instance : Witness cBelowCritical := .of (by
  intro _ k κ W _
  rw [Reduction.eq k κ W]
  exact gaussianFreeField_satisfies_all_OS_axioms_dim4 _)

def cQuartic : Claim where
  id := "P15.quartic"
  text := "The interaction V is quadratic in single-component fields but quartic in \
    multi-component fields."
  statement := ∃ (n : ℕ) (W : Matrix (Fin n) (Fin n) ℝ) (φ : Fin n → ℝ) (t : ℝ),
    2 ≤ n ∧ P14.hopfieldV W (t • φ) ≠ t ^ 2 * P14.hopfieldV W φ

/-- `V` as written is a quadratic form in any number of components (P14). -/
instance : Refutation cQuartic :=
  .of fun ⟨_, W, φ, t, _, h⟩ => h (P14.hopfieldV_quadratic W φ t)

def cTraumaPhase : Claim where
  id := "P15.trauma-phase"
  text := "Above κ_c the symmetry breaks and the field settles into an attractor (trauma basin)."
  statement := ∀ k κ W : ℝ, k ^ 2 < κ * W → ∃ φs : ℝ, ∀ φ, modeAction k κ W φs ≤ modeAction k κ W φ

/-- Above `κ_c` the quadratic action is unbounded below: no minimum to settle into. -/
instance : Refutation cTraumaPhase := .of fun h => by
  obtain ⟨φs, hφ⟩ := h 1 2 1 (by norm_num)
  exact absurd (hφ (|φs| + 1)) (not_le.mpr (no_attractor (by norm_num) φs))

/-- Conjecture 2 (OS3 survives a polynomial perturbation bounded below, near `κ = 0`), Obligation 3
    (the ultraviolet limit `Λ → ∞`) and Obligation 4 (the infinite-volume limit): the paper's open
    problems, open here. -/
opaque glimmJaffe : Prop
opaque ultravioletLimit : Prop
opaque infiniteVolume : Prop

def cConjecture2 : Claim where
  id := "P15.conjecture-2"
  text := "Conjecture 2: if μ₀ satisfies OS3 and V is a polynomial interaction bounded below, \
    dμ_κ ∝ e^{-κV} dμ₀ satisfies OS3 for κ near 0."
  statement := glimmJaffe

def cUltraviolet : Claim where
  id := "P15.ultraviolet"
  text := "Obligation 3: the Λ → ∞ limit of the regularised measures exists and satisfies OS3."
  statement := ultravioletLimit

def cVolume : Claim where
  id := "P15.volume"
  text := "Obligation 4: the measures on bounded domains converge to an infinite-volume measure."
  statement := infiniteVolume

/-- P15's claims, in the paper's order. -/
def claims : List Claim :=
  [cFigures, cMass, cLowerBound, cConjecture2, cQuartic, cUltraviolet, cVolume, cBelowCritical,
    cTraumaPhase]

#status claims

end TTheory.P15
