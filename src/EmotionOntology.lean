/-
  EmotionOntology.lean — Final Tagless Emotion DSL
  "Separating Church and State"

  The pattern:
    Church = EmotionLang, the abstract algebra.  Use cases ARE the vocabulary.
             A term like `nostalgia` is a polymorphic def that works for ANY
             interpreter, with no commitment to semantics.
    State  = the interpreters — typeclass instances that give the same terms
             different meanings: pretty-print, reachable-label set, valence, ...

  Origin — banana-rdf Diesel (Scala DSL for OWL2, Alistair Johnson):

      f.ChildlessPerson ≡ (f.Person ⊓ (f.Parent¬))
      f.Mother          ≡ (f.Woman ⊓ f.Parent)
      f.hasGrandparent  -- propertyChainAxiom --> (hasParent, hasParent)

  Rendered by the String interpreter as:

      Emotion.childlessness  →  "(person ⊓ ¬parent)"
      Emotion.nostalgia      →  "[mem]→(joy ⊓ sadness)"
      Emotion.awe            →  "(fear ⊓ surprise)"

  ──────────────────────────────────────────────────────────────────────────
  Architecture

  PRIMITIVES     EmotionLabel, Mechanism — atoms for the interpreters
  ALGEBRA        EmotionLang typeclass   — vocabulary (one method = one use case)
  TERMS          Emotion namespace       — named defs, polymorphic over any r
  INTERPRETERS   String / List EmotionLabel / Valence instances
  THEOREMS       decide on the List EmotionLabel and Valence interpreters
  OWL ↔ W        correspondence table as closing commentary
-/


-- ════════════════════════════════════════════════════════════════════════════
-- PRIMITIVES — atoms used by interpreters
-- ════════════════════════════════════════════════════════════════════════════

/-- The canonical set of emotion attractor labels.
    These are the *values* at the minima of the energy landscape. -/
inductive EmotionLabel : Type
  | Happiness | Sadness | Fear | Anger | Disgust | Surprise
  | GeneralArousal | Calmness
  | NostalgiaLonging | Awe | Transcendence | Tenderness | Tension
  | MixedUnspecified
  deriving DecidableEq, Repr

/-- The eight BRECVEMA psychological mechanisms (Juslin & Västfjäll 2008;
    Juslin et al. 2011; "A" added in Juslin 2019).
    Each is an "object property" in the emotion-induction ontology. -/
inductive Mechanism : Type
  | BrainStem              -- reflexive arousal; fastest; culturally invariant
  | RhythmicEntrainment    -- body-rhythm lock; slow; innate
  | EvaluativeConditioning -- associative; involuntary; highly cultural
  | Contagion              -- internal mimicry; modular; innate
  | VisualImagery          -- self-generated scenes; voluntary; cultural
  | EpisodicMemory         -- autobiographical; canonical nostalgia source
  | MusicalExpectancy      -- schema violation/confirmation; slow; cultural
  | AestheticJudgement     -- reflective evaluation; requires expertise
  deriving DecidableEq, Repr


-- ════════════════════════════════════════════════════════════════════════════
-- THE ALGEBRA — use cases as vocabulary
-- ════════════════════════════════════════════════════════════════════════════

/-- `EmotionLang r` is the algebra of emotional expressions interpreted in `r`.

    This is the "Church" half: a pure abstract vocabulary with no semantics.
    Any type `r` that provides these methods is a valid semantic domain.

    Vocabulary:
      joy, sadness, fear, anger, disgust, surprise, trust, anticipation
        — the eight Plutchik/Ekman atoms
      blend a b   — co-activation  (banana-rdf ⊓, OWL intersectionOf)
      dampen a b  — a in absence of b  (banana-rdf ⊓ ¬, OWL complementOf)
      evoke m e   — mechanism m activates e  (OWL someValuesFrom / propertyChain) -/
