---
id: stellar-cluster--galactic-disc
from: stellar-cluster
to: galactic-disc
label: SHEAR / DISC
claim: INTERPRETIVE
source: registry/levels/stellar-cluster.md
preserves:
- response grammar
- stellar population and phase-space history
adds:
- rotating disc potential
- gas, dust, feedback, and density-wave variables
- dark-halo coupling
integrates_out:
- membership lists of most clusters
- individual cluster relaxation histories
kernel: Poisson density-wave response
render_operation: 'SHEAR / DISC: retype stellar-cluster to galactic-disc.'
---
A stellar cluster keeps common origin and membership visible. A galactic disc averages many such populations into a rotating sheet of stars, gas, dust, magnetic fields, star-forming regions, spiral structure, and dark-halo influence `empirical-result`. The zoom therefore changes the question. Instead of asking how one bound population relaxes, evaporates, or forms a stream, the disc level asks how a galaxy redistributes mass, angular momentum, gas, metals, and feedback across kiloparsecs.

What survives is population history: ages, metallicities, remnants, stellar streams, velocity substructure, and the fact that star formation occurs in clustered environments. What is integrated out is most cluster membership detail and individual relaxation history, except where clusters remain visible as young associations, globular clusters, or tidal streams `derived-under-assumptions`. The upper level adds disc variables: surface density, rotation curve, epicyclic frequency, Toomre stability, bar strength, spiral-arm pattern, gas fraction, dust opacity, star-formation rate, and coupling to the surrounding halo.

`interpretive`: The Atlas reads this as response retyping under shear. A local birth event becomes part of a galactic distribution; a perturbation becomes a density wave, bar, warp, or gas-flow response. The disc is not a cluster mind and not a simple sum of clusters. It is a new gravitational and hydrodynamical substrate, so the renderer must show fields, flows, and distributions rather than one catalogue of member stars.
