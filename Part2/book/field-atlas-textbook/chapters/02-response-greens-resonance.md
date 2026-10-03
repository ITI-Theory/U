# Response: Kicks, Ringing and Resonance {#ch-response}

![A system's whole character in three panels: a short kick, the ringing it leaves behind, and the resonance curve that follows when the same system is driven steadily.](figures/generated/ch02-banner.png){.opener}

Strike a bell, tap a wine glass, kick a swing, inject a pulse of current into a nerve cell: each system answers in its own way, and the answer is the most informative thing it can tell you about itself. This chapter introduces the single most useful idea in the book, the **response function** or **Green's function**. It is the system's reply to one sharp kick, and once it is known the reply to *any* input follows by adding up kicks. The idea is pure physics and mathematics. At the end of the chapter it becomes the backbone of the [T]-Theory reading of every level.

**Chapter outline.** 2.1 The damped oscillator · 2.2 The impulse response · 2.3 Adding up kicks: convolution · 2.4 Resonance and the quality factor · 2.5 Response in space: how far a disturbance reaches · 2.6 One grammar across the levels

## The damped oscillator {#sec-2-1}

::: {.learning-objectives}
- write the equation of motion of a mass on a spring with friction;
- compute the natural frequency, damping rate, damping ratio and quality factor;
- recognise underdamped, critically damped and overdamped behaviour.
:::

A mass $m$ on a spring of stiffness $k$, slowed by friction proportional to its speed with coefficient $b$, obeys Newton's second law:

$$m\ddot{x} + b\dot{x} + kx = F(t).$$

The left side is the system; the right side is the **source**, an external force $F(t)$. Dividing by $m$ gives the standard form

$$\ddot{x} + 2\gamma\dot{x} + \omega_0^2 x = F(t)/m,$$

with **natural angular frequency** $\omega_0 = \sqrt{k/m}$ and **damping rate** $\gamma = b/2m$. Their ratio, the **damping ratio** $\zeta = \gamma/\omega_0$, decides the character of the motion. If $\zeta < 1$ the system is **underdamped**: released from a stretch, it rings at the slightly lower frequency $\omega_d = \sqrt{\omega_0^2 - \gamma^2}$ while the swings shrink as $e^{-\gamma t}$. If $\zeta = 1$ it is **critically damped** and returns as fast as possible without overshooting; car suspensions and door closers are tuned close to this. If $\zeta > 1$ it is **overdamped** and creeps back slowly.

A single number summarises how long a system rings: the **quality factor** $Q = 1/2\zeta = \omega_0/2\gamma$. Roughly, $Q$ counts how many radians of oscillation pass while the energy falls by a factor $e$; a bell or a tuning fork has $Q$ in the thousands, a car on its springs less than one.

::: {.example title="Example 2.1 — A mass on a spring"}
A $0.50\,\mathrm{kg}$ mass hangs on a spring with $k = 200\,\mathrm{N\,m^{-1}}$ and friction coefficient $b = 2.0\,\mathrm{kg\,s^{-1}}$. Find $\omega_0$, $f_0$, $\gamma$, $\zeta$, $Q$ and the time for the amplitude to fall by a factor $e$.

**Strategy.** Substitute into the definitions above.

**Solution.** $\omega_0 = \sqrt{200/0.50} = 20.0\,\mathrm{rad\,s^{-1}}$, so $f_0 = \omega_0/2\pi = 3.18\,\mathrm{Hz}$. $\gamma = 2.0/(2\times0.50) = 2.0\,\mathrm{s^{-1}}$, so $\zeta = 2.0/20.0 = 0.10$ and $Q = 5.0$. The amplitude falls by $e$ in $1/\gamma = 0.50\,\mathrm{s}$, during which the mass completes about $1.6$ oscillations.

**Significance.** With $\zeta = 0.10$ the system is clearly underdamped: it rings visibly, as in the opening figure. The ringing frequency $\omega_d = \sqrt{20^2 - 2^2} = 19.9\,\mathrm{rad\,s^{-1}}$ is almost exactly $\omega_0$; light damping barely changes the pitch.
:::

::: {.check-your-learning}
The friction in Example 2.1 is increased until $\zeta = 1$. What is the new value of $b$? (Answer: $b = 2m\omega_0 = 20\,\mathrm{kg\,s^{-1}}$, ten times the original.)
:::

## The impulse response {#sec-2-2}

::: {.learning-objectives}
- define an impulse and the impulse response $G(t)$;
- explain why $G(t) = 0$ before the kick (causality);
- compute the motion that follows a measured kick.
:::

Suppose the force is a very short, hard kick: a hammer blow lasting a millisecond. What matters is not the force at each instant but its total effect, the **impulse** $J = \int F\,dt$, which changes the momentum by $J$. An idealised kick of unit impulse at time $t = 0$ is written with the **Dirac delta** as $F(t) = \delta(t)$: zero everywhere except at $t = 0$, with total area one.

The motion that follows a unit kick, starting from rest, is the system's **impulse response** or **Green's function** $G(t)$. For the underdamped oscillator,

$$G(t) = \frac{1}{m\omega_d}\,e^{-\gamma t}\sin(\omega_d t)\quad (t \ge 0), \qquad G(t) = 0 \quad (t < 0).$$

Two features are worth stating carefully. First, $G(t) = 0$ before the kick: the system cannot respond to a cause that has not happened yet. A response function with this property is called **retarded** or **causal**, and every physical response in this book is of this kind. Second, $G$ contains everything about the system: its natural frequency, its damping, and its mass all appear in it. Measuring the response to one sharp kick is how engineers test bridges, how seismologists probe the Earth and how neuroscientists characterise a synapse.

::: {.example title="Example 2.2 — Kicking the spring"}
The resting mass of Example 2.1 is struck with an impulse $J = 0.10\,\mathrm{N\,s}$. Find its initial speed, the amplitude of the ringing, and the largest displacement it reaches.

**Strategy.** The impulse sets the initial velocity $v_0 = J/m$. The motion is then $x(t) = J\,G(t)$.

**Solution.** $v_0 = 0.10/0.50 = 0.20\,\mathrm{m\,s^{-1}}$. The ringing amplitude is $v_0/\omega_d = 0.20/19.9 = 0.010\,\mathrm{m}$, about $1.0\,\mathrm{cm}$. The first maximum comes at $t^\ast = \arctan(\omega_d/\gamma)/\omega_d = 0.074\,\mathrm{s}$, where $x = 0.010\,e^{-2.0\times0.074}\sin(19.9\times0.074) = 0.0086\,\mathrm{m}$.

**Significance.** The peak is a little below the nominal amplitude because damping has already removed some energy by the time of the first swing. The heavier the damping, the larger this shortfall.
:::

::: {.check-your-learning}
If the kick in Example 2.2 is doubled, what happens to $G(t)$ and to the motion? (Answer: $G(t)$ is unchanged, as it belongs to the system; the motion doubles, because $x = J\,G(t)$ for a linear system.)
:::

## Adding up kicks: convolution {#sec-2-3}

::: {.learning-objectives}
- build the response to any input from the impulse response;
- use superposition to predict the effect of two kicks;
- explain the meaning of the convolution integral.
:::

The real power of $G$ comes from **linearity**. For a linear system, the response to two inputs is the sum of the responses to each. Any force history $F(t)$ can be cut into a rapid sequence of small kicks, each of impulse $F(t')\,dt'$ at time $t'$. Each produces its own copy of the Green's function, delayed to start at $t'$. Adding them all up gives the **convolution integral**

$$x(t) = \int_{-\infty}^{t} G(t - t')\,F(t')\,dt'.$$

The upper limit $t$ is causality again: only kicks that have already happened contribute. Read aloud, the formula says: *the present state is the sum of all past inputs, each weighted by how much of its effect survives after the time that has elapsed since.* That sentence is the heart of the book. It describes a bell, a cell membrane, the Earth after an earthquake and, in the [T]-Theory reading, the lingering of an emotional state (Chapter 5).

![The convolution idea: an input history is cut into kicks, each produces a delayed copy of the impulse response, and the copies add up to the total response.](../field-atlas/figures/theory/T2_8_convolution.png){width="100%"}

::: {.example title="Example 2.3 — Pushing a swing at the wrong moment"}
The oscillator of Example 2.1 receives a kick of $0.10\,\mathrm{N\,s}$, then an identical kick, in the same direction, exactly half a ringing period later. Then repeat with the second kick one full period later. By what factor does the ringing amplitude change in each case?

**Strategy.** The ringing period is $T_d = 2\pi/\omega_d = 0.316\,\mathrm{s}$. Half a period later the mass is moving the other way, so a same-direction kick opposes it; one period later it is moving the same way. Use superposition, remembering that the first ringing has decayed by $e^{-\gamma\Delta t}$.

**Solution.** At $\Delta t = T_d/2 = 0.158\,\mathrm{s}$, the first ringing has amplitude factor $e^{-2.0\times0.158} = 0.73$ and the second kick's ringing is exactly out of phase with it, so the net amplitude factor is $1 - 0.73 = 0.27$: the second push removes most of the motion. At $\Delta t = T_d$, the first ringing has factor $e^{-2.0\times0.316} = 0.53$ and is in phase, so the total is $1 + 0.53 = 1.53$.

**Significance.** Every child on a swing knows this: push in time with the motion and it grows; push against it and it stops. The same two kicks give a large or small effect depending only on *timing*. Timing effects of exactly this kind appear in the synchronisation of neurons and people (Chapter 6).
:::

## Resonance and the quality factor {#sec-2-4}

::: {.learning-objectives}
- describe the steady response to a sinusoidal drive;
- relate the height and width of a resonance peak to $Q$;
- estimate the ringing time of a real system from its $Q$.
:::

Drive the oscillator steadily with $F(t) = F_0\cos\omega t$. After the start-up ringing dies away, the mass moves at the *drive* frequency $\omega$ with amplitude

$$A(\omega) = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega^2)^2 + (2\gamma\omega)^2}}.$$

