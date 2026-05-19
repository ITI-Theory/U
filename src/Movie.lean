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

/-- Validate score structure: t values monotone in [0,1], e ∈ [0,1]^8.
    GAP-MOVIE-9 resolved. -/
def EmotionScore.isValid (s : EmotionScore) : Bool :=
  let pts := s.keyframes
  let n   := pts.size
  if n == 0 then false
  else
    let tOk  := pts.all (fun p => p.t >= 0.0 && p.t <= 1.0)
    let eOk  := pts.all (fun p => p.e.size == 8 && p.e.all (fun v => v >= 0.0 && v <= 1.0))
    let mono := (List.range (n - 1)).all (fun i => (pts[i]!).t < (pts[i + 1]!).t)
    tOk && eOk && mono

/-- One W*-coupling step: apply the score's coupling matrix to e to get e_{t+dt}.
    This is the SomaField Langevin update adapted to the score W*.
    Use composited with EmotionScore.eval: base lerp + dynamic coupling nudge.
    GAP-MOVIE-10 resolved. -/
def EmotionScore.step (e : Array Float) (coupling : Array Coupling)
    (scale : Float) (dt : Float := 0.02) : Array Float :=
  -- Δe[i] = Σ_{j→i ∈ W*} scale · w_ji · e[j]
  let delta : Array Float := (Array.range 8).map (fun i =>
    coupling.foldl (fun acc c =>
      if c.dst.dim.val == i
      then acc + scale * c.weight * (e.getD c.src.dim.val 0.0)
      else acc) 0.0)
  -- Euler step, clamped to [0,1]
  (Array.range 8).map (fun i =>
    let v := (e.getD i 0.0) + dt * (delta.getD i 0.0)
    if v < 0.0 then 0.0 else if v > 1.0 then 1.0 else v)


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

/-- Extract the destination basin label from a threshold option.
    Defined outside serverLoop to avoid kernel elaboration issues
    with Option ThresholdEvent (which contains a function field). -/
private def threshLabel (th : Option ThresholdEvent) : Option String :=
  th.map (fun t => t.toBasin)

/-- Decide whether story-time may advance this tick.
    Returns false while inside a holdUntilReady window whose condition hasn't fired. -/
private def mayAdvance (nearTh : Option ThresholdEvent) (e : Array Float) : Bool :=
  nearTh.all (fun th => !th.holdUntilReady || th.condition e)

/-- Advance story-time by one tick.
    dt = (κ_v / tickRate).  At κ_v=1.0 and 50Hz, 1 story-unit = 50 ticks. -/
def dtPerTick (knobs : ControlKnobs) (tickRate : Nat) : Float :=
  knobs.velocity / tickRate.toFloat

