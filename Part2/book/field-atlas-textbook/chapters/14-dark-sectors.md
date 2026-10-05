# The Dark Sectors {#ch:dark-sectors}

About ninety-five per cent of the universe's energy is in two forms no one has seen directly: dark matter, which pulls, and dark energy, which pushes. @ch:cosmology set out the budget and the programme's proposed fractions, $7/11$ for dark energy and $3/11$ for dark matter. This chapter goes underneath both. It shows how invisible mass is weighed, how acceleration was discovered, and then how a scientist should judge a proposal that comes close to the measured numbers but not exactly: in standard deviations, against the odds of coincidence, and against everything else the proposal must also get right.

**Chapter outline.** [-@sec:dark-weighing] Weighing the invisible · [-@sec:dark-lensing] Bending light · [-@sec:dark-acceleration] An accelerating universe · [-@sec:dark-near-miss] Judging a near miss · [-@sec:dark-tests] What a real test of the fractions needs

::: {.maths-you-need}
Powers of ten and logarithms (@sec:m-scale-powers); exponentials (@sec:m-change-exponential); the normal curve and standard deviations (@sec:m-chance-normal).
:::

## Weighing the invisible {#sec:dark-weighing}

::: {.learning-objectives}
- find the mass inside an orbit from the orbital speed;
- explain why a flat rotation curve implies mass growing with radius;
- estimate the mass of the Milky Way inside the Sun's orbit.
:::

A star in a circular orbit is held by the gravity of the mass inside its orbit. Setting the gravitational pull equal to the force needed to keep it on the circle, $GMm/r^2 = mv^2/r$, gives

