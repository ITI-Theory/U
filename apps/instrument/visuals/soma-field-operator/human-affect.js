// Human music-affect data shared by the USM web route and future controller adapters.
// Mechanism maps are design hypotheses until the cited body-map literature audit is complete.

export const appraisalDimensions = [
  { id: 'novelty', label: 'NOVELTY', description: 'Familiarity versus surprise in the music or situation.' },
  { id: 'expectation', label: 'EXPECTATION', description: 'Expected versus violated musical or extra-musical outcome.' },
  { id: 'goalRelevance', label: 'GOAL RELEVANCE', description: 'How strongly the music or situation matters to the listener now.' },
  { id: 'goalConduciveness', label: 'GOAL FIT', description: 'How conducive or obstructive the episode is to an active goal.' },
  { id: 'coping', label: 'COPING', description: 'Perceived capacity to understand, act, or remain with the experience.' },
  { id: 'agency', label: 'AGENCY', description: 'Attribution to self, performer, composer, situation, or other cause.' },
];

export const bodyGrid = {
  columns: 8,
  rows: 8,
  regions: {
    head: [2, 3, 4, 5],
    throat: [10, 11, 12, 13],
    chest: [18, 19, 20, 21, 26, 27, 28, 29],
    arms: [16, 17, 22, 23, 24, 25, 30, 31, 32, 33, 38, 39],
    abdomen: [34, 35, 36, 37, 42, 43, 44, 45],
    legs: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
    spine: [3, 11, 19, 27, 35, 43, 51, 59],
  },
  mechanismRegions: {
    B: ['chest', 'throat', 'arms'],
    R: ['chest', 'arms', 'legs'],
    E1: ['head', 'chest'],
    C: ['head', 'chest', 'arms'],
    V: ['head', 'chest'],
    E2: ['head', 'chest', 'abdomen'],
    M: ['spine', 'chest', 'abdomen'],
    A: ['head', 'chest'],
  },
  provenance: 'DESIGN MAP / body-region placements require source-specific audit before sourced claim status.',
};
