/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims
import Fishing.KleinGordon
import Fishing.Kramers

/-!
# P10 · Temporal Dynamics of the Universal Somatic Field

*Retarded Propagators, Transition Rates, and the Memory of Feeling*

[T]-Theory's tenth paper, as Lean. Source:
`paper/soma/soma-temporal-dynamics/soma-temporal-dynamics.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P10).

P10 puts the master equation in time, `(∂ₜ²/v² - ∇² + k²)Φ = -J`, defines the Somatic Memory Kernel
as its retarded Green's function integrated over space, `K(τ) = K₀ e^{-τ/τₘ}`, `τₘ = 1/(kv)`, and
uses Kramers' escape time for the asymmetry of trauma formation and dissolution. The fishing of
27 Nov (`Fishing.KleinGordon`, `Fishing.Kramers`) already proved what this needs, and the chapter's
claims are witnessed by those theorems. One of them does not hold as written: the equation rings at
rest (`ω = kv`), so a decaying exponential is not its kernel; it is the field's Euclidean correlation,
which is P14's setting (ISS-130, "the memory kernel").
-/

namespace TTheory.P10

open TTheory Fishing.KleinGordon

/-! ## The equation in time -/

/-- `G_R = 0` for `t < t'`: a kernel is retarded when it vanishes before the event. -/
def Retarded (K : ℝ → ℝ) : Prop := ∀ τ < 0, K τ = 0

/-- P10's kernel with its step function, `K₀ e^{-τ/τₘ} θ(τ)` (`K₀ = 1`, `τₘ = 1/(kv)`). -/
noncomputable def memoryKernel (k v τ : ℝ) : ℝ := if τ < 0 then 0 else kernel k v τ

theorem memoryKernel_retarded (k v : ℝ) : Retarded (memoryKernel k v) :=
  fun τ h => by simp [memoryKernel, h]

/-- "In the limit `k → 0`, the memory is permanent": at `k = 0` the kernel stays 1, and a smaller
    `k` keeps more of the past at every elapsed time. -/
theorem memory_permanent (v t : ℝ) : kernel 0 v t = 1 := by simp [kernel]

theorem smaller_k_longer {k k' v t : ℝ} (hv : 0 < v) (ht : 0 < t) (h : k' < k) :
    kernel k v t < kernel k' v t := by
  unfold kernel
  apply Real.exp_lt_exp.mpr
  nlinarith [mul_pos hv ht]

/-! ## Transition rates

"`⟨T⟩ = (2π/ω_A ω_B) e^{ΔV/D}`": the fishing's `Fishing.Kramers.kramers`. Dissolution (from inside
the well, the full barrier) grows exponentially with the barrier; formation, driven from above by the
event's forcing, does not have to climb it. -/