class EmotionLang (r : Type) where
  joy          : r
  sadness      : r
  fear         : r
  anger        : r
  disgust      : r
  surprise     : r
  trust        : r
  anticipation : r
  /-- Simultaneous co-activation.  A ⊓ B.
      banana-rdf: `f.Mother ≡ (f.Woman ⊓ f.Parent)` -/
  blend  : r → r → r
  /-- Primary state in the context of inhibiting the secondary.  A ⊓ ¬B.
      banana-rdf: `f.ChildlessPerson ≡ (f.Person ⊓ (f.Parent¬))` -/
  dampen : r → r → r
  /-- Mechanism application: m evokes emotional state e.
      banana-rdf: `f.hasGrandparent -- propertyChainAxiom --> (hasParent, hasParent)` -/
  evoke  : Mechanism → r → r


-- ════════════════════════════════════════════════════════════════════════════
-- TERMS — named expressions; polymorphic over any interpreter
-- ════════════════════════════════════════════════════════════════════════════

namespace Emotion

-- Make the algebra methods available unqualified in this namespace
open EmotionLang

variable {r : Type} [EmotionLang r]

-- ── Plutchik dyads (⊓ constructions) ────────────────────────────────────────

/-- Love = Joy ⊓ Trust.  Plutchik's primary positive dyad. -/
def love : r := blend joy trust

/-- Optimism = Joy ⊓ Anticipation.  Forward-facing positive blend. -/
def optimism : r := blend joy anticipation

/-- Disapproval = Sadness ⊓ Surprise.  Unexpected negative outcome. -/
def disapproval : r := blend sadness surprise

/-- Remorse = Sadness ⊓ Disgust.  Past-directed self-negative blend. -/
def remorse : r := blend sadness disgust

/-- Awe = Fear ⊓ Surprise.  The chills/transcendence precursor.
    Produced by MusicalExpectancy or AestheticJudgement mechanism. -/
def awe : r := blend fear surprise

/-- Contempt = Disgust ⊓ ¬Anger.  Disgust without the heat of anger.
    Uses dampen: disgust is primary; anger is suppressed. -/
def contempt : r := dampen disgust anger

/-- Submission = Trust ⊓ ¬Fear.  Trust that actively suppresses fear. -/
def submission : r := dampen trust fear

/-- Aggressiveness = Anger ⊓ Anticipation.  Purposeful, directed anger. -/
def aggressiveness : r := blend anger anticipation

-- ── BRECVEMA named scenarios ─────────────────────────────────────────────────

/-- Nostalgia = [EpisodicMemory] → (Joy ⊓ Sadness).
    The episodic memory mechanism is structurally necessary:
    contagion or brain-stem reflex alone cannot produce this state.
    This is the canonical output of autobiographical memory induction.
    Juslin ESM data (N=573): episodic memory ~16% of all music-induced emotions. -/
def nostalgia : r := evoke .EpisodicMemory (blend joy sadness)

/-- Acoustic fright: BrainStem → Fear.
    Reflexive; pre-wired; culturally invariant; onset < 1 second. -/
def acousticFright : r := evoke .BrainStem fear

/-- Mirror sadness: Contagion → Sadness.
    Internal mimicry of sorrowful musical expression (voice-like timbre). -/
def mirrorSadness : r := evoke .Contagion sadness

/-- Thrill of resolution: MusicalExpectancy → (Surprise ⊓ Joy).
    A delayed harmonic resolution that finally arrives.
    Requires musical structure to unfold first — slow onset. -/
def thrillOfResolution : r := evoke .MusicalExpectancy (blend surprise joy)

/-- Tension: MusicalExpectancy → (Fear ⊓ Surprise).
    Unresolved expectancy; dissonance held without release. -/
def expectancyTension : r := evoke .MusicalExpectancy (blend fear surprise)

/-- Conditioned affect: EvaluativeConditioning → Fear.
    Involuntary, associative, pre-conscious, culturally acquired.
    Structurally interesting: fires automatically (like BrainStem) but is
    entirely shaped by individual learning history (unlike BrainStem).
    This is why it is systematically underreported in ESM self-report studies. -/
def conditionedAffect : r := evoke .EvaluativeConditioning fear

