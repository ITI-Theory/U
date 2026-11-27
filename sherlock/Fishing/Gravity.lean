import Mathlib
import Method

/-!
# Fishing, after Einstein: gravity in the Universal Soma Field (USC; ISS-126)

The discipline of the Einstein backtest (`sherlock/backtests/Einstein1905.lean`), applied to
[T]-Theory: take the cheatsheet's premises (`books/T-Theory/booklet/booklet_body.md`, I, the master
field equation), derive what follows for a static point mass (a "poke"), and say exactly which
premises are missing. Away from the source, in 3D, the radial Laplacian is f'' + (2/r) f'.

The cheatsheet writes the stationary form as (∇² + k²)G = -δ (oscillating), but its time-dependent
form (∂ₜ²/v² - ∇² + k²)Φ = -J has the static limit (∇² - k²)Φ = J (decaying, a mass k), and the
rest of the page (correlation length 1/k, the decay e^{-k v τ}, the free USF as the GFF of mass k)
is the decaying one; `UniversalSomaticField.greens_fn_is_SHO` uses the oscillating one.

1. `yukawa_solves`, `wave_solves`: e^{-kr}/r solves the decaying form, cos(kr)/r the oscillating one.
2. `yukawa_not_oscillating`: for k ≠ 0, e^{-kr}/r does not solve the oscillating form: the two
   readings of k² are different physics (a mass against a wavenumber); the cheatsheet must pick one.
3. `newton`: at k = 0 both give Newton's potential, 1/r, which is harmonic; `newton_limit`: the
   decaying response tends to it as k → 0. Gravity, read in the USF, is the static response to a
   mass poke with k → 0 at the scales where gravity is measured.
4. `coupling_free`: the equation is linear, so any multiple solves it: Newton's constant G (how a
   mass pokes the field) is not fixed by the master equation; it is an input (the gap, as Planck's
   was for Einstein). Also not given: that the field's static amplitude is the gravitational
   potential, and the sign (attraction).

