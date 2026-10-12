---
title: "Path-Sensitive Transition Dynamics"
subtitle: "From local barriers to distributed action costs in [T]-Theory"
author: "Alistair Johnson"
date: "2026"
lang: en-GB
bibliography: ../../bibliography.bib
csl: ../../apa-7th.csl
abstract: |
  This paper specifies an open extension to the current [T]-Theory landscape
  account of transition. The existing account treats emotional, cognitive or
  conscious change as motion in an energy landscape with attractors, saddles,
  barriers and hysteresis `derived-under-assumptions`. The extension asks
  whether some trauma, overload or recovery transitions are better modelled as
  path-sensitive: limited by the cumulative action or coordination cost of an
  admissible route through state space, rather than by one local barrier
  `open-hypothesis`. The paper distinguishes minimum-action, stochastic-path
  and path-integral languages; defines a candidate state space, admissible
  paths, action functional and observables; and lists data that could
  discriminate a single-barrier explanation from a distributed path-cost
  explanation. No clinical mechanism is established here `open-hypothesis`.
---

# Question

The current programme often uses an energy landscape: states sit in basins,
barriers separate basins, and transitions occur when forcing, noise, tunnelling
in a model, or parameter change carries the state across a saddle
`derived-under-assumptions`. This is a precise and useful grammar inside a
chosen dynamical model `derived-under-assumptions`. It is not yet enough to
explain every transition described in trauma, overload, recovery, music or
consciousness `open-hypothesis`.

The path-sensitive question is narrower and testable: can a transition fail
because every admissible route is costly, even when no single local barrier is
large enough to explain the failure `open-hypothesis`? In clinical language this
would remain a model proposal, not a diagnosis or treatment claim
`open-hypothesis`. In mathematical language it replaces a pointwise question,
"how high is the ridge here?", with a functional question, "what is the cost of
this whole route?" `derived-under-assumptions`.

# The present landscape account

The baseline state is a vector $x$ in a state space $\mathcal S$, with dynamics
such as gradient flow, Langevin dynamics, Hopfield descent [@hopfield1982], or a programme-
specific field equation `derived-under-assumptions`. A scalar potential
$V:\mathcal S\to\mathbb R$ gives basins and saddles when the model has such a
potential `derived-under-assumptions`. Barrier height, local curvature, noise
scale, forcing and damping, in the tradition of barrier-crossing models [@kramers1940] then help predict escape probability, dwell time,
threshold crossing and hysteresis `derived-under-assumptions`.

This account is local in its simplest use. If the state is near a saddle, the
height and shape of that saddle carry most of the explanatory load
`derived-under-assumptions`. The programme's quantum-annealing and landscape
figures use that local grammar to discuss reachability in a model
`simulated` for the recorded simulations and `interpretive` for the emotional
reading. It should not be reported as a demonstrated mechanism of trauma,
therapy or consciousness `open-hypothesis`.

# Candidate path formalisms

A **minimum-action** formulation defines an action $S[\gamma]$ on a path
$\gamma$ and asks which admissible path from region $A$ to region $B$ minimises
that action `derived-under-assumptions`. In mechanics, variational principles
select trajectories by stationary action; in this programme the analogous use
would be a modelling choice, not a physical derivation `open-hypothesis`.

A **stochastic-path** formulation treats transitions as rare events in noisy
dynamics. Freidlin--Wentzell theory gives a large-deviation account of the most
likely escape paths and rates for small-noise dynamical systems
[@freidlin2012random] `derived-under-assumptions`. Onsager--Machlup theory gives
a path-probability functional for classes of diffusion process
[@onsager1953fluctuations] `derived-under-assumptions`. These theories justify
asking about whole histories, not only endpoints, when the assumptions of the
stochastic model are satisfied `derived-under-assumptions`.

A **path-integral** formulation sums or integrates over histories. Feynman's
non-relativistic quantum path integral is a quantum-amplitude formalism
[@feynman1948] `derived-under-assumptions`. It can be a useful metaphor for
"many possible histories" `interpretive`, but a literal quantum path integral
for trauma or overload would require its own state variables, amplitudes,
measurement model and evidence `open-hypothesis`. This paper does not assume
that literal quantum claim `open-hypothesis`.

# State space

A minimal path-sensitive [T]-Theory state space can be written as
$\mathcal S = E\times C\times M\times B\times N$ `open-hypothesis`. Here $E$ is
an affective vector such as a BRECVEMA or seven-axis score; $C$ is a coupling or
control-parameter space; $M$ contains slow memory or kernel variables; $B$
contains bodily and autonomic variables; and $N$ contains neural or field
observables if a protocol includes them `open-hypothesis`. A smaller toy model
may project this space to two or three variables for proof or simulation
`derived-under-assumptions`.

The state space must be declared before evidence is interpreted
`open-hypothesis`. A measured panic recovery path, a musical transition path and
an anaesthetic emergence path need not share the same raw coordinates
`open-hypothesis`. They may share a formal grammar only after a map has been
specified and justified `derived-under-assumptions`.

