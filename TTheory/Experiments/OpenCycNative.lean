/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims

/-!
# Experiment (ISS-141): OpenCyc as native Lean, two ways, on P1's vocabulary

The same NextKB facts as `TTheory/P1/Cyc.lean` (which keeps OpenCyc as strings inside an opaque
`Holds`, every fact an axiom, Aesop searching them: 8 minutes for four queries over
UniversalVocabularyMt), written natively. Exploratory: what reads well, what the compiler catches,
what it costs.

Every fact below is NextKB's, in UniversalVocabularyMt unless marked:
  BrainStem genls AnimalBodyPart; BrainStem genls InternalAnatomicalPart;
  BrainStem genls SolidTangibleThing (AnimalPhysiologyMt); LimbicSystem genls AnimalBodyPart;
  LimbicSystem genls InternalAnatomicalPart; AnimalBodyPart genls AnimalBodyRegion;
  SympatheticNervousSystem genls AnimalBodyRegion; VagusNerve genls CranialNerve;
  BrainStem isa BrainRegionType; LimbicSystem isa UniqueAnatomicalPartType;
  Fear, Shame, Calmness isa EmotionalQuantityType.
-/

open TTheory

/-! ## A + C: collections as types, `genls` as coercions, collection-types as classes -/

namespace CycA

opaque AnimalBodyRegion : Type
opaque AnimalBodyPart : Type
opaque InternalAnatomicalPart : Type
opaque SolidTangibleThing : Type
opaque BrainStem : Type
opaque LimbicSystem : Type
opaque SympatheticNervousSystem : Type
opaque VagusNerve : Type
opaque CranialNerve : Type
opaque IndividualAgent : Type

-- `genls c d`: an instance of `c` is an instance of `d`. Each is a NextKB fact, so an axiom; the
-- coercion makes Lean's own type checker apply it, and chains of them.
axiom BrainStem.toAnimalBodyPart : BrainStem → AnimalBodyPart
axiom BrainStem.toInternalAnatomicalPart : BrainStem → InternalAnatomicalPart
axiom LimbicSystem.toAnimalBodyPart : LimbicSystem → AnimalBodyPart
axiom LimbicSystem.toInternalAnatomicalPart : LimbicSystem → InternalAnatomicalPart
axiom AnimalBodyPart.toAnimalBodyRegion : AnimalBodyPart → AnimalBodyRegion
axiom SympatheticNervousSystem.toAnimalBodyRegion : SympatheticNervousSystem → AnimalBodyRegion
axiom VagusNerve.toCranialNerve : VagusNerve → CranialNerve

noncomputable instance : Coe BrainStem AnimalBodyPart := ⟨BrainStem.toAnimalBodyPart⟩
noncomputable instance : Coe BrainStem InternalAnatomicalPart :=
  ⟨BrainStem.toInternalAnatomicalPart⟩
noncomputable instance : Coe LimbicSystem AnimalBodyPart := ⟨LimbicSystem.toAnimalBodyPart⟩
noncomputable instance : Coe LimbicSystem InternalAnatomicalPart :=
  ⟨LimbicSystem.toInternalAnatomicalPart⟩
noncomputable instance : Coe AnimalBodyPart AnimalBodyRegion := ⟨AnimalBodyPart.toAnimalBodyRegion⟩
noncomputable instance : Coe SympatheticNervousSystem AnimalBodyRegion :=
  ⟨SympatheticNervousSystem.toAnimalBodyRegion⟩
noncomputable instance : Coe VagusNerve CranialNerve := ⟨VagusNerve.toCranialNerve⟩

-- A microtheory's fact is scoped: it holds where the microtheory is opened.
namespace AnimalPhysiologyMt
axiom BrainStem.toSolidTangibleThing : BrainStem → SolidTangibleThing
noncomputable scoped instance : Coe BrainStem SolidTangibleThing := ⟨BrainStem.toSolidTangibleThing⟩
end AnimalPhysiologyMt

-- A collection-type (a collection of collections) is a class over types: `isa c BrainRegionType`.
class BrainRegionType (α : Type) : Prop
class UniqueAnatomicalPartType (α : Type) : Prop
class EmotionalQuantityType (α : Type) : Prop

