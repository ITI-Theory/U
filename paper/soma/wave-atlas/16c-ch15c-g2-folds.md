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
