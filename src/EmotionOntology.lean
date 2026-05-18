/-
  EmotionOntology.lean
  Emotional Logic as a Lean 4 DSL

  This file is the "banana-rdf Diesel, but for emotions" moment.
  The banana-rdf Diesel DSL let you write:

      f.ChildlessPerson ≡ (f.Person ⊓ (f.Parent¬))
      f.hasGrandparent  -- owl:propertyChainAxiom --> (hasParent, hasParent)
      f.Mother          ≡ (f.Woman ⊓ f.Parent)

  ...and it compiled to valid OWL2 / RDF triples.

  Here we do the same thing, but:
    (a) for emotions rather than family relations
    (b) in Lean 4 rather than Scala/banana-rdf
    (c) with dynamics (the soma-field ODE) rather than only static classification

  The key insight: every existing emotion representation is *descriptive*.
  Ekman, Plutchik, Russell, OCC, GEMS — they all tell you what to call a state.
  None of them tell you what happens when two mechanisms fire simultaneously.
  That gap is exactly what the W coupling matrix closes.

  ──────────────────────────────────────────────────────────────────────────
  ARCHITECTURE

  Layer 1 | EmotionClass     — Lean inductive type encoding the T-Box
            (Ekman, Plutchik, OCC, GEMS — descriptive schemas)

  Layer 2 | Mechanism        — BRECVEM(A) inductive type
            (the "OWL object properties" that activate emotion attractors)

  Layer 3 | MechanismProps   — properties of each mechanism
            (speed, cultural impact, volitional influence — the OWL annotations)

  Layer 4 | Field/W          — dynamical layer (see SomaField.lean)
            (attractor labels = EmotionClass values; W entries = property weights)

  Layer 5 | Theorems          — what Aesop can prove automatically
            (taxonomy membership, mechanism → attractor, blend decomposition)

  ──────────────────────────────────────────────────────────────────────────
  NOTE: This file is standalone — no Mathlib import needed for Layers 1–3.
  Layer 4 connects to SomaField.lean.  Layer 5 uses `decide` and `aesop`.
-/


-- ════════════════════════════════════════════════════════════════════════════
-- LAYER 1 — Emotion Taxonomy
-- ════════════════════════════════════════════════════════════════════════════

/-
  BasicEmotion — Ekman's six universals (1972) plus Plutchik's two additions.
  These are the leaves of the categorical tree.

  Plutchik (1980) proposed 8 primary emotions arranged as opposite pairs:
    Joy      ↔ Sadness
    Trust    ↔ Disgust
    Fear     ↔ Anger
    Surprise ↔ Anticipation
-/
inductive BasicEmotion : Type
  | Joy          -- Ekman: happiness
  | Sadness      -- Ekman
  | Fear         -- Ekman
  | Anger        -- Ekman
  | Disgust      -- Ekman
  | Surprise     -- Ekman
  | Trust        -- Plutchik addition
  | Anticipation -- Plutchik addition
  deriving DecidableEq, Repr

/-
  Valence: the positive/negative axis of Russell's circumplex (1980).
  Every BasicEmotion has a valence.
-/
inductive Valence : Type
  | Positive
  | Negative
  | Mixed    -- for blends: nostalgia, awe, bittersweetness
  deriving DecidableEq, Repr

/-
  Arousal: the activation axis of Russell's circumplex.
-/
inductive ArousalLevel : Type
  | High   -- e.g. fear, anger, excitement
  | Medium
  | Low    -- e.g. sadness, calm, contentment
  deriving DecidableEq, Repr

/-- Project each BasicEmotion onto Russell's circumplex (valence, arousal). -/
def basicValence : BasicEmotion → Valence
  | .Joy          => .Positive
  | .Trust        => .Positive
  | .Anticipation => .Positive
  | .Sadness      => .Negative
  | .Fear         => .Negative
  | .Anger        => .Negative
  | .Disgust      => .Negative
  | .Surprise     => .Mixed     -- can be pleasant or unpleasant

