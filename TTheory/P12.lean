/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P2
import TTheory.P11
import SwarmPropagator
import QuantumSim
import UniversalSomaticField

/-!
# P12 · Experimental Benchmarks for the Universal Somatic Field Framework

[T]-Theory's twelfth paper, as Lean. Source:
`paper/soma/experimental-validation/experimental-validation.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P12).

P12 sets benchmarks beside the programme's theorems: each benchmark names the Lean it rests on, and
here each such claim is witnessed by that Lean. Its numbers are checked (Britain 1939, the Kuramoto
order parameter). Two things do not hold: the tunnelling gate P12 states is not the gate the cited
Lean uses, and the variational axiom of the module P12 cites for its cost comparison,
`SwarmPropagator.greens_achieves_minimum_energy`, is inconsistent: it says the propagator's step
minimises every function at once.
-/

namespace TTheory.P12

open TTheory Complex

/-! ## The benchmarks' theorems, as cited -/

/-- "The FM-HN USF 2026 ... tunnelling gate `T = exp(-W)`": the gate of `QuantumSim`, which P12
    cites for the MNIST and QUANT-EXP-1 benchmarks, turns by `wkbAmplitude W = exp(-8√(2W)/3)`; at
    `W = 8` that is `exp(-32/3)`, not `exp(-8)`. -/
theorem gate_at_8 : SomaField.LimbicTunnel.wkbAmplitude 8 = Real.exp (-(32 / 3)) := by
  rw [P11.theta_is_wkb, show (2 : ℝ) * 8 = 4 ^ 2 by norm_num, Real.sqrt_sq (by norm_num)]
  norm_num

theorem gates_differ : Real.exp (-8) ≠ SomaField.LimbicTunnel.wkbAmplitude 8 := by
  rw [gate_at_8]
  intro h
  have := Real.exp_injective h
  norm_num at this

/-! ## Britain 1939 and the cost comparison

"A dense exact USF propagator would require `O(N²) = O(2 × 10¹⁵)` operations ... The formal theorem
`propagator_beats_classical` cannot be instantiated with `N = 45,000,000` and `K = 5` because its
premise is `N < K`." -/

theorem britain : (45000000 : ℕ) ^ 2 = 2025000000000000 ∧ ¬ (45000000 : ℕ) < 5 := by decide

/-! ## The Kuramoto order parameter

"`r = N⁻¹ |Σⱼ e^{iθⱼ}|` measures global synchronisation: r = 0 is incoherence, r = 1 is perfect
phase-lock": it never exceeds 1, and equal phases give 1. -/

theorem kuramoto_le_one {n : ℕ} (θ : Fin n → ℝ) : ‖∑ j, Complex.exp (θ j * I)‖ ≤ n := by
  calc ‖∑ j, Complex.exp (θ j * I)‖ ≤ ∑ j, ‖Complex.exp (θ j * I)‖ := norm_sum_le _ _
    _ = n := by simp [Complex.norm_exp_ofReal_mul_I]

theorem kuramoto_locked {n : ℕ} (φ : ℝ) : ‖∑ _j : Fin n, Complex.exp (φ * I)‖ = n := by
  simp [Complex.norm_exp_ofReal_mul_I]

/-! ## The swarm module's variational axiom

"`axiom greens_achieves_minimum_energy (G) (s) (E : SwarmState n → ℝ) : ∀ s', E (propagatorStep G s)
≤ E s'`": for every function `E`. One agent, `G = 0`, `E(x) = x₀` and `s' = -1` give `0 ≤ -1`. -/

theorem swarm_axiom_false : ¬ ∀ (n : ℕ) (G : SomaField.SwarmPropagator.Propagator n)
    (s : SomaField.SwarmPropagator.SwarmState n) (E : SomaField.SwarmPropagator.SwarmState n → ℝ)
    (s' : SomaField.SwarmPropagator.SwarmState n),
    E (SomaField.SwarmPropagator.propagatorStep G s) ≤ E s' := by
  intro h
  have := h 1 0 0 (fun x => x 0) (fun _ => -1)
  simp [SomaField.SwarmPropagator.propagatorStep] at this
  linarith

/-! ## P12's claims -/

def cGate : Claim where
  id := "P12.gate"
  text := "FM-HN USF 2026: the tunnelling gate T = exp(-W), the WKB gate of QuantumSim.lean."
  statement := ∀ W : ℝ, 0 < W → Real.exp (-W) = SomaField.LimbicTunnel.wkbAmplitude W

/-- Refuted at `W = 8`: the cited gate turns by `exp(-32/3)`. -/
instance : Refutation cGate := .of fun h => gates_differ (h 8 (by norm_num))

def cReachable : Claim where
  id := "P12.reachable"
  text := "quant_exp_1_awe_reachable (QuantumSim.lean): after the WKB gate the Born probability of \
    |awe⟩ is strictly positive for any W > 0."
  statement := ∀ W : ℝ, 0 < W → 0 < SomaField.QuantumSim.bornProb SomaField.QuantumSim.aweState
    (SomaField.QuantumSim.applyOperator (SomaField.QuantumSim.wkbGate W)
      SomaField.QuantumSim.fearState)

instance : Witness cReachable := .of SomaField.QuantumSim.quant_exp_1_awe_reachable

def cCost : Claim where
  id := "P12.cost"
  text := "propagator_beats_classical (SwarmPropagator.lean): the propagator costs less than \
    classical iteration only when N < K."
  statement := ∀ N K : ℕ, 0 < N → N < K →
    SomaField.SwarmPropagator.propagatorCost N < SomaField.SwarmPropagator.classicalCost N K

instance : Witness cCost := .of SomaField.SwarmPropagator.propagator_beats_classical

def cJellyfish : Claim where
  id := "P12.jellyfish"
  text := "jellyfish_single_step (SwarmPropagator.lean): one update is one matrix-vector product."
  statement := ∀ (n : ℕ) (swarm : SomaField.SwarmPropagator.JellyfishSwarm n)
    (s : SomaField.SwarmPropagator.SwarmState n),
    SomaField.SwarmPropagator.jellyfishUpdate swarm s = swarm.G.mulVec s

instance : Witness cJellyfish :=
  .of fun _ swarm s => SomaField.SwarmPropagator.jellyfish_single_step swarm s

def cTrap : Claim where
  id := "P12.trap"
  text := "gradient_traps_near_neg1 (LimbicTunnel.lean): the sign of V'(-1 + ε) for 0 < ε < 1."
  statement := ∀ (p : SomaField.LimbicTunnel.BarrierParam) (ε : ℝ), 0 < ε → ε < 1 →
    0 < 4 * p.W * (-1 + ε) * ((-1 + ε) ^ 2 - 1)

instance : Witness cTrap := .of SomaField.LimbicTunnel.gradient_traps_near_neg1

def cBritain : Claim where
  id := "P12.britain"
  text := "Britain 1939: O(N²) = O(2 × 10¹⁵) for N = 45 × 10⁶; the cost theorem's premise N < K \
    fails for K = 5."
  statement := (45000000 : ℕ) ^ 2 = 2025000000000000 ∧ ¬ (45000000 : ℕ) < 5

instance : Witness cBritain := .of britain

def cKuramoto : Claim where
  id := "P12.kuramoto"
  text := "The Kuramoto order parameter r = N⁻¹|Σ e^{iθ_j}|: r ≤ 1, and r = 1 at perfect \
    phase-lock."
  statement := (∀ n (θ : Fin n → ℝ), ‖∑ j, Complex.exp (θ j * I)‖ ≤ n) ∧
    ∀ n (φ : ℝ), ‖∑ _j : Fin n, Complex.exp (φ * I)‖ = n

instance : Witness cKuramoto := .of ⟨fun _ θ => kuramoto_le_one θ, fun _ φ => kuramoto_locked φ⟩

def cQuantExp : Claim where
  id := "P12.quant-exp-1"
  text := "QUANT-EXP-1: a fast anneal raises the Awe-dominant occupancy from 0.25 to 0.41; a cold \
    classical run from Fear reaches Awe in 0 of 200 (P2)."
  statement := P2.cShift.statement ∧ P2.cColdRun.statement

instance [h : Witness P2.cShift] [g : Witness P2.cColdRun] : Witness cQuantExp :=
  .of ⟨h.proof, g.proof⟩

/-- That the hysteresis test finds crossing and return amplitudes differ: to be run. -/
opaque hysteresisObserved : Prop

def cHysteresis : Claim where
  id := "P12.hysteresis"
  text := "God-Knob: emotional threshold crossings are hysteretic (crossing amplitude ≠ return \
    amplitude)."
  statement := hysteresisObserved

def cSwarmAxiom : Claim where
  id := "P12.swarm-axiom"
  text := "greens_achieves_minimum_energy (SwarmPropagator.lean): the propagator step achieves the \
    minimum-energy coordination state."
  statement := ∀ (n : ℕ) (G : SomaField.SwarmPropagator.Propagator n)
    (s : SomaField.SwarmPropagator.SwarmState n) (E : SomaField.SwarmPropagator.SwarmState n → ℝ)
    (s' : SomaField.SwarmPropagator.SwarmState n),
    E (SomaField.SwarmPropagator.propagatorStep G s) ≤ E s'

/-- The axiom, as the module states it. -/
instance : Witness cSwarmAxiom :=
  .of fun _ G s E s' => SomaField.SwarmPropagator.greens_achieves_minimum_energy G s E s'

/-- And its counterexample, without the axiom. -/
instance : Refutation cSwarmAxiom := .of swarm_axiom_false

/-- P12's claims, in the paper's order. -/
def claims : List Claim :=
  [cCost, cReachable, cJellyfish, cTrap, cGate, cKuramoto, cBritain, cHysteresis, cQuantExp,
    cSwarmAxiom]

#status claims

end TTheory.P12