/-- The escape time rises strictly with the barrier. -/
theorem kramers_rises {ωA ωB ΔV ΔV' D : ℝ} (hA : 0 < ωA) (hB : 0 < ωB) (hD : 0 < D)
    (h : ΔV < ΔV') : Fishing.Kramers.kramers ωA ωB ΔV D < Fishing.Kramers.kramers ωA ωB ΔV' D := by
  unfold Fishing.Kramers.kramers
  apply mul_lt_mul_of_pos_left _ (by positivity)
  exact Real.exp_lt_exp.mpr (div_lt_div_of_pos_right h hD)

/-! ## P10's claims -/

def cDispersion : Claim where
  id := "P10.dispersion"
  text := "The time-dependent field equation: a plane wave solves it exactly when ω² = v²(p² + k²); \
    at rest it rings at ω = kv."
  statement := ∀ v : ℝ, v ≠ 0 → ∀ k p ω : ℝ,
    ((∀ x t, (p ^ 2 + k ^ 2 - ω ^ 2 / v ^ 2) * Real.cos (p * x - ω * t) = 0) ↔
      ω ^ 2 = v ^ 2 * (p ^ 2 + k ^ 2))

instance : Witness cDispersion := .of fun _ hv k p ω => dispersion hv k p ω

def cRetarded : Claim where
  id := "P10.retarded"
  text := "G_R(x,t; x',t') = 0 for t < t': the kernel vanishes before the event."
  statement := ∀ k v : ℝ, Retarded (memoryKernel k v)

instance : Witness cRetarded := .of memoryKernel_retarded

def cKernel : Claim where
  id := "P10.memory-kernel"
  text := "K(τ) = ∫d³x G_R(x,τ; 0,0) = K₀ e^{-τ/τₘ} θ(τ), τₘ = 1/(k v_s): the kernel of the \
    time-dependent field equation."
  statement := ∀ k v t : ℝ, k ≠ 0 → v ≠ 0 →
    (k * v) ^ 2 * kernel k v t / v ^ 2 + k ^ 2 * kernel k v t = 0

/-- Refuted by the equation itself: at rest it rings (`rest_mode`), and the decaying exponential
    leaves `2k²K ≠ 0` (`kernel_not_mode`). -/
instance : Refutation cKernel :=
  .of fun h => kernel_not_mode one_ne_zero one_ne_zero 0 (h 1 1 0 one_ne_zero one_ne_zero)

def cEuclidean : Claim where
  id := "P10.euclidean"
  text := "What the kernel is: the field's Euclidean correlation, which e^{-kvτ} solves in imaginary \
    time (P14's setting)."
  statement := ∀ v : ℝ, v ≠ 0 → ∀ k t : ℝ,
    -((k * v) ^ 2 * kernel k v t / v ^ 2) + k ^ 2 * kernel k v t = 0

instance : Witness cEuclidean := .of fun _ hv k t => kernel_euclidean hv k t

def cPermanent : Claim where
  id := "P10.long-memory"
  text := "Long-term memory corresponds to near-zero k: in the limit k → 0, the memory is \
    permanent."
  statement := (∀ v t : ℝ, kernel 0 v t = 1) ∧
    ∀ k k' v t : ℝ, 0 < v → 0 < t → k' < k → kernel k v t < kernel k' v t

instance : Witness cPermanent :=
  .of ⟨memory_permanent, fun _ _ _ _ hv ht h => smaller_k_longer hv ht h⟩

def cKramers : Claim where
  id := "P10.kramers"
  text := "⟨T⟩ = (2π/ω_A ω_B) e^{ΔV/D}: the escape time grows exponentially with the barrier \
    height, so trauma dissolution is far slower than its formation."
  statement := (∀ ωA ωB ΔV ΔV' D : ℝ, 0 < ωA → 0 < ωB → 0 < D → ΔV < ΔV' →
      Fishing.Kramers.kramers ωA ωB ΔV D < Fishing.Kramers.kramers ωA ωB ΔV' D) ∧
    ∀ W D : ℝ, Real.exp (W / (D / 2)) = Real.exp (W / D) ^ 2

instance : Witness cKramers :=
  .of ⟨fun _ _ _ _ _ hA hB hD h => kramers_rises hA hB hD h, Fishing.Kramers.arrhenius⟩

/-- P10's claims, in the paper's order. -/
def claims : List Claim :=
  [cDispersion, cRetarded, cKernel, cEuclidean, cPermanent, cKramers]

/-- P10's abstract, phrase by phrase. -/
def abstract : List (String × Claim) :=
  [("We derive a model retarded Green's function", cRetarded),
   ("give a Wentzel-Kramers-Brillouin (WKB) estimate for temporal barriers", cKramers),
   ("We introduce the Somatic Memory Kernel K(t - t'), the exponentially decaying influence of past \
      field configurations on present dynamics", cKernel),
   ("the paper models why trauma processing may be slower than trauma formation", cKramers)]

#status claims

#covers abstract claims

end TTheory.P10
