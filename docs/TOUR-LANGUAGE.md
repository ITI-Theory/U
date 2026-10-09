---
title: "Soma Machine Observatory Guide"
subtitle: "The soma-tour language: how an answer moves the Soma Machine"
---

# Purpose

This guide is a source for the MOTHER and H-AL notebooks. When the Soma Machine
asks a question in **observatory mode**, the answer should end with a short
**soma-tour**: a list of views of the Soma Machine that illustrate the answer,
each with one sentence to say there. The app removes the block from the answer,
checks every step, and moves through the views while the line is shown and,
with SPEAK on, read aloud.

The same language is used everywhere: preset tours in `registry/tours/`, links
such as `#tour=gravity` in the app, and the Soma Machine boxes of the Field
Atlas textbook.

# The block

A soma-tour is a fenced block whose language is `soma-tour`:

```soma-tour
title: Weighing the dark
- view: level=galactic-halo&lens=on&compare=1&contours=1
  say: "Rotation curves stay flat far beyond the visible disc."
  label: empirical-result
- view: q=dark-matter-spatial-vacuum
  say: "The programme proposes that dark matter is three elevenths of the budget."
  label: open-hypothesis
```

- `title:` a short title for the tour (optional).
- Each step starts with `- view:` and a view: keys and values joined by `&`,
  exactly as they appear after `#` in a Soma Machine link.
- `say:` one sentence shown, and spoken, at that view. Required.
- `label:` the evidence label of what the sentence claims (optional, but
  always give it when the sentence makes a claim).
- `dwell:` seconds to stay when the voice is off (optional; 2 to 60; the app
  otherwise allows time to read the line).

A tour can instead reuse a preset with a single line, `tour: <preset-id>`.
Steps written after it are added to the end of the preset.

Use two to five steps. Each `say` line is one sentence in plain language;
mathematics belongs in the answer, not in the tour.

## Presentations

Preset tours in `registry/tours/` may be longer spoken presentations (for example
`hal-presentation`, about ten minutes). Three optional step fields serve them:

- `abstract:` shows the opening abstract over the view: `0` with nothing
  highlighted, `n` with paragraph `n` highlighted.
- `overlay:` draws one idea faintly over the view, beside the abstract text or
  above the tour card: `ripple` (the Green's function: tap once, the field
  rings), `dimensions` (4 + 3 + 1 + 3 = 11), `zoom` (the zoom dial from
  10^-35 m to 10^26 m), `split` (7/11 and 3/11), `threshold` (a crossing
  above a line), `landscape` (a ball poked from one valley into another) or
  `network` (one shared field instead of messages).
- `pause:` seconds to hold the view after the line is spoken (0 to 30).
- `poke:` fires the app's poke at the stop, about two seconds after the view
  opens: `weak`, `strong`, or `twice` (two strong pokes two seconds apart, to
  show that the second one lands differently). The state panel shows the
  response at the human, dyad, whole-brain and neuron levels (theory lens on).

With `ui=clean` the tour card becomes a HUD line at the bottom of the window.

# Views

| Key | Values |
|:--|:--|
| `level` | a level id (table below) |
| `path` | a path id (table below) |
| `q` | a question id: opens that question's own view and card |
| `lens` | `on` ([T]-Theory reading) or `off` (physics baseline) |
| `dim` | `4`, `8` or `11` |
| `compare` | `1` to show the baseline and the reading side by side, `0` to hide |
| `contours` | `1` to draw iso-lines of the field, `0` to hide |
| `era` | an era id on the time axis |
| `model` | a model id |
| `reader` | `cookie`, `general` or `specialist` |
| `labels` | `on` or `off` |
| `ui` | `clean`: hide the panels (the cockpit view); omit to show them |
| `voyage` | opens the mind-body explorer at a stop: `human` (the level view of the jellyfish human, seen through), `body`, `brain`, `limbic`, `neuron`, `network` or `landscape`; omit to close it. From `human` to any other stop the camera dives into the body |
| `phi` | the limbic field Φ, a number from 0 to 1 (the FX bar): heats the explorer's body, brain, memories and landscape |
| `feel` | the feeling on the body map: `calm`, `fight`, `flight`, `grief`, `freeze`, `vigilance`, `flow` or `joy` |
| `resource` | `1`: a resource (the therapist's driving term J(t)) pulls the memories and tilts the landscape towards SAFE; `0` removes it |

The mind-body explorer is a simple 2D voyage inside a person, over the level view; `dim`
adds its layers (4: anatomy, 8: electrical activity, 11: the field). The preset tour
`mind-explorer` uses it, for example:

```soma-tour
tour: mind-explorer
- view: voyage=landscape&dim=11&phi=0.65&resource=1
  say: Raise the limbic field and add a resource, and the stuck state can move towards safe.
  label: interpretive
```

No other keys are accepted. A step with an unknown key or id is skipped and
reported; the rest of the tour still runs. Nothing in a tour is ever executed.

# Evidence labels

| Label | Use it when the sentence reports |
|:--|:--|
| `empirical-result` | a measurement or observation |
| `kernel-verified` | a statement checked by the Lean proof kernel |
| `derived-under-assumptions` | mathematics that follows from stated assumptions |
| `simulated` | the output of a simulation |
| `interpretive` | a reading or analogy offered by the programme |
| `open-hypothesis` | a proposal that still needs evidence |

# Identifiers

::: {.observatory-ids}
:::

# Example answers

**Question:** Why do starlings turn together?

Each starling copies the heading of about seven neighbours, and a turn crosses
the flock as a wave at twenty to forty metres per second, faster than
imitation alone could carry it. The programme reads this as the same response
grammar it applies to people; that reading is interpretive.

```soma-tour
title: A turn crossing a flock
- view: path=bird-flock&level=flock&lens=off
  say: "Each bird follows about seven neighbours, whatever their distance."
  label: empirical-result
- view: q=starling-turn
  say: "The turn travels as a wave, because birds turn with inertia."
  label: empirical-result
- view: path=bird-flock&level=flock&lens=on
  say: "The programme reads the flock as one response medium of many separate birds."
  label: interpretive
```

**Question:** Is gravity in [T]-Theory the same as Einstein's?

Locally, yes: the papers keep general relativity wherever it has been tested.
The programme's additions are about the dark sectors.

```soma-tour
tour: gravity
```

**Question:** What is a feeling, in this model?

The model treats an emotional state as a valley in an eight-mode landscape; a
strong push can move it into another valley, and memory makes a second push
land differently from the first. That is an open hypothesis about people.

```soma-tour
title: A feeling as a landscape
- view: level=human-vertebrate&lens=off&dim=4
  say: "Without the lens, the body model simply rings and returns to rest."
  label: empirical-result
- view: q=feeling-memory
  say: "With memory, the second push lands differently from the first."
  label: derived-under-assumptions
- view: level=human-vertebrate&lens=on&dim=8
  say: "The programme proposes that emotional states are valleys of this landscape."
  label: open-hypothesis
```
