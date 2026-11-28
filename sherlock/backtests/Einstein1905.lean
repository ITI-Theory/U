import Mathlib
import Method
import TTheory.Method

/-!
# The Einstein backtest, 1905 (USC; ISS-126)

The calibration the author proposed on 26 Nov 2026: before pointing the system at [T]-Theory, give
it Einstein's own argument and see whether it finds what history found. A language model has read
about E = mc², so the honest part of the test is the formal one: Lean knows nothing of 1905.

Einstein (November 1905): a body at rest in S emits two light pulses of energy L/2 in opposite
directions. Seen from S', moving at v, the pulses carry L·γ in total (the June paper's energy
transformation; the two Doppler factors sum to γ). Energy is conserved in both frames.

1. `kinetic_drop`: from conservation alone, the body's kinetic energy drops by L(γ - 1). Exact.
2. `gap`: from these premises alone nothing follows about mass: the premises do not mention it.
   Einstein's step to mass needs a lemma he did not state: Planck's point (1907).
3. `mass_drop`, `mass_limit`: with that lemma made explicit (the kinetic energy is Newtonian,
   ½mv², up to one constant), Δm(v) = 2L(γ - 1)/v², and Δm(v) → L/c² as v → 0: E = mc² as a limit,
   which is all the 1905 argument gives (von Laue's general proof, 1911, is another matter).
4. `mass_drop_exact`: with the June paper's own relativistic kinetic energy instead, Δm = L/c² exactly.

Evidence label: kernel-verified facts about Einstein's argument; no claim of [T]-Theory.
-/

open Real Filter Topology

namespace Backtest.Einstein1905

/-- The Lorentz factor as a function of u = v²/c². -/
noncomputable def F (u : ℝ) : ℝ := (Real.sqrt (1 - u))⁻¹

/-- The Lorentz factor γ(v) = 1/√(1 - v²/c²). -/
noncomputable def γ (c v : ℝ) : ℝ := F (v ^ 2 / c ^ 2)

/-- The thought experiment: energy conserved at rest (S) and in motion (S'). -/
structure Emission (c v L E0 E1 H0 H1 : ℝ) : Prop where
  rest : E0 - E1 = L
  moving : H0 - H1 = L * γ c v

/-- 1. Einstein's exact step: the kinetic energy H - E drops by L(γ - 1). -/
theorem kinetic_drop {c v L E0 E1 H0 H1 : ℝ} (h : Emission c v L E0 E1 H0 H1) :
    (H0 - E0) - (H1 - E1) = L * (γ c v - 1) := by
  have e : (H0 - E0) - (H1 - E1) = (H0 - H1) - (E0 - E1) := by ring
  rw [e, h.moving, h.rest]; ring

/-- 2. The gap: conservation alone does not give Δm = L/c² (a counter-model: masses unchanged). -/
theorem gap : ¬ ∀ (c v L E0 E1 H0 H1 m0 m1 : ℝ),
    Emission c v L E0 E1 H0 H1 → m0 - m1 = L / c ^ 2 := by
  intro h
  have key := h 1 0 1 1 0 1 0 0 0 ⟨by norm_num, by simp [γ, F]⟩
  norm_num at key

/-- Planck's hidden lemma, made explicit: the kinetic energy is Newtonian, up to one constant C. -/
structure Newtonian (v m0 m1 E0 E1 H0 H1 C : ℝ) : Prop where
  before : H0 - E0 = m0 * v ^ 2 / 2 + C
  after : H1 - E1 = m1 * v ^ 2 / 2 + C

/-- 3a. With the lemma, the mass drop at speed v. -/
theorem mass_drop {c v L E0 E1 H0 H1 m0 m1 C : ℝ} (hv : v ≠ 0)
    (h : Emission c v L E0 E1 H0 H1) (n : Newtonian v m0 m1 E0 E1 H0 H1 C) :
    m0 - m1 = 2 * L * (γ c v - 1) / v ^ 2 := by
  have k := kinetic_drop h
  rw [n.before, n.after] at k
  rw [eq_div_iff (pow_ne_zero 2 hv)]
  linear_combination 2 * k

/-- The slope of F at 0 is 1/2 (the first term of γ's expansion). -/
theorem F_slope : Tendsto (fun t => t⁻¹ * (F t - 1)) (𝓝[≠] 0) (𝓝 (1 / 2)) := by
  have hg : HasDerivAt (fun u : ℝ => 1 - u) (-1) 0 := by
    simpa using (hasDerivAt_id (0 : ℝ)).const_sub 1
  have hs : HasDerivAt (fun u : ℝ => Real.sqrt (1 - u)) (-1 / (2 * Real.sqrt (1 - 0))) 0 :=
    hg.sqrt (by norm_num)
  have hi : HasDerivAt F (-(-1 / (2 * Real.sqrt (1 - 0))) / (Real.sqrt (1 - 0)) ^ 2) 0 :=
    hs.inv (by norm_num)
  have h2 : -(-1 / (2 * Real.sqrt (1 - 0))) / (Real.sqrt (1 - 0)) ^ 2 = (1 : ℝ) / 2 := by norm_num
  rw [h2] at hi
  have F0 : F 0 = 1 := by simp [F]
  simpa [F0, smul_eq_mul] using hasDerivAt_iff_tendsto_slope_zero.mp hi

/-- 3b. E = mc² as a limit: Δm(v) → L/c² as v → 0. -/
theorem mass_limit {c L : ℝ} (hc : c ≠ 0) :
    Tendsto (fun v => 2 * L * (γ c v - 1) / v ^ 2) (𝓝[≠] 0) (𝓝 (L / c ^ 2)) := by
  have hc2 : c ^ 2 ≠ 0 := pow_ne_zero 2 hc
  have hu : Tendsto (fun v : ℝ => v ^ 2 / c ^ 2) (𝓝[≠] 0) (𝓝[≠] 0) := by
    rw [tendsto_nhdsWithin_iff]
    constructor
    · have : Tendsto (fun v : ℝ => v ^ 2 / c ^ 2) (𝓝 0) (𝓝 ((0 : ℝ) ^ 2 / c ^ 2)) :=
        ((continuous_pow 2).div_const _).tendsto 0
      simpa using this.mono_left nhdsWithin_le_nhds
    · filter_upwards [self_mem_nhdsWithin] with v hv
      exact div_ne_zero (pow_ne_zero 2 hv) hc2
  have hcomp := (F_slope.comp hu).const_mul (2 * L / c ^ 2)
  have hlim : 2 * L / c ^ 2 * (1 / 2) = L / c ^ 2 := by field_simp
  rw [hlim] at hcomp
  refine hcomp.congr' ?_
  filter_upwards [self_mem_nhdsWithin] with v hv
  have hv2 : v ^ 2 ≠ 0 := pow_ne_zero 2 hv
  simp only [Function.comp, γ]
  field_simp

/-- The backtest's verdict, as one statement: conservation plus Planck's lemma give E = mc² in the limit. -/
theorem einstein_1905 {c L : ℝ} (hc : c ≠ 0)
    (E0 E1 H0 H1 m0 m1 : ℝ → ℝ) (C : ℝ → ℝ)
    (h : ∀ v, Emission c v L (E0 v) (E1 v) (H0 v) (H1 v))
    (n : ∀ v, Newtonian v (m0 v) (m1 v) (E0 v) (E1 v) (H0 v) (H1 v) (C v)) :
    Tendsto (fun v => m0 v - m1 v) (𝓝[≠] 0) (𝓝 (L / c ^ 2)) := by
  refine (mass_limit (L := L) hc).congr' ?_
  filter_upwards [self_mem_nhdsWithin] with v hv
  exact (mass_drop hv (h v) (n v)).symm

/-- The lemma in the June paper's own form (§10, for the electron): the kinetic energy is relativistic,
m c² (γ - 1), up to one constant C. Found by the language-model half of the backtest (NotebookLM, given
only the June paper, 27 Nov 2026), which also named this lemma as the assumption the paper does not
prove for a composite body: Planck's point. -/
structure Relativistic (c v m0 m1 E0 E1 H0 H1 C : ℝ) : Prop where
  before : H0 - E0 = m0 * c ^ 2 * (γ c v - 1) + C
  after : H1 - E1 = m1 * c ^ 2 * (γ c v - 1) + C

/-- 4. With the relativistic lemma, Δm = L/c² exactly, at any speed where γ ≠ 1 (v ≠ 0). -/
theorem mass_drop_exact {c v L E0 E1 H0 H1 m0 m1 C : ℝ} (hc : c ≠ 0) (hγ : γ c v ≠ 1)
    (h : Emission c v L E0 E1 H0 H1) (r : Relativistic c v m0 m1 E0 E1 H0 H1 C) :
    m0 - m1 = L / c ^ 2 := by
  have k := kinetic_drop h
  rw [r.before, r.after] at k
  have hg : γ c v - 1 ≠ 0 := sub_ne_zero.mpr hγ
  rw [eq_div_iff (pow_ne_zero 2 hc)]
  apply mul_right_cancel₀ hg
  linear_combination k

-- The receipt: only Lean's standard axioms (no sorry, nothing assumed beyond the stated hypotheses).
/-- The backtest as a row of the method (P3 §10.1): Einstein's step is a co-identification, the
    v² coefficient of the radiating body's kinetic energy identified with Newton's ½m. History ran
    the loop: the prediction has passed independent tests, so the row is S3. -/
def row : Method.Row where
  id := "COID-EINSTEIN-1905"
  source := "Newtonian kinetic energy ½mv²: mass as the coefficient of v²/2"
  target := "the drop L(γ - 1) in a radiating body's kinetic energy (Einstein, November 1905)"
  signature := [(.units, "energy: L(γ - 1) ≈ (L/c²) v²/2 for small v, a mass times v²/2"),
    (.operatorForm, "quadratic in v at leading order: γ - 1 ≈ v²/2c² (F_slope)")]
  imported := "the mass is the coefficient of v²/2: Δm = L/c² (mass_limit, einstein_1905)"
  assumptions := [
    ⟨"energy is conserved in both frames", .cited "Einstein, November 1905: the premises (Emission)"⟩,
    ⟨"the pulses carry Lγ in the moving frame", .cited "Einstein, June 1905, §8"⟩,
    ⟨"the kinetic energy is Newtonian up to a constant (Planck's lemma, 1907)",
      .lean ``Backtest.Einstein1905.mass_drop_exact⟩]
  prediction := "a body that emits energy L loses mass L/c²"
  disconfirmation := "a measured mass defect differing from ΔE/c² (rule 3)"
  negativeControl := ⟨"conservation alone: the premises without Planck's lemma say nothing of mass",
    .lean ``Backtest.Einstein1905.gap⟩
  status := .validated
  scope := .S3
  tests := [("Cockcroft and Walton (1932): lithium mass defect against the energy released", true),
    ("Rainville et al., Nature 438 (2005): ΔE = Δm c² to 4 parts in 10⁷", true)]

#guard row.wellFormed

/-! ## The same row, at the type level (TTheory.Method, ISS-141)

Over all real numbers the conclusion is false: that is `gap`. The law is about bodies, so the row
speaks of one radiating body as measured: its quantities are `opaque` (Lean knows nothing of their
values), its premises (conservation in both frames, and Planck's lemma) are the physics, neither
provable nor refutable here. So `#status` gives: the transfer (S1) kernel-verified, the control
kernel-verified, the claim itself open, and the measurement in its record. -/

/-- One radiating body, as an experiment would measure it. -/
opaque cB : ℝ
opaque vB : ℝ
opaque LB : ℝ
opaque E0B : ℝ
opaque E1B : ℝ
opaque H0B : ℝ
opaque H1B : ℝ
opaque m0B : ℝ
opaque m1B : ℝ
opaque CB : ℝ

/-- The backtest as a `TTheory.Method.Row`. -/
def row1905 : TTheory.Method.Row where
  id := "COID-EINSTEIN-1905"
  source := "the relativistic kinetic energy m c² (γ - 1), Planck's lemma (1907)"
  target := "a body emitting light L (Einstein, November 1905)"
  prediction := "A body that emits energy L loses mass L/c²."
  disconfirmation := "Conservation alone: the premises without Planck's lemma say nothing of mass."
  premises := cB ≠ 0 ∧ γ cB vB ≠ 1 ∧ Emission cB vB LB E0B E1B H0B H1B ∧
    Relativistic cB vB m0B m1B E0B E1B H0B H1B CB
  conclusion := m0B - m1B = LB / cB ^ 2
  transfer := fun ⟨hc, hγ, h, r⟩ => mass_drop_exact hc hγ h r
  control := ¬ ∀ (c v L E0 E1 H0 H1 m0 m1 : ℝ),
    Emission c v L E0 E1 H0 H1 → m0 - m1 = L / c ^ 2
  controlHolds := gap

/-- The measured ratio ΔE / (Δm c²) (Rainville et al., Nature 438, 2005). -/
opaque massEnergyRatio : ℝ

/-- The test, as reported: equal to 4 parts in 10⁷. -/
class Tests1905 : Prop where
  rainville2005 : |massEnergyRatio - 1| < 4e-7

def cTested : TTheory.Claim where
  id := "COID-EINSTEIN-1905.test"
  text := "Rainville et al. (2005): ΔE = Δm c² to 4 parts in 10⁷."
  statement := ∀ [Tests1905], |massEnergyRatio - 1| < 4e-7

instance : TTheory.Witness cTested := .of fun [h : Tests1905] => h.rainville2005

#status row1905.claims ++ [cTested]

#print axioms kinetic_drop
#print axioms gap
#print axioms einstein_1905
#print axioms mass_drop_exact

end Backtest.Einstein1905
