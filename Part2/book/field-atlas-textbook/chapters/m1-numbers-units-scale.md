# Numbers, Units and Scale {#ch:m-scale}

Physics is written in numbers that carry units, and the numbers in this course run from the size of a proton to the size of the observable universe. No ruler covers that range and no ordinary graph can show it. This chapter collects the tools that make such numbers manageable: powers of ten, units and dimensions, logarithms, estimation, and the scaling laws that tell how one quantity changes when another is multiplied. All of it is standard mathematics, and every later chapter uses it.

**Chapter outline.** [-@sec:m-scale-powers] Powers of ten · [-@sec:m-scale-units] Units and dimensions · [-@sec:m-scale-logs] Logarithms · [-@sec:m-scale-estimating] Estimating · [-@sec:m-scale-laws] Scaling laws

## Powers of ten {#sec:m-scale-powers}

::: {.learning-objectives}
- write very large and very small numbers in scientific notation;
- multiply and divide numbers by adding and subtracting their exponents;
- place a physical size on a powers-of-ten scale.
:::

A hydrogen atom is about $0.000\,000\,000\,106\,\mathrm{m}$ across, and the Earth is about $12\,700\,000\,\mathrm{m}$ across. Written this way, both numbers are mostly zeros, and comparing them means counting zeros. **Scientific notation** writes a number as a value between 1 and 10 times a power of ten:

