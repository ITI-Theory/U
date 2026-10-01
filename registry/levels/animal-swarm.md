---
id: animal-swarm
---

## In ordinary science

An animal swarm or group is a collection of many mobile organisms whose global pattern depends on local sensing and movement. Examples include bird flocks, fish schools, insect swarms, grazing herds, and laboratory or robotic agents used to test collective-motion rules. The individual animals remain discrete bodies with their own sensory ranges and motor limits. The group pattern is an emergent velocity and density field, not a literal group organism.

The ordinary modelling starts with self-propelled particles. In the Vicsek model, agents move at roughly fixed speed and update direction from neighbours plus noise; as density and alignment increase, a disordered population can transition into coherent motion [@vicsek1995novel]. Reynolds' earlier computer-graphics "boids" model made the same intuition visible through separation, alignment, and cohesion rules [@reynolds1987flocks]. Toner and Tu then describe the large-scale hydrodynamic limit: $\partial_t\mathbf v+\lambda(\mathbf v\cdot\nabla)\mathbf v=-\nabla P+D_T\nabla^2\mathbf v$. In words, the group velocity $\mathbf v$ changes through self-advection, pressure-like terms, and diffusion of alignment [@toner1995long].

Field studies of starling flocks show that correlations can extend across a flock and that statistical mechanics can describe collective orientation without assuming central command [@bialek2012statistical]. Detailed observations also suggest that birds often respond to a fixed number of neighbours rather than every animal within a fixed metric radius [@ballerini2008interaction]. Work on fish, insects, and mixed models similarly shows that simple local rules can generate sorting, leadership, milling, waves, and escape responses under some conditions [@couzin2002collective; @krause2002living].

These results do not remove biology; they compress it. Vision, lateral-line sensing, smell, audition, aerodynamics, hydrodynamics, collision avoidance, predator response, hunger, fatigue, and species-specific rules are averaged into coefficients, noise, and boundary conditions. Lengths range from body spacing to hundreds of metres; times range from wingbeats or tailbeats to seconds-long turns and minutes-long migrations or foraging episodes. The measured quantities are positions, headings, local density, velocity correlations, turn waves, response latency, and group boundary shape. Cameras, radar, sonar, GPS tags, acoustic arrays, and simulation each sample different parts of the pattern, so uncertainty is part of the ordinary model.

The animal-swarm level needs new variables because tracking every muscle and neuron in every animal is impossible and unnecessary for many questions about collective motion. It also needs new caution. A coherent group can arise without a leader; a leader can exist without being visible in the coarse field; and a beautiful pattern can be produced by constraint rather than intention. The field description is a practical compression of many bodies, not a replacement for species biology or ecology.

## How it was found and measured

Collective animal motion entered science through natural history, ethology, fisheries, entomology, and later statistical physics. Tinbergen's programme for ethology framed behaviour through causation, development, function, and evolution, a useful guard against purely geometric explanations [@tinbergen1963aims]. In the late twentieth century, agent-based simulation showed that local rules could produce lifelike collective motion without central control [@reynolds1987flocks; @vicsek1995novel]. Toner-Tu theory then supplied a hydrodynamic language for polar active matter [@toner1995long].

Measurement changed the field. Multi-camera reconstruction of starling flocks made three-dimensional positions and velocities available at group scale [@ballerini2008interaction]. Statistical mechanics analyses then estimated correlations, interaction ranges, and scale-free features from those tracks [@bialek2012statistical; @cavagna2010scale]. Fish schools, insect swarms, and herds are measured with cameras, sonar, radar, GPS tags, harmonic radar, laboratory arenas, and automated tracking. Each instrument imposes a window: laboratory arenas control conditions but alter ecology; field tags preserve ecology but undersample neighbours; cameras provide detail but fail in occlusion and darkness.

## Objects at this level

### Flock

