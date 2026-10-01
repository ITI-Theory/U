// Shared educational data for the Soma Machine and future Cheat Sheet renderers.
// Claim modes describe the relation of the presentation to its named source.

const fieldAtlas = 'Part2/book/field-atlas';

function plate(sigma, label, length, substrate, field, equation, time, source, options = {}) {
  return {
    sigma,
    label,
    length,
    substrate,
    field,
    equation,
    time,
    source,
    physical: options.physical ?? `At 4D, inspect ${substrate} using its familiar physical observables.`,
    response: options.response ?? `At 8D, inject a disturbance and observe ${field} as the system's causal response.`,
    integration: options.integration ?? 'At 11D, show organization or an observer-side interpretation only when its claim status permits it.',
    claim: options.claim ?? { physical: 'FORMAL', response: 'SOURCED', integration: 'INTERPRETIVE' },
    mirror: options.mirror ?? {
      enabled: true,
      terms: ['coherence', 'tension', 'persistence', 'fragmentation'],
      components: { text: true, grid: true, visual: true, audio: true, organization: true },
    },
    visual: options.visual ?? { status: 'ATLAS TODO', next: 'Create a scale-specific response scene.' },
  };
}

export const theoryAtlas = [
  plate(0, 'QUANTUM FOAM', '10^-35 m', 'pre-geometric quantum fluctuations', 'quantum amplitude',
    'G_P(x,x\') = <x | G | x\'>', 'Planck time ~ 5.4e-44 s', `${fieldAtlas}/atlas-scale-00.md`, {
      physical: '4D presents the Planck boundary as a limit of familiar geometry: smooth spacetime is not yet available.',
      response: '8D asks how an injected quantum-gravitational disturbance contributes to an amplitude across possible paths.',
      integration: '11D presents compactification and mode structure as a mathematical reading, not a claim of phenomenal experience.',
      claim: { physical: 'SOURCED', response: 'SOURCED', integration: 'INTERPRETIVE' },
      visual: { status: 'ATLAS TODO', next: 'Quantum-foam lattice and early-time response scene.' },
    }),
  plate(1, 'STRING / PLANCK BOUNDARY', '10^-32 m', 'worldsheet and compactification boundary', 'worldsheet propagator',
    'G_string(s,s\') = -(alpha\'/2) log |s-s\'|^2', 'string-scale mode time', `${fieldAtlas}/atlas-scale-01.md`, {
      physical: '4D presents the standard string/M-theory boundary picture and its mode spectrum.',
      response: '8D presents the oscillator as a worldsheet response to a localized source.',
      integration: '11D presents harmonic moduli as an educational compactification reading.',
      claim: { physical: 'SOURCED', response: 'SOURCED', integration: 'INTERPRETIVE' },
      visual: { status: 'ATLAS TODO', next: 'Worldsheet and compactification response scene.' },
    }),
  plate(2, 'NUCLEAR', '10^-15 m', 'quark, gluon, and hadron system', 'short-range nuclear response',
    'G_Y(r) = e^{-m r} / (4 pi r)', 'subatomic interaction time', `${fieldAtlas}/01b-scale-plates.md`),
  plate(3, 'ATOMIC', '10^-10 m', 'electron cloud and atomic orbital', 'electromagnetic response',
    'G_C(r) = 1 / (4 pi r)', 'atomic transition time', `${fieldAtlas}/01b-scale-plates.md`),
  plate(4, 'MOLECULAR', '10^-9 m', 'chemical bond and molecular conformation', 'electron-density response',
    'H psi = E psi', 'molecular vibration and folding time', `${fieldAtlas}/01b-scale-plates.md`),
  plate(5, 'CELLULAR / SYNAPTIC', '10^-6 m', 'membrane, ion channel, and synapse', 'bioelectric and synaptic response',
    '(d^2/dx^2 - lambda^-2)V = I_inject', 'milliseconds to seconds', `${fieldAtlas}/01b-scale-plates.md`, {
      integration: '11D presents pattern storage and local information organization, not human occurrent affect.',
    }),
  plate(6, 'LOCAL CIRCUIT', '10^-3 to 10^-1 m', 'axon, local circuit, and cortical column', 'propagating neural current',
    '(v_s^-2 d_t^2 - nabla^2 + k^2)Phi = -J', 'seconds to minutes', `${fieldAtlas}/01b-scale-plates.md`, {
      integration: '11D presents matrix organization and thresholded integration as an educational neural reading.',
    }),
  plate(7, 'WHOLE BRAIN / CEMI', '10^-1 m', 'whole-brain neural and electromagnetic field', 'CEMI propagator',
    '(nabla^2 + k_CEMI^2)G = delta', 'minutes to hours', `${fieldAtlas}/12-ch11-soma-field.md`, {
      physical: '4D presents measured neural tissue, currents, and macroscopic electromagnetic activity.',
      response: '8D presents a whole-brain response field and thresholded propagation.',
      integration: '11D introduces integrated percept and cortex/matrix structure at the biological boundary.',
      claim: { physical: 'SOURCED', response: 'SOURCED', integration: 'SOURCED' },
      mirror: { enabled: false, terms: [] },
      visual: { status: 'ATLAS TODO', next: 'Whole-brain CEMI field scene.' },
    }),
  plate(8, 'HUMAN / VERTEBRATE', '10^0 m', 'biotensegrity body, nervous system, and cortex', 'somatic CEMI and limbic response',
    'gamma e_dot = -grad H(e) + sqrt(2D) xi(t) + J(t)', 'seconds to hours', `${fieldAtlas}/13a-ch12b-music.md`, {
      physical: '4D is the familiar human body: nervous system, acoustics, movement, and ordinary time.',
      response: '8D is the struck bell: a music or sensory forcing term moves through the somatic field, its damping, memory, and attractor landscape.',
      integration: '11D is the integrated human organism: propagator, limbic regulation, cortex/matrix organization, and reportable percept.',
      claim: { physical: 'SOURCED', response: 'SOURCED', integration: 'SOURCED' },
      mirror: { enabled: false, terms: [] },
      visual: { status: 'IMPLEMENTED', next: 'Refine human response dynamics and music-affect state mapping.' },
    }),
  plate(9, 'DYADIC', '10^1 m', 'two coupled organisms', 'interpersonal propagator and entrainment',
    '|omega_A - omega_B| < Delta omega_lock(kappa)', 'minutes to hours', 'paper/proofs/DyadicField.lean', {
      physical: '4D presents two physically distinct bodies and their ordinary acoustic and spatial relation.',
      response: '8D presents coupling, delay, and phase locking between two response systems.',
      integration: '11D may display a joint explanatory contour; it does not merge two persons into one subject.',
      claim: { physical: 'FORMAL', response: 'SOURCED', integration: 'INTERPRETIVE' },
      visual: { status: 'ATLAS TODO', next: 'Two-body coupling and phase-lock scene.' },
    }),
  plate(10, 'GROUP / SWARM', '10^1 to 10^2 m', 'agents, crowd, or active-matter swarm', 'alignment and collective velocity field',
    'partial_t v + lambda(v dot grad)v = -grad P + D_T nabla^2 v', 'hours to days', `${fieldAtlas}/01b-scale-plates.md`, {
      integration: '11D can show organization, coherence, and a mirror contour. It must not assign occurrent human emotion to a swarm.',
      visual: { status: 'ATLAS TODO', next: 'Abstract agent-to-field morph; no literal bird scene required.' },
    }),
  plate(11, 'COMMUNITY / CITY', '10^3 m', 'urban infrastructure and social network', 'social interaction and diffusion kernel',
    'partial_t u = D nabla^2 u + f(u)', 'years', `${fieldAtlas}/01b-scale-plates.md`),
  plate(12, 'REGIONAL / INSTITUTIONAL', '10^4 to 10^5 m', 'regional geography and institutional constraints', 'cultural and geographic propagation',
    '(nabla^2 + k_geo^2)G_geo = delta', 'decades', 'paper/soma/geographic-somatic-field/geographic-somatic-field.md', {
      integration: '11D can present an interpretive constraint landscape: memory, norm persistence, and permitted transitions. It is not a claim that an institution feels.',
      visual: { status: 'ATLAS TODO', next: 'Constraint landscape and propagation-network scene.' },
    }),
  plate(13, 'CIVILISATIONAL / SOLAR', '10^6 to 10^11 m', 'large social systems or orbital systems', 'attractor landscape or gravitational/orbital response',
    'nabla^2 Phi = 4 pi G rho', 'centuries to orbital periods', `${fieldAtlas}/01b-scale-plates.md`),
  plate(14, 'SPECIES / STELLAR', '10^11 to 10^16 m', 'evolutionary population or stellar neighborhood', 'selection, radiation, and wave propagation',
    'omega^2 = k/m', 'millennia to stellar periods', `${fieldAtlas}/01b-scale-plates.md`),
  plate(15, 'GEOLOGICAL', '10^5 m', 'tectonic plates and fault systems', 'elastic and seismic Green function',
    'rho partial_tt u_i = C_ijkl partial_j partial_k u_l', '10^3 to 10^6 years', `${fieldAtlas}/01b-scale-plates.md`, {
      physical: '4D is rock, plates, friction, and measurable stress.',
      response: '8D is stress propagation, residual memory, and fault response after a disturbance.',
      integration: '11D offers only an observer-side mirror contour of persistence, constraint, and topology.',
      claim: { physical: 'SOURCED', response: 'SOURCED', integration: 'INTERPRETIVE' },
      visual: { status: 'ATLAS TODO', next: 'Fault stress, memory trail, and seismic response scene.' },
    }),
  plate(16, 'PLANETARY', '10^6 m', 'planetary interior, atmosphere, and magnetic system', 'convection, heat flux, and planetary modes',
    'rho(D_t u) = -grad P + eta nabla^2 u + rho g', '10^6 years', `${fieldAtlas}/01b-scale-plates.md`),
  plate(17, 'STELLAR / CLUSTER', '10^16 to 10^23 m', 'stars, stellar neighborhood, and cluster', 'helioseismic and gravitational response',
    'Box h_mn = -16 pi G T_mn', 'stellar lifetimes', `${fieldAtlas}/01b-scale-plates.md`),
  plate(18, 'GALACTIC', '10^20 m', 'galaxy, gas, stars, and halo', 'gravitational potential and density wave',
    'nabla^2 Phi = 4 pi G rho', '10^8 years', `${fieldAtlas}/01b-scale-plates.md`),
  plate(19, 'OBSERVABLE UNIVERSE', '10^26 m', 'cosmic web, clusters, voids, and metric', 'retarded gravitational response',
    'Box h_mn = -16 pi G T_mn', 'cosmological time', `${fieldAtlas}/01b-scale-plates.md`, {
      physical: '4D presents standard cosmological observables, metric, expansion, and matter distribution.',
      response: '8D presents causal gravitational propagation and the response of spacetime to stress-energy.',
      integration: '11D may display compactification bookkeeping or a mirror contour, always labelled interpretive unless directly sourced.',
      claim: { physical: 'SOURCED', response: 'SOURCED', integration: 'INTERPRETIVE' },
      visual: { status: 'ATLAS TODO', next: 'Cosmic-web metric response scene.' },
    }),
];