The row `COID-GRAV-1` (P3's registration template, `Method`) records the import at S1, with its
open assumptions as the loose ends.

Evidence labels: 1-4 `kernel-verified` statements about these functions; "gravity is the USF's
static response with k → 0" is `derived-under-assumptions` (the identification and G as inputs);
a nonzero k at solar-system scales (a Yukawa or oscillating correction to Newton) is an
`open-hypothesis`, bounded by solar-system tests, to quantify against the scale law k(σ).
-/

open Real Filter Topology

namespace Fishing.Gravity

/-- The decaying (screened, Yukawa) response to a point poke, and its first two derivatives. -/
noncomputable def yukawa (k r : ℝ) : ℝ := Real.exp (-(k * r)) / r
noncomputable def yukawa' (k r : ℝ) : ℝ := -(Real.exp (-(k * r)) * (k * r + 1)) / r ^ 2
noncomputable def yukawa'' (k r : ℝ) : ℝ :=
  Real.exp (-(k * r)) * (k ^ 2 * r ^ 2 + 2 * k * r + 2) / r ^ 3

/-- The oscillating (Helmholtz) response, and its first two derivatives. -/
noncomputable def wave (k r : ℝ) : ℝ := Real.cos (k * r) / r
noncomputable def wave' (k r : ℝ) : ℝ := -(k * r * Real.sin (k * r) + Real.cos (k * r)) / r ^ 2
noncomputable def wave'' (k r : ℝ) : ℝ :=
  (-(k ^ 2 * r ^ 2) * Real.cos (k * r) + 2 * k * r * Real.sin (k * r) + 2 * Real.cos (k * r)) / r ^ 3

theorem yukawa_deriv (k : ℝ) {r : ℝ} (hr : r ≠ 0) : HasDerivAt (yukawa k) (yukawa' k r) r := by
  have he : HasDerivAt (fun r => Real.exp (-(k * r))) (Real.exp (-(k * r)) * -(k * 1)) r :=
    (((hasDerivAt_id' r).const_mul k).neg).exp
  have h := he.div (hasDerivAt_id' r) hr
  refine h.congr_deriv ?_
  simp only [yukawa']
  field_simp
  ring

theorem yukawa'_deriv (k : ℝ) {r : ℝ} (hr : r ≠ 0) : HasDerivAt (yukawa' k) (yukawa'' k r) r := by
  have he : HasDerivAt (fun r => Real.exp (-(k * r))) (Real.exp (-(k * r)) * -(k * 1)) r :=
    (((hasDerivAt_id' r).const_mul k).neg).exp
  have hp : HasDerivAt (fun r => k * r + 1) (k * 1) r := ((hasDerivAt_id' r).const_mul k).add_const 1
  have hn := (he.mul hp).neg
  have hd : HasDerivAt (fun r : ℝ => r ^ 2) (2 * r) r := by simpa using hasDerivAt_pow 2 r
  have h := hn.div hd (pow_ne_zero 2 hr)
  refine h.congr_deriv ?_
  simp only [yukawa'', Pi.neg_apply, Pi.mul_apply]
  field_simp
  ring

theorem wave_deriv (k : ℝ) {r : ℝ} (hr : r ≠ 0) : HasDerivAt (wave k) (wave' k r) r := by
  have hc : HasDerivAt (fun r => Real.cos (k * r)) (-Real.sin (k * r) * (k * 1)) r :=
    ((hasDerivAt_id' r).const_mul k).cos
  have h := hc.div (hasDerivAt_id' r) hr
  refine h.congr_deriv ?_
  simp only [wave']
  field_simp
  ring

theorem wave'_deriv (k : ℝ) {r : ℝ} (hr : r ≠ 0) : HasDerivAt (wave' k) (wave'' k r) r := by
  have hs : HasDerivAt (fun r => Real.sin (k * r)) (Real.cos (k * r) * (k * 1)) r :=
    ((hasDerivAt_id' r).const_mul k).sin
  have hc : HasDerivAt (fun r => Real.cos (k * r)) (-Real.sin (k * r) * (k * 1)) r :=
    ((hasDerivAt_id' r).const_mul k).cos
  have hkr : HasDerivAt (fun r => k * r) (k * 1) r := (hasDerivAt_id' r).const_mul k
  have hn := ((hkr.mul hs).add hc).neg
  have hd : HasDerivAt (fun r : ℝ => r ^ 2) (2 * r) r := by simpa using hasDerivAt_pow 2 r
  have h := hn.div hd (pow_ne_zero 2 hr)
  refine h.congr_deriv ?_
  simp only [wave'', Pi.neg_apply, Pi.mul_apply, Pi.add_apply]
  field_simp
  ring

/-- 1a. The decaying response solves (∇² - k²) f = 0 away from the poke. -/
theorem yukawa_solves (k : ℝ) {r : ℝ} (hr : r ≠ 0) :
    yukawa'' k r + 2 / r * yukawa' k r - k ^ 2 * yukawa k r = 0 := by
  simp only [yukawa, yukawa', yukawa'']
  field_simp
  ring

/-- 1b. The oscillating response solves (∇² + k²) f = 0 away from the poke. -/
theorem wave_solves (k : ℝ) {r : ℝ} (hr : r ≠ 0) :
    wave'' k r + 2 / r * wave' k r + k ^ 2 * wave k r = 0 := by
  simp only [wave, wave', wave'']
  field_simp
  ring

/-- 2. The two readings of k² are different physics: for k ≠ 0 the decaying response is not a
    solution of the oscillating form (it leaves 2k² f behind). -/
theorem yukawa_not_oscillating {k : ℝ} (hk : k ≠ 0) {r : ℝ} (hr : 0 < r) :
    yukawa'' k r + 2 / r * yukawa' k r + k ^ 2 * yukawa k r ≠ 0 := by
  have h := yukawa_solves k hr.ne'
  have e : yukawa'' k r + 2 / r * yukawa' k r + k ^ 2 * yukawa k r = 2 * k ^ 2 * yukawa k r := by
    linarith
  rw [e]
  exact mul_ne_zero (mul_ne_zero two_ne_zero (pow_ne_zero 2 hk)) (div_pos (Real.exp_pos _) hr).ne'

/-- 3a. At k = 0 both responses are Newton's potential 1/r, and it is harmonic: ∇²(1/r) = 0. -/
theorem newton {r : ℝ} (hr : r ≠ 0) :
    yukawa 0 r = 1 / r ∧ wave 0 r = 1 / r ∧ yukawa'' 0 r + 2 / r * yukawa' 0 r = 0 := by
  refine ⟨by simp [yukawa], by simp [wave], ?_⟩
  have h := yukawa_solves 0 hr
  simpa using h

/-- 3b. The decaying response tends to Newton's as k → 0. -/
theorem newton_limit (r : ℝ) : Tendsto (fun k => yukawa k r) (𝓝 0) (𝓝 (1 / r)) := by
  have hc : Continuous (fun k : ℝ => yukawa k r) := by
    unfold yukawa; fun_prop
  simpa [yukawa] using hc.tendsto 0

/-- 4. The gap: the equation is linear, so the strength of the response (Newton's G times the
    mass) is not fixed by it: any multiple solves it as well. -/
theorem coupling_free (k a : ℝ) {r : ℝ} (hr : r ≠ 0) :
    a * yukawa'' k r + 2 / r * (a * yukawa' k r) - k ^ 2 * (a * yukawa k r) = 0 := by
  linear_combination a * yukawa_solves k hr

/-- The fishing as a row of the method (P3 §10.1), at S1: the structure is proved, every physical
    assumption is open, and the first of them is a contradiction in the cheatsheet itself. -/
def row : Method.Row where
  id := "COID-GRAV-1"
  source := "the screened Poisson (Yukawa) Green's function e^{-kr}/r, and Newton's potential 1/r at k = 0"
  target := "the USF's static response to a point mass (a poke), cheatsheet I, the master equation"
  signature := [
    (.operatorForm, "static limit of (∂ₜ²/v² - ∇² + k²)Φ = -J: (∇² - k²)Φ = J, the screened Poisson equation"),
    (.poles, "propagator 1/(p² + k²): a pole at p² = -k², a mass k (the GFF of USF_OSAxioms)"),
    (.units, "missing: Φ has no stated units, so nothing converts a mass to a source (Newton's G)")]
  imported := "Newton's potential as the k → 0 limit of the screened response (newton, newton_limit)"
  assumptions := [
    ⟨"the static response solves (∇² - k²)Φ = J away from the source", .lean ``Fishing.Gravity.yukawa_solves⟩,
    ⟨"the master equation's k² term is a mass (decay), not a wavenumber (oscillation)",
      .open_ "the cheatsheet writes both signs; greens_fn_is_SHO uses +k²; COID-KG-1: the time-dependent form is Klein-Gordon, whose static limit decays (AUTHOR, ISS-126)"⟩,
    ⟨"the field's static amplitude is the gravitational potential", .open_ "an identification, not in the cheatsheet"⟩,
    ⟨"a mass pokes the field with strength G M", .open_ "the equation does not fix it (coupling_free): an input, as Planck's constant was"⟩,
    ⟨"the response attracts", .open_ "the sign of J for a mass is not stated"⟩,
    ⟨"k(σ) is small at the scales where gravity is measured", .open_ "the scale law k(σ) at 10⁹ to 10¹³ m is not stated"⟩]
  prediction := "a Yukawa correction to Newton, -GM(1 + α e^{-r/λ})/r with λ = 1/k(σ), seen at r ≈ λ"
  disconfirmation := "fifth-force and ephemeris bounds on (α, λ) exclude λ = 1/k(σ) (rule 3); or GR explains the same data with fewer assumptions (rule 4)"
  negativeControl := ⟨"the +k² reading: the same operator shape, other physics; e^{-kr}/r does not solve it",
    .lean ``Fishing.Gravity.yukawa_not_oscillating⟩

#guard row.wellFormed
#eval row.openAssumptions.length  -- 5 loose ends: the fishing's catch

-- The receipt: only Lean's standard axioms.
#print axioms yukawa_deriv
#print axioms yukawa'_deriv
#print axioms wave'_deriv
#print axioms yukawa_not_oscillating
#print axioms newton
#print axioms newton_limit
#print axioms coupling_free

end Fishing.Gravity
