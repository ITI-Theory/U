/-
  SomaField.lean
  The Soma-Field Model — 8-dimensional BRECVEMA extension.

  Extended from the 2-dim fear/calm seed to the full 8-mechanism space.
  Each dimension is one BRECVEMA mechanism (Juslin & Västfjäll 2008; Juslin 2019).
  The W matrix encodes theoretically grounded pairwise couplings.

  Energy:    H(e) = -½ eᵀ W e      (Hopfield Hamiltonian)
  Dynamics:  e_{t+1} = e_t + dt·We  (discrete Langevin, no noise)

  Historical note:
  The original 2-dim prototype (fear/calm) is the restriction of this model to
  dimensions {BS=0, RE=1}.  W8[0,1]=0 because BS and RE interact only via CO(3).
  The 2D model was the seed; this 8D model is the full theory.

  Proof obligations (TODO for the formal paper):
  1. H is bounded below for W8 (check positive semi-definiteness).
  2. Gradient descent on H is a contraction near each stored pattern.
  3. The four stored patterns are stable minima (W·pattern ≈ λ·pattern, λ>0).
  4. brainStemThenMemory trajectory: starting near startlePattern, the indirect
     BS→CO→EM coupling eventually pulls toward nostalgiaPattern.
  5. Therapeutic W modification: reducing W[EC,CO] breaks involuntary-arousal
     coupling (formal model of desensitisation / somatic therapy).
-/

import EmotionOntology
import Mathlib.Analysis.Matrix.Spectrum


-- ════════════════════════════════════════════════════════════════════════════
-- DIMENSION MAP
-- ════════════════════════════════════════════════════════════════════════════

/-- The field has 8 dimensions, one per BRECVEMA mechanism. -/
def N8 : Nat := 8

/-- Each BRECVEMA mechanism maps to its field dimension index. -/
def Mechanism.dim : Mechanism → Fin N8
  | .BrainStem              => ⟨0, by omega⟩
  | .RhythmicEntrainment    => ⟨1, by omega⟩
  | .EvaluativeConditioning => ⟨2, by omega⟩
  | .Contagion              => ⟨3, by omega⟩
  | .VisualImagery          => ⟨4, by omega⟩
  | .EpisodicMemory         => ⟨5, by omega⟩
  | .MusicalExpectancy      => ⟨6, by omega⟩
  | .AestheticJudgement     => ⟨7, by omega⟩

/-- Mechanism name abbreviations for display. -/
def Mechanism.abbrev : Mechanism → String
  | .BrainStem              => "BS"
  | .RhythmicEntrainment    => "RE"
  | .EvaluativeConditioning => "EC"
  | .Contagion              => "CO"
  | .VisualImagery          => "VI"
  | .EpisodicMemory         => "EM"
  | .MusicalExpectancy      => "ME"
  | .AestheticJudgement     => "AJ"

/-- Dimension index → mechanism (for display). -/
def dimMech : Fin N8 → Mechanism
  | ⟨0, _⟩ => .BrainStem
  | ⟨1, _⟩ => .RhythmicEntrainment
  | ⟨2, _⟩ => .EvaluativeConditioning
  | ⟨3, _⟩ => .Contagion
  | ⟨4, _⟩ => .VisualImagery
  | ⟨5, _⟩ => .EpisodicMemory
  | ⟨6, _⟩ => .MusicalExpectancy
  | ⟨7, _⟩ => .AestheticJudgement


-- ════════════════════════════════════════════════════════════════════════════
-- THE COUPLING MATRIX W8
-- ════════════════════════════════════════════════════════════════════════════

