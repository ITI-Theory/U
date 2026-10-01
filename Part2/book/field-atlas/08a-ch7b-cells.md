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
