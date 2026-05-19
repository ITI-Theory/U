# Soma-Field Instrument — Design Document

*Paper 3 implementation reference. Updated: May 2026.*

---

## 1. Purpose

This document captures the full hardware inventory, system architecture, and
MIDI routing strategy for the Soma-Field Instrument — the real-time implementation
of the field model described in the soma-field paper.  The instrument is both a
performance/therapeutic tool and the empirical demonstration for Paper 3:

> *"A Dynamical Field Model of Music-Induced Affect: Beyond the
> Valence–Arousal Circumplex"*

The instrument takes an 8-dimensional emotional state vector **e**(t) as
continuous MIDI input, computes the energy function H(**e**), its gradient ∇H,
and the Langevin dynamics in real time, and renders the field state as
simultaneous audio (Ableton Live) and 3D visual output (fractal projection).

---

## 2. Hardware Inventory

### 2.1 Control Surfaces

| Device | Protocol | Qty | Primary role |
|---|---|---|---|
| **MIDI Fighter Twister** | MIDI | 2 | Emotional state vector input — 16 encoders × 2 units |
| **Elgato Stream Deck XL** | USB HID | 2 | Scene/preset/research control layer |
| **Akai Fire** (iSotonik hack) | MIDI | 1 | Emotional trajectory step-sequencer |
| **Ableton Push 2** | MIDI + Ableton native | 1 | Audio monitoring + performance surface |

### 2.2 Audio

| Device | Role |
|---|---|
| **Ableton Live Suite** (latest) | Audio output engine — timbre, pitch, rhythm mapped from field |
| Push 2 | Native Ableton control — leave in native mode, do not fight it |

### 2.3 Visual Output

| Device | Notes |
|---|---|
| **Dangbei Atom** projector | 800 ANSI lm, 1080p, HDMI in — adequate for recorded demo, dark room required. *Do not purchase until venue is confirmed.* |
| **HoloGauze screen** | Partially transparent mesh — creates floating 3D illusion. Works best with darkened room and rear or long-throw front projection. *Research phase only — buy with projector.* |

### 2.4 Computing

| Device | OS / Environment | Role |
|---|---|---|
| **Laptop** (primary) | Windows 11 | Ableton Live, Bome, Python field server, main DAW |
| **WSL2 on laptop** | Arch Linux + XFCE4 | Linux-native dev, Python environment, headless compute |
| **Lenovo IdeaPad tablet** | Android / Termux + X11 + Arch + XFCE4 (planned) | Remote monitoring, secondary control surface |
| **2× additional tablets** | TBD | Extended Stream Deck surface, TouchDesigner preview, OSC control |

### 2.5 Input Peripherals

| Device | Role |
|---|---|
| **Keychron mechanical keyboard** | Primary text/code input |
| **Logitech trackball** | Precision control — keeps desk space clear for MIDI surfaces |

---

