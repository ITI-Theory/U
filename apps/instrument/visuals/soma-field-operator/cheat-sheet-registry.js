// Canonical presentation registry for the USM app and future static Cheat Sheets.
// Publication IDs resolve through Dist/PAPERS.yaml; this module never copies DOI
// or release-status values that belong to that source of truth.

import { getPlate } from './theory-atlas.js';
import { getScaleMorphism } from './scale-morphisms.js';
import { getPartMorphism, getSystemPartonomy } from './system-partonomy.js';

export const publicationRegistry = {
  path: 'Dist/PAPERS.yaml',
  authority: 'Paper title, DOI, release status, and distribution path are resolved by paper ID from this registry.',
};

export const cheatSheetSections = [
  { id: 'identity', label: 'IDENTITY', description: 'Scale, sector, system partonomy, and typed substrate.' },
  { id: 'physics', label: 'PHYSICS', description: 'Important physics, equation, variables, length, time, and observable.' },
  { id: 'response', label: 'RESPONSE', description: 'The perturbation, causal kernel, propagation, damping, and expected result.' },
  { id: 'morphism', label: 'MORPHISM', description: 'What is preserved, added, retyped, or integrated out across a path edge.' },
  { id: 'evidence', label: 'EVIDENCE', description: 'Claim level, source location, proof reference, and publication IDs.' },
  { id: 'interpretation', label: 'INTERPRETATION', description: 'Optional observer-side contour, explicitly bounded by claim status.' },
  { id: 'operate', label: 'OPERATE', description: 'Scale-appropriate controls and available input mappings.' },
  { id: 'renderer', label: 'RENDERER', description: 'Abstract scene topology, poke mode, and implementation status.' },
];

export const displayPresets = [
  { id: 'essential', label: 'ESSENTIAL', sections: ['identity', 'response', 'operate'] },
  { id: 'physics', label: 'PHYSICS', sections: ['identity', 'physics', 'response'] },
  { id: 'dynamics', label: 'DYNAMICS', sections: ['identity', 'response', 'morphism', 'operate'] },
  { id: 'evidence', label: 'EVIDENCE', sections: ['identity', 'physics', 'evidence', 'interpretation'] },
  { id: 'full', label: 'FULL LEDGER', sections: cheatSheetSections.map(section => section.id) },
];

