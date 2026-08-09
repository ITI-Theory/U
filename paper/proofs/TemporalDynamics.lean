import Mathlib.Analysis.SpecialFunctions.ExpDeriv

/-!
# TemporalDynamics.lean — Retarded Propagator Causality

**Status**: Proved.  The retarded somatic propagator satisfies G_R(t,t') = 0
for t ≤ t'.  This was listed as a proof obligation in soma-temporal-dynamics (P10);
it is now closed.

## Key result

`somaticRetardedPropagator_isRetarded` — the causal boundary condition is not
merely stated but derived from the definition of the decay factor.  The proof is
one line: `linarith` from the definition's `if 0 < τ` guard.

The full spatial retarded propagator G_R(r,τ) = (v_s/4πr)·exp(-kv_sτ)·δ(τ-r/v_s)·θ(τ)
involves a delta function on the light-cone; that distributional identity is left for
a future update requiring Mathlib's distribution theory.  The temporal decay factor
and its causal property are fully proved here.
-/

namespace SomaField.Temporal

/-- The temporal decay factor of the retarded somatic propagator.
    Zero for τ ≤ 0 (past); positive exponential for τ > 0 (future). -/
noncomputable def retardedDecayFactor (k vs : ℝ) (τ : ℝ) : ℝ :=
  if 0 < τ then Real.exp (-k * vs * τ) else 0

/-- The somatic memory kernel K(τ) = K₀·exp(-τ/τ_m)·θ(τ).
    Governs how past field configurations influence the present. -/
noncomputable def somaticMemoryKernel (K₀ τ_m : ℝ) (τ : ℝ) : ℝ :=
  if 0 < τ then K₀ * Real.exp (-τ / τ_m) else 0

/-- A propagator G : ℝ → ℝ satisfies the causal (retarded) boundary condition
    when it vanishes for τ ≤ 0 (non-positive elapsed time). -/
def IsCausal (G : ℝ → ℝ) : Prop := ∀ τ : ℝ, τ ≤ 0 → G τ = 0

/-- A two-argument propagator G(t, t') is retarded when G(t, t') = 0 for all t ≤ t'.
    This is the formal statement that effects do not precede causes. -/
def IsRetarded (G : ℝ → ℝ → ℝ) : Prop :=
  ∀ t t' : ℝ, t ≤ t' → G t t' = 0

/-- **Proved**: the retarded decay factor is causal — it vanishes for τ ≤ 0.
    The proof is immediate from the `if 0 < τ` guard in the definition. -/
theorem retardedDecayFactor_isCausal (k vs : ℝ) :
    IsCausal (retardedDecayFactor k vs) := fun τ hτ => by
  simp [retardedDecayFactor, show ¬ 0 < τ from not_lt.mpr hτ]

/-- **Proved**: the somatic memory kernel is causal. -/
theorem somaticMemoryKernel_isCausal (K₀ τ_m : ℝ) :
    IsCausal (somaticMemoryKernel K₀ τ_m) := fun τ hτ => by
  simp [somaticMemoryKernel, show ¬ 0 < τ from not_lt.mpr hτ]

/-- The somatic retarded propagator as a function of two time arguments,
    defined via the decay factor with τ = t - t'. -/
noncomputable def somaticRetardedPropagator (k vs : ℝ) : ℝ → ℝ → ℝ :=
  fun t t' => retardedDecayFactor k vs (t - t')

/-- **KEY THEOREM — Proved**: the somatic retarded propagator satisfies the
    causal boundary condition G_R(t, t') = 0 for all t ≤ t'.

    This closes the proof obligation stated in soma-temporal-dynamics (P10):
    "The formal statement of causality — that G_R = 0 for t < t' — is a
    type-level constraint that can be encoded as a proof obligation in Lean 4."

    The proof requires only `linarith` from the definition's guard. -/
theorem somaticRetardedPropagator_isRetarded (k vs : ℝ) :
    IsRetarded (somaticRetardedPropagator k vs) := fun t t' htt' => by
  simp [somaticRetardedPropagator]
  apply retardedDecayFactor_isCausal
  linarith

/-- Corollary: causality is preserved under scaling of coupling constants.
    If the decay factor is causal at (k, vs), it is causal at (sc·k, vs/sc). -/
theorem retardedDecayFactor_isCausal_under_rescaling (k vs sc : ℝ) (hsc : 0 < sc) :
    IsCausal (retardedDecayFactor (sc * k) (vs / sc)) := fun τ hτ => by
  simp [retardedDecayFactor, show ¬ 0 < τ from not_lt.mpr hτ]

end SomaField.Temporal
