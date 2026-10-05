# Cosmology: The Universe as a Whole {#ch:cosmology}

![Two pillars of modern cosmology. Left: Hubble's law. Galaxies recede at speeds proportional to their distance; the points are simulated around the measured slope, scattered by each galaxy's own motion. Right: the cosmic microwave background, the afterglow of the hot early universe, which reaches us from every direction with the spectrum of a blackbody at $2.7255\,\mathrm{K}$.](figures/generated/ch10-banner.png){.opener}

The last level of the Atlas is the universe itself. Cosmology asks how big it is, how old, what it is made of and how it has changed, and over the last century those questions have moved from speculation to measurement. The universe is expanding; it was once hot and dense; it rang with sound waves whose imprint can still be measured; and about $95\,\%$ of its energy is in two forms, dark matter and dark energy, whose nature is unknown. That last fact is where the programme behind this Atlas makes its boldest proposals. This chapter builds the standard picture first, then states those proposals in full, with the arithmetic, the assumptions and the tests that could refute them.

**Chapter outline.** [-@sec:cosmology-expanding-universe] An expanding universe · [-@sec:cosmology-budget-universe] The budget of the universe · [-@sec:cosmology-afterglow-hot-beginning] The afterglow of the hot beginning · [-@sec:cosmology-universe-rang] The universe rang · [-@sec:cosmology-programme-proposes-dark] What the programme proposes for the dark sectors · [-@sec:cosmology-testing-proposal] Testing the proposal

## An expanding universe {#sec:cosmology-expanding-universe}

::: {.learning-objectives}
- use Hubble's law to relate distance, speed and redshift;
- compute the Hubble time from $H_0$;
- explain why expansion has no centre.
:::

In 1929 Edwin Hubble combined distances to nearby galaxies with their Doppler shifts and found that, on average, galaxies recede from us at speeds proportional to their distance [@hubble1929relation]:

