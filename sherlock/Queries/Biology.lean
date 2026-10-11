import CycKB.BiologyMt

/-! First queries: Aesop over the generated BiologyMt facts. -/

open Cyc

/-- Two facts and the inheritance rule: Firefly isa BiologicalSpecies,
BiologicalSpecies genls KEClarifyingCollectionType. -/
example : Holds (.c "BiologyMt") (.isa (.c "Firefly") (.c "KEClarifyingCollectionType")) := by
  aesop (rule_sets := [Cyc])

/-- Does not follow from the facts: Aesop must fail (the test passes when it does). -/
example : True := by
  fail_if_success
    have : Holds (.c "BiologyMt") (.isa (.c "Firefly") (.c "AloeVera")) := by aesop (rule_sets := [Cyc])
  trivial

#check (by aesop (rule_sets := [Cyc]) : Holds (.c "BiologyMt") (.isa (.c "Ape") (.c "KEClarifyingCollectionType")))