# The Human Level: Landscapes, Noise and Memory {#ch:human}

![A ball in a landscape with two valleys, pushed about by random noise. Right: the same landscape simulated at two noise levels. With more noise (red) the ball hops between the valleys every eighty time units or so; with a little less (blue) it stays in its first valley for the whole run. Escape depends exponentially on the ratio of the barrier to the noise.](figures/generated/ch05-banner.png){.opener}

A person is not a ball rolling in a landscape. A person has a body of thirty trillion cells, a history, a language and other people. Yet some of the most useful models in physiology and psychology reduce a state to a few numbers and ask how those numbers move: how fast a racing heart settles after a fright, why some moods are hard to leave, why a small upset sometimes tips a person into a state that takes weeks to lift. This chapter builds the mathematics of such reductions from physics already in the book: damping from @ch:response, thermal energy from @ch:cells, thresholds and landscapes from @ch:cells's Hopfield network. Then it states, claim by claim, what the programme behind this Atlas proposes at the human level and how each claim is labelled.

**Chapter outline.** [-@sec:human-state-landscape] A state in a landscape · [-@sec:human-noise-escape] Noise and escape · [-@sec:human-fast-slow-out] Fast in, slow out · [-@sec:human-memory-kernels] Memory kernels · [-@sec:human-tipping-points-critical] Tipping points and critical slowing down · [-@sec:human-programmes-human-model] The programme's human model and QUANT-EXP-1

## A state in a landscape {#sec:human-state-landscape}

::: {.learning-objectives}
- write the equation of an overdamped state moving in a landscape;
- relate the curvature of a valley to its relaxation time;
- describe what is gained and lost by such a reduction.
:::

@ch:response's oscillator had inertia: given a kick, it overshoots and rings. Many biological variables do not. A heart rate pushed up by a fright does not swing below its resting value and back several times; it settles smoothly. Such a system is **overdamped**, and its motion is governed by friction and force alone:

$$\gamma\dot{x} = -U'(x) + F(t),$$

where $x$ is the state, $U(x)$ is a **landscape** whose downhill slope is the restoring force, $\gamma$ is a friction coefficient, and $F(t)$ is any outside push. The state slides downhill and stops at the bottom of a valley. Near a valley floor the landscape is a parabola, $U \approx \tfrac12kx^2$, where $k = U''$ is the **curvature**. The equation becomes $\gamma\dot{x} = -kx$, so a displacement dies away as $e^{-t/\tau}$ with **relaxation time**

$$\tau = \frac{\gamma}{k}.$$

A steep valley returns the state quickly; a shallow one slowly. A landscape with two valleys, the simplest being $U(x) = \Delta U\,(x^2 - 1)^2$, has two resting states, $x = \pm1$, separated by a ridge of height $\Delta U$ at $x = 0$. The opening figure shows it. A system described this way is **bistable**: the same rules support two different stable states, and history decides which one it is in.

What the reduction gains is calculation: a handful of measurable numbers (curvature, barrier, noise) predicts how a state responds and how long it stays. What it loses is everything else, and that loss must be stated whenever the model is applied to a person. A coordinate $x$ might be a measured heart rate, a self-rated mood score or a combination of several signals; the model is only as good as the measurement behind $x$.

