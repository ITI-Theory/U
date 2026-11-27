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

#print axioms top_scale
#print axioms span
#print axioms below_hubble

end Fishing.Scales