## 3. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       HARDWARE LAYER                         │
│                                                              │
│  [Twister 1]  [Twister 2]  [Stream Deck XL ×2]  [Akai Fire] │
│               [Push 2 — Ableton native, separate path]       │
└───────────────────────────┬─────────────────────────────────┘
                            │ MIDI / USB HID
         ┌──────────────────▼──────────────────┐
         │        ROUTING / BRIDGE LAYER         │
         │                                       │
         │  Bome MIDI Translator Pro             │
         │  • Merges Twister 1+2, Akai Fire      │
         │  • Normalises all → 1 virtual port    │
         │  • Handles shift states / layers      │
         │  • Ableton sees exactly 1 MIDI device │
         │                                       │
         │  Bitfocus Companion (Stream Deck XL)  │
         │  • Stream Deck → OSC → Python server  │
         │  • Shift/alt layers in Companion      │
         └──────────────────┬──────────────────-┘
                            │ virtual MIDI + OSC
         ┌──────────────────▼──────────────────┐
         │         PYTHON FIELD SERVER          │
         │                                      │
         │  • Receives e(t) from virtual MIDI   │
         │  • Computes H(e), ∇H(e)              │
         │  • Steps Langevin dynamics           │
         │  • Detects threshold crossings        │
         │  • Logs timestamped session data      │
         │    (→ research data for Paper 3)      │
         │  • Outputs via OSC:                   │
         │    → Ableton / Max4Live              │
         │    → TouchDesigner (visuals)          │
         │    → Push 2 LED feedback              │
         │    → Tablets (remote monitoring)      │
         └──────┬────────────────────┬──────────┘
                │ OSC                │ OSC
   ┌────────────▼──────┐   ┌─────────▼──────────────────┐
   │  ABLETON LIVE     │   │  TOUCHDESIGNER / pre-render  │
   │  SUITE + Max4Live │   │                              │
   │                   │   │  Mandelbulb shader driven    │
   │  timbre=dissonance│   │  by field values via OSC     │
   │  pitch=energy     │   │  → HDMI out                  │
   │  rhythm=|∇H|      │   │  → projector → HoloGauze    │
   │  dynamics=T_eff   │   └──────────────────────────────┘
   └───────────────────┘
