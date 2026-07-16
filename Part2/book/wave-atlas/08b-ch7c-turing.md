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
