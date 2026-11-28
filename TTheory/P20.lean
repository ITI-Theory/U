/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P11
import UniversalSomaticField

/-!
# P20 · The Universal Somatic Field

[T]-Theory's twentieth paper, as Lean. Source:
`paper/soma/universal-somatic-field/universal-somatic-field.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P20).

P20 identifies the Green's function of `(∇² + k²) G = δ` with the oscillator string theory puts at
every point, sets out the eleven dimensions and the twenty-scale dial, and models consciousness as
a threshold. Its Lean (`UniversalSomaticField.lean`) proves the one-dimensional SHO identity,
honestly stated, and the predicate-level theorems it lists. Three things fail. The step from the
three-dimensional `G = e^{ik|x-x'|}/(4π|x-x'|)` to "`∂²G/∂x'² + k²G = δ`" in the source variable:
the 3D `G` satisfies the radial equation `G'' + k²G = -(2/r) G'`, not the oscillator's, which is the
1D `sin(k|x|)/(2k)` the Lean uses. `characteristicLength` (`10^{3n-35}`) puts the swarm at
`10⁻⁸` m where `scaleNames` in the same file says `10¹` m. And `FieldEquation n` holds a wavenumber
and any function at all: the "field equation at every scale" is inhabited by `G = 0`, so
`scale_invariance_inhabited`, `universal_field_theory` and `sft_encapsulates_cemi` assert no
equation. The table against the dial is in `TTheory.P20.Dial`.
-/

namespace TTheory.P20

open TTheory Filter Topology Real SomaField.Universal

/-! ## The oscillator and the three-dimensional `G`

