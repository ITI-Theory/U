import Mathlib
import Method
import Fishing.Gravity

/-!
# Fishing, second catch: the time side of the master equation (USC; ISS-126)

The gravity catch (`Fishing.Gravity`) read the master equation in space. This one reads it in time,
from the same cheatsheet page (books/T-Theory/booklet/booklet_body.md, I and III). The
time-dependent form (∂ₜ²/v² - ∇² + k²)Φ = -J is the Klein-Gordon operator with mass k.

1. `dispersion`: a plane wave cos(px - ωt) solves it exactly when ω² = v²(p² + k²). The modes are
   real: nothing in the equation decays in time.
2. `rest_mode`: at p = 0 the field rings at ω = kv, which is the cheatsheet's own "ω² = v²k²" (III),
   read as the rest frequency, not a massless wave.
3. `kernel_not_mode`: the Somatic Memory Kernel K(τ) = K₀ e^{-τ/τₘ}, τₘ = 1/(kv) (I), is not a
   solution. `kernel_tachyonic`: it solves the equation with the opposite sign of k² (an imaginary
   mass). `kernel_relaxes`: it solves the first-order relaxation K' = -kv K. Decay in time needs a
   damping term γ∂ₜ (the telegraph equation), which the master equation does not have.
4. `swapped`: the equation as written decays in space (the Yukawa response, from the gravity catch)
   and oscillates in time. The cheatsheet states the opposite twice: it writes the stationary form
   as Helmholtz (oscillating in space) and the memory kernel as a decay in time.

Not formalised: the massive retarded propagator. The standard result (e.g. Morse and Feshbach) is
δ(τ - r/v)/(4πr) plus a J₁ Bessel tail inside the light cone, with no factor e^{-kvτ}. The row
records it as cited, open.

Evidence labels: 1-4 `kernel-verified` statements about these functions. Which equation the
programme means, with or without damping, is the author's decision (ISS-126).
-/

open Real

namespace Fishing.KleinGordon