# Admissible paths

A path is a map $\gamma:[0,T]\to\mathcal S$ `derived-under-assumptions`. It is
**admissible** only if it respects the chosen dynamics, measurement resolution,
rate limits, boundary conditions and intervention constraints
`derived-under-assumptions`. For a clinical or overload application, admissible
also means ethically and practically available: no model may treat harmful or
unavailable exposures as acceptable routes merely because they are mathematically
short `open-hypothesis`.

Constraints matter because they can turn an apparently easy endpoint transition
into a hard route `open-hypothesis`. If intermediate states are intolerable,
unsafe, socially blocked, physiologically unstable, or memory-reactivating, the
route may have high cumulative cost even when the endpoint basin is nearby in a
static plot `open-hypothesis`.

# Action functional

A generic action can be written

$$
S[\gamma]=\int_0^T L(\gamma(t),\dot\gamma(t),t)\,dt + \Phi(\gamma(0),\gamma(T)).
$$

The Lagrangian $L$ may include potential cost $V(\gamma)$, kinetic or rate cost
$\|\dot\gamma\|^2$, dissipation, control effort, mismatch among coupled
subsystems, memory-kernel penalties, risk terms and noise scaling
`open-hypothesis`. $\Phi$ may encode boundary costs such as preparation, relapse
risk or endpoint mismatch `open-hypothesis`.

The landscape account is recovered as a limiting case when the dominant cost is
a local potential barrier and the path terms add no independent information
`derived-under-assumptions`. A genuinely path-sensitive account is needed only
if route terms improve prediction or explanation beyond the local barrier model
`open-hypothesis`.

# Observable predictions

A single-barrier explanation predicts that escape rate, dwell time and return
threshold are controlled mainly by a local barrier, effective noise or forcing
scale, and local curvature `open-hypothesis`. A distributed path-cost explanation
predicts stronger dependence on preparation and route `open-hypothesis`.

Four observable signatures would support the path-sensitive model over a simple
single-barrier model if measured under a pre-registered protocol `open-hypothesis`.
First, two histories reaching the same measured point should differ in later
transition probability or recovery time `open-hypothesis`. Second, onset and
recovery should often follow different routes, not merely the same route in
reverse `open-hypothesis`. Third, dwell-time distributions should show mixtures,
heavy tails or stage structure when the route contains multiple bottlenecks
`open-hypothesis`. Fourth, interventions targeted at a small bottleneck step
should outperform interventions scaled only to the nominal barrier height
`open-hypothesis`.

These signatures are not unique to [T]-Theory `open-hypothesis`. They also occur
in other dynamical, cognitive, social and physiological models
`interpretive`. The programme must therefore compare against simpler continuous,
threshold and multi-factor alternatives before claiming advantage
`open-hypothesis`.

# Data that could discriminate the accounts

For trauma or overload transitions, useful data would be longitudinal,
within-person and time-resolved `open-hypothesis`. Candidate measurements include
affect ratings, sleep, heart-rate variability or other autonomic measures,
movement, demand history, exposure or trigger timing, social context, regulation
attempts, symptom or functioning scores, and clinician-coded annotations where
appropriate `open-hypothesis`. Clinical language must stay hedged because such
data would be observational unless an ethically approved protocol says otherwise
`open-hypothesis`.

A single-barrier account is favoured if one calibrated barrier variable explains
onset, dwell time and recovery across histories with little residual path effect
`open-hypothesis`. A distributed path-cost account is favoured if path summaries
or action estimates improve prediction after the local barrier variable is known
`open-hypothesis`. A null result is also informative: if neither model predicts
better than simple covariates, the programme's transition language is weakened
`open-hypothesis`.

# Formal development path

The first formal target should be a toy state space with finite or smooth states,
explicit admissible paths, a declared action and two competing explanations
`open-hypothesis`. One can then prove simple results: equivalence to a barrier
model when only the maximum potential matters; inequivalence when two paths have
the same maximum height but different cumulative costs; and hysteresis when
forward and reverse admissible sets differ `derived-under-assumptions`.

No Lean theorem is claimed in this paper `open-hypothesis`. A later kernel check
would establish only the stated toy theorem under its definitions
`kernel-verified`; it would not establish a clinical or biological mechanism
without empirical evidence `open-hypothesis`.

# Conclusion

Path-sensitive transition dynamics is a warranted dedicated paper because it
prevents an over-simple reading of the existing landscape metaphor
`interpretive`. It preserves the useful attractor-and-barrier account as a
limiting case `derived-under-assumptions`, imports established path languages
with their assumptions visible `derived-under-assumptions`, and states
observations that could make the proposal stronger or weaker
`open-hypothesis`. The extension should remain labelled as an open hypothesis
until such observations exist `open-hypothesis`.

---

# References
