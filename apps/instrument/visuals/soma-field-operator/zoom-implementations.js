// Canonical USF Zoom Operator implementations.
// The continuous dependent operator is primary. I-V and OOM 0-20 are ordered
// realizations of it; neither is a narrative route or a replacement type system.

export const zoomEquation = {
  operator: '\\Lambda : \\mathrm{ScaleLevel} \\to \\mathrm{FieldEquation}',
  dependentType: '\\mathrm{FieldEquation}(\\sigma) = \\{ k(\\sigma)>0,\\;G_{\\sigma}:\\mathbb{R}\\to\\mathbb{R}\\to\\mathbb{R},\\;\\mathcal{S}(\\sigma),\\;\\mathcal{B}(\\sigma) \\}',
  invariant: '(\\nabla^2 + k(\\sigma)^2)G_{\\sigma}(x,x\') = \\delta(x-x\')',
  manifold: '\\mathcal{M}_{11}(\\sigma)=M_4(\\sigma)\\times P_3(\\sigma)\\times L_1(\\sigma)\\times C_3(\\sigma)',
  source: 'paper/soma/zoomable-somatic-field/zoomable-somatic-field.md §4.1; paper/proofs/UniversalSomaticField.lean',
};

export const canonicalBands = [
  { id: 'I', label: 'I / QUANTUM TO CLASSICAL', oom: [0, 4], change: 'Spacetime geometry emerges; probability amplitude resolves into matter.' },
  { id: 'II', label: 'II / CHEMISTRY TO BIOLOGY', oom: [4, 7], change: 'Self-replication and homeostatic regulation appear.' },
  { id: 'III', label: 'III / INDIVIDUAL TO COLLECTIVE', oom: [7, 10], change: 'Agency distributes across coupled agents.' },
  { id: 'IV', label: 'IV / GEOLOGICAL TO STELLAR', oom: [10, 14], change: 'Self-gravity dominates over chemical binding.' },
  { id: 'V', label: 'V / STELLAR TO COSMIC', oom: [14, 20], change: 'Dark energy and expansion compete with gravity.' },
];

export const zoomImplementations = [
  {
    id: 'canonical-i-v',
    label: 'I-V / CANONICAL PHYSICS',
    coordinate: 'CanonicalBand',
    ticks: canonicalBands.map(band => band.id),
    description: 'Five ordered qualitative transition bands of the continuous USF Zoom Operator.',
  },
  {
    id: 'oom-0-20',
    label: '0-20 OOM / EXPANDED ATLAS',
    coordinate: 'ScaleLevel = Fin(21)',
    ticks: Array.from({ length: 21 }, (_, sigma) => sigma),
    description: 'Twenty-one pedagogical tick marks, from quantum foam to cosmic web, preserving the canonical I-V band order.',
  },
];

const universalTwentyEquations = [
  ['01 / STRING', 'G_{1}(s,s\')=-\\frac{\\alpha\'}{2}\\log|s-s\'|^2', '\\ell\\sim10^{-32}\\,\\mathrm m'],
  ['02 / NUCLEAR', 'G_{2}(r)=\\frac{e^{-m_{\\pi}r}}{4\\pi r}', 'r\\lesssim2\\,\\mathrm{fm}'],
  ['03 / ATOMIC', 'G_{3}(r)=\\frac{1}{4\\pi r}', '\\ell\\sim10^{-10}\\,\\mathrm m'],
  ['04 / MOLECULAR', 'G_{4}(x,x\')=\\frac{e^{ik_{4}|x-x\'|}}{4\\pi|x-x\'|}', '\\ell\\sim10^{-9}\\,\\mathrm m'],
  ['05 / CELLULAR', '(\\partial_x^2-\\lambda^{-2})G_{5}(x,x\')=\\delta(x-x\')', '\\ell\\sim10^{-6}\\,\\mathrm m'],
  ['06 / BRAIN / CEMI', '(\\nabla^2+k_{6}^{2})G_{6}(x,x\')=\\delta(x-x\')', '\\ell\\sim10^{-1}\\,\\mathrm m'],
  ['07 / ORGANISM', '(\\nabla^2+k_{7}^{2})G_{7}(x,x\')=\\delta(x-x\')', '\\ell\\sim10^{0}\\,\\mathrm m'],
  ['08 / ANIMAL SWARM', '\\partial_t\\mathbf v+\\lambda(\\mathbf v\\!\\cdot\\!\\nabla)\\mathbf v=-\\nabla P+D_T\\nabla^2\\mathbf v', '\\ell\\sim10^{0}\\!\\text{--}10^{1}\\,\\mathrm m'],
  ['09 / SOCIETY / CITY', 'P(s_i\\to1)=\\operatorname{sigmoid}\\!\\left(\\sum_jG_{ij}s_j-\\theta\\right)', '\\ell\\sim10^{3}\\,\\mathrm m'],
  ['10 / GEOLOGICAL', '\\rho\\,\\partial_{tt}u_i=C_{ijkl}\\partial_j\\partial_ku_l', '\\ell\\sim10^{5}\\,\\mathrm m'],
  ['11 / PLANETARY', '\\rho(\\partial_t+\\mathbf u\\!\\cdot\\!\\nabla)\\mathbf u=-\\nabla P+\\eta\\nabla^2\\mathbf u+\\rho\\mathbf g', '\\ell\\sim10^{6}\\,\\mathrm m'],
  ['12 / ORBITAL', 'G_{12}(r)=-\\frac{Gm}{r}', '\\ell\\sim10^{9}\\,\\mathrm m'],
  ['13 / STELLAR', '(\\nabla^2+k_{13}^{2})G_{13}(x,x\')=\\delta(x-x\')', '\\ell\\sim10^{11}\\,\\mathrm m'],
  ['14 / COMPACT OBJECT', 'G_{14}(t)\\propto e^{-t/\\tau_{\\mathrm{ring}}}\\cos(\\omega_{\\mathrm{QNM}}t)', '10^{3}\\!\\text{--}10^{10}\\,\\mathrm m'],
  ['15 / GALACTIC', '\\nabla^2\\Phi_{15}=4\\pi G\\rho_{15}', '\\ell\\sim10^{20}\\,\\mathrm m'],
  ['16 / GALACTIC HALO', '\\nabla^2\\Phi_{16}=4\\pi G\\rho_{\\mathrm{halo}}', '\\ell\\sim10^{22}\\,\\mathrm m'],
  ['17 / CLUSTER', '(\\partial_\\eta^2+2\\mathcal H\\partial_\\eta-c_s^2\\nabla^2)G_{17}=\\delta^{(4)}', '\\ell\\sim10^{23}\\,\\mathrm m'],
  ['18 / FILAMENTS', '(\\partial_\\eta^2+2\\mathcal H\\partial_\\eta-c_s^2\\nabla^2)G_{18}=\\delta^{(4)}', '\\ell\\sim10^{24}\\,\\mathrm m'],
  ['19 / UNIVERSE', '\\Box h_{\\mu\\nu}=-16\\pi G\\,T_{\\mu\\nu}', '\\ell\\sim10^{26}\\,\\mathrm m'],
  ['20 / COSMIC WEB', 'G_{20}(x,x\')=\\frac{\\theta(t-t\')\\delta((x-x\')^2)}{2\\pi}', '\\ell\\sim10^{26}\\,\\mathrm m'],
];

