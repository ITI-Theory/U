// Current implementation inventory. This is intentionally separate from the
// theory atlas: it records renderer coverage, not scientific authority.
export const sceneCoverage = [
  { sigma: 0, id: 'quantum-foam', label: 'QUANTUM FOAM', status: 'dedicated', route: 'I / quantum foam, threshold events, 2D density' },
  { sigma: 1, id: 'string-boundary', label: 'STRING BOUNDARY', status: 'generic', route: 'I / generic morphology' },
  { sigma: 2, id: 'nuclear', label: 'NUCLEAR', status: 'generic', route: 'I / generic morphology' },
  { sigma: 3, id: 'atomic', label: 'ATOMIC', status: 'generic', route: 'I / generic morphology' },
  { sigma: 4, id: 'cellular', label: 'CELLULAR', status: 'dedicated', route: 'II / volumetric cells and 8D EMF contours' },
  { sigma: 5, id: 'local-circuit', label: 'LOCAL CIRCUIT', status: 'generic', route: 'II / generic morphology' },
  { sigma: 6, id: 'whole-brain', label: 'WHOLE BRAIN', status: 'generic', route: 'II / generic morphology' },
  { sigma: 7, id: 'organism', label: 'ORGANISM', status: 'generic', route: 'III / generic morphology' },
  { sigma: 8, id: 'human-vertebrate', label: 'HUMAN / VERTEBRATE', status: 'dedicated', route: 'III / 4D, 8D, 11D organism rig' },
  { sigma: 9, id: 'dyad', label: 'DYAD', status: 'generic', route: 'III / generic morphology' },
  { sigma: 10, id: 'swarm', label: 'SWARM', status: 'generic', route: 'III / generic morphology' },
  { sigma: 11, id: 'community-city', label: 'COMMUNITY / CITY', status: 'generic', route: 'IV / generic morphology' },
  { sigma: 12, id: 'regional-system', label: 'REGIONAL SYSTEM', status: 'generic', route: 'IV / generic morphology' },
  { sigma: 13, id: 'orbital-system', label: 'ORBITAL SYSTEM', status: 'generic', route: 'IV / generic morphology' },
  { sigma: 14, id: 'stellar-neighborhood', label: 'STELLAR NEIGHBORHOOD', status: 'dedicated', route: 'IV / stellar core, orbits, node relations' },
  { sigma: 15, id: 'geological', label: 'GEOLOGICAL', status: 'generic', route: 'IV / generic morphology' },
  { sigma: 16, id: 'planetary', label: 'PLANETARY', status: 'generic', route: 'IV / generic morphology' },
  { sigma: 17, id: 'stellar-cluster', label: 'STELLAR CLUSTER', status: 'generic', route: 'V / generic morphology' },
  { sigma: 18, id: 'galactic', label: 'GALACTIC', status: 'generic', route: 'V / generic morphology' },
  { sigma: 19, id: 'cosmic-web', label: 'COSMIC WEB', status: 'dedicated', route: 'V / cosmic node and link field' },
];

export const namedSolutionCoverage = [
  { id: 'bird', status: 'planned', parent: 'human-vertebrate', target: 'flock' },
  { id: 'flock', status: 'generic', parent: 'bird', target: 'colony-roost' },
  { id: 'colony-roost', status: 'planned', parent: 'flock', target: 'community-city' },
];

export function getSceneCoverageSummary() {
  const dedicated = sceneCoverage.filter((entry) => entry.status === 'dedicated').length;
  return { total: sceneCoverage.length, dedicated, remaining: sceneCoverage.length - dedicated };
}