import './era-themes.css';

const BAND_THEMES = {
  cosmic: 'cosmic',
  geological: 'earth',
  palaeontology: 'earth',
  human: 'present',
  philosophy: 'present',
};

const THEME_MATH = {
  cosmic: {
    title: 'Planck-time boundary',
    body: 'Deep-time cards keep the current neon look and use sourced physics already carried by the era record.',
    equations: ['t_P=\\sqrt{\\hbar G/c^5}'],
    note: 'Standard cosmology / dimensional Planck scale.',
  },
  earth: {
    title: 'Stratigraphic time by decay',
    body: 'Earth-history views use the standard exponential decay grammar behind radiometric dating.',
    equations: ['N(t)=N_0e^{-\\lambda t}', 't_{1/2}=\\frac{\\ln 2}{\\lambda}'],
    note: 'Earth-science baseline; not a Soma-specific claim.',
  },
  egypt: {
    title: 'Rhind unit fractions + pyramid seked',
    body: 'Egyptian scribal arithmetic expressed many rationals as unit fractions. The Great Pyramid seked is 5 1/2 palms horizontal per cubit rise; since 1 cubit = 7 palms, the face angle is arctan(7/5.5) = 51.84°.',
    equations: ['\\frac{2}{7}=\\frac14+\\frac1{28}', '\\theta=\\tan^{-1}\\!\\left(\\frac{7}{5.5}\\right)\\approx51.84^\\circ'],
    note: 'Checked numerically in Python: 1/4+1/28=2/7; angle 51.842773°.',
  },
  babylon: {
    title: 'YBC 7289 square root of two',
    body: 'Old Babylonian sexagesimal place value gave an exceptionally accurate diagonal of a unit square. Plimpton 322 records related Pythagorean-triple arithmetic.',
    equations: ['1;24,51,10_{60}=1+\\frac{24}{60}+\\frac{51}{60^2}+\\frac{10}{60^3}\\approx1.41421296', '\\sqrt2\\approx1.41421356'],
    note: 'Checked numerically in Python; error is about -5.99×10⁻⁷.',
  },
  greece: {
    title: 'Euclid I.47 + Eratosthenes',
    body: 'Classical Greek mathematics joined proof geometry with astronomical measurement: Euclid I.47 proves the right-triangle square relation; Eratosthenes estimated Earth’s circumference from shadow angles.',
    equations: ['a^2+b^2=c^2', 'C_{\\oplus}\\approx50\\times5{,}000=250{,}000\\ \\mathrm{stadia}'],
    note: 'Proof and measurement are shown as historical mathematics, not as programme evidence.',
  },
  'islamic-golden-age': {
    title: 'al-Khwarizmi completes the square',
    body: 'The worked quadratic in al-jabr restores balance geometrically by adding a square to both sides.',
    equations: ['x^2+10x=39', '(x+5)^2=39+25=64\\Rightarrow x=3'],
    note: 'The positive root follows the worked example convention of the source tradition.',
  },
  medieval: {
    title: 'Liber Abaci rabbit recurrence',
    body: 'Fibonacci’s 1202 Liber Abaci popularised Hindu-Arabic numerals in Latin Europe and gives the famous rabbit-pair recurrence.',
    equations: ['F_{n+1}=F_n+F_{n-1}', 'F_{12}=144'],
    note: 'Shown as arithmetic transmission and recurrence, not biology.',
  },
  renaissance: {
    title: 'Perspective as projective geometry',
    body: 'Renaissance workshops made a calculable picture plane: a point in space projects to a page by similar triangles.',
    equations: ['x^\\prime=f\\frac{x}{z}', 'y^\\prime=f\\frac{y}{z}'],
    note: 'Notebook / workshop mathematics rendered as a sepia construction surface.',
  },
  enlightenment: {
    title: 'Newtonian dynamics',
    body: 'The Principia era couples motion and gravitation with a compact inverse-square law.',
    equations: ['F=ma', 'F=G\\frac{m_1m_2}{r^2}'],
    note: 'Newton’s 1687 mechanics is the historical claim; app mappings remain separate.',
  },
  modern: {
    title: 'Fields, relativity, and quanta',
    body: 'Modern physics made field equations, spacetime curvature, and non-commuting observables standard mathematical objects.',
    equations: ['\\nabla\\cdot\\mathbf{E}=\\rho/\\varepsilon_0', 'G_{\\mu\\nu}+\\Lambda g_{\\mu\\nu}=\\frac{8\\pi G}{c^4}T_{\\mu\\nu}', '[\\hat x,\\hat p]=i\\hbar'],
    note: 'The card changes per era when a more specific modern example is available.',
  },
  expressionism: {
    kind: 'idea',
    title: 'Inner necessity and charged colour',
    body: 'Der Blaue Reiter and Expressionism treated colour, line, and distortion as carriers of inner necessity rather than optical imitation.',
    note: 'Original UI geometry only: saturated fields, diagonal force lines, and photocopy grain evoke the archive without reproducing artworks.',
  },
  constructivism: {
    kind: 'idea',
    title: 'Pure geometric form becomes social construction',
    body: 'Suprematism stripped painting toward basic geometric feeling; Constructivism turned diagonals, grids, and material construction toward public life and production.',
    note: 'Original red/black diagonals and registration offsets; no copied posters or catalogue scans.',
  },
  bauhaus: {
    kind: 'idea',
    title: 'Point, line, plane, and teaching grammar',
    body: 'Bauhaus teaching made elementary forms into a design language: point as event, line as trajectory, plane as field, colour as construction.',
    note: 'Kandinsky and Klee are treated as historical teaching references; the interface motifs are generated CSS geometry.',
  },
  'color-field': {
    kind: 'idea',
    title: 'Colour field as atmosphere',
    body: 'Abstract Expressionist colour-field painting made large colour relations and edges into an immersive encounter rather than a represented scene.',
    note: 'The theme uses original stacked colour fields and toner grain, not reproductions of Rothko or other paintings.',
  },
  'pop-art': {
    kind: 'idea',
    title: 'Mass image, repetition, and halftone',
    body: 'Pop Art pulled commercial reproduction, celebrity, packaging, and serial repetition into high art’s frame.',
    note: 'Generated halftone dots and punchy blocks evoke print culture without copying Warhol images.',
  },
  'street-art': {
    kind: 'idea',
    title: 'Stencil, wall, and public intervention',
    body: 'Street art treats the city wall as a fast public surface: stencil edges, tags, paste-ups, and site-specific interruption.',
    note: 'The app uses original stencil-like masks and concrete texture only; no Banksy reproductions.',
  },
  present: {
    title: 'Soma Machine response grammar',
    body: 'The present-day app’s own worked grammar separates formal, sourced, simulated, interpretive, and open-hypothesis claims.',
    equations: ['\\gamma\\dot e=-\\nabla H(e)+\\sqrt{2D}\\,\\xi(t)+J(t)', 'M_4+P_3+L_1+C_3=11D'],
    note: 'This is programme notation, not a historical ancient claim.',
  },
};