A flock is a group of birds moving in shared airspace. Classical variables include position, heading, speed, spacing, density, aerodynamic constraint, and predator or landscape context. The programme reads a flock as an avian instance of the active-matter response grammar `interpretive`. It keeps individual birds visible while drawing a coarse velocity field; it does not assert a single flock subject `open-hypothesis`.

### Fish school

A fish school is many fish moving through water while sensing neighbours through vision, flow, pressure, and sometimes chemical cues. Classical accounts must include hydrodynamics, body size, speed, light, turbulence, and predator pressure. The [T]-Theory reading treats schooling as local perturbations propagating through an alignment medium `interpretive`. The water and sensory channels are part of the kernel, not decorative background `derived-under-assumptions`.

### Insect swarm

An insect swarm may be a mating swarm, aggregation, marching group, or flying cluster. Classical variables include sensory range, wingbeat, chemical signalling, wind, light, and density. The programme may model it with swarm velocity and density fields `interpretive`, but species-specific signalling cannot be ignored. A mosquito swarm, locust band, and bee cluster are not interchangeable examples `open-hypothesis`.

### Herd or shoal

A herd or shoal is a many-body group on land or in water where spacing, avoidance, social ties, and resource movement shape the pattern. Classical ecology studies vigilance, predation, foraging, kinship, and terrain. The response-grammar reading compresses local decisions into density and velocity variables `derived-under-assumptions`; it does not claim that the herd has one mind or one emotion `open-hypothesis`.

## The [T]-Theory reading

The programme reads the swarm as a macroscopic propagator layer: a local perturbation becomes a group-scale response through neighbour coupling `interpretive`. *Single-Step Multi-Agent Coordination via Green's Function Propagators: A Macroscopic Brane Projection Framework* uses this level to model collective response without claiming a group subject `derived-under-assumptions`. What survives from the dyad is delay, coupling strength, boundary preservation, and response grammar `interpretive`. What changes is multiplicity: instead of one off-diagonal kernel between two organisms, there is a network of local couplings whose coarse effect can be displayed as a velocity field `derived-under-assumptions`.

What is integrated out is the full bodily state of each participant `interpretive`. The velocity field is therefore a coarse-grained display variable, not a hidden animal mind `interpretive`. It carries only those individual differences that affect alignment, density, response latency, or boundary behaviour in the selected model `derived-under-assumptions`. The programme's Green's-function language is a way to ask how a perturbation spreads, attenuates, amplifies, or reflects through the group `interpretive`. It is not a substitute for measuring the actual animals, and it does not license human affect labels unless a species-specific operational measure is provided `open-hypothesis`.

Predictions remain model-dependent until species, sensing range, terrain, fluid medium, disturbance type, and observation window are fixed `open-hypothesis`. The Atlas does not claim animal swarms have human affective states, clinical states, telepathic coordination, or a single consciousness `open-hypothesis`. The useful claim is narrower: many-agent motion can be displayed as a response field while keeping the organisms discrete `interpretive`.

## Open questions and tests

Open questions in ordinary science include how individuals choose neighbours, how information travels through occluded groups, when leaders matter, how physiology constrains rapid turns, and how laboratory findings transfer to open environments. The [T]-Theory reading is testable only as a modelling compression `open-hypothesis`. A propagator model should predict turn-wave speed, attenuation, boundary reflection, or recovery after a perturbation better than a static density description `derived-under-assumptions`. It should also fail visibly when the species changes, the sensory channel is blocked, or a common external driver explains the group motion more simply `open-hypothesis`. If individual tracking is available, the field variables should be recoverable from, and checked against, the discrete tracks.

## The pictures

- **Lens off:** Draw many birds, fish, insects, or generic agents as separate dots or silhouettes with headings, nearest-neighbour links, density patches, and a predator or obstacle. Include a ten-metre to hundred-metre scale bar depending on the group.
- **Lens on:** Overlay a smooth velocity field and a propagating turn wave across the discrete agents. Show alignment vectors, local kernels, and a boundary around the group, with a note that the field is an aggregate variable, not a group mind.