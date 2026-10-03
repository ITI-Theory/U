# Appendix A: Units and Constants {-}

The worked examples use the values below. They are rounded to the figures the arithmetic needs; `scripts/verify_answers.py` uses the same values, so a printed answer can be checked against them exactly.

| Quantity | Symbol | Value used |
|:--|:--:|--:|
| Speed of light | $c$ | $2.998\times10^{8}\,\mathrm{m\,s^{-1}}$ |
| Planck constant | $h$ | $6.626\times10^{-34}\,\mathrm{J\,s}$ |
| Planck constant times $c$ | $hc$ | $1240\,\mathrm{eV\,nm}$ |
| Reduced Planck constant times $c$ | $\hbar c$ | $197.3\,\mathrm{eV\,nm} = 197.3\,\mathrm{MeV\,fm}$ |
| Elementary charge | $e$ | $1.602\times10^{-19}\,\mathrm{C}$ |
| Electron rest energy | $m_ec^2$ | $0.511\,\mathrm{MeV}$ |
| Proton rest energy | $m_pc^2$ | $938.3\,\mathrm{MeV}$ |
| Coulomb constant times $e^2$ | $ke^2$ | $1.440\,\mathrm{eV\,nm}$ |
| Boltzmann constant | $k_B$ | $1.381\times10^{-23}\,\mathrm{J\,K^{-1}} = 8.617\times10^{-5}\,\mathrm{eV\,K^{-1}}$ |
| Thermal energy at body temperature | $k_BT$ ($310\,\mathrm{K}$) | $0.0267\,\mathrm{eV}$; $\ k_BT/e = 26.7\,\mathrm{mV}$ |
| Avogadro constant | $N_A$ | $6.022\times10^{23}\,\mathrm{mol^{-1}}$ |
| Energy per molecule and per mole | | $1\,\mathrm{eV} = 96.5\,\mathrm{kJ\,mol^{-1}}$ |
| Gravitational constant | $G$ | $6.674\times10^{-11}\,\mathrm{m^3\,kg^{-1}\,s^{-2}}$ |
| Stefan–Boltzmann constant | $\sigma$ | $5.670\times10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}$ |
| Wien constant | $b$ | $2.898\times10^{-3}\,\mathrm{m\,K}$ |
| Rydberg energy | $E_1$ | $13.606\,\mathrm{eV}$ |
| Bohr radius | $a_0$ | $0.0529\,\mathrm{nm}$ |
| Solar mass, radius, luminosity | $M_\odot$, $R_\odot$, $L_\odot$ | $1.989\times10^{30}\,\mathrm{kg}$, $6.957\times10^{8}\,\mathrm{m}$, $3.83\times10^{26}\,\mathrm{W}$ |
| Solar constant | $S$ | $1361\,\mathrm{W\,m^{-2}}$ |
| Earth: $GM$, radius | $GM_\oplus$, $R_\oplus$ | $3.986\times10^{14}\,\mathrm{m^3\,s^{-2}}$, $6.371\times10^{6}\,\mathrm{m}$ |
| Parsec, megaparsec | pc, Mpc | $3.086\times10^{16}\,\mathrm{m}$, $3.086\times10^{22}\,\mathrm{m}$ |
| Light-year | ly | $9.46\times10^{15}\,\mathrm{m}$; $\ 1\,\mathrm{pc} = 3.26\,\mathrm{ly}$ |
| Year | yr | $3.156\times10^{7}\,\mathrm{s}$ |
| Hubble constant (Planck 2018) | $H_0$ | $67.4\,\mathrm{km\,s^{-1}\,Mpc^{-1}} = 2.18\times10^{-18}\,\mathrm{s^{-1}}$ |
| CMB temperature today | $T_0$ | $2.7255\,\mathrm{K}$ |

| Isotope | Half-life | Used for |
|:--|--:|:--|
| Carbon-14 | $5730\,\mathrm{yr}$ | organic remains up to about $50\,000\,\mathrm{yr}$ |
| Potassium-40 | $1.25\times10^{9}\,\mathrm{yr}$ | volcanic rocks and minerals |
| Uranium-238 | $4.47\times10^{9}\,\mathrm{yr}$ | the oldest minerals and meteorites |

## Estimating first {-}

Estimate before calculating. A visible photon carries a few electronvolts because $1240/500 \approx 2.5$; a nerve membrane's field is millions of volts per metre because $0.07/5\times10^{-9}$ is of order $10^{7}$. If a calculated answer differs from the estimate by powers of ten, look first for a unit conversion: nanometres and metres, electronvolts and joules, years and seconds, parsecs and light-years.
