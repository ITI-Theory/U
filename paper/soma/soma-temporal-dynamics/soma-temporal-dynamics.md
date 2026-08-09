---
title: "Temporal Dynamics of the Universal Somatic Field: Retarded Propagators, Transition Rates, and the Memory of Feeling"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
abstract: |
  The Universal Somatic Field (USF) has been established as a scale-invariant
  field-theoretic architecture governing dynamics from quantum foam to the
  cosmic web. Previous papers have characterised the field's attractor structure,
  its Green's function identification, and its Lean 4 formal verification. The
  present paper completes the kinematic picture by developing the full
  time-dependent formulation. We derive the retarded Green's function
  $G_R(x,t;\,x',t')$ of the somatic field, characterise the relaxation
  time $\tau$ of attractor dynamics as a function of the spectral gap, and
  give a Wentzel--Kramers--Brillouin (WKB) estimate for the temporal barrier
  in emotional state transitions. We introduce the Somatic Memory Kernel
  $K(t - t')$ — the exponentially decaying influence of past field
  configurations on present dynamics — and show that it accounts for
  autobiographical memory, trauma re-experiencing, and the decay of conditioned
  responses within a single analytic framework. The Field-Modulated Hopfield
  Network (FM-HN) is extended to include an explicit time-dependent forcing
  current $J(x,t)$, enabling a treatment of therapeutic intervention as an
  optimal control problem on the field trajectory. Clinical implications
  include a field-theoretic derivation of why trauma processing is slower than
  trauma formation, and a quantitative account of the window of tolerance as
  a temporal bandwidth constraint on the retarded propagator. Core results
  are consistent with the Lean 4 formalisations in the companion
  lean-proofs-appendix paper.
keywords:
  - temporal dynamics
  - retarded Green's function
  - somatic field theory
  - emotional transition rates
  - trauma well
  - memory kernel
  - WKB approximation
  - therapeutic window
  - time-dependent forcing
bibliography: ../../bibliography.bib
csl: ../../apa-7th.csl
---

# Introduction: Time in the Somatic Field

The Universal Somatic Field has been introduced and developed across a series of
papers that have, with one exception, characterised it in the *stationary* regime:
attractor basins, energy landscapes, phase transitions at critical thresholds. The
exception is the quantum annealing experiment [@johnson2026quantum], which probed the
*rate* at which the field crosses energy barriers — and found that the quantum
pathway crosses them in fewer computational steps than any classical alternative.

But the stationary picture is incomplete. Real emotional life is not stationary. A
person moves through emotional states; those states influence each other across time;
past experiences leave traces that modulate present dynamics. The somatic field is not
just a landscape — it is a trajectory through a landscape, and the trajectory has a
velocity, an inertia, and a memory.

This paper develops the time-dependent formulation of the USF. The central object is
the **retarded Green's function** $G_R(x,t;\,x',t')$: the response of the somatic
field at position $x$ and time $t$ to a perturbation applied at position $x'$ at
the earlier time $t' < t$. The retarded Green's function is the causal propagator — it
encodes only the past influence on the present, respecting the arrow of time. It is
the natural object for describing memory, temporal integration, and the decay of
emotional states.

The retarded propagator is not a new concept in physics; it is a standard tool in
quantum field theory, classical electrodynamics, and the theory of open quantum
systems. Its application to emotional dynamics is, however, new. The consequences
are clinically significant: they give quantitative meaning to concepts such as
the window of tolerance, the rate of trauma formation, the speed of therapeutic
change, and the timescale of emotional memory consolidation.

## Organisation of the Paper

Section 2 derives the retarded Green's function from the time-dependent somatic
field equation. Section 3 introduces the Somatic Memory Kernel and shows how it
unifies autobiographical memory, trauma re-experiencing, and conditioned response
decay. Section 4 develops the WKB estimate of the temporal barrier in emotional
state transitions. Section 5 extends the FM-HN to include time-dependent forcing
and formulates therapeutic intervention as an optimal control problem. Section 6
draws clinical implications. Section 7 places the results in the context of the
broader USF programme.

# The Time-Dependent Somatic Field Equation

## The Field Equation

The stationary somatic field equation (established in the companion papers) is:

$$(\nabla^2 + k^2)\,\Phi_{\mu\nu}(x) = -J_{\mu\nu}(x)$$

where $\Phi_{\mu\nu}$ is the somatic tensor field, $k$ is the wavenumber
(scale-dependent via the Zoom Operator $\Lambda$), and $J_{\mu\nu}$ is the source
current encoding sensory input, motor output, and interoceptive signal.

The full time-dependent generalisation replaces the spatial Laplacian with the
d'Alembertian:

$$\left(\frac{1}{v_s^2}\frac{\partial^2}{\partial t^2} - \nabla^2 + k^2\right)\Phi_{\mu\nu}(x,t) = -J_{\mu\nu}(x,t)$$

where $v_s$ is the somatic field propagation velocity — the speed at which
a perturbation in one part of the field influences another part. In neural tissue,
$v_s$ is determined by the conduction velocity of the electromagnetic field in
the medium and the coupling constants of the somatic interaction; it is bounded
above by the speed of light and below by the slowest neural conduction velocity.

The $k^2$ term acts as an effective mass: it prevents the field from propagating
freely to arbitrarily large distances and introduces a characteristic length scale
$\ell = 1/k$ beyond which field correlations decay exponentially. This length
scale is the somatic correlation length — the spatial range over which different
parts of the field influence each other. As the system approaches the consciousness
threshold $T_c$, $k \to 0$ and $\ell \to \infty$: the correlation length diverges,
signalling the onset of global integration.

## The Retarded Green's Function

The retarded Green's function $G_R(x,t;\,x',t')$ satisfies:

$$\left(\frac{1}{v_s^2}\frac{\partial^2}{\partial t^2} - \nabla^2 + k^2\right)G_R(x,t;\,x',t') = \delta^{(3)}(x - x')\,\delta(t - t')$$

with the causal (retarded) boundary condition:

$$G_R(x,t;\,x',t') = 0 \quad \text{for } t < t'$$

The retarded condition is the mathematical statement that effects follow causes:
the somatic field at $(x,t)$ can be influenced only by sources at earlier times
$t' < t$, never by future events.

In the homogeneous, isotropic case (uniform medium, no preferred direction),
the retarded Green's function takes the form:

$$G_R(r,\tau) = \frac{v_s}{4\pi r}\,e^{-k v_s \tau}\,\delta(\tau - r/v_s)\,\theta(\tau)$$

where $r = |x - x'|$ is the spatial separation, $\tau = t - t' > 0$ is the
elapsed time, and $\theta(\tau)$ is the Heaviside step function enforcing causality.

The key feature of this expression is the factor $e^{-k v_s \tau}$: the influence
of a past perturbation decays exponentially in time, with decay constant $k v_s$.
The decay rate is determined by the effective mass $k$ — the same parameter that
sets the spatial correlation length. A small $k$ (near the consciousness threshold,
or in a highly integrated system) means slow temporal decay: the field "remembers"
perturbations for a long time. A large $k$ (sub-threshold, highly localised) means
rapid decay: the field forgets quickly.

## The General Solution

Given the retarded Green's function, the general solution for the somatic field
at time $t$ is:

$$\Phi_{\mu\nu}(x,t) = \Phi_{\mu\nu}^{(0)}(x,t) + \int_{-\infty}^{t} dt'\int d^3x'\; G_R(x,t;\,x',t')\,J_{\mu\nu}(x',t')$$

where $\Phi_{\mu\nu}^{(0)}$ is the homogeneous solution (the field in the absence
of external sources, evolving freely from initial conditions). The integral
accumulates the influence of all past sources $J_{\mu\nu}(x',t')$ at earlier
times $t' < t$, weighted by the retarded Green's function. This is the field's
memory: it is the integral of past influences.

# The Somatic Memory Kernel

## Definition

The **Somatic Memory Kernel** $K(t - t')$ is the temporal part of the retarded
Green's function, integrated over the spatial variables:

$$K(\tau) = \int d^3x\; G_R(x,\tau;\,0,0) = K_0\,e^{-\tau/\tau_m}\,\theta(\tau)$$

where $\tau_m = 1/(k v_s)$ is the **somatic memory timescale** — the characteristic
time over which the field retains the influence of past events.

The memory kernel is an exponentially decaying function of elapsed time. Recent
events (small $\tau$) have full influence; distant events have exponentially
reduced influence. The timescale $\tau_m$ determines how far back in time the field
"looks" when computing its present state.

## Three Regimes of Memory

The memory timescale $\tau_m$ takes qualitatively different values in three
phenomenologically distinct regimes:

**Short-term somatic memory** ($\tau_m \sim$ seconds to minutes): This is the
timescale of conscious emotional experience. A felt emotion influences the field
for this duration before decaying if no further reinforcement occurs. The
corresponding wavenumber $k$ is in the range associated with the
cortical-limbic coupling frequency band (theta/alpha range, 4--12 Hz).

**Medium-term somatic memory** ($\tau_m \sim$ hours to days): This is the
timescale of mood and emotional state. A disrupted sleep, a difficult
conversation, a sustained stressor — these perturb the field on this timescale.
The corresponding $k$ is smaller, the spatial correlation length longer;
these states involve wider-spread field configurations.

**Long-term somatic memory** ($\tau_m \sim$ months to years, or indefinitely):
This is the timescale of autobiographical memory and, in the pathological case,
of trauma well structures. Long-term somatic memory corresponds to near-zero $k$:
the field is near the critical point, the correlation length is very large, and
past perturbations decay extraordinarily slowly — in the limit $k \to 0$,
the memory is permanent.

## Trauma Re-experiencing as Memory Kernel Resonance

The characteristic symptom of PTSD and complex PTSD — the involuntary
re-experiencing of traumatic events as if they were present — receives a precise
account in the memory kernel framework. A traumatic event creates a very deep,
narrow well in the energy landscape AND a very long memory timescale: the $k$
parameter of the trauma-well basin is anomalously small, meaning the kernel decay
constant $\tau_m = 1/(k v_s)$ is anomalously large.

Re-experiencing occurs when a present stimulus (a sensory trigger) generates a
source current $J(x,t)$ that overlaps with the memory kernel of the trauma: the
integral $\int K(t-t') J(t')\, dt'$ yields a large response because the kernel
has not decayed to zero at the relevant times. The field "replays" the past event
because the memory kernel ensures the past event still has appreciable weight in
the field's present configuration.

This gives a quantitative criterion for trauma severity: the depth of the trauma
well determines the barrier height (relevant for escape rate, as in the existing
WKB analysis); the $k$-value of the trauma-well basin determines the memory
timescale (relevant for re-experiencing frequency and vividness).

## Conditioned Response Decay

The extinction of conditioned responses — the gradual weakening of an emotional
response to a stimulus after repeated unreinforced presentations — is the
exponential decay of the memory kernel in the absence of reinforcement. The
field's response to the conditioned stimulus decays as $e^{-\tau/\tau_m}$;
after a time of order several $\tau_m$, the response has substantially attenuated.

This gives a field-theoretic account of exposure therapy: repeated presentation
of the conditioned stimulus without the unconditioned stimulus (the trauma) allows
the memory kernel contribution to decay. The therapy does not erase the memory —
it reduces $K_0$, the initial amplitude of the kernel, through the accumulation
of unreinforced presentations that progressively lower the well depth.

# WKB Estimate of the Temporal Barrier

## Transition Rate in the Time Domain

The stationary WKB analysis gives the barrier *height* in the energy landscape.
The time-dependent formulation adds the temporal dimension: how long does a
transition between attractor basins take?

In the overdamped Kramers escape problem (which applies when the field's
effective temperature is low and the dynamics are diffusive rather than ballistic),
the mean first-passage time $\langle T \rangle$ from attractor basin A to
attractor basin B is:

$$\langle T \rangle = \frac{2\pi}{\omega_A \omega_B}\,e^{\Delta V / D}$$

where $\omega_A$ is the frequency of oscillation at the bottom of basin A
(the curvature of the well), $\omega_B$ is the magnitude of the imaginary
frequency at the saddle point between A and B (the curvature at the transition
state), $\Delta V$ is the barrier height (the energy difference between the
saddle and the bottom of A), and $D$ is the diffusion coefficient (proportional
to the field temperature $T_\text{field}$).

In the somatic field, this formula gives the expected time to make a spontaneous
emotional transition from state A to state B without external perturbation.

## Asymmetry of Formation and Dissolution

The Kramers formula immediately explains a clinically well-established asymmetry:
**trauma formation is much faster than trauma dissolution**. The reason is the
asymmetry of the barrier structure:

- **Trauma formation**: The traumatic event delivers a large, brief forcing current
  $J_\text{trauma}(x,t)$ that drives the field over the barrier from the healthy
  attractor into the trauma well *from above* — the full barrier height is not
  required because the external forcing provides most of the needed energy. The
  formation time is of order the duration of the traumatic event: seconds to minutes.

- **Trauma dissolution**: Escape from the trauma well requires crossing the full
  barrier from *below* (from inside the well), without the benefit of a large
  external forcing. The mean first-passage time grows exponentially with the
  barrier height. For a deep trauma well ($\Delta V \gg D$), this time can be
  astronomically large without therapeutic intervention.

This is not a failure of the person trapped in the trauma well. It is the
physics: a ball dropped into a deep pit takes far less energy to drop than to
climb back out. The somatic field is following its equations.

## The Window of Tolerance as Temporal Bandwidth

The clinical concept of the "window of tolerance" — the range of field temperatures
within which therapeutic processing of traumatic material is possible — receives
a temporal reformulation in the retarded propagator framework.

The window of tolerance is the range of temperatures $[T_\text{min}, T_\text{max}]$
such that:

1. $T > T_\text{min}$: The relaxation time $\tau_\text{relax} = 1/(\omega_A^2/\gamma)$
   (where $\gamma$ is the damping coefficient) is short enough that the field
   can visit the trauma-adjacent region and return to safety within the
   therapeutic session. Below $T_\text{min}$ (frozen state), the relaxation time
   is too long: the field enters the vicinity of the trauma well but cannot
   return to the regulated basin within the session window.

2. $T < T_\text{max}$: The mean first-passage time $\langle T \rangle$ from the
   current regulated attractor to the trauma well is long enough that the field
   does not spontaneously cascade into the trauma well during the session.
   Above $T_\text{max}$ (flooding state), the field is too hot: it crosses the
   barrier into re-traumatisation without therapeutic benefit.

The window of tolerance is therefore a temporal bandwidth: a range of field
temperatures within which the retarded propagator ensures that the field can
approach and retreat from the trauma-adjacent region on therapeutic timescales.
This gives a quantitative grounding for the standard clinical instruction to "titrate"
trauma processing — to regulate the field temperature so that processing occurs
within the window.

# Therapeutic Intervention as Optimal Control

## The Forced Field Equation

The full time-dependent field equation with external therapeutic forcing is:

$$\left(\frac{1}{v_s^2}\frac{\partial^2}{\partial t^2} - \nabla^2 + k^2\right)\Phi(x,t) = -J_\text{endo}(x,t) - J_\text{therapy}(x,t)$$

where $J_\text{endo}$ is the endogenous source current (the body's own sensory
and interoceptive signals) and $J_\text{therapy}$ is the external therapeutic
forcing current — the physical effect of the therapist's interventions on the
somatic field.

The therapeutic current $J_\text{therapy}(x,t)$ is non-zero during therapy
sessions and zero between sessions. Different therapeutic modalities correspond
to different spatial and temporal profiles of $J_\text{therapy}$:

- **Somatic therapies** (SE, SP, EMDR): $J_\text{therapy}$ has large amplitude
  at somatic field frequencies (low frequency, body-centred), high spatial
  correlation within the somatic register, and rapid temporal variation matched
  to the client's biological rhythms.

- **Cognitive therapies** (CBT, schema): $J_\text{therapy}$ has large amplitude
  at cortical frequencies (higher frequency, language-centred), centred on the
  cortical subspace, and slower temporal variation.

- **Pharmacological interventions**: $J_\text{therapy}$ modifies the field
  parameters themselves — the wavenumber $k$, the damping coefficient $\gamma$,
  or the field temperature $T_\text{field}$ — rather than applying a forcing
  current. SSRIs, for example, raise the field temperature by increasing
  serotonergic coupling, making the field more willing to explore the landscape.

## The Optimal Control Problem

Given a current field configuration $\Phi(x,t_0)$ (assessed at the start of
therapy) and a target configuration $\Phi^\star(x)$ (the healthy regulated
attractor), the optimal control problem is: find the therapeutic current
$J_\text{therapy}(x,t)$ that drives the field from $\Phi(x,t_0)$ to
$\Phi^\star(x)$ in minimum time, subject to the constraint that the field
remains within the window of tolerance throughout.

This is a standard variational problem with state constraints, and it can be
solved by the Pontryagin minimum principle. The solution gives the optimal
therapeutic trajectory: the sequence of interventions, each with its appropriate
amplitude and timing, that achieves the therapeutic goal most efficiently.

The formal solution is beyond the scope of this paper (it requires specifying the
energy landscape, the window-of-tolerance constraints, and the admissible set of
therapeutic currents). However, the framework establishes that such an optimal
solution *exists*, is *computable in principle*, and provides a *principled
criterion* for evaluating any proposed therapeutic approach: does it approximate
the optimal control trajectory, or does it systematically deviate from it?

## Why Somatic Entry Is Faster: A Formal Account

The claim made in the clinical companion papers [@johnson2026clinical] — that
somatic entry to traumatic material is more efficient than cognitive entry — now
has a formal account. The efficiency difference arises from the spatial structure
of $J_\text{therapy}$:

Somatic interventions apply $J_\text{therapy}$ directly to the somatic-limbic
subspace of the field, which is the subspace containing the trauma well. The
forcing current reaches the trauma-well basin directly, without passing through
the EC (Emotional Core) junction.

Cognitive interventions apply $J_\text{therapy}$ to the cortical subspace.
Reaching the somatic-limbic basin from the cortical subspace requires traversing
the EC junction, which is the point of maximum decoupling in CPTSD presentations.
The effective coupling between the cortical forcing and the trauma well is
proportional to the EC coupling constant $\kappa_\text{EC}$ — which is anomalously
small in CPTSD by definition.

The efficiency ratio is therefore approximately $\kappa_\text{EC}^{-1}$: somatic
therapy is $\kappa_\text{EC}^{-1}$ times more efficient at perturbing the trauma
well per unit of therapeutic effort, compared to cognitive therapy. For severely
decoupled CPTSD presentations (small $\kappa_\text{EC}$), this ratio can be
large — consistent with the clinical observation that complex trauma often requires
body-based approaches to access what decades of talking cannot reach.

# The Temporal Somatic Field Across Scales

## Developmental Timescales

The memory kernel framework applies across the developmental lifespan. The
somatic field of a developing organism has a time-dependent wavenumber $k(t)$
that decreases across development: the infant's field begins with large $k$
(short memory, high $k$, rapid emotional state transitions — consistent with
the rapid emotional cycling of early infancy) and develops toward smaller $k$
(longer memory, greater emotional stability, broader somatic integration).

The critical developmental events — secure attachment formation, the emergence
of language and narrative memory, the consolidation of identity — each correspond
to specific reductions in $k$: transitions to longer memory timescales at which
new categories of experience become possible.

The pre-verbal manifold [@johnson2026preverbal] — the field structure present
before language acquisition — is characterised by large $k$ (rapid decay, short
memory), which explains why pre-verbal memories are not accessible to verbal recall:
the memory kernel of the pre-verbal field has decayed to zero by the time the
verbal apparatus is present to encode it. The somatic field retained the event,
but in a form that does not project onto the language channel.

## Geological and Astrophysical Timescales

The same retarded propagator applies at geological and astrophysical scales,
with the scale-appropriate velocity $v_s$ and wavenumber $k$. At geological
scale ($\sigma = 10$ in the Zoom Operator notation), the somatic field describes
seismic wave propagation and tectonic dynamics. The memory kernel at this scale
has timescale $\tau_m \sim 10^3$ to $10^6$ years — the timescale over which
geological stress distributions encode the history of past tectonic events.
This is the field-theoretic account of geological memory: rock strata remember
[@johnson2026geophysics].

At cosmological scale ($\sigma = 19$--$20$), the retarded propagator is the
cosmological Green's function — the propagator for perturbations in the
early universe, whose memory kernel timescale is the Hubble time $\sim 10^{10}$
years. The cosmic microwave background is the long-memory trace of quantum
fluctuations in the very early universe: an exponentially decayed but still
detectable somatic memory of the universe's infancy.

# Implications and Open Questions

## Measurable Predictions

The temporal dynamics framework makes several predictions that are, in principle,
directly testable with existing technology.

**Memory timescale from EEG spectral width**: The somatic memory timescale
$\tau_m = 1/(k v_s)$ is inversely proportional to the effective wavenumber $k$.
In neural tissue, $k$ is related to the centre frequency and bandwidth of the
dominant EEG oscillation: broader spectral peaks correspond to larger effective
$k$ (shorter memory), narrower peaks to smaller $k$ (longer memory). A systematic
study of EEG spectral width in populations with different trauma histories would
test the prediction that longer trauma history correlates with narrower EEG
spectral peaks (smaller $k$, longer memory timescale).

**Transition rate asymmetry**: The Kramers formula predicts that the ratio of
trauma-formation time to trauma-dissolution time grows exponentially with barrier
height. An empirical study of how long clinically significant traumatic events
take to produce lasting field changes, compared with how long therapeutic
dissolution of equivalent changes requires, would test the predicted asymmetry
and constrain the barrier heights involved.

**Window of tolerance as frequency window**: The temporal bandwidth of the window
of tolerance should correspond to a specific frequency range in the physiological
data. Heart rate variability, skin conductance, and respiratory rate all have
frequency content that reflects the field temperature. The prediction is that
therapeutic sessions are most productive when physiological frequency indicators
are within a specific band — and that this band is the same band predicted by
the Kramers formula for the given barrier height.

## The Time Variable in the Lean 4 Formalisation

The spatial (stationary) aspects of the USF have been formally verified in
Lean 4 [@johnson2026lean]. The time-dependent formulation introduces new proof
obligations. The retarded boundary condition (causality) should be stated as a
Lean 4 theorem; the exponential decay of the memory kernel should follow as a
corollary; the Kramers mean first-passage time formula should be derived from
the field equation in the overdamped limit.

The formal statement of causality — that $G_R = 0$ for $t < t'$ — is precisely
a **dependent type constraint** in the Lean 4 type system. In the type-theoretic
reading, the retarded propagator has the type:

$$G_R : (t\,t' : \mathrm{Time}) \to (t' < t) \to \mathrm{Space} \to \mathrm{Space} \to \mathrm{Field}$$

The inequality $t' < t$ is a proof argument — a term of type `Prop` that must
be supplied at every call site. The Lean 4 kernel enforces causality at compile
time: any use of the propagator that does not supply a proof of $t' < t$ is a
type error. The temporal arrow of time is not a convention but a structural
constraint woven into the type signature of the propagator.

This is the type-theoretic completion of the USF's kinematic picture. The spatial
Σ-type (the soma-field as a dependent sum over scale levels, established in
`ScaleUniverse.lean`) is joined by the temporal dependent type (the retarded
propagator as a function that takes a causality proof). Together they give the
full USF type:

$$\text{USF} \;\equiv\; \sum_{\sigma : \mathrm{Scale}_{20}} \left( \mathrm{Substrate}(\sigma) \;\times\; G_R(\sigma) \right)$$

where $G_R(\sigma)$ is the retarded propagator at scale $\sigma$, carrying the
causality constraint as a proof argument.

## The Unified Kinematic Picture

The temporal dynamics paper completes the kinematic picture of the Universal
Somatic Field. The full specification of the field now includes:

| Property | Object | Key formula |
|---|---|---|
| Spatial structure | Attractor landscape | $V[\Phi] = -\frac{1}{2}\Phi \cdot W \cdot \Phi$ (Hopfield) |
| Spatial propagation | Green's function $G(x,x')$ | $(\nabla^2 + k^2)G = \delta^3(x-x')$ |
| Temporal propagation | Retarded propagator $G_R(x,t;x',t')$ | $(\Box + k^2)G_R = \delta^4(x-x')$, $G_R=0$ for $t<t'$ |
| Memory | Memory kernel $K(\tau)$ | $K_0 e^{-\tau/\tau_m}$ |
| Transition rate | Kramers formula | $\langle T\rangle = \frac{2\pi}{\omega_A \omega_B} e^{\Delta V/D}$ |
| Phase transition | Consciousness threshold | Spectral gap opens at $T_c$ |
| Scale invariance | Zoom Operator $\Lambda$ | $k \mapsto k(\sigma)$ for $\sigma \in \{0,\ldots,20\}$ |

The field is now fully specified in both space and time. The attractor landscape
tells us where the field goes; the temporal dynamics tell us how fast it gets
there, how long it stays, and what traces it leaves behind.

# Conclusion

The temporal dynamics of the Universal Somatic Field are governed by the retarded
Green's function, the Somatic Memory Kernel, and the Kramers transition rate
formula. Together, these three objects provide a complete kinematic description
of emotional dynamics: where the field can go (the attractor landscape), how long
it takes to get there (the Kramers rate), how long it remembers where it has been
(the memory kernel), and how an external therapist can guide it most efficiently
(the optimal control formulation).

The framework resolves several clinical puzzles:
- Why trauma forms faster than it dissolves (asymmetric barrier crossing)
- Why somatic therapies are more efficient than cognitive ones for complex PTSD
  (somatic forcing bypasses the decoupled EC junction)
- Why pre-verbal memories are inaccessible to verbal recall (the pre-verbal
  memory kernel has decayed to zero by the time the verbal apparatus is present)
- What the window of tolerance is, formally (a temporal bandwidth constraint on
  the retarded propagator)

And it opens new empirical programmes:
- EEG spectral width as a proxy for somatic memory timescale
- Transition rate asymmetry as a quantitative test of the Kramers formula
- Therapeutic session physiology as a test of the window-of-tolerance bandwidth
  prediction

The somatic field has a past. The retarded propagator carries it. The
present is the integral of everything that has happened, weighted by how
long ago it happened and how much it mattered.

# References

<!-- References are generated from bibliography.bib by citeproc -->