"For fixed observation point `x`, the function `x' ↦ G(x, x')` satisfies the SHO equation in the
source variable: `∂²G/∂x'² + k²G = δ(x' - x)`". Along a ray from the source the 3D `G` (its real
part, P11's `green`) satisfies the radial Helmholtz equation, whose extra term is `(2/r) G'`. -/

theorem radial (k : ℝ) {r : ℝ} (hr : 0 < r) :
    deriv (deriv (P11.green k)) r + k ^ 2 * P11.green k r = -(2 / r) * deriv (P11.green k) r := by
  have hev : deriv (P11.green k) =ᶠ[𝓝 r]
      fun s => (-(k * s * sin (k * s)) - cos (k * s)) / (4 * π * s ^ 2) :=
    eventually_of_mem (Ioi_mem_nhds hr) fun s hs => (P11.green_deriv k (ne_of_gt hs)).deriv
  have hN : HasDerivAt (fun s => -(k * s * sin (k * s)) - cos (k * s)) (-(k ^ 2 * r * cos (k * r)))
      r := by
    have h1 := (((hasDerivAt_id r).const_mul k).mul ((hasDerivAt_id r).const_mul k).sin).neg
    have h2 := ((hasDerivAt_id r).const_mul k).cos
    refine (h1.sub h2).congr_deriv ?_
    simp only [id]; ring
  have hD : HasDerivAt (fun s => 4 * π * s ^ 2) (8 * π * r) r := by
    refine ((hasDerivAt_pow 2 r).const_mul (4 * π)).congr_deriv ?_
    ring
  have hh : HasDerivAt (fun s => (-(k * s * sin (k * s)) - cos (k * s)) / (4 * π * s ^ 2)) _ r :=
    hN.div hD (by positivity)
  rw [hev.deriv_eq, hh.deriv, (P11.green_deriv k hr.ne').deriv]
  unfold P11.green
  field_simp
  ring

/-- At `k = 1`, `r = π` the slope is `1/(4π³)`, so the oscillator's equation fails there. -/
theorem not_oscillator : deriv (deriv (P11.green 1)) π + 1 ^ 2 * P11.green 1 π ≠ 0 := by
  rw [radial 1 pi_pos, (P11.green_deriv 1 pi_ne_zero).deriv]
  have : 0 < π := pi_pos
  norm_num [sin_pi, cos_pi, pi_ne_zero]

/-! ## The dial's lengths

"`characteristicLength` ... Scale 0 ≈ 10⁻³⁵ m (Planck). Scale 20 ≈ 10²⁶ m (Hubble radius)", and
`scaleNames 9 = "Swarm / crowd (10¹ m)"`: the formula gives `10⁻⁸` m at Scale 9. -/

theorem length_9 : characteristicLength ⟨9, by norm_num⟩ < 1 := by
  unfold characteristicLength
  rw [exp_lt_one_iff]
  have := log_pos (by norm_num : (1 : ℝ) < 10)
  norm_num
  linarith

/-! ## The field equation's type -/

/-- `FieldEquation n` is a wavenumber and any function: `G = 0` is one. -/
def zeroField (n : ScaleLevel) : FieldEquation n := ⟨1, one_pos, fun _ _ => 0⟩

/-! ## The double well and the drift

"`V(x) = W·(x² - 1)²` ... a valley at each stated endpoint"; the volitional section's drift
"`-∇H`" for `H = (e² - 1)²` is `-4e(e² - 1)`. -/

theorem drift (e : ℝ) : HasDerivAt (fun e => (e ^ 2 - 1) ^ 2) (4 * e * (e ^ 2 - 1)) e := by
  have := ((hasDerivAt_pow 2 e).sub_const 1).pow 2
  refine this.congr_deriv ?_
  simp; ring

/-! ## P20's claims -/

def cSHO : Claim where
  id := "P20.sho"
  text := "greens_fn_is_SHO: G(x) = sin(k|x|)/(2k) solves G'' + k²G = 0 on each side of the \
    source, is continuous there, and its slope jumps by exactly 1."
  statement := ∀ (n : ScaleLevel) (eq : FieldEquation n),
    (∀ x, HasDerivAt (shoBranch eq.k) (shoSlope eq.k x) x) ∧
    (∀ x, HasDerivAt (shoSlope eq.k) (-(eq.k ^ 2) * shoBranch eq.k x) x) ∧
    (∀ x, 0 ≤ x → shoGreen eq.k x = shoBranch eq.k x) ∧
    (∀ x, x ≤ 0 → shoGreen eq.k x = -shoBranch eq.k x) ∧
    shoSlope eq.k 0 - (-shoSlope eq.k 0) = 1

instance : Witness cSHO := .of greens_fn_is_SHO

def cIdentification : Claim where
  id := "P20.identification"
  text := "G(x, x') = e^{ik|x-x'|}/(4π|x-x'|): for fixed x, x' ↦ G(x, x') satisfies the SHO \
    equation ∂²G/∂x'² + k²G = δ(x' - x), away from the singularity."
  statement := ∀ k r : ℝ, 0 < r → deriv (deriv (P11.green k)) r + k ^ 2 * P11.green k r = 0

/-- The 3D `G` satisfies the radial equation, `G'' + k²G = -(2/r)G'`; at `k = 1`, `r = π` that is
    not `0`. -/
instance : Refutation cIdentification := .of fun h => not_oscillator (h 1 π pi_pos)

def cRadial : Claim where
  id := "P20.radial"
  text := "What the 3D G does satisfy along a ray: G'' + k²G = -(2/r) G', the radial Helmholtz \
    equation (the 1D oscillator is the separate sin(k|x|)/(2k))."
  statement := ∀ k r : ℝ, 0 < r →
    deriv (deriv (P11.green k)) r + k ^ 2 * P11.green k r = -(2 / r) * deriv (P11.green k) r

instance : Witness cRadial := .of fun k _ hr => radial k hr

def cEleven : Claim where
  id := "P20.eleven"
  text := "M₁₁ = M₄ × P₃ × L₁ × C₃, X₇ = P₃ × L₁ × C₃ (3 + 1 + 3 = 7): somaField_iso_mtheory, a \
    type isomorphism, not a compactification."
  statement := P11.cEleven.statement

instance [h : Witness P11.cEleven] : Witness cEleven := .of h.proof