/-- Entrained calm: RhythmicEntrainment → Joy.
    Body-rhythm lock to a steady, moderate-tempo pulse.
    Body-based, slow; cannot be produced by a brief excerpt. -/
def entrainedCalm : r := evoke .RhythmicEntrainment joy

/-- Imagined tenderness: VisualImagery → (Joy ⊓ Sadness).
    A listener conjures a tender scene — perhaps a farewell.
    Voluntary; culturally shaped; can produce any emotion. -/
def imaginedTenderness : r := evoke .VisualImagery (blend joy sadness)

/-- Aesthetic awe: AestheticJudgement → (Fear ⊓ Surprise).
    Reflective evaluation of musical craft triggers awe.
    Requires musical expertise; added in Juslin 2019 (BRECVEM → BRECVEMA). -/
def aestheticAwe : r := evoke .AestheticJudgement awe

-- ── The open problem: dual-mechanism activation ──────────────────────────────

/-- EpisodicMemory + Contagion firing simultaneously.
    Both channels produce sadness; the memory channel adds longing.
    The W matrix decides the precise attractor.
    Juslin (2011, p.638): "exploring how various musical emotions come about
    through the interaction of multiple psychological mechanisms is an exciting
    endeavour that has just begun." -/
def memoryAndContagion : r :=
  blend
    (evoke .EpisodicMemory sadness)
    (evoke .Contagion      sadness)

/-- BrainStem + EpisodicMemory: the gate-opening chain.
    BrainStem fires first (fast), shifts the field, opens arousal.
    EpisodicMemory then labels the activated state.
    Equivalent to banana-rdf propertyChainAxiom: (brainStem ∘ episodic).
    This chain explains why nostalgia sometimes arrives with a physical shock. -/
def brainStemThenMemory : r :=
  blend
    (evoke .BrainStem     fear)
    (evoke .EpisodicMemory (blend joy sadness))

end Emotion


-- ════════════════════════════════════════════════════════════════════════════
-- INTERPRETERS — the "State" half
-- Each instance is a complete semantics for the same vocabulary.
-- ════════════════════════════════════════════════════════════════════════════

-- ── Interpreter 1 — String (banana-rdf Diesel notation) ─────────────────────

/-- Renders expressions in banana-rdf Diesel notation.
    `#eval (Emotion.nostalgia : String)` → "[mem]→(joy ⊓ sadness)"
    `#eval (Emotion.awe       : String)` → "(fear ⊓ surprise)" -/
instance : EmotionLang String where
  joy          := "joy"
  sadness      := "sadness"
  fear         := "fear"
  anger        := "anger"
  disgust      := "disgust"
  surprise     := "surprise"
  trust        := "trust"
  anticipation := "anticipation"
  blend  a b   := s!"({a} ⊓ {b})"
  dampen a b   := s!"({a} ⊓ ¬{b})"
  evoke  m e   :=
    let tag := match m with
      | .BrainStem              => "bs"
      | .RhythmicEntrainment    => "ent"
      | .EvaluativeConditioning => "cond"
      | .Contagion              => "cong"
      | .VisualImagery          => "img"
      | .EpisodicMemory         => "mem"
      | .MusicalExpectancy      => "exp"
      | .AestheticJudgement     => "aes"
    s!"[{tag}]→{e}"


-- ── Interpreter 2 — List EmotionLabel (reachable label set) ─────────────────

/-- Maps each expression to the set of EmotionLabel values it can produce.
    This is the ABox interpretation: `owl:someValuesFrom` as a list membership check.
    Used for all decidable theorems. -/
