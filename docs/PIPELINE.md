# The pipeline: one state, two senses, compiled once, played live

Author, 17 Oct 2026: "the same info that audio needs, video needs, so that needs formalizing. As does
the process, the pipeline." And: "the idea of base + override ... compile time / runtime; in music,
compose time / performance ... cut, for a film, the whole thing once, with zero user adjustments ... then
at runtime it's compiled and we just run in sync, and then add the user's overrides."

This document says what exists and where; the formulas live in the code and the registry, never here.

## The contract: one state

Everything the pictures show and the sound will play reads one state, frame by frame:

| Part | What | Where it comes from |
|---|---|---|
| place | where the camera is: a view (a hash: stop, place, level, layer) | a tour (`registry/tours`), the map (worlds3d.js `TREE`, `registry/hubs.yaml`) |
| modes | the score's seven: safety, fear, curiosity, awe, grief, language, pre-verbal | a score (`registry/scores`), written from a story (provenance: `make -C sherlock provenance`) |
| field | Φ, the limbic field | the score or the knobs; the explorer's slider |
| events | a poke, a threshold crossed, a phase begun, a transition | the score's thresholds and phases; the tour's places |
| body | the heart, its variability | the strap (`heart.js`), or a slider |

What each sense may express of the state is declared: pictures in `registry/visual-grammar.yaml`, sound
in `registry/sound-grammar.yaml`, the same thirteen model terms. A channel that expresses nothing
undeclared fails Sherlock (`make -C sherlock grammar`).

The emotions: the score carries seven modes. The 32 are the 32 knobs on screen (two banks of 16 on a
MIDI Fighter Twister; ISS-053): nobody sets 32 by hand, so they come in layers, the seven modes (or
thirteen music emotions) as the macros a person sets by answering questions, each driving its
sub-knobs. A viewer's baseline may move all 32; the compiler bakes it in, so the film plays as zero and
the live knobs are small moves from there. The Lean ontology (`paper/proofs/EmotionOntology.lean`) types
fourteen labels built from the modes; the eight mechanisms (BRECVEMA) say how a feeling was evoked.

## The stages

1. **Source** (the author): a story, then its score, attested as his (`provenance`). The places he wants
   to go, as a tour. Private material stays in Me (`make -C sherlock privacy`).
2. **Compose, once** (compile time): `node scripts/compile-film.mjs --tour <id> --score <id> --viewer
   <id>` in the app folder writes `bld/film/<tour>.<score>.<viewer>.timeline.json`: the places laid over
   story-time, the modes at every frame, the transitions between places, the band's controls. Zero user
   adjustments: the same file every time.
3. **The viewer's baseline, compiled on top** (still compile time): a viewer preset (`registry/viewers`:
   neutral, adhd, asd, cptsd, v2021) is applied by `viewerTransform` and `viewerStep` (score.js) while
   compiling, so a viewer's own film plays "as zero". Example, river-film at 45 minutes: neutral safety
   0.20 and fear 0.70; cptsd 0.00 and 0.90.
4. **Render**: the pictures from the places and the modes (each stop's renderer, by the visual grammar);
   the sound from the same frames (by the sound grammar; to come).
5. **Perform** (run time): FILM (film.js; MOTHER `/film`) plays the compiled timeline on its own clock:
   the places in order, each declared jump drawn, the compiled modes driving the score frame by frame.
   Only small live overrides are added: the knobs (CO-PILOT, MANUAL override the modes they own), the
   strap, a poke, Φ; never a recompile. Each frame is announced as `soma-film-frame` (time, story-time,
   place, the compiled modes, the band's controls) and each jump as `soma-transition`: what the sound
   plays from.
6. **Record**: REC in SHOW, or the screen recorder; the read-back checks the recording carries the score
   (`make -C sherlock readback`).

## The places and the jumps between them (the morphisms)

The places are the map: THE WORLDS' domes, the hubs' halls and doorways, the explorer's stops. A jump
from one to the next is a transition, declared once for the picture and the sound together in
`registry/transitions.yaml`. A tour step says how it is arrived at:

```
via   ::= kind [ seconds "s" ] [ "on" sync ]
sync  ::= now | beat | bar | phrase

via: cut                   instant, on the next beat
via: fade 6s on phrase     slow
via: wormhole 4s on bar    the neon cave's tunnel, landing on a bar line
```

| Kind | Speed | Picture | Sound |
|---|---|---|---|
| cut | instant | the new place at once | on the next beat, no tail |
| fade | slow | a crossfade through the field's colour | a crossfade, the same seconds |
| dive | quick | through the glass (a dome, a thought) | a filter opens as the glass gives |
| doorway | quick | a glide through a hall's door | the reverb carries through the door |
| elevator | medium | a change of level, the floors passing | a sweep, lower going up the scales |
| tube | medium | a flight down a tube (FLY, the way in) | the rush of motion, the drone carried |
| wormhole | medium | the neon cave's tunnel, where no road joins two places (ROOTED; a fade in the default, ISS-095) | a riser into the drop |

A step without `via:` gets a kind inferred from the two views. The compiler writes every transition
with its kind, seconds and sync, so the sound knows when a jump starts, how long it takes and where it
lands (a cut on the beat, a wormhole on the bar). Checked at build (`npm run generate`) and when a tour
is read (tour.js); a sound that cannot make a jump plays it as an effect. At run time every tour step
announces its jump and the style in force as the browser event `soma-transition` ({kind, seconds,
sync, style, view}), for the sound to follow. The explorer draws the dive, the doorway and the elevator
itself; a declared fade is drawn by the veil (veil.js) over its seconds, the view changing at the
midpoint; the wormhole is a flight down the neon cave when ROOTED, a fade in the default (ISS-095).

**Style.** A step may carry `style:` ("punk rock", "a lullaby", "film noir"): a directive to the
renderers, kept until the next `style:` (`style: none` clears it). It is non-functional: it never
changes the state (the place, the modes, the field). It travels in the compiled film on every place,
and each renderer realises it within its grammar (`registry/visual-grammar.yaml`,
`registry/sound-grammar.yaml`) or leaves it. A person's own words ("I want this part to have punk
rock") become a `style:` in the interview, with the sentence kept as provenance.

## The cockpit's three windows

FLY flies through a world chosen by the current level's sector (`flight3d.js`): inside a body (an
inner sea, at the human level), the earth (folded strata, at the geological level), space (the cosmic
web, at the cosmic level). The grand tour (`registry/tours/grand-tour.yaml`) visits all three. Outside
the app: SpaceEngine for space (`lib/universe/universe.py` writes a score as a universe), the fractal
programs for the inside (H-AL: `uat/RC3/hal-pipeline-2026-10-17.md`).

## Questions in, pictures out

A question asked of the machine comes back as a picture: MOTHER's observatory mode answers and ends with
a `soma-tour` block (docs/TOUR-LANGUAGE.md), which the app plays; H-AL does the same in the consulting
room for a therapist or a client. A tour is a route over the places: it can be compiled like any other.

## A new tool: save and see

A new view, place or channel follows one loop: write its registry entry (a hub, a tour, a channel, a
feature tagged science or show), `npm run generate` (the build stops on a route to nowhere or an unknown
term), `make -C sherlock grammar features views`, then look: the dev server, or the grand tour.
