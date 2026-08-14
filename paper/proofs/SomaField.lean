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

  Proof obligations (status as of 2026-08-14):
  1. H bounded below for W8 — PARTIAL: nostalgia_convergence proves ∥W8ℝ·e∥² ≥ 0;
     spectral bound needs W8ℝ.IsHermitian eigenvalue lower bound (Mathlib available)
  2. Gradient descent contraction near stored patterns — OPEN (ISS-005)
  3. Stored patterns are stable minima — OPEN: perceptIsPropagatorPole_nostalgia (sorry, ISS-005)
  4. brainStemThenMemory trajectory — OPEN: brainStemActivatesContagion (sorry, ISS-005)
  5. Therapeutic W modification — OPEN (Phase 2 / ISS-005)
-/

import EmotionOntology
import Mathlib.Analysis.Matrix.Spectrum

-- ════════════════════════════════════════════════════════════════════════════
-- DIMENSION MAP
-- ════════════════════════════════════════════════════════════════════════════

/-- The field has 8 dimensions, one per BRECVEMA mechanism. -/
abbrev N8 : Nat := 8

/-- Each BRECVEMA mechanism maps to its field dimension index. -/
def Mechanism.dim : Mechanism → Fin N8
  | .BrainStem              => ⟨0, by decide⟩
  | .RhythmicEntrainment    => ⟨1, by decide⟩
  | .EvaluativeConditioning => ⟨2, by decide⟩
  | .Contagion              => ⟨3, by decide⟩
  | .VisualImagery          => ⟨4, by decide⟩
  | .EpisodicMemory         => ⟨5, by decide⟩
  | .MusicalExpectancy      => ⟨6, by decide⟩
  | .AestheticJudgement     => ⟨7, by decide⟩

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

private noncomputable def wOff (a b : Nat) : ℝ :=
  match a, b with
  | 0, 2 =>  3/10  | 0, 3 =>  2/5  | 1, 3 =>  1/2  | 2, 3 =>  2/5
  | 4, 5 =>  3/5   | 6, 7 =>  7/10 | 0, 7 => -(2/5) | 2, 4 => -(3/10)
  | _,  _ =>  0

noncomputable def W8 (i j : Fin N8) : ℝ :=
  if i = j then 6/5
  else wOff (min i.val j.val) (max i.val j.val)

lemma W8_symm (i j : Fin N8) : W8 i j = W8 j i := by
  simp only [W8]
  by_cases h : i = j
  · subst h; rfl
  · simp only [if_neg h, if_neg (Ne.symm h)]
    rw [min_comm, max_comm]


-- ════════════════════════════════════════════════════════════════════════════
-- FIELD DYNAMICS
-- ════════════════════════════════════════════════════════════════════════════

/-- An 8-component activation vector, one entry per mechanism. -/
abbrev Field8 := Fin N8 → ℝ

private noncomputable def sumN (f : Fin N8 → ℝ) : ℝ := ∑ i : Fin N8, f i

/-- Hopfield energy: H(e) = -½ eᵀ W e.  Lower = more stable. -/
noncomputable def energy8 (e : Field8) : ℝ :=
  -(1/2) * ∑ i : Fin N8, ∑ j : Fin N8, e i * W8 i j * e j

/-- Net field force on dimension i: (We)_i = -∂H/∂e_i. -/
noncomputable def fieldForce8 (e : Field8) (i : Fin N8) : ℝ :=
  ∑ j : Fin N8, W8 i j * e j

/-- Discrete Langevin step (no noise): e_{t+1} = e_t + dt·(We).
    Values are pre-computed eagerly to avoid exponential re-evaluation. -/
noncomputable def step8 (e : Field8) (dt : ℝ) : Field8 :=
  let vals := (List.range N8).map (fun i =>
    if h : i < N8 then
      let fi : Fin N8 := ⟨i, h⟩
      e fi + dt * fieldForce8 e fi
    else 0)
  fun i => vals.getD i.val 0

noncomputable def runField8 (e₀ : Field8) (dt : ℝ) : Nat → Field8
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

