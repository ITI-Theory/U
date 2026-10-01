---
id: local-circuit
---

## In ordinary science

A local neural circuit is a neighbourhood of many cells connected by axons, dendrites, synapses, gap junctions, glia, and recurrent feedback. Its length scale runs from a millimetre patch of tissue to centimetre-range fibre loops. At this scale the important variables are no longer single channel openings or one synaptic vesicle. They are firing rates, spike timing, local field potentials, inhibitory and excitatory populations, conduction delay, neuromodulatory state, and the geometry of connections. Cortical columns, hippocampal microcircuits, basal-ganglia loops, olfactory circuits, and cerebellar modules are ordinary examples of such mesoscale organisation [@openstax2024neuroscience].

The registry equation $(v_s^{-2}\partial_t^2-\nabla^2+k^2)\Phi=-J$ is a damped-wave way to display circuit propagation. In words, the field $\Phi$ changes in time with a signal speed $v_s$, spreads across space by the Laplacian $\nabla^2$, is damped or filtered by the stiffness-like term $k^2$, and is driven by a source current $J$. It is not a full cellular simulation. It is a mesoscale approximation in which many cells become a current source, an effective propagation speed, and a response kernel. The approximation becomes useful when the details of each channel would obscure the collective pattern: a travelling wave in cortex, a population oscillation, or a transient assembly selected by inhibition.

Classical neural-field models use related population variables to explain how excitation and inhibition can form waves, bumps, oscillations, and instabilities across cortex [@wilson1972excitatory]. Synchronisation theory helps describe when coupled oscillators lock phases or form partially coherent patterns [@kuramoto1984chemical; @acebron2005kuramoto]. At circuit scale, coherence is functional but local: gamma-, beta-, theta-, and slower rhythms can organise communication windows, but they do not by themselves establish consciousness [@fries2005mechanism]. Local electric fields can influence nearby neurons through ephaptic coupling, although such effects are small and context-dependent [@anastassiou2011ephaptic; @jefferys1995nonsynaptic].

Typical energies are biochemical and electrochemical rather than high-energy physical. A spike costs ATP through ion pumping; transmitter cycling and glial support add metabolic cost. Circuit rhythms are measured by extracellular electrodes, silicon probes, calcium imaging, voltage imaging, optogenetic perturbation, and sometimes magnetic techniques as aggregate signals. The level is therefore a bridge between microscopic excitability and whole-brain coordination: it keeps enough anatomy to explain routing, but it compresses enough cellular detail to reveal waves, motifs, and control loops.

Circuit boundaries are functional as well as anatomical. A millimetre of cortex can participate in different effective circuits depending on task, state, neuromodulation, and recent history. Conversely, a named anatomical module may contain several dynamical circuits at once. For that reason, local-circuit science often combines structure with perturbation: the question is not only where fibres go, but how a pulse changes the probability, phase, or gain of later activity.

## How it was found and measured

Local circuits became experimentally visible through a sequence of instruments. Early neuroanatomy separated cells, fibres, and layers; electrophysiology then made spikes and synaptic potentials measurable. The mid-twentieth century brought microelectrode recordings, lesion experiments, and sensory mapping. Hubel and Wiesel's recordings in cat visual cortex showed receptive fields and column-like organisation, demonstrating that local populations can compute features not obvious from a single photoreceptor or synapse [@hubel1959receptive]. Wilson and Cowan's 1972 model turned excitatory and inhibitory populations into equations that could oscillate, stabilise, or become unstable [@wilson1972excitatory]. Later multi-electrode arrays, tetrodes, laminar probes, two-photon calcium imaging, voltage indicators, and optogenetics made it possible to record or perturb many cells while behaviour continues. These methods do not see the same object: a local field potential emphasises summed synaptic currents, spikes emphasise output events, calcium imaging emphasises slower intracellular signals, and connectomics gives static wiring at high spatial resolution.

## Objects at this level

### Cortical column or microcolumn

A cortical column is a layered local arrangement of neurons, inputs, outputs, and recurrent connections. Its ordinary behaviour is governed by synaptic integration, excitation--inhibition balance, recurrent gain, neuromodulation, and thalamocortical drive. The [T]-Theory reading treats the column as a local propagator cell in a larger response field `interpretive`; it does not claim that a column alone is conscious `open-hypothesis`.

### Hippocampal microcircuit

