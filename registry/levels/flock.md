---
id: flock
---

## In ordinary science

A flock is many birds moving through shared airspace while responding to neighbours, wind, terrain, predators, and internal goals. Each animal remains a bird with wings, mass, fatigue, sensory limits, and aerodynamic constraints. The flock-level pattern is measured as positions, headings, density, velocity correlations, and turn propagation. It may look fluid, but it is composed of discrete animals.

The registry equation, $\partial_t\mathbf v_b+\lambda_b(\mathbf v_b\cdot\nabla)\mathbf v_b=-\nabla P_b+D_b\nabla^2\mathbf v_b+\mathbf f_{\mathrm{aero}}$, is a bird-specific active-matter equation. In words, the average bird velocity field $\mathbf v_b$ changes through self-advection, pressure-like avoidance or compression, diffusion of alignment, and aerodynamic forcing. It is a Toner-Tu-like hydrodynamic compression of many individual flight decisions [@toner1995long; @vicsek1995novel].

The starling literature shows why such compression is useful. Individual trajectories are difficult to follow in large groups, but statistical measures can reveal long-range correlations and local interaction structure [@bialek2012statistical; @ballerini2008interaction]. Flocks can transmit turns quickly because each bird need not know the entire group state; it updates from local visual and motion cues. The equation hides feather mechanics, muscles, and most nervous-system detail inside coefficients, noise, and source terms.

Flock sizes range from a few birds to thousands; spatial scales range from metres to hundreds of metres; times range from wingbeats to seconds-long waves and minutes-long manoeuvres. The flock level differs from the generic animal-swarm level by retaining avian constraints: flight speed, collision risk in three dimensions, aerodynamic wakes, perching or landing constraints, and species-specific group behaviour. A small flock can sometimes be represented by individual tracks; a large flock usually requires coarse-grained velocity and density summaries. Weather and landscape also matter, because air is not a neutral background. The field is therefore a practical approximation across many bodies, not a replacement for ornithology or field observation.

## The [T]-Theory reading

The flock is the bird side-path's collective propagator: individual bird responses become an avian velocity field `interpretive`. *Single-Step Multi-Agent Coordination via Green's Function Propagators: A Macroscopic Brane Projection Framework* supplies the programme's macroscopic response grammar for this step `derived-under-assumptions`. The source scale preserves bounded agents, delay, and neighbour coupling `interpretive`; it integrates out wing-muscle details and most individual history `interpretive`. The registry equation is a display and modelling contract, not a complete ornithological simulator `derived-under-assumptions`. It should be tested against tracked turns, density waves, and perturbation recovery before any species-specific claim is made `open-hypothesis`. The bird path also makes clear that the same grammar can operate outside human affect `interpretive`. The overlay does not claim a flock subject, a collective affective state, or exact biological prediction from the registry equation alone `open-hypothesis`.

## The pictures

- **Lens off:** Draw a flock of individual birds in three-dimensional air, each with a small heading vector. Include a gust, predator, building edge, or turn cue, plus a ten-metre to hundred-metre scale bar and visible spacing between birds.
- **Lens on:** Overlay a smooth avian velocity field, a coloured turn wave, and local neighbour kernels. Keep individual bird dots visible under the field so the renderer shows emergence from agents rather than replacement by a single creature.