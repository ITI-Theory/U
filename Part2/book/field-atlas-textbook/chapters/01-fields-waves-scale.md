# Fields, Waves, and Scale {#ch:fields}

![The thirty-one levels of the Field Atlas placed by size, from quantum foam at $10^{-35}\,\mathrm{m}$ to the cosmic web at $10^{26}\,\mathrm{m}$. Each step along the axis is a factor of ten.](figures/generated/ch01-banner.png){.opener}

A field assigns a value to every point of a region: a temperature to every point of a room, a velocity to every point of a river, a stress to every point inside a rock. Most of physics, and a good deal of biology, is written in this language because it handles two things at once: what is happening *here*, and how it affects what happens *next door*. This chapter builds the vocabulary used throughout the book (fields, waves, sources, media, boundaries and scale) with ordinary physics and real numbers. Only at the end does it introduce the way the [T]-Theory programme uses the same vocabulary, and the labels that say how far each of its claims has been established.

**Chapter outline.** [-@sec:fields-fields] Fields · [-@sec:fields-waves] Waves · [-@sec:fields-scale-size-response] Scale: size and response time · [-@sec:fields-zooming-out-when] Zooming out: when a field description works · [-@sec:fields-reading-atlas-claims] Reading the Atlas: claims and evidence labels

## Fields {#sec:fields-fields}

::: {.learning-objectives}
- distinguish scalar, vector and tensor fields and give a physical example of each;
- compute a field gradient from two measured values;
- explain why a field description needs a domain and boundary conditions.
:::

Classical mechanics often starts with a single particle: one position, one velocity, one mass. A field starts somewhere else. It says that a quantity has a value at *every* point of a domain, and that the interesting physics lies in how those values differ from point to point and change in time.

Fields come in three common kinds. A **scalar field** assigns one number to each point: air temperature $T(\mathbf{x})$ in kelvin, or the electric potential $V(\mathbf{x})$ in volts. A **vector field** assigns a magnitude and a direction: the wind velocity $\mathbf{v}(\mathbf{x})$ in metres per second, or the electric field $\mathbf{E}(\mathbf{x})$ in volts per metre. A **tensor field** assigns a whole array of numbers to each point; the stress tensor $\sigma_{ij}(\mathbf{x})$ inside a rock says how much force per unit area acts across every orientation of a small surface. Geologists need the full tensor, because a fault slips when the shear stress across one particular plane exceeds its strength.

