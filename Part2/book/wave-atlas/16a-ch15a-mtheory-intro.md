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