def basicArousal : BasicEmotion → ArousalLevel
  | .Fear         => .High
  | .Anger        => .High
  | .Surprise     => .High
  | .Joy          => .Medium
  | .Anticipation => .Medium
  | .Disgust      => .Medium
  | .Trust        => .Low
  | .Sadness      => .Low

/-
  Plutchik Dyad: a blend of two adjacent basic emotions on the wheel.
  These become the 24 "secondary" emotions.  Examples:

    Joy  ⊓ Trust       = Love
    Joy  ⊓ Anticipation = Optimism
    Fear ⊓ Surprise     = Awe
    Fear ⊓ Sadness      = Despair
    Sadness ⊓ Surprise  = Disapproval
    Anger ⊓ Anticipation = Aggressiveness
    Trust ⊓ Fear        = Submission
    Disgust ⊓ Anger     = Contempt

  This is precisely the "owl:intersectionOf" construction from OWL2.
  In banana-rdf Diesel: `f.Mother ≡ (f.Woman ⊓ f.Parent)`
  Here:                  `Love     := Joy ⊓ Trust`
-/
structure Dyad : Type where
  first  : BasicEmotion
  second : BasicEmotion
  deriving DecidableEq, Repr

/-- Plutchik's named blends — the "intersectionOf" table. -/
inductive PlutchikBlend : Type
  | Love            -- Joy ⊓ Trust
  | Optimism        -- Joy ⊓ Anticipation
  | Awe             -- Fear ⊓ Surprise
  | Disapproval     -- Sadness ⊓ Surprise
  | Remorse         -- Sadness ⊓ Disgust
  | Contempt        -- Disgust ⊓ Anger
  | Aggressiveness  -- Anger ⊓ Anticipation
  | Submission      -- Trust ⊓ Fear
  deriving DecidableEq, Repr

/-- Decompose a named blend back into its constituent basics.
    This is the inverse of `owl:intersectionOf` — given the blend,
    what are its parts?  Aesop can use this for backward chaining. -/
def blendComponents : PlutchikBlend → Dyad
  | .Love           => ⟨.Joy,          .Trust⟩
  | .Optimism       => ⟨.Joy,          .Anticipation⟩
  | .Awe            => ⟨.Fear,         .Surprise⟩
  | .Disapproval    => ⟨.Sadness,      .Surprise⟩
  | .Remorse        => ⟨.Sadness,      .Disgust⟩
  | .Contempt       => ⟨.Disgust,      .Anger⟩
  | .Aggressiveness => ⟨.Anger,        .Anticipation⟩
  | .Submission     => ⟨.Trust,        .Fear⟩

/-- Music-specific emotion categories — the GEMS (Geneva Emotional Music Scales,
    Zentner et al 2008).  These are the attractor labels most relevant to the
    soma-field paper's musical context. -/
inductive GEMSEmotion : Type
  | Wonder           -- high valence, high arousal
  | Transcendence    -- positive, very high arousal
  | Tenderness       -- positive, low arousal
  | Nostalgia        -- mixed (bittersweet), medium arousal
  | Peacefulness     -- positive, low arousal
  | Power            -- neutral-positive, high arousal
  | JoyfulActivation -- positive, high arousal
  | Tension          -- negative, high arousal
  | Sadness          -- negative, low arousal
  deriving DecidableEq, Repr

/-
  The key observation: Nostalgia is a MIXED-valence state.
  Russell's circumplex puts it in the "sad but pleasant" quadrant.
  In the soma-field, nostalgia = a metastable blend of Joy and Sadness attractors.
  The W matrix entry W(joy, sadness) determines whether this blend is stable.
-/
theorem nostalgia_is_mixed : (GEMSEmotion.Nostalgia).decidableEq GEMSEmotion.Nostalgia = true := by
  decide


-- ════════════════════════════════════════════════════════════════════════════
-- LAYER 2 — BRECVEM(A) Mechanisms
-- ════════════════════════════════════════════════════════════════════════════

