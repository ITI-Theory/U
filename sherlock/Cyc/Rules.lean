import Cyc.Core

/-!
# Rules: where an OpenCyc rule applies

A rule stated in microtheory `n` applies in `n` and in every microtheory that
inherits `n`. `Sees m n` says that. The generated rules
(`bld/sherlock/lean/CycRules.lean`, `gen_rules.py`) take it as their first
premise. They import only this core, so adding rules never rebuilds the facts.
-/

namespace Cyc

/-- Microtheory `m` sees what is stated in `n`: it is `n` or inherits it. -/
def Sees (m n : Mt) : Prop := m = n ∨ GenlMt m n

@[aesop safe apply (rule_sets := [Cyc])]
theorem Sees.refl (m : Mt) : Sees m m := Or.inl rfl

@[aesop safe apply (rule_sets := [Cyc])]
theorem Sees.of_genlMt {m n : Mt} (h : GenlMt m n) : Sees m n := Or.inr h

end Cyc
