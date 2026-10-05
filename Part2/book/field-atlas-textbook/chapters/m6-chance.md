# Chance: Distributions and the Boltzmann Factor {#ch:m-chance}

{{Visualize | ch:m-chance | distribution:generic | pdf="exp(-(x+1.5)^2) + 0.6*exp(-(x-1.5)^2/0.5)"; x=[-4,4]; samples=6000; seed=11; bins=60; aspect=3; xlabel="state $x$"; opener=true }} Six thousand random draws from a two-humped distribution, the kind a noisy system with two valleys produces.

A single molecule of air moves unpredictably; a litre of air has a pressure you can quote to four figures. A single radioactive nucleus decays whenever it likes; a gram of them follows the exponential of @ch:m-change exactly. The bridge between the unpredictable small and the predictable large is probability. This chapter collects the parts of it the course uses: averages and spreads, distributions and the normal curve, why errors shrink as $1/\sqrt{N}$, how random steps become diffusion, and the single most useful formula in statistical physics, the Boltzmann factor, which says how likely a state is at a given temperature.

**Chapter outline.** [-@sec:m-chance-averages] Probability, averages and spread · [-@sec:m-chance-distributions] Distributions and densities · [-@sec:m-chance-normal] The normal curve and the square-root law · [-@sec:m-chance-random-walk] Random walks and diffusion · [-@sec:m-chance-boltzmann] The Boltzmann factor

## Probability, averages and spread {#sec:m-chance-averages}

::: {.learning-objectives}
- assign probabilities to outcomes and check that they add to one;
- compute the mean of a random quantity;
- compute its variance and standard deviation.
:::

The **probability** of an outcome is the fraction of times it happens in a long run of identical trials. A fair die shows each face with probability $1/6$; the probabilities of all possible outcomes add up to one. For a random quantity $X$ that takes values $x_i$ with probabilities $p_i$, the **mean** (or expected value) is the probability-weighted average,