/-
  The eight psychological mechanisms through which music evokes emotion.
  (Juslin & Västfjäll 2008; Juslin et al 2011, Chapter 22; Juslin 2019)

  In OWL terms, these are the "Object Properties" that map musical stimuli
  to emotional states.  In banana-rdf terms: the `hasParent`, `hasChild`, etc.
  but for music-emotion induction.

  Each mechanism is an "information-processing device" at a different level
  of the brain, with its own evolutionary origin, processing speed, and
  susceptibility to culture/learning.
-/
inductive Mechanism : Type
  | BrainStem
    /- Reflexive arousal response to extreme acoustic features
       (loud, sudden, dissonant sounds).  Pre-wired.  Fastest (<1s).
       Cultural impact: Low.  Brain regions: reticular formation, thalamus.
       Equivalent OWL axiom: BrainStemReflexResponse ⊆ ∃triggeredBy.AcousticFeature -/

  | RhythmicEntrainment
    /- Body rhythms (heart rate, breathing) lock to musical pulse.
       Slow induction.  Cultural impact: Low.
       Brain regions: cerebellum, sensorimotor cortex.
       OWL analogue: EntrainmentResponse owl:propertyChainAxiom (hasPulse, locksTo) -/

  | EvaluativeConditioning
    /- Emotion by association: music repeatedly paired with +/- stimulus.
       Implicit, NOT available to consciousness.  Cultural impact: HIGH.
       Brain regions: lateral nucleus of amygdala.
       OWL analogue: ConditionedResponse ← hasCovariation .PositiveStimulus -/

  | Contagion
    /- Internal mimicry of the perceived emotional expression.
       Mirror-neuron mediated.  Highly modular.  Cultural impact: Low.
       The "voice-like" quality of musical instruments is key.
       OWL analogue: EmotionalContagion ≡ ∃mimics.PerceivedExpression -/

  | VisualImagery
    /- Self-conjured inner images of emotional scenes.
       High volitional influence.  Cultural impact: HIGH.
       Brain regions: visual cortex, left temporo-occipital.
       OWL analogue: ImageryResponse ⊆ ∃hasContent.EmotionalScene -/

  | EpisodicMemory
    /- Autobiographical memory evoked by music.
       Most commonly produces Nostalgia-Longing.
       Brain regions: hippocampus, right anterior PFC.
       OWL analogue: MemoryResponse ≡ ∃retrieves.PersonalEvent ⊓ ∃hasTime.Past -/

  | MusicalExpectancy
    /- Violation, delay, or confirmation of learned musical expectations.
       Produces surprise, thrills, anticipation, disappointment.
       Requires musical structure to unfold first — SLOW onset.
       OWL analogue: ExpectancyResponse ← ∃violates.LearnedSchema -/

  | AestheticJudgement
    /- Reflective evaluation of the music's beauty, craft, or meaning.
       Added in Juslin (2019), making BRECVEM → BRECVEMA.
       Cognitively mediated; depends on musical expertise.
       OWL analogue: AestheticResponse ⊆ ∃evaluates.ArtObject -/

  deriving DecidableEq, Repr


-- ════════════════════════════════════════════════════════════════════════════
-- LAYER 3 — Mechanism Properties
-- (The OWL annotations — Table 22.3 from Juslin et al 2011)
-- ════════════════════════════════════════════════════════════════════════════

/-
  InductionSpeed: how quickly can this mechanism produce an emotion?
  Directly analogous to OWL's `owl:FunctionalProperty` vs chain axioms
  (chains require more steps = more time).
-/
inductive InductionSpeed : Type
  | VeryFast   -- < 1 second (BrainStem)
  | Fast       -- seconds
  | Medium     -- tens of seconds
  | Slow       -- requires musical unfolding / entrainment buildup
  deriving DecidableEq, Repr

/-- Map mechanism → induction speed.
    This is what OWL would model as a datatype property. -/