Far below $\omega_0$ the mass simply follows the force through the spring; far above, it barely moves. Near $\omega_0$ the response is largest: **resonance**. At $\omega = \omega_0$ the amplitude is $Q$ times the static displacement $F_0/k$, and the peak has a width of about $\Delta\omega \approx \omega_0/Q$. A high-$Q$ system rings for a long time after a kick *and* responds strongly only in a narrow band of frequencies. These are the same fact seen two ways, because the resonance curve is the Fourier transform of the impulse response.

::: {.example title="Example 2.4 — How long does the Earth ring?"}
After the magnitude 9.1 Sumatra–Andaman earthquake of 2004, seismometers worldwide recorded the Earth's slowest free oscillation, the mode called ${}_0S_2$, with a period of $53.9$ minutes and a quality factor of about $Q \approx 500$ [@park2005earth; @dahlen1998theoretical]. How long does the amplitude take to fall by a factor $e$, and what fraction remains after three weeks?

**Strategy.** From $Q = \omega_0/2\gamma$, the decay time is $1/\gamma = 2Q/\omega_0$.

**Solution.** $\omega_0 = 2\pi/(53.9\times60\,\mathrm{s}) = 1.94\times10^{-3}\,\mathrm{rad\,s^{-1}}$. Then $1/\gamma = 2\times500/1.94\times10^{-3} = 5.1\times10^{5}\,\mathrm{s}$, about $6.0$ days. After three weeks ($21$ days) the fraction remaining is $e^{-21/6.0} \approx 0.03$.