```

**Key design principle:** Python is the *brain* (physics). Bome is the *nervous
system* (MIDI routing). Ableton is the *voice* (audio). TouchDesigner is the
*body image* (visual field).  None of these know about each other — Python is
the only hub.

---

## 4. MIDI Fighter Twister Mapping

Two Twisters give 32 encoders + 32 push buttons. With shift layer: 64 values.

### Twister 1 — Somatic layer

| Encoder | Turn | Push |
|---|---|---|
| 1–8 | Somatic intensity, emotional mode 1–8 | Mute/solo mode |
| 9 | Damping coefficient γ | Reset γ to baseline |
| 10 | Noise temperature D (T_eff) | Reset to neurotype default |
| 11 | Global coupling strength | Reset coupling |
| 12 | Perception threshold θ | Reset θ |
| 13–16 | Ableton macro 1–4 | — |

### Twister 2 — Cognitive layer

| Encoder | Turn | Push |
|---|---|---|
| 1–8 | Cognitive intensity, emotional mode 1–8 | Mute/solo mode |
| 9 | C-PTSD depth modifier | Toggle C-PTSD on/off |
| 10 | ADHD T_eff multiplier | Toggle ADHD on/off |
| 11 | ASC coupling sparsity | Toggle ASC on/off |
| 12 | Memory kernel depth (τ) | Reset memory kernel |
| 13–16 | Ableton macro 5–8 | — |

*Twister 1 + Twister 2 together = the complete 16-dimensional emotional state
vector e(t) with full modifier access.*

---

## 5. Stream Deck XL Layer Design

Each unit has 32 buttons.  Bitfocus Companion manages layers.

### Unit 1 — Emotional presets / scenes

| Layer | Button function |
|---|---|
| **Normal** | Load preset attractor state: Regulated Calm, Fight, Flight, Freeze, Grief, Hypervigilance, Flow, Dissociation, ... |
| **Shift** | Research controls: Start log, Stop log, Mark timestamp event, Save current state as named preset, Trigger Langevin kick (perturbation), Export session |

### Unit 2 — System control

| Layer | Button function |
|---|---|
| **Normal** | Ableton scene launch, fractal mode select, projection on/off, record arm |
| **Shift** | Neurotype preset load (Typical, ADHD, ASC, C-PTSD), parameter reset, system reset |

---

## 6. Akai Fire — Trajectory Sequencer

The Fire's 64-pad grid (16 steps × 4 rows) maps to a **pre-scored emotional
arc**: each column = one time step, each row = one emotional mode's intensity.
This allows composing a deterministic emotional trajectory (e.g. for a film
score) rather than performing it live in real time.

The iSotonik Studios hack re-maps the Fire's native FL Studio protocol to
standard MIDI CC, making it transparent to Bome.

---

## 7. Python Field Server — Specification

```
soma_field_server.py
│
├── midi_input.py       — receive from virtual MIDI port (mido or rtmidi)
├── field.py            — H(e), ∇H(e), Langevin stepper, threshold detection
├── modifiers.py        — ADHD / C-PTSD / ASC parameter transforms
├── osc_output.py       — send field state to Ableton + TouchDesigner
├── logger.py           — timestamped session log (JSON lines)
└── server.py           — main loop, ~50Hz update rate
```

**OSC namespace (outgoing):**

```
/field/e[1-8]/somatic     float 0–1
/field/e[1-8]/cognitive   float 0–1
/field/H                  float (energy)
/field/gradH[1-8]         float (gradient components)
/field/T_eff              float (effective temperature)
/field/threshold_cross    int   (mode index, 0 if none)
/field/attractor          str   (nearest named attractor)
```

---

## 8. Visual Output — Mandelbulb

**For the film / Paper 3 demo (immediate path):**
- Python generates fractal frames from field values offline
- Renders to video file (MP4)
- Projected during playback session

**For live performance (future):**
- TouchDesigner receives OSC `/field/*` values
- GLSL Mandelbulb shader: field energy H → bulb power parameter,
  gradient |∇H| → rotation speed, T_eff → colour temperature
- Output via HDMI → Dangbei Atom → HoloGauze

---

## 9. Tablet Integration (Planned)

| Device | Role |
|---|---|
| Lenovo IdeaPad | Termux → X11 → Arch + XFCE4 running OSC monitor / field state display |
| Tablet 2 | Extended Stream Deck surface via Companion remote panel |
| Tablet 3 | TouchDesigner preview / fractal output mirror |

All tablets speak OSC to the Python server over local WiFi.

---

## 10. Build Order

1. **Now**: Python field server core (`field.py` + `logger.py`) — no hardware needed
2. **Next**: Bome routing config for Twister 1+2 → virtual MIDI port
3. **Next**: Max4Live device — OSC receiver → Ableton audio parameters
4. **Then**: Companion config for Stream Deck XL
5. **Then**: Pre-rendered fractal pipeline (Python → MP4)
6. **Later**: TouchDesigner real-time visual patch
7. **Later**: Akai Fire trajectory sequencer integration
8. **When ready**: Dangbei Atom + HoloGauze (buy only when venue confirmed)

---

## 11. Notes

- Ableton Live's MIDI device limit (historically ~6 simultaneous) is bypassed
  entirely by Bome: all devices merge to one virtual port before Ableton sees them.
- Push 2 stays on its native Ableton protocol — do not route through Bome.
- Session logs from `logger.py` are the primary data source for Paper 3's
  empirical section. Log format: JSON lines, one record per field update step.
- The film is not decoration — it is Paper 3's results section.

---

## 12. The Abstract Movie — Lean Server Architecture

The soma-field instrument has two operating modes:

**Mode A — Live performance** (`server.py`): MIDI input → SomaField dynamics →
OSC to Ableton + TouchDesigner. The human performer drives the field in real time.

**Mode B — The Abstract Movie** (`src/Movie.lean` + `instrument/field_render.py`):
Lean is the top-level orchestrator. The *score* — `theRiverFilm` — is encoded as
Lean data. The Lean server runs at 50 Hz, evaluates `e*(t)`, and writes RenderFrame
JSON lines to stdout. `field_render.py` reads from stdin and sends OSC.

```
lake exe Movie | python instrument/field_render.py --verbose
```

### 12.1 Mode B data flow

```
┌──────────────────────────────────────────────────────────────┐
│  src/Movie.lean  (Lean 4)                                    │
│                                                              │
│  theRiverFilm : EmotionScore                                 │
│    — 11 keyframes, 2 ThresholdEvents, riverCoupling W*      │
│                                                              │
│  serverLoop (50 Hz):                                         │
│    t ∈ [0,1] → eval → step(W*) → RenderFrame → StdoutRenderer│
│    Holds at ThresholdEvent until condition(e*(t)) = true     │
└───────────────────────────┬──────────────────────────────────┘
                            │ JSON lines on stdout
         {"t":0.52,"e":[...],"v":[...],"threshold":"awe-onset","tick":26}
                            │
┌───────────────────────────▼──────────────────────────────────┐
│  instrument/field_render.py  (Python 3.14)                   │
│                                                              │
│  MovieRenderer.run(stdin):                                   │
│    parse JSON → render_frame()                               │
│      → /movie/e/{name}    to Ableton + TouchDesigner         │
│      → /field/e/{i}/somatic  (bridge for existing patches)  │
│      → /movie/mandelbulb/{param}  to TouchDesigner only      │
│      → (future) write e_V back for biofeedback               │
└──────────────┬──────────────────────────────┬───────────────┘
               │ OSC/UDP port 9000            │ OSC/UDP port 9001
       ┌───────▼──────────┐          ┌────────▼──────────┐
       │  Ableton Live    │          │  TouchDesigner     │
       │  Max4Live device │          │  Mandelbulb patch  │
       │  (audio)         │          │  (visual)          │
       └──────────────────┘          └───────────────────┘
```

### 12.2 OSC namespace — Movie layer

| Address                    | Type   | Description                                 |
|----------------------------|--------|---------------------------------------------|
| `/movie/t`                 | float  | Story-time t ∈ [0,1]                       |
| `/movie/tick`              | int    | Tick counter                                |
| `/movie/at_threshold`      | int    | 1 = inside threshold window, 0 = free       |
| `/movie/threshold`         | str    | Basin label or "none"  [TD only]           |
| `/movie/e/safety`          | float  | [0,1]                                       |
| `/movie/e/fear`            | float  | [0,1]                                       |
| `/movie/e/curiosity`       | float  | [0,1]                                       |
| `/movie/e/awe`             | float  | [0,1]                                       |
| `/movie/e/grief`           | float  | [0,1]                                       |
| `/movie/e/language`        | float  | [0,1]                                       |
| `/movie/e/preverbal`       | float  | [0,1]                                       |
| `/movie/e/shame`           | float  | [0,1]                                       |
| `/movie/mandelbulb/power`  | float  | [2,8] — Awe → complex fractal  [TD only]  |
| `/movie/mandelbulb/bailout`| float  | [2,6] — Safety → stable         [TD only]  |
| `/movie/mandelbulb/theta`  | float  | [0,π] — Grief → angular offset  [TD only]  |
| `/movie/mandelbulb/phi`    | float  | [0,2π] — Language/Preverbal phase [TD only]|
| `/movie/mandelbulb/speed`  | float  | [0,1] — Curiosity → anim speed  [TD only]  |

### 12.3 Mapping to existing /field/ namespace

`field_render.py` also sends the score on the `/field/e/{i}/somatic` addresses
so existing Ableton Max4Live patches (written for Mode A) receive Mode B data
without modification:

| Movie mode | `/field/e/{i}/somatic` |
|---|---|
| Safety (dim 0) | `/field/e/0/somatic` |
| Fear (dim 1)   | `/field/e/1/somatic` |
| … | … |
| Shame (dim 7)  | `/field/e/7/somatic` |

The viewer field `e_V` (currently zeros, pending GAP-MOVIE-2) is sent on the
`/field/e/{i}/cognitive` addresses.

### 12.4 Architectural invariant

**Lean is always the top-level orchestrator.** Even when all Lean does is call
Python, the score definition, the `Renderer` typeclass, and the server loop
live in Lean. The proof that the system is correct is that
`src/Movie.lean` type-checks without `sorry`.