def mechanismSpeed : Mechanism → InductionSpeed
  | .BrainStem           => .VeryFast
  | .Contagion           => .Fast
  | .EvaluativeConditioning => .Fast  -- the trigger is fast once conditioned
  | .EpisodicMemory      => .Medium
  | .VisualImagery       => .Medium
  | .AestheticJudgement  => .Medium
  | .MusicalExpectancy   => .Slow    -- structure must unfold first
  | .RhythmicEntrainment => .Slow    -- oscillators need time to lock

/-
  CulturalImpact: how much does learning/culture shape the response?
  Low = innate/universal; High = acquired/culture-specific.
  Analogous to OWL's owl:ReflexiveProperty (low = reflexive) vs learned.
-/
inductive CulturalImpact : Type
  | Low    -- innate, hard-wired
  | Medium
  | High   -- strongly shaped by culture and individual history
  deriving DecidableEq, Repr

def mechanismCulture : Mechanism → CulturalImpact
  | .BrainStem            => .Low
  | .RhythmicEntrainment  => .Low
  | .Contagion            => .Low
  | .EvaluativeConditioning => .High
  | .VisualImagery        => .High
  | .EpisodicMemory       => .High
  | .MusicalExpectancy    => .High
  | .AestheticJudgement   => .High

/-
  VoluntaryControl: can the listener actively influence this mechanism?
  Low = modular, automatic; High = effortful, volitional.
  Analogous to OWL's owl:IrreflexiveProperty (can't point to itself = automatic).
-/
inductive VoluntaryControl : Type
  | Involuntary  -- fires automatically, like BrainStem or Conditioning
  | Partial
  | Voluntary    -- listener can choose to engage or suppress
  deriving DecidableEq, Repr

def mechanismVolition : Mechanism → VoluntaryControl
  | .BrainStem              => .Involuntary
  | .EvaluativeConditioning => .Involuntary
  | .RhythmicEntrainment    => .Partial
  | .Contagion              => .Partial
  | .EpisodicMemory         => .Partial
  | .MusicalExpectancy      => .Partial
  | .VisualImagery          => .Voluntary
  | .AestheticJudgement     => .Voluntary

/-
  MechanismProfile bundles all properties.
  This is the Lean equivalent of a banana-rdf PointedGraph:
  a named node with its property values attached.
-/
structure MechanismProfile : Type where
  mechanism : Mechanism
  speed     : InductionSpeed
  culture   : CulturalImpact
  volition  : VoluntaryControl
  deriving Repr

def profileOf (m : Mechanism) : MechanismProfile :=
  { mechanism := m
  , speed     := mechanismSpeed   m
  , culture   := mechanismCulture m
  , volition  := mechanismVolition m }


-- ════════════════════════════════════════════════════════════════════════════
-- LAYER 4 — Mechanism → Emotion Mapping
-- (The "A-Box" — which mechanism fires → which emotional attractor?)
-- ════════════════════════════════════════════════════════════════════════════

/-
  Each BRECVEM mechanism has a characteristic "induced affect" —
  the emotion it tends to produce (Table 22.3, Juslin et al 2011).

  This is exactly the OWL restriction pattern:
    owl:someValuesFrom → the mechanism fires and produces at least one of these
    owl:allValuesFrom  → the mechanism ONLY produces emotions of this type

  In Lean we express this as a partial function + a membership predicate.

  Note: mechanisms can produce different emotions depending on context —
  the W matrix handles the exact weighting.  This layer gives the TYPE-LEVEL
  constraint (what is *possible*), not the exact trajectory.
-/

/-- A simplified top-level emotion type that bridges the BRECVEM layer
    to the attractor labels in SomaField.lean. -/
inductive EmotionLabel : Type
  -- Valenced basics
  | Happiness  | Sadness  | Fear  | Anger  | Disgust  | Surprise
  -- Arousal-based
  | GeneralArousal
  | Calmness
  -- Complex / blended
  | NostalgiaLonging     -- canonical EpisodicMemory output
  | Awe                  -- Fear ⊓ Surprise, BrainStem + MusicalExpectancy
  | Transcendence        -- MusicalExpectancy at peak; AestheticJudgement
  | Tenderness           -- Contagion + slow tempo
  | Tension              -- BrainStem + dissonance + unresolved Expectancy
  -- Meta
  | MixedUnspecified     -- multiple mechanisms, no single dominant attractor
  deriving DecidableEq, Repr