export const curatedRoutes = [
  {
    id: 'full-atlas',
    label: 'FULL ATLAS / 0 TO 19',
    scales: Array.from({ length: 20 }, (_, sigma) => sigma),
    defaultScale: 8,
    source: `${fieldAtlas}/01b-scale-plates.md`,
    purpose: 'The default path: one scale sequence from quantum foam to the observable universe.',
    lenses: ['physics', 'response', 'mirror'],
    annotations: [],
  },
  {
    id: 'dyadic-entrainment',
    label: 'DYADIC ENTRAINMENT',
    scales: [8, 9, 10],
    defaultScale: 9,
    source: 'paper/proofs/DyadicField.lean',
    purpose: 'Follow the transition from one organism to coupling, phase-locking, and collective organization.',
    lenses: ['physics', 'response', 'mirror'],
    annotations: ['sigma 8: human music-affect', 'sigma 9: dyadic coupling', 'sigma 10: collective alignment'],
  },
  {
    id: 'geophysical-response',
    label: 'GEOLOGICAL RESPONSE',
    scales: [12, 15, 16],
    defaultScale: 15,
    source: `${fieldAtlas}/01b-scale-plates.md`,
    purpose: 'Compare ordinary rock physics with stress propagation, memory, and an optional interpretive contour.',
    lenses: ['physics', 'response', 'mirror'],
    annotations: ['sigma 12: regional/institutional constraints', 'sigma 15: fault memory', 'sigma 16: planetary modes'],
  },
  {
    id: 'first-second',
    label: 'FIRST SECOND',
    scales: [0, 1, 2, 3],
    defaultScale: 0,
    source: `${fieldAtlas}/atlas-scale-00.md`,
    purpose: 'A physics-first route through early-time equation regimes. Standard cosmology timings require review before display.',
    lenses: ['physics', 'response'],
    annotations: ['sigma 0: Planck boundary', 'sigma 1: worldsheet modes', 'sigma 2: nuclear response', 'sigma 3: atomic response'],
  },
];

export const lenses = [
  { id: 'physics', label: 'PHYSICS', description: 'Scale-appropriate observables and standard baseline equations.' },
  { id: 'response', label: 'RESPONSE', description: 'Impulse, propagation, damping, coupling, and memory.' },
  { id: 'mirror', label: 'MIRROR', description: 'Observer-side interpretive contour; never a claim of non-human occurrent emotion.' },
];

export function getPlate(sigma) {
  return theoryAtlas.find((entry) => entry.sigma === sigma) ?? theoryAtlas[0];
}
