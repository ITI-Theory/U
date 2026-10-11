import Cyc.Core

/-!
# OpenCyc collections as Lean types (ISS-063, design decision D12)

A thin typed layer over the deep embedding (`Holds m φ`): `Inst m c` is
collection `c` as a Lean type, the terms microtheory `m` says are its
instances, each with its proof. `genls` gives a coercion (`Inst.up`);
`disjointWith` gives `Inst.apart`: one term with both types is a
contradiction in `m`, so no coercion between disjoint types can be added
consistently. A programme type anchored to a collection turns a category
error into a type error (spike: `Types/Spike.lean`; the programme's emotions:
`paper/proofs/EmotionCyc.lean`).
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
