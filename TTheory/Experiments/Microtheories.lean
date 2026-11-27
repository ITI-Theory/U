/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims
import Mathlib.Data.Set.Disjoint

/-!
# Experiment (ISS-141): microtheories as classes, and the explosion H-AL warned of

H-AL, 27 Nov: OpenCyc has defaults with exceptions (birds fly; penguins do not); as global axioms,
one such pair makes `False` provable and every claim with it. The author's decision: a microtheory
is a CLASS of assumptions over a carrier `Thing` (as Mathlib's group is a class over a type): its
facts are fields, its `genlMt` is `extends`, and a claim holds in it (`∀ T [M T], ...`). A
contradictory microtheory simply has no instance: the contradiction is a theorem about that
microtheory, and Lean's kernel stays consistent. -/

open TTheory

namespace MtExperiment

/-! ## NextKB's facts about people, as microtheories -/

/-- The part of UniversalVocabularyMt used here (NextKB: FemaleHuman, HumanAdult ⊑ HomoSapiens in
    BaseKB; HumanAdult disjoint from Embryo). -/
class UniversalVocabularyMt (Thing : Type) where
  HomoSapiens : Set Thing
  FemaleHuman : Set Thing
  HumanAdult : Set Thing
  Embryo : Set Thing
  female_human : FemaleHuman ⊆ HomoSapiens
  adult_human : HumanAdult ⊆ HomoSapiens
  adult_apart_embryo : Disjoint HumanAdult Embryo

/-- A data microtheory inheriting it: Anna, a woman and an adult. -/
class PeopleMt (Thing : Type) extends UniversalVocabularyMt Thing where
  anna : Thing
  anna_woman : anna ∈ FemaleHuman
  anna_adult : anna ∈ HumanAdult

open UniversalVocabularyMt PeopleMt

def cAnna : Claim where
  id := "anna"
  text := "Anna is a human."
  statement := ∀ (T : Type) [PeopleMt T], (anna : T) ∈ (HomoSapiens : Set T)

instance : Witness cAnna := .of fun _ _ => female_human anna_woman

def cEmbryo : Claim where
  id := "anna.embryo"
  text := "Anna is an embryo."
  statement := ∀ (T : Type) [PeopleMt T], (anna : T) ∈ (Embryo : Set T)
  denial := ∀ (T : Type) [PeopleMt T], (anna : T) ∉ (Embryo : Set T)

instance : Refutation cEmbryo := .ofDenial fun _ _ h =>
  Set.disjoint_left.1 adult_apart_embryo anna_adult h

/-! ## Birds fly; penguins do not: each true in its own microtheory -/

class BirdsMt (T : Type) where
  Bird : Set T
  Flies : Set T
  birds_fly : Bird ⊆ Flies

class PenguinMt (T : Type) where
  Bird : Set T
  Penguin : Set T
  Flies : Set T
  penguins_are_birds : Penguin ⊆ Bird
  penguins_do_not_fly : Disjoint Penguin Flies
  tweety : T
  tweety_penguin : tweety ∈ Penguin

/-- Both at once: Lean merges the shared `Bird` and `Flies`. -/
class BirdsAndPenguinsMt (T : Type) extends BirdsMt T, PenguinMt T

/-- In the penguins' microtheory alone, Tweety does not fly. -/
def cTweetyPenguin : Claim where
  id := "tweety.penguin"
  text := "Tweety flies (penguins' microtheory)."
  statement := ∀ (T : Type) [PenguinMt T], (PenguinMt.tweety : T) ∈ (PenguinMt.Flies : Set T)
  denial := ∀ (T : Type) [PenguinMt T], (PenguinMt.tweety : T) ∉ (PenguinMt.Flies : Set T)

instance : Refutation cTweetyPenguin := .ofDenial fun _ _ h =>
  Set.disjoint_left.1 PenguinMt.penguins_do_not_fly PenguinMt.tweety_penguin h

/-- In both together, Tweety flies AND does not: the combination has no instance. -/
def cTweetyBoth : Claim where
  id := "tweety.both"
  text := "Tweety flies (birds and penguins together)."
  statement := ∀ (T : Type) [BirdsAndPenguinsMt T], (PenguinMt.tweety : T) ∈ (BirdsMt.Flies : Set T)
  denial := ∀ (T : Type) [BirdsAndPenguinsMt T], (PenguinMt.tweety : T) ∉ (BirdsMt.Flies : Set T)

instance : Witness cTweetyBoth := .of fun _ _ =>
  BirdsMt.birds_fly (PenguinMt.penguins_are_birds PenguinMt.tweety_penguin)

instance : Refutation cTweetyBoth := .ofDenial fun _ _ h =>
  Set.disjoint_left.1 PenguinMt.penguins_do_not_fly PenguinMt.tweety_penguin h

/-- The contradiction is a theorem ABOUT the combined microtheory: it has no instance. -/
theorem birds_and_penguins_inconsistent (T : Type) [BirdsAndPenguinsMt T] : False := by
  have h : (PenguinMt.tweety : T) ∈ (BirdsMt.Flies : Set T) :=
    BirdsMt.birds_fly (PenguinMt.penguins_are_birds PenguinMt.tweety_penguin)
  exact Set.disjoint_left.1 PenguinMt.penguins_do_not_fly PenguinMt.tweety_penguin h

-- And it stays there: no axiom was used, and nothing outside that microtheory follows.
#print axioms birds_and_penguins_inconsistent

#status [cAnna, cEmbryo, cTweetyPenguin, cTweetyBoth]

end MtExperiment
