/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Method
import TTheory.P1

/-!
# P3 · Mathematical Co-identification

*A Method for Structural Import Across Scientific Domains*

[T]-Theory's third paper, as Lean. Source:
`paper/soma/mathematical-co-identification/mathematical-co-identification.md`; its id, title and
DOI are in `Dist/PAPERS.yaml` (P3).

P3 names a practice: treat a quantity in one domain as the same mathematical object as one in
another, under an explicit change of label, and import the source's theorems once their
assumptions are checked in the target. The procedure itself is `TTheory.Method` (rows, the target
check, the negative control, the scope); this chapter runs it on the paper's worked registration
(§10.3): `COID-ENG-2`, the attractor landscape as Hopfield energy, with its prediction (monotone
descent under the update) and its disconfirmation criterion ("a constructed counterexample with an
increasing energy step"), both proved.
-/

namespace TTheory.P3

open TTheory TTheory.Method

/-! ## Co-identification II: the attractor landscape as Ising Hamiltonian

The structural identity is P1's: the soma energy, the Hopfield energy and the Ising Hamiltonian are
one expression (`P1.soma_is_hopfield`, `P1.ising_is_hopfield`, by `rfl`). What P3 imports along it
is Hopfield's theorem: an asynchronous update never raises the energy. -/

section Descent

variable {n : ℕ}

/-- The local field at node `k`: `h_k = Σ_j W_kj s_j + θ_k`. -/
noncomputable def localField (W : Fin n → Fin n → ℝ) (θ s : Fin n → ℝ) (k : Fin n) : ℝ :=
  ∑ j, W k j * s j + θ k

/-- The exact change of energy when node `k` is set to `x` (symmetric couplings):
    `ΔE = -(x - s_k) h_k - ½ W_kk (x - s_k)²`. -/
theorem energy_change (W : Fin n → Fin n → ℝ) (hW : ∀ i j, W i j = W j i) (θ s : Fin n → ℝ)
    (k : Fin n) (x : ℝ) :
    P1.hopfieldEnergy W θ (Function.update s k x) - P1.hopfieldEnergy W θ s =
      -(x - s k) * localField W θ s k - (1 / 2) * W k k * (x - s k) ^ 2 := by
  set d := x - s k with hd
  set a : Fin n → ℝ := fun i => if i = k then d else 0 with ha
  have hu : Function.update s k x = fun i => s i + a i := by
    funext i
    by_cases h : i = k
    · subst h; simp [ha, hd]
    · simp [ha, h]
  have hsa : ∀ g : Fin n → ℝ, ∑ j, g j * a j = g k * d := fun g => by simp [ha, mul_ite]
  have has : ∀ g : Fin n → ℝ, ∑ j, a j * g j = d * g k := fun g => by simp [ha, ite_mul]
  -- the quadratic term, row by row, then summed
  have row : ∀ i, ∑ j, W i j * (s i + a i) * (s j + a j) =
      ∑ j, W i j * s i * s j + W i k * s i * d + a i * (∑ j, W i j * s j + W i k * d) := by
    intro i
    have e : ∀ j, W i j * (s i + a i) * (s j + a j) =
        W i j * s i * s j + (W i j * s i) * a j + a i * (W i j * s j) + a i * (W i j * a j) :=
      fun j => by ring
    rw [Finset.sum_congr rfl fun j _ => e j]
    simp only [Finset.sum_add_distrib, ← Finset.mul_sum, hsa]
    ring
  have quad : ∑ i, ∑ j, W i j * (s i + a i) * (s j + a j) =
      ∑ i, ∑ j, W i j * s i * s j + 2 * d * ∑ j, W k j * s j + W k k * d ^ 2 := by
    simp only [row, Finset.sum_add_distrib]
    rw [has fun i => ∑ j, W i j * s j + W i k * d]
    have hsym : ∑ i, W i k * s i * d = d * ∑ j, W k j * s j := by
      rw [Finset.mul_sum]
      exact Finset.sum_congr rfl fun i _ => by rw [hW i k]; ring
    rw [hsym]
    ring
  have lin : ∑ i, θ i * (s i + a i) = ∑ i, θ i * s i + θ k * d := by
    simp only [mul_add, Finset.sum_add_distrib, hsa]
  rw [hu]
  simp only [P1.hopfieldEnergy, localField]
  rw [quad, lin]
  ring

/-- Hopfield's descent: with symmetric couplings and a non-negative self-coupling, setting a node so
    that its change agrees with its local field (`(x - s_k) h_k ≥ 0`, as the sign rule does) never
    raises the energy. -/
theorem descent (W : Fin n → Fin n → ℝ) (hW : ∀ i j, W i j = W j i) (θ s : Fin n → ℝ) (k : Fin n)
    (x : ℝ) (hkk : 0 ≤ W k k) (hx : 0 ≤ (x - s k) * localField W θ s k) :
    P1.hopfieldEnergy W θ (Function.update s k x) ≤ P1.hopfieldEnergy W θ s := by
  have h := energy_change W hW θ s k x
  nlinarith [sq_nonneg (x - s k)]

end Descent

/-! ## The negative control: same form, no symmetry

§10.5: "dimensional compatibility is necessary but not sufficient". Two nodes with
`W₀₁ = 2` and `W₁₀ = -1`: the same energy expression, the same update rule, but the coupling is not
symmetric. From `s = (1, 1)` node 1's local field is −1, so the rule sets it to −1, and the energy
rises from −½ to +½. This is P1's C-PTSD case (an asymmetric coupling is no gradient flow), met
here as the import's failure. -/

/-- The asymmetric coupling of the control. -/
def wAsym : Fin 2 → Fin 2 → ℝ := ![![0, 2], ![-1, 0]]

/-- The start, `(1, 1)`. -/
def sStart : Fin 2 → ℝ := ![1, 1]

theorem control_field : localField wAsym 0 sStart 1 = -1 := by
  simp [localField, wAsym, sStart, Fin.sum_univ_two]

/-- The rule's step (node 1 to −1, agreeing with its field) raises the energy from −½ to +½. -/
theorem control_rises :
    P1.hopfieldEnergy wAsym 0 sStart = -(1 / 2) ∧
    P1.hopfieldEnergy wAsym 0 (Function.update sStart 1 (-1)) = 1 / 2 := by
  constructor <;>
  simp [P1.hopfieldEnergy, wAsym, sStart, Fin.sum_univ_two, Function.update] <;> norm_num

/-- The control, as the row needs it: there is a coupling, a state and a step that follows the
    local field, and the energy rises. -/
theorem control : ∃ (W : Fin 2 → Fin 2 → ℝ) (s : Fin 2 → ℝ) (k : Fin 2) (x : ℝ),
    0 ≤ (x - s k) * localField W 0 s k ∧
    P1.hopfieldEnergy W 0 s < P1.hopfieldEnergy W 0 (Function.update s k x) := by
  refine ⟨wAsym, sStart, 1, -1, ?_, ?_⟩
  · rw [control_field]; norm_num [sStart]
  · rw [control_rises.1, control_rises.2]; norm_num

/-! ## The registered row (§10.3, `COID-ENG-2`) -/

/-- The row, on P1's companion (`SomaField.lean`, the coupling `W8`): the attractor landscape as
    Hopfield energy. Its premises are what Hopfield's theorem needs of the target's couplings. A
    soma-field coupling need not meet them (an asymmetric one is P1's C-PTSD), so they are checked
    for this target, not assumed for every one. -/
def rowEng : Row where
  id := "COID-ENG-2"
  source := "Hopfield energy and its asynchronous update"
  target := "the companion's attractor landscape (W8)"
  prediction := "Monotone descent under the specified update map."
  disconfirmation := "A constructed counterexample with an increasing energy step under the \
    stated rule."
  premises := (∀ i j, W8 i j = W8 j i) ∧ ∀ k, 0 ≤ W8 k k
  conclusion := ∀ (s : Fin N8 → ℝ) (k : Fin N8) (x : ℝ), 0 ≤ (x - s k) * localField W8 0 s k →
    P1.somaEnergy W8 0 (Function.update s k x) ≤ P1.somaEnergy W8 0 s
  transfer := fun h s k x hx => descent W8 h.1 0 s k x (h.2 k) hx
  control := ∃ (W : Fin 2 → Fin 2 → ℝ) (s : Fin 2 → ℝ) (k : Fin 2) (x : ℝ),
    0 ≤ (x - s k) * localField W 0 s k ∧
    P1.hopfieldEnergy W 0 s < P1.hopfieldEnergy W 0 (Function.update s k x)
  controlHolds := control

/-- The target check: `W8` is symmetric, and its diagonal is 6/5. -/
instance : Row.Holds rowEng := ⟨⟨W8_symm, fun k => by simp [W8]; norm_num⟩⟩

/-! ## P3's claims -/

def cIdentity : Claim where
  id := "P3.coid-II"
  text := "Co-identification II: the attractor landscape is the Ising Hamiltonian (the energies \
    are one expression)."
  statement := ∀ n,
    @P1.somaEnergy n = @P1.hopfieldEnergy n ∧ @P1.isingEnergy n = @P1.hopfieldEnergy n

instance : Witness cIdentity := .of fun _ => ⟨rfl, rfl⟩

def cDescent : Claim where
  id := "P3.hopfield"
  text := "The imported theorem: with symmetric couplings and non-negative self-couplings, an \
    asynchronous update that follows the local field never raises the energy."
  statement := ∀ n (W : Fin n → Fin n → ℝ), (∀ i j, W i j = W j i) → ∀ (θ s : Fin n → ℝ)
    (k : Fin n) (x : ℝ), 0 ≤ W k k → 0 ≤ (x - s k) * localField W θ s k →
    P1.hopfieldEnergy W θ (Function.update s k x) ≤ P1.hopfieldEnergy W θ s

instance : Witness cDescent := .of fun _ W hW θ s k x hkk hx => descent W hW θ s k x hkk hx

def cNotSufficient : Claim where
  id := "P3.negative-control"
  text := "Dimensional compatibility is necessary but not sufficient: the same energy and update \
    without symmetric couplings do not descend."
  statement := ∃ (W : Fin 2 → Fin 2 → ℝ) (s : Fin 2 → ℝ) (k : Fin 2) (x : ℝ),
    0 ≤ (x - s k) * localField W 0 s k ∧
    P1.hopfieldEnergy W 0 s < P1.hopfieldEnergy W 0 (Function.update s k x)

instance : Witness cNotSufficient := .of control

/-- P3's claims: the identity, the source theorem, the registered row's three, the lesson. -/
def claims : List Claim := [cIdentity, cDescent] ++ rowEng.claims ++ [cNotSufficient]

/-- P3's abstract, phrase by phrase. -/
def abstract : List (String × Claim) :=
  [("a quantity in one domain is not merely *like* a quantity in another domain, but can sometimes \
      be treated as the same mathematical object under an explicitly checked change of label",
      cIdentity),
   ("theorems about the source object become candidates for assumption-checked import into the \
      target domain", rowEng.claim),
   ("the failure modes that distinguish genuine co-identification from mere analogy",
      cNotSufficient),
   ("its rows, scope labels and disconfirmation rules are a small model in the Lean 4 proof \
      assistant", rowEng.structural)]

#status claims

#covers abstract claims

end TTheory.P3
