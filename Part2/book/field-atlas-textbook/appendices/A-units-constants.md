# Appendix A: Units and Constants {-}

This appendix lists constants and unit conversions used in the worked examples. Values are rounded to the precision needed for textbook arithmetic.

| Quantity | Symbol | Value used |
|---|---:|---:|
| Speed of light | $c$ | $2.99792458\times10^8\,\mathrm{m\,s^{-1}}$ |
| Planck constant times $c$ | $hc$ | $1240\,\mathrm{eV\,nm}$ |
| Solar luminosity | $L_\odot$ | $3.828\times10^{26}\,\mathrm{W}$ |
| Parsec | pc | $3.085677581\times10^{16}\,\mathrm{m}$ |
| Hubble constant example | $H_0$ | $67.4\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$ |
| Hydrogen ground energy | $E_1$ | $-13.6\,\mathrm{eV}$ |
| Bohr radius | $a_0$ | $0.0529\,\mathrm{nm}$ |
| Uranium-238 half-life | $t_{1/2}$ | $4.47\,\mathrm{Ga}$ |

::: {.key-equations}
Dimensional checks used repeatedly are $v=f\lambda$, $F=L/(4\pi d^2)$, $N/N_0=2^{-t/t_{1/2}}$, and $1\,\mathrm{Mpc}=10^6\,\mathrm{pc}$.
:::

## Using the table {-}

The constants are rounded for transparent arithmetic, not for precision metrology. When a worked example asks for a conceptual comparison, three significant figures are usually enough. When a claim compares cosmological parameters at the percent level, the source of the baseline value and the unit conversion must be stated. Students should always carry units through the calculation before substituting numbers into a final expression.

A useful checking habit is to estimate before calculating. A photon near $500\,\mathrm{nm}$ should have energy of a few electron volts because $1240/500$ is near 2.5. A parsec is about $3\times10^{16}\,\mathrm{m}$, so ten parsecs is about $3\times10^{17}\,\mathrm{m}$. If a calculator answer differs by many powers of ten from the estimate, the most likely cause is a unit conversion error.

The answer-verification script in this folder uses these rounded values. It is not a substitute for a specialist reference; it is a guard against textbook arithmetic drifting away from the numbers printed in examples and problem solutions.
`nFor open review, keep any future constant changes in this appendix and in `scripts/verify_answers.py` together. A changed value that is not propagated to examples can silently alter conclusions, especially in cosmology where squared factors of the Hubble constant appear.`n
`nWhere a chapter uses rounded constants, the printed answer should be judged against the same rounded constants. More precise constants may shift final digits without changing the concept being taught.`n Every release should rebuild the PDF and HTML after such changes so examples, answers, captions, and tables remain synchronized across formats.