**Significance.** The planet rings audibly to instruments for weeks after a great earthquake, and the slowly fading tones measure the elasticity and density of the mantle and core. A seismometer is a stethoscope for the Earth.
:::

::: {.check-your-learning}
The gravitational waves from the black-hole merger GW150914 ended with a "ringdown" at about $250\,\mathrm{Hz}$ with decay time $\tau \approx 4\,\mathrm{ms}$ [@abbott2016gw]. Estimate its $Q = \pi f \tau$. (Answer: $Q \approx 3$: a black hole is a very poor bell, ringing for only about one cycle.)
:::

## Response in space: how far a disturbance reaches {#sec-2-5}

::: {.learning-objectives}
- write the static response of a field to a point source;
- distinguish long-range ($1/r$) from short-range (Yukawa) responses;
- compute a range from a carrier mass.
:::

Response functions also exist in space. Put a point charge at the origin: the electric potential it produces at distance $r$ is the spatial Green's function of the electrostatic field, the **Coulomb** response $G_C(r) = 1/4\pi r$ (in units where the charge and the permittivity are absorbed). It falls off slowly and never cuts off: electromagnetism has infinite range.

If the field's carrier particle has a mass $m$, the response acquires an exponential cut-off. Yukawa proposed in 1935 that the strong force between protons and neutrons is carried by such a particle [@yukawa1935], giving the **Yukawa** response

