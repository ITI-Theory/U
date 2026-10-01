# Soma Machine: Human Music-Affect MVP

## Product Purpose

The Soma Machine is the interactive, educational, visual-first return to the
programme's original requirement:

> Emotions have names, but their dynamics are unclear. Let a person alter a
> music-affect state and see the response of the field.

It is a non-medical research and education instrument. It does not diagnose,
prescribe, or claim that a visual response is a clinical measurement.

The existing `Soma Field Operator` scene is the technical visual component of
the Soma Machine. The `Field Atlas` is its long-form physical atlas. They are
complementary products using the same response grammar.

## Source Alignment

| Source | Role in the Soma Machine |
| --- | --- |
| `registry/levels/<id>.yaml` and `<id>.md` | Per-level data (substrate, field, equation, response time) and the Field Atlas entry text, shared by the app and the book. |
| `registry/levels/human-vertebrate.md` | Human level: soma field, attractor landscape, Langevin dynamics, music as a field probe. |
| `registry/examples/*.yaml` | Worked examples (4D / 8D / 11D steps) for the compare view and the Atlas. |
| `paper/soma/music-affect-dynamics/music-affect-dynamics.md` | Formal 16-component state, energy landscape, Langevin dynamics, BRECVEMA forcing, and future audio/visual mappings. |
| Lennie & Eerola (2022), CODA model | Sourced appraisal/context model: relevance, goals, meaning, and dynamic weighting of an emotional episode. |
| `Dist/PAPERS.yaml` | Publication identity, status, DOI, and distribution links. |

## Educational Sequence

The Machine teaches one selected system through three readings. The selected
system remains the same; the reading changes.

### 4D: Physics Today

Show the familiar physical substrate and accepted baseline model. At the human
scale this is the body, nervous system, acoustics, movement, and ordinary time.

The user first learns what is physically present and measurable. This is the
reference frame for all later interpretation.

### 8D: Response to a Disturbance

Show the same selected substrate as a causal response system. The universal
interaction is a declared impulse or forcing term $J(t)$:

$$
(\nabla^2 + k^2)G(x,x') = \delta(x-x')
$$

The visual teaching action is **poke**: introduce a disturbance, then show
propagation, damping, memory, coupling, and return toward an attractor.

At human scale, music acts as a structured forcing input. BRECVEMA mechanisms
modulate particular parameters of the affect dynamics rather than serving as
generic mood labels.

### 11D: Integration and Meaning

At the human scale, show the integrated organism: body, propagator, limbic
axis, cortex/matrix layer, threshold, and reportable percept.

At non-human scales, 11D may expose information organization and an optional
observer-side interpretive contour. It must not assert that a non-human system
has human occurrent emotion or cognition. Such a reading is labelled
`INTERPRETIVE / MIRROR`.

## Human Music-Affect MVP

The first complete interactive route is human music-affect. It is the initial
instrument, not a toy version of a future atlas.

### State

$$
\mathbf{e}(t) = (e_1^s,\ldots,e_8^s,e_1^c,\ldots,e_8^c) \in [0,1]^{16}
$$

The eight modes are calm, fight, flight, grief, freeze/dissociation,
hypervigilance, flow/absorption, and joy. The UI may initially expose compact
aggregate controls while retaining this state model as the future instrument
contract.

### Dynamics

$$
H(\mathbf{e}) = \tfrac12\mathbf{e}^\top W\mathbf{e} - \mathbf{b}^\top\mathbf{e}
$$

$$
\gamma\dot{\mathbf{e}} = -\nabla H(\mathbf{e}) + \sqrt{2D}\,\xi(t) + J(t)
$$

$$
T_\mathrm{eff} = D / \gamma
$$

The Machine renders these quantities as educational state, not clinical
measurement.

### BRECVEMA as Human-Scale Mechanism Lens

BRECVEMA is available only in the human music-affect route. Each selected
mechanism supplies a named forcing interpretation:

| Mechanism | Primary parameter / action |
| --- | --- |
| Brainstem reflex | transient source $J(t)$ |
| Rhythmic entrainment | damping and phase locking $\gamma$ |
| Evaluative conditioning | bias vector $\mathbf{b}$ |
| Emotional contagion | interpersonal coupling $\kappa$ |
| Visual imagery | endogenous source $J_\mathrm{internal}(t)$ |
| Episodic memory | memory kernel $K(\tau)$ |
| Musical expectancy | transient barrier $\Delta V$ |
| Aesthetic judgement | cognitive appraisal / bias update |