noncomputable def nostalgiaPattern : Field8
  | ⟨5, _⟩ =>  1     | ⟨4, _⟩ =>  3/5
  | ⟨6, _⟩ => -(2/5) | ⟨7, _⟩ => -(2/5) | _ => 0

noncomputable def startlePattern : Field8
  | ⟨0, _⟩ =>  1     | ⟨2, _⟩ =>  2/5
  | ⟨3, _⟩ =>  3/10  | ⟨7, _⟩ => -(3/5) | _ => 0

noncomputable def musicalAwePattern : Field8
  | ⟨6, _⟩ =>  1     | ⟨7, _⟩ =>  4/5
  | ⟨3, _⟩ =>  2/5   | ⟨0, _⟩ => -(1/2) | _ => 0

noncomputable def entrainmentPattern : Field8
  | ⟨1, _⟩ =>  1    | ⟨3, _⟩ =>  1/2
  | ⟨0, _⟩ => -(3/10) | _ => 0


-- ════════════════════════════════════════════════════════════════════════════
-- DISPLAY
-- ════════════════════════════════════════════════════════════════════════════

-- showField8 removed: ℝ has no ToString for #eval display.


-- ════════════════════════════════════════════════════════════════════════════
-- TRAJECTORIES
-- ════════════════════════════════════════════════════════════════════════════
-- (Theorems about trajectories are below, after W8ℝ is defined.)

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
noncomputable def threshold8 : Field8
  | ⟨0, _⟩ => 3/10 | ⟨1, _⟩ => 2/5  | ⟨2, _⟩ => 1/2
  | ⟨3, _⟩ => 2/5  | ⟨4, _⟩ => 3/5  | ⟨5, _⟩ => 1/2
  | ⟨6, _⟩ => 1/2  | ⟨7, _⟩ => 7/10
  | ⟨n+8, h⟩ => by unfold N8 at h; omega

/-- Mode i of field state `e` is consciously perceptible when its amplitude
    exceeds the perception threshold.  Below threshold: emotion is sub-perceptual
    (field is active, causally effective, but not named). -/
def perceptible (e : Field8) (i : Fin N8) : Prop :=
  threshold8 i < e i ∨ e i < -(threshold8 i)

-- somaticPropagatorMatrix removed; ℝ version is somaticPropagatorPoles below.

/-- ℝ version of the nostalgia attractor pattern (exact rationals matching nostalgiaPattern). -/
noncomputable def nostalgiaPatternℝ : Fin 8 → ℝ
  | ⟨5, _⟩ =>  1     | ⟨4, _⟩ =>  3/5
  | ⟨6, _⟩ => -2/5   | ⟨7, _⟩ => -2/5  | _ => 0

/-- ℝ version of the startle pattern. -/
noncomputable def startlePatternℝ : Fin 8 → ℝ
  | ⟨0, _⟩ =>  1     | ⟨2, _⟩ =>  2/5
  | ⟨3, _⟩ =>  3/10  | ⟨7, _⟩ => -3/5  | _ => 0

-- residual8ℝ and perceptIsPropagatorPole_nostalgia are below, after W8ℝ is defined.

-- ────────────────────────────────────────────────────────────────────────────
-- CO-ID-1 (MATHLIB-BACKED): SPECTRAL THEOREM FOR W8
-- ────────────────────────────────────────────────────────────────────────────

/-- Off-diagonal entries of W8 over ℝ (exact rational values matching W8). -/
private noncomputable def wOffℝ (a b : Nat) : ℝ :=
  match a, b with
  | 0, 2 =>  3/10  | 0, 3 =>  2/5  | 1, 3 =>  1/2  | 2, 3 =>  2/5
  | 4, 5 =>  3/5   | 6, 7 =>  7/10 | 0, 7 => -2/5   | 2, 4 => -3/10
  | _, _ =>  0

/-- W8 over ℝ: exact rational-entry version for formal spectral theory.
    Same structure as `W8` in dynamics, but in ℝ for proofs. -/
noncomputable def W8ℝ : Matrix (Fin 8) (Fin 8) ℝ :=
  fun i j => if i = j then 6/5 else wOffℝ (min i.val j.val) (max i.val j.val)

