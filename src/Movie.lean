/-
  Movie.lean — The Abstract Movie: Lean High-Level API
  "The movie is the proof."

  This file IS the specification of The Tensor / the abstract film.
  It does not describe what to build. It IS the top level of what to build.

  Architecture:
  ┌─────────────────────────────────────────────────────────────────────┐
  │  Lean Server  (this file)                                           │
  │  ├── MovieMode         — the 8 primary emotional modes             │
  │  ├── CouplingMatrix    — W* for the score                          │
  │  ├── ThresholdEvent    — instanton declaration                     │
  │  ├── EmotionScore      — complete abstract film definition         │
  │  ├── ControlKnobs      — κ: depth, velocity, resonance, texture…  │
  │  ├── RenderFrame       — per-tick data package sent to renderers   │
  │  ├── Renderer (class)  — typeclass; any backend can implement it   │
  │  ├── serverLoop        — 50 Hz IO loop                             │
  │  └── theRiverFilm      — The River Film encoded as Lean data       │
  └─────────────────────────────────────────────────────────────────────┘
           │ stdout (JSON lines)
           ▼
  ┌─────────────────────────────────────────────────────────────────────┐
  │  Python Bridge  (instrument/field_render.py)                        │
  │  ├── AudioRenderer   — Ableton Live via OSC / MIDI                 │
  │  └── VisualRenderer  — Mandelbulb renderer via OSC                 │
  └─────────────────────────────────────────────────────────────────────┘

  Finding problems is the goal.
  Gaps are marked GAP-MOVIE-n and carried forward to FieldAxioms.lean.
-/


-- ════════════════════════════════════════════════════════════════════════════
-- §1  MODE VOCABULARY
--     The clinical mode space of the abstract film.
--     Distinct from the BRECVEMA mechanism space in SomaField.lean —
--     these are the *attractor labels* visible to the rendering layer.
-- ════════════════════════════════════════════════════════════════════════════

/-- The eight primary emotional modes of the abstract film.
    Each corresponds to a named axis of the emotional score e*(t).
    Index order matches the keyframe arrays below. -/
inductive MovieMode : Type
  | Safety    -- regulated, grounded, ventral vagal tone         (dim 0)
  | Fear      -- threat activation, mobilisation                 (dim 1)
  | Curiosity -- approach, exploration, openness                 (dim 2)
  | Awe       -- threshold-adjacent wonder; self-boundary dissolves (dim 3)
  | Grief     -- loss, withdrawal, parasympathetic collapse      (dim 4)
  | Language  -- symbolic, conceptual, narrative organisation    (dim 5)
  | Preverbal -- oldest, most diffuse, somatic; deepest attractor (dim 6)
  | Shame     -- social evaluation, self-concealment             (dim 7)
  deriving DecidableEq, Repr

def MovieMode.dim : MovieMode → Fin 8
  | .Safety    => ⟨0, by omega⟩
  | .Fear      => ⟨1, by omega⟩
  | .Curiosity => ⟨2, by omega⟩
  | .Awe       => ⟨3, by omega⟩
  | .Grief     => ⟨4, by omega⟩
  | .Language  => ⟨5, by omega⟩
  | .Preverbal => ⟨6, by omega⟩
  | .Shame     => ⟨7, by omega⟩

def MovieMode.name : MovieMode → String
  | .Safety    => "Safety"
  | .Fear      => "Fear"
  | .Curiosity => "Curiosity"
  | .Awe       => "Awe"
  | .Grief     => "Grief"
  | .Language  => "Language"
  | .Preverbal => "Preverbal"
  | .Shame     => "Shame"

def allModes : Array MovieMode :=
  #[.Safety, .Fear, .Curiosity, .Awe, .Grief, .Language, .Preverbal, .Shame]


-- ════════════════════════════════════════════════════════════════════════════
-- §2  CONTROL KNOBS
--     The six κ parameters: the tuning dials of the rendering function.
--     Viewer, clinician, or runtime may adjust these.
-- ════════════════════════════════════════════════════════════════════════════