theorem dt (p ω x t : ℝ) :
    HasDerivAt (fun t => Real.cos (p * x - ω * t)) (ω * Real.sin (p * x - ω * t)) t := by
  have h : HasDerivAt (fun t => p * x - ω * t) (-(ω * 1)) t :=
    ((hasDerivAt_id' t).const_mul ω).const_sub (p * x)
  refine h.cos.congr_deriv ?_
  ring

theorem dt2 (p ω x t : ℝ) :
    HasDerivAt (fun t => ω * Real.sin (p * x - ω * t)) (-(ω ^ 2) * Real.cos (p * x - ω * t)) t := by
  have h : HasDerivAt (fun t => p * x - ω * t) (-(ω * 1)) t :=
    ((hasDerivAt_id' t).const_mul ω).const_sub (p * x)
  refine (h.sin.const_mul ω).congr_deriv ?_
  ring

theorem dx (p ω x t : ℝ) :
    HasDerivAt (fun x => Real.cos (p * x - ω * t)) (-(p * Real.sin (p * x - ω * t))) x := by
  have h : HasDerivAt (fun x => p * x - ω * t) (p * 1) x :=
    ((hasDerivAt_id' x).const_mul p).sub_const (ω * t)
  refine h.cos.congr_deriv ?_
  ring

theorem dx2 (p ω x t : ℝ) :
    HasDerivAt (fun x => -(p * Real.sin (p * x - ω * t))) (-(p ^ 2) * Real.cos (p * x - ω * t)) x := by
  have h : HasDerivAt (fun x => p * x - ω * t) (p * 1) x :=
    ((hasDerivAt_id' x).const_mul p).sub_const (ω * t)
  refine (h.sin.const_mul p).neg.congr_deriv ?_
  ring

/-- The operator on the plane wave, from its derivatives (`dt`, `dt2`, `dx`, `dx2`):
    (∂ₜ²/v² - ∂ₓ² + k²) cos(px - ωt) = (p² + k² - ω²/v²) cos(px - ωt). -/
theorem residual (v k p ω x t : ℝ) :
    (-(ω ^ 2) * Real.cos (p * x - ω * t)) / v ^ 2 - (-(p ^ 2) * Real.cos (p * x - ω * t))
      + k ^ 2 * Real.cos (p * x - ω * t)
      = (p ^ 2 + k ^ 2 - ω ^ 2 / v ^ 2) * Real.cos (p * x - ω * t) := by
  ring

/-- 1. The dispersion relation: the plane wave solves the equation everywhere iff ω² = v²(p² + k²). -/
theorem dispersion {v : ℝ} (hv : v ≠ 0) (k p ω : ℝ) :
    (∀ x t, (p ^ 2 + k ^ 2 - ω ^ 2 / v ^ 2) * Real.cos (p * x - ω * t) = 0) ↔
      ω ^ 2 = v ^ 2 * (p ^ 2 + k ^ 2) := by
  have hv2 : v ^ 2 ≠ 0 := pow_ne_zero 2 hv
  constructor
  · intro h
    have h0 := h 0 0
    rw [show p * 0 - ω * 0 = 0 by ring, Real.cos_zero, mul_one] at h0
    have e : ω ^ 2 / v ^ 2 = p ^ 2 + k ^ 2 := by linarith
    rw [div_eq_iff hv2] at e
    linear_combination e
  · intro h x t
    rw [h, mul_div_cancel_left₀ _ hv2, sub_self, zero_mul]

/-- 2. At rest (p = 0) the field rings at ω = kv: the cheatsheet's ω² = v²k². -/
theorem rest_mode {v : ℝ} (hv : v ≠ 0) (k : ℝ) :
    ∀ x t, ((0 : ℝ) ^ 2 + k ^ 2 - (k * v) ^ 2 / v ^ 2) * Real.cos (0 * x - (k * v) * t) = 0 :=
  (dispersion hv k 0 (k * v)).mpr (by ring)

/-- The Somatic Memory Kernel, with K₀ = 1 and τₘ = 1/(kv). -/
noncomputable def kernel (k v t : ℝ) : ℝ := Real.exp (-(k * v * t))

/-- 3a. The kernel relaxes: K' = -kv K, a first-order equation. -/
theorem kernel_relaxes (k v t : ℝ) : HasDerivAt (kernel k v) (-(k * v) * kernel k v t) t := by
  have h := (((hasDerivAt_id' t).const_mul (k * v)).neg).exp
  refine h.congr_deriv ?_
  simp only [kernel, Pi.neg_apply]
  ring

theorem kernel_d2 (k v t : ℝ) :
    HasDerivAt (fun t => -(k * v) * kernel k v t) ((k * v) ^ 2 * kernel k v t) t := by
  refine ((kernel_relaxes k v t).const_mul (-(k * v))).congr_deriv ?_
  ring

/-- 3b. It solves the master equation only with the opposite sign of k²: K''/v² - k² K = 0. -/
theorem kernel_tachyonic {v : ℝ} (hv : v ≠ 0) (k t : ℝ) :
    (k * v) ^ 2 * kernel k v t / v ^ 2 - k ^ 2 * kernel k v t = 0 := by
  field_simp
  ring

/-- 3c. It is not a mode of the master equation as written: K''/v² + k² K = 2k² K ≠ 0. -/
theorem kernel_not_mode {k v : ℝ} (hk : k ≠ 0) (hv : v ≠ 0) (t : ℝ) :
    (k * v) ^ 2 * kernel k v t / v ^ 2 + k ^ 2 * kernel k v t ≠ 0 := by
  have e : (k * v) ^ 2 * kernel k v t / v ^ 2 + k ^ 2 * kernel k v t = 2 * k ^ 2 * kernel k v t := by
    linear_combination kernel_tachyonic hv k t
  rw [e]
  exact mul_ne_zero (mul_ne_zero two_ne_zero (pow_ne_zero 2 hk)) (Real.exp_pos _).ne'

/-- 4. Swapped: the equation decays in space (the gravity catch) and rings in time, while the
    memory kernel, a decay in time, is not one of its solutions. -/
theorem swapped {k v : ℝ} (hk : k ≠ 0) (hv : v ≠ 0) {r : ℝ} (hr : r ≠ 0) :
    Gravity.yukawa'' k r + 2 / r * Gravity.yukawa' k r - k ^ 2 * Gravity.yukawa k r = 0 ∧
    (∀ x t, ((0 : ℝ) ^ 2 + k ^ 2 - (k * v) ^ 2 / v ^ 2) * Real.cos (0 * x - (k * v) * t) = 0) ∧
    ∀ t, (k * v) ^ 2 * kernel k v t / v ^ 2 + k ^ 2 * kernel k v t ≠ 0 :=
  ⟨Gravity.yukawa_solves k hr, rest_mode hv k, kernel_not_mode hk hv⟩

/-- The catch as a row (P3 §10.1). It reuses the gravity catch's theorem as a witness. -/
def row : Method.Row where
  id := "COID-KG-1"
  source := "the Klein-Gordon equation (∂ₜ²/v² - ∇² + k²)φ = 0: mass k, dispersion ω² = v²(p² + k²)"
  target := "the cheatsheet's time-dependent master equation, its memory kernel and its propagator (I, III)"
  signature := [(.operatorForm, "the same operator, term by term"),
    (.poles, "propagator 1/(p² + k² - ω²/v²): poles at real ω = ±v√(p² + k²), undamped modes")]
  imported := "the dispersion relation, the rest oscillation at ω = kv, the screened static limit"
  assumptions := [
    ⟨"plane waves obey ω² = v²(p² + k²)", .lean ``Fishing.KleinGordon.dispersion⟩,
    ⟨"the static limit is screened in space", .lean ``Fishing.Gravity.yukawa_solves⟩,
    ⟨"III's ω² = v²k² is the rest frequency", .lean ``Fishing.KleinGordon.rest_mode⟩,
    ⟨"τₘ = 1/(kv) is a decay time",
      .open_ "under Klein-Gordon 1/(kv) is the rest period over 2π; decay needs a damping term γ∂ₜ (the telegraph equation): AUTHOR, ISS-126"⟩,
    ⟨"the retarded propagator carries e^{-kvτ} on the light cone",
      .open_ "the massive retarded propagator is δ(τ - r/v)/(4πr) plus a J₁ tail inside the cone (Morse and Feshbach), no exponential; not formalised"⟩]
  prediction := "a poke rings at ω = kv and its static field is screened over ℓ = 1/k; nothing decays in time without damping"
  disconfirmation := "the programme means a damped equation; then the source is the telegraph equation, not Klein-Gordon (rule 4)"
  negativeControl := ⟨"the memory kernel: same k, same v, not a solution", .lean ``Fishing.KleinGordon.kernel_not_mode⟩

#guard row.wellFormed

#print axioms dispersion
#print axioms kernel_not_mode
#print axioms swapped

end Fishing.KleinGordon