$$G_Y(r) = \frac{e^{-r/\lambda}}{4\pi r}, \qquad \lambda = \frac{\hbar}{mc},$$

where $\lambda$ is the **range**. Within a distance $\lambda$ the force behaves like $1/r$; beyond it, it vanishes exponentially. The heavier the carrier, the shorter the range.

::: {.example title="Example 2.5 — The range of the nuclear force"}
The carrier of the long-range part of the nuclear force is the pion, with $mc^2 = 139.6\,\mathrm{MeV}$. Using $\hbar c = 197.3\,\mathrm{MeV\,fm}$, find the range and how strongly the Yukawa response is suppressed relative to Coulomb at $0.5$, $1.4$ and $3.0\,\mathrm{fm}$.

**Solution.** $\lambda = \hbar c/mc^2 = 197.3/139.6 = 1.41\,\mathrm{fm}$. The suppression factor is $e^{-r/\lambda}$: $0.70$ at $0.5\,\mathrm{fm}$, $0.37$ at $1.41\,\mathrm{fm}$ and $0.12$ at $3.0\,\mathrm{fm}$.

**Significance.** The nuclear force is overwhelming inside a nucleus, a few femtometres across, and irrelevant just outside it. One parameter, the carrier mass, sets the size of every atomic nucleus.
:::

![The Yukawa response (finite range) and the Coulomb response (infinite range) on the same axes. The ratio of the two is $e^{-r/\lambda}$.](../field-atlas/figures/theory/T2_7_yukawa_coulomb.png){width="100%"}

## One grammar across the levels {#sec-2-6}

::: {.learning-objectives}
- state the source–kernel–boundary–observable grammar;
- identify which parts of the programme's response claims are standard physics and which are readings;
- label a cross-level comparison correctly.
:::

Everything in this chapter is standard physics, found in any textbook of mechanics or mathematical methods; Penrose's survey treats Fourier analysis, Green's functions and their causal structure in chapters 9 and 21–26 [@penrose2004road]. The programme behind this Atlas builds on one observation about it: the same mathematical object, a causal response kernel convolved with a source and read out at a boundary, appears at every one of the thirty-one levels.

| Level | Source | Kernel (response) | Observable |
|:--|:--|:--|:--|
| Nuclear | nucleon | Yukawa $e^{-r/\lambda}/4\pi r$ | scattering cross-section |
| Atomic | nucleus | Coulomb $1/4\pi r$ | spectral lines |
| Cellular | injected current | cable kernel, $\lambda \approx 1\,\mathrm{mm}$ | membrane voltage |
| Human | sensory event | damped, memory-weighted kernel | heart rate, report, behaviour |
| Planetary | earthquake | normal modes, $Q \approx 500$ | seismograms |
| Compact object | black-hole merger | ringdown, $Q \approx 3$ | gravitational waves |

