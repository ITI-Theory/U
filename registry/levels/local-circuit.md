---
id: local-circuit
---

## In ordinary science

A local neural circuit is a neighbourhood of many cells connected by axons, dendrites, synapses, and recurrent feedback. Its length scale runs from a millimetre patch of tissue to centimetre-range fibre loops. At this scale the important variables are no longer single channel openings or one synaptic vesicle. They are firing rates, spike timing, local field potentials, inhibitory and excitatory populations, conduction delay, and the geometry of connections. Cortical columns, hippocampal microcircuits, basal-ganglia loops, and cerebellar modules are ordinary examples of such mesoscale organisation [@openstax2024neuroscience].

The registry equation $(v_s^{-2}\partial_t^2-\nabla^2+k^2)\Phi=-J$ is a damped-wave way to display circuit propagation. In words, the field $\Phi$ changes in time with a signal speed $v_s$, spreads across space by the Laplacian $\nabla^2$, is damped or filtered by the stiffness-like term $k^2$, and is driven by a source current $J$. It is not a full cellular simulation. It is a mesoscale approximation in which many cells become a current source, an effective propagation speed, and a response kernel.

Classical neural-field models use related population variables to explain how excitation and inhibition can form waves, bumps, oscillations, and instabilities across cortex [@wilson1972excitatory]. Synchronisation theory helps describe when coupled oscillators lock phases or form partially coherent patterns [@kuramoto1984chemical; @acebron2005kuramoto]. At circuit scale, coherence is functional but local: gamma-, beta-, theta-, and slower rhythms can organise communication windows, but they do not by themselves establish consciousness [@fries2005mechanism]. Local electric fields can influence nearby neurons through ephaptic coupling, although such effects are small and context-dependent [@anastassiou2011ephaptic; @jefferys1995nonsynaptic].

Typical energies are biochemical and electrochemical rather than high-energy physical. A spike costs ATP through ion pumping; circuit rhythms are measured by electrodes, optical imaging, or magnetic techniques as aggregate signals. The level is therefore a bridge between microscopic excitability and whole-brain coordination.

## The [T]-Theory reading

The [T]-Theory reading treats a local circuit as an `interpretive` propagator domain. Cellular thresholds enter as source terms; recurrent connectivity shapes the Green's-function response; inhibition and delay decide whether a perturbation dies, reverberates, or routes onward. The damped wave operator is a `derived-under-assumptions` modelling choice inside *The Universal Somatic Field: Green's Functions as Scale-Invariant Oscillators across Twenty Scale Levels*, not a claim that every cortical circuit is literally the same object as every other wave system. What survives from the cellular level is excitability, timing, and coupling. What is integrated out is the molecular implementation of each channel or synapse. The upper variable needed here is phase-structured population activity, because many single-cell events can produce the same circuit-scale signal.

## The pictures

- **Lens off:** Draw a small cortical or hippocampal patch with several neurons, axons, dendrites, inhibitory interneurons, and recurrent loops. Show spikes entering from one side, synaptic contacts lighting up, branching fibres crossing layers, background glia and capillaries, and a millimetre-to-centimetre scale bar.
- **Lens on:** Overlay a coloured phase field across the circuit. A source current should launch a damped wave through the network, with arrows showing delay, inhibition, and recurrent feedback; individual synapses fade into population-level phase and current variables that travel onward between nodes.