/-
  The characteristic outputs of each mechanism.
  Expressed as a List to capture the range of possible outcomes.
  This is `owl:someValuesFrom` in type form.
-/
def mechanismOutputs : Mechanism → List EmotionLabel
  | .BrainStem           => [.GeneralArousal, .Fear, .Tension]
  | .RhythmicEntrainment => [.GeneralArousal, .Calmness, .Happiness]
  | .EvaluativeConditioning => [.Happiness, .Fear, .Sadness, .Disgust]
    -- all basic emotions possible via conditioning; depends on history
  | .Contagion           => [.Happiness, .Sadness, .Fear, .Tenderness]
    -- mirrors the expression in the music: basic emotions only
  | .VisualImagery       => [.Happiness, .Sadness, .Fear, .Anger,
                              .Awe, .Tenderness, .NostalgiaLonging,
                              .MixedUnspecified]
    -- imagery can produce any emotion via self-generated content
  | .EpisodicMemory      => [.NostalgiaLonging, .Sadness, .Happiness,
                              .Fear, .Awe, .MixedUnspecified]
    -- canonically nostalgia-longing (most frequent in ESM data, ~16%)
  | .MusicalExpectancy   => [.Surprise, .Awe, .Tension, .Transcendence,
                              .Happiness, .Fear]
    -- surprise/thrills at violation; pleasure at confirmation
  | .AestheticJudgement  => [.Awe, .Transcendence, .Happiness,
                              .MixedUnspecified]
    -- reflective evaluation; high-level outputs

/-
  Is a given emotion label a *possible* output of a given mechanism?
  This is `owl:someValuesFrom` as a Lean Prop.
-/
def canProduce (m : Mechanism) (e : EmotionLabel) : Bool :=
  (mechanismOutputs m).contains e

-- ════════════════════════════════════════════════════════════════════════════
-- LAYER 5 — Provable Theorems (the Aesop/decide layer)
-- ════════════════════════════════════════════════════════════════════════════

-- Basic decidability checks — these are the Lean equivalent of
-- `(g isIsomorphicWith expectedGraph) shouldEqual true`

/-- EpisodicMemory can produce NostalgiaLonging (core finding, Juslin et al 2008). -/
theorem episodic_produces_nostalgia :
    canProduce .EpisodicMemory .NostalgiaLonging = true := by decide

/-- BrainStem cannot produce NostalgiaLonging — it lacks the memory substrate. -/
theorem brainstem_not_nostalgia :
    canProduce .BrainStem .NostalgiaLonging = false := by decide

/-- Visual imagery is the only mechanism that is *voluntary* AND can produce
    arbitrary emotions (the highest expressive latitude). -/
theorem imagery_is_voluntary :
    mechanismVolition .VisualImagery = .Voluntary := by decide

/-- The two innate/fast mechanisms are BrainStem-class and Contagion-class. -/
theorem brainstem_is_innate :
    mechanismCulture .BrainStem = .Low := by decide

theorem contagion_is_innate :
    mechanismCulture .Contagion = .Low := by decide

/-- RhythmicEntrainment and MusicalExpectancy are both slow.
    This means that in a brief musical excerpt, they are less likely to dominate. -/
theorem entrainment_is_slow :
    mechanismSpeed .RhythmicEntrainment = .Slow := by decide

theorem expectancy_is_slow :
    mechanismSpeed .MusicalExpectancy = .Slow := by decide

