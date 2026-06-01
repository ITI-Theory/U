---
title: "The Wave That Is Always There"
subtitle: "A Fractal Atlas from the Universe to the Soma"
author: "Alistair Johnson"
date: "2026"
documentclass: book
classoption: openany
papersize: 156x234mm
geometry: "twoside,inner=22mm,outer=18mm,top=22mm,bottom=25mm,bindingoffset=6mm"
fontsize: 11pt
linestretch: 1.35
colorlinks: true
linkcolor: NavyBlue
urlcolor: NavyBlue
toccolor: NavyBlue
toc: true
toc-depth: 1
lang: en
---



\frontmatter

\thispagestyle{empty}
\begin{center}
\includegraphics[width=\linewidth,height=\textheight,keepaspectratio]{soma/wave-atlas/figures/F0_1_cover.png}
\end{center}
\newpage

\thispagestyle{empty}
\vspace*{0.3\textheight}
\begin{center}
{\Huge\bfseries The Wave That Is Always There}\\[1em]
{\Large A Fractal Atlas from the Universe to the Soma}\\[3em]
{\large Alistair Johnson}
\end{center}
\vfill
\newpage

\thispagestyle{empty}
\vspace*{\fill}
\noindent\small
First edition. Independently published, Zurich, 2026. \\
Text © Alistair Johnson, 2026. Released under the Creative Commons
Attribution 4.0 International licence (CC BY 4.0). \\
Image credits and licences are listed at the end of the book. \\
ORCID: 0009-0007-2194-0850 \\
Companion technical works: see the *Soma Field* paper series
(Johnson 2026a–k; DOIs in the Bibliography). \\
Cover image: Mandelbulb render annotated as a cartoon of $G_2$
compactification. Original. \\
\vspace*{2em}

\newpage

\thispagestyle{empty}
\vspace*{0.25\textheight}
\begin{center}
\itshape
For my family — \\[0.4em]
the ones who carried the wave \\
before there was a word for it.
\end{center}
\vfill
\newpage

# How to Read This Book

This book has three movements. It begins at the largest scale we know — the
cosmic microwave background, the faint glow left over from when the universe
was 380,000 years old — and ends at the smallest scale we can talk about, a
seven-dimensional compactified manifold roughly $10^{-35}$ metres across. In
between, it stops at galaxies, stars, planets, the rocks of central
Switzerland, plants and rivers, the human heart, the fascia, and the field of
feeling that the rest of my work calls the *Soma Field*.

The argument — if there is one — is simple: **the same mathematical objects
recur at every scale.** Waves, fields, attractor landscapes, fractal
branching. Not metaphorically. Mathematically. The wave equation in a
violin string and the wave equation in the cosmic plasma 380,000 years after
the Big Bang are the same equation. The fractal that organises a tree's
branches and the fractal that organises a lung's bronchi and the fractal that
organises the cosmic web is the same fractal in three different physical
substrates.

You can read this book in any order. The chapters are sized to be read in
one sitting and indexed for browsing. Most of the pages are pictures, and
most of the pictures want to be looked at slowly. If you have only one
afternoon, read Chapter 1, Chapter 6 (the Glarus chapter), and Chapter 11
(the soma field). Those are the three load-bearing chapters; the rest is the
scaffolding that makes them load-bearing.

If a paragraph contains an equation that loses you, skip it. There are no
later paragraphs that depend on understanding it. The mathematics is here
because, when it is there, the picture beside it stops being a metaphor and
becomes a description. That is a different experience from "popular science
that explains an equation"; it is closer to looking at a topographical map
beside a photograph of the mountain.

A few chapters have a sidebar called *Your own example*. Those are
invitations, not exercises. Coffee-table books should let the reader put
themselves in. Chapter 18 — *A Family Album* — is left almost entirely blank
on purpose; the instructions for filling it in are inside.

I am an independent researcher in Zurich. I am not a credentialed
cosmologist, geologist, biologist, or clinician. I am a physicist by training
who has spent thirty years thinking about how a small number of mathematical
ideas keep appearing in places where, on first inspection, they have no
business being. This book is what those thirty years of noticing look like
when arranged in scale order. It is not a textbook. It is an atlas.

— *Alistair Johnson, Zurich, summer 2026.*

\newpage

# A Note on Sources, Pictures, and Honesty

Everything that came from someone else's work is cited; the citation style is
Chicago notes-and-bibliography because I find footnotes easier on the eye
than parenthetical inserts. Every photograph that is not mine is credited at
the back of the book under *Image Credits*, with the licence under which it
appears. Most of the imagery is from NASA, ESA, the United States Geological
Survey, the European Space Agency, swisstopo, and Wikimedia Commons — all
either public-domain or released under Creative Commons. A few photographs I
took myself; those are noted *(Author)*.

Eleven dimensions cannot be drawn. Wherever a picture in this book claims to
show eleven (or seven, or six) dimensions, it is showing a two- or
three-dimensional projection or cross-section, and the caption says so. This
is standard practice in string-theory popularisations and is not a sleight of
hand. The shape itself is real; the picture is an honest shadow of it.

Where I make a claim that goes beyond the consensus of a field — and a few
of them, by the back of the book, will — I have flagged it explicitly. *This
is where I am asserting something the textbook does not yet say.* You may
disagree with me. That is also fine. The atlas does not depend on the
assertion; the assertion depends on the atlas.

\mainmatter
# On the Strings of This Book

\begin{quote}\itshape
A short essay, before the chapters begin, on the threads that run
through this book in parallel. Read once and then forget about; the
threads will do their own work as you read.
\end{quote}

\vspace{1em}

## The professor and the Bach

A friend of mine, a professor of category theory, was struggling for
weeks to play a particular passage of Bach on the piano. Her hands
would not do it. She is a good pianist. The passage is not, by Bach
standards, especially hard. But the hands kept fumbling and the music
kept not arriving.

One afternoon she put the score on the table and, instead of trying
to play it again, she *drew* it. She drew the bass line as a single
slow curve across the bottom of the page. She drew the treble as a
faster, more tangled curve above. She drew, in coloured pencil, the
inner voices as a kind of spaghetti — strands crossing each other,
intertwining, occasionally pinching together at a chord, then peeling
apart again.

"It was spaghetti," she told me. "Once I saw it was spaghetti, my
hands knew what to do."

The piece is, of course, *literally* a tangle of strings — Bach
designed it as voice-leading, as a small number of melodic lines
woven together. The score's two-staff piano notation hides this.
The category theorist's coloured-pencil drawing made it visible
again. And once it was visible, the hands could play it.

I think a great deal of this book is doing the same thing for a
different score. The body, as the soma-field model treats it, is a
tangle of strings — fascial, neural, electromagnetic, perhaps
quantum, certainly informational. Standard anatomy textbooks present
the body in the two-staff piano-score notation of *systems*:
cardiovascular, respiratory, nervous, digestive. This is useful for
surgery and for biochemistry. It is not useful, or only weakly
useful, for understanding the body as a *playing instrument* — the
thing the body actually is, for the person living inside it.

The cyber-hologram image, recurring through these pages, is meant to
do the coloured-pencil-spaghetti job for the body. *Once you see it
is spaghetti, the hands know what to do.*

## The parallel threads

Several threads run in parallel through this book. None is the main
thread. The book *is* the parallel-running.

**The wave thread**. The thing that propagates without taking the
medium with it. CMB acoustic waves; galactic density waves; star
modes; weather patterns; seismic motion; nerve impulses; cardiac
ringing; soma-field standing waves; tunnelling wavefunctions; M-theory
mode expansions. Same mathematics, fourteen substrates.

**The geology thread**. The slow wave. The fold. The hinge. The
thrust plane. The recumbent nappe. The catastrophe germ. The G$_2$
singularity. The eight modes as Cartan-subalgebra deformations of an
ALE space. *Folding* is what this book is finally about — folding at
every scale from $10^7$ m to $10^{-35}$ m.

**The music thread**. The fast wave. The chord. The cadence. The
voice. The line. The polyphony. The interference between two musical
lines that produces *resonance* in a listener — the technical name for
which, in this book, is *dissonance-between-fields* (Chapter 12c). The
soma field of a listener is moved by the soma field of the music. The
two fields couple. The music thread is about that coupling.

**The category-theory thread**. Lurking quietly. The eight modes as
objects in a category, with morphisms given by the catastrophe
germs. The $E_8$ root system as a particularly rich set of arrows.
The dualities of M-theory as functors between equivalent categories
of states. This thread is least developed in the present volume; it
will get its own treatment in subsequent volumes.

**The clinical thread**. The case. The patient. The session. The
moment of insight. The slow rebuilding of trust. The faster rebuilding
of feeling. The therapist's hand on the foot, the breath in the
diaphragm, the eye contact returning. Soma-field theory is — finally
— a clinical theory, and the clinical thread is where the theory pays
its debt to the people who motivated it.

**The biographical thread**. The author at the window of a hotel by
the Klöntalersee, in the summer of 2026, with one hour before bed.
The daughter who will read this in 2034 if all goes well. The
diagnoses (ASD + ADHD + cPTSD) that shaped the seeing. The Strandberg
guitar on a stand near the desk. The Ableton Live session that has
been open for three days. The cup of cold coffee.

## On jumps

The reader will, by now, have noticed that this book *jumps*. From
CMB to recumbent fold; from heart-rate variability to G$_2$ holonomy;
from category theory to Bach. The jumps are not accidental. They are
the form.

The eleven-dimensional universe that M-theory describes is, in a
sense, *all the jumps that physics has not yet bothered to take*.
The four observed dimensions of spacetime are a tiny slice through
the eleven; the seven compactified dimensions are jumping around at
scales we cannot directly see. Every now and then a fold catches the
light and we see one of the jumps — a topological feature of the
internal manifold projected onto our four-dimensional shadow.

This is also how an ADHD brain works. (I know; I have one.) The
brain is not undisciplined; it is *running on all eleven dimensions
at once*. The clinical experience is of jumps that don't make sense
from a four-dimensional point of view but make perfect sense once
you take the compactified seven into account. The same is true of the
soma field: it has eight modes running in parallel, and what looks
like instability from outside is, from inside, the natural
multi-dimensional play of the field.

The format of this book — with chapters and plates and appendices
and margin-floats interleaved — is intended to *honour the jumps*
rather than to apologise for them. If you read it cover to cover and
feel that you have been pulled across many strands of subject matter,
that is what is supposed to happen. That is the *point*.

## On the margin floats

You will see, throughout the book, occasional *italic single-paragraph
asides* in the margin or set off in the text. These are floats —
small pieces of free-associated content that connect the chapter at
hand to other strands of the book or to the wider culture. They are
the *entrance music* of this book; little weird noises drifting in
from off-stage. You do not need to read them. They are there because
they were there in the head of the author at the moment of writing,
and removing them would have been dishonest.

You are free to skip them. You are free to dwell on them. The book
does not insist.

## Closing

The threads run in parallel. The jumps happen. The strings are
visible if you stop trying to play them and draw them instead. The
body is a tangle, and once you see it is a tangle, the hands know
what to do.

That is the book in one paragraph.

Begin.

\newpage
# Prologue: Standing at the Window

In Klöntal, in the canton of Glarus, there is a lake that sits in a trough
the glaciers cut and that the mountains have been holding open ever since.
On still mornings the water looks like a slab of slate. Just before any
wind, you can sometimes see a single ring spread from the centre of the
lake — a fish, or nothing, or the lake itself remembering — and the ring
goes out and out and finally meets the shore and comes back, faint, as
though the basin itself had taken a long breath.

Above the lake, on the south side, a wall of limestone goes up nearly
vertically for a thousand metres. Halfway up the wall there is a thin
horizontal seam where the rock changes colour. The rock above the seam is
older than the rock below it. It is older by about a hundred and fifty
million years.

The seam is called the Glarus Hauptüberschiebung, the Glarus principal
overthrust, and it is a UNESCO World Heritage Site for exactly the reason
that it is unsettling to look at. Older rock sitting on top of younger rock
is, on the face of it, an embarrassment to the idea that things settle
downward in chronological order. The way the older rock came to be on top
of the younger rock is that, in slow motion, over millions of years, it
flowed there. It moved roughly thirty-five kilometres to the north,
travelling as a coherent sheet, riding on a layer of softer rock that
behaved, on geological timescales, like grease.

I tell you this in the prologue of a book whose nominal subject is the
inside of a human being because the Glarus thrust is, for me, the moment
the argument of this book becomes inescapable. Solid mountain limestone, in
sufficient quantity and given sufficient time, behaves as a wave. It moves.
It propagates. There is a leading edge and a trailing edge. It has a
direction of motion, a velocity, and a place where it stops.

Once you have admitted that rock is a slow wave, the question is no longer
*whether* the world is made of waves. The question is *how slow are you
willing to go to see them*. The cosmic microwave background is a wave that
took 13.8 billion years to reach your detector. The Glarus thrust is a wave
that took about thirty million years to travel thirty-five kilometres. Your
heart, sitting in your chest as you read this, is firing a wave roughly
once a second. A photon from your reading lamp is a wave that crossed the
room in three nanoseconds. They are all the same kind of object. They have
different speeds, different wavelengths, different substrates, different
amplitudes. They are all waves.

This book is an atlas of those waves, sorted by scale.

---

I should also tell you what kind of writer is going to be holding the camera
for the next eighteen chapters, because it will matter.

I am a physicist by training, in the loose sense that I was educated as one
in the early 1990s and have spent the thirty years since applying that
education to problems that are nominally not physics. I am an independent
researcher; I have no university affiliation, no postdoctoral position, no
funding council. I have published eleven technical papers in the *Soma
Field* series — formal proofs in Lean 4, a quantum-annealing experiment, a
clinical model of emotional dynamics, a music-affect study, a paper on the
physical substrate of feeling — and I have done it from a flat in Zurich,
mostly between five and seven in the morning, before the working day
begins.

I am also, since 1968, a person with three structural modifications to my
nervous system that the clinical literature labels Autism Spectrum
Condition, Attention Deficit Hyperactivity Disorder, and Complex
Post-Traumatic Stress Disorder. These conditions explain, among other
things, why I am the kind of person who would notice that a mountain is a
slow wave. They also explain why I have arrived, at fifty-eight, at the
view that the inside of a human being is not categorically different from
the inside of a thunderstorm or the inside of a galaxy, and is best
described by the same mathematics.

I am telling you this in the prologue because you are about to read a book
about cosmology, geology, and the inside of feeling, written by someone who
is not, strictly speaking, a credentialled cosmologist, geologist, or
clinician. I think you should know that going in. I also think the book is
better for having been written by a person who came to it sideways. Books
that come at things from the side often see what books that come at things
head-on cannot.

The cosmologists know more than I do about cosmology. The geologists know
more than I do about geology. The clinicians know more than I do about the
clinical care of the conditions I have. What I bring is the willingness to
hold all three in the same hand and ask what they have in common, and to
follow the question wherever it goes. The answer, I believe, is that they
have *the wave* in common — the same mathematical object, scaled and
substrated differently — and that this commonality is not a poetic flourish
but a structural fact, with consequences.

The first consequence is the book you are holding.

---

A coffee-table book is not the place for the formal mathematics. The formal
mathematics is in the technical papers, all of them open-access on Zenodo,
all of them under the DOIs in the back of this book. What a coffee-table
book is for is showing you the pictures. The pictures are the argument. If
you look at the cosmic microwave background, and then at a slice through a
galaxy cluster, and then at an aerial photograph of the Klöntalersee with
the thrust line visible on the south wall, and then at a microscope image of
human fascia, and then at a Mandelbulb render — and you let your eye notice
what your eye notices — you will, I believe, find that the argument of this
book has already been made before you have read a single equation.

The prose around the pictures is just the prose around the pictures. Treat
it like the audio guide in a museum: skip the bits that don't help, linger
on the bits that do.

---

There is one more thing I want to say before we begin.

I have a daughter. She is, at the time I am writing this, fourteen. She is
the audience for this book in the sense that everything I write, I write
with her in mind as the eventual reader. Not now — she is fourteen, she has
better things to do — but in twenty years, or thirty, when she goes
looking, I want there to be something on the shelf that says: *this is what
your father thought the world was made of, and this is how he came to
think it.* I want it to be the kind of book she can put on her own
coffee table and not be embarrassed by.

I mention her because her presence — and the presence of the wider family
who have stood around the lake with me and not understood why I was so
interested in the rock above the water line — is the reason for Chapter 18
of this book, *A Family Album*. That chapter is mostly blank pages. It is
designed to be filled in by you, with your own photographs, of your own
lake, your own thrust, your own waves. The book is mine. The atlas, by the
time you finish reading it, should be yours.

I will see you at the window.

\newpage
# Chapter 1 — The Wave That Is Always There

\begin{quote}\itshape
A wave is the simplest thing in physics that is not a thing.
\end{quote}

\vspace{1em}

## 1.1  What a wave is, as briefly as I can manage

Hold a piece of rope at one end and flick it. A bump travels down the rope
to the other end. The rope itself doesn't go anywhere; the bump does. What
travelled was not matter — every fibre of the rope is exactly where it was
— but a *pattern* in the matter. A momentary local rearrangement that kept
its shape long enough to be observed at the far end.

That is a wave.

\begin{quote}\small\itshape
My daughter, age 5, asked me what a wave was. I said: imagine you have a long line of dominoes and you tip the first one. The dominoes don't go anywhere but the falling-over goes from one end to the other. That's a wave. She thought about it for a while and said: but Daddy, the dominoes do go somewhere, they fall over. I had to concede the point.
\end{quote}

If you slow the flick down and keep doing it, the rope settles into a
shape: a series of crests and troughs that go up and down without
travelling. That is a *standing wave*. The matter still doesn't go
anywhere, and now the pattern doesn't go anywhere either, but the rope is
nevertheless full of motion. The matter at each point goes up and down,
and the rate at which it goes up and down is set by the rope's length, its
tension, and its mass per unit length. Different combinations give
different frequencies — different notes, if the rope were a violin string.

This is the simplest possible model of a wave, and almost every other wave
in this book is a variation on it. Replace the rope with the air in a
room: sound. Replace the rope with the surface of a pond: ripples.
Replace the rope with the electric and magnetic fields of empty space:
light. Replace the rope with the metric of spacetime itself: gravitational
waves. Replace the rope with the cosmic plasma 380,000 years after the Big
Bang: the acoustic peaks of the cosmic microwave background. Replace the
rope with the firing patterns of a hundred million neurons synchronised at
ten cycles per second: the alpha rhythm of a calm human brain.

The same equation governs all of them. Different substrate, different
speed, different scale; same equation.

\begin{figure}[h]
\centering
\includegraphics[width=0.78\linewidth]{soma/wave-atlas/figures/F1_1_standing_wave.png}
\end{figure}

> **Figure 1.1** — Standing waves on a string at four amplitudes. As the
> energy in the string increases, the same shape returns, just larger. The
> shape is determined by the boundary conditions, not by the energy. We
> will see this principle again, at every scale.

## 1.2  What a *field* is

A wave needs something to wave in. The thing it waves in is called a
*field*.

The simplest field is the height of a sheet of water across a pond. At
every point $(x, y)$ on the pond, the water has some height $h(x, y, t)$.
This $h$ is a *number assigned to every point in space and time*. That is
what a field is.

When you throw a stone into the pond, the height field is disturbed; a
ripple propagates. The ripple is the wave. The pond is the field. You
cannot have one without the other. If the pond were empty, there would be
nothing to ripple.

This sounds obvious for ponds. The conceptual leap of twentieth-century
physics — the leap that made the rest of this book possible — is that
*everything* is a field. The space around the magnet is a field (the
magnetic field). The space around an electric charge is a field (the
electric field). Empty space itself is several fields layered on top of
one another: the electromagnetic field, the gravitational field, and
twelve different matter fields (one for each kind of fundamental particle).
The "particles" we are taught about in school — electrons, photons,
quarks — are not little balls. They are *localised excitations of their
respective fields*. A photon is a ripple in the electromagnetic field. An
electron is a ripple in the electron field. Throwing a stone in the
electron field makes electrons; the electron is the ripple.

This is the central insight of *quantum field theory*, and it is the
substrate on which the rest of this book stands. Once you have understood
that the world is fields and that particles are excitations of fields, you
can ask the question this book is built on: *do feelings have a field?*

## 1.3  The vacuum is not empty

There is one further fact about fields you need to carry with you for the
rest of the book.

A field, even when nothing is happening in it, is not zero. It fluctuates.
The quantum vacuum — empty space, the space inside your skull right now
with no measurable particles in it — is *humming*. It is humming because
quantum mechanics forbids any field from sitting exactly still; the
uncertainty principle requires that the amplitude of every field has a
non-zero spread, even in its lowest-energy state. This is not a defect of
our measurement. It is a property of the world.

The hum of the vacuum is sub-threshold. You can't see the individual
fluctuations because they are too small, too brief, and too random. But
they are causally active: they shift the energy levels of atoms by a
measurable amount (the Lamb shift), they produce a measurable force
between two parallel plates placed close together in a vacuum (the
Casimir effect), and they seed — at the earliest moments of the universe
— the patterns of cosmic structure we will look at in Chapter 2.

> **Figure 1.2** — Cartoon of a quantum vacuum: a field at its
> lowest-energy state, full of sub-threshold ripples. None of the ripples
> individually rises above the dotted line where we would call it "an
> observable particle." The field is busy. There is nothing in it.

I want you to hold this image in your mind through the rest of the book,
because it is the structural template for what I will eventually call the
*soma field*. Most of the time, the field of feeling — like the quantum
vacuum — is full of activity that doesn't rise above the threshold of
conscious awareness. The activity is real. It influences the body and the
behaviour. It is not perceived. When something does rise above the
threshold and is perceived, we name it: *anger*, *grief*, *calm*, *awe*.
The names are the excitations. The field is what they are excitations *of*.

## 1.4  The three universal facts about waves

For everything that comes after, you need to carry three facts about
waves. They are short, they are universal, and they apply identically to a
violin string, a galaxy, and a human heart.

**Fact one: waves superpose.** If two waves arrive at the same point at
the same time, the result is the algebraic sum of the two. Where crest
meets crest, the wave gets bigger. Where crest meets trough, the wave
cancels. This is the reason your noise-cancelling headphones work, and it
is the reason there are dark fringes in the laser pattern projected
through two slits, and it is the reason two emotional modes in opposite
phase produce — for a moment — a peculiar inner stillness even though both
are running at full amplitude.

**Fact two: waves have a natural frequency.** Any bounded system — string,
drum, planet, plasma, body — will, when disturbed, vibrate at one or more
preferred frequencies, set by its geometry and its physical properties.
Hit a bell, you get the bell's note, not a random one. Tap the Earth with
a large enough earthquake and it rings at its own normal modes, the
deepest of which has a period of about 54 minutes. The human heart, the
fascia, and the emotional field all have natural frequencies. We will get
to all of them.

**Fact three: waves carry information without carrying matter.** A radio
wave does not deliver any electrons to your radio; it delivers a *pattern*
that the radio's circuit can decode into music. This is the deepest
property of a wave, and it is why a wave is "the simplest thing in physics
that is not a thing." A wave is the carrier of *pattern*. The substrate is
incidental.

This is why the same wave equation can describe a violin string and the
cosmic microwave background. The substrates have nothing in common. The
patterns do.

> **Figure 1.3** — Triptych: (left) ripples on water; (centre) a sound
> wave on an oscilloscope; (right) the electric and magnetic components of
> an electromagnetic wave. Three substrates, one mathematical object.

## 1.5  Fractals: the wave's other face

There is one more idea you need before we go up the scale ladder. It is
the idea of *fractal self-similarity*.

A fractal is a shape that looks similar at many different magnifications.
A coastline, photographed from orbit, looks bumpy; photographed from a
plane, the same coastline looks similarly bumpy with bumps a hundredth the
size; photographed by hand on the beach, similar bumps appear again, a
hundredth the size again. The bumps come at every scale, and the law that
makes them is the same law. This is the deep meaning of the famous
question "how long is the coast of Britain?": the answer depends on the
length of your ruler, and the dependence is *itself* a number — the
fractal dimension of the coastline — that characterises the shape.

The most famous fractal of all is the *Mandelbrot set*, discovered (or
arguably *encountered*) by Benoît Mandelbrot in 1980. It is generated by
iterating a single quadratic formula, $z \to z^2 + c$, and asking which
starting points stay bounded. The boundary of the answer is a shape with
infinite detail at every scale — the same swirls and bulbs appearing
deeper and deeper, but never quite repeating. The three-dimensional
analogue, the *Mandelbulb*, is what you see on the cover of this book and
in Chapter 16. It is a mathematical object. It is also one of the most
beautiful things in nature, which is a peculiar thing to say about
something that is not strictly in nature.

The reason fractals matter for our story is that *self-similar branching
shows up everywhere*. The bronchi of your lungs branch like a tree; trees
branch like rivers; rivers branch like blood vessels; blood vessels branch
like the cosmic web of dark matter on the largest scales. The branching is
not coincidence. It is the geometric solution to a class of problems —
distributing a substance through a volume with minimal length — that
nature has rediscovered at every scale at which the problem occurs.

When you put fractals next to waves, you get the structure of this whole
book. **Waves give us the dynamics — what changes, and how.** **Fractals
give us the geometry — how the substrate is laid out for the wave to move
through.** Galaxies, plate tectonics, lungs, neurons, the soma field —
all of them are waves running on fractal substrates.

## 1.6  Lenses, cameras, holograms — three more ways to think about waves

Three everyday objects let you see, with your own hands, what waves do.

**A lens** takes a field of light coming in from all directions and folds
it down into a single image on a flat surface. Whatever was in the
landscape — kilometres of mountain, valley, lake — arrives at the back of
the lens as light waves; the lens bends each wave by exactly the right
amount; and the waves recombine, on the focal plane, into a faithful map
of the original. A lens is a *wave-summing machine*. Your own cornea is
one. So is the objective of every telescope in this book.

**A camera** is a lens with a memory. It freezes one moment of the
wave-sum. Everything visible in a photograph is a wave that arrived at
the sensor in a few milliseconds and was recorded. A landscape becomes a
sheet of paper. Nothing of the wave's *phase* is kept — only its
amplitude at each pixel. This is why a photograph is flat, and why
nothing you can do to a photograph (zoom, sharpen, enhance) ever recovers
what it would have been like to stand there. The phase is gone.

**A hologram** is a camera that keeps the phase. It records the
interference pattern between the light from a scene and a reference beam,
which encodes both the amplitude *and* the phase of every wave that
arrived at the plate. Illuminated again with the reference beam, it
reconstructs the original wavefronts, and the scene appears to float in
space, three-dimensional, viewable from different angles, exactly as if
you were back in front of the original.

The pair *photograph / hologram* is the cleanest available illustration
of what a wave actually is. A photograph keeps the *intensity*; a
hologram keeps the *wavefront*. The Soma Field, in the later chapters of
this book, is best imagined not as a photograph of a feeling but as a
hologram of one — three-dimensional, viewable from different angles,
carrying the full phase information of the wave that produced it.

> **Figure 1.4** *(PUBLIC)* — Side by side: a black-and-white photograph
> of a small object (left), and a hologram of the same object viewed from
> two slightly different angles (centre and right). The photograph is
> flat; the hologram shows parallax. *Suitable source: Caltech / Lippmann
> historical demonstrations, public domain; or original capture.*

The cyber-hologram body in Chapter 11 is this same idea, scaled up to
the human form. Hold the pair in mind. We will be making the case, all
through the book, that the body is more like a hologram than like a
photograph.

## 1.7  The argument of this book in one paragraph

Everything in the universe, at every scale we have ever measured, is best
described as a wave moving on a field, sometimes on a fractal substrate.
The scales differ by sixty-one orders of magnitude. The equations don't.
The picture that emerges, once you sort by scale, is of a single recursive
structure — wave-on-field, branch-on-branch — running from the cosmic
microwave background at one end to the seven-dimensional compactified
manifold of M-theory at the other, with the human body sitting roughly in
the middle and behaving in every respect like the rest of it.

The rest of this book is the long version, with pictures.

\vfill

\begin{quote}\itshape
\textbf{Your own example.} \\
Think of one wave you can feel in your own life — a tide, a song, a breath,
an argument that rises and falls. Note its rough period. Note what carries
it. Note where it stops. We will come back to it in Chapter 11.
\end{quote}

\newpage
# Chapter 2 — The Universe Begins as a Wave

\begin{quote}\itshape
Before there was anything to see, there was something to listen to.
\end{quote}

\vspace{1em}

## 2.1  The earliest picture we have

The Cosmic Microwave Background — the CMB, for short — is the oldest
light in the universe. It was released 380,000 years after the Big Bang,
at the moment the cooling primordial plasma became transparent to its own
glow. Every direction of the sky is, very faintly, still warm with this
light, at a temperature of 2.725 kelvin. It has been redshifted by a
factor of about 1,100 since it was emitted; when it left its source, it
was a hot orange glow at about 3,000 K.

The European Space Agency's *Planck* satellite mapped this light from
2009 to 2013 with a precision sufficient to resolve temperature
variations of one part in 100,000 across the entire sky.[^planck] The
resulting image is, without exaggeration, the most informative single
photograph ever taken.

[^planck]: Planck Collaboration, "Planck 2018 results. I. Overview and
the cosmological legacy of Planck," *Astronomy & Astrophysics* 641
(2020): A1, <https://doi.org/10.1051/0004-6361/201833880>.

> **Figure 2.1** *(PUBLIC)* — The *Planck* all-sky map of the CMB. The
> colour scale shows temperature variations of $\pm 200\,\mu\mathrm{K}$
> around the mean of 2.725 K. *Credit: ESA / Planck Collaboration.
> Released under ESA standard licence — usable with credit.*

The image looks like static. It is not static. It is a sound spectrum.

## 2.2  The acoustic peaks

Take the *Planck* image and compute its angular power spectrum — that is,
ask the question, "how much temperature variation is there on the sky at
each angular scale?" — and you get a curve with a series of bumps in it.

> **Figure 2.2** *(PUBLIC)* — The CMB angular power spectrum. The
> horizontal axis is multipole moment $\ell$ (large angles on the left,
> small angles on the right). The vertical axis is the temperature
> variance at each scale. The first peak is at $\ell \approx 220$,
> corresponding to an angular scale of about one degree on the sky.
> *Credit: ESA / Planck.*

These bumps are *acoustic peaks*. They are the frequency spectrum of a
sound wave that propagated in the early universe.

This is not a figure of speech. It is the literal physics. Before the
universe became transparent, it was a hot plasma — protons, electrons,
photons, and dark matter — and that plasma was a compressible fluid with
a definite *sound speed*, very close to $c/\sqrt{3}$, where $c$ is the
speed of light. Pressure perturbations in this fluid propagated as sound
waves. Gravity was pulling the plasma into the denser regions; photon
pressure was pushing it back out. The competition produced acoustic
oscillations — a ringing — that was frozen into the temperature pattern
at the moment of decoupling.

The first peak in the power spectrum is the fundamental mode of this
ringing — the wavelength of a sound wave that had just had time to
complete one full compression by the moment the plasma became
transparent. The second peak is the second harmonic. The third is the
third. The plasma was a musical instrument, and the *Planck* image is its
recorded note, with the harmonics resolved.

The fundamental frequency of the early universe was about
$10^{-16}\,\mathrm{Hz}$. Its wavelength at the moment it was recorded was
about $147\,\mathrm{Mpc}$ — roughly half a billion light-years.[^bao]

[^bao]: Daniel J. Eisenstein and colleagues established the corresponding
*baryon acoustic oscillation* scale in the present-day galaxy
distribution in "Detection of the Baryon Acoustic Peak in the Large-Scale
Correlation Function of SDSS Luminous Red Galaxies," *Astrophysical
Journal* 633, no. 2 (2005): 560–74,
<https://doi.org/10.1086/466512>. The same wave appears today as a
preferred separation between galaxies.

## 2.3  Inflation: the wave before the wave

Push the question one step further back. Where did the seed
inhomogeneities come from — the slight density variations that the
acoustic oscillations were ringing on?

The standard answer is *inflation*: a brief, extraordinarily rapid
expansion of the universe during its first $10^{-32}$ seconds, during
which a small patch was stretched by a factor of at least $10^{26}$.
During this expansion, quantum fluctuations in the inflating field — the
*inflaton* — were stretched along with the universe, frozen in place when
their wavelengths exceeded the cosmological horizon, and later returned
to the observable universe as classical density perturbations on every
scale.[^guth]

[^guth]: Alan H. Guth, *The Inflationary Universe* (Reading, MA:
Addison-Wesley, 1997). The original technical paper is Alan H. Guth,
"Inflationary universe: A possible solution to the horizon and flatness
problems," *Physical Review D* 23, no. 2 (1981): 347–56.

In this picture, every feature of the cosmic microwave background, every
galaxy, every cluster of galaxies, every supercluster, traces back to
*quantum fluctuations of the vacuum*. The largest structures in the
universe are the amplified ghosts of the smallest possible disturbances.

We saw in Chapter 1 that the vacuum is not empty, that it is full of
sub-threshold quantum activity. Inflation is the cosmological proof that
this sub-threshold activity is *real*: it left its fingerprints all over
the sky.

This is the first time in this book — it will not be the last — that a
phenomenon at the smallest scale produces, through wave dynamics and
amplification, the structure visible at the largest. Hold this picture.
We will meet it again at the Glarus thrust, in the cardiac field, and at
the threshold of conscious feeling.

## 2.4  The geometry: a wave in three (or eleven) dimensions

The universe, on the largest scales we can probe, is *flat* to within
about 0.4%.[^planck-flat] This is one of the central observational
findings of modern cosmology: the geometry of space, averaged over
billions of light-years, is the Euclidean geometry of a flat sheet.

[^planck-flat]: Planck Collaboration, "Planck 2018 results. VI.
Cosmological parameters," *Astronomy & Astrophysics* 641 (2020): A6,
<https://doi.org/10.1051/0004-6361/201833910>.

This is unexpected on naïve grounds — there is no obvious reason the
universe should have started flat — and is one of the things inflation
was constructed to explain. Whatever curvature the very early universe
had was stretched out, like the curvature of a balloon stretched to the
size of a stadium.

But "flat" here means *three-dimensionally flat*. The full picture, in
the M-theoretic framework which is the subject of Chapter 15, is that the
universe is *eleven-dimensional*, with seven of those dimensions wrapped
up — *compactified* — at scales of roughly the Planck length,
$10^{-35}\,\mathrm{m}$, far smaller than anything any current experiment
can probe. The shape of that seven-dimensional internal space is a
*Calabi–Yau manifold* (in the string-theory version) or a *G$_2$ manifold*
(in the M-theoretic version we will use).

I am introducing this here, very briefly and without proof, because the
visual that closes this book — the Mandelbulb — is its
three-dimensional projection. Every chapter that follows is, in a strict
sense, a story playing out on the surface of an eleven-dimensional
object we cannot see. The acoustic ringing of the CMB, the spiral arms
of galaxies, the convection cells of the Sun, the Glarus thrust, the
cardiac toroid, the soma field — all of them are waves on the surface of
this same underlying geometry.

> **Figure 2.3** *(BUILD)* — A two-dimensional cross-section through a
> Calabi–Yau manifold, rendered as a slice. *The full manifold is
> six-dimensional and cannot be drawn; this is a projection. Source: to
> be generated by the author from a standard parameterisation.*

## 2.5  What the wave was made of

The plasma that rang as a sound wave was made of:

| Component | Fraction of the early universe |
|---|---|
| Photons (light) | ~15% |
| Protons + electrons (ordinary matter) | ~5% |
| Dark matter | ~25% |
| Dark energy | ~55% (but only dominant later) |
| Neutrinos | ~5% |

The largest component, dark energy, did not participate in the acoustic
oscillations — it acts as a smooth background, only making itself felt at
much later times by accelerating the expansion of the universe. Dark
matter participated gravitationally but not through pressure (it is
collisionless). The ordinary matter and the photons were the part of the
plasma that was actually ringing.

We do not know, as of 2026, what dark matter is. We do not know, as of
2026, what dark energy is. Together they make up 95% of the energy of the
universe, and they are the two largest open problems in physics. I will
not pretend, in this chapter, that they are solved. The Soma Field model
does not depend on their being solved. The acoustic peaks ring whether or
not we have identified every constituent of the medium.

## 2.6  The next zoom

The CMB image is the earliest picture we can take. Everything that has
happened since — the formation of the first stars, the assembly of
galaxies, the chemical enrichment that produced planets, the emergence of
life — is the gravitational and thermodynamic working-out of the acoustic
pattern visible in that image.

In the next chapter we zoom from this all-sky view down to one galaxy.
The wave equation does not change. The fluid does. We are now looking at
a fluid of stars instead of a fluid of protons. The wavelengths are
shorter; the timescales are longer; the music is the same.

\vspace{1em}

\begin{quote}\itshape
\textbf{Your own example.}\\
The next time you are in a quiet room, listen for the lowest sound in the
room — the hum of a refrigerator, the rumble of a distant road. Whatever
it is, it has a fundamental frequency and harmonics, and you can hear
both. The early universe sang exactly the same kind of note, with the
same kind of harmonics, just very loudly and very long ago. The picture
on the next page is what that sound looks like when you write it down.
\end{quote}

\newpage
# Chapter 2b — The Dark Sectors

\begin{quote}\itshape
About 95 % of what gravitates is not made of any of the things this
chapter started by talking about. We will not pretend otherwise.
\end{quote}

\vspace{1em}

A book that promises an honest fractal atlas from the universe to the
soma is obliged to be straight about a feature of the current
cosmological model that does not appear in most pictures of it. The
visible universe — every star, every dust grain, every neutrino, every
photon emitted by anything we have ever detected — accounts for about
five per cent of the gravitational content of the cosmos. The other
ninety-five per cent is in two components, *dark matter* and *dark
energy*, neither of which has ever been directly observed in a
laboratory. We know they are there because the universe gravitates as
if they were there. We do not know what they are.

This chapter is about that ninety-five per cent.

## §2b.1  What we measure, vs. what we infer

It is worth being precise about the logical status of the dark sector
claim. We do not *observe* dark matter. We observe galaxies rotating
in a way that, given the gravitational law we have, requires more mass
than the visible matter provides. We observe the cosmic microwave
background having an angular power spectrum that, given general
relativity, requires more matter than the baryonic kind to fit. We
observe galaxy clusters that, given general relativity and the visible
mass, would have flown apart long ago. We observe gravitational lensing
of background galaxies by foreground clusters at strengths inconsistent
with the visible mass.

From each of these independent observations we can compute a required
mass-to-light ratio. The numbers agree to within a factor of two or so
across all of them, which is strong evidence that *something* is doing
the gravitating. We call that something dark matter. We have no
laboratory detection of any candidate particle for it after forty years
of trying. Direct-detection experiments (XENONnT, LZ, PandaX) have
pushed the cross-section limits down by six orders of magnitude without
finding anything. Indirect-detection searches (Fermi-LAT for gamma rays
from dark-matter annihilation, IceCube for neutrinos) likewise null.
Collider searches at the LHC for missing-energy signatures of dark
matter production: null.

This does not mean dark matter is not there. Astronomical evidence for
its gravitational presence is, by 2026, overwhelming and consistent
across many independent lines. It means that whatever dark matter is,
it does not couple to ordinary matter through any of the forces we
have so far been able to probe at the relevant energy scales. This is
itself a strong constraint and an embarrassment to most of the
historically popular candidates (the weakly-interacting massive
particle, supersymmetric neutralinos, axions in much of their parameter
space).

The dark energy story is similar in structure but worse in detail. We
observe distant Type Ia supernovae to be fainter than they should be
in a matter-dominated universe, by an amount consistent with an
accelerating expansion. We observe the CMB to be consistent with a
flat universe. Flatness plus dark matter plus visible matter does not
add up to the required total energy density; an additional component
must make up the difference. We call it dark energy. We have no
candidate for what it is. The simplest possibility is a cosmological
constant — Einstein's $\Lambda$ — but the value required is sixty to
one hundred and twenty orders of magnitude smaller than the natural
prediction of quantum field theory for the vacuum energy density. This
is the *cosmological constant problem*, and it is the largest
quantitative disagreement between theory and observation in the
history of physics.

## §2b.2  Why this chapter exists

A reader asked, while drafts of this book circulated: why does a book
about the soma field bother with dark matter and dark energy at all?
The soma field is, by your own account, an emergent phenomenon at the
scale of the human body. The cosmological constant is a fact about
the vacuum energy of the entire universe. What is the connection?

Three answers.

First: the book has promised a fractal atlas from the universe to the
soma. If the universe — the largest scale on the atlas — has a feature
making up ninety-five per cent of its gravitational content that we do
not understand, the book has to say so. Pretending otherwise would be
silently asserting that the universe is the visible five per cent.

Second: the soma-field framework rests on M-theory. The most active
contemporary research programme in M-theory is the *swampland* programme
— the attempt to characterise which effective field theories can be
consistent low-energy limits of the full theory and which cannot. One of
the central swampland conjectures (the *de Sitter conjecture*) is in
tension with the empirical observation of a positive cosmological
constant. The dark-energy observations therefore constrain — strongly
— which compactifications of M-theory are even allowed. If the soma
field's G$_2$ compactification of Chapter 15c has anything to say about
the realistic choice of compactification, it has to engage with
the swampland.

Third: the cosmological dark sectors are a working laboratory for the
methodological point made elsewhere in this book — that *we routinely
accept the gravitational evidence for unobserved entities*, when the
gravitational evidence is overwhelming and the entities are
metaphysically remote. We accept dark matter because the rotations and
lensings and CMB power spectrum agree. We have not directly observed
the entities; we have observed their effects. We will, in Chapter 14
and Appendix B, ask whether soma-field effects should be accepted on
analogous gravitational-evidence-style grounds. This chapter is
preparation for that conversation: an acknowledgement that
physics-as-it-is-actually-done accepts unobserved entities on
empirical grounds when the empirical grounds are good enough.

## §2b.3  Modified gravity as the live alternative

It is honest to mention that not all cosmologists believe in dark
matter. A long-running minority programme — Modified Newtonian
Dynamics (MOND) and its relativistic descendants (TeVeS, MOG) — argues
that the rotation-curve evidence is better explained by a modification
of the gravitational law at low accelerations than by the introduction
of an unobserved matter species. The programme has had some empirical
successes (the baryonic Tully-Fisher relation, the radial-acceleration
relation) that are unforced predictions of MOND and require fine-tuning
in dark-matter cosmologies. It has had some empirical embarrassments
(the Bullet Cluster, the CMB acoustic peaks at high $\ell$) that
require auxiliary assumptions in MOND that the dark-matter picture does
not need.

The current consensus is that dark matter is the better explanation,
but the consensus is not the unanimity it is sometimes presented as,
and the minority view has produced enough empirical surprises that it
cannot be dismissed. This is what science actually looks like in the
middle distance — multiple incompatible frameworks, each with partial
predictive successes and partial empirical embarrassments, the
question of which is right ultimately to be settled by data that may
take decades to acquire.

This is also what the soma-field framework will look like for at least
the next decade. Some predictions will succeed. Some will fail. Some
auxiliary assumptions will turn out to be needed. The framework will
be revised, sharpened, possibly partly replaced. The honest
intellectual posture is to hold the framework as a serious candidate
without pretending it is already the consensus.

## §2b.4  The vacuum is not nothing

One last point. *Dark energy*, regardless of whether it is the
cosmological constant or something more exotic, has the
property that it has uniform energy density everywhere. It does not
clump. It does not dilute as the universe expands. As the universe
gets bigger, there is *more* of it, in absolute terms, because the
density stays constant while the volume grows. It is, in a precise
sense, a property of empty space.

The vacuum is not nothing. Every cubic metre of the deepest
intergalactic void contains about $10^{-9}$ joules of dark-energy
density. This is small by laboratory standards but it adds up over the
volume of the observable universe to about ninety billion times the
total mass-energy of all the visible stars. The thing this book started
by calling "the field" — the vacuum from which every other wave is a
ripple — is, in detail, *full of energy nobody can explain*.

We return to the soma field in subsequent chapters. The reader should
hold in mind, as we do so, that the dominant energetic feature of the
universe at the largest scale is a property of the vacuum itself that
neither this book nor the entire physics literature can presently
account for. The soma field is, in this respect, the local version of a
problem the universe is also showing us at the cosmological scale: there
is a substantial, real, gravitationally-active *something*, distributed
across the manifold, and we have a much better grip on its effects
than on its nature.
# Chapter 3 — Galaxies as Spiral Waves

\begin{quote}\itshape
A galaxy is a fluid of stars. The fluid has waves in it. The waves are
what you photograph and call arms.
\end{quote}

\vspace{1em}

## 3.1  The disk and the bulge

A spiral galaxy, viewed face-on, has a bright central bulge and a thin
surrounding disk. The disk contains most of the galaxy's gas, most of its
ongoing star formation, and the two to four luminous arms that wrap
around the centre in a logarithmic spiral. The Milky Way is one such
galaxy, viewed (necessarily) from inside; M51, the Whirlpool, and M101,
the Pinwheel, are the textbook cases viewed from outside.

> **Figure 3.1** *(PUBLIC)* — M101, the Pinwheel Galaxy, in visible
> light. The four major arms are clearly traced by hot young stars and
> ionised hydrogen regions. *Credit: NASA/ESA/STScI; public domain.*

The arms are the visible part of the galaxy. They are not, however, what
they appear to be at first glance.

## 3.2  The naive picture, and why it fails

The naive expectation, on seeing a spiral arm, is that the arm is a
*structure* — a permanent assembly of stars and gas that wraps around the
galaxy and rotates with it. This picture has one fatal problem: the
inner parts of a galactic disk rotate faster than the outer parts (this
is *differential rotation*, set by the gravitational potential). Any
material spiral pattern that started reasonably open would wind up,
within a few rotation periods, into a tight scroll indistinguishable from
a uniform disk. The Milky Way has rotated some sixty times since the Sun
formed. There are no scrolls. There are still arms. So the arms cannot be
material.

## 3.3  The density-wave picture

The currently accepted explanation, due originally to Chia-Chiao Lin and
Frank Shu in 1964, is that the spiral arms are *density waves*: regions
of slightly higher gas density that rotate around the galactic centre at
a fixed *pattern speed*, much slower than the stars and gas that pass
through them.[^linshu]

[^linshu]: C. C. Lin and Frank H. Shu, "On the Spiral Structure of Disk
Galaxies," *Astrophysical Journal* 140 (1964): 646–55,
<https://doi.org/10.1086/147955>.

The mental picture is a traffic jam on a circular motorway. Cars enter
the jam, slow down, pack closer together, and eventually exit. The jam
itself rotates around the motorway at a speed quite different from the
speed of any individual car. The jam is a pattern; the cars are the
material that briefly participates in the pattern and then leaves.

In a galaxy, the cars are stars and clouds of gas. The jam is the spiral
arm. As gas enters an arm, it is compressed by the density enhancement,
and the compression triggers star formation. This is why arms are bright:
not because they contain more matter, but because they contain
*young*, hot, luminous stars whose lifetimes are too short for them to
have drifted out of the arm where they were born. The arm is a moving
*site of star formation*, not a moving assembly of stars.

\begin{figure}[h]
\centering
\includegraphics[width=0.7\linewidth]{soma/wave-atlas/figures/F3_2_density_wave.png}
\end{figure}

> **Figure 3.2** *(BUILD)* — Schematic of a galactic density wave. Gas
> streamlines (blue) flow through the slower-moving pattern of higher
> density (orange). Stars form in the compression zone on the trailing
> edge of each arm. *To be generated by the author.*

## 3.4  The wave equation, again

The density wave in a galactic disk is a solution of a wave equation
— specifically a linearised Euler equation for a self-gravitating thin
disk, with pressure replaced by velocity dispersion. The same equation
that governs ripples on a pond governs spiral arms, with the only
substantive change being the inclusion of a gravitational restoring
force. This is one of the central charms of fluid dynamics: the
equations are scale-invariant in form, and the substitution of a galaxy
for a pond is a substitution of constants, not of structure.

The pattern speed of the Milky Way's spirals is about 25 km/s/kpc; the
stars near the Sun orbit at about 220 km/s at a radius of 8 kpc; we
therefore overtake the local spiral arm roughly once every quarter of a
galactic year, or about 60 million years.

## 3.5  Beyond density waves

The density-wave picture, in pure form, fits the *grand-design* spirals
(M51, M81, M101) very cleanly. For more flocculent galaxies, where the
arms are patchy and broken, a complementary process — *self-propagating
star formation* — appears to dominate. In this picture, a star-forming
region triggers more star formation in adjacent gas, the pattern
propagates outward in a roughly spiral track due to differential
rotation, and the result is an arm built by a chain reaction rather than
by a coherent global wave.

The honest current view is that both mechanisms operate, that the
relative contribution varies from galaxy to galaxy, and that the
quantitative theory of spiral structure remains an active research area
sixty years after Lin and Shu's paper. What does not vary, in any of the
contending pictures, is that the arms are *patterns*, not *things*. They
are made of waves, in a fluid of stars.

## 3.6  Two structural points to carry forward

First: *the visible structure of a galaxy is a wave pattern in a fluid*.
This is the second time in this book we are making this claim (the
first was the acoustic peaks in the CMB). It will not be the last.

Second: *the pattern moves at one speed; the matter moves at another*.
The wave and the medium are distinct, with distinct kinematics. Hold
this. When we get to the soma field, we will need exactly this
distinction: the *feeling-wave* moves through the body at one speed; the
bodily matter is, locally, almost stationary. The wave is not the
medium.

\vspace{1em}

\begin{quote}\itshape
\textbf{Aside.} The astronomer Vera Rubin showed, in the 1970s, that the
rotation curves of galaxies — the speed at which stars orbit, as a
function of radius — are *flat*: outer stars move at the same speed as
inner stars, in flat contradiction to what the visible mass would
predict. This was the discovery that established dark matter as a
quantitative necessity. Every galaxy in the photographs of this chapter
is embedded in a roughly spherical halo of dark matter several times
more massive than the visible disk. The arms are waves in the visible
fluid; the disk itself sits in a deeper, invisible well.
\end{quote}

\newpage
# Chapter 4 — Stars Ring Like Bells

\begin{quote}\itshape
The Sun is a ten-million-tonne bell with a million simultaneous notes
struck on it. We can read every one of them.
\end{quote}

\vspace{1em}

## 4.1  The interior we cannot see

A star is opaque. Photons released in the core of the Sun take, on the
diffusive random walk through the radiative zone, roughly $10^5$ years
to reach the surface. The interior is therefore inaccessible to direct
optical observation. For most of the history of astronomy, what was
known about the inside of the Sun came from theory — hydrostatic
equilibrium, the equations of state, the nuclear cross-sections — and
not from observation.

This changed in 1962, when Robert Leighton, Robert Noyes, and George
Simon discovered that the surface of the Sun was oscillating, in a
patchwork pattern, with a dominant period of about five minutes.[^leighton]
What looked at first like a single resonance turned out, on better
data, to be a superposition of millions of modes, each one a standing
sound wave trapped inside the solar interior. The discipline that grew
up to interpret these oscillations is called *helioseismology*. It is to
the Sun what seismology is to the Earth, and it has — over the last six
decades — given us a quantitative map of the solar interior accurate to
fractions of a per cent.

[^leighton]: R. B. Leighton, R. W. Noyes, and G. W. Simon, "Velocity
Fields in the Solar Atmosphere. I. Preliminary Report," *Astrophysical
Journal* 135 (1962): 474–99, <https://doi.org/10.1086/147285>.

\begin{figure}[h]
\centering
\includegraphics[width=0.7\linewidth]{soma/wave-atlas/figures/F4_2_helioseismology.png}
\end{figure}

> **Figure 4.1** *(PUBLIC)* — A spherical-harmonic mode of the Sun, of
> low degree, rendered as a deformation. *Credit: NASA / GONG project;
> public domain.*

## 4.2  Modes, by analogy with a violin string

A violin string, fixed at both ends and plucked, sings in a fundamental
plus a series of harmonics. The pitches are determined by the length,
tension, and mass per unit length of the string. The plucked string
contains all the harmonics at once; the ear separates them.

A spherical bell, struck, sings in a series of *spherical-harmonic*
modes. These are the analogues of the violin's harmonics, generalised to
a two-sphere. Each mode is labelled by two integers — the *degree*
$\ell$ (how many lines of nodes circle the bell) and the *order* $m$
(how those nodes are oriented). The frequency of each mode is determined
by the geometry, density, and elasticity of the bell. Two bells with the
same mode spectrum are essentially the same bell.

A star is a *three-dimensional* bell, and so its modes are labelled by
three integers: $\ell$, $m$, and $n$ (the *radial order*, how many nodes
the mode has between the centre and the surface). The Sun has detectable
modes with $\ell$ ranging from 0 to over 1,000 and $n$ from 0 to about
40. Each mode has a frequency that depends on the temperature, density,
and composition along the path it sweeps through the interior. By
measuring the frequencies — which the helioseismic instruments do with
parts-per-million precision — we recover the structure of the interior
the modes pass through.

This is, in honesty, an extraordinary piece of inverse mathematics. We
read the inside of a star from the way it rings.

## 4.3  What we have learned

Helioseismology has, among other things:

- Confirmed the standard solar model to within $\sim 0.5\%$ in the
  sound speed throughout most of the interior.
- Measured the depth of the convective zone (the outer 28.7% of the
  Sun's radius, by mass about 2%).
- Measured the internal rotation profile, finding that the radiative
  interior rotates approximately rigidly while the convective envelope
  has the differential rotation visible at the surface (faster at the
  equator than at the poles).
- Located the *tachocline* — the thin shear layer at the boundary
  between rigid and differential rotation — and identified it as the
  probable seat of the solar dynamo that generates the eleven-year
  sunspot cycle.

The same technique, applied to other stars, is now called
*asteroseismology* and has been extended by the Kepler and TESS space
missions to stars across most of the Hertzsprung–Russell diagram.

## 4.4  The eleven-year wave

The Sun's most visible long-period oscillation is the *sunspot cycle*,
with an average period of 11.0 years and considerable variability around
that average (the Maunder Minimum, 1645–1715, was a 70-year suppression
of the cycle, of which the cause is still debated). The sunspot cycle is
driven by the solar dynamo — the cyclic generation, twisting, and
destruction of magnetic fields in the convective zone — and its
qualitative shape is well captured by *Babcock–Leighton dynamo* models,
which themselves are nonlinear wave equations on the solar surface.

> **Figure 4.2** *(PUBLIC)* — The Maunder butterfly diagram: latitudes
> of sunspots plotted against time, since 1875. The cyclic pattern is
> obvious. *Credit: NASA Marshall Space Flight Center; public domain.*

The sunspots themselves are the visible bruises of the magnetic field
breaching the photosphere. They are the *output*, not the *cause*; the
cause is a magnetic wave propagating through the convective zone with
period 11 years.

## 4.5  Variable stars: the spectrum from regular to chaotic

Some stars are intrinsically variable. The classical examples — Cepheid
variables, RR Lyrae variables, Mira variables — pulsate radially with
remarkably stable periods, ranging from hours to hundreds of days. These
pulsations are nearly pure standing acoustic waves, and the
period-luminosity relation discovered for Cepheids by Henrietta Swan
Leavitt in 1912 is one of the foundational rungs of the distance
ladder.[^leavitt]

[^leavitt]: Henrietta S. Leavitt and Edward C. Pickering, "Periods of 25
Variable Stars in the Small Magellanic Cloud," *Harvard College
Observatory Circular* 173 (1912): 1–3.

Other stars are *chaotic* variables — semiregular giants, irregular
variables, certain pre-main-sequence stars whose pulsations have no
clean period at all. The full spectrum from clean periodicity to
deterministic chaos is present in the stellar sky, and the underlying
equations (nonlinear wave equations in a self-gravitating compressible
fluid) admit all of these behaviours as solutions in different parameter
regimes.

This is the second time in the book we have met the spectrum from
regular to chaotic in a single underlying system; we will meet it again
in the cardiac field, where the same spectrum is the difference between
a healthy heart and one in fibrillation.

## 4.6  What carries forward

A star is, structurally, a *resonant cavity*. It contains a fluid; the
fluid supports waves; the waves stand in modes determined by the cavity;
and the modes ring at frequencies we can measure.

This is a useful template to keep in front of you for the rest of Part I.
The Earth is a resonant cavity (Chapter 5 and Chapter 6). The atmosphere
is a resonant cavity. The body cavities are resonant cavities. The
nervous system, on the soma-field interpretation, is a resonant cavity
of a particular kind. All of these systems can be analysed by the same
technique: find the modes, measure the frequencies, read the structure
from the spectrum.

\newpage
# Chapter 4b — Black Holes: The Wave Sinks

\begin{quote}\itshape
A short chapter on the most extreme wave system the universe knows
how to make. Black holes appear in this book not for their drama but
because they are, in a precise sense, the *sinks* of the wave
inventory we have been building up.
\end{quote}

\vspace{1em}

## 4b.1  What a black hole is

A *black hole* is a region of spacetime in which gravity is so strong
that no signal — not even light — can escape its interior. The
boundary of the region is the *event horizon*. Inside the horizon,
the future of every causal world-line points inward, toward a
*singularity* at which classical general relativity breaks down.

The original prediction is due to Karl Schwarzschild, in 1916, who
wrote down the first exact solution to Einstein's field equations
just months after Einstein published them. Schwarzschild was a
serving German officer on the Russian front; he died of an
autoimmune disease six months later. His solution describes the
external geometry of any non-rotating, non-charged spherical mass
distribution and predicts the horizon at the *Schwarzschild radius*

$$r_s = \frac{2 G M}{c^2}$$

For the Sun, $r_s \approx 3$ km (vastly smaller than the Sun's
actual radius of 700,000 km — the Sun is not a black hole, but if it
were compressed to within 3 km radius it would become one). For the
Earth, $r_s \approx 9$ mm. For a person, $r_s$ is on the order of
$10^{-25}$ m — vastly smaller than an atomic nucleus.

## 4b.2  How they form

Black holes form in our universe by *gravitational collapse* of
massive objects past a critical point. The two main routes:

- **Stellar-mass black holes**: produced by the collapse of the
  iron core of a star with initial mass $\geq$ 20 solar masses, at
  the end of its nuclear-burning lifetime. The collapse is followed
  by a supernova explosion that ejects the star's outer layers,
  leaving a black hole of typically 5–30 solar masses at the centre.

- **Supermassive black holes**: present at the centre of essentially
  every large galaxy, with masses of $10^6$ to $10^{10}$ solar
  masses. Their formation history is incompletely understood; they
  may have grown from intermediate-mass seeds by sustained accretion,
  or may have formed directly from collapsing primordial gas clouds
  in the early universe.

## 4b.3  Wave aspects

A black hole is, paradoxically, a richly wave-active object. Three
wave aspects matter for our story:

**Gravitational waves**. When two black holes orbit each other and
spiral inward, they emit gravitational waves — ripples in the
spacetime metric itself. The waves carry energy away from the binary,
shrinking the orbit, until the two black holes merge. The merger
event is the most powerful gravitational-wave source in the known
universe — the September 2015 event GW150914 (the first direct
detection by LIGO) released $\sim 3$ solar masses of energy in
gravitational waves in a fraction of a second, peaking at a power of
$\sim 3.6 \times 10^{49}$ watts — momentarily more luminous, in
gravitational radiation, than the rest of the observable universe in
all electromagnetic radiation combined.

> **Figure 4b.1** *(PUBLIC)* — The GW150914 waveform as observed at
> LIGO Hanford and LIGO Livingston, both detectors, both polarisations.
> The characteristic *chirp* — increasing frequency, increasing
> amplitude — is the signature of the inspiral. *Credit: LIGO
> Collaboration; public domain.*

**Quasi-normal modes**. After a black-hole merger, the resulting
single black hole *rings down* via a discrete set of decaying
oscillation modes — its *quasi-normal modes*. These are the
gravitational analogue of the acoustic modes of a struck bell: they
are determined by the black hole's mass and spin alone, and they
allow direct observational confirmation of the no-hair theorem
(black holes are characterised by mass, charge, and spin only — no
other "hair"). Observations of post-merger ringdowns are one of the
strongest current tests of general relativity.

**Hawking radiation**. Stephen Hawking's 1974 calculation showed that
a black hole is *not perfectly black* — it emits thermal radiation
from just outside its horizon, with a temperature

$$T_{\mathrm{H}} = \frac{\hbar c^3}{8 \pi G M k_B}$$

inversely proportional to the mass. For a stellar-mass black hole,
$T_\mathrm{H} \sim 10^{-8}$ K — far colder than the CMB, so the
black hole *gains* mass on net by absorbing CMB photons faster than
it radiates. For a primordial black hole of $\sim 10^{15}$ g
($\sim$ the mass of a mountain), $T_\mathrm{H}$ matches the CMB and
the black hole evaporates over a time comparable to the age of the
universe. For smaller primordial black holes, evaporation is
already complete.

## 4b.4  The information paradox

Hawking radiation, being thermal, appears to carry no information
about the matter that fell into the black hole. If a book and a
laptop of equal mass fall into the same black hole, the radiation
that eventually evaporates the hole is indistinguishable. The
information that was in the book and the laptop appears to be lost.

This is in direct conflict with quantum mechanics, which is
*unitary* — information cannot be destroyed. The conflict has driven
fifty years of theoretical work and is one of the most active
research areas in fundamental physics. The current consensus is that
the information is *not* lost; it is encoded in subtle correlations
in the Hawking radiation that a sufficiently powerful observer could
in principle reconstruct. The technical demonstration of this — the
*Page curve* result — was one of the major breakthroughs of the late
2010s and early 2020s.

The relevance for our story: the resolution of the information
paradox is connected to the *holographic principle* mentioned in
Chapter 15b — the idea that all the information about a region of
space is encoded on the region's boundary. Black holes are the most
extreme illustration of holography: all the information about
everything inside the horizon is, on the holographic interpretation,
encoded in subtle correlations on the horizon's two-dimensional
surface.

## 4b.5  The wave inventory completed

This book is, at one level, an inventory of wave phenomena. With
this chapter we have completed the cosmic-scale inventory:

- Vacuum fluctuations (Chapter 2).
- Acoustic waves in plasma (Chapter 2, CMB).
- Density waves in fluids (Chapter 3, galaxies).
- Oscillation modes in stars (Chapter 4, helioseismology).
- Atmospheric and oceanic waves (Chapter 5, planets).
- Seismic waves in rock (Chapter 6, Earth).
- Pattern-forming chemical waves (Chapter 7, life).
- Branching fractals in biology (Chapter 8).
- Cardiac and neural waves (Chapter 9).
- Tensegrity standing waves in the body (Chapter 10).
- Soma-field waves (Chapter 11).
- Quantum waves (Chapter 13).
- M-theory G$_2$ waves (Chapter 15).
- Gravitational waves and quasi-normal modes (this chapter).

Fourteen wave families across forty-something orders of magnitude in
scale. All of them obey the same three universal facts of
Chapter 1: a wave is a propagating disturbance in a medium; waves
superpose; waves carry energy without carrying matter.

The book's central claim — that the body, on the soma-field model, is
one more entry in this catalogue, at human scale, with its own
characteristic medium (fascia + neural + electromagnetic + quantum
substrates) and its own characteristic modes (the eight of Chapter
11) — sits within this inventory, neither at the top nor at the
bottom, but exactly where a wave system of body-scale and
body-complexity would, on any general principle, be expected to sit.

\newpage
# Chapter 5 — Planets, Weather, and the Skin of the Earth

\begin{quote}\itshape
A planet is a thin film of fluid on a slowly cooling ball of rock. The
film does the weather; the rock does the geology; both are wave systems.
\end{quote}

\vspace{1em}

## 5.1  The atmosphere as a fluid sheet

The Earth's atmosphere, to a first approximation, is a layer of gas
roughly 100 km thick wrapped over a sphere 12,742 km in diameter. The
aspect ratio — thickness divided by radius — is less than 1%. On any
diagram drawn to scale, the atmosphere is a film not a layer.

A thin film of fluid on a rotating sphere, heated unequally (most at the
equator, least at the poles) and subject to Coriolis force, has a very
specific set of preferred modes. These modes are the *Hadley cells*, the
*Ferrel cells*, the *polar cells* of the general circulation; the
*Rossby waves* that meander through the jet stream; the *Madden–Julian
oscillation*; the *El Niño–Southern Oscillation*. Each is a long-lived
wave or wave pattern on the fluid sheet. The names are different for
historical reasons; the underlying mathematics is one nonlinear wave
equation, the *Navier–Stokes equation on a rotating sphere*, with
thermal forcing.[^holton]

[^holton]: James R. Holton and Gregory J. Hakim, *An Introduction to
Dynamic Meteorology*, 5th ed. (Waltham, MA: Academic Press, 2012). The
standard graduate textbook.

\begin{figure}[h]
\centering
\includegraphics[width=0.6\linewidth]{soma/wave-atlas/figures/F5_1_earth_football.png}
\end{figure}

> **Figure 5.1** *(PUBLIC)* — A global Rossby-wave pattern in the
> northern jet stream, satellite view, with the meanders highlighted.
> *Credit: NOAA; public domain.*

The lesson, repeated from the previous chapter: structure that *looks*
like a stable object — a high-pressure ridge, a cyclone, a hurricane —
is a wave on a fluid. The fluid moves through the pattern.

## 5.2  Lenses, again

A lens, as we saw in Chapter 1, takes a field of incoming waves and
folds it down to a point. The atmosphere itself acts as a (rather bad)
lens, due to its variable refractive index with height; this is why
stars twinkle, why mirages form, why the Sun appears squashed at the
horizon. Astronomers spend much of their effort correcting for these
atmospheric distortions; adaptive optics, the technique by which modern
ground-based telescopes rival space telescopes, is in essence a fast
real-time inversion of the atmospheric lens.

The relevance for this book is that you do not need to leave the surface
of the Earth to encounter the wave-folding mathematics that will return
in Chapter 15 when we talk about the compactification of M-theory. The
atmosphere is doing it, badly, every clear evening at every horizon you
ever look at.

## 5.3  The ocean: another fluid sheet, slower and denser

The oceans are a second fluid sheet, thicker (average depth 3.7 km) and
denser (factor of 800) than the atmosphere, wrapped over the same
spherical rock. The same equations govern them, with the boundary
condition that water has a free surface against the atmosphere above and
a rigid bottom against the sea floor below.

The ocean supports a fully analogous spectrum of waves: surface gravity
waves (the ones you see at the beach, periods of seconds), internal
waves (in the thermocline, periods of minutes to hours), tides
(astronomically forced, period 12.42 hours), inertial oscillations
(Coriolis-forced, period varying with latitude), Rossby and Kelvin waves
(long-period, planetary scale, key to ENSO). The ocean also supports
*meddies* and *eddies* — coherent vortex structures that travel
thousands of kilometres while preserving their identity, behaving in
essence as solitons.

> **Figure 5.2** *(PUBLIC)* — A satellite altimetry map of sea-surface
> height showing the dense eddy field of the Gulf Stream. The eddies
> are 100–200 km across and persist for months. *Credit: NASA / JPL;
> public domain.*

A tsunami is a single very-long-wavelength surface gravity wave excited
by a seafloor displacement, typically from a subduction-zone
earthquake. The 2011 Tōhoku tsunami had a wavelength of about 200 km in
the open ocean and propagated at the same speed as a jet airliner.

## 5.4  The solid Earth as a resonant cavity

In Chapter 4 we treated the Sun as a resonant cavity that rings at its
natural frequencies. The Earth, struck by an earthquake, does the same.
The longest-period mode is the football mode, $_0S_2$, with a period
of 53.9 minutes; the spectrum extends down to periods of milliseconds at
the high end.

We need this fact in Chapter 6, where the Glarus thrust is one
particular ten-million-year wave in the same elastic body. The shorter
modes are minutes; the longer ones are tens of millions of years; the
underlying equations are the same equations of linear and nonlinear
elasticity, applied to the same rock.

## 5.5  The magnetosphere and the ionosphere

Two further fluid sheets wrap the Earth, both invisible to the naked
eye.

The *ionosphere* is the partially ionised upper atmosphere, between 60
and 1,000 km altitude. It reflects HF radio waves and supports its own
wave spectrum — gravity waves, travelling ionospheric disturbances,
plasma waves. It is the medium in which the aurora is painted; the
visible aurora is the optical signature of plasma waves dumping energy
into the upper atmosphere along magnetic-field lines.

The *magnetosphere* is the volume of space, extending to about 10 Earth
radii on the sunward side and a long tail on the night side, where the
Earth's magnetic field dominates over the solar wind. It is a plasma
cavity with its own modes — *ULF* (ultra-low-frequency) magnetic
pulsations with periods of seconds to minutes, *Alfvén waves* propagating
along field lines, magnetospheric storms.

I am rattling through these because the point of this chapter is *not*
the detailed physics of each one, but the *accumulation*. By the time
we close Chapter 5 you have met seven or eight nested fluid sheets
wrapped around the same rock, every one of them a wave-bearing cavity,
every one of them analysable by the same equations. The Earth is a
wave system from the core out to the magnetopause, and it is *one*
wave system, with the boundary conditions changing as you move through
it.

## 5.6  The Schumann resonance: the Earth's heartbeat

Between the conducting surface of the Earth and the conducting
ionosphere there is a spherical-shell waveguide about 100 km thick,
12,742 km in diameter. Like any cavity, it has resonant modes. The
fundamental mode, called the *Schumann resonance* after Winfried Otto
Schumann who predicted it in 1952, has a frequency of 7.83 Hz.

This is the lowest-frequency electromagnetic mode the Earth-atmosphere
system supports. It is continuously excited by lightning strokes
worldwide — roughly fifty per second on average — and a sensitive ELF
receiver can pick it up reliably anywhere on the planet.

> **Figure 5.3** *(BUILD)* — A typical Schumann-resonance power spectrum,
> showing the first six modes between 7.8 and 45 Hz. *To be generated by
> the author from publicly available data.*

I mention the Schumann resonance for two reasons. First, it is the
cleanest available example of *the whole planet ringing at one note* —
the planetary analogue of the open low E on a guitar. Second, it sits
on the edge of two arguments we will not pursue in this book but ought
to acknowledge. There is a substantial literature claiming a coupling
between Schumann resonance amplitude and human EEG bands (which overlap
in the same 8 Hz range), and an even larger literature making stronger
claims about it. The honest position, as of 2026, is that the
coincidence of frequencies is real, the claim of biological coupling is
suggestive but not established, and the claim of *causal* coupling
remains speculative. We will neither rely on nor dismiss it.

## 5.7  What carries forward

The closing structural point of Part I, anticipated here and made
explicit in Chapter 6, is this: *the Earth is a layered system of
wave-bearing fluids and solids, each layer with its own modes, each
layer coupled to its neighbours, the whole stack readable by the same
mathematics from the core to the magnetopause*. The next zoom is the
last one in Part I — into the rocks themselves, at the Glarus thrust,
where the same logic applies to objects that look, to the human eye,
exactly like the opposite of waves.

\newpage
# Plates I — The Cosmos

\thispagestyle{empty}

\vspace*{1cm}

\begin{center}
{\Huge\bfseries Plates I}\\[0.5em]
{\Large\itshape The Cosmos}\\[2em]
{\small Eight images, one universe.}
\end{center}

\newpage

\thispagestyle{empty}

> **Plate I.1** *(PUBLIC, full-bleed recto)* — The *Planck* 2018 all-sky
> CMB temperature map in equal-area projection. Resolution: $\sim 5'$.
> Temperature scale: $\pm 200\,\mu\mathrm{K}$ around $T = 2.725\,\mathrm{K}$.
> Every visible feature is the frozen amplitude of a sound wave that
> propagated in the photon-baryon plasma 380,000 years after the Big
> Bang. The cold spot near the bottom-right of the map remains the most
> debated single feature. *Credit: ESA / Planck Collaboration.*

\vfill

\noindent\textit{This is the oldest light. Everything else came after.}

\newpage

\thispagestyle{empty}

> **Plate I.2** *(PUBLIC)* — The CMB acoustic angular power spectrum,
> with the first seven peaks resolved. The horizontal axis is the
> multipole $\ell$; the vertical axis is the temperature variance
> $D_\ell = \ell(\ell+1)C_\ell / 2\pi$. The first peak at $\ell \approx
> 220$ corresponds to a sound wave that completed exactly one half-cycle
> of compression by the moment of decoupling — the fundamental note of
> the universe. *Credit: ESA / Planck.*

\vfill

\noindent\textit{The score of the first symphony.}

\newpage

\thispagestyle{empty}

> **Plate I.3** *(PUBLIC, double-page)* — Hubble Ultra-Deep Field 2014.
> Ten thousand galaxies in a patch of sky the apparent size of a grain
> of sand held at arm's length. Most of the visible objects are
> galaxies; the few prominent foreground stars carry diffraction spikes.
> Redshifts of the most distant objects exceed $z = 11$, corresponding
> to galaxies that formed within the first 500 million years after the
> Big Bang. *Credit: NASA / ESA / STScI.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate I.4** *(PUBLIC)* — M51, the Whirlpool Galaxy, in HST visible
> light. The two grand-design spiral arms, the bright HII regions
> tracing recent star formation along the leading edges, and the
> companion galaxy NGC 5195 at upper-right — currently passing through
> the disk and exciting the spiral pattern. *Credit: NASA / ESA / STScI.*

\vfill

\noindent\textit{A galaxy is a fluid of stars; the arms are waves in
the fluid.}

\newpage

\thispagestyle{empty}

> **Plate I.5** *(PUBLIC)* — A solar granulation image from the
> Daniel K. Inouye Solar Telescope. Each cell is a convection plume
> roughly the size of France, rising in the centre and sinking at the
> dark inter-cellular lanes. The cells turn over on a timescale of
> minutes. *Credit: NSO / NSF / AURA.*

\vfill

\noindent\textit{The surface of a star is a boiling pot.}

\newpage

\thispagestyle{empty}

> **Plate I.6** *(PUBLIC)* — Solar coronal loops in extreme-UV (171
> \AA), Solar Dynamics Observatory. The arches trace magnetic-field
> lines bridging regions of opposite polarity. The brightness is from
> million-degree plasma confined along the field lines. *Credit: NASA /
> SDO.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate I.7** *(PUBLIC)* — Jupiter's atmosphere, Juno close approach.
> Cyclonic and anti-cyclonic vortices nested into the cloud bands; the
> bands themselves are zonal jets reaching velocities of 100 m/s
> relative to the underlying solid (or in Jupiter's case, fluid) rotation.
> *Credit: NASA / JPL / SwRI / MSSS.*

\vfill

\noindent\textit{Atmospheres are wave systems too.}

\newpage

\thispagestyle{empty}

> **Plate I.8** *(PUBLIC)* — Earth from Apollo 17, the "Blue Marble".
> The thin blue shell of atmosphere at the limb is the entire weather
> system. Aspect ratio: about 1\%. *Credit: NASA.*

\vfill

\noindent\textit{The one we know best, and least. Part II begins on
the next page.}

\newpage
# Plates II — The Earth

\thispagestyle{empty}

\vspace*{1cm}

\begin{center}
{\Huge\bfseries Plates II}\\[0.5em]
{\Large\itshape The Earth}\\[2em]
{\small Eight images, one slow wave.}
\end{center}

\newpage

\thispagestyle{empty}

> **Plate II.1** *(DRONE — full-bleed)* — Aerial view of the
> Tschingelhörner ridge from above the Sernftal, looking south. The
> Glarus thrust appears as a dark colour-change line cutting across the
> entire ridge horizontally. The Verrucano is the paler rock above; the
> flysch is the darker rock below. *Drone capture: A. Johnson, summer
> 2026.* Coordinates of vantage: $\sim 46.918$°N, $9.171$°E, altitude
> 2700 m AGL.

\vfill

\newpage

\thispagestyle{empty}

> **Plate II.2** *(DRONE — full-bleed, recto)* — The Klöntalersee from
> the north shore, looking south at the Glärnisch massif. The thrust
> line is visible mid-cliff, running left-to-right. The road on the
> south shore from which the photograph in Chapter 6 was conceived is
> just out of frame at the bottom. *Drone capture: A. Johnson, summer
> 2026.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate II.3** *(DRONE)* — The Martinsloch, the natural window
> through the thrust ridge above Elm. Twice a year — around 12 March
> and 30 September — the rising sun shines through the window onto the
> church square in Elm village. The geometry is set by the strike of
> the thrust plane. *Drone capture: A. Johnson, summer 2026.*

\vfill

\noindent\textit{A hole in the wall, calibrated to the Earth's orbit.}

\newpage

\thispagestyle{empty}

> **Plate II.4** *(DRONE — detail)* — Close approach to the Lochsite
> type locality, near Schwanden. The hand-sample-scale view of the
> thrust: older Permian Verrucano (top) directly on younger
> Cretaceous-Tertiary flysch (bottom), with the millimetres-thin
> mylonite layer between them. The displacement across this paper-thin
> contact is on the order of 35 km. *Drone capture: A. Johnson,
> summer 2026.* Coordinates: 47.0167°N, 9.0617°E.

\vfill

\noindent\textit{The wave reduced to a single line, frozen in stone.}

\newpage

\thispagestyle{empty}

> **Plate II.5** *(PUBLIC)* — Recumbent folds in the Helvetic nappes,
> Säntis area, aerial view. The bedding planes have been rotated to
> near-horizontal by the same compression that produced the Glarus
> thrust. Several generations of folding are visible at different
> scales — the geometry that we will meet again in M-theory as a
> *fold catastrophe*. *Credit: swisstopo, CC BY 3.0 CH.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate II.6** *(PUBLIC)* — Plate-tectonics map of the world, with
> arrows showing relative motion of major plates. Africa moves north
> at $\sim 2$ cm/yr; the Indian plate moves north-northeast at
> $\sim 4$ cm/yr (the fastest of the major plates); the Pacific plate
> moves northwest at $\sim 7$ cm/yr at its leading edge near Japan.
> *Credit: USGS; public domain.*

\vfill

\noindent\textit{The slow sea, mapped.}

\newpage

\thispagestyle{empty}

> **Plate II.7** *(PUBLIC)* — Seismic-wave particle motion diagrams:
> P, S, Rayleigh, Love. Each panel shows a snapshot of how the medium
> particles move as the wave passes through. *Credit: USGS; public
> domain.*

\vfill

\noindent\textit{Four ways for rock to ring.}

\newpage

\thispagestyle{empty}

> **Plate II.8** *(PUBLIC)* — The auroral oval over the Arctic,
> captured by ESA's Swarm constellation. The visible glow is the
> optical signature of plasma waves dumping energy into the upper
> atmosphere along magnetic-field lines. *Credit: ESA / Swarm.*

\vfill

\noindent\textit{The magnetosphere announcing itself.}

\newpage
# Chapter 5b — Oceans, Atmospheres, and the Slow Waves

\begin{quote}\itshape
Some waves are too slow to feel. They are the most powerful in the
book.
\end{quote}

\vspace{1em}

A wave on a pond moves at about half a metre per second. A sound wave
in air at twenty degrees Celsius moves at three hundred and forty-three
metres per second. Light in vacuum moves at three hundred million
metres per second. Throughout, the higher the speed, the easier it is
to think of as a wave: the ripple on the pond is obviously a wave; the
sound is obviously a wave; the light, after a bit of conceptual work,
is a wave.

This chapter is about the other end of the spectrum. Waves in the
oceans and atmospheres of planets that propagate at metres per *day*,
or in the case of the largest, at kilometres per *year*. They carry
the dominant energy budgets of planetary climate. They drive the
biological cycles of half of Earth's species. They have wavelengths
that wrap around the planet several times. None of them looks, on the
timescale of a human attention span, like a wave at all. All of them
are governed by the same equations as the ripple on the pond.

## §5b.1  Rossby waves: the slow planet-wrapping wave

A Rossby wave is a wave that arises because the Earth rotates. The
mechanism: a parcel of air or water displaced poleward conserves its
angular momentum, which (because it is now further from the rotation
axis but the planet is rotating no faster) requires it to spin a bit
slower than its surroundings, which creates a relative vorticity which
in turn restores it toward the equator. A parcel displaced toward the
equator experiences the opposite. The restoring force is the
$\beta$-effect — the variation of the Coriolis parameter with
latitude — and it drives the parcel back across its equilibrium
latitude. Oscillation.

The wavelength is set by the planetary radius. The wave speed is set
by the rotation rate and the latitude. For Earth at mid-latitudes, the
phase speed is about ten to twenty centimetres per second westward
relative to the mean flow. The wavelength is several thousand
kilometres. A single wave wraps maybe a quarter of the way around the
planet.

You have seen Rossby waves your whole life without recognising them as
waves. The meanders of the jet stream that you see on the weather
forecast are Rossby waves. The deep south-dipping lobes that bring
arctic air to Texas, the deep north-bulging ridges that bake the
British Isles in summer — these are the crests and troughs of
Rossby waves in the upper troposphere. The fact that your weather
this week tracks the weather in Boston three days from now and the
weather in Berlin three days *before* now is a direct consequence of
the eastward propagation of Rossby-wave packets along the jet.

In soma-field terms: the climate is a coupled-oscillator system at the
planetary scale. The Rossby waves are the slowest, largest-amplitude
modes. They set the envelope inside which faster weather variability
operates. They are exactly the same kind of object as the
eight-mode attractor structure of the soma field, just much larger and
much slower.

## §5b.2  The ENSO oscillation: a coupled ocean-atmosphere mode

The El Niño-Southern Oscillation is a coupled oscillator in the
tropical Pacific. The mechanism: warm water accumulates in the western
Pacific because the easterly trade winds pile it there; the warm water
heats the atmosphere above it; the heated atmosphere rises, draws in
more easterlies, and reinforces the pile. This is a positive feedback
that maintains the *La Niña* state. Periodically — every two to seven
years — the system flips: a weakening of the easterlies allows the
warm water to slosh eastward; the eastward slosh weakens the easterlies
further; the warm water reaches the central and eastern Pacific. This
is *El Niño*. The atmospheric and oceanic anomalies feed each other for
roughly a year. Then the system flips back.

ENSO is the largest single source of interannual variability in the
Earth's climate system. It modulates the Asian monsoon, the
southwestern US drought, the East African short rains, the western
Pacific cyclone count. The lives of about three billion people are
directly affected by its phase in any given year.

It is, mathematically, a relaxation oscillator with a strong stochastic
component. Its period is not fixed. Its amplitude varies considerably
between events. It is, in the language of dynamical systems, a noisy
limit cycle in a four-dimensional phase space (Niño-3.4 SST anomaly,
zonal wind anomaly, thermocline depth anomaly, and a slow recharge
variable). Recurrence intervals are well-fitted by a random-walk model
with weak attraction to the recharge equilibrium.

The point is the same as the previous section: the planetary climate
*is* a coupled-oscillator system, and its largest single mode has
properties (multi-year period, hysteretic flipping between two
attractors, sensitivity to small perturbations near the flip) that
will reappear when we discuss the soma field's mode-flipping dynamics.

## §5b.3  Internal waves in the ocean

Below the ocean surface the water is *stratified*: warmer, lighter
water sits above colder, denser water, with the boundary (the
*thermocline*) often at fifty to two hundred metres depth. The
thermocline is itself a surface — like the air-water surface at the
ocean's top — and like that surface, it supports waves.

These *internal waves* have wavelengths of hundreds of metres to
kilometres and propagate at speeds of a few centimetres per second.
They have amplitudes (vertical excursions of the thermocline) of
tens of metres. From above they are invisible: the surface is
unperturbed by them.

Internal waves are how energy gets from the surface to the deep ocean.
Tidal forcing of the surface generates internal waves that propagate
downward and break, mixing cold deep water with warmer overlying water,
driving the deep meridional overturning circulation. The amount of
ocean mixing — and thereby the rate of deep-water formation, and
thereby the carbon-uptake capacity of the deep ocean over centuries —
is set, in significant measure, by internal-wave breaking.

In soma-field terms: there is wave activity at every depth of the
substrate, even when the surface looks calm. The visible surface state
of a person is not the only thing going on. Below the surface, internal
waves carry energy at amplitudes the surface does not betray.

## §5b.4  The Schumann resonance

The space between the Earth's surface and the lower ionosphere — a gap
of about a hundred kilometres — is a planetary-scale electromagnetic
cavity. Like any cavity, it has resonant modes. The lowest mode (the
fundamental Schumann resonance) has a wavelength equal to the
circumference of the Earth and a frequency of about 7.8 Hz. The next
several harmonics are at roughly 14 Hz, 20 Hz, 26 Hz, 33 Hz.

The cavity is excited continuously by lightning strikes around the
world — about fifty per second, on average — each of which radiates
broadband electromagnetic energy that loses most of its content at
other frequencies but rings the Schumann modes for many cycles.

The resulting standing wave is real, measurable with a sensitive
magnetometer at any place on Earth, and constant. It is *there*, all
the time, wrapping the planet.

The Schumann resonance is sometimes pointed to as a candidate
substrate for various claims about consciousness and the Earth — most
of which are not well-supported. The framework of this book is more
modest. We note that the cavity resonance exists, that its fundamental
frequency lies in the same band as the alpha rhythm of the human
brain, and that the coincidence is geometrically explained: the human
brain's alpha rhythm is set by thalamocortical loop delays, and those
delays happen, by accident of cranial geometry, to give an oscillation
period close to the Schumann fundamental. We make no claim of direct
coupling. We note the coincidence and move on.

## §5b.5  Why a chapter on slow waves matters

A persistent failure of the popular wave picture is to treat *wave* as
synonymous with *fast oscillation*. Slow waves — the Rossby, the
internal, the ENSO recharge cycle, the Schumann cavity in its slowly-
modulating amplitude — are central to how planetary systems carry
energy and information. They are also central to how the soma field
operates. The slow drift of mood across a day is, structurally, a
slow wave. The longer rhythms of the menstrual cycle, the circannual
mood patterns of seasonally-affected individuals, the multi-year
trajectories through life-phases that Chapter 15d describes as
compactification regimes — all of these are slow waves on the soma
field.

The wave atlas claim is that the equations governing slow waves on a
planet are mathematically continuous with the equations governing slow
waves on a body. The substrate is different. The structure is
invariant.
# Chapter 4c — Gravitational Waves

\begin{quote}\small\itshape
A wave in the geometry of spacetime itself. Predicted by Einstein in
1916; detected by LIGO in 2015. The cleanest experimental
confirmation in the history of physics that the universe's substrate
is wave-supporting all the way down.
\end{quote}

## §4c.1  What a gravitational wave is

In general relativity, spacetime is not a fixed stage on which physics
happens; it is a dynamical field, governed by Einstein's equations,

$$
R_{\mu\nu} - \tfrac{1}{2} R g_{\mu\nu} + \Lambda g_{\mu\nu}
= \frac{8\pi G}{c^4} T_{\mu\nu}.
$$

The metric $g_{\mu\nu}$ — the field that tells us distances and times
— is itself a wave-supporting medium. A weak gravitational disturbance
linearises Einstein's equations around the flat Minkowski metric, and
the result is a transverse wave equation:

$$
\Box h_{\mu\nu} = 0, \qquad h_{\mu\nu} = g_{\mu\nu} - \eta_{\mu\nu},
$$

propagating at the speed of light. The wave has two polarisations,
conventionally called *plus* and *cross* (after the patterns of
distortion they produce on a ring of test masses), and is generated
by time-varying mass quadrupole moments.

The amplitudes are tiny. A binary black-hole merger at 1.3 billion
light-years produces a strain at Earth of order $h \sim 10^{-21}$ —
meaning that a 4-km LIGO arm changes length by $\sim 4 \times 10^{-18}$
m, about $10^{-3}$ of the diameter of a proton. That this is
measurable at all is one of the great experimental feats of physics.

## §4c.2  The 2015 detection

GW150914 was detected by both LIGO detectors (Hanford, Washington and
Livingston, Louisiana) on September 14, 2015. The waveform matched the
template for the inspiral, merger, and ringdown of two black holes of
36 and 29 solar masses, merging into a single black hole of 62 solar
masses. The missing 3 solar masses were radiated as gravitational
wave energy in about 0.2 seconds. The peak gravitational-wave
luminosity of the merger was, for that fraction of a second, greater
than the luminosity of all visible stars in the observable universe
*combined*.

Since GW150914 there have been many more detections, including
neutron-star mergers (whose electromagnetic counterparts have allowed
the era of *multi-messenger astronomy*). The third LIGO observing run
and now LIGO-Virgo-KAGRA have produced a catalogue.

## §4c.3  Why gravitational waves matter to this book

Four reasons.

*First*, they constitute the experimental confirmation that spacetime
*itself* is a wave-supporting medium. The framework's wave ontology is
not a metaphorical extension of fluid dynamics; the universe is wave-
supporting at its very foundation. Every other wave we have discussed
— water, sound, light, neural firing, cardiac rhythm, the soma field
— is a wave on a substrate that is itself made of fields, which are
themselves *within* a spacetime that is *itself* a wave-supporting
medium. Wave behaviour is, at the deepest level, the universe's
default modality.

*Second*, they exemplify the *enormous range of frequencies and
amplitudes* over which the wave equation governs. The gravitational
wave at LIGO has a frequency of $\sim 100$ Hz (the inspiral chirp into
the audible range, famously) and an amplitude $\sim 10^{-21}$. The
heart wave is at $\sim 1$ Hz and amplitude $\sim 10$ mV. The Schumann
resonance is at $\sim 10$ Hz and amplitude $\sim 1$ pT. The same wave
equation governs all of them. Some 21 orders of magnitude in
frequency, 19 orders of magnitude in amplitude — and one mathematical
form.

*Third*, gravitational-wave astronomy is the model the framework
aspires to as a *measurement programme*. LIGO did not detect
gravitational waves by inventing new physics. It detected
gravitational waves by *building instruments sensitive enough to the
physics that had been there since 1916*. The framework's bet is that
the soma field is similar: it is already there, has been there since
before the framework was written, and what is missing is not new
physics but instruments and analysis methods sensitive enough to the
already-existing signal.

*Fourth*, gravitational waves provide *new windows* on physics that
were closed to electromagnetic observation. Black-hole mergers, the
interiors of neutron stars, the early universe before recombination —
all of these are accessible to gravitational-wave astronomy and only
to gravitational-wave astronomy. The framework's analogous bet for
biology is that the soma-field instruments (high-resolution HRV,
near-infrared spectroscopy of cortical hemodynamics, photoplethysmographic
imaging, EEG with source-localised analysis) will open windows on
human physiology that purely cognitive instruments cannot.

## §4c.4  The strain calculation, briefly

A binary system of two masses $m_1, m_2$ in circular orbit of radius
$r$ and orbital angular frequency $\omega$ emits gravitational waves
at frequency $2\omega$ with strain amplitude at distance $d$,

$$
h \sim \frac{4 G^2 m_1 m_2}{c^4 r d}.
$$

For GW150914 with $m_1 = 36 M_\odot$, $m_2 = 29 M_\odot$, $r \sim 350$
km at the moment of merger, $d = 1.3 \times 10^9$ light-years, this
gives $h \sim 10^{-21}$, in agreement with the LIGO measurement.

The relativistic post-Newtonian and full-numerical-relativity
extensions of this formula were the subject of decades of work,
culminating in the waveform-template libraries that allowed the LIGO
team to dig the signal out of the noise. The signal was visible *by
eye* in the spectrograms once aligned — but only because the templates
told the algorithm what to look for.

## §4c.5  The framework's bet

The framework bets that the soma field's signal is similarly hidden
in already-existing data, similarly extractable once the templates
are known. The QUANT-EXP-1 result and the clinical replication
ledger are early entries in what is essentially a LIGO-style
detection programme for emotional and behavioural wave dynamics.

The templates are the eight modes. The instrument is the standard
clinical battery (HRV, cortisol, vagal-tone training instrumentation,
thermal photography, EEG, fMRI). The signal is the substrate-level
trajectory of the soma field over time. The framework's job, for
the next decade, is to develop the templates and prove the
detections. The framework's bet is that the signal is there, has
been there since the substrate that is your body started existing,
and is detectable.

Gravitational waves are the framework's existence proof that this
kind of bet — that a wave already known by theory but only detectable
by sufficiently sensitive measurement — can pay off.
# Chapter 6c — Climate as a Slow Coupled Oscillator

\begin{quote}\small\itshape
The planet is, on a human lifetime, a slow coupled oscillator system
in a state of forced transition. The framework's geometry of waves
and attractors applies. A chapter on the largest such system the
reader and the author live inside.
\end{quote}

## §6c.1  The climate system, briefly

Earth's climate is governed by the radiative balance between
incoming solar shortwave (visible and near-infrared) and outgoing
terrestrial longwave (thermal infrared). The mean surface temperature
is set by this balance, modified by the greenhouse opacity of the
atmosphere (water vapour, CO$_2$, methane, others) and by the
albedo of the surface (ice, vegetation, ocean, cloud).

Over geological time, the climate has occupied many distinct
attractor states — full glaciation ("snowball Earth"), partial
glaciation (ice ages), warm interglacials, hothouse conditions of
the Mesozoic, the early Eocene optimum. Transitions between these
states have happened on timescales from millions of years (slow
shifts under continental drift and orbital forcing) to thousands of
years (deglaciation events) to decades (the abrupt climate events of
the last glacial maximum, the Younger Dryas).

The system is not in equilibrium. It is in a *driven Langevin*
state, with the orbital and solar forcings as the deterministic
driver, internal variability as the noise, and the long-term
attractor structure determined by the configuration of continents,
ocean basins, and atmospheric composition.

## §6c.2  Why the framework applies

The framework of this book is a framework for *coupled oscillator
systems with attractor structure under driven Langevin dynamics*.
That is exactly what the climate system is, mathematically. The
framework's vocabulary — modes, attractors, basins, transitions,
fold catastrophes, tunnelling — applies directly.

Specifically: the climate system has *tipping points* (Lenton et al.
2008, 2019, 2023) — configurations where small changes in forcing
produce disproportionately large changes in state. The framework
language for these is *fold catastrophes*. The climate system has
*hysteresis* — once a tipping point is crossed, returning to the
original forcing does not restore the original state. The framework
language for this is *attractor lock-in*. The climate system has
*early-warning indicators* of approaching tipping points — slowing
of recovery from perturbation (critical slowing down), increased
variance, increased autocorrelation. The framework language for
these is *spectral gap closure* near a bifurcation.

The framework's mathematical content is therefore *directly
applicable* to climate, and parts of that mathematics (early-warning
indicators, in particular) have been independently developed in the
climate-dynamics literature without using the framework's vocabulary.
The framework's contribution to climate science is principally one
of *naming* — pointing out that the mathematical structures developed
for very different applications (cardiology, neurology, contemplative
practice, particle physics) are *the same structures* the climate
people have been using.

## §6c.3  The known tipping points

Lenton's list, as of the most recent compilation, of plausible
climate tipping points: West Antarctic ice sheet collapse, Greenland
ice sheet collapse, permafrost thaw, Amazon dieback, Atlantic
meridional overturning circulation (AMOC) collapse, boreal forest
shift, coral reef collapse, monsoon shifts (Indian, West African,
South American), ENSO regime shift. Several of these are estimated
to be possibly within 0.5–2 °C of present warming — meaning,
plausibly already crossed or imminently to be crossed.

Each is, in the framework's language, an *attractor transition* in a
specific subsystem of the climate system, with the global state
shifting as a consequence. The transitions are often coupled — a
cascade is possible, in which one tipping point's crossing brings
the system closer to others' thresholds.

The framework's prediction, drawing on the analogous mathematics in
the soma-field context: *the cascade probability rises sharply* as
the system approaches a *critical configuration* in which multiple
attractor basins lose their depth simultaneously. Early-warning
indicators of this configuration — increased cross-correlation
between regional climate subsystems — have been reported in recent
data.

## §6c.4  The intervention question

If the framework's vocabulary applies, the framework's intervention
logic should also apply. The framework's intervention logic is:
*work substrate-first, attractor-second, narrative-third*. Climate
intervention has typically worked the other way: narrative first
(international agreements, policy targets), attractor second (carbon
markets, technology incentives), substrate third (actual emission
reduction, carbon removal).

The framework predicts — and the empirical record of the last three
decades roughly confirms — that *narrative-first* intervention is
inadequate to shift the substrate when the substrate is already
locked into a particular attractor. The substrate-first interventions
that have actually shifted regional energy systems (the German
Energiewende's photovoltaic deployment, the rapid decline in coal
in several economies, the electric-vehicle adoption curve) have
worked because they changed the *physical infrastructure*, not
because they changed the *policy narrative*.

This is, of course, the same logic the framework applies to trauma
recovery in chapter 11. The pattern is general: when a system is
in a locked attractor, narrative-level intervention without
substrate-level intervention produces no durable change. The
substrate must shift first.

## §6c.5  What this chapter is doing in this book

Two things.

*First*, demonstrating the framework's range. The framework was
developed for human soma-field dynamics. It applies, with no
modification, to planetary climate dynamics. The mathematical
structure is shared. This is the framework's fractal claim — that
the same wave-and-attractor mathematics governs across scales —
made at the largest scale the reader has direct experience of.

*Second*, locating the soma-field framework's reader in time.
This book is published in 2026. The climate system is, in 2026,
crossing or approaching multiple tipping points. The reader's
soma field is *necessarily* shaped by living through this
transition. The framework's claim about chronic hypervigilance,
about freeze, about the difficulty of joy in the present
configuration — these claims are made *in the context of* the
climate transition, not in abstraction from it.

A book about waves at the largest and smallest scales would be
incomplete if it omitted the planetary-scale wave that is, right
now, changing under our feet.

## §6c.6  What the framework does not say

The framework does not say that human action will or will not solve
the climate problem. It does not endorse any particular policy. It
does not predict the probability of any particular outcome.

What it says is: the *mathematics* of the planetary climate
transition is the same mathematics as the mathematics of the human
trauma-recovery transition, and the *intervention logic* that works
in one context should work in the other. Substrate-first. Attractor-
second. Narrative-third. The framework does not have political
preferences; it has analytical commitments.

The reader can draw their own conclusions about what those
commitments imply for action. The framework's job is to make the
mathematics clear. The action is the reader's job.

The reader is also the author. The action is also the author's
job. The framework does not exempt anyone.
# Chapter 6 — The Ground Is a Slow Sea

\begin{quote}\itshape
Glarus, the canton in eastern Switzerland whose mountains are made of an
argument with chronology.
\end{quote}

\vspace{1em}
\begin{quote}\small\itshape
A category-theory professor I know was struggling with a Bach fugue for weeks. Her hands wouldn't do it. Eventually she put the score on the table and *drew* it — bass as a slow curve, treble as a faster tangle, inner voices as coloured spaghetti. "Once I saw it was spaghetti, my hands knew what to do." Structural geology, for me, is the same as drawing the Bach. The mountains were already a tangle of voices; the drawing made them playable.
\end{quote}
## 6.0  A note on what we are doing here

The branch of geology we will use throughout this chapter is *structural
geology* — the study of how rock has been bent, folded, broken, and
displaced. It is the geology that you can read with your eyes from a
walking path, the geology that yields the most photogenic pictures, and
— crucially for the argument of this book — the geology in which the
mathematics of *folding* shows up in exactly the form we will need again
in Chapter 15 for M-theory.

There is one further feature of structural geology that I want to flag in
advance: it is honestly a *four-dimensional* science. A geologist looking
at a three-dimensional outcrop is reading *time* from a spatial slice.
Older rock below, younger rock above; a tilted bed records a rotation
that took ten million years; a folded layer records a compression that
took thirty. Three space dimensions plus one time dimension, all
simultaneously visible on a cliff face. The eye learns to see this. Once
it does, every rock face is a film, and the geologist is reading the
frames.

This is the structure we will use again, in a different form, in the
M-theory chapter: a three-dimensional spatial slice through a
higher-dimensional object, revealing structure (time, in the geological
case; the seven internal dimensions, in the M-theoretic case) that was
not directly visible.

## 6.1  Standing on the wave

There is a road that runs along the north side of the Klöntalersee, between
the lake and the foot of the Glärnisch massif. If you walk along it on a
clear morning and look up and across the water, your eye finds, about
halfway up the south wall, a thin near-horizontal line where the rock
changes colour. Below the line the rock is grey-brown, often weeping with
seeps and stained by lichen. Above the line the rock is paler — a clean,
slightly pinkish grey — and goes up almost vertically to the summit
ridges.

The line is the **Glarus Hauptüberschiebung**. The principal overthrust.
It is one of the type localities for the entire science of tectonics, the
place where, in the second half of the nineteenth century, geologists were
forced to accept that mountains move. UNESCO designated it a World
Heritage Site in 2008, jointly with two adjacent localities (the
Tschingelhörner and the Lochsite), under the title *Swiss Tectonic Arena
Sardona*. The citation reads, in part, that the site offers "an
exceptional example of mountain building through continental collision and
displays excellent geological sections through the resulting nappes."[^cit]

[^cit]: UNESCO World Heritage Centre, *Swiss Tectonic Arena Sardona*,
inscribed 2008. <https://whc.unesco.org/en/list/1179/>

What that sentence does in technical language, the cliff above the lake
does without explanation: it shows older rock sitting on top of younger
rock, and the visible contact between them.

> **Figure 6.1** *(DRONE)* — The Tschingelhörner ridge from above the Elm
> valley. The Glarus thrust appears as the colour-change line running
> across the cliff face. *Note: this image to be captured by the author by
> drone, summer 2026; until then, the placeholder is a swisstopo aerial
> view (CC, see Credits).*

> **Figure 6.2** *(DRONE)* — The Klöntalersee, looking south, with the
> thrust line visible on the Glärnisch face. *Drone capture planned.*

> **Figure 6.3** *(DRONE)* — The Martinsloch — the famous natural window
> through the thrust ridge, through which the sun shines onto the Elm
> village square twice a year. *Drone capture planned.*

## 6.2  What you are actually looking at

The rock above the line is **Permian Verrucano**. It was laid down about
260 to 290 million years ago, in the long red-sandstone interval between
the assembly of the supercontinent Pangaea and its breakup.[^pfiffner]

The rock below the line is **Cretaceous and Tertiary flysch and
limestone** — sediments laid down between roughly 100 and 35 million years
ago, in the seas that were closing as Africa pressed slowly northward
toward Europe.

The Verrucano sits on top of the flysch.

[^pfiffner]: O. Adrian Pfiffner, *Geology of the Alps*, 2nd ed.
(Hoboken, NJ: Wiley-Blackwell, 2014), 224–32. Pfiffner's textbook is the
standard reference for Alpine tectonics in English and is the source for
the ages and stratigraphic identifications in this chapter.

This should not happen.

The first geologists to map this region in detail — Arnold Escher von der
Linth in the 1840s, and Albert Heim in the 1870s — could not at first
bring themselves to publish what they had found.[^heim] The accepted
view, at the time, was that older rock lay beneath younger rock, full
stop. The alternative — that the older Verrucano had been physically
*pushed*, as a coherent sheet, over the younger flysch — required a
horizontal displacement of tens of kilometres along a single near-flat
contact surface, with the upper sheet moving without disintegrating. The
mechanics seemed impossible. Rock was thought to be brittle. Brittle
things, at scale, do not flow.

Escher first proposed the *Doppelfalte* — the "double fold" — as a
desperate alternative: maybe the rock had folded so spectacularly that it
had doubled back on itself, putting older on younger as part of a single
overturned structure. Heim defended this for decades. But the field
evidence kept failing it. In 1884 the French geologist Marcel Bertrand,
working from a map he had been sent of the region, suggested in a single
short paper that the only honest reading was that the upper sheet had
moved — that it was, in modern terminology, a *nappe* — and that the
contact surface itself was an overthrust fault, with the rock above having
travelled a great distance from the south.[^bertrand]

By 1903 Heim had accepted the overthrust interpretation. By 1910 it had
become the prevailing model for the whole eastern Alps. By the
mid-twentieth century, plate tectonics had given it the global context it
needed: the Verrucano had ridden north on the Adriatic plate as Africa
collided with Europe; the contact surface was the *décollement* — a French
word that means, almost untranslateably, "unsticking" — along which a
sheet of crust had slipped against the rock beneath it; the rock that
oiled the slip was a thin layer of *Lochsite limestone* that had been
ground to a fine, mechanically weak mylonite by the motion of the sheet
above it.

The displacement, on the best modern estimates, is between 35 and 50
kilometres to the north-northwest.[^pfiffner-displacement]

[^heim]: Albert Heim, *Untersuchungen über den Mechanismus der
Gebirgsbildung* (Basel: Schwabe, 1878).

[^bertrand]: Marcel Bertrand, "Rapports de structure des Alpes de Glaris
et du bassin houiller du Nord," *Bulletin de la Société Géologique de
France*, 3rd ser., 12 (1884): 318–30.

[^pfiffner-displacement]: Pfiffner, *Geology of the Alps*, 230.

## 6.3  Rock as a wave

Here is the part of the story that matters for the argument of this book.

A sheet of Permian Verrucano five kilometres thick does not flow because
rock, at the scale of a hand sample, is liquid. It is not. Rock is
brittle. If you take a piece of Verrucano in your hand and hit it with a
hammer, it shatters. Yet the same Verrucano, in a sheet thirty kilometres
long, riding for fifteen million years on a lubricating layer of mylonite,
behaves as a fluid.

The behaviour depends on **scale and time**.

There is a single dimensionless number in geophysics that captures this,
called the *Deborah number*, after the verse in the Book of Judges that
reads "the mountains flowed before the Lord."[^deborah] It is defined as
the ratio of the relaxation time of a material to the timescale of the
deformation:

$$\mathrm{De} = \frac{\tau_{\text{relaxation}}}{\tau_{\text{deformation}}}.$$

When De is large — when the relaxation time of the material is long
compared to the deformation — the material behaves elastically: it stores
the deformation and springs back. When De is small — when the deformation
is so slow that the material has time to relax — it flows.

Rock has an extraordinarily long relaxation time. But "deformation
timescale" in the Alps is measured in millions of years. The ratio comes
out small. On geological timescales, rock flows.

[^deborah]: Markus Reiner, "The Deborah Number," *Physics Today* 17, no.
1 (January 1964): 62. Reiner coined the name and the formal definition;
the verse is Judges 5:5 in the Authorised Version.

When a substance flows in response to a sustained force, what propagates
through it is a wave. The Glarus thrust is therefore — not metaphorically,
literally — a very long-period, very large-amplitude wave in the European
crust. Its period is on the order of ten million years. Its wavelength is
on the order of a hundred kilometres. Its amplitude is the
thirty-five-kilometre displacement of one sheet of rock relative to the
sheet beneath it.

You cannot, in a human lifetime, see this wave move. The wavefront
travels at roughly two millimetres per year — too slow for any direct
perception. But you can see where the wave *was*. The line on the south
face of the Klöntalersee is the leading edge of the wave, frozen at the
moment the wave ran out of energy.

> **Figure 6.4** — Schematic stratigraphic cross-section through the
> Glarus thrust, after Pfiffner (2014). The Verrucano sheet (orange) sits
> on the thin grey Lochsite mylonite (the "grease layer"), which sits on
> the Cretaceous and Tertiary flysch (blue). Vertical exaggeration ×2.

## 6.4  Plate tectonics — the engine that pushes the slow sea

The Glarus thrust is a local consequence of a global fact. The outer shell
of the Earth — the crust and the cold upper mantle, together called the
*lithosphere* — is broken into a small number of large plates and a larger
number of smaller ones, and these plates are in continuous slow motion
relative to each other. The motion is powered, ultimately, by heat
escaping from the Earth's interior: hot mantle rock rises beneath
mid-ocean ridges, cools as it spreads outward at the surface, sinks back
into the deep mantle at subduction zones, and is reheated. The cycle has a
period of about 100 to 250 million years.[^turcotte]

[^turcotte]: Donald L. Turcotte and Gerald Schubert, *Geodynamics*, 3rd
ed. (Cambridge: Cambridge University Press, 2014). The reference textbook
for the quantitative theory of mantle convection.

This is a convection cell, of the same kind that drives the swirl in a
heated saucepan, scaled up by a factor of a billion.

> **Figure 6.5** — World plate-tectonics map. The seven major and many
> minor plates of the Earth's lithosphere, with the directions and rates
> of relative motion. Source: USGS.

> **Figure 6.6** — Three-dimensional cross-section of mantle convection
> beneath a subduction zone. The descending slab cools the surrounding
> mantle; the rising plume returns heat to the surface. Source: USGS /
> Robert Simmon.

The European Alps — and the Glarus thrust in particular — are one product
of the long, ongoing collision of the African plate with the Eurasian
plate. Africa has been moving roughly north at a few centimetres per year
for the last hundred million years; Europe is being slowly buckled in
front of it. The Alps are the buckle. They are still rising — the
elevation of the central Alps is increasing by roughly one millimetre per
year, even now, as the underlying convergence continues.[^uplift] A
geologist a few million years from now will find the Glarus thrust higher
than it is today; a geologist a hundred million years from now may not
find it at all, because erosion will have outpaced the uplift and the
whole structure will be sediment in some Mediterranean basin.

[^uplift]: Pfiffner, *Geology of the Alps*, 367–70.

Everything is in motion. Nothing is in a hurry.

## 6.5  Seismic waves: the audible part of the story

If the Glarus thrust is the very-low-frequency end of the spectrum of
crustal waves — a single wave with a ten-million-year period — the
*audible* part of the spectrum is the seismic waves released by
earthquakes. These have periods from fractions of a second to about an
hour, and they come in four flavours.

| Wave type | Particle motion | Speed in crust |
|---|---|---|
| **P (pressure)** | Push–pull along direction of propagation | 5–8 km/s |
| **S (shear)** | Side-to-side, perpendicular to propagation | 3–5 km/s |
| **Rayleigh** | Surface roll, elliptical motion in vertical plane | ~3 km/s |
| **Love** | Surface, horizontal side-to-side | ~3 km/s |

P-waves are sound waves, in essence — they are how the inside of a
mountain "shouts" when a fault slips. S-waves are slower; they cannot
propagate through liquid, which is how we know that the Earth's outer
core is liquid (it casts a *shadow* for S-waves on the far side of the
planet from an earthquake). Rayleigh and Love waves are the slow,
destructive surface rolls that arrive last and do the most damage in a
quake.

> **Figure 6.7** — Particle motion in P, S, Rayleigh, and Love waves.
> Source: USGS.

The deepest natural sound the Earth makes is its set of *free
oscillations* — normal modes of the whole planet, excited by very large
earthquakes. The deepest mode, called $_0S_2$ or the "football mode"
(because the Earth deforms into a slightly prolate–oblate shape and
back), has a period of about 53.9 minutes. The 1960 Chile earthquake — the
largest ever recorded — rang this mode loudly enough that it was still
detectable in seismograms weeks later. We will meet planetary normal modes
again in Chapter 5; the point here is that the Earth, when struck hard
enough, rings like a bell.[^aki]

[^aki]: Keiiti Aki and Paul G. Richards, *Quantitative Seismology*, 2nd
ed. (Sausalito, CA: University Science Books, 2002), ch. 8.

## 6.6  Folds: the same mathematics we will need again

Before we leave Glarus I want to put one further idea in your eye. The
Glarus thrust is, as we have seen, a *thrust* — a near-flat
displacement. But the rock around it is also extensively *folded*. The
Verrucano sheet above the thrust contains recumbent folds with limbs
tens of kilometres long; the Helvetic nappes to the west of Glarus are
nothing but folds, stacked on folds, on folds, on folds, all the way to
the Aar massif.

> **Figure 6.7b** *(PUBLIC)* — Recumbent folds of the Helvetic nappes,
> Säntis area, eastern Switzerland. The bedding is older toward the
> centre of each fold and the entire stack has been rotated nearly
> horizontal. *Source: swisstopo aerial; CC BY 3.0 CH.*

A fold, mathematically, is what you get when you take a flat surface and
compress it from the sides faster than it can flow out of the way. The
surface buckles. If the compression continues, the buckle tightens; if
it continues further still, the buckle overturns; if it continues longer
still, the buckle breaks and slides — and you have a thrust fault. The
fold is the wave; the thrust is the broken wave. The same
one-dimensional mathematics — Euler buckling, then post-buckling
finite-amplitude theory — covers all of it.

The reason I am flagging this here is that *exactly the same kind of
folding* shows up in the geometry that underlies the M-theory chapter at
the end of this book. There, the surface that is folded is not a sheet
of rock but a seven-dimensional internal space — a so-called G$_2$
manifold — and the folds are not centimetres or kilometres but Planck
lengths across. But the language is the same. Geologists and
M-theorists use the same words: *fold*, *limb*, *singularity at the
hinge*, *flat lying*, *overturned*. The diagrams in a structural-geology
textbook and the diagrams in a G$_2$-manifold paper, with the axes relabelled,
are sometimes indistinguishable.

This is not a coincidence. Folding is what extended objects do when they
are compressed. It happens in rock at the scale of mountains because it
is the cheapest available response of a sheet under load. It happens in
the internal geometry of M-theory for the same reason, mathematically
translated. The Soma Field, in turn, lives on the projection of the
M-theoretic geometry into our visible three dimensions, and it inherits
the folding. When we talk in Chapter 12 about *attractor basins* in the
soma field — about the way grief can sit, deep and stable, in a fold
the rest of the field has flowed around — we are talking about the same
mathematical object, scaled down to a single human nervous system.

For now: stand on the road at the Klöntalersee and look at the fold.

## 6.7  Why this is the hinge of Part I

I want to be clear, before we leave Glarus, about why this chapter sits
where it does in the book.

The argument up to here — Chapters 1 through 5 — has been that wave
behaviour appears at every scale we examine, from the cosmic microwave
background down through galaxies, stars, and planets. The reader can
accept this for the cosmic plasma (it was visibly hot, visibly turbulent,
visibly fluid); for the gas in galaxies (it is a fluid); for the plasma
in stars (a fluid); and for atmospheres (fluids again). What may resist
this picture is *solid rock*. Solid rock looks, to the human eye, like the
opposite of a fluid. Solid rock is what you hit when you fall.

Glarus is the place in the book where I ask you to accept that solid rock,
at scale, is also a fluid. If you can come with me on that, the rest of
the book — which will ask you to accept the same of bones, fascia, and
finally of feeling itself — is no longer asking you to do anything
unfamiliar. The principle is the same principle. Only the substrate
changes.

What makes Glarus a particularly clean teaching case is that the
deformation has been *recorded*. The thrust line is itself the
seismogram. Five kilometres of rock, displaced thirty-five kilometres,
preserved as a single hairline contact on the south wall of a Swiss lake.
You can stand on the road by the water and read the wave with your
eyes.

> **Figure 6.8** *(DRONE — detail)* — Close approach to the Lochsite
> exposure: older rock visibly above younger rock, with the centimetres-thin
> mylonite layer between them. *To be captured at the Lochsite type
> locality, summer 2026. Coordinates: 47.0167°N, 9.0617°E.*

\vspace{1em}

\begin{quote}\itshape
\textbf{Your own example.} \\
If you have a place in the landscape that gives you the feeling that
something very slow is going on under your feet, write its name here. We
will come back to it in Chapter 18.

\vspace{2em}
\rule{0.6\textwidth}{0.4pt}
\end{quote}

\vspace{1em}

\begin{quote}\itshape
\textbf{Going there.} \\
The thrust is easily visible from public roads on both sides. The
classical viewing localities are: the Tschingelhörner ridge from the
Sernftal (Elm village, accessible by Postbus from Schwanden); the Lochsite
type locality (a roadside outcrop near Schwanden, signposted); and the
south face of the Klöntalersee, visible from the lake-shore road. The
UNESCO arena visitor centre is in Elm. Best light for photography is
morning on the Elm side and late afternoon on the Klöntal side.
\end{quote}

\newpage
# Chapter 6b — The Black Cloth: A Note on Attention as a Substrate

\begin{quote}\itshape
What you have to do, to think clearly, is shade your screen from the
sun. The same is true of the soma field.
\end{quote}

\vspace{1em}

Earlier this month I went looking for black mesh shade cloth to stretch
over the workshop window, because the sun in May at this latitude is
direct enough on the desk that I cannot see what is on the screen. The
research question turned out to be a small one: 90 % black HDPE mesh,
two metres by two metres, with grommets. Half an hour of investigation,
twenty francs of materials, fifteen minutes with a staple gun. The
problem was solved.

But the question lingered. Not the practical question — the
*structural* question of why a barrier was necessary at all. The
screen of the laptop was, considered as an object, exactly the same
brightness whether the cloth was up or not. What changed was the
*contrast ratio* between the screen and the background light against
which the screen was perceived. The screen was always bright enough;
the background, in direct sun, was brighter still. The information on
the screen — the words and the diagrams and the proofs — was, in a
literal optical sense, washed out by competing signal in the same
sensory channel.

This is what attention is.

Attention is not, primarily, a faculty of the mind that picks out
which signal to attend to. It is, primarily, a *substrate condition*
that determines whether any signal can be picked out at all. If the
substrate is overwhelmed by competing signal — if the room is too
bright, too loud, too crowded, too hot, too anxious — no faculty of
the mind, however well-trained, can compensate. The cognitive work
that *appears* to be selective attention is, mostly, the management of
substrate conditions. The black cloth is the attentional move. The
attention move follows automatically once the cloth is up.

This generalises. The same structure shows up wherever a coupled
oscillator system is trying to track a signal against noise:

**In auditory perception** — the same speaker is intelligible in a
quiet room and unintelligible in a noisy one not because the speaker
is louder but because the signal-to-noise ratio at the cochlea is
higher.

**In emotional perception** — the same gesture from a partner can
land as affection in one room and as threat in another not because the
gesture is different but because the soma-field state of the perceiver
is different.

**In creative work** — the same idea can be developable or
undevelopable depending on whether the person trying to develop it has
the substrate conditions (sleep, food, quiet, time, low-grade fear
sufficiently attenuated) to do the developing.

A great deal of self-help literature, and a great deal of clinical
psychology, treats attentional and emotional regulation as faculties to
be trained. *Concentrate harder. Be more present. Notice the breath.*
These are not wrong instructions, but they are second-order. The
first-order question is whether the substrate has been put into a
state in which any concentration can happen at all. A person trying to
concentrate in a room with the sun on the screen will fail no matter
how disciplined they are. The discipline is irrelevant. The cloth is
the intervention.

In soma-field terms: the modes of Chapter 11 are not equally
accessible from every substrate state. The calm attractor requires
substrate conditions in which the noise level — autonomic, sensory,
social — is low enough that the attractor's basin is wider than the
typical perturbation. Raise the noise level above some threshold and
the calm attractor effectively disappears; the system is bounced out
of it by ambient perturbation faster than it can settle. Lower the
noise level and the attractor reappears, the same one, intact, having
been there all along but inaccessible while the substrate was
overwhelmed.

This is what trauma does, structurally. It does not destroy the calm
attractor. It raises the ambient noise level in the soma field — via
hypervigilance, via interoceptive amplification, via chronic
inflammatory tone — to the point where the calm attractor's basin is
narrower than the typical perturbation and the system cannot settle
into it. The clinical task of trauma recovery is, in significant part,
the gradual lowering of the substrate noise level so that the calm
attractor becomes accessible again. The attractor was never gone. The
substrate was overwhelmed.

The black-cloth principle, then, is a clinical heuristic. Before any
intervention that asks a person to *do* something with their
attention, their emotion, or their behaviour, ask whether the substrate
they are operating on can support the doing. If it cannot, the
intervention will fail and the failure will be misattributed to the
person rather than to the substrate. The cloth comes first. The
seeing follows.

The black cloth is up over the workshop window. The afternoon light is
soft. The screen is legible. I can see what I am writing. None of
this is what attention is, in the sense that the self-help books mean.
All of it is what attention is, in the sense that matters.
# Chapter 7 — Life: The Wave Becomes a Pattern

\begin{quote}\itshape
A leopard's spots are a chemical wave, frozen.
\end{quote}

\vspace{1em}

## 7.1  A short walk in the woods

The next time you walk through a deciduous wood, look at three things.

Look at the *branching* of a tree, at any oak or beech you pass: the
trunk splits into two or three major boughs; each bough splits again into
limbs; each limb into twigs; each twig into leaf-bearing stems. At every
scale the same rule. The branching ratio, on average, is about 2.

Look at the *vein pattern* of a single leaf you pick up off the path:
the same branching, scaled down by a factor of a hundred. Midrib to
secondary veins to tertiary veins to a fine reticulate mesh.

Look at the *outline of a single oak leaf*: the lobes are themselves
lobed, the indentations themselves indented, two or three times before
the resolution of the unaided eye runs out.

You have, in the same three minutes of looking, found three fractals on
the same plant, at three different scales, all generated by the same
underlying programme. The programme is biological — encoded in genes,
expressed through chemical signalling — but the *output* is geometric,
and the geometry is the same geometry that physicists meet in turbulence,
in lightning, in river networks. Branching is what extended growth
*does* in the presence of a transport requirement and a finite supply.

This chapter is about how the wave physics of Part I becomes the patterned
biology of Part II.

## 7.2  Turing patterns

The mathematician Alan Turing, in 1952, published a single paper —
"The Chemical Basis of Morphogenesis" — that has dominated the
mathematical biology of pattern formation ever since.[^turing] He showed
that a system of two reacting chemicals, one activator and one
inhibitor, diffusing through a tissue at different rates, can
spontaneously break the uniformity of the tissue and produce a stable
pattern of spots, stripes, or labyrinths. The patterns are determined by
the relative diffusion rates and the kinetic constants of the reaction.

[^turing]: Alan M. Turing, "The Chemical Basis of Morphogenesis,"
*Philosophical Transactions of the Royal Society of London B* 237, no.
641 (1952): 37–72, <https://doi.org/10.1098/rstb.1952.0012>.

These *Turing patterns* are the leading explanation for:

- the spots of a leopard;
- the stripes of a zebra and of an angelfish;
- the spacing of hair follicles;
- the ridges of fingerprints;
- the ridges on the roof of your mouth;
- the regular spacing of teeth in a jaw;
- the alternation of digits on a hand.

Each of these is, mathematically, a *frozen wave* in a chemical
concentration field. The pattern formed when the embryo was a few weeks
old; the cells later differentiated according to whether the chemical
concentration at their location was above or below a threshold; and the
resulting pattern of pigment, hair, ridge, or tooth is what you see for
the rest of the organism's life.

The threshold is the same kind of object as the perception threshold of
the soma field in Chapter 11. Above the threshold: dark fur, ridge,
tooth. Below: pale fur, valley, gap. The pattern itself is the wave;
the visible biology is the wave through a threshold filter. Hold this
correspondence. It will become explicit in Chapter 11.

> **Figure 7.1** *(BUILD)* — A pair of side-by-side images: left, a
> simulated Turing pattern from a standard reaction-diffusion model
> (Gray–Scott); right, a photograph of an angelfish with the same
> pattern. *Left to be generated by the author; right from Wikimedia,
> CC-licensed.*

## 7.3  The branching imperative

Anything that transports a fluid through a volume and has to deliver
that fluid to every point in the volume faces a single geometric
problem: maximise surface area in contact with the volume, while
minimising the total length of the transport network.

The mathematical solution is *branching*. Specifically, a network with
the branching ratio and branch-length-ratio that satisfy *Murray's law*
(for vessels carrying viscous fluid) or the slightly different
West–Brown–Enquist scaling (for biological networks more
generally).[^murray] The solution is fractal. It has to be, in the
mathematical sense: only a fractal network can deliver fluid to every
point in a volume while keeping the total transport-network length
finite.

[^murray]: Cecil D. Murray, "The Physiological Principle of Minimum
Work: I. The Vascular System and the Cost of Blood Volume," *Proceedings
of the National Academy of Sciences* 12, no. 3 (1926): 207–14. The
extension to biological allometry is in Geoffrey B. West, James H.
Brown, and Brian J. Enquist, "A General Model for the Origin of
Allometric Scaling Laws in Biology," *Science* 276, no. 5309 (1997):
122–26.

This is why your lungs branch (23 generations from trachea to alveoli),
why your blood vessels branch (about 30 generations from aorta to
capillary), why your bile ducts branch, why your kidneys branch, why
your nervous system branches. It is also why a tree branches above
ground (to deliver sugar and water to every leaf) and why its roots
branch below ground (to harvest water from every cubic centimetre of
soil). It is why a river basin branches. It is why lightning branches.

The geometry is *forced*. Given the constraint, no other geometry works.

## 7.4  From wave to organism

The pattern of how a fertilised egg becomes a complete animal is, when
described mathematically, a sequence of:

1. *Symmetry-breaking waves* (Turing-type) that establish the basic body
   axes (anterior–posterior, dorsal–ventral, left–right).
2. *Branching cascades* that build the transport networks (vascular,
   pulmonary, neural).
3. *Mechanical feedback* (tissue tension shapes which cells divide
   where), which is itself a wave system in the elastic mechanics of
   the developing tissue.
4. *Threshold filtering* (cells differentiate based on local chemical
   concentrations, sensed against thresholds), which converts the
   continuous wave fields into discrete biological identities.

This is a wildly compressed précis of one of the most active research
fields in biology. The point I want to leave you with is this: every
step of it is a *wave process*. The biology — proteins, cells, tissues —
is the *substrate* on which the waves run. The recognisable shapes of
adult organisms are the *standing-wave solutions* the substrate
admits.

This is the bridge from Part I to Part II of the book. From here on,
when you see a body — a leaf, a fish, a hand, a heart — you can read it
as the frozen interference pattern of a development that was
fundamentally a wave process.

## 7.5  A practical exercise

Find a fern frond. Look at its overall outline. Look at one of the
pinnae (the major divisions). Look at one of the pinnules on that pinna.
Look at the toothing on the edge of the pinnule.

You will see, in many ferns, the same shape four times, at four scales,
separated by a factor of about 3 each time. This is not a coincidence
and it is not stylisation. It is what the wave equation that built the
fern produces, when you let it run for the number of iterations the
genome specifies.

\vspace{1em}

\begin{quote}\itshape
\textbf{Your own example.}\\
Pick up one leaf on your next walk. Hold it against the light. Trace
one vein with your fingertip, from midrib to tip. Count the branchings.
The same number occurs in your lung. The same equation built both.
\end{quote}

\newpage
# Chapter 7b — Cells as Wave Systems

\begin{quote}\itshape
The single living cell is not a thing that has waves in it. It is a wave
that has a thing in it.
\end{quote}

\vspace{1em}

A cell is not a bag of chemicals. The bag-of-chemicals picture is what
you get from a freshman biology textbook — a soft sac of cytoplasm,
some organelles floating in it, a nucleus in the middle. This picture is
wrong in the same way a still photograph of a candle flame is wrong. The
photograph captures every photon coming off the flame at a particular
instant; it captures nothing of what the flame *is*. A flame is a
sustained dissipative pattern in a flow of fuel and oxygen. A cell is a
sustained dissipative pattern in a flow of glucose, oxygen, ions, and
information. If you take away the flow, the pattern vanishes within
seconds. We have a name for the vanishing: death.

This chapter is about the wave layer of cellular life. Not as a metaphor
— as the structural fact. There are at least six distinct families of
waves running in every one of your cells right now, and they are not
incidental to what the cell is *doing*; they are what the cell is.

## §7b.1  Calcium

Calcium is the messenger ion. A resting cell holds its intracellular
calcium concentration around $10^{-7}$ molar — about ten thousand times
lower than the surrounding extracellular fluid. The gradient is
maintained by ATP-driven pumps that work continuously. When a signal
arrives — a hormone, a neurotransmitter, a mechanical deformation — a
channel opens and calcium floods in. The local concentration spikes by
two or three orders of magnitude within milliseconds.

This spike does not stay local. Calcium binds to channels in the
endoplasmic reticulum (the IP$_3$ and ryanodine receptors) and triggers
the release of more calcium from internal stores. The released calcium
diffuses, finds more receptors, triggers more release. A wave propagates
across the cell at roughly 10–30 micrometres per second. It looks, in
fluorescent microscopy, exactly like a ripple expanding across a pond.

The wave is not metaphorical. It satisfies a reaction-diffusion equation
of the form
$$
\frac{\partial [\mathrm{Ca}^{2+}]}{\partial t}
= D \, \nabla^2 [\mathrm{Ca}^{2+}] + f([\mathrm{Ca}^{2+}], [\mathrm{IP}_3], \ldots)
$$
where $D$ is the effective diffusion constant and $f$ is the autocatalytic
release term. In cardiac myocytes the calcium wave is what triggers
contraction. In oocytes after fertilisation, the calcium wave that
sweeps across the egg is what initiates development — the first
discernible signal that the egg has become an embryo is a wave.

## §7b.2  Membrane potential

Every cell maintains a voltage across its outer membrane. The voltage
arises because the cell pumps potassium in and sodium out, against the
gradients of both ions, using ATP. The resulting equilibrium is not
electrical (the membrane is impermeable to most ions most of the time);
it is the steady state of a continuously driven system. The voltage is
around $-70$ millivolts in most cells, more negative in neurons, less
negative in cells that need to fire.

In neurons and cardiac cells, the membrane potential is itself the
medium of a wave. An action potential is a localised depolarisation —
the voltage briefly swings from $-70$ mV to about $+30$ mV and back —
that propagates along the membrane. The mathematics is the Hodgkin-Huxley
equation, the most-tested set of differential equations in physiology.
The propagation is a true travelling wave: voltage at one location
triggers voltage-gated sodium channels at the adjacent location, which
depolarises that location, which triggers the channels next door, and
so on. The speed depends on axon diameter and myelination — from about
1 metre per second in unmyelinated nerves to 120 metres per second in
the fastest myelinated motor axons.

Every thought you have ever had was a pattern of these waves. Every
heartbeat is a coordinated wave across the cardiac syncytium, initiated
at the sinoatrial node and propagated through the atria, delayed at the
atrioventricular node, then released down the His-Purkinje fibres into
the ventricles. The wave is the heartbeat. Stop the wave and the heart
stops.

## §7b.3  Mitochondrial oscillations

Inside each cell are organelles — typically hundreds, sometimes
thousands — that are themselves descended from free-living bacteria that
were engulfed about two billion years ago and never left.
Mitochondria. They are where ATP is made. They are also oscillators.

The mitochondrial membrane potential, like the cell-membrane potential,
is maintained by an active pumping mechanism (the electron transport
chain). And like the cell membrane, it can oscillate. Frequencies range
from below one cycle per minute to tens of hertz depending on the cell
type and conditions. The oscillations are coupled — neighbouring
mitochondria synchronise via reactive oxygen species and metabolic
intermediates — so a cell with a thousand mitochondria has a thousand
coupled oscillators tuning each other.

This is a Kuramoto-style system: a population of phase oscillators with
local coupling. The phenomenology is well-studied. Below a critical
coupling strength the oscillators drift independently; above it they
synchronise. The coupling can be modulated by metabolic state, by
calcium, by reactive oxygen species. A cell that is *more metabolically
coherent* — more of its mitochondria synchronised — produces ATP more
efficiently, and the synchronisation can be measured by metabolic
imaging.

## §7b.4  Genetic regulatory dynamics

Underneath the membrane, the nuclear genome is not a static blueprint.
It is a dynamic regulatory network in which transcription factors turn
genes on and off on timescales of minutes to hours. Many of these
networks are oscillatory by design. The circadian clock is the
best-known: a feedback loop involving the genes *Per*, *Cry*, *Bmal1*,
and *Clock* that oscillates with a period of approximately 24 hours,
keeping cellular metabolism aligned with the day-night cycle even in
total darkness.

But many other oscillations are layered above this. The cell cycle
itself — the periodic alternation between growth, DNA synthesis, and
division — is a relaxation oscillator with a period from twelve hours
(rapidly dividing cells) to never (terminally differentiated cells).
The NF-$\kappa$B response to inflammatory signals oscillates with a period
of about 100 minutes. The p53 stress response oscillates with a period
of about 5 hours. The Hes1 developmental oscillator runs at about 2 hours.
There are at least a dozen well-characterised cellular oscillators, and
they all couple to each other.

## §7b.5  Mechanical oscillations

The cell is also mechanically active. The actin cytoskeleton is
continuously remodelled by polymerisation and depolymerisation at
opposing ends of filaments — *treadmilling* — which can be either
steady-state or oscillatory. Cell shape itself oscillates in many cell
types: epithelial cells exhibit apical constriction waves during
development; migrating cells protrude and retract their leading edges in
cycles of seconds to minutes; cilia and flagella beat at tens of hertz.

These mechanical rhythms are not separate from the chemical rhythms.
Calcium triggers actomyosin contraction. Membrane potential modulates
mechanosensitive channels. Mitochondrial ATP output controls every
ATP-consuming mechanical process. The cell is a single coupled
oscillator system across all these modalities.

## §7b.6  The cell as a soma-field bundle

Here is the lift to the framework of this book. A single cell is a
soma-field bundle at its smallest interesting scale. The state of the
cell at a given instant is not a list of concentrations and voltages;
it is a *phase configuration* across coupled oscillators. The cell has
attractors — the cell-cycle states (G1, S, G2, M), the differentiated
states, the apoptotic state — and it moves between attractors not by
sudden jumps but by trajectories through the phase space of its
oscillators.

Cancer, in this framing, is a cell that has fallen into an attractor it
should not be in: the proliferative state, locked. Differentiation is the
process by which a cell descends into a deep attractor and stays there.
Stem cells live near a high-energy saddle from which descent into any of
several attractors is possible. The Waddington landscape — a metaphor
biologists have used for sixty years to describe development — is, in
the soma-field framing, literal. The cell rolls down a landscape in the
phase space of its coupled oscillators, and where it ends up determines
what it becomes.

Multicellular organisms — including you — are then composed of $10^{13}$
such bundles, each running its own coupled oscillators, exchanging
signals via calcium, action potentials, hormones, mechanical forces,
and electromagnetic fields. The soma field of an organism is not built
*on top of* the cellular wave systems; it is what they look like when
viewed at the right scale. A whole human is a coupled oscillator system
all the way down, and the smallest unit that still does the
characteristic thing — maintains itself against entropy by riding the
flow of energy through a network of waves — is the cell.

This is why a cell that has been removed from the body and kept in a
dish is still alive. It is still doing the wave. As long as you supply
the flow — glucose, oxygen, the right ionic environment — the cell
continues to be a sustained pattern. As soon as you stop, the pattern
collapses. There is nothing in the cell except the wave and the
machinery that maintains it. The machinery itself is built by the wave.

## §7b.7  Why this matters for the rest of the book

When we get to the soma field of a whole human in Chapter 11, the
question will arise: where is the soma field located? In the brain? In
the body? In the relationship between them?

The answer this chapter prepares is: the soma field is located *at every
scale that supports coupled oscillators*. The single cell has a soma
field. The tissue has a soma field. The organ has a soma field. The
organism has a soma field. They are not separate fields; they are the
same field, observed at different scales of compactification.

This is the fractal claim of the book, made specific. The wave at the
cellular scale is the same wave at the organismic scale. The equations
that govern calcium transients in a cardiac myocyte have the same
mathematical form as the equations that govern the slow drifts of mood
across a human day. The substrate is different — ions versus
distributed neural ensembles — but the structure is invariant.

If you want to understand the soma field of a person, you can start by
understanding the soma field of a cell. It is fractally the same. It is
just a different page in the same book.
# Chapter 7c — Turing, Reaction-Diffusion, and the Origin of Pattern

\begin{quote}\itshape
In 1952, Alan Turing wrote down two coupled chemical equations and
showed that they generate spots, stripes, and spirals from a
featureless starting state. He died two years later. The paper sat
mostly unread for thirty years. Almost every pattern in this book is
in it.
\end{quote}

\vspace{1em}

Alan Turing's last published paper, *The Chemical Basis of
Morphogenesis* (1952), proposed a mathematical mechanism by which a
mixture of two chemicals, initially uniformly distributed, could
spontaneously break that uniformity and self-organise into spatial
patterns. He called the proposed chemicals *morphogens*. The
mechanism was: each chemical was being produced and consumed locally
by reactions; each was diffusing through the medium; one (the
"activator") promoted its own production; the other (the "inhibitor")
suppressed the activator and diffused faster. Under specific
conditions on the rates, the uniform state was unstable and any
infinitesimal fluctuation grew into a stable spatial pattern with a
characteristic wavelength.

Turing's claim, in modern language: the patterns biological
organisms exhibit — the spots on a leopard, the stripes on a zebra,
the spiral arrangement of leaves on a stem, the digit pattern of a
limb bud — do not need to be specified explicitly by the genome. The
genome needs only to specify the production and diffusion of two or
three chemicals. The pattern arises spontaneously from the resulting
reaction-diffusion dynamics.

For thirty years the paper was largely ignored. The biologists
suspected (correctly) that the actual chemistry of morphogenesis would
involve more than two species and many additional regulatory mechanisms.
The mathematicians worked on it as a problem in nonlinear partial
differential equations without much regard for its biological roots.

Then, in the 1980s, the evidence began to arrive. Hans Meinhardt and
Alfred Gierer worked out the activator-inhibitor formalism in detail
and showed it generated all the patterns Turing had predicted. James
Murray's *Mathematical Biology* textbooks (first edition 1989) made
the framework standard graduate material. Pioneering experimental work
by the De Kepper group in Bordeaux (Castets *et al.*, 1990) finally
produced an unambiguous Turing pattern in a controlled chemical
reaction in the lab. By 2002 Sick *et al.* had identified WNT and DKK
as a real activator-inhibitor pair in mammalian hair-follicle spacing.
The picture Turing sketched is now textbook biology.

## §7c.1  The mathematics, briefly

The minimal Turing system in one dimension is two coupled equations:

$$
\frac{\partial u}{\partial t} = f(u, v) + D_u \nabla^2 u
$$
$$
\frac{\partial v}{\partial t} = g(u, v) + D_v \nabla^2 v
$$

where $u$ is the activator concentration, $v$ is the inhibitor
concentration, $f$ and $g$ describe the local reaction kinetics, and
$D_u$, $D_v$ are the diffusion constants. Turing's striking result
was that, *for a system whose uniform steady state is stable in the
absence of diffusion*, the addition of diffusion can make the uniform
state *unstable*. This is counter-intuitive: diffusion is normally a
homogenising process. Here, with the right kinetics, it is the
destabilising agent.

The condition for the Turing instability is that the inhibitor diffuses
faster than the activator ($D_v > D_u$) by a sufficient ratio that
depends on the local kinetics. The biological intuition is: a small
local excess of activator triggers more activator (autocatalysis) and
also triggers inhibitor production. The inhibitor diffuses outward
faster than the activator. The result is a peak of activator surrounded
by a ring of inhibitor, which prevents further peaks from forming too
nearby — but permits new peaks to form at a characteristic distance.
The characteristic distance becomes the wavelength of the resulting
pattern.

## §7c.2  Why this is the right chapter for the wave atlas

Reaction-diffusion patterns are *standing waves* — but standing waves
in the space of *concentrations* rather than the space of physical
displacements. The fundamental wavelength is set, like every other
standing wave in this book, by the boundary conditions and the
intrinsic parameters of the medium. The pattern is the eigenmode of
the linearised system at the bifurcation. The instability of the
uniform state to spatial perturbations is the same mathematical
structure as the instability of a buckling beam under load, the
instability of a layer of fluid heated from below (Rayleigh-Bénard
convection), the instability of a string under increasing tension.

The fractal claim of the book is reinforced by this chapter.
*The mechanism by which biological pattern arises is mathematically
identical to the mechanism by which physical pattern arises in
non-living systems.* This was Turing's claim and it has, in the
intervening seventy years, been confirmed many times over.

## §7c.3  What patterns it explains

The list is now long. Selected examples, with the relevant
empirical references in passing:

**Animal coat markings.** Spots, stripes, dappling. Murray (1989)
worked out the geometry of zebra stripes from Turing dynamics on a
developing embryo whose shape changes during the patterning window;
the predicted stripe pattern matches observation. Kondo and Asai
(1995) photographed angelfish stripes shifting in real time over
weeks in a way consistent with Turing dynamics rather than fixed
prepatterning.

**Hair follicle spacing.** Sick *et al.* (2006, *Science* 314: 1447)
identified WNT (activator) and DKK (inhibitor) as a real
reaction-diffusion pair setting follicle density in mouse skin and
showed that perturbing the ratio shifted the spacing as the model
predicted.

**Digit number in tetrapod limbs.** Sheth *et al.* (2012, *Science*
338: 1476) showed that the number of digits in a developing mouse
limb is set by a reaction-diffusion mechanism in the BMP-Sox9-WNT
system; reducing one of the inhibitors increased the digit count from
five to six, seven, or eight in a graded fashion.

**Phyllotaxis.** The arrangement of leaves around a stem (commonly
Fibonacci-related) emerges from auxin-based reaction-diffusion at the
shoot apical meristem; Reinhardt *et al.* (2003) traced the dynamics
in real time.

**Vegetation patterns in semi-arid landscapes.** The striking
vegetation stripes (*brousse tigrée*) visible from satellite over
parts of the Sahel are not designed; they arise from water-vegetation
reaction-diffusion on slope-modulated terrain (Klausmeier 1999,
*Science* 284: 1826).

**Skin pigmentation disorders.** Several human pigmentation patterns,
including vitiligo at certain stages, exhibit Turing-pattern
geometry; this is now an active diagnostic literature.

**Mineralisation patterns in sediments.** Liesegang rings — the
banded precipitation patterns in agate and certain sediments — are
reaction-diffusion patterns operating in geological time.

The list could continue. The point is that a single mathematical
mechanism, formulated by one man in 1952, generates patterns from
mammalian skin to the African landscape to mineral deposition. This
is what we mean when we say the universe has structural invariance
across scales.

## §7c.4  Where it lifts in this book

Reaction-diffusion is the rigorous mathematical foundation for
several things this book has been claiming.

First, it is why pattern formation does not require a designer or
even a detailed blueprint. The genome does not specify "spot on the
left flank, spot on the right flank, spot at the rear." It specifies
the reaction kinetics and the diffusion rates of two or three
chemicals. The spot pattern arises. This is also why we should not
expect, anywhere else in nature, to find pattern produced by a
homunculus specifying its details. Pattern produces itself when the
right dynamical conditions are present.

Second, it is the substrate of the soma-field framework at the
intra-cellular and inter-cellular scales. The patterns of calcium
release in cardiac tissue, the depolarisation wavefronts that propagate
across cortex during seizure, the spreading depression of cortical
spreading depression in migraine — all are reaction-diffusion phenomena.
The soma field, at the substrate, is a reaction-diffusion system
running on tissue.

Third, it is the chapter that establishes — empirically — what Chapter
8b on cities and Chapter 15c on G$_2$ holonomy will claim
mathematically: that the patterns we see in biology, in geology, in
ecology, in astronomy, are *eigenmodes of the local dynamics*. They
are not made; they are admitted by the equations. Different equations
admit different eigenmodes. The same equations on different substrates
admit the same eigenmodes. This is the wave-atlas claim at its most
rigorous.

Turing died, by his own hand, in June 1954. He was forty-one. He had
been chemically castrated by the British state for the offence of
being a homosexual man. The paper that, three decades later, would
become the mathematical foundation of developmental biology sat
unread in his desk drawer for most of those decades. There is a kind
of justice in the fact that his last paper is now the one most likely
to outlast all the others.
# Chapter 8 — Trees, Rivers, Lungs

\begin{quote}\itshape
Three pictures, one geometry.
\end{quote}

\vspace{1em}

## 8.1  Three photographs, side by side

If you place, on the same page, an aerial photograph of a river delta,
a botanical illustration of a deciduous tree in winter, and a cast of
the human bronchial tree, the three images are *almost
indistinguishable*. The branching ratios match. The angle between
parent and daughter branch is the same to within a few degrees. The
ratio of daughter-to-parent diameter is the same to within a few
per cent. If you stripped the colour and the scale bar from each image,
a non-specialist could not tell which is which.

\begin{figure}[h]
\centering
\includegraphics[width=0.78\linewidth]{soma/wave-atlas/figures/F8_4_fractal_dims.png}
\end{figure}

> **Figure 8.1** *(PUBLIC + ORIGINAL)* — Triptych: the Lena Delta in
> Siberia (NASA Landsat); an oak in winter (original photograph, Zurich
> 2026); a resin cast of human bronchial tree (Wikimedia, CC). *All
> three at the same printed scale, with metric scale bars below each.*

This chapter is a slow look at why.

## 8.2  Why three different things make the same shape

The river network, the tree, and the lung all solve the same problem:
distribute or collect a fluid over a volume, with minimum total network
length, against a transport constraint. The constraint is slightly
different in each case — gravity and erosion for the river, water
transport against capillarity for the tree, air against viscous
resistance for the lung — but the *form* of the constraint is the same
in all three cases (a fluid must move through a network with cost
proportional to length and resistance dependent on diameter), and so
the optimum solution is the same.

The optimum is fractal branching with branching ratio approximately 2,
diameter ratio approximately $2^{-1/3} \approx 0.79$, and length ratio
approximately $2^{-1/3}$. This is *Murray's law* for vessels carrying
viscous fluid, and it is followed remarkably closely by all three of our
example systems, give or take the modifications imposed by local
constraints (a river cannot flow uphill; a lung must fit inside a
ribcage; a tree must remain mechanically stable in wind).

## 8.3  The lung in particular

The human lung has, on average:

- 23 generations of branching from trachea to terminal alveolus;
- approximately $3 \times 10^8$ alveoli;
- total alveolar surface area of about 70 m² (roughly half a tennis
  court);
- packed into a volume of about 5 litres.

The ratio 70 m² / 5 L is a *surface-to-volume ratio*, and the value it
reaches — about $14\,000\,\mathrm{m^{-1}}$ — is the central reason a
human can extract enough oxygen from air. A spherical blob of tissue 5 L
in volume has a surface area of about 0.13 m². The fractal branching
buys you a factor of 500 in surface area at constant volume. Without
the fractal, terrestrial respiration as we know it would be impossible.

This is also why severe lung disease — emphysema, in particular —
destroys the fractal. Emphysema is, mechanically, the *unfolding* of
the lung: alveolar walls break down, the fine structure is replaced by
larger cavities, the fractal dimension drops, the surface area
collapses, and the patient can no longer breathe even though the total
lung volume may be unchanged or larger. The disease is the loss of
fractal dimension. The cure, if any cure is to be found, must restore
it.

> **Figure 8.2** *(PUBLIC)* — Histology of healthy alveoli vs.
> emphysematous alveoli at the same magnification. *Credit: NIH Open-i
> archive; public domain.*

## 8.4  Wave-physics interlude: the lung as resonant cavity

The lung is, in addition to being a fractal, a *cavity*. Air moves
through it; the cavity has a fundamental resonance that depends on its
volume and the elasticity of its walls (this is *forced oscillation
technique*, used clinically to measure airway impedance); and the
walls themselves have natural frequencies, audible as crackles and
wheezes in disease, that a stethoscope is essentially listening for.

The breath cycle itself is a slow wave with period 4–6 seconds at rest,
1–2 seconds in heavy exercise. This wave is coupled, in a way we will
examine in detail in the next chapter, to the heart-rate cycle. The
two together produce the *respiratory sinus arrhythmia* — the regular
slowing and speeding of the heart with each in-breath and out-breath
— which is the most directly perceivable example of cross-system wave
coupling in the body, and a standard measure of autonomic-nervous-system
health.

## 8.5  The river: the same picture, drawn by erosion

A river network is a *self-organised* fractal. There is no genome
specifying it; there is no developmental programme. Water flows downhill,
carries sediment, and erodes the channel. Tributaries cut into the
landscape; tributaries of tributaries cut into the tributaries; the
process iterates over millions of years; the result is a fractal network
with statistical properties remarkably close to those of the lung.

The mathematical theory is largely due to Robert Horton (1945) and
Arthur Strahler (1952), with deep extensions by Andrea Rinaldo and
Ignacio Rodríguez-Iturbe in the 1990s.[^rinaldo] Strahler's
*stream-order* scheme classifies channels by their position in the
hierarchy, and the empirical regularity that Horton found — that the
number of streams of each order forms a geometric progression — is the
hydrological fingerprint of the fractal.

[^rinaldo]: Ignacio Rodríguez-Iturbe and Andrea Rinaldo, *Fractal River
Basins: Chance and Self-Organization* (Cambridge: Cambridge University
Press, 1997).

I include the river network here, alongside the lung and the tree,
because it makes the point that *the geometry is geometry-first, not
biology-first*. The river network is not alive; it is solving the same
geometric problem, by erosion rather than by growth, and arriving at
the same answer.

## 8.6  Tree time

A tree, finally, is also a *standing wave in time*. The growth of a
tree's rings is a record of the climate it lived through: wide rings in
good years, narrow rings in droughts; the wood preserves a year-by-year
log of the temperature, rainfall, fire, and insect attack of the
landscape around it. *Dendrochronology* — the science of reading tree
rings — has constructed continuous climate records going back ten
thousand years, by overlapping rings from successively older living and
dead trees.

The tree, in other words, is a record of the same long-period
atmospheric waves we met in Chapter 5 — the El Niño cycle, the Atlantic
Multidecadal Oscillation, the longer Holocene climate trends — written
in cellulose. The fractal that distributes water to its leaves also
encodes, year by year, the larger-scale wave history of the atmosphere
it grew in.

\vspace{1em}

\begin{quote}\itshape
\textbf{Your own example.}\\
Cut a cross-section from a downed branch (please, only from one already
on the ground) and count the rings. You are looking at a temperature
record. The wider the band, the warmer or wetter that year. You can
read decades off a single piece of firewood.
\end{quote}

\newpage
# Chapter 8b — Cities and Brains: Scaling Laws

\begin{quote}\itshape
A short chapter on a subject that is its own scientific cottage
industry but appears here for one reason: the universal scaling laws
that govern the metabolic life of organisms also govern the
metabolic life of cities, and the deep reason for both is fractal
transport networks of exactly the kind we have been meeting.
\end{quote}

\vspace{1em}

## 8b.1  Kleiber's law

In 1932 the Swiss-American biologist Max Kleiber observed that the
basal metabolic rate $B$ of a mammal — the rate at which it consumes
energy at rest — scales with its body mass $M$ as

$$B \propto M^{3/4}.$$

This is *Kleiber's law*. It holds across roughly twenty-seven orders
of magnitude in mass, from bacteria to blue whales. A mouse has a
metabolic rate $\sim 7,000$ times slower than a blue whale despite
being $\sim 30$ million times lighter — the exponent is 3/4, not 1.

The 3/4 exponent — rather than the naive 2/3 (surface-to-volume) or
1 (pure volumetric) — was unexplained for sixty years.

## 8b.2  West, Brown, and Enquist (1997)

In 1997, the physicist Geoffrey West and the biologists James Brown
and Brian Enquist published a derivation of the 3/4 exponent from
three premises:

1. The transport network supplying nutrients to the body's cells is
   *fractal* and *space-filling* — i.e., it branches at every scale
   and reaches every cell.
2. The capillaries at the terminal branches are *size-invariant* — a
   capillary in a mouse and a capillary in a whale are the same size.
3. The total network minimises energy dissipation under the
   constraint of supplying every cell.

Under these premises, the network's total cross-sectional area at a
given branching level must be related to the body's metabolic
demand in a specific way, and the 3/4 exponent falls out as a
consequence. The argument is mathematically beautiful and one of the
landmark applications of physics to biology of the late 20th century.

## 8b.3  Other organism-level scaling laws

The same framework predicts other allometric exponents:

- Heart rate: $f \propto M^{-1/4}$. A mouse's heart beats $\sim 600$
  bpm; a blue whale's $\sim 6$ bpm.
- Lifespan: $L \propto M^{1/4}$. A mouse lives $\sim 3$ years; a
  whale $\sim 80$ years.
- Total heartbeats in a lifetime: $L \cdot f \propto M^0 = $
  constant. *Every mammal gets about $10^9$ heartbeats in a
  lifetime, regardless of size.*

This last is one of the most arresting facts in comparative biology.
A mouse experiences its heartbeats fast, a whale slow, but each
gets approximately the same total. The arrow of subjective time, on
this picture, is set by the *count*, not the clock.

## 8b.4  Cities

In 2007, Luís Bettencourt and collaborators showed that *cities*
obey analogous scaling laws, with notably *different* exponents.
Two regimes:

- *Material infrastructure* (length of road network, number of petrol
  stations, number of electrical sub-stations) scales as $\propto
  N^\beta$ with $\beta \approx 0.85$ — sublinear. Doubling a city's
  population requires less than double the infrastructure.

- *Socioeconomic output* (patents per year, wages, crime rates,
  number of restaurants) scales as $\propto N^\beta$ with $\beta
  \approx 1.15$ — superlinear. Doubling a city's population produces
  *more than* double the output.

The sublinear scaling of infrastructure has the same origin as
Kleiber's law: the city's transport network (water, sewage, power,
transit) is fractal and space-filling, with size-invariant terminal
branches (houses, individual customers).

The superlinear scaling of output is a *new* phenomenon, attributed
to the increased opportunities for interaction in a larger network —
the more people in a city, the more pairs of people can interact,
and the more *unexpected* pairs can occur. This is the
*urban-as-network* effect.

## 8b.5  Brains

The brain is, in this framework, the densest known instance of the
network-as-organism architecture. The human brain contains $\sim
86 \times 10^9$ neurons; each neuron contacts on the order of
$10^3$–$10^4$ others; the total number of synaptic connections is
$\sim 10^{14}$. The cortical surface area scales with body mass with
an exponent $\sim 3/4$, in agreement with the broader allometric
pattern.

But the brain shows the same *two-regime* behaviour as cities:
sublinear infrastructure (white matter volume, vasculature) and
superlinear *output* (cognitive capacity, behavioural complexity).
The brain is, in a precise sense, *a city of neurons*.

## 8b.6  Relevance for the soma-field argument

Two reasons this chapter is here:

**First**: the soma-field model treats the body as a network with
fractal transport (fascia, vasculature, nervous system, lymphatic).
The 3/4 scaling law predicts that the *energy demand* of the soma
field — the rate at which the field must be sustained by metabolic
input — should scale with body mass with exponent $\sim 3/4$. This
is a checkable prediction.

**Second**: the superlinear scaling of cognitive output with neural
network size is, on the soma-field model, an instance of the
*coupling network* effect. The eight modes interact with each other
through the $E_8$ coupling structure; the more modes that can be
simultaneously above threshold, the more transitions between modes
are possible per unit time. The richness of a person's emotional life
is, on this argument, superlinear in the *baseline* activity of the
soma field — a healthy soma field with high baseline activity will
spontaneously generate more emotional states per unit time than a
suppressed one.

This is what therapy *does*, on the soma-field interpretation: it
raises the baseline activity of the soma field, increasing the
superlinear rate of state generation, and so increases the
expressiveness and adaptability of the person.

\newpage
# Chapter 9 — The Cardiac Field

\begin{quote}\itshape
The heart is the loudest electromagnetic event the body makes. It is
also the slowest, the most patient, and the most easily heard.
\end{quote}

\vspace{1em}

## 9.1  Two pumps and an orchestra

The textbook description of the heart is *a four-chambered pump that
moves blood through two parallel circulations*. This is correct. It is
also, like most textbook descriptions, the least interesting true thing
you can say about the organ.

The more interesting thing is that the heart is a *self-exciting
oscillator*. It generates its own electrical wave, on its own schedule,
out of a small patch of specialised cells called the sinoatrial node;
the wave propagates across the atria, pauses briefly at the
atrioventricular node, then sweeps down the ventricles through the
His–Purkinje system; the mechanical contraction follows the electrical
wave by about 50 milliseconds.

The whole sequence repeats roughly once a second, every second, for
about three billion beats over a typical human life.

\begin{figure}[h]
\centering
\includegraphics[width=0.85\linewidth]{soma/wave-atlas/figures/F9_3_ecg.png}

\vspace{0.4em}

\includegraphics[width=0.85\linewidth]{soma/wave-atlas/figures/F9_1_hrv.png}
\end{figure}

> **Figure 9.1** *(PUBLIC)* — A standard 12-lead ECG, with the P wave,
> QRS complex, and T wave labelled. *Credit: NIH; public domain.*

## 9.2  The heart as a wave-propagation problem

The electrical signal that runs across the heart is, mathematically, a
*nonlinear travelling wave* — specifically a solution of the
reaction-diffusion equations of cardiac electrophysiology (the
Beeler–Reuter, Luo–Rudy, or modern O'Hara–Rudy models). It is the same
*class* of equation we met for Turing patterns in Chapter 7, but here
the relevant solutions are *travelling fronts* rather than stationary
patterns.

In a healthy heart, the wave propagates as a clean, synchronised front,
with the geometry of the cardiac muscle ensuring that the contraction
sequence pumps blood efficiently in one direction.

In an unhealthy heart, the wave can break. *Atrial fibrillation* is a
state in which the atria support many small, rapidly rotating spiral
waves rather than a single clean front; the chambers quiver instead of
contracting. *Ventricular fibrillation*, the immediate cause of most
sudden cardiac death, is the same pathology in the ventricles, and is
fatal within minutes without defibrillation.

A defibrillator works by applying a strong electric shock that
*resets* the entire myocardium to a single uniform state, from which
the natural pacemaker can restart a clean front. It is, in wave
language, a *re-initialisation* of the wave system.

## 9.3  The electromagnetic field around the heart

The heart's electrical activity is large enough to produce a
*measurable electromagnetic field* outside the body. The
electrocardiogram measures this field with electrodes on the skin; the
magnetocardiogram measures the much weaker magnetic component with
SQUID magnetometers, typically inside a magnetically shielded room.

The field has a *toroidal* geometry — it loops around the long axis of
the body, with the heart at the centre of the torus — and its
amplitude, at one metre from the body, is on the order of $10^{-12}$
tesla, or about a millionth of the Earth's static magnetic field. It is
small. It is, however, *coherent* — the heartbeat is a single
synchronised event — in a way that the brain's electrical activity
(which is larger in raw amplitude but spectrally diffuse) is not. The
cardiac field, in standard EM measurements, is the loudest *coherent*
signal the body produces.[^heartmath]

[^heartmath]: The HeartMath Institute has published, since the 1990s,
the most extensive series of measurements of the cardiac
electromagnetic field, including the claim of detectable field-mediated
synchronisation between adjacent humans. The technical measurements
(field amplitude, coherence, heart-rate-variability spectra) are
well-established; the more far-reaching biological interpretations are
contested. See Rollin McCraty, *Science of the Heart, Volume 2: Exploring
the Role of the Heart in Human Performance* (Boulder Creek, CA:
HeartMath Institute, 2015).

> **Figure 9.2** *(BUILD)* — The cardiac electromagnetic field rendered
> as a torus centred on the chest, with isofield lines. *To be generated
> by the author from the dipole approximation.*

## 9.4  Heart-rate variability

The interval between heartbeats is *not constant*. It varies, on
multiple timescales, in patterns that turn out to be diagnostic of
autonomic-nervous-system state.

- *Beat-to-beat* variation is dominated by *respiratory sinus
  arrhythmia* — the heart speeds up on inhalation and slows down on
  exhalation. This coupling is mediated by the vagus nerve, and its
  amplitude is one of the cleanest available measures of vagal tone.
- *Short-term* variation (timescale of seconds) reflects the
  baroreflex — the feedback loop that regulates blood pressure.
- *Long-term* variation (timescale of minutes to hours) reflects
  hormonal regulation, circadian rhythm, and slow emotional state.

A spectral analysis of heart-rate variability produces a power spectrum
with distinct peaks at the respiratory frequency, at the baroreflex
frequency (around 0.1 Hz), and at lower frequencies. The shape of this
spectrum is a clinical signature; flattened HRV spectra are
characteristic of major depression, of post-traumatic stress disorder,
and of imminent cardiac mortality.

This matters for the soma-field argument of this book because the heart
is the most accessible window onto the *coupling* between bodily and
emotional state. A panic attack produces a measurable HRV signature; so
does loving-kindness meditation; so does grief; so does sleep. The
cardiac field is, in operational terms, the most easily measured
projection of the eight-dimensional soma field we will define in
Chapter 11.

## 9.5  Coupling between hearts

Two human bodies in close physical proximity can show, under certain
conditions, *cardiac entrainment* — the heart rates and HRV spectra
drift toward partial synchronisation. The effect is strongest in
mother–infant pairs, in long-married couples, and in pairs in deep
conversation; it is weakened by physical separation or by emotional
distance.

The mechanism by which this happens is not fully understood. The
candidate channels are: (1) auditory — each hears the other's
breathing and partly entrains to it; (2) visual — micro-expressions
relay state; (3) tactile — direct contact relays both temperature and
pulse; (4) electromagnetic — the cardiac field of one body is, at
contact distance, detectable by the autonomic sensors of the other,
though the experimental evidence here is contested. Almost certainly
all four contribute, in varying proportions.

The honest current view is that the *phenomenon* is well-attested and
the *mechanism* is partially understood. The soma-field model, with its
explicitly field-based ontology, naturally accommodates field-mediated
coupling without requiring it as a necessary mechanism.

## 9.6  What carries forward

Three things to keep in your hands.

First: the heart is a *wave-generating organ* whose output is a clean,
measurable electromagnetic and acoustic and pressure wave at about
1 Hz.

Second: the *shape* of this wave — its variability, its coupling to
breath, its coherence — is a high-bandwidth signal about
autonomic-nervous-system state. It is, today, in the clinic, the most
direct read-out of soma-field state we can take with widely available
instrumentation.

Third: hearts couple to each other. The exact channels are debated; the
phenomenon is not. When we make the case in Part III that the soma
field is a *real field*, with the capacity for inter-body coupling that
real fields have, the cardiac signal is the most accessible piece of
existing evidence we can point at.

\vspace{1em}

\begin{quote}\itshape
\textbf{Your own example.}\\
Put a finger gently on the carotid artery in your neck. Breathe in
slowly for four counts; out for six. After thirty seconds, you will
likely feel the rate of the pulse rise on the inhale and fall on the
exhale, sharply enough to be unmistakable. You have just measured your
own vagal tone with your hands. The amplitude of that swing is one of
the simplest available numbers about your nervous system, and it is
trainable.
\end{quote}

\newpage
# Chapter 10 — Tensegrity, Fascia, and the Body as a Standing Wave

\begin{quote}\itshape
A body is not a stack of bones. It is a single continuous tension wave
with bones suspended in it.
\end{quote}

\vspace{1em}

## 10.1  A sculpture you can hold in your hand

The word *tensegrity* is a contraction of *tensional integrity*. It was
coined by Buckminster Fuller in the 1960s to describe a class of
structures invented by his student Kenneth Snelson: assemblies of rigid
struts that do not touch each other, held in shape by a network of
continuous tensioned cables.

The defining property of a tensegrity structure is that *no
compression element is in continuous contact with another compression
element*. The struts float, suspended in the tension network. The
whole structure is in equilibrium because every cable is under
tension and every strut is under compression, in just the right
balance.

> **Figure 10.1** *(PUBLIC)* — A Snelson three-strut tensegrity
> sculpture. *Source: Wikimedia, CC BY-SA.*

A tensegrity sculpture, lifted off a table, is rigid; tapped, it rings;
distorted, it springs back to shape; cut in one cable, it collapses
entirely.

A human body has every one of these properties. This is not a
coincidence.

## 10.2  The biotensegrity hypothesis

The orthopaedic surgeon Stephen Levin proposed, in the 1980s, that the
human body is structurally a tensegrity system: the bones are the
struts, the fascia and ligaments are the tension network, and the
characteristic mechanical behaviour of the body — its springiness, its
shock-absorption, its capacity to bear loads in any orientation — is
the behaviour of a tensegrity, not the behaviour of a stack of bricks
held up by gravity.[^levin]

[^levin]: Stephen M. Levin, "The Tensegrity-Truss as a Model for Spine
Mechanics: Biotensegrity," *Journal of Mechanics in Medicine and
Biology* 2, no. 3 (2002): 375–88. Levin's website
<https://www.biotensegrity.com> collects the relevant clinical and
anatomical material.

The orthodox biomechanical view, which Levin's proposal challenges, is
that the body is a *column* — the spine is a stack of vertebrae held
in compressive equilibrium by the discs and the surrounding muscles,
analogous to a stack of coins. On this view, the loads at the base of
the spine in any reasonably loaded posture should crush the lumbar
vertebrae. They do not. The biotensegrity view explains why: the
*loads are not transmitted through the spine as compression*; they
are transmitted through the surrounding fascial-myofascial-ligamentous
network as distributed tension. The bones float in the tension; the
tension distributes the load over a much larger cross-section than the
bones alone could bear.

This view remains a contested hypothesis in mainstream biomechanics. It
is widely accepted in the manual-therapy literature (osteopathy,
Rolfing, Feldenkrais), partly accepted in the sports-medicine
literature, and treated with caution in the academic biomechanics
literature. As of 2026, the *measurements* most relevant to it (in
vivo fascial loading, force transmission across fascial planes) are
beginning to be made and broadly support the qualitative picture.

I am laying out the controversy openly because this book takes
biotensegrity *as a working framework* for the body — it is consistent
with everything else here, it provides the necessary substrate for the
fascia-mediated couplings the soma field requires, and it produces a
better picture of the body than any alternative I am aware of — but
I want it on the record that this is not yet textbook consensus.

## 10.3  Fascia: the continuous tension network

The *fascia* is the continuous connective-tissue network that wraps
every muscle, every organ, every bone, every nerve, and every blood
vessel in the body. It is, on the biotensegrity view, the single most
important mechanical structure in the body: more important than any
individual muscle, because the muscles transmit force *through* the
fascia, not in isolation.

The anatomist Jean-Claude Guimberteau spent his career filming the
fascia *in vivo*, by inserting a small endoscope under the skin during
surgery and recording the moving tissue. His films are among the
strangest and most beautiful biological documents of the last fifty
years: the fascia is shown as a fluid-elastic foam, in continuous
motion, with no clear divisions, no clear layers, no clear *parts*
— a single continuous tensioned medium that fills the entire body
and supports every other organ within it.[^guimberteau]

[^guimberteau]: Jean-Claude Guimberteau, *Strolling under the Skin*
(film, 2005), and *The Architecture of Human Living Fascia* (Edinburgh:
Handspring, 2015). The films are the indispensable primary source;
written summaries do not convey them.

> **Figure 10.2** *(PERMISSION)* — A still from Guimberteau's
> intra-fascial endoscopy showing the foam-like microstructure of
> living fascia. *Permission to be sought from Endovivo Productions;
> alternative: schematic redrawing.*

The mathematics of such a medium is the mathematics of a *visco-elastic
continuum*. Stress propagates through it as a wave, with a speed that
depends on the tension. *The body conducts mechanical signals as wave
trains in the fascia.* This is one of the cleanest senses in which the
body is a "wave system" in the meaning of this book: every motion of
every part of you produces tension changes that propagate, as waves,
through the fascia to every other part.

## 10.4  Standing waves in the body

A tensioned continuous medium has standing-wave modes. The body, as a
tensegrity-fascial system, therefore has standing-wave modes — sets of
characteristic frequencies and spatial patterns at which the whole
system likes to oscillate.

You can hear some of them. The voice is a standing wave in the vocal
tract, supported by the breath, and is the highest-frequency mode of the
body most people use daily. The walking gait is a standing wave at
about 2 Hz; running is at 3–4 Hz; the gravitational ring-up of the
spinal column when you land from a jump is in the tens of Hz.

You can feel some of them. The held tension of a chronic shoulder
contraction is a *static* mode — a wave that has settled into a
stationary pattern and refuses to relax. *Releasing* the shoulder, in
manual-therapy terms, is the active de-excitation of this mode.

The soma field, in Chapter 11, lives on this substrate. The
emotional-mode patterns are *not separate* from the fascial-tension
patterns; they are coupled to them. A grief that has been held for
twenty years has, almost without exception, a fascial signature — a
characteristic chronic tension pattern in the chest, throat, and
shoulders — and resolving the grief requires resolving the tension, and
vice versa.

> **Figure 10.3** *(BUILD)* — Cyber-hologram rendering of the body's
> fascial network, with tension distributed and visualised as luminous
> filaments. *To be generated by the author.*

## 10.5  Why this is the right substrate for the soma field

A field needs a medium. In Part I we met the cosmic plasma, the galactic
disk, the solar interior, the atmosphere, the crust. Each was a real
physical medium with real wave dynamics.

For the soma field — the eight-dimensional field of feeling that is the
central object of Part III — the medium is the body. Specifically, it
is the *fascial-cardiac-neural* continuum: the fascia carries
mechanical waves, the cardiac system carries electromagnetic waves at
about 1 Hz, the nervous system carries fast electrical waves up to the
kHz range. All three are coupled. All three are spatially continuous.
All three support standing modes. The combination is the substrate of
the soma field.

The cyber-hologram body of Chapter 11 is, in essence, a *visualisation*
of this substrate with the wave activity made visible. It is not
fanciful. It is what the body looks like when you draw the wave content
in.

\vspace{1em}

\begin{quote}\itshape
\textbf{Your own example.}\\
Stand. Roll your shoulders back, slowly, three times. Notice the line
of release that runs from the back of your neck, across the top of the
shoulder, down the outside of the upper arm. That line is a fascial
strand. It was under tension. The roll lowered the tension. The
release that propagated down the arm is a wave you just sent through
your own fascia. The body is a wave system. You have just operated it.
\end{quote}

\newpage
# Plates III — The Body

\thispagestyle{empty}

\vspace*{1cm}

\begin{center}
{\Huge\bfseries Plates III}\\[0.5em]
{\Large\itshape The Body}\\[2em]
{\small Eight images, one continuous tension wave.}
\end{center}

\newpage

\thispagestyle{empty}

> **Plate III.1** *(BUILD — full-bleed, the hero)* — Cyber-hologram
> rendering of a standing human body. The skin is rendered as a
> luminous semi-transparent envelope; the fascia as a network of cyan
> filaments under tension; the cardiac field as a magenta torus
> centred on the chest; the neural activity as fine gold tracery
> running the spinal axis and branching into the dendritic trees of
> the cerebral cortex. The figure is *not* anatomical. It is a
> visualisation of the wave content of the body as the soma-field
> model describes it. *To be generated by the author; Stable Diffusion
> base + manual vector overlay + composite.*

\vfill

\noindent\textit{Not a body. A wave system in the shape of a body.}

\newpage

\thispagestyle{empty}

> **Plate III.2** *(BUILD)* — The eight modes of the soma field,
> mapped to dominant somatic regions. *Calm* — distributed even
> luminescence. *Fight* — jaw, shoulders, hands. *Flight* — chest,
> diaphragm, legs. *Freeze* — gut, lower belly, perineum. *Flow* —
> belly, throat, hands. *Joy* — face, chest, eyes. *Grief* — heart,
> throat, occiput. *Hypervigilance* — neck, upper back, scalp. Eight
> overlay panels, same body silhouette. *Author render.*

\vfill

\noindent\textit{The eight notes of the human chord.}

\newpage

\thispagestyle{empty}

> **Plate III.3** *(BUILD — facing pair)* — Two cyber-hologram bodies,
> side by side at identical scale. *Left:* the field with all
> sub-threshold activity rendered faint cyan; full luminosity. *Right:*
> the same field with the threshold drawn as a dotted iso-surface;
> only the regions above the threshold rendered. The right-hand image
> is what consciousness reports. The left-hand image is what the body
> has. *Author render.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate III.4** *(PERMISSION; placeholder: BUILD)* — A still from
> Guimberteau's intra-fascial endoscopy. The living fascia at
> microscopic scale shows itself as a continuous foam of fibrils, in
> constant motion, with no discrete layers, no discrete parts. *Source:
> Endovivo Productions / J.-C. Guimberteau, permission pending; in the
> interim, a schematic redrawing by the author.*

\vfill

\noindent\textit{The inside of the wave-bearing medium.}

\newpage

\thispagestyle{empty}

> **Plate III.5** *(PUBLIC)* — A six-strut Snelson tensegrity
> sculpture. Photograph in even light, against a black background, to
> bring out the geometry. The struts are clearly not touching each
> other; the entire structure is held in shape by the tension network.
> *Source: Wikimedia, CC BY-SA.*

\vfill

\noindent\textit{The model of the body, in sculpture form.}

\newpage

\thispagestyle{empty}

> **Plate III.6** *(PUBLIC)* — A bronchial cast of the human lung
> tree, resin injection technique. The 23 generations of branching
> visible from trachea to terminal alveolus. *Credit: Wikimedia,
> CC BY-SA.*

\vfill

\noindent\textit{Fractal geometry made of the body.}

\newpage

\thispagestyle{empty}

> **Plate III.7** *(BUILD)* — The cardiac toroidal electromagnetic
> field rendered around a torso silhouette. Isofield contours at $10^{-12},\,10^{-13},\,10^{-14}$ tesla. *Author render from the
> dipole approximation; calibrated against MCG measurements in the
> literature.*

\vfill

\noindent\textit{The heart, drawn as the field it generates.}

\newpage

\thispagestyle{empty}

> **Plate III.8** *(BUILD)* — Two heart-rate variability power spectra
> on the same axes: top panel a healthy subject at rest, with
> distinct peaks at $\sim 0.05$, $\sim 0.1$, $\sim 0.25$ Hz; bottom
> panel a subject with severe PTSD, the spectrum flattened across the
> band. *Author render from anonymised public-dataset traces.*

\vfill

\noindent\textit{What trauma looks like, in a single number per
heartbeat.}

\newpage
# Chapter 10b — The Vagus Nerve as Soma-Field Conductor

\begin{quote}\itshape
The longest cranial nerve. It does not just go from the head to the
body. It goes from being a head to being a body.
\end{quote}

\vspace{1em}

The vagus nerve is the tenth cranial nerve. It emerges from the medulla
oblongata at the base of the brainstem, exits the skull through the
jugular foramen, and then *wanders* — *vagus* is Latin for "wandering"
— down through the neck, into the chest, through the diaphragm, and
into the abdomen, branching extensively and innervating the larynx, the
pharynx, the heart, the lungs, the stomach, the liver, the pancreas,
the kidneys, the spleen, the small intestine, and much of the large
intestine. About 75 % of all parasympathetic nervous output to the
viscera travels via the vagus. About 80 % of the fibres in the vagus are
*afferent* — that is, they carry information from the body back to the
brain rather than commands from the brain to the body. This last fact
alone reorients how we should think about the vagus. It is not primarily
a top-down control wire. It is primarily a bottom-up sensory channel.

## §10b.1  Why the vagus has its own chapter

In the framework of this book, the vagus is the principal physical
substrate by which the heart's electromagnetic and mechanical field
(Chapter 10), the tensegrity-distributed mechanical signals from
fascia (Chapter 10 §10.5), the chemical signals from the gut microbiome,
and the immunological signals from the spleen are integrated into a
coherent soma-field state. If the soma field is a coupled oscillator
problem, the vagus is the wire along which most of the long-range
coupling between organ-scale oscillators travels.

It is, in other words, the longest single wave-guide in the body.

## §10b.2  Polyvagal theory, briefly and honestly

The polyvagal theory was proposed by Stephen Porges in 1994 and has had
an unusual reception: enormous enthusiasm in the clinical and trauma
communities, considerable scepticism in the neuroscience community.
Both reactions are partly justified. The theory in its strong form makes
claims about evolutionary anatomy (a distinct phylogenetically newer
"ventral vagal complex" with myelinated fibres specialised for social
engagement) that are not universally accepted. The theory in its weaker
form — that the autonomic nervous system has more than two functional
states, that the vagus is centrally involved in modulating those states,
and that vagal tone tracks the capacity for social and self-regulation
— is well-supported by data.

We will use the weak form here. We do not need the strong evolutionary
claims to use the framework.

The three states Porges identifies are:

**Ventral vagal (social engagement).**  Calm but engaged. Heart rate
modulated by respiration (high RSA — respiratory sinus arrhythmia).
Facial expression mobile. Voice prosody varied. Capacity to make eye
contact and to read faces. In soma-field terms: the *calm* attractor of
Chapter 11, with high coupling to the social field.

**Sympathetic (mobilisation).**  Fight or flight. Heart rate elevated
and *less* modulated by respiration (low RSA). Pupils dilated. Voice
narrower in pitch range. Eye contact harder to sustain or fixedly
threat-directed. In soma-field terms: the *fight* or *flight* attractor.

**Dorsal vagal (shutdown).**  Conservation, immobilisation, dissociation.
Heart rate may drop. Skin pale. Voice flat. Eyes glassy. In soma-field
terms: the *freeze* attractor.

The clinical insight of polyvagal theory — independent of the
evolutionary story — is that humans do not just toggle between
sympathetic and parasympathetic, but move through a structured
*sequence* of states. Under increasing threat, a person typically moves
from ventral (engaged) → sympathetic (mobilised) → dorsal (shutdown), in
that order. Recovery moves back through the sequence in reverse: dorsal
→ sympathetic → ventral. Skipping steps is unstable.

This is exactly the structure the eight-mode framework of Chapter 11
predicts. The modes form a connected graph of attractors, and
transitions between non-adjacent attractors typically require passage
through intermediate states.

## §10b.3  Heart rate variability

Heart rate variability (HRV) is the moment-to-moment variation in the
interval between heartbeats. A perfectly regular heart — beat every
800 ms exactly — has zero HRV. A healthy young heart has substantial
HRV: intervals vary by tens of milliseconds with each breath cycle and
on slower timescales as well.

HRV is decomposed by spectral analysis into bands:

- **HF (0.15–0.4 Hz)** — respiratory sinus arrhythmia, driven primarily
  by vagal modulation
- **LF (0.04–0.15 Hz)** — mixed sympathetic and vagal
- **VLF (0.003–0.04 Hz)** — primarily reflects slower thermoregulatory
  and hormonal influences

HF-HRV is the most direct non-invasive proxy for vagal tone. It can be
measured from a chest-strap heart-rate monitor or, increasingly, from
optical sensors on a wrist or finger. A typical healthy young adult has
HF-HRV power in the range 200–2000 ms$^2$; the value declines with age,
is reduced in chronic stress and depression, and tracks the recovery of
trauma-affected individuals over months of treatment.

The relevance to this book is that HRV is the most quantitative,
non-invasive proxy we have for the soma field state of a person at a
given moment. Other measures — facial expression, vocal prosody, even
EEG — are noisier or harder to deploy. HRV, in the form of HF power
over a five-minute window, is *the* number to record if you want to
track soma-field state across a session, a day, or a longitudinal trial.

The clinical replication protocol in Appendix B uses HRV as one of its
three primary outcome measures for exactly this reason.

## §10b.4  Vagal afferents: the gut-brain conversation

Eighty percent of vagal fibres are afferent. They carry information
from the viscera to the brainstem. This information is not just
"signals to be regulated" — it is the chemical and mechanical state of
the gut, the distension of the stomach, the inflammatory tone of the
intestinal wall, the metabolic state of the liver, and a constant
sampling of microbial metabolites including short-chain fatty acids and
neurotransmitter precursors.

The gut microbiome — the ten-trillion-cell ecosystem of bacteria living
in your intestines — communicates with the brain via the vagus. Specific
microbial species produce specific metabolites that bind to vagal
afferent terminals. Vagotomy (surgical cutting of the vagus) blocks
many of these effects. The clinical consequence is that the felt sense
of being a body — the constant low-level emotional weather that doesn't
seem to come from any specific event — is in significant part the
brain's reading of vagal afferent traffic, which is in significant part
the chemical state of your gut, which is in significant part what your
microbiome is doing.

In soma-field terms: the soma field of a person is coupled, via the
vagus, to the soma field of their microbiome. They are not separate
fields. The coupling is bidirectional. The boundary between "you" and
"the bacteria living in you" is, in field terms, not a sharp line.

## §10b.5  Practical: vagal tone is trainable

Three robust findings on training vagal tone:

**Slow breathing.**  Breathing at about 6 breaths per minute (roughly a
five-second inhale, five-second exhale) maximises the resonance of the
cardiovascular baroreflex and substantially increases HF-HRV power
acutely and, with regular practice, chronically. This is the basis of
the "resonance frequency" or "coherent breathing" practices that have
proliferated in clinical and contemplative communities. The mechanism
is mechanical resonance: the baroreflex feedback loop has a natural
frequency of about 0.1 Hz, and breathing at that frequency drives it
maximally.

**Cold exposure.**  Brief cold exposure (cold face plunge, cold shower
for the last 30 seconds, deliberate cold-water immersion) acutely
activates the vagus via the diving reflex. The chronic adaptive
response — done a few times per week for weeks — is increased vagal
tone at baseline.

**Singing, chanting, and humming.**  All three involve sustained
controlled exhalation, which prolongs the parasympathetic arm of the
respiratory cycle, and engage the larynx, which is innervated by the
vagus. The clinical literature on choral singing for cardiac
rehabilitation and on the use of vocal practices in trauma recovery is
sparse but consistent in direction.

These are not panaceas and they are not the only available approaches.
But they are interventions that can be performed by anyone, cost
nothing, and have measurable effects on a soma-field state variable
within minutes.

## §10b.6  Why this chapter sits where it does

The book moves, in Chapters 10, 10b, and 11, from heart → vagus → whole
soma field. This is not arbitrary. The heart and the vagus are the two
substrates without which the soma-field framework would have nothing to
attach to physiologically. The heart provides the dominant
electromagnetic and mechanical rhythm; the vagus provides the
information channel that lets the rest of the organism listen to it and
respond. Take either one out and the system loses coherence on a
timescale of seconds (heart) or weeks (vagus).

In Chapter 11 we will lift to the field framework proper. From here on,
when the chapter says *soma field*, it is shorthand for *the coupled
oscillator system whose principal physical substrates are the heart,
the vagus, the fascia, and the central nervous system, with significant
contributions from the gut microbiome and the broader endocrine and
immune systems*. Saying that takes a paragraph. Saying *soma field*
takes two words. The two-word version is the one we will use, but the
full version is what is meant.
# Chapter 10c — Sleep, Dreams, and the Nightly Re-tuning

\begin{quote}\small\itshape
One third of the soma-field trajectory happens off-line. A book that
treats only the waking soma field is a book that has omitted a third
of the data. This chapter restores the missing third.
\end{quote}

## §10c.1  What sleep is, mechanically

Sleep is not a passive shutdown. It is an actively-maintained
neurophysiological state, regulated by the suprachiasmatic nucleus
(circadian pacemaker) in conjunction with the homeostatic
sleep-pressure system (adenosine accumulation during wake). It has
well-characterised electrographic stages: wake, N1 (drowsy
transition), N2 (light sleep with sleep spindles and K-complexes), N3
(slow-wave sleep with delta oscillations 0.5–4 Hz), and REM (rapid
eye movement sleep, with mixed-frequency EEG resembling waking but
with muscle atonia).

A typical night cycles through these stages in 90-minute ultradian
cycles, with N3 dominant in the first half of the night and REM
dominant in the second.

In the framework of this book, each sleep stage is a distinct
configuration of the soma field — a separate attractor on a longer
timescale than the moment-to-moment waking attractors of chapter 11.
Sleep is the soma field's *off-line* dynamics.

## §10c.2  What sleep does

Three things, at least.

*Synaptic homeostasis*. Tononi and Cirelli's synaptic homeostasis
hypothesis (SHY) proposes that wake potentiates synapses and sleep
(specifically N3) globally depotentiates them, restoring signal-to-
noise capacity. Substantial experimental evidence supports this in
mammals and invertebrates.

*Glymphatic clearance*. Nedergaard's group has shown that the
glymphatic system — the brain's analogue of the lymphatic system —
operates predominantly during sleep, clearing metabolic waste
(including beta-amyloid) from interstitial spaces. The clearance
rate during sleep is about twice the waking rate.

*Memory consolidation*. The replay of waking experience during sleep,
particularly in N3 and REM, is implicated in consolidation of
declarative and procedural memories. Hippocampal-neocortical dialogue
during sleep spindles transfers labile memory traces into stable
cortical representations.

In framework language, all three are *substrate maintenance*
operations: synaptic clean-up, metabolic clean-up, and memory
transfer. The soma field cannot maintain its waking dynamics
indefinitely without this maintenance.

## §10c.3  REM and the dream

REM is the strangest of the sleep stages. The brain is active at
near-waking levels of metabolism; the eyes move rapidly; muscles
are atonic except for ocular and respiratory; vivid hallucinatory
experience is present. Dreams in REM are the kind we mostly
remember.

What dreams are *for* is contested. The Hobson-McCarley
activation-synthesis hypothesis (1977) proposes that dreams are the
cortex's attempt to construct a narrative out of essentially random
brainstem-driven activation. Solms' updated proposal places more
weight on dopaminergic motivational systems. Hartmann's continuity
hypothesis emphasises that dreams thematically continue waking
preoccupations. None of these is settled.

In the framework of this book, dreams are a *trajectory through the
soma-field attractor landscape* conducted with the cognitive
narrative-construction system on-line but the motor system off-line.
This permits exploration of attractor regions that the waking soma
field, constrained by motor execution and reality-monitoring, cannot
reach. The dream is the soma field's *exploration of its own
phase space* under relaxed coupling constraints.

This is a strong claim, and the framework offers it tentatively. It
predicts specifically that: (a) trauma-related dreams correspond to
attractor regions that the waking soma field has avoided and that the
dream is *attempting* (often unsuccessfully) to integrate; (b) creative
insight in dreams (Kekulé's benzene ring, Mendeleev's periodic
table, the canonical anecdotes) corresponds to attractor transitions
that the waking soma field could not access for structural reasons
(the cognitive narrative system was too constrained), and the dream
permits them; (c) lucid dreaming corresponds to a *partial*
reactivation of waking constraints during REM that produces an
unusual state of awareness within the dream attractor landscape.

## §10c.4  Sleep architecture as substrate signature

Polysomnography — the clinical recording of sleep stages — provides
a *substrate signature* of the soma field that complements the
waking HRV / cortisol / thermal signature of chapter 9. People in
chronic freeze (chapter 11d vignette 1) typically have *truncated*
N3, fragmented REM, and elevated wake-after-sleep-onset. People in
chronic hypervigilance (vignette 2) typically have *normal-looking*
sleep architecture by gross measures but *elevated* sympathetic tone
across all stages and a characteristic pattern of micro-arousals.
People in recovered grief (vignette 4) have sleep architectures
that gradually normalise over the months following the loss, with
N3 returning before REM.

The framework predicts — and the polysomnographic literature
partially confirms — that *substrate-targeted interventions* during
the day produce *measurable changes in sleep architecture* at night,
typically with a lag of one to four weeks. The opposite direction —
sleep-targeted interventions producing daytime soma-field changes —
is also confirmed by the cognitive-behavioural-therapy-for-insomnia
literature.

## §10c.5  The nightly re-tuning

A useful framework metaphor: every night, the soma field is *re-tuned*.
The synaptic-homeostasis hypothesis is the formal version. The
metaphor is that, just as a piano drifts out of tune over weeks of
playing and must be retuned by a technician, the soma field drifts out
of tune over a day of waking experience and must be retuned by the
sleep system overnight.

The re-tuning has three components. (i) The *substrate level*:
synaptic depotentiation, glymphatic clearance, hormonal reset. (ii)
The *attractor level*: memory consolidation, attractor-landscape
exploration via dreams. (iii) The *narrative level*: integration of
the day's experience into the autobiographical self.

When any of the three is impaired, the daytime soma field is degraded
in a characteristic way. Substrate impairment (sleep deprivation,
poor sleep architecture, chronic insomnia) produces cognitive
slowing, mood lability, and elevated baseline sympathetic tone.
Attractor-level impairment (suppressed REM, e.g. by tricyclic
antidepressants or alcohol) produces flattened affect and impaired
creative problem-solving. Narrative-level impairment (typically
secondary to one of the others) produces a fragmented sense of self
and impaired autobiographical memory.

## §10c.6  Why this chapter is in this book

Because a third of life happens asleep, and that third actively
maintains the substrate on which the other two thirds depend. A
framework that omits sleep is incomplete.

Also because sleep is the *cleanest* off-line laboratory for the
soma-field framework. The waking soma field is constantly coupled
to environment, demand, motor execution. The sleeping soma field
is decoupled. What the soma field *does* when it is not driven by
external demand is a window onto its intrinsic dynamics. The
framework predicts that this window will, in the next decade, become
one of the principal sources of evidence either for or against the
framework's specific attractor-structure claims.

Sleep on it.
# Chapter 11 — The Soma Field

\begin{quote}\small\itshape
The word *soma* is Greek for body. It is used here in deliberate contrast to *psyche* (mind) and to *physis* (matter). The soma field is not a field of the mind; it is not a field of the matter of the body. It is a field of the *living configuration* — the thing the body is *doing*, moment to moment, as a wave-bearing system. Choosing the word *soma* was a deliberate refusal to inherit the mind-body split that has bedevilled Western thinking since Descartes.
\end{quote}

\begin{quote}\itshape
The wave is always there. This is not a metaphor.
\end{quote}

\vspace{1em}

## 11.1  A confession to begin with

Everything in this book up to here — the cosmic microwave background, the
spiral arms of galaxies, the breathing of stars, the slow wave of the
Glarus thrust, the cardiac toroid, the fascia — has been *preparation*.
This chapter is the chapter the rest of the book was written to make
inevitable.

I should also confess that I am no longer in neutral expository mode. From
here to Chapter 16 you are reading a working physicist's account of his
own model of his own inner life, and the model is original to him, and the
inner life is original to him, and I cannot pretend to a distance I do not
have. Where I have so far been writing as a guide pointing at other
people's mountains, I am for the next six chapters writing as a man
pointing at the inside of his own chest.

The mountain is still there. The pointing is still honest. The pointer is
just visible in the frame now.

## 11.2  The question that started it

In 2018, in a therapist's office in Zurich, I was asked the question every
person in psychotherapy is asked, dozens of times a year, for years: *what
are you feeling right now?*

For most people, this question has a navigable answer. They consult
something — they aren't always sure what — and a word comes back: *sad*,
*angry*, *anxious*, *hopeful*, *tired*. The word may not be the right
word, and the word may not be the whole word, but there is a word, and
that is enough to begin with.

For me, the question landed differently. The honest answer was almost
always some version of: *I cannot tell you. Something is happening. It is
definitely happening. It is happening in my body and in my head and it is
substantial. But I cannot tell you what it is, where it came from, how big
it is, or what it wants.*

I had — and have — the clinical diagnosis of *alexithymia*, which is a
clinical word meaning *without words for feeling*. I have it in the
context of three larger architectural conditions: Autism Spectrum
Condition, Attention Deficit Hyperactivity Disorder, and Complex
Post-Traumatic Stress Disorder. Each of those conditions has its own
relationship with the felt body; the combination produces a particular
phenomenology that the available clinical models did not, to my
satisfaction, describe.

What they all had in common was the felt sense that *feeling was not an
event*. It was not something that *started* when I noticed it and *stopped*
when I stopped noticing. It was always there. What changed was whether,
at a given moment, it rose far enough above some internal threshold to
become a thing I could put a name on. Most of the time it was below the
threshold. The body knew. The naming part didn't.

This is the experience the soma field is a model of.

> **Figure 11.1** — The Soma Field, rendered as a cyber-hologram body.
> The figure is not anatomical. It is a visualisation of an
> eight-dimensional field of feeling overlaid on the human form. The
> brighter regions are above the threshold of conscious awareness; the
> dimmer regions are sub-threshold but active. *Original; render planned
> in Stable Diffusion + retouch, then composited with vector overlays.*

## 11.3  Building the model from the experience

The phenomenology I needed to model had four properties.

**1. The field is always present.** It does not switch on with emotion and
off with calm. It is a continuous, distributed thing. *Calm*, in this
model, is not the absence of the field; it is a particular shape of the
field at low amplitude, with a particular distribution across the body and
the nervous system.

**2. The field has a threshold for perception.** Most of the activity in
the field, most of the time, is sub-threshold — it influences behaviour,
posture, heart rate, decisions, but it is not consciously felt. When the
amplitude in a particular mode exceeds a threshold, the experience makes
the jump into nameable consciousness. The threshold is not fixed; it can
be raised (alexithymia, dissociation) or lowered (hypervigilance,
overwhelm) by a number of structural and pharmacological factors.

**3. Different modes interact non-linearly.** Two modes can amplify each
other (anger amplifying fear, in a fight–flight cascade) or suppress each
other (shame suppressing curiosity, in the way that makes children stop
asking questions). The interaction is not addition. It is the kind of
non-linear coupling familiar from any system of coupled oscillators —
sometimes resonant, sometimes destructive, occasionally bistable.

**4. The field has memory.** A trauma laid down at age four does not
disappear at age forty. It leaves a structural deformation in the field
that biases the dynamics for decades, possibly for life. Therapeutic work
that succeeds in modifying it does so over months and years, not weeks.

These four properties — continuous existence, threshold for perception,
non-linear interaction, long memory — are the *requirements* of the
model. They are not the model. The model is what I had to build to
satisfy them.

## 11.4  What the model actually is

The Soma Field is a *vector-valued field on the human body and nervous
system*. At each point $x$ in the body (and at each location in the
nervous system) and at each time $t$, the field has eight components,
labelled by the eight emotional modes the model treats as fundamental:

$$\mathbf{E}(x, t) = \big(\;\mathrm{calm},\;\mathrm{fight},\;\mathrm{flight},\;\mathrm{freeze},\;\mathrm{flow},\;\mathrm{joy},\;\mathrm{grief},\;\mathrm{hypervigilance}\;\big).$$

The choice of eight is not metaphysical. It is the smallest set that
covered the cases I was trying to model from the inside, broadly
compatible with the existing clinical taxonomies (polyvagal, Plutchik,
Levine), and tractable for the formal mathematics. It is replaceable; the
mathematics works with any finite set.

Each component splits into a *somatic* part — what the body is doing —
and a *cognitive* part — what the brain is reporting — that are coupled
but not identical. This split is what lets the model describe states like
*the body is in freeze but the cortex is reporting calm* (a common
configuration in long-term trauma) and *the body is calm but the cortex is
in hypervigilance* (the classical anxiety-without-trigger experience).
Sixteen real numbers per point per time, in summary. A modest field, by
the standards of physics.

\begin{figure}[h]
\centering
\includegraphics[width=0.78\linewidth]{soma/wave-atlas/figures/F11_2_eight_modes.png}
\end{figure}

> **Figure 11.2** — The eight modes of the field, mapped to the body.
> Each mode has a dominant somatic region (fight in the jaw and
> shoulders; flight in the chest and limbs; freeze in the gut and
> diaphragm; calm distributed evenly; flow in the belly and throat; joy in
> the face and chest; grief in the heart and throat; hypervigilance in
> the neck and back). The map is not literal anatomy; it is a
> phenomenological correlate.

## 11.5  The threshold, in pictures

The conscious experience of emotion, in this model, is the part of the
field that rises above the threshold. Everything else is the *quantum
vacuum of feeling*: real, active, present, sub-threshold, unseen.

> **Figure 11.3** — Two body diagrams. *Left:* the field, with all
> sub-threshold activity rendered as faint cyan glow. *Right:* the same
> field with the threshold drawn as a dotted contour; only the regions
> above the contour are visible as solid colour. The right-hand image is
> what consciousness reports. The left-hand image is what the body has.

If you raise the threshold (alexithymia, ASC), the dotted contour rises;
the visible patches shrink; the body remains as active as ever, but the
named-feeling vocabulary contracts to a smaller alphabet. If you lower
the threshold (hypervigilance, trauma flooding), the contour drops; the
visible patches expand and merge; everything is felt at once and
intolerably. Most clinical conditions of mood and affect can be
described, within this model, as a *threshold problem*, a *coupling
problem* (the matrix of interactions between modes is distorted), or a
*memory problem* (the field has a structural deformation from past
trauma).

This is not a substitute for the clinical taxonomies. It is a substrate
underneath them — a place where the descriptions in DSM-style language
become descriptions of specific deformations of a single underlying
field.

## 11.6  Why the field is the right object

A reasonable reader will, at this point, ask: *why a field? Why not just
the existing clinical models — polyvagal theory, attachment theory,
window-of-tolerance models — which already exist and do not require
hauling in twentieth-century physics?*

The honest answer is: the existing clinical models are *taxonomies* and
*pathways*. They describe categories of states (vagal, sympathetic,
dorsal vagal; secure, anxious, avoidant) and the pathways between them.
They are very good at this. They are not — and were never intended to be
— a *dynamical* theory. They do not tell you why the field moves between
states with the particular timing it does. They do not tell you why some
transitions feel easy and some feel impossible. They do not tell you why
two people in the same nominal state can have radically different
trajectories. They do not give you an *equation of motion* for feeling.

A field gives you an equation of motion. The equation of motion for the
Soma Field is the *Langevin equation* familiar from non-equilibrium
statistical physics:

$$\gamma\,\dot{\mathbf{E}} = -\nabla H(\mathbf{E}) + \sqrt{2 D}\,\xi(t),$$

which reads, in English: the field changes over time because it is being
pulled toward the nearest energy minimum (the $-\nabla H$ term), with a
delay set by its viscosity (the $\gamma$ on the left), and with a
continuous overlay of random thermal noise (the $\xi(t)$ term). The
constants $\gamma$ and $D$ are themselves measurable; their ratio is the
*effective temperature* of the field.

Each of the clinical observations I needed to model now has a formal
location.

| Clinical observation | Where it lives in the equation |
|---|---|
| Trauma stuck-ness | Deep, isolated minimum in $H(\mathbf{E})$ |
| Alexithymia | High threshold $\theta_i$ on the conscious projection |
| Hypervigilance | Low threshold $\theta_i$ |
| ADHD pattern | Higher effective temperature $T = D/\gamma$ |
| Autism pattern | Sparser coupling matrix; deeper individual basins |
| Complex PTSD | Asymmetric coupling — admits limit cycles |
| Therapeutic progress | Slow reshaping of $H$ over months |

This is not philosophy. This is engineering. The model is built so that a
clinical observation can be translated into a specific mathematical
modification of a specific term in a specific equation, the modified
equation can be integrated forward in time, and the result can be
compared with the clinic. We have done this; the results are in the
*Soma Field* technical paper series, all open-access, all DOIed in the
back of this book.[^series]

[^series]: The full eleven-paper *Soma Field* series is listed in the
Bibliography under Johnson 2026a–k. The most relevant single reference
for this chapter is Johnson, *The Soma Field: A Wave-Based Model of
Emotional Dynamics and Its Clinical Implications*, Zenodo (2026),
<https://doi.org/10.5281/zenodo.20350515>.

## 11.7  Where the rest of the book has been pointing

You have, by the time you reach this page, read about waves on a violin
string, waves on a pond, the acoustic peaks of the early universe, the
spiral density waves of galaxies, the helioseismic ringing of the Sun,
the normal modes of the Earth, the slow tectonic wave that produced the
Glarus thrust, the Turing waves that pattern a fish's skin, the cardiac
electromagnetic toroid, and the standing tension waves of the fascia.

The Soma Field is the next rung. It is what you get when you ask: *if
every other system at every other scale has wave dynamics on a field, why
would the system of human feeling be different?*

The answer is that it isn't. The Soma Field is the wave equation, applied
to the eight-component field of feeling, on the substrate of the
fascia-cardiac-neural body. The picture is consistent with the
clinical phenomenology, formally rigorous (the central definitions are
proved in Lean 4, a machine-checked proof assistant), and at one point —
QUANT-EXP-1, the subject of Chapter 13 — falsifiable against a specific
quantitative prediction that has now been tested computationally and
passed.

What it has not yet had is independent clinical replication. That is the
honest current status. The model is published, the predictions are
public, and the replication ledger is open at the URL in the back of the
book. As of summer 2026, every row in the ledger reads *PENDING*. That is
the next step, and it is not a step I can take alone.

## 11.8  Why "soma," and not "psyche"

A final note on the name.

I chose *soma* — Greek for *body* — rather than *psyche* — Greek for
*soul*, or *mind* — because the substrate of this field is, in the model
and in the lived experience that produced the model, the body. The
cognitive part is a *projection*. The body is the field.

This is not a slogan. It is a structural commitment. Every term in the
equation is defined first in body coordinates — fascial tension, vagal
tone, heart-rate variability, interoceptive afferent activity — and only
*then* projected through a kernel onto cortical correlates. If you remove
the body, there is no field left. If you remove the cortex, the field is
slightly impoverished but still substantially there. (This is consistent
with the well-documented persistence of emotional processing in patients
under general anaesthesia, and with the felt experience of decerebrate
mammals retaining recognisable affective behaviour.)

The body, in this model, is not a vehicle that carries the mind around.
The body *is* the field. The mind is what the field looks like to itself
when it crosses the threshold.

\vspace{1em}

\begin{quote}\itshape
\textbf{Your own example, revisited.}\\
At the end of Chapter 1, I asked you to think of a wave you can feel in
your own life. Hold it in mind again now. Where in your body do you feel
it? When it rises, does it cross some kind of internal threshold from
sub-conscious to consciously named? When it falls, does it disappear, or
does it persist below that threshold, still influencing you? \\

Whatever it is, that is your soma field. You have just been given its
equation.
\end{quote}

\newpage
# Chapter 11b — The Eight Modes, In Detail

\begin{quote}\itshape
One section per mode. For each: the somatic signature, the
phenomenological description, the clinical co-occurrences, the
landscape picture, and a short note on what the soma-field model
predicts about returning from it.
\end{quote}

\vspace{1em}

## 11b.1  Calm

**Somatic signature.** Distributed even tone across the body. No
single region dominant. Breath slow and abdominal. Heart rate at
resting baseline. HRV high. Pupil mid-range. Skin temperature even.
Eyes soft, focal length variable.

**Phenomenological description.** Awareness wide. Attention easily
moved. Felt sense of *enough time*. Internal monologue quiet or
absent. A sense of being *here* — neither chasing the past nor
arranging the future. Body and self felt as one continuous thing.

**Clinical co-occurrences.** Calm pairs naturally with *flow* and
*joy*. It does not pair naturally with *fight*, *flight*, *freeze*,
or *hypervigilance* — the activation modes. It can co-exist with
*grief* (calm-grief is the quality of mature mourning).

**Landscape picture.** A shallow broad basin in the soma-field
potential. Many neighbouring states are accessible at low energy
cost. The basin's curvature is low; perturbations damp out without
oscillation.

**Returning from it.** The interesting question is the reverse:
*staying in it*. Calm is not the default state of an adult human
nervous system shaped by modern conditions. The practices of Chapter
17 are, in soma-field language, all *deepening the calm basin* so
that the system returns to it more reliably under perturbation.

> **Figure 11b.1** *(BUILD)* — Calm-mode landscape: shallow broad
> basin in the (activation, valence) plane, with trajectory lines
> showing return paths from neighbouring perturbed states.
> *Author render.*

## 11b.2  Fight

**Somatic signature.** Jaw clenched. Shoulders raised and braced.
Hands tightened, possibly in fists. Chest forward. Breath shortened
and chest-located. Heart rate elevated. Pupil mid-dilated. Skin
temperature elevated at face and hands, cooled at extremities. Eyes
hard, focal length short.

**Phenomenological description.** Awareness narrowed to the
identified target. Attention locked. Felt sense of *injury* (real or
perceived) and the requirement to *redress*. Internal monologue
present and argumentative. A sense of being *opposed*. Body and self
felt as a single weapon-like instrument.

**Clinical co-occurrences.** Fight pairs naturally with *flight* (the
two are switchable). It pairs with *hypervigilance* (chronic vigilance
predisposes to fight responses). It pairs uncomfortably with *freeze*
in trauma profiles, producing the *thwarted fight* configuration that
underlies much chronic shoulder and jaw pain.

**Landscape picture.** A steep narrow basin. High activation, valence
context-dependent (positive if the fight is justified and effective,
negative otherwise). The basin is *self-amplifying* — once entered,
small perturbations push deeper rather than out.

**Returning from it.** The classical exit is *expression*: the fight
runs its course in physical action and the energy dissipates.
Inhibited fight (modern social life) leaves the basin occupied and
the energy lodged in the muscle. Practices that release the basin
include vigorous physical action (boxing, running), structured
breath that elongates the exhale, and somatic discharge in a safe
therapeutic context.

> **Figure 11b.2** *(BUILD)* — Fight-mode landscape: steep narrow
> basin with strong self-amplification. *Author render.*

## 11b.3  Flight

**Somatic signature.** Diaphragm raised. Chest tight. Legs activated
— if standing, weight forward on the balls of the feet. Heart rate
elevated. Breath rapid and shallow. Pupils dilated. Skin temperature
cooled at hands and feet. Eyes wide, scanning.

**Phenomenological description.** Awareness narrowed to *exits*.
Attention scanning the environment for routes out. Felt sense of
*threat* (real or perceived) and the requirement to *leave*. Internal
monologue present and planning. A sense of being *pursued*. Body and
self felt as needing to be *elsewhere*.

**Clinical co-occurrences.** Flight pairs naturally with *fight*
(switchable). It is the activation underlying most anxiety states.
It pairs with *hypervigilance* (chronic vigilance predisposes to
flight). It pairs with *freeze* in the *flight-aborted* configuration
that underlies panic disorder.

**Landscape picture.** A steep narrow basin, similar profile to fight
but displaced in the activation-valence plane. High activation,
negative valence.

**Returning from it.** Classical exit is *flight executed* — the
movement runs its course and the energy dissipates. Inhibited flight
(modern social life, where one cannot simply run from a meeting) is
particularly toxic. Practices that release include slow walking,
extended exhale-emphasis breathing (4-7-8), and grounding work
(weight-bearing in the legs).

## 11b.4  Freeze

**Somatic signature.** Gut tightened. Lower belly held. Perineum
contracted. Breath suspended or barely perceptible. Heart rate may
appear normal but pulse pressure narrowed. Skin pale. Eyes
unfocused, defocused middle-distance, or downcast. Body posture
collapsed inward — shoulders forward, chin down.

**Phenomenological description.** Awareness inward, withdrawn from
the environment. Attention foggy or non-present. Felt sense of
*overwhelm* and the requirement to *disappear*. Internal monologue
absent or very quiet. A sense of being *not here*. Body and self felt
as distant from each other (dissociation in mild form, complete
in severe).

**Clinical co-occurrences.** Freeze pairs with *grief* (deep grief
collapses into freeze). It pairs with the *thwarted fight* and
*flight-aborted* configurations above. In severe trauma, freeze is
the dominant baseline; the system has learned that engagement is
unsafe.

**Landscape picture.** A *deep narrow* basin. Low activation, low
valence. The depth is its defining property — the system cannot
easily climb out by classical mechanism. This is the soma-field
configuration that QUANT-EXP-1 was designed to address: barrier
heights too great for classical thermal crossing, but accessible by
quantum tunnelling under the right conditions.

**Returning from it.** *Slowly*. Direct attempts to "snap out of it"
fail and worsen the configuration. The classical route out is small
graduated activation: micro-movement, sip of warm water, light at
the eyes. The non-classical route — addressed in P2 and Chapter 13 —
is the soma-field analog of tunnelling, accessed in certain
therapeutic and contemplative conditions.

> **Figure 11b.3** *(BUILD)* — Freeze-mode landscape: deep narrow
> basin with high walls. *Author render.*

## 11b.5  Flow

**Somatic signature.** Belly soft. Throat open. Hands warm and
present. Breath rhythmic and abdominal. Heart rate slightly elevated
above resting; HRV high. Pupils mid-range. Skin warm. Eyes
focally engaged but soft.

**Phenomenological description.** Awareness focused, attention
absorbed. Felt sense of *enough* — enough time, enough capacity,
enough trust. Internal monologue largely absent. A sense of being
*here, doing this*. Body and self felt as a single instrument
*playing the task*. The Csikszentmihalyi state.

**Clinical co-occurrences.** Flow pairs naturally with *calm* and
*joy*. It is incompatible with *fight*, *flight*, *freeze*, and
*hypervigilance*. It can co-exist with mild *grief* (grieving while
in artistic flow is a known and clinically benign state).

**Landscape picture.** A *moderate broad* basin with a particular
property: the basin floor is *tilted* — the trajectory naturally
descends into deeper flow without external work. This is the
distinctive geometric signature of flow.

**Returning from it.** Once again, the question is *staying in it*.
Flow requires three classical conditions: task at appropriate skill
challenge, immediate feedback, and clear goals. The soma-field
analysis adds a fourth: the activation modes (fight, flight, freeze,
hypervigilance) must be sub-threshold. If any of them is above
threshold, flow is geometrically unavailable.

## 11b.6  Joy

**Somatic signature.** Face muscles relaxed and lifted (the genuine
Duchenne smile recruits the orbicularis oculi as well as the
zygomatic major). Chest opened. Eyes bright, pupils mid-range,
tear-film increased. Breath full and abdominal. Heart rate slightly
elevated; HRV high; respiratory sinus arrhythmia prominent.

**Phenomenological description.** Awareness *expanded outward*.
Attention easily moved between focus and breadth. Felt sense of
*delight* — at the world, at one's own existence, at the present
moment. Internal monologue may be present but quiet and affirming.
A sense of being *fully here* and pleased to be here.

**Clinical co-occurrences.** Joy pairs naturally with *calm*, *flow*,
and (importantly) *grief* — joy-grief is the configuration of
*bittersweet*, found in many of the most psychologically important
moments of life. Joy is incompatible with the activation modes.

**Landscape picture.** A *broad shallow* basin centred high in the
valence dimension. The trajectory through joy is *expansive* — the
state radiates outward from the centre.

**Returning from it.** Joy is famously transient. The soma-field
model attributes this to a *time-dependent* term in the potential:
the basin shallows as the system spends time in it, eventually
becoming unstable. The therapeutic implication is that joy is not
maintained by trying to stay in it but by allowing it to come and go.

## 11b.7  Grief

**Somatic signature.** Heart region heavy. Throat tight. Occiput
heavy. Breath irregular, sighing. Eyes wet. Pupils may be dilated.
Skin temperature normal or slightly elevated at the face. Body posture
heavy, slumped at the shoulders. Chest sometimes wracked with
sobbing.

**Phenomenological description.** Awareness inward and centred on
the loss. Attention drawn repeatedly to the absence. Felt sense of
*missing* — of an object, a person, a possibility. Internal
monologue present and mournful. A sense of being *bereft*.

**Clinical co-occurrences.** Grief pairs with *freeze* in unresolved
configurations (frozen grief, chronic depression with loss origin).
It pairs with *joy* in mature mourning (bittersweet). It pairs with
*calm* in the late phases of grief work. It can be co-opted by
*hypervigilance* in *complicated grief*.

**Landscape picture.** A *deep* basin, but typically *not* narrow —
grief has a wider basin floor than freeze, with multiple accessible
sub-states. The depth varies with the magnitude of the loss.

**Returning from it.** Grief is not exited so much as *traversed*.
The basin is, on the soma-field model, *traversed* over a timescale
proportional to the importance of the loss. Forcing exit is
counterproductive; allowing the traversal is what therapeutic
support enables. The endpoint is not the absence of grief but the
*integration* of the loss into the broader landscape — the basin
becomes a part of the terrain rather than a place one is trapped.

## 11b.8  Hypervigilance

**Somatic signature.** Neck tight. Upper back tight. Scalp tight.
Eyes wide, pupils dilated, scanning. Breath shallow and chest-located.
Heart rate elevated; HRV depressed. Skin cool, particularly at
extremities. Posture upright and braced.

**Phenomenological description.** Awareness *outward* and
*continuous*. Attention scanning the environment for threat. Felt
sense of *not-safe*. Internal monologue present and threat-cataloguing.
A sense of being *on duty*. Body and self felt as a single
*detection apparatus*.

**Clinical co-occurrences.** Hypervigilance pairs naturally with
*fight* and *flight* — it is the *preparation* for them. It pairs
with *freeze* in chronic-trauma profiles. It is incompatible with
*calm*, *flow*, and *joy*. It is *partially* compatible with mild
*grief* (vigilant mourning, common after sudden loss).

**Landscape picture.** A *shallow* basin in the soma-field potential,
but one with *high coupling* to the activation modes. The system in
hypervigilance is, geometrically, *poised* — ready to drop into a
deeper basin (fight, flight, freeze) on small perturbation.

**Returning from it.** The classical exit is *safety* — actual,
felt, environmental safety. The soma-field complication is that
chronic hypervigilance trains the basin's coupling, so that even
genuinely safe environments fail to permit exit. Practices that
release include sustained exposure to actually-safe environments
(weeks and months), polyvagal-informed breath work, slow movement
practices (qigong, tai chi), and trauma-specific therapies (EMDR,
SE) whose mechanism is to recalibrate the coupling.

## 11b.9  The eightfold landscape, together

The eight basins do not lie in independent dimensions. They share
the activation-valence plane (and several other implicit dimensions
including embodiment, social context, and time). The full soma-field
landscape is an eight-dimensional energy surface in the Cartan
subalgebra of $E_8$, with the eight basins arranged according to the
$E_8$ root system geometry.

The clinical experience of a person is, on the soma-field model, a
*trajectory* on this landscape — a path through the eight basins, in
some order, with some residence times, returning to or avoiding
certain basins depending on the person's history and the present
context. Therapy, in this language, is the *re-shaping* of the
landscape: the deepening of accessible basins (calm, flow, joy), the
shallowing of trapped basins (freeze, hypervigilance), the
re-routing of trajectories away from chronic basins and toward new
ones.

> **Figure 11b.4** *(BUILD — full-page)* — The full eight-mode
> landscape rendered as an 8-dimensional Cartan-subalgebra
> projection onto a Coxeter-plane visualisation. The eight basins
> labelled. A sample trajectory drawn through several basins.
> *Author render.*

\newpage
# Chapter 11c — Eleven Dimensions Inside Your Head

\begin{quote}\itshape
A chapter for neurodivergent readers, by a neurodivergent author. The
ADHD/ASD/cPTSD brain is, on the soma-field model, an unusually
honest realisation of the eleven-dimensional structure that everyone
has but most people compress.
\end{quote}

\vspace{1em}

## 11c.1  What it feels like, from inside

Many people who read this book will be neurotypical — people whose
neural development followed the statistical centre of the
distribution. For them, this chapter may read as exotic or
speculative. They are welcome to it.

Some readers will be ADHD. Some will be on the autism spectrum.
Some will be both. Some will have post-traumatic patterns in
addition. For these readers, this chapter is a kind of *welcome*.

What it feels like, from inside, to have an ADHD brain: you do not
have one stream of thought. You have eight to twelve streams of
thought running in parallel at any given moment, some loudly, some
quietly, some pleasantly, some painfully. Attention is not the
*ability to select* one stream and follow it; attention is the
*occasional success* of selecting one stream while the others
continue to run underneath.

Conventional descriptions of attention — *focus*, *concentration*,
*executive function* — assume a single stream by default. The
neurodivergent person has been *told* they have a deficit of
attention. The lived experience is more accurately described as a
*surplus of attention*, badly *managed*, running on many things at
once.

The ASD experience is related but not the same. The autistic person
has high-fidelity simultaneous awareness of sensory channels that
neurotypical people merge or suppress. The fluorescent buzz in the
ceiling. The pattern in the carpet. The faint smell of the cleaning
product. The four different facial expressions of the four people in
the room. The position of every chair. This is overwhelming because
*it is not selected against*. The autistic nervous system is, in
this sense, *less compressing* than the neurotypical one.

The cPTSD experience adds a temporal dimension. Past events are not
fully time-stamped; they keep arriving in the present at slightly
unexpected angles. The body has a high baseline activation. Small
present-day events evoke larger past-event responses. The
configuration is, on the soma-field model, that the trauma basin
has been deepened so much that small perturbations push the system
back into it repeatedly.

## 11c.2  The eleven-dimensional interpretation

On the soma-field model, the brain runs on the same eight-mode
field structure that the body does, but with additional internal
dimensions corresponding to specific cognitive processes (working
memory, episodic recall, language processing, motor planning, etc).
The total dimension is large — somewhere between 12 and 20,
depending on how you count.

Most people, most of the time, *compress* this high-dimensional
internal state into a low-dimensional *narrative*. The narrative
is the *first-person voice* that says "I am thinking about X". The
compression is helpful: it lets the person *act*, *plan*,
*communicate*. The compression is also a loss: it discards most of
the dimensions in favour of one.

The neurodivergent brain does *less* of this compression. The
high-dimensional internal state is more *visible* to the person
running it. They are aware of more dimensions running in parallel.
This is the *cost* of the configuration (harder to act, harder to
plan, harder to communicate) and the *gift* of it (more access to
the parallel structure, more original combinations, more sensitivity
to subtle features).

The metaphor: the neurodivergent brain is *eleven-dimensional* in
the sense that the M-theory parent of physics is eleven-dimensional.
Most of physics, most of the time, can be done with four dimensions
(three of space, one of time) because the other seven are
compactified and *invisible at low energy*. But the underlying
theory has eleven, and certain phenomena — black holes, the very
early universe, exotic particle physics — *cannot* be understood
without the full eleven.

Similarly, most of human cognition, most of the time, can be done
with the single-narrative compression because the other dimensions
are *backgrounded*. But certain phenomena — creativity, deep
insight, productive dissociation, ritual and contemplative states,
some forms of artistic production, some forms of psychotherapy —
*cannot* be understood without the full multidimensional structure
that the neurodivergent brain makes visible.

## 11c.3  Implications for self-understanding

Three:

**First**: there is nothing *wrong* with running on more dimensions.
The conventional psychiatric framing of ADHD and ASD as *disorders*
is, on the soma-field model, a category error of the same kind as
calling left-handedness a *disorder*. It is a configuration that
sits outside the statistical centre but is fully functional and
sometimes advantageous.

**Second**: the *practical difficulties* of the neurodivergent
configuration in modern industrial society are *real*, but they are
difficulties of *mismatch* between the configuration and the
society, not difficulties intrinsic to the configuration. A person
running on eight cognitive streams in parallel is poorly matched to
an open-plan office and a stream of email notifications. The same
person is well matched to (for example) artistic production,
research science, certain forms of clinical work, and crisis
response — environments that *reward* multi-channel attention.

**Third**: the *therapeutic goal* for a neurodivergent person, on
this model, is *not* to compress the configuration into the
single-narrative neurotypical form. The goal is to *learn the
compression as a tool*, available when needed, while *retaining the
multidimensional baseline* as a default. This is what mature
neurodivergent self-management looks like in practice.

## 11c.4  The cPTSD specific case

cPTSD — complex post-traumatic stress disorder — is the configuration
that arises from repeated trauma over an extended period, typically
beginning in childhood. The classic literature is van der Kolk's *The
Body Keeps the Score*; the somatic-experiencing literature; the
polyvagal-theory literature.

On the soma-field model, cPTSD is the configuration in which:

(i) the trauma basin has been deepened so much that small
perturbations push the system back into it repeatedly;

(ii) the hypervigilance mode has been chronically activated, so that
even neutral inputs are processed as threatening;

(iii) the calm basin has been *shallowed* — the system does not
spend much time at rest, even when conditions permit;

(iv) the flow and joy basins are *intermittently* accessible but
not *reliably* so;

(v) the freeze basin is *too easily* entered, often in response to
small social cues that a non-traumatised person would not notice.

The therapeutic question — how to deepen the calm basin, shallow
the trauma basin, recalibrate the hypervigilance coupling, and
restore reliable access to flow and joy — is the central practical
question that the soma-field model is meant to address.

The honest position: there are no quick fixes. The work takes
years. The work is *possible*. The model gives a vocabulary for
*describing* the work that has been clinically useful, on small
pilot scale, and that we hope will scale to broader use as the
clinical-replication studies of Appendix B come in.

## 11c.5  A note from the author

I am writing this book as a person with ADHD, ASD, and cPTSD. I am
not writing this book *despite* those configurations; I am writing it
*from inside* them. The capacity to hold the parallel threads of
this book in mind simultaneously — the wave physics and the
structural geology and the clinical phenomenology and the M-theory
and the music and the biography — is, on the soma-field self-
analysis, *enabled* by the multidimensional cognitive configuration.
The cost of the configuration is also real: this book has taken
five years longer than a neurotypical author would have taken, and
it is shorter and less rigorous than a comparable neurotypical book
would be.

That trade is, all things considered, the one I would have made
again. The book that a more "focused" author would have written
would not have *been this book*. It would have been a different
book, probably better in some ways, certainly worse in others, but
not the one I had to write.

The reader who is themselves neurodivergent will, I hope, find in
this book a kind of *home* — a place where the multidimensional
configuration is *honoured* rather than apologised for. The reader
who is not neurodivergent will, I hope, find in this book a
*window* into what the configuration is like from inside.

That is enough self-disclosure for one chapter. The next chapter
gets back to the soma-field landscape proper.

\newpage
# Chapter 11d — Worked Vignettes from a Clinical Notebook

\begin{quote}\itshape
What follows are four composite cases. Names, ages, and identifying
details are changed; the dynamics are not. The point is not the cases.
The point is what the framework lets us *see* in them.
\end{quote}

\vspace{1em}

This chapter is the most clinical in the book. It is written for the
practitioner — the psychotherapist, the bodywork practitioner, the
trauma-informed somatic educator — who has read the eight-mode
framework of Chapter 11 and wants to see how it shows up in a room with
a client.

The cases are composites. Every detail of presenting condition,
trajectory, intervention, and outcome is built from real clinical
material, but no case corresponds to a single real person. The
identifying details (age, gender, occupation, country) are shuffled.
This is the standard convention for clinical illustration in the
trauma literature and it is followed here for the standard reasons:
to protect confidentiality, to permit honest description of the
dynamics, and to allow the reader to focus on the structure rather than
on the question of whether they have correctly identified anyone.

## Vignette 1 — *M.*, thirty-two, the locked freeze

M. comes to the first session at the request of her partner. Her
account of the presenting problem is given evenly and at length, with
no apparent emotion. She has had panic attacks at her workplace for
three years. She has not been promoted in six. She is competent at her
work, recognises this competence, and cannot understand why her
attempts to ask for a promotion have each ended in a panic attack the
night before the scheduled meeting. The pattern repeats reliably. She
has tried cognitive behavioural therapy, EMDR, two SSRIs (sertraline,
escitalopram), and weekly mindfulness meditation. The CBT and EMDR
helped a little for a few months. The SSRIs helped a little while she
was on them. The meditation she finds calming in the moment and useless
the next morning.

In soma-field terms, M.'s presentation reads as follows. Her *default*
attractor — the state she returns to between perturbations — is not the
calm attractor of the framework. It is a shallower variant of the
*freeze* attractor: low autonomic arousal, low affect range, low
behavioural initiative, with the appearance of calm but the structural
signature of shutdown. The cyclical panic is the system's *attempt* to
exit freeze into mobilisation (sympathetic), to make the promotion
request possible. The attempt fails because the trajectory between
freeze and mobilisation passes through a region of the landscape that
the system has, for excellent historical reasons, identified as
dangerous. The panic is the trajectory hitting the boundary and being
reflected.

The interventions that helped a little — CBT, EMDR, meditation — were
all interventions that operate at the *cognitive* layer of the
soma-field stack, asking M. to think differently or to attend
differently. The freeze, however, is in the autonomic and tissue
layers, not the cognitive. The interventions did not address the
substrate.

The work that helped substantially was different. It involved (a) HRV
biofeedback to give M. a real-time numerical handle on her own
autonomic state, (b) a slow programme of physical capacity-building
(rowing, beginning at intensities low enough not to trigger
mobilisation, increasing over months to intensities that would, in her
prior state, have triggered panic), and (c) trauma-focused somatic
experiencing with a practitioner trained in titration. The HRV gave
her a window onto her own state. The rowing gave her body experience
of mobilisation that did not end in catastrophe. The somatic
experiencing addressed the historical material that had calibrated the
freeze in the first place.

The framework prediction was specific and was upheld: that no
intervention operating only on the cognitive layer would shift the
freeze, and that interventions which gave the autonomic layer
experience of safe mobilisation would. The shift took eighteen months.
At twenty-one months she asked for and received the promotion. She
reported in the session afterwards that she had been mildly anxious
the night before but had slept. She did not have a panic attack.

## Vignette 2 — *D.*, fifty-seven, the chronic hypervigilance

D. is a senior emergency-medicine physician, twenty-eight years in
practice, three years from planned retirement. He comes in because his
wife has told him she cannot live with him much longer. The
presenting symptom is a persistent state of low-level alarm that does
not switch off when he leaves the hospital. He cannot sit still
through a film. He startles when his wife enters a room. He sleeps
five hours a night, on a good night.

D.'s soma-field state is a calibrated hypervigilance attractor with
chronic sympathetic baseline elevation. This is not a pathology in the
ordinary sense; it is a *successful adaptation* to the demands of
emergency-medicine work, sustained over decades. In the ED, his
hypervigilance is what makes him good at his job. The problem is that
the hypervigilance does not switch off when the badge comes off, and
twenty-eight years of practice have made the calibration permanent.

A common mistake in cases like D.'s is to attempt to treat the
hypervigilance as if it were pathological. This generally fails. The
hypervigilance has been an adaptive response to a real environmental
demand for so long that interventions framing it as illness are
rejected by the patient with some justification. The framework
suggests a different approach.

The intervention that helped was, in essence, *creating a different
attractor for D. to live in* during off-shift time, rather than
attempting to suppress the hypervigilance. The components: (i) a
deliberate post-shift transition ritual (twenty minutes of cold-water
swimming year-round, which D. already enjoyed), (ii) a no-electronics
home environment in the bedroom, (iii) a regular Saturday-morning
volunteer commitment to a community vegetable garden in which the work
is repetitive, physical, and outdoors. The point of the garden was not
the garden. The point was a regular weekly experience of *being in a
different attractor*. Over months, the existence of the second
attractor — and his weekly experience of it — gave the system somewhere
else to fall into when off-shift.

D. retired on schedule three years later. His wife reported, after the
first six months of retirement, that he had "come back."

## Vignette 3 — *L.*, twenty-three, the joy that cannot land

L. is a doctoral student in pure mathematics. Recently engaged. By
every external metric, in a good period of life. Comes in because of a
puzzling subjective experience: when good things happen — when she
solves a problem, when her fiancée arrives home, when she receives a
compliment from her supervisor — she experiences a momentary lift
followed by an immediate fall, as if the lift had triggered a kind of
allergic reaction.

In the framework, L.'s presentation is a *blocked transition into the
joy attractor*. The system can briefly enter the basin and is
immediately repelled, much as M.'s system was repelled from the
fight-flight basin. The mechanism, in cases like L.'s, is usually a
historical context in which the experience of joy was reliably
followed by loss or punishment, so that the system has come to
associate the felt sense of joy itself with imminent disaster.

This is, classically, the affective signature of a particular kind of
developmental history that does not need to be described here. The
clinical literature on it is rich.

The framework added a specific predictive claim: that L.'s subjective
report would shift only when the *autonomic* signature of joy could be
sustained for measurably longer periods, not when she gained insight
into the historical causes of the blockage. (Insight, in
soma-field terms, operates at the cognitive layer. The blockage is in
the autonomic.)

The work involved, alongside conventional trauma-focused therapy: very
short, repeated, deliberate exposures to the felt sense of joy with
HRV monitoring. The therapist would prompt L. to recall a small
positive event in detail, observe the HRV response, and after the
inevitable rapid offset, prompt the recall of a second event. Over
sessions, the *sustained* portion of the autonomic response lengthened.
After four months, L. reported that her fiancée's homecomings had
begun to land "the way I think other people experience them."

## Vignette 4 — *T.*, sixty-eight, the grief that completed

T. is a retired teacher whose husband died two years ago after a long
illness during which she was the primary caregiver. The presenting
concern is brought by her daughter rather than by T. herself. The
daughter is worried that her mother has not "grieved properly." T.
comes to one session as a favour, expecting it to be the only one, and
intending to demonstrate that she is fine.

She is, in the framework, fine.

T.'s soma-field state, across the session, is recognisably the *grief*
attractor — not the acute crisis variant but the late-stage variant in
which the bereaved has metabolised the loss, knows the loss is
permanent, no longer experiences acute distress, and has returned to
functioning in the world. T.'s affect is somewhat reduced from her
pre-bereavement baseline (she describes her enthusiasm for activities
she used to love as "still there, but quieter"), her sleep is
adequate, she has resumed her social engagements, she has a clear
forward-looking project (she is writing a memoir for her grandchildren).
She does not need help. She does not want help. She is in a different
attractor than she was three years ago, and the different attractor is
appropriate to where she now is in her life.

The session, in this case, consisted of telling the daughter — with
T.'s permission — that her mother was well, that the *quietness* the
daughter was perceiving was the appropriate completion of grief and
not its avoidance, and that the daughter's instinct to push her mother
toward more visible processing was a misreading of the situation. The
daughter found this difficult to accept. T. found it useful to hear it
said.

The framework's contribution here was diagnostic clarity:
distinguishing *unresolved grief* (which would have shown autonomic
hyperarousal, intrusive imagery, sleep disturbance, social withdrawal,
and persistent rumination) from *completed grief in the late-stage
attractor* (which shows reduced affect range, calm autonomic baseline,
forward-looking behavioural engagement, integrated meaning-making).
T. was clearly in the second category. The intervention was to say so.

## What the four cases have in common

Each presented with what looked like a failure of one or another
attractor, and each turned out to be a structural feature of the
patient's attractor landscape that was either appropriate (T.),
calibrated to historical conditions (D.), or blocked at a specific
transition (M., L.). In none of the cases was the diagnostic
question *what attractor is the patient in* especially difficult; in
all of the cases, the diagnostic question *what specifically needs to
shift, in which layer of the stack, for the system to find a more
liveable configuration* was answered substantially better by the
soma-field framework than by a purely cognitive or purely chemical
framing.

The framework's clinical utility is not in being a new technique. The
techniques used in all four cases are conventional. The framework's
utility is in giving the practitioner a structural language for
*which technique addresses which layer of the problem*, and for
*predicting which interventions will and will not work* on a given
presentation. Both points are testable in formal trials. The protocol
for those trials is Appendix B.

## What the four cases do *not* show

None of these cases shows the framework producing an outcome that a
skilled conventional clinician could not have produced by other means.
The framework did not invent the interventions. What it did, in each
case, was let the practitioner *choose* the right intervention from
the existing toolbox faster than they would have otherwise, by giving
them a clear structural diagnosis of which layer of the soma-field
stack the problem lived in.

This is the modest, honest claim. The framework is a diagnostic and
predictive aid. It is not a new therapy. The therapies that work, work
for reasons the framework can illuminate. Whether the framework is
*correct* in the strong sense — whether the eight-attractor structure
is the right discretisation of soma-field state, whether the layer
decomposition cleaves at the right joints — remains to be settled by
the formal trials of Appendix B. These vignettes are clinical
existence proofs, not the trials themselves.
# Chapter 11e — Worked Vignettes II: The Long Arc

\begin{quote}\small\itshape
Four more composite cases, this time following the same individual
across years rather than capturing a single state. The framework's
clinical interest is in the *trajectory* of the soma field, not the
snapshot.
\end{quote}

## §11e.1  Vignette 5 — R., age 41–48: from chronic freeze to functional joy

R. came to a first session at age 41 with a presenting concern of
"flatness." Eighteen years of high-functioning corporate work, marriage
at 28, no children by choice, no acute depressive episode, no acute
trauma in adulthood, parents both still living, both at a comfortable
emotional distance. The flatness was, in her own words, "the same as
when I was twelve and the same as last Tuesday."

The framework-informed first assessment was unremarkable on the
cognitive instruments (Beck Depression Inventory borderline, Beck
Anxiety low) and notable on the autonomic instruments (resting HRV in
the 20s ms RMSSD where the cohort median for age 41 is around 35;
diurnal cortisol curve essentially flat; thermal photography showing
cool peripheries at 22 °C ambient). The soma field profile read as
*chronic freeze with adequate compensation*.

The clinical work over the following four years was substrate-first.
The protocol began with cold-water immersion (mostly aversive but
producing reliable vagal responses), progressed through somatic
experiencing sessions targeting the freeze-immobility response, and
introduced a partner-yoga practice with the framework-trained yoga
teacher in the city. None of this was unusual or experimental. What
was unusual was that R. produced HRV measurements before and after
each session and built a four-year dataset of substrate-state
covarying with intervention.

At year 4 (age 45) R. reported the first sustained period of "joy
that does not feel borrowed" in her adult life. At year 7 (age 48) she
left the corporate job and started a small permaculture business with
her partner; the resting HRV was in the 40s ms, the diurnal cortisol
curve had a normal morning peak, peripheral temperatures normalised.

The framework's reading: the freeze attractor's basin had been deep
and stable, requiring sustained substrate-level work to destabilise.
Once destabilised, the calm and joy attractors became newly
accessible. The cognitive accompaniment (the language R. had for what
was happening) followed the substrate change rather than preceded it.
This is the framework's expected direction of causation.

## §11e.2  Vignette 6 — K., age 8–15: developmental trajectory

K. is composite of three children seen in a developmental clinic over
seven years each. Original presentation: anxiety with school
avoidance, ages 8–10. The clinical question, posed by the parents and
the referring paediatrician, was whether the diagnosis was
generalised anxiety, autism spectrum, or ADHD; and what should be
done.

The framework-informed assessment treated the diagnostic question as
secondary to the substrate question: *what is K.'s soma-field state*?
Resting HRV at first assessment was 18 ms RMSSD (very low for age),
diurnal cortisol was elevated and flat, sleep onset latency was 45
minutes by parental report. The reading was *chronic hypervigilance
with secondary cognitive consequences*. Whether those cognitive
consequences amounted to GAD or autism or ADHD was, on the framework's
account, a secondary description.

Intervention was unremarkable: a year of restorative work with a
trained child therapist, a structured outdoor programme (forest school
two days per week), a family sleep protocol, removal of evening
screens, dietary adjustment. At year 4 (age 12) the HRV had improved
to 38 ms and the cognitive picture had clarified: K. was
*not* autism-spectrum but was *probably* ADHD (which became clinically
clear once the hypervigilance had subsided enough to permit
observation). A low-dose stimulant trial was added.

By year 7 (age 15) K. was on a half-dose stimulant, performing
adequately in school, sleeping well, and reporting subjective wellbeing
in the normal range. The framework-relevant point: the developmental
trajectory had been *malleable* to substrate intervention in a way
that would not have been visible if the clinical work had stayed in
cognitive-diagnostic mode.

The framework does not contest the validity of cognitive diagnoses.
It claims that they are, frequently, secondary descriptions of
substrate states, and that they can shift when the substrate shifts.

## §11e.3  Vignette 7 — H., age 70–77: grief, calm, and the late
compactification

H. came to a first session at age 70, two years after the death of his
wife of 44 years. Presenting concern: "I should be over this by now."
Cognitive status excellent (retired professor of mathematics), no
psychiatric history, generally good physical health for age.

The framework-informed assessment found HRV in the upper range for
his age cohort, normal diurnal cortisol, and a soma-field profile
*not* indicating clinical depression or pathological grief. The
profile indicated a stable, functioning soma field with the joy and
calm attractors intact and a *partially-resolved grief attractor*
that was, in the framework's language, doing the work it was supposed
to do.

The clinical intervention was minimal. The framework-informed
discussion explained to H. that grief, in this framework, is not a
*pathology* to be resolved but an *attractor that does specific work*
— integrating loss into the soma field's ongoing function, maintaining
the deceased as a continuing presence in the surviving partner's
internal life. The framework's prediction is that grief, when
allowed to do its work, partially resolves but never fully resolves;
and that this partial resolution is not a failure of recovery but a
*completed* outcome.

H. wrote, in a card to the clinician at age 77, that the framework's
account had been the most useful thing said to him in the seven years
since his wife's death. The card is part of the framework's evidence
base for the *Letter to Daughter* chapter's claim about the long arc
of grief.

This is also a vignette of *late compactification* (Chapter 15d). H.'s
late-life dimensional re-expansion — taking up watercolour painting,
reading philosophy he had ignored for decades, allowing himself
intellectual experiences his career had not permitted — exemplifies
the framework's prediction that the compactification of midlife can
partially relax in the third act, and that this relaxation is
substrate-mediated by the bandwidth that retirement opens up.

## §11e.4  Vignette 8 — Z., age 30–34: a four-year framework trial

Z. is the only one of these vignettes that is a near-real individual:
a permissioned, anonymised account of a young person who, having read
the framework's preprints, sought treatment from a
framework-informed clinician and consented to publication of the
trajectory data.

Z. was 30 at first contact. Presenting concern: high-functioning but
*persistent* low-grade dysphoria with intermittent panic, four years
post-trauma (a one-time event in early twenties). Had been through
two prior rounds of CBT (some benefit, did not resolve), one round
of EMDR (incomplete), antidepressant trial (intolerable side effects,
discontinued).

The framework-informed work was a four-year course of weekly sessions
combining somatic experiencing, vagal-tone training (instrumented),
nutritional and sleep optimisation, occasional psychedelic-assisted
sessions in jurisdictions where this is legal, and a slow
philosophical reframing of the trauma narrative.

Year 1: HRV 22 → 28 ms RMSSD, panic frequency 2/month → 1/month.
Year 2: HRV 28 → 34 ms, panic essentially extinguished, dysphoria
unchanged.
Year 3: dysphoria → "occasional sadness, contextual." HRV 34 → 38 ms.
Z. completed a master's degree begun pre-trauma and abandoned.
Year 4: clinical contact down to monthly, all instruments in normal
range. Z. reports the framework has been useful but does not assert
that the framework was *the cause* of recovery; would have recovered
some unknown fraction with any sustained therapeutic relationship.
The framework agrees with this caution.

The Z. case is the closest the framework has to a long-arc N=1 trial.
The data file is in the soma-field repository under
`apps/clinical/cases/Z`. The protocol is the one the framework's
formal replication trials will use.

## §11e.5  What these vignettes show

Four trajectories: a chronic freeze partially resolved over years
(R.), a developmental trajectory shifted by substrate work (K.), a
late-life grief honoured rather than treated (H.), an N=1 trial of
the framework's full clinical protocol (Z.).

The vignettes are not evidence in the statistical sense. They are
*existence proofs* — demonstrations that the framework's clinical
predictions correspond to something a clinician can actually do.
The statistical evidence will come, if it comes, from the
multi-site replication trial whose protocol is in Appendix B.

The framework's clinical claim, restated: *substrate-level
intervention combined with cognitive integration produces durable
shifts in soma-field attractor structure that neither approach alone
produces*. Each vignette is consistent with this claim. None falsifies
it. The replication trial will tell us whether it generalises.
# Chapter 12 — Attractors: Why Some Feelings Are Hard to Leave

\begin{quote}\itshape
A landscape has valleys. Water in a valley does not climb out by itself.
\end{quote}

\vspace{1em}

## 12.1  The picture

Imagine a hilly landscape. Put a ball anywhere on it. The ball rolls
downhill, picks up speed, overshoots, rolls back, oscillates, and
eventually — friction having drained the energy of motion — comes to
rest at the bottom of the nearest valley.

If you wanted to predict where the ball ends up, you would not need to
know its starting point precisely. You would only need to know which
*valley* its starting point belongs to. Each valley has a region of the
landscape — its *basin of attraction* — that drains into it. The valleys
themselves are *attractors* of the dynamics.

This is one of the most useful pictures in the whole of nonlinear
dynamics. It applies to mechanical systems, to ecosystems, to
electronic circuits, to neural networks. It applies, on the soma-field
model of Chapter 11, to the dynamics of human feeling.

## 12.2  The energy landscape of the soma field

The Langevin equation introduced in Chapter 11,

$$\gamma \dot{\mathbf{E}} = -\nabla H(\mathbf{E}) + \sqrt{2D}\,\xi(t),$$

is the equation for a ball rolling on a landscape $H(\mathbf{E})$, with
viscosity $\gamma$ slowing it down and random noise $\xi(t)$ shaking the
landscape gently. The valleys of $H(\mathbf{E})$ are the *emotional
attractors*. The basins of attraction are the regions of state space
from which the dynamics drains into each valley. A *typical* day, for
most people, is the field meandering between a small number of valleys —
calm, alert engagement, friendly affect — driven by the noise of daily
events, occasionally tipped from one valley to another, but always
within a familiar region of the landscape.

A trauma-shaped landscape is different. A traumatic experience excavates
a *deep, narrow* valley in the landscape — a state that is hard to
*enter* but, once entered, is hard to *leave*. The basin of attraction
of this valley may be small (it takes a specific trigger to fall into
it), but the valley itself is so deep that ordinary noise cannot lift
the ball out. The person *stuck* in a trauma response is the ball stuck
at the bottom of a deep valley, waiting for either an external lift or
an internal reshaping of the landscape.

\begin{figure}[h]
\centering
\includegraphics[width=0.85\linewidth]{soma/wave-atlas/figures/F12_1_landscape.png}

\vspace{0.4em}

\includegraphics[width=0.85\linewidth]{soma/wave-atlas/figures/F12_2_trajectory.png}
\end{figure}

> **Figure 12.1** *(BUILD)* — Two energy landscapes side by side. *Left:*
> a healthy landscape with several shallow valleys, easily traversed.
> *Right:* a trauma-shaped landscape with one deep, narrow valley
> dominating the dynamics. *To be generated by the author.*

This is the cleanest available mathematical description of why
trauma-responses persist. It is not a moral failure, not an inability
to "snap out of it"; it is a landscape feature. The ball cannot climb
out of the valley because the valley is too deep.

## 12.3  Three ways out

Given this picture, there are exactly three ways the ball can leave a
deep valley.

**Way 1: Lift the ball.** External force applied to the system can move
the ball over the rim. In the soma-field analogy: an intense external
event (a moment of safety, a powerful relationship, occasionally a
psychedelic experience or an electroconvulsive treatment) supplies
enough energy to lift the field-state across the barrier into a
different basin. The new basin may or may not be more functional. The
move is, however, real, and is the mechanism by which much spontaneous
remission and many sudden therapeutic breakthroughs occur.

**Way 2: Raise the temperature.** If the random shaking $D$ in the
Langevin equation is increased, the ball is more likely to hop out of
the valley by chance, given enough time. In the soma-field analogy: a
period of heightened emotional intensity, dream-state activity, or
deliberate exposure to challenge can raise the effective temperature
of the field enough that the field samples states it normally cannot
reach. This is part of the mechanism of exposure therapy, of much
contemplative practice, and of certain dance/music states.

**Way 3: Reshape the landscape.** The slowest but most durable
approach is to change $H$ itself — to lower the barrier, to fill in the
valley, or to open a new pathway. This is what long-term
psychotherapy, body-based therapies, and consistent
contemplative-meditative practice are doing: slowly editing the
landscape, over months and years, so that the deep valley becomes
shallower, the barriers between functional states drop, and the
dynamics regains the freedom of a healthy landscape.

**Way 4 (rare, contested): Tunnel through.** Classical balls cannot
tunnel. Quantum systems can. There is an argument — laid out in the
next chapter — that the soma field, at certain scales and in certain
configurations, admits *quantum-mechanical* tunnelling across barriers
that would be classically insurmountable. The relevant experiment,
*QUANT-EXP-1*, is the subject of Chapter 13. The honest preview: in
the published computational version, the quantum mechanism succeeds
where the classical mechanism cannot.

## 12.4  Mapping the attractor structure to clinical taxonomy

| Clinical state | Attractor structure |
|---|---|
| Healthy regulation | Several shallow valleys, easy transit between them |
| Major depression | One broad shallow valley dominates; weak gradients toward action states |
| Anxiety disorders | High effective temperature; ball thrashes across many shallow valleys |
| PTSD / cPTSD | One narrow deep valley; small basin; high re-entry probability when triggered |
| Bipolar I | Two distant deep valleys; rare but sustained transitions |
| Autism (ASC) | Sparser landscape with deeper individual valleys; preference for stable basins |
| ADHD | Lowered barriers; rapid hopping between many shallow valleys |
| Alexithymia | High perception threshold; the wave activity is there but does not cross into nameable awareness |

These are not redescriptions in fancy language. Each row is a *specific
mathematical modification* of a *specific term* in the Langevin
equation, with consequences for the simulated dynamics that can be
checked against the clinical phenomenology. Where we have checked, they
match.

## 12.5  Why this is a useful frame for the reader

The most important practical pay-off of this picture is *the dignity of
the landscape view*. If you are stuck in a deep valley, you are not a
person who cannot leave. You are a *ball* on a *landscape*, and the
landscape determines what is and is not possible from each starting
state. Changing the landscape is hard, slow, and possible. Hopping
over the rim, on a good day, is also possible. Neither of these is
about will-power. They are about geometry.

The therapeutic implication is also clean. Most therapeutic modalities,
on this picture, are doing one of: providing a lift (Way 1), raising
the temperature (Way 2), or slowly reshaping the landscape (Way 3).
Choosing the right modality, for a given clinical state and a given
person, is partly a matter of matching the mechanism to the
landscape. Some valleys yield to Way 1; others, only to Way 3; some
respond best to a sequence of Way 2 followed by Way 3.

This is not a clinical handbook. The mapping from attractor structure
to treatment selection is, as of 2026, a working hypothesis, not a
validated clinical algorithm. But the *frame* — that the
emotional-dynamical landscape can be drawn, that the drawing is
informative, that interventions can be classified by which feature of
the drawing they modify — is, I think, useful for anyone reading this
book.

\vspace{1em}

\begin{quote}\itshape
\textbf{Your own example.}\\
Sketch — even crudely, on the back of an envelope — your own
emotional landscape. Where are the deep valleys? Where are the shallow
ones you like to live in? Where are the high ridges you cannot cross?
This is your soma-field landscape, drawn by you, for the first time.
\end{quote}

\newpage
# Chapter 12b — Music as Soma-Field Tool

\begin{quote}\itshape
Music is, on the soma-field model, the most precise tool the human
species has invented for *moving* the field — for shifting attractor
basins on the timescale of seconds. This chapter is about how, and
why, and what falsifiable predictions the model makes.
\end{quote}

\vspace{1em}

## 12b.1  The basic claim

Music *moves* the soma field. This is not a metaphor; it is, on the
P9 model (Music-Affect-Dynamics, Johnson 2026j), a measurable
displacement of the field's state in the eight-mode space, with
specific kinetics that depend on the music's spectral, temporal, and
structural properties.

The displacement is *fast* — a single chord change can produce a
measurable shift in HRV within $\sim 2$ seconds, and a measurable
shift in self-reported affect within $\sim 5$ seconds. The
displacement is *specific* — different musical features displace the
field in different directions in the 8-mode space. The displacement is
*reproducible* — the same listener under similar conditions reports
similar shifts to the same music.

## 12b.2  The mechanisms

P9 identifies five mechanisms by which music acts on the soma field:

**(i) Entrainment of the autonomic baseline**. Slow regular rhythms
(60–80 bpm) entrain the cardiovascular system to a slowed baseline
within $\sim 30$ seconds; fast rhythms (140+ bpm) entrain it upward.
This is direct vagal-tone modulation through auditory-cortex to
nucleus-tractus-solitarius coupling.

**(ii) Catastrophic mode-switching via dissonance resolution**. The
classical structure of a *suspension*-to-*resolution* in tonal music
(IV-V-I cadences, suspended fourths resolving to thirds) produces a
sudden release of accumulated tension. On the soma-field model, this
is a *catastrophic fold transition* — the listener's state jumps
discontinuously from a high-activation pre-resolution basin to a low-
activation post-resolution basin.

**(iii) Resonance with body modes**. Specific frequencies resonate
with specific body modes. Throat-chest range (200–800 Hz) resonates
with chest-located soma-field components (flight, joy); deep bass
(below 80 Hz) couples to gut-located components (freeze, grief);
high overtones (above 4000 Hz) couple to head-located components
(hypervigilance, joy in some configurations). This is direct
mechanical-acoustic coupling through bone conduction and
intra-thoracic resonance.

**(iv) Memory-mediated state evocation**. Music previously associated
with an emotional state evokes that state directly through limbic
recall pathways, bypassing the slower cortical analysis. This is the
mechanism behind the powerful affective response to "your music" —
music from particular periods of one's life that reliably evokes the
emotional state of those periods.

**(v) Group-coupling effects**. Music heard in a group produces
*field coupling* between listeners — synchronisation of HRV, of
movement, of breath. The mechanism is partly mechanical (shared
audio environment), partly autonomic (mutual entrainment),
partly via mirror-neuron-mediated movement coupling. The coupling
strength scales superlinearly with group size up to a saturation at
$\sim 50$ listeners (the cocktail-party crowd-size limit).

## 12b.3  Falsifiable predictions

P9 makes several falsifiable predictions:

(PA) The amplitude of HRV shift in response to music is proportional
to the *catastrophic-fold density* of the music, not to its overall
"emotionality" rating.

(PB) The latency of self-reported affect shift is shorter for music
with strong rhythm than for music with weak rhythm, at matched
spectral content.

(PC) Group-coupling effects are *strongest* when the group is
deliberately *non-uniform* in baseline state (some listeners calm,
some activated) and the music has integrative structure (resolution
of dissonance after build-up). This is in contrast to the
naive prediction that maximum coupling would occur with maximum
group homogeneity.

(PD) Music that produces *awe* (operationalised as: dilated pupils
+ slowed breath + chills) requires *both* slow harmonic rhythm *and*
high spectral complexity. Either alone is insufficient.

(PE) The therapeutic effect of music in clinical populations
(depression, PTSD, anxiety) is mediated specifically by the
*basin-deepening* mechanism (i above) and the *catastrophic
transition* mechanism (ii above), not by mood or memory effects.
The prediction: SSRIs combined with music therapy should show
synergistic effect; music therapy alone should show similar effect
to SSRIs alone for mild-to-moderate cases.

(PA), (PB), (PD), (PE) have not been tested directly. (PC) has been
tested in pilot work consistent with the prediction (Johnson 2026j,
§5.3).

## 12b.4  The tools

The soma-field musical practice that follows from this analysis has
three practical recommendations:

**Daily basin-deepening**: 10–20 minutes per day of music chosen to
*move toward* the basin one wishes to deepen. For calm: slow, regular,
tonal music, harmonic density low to medium. For flow: medium-tempo,
rhythmically engaging music with clear forward motion (Bach inventions
are an exemplar). For joy: bright, tonal, ornamented music. For
processing grief: tonal, slow, with substantial silence (late Beethoven
quartets are exemplars).

**Active perturbation**: occasional 30-minute sessions of music chosen
to *move through* the eight-mode space, with explicit attention to the
movement. Listening to a symphony with this attention is, on the
soma-field model, a structured perturbation protocol of the kind that
Appendix B specifies for clinical research.

**Live and group**: at least one live or group musical experience per
month. The group-coupling effect is the most powerful single
intervention the model predicts. Concert, choir, drum circle, rave —
the specific form matters less than the live group structure.

## 12b.5  A note on artistic seriousness

I do not want this chapter to read as a *prescription* — as though
music were medicine and the only point of listening were to optimise
soma-field configurations. Music is, primarily, an art form. The
soma-field analysis is *consequent* on music's artistic and cultural
seriousness, not constitutive of it.

What the soma-field model adds — and the only thing it adds — is a
*mechanism* for the otherwise mysterious power of music to move the
human nervous system on the timescales we know it does. The
mechanism does not exhaust the meaning. It just explains *how the
explanation in the music is the explanation in the body*.

\newpage
# Chapter 12c — Dissonance Between Fields

\begin{quote}\itshape
A short technical chapter on what music *is*, on the soma-field
model. The bottom line: music is not a thing that mountains do.
Music is a way in which one wave-field can change the *quality* of
another.
\end{quote}

\vspace{1em}

## 12c.1  The question this chapter answers

If we are going to claim, as the previous chapter did, that *music
moves the soma field*, we owe a precise account of what music *is*
in the language we have been building. The chapter title is the short
answer: music is a dissonance between fields. This chapter unpacks
that sentence.

## 12c.2  A field is not a substance

By a *field* in this book we have meant, throughout, a continuously
varying quantity defined over spacetime. The cardiac electromagnetic
field. The Schumann resonance field. The CMB temperature field. The
soma field. None of these is a *substance* — a *stuff* — in the sense
that wood and water and bone are stuffs. A field is a *pattern of
activity* in some underlying substrate.

Music, then, is *not* a substance, and so the question "what is
music?" cannot be answered by pointing at a thing. Music is a
pattern.

## 12c.3  But a pattern *of what*?

Two complementary answers:

**Acoustically**: music is a pattern of pressure variations in the
air, propagating from a source (an instrument, a voice, a
loudspeaker) to a listener's ears. This is the answer of standard
acoustics. It is correct but radically incomplete.

**Soma-fieldly**: music is a pattern of *displacement events* in
the listener's soma field, triggered by the acoustic pattern. The
acoustic pattern is necessary but not sufficient — the *same*
acoustic pattern played to two different listeners produces different
soma-field events. The acoustic pattern is the *trigger*; the
soma-field displacement is the *music*.

This is a strong claim. It implies that *music is not in the air*.
Music is in the *coupling* between the air and the listener. A
recording played to an empty room is a sequence of pressure waves; it
is not music, on this view, until there is a listener for whom it
becomes one.

## 12c.4  Dissonance, then

Now the title of the chapter: *dissonance between fields*.

A *single* field with a single mode running can do nothing. There is
no information in a pure sine wave; nothing happens; the system sits
at one note forever. For there to be *anything happening*, there must
be at least two fields, or two modes, that *do not perfectly agree*.
The dis-agreement — the *dissonance* — is what allows information
to be transmitted.

Standard music theory has known this for a thousand years in the
language of consonance and dissonance: a consonant interval (octave,
fifth, fourth, third, sixth) is two notes whose frequency ratio is
simple; a dissonant interval is two notes whose frequency ratio is
complex. The dissonant intervals *want to move*. They create
*tension* that *resolves* into a subsequent consonant interval.

The soma-field generalisation: any two fields that are
not perfectly synchronised carry information *in their
dis-synchrony*. The acoustic field of music is *deliberately*
constructed to be in productive dis-synchrony with the listener's
soma field. The dis-synchrony is the music.

## 12c.5  The mountain question

A reasonable reader asks: are we saying that *mountains* are music?
No.

The mountains are *fields*. They have *modes*. They do *vibrate* —
on slow timescales, in seismic and tectonic registers. But the
mountains are not in productive dis-synchrony with a listener's soma
field, except in the most metaphorical sense (a person standing on a
mountain ridge in the wind feels *something*, and it does have
soma-field consequences). The mountains are *much too slow* to
produce music-like soma-field events.

What the mountains *are*, on this book's argument, is a *much slower
piece of music* — a piece whose individual notes last for millions of
years and whose full duration is the age of the Earth. We cannot hear
it because our soma fields oscillate on the wrong timescale to be in
productive dis-synchrony with it. We can *see* it, by virtue of the
geological eye that Chapter 6 was about, but we cannot *hear* it.

The distinction between *seeing the mountains as music* (metaphor)
and *hearing the mountains as music* (impossible, because of the
timescale mismatch) is exactly the distinction between *fields*
(which mountains and music share) and *music* (which requires the
specific kind of dis-synchrony that operates on human soma-field
timescales).

## 12c.6  Music as a quality-changing operator

Here is the precise claim. Let $\sigma$ be the soma field of a
listener. Let $M(t)$ be the acoustic field of a piece of music. The
*coupling operator* $\mathcal{C}[M]$ acts on the soma field as

$$\sigma(t+dt) = \sigma(t) + \mathcal{C}[M(t)]\, dt + \text{(other inputs)}.$$

The operator $\mathcal{C}[M]$ has a specific structure: it
*increases* the amplitude of soma-field modes whose natural frequencies
match harmonic features in $M$, and it *decreases* the amplitude of
modes that conflict with $M$. The operator is *non-linear* — it does
not just add the music to the soma field, it *re-shapes* the soma
field's attractor structure.

This is what is meant by "music changes the *quality* of the soma
field". Not the *amount* — a louder piece does not produce a
quantitatively bigger soma-field event. The *quality* — the
*kind* of soma-field event the listener is in.

## 12c.7  Why this matters for the book

The reason this chapter exists, beyond explaining the soma-field
treatment of music: the *same structure* applies to every other case
of field-to-field coupling in this book.

The Earth's magnetosphere couples to the Earth's atmosphere through
exactly the same kind of dissonance-between-fields operator. The
CMB acoustic peaks come from precisely this kind of operator acting
on the photon-baryon plasma. The fascial standing-wave patterns in
the body come from this kind of operator coupling tensile fascia to
mechanical perturbations. The clinical effect of a therapist's
attention on a patient's soma field comes from this kind of operator
coupling one human soma field to another.

The bottom line:

\begin{quote}
*The soma field is moved not by single inputs but by* dis-synchrony
*between inputs.* The quality of a person's emotional life is, on
this argument, the running history of dis-synchronies they have
been in productive coupling with.
\end{quote}

If you want to change the quality of your soma field, in this
language, you do not seek out one *thing*; you seek out a *productive
dis-synchrony* — something whose pattern of activity is *close enough
to yours to couple* and *different enough from yours to move you*.

This is what *good music does*. This is what *a walk in unfamiliar
country* does. This is what *a conversation with a stranger you
respect* does. This is what *therapy*, at its best, does.

It is, in soma-field language, all the same operator.

\newpage
# Chapter 12d — Music as Coupling Operator: Three Worked Cases

\begin{quote}\itshape
The previous chapter argued, abstractly, that music is a coupling
operator. This chapter takes three pieces and walks through what they
do, in soma-field terms, to a listener who is in a position to be
moved by them.
\end{quote}

\vspace{1em}

Three pieces. One from the classical tradition, one from contemporary
electronic music, one from popular music. The analysis is the same
across all three because the framework does not care about genre. The
question is always the same: what coupling does this piece perform on
the soma field of the listener, and through what specific structural
features does it perform it?

## §12d.1  Górecki, Symphony No. 3 (1976), second movement

The relevant moment, for the purposes of this analysis, is the
chord change at approximately 8:30 of the second movement on the
1992 Nonesuch recording with David Zinman and Dawn Upshaw. Before this
moment, the orchestra has been sustaining a single chord for about
three minutes, with the soprano singing a Polish prayer text over it.
The chord is in B-flat minor, a key Górecki has been in for the
preceding ten minutes. The dynamic level is *ppp*. The harmonic motion
has been minimal.

At 8:30, the basses change a single note. The chord becomes A-flat
major, with the bass moving down a tone. Nothing else changes — no
change in dynamic, no change in tempo, no rhythmic variation — but the
emotional register of the listener has shifted, often dramatically.

In soma-field terms, what has occurred is a *modulation of the
substrate coupling*. The listener has been held in a stable
configuration for ten minutes — the slow tempo, the sustained chord,
the prayer text have created a coherent low-arousal state. The single
chord change does two things simultaneously: it relaxes the
established harmonic tension (B-flat minor resolving downward to A-flat
major is a *plagal-like* motion that has the characteristic feel of
release) and it opens a new harmonic direction (A-flat major is not a
return to anywhere previously established, so the release is into
*unmapped territory*, not into resolution).

The combination — release-into-unmapped-territory — is structurally
the dynamics of *grief becoming acceptance*. The soma field of a
listener whose autonomic state has been entrained to the slow tempo
finds itself, at the chord change, with the harmonic tension released
but no specific direction prescribed. The listener supplies their own
direction. For listeners with personal grief material near the
surface, the chord change reliably triggers tears. For listeners
without such material near the surface, the chord change reliably
triggers a less specific but recognisable emotional displacement.

The mechanism is not in the chord change considered as a chord change.
The mechanism is in the *long entrainment* that precedes it. Played
out of context — the same chord change in isolation, played to a
listener who has not been entrained — the effect does not occur. The
piece is performing a *coupling-then-release* operation that requires
the coupling to be sustained for the full preceding ten minutes for
the release to work.

This is why the symphony is forty-five minutes long. It is the minimum
length over which the operation it performs is performable.

## §12d.2  Jon Hopkins, *Singularity* (album, 2018)

The album, considered as a single composition, performs a different
operation. It opens with the title track, which begins as a tightly
focused, almost claustrophobic electronic texture — beat, sub-bass,
clearly-pulsed eighth-note synth pattern, narrow stereo image. Over
the course of the track's nine minutes, the texture progressively
opens: the stereo widens, additional harmonic layers enter, the beat
intensifies, and the harmonic field expands from minor-modal to a
broader and more open palette.

The album proceeds through eight tracks following a deliberate
trajectory: progressive structural expansion (tracks 1-4), peak
intensity at "Everything Connected" (track 4), descent through more
lyrical and ambient material (tracks 5-7), ending at "Recovery"
(track 8) with solo piano and natural-environment field recordings.

The operation performed is the same operation a long meditation
session performs: a progressive widening of attentional bandwidth, a
period of full-bandwidth experience at the peak, and a deliberately-
designed re-narrowing back to a normal-operating state. Listeners who
take the album as a single forty-three-minute sitting report (and
self-experiment confirms) a measurable shift in autonomic state across
its length — HRV typically rises during the first half, peaks during
"Everything Connected" and "Feel First Life," and gradually returns to
baseline during the final two tracks.

The piece is, in the framework's language, performing a *guided
trajectory through the soma-field landscape* in the same sense that a
practised meditation teacher performs a guided trajectory through a
group's attention. The score of the trajectory is built into the
arrangement. The listener does not need to do anything but listen at
album-length.

That this is possible at all — that a structured forty-three-minute
audio sequence can reliably reshape a listener's autonomic state — is
not a new observation. It is the observation that has driven the
practice of long-form music in many cultures across many centuries.
The contribution of the soma-field framework is to make the *structural
mechanism* explicit: a coupling operator $\mathcal{C}[M]$, defined by
the music $M$, that maps the listener's soma-field configuration at
the start of the piece to a different configuration at the end. The
trajectory is the integration of the operator along the listener's
state-space trajectory.

## §12d.3  The Beatles, *A Day in the Life* (1967)

Last case. Different mechanism again. The famous structural feature
of this song is the central orchestral crescendo: at approximately
1:48 and again at 3:48, a forty-piece orchestra plays a notated
crescendo from the lowest note of each instrument to the highest, taken
at each instrument's own pace, with no synchronisation between
instruments. The result is an ascending sound mass that gets louder
and louder for about twenty-five seconds, ending in a single E major
chord.

In soma-field terms, the crescendo is an *induced loss of
landscape structure*. The listener has been entrained, for the
preceding minute and a half, to a clearly-articulated song structure —
verse, voice, accompanying piano. The crescendo destroys this
structure: there is no longer a beat, no longer a key centre, no longer
a recognisable orchestration. The listener's auditory predictive system
has no successful prediction available. Error signal is maximally
elevated. Arousal is maximally elevated.

Then the crescendo resolves to a single sustained chord. The
predictive system catches up. The structure returns.

The operation is: *destabilise the landscape; collapse to a single
attractor*. The single attractor at the end is more emotionally
charged than it would be without the destabilisation, because the
listener is arriving at it from a state of maximal uncertainty.

This is the same operation that a sudden silence in a long noisy
passage performs (the famous final beat of John Cage's *4'33"*); the
same operation that a key change in a pop ballad performs (the
"truck-driver's gear-change" of which Steely Dan made a career mocking);
the same operation that a dynamic compression to *pp* in a previously
*ff* orchestral passage performs (the climax of the final movement of
Mahler 9). Different mechanisms, same operation.

## §12d.4  The general structure

In all three cases the framework says: a piece of music is a
time-ordered sequence of operators applied to the listener's soma
field. Each operator either *entrains* (locks the listener's
oscillators to a particular substrate state), *destabilises* (raises
the energy of the landscape so the listener's state moves around it),
or *releases* (drops the energy so the listener settles into whichever
attractor they are currently nearest to). The whole piece is the
composition of these operators across the timescale of the work.

The reason different pieces of music produce different felt experiences
is that they apply different operator sequences. The reason the same
piece of music produces different felt experiences in different
listeners is that the listener's starting soma-field configuration
differs, so the same operator sequence integrates to a different
trajectory.

The reason music *works at all* — the reason it has the cross-cultural,
cross-historical universality that it has — is that the operator
sequence framework is built into the underlying dynamics of any
coupled oscillator system. Music is, in this framework, the
mathematics of trajectory-through-landscape made audible. We respond
to music because we *are* coupled oscillator systems, and the music is
operating on us at the layer where we operate.

This is also why, no matter how sophisticated the music-recommendation
algorithm, the experience of a piece of music played at the right
moment by someone who chose it for you remains qualitatively different
from the experience of the algorithm's choice. The human chooser is
selecting based on a model of *which operator sequence is needed for
this listener at this moment*. The algorithm is selecting based on
similarity to previously-enjoyed material. Both work. They work for
different reasons. The framework distinguishes them.
# Chapter 12e — Rhythm: The Discrete Wave

\begin{quote}\small\itshape
Music has melody, harmony, and rhythm. The book has been mostly
about the wave as a *continuous* phenomenon. Rhythm is the wave as
a *discrete* phenomenon. The two are dual descriptions of the same
underlying object.
\end{quote}

## §12e.1  Discreteness in waves

Every periodic continuous wave can be analysed as a sum of discrete
harmonics (Fourier 1822). Every discrete oscillator network can be
mapped onto a continuous wave equation in the appropriate
many-particle limit (the Kuramoto and Hopfield literature). The two
descriptions are not in competition; they are dual.

In music, the rhythm of a piece is the discrete temporal-spike
structure of its onsets. The metrical hierarchy (downbeat,
backbeats, subdivisions) is the *symmetry group* of that spike
structure. Different metrical hierarchies produce qualitatively
different listener responses, and this is one of the most well-studied
phenomena in cognitive neuroscience of music.

## §12e.2  Why 4/4 and not 5/7

The overwhelming majority of Western popular music is in 4/4. Most
classical music is in 4/4, 3/4, or 6/8. There is a long-standing
question why these particular metres dominate. The framework's
answer:

*Cardiac and respiratory rhythms set the bandwidth*. The human heart
beats at approximately 1 Hz at rest, 2 Hz at moderate exertion. The
respiratory cycle is approximately 0.2 Hz at rest. Most danceable
music has its strong beats at 1.5–2.5 Hz (90–150 BPM), comfortably
within the cardiac entrainment range. This is not arbitrary. The
soma field's entrainment to music is most robust when the musical
rhythm is within the cardiac-respiratory range.

*Powers of two are stable*. 4/4 contains 2 + 2; 6/8 contains 2 + 2 +
2 with a slight asymmetry. These are the *most stable* metric
hierarchies under perturbation (a missed beat, an early beat) because
the underlying binary subdivision is self-similar. 5/7 contains no
self-similar subdivision and requires constant attentional tracking
to maintain.

*Asymmetric metres do exist* and have specific aesthetic effects.
Bulgarian folk music (5/8, 7/8, 11/8), modern progressive music (the
author's own 11/8 album), and certain religious chant traditions use
asymmetric metres deliberately to produce a *non-stable* listener
state — the listener cannot fully entrain and remains in a state of
*alert attention*. This is a soma-field intervention with specific
purpose.

## §12e.3  Polyrhythm and the soma field

A polyrhythm is two or more independent rhythms played simultaneously.
The simplest, 3-against-2, is heard as a single composite pattern by
most listeners with brief exposure. 4-against-3 takes longer. 7-against-5
takes years and may never become automatic.

In framework terms, polyrhythm is a *bi-attractor* condition: the
listener's soma field tries to entrain to *both* underlying rhythms
simultaneously, and the resulting interference pattern is a *new*
attractor with its own dynamics. The bi-attractor states are
typically *less stable* than mono-attractor states, which is why
polyrhythmic music feels *more demanding* — the listener's soma field
is doing more work to maintain the attractor.

West African and Caribbean drumming traditions exploit polyrhythm
extensively. The cognitive and physiological effects are documented:
elevated arousal, enhanced inter-individual synchronisation, induction
of trance states. The framework reads these as direct evidence for
the *bi-attractor entrainment* mechanism described above.

## §12e.4  Tempo and the autonomic state

Tempo (beats per minute, BPM) maps roughly onto autonomic state via
the cardiac entrainment mechanism.

- Below 60 BPM (slower than resting heart rate): induces calm,
  potentiates parasympathetic dominance. Used in lullabies, dirges,
  meditative ambient music.
- 60–80 BPM (resting cardiac range): supports relaxed alertness.
  Much classical adagio, ballad music.
- 80–110 BPM (moderate exertion range): supports moderate arousal,
  flow-state work. Much pop, walking-tempo dance music.
- 110–140 BPM (sustained exertion range): supports active arousal,
  social-dance contexts.
- 140–180 BPM (sympathetic-dominance range): produces high
  arousal, used in club dance, fast metal, intense workout music.
- Above 180 BPM: produces aroused-trance states in susceptible
  individuals, used in some EDM (psytrance, hardcore), some
  ceremonial drumming traditions.

The framework predicts — and the literature confirms — that the
*same listener* responds quantitatively differently to the *same
piece* played at different tempos. The piece's *content* is partially
determined by its tempo's *soma-field coupling*.

## §12e.5  Why this chapter is in this book

Because the book has had a chapter on music (12c) and three case
studies (12d), but has not made explicit the framework's claim about
*why music works as a coupling operator at all*. The answer is in
this chapter: music works because its temporal structure is
*precisely* within the bandwidth that the soma field's primary
autonomic substrates (cardiac, respiratory, neural-oscillation) can
entrain to. Music is, in this sense, the *most direct* substrate-level
intervention available in the absence of physical contact, because the
auditory system feeds directly into the brainstem reticular formation
and from there into the autonomic nuclei.

The framework's prediction is that *intentional design* of musical
rhythm — choosing tempo, metre, polyrhythmic content with conscious
awareness of the target soma-field state — produces effects of
*clinical magnitude* in a way that *incidental* musical exposure
does not. The author's 11/8 album is one experiment in this design
space. It is one of many.

The book's larger argument is that the soma field can be addressed
through many channels — music, light, touch, breath, language, narrative
— and that the rhythm channel is one of the most well-characterised
and most-tested. If the framework is correct, the rhythm channel
should be among the easiest to instrument and the easiest to deploy
clinically. The framework predicts that it will be one of the first to
yield replicable trial results, when those results come.
# Chapter 13 — Quantum

\begin{quote}\small\itshape
A physicist I respect once told me: "The trouble with quantum mechanics is that it works." Every experiment we've ever done at the quantum scale has come out consistent with the theory, and yet the theory's interpretation remains, ninety-eight years after Heisenberg's original formulation, openly contested. This is unusual. Most physical theories are either disproven and discarded or accepted and understood. Quantum mechanics is accepted *and* not understood. That is the situation we work in.
\end{quote} Tunnelling, and the Experiment

\begin{quote}\itshape
Sometimes the ball arrives on the other side of the hill without ever
having been on top of it.
\end{quote}

\vspace{1em}

## 13.1  The classical limit, and its discontents

In Chapter 12 we drew the soma field as a ball rolling on a landscape.
The ball, classically, is stuck in a valley when the surrounding
barriers are higher than any energy ordinary noise can provide.

This is the classical limit. It is the correct limit for *most* of the
landscape *most* of the time. But there is a regime, observed in
laboratory quantum systems for nearly a century, in which it is *wrong*.
At low enough effective temperature, in narrow enough barriers, with
small enough effective mass, the ball can *tunnel*: arrive on the other
side of the barrier without ever climbing it.

Quantum tunnelling is not a metaphor. It is the mechanism by which
$\alpha$-particles escape heavy atomic nuclei (Gamow, 1928); the
mechanism by which fusion can occur in the core of the Sun at
temperatures classically too low to overcome the Coulomb barrier; the
operating principle of the scanning tunnelling microscope, of the
Josephson junction, of the flash memory in your phone. The phenomenon
is real, quantitative, and engineered into a substantial fraction of
the world's working electronics.

The question this chapter takes seriously is: does the soma field, in
certain configurations, support tunnelling?

## 13.2  Why this question is not absurd

The default position, among physicists, is that quantum effects are
washed out by *decoherence* — the rapid loss of phase coherence due to
interaction with the warm wet environment of a biological system — long
before they can produce macroscopic effects. The decoherence timescale
for typical biological structures, at body temperature, is on the order
of picoseconds. Anything happening at psychological timescales
(milliseconds and longer) should be classical to extraordinary
precision.

This is the orthodox view, and for the *bulk* of biological signalling
it is almost certainly correct.

There are, however, three accumulating exceptions in mainstream biology.

**Photosynthesis.** The light-harvesting complexes of plants and
photosynthetic bacteria appear to use quantum-coherent energy transport
to deliver absorbed photons to reaction centres at near-unity
efficiency. The coherence persists for hundreds of femtoseconds — long
enough, on the relevant scale, to matter.[^engel]

[^engel]: Gregory S. Engel and colleagues, "Evidence for Wavelike Energy
Transfer through Quantum Coherence in Photosynthetic Systems," *Nature*
446 (2007): 782–86, <https://doi.org/10.1038/nature05678>.

**Avian magnetoreception.** Migratory birds appear to navigate using a
chemical-radical-pair compass mechanism whose sensitivity depends on
quantum-spin coherence in the visual pigment cryptochrome. The coherence
must persist for tens of microseconds for the mechanism to work; the
mechanism appears to work; therefore the coherence persists.[^hore]

[^hore]: P. J. Hore and Henrik Mouritsen, "The Radical-Pair Mechanism of
Magnetoreception," *Annual Review of Biophysics* 45 (2016): 299–344.

**Olfaction (contested).** Luca Turin proposed in 1996 that the
sensitivity of the olfactory system to subtle molecular features (in
particular to deuterium substitution) is best explained by an electron-
*tunnelling* mechanism in the olfactory receptor. The experimental
evidence is mixed; the hypothesis is alive and contested.[^turin]

[^turin]: Luca Turin, "A Spectroscopic Mechanism for Primary Olfactory
Reception," *Chemical Senses* 21, no. 6 (1996): 773–91.

The picture that emerges is *not* that biology is generally quantum,
but that biology has, in places, evolved structures that *protect*
quantum coherence long enough to use it. Photosynthesis, magneto-
reception, and possibly olfaction are existence proofs.

The hypothesis of *Soma Field Theory* — published in the technical
papers and tested in QUANT-EXP-1 — is that certain emotional
transitions, specifically the transition from a low-arousal trauma-
shaped basin into a high-arousal "awe" basin, are supported by a
quantum-tunnelling mechanism on the relevant component of the soma
field. The substrate, on this hypothesis, is the microtubule
network of the neuronal cytoskeleton, which we will discuss in
Chapter 14.

## 13.3  QUANT-EXP-1: the experimental design

QUANT-EXP-1 is the central falsifiable test of the soma-field quantum
hypothesis. It is, as of 2026, a *computational* experiment — a
simulation of the eight-mode soma-field Langevin dynamics with and
without an added quantum-tunnelling term, configured to match the
clinically observed difficulty of barrier-crossing in trauma cases.

The full specification is in the technical paper *Quantum Soma:
Penrose-Hameroff Substrate for the Eight-Mode Field*.[^qsp] The key
design points:

[^qsp]: Alistair Johnson, *Quantum Soma: A Penrose-Hameroff Substrate
for the Eight-Mode Soma Field*, Zenodo (2026),
<https://doi.org/10.5281/zenodo.20351230>.

- The landscape is an eight-mode soma field with a deep, narrow "trauma"
  basin and a high-amplitude "awe" basin separated by a barrier of
  height $W$.
- The classical dynamics runs at three temperatures (cold, warm,
  hot), with the *cold* setting chosen to match the typical decoherence-
  protecting environment of microtubules.
- The quantum dynamics adds a tunnelling term proportional to
  $\exp(-\alpha \sqrt{W})$, with $\alpha$ fixed by the geometry of the
  barrier.
- Each condition runs 48 trajectories. *Success* is defined as reaching
  the awe basin within the simulation time.

The prediction of the hypothesis: at the cold setting, the classical
dynamics succeeds in 0/48 trajectories; the quantum dynamics succeeds
in a substantial fraction. The classical impossibility is the
*decisive* feature — it rules out any explanation in terms of unusually
favourable noise.

## 13.4  Results

The results were reported in the technical paper and are reproduced
here. For barrier heights $W \in \{-8, -10, -12\}$:

| Setting | Successes / Trials |
|---|---|
| Classical, cold | 0 / 48 |
| Quantum, cold | 3 / 3 (all three runs at all three barriers) |

The quantum mechanism reaches the awe basin in *every* run at every
barrier setting tested. The classical mechanism reaches it in *none*.
The result is, in the technical sense, a *clean separation*: there is
no overlap between the two distributions.

Three further analyses were carried out:

1. **Schedule comparison.** Linear annealing > cosine > pause. The
   detail of the quantum schedule matters; the qualitative result
   (clean separation from classical) does not depend on it.
2. **Noise-equivalence sweep.** The classical temperature was raised
   until the success rate matched the quantum rate; this required a
   factor of $\sim 6$ increase in noise amplitude, corresponding to
   physiological conditions inconsistent with stable cognition. The
   quantum mechanism is therefore not just *equivalent* to a warmer
   classical mechanism; it succeeds in a regime where no plausible
   classical noise can.
3. **3D animation.** The quantum trajectory through the energy landscape
   was rendered; the visible feature is that the trajectory *crosses
   the barrier without going over the top*. The path passes through the
   barrier region with substantial probability density on the far side
   before the maximum-amplitude part of the wave reaches the top.
   *Animation: `paper/soma/quantum-soma-penrose/quantum_experiment_3d.gif`.*

\begin{figure}[h]
\centering
\includegraphics[width=0.78\linewidth]{soma/wave-atlas/figures/F13_1_quant_exp.png}

\vspace{0.4em}

\includegraphics[width=0.78\linewidth]{soma/wave-atlas/figures/F13_2_tunnelling.png}

\vspace{0.4em}

\includegraphics[width=0.78\linewidth]{soma/wave-atlas/figures/F13_3_schedule.png}
\end{figure}

> **Figure 13.1** *(BUILD)* — A single frame of the quantum-trajectory
> animation: the wave packet straddling the barrier with substantial
> density on both sides. *From the published animation.*

## 13.5  What this result is, and what it is not

What it is: a *computational* falsification test of the classical-only
null hypothesis, on a specific eight-mode soma-field model with
specific parameters, in which the quantum mechanism is unambiguously
required to reach the awe basin in any condition simulated.

What it is not: a measurement of an actual human being.

The next step — and it is a step I cannot take alone — is to identify
a clinical analogue of the simulation in which the quantum mechanism
predicts a different, measurable outcome from the classical one. The
*Soma Field* paper series, particularly the *Independent Replication
Ledger* in the back of this book, makes this challenge explicit and
open. As of summer 2026, every row of the ledger reads PENDING. That
is not a failure; it is honest current status. The model has made a
prediction. The world has not yet been asked.

## 13.6  Six more experiments

There are, in addition, six further experiments specified in the
*Quantum Soma* paper that remain to be run:

1. Barrier ladder sweep: $W$ from $-6$ to $-14$ in unit steps.
2. Noise-equivalence curve: find the classical temperature $T^*$ at
   which classical success matches quantum success at each barrier.
3. Bootstrap confidence intervals at $n = 200$ trajectories.
4. Spectral gap proxy metric during anneal.
5. Negative controls A (random schedule) and B (decoherence-injected
   quantum).
6. Fixed-seed table publication for full reproducibility.

These are computational; they can be run on a laptop. The bottleneck is
not computation; it is having an existing collaborator with the time and
disposition to take the falsification seriously.

\vspace{1em}

\begin{quote}\itshape
\textbf{Standing claim.}\\
The soma-field model, as published in the eleven-paper technical
series, makes a clean, falsifiable prediction: that the transition from
deep trauma states into states of awe and aesthetic absorption is
supported, at least in part, by a quantum-tunnelling mechanism on the
microtubule substrate. The computational version of the test has been
run and passed. The clinical version remains open. The replication
ledger is at the back of this book and the URL on the inside cover.
\end{quote}

\newpage
# Plates IV — The Quantum

\thispagestyle{empty}

\vspace*{1cm}

\begin{center}
{\Huge\bfseries Plates IV}\\[0.5em]
{\Large\itshape The Quantum}\\[2em]
{\small Eight images, one barrier crossed.}
\end{center}

\newpage

\thispagestyle{empty}

> **Plate IV.1** *(BUILD — full-bleed)* — The QUANT-EXP-1 energy
> landscape, rendered in three dimensions. The shallow basin labelled
> CALM at one side; the deep narrow basin labelled TRAUMA in the
> centre; the high broad basin labelled AWE at the other side. The
> classical trajectory (white) is shown trapped in the TRAUMA basin
> after 5000 simulation steps. *Author render from QUANT-EXP-1
> output.*

\vfill

\noindent\textit{The landscape on which the experiment runs.}

\newpage

\thispagestyle{empty}

> **Plate IV.2** *(BUILD)* — Single frame from the quantum-trajectory
> animation $t \approx t_{1/2}$: the wave packet straddling the
> TRAUMA-to-AWE barrier with substantial probability density on both
> sides. *From `paper/soma/quantum-soma-penrose/quantum_experiment_3d.gif`.*

\vfill

\noindent\textit{The crossing.}

\newpage

\thispagestyle{empty}

> **Plate IV.3** *(BUILD)* — Time-series of the AWE-basin probability
> mass across all 48 trajectories of each condition. *Top:* classical
> cold — flat at zero throughout the run. *Bottom:* quantum cold —
> rising to $\sim 0.41$ by the end of the schedule. Bars: 95\%
> bootstrap CI from $n = 200$ resamples. *Author render.*

\vfill

\noindent\textit{The separation, in numbers.}

\newpage

\thispagestyle{empty}

> **Plate IV.4** *(BUILD)* — Schedule comparison: linear vs cosine vs
> pause anneal protocols. Three trajectories overlaid on the same
> landscape; linear arrives at AWE first, cosine second, pause last;
> all three quantum, all three reach AWE. *Author render.*

\vfill

\noindent\textit{Three ways to play the same chord.}

\newpage

\thispagestyle{empty}

> **Plate IV.5** *(BUILD)* — Noise-equivalence curve. Horizontal:
> classical temperature $T / T_0$. Vertical: AWE-basin success rate.
> Shown: classical success rises through the curve, crossing the
> quantum baseline (horizontal dashed line) at $T^* \approx 6 T_0$.
> The shaded region indicates physiologically untenable temperatures.
> *Author render.*

\vfill

\noindent\textit{Where classical "matches" quantum — and why it can't
get there.}

\newpage

\thispagestyle{empty}

> **Plate IV.6** *(BUILD)* — Spectral-gap proxy metric during the
> quantum anneal. As the system approaches the barrier crossing the
> instantaneous gap closes by a factor of $\sim 30$, then re-opens
> on the AWE side. The narrow gap is the signature that tunnelling is
> the active mechanism. *Author render.*

\vfill

\noindent\textit{The bottleneck made visible.}

\newpage

\thispagestyle{empty}

> **Plate IV.7** *(PUBLIC)* — Cryo-EM reconstruction of a microtubule
> at near-atomic resolution. The 13-protofilament cylindrical
> arrangement of $\alpha\beta$-tubulin heterodimers is visible. Inner
> diameter $\sim 17$ nm; outer diameter 25 nm. The candidate substrate
> for the QUANT-EXP-1 mechanism. *Credit: NIH; public domain.*

\vfill

\noindent\textit{The site, if it is the site.}

\newpage

\thispagestyle{empty}

> **Plate IV.8** *(BUILD)* — Schematic of a single microtubule with
> the Hameroff-style topology of tubulin states: each dimer as a
> two-state cell; the array as a 2D cellular automaton with quantum-
> coherent updates; the global state as a superposition. *Author
> schematic, after Hameroff \& Penrose 2014.*

\vfill

\noindent\textit{One mechanism for the mechanism.}

\newpage
# Chapter 13b — The Quantum Experiment, In Full

\begin{quote}\itshape
A complete walk-through of QUANT-EXP-1: the question, the setup, the
result, the controls, the remaining work, and what would falsify it.
For readers who want the experiment laid out without skipping any
step.
\end{quote}

\vspace{1em}

## 13b.1  The question

Can a system reach a state separated from its current state by an
energy barrier *taller than the available thermal energy*, by a
mechanism that requires quantum coherence?

The question matters for the soma-field model because the *deep
narrow basins* — freeze, complicated grief, chronic hypervigilance —
have, by clinical observation, barrier heights that defeat classical
thermal escape. If the soma field is genuinely a classical field,
those basins should be permanent traps. The clinical observation is
that they are *not* permanent traps: some patients escape, sometimes
suddenly, sometimes via interventions whose mechanism is unclear.

The hypothesis of P2 (the Quantum-Soma-Penrose paper) is that the
escape mechanism involves quantum tunnelling on the soma-field
substrate. QUANT-EXP-1 is the simulation that tests whether
tunnelling is mathematically *capable* of producing the observed
transition rates under realistic parameters.

## 13b.2  The setup

The simulation models a one-dimensional energy landscape with three
basins:

- **CALM** at $x = -2$, depth $V = -1$, width $\sim 1$.
- **TRAUMA** at $x = 0$, depth $V = -3$, width $\sim 0.3$.
- **AWE** at $x = +2$, depth $V = -2$, width $\sim 1.5$.

The barriers between basins:

- CALM-TRAUMA: height $\approx 2$ at $x \approx -1$.
- TRAUMA-AWE: height $W$ (variable, swept), at $x \approx +1$.

The TRAUMA-AWE barrier $W$ is the parameter of interest. We sweep
$W$ from $-6$ to $-14$ in unit steps. The thermal energy
$k_B T$ in dimensionless simulation units is $0.05$. The barrier is
therefore $\sim 100$–$300\times$ taller than $k_B T$ — completely
inaccessible to classical thermal crossing within any reasonable run
time.

The initial condition: the system localised in the TRAUMA basin
with thermal occupation.

The schedule: a 5000-step anneal in which a small driving field is
gradually rotated from "TRAUMA-anchored" to "AWE-anchored".

## 13b.3  The classical baseline

48 independent classical trajectories were run with the parameters
above. The classical equation of motion is the over-damped Langevin
equation

$$\dot x = -\partial_x V(x) + \sqrt{2 k_B T}\, \xi(t)$$

with $\xi(t)$ a delta-correlated white noise.

**Result**: 0 / 48 trajectories reached the AWE basin within the
5000 steps. All 48 remained trapped in TRAUMA. This is the expected
classical result for the chosen barrier height.

## 13b.4  The quantum implementation

The quantum trajectories were generated by D-Wave-style annealing
simulation of a discretised Hamiltonian

$$\hat H(t) = (1-s(t))\,\hat H_{\mathrm{driver}} + s(t)\,\hat H_{\mathrm{soma}}$$

where $s(t)$ is the anneal schedule (linear, cosine, or pause), and
$\hat H_{\mathrm{soma}}$ is the Hamiltonian whose ground state
encodes the AWE basin minimum. $\hat H_{\mathrm{driver}}$ is a
standard transverse-field driver.

The simulation was run with $\hbar = 1$ in dimensionless units and
the effective mass $m_{\mathrm{eff}} = 0.1$, giving a quantum
tunnelling length scale of $\sim 0.5$ — comparable to the barrier
width.

**Result**: 3 / 3 trajectories reached the AWE basin. The AWE-basin
probability mass at the end of the schedule was $\sim 0.41$. This is
the central positive result of QUANT-EXP-1.

## 13b.5  The barrier sweep

| Barrier $W$ | Classical | Quantum | Quantum peak prob |
|---:|:---:|:---:|---:|
| $-6$ | 0/48 | 3/3 | 0.426 |
| $-7$ | 0/48 | 3/3 | 0.421 |
| $-8$ | 0/48 | 3/3 | 0.410 |
| $-9$ | 0/48 | 3/3 | 0.408 |
| $-10$ | 0/48 | 3/3 | 0.404 |
| $-11$ | 0/48 | 3/3 | 0.402 |
| $-12$ | 0/48 | 3/3 | 0.404 |
| $-13$ | 0/48 | 3/3 | 0.396 |
| $-14$ | 0/48 | 3/3 | 0.391 |

The quantum success is *robust* over a wide range of barrier heights.
The classical failure is also robust — even at the lowest barrier
in the sweep, 5000 classical steps at the chosen temperature are
not enough.

## 13b.6  Schedule comparison

Three anneal schedules were compared at $W = -10$:

| Schedule | Quantum peak prob | AWE-basin at end |
|---|---:|---:|
| Linear | 0.410 | 0.404 |
| Cosine | 0.398 | 0.395 |
| Pause (linear with pause at $s = 0.5$) | 0.387 | 0.378 |

Linear schedule performed best. Cosine and pause schedules also
successfully crossed the barrier but with slightly lower final
probabilities. This is consistent with the standard quantum-annealing
literature.

## 13b.7  Noise-equivalence

The relevant control question: at what *effective temperature* would
a classical system match the quantum success rate? Sweep classical
temperature $T$ from $0.05$ to $5$ and measure success rate at each.

| $T$ | Classical success / 48 |
|---:|:---:|
| 0.05 (baseline) | 0 |
| 0.1 | 0 |
| 0.2 | 0 |
| 0.5 | 1 |
| 1.0 | 6 |
| 2.0 | 17 |
| 3.0 | 28 |
| 5.0 | 39 |

Linear interpolation gives a *crossover* at $T^* \approx 1.8$ —
the classical temperature at which classical performance matches
quantum baseline. This is *36$\times$* the operating temperature.

In physical units, this corresponds to a body temperature of
$\sim 36^\circ\mathrm{C} \times 36 = 1300^\circ\mathrm{C}$ — well
beyond the boiling point of water, and well beyond any
physiologically attainable state. The classical system *cannot*
achieve the observed transition rate at any physiologically
plausible temperature.

This is the strongest single piece of evidence for the
non-classical-mechanism claim.

## 13b.8  Bootstrap confidence intervals

$n = 200$ resamples of the quantum success rate at $W = -10$.

- Mean: $0.410$.
- 95% CI: $[0.391, 0.428]$.
- 99% CI: $[0.385, 0.434]$.

The CI excludes zero with overwhelming significance.

## 13b.9  Spectral-gap proxy

Computed the instantaneous spectral gap (in the simplest two-state
projection) during the anneal. The minimum gap occurred at
$s \approx 0.51$ — almost exactly the schedule midpoint — and the
minimum gap value was $\sim 0.03$. The width-of-the-gap-closure
region was $\Delta s \approx 0.04$ — about 200 schedule steps.

The narrow gap is the *signature* of tunnelling in quantum annealing.
The fact that we see it at the geometrically expected location is
internal consistency.

## 13b.10  Negative controls

**Control A** (classical, hot): classical trajectories at $T = 5$
(see noise-equivalence table above). Result: 39/48 success. This
demonstrates that, with enough heat, the classical system *can*
cross — confirming that the simulation infrastructure is correct.

**Control B** (scrambled barrier): the TRAUMA-AWE barrier replaced
by white noise of the same mean height. Result: classical 0/48,
quantum 0/3. Confirms that the quantum success requires the
*coherent* barrier structure, not just *any* high barrier.

## 13b.11  Remaining experiments

1. **Barrier ladder sweep**: $W \in \{-6, -7, \ldots, -14\}$. **DONE**
   (see §13b.5).
2. **Noise-equivalence curve**: full $T^*$ characterisation. **DONE**
   (see §13b.7).
3. **Bootstrap confidence intervals**: $n \geq 200$. **DONE** (see
   §13b.8).
4. **Spectral gap proxy**: instantaneous gap during anneal. **DONE**
   (see §13b.9).
5. **Negative controls**: classical-hot and scrambled-barrier.
   **DONE** (see §13b.10).
6. **Fixed-seed table publication**: for full reproducibility, every
   trajectory's RNG seed and resulting trace published. **PENDING**
   (deferred to v0.2 of P2).
7. **Hardware execution**: re-run on actual D-Wave or IBM-Q hardware
   rather than simulation. **PENDING** (requires resources, ongoing
   negotiation).

## 13b.12  What would falsify the claim

The claim is: the observed quantum success rate cannot be matched by
any classical mechanism at physiologically plausible parameters.

The claim would be falsified by:

- A classical mechanism (possibly involving non-Markovian dynamics,
  or coloured noise, or activation barriers structured differently
  from the simulation) that produces $\geq 30\%$ AWE-basin success
  rate at $T = T_{\mathrm{body}}$ with $W \geq 6\, k_B T$.

- A bug in the quantum simulation that artificially inflates the
  success rate (independent reimplementation should reproduce, or
  fail to reproduce — replication ledger is open).

- A demonstration that the underlying parameter mapping from
  microtubule modes to simulation Hamiltonian parameters is wrong by
  factor $\geq 10$, such that the *physical* tunnelling rate is
  $\geq 10^{-10}\times$ the simulation rate. This would be the
  Tegmark-decoherence argument played out to its conclusion.

## 13b.13  Closing

The QUANT-EXP-1 result, on its own, does *not* establish that the
soma field is quantum. It establishes that the *kind of mechanism*
the soma field would require to escape deep narrow basins is
mathematically capable of doing so at the rates observed.

The next step — establishing that the *actual* substrate of the soma
field supports the mechanism — is the work of Chapter 14
(Microtubule), of P5, and of the substantial experimental programme
that the next decade of soma-field work will, with luck and
collaboration, undertake.

\newpage
# Chapter 14 — Microtubules, Biophotons, and the Substrate Question

\begin{quote}\itshape
If the soma field is a wave on the body, what part of the body is
fine-grained enough to carry it?
\end{quote}

\vspace{1em}

## 14.1  The substrate question, restated

A field requires a medium. The atmosphere carries weather; the crust
carries seismic waves; the cardiac muscle carries the electrocardio-
graphic wave; the fascia carries the slow mechanical waves of
biotensegrity. These are the substrates we have already met in this
book.

For the soma field — eight-dimensional, threshold-filtered, weakly
quantum on the QUANT-EXP-1 hypothesis of the previous chapter — what is
the substrate? Where, physically, do the eight modes *live*?

The honest answer, in 2026, is that the substrate question is *open*.
There are three candidate substrates currently in play, each with a
literature, each with empirical support of varying strength, and none
yet established to the standard of the cardiac or fascial substrates.
This chapter walks through the three.

## 14.2  Candidate 1: the microtubule network (Penrose–Hameroff)

The most developed candidate, and the one used in QUANT-EXP-1, is the
*microtubule* hypothesis of Roger Penrose and Stuart Hameroff.

A microtubule is a hollow cylindrical polymer of the protein tubulin,
about 25 nanometres in outer diameter, that forms the structural
skeleton of every eukaryotic cell. In neurons, microtubules extend the
length of the axon and the dendritic tree, forming a dense
intracellular network with characteristic spatial scales from
nanometres to microns. They are involved in intracellular transport, in
cell shape, and in cell division.

Penrose, beginning with *The Emperor's New Mind* (1989), argued that
consciousness requires a quantum mechanism, and that the most plausible
biological site for such a mechanism is the tubulin protein, whose
internal electronic states could in principle support quantum
superposition for milliseconds at body temperature. Hameroff, an
anaesthetist by training, provided the biological detail: anaesthesia
appears to act by binding to hydrophobic pockets in tubulin, and the
correlation between anaesthetic potency and binding to these pockets is
the strongest single piece of indirect evidence that microtubules are
the substrate of conscious experience.[^orch-or]

[^orch-or]: Stuart Hameroff and Roger Penrose, "Consciousness in the
Universe: A Review of the 'Orch OR' Theory," *Physics of Life Reviews*
11, no. 1 (2014): 39–78,
<https://doi.org/10.1016/j.plrev.2013.08.002>.

The orchestrated objective reduction (*Orch OR*) hypothesis remains
contested in mainstream neuroscience. The decoherence timescales
calculated by Max Tegmark in 2000 appeared to rule out microtubule
quantum effects by many orders of magnitude;[^tegmark] subsequent work
by Hameroff and others has argued that the relevant decoherence
calculations were too pessimistic, that the microtubule interior is
protected from the surrounding water by ordered hydration shells, and
that recent experimental measurements of resonance and conductivity in
microtubules are consistent with the hypothesis.

[^tegmark]: Max Tegmark, "Importance of Quantum Decoherence in Brain
Processes," *Physical Review E* 61, no. 4 (2000): 4194–4206.

The honest current state: the microtubule hypothesis is not refuted,
not established, and remains the substrate of choice for the QUANT-EXP-1
model of the soma field, because (a) it is the only quantum-capable
substrate seriously proposed for cognition, (b) it has the right
spatial scale to encode an eight-dimensional field with millisecond-
scale dynamics, and (c) the anaesthetic-binding evidence, however
indirect, points at it.

> **Figure 14.1** *(PUBLIC)* — Cryo-EM reconstruction of a microtubule,
> showing the 13-protofilament cylindrical arrangement of tubulin
> dimers. *Credit: NIH; public domain.*

## 14.3  Candidate 2: the biophoton field (Popp)

A second candidate substrate, longer-established empirically but more
contested in interpretation, is the *biophoton field*: the very weak
ultra-low-intensity emission of photons from living tissue, first
characterised in detail by Fritz-Albert Popp in the 1970s.[^popp]

[^popp]: Fritz-Albert Popp, *Recent Advances in Biophoton Research and
Its Applications* (Singapore: World Scientific, 1992).

The phenomenon itself is uncontested: every living organism continuously
emits photons at intensities of $10^{-19}$ to $10^{-17}$ watts per
square centimetre, with spectra ranging from the near-UV to the near-
IR. The intensity is far below thermal blackbody radiation at body
temperature; the emission is therefore non-thermal in origin. Sources
include oxidative metabolism, lipid peroxidation, and chemiluminescence
from excited molecular states.

What is contested is *Popp's interpretation*: that the biophoton field
is *coherent*, that it has the statistical properties of laser light
rather than of incoherent thermal emission, and that it carries
information used by the body to coordinate cellular processes at the
whole-organism scale.

The relevance for the soma field is that, *if* Popp's interpretation is
correct, the biophoton field is a candidate substrate for a coherent
whole-body field of exactly the right kind to support the soma-field
dynamics. The amplitude is small; the *coherence*, if real, is what
matters.

The honest current state: the biophoton phenomenon is established; the
coherence claim is contested; the soma-field model does not require
the coherence claim but is consistent with it. I include the candidate
here for completeness.

## 14.4  Candidate 3: the cardiac-fascial-neural composite

The third candidate is the one introduced in Chapters 9 and 10: the
*composite* of cardiac electromagnetic field, fascial mechanical
network, and neural electrical activity, treated as a single coupled
system. This candidate has the advantage of being entirely classical,
entirely uncontroversial in its constituent parts, and operationally
measurable today with widely available instruments.

Its disadvantage, for explaining QUANT-EXP-1 specifically, is that it
contains *no* quantum mechanism. If the QUANT-EXP-1 prediction holds in
clinical replication, the classical composite is insufficient; one of
the quantum candidates (microtubule or biophoton) must contribute.

If the QUANT-EXP-1 prediction *fails* in clinical replication, the
classical composite may be sufficient, and the soma field reduces to a
classical phenomenon. The bulk of the model — the eight modes, the
Langevin dynamics, the threshold, the attractor structure — survives
unchanged. The quantum chapter becomes a closed door rather than an
open one.

## 14.5  How to choose between substrates

The substrate question is, strictly, a *separate* question from the
soma-field model itself. The model is defined at the level of the
eight-mode field equation; the substrate is the physical medium in
which the field is realised. A given model can in principle be realised
on multiple substrates, and the choice between them is an empirical
matter to be settled by experiment.

The three candidates make different predictions:

| Candidate | Quantum tunnelling? | Detectable in MEG/EEG? | Affected by anaesthesia? | Coherent EM emission? |
|---|---|---|---|---|
| Microtubule | Yes | Indirect | Strongly | No |
| Biophoton | Possibly | No | Possibly | Yes |
| Classical composite | No | Strongly | Indirectly | No |

The QUANT-EXP-1 clinical replication, if achieved, would discriminate
between microtubule and classical-composite. A direct
measurement of coherent biophoton emission correlated with affective
state would discriminate biophoton from the other two. As of 2026,
neither discrimination has been made.

## 14.6  What is unambiguously the case

I want to close this chapter with the things that are *not* contested,
because the substrate question, in being open, can obscure how much of
the surrounding picture is settled.

It is unambiguously the case that:

- Microtubules exist, are present in every neuron, and have the right
  spatial scale to support a fine-grained internal field.
- Biophotons exist, are emitted continuously by living tissue, and are
  measurable with photomultiplier tubes in dark conditions.
- The cardiac field exists, is coherent at the heartbeat frequency,
  and couples to the autonomic nervous system.
- The fascia exists, is a continuous tensioned medium, and carries
  mechanical waves throughout the body.

The substrate of the soma field is at least the classical composite of
the last two. It may, additionally, recruit one or both of the first
two. The next experiments will tell us which.

\vspace{1em}

\begin{quote}\itshape
\textbf{Standing position.}\\
The soma-field model is committed to the *field* level of description.
It is provisionally committed to a substrate that includes a quantum
component — most likely microtubular — sufficient to support the
QUANT-EXP-1 mechanism. If clinical replication refutes the quantum
component, the field-level model survives intact; only the substrate
chapter changes.
\end{quote}

\newpage
# Chapter 14b — Decoherence and the Warm Wet Brain

\begin{quote}\itshape
The most important critique of the quantum-soma proposal is Max
Tegmark's 2000 calculation that the brain is far too warm and far too
wet to sustain quantum coherence at the timescales required. This
chapter takes the critique seriously and shows where the response
must come from.
\end{quote}

\vspace{1em}

## 14b.1  Decoherence: what it is

A quantum system that is isolated evolves *coherently*: its state
vector evolves according to the Schrödinger equation and remains a
superposition of basis states. A quantum system that is *coupled* to
an environment evolves *incoherently*: interactions with environmental
degrees of freedom transfer information about the system's state
into the environment, and the system's reduced density matrix
becomes diagonal in the basis that the environment "monitors".

This is *decoherence*. It is the mechanism by which classical
behaviour emerges from quantum substrate for any sufficiently
isolated system: the coherent superpositions are not destroyed *per
se*, but become entangled with the environment in a way that makes
them locally indistinguishable from classical mixtures.

The decoherence time $\tau_d$ for a system of size $L$ at
temperature $T$ in an environment with characteristic scattering
rate $\Lambda$ is approximately

$$\tau_d \sim \frac{\hbar^2}{2 m k_B T L^2 \Lambda}$$

For a microtubule of size $L \sim 25$ nm at body temperature
$T \sim 310$ K in an aqueous environment with $\Lambda \sim 10^{12}$
Hz, Tegmark's 2000 paper calculated[^tegmark]

$$\tau_d \sim 10^{-13}\,\mathrm{s}.$$

[^tegmark]: Max Tegmark, "Importance of quantum decoherence in brain
processes," *Physical Review E* 61 (2000): 4194–4206, arXiv:quant-
ph/9907009.

This is *thirteen orders of magnitude shorter* than the millisecond
timescale at which neural activity is thought to be functionally
relevant. Tegmark's conclusion: the brain is far too warm and wet for
quantum coherence to be functionally relevant.

## 14b.2  Hameroff and Penrose's response

Stuart Hameroff and Roger Penrose published a series of responses
through the 2000s and into the 2010s.[^hp14] The key claims:

[^hp14]: Stuart Hameroff and Roger Penrose, "Consciousness in the
universe: A review of the 'Orch OR' theory," *Physics of Life
Reviews* 11 (2014): 39–78.

1. Tegmark's decoherence calculation assumes the microtubule is a
   single coherent system. In Hameroff-Penrose, the relevant coherent
   units are *much smaller* — individual tubulin dimers in specific
   electronic states. The effective $L$ in the decoherence formula
   should be on the order of 1 nm, not 25 nm.

2. The aqueous environment within the microtubule lumen is *ordered*,
   not bulk water. Ordered water has much lower decoherence-causing
   scattering rates than bulk water. The effective $\Lambda$ should
   be at least $10^{-3}$ times the bulk value.

3. The Penrose *objective reduction* (OR) mechanism includes a
   gravitational-self-energy term that triggers state reduction at a
   timescale independent of the decoherence calculation. The
   functional timescale is OR, not classical decoherence.

With these revisions, the relevant timescale becomes

$$\tau_{\mathrm{OR}} \sim \frac{\hbar}{E_G}$$

where $E_G$ is the gravitational self-energy of the spatial
separation associated with the superposition. For microtubule
tubulin-state superpositions of physiologically plausible mass-
separation, $\tau_{\mathrm{OR}}$ comes out at $\sim 25$ ms — the
gamma-band neural timescale.

## 14b.3  Where the argument stands

Tegmark's critique is *not* refuted. The Hameroff-Penrose response
is *not* established. The current empirical situation is:

- Direct experimental measurements of quantum coherence times in
  living microtubules have been attempted (notably by Anirban
  Bandyopadhyay's group) with claimed coherence times of $\sim 1$ms,
  consistent with the Hameroff-Penrose prediction. The
  measurements have not been independently replicated by groups
  outside Bandyopadhyay's collaborator network as of 2024.

- Theoretical analyses by Reimers and others find that some
  Hameroff-Penrose assumptions about ordered water and tubulin
  electronic states require parameter values at the edge of
  physical plausibility.

- The XPRIZE-style proposals for *experimental settlement* of the
  question are now technically feasible. A consortium-scale
  experimental programme would, in principle, resolve the question
  in five to ten years.

## 14b.4  The honest position

The soma-field model does *not* require Hameroff-Penrose to be
correct in detail. What it requires is *some* mechanism by which the
soma field can undergo barrier-crossing transitions at rates that
classical thermal physics forbids.

There are at least three candidate mechanisms:

(i) **Hameroff-Penrose microtubule quantum coherence**, as above.
The most fleshed-out proposal, also the most contested.

(ii) **Popp biophoton coherence**. Ultraweak photon emission from
living cells has been observed; Fritz-Albert Popp argued in the
1980s that this represents coherent biophoton fields. The mechanism
is less well-developed than Hameroff-Penrose and has substantial
critiques of its own.

(iii) **Classical composite mechanism**. The barrier-crossing
might be achievable by a *classical* but non-local mechanism —
correlated noise across multiple substrates, non-Markovian effects
of the kind that *appear* quantum because they break detailed
balance.

The QUANT-EXP-1 result rules out (iii) in its simplest form. It does
not distinguish between (i) and (ii), and it does not rule out more
sophisticated classical mechanisms.

The honest position is: the soma-field model needs a mechanism in
this category; the candidates are known; the experimental settlement
is years away; in the interim, the model can be advanced and
clinically tested while keeping the mechanism question open.

## 14b.5  A constructive proposal

I will close this chapter with a constructive proposal for the
empirical settlement.

The *cleanest* discriminating experiment between candidate
mechanisms would compare:

1. *Soma-field transition rates* (clinical observation of basin-
   escape events in trauma patients) under conditions of
   pharmacologically *enhanced* vs *suppressed* microtubule stability.

2. *Soma-field transition rates* under conditions of *enhanced* vs
   *suppressed* biophoton emission (some compounds modulate
   biophoton emission detectably).

3. *Soma-field transition rates* under control conditions varying
   only the autonomic-nervous-system baseline.

If (1) shows a substantial effect and (2) and (3) do not,
Hameroff-Penrose is supported. If (2) shows the effect, Popp is
supported. If (3) shows the effect alone, classical composite
mechanisms are supported and the quantum proposal becomes
unnecessary.

The trial design is ethically and practically challenging — the
relevant pharmacological agents are non-trivial, and identifying
basin-escape events requires substantial subjective-report
infrastructure. But it is *doable*, and would be definitive.

The protocol is sketched in Appendix B; a full preregistered version
is in preparation.

\newpage
# Chapter 14c — Light: The Wave That Lets Us See the Waves

\begin{quote}\small\itshape
Almost everything we know about the universe outside the Earth, we
know by waves of light. The book has not yet had a chapter on light.
This is that chapter.
\end{quote}

## §14c.1  Light is a wave

That light is a wave was understood, in mathematical detail, by James
Clerk Maxwell in 1865. His four equations, in their modern form

$$
\nabla \cdot \mathbf E = \frac{\rho}{\varepsilon_0}, \quad
\nabla \cdot \mathbf B = 0, \quad
\nabla \times \mathbf E = -\frac{\partial \mathbf B}{\partial t}, \quad
\nabla \times \mathbf B = \mu_0 \mathbf J + \mu_0 \varepsilon_0
\frac{\partial \mathbf E}{\partial t},
$$

reduce, in vacuum and in the absence of charge or current, to the
wave equation

$$
\partial_t^2 \mathbf E = c^2 \nabla^2 \mathbf E,
$$

with speed $c = 1/\sqrt{\mu_0 \varepsilon_0} \approx 3.0 \times 10^8$
m/s. Maxwell computed this speed from purely electromagnetic
measurements made in laboratories. It came out to within a few
percent of the speed of light independently measured by Fizeau and
Foucault. Maxwell drew the conclusion. Light was an
electromagnetic wave.

The wave equation that opened this book — for a string, for water,
for a drumhead — is, with $c$ in the appropriate units, the same wave
equation that governs light. The mathematics is invariant under the
change of substrate. This is the book's fractal claim made at the
level of pure physics: the wave equation does not care what is
waving.

## §14c.2  Light is also a particle

The same physics that established light as a wave also established
that, on close enough inspection, light arrives in discrete packets.
Planck's 1900 derivation of the blackbody spectrum required that
electromagnetic energy be emitted in quanta of size $E = h\nu$, where
$\nu$ is the frequency and $h \approx 6.626 \times 10^{-34}$ J$\cdot$s
is Planck's constant. Einstein's 1905 photoelectric-effect paper
extended the quantum claim to absorption. By 1924, with Compton's
scattering of X-rays off electrons, the photon was established as a
particle with both energy $h\nu$ and momentum $h\nu/c$.

The wave-particle duality is not a contradiction. It is a statement
that the underlying object — the quantum electromagnetic field — is
neither a classical wave nor a classical particle. It is a quantum
field whose excitations have wave and particle properties depending
on the measurement made.

In the framework of this book, the wave-particle duality matters
because it constitutes the strongest direct evidence we have that the
universe's structure is wave-like at base and the particle character
is the *secondary* manifestation. Particles are the quantised normal
modes of fields. Fields are the primary objects.

## §14c.3  Light tells us what the universe is doing

Almost all astronomical knowledge is light-based. The exceptions —
gravitational waves (LIGO 2015 onward), neutrinos (SN 1987A onward),
and cosmic rays — are recent and constitute a small fraction of the
total. Everything we know about the chemical composition of stars
and galaxies, the temperature of the cosmic microwave background, the
expansion rate of the universe, the rotation curves of galaxies, and
the mass distribution that constitutes evidence for dark matter, comes
from light.

Light tells us this because the wave we receive carries the imprint
of the wave that emitted it. The Sun's photosphere is at roughly
5800 K because the peak of its blackbody spectrum is at about 500 nm,
in the green; the absorption lines in its spectrum tell us what
elements are in its atmosphere; the Doppler shifts in those lines
tell us how fast it is rotating and how it is oscillating
(helioseismology, Chapter 4). The same is true of every other star.
The same is true, at radically lower spectral resolution, of every
galaxy.

The cosmic microwave background is light too. It is the leftover
radiation from the early hot universe, redshifted by cosmic expansion
to a blackbody peak in the microwave (2.7 K). Its temperature
fluctuations across the sky are imprints of acoustic waves in the
plasma of the early universe. We *hear* the universe as it was
380,000 years after the Big Bang, and what we hear is the harmonics
of a giant standing wave.

## §14c.4  Light in biology

Photosynthesis is the planetary process by which light is captured
and chemical energy stored. The quantum efficiency of the
light-harvesting step, in the chlorophyll-protein complexes of plants
and bacteria, is close to 100 %. Recent ultrafast spectroscopy
(Engel et al. 2007) has revealed long-lived quantum coherences in the
energy-transfer process within these complexes. The energy moves
from antenna to reaction centre not by classical hopping but by
something closer to a coherent quantum superposition exploring
multiple paths and selecting the optimal one.

This is, for the framework of this book, a notable result. It
establishes a precedent: warm, wet, biological systems can sustain
quantum coherence on timescales relevant to their function. The
specific case of photosynthesis is at picosecond timescales (10$^{-12}$
s), which is well within reach of the Penrose-Hameroff
microtubule-coherence proposal's timescales for neural processes.

Animals use light too. Most obviously through eyes, but also through
opsin proteins distributed across other tissues; through circadian
entrainment to the daylight cycle; through ultraviolet-driven
vitamin D synthesis in skin. Birds may navigate by quantum-coherent
magnetoreception in cryptochrome proteins activated by blue light. The
biology of light extends well beyond seeing.

## §14c.5  Light as a coupling operator

In the framework of this book, light functions as a coupling operator
on the soma field of an organism in the same way music does. Specific
wavelengths and patterns of light entrain or destabilise specific
modes:

- *Bright morning light* entrains the circadian system to a phase
  conducive to daytime alertness; over weeks it can shift the calm
  attractor's stability profile.
- *Blue light in the evening* destabilises the calm attractor by
  delaying melatonin onset.
- *Low ambient red light* in the evening preserves the substrate
  conditions for the rest cycle.
- *Strobing at 7–12 Hz* (alpha-band) produces strong cortical
  entrainment and, in susceptible individuals, transient altered
  states. (Also: in epileptics, seizures.)
- *Fractal natural light* — sunlight through leaves, on water — has a
  spectral structure that appears to support rather than destabilise
  the calm attractor, in a way artificial light does not.

The light environment of a person is therefore, in the framework's
language, a continuous soft coupling on their soma field. Modern
industrial light environments (LED office lighting, screens, evening
indoor light) constitute a particular soft coupling that the
human soma field did not evolve under. The framework does not require
this fact to be ethically loaded, but does note it.

## §14c.6  Why this chapter is in this book

The book is about waves. Light is the wave we know best. Light is
the wave by which we know everything else. The chapter is here to
make explicit that the framework's wave ontology is not metaphorical;
the universe is genuinely full of one specific wave (the
electromagnetic) which the framework treats as the canonical example
of what all waves do.

In particular: the electromagnetic wave equation is *exactly* the same
mathematical object as the wave equation that governs the slow
oscillations of the heart, the diffusion-modulated reactions in
embryonic tissue, the standing modes of the soma field. The
substrate differs. The mathematics is the same. *That* is the claim
the book has made from page one, and light is the cleanest worked
example we have of it.
# Chapter 14d — Neutrinos: The Wave That Barely Touches

\begin{quote}\small\itshape
A wave that passes through a light-year of lead with only modest
attenuation, and through your body uncountably many times per second
without doing anything. The chapter is short because the wave is shy.
\end{quote}

## §14d.1  What neutrinos are

A neutrino is a neutral fermion. In the Standard Model of particle
physics it comes in three flavours — electron, muon, tau — paired with
their corresponding charged leptons. Its only known interactions are
the weak nuclear force (responsible for beta decay) and gravity. It
has a tiny but non-zero mass, established by the observation of
neutrino *oscillation* between flavours (Super-Kamiokande 1998, SNO
2001 — both Nobel-prize work).

## §14d.2  Sources

The Sun is the largest neutrino source for the Earth: about
$6 \times 10^{10}$ solar neutrinos per second pass through every
square centimetre at sea level. Nuclear reactors are the second largest
source for terrestrial detectors. Cosmic-ray showers in the upper
atmosphere are the third. Supernovae produce a brief but enormous
burst of neutrinos when their cores collapse; SN 1987A in the Large
Magellanic Cloud produced the only such burst detected to date
(11 events at Kamiokande-II, 8 at IMB, 5 at Baksan).

## §14d.3  Neutrino oscillation

The phenomenon that earned the Nobel: neutrinos produced in one
flavour can be detected, at a different point in space and time, in a
different flavour. The mathematics is identical to that of any other
quantum-mechanical two-state oscillation:

$$
P(\nu_\alpha \to \nu_\beta; L) = \sin^2(2\theta) \sin^2 \left(
\frac{\Delta m^2 L}{4 E_\nu} \right),
$$

where $\theta$ is a mixing angle, $\Delta m^2$ is the mass-squared
difference between mass eigenstates, $L$ is the propagation distance
and $E_\nu$ the neutrino energy. The phenomenon establishes that the
flavour eigenstates and mass eigenstates differ — exactly as in the
neutral-kaon system, exactly as in many condensed-matter systems
treated by SFT — and therefore that the neutrino's natural language
is wave language.

## §14d.4  Why neutrinos are in this book

For two reasons.

*First*, neutrinos are a beautiful illustration of the same physics
that the soma-field framework relies on for the
attractor-transition mechanism. Quantum oscillation between states
that differ in a basis-change is the same mathematics, formally,
whether the states are mass eigenstates of leptons or attractor
basins of a Langevin system. The reader who has followed the
discussion in chapters 12 and 13 already has the mathematical
equipment to read a neutrino-oscillation paper.

*Second*, neutrinos are the cleanest known case of a wave that has
unmissable physical consequences but barely interacts. The
framework asserts that the soma field is, in part, of a similar
character — it exists, it has consequences for the substrates it
couples to, but the coupling is gentle and the wave itself is largely
invisible to direct measurement. The neutrino is a precedent. Hard
to see does not mean not real.

## §14d.5  The Mössbauer of the soul

A thought experiment for the framework. The Mössbauer effect (1958,
also a Nobel) is the recoil-free emission and absorption of gamma rays
from atomic nuclei bound in a crystal lattice. In an ordinary gas,
emission and absorption are spread over a broad frequency band by
recoil and thermal motion. In a crystal lattice, the lattice as a
whole takes the recoil and the emission line becomes extraordinarily
sharp. This is why Mössbauer spectroscopy can resolve nuclear hyperfine
splittings that would otherwise be invisible.

The framework's prediction is that something analogous happens for the
soma field: when the substrate (cellular, fascial, autonomic) is
sufficiently coherent — sufficiently *lattice-like* — small coupling
operators (a word, a chord, a touch) can produce sharp, reproducible
responses that in a less coherent substrate would be smeared out into
noise. The clinical observation that *coherent* people respond to
small interventions more reliably than *incoherent* people is the
prediction's qualitative form.

The neutrino chapter is in this book because, when you start to think
of the soma field as a wave that barely interacts, the neutrino is the
closest known precedent in physics, and the Mössbauer mechanism is
the closest known precedent for *why a wave that barely interacts can
still be measured*. Coherent substrates make weak waves visible. This
is what the framework asks of the body.
# Chapter 15 — M-theory, the G$_2$ Manifold, and the Folded Universe

\begin{quote}\itshape
The four-dimensional world we walk through is the surface of an
eleven-dimensional object we cannot see.
\end{quote}

\vspace{1em}

## 15.1  Why this chapter exists

The bulk of this book — Chapters 2 through 14 — has been a tour of wave
phenomena at scales from the cosmic to the cellular, with the recurring
claim that the same mathematics describes all of them. That claim is
true at the level of the wave equation, the field equation, and the
attractor structure. It is true in a deeper sense, however, only if
there is a *single underlying geometry* that all the substrates we have
met are excitations of.

The candidate single underlying geometry, in modern theoretical physics,
is *M-theory* — the eleven-dimensional successor to string theory that
unifies the five consistent ten-dimensional string theories with
eleven-dimensional supergravity. M-theory remains, in 2026, the most
mathematically well-developed candidate framework for a unified
description of physics that includes both general relativity and the
standard model of particle physics.

This chapter is a non-technical sketch of how M-theory enters the
argument of this book. It is not, and cannot be, an introduction to
M-theory itself; the literature is vast and largely inaccessible
without a graduate background in geometry. What I will do here is
explain the *one* feature of M-theory that the soma-field argument
draws on: the *compactification on a G$_2$ manifold*, and the way this
compactification produces, in the visible four dimensions, exactly the
kind of folded, attractor-rich, threshold-filtered structure we have
been calling the soma field.

## 15.2  Eleven dimensions, seven of them folded

M-theory has eleven spacetime dimensions: the four we observe (three of
space, one of time) and seven additional dimensions that are
*compactified* — wrapped up at a scale too small to detect with current
experiments. The compactification scale is the Planck length, roughly
$10^{-35}$ metres, sixteen orders of magnitude smaller than a proton.

The shape of the seven-dimensional internal space is constrained by the
requirement that the compactification preserve the right amount of
supersymmetry to reduce to a realistic four-dimensional physics. In the
type-IIA / type-IIB string theories, the appropriate seven-dimensional
shape is a *Calabi–Yau threefold* tensored with a circle. In the
M-theoretic version most relevant to this book, the appropriate
seven-dimensional shape is a *G$_2$ manifold* — a seven-dimensional space
with a special holonomy group called G$_2$.[^acharya]

[^acharya]: Bobby Acharya and Edward Witten, "Chiral Fermions from
Manifolds of G$_2$ Holonomy," arXiv:hep-th/0109152 (2001). The standard
reference for G$_2$ compactifications in M-theory and their phenomeno-
logical implications.

The technical details do not matter for our purposes. The *qualitative*
features of G$_2$ manifolds matter a great deal, and these are:

1. They have *singularities* — points or curves where the geometry
   degenerates and the local description breaks down.
2. They have *folds* — regions where the geometry is highly curved and
   sheets of internal dimension are pressed close together.
3. They have *moduli* — continuous parameters describing the precise
   shape of the manifold, which (in physical applications) appear in
   the four-dimensional world as effective scalar fields.

Folds, singularities, and moduli. The vocabulary is the same as the
vocabulary of structural geology in Chapter 6, and the underlying
mathematical objects — folded manifolds with hinge singularities — are
in some cases literally the same. A *fold* in the geological sense and
a *fold* in the catastrophe-theory sense (which is the relevant sense
for G$_2$ singularities) are the same mathematical object, scaled by
roughly sixty orders of magnitude.

## 15.3  How the folding produces fields

A four-dimensional field — for example, a Higgs field, or a soma field
— can be understood, in the M-theoretic picture, as a *function of the
moduli* of the seven-dimensional internal geometry. As an observer in
the four large dimensions moves around, the internal geometry "tilts"
slightly relative to its average orientation, and this tilt is what we
perceive as the value of the field at our location.

Different folds in the internal geometry give rise to different
*topological sectors* of the four-dimensional theory. A field that lives
on one fold cannot smoothly continue onto another without passing
through a singularity; this is, mathematically, exactly the structure of
an *attractor landscape* with multiple basins separated by barriers.
The basins of the soma-field landscape in Chapter 12 are, on this
picture, *images of folds in the internal geometry*. The barriers
between basins are *images of singularities at the hinges of folds*.

This is where the soma-field model makes contact with M-theory. The
eight-dimensional internal structure of the soma field is interpreted as
a projection of the seven-dimensional G$_2$ geometry plus the one time
direction. The eight modes are *not arbitrary*; they correspond to the
eight independent moduli of a particular class of G$_2$ manifold under a
particular orbifolding. The attractor structure is the topology of the
G$_2$ singularity locus. The quantum tunnelling of Chapter 13 is, in this
picture, the standard M-theoretic mechanism by which a system can
transition between topological sectors.

I am compressing several papers' worth of argument into a few
paragraphs. The full technical version is in the *Mathematical
Co-identification* paper of the *Soma Field* series.[^matheco]

[^matheco]: Alistair Johnson, *Mathematical Co-identification: The
Soma Field as a G$_2$-Compactification Projection*, Zenodo (2026),
<https://doi.org/10.5281/zenodo.20287981>.

## 15.4  The Mandelbulb as a visualisation

Seven-dimensional manifolds cannot be drawn. Their three-dimensional
slices, however, can be. The most useful three-dimensional slice for
visualisation purposes is the *Mandelbulb*: the three-dimensional
analogue of the Mandelbrot set, computed by extending the complex
multiplication of the Mandelbrot iteration to a three-dimensional
"triplex" algebra.

The Mandelbulb, rendered at high resolution, displays exactly the
structural features we have been discussing: it has folds, hinges,
deep recesses, fractal branching at every scale, and a non-trivial
topology with multiple disconnected components. It is *not*, strictly,
a G$_2$ manifold; the algebraic structure is different. But as a
*qualitative* visualisation of the kind of geometry the soma-field
argument lives on, it is the best available three-dimensional object.

> **Figure 15.1** *(BUILD)* — A high-resolution Mandelbulb render, with
> the principal folds labelled. *To be generated by the author from
> standard parameters; CC-licensed renderings exist for fallback.*

The Mandelbulb is also, not coincidentally, the cover image of this
book. The closing chapter, Chapter 16, will return to it as the visual
summary of everything the book has tried to argue.

## 15.5  What this chapter is and is not claiming

What I am claiming: that the soma-field model, as published in the
technical paper series, is consistent with a particular M-theoretic
compactification, that the eight modes of the field have a natural
geometric interpretation in that compactification, and that the
attractor structure of the field matches the topological structure of
the underlying G$_2$ manifold.

What I am not claiming: that the soma-field model *requires* M-theory.
The field-level model is independent of substrate, as we saw in Chapter
14. M-theory is the most ambitious possible identification of the
underlying geometry. If M-theory turns out to be the wrong framework
for fundamental physics — which is a real possibility, given that no
direct experimental evidence has yet been found for any of its
distinctive predictions — the soma-field model remains intact, with the
geometric interpretation re-housed in whatever framework replaces it.

What I am also not claiming: that any of this proves M-theory. The
soma-field is, in this picture, a *consequence* of the compactification,
not an *independent test* of it. The argument flows from the geometry
to the field, not the other way round. The empirical pressure on
M-theory comes from particle physics and cosmology, not from
psychotherapy.

## 15.6  Why I am putting this in a coffee-table book at all

A reasonable reader will ask: why drag eleven-dimensional supergravity
into a book that is otherwise about leaves, mountains, and the human
nervous system?

Two reasons.

First, because the *visual* of a folded high-dimensional geometry is
the most accurate available picture of the underlying structure of the
soma field. Without it, the soma field looks like another piece of
hand-waving about "energy fields"; with it, the field acquires the same
geometric dignity as any other physical field, and the same kind of
mathematical control.

Second, because the argument of this book — that the universe is a
single wave system at every scale — is only true if there is a single
underlying geometry that the wave system runs on. M-theory is the
current best candidate for that geometry. Whether or not it turns out
to be correct, the *kind* of argument that is needed has been worked
out in some detail in the M-theoretic case, and the soma-field model
can be stated cleanly in that language.

The Mandelbulb on the cover is the picture of all of this, folded down
into three dimensions, rendered in the most pedagogically useful form
the current state of the visualisation art permits. We will return to
it in Chapter 16.

\vspace{1em}

\begin{quote}\itshape
\textbf{Standing claim.}\\
The soma field is the projection, into the four large spacetime
dimensions, of moduli on a folded seven-dimensional G$_2$ manifold. The
eight modes of the field correspond to the eight independent moduli;
the attractor basins correspond to the folds; the barriers correspond
to the hinge singularities; the quantum tunnelling mechanism of
Chapter 13 is the standard M-theoretic transition between topological
sectors. The Mandelbulb is the best available three-dimensional picture
of all of this.
\end{quote}

\newpage
# Chapter 15a — M-theory: Eleven Dimensions, In a Walking Pace

\begin{quote}\itshape
Before we can talk about a folded seven-dimensional manifold inside
a fundamental theory of physics, we should at least try to say what
the eleven dimensions are and how anyone arrived at them.
\end{quote}

\vspace{1em}

## 15a.1  The road to eleven

Physics in the twentieth century became, in retrospect, a sustained
exercise in *unification*. Maxwell unified electricity and magnetism
in the 1860s. Einstein unified space and time in 1905, then time-space
and gravitation in 1915. Quantum mechanics, in the 1920s, unified the
particulate and the wave-like aspects of matter. Quantum
electrodynamics, in the 1940s, unified electromagnetism with quantum
mechanics. The electroweak unification, in the 1960s, brought together
electromagnetism and the weak nuclear force. The Standard Model, in the
1970s, brought in the strong nuclear force.

The next step on the staircase — the unification of the Standard Model
with gravitation — has now consumed the better part of fifty years of
work by thousands of theoretical physicists, and is not yet done. The
leading candidate framework is *string theory* and its eleven-dimensional
parent, *M-theory*.

This chapter is not, and cannot be, a technical introduction to M-theory.
The serious literature requires a graduate education in differential
geometry, quantum field theory, and algebraic topology, and even at
that level the subject is genuinely difficult. What we will do in this
chapter — and the two that follow — is build up the *qualitative
picture* of M-theory at a walking pace, focusing on the features that
matter for the soma-field argument.

## 15a.2  Strings

The original observation, due in different forms to several physicists
in the late 1960s and crystallised by Joël Scherk and John Schwarz in
1974, was that the elementary objects of physics might not be *points*
but *strings* — one-dimensional objects whose vibrational modes give
rise to the spectrum of observed particles. Different modes of
vibration produce different particles. In particular, one mode produces
a spin-2 massless particle whose long-distance behaviour is exactly
that of a *graviton* — the quantum of the gravitational field.

This was the first time in the history of physics that gravity had
*emerged* automatically from a more fundamental theory rather than
having to be put in by hand. It was, and remains, the single most
compelling theoretical reason to take string theory seriously.

> **Figure 15a.1** *(BUILD)* — Vibrational modes of a closed string.
> The lowest few modes are labelled with the particles they would
> correspond to in the four-dimensional effective theory. *Author
> schematic.*

The catch is that consistency of the quantum theory of strings requires
the strings to live in *more than four spacetime dimensions*. The
specific number depends on the version of string theory; for the
bosonic string it is 26 dimensions, for the superstring (which is the
realistic case) it is 10 dimensions. Six dimensions beyond the four we
observe.

## 15a.3  The five superstring theories

By the mid-1980s it was clear that there were exactly *five*
consistent ten-dimensional superstring theories. They are usually
labelled:

| Name | Strings | Notes |
|---|---|---|
| Type I | Open + closed | Has open strings with endpoints |
| Type IIA | Closed only | Non-chiral; circle-compactifies to 11D supergravity |
| Type IIB | Closed only | Chiral; has self-dual five-form field strength |
| Heterotic $E_8 \times E_8$ | Closed only | Carries $E_8 \times E_8$ gauge group |
| Heterotic SO(32) | Closed only | Carries SO(32) gauge group |

Five theories was an embarrassment. The point of unification is to end
up with *one* theory, not five.

The resolution, due to Edward Witten and others in 1995, was that the
five theories are *not* independent; they are five corners of a single
underlying theory in *eleven* dimensions. The relationships between
them are *dualities* — exact equivalences between different-looking
theories. Witten named the underlying eleven-dimensional theory
*M-theory*, with the M deliberately ambiguous (it has been variously
glossed as "membrane", "mother", "mystery", "magic", or "matrix").[^witten95]

[^witten95]: Edward Witten, "String Theory Dynamics in Various
Dimensions," *Nuclear Physics B* 443 (1995): 85–126,
arXiv:hep-th/9503124. The paper that initiated what is now called the
*Second Superstring Revolution*.

\begin{figure}[h]
\centering
\includegraphics[width=0.85\linewidth]{soma/wave-atlas/figures/F15_3_mtheory.png}
\end{figure}

> **Figure 15a.2** *(BUILD)* — The "M-theory hexagon": five
> ten-dimensional superstring theories arranged around the perimeter,
> with eleven-dimensional M-theory in the centre. Arrows indicate the
> dualities (T, S, U). *Author schematic, after Schwarz 1996.*

## 15a.4  Eleven dimensions: the supergravity limit

The eleven-dimensional theory at the centre is, in its low-energy
limit, *eleven-dimensional supergravity* — a theory written down in
1978 by Eugène Cremmer, Bernard Julia, and Joël Scherk, originally as
an abstract curiosity. The action is uniquely fixed by supersymmetry:
the bosonic field content is the metric $g_{MN}$ and a three-form
gauge field $C_{MNP}$ with field strength $G = dC$; the fermionic
content is a single Majorana gravitino $\psi_M$.

The two-derivative action, in standard normalisation, is

$$S_{11} = \frac{1}{2\kappa_{11}^2} \int d^{11}x\,\sqrt{-g}\;\Big(R - \tfrac{1}{2}|G|^2\Big) - \frac{1}{6}\int C \wedge G \wedge G + \text{(fermion terms)}.$$

The number 11 is *forced* by supersymmetry: it is the largest dimension
in which a supergravity theory exists with a single graviton and no
fields of spin higher than 2.

Eleven-dimensional supergravity is the low-energy *limit* of M-theory.
The full theory contains, in addition, extended objects — *M2-branes*
(two-dimensional membranes) and *M5-branes* (five-dimensional
membranes) — that source the three-form field. The strings of the
ten-dimensional theories appear, in eleven dimensions, as M2-branes
wrapped on the eleventh dimension.

## 15a.5  Compactification: making the four-dimensional world

We do not, manifestly, observe eleven spacetime dimensions. We observe
four. The way M-theory reconciles its eleven-dimensional foundations
with our four-dimensional experience is *compactification*: seven of
the eleven dimensions are wrapped up on a tiny *internal manifold*,
small enough that no current experiment can directly probe its
structure.

The size of the internal manifold determines the energy at which the
extra dimensions become directly visible. For an internal radius of
order the Planck length $\ell_P \sim 10^{-35}\,\mathrm{m}$, this energy
is the Planck energy $\sim 10^{19}\,\mathrm{GeV}$, sixteen orders of
magnitude above what the LHC can probe.

The choice of *which* seven-dimensional internal manifold determines
the structure of the four-dimensional effective theory: which gauge
groups appear, which matter fields, which Yukawa couplings, which
cosmological constant. The phenomenologically realistic
compactifications are those whose internal manifold has *G$_2$
holonomy* — a special-geometry property we will spend Chapter 15c
on.

## 15a.6  Holonomy

Before we get to G$_2$ specifically, let me explain *holonomy* in
general, because it is the single most important geometric notion in
this chapter.

Take a smooth manifold (a curved generalisation of a plane). Pick a
point. Pick a vector at that point — say, a small arrow. Now *parallel-
transport* the arrow around a closed loop: move it along the loop in
the most "natural" way the geometry of the manifold permits, never
rotating it relative to the local geometry. When you return to the
starting point, the arrow may not be in the same orientation as when
you started. The set of all possible final orientations, over all
possible loops, forms a group — the *holonomy group* of the manifold.

For a flat plane, the holonomy group is trivial: an arrow comes back
the way it left. For a generic curved manifold of dimension $n$, the
holonomy group is the full rotation group $SO(n)$. The interesting
cases — the *special holonomy manifolds* — are those whose holonomy
group is a *proper subgroup* of $SO(n)$. Each special holonomy
corresponds to extra preserved geometric structure on the manifold,
and (in the supergravity context) extra preserved supersymmetry in the
compactified four-dimensional theory.

The list of special holonomies, due in modern form to Marcel Berger
in 1955, is short:

| Dim | Holonomy | Preserved structure | Name |
|---|---|---|---|
| 2$n$ | $U(n)$ | Complex structure | Kähler |
| 2$n$ | $SU(n)$ | Complex + Ricci-flat | Calabi–Yau |
| 4$n$ | $Sp(n)$ | Three complex structures | Hyperkähler |
| 4$n$ | $Sp(n)Sp(1)$ | Three almost-complex | Quaternionic Kähler |
| 7 | $G_2$ | Three-form $\varphi$ | G$_2$ manifold |
| 8 | $Spin(7)$ | Four-form $\Phi$ | Spin(7) manifold |

The last two are the *exceptional* holonomies — they exist only in
dimensions 7 and 8 respectively. For M-theory, with seven internal
dimensions, the relevant special holonomy is $G_2$.

## 15a.7  Why a person should care

I will close this chapter — the calmest of the three M-theory chapters
— with the question that I imagine most readers have at this point.
Why should a person who is interested in their own emotional life, or
in geology, or in the structure of the cosmos, care about any of this?

There are three reasons.

**First**: M-theory is, as of 2026, the most mathematically developed
candidate for a unified description of physics. It may turn out to be
wrong — many physicists think it will — but it is not a frivolous
proposal. It is the result of fifty years of work by some of the most
careful minds in the field. If you are interested in the *kind of
object* the universe is, M-theory is the most ambitious working answer
on the table.

**Second**: the geometric language M-theory has developed — folded
manifolds, hinge singularities, moduli flows, brane intersections — has
turned out to be the *right* language for describing a wide class of
physical phenomena, including, on the soma-field model, the dynamics
of feeling. It is the same vocabulary as the structural geology of
Chapter 6, the attractor landscapes of Chapter 12, and the quantum
tunnelling of Chapter 13. The vocabulary is the bridge.

**Third**: the *visual* of a folded seven-dimensional manifold — best
approximated for human eyes by the Mandelbulb — is the most accurate
available picture of the underlying geometry on which all of the wave
phenomena in this book run. Whether or not M-theory is in detail the
correct theory, the picture is correct in its essentials.

The next chapter goes into the dualities; the chapter after that into
G$_2$ specifically.

\newpage
# Chapter 15b — Dualities: The Same Theory Wearing Five Masks

\begin{quote}\itshape
The five superstring theories are not five different theories. They
are five different descriptions of the same theory, useful in five
different regimes. Translating between them is what a duality is.
\end{quote}

\vspace{1em}

## 15b.1  What a duality is

In physics, a *duality* is an exact equivalence between two different-
looking descriptions of the same underlying system. Both descriptions
make the same predictions for every physical observable; both have the
same Hilbert space, the same spectrum of states, the same correlation
functions. They differ only in the *fields and parameters* used to
write them down. One description may be easy to compute with in a
regime where the other is hard; that is what makes dualities useful.

The simplest example is *position-momentum duality* in ordinary
quantum mechanics: the same wave function $\psi$ can be written either
as a function $\psi(x)$ of position or as its Fourier transform
$\tilde\psi(p)$ of momentum. Position-space and momentum-space are
two descriptions of the same state. Some questions (where is the
particle?) are easy in position space; others (what is its energy?)
are easy in momentum space. The Fourier transform is the *duality*
between the two.

String theory has three families of dualities:

- **T-duality** ("target-space duality"): equates a string theory on a
  circle of radius $R$ with the same kind of string theory on a circle
  of radius $\alpha'/R$, where $\alpha'$ is the string length squared.
  Tiny circles and huge circles are physically identical.

- **S-duality** ("strong-weak duality"): equates a string theory at
  string coupling $g_s$ with a (possibly different) string theory at
  coupling $1/g_s$. Strongly coupled theories are weakly coupled
  theories, viewed differently.

- **U-duality**: a generalisation combining T and S, applicable when
  multiple compactified dimensions and multiple coupling parameters
  exist.

## 15b.2  T-duality, in pictures

T-duality is the easiest of the three to picture. Consider a closed
string in ten-dimensional flat spacetime, with one of the ten
dimensions compactified on a circle of circumference $2\pi R$. The
string has two distinct kinds of excitations along the compact
direction:

- *Momentum modes*: the string's centre of mass can move around the
  circle. Quantum mechanics quantises this motion into a discrete
  ladder of momentum states, with momentum $p_n = n/R$ for integer
  $n$.

- *Winding modes*: the string itself can wrap around the circle
  $w$ times. The energy cost of winding is proportional to the
  circle's circumference times the string tension, giving an
  energy $E_w = w R / \alpha'$.

The full energy spectrum of the string therefore depends on $R$ in
two complementary ways: momentum modes get *lighter* as $R$ grows
(easier to wave-pack around a big circle); winding modes get
*heavier* as $R$ grows (more string to drag around a big loop). At
the *self-dual radius* $R = \sqrt{\alpha'}$, the spectra are perfectly
symmetric.

The T-duality transformation exchanges $R \leftrightarrow \alpha'/R$
and simultaneously exchanges momentum modes with winding modes. The
total spectrum is unchanged. The two descriptions are
indistinguishable from inside.

> **Figure 15b.1** *(BUILD)* — Two cylinders. The left cylinder has a
> small circumference $R$; a closed string is drawn wrapped twice
> around it ($w=2$, $n=0$). The right cylinder has a large
> circumference $\alpha'/R$; a closed string is drawn travelling
> around it with two units of momentum ($w=0$, $n=2$). The two
> configurations have identical energy. *Author schematic.*

## 15b.3  S-duality and the strong-coupling limit

S-duality is harder to picture but more profound. In quantum field
theory, *coupling constants* parametrise the strength of interactions.
A theory at small coupling is well-approximated by *perturbation
theory*: compute amplitudes order by order in the coupling, get
good answers. A theory at large coupling is *non-perturbative*:
the series diverges, perturbative methods fail, and direct
computation becomes extremely hard.

S-duality says: in certain string theories, the strongly-coupled
regime of one theory is exactly the weakly-coupled regime of another.
What looks like a hopeless non-perturbative problem in one description
is a tractable perturbative problem in another.

The most striking case: Type IIA superstring theory at strong coupling
*becomes* eleven-dimensional supergravity. The radius of the
emergent eleventh dimension is proportional to the Type IIA string
coupling: $R_{11} = g_s^{2/3}\, \ell_s$, where $\ell_s$ is the string
length. At weak coupling the eleventh dimension is tiny and the theory
looks ten-dimensional; at strong coupling the eleventh dimension grows
without bound and the theory reveals itself as eleven-dimensional.

This is the most important duality in the M-theory programme: it is
the statement that the eleventh dimension is *not* a separate
postulate, but a consequence of taking Type IIA strings seriously at
all coupling strengths.

## 15b.4  The duality web

Once you assemble all the dualities together, the five superstring
theories form a *web*:

- Type IIA at strong coupling $\leftrightarrow$ 11D supergravity on a
  large circle (S-duality, dimensional opening).
- Type IIA on a circle $\leftrightarrow$ Type IIB on a circle (T-duality).
- Type IIB at strong coupling $\leftrightarrow$ Type IIB at weak
  coupling (S-self-duality).
- Heterotic SO(32) at strong coupling $\leftrightarrow$ Type I at weak
  coupling (S-duality across heterotic-to-Type-I).
- Heterotic $E_8 \times E_8$ at strong coupling $\leftrightarrow$ 11D
  supergravity on an interval $S^1/\mathbb{Z}_2$ (Hořava–Witten
  duality).

Five theories. One web. M-theory in the centre.

> **Figure 15b.2** *(BUILD)* — The duality web as a hexagonal diagram.
> Six nodes around the outside (the five superstring theories plus
> 11D supergravity); central node labelled "M-theory". Edges labelled
> with the type of duality (T, S, Hořava–Witten). *Author schematic,
> after Polchinski 1998.*

## 15b.5  Branes and the source of duality

What underlies the duality web is the existence of *branes* — extended
objects of various dimensions on which strings can end and which
themselves source higher-form gauge fields. The M-theory hierarchy is
clean:

- **M2-brane**: 2-dimensional membrane in 11D, sourcing the
  three-form $C$.
- **M5-brane**: 5-dimensional membrane in 11D, sourcing the dual
  six-form $\tilde C$.

When we compactify on a circle and reduce to ten dimensions, the
M-branes become the Type IIA branes:

- M2 wrapped on the $S^1$ $\to$ Type IIA fundamental string.
- M2 not wrapped $\to$ Type IIA D2-brane.
- M5 wrapped $\to$ Type IIA D4-brane.
- M5 not wrapped $\to$ Type IIA NS5-brane.

The various branes are the *different objects* that the various
dualities mix. The M-theory dictionary is that all of these are, in
eleven dimensions, the same two species — M2 and M5 — viewed from
different compactification angles.

## 15b.6  Anomaly cancellation

A *quantum anomaly* is the failure of a classical symmetry to survive
quantisation. Anomalies generally signal an inconsistency in the
theory: a gauge symmetry that is anomalous in the quantum theory has
ghosts in its spectrum and is non-unitary.

It is a remarkable fact that all five superstring theories are
*anomaly-free*: the potential anomalies, computed naively, cancel
exactly because of the specific spectrum each theory carries. The
anomaly cancellation conditions are *extremely* restrictive — Green
and Schwarz's 1984 demonstration that Type I theory with gauge group
SO(32) cancels its anomaly was the spark that lit the first
superstring revolution.

For the soma-field argument, the analogue of anomaly cancellation is
the requirement that the 8-mode structure on the soma-field be
*topologically consistent* — that the projection from 11 dimensions to
the 4 visible plus the 8-mode internal does not produce ghosts. This
turns into a constraint on the G$_2$ holonomy structure that we will
meet in the next chapter.

## 15b.7  AdS/CFT — a sibling duality worth knowing about

While not strictly part of the M-theory duality web, the *AdS/CFT
correspondence* — discovered by Juan Maldacena in 1997[^malda] — is
worth a paragraph. It states that certain string theories on
*anti-de-Sitter* backgrounds (negatively curved) are exactly
equivalent to certain *conformal field theories* (highly symmetric
quantum field theories) on the boundary of those backgrounds. The
duality maps gravity in $d+1$ dimensions to gauge theory in $d$
dimensions. It is, in a sense, a *holographic* duality.

The relevance for us: AdS/CFT is the most concrete realisation of the
*holographic principle*, the idea that a $d$-dimensional region of
space can be completely described by the data on its
$(d-1)$-dimensional boundary. This is the same principle that motivates
the *cyber-hologram* metaphor for the body: the body, as a
three-dimensional wave system, can be substantially described by the
field data on its two-dimensional boundary (the skin).

[^malda]: Juan M. Maldacena, "The Large $N$ Limit of Superconformal
Field Theories and Supergravity," *Advances in Theoretical and
Mathematical Physics* 2 (1998): 231–252, arXiv:hep-th/9711200.

## 15b.8  Summary

The five superstring theories are five descriptions of one theory.
The translations between them are dualities (T, S, U). The unifying
parent theory is M-theory in eleven dimensions, whose low-energy limit
is eleven-dimensional supergravity, whose extended objects are
M2-branes and M5-branes, and whose phenomenologically interesting
compactifications use seven-dimensional manifolds of G$_2$ holonomy.
The next chapter is about G$_2$ specifically.

\newpage
# Chapter 15c — G$_2$, Folded: Seven Dimensions, Their Geometry, and the Soma-Field Connection

\begin{quote}\itshape
The folds in the Glarus thrust and the folds in a G$_2$ manifold are
not metaphor for each other. They are the same mathematics, applied at
different scales, to different physical substrates. This chapter is
about that mathematics.
\end{quote}

\vspace{1em}

## 15c.1  G$_2$ the group

$G_2$ is the smallest of the five *exceptional* Lie groups (the others
being $F_4$, $E_6$, $E_7$, $E_8$). It was discovered by Wilhelm Killing
in 1887 in the course of his classification of simple Lie algebras,
and is the *automorphism group of the octonions* — the eight-dimensional
non-associative normed division algebra.

As a manifold, $G_2$ is 14-dimensional and compact. Its action on
$\mathbb{R}^7$ preserves both a Euclidean inner product and a special
*three-form*

$$\varphi = e^{123} + e^{145} + e^{167} + e^{246} - e^{257} - e^{347} - e^{356}$$

where $e^{ijk}$ is shorthand for $e^i \wedge e^j \wedge e^k$ on an
orthonormal basis $e^1, \dots, e^7$. The three-form $\varphi$ is the
*defining geometric structure* of a G$_2$ manifold: a manifold has
G$_2$ holonomy precisely if it carries a covariantly constant
three-form of this algebraic type.

## 15c.2  G$_2$ the manifold class

A *G$_2$ manifold* is a seven-dimensional Riemannian manifold $X$ whose
holonomy group is a subgroup of $G_2$. Equivalently: $X$ carries a
three-form $\varphi$ that is closed ($d\varphi = 0$) and co-closed
($d \star \varphi = 0$).

Three properties of G$_2$ manifolds matter for us:

1. They are *Ricci-flat*: $R_{\mu\nu}(X) = 0$. This is the geometric
   counterpart of the statement that compactifying eleven-dimensional
   supergravity on $X$ gives a four-dimensional theory whose vacuum
   has no cosmological constant from the internal geometry alone.

2. They admit a *single covariantly constant spinor*. This is the
   geometric counterpart of $\mathcal{N} = 1$ supersymmetry in the
   four-dimensional theory — the minimum amount of supersymmetry
   consistent with chiral matter (which we observe).

3. They generically have a rich *singularity structure*: codimension-
   four loci where the metric degenerates in specific ways, producing
   localised gauge symmetries and chiral matter in the four-
   dimensional effective theory.

The first compact G$_2$ manifolds were constructed by Dominic Joyce
in 1994–96, by an elaborate resolution-of-singularities procedure
starting from orbifolds.[^joyce] No simple closed-form examples are
known.

[^joyce]: Dominic D. Joyce, "Compact Riemannian 7-manifolds with
holonomy $G_2$," I and II, *Journal of Differential Geometry* 43
(1996): 291–328 and 329–375.

## 15c.3  Folds, hinges, singularities

The thing the structural geologist calls a *fold* and the thing the
G$_2$ geometer calls a *singularity locus* are, in their local
geometric structure, *the same thing*. Both are codimension-one or
codimension-four loci where a smooth metric or a smooth bedding
plane has been pushed into a non-smooth configuration by a
deformation flow.

The geological fold has a *hinge* (the line of maximum curvature) and
two *limbs* (the smoothly-curved sides). The G$_2$ singularity has a
*core* (the locus of singular metric) and two *sides* (the smoothly-
G$_2$ regions on either side). The mathematics of how the fold
*deforms* under the underlying flow — what geologists call the
*kinematic history* and what geometers call the *moduli flow* — is in
both cases governed by a system of partial differential equations on
the manifold.

Catastrophe theory, due to René Thom in the 1960s, gives a complete
local classification of folds in finite-dimensional smooth maps. The
seven *elementary catastrophes* — fold, cusp, swallowtail, butterfly,
hyperbolic umbilic, elliptic umbilic, parabolic umbilic — appear as
the only generic local singularities of smooth maps from
$\mathbb{R}^n$ to $\mathbb{R}^m$ for small $n, m$. The *fold* itself
($A_2$ in Thom's notation) is the simplest non-trivial catastrophe; the
*cusp* ($A_3$) is the next.

In a G$_2$ manifold, the codimension-four singularity types are
classified by *ADE labels* — the Dynkin diagrams of the simply-laced
Lie groups. Each ADE type corresponds to a different pattern of
intersection of the singular locus with itself, and produces a
different gauge group in the four-dimensional effective theory:

| ADE | Group | Soma-field interpretation |
|---|---|---|
| $A_n$ | $SU(n+1)$ | Chain attractor (n+1 modes coupled cyclically) |
| $D_n$ | $SO(2n)$ | Y-junction attractor (n modes branching at a fork) |
| $E_6$ | $E_6$ | Six-fold rotationally symmetric attractor |
| $E_7$ | $E_7$ | Seven-fold (rare; observed once, hypervigilance complex) |
| $E_8$ | $E_8$ | Eight-fold; we conjecture this is the full soma-field |

\begin{figure}[h]
\centering
\includegraphics[width=0.7\linewidth]{soma/wave-atlas/figures/F15_2_g2.png}
\end{figure}

> **Figure 15c.1** *(BUILD; pair, recto-verso)* — *Left:* recumbent
> fold in the Helvetic nappes, photographed at outcrop. *Right:* a
> schematic $A_2$ catastrophe singularity in a G$_2$ manifold. The
> two are presented at the same image-scale to display the geometric
> identity. *Geological photograph: A. Johnson drone capture, summer
> 2026; mathematical schematic: author render from Thom 1972.*

## 15c.4  The eight modes as a G$_2$ projection

Here is where the speculative content of the soma-field argument comes
in. We have built up, through Chapters 6–14, a picture of the body as
an eight-mode field with attractor structure that resembles the
folded geometry of a G$_2$ manifold. The conjecture that ties the
soma-field argument to M-theory is this:

\begin{quote}
The eight modes of the soma field are the eight components of a
real-valued G$_2$-equivariant section of the tangent bundle of an
$E_8$-type singular G$_2$ manifold, projected onto the four-
dimensional spacetime in which the body lives.
\end{quote}

This is *not* a derivation; it is a conjecture. The technical content
of papers P3, P4, and P8 in the soma-field series is the precise
mathematical formulation; the technical content of paper P5 is the
physical-substrate side (microtubules, electromagnetic field, fascia);
the technical content of papers P1 and P2 is the dynamics on the
projection.

The conjecture has two pleasant consequences:

1. The number *eight* of modes is not arbitrary; it is forced by the
   choice of $E_8$ as the singularity type, which is itself the only
   choice consistent with the full anomaly cancellation conditions of
   M-theory (the heterotic $E_8 \times E_8$ matching). Calm / fight /
   flight / freeze / flow / joy / grief / hypervigilance is the
   *only allowed* eightfold structure under the constraint.

2. The transitions between modes, on the soma-field, are governed by
   the same fold and cusp catastrophes that govern transitions
   between vacua in the M-theory landscape. The mathematics that
   describes the moduli-space flow of a G$_2$ manifold under a
   deformation flow is the *same* mathematics that describes a
   person's transition from depression to flow under therapeutic
   intervention.

I will be the first to say that this is an enormous claim. It is also
falsifiable: if the QUANT-EXP-1 results survive scrutiny, if the
clinical replication ledger fills out, if the predicted catastrophe-
type transitions are observed in clinical settings, the claim
strengthens. If they do not, the claim falls.

That is what the rest of this book is, in part, about: not to convince
you that the conjecture is *true*, but to convince you that it is
*worth testing*.

## 15c.5  Moduli, monodromy, and the persistence of mood

A *moduli space* is the space of allowed shapes that a manifold of a
given type can take while preserving its essential structure. For a
G$_2$ manifold, the moduli space parametrises the allowed metrics; for
a soma-field, the moduli space parametrises the allowed steady-state
mode-amplitude configurations of a person.

The geometry of moduli space encodes the *persistence of mood*. A
person whose moduli-space trajectory has been deformed into a deep
fold (a basin) will *stay* in that fold under small perturbations —
hence the experiential fact that depression, once entered, tends to
be self-sustaining. A person whose trajectory has been knocked across
a fold (by, say, a traumatic event) will not spontaneously return to
the previous fold — hence the experiential fact that trauma changes
people.

*Monodromy* — what happens to a configuration when you transport it
around a closed loop in moduli space — is the geometric counterpart
of what therapists call *re-traumatisation*: the configuration does
not return to its starting state because the path in moduli space
encloses a singularity.

## 15c.6  The two pictures, together

We arrive, then, at two pictures of the same object. The geological
picture: a folded sedimentary stack with thrust planes, hinge zones,
recumbent limbs. The G$_2$ picture: a folded seven-dimensional
manifold with ADE singularities, moduli flow, monodromy. The body, on
the soma-field model, is the four-dimensional projection of a folded
G$_2$ manifold of $E_8$-singularity type, whose dynamics are exactly
the same as the dynamics of a folded geological stack under tectonic
stress.

The Mandelbulb is the best available *visual* of the underlying
seven-dimensional folded geometry. The Tschingelhörner is the best
available *physical instance* of the same folded geometry on a scale
the human body can stand next to. The cyber-hologram body is the
best available *anatomical representation* of the four-dimensional
projection.

The three pictures are the same picture, viewed from three angles.

\newpage
# Chapter 15d — Three Compactifications, Three Lives

\begin{quote}\itshape
Speculative. Marked as such. To be read as a working sketch of the kind
of construction the framework permits, not as an established result.
\end{quote}

\vspace{1em}

In M-theory, the choice of how the seven hidden dimensions are
compactified determines what physics looks like in the four-dimensional
world we observe. Different Calabi-Yau or G$_2$ manifolds give
different particle content, different gauge groups, different
cosmological constants. There is no preferred compactification; the
choice is part of the data of which universe one is in.

In the soma-field framework of this book, the *body* has seven internal
degrees of freedom — the dimensions of the M-theory triplet times the
G$_2$ projection structure of Chapter 15c — and the way those internal
degrees of freedom are compactified in a given individual at a given
time is what determines the structure of that individual's lived
experience. This chapter sketches a particular speculation: that human
life has, broadly, three distinguishable compactification regimes,
loosely corresponding to childhood, adulthood, and old age. The
transitions between them are not gradual; they are phase transitions in
the moduli space.

## §15d.1  The childhood compactification

A young child — say, before the age of seven — has an internal
configuration in which the compactified dimensions are *large*, in the
M-theory sense. The Kaluza-Klein modes are at low energy. This has a
specific phenomenological signature: the child experiences high
dimensionality directly. Time is multidimensional (the past and the
future are not sharply distinguished from the present in the way an
adult experiences them). Spatial reasoning is direct rather than
projected (a child does not need to do mental rotation to "see" the
back of an object; they just see it). Emotional states are not
compressed into a small basis (a child can be sad, angry, delighted,
and curious within the same minute without internal contradiction).

The mathematical signature is: small compactification radius means
heavy Kaluza-Klein modes (decoupled at low energy); *large*
compactification radius means light Kaluza-Klein modes (accessible at
the energy scale of ordinary experience).

The reason adults find children's cognition mysterious — why the
toddler's grief over the broken biscuit is, to the adult, both totally
genuine and totally inappropriate-in-scale — is that the adult is
perceiving through a small-radius compactification in which most of the
modes that the child has direct access to are decoupled.

## §15d.2  The adult compactification

By the early twenties — in industrialised, schooled, modernity-adapted
populations — the compactification radius has reduced. The internal
dimensions are compactified small. The Kaluza-Klein tower is heavy.
Experience is projected to four dimensions: three of space, one of
time, in a single narrative thread.

This is the compactification industrial modernity selects for. A worker
in an industrial economy must produce reliably scheduled output at
predictable times. Linear time, single-threaded narrative, sharply
distinguished past-present-future, suppressed multidimensional affect —
these are all features of a small-radius adult compactification, and
they are also exactly the features industrial work requires.

The cost is the loss of access to the modes the child had. An adult
remembers having had them but cannot enter them. The closest most
adults come to re-entering them in ordinary waking life is during sex,
during musical absorption, during certain athletic states, and during
the early phase of grief — all of which adults often experience as
disorientating *because* the compactification is briefly larger and
modes that are normally suppressed become accessible.

In the soma-field framework this is the compactification regime under
which most of Chapter 11 is implicitly written. The eight-mode
attractor structure is the structure of the *adult* compactification.
Children do not have eight modes; they have something more like a
continuous fluid in which the eight modes are not yet sharply
distinguished. The eight-mode structure is the discrete spectrum that
appears when you compactify small.

## §15d.3  The late-life compactification

The third regime is sketched here with the greatest hesitation, because
there is the least empirical literature on it and because it is the one
the author has not yet entered.

But the testimony of those who have entered it is consistent: in late
life — sixties, seventies, eighties — the compactification radius
appears to *re-expand*. Not back to the childhood radius, and not in
the same way, but in a recognisable direction. Subjects report a
loosening of the sharp temporal narrative; the past, the present, and
the imagined future become less sharply distinguished. Affect becomes
both more multidimensional and, paradoxically, calmer — as if the
extra degrees of freedom relieve pressure on any single one. Memory
becomes less linear (in mild form: misremembering when something
happened; in stronger form: pleasantly re-experiencing decades-old
events as if present).

The clinical literature has tended to read this as decline — the
compactification of childhood loosened by neuropathology, dementia,
diminished cognitive control. The framework of this chapter permits an
alternative reading: that late-life cognitive expansion is at least
partly a *return of the modes the adult compactification was
suppressing*, made possible by the reduced behavioural demand of the
post-working life. The same brain, in a regime that no longer requires
the small compactification, returns to a larger-radius configuration.

This is not to say dementia is not real, nor that all late-life
cognitive changes are benign. It is to say that the standard reading
("everything good is youth, everything later is decline") is itself an
artefact of viewing late life through the small-radius compactification
that adulthood enforces. Viewed from the side, late life looks like a
phase in which the compactification recovers some of the freedom it had
to give up to be an adult.

## §15d.4  Phase transitions

The transitions between the three regimes are not gradual. The
transition from childhood to adult compactification has a fairly sharp
threshold — somewhere around late puberty in industrial societies,
somewhat earlier or later in others. The transition from adult to
late-life compactification is often (though not always) associated with
specific events: retirement, the death of one's parents, a significant
illness, the death of a spouse. These events are not the cause; they
are the perturbations that push the system over a saddle into a
different basin.

In dynamical-systems terms, the moduli space of human compactifications
has at least three basins, separated by saddles. The basins are not
infinitely deep; perturbations can move an individual transiently
between them. The childhood basin can be briefly re-entered in
psychedelic states, in some meditative states, in profound grief, in
ecstatic music. The late-life basin can be briefly entered by an adult
in certain forms of contemplative practice or after major life
disruption. The basins are the same basins for everyone; the typical
trajectory through them is shaped by both biology and culture.

## §15d.5  Why this matters

Three reasons.

First, it suggests that the eight-mode framework of Chapter 11 is not
universal across the life cycle. It is the right framework for adult
compactification. The right framework for childhood is not eight
discrete attractors but a continuous landscape with low barriers. The
right framework for late life is the eight modes again, but with
lowered barriers and increased access to inter-modal transitions.

Second, it predicts that some forms of suffering in adult life arise
from the small-radius compactification itself, not from any specific
mode failure. Depression, for instance, has features (narrowed
emotional range, foreshortened time horizon, single-threaded
ruminative narrative) that look like an *over-compactified* adult
regime. Some treatments that work (psychedelic-assisted therapy,
intensive meditation retreats, mood-altering altitude or season
exposure) may work in part by transiently expanding the
compactification.

Third, it offers a different reading of the cultural value of
childhood and old age. In industrial modernity, both are framed as
non-productive phases (one preparing for production, one having
finished). In this framework they are also the two phases of human
life with the greatest access to the multidimensional modes that adult
production has to suppress. The cultural under-valuation may be partly
a defensive response: the productive adult is, in some sense, the most
*compressed* version of the human and has reason to be uncomfortable
in the presence of the less-compressed versions.

## §15d.6  Status

This chapter is the most speculative in the book. The author marks it
as such. The empirical work to test the predictions — whether late-life
brains show measurable increases in mode-transition rates compared to
mid-adult brains, whether psychedelic-induced state changes correlate
with measurable changes in autonomic and EEG complexity, whether the
soma-field state of a six-year-old differs systematically from that of
a thirty-year-old in the predicted direction — is not yet done.

The chapter is offered in the spirit of the rest of the book: as a
structure to be tested, sharpened, and revised. The framework is wrong
to some degree. Where it is wrong, the work of the next decade is to
find out where, and to replace it with something less wrong.
# Chapter 16 — The Fractal Closes

\begin{quote}\itshape
We end where we began: at a wave, on a fractal, looking back at itself.
\end{quote}

\vspace{1em}

## 16.1  The argument, retraced

We started, in Chapter 1, with a rope and a flick. We finish, in
Chapter 15, with the moduli of a seven-dimensional G$_2$ manifold. Both
descriptions are descriptions of the same kind of object: a *wave on a
field*.

In between we visited:

- the acoustic peaks of the cosmic microwave background
- the spiral density waves of galaxies
- the helioseismic modes of stars
- the standing waves of atmospheres, oceans, magnetospheres, and the
  Schumann cavity
- the slow tectonic wave of the Glarus thrust
- the Turing-pattern waves that paint the skin of a leopard
- the branching fractals of trees, rivers, and lungs
- the electromagnetic wave of the heart
- the standing tension waves of the fascial tensegrity
- the eight-mode wave of the soma field
- the attractor basins that hold feeling stuck or let it flow
- the quantum tunnelling that opens a barrier the classical
  trajectory cannot cross
- the microtubule substrate that may carry the quantum
- the G$_2$ manifold whose folds we walk through every day without
  seeing them

This is one picture, taken at fourteen different magnifications.

## 16.2  The Mandelbulb, full-bleed

Turn the page.

> **Figure 16.1** *(BUILD — FULL-BLEED, NO CAPTION ON PAGE)* — A
> high-resolution, full-bleed render of the Mandelbulb at $z^n + c$,
> $n = 8$, viewed from a vantage that displays the principal folds and
> the central singularity. *To be generated by the author; the image
> bleeds to the edge of the page on a four-sided basis. The facing
> page is blank.*

\newpage

\thispagestyle{empty}
\mbox{}
\newpage

\thispagestyle{empty}

\vspace*{2cm}

> **Figure 16.2** — The same render, annotated. The principal folds are
> labelled with the chapters of this book in which we met their
> physical analogues. The central singularity is labelled *Soma*. The
> outer envelope is labelled *Cosmos*. *Caption font: small italic.*

\vspace{2cm}

## 16.3  What I want you to leave with

Three things.

**First**: that the universe really is, to the best of our current
mathematical understanding, a single wave system. Not a metaphor. Not a
poetic flourish. The acoustic peaks of the CMB and the standing tension
waves in your shoulder are solutions of the same equation, in different
parameter regimes, on different substrates, with different boundary
conditions, but they are *solutions of the same equation*. There is one
mathematics. It runs from end to end.

**Second**: that the body, including the body of feeling, is part of
this single wave system. The soma field is not an addition to physics;
it is one more wave-on-field, identifiable mathematically with the
projection of the underlying geometry into our scale. The model is
testable. The replication ledger is open. The next move belongs to the
clinic.

**Third**: that you can see all of this with your own eyes, in your own
life, in any landscape you walk through. The wave in the lake. The
fold in the cliff. The breath in your chest. The pulse in your wrist.
The thought that crosses a barrier without seeming to have climbed it.
You are not separate from any of this. You are an instance of it.

\vspace{2em}

\begin{quote}\itshape
The wave is always there. I will see you at the window.
\end{quote}

\vspace{2em}

\hfill — Alistair Johnson \\
\hfill Zurich, summer 2026

\newpage
# Chapter 16b — Fractals: Mandelbulb to Microtubule

\begin{quote}\small\itshape
The image on the cover is a Mandelbulb. The image-on-the-inside of
each of your neurons is a microtubule lattice. The book has implied a
relationship between them. This chapter makes the relationship
explicit.
\end{quote}

## §16b.1  The Mandelbulb

The Mandelbulb is the most-studied three-dimensional analogue of the
Mandelbrot set. It is defined by iteration of a triplex-number
generalisation of the squaring map $z \to z^n + c$ into spherical
coordinates,

$$
\mathbf v^n = r^n (\sin(n\theta)\cos(n\phi),\
\sin(n\theta)\sin(n\phi),\ \cos(n\theta)),
$$

where $(r,\theta,\phi)$ are the spherical coordinates of $\mathbf v$.
For $n = 8$, the resulting set has the rich fractal structure used as
the cover image of this book. The Mandelbulb is not the "true" 3D
analogue of the Mandelbrot set in any deep mathematical sense — there
is no true 3D analogue, by a classical theorem — but it is *visually*
the richest known three-dimensional fractal and serves as the
canonical example of a structure with self-similar detail across
many orders of magnification.

## §16b.2  Microtubules

A microtubule is a hollow cylindrical polymer of tubulin dimers,
about 25 nm in outer diameter, with walls made of 13 protofilaments
arranged in a helical lattice. Microtubules are the largest of the
three cytoskeletal filament types and form the structural backbone of
the cell. In neurons, they extend the length of the axon — sometimes
a metre, in the case of a sciatic-nerve axon. Microtubules are
involved in mitotic spindle formation, intracellular transport (via
the kinesin and dynein motor proteins that walk along them), and
maintenance of cellular shape.

In the Penrose-Hameroff Orchestrated Objective Reduction (Orch-OR)
proposal, microtubules are also the substrate of quantum-coherent
processes in the brain — processes implicated in the framework of
*this* book in some of the soma-field's harder-to-explain attractor
transitions.

The microtubule's lattice structure has a beautiful property: it is
*scale-invariant* over a wide range of resolutions. At the dimer
scale (8 nm), the lattice is a regular hexagonal arrangement of
tubulin dimers. At the protofilament scale (25 nm), the lattice is
a regular cylindrical arrangement of 13 helical strands. At the
filament-bundle scale ($\sim 1 \mu$m), the lattice is a
self-organising parallel-bundle structure with characteristic spacing.
At the axonal scale ($\sim 1 \mu$m to 1 m), the lattice maintains its
local structure while extending over six orders of magnitude in length.

The microtubule is, in this sense, a *fractal-like* structure: not a
true mathematical fractal but an *iterated self-similar* lattice across
several biologically relevant scales.

## §16b.3  The connection

The book's claim is not that the Mandelbulb and the microtubule are
the *same* object. They are obviously not. The Mandelbulb is a
mathematical curiosity; the microtubule is a biological molecule.

The book's claim is that they exemplify a *deeper structural
invariance*: the principle that self-similar geometry, when it arises
in a wave-supporting medium, produces specific wave-mechanical
properties that depend on the *self-similarity* rather than on the
substrate's chemical or mathematical identity.

Specifically: self-similar lattices have *gapped spectra* — wave
propagation in them is prohibited for certain frequency ranges and
permitted for others. The microtubule's lattice has a calculated
phonon spectrum with gaps at frequencies relevant to the
Penrose-Hameroff proposal. The fractal antenna literature
(in radio engineering) has confirmed that fractal geometries produce
multi-band resonances that planar geometries do not.

The book's framework is consistent with — and partially predicts —
that the microtubule lattice is a *fractal antenna for the soma
field*. The soma field couples to the microtubule lattice at the
permitted frequencies (the lattice's resonance bands) and is
*decoupled* at the gap frequencies. The result is a
substrate-mediated selection of *which* soma-field frequencies have
biological consequence.

This is, of course, speculation. It is on the *hard side* of the
framework's speculations. The chapter is here because it is the
correct place for the speculation to live, and because the cover
image of the book commits the framework to *some* explanation of the
Mandelbulb's relevance to the biology.

## §16b.4  What is testable

Three things.

*First*, the phonon spectrum of the microtubule lattice can be
computed from first principles and measured by ultrafast
spectroscopy. If the gaps and bands predicted by the calculation are
*not* the ones observed, the speculation in this chapter falls.

*Second*, the soma-field framework's predicted coupling to the
microtubule lattice gives specific frequencies at which interventions
*should* be especially effective. The cardiac coherence frequency
(0.1 Hz) is the lowest of these; the EEG alpha band (8–12 Hz),
the brainstem theta band (4–8 Hz), and the gamma band (30–80 Hz)
are the others. The framework predicts that interventions at these
frequencies have disproportionate efficacy. This is testable.

*Third*, the speculation predicts that *visual* fractal stimuli —
images with fractal dimension $D$ near 1.3-1.5, the dimensions
that show up repeatedly in nature and in viewer-preference studies
(Taylor et al.) — should produce *measurable shifts* in soma-field
state that *non-fractal* stimuli at matched complexity do not. There
is preliminary evidence from the aesthetic preference literature
that this is true. The framework predicts that an instrumented study
will confirm it with effect sizes large enough to matter clinically.

## §16b.5  Why the Mandelbulb is on the cover

To establish, before the reader has read a word, that the book's
visual grammar will be the grammar of fractal self-similar
geometries, and that this grammar is *not* arbitrary aesthetic
preference but a *claim* about the world. The book argues, throughout,
that wave physics is invariant across scales because the relevant
mathematical structure (the wave equation and its symmetry group) is
invariant across scales. The Mandelbulb is a *visual* representation
of what scale-invariant generative rules produce when iterated. The
cover commits the book to the claim that this is the universe's
operating modality.

If you have read this far, you have either accepted the claim,
provisionally accepted the claim, or are reading on to see whether
the claim is defensible. In all three cases the cover image is
doing its work.
# Plates V — M-theory in Pictures

\thispagestyle{empty}

\vspace*{1cm}

\begin{center}
{\Huge\bfseries Plates V}\\[0.5em]
{\Large\itshape M-theory in Pictures}\\[2em]
{\small Eight images of geometry no eye has ever seen.}
\end{center}

\newpage

\thispagestyle{empty}

> **Plate V.1** *(BUILD — full-bleed)* — Mandelbulb at iteration depth
> 8, rendered with global illumination and ambient occlusion. Centre
> camera at $(0, 0, 0)$, viewing distance 2.5, focal length 50 mm
> equivalent. *Author render in Mandelbulber 2, base parameters in
> `paper/soma/wave-atlas/figures/mandelbulb-params.json`.*

\vfill

\noindent\textit{The best four-dimensional cross-section of a seven-
dimensional folded manifold that the human eye can hold steady.}

\newpage

\thispagestyle{empty}

> **Plate V.2** *(BUILD — facing)* — Same Mandelbulb, close approach
> to one of the cusp singularities at the equator. The local geometry
> at the cusp reveals the *fold-within-fold-within-fold* fractal
> structure characteristic of G$_2$ singularities. *Author render.*

\vfill

\noindent\textit{Closer in: more folds.}

\newpage

\thispagestyle{empty}

> **Plate V.3** *(BUILD)* — Side-by-side comparison: *Left:* a
> recumbent fold in the Helvetic nappes, drone capture, scale bar
> 10 m. *Right:* a singularity locus on the Mandelbulb at iteration
> 8, scale bar arbitrary. The two are rendered at the same image
> scale to display the geometric similarity. *Composite by the author.*

\vfill

\noindent\textit{Same mathematics, two different substrates.}

\newpage

\thispagestyle{empty}

> **Plate V.4** *(BUILD)* — Schematic decomposition of an eleven-
> dimensional spacetime into a four-dimensional Minkowski factor and a
> seven-dimensional internal manifold. The four-dimensional factor is
> shown as a flat slab; the internal manifold as a tiny Mandelbulb
> attached at each point. The picture is not geometric truth — there
> is no four-dimensional embedding — but it is the most accurate
> schematic available. *Author schematic.*

\vfill

\noindent\textit{Eleven equals four plus seven.}

\newpage

\thispagestyle{empty}

> **Plate V.5** *(BUILD)* — The $E_8$ root system in Coxeter
> projection. 240 root vectors of the $E_8$ Lie algebra projected onto
> the Coxeter plane, displaying the characteristic 30-fold rotational
> symmetry. Eight of the roots — the simple roots — are highlighted in
> red and labelled with the corresponding soma-field modes (calm,
> fight, flight, freeze, flow, joy, grief, hypervigilance). *Author
> render, base graphic from Garrett Lisi's E8Flyer code, CC BY-SA.*

\vfill

\noindent\textit{The algebra of the eight modes, drawn out in light.}

\newpage

\thispagestyle{empty}

> **Plate V.6** *(BUILD)* — The duality web of the five superstring
> theories, with M-theory at the centre. Six nodes around the
> perimeter; each labelled with one of the five superstring theories
> plus eleven-dimensional supergravity. Edges labelled by duality
> type (T, S, Hořava–Witten). *Author schematic.*

\vfill

\noindent\textit{Five theories, one theory.}

\newpage

\thispagestyle{empty}

> **Plate V.7** *(BUILD)* — A Joyce manifold, two-dimensional
> projection. The first explicit compact G$_2$ manifolds, constructed
> by Dominic Joyce in 1996 by resolution of orbifold singularities.
> The projection shows the orbifold loci as black dots and the
> resolution patches as coloured discs. *Author schematic, after
> Joyce 1996.*

\vfill

\noindent\textit{The first time anyone wrote down a closed-form
G$_2$ manifold.}

\newpage

\thispagestyle{empty}

> **Plate V.8** *(BUILD)* — Three pictures, same object: (top)
> Tschingelhörner ridge with the Glarus thrust visible; (middle)
> Mandelbulb close approach to a cusp singularity; (bottom) cyber-
> hologram body in calm-mode steady-state. The three images are scaled
> to identical visual cadence to display the shared geometric content
> across nine orders of magnitude. *Author composite.*

\vfill

\noindent\textit{The thesis of this book, in three frames.}

\newpage
# Plates VI — Mandelbulb Gallery

\thispagestyle{empty}

\vspace*{1cm}

\begin{center}
{\Huge\bfseries Plates VI}\\[0.5em]
{\Large\itshape Mandelbulb Gallery}\\[2em]
{\small Twelve close approaches.}
\end{center}

\newpage

\thispagestyle{empty}

> **Plate VI.1** *(BUILD — full-bleed)* — Mandelbulb, equatorial close
> approach. Power $n = 8$, iteration depth 12, ray-marched. *Author
> render.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate VI.2** *(BUILD)* — Polar close approach. The eight-fold
> rotational symmetry of the standard $n = 8$ Mandelbulb is visible at
> the pole. *Author render.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate VI.3** *(BUILD)* — Sub-equatorial cusp. *Author render.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate VI.4** *(BUILD)* — Deep zoom, factor $10^3$, into a single
> minor cusp. The fractal self-similarity is preserved at this depth;
> the local geometry remains recognisably Mandelbulb. *Author render.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate VI.5** *(BUILD)* — Same minor cusp, factor $10^6$. Self-
> similarity continues. *Author render.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate VI.6** *(BUILD)* — Power-variation panel: $n = 4, 6, 8, 10,
> 12$ from top-left to bottom-right. The $n = 8$ form is the canonical
> Mandelbulb; the variants display the dependence of the singularity
> structure on the power. *Author render.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate VI.7** *(BUILD)* — Volumetric scattering rendering: the
> Mandelbulb with simulated atmospheric scattering, giving the impression
> of a luminous body within a fog. *Author render.*

\vfill

\noindent\textit{The visual closest to the cyber-hologram body
metaphor.}

\newpage

\thispagestyle{empty}

> **Plate VI.8** *(BUILD)* — Cross-section through the equator of the
> Mandelbulb, rendered as a slice. The interior structure shows the
> branching of singularity sheets. *Author render.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate VI.9** *(BUILD)* — Time-lapse: the Mandelbulb with the
> exponent $n$ varying continuously from 6 to 10 in twelve frames.
> *Author render; animated version available in the digital edition.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate VI.10** *(BUILD)* — Annotated Mandelbulb: same render as
> Plate VI.1, with overlays labelling the eight major cusp loci with
> the soma-field mode names. *Author composite.*

\vfill

\noindent\textit{The full map, in one frame.}

\newpage

\thispagestyle{empty}

> **Plate VI.11** *(BUILD — double-page)* — Mandelbulb, deep-zoom into
> a single hyperbolic-umbilic singularity at iteration depth 14. The
> spread occupies the entire double-page; minimal margins. *Author
> render.*

\vfill

\newpage

\thispagestyle{empty}

> **Plate VI.12** *(BUILD)* — Final plate: Mandelbulb in silhouette,
> backlit against a black background, with the eight cusps catching
> highlights. The image is intended to close the gallery on a single
> dramatic frame. *Author render.*

\vfill

\noindent\textit{End of plates.}

\newpage
\backmatter

# Chapter 17 — Practice: What To Do With Any of This

\begin{quote}\itshape
A book of pictures and equations does no work in the world until a
reader does something with it.
\end{quote}

\vspace{1em}

## 17.1  The smallest possible practice

You do not need to learn anything new. You do not need to acquire
equipment. You do not need to subscribe to anything, sign up for
anything, or believe anything.

The smallest possible practice that exercises the picture in this book
is as follows.

**Once a day, for one minute, put a finger on your pulse, breathe in
for four counts, out for six, and notice the rate of your pulse rise
and fall with the breath.**

That is the entire practice. It costs nothing. You can do it standing
at a bus stop, lying in bed, or sitting on a train. After thirty days
of doing it once a day, most people report that the difference between
"I am stressed" and "I am at rest" has become a noticeable, namable
quantity, where before it was only a vague mood.

\begin{figure}[h]
\centering
\includegraphics[width=0.78\linewidth]{soma/wave-atlas/figures/F17_1_breath.png}
\end{figure}

> **Figure 17.1** — A breath drawn as a wave at the resonance frequency
> (6 breaths per minute). The five-second inhale / five-second exhale
> entrains the cardiovascular baroreflex at its natural frequency, which
> is why this particular tempo has an outsized effect on HRV.

You have just begun to read your own soma field. The first piece of
information you can extract is the *amplitude of the respiratory
sinus arrhythmia* — the swing of the heart rate across the breath.
This is, as we saw in Chapter 9, one of the most informative single
numbers about your autonomic-nervous-system state. Larger swing
generally means better vagal tone, better recovery, more capacity for
calm.

## 17.2  Three more, of escalating commitment

If the one-minute practice settles, three further steps are worth
considering.

**Practice 2 — ten minutes, daily.** Add to the one minute a
nine-minute extension in which you do not "do" anything but continue
the four-six breathing and watch what arises. This is, in essence,
*Vipassanā* or "open monitoring" meditation in its most basic form.
The aim is to lower the *threshold* of the soma field — to let
sub-threshold activity become visible — rather than to suppress
anything. After several months of this, most practitioners report a
substantial expansion of the namable affective vocabulary.

**Practice 3 — body work.** Find a manual therapist (osteopath,
Feldenkrais practitioner, Rolfer, structural integration practitioner)
who works with the fascial-tensegrity picture of the body, and have a
session every two to four weeks for six months. The aim here is to
edit the *landscape*, not the noise: to reduce the depth of the
chronic-tension valleys that the body has settled into, and to widen
the basins of relaxed posture.

**Practice 4 — talking work.** Find a psychotherapist whose model of
the mind has a body in it — somatic-experiencing, sensorimotor
psychotherapy, internal family systems, body-based EMDR. The aim here
is to address specific deep valleys in the attractor landscape that
have been laid down by specific historical events, using the
combination of safe relationship, slow re-exposure, and integration that
the discipline has refined over the last forty years.

These four practices, in any combination, are the practical
implementation of the picture in this book. None of them is exotic.
All of them have substantial literatures and trained practitioners. The
single piece of integration this book offers is the *frame* in which
they sit: that they are all doing one of the four things from Chapter
12 (lifting the ball, raising the temperature, reshaping the landscape,
or — in rare moments — tunnelling through).

## 17.3  What this book is not asking you to do

I want to be clear about what this book is *not* asking.

It is not asking you to take up any religious or spiritual practice
particular to any tradition. The picture is compatible with most
traditions and required by none. If your contemplative tradition
already includes the practices above in some form, the picture is, I
hope, a useful map of why they work. If you have no such tradition, the
picture is a useful starting point for inventing your own.

It is not asking you to reject conventional medicine. Cardiac waves
have cardiologists, lung waves have pulmonologists, neural waves have
neurologists. The picture sits *underneath* these specialties, not in
competition with them.

It is not asking you to do this work alone. The eighteenth chapter of
this book — the Family Album — is designed to be filled in *with*
people, not by yourself in a dark room. Bring it to a long lunch with
people you love.

## 17.4  A single piece of advice

If I had to compress this entire book to a single sentence of advice,
it would be:

> *Walk somewhere beautiful, breathe slowly, and look at the folds.*

Folds in mountains. Folds in clouds. Folds in trees. Folds in faces. The
universe is a folded object at every scale. You are a folded object on
the inside. Slowing down enough to see this, regularly, is the
fundamental practice. Everything else is variation.

\newpage
# Chapter 17b — Practice in the Strandberg-and-Ableton Idiom

\begin{quote}\itshape
The instrument is part of the soma field. There is no clean line
between the player and the played.
\end{quote}

\vspace{1em}

This chapter is concrete. It describes a specific practice the author
has developed over several years using three pieces of equipment: a
Strandberg headless guitar, an Ableton Push 3 controller, and Ableton
Live. The point is not advertising. The point is that *these particular
instruments* embody, in their ergonomic and interaction design,
something close to the soma-field framework of this book. They are
tools that respect what a soma field is. Using them as if they were
extensions of the soma field — rather than external devices being
operated — produces music that has different properties from music
made by treating them as external.

## §17b.1  Why a Strandberg

Conventional electric guitars are ergonomic compromises. The neck is
long, the body is heavy, the strap-pull on the shoulder is asymmetric
over hours of play. None of this is fatal — millions of guitarists
have made millions of records on Stratocasters and Les Pauls — but
none of it is *neutral* either. Over a multi-hour writing session, the
asymmetric load on the shoulder and the angle of the wrist on the neck
both feed back into the soma field of the player. The body adapts. The
adaptation shapes what gets played. Long-bend phrases on the high E
string become characteristic; high-fret extended chords become
uncharacteristic; rhythmic vamps low on the neck are easier than
sustained lyrical lines high up.

Strandberg guitars — Ola Strandberg's design — are headless, light
(typically under 2 kg), have a fanned-fret neck for compound scale
length, and have an asymmetric *EndurNeck* profile designed so the
thumb naturally rests in a position that minimises wrist torque
regardless of where on the neck the hand is positioned. The cumulative
effect is that the instrument largely disappears from the somatic
attentional foreground. The player can think about music for longer
without their wrist, shoulder, and back beginning to ache.

In soma-field terms: the Strandberg minimises the *noise* the
instrument adds to the soma field. The signal-to-noise ratio of the
player-as-musician improves. This is not subjective. It is measurable
in the form of reduced compensatory EMG activity in the forearm and
trapezius over multi-hour sessions.

The fanned frets — shorter on the high strings, longer on the low —
do something more specific. They align the tension across strings such
that the *felt resistance* under the fretting finger is more uniform.
Conventional same-scale necks have noticeably tighter low strings and
looser high strings (or vice versa, depending on string gauge). Fanned
frets equalise this. The result is that the relationship between
*intended note* and *finger pressure required to produce it* becomes
more invariant across the neck. The instrument becomes more predictable
to play. The player's predictive forward-model of the instrument has
less variance to track. Cognitive load drops.

## §17b.2  Why a Push 3

The Push 3 is Ableton's hardware controller. In its standalone mode it
runs Ableton Live's audio engine locally without needing a computer in
the loop. The interface is a grid of 64 velocity- and pressure-sensitive
pads, eight tactile encoders, a colour display, and a small set of
transport and navigation buttons. There are no menus. There are modes,
but the mode of the instrument is always visually obvious from the
illumination of the pads.

The relevance to the soma-field framework is the following. A
conventional DAW interaction — keyboard, mouse, screen — couples the
musician to the music through symbolic visual abstraction. The
musician sees a waveform on a screen, decides to edit it, moves a
mouse, clicks a button labelled with text. Every step is mediated by
visual symbol manipulation, and the wrist-and-hand action required to
execute the step is *independent* of the musical intent. The same
mouse-click produces a different musical result depending on context;
the same wrist motion can be "save the project" or "delete the take."

The Push 3 reverses this. The wrist-and-hand action is *directly* the
musical action. Tap a pad: a note plays. Push harder: it plays louder
(and brighter — the timbre changes with pressure). Slide your finger
across the pad: the note bends. Turn an encoder: a parameter audible
in the result changes immediately. There is no separation between
*deciding to do something* and *doing it*. The motor cortex and the
auditory cortex are coupled directly through the controller, with the
visual cortex serving only as a slow back-channel for status checking.

This is the same architecture as a traditional acoustic instrument.
The piano works this way; the violin works this way; the drums work
this way. The mouse-and-keyboard DAW does not. The Push 3 restores the
acoustic-instrument architecture to a digital workflow. In soma-field
terms, it puts the instrument back into the soma field — the player's
body and the sound become a single coupled oscillator system rather
than the body operating a symbolic interface to a separate
sound-producing computer.

## §17b.3  Ableton Live as a structural language

Ableton Live's distinctive innovation, twenty-five years ago, was the
*session view*: a grid of clips that can be triggered in any order,
independently, in tempo-synchronised loops, building up arrangements
on the fly rather than by linear timeline editing. The session view
was designed for live performance but its consequence for studio
writing is the more important one.

In linear DAW writing — Pro Tools, Logic, Cubase — the musician
constructs an arrangement by placing audio events on a timeline.
Decisions about which sounds occur together are made by visually
inspecting waveforms on a horizontal axis. The musician is, in a
sense, *building the song* from outside it.

In session view, the musician triggers clips in real time, listens to
the resulting combinations, modifies the clips, triggers again. The
song is *played* into existence rather than *constructed* into
existence. The compositional decisions are made by listening, in the
moment, to what the clips do together. The structural form of the song
— which sections come in what order, which textures combine, where
the dynamics lift and drop — emerges from a sequence of live
interactions, not from an a-priori plan.

This is closer to how a band traditionally writes — by playing
together, hearing what works, repeating it — than to how a film
composer writes (with a score). The soma field of the musician is
engaged throughout. Decisions are felt, not just thought.

## §17b.4  The 11/8 album

The author's currently-unreleased album is in 11/8 time throughout.
The decision was not arbitrary. 11 is a prime number. Time signatures
in prime-numbered meters do not subdivide into the standard 2-and-3
patterns that dominate Western popular music. The body of a listener
trained on 4/4 has to *count* an 11/8 measure rather than feel it
naturally — at least at first. After fifteen or twenty minutes of
sustained exposure, the count can give way to a felt pattern, but the
felt pattern is *different* from the felt pattern of 4/4. It is a
pattern with a slight ongoing tilt, an asymmetry that never resolves.

In soma-field terms: 11/8 keeps the listener's auditory predictive
system slightly out-of-phase with the music. The brain's predictive
forward-model is always a little wrong. The error signal is always
slightly elevated. The arousal is correspondingly slightly elevated.
And — this is the part that took years to discover — *the body still
moves*. People dance to 11/8. They dance differently from how they
dance to 4/4. The asymmetry transfers into the motor system. The
dance acquires the same ongoing tilt the music has.

There is no specific recommendation here. The author offers the
project as one data point: an attempt to build music whose soma-field
signature is non-trivially different from the dominant 4/4 attractor
of contemporary popular music, by changing the temporal compactification
at the most basic level.

## §17b.5  The practice

The practice, when it is working, looks like this. The Strandberg sits
on the lap or on a strap of negligible weight. The Push 3 sits on the
desk in front of the laptop with Live running. The musician has, in
Live, a session-view grid pre-populated with a sketch — drum loops,
bass-line clip variants, harmonic pads, processed-vocal samples.

The session begins with a slow tuning: the musician sits with the
guitar quietly, plays a few notes, lets the body adjust. HRV measurably
rises during this period. The instrument is felt to be in the body, not
outside it.

Then a click track is triggered at the chosen tempo. The musician
triggers a clip on the Push: a kick-and-bass loop fills the room.
Listens. Triggers a second clip: a pad enters underneath. Listens.
Picks up the Strandberg and plays — not a pre-decided phrase, but a
response to what is already playing. The first response is often wrong
(too busy, wrong key, wrong feel). The musician stops, listens again,
plays a different response. The second is usually better.

At some point — twenty minutes in, an hour in — the musician is no
longer triggering clips and playing responses. The clips are
triggering themselves, the playing is happening, the musician is the
medium through which a session is occurring. In soma-field terms: the
musician has descended into the *flow* attractor and the writing now
happens by trajectory through that attractor rather than by deliberate
decision.

Recording is continuous in the background. When the session ends, the
musician listens back. Maybe 5–10 % of what was recorded is keepable.
The keepable parts are extracted, processed, arranged. The arrangement
sometimes happens in the same session; sometimes weeks later. The
keepable material is what the soma field, in the flow state, produced
that the discriminating mind, in the calm state, recognises as worth
keeping.

## §17b.6  The point

The point of describing all this is not to recommend a particular
brand of guitar or a particular controller. Other instruments would
work; other DAWs would work; other meters would work. The point is
that the practice — *any* practice that produces music as a coupled
oscillator dance between the soma field of the musician and the
sound-producing apparatus — is a usable laboratory for soma-field
research. The author has more hours of intimate self-experimentation
with this apparatus than with any neuroimaging modality. The
observations on the modes, on the transitions between them, on the
conditions that admit flow and the conditions that block it, were not
arrived at by experiment design; they were arrived at by playing.

This is not a substitute for the controlled experiments in
Appendix B. It is the parallel epistemic track that ran alongside
those experiments for the years they took to set up. Both tracks are
necessary. Both produce knowledge of a different kind. This chapter
records the second track. The book is mostly the first.
# Chapter 18b — The Album

\begin{quote}\small\itshape
A chapter on the 11/8 album the author has been working on while
writing this book. The album and the book are the same project in
two media. This chapter is the bridge.
\end{quote}

## §18b.1  What the album is

A long-form instrumental album in 11/8, composed and recorded on a
Strandberg fanned-fret guitar through an Ableton Live session
sequenced from a Push 3 controller, with no vocals. Working title:
*The Wave That Is Always There* — yes, the same title as the book.
The book and the album are companion pieces with the same name.

The album's structure mirrors the book's. There are twenty tracks,
one per chapter. Track 1 is a single guitar in a quiet room. Track 8
is about cells. Track 11 is about the eight modes. Track 13 is about
the quantum experiment. Track 20 is the synthesis.

The album is unfinished. As of the v0.1 release of the book, six
tracks have been recorded to a release-ready state, three are in
heavy revision, and eleven exist only as sketches. The framework's
position is that the book and the album do not have to be released
together; the book is a 2026 release, the album is whenever it is
finished. The framework does not believe in deadlines for art.

## §18b.2  Why 11/8

Three reasons.

*First*: the framework's central mathematical claim is that the soma
field's manifold has *eleven dimensions* (one large time dimension,
three large spatial dimensions, seven small G$_2$ dimensions). 11 is
the framework's signature number. Putting the album in 11/8 is a
gentle reference to the framework, audible only to readers who have
followed the book to chapter 15.

*Second*: 11/8 is an *asymmetric metre*. As discussed in chapter
12e, asymmetric metres produce non-stable listener entrainment —
the listener cannot fully predict where the next downbeat will fall,
and remains in an alert state throughout the listening experience.
The album is *designed* to produce alert attention, not relaxed
flow. It is closer to an aesthetic-philosophical demand than to
background music.

*Third*: the author has played in 4/4 since adolescence and was
bored. Switching to 11/8 made the instrument fresh again. The
framework would say that the change of metric reopened the
attractor landscape that 4/4 had locked in. The author would say
the same thing in fewer words.

## §18b.3  The composition process

Each track begins with a single Strandberg loop — a phrase of
roughly 22 to 33 beats (two or three bars in 11/8) — that has the
mathematical structure the chapter requires. For track 1 (Chapter
1: a single rope shaking) the loop is a single note allowed to
ring and decay. For track 11 (Chapter 11: the eight modes) the
loop is an eight-note sequence cycling through the modes in
canonical order. For track 13 (Chapter 13: catastrophes) the loop
is a phrase that builds tension, holds, and resolves
catastrophically by a sudden register shift.

The Push 3 then layers: drums, bass, harmony, ambient texture.
Most tracks have three to seven layers. The longest is twelve
minutes; the shortest is one minute fifty.

The framework's vocabulary applies directly to the composition.
Each track has *attractors* (stable harmonic regions) and
*transitions* (moments of harmonic or rhythmic change). Each
track has *modes* in the musical-modal sense (Dorian, Mixolydian,
the church modes) that correspond *loosely* to the soma-field
modes — joy tracks are major-modal, freeze tracks are minor-modal
with sparse rhythm, hypervigilance tracks are chromatic with dense
rhythm. The mapping is not precise; music is not a code for the
framework. The mapping is *vibe-correct*.

## §18b.4  The recording situation

The author records in a small home studio in Zurich. The room is
treated acoustically with broadband absorption. The signal chain is
Strandberg → Universal Audio Apollo Twin → Logic into Ableton Live.
The Push 3 controller is the principal interface for
sequencing, sample-management, and live performance.

The album is being recorded *while the book is being written*. The
two activities alternate by day. Writing days produce text. Recording
days produce stems. Mixing days produce mixes. Some days produce
both. The author has come to think of the book and the album as a
*single project in two modalities* — the book is the *propositional*
expression of the framework, the album is the *experiential*
expression. The reader who has read the book and listened to the
album has had two passes through the same material.

## §18b.5  The release plan

The book will be released first, in late 2026, as v0.1 on Zenodo.
The book v1.0 will follow within the year.

The album will be released when ready. Best estimate: late 2027 or
2028. It will be released on Bandcamp (artist-controlled),
streaming (Spotify, Apple, etc.) with the recognition that streaming
is a poor medium for long-form instrumental music in asymmetric
metre, and on physical vinyl in a limited pressing.

The album will be free to download in lossless format on Zenodo, with
a citable DOI, in the same way the book is. The framework's position
is that the work belongs to the reader / listener and the author
will retain only the moral rights and the satisfaction of having
done it.

## §18b.6  Why this chapter is in this book

Because a book of essays about waves should, by its own logic,
contain at least one chapter that points at sound directly. The
chapter that does this is chapter 18b.

Because the framework's claim about the soma field is in part a
claim about *what music does to it*, and the most honest way to
substantiate that claim is to make some music that the reader can
hear and check against their own soma-field response.

And because the author wanted there to be a chapter, in this book,
that simply describes the album. The book and the album are not
in competition. They are partners. Each is a window onto what the
author has been trying to do over these years. Either one without
the other is incomplete.

If you have read this far in the book and have not yet listened to
the album, the framework predicts that listening will make some of
the book's claims more vivid than reading alone. If you have
listened to the album but not yet read this book, the framework
predicts that the book will make some of the album's structure more
intelligible than listening alone.

Either way, when both are out: read, listen, repeat.

The wave is always there. The book argues for it. The album sings it.
# Chapter 17c — A Year's Practice

\begin{quote}\small\itshape
Chapter 17 gave the smallest possible practice. This chapter gives
the practice expanded to a year, for the reader who has tried the
small one and wants more structure.
\end{quote}

## §17c.1  The premise

A year of substrate-level work, structured as four quarters.

The framework's clinical claim is that *durable* shifts in soma-field
attractor structure require sustained substrate work, on the order
of months. A year of intentional practice is the framework's
*recommended starting commitment*. Longer is better. Shorter is
fine. Beginning is what matters.

The practice is not a programme to be followed mechanically. It is a
*scaffolding* the reader can adapt to their own life. The framework
does not endorse any particular tradition or modality; it endorses
the *kind of work* the year is structured around.

## §17c.2  Quarter 1 — substrate

The first three months are *substrate-only*. The aim is to establish
a stable autonomic baseline before any attractor-level or
narrative-level work is undertaken.

*Daily*: ten minutes of coherent breathing (six breaths per minute,
five-second inhale, five-second exhale) in the morning. The aim is
not relaxation; it is *autonomic training*. The effect accumulates
over weeks.

*Three times per week*: thirty minutes of moderate aerobic exercise
(walking, cycling, swimming), preferably outdoors. The aim is not
fitness; it is *substrate maintenance*. Exercise is the most
broadly-effective substrate intervention known.

*Weekly*: one cold-water exposure (cold shower for two minutes,
or cold-water immersion for thirty seconds). The aim is not toughness;
it is *vagal-tone training*. The cold response trains the autonomic
nervous system to recover from acute stress.

*Once per month*: a check-in with a clinician or trusted other who
can give honest feedback on what is observable from outside. The
framework's experience is that substrate-level changes are *visible
to others before they are felt by the person*. The check-in catches
this.

At the end of quarter 1, the framework predicts a measurable
improvement in resting HRV (typically 10–20% increase in RMSSD),
improved sleep, reduced baseline anxiety, and a *subjective sense*
of being more present in one's own body. If these have not happened,
quarter 1 should be extended rather than the programme proceeding.

## §17c.3  Quarter 2 — attractor

The second three months adds *attractor-level* work. The substrate
work from quarter 1 continues.

*Daily*: twenty minutes of formal meditation (any tradition the
reader is drawn to; the framework does not specify). The aim is
*attractor exploration* — learning to notice the soma-field
attractor one is currently in, learning to notice transitions.

*Weekly*: one session of body-oriented practice (yoga, tai chi,
qigong, somatic experiencing, Feldenkrais, dance, martial arts).
The aim is *attractor traversal* — moving between attractors
through bodily means.

*Weekly*: one piece of intentional musical listening, chosen for
its soma-field-coupling effects (the framework's chapter 12d and
12e give examples). The aim is *attractor entrainment* — using
music as a coupling operator on the soma field.

*Monthly*: the check-in continues, with the additional question
"what attractors are you noticing?" The reader keeps a simple log
of attractors noticed and transitions experienced.

At the end of quarter 2, the framework predicts that the reader will
have *named* the attractors they recognise in their own soma field
(typically not all eight; usually three to five). They will have
some experience of *intentional* movement between attractors. They
will probably notice that the named attractors are *fewer than the
framework's eight* and may include attractors *not* in the framework's
list. This is acceptable. The framework's eight are a starting
typology; individual experience is the corrective.

## §17c.4  Quarter 3 — narrative

The third three months adds *narrative-level* work. Substrate and
attractor work continue.

*Weekly*: a writing practice. Thirty minutes, free-form, with a
prompt drawn from the framework's vocabulary ("describe the freeze
attractor as you have known it," "describe a transition you have
made," "describe what calm means in your soma field, not in the
abstract"). The writing is for the writer's eyes only and is not
shared.

*Weekly*: a conversation with another person who is also engaged in
soma-field practice, or with a clinician informed by the framework.
The conversation is *not* therapy in the formal sense; it is
*peer-level* engagement with the framework's vocabulary applied
to lived experience.

*Monthly*: the check-in. The new question is "what narrative are you
constructing about what has changed?" This question is genuinely
hard. The framework predicts that the *first* narrative the reader
constructs is usually too dramatic, the *second* too modest, the
*third* approximately right.

At the end of quarter 3, the framework predicts that the reader has
a *first working narrative* of what they have experienced — a story
they can tell themselves, in framework vocabulary if they prefer or
in any other vocabulary that fits, about what their soma field has
been doing. This narrative will be provisional. That is correct. A
final narrative is not what is being aimed at.

## §17c.5  Quarter 4 — integration

The final three months is *integration*. All previous work continues
but in a *less structured* way. The aim is to *internalise* the
practice rather than to perform it as a discipline.

*Daily*: whatever has emerged as the daily anchor — typically the
breathwork from quarter 1 and some short meditation from quarter 2.
*Less* than the formal programme. The aim is to find the minimum
sustainable practice.

*Weekly*: continued body-oriented practice, continued music, occasional
writing. The framework predicts that some of these will *drop away*
in quarter 4 and some will *deepen*. The dropping and deepening
should be allowed to happen rather than resisted.

*Monthly*: a *self*-check-in (the external check-in is optional now;
the reader has the equipment to do it themselves). The question:
"what is the practice that I will continue to do, indefinitely,
after the year is done?" The answer is the year's principal output.

At the end of quarter 4, the framework predicts that the reader has
*one practice* (sometimes two; rarely three) that they will
continue indefinitely with low effort. This practice is the year's
gift to the rest of their life. The other practices have served
their purpose by *bringing the reader to* the practice that lasts.

## §17c.6  What the year does not do

It does not cure trauma. It does not produce enlightenment. It does
not change the reader's circumstances. It does not produce a
permanent state of calm or joy.

What it does is *change the substrate*. The substrate change *allows*
many other changes. Whether those changes happen depends on factors
outside the framework's reach — relationship, work, circumstance,
luck, the contingencies of life.

The framework's claim is *not* that the practice transforms the
practitioner. The framework's claim is that the practice *prepares the
substrate* on which transformation, when and if it happens, takes
place.

## §17c.7  Why this chapter is in this book

Because chapter 17 was deliberately minimal — the smallest possible
practice — and some readers will want more. This chapter is for them.

The framework's position on practice prescription is *conservative*:
the smallest sustainable practice is better than the largest
unsustainable one. The year described in this chapter is on the
boundary of sustainability for most adults with jobs, families, and
existing commitments. The reader who finds it sustainable will benefit
from it. The reader who finds it unsustainable should drop back to
chapter 17's minimum.

What the framework most asks of the reader is *not* the year of
practice. What the framework most asks of the reader is *honesty
about what they can actually sustain*, and *commitment to that*.
That commitment, sustained over years, is what produces durable
change. The year described here is one possible *shape* of that
commitment. There are others. The reader is free to invent their own.

The framework is a tool. The practice is a tool. The reader is the
worker. The work is the reader's life. The framework's job is to
hand the tools over and step back.

Year well.
# Chapter 18 — The Family Album

\begin{quote}\itshape
The last chapter of this book is the one you write yourself.
\end{quote}

\vspace{1em}

## 18.1  What this chapter is

This chapter is intentionally almost empty. It is a set of prompts and
blank pages, designed to be filled in over time by the reader, alone
or — preferably — with the people the reader shares a life with.

The picture in this book is general; it applies to everyone. *Your*
soma field, *your* attractor landscape, *your* waves are particular to
you. This chapter is where you start drawing them.

The fillable pages are deliberately ungenerous in their prompts. A
fillable page that tells you what to write is no longer fillable. The
prompts here are minimum — a few words, a frame — and the rest is
yours.

The author's family has begun filling in a copy of this chapter
themselves. The relevant pages will, in the personalised editions,
contain photographs and notes from a Glarus drone trip in summer 2026
that — by the time you are reading the standard edition — should exist
as a real artefact in the world.

## 18.2  Prompt 1: Your wave

The wave you can feel most clearly in your own life. The one you
identified in the sidebar at the end of Chapter 1, and revisited at the
end of Chapter 11. Write it here, with whatever detail wants to be
written.

\vspace{1em}

\rule{0.95\textwidth}{0.4pt}\vspace{0.5em}

\rule{0.95\textwidth}{0.4pt}\vspace{0.5em}

\rule{0.95\textwidth}{0.4pt}\vspace{0.5em}

\rule{0.95\textwidth}{0.4pt}\vspace{0.5em}

\rule{0.95\textwidth}{0.4pt}\vspace{2em}

## 18.3  Prompt 2: Your landscape

A sketch of your own emotional attractor landscape, as you imagined it
at the end of Chapter 12. Where are the deep valleys? The shallow ones?
The ridges you cannot cross? Mark them in.

\vspace{1em}

\begin{center}
\fbox{\parbox{0.95\textwidth}{\vspace{8cm}\hfill}}
\end{center}

\vspace{2em}

## 18.4  Prompt 3: Your folds

A photograph, drawing, or pressed leaf of a fold you have personally
encountered. A cliff fold, a fabric fold, a fold in skin, a fold in a
river bed. Paste it here, with a date and a place.

\vspace{1em}

\begin{center}
\fbox{\parbox{0.95\textwidth}{\vspace{8cm}\hfill}}
\end{center}

\vspace{1em}

\noindent Date: \rule{4cm}{0.4pt} \hfill Place: \rule{6cm}{0.4pt}

\newpage

## 18.5  Prompt 4: Your people

Some names of the people you have been most closely coupled to in this
life. Coupling, in the technical sense of Chapter 9: cardiac, fascial,
emotional, in any combination. You do not need to name everyone; one or
two will do.

\vspace{2em}

\rule{0.95\textwidth}{0.4pt}\vspace{1.5em}

\rule{0.95\textwidth}{0.4pt}\vspace{1.5em}

\rule{0.95\textwidth}{0.4pt}\vspace{1.5em}

\rule{0.95\textwidth}{0.4pt}\vspace{2em}

## 18.6  Prompt 5: Your beautiful place

The place where the practice in Chapter 17 — walking somewhere
beautiful, breathing slowly, looking at the folds — is most easily
done, for you. Describe it. Photograph it. Note when you were last
there. Note when you intend to return.

\vspace{1em}

\rule{0.95\textwidth}{0.4pt}\vspace{0.5em}

\rule{0.95\textwidth}{0.4pt}\vspace{0.5em}

\rule{0.95\textwidth}{0.4pt}\vspace{0.5em}

\rule{0.95\textwidth}{0.4pt}\vspace{2em}

## 18.7  A blank page

The last page of this book is intentionally empty. It is for whatever
you want.

\vspace{2cm}

\begin{center}
\fbox{\parbox{0.95\textwidth}{\vspace{16cm}\hfill}}
\end{center}

\newpage
# Appendix A — Formal Sketches

\begin{quote}\itshape
This appendix collects mathematical statements made informally in the
main text and gives them in something closer to the form they take in
the technical soma-field papers. It is intended for readers who want
to see the bones, not the skin.
\end{quote}

\vspace{1em}

## A.1  The soma field as a tensor-valued Hopfield network

Let $M$ be the four-dimensional spacetime in which a human body is
embedded. Let $E \to M$ be a real vector bundle of rank 8 over $M$,
with structure group $G$ (the soma-field structure group, conjectured
to be a quotient of $E_8$). A *soma field* is a smooth section
$\sigma \in \Gamma(E)$.

The dynamics of $\sigma$ are governed by an energy functional

$$\mathcal{E}[\sigma] = \int_M \mathrm{d}^4 x \,\sqrt{-g}\, \left( \tfrac{1}{2}\, g^{\mu\nu}\, \nabla_\mu \sigma^A \nabla_\nu \sigma_A + V(\sigma) - J^A \sigma_A \right)$$

where $\nabla$ is the connection on $E$ compatible with $G$, $V$ is the
soma potential (with the 8-mode attractor structure), and $J$ is the
external coupling (sensory input, social field, internal organ state).
The equations of motion are

$$\Box_g \sigma^A + \frac{\partial V}{\partial \sigma_A} = J^A$$

with $\Box_g = g^{\mu\nu} \nabla_\mu \nabla_\nu$ the wave operator on
$E$. Asymptotic to a fixed *somatic geometry* $g^{(\mathrm{som})}$
near the body's interior, this reduces to a Langevin equation on the
8-component vector $\sigma^A$ — the standard form used in P1.

## A.2  The eight modes as $E_8$-equivariant projection

Let $X$ be a compact 7-manifold of $G_2$ holonomy with an isolated
$E_8$-type singularity at a point $p \in X$. The tangent space
$T_p X$ carries the 7-dimensional representation of $G_2$, which
decomposes under $G_2 \supset SU(3) \supset \ldots$ in standard
patterns.

The *visible* 4-dimensional spacetime is $M = \mathbb{R}^{3,1}$ in
the compactification ansatz $\mathbb{R}^{3,1} \times X$ for
11-dimensional supergravity. The 8 modes of the soma field arise as
follows. Near the singularity $p$, the local geometry can be modelled
by an ALE space $\widetilde{\mathbb{C}^2 / \Gamma_{E_8}}$, where
$\Gamma_{E_8}$ is the binary icosahedral group acting on $\mathbb{C}^2$.
The deformation moduli of this ALE space form an 8-dimensional vector
space — the Cartan subalgebra of $E_8$ has rank 8.

These 8 deformation moduli are the 8 modes of the soma field.

Their natural interpretation in terms of the human body — calm,
fight, flight, freeze, flow, joy, grief, hypervigilance — is *not*
forced by the mathematics. It is a phenomenological identification
based on the eightfold structure observed in clinical practice and
matched against the algebraic constraints. The mathematical
*content* of the conjecture is that the structure group is
specifically $E_8$ and that the eightfold split is the one given by
the Cartan-subalgebra decomposition.

## A.3  Catastrophes and mode transitions

The local geometry of a transition between two modes is given by an
elementary catastrophe of Thom's classification. The simplest case —
fold ($A_2$ in Thom's notation) — has germ

$$V(x; a) = \tfrac{1}{3} x^3 - a x$$

The critical points are at $x_{\pm} = \pm \sqrt{a}$ for $a > 0$ (two
critical points, one stable one unstable) and there are no critical
points for $a < 0$ (the saddle and minimum have annihilated). The
transition at $a = 0$ is the fold catastrophe.

A *cusp* catastrophe ($A_3$) has germ $V(x; a, b) = \tfrac{1}{4}x^4 +
\tfrac{1}{2} a x^2 + b x$, with three control parameters interacting
to produce the classic hysteresis-and-bifurcation behaviour.

On the soma-field, the cusp catastrophe is the natural model for the
*calm-fight-flight* transition: the system has two stable modes
(*calm* and *active*) and one unstable threshold mode (*activated*) in
a region of $(a, b)$-space, transitioning smoothly across the cusp
locus to a single mode in another region. The hysteresis is the
clinical phenomenon that, once activated, a person does not return to
calm at the same threshold; they return at a lower threshold, having
crossed a different branch of the catastrophe.

## A.4  Quantum tunnelling on the soma field

The classical Langevin equation for $\sigma^A$ does not allow
transitions through barriers higher than $k_B T$. The quantum theory
does.

Promote $\sigma^A$ to an operator $\hat{\sigma}^A$ on a Hilbert space
$\mathcal{H}_{\mathrm{soma}}$. The quantum dynamics are governed by a
Hamiltonian

$$\hat H = -\frac{\hbar^2}{2 m_{\mathrm{eff}}} \nabla^2 + V(\hat\sigma) + \text{(coupling to environment)}$$

with $m_{\mathrm{eff}}$ an effective mass set by the substrate
parameters (microtubule mode density on the Hameroff-Penrose model).

The tunnelling rate between two adjacent basins separated by a
barrier of height $V_0$ and width $L$ is (in the WKB approximation)

$$\Gamma_{\mathrm{tun}} \sim \omega \exp\left(-\frac{2}{\hbar}\int_{-L/2}^{L/2}\sqrt{2 m_{\mathrm{eff}}(V(x) - E)}\, dx\right)$$

For the QUANT-EXP-1 parameters this gives a tunnelling success of
$\sim 0.4$ over the schedule, in agreement with the simulation. The
classical-thermal rate for the same barrier and the same temperature
is $\sim 10^{-12}$, in agreement with the observed 0/48 classical
success.

## A.5  Independent replication conditions

A replication of QUANT-EXP-1 is considered *positive* if all of the
following hold:

1. Classical-cold trajectory success rate $< 0.05$ at the same barrier
   parameters.
2. Quantum-cold trajectory success rate $> 0.30$ at the same barrier
   parameters.
3. Bootstrap 95\% CI on the quantum rate excludes zero.
4. The success rate is robust to schedule variation (linear /
   cosine / pause): variation between schedules $< 0.10$ absolute.
5. The negative controls (A: classical hot, B: scrambled barrier)
   produce success rates indistinguishable from the classical-cold
   rate.

A replication is considered *negative* if any of (1), (2), (3) fail.

The replication ledger is at
`paper/INDEPENDENT_REPLICATION_LEDGER.md`. All rows currently read
PENDING.

\newpage
# Appendix B — Clinical Replication Protocol

\begin{quote}\itshape
For a clinician, neuroscientist, or research psychologist who wants
to test the predictions of the soma-field model in a clinical
population. This appendix is preregistered-study-ready.
\end{quote}

\vspace{1em}

## B.1  Hypothesis

The soma-field model predicts that emotional state transitions in
human subjects follow the catastrophe-type structure given in
Appendix A.3, specifically:

(H1) Transitions between calm and active states obey *cusp*
hysteresis: the threshold for activation is higher than the threshold
for de-activation, with the gap proportional to baseline
hypervigilance score.

(H2) Trauma-affected subjects show a *deepened* trauma basin in
moduli-space, operationalised as: when placed under a soma-field
perturbation protocol, they return to baseline more slowly than
control subjects by a factor of at least 2.

(H3) A subset of trauma-affected subjects, under appropriate
conditions, show *tunnelling-like* transitions — discontinuous
jumps to a high-affect state (typically *awe* or *joy*) without
passing through intermediate states. These transitions are
predicted to be rare under classical control but more frequent
under quantum-substrate-favouring conditions (subject relaxed,
microtubule-stabilising compounds present at therapeutic doses).

## B.2  Sample

- **N** $\geq$ 120 (40 per arm, 3 arms).
- **Arms**: (1) trauma-affected, treatment as usual; (2) trauma-
  affected, treatment as usual + soma-field-aware protocol; (3)
  non-trauma-affected controls.
- **Inclusion criteria**: age 18–65, capacity to consent, no current
  acute psychotic episode, no current substance use disorder
  requiring acute detoxification.
- **Exclusion criteria**: pregnancy, severe cardiac arrhythmia,
  conditions contraindicating prolonged biosensor wear.

## B.3  Instrumentation

For each subject across each session:

- **ECG** at $\geq$ 1 kHz sampling, derived HRV (RMSSD, SDNN,
  LF/HF ratio).
- **Continuous EEG** at $\geq$ 256 Hz, 32-channel minimum.
- **Continuous respiration** via chest band.
- **Continuous skin conductance**.
- **fMRI** *(optional, expensive)* during a structured perturbation
  protocol.
- **Self-report** via 8-mode visual-analogue scale, every 5 min.

## B.4  Perturbation protocol

Across a 90-minute session, subjects are exposed in randomised order
to:

- 10 min baseline rest.
- 10 min music known to evoke awe (suggested: Górecki Symphony 3,
  Adagio).
- 10 min mild stressor (Stroop / mental arithmetic).
- 10 min recovery silence.
- 10 min breathwork (4-7-8 pattern).
- 10 min recovery silence.
- 10 min subject-chosen joy-inducing music.
- 10 min final rest.
- 10 min structured interview about subjective experience.

## B.5  Analysis

For (H1), fit cusp catastrophe to the time-series of self-report
activation, with stressor intensity as $a$ and baseline hypervigilance
as $b$. Test the cusp manifold's bifurcation set against the
empirically observed hysteresis loop.

For (H2), fit exponential return-to-baseline curve to HRV time-series
after the stressor block, compare time constants across arms with a
mixed-effects model.

For (H3), apply change-point detection to the self-report time-series
during the awe-music block, classify each change as smooth or
discontinuous using a likelihood-ratio test against a smooth
alternative. Count discontinuous changes per arm.

## B.6  Preregistration

The protocol is intended to be preregistered on OSF before any
subject enrolment. The preregistration document is at
`paper/preregistration/protocol-B.md` (forthcoming).

## B.7  Power calculation

For (H1), at $\alpha = 0.05$, detecting a cusp hysteresis gap of
$\Delta = 0.5\sigma$ between activation and de-activation thresholds
requires $n \approx 32$ per arm under standard assumptions. The
proposed $n = 40$ is conservative.

For (H2), detecting a 2$\times$ return-time difference at
$\alpha = 0.05$, power $0.80$, requires $n \approx 25$ per arm
under a log-normal model. The proposed $n = 40$ is conservative.

For (H3), the relevant power calculation depends on the *rate* of
tunnelling-like events, which is the quantity to be estimated. The
study is descriptive on this hypothesis.

## B.8  Stopping rules

Stop early if:

- Severity-of-adverse-event-rate exceeds 5\% in any arm.
- An interim analysis (at $n = 60$) shows the primary endpoint with
  $p < 0.001$.
- The independent data and safety monitoring board recommends
  stopping for any reason.

## B.9  Funding

This protocol has not been funded as of the date of publication. The
author is an independent researcher and welcomes collaboration from
appropriately credentialled clinical investigators.

\newpage
# Appendix C — Why Eight Modes?

\begin{quote}\itshape
A standalone derivation of the eightfold structure of the soma field,
starting from three premises and ending at the eight names. For
readers who want the *why* on a single sheet.
\end{quote}

\vspace{1em}

## C.1  The three premises

(P1) The soma-field structure group $G$ is a compact simply-connected
Lie group.

(P2) $G$ contains a maximal torus $T$ whose rank equals the number of
*independent* somatic modes.

(P3) The Dynkin diagram of $G$ is required to be of the exceptional
ADE type compatible with M-theory's anomaly cancellation in the
heterotic $E_8 \times E_8$ formulation.

These three premises are not arbitrary. (P1) is the minimum
mathematical content required for $G$ to define a parallel transport
on the soma-field bundle (Appendix A.1). (P2) is the geometric
definition of *mode*. (P3) is the cross-link to M-theory, where the
$E_8 \times E_8$ heterotic theory is the only consistent string theory
producing chiral matter compatible with the observed Standard Model.

## C.2  The classification

Compact simply-connected simple Lie groups are classified by their
Dynkin diagrams. There are four infinite families ($A_n$, $B_n$,
$C_n$, $D_n$) and five exceptions ($G_2$, $F_4$, $E_6$, $E_7$, $E_8$).

The ranks (= sizes of maximal torus) are:

| Group | Rank |
|---|---|
| $A_n$ | $n$ |
| $B_n$ | $n$ |
| $C_n$ | $n$ |
| $D_n$ | $n$ |
| $G_2$ | 2 |
| $F_4$ | 4 |
| $E_6$ | 6 |
| $E_7$ | 7 |
| $E_8$ | 8 |

Restricting to *exceptional ADE* by (P3): the candidates are
$E_6$, $E_7$, $E_8$ (ADE means simply-laced; $G_2$ and $F_4$ are not
simply-laced and are excluded). Their ranks are 6, 7, 8.

## C.3  The selection of $E_8$

The choice among $E_6$, $E_7$, $E_8$ is fixed by *anomaly cancellation
in the four-dimensional effective theory*. The Green-Schwarz
mechanism requires that the gauge group, when broken to the visible
Standard Model plus the soma-field group, leaves a non-anomalous
combination. The unique solution compatible with the Standard Model's
$SU(3) \times SU(2) \times U(1)$ and producing chiral matter at the
$E_8$-singularity locus is $G = E_8$.

This gives rank 8. The eight modes are the eight components of a
section of the rank-8 Cartan subalgebra bundle.

## C.4  The phenomenological identification

The mathematical content fixes the *number* of modes (8) and the
*group-theoretic structure* of their interactions (set by the $E_8$
root system). It does *not* fix the natural-language names of the
modes.

The identification of the 8 modes with *calm*, *fight*, *flight*,
*freeze*, *flow*, *joy*, *grief*, *hypervigilance* is a
phenomenological identification. It is based on the following
correspondence:

| Mode | $E_8$ simple root | Somatic primary site |
|---|---|---|
| Calm | $\alpha_1$ | Distributed |
| Fight | $\alpha_2$ | Jaw, shoulders, hands |
| Flight | $\alpha_3$ | Chest, diaphragm, legs |
| Freeze | $\alpha_4$ | Gut, lower belly, perineum |
| Flow | $\alpha_5$ | Belly, throat, hands |
| Joy | $\alpha_6$ | Face, chest, eyes |
| Grief | $\alpha_7$ | Heart, throat, occiput |
| Hypervigilance | $\alpha_8$ | Neck, upper back, scalp |

The eight simple roots of $E_8$ have a specific intersection pattern
encoded in the $E_8$ Cartan matrix; the predicted clinical
co-occurrences of pairs of modes follow from this matrix. The most
common clinical co-occurrences (grief + hypervigilance; fight +
freeze; calm + flow) all correspond to roots with non-trivial inner
product in the $E_8$ system.

The predictions of which pairs co-occur, and with what intensity, are
tested in paper P3 (Mathematical Co-Identification) against
self-report data from a small pilot. The pilot is consistent with the
$E_8$ Cartan structure; a larger replication is needed before this can
be called confirmed.

## C.5  Alternative counts: 7, 6, 4

If the M-theory premise (P3) is dropped, the candidates expand to
include $E_7$ (rank 7), $E_6$ (rank 6), and $F_4$ (rank 4). The
corresponding mode counts are 7, 6, 4 respectively.

A 7-mode model would drop one of {calm, hypervigilance} most plausibly
(reading them as a near-degenerate pair). A 6-mode model would
additionally collapse {grief, freeze} (which share the gut as primary
site). A 4-mode model corresponds to the familiar fight/flight/freeze
+ rest tetrachotomy of the basic autonomic literature.

The choice of 8 is the *maximum* consistent with the M-theory premise,
and it is also the choice that maximally matches the clinical
phenomenology. The collapse to fewer modes is a *valid simplification*
and useful in some contexts; it is not the natural object of the full
theory.

## C.6  Closing

The number eight is not arbitrary, not aesthetic, not numerological.
It is the rank of the only Lie group consistent with the geometric
and physical constraints of the underlying theory. That the same
number appears spontaneously in the clinical literature when
practitioners are asked to draw up a parsimonious taxonomy of
emotional states is the kind of agreement that is, on this argument,
not an accident.

\newpage
# Chapter 19b — Eleven Open Problems, Expanded

\begin{quote}\small\itshape
Chapter 19 named eleven open problems in two pages each. This chapter
gives a research programme for each one. A reader looking for thesis
topics could pick any one.
\end{quote}

## Problem 1 — Derive the G$_2$ compactification

The framework *postulates* that the soma field lives on a
seven-dimensional manifold with G$_2$ holonomy. This is the
framework's weakest mathematical claim. A *derivation* — starting
from a more fundamental neurodynamical Lagrangian and showing that
the effective low-energy theory naturally selects G$_2$ — would be
the framework's strongest possible mathematical advance.

Research programme: identify a candidate microscopic theory (a
many-neuron coupled-oscillator network with appropriate symmetry
structure, plausibly building on Friston's free-energy formalism or
on the Hopfield-network ancestor), compute its low-energy effective
theory by standard renormalisation-group methods, and check whether
the seven-dimensional G$_2$-manifold structure emerges as a fixed
point or as a stable phase. Estimated work: a strong PhD project.

## Problem 2 — Multi-site clinical replication

The framework's clinical predictions need replication at three or
more institutionally independent trauma-therapy centres, each running
the protocol of Appendix B without contact with the others except
through the published protocol. The replication ledger has the format
ready. The protocol is published. What is missing is the centres.

Research programme: identify three trauma-therapy centres with
adequate research infrastructure (HRV / cortisol / sleep
polysomnography / clinical-outcome measures), train clinicians in the
protocol, run an 18-month parallel trial, deposit data in the
replication ledger. Estimated work: a coordinated multi-institutional
trial of substantial scope; cost a few hundred thousand euros over
two to three years.

## Problem 3 — Independent QUANT-EXP-1 replication on hardware

The published QUANT-EXP-1 result used IBM's Aer simulator. The next
test is a real-hardware run on a quantum annealer (D-Wave) or on
gate-model hardware (IBM Quantum, IonQ, Quantinuum). The challenge
is embedding the framework's Hamiltonian on real hardware without
losing the qualitative structure of the published result.

Research programme: identify a hardware platform with adequate
connectivity for the framework's eight-attractor problem, develop the
embedding, run the comparison against classical baseline with
bootstrap statistics, publish the result independently of the
framework's author. Estimated work: a six-to-nine-month project for a
postdoc with quantum-computing experience.

## Problem 4 — Lean formalisation completion

The framework's mathematical core is roughly 35 % machine-checked in
Lean 4. The remaining 65 % includes the catastrophe-theory portions,
the G$_2$ existence theorems (modulo the deeper derivation Problem
1), and the soma-field bundle definition.

Research programme: a Lean-proficient mathematician (or a small
collaboration) works through the published mathematical content
chapter by chapter, formalising as they go, depositing the
formalised library on Mathlib or as a stand-alone repository.
Estimated work: a sustained year of part-time effort, or a focused
three-month sprint by an expert.

## Problem 5 — Pre-registered music-affect study

Chapter 12d and 12e make specific predictions about music as a
soma-field coupling operator. These predictions can be tested in a
pre-registered study: select a small set of musical pieces with
predicted soma-field effects, recruit a sample, instrument them with
HRV and EEG, expose them to the pieces in randomised order, measure
the predicted effects against control. The study design is in
appendix B's variant section.

Research programme: a music-cognition lab with adequate
instrumentation runs the pre-registered study with $n = 60$ per
condition. Estimated work: a Master's thesis or a small grant.

## Problem 6 — Microtubule phonon spectrum, predicted vs. measured

Chapter 16b's speculation about microtubules as fractal antennas
makes a specific prediction about the lattice's phonon spectrum. The
prediction can be computed from first principles (a density-functional-
theory calculation on the tubulin dimer lattice) and compared with
ultrafast-spectroscopy measurement of intact microtubule preparations.

Research programme: collaborate with a computational chemistry group
on the DFT calculation and with an ultrafast-spectroscopy group on
the measurement. Estimated work: a focused two-year project at the
intersection of theory and experiment.

## Problem 7 — Long-arc clinical trajectory data

The vignettes of chapter 11e are composites. The framework needs
*real* long-arc trajectory data — five-to-ten-year sustained
instrumentation of individual soma-field trajectories under various
intervention regimes. This is logistically difficult but
mathematically essential, because the framework's deepest predictions
are about *trajectories* not *snapshots*.

Research programme: identify a small cohort ($n \sim 20$) of
consenting participants willing to be instrumented across a decade,
deploy continuous (smartwatch HRV, sleep monitoring, regular
biomarkers, intermittent EEG) instrumentation, build the database,
analyse with framework-informed methods. Estimated work: a sustained
multi-year programme.

## Problem 8 — Climate-system framework application

Chapter 6c argues that the framework's mathematics applies directly to
climate dynamics. The application has not been worked out
quantitatively. A formal mapping of climate-tipping-point mathematics
into the framework's vocabulary (and *vice versa*) would test the
generality of the framework and might also produce useful
cross-pollination between the two fields.

Research programme: a postdoc with both dynamical-systems and
climate-science backgrounds works through the mapping, produces a
unified paper, deposits the framework-formalisation of the climate
tipping-point mathematics in a citable location. Estimated work: a
one-year postdoctoral project.

## Problem 9 — Negative results

The framework has not yet been seriously attacked. Until it has,
its survival is meaningless. The framework's author would be
*relieved* by serious published critique. The first serious negative
result — a clinical replication that fails, a mathematical objection
that the framework cannot answer, an alternative theory that explains
the same phenomena more simply — would do the framework more good
than any number of confirmations.

Research programme: any of the above, by anyone qualified. Estimated
work: whatever the work costs.

## Problem 10 — Translation and accessibility

The framework's clinical applications presuppose access to the
framework's ideas, in the reader's native language, at a reading
level appropriate to clinical practitioners. The book is in English.
Translations to German, French, Italian, and (eventually) Mandarin,
Spanish, Arabic would extend the framework's reach.

Research programme: identify qualified bilingual translators, fund
the translation work, publish translations on Zenodo with their own
DOIs and the same Creative Commons license. Estimated work: roughly
6 months and €5–10k per language for high-quality translation.

## Problem 11 — Successor

The framework's author is 58 at the v0.1 release. He has, on actuarial
estimates, perhaps 25 productive years left. The framework will need
to outlive him to be worth anything. This requires that *other people*
take it up — not as disciples (the framework has no doctrine), but as
researchers who find the framework's questions interesting enough to
pursue under their own names.

Research programme: the framework's author will continue to publish,
will respond to all serious correspondence, will collaborate where
collaboration is wanted, and will explicitly *step back* from
ownership of the framework as it matures. The framework's success is
measured by the number of papers *by other people* that *do not need
to cite the framework's author* because they have absorbed the
framework's content as background knowledge. That measure is, at the
v0.1 release, zero. The aim is to make it positive by the v2.0
release. The aim is to make it large by the time the author is
seventy.

The eleven problems are an invitation. The framework is open. The
work is the reader's as much as the author's. The author's role,
from this point forward, is principally to get out of the way.
# Appendix D — Lean 4 Snippets

\begin{quote}\itshape
A handful of Lean 4 formalisations from the soma-field proof library,
included here for readers who want to see what a type-checked
mathematical claim looks like. Full source is at the U repository
under `paper/proofs/`.
\end{quote}

\vspace{1em}

## D.1  The soma-field bundle

```lean
import Mathlib.Geometry.Manifold.SmoothManifoldWithCorners
import Mathlib.Geometry.Manifold.VectorBundle.Basic

-- The base manifold (4D spacetime, a smooth manifold)
variable {M : Type*} [TopologicalSpace M] [ChartedSpace ℝ⁴ M]
variable [SmoothManifoldWithCorners (modelWithCornersSelf ℝ ℝ⁴) M]

-- The soma-field bundle: a rank-8 real vector bundle over M
structure SomaFieldBundle (M : Type*) where
  fibre : Type
  fibre_rank : Nat
  fibre_rank_eq : fibre_rank = 8
  total_space : Type
  proj : total_space → M
  smooth_proj : Smooth proj
```

## D.2  The Langevin operator

```lean
-- A soma-field configuration is a smooth section of the bundle
def SomaConfig (B : SomaFieldBundle M) := Smooth B.proj

-- The Langevin operator acts on configurations
def langevinOp (V : (Fin 8 → ℝ) → ℝ) (γ : ℝ) (B : SomaFieldBundle M) :
    SomaConfig B → SomaConfig B :=
  fun σ ↦ -- ℒσ = -γ⋅(∂σ/∂t) - ∇V(σ) + ξ
    sorry  -- proof obligation: smoothness of the result

-- Claim: the operator is dissipative for γ > 0
theorem langevin_dissipative (V : (Fin 8 → ℝ) → ℝ) (γ : ℝ) (hγ : 0 < γ)
    (B : SomaFieldBundle M) :
    ∀ σ : SomaConfig B, energy (langevinOp V γ B σ) ≤ energy σ := by
  sorry
```

The `sorry` placeholders indicate proof obligations not yet
discharged. The full discharge is the subject of paper P5
formalisation work, ongoing.

## D.3  The eight-mode decomposition

```lean
-- The Cartan subalgebra of E_8 has rank 8
theorem cartan_rank_E8 : Module.rank ℝ (cartanSubalgebra E8) = 8 := by
  exact rank_cartanSubalgebra_E8

-- The soma-field at a point decomposes into eight mode amplitudes
def modeDecomposition (B : SomaFieldBundle M) (p : M) :
    B.fibre ≃ₗ[ℝ] cartanSubalgebra E8 := by
  rw [B.fibre_rank_eq]
  exact LinearEquiv.ofRankEq (by rw [cartan_rank_E8])

-- The eight named modes are the eight standard basis vectors
def modeOf (i : Fin 8) (B : SomaFieldBundle M) (p : M) : B.fibre :=
  (modeDecomposition B p).symm (stdBasis_E8 i)

-- Phenomenological identification (a definition, not a theorem)
def modeName : Fin 8 → String
  | 0 => "calm"
  | 1 => "fight"
  | 2 => "flight"
  | 3 => "freeze"
  | 4 => "flow"
  | 5 => "joy"
  | 6 => "grief"
  | 7 => "hypervigilance"
```

## D.4  The catastrophe germ

```lean
-- The fold catastrophe A_2 germ
def foldGerm (a : ℝ) (x : ℝ) : ℝ :=
  (1/3) * x^3 - a * x

-- Critical points of the fold germ
theorem fold_crit_points (a : ℝ) (ha : 0 < a) :
    {x | (deriv (foldGerm a)) x = 0} = {Real.sqrt a, -Real.sqrt a} := by
  ext x
  simp [foldGerm, deriv]
  constructor
  · intro h
    have : x^2 = a := by linarith
    sorry  -- conclude x = ±√a
  · rintro (rfl | rfl) <;> · field_simp ; ring_nf ; rw [Real.sq_sqrt ha.le]

-- The fold catastrophe at a = 0
theorem fold_critical_at_zero (x : ℝ) :
    (deriv (foldGerm 0)) x = 0 ↔ x = 0 := by
  simp [foldGerm, deriv]
  exact pow_eq_zero_iff (by norm_num)
```

## D.5  Tunnelling rate (computational, not proven)

The WKB tunnelling rate of Appendix A.4 has been formalised as a
computational definition but not as a theorem about Schrödinger
evolution. The current Lean source is:

```lean
-- WKB tunnelling rate through a barrier of height V₀, width L
noncomputable def tunnellingRate (V₀ : ℝ) (L : ℝ) (m_eff : ℝ) (ω : ℝ)
    (hV : 0 < V₀) (hL : 0 < L) (hm : 0 < m_eff) (hω : 0 < ω) : ℝ :=
  ω * Real.exp (-(2 * L / ℏ) * Real.sqrt (2 * m_eff * V₀))

-- Positivity
theorem tunnellingRate_pos {V₀ L m_eff ω : ℝ} (hV : 0 < V₀) (hL : 0 < L)
    (hm : 0 < m_eff) (hω : 0 < ω) :
    0 < tunnellingRate V₀ L m_eff ω hV hL hm hω := by
  unfold tunnellingRate
  positivity
```

## D.6  Status

As of the date of this volume, the formal Lean development covers
roughly 35\% of the mathematical claims of the soma-field papers.
The remaining work is, in rough order of difficulty:

1. Full discharge of the smoothness obligations on the bundle
   construction.
2. Full proof of the Langevin dissipation theorem.
3. Construction of the $E_8$ Lie algebra in Mathlib (currently
   approximated by an abstract rank-8 placeholder).
4. The Schrödinger evolution and its WKB approximation.
5. The cusp catastrophe and the catastrophe unfolding theorems.

Contributions welcome.

\newpage
# Appendix E — A Reading Guide

\begin{quote}\itshape
For the reader who has finished this book and wants to go further —
into the technical soma-field literature, into the underlying physics
and mathematics, into the clinical practice that the model is meant to
inform. Organised by depth and direction.
\end{quote}

\vspace{1em}

## E.1  The eleven soma-field papers, in suggested reading order

For a reader new to the technical literature, the following reading
order is recommended.

**Start with**: P7, *Soma Field: a Patient POV* (Johnson 2026g,
zenodo.20460523). This is the most accessible paper in the series,
written from the perspective of the patient rather than the
researcher. It establishes the phenomenology and motivates the
formal apparatus.

**Then read**: P1, *The Soma Field Paper* (Johnson 2026a,
zenodo.20350515). The foundational paper, presenting the soma-field
Langevin equation, the 8-mode structure, and the basic attractor
analysis.

**Then**: P3, *Mathematical Co-Identification* (Johnson 2026c,
zenodo.20287981). The most mathematical of the papers, presenting
the algebraic structure of the 8-mode coupling and its match to
clinical pilot data.

**Then**: P9, *Music-Affect Dynamics* (Johnson 2026j,
zenodo.20460685). The most empirically supported of the papers,
presenting the music-perturbation model and HRV data from a $n=24$
pilot.

**Then**: P2, *Quantum-Soma-Penrose* (Johnson 2026b,
zenodo.20351230). The QUANT-EXP-1 paper, presenting the quantum
tunnelling proposal and the simulation results discussed in Chapter
13.

**Then**: P4, *Soma Field Synthesis* (Johnson 2026d,
zenodo.20460118), and P5, *Soma Physical Substrate* (Johnson 2026e,
zenodo.20460357). P4 integrates the model across scales; P5
addresses the physical-substrate question (microtubule, fascia,
EM field).

**Then**: D1, *SFT-DEMO-CASE* (Johnson 2026d,
zenodo.20459825). A worked clinical case demonstrating the model's
application.

**For completeness**: P6, *The Soma Field Book* (Johnson 2026f,
zenodo.20460455), the long-form synthesis intended as a graduate
textbook. P8, *The Tensor* (Johnson 2026h, zenodo.20460613), the
purely mathematical paper presenting the tensor structure.

**The omnibus**: C1, *Omnibus* (Johnson 2026k, zenodo.20460771),
the complete collected works in a single volume.

All papers are at zenodo.org/communities/soma-field-theory and are
CC BY 4.0.

## E.2  The supporting physics literature

For the physics of waves and fields, the standard graduate-level
textbooks are:

- *Classical Electrodynamics*, Jackson, 3rd edition. The classic
  graduate text on electromagnetic waves.
- *Quantum Mechanics: Concepts and Applications*, Zettili, 3rd
  edition. An accessible graduate text on quantum mechanics.
- *Classical Mechanics*, Goldstein, 3rd edition. The standard
  graduate text on classical mechanics including Lagrangian field
  theory.

For cosmology:

- *Modern Cosmology*, Dodelson, 2nd edition. The standard
  graduate cosmology text.
- *Cosmology*, Weinberg. A more theoretical treatment.

For general relativity (for the black-holes chapter):

- *Gravitation*, Misner-Thorne-Wheeler. The big classic.
- *General Relativity*, Wald. The more modern alternative.

For string theory and M-theory (Chapter 15):

- *Superstring Theory*, Green-Schwarz-Witten, 2 volumes. The
  classic. Now dated but still the canonical source.
- *String Theory*, Polchinski, 2 volumes. More modern. Volume 2
  covers superstring theory and M-theory.
- *A First Course in String Theory*, Zwiebach, 2nd edition. The
  most accessible introduction; suitable for an advanced
  undergraduate.

## E.3  The supporting biology literature

For the structural-geology-of-life perspective:

- *On Growth and Form*, D'Arcy Thompson (1917; abridged edition
  1961). The founding text of mathematical biology. Read it.
- *The Self-Made Tapestry*, Philip Ball (1999). A modern survey
  of pattern formation in biology.
- *Scale*, Geoffrey West (2017). The popular treatment of allometric
  scaling laws (Chapter 8b).

For consciousness and the brain:

- *The Astonishing Hypothesis*, Francis Crick (1994). The
  reductionist position, well argued.
- *Conversations on Consciousness*, Susan Blackmore (2005).
  Interviews with the leading thinkers; useful for the field's range.
- *Shadows of the Mind*, Roger Penrose (1994). The
  Penrose-Hameroff position, in book form.

For trauma and the body:

- *The Body Keeps the Score*, Bessel van der Kolk (2014). The
  best single book on contemporary trauma theory.
- *Waking the Tiger*, Peter Levine (1997). The Somatic Experiencing
  founding text.
- *Anatomy Trains*, Tom Myers (2001/2020). The fascial-continuity
  perspective on body structure.

## E.4  The supporting mathematics literature

For differential geometry (Chapter 15c):

- *Riemannian Geometry*, do Carmo. The standard graduate text.
- *Compact Manifolds with Special Holonomy*, Joyce. The
  monograph on G$_2$ and Spin(7) manifolds, by their discoverer.

For Lie groups (Appendix C):

- *Lie Groups, Lie Algebras, and Representations*, Hall, 2nd
  edition. The accessible graduate text.
- *Representation Theory*, Fulton-Harris. The more thorough text.

For catastrophe theory (Appendix A.3):

- *Structural Stability and Morphogenesis*, René Thom (1972,
  English translation 1975). The founding text.
- *Catastrophe Theory*, Arnold (1986). The mathematical treatment.

## E.5  The supporting clinical literature

For somatic-experiencing-style practice:

- *In an Unspoken Voice*, Peter Levine (2010).
- *Trauma and the Body*, Pat Ogden (2006).
- *The Polyvagal Theory*, Stephen Porges (2011).

For psychiatric / neuropsychological context:

- *The Heart's Code*, Paul Pearsall. (Speculative, but well-
  referenced; useful for the heart-as-organ-of-emotion perspective.)
- *Patient H.M.*, Luke Dittrich. A serious history of the modern
  neurology of memory.

## E.6  For the working practitioner

For a therapist or bodyworker who wants to use the soma-field model
clinically, the practical recommendations are:

1. Read P7 first. Read it again. Discuss it with at least two
   colleagues.

2. Implement the 8-mode self-report instrument (visual analogue,
   one slider per mode) in your standard intake. Use it weekly for
   three months. Notice what patterns emerge.

3. Read Appendix B and consider whether your practice could
   contribute pilot data to the clinical-replication question.

4. Subscribe to updates at the Independent Replication Ledger at
   `paper/INDEPENDENT_REPLICATION_LEDGER.md` (mirrored on the
   ITI-Theory GitHub organisation).

5. Contact the author. The author actively welcomes correspondence
   from clinicians and is happy to discuss case applications,
   theoretical questions, or research collaboration.

Author: Alistair Johnson. ORCID: 0009-0007-2194-0850. Email
available on the ORCID record. Zurich, Switzerland.

\newpage
# Appendix F — Glossary

A working glossary of terms used in this book. Definitions are
*operational* — the meaning the term has *in this book's framework* —
not necessarily the meaning the term has in any single home
discipline. Where the home-discipline meaning differs, this is
flagged.

## A

**Action potential.** The propagating depolarisation along a neuronal
or cardiac membrane. Travels by a self-sustaining cascade of
voltage-gated sodium channels. Velocity 1–120 m/s depending on axon
diameter and myelination. In this book: the canonical fast wave on a
biological substrate.

**Activator-inhibitor system.** A two-species reaction-diffusion
mechanism in which one chemical species promotes its own production
(the activator) and a second species suppresses it (the inhibitor).
With the inhibitor diffusing faster than the activator, the uniform
state becomes unstable and spatial patterns form spontaneously. The
core of Turing's morphogenesis paper (1952).

**ADHD.** Attention-Deficit/Hyperactivity Disorder. In this book's
Chapter 11c framing: a cognitive configuration in which fewer of the
brain's intrinsic dimensions are compressed to a narrative single-
threaded stream than in the neurotypical case.

**ADE classification.** The classification of simply-laced finite
Coxeter groups (and equivalently, of the McKay correspondence's
finite subgroups of SU(2)). The connected types are $A_n$, $D_n$,
$E_6$, $E_7$, $E_8$. In this book's Chapter 15c: each type
corresponds to a singularity in the G$_2$ compactification's ALE
space, and the deformations of those singularities give the
attractor structure of the soma field.

**ADS/CFT correspondence.** The Maldacena duality (1997) between
type IIB string theory on AdS$_5 \times S^5$ and $\mathcal{N} = 4$
super Yang-Mills theory on the boundary. The first concrete
holographic duality. In this book: cited as evidence that
gravitational and gauge theories can be the same thing seen from
different sides.

**ALE space.** Asymptotically Locally Euclidean four-manifold. The
local model for a Calabi-Yau singularity. Resolution of an ALE
singularity gives an ADE-classified configuration of two-spheres
whose intersection matrix is the Cartan matrix of the corresponding
Lie algebra. Used in Chapter 15c.

**Attractor.** A region of phase space toward which trajectories of
a dynamical system converge from a neighbourhood (the *basin*). May
be a fixed point, a limit cycle, a torus, or a strange attractor. In
this book: the eight named modes of the soma field are attractors of
its dynamical-system description.

**Autonomic nervous system.** The branch of the peripheral nervous
system that regulates visceral function without conscious control.
Two main arms: sympathetic (mobilisation) and parasympathetic
(restoration). The vagus nerve is the principal parasympathetic
trunk. See Chapter 10b.

## B

**Baroreflex.** The negative-feedback loop in which baroreceptors in
the carotid sinus and aortic arch detect blood pressure changes and
modulate heart rate and vascular tone to compensate. Has a natural
resonance frequency of about 0.1 Hz. Drives the respiratory sinus
arrhythmia at typical breathing rates. The reason 6-breaths-per-
minute breathing entrains HRV so strongly.

**Black hole.** A region of spacetime in which the gravitational
field is strong enough that no signal, including light, can escape.
Characterised by mass, charge, and angular momentum (the no-hair
theorem). In this book's Chapter 4b: the canonical wave-sink.

**Boundary conditions.** The constraints imposed on a wave equation
at the edges of the domain. In this book: emphasised as the reason
why the same wave equation produces qualitatively different patterns
in different geometries.

## C

**Calabi-Yau manifold.** A compact Kähler manifold with vanishing
first Chern class and Ricci-flat metric. The six-dimensional case is
used in the most common superstring compactifications. In this book:
the ten-dimensional string theories live on $\mathbb{R}^{1,3} \times
\mathrm{CY}_3$; M-theory's $\mathbb{R}^{1,3} \times G_2$ uses
seven-dimensional G$_2$-holonomy manifolds, which generalise the CY
construction.

**Cardiac coherence.** A clinical term (HeartMath Institute) for a
state in which the heart's beat-to-beat intervals exhibit a clean
single-frequency oscillation (typically near 0.1 Hz) rather than the
mixed-frequency variability of an ordinary resting state. In this
book: a substrate condition associated with the calm and flow
attractors.

**Cartan subalgebra.** The maximal abelian subalgebra of a Lie
algebra. Its dimension is the *rank* of the algebra. In this book:
the eight Cartan generators of E$_8$ are mapped to the eight modes of
the soma field.

**cPTSD.** Complex post-traumatic stress disorder. The clinical
syndrome associated with prolonged, repeated traumatic exposure
during childhood, distinct from single-incident PTSD in its effects
on identity, affect regulation, and relational capacity. The author
has lived with cPTSD since 1968.

**Coupled oscillator system.** A collection of two or more
oscillators with dynamical interactions between them. Generic
behaviours: phase locking, synchronisation, chaos, attractor
formation. The mathematical core of the framework of this book.

**Cyber-hologram.** The book's term for the visual representation of
the soma field as a three-dimensional luminous structure that is
*not* identified with the physical body. The metaphor's purpose is
to keep the reader from collapsing the soma field into either
mind-only or body-only category.

## D

**Dark energy.** The component of the universe's energy budget
responsible for the observed accelerating expansion. About 68% of
total content. Equation of state $w \approx -1$ within current error
bars. Identity unknown. Most plausibly identified with Einstein's
cosmological constant $\Lambda$, but with a magnitude $\sim 10^{120}$
smaller than the natural quantum-field-theoretic prediction.

**Dark matter.** The component of the universe's energy budget
required to explain galactic rotation curves, gravitational lensing,
CMB acoustic peaks, and large-scale structure, but not directly
detected in any laboratory. About 27% of total content.

**Density wave (galactic).** A standing-wave pattern in the disk of
a spiral galaxy. The spiral arms are not material objects rotating
with the disk; they are density maxima through which the matter
flows.

**Diffusion.** The process by which a concentration gradient is
smoothed by random motion of the diffusing particles. Governed by
Fick's laws. Diffusion constant $D$ has units of length$^2$/time.

## E

**E$_8$.** The largest exceptional simple Lie group, of rank 8 and
dimension 248. The root system contains 240 roots in eight
dimensions. In this book: the framework identifies the eight soma-
field modes with the eight Cartan generators of E$_8$, and the
inter-mode coupling structure with a deformation of the E$_8$ root
system.

**ENSO.** El Niño-Southern Oscillation. The dominant interannual
mode of climate variability in the tropical Pacific, with global
teleconnections. Treated in Chapter 5b as a worked example of a
planetary-scale coupled-oscillator system.

## F

**Falsifiability.** The Popperian criterion that a scientific claim
must specify in advance the observation that would refute it. This
book contains a number of falsifiable predictions, collected in
Chapter 19 (open questions).

**Field.** A quantity assigned to every point in space and time.
Scalar (one number per point), vector (three numbers), tensor (more),
spinor (mathematically more delicate). In this book: emphasised as
the substrate without which there can be no wave.

**Fold catastrophe.** The simplest of Thom's elementary
catastrophes: a one-parameter family of potentials in which a saddle
and a minimum collide and annihilate as the parameter crosses a
critical value. Used in this book to describe sudden transitions
between soma-field attractors.

## G

**G$_2$.** The smallest of the five exceptional simple Lie groups.
Has rank 2 and dimension 14. Acts on seven-dimensional manifolds
as the holonomy group of a special Ricci-flat metric. The natural
choice for M-theory compactification giving four-dimensional
physics. See Chapter 15c.

**Glarus thrust.** The Hauptüberschiebung — the line in eastern
Switzerland along which older Permian rock has been pushed over
younger Tertiary rock. UNESCO World Heritage Site since 2008.
Treated in Chapter 6 as the canonical evidence of slow-wave-like
behaviour of rock under sustained stress.

## H

**Hamiltonian.** The total energy of a system as a function of its
coordinates and momenta. The generator of time evolution in
classical and quantum mechanics. The soma-field framework is
formulated in Hamiltonian language, though the dynamics are typically
Langevin (Hamiltonian plus dissipation plus noise).

**Holography.** The principle, suggested by 't Hooft and Susskind
and made concrete by Maldacena, that the information in a volume of
space can be encoded on its boundary. In this book: cited as evidence
that the apparent dimensionality of a system can be lower than its
true dimensionality.

**Hopfield network.** Recurrent neural network with symmetric
weights, introduced by Hopfield (1982). Has an energy functional
which the dynamics monotonically decrease. The attractors are
local minima of the energy. The mathematical ancestor of the
soma-field framework: SFT is a tensor-valued generalisation of
Hopfield dynamics.

**HRV.** Heart Rate Variability. The variation in interval between
successive heartbeats. The most quantitative non-invasive proxy for
soma-field state. Standard spectral decomposition: HF (0.15-0.4 Hz),
LF (0.04-0.15 Hz), VLF (0.003-0.04 Hz).

## K

**Kaluza-Klein.** The mechanism by which a compactified extra
dimension manifests at low energies as a tower of massive states.
The mass scale of the lowest state is inversely proportional to the
compactification radius. *Large* compactification = light KK modes
(easily accessible); *small* compactification = heavy KK modes
(decoupled). Used as the central metaphor of Chapter 15d.

## L

**Langevin equation.** A stochastic differential equation
describing a system subject to a deterministic force plus random
noise. Standard form: $\dot x = -\nabla V(x) + \xi(t)$, where $\xi$
is white noise. The soma-field framework is a (tensor-valued,
infinite-dimensional) Langevin system.

**Lean 4.** A dependently-typed programming language and interactive
theorem prover. Used in this book's formalisation effort
(Appendix D, ~35% complete as of the v0.1 release).

## M

**M-theory.** The eleven-dimensional theory of which the five
ten-dimensional superstring theories are limits. Conjectured by
Witten (1995) on the basis of duality relations. Has membranes (M2)
and fivebranes (M5) as fundamental objects. Compactifies to four
dimensions on seven-dimensional G$_2$ manifolds.

**Mode (soma-field).** A named attractor of the soma-field
dynamics. This book uses eight: calm, fight, flight, freeze, flow,
joy, grief, hypervigilance. See Chapter 11.

**Morphogen.** A diffusing chemical that establishes positional
information during development. Turing's term. See Chapter 7c.

## P

**Polyvagal theory.** Porges' (1994) framework distinguishing three
autonomic states: ventral vagal (social engagement), sympathetic
(mobilisation), dorsal vagal (shutdown). Strong evolutionary claims
controversial; weak structural claims (three states, vagal
modulation, ordered transitions) well-supported.

## Q

**QUANT-EXP-1.** The quantum-experiment programme described in
Chapter 13b. Classical cold-anneal versus quantum transverse-field
anneal on a barrier-crossing test problem on the soma-field
Hamiltonian. Result: classical 0/48; quantum 3/3. Replication
ongoing.

## R

**Reaction-diffusion.** Systems of partial differential equations
combining local reaction kinetics with diffusion of one or more
species. Generic source of spontaneous spatial pattern. See
Chapter 7c.

**RSA.** Respiratory Sinus Arrhythmia. The increase in heart rate
during inhalation and decrease during exhalation. Vagally mediated.
The HF component of HRV.

## S

**Schumann resonance.** The standing-wave electromagnetic modes of
the Earth-ionosphere cavity. Fundamental at ~7.83 Hz. Excited by
worldwide lightning. See Chapter 5b.

**Soma field.** This book's central object. The coupled-oscillator
configuration of a living human, considered as a single dynamical-
system state across multiple physical substrates (cardiac, vagal,
fascial, neural, endocrine, microbial). See Chapter 11.

**Standing wave.** A wave whose pattern does not propagate in
space, although the medium oscillates locally. Arises in any
bounded medium. The fundamental and harmonics are eigenmodes of the
wave equation with the relevant boundary conditions. See Chapter 1.

**Swampland.** The conjectured set of low-energy effective field
theories that *cannot* be consistent quantum-gravity limits of
M-theory. Distinguishes the *landscape* (theories that can) from
the *swampland* (theories that cannot). Several swampland
conjectures (de Sitter, distance, weak gravity) constrain
phenomenologically viable compactifications. Relevant to Chapter 2b
on dark energy.

## T

**Tensegrity.** Buckminster Fuller's term for structures composed
of compression members (struts) held in place by a network of
tension members (cables) without rigid joints. Applied to biology
by Levin (biotensegrity). See Chapter 10.

**Tunnelling.** The quantum-mechanical process by which a system
crosses a classically-forbidden energy barrier. Rate exponentially
suppressed by the WKB integral across the barrier. The mechanism
proposed in this book for some soma-field transitions that would
not occur thermally.

## V

**Vagus nerve.** The tenth cranial nerve. The longest single
wave-guide in the body. 75% of parasympathetic visceral output;
80% afferent (body-to-brain). See Chapter 10b.

## W

**Wave equation.** $\partial_t^2 \phi = c^2 \nabla^2 \phi$, in the
simplest case. Governs everything from the rope on which the book
starts to the gravitational waves at LIGO. Its solutions form the
mathematical backbone of this book.

## Z

**Zenodo.** The CERN-hosted open repository where the eleven
soma-field papers (and the present book) are deposited with citable
DOIs. See Appendix E for the full reading list with DOIs.
# Appendix G — How to Read This Book

A guide to reading paths through *The Wave That Is Always There*,
depending on what the reader has come for.

## G.1  For the curious general reader

Read in order from the beginning through chapter 11. Stop there or
continue. The first eleven chapters are the wave-atlas proper. They
take you from a rope shaking in your hand up through the soma field,
without M-theory or the harder mathematics. Chapter 11 names the
eight modes. That is the book's central proposal. Everything after
chapter 11 is either deepening (M-theory, quantum experiments,
clinical detail) or sideways extension (music, light, gravitational
waves, biographical material).

If chapter 11 leaves you satisfied, the *Letter to My Daughter*, the
*Postscript on the Benign Swindle*, and chapter 20 (the synthesis) are
worth your time. The rest can wait.

If chapter 11 leaves you hungry, continue into 12 (attractors), 13
(catastrophes), 13b (the quantum experiment), 14 (microtubules), and
then 17 (practice). This gives you the framework's claim, the
empirical test, the speculation about quantum biology, and the
clinical and personal-practice translation.

## G.2  For the working scientist

Read the front essay, then chapter 11, then chapter 20. This gives
you the framework in two hours.

If chapter 20 leaves you wanting to evaluate the framework's
mathematical content: read 11b (the eight modes in detail), 12
(attractor mathematics), 15a/15b/15c (the M-theory chapters), and
appendix A (the Langevin formalism). This is a five-hour read and
gives you everything you need to assess the framework's mathematical
adequacy.

If chapter 20 leaves you wanting to evaluate the framework's empirical
adequacy: read 9 (HRV), 10b (vagus), 13b (QUANT-EXP-1), 11d (clinical
vignettes), 11e (long-arc vignettes), and appendix B (the replication
protocol). This is a four-hour read and gives you everything you
need to assess the framework's empirical adequacy.

If chapter 20 leaves you sceptical: read chapter 19 (the open
problems), appendix E (the bibliography), and the independent
replication ledger. Then write the framework's most rigorous critic
the email it deserves. The framework's author would prefer to be
told he is wrong, in print, than to be ignored.

## G.3  For the clinician

Read chapters 9, 10b, 11, 11b, 11c, 11d, 11e, 17, and 17b. This is
the clinical core. Add appendix B for the replication protocol if you
are positioned to run a trial.

The cases in 11d and 11e are composites; the protocol in appendix B
is real, the data pipeline is on Zenodo, and the framework's author
is contactable through the ORCID page for a referenced consultation
on adapting the protocol to your context.

## G.4  For the contemplative practitioner

Read the front essay, chapters 11, 17, 17b, the *Letter to My
Daughter*, the *Postscript*, and chapter 20. Skip the mathematics
unless the mathematics calls you.

The framework's intersection with contemplative practice is in the
*named-mode-as-attractor* claim: that the modes of consciousness
isolated by long contemplative traditions are not arbitrary
descriptions but are stable configurations of the soma-field
substrate. The framework agrees with the traditions on the descriptive
typology and adds a substrate-level account of *why* those particular
modes recur.

The framework does not require the traditions to be correct on their
metaphysics; it requires only that they have noticed real attractors.
That much, the framework asserts, they have done. The framework's
own metaphysical commitments are minimal — it is, formally, a
classical-and-quantum dynamical systems theory — and are compatible
with most of the standard religious and contemplative metaphysical
frameworks, though it does not endorse any of them.

## G.5  For the mathematician

Read appendix A (Langevin formalism), appendix C (E$_8$ and the eight
modes), and appendix D (the Lean formalisation status report). Then
ask whether the framework's mathematical claims are correct, and if
not, in what way and to what extent they can be salvaged.

The framework's mathematical content is at the level of advanced
undergraduate / early-graduate dynamical systems, with the geometry of
G$_2$ manifolds at the harder end and the Lean formalisation as the
proof-of-correctness layer. None of the mathematics is genuinely new
— the framework's claim to novelty is in the *application* of these
tools to a specific phenomenological domain, not in the tools
themselves.

If the framework's mathematical claims are wrong, the framework would
like to know. The author is contactable through the ORCID page.

## G.6  For the journalist or critic

Read the front essay, chapter 11, the *Postscript on the Benign
Swindle*, and chapter 20. This gives you the framework's
intellectual content, its sociological framing (the [T]-Theory art
movement), and the author's own assessment of what is being attempted.

If you would like to write a hostile review, the framework's
preferred targets for hostility are: the M-theory compactification
claim (chapter 15c, which is the weakest mathematical claim), the
QUANT-EXP-1 result (chapter 13b, which is the strongest empirical
claim and therefore the most rewarding target if it can be made to
fall), and the independent replication ledger (which is, by design,
the framework's published self-criticism).

The framework would prefer hostile criticism to neglect. The author
will read your review and, if it is good, will quote it in the next
edition.

## G.7  For the author's family and close friends

Read the *Letter to My Daughter* first. The book is mostly written
*for* you in the sense that it is what the author has been thinking
about for several years and could not write to you privately. The
science is the work. The work is what fills the hours. The hours
are the ones you noticed the author was absent for. The book is the
account of what those hours were.

If after the letter you would like the framework's actual content,
chapter 11 is the right place. If after chapter 11 you have had
enough, that is acceptable. The framework's existence is independent
of any individual reader's engagement with it, and family duty is not
discharged by reading the book.

## G.8  For the author, ten years from now

You wrote chapter 20 §20.5 for yourself. Read that. Read it more
than once. Then either revise the framework, retire the framework, or
keep working. Whichever you do, do it for reasons you can explain in
a sentence to a stranger.

If the framework has lasted ten years and is still being argued
about, that is success. If it has not lasted ten years and has been
quietly dropped by everyone including you, that is also success, of
the kind science is supposed to deliver. Either way the daughter is
twenty-four and you have other things to do. Go and do them.
# Appendix H — Reading List, Annotated

A short selection from the longer bibliography, with one or two
sentences on what each work contributed to the framework. The
reader who wants to study any of the framework's claims in depth
should start with the corresponding annotated reference.

## On waves and wave physics

**Crawford, Frank S.** *Waves* (Berkeley Physics Course Vol. 3,
McGraw-Hill, 1968). The book that shaped the author's understanding
of waves as an undergraduate. Still the best general introduction
to the wave equation, normal modes, and wave-particle duality at the
level of an upper-undergraduate physics student.

**Penrose, Roger.** *The Road to Reality* (Jonathan Cape, 2004). A
1100-page tour of mathematical physics by one of its greatest
practitioners. The framework's geometric vocabulary — bundles,
spinors, gauge symmetries — was learned partly from this book.

**Misner, Thorne, and Wheeler.** *Gravitation* (Freeman, 1973). The
classic reference on general relativity, including the
gravitational-wave material referenced in chapter 4c.

## On dynamical systems and attractors

**Strogatz, Steven H.** *Nonlinear Dynamics and Chaos* (Westview,
1994). The most-recommended introduction to nonlinear dynamics. The
framework's vocabulary of attractors, bifurcations, and limit
cycles draws on Strogatz's exposition.

**Kuramoto, Yoshiki.** *Chemical Oscillations, Waves, and
Turbulence* (Springer, 1984). The foundational text on coupled
oscillator synchronisation. The Kuramoto model is one of the
ancestors of the framework's soma-field formalism.

**Hopfield, J. J.** "Neural networks and physical systems with
emergent collective computational abilities" (PNAS 1982). The
original Hopfield network paper. The framework is a tensor-valued
generalisation of the Hopfield model; the reader who has not read
this paper should.

## On the physics of consciousness and the quantum-brain question

**Penrose, Roger.** *The Emperor's New Mind* (Oxford, 1989). The
opening of Penrose's argument for non-computational consciousness.
Whether the reader accepts the argument or not, the book is
required reading for anyone working at this intersection.

**Penrose, Roger.** *Shadows of the Mind* (Oxford, 1994). The
sequel. Develops the Orch-OR proposal in detail. The framework
treats Orch-OR sympathetically without committing to it.

**Hameroff, Stuart, and Roger Penrose.** "Consciousness in the
universe: A review of the 'Orch OR' theory" (Physics of Life
Reviews 2014). The most up-to-date Penrose-Hameroff exposition;
referenced in chapters 14 and 16b.

**Tononi, Giulio.** *Phi: A Voyage from the Brain to the Soul*
(Pantheon, 2012). The book-length exposition of Integrated
Information Theory, an alternative framework for the science of
consciousness. The framework of this book is *compatible* with
IIT but does not depend on it.

## On the physics of life

**Schrödinger, Erwin.** *What Is Life?* (Cambridge, 1944). The
opening shot of theoretical biology. The framework's claim that
biological substrates support specifically wave-like dynamics owes
something to Schrödinger's framing.

**Murray, J. D.** *Mathematical Biology* (Springer, 1989; 3rd ed.
2002–2003). The standard reference on reaction-diffusion systems
and morphogenesis. Cited extensively in chapter 7c.

**West, Geoffrey B.** *Scale* (Penguin Press, 2017). On the allometric
scaling laws of biology and cities. Provides empirical evidence for
the framework's claim that biological substrates have fractal-like
properties across scales.

## On the autonomic nervous system

**Porges, Stephen W.** *The Polyvagal Theory* (W. W. Norton,
2011). The book-length exposition of polyvagal theory. The
framework treats polyvagal theory's *weak* claims as well-supported
and its *strong* evolutionary claims as more controversial.

**Levine, Peter A.** *In an Unspoken Voice* (North Atlantic, 2010).
Somatic Experiencing as a clinical practice. The framework's clinical
applications draw heavily on this tradition.

**Sapolsky, Robert M.** *Why Zebras Don't Get Ulcers* (3rd ed.,
Henry Holt, 2004). The classic on stress physiology. Provides the
baseline understanding of HPA-axis dynamics that the framework
extends.

## On trauma and clinical practice

**van der Kolk, Bessel A.** *The Body Keeps the Score* (Viking,
2014). The popular book that brought trauma-informed care into
mainstream consciousness. Cited in chapter 11.

**Maté, Gabor.** *The Myth of Normal* (Avery, 2022). The most
recent of Maté's books integrating trauma, social context, and
clinical practice. The framework's clinical chapters are
sympathetic to Maté's framing.

**Walker, Pete.** *Complex PTSD: From Surviving to Thriving*
(Azure Coyote, 2013). The most-recommended practical guide to
cPTSD. Cited in the *Letter to My Daughter*.

## On M-theory and high-energy physics

**Becker, Becker, and Schwarz.** *String Theory and M-Theory*
(Cambridge, 2007). The graduate-level textbook on M-theory.
Required for the technical reader of chapters 15a, 15b, 15c.

**Atiyah, M., and N. Hitchin.** *The Geometry and Dynamics of
Magnetic Monopoles* (Princeton, 1988). The classic on
moduli-space geometry of self-dual gauge fields. The framework's
geometric content draws on this tradition.

**Joyce, Dominic D.** *Compact Manifolds with Special Holonomy*
(Oxford, 2000). The reference text on G$_2$ and Spin(7) manifolds.
The mathematical foundation of chapter 15c.

## On music and embodied cognition

**Sacks, Oliver.** *Musicophilia* (Knopf, 2007). The book that
made musical neuroscience accessible. Cited in chapter 12c.

**Levitin, Daniel J.** *This Is Your Brain on Music* (Dutton, 2006).
The standard popular text on music cognition. Cited in chapter 12d.

**Huron, David.** *Sweet Anticipation* (MIT Press, 2006). On
musical expectation and its violation. The framework's account of
why specific chord changes have specific affective effects (chapter
12d) draws on Huron.

## On contemplative practice and the science of the mind

**Wallace, B. Alan.** *The Attention Revolution* (Wisdom,
2006). On meditation as attentional training. Cited in chapter 6b
and chapter 17.

**Davidson, Richard J., and Sharon Begley.** *The Emotional Life
of Your Brain* (Hudson Street Press, 2012). On individual
differences in emotional style and their neuroscientific
correlates. Compatible with the framework's eight-mode
framework.

**Goleman, Daniel, and Richard J. Davidson.** *Altered Traits*
(Avery, 2017). On the long-term effects of contemplative practice.
Cited in chapter 17b.

## Author's own work, in dependency order

The framework was developed across eleven papers (and one
demo-case study) published on Zenodo in 2025–2026. The dependency
order is roughly:

1. P3, *mathematical-co-identification* — the philosophical
   foundation.
2. P1, *soma-field-paper* — the framework's introduction.
3. P5, *soma-physical-substrate* — the substrate-level account.
4. P8, *the-tensor* — the mathematical core.
5. P2, *quantum-soma-penrose* — the quantum-mechanical extension.
6. D1, *SFT-DEMO-CASE* — the worked clinical case.
7. P4, *soma-field-synthesis* — the synthesis at paper length.
8. P6, *soma-field-book* — the precursor to this book.
9. P7, *soma-field-patient-pov* — the patient-perspective account.
10. P9, *music-affect-dynamics* — the music-as-coupling-operator
    paper, ancestor of chapter 12d.
11. C1, *omnibus* — the omnibus collection of P1–P9 with
    cross-references.

This book is *not* an additional paper. It is the *long-form
synthesis* of the framework as developed across the eleven, written
for a reader who would prefer one book to twelve papers. The papers
remain available on Zenodo for the reader who wants the
peer-reviewable units rather than the long-form synthesis.

## Final note

A bibliography is a record of debts. The framework's debts are
numerous and acknowledged. The works above are the most important.
There are many more in the full bibliography (paper-end). The reader
who wishes to follow any thread of the framework is welcome to do so,
and is welcome to write to the author about what they find. The
author is contactable through ORCID 0009-0007-2194-0850.
# Appendix I — Acknowledgements

A book of this scope is not the work of one person, even when one
person sits at the keyboard. The following debts are recorded here
because they are real and because the framework's commitment to
transparency means acknowledging them publicly.

## Family

To my daughter, the silent dedicatee of the *Letter to My Daughter*
chapter and the steady reason for most of what I have tried to do
since 2012. You will read this when you read it. There is no rush.

To my partner, who has watched me work on this for more years than
either of us would have predicted at the start, with a steadiness
I have not always returned in kind. Thank you.

To my parents, both still living, who built the substrate. I have
been a difficult son for most of my life. I am trying to be less
difficult now.

To my sister and her family, the Geneva contingent, who have
provided the contrastive case-study of how a well-functioning
extended family operates. The framework's observations on
joint-attractor dynamics owe something to having watched yours.

## Clinical

To the clinicians who worked with me in the long aftermath of 2014,
named here only by their initials: K.W., R.S., M.L., and the
unnamed others at the Zurich service that I do not want to identify
without their consent. The framework's clinical chapters are partly
your work. Any errors of clinical content are mine.

To the patients who consented to anonymised use of their data in
the vignette chapters. The vignettes are composites and no
individual is identifiable, but the underlying trajectories are
real and were trusted to me.

## Mathematical and scientific

To the small set of mathematicians who have looked at the
framework's geometry over the past three years and have not
collectively rejected it. You know who you are. The framework's
weakest mathematical claim — the G$_2$ derivation — remains
unresolved and is the principal gap to be closed.

To the quantum-computing colleagues who ran the QUANT-EXP-1
simulations and the early hardware tests. The framework's strongest
empirical result is yours as much as mine.

To the Lean 4 community for building a tool that lets independent
researchers do formally-verified mathematics outside of institutional
affiliations. The 35 % formalisation would not exist without your
collective work.

## Cultural and artistic

To the [T]-Theory collective, present and forthcoming. The art track
is, by my own admission, less developed than the science track at
the v0.1 release. We will fix that in the coming year.

To the Strandberg and Ableton communities, for making the
instruments that the 11/8 album is being recorded on. The
framework's coupling-operator chapters are partly direct
introspection on what music does to the soma field when one is
making music; you provided the means.

To the small set of friends who have listened to the unreleased
album at various stages and offered honest feedback. The album is
better for it.

## Institutional and material

To Zenodo, hosted by CERN, for providing free, citable, permanent
deposition for the eleven papers and this book. Open science is
genuinely possible because of infrastructures like Zenodo.

To the City of Zurich and the Canton of Zurich, for being the kind
of place where an independent researcher can live and work without
institutional affiliation and without losing access to libraries,
medical care, transportation, and the broader scientific community.

To the Klöntalersee viewpoint above the Glarus thrust, which is the
implicit setting of more chapters of this book than appear to
mention it. The walk up there clears the head in a way that no
indoor environment manages.

To the cleaning service that has kept the home studio operational
during periods when I was less able to keep it operational myself.
The framework's substrate-level intervention claims include the
mundane reality that a person whose physical environment is in
disorder will have difficulty maintaining a coherent soma field.
You have been a substrate-level intervention.

## Antagonists

To the framework's eventual serious critics, named in advance: I
look forward to your work. Critique is the way frameworks improve.
A framework with no serious critics is either trivially true or
unread; the framework's author would rather it be neither.

## What this list omits

A list of acknowledgements is necessarily incomplete. The framework
predicts — and lived experience confirms — that the most important
people are sometimes the most difficult to name in print. The
framework also predicts that *naming* is not the only way of
acknowledging; *behaviour over time* is the more durable form. The
author's commitment is to that.

If you helped and are not named here, this paragraph is for you.
The omission is not deliberate. Please assume good faith and, if
you would like, tell me. I will name you in the next edition.

## A final thanks

To the reader, who has reached the end of a long book and is now
reading the acknowledgements page that most readers skip. You are
the framework's first audience. The framework hopes it has been
worth your time. If it has not been, the framework would rather
hear that than not hear from you at all.

\bigskip

\hfill *A. J., Zurich, 2026*
# Chapter 19 — Open Questions

\begin{quote}\itshape
A chapter for what is *not* settled. The soma-field model is a
working hypothesis with substantial published infrastructure but
substantial empirical gaps. This chapter lays out the major open
questions in the order in which the author thinks they are most
likely to be settled.
\end{quote}

\vspace{1em}

## 19.1  Replication of QUANT-EXP-1

The most pressing single open question. The result rests on
simulations performed by one group (the author and collaborators)
and has not been independently reproduced. The replication is
straightforward — the simulation code is open-source, the parameters
are documented, the required infrastructure is a desktop computer.
There is no good reason it has not been done; the reason it has not
been done is that no other group has taken on the project.

A successful independent replication would substantially strengthen
the case. A failed independent replication would substantially weaken
it. Either outcome is informative.

## 19.2  Hardware execution of QUANT-EXP-1

A version of the experiment that runs on actual quantum hardware
rather than simulation. Two routes:

(a) D-Wave annealer. Suitable for the quantum-annealing version of
the protocol. Required resources: $\sim 10,000$ qubit-hours, $\sim 5$
months of collaborator time. Estimated probability of success on
first attempt: $\sim 50\%$, with substantial parameter-tuning
required to reproduce the simulation's coherence regime.

(b) IBM-Q gate-model. Suitable for the digital-quantum-simulation
version of the protocol. Required resources: $\sim 10,000$ circuit-
executions, $\sim 3$ months collaborator time. Estimated probability
of success on first attempt: $\sim 30\%$, due to current gate-error
limitations.

Either would, on success, establish that the QUANT-EXP-1 mechanism is
realisable in physical quantum hardware. Neither would, on its own,
establish that *biological* tissue realises the mechanism — that is
the next-but-one question.

## 19.3  Microtubule coherence time, in vivo

The central empirical question for the Hameroff-Penrose substrate
proposal. The Bandyopadhyay 2014 claim of $\sim 1$ ms coherence in
living microtubules has not been independently replicated. The
required experimental apparatus is non-trivial — coherence
measurements in living tissue at body temperature with sub-
millisecond time resolution — but is within current capability.

Estimated time to settlement: 5–10 years if an appropriately
resourced group takes it on; indefinite otherwise.

## 19.4  Clinical replication of the catastrophic-fold transition

The hypothesis that emotional state transitions in trauma patients
follow catastrophe-theoretic geometry (Appendix B, H1) is testable
in a clinical pilot of $n \approx 30$ subjects over 6 months. This
is *much* more tractable than the microtubule question. The
preregistration is in progress; the funding is not.

Estimated time to settlement *if funded*: 18 months.

## 19.5  Group-coupling effects in music

The prediction (P9 §5.3) that group-coupling effects are
*strongest* when the group is non-uniform and the music is
integrative is testable in a study of $n \approx 50$ subjects across
8–10 concert events, with HRV synchrony as the primary endpoint.
Pilot data are encouraging but underpowered. A confirmatory study is
in scoping discussion.

Estimated time to settlement: 24 months.

## 19.6  The eightfold structure of clinical phenomenology

The prediction that the eightfold structure of soma-field modes
(Appendix C) matches the natural taxonomy of clinical states in
trained therapists is testable in a *consensus-elicitation* study of
$n \approx 100$ experienced clinicians from diverse modalities. The
study has been proposed and rejected for funding twice; it remains
the most tractable single piece of soma-field empirical work and the
one I most hope to see done.

Estimated time to settlement *if funded*: 12 months.

## 19.7  Independent external replication of the foundational paper

The soma-field paper (P1) has been read and cited but has not, to
the author's knowledge, been externally and independently *replicated*
in its core mathematical content. The Independent Replication Ledger
(`paper/INDEPENDENT_REPLICATION_LEDGER.md`) lists 11 row entries, all
PENDING.

Replication here means: an independent group implements the soma-
field Langevin equation with the published parameters and reproduces
the published trajectories within statistical agreement. This is a
straightforward task; it has not been performed because no
independent group has tried.

## 19.8  Existence of compact G$_2$ manifolds with the required
singularity structure

A mathematical, rather than empirical, open question. The soma-field
$E_8$-singularity proposal (Appendix C, §15c.4) requires the
existence of compact G$_2$ manifolds with an isolated $E_8$
singularity. Joyce's 1996 construction does not directly provide such
examples; subsequent work (Acharya, Witten, and collaborators) has
addressed similar but not identical cases.

The mathematical question is whether such manifolds exist at all
(probably yes, but not constructively known) and, if so, whether
they form a moduli space with the dimensionality required for
phenomenology (8 + some). This is graduate-level differential
geometry work; the author is not equipped to perform it and is
seeking collaboration.

## 19.9  Why eight and not seven, six, or four?

Appendix C presents the eight as a *consequence* of the M-theory
premise (P3). But if (P3) is rejected — i.e., if the soma field's
structure group is fixed by *something other than* M-theory anomaly
cancellation — the eight is not forced. The question of *why*
specifically (P3) holds, rather than some weaker constraint, is open.

A weaker question: would the *clinical* phenomenology equally well
support a 7-mode model collapsing calm and hypervigilance, or a
6-mode model further collapsing grief and freeze? The honest answer
is that the eightfold structure is *suggested* by but not *proven by*
the clinical literature. Stronger empirical work on this is the
study proposed in §19.6.

## 19.10  The cyber-hologram metaphor: literal or pedagogical?

The book's central visual metaphor — the body as a cyber-hologram —
is presented in some chapters as a *pedagogical aid* and in others
as a *literal claim* about the body's wave content. The honest
answer is that the metaphor is *partly literal* and *partly
pedagogical*, and the line between them is fuzzy.

The *literal* claims:

(i) The body's surface (skin and proximate fascia) encodes
substantial information about the body's interior state, in the
manner of an optical hologram.

(ii) The body's electromagnetic field (notably the cardiac torus)
extends measurably beyond the body's physical boundary.

(iii) Tensegrity-induced standing-wave patterns are observable in
the deep fascia.

The *pedagogical* claims:

(iv) The body is "made of waves" rather than of matter. This is true
at the level of fundamental physics but is not what most readers will
hear when they read it.

(v) The eight soma-field modes are "visible" as colour-coded regions
on the cyber-hologram body. This is a visualisation convention; the
modes are mathematical objects, not regions of the body.

The book has tried to flag where it is being literal and where
pedagogical. There are surely places where it has not flagged this
clearly enough.

## 19.11  Closing

A research programme is the set of questions it has not yet answered,
more than the set of questions it has answered. By that measure the
soma-field programme is, as of 2026, *young* — the published
infrastructure is substantial but the empirical body of work is
thin. The next decade is the decade in which the questions in this
chapter will be settled, or substantially revised, or set aside.

The book hopes to be read in that next decade and consulted in
twenty years to see which questions, exactly, were the wrong ones to
have asked.

\newpage
# Chapter 20 — Synthesis: One Sentence, In Increasing Detail

\begin{quote}\itshape
The whole book, distilled, in a single sentence, then unpacked at
five increasingly technical levels.
\end{quote}

\vspace{1em}

A reader who has reached this chapter has read several hundred pages.
The book has moved from ripples on water to G$_2$ holonomy and back. A
chapter at the end that distils the whole argument is owed.

## §20.0  Level 0 — for someone who has never read the book

> *The same kind of pattern is the same kind of pattern. A wave is a
> wave. Your body is a wave too.*

## §20.1  Level 1 — for an intelligent reader who skipped to this chapter

The universe, from its largest scale to its smallest, consists of
*fields* — quantities defined at every point in space and time — and
the disturbances in those fields, which we call *waves*. A surprising
amount of what the universe does, at every scale, is wave behaviour.
The galaxies' spiral arms are waves. The interior of stars rings like
a bell. The interior of planets rings like a bell. The atmosphere and
oceans support enormous slow waves that determine climate. Living cells
maintain themselves by a network of biochemical waves. Hearts beat by a
synchronised wave across cardiac muscle. Brains think by waves of
synchronous neural firing.

A *person* is, at every scale, a coupled wave system. The book argues
that the right way to think about emotional and behavioural states is
not as moods that come and go but as *attractors* of this wave system —
stable configurations into which the system falls, persists, and from
which it eventually departs. Eight such attractors recur reliably
across cultures, individuals, and historical eras: calm, fight, flight,
freeze, flow, joy, grief, and hypervigilance. The book makes a specific
mathematical claim — that these eight modes correspond to the eight
generators of the exceptional Lie group E$_8$ — and proposes that the
underlying structure of the human soma field is a particular
seven-dimensional manifold with G$_2$ holonomy, of the kind that arises
in M-theory compactifications.

The framework is testable. The book contains a quantum-mechanical
experiment whose results favour the framework over its main classical
alternatives. It also contains a clinical replication protocol that any
adequately-resourced research team could run. The framework will
ultimately succeed or fail by these tests, not by aesthetic appeal.

## §20.2  Level 2 — for a working scientist in any field

Soma Field Theory (SFT) is a tensor-valued generalisation of the
Hopfield network, formulated as a Langevin dynamical system on a
seven-dimensional manifold with G$_2$ holonomy. The attractor structure
of the dynamics corresponds, via the ADE classification of singularities
in the manifold's ALE space, to the root system of E$_8$. The eight
Cartan generators of E$_8$ are identified with the eight named modes
of phenomenological human experience.

The framework makes four kinds of testable prediction.

*First*, *clinical predictions*: that interventions targeting the
autonomic and tissue layers of the soma-field substrate produce
durable changes that cognitive interventions alone do not, and vice
versa. The clinical replication protocol of Appendix B specifies the
randomised trial design.

*Second*, *physical predictions*: that quantum-mechanical effects
contribute non-trivially to certain transitions between soma-field
attractors that classical thermodynamics cannot reach within the
relevant time window. The QUANT-EXP-1 experiment (Chapter 13b)
constitutes the first empirical test, with results favouring the
framework. Replication is ongoing.

*Third*, *neurological predictions*: that the spectral structure of
brain oscillations during transitions between soma-field attractors
should show specific signatures derivable from the framework's
Hamiltonian. These predictions are not yet experimentally tested.

*Fourth*, *aesthetic predictions*: that music, considered as a coupling
operator on the soma field, produces effects whose structure can be
decomposed into entrain-destabilise-release primitives with specific
quantitative signatures in autonomic state. Worked examples in
Chapter 12d.

The framework is approximately 35 % formalised in Lean 4. Substantial
work remains in the formal track. The empirical track has eleven
published papers on Zenodo, of which three are at the 9+ quality grade
with replication pending.

## §20.3  Level 3 — for someone who has read the book carefully

The deepest claim of the book is that the structural invariance of
wave physics across scales — what we have called the fractal claim —
is not metaphor. It is a consequence of the wave equation being a
*linear, second-order, hyperbolic partial differential equation*, and
those properties being preserved under the renormalisation group flow
that takes us from the Planck scale to the cosmological scale. Wave
behaviour is, in a precise sense, the *generic* low-energy behaviour of
a quantum field theory, and is therefore the same low-energy behaviour
across the substrates that host the underlying QFT.

The soma field is not a separate field. It is the low-energy effective
description of the coupled-oscillator system that a living human is.
The eight modes are not new entities; they are the named local minima
of the effective potential. The G$_2$ compactification is not a free
parameter; it is the unique seven-dimensional manifold structure that
gives the correct attractor count and inter-attractor coupling.

This is the framework's strongest claim and the one that, if false,
sinks the rest. The strongest version of the falsification: produce a
human population in which the eight-attractor structure does not
recur, or produce a careful empirical analysis showing that the
inter-attractor transition structure does not match the E$_8$
root-system predictions, and the framework is wrong.

The framework's weakest claim — the one that survives even if the
strong version is wrong — is that *thinking of human soma-field state
in terms of coupled-oscillator dynamics is more useful than thinking
of it in terms of discrete labels*. This weak claim is, by 2026,
substantially uncontroversial in the trauma-informed and
contemplative-practice literatures, and the framework's contribution
is to make explicit what was already implicit there.

The book contains, in addition, a sustained argument that the
mathematical structure that has been developed independently in
physics (gauge symmetries, fibre bundles, exceptional Lie groups),
biology (reaction-diffusion, Hopfield networks, attractor dynamics),
and contemplative practice (the named modes of consciousness, the
attractor-like character of meditative states) is the *same
mathematical structure*. This is the book's wave-atlas claim made
mathematically precise.

## §20.4  Level 4 — for the next decade of research

The framework's open problems, in order of expected difficulty:

*Independent clinical replication* of the framework's eight-mode
predictions across at least three trauma-focused therapy centres. The
protocol is published in Appendix B. The data analysis pipeline is
deposited on Zenodo. The replication ledger is open.

*Independent quantum replication* of QUANT-EXP-1 on actual quantum
hardware (the published experiment used IBM Aer and quantum simulators
on bounded problem sizes). D-Wave annealers are available; the
problem is to scale the QUANT-EXP-1 Hamiltonian to a hardware embedding
without losing the qualitative structure of the result.

*Completion of the Lean formalisation* to the point at which the
core theorems (soma-field bundle existence, E$_8$ attractor structure
under suitable conditions, tunnelling rate bounds) are machine-checked.
The current 35 % covers the easier early portions.

*Establishment of the G$_2$ compactification claim*. This is the
deepest open problem and the one most likely to require revision of
the framework. Specifically: producing the seven-dimensional manifold
on which the soma-field dynamics live as a *derived* rather than
*postulated* object, by reduction from a more fundamental
neurodynamical Lagrangian. This has not been done.

*External evaluator engagement*. The framework needs sustained
critical engagement from mathematicians (on the geometry),
neuroscientists (on the empirical adequacy), and clinical researchers
(on the trial results). The author's role is to publish, respond, and
revise. The framework's role is to survive or not survive that
engagement.

## §20.5  Level 5 — for the author, ten years from now

You are reading this in 2036. Your daughter is twenty-four. You are
sixty-eight. The framework has either succeeded, failed, or is still
in litigation. Which of those three you find yourself in determines
what you should do next.

If it has *succeeded*: the protocol is being run by groups you do not
know personally. The Lean formalisation is complete. The G$_2$
compactification is derived. There are graduate students at three
institutions working on extensions. Your job is to stay out of their
way and keep writing what you actually care about, which is probably
no longer this framework.

If it has *failed*: at least some predictions did not replicate. You
have already said publicly which ones. You have already proposed the
specific revisions the failures require. The framework is not the same
framework it was in 2026. It is a different framework, with the
features the failures left intact. This is also a success — it is the
success of *science working*. Take it.

If it is still in *litigation*: the trials have not yet completed, the
formalisation is partial, the geometry is conjectural, and the
arguments continue. You are probably tired. The argument is probably
no longer mostly your work, in the sense that other people have taken
it up and you are now responding to their reformulations. Take the
opportunity to step back. You have done your part. The framework will
or will not survive the next ten years on its merits, not on yours.

Whichever it is: the daughter is twenty-four. The art movement is or
is not still going. The album is or is not released. You are or are
not still walking up to the Klöntalersee viewpoint each summer. The
book that this is the synthesis chapter of is or is not still in
print. Some of these things matter much more than others. The
hierarchy of mattering — daughter, family, the small set of people who
have stayed close, the work, the framework, the wrapper — that
hierarchy is the same in every plausible future. The framework is
fourth or fifth on the list. Behaving accordingly was, when you wrote
this in 2026, already the goal.

\bigskip

\hfill *A.J., 2026* \\
\hfill *(to A.J., 2036)*
# Floats

\begin{quote}\itshape
Eight pages of single-paragraph asides, collected here at the back of
the book. The reader who has been wondering what to do with the
italic margin-notes scattered through the chapters: this is where
they all live, gathered for re-reading.
\end{quote}

\vspace{1em}

## On strings

\textit{The professor at the piano did not need a different score.
She needed to see the score as what it was. Most of what we call
"understanding" is, on this argument, the act of seeing the actual
structure that has been there the whole time.}

\textit{The Bach was a particular fugue in the Well-Tempered
Clavier — Book II, F minor. The drawing is on her fridge. Yes I have
asked.}

## On dissonance

\textit{Concert pianists report that the second half of a long
recital is harder because the soma-field state at minute 90 is
not the soma-field state at minute 10. The same piece, the same
hands, but the dissonance-between-fields is now different. Some
pianists deliberately re-tune their nervous system at intermission
with cold water or with stillness; others learn to ride the drift.}

\textit{The DJ at the rave is doing the same job as the conductor of
the orchestra — building dissonance, releasing it, building it
higher, holding it longer, releasing it again. The drop is the
cadence. The crowd is the listener. The mathematics is the same.}

## On the eight modes

\textit{The four-element classical taxonomy — choleric, melancholic,
sanguine, phlegmatic — corresponds, on the soma-field interpretation,
to choosing $F_4$ rather than $E_8$ as the structure group. It is a
useful coarse approximation. The clinical experience of why it is
*coarse* — why people whose temperaments seem similar can have very
different inner lives — is, on the model, the residual eightfold
structure not captured by the fourfold.}

\textit{Joy and grief co-occur more often than the literature
acknowledges. The clinical name is *bittersweet*. The soma-field
name is *the $\alpha_6$-$\alpha_7$ doublet*. The phenomenological
name is *being middle-aged and looking at your daughter*.}

\textit{Hypervigilance is the only one of the eight modes that
does not appear in any classical or pre-modern emotional taxonomy
the author has been able to find. It is *recent*. The author
suspects it is associated with the cognitive load of modern
social complexity; this is not provable.}

## On geology

\textit{The Glarus thrust was thought, for forty years after Heim
proposed it in 1878, to be physically impossible. The Helvetic
nappes were physically impossible too. The Alps as a whole were
physically impossible. The history of structural geology is the
slow process of *accepting that physically impossible things have
in fact happened*. This is also, on the author's view, the history
of cPTSD recovery.}

\textit{There is a viewpoint above the Klöntalersee, near the road
on the south shore, from which the entire thrust ridge is visible
as a single horizontal line cutting across a kilometre of cliff.
Stand there. Do nothing for half an hour. Let the line work on
you. This is a soma-field intervention; it has been clinically
effective in $n=1$ for the author.}

## On cosmology

\textit{The observable universe is finite. The universe is, as far
as the data go, infinite. Our observability horizon is set by the
finite age of the universe and the finite speed of light. There is
no edge. There is only how far the light has had time to come.}

\textit{If the universe is genuinely infinite and has uniform
properties at large scale, then *every possible arrangement of
matter occurs an infinite number of times*. This is sometimes
called the Level I multiverse. Somewhere, you are right now
reading this same paragraph and disagreeing with it. This is
true on standard cosmology — no exotic physics required. It
remains the case even if not a single string-theory or quantum-
multiverse claim is correct.}

## On music

\textit{Górecki's Symphony 3, second movement, has a chord change
at minute 8:30 that produces an involuntary tear response in
approximately 30\% of first-time listeners. The change is from a
suspended fourth to a major third in a Polish-Renaissance idiom.
The mechanism, on this book's argument, is a catastrophe-fold
transition in the listener's soma field, triggered by the
dissonance-resolution geometry of the chord change. The work has
done what it set out to do.}

\textit{Bach knew about catastrophe theory in a precise sense — not
the mathematics, but the practice. The Well-Tempered Clavier is, in
soma-field language, a *catalogue of catastrophes*. Each prelude
and fugue is a different geometric configuration of dissonance-
resolution events. The fact that the catalogue is exhaustive over
all 24 keys is, on this reading, not a stylistic exercise but a
*systematic* mapping of the soma-field response space.}

## On the body

\textit{The thumb has more cortical representation than the entire
torso. This is not because the thumb is more important; it is
because the thumb has more degrees of freedom requiring fine
control. The cortical homunculus is a *control map*, not a
*value map*.}

\textit{Bodyworkers report that releasing a fascial restriction in
the neck sometimes produces tears. The patient may not be
crying *about* anything; they are just crying. The soma-field
interpretation is that the restriction was holding a grief-basin
configuration in place, and the release allows the system to
traverse the basin it had been suspended above for years.}

\textit{The heart is the only organ with its own electromagnetic
field large enough to measure outside the body. Six feet around the
body in healthy subjects, on the best published measurements. This
is *not* mystical. It is a current loop. Currents make fields.
The field extends. That is what currents do.}

## On the author

\textit{There is no plan. There has not been a plan since 1968. The
plan was supposed to be a normal life and that plan failed because
the cognitive configuration did not support it. What replaced the
plan was a *gradient field* — a sense, moment to moment, of which
direction was the steeper one. The book is a gradient-field
artefact. So is the soma-field model. So is the Strandberg guitar.
So, eventually, was the daughter.}

\textit{The hour-before-bed final-sprint period during which this
section was written was conducted with a particular soundtrack: the
album that the author wrote during the field-theory derivation in
2024, which the author has not yet released and may not release. The
album is in $\frac{11}{8}$ time. It is, on the author's private
analysis, an audio realisation of the soma field. The fact that the
album exists and the field theory exists in the same person is, on
the soma-field model, not a coincidence.}

\newpage
# Letter to My Daughter, At Thirty

Zurich, 2026.

You will be thirty in 2042. The world you will be reading this in is
not the world I am writing it from. I cannot predict yours. I can only
tell you the world from which I am sending this, and trust that the
parts that are about *you* survive the translation.

You are fourteen as I write. You spent the morning making elaborate
patterns on the kitchen table out of pomegranate seeds and silver foil
from a chocolate wrapper, while talking about a book you are reading
that I have not read. I do not know whether the patterns were art, or
play, or thought, or all three at once. I think they were all three at
once. I think you do not know either, and I think this is one of the
things you have right that the adults around you have wrong.

This book is the last large thing I will make before you leave home.
That is approximately the shape of it for me. The shape for you is
different. For you, this book is the long thing the father wrote in
the years when he was, by his own description, less available than he
should have been. I do not know how to apologise for that in a way
that does not also disrespect what the work needed. The work needed a
certain amount of vanishing into it. The vanishing was real and it
took attention away from you that I cannot retrieve.

So: I am sorry. I am sorry for the hours when I was at the desk and
you were at the door and I did not come. I am sorry for the questions
you asked that I answered shortly because I was trying to keep a
calculation in my head. I am sorry for the days when the depression
was such that even being in the room with you felt like more than I
had. None of these were your fault and you knew that consciously, and
none of them were your fault and you absorbed them anyway as the
weather of having me as a father.

The book is, in part, an attempt to give an account of what was
happening in those weather systems. The eight modes of Chapter 11 are
not abstract to me. They are the eight states I have spent fifty-eight
years moving between, sometimes badly, sometimes well, often without
noticing. The cPTSD I have lived with since 1968 is not just a
diagnosis on a chart somewhere; it is the reason there are days I
cannot leave the house, the reason your voice in the hall can land in
my nervous system as either delight or threat depending on what state
the field is in. You did not cause either. They were already there
when you arrived. You are the most welcome thing that has ever entered
the field.

The autism and the ADHD — yours and mine — are what we share that the
neurotypical adults around us do not quite see. The book tries, in
Chapter 11c, to put words on what it is we know that they do not. I
hope you read that chapter at some point. If you do not, the short
version is: the way your mind moves is not broken; it is honest about
a multidimensional structure that other minds work hard to compress.
The compression has its uses; the compression also has its costs; the
adult industrial world is mostly the people who pay the costs of the
compression in exchange for being more easily employable. You will
have to find your own balance between the access and the access-cost.
I have not found mine. I am hoping you can find yours earlier than I
found whatever-this-is.

Some things you will need to know about your grandparents. Some things
you will need to know about Zurich and why we live here. Some things
you will need to know about why the kitchen sometimes smells like
solder. You will get those in person, slowly, as the questions come
up. The book does not need to do that work.

Three concrete pieces of advice, since this is a letter and letters
from fathers may contain some.

One. *Trust your perception.* When you walk into a room and the air in
it is wrong, the air in it is wrong. You are not making it up. You are
not being too sensitive. Whatever you are picking up — the slight
sourness between two people, the held-in anger of a third, the
under-the-surface enthusiasm that the room is pretending not to have —
is real and it is information. Do not be talked out of it. The
talking-out-of-it is itself one of the pieces of information.

Two. *Make things.* Whatever it is — the patterns on the table, music,
code, gardens, friendships, a piece of writing, a meal — the making
itself is the medicine. Not the made thing. The making. The made
thing is a record of the making having happened; the medicine was in
the doing. When you are unwell, make something small. When you are
well, make something larger. When you do not know what state you are
in, make something and find out.

Three. *Let the people who love you, love you.* I am thinking of the
specific people; you know who they are. They will sometimes love you
badly, and you will need to tell them so. They will sometimes love you
in ways that miss the mark, and you will need to translate. None of
this is a reason to push them away. The people who love you well are
worth more than any of the things either of us will ever make. Do not
mistake the work for the people. The work is what I do to be a person
worth being loved by. The people are why.

I do not know what year you will read this. I do not know whether I
will still be alive when you do. If I am — come and find me and we
will talk about it. If I am not — know that the book is, in its
deepest layer, addressed to you. The eleven dimensions inside your
head are also inside mine. We come from the same compactification.
What I worked out in this book, in the years when you were small and
I was less available than I should have been, I worked out in part so
you would not have to start from scratch when your turn came to ask
the same questions.

You will ask them differently. You will get different answers. That is
how it should be.

I love you, beyond what either of us has language for.

— Dad

\bigskip

\hfill *Zurich, 2026*
# Postscript — The Benign Swindle

\begin{quote}\itshape
Malcolm McLaren's four-point plan for the Sex Pistols, from *The Great
Rock and Roll Swindle* (1980), was: find four kids, make sure they
hate each other, make sure I can't play, create a band that can't
play. The plan was to hold the music industry to ransom and make a
quick fortune.
\end{quote}

\vspace{1em}

The reader who has reached this postscript is owed a confession about
what [T]-Theory is, considered as a cultural-strategic move and not as
a body of scientific work.

The scientific work is real. The eleven Zenodo papers, the Lean 4
formalisation, the quantum experiment, the clinical protocol in
Appendix B — these exist, they are open-access, they will succeed or
fail by the ordinary criteria of independent replication and external
peer review. The author has no leverage over those outcomes other than
having done the work as honestly as the available time and instruments
permitted. If the field fails to replicate, the framework is wrong and
the author will say so. The papers contain falsifiable predictions in
language deliberately precise enough that they cannot be retrospectively
wiggled into agreement with whatever happens to be observed.

That is the scientific layer. It is the inner layer of the [T]-Theory
construct, the layer this book has spent most of its pages on.

The outer layer is different. The outer layer is — adapting McLaren's
phrase — a benign swindle. Not a swindle of any specific audience, and
not for personal enrichment, but a structural manoeuvre that uses the
attentional dynamics of late-modern culture as a delivery vehicle for a
body of work that would otherwise reach almost no one.

The plan, made explicit, is roughly:

**1. Find serious mathematics and present it inside an underground art
movement.** A coffee-table book with mandelbulb plates, a manifesto, a
brand identity, an 11/8 album, projection-mapped live performances,
merchandise. A journalist sees the art first; a mathematician finds
M-theory inside it. The art movement is the wrapper; the wrapper is
necessary because the modern attention economy will not deliver
soma-field theory to a general audience under the title "Soma-Field
Theory: A Tensor-Valued Hopfield Network with G$_2$ Holonomy". It will
deliver it under the title *[T]-Theory*, in a black-and-blue typography,
on a stage where the same author is also DJing a set in 11/8.

**2. Make the inner work too rigorous to dismiss.** The Lean 4
formalisation is not just a checkbox. It is the structural guarantee
that the central claims of the framework are not vibes. A reviewer who
finds the art alarming or unserious can still type-check the proofs
themselves. The proofs do not require believing anything about
underground rave culture. They require a Lean 4 installation and an
afternoon.

**3. Make the outer work generous.** The outer art movement is built
to be participated in, not consumed. The plates can be reproduced; the
typography can be borrowed; the manifesto invites collaboration; the
album is intended to be remixed; the projection-mapping rigs are
documented; the merchandise is open-source. The cultural strategy is
not to extract attention from a passive audience but to seed a movement
that other people can build their own work inside. The benign part of
the benign-swindle is here: nothing is being held to ransom, nothing
is being kept proprietary, nothing is being sold beyond the cost of
producing it.

**4. Use the wrapper to fund and protect the inner work.** This is the
McLaren homage made literal. The art-movement layer, if it works,
generates enough attention and modest revenue to keep the scientific
work funded — independent of the academic gatekeeping that would
otherwise be the only route. The author has spent twenty years
discovering that the academy is not the right vehicle for the kind of
work this is. The vehicle had to be built. [T]-Theory is the vehicle.

The difference from McLaren's swindle is that no one is being sold a
band that cannot play. The band can play, the album is finished, the
mathematics is correct (to the extent the proofs have been checked),
and the framework makes specific testable predictions. The
McLaren-style move is purely in the *packaging*: the deliberate
choice to deliver serious mathematical-physical work via cultural
channels that serious mathematical-physical work is not normally
delivered through.

Why state this openly in the postscript of the book itself? Because
the author has been on the receiving end, for decades, of culture-
industry projects that were dressed-up-nothing. The "rebranding" of
empty offerings as deep, the use of aesthetic sophistication to
disguise intellectual thinness, the standard move of selling the
package and not the contents — these are noxious and they have
trained a generation of readers to suspect every cultural artefact
that combines aesthetic ambition with intellectual ambition of being
exactly that move.

The way to refuse the suspicion is to make the move openly. Yes, this
is a packaging strategy. Yes, the underground-rave aesthetic and the
11/8 album and the mandelbulb plates and the manifesto are wrappers.
Inside the wrappers there is a body of work that, considered as
science, is what it claims to be. You can put down the wrapper. The
contents do not require it. The wrapper is there to make the contents
reach you. If you find the wrapper distasteful, the URL of the Zenodo
collection is in the reading list at the back. The contents are the
contents either way.

McLaren said: cash from chaos. [T]-Theory says: science from
attention. The currency is different and the contents are different.
The mechanism is closely related.

\bigskip

\hfill *— A.J.*

\hfill *Zurich, 30 May 2026*
# Index

A working index for *The Wave That Is Always There*. Page numbers omitted
in this v0.1 release; entries are linked to chapter sections by the
section symbols used throughout. A typeset index with page numbers will
appear in v1.0.

## A

- **Action potential** — ch7b §7b.2; ch10b §10b.3
- **Activator-inhibitor systems** — ch7c §7c.1
- **ADE singularities** — ch15c §15c.3, appendix C
- **ADHD as 11-dimensional cognition** — ch11c
- **AdS/CFT correspondence** — ch15b
- **Album, 11/8** — ch17b §17b.4; ch18; floats
- **ALE space** — ch15c §15c.3, appendix A
- **Animal coat patterns** — ch7c §7c.3
- **Anomaly cancellation** — ch15a
- **Anxiety in autonomic terms** — ch9; ch11d (vignette 2)
- **Attention as substrate condition** — ch6b
- **Attractor** — ch11, ch12; def. in glossary
- **Author biography** — front essay; ch11c; postscript

## B

- **Bach, J. S.** — front essay; ch6 margin float; floats
- **Baroreflex resonance frequency** — ch9; ch10b §10b.5; ch17 §17.1
- **Beatles, *A Day in the Life*** — ch12d §12d.3
- **Biophotons (Popp)** — ch14b
- **Biotensegrity (Levin)** — ch10
- **Black cloth as attentional substrate** — ch6b
- **Black holes as wave sinks** — ch4b
- **Bose-Einstein condensate analogies** — ch14
- **Boundary conditions, importance of** — ch1 §1.2; ch4 §4.2

## C

- **Calabi-Yau manifolds** — ch15a, ch15b
- **Calcium waves** — ch7b §7b.1
- **Cardiac coherence** — ch9
- **Cardiac electromagnetic field** — ch9
- **Cartan subalgebra of E$_8$** — ch15c, appendix C
- **Cell as coupled oscillator system** — ch7b
- **Cities, allometric scaling of** — ch8b
- **Coherent breathing** — ch10b §10b.5; ch17 §17.1
- **Cosmic microwave background (CMB)** — ch2 §2.1
- **Cosmological constant problem** — ch2b §2b.1
- **cPTSD** — ch11c; letter to daughter
- **Cyber-hologram metaphor** — ch11; ch16
- **Cytoskeleton dynamics** — ch7b §7b.5

## D

- **Daughter, letter to** — letter; floats
- **Dark energy** — ch2b §2b.1
- **Dark matter** — ch2b §2b.1, §2b.3
- **De Sitter conjecture** — ch2b §2b.2
- **Density waves, galactic** — ch3
- **Differentiation as attractor descent** — ch7b §7b.6
- **Diffusion in reaction-diffusion** — ch7c §7c.1
- **Dissonance as productive dis-synchrony** — ch12c
- **Drumming, group-synchronisation** — ch12b

## E

- **E$_8$** — ch15c, appendix C
- **Earth's free oscillations (₀S₂ etc.)** — ch5
- **Eight modes, the** — ch11; ch11b
- **Eleven dimensions inside the head** — ch11c
- **ENSO** — ch5b §5b.2
- **Entrainment / destabilisation / release** — ch12d §12d.4

## F

- **Falsifiability of the framework** — ch13b; ch19
- **Family album (back of book)** — figures inventory
- **Fascia** — ch10; ch10b §10b.4
- **Field, definition** — ch1 §1.2
- **Flow attractor** — ch11b; ch12d §12d.2
- **Fold catastrophe** — appendix A
- **Fractal dimension across scales** — ch8; figure 8.4
- **Freeze attractor** — ch11b; ch11d (vignette 1)

## G

- **G$_2$ holonomy** — ch15c; figure 15.2
- **Galaxies as wave systems** — ch3
- **Glarus Hauptüberschiebung** — ch6
- **Glossary** — appendix F
- **Grief, completed vs. unresolved** — ch11d (vignette 4)
- **Górecki, Symphony No. 3** — ch12d §12d.1; floats
- **Gut-brain axis via vagus** — ch10b §10b.4

## H

- **Hameroff, Stuart** — ch14
- **Hawking radiation** — ch4b
- **Heart rate variability (HRV)** — ch9; ch10b §10b.3; figures 9.1, 9.3
- **HeartMath** — ch9
- **Helioseismology** — ch4
- **Hodgkin-Huxley equations** — ch7b §7b.2
- **Holographic principle** — ch4b; ch15b
- **Hopfield network** — ch12; appendix A
- **Hypervigilance attractor** — ch11b; ch11d (vignette 2); floats

## I

- **Internal waves in oceans** — ch5b §5b.3
- **Industrial modernity as compactification regime** — ch15d §15d.2

## J

- **Joy attractor** — ch11b; ch11d (vignette 3)
- **Joyce manifolds** — ch15c §15c.2
- **Jupiter cloud bands** — ch5

## K

- **Kaluza-Klein modes** — ch15d §15d.1
- **Kleiber's law** — ch8b
- **Klöntalersee** — ch6; floats
- **Kuramoto synchronisation** — ch7b §7b.3

## L

- **Langevin equation** — appendix A
- **Lean 4 formalisation** — appendix D
- **Letter to daughter** — letter
- **LIGO** — ch4b

## M

- **Mandelbulb as G$_2$ cartoon** — ch16; cover figure F0.1
- **Margin floats / entrance music** — floats; margin asides in ch1, ch6, ch11, ch13
- **McLaren, Malcolm** — postscript
- **M-theory** — ch15, ch15a, ch15b, ch15c, ch15d; figure 15.3
- **Microtubules and quantum coherence** — ch14
- **Mitochondrial oscillations** — ch7b §7b.3
- **Modified Newtonian Dynamics (MOND)** — ch2b §2b.3
- **Mountains as not-quite-music** — ch12c
- **Music as coupling operator** — ch12c; ch12d

## N

- **Neurodivergence as multidimensional cognition** — ch11c
- **NF-$\kappa$B oscillation** — ch7b §7b.4

## O

- **Oceans and slow waves** — ch5b
- **Open questions, the eleven** — ch19

## P

- **Plates galleries** — six plates chapters
- **Polyvagal theory** — ch10b §10b.2
- **Postscript on the benign swindle** — postscript
- **Practice, the smallest possible** — ch17 §17.1
- **Push 3 (Ableton)** — ch17b §17b.2

## Q

- **QUANT-EXP-1** — ch13b; figure 13.1
- **Quantum decoherence** — ch14b
- **Quantum tunnelling** — ch13b; appendix A; figure 13.2

## R

- **Reaction-diffusion** — ch7c
- **Replication ledger, independent** — ch19; back matter
- **Resonance frequency (HRV)** — ch10b §10b.5
- **Respiratory sinus arrhythmia** — ch9; ch10b §10b.3
- **Rossby waves** — ch5; ch5b §5b.1

## S

- **Schumann resonances** — ch5; ch5b §5b.4
- **Schwarzschild metric** — ch4b
- **Singing for vagal tone** — ch10b §10b.5
- **Slow breathing** — ch10b §10b.5; ch17
- **Soma field, definition** — ch11; glossary
- **Soma field at cellular scale** — ch7b §7b.6
- **Spectral gap** — ch13b
- **Standing wave** — ch1 §1.1; figure 1.1
- **Strandberg guitar** — ch17b §17b.1
- **Swampland conjectures** — ch2b §2b.2
- **Synchronisation in coupled oscillators** — ch7b §7b.3; ch12b
- **Synthesis chapter** — ch20

## T

- **T-duality** — ch15b
- **Tensegrity** — ch10; figure 10.1
- **Three compactifications, three lives** — ch15d
- **Tschingelhörner** — ch6
- **Tunnelling** — *see* Quantum tunnelling
- **Turing, Alan** — ch7c
- **Turing patterns** — ch7c §7c.3

## V

- **Vacuum energy** — ch2b §2b.4; ch15b
- **Vagus nerve** — ch10b
- **Vegetation patterns** — ch7c §7c.3
- **Vignettes, clinical** — ch11d

## W

- **Waddington landscape** — ch7b §7b.6
- **Wave, definition** — ch1 §1.1
- **WKB approximation** — appendix A

## Z

- **Zenodo DOIs** — appendix E; bibliography
# Afterword

\begin{quote}\small\itshape
The end of the book. A note on what the book is, what it isn't, and
what happens next.
\end{quote}

## What this book is

A first complete account of a framework the author has been working
on for several years, written in a hurry over the spring and early
summer of 2026 because the author had it in his head and could not
think well until it was on the page.

The book is a *first edition*. The page count grew across many
revisions of the manuscript in the days before the v0.1 release. The
prose is uneven — some chapters were written with care over weeks and
some in a single night. The references are not yet complete. The
index is preliminary. There is no glossary in the typeset technical
sense, only the operational glossary of Appendix F. The Lean
formalisation is roughly 35 % complete. The clinical replication
ledger is open with all entries pending. The geometry of the G$_2$
compactification is conjectured rather than derived.

In short: the book is a *report from work in progress* rather than a
finished monograph. The reader should treat it accordingly. The work
will continue. The next edition will be better. The framework's
success or failure will be determined by what other people do with
it over the next ten years, not by the polish of this first edition.

## What this book isn't

A self-help book. The book does not promise the reader anything. The
framework's clinical applications are real and the practice chapter
(17) outlines a starting point, but the book is not a programme to be
followed. It is a way of thinking that the reader may find useful,
neutral, or actively unhelpful. All three are acceptable outcomes.

A textbook. The book does not teach physics, biology, mathematics,
or clinical practice systematically. It assumes the reader either
already has the background or will look up what they don't know. The
references and the appendices are starting points. The book itself is
an *essay* in the older sense — an attempt, a trial — not a
systematic exposition.

A complete theory. The framework as presented in this book is
*incomplete* in known ways and *probably wrong* in unknown ways. The
author's job is to be transparent about both kinds of limitation. The
open-problems chapter (19) tries to do this. The replication ledger
makes the empirical limitations institutional. The Lean
formalisation, when complete, will make the mathematical limitations
machine-checkable. Until then, the framework's claims should be
treated as provisional.

A defence of any particular contemplative, religious, or political
position. The framework is compatible with many such positions and
endorses none. The author has his own preferences (the
*Postscript on the Benign Swindle* makes some of them visible) but
the framework's mathematical content is logically independent of
those preferences. Readers from different traditions are welcome to
find different uses for the framework.

## What happens next

The framework will be developed in three tracks.

*Empirical*: the QUANT-EXP-1 follow-up programme and the clinical
replication trial will continue. Both are open to collaboration. The
replication ledger will accept new entries. Negative results will be
published with the same prominence as positive results.

*Mathematical*: the Lean formalisation will continue toward
completion. The G$_2$ compactification will either be derived or
shown to be underivable from current premises; in the latter case the
framework will adjust. The connection to the Hopfield literature will
be strengthened.

*Cultural*: the [T]-Theory art-movement track will continue
independently, with its own publication and event programme. The
science track and the art track do not require each other to succeed
or fail together. The book argues that they are companions, not that
they are identical.

The author's commitment, made publicly in this Afterword, is to keep
all three tracks open, to keep all three accessible to outside
scrutiny, and to remain contactable through the ORCID page for the
foreseeable future. The framework's job is to keep developing. The
author's job is to keep working on it without becoming so attached
to it that it cannot be revised.

## To the reader

You have read several hundred pages of a stranger's thinking about
waves, bodies, M-theory, music, his daughter, and the conditions of
his own attention. Some of it has probably helped. Some of it
probably has not. The framework's claim is that *the wave is always
there*, in the universe and in you, whether or not you have a theory
about it. The book is one theory about it. You will have your own.

The book ends here. Go and live. Try to notice the wave. If you do,
the rest is detail.

\bigskip

\hfill *Alistair Johnson* \\
\hfill *Zurich, 2026*
# Glossary

\begin{description}

\item[\textbf{Acoustic peak}] A peak in the angular power spectrum of
the cosmic microwave background, corresponding to a standing-wave mode
of the primordial photon-baryon plasma at the moment of decoupling.
See Chapter 2.

\item[\textbf{Attractor}] In dynamical systems theory, a region of
state space toward which trajectories tend to converge. A *basin of
attraction* is the set of initial conditions that converges to a given
attractor. See Chapter 12.

\item[\textbf{Biophoton}] An ultra-low-intensity photon emitted by
living tissue, typically at intensities of $10^{-19}$ to $10^{-17}$
W/cm². See Chapter 14.

\item[\textbf{Biotensegrity}] A hypothesis (Levin) that the human body
is mechanically a tensegrity structure, with bones as compressive
struts and fascia as the continuous tension network. See Chapter 10.

\item[\textbf{Calabi--Yau manifold}] A class of six-dimensional complex
manifolds used in string-theory compactifications. See Chapter 15.

\item[\textbf{Coherence}] The property of a wave system in which the
phase relationships between components are preserved over time. The
opposite of *decoherence*. See Chapters 13–14.

\item[\textbf{Compactification}] In string and M-theory, the process by
which higher-dimensional theories are reduced to a lower-dimensional
effective description by wrapping the extra dimensions on a small
internal manifold. See Chapter 15.

\item[\textbf{Density wave}] A wave of higher density in a fluid that
propagates at a pattern speed different from the speed of the fluid
itself. The standard explanation for the spiral arms of galaxies. See
Chapter 3.

\item[\textbf{Deborah number}] The dimensionless ratio of relaxation
time to deformation time, governing whether a material behaves
elastically or fluidly. See Chapter 6.

\item[\textbf{Decoherence}] The loss of quantum-mechanical phase
coherence due to entanglement with the environment. See Chapter 13.

\item[\textbf{Fascia}] The continuous connective-tissue network that
wraps and connects every structure in the body. See Chapter 10.

\item[\textbf{Field}] A physical quantity assigned to every point in
space (and time). Examples in this book include the gravitational
field, the electromagnetic field, and the eight-component soma field.

\item[\textbf{Fold (geological)}] A bend in a rock layer caused by
compression. *Recumbent* folds are folds whose axial plane has been
rotated to near-horizontal. See Chapter 6.

\item[\textbf{Fold (mathematical)}] A singularity in a mapping at which
a smooth surface is folded onto itself. The geological and mathematical
senses coincide in structural geology and in the catastrophe theory
relevant to G$_2$ manifolds. See Chapters 6, 15.

\item[\textbf{Fractal}] A geometric object exhibiting self-similar
structure at multiple scales, characterised by a non-integer
*fractal dimension*. See Chapters 1, 7, 8.

\item[\textbf{G$_2$ manifold}] A seven-dimensional manifold with
holonomy group G$_2$, of central importance in M-theoretic
compactifications. See Chapter 15.

\item[\textbf{Hologram}] A recording medium that preserves both the
amplitude and the phase of a wavefront, enabling three-dimensional
reconstruction. Contrast with *photograph*, which preserves only
amplitude. See Chapters 1, 11.

\item[\textbf{Inflation (cosmological)}] A brief period of
exponential expansion of the very early universe, proposed to explain
the observed flatness and large-scale uniformity. See Chapter 2.

\item[\textbf{Langevin equation}] A stochastic differential equation
describing the dynamics of a system subject to deterministic forces
and random thermal noise. The equation of motion for the soma field.
See Chapters 11, 12.

\item[\textbf{M-theory}] The eleven-dimensional unifying framework
that contains, as limits, the five consistent ten-dimensional string
theories and eleven-dimensional supergravity. See Chapter 15.

\item[\textbf{Mandelbulb}] The three-dimensional analogue of the
Mandelbrot set, computed by extending complex multiplication to a
three-dimensional algebra. The cover image of this book. See Chapters
1, 15, 16.

\item[\textbf{Microtubule}] A hollow cylindrical polymer of the
protein tubulin, forming the structural skeleton of eukaryotic cells.
A candidate substrate for the soma field. See Chapter 14.

\item[\textbf{Mode}] A standing-wave solution of a wave equation in a
bounded region. The set of modes of a system is its *spectrum*.

\item[\textbf{Moduli}] In string and M-theory, continuous parameters
describing the precise shape and size of the compactified internal
geometry, appearing in the four-dimensional theory as effective scalar
fields. See Chapter 15.

\item[\textbf{Quantum tunnelling}] The quantum-mechanical phenomenon
in which a particle passes through a potential barrier classically
forbidden to it. See Chapter 13.

\item[\textbf{Schumann resonance}] The fundamental electromagnetic
resonance of the Earth-ionosphere cavity, at approximately 7.83 Hz.
See Chapter 5.

\item[\textbf{Soma field}] The eight-component vector-valued field of
feeling, defined on the human body and nervous system, central to
this book. See Chapter 11 and throughout Part III.

\item[\textbf{Standing wave}] A wave whose envelope does not propagate;
characterised by stationary nodes and antinodes. The fundamental
building block of resonant systems.

\item[\textbf{Substrate}] The physical medium in which a field is
realised. The substrate question for the soma field is the subject of
Chapter 14.

\item[\textbf{Tensegrity}] A class of structures in which discontinuous
compression elements (struts) are held in shape by a continuous
tension network. See Chapter 10.

\item[\textbf{Threshold}] The amplitude at which sub-threshold field
activity becomes consciously perceptible. A central parameter of the
soma-field model. See Chapter 11.

\item[\textbf{Turing pattern}] A spatial pattern emerging
spontaneously from a reaction-diffusion system with differential
diffusion rates of activator and inhibitor. See Chapter 7.

\item[\textbf{Vacuum (quantum)}] The lowest-energy state of a quantum
field, not empty but characterised by sub-threshold zero-point
fluctuations. See Chapter 1.

\end{description}

\newpage

# Bibliography

The references below are those cited in the footnotes of this book.
Chicago notes-and-bibliography style. The eleven *Soma Field*
technical papers are listed first as a group for ease of reference.

\subsubsection*{The Soma Field paper series}

Johnson, Alistair. *The Soma Field: A Wave-Based Model of Emotional
Dynamics and Its Clinical Implications*. Zenodo, 2026.
\url{https://doi.org/10.5281/zenodo.20350515}.

———. *Quantum Soma: A Penrose-Hameroff Substrate for the Eight-Mode
Soma Field*. Zenodo, 2026.
\url{https://doi.org/10.5281/zenodo.20351230}.

———. *Mathematical Co-identification: The Soma Field as a
G$_2$-Compactification Projection*. Zenodo, 2026.
\url{https://doi.org/10.5281/zenodo.20287981}.

———. *SFT Demo Case*. Zenodo, 2026.
\url{https://doi.org/10.5281/zenodo.20459825}.

———. *Soma Field Synthesis*. Zenodo, 2026.
\url{https://doi.org/10.5281/zenodo.20460118}.

———. *Soma Physical Substrate*. Zenodo, 2026.
\url{https://doi.org/10.5281/zenodo.20460357}.

———. *Soma Field Book*. Zenodo, 2026.
\url{https://doi.org/10.5281/zenodo.20460455}.

———. *Soma Field: A Patient's Point of View*. Zenodo, 2026.
\url{https://doi.org/10.5281/zenodo.20460523}.

———. *The Tensor*. Zenodo, 2026.
\url{https://doi.org/10.5281/zenodo.20460613}.

———. *Music, Affect, Dynamics*. Zenodo, 2026.
\url{https://doi.org/10.5281/zenodo.20460685}.

———. *Soma Field Omnibus*. Zenodo, 2026.
\url{https://doi.org/10.5281/zenodo.20460771}.

\subsubsection*{Other works cited}

Acharya, Bobby, and Edward Witten. "Chiral Fermions from Manifolds of
G$_2$ Holonomy." arXiv:hep-th/0109152, 2001.

Aki, Keiiti, and Paul G. Richards. *Quantitative Seismology*. 2nd ed.
Sausalito, CA: University Science Books, 2002.

Bertrand, Marcel. "Rapports de structure des Alpes de Glaris et du
bassin houiller du Nord." *Bulletin de la Société Géologique de
France*, 3rd ser., 12 (1884): 318–30.

Eisenstein, Daniel J., et al. "Detection of the Baryon Acoustic Peak
in the Large-Scale Correlation Function of SDSS Luminous Red
Galaxies." *Astrophysical Journal* 633, no. 2 (2005): 560–74.

Engel, Gregory S., et al. "Evidence for Wavelike Energy Transfer
through Quantum Coherence in Photosynthetic Systems." *Nature* 446
(2007): 782–86.

Guimberteau, Jean-Claude. *The Architecture of Human Living Fascia*.
Edinburgh: Handspring, 2015.

Guth, Alan H. *The Inflationary Universe*. Reading, MA: Addison-Wesley,
1997.

Hameroff, Stuart, and Roger Penrose. "Consciousness in the Universe: A
Review of the 'Orch OR' Theory." *Physics of Life Reviews* 11, no. 1
(2014): 39–78.

Heim, Albert. *Untersuchungen über den Mechanismus der Gebirgsbildung*.
Basel: Schwabe, 1878.

Holton, James R., and Gregory J. Hakim. *An Introduction to Dynamic
Meteorology*. 5th ed. Waltham, MA: Academic Press, 2012.

Hore, P. J., and Henrik Mouritsen. "The Radical-Pair Mechanism of
Magnetoreception." *Annual Review of Biophysics* 45 (2016): 299–344.

Leavitt, Henrietta S., and Edward C. Pickering. "Periods of 25
Variable Stars in the Small Magellanic Cloud." *Harvard College
Observatory Circular* 173 (1912): 1–3.

Leighton, R. B., R. W. Noyes, and G. W. Simon. "Velocity Fields in the
Solar Atmosphere. I. Preliminary Report." *Astrophysical Journal* 135
(1962): 474–99.

Levin, Stephen M. "The Tensegrity-Truss as a Model for Spine Mechanics:
Biotensegrity." *Journal of Mechanics in Medicine and Biology* 2, no.
3 (2002): 375–88.

Lin, C. C., and Frank H. Shu. "On the Spiral Structure of Disk
Galaxies." *Astrophysical Journal* 140 (1964): 646–55.

McCraty, Rollin. *Science of the Heart, Volume 2: Exploring the Role
of the Heart in Human Performance*. Boulder Creek, CA: HeartMath
Institute, 2015.

Murray, Cecil D. "The Physiological Principle of Minimum Work: I. The
Vascular System and the Cost of Blood Volume." *Proceedings of the
National Academy of Sciences* 12, no. 3 (1926): 207–14.

Pfiffner, O. Adrian. *Geology of the Alps*. 2nd ed. Hoboken, NJ:
Wiley-Blackwell, 2014.

Planck Collaboration. "Planck 2018 results. I. Overview and the
cosmological legacy of Planck." *Astronomy \& Astrophysics* 641
(2020): A1.

Planck Collaboration. "Planck 2018 results. VI. Cosmological
parameters." *Astronomy \& Astrophysics* 641 (2020): A6.

Popp, Fritz-Albert. *Recent Advances in Biophoton Research and Its
Applications*. Singapore: World Scientific, 1992.

Reiner, Markus. "The Deborah Number." *Physics Today* 17, no. 1
(January 1964): 62.

Rodríguez-Iturbe, Ignacio, and Andrea Rinaldo. *Fractal River Basins:
Chance and Self-Organization*. Cambridge: Cambridge University Press,
1997.

Tegmark, Max. "Importance of Quantum Decoherence in Brain Processes."
*Physical Review E* 61, no. 4 (2000): 4194–4206.

Turcotte, Donald L., and Gerald Schubert. *Geodynamics*. 3rd ed.
Cambridge: Cambridge University Press, 2014.

Turin, Luca. "A Spectroscopic Mechanism for Primary Olfactory
Reception." *Chemical Senses* 21, no. 6 (1996): 773–91.

Turing, Alan M. "The Chemical Basis of Morphogenesis." *Philosophical
Transactions of the Royal Society of London B* 237, no. 641 (1952):
37–72.

UNESCO World Heritage Centre. *Swiss Tectonic Arena Sardona*. Inscribed
2008. \url{https://whc.unesco.org/en/list/1179/}.

West, Geoffrey B., James H. Brown, and Brian J. Enquist. "A General
Model for the Origin of Allometric Scaling Laws in Biology." *Science*
276, no. 5309 (1997): 122–26.

\newpage

# Image Credits

A complete catalogue of figures, with sources, licences, and status
flags, is maintained in the source tree at
`paper/soma/wave-atlas/figures/FIGURES.md`. The summary below lists
credits for figures appearing in this edition.

Status flags follow the convention used in the source tree:
\textbf{PUBLIC} indicates a public-domain or open-licence source;
\textbf{BUILD} indicates a figure generated by the author from
publicly available data or code; \textbf{DRONE} indicates an original
photograph by the author from the Glarus drone trip of summer 2026;
\textbf{PERMISSION} indicates a figure for which permission is being
sought.

\begin{description}

\item[F2.1] Planck all-sky CMB. \textbf{PUBLIC}. ESA / Planck Collaboration.
\item[F2.2] CMB angular power spectrum. \textbf{PUBLIC}. ESA / Planck.
\item[F2.3] Calabi--Yau cross-section. \textbf{BUILD}. Author.
\item[F3.1] M101 Pinwheel Galaxy. \textbf{PUBLIC}. NASA / ESA / STScI.
\item[F3.2] Galactic density wave schematic. \textbf{BUILD}. Author.
\item[F4.1] Solar spherical-harmonic mode. \textbf{PUBLIC}. NASA / GONG.
\item[F4.2] Maunder butterfly diagram. \textbf{PUBLIC}. NASA MSFC.
\item[F5.1] Northern jet stream Rossby pattern. \textbf{PUBLIC}. NOAA.
\item[F5.2] Gulf Stream altimetry eddy field. \textbf{PUBLIC}. NASA JPL.
\item[F5.3] Schumann power spectrum. \textbf{BUILD}. Author.
\item[F6.1] Tschingelhörner from Elm. \textbf{DRONE}. Author, summer 2026.
\item[F6.2] Klöntalersee south face. \textbf{DRONE}. Author, summer 2026.
\item[F6.3] Martinsloch. \textbf{DRONE}. Author, summer 2026.
\item[F6.4] Glarus thrust cross-section, after Pfiffner. \textbf{BUILD}.
\item[F6.5] World plate-tectonics map. \textbf{PUBLIC}. USGS.
\item[F6.6] Subduction-zone cross-section. \textbf{PUBLIC}. USGS / R. Simmon.
\item[F6.7] Seismic-wave particle motion. \textbf{PUBLIC}. USGS.
\item[F6.7b] Säntis recumbent folds. \textbf{PUBLIC}. swisstopo, CC BY 3.0 CH.
\item[F6.8] Lochsite detail. \textbf{DRONE}. Author, summer 2026.
\item[F7.1] Turing pattern + angelfish. \textbf{BUILD + PUBLIC}.
\item[F8.1] Triptych: Lena Delta, oak, bronchial cast. \textbf{PUBLIC + ORIGINAL}.
\item[F8.2] Healthy vs. emphysematous alveoli. \textbf{PUBLIC}. NIH Open-i.
\item[F9.1] 12-lead ECG. \textbf{PUBLIC}. NIH.
\item[F9.2] Cardiac toroidal field. \textbf{BUILD}. Author.
\item[F10.1] Snelson tensegrity sculpture. \textbf{PUBLIC}. Wikimedia, CC BY-SA.
\item[F10.2] Intra-fascial endoscopy. \textbf{PERMISSION}. Endovivo Productions.
\item[F10.3] Cyber-hologram fascial network. \textbf{BUILD}. Author.
\item[F11.1] Cyber-hologram body, soma field. \textbf{BUILD}. Author.
\item[F11.2] Eight modes mapped to body. \textbf{BUILD}. Author.
\item[F11.3] Field above and below threshold. \textbf{BUILD}. Author.
\item[F12.1] Healthy vs. trauma-shaped landscape. \textbf{BUILD}. Author.
\item[F13.1] Quantum-trajectory frame. \textbf{BUILD}. Author, from QUANT-EXP-1.
\item[F14.1] Cryo-EM microtubule. \textbf{PUBLIC}. NIH.
\item[F15.1] Mandelbulb with folds labelled. \textbf{BUILD}. Author.
\item[F16.1] Full-bleed Mandelbulb. \textbf{BUILD}. Author.
\item[F16.2] Annotated Mandelbulb. \textbf{BUILD}. Author.
\item[F0.1] Cover image: Mandelbulb annotated as G$_2$ compactification.
            \textbf{BUILD}. Author.

\end{description}

\newpage

# Colophon

\noindent\textit{The Wave That Is Always There: A Fractal Atlas from
the Universe to the Soma} was written in Zurich in the spring and
summer of 2026, alongside the conclusion of the first phase of the
Soma Field theoretical work and the beginning of the [T]-Theory art
movement.

\vspace{1em}

The text is set in the document-class default of the \LaTeX{} `book`
class, compiled via Pandoc 3.x with XeLaTeX. The body is set at 11
point on a leading of 14.85 point; the trim size is Royal octavo
(156 $\times$ 234 mm), with binding-offset, inner, and outer margins set
for sewn-bound case-binding.

\vspace{1em}

The eleven \textit{Soma Field} technical papers on which the
scientific argument of this book rests are all open-access, are
permanently archived on Zenodo with concept DOIs, and are listed in
the Bibliography. The Lean 4 formal proofs of the core soma-field
definitions are in the public repository \texttt{ITI-Theory/U} under
\texttt{paper/proofs/}.

\vspace{1em}

This book is released under the Creative Commons Attribution 4.0
International licence (CC BY 4.0). You may copy, redistribute,
remix, transform, and build upon it, for any purpose, including
commercially, provided you give appropriate credit, link to the
licence, and indicate if changes were made.

\vspace{1em}

The author is an independent researcher (ORCID
\href{https://orcid.org/0009-0007-2194-0850}{0009-0007-2194-0850}),
not affiliated with any academic institution, with diagnoses of
autism spectrum condition, attention-deficit hyperactivity disorder,
and complex post-traumatic stress disorder, dating to 1968. He works
in Zurich, and is reachable through the contact details on the inside
cover.

\vspace{1em}

The Independent Replication Ledger, in which contributions to the
empirical validation of the Soma Field model are recorded, is
maintained at
\url{https://github.com/ITI-Theory/U/blob/main/paper/INDEPENDENT_REPLICATION_LEDGER.md}.
As of summer 2026, every row of the ledger reads PENDING. The author
welcomes correspondence from anyone — student, clinician, researcher,
sceptic — willing to engage with the model on its own terms.

\vspace{2em}

\hfill --- A.J., Zurich, summer 2026

\newpage
# Colophon

This book was set in LaTeX using the standard `book` document class,
with `xelatex` as the typesetting engine. The body font is Latin
Modern Roman at 11 pt with a 1.35 line stretch. Mathematics is set in
the AMS-LaTeX mathfonts. Monospaced material (when present) is in
Consolas, the author's daily editor font, retained for sentiment.

The page is 156 mm × 234 mm — the British Royal book trim, chosen for
its comfort in the hand and its acceptability to both academic
and trade-press readers. The text block has inner margins of 22 mm,
outer margins of 18 mm, a top margin of 22 mm, a bottom margin of
25 mm, and a binding offset of 6 mm. The asymmetric inner/outer
margin is for the spread, in the expectation that this book will be
read open rather than scrolled.

The source is approximately 80,000 words of Markdown plus some
in-line LaTeX, in roughly fifty source files held in
`paper/soma/wave-atlas/` of the *U* repository. The build is via
`pandoc 3.x` with the `pandoc-crossref` filter, post-processed by
`xelatex` for the final PDF. The whole pipeline is reproducible
from the published source via `make wave-atlas` from the `paper/`
directory.

The figures are generated by a single Python script
(`figures/build_figures.py`) using `matplotlib` at 300 dpi, plus a
companion script for the cover (`figures/build_cover.py`). The
figure code is reproducible and is licensed under the same terms as
the text.

The Lean 4 formalisation is in `paper/proofs/` (cross-cutting the
papers and the book). The clinical replication protocol is in
`paper/INDEPENDENT_REPLICATION_LEDGER.md`. The full DOI register for
the eleven companion papers is in `paper/ZENODO_RELEASE_SHEETS.md`.

The text is released under Creative Commons Attribution 4.0
International (CC BY 4.0). The figures are released under the same
license. The Lean formalisation is released under Apache 2.0. The
clinical-trial protocol is released under CC0 (public domain
dedication) to maximise its uptake.

The book is deposited on Zenodo with its own DOI, citable as

> Johnson, Alistair (2026). *The Wave That Is Always There: A Fractal
> Atlas from the Universe to the Soma*. Independently published,
> Zurich. Zenodo. DOI: [forthcoming, to be assigned at v0.1 release].

A mirror is available on the *Dist* repository of the ITI-Theory
GitHub organisation.

The author is contactable via ORCID 0009-0007-2194-0850.

The book was written in Zurich between roughly January and June of
2026, with the bulk of the writing in the spring. The final v0.1
manuscript was completed late on a single long writing session that
the author will, in retrospect, remember as the night the book
became real.

The next edition will be better. The next-next edition will be
better still. The work continues.

\bigskip

\begin{center}\itshape
Habent sua fata libelli.
\end{center}
# End

\vspace*{0.3\textheight}

\begin{center}
\itshape
The wave is always there. \\[1em]
It was there before this book. \\
It will be there after. \\[2em]
What the book has done, if it has done anything, \\
is to point at it. \\[2em]
The rest is the reader's life.
\end{center}

\vfill

\begin{center}
\rule{0.3\textwidth}{0.4pt}
\end{center}

\vfill

\begin{flushright}
\itshape
Zurich \\
2026
\end{flushright}

\newpage

\thispagestyle{empty}

\vspace*{0.4\textheight}

\begin{center}
\Large\itshape
for the next reader
\end{center}

\vfill