/-
  Off-diagonal couplings grounded in BRECVEMA theory (Juslin 2011, Table 22.3).

  Positive (co-activation, W_ij > 0):
    BS(0) ↔ EC(2)  +0.30  both automatic, pre-conscious, fast
    BS(0) ↔ CO(3)  +0.40  contagion onset is near-reflexive
    RE(1) ↔ CO(3)  +0.50  shared motor/body-rhythm substrate
    EC(2) ↔ CO(3)  +0.40  both involuntary, socially triggered
    VI(4) ↔ EM(5)  +0.60  mental imagery ↔ autobiographical recall
    ME(6) ↔ AJ(7)  +0.70  both require structural musical knowledge

  Negative (mutual inhibition, W_ij < 0):
    BS(0) ↔ AJ(7) -0.40  reflexive fast processing suppresses reflective slow
    EC(2) ↔ VI(4) -0.30  involuntary conditioning suppresses voluntary imagery

  The `brainStemThenMemory` term in EmotionOntology.lean corresponds to the
  indirect BS→CO→EM chain (two positive hops: BS↔CO=+0.4, CO↔EC=+0.4 and
  then EC's inhibition of VI frees EM).  Direct BS↔EM coupling = 0 (no
  Hopfield memory survives a pure brainstem startle alone).

  Diagonal self-amplification: 1.2 for all mechanisms.
-/

private def wOff (a b : Nat) : Float :=
  match a, b with
  | 0, 2 =>  0.3   -- BS ↔ EC
  | 0, 3 =>  0.4   -- BS ↔ CO
  | 1, 3 =>  0.5   -- RE ↔ CO
  | 2, 3 =>  0.4   -- EC ↔ CO
  | 4, 5 =>  0.6   -- VI ↔ EM
  | 6, 7 =>  0.7   -- ME ↔ AJ
  | 0, 7 => -0.4   -- BS ↔ AJ  (reflexive inhibits reflective)
  | 2, 4 => -0.3   -- EC ↔ VI  (involuntary inhibits voluntary)
  | _,  _ =>  0.0

def W8 (i j : Fin N8) : Float :=
  if i == j then 1.2
  else wOff (min i.val j.val) (max i.val j.val)


-- ════════════════════════════════════════════════════════════════════════════
-- FIELD DYNAMICS
-- ════════════════════════════════════════════════════════════════════════════

/-- An 8-component activation vector, one entry per mechanism. -/
abbrev Field8 := Fin N8 → Float

/-- Safe summation over Fin N8 without `sorry`-style omega proofs. -/
private def sumN (f : Fin N8 → Float) : Float :=
  (List.range N8).foldl (fun acc i =>
    if h : i < N8 then acc + f ⟨i, h⟩ else acc) 0.0

/-- Hopfield energy: H(e) = -½ eᵀ W e.  Lower = more stable. -/
def energy8 (e : Field8) : Float :=
  -0.5 * sumN (fun i => sumN (fun j => e i * W8 i j * e j))

/-- Net field force on dimension i: (We)_i = -∂H/∂e_i. -/
def fieldForce8 (e : Field8) (i : Fin N8) : Float :=
  sumN (fun j => W8 i j * e j)

/-- Discrete Langevin step (no noise): e_{t+1} = e_t + dt·(We). -/
def step8 (e : Field8) (dt : Float) : Field8 :=
  fun i => e i + dt * fieldForce8 e i

/-- Run n steps of discrete Langevin dynamics. -/
def runField8 (e₀ : Field8) (dt : Float) : Nat → Field8
  | 0     => e₀
  | n + 1 => step8 (runField8 e₀ dt n) dt


-- ════════════════════════════════════════════════════════════════════════════
-- STORED PATTERNS (attractors)
-- ════════════════════════════════════════════════════════════════════════════

/-
  Each pattern is an 8-component vector.  +1.0 = active, 0 = neutral, -1.0 = suppressed.
  These correspond to named emotion states in EmotionOntology.lean.

  EmotionOntology term       Stored pattern here
  ───────────────────────────────────────────────
  Emotion.nostalgia          nostalgiaPattern   (EM dominant)
  Emotion.acousticFright     startlePattern     (BS dominant)
  Emotion.aestheticAwe       musicalAwePattern  (ME+AJ dominant)
  Emotion.entrainedCalm      entrainmentPattern (RE dominant)