/-- Run the server loop until t = 1.0.
    GAP-MOVIE-6: no stdin reader for biofeedback or remote control.
    GAP-MOVIE-7: RESOLVED — holds at threshold windows until condition fires.
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
    let nearTh := score.nearThreshold state.currentT
    let tLabel  := threshLabel nearTh
    -- 3. Build the render frame
    let frame : RenderFrame := {
      storyTime   := state.currentT
      score       := eScore
      viewerField := state.viewerField
      knobs       := knobs
      atThreshold := tLabel
      tickCount   := state.tickCount
      tickRate    := tickRate
    }
    -- 4. Dispatch to renderer (Lean farms the work out here)
    Renderer.render renderer frame
    -- 5. Threshold hold logic (GAP-MOVIE-7):
    --    If inside a window and holdUntilReady=true, wait for condition to fire.
    --    Only advance story-time when condition holds (or no threshold).
    let advance := mayAdvance nearTh eScore
    IO.sleep sleepMs
    state := { state with
      currentT  := if advance then state.currentT + dt else state.currentT
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

-- GAP-MOVIE-9 resolved: isValid should return true for a well-formed score
#eval theRiverFilm.isValid

-- GAP-MOVIE-10 resolved: one W* Langevin step from t=0.50 (Fear=0.7, Awe=0.4)
-- Fear→Awe coupling (+0.4) should nudge Awe up; Safety→Fear (-0.5) pulls Fear down
#eval EmotionScore.step (theRiverFilm.eval 0.50) riverCoupling 1.0 0.02


-- ════════════════════════════════════════════════════════════════════════════
-- §13  GAPS — remaining open items
-- ════════════════════════════════════════════════════════════════════════════
/-
  GAP-MOVIE-1  ThresholdEvent.condition has no proof of consistency with W*.
               Could prove: "if coupling is correct, T1 condition is reachable
               from keyframe at t=0.50."

  GAP-MOVIE-2  viewerField is zero.  Needs: HRV → Float array biofeedback.
               Python side: `instrument/field_render.py` must write e_V JSON
               back to Lean's stdin.  Requires bidirectional pipe.

  GAP-MOVIE-3  renderAll is homogeneous (all renderers must share type α).
               Multi-backend needs: `List (Σ α, [Renderer α] × α)` (Sigma type).

  GAP-MOVIE-4  Float → String formatting lossy (UInt64 truncation, 3dp).
               Use `Float.toString` when available in this Lean version.

  GAP-MOVIE-5  No back-pressure from Python renderer.  Lean advances freely
               if Python falls behind.  Need: ACK / heartbeat on pipe.

  GAP-MOVIE-6  No stdin reader for live control (knob adjustment, pause, seek).
               Requires concurrent IO: `IO.asTask` or `BaseIO.mapTask`.

  ✓ GAP-MOVIE-7  RESOLVED: threshold hold logic in serverLoop.
               `mayAdvance := th.condition eScore` — holds story-time
               until the crossing condition fires.

  GAP-MOVIE-8  IO.sleep ~15ms granularity on Windows (WinMM).
               Python side should interpolate between ticks for audio sync.

  ✓ GAP-MOVIE-9  RESOLVED: EmotionScore.isValid added.
               Checks: monotone t, all t ∈ [0,1], all e ∈ [0,1]^8.

  ✓ GAP-MOVIE-10 RESOLVED: EmotionScore.step added.
               One Langevin step with W* coupling (Euler, clamped to [0,1]).
               Compositing: `eval t |> step coupling scale dt`

  GAP-MOVIE-11 PENDING: Control Post bridge — no ControlMessage parser in
               serverLoop.  Types defined in §14.  Requires GAP-MOVIE-6.
-/


-- ════════════════════════════════════════════════════════════════════════════
-- §14  THE CONTROL POST — ControlMessage and ControlChannel
-- ════════════════════════════════════════════════════════════════════════════
--
-- "The control post" is the immersive operator interface for the abstract movie.
-- Three 3D wiremesh attractor-slice landscapes (H(eᵢ, eⱼ) Hopfield energy
-- surfaces) are rendered in TouchDesigner.  Each panel is an XY pad whose
-- two axes can be steered to any pair of the 8 emotional modes.  Operators
-- interact via OSC, which field_render.py / control_post.py forward to Lean
-- as JSON.  Lean interprets them as ControlMessage values.
--
-- Three default landscape panels — the triptych:
--   Panel 0: Safety vs Fear       (autonomic pole)
--   Panel 1: Awe vs Preverbal     (depth axis — transcendence)
--   Panel 2: Language vs Shame    (social/symbolic axis)
--
-- Each panel shows:
--   - 32×32 wireframe mesh of H(eᵢ, eⱼ; e_rest) — basins appear as valleys
--   - Gradient arrows at each grid point (∂H/∂eᵢ, ∂H/∂eⱼ)
--   - Trajectory marker: current e*(t) projected onto the (i,j) slice
--   - Attractor labels (toBasin of nearest ThresholdEvent)
-- ════════════════════════════════════════════════════════════════════════════

/-- A message from the Control Post to the Movie server.
    Sent as JSON on the pipe; parsed by serverLoop (GAP-MOVIE-6 + GAP-MOVIE-11). -/
inductive ControlMessage
  /-- Jump story-time to t ∈ [0,1].  Seeks instantly; does not hold at thresholds. -/
  | Seek              : Float → ControlMessage
  /-- Replace all ControlKnobs at once. -/
  | SetKnobs          : ControlKnobs → ControlMessage
  /-- Individual knob overrides — fine-grained panel faders. -/
  | SetDepth          : Float → ControlMessage
  | SetVelocity       : Float → ControlMessage
  | SetResonance      : Float → ControlMessage
  | SetTexture        : Float → ControlMessage
  | SetCouplingScale  : Float → ControlMessage
  /-- Steer a landscape panel's XY axes to a new mode pair.
      panel ∈ {0,1,2}; the XY pad control surface reconfigures live. -/
  | SetLandscapeAxes  : Fin 3 → MovieMode → MovieMode → ControlMessage
  /-- XY pad injection — directly override a mode's activation value.
      Overrides the score for this tick only; does not modify keyframes. -/
  | SetModeOverride   : MovieMode → Float → ControlMessage
  | Pause             : ControlMessage
  | Resume            : ControlMessage
  deriving Repr
-- Note: DecidableEq omitted — ControlMessage contains ControlKnobs whose Float
-- fields lack a Decidable Eq instance.

/-- Parse a JSON object from the control post into a ControlMessage.
    Returns none for unrecognised or malformed messages.
    GAP-MOVIE-11: currently a stub — full implementation requires GAP-MOVIE-6. -/
def ControlMessage.ofJson (_ : String) : Option ControlMessage := none
-- ^ stub: replace with proper JSON parser once GAP-MOVIE-6 (stdin reader) lands.
--   Expected keys: {"type":"Seek","t":0.5}  {"type":"Pause"}
--   {"type":"SetKnob","knob":"velocity","value":1.2}
--   {"type":"SetLandscapeAxes","panel":1,"xMode":"awe","yMode":"preverbal"}
--   {"type":"SetModeOverride","mode":"fear","value":0.3}

/-- The three default attractor-slice panels for the triptych control post.
    Each entry is (panel_id, xMode, yMode).
    Python control_post.py computes H(eᵢ,eⱼ;e_rest) on a 32×32 grid
    using the full vectorised W-weighted energy function. -/
def defaultLandscapePanels : Array (Fin 3 × MovieMode × MovieMode) := #[
  (⟨0, by omega⟩, MovieMode.Safety,   MovieMode.Fear),       -- autonomic pole
  (⟨1, by omega⟩, MovieMode.Awe,      MovieMode.Preverbal),  -- depth axis
  (⟨2, by omega⟩, MovieMode.Language, MovieMode.Shame),      -- social/symbolic
]

-- Quick checks for the control post types:
#eval ControlMessage.Seek 0.5
#eval ControlMessage.SetLandscapeAxes ⟨1, by omega⟩ MovieMode.Awe MovieMode.Preverbal
#eval defaultLandscapePanels.map (fun (_, xm, ym) => (xm.dim, ym.dim))