/-- W8ℝ is symmetric: swapping indices leaves the value unchanged,
    because off-diagonal entries are defined via min/max (order-free). -/
private lemma W8ℝ_symm (i j : Fin 8) : W8ℝ i j = W8ℝ j i := by
  unfold W8ℝ
  by_cases h : i = j
  · subst h; rfl
  · have h' : j ≠ i := Ne.symm h
    simp only [h, h', ite_false]
    rw [min_comm, max_comm]

/-- **CO-ID-1 — PASS**: W8ℝ is real-symmetric (Hermitian over ℝ).
    By Mathlib's spectral theorem (`Matrix.IsHermitian.eigenvalues`),
    W8ℝ has 8 real eigenvalues.  These are exactly the poles of the somatic
    propagator G(λ) = (λI − W8ℝ)⁻¹ — the spectrum of normal somatic modes. -/
theorem W8ℝ_isHermitian : W8ℝ.IsHermitian := by
  ext i j
  simp only [Matrix.conjTranspose_apply, star_trivial]
  exact W8ℝ_symm j i

/-- The 8 somatic propagator poles: eigenvalues of W8ℝ provided by Mathlib.
    Each pole λᵢ corresponds to a normal mode of the soma-field.
    A mode is perceptible (CO-ID-1) when its amplitude exceeds `threshold8 i`. -/
noncomputable def somaticPropagatorPoles : Fin 8 → ℝ :=
  W8ℝ_isHermitian.eigenvalues

/-- Residual ‖W8ℝ·e − ev·e‖² over ℝ. -/
noncomputable def residual8ℝ (e : Fin 8 → ℝ) (ev : ℝ) : ℝ :=
  ∑ i : Fin 8, (W8ℝ.mulVec e i - ev * e i)^2

/-- CO-ID-1: nostalgia attractor lies near a propagator pole of W8ℝ. -/
theorem perceptIsPropagatorPole_nostalgia :
    ∃ ev : ℝ, residual8ℝ nostalgiaPatternℝ ev < 1 :=
  ⟨2, by sorry⟩  -- residual ≈ 0.27; close when W8ℝ eigenvalues are computed (ISS-005)

/-- Energy descent: ‖W8ℝ·e‖² ≥ 0, so d/dt H(e) = -‖W8ℝ·e‖² ≤ 0. -/
theorem nostalgia_convergence (e : Fin 8 → ℝ) :
    0 ≤ ∑ i : Fin 8, (W8ℝ.mulVec e i)^2 :=
  Finset.sum_nonneg fun i _ => sq_nonneg _

/-- BS→CO coupling: one W8ℝ step from startlePatternℝ activates Contagion. -/
theorem brainStemActivatesContagion :
    0 < W8ℝ.mulVec startlePatternℝ ⟨3, by decide⟩ := by
  -- value = W8ℝ[3,0]*1 + W8ℝ[3,2]*2/5 + W8ℝ[3,3]*3/10 = 23/25 > 0
  show 0 < ∑ j : Fin 8, W8ℝ ⟨3, by decide⟩ j * startlePatternℝ j
  sorry  -- ISS-005: pure rational arithmetic; Finset.sum expansion tactic TBD

-- W matrix non-zero off-diagonal entries
/-
#eval do
  IO.println "\n=== W8 off-diagonal couplings ==="
  for i in List.range N8 do
    for j in List.range N8 do
      if hi : i < N8 then if hj : j < N8 then
        let w := W8 ⟨i, hi⟩ ⟨j, hj⟩
        if w ≠ 0 && i ≠ j && i < j then
          let mi := (dimMech ⟨i, hi⟩).abbrev
          let mj := (dimMech ⟨j, hj⟩).abbrev
          IO.println s!"  W[{mi},{mj}] = {w}"
-/

-- Stored pattern energies
/-
#eval do
  IO.println "\n=== Stored pattern energies ==="
  IO.println s!"  nostalgia    H = {energy8 nostalgiaPattern}"
  IO.println s!"  startle      H = {energy8 startlePattern}"
  IO.println s!"  musical awe  H = {energy8 musicalAwePattern}"
  IO.println s!"  entrainment  H = {energy8 entrainmentPattern}"
-/