$$\langle X \rangle = \sum_i p_i\,x_i,$$ {#eq:m-chance-mean}

and the **variance** measures the spread about it, the mean squared distance from the mean:

$$\sigma^2 = \langle (X - \langle X \rangle)^2 \rangle = \langle X^2 \rangle - \langle X \rangle^2.$$ {#eq:m-chance-variance}

Its square root $\sigma$ is the **standard deviation**, the typical size of a departure from the mean, in the same units as $X$.

::: {.example #ex:m-chance-die title="A fair die"}
Find the mean and standard deviation of the score on one roll of a fair die.

**Strategy.** Each face has $p = 1/6$. Use @eq:m-chance-mean for $\langle X \rangle$ and $\langle X^2 \rangle$, then @eq:m-chance-variance.

**Solution.** $\langle X \rangle = (1 + 2 + 3 + 4 + 5 + 6)/6 = 3.5$. $\langle X^2 \rangle = (1 + 4 + 9 + 16 + 25 + 36)/6 = 15.17$. So $\sigma^2 = 15.17 - 12.25 = 2.92$ and $\sigma = 1.71$.

**Significance.** No single roll gives $3.5$; the mean is a property of the long run, not of one throw. A typical roll misses it by about $1.7$.
:::

::: {.check-your-learning}
A coin is tossed; heads scores $1$ and tails $0$. Find the mean and standard deviation. (Answer: mean $0.5$, $\sigma^2 = 0.5 - 0.25 = 0.25$, $\sigma = 0.5$.)
:::

## Distributions and densities {#sec:m-chance-distributions}

::: {.learning-objectives}
- read a histogram and a probability density;
- find a probability as an area under a density;
- describe how random samples fill in a distribution.
:::

A quantity that can take any value, such as a height or the speed of a molecule, has no probability for an exact value; instead it has a **probability density** $p(x)$, a curve whose area between $a$ and $b$ is the probability of landing there:

$$P(a < X < b) = \int_a^b p(x)\,dx, \qquad \int_{-\infty}^{\infty} p(x)\,dx = 1.$$ {#eq:m-chance-density}

The integral of @ch:m-accumulation has become a probability. Mean and variance are the integrals $\int x\,p(x)\,dx$ and $\int (x - \langle x \rangle)^2\,p(x)\,dx$. In practice we meet a density through data: draw many samples, sort them into bins, and the **histogram**, scaled so that its total area is one, approaches the density as the number of samples grows.

$$p(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-(x - \mu)^2/2\sigma^2}$$ {#eq:m-chance-normal}

{{Visualize | eq:m-chance-normal | distribution:generic | pdf="exp(-(x-mu)^2/(2*s^2))"; mu=0; s=1; x=[-4,4]; samples=2000; seed=7; bins=40; shade=[-1,1]; expect_mean=0; expect_sd=1; expect_prob=0.6827; xlabel="$x$ (in units of $\sigma$, centred on $\mu$)"; label=fig:m-chance-normal; height=32% }} The normal density with $2000$ random draws. The histogram follows the curve but wanders around it, as samples do. The shaded area within one standard deviation of the mean holds $68.3\,\%$ of the probability.

::: {.check-your-learning}
For the normal curve, about $95\,\%$ of the probability lies within $2\sigma$ of the mean. If adult heights in a population have $\mu = 170\,\mathrm{cm}$ and $\sigma = 8\,\mathrm{cm}$, between which heights do about $95\,\%$ of adults lie? (Answer: $154$ to $186\,\mathrm{cm}$.)
:::

## The normal curve and the square-root law {#sec:m-chance-normal}

::: {.learning-objectives}
- state the central limit theorem in words;
- show that the spread of a sum grows as $\sqrt{N}$ and of an average shrinks as $1/\sqrt{N}$;
- judge whether an observed result is surprising.
:::

The curve of @eq:m-chance-normal, the **normal** or **Gaussian** distribution with mean $\mu$ and standard deviation $\sigma$, turns up everywhere for one reason. The **central limit theorem** says that the sum of many independent random contributions, whatever their individual distributions, is distributed normally. Measurement errors, the heights of people, the speeds of molecules along one direction: each is the sum of many small, unrelated influences.

For independent quantities, variances add. The sum of $N$ independent copies of a quantity with standard deviation $\sigma$ therefore has variance $N\sigma^2$ and standard deviation $\sqrt{N}\,\sigma$, and their *average* has standard deviation

$$\sigma_{\text{mean}} = \frac{\sigma}{\sqrt{N}}.$$ {#eq:m-chance-sqrt-law}

This **square-root law** is why repeated measurements help, why a large sample is more reliable than a small one, and why the fluctuations in a small volume of air in @sec:fields-zooming-out-when fell as $1/\sqrt{N}$: a cell holding $N$ molecules fluctuates by a fraction $1/\sqrt{N}$.

::: {.example #ex:m-chance-coins title="A hundred coin tosses"}
A fair coin is tossed $100$ times. What are the mean and standard deviation of the number of heads? Would $60$ heads be surprising?

**Strategy.** Each toss has mean $0.5$ and $\sigma = 0.5$ (the check in @sec:m-chance-averages). Sums add means and variances.

**Solution.** The mean is $100 \times 0.5 = 50$, and $\sigma = \sqrt{100} \times 0.5 = 5$. Sixty heads is $2\sigma$ above the mean. A result at least that far above happens in about $2.3\,\%$ of runs.

**Significance.** Unusual but not impossible: one class of forty students tossing coins would expect about one such run. A claim that rests on a single $2\sigma$ result is weak evidence. Physics usually asks for $5\sigma$ before announcing a discovery, a chance of about one in three and a half million.
:::

::: {.check-your-learning}
Twenty-five readings of a length each have $\sigma = 2.0\,\mathrm{mm}$. What is the uncertainty of their average? (Answer: $2.0/\sqrt{25} = 0.4\,\mathrm{mm}$.)
:::

## Random walks and diffusion {#sec:m-chance-random-walk}

::: {.learning-objectives}
- show that a random walk spreads as the square root of the number of steps;
- use $\langle x^2 \rangle = 2Dt$ to estimate diffusion times;
- explain why diffusion is fast over short distances and slow over long ones.
:::

A molecule in water is knocked about by its neighbours billions of times a second, each knock in a random direction. After $N$ steps of length $\ell$, its displacement is a sum of $N$ independent random steps, so by the square-root law its typical distance from the start is $\sqrt{N}\,\ell$, not $N\ell$. Steps happen at a steady rate, so $N$ grows in proportion to time, and the mean squared displacement along one direction grows linearly with time:

$$\langle x^2 \rangle = 2Dt,$$ {#eq:m-chance-diffusion}

where $D$, the **diffusion coefficient** in $\mathrm{m^2\,s^{-1}}$, depends on the molecule and the medium. A cloud of molecules released at one point spreads as a normal distribution whose width grows as $\sqrt{2Dt}$.

$$c(x, t) = \frac{1}{\sqrt{4\pi D t}}\,e^{-x^2/4Dt}$$ {#eq:m-chance-spreading}

{{Visualize | eq:m-chance-spreading | function-plot:neural | f="exp(-x^2/(4*t))/sqrt(4*pi*t)"; vary=t:0.25,1,4; x=[-8,8]; xlabel="position $x$ (units with $D = 1$)"; ylabel="concentration"; label=fig:m-chance-spreading; height=30% }} A drop of dye spreading by diffusion, at three times. Each time four times longer doubles the width and halves the peak; the area under every curve, the total amount of dye, stays the same.

::: {.example #ex:m-chance-sugar title="Sugar in water"}
A sugar molecule in water has $D = 5 \times 10^{-10}\,\mathrm{m^2\,s^{-1}}$. How far does it typically wander along one direction in one second, and in one hour?

**Strategy.** The typical distance is $\sqrt{2Dt}$, from @eq:m-chance-diffusion.

**Solution.** In $1\,\mathrm{s}$: $\sqrt{2 \times 5 \times 10^{-10} \times 1} = 3.2 \times 10^{-5}\,\mathrm{m} = 32\,\mu\mathrm{m}$. In one hour, $3600$ times longer, the distance is $\sqrt{3600} = 60$ times larger: $1.9\,\mathrm{mm}$.

**Significance.** Diffusion crosses a cell in a fraction of a second but takes an hour to cross two millimetres and years to cross a metre. This is why small organisms can rely on diffusion and large ones need hearts and blood vessels, the square–cube argument of @sec:m-scale-laws seen from the side of transport.
:::

::: {.check-your-learning}
A protein with $D = 1 \times 10^{-11}\,\mathrm{m^2\,s^{-1}}$ must diffuse $10\,\mu\mathrm{m}$ across a cell. Roughly how long does it take? (Answer: $t = x^2/2D = 10^{-10}/(2 \times 10^{-11}) = 5\,\mathrm{s}$.)
:::

## The Boltzmann factor {#sec:m-chance-boltzmann}

::: {.learning-objectives}
- state the Boltzmann factor and the meaning of $kT$;
- compare the populations of two states at a given temperature;
- explain why rates of escape over a barrier depend exponentially on its height.
:::

A system in contact with surroundings at temperature $T$ does not sit in its lowest-energy state; the jostling of the surroundings keeps lifting it into higher ones. The probability of finding it in a state of energy $E$ is proportional to the **Boltzmann factor**:

$$P(E) \propto e^{-E/kT},$$ {#eq:m-chance-boltzmann}

where $k = 1.381 \times 10^{-23}\,\mathrm{J\,K^{-1}}$ is Boltzmann's constant. The product $kT$ is the **thermal energy**, the typical size of a kick from the surroundings: $0.0252\,\mathrm{eV}$ at room temperature, $293\,\mathrm{K}$. States less than a few $kT$ above the lowest are well populated; states many $kT$ above are almost empty, and each extra $kT$ of height costs a factor $e = 2.7$ in probability.

$$p_n = \frac{e^{-E_n/kT}}{\sum_m e^{-E_m/kT}}$$ {#eq:m-chance-levels}

{{Visualize | eq:m-chance-levels | distribution:quantum | levels="0,1,2,3,4"; weight="exp(-E/kT)"; vary=kT:0.5,1,3; expect_p0=0.8647; xlabel="energy level $E$ (in units of the level spacing)"; label=fig:m-chance-levels; height=30% }} Populations of five equally spaced levels at three temperatures. When $kT$ is half a level spacing almost everything sits in the lowest level ($86.5\,\%$); as $kT$ grows the higher levels fill and the distribution flattens.

::: {.example #ex:m-chance-atmosphere title="How high does the air go?"}
The density of the atmosphere falls with height $h$ because a molecule at height $h$ has extra energy $mgh$. Using the Boltzmann factor, find the height over which the density falls by a factor $e$ at $288\,\mathrm{K}$, for air molecules of mass $4.81 \times 10^{-26}\,\mathrm{kg}$.

**Strategy.** The density goes as $e^{-mgh/kT}$, which falls by $e$ when $mgh = kT$.

**Solution.** $H = kT/mg = (1.381 \times 10^{-23} \times 288)/(4.81 \times 10^{-26} \times 9.81) = 8.4 \times 10^{3}\,\mathrm{m}$.

**Significance.** This **scale height** of about $8\,\mathrm{km}$ matches the real atmosphere well: at the summit of Everest, $8.8\,\mathrm{km}$ up, the air is about a third as dense as at sea level. A single formula connects temperature, gravity and the thickness of the sky.
:::

The Boltzmann factor also sets how fast things happen. To escape from a valley, as in @fig:m-vec-landscape, a system must borrow enough energy from the surroundings to climb the barrier $\Delta U$, and the chance of that is $e^{-\Delta U/kT}$. The escape rate therefore depends exponentially on the barrier height, the **Arrhenius law**. Raising a barrier by $2kT$ makes escapes $e^2 = 7.4$ times rarer, which is why cooking speeds up so sharply with temperature, and why the waiting times of @sec:human-noise-escape are so sensitive to barrier and noise.

::: {.going-further}
The sum in the denominator of @eq:m-chance-levels is the **partition function** $Z = \sum e^{-E/kT}$; from it follow the mean energy, the entropy and the free energy of a system in equilibrium. When states of the same energy can be arranged in several ways, each energy is weighted by its **degeneracy** $g$, the number of such states: $P(E) \propto g\,e^{-E/kT}$. For noise-driven escape, Kramers showed in 1940 that the rate is $r \approx \frac{\omega_a\omega_b}{2\pi\gamma}\,e^{-\Delta U/kT}$ for a heavily damped particle, with $\omega_a$ and $\omega_b$ set by the curvatures of the valley and the barrier top: the eigenvalues of @sec:m-vec-stability meet the Boltzmann factor.
:::

::: {.check-your-learning}
Two states are $0.10\,\mathrm{eV}$ apart. At $300\,\mathrm{K}$ ($kT = 0.0259\,\mathrm{eV}$), what is the ratio of the population of the upper state to the lower? (Answer: $e^{-0.10/0.0259} = 0.021$, about one in fifty.)
:::

::: {.soma-machine}
The Soma Machine's human level adds noise to a landscape and lets the state hop between valleys. **Try it:** `#level=human-vertebrate&lens=on`, and compare how often the state escapes a shallow valley and a deep one.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
Arrhenius law
: escape rates over a barrier fall as $e^{-\Delta U/kT}$

Boltzmann factor
: $e^{-E/kT}$, the relative probability of a state of energy $E$ at temperature $T$

central limit theorem
: sums of many independent random contributions are normally distributed

diffusion coefficient
: $D$ in $\langle x^2 \rangle = 2Dt$; how fast random motion spreads

mean
: the probability-weighted average of a random quantity

normal distribution
: the bell-shaped Gaussian density with mean $\mu$ and standard deviation $\sigma$

probability density
: a curve whose area over an interval is the probability of landing in it

random walk
: a path of independent random steps; its spread grows as $\sqrt{N}$

standard deviation
: the square root of the variance; the typical departure from the mean

thermal energy
: $kT$, the typical energy of a kick from surroundings at temperature $T$
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Mean and variance
: $\langle X \rangle = \sum p_i x_i$, $\ \sigma^2 = \langle X^2 \rangle - \langle X \rangle^2$

Normal density
: $p(x) = e^{-(x-\mu)^2/2\sigma^2}/\sigma\sqrt{2\pi}$

Square-root law
: $\sigma_{\text{mean}} = \sigma/\sqrt{N}$

Diffusion
: $\langle x^2 \rangle = 2Dt$

Boltzmann factor
: $P(E) \propto e^{-E/kT}$, $\ kT = 0.0252\,\mathrm{eV}$ at $293\,\mathrm{K}$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:m-chance-averages]** Probabilities add to one; the mean is a weighted average and the standard deviation the typical departure from it.

**[-@sec:m-chance-distributions]** A continuous quantity has a probability density whose areas are probabilities; histograms of samples approach it.

**[-@sec:m-chance-normal]** Sums of many independent contributions are normal. Spreads of sums grow as $\sqrt{N}$ and of averages shrink as $1/\sqrt{N}$.

**[-@sec:m-chance-random-walk]** Random steps give diffusion, $\langle x^2 \rangle = 2Dt$: fast over microns, slow over metres.

**[-@sec:m-chance-boltzmann]** At temperature $T$ a state of energy $E$ has relative probability $e^{-E/kT}$; escape rates over barriers follow the same factor.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why can the mean of a die roll be a value the die never shows?
2. What does the area under a probability density represent?
3. Why does averaging more measurements reduce the uncertainty, and why only as $1/\sqrt{N}$?
4. Why does a large animal need a heart while a bacterium does not?
5. What does it mean for a state to be "a few $kT$" above the ground state?
6. Why does a small change in temperature or barrier height change an escape rate so much?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:m-chance-two-dice title="Two dice"}
Two fair dice are rolled and their scores added. What is the probability of a total of $7$? What are the mean and standard deviation of the total?
:::

::: {.solution}
**Strategy.** Count the outcomes: $36$ equally likely pairs. Means add, and variances add for independent dice (@ex:m-chance-die).

**Solution.** Six pairs give $7$, so $P = 6/36 = 1/6$. The mean is $3.5 + 3.5 = 7$, and $\sigma = \sqrt{2 \times 2.92} = 2.42$.

**Significance.** One die is flat, but the total of two already peaks in the middle: the first step of the central limit theorem.
:::

::: {.problems #pr:m-chance-many-coins title="Ten thousand tosses"}
A coin is tossed $10\,000$ times and shows $5100$ heads. How many standard deviations is this from the mean? Is the coin likely to be biased?
:::

::: {.solution}
**Strategy.** Mean $5000$, $\sigma = \sqrt{10\,000} \times 0.5 = 50$.

**Solution.** $5100$ is $100/50 = 2\sigma$ above the mean. A fair coin does this or better about $2.3\,\%$ of the time.

**Significance.** Suggestive, not conclusive. Note that the *fraction* of heads, $51\,\%$, is closer to a half than $60\,\%$ in @ex:m-chance-coins, yet the result is just as unusual: more tosses measure the fraction more precisely.
:::

::: {.problems #pr:m-chance-oxygen title="Oxygen into a muscle"}
Oxygen in tissue has $D \approx 2 \times 10^{-9}\,\mathrm{m^2\,s^{-1}}$. How long does it take to diffuse $50\,\mu\mathrm{m}$, a typical distance from a capillary to the farthest muscle cell? And $5\,\mathrm{mm}$?
:::

::: {.solution}
**Strategy.** $t = x^2/2D$, from @eq:m-chance-diffusion.

**Solution.** For $50\,\mu\mathrm{m}$: $(5 \times 10^{-5})^2/(4 \times 10^{-9}) = 0.63\,\mathrm{s}$. For $5\,\mathrm{mm}$, a hundred times farther, ten thousand times longer: $6.3 \times 10^{3}\,\mathrm{s}$, nearly two hours.

**Significance.** Capillaries are spaced so that no cell is more than about fifty microns from one: diffusion can cover that distance in under a second.
:::

::: {.problems #pr:m-chance-sun-hydrogen title="Excited hydrogen in the Sun"}
The first excited level of hydrogen is $10.2\,\mathrm{eV}$ above the ground level and has four times as many states (degeneracy ratio $4$). At the Sun's surface, $5800\,\mathrm{K}$, what fraction of hydrogen atoms are in it, relative to the ground level?
:::

::: {.solution}
**Strategy.** $kT = 8.617 \times 10^{-5} \times 5800 = 0.500\,\mathrm{eV}$. Use $4\,e^{-E/kT}$.

**Solution.** $E/kT = 10.2/0.500 = 20.4$, so the ratio is $4\,e^{-20.4} = 5.5 \times 10^{-9}$: about five atoms in a billion.

**Significance.** So few, yet the Sun's spectrum shows strong hydrogen lines from that level, because the Sun contains so much hydrogen. Reading temperatures from such population ratios is how @ch:stars classifies stars.
:::

::: {.problems #pr:m-chance-arrhenius title="Ten degrees warmer"}
A reaction runs twice as fast at $30\,^\circ\mathrm{C}$ as at $20\,^\circ\mathrm{C}$. Assuming the Arrhenius law, what is its barrier (activation energy) in electronvolts?
:::

::: {.solution}
**Strategy.** The rate ratio is $e^{-\Delta U/kT_2}/e^{-\Delta U/kT_1}$, so $\ln 2 = \frac{\Delta U}{k}\left(\frac{1}{T_1} - \frac{1}{T_2}\right)$ with $T_1 = 293.15\,\mathrm{K}$, $T_2 = 303.15\,\mathrm{K}$.

**Solution.** $1/T_1 - 1/T_2 = 1.125 \times 10^{-4}\,\mathrm{K^{-1}}$, so $\Delta U = 1.381 \times 10^{-23} \times 0.693/1.125 \times 10^{-4} = 8.5 \times 10^{-20}\,\mathrm{J} = 0.53\,\mathrm{eV}$.

**Significance.** A barrier of about twenty $kT$ gives the biologist's rule of thumb that rates double for every ten degrees. Small barriers in units of eV are huge in units of $kT$, which is why the factor is so sensitive.
:::