const scaleDetails = {
  0: { physics: 'Planck-scale boundary conditions and quantum amplitude; smooth geometry is unavailable.', observable: 'amplitude contribution across paths', papers: ['P11', 'P20'], controls: ['scale', 'response-time', 'poke'] },
  1: { physics: 'Worldsheet response and compactification mode structure.', observable: 'mode spectrum and oscillator response', papers: ['P11', 'P20'], controls: ['scale', 'response-time', 'poke'] },
  2: { physics: 'Short-range massive exchange and nuclear scattering response.', observable: 'range and decay of the interaction kernel', papers: ['P14', 'P20'], controls: ['scale', 'response-time', 'poke'] },
  3: { physics: 'Electromagnetic orbital structure and Coulomb response.', observable: 'orbital transition and field contour', papers: ['P14', 'P20'], controls: ['scale', 'response-time', 'poke'] },
  4: { physics: 'Chemical bonds, conformation, and electron-density response.', observable: 'bond and vibration configuration', papers: ['P5', 'P20'], controls: ['scale', 'response-time', 'poke'] },
  5: { physics: 'Membrane potentials, ion channels, and synaptic propagation.', observable: 'local potential and threshold transition', papers: ['P5', 'P13'], controls: ['scale', 'response-time', 'poke'] },
  6: { physics: 'Anisotropic neural conduction and local-circuit phase propagation.', observable: 'current direction, speed, and local phase', papers: ['P5', 'P13'], controls: ['scale', 'response-time', 'poke'] },
  7: { physics: 'Measured neural tissue, macroscopic EM activity, and CEMI propagation.', observable: 'whole-brain field and thresholded response', papers: ['P5', 'P13'], controls: ['scale', 'somatic', 'limbic', 'cognitive', 'response-time', 'poke'] },
  8: { physics: 'Biotensegrity, nervous system, acoustics, and the 16-component music-affect field.', observable: 'response trajectory through damping, memory, and attractors', papers: ['P5', 'P9', 'P13'], controls: ['scale', 'somatic', 'limbic', 'cognitive', 'response-time', 'poke', 'brecvema', 'coda', 'body-grid'] },
  9: { physics: 'Coupled oscillators, delay, and phase-locking between distinct organisms.', observable: 'relative phase and lock condition', papers: ['P3', 'P19'], controls: ['scale', 'response-time', 'poke'] },
  10: { physics: 'Active-matter alignment, velocity fields, and collective phase ordering.', observable: 'alignment, vorticity, and coherence', papers: ['P19'], controls: ['scale', 'response-time', 'poke'] },
  11: { physics: 'Interaction graphs and social diffusion under explicit network constraints.', observable: 'diffusion path and network connectivity', papers: ['P16', 'P19'], controls: ['scale', 'response-time', 'poke'] },
  12: { physics: 'Geographic constraints and propagation through regional institutions.', observable: 'constraint boundary and diffusion mode', papers: ['P16'], controls: ['scale', 'response-time', 'poke'] },
  13: { physics: 'Attractor landscapes and orbital/systemic response across long times.', observable: 'trajectory and basin stability', papers: ['P16', 'P20'], controls: ['scale', 'response-time', 'poke'] },
  14: { physics: 'Selection, radiation, and wave propagation across evolutionary or stellar systems.', observable: 'branching and mode persistence', papers: ['P20'], controls: ['scale', 'response-time', 'poke'] },
  15: { physics: 'Viscoelasticity, fault friction, stress accumulation, and seismic Green functions.', observable: 'strain propagation and residual stress', papers: ['P16', 'P20'], controls: ['scale', 'response-time', 'poke'] },
  16: { physics: 'Convection, heat flux, and planetary normal modes.', observable: 'thermal circulation and modal response', papers: ['P20'], controls: ['scale', 'response-time', 'poke'] },
  17: { physics: 'Helioseismic and gravitational wave response at stellar scales.', observable: 'stellar oscillation and mode spectrum', papers: ['P20'], controls: ['scale', 'response-time', 'poke'] },
  18: { physics: 'Galactic density, gravitational potential, and lensing response.', observable: 'density wave and lensing kernel', papers: ['P20', 'P22'], controls: ['scale', 'response-time', 'poke'] },
  19: { physics: 'Cosmic-web geometry, metric expansion, and retarded gravitational response.', observable: 'causal metric ripple and matter distribution', papers: ['P20', 'P21', 'P22'], controls: ['scale', 'response-time', 'poke'] },
};

function scaleEntry(sigma) {
  const plate = getPlate(sigma);
  const morphology = getScaleMorphism(sigma);
  const partonomy = getSystemPartonomy(sigma);
  const details = scaleDetails[sigma];
  return {
    sigma,
    identity: { label: plate.label, sector: morphology.sector, length: plate.length, substrate: plate.substrate, partonomy },
    physics: { important: details.physics, equation: plate.equation, field: plate.field, time: plate.time, observable: details.observable },
    response: { description: plate.response, poke: morphology.poke, topology: morphology.response.topology, expected: `Observe ${morphology.response.label}.` },
    interpretation: { description: plate.integration, claim: plate.claim.integration, enabled: plate.mirror.enabled, terms: plate.mirror.terms },
    operate: { controls: details.controls, humanOnly: sigma === 7 || sigma === 8 },
    evidence: { source: plate.source, papers: details.papers, claims: plate.claim },
    renderer: { physical: morphology.physical, response: morphology.response, integration: morphology.integration, status: plate.visual },
  };
}

export const scaleCheatSheets = Array.from({ length: 20 }, (_, sigma) => scaleEntry(sigma));

function edge(id, from, to, label, details) {
  return { id, from, to, label, source: details.source, claim: details.claim ?? 'INTERPRETIVE', partonomy: getPartMorphism(from, to), ...details };
}

const organismToDyad = edge('organism-couple-dyad', 8, 9, 'COUPLE / CO-REGULATE', {
  source: 'paper/proofs/DyadicField.lean',
  claim: 'SOURCED',
  preserves: ['two distinct organism response states', 'individual boundaries', 'local forcing histories'],
  adds: ['coupling kappa', 'delay tau', 'relative phase delta-omega'],
  integratesOut: ['single-body display priority'],
  kernel: 'G_AB(t-tau) / phase-lock condition',
  action: 'Inject a pulse into one coordinate and observe delayed coupling without merging subjects.',
});

