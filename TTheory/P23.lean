/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P21

/-!
# P23 · The [T]-Theory Phenomena

[T]-Theory's twenty-third paper, as Lean. Source:
`paper/soma/ttheory-phenomena/ttheory-phenomena.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P23).

P23 asks what kind of thing [T]-Theory is, and proposes it as a Scale-9 phenomenon of its own
field: a fixed point under the scale functor, stated as a hypothesis. That stays open. Its seed
theorems hold as stated, and say what P20 found `FieldEquation` says: that the type is inhabited,
not that an equation is solved. The therapeutic lens satisfies its laws. That merging two patterns
can produce a dominant mode that is neither is shown by two modes and one coupling.
-/

namespace TTheory.P23

open TTheory

/-! ## Composition

"they can merge into a single dominant eigenmode of the collective coupling matrix ... the dominant
eigenmode of the combined system may be neither `A` nor `B`": `A = (1, 0)` and `B = (0, 1)`, each
mode of its own system, coupled equally: the dominant mode is `(1, 1)`, eigenvalue `2`, and the
other `(1, -1)` has `0`. -/

def coupled : Matrix (Fin 2) (Fin 2) ℚ := !![1, 1; 1, 1]

theorem merge : coupled.mulVec ![1, 1] = (2 : ℚ) • ![1, 1] ∧ coupled.mulVec ![1, -1] = 0 ∧
    coupled.mulVec ![1, 0] ≠ (2 : ℚ) • ![1, 0] ∧ coupled.mulVec ![0, 1] ≠ (2 : ℚ) • ![0, 1] := by
  refine ⟨?_, ?_, ?_, ?_⟩
  · ext i; fin_cases i <;> simp [coupled, Matrix.mulVec, dotProduct] <;> norm_num
  · ext i; fin_cases i <;> simp [coupled, Matrix.mulVec, dotProduct]
  · intro h; have := congrFun h 1; simp [coupled, Matrix.mulVec, dotProduct] at this
  · intro h; have := congrFun h 0; simp [coupled, Matrix.mulVec, dotProduct] at this

/-! ## P23's claims -/

/-- That [T]-Theory's propagation at Scale 9 is isomorphic to its own master equations. -/
opaque fixedPoint : Prop

def cFixedPoint : Claim where
  id := "P23.fixed-point"
  text := "The USF is a fixed point under the scale functor: applied to the theory as an object at \
    Scale 9, the Zoom Operator gives a field equation isomorphic to the theory's own (a \
    hypothesis)."
  statement := fixedPoint

def cSeed : Claim where
  id := "P23.seed"
  text := "Seed formal artefacts: the Scale-9 field equation is inhabited (usf_is_fixed_point), \
    and every scale's is (usf_all_scales_inhabited): type inhabitation, by G = 0 (P20)."
  statement := (∃ (n : SomaField.Universal.ScaleLevel) (_ : n.val = 9),
      Nonempty (SomaField.Universal.FieldEquation n)) ∧
    ∀ n : SomaField.Universal.ScaleLevel,
      Nonempty (Σ _ : SomaField.Universal.ScaleLevel, SomaField.Universal.FieldEquation n)

instance : Witness cSeed := .of ⟨SomaField.EnergyBudget.usf_is_fixed_point,
  SomaField.Lens.usf_all_scales_inhabited⟩

def cLens : Claim where
  id := "P23.lens"
  text := "The therapeutic lens (canonicalTherapeuticLens) changes the compact dimensions and \
    keeps spacetime: its three lens laws hold."
  statement := let L := SomaField.Lens.canonicalTherapeuticLens
    (∀ m c, L.view (L.set m c) = c) ∧ (∀ m, L.set m (L.view m) = m) ∧
    ∀ m c d, L.set (L.set m c) d = L.set m d

instance : Witness cLens := .of ⟨SomaField.Lens.canonicalTherapeuticLens.viewSet,
  SomaField.Lens.canonicalTherapeuticLens.setView,
  SomaField.Lens.canonicalTherapeuticLens.setSet⟩

def cMerge : Claim where
  id := "P23.merge"
  text := "Cultural merging: two patterns entering one coupled field can produce a dominant \
    eigenmode of the collective coupling matrix that is neither."
  statement := coupled.mulVec ![1, 1] = (2 : ℚ) • ![1, 1] ∧ coupled.mulVec ![1, -1] = 0 ∧
    coupled.mulVec ![1, 0] ≠ (2 : ℚ) • ![1, 0] ∧ coupled.mulVec ![0, 1] ≠ (2 : ℚ) • ![0, 1]

instance : Witness cMerge := .of merge

/-- P23's claims, in the paper's order. -/
def claims : List Claim := [cFixedPoint, cMerge, cSeed, cLens]

#status claims

end TTheory.P23
