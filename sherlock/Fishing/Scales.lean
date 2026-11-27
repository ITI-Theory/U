import Mathlib
import Method
import UniversalSomaticField

/-!
# Fishing, a consistency catch: the zoom dial's range (USC; ISS-126)

Three statements of the same range:
- the cheatsheet: 10⁻³⁵ m to 10²⁶ m, "61 orders of magnitude";
- P21: nineteen steps of 10^3.207, 60.93 decades (registry/affidavits/cosmological-constant-derivation.yaml);
- the Lean (`SomaField.Universal.characteristicLength`, UniversalSomaticField.lean): 21 levels,
  steps of 10³, from 10⁻³⁵ m to 10²⁵ m, and its docstring says scale 20 ≈ 10²⁶ m (the Hubble radius).

1. `top_scale`: the Lean's top level is 10²⁵ m.
2. `span`: its range is 60 decades.
3. `below_hubble`: c/H₀ = 1.37 × 10²⁶ m (Planck 2018, H₀ = 67.36 km/s/Mpc) is more than 13 times the
   top level, so the dial stops an order of magnitude short of the scale it names.

4. `names_vs_lengths`: the Lean's own names (`scaleNames`) and lengths agree only at levels 0 and 1.
5. `named_steps`: the named scales are unevenly spaced (1 to 17 decades a step), so a uniform zoom
   (10³ or 10^3.207) cannot be the map between named levels.

Evidence label: `kernel-verified`. Which of the three is meant is the author's decision. The
module's header also says "Eleven orders of magnitude", which is stale.
-/

open Real SomaField.Universal

namespace Fishing.Scales

theorem level (n : ScaleLevel) : characteristicLength n = (10 : ℝ) ^ ((n.val : ℝ) * 3 - 35) := by
  rw [characteristicLength, Real.rpow_def_of_pos (by norm_num : (0 : ℝ) < 10)]

/-- 1. The top level is 10²⁵ m. -/
theorem top_scale : characteristicLength 20 = 10 ^ 25 := by
  rw [level]
  norm_num

/-- 2. Sixty decades from bottom to top. -/
theorem span : characteristicLength 20 / characteristicLength 0 = 10 ^ 60 := by
  rw [level, level, ← Real.rpow_sub (by norm_num : (0 : ℝ) < 10)]
  norm_num

/-- c/H₀ in metres: c = 299792458 m/s, H₀ = 67.36 km/s/Mpc, 1 Mpc = 3.0857 × 10²² m. -/
noncomputable def hubbleRadius : ℝ := 299792458 / (67.36e3 / 3.0857e22)

/-- 3. The Hubble radius is more than 13 times the top level. -/
theorem below_hubble : 13 * characteristicLength 20 < hubbleRadius := by
  rw [top_scale, hubbleRadius]
  norm_num

/-- The exponents `scaleNames` gives, levels 0 to 19 (UniversalSomaticField.lean). -/
def namedExp : List Int := [-35, -32, -15, -10, -9, -6, -3, -1, 0, 1, 3, 5, 6, 11, 16, 20, 22, 23, 24, 26]

/-- The exponents `characteristicLength` gives: 3n - 35. -/
def lengthExp : List Int := (List.range 20).map fun n => 3 * (n : Int) - 35

/-- 4. Names and lengths agree only at levels 0 and 1: the brain (level 7) is named 10⁻¹ m and placed at
    10⁻¹⁴ m, the size of a nucleus. -/
theorem names_vs_lengths :
    ((List.range 20).filter fun n => namedExp[n]! == lengthExp[n]!) = [0, 1] ∧
      namedExp[7]! = -1 ∧ lengthExp[7]! = -14 := by decide

/-- 5. The named scales are not evenly spaced (steps from 1 to 17 decades), so no single zoom
    ratio maps one level to the next. -/
theorem named_steps : (List.zipWith (· - ·) namedExp.tail namedExp).eraseDups.length > 1 ∧
    (List.zipWith (· - ·) namedExp.tail namedExp).max? = some 17 := by decide

#print axioms top_scale
#print axioms span
#print axioms below_hubble

end Fishing.Scales