A hippocampal microcircuit includes dentate gyrus, CA fields, interneurons, recurrent collaterals, and plastic synapses. Ordinary neuroscience uses it to study memory, place coding, sharp-wave ripples, and sequence replay. In the programme, it is a clear example of attractor-like routing and response history `interpretive`. The mapping to emotional basins remains model language, not direct clinical evidence `open-hypothesis`.

### Local field potential

A local field potential is an extracellular voltage fluctuation produced mainly by summed transmembrane currents near an electrode. It is shaped by tissue conductivity, geometry, synchrony, and filtering, so it is not a direct readout of every spike. The [T]-Theory reading uses it as an empirical circuit-scale field variable `empirical-result`, then treats its response kernel as part of the cross-scale grammar `interpretive`.

### Oscillatory assembly

An oscillatory assembly is a transient population whose activity shows phase, frequency, and coupling structure. Ordinary accounts use such assemblies to describe attention, routing, working memory, motor timing, and sleep rhythms. The programme reads assembly phase as a carrier of timing into the next scale `interpretive`. It does not equate synchrony itself with awareness or therapeutic change `open-hypothesis`.

### Inhibitory interneuron network

An inhibitory interneuron network controls timing, gain, and competition through fast and slow inhibitory synapses. Its ordinary dynamics depend on cell class, synaptic time constants, gap junctions, and local connectivity. The [T]-Theory reading treats inhibition as a damping and selection operator within the circuit response `interpretive`. It is not a moral or emotional category; it is a biophysical control mechanism `empirical-result`.

## The [T]-Theory reading

The [T]-Theory reading treats a local circuit as an `interpretive` propagator domain. Cellular thresholds enter as source terms; recurrent connectivity shapes the Green's-function response; inhibition and delay decide whether a perturbation dies, reverberates, synchronises, or routes onward `interpretive`. The damped wave operator is a `derived-under-assumptions` modelling choice inside *The Universal Somatic Field: Green's Functions as Scale-Invariant Oscillators across Twenty Scale Levels*, not a claim that every cortical circuit is literally the same object as every other wave system. Its purpose is to keep source, propagation speed, damping, geometry, and response amplitude visible in one compact display.

What survives from the cellular level is excitability, refractory timing, synaptic weight, excitation--inhibition balance, and coupling delay `interpretive`. What is integrated out is the molecular implementation of each channel, vesicle, receptor, and glial transporter `derived-under-assumptions`. The upper variable needed here is phase-structured population activity, because many single-cell events can produce the same circuit-scale signal `derived-under-assumptions`. Hopfield and attractor language is allowed only as network dynamics `interpretive`; it is not a diagnosis, not a proof of memory content, and not evidence that a millimetre of tissue has reportable experience `open-hypothesis`. Local ephaptic effects are treated as possible contributors to coupling where measured `empirical-result`, but not as a complete account of cognition.

## Open questions and tests

Ordinary neuroscience still asks how local circuits balance stability with flexibility, how inhibition selects routes, how neuromodulators change effective connectivity, and when oscillatory coherence helps rather than merely accompanies computation. The [T]-Theory reading could be tested by comparing response-kernel predictions against standard firing-rate, connectivity, and neural-field models `open-hypothesis`. A useful experiment would perturb a defined local circuit with optogenetic or electrical input, estimate its impulse response across layers, and ask whether the registry variables predict downstream activity better than baseline models `open-hypothesis`. The reading would be weakened if the same data are explained fully by simpler population variables, or if its fitted kernels fail to transfer across stimulus classes, preparations, or species `open-hypothesis`.

A second open issue is individuality. Local circuits vary across development, learning, pathology, and species, so a response kernel fitted in one preparation may not generalise. The programme therefore needs transfer tests, not only attractive diagrams `open-hypothesis`.

## The pictures

- **Lens off:** Draw a small cortical or hippocampal patch with several neurons, axons, dendrites, inhibitory interneurons, and recurrent loops. Show spikes entering from one side, synaptic contacts lighting up, branching fibres crossing layers, background glia and capillaries, and a millimetre-to-centimetre scale bar.
- **Lens on:** Overlay a coloured phase field across the circuit. A source current should launch a damped wave through the network, with arrows showing delay, inhibition, and recurrent feedback; individual synapses fade into population-level phase and current variables that travel onward between nodes.
