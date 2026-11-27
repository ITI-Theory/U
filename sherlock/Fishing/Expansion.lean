import Mathlib
import Method

/-!
# Fishing, fourth catch: can the fractions stay fixed while the universe expands? (USC; ISS-126)

The author's question (AI Mode, 26 Oct, Me/chats thread `dark-matter-time`; again 27 Nov): if DESI
shows the dark-matter share growing, is that relative, is new mass created, or should "our
equation just be expanding"? The fractions 7/11 and 3/11 are counts of dimensions, which have no
time in them. In an expanding (FLRW) universe each component dilutes as a^{-3(1+w)}: matter
w = 0, the vacuum w = -1.

1. `fixed_fractions`: two components keep a fixed ratio at every epoch iff they have the same w.
   With the vacuum at w = -1 (P21's falsifier), fixed fractions need matter at w = -1 too.
2. `creation_rate`: matter at constant density means its comoving mass grows as a³: new mass
   created at the rate Γ = 3H (Hoyle's steady state, Prigogine's creation cosmologies). So the
   author's "new mass created" is exactly what fixed fractions require.
3. `q_constant`: with one effective w the deceleration parameter is the constant (1 + 3w)/2 at
   every epoch (here -1). Supernovae show it changed sign, deceleration turning to acceleration
   at z ≈ 0.5 (Riess et al. 2004), so that reading is excluded.
4. `chat_ratio_definitional`: AI Mode's proof of the day (`omega_DM_invariant`, never committed)
   defines M_DM = (3/11) M_total and proves the ratio is 3/11. That holds for every growth law,
   creation or none, so it tests nothing. It also used Ω_b = 1/11, where the repo has 1/22.

So the counting can give today's values only. The fractions then change with time, as in ΛCDM,
and the theory owes a reason why the count holds now (the coincidence problem). Alternatively, the
count measures something other than the energy fractions. That choice is the author's.
Evidence labels: 1-4 `kernel-verified`; the observational premise is cited.
-/

open Real

namespace Fishing.Expansion

/-- 1. A ratio r₀ a^{3(w_Λ - w_m)} is the same at every epoch iff w_m = w_Λ. -/
theorem fixed_fractions {r0 : ℝ} (hr0 : r0 ≠ 0) (wm wL : ℝ) :
    (∀ a : ℝ, 0 < a → r0 * a ^ (3 * (wL - wm)) = r0) ↔ wm = wL := by
  constructor
  · intro h
    have h1 := h (Real.exp 1) (Real.exp_pos 1)
    rw [Real.exp_one_rpow] at h1
    have h2 : Real.exp (3 * (wL - wm)) = 1 := mul_left_cancel₀ hr0 (h1.trans (mul_one r0).symm)
    rw [Real.exp_eq_one_iff] at h2
    linarith
  · intro h a _
    rw [h, sub_self, mul_zero, Real.rpow_zero, mul_one]

/-- 2. Constant density c: the comoving mass c a³ grows, dM/da = 3M/a, so Γ = 3H. -/
theorem creation_rate (c : ℝ) {a : ℝ} (_ha : a ≠ 0) :
    HasDerivAt (fun a => c * a ^ 3) (3 * (c * a ^ 3) / a) a := by
  refine ((hasDerivAt_pow 3 a).const_mul c).congr_deriv ?_
  field_simp
  ring

/-- The Hubble rate with one effective w: H(a) = H₀ a^{-3(1+w)/2}. -/
noncomputable def H (H0 w a : ℝ) : ℝ := H0 * a ^ (-(3 * (1 + w) / 2))

theorem H_deriv (H0 w : ℝ) {a : ℝ} (ha : 0 < a) :
    HasDerivAt (H H0 w) (H0 * (-(3 * (1 + w) / 2) * a ^ (-(3 * (1 + w) / 2) - 1))) a :=
  (Real.hasDerivAt_rpow_const (Or.inl ha.ne')).const_mul H0

/-- 3. Then q = -1 - (a/H) dH/da = (1 + 3w)/2 at every epoch. -/
theorem q_constant {H0 : ℝ} (hH : H0 ≠ 0) (w : ℝ) {a : ℝ} (ha : 0 < a) :
    -1 - a * (H0 * (-(3 * (1 + w) / 2) * a ^ (-(3 * (1 + w) / 2) - 1))) / H H0 w a
      = (1 + 3 * w) / 2 := by
  have ha0 : a ≠ 0 := ha.ne'
  have hpos : (a ^ (-(3 * (1 + w) / 2))) ≠ 0 := (Real.rpow_pos_of_pos ha _).ne'
  have hp : a * a ^ (-(3 * (1 + w) / 2) - 1) = a ^ (-(3 * (1 + w) / 2)) := by
    rw [Real.rpow_sub_one ha0]
    field_simp
  rw [show a * (H0 * (-(3 * (1 + w) / 2) * a ^ (-(3 * (1 + w) / 2) - 1)))
      = H0 * (-(3 * (1 + w) / 2)) * (a * a ^ (-(3 * (1 + w) / 2) - 1)) by ring, hp, H]
  field_simp
  ring

/-- With the vacuum's w = -1: q = -1 always, no decelerating era. -/
theorem q_vacuum : (1 + 3 * (-1 : ℝ)) / 2 = -1 := by norm_num

/-- 4. The chat's "invariance" holds for every growth exponent γ: a definition, not a law. -/
theorem chat_ratio_definitional (M0 a γ : ℝ) (h : M0 * a ^ γ ≠ 0) :
    3 / 11 * (M0 * a ^ γ) / (M0 * a ^ γ) = 3 / 11 := by
  rw [mul_div_assoc, div_self h, mul_one]

/-- The reading "the fractions are fixed at every epoch", tested: excluded (rule 3). -/
def row : Method.Row :=
  ({ id := "COID-COSMO-3"
     source := "FLRW: components dilute as a^{-3(1+w)}; fixed ratios iff equal w (fixed_fractions)"
     target := "Ω_Λ = 7/11, Ω_c = 3/11 read as fixed at every epoch (the chat of 26 Oct)"
     signature := [(.symmetry, "time translation: a count of dimensions has no epoch in it"),
       (.units, "fractions of the critical density, which changes as H²")]
     imported := "one effective w; matter created at Γ = 3H; q = (1 + 3w)/2 constant"
     assumptions := [
       ⟨"fixed at every epoch needs one w", .lean ``Fishing.Expansion.fixed_fractions⟩,
       ⟨"constant matter density means created mass", .lean ``Fishing.Expansion.creation_rate⟩,
       ⟨"one w gives a constant q", .lean ``Fishing.Expansion.q_constant⟩,
       ⟨"the vacuum has w = -1", .cited "P21's falsifier; Planck 2018 w = -1.03 ± 0.03"⟩]
     prediction := "q = -1 at every epoch: no decelerating era"
     disconfirmation := "an observed change of sign of q (rule 3)"
     negativeControl := ⟨"AI Mode's invariance proof: true for every growth law, so it tests nothing",
       .lean ``Fishing.Expansion.chat_ratio_definitional⟩ } : Method.Row).test
    "Riess et al. 2004 (ApJ 607, 665): deceleration turned to acceleration at z ≈ 0.46" false

#guard row.wellFormed && row.status == .falsified

#print axioms fixed_fractions
#print axioms creation_rate
#print axioms q_constant

end Fishing.Expansion