$$0.000\,000\,000\,106\,\mathrm{m} = 1.06 \times 10^{-10}\,\mathrm{m}, \qquad 12\,700\,000\,\mathrm{m} = 1.27 \times 10^{7}\,\mathrm{m}.$$ {#eq:m-scale-sci}

The exponent counts how many places the decimal point moved: seven places to the left for the Earth, ten places to the right for the atom. A positive exponent means a large number and a negative exponent a small one; $10^0 = 1$.

Powers of ten combine by adding exponents, because $10^a$ means $a$ tens multiplied together:

$$10^a \times 10^b = 10^{a+b}, \qquad \frac{10^a}{10^b} = 10^{a-b}, \qquad \left(10^a\right)^n = 10^{an}.$$ {#eq:m-scale-powers}

To multiply two numbers in scientific notation, multiply the front parts and add the exponents. To divide, divide the front parts and subtract the exponents.

{{Visualize | eq:m-scale-sci | log-scale:cosmic | items="proton=1.7e-15, hydrogen atom=1.06e-10, virus=1e-7, red blood cell=8e-6, person=1.7, Earth=1.27e7, Sun=1.39e9, Milky Way=9.5e20, observable universe=8.8e26"; unit="metres"; label=fig:m-scale-sizes; width=100% }} Sizes from the proton to the observable universe on a powers-of-ten line. Each tick is a factor of ten; equal steps along the line are equal *ratios*, not equal differences.

The line in @fig:m-scale-sizes is a **logarithmic scale**: moving one tick to the right multiplies the size by ten. On an ordinary ruler with the person at one centimetre, the Earth would sit about seventy kilometres away and the atom would be far too small to see. On the logarithmic line they are a short walk apart.

::: {.example #ex:m-scale-atoms-across-cell title="Atoms across a red blood cell"}
A red blood cell is about $8 \times 10^{-6}\,\mathrm{m}$ across, and a hydrogen atom $1.06 \times 10^{-10}\,\mathrm{m}$. How many atoms would fit side by side across the cell?

**Strategy.** Divide the two sizes: front parts divided, exponents subtracted.

**Solution.** $\dfrac{8 \times 10^{-6}}{1.06 \times 10^{-10}} = \dfrac{8}{1.06} \times 10^{-6-(-10)} = 7.5 \times 10^{4}$, about seventy-five thousand atoms.

**Significance.** A cell is large compared with an atom, but not enormously so: four to five factors of ten. This is why a cell can be modelled as a smooth medium for some questions and must be treated as molecules for others (@sec:fields-zooming-out-when).
:::

::: {.check-your-learning}
A light-year is the distance light travels in one year: $c = 2.998 \times 10^{8}\,\mathrm{m\,s^{-1}}$ times one year, $3.156 \times 10^{7}\,\mathrm{s}$. How many metres is it? (Answer: $9.46 \times 10^{15}\,\mathrm{m}$.)
:::

## Units and dimensions {#sec:m-scale-units}

::: {.learning-objectives}
- name the SI base units and build derived units from them;
- convert a quantity between units with a conversion factor;
- use dimensional analysis to check an equation and to guess the form of a law.
:::

A number without a unit says nothing about the world. "The string is $0.648$ long" is useless until we know it means metres. The **International System of Units (SI)** builds every unit from seven base units; this course needs five of them: the metre (m) for length, the kilogram (kg) for mass, the second (s) for time, the ampere (A) for electric current and the kelvin (K) for temperature. Every other unit is a product of these. A force of one **newton** gives one kilogram an acceleration of one metre per second per second, so $1\,\mathrm{N} = 1\,\mathrm{kg\,m\,s^{-2}}$. A **joule** of energy is one newton acting over one metre, $1\,\mathrm{J} = 1\,\mathrm{kg\,m^2\,s^{-2}}$, and a **watt** is one joule per second.

Converting units means multiplying by a fraction equal to one. Since $1\,\mathrm{km} = 1000\,\mathrm{m}$ and $1\,\mathrm{h} = 3600\,\mathrm{s}$, a car at $100\,\mathrm{km\,h^{-1}}$ travels at

$$100\,\frac{\mathrm{km}}{\mathrm{h}} \times \frac{1000\,\mathrm{m}}{1\,\mathrm{km}} \times \frac{1\,\mathrm{h}}{3600\,\mathrm{s}} = 27.8\,\mathrm{m\,s^{-1}}.$$

The units cancel like algebra, which is the easiest way to see that the factors are the right way up.

Every quantity has a **dimension**: what kind of thing it measures, whatever the unit. Speed has dimensions of length divided by time, written $[v] = \mathrm{L\,T^{-1}}$; energy has $[E] = \mathrm{M\,L^2\,T^{-2}}$. An equation can be right only if both sides have the same dimensions. This check, **dimensional analysis**, catches most algebra slips in one line. It does more: it can predict how a quantity depends on the others before any equation is solved.

::: {.example #ex:m-scale-pendulum-dimensions title="A pendulum from dimensions alone"}
A pendulum's period $T$ might depend on its length $L$, the mass $m$ of its bob, and the gravitational acceleration $g = 9.81\,\mathrm{m\,s^{-2}}$. Find the only combination with the dimensions of time, and evaluate it for $L = 1.00\,\mathrm{m}$.

**Strategy.** Write $T \propto L^a m^b g^c$ and match the powers of M, L and T on both sides.

**Solution.** The dimensions are $[L] = \mathrm{L}$, $[m] = \mathrm{M}$ and $[g] = \mathrm{L\,T^{-2}}$. Matching mass gives $b = 0$; matching time gives $-2c = 1$, so $c = -\tfrac{1}{2}$; matching length gives $a + c = 0$, so $a = \tfrac{1}{2}$. Therefore $T \propto \sqrt{L/g}$, and for $L = 1.00\,\mathrm{m}$, $\sqrt{L/g} = 0.319\,\mathrm{s}$.

**Significance.** Dimensional analysis found that the period does not depend on the mass and grows as the square root of the length. It cannot find the number in front: solving the equation of motion (@ch:m-oscillation) gives $T = 2\pi\sqrt{L/g} = 2.01\,\mathrm{s}$. A grandfather clock's one-metre pendulum ticks once a second each way for this reason.
:::

::: {.check-your-learning}
Show that $E = mc^2$ is dimensionally consistent. (Answer: $[mc^2] = \mathrm{M}\,(\mathrm{L\,T^{-1}})^2 = \mathrm{M\,L^2\,T^{-2}}$, the dimensions of energy.)
:::

::: {.going-further}
The pendulum argument generalises as the **Buckingham $\Pi$ theorem**: if a law involves $n$ quantities built from $k$ independent dimensions, it can be written as a relation among $n - k$ dimensionless combinations. The pendulum has four quantities ($T$, $L$, $m$, $g$) and three dimensions, so one combination, $\Pi = T\sqrt{g/L}$, which must be a constant. Deep-water waves give a second example: a wave of wavelength $\lambda$ under gravity $g$ can only travel at a speed $v \propto \sqrt{g\lambda}$; the full theory gives $v = \sqrt{g\lambda/2\pi}$, which is $12.5\,\mathrm{m\,s^{-1}}$ for a $100\,\mathrm{m}$ ocean swell.
:::

## Logarithms {#sec:m-scale-logs}

::: {.learning-objectives}
- find the base-ten logarithm of a number and explain what it counts;
- use the rules for logarithms of products, quotients and powers;
- work with logarithmic quantities such as decibels and earthquake magnitudes.
:::

The **logarithm** undoes a power. The base-ten logarithm of $x$ is the power to which ten must be raised to give $x$:

$$y = \log_{10} x \quad\Longleftrightarrow\quad x = 10^{y}.$$ {#eq:m-scale-log}

So $\log_{10} 1000 = 3$, $\log_{10} 0.01 = -2$ and $\log_{10} 1 = 0$. For numbers between the powers, the logarithm lies between the whole numbers: $\log_{10} 2 = 0.301$, because $10^{0.301} = 2$. The logarithm of a size is its position on the line of @fig:m-scale-sizes.

{{Visualize | eq:m-scale-log | function-plot:generic | f="log10(x)"; x=[0.05,100]; logx=true; hline="0,1,2"; xlabel="$x$ (logarithmic axis)"; ylabel="$\log_{10} x$"; label=fig:m-scale-log10; height=28% }} The base-ten logarithm against $x$ on a logarithmic axis: a straight line, rising by one for every factor of ten. It is negative for $x < 1$ and undefined at zero.

Because logarithms count powers, the power rules of @eq:m-scale-powers become rules for adding:

$$\log(ab) = \log a + \log b, \qquad \log\frac{a}{b} = \log a - \log b, \qquad \log a^n = n \log a.$$ {#eq:m-scale-log-rules}

Mathematicians and physicists often use the **natural logarithm** $\ln x$, the logarithm to base $e = 2.718\ldots$, which appears whenever something grows or decays at a rate proportional to itself (@ch:m-change). The two differ only by a constant factor: $\ln x = 2.303\,\log_{10} x$.

Several everyday scales are logarithmic, because the human senses and many natural processes respond to ratios. The **sound level** in decibels compares an intensity $I$ with the threshold of hearing $I_0 = 10^{-12}\,\mathrm{W\,m^{-2}}$:

$$L = 10\,\log_{10}\frac{I}{I_0}\ \mathrm{dB}.$$

A conversation at $10^{-6}\,\mathrm{W\,m^{-2}}$ is $60\,\mathrm{dB}$; doubling the intensity adds only $10\log_{10}2 = 3.01\,\mathrm{dB}$.

::: {.example #ex:m-scale-earthquake-energy title="How much bigger is a bigger earthquake?"}
An earthquake's energy grows by a factor $10^{1.5}$ for each unit of moment magnitude. The 2004 Sumatra–Andaman earthquake had magnitude $9.1$. How many times more energy did it release than a magnitude $6.1$ earthquake that damages a town?

**Strategy.** Three magnitude units means three factors of $10^{1.5}$; multiply them by adding exponents.

**Solution.** $\left(10^{1.5}\right)^{3} = 10^{4.5} = 3.2 \times 10^{4}$.

**Significance.** The numbers $9.1$ and $6.1$ look close; the energies differ by a factor of about thirty thousand. Logarithmic scales compress huge ranges into small numbers, which is their use and their trap. The Sumatra earthquake rang the whole Earth like a bell (@ch:earth).
:::

::: {.check-your-learning}
How many factors of ten separate a hydrogen atom ($1.06 \times 10^{-10}\,\mathrm{m}$) from the observable universe ($8.8 \times 10^{26}\,\mathrm{m}$)? (Answer: $\log_{10}(8.3 \times 10^{36}) = 36.9$, about thirty-seven.)
:::

## Estimating {#sec:m-scale-estimating}

::: {.learning-objectives}
- make an order-of-magnitude estimate by breaking a quantity into factors;
- state a result to a sensible number of significant figures;
- combine relative uncertainties in a product.
:::

Many questions need only an answer good to a factor of two or three: is an effect important, is a field description possible, is a claim even plausible? An **order-of-magnitude estimate** answers them by breaking the quantity into factors that can each be guessed, then multiplying. The method is often named after the physicist Enrico Fermi, who used it constantly. The individual guesses are rough, but their errors tend to cancel, and the answer is usually within a factor of a few of the truth.

::: {.example #ex:m-scale-atoms-in-person title="How many atoms are in a person?"}
Estimate the number of atoms in a $70\,\mathrm{kg}$ person.

**Strategy.** The body is mostly water, $\mathrm{H_2O}$: three atoms sharing a mass of $18$ atomic mass units, about $6\,\mathrm{u}$ per atom. One atomic mass unit is $1.66 \times 10^{-27}\,\mathrm{kg}$.

**Solution.** The mean mass per atom is $6 \times 1.66 \times 10^{-27} = 1.0 \times 10^{-26}\,\mathrm{kg}$, so the number of atoms is $70/(1.0 \times 10^{-26}) = 7 \times 10^{27}$.

**Significance.** Careful accounting by element gives the same figure, about $7 \times 10^{27}$. The estimate needed only one physical idea (the body is mostly water) and one constant.
:::

A measured or estimated number should not claim more precision than it has. **Significant figures** are the digits that carry information: $0.648\,\mathrm{m}$ has three, and so does $6.48 \times 10^{-1}\,\mathrm{m}$. A result calculated from several numbers should keep about as many significant figures as the least precise of them. When quantities are multiplied or divided, their **relative uncertainties** (the uncertainty divided by the value) add, to a first approximation. A length known to $2\,\%$ and a time known to $1\,\%$ give a speed known to about $3\,\%$.

::: {.check-your-learning}
Estimate how many times a human heart beats in an $80$-year life at $70$ beats per minute. (Answer: $70 \times 60 \times 24 \times 365.25 \times 80 = 2.9 \times 10^{9}$, about three billion.)
:::

## Scaling laws {#sec:m-scale-laws}

::: {.learning-objectives}
- recognise a power law and read its exponent from a log–log plot;
- use the square–cube law to explain why size changes what a system can do;
- apply an empirical scaling law to a new case.
:::

Many relations in nature are **power laws**:

$$y = A\,x^{k},$$ {#eq:m-scale-power-law}

where $A$ and $k$ are constants. Taking logarithms with @eq:m-scale-log-rules gives $\log y = \log A + k \log x$: on a plot with both axes logarithmic (a **log–log plot**), a power law is a straight line whose slope is the exponent $k$. This is the main reason scientists plot data on logarithmic axes. A straight line reveals the law, and its slope gives the exponent.

The simplest scaling law is geometric. If every length of an object is multiplied by $s$, its surface area grows as $s^2$ and its volume as $s^3$: the **square–cube law**. Double a cube's side and its area becomes four times larger, its volume eight times. The ratio of surface to volume therefore falls as $1/s$. For a sphere of radius $r$ it is $4\pi r^2 / \tfrac{4}{3}\pi r^3 = 3/r$. Anything that enters through the surface (food, heat, oxygen, signals) has to serve everything in the volume. This is why cells are small, why large animals have lungs and blood vessels, and why a mouse loses heat much faster for its size than an elephant.

Living things show a famous empirical example. The resting metabolic rate $P$ of mammals, from mice to elephants, follows **Kleiber's law**,

$$P \approx 3.4\,\mathrm{W} \times \left(\frac{M}{1\,\mathrm{kg}}\right)^{3/4},$$ {#eq:m-scale-kleiber}

with $M$ the body mass. The exponent $3/4$ is neither the $2/3$ of pure surface scaling nor the $1$ of pure volume scaling; why it takes this value is still debated, so in this course's language it is an `empirical-result` without an agreed derivation.

{{Visualize | eq:m-scale-kleiber | function-plot:neural | f="3.4*x^0.75"; name="Kleiber, slope 3/4"; f2="3.4*x"; name2="proportional to mass, slope 1"; x=[0.01,10000]; logx=true; logy=true; xlabel="body mass (kg)"; ylabel="resting power (W)"; label=fig:m-scale-kleiber; height=30% }} Kleiber's law on log–log axes. Both laws are straight lines; the shallower slope of $3/4$ means that, per kilogram, a large animal burns energy more slowly than a small one.

::: {.example #ex:m-scale-mouse-human title="A mouse and a person"}
Use @eq:m-scale-kleiber to compare the resting power of a $70\,\mathrm{kg}$ person and a $25\,\mathrm{g}$ mouse, in total and per kilogram.

**Strategy.** Evaluate $M^{3/4}$ with logarithms or a calculator, then divide by the mass.

**Solution.** For the person, $70^{0.75} = 24.2$, so $P = 3.4 \times 24.2 = 82\,\mathrm{W}$, or $1.2\,\mathrm{W\,kg^{-1}}$. For the mouse, $0.025^{0.75} = 0.063$, so $P = 0.21\,\mathrm{W}$, or $8.6\,\mathrm{W\,kg^{-1}}$.

**Significance.** The person's $82\,\mathrm{W}$ is close to the measured resting output of an adult, about the power of a bright incandescent bulb. Kilogram for kilogram, the mouse burns energy about seven times faster: its heart beats some six hundred times a minute. Size alone changes the pace of life, a pattern that returns when this course compares response times across the levels (@sec:fields-scale-size-response).
:::

::: {.check-your-learning}
A sphere's radius grows from $5\,\mu\mathrm{m}$ to $50\,\mu\mathrm{m}$. By what factor does its surface-to-volume ratio change? (Answer: it falls from $6 \times 10^{5}$ to $6 \times 10^{4}\,\mathrm{m^{-1}}$, a factor of ten.)
:::

::: {.soma-machine}
The Soma Machine's zoom moves along the line of @fig:m-scale-sizes: every level is a powers-of-ten step in size and in response time. **Try it:** `#level=atomic`, then `#level=human-vertebrate`, then `#level=cosmic-web`, and read the scale and response time in each level's header.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
dimensional analysis
: checking or deriving a relation by matching the dimensions (mass, length, time, ...) of both sides

logarithm
: the power to which a base (ten, or $e$) must be raised to give a number

logarithmic scale
: an axis on which equal steps are equal ratios

order-of-magnitude estimate
: an answer good to a factor of a few, built from factors that can each be guessed

power law
: a relation $y = A x^k$; a straight line of slope $k$ on log–log axes

scientific notation
: a number written as a value between 1 and 10 times a power of ten

significant figures
: the digits of a number that carry information

square–cube law
: when lengths scale by $s$, areas scale by $s^2$ and volumes by $s^3$
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Powers of ten
: $10^a \times 10^b = 10^{a+b}$, $\ 10^a/10^b = 10^{a-b}$

Logarithm
: $y = \log_{10} x \iff x = 10^y$; $\ \ln x = 2.303 \log_{10} x$

Logarithm rules
: $\log ab = \log a + \log b$, $\ \log a^n = n \log a$

Sound level
: $L = 10 \log_{10}(I/I_0)\ \mathrm{dB}$, $\ I_0 = 10^{-12}\,\mathrm{W\,m^{-2}}$

Power law
: $y = A x^k$; slope $k$ on log–log axes

Kleiber's law
: $P \approx 3.4\,\mathrm{W}\,(M/\mathrm{kg})^{3/4}$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:m-scale-powers]** Scientific notation writes numbers as a value times a power of ten; multiplying adds exponents. Sizes in this course span about forty-two factors of ten.

**[-@sec:m-scale-units]** SI units are built from base units; both sides of a valid equation have the same dimensions, and dimensional analysis can find the form of a law but not its numerical factor.

**[-@sec:m-scale-logs]** A logarithm counts powers. Logarithmic scales (decibels, magnitudes, the Atlas axis) compress huge ranges into small numbers.

**[-@sec:m-scale-estimating]** Fermi estimates multiply rough factors and are usually right to a factor of a few; relative uncertainties add in products.

**[-@sec:m-scale-laws]** Power laws are straight on log–log plots. The square–cube law explains why size changes function; Kleiber's law is an empirical $3/4$ power.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why does a logarithmic scale make equal steps equal ratios?
2. What can dimensional analysis tell you about a pendulum, and what can it not?
3. A friend says two earthquakes of magnitude $7.0$ and $8.0$ are "about the same". What would you reply?
4. Why does an order-of-magnitude estimate often come out better than its individual guesses?
5. Explain, using the square–cube law, why there are no insects the size of horses.
6. How would you test from data whether a relation is a power law, and how would you find its exponent?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:m-scale-nearest-star title="The nearest star"}
Proxima Centauri is $4.24$ light-years away. Express the distance in metres, and find how long its light takes to reach us in seconds.
:::

::: {.solution}
**Strategy.** Use one light-year $= 9.46 \times 10^{15}\,\mathrm{m}$ from the check in @sec:m-scale-powers.

**Solution.** $4.24 \times 9.46 \times 10^{15} = 4.01 \times 10^{16}\,\mathrm{m}$. The travel time is $4.24$ years, $4.24 \times 3.156 \times 10^{7} = 1.34 \times 10^{8}\,\mathrm{s}$.

**Significance.** Distances to stars are ten thousand times the distance to the Sun ($1.50 \times 10^{11}\,\mathrm{m}$). @ch:stars reads such distances from light alone.
:::

::: {.problems #pr:m-scale-string-speed title="A wave speed from dimensions"}
The speed of a wave on a string should depend on the tension $F$ (in newtons) and the mass per unit length $\mu$ (in $\mathrm{kg\,m^{-1}}$). Show that $v = \sqrt{F/\mu}$ has the right dimensions, and evaluate it for $F = 70\,\mathrm{N}$ and $\mu = 3.4 \times 10^{-3}\,\mathrm{kg\,m^{-1}}$.
:::

::: {.solution}
**Strategy.** Write the dimensions of $F/\mu$ and take the square root.

**Solution.** $[F/\mu] = \mathrm{M\,L\,T^{-2}} / \mathrm{M\,L^{-1}} = \mathrm{L^2\,T^{-2}}$, whose square root is $\mathrm{L\,T^{-1}}$, a speed. Numerically, $v = \sqrt{70/0.0034} = 143\,\mathrm{m\,s^{-1}}$.

**Significance.** This is the wave speed on the guitar string of @ex:fields-guitar-string, found there from the measured pitch. The dimensions alone fixed the form of the law.
:::

::: {.problems #pr:m-scale-decibels title="Decibels"}
A busy road produces a sound level of $85\,\mathrm{dB}$. What is the intensity, and how many times more intense is it than a $60\,\mathrm{dB}$ conversation?
:::

::: {.solution}
**Strategy.** Invert the decibel formula: $I = I_0 \times 10^{L/10}$.

**Solution.** $I = 10^{-12} \times 10^{8.5} = 3.2 \times 10^{-4}\,\mathrm{W\,m^{-2}}$. The ratio is $10^{(85-60)/10} = 10^{2.5} = 316$.

**Significance.** A difference of $25\,\mathrm{dB}$ is a factor of about three hundred in intensity; the ear perceives it as roughly a sixfold increase in loudness, another logarithmic response.
:::

::: {.problems #pr:m-scale-cells-in-body title="Cells in a person"}
Estimate the number of cells in a $70\,\mathrm{kg}$ person, taking a typical cell to be a cube $10\,\mu\mathrm{m}$ on a side with the density of water, $1000\,\mathrm{kg\,m^{-3}}$.
:::

::: {.solution}
**Strategy.** Find the mass of one cell, then divide.

**Solution.** The volume is $(10^{-5}\,\mathrm{m})^3 = 10^{-15}\,\mathrm{m^3}$, so one cell has mass $10^{-12}\,\mathrm{kg}$. The number of cells is $70/10^{-12} = 7 \times 10^{13}$.

**Significance.** Careful counts give about $3.7 \times 10^{13}$, a factor of two lower: most of our cells are small red blood cells, while much of our mass is in large muscle and fat cells and in fluid outside cells. The estimate still lands within a factor of two, which is what it was meant to do.
:::

::: {.problems #pr:m-scale-elephant title="An elephant's power"}
Use Kleiber's law to estimate the resting power of a $5000\,\mathrm{kg}$ elephant, in total and per kilogram, and compare the per-kilogram figure with the person of @ex:m-scale-mouse-human.
:::

::: {.solution}
**Strategy.** Evaluate $5000^{0.75}$, multiply by $3.4\,\mathrm{W}$, then divide by the mass.

**Solution.** $5000^{0.75} = 595$, so $P = 3.4 \times 595 = 2.0 \times 10^{3}\,\mathrm{W}$, or $0.40\,\mathrm{W\,kg^{-1}}$.

**Significance.** The elephant burns about two kilowatts at rest, but per kilogram only a third of the person's rate and a twentieth of the mouse's. The heaviest animals live slowest, which @fig:m-scale-kleiber shows as the gap between the two lines.
:::