The most useful single operation on a field is the **gradient**, the rate at which the value changes with position. For a scalar field it points uphill, and its size is the slope. Many physical laws say that something flows *down* a gradient: heat flows from hot to cold (Fourier's law, $\mathbf{q} = -k\nabla T$), particles diffuse from high concentration to low (Fick's law), and charge moves down the electric potential (Ohm's law).

::: {.example #ex:fields-heat-flow-across title="Heat flow across a still room"}
In a room without draughts, a thermometer reads $18\,^\circ\mathrm{C}$ near the floor and $24\,^\circ\mathrm{C}$ at the ceiling, $2.5\,\mathrm{m}$ higher. Estimate the vertical temperature gradient and the conductive heat flux through the air. The thermal conductivity of air is $k = 0.026\,\mathrm{W\,m^{-1}\,K^{-1}}$.

**Strategy.** Treat the temperature as varying linearly with height, so the gradient is the difference divided by the distance. Then apply Fourier's law.

**Solution.** The gradient is $\Delta T/\Delta z = (24 - 18)\,\mathrm{K}/2.5\,\mathrm{m} = 2.4\,\mathrm{K\,m^{-1}}$, pointing upwards. The heat flux is $q = k\,\Delta T/\Delta z = 0.026 \times 2.4 = 0.062\,\mathrm{W\,m^{-2}}$, flowing downwards.

**Significance.** The flux is tiny: a $20\,\mathrm{m^2}$ ceiling loses only about $1.2\,\mathrm{W}$ by conduction through still air. Real rooms lose far more heat by convection, because warm air moves. A field model is only as good as the processes it includes, a theme that recurs at every level of this book.
:::

::: {.check-your-learning}
A $1.0\,\mathrm{mm}$ thick cell membrane model has a potential of $-70\,\mathrm{mV}$ on one side and $0\,\mathrm{mV}$ on the other. What is the size of the electric field across it? (Answer: $70\,\mathrm{V\,m^{-1}}$. A real membrane is about $5\,\mathrm{nm}$ thick, which makes the field $1.4 \times 10^{7}\,\mathrm{V\,m^{-1}}$, strong enough to tear most materials apart.)
:::

A field is never defined "everywhere" in the abstract. It lives on a **domain** (the room, the membrane, the rock layer) and is constrained at the edges of that domain by **boundary conditions**: a wall held at a fixed temperature, a string clamped at both ends, a free surface that can move. Two systems obeying the same equation behave completely differently if their boundaries differ. This is the first of four questions the book asks at every level: *what is the domain, and what holds its edges?*

## Waves {#sec:fields-waves}

::: {.learning-objectives}
- relate wave speed, frequency and wavelength;
- explain why a wave's frequency is set by its source and its wavelength by its medium;
- find the standing-wave frequencies of a string fixed at both ends.
:::

A **wave** is a pattern in a field that travels, or oscillates, because each point is coupled to its neighbours. Pluck a string and the displacement at one point pulls on the next; push air and the pressure excess at one point pushes on the next. The simplest mathematical description is the one-dimensional wave equation,

$$\frac{\partial^2 u}{\partial t^2} = v^2\,\frac{\partial^2 u}{\partial x^2},$$

where $u(x,t)$ is the displacement or pressure and $v$ is the speed at which disturbances travel. A sinusoidal solution has a **frequency** $f$ (oscillations per second, in hertz), a **period** $T = 1/f$, and a **wavelength** $\lambda$ (the distance between crests). One wavelength passes a fixed point in one period, so

$$v = f\lambda.$$

This small relation hides an important division of labour. The **source** sets the frequency: a tuning fork vibrates at $440\,\mathrm{Hz}$ whatever it is immersed in. The **medium** sets the speed. The wavelength follows from both.

::: {.example #ex:fields-same-note-air title="The same note in air and in water"}
A source emits a $440\,\mathrm{Hz}$ tone (concert A). Find its wavelength in air, where sound travels at $343\,\mathrm{m\,s^{-1}}$, and in water, where it travels at $1480\,\mathrm{m\,s^{-1}}$.

**Solution.** In air, $\lambda = v/f = 343/440 = 0.780\,\mathrm{m}$. In water, $\lambda = 1480/440 = 3.36\,\mathrm{m}$.

**Significance.** The frequency, and therefore the pitch, is the same in both media; the wavelength is more than four times longer in water. The source decides *what* is sent, and the medium decides *how it spreads*. @ch:response turns this division into the general idea of a source and a response kernel.
:::

When a wave is confined between boundaries, only certain wavelengths fit. A string of length $L$ clamped at both ends must have a node at each end, so a whole number of half-wavelengths must fit: $L = n\lambda_n/2$. The allowed **standing-wave** frequencies, the string's **normal modes**, are therefore

$$f_n = \frac{n v}{2L}, \qquad n = 1, 2, 3, \dots$$

The lowest, $f_1$, is the **fundamental**; the others are **harmonics** at whole-number multiples of it.

::: {.example #ex:fields-guitar-string title="A guitar string"}
The open A string of a guitar has a vibrating length of $0.648\,\mathrm{m}$ and a fundamental of $110\,\mathrm{Hz}$. Find the wave speed on the string and the frequency of its third harmonic.

**Solution.** From $f_1 = v/2L$, $v = 2Lf_1 = 2 \times 0.648 \times 110 = 143\,\mathrm{m\,s^{-1}}$. The third harmonic is $f_3 = 3f_1 = 330\,\mathrm{Hz}$.

**Significance.** The boundary (the nut and the bridge) selects which frequencies the string can sustain. Pluck it anywhere and the sound is built only from $110$, $220$, $330\,\mathrm{Hz}$ and so on. The same logic gives the energy levels of an atom (@ch:atoms) and the free oscillations of the whole Earth (@ch:earth).
:::

::: {.check-your-learning}
A $1000\,\mathrm{Hz}$ whistle is sounded in helium, where sound travels at $1007\,\mathrm{m\,s^{-1}}$. What is the wavelength? (Answer: $1.01\,\mathrm{m}$, about three times its length in air. The pitch heard by a listener in the helium would be unchanged.)
:::

![Standing-wave modes on a string fixed at both ends. Only whole numbers of half-wavelengths fit between the boundaries.](../field-atlas/figures/theory/T1_3_string_modes.png){width="90%"}

## Scale: size and response time {#sec:fields-scale-size-response}

::: {.learning-objectives}
- work with powers of ten across the 61 orders of magnitude of the Atlas;
- compare a system's response time with the time light takes to cross it;
- explain why living and social systems respond far more slowly than their size alone suggests.
:::

The Field Atlas registers thirty-one levels, from quantum foam at about $10^{-35}\,\mathrm{m}$ to the cosmic web at about $10^{26}\,\mathrm{m}$. That span is 61 orders of magnitude, too large for any ordinary chart, so sizes are compared by their **logarithms**. On a logarithmic scale equal steps mean equal *ratios*: from an atom ($10^{-10}\,\mathrm{m}$) to a cell ($10^{-6}\,\mathrm{m}$) is four steps, a factor of $10^4$; from a cell to a person ($10^{0}\,\mathrm{m}$) is six more.

The logarithmic middle of the Atlas is a surprising place. The midpoint of $-35$ and $+26$ is $-4.5$, so the geometric centre of the ladder is $10^{-4.5}\,\mathrm{m} \approx 32\,\mu\mathrm{m}$, roughly the size of a large human cell. Measured by ratios, a cell is as far from the Planck length as it is from the edge of the observable universe.

Every level also has a characteristic **response time** $\tau$, the time it takes to react noticeably to a disturbance: about $10^{-16}\,\mathrm{s}$ for an atom's electron cloud, milliseconds for a synapse, seconds to minutes for a human body, millions of years for a mountain belt. A useful yardstick is the **light-crossing time** $L/c$, the time a signal moving at the speed of light ($c = 3.00\times10^{8}\,\mathrm{m\,s^{-1}}$) needs to cross a system of size $L$. No system can respond as a whole faster than that.

::: {.example #ex:fields-slow-person title="How slow is a person?"}
Compare the response time with the light-crossing time for an atom ($L = 10^{-10}\,\mathrm{m}$, $\tau \approx 10^{-16}\,\mathrm{s}$), a human body ($L \approx 1\,\mathrm{m}$, $\tau \approx 10\,\mathrm{s}$) and a galactic disc ($L \approx 10^{20}\,\mathrm{m}$, $\tau \approx 10^{16}\,\mathrm{s}$).

**Solution.** For the atom, $L/c = 10^{-10}/3.00\times10^{8} = 3.3\times10^{-19}\,\mathrm{s}$, so $\tau$ is about 300 times the light-crossing time. For the body, $L/c = 3.3\times10^{-9}\,\mathrm{s}$, so $\tau$ is about $3\times10^{9}$ times longer. For the galactic disc, $L/c = 3.3\times10^{11}\,\mathrm{s}$ (about $10\,000$ years), and $\tau$ is about $3\times10^{4}$ times longer.

**Significance.** The atom and the galaxy respond within a few orders of magnitude of the fastest possible time. The human body is billions of times slower than its size allows. Its response is limited not by how fast signals travel but by chemistry, diffusion, muscle and decision.
:::

![Size against response time for the thirty-one registry levels. The red line is the light-crossing time $L/c$. The smallest and largest levels lie near it; living, social and geological levels lie far above it, slowed by chemistry, diffusion, friction and choice.](figures/generated/ch01-scale-time.png){width="90%"}

The figure shows the pattern across the whole Atlas. Physics at the extremes is fast relative to size. In the middle, where life, minds and societies live, response is dominated by slow internal processes. That is why the middle levels need their own variables (membrane voltage, arousal, opinion, stress in a fault) rather than the variables of particle physics.

::: {.check-your-learning}
How long does light take to cross the Earth, diameter $1.27\times10^{7}\,\mathrm{m}$? (Answer: $0.042\,\mathrm{s}$. The Earth's slowest free oscillation has a period of about $54$ minutes, roughly $8\times10^{4}$ times longer.)
:::

## Zooming out: when a field description works {#sec:fields-zooming-out-when}

::: {.learning-objectives}
- explain coarse-graining and estimate when a continuum field description is valid;
- state the four questions the book asks at every level.
:::

Air is made of molecules, yet engineers describe it with smooth fields of pressure, density and velocity. The step from many particles to a smooth field is called **coarse-graining**: average over a small cell that still contains so many particles that the average barely fluctuates. If a cell holds $N$ independent particles, the relative fluctuation of its contents is about $1/\sqrt{N}$.

::: {.example #ex:fields-small-can-point title="How small can a 'point' of air be?"}
Air at atmospheric pressure ($p = 1.013\times10^{5}\,\mathrm{Pa}$) and room temperature ($T = 293\,\mathrm{K}$) has number density $n = p/k_B T$, with $k_B = 1.38\times10^{-23}\,\mathrm{J\,K^{-1}}$. How many molecules are in a cube $1\,\mu\mathrm{m}$ on a side, and in a cube $10\,\mathrm{nm}$ on a side? How large are the relative fluctuations?

**Solution.** $n = 1.013\times10^{5}/(1.38\times10^{-23}\times293) = 2.5\times10^{25}\,\mathrm{m^{-3}}$. A $1\,\mu\mathrm{m}$ cube has volume $10^{-18}\,\mathrm{m^3}$ and holds $2.5\times10^{7}$ molecules; $1/\sqrt{N} = 2\times10^{-4}$, a fluctuation of $0.02\,\%$. A $10\,\mathrm{nm}$ cube has volume $10^{-24}\,\mathrm{m^3}$ and holds about $25$ molecules; $1/\sqrt{N} = 0.2$, a fluctuation of $20\,\%$.

**Significance.** At the micrometre scale the "pressure at a point" is a sharp, meaningful number. At $10\,\mathrm{nm}$ it is not: the field description fails and individual molecules matter. Every level in the Atlas has such a lower limit below which its variables stop making sense.
:::

Coarse-graining is what this book means by **zooming out**. When the view moves up a level, some details are averaged away, some quantities survive unchanged (energy is still conserved), and new variables appear that did not exist below (pressure and temperature are not properties of a single molecule). The Atlas calls the move between levels the **zoom operator**, and at every level it asks the same four questions:

1. **Source:** what drives the system?
2. **Medium or kernel:** how does a disturbance spread and fade?
3. **Boundary:** what holds the edges of the domain?
4. **Observable:** what can be measured, and what result would show the description is wrong?

::: {.making-connections title="Making Connections — One grammar, three systems"}
The four questions apply unchanged to very different systems. A *guitar string*: the source is a pluck, the medium a tensioned string with $v = 143\,\mathrm{m\,s^{-1}}$, the boundaries the nut and bridge, the observable a $110\,\mathrm{Hz}$ fundamental. A *nerve-cell membrane*: the source is injected current, the medium a leaky capacitor with time constant $\tau = R_m C_m = (20\,\mathrm{k}\Omega\,\mathrm{cm^2})(1\,\mu\mathrm{F\,cm^{-2}}) = 20\,\mathrm{ms}$, the boundary the ends of the dendrite, the observable the voltage. The *whole Earth*: the source is a great earthquake, the medium elastic rock, the boundary the free surface, the observable a free oscillation with a period of about $54$ minutes. Sharing the questions does not make these systems the same; it makes them comparable.
:::

## Reading the Atlas: claims and evidence labels {#sec:fields-reading-atlas-claims}

::: {.learning-objectives}
- name the six evidence labels used in this book;
- assign a label to a given claim and explain what would change it.
:::

The [T]-Theory research programme proposes that the four-question grammar is not only a teaching device but a common mathematical structure: a response to a source through a kernel, read out at a boundary, recurring at every level from particles to societies and galaxies. Some parts of that proposal are proved theorems, some are numerical results, some are interpretations and some are open hypotheses. A careful reader must always be able to tell which is which. Every programme claim in this book therefore carries one of six **evidence labels**:

| Label | Meaning | Example |
|:--|:--|:--|
| `kernel-verified` | a named theorem checked by the Lean proof assistant without gaps | typed proofs in the programme's Lean appendix |
| `derived-under-assumptions` | follows mathematically from stated assumptions | $\Omega_{\mathrm{DM}} = 3/11$ from the dimensional bookkeeping (@ch:cosmology) |
| `simulated` | produced by a computation | QUANT-EXP-1: quantum annealing reaches a target basin in 3 of 3 barrier cases (@ch:human) |
| `empirical-result` | measured | normal-mode periods of the Earth (@ch:earth) |
| `interpretive` | a reading or mapping of ideas | treating an emotional state as a response field |
| `open-hypothesis` | proposed, with a stated route to a test | path-sensitive transition dynamics |

Labels describe the claim, not its importance. An `interpretive` reading can be illuminating, and a `derived-under-assumptions` number can still be wrong if an assumption fails. Where the programme agrees with standard physics, for example in reproducing ordinary gravity locally, the book says so plainly; where it adds something, it says what would count against it.

::: {.soma-machine}
Open the app at `#level=atomic&lens=off` and then `#level=atomic&lens=on`. The first view shows the ordinary physics of an atom; the second adds the programme's reading of the same level, with its label shown on screen. Switching the lens never changes the physics underneath, only what is drawn on top. Every chapter's box also names its stop in the book's guided tour, written in the app's tour language: `#tour=textbook` plays all ten stops in order, and `#tour=textbook&stop=1` opens this one. Other tours start the same way, for example `#tour=cell-to-cosmos` or `#tour=gravity`.
:::

::: {.check-your-learning}
Which label fits each claim? (a) "The Earth rings for weeks after a magnitude 9 earthquake." (b) "A simulation of eight coupled quantum modes reached the target state." (c) "A crowd's mood behaves like a field." (Answers: (a) `empirical-result`; (b) `simulated`; (c) `interpretive` until a model with measurable variables is specified and tested.)
:::

## Key Terms {.unnumbered}

::: {.key-terms}
boundary condition
: a constraint on a field at the edge of its domain, such as a fixed value or a free surface

coarse-graining
: averaging a system over cells large enough that the averages barely fluctuate, producing smooth field variables

evidence label
: one of six tags stating how far a claim has been established

field
: a quantity with a value at every point of a domain; scalar, vector or tensor

gradient
: the rate and direction of fastest increase of a scalar field

normal mode
: a standing-wave pattern allowed by a system's boundaries, with its own frequency

response time
: the characteristic time a system takes to react noticeably to a disturbance

wave
: a travelling or oscillating field pattern sustained by coupling between neighbouring points

zoom operator
: the move between levels of description, recording what is averaged away, what is kept and what is new
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Fourier's law of heat conduction
: $\mathbf{q} = -k\nabla T$

One-dimensional wave equation
: $\partial_t^2 u = v^2\,\partial_x^2 u$

Wave speed and period
: $v = f\lambda$, $\quad T = 1/f$

String fixed at both ends
: $f_n = n v/2L$

Light-crossing time
: $t_c = L/c$

Number density of an ideal gas
: $n = p/k_B T$

Relative fluctuation of $N$ particles
: $\delta N/N \approx 1/\sqrt{N}$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:fields-fields] Fields.** A field gives a value at every point of a domain. Gradients drive flows: heat, particles and charge move down them. Boundaries shape the solution as much as the equation does.

**[-@sec:fields-waves] Waves.** Waves are travelling or standing field patterns. The source sets the frequency, the medium sets the speed, and boundaries select the normal modes.

**[-@sec:fields-scale-size-response] Scale.** The Atlas spans 61 orders of magnitude in size. Levels at the extremes respond within a few orders of magnitude of their light-crossing time; living and social levels are billions of times slower, governed by internal processes.

**[-@sec:fields-zooming-out-when] Zooming out.** Coarse-graining turns many particles into smooth fields when cells hold enough particles. At every level the book asks four questions: source, medium or kernel, boundary, observable.

**[-@sec:fields-reading-atlas-claims] Evidence labels.** Each programme claim carries one of six labels, from `kernel-verified` to `open-hypothesis`.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Give one example each of a scalar, a vector and a tensor field, with units.
2. Why does a sound wave keep its frequency but change its wavelength when it passes from air into water?
3. What do the boundaries of a guitar string decide, and what do they leave to the player?
4. Why can no system respond as a whole faster than its light-crossing time?
5. Explain, using $1/\sqrt{N}$, why a field description of air breaks down at nanometre scales.
6. A claim is `derived-under-assumptions`. What would you need to check before relying on it?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:fields-higher-note title="A higher note"}
A $1000\,\mathrm{Hz}$ tone travels in air at $343\,\mathrm{m\,s^{-1}}$. Find its wavelength.
:::

::: {.solution}
**Solution.** $\lambda = v/f = 343/1000 = 0.343\,\mathrm{m}$.

**Significance.** Higher pitch means shorter wavelength in the same medium. *Baseline:* the wave equation and its solutions are in Penrose, chapter 19 [@penrose2004road].
:::

::: {.problems #pr:fields-high-e-string title="The high E string"}
The high E string of a guitar is $0.648\,\mathrm{m}$ long with a fundamental of $329.6\,\mathrm{Hz}$. Find the wave speed on the string.
:::

::: {.solution}
**Strategy.** Use $f_1 = v/2L$, as in @ex:fields-guitar-string.

**Solution.** $v = 2Lf_1 = 2\times0.648\times329.6 = 427\,\mathrm{m\,s^{-1}}$.

**Significance.** The same length as the A string but three times the frequency: the thinner, tighter E string carries waves three times faster.
:::

::: {.problems #pr:fields-counting-powers-ten title="Counting powers of ten"}
How many orders of magnitude separate a cell ($10^{-6}\,\mathrm{m}$) from a person ($10^{0}\,\mathrm{m}$), and a person from the Earth ($1.27\times10^{7}\,\mathrm{m}$)?
:::

::: {.solution}
**Solution.** Cell to person: $0 - (-6) = 6$ orders. Person to Earth: $\log_{10}(1.27\times10^{7}) = 7.1$, about seven orders.

**Significance.** The person sits roughly halfway, in powers of ten, between a cell and a planet. **Try it:** `#level=cellular-synaptic` then `#level=human-vertebrate` then `#level=planetary`.
:::

::: {.problems #pr:fields-where-does-continuum title="Where does the continuum end?"}
How many air molecules are in a cube $100\,\mathrm{nm}$ on a side at room conditions ($n = 2.5\times10^{25}\,\mathrm{m^{-3}}$), and what is the relative fluctuation?
:::

::: {.solution}
**Solution.** $V = (10^{-7}\,\mathrm{m})^3 = 10^{-21}\,\mathrm{m^3}$, so $N = 2.5\times10^{4}$ and $1/\sqrt{N} = 0.0063$, a fluctuation of $0.63\,\%$.

**Significance.** Between @ex:fields-small-can-point's $1\,\mu\mathrm{m}$ ($0.02\,\%$) and $10\,\mathrm{nm}$ ($20\,\%$) lies the scale where "pressure at a point" stops being a sharp number.
:::

::: {.problems #pr:fields-faster-membrane title="A faster membrane"}
A neuron membrane has $R_m = 10\,\mathrm{k}\Omega\,\mathrm{cm^2}$ and $C_m = 1\,\mu\mathrm{F\,cm^{-2}}$. Find its time constant.
:::

::: {.solution}
**Solution.** $\tau = R_mC_m = (10^{4}\,\Omega\,\mathrm{cm^2})(10^{-6}\,\mathrm{F\,cm^{-2}}) = 10^{-2}\,\mathrm{s} = 10\,\mathrm{ms}$.

**Significance.** The area units cancel: the time constant is a property of the membrane material, not of the cell's size. @ch:cells builds the cable equation on it. **Try it:** `#level=cellular-synaptic&lens=on`.
:::

::: {.problems #pr:fields-slow-sun title="How slow is the Sun?"}
The Sun is $1.39\times10^{9}\,\mathrm{m}$ across. Find its light-crossing time and compare it with the five-minute oscillations seen at its surface.
:::

::: {.solution}
**Solution.** $t_c = 1.39\times10^{9}/3.00\times10^{8} = 4.6\,\mathrm{s}$. Five minutes is $300\,\mathrm{s}$, about $65$ times longer.

**Significance.** Like the atom and the galaxy in @ex:fields-slow-person, the Sun responds within two orders of magnitude of its light-crossing time: its oscillations are sound waves crossing hot plasma. **Try it:** `#level=stellar`.
:::