/-- The control parameter vector κ for a rendering session. -/
structure ControlKnobs where
  /-- κ_d ∈ [0,1]: how far instantons descend into the deep attractor.
      0 = shallow crossing; 1 = full instanton traversal -/
  depth         : Float
  /-- κ_v ∈ [0.1, 3]: story-time clock multiplier.
      < 1 = expanded / slower; > 1 = compressed -/
  velocity      : Float
  /-- κ_r ∈ [0,1]: weight of viewer biofeedback.
      0 = pure projection; 0.5 = co-regulation; 1 = mirror mode -/
  resonance     : Float
  /-- κ_t ∈ [0,1]: audio/visual granularity.
      0 = smooth/tonal; 1 = fully granular/fractal/noisy -/
  texture       : Float
  /-- κ_m: active mode mask. Modes not in this list are muted. -/
  modeMask      : Array MovieMode
  /-- κ_W ∈ [0.5, 2]: global scale on the coupling matrix W*.
      High values: more inter-mode entanglement. -/
  couplingScale : Float
  deriving Repr

/-- Default knobs for The River Film (as specified in the-tensor.md §II). -/
def ControlKnobs.riverDefault : ControlKnobs := {
  depth         := 0.70
  velocity      := 1.00
  resonance     := 0.00
  texture       := 0.40
  modeMask      := #[.Safety, .Fear, .Curiosity, .Awe, .Grief, .Language, .Preverbal]
  couplingScale := 1.00
}


-- ════════════════════════════════════════════════════════════════════════════
-- §3  COUPLING MATRIX
--     W* — the score's own mode-interaction structure.
--     Distinct from the viewer's W (which belongs to their soma-field).
-- ════════════════════════════════════════════════════════════════════════════

/-- A single directed coupling entry in the score's W* matrix.
    Note: 'from' and 'to' are reserved in Lean 4; using 'src'/'dst'. -/
structure Coupling where
  src    : MovieMode
  dst    : MovieMode
  weight : Float     -- positive = co-activation; negative = mutual inhibition
  deriving Repr

/-- The coupling matrix for The River Film.
    Grounded in the score dynamics (the-tensor.md §Appendix). -/
def riverCoupling : Array Coupling := #[
  { src := .Fear,     dst := .Awe,       weight :=  0.40 },  -- fear tips into awe near threshold
  { src := .Awe,      dst := .Grief,     weight :=  0.30 },  -- awe opens grief
  { src := .Language, dst := .Preverbal, weight := -0.60 },  -- language suppresses pre-verbal
  { src := .Preverbal,dst := .Language,  weight := -0.60 },  -- pre-verbal suppresses language
  { src := .Safety,   dst := .Fear,      weight := -0.50 },  -- safety inhibits fear
  { src := .Fear,     dst := .Safety,    weight := -0.50 }   -- fear inhibits safety
]


-- ════════════════════════════════════════════════════════════════════════════
-- §4  THRESHOLD EVENTS
--     Instantons — non-perturbative attractor transitions.
--     The rendering system holds at approach until the condition is met.
-- ════════════════════════════════════════════════════════════════════════════

/-- A threshold crossing event (instanton declaration).
    The crossing is not smooth — it is a topological transition.
    GAP-MOVIE-1: condition is a predicate on Float array; no Lean proof
    that the condition is consistent with the W* dynamics. -/
structure ThresholdEvent where
  /-- Canonical story-time at which the crossing is attempted. -/
  storyTime  : Float
  /-- Informal basin labels (for logging and diagnostics). -/
  fromBasin  : String
  toBasin    : String
  /-- The crossing condition: predicate on the current e*(t) vector.
      Indexed by MovieMode.dim. -/
  condition  : Array Float → Bool
  /-- Duration of the approach window. The system holds here. -/
  windowSize : Float
  /-- If true, waits for viewer biofeedback before crossing (κ_r > 0). -/
  holdUntilReady : Bool
  -- No 'deriving Repr': condition is a function type (Array Float → Bool)

/-- Threshold 1 of The River Film: fear → awe (t ≈ 0.52).
    Condition: Fear (dim 1) > 0.70 AND Awe (dim 3) rising. -/
def riverThreshold1 : ThresholdEvent := {
  storyTime      := 0.52
  fromBasin      := "descent / hypervigilance"
  toBasin        := "awe-onset"
  condition      := fun e =>
    let fear := e.getD 1 0.0
    let awe  := e.getD 3 0.0
    fear > 0.70 && awe > 0.30
  windowSize     := 0.04
  holdUntilReady := true
}