export const pathEdges = [
  edge('foam-string', 0, 1, 'RESOLVE / COMPACTIFY', { source: 'Part2/book/wave-atlas/atlas-scale-01.md', preserves: ['response grammar'], adds: ['worldsheet coordinates', 'mode spectrum'], integratesOut: ['smooth spacetime assumption'], kernel: 'worldsheet propagator', action: 'Retype amplitude paths as a compact mode response.' }),
  edge('string-nuclear', 1, 2, 'LOCALIZE / SCATTER', { source: 'Part2/book/wave-atlas/01b-scale-plates.md', preserves: ['oscillator modes'], adds: ['mass scale', 'short-range exchange'], integratesOut: ['worldsheet detail'], kernel: 'Yukawa response', action: 'Compare a compact mode with localized scattering.' }),
  edge('nuclear-atomic', 2, 3, 'BIND / SCREEN', { source: 'Part2/book/wave-atlas/01b-scale-plates.md', preserves: ['field interaction'], adds: ['orbital density'], integratesOut: ['nuclear substructure'], kernel: 'Coulomb response', action: 'Move from short-range exchange to orbital-scale response.' }),
  edge('atomic-molecular', 3, 4, 'BOND / CONFIGURE', { source: 'Part2/book/wave-atlas/01b-scale-plates.md', preserves: ['electromagnetic interaction'], adds: ['bond topology', 'conformation'], integratesOut: ['isolated-atom boundary'], kernel: 'electron-density response', action: 'Perturb a bond configuration and follow density redistribution.' }),
  edge('molecular-cellular', 4, 5, 'EMBED / EXCITE', { source: 'Part2/book/wave-atlas/01b-scale-plates.md', preserves: ['chemical energy landscape'], adds: ['membrane', 'ion channel', 'threshold'], integratesOut: ['free-molecule boundary'], kernel: 'membrane potential response', action: 'Inject a local current and observe thresholded propagation.' }),
  edge('cellular-circuit', 5, 6, 'CONNECT / PROPAGATE', { source: 'Part2/book/wave-atlas/01b-scale-plates.md', preserves: ['local potential'], adds: ['conduction direction', 'circuit delay'], integratesOut: ['single-synapse focus'], kernel: 'damped wave propagator', action: 'Trace a local pulse through an anisotropic current field.' }),
  edge('circuit-brain', 6, 7, 'INTEGRATE / RESONATE', { source: 'Part2/book/wave-atlas/12-ch11-soma-field.md', preserves: ['propagation and threshold'], adds: ['macroscopic EM field'], integratesOut: ['single-column view'], kernel: 'CEMI propagator', action: 'Observe local phase organization as a whole-brain response.' }),
  edge('brain-organism', 7, 8, 'EMBED / SOMATIZE', { source: 'Part2/book/wave-atlas/13a-ch12b-music.md', claim: 'SOURCED', preserves: ['neural and EM response'], adds: ['body state', 'limbic attractor', 'music-affect forcing'], integratesOut: ['brain-only framing'], kernel: 'Langevin field response', action: 'Add a music-affect forcing profile and observe the organism-scale trajectory.' }),
  organismToDyad,
  edge('dyad-flock', 9, 10, 'ALIGN / COLLECT', { source: 'paper/soma/swarm-propagator/swarm-propagator.md', claim: 'SOURCED', preserves: ['coupling', 'phase relation'], adds: ['velocity field', 'collective alignment'], integratesOut: ['individual identity as the primary scene'], kernel: 'active-matter alignment field', action: 'Broadcast a perturbation and observe collective phase/velocity alignment.' }),
  edge('dyad-church', 9, 11, 'PRACTISE / INSTITUTIONALIZE', { source: 'Part2/book/wave-atlas/01b-scale-plates.md', preserves: ['distinct participants', 'coupling history'], adds: ['shared practice', 'network constraint', 'ritual timescale'], integratesOut: ['dyad as the sole interaction boundary'], kernel: 'social diffusion kernel', action: 'Move from local co-regulation to an explicitly bounded community-network model.' }),
  edge('community-region', 11, 12, 'CONSTRAIN / DIFFUSE', { source: 'paper/soma/geographic-somatic-field/geographic-somatic-field.md', claim: 'SOURCED', preserves: ['interaction graph', 'diffusion'], adds: ['geographic boundary', 'institutional constraint'], integratesOut: ['local-network-only view'], kernel: 'geographic propagator', action: 'Trace how a perturbation follows or is blocked by constraints.' }),
  edge('region-civilisation', 12, 13, 'STABILIZE / ATTRACT', { source: 'Part2/book/wave-atlas/01b-scale-plates.md', preserves: ['constraints', 'propagation'], adds: ['long-horizon basin', 'system trajectory'], integratesOut: ['regional detail'], kernel: 'attractor flow', action: 'Follow a constraint field toward a systemic trajectory.' }),
  edge('civilisation-species', 13, 14, 'SELECT / RADIATE', { source: 'Part2/book/wave-atlas/01b-scale-plates.md', preserves: ['trajectory and modes'], adds: ['branching', 'selection', 'stellar/evolutionary timescale'], integratesOut: ['single-system framing'], kernel: 'wavefront propagation', action: 'Compare persistence and branching under a scale shift.' }),
  edge('fault-planet', 15, 16, 'CONVECT / COUPLE', { source: 'Part2/book/wave-atlas/01b-scale-plates.md', preserves: ['stress and memory'], adds: ['heat flux', 'global modes'], integratesOut: ['single fault boundary'], kernel: 'convection response', action: 'Apply a shear perturbation and observe a planetary-mode continuation.' }),
  edge('planet-star', 16, 17, 'RESONATE / RADIATE', { source: 'Part2/book/wave-atlas/01b-scale-plates.md', preserves: ['normal modes'], adds: ['stellar mode spectrum', 'gravitational response'], integratesOut: ['planetary boundary'], kernel: 'helioseismic response', action: 'Follow a modal perturbation into a stellar resonance field.' }),
  edge('galaxy-universe', 18, 19, 'CONNECT / EXPAND', { source: 'Part2/book/wave-atlas/01b-scale-plates.md', preserves: ['density and gravitational potential'], adds: ['cosmic-web metric', 'causal horizon'], integratesOut: ['single-galaxy boundary'], kernel: 'retarded metric response', action: 'Inject a metric disturbance and trace it through the cosmic web.' }),
];

