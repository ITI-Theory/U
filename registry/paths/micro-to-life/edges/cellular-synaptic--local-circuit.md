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
Zooming from cellular-synaptic to local-circuit changes the unit of description from one excitable element to a coupled neighbourhood. What survives is thresholded firing, synaptic weight, delay, and the distinction between excitation and inhibition. What is averaged away is the molecular implementation of each spike: individual channel openings, vesicle trajectories, and receptor conformations. The upper level needs new variables because recurrent loops can oscillate, synchronise, route, or suppress signals in ways no single synapse can display alone. The damped wave kernel is a `derived-under-assumptions` circuit approximation: source current in, propagated population response out. Treating that response as part of the Soma-Field ladder is `interpretive`, not a claim of reportable awareness inside a millimetre patch of tissue.
