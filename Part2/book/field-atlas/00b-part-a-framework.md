# Part A — The Framework

\begin{quote}\itshape
Before you open the atlas, you need to know what you are looking at.
Part A is five short chapters. They explain the one equation that governs
everything in Part B, the 11-dimensional architecture it lives in,
and the zoom dial that lets you turn the equation from a description of
a quantum particle into a description of a galaxy — without changing
a single symbol.

If you already know what a Green's function is, skim Part A.
If you do not, read it. Part B will not make sense without it.
\end{quote}

\vspace{2em}

---

# A1 — What Is a Wave?

\begin{quote}\itshape
A wave is a disturbance that moves. The medium it moves through is a field.
The field is not the wave; the field is what the wave moves in.
This distinction is everything.
\end{quote}

\vspace{1em}

---

![A photograph of ripples on the surface of the Klöntalersee, Glarus,
Switzerland. The water is the medium (the field). The ripples are the
waves. If you remove the water, the ripples disappear. If you remove
the ripples, the water remains. *(Author's photograph, 2026)*](figures/klontalersee-ripples-placeholder.png){width=90%}

---

Pick up a stone and drop it in still water. A circle of ripples
propagates outward from the point of impact. The ripples are not the
water moving. If you watch a single cork on the surface, it bobs up
and down — it does not travel to the shore. The *water* is not moving
outward; the *disturbance* is moving outward. This distinction is the
entire difference between a field and its waves.

The water is the **field**: a medium defined at every point in space.
The ripples are **waves**: propagating disturbances *in* the field.
The field existed before the stone fell in. It will exist after the
ripples die away. The waves are temporary; the field is persistent.

This is the first principle of this book:

> **The field is primary. The wave is secondary. You cannot have waves
> without a field; you can have a field without waves.**

Modern physics is entirely built on this principle. There is no such
thing as an electron without the electron field. There is no photon
without the electromagnetic field. There is no graviton — and no
gravity — without the spacetime metric field. Every particle in the
standard model is an excitation of an underlying field.

The soma-field model follows the same principle. There is no emotion
without the soma field. The emotion is not the field; the emotion is a
disturbance propagating in the field. The field persists when you are
not feeling anything in particular; the emotion arises when a
perturbation propagates through it.

This is why music works. A sound wave — a pressure wave in the air —
enters the ear and becomes a perturbation in the cochlear fluid, which
becomes a neural wave in the auditory cortex, which becomes a
disturbance in the soma field. At each step, a wave in one medium
excites a wave in the next. The cascade is the experience.

---

![The same wave pattern at three physical scales: (left) water surface
ripple, (centre) seismic P-wave, (right) neural action potential.
Different media, different amplitudes, different speeds. Same equation.](figures/FA_three_waves.png){width=95%}

---

## A1.1  The field does not move

The most important sentence in Part A is: *the field does not move when
a wave passes through it*.

A sound wave is a pressure wave: alternating compressions and
rarefactions moving through the air. The air molecules are not moving
from source to listener. Each molecule oscillates in place; the
*pattern* of oscillation propagates. If you light a candle in a room
and make a loud sound, the flame flickers — but it does not blow toward
the loudspeaker. The flame is moved by the local pressure variation
at its location, not by any net movement of air.

This matters for the soma-field model. When a traumatic memory is
activated, the soma field does not "go somewhere". A pattern of
excitation propagates through it. The field is the same field it
always was; only its configuration has changed. This is why the
concept of "emotional healing" is not magical. It is a configuration
change in a persistent field — the same kind of change that happens
when a ripple dies away and the water returns to flat.

---

# A2 — What Is a Green's Function?

\begin{quote}\itshape
The Green's function is the field's answer to a question.
The question is: what happens here, if I poke there?
The answer is G.
\end{quote}

\vspace{1em}

---

![A speaker cone in a room. The cone is the source (the "poke").
The sound field in the room is G: the response everywhere due to
a unit impulse at the speaker location. If you know G, you know
exactly how sound propagates from any source to any listener in this
room — for any source. *(OpenStax University Physics 2e, Fig 17.1 adapted)*](figures/speaker-room-greens-placeholder.png){width=85%}

---

George Green (1793–1841) was a self-taught English mathematician
who worked in his father's bakery in Nottingham. In 1828 he published
a pamphlet — paid for by subscription because no university would
publish it — introducing what he called *potential functions* and their
theory. The mathematical object that now bears his name is the central
tool of mathematical physics.

The **Green's function** $G(x, x')$ of a differential equation is:

> *The solution at point $x$ when the source term is a unit impulse at
> point $x'$.*

If the equation is $\mathcal{L} \phi = \rho$ (where $\mathcal{L}$ is
a differential operator, $\phi$ is the field, and $\rho$ is the
source), then:

$$\mathcal{L}_x G(x, x') = \delta(x - x')$$

Once you know $G$, you know the solution for *any* source distribution
$\rho$:

$$\phi(x) = \int G(x, x') \rho(x') \, dx'$$

The integral sums up contributions from all source points $x'$, each
weighted by how strongly that source excites the field and how far
the excitation propagates to the observation point $x$.

## A2.1  What G tells you

$G(x, x')$ is, literally, the field's **impulse response**: how the
field responds to being poked at $x'$, as measured at $x$.

This is the language of acoustics (the room's impulse response), of
seismology (the Earth's response to a seismic source), of
electromagnetism (the field at $x$ due to a charge at $x'$), and
of neuroscience (the neural response at location $x$ due to a
stimulus at $x'$).

Every discipline has its own name for G:
- Acoustics: **impulse response** or **room response**
- Seismology: **seismic Green's function**
- Electromagnetism: **propagator** or **Coulomb kernel**
- Quantum field theory: **Feynman propagator**
- Neuroscience: **transfer function** or **receptive field**
- This book: **the spine** — the thread that connects every point
  of the field to every other point.

Same object. Different names. Same equation.

---

![Six identical mathematical symbols — G(x,x') — with six different
photographs beneath them: (1) a speaker in a room, (2) a seismograph,
(3) an electric field line between two charges, (4) a Feynman diagram,
(5) a receptive field map of a visual cortex neuron, (6) the author
dropping a stone in the Klöntalersee. Same G. Different contexts.
*(Schematic; illustrative)*](figures/six-greens-functions-placeholder.png){width=95%}

---

## A2.2  Why G is the SHO

Here is the central theoretical result of this book, in two lines:

The Green's function of the Helmholtz equation
$(\nabla^2 + k^2) G(x,x') = \delta(x-x')$
satisfies the **Simple Harmonic Oscillator equation** in its
source variable $x'$.

This means: the field's response to a unit impulse at $x'$ *is itself
an oscillator*. String theory requires a Simple Harmonic Oscillator at
every worldsheet point. That SHO is not a material object — it is the
field's impulse response. The string is G.

The full implications are in Part B, Scale 0. For now, file this away:

> **G is the oscillator. The oscillator is G. They are the same object.**

---

# A3 — The 11 Dimensions

\begin{quote}\itshape
Eleven dimensions sounds like science fiction.
It is not. It is the minimum number of degrees of freedom needed to
describe a living organism in interaction with its environment.
Count them.
\end{quote}

\vspace{1em}

---

![A human body overlaid with a schematic showing the four subspaces.
D1-D4 (blue): the body's position in 3D space + time.
D5-D7 (orange): the electromagnetic field surrounding the body.
D8 (red): the limbic regulatory axis (a line segment).
D9-D11 (green): the cortical information-processing network.
Total: 4 + 3 + 1 + 3 = 11.
*(Schematic; see MTheoryIsomorphism.lean, Chapter 11)*](figures/11d-body-schematic-placeholder.png){width=85%}

---

A person occupies space. That is 3 dimensions. They persist through
time. That is 1 more. The body is in 4D spacetime: **D₁–D₄**.

A person generates an electromagnetic field. The nervous system —
86 billion neurons firing in patterns — produces a macroscopic
electromagnetic field measurable by MEG and MCG. This field occupies
3 spatial dimensions: **D₅–D₇**. These are not hidden dimensions; they
are the endogenous EMF. McFadden (2002) calls it the CEMI field.
It is real. It is detectable. It is not in M-theory's Planck-scale
tubes; it is around your head right now.

A person has a limbic system. The limbic system is the brain's
homeostatic regulation circuit: it modulates the entire cortex based
on survival state (calm, fight, flight, freeze). In the 11D model,
the limbic system occupies a **1-dimensional axis** — a line segment
with two endpoints (somatic at one end, cortical at the other): **D₈**.
This is the orbifold of Horava-Witten M-theory, reduced to
physiological scale.

A person has a cortex. The cerebral cortex is a 3-dimensional
information-routing network — a distributed processor that integrates
sensory inputs, routes attention, and generates the outputs we call
thoughts and decisions: **D₉–D₁₁**.

Count: 4 + 3 + 1 + 3 = **11**.

This is not a coincidence with M-theory. It is the minimum
dimensionality required to describe a living system with body,
field, homeostasis, and mind. M-theory arrived at 11 from the
top down (mathematical consistency). This book arrived at 11 from
the bottom up (counting the degrees of freedom of a living organism).
The fact that they agree is the isomorphism at the heart of this work.

## A3.1  The key distinction from M-theory

In M-theory, dimensions 5–11 are **hidden**: compactified at
$10^{-35}$ m, invisible at all accessible energies.

In this model, dimensions 5–11 are **invisible but not hidden**.
They are not curled up. They are functional layers of a living system,
each operating at human scale. The CEMI field (D₅–D₇) is invisible
to the naked eye but measurable by instruments. The limbic drive
(D₈) is invisible but measurable by HRV monitors and hormone assays.
The cortical configuration (D₉–D₁₁) is invisible but measurable by
fMRI and EEG.

M-theory hid its extra dimensions at the Planck scale.
This model hides them in plain sight, inside the body.

---

# A4 — The Zoom Operator

\begin{quote}\itshape
The same 11 dimensions apply at every scale.
At the cellular scale, D₅–D₇ is a bioelectric field.
At the geological scale, D₅–D₇ is a seismic wave field.
At the galactic scale, D₅–D₇ is a gravitational field.
The zoom operator Λ changes the label without changing the equation.
\end{quote}

\vspace{1em}

---

![The zoom dial: a horizontal slider from 10⁻³⁵ m (left) to 10²⁶ m
(right), with 20 tick marks. The slider knob can be positioned at
any tick. Below each tick: a thumbnail image of the physical substrate
at that scale. Below all thumbnails: the same equation, unmoving.
*(Schematic; Chapter 1b)*](figures/zoom-dial-horizontal-placeholder.png){width=95%}

---

The zoom operator $\Lambda(\sigma)$ is a **dependent type constructor**:
it takes a scale index $\sigma \in \{0, 1, \ldots, 20\}$ and
instantiates the universal field equation with the boundary conditions,
wavenumber $k(\sigma)$, and substrate type appropriate to that scale.

The equation is always:

$$(\nabla^2 + k(\sigma)^2)\, G_\sigma(x, x') = \delta(x - x')$$

The zoom operator changes $k(\sigma)$, changes the physical
interpretation of $x$, and changes the rank $N(\sigma)$ of the
mind matrix. It does not change the equation.

**Physical scaling** (D₁–D₇): as $\sigma$ increases, the
characteristic length $\ell(\sigma) \sim k(\sigma)^{-1}$ increases
from $10^{-35}$ m to $10^{26}$ m. The substrate changes. The field
changes its physical realisation. The equation holds.

**Mind scaling** (D₉–D₁₁): as $\sigma$ increases, the rank $N$
of the mind matrix scales with the number of coupled agents at
that scale. For a single cell ($\sigma = 5$): $N \sim 10^4$ (synaptic
connections). For a brain ($\sigma = 6$): $N \sim 10^{14}$. For a
galaxy ($\sigma = 16$): $N \sim 10^{11}$ (stars). For the cosmic web
($\sigma = 20$): $N \to \infty$.

**They zoom together**: the Dependent Pair Type $\Sigma(\sigma)$
requires that the physical substrate and the mind matrix have
consistent ranks for each $\sigma$. You cannot zoom one without
zooming the other. The Lean 4 compiler enforces this:
a type mismatch would result.

---

![Physical scale (left, in log metres) and mind-matrix rank N (right,
in log coupled units) both increase together as the zoom dial moves
from scale 0 (quantum foam) to scale 20 (universal field). The two
bars are tethered — they cannot move independently.](figures/FA_dual_scaling.png){width=90%}

---

# A5 — How to Read the Atlas

\begin{quote}\itshape
Every chapter in Part B has the same structure.
Learn it once here; recognise it on every page.
\end{quote}

\vspace{1em}

Every Part B chapter opens with a **scale plate**: a boxed section
that states the equation and all parameters explicitly. It looks
like this:

---

\begin{tcolorbox}[colback=gray!8, colframe=gray!40, title=\textbf{Scale N — Name ($10^X$ m)}]

\textbf{The equation (always):}
$$(\nabla^2 + k^2)\, G(x, x') = \delta(x - x')$$

\begin{tabular}{ll}
\textbf{$k$ at this scale:} & [value and units] \\
\textbf{Physical substrate:} & [what you can touch] \\
\textbf{Propagator:} & [what G represents here] \\
\textbf{Mind matrix rank $N$:} & [number, e.g. $10^{14}$] \\
\textbf{Boundary conditions:} & [what constrains G] \\
\end{tabular}
\end{tcolorbox}

---

After the scale plate, every chapter has **three sections**:

**PHYSICAL** — what exists at this scale, what interacts, what you
would measure. At Scale 6 (brain): neurons and synapses. At Scale 10
(geological): tectonic plates. At Scale 17 (galactic): stars and
gas. Plenty of photographs and diagrams. No maths in this section.

**FIELD** — how the Green's function $G$ manifests at this scale.
What counts as a "poke" and what counts as a "response". Why the
same $G$ equation governs it. A schematic or two. This is where
the theory earns its keep: the reader sees that the same propagator
structure appears at every scale.

**MIND** — how the mind matrix appears at this scale. For Scale 6
(brain): it is subjective awareness. For Scale 10 (geological): it
is crustal stress memory. For Scale 20 (cosmic): it is the universe's
self-computing state. The mind matrix rank $N$ is given. The reader
sees the scaling: the "mind" gets bigger as we zoom out.

Then a **same-as-always panel**: a side-by-side figure comparing the
current scale's pattern to a different scale — a geological fold
compared to a neural fold, a galaxy's spiral arm compared to a
cochlear spiral. The caption always ends with the same sentence:

> *The equation has not changed. Only the substrate has.*

This repetition is deliberate. By the twentieth chapter, the reader
will have seen it twenty times. By then, they will believe it.