### Appraisal and Context

BRECVEMA answers which music-affect mechanisms may be active. It does not by
itself explain why the same music can produce different episodes for different
people, goals, histories, lyrics, or situations. The human route therefore adds
an optional sourced `APPRAISAL / CONTEXT` layer, informed by the CODA model.

The initial dimensions are novelty/familiarity, expectation, goal relevance,
goal conduciveness, coping potential, and agency. They are educational weighting
inputs, not diagnosis, psychological measurement, or a replacement for the
field-state model.

```text
music + BRECVEMA mechanism profile + appraisal/context
-> forcing and parameter weighting
-> response trajectory + meta-experiential report
```

### Body Map and 8x8 Field Grid

The human route renders a hardware-neutral $8\times8$ field grid. It is the
canonical spatial representation for the browser now and a future pad/controller
adapter later. Named body regions are views over grid cells; selected mechanisms
can stack their regional contributions.

```text
mechanisms + appraisal/context + field state
-> 8x8 region weights
-> body-map overlay + field response
-> future controller, OSC, audio, or projection mapping
```

The grid must distinguish sourced bodily-sensation evidence, USF field
interpretation, and artistic placement. Until the body-map literature audit is
complete, the current mechanism-to-region grid is visibly labelled `DESIGN MAP`.

## Initial Visual Contract

The web demo has no hardware dependency. It renders the field response using
the existing Three.js scene. Sound is optional and off by default (see Audio
Contract).

| Field quantity | Visual response | Future audio response |
| --- | --- | --- |
| $H(\mathbf{e})$ | intensity and colour-energy shift | filter cutoff and reverb scale |
| $\lVert\nabla H\rVert$ | spike/sharpness and motion density | rhythmic density / gate rate |
| $T_\mathrm{eff}$ | cloudiness, diffusion, particle spread | noise floor and stochastic modulation |
| $K(\tau)$ | persistence trails and decay duration | reverb tail / temporal persistence |
| threshold crossing | visible transition/pulse | note or scene trigger |
| nearest attractor | stable visual composition | future scene/track selection |

Textual contour is the first rendering interpreter. It states what the current
field condition is doing before the project adds audio, OSC, MIDI, or projection
hardware.

## Audio Contract

Author decision (2026-10-01): audio is in. The browser MVP plays optional,
off-by-default sound through Web Audio (`audio/field-audio.js`, `AUDIO: ON/OFF`
button). It has no hardware, MIDI, or OSC dependency; the live-instrument track
(controllers, SOmaFX guitar VST, Ableton/TouchDesigner, `apps/instrument/`
server) remains a later, separate track.

| Source | Sound | Field meaning |
| --- | --- | --- |
| Poke | noise click plus decaying partials; pitch from the level's length scale; decay matched to the visual response | $J(t)=\delta$; the medium's impulse response |
| Lens off | plain sine drone | physics baseline |
| Lens on | filtered saw drone, brightness from limbic and cognitive | field layers |
| B brainstem reflex | startle transient; louder pokes | transient source $J(t)$ |
| R rhythmic entrainment | beat-locked gating and tick at the transport tempo | damping / phase locking $\gamma$ |
| E1 evaluative conditioning | a consonant fifth joins the drone | attractor bias $\mathbf b$ |
| C emotional contagion | a voice-like formant field couples in | coupling $\kappa$ |
| V visual imagery | sparse endogenous sparkles | $J_{\mathrm{internal}}(t)$ |
| E2 episodic memory | longer echo and reverb tail | memory kernel $K(\tau)$ |
| M musical expectancy | I-IV-V cadence, sometimes resolving deceptively to vi | transient barrier $\Delta V$ |
| A aesthetic judgement | brighter, wider overtones | cognitive bias $\mathbf b$ |

BRECVEMA sounds play only at the human level with T-Theory on and the
inspector open. The mapping is a design map (`INTERPRETIVE`), not a measured
correspondence.

## Mirror Profile