/-- Threshold 2 of The River Film: the encounter (t ≈ 0.74).
    Condition: Language (dim 5) < 0.10 AND Pre-verbal (dim 6) > 0.85. -/
def riverThreshold2 : ThresholdEvent := {
  storyTime      := 0.74
  fromBasin      := "awe-dominant / pre-verbal"
  toBasin        := "encounter / grief-open"
  condition      := fun e =>
    let lang := e.getD 5 1.0
    let pv   := e.getD 6 0.0
    lang < 0.10 && pv > 0.85
  windowSize     := 0.04
  holdUntilReady := true
}


-- ════════════════════════════════════════════════════════════════════════════
-- §5  EMOTION SCORE
--     The abstract film definition.  This IS the movie.
--     A trajectory through emotional field space: e*(t), t ∈ [0,1].
-- ════════════════════════════════════════════════════════════════════════════

/-- A single keyframe in the emotional score.
    e values are normalised to [0,1]; index = MovieMode.dim. -/
structure ScorePoint where
  t : Float        -- story-time ∈ [0,1]
  e : Array Float  -- 8 mode activations [Safety,Fear,Curiosity,Awe,Grief,Language,Preverbal,Shame]
  deriving Repr, Inhabited

/-- The complete abstract film definition.
    No 'deriving Repr': thresholds contains ThresholdEvent which has a function field. -/
structure EmotionScore where
  title      : String
  version    : String
  coupling   : Array Coupling
  keyframes  : Array ScorePoint
  thresholds : Array ThresholdEvent
  defaults   : ControlKnobs

/-- Linear interpolation of the score at story-time t.
    Returns the 8-dimensional activation vector e*(t). -/
def EmotionScore.eval (s : EmotionScore) (t : Float) : Array Float :=
  let pts := s.keyframes
  let n   := pts.size
  if n == 0 then Array.replicate 8 0.0
  else if n == 1 then (pts[0]!).e
  else
    -- Find last index i such that pts[i].t <= t (Id.run for-loop, no termination proof needed)
    let lo : Nat := Id.run do
      let mut best := 0
      for j in List.range (n - 1) do
        if (pts[j]!).t <= t then best := j
      pure best
    let p0 := pts[lo]!
    let p1 := pts[min (lo + 1) (n - 1)]!
    let dt := p1.t - p0.t
    if dt == 0.0 then p0.e
    else
      let α0 := (t - p0.t) / dt
      let α  := if α0 < 0.0 then 0.0 else if α0 > 1.0 then 1.0 else α0
      -- manual lerp to avoid zipWith argument-order ambiguity
      (Array.range 8).map (fun i =>
        (p0.e.getD i 0.0) + α * ((p1.e.getD i 0.0) - (p0.e.getD i 0.0)))

/-- Check whether the score is currently at a threshold approach window. -/
def EmotionScore.nearThreshold (s : EmotionScore) (t : Float) : Option ThresholdEvent :=
  s.thresholds.find? fun th =>
    t >= th.storyTime - th.windowSize && t <= th.storyTime + th.windowSize


-- ════════════════════════════════════════════════════════════════════════════
-- §6  THE RIVER FILM — encoded as Lean data
--     "The container is not the film. The score is the film."
-- ════════════════════════════════════════════════════════════════════════════
--
--  EMOTIONAL SCORE: THE RIVER FILM
--  Columns:   [Safety, Fear, Curiosity, Awe, Grief, Language, Preverbal, Shame]
--  Scale:     0.0 (silent) → 1.0 (full activation)
--
--         t     S     F     C     A     G     L     PV    Sh
--       0.00  0.90  0.10  0.30  0.10  0.10  0.90  0.10  0.00
--       0.10  0.80  0.10  0.50  0.10  0.10  0.90  0.10  0.00
--       0.20  0.70  0.20  0.70  0.10  0.10  0.80  0.10  0.00
--       0.30  0.50  0.30  0.80  0.20  0.10  0.70  0.20  0.00
--       0.40  0.30  0.50  0.70  0.30  0.20  0.50  0.30  0.00
--       0.50  0.20  0.70  0.50  0.40  0.30  0.30  0.50  0.00
--       ≠T1   0.52 (THRESHOLD 1)
--       0.60  0.10  0.40  0.30  0.60  0.40  0.10  0.70  0.00
--       0.70  0.10  0.20  0.20  0.90  0.50  0.05  0.90  0.00
--       ≠T2   0.74 (THRESHOLD 2)
--       0.80  0.20  0.10  0.30  0.70  0.60  0.20  0.60  0.00
--       0.90  0.50  0.10  0.50  0.40  0.40  0.60  0.20  0.00
--       1.00  0.90  0.10  0.50  0.20  0.20  0.90  0.10  0.00

