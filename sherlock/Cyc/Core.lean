import Cyc.RuleSets

/-!
# OpenCyc in Lean: the core

OpenCyc's knowledge is data inside `Holds mt φ`, Cyc's `ist`: "sentence φ is
true in microtheory mt". `Holds` is opaque, so whatever OpenCyc asserts, Lean
itself stays consistent. A contradiction inside OpenCyc is not an explosion
but a theorem, `Holds mt .falsum`, whose proof says why.

The rules below are the meaning of Cyc's core predicates (`isa`, `genls`,
`disjointWith`, `genlMt`); they are stated about `Holds` only. The facts
themselves are generated from NextKB, one module per microtheory.
-/

namespace Cyc

/-- A CycL term: a constant, an integer, a string, or a function term
(a non-atomic term such as `(ExperiencingEmotionFn Fear)`). -/
inductive Term where
  | c : String → Term
  | n : Int → Term
  | s : String → Term
  | app : Term → List Term → Term
  deriving Repr, Inhabited, BEq

/-- A microtheory is named by a term. -/
abbrev Mt := Term

/-- A ground CycL sentence: a predicate applied to arguments, or falsum. -/
inductive Sentence where
  | atom : Term → List Term → Sentence
  | falsum : Sentence
  deriving Repr, Inhabited

/-- Cyc's `ist`: the sentence is true in the microtheory. -/
opaque Holds : Mt → Sentence → Prop

/-- `genlMt m n`: microtheory `m` inherits everything true in `n`. -/
opaque GenlMt : Mt → Mt → Prop

namespace Sentence
abbrev isa (x c : Term) : Sentence := .atom (.c "isa") [x, c]
abbrev genls (c d : Term) : Sentence := .atom (.c "genls") [c, d]
abbrev disjointWith (c d : Term) : Sentence := .atom (.c "disjointWith") [c, d]
end Sentence

open Sentence

/-! ## The meaning of the core predicates -/

/-- Microtheory inheritance. -/
@[aesop unsafe 60% apply (rule_sets := [Cyc])]
axiom inherit {m n : Mt} {φ : Sentence} : GenlMt m n → Holds n φ → Holds m φ

@[aesop unsafe 40% apply (rule_sets := [Cyc])]
axiom genlMt_trans {a b c : Mt} : GenlMt a b → GenlMt b c → GenlMt a c

/-- An instance of a collection is an instance of every more general one. -/
@[aesop unsafe 70% apply (rule_sets := [Cyc])]
axiom isa_genls {m : Mt} {x c d : Term} :
    Holds m (isa x c) → Holds m (genls c d) → Holds m (isa x d)

@[aesop unsafe 50% apply (rule_sets := [Cyc])]
axiom genls_trans {m : Mt} {a b c : Term} :
    Holds m (genls a b) → Holds m (genls b c) → Holds m (genls a c)

/-- Disjoint collections share no instance: a shared one is a contradiction
in that microtheory (and only there). -/
@[aesop unsafe 50% apply (rule_sets := [Cyc])]
axiom disjoint {m : Mt} {x c d : Term} :
    Holds m (disjointWith c d) → Holds m (isa x c) → Holds m (isa x d) → Holds m .falsum

/-- Disjointness is inherited by more specific collections. -/
@[aesop unsafe 40% apply (rule_sets := [Cyc])]
axiom disjoint_genls {m : Mt} {c d c' : Term} :
    Holds m (disjointWith c d) → Holds m (genls c' c) → Holds m (disjointWith c' d)

@[aesop unsafe 40% apply (rule_sets := [Cyc])]
axiom disjoint_symm {m : Mt} {c d : Term} :
    Holds m (disjointWith c d) → Holds m (disjointWith d c)

end Cyc
