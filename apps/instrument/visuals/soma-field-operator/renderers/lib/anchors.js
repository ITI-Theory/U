// Atlas callout anchors are stable world-space points used by capture.mjs.
// They deliberately stay outside the UI layer so book plates can be generated
// from clean canvas captures rather than from Soma Machine panels.
export const ANCHOR_DEFINITIONS = {
  'quantum-foam': [
    { id: 'vacuum-grain', label: 'Vacuum grain', caption: 'The plate treats the substrate as local fluctuations rather than a finished object.', position: [-1.35, 0.72, 0] },
    { id: 'virtual-loop', label: 'Virtual loop', caption: 'Loop-like traces mark transient correlations in the quantum field.', position: [0.05, 0.98, 0] },
    { id: 'response-ripple', label: 'Response ripple', caption: 'Concentric structure shows how a disturbance is read as a propagator response.', position: [1.22, 0.24, 0] },
    { id: 'foam-boundary', label: 'Foam boundary', caption: 'The edge is a scale boundary, not a material wall.', position: [-0.18, -0.92, 0] },
  ],
  'string-boundary': [
    { id: 'worldsheet', label: 'Worldsheet', caption: 'The drawn sheet stands for a two-dimensional string boundary surface.', position: [-1.38, 0.66, 0] },
    { id: 'mode-node', label: 'Mode node', caption: 'Bright nodes mark standing-wave modes along the boundary.', position: [0.0, 1.02, 0] },
    { id: 'open-end', label: 'Open end', caption: 'Endpoint structure identifies the boundary condition being visualised.', position: [1.42, 0.32, 0] },
    { id: 'coupling-thread', label: 'Coupling thread', caption: 'Thread lines show how local modes are coupled across the sheet.', position: [0.34, -0.72, 0] },
  ],
  nuclear: [
    { id: 'nucleon-core', label: 'Nucleon core', caption: 'The compact core marks bound nuclear matter.', position: [-0.2, 0.28, 0] },
    { id: 'strong-well', label: 'Strong well', caption: 'The well represents the short-range binding field.', position: [0.72, 0.86, 0] },
    { id: 'decay-track', label: 'Decay track', caption: 'Outgoing tracks show response channels rather than a continuous orbit.', position: [1.55, -0.46, 0] },
    { id: 'shell-band', label: 'Shell band', caption: 'Shell structure records allowed nuclear configurations.', position: [-1.42, -0.18, 0] },
  ],
  atomic: [
    { id: 'nucleus', label: 'Nucleus', caption: 'The nucleus anchors the Coulomb field at atomic scale.', position: [0, 0, 0] },
    { id: '1s-orbital', label: '1s orbital', caption: 'The inner cloud is the spherically symmetric ground-state density.', position: [-0.84, 0.36, 0] },
    { id: 'excited-lobe', label: 'Excited orbital', caption: 'Outer lobes show higher orbital structure as a probability field.', position: [1.22, 0.72, 0] },
    { id: 'balmer-lines', label: 'Balmer lines', caption: 'The spectrum band marks hydrogen emission wavelengths in the visible series.', position: [0.48, -1.72, 0] },
  ],
  molecular: [
    { id: 'atom-centre', label: 'Atomic centre', caption: 'Spheres mark nuclei within the molecular substrate.', position: [-0.95, 0.28, 0] },
    { id: 'bond', label: 'Bond', caption: 'Bond tubes show shared electronic structure rather than rigid rods.', position: [0.0, 0.34, 0] },
    { id: 'electron-density', label: 'Electron density', caption: 'The surrounding haze reads the molecular field as charge density.', position: [1.06, 0.68, 0] },
    { id: 'vibrational-mode', label: 'Vibrational mode', caption: 'Wave traces indicate normal-mode response of the molecule.', position: [0.42, -0.86, 0] },
  ],
  'cellular-synaptic': [
    { id: 'soma', label: 'Soma', caption: 'The soma is the central cellular body and metabolic substrate.', position: [-1.42, 0.08, 0] },
    { id: 'nucleus', label: 'Nucleus', caption: 'The nucleus anchors genomic regulation inside the cell body.', position: [-1.12, 0.22, 0] },
    { id: 'dendrite', label: 'Dendrite', caption: 'Branching dendrites receive local input into the cell field.', position: [-2.22, 0.94, 0] },
    { id: 'axon-hillock', label: 'Axon hillock', caption: 'The hillock is the threshold region where spiking output begins.', position: [-0.42, -0.18, 0] },
    { id: 'myelin', label: 'Myelin', caption: 'Myelin segments insulate the axon and shape conduction speed.', position: [0.82, -0.35, 0] },
    { id: 'synapse', label: 'Synapse', caption: 'The terminal synapse is the contact zone for chemical or electrical transfer.', position: [2.15, -0.42, 0] },
  ],
  'local-circuit': [
    { id: 'pyramidal-cell', label: 'Pyramidal cell', caption: 'Principal cells provide the excitatory scaffold of the local circuit.', position: [-1.28, 0.72, 0] },
    { id: 'interneuron', label: 'Interneuron', caption: 'Inhibitory nodes regulate timing and gain within the circuit.', position: [0.82, 0.92, 0] },
    { id: 'synaptic-lane', label: 'Synaptic lane', caption: 'Lines mark directed synaptic paths across the microcircuit.', position: [0.08, 0.1, 0] },
    { id: 'field-envelope', label: 'Field envelope', caption: 'The envelope visualises local population response rather than a single neuron.', position: [1.38, -0.72, 0] },
  ],
  'whole-brain-cemi': [
    { id: 'cortical-sheet', label: 'Cortical sheet', caption: 'The outer sheet represents cortex as an extended excitable surface.', position: [-0.25, 1.18, 0] },
    { id: 'white-matter', label: 'White matter', caption: 'Interior tracts carry long-range coupling through the brain.', position: [0.82, 0.42, 0] },
    { id: 'brain-em-field', label: 'Brain EM field', caption: 'The halo marks measured electromagnetic activity around neural tissue.', position: [1.62, 0.82, 0] },
    { id: 'brainstem', label: 'Brainstem', caption: 'The lower stem connects cortical dynamics to body regulation.', position: [-0.12, -1.28, 0] },
  ],
  'human-vertebrate': [
    { id: 'brain-cortex', label: 'Brain / cortex', caption: 'Cortical tissue is the high-integration neural layer of the body.', position: [0.12, 1.72, 0.2] },
    { id: 'limbic-well', label: 'Limbic well', caption: 'The limbic well marks homeostatic and affect-regulatory coupling.', position: [0.18, 0.86, 0.24] },
    { id: 'spinal-cord', label: 'Spinal cord', caption: 'The cord carries bidirectional body-brain traffic.', position: [0.02, 0.0, 0.12] },
    { id: 'peripheral-nerves', label: 'Peripheral nerves', caption: 'Peripheral branches distribute response through limbs and organs.', position: [-1.02, -0.52, 0.08] },
    { id: 'heart-vagal', label: 'Heart / vagal', caption: 'Cardiovagal coupling links visceral state to nervous-system dynamics.', position: [0.32, 0.24, 0.16] },
    { id: 'skeleton', label: 'Skeleton / biotensegrity', caption: 'The body frame supplies the mechanical substrate of somatic response.', position: [0.0, -1.18, 0.06] },
  ],
  dyad: [
    { id: 'person-a', label: 'Person A', caption: 'One body supplies a coupled physiological oscillator.', position: [-1.35, 0.1, 0] },
    { id: 'person-b', label: 'Person B', caption: 'The second body closes the dyadic response loop.', position: [1.35, 0.1, 0] },
    { id: 'gaze-line', label: 'Gaze line', caption: 'The central line marks perceptual coupling between the two bodies.', position: [0.0, 0.72, 0] },
    { id: 'shared-rhythm', label: 'Shared rhythm', caption: 'The lower waveform shows coordinated physiological timing.', position: [0.0, -1.1, 0] },
  ],
  'human-group': [
    { id: 'speaker', label: 'Speaker', caption: 'A focal participant emits information into the group field.', position: [-1.25, 0.72, 0] },
    { id: 'listener-cluster', label: 'Listener cluster', caption: 'The cluster shows local reception and alignment.', position: [0.95, 0.66, 0] },
    { id: 'attention-link', label: 'Attention links', caption: 'Links mark shared attention rather than physical force.', position: [0.0, 0.06, 0] },
    { id: 'group-boundary', label: 'Group boundary', caption: 'The outer contour separates the temporary group from its environment.', position: [0.0, -1.04, 0] },
  ],
  'animal-swarm': [
    { id: 'agent', label: 'Agent', caption: 'Each point is an individual with local sensing and motion.', position: [-1.22, 0.56, 0] },
    { id: 'alignment-vector', label: 'Alignment vector', caption: 'Short vectors indicate neighbour-based directional coupling.', position: [0.18, 0.86, 0] },
    { id: 'density-front', label: 'Density front', caption: 'The front is an emergent swarm boundary.', position: [1.42, 0.18, 0] },
    { id: 'wake', label: 'Wake', caption: 'Trailing structure shows memory in the collective flow.', position: [-0.22, -0.96, 0] },
  ],
  bird: [
    { id: 'head', label: 'Head', caption: 'The head anchors sensory orientation for flight.', position: [0.98, 0.42, 0] },
    { id: 'wing', label: 'Wing', caption: 'Wings provide the mechanical surface for lift and steering.', position: [-0.35, 0.76, 0] },
    { id: 'tail', label: 'Tail', caption: 'The tail stabilises the body in the flight field.', position: [-1.28, -0.06, 0] },
    { id: 'flight-vector', label: 'Flight vector', caption: 'The vector records direction of motion through the air.', position: [1.55, -0.52, 0] },
  ],
  flock: [
    { id: 'lead-bird', label: 'Lead bird', caption: 'The leading body sets one local direction cue.', position: [1.35, 0.72, 0] },
    { id: 'neighbour-rule', label: 'Neighbour rule', caption: 'Spacing and alignment arise from local neighbour rules.', position: [0.08, 0.18, 0] },
    { id: 'vortex-lane', label: 'Vortex lane', caption: 'Wake lanes show aerodynamic structure behind the flock.', position: [-1.08, -0.52, 0] },
    { id: 'flock-envelope', label: 'Flock envelope', caption: 'The envelope is the collective shape of the moving flock.', position: [0.35, -1.12, 0] },
  ],
  'colony-roost': [
    { id: 'roost-core', label: 'Roost core', caption: 'The core marks the shared resting substrate of the colony.', position: [-0.28, 0.32, 0] },
    { id: 'return-path', label: 'Return path', caption: 'Curved traces indicate repeated routes into the roost.', position: [1.32, 0.72, 0] },
    { id: 'perch-layer', label: 'Perch layer', caption: 'Layered perches show spatial organisation in the colony.', position: [-1.35, -0.35, 0] },
    { id: 'dusk-field', label: 'Dusk field', caption: 'The outer haze marks the environmental field of gathering.', position: [0.42, -1.05, 0] },
  ],
  'society-city': [
    { id: 'street-grid', label: 'Street grid', caption: 'The grid is the built substrate for urban flow.', position: [-1.05, 0.52, 0] },
    { id: 'transit-artery', label: 'Transit artery', caption: 'Bright corridors mark high-throughput movement channels.', position: [0.58, 0.08, 0] },
    { id: 'district-node', label: 'District node', caption: 'Nodes identify dense social and infrastructural centres.', position: [1.35, 0.82, 0] },
    { id: 'civic-field', label: 'Civic field', caption: 'The field overlay represents aggregate coordination across the city.', position: [0.05, -1.0, 0] },
  ],
  'regional-institutional': [
    { id: 'town-node', label: 'Town node', caption: 'Local settlements provide the regional substrate.', position: [-1.35, 0.52, 0] },
    { id: 'corridor', label: 'Corridor', caption: 'Corridors join institutions, towns, and resource flows.', position: [0.12, 0.08, 0] },
    { id: 'institution', label: 'Institution', caption: 'Institutional nodes stabilise coordination over longer times.', position: [1.42, 0.72, 0] },
    { id: 'catchment', label: 'Catchment', caption: 'The catchment contour is the effective field of regional dependence.', position: [0.18, -1.05, 0] },
  ],
  'civilisational-solar': [
    { id: 'earth-node', label: 'Earth node', caption: 'The planet remains the material base of the civilisation-scale system.', position: [-0.92, 0.18, 0] },
    { id: 'solar-input', label: 'Solar input', caption: 'Solar flux supplies the dominant external energy source.', position: [1.28, 0.92, 0] },
    { id: 'orbital-infrastructure', label: 'Orbital infrastructure', caption: 'Orbital traces mark technological extension beyond the surface.', position: [0.62, -0.42, 0] },
    { id: 'civilisational-loop', label: 'Civilisational loop', caption: 'The loop represents feedback between energy, institutions, and technology.', position: [-0.25, -1.05, 0] },
  ],
  'species-stellar': [
    { id: 'home-star', label: 'Home star', caption: 'The star is the energetic centre of a species-scale neighbourhood.', position: [-0.95, 0.34, 0] },
    { id: 'habitat-band', label: 'Habitat band', caption: 'The band marks possible ecological and technological habitats.', position: [0.18, 0.82, 0] },
    { id: 'migration-arc', label: 'Migration arc', caption: 'Arcs indicate long-range dispersal or signal pathways.', position: [1.32, -0.12, 0] },
    { id: 'stellar-neighbourhood', label: 'Stellar neighbourhood', caption: 'Neighbouring stars define the larger response environment.', position: [0.0, -1.08, 0] },
  ],
  geological: [
    { id: 'crust', label: 'Crust', caption: 'The crust is the rigid outer substrate of geological response.', position: [-1.15, 0.36, 0] },
    { id: 'fault', label: 'Fault', caption: 'Fault lines concentrate strain and release.', position: [0.08, 0.0, 0] },
    { id: 'mantle-plume', label: 'Mantle plume', caption: 'Plumes mark vertical transport through the mantle field.', position: [1.05, -0.44, 0] },
    { id: 'surface-wave', label: 'Surface wave', caption: 'The surface trace records wave propagation through rock.', position: [0.18, 1.05, 0] },
  ],
  planetary: [
    { id: 'planet-disc', label: 'Planet disc', caption: 'The globe is the coupled atmosphere-ocean-land substrate.', position: [-0.22, 0.12, 0] },
    { id: 'atmosphere', label: 'Atmosphere', caption: 'The outer shell marks atmospheric circulation and radiative exchange.', position: [0.88, 0.82, 0] },
    { id: 'magnetosphere', label: 'Magnetosphere', caption: 'The wide envelope shows interaction with the solar wind.', position: [1.54, -0.22, 0] },
    { id: 'climate-band', label: 'Climate band', caption: 'Bands show large-scale climatic structure.', position: [-0.92, -0.72, 0] },
  ],
  'orbital-system': [
    { id: 'central-star', label: 'Central star', caption: 'The central mass structures the orbital field.', position: [-0.18, 0.1, 0] },
    { id: 'planet-orbit', label: 'Planet orbit', caption: 'Orbits show gravitationally bound trajectories.', position: [1.0, 0.58, 0] },
    { id: 'resonance-ring', label: 'Resonance ring', caption: 'Ring spacing marks orbital resonance and timing.', position: [-1.22, -0.35, 0] },
    { id: 'outer-body', label: 'Outer body', caption: 'Outer bodies sample the long-range gravitational response.', position: [1.42, -0.92, 0] },
  ],
  stellar: [
    { id: 'stellar-core', label: 'Stellar core', caption: 'The core is the high-pressure fusion region.', position: [-0.12, 0.1, 0] },
    { id: 'photosphere', label: 'Photosphere', caption: 'The photosphere is the visible radiating surface.', position: [0.86, 0.42, 0] },
    { id: 'magnetic-loop', label: 'Magnetic loop', caption: 'Loops show magnetised plasma structure above the surface.', position: [-0.92, 1.05, 0] },
    { id: 'stellar-wave', label: 'Stellar wave', caption: 'The wave trace marks oscillatory response within the star.', position: [0.32, -1.05, 0] },
  ],
  'compact-object': [
    { id: 'event-horizon', label: 'Event horizon', caption: 'The dark centre marks the compact-object boundary.', position: [0.0, 0.0, 0] },
    { id: 'accretion-flow', label: 'Accretion flow', caption: 'The disc traces matter falling through curved spacetime.', position: [1.15, 0.42, 0] },
    { id: 'jet', label: 'Jet', caption: 'Jets mark collimated outflow from the compact system.', position: [-0.18, 1.34, 0] },
    { id: 'ringdown', label: 'Ringdown', caption: 'Outer rings represent damped gravitational response.', position: [-1.18, -0.62, 0] },
  ],
  'stellar-cluster': [
    { id: 'cluster-core', label: 'Cluster core', caption: 'The dense centre contains the highest stellar number density.', position: [0.0, 0.32, 0] },
    { id: 'member-star', label: 'Member star', caption: 'Individual points remain separate stars within the cluster field.', position: [-1.12, 0.78, 0] },
    { id: 'tidal-tail', label: 'Tidal tail', caption: 'The tail shows stars being stripped by external gravity.', position: [1.42, -0.48, 0] },
    { id: 'nebular-haze', label: 'Nebular haze', caption: 'The haze marks gas, dust, and unresolved light.', position: [-0.15, -1.04, 0] },
  ],
  'galactic-disc': [
    { id: 'bulge', label: 'Bulge', caption: 'The bulge is the dense central stellar component.', position: [0.0, 0.18, 0] },
    { id: 'spiral-arm', label: 'Spiral arm', caption: 'Arms show density-wave structure in the stellar disc.', position: [1.22, 0.64, 0] },
    { id: 'dust-lane', label: 'Dust lane', caption: 'Dark lanes mark gas and dust within the disc.', position: [-1.1, -0.25, 0] },
    { id: 'outer-disc', label: 'Outer disc', caption: 'The outer disc records extended rotation and stellar distribution.', position: [0.52, -1.0, 0] },
  ],
  'galactic-halo': [
    { id: 'disc', label: 'Disc', caption: 'The luminous disc is embedded inside the larger halo.', position: [0.0, 0.0, 0] },
    { id: 'halo', label: 'Halo', caption: 'The halo marks the extended gravitational environment around the galaxy.', position: [1.35, 0.75, 0] },
    { id: 'satellite', label: 'Satellite', caption: 'Satellite systems sample the halo potential at large radius.', position: [-1.38, 0.82, 0] },
    { id: 'stream', label: 'Tidal stream', caption: 'Streams show stripped material tracing the halo field.', position: [0.42, -1.05, 0] },
  ],
  'galaxy-cluster': [
    { id: 'brightest-galaxy', label: 'Brightest galaxy', caption: 'The central galaxy anchors the cluster core.', position: [0.0, 0.2, 0] },
    { id: 'member-galaxy', label: 'Member galaxy', caption: 'Members orbit within a common cluster potential.', position: [-1.15, 0.78, 0] },
    { id: 'hot-gas', label: 'Hot gas', caption: 'Diffuse gas marks the intracluster medium.', position: [1.2, 0.48, 0] },
    { id: 'lensing-arc', label: 'Lensing arc', caption: 'Arcs show gravitational lensing by cluster-scale mass.', position: [0.35, -1.02, 0] },
  ],
  'cosmic-filaments': [
    { id: 'filament-spine', label: 'Filament spine', caption: 'The spine is the dense thread joining galaxy concentrations.', position: [-0.25, 0.28, 0] },
    { id: 'node', label: 'Node', caption: 'Nodes mark intersections where matter and galaxies collect.', position: [1.12, 0.82, 0] },
    { id: 'void-edge', label: 'Void edge', caption: 'The empty side of a filament borders a cosmic void.', position: [-1.35, -0.78, 0] },
    { id: 'flow-line', label: 'Flow line', caption: 'Lines indicate large-scale flow into the filament.', position: [0.42, -0.55, 0] },
  ],
  'observable-universe': [
    { id: 'observer', label: 'Observer', caption: 'The centre is the observational origin of the horizon volume.', position: [0.0, 0.0, 0] },
    { id: 'light-cone', label: 'Light cone', caption: 'The cone marks the causal structure of observation.', position: [-0.95, 0.9, 0] },
    { id: 'cmb-shell', label: 'CMB shell', caption: 'The outer shell represents the microwave background surface.', position: [1.35, 0.42, 0] },
    { id: 'survey-slice', label: 'Survey slice', caption: 'Slices show mapped structure inside the observable volume.', position: [0.35, -1.05, 0] },
  ],
  'cosmic-web': [
    { id: 'web-node', label: 'Web node', caption: 'Nodes are high-density intersections of the cosmic web.', position: [0.95, 0.78, 0] },
    { id: 'web-filament', label: 'Web filament', caption: 'Filaments connect nodes across cosmological distances.', position: [-0.12, 0.18, 0] },
    { id: 'void', label: 'Void', caption: 'Voids are underdense regions between web structures.', position: [-1.35, -0.75, 0] },
    { id: 'large-scale-flow', label: 'Large-scale flow', caption: 'Flow traces the response of matter to the web potential.', position: [0.82, -1.0, 0] },
  ],
};

export function anchorsForLevel(levelId) {
  return ANCHOR_DEFINITIONS[levelId] ?? [];
}

