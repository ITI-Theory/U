/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P6
import UniversalSomaticField

/-!
# SH1 · Sherlock: A Neuro-Symbolic Compiler for Natural Language

The programme's paper on its own checker, as Lean. Source:
`paper/soma/sherlock-compiler/sherlock-compiler.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (SH1).

SH1 reports what Sherlock found in the programme and how. Its counts add up, and the findings it
uses as examples check (P6's `tanh 1`; the 21 levels of `Fin 21`). Its two design claims are shown
here in the native form that has replaced the one it describes (ISS-141: a microtheory is a class
of assumptions, not a set of `Holds` axioms): a contradiction stays inside its microtheory, which
then has no instance; and a percept cannot be made a pole by any coercion without contradicting
the microtheory that keeps them apart.
-/

namespace TTheory.SH1

open TTheory

/-! ## The counts -/

theorem counts : 237 + 9 + 4 + 1 = 251 ∧ 129 + 69 + 4 + 5 + 44 = 251 ∧ 44 - 2 = 42 ∧
    12 + 9 + 8 + 7 + 3 + 3 = 42 ∧ 248 + 3 = 251 := by decide

/-- "P1 infers 'more than 24%' from a bound of `1 - tanh 1 = 0.2384…`": below 24%. -/
theorem tanh_example : 1 - Real.tanh 1 < 0.24 := by linarith [P6.tanh_one.1]

/-- "P19, P20, P21 count 20 scale levels; P11 and the Lean have 21". -/
theorem levels : Fintype.card SomaField.Universal.ScaleLevel = 21 := by simp

/-! ## A contradiction stays inside its microtheory

A toy microtheory in the native form: a thing `x` that is a fear, fear a kind of displeasure, and
fear and displeasure disjoint. Inside it everything follows; outside, it has no instance, and
nothing else is touched. -/

opaque ThingImpl : NonemptyType
def Thing : Type := ThingImpl.type
instance : Nonempty Thing := ThingImpl.property
noncomputable opaque x : Thing
opaque Fear : Set Thing
opaque Displeasure : Set Thing

class Inconsistent : Prop where
  «x ∈ Fear» : x ∈ Fear
  «Fear ⊑ Displeasure» : Fear ⊆ Displeasure
  «Fear ∩ Displeasure = ∅» : Disjoint Fear Displeasure

theorem explodes_inside [h : Inconsistent] : False :=
  Set.disjoint_left.mp h.«Fear ∩ Displeasure = ∅» h.«x ∈ Fear» (h.«Fear ⊑ Displeasure» h.«x ∈ Fear»)

theorem no_instance : ¬ Inconsistent := fun h => explodes_inside (h := h)

/-! ## A category error

"With `Percept := Inst Z "Perceiving"` and `Pole := Inst Z "MathematicalObject"` ... a theorem
shows that no future coercion could make a percept a pole without a contradiction in that
microtheory": with the two collections disjoint, a map from percepts to poles that keeps the
thing leaves no percepts. -/

opaque Perceiving : Set Thing
opaque MathematicalObject : Set Thing

theorem no_coercion (hd : Disjoint Perceiving MathematicalObject)
    (f : {t // t ∈ Perceiving} → {t // t ∈ MathematicalObject}) (hf : ∀ p, (f p).val = p.val) :
    IsEmpty {t // t ∈ Perceiving} :=
  ⟨fun p => Set.disjoint_left.mp hd p.2 (hf p ▸ (f p).2)⟩

/-! ## SH1's claims -/

def cCounts : Claim where
  id := "SH1.counts"
  text := "251 claims: 237 kernel-verified, 9 derived, 4 interpretive, 1 sourced; 129 confirmed, \
    69 consistent, 4 unclear, 5 not provable, 44 contradicted, 42 of them problems in the table."
  statement := 237 + 9 + 4 + 1 = 251 ∧ 129 + 69 + 4 + 5 + 44 = 251 ∧ 44 - 2 = 42 ∧
    12 + 9 + 8 + 7 + 3 + 3 = 42 ∧ 248 + 3 = 251

instance : Witness cCounts := .of counts

def cExamples : Claim where
  id := "SH1.examples"
  text := "Examples: P1 infers 'more than 24%' from 1 - tanh 1 = 0.2384...; P11 and the Lean have \
    21 scale levels."
  statement := 1 - Real.tanh 1 < 0.24 ∧ Fintype.card SomaField.Universal.ScaleLevel = 21

instance : Witness cExamples := .of ⟨tanh_example, levels⟩

def cContained : Claim where
  id := "SH1.contained"
  text := "A contradiction in OpenCyc is not an explosion: it stays inside its microtheory (native \
    form: the microtheory has no instance)."
  statement := (∀ [Inconsistent], False) ∧ ¬ Inconsistent

instance : Witness cContained := .of ⟨fun [_] => explodes_inside, no_instance⟩

def cCategory : Claim where
  id := "SH1.category"
  text := "A category error is a compile error: no coercion could make a percept a pole without a \
    contradiction in the microtheory that keeps them disjoint."
  statement := Disjoint Perceiving MathematicalObject →
    ∀ f : {t // t ∈ Perceiving} → {t // t ∈ MathematicalObject}, (∀ p, (f p).val = p.val) →
      IsEmpty {t // t ∈ Perceiving}

instance : Witness cCategory := .of no_coercion

/-- SH1's claims, in the paper's order. -/
def claims : List Claim := [cContained, cCategory, cCounts, cExamples]

#status claims

end TTheory.SH1