$$v = H_0\,d.$$ {#eq:cosmology-hubble}

The **Hubble constant** $H_0$ is measured today as about $67$ to $73\,\mathrm{km\,s^{-1}}$ per megaparsec, depending on the method; this chapter uses the Planck satellite's $67.4$ [@planck2018cosmology]. The disagreement between methods, called the **Hubble tension**, is one of the open problems of the subject.

Hubble's law does not put us at the centre. If every distance in the universe grows by the same factor, every observer in every galaxy sees the same law. The usual picture is raisins in a rising loaf: each raisin sees all the others moving away, faster the farther they are, and none is the centre. The light from a receding galaxy is stretched along with space, so its spectral lines, @ch:atoms's fingerprints, arrive at longer wavelengths: the **redshift** $z = \Delta\lambda/\lambda$, which for nearby galaxies is $v/c$.

Run the expansion backwards and the galaxies converge. The time it would take at today's rate is the **Hubble time**, $1/H_0$, about $14.5$ billion years. The measured age of the universe, $13.8$ billion years, is close to it but not equal, because the rate of expansion has changed over time.

::: {.example #ex:cosmology-galaxy-100-megaparsecs title="A galaxy at 100 megaparsecs"}
A galaxy lies $100\,\mathrm{Mpc}$ away. How fast does it recede, and what is its redshift?

**Strategy.** $v = H_0d$; then $z = v/c$.

**Solution.** $v = 67.4\times100 = 6740\,\mathrm{km\,s^{-1}}$, and $z = 6740/299\,792 = 0.022$.

**Significance.** Its hydrogen line at $656.3\,\mathrm{nm}$ arrives at $656.3\times1.022 = 671\,\mathrm{nm}$, a shift of $15\,\mathrm{nm}$, two hundred times the annual swing of @ex:atoms-line-moving-planet. Every galaxy's spectrum carries its distance.
:::

{{Visualize | ex:cosmology-galaxy-100-megaparsecs | function-plot:cosmic | f="67.4*x"; name="$H_0 = 67.4$"; f2="73*x"; name2="$H_0 = 73$"; x=[0,400]; value_at=100; expect_value=6740; legend=below; xlabel="distance (Mpc)"; ylabel="recession speed (km/s)"; label=fig:cosmology-hubble; height=26% }} Hubble's law for the two disputed values of the expansion rate. The galaxy of @ex:cosmology-galaxy-100-megaparsecs recedes at $6740\,\mathrm{km\,s^{-1}}$ (red point) on the microwave-background value; local distance ladders give a line about $8\,\%$ steeper, the Hubble tension of @ch:dark-sectors.

::: {.check-your-learning}
Convert $H_0 = 67.4\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$ to SI units, using $1\,\mathrm{Mpc} = 3.086\times10^{22}\,\mathrm{m}$, and find the Hubble time in years. (Answer: $H_0 = 2.18\times10^{-18}\,\mathrm{s^{-1}}$; $1/H_0 = 4.58\times10^{17}\,\mathrm{s} = 14.5$ billion years.)
:::

## The budget of the universe {#sec:cosmology-budget-universe}

::: {.learning-objectives}
- compute the critical density from $H_0$;
- define the density parameters and state their measured values;
- distinguish the evidence for dark matter from the evidence for dark energy.
:::

Einstein's equations, applied to a universe that is the same everywhere on large scales, give the **Friedmann equation** for the expansion rate $H$:

$$H^2 = \frac{8\pi G}{3}\rho + \frac{\Lambda c^2}{3} - \frac{kc^2}{a^2},$$

where $\rho$ is the density of matter and radiation, $\Lambda$ is Einstein's **cosmological constant**, $k$ measures the curvature of space and $a$ is the scale factor by which all distances grow. Measurements show that space is flat, $k = 0$, to within a fraction of a per cent. A flat universe expanding at rate $H_0$ must then contain exactly the **critical density**

$$\rho_c = \frac{3H_0^2}{8\pi G},$$

about $8.5\times10^{-27}\,\mathrm{kg\,m^{-3}}$, the mass of five hydrogen atoms per cubic metre. Each component is quoted as a fraction of it, a **density parameter** $\Omega$. Planck's measurements give [@planck2018cosmology]:

| Component | $\Omega$ | Evidence |
|:--|:--|:--|
| Dark energy ($\Lambda$) | 0.685 | accelerating expansion from supernovae; flatness plus measured matter |
| Dark matter | 0.265 | rotation curves (@ch:stars), lensing, cosmic microwave background, structure formation |
| Ordinary matter | 0.049 | primordial element abundances; cosmic microwave background |

The evidence for the two dark components is different in kind. Dark matter pulls: it is detected by its gravity on stars, gas and light, and it clusters. Dark energy pushes: in 1998 two teams found that distant supernovae are fainter than expected, so the expansion is speeding up [@riess1998observational; @perlmutter1999measurements]. A cosmological constant does this, since it acts as an energy of empty space whose density does not dilute as space grows.

::: {.example #ex:cosmology-critical-density title="The critical density"}
Compute $\rho_c$ for $H_0 = 2.18\times10^{-18}\,\mathrm{s^{-1}}$, and express it as hydrogen atoms (mass $1.67\times10^{-27}\,\mathrm{kg}$) per cubic metre.

**Strategy.** Substitute into $\rho_c = 3H_0^2/8\pi G$.

**Solution.** $\rho_c = 3\times(2.18\times10^{-18})^2/(8\pi\times6.67\times10^{-11}) = 8.5\times10^{-27}\,\mathrm{kg\,m^{-3}}$, which is $5.1$ hydrogen atoms per cubic metre.

**Significance.** The universe is emptier than any laboratory vacuum. Ordinary matter is $4.9\,\%$ of this, a quarter of an atom per cubic metre on average; most of it is in thin gas between galaxies.
:::

## The afterglow of the hot beginning {#sec:cosmology-afterglow-hot-beginning}

::: {.learning-objectives}
- relate the temperature of the cosmic microwave background to redshift;
- explain why hydrogen became neutral at about $3000\,\mathrm{K}$ rather than at $13.6\,\mathrm{eV}$;
- find the peak of the background's spectrum.
:::

If the universe has expanded, it was once denser, and the radiation in it hotter: as space stretches, the wavelength of every photon stretches with it, and a blackbody spectrum stays a blackbody at a temperature that falls as $1/a$. Early enough, everything was hot enough to be ionised, a glowing plasma in which light could not travel far before scattering off a free electron. As the universe cooled, electrons and protons combined into hydrogen atoms and the universe became transparent. The light released then, stretched a thousandfold since, fills the sky today as the **cosmic microwave background** (CMB), discovered by accident in 1965 by Penzias and Wilson [@penzias1965cmb]. Its spectrum, measured in the 1990s, matches a blackbody at $2.7255\,\mathrm{K}$ to better than one part in ten thousand.

At what temperature did hydrogen become neutral? Its binding energy is $13.6\,\mathrm{eV}$, which corresponds to $160\,000\,\mathrm{K}$, but the answer is about $3000\,\mathrm{K}$, where $k_BT$ is only $0.26\,\mathrm{eV}$. The reason is the Saha balance of @ch:stars with an extreme number: the universe holds more than a billion photons for every proton. Even when the typical photon is far too weak to ionise hydrogen, the rare photons in the blackbody's high-energy tail outnumber the atoms and keep them ionised, until the temperature falls far enough.

::: {.example #ex:cosmology-then-now title="Then and now"}
The CMB was released at a redshift of about $1090$, when distances were $1/(1 + z)$ of today's. What was its temperature then, and what was $k_BT$?

**Strategy.** Temperature scales as $1 + z$.

**Solution.** $T = 2.7255\times1091 = 2970\,\mathrm{K}$, and $k_BT = 8.617\times10^{-5}\times2970 = 0.26\,\mathrm{eV}$.

**Significance.** Hydrogen became neutral at a temperature where the typical photon carried about a fiftieth of the ionisation energy. The same Boltzmann and Saha physics that sets the strength of hydrogen lines in Sirius (@ch:stars) set the moment the universe became transparent.
:::

::: {.check-your-learning}
Where does the CMB's spectrum peak in wavelength, by Wien's law? (Answer: $2.898\times10^{-3}/2.7255 = 1.06\,\mathrm{mm}$. Per unit frequency the peak is at $160\,\mathrm{GHz}$, or $1.9\,\mathrm{mm}$; the two peaks differ because the spectrum is plotted per unit of different quantities.)
:::

## The universe rang {#sec:cosmology-universe-rang}

::: {.learning-objectives}
- describe baryon acoustic oscillations as sound waves in the early plasma;
- state the sound speed and the size of the sound horizon;
- connect the acoustic peaks to the response grammar of @ch:response.
:::

Before it became transparent, the plasma of the early universe was a fluid of photons, electrons and nuclei with a pressure, and so it carried sound. Any slight overdensity was a kick: dark matter pulled the plasma in, the photons' pressure pushed it back out, and a spherical sound wave rippled outwards at about $c/\sqrt3$, $58\,\%$ of the speed of light. When the universe became transparent the photons streamed away, the pressure vanished, and each ripple froze where it was: a shell of slightly extra matter at a fixed radius, the **sound horizon**, now about $150\,\mathrm{Mpc}$ in radius after expansion.

The ripples are visible in two places. In the CMB they appear as a series of peaks in the strength of temperature variations against angular scale, the harmonics of a ringing universe; the first peak marks the fundamental, the mode that had just reached maximum compression at release. In the distribution of galaxies they appear as a slight excess of pairs separated by the sound horizon, the **baryon acoustic oscillation** first detected in 2005 [@eisenstein2005bao]. That separation is a standard ruler of known size, which measures distances across the universe. In the language of @ch:response, the early universe is a resonator, the overdensities are its kicks, and the CMB peaks are its resonance curve, read off the sky.

::: {.check-your-learning}
The sound speed of a photon fluid is $c/\sqrt3$. What fraction of the speed of light is that? (Answer: $0.577$; the presence of matter makes the real value somewhat lower.)
:::

## What the programme proposes for the dark sectors {#sec:cosmology-programme-proposes-dark}

::: {.learning-objectives}
- state the programme's counting rule for $\Omega_\Lambda$, $\Omega_\mathrm{DM}$ and $\Omega_b$;
- compute each prediction and its discrepancy from measurement;
- explain why the comparison for $\Lambda$ does not depend on $H_0$.
:::

The standard model of cosmology describes dark matter and dark energy precisely but does not explain them. The most direct attempt to explain $\Lambda$, as the zero-point energy of quantum fields, gives a value larger than measured by a factor of about $10^{117}$ to $10^{120}$ depending on the cutoff, the worst prediction in physics. The programme's two cosmology papers propose a different origin [@P21; @P22].

They start from the eleven-dimensional spacetime of M-theory, split as one time dimension, three large space dimensions and seven compact ones, $11 = 1 + 3 + 7$. (Penrose surveys this framework in his chapter 31 and criticises the vast freedom its extra dimensions allow [@penrose2004road].) The proposal is that the vacuum of the programme's universal field divides the cosmic energy budget in proportion to these blocks: the seven compact dimensions give dark energy, the three spatial ones give dark matter, and the time dimension gives ordinary matter, halved by the matter–antimatter asymmetry of the early universe. The predictions are

$$\Omega_\Lambda = \frac{7}{11}, \qquad \Omega_\mathrm{DM} = \frac{3}{11}, \qquad \Omega_b = \frac{1}{22}.$$

The cosmological-constant paper writes the first as $\Lambda_\text{USF} = (21/11)H_0^2/c^2$. Since the standard relation is $\Lambda = 3\Omega_\Lambda H_0^2/c^2$, this is the same statement: $21/11 = 3\times7/11$. The figure below compares all three with measurement.

![The measured cosmic energy budget (Planck 2018) beside the programme's fractions $7/11$, $3/11$ and $1/22$. The dark-matter prediction is $3.1\,\%$ high, the dark-energy prediction $7.1\,\%$ low and the ordinary-matter prediction $7.8\,\%$ low.](figures/generated/ch10-dark-sectors.png){width="100%"}

::: {.example #ex:cosmology-three-fractions-against title="Three fractions against the sky"}
Compare $7/11$, $3/11$ and $1/22$ with the measured $0.6847$, $0.2645$ and $0.0493$. What do the three predictions add up to?

**Strategy.** Compute each fraction and its relative difference.

**Solution.** $7/11 = 0.636$, $7.1\,\%$ low. $3/11 = 0.273$, $3.1\,\%$ high. $1/22 = 0.045$, $7.8\,\%$ low. Sum: $0.955$, against $0.999$ measured; the remainder in the standard budget is mostly radiation and neutrinos, at about $0.1\,\%$.

**Significance.** Three numbers from one counting rule land within $8\,\%$ of measurement. Whether that is a discovery or a coincidence is the question of @sec:cosmology-testing-proposal. The leftover $4.5\,\%$ is itself a mismatch that the papers attribute to corrections from the shape of the compact dimensions, not yet calculated.
:::

::: {.example #ex:cosmology-cosmological-constant title="The cosmological constant"}
Compute the programme's $\Lambda_\text{USF}$ and the measured $\Lambda_\text{obs} = 3\Omega_\Lambda H_0^2/c^2$ for $H_0 = 2.184\times10^{-18}\,\mathrm{s^{-1}}$ and $\Omega_\Lambda = 0.6847$. Show that their ratio does not depend on $H_0$.

**Strategy.** Substitute; then divide the two expressions symbolically.

**Solution.** $H_0^2/c^2 = (2.184\times10^{-18})^2/(2.998\times10^{8})^2 = 5.31\times10^{-53}\,\mathrm{m^{-2}}$. $\Lambda_\text{USF} = 1.909\times5.31\times10^{-53} = 1.01\times10^{-52}\,\mathrm{m^{-2}}$; $\Lambda_\text{obs} = 3\times0.6847\times5.31\times10^{-53} = 1.09\times10^{-52}\,\mathrm{m^{-2}}$. The ratio is $(21/11)/(3\times0.6847) = 7/(11\times0.6847) = 0.929$, with no $H_0$ in it.

**Significance.** The Hubble tension cannot rescue or sink this prediction: it is a statement about $\Omega_\Lambda$ alone, and it is $7.1\,\%$ low. The Lean file `CosmologicalConstant.lean` checks the fractions and the discrepancy bounds without any `sorry` [@D2].
:::

## Testing the proposal {#sec:cosmology-testing-proposal}

::: {.learning-objectives}
- distinguish the arithmetic, the identification and the mechanism in the programme's claims;
- state predictions that could refute the proposal;
- label each claim of the chapter correctly.
:::

A proposal of this kind must be judged on three separate levels. The **arithmetic**, that $7/11 = 0.636$ and that it differs from $0.6847$ by less than $8\,\%$, is certain and machine-checked. The **identification**, that the cosmic budget is divided in proportion to dimension counts, is an assumption; the papers motivate it but do not derive it from a full reduction of the eleven-dimensional theory to four dimensions, which they list as an open obligation. The **mechanism**, that the spatial vacuum behaves as cold, pressureless, electrically neutral matter, is shown in a simplified model and awaits that same reduction.

The honest difficulty is coincidence. Simple fractions are dense: for almost any measured number, some ratio of small integers lies within a few per cent of it. A counting rule earns credibility only by predicting something not used to set it up. The dark-matter paper names such predictions [@P22]. Dark matter should never be detected by any non-gravitational experiment, since it carries no charges of the Standard Model. Its pressure should be exactly zero. And the leading-order fractions should stay fixed as measurements improve, so that if future surveys move $\Omega_\mathrm{DM}$ further from $3/11$ than the corrections allow, or a dark-matter particle is detected in the laboratory, the proposal fails.

| Claim | Label |
|:--|:--|
| Expansion, the CMB, acoustic peaks, flatness, $\Omega$ values from Planck | `empirical-result` |
| $7/11$, $3/11$, $1/22$ and their discrepancy bounds | `kernel-verified` [@D2] |
| The cosmic budget divides in proportion to the $7 + 3 + 1$ dimension blocks | `open-hypothesis` |
| The spatial vacuum is pressureless and electrically neutral | `derived-under-assumptions` (simplified model) |
| Dark matter will never be detected non-gravitationally | `open-hypothesis` (a test of the above) |
| The universe as a whole is a conscious subject | not claimed |

The programme's universal-field paper reads all the levels of the Atlas, from quantum foam to this chapter, as one response grammar [@P20]. That reading is `interpretive`. What this book has tried to show, chapter by chapter, is which parts of the climb are measured, which are calculated, which are proposed, and how each proposal could be tested.

::: {.soma-machine}
Three question tours end the book. `#q=early-universe-sound`, *What did the early universe sound like?*, opens the cosmic web and steps through the acoustic peaks of @sec:cosmology-universe-rang. `#q=dark-energy-origin`, *Where does dark energy come from?*, opens the observable universe with the $7/11$ proposal and its label. `#q=dark-matter-spatial-vacuum`, *What is dark matter?*, opens the galactic halo with the $3/11$ proposal and what would falsify it. Tour stop 10: `#tour=textbook&stop=10`.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
baryon acoustic oscillation
: the frozen imprint of sound waves in the early plasma, a standard ruler of about $150\,\mathrm{Mpc}$

cosmic microwave background
: the afterglow of the hot early universe, a blackbody at $2.7255\,\mathrm{K}$

cosmological constant $\Lambda$
: an energy of empty space that drives accelerating expansion

critical density
: $\rho_c = 3H_0^2/8\pi G$, the density of a flat universe

density parameter $\Omega$
: a component's density as a fraction of the critical density

Hubble constant $H_0$
: the present expansion rate, about $67$ to $73\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$

Hubble tension
: the disagreement between methods of measuring $H_0$

redshift
: $z = \Delta\lambda/\lambda$, the stretching of light by expansion
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Hubble's law
: $v = H_0d$, $\quad z \approx v/c$, $\quad t_H = 1/H_0$

Friedmann equation
: $H^2 = \dfrac{8\pi G}{3}\rho + \dfrac{\Lambda c^2}{3} - \dfrac{kc^2}{a^2}$

Critical density and $\Lambda$
: $\rho_c = \dfrac{3H_0^2}{8\pi G}$, $\quad \Lambda = 3\Omega_\Lambda\dfrac{H_0^2}{c^2}$

CMB temperature
: $T = T_0(1 + z)$, $\quad T_0 = 2.7255\,\mathrm{K}$

Programme's counting rule
: $\Omega_\Lambda = 7/11$, $\ \Omega_\mathrm{DM} = 3/11$, $\ \Omega_b = 1/22$; $\quad \Lambda_\text{USF} = (21/11)H_0^2/c^2$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:cosmology-expanding-universe]** Galaxies recede at $v = H_0d$; expansion has no centre; the Hubble time is $14.5$ billion years.

**[-@sec:cosmology-budget-universe]** A flat universe has the critical density, $8.5\times10^{-27}\,\mathrm{kg\,m^{-3}}$; it is $68.5\,\%$ dark energy, $26.5\,\%$ dark matter and $4.9\,\%$ ordinary matter.

**[-@sec:cosmology-afterglow-hot-beginning]** The CMB is light released at $3000\,\mathrm{K}$, when hydrogen became neutral, redshifted to $2.7\,\mathrm{K}$.

**[-@sec:cosmology-universe-rang]** Sound waves in the early plasma left peaks in the CMB and a $150\,\mathrm{Mpc}$ ruler in the galaxy distribution.

**[-@sec:cosmology-programme-proposes-dark]** The programme proposes $\Omega_\Lambda = 7/11$, $\Omega_\mathrm{DM} = 3/11$ and $\Omega_b = 1/22$ from counting dimensions; these lie $7.1\,\%$, $3.1\,\%$ and $7.8\,\%$ from measurement.

**[-@sec:cosmology-testing-proposal]** The arithmetic is machine-checked, the identification is an open hypothesis, and the proposal makes predictions that could refute it.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why does Hubble's law not imply that we are at the centre of the universe?
2. What is different about the evidence for dark matter and for dark energy?
3. Why did hydrogen become neutral at $3000\,\mathrm{K}$ instead of $160\,000\,\mathrm{K}$?
4. In what sense did the early universe ring, and where can we see it?
5. Why does the programme's prediction for $\Lambda$ not depend on the value of $H_0$?
6. What would it take to show that the programme's fractions are a coincidence, and what would support them?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:cosmology-faster-expansion title="A faster expansion"}
If $H_0$ were $73\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$ instead of $67.4$, by what factor would the critical density change, and what would the Hubble time be?
:::

::: {.solution}
**Solution.** $\rho_c \propto H_0^2$: $(73/67.4)^2 = 1.17$. Hubble time: $14.5\times67.4/73 = 13.4$ billion years.

**Significance.** The higher value would make the universe denser and younger. Deciding between the two values, which come from the early universe and the nearby one respectively, is one of the main open problems of cosmology. *Baseline:* Penrose, chapter 27 (cosmology) [@penrose2004road].
:::

::: {.problems #pr:cosmology-darktoordinary-ratio title="The dark-to-ordinary ratio"}
What ratio of dark matter to ordinary matter does Planck measure, and what does the programme's counting give?
:::

::: {.solution}
**Solution.** Measured: $0.2645/0.0493 = 5.4$. Programme: $(3/11)/(1/22) = 6$.

**Significance.** The programme's ratio is $12\,\%$ high, larger than the error in either fraction alone, because one is high and the other low. Ratios like this are a sharper test than individual fractions, since they do not depend on the total. **Try it:** `#q=dark-matter-spatial-vacuum`.
:::

::: {.problems #pr:cosmology-zeropoint-problem title="The zero-point problem"}
A string-scale estimate of the zero-point energy gives $\Lambda \approx 6\times10^{64}\,\mathrm{m^{-2}}$. By how many powers of ten does that exceed the measured $1.09\times10^{-52}\,\mathrm{m^{-2}}$?
:::

::: {.solution}
**Solution.** $\log_{10}(6\times10^{64}/1.09\times10^{-52}) = 116.7$, so about $10^{117}$.

**Significance.** No other prediction in physics misses by so much. Any proposed origin of $\Lambda$, including the programme's, must explain why the zero-point contribution is absent or cancelled; the cosmological-constant paper does so by treating $\Lambda$ as a classical background amplitude rather than a sum over quantum fluctuations, which is itself an assumption. *Baseline:* Penrose, chapter 28 (cosmological parameters) [@penrose2004road].
:::

::: {.problems #pr:cosmology-scale-lambda title="The scale of Lambda"}
The length $1/\sqrt{\Lambda}$ sets the scale at which the cosmological constant matters. Compute it for $\Lambda = 1.09\times10^{-52}\,\mathrm{m^{-2}}$, in light-years ($9.46\times10^{15}\,\mathrm{m}$).
:::

::: {.solution}
**Solution.** $1/\sqrt{1.09\times10^{-52}} = 9.6\times10^{25}\,\mathrm{m} = 1.0\times10^{10}$ light-years.

**Significance.** The cosmological constant is negligible inside any galaxy or cluster and matters only on the scale of the whole observable universe, which is why it was detected only by the most distant supernovae. **Try it:** `#q=dark-energy-origin`.
:::

::: {.problems #pr:cosmology-good-match title="How good is the match?"}
Suppose future surveys measure $\Omega_\mathrm{DM} = 0.2645$ with an uncertainty of $\pm0.0010$. How many uncertainties away would $3/11$ lie? What would the programme then need to show?
:::

::: {.solution}
**Solution.** $(0.2727 - 0.2645)/0.0010 = 8.2$ uncertainties.

**Significance.** At that precision the leading-order fraction alone would be excluded, and the proposal would stand or fall on whether its promised corrections from the compact geometry, calculated in advance, close the gap. A prediction that can only be rescued by corrections chosen afterwards is not a test. *Baseline:* Penrose, chapter 34 (where lies the road to reality?) [@penrose2004road].
:::