def cWell : Claim where
  id := "P20.well"
  text := "V(x) = W(x² - 1)² on the limbic axis: a valley at each endpoint, x = ±1; the drift -∇H \
    of H = (e² - 1)² is -4e(e² - 1)."
  statement := (∀ (p : SomaField.LimbicTunnel.BarrierParam) x, 0 ≤ SomaField.LimbicTunnel.V p x ∧
      SomaField.LimbicTunnel.V p 1 = 0 ∧ SomaField.LimbicTunnel.V p (-1) = 0) ∧
    ∀ e : ℝ, HasDerivAt (fun e => (e ^ 2 - 1) ^ 2) (4 * e * (e ^ 2 - 1)) e

instance : Witness cWell := .of ⟨fun p x => ⟨SomaField.LimbicTunnel.V_nonneg p x,
  by simp [SomaField.LimbicTunnel.V], by simp [SomaField.LimbicTunnel.V]⟩, drift⟩

def cLength : Claim where
  id := "P20.length"
  text := "characteristicLength: Scale 0 ≈ 10⁻³⁵ m ... Scale 20 ≈ 10²⁶ m, the dial of scaleNames \
    (Scale 9, swarm / crowd, 10¹ m)."
  statement := 1 ≤ characteristicLength ⟨9, by norm_num⟩

/-- `10^{3·9-35} = 10⁻⁸` m. -/
instance : Refutation cLength := .of fun h => absurd length_9 (not_lt.mpr h)

def cFieldEverywhere : Claim where
  id := "P20.field-everywhere"
  text := "At every level the structural equation is (∇² + k²(n)) G = δ \
    (scale_invariance_inhabited, universal_field_theory, sft_encapsulates_cemi)."
  statement := ∀ (n : ScaleLevel) (eq : FieldEquation n), eq.G ≠ fun _ _ => 0

/-- `FieldEquation n` holds any function: the zero function is one, and it answers no source. -/
instance : Refutation cFieldEverywhere := .of fun h => h 0 (zeroField 0) rfl

def cConsciousness : Claim where
  id := "P20.consciousness"
  text := "consciousness_dichotomy and consciousness_monotone: the threshold predicates' \
    trichotomy and monotonicity (the predicate structure, not empirical consciousness)."
  statement := (∀ φ : LimbicAmplitude, isPreconscious φ ∨ isConscious φ) ∧
    (∀ φ₁ φ₂ : LimbicAmplitude, φ₁ ≤ φ₂ → isConscious φ₁ → isConscious φ₂) ∧
    0 < consciousnessThreshold

instance : Witness cConsciousness :=
  .of ⟨consciousness_dichotomy, consciousness_monotone, threshold_positive⟩

def cVolitional : Claim where
  id := "P20.volitional"
  text := "The volitional update reduces to the autonomous update when J = 0, and is linear in J."
  statement := (∀ (e : Field8) (dt : ℝ),
      volitional_update e (fun _ => 0) dt = autonomous_update e dt) ∧
    ∀ (e J₁ J₂ : Field8) (dt : ℝ), volitional_update e (fun i => J₁ i + J₂ i) dt =
      fun i => volitional_update e J₁ dt i + dt * J₂ i

instance : Witness cVolitional := .of ⟨volitional_is_autonomous_when_zero, volitional_superposition⟩

/-- That the SFT's 11D decomposition is Schreiber's modal HoTT (`sft_iso_modal_hott`, whose Lean
    statement is `True`), and that it grounds Hoffman's conscious agents (`sft_grounds_hoffman`,
    `True`). -/
opaque modalHoTT : Prop

def cModalHoTT : Claim where
  id := "P20.modal-hott"
  text := "Schreiber's modal homotopy type theory: the USF's 11D decomposition as a Σ-type over \
    the scale levels; Hoffman's conscious agents as its first-person reading."
  statement := modalHoTT

/-- P20's claims, in the paper's order. -/
def claims : List Claim :=
  [cIdentification, cSHO, cRadial, cEleven, cWell, cFieldEverywhere, cLength, cConsciousness,
    cModalHoTT, cVolitional]

#status claims

end TTheory.P20