The first two rows and the last two are `empirical-result`: measured and textbook-standard. The cellular row is standard neuroscience (Chapter 4). The human row is where the programme makes its proposal: that an emotional response can be modelled with the same convolution structure, so that a present state carries a weighted memory of past events [@P1; @P10]. That reading is `derived-under-assumptions` as mathematics and `open-hypothesis` as a claim about people: the assumptions are explicit, and the test is whether a memory-weighted kernel predicts measured physiology and behaviour better than a model without memory. The reading does not claim that a feeling *is* a nucleus or a black hole; it claims that the same response grammar is a productive way to model all of them.

::: {.making-connections title="Making Connections — The same push, different systems"}
Example 2.3 showed that two identical kicks can add up or cancel depending on timing. The same arithmetic governs whether two neurons fire together (Chapter 4), whether two people fall into step (Chapter 6), and whether a population of fireflies flashes in unison. In each case the useful question is the one asked here: what does one kick do, how long does its effect last, and when does the next one arrive?
:::

::: {.soma-machine}
Open `#level=human-vertebrate&lens=on&dim=4` and press **Poke field** once: at 4D the body model rings and returns to rest, like Example 2.2. Switch to `dim=8` and poke twice: the second response is different, because the model now carries a memory kernel, the convolution of Section 2.3 with a long tail. Chapter 5 explains that model and what it does and does not establish.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
causal (retarded) response
: a response that is zero before its cause

convolution
: the sum of delayed impulse responses that builds the response to any input

damping ratio $\zeta$
: $\gamma/\omega_0$; below 1 the system rings, above 1 it creeps back

Green's function (impulse response)
: a system's response to a unit kick, from which all linear responses follow

quality factor $Q$
: $\omega_0/2\gamma$; how many cycles a system rings and how sharp its resonance is

range $\lambda$
: the distance over which a short-range (Yukawa) response acts, $\hbar/mc$

resonance
: the large response of an oscillator driven near its natural frequency
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Damped, driven oscillator
: $\ddot{x} + 2\gamma\dot{x} + \omega_0^2 x = F(t)/m$, $\quad \omega_0 = \sqrt{k/m}$, $\ \gamma = b/2m$

Damping ratio and quality factor
: $\zeta = \gamma/\omega_0$, $\quad Q = 1/2\zeta = \omega_0/2\gamma$

Impulse response (underdamped)
: $G(t) = \dfrac{e^{-\gamma t}\sin\omega_d t}{m\omega_d}$ for $t \ge 0$, $\quad \omega_d = \sqrt{\omega_0^2 - \gamma^2}$

Convolution
: $x(t) = \int_{-\infty}^{t} G(t-t')F(t')\,dt'$

Steady driven amplitude
: $A(\omega) = \dfrac{F_0/m}{\sqrt{(\omega_0^2-\omega^2)^2 + (2\gamma\omega)^2}}$

Yukawa response and range
: $G_Y(r) = e^{-r/\lambda}/4\pi r$, $\quad \lambda = \hbar/mc$
:::

## Summary {.unnumbered}

::: {.summary}
**2.1** A damped oscillator is characterised by $\omega_0$, $\gamma$ and the ratio $\zeta$; $Q = 1/2\zeta$ measures how long it rings.

**2.2** The impulse response $G(t)$ is the reply to one unit kick. It is zero before the kick and contains everything about a linear system.

**2.3** Any input is a sum of kicks, so any response is a convolution of the input with $G$. Timing decides whether kicks reinforce or cancel.

**2.4** Driven steadily, an oscillator resonates near $\omega_0$ with a peak $Q$ times the static response and width $\omega_0/Q$. The Earth's ${}_0S_2$ mode rings for days; a black hole for one cycle.

**2.5** Spatial responses can be long-range (Coulomb, $1/r$) or short-range (Yukawa, $e^{-r/\lambda}/r$); a massive carrier sets a finite range.

**2.6** The same causal-kernel grammar appears at every level. Its use for emotional response is the programme's labelled proposal.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. What single measurement characterises a linear system completely, and why?
2. Why must a physical response function vanish before its cause?
3. Explain in words what the convolution integral adds up.
4. A system rings for a long time after a kick. What does that imply about the width of its resonance?
5. Why does a massive force carrier give a force with a finite range?
6. In the table of Section 2.6, which rows are measured physics and which is a proposal? What evidence would turn the proposal into a result?
:::

