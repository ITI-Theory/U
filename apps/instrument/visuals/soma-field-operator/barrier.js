// barrier.js: the stone in the ureter and the barriers down the scales (ISS-076). The same
// wall, refusing at every scale until the quantum one. The transmission through a barrier of
// width d and height V - E above the particle's energy goes as (WKB, rectangular barrier)
//   T ≈ exp(-2 d sqrt(2 m (V - E)) / ħ),
// so mass and width make it zero for a stone or a cell and real for an electron.
// Order-of-magnitude values, chosen to be typical, not measured: the point is the exponent.

export const HBAR = 1.054571817e-34; // J s
const EV = 1.602176634e-19; // J

// a 6 mm calcium oxalate stone: (4/3) pi (3 mm)^3 x 2000 kg/m^3 ≈ 0.23 g
export const BARRIERS = [
  { id: 'tissue', title: 'THE WALL', scale: '1 mm', who: 'the 6 mm stone (0.23 g)', what: 'the ureter wall: urothelium, lamina propria, smooth muscle, adventitia', m: 2.3e-4, d: 1e-3, dE: 1e-3 },
  { id: 'cell', title: 'A CELL', scale: '10 µm', who: 'a bacterium (1 pg)', what: 'an umbrella cell of the urothelium, its tight junctions sealed', m: 1e-15, d: 1e-6, dE: 1e-15 },
  { id: 'membrane', title: 'THE MEMBRANE', scale: '5 nm', who: 'a sodium ion', what: 'the lipid bilayer: two layers of fat, heads out, tails in', m: 3.82e-26, d: 5e-9, dE: 0.5 * EV },
  { id: 'molecule', title: 'A MOLECULE', scale: '0.05 nm', who: 'a proton', what: 'a hydrogen bond: a proton between two oxygens', m: 1.6726e-27, d: 0.05e-9, dE: 0.3 * EV },
  { id: 'atom', title: 'AN ATOM', scale: '0.5 nm', who: 'an electron', what: 'the gap between two atoms, 1 eV high', m: 9.109e-31, d: 0.5e-9, dE: 1 * EV },
  { id: 'quantum', title: 'QUANTUM', scale: '0.2 nm', who: 'an electron', what: 'a 0.2 nm gap, 1 eV high: the wave reaches through', m: 9.109e-31, d: 0.2e-9, dE: 1 * EV },
];

// 2 kappa d, the exponent: T ≈ exp(-exponent)
export function exponent(b) {
  return (2 * b.d * Math.sqrt(2 * b.m * b.dE)) / HBAR;
}

export function transmission(b) {
  return Math.exp(-exponent(b));
}

// T for people: a percentage when it is visible, else a power of ten (10^-5.2, 10^-3200,
// 10^-(2.7 x 10^13))
export function formatT(b) {
  const lg = -exponent(b) / Math.LN10;
  if (lg > -3) return `${(100 * Math.pow(10, lg)).toPrecision(2)}%`;
  if (lg > -1e5) return `10^${lg.toFixed(lg > -100 ? 1 : 0)}`;
  const e = Math.floor(Math.log10(-lg));
  return `10^-(${(-lg / Math.pow(10, e)).toFixed(1)}×10^${e})`;
}

// the reason, in one line
export function reason(b) {
  const x = exponent(b);
  if (x > 1e6) return `${b.who} is far too heavy and the wall far too wide: the exponent is ${x.toExponential(1)}. Never.`;
  if (x > 30) return `even ${b.who} cannot: the exponent is ${Math.round(x)}. Not in the age of the universe.`;
  if (x > 8) return `${b.who} gets through now and then: the exponent is ${x.toFixed(1)}. Rare, but real.`;
  return `${b.who} is light and the gap is thin: the exponent is ${x.toFixed(1)}. It tunnels.`;
}