const ERA_MATH = {
  'old-kingdom-egypt': THEME_MATH.egypt,
  'old-babylonian-mathematics': THEME_MATH.babylon,
  'classical-greek-mathematics': THEME_MATH.greece,
  'islamic-golden-age-al-khwarizmi': THEME_MATH['islamic-golden-age'],
  'fibonacci-liber-abaci': THEME_MATH.medieval,
  'renaissance-humanism-print': THEME_MATH.renaissance,
  'renaissance-mathematics': THEME_MATH.renaissance,
  'scientific-revolution': THEME_MATH.enlightenment,
  'newton-principia': THEME_MATH.enlightenment,
  'faraday-maxwell': {
    ...THEME_MATH.modern,
    title: 'Maxwell field equations',
    body: 'Maxwell’s 1865 synthesis made electromagnetic fields a literal mathematical physics object.',
    equations: ['\\nabla\\cdot\\mathbf{E}=\\rho/\\varepsilon_0', '\\nabla\\times\\mathbf{B}=\\mu_0\\mathbf{J}+\\mu_0\\varepsilon_0\\partial_t\\mathbf{E}'],
    note: 'Uses the modern vector-calculus form of Maxwell’s equations.',
  },
  'maxwell-field-equations': {
    ...THEME_MATH.modern,
    title: 'Maxwell field equations',
    body: 'Maxwell’s 1865 synthesis made electromagnetic fields a literal mathematical physics object.',
    equations: ['\\nabla\\cdot\\mathbf{E}=\\rho/\\varepsilon_0', '\\nabla\\times\\mathbf{B}=\\mu_0\\mathbf{J}+\\mu_0\\varepsilon_0\\partial_t\\mathbf{E}'],
    note: 'Uses the modern vector-calculus form of Maxwell’s equations.',
  },
  'einstein-general-relativity': {
    ...THEME_MATH.modern,
    title: 'Einstein field equations',
    body: 'General relativity encodes gravitation as spacetime curvature sourced by stress-energy.',
    equations: ['G_{\\mu\\nu}+\\Lambda g_{\\mu\\nu}=\\frac{8\\pi G}{c^4}T_{\\mu\\nu}'],
    note: '1915 equation form; constants shown in conventional modern notation.',
  },
  'quantum-matrix-wave-mechanics': {
    ...THEME_MATH.modern,
    title: 'Matrix and wave mechanics',
    body: 'The 1925-26 quantum turn replaces commuting classical variables with operators and wave evolution.',
    equations: ['[\\hat x,\\hat p]=i\\hbar', 'i\\hbar\\partial_t\\psi=\\hat H\\psi'],
    note: 'Heisenberg 1925 and Schrödinger 1926 are distinct historical sources.',
  },
  'der-blaue-reiter-expressionism': THEME_MATH.expressionism,
  'russian-avant-garde-suprematism-constructivism': THEME_MATH.constructivism,
  'bauhaus-point-line-plane': THEME_MATH.bauhaus,
  'abstract-expressionism-color-field': THEME_MATH['color-field'],
  'pop-art-warhol': THEME_MATH['pop-art'],
  'street-art-global': THEME_MATH['street-art'],
  ttheory: THEME_MATH.present,
  sherlock: THEME_MATH.present,
};