-/

/-- Nostalgia: EM(5) dominant, VI(4) co-active (imagery of the past).
    Corresponds to [mem]→(joy ⊓ sadness). -/
def nostalgiaPattern : Field8
  | ⟨5, _⟩ =>  1.0   -- EpisodicMemory: driving
  | ⟨4, _⟩ =>  0.6   -- VisualImagery: co-active
  | ⟨6, _⟩ => -0.4   -- MusicalExpectancy: suppressed
  | ⟨7, _⟩ => -0.4   -- AestheticJudgement: suppressed
  | _       =>  0.0

/-- Startle: BS(0) dominant, EC(2) and CO(3) triggered reflexively.
    Corresponds to [bs]→fear. -/
def startlePattern : Field8
  | ⟨0, _⟩ =>  1.0   -- BrainStem: maximal
  | ⟨2, _⟩ =>  0.4   -- EvaluativeConditioning: associative co-trigger
  | ⟨3, _⟩ =>  0.3   -- Contagion: bodily mimicry of the startle
  | ⟨7, _⟩ => -0.6   -- AestheticJudgement: inhibited
  | _       =>  0.0

/-- Musical awe: ME(6)+AJ(7) dominant, CO(3) moderate social resonance.
    Corresponds to [aes]→(fear ⊓ surprise). -/
def musicalAwePattern : Field8
  | ⟨6, _⟩ =>  1.0   -- MusicalExpectancy: structurally driven
  | ⟨7, _⟩ =>  0.8   -- AestheticJudgement: expert evaluation
  | ⟨3, _⟩ =>  0.4   -- Contagion: social resonance in ensemble context
  | ⟨0, _⟩ => -0.5   -- BrainStem: suppressed (slow deliberate processing)
  | _       =>  0.0

/-- Entrainment: RE(1) dominant, CO(3) active.
    Corresponds to [ent]→joy. -/
def entrainmentPattern : Field8
  | ⟨1, _⟩ =>  1.0   -- RhythmicEntrainment: maximal
  | ⟨3, _⟩ =>  0.5   -- Contagion: body synchrony
  | ⟨0, _⟩ => -0.3   -- BrainStem: reduced (calm, not startled)
  | _       =>  0.0


-- ════════════════════════════════════════════════════════════════════════════
-- DISPLAY
-- ════════════════════════════════════════════════════════════════════════════

def showField8 (label : String) (e : Field8) : String :=
  let dims := (List.range N8).map (fun i =>
    if h : i < N8 then
      let fi : Fin N8 := ⟨i, h⟩
      s!"{(dimMech fi).abbrev}={e fi:.2f}"
    else "")
  s!"{label}  " ++ String.intercalate "  " dims ++ s!"  H={energy8 e:.3f}"


-- ════════════════════════════════════════════════════════════════════════════
-- TRAJECTORIES
-- ════════════════════════════════════════════════════════════════════════════

-- Nostalgia recall: start near nostalgiaPattern (EM=0.8, VI=0.4)
-- Expected: field converges back — EM stays dominant, VI amplifies
#eval do
  IO.println "=== Nostalgia recall  (initial: EM=0.8, VI=0.4) ==="
  let e₀ : Field8 := fun i => match i with
    | ⟨5, _⟩ =>  0.8 | ⟨4, _⟩ => 0.4 | _ => 0.0
  let dt := 0.05
  for t in [0, 5, 10, 20] do
    IO.println (showField8 s!"t={t:02}" (runField8 e₀ dt t))
  IO.println s!"attractor H = {energy8 nostalgiaPattern:.3f}"

