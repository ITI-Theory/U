import Mathlib
import Method

/-!
# Fishing, seventh catch: rapport as frequency locking (USC; ISS-126)

The cheatsheet (III): "Arnold tongue: rapport as Huygens frequency locking. Width = social/attentional
bandwidth: |ω_ext - ω₀| < Δω_lock(κ)". The standard model of locking is Adler's equation for the
phase difference φ of two coupled rhythms: dφ/dt = Δω - K sin φ.

1. `locks_iff`: a locked state (a fixed point) exists iff |Δω| ≤ K. The width Δω_lock is exactly the
   coupling K, so the tongue is a wedge, its width linear in the coupling.
2. `stable`: for |Δω| < K the locked state at φ* = arcsin(Δω/K) is stable (the slope -K cos φ* < 0).
3. `no_lock`: outside the wedge there is no fixed point: the phase slips. (The slip rate
   √(Δω² - K²) is standard but not formalised here.)

So the cheatsheet's Δω_lock(κ) has a form: Δω_lock = K(κ), and the claim to test is how K grows
with the coupling κ. Evidence labels: 1-3 `kernel-verified`; rapport as a phase difference between
two people's rhythms is `interpretive`.
-/

open Real

namespace Fishing.Locking

/-- 1. Adler: a locked state exists iff |Δω| ≤ K. -/
theorem locks_iff {K : ℝ} (hK : 0 < K) (Δω : ℝ) : (∃ φ, Δω - K * Real.sin φ = 0) ↔ |Δω| ≤ K := by
  constructor
  · rintro ⟨φ, h⟩
    have e : Δω = K * Real.sin φ := by linarith
    rw [e, abs_mul, abs_of_pos hK]
    exact mul_le_of_le_one_right hK.le (Real.abs_sin_le_one φ)
  · intro h
    have h1 : -1 ≤ Δω / K := by rw [le_div_iff₀ hK]; linarith [neg_abs_le Δω]
    have h2 : Δω / K ≤ 1 := by rw [div_le_iff₀ hK]; linarith [le_abs_self Δω]
    refine ⟨Real.arcsin (Δω / K), ?_⟩
    have e : K * (Δω / K) = Δω := by field_simp
    rw [Real.sin_arcsin h1 h2, e, sub_self]

/-- 2. Inside the wedge the locked state is stable: K cos φ* > 0. -/
theorem stable {K Δω : ℝ} (hK : 0 < K) (h : |Δω| < K) : 0 < K * Real.cos (Real.arcsin (Δω / K)) := by
  have hx : |Δω / K| < 1 := by rw [abs_div, abs_of_pos hK, div_lt_one hK]; exact h
  have hsq : (Δω / K) ^ 2 < 1 := (sq_lt_one_iff_abs_lt_one _).mpr hx
  rw [Real.cos_arcsin]
  exact mul_pos hK (Real.sqrt_pos.mpr (by linarith))

/-- 3. Outside the wedge, no locked state. -/
theorem no_lock {K Δω : ℝ} (hK : 0 < K) (h : K < |Δω|) : ∀ φ, Δω - K * Real.sin φ ≠ 0 :=
  fun φ hφ => absurd ((locks_iff hK Δω).mp ⟨φ, hφ⟩) (not_le.mpr h)

/-- The catch as a row. -/
def row : Method.Row where
  id := "COID-ADLER-1"
  source := "Adler's equation dφ/dt = Δω - K sin φ (Adler 1946; Huygens' clocks, 1665; Pikovsky, Rosenblum and Kurths 2001)"
  target := "rapport as frequency locking, the Arnold tongue |ω_ext - ω₀| < Δω_lock(κ) (cheatsheet III)"
  signature := [(.operatorForm, "a phase difference driven by detuning, pulled back by a periodic coupling"),
    (.symmetry, "φ ↦ φ + 2π")]
  imported := "Δω_lock = K: a wedge; stable lock inside, phase slips outside"
  assumptions := [
    ⟨"locking iff |Δω| ≤ K", .lean ``Fishing.Locking.locks_iff⟩,
    ⟨"the lock is stable inside", .lean ``Fishing.Locking.stable⟩,
    ⟨"rapport is a phase difference of two people's rhythms", .open_ "interpretive: which rhythm (breath, heart, EEG) is not stated"⟩,
    ⟨"K grows with the coupling κ", .open_ "the cheatsheet gives Δω_lock(κ) without a form: the claim to test"⟩]
  prediction := "two people's rhythms lock only within |Δω| ≤ K, and the window widens with coupling (a wedge); outside, the phase drifts in slips"
  disconfirmation := "locking measured well outside any coupling window, or a window that does not widen with coupling (rule 3)"
  negativeControl := ⟨"detuning beyond K: no locked state at all", .lean ``Fishing.Locking.no_lock⟩

#guard row.wellFormed

#print axioms locks_iff
#print axioms stable
#print axioms no_lock

end Fishing.Locking