At non-human scales, `MIRROR` is a parent interpretive profile, not an emotion
claim about the substrate. When enabled, it may supply a declared human-readable
contour to several child renderers:

```text
physical response state
-> mirror profile (INTERPRETIVE)
-> text / grid / visual / audio / organization renderers
```

The profile may describe coherence, tension, persistence, fragmentation, or
integration. It never asserts that a rock, institution, planet, or universe has
human occurrent emotion or intelligence.

## Time

The MVP distinguishes two uses of time:

1. **Physical time:** ordinary body movement and time-indexed state.
2. **Response time:** the causal evolution following a poke, including memory
   decay through $K(\tau)$.

The first interactive implementation needs response time only: play, pause,
reset, and a visible decay/progression after a selected forcing event. Historical
and cosmological timelines belong to later atlas routes.

## Field Atlas Connection

The Field Atlas already establishes the shared scale-plate grammar. The Soma
Machine must use that grammar rather than duplicate it:

```text
Field Atlas plate
  physical substrate
  interaction field
  information/organization layer
  governing equation
  what interacts
  characteristic time

Soma Machine state
  selected scale / substrate
  4D, 8D, or 11D reading
  active equation and new term
  poke response
  time behavior
  source and claim status
```

The human music-affect MVP instantiates the Atlas at the soma scale. Later
routes must extend the same plate grammar, not create independent dashboards.

## System Partonomy and Morphism Graph

Each Atlas scale identifies a concrete selected system, not only a scalar zoom
value. A system is described by a compact, OpenCyc/RDF-compatible partonomy:

```text
system
-> salient parts
-> relations among parts
-> active fields over those relations
-> aggregation rule for the whole
```

The partonomy is intentionally compact and visual. It does not attempt an
exhaustive ontology of a body, city, planet, or universe. For example, the
human route names head, torso, limbs, nervous system, limbic axis, and cortex
contour; the collective route names agent templates, neighborhoods, velocity
vectors, and phase modes.

Each directed path edge additionally declares a part-level morphism:

```text
source parts + source relations
-> preserved roles + retyped roles + added target relations
-> target system and target-scale field
```

The first visual exemplar is organism to collective:

```text
human organism
-> SHRINK / SEED / PAIR
-> two compact, bounded organism templates with coupling
-> REPLICATE / DISTRIBUTE / ALIGN
-> swarm response field
```

The screen representation uses abstract motifs, not disassembled anatomy. The
human template shrinks, its named motifs seed new compact templates, and
intra-body relations are replaced by dyadic coupling or collective alignment.
For the community branch, the same seeds resolve into participant nodes,
repeated-practice edges, and a bounded network.

Cross-substrate paths must never assert literal identity of materials or human
experience. A human-to-geological route can preserve only declared structural
roles such as boundary, load, coupling, memory, and propagation; its retyping
and render status remain `INTERPRETIVE` unless separately sourced/formalized.

## Non-Goals for the MVP

- No assertion of non-human occurrent emotion or intelligence.
- No clinical diagnostics, prescriptions, or therapeutic control claims.
- No live audio input, MIDI, OSC, biometric input, or projection dependency
  (optional browser audio output is allowed; see Audio Contract).
- No advanced/future-time prediction.
- No claim that every standard equation is derived from the same model.

## Acceptance Criteria

1. A user can select 4D, 8D, and 11D at the human scale and read what changes.
2. A user can select a BRECVEMA mechanism and see its forcing role, equation,
   and highlighted route into the response field.
3. A user can trigger a poke and watch a visible, time-dependent response and
   decay.
4. The equation ledger, explanation, and visual state agree.
5. Every visible claim links to a source and carries a claim status.
6. The application remains usable with no music, MIDI, OSC, or hardware, and
   with audio switched off.
7. Every displayed scale identifies its selected system, salient parts,
  relations, active field, and aggregation rule.
8. Every curated path edge declares preserved roles, retyped roles, target
  relation(s), a rendering operation, and claim status.

## Expansion Boundary

After the MVP is accepted, the Theory Atlas may add curated routes, including
dyadic entrainment, collective propagation, geophysical response, and early
universe physics. These routes share the Atlas grammar but are not required to
complete the human music-affect instrument.
