# T2 — Green functions and propagators {#theory-greens-propagators}

## 1. Impulse response of the oscillator

![Figure T2.1 — Damped oscillator impulse response: a kick at t = 0 produces a causal ringing response.](figures/theory/T2_1_sho_impulse.png){width=92%}

A Green function is the response of a linear system to a unit impulse. For the damped oscillator

$$
\ddot x+2\gamma\dot x+\omega_0^2x=J(t),
$$

the retarded Green function solves

$$
(\partial_t^2+2\gamma\partial_t+\omega_0^2)G_R(t)=\delta(t),\qquad G_R(t<0)=0.
$$

For underdamping, $\gamma<\omega_0$, define $\Omega=\sqrt{\omega_0^2-\gamma^2}$. The result is

$$
G_R(t)=\Theta(t)\frac{e^{-\gamma t}\sin(\Omega t)}{\Omega}.
$$

This formula is the smallest complete propagator in the book: it is causal, it has a natural frequency, it decays, and it turns an arbitrary source into a response by convolution. [derived-under-assumptions]

Given a forcing term $J(t)$ and zero initial data, the solution is

$$
x(t)=\int_{-\infty}^{\infty}G_R(t-t')J(t')\,dt'=\int_{-\infty}^{t}G_R(t-t')J(t')\,dt'.
$$

The second equality follows from the retarded condition. A short kick excites the ringing curve directly; a long source sums many delayed copies. P10 uses this retarded-kernel grammar for temporal response in the Universal Somatic Field; the mathematical convolution is derived under model assumptions, while the biological interpretation remains a programme hypothesis unless calibrated to data. [derived-under-assumptions; open-hypothesis]

## 2. Causality and retarded support

![Figure T2.2 — Retarded support: a source event contributes only inside or on the future response region.](figures/theory/T2_2_retarded_green.png){width=92%}

The word retarded means future-directed. A source at time $t'$ does not affect earlier times. For a relativistic scalar field in flat spacetime the massless retarded Green function has support on the future light cone, while a massive field has support inside it as well. In schematic form, source and response are linked by

$$
\phi(x)=\int G_R(x,x')J(x')\,d^4x'.
$$

The variables $x$ and $x'$ include both position and time. The integration is not a metaphor; it is a rule for summing all source contributions weighted by the kernel. [derived-under-assumptions]

Boundary conditions can alter $G_R$ even when the local differential operator is unchanged. A room's acoustic Green function includes reflections from walls. A conductive cavity changes electromagnetic modes. A cosmological propagator depends on the expanding metric and gauge choice. Therefore a programme claim about a common Green grammar must specify the operator, the domain, and the projection used by observers. P20's claim that Green functions form a scale-invariant response language is labelled as a formal modelling grammar, not as measured identity across all levels. [derived-under-assumptions; interpretive]

## 3. Resonance and quality factor

![Figure T2.3 — Frequency response of the oscillator for several damping values; smaller damping gives higher Q and narrower bandwidth.](figures/theory/T2_3_resonance_q.png){width=92%}

The Fourier transform turns convolution into multiplication. For the oscillator, a source $J(t)=\Re(J_0 e^{-i\omega t})$ produces a steady response with transfer function

$$
\chi(\omega)=\frac{1}{\omega_0^2-\omega^2-2i\gamma\omega}.
$$

The amplitude is largest near $\omega_0$ when damping is small. The quality factor

$$
Q=\frac{\omega_0}{2\gamma}
$$

measures how many radians of oscillation persist before significant energy loss. Large $Q$ means a narrow resonance and long memory; small $Q$ means broad response and rapid decay. [derived-under-assumptions]

A worked numerical example fixes scale. Let $\omega_0=2\pi\times10$ rad s$^{-1}$ and $\gamma=2$ s$^{-1}$. Then $Q\approx15.7$. The approximate full width at half maximum is $\Delta\omega\approx2\gamma=4$ rad s$^{-1}$, or $\Delta f\approx0.64$ Hz. An observed spectral peak near 10 Hz with that width could be represented by this oscillator, but the oscillator would not identify the physical substrate. It might describe a circuit, a mechanical resonator, or a fitted neural rhythm depending on the measured variable. [derived-under-assumptions]

## 4. Poles and damping

![Figure T2.4 — Complex-frequency poles move downward as damping increases; stability requires poles in the lower half-plane for the chosen convention.](figures/theory/T2_4_poles_damping.png){width=92%}

The same oscillator transfer function has poles where

$$
\omega_0^2-\omega^2-2i\gamma\omega=0.
$$

Solving gives $\omega=-i\gamma\pm\sqrt{\omega_0^2-\gamma^2}$ under the $e^{-i\omega t}$ convention. Negative imaginary parts produce decay for $t>0$. If a pole crosses into the upper half-plane, a small perturbation grows instead of fading. Pole location is therefore a compact diagnostic for stability, resonance, and relaxation.

Quantum field theory packages related information into propagators. A scalar Feynman propagator in momentum space has the denominator

$$
\frac{i}{p^2-m^2+i\epsilon},
$$

with the $i\epsilon$ prescription specifying how poles are bypassed. This is baseline physics rather than a programme addition; see Penrose 2004, chs. 21, 24, and 26. P14 imports Gaussian-field structure for the free USF model under stated assumptions; identifying that formal field with somatic observables is interpretive unless measurement maps are provided. [derived-under-assumptions; interpretive]

## 5. Position-space kernels

![Figure T2.5 — A diffusive/retarded position-space kernel spreads a localized impulse over later positions and times.](figures/theory/T2_5_space_time_propagator.png){width=92%}

The heat equation provides a second canonical Green function:

$$
\partial_t u-D\nabla^2u=J.
$$

In $d$ Euclidean dimensions, the infinite-domain impulse response is

$$
G(x,t)=\Theta(t)(4\pi Dt)^{-d/2}\exp\!\left(-\frac{|x|^2}{4Dt}\right).
$$

This kernel conserves total mass for a delta impulse and broadens like $\sqrt{t}$. It is not a wave because it has no finite propagation front; mathematically the Gaussian tail is immediately nonzero everywhere. The distinction matters when a visual diagram of spreading is used. Diffusion, wave propagation, and ballistic transport are different kernels. [derived-under-assumptions]

A bounded domain replaces the infinite Gaussian by an eigenfunction sum. If $-\nabla^2\psi_n=\lambda_n\psi_n$ with the chosen boundary condition, then

$$
G(x,x';t)=\Theta(t)\sum_n e^{-D\lambda_nt}\psi_n(x)\psi_n(x').
$$

The late response is dominated by the smallest nonzero eigenvalues. This is the mathematical reason slow modes are so important: long after sharp details have decayed, the system remembers only the broadest shapes allowed by its boundary. [derived-under-assumptions]

## 6. Momentum-space propagators

![Figure T2.6 — Momentum-space response 1/(k² + m²): increasing mass suppresses long-range response.](figures/theory/T2_6_k_space_propagator.png){width=92%}

For a static scalar field in three dimensions,

$$
(-\nabla^2+m^2)G(\mathbf r)=\delta^{(3)}(\mathbf r).
$$

Fourier transformation gives

$$
\tilde G(\mathbf k)=\frac{1}{\mathbf k^2+m^2}.
$$

The denominator shows how high wavenumbers and mass both suppress response. Transforming back to position space yields the Yukawa kernel

$$
G(r)=\frac{e^{-mr}}{4\pi r}.
$$

The range is $m^{-1}$ in units where $\hbar=c=1$. A massless mediator gives the Coulomb kernel $1/(4\pi r)$; a massive mediator gives exponential screening. [derived-under-assumptions]

This calculation is a useful guardrail for programme claims. If a proposed level has a finite response length, its kernel should contain a scale that suppresses distant effects. If no such scale is present, the model predicts long-range tails. The sign, dimensionality, and boundary all matter. A diagram of influence fading with distance should therefore be backed by a kernel, a fitted decay length, or a stated hypothesis. [interpretive]

## 7. Yukawa versus Coulomb

![Figure T2.7 — Coulomb falls as 1/r; Yukawa kernels fall faster because the exponential factor screens the interaction.](figures/theory/T2_7_yukawa_coulomb.png){width=92%}

The Coulomb and Yukawa potentials supply a compact worked comparison. At $r=1$ and $m=0.5$, Yukawa gives $e^{-0.5}/(4\pi)\approx0.0483$, while Coulomb gives $1/(4\pi)\approx0.0796$. At $r=5$, the ratio has become $e^{-2.5}\approx0.0821$. The massive field is not merely weaker by a constant; it loses relative strength with distance.

In nuclear physics, Yukawa's original model used this screening idea to explain the short range of the strong force through a massive mediator. Modern quantum chromodynamics is more subtle, but the lesson remains: mediator structure shapes the propagator. For the Field Atlas, this example separates two claims. The formula itself is standard physics. The use of screened kernels as a cross-level modelling vocabulary is a programme choice, usually `derived-under-assumptions` when equations are supplied and `open-hypothesis` when only a proposed measurement path exists.

## 8. Convolution as the response grammar

![Figure T2.8 — Source, kernel, and boundary combine by convolution or mode summation to produce an observed response.](figures/theory/T2_8_convolution.png){width=92%}

Most later formulae reduce to a single grammar:

$$
\text{response} = \text{kernel} * \text{source},
$$

with the asterisk meaning convolution when translation symmetry is available and a more general integral against $G(x,x')$ when it is not. Boundary conditions and projections decide what the observer can record. The grammar is exact for linear systems, approximate after linearisation, and a modelling ansatz for nonlinear systems treated around a state.

P10, P11, P16, P19, and P20 repeatedly use this grammar. A social corridor, a flock, and a cosmological perturbation do not share matter content. They can share source-kernel-boundary notation when each model states its variables and acceptance tests. That is the strongest safe synthesis: formal response grammar first, physical identity only where a derivation or measurement establishes it. [derived-under-assumptions; interpretive]

## 9. Memory kernels and local approximations

A response need not be instantaneous. A linear system with memory can be written as

$$
y(t)=\int_{-\infty}^{t}K(t-t')J(t')\,dt'.
$$

If $K(\tau)=K_0e^{-\tau/\tau_m}\Theta(\tau)$, recent sources dominate and older sources fade on the memory time $\tau_m$. The limit $\tau_m\to0$ with fixed area recovers a local response proportional to $J(t)$. The opposite limit produces slow history dependence. P10 uses this structure for delayed somatic response; the kernel form is mathematically definite, while its empirical parameters require measurement. [derived-under-assumptions; open-hypothesis]

The exponential kernel can be rewritten as a local auxiliary differential equation. Define

$$
z(t)=\int_{-\infty}^{t}e^{-(t-t')/\tau_m}J(t')\,dt'.
$$

Then $\tau_m\dot z+z=\tau_mJ(t)$. A memory integral has become a first-order hidden state. This equivalence is useful in computation and fitting because an apparently nonlocal history can sometimes be represented by extra state variables. It also warns against over-interpreting a fitted memory term: the same data might be described by explicit delay, hidden variables, or a distribution of relaxation times.

Nonlinear systems complicate the grammar. If an equation has the form $L\phi+N(\phi)=J$, a Green function for $L$ gives

$$
\phi=G*J-G*N(\phi).
$$

This is an integral equation for $\phi$, not a closed linear solution. Perturbation theory iterates it when $N$ is small enough; strong nonlinearity may invalidate the expansion. Any level entry that uses a linear kernel for a nonlinear substrate therefore needs a regime statement: small perturbations, fitted effective response, or open approximation. [derived-under-assumptions]

## 10. Retarded, advanced, and Feynman choices

A differential operator usually has more than one inverse until boundary or contour information is supplied. The retarded Green function vanishes before the source. The advanced Green function vanishes after the source. A time-symmetric Green function averages both. In quantum field theory the Feynman propagator orders operators in time and uses a pole prescription suited to perturbative amplitudes rather than direct classical causation. These are different inverses of related operators. [derived-under-assumptions]

Confusing these inverses creates false explanations. A Feynman diagram is not a literal movie of particles choosing paths through time. A retarded kernel is the correct object for classical causal response. A Euclidean Green function is often used after Wick rotation and has different analytic properties again. P14's Gaussian-field formalism belongs to this precise family of choices; the prose around it must state which propagator is being used before interpreting it. [derived-under-assumptions; interpretive]

The same issue appears in data analysis. A fitted symmetric correlation function can reveal association without direction. A causal response kernel needs temporal ordering or an intervention. A transfer function estimated from passive observations can be confounded by common sources. The mathematical word propagator should therefore be tied to the experimental design that justifies it. [open-hypothesis]

## 11. Normalisation and units

A kernel also carries units. For the heat equation in one dimension, $G(x,t)$ has units of inverse length because integrating it over position gives one. For the oscillator, $G_R(t)$ has units of time when the source is an acceleration-like impulse. For a static three-dimensional Yukawa kernel, $G(r)$ has inverse-length units before coupling constants are attached. Ignoring units can make two kernels look identical when they are not. [derived-under-assumptions]

Normalisation fixes how much of a source survives propagation. A probability kernel integrates to one. A lossy response kernel integrates to less than one over the observed channel. A wave Green function may conserve energy only after the correct flux and boundary terms are included. In cross-level use, normalisation should state whether the kernel preserves total amount, redistributes phase, dissipates energy, or merely weights influence. This is often the difference between a physical model and a drawing of arrows.