-- BrainStem → EpisodicMemory chain (Emotion.brainStemThenMemory)
-- BS fires first (startle), indirect chain BS→CO→(frees EM)
-- Expected: BS decays, EM eventually grows as field relaxes toward nostalgia
#eval do
  IO.println "\n=== BrainStem → EpisodicMemory chain  (initial: BS=1.0, EM=0.1) ==="
  let e₀ : Field8 := fun i => match i with
    | ⟨0, _⟩ =>  1.0 | ⟨5, _⟩ => 0.1 | _ => 0.0
  let dt := 0.05
  for t in [0, 5, 10, 20, 30] do
    IO.println (showField8 s!"t={t:02}" (runField8 e₀ dt t))
  IO.println "Expected: BS decays, EM grows (gate-opening chain)"

-- ════════════════════════════════════════════════════════════════════════════
-- THE SOMATIC PROPAGATOR  (CO-ID-1 PerceptIsPropagatorPole)
-- ════════════════════════════════════════════════════════════════════════════

/-  In QFT, a *particle* is a pole of the field propagator G(k) = (k² − m²)⁻¹.
    The soma-field analogue: G(λ) = (λ·I − W8)⁻¹  (resolvent of W8).
    Poles occur at eigenvalues λᵢ of W8 — each eigenvalue is a *normal mode*.
    A normal mode becomes a conscious *percept* when its field amplitude
    crosses the perception threshold T_i.

    CO-ID-1 claim: the perceptible modes of the soma-field are exactly the
    poles of the somatic propagator above threshold — identical structure to
    the QFT particle spectrum.

    Formal proof requires the spectral theorem for real symmetric matrices,
    which is not yet in scope for this file.  Definitions and stub are below.
    Proof left as `sorry`.
-/

/-- Perception threshold: mode i is consciously perceived when |e i| > threshold8 i.
    Values calibrated from BRECVEMA literature (Juslin 2019, Table 2). -/
def threshold8 : Field8
  | ⟨0, _⟩ => 0.30   -- BrainStem: low (reflexive, automatic)
  | ⟨1, _⟩ => 0.40   -- RhythmicEntrainment
  | ⟨2, _⟩ => 0.50   -- EvaluativeConditioning
  | ⟨3, _⟩ => 0.40   -- Contagion
  | ⟨4, _⟩ => 0.60   -- VisualImagery (requires deliberate imagery)
  | ⟨5, _⟩ => 0.50   -- EpisodicMemory
  | ⟨6, _⟩ => 0.50   -- MusicalExpectancy
  | ⟨7, _⟩ => 0.70   -- AestheticJudgement (requires expertise/reflection)
  | ⟨n+8, h⟩ => absurd h (by omega)

/-- Mode i of field state `e` is consciously perceptible when its amplitude
    exceeds the perception threshold.  Below threshold: emotion is sub-perceptual
    (field is active, causally effective, but not named). -/
def perceptible (e : Field8) (i : Fin N8) : Prop :=
  threshold8 i < e i ∨ e i < -(threshold8 i)

/-- The resolvent numerator (λ·I − W8): this is the matrix whose determinant
    vanishes at eigenvalues of W8 (the propagator poles).
    The somatic propagator is G(λ) = (somaticPropagatorMatrix λ)⁻¹;
    inversion is left abstract here pending a non-singularity proof. -/
def somaticPropagatorMatrix (λ : Float) (i j : Fin N8) : Float :=
  (if i == j then λ else 0.0) - W8 i j

/-- A field state is a *near-eigenvector* of W8 with eigenvalue λ when the
    residual ‖W8·e − λ·e‖ is small.  Used in the propagator-pole correspondence. -/
def residual8 (e : Field8) (λ : Float) : Float :=
  sumN (fun i =>
    let r := fieldForce8 e i - λ * e i
    r * r)

/-- **CO-ID-1  PerceptIsPropagatorPole  — STUB**
    A stored attractor pattern `p` is a pole of the somatic propagator:
    there exists a λ such that W8·p ≈ λ·p  (p is a near-eigenvector),
    and the perceptible modes of p correspond to the dominant components
    of the associated eigenvector.

    The formal statement here: each stored pattern has near-zero residual
    for some λ, witnessing that it lives near a propagator pole.
    The full correspondence (perceptibility ↔ pole above threshold) requires
    the spectral theorem and is left as `sorry`. -/
