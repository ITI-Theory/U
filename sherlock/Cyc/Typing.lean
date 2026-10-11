import Cyc.Core

/-!
# Typing predicates beyond the core

Kept out of `Cyc.Core` so the generated knowledge base (which imports only
the core) need not be rebuilt when a predicate's meaning is added here.
-/

namespace Cyc

open Sentence

/-- `typeGenls t d`: every instance of the collection type `t` is a
specialisation of `d` (e.g. every EmotionalQuantityType genls
FeelingAttribute). -/
@[aesop unsafe 50% apply (rule_sets := [Cyc])]
axiom typeGenls_genls {m : Mt} {c t d : Term} :
    Holds m (isa c t) → Holds m (.atom (.c "typeGenls") [t, d]) → Holds m (genls c d)

end Cyc
