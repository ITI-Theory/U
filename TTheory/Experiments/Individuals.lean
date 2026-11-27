/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Core
import Mathlib.Data.Set.Basic
import Mathlib.Data.Set.Disjoint

/-!
# Experiment (ISS-141): individuals with several types, and disjointness, two ways

NextKB's facts: FemaleHuman ⊑ HomoSapiens, HumanAdult ⊑ HomoSapiens (BaseKB); HumanAdult and Embryo
are disjoint (UniversalVocabularyMt). Anna is a woman and an adult: two collections at once. Each
design must witness "Anna is an adult woman, a human" and refute "Anna is an embryo".

1. Every collection a type: maximal type checking; an individual has one type, so a second needs an
   identity, and disjointness has to be said through a common supertype.
2. Sorts as types, the rest as sets: the broad kinds (here `Organism`; elsewhere Person, Language,
   Place) are types, so a category error across kinds stays a type error; within a kind, collections
   are Mathlib sets, so several memberships, `∪ ∩ ⊆` and disjointness (`Disjoint`) are Mathlib's
   own. -/

open TTheory

/-! ## 1. Every collection a type -/

namespace AllTypes

syntax "fact " ident " ⊑ " ident : command
macro_rules
  | `(fact $a:ident ⊑ $b:ident) => do
    let f := Lean.mkIdent (a.getId ++ Lean.Name.mkSimple s!"to{b.getId}")
    `(section
      axiom $f : $a → $b
      noncomputable instance : Coe $a $b := ⟨$f⟩
      end)

opaque Organism : Type
opaque HomoSapiens : Type
opaque FemaleHuman : Type
opaque HumanAdult : Type
opaque Embryo : Type

fact HomoSapiens ⊑ Organism
fact FemaleHuman ⊑ HomoSapiens
fact HumanAdult ⊑ HomoSapiens
fact Embryo ⊑ Organism

/-- Disjointness through the common supertype: no organism is both an adult human and an embryo. -/
axiom adult_apart_embryo :
  ∀ (a : HumanAdult) (e : Embryo), ((a : HomoSapiens) : Organism) ≠ (e : Organism)

/-- Anna, declared at one type; her second type needs a second term and an identity. -/
axiom anna : FemaleHuman
axiom annaAdult : HumanAdult
axiom anna_same : ((anna : HomoSapiens) : Organism) = ((annaAdult : HomoSapiens) : Organism)

noncomputable def annaO : Organism := ((anna : HomoSapiens) : Organism)

def cAnna : Claim where
  id := "anna (types)"
  text := "Anna is an adult woman."
  statement := (∃ w : FemaleHuman, ((w : HomoSapiens) : Organism) = annaO) ∧
    (∃ a : HumanAdult, ((a : HomoSapiens) : Organism) = annaO)

instance : Witness cAnna := .of ⟨⟨anna, rfl⟩, ⟨annaAdult, anna_same.symm⟩⟩

def cEmbryo : Claim where
  id := "anna embryo (types)"
  text := "Anna is an embryo."
  statement := ∃ e : Embryo, (e : Organism) = annaO

instance : Refutation cEmbryo := .of fun ⟨e, he⟩ =>
  adult_apart_embryo annaAdult e (by rw [he]; exact anna_same.symm)

#status [cAnna, cEmbryo]

end AllTypes

/-! ## 2. Sorts as types, the rest as sets -/

namespace SortsAndSets

opaque Organism : Type
opaque NaturalLanguage : Type

axiom HomoSapiens : Set Organism
axiom FemaleHuman : Set Organism
axiom HumanAdult : Set Organism
axiom Embryo : Set Organism
axiom SpeakersOfGerman : Set Organism

axiom female_human : FemaleHuman ⊆ HomoSapiens
axiom adult_human : HumanAdult ⊆ HomoSapiens
axiom adult_apart_embryo : Disjoint HumanAdult Embryo

/-- Anna: one individual, as many memberships as she has. -/
axiom anna : Organism
axiom anna_woman : anna ∈ FemaleHuman
axiom anna_adult : anna ∈ HumanAdult

def cAnna : Claim where
  id := "anna (sorts+sets)"
  text := "Anna is an adult woman, a human."
  statement := anna ∈ FemaleHuman ∩ HumanAdult ∧ anna ∈ HomoSapiens

instance : Witness cAnna := .of ⟨⟨anna_woman, anna_adult⟩, female_human anna_woman⟩

def cEmbryo : Claim where
  id := "anna embryo (sorts+sets)"
  text := "Anna is an embryo."
  statement := anna ∈ Embryo

instance : Refutation cEmbryo := .of fun h => Set.disjoint_left.1 adult_apart_embryo anna_adult h

-- Across kinds a category error stays a type error: a language is not an organism.
#check_failure (fun (l : NaturalLanguage) => l ∈ HumanAdult)

#status [cAnna, cEmbryo]

end SortsAndSets