/-- EvaluativeConditioning fires automatically (involuntary) AND
    is highly culture-specific — a combination not seen in any other mechanism.
    This explains why conditioning is systematically underreported in ESM studies
    (people can't introspect on it) despite being common. -/
theorem conditioning_paradox :
    mechanismVolition .EvaluativeConditioning = .Involuntary ∧
    mechanismCulture  .EvaluativeConditioning = .High := by
  constructor <;> decide

/-
  ══ THE OPEN PROBLEM (Juslin 2011, p.638) ══
  "Exploring how various musical emotions come about through the interaction
   of multiple psychological mechanisms is an exciting endeavour that has
   just begun."

  This is what the soma-field W matrix formalises.
  The theorem below states the *type* of the open problem:
  given two mechanisms firing simultaneously, what attractor results?

  We cannot `decide` this — it depends on the W matrix entries.
  The formal proof lives in SomaField.lean.
  But we can state the type:
-/
structure MechanismPair : Type where
  m1 : Mechanism
  m2 : Mechanism
  deriving Repr

/-- The open problem: simultaneous dual-mechanism activation.
    The result is a field state, not a single EmotionLabel.
    This is the structural gap in all purely taxonomic accounts. -/
def dualActivationLabel (mp : MechanismPair) : Option EmotionLabel :=
  let outputs1 := mechanismOutputs mp.m1
  let outputs2 := mechanismOutputs mp.m2
  let shared   := outputs1.filter (fun e => outputs2.contains e)
  match shared with
  | []  => some .MixedUnspecified  -- no overlap → blend attractor
  | [e] => some e                  -- unique shared output → that label
  | _   => some .MixedUnspecified  -- multiple shared → field decides

/-- Example: EpisodicMemory + Contagion.
    EpisodicMemory outputs: NostalgiaLonging, Sadness, Happiness, ...
    Contagion outputs:      Happiness, Sadness, Fear, Tenderness
    Shared: Happiness, Sadness → the field state is a blend (W decides). -/
#eval dualActivationLabel ⟨.EpisodicMemory, .Contagion⟩
-- Output: some MixedUnspecified
-- Interpretation: you need the W matrix to know which attractor "wins"

/-- Example: BrainStem + MusicalExpectancy.
    Both can produce Fear and Tension (via different routes).
    Shared output: Fear → the field reinforces it.
    This is why sudden dissonant violations feel genuinely frightening. -/
#eval dualActivationLabel ⟨.BrainStem, .MusicalExpectancy⟩


-- ════════════════════════════════════════════════════════════════════════════
-- INTERLUDE — The OWL connection made explicit
-- ════════════════════════════════════════════════════════════════════════════

/-
  In banana-rdf you wrote:

      f.hasGrandparent -- owl.propertyChainAxiom --> (f.hasParent, f.hasParent)

  The emotional equivalent is the BRECVEM temporal chain:
  EpisodicMemory is often triggered *after* BrainStem or Contagion has
  already fired — the fast mechanism opens the gate, the slow mechanism
  provides the label.

  In Lean:
      hasGrandparent ∘ hasGrandparent
      = hasParent ∘ hasParent ∘ hasParent ∘ hasParent   (by transitivity)

  For emotions:
      (BrainStem ≫ EpisodicMemory) produces something richer than either alone.
      The W off-diagonal entries encode exactly this "property chain" idea.
-/

/-- A simple chain: mechanism m1 fires first, then m2 follows.
    The resulting label is the output of m2, but conditioned on m1 having run.
    (In the dynamical model, m1 shifts the field, then m2 labels the attractor.) -/
def chain (m1 m2 : Mechanism) : List EmotionLabel :=
  -- m2's outputs, filtered to those compatible with m1 having fired
  -- (simple version: m2's outputs that overlap with m1's possible outputs)
  mechanismOutputs m2

/-- BrainStem opens a state of arousal; EpisodicMemory then labels it.
    The chain BrainStem ≫ EpisodicMemory → NostalgiaLonging is possible. -/
example : (.NostalgiaLonging) ∈ chain .BrainStem .EpisodicMemory := by decide


-- ════════════════════════════════════════════════════════════════════════════
-- LAYER 6 — Connecting to the Field (stub — full version in SomaField.lean)
-- ════════════════════════════════════════════════════════════════════════════

/-
  The soma-field has n emotion dimensions.
  For the musical context (BRECVEMA), a natural choice is n = 8:
  one dimension per BRECVEM mechanism's characteristic output.

  The attractor labels in the W matrix ARE the EmotionLabel values above.
  The W_ij entry says: "if mechanism i fires, how strongly does it
  activate the attractor labelled by mechanism j's characteristic output?"

  This makes the W matrix the Lean equivalent of OWL's property axiom table —
  but with real numbers instead of booleans, and with the energy landscape
  giving you dynamics instead of static entailment.

  ┌──────────────────────────────────────────────────────────────────┐
  │  OWL (static)          │  Soma-field W matrix (dynamic)          │
  ├──────────────────────────────────────────────────────────────────┤
  │  subClassOf            │  W_ij > 0  (excitatory coupling)        │
  │  complementOf          │  W_ij < 0  (inhibitory coupling)        │
  │  equivalentClass       │  W_ij ≈ W_ji ≈ 1  (mutual reinforcement)│
  │  disjointWith          │  W_ij < 0, W_ji < 0  (mutual suppression)│
  │  propertyChainAxiom    │  product W_ik · W_kj  (indirect path)   │
  │  someValuesFrom        │  W_ij ≠ 0  (can activate)               │
  │  allValuesFrom         │  W_ij > threshold for all j in range    │
  └──────────────────────────────────────────────────────────────────┘

  Key consequence: you can ASK the model things you cannot ask OWL:
    "What is the stable emotional state when mechanisms B + E both fire?"
    "Does Nostalgia have a lower energy than Sadness under this music?"
    "Can Tension coexist with Tenderness, or do they suppress each other?"

  These are dynamical questions.  OWL gives entailment.  The soma-field
  gives trajectories.
-/

-- Placeholder connecting type — bridges EmotionLabel to field dimensions
-- Full implementation: see SomaField.lean (currently 2-dim; extension to 8-dim is TODO)
def emotionDimension : EmotionLabel → Nat
  | .GeneralArousal     => 0
  | .Calmness           => 1
  | .Happiness          => 2
  | .Sadness            => 3
  | .Fear               => 4
  | .Anger              => 5
  | .NostalgiaLonging   => 6
  | .Awe                => 7
  | .Transcendence      => 8
  | .Tenderness         => 9
  | .Tension            => 10
  | .Disgust            => 11
  | .Surprise           => 12
  | .MixedUnspecified   => 13


-- ════════════════════════════════════════════════════════════════════════════
-- QUICK REFERENCE — for clinicians, therapists, musicians
-- ════════════════════════════════════════════════════════════════════════════

/-
  HOW TO USE THIS FILE AS AN IDE

  1. Hover over any `Mechanism` constructor to see its description and OWL equivalent.

  2. Type `#eval mechanismOutputs .EpisodicMemory` to see what a given
     mechanism can produce.

  3. Type `#eval dualActivationLabel ⟨.BrainStem, .EpisodicMemory⟩` to ask
     what happens when two mechanisms fire simultaneously.

  4. Type `#eval profileOf .Contagion` to see all properties of a mechanism.

  5. Write your own theorems:

       theorem my_question :
           canProduce .Contagion .NostalgiaLonging = false := by decide
       -- If false: Contagion alone can't produce nostalgia — you need memory.

  6. The `decide` tactic handles any question that resolves to `Bool` arithmetic.
     The `aesop` tactic handles structural reasoning over the inductive types.
     For questions about TRAJECTORIES and DYNAMICS, you need SomaField.lean.
-/

-- Sanity checks — run these with `#eval` or `lake build`
#eval profileOf .EpisodicMemory
-- Expected: { mechanism := EpisodicMemory, speed := Medium, culture := High, volition := Partial }

#eval profileOf .BrainStem
-- Expected: { mechanism := BrainStem, speed := VeryFast, culture := Low, volition := Involuntary }

#eval (Mechanism.EpisodicMemory, mechanismOutputs .EpisodicMemory)
-- Expected: (EpisodicMemory, [NostalgiaLonging, Sadness, Happiness, Fear, Awe, MixedUnspecified])