instance : EmotionLang (List EmotionLabel) where
  joy          := [.Happiness]
  sadness      := [.Sadness]
  fear         := [.Fear]
  anger        := [.Anger]
  disgust      := [.Disgust]
  surprise     := [.Surprise]
  trust        := [.Happiness]
  anticipation := [.Happiness]
  blend  xs ys := xs ++ ys          -- reachable set is the union
  dampen xs _  := xs                 -- primary state; inhibited is suppressed
  evoke  m xs  :=                    -- mechanism adds its characteristic labels
    let extra : List EmotionLabel := match m with
      | .BrainStem              => [.GeneralArousal, .Tension]
      | .RhythmicEntrainment    => [.GeneralArousal, .Calmness]
      | .EvaluativeConditioning => []   -- strengthens input, adds no new label
      | .Contagion              => []   -- mirrors input exactly
      | .VisualImagery          => []   -- user-generated; any label is possible
      | .EpisodicMemory         => [.NostalgiaLonging]
      | .MusicalExpectancy      => [.Surprise, .Awe]
      | .AestheticJudgement     => [.Awe, .Transcendence]
    extra ++ xs


-- ── Interpreter 3 — Valence (Russell circumplex projection) ─────────────────

inductive Valence : Type
  | Positive | Negative | Mixed
  deriving DecidableEq, Repr

/-- Projects each expression onto the valence axis of Russell's circumplex.
    blend Positive Negative → Mixed (the bittersweet/nostalgia quadrant).
    This is a coarse projection; the full circumplex needs ArousalLevel too. -/
instance : EmotionLang Valence where
  joy          := .Positive
  sadness      := .Negative
  fear         := .Negative
  anger        := .Negative
  disgust      := .Negative
  surprise     := .Mixed
  trust        := .Positive
  anticipation := .Positive
  blend  v₁ v₂ := match v₁, v₂ with
    | .Positive, .Positive => .Positive
    | .Negative, .Negative => .Negative
    | _,         _         => .Mixed
  dampen v  _  := v      -- inhibited state does not change primary valence
  evoke  _  v  := v      -- mechanism modulates but does not invert valence


-- ════════════════════════════════════════════════════════════════════════════
-- THEOREMS — decided against concrete interpreters
-- ════════════════════════════════════════════════════════════════════════════

-- ── Label-set membership theorems ────────────────────────────────────────────

/-- EpisodicMemory is structurally necessary to produce NostalgiaLonging.
    The label appears because the `evoke .EpisodicMemory` constructor adds it. -/
theorem nostalgia_produces_longing :
    .NostalgiaLonging ∈ (Emotion.nostalgia : List EmotionLabel) := by decide

/-- Awe has Fear as a component (Fear ⊓ Surprise). -/
theorem awe_involves_fear :
    .Fear ∈ (Emotion.awe : List EmotionLabel) := by decide

/-- BrainStem reflex always adds GeneralArousal. -/
theorem acoustic_fright_is_arousing :
    .GeneralArousal ∈ (Emotion.acousticFright : List EmotionLabel) := by decide

/-- MusicalExpectancy adds Surprise to any resolution event. -/
theorem thrill_involves_surprise :
    .Surprise ∈ (Emotion.thrillOfResolution : List EmotionLabel) := by decide

/-- AestheticJudgement adds Transcendence (requires expertise). -/
theorem aesthetic_awe_produces_transcendence :
    .Transcendence ∈ (Emotion.aestheticAwe : List EmotionLabel) := by decide

/-- The dual-mechanism scenario produces NostalgiaLonging
    because the EpisodicMemory channel is present. -/
theorem dual_mechanism_has_longing :
    .NostalgiaLonging ∈ (Emotion.memoryAndContagion : List EmotionLabel) := by decide

/-- The gate-opening chain (BrainStem then EpisodicMemory) produces both
    Fear (from BrainStem) and NostalgiaLonging (from EpisodicMemory). -/
theorem chain_produces_fear :
    .Fear ∈ (Emotion.brainStemThenMemory : List EmotionLabel) := by decide

theorem chain_produces_longing :
    .NostalgiaLonging ∈ (Emotion.brainStemThenMemory : List EmotionLabel) := by decide

-- ── Valence theorems ─────────────────────────────────────────────────────────

/-- Nostalgia is Mixed valence: Joy (Positive) ⊓ Sadness (Negative). -/
theorem nostalgia_is_mixed   : (Emotion.nostalgia : Valence) = .Mixed    := by decide

