import Affidavits.ZSF.Typing

/-!
# Spike: OpenCyc classes as Lean types (ISS-063, the design step)

Sherlock's facts are a deep embedding: `Holds m φ` says sentence φ is true in
microtheory m, and a category error is found after the fact, as a theorem
`Holds m .falsum` (exhibit D, `Affidavit.ZSF.Typing`). This spike adds a thin
typed layer over the same facts, so that the same error is a *type error*:

* `Inst m c`, an OpenCyc collection as a Lean type: the terms that m says are
  instances of c, each carrying its proof;
* `genls c d` gives a function `Inst m c → Inst m d` (a coercion), so a value
  can be used wherever a more general collection is expected;
* `disjointWith c d` gives `Inst.apart`: a term with both types is a
  contradiction in m, so no coercion between disjoint types can be added
  consistently.

A programme type is anchored to a collection by being (or mapping into) its
`Inst`. Then a function about poles does not accept a percept: the compiler,
not Sherlock, rejects the sentence. The correspondence reading ("a percept
occurs when the drive meets a pole") is a relation between a percept and a
pole and type-checks.

Run: `lake env lean Types/Spike.lean` (imports all of UniversalVocabularyMt:
one Lean process, a few minutes).
-/

namespace Cyc.Ty
open Cyc Sentence

/-- An OpenCyc collection as a Lean type in microtheory `m`. -/
def Inst (m : Mt) (c : String) : Type := {x : Term // Holds m (isa x (.c c))}

/-- `genls c d`: every instance of `c` is an instance of `d` (a coercion). -/
def Inst.up {m : Mt} {c d : String} (h : Holds m (genls (.c c) (.c d))) (x : Inst m c) : Inst m d :=
  ⟨x.val, isa_genls x.property h⟩

/-- `disjointWith c d`: one term with both types is a contradiction in `m`. -/
theorem Inst.apart {m : Mt} {c d : String} (h : Holds m (disjointWith (.c c) (.c d)))
    (x : Inst m c) (y : Inst m d) (e : x.val = y.val) : Holds m .falsum :=
  disjoint h x.property (e ▸ y.property)

end Cyc.Ty

namespace Cyc.Ty.Spike
open Cyc Sentence Affidavit.ZSF.Typing

set_option maxHeartbeats 1000000

/-- P11's percept: a `Perceiving` in the ZSF microtheory. -/
def Percept : Type := Inst Z "Perceiving"
/-- A pole of the propagator: a `MathematicalObject` (OpenCyc has no constant for a pole). -/
def Pole : Type := Inst Z "MathematicalObject"

abbrev Temporal : Type := Inst Z "TemporalThing"
abbrev Mathematical : Type := Inst Z "MathematicalOrComputationalThing"

/-- The genls chains of exhibit D, now coercions. -/
def Percept.temporal (q : Percept) : Temporal := Inst.up (lift perceiving_temporal) q
def Pole.mathematical (p : Pole) : Mathematical := Inst.up (lift pole_mathematical) p

/-- A function of the programme's kind: something said about a pole (here, a placeholder residue). -/
def residueAt (_p : Pole) : Nat := 0

-- The category error is a type error: a percept is not a pole. (`#check_failure`
-- records the elaboration error without failing the file.)
#check_failure (fun (q : Percept) => residueAt q)

/-- The correspondence reading type-checks: a relation between a percept and a pole. -/
def occursAt (_q : Percept) (_p : Pole) : Prop := True

/-- And no future coercion can make a percept a pole: one term with both types
is a contradiction in the ZSF microtheory (exhibit D, now about types). -/
theorem no_percept_is_a_pole (q : Percept) (p : Pole) (e : q.val = p.val) : Holds Z .falsum :=
  Inst.apart (c := "TemporalThing") (d := "MathematicalOrComputationalThing")
    (lift (by aesop (rule_sets := [Cyc]))) q.temporal p.mathematical e

end Cyc.Ty.Spike
