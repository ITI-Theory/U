import Mathlib
import Method
import Fishing.Gravity
import Fishing.Scales

/-!
# Fishing, twelfth catch: which scale's k is gravity's? (USC; ISS-126)

From the bait of COID-GRAV-1: "k(σ) is small at the scales where gravity is measured". If gravity is the
master equation's static response (GRAV-1, KK-1's zero mode), a nonzero k is a graviton mass,
m_g c² = ħ k c, and a Yukawa range λ = 1/k. Gravitational waves bound it: m_g ≤ 1.27 × 10⁻²³ eV/c²
(LIGO-Virgo-KAGRA, GWTC-3, 2021), so λ ≥ ħc/(m_g c²) ≈ 1.55 × 10¹⁶ m.

1. `local_excluded`: k = 1/ℓ at the solar system's scale (10¹¹ m, `scaleNames` 13) is excluded: its mass is
   about 2 × 10⁻¹⁸ eV, five orders above the bound.
2. `cosmic_allowed`: k = H₀/c (the Hubble scale) gives about 1.4 × 10⁻³³ eV, ten orders below it.
3. `dial_needs_18`: on the Lean's dial (`characteristicLength`, 10^{3σ - 35} m) every level up to σ = 17 is
   shorter than the bound's range; gravity's k can only come from σ ≥ 18.

So the scale law cannot give gravity the k of the scale where it is measured: gravity is the cosmic mode,
if it is a mode at all. Evidence labels: 1-3 `kernel-verified` arithmetic on cited constants (ħ, c, eV
exact by SI; H₀ Planck 2018); the bound is cited.
-/

open Real SomaField.Universal

namespace Fishing.Graviton

noncomputable def hbar : ℝ := 1.054571817e-34
noncomputable def c : ℝ := 299792458
noncomputable def eV : ℝ := 1.602176634e-19
/-- H₀ = 67.36 km/s/Mpc in s⁻¹. -/
noncomputable def H0 : ℝ := 67.36e3 / 3.0857e22
/-- GWTC-3's bound on the graviton's mass, in eV/c². -/
noncomputable def bound : ℝ := 1.27e-23

/-- The mass, in eV, of a field whose k is 1/L: ħc/L. -/
noncomputable def massOfRange (L : ℝ) : ℝ := hbar * c / L / eV

/-- 1. The solar system's scale as gravity's range: excluded. -/
theorem local_excluded : bound < massOfRange 1e11 := by
  unfold bound massOfRange hbar c eV; norm_num

/-- 2. The Hubble scale: allowed. -/
theorem cosmic_allowed : hbar * H0 / eV < bound := by
  unfold bound hbar H0 eV; norm_num

/-- The bound's shortest range: ħc/(m_g c²) > 1.5 × 10¹⁶ m. -/
theorem shortest_range : 1.5e16 < hbar * c / (bound * eV) := by
  unfold bound hbar c eV; norm_num

/-- 3. Up to σ = 17 the dial's length is at most 10¹⁶ m: too short. -/
theorem dial_needs_18 (n : ScaleLevel) (h : n.val ≤ 17) : characteristicLength n < 1.5e16 := by
  rw [Fishing.Scales.level]
  have hle : ((n.val : ℝ) * 3 - 35) ≤ 16 := by
    have : (n.val : ℝ) ≤ 17 := by exact_mod_cast h
    linarith
  calc (10 : ℝ) ^ ((n.val : ℝ) * 3 - 35) ≤ 10 ^ (16 : ℝ) :=
        Real.rpow_le_rpow_of_exponent_le (by norm_num) hle
    _ < 1.5e16 := by norm_num

def row : Method.Row where
  id := "COID-GRAV-2"
  source := "a massive graviton (a Yukawa range λ = ħ/(m_g c)), bounded by GWTC-3: m_g ≤ 1.27 × 10⁻²³ eV/c²"
  target := "gravity as the USF's static response with k(σ) (COID-GRAV-1; KK-1's zero mode)"
  signature := [(.poles, "a pole at p² = -k²: the graviton's mass ħk/c"), (.units, "eV: ħ k c")]
  imported := "k ≤ m_g c/ħ: gravity's range at least 1.5 × 10¹⁶ m (shortest_range)"
  assumptions := [
    ⟨"gravity is the field's static response", .open_ "COID-GRAV-1's identification"⟩,
    ⟨"the bound holds for this field's quanta", .cited "LIGO-Virgo-KAGRA GWTC-3 (2021), dispersion of the waves"⟩,
    ⟨"gravity's k is the cosmic k, H₀/c", .lean ``Fishing.Graviton.cosmic_allowed⟩,
    ⟨"the dial's levels below σ = 18 cannot carry gravity", .lean ``Fishing.Graviton.dial_needs_18⟩]
  prediction := "if gravity is the cosmic mode, its graviton mass is ħH₀/c² ≈ 1.4 × 10⁻³³ eV: Yukawa deviations only at r ~ c/H₀"
  disconfirmation := "a graviton mass bound below ħH₀/c², or a local deviation from Newton at r ≪ c/H₀ (rule 3)"
  negativeControl := ⟨"the solar-system scale's k as gravity's: excluded by the waves", .lean ``Fishing.Graviton.local_excluded⟩

#guard row.wellFormed

#print axioms local_excluded
#print axioms cosmic_allowed
#print axioms dial_needs_18

end Fishing.Graviton