::: {.example #ex:human-fast-does-valley title="How fast does a valley return?"}
For the landscape $U = \Delta U\,(x^2 - 1)^2$ with $\Delta U = 1$ and $\gamma = 1$ (in model units), find the curvature at the valley floors and the relaxation time. How does the relaxation time change if the barrier is halved?

**Strategy.** Differentiate twice and evaluate at $x = \pm1$; then $\tau = \gamma/k$.

**Solution.** $U' = 4\Delta U\,x(x^2 - 1)$ and $U'' = 4\Delta U\,(3x^2 - 1)$, so at $x = \pm1$, $k = 8\Delta U = 8$ and $\tau = 1/8 = 0.125$. Halving the barrier halves the curvature, so $\tau$ doubles to $0.25$.

**Significance.** In this family of landscapes, a lower ridge also means shallower valleys. The same change that makes a state easier to leave makes it slower to recover from a small push, a link that @sec:human-tipping-points-critical turns into a warning signal.
:::

::: {.check-your-learning}
What is the curvature at the top of the ridge, $x = 0$, and what does its sign mean? (Answer: $U''(0) = -4\Delta U$; negative curvature means a balanced state there is unstable, and the smallest push sends it into one of the valleys.)
:::

## Noise and escape {#sec:human-noise-escape}

::: {.learning-objectives}
- add random noise to an overdamped equation;
- state the Boltzmann distribution and the Kramers escape time;
- compute how escape times change with barrier height and noise.
:::

No real system is perfectly quiet. Molecules jostle, cells fire at random, a day brings a hundred small events. The simplest model adds a random force to the equation of motion,

$$\gamma\dot{x} = -U'(x) + \sqrt{2\gamma D}\,\eta(t),$$

where $\eta(t)$ is **white noise**, a random push uncorrelated from one instant to the next, and $D$ measures its strength in units of energy. This is a **Langevin equation**, the same one that describes a pollen grain jiggled by water molecules, for which $D = k_BT$. After a long time the state is found at $x$ with probability proportional to

$$p(x) \propto e^{-U(x)/D},$$

the **Boltzmann distribution** of @ch:cells with $D$ in place of $k_BT$. Deep valleys are occupied, ridges are rarely visited. But rarely is not never: sooner or later a run of pushes in the same direction carries the state over the ridge. In 1940 Kramers worked out how long that takes. For an overdamped system the mean time to escape from valley A over a ridge of height $\Delta U$ is

$$\langle t\rangle = \frac{2\pi\gamma}{\sqrt{k_A\,|k_\text{top}|}}\;e^{\Delta U/D},$$

where $k_A$ and $k_\text{top}$ are the curvatures at the valley floor and at the top of the ridge. The prefactor sets the time scale; the exponential does nearly all the work. The same law, with $D = k_BT$, governs the rates of chemical reactions, where it is known as the Arrhenius law and has been tested on millions of reactions.

::: {.example #ex:human-small-change-noise title="A small change in noise"}
For the landscape of @ex:human-fast-does-valley ($\Delta U = 1$, $\gamma = 1$), compute the Kramers escape time at noise $D = 0.25$ and at $D = 0.10$, the two runs in the opening figure.

**Strategy.** $k_A = 8$ and $|k_\text{top}| = 4$, so the prefactor is $2\pi/\sqrt{32} = 1.11$. Multiply by $e^{\Delta U/D}$.

**Solution.** At $D = 0.25$: $1.11\times e^{4} = 1.11\times54.6 = 61$. At $D = 0.10$: $1.11\times e^{10} = 1.11\times22\,000 = 24\,000$.

**Significance.** Reducing the noise by a factor of $2.5$ lengthens the wait four hundred times ($e^6 = 403$). That is why the blue run in the opening figure never escapes during 400 time units: the expected wait is sixty times longer than the whole run.
:::

::: {.check-your-learning}
If the barrier doubles while the noise stays the same, what happens to the exponential factor? (Answer: $e^{2\Delta U/D} = \big(e^{\Delta U/D}\big)^2$; it is squared, so a factor of 55 becomes 3000.)
:::

## Fast in, slow out {#sec:human-fast-slow-out}

::: {.learning-objectives}
- compute escape rates in both directions for an asymmetric landscape;
- distinguish forced transitions from noise-driven escapes;
- state the programme's formation–dissolution reading and its label.
:::

Real landscapes are rarely symmetric. Suppose valley A is shallow, with a ridge $\Delta U_A$ above it, and valley B is deep, so that the same ridge stands $\Delta U_B$ above B's floor, with $\Delta U_B > \Delta U_A$. Noise then carries the state from A to B far more often than from B to A. If the curvatures are similar, the ratio of the two escape times is

$$\frac{\langle t_{B\to A}\rangle}{\langle t_{A\to B}\rangle} \approx e^{(\Delta U_B - \Delta U_A)/D}.$$

There is a second way to change valleys. A large outside push, a force $F(t)$ much bigger than the noise, can carry the state over the ridge in the time the push lasts, without waiting for luck. Forced transitions are fast; noise-driven escapes from a deep valley are exponentially slow. Put the two together and the asymmetry is stark: a strong push can put a system into a deep valley in moments, and noise alone may take longer than any observation to get it out.

::: {.example #ex:human-asymmetric-pair-valleys title="An asymmetric pair of valleys"}
A landscape has $\Delta U_A = 1$ and $\Delta U_B = 3$, with noise $D = 0.25$ and similar curvatures. How much longer, on average, does the state stay in B than in A?

**Strategy.** Use the ratio formula above.

**Solution.** $e^{(3 - 1)/0.25} = e^{8} = 2980$.

**Significance.** A barrier only twice as high above B's floor as above A's makes B about three thousand times stickier. Exponential laws turn modest differences in landscape into enormous differences in time.
:::

The temporal dynamics paper of the programme [@P10] applies this mathematics to a clinical observation: distressing states often form in minutes and dissolve over months. In its reading, an overwhelming event is a large forced push into a deep valley, and recovery is a noise-driven escape from below. The mathematics is standard and the asymmetry follows from it, so the conditional statement *if a state is a deep valley in such a landscape, then it forms faster than it dissolves* is `derived-under-assumptions`. Whether distressing states are such valleys, with measurable barriers, is `open-hypothesis`. The paper also stresses what the model does not say: a ball in a deep pit is following the equations, not failing.

::: {.making-connections title="Making Connections — The window of tolerance"}
Clinicians speak of a **window of tolerance**, a range of arousal within which a person can process difficult material [@siegel2012developing]. Too little arousal and nothing moves; too much and the person is flooded. @sec:human-noise-escape has the same shape: with too little noise the state cannot leave its valley, and with too much it visits everywhere and no valley holds. @sec:human-programmes-human-model meets both failures in a simulation. The correspondence is `interpretive`: it organises the clinical idea in the model's terms, and it becomes testable only when arousal is measured and treated as $D$.
:::

## Memory kernels {#sec:human-memory-kernels}

::: {.learning-objectives}
- write a state as a convolution of past inputs with a memory kernel;
- compute how much of an earlier input remains;
- explain how memory lets a repeated input cross a threshold.
:::

@ch:response showed that a linear system's response to any input is a sum of kicks, each weighted by the impulse response: the convolution. For the overdamped valley of @sec:human-state-landscape the impulse response is a decaying exponential, so the state carries a fading record of everything that has pushed it:

$$x(t) = \int_{-\infty}^{t}K(t - t')\,F(t')\,dt', \qquad K(\tau) = K_0\,e^{-\tau/\tau_m}.$$

The function $K$ is called a **memory kernel** and $\tau_m$ the **memory time**. The programme's temporal dynamics paper uses exactly this form for what it calls somatic memory, with $\tau_m$ ranging from seconds to years in different parts of the model [@P10]. The kernel is the simplest that remembers; measured physiological responses often need two or more exponentials, or a slowly decaying power law, and the right form for a given signal is an empirical question.

Memory changes what a threshold does. A single push may fall short of a threshold; the same push repeated before the first has faded can cross it, because the state still carries part of the first. The response to the second push depends on the first, so the system behaves as if it remembers.

::: {.example #ex:human-pushes title="Two pushes"}
A state with memory kernel $K(\tau) = e^{-\tau/\tau_m}$, $\tau_m = 5\,\mathrm{s}$, receives two identical brief pushes of unit size, at $t = 0$ and $t = 5\,\mathrm{s}$. A threshold sits at $1.2$. Does either push cross it?

**Strategy.** Just after each push, add the push to whatever remains of earlier ones.

**Solution.** Just after the first push the state is $1.0$, below threshold. By $t = 5\,\mathrm{s}$ it has decayed to $e^{-1} = 0.37$, so just after the second push it is $1.37$, above threshold.

**Significance.** Neither push alone is enough; the pair is. Had the second push come $10\,\mathrm{s}$ later instead of five, only $e^{-2} = 0.14$ would remain and the total, $1.14$, would fall short. Timing, as in @ch:response's swing, decides the outcome.
:::

::: {.check-your-learning}
With $\tau_m = 5\,\mathrm{s}$, what fraction of a push remains after $1\,\mathrm{s}$? After $10\,\mathrm{s}$? (Answer: $e^{-0.2} = 0.82$; $e^{-2} = 0.14$.)
:::

## Tipping points and critical slowing down {#sec:human-tipping-points-critical}

::: {.learning-objectives}
- explain why recovery slows as a valley flattens;
- compute the lag autocorrelation of a noisy state from its relaxation time;
- describe early-warning signals and their limits.
:::

@ch:cells met **critical slowing down** at the threshold of a nerve cell. It appears whenever a valley is about to disappear. As conditions change, a valley can grow shallower, and @sec:human-state-landscape showed that a shallower valley returns more slowly ($\tau = \gamma/k$). Near the point where the valley vanishes, a **tipping point**, the curvature approaches zero and the relaxation time grows without limit. The figure below shows the effect.

![Left: a valley flattening as a tipping point approaches, drawn at four curvatures. Right: the response to the same small kick in each. The recovery time is $\gamma/k$, so halving the curvature doubles it.](figures/generated/ch05-slowing.png){width="100%"}

A noisy state in a slow valley wanders further and stays away longer, which shows up in a simple statistic. Sampled every $\Delta t$, successive values are correlated by $e^{-\Delta t/\tau}$, the **lag autocorrelation**. As a tipping point approaches, $\tau$ grows and the autocorrelation creeps towards one; the variance grows too. These **early-warning signals** have been found before abrupt changes in lakes, fisheries and past climates [@scheffer2009early]. They have limits: they need long, regular records, they can be masked by noise or by changes in the noise itself, and some transitions happen without them, for example when a single large push throws a system over a ridge that was not flattening at all. Researchers have looked for the same signals in daily mood records; that work is young, and any single-person forecast from it would be premature.

::: {.example #ex:human-rising-autocorrelation title="A rising autocorrelation"}
A mood score is recorded once a day. Its relaxation time is $1$ day, and then over some months it rises to $2$ days and to $4$. Find the lag-one-day autocorrelation at each stage.

**Strategy.** Use $e^{-\Delta t/\tau}$ with $\Delta t = 1$ day.

**Solution.** $\tau = 1$: $e^{-1} = 0.37$. $\tau = 2$: $e^{-0.5} = 0.61$. $\tau = 4$: $e^{-0.25} = 0.78$.

**Significance.** The rise from $0.37$ to $0.78$ is large and measurable with enough data, and it signals that the valley is flattening. It does not say which way the state will go once the valley is gone, or when exactly.
:::

## The programme's human model and QUANT-EXP-1 {#sec:human-programmes-human-model}

::: {.learning-objectives}
- state the programme's eight-mode landscape and its energy function;
- describe QUANT-EXP-1 and its results accurately;
- label each claim of the human-level reading correctly.
:::

The programme's human model is the landscape of this chapter in eight dimensions. A state is a vector $\mathbf{e}$ of eight emotional modes, named Safety, Fear, Curiosity, Awe, Grief, Language, Preverbal and Shame, and the landscape is a Hopfield energy (@ch:cells) with a coupling matrix $W$ and a bias $\mathbf{b}$:

$$H(\mathbf{e}) = -\tfrac12\,\mathbf{e}^{\mathsf T}W\mathbf{e} - \mathbf{b}^{\mathsf T}\mathbf{e}.$$

Valleys of $H$ are proposed as emotional states; a strongly negative coupling between two modes builds a high ridge between their valleys [@P1; @P10]. The quantum paper [@P2] then asks a computational question. Its starting point is Penrose's argument, surveyed in his chapters 29 and 30, that the reduction of the quantum state may involve gravity and that this may matter for consciousness [@penrose2004road]. The paper does not test that proposal; it borrows its shape, a gap that one kind of dynamics cannot cross and another can, and asks it of a model landscape. With a Fear–Awe coupling of $-10$, the ridge between the Fear valley and the Awe valley is $2.025$ high. Can a state that starts in the Fear valley reach the Awe valley?

The experiment, QUANT-EXP-1, compares two kinds of dynamics on the same landscape. The classical runs use the Langevin equation of @sec:human-noise-escape. The quantum run replaces the landscape with the corresponding eight-qubit energy and slowly switches off a "transverse field" that lets the state tunnel through ridges rather than climb over them, a standard technique called **quantum annealing**. All $2^8 = 256$ quantum amplitudes are computed exactly. The results:

| Dynamics | Fear occupancy | Awe occupancy | Verdict |
|:--|:--|:--|:--|
| Classical, cold ($D = 0.02$) | 0.976 | 0.000 | stuck: $e^{-2.025/0.02} = e^{-101}$ |
| Classical, hot ($D = 1.5$) | 0.228 | 0.036 | flooded: valleys no longer hold |
| Quantum annealing | 0.005 | 0.408 (peak) | reaches the Awe valley |

The cold run is stuck for exactly the reason of @ex:human-small-change-noise; the hot run escapes but loses the landscape's structure, the two failures of the window of tolerance. The annealed run reaches the target valley without flooding. Follow-up sweeps over ridge heights from $-6$ to $-14$ gave the same pattern, and found that any classical noise level matching the quantum result also floods the landscape.

| Claim | Label |
|:--|:--|
| Overdamped relaxation, Kramers escape, critical slowing before tipping points | `empirical-result` |
| In an asymmetric landscape, forced entry is fast and noise-driven exit is slow | `derived-under-assumptions` |
| Emotional states are valleys of an eight-mode landscape with measurable ridges | `open-hypothesis` |
| QUANT-EXP-1: annealing reaches the Awe valley; the cold classical run does not | `simulated` |
| Human brains perform quantum annealing between emotional states | not claimed |

The last row matters most. QUANT-EXP-1 is a statement about two algorithms on one model landscape. It shows that the landscape has a ridge that a cold classical search cannot cross and an annealer can. The paper is explicit that it does not show that brains are quantum devices, or that any therapy works by tunnelling. Its value is as a bounded, reproducible test of a model's reachability, runnable in seconds by anyone with the code.

::: {.soma-machine}
The human level shows the chapter's two models side by side. In `#level=human-vertebrate&lens=on&dim=4` a **Poke field** gives a single damped response that returns to rest. With `dim=8`, poke twice in quick succession: the second response differs from the first, because the 8D model carries the memory kernel of @sec:human-memory-kernels, and a large enough pair crosses into another valley. The question tour `#q=feeling-memory`, *Does a feeling remember being poked?*, walks through the same steps with their labels. Tour stop 5: `#tour=textbook&stop=5`.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
bistable
: having two stable states under the same rules

critical slowing down
: the lengthening of recovery times as a valley flattens towards a tipping point

Kramers escape time
: the mean time for noise to carry a state over a ridge, proportional to $e^{\Delta U/D}$

landscape
: a function $U(x)$ whose downhill slope is the force on a state

Langevin equation
: an equation of motion with a random force added

memory kernel
: the weighting $K(\tau)$ with which past inputs contribute to the present state

quantum annealing
: finding low valleys of an energy by slowly removing a field that lets the state tunnel

relaxation time
: $\tau = \gamma/k$, the time for a small displacement to fall by a factor $e$
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Overdamped motion
: $\gamma\dot{x} = -U'(x) + F(t)$, $\quad \tau = \gamma/U''$

Double-well landscape
: $U = \Delta U\,(x^2 - 1)^2$, $\quad U''(\pm1) = 8\Delta U$, $\ U''(0) = -4\Delta U$

Langevin equation and Boltzmann distribution
: $\gamma\dot{x} = -U' + \sqrt{2\gamma D}\,\eta(t)$, $\quad p(x) \propto e^{-U/D}$

Kramers escape time
: $\langle t\rangle = \dfrac{2\pi\gamma}{\sqrt{k_A|k_\text{top}|}}\,e^{\Delta U/D}$

Memory kernel
: $x(t) = \int K(t-t')F(t')\,dt'$, $\quad K(\tau) = K_0e^{-\tau/\tau_m}$

Lag autocorrelation
: $\rho(\Delta t) = e^{-\Delta t/\tau}$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:human-state-landscape]** An overdamped state slides down a landscape; a valley of curvature $k$ returns it in time $\gamma/k$. Two valleys make a system bistable.

**[-@sec:human-noise-escape]** Noise lets a state escape over a ridge in a time proportional to $e^{\Delta U/D}$: small changes in barrier or noise change waiting times enormously.

**[-@sec:human-fast-slow-out]** In an asymmetric landscape a strong push enters a deep valley quickly while noise leaves it slowly. The programme's reading of distress as such a valley is an open hypothesis.

**[-@sec:human-memory-kernels]** A memory kernel makes the present state a weighted record of past inputs, so repeated inputs can cross a threshold that one cannot.

**[-@sec:human-tipping-points-critical]** As a valley flattens, recovery slows and autocorrelation rises: an early-warning signal with real but limited use.

**[-@sec:human-programmes-human-model]** QUANT-EXP-1 shows, in simulation, that annealing reaches a valley a cold classical search cannot. It makes no claim that brains tunnel.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why does a heart rate settle smoothly rather than ringing like a bell?
2. Why does the exponential in the Kramers formula matter more than the prefactor?
3. Explain why a state can be entered quickly but left slowly. What two mechanisms are involved?
4. How can two pushes cross a threshold that neither crosses alone?
5. What does a rising lag autocorrelation tell you, and what does it not tell you?
6. Which row of the table in @sec:human-programmes-human-model is a simulation result, and what would be needed to turn the open hypothesis into an empirical result?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:human-formula-against-simulation title="Formula against simulation"}
Simulations of the landscape of @ex:human-fast-does-valley give mean escape times of $78$ at $D = 0.25$ and $194$ at $D = 0.20$. Compare with the Kramers formula and explain the trend.
:::

::: {.solution}
**Solution.** Kramers: $1.11\,e^{4} = 61$ and $1.11\,e^{5} = 165$. The simulations are longer by $29\,\%$ and $17\,\%$.

**Significance.** The Kramers formula is exact only when the barrier is much larger than the noise. At $\Delta U/D = 4$ and $5$ it is a good estimate, and it improves as the ratio grows; the simulated times also include the slide down into the second valley. The exponential, which accounts for the factor of $2.7$ between the two cases, is captured exactly. *Baseline:* Penrose, chapter 27 (the second law and the Boltzmann factor) [@penrose2004road].
:::

::: {.problems #pr:human-halving-noise title="Halving the noise"}
In the landscape of @ex:human-fast-does-valley, how much longer is the escape time at $D = 0.125$ than at $D = 0.25$?
:::

::: {.solution}
**Solution.** The ratio is $e^{1/0.125 - 1/0.25} = e^{8 - 4} = e^{4} = 55$.

**Significance.** Halving the noise multiplies the wait by fifty-five. Systems near the edge of mobility are extremely sensitive to their noise level, a fact used in annealing furnaces and simulated-annealing algorithms, which lower the noise slowly so that the state settles in the deepest valley.
:::

::: {.problems #pr:human-cold-run title="The cold run"}
In QUANT-EXP-1 the ridge is $2.025$ high and the cold classical run has $D = 0.02$. Compute the Boltzmann factor for reaching the top of the ridge. Repeat for the hot run, $D = 1.5$.
:::

::: {.solution}
**Solution.** Cold: $e^{-2.025/0.02} = e^{-101} = 1\times10^{-44}$. Hot: $e^{-2.025/1.5} = e^{-1.35} = 0.26$.

**Significance.** At the cold setting the ridge is effectively a wall; at the hot setting a quarter of all attempts reach the top, so the state wanders over every ridge and no valley holds it. Neither is what the experiment wants, which is the reason for comparing with annealing. **Try it:** `#q=feeling-memory`. *Baseline:* Penrose, chapter 21 (tunnelling and the quantum particle) [@penrose2004road].
:::

::: {.problems #pr:human-three-pushes title="Three pushes"}
With the kernel of @ex:human-pushes ($\tau_m = 5\,\mathrm{s}$, threshold $1.2$), unit pushes arrive at $t = 0$, $10$ and $20\,\mathrm{s}$. Does the third cross the threshold?
:::

::: {.solution}
**Solution.** Just after the second push: $1 + e^{-2} = 1.135$. At $t = 20\,\mathrm{s}$ this has decayed by $e^{-2}$ to $0.154$, so just after the third push the state is $1.154$: below threshold.

**Significance.** With pushes spaced by two memory times the state settles at $1/(1 - e^{-2}) = 1.157$ after each push, never reaching $1.2$. Closer spacing would cross it. The memory time sets the tempo at which repeated small events add up.
:::

::: {.problems #pr:human-recovery-warning title="Recovery as a warning"}
In the landscape of @ex:human-fast-does-valley, the barrier slowly falls from $\Delta U = 1$ to $\Delta U = 0.25$. By what factor does the relaxation time grow, and by what factor does the noise-driven escape time at $D = 0.25$ shrink?
:::

::: {.solution}
**Solution.** $\tau = \gamma/8\Delta U$ grows from $0.125$ to $0.5$, a factor of $4$. The escape time $\frac{2\pi}{\sqrt{32}\,\Delta U}e^{\Delta U/D}$ goes from $1.11\,e^{4} = 61$ to $4.44\,e^{1} = 12$, a factor of $5$ shorter (at $\Delta U/D = 1$ the formula is only a rough guide).

**Significance.** The two changes go together: recovery from small pushes slows while escape becomes more likely. Watching the first is a way to anticipate the second, which is the logic of early-warning signals.
:::