export function themeForEra(era) {
  if (!era) return null;
  return era.theme ?? BAND_THEMES[era.band] ?? null;
}

export function applyEraTheme(era) {
  const theme = themeForEra(era);
  const root = document.documentElement;
  if (!theme) {
    root.removeAttribute('data-era-theme');
    root.removeAttribute('data-era-id');
    return;
  }
  root.dataset.eraTheme = theme;
  root.dataset.eraId = era.id;
}

export function mathForEra(era) {
  if (!era) return null;
  const theme = themeForEra(era);
  return ERA_MATH[era.id] ?? THEME_MATH[theme] ?? null;
}

export function renderEraMath(host, era) {
  const math = mathForEra(era);
  if (!math) return;
  const section = document.createElement('section');
  section.className = 'era-math';
  const kicker = document.createElement('p');
  kicker.className = 'era-math__kicker';
  kicker.textContent = math.kind === 'idea' ? 'IDEA OF THE ERA' : 'MATHS OF THE ERA';
  const title = document.createElement('h3');
  title.textContent = math.title;
  const body = document.createElement('p');
  body.className = 'era-math__body';
  body.textContent = math.body;
  const equations = document.createElement('div');
  equations.className = 'era-math__equations';
  for (const source of math.equations ?? []) {
    const line = document.createElement('div');
    line.className = 'era-math__equation';
    if (globalThis.katex) globalThis.katex.render(source, line, { displayMode: false, throwOnError: false });
    else line.textContent = source;
    equations.append(line);
  }
  const note = document.createElement('p');
  note.className = 'era-math__note';
  note.textContent = math.note;
  section.append(kicker, title, body);
  if (math.equations?.length) section.append(equations);
  section.append(note);
  host.append(section);
}
