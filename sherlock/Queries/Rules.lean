import CycRules

/-! A rule fires: OpenCyc's rule r0 (UniversalVocabularyMt) derives a fact no
ground fact states, in a test microtheory that inherits UniversalVocabularyMt. -/

open Cyc

axiom test_uv : GenlMt (.c "TestRulesMt") (.c "UniversalVocabularyMt")
axiom fn_idf : Holds (.c "TestRulesMt") (.isa (.c "TestFn") (.c "IndividualDenotingFunction"))
axiom fn_result : Holds (.c "TestRulesMt") (.atom (.c "resultIsa") [.c "TestFn", .c "Relation"])

example : Holds (.c "TestRulesMt") (.isa (.c "TestFn") (.c "RelationDenotingFunction")) := by
  aesop (add safe apply test_uv, safe apply fn_idf, safe apply fn_result) (rule_sets := [Cyc])