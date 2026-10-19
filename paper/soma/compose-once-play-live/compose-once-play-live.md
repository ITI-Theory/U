---
title: "Compose Once, Play Live: An Emotional Score Compiled to Picture and Sound"
subtitle: "The River Film as a film, an orchestra and a printed score"
author: "Alistair Johnson"
date: "2026"
lang: en-GB
bibliography: ../../bibliography.bib
csl: ../../apa-7th.csl
abstract: |
  A film score is usually written to a film. This paper goes the other way: the
  emotional path is written first, as a score of seven modes over story-time, and
  the film and the music are both compiled from it. The score is The River Film,
  from The Tensor: ninety minutes from safety and language, down through fear and
  curiosity to awe and the pre-verbal, and back, with two threshold crossings. One
  state is read by every renderer, frame by frame: the place, the seven modes, the
  limbic field, the events and the body. What each sense may express of it is
  declared, and checked. The work has two times, as music has: compose time, when
  a tour of places is laid over the score once, with zero adjustments, and a
  viewer's own baseline is compiled on top, so that the film plays "as zero" for
  that viewer; and performance time, when the compiled film runs on one clock and
  only small live overrides are added. The jumps between places (cut, fade, dive,
  doorway, elevator, tube, wormhole) are one grammar for picture and sound, each
  landing on a beat, a bar or a phrase. The same score is realised three ways: as
  a film in the Soma Machine (rendered frame by frame at 4K on a virtual clock),
  as an orchestra of sixteen parts with a modern electronic layer (5, 10 and 90
  minutes; at 90 minutes a suite of thirteen movements in four parts, none over
  eight minutes, as Holst's Planets has none over ten), and as a printed
  conductor's score. The paper reports what was built and
  checked, and is careful about what was not: the score is what the work
  proposes, not what a viewer feels, and no listener has yet been measured. It
  closes with the authorship question the tools raise (whose music is it, when a
  machine writes the notes from a person's score?) and the answer this work
  takes: the person writes the feeling, chooses among the options, and attests.
---

# Introduction

Music psychology usually asks what music does to feeling. The programme's own
model of that direction treats a piece as a forcing of a field of emotional
modes, and the eight BRECVEMA mechanisms as the ways the forcing reaches the
listener [@johnson2026music; @juslin2013]. This paper asks the converse,
practical question: if the feeling is written first, can a work be compiled
from it?

The question is old in practice and young in form. Composers have always
written trajectories, and film composers write to a picture whose emotional
course is already set by the cut [@cohen2001film; @chion1994audiovision].
Algorithmic composition has a long literature of systems that generate music
to a target, including target emotions
[@fernandez2013ai; @williams2015affect; @kirke2009survey]. What is proposed
here is narrower and more structural. The Tensor defined an emotional score:
seven modes (safety, fear, curiosity, awe, grief, language, pre-verbal), each
a number in $[0, 1]$, given as keyframes over story-time $t \in [0, 1]$, with
named phases and threshold crossings [@johnson2026tensor]. It argued for
*container independence*: the same score could be a river journey, a cave
descent or a session in a consulting room; the invariant is the path, not the
story-world `interpretive`. That is the position of a musical score in
Goodman's sense: one score, many performances, each an instance of the work
because it complies with the score [@goodman1968languages]. It had not been
built.

This paper reports the build, in three parts. First the contract: one state
that every renderer reads, and the declared grammars that say what each sense
may express of it. Second the two times: compose time, when everything that can
be decided is decided once, including the viewer's own baseline; and
performance time, when only small live moves are added. Third the realisations:
the film, the orchestra and the printed score, each from the same file.

The claims are of three kinds and are labelled. What the software computes is
`simulated`; what was measured in the studio (notes counted in a running DAW)
is `empirical-result`; every mapping from a feeling to a picture or a sound is a
design choice and is `interpretive`. What viewers feel is not measured here;
the proposals for measuring it are `open-hypothesis`.

# The score

The River Film is a file in the programme's registry
(`registry/scores/river-film.yaml`), transcribed from The Tensor's appendix.
It has eleven keyframes of the seven modes, six phases with a line each
(*Departure*: "The boat leaves the last town. The journey has begun."), and two
thresholds, held when crossed: T1 at $t = 0.52$, when fear exceeds 0.7 while
awe rises, and T2 at $t = 0.74$, when language falls below 0.1 and the
pre-verbal exceeds 0.85. Its nominal length is ninety minutes; any length can
be compiled.

A score carries its provenance. Whose feelings are these? This one is the
author's, from his own paper, and he attested it as his, spoken at the desk and
recorded (`make -C sherlock provenance`). The point is not ceremony. A score
written from another person's account (a client's, an affidavit's) is that
person's, and the machine must know so before it plays it to anyone
`interpretive`.

# One state, two senses

Everything the pictures show and the sound plays reads one state, frame by
frame:

| Part | What | Source |
|---|---|---|
| place | where the camera is (a stop, a place, a level, a layer) | a tour of the map |
| modes | the seven, each in $[0, 1]$ | the score, with the viewer's baseline |
| field | $\Phi$, the limbic field | the score or a knob |
| events | a threshold crossed, a phase begun, a transition, a touch | the score and the tour |
| body | the heart and its variability | a chest strap, or a slider |

What each sense may express of the state is declared, in a visual grammar and a
sound grammar over the same thirteen model terms. A channel that expresses
something undeclared fails a check (`make -C sherlock grammar`), so that "the
music means fear here" is always a declared mapping, never an accident of a
renderer `simulated`. The declarations are the paper's honesty device: the
rendering map is written down, and therefore open to dispute
`interpretive`.

# Two times: compose and perform

Music has always had two times. The composer decides once; the performer adds
what only the moment can. The pipeline makes the same split, and makes it
strict.

**Compose time.** A tour (a route over the places of the map) is laid over the
score once. The compiler (`compile-film.mjs`) writes a timeline at ten frames a
second: the places, the transitions between them, the score's modes at every
frame, and the controls for the band. It takes no input from anyone watching:
the same file every time `simulated`.

**The viewer's baseline, compiled on top.** People do not start at zero. A
viewer whose baseline is fearful is not moved by the same score as a viewer at
ease, and a film that ignores this pushes the first viewer harder than it
means to. The compiler therefore takes a viewer preset (neutral, or a profile
such as complex trauma) and applies it while compiling, so that the viewer's
own film plays "as zero": the live controls then start from where that viewer
is. On the River Film at 45 minutes the neutral viewer's safety and fear are
0.20 and 0.70; with the complex-trauma preset they are 0.00 and 0.90
`simulated`. Whether a baseline-compiled film is experienced as better matched
than an uncompiled one is the first testable claim of this design
`open-hypothesis`.

**Performance time.** The compiled film plays on its own clock. Only small
live overrides are added on top: the knobs of a controller, a touch, the
heart from a strap. Nothing is recompiled. Every frame is announced (time,
story-time, place, modes, the band's controls) and every jump, so that any
renderer, of picture or sound, can follow.

The split is the pipeline's main design decision. It makes a performance
repeatable (the compiled film is a file, with a checksum), and it makes the
live part legible: whatever differs between two performances of one compiled
film is what the performers did `interpretive`.

# The jumps between places

A film has cuts; a tour of a map has jumps, and a jump is a morphism: it says
how one place becomes another. The pipeline declares them once, for picture and
sound together, in a small grammar:

```
via   ::= kind [ seconds "s" ] [ "on" sync ]
sync  ::= now | beat | bar | phrase
```

| Kind | Picture | Sound |
|---|---|---|
| cut | the new place at once | on the next beat, no tail |
| fade | a crossfade through the field's colour | a crossfade, the same seconds |
| dive | through the glass of a dome or a thought | a filter opens as the glass gives |
| doorway | a glide through a hall's door | the reverb carries through the door |
| elevator | a change of level, the floors passing | a sweep, lower going up the scales |
| tube | a flight down a tube | the rush of motion, the drone carried |
| wormhole | a tunnel where no road joins two places | a riser into the drop |

The grammar is checked when the app is built and when a tour is read. A
`style:` may travel with a step ("film noir", "a lullaby"): a directive to the
renderers that never changes the state `simulated`.

**One clock.** The music is played in a DAW (Ableton Live), and the film must
land its cuts on the music, not near it. The app reads Live's position twenty
times a second through a bridge, predicts the next beat, bar or phrase, and
starts each declared transition early enough that its midpoint lands on it.
Without Live, nothing changes; with it, picture and sound share one clock.
The link was tested reading Live's tempo, metre and transport; the beat
landing itself was not yet tested, because Live's playhead did not run on the
night (an audio-device fault, not the link) `empirical-result`.

# Realisation one: the film

The film is the Soma Machine's own: the app's places (the worlds, the halls,
the mind-body explorer, a flight through three windows: inside a body, the
earth's strata, the cosmic web), a grand tour of eighteen places each saying
what happens next, and the declared jumps between them. Its look follows the
modes: awe opens the neon cave of the fractal flight, fear narrows it and turns
it cold, safety warms it, grief greys it `interpretive`.

A film to be published cannot depend on the speed of the machine it is made
on. The renderer therefore runs the app headless on a virtual clock: time is
frozen, advanced one frame at a time, and each frame captured, so that a 4K
film is rendered frame by frame (about a quarter of a second a frame on the
author's laptop) with the same picture it would have had in real time
`simulated`. The live show uses a video desk (OBS) whose scenes the app
switches, so that a flip to the DAW's window or to a space simulator is itself
a transition.

# Realisation two: the orchestra

The same score is realised as music for sixteen orchestral parts (strings with
tremolo, pizzicato and muted sections, woodwind, brass, choir) and a modern
layer of four (sub bass, pad, pulse, impacts) that is played from the DAW. The
realiser is the author's own instrument, private to his studio; its rendering
map is given here in full, because the map, not the code, is the claim
`interpretive`:

- **Mode by feeling.** Each phase takes its mode from its mean feelings:
  safety and language major; curiosity Dorian; awe Lydian; grief Aeolian; fear
  Phrygian; the pre-verbal whole-tone.
- **One theme, transformed.** One four-bar theme is carried by the instrument
  the leading feeling calls for (safety and language the violins; curiosity
  the flute; awe the horns with the violins; grief the celli; fear the violas
  and clarinet; the pre-verbal the choir) and transformed by it: fear inverts
  it, grief slows and lowers it, curiosity quickens it, the pre-verbal breaks
  it into fragments. This is thematic transformation as memory: the return is
  heard against the departure [@meyer1956emotion; @huron2006sweet].
- **Counterpoint and bass by feeling.** A counter-line by canon (awe,
  language), mirror (fear) or note against note, contrary motion preferred and
  parallel fifths and octaves avoided; the bass an ostinato in fear, a walk in
  curiosity, a lament in grief, a pedal in awe.
- **A threshold is a drop.** The build of rising density, a vacuum of a beat
  or two, then the turn: at T1 a tutti and the sub; at T2 a collapse to a lone
  cello and the choir. The modern layer carries the builds and the field.
- **Harmony from the author's library.** Progressions come from the chord
  templates of a harmony tool the author uses (Scaler 3), parsed from its
  files, rather than invented.

Each take is checked as it is written: no note outside its part's range, no
note crossing a bar line, parallels counted between the lead and its counter
and bass, and the *arc*: the correlation, bar by bar, of the music's energy
(loudness times length) with the score's arousal. Over ten takes (three each
at 5 and 10 minutes, one revised 10-minute take, three at 90) every note was
in range and inside its bar; parallels ran from 0 to 63 among 146 to 3,819
shared onsets; and the arc correlation was between 0.72 and 0.81
`simulated`. The arc is a check that the realiser did what it was told, not
evidence that anyone feels the arc: the music's energy was made from the
score, so a high correlation is expected and a low one would be a bug.

The takes were loaded into the DAW as clips, one track per part, and every
note was counted back from the running DAW and matched the file
`empirical-result`. The 90-minute take is 1,667 bars and 56,755 notes; carved as a suite (below),
57,556 notes, with an arc correlation of 0.76.

**The remix deck.** For live performance the music is also a deck: four slots
(lead, harmony, bass, texture) by four levels of intensity, after the
four-by-four remix decks of DJ software. Each slot has a drop-down of the
underlying material it may use: themes offered by a MIDI library, the harmony
templates, invented themes, or the author's own; a choice rebuilds the
clips. The deck is in the app, and a change is sent through the bridge to the
DAW; one pack was tested end to end, 1,130 of 1,130 notes arriving
`empirical-result`.

# Realisation three: the printed score

A score that is played by an orchestra must be printed, and the music trade's
way is not a bound book. Following the orchestra librarians' conventions, the
conductor's score is large (11 × 17 inches, or A3) and lies flat, wire- or
spiral-bound, and each player's part is A4 or a little larger, lightly bound.
How long is a movement? Ninety minutes in four movements of twenty would be four
symphonies, not four movements. The orchestral suite that this work most
resembles in plan, Holst's *The Planets*, has seven movements of four to nine
and a half minutes, none reaching ten. The 90-minute take is therefore carved as
a suite: four parts, one for each turn of the story (the departure; the descent
to the first threshold; the deep river to the second; the return), each cut
into movements of three to ten minutes, aiming at seven. A cut falls where the
two leading feelings change if it can, else on a 24-bar block of the
realiser's phrasing; it never falls between a threshold's build and its drop,
so a threshold is the climax of the movement that contains it. Each movement
then becomes a section of its own: it takes its mode, its leading instrument
and its harmony from its own mean feelings, and closes with a cadence and a
slight ritardando. The carving gives thirteen movements of 5.6 to 8.0 minutes
`simulated`:

| Part | Movements | Minutes | Modes |
|---|---|---|---|
| One: Departure | 3 (144, 144, 144 bars) | 22.5 | Ionian |
| Two: Descent | 4 (120, 120, 120, 149) | 25.3 | Ionian, Phrygian |
| Three: The Deep River | 3 (120, 96, 127) | 19.9 | Phrygian, whole-tone |
| Four: Return | 3 (120, 120, 143) | 22.6 | Lydian, Ionian |

Shorter sections let feelings that a long section averages away be heard: the
Lydian of awe, absent when the score was in four long movements, now colours
the first two movements of the return. The movements are titled, until the
author names them, by their two leading feelings ("Fear and Curiosity").
Each movement is written as its own MusicXML file, numbered from bar one, with
its tempo and key; each imports into a notation program as one flow, from
which the full score and every part are laid out. The modern layer is not
printed as notes: it becomes a one-line Electronics staff of cues for the
conductor ("Live: pad in, impact"), because it is played by the DAW, not from
paper `simulated`. Draft engravings count the pages, and the pages the cost,
so that a printed set is a build target like any other.

# Authorship

When a machine writes the notes, whose music is it? The question is not only
philosophical. One of the MIDI libraries used (reMIDI 4) licenses its output
for use with human involvement, and not for automated generation without it.
The answer this work takes is the same for the licence and for the art: the
person writes the feeling (the score, attested as his), the machine offers
options, and the person chooses. The realiser writes three theme options for
each phase; the author listens and picks; the take is rebuilt on his choices.
The deck is the same idea made live: the drop-down is the choice
`interpretive`.

The programme's position on copyright follows: the realiser uses information
*about* music (forms, feelings, the shape of a liked track as text) and never
another composer's notes. A liked track becomes a brief, not a sample.

# Discussion

**What was shown.** That an emotional score can be the single source of a
film, an orchestra and a printed score; that the viewer's baseline can be
compiled in, not added as an afterthought; that the jumps between places can
be one grammar for both senses, landing on the music's own beats; and that
every step can be checked as it is built. These are engineering results
`simulated`.

**What was not.** No viewer or listener has been measured. The arc correlation
is internal. Container independence (that the same score, rendered as a river
or a cave, moves people alike) is the claim the whole design rests on, and it
is untested.

**What would test it.** Three studies, in order of cost `open-hypothesis`:

1. *The arc, heard.* Listeners rate arousal and valence continuously while
   hearing a take; the ratings are compared with the score's arousal, and with
   a take realised from a shuffled score. The dimensional and discrete models
   of musical emotion differ in what listeners can report
   [@eerola2011comparison], so both a continuous dial and phase-by-phase mode
   labels are collected.
2. *Container independence.* The same score is rendered in two containers (a
   river and a cave); viewers' mode reports are compared phase by phase. The
   claim fails if the container explains more of the variance than the score.
3. *The baseline compiled.* Viewers with a measured baseline see their own
   compiled film or the neutral one, blind; the claim is that the compiled one
   is reported as better matched and less overwhelming at the thresholds.

**The scales.** The cockpit's three windows (inside a body, the earth, the
cosmos) are the programme's zoomable field made visible: one score, rendered
at the scale the viewer has zoomed to [@johnsonzsf2026]. A score is
scale-free; its renderings are not `interpretive`.

# Conclusion

Write the feeling first, compile the work from it, and keep the live part
small. The River Film now exists as a film, an orchestra and a printed score
from one file, with the viewer's baseline compiled in and every jump declared
to land on the music's beat. Whether anyone feels the river is the next
question, and it has a method.

# Reproducing the work

In the public repository (ITI-Theory/U): the score,
`registry/scores/river-film.yaml`; the transitions, `registry/transitions.yaml`;
the pipeline, `docs/PIPELINE.md`; the compiler,
`node scripts/compile-film.mjs --tour grand-tour --score river-film --viewer
neutral` in the app's folder; the film, `make film-render`; the grammars'
check, `make -C sherlock grammar`. The orchestral realiser, the takes and the
printed score are the author's (private); the rendering map above is complete,
and the movement table and the checks are reported from its outputs.

# References