const birdFlockEquations = universalTwentyEquations.map(([label, equation, scale]) => [label, equation, scale]);
birdFlockEquations[6] = ['07 / BIRD', 'M_b\\ddot{\\mathbf x}=\\mathbf F_{\\mathrm{aero}}+\\mathbf F_{\\mathrm{gravity}}+\\mathbf F_{\\mathrm{muscle}}', '\\ell\\sim10^{0}\\,\\mathrm m'];
birdFlockEquations[7] = ['08 / FLOCK', '\\partial_t\\mathbf v_b+\\lambda_b(\\mathbf v_b\\!\\cdot\\!\\nabla)\\mathbf v_b=-\\nabla P_b+D_b\\nabla^2\\mathbf v_b+\\mathbf f_{\\mathrm{aero}}', '\\ell\\sim10^{0}\\!\\text{--}10^{1}\\,\\mathrm m'];
birdFlockEquations[8] = ['09 / COLONY / ROOST', '\\dot{\\rho}_b+\\nabla\\!\\cdot(\\rho_b\\mathbf v_b)=0', '\\ell\\sim10^{3}\\,\\mathrm m'];

export const usfModels = [
  {
    id: 'canonical-i-v',
    label: 'I-V / CANONICAL PHYSICS',
    route: 'canonical-i-v',
    description: 'Five physics-derived transition sectors of the shared USF architecture.',
    equations: canonicalBands.map(band => [
      `${band.id} / ${band.label.split('/ ')[1]}`,
      `\\mathcal F_{${band.id}}=\\bigoplus_{\\sigma=${band.oom[0]}}^{${band.oom[1]}}\\left[(\\nabla_\\sigma^2+k_\\sigma^2)G_\\sigma=\\delta_\\sigma\\right]`,
      band.change,
    ]),
  },
  {
    id: 'universal-1-20',
    label: '1-20 / UNIVERSAL CATALOGUE',
    route: 'full-atlas',
    description: 'Twenty explicit substrate-specific propagators from the zoomable USF catalogue.',
    equations: universalTwentyEquations,
  },
  {
    id: 'bird-flock',
    label: 'BIRD / FLOCK',
    route: 'animal-to-flock',
    description: 'A distinct USF solution: avian body, aerodynamic forcing, and active-matter flock propagation.',
    equations: birdFlockEquations,
  },
];

export function getUSFModel(id) {
  return usfModels.find(model => model.id === id) ?? usfModels[1];
}

export function getBandForOOM(sigma) {
  return canonicalBands.find(band => sigma >= band.oom[0] && sigma <= band.oom[1]) ?? canonicalBands[canonicalBands.length - 1];
}

export function expandCanonicalRange(startId, endId, detail = 'oom-0-20') {
  const start = canonicalBands.findIndex(band => band.id === startId);
  const end = canonicalBands.findIndex(band => band.id === endId);
  const lower = Math.min(start, end);
  const upper = Math.max(start, end);
  const bands = canonicalBands.slice(lower, upper + 1);
  if (detail === 'canonical-i-v') return bands.map(band => band.id);
  return Array.from({ length: bands[bands.length - 1].oom[1] - bands[0].oom[0] + 1 }, (_, index) => bands[0].oom[0] + index);
}

export function expandViaLevel(startId, sigma, endId, detail = 'oom-0-20') {
  const start = canonicalBands.findIndex(band => band.id === startId);
  const end = canonicalBands.findIndex(band => band.id === endId);
  const viaBand = canonicalBands.findIndex(band => sigma >= band.oom[0] && sigma <= band.oom[1]);
  const lower = Math.min(start, viaBand, end);
  const upper = Math.max(start, viaBand, end);
  return expandCanonicalRange(canonicalBands[lower].id, canonicalBands[upper].id, detail);
}