/-- Love is Positive: Joy ⊓ Trust, both positive. -/
theorem love_is_positive     : (Emotion.love      : Valence) = .Positive := by decide

/-- Awe is Mixed: Fear (Negative) ⊓ Surprise (Mixed) → Mixed. -/
theorem awe_is_mixed         : (Emotion.awe       : Valence) = .Mixed    := by decide

/-- Contempt is Negative: Disgust (Negative) ⊓ ¬Anger; primary valence wins. -/
theorem contempt_is_negative : (Emotion.contempt  : Valence) = .Negative := by decide

/-- Conditioning preserves valence: conditioned fear is still Negative. -/
theorem conditioned_fear_is_negative :
    (Emotion.conditionedAffect : Valence) = .Negative := by decide

-- ── String display (run with `#eval`) ────────────────────────────────────────

#eval (Emotion.nostalgia           : String)   -- "[mem]→(joy ⊓ sadness)"
#eval (Emotion.awe                 : String)   -- "(fear ⊓ surprise)"
#eval (Emotion.love                : String)   -- "(joy ⊓ trust)"
#eval (Emotion.contempt            : String)   -- "(disgust ⊓ ¬anger)"
#eval (Emotion.submission          : String)   -- "(trust ⊓ ¬fear)"
#eval (Emotion.memoryAndContagion  : String)   -- "([mem]→sadness ⊓ [cong]→sadness)"
#eval (Emotion.brainStemThenMemory : String)   -- "([bs]→fear ⊓ [mem]→(joy ⊓ sadness))"
#eval (Emotion.conditionedAffect   : String)   -- "[cond]→fear"
#eval (Emotion.aestheticAwe        : String)   -- "[aes]→(fear ⊓ surprise)"
#eval (Emotion.thrillOfResolution  : String)   -- "[exp]→(surprise ⊓ joy)"

-- ── Label set display ─────────────────────────────────────────────────────────

#eval (Emotion.nostalgia          : List EmotionLabel)
-- [NostalgiaLonging, Happiness, Sadness]

#eval (Emotion.memoryAndContagion : List EmotionLabel)
-- [NostalgiaLonging, Sadness, Sadness]

#eval (Emotion.brainStemThenMemory : List EmotionLabel)
-- [GeneralArousal, Tension, Fear, NostalgiaLonging, Happiness, Sadness]


-- ════════════════════════════════════════════════════════════════════════════
-- OWL ↔ W CORRESPONDENCE
-- (connecting to SomaField.lean)
-- ════════════════════════════════════════════════════════════════════════════

/-
  The EmotionLang vocabulary maps simultaneously to three things:
  banana-rdf Diesel operators, OWL2 DL constructs, and W matrix entries.

  EmotionLang method   Diesel operator    OWL2 construct        W matrix
  ────────────────────────────────────────────────────────────────────────────
  blend a b            a ⊓ b              intersectionOf        W_ij > 0
  dampen a b           a ⊓ ¬b             a ⊓ complementOf(b)   W_ij < 0
  evoke m e            m --> e            someValuesFrom(m,e)   W_ij ≠ 0
  nostalgia            [mem]→(j ⊓ s)      EquivalentClass expr  metastable attractor
  awe                  (f ⊓ s)            intersectionOf        blend attractor
  (no term)            —                  disjointWith          W_ij < 0, W_ji < 0

  What OWL gives you:    entailment   (is e a member of class C?)
  What this DSL gives:   structure    (what is the expression tree of e?)
  What SomaField gives:  trajectories (where does the field go from state e?)

  The String interpreter = OWL Class Expression rendering
  The List interpreter   = OWL ABox (assertional / reachable-instance) query
  The Valence interpreter = Russell circumplex projection
  The W matrix            = soma-field dynamics

  To add a new interpreter (e.g. EEG frequency band, body-map region,
  therapeutic intervention type): implement `instance : EmotionLang MyType`.
  The terms in `Emotion.*` require zero changes.
  This is the Expression Problem, solved.
-/