export const scalePaths = [
  { id: 'full-atlas', label: 'FULL ATLAS / 0 TO 19', scales: Array.from({ length: 20 }, (_, sigma) => sigma), edges: pathEdges.map(entry => entry.id), purpose: 'Coordinate spine: the complete scale sequence.' },
  { id: 'micro-to-life', label: 'MICRO TO ORGANISM', scales: [0, 1, 2, 3, 4, 5, 6, 7, 8], edges: ['foam-string', 'string-nuclear', 'nuclear-atomic', 'atomic-molecular', 'molecular-cellular', 'cellular-circuit', 'circuit-brain', 'brain-organism'], purpose: 'Track response grammar from quantum boundary to organism-scale field.' },
  { id: 'animal-to-flock', label: 'ORGANISM TO FLOCK', scales: [8, 9, 10], edges: ['organism-couple-dyad', 'dyad-flock'], purpose: 'From distinct organisms through coupling to collective alignment.' },
  { id: 'animal-to-church', label: 'ORGANISM TO CHURCH', scales: [8, 9, 11], edges: ['organism-couple-dyad', 'dyad-church'], purpose: 'From distinct organisms through shared practice to a bounded community network.' },
  { id: 'community-to-institution', label: 'COMMUNITY TO INSTITUTION', scales: [11, 12, 13, 14], edges: ['community-region', 'region-civilisation', 'civilisation-species'], purpose: 'From local interaction graph to long-horizon systemic constraints.' },
  { id: 'geological-to-stellar', label: 'GEOLOGICAL TO STELLAR', scales: [15, 16, 17], edges: ['fault-planet', 'planet-star'], purpose: 'From local stress memory to planetary and stellar modes.' },
  { id: 'galactic-to-cosmic', label: 'GALACTIC TO COSMIC', scales: [18, 19], edges: ['galaxy-universe'], purpose: 'From galactic density response to a cosmic-web metric view.' },
];

export function getScaleCheatSheet(sigma) {
  return scaleCheatSheets.find(entry => entry.sigma === sigma) ?? scaleCheatSheets[0];
}

export function getPathEdge(id) {
  return pathEdges.find(entry => entry.id === id);
}

export function getScalePath(id) {
  return scalePaths.find(path => path.id === id) ?? scalePaths[0];
}
