# Zooming: Coarse-Graining, Similarity and Sampling {#ch:zooming}

{{Visualize | ch:zooming | function-plot:generic | f="sin(x)*sin(l/2)/(l/2) + 0.5*sin(6*x)*sin(3*l)/(3*l) + 0.3*sin(17*x)*sin(8.5*l)/(8.5*l)"; vary=l:0.01,0.5,2; x=[0,12.6]; aspect=3; xlabel="position $x$"; opener=true }} One field seen through three cell sizes $\ell$. Each zoom out removes the detail smaller than the cell and keeps the rest.

The Field Atlas walks through thirty-one levels, from the atom to the cosmic web, and at every step it changes what it describes: molecules become a concentration, cells become a tissue, stars become a density of mass. @sec:fields-zooming-out-when introduced this move, **zooming out**, with one example. This chapter makes it precise. It shows what averaging does to a field and why it is a filter, why averaging a nonlinear law creates new terms, how dimensionless numbers decide when two systems behave alike, and how sampling limits what any record can show. It ends with the programme's **zoom operator**, the rule it uses to step between levels, and the labels that keep such steps honest.

**Chapter outline.** [-@sec:zoom-block-averages] Block averages are filters · [-@sec:zoom-closure] Averaging creates new terms · [-@sec:zoom-dimensionless] Dimensionless numbers and similarity · [-@sec:zoom-sampling] Sampling and aliasing · [-@sec:zoom-operator] The zoom operator and its labels

::: {.maths-you-need}
Averages as integrals (@sec:m-acc-averages); the square-root law (@sec:m-chance-normal); filters and transfer functions (@sec:freq-convolution-theorem); units and dimensions (@sec:m-scale-units).
:::

## Block averages are filters {#sec:zoom-block-averages}

::: {.learning-objectives}
- define a block average of a field over a cell of size $\ell$;
- explain why block averaging removes detail smaller than $\ell$;
- compute how much of a wave survives averaging over a given cell.
:::

The simplest way to zoom out is to average. Replace the value of a field $u(x)$ at each point by its mean over a cell of size $\ell$ around that point:

