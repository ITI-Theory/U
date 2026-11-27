import Mathlib

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
#print axioms kinetic_drop
#print axioms gap
#print axioms einstein_1905
#print axioms mass_drop_exact

end Backtest.Einstein1905
