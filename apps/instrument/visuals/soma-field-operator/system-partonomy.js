// System partonomies are compact, inspectable render contracts, not exhaustive
// biological or physical ontologies. They are designed to be compatible with an
// eventual RDF/OpenCyc mapping: systems, parts, relations, fields, and boundaries.

function system(sigma, id, label, parts, relations, fields, aggregation, claim = 'SOURCED') {
  return { sigma, id, label, parts, relations, fields, aggregation, claim };
}

export const systemPartonomies = [
  system(0, 'quantum-foam', 'QUANTUM FOAM', ['vertices', 'amplitude cells', 'path neighborhoods'], ['adjacent-to', 'interferes-with'], ['quantum amplitude'], 'coherent amplitude pattern'),
  system(1, 'worldsheet', 'WORLD SHEET', ['coordinate patch', 'modes', 'compact cycles'], ['joins', 'oscillates-with'], ['worldsheet propagator'], 'mode spectrum'),
  system(2, 'nuclear-system', 'NUCLEAR SYSTEM', ['interaction vertices', 'exchange channels', 'bound modes'], ['scatters-with', 'binds-to'], ['short-range response'], 'scattering configuration'),
  system(3, 'atomic-system', 'ATOMIC SYSTEM', ['nucleus boundary', 'orbital contours', 'transition modes'], ['orbits', 'screens'], ['electromagnetic response'], 'orbital density'),
  system(4, 'molecular-system', 'MOLECULAR SYSTEM', ['atoms', 'bonds', 'conformation states'], ['bonds-to', 'folds-with'], ['electron-density response'], 'molecular configuration'),
  system(5, 'cellular-system', 'CELLULAR / SYNAPTIC SYSTEM', ['membrane', 'channel', 'synaptic interface'], ['gates', 'conducts-to'], ['potential field', 'threshold response'], 'excitable tissue unit'),
  system(6, 'local-circuit', 'LOCAL CIRCUIT', ['axon paths', 'synaptic junctions', 'column modes'], ['propagates-to', 'couples-with'], ['current field', 'phase fronts'], 'local response circuit'),
  system(7, 'whole-brain', 'WHOLE BRAIN / CEMI', ['cortical regions', 'neural pathways', 'EM boundary'], ['integrates-with', 'propagates-across'], ['CEMI field', 'threshold axis'], 'whole-brain field configuration'),
  system(8, 'human-organism', 'HUMAN / VERTEBRATE', ['head', 'torso', 'left arm', 'right arm', 'left leg', 'right leg', 'nervous system', 'limbic axis', 'cortex contour'], ['contains', 'articulates-with', 'regulates', 'reports-through'], ['somatic response', 'limbic attractor', 'cortex organization'], 'bounded organism response state'),
  system(9, 'dyad', 'DYAD', ['organism A', 'organism B', 'coupling channel', 'phase relation'], ['couples-to', 'delays', 'phase-locks-with'], ['interpersonal propagator'], 'two distinct coupled response states'),
  system(10, 'swarm', 'GROUP / SWARM', ['agent templates', 'local neighborhoods', 'velocity vectors', 'phase modes'], ['aligns-with', 'repels', 'broadcasts-to'], ['active-matter velocity field', 'vorticity'], 'collective alignment pattern'),
  system(11, 'community', 'COMMUNITY / CITY', ['participants', 'shared practices', 'network nodes', 'institutions'], ['participates-in', 'transmits-to', 'constrains'], ['social diffusion kernel'], 'bounded interaction network'),
  system(12, 'regional-system', 'REGIONAL / INSTITUTIONAL', ['communities', 'geographic boundaries', 'institutions', 'transit paths'], ['constrains', 'diffuses-through', 'permits'], ['geographic propagator'], 'constraint landscape'),
  system(13, 'civilisational-system', 'CIVILISATIONAL / SOLAR', ['regional systems', 'long-horizon attractors', 'orbital trajectories'], ['stabilizes', 'orbits', 'transmits'], ['attractor flow'], 'systemic trajectory'),
  system(14, 'species-stellar-system', 'SPECIES / STELLAR', ['populations or stars', 'branches', 'radiation modes'], ['selects', 'radiates', 'persists'], ['wavefront propagation'], 'branching mode structure'),
  system(15, 'fault-system', 'GEOLOGICAL', ['plates', 'slip boundary', 'stress reservoirs', 'memory traces'], ['shears-against', 'loads', 'releases'], ['seismic strain field'], 'viscoelastic stress configuration'),
  system(16, 'planetary-system', 'PLANETARY', ['interior layers', 'convection cells', 'atmosphere', 'magnetic modes'], ['transfers-heat-to', 'couples-with'], ['convection and heat flux'], 'planetary mode configuration'),
  system(17, 'stellar-system', 'STELLAR / CLUSTER', ['stellar bodies', 'mode shells', 'orbital neighborhood'], ['resonates-with', 'gravitates-toward'], ['helioseismic response'], 'stellar resonance pattern'),
  system(18, 'galactic-system', 'GALACTIC', ['gas', 'stars', 'halo', 'density filaments'], ['orbits', 'lenses', 'binds'], ['gravitational potential'], 'galactic density web'),
  system(19, 'cosmic-system', 'OBSERVABLE UNIVERSE', ['clusters', 'voids', 'filaments', 'metric regions'], ['connects', 'expands', 'propagates-through'], ['retarded metric response'], 'cosmic-web configuration'),
];