## Worked Homework {.unnumbered}

::: {.problems title="Problem 2.1 — A heavier mass"}
The mass in Example 2.1 is doubled to $1.0\,\mathrm{kg}$, with the same spring and friction. Find $\omega_0$, $\zeta$ and $Q$.
:::

::: {.example title="Solution 2.1"}
**Strategy.** $\omega_0 = \sqrt{k/m}$ and $\gamma = b/2m$ both change with $m$.

**Solution.** $\omega_0 = \sqrt{200/1.0} = 14.1\,\mathrm{rad\,s^{-1}}$; $\gamma = 2.0/2.0 = 1.0\,\mathrm{s^{-1}}$; $\zeta = 1.0/14.1 = 0.071$; $Q = 7.1$.

**Significance.** The heavier mass rings at a lower pitch but for more cycles. *Baseline:* the Lagrangian derivation of the oscillator is in Penrose, chapter 20 [@penrose2004road].
:::

::: {.problems title="Problem 2.2 — The tuning fork"}
A $440\,\mathrm{Hz}$ tuning fork has $Q = 1000$. How long does its amplitude take to fall by a factor $e$, and how many cycles is that?
:::

::: {.example title="Solution 2.2"}
**Solution.** $\omega_0 = 2\pi\times440 = 2765\,\mathrm{rad\,s^{-1}}$; $1/\gamma = 2Q/\omega_0 = 2000/2765 = 0.72\,\mathrm{s}$, which is $440\times0.72 = 318$ cycles.

**Significance.** $Q$ counts cycles of ringing (divided by $\pi$): $318\pi \approx 1000$.
:::

::: {.problems title="Problem 2.3 — Black-hole ringdown"}
For GW150914 the ringdown had $f \approx 250\,\mathrm{Hz}$ and $\tau \approx 4\,\mathrm{ms}$. Find $Q$ and the number of cycles in one decay time.
:::

::: {.example title="Solution 2.3"}
**Solution.** $Q = \pi f\tau = \pi\times250\times0.004 = 3.1$; cycles in $\tau$: $f\tau = 1.0$.

**Significance.** The event is in the app's question tour *What happens when black holes merge?* **Try it:** `#q=black-hole-ringdown`. *Baseline:* Penrose, chapter 19 (Einstein's field equation) [@penrose2004road].
:::

::: {.problems title="Problem 2.4 — The range of a heavier carrier"}
The weak force is carried by the W boson, $mc^2 = 80.4\,\mathrm{GeV}$. Find its range, using $\hbar c = 197.3\,\mathrm{MeV\,fm}$.
:::

::: {.example title="Solution 2.4"}
**Solution.** $\lambda = 197.3\,\mathrm{MeV\,fm}/80\,400\,\mathrm{MeV} = 2.45\times10^{-3}\,\mathrm{fm} = 2.5\times10^{-18}\,\mathrm{m}$.

**Significance.** The weak force reaches about a thousandth of the size of a proton, which is why it is "weak" at everyday distances even though its intrinsic coupling is not small. *Baseline:* Penrose, chapter 25 [@penrose2004road].
:::

::: {.problems title="Problem 2.5 — Two kicks, a quarter period apart"}
For the oscillator of Example 2.1, a second identical kick follows the first after a quarter period, $T_d/4 = 0.079\,\mathrm{s}$. By what factor does the ringing amplitude change?
:::

::: {.example title="Solution 2.5"}
**Strategy.** A quarter period later the two ringings are $90^\circ$ apart in phase, so their amplitudes add like perpendicular vectors.

**Solution.** The first ringing has decayed to $e^{-\gamma\Delta t} = e^{-2.0\times0.079} = 0.85$. The combined amplitude is $\sqrt{1^2 + 0.85^2} = 1.32$ times that of one kick.

**Significance.** Between cancellation (half a period, factor $0.27$) and reinforcement (a full period, $1.53$), every timing gives an intermediate result. Phase is a continuous dial.
:::