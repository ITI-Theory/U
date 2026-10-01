---
id: cellular-circuit
from: cellular-synaptic
to: local-circuit
label: CONNECT / PROPAGATE
claim: INTERPRETIVE
source: registry/levels/cellular-synaptic.md
preserves:
- response grammar
- declared source boundary
adds:
- target-scale variables
integrates_out:
- source-scale display priority
kernel: damped wave propagator
render_operation: 'CONNECT / PROPAGATE: retype cellular-synaptic to local-circuit.'
---
Zooming from cellular-synaptic to local-circuit changes the unit of description from one excitable element to a coupled neighbourhood `interpretive`. What survives is thresholded firing, synaptic weight, refractory timing, conduction delay, plasticity, and the distinction between excitation, inhibition, and modulation `interpretive`. What is averaged away is the molecular implementation of each event: individual channel openings, vesicle trajectories, receptor conformations, and much of the intracellular chemistry `derived-under-assumptions`.

The upper level needs new variables because recurrent loops can oscillate, synchronise, route, suppress, amplify, or store transient context in ways no single synapse can display alone `derived-under-assumptions`. A postsynaptic current becomes part of a population source; many spikes become a rate, phase, local field potential, or assembly state. Geometry also changes meaning: dendritic cable length is no longer the main domain, while laminar structure, axonal delay, and network motifs become central.

The damped wave kernel is a `derived-under-assumptions` circuit approximation: source current in, propagated population response out. Treating that response as part of the Soma-Field ladder is `interpretive`, not a claim of reportable awareness inside a millimetre patch of tissue. The transition is useful only if the compressed variables predict circuit behaviour better than keeping cells as isolated components `open-hypothesis`.