export const partMorphisms = {
  '0-1': {
    operation: 'PATCH / COMPACTIFY / MODE',
    preserves: ['response neighborhood', 'amplitude relations'],
    retypes: ['vertices become worldsheet coordinates', 'path interference becomes mode structure'],
    render: 'Fold a vertex lattice into a sheet and collect its local oscillations into compact modes.',
  },
  '1-2': {
    operation: 'LOCALIZE / CHANNEL / SCATTER',
    preserves: ['oscillator response'],
    retypes: ['worldsheet mode becomes exchange channel', 'compact cycle becomes a scattering boundary'],
    render: 'Contract a sheet into localized junctions and emit short-range response shells.',
  },
  '2-3': {
    operation: 'BIND / SCREEN / ORBIT',
    preserves: ['field interaction'],
    retypes: ['exchange channel becomes orbital contour', 'bound mode becomes transition mode'],
    render: 'Resolve scattering junctions into nested density contours around a bound centre.',
  },
  '3-4': {
    operation: 'BOND / CONFIGURE / FOLD',
    preserves: ['orbital density', 'electromagnetic relation'],
    retypes: ['atom boundary becomes bond endpoint', 'transition mode becomes conformation state'],
    render: 'Connect orbital contours into bonds and bend them into a configuration landscape.',
  },
  '4-5': {
    operation: 'EMBED / GATE / EXCITE',
    preserves: ['energy landscape', 'bond topology'],
    retypes: ['conformation becomes membrane state', 'bond relation becomes channel gating'],
    render: 'Embed a bond mesh in a membrane contour and turn selected links into threshold gates.',
  },
  '5-6': {
    operation: 'CONNECT / DELAY / PROPAGATE',
    preserves: ['excitable interface', 'threshold event'],
    retypes: ['channel becomes directed path', 'synaptic event becomes circuit delay'],
    render: 'Join local gates into oriented streamlines and send a delayed pulse through them.',
  },
  '6-7': {
    operation: 'INTEGRATE / RESONATE / BOUND',
    preserves: ['propagation', 'local phase'],
    retypes: ['circuit path becomes region relation', 'local field becomes macroscopic EM boundary'],
    render: 'Gather current paths into regional loops and envelope them in a whole-brain field boundary.',
  },
  '7-8': {
    operation: 'EMBED / SOMATIZE / REGULATE',
    preserves: ['neural pathways', 'EM response'],
    retypes: ['brain boundary becomes organism core', 'regional integration becomes body-wide regulation'],
    render: 'Place the cortical field inside an articulated organism contour and expose the limbic axis.',
  },
  '8-9': {
    operation: 'SHRINK / SEED / PAIR',
    preserves: ['organism template', 'bounded response state', 'local forcing history'],
    retypes: ['body parts become compact organism motifs', 'intra-body relations become an inter-body coupling channel'],
    render: 'Shrink the source body, release its named motifs as seeds, then resolve two compact organism templates with a visible coupling arc.',
  },
  '9-10': {
    operation: 'REPLICATE / DISTRIBUTE / ALIGN',
    preserves: ['organism template', 'coupling and phase relation'],
    retypes: ['paired relation becomes neighborhood relation', 'individual position becomes velocity and phase vector'],
    render: 'Duplicate compact templates across the field, distribute their seeds, then replace pair links with an active-matter alignment field.',
  },
  '9-11': {
    operation: 'REPLICATE / PRACTISE / BOUND',
    preserves: ['distinct participants', 'coupling history'],
    retypes: ['dyadic relation becomes shared-practice edge', 'pair boundary becomes a community network boundary'],
    render: 'Replicate compact templates into nodes, draw repeated-practice edges, then close them inside a bounded network contour.',
  },
  '11-12': {
    operation: 'EMBED / CONSTRAIN / DIFFUSE',
    preserves: ['network nodes', 'interaction paths'],
    retypes: ['community boundary becomes geographic constraint', 'local edge becomes regional diffusion path'],
    render: 'Expand the node network into a constraint lattice and expose permitted propagation channels.',
  },
  '11-12': {
    operation: 'EMBED / CONSTRAIN / DIFFUSE',
    preserves: ['network nodes', 'interaction paths'],
    retypes: ['community boundary becomes geographic constraint', 'shared practice edge becomes regional diffusion path'],
    render: 'Expand the bounded network into a constraint lattice with visibly permitted routes.',
  },
  '12-13': {
    operation: 'AGGREGATE / STABILIZE / ATTRACT',
    preserves: ['constraints', 'diffusion paths'],
    retypes: ['regional boundary becomes system basin', 'path traffic becomes long-horizon trajectory'],
    render: 'Compress regional routes into slow attractor spirals and stable orbit-like trajectories.',
  },
  '13-14': {
    operation: 'BRANCH / SELECT / RADIATE',
    preserves: ['trajectory', 'stable modes'],
    retypes: ['attractor branch becomes selection branch', 'system mode becomes radiative mode'],
    render: 'Split stable trajectories into branching fronts with persistent resonance nodes.',
  },
  '15-16': {
    operation: 'EMBED / CONVECT / COUPLE',
    preserves: ['stress boundary', 'residual memory'],
    retypes: ['fault segment becomes convection boundary condition', 'local shear becomes planetary heat-flow mode'],
    render: 'Fold the slip boundary into a shell and distribute its strain as planetary convection modes.',
  },
  '16-17': {
    operation: 'SCALE / RESONATE / RADIATE',
    preserves: ['normal modes', 'heat-flow oscillation'],
    retypes: ['planetary shell becomes stellar mode shell', 'convection mode becomes helioseismic response'],
    render: 'Inflate convection cells into nested stellar shells and release resonant wavefronts.',
  },
  '18-19': {
    operation: 'CONNECT / EXPAND / RETARD',
    preserves: ['density filaments', 'gravitational response'],
    retypes: ['galactic boundary becomes a local cosmic-web region', 'local potential becomes a metric response'],
    render: 'Extend filaments beyond the local halo and animate a delayed metric ripple through the web.',
  },
};

export function getSystemPartonomy(sigma) {
  return systemPartonomies.find(system => system.sigma === sigma) ?? systemPartonomies[0];
}

export function getPartMorphism(from, to) {
  return partMorphisms[`${from}-${to}`] ?? {
    operation: 'RETYPE / RELATE / REORGANIZE',
    preserves: ['response grammar', 'boundary and coupling roles'],
    retypes: ['parts are retyped for the target system', 'relations are replaced by target-scale relations'],
    render: 'Interpolate source motifs into the target system topology.',
  };
}
