import Cyc.Core

/-!
# Predicate meanings beyond the core

Kept out of `Cyc.Core` so the generated knowledge base (which imports only
the core) need not be rebuilt when a predicate's meaning is added here.
`typeGenls` is an Aesop rule; the meta-predicates below are plain axioms,
applied by name in a proof (as Aesop rules they would widen every search).
-/

namespace Cyc

open Sentence

/-- `typeGenls t d`: every instance of the collection type `t` is a
specialisation of `d` (e.g. every EmotionalQuantityType genls
FeelingAttribute). -/
@[aesop unsafe 50% apply (rule_sets := [Cyc])]
axiom typeGenls_genls {m : Mt} {c t d : Term} :
    Holds m (isa c t) → Holds m (.atom (.c "typeGenls") [t, d]) → Holds m (genls c d)

/-- `genlPreds p q`: whatever `p` relates, `q` relates. -/
axiom genlPreds_holds {m : Mt} {p q a b : Term} :
    Holds m (.atom (.c "genlPreds") [p, q]) → Holds m (.atom p [a, b]) → Holds m (.atom q [a, b])

/-- `genlInverse p q`: whatever `p` relates, `q` relates the other way round. -/
axiom genlInverse_holds {m : Mt} {p q a b : Term} :
    Holds m (.atom (.c "genlInverse") [p, q]) → Holds m (.atom p [a, b]) → Holds m (.atom q [b, a])

axiom transitive_holds {m : Mt} {p a b c : Term} :
    Holds m (isa p (.c "TransitiveBinaryPredicate")) →
    Holds m (.atom p [a, b]) → Holds m (.atom p [b, c]) → Holds m (.atom p [a, c])

/-- An antisymmetric predicate holding both ways makes its arguments equal. -/
axiom antisymmetric_equals {m : Mt} {p a b : Term} :
    Holds m (isa p (.c "AntiSymmetricBinaryPredicate")) →
    Holds m (.atom p [a, b]) → Holds m (.atom p [b, a]) → Holds m (.atom (.c "equals") [a, b])

/-- Equal things share their collections. -/
axiom equals_isa {m : Mt} {a b c : Term} :
    Holds m (.atom (.c "equals") [a, b]) → Holds m (isa a c) → Holds m (isa b c)

/-- Cyc's unique names assumption: two different constants name two things. -/
axiom unique_names {m : Mt} {a b : String} :
    a ≠ b → Holds m (.atom (.c "equals") [.c a, .c b]) → Holds m .falsum

end Cyc