def theRiverFilm : EmotionScore := {
  title    := "The River Film"
  version  := "0.1"
  coupling := riverCoupling
  keyframes := #[
    { t := 0.00, e := #[0.90, 0.10, 0.30, 0.10, 0.10, 0.90, 0.10, 0.00] },  -- Departure
    { t := 0.10, e := #[0.80, 0.10, 0.50, 0.10, 0.10, 0.90, 0.10, 0.00] },
    { t := 0.20, e := #[0.70, 0.20, 0.70, 0.10, 0.10, 0.80, 0.10, 0.00] },
    { t := 0.30, e := #[0.50, 0.30, 0.80, 0.20, 0.10, 0.70, 0.20, 0.00] },  -- Descent begins
    { t := 0.40, e := #[0.30, 0.50, 0.70, 0.30, 0.20, 0.50, 0.30, 0.00] },
    { t := 0.50, e := #[0.20, 0.70, 0.50, 0.40, 0.30, 0.30, 0.50, 0.00] },  -- Threshold approach
    -- THRESHOLD 1 at t=0.52: Fear>0.7, Awe rising → AWE onset
    { t := 0.60, e := #[0.10, 0.40, 0.30, 0.60, 0.40, 0.10, 0.70, 0.00] },  -- Deep River
    { t := 0.70, e := #[0.10, 0.20, 0.20, 0.90, 0.50, 0.05, 0.90, 0.00] },  -- Threshold approach
    -- THRESHOLD 2 at t=0.74: Language<0.1, Preverbal>0.85 → ENCOUNTER
    { t := 0.80, e := #[0.20, 0.10, 0.30, 0.70, 0.60, 0.20, 0.60, 0.00] },  -- Return begins
    { t := 0.90, e := #[0.50, 0.10, 0.50, 0.40, 0.40, 0.60, 0.20, 0.00] },  -- Return
    { t := 1.00, e := #[0.90, 0.10, 0.50, 0.20, 0.20, 0.90, 0.10, 0.00] }   -- Home (different basin)
  ]
  thresholds := #[riverThreshold1, riverThreshold2]
  defaults   := ControlKnobs.riverDefault
}


-- ════════════════════════════════════════════════════════════════════════════
-- §7  RENDER FRAME
--     The data package sent to every renderer at each 50 Hz tick.
-- ════════════════════════════════════════════════════════════════════════════

/-- Per-tick payload delivered to all renderers.
    GAP-MOVIE-2: viewerField is currently all-zeros (no biofeedback input).
    Requires: HRV input → field estimator → this field. -/
structure RenderFrame where
  /-- Current story-time cursor, t ∈ [0,1]. -/
  storyTime    : Float
  /-- e*(t) — the abstract score at this tick. -/
  score        : Array Float
  /-- e_V(t) — viewer's estimated soma-field (zeros if biofeedback unavailable). -/
  viewerField  : Array Float
  /-- Current control knob values. -/
  knobs        : ControlKnobs
  /-- Non-None if we are inside a threshold crossing window. -/
  atThreshold  : Option String
  /-- Tick counter (for logging / phase detection). -/
  tickCount    : Nat
  /-- Server tick rate in Hz. -/
  tickRate     : Nat
  deriving Repr


-- ════════════════════════════════════════════════════════════════════════════
-- §8  RENDERER TYPECLASS
--     Any backend that can consume a RenderFrame is a Renderer.
--     Lean farms the work to whatever instances are registered.
-- ════════════════════════════════════════════════════════════════════════════

/-- A `Renderer α` can process one RenderFrame per tick.
    Instances: StdoutRenderer (below), AudioRenderer, VisualRenderer (Python). -/
class Renderer (α : Type) where
  render : α → RenderFrame → IO Unit
  name   : α → String

/-- Utility: run a list of heterogeneous renderers on the same frame.
    GAP-MOVIE-3: heterogeneous list requires Sigma type; current impl is
    homogeneous — all renderers must share the same type α.
    For multi-backend, use: List (Σ α, [Renderer α] × α). -/
def renderAll {α : Type} [Renderer α] (rs : List α) (frame : RenderFrame) : IO Unit :=
  rs.forM (fun r => Renderer.render r frame)


-- ════════════════════════════════════════════════════════════════════════════
-- §9  STDOUT RENDERER (Python bridge)
--     Writes JSON lines to stdout; Python reads from stdin.
--     This is the Lean → Python handoff point.
-- ════════════════════════════════════════════════════════════════════════════

/-- The stdout renderer: serialises RenderFrame to JSON and prints to stdout.
    Python side: `instrument/field_render.py` reads from stdin line by line.
    GAP-MOVIE-4: no real JSON library — hand-rolled Float formatting.
    GAP-MOVIE-5: no acknowledgement / back-pressure from Python side. -/
structure StdoutRenderer where
  -- no configuration needed — writes to stdout

/-- Format a Float array as a JSON array string (2 decimal places). -/
private def formatVec (v : Array Float) : String :=
  let items := v.map (fun f =>
    -- truncate to 2dp without Printf dependency
    let scaled := (f * 100.0).toUInt32.toFloat / 100.0
    toString scaled)
  "[" ++ ",".intercalate items.toList ++ "]"

/-- Format the knobs as a compact JSON object. -/
private def formatKnobs (k : ControlKnobs) : String :=
  s!"\{\"d\":{k.depth},\"v\":{k.velocity},\"r\":{k.resonance},\"t\":{k.texture},\"W\":{k.couplingScale}}"

instance : Renderer StdoutRenderer where
  name _ := "StdoutRenderer"
  render _ frame := do
    let thresh := match frame.atThreshold with
      | none   => "null"
      | some s => s!"\"{s}\""
    let json := s!"\{\"t\":{frame.storyTime}," ++
                s!"\"e\":{formatVec frame.score}," ++
                s!"\"v\":{formatVec frame.viewerField}," ++
                s!"\"k\":{formatKnobs frame.knobs}," ++
                s!"\"threshold\":{thresh}," ++
                s!"\"tick\":{frame.tickCount}}"
    IO.println json


-- ════════════════════════════════════════════════════════════════════════════
-- §10  FIELD SERVER STATE
--      The mutable runtime state of the server loop.
-- ════════════════════════════════════════════════════════════════════════════

structure ServerState where
  currentT    : Float       -- story-time cursor, advances each tick
  viewerField : Array Float -- e_V(t); updated by biofeedback (GAP-MOVIE-2)
  paused      : Bool        -- true when holding at a threshold
  tickCount   : Nat
  deriving Repr

def ServerState.initial : ServerState := {
  currentT    := 0.0
  viewerField := Array.replicate 8 0.0
  paused      := false
  tickCount   := 0
}


-- ════════════════════════════════════════════════════════════════════════════
-- §11  SERVER LOOP
--      The 50 Hz IO loop. Lean is the orchestrator.
--      At each tick: evaluate score → build frame → dispatch to renderers.
-- ════════════════════════════════════════════════════════════════════════════

/-- Advance story-time by one tick.
    dt = (κ_v / tickRate).  At κ_v=1.0 and 50Hz, 1 story-unit = 50 ticks. -/
def dtPerTick (knobs : ControlKnobs) (tickRate : Nat) : Float :=
  knobs.velocity / tickRate.toFloat

/-- Run the server loop until t = 1.0.
    GAP-MOVIE-6: no stdin reader for biofeedback or remote control.
    GAP-MOVIE-7: threshold hold logic — currently advances even at threshold.
    GAP-MOVIE-8: IO.sleep precision on Windows is ~15ms; 50Hz is approximate. -/
def serverLoop {α : Type} [Renderer α]
    (score : EmotionScore) (knobs : ControlKnobs)
    (renderer : α) (tickRate : Nat := 50) : IO Unit := do
  let mut state := ServerState.initial
  let dt := dtPerTick knobs tickRate
  let sleepMs : UInt32 := (1000 / tickRate).toUInt32  -- ~20ms at 50Hz
  while state.currentT ≤ 1.0 do
    -- 1. Evaluate abstract score at current story-time
    let eScore := score.eval state.currentT
    -- 2. Check for threshold proximity
    let threshLabel := score.nearThreshold state.currentT |>.map (fun th => th.toBasin)
    -- 3. Build the render frame
    let frame : RenderFrame := {
      storyTime   := state.currentT
      score       := eScore
      viewerField := state.viewerField
      knobs       := knobs
      atThreshold := threshLabel
      tickCount   := state.tickCount
      tickRate    := tickRate
    }
    -- 4. Dispatch to renderer (Lean farms the work out here)
    Renderer.render renderer frame
    -- 5. Advance state
    IO.sleep sleepMs
    state := { state with
      currentT  := state.currentT + dt
      tickCount := state.tickCount + 1
    }
  IO.println ("{\"status\":\"complete\",\"ticks\":" ++ toString state.tickCount ++ "}")


-- ════════════════════════════════════════════════════════════════════════════
-- §12  QUICK CHECKS (evaluate without running the loop)
-- ════════════════════════════════════════════════════════════════════════════

-- Score at opening: Safety=0.9, Language=0.9, Fear=0.1 (grounded)
#eval theRiverFilm.eval 0.00

-- Score at threshold 1 approach: Fear≈0.7, Preverbal≈0.5 (threshold close)
#eval theRiverFilm.eval 0.50

-- Score at the encounter: Awe≈0.9, Preverbal≈0.9, Language≈0.05 (deepest)
#eval theRiverFilm.eval 0.72

-- Score at return / home: Safety back to 0.9, Language back, Grief lingers
#eval theRiverFilm.eval 1.00

-- Threshold detection at t=0.52
#eval theRiverFilm.nearThreshold 0.52 |>.map (·.toBasin)

-- T1 condition at t=0.72? Fear=0.2 < 0.7 → false
#eval riverThreshold1.condition (theRiverFilm.eval 0.72)

-- T2 condition at t=0.72? Language≈0.05, PV≈0.9 → true
#eval riverThreshold2.condition (theRiverFilm.eval 0.72)


-- ════════════════════════════════════════════════════════════════════════════
-- §13  GAPS — problems found by writing this file
-- ════════════════════════════════════════════════════════════════════════════
/-
  GAP-MOVIE-1  ThresholdEvent.condition has no proof of consistency with W*
               dynamics.  Could prove: "if coupling is correct, T1 condition
               is reachable from keyframe at t=0.50."

  GAP-MOVIE-2  viewerField is zero.  Needs: biofeedback reader (HRV → Float array).
               Python side: `instrument/field_render.py` must write e_V lines
               back to Lean's stdin.  Requires bidirectional pipe, not just stdout.

  GAP-MOVIE-3  renderAll is homogeneous.  Multi-backend dispatch (audio + visual
               simultaneously) needs: `List (RenderToken)` where RenderToken
               wraps a renderer + its state in a Sigma type.

  GAP-MOVIE-4  Float → String formatting is lossy (UInt32 truncation).
               Should use `Float.toString` or a proper Printf.

  GAP-MOVIE-5  No back-pressure from Python renderer.  If Python falls behind,
               Lean continues advancing story-time.  Need: ACK protocol on pipe.

  GAP-MOVIE-6  No stdin reader for live control (knob adjustment, pause, seek).
               Need: concurrent IO thread reading control messages from stdin
               while server loop runs.  Lean's IO monad is single-threaded by
               default.  Requires: Task / Async IO.

  GAP-MOVIE-7  Threshold hold logic is absent.  When atThreshold is Some,
               the loop currently advances dt anyway.  Must add:
               `if state.paused then IO.sleep sleepMs; continue`.
               Hold condition: `th.condition eScore` must be true before advance.

  GAP-MOVIE-8  IO.sleep on Windows has ~15ms granularity (WinMM timer).
               50Hz = 20ms target; actual rate ≈ 40–47 Hz.
               For audio sync: Python side should interpolate, not rely on Lean tick.

  GAP-MOVIE-9  No score validation: keyframe t values must be monotone in [0,1].
               Add: `def EmotionScore.isValid (s : EmotionScore) : Bool`

  GAP-MOVIE-10 theRiverFilm coupling matrix W* is not applied during eval.
               eval is pure linear interpolation between keyframes.
               For dynamic emergence (modes co-activating), need:
               `def EmotionScore.step (s : EmotionScore) (e : Array Float) : Array Float`
               — one Langevin step with W* applied, run per tick.
               This is the SomaField.lean update loop adapted to the score W*.
-/