$$\bar{u}_\ell(x) = \frac{1}{\ell}\int_{x - \ell/2}^{x + \ell/2} u(x')\,dx'.$$ {#eq:zoom-block}

This is how a weather map turns millions of air molecules into a temperature, and how a camera pixel turns a patch of a scene into one brightness. It is also a convolution (@eq:freq-convolution) of the field with a box of width $\ell$, so by the convolution theorem it acts on each wavelength separately. A wave $\sin kx$ survives averaging multiplied by the factor

$$\frac{\sin(k\ell/2)}{k\ell/2},$$ {#eq:zoom-sinc}

which is close to one for long waves ($k\ell \ll 1$) and small or zero for waves shorter than the cell. **A block average is a low-pass filter in space.** What it removes is not destroyed in the world; it is removed from the description.

{{Visualize | eq:zoom-sinc | function-plot:generic | f1="sin(x) + 0.5*sin(6*x) + 0.3*sin(17*x)"; name1="fine-grained field"; f2="sin(x)*sin(l/2)/(l/2) + 0.5*sin(6*x)*sin(3*l)/(3*l) + 0.3*sin(17*x)*sin(8.5*l)/(8.5*l)"; name2="block average over $\ell = 1$"; l=1; legend=below; x=[0,12.6]; xlabel="position $x$"; label=fig:zoom-block; height=30% }} A field with detail at three wavelengths, and its block average over cells of width one. The longest wave passes almost untouched ($96\,\%$); the two short waves are cut to less than a tenth of their size, as @eq:zoom-sinc predicts.

::: {.example #ex:zoom-averaging-wave title="How much of a wave survives?"}
A wave of wavelength $\lambda$ is averaged over cells half a wavelength wide. What fraction of its amplitude survives? What if the cells are a whole wavelength wide?

**Strategy.** With $k = 2\pi/\lambda$ and $\ell = \lambda/2$, $k\ell/2 = \pi/2$. Use @eq:zoom-sinc.

**Solution.** $\sin(\pi/2)/(\pi/2) = 2/\pi = 0.64$. For $\ell = \lambda$, $k\ell/2 = \pi$ and $\sin\pi = 0$: nothing survives.

**Significance.** Averaging a temperature record over whole days removes the daily cycle completely, while averaging over half-days keeps about two thirds of it. The choice of cell decides what the coarse description can see.
:::

::: {.check-your-learning}
A camera pixel covers $5\,\mu\mathrm{m}$ of the image. Roughly what is the shortest pattern wavelength it can record without wiping it out? (Answer: patterns much longer than $5\,\mu\mathrm{m}$ survive; a pattern of wavelength $5\,\mu\mathrm{m}$ averages to zero.)
:::

## Averaging creates new terms {#sec:zoom-closure}

::: {.learning-objectives}
- show that the average of a square is not the square of the average;
- explain the closure problem in words;
- give examples of hidden terms created by coarse-graining.
:::

Averaging is harmless for linear laws: the average of a sum is the sum of the averages. Nonlinear laws are different. The mean of a square is the square of the mean *plus* the variance (@eq:m-chance-variance):

$$\langle u^2 \rangle = \langle u \rangle^2 + \sigma_u^2.$$ {#eq:zoom-mean-square}

So when a law contains $u^2$, or any nonlinear function of $u$, the averaged law contains the averaged field *and* a term that depends on the fluctuations the averaging threw away. The coarse description is not closed: it needs extra information about the fine scale. Supplying that information, by measurement or by a model, is the **closure problem**, and it appears at almost every step of the ladder.

::: {.example #ex:zoom-hidden-energy title="Energy hidden in eddies"}
Wind blows with a mean speed of $10\,\mathrm{m\,s^{-1}}$ and turbulent fluctuations of standard deviation $2\,\mathrm{m\,s^{-1}}$ about the mean. Compare the true mean kinetic energy per kilogram with the value computed from the mean speed.

**Strategy.** Kinetic energy per kilogram is $\tfrac{1}{2}v^2$; use @eq:zoom-mean-square.

**Solution.** From the mean speed, $\tfrac{1}{2} \times 10^2 = 50\,\mathrm{J\,kg^{-1}}$. The true mean is $\tfrac{1}{2}(10^2 + 2^2) = 52\,\mathrm{J\,kg^{-1}}$. About $4\,\%$ of the energy is in eddies smaller than the averaging cell.

**Significance.** A weather model that ignored this would lose energy at every step. Real models add a turbulence closure: an estimate of the hidden term in terms of the resolved field. Material laws (stiffness, viscosity) and neural population models are closures of the same kind.
:::

The lesson for the Atlas is sharp. A diagram that keeps the same equation from one level to the next, with bars placed over the symbols, is not a derivation. Every zoom step has to say what was averaged, what new terms appeared, and how they were closed.

::: {.check-your-learning}
A voltage averages to zero but fluctuates with a standard deviation of $2\,\mathrm{mV}$. What is the mean of its square? (Answer: $4\,\mathrm{mV^2}$. The power is not zero although the mean is, the root-mean-square idea of @sec:m-acc-averages.)
:::

## Dimensionless numbers and similarity {#sec:zoom-dimensionless}

::: {.learning-objectives}
- form the Reynolds number and interpret its size;
- use a dimensionless number to decide whether two systems behave alike;
- scale a model experiment to its full-size original.
:::

When are two systems at different scales really alike? Not when they look alike, but when the dimensionless numbers that control their equations are equal. These numbers are ratios of competing effects in which all units cancel (@sec:m-scale-units). The most famous is the **Reynolds number**, which compares inertia (keeping going) with viscosity (being slowed by the fluid):

$$Re = \frac{vL}{\nu},$$ {#eq:zoom-reynolds}

where $v$ is a speed, $L$ a size and $\nu$ the fluid's kinematic viscosity, $1.0 \times 10^{-6}\,\mathrm{m^2\,s^{-1}}$ for water. At $Re \ll 1$ viscosity wins: a swimmer stops the instant it stops pushing, and the flow is smooth and reversible. At $Re \gg 1000$ inertia wins: a swimmer glides, and the flow breaks into turbulence.

{{Visualize | eq:zoom-reynolds | log-scale:wave | items="bacterium=6e-5, sperm cell=5e-3, small fish=5e3, human swimmer=2e6, blue whale=2.5e8"; range=[-5,9]; unit="Reynolds number"; label=fig:zoom-reynolds; width=100% }} Swimmers in water placed by Reynolds number. All swim in the same fluid, but across thirteen factors of ten they face different physics: a bacterium lives in a world of syrup, a whale in a world of momentum.

::: {.example #ex:zoom-bacterium title="Life at low Reynolds number"}
A bacterium $2\,\mu\mathrm{m}$ long swims at $30\,\mu\mathrm{m\,s^{-1}}$; a person $2\,\mathrm{m}$ tall swims at $1\,\mathrm{m\,s^{-1}}$. Find the Reynolds number of each in water.

**Strategy.** Use @eq:zoom-reynolds with $\nu = 1.0 \times 10^{-6}\,\mathrm{m^2\,s^{-1}}$.

**Solution.** Bacterium: $(30 \times 10^{-6})(2 \times 10^{-6})/10^{-6} = 6 \times 10^{-5}$. Person: $(1)(2)/10^{-6} = 2 \times 10^{6}$.

**Significance.** The two differ by a factor of thirty billion. If the bacterium stops beating its flagellum it coasts less than the width of an atom. Same water, same equations, different dimensionless number, different world: this, not size alone, is what separates levels.
:::

Equal dimensionless numbers mean equal behaviour, which is why engineers test **scale models**. A ship's bow wave is controlled by the **Froude number** $Fr = v/\sqrt{gL}$, the ratio of speed to the speed of a gravity wave as long as the ship. A model that matches $Fr$ makes the same waves, scaled.

::: {.example #ex:zoom-ship-model title="Testing a ship in a tank"}
A ship $100\,\mathrm{m}$ long will sail at $10\,\mathrm{m\,s^{-1}}$. A model is built at $1{:}25$ scale. How fast must it be towed to make the same pattern of waves?

**Strategy.** Keep $Fr = v/\sqrt{gL}$ fixed: $v \propto \sqrt{L}$.

**Solution.** The model is $25$ times shorter, so it must go $\sqrt{25} = 5$ times slower: $2.0\,\mathrm{m\,s^{-1}}$.

**Significance.** The model cannot match the Reynolds number at the same time (that would need it to go *faster*), so naval architects correct for viscous drag separately. Similarity is always similarity *in a chosen number*, a choice the Atlas must make explicitly at each zoom step.
:::

::: {.check-your-learning}
Oxygen in blood moves at $1\,\mathrm{mm\,s^{-1}}$ along a capillary $10\,\mu\mathrm{m}$ wide and diffuses with $D = 2 \times 10^{-9}\,\mathrm{m^2\,s^{-1}}$. Find the Péclet number $Pe = vL/D$, which compares carrying by flow with spreading by diffusion. (Answer: $Pe = 5$: flow and diffusion are comparable, which is what capillaries are designed for.)
:::

## Sampling and aliasing {#sec:zoom-sampling}

::: {.learning-objectives}
- state the Nyquist limit for a sampled signal;
- explain aliasing and give an everyday example;
- say what a coarse record can and cannot show.
:::

Zooming out loses detail on purpose. Recording data loses it whether we like it or not. A signal measured every $\Delta t$ seconds cannot reveal frequencies above the **Nyquist frequency**,

$$f_N = \frac{1}{2\Delta t}.$$ {#eq:zoom-nyquist}

Worse, a frequency above $f_N$ does not simply vanish: it reappears disguised as a lower one, an **alias**. The spokes of a wagon wheel in a film seem to turn slowly backwards for this reason: the camera samples the turning wheel too rarely.

{{Visualize | eq:zoom-nyquist | function-plot:generic | f1="sin(2*pi*9*t)"; name1="true signal, 9 Hz"; f2="-sin(2*pi*1*t)"; name2="what the samples show, 1 Hz"; var=t; x=[0,1]; sample_every=0.1; legend=below; xlabel="time (s)"; label=fig:zoom-alias; height=30% }} A $9\,\mathrm{Hz}$ oscillation sampled ten times a second (dots). The samples fall exactly on a slow $1\,\mathrm{Hz}$ wave: the fast signal has been aliased to a slow one. Nothing in the samples alone can tell the two apart.

::: {.example #ex:zoom-cd-audio title="Why a CD samples at 44.1 kHz"}
Human hearing extends to about $20\,\mathrm{kHz}$. What is the Nyquist frequency of CD audio, sampled at $44.1\,\mathrm{kHz}$, and why must sounds above it be filtered out before recording?

**Strategy.** $f_N = 1/2\Delta t$ = half the sampling rate.

**Solution.** $f_N = 44.1/2 = 22.05\,\mathrm{kHz}$, just above the limit of hearing. A $30\,\mathrm{kHz}$ tone, inaudible in the room, would alias to $44.1 - 30 = 14.1\,\mathrm{kHz}$, clearly audible, so a low-pass filter (@sec:freq-convolution-theorem) removes everything above about $20\,\mathrm{kHz}$ first.

**Significance.** Every measurement in this course has a sampling rate and a resolution: a heart monitor, a seismograph, a sky survey. A pattern finer than the record's resolution is not evidence; it may be an alias.
:::

::: {.check-your-learning}
City traffic data are published as monthly totals. Can they show a weekly rhythm? (Answer: no. A record sampled monthly has a Nyquist period of two months; weekly rhythms are averaged away or aliased.)
:::

## The zoom operator and its labels {#sec:zoom-operator}

::: {.learning-objectives}
- list the six components the programme's zoom operator must map;
- distinguish four kinds of step between levels;
- assign an evidence label to a cross-level claim.
:::

Everything so far is standard physics and signal processing. The programme behind the Atlas packages it into a single bookkeeping device, the **zoom operator**, which maps a description at one level $a$ to a description at another level $b$ [@P11]:

$$Z_{a \to b}: (D_a, V_a, L_a, B_a, J_a, O_a) \longrightarrow (D_b, V_b, L_b, B_b, J_b, O_b),$$ {#eq:zoom-operator}

where $D$ is the domain, $V$ the space of values the field takes, $L$ the operator (the equation), $B$ the boundary, $J$ the source and $O$ the observable. These are the four questions of @sec:fields-zooming-out-when with the domain and value space made explicit. A **strong transfer** between levels defines a map for every component that matters; a **weak analogy** carries over only the diagram of source, kernel and response. The programme allows both, provided each is labelled as what it is. The Field Atlas draws the thirty-one levels as a ladder from the registry data in its chapter T3.

The registry joins levels by **path edges**, and each edge is one of four different mathematical acts:

| Edge type | What happens | Example | What to ask |
|:--|:--|:--|:--|
| Aggregation | many units become a population field | cells to a local circuit | what was averaged, and what closure was used? |
| Projection | a large state is read through fewer variables | whole brain to a heart-rate record | what information was lost? |
| Boundary change | the domain or its edges change | galactic disc to halo | which modes enter or leave the spectrum? |
| Substrate change | a different physical carrier takes over | biochemistry to membrane voltage | what replaced what, and is the kernel re-measured? |

The evidence label of a claim is recalculated at each step, because a statement true at one level may become an analogy at the next. A theorem checked in Lean about an eight-mode matrix stays `kernel-verified` as mathematics, but its use as a model of a body is `interpretive` until tested; a successful simulation stays `simulated` and does not become a hardware result. The organising idea that the same response grammar appears at every level is `interpretive`: a way of reading many measurements together [@P11]. The stronger claim that particular cross-level transfers predict new measurements is an `open-hypothesis`, and the zoom operator makes it falsifiable. A transfer fails if the observable it needs is missing, if the response time is wrong, if the kernel has the wrong range, or if the receiving level's boundary destroys the pattern.

::: {.going-further}
Physics has one fully worked-out theory of zooming: the **renormalisation group**. As the observation scale $\mu$ changes, the effective couplings $g_i$ of a theory change according to flow equations, $dg_i/d\log\mu = \beta_i(g)$. Most couplings fade as one zooms out (they are **irrelevant**); a few grow (**relevant**); and where the flow stops, at a **fixed point**, the system looks the same at every scale. Near such points very different systems share exactly the same behaviour: the liquid–gas critical point and the Curie point of a uniaxial magnet have the same critical exponents, an `empirical-result` called **universality**. The Atlas does not claim that its ladder is a renormalisation-group flow. It borrows the discipline: a change of scale is an operation on descriptions, with named survivors.
:::

::: {.soma-machine}
The Soma Machine's zoom is the zoom operator made visible: each step names its edge. **Try it:** `#tour=cell-to-cosmos` and, at each stop, read what the level's header says is preserved and what is new.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
aliasing
: a frequency above the Nyquist limit appearing as a lower one in sampled data

block average
: the mean of a field over a cell; a low-pass filter in space

closure problem
: averaged nonlinear laws need extra information about the discarded fine scale

dimensionless number
: a ratio of competing effects in which all units cancel

Nyquist frequency
: half the sampling rate; the highest frequency a sampled record can show

Reynolds number
: $Re = vL/\nu$; inertia compared with viscosity

similarity
: two systems with equal controlling dimensionless numbers behave alike

zoom operator
: the programme's map of domain, values, operator, boundary, source and observable from one level to another
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Block average
: $\bar{u}_\ell(x) = \frac{1}{\ell}\int_{x-\ell/2}^{x+\ell/2} u\,dx'$; a wave survives by $\sin(k\ell/2)/(k\ell/2)$

Mean of a square
: $\langle u^2 \rangle = \langle u \rangle^2 + \sigma_u^2$

Reynolds and Froude numbers
: $Re = vL/\nu$, $\ Fr = v/\sqrt{gL}$

Nyquist frequency
: $f_N = 1/2\Delta t$

Zoom operator
: $Z_{a\to b}: (D, V, L, B, J, O)_a \to (D, V, L, B, J, O)_b$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:zoom-block-averages]** Averaging over cells is a low-pass filter: long waves survive, waves shorter than the cell vanish.

**[-@sec:zoom-closure]** Averages of nonlinear laws depend on the discarded fluctuations; every zoom step needs a closure.

**[-@sec:zoom-dimensionless]** Systems behave alike when their controlling dimensionless numbers match, not when they look alike.

**[-@sec:zoom-sampling]** A record sampled every $\Delta t$ cannot show frequencies above $1/2\Delta t$, and higher ones alias.

**[-@sec:zoom-operator]** The programme's zoom operator maps six components between levels along four kinds of edge; the cross-level reading is `interpretive`, specific transfers are `open-hypothesis`.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. In what sense is a block average a filter, and what does it filter out?
2. Why does averaging a nonlinear law create a new term, while averaging a linear one does not?
3. A bacterium and a whale swim in the same ocean. Why do they need completely different swimming strategies?
4. Why can a ship model not match both the Froude and the Reynolds numbers of the full ship?
5. How could a seismograph sampled once a minute mislead you about a $1\,\mathrm{Hz}$ tremor?
6. What would it take to turn an `interpretive` cross-level comparison into a tested one?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:zoom-quarter-cell title="A narrow cell"}
A wave of wavelength $\lambda$ is averaged over cells a quarter of a wavelength wide. What fraction of its amplitude survives?
:::

::: {.solution}
**Strategy.** $k\ell/2 = (2\pi/\lambda)(\lambda/4)/2 = \pi/4$; use @eq:zoom-sinc.

**Solution.** $\sin(\pi/4)/(\pi/4) = 0.707/0.785 = 0.90$.

**Significance.** Cells a quarter of a wavelength wide keep $90\,\%$ of the wave. A rule of thumb follows: resolve a feature with at least four cells per wavelength.
:::

::: {.problems #pr:zoom-aorta title="Blood in the aorta"}
Blood flows at $0.3\,\mathrm{m\,s^{-1}}$ through the aorta, $2.5\,\mathrm{cm}$ wide, with kinematic viscosity $3.3 \times 10^{-6}\,\mathrm{m^2\,s^{-1}}$. Find the Reynolds number. Pipe flow usually turns turbulent above about $2000$.
:::

::: {.solution}
**Strategy.** Use @eq:zoom-reynolds.

**Solution.** $Re = 0.3 \times 0.025/3.3 \times 10^{-6} = 2.3 \times 10^{3}$.

**Significance.** The aorta works close to the transition. During exercise, when the speed rises, flow there can briefly become turbulent, which doctors hear as a murmur.
:::

::: {.problems #pr:zoom-ferry-model title="A ferry in a tank"}
A ferry $64\,\mathrm{m}$ long sails at $8\,\mathrm{m\,s^{-1}}$. How fast should a $4\,\mathrm{m}$ model be towed to match its Froude number?
:::

::: {.solution}
**Strategy.** The scale is $1{:}16$; speed scales as $\sqrt{L}$.

**Solution.** $8/\sqrt{16} = 2.0\,\mathrm{m\,s^{-1}}$.

**Significance.** A model sixteen times smaller sails four times slower to make the same waves: a tank of modest size can test a full ship.
:::

::: {.problems #pr:zoom-heart-monitor title="A tremor in a heart record"}
A wearable records the heart signal $4$ times a second. What is its Nyquist frequency? A hand tremor at $3\,\mathrm{Hz}$ leaks into the signal. At what frequency does it appear?
:::

::: {.solution}
**Strategy.** $f_N = 4/2 = 2\,\mathrm{Hz}$. A frequency $f$ between $f_N$ and the sampling rate $f_s$ appears at $f_s - f$.

**Solution.** The tremor appears at $4 - 3 = 1\,\mathrm{Hz}$, inside the range of real heart rhythms.

**Significance.** An aliased tremor at $1\,\mathrm{Hz}$ could be mistaken for a heartbeat feature. Good instruments filter before they sample.
:::

::: {.problems #pr:zoom-label-step title="Label the step"}
A paper models how one person's stress response spreads through a group by reusing, unchanged, the kernel fitted to individuals in the laboratory. Name the edge type, the component of @eq:zoom-operator most at risk, and the right evidence label before any group data are fitted.
:::

::: {.solution}
**Strategy.** Ask which act of the table in @sec:zoom-operator is performed.

**Solution.** It is an aggregation (individuals into a group field). The operator $L$ and its closure are most at risk: interactions between people add terms the individual kernel does not contain. Before group data are fitted, the transfer is `interpretive` as a modelling choice and the prediction an `open-hypothesis`.

**Significance.** Naming the edge turns a vague claim of "the same pattern" into a checkable list. @ch:groups shows what coupling adds when people interact.
:::
