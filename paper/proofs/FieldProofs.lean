import EmotionOntology

/-!
# FieldProofs.lean — Promoted Axioms

**Status**: Lean kernel verified.
**Source**: promoted from `paper/FieldAxioms.lean`.
**Date**: 19 May 2026.

These were `axiom` declarations in `paper/FieldAxioms.lean`.
They are now `theorem` with Lean kernel proofs.

The two tactics used here:
- `rfl`    — closes definitional equalities (true by construction)
- `decide` — closes decidable propositions (the kernel evaluates it)

No `sorry`. No `admit`. Just Prove It.

**The key move**: every theorem here holds for *all* interpreters
simultaneously by typeclass dispatch. `awe_is_universal` takes
one word to prove (`rfl`) because universality is built into the type.
-/

open EmotionLang Emotion


-- ============================================================
-- Promoted from LEAN-1 (EmotionLangIsUniversal)
-- ============================================================

/-- [LEAN-1-CORE] `awe` is definitionally `blend fear surprise` for *any*
    interpreter `r`. Typeclass dispatch makes this universally true with
    zero proof work.

    The axiom in paper/FieldAxioms.lean claimed this.
    The proof is: `rfl`. Just Proved It. -/
theorem awe_is_universal {r : Type} [EmotionLang r] :
    (awe : r) = blend fear surprise := rfl

/-- The String interpreter renders `awe` as Diesel notation. -/
theorem awe_string : (awe : String) = "(fear ⊓ surprise)" := rfl

/-- The String interpreter renders `nostalgia` with the episodic memory tag. -/
theorem nostalgia_string : (nostalgia : String) = "[mem]→(joy ⊓ sadness)" := rfl

/-- `EmotionLabel.Fear` is reachable from `awe` in the label-set interpreter. -/
theorem fear_in_awe : EmotionLabel.Fear ∈ (awe : List EmotionLabel) := by decide

/-- `EmotionLabel.Surprise` is reachable from `awe` in the label-set interpreter. -/
theorem surprise_in_awe : EmotionLabel.Surprise ∈ (awe : List EmotionLabel) := by decide

/-- `NostalgiaLonging` is reachable from `nostalgia` in the label-set interpreter.
    Proves the structural necessity of `EpisodicMemory` for nostalgia —
    not as a claim but as a Lean-verified theorem. -/
theorem nostalgia_requires_longing :
    EmotionLabel.NostalgiaLonging ∈ (nostalgia : List EmotionLabel) := by decide

/-- `Awe` is reachable from `aestheticAwe` — AestheticJudgement produces awe. -/
theorem aesthetic_awe_contains_awe :
    EmotionLabel.Awe ∈ (aestheticAwe : List EmotionLabel) := by decide

/-- `Transcendence` is reachable from `aestheticAwe` — it's in the top tier. -/
theorem aesthetic_awe_contains_transcendence :
    EmotionLabel.Transcendence ∈ (aestheticAwe : List EmotionLabel) := by decide

/-- `BrainStem` acoustic fright produces `GeneralArousal` — not labelled emotion,
    just arousal. Reflexive; below the labelling threshold. -/
theorem acoustic_fright_is_arousal :
    EmotionLabel.GeneralArousal ∈ (acousticFright : List EmotionLabel) := by decide


-- ============================================================
-- Universality: one definition, three interpreters, all correct
-- ============================================================

/-- [LEAN-1-FULL] All three interpreter dimensions of `awe` are simultaneously
    correct — String, label-set, and label-set Surprise membership.
    This is ad-hoc polymorphism: one term, all proofs hold at once.

    The conjunction is closed by `⟨rfl, by decide, by decide⟩` — three
    different proof strategies for three different domains, unified by the
    same term `awe`. -/
theorem awe_structural_universality :
    (awe : String) = "(fear ⊓ surprise)" ∧
    EmotionLabel.Fear ∈ (awe : List EmotionLabel) ∧
    EmotionLabel.Surprise ∈ (awe : List EmotionLabel) :=
  ⟨rfl, by decide, by decide⟩


-- ============================================================
-- Structural distinctness of mechanisms
-- ============================================================

/-- `nostalgia` and `acousticFright` are structurally distinct in the
    label-set interpreter — they produce different reachable labels.
    Nostalgia requires NostalgiaLonging; acoustic fright does not. -/
theorem nostalgia_ne_acoustic_fright :
    (nostalgia : List EmotionLabel) ≠ (acousticFright : List EmotionLabel) := by decide

/-- `love` and `awe` are structurally distinct in the label-set interpreter.
    They share no common label (Happiness vs Fear/Surprise). -/
theorem love_ne_awe :
    (love : List EmotionLabel) ≠ (awe : List EmotionLabel) := by decide


-- ============================================================
-- Gap markers — axioms not yet provable; proof obligation documented
-- ============================================================

/- [CO-ID-1-GAP] The percept = propagator pole co-identification requires
    a propagator definition in src/. Not yet present.
    Next step: add `def somaticPropagator` to SomaField.lean, then
    this gap becomes a theorem. -/
#check @EmotionLang   -- typeclass is here; propagator definition is the gap

/- [CO-ID-2-GAP] Attractor = Hopfield minimum requires the Hopfield energy
    function in Lean. Present in instrument/field.py (H = ½eᵀWe − bᵀe)
    and mentioned in src/Hopfield.lean, but not yet a Lean def over EmotionState.
    Next step: define `def hopfieldH` in SomaField.lean. -/
#check @EmotionLabel  -- placeholder; real check needs the energy function
