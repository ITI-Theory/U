/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P1
import LimbicTunnel
import Mathlib.Analysis.Complex.ExponentialBounds
import Mathlib.Analysis.SpecialFunctions.Sqrt
import Mathlib.LinearAlgebra.Matrix.Determinant.Basic

/-!
# P2 · Quantum Topology and Trauma

*From The Emperor's New Mind to a Testable Model of Attractor Reachability*

[T]-Theory's second paper, as Lean. Source:
`paper/soma/quantum-soma-penrose/quantum-soma-penrose.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P2).

P2 recasts Penrose's gap as a question of reachability in an attractor landscape and tests it with
QUANT-EXP-1, an exact 8-qubit simulation: a cold classical run started in Fear stays there, a fast
transverse-field anneal shifts occupancy towards Awe. Three kinds of statement, kept apart here:

* **arithmetic and analysis the paper states**: kernel-verified below (the barrier, the Arrhenius
  factors, the 2 × 2 block, the Wilson bound, the 0.25 baseline, the adiabatic time, the sweep);
* **what the run measured**: the fields of `Record`, the simulation's report; claims resting on it
  hold *in* `Record` (the model does not compute a 256-state anneal);
* **the framework's assumption**: THERAPY-2, a field of `Assumptions`, not a global axiom.
-/

namespace TTheory.P2

open TTheory

/-! ## The recap: P2's energy is P1's

P2 writes the Hamiltonian as `H(e) = -½ eᵀWe - bᵀe`. That is P1's eq. (3), written with vectors:
a check across the two papers. -/

/-- P2's recap Hamiltonian, as P2 writes it (`W` as a matrix, `e` and `b` as vectors). -/
noncomputable def recapEnergy {n : ℕ} (W : Fin n → Fin n → ℝ) (b e : Fin n → ℝ) : ℝ :=
  -(1 / 2) * (e ⬝ᵥ (Matrix.of W).mulVec e) - b ⬝ᵥ e

/-- The quadratic form `eᵀWe`, as P1's double sum. -/
theorem quadratic_form {n : ℕ} (W : Fin n → Fin n → ℝ) (e : Fin n → ℝ) :
    e ⬝ᵥ (Matrix.of W).mulVec e = ∑ i, ∑ j, W i j * e i * e j := by
  simp only [dotProduct, Matrix.mulVec, Matrix.of_apply, Finset.mul_sum]
  exact Finset.sum_congr rfl fun i _ => Finset.sum_congr rfl fun j _ => by ring

/-- P2's energy is P1's eq. (3) (kernel-verified). -/
theorem recap_is_P1 {n : ℕ} (W : Fin n → Fin n → ℝ) (b e : Fin n → ℝ) :
    recapEnergy W b e = P1.somaEnergy W b e := by
  rw [recapEnergy, quadratic_form, P1.somaEnergy]
  rfl

/-! ## The barrier, analytically

"The continuous interpolation `H(λ) = -10λ² + 9λ - 1` reaches a maximum of +1.025 at λ = 0.45,
giving barrier height = 2.025 above the Fear basin." Fear is λ = 0, Awe λ = 1. -/

/-- The interpolation from the Fear basin (λ = 0) to the Awe basin (λ = 1). -/
noncomputable def barrierPath (l : ℝ) : ℝ := -10 * l ^ 2 + 9 * l - 1

/-- The barrier's top: +1.025 at λ = 0.45, and nowhere higher. -/
theorem barrier_top : barrierPath 0.45 = 1.025 ∧ ∀ l, barrierPath l ≤ 1.025 := by
  refine ⟨by norm_num [barrierPath], fun l => ?_⟩
  unfold barrierPath
  nlinarith [sq_nonneg (l - 0.45)]

/-- Its height above the Fear basin is 2.025; and Awe (−2) lies below Fear (−1). -/
theorem barrier_height : barrierPath 0.45 - barrierPath 0 = 2.025 ∧
    barrierPath 1 < barrierPath 0 := by
  norm_num [barrierPath]

/-! ## Cold and hot: the Arrhenius factors

The table's verdicts: cold (`T = 0.02`) is "STUCK, e^{-101} ≈ 0"; hot (`T = 1.5`) "FLOODS". The
factor `exp(-ΔH/T)` for the barrier of 2.025: at the cold temperature below 10⁻⁴³, at the hot one
above a quarter. -/

/-- The barrier above the Fear basin. -/
noncomputable def barrier : ℝ := 2.025

/-- The cold and hot temperatures of the classical baseline. -/
noncomputable def tCold : ℝ := 0.02
noncomputable def tHot : ℝ := 1.5

theorem cold_ratio : barrier / tCold = 101.25 := by norm_num [barrier, tCold]

/-- Cold: the Arrhenius factor is below 10⁻⁴³ (`e ≥ 2.7`, so `e¹⁰⁰ > 2.7¹⁰⁰ > 10⁴³`). -/
theorem cold_stuck : Real.exp (-(barrier / tCold)) < 1 / 10 ^ 43 := by
  have he : (2.7 : ℝ) < Real.exp 1 := lt_trans (by norm_num) Real.exp_one_gt_d9
  have h100 : (2.7 : ℝ) ^ 100 < Real.exp 100 := by
    have := pow_lt_pow_left₀ he (by norm_num) (by norm_num : (100 : ℕ) ≠ 0)
    rwa [← Real.exp_nat_mul, mul_one] at this
  have h43 : (10 : ℝ) ^ 43 < Real.exp (barrier / tCold) := by
    rw [cold_ratio]
    calc (10 : ℝ) ^ 43 < 2.7 ^ 100 := by norm_num
      _ < Real.exp 100 := h100
      _ ≤ Real.exp 101.25 := Real.exp_le_exp.mpr (by norm_num)
  rw [Real.exp_neg, ← one_div]
  exact one_div_lt_one_div_of_lt (by positivity) h43

/-- Hot: the factor is above a quarter (`e^{1.35} < 4`, as `e²⁷ < 4²⁰`): no barrier at all. -/
theorem hot_floods : 1 / 4 < Real.exp (-(barrier / tHot)) := by
  have hr : barrier / tHot = 27 / 20 := by norm_num [barrier, tHot]
  have he : Real.exp 1 < 2.7182818286 := Real.exp_one_lt_d9
  have h27 : Real.exp 27 < 4 ^ 20 := by
    have := pow_lt_pow_left₀ he (Real.exp_pos 1).le (by norm_num : (27 : ℕ) ≠ 0)
    rw [← Real.exp_nat_mul, mul_one] at this
    exact lt_trans (by exact_mod_cast this) (by norm_num)
  have h4 : Real.exp (27 / 20) < 4 := by
    by_contra h
    have h := not_lt.mp h
    have := pow_le_pow_left₀ (by norm_num) h 20
    rw [← Real.exp_nat_mul] at this
    norm_num at this
    linarith
  rw [hr, Real.exp_neg, ← one_div]
  exact one_div_lt_one_div_of_lt (Real.exp_pos _) h4

/-- And the noise-free limit, in the one-dimensional double well `V = W(x² - 1)²` of `LimbicTunnel`
    (Fear at −1, Awe at +1, the barrier `W` at 0): a run that starts on the Fear side below the
    barrier never reaches the Awe side (the energy is a Lyapunov function). -/
theorem noiseless_trapped (p : SomaField.LimbicTunnel.BarrierParam) (x : ℝ → ℝ)
    (hflow : ∀ t, HasDerivAt x (-(4 * p.W * x t * (x t ^ 2 - 1))) t)
    (hbelow : SomaField.LimbicTunnel.V p (x 0) < p.W) (hneg : x 0 < 0) :
    ∀ t, 0 ≤ t → x t < 0 :=
  SomaField.LimbicTunnel.classical_trapped p x hflow hbelow hneg

/-! ## The quantum extension: the transverse block

"A two-state transverse-field block ... The matrix eigenvalues are checked":
`[[-1, -0.4], [-0.4, 1]]` has eigenvalues `±1.077`. Its characteristic polynomial is `x² - 1.16`,
so they are `±√1.16`. -/

/-- The 2 × 2 block of the paper's figure: the diagonal the classical energies, the off-diagonal the
    transverse field's mixing. -/
noncomputable def block : Matrix (Fin 2) (Fin 2) ℝ := !![-1, -0.4; -0.4, 1]

theorem block_charpoly (x : ℝ) :
    (block - x • (1 : Matrix (Fin 2) (Fin 2) ℝ)).det = x ^ 2 - 1.16 := by
  simp [block, Matrix.det_fin_two]
  ring

/-- `√1.16` is 1.077 to three places: the figure's eigenvalues are `±1.077`. -/
theorem block_eigenvalue : 1.077 < Real.sqrt 1.16 ∧ Real.sqrt 1.16 < 1.078 := by
  constructor
  · rw [Real.lt_sqrt (by norm_num)]; norm_num
  · rw [Real.sqrt_lt' (by norm_num)]; norm_num

/-- The anneal's schedule: `Γ = 5(1 - k/400)` over 400 steps, from 5 to 0, falling. -/
noncomputable def gamma (k : ℝ) : ℝ := 5 * (1 - k / 400)

theorem gamma_schedule : gamma 0 = 5 ∧ gamma 400 = 0 ∧ StrictAnti gamma := by
  refine ⟨by norm_num [gamma], by norm_num [gamma], fun a b h => ?_⟩
  unfold gamma
  linarith

/-! ## What is measured, and against what (limitation 6)

The quantum figure is the probability of the 64 states with Awe on and Fear off; the uniform
superposition the anneal starts from already gives a quarter. The eight modes in the paper's order:
Safety, Fear, Curiosity, Awe, Grief, Language, Preverbal, Shame (Fear bit 1, Awe bit 3). -/

/-- The basis states with Awe on and Fear off. -/
def aweSet : Finset (Fin 256) :=
  Finset.univ.filter fun s => s.val.testBit 3 = true ∧ s.val.testBit 1 = false

theorem aweSet_card : aweSet.card = 64 := by decide

/-- Under the uniform superposition each basis state has probability 1/256: the set starts at
    1/4. -/
theorem uniform_baseline : (aweSet.card : ℝ) / 256 = 1 / 4 := by
  rw [aweSet_card]; norm_num

/-- "The smallest spectral gap on the way, about 0.009, means a slow, adiabatic anneal would need a
    total time of order 10⁴" (time ∼ 1/gap²). -/
theorem adiabatic_time : (10 : ℝ) ^ 4 ≤ 1 / 0.009 ^ 2 ∧ 1 / (0.009 : ℝ) ^ 2 < 10 ^ 5 := by
  norm_num

/-! ## The sweep and the bootstrap -/

/-- The noise-equivalence table's `T*` for barriers −6 to −14, in thousandths. -/
def tStar : List ℕ := [94, 101, 107, 112, 117, 120, 124, 127, 129]

/-- "`T*` rises monotonically with barrier strength": strictly, at every step of the table. -/
theorem tStar_rises : tStar.Pairwise (· < ·) := by decide

/-- The noise-equivalence table's quantum peak occupancy, barrier strengths 6 to 14, in
    thousandths. -/
def sweepPeak : ℕ → ℕ
  | 6 => 416 | 7 => 417 | 8 => 416 | 9 => 412 | 10 => 408 | 11 => 403 | 12 => 398 | 13 => 393
  | 14 => 390 | _ => 0

/-- The bootstrap table's quantum peak, B8, B10 and B12, in thousandths. -/
def bootstrapPeak : ℕ → ℕ
  | 8 => 410 | 10 => 408 | 12 => 409 | _ => 0

/-- The Wilson score interval's upper end for `k` successes in `n` trials, at `z`. -/
noncomputable def wilsonUpper (k n z : ℝ) : ℝ :=
  let p := k / n
  (p + z ^ 2 / (2 * n) + z * Real.sqrt (p * (1 - p) / n + z ^ 2 / (4 * n ^ 2))) / (1 + z ^ 2 / n)

/-- With no success it is `z² / (n + z²)`. -/
theorem wilsonUpper_zero {n z : ℝ} (hn : 0 < n) (hz : 0 < z) :
    wilsonUpper 0 n z = z ^ 2 / (n + z ^ 2) := by
  have hs : Real.sqrt (z ^ 2 / (4 * n ^ 2)) = z / (2 * n) := by
    rw [show z ^ 2 / (4 * n ^ 2) = (z / (2 * n)) ^ 2 by ring]
    exact Real.sqrt_sq (by positivity)
  simp only [wilsonUpper, zero_div, zero_mul, zero_add, hs]
  field_simp
  ring

/-- "At n = 200, the Wilson 95% upper bound on the cold-classical success rate is 1.9%": it is
    0.01885, so the stated [0.000, 0.019] holds. -/
theorem wilson_0_of_200 : 0.0188 < wilsonUpper 0 200 1.96 ∧ wilsonUpper 0 200 1.96 < 0.019 := by
  rw [wilsonUpper_zero (by norm_num) (by norm_num)]
  norm_num

/-! ## The run's record

What QUANT-EXP-1 reported. The model names these observables (`opaque`: it knows nothing of their
values) and `Record` says what the run gave; a claim that rests on them holds *in* `Record`. -/

/-- Final occupancies (B10): Fear and Awe, cold and hot classical; Fear and peak Awe-dominant,
    quantum. -/
opaque coldFear : ℝ
opaque coldAwe : ℝ
opaque hotFear : ℝ
opaque hotAwe : ℝ
opaque quantumFear : ℝ
opaque quantumAwePeak : ℝ
/-- The probability of the Awe state itself at the end of the anneal. -/
opaque quantumAweState : ℝ
/-- Cold-classical successes in 200 seeds, at B8, B10 and B12. -/
opaque coldSuccesses : ℕ → ℕ
/-- Limitation 6: how often each reaches the global minimum on thirty random eight-mode
    landscapes. -/
opaque annealGlobal : ℝ
opaque saGlobal : ℝ
/-- The negative controls, of 16 runs each: A (from Awe, barrier intact) staying in Awe; B (barrier
    removed) reaching Awe. -/
opaque controlA : ℕ
opaque controlB : ℕ

/-- QUANT-EXP-1, as reported (commit `1f52282`, 20 May 2026; the hardening protocol; the stress
    test of October 2026). -/
class Record : Prop where
  cold : coldFear = 0.976 ∧ coldAwe = 0
  hot : hotFear = 0.228 ∧ hotAwe = 0.036
  quantum : quantumFear = 0.005 ∧ quantumAwePeak = 0.408
  aweState : quantumAweState < 0.01
  bootstrap : coldSuccesses 8 = 0 ∧ coldSuccesses 10 = 0 ∧ coldSuccesses 12 = 0
  controls : controlA = 16 ∧ controlB = 16
  rival : annealGlobal = 0.60 ∧ saGlobal = 0.80

/-! ## The framework's assumption

THERAPY-2 (`TopologicalTraumaRequiresTopologicalIntervention`, `paper/FieldAxioms.lean`): within the
model, smooth perturbations cannot change an attractor's winding number. "An assumption of the
formal framework, not a clinical theorem": here a field of `Assumptions`, not a global axiom. -/

/-- The model's states, an intervention, and the two things THERAPY-2 speaks of. P2 names them; the
    model does not define them. -/
opaque State : Type
opaque Intervention : Type
opaque winding : State → ℤ
opaque smooth : Intervention → Prop
opaque act : Intervention → State → State := fun _ s => s

/-- P2's assumption. -/
class Assumptions : Prop where
  therapy2 : ∀ (t : Intervention) (s : State), smooth t → winding (act t s) = winding s

/-! ## P2's claims and their witnesses -/

def cRecap : Claim where
  id := "P2.recap"
  text := "The recap Hamiltonian H(e) = -½eᵀWe - bᵀe is P1's soma energy."
  statement := ∀ n (W : Fin n → Fin n → ℝ) (b e : Fin n → ℝ),
    recapEnergy W b e = P1.somaEnergy W b e

instance : Witness cRecap := .of fun _ W b e => recap_is_P1 W b e

def cBarrier : Claim where
  id := "P2.barrier"
  text := "H(λ) = -10λ² + 9λ - 1 peaks at +1.025 at λ = 0.45: a barrier of 2.025 above the Fear \
    basin, which the Awe basin lies below."
  statement := (barrierPath 0.45 = 1.025 ∧ ∀ l, barrierPath l ≤ 1.025) ∧
    (barrierPath 0.45 - barrierPath 0 = 2.025 ∧ barrierPath 1 < barrierPath 0)

instance : Witness cBarrier := .of ⟨barrier_top, barrier_height⟩

def cArrhenius : Claim where
  id := "P2.arrhenius"
  text := "Classical cold (T = 0.02) is STUCK, e^{-101} ≈ 0; classical hot (T = 1.5) FLOODS."
  statement := Real.exp (-(barrier / tCold)) < 1 / 10 ^ 43 ∧ 1 / 4 < Real.exp (-(barrier / tHot))

instance : Witness cArrhenius := .of ⟨cold_stuck, hot_floods⟩

def cNoiseless : Claim where
  id := "P2.noiseless"
  text := "Without noise a run started in the Fear basin below the barrier never crosses it."
  statement := ∀ (p : SomaField.LimbicTunnel.BarrierParam) (x : ℝ → ℝ),
    (∀ t, HasDerivAt x (-(4 * p.W * x t * (x t ^ 2 - 1))) t) →
    SomaField.LimbicTunnel.V p (x 0) < p.W → x 0 < 0 → ∀ t, 0 ≤ t → x t < 0

instance : Witness cNoiseless := .of noiseless_trapped

def cBlock : Claim where
  id := "P2.block"
  text := "The two-state transverse-field block [[-1, -0.4], [-0.4, 1]] has eigenvalues ±1.077."
  statement := (∀ x : ℝ, (block - x • (1 : Matrix (Fin 2) (Fin 2) ℝ)).det = x ^ 2 - 1.16) ∧
    (1.077 < Real.sqrt 1.16 ∧ Real.sqrt 1.16 < 1.078)

instance : Witness cBlock := .of ⟨block_charpoly, block_eigenvalue⟩

def cSchedule : Claim where
  id := "P2.schedule"
  text := "The linear anneal schedule Γ: 5.0 → 0 over 400 steps."
  statement := gamma 0 = 5 ∧ gamma 400 = 0 ∧ StrictAnti gamma

instance : Witness cSchedule := .of gamma_schedule

def cColdRun : Claim where
  id := "P2.cold-run"
  text := "A low-noise classical Langevin run started in the Fear basin does not cross the \
    specified barrier."
  statement := ∀ [Record], coldAwe = 0 ∧ (∀ b ∈ [8, 10, 12], coldSuccesses b = 0) ∧
    Real.exp (-(barrier / tCold)) < 1 / 10 ^ 43

instance : Witness cColdRun := .of fun [h : Record] => by
  obtain ⟨_, h0⟩ := h.cold
  obtain ⟨h8, h10, h12⟩ := h.bootstrap
  refine ⟨h0, ?_, cold_stuck⟩
  intro b hb
  simp only [List.mem_cons, List.not_mem_nil, or_false] at hb
  rcases hb with rfl | rfl | rfl <;> assumption

def cShift : Claim where
  id := "P2.shift"
  text := "A fast transverse-field anneal from the uniform superposition shifts occupancy towards \
    the Awe basin: from 0.25 to 0.41, while the Awe state itself ends below 0.01."
  statement := ∀ [Record], (aweSet.card : ℝ) / 256 < quantumAwePeak ∧ quantumAweState < 0.01

instance : Witness cShift := .of fun [h : Record] => by
  refine ⟨?_, h.aweState⟩
  rw [uniform_baseline, h.quantum.2]
  norm_num

def cBounded : Claim where
  id := "P2.bounded"
  text := "Classical simulated annealing, the stronger rival, is not part of the comparison: on \
    thirty random landscapes it reaches the global minimum more often than the anneal (0.80 \
    against 0.60)."
  statement := ∀ [Record], annealGlobal < saGlobal

instance : Witness cBounded := .of fun [h : Record] => by
  rw [h.rival.1, h.rival.2]; norm_num

def cControls : Claim where
  id := "P2.controls"
  text := "Both pre-registered negative controls pass, 16 of 16; the cold-classical Wilson upper \
    bound at n = 200 is 1.9%; T* rises with barrier strength."
  statement := ∀ [Record], (controlA = 16 ∧ controlB = 16) ∧
    wilsonUpper 0 200 1.96 < 0.019 ∧ tStar.Pairwise (· < ·)

instance : Witness cControls := .of fun [h : Record] => ⟨h.controls, wilson_0_of_200.2, tStar_rises⟩

def cTopology : Claim where
  id := "P2.therapy2"
  text := "Within the model, smooth perturbations of the emotional field cannot change the winding \
    number of an attractor (THERAPY-2, an assumption of the framework)."
  statement := ∀ [Assumptions], ∀ (t : Intervention) (s : State), smooth t →
    winding (act t s) = winding s

instance : Witness cTopology := .of fun [h : Assumptions] => h.therapy2

def cTables : Claim where
  id := "P2.tables"
  text := "Quantum occupancy is stable at 0.408-0.410 across B8/B10/B12 (the bootstrap table); \
    the noise-equivalence table gives the quantum peak at each barrier: the two agree where both \
    report."
  statement := ∀ b ∈ [8, 10, 12], sweepPeak b = bootstrapPeak b

/-- Refuted by the paper's own tables: at B8 the sweep gives 0.416 and the bootstrap 0.410; at B12,
    0.398 and 0.409. Unless the two measure different runs, which the paper does not say. -/
instance : Refutation cTables :=
  .of (by show ¬ ∀ b ∈ [8, 10, 12], sweepPeak b = bootstrapPeak b; decide)

def cAdiabatic : Claim where
  id := "P2.adiabatic"
  text := "With a smallest gap of about 0.009, a slow, adiabatic anneal would need a total time of \
    order 10⁴."
  statement := (10 : ℝ) ^ 4 ≤ 1 / 0.009 ^ 2 ∧ 1 / (0.009 : ℝ) ^ 2 < 10 ^ 5

instance : Witness cAdiabatic := .of adiabatic_time

/-- P2's claims, in the paper's order. -/
def claims : List Claim :=
  [cRecap, cTopology, cBlock, cSchedule, cBarrier, cArrhenius, cNoiseless, cColdRun, cShift,
    cControls, cTables, cBounded, cAdiabatic]

/-- P2's abstract, phrase by phrase, each with the claim of the body that carries it. -/
def abstract : List (String × Claim) :=
  [("a low-noise classical Langevin run started in the Fear basin does not cross the specified \
      barrier", cColdRun),
   ("a fast transverse-field anneal from the uniform superposition shifts occupancy towards the \
      Awe basin", cShift),
   ("classical simulated annealing, the stronger rival, is not part of the comparison", cBounded),
   ("an 8-qubit Hopfield instance with analytic ground truth", cBarrier),
   ("a Penrose-style gap is recast as an attractor-topology reachability question", cTopology),
   ("measurable and reproducible in an exact statevector simulation", cControls)]

#status claims

#covers abstract claims

/-! ## A finding in the programme's Lean

`LimbicTunnel.quant_exp_1` is an axiom whose statement, `0 < wkbAmplitude W`, the same file proves
(`wkbAmplitude_pos`); its comment says "the axiom says the empirical rate matches", which the
statement does not say. As an axiom it adds nothing: the run's numbers are the fields of `Record`
above. -/

/-- The axiom's statement, proved without it. -/
theorem quant_exp_1_is_a_theorem (W : ℝ) (_ : W = 8 ∨ W = 10 ∨ W = 12) :
    0 < SomaField.LimbicTunnel.wkbAmplitude W :=
  SomaField.LimbicTunnel.wkbAmplitude_pos W

end TTheory.P2
