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
