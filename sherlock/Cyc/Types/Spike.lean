import Cyc.Types

/-!
# Spike (ISS-063): Percept, Pole and Emotion as types, and a category error as a type error

`FieldAxioms.PerceptIsPropagatorPole` says, in the papers' words, that a percept *is* a pole
of the somatic propagator. Read with OpenCyc's collections it cannot be literal: a percept is a
`Perceiving`, an event (`TemporalThing`), and a pole is a mathematical object
(`MathematicalOrComputationalThing`, the programme's `PropagatorPole-TTheory` in
registry/vocabulary.yaml); OpenCyc says the two are disjoint. `percept_is_not_pole` below shows
it as a type error: one term with both types is a contradiction. The coherent reading is that a
percept is *modelled by* a pole, a map from one type to the other, which is how the Lean axiom
is already written (`ω₀ = percept e`, `percept : EmotionState → ℂ`). Sherlock's readings check
finds the same refutation in NextKB (`readings.py`'s `fits`).

Slice mode, as the readings' Lean: the NextKB facts are axioms in one microtheory (each is a
`genls` or `disjointWith` fact of NextKB, or the programme's own definition, so marked); the
kernel checks the reasoning. Proving the facts from the full KB is the release step.
-/

namespace Cyc.Ty.Spike

open Cyc Cyc.Sentence

abbrev NK : Mt := .c "NextKB"

-- NextKB: a Perceiving is an event, so a temporal thing
axiom g1 : Holds NK (genls (.c "Perceiving") (.c "IntentionalMentalEvent"))
axiom g2 : Holds NK (genls (.c "IntentionalMentalEvent") (.c "AtLeastPartiallyMentalEvent"))
axiom g3 : Holds NK (genls (.c "AtLeastPartiallyMentalEvent") (.c "Event"))
axiom g4 : Holds NK (genls (.c "Event") (.c "Situation"))
axiom g5 : Holds NK (genls (.c "Situation") (.c "TemporallyExistingThing"))
axiom g6 : Holds NK (genls (.c "TemporallyExistingThing") (.c "TemporalThing"))
/-- The programme's definition (TTheoryVocabularyMt, registry/vocabulary.yaml). -/
axiom v1 : Holds NK (genls (.c "PropagatorPole-TTheory") (.c "MathematicalObject"))
-- NextKB: a mathematical object is a mathematical or computational thing
axiom g7 : Holds NK (genls (.c "MathematicalObject") (.c "MathematicalThing"))
axiom g8 : Holds NK (genls (.c "MathematicalThing") (.c "MathematicalOrComputationalThing"))
-- NextKB: the two are disjoint
axiom d1 : Holds NK (disjointWith (.c "TemporalThing") (.c "MathematicalOrComputationalThing"))

/-- A percept, as OpenCyc types it. -/
abbrev Percept : Type := Inst NK "Perceiving"
/-- A pole of the somatic propagator, as the programme defines it. -/
abbrev Pole : Type := Inst NK "PropagatorPole-TTheory"

/-- Every percept is a temporal thing (a coercion along `genls`). -/
def Percept.temporal (p : Percept) : Inst NK "TemporalThing" :=
  Inst.up (genls_trans g1 (genls_trans g2 (genls_trans g3 (genls_trans g4 (genls_trans g5 g6))))) p

/-- Every pole is a mathematical or computational thing. -/
def Pole.mathematical (q : Pole) : Inst NK "MathematicalOrComputationalThing" :=
  Inst.up (genls_trans v1 (genls_trans g7 g8)) q

/-- "A percept is a pole", read literally, is a type error: one term that is both is a
contradiction in NextKB. -/
theorem percept_is_not_pole (p : Percept) (q : Pole) (same : p.val = q.val) : Holds NK .falsum :=
  Inst.apart d1 p.temporal q.mathematical same

/-- The coherent reading: a percept is *modelled by* a pole, a map, not an identity. Any map is
well typed; which map the theory proposes is the content of the axiom, not of the typing. -/
def ModelledBy : Type := Percept → Pole

end Cyc.Ty.Spike
