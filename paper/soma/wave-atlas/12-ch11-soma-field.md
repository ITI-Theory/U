# Chapter 11 — The Soma Field

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