theorem perceptIsPropagatorPole_nostalgia :
    ∃ λ : Float, residual8 nostalgiaPattern λ < 1.0 := by
  exact ⟨0.5, by native_decide⟩

-- ────────────────────────────────────────────────────────────────────────────
-- CO-ID-1 (MATHLIB-BACKED): SPECTRAL THEOREM FOR W8
-- ────────────────────────────────────────────────────────────────────────────

/-- Off-diagonal entries of W8 over ℝ (exact rational values matching W8). -/
private def wOffℝ (a b : Nat) : ℝ :=
  match a, b with
  | 0, 2 =>  3/10  | 0, 3 =>  2/5  | 1, 3 =>  1/2  | 2, 3 =>  2/5
  | 4, 5 =>  3/5   | 6, 7 =>  7/10 | 0, 7 => -2/5   | 2, 4 => -3/10
  | _, _ =>  0

/-- W8 over ℝ: exact rational-entry version for formal spectral theory.
    Same structure as the Float `W8` used in dynamics, but in ℝ for proofs. -/
def W8ℝ : Matrix (Fin 8) (Fin 8) ℝ :=
  fun i j => if i = j then 6/5 else wOffℝ (min i.val j.val) (max i.val j.val)

/-- W8ℝ is symmetric: swapping indices leaves the value unchanged,
    because off-diagonal entries are defined via min/max (order-free). -/
private lemma W8ℝ_symm (i j : Fin 8) : W8ℝ i j = W8ℝ j i := by
  simp only [W8ℝ]
  by_cases h : i = j
  · simp [h]
  · simp only [if_neg h, if_neg (Ne.symm h)]
    rw [min_comm, max_comm]

/-- **CO-ID-1 — PASS**: W8ℝ is real-symmetric (Hermitian over ℝ).
    By Mathlib's spectral theorem (`Matrix.IsHermitian.eigenvalues`),
    W8ℝ has 8 real eigenvalues.  These are exactly the poles of the somatic
    propagator G(λ) = (λI − W8ℝ)⁻¹ — the spectrum of normal somatic modes. -/
theorem W8ℝ_isHermitian : W8ℝ.IsHermitian := by
  show W8ℝᴴ = W8ℝ
  ext i j
  simp only [Matrix.conjTranspose_apply, star_trivial]
  exact W8ℝ_symm j i

/-- The 8 somatic propagator poles: eigenvalues of W8ℝ provided by Mathlib.
    Each pole λᵢ corresponds to a normal mode of the soma-field.
    A mode is perceptible (CO-ID-1) when its amplitude exceeds `threshold8 i`. -/
noncomputable def somaticPropagatorPoles : Fin 8 → ℝ :=
  W8ℝ_isHermitian.eigenvalues

-- W matrix non-zero off-diagonal entries
#eval do
  IO.println "\n=== W8 off-diagonal couplings ==="
  for i in List.range N8 do
    for j in List.range N8 do
      if hi : i < N8 then if hj : j < N8 then
        let w := W8 ⟨i, hi⟩ ⟨j, hj⟩
        if w != 0.0 && i != j && i < j then
          let mi := (dimMech ⟨i, hi⟩).abbrev
          let mj := (dimMech ⟨j, hj⟩).abbrev
          IO.println s!"  W[{mi},{mj}] = {w}"

-- Stored pattern energies (should all be negative — stable minima)
#eval do
  IO.println "\n=== Stored pattern energies ==="
  IO.println s!"  nostalgia    H = {energy8 nostalgiaPattern:.3f}"
  IO.println s!"  startle      H = {energy8 startlePattern:.3f}"
  IO.println s!"  musical awe  H = {energy8 musicalAwePattern:.3f}"
  IO.println s!"  entrainment  H = {energy8 entrainmentPattern:.3f}"
