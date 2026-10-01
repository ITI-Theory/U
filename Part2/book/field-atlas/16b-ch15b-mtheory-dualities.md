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