$$M(<r) = \frac{v^2 r}{G}.$$ {#eq:dark-orbit-mass}

Measure a star's speed and distance, and you have weighed everything inside its orbit, visible or not. If most of a galaxy's mass sat in its bright centre, stars far out would orbit more slowly, $v \propto 1/\sqrt{r}$, like the outer planets of the solar system. In the 1970s Vera Rubin and Kent Ford measured spiral galaxies and found instead that the speed stays nearly constant far beyond the visible disc. A flat curve, $v$ constant, means $M(<r) \propto r$: mass keeps growing with radius where there is almost no light.

$$v^2(r) = \frac{GM_{\mathrm{disc}}}{r} + v_\infty^2\left(1 - \frac{r_c}{r}\arctan\frac{r}{r_c}\right)$$ {#eq:dark-rotation-model}

{{Visualize | eq:dark-rotation-model | function-plot:cosmic | f1="sqrt(259200/r)"; name1="visible disc alone"; f2="170*sqrt(1 - (5/r)*arctan(r/5))"; name2="dark halo alone"; f3="sqrt(259200/r + 170^2*(1 - (5/r)*arctan(r/5)))"; name3="disc + halo"; var=r; x=[2,40]; y=[0,400]; legend=below; xlabel="distance from the centre (kpc)"; ylabel="orbital speed (km/s)"; label=fig:dark-rotation; height=32% }} A model rotation curve for a galaxy like the Milky Way. The visible disc alone would give speeds falling as $1/\sqrt{r}$; adding a dark halo whose mass grows with radius keeps the curve nearly flat, as observed.

::: {.example #ex:dark-milky-way-mass title="Weighing the Milky Way"}
The Sun orbits the centre of the Milky Way at $230\,\mathrm{km\,s^{-1}}$, $8.2\,\mathrm{kpc}$ out. How much mass lies inside its orbit? Use $G = 4.30 \times 10^{-6}\,\mathrm{kpc\,(km\,s^{-1})^2}\,M_\odot^{-1}$, which measures masses in Suns.

**Strategy.** Use @eq:dark-orbit-mass in these units.

**Solution.** $M = 230^2 \times 8.2/4.30 \times 10^{-6} = 1.0 \times 10^{11}\,M_\odot$. If the curve stays flat to $50\,\mathrm{kpc}$, the mass inside that radius is $6.2 \times 10^{11}\,M_\odot$.

**Significance.** All the stars and gas of the Milky Way add up to roughly $6 \times 10^{10}\,M_\odot$. The flat curve requires several times more mass than we can see, and most of it lies far outside the bright disc. This, measured in thousands of galaxies, is the first anchor for dark matter, an `empirical-result`.
:::

::: {.check-your-learning}
A galaxy's rotation curve is flat at $200\,\mathrm{km\,s^{-1}}$ out to $30\,\mathrm{kpc}$. What mass lies inside $30\,\mathrm{kpc}$? (Answer: $200^2 \times 30/4.30 \times 10^{-6} = 2.8 \times 10^{11}\,M_\odot$.)
:::

## Bending light {#sec:dark-lensing}

::: {.learning-objectives}
- compute the deflection of light by a mass;
- explain how lensing maps mass without needing light from the mass itself;
- describe why merging clusters are strong evidence for dark matter.
:::

General relativity predicts that light passing a mass $M$ at distance $b$ is bent by an angle

$$\alpha = \frac{4GM}{c^2 b}.$$ {#eq:dark-deflection}

Light grazing the Sun is bent by $1.75$ seconds of arc, as Eddington's eclipse expedition found in 1919. A cluster of galaxies bends the light of galaxies behind it into arcs and multiple images: a **gravitational lens**. Because lensing responds to all mass, luminous or not, a lens map shows where the mass is directly.

The most quoted example is the **Bullet Cluster**, two clusters that collided about a hundred and fifty million years ago. Their hot gas, which holds most of the ordinary matter, collided and was slowed, glowing in X-rays between them. The lensing map shows most of the mass well ahead of the gas, moving with the galaxies, which passed through each other almost untouched. Whatever carries most of the mass does not collide like gas: a strong constraint on any explanation that ties gravity to visible matter alone.

::: {.example #ex:dark-cluster-lens title="A cluster as a lens"}
A galaxy cluster of $10^{15}\,M_\odot$ bends the light of a background galaxy passing $500\,\mathrm{kpc}$ from its centre. Estimate the deflection, treating the cluster's mass as concentrated inside that distance. Use $GM_\odot = 1.327 \times 10^{20}\,\mathrm{m^3\,s^{-2}}$ and $1\,\mathrm{kpc} = 3.086 \times 10^{19}\,\mathrm{m}$.

**Strategy.** Apply @eq:dark-deflection in SI units.

**Solution.** $\alpha = 4 \times 1.327 \times 10^{35}/(8.99 \times 10^{16} \times 1.54 \times 10^{22}) = 3.8 \times 10^{-4}\,\mathrm{rad} = 79''$.

**Significance.** Arcs tens of seconds of arc from cluster centres are seen in many deep images. The deflection measured from their shapes gives the mass, and it is consistently several times the mass of the stars and gas.
:::

::: {.check-your-learning}
How does the deflection change if the light passes twice as far from the same mass? (Answer: it halves, since $\alpha \propto 1/b$.)
:::

## An accelerating universe {#sec:dark-acceleration}

::: {.learning-objectives}
- describe the evidence that the expansion of the universe is accelerating;
- compare the age of a matter-only universe with one including dark energy;
- compute the deceleration parameter from the budget.
:::

In 1998 two teams measuring distant exploding stars of known brightness (type Ia supernovae) found them fainter, and so farther away, than they would be if the expansion were slowing under gravity. The expansion is speeding up. A cosmological constant $\Lambda$, a constant energy density of empty space, does this. Today the case rests not only on supernovae but on the cosmic microwave background, the standard ruler of baryon acoustic oscillations (@sec:cosmology-universe-rang) and the growth of structure, all fitted together.

For a flat universe of matter and a cosmological constant, the size of the universe (the scale factor $a$, equal to one today) grows as

$$a(t) = \left(\frac{\Omega_m}{\Omega_\Lambda}\right)^{1/3} \sinh^{2/3}\left(\tfrac{3}{2}\sqrt{\Omega_\Lambda}\,H_0 t\right),$$ {#eq:dark-scale-factor}

while a universe of matter alone would grow as $a = (\tfrac{3}{2}H_0 t)^{2/3}$, always slowing.

{{Visualize | eq:dark-scale-factor | function-plot:cosmic | f1="(Om/OL)^(1/3)*sinh(1.5*sqrt(OL)*x)^(2/3)"; name1="matter and dark energy"; f2="(1.5*x)^(2/3)"; name2="matter only"; Om=0.315; OL=0.685; x=[0,2]; y=[0,2.5]; hline=1; vline="0.951, 0.667"; legend=below; xlabel="time since the big bang, $H_0 t$"; ylabel="size of the universe $a(t)$"; label=fig:dark-scale-factor; height=30% }} The growth of the universe with and without dark energy, for the same expansion rate today. With dark energy the curve bends upwards (acceleration) and today ($a = 1$) is reached later: the universe is older.

::: {.example #ex:dark-age title="How old is the universe?"}
With $H_0 = 67.4\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$, $1/H_0 = 14.5$ billion years. Find the age of a matter-only universe and of one with $\Omega_m = 0.315$, $\Omega_\Lambda = 0.685$.

**Strategy.** For matter only, $a = 1$ when $H_0 t = 2/3$. For the mixture, solve @eq:dark-scale-factor for $a = 1$: $H_0 t_0 = \frac{2}{3\sqrt{\Omega_\Lambda}}\,\mathrm{arsinh}\sqrt{\Omega_\Lambda/\Omega_m}$.

**Solution.** Matter only: $\tfrac{2}{3} \times 14.5 = 9.7$ billion years. With dark energy: $H_0 t_0 = 0.951$, or $13.8$ billion years.

**Significance.** The oldest stars in the Milky Way are about $13$ billion years old: older than a matter-only universe could be. Dark energy resolves the conflict, one of several independent lines of evidence for it.
:::

How fast is the expansion accelerating? The **deceleration parameter** $q_0 = \Omega_m/2 - \Omega_\Lambda$ is positive for slowing and negative for speeding up. With the measured budget, $q_0 = 0.158 - 0.685 = -0.53$.

::: {.check-your-learning}
Compute $q_0$ for a universe with the programme's fractions, $\Omega_\Lambda = 7/11$ and all the rest, $4/11$, in matter. (Answer: $2/11 - 7/11 = -5/11 = -0.45$: also accelerating, a little less.)
:::

## Judging a near miss {#sec:dark-near-miss}

::: {.learning-objectives}
- express the gap between a prediction and a measurement in standard deviations;
- estimate the chance that a simple fraction lands close to a number by coincidence;
- explain why one matching number is weak evidence for a mechanism.
:::

The programme's fractions are close to the measured ones [@P21; @P22]: $7/11 = 0.636$ against $\Omega_\Lambda = 0.6847$, and $3/11 = 0.273$ against $\Omega_c = 0.2645$. How close is close? The first measure is the gap in units of the measurement's uncertainty. Planck 2018 quotes $\Omega_\Lambda = 0.6847 \pm 0.0073$:

$$\frac{0.6847 - 7/11}{0.0073} = 6.6.$$ {#eq:dark-sigma}

{{Visualize | eq:dark-sigma | distribution:cosmic | pdf="exp(-(x-mu)^2/(2*s^2))"; mu=0.6847; s=0.0073; x=[0.62,0.71]; vline="0.63636"; xlabel="dark-energy fraction $\Omega_\Lambda$"; ylabel="probability density (Planck 2018)"; label=fig:dark-lambda-sigma; height=28% }} The Planck 2018 measurement of $\Omega_\Lambda$ as a normal curve, and the programme's $7/11$ (dotted line). The prediction sits $6.6$ standard deviations below the measured value, where the curve is indistinguishable from zero.

A gap of $6.6$ standard deviations is far outside chance (@sec:m-chance-normal): as a precision prediction, $7/11$ is ruled out. For dark matter the gap is $0.0082$; taking the uncertainty of $\Omega_c$ to be about that of $\Omega_m$, $0.0073$, it is about one standard deviation, consistent with chance either way.

{{Visualize | eq:dark-sigma | distribution:cosmic | pdf="exp(-(x-mu)^2/(2*s^2))"; mu=0.2645; s=0.0073; x=[0.235,0.295]; shade=[0.27273,0.295]; vline="0.27273"; expect_prob=0.130; xlabel="dark-matter fraction $\Omega_c$"; ylabel="probability density"; label=fig:dark-dm-sigma; height=28% }} The dark-matter case. The programme's $3/11$ (dotted line) lies about one standard deviation above the measured value; the shaded tail, the chance of a measurement at least this far above if the true value were $0.2645$, is $13\,\%$. Not a confirmation, and not a refutation.

The second measure is subtler. How surprising is it that *some* simple fraction lies near a measured number? There are only forty-seven fractions between zero and one with denominators up to twelve, but they are dense enough to be near almost anything.

::: {.example #ex:dark-coincidence title="The odds of a near fraction"}
Pick a number at random between $0.20$ and $0.30$. How often does it lie within $3.1\,\%$ of some fraction $p/q$ with $q \le 12$? How often within $3.1\,\%$ of an eleventh, $p/11$?

**Strategy.** Check every number on a fine grid against every fraction; the verification script of this book does exactly this.

**Solution.** Within $3.1\,\%$ of some fraction with $q \le 12$: $71\,\%$ of the time. Within $3.1\,\%$ of an eleventh: $17\,\%$. And any number between $0.60$ and $0.75$ lies within $7.1\,\%$ of a fraction with $q \le 12$: every time.

**Significance.** Closeness alone is weak evidence. If the denominator eleven is fixed *in advance* by an argument, a $3\,\%$ match has about a one-in-six chance of happening by accident; if the denominator could have been anything up to twelve, the match is expected. This is the **look-elsewhere effect**: the more ways there were to succeed, the less a success means.
:::

The fair summary is the one the programme's own status ledger gives: $\Omega_\Lambda = 7/11$ and $\Omega_{\mathrm{DM}} = 3/11$ are derived numbers under the sector-count model, `derived-under-assumptions`; their proximity to Planck 2018 is a comparison, not a discovery. The dark-energy fraction misses by $6.6\sigma$; the dark-matter fraction is consistent but not yet distinctive. The proposal grows stronger only by passing tests it could have failed.

::: {.check-your-learning}
Planck's $\Omega_m = 0.3153 \pm 0.0073$. How many standard deviations is the programme's $4/11$ (everything except dark energy) from it? (Answer: $(0.3636 - 0.3153)/0.0073 = 6.6$, the same gap seen from the other side.)
:::

## What a real test of the fractions needs {#sec:dark-tests}

::: {.learning-objectives}
- list the independent observations any dark-sector proposal must match;
- explain why a correction term must be predicted before it is fitted;
- assign labels to the programme's dark-sector claims.
:::

A dark-sector model is not one number. It must reproduce the expansion history $H(z)$ measured by supernovae and acoustic oscillations, the growth of structure and the lensing it produces, the heights and positions of the microwave background peaks, and the nucleosynthesis of light elements. Matching the present-day fractions is the entry ticket, not the result.

![A decision tree for any dark-sector proposal: arithmetic, background expansion, perturbations and non-gravitational detection are independent checks, each able to fail it.](../field-atlas/figures/theory/T5_5_falsification_flow.png){width=72%}

Three further points apply to the programme's fractions specifically.

**Closure.** $7/11 + 3/11 + 1/11 = 1$. If the remaining $1/11 = 0.091$ is meant as ordinary matter, it conflicts with the measured baryon fraction, $0.049$, at many standard deviations. If it is a residual sector (baryons, radiation, neutrinos and whatever else), the model must say how it divides and still pass nucleosynthesis and the microwave background.

**Corrections.** A correction could move $7/11$ towards $0.6847$. To count as evidence it must come from a stated mechanism, be published before it is compared with the data, and improve more than one observation at once. A correction fitted separately for each number is just a parameter replacing the one it set out to explain.

**Gravity only.** The programme reads its dark matter as a gravitational effect of a spatial vacuum sector, with no particle that interacts otherwise, and keeps local general relativity unchanged (the "local GR gate"). A confirmed detection of a dark-matter particle in the laboratory would refute that reading.

| Claim | Label | Fails if |
|:--|:--|:--|
| Dark matter and dark energy exist as measured | `empirical-result` | (the evidence above is independent and repeated) |
| $\Omega_\Lambda = 7/11$, $\Omega_{\mathrm{DM}} = 3/11$ under the sector count | `derived-under-assumptions` | the arithmetic or the assumptions are wrong; Lean checks the arithmetic |
| These fractions describe our universe | `open-hypothesis` | $H(z)$, growth, lensing or CMB peaks disagree; $6.6\sigma$ already against $7/11$ alone |
| Dark matter is gravitational only | `open-hypothesis` | a dark-matter particle is detected directly |

::: {.going-further}
The constant of @ch:cosmology follows from the dark-energy fraction by $\Lambda = 3\Omega_\Lambda H_0^2/c^2$. The factor three comes from the Friedmann equation; the programme's formula $\Lambda_{\mathrm{USF}} = \tfrac{21}{11}H_0^2/c^2$ is this relation with $\Omega_\Lambda = 7/11$. Because the dimensionless fraction carries all the content, error accounting should be done on $\Omega_\Lambda$, not on $\Lambda$: a change of $H_0$ changes $\Lambda$ but not the comparison. The Lean file `CosmologicalConstant.lean` proves the arithmetic inside the model's axioms. That makes the model internally consistent (`kernel-verified` where named), which is strong evidence about the model and no evidence about nature until observations bind it.
:::

::: {.soma-machine}
The outermost levels of the Soma Machine show the cosmic web and the observable universe. **Try it:** `#level=galactic-halo&lens=on`, then `#level=observable-universe`, and read how each level's header labels its dark-sector content.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
deceleration parameter
: $q_0 = \Omega_m/2 - \Omega_\Lambda$; negative when the expansion accelerates

gravitational lens
: a mass that bends light from objects behind it

look-elsewhere effect
: the more ways a match could have occurred, the less a match means

rotation curve
: orbital speed against distance from a galaxy's centre

scale factor
: $a(t)$, the size of the universe relative to today

standard deviation (of a measurement)
: its quoted uncertainty; gaps are judged in units of it
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Mass inside an orbit
: $M(<r) = v^2 r/G$

Light deflection
: $\alpha = 4GM/c^2 b$

Scale factor
: $a = (\Omega_m/\Omega_\Lambda)^{1/3}\sinh^{2/3}(\tfrac{3}{2}\sqrt{\Omega_\Lambda}H_0 t)$

Deceleration
: $q_0 = \Omega_m/2 - \Omega_\Lambda$

Gap in standard deviations
: $(\text{measured} - \text{predicted})/\sigma$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:dark-weighing]** Orbital speeds weigh the mass inside an orbit. Flat rotation curves require mass growing with radius where little light is seen.

**[-@sec:dark-lensing]** Lensing maps all mass directly; merging clusters show most mass separated from the colliding gas.

**[-@sec:dark-acceleration]** Supernovae and the cosmic budget show accelerating expansion; dark energy also makes the universe old enough for its oldest stars.

**[-@sec:dark-near-miss]** $7/11$ misses $\Omega_\Lambda$ by $6.6\sigma$; $3/11$ is within about $1\sigma$ of $\Omega_c$. Simple fractions are near most numbers, so a single match is weak evidence.

**[-@sec:dark-tests]** A dark-sector model must match expansion, growth, lensing, the CMB and nucleosynthesis; corrections must be predicted, not fitted. The fractions are `derived-under-assumptions`; their application to our universe is an `open-hypothesis`.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. What would the rotation curve of a galaxy with no dark matter look like, and why?
2. Why is lensing evidence for dark matter independent of rotation curves?
3. How does dark energy help with the ages of the oldest stars?
4. Explain why a $6.6\sigma$ gap rules out a precision prediction, while a $1\sigma$ gap does not confirm one.
5. What is the look-elsewhere effect, and how does fixing a denominator in advance change it?
6. Name three observations, besides the present-day fractions, that a dark-sector model must match.
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:dark-andromeda title="Weighing Andromeda"}
The Andromeda galaxy's rotation curve is roughly flat at $250\,\mathrm{km\,s^{-1}}$ out to $35\,\mathrm{kpc}$. What mass lies inside that radius?
:::

::: {.solution}
**Strategy.** @eq:dark-orbit-mass with $G = 4.30 \times 10^{-6}$ in galactic units.

**Solution.** $250^2 \times 35/4.30 \times 10^{-6} = 5.1 \times 10^{11}\,M_\odot$.

**Significance.** Comparable to the Milky Way, and again several times its visible mass.
:::

::: {.problems #pr:dark-sun-deflection title="The 1919 eclipse"}
Using @eq:dark-deflection, find the deflection of starlight grazing the Sun ($GM_\odot = 1.327 \times 10^{20}\,\mathrm{m^3\,s^{-2}}$, radius $6.96 \times 10^{8}\,\mathrm{m}$) in seconds of arc.
:::

::: {.solution}
**Strategy.** Put $b$ equal to the solar radius and convert radians to seconds of arc ($1\,\mathrm{rad} = 206\,265''$).

**Solution.** $\alpha = 4 \times 1.327 \times 10^{20}/(8.99 \times 10^{16} \times 6.96 \times 10^{8}) = 8.49 \times 10^{-6}\,\mathrm{rad} = 1.75''$.

**Significance.** Newtonian reasoning gives half this. The measured $1.75''$ was the first test passed by general relativity, the theory whose local predictions the programme's local GR gate must preserve.
:::

::: {.problems #pr:dark-older-faster title="A faster expansion"}
If $H_0$ were $73\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$ with the same fractions, how old would the universe be? ($1/H_0$ scales inversely with $H_0$.)
:::

::: {.solution}
**Strategy.** Scale $1/H_0 = 14.5$ billion years by $67.4/73$, then multiply by $0.951$.

**Solution.** $1/H_0 = 13.4$ billion years, so the age is $0.951 \times 13.4 = 12.7$ billion years.

**Significance.** Uncomfortably close to the oldest stars. The disagreement between local measurements of $H_0$ near $73$ and the microwave-background value near $67$ (the "Hubble tension") is an open problem that any dark-sector model must also face.
:::

::: {.problems #pr:dark-dm-sigma title="How far is 3/11?"}
Taking $\Omega_c = 0.2645 \pm 0.0073$, how many standard deviations is $3/11$ from it? What would the uncertainty need to be for the same gap to reach $3\sigma$?
:::

::: {.solution}
**Strategy.** Gap $= 3/11 - 0.2645 = 0.0082$; divide by $\sigma$.

**Solution.** $0.0082/0.0073 = 1.1\sigma$. For $3\sigma$ the uncertainty would have to shrink to $0.0082/3 = 0.0027$.

**Significance.** Future surveys aim at such precision. If $\Omega_c$ stays at $0.2645$ while its uncertainty shrinks, $3/11$ will be ruled out; if it moves towards $0.2727$, the proposal survives a test it could have failed. That is what a prediction is for.
:::

::: {.problems #pr:dark-residual title="The residual eleventh"}
The baryon fraction is $\Omega_b = 0.0493$, uncertain by about $0.0008$. How many standard deviations is $1/11$ from it, if read as a prediction of ordinary matter?
:::

::: {.solution}
**Strategy.** Gap over uncertainty.

**Solution.** $(0.0909 - 0.0493)/0.0008 = 52$ standard deviations.

**Significance.** Read as baryons, $1/11$ is decisively wrong; it can only be a residual sector whose contents the model must still specify. A clean partition of one into elevenths is arithmetic; turning it into a cosmology is the hard part.
:::