axiom BrainStem.isBrainRegion : BrainRegionType BrainStem
axiom LimbicSystem.isUniquePart : UniqueAnatomicalPartType LimbicSystem
attribute [instance] BrainStem.isBrainRegion LimbicSystem.isUniquePart

opaque Fear : Type
opaque Shame : Type
opaque Calmness : Type
axiom Fear.isEmotion : EmotionalQuantityType Fear
axiom Shame.isEmotion : EmotionalQuantityType Shame
axiom Calmness.isEmotion : EmotionalQuantityType Calmness
attribute [instance] Fear.isEmotion Shame.isEmotion Calmness.isEmotion

-- Transitivity is Lean's own: a brainstem is an animal body region through two genls, no search.
noncomputable example (b : BrainStem) : AnimalBodyRegion :=
  ((b : AnimalBodyPart) : AnimalBodyRegion)

-- The microtheory's fact holds only where it is opened ...
section
open AnimalPhysiologyMt
noncomputable example (b : BrainStem) : SolidTangibleThing := b
end
-- ... and outside it the same line does not compile.
#check_failure (fun (b : BrainStem) => (b : SolidTangibleThing))

-- A category error is a type error: OpenCyc never makes the limbic system an agent.
#check_failure (fun (l : LimbicSystem) => (l : IndividualAgent))

-- Anxiety is no OpenCyc emotion: there is no such constant to name.
#check_failure (inferInstance : EmotionalQuantityType Anxiety)

def cFeelings : Claim where
  id := "P1.feelings (A)"
  text := "Fear, shame and calm are emotions."
  statement :=
    EmotionalQuantityType Fear ∧ EmotionalQuantityType Shame ∧ EmotionalQuantityType Calmness

instance : Witness cFeelings := .of ⟨inferInstance, inferInstance, inferInstance⟩

def cLayers : Claim where
  id := "P1.layers (A)"
  text := "The brainstem is a brain region; brainstem and limbic system are animal body regions."
  statement := BrainRegionType BrainStem ∧ Nonempty (BrainStem → AnimalBodyRegion) ∧
    Nonempty (LimbicSystem → AnimalBodyRegion)

instance : Witness cLayers := .of ⟨inferInstance,
  ⟨fun b => ((b : AnimalBodyPart) : AnimalBodyRegion)⟩,
  ⟨fun l => ((l : AnimalBodyPart) : AnimalBodyRegion)⟩⟩

#status [cFeelings, cLayers]

end CycA

/-! ## B: collections as structures, `genls` as `extends` -/

namespace CycB

structure Thing where
  name : String
structure AnimalBodyRegion extends Thing
structure AnimalBodyPart extends AnimalBodyRegion
structure InternalAnatomicalPart extends Thing
structure SolidTangibleThing extends Thing
-- Several parents (a DAG, as OpenCyc's hierarchy is): Lean merges the shared `Thing`.
structure BrainStem extends AnimalBodyPart, InternalAnatomicalPart, SolidTangibleThing
structure LimbicSystem extends AnimalBodyPart, InternalAnatomicalPart
structure IndividualAgent extends Thing

-- Transitivity by projection: no axiom at all, the hierarchy is the type definitions.
example (b : BrainStem) : AnimalBodyRegion := b.toAnimalBodyRegion

-- A category error: there is no projection to an agent.
#check_failure (fun (l : LimbicSystem) => l.toIndividualAgent)

-- But a microtheory cannot scope a parent: `extends` is global, so AnimalPhysiologyMt's
-- `BrainStem genls SolidTangibleThing` holds everywhere here.
example (b : BrainStem) : SolidTangibleThing := b.toSolidTangibleThing

def cLayers : Claim where
  id := "P1.layers (B)"
  text := "Brainstem and limbic system are animal body regions."
  statement := Nonempty (BrainStem → AnimalBodyRegion) ∧ Nonempty (LimbicSystem → AnimalBodyRegion)

instance : Witness cLayers := .of ⟨⟨(·.toAnimalBodyRegion)⟩, ⟨(·.toAnimalBodyRegion)⟩⟩

#status [cLayers]

end CycB
