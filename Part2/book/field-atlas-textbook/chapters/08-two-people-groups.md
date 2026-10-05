# Two People and Groups: Falling into Step {#ch:groups}

![Synchronisation in two panels. Left: the phase gap between two coupled oscillators with slightly different natural rates. Below the locking threshold the gap keeps slipping by whole cycles; above it the gap settles and holds. Right: a simulated crowd of 2000 oscillators. Below a critical coupling no common rhythm forms; above it a rhythm emerges and grows stronger with coupling.](figures/generated/ch06-banner.png){.opener}

In 1665 Christiaan Huygens, ill in bed, noticed that two pendulum clocks hanging from the same beam always ended up swinging in exact opposition, however he started them. The beam carried tiny vibrations from one clock to the other, and those were enough. Since then the same effect has been found in fireflies flashing in unison, pacemaker cells in the heart, applauding audiences, walkers on a swaying bridge and two people in conversation who drift into the same rhythm of speech and movement. This chapter develops the physics of **synchronisation**: when coupled rhythms lock, when they slip, and how a common rhythm can appear in a crowd of individuals who each keep their own time. It then states what the programme behind this Atlas adds for two people and for groups, and what it does not claim.

**Chapter outline.** [-@sec:groups-describing-rhythm-phase] Describing a rhythm by its phase · [-@sec:groups-oscillators-locking-slipping] Two oscillators: locking and slipping · [-@sec:groups-many-oscillators-onset] Many oscillators: the onset of collective rhythm · [-@sec:groups-crowds-step] Crowds in step · [-@sec:groups-coupled-landscapes] Coupled landscapes · [-@sec:groups-programme-claims-dyads] What the programme claims for dyads and groups

::: {.maths-you-need}
Phase and circles (@sec:m-osc-circle); complex numbers and $e^{i\theta}$ (@sec:m-osc-euler); derivatives (@sec:m-change-derivative).
:::

## Describing a rhythm by its phase {#sec:groups-describing-rhythm-phase}

::: {.learning-objectives}
- describe a steady rhythm by a phase and a natural frequency;
- convert between frequency, period and angular frequency;
- explain why a phase description suits weak coupling.
:::

A steady rhythm, whether a heartbeat, a footstep or a pendulum swing, repeats the same cycle again and again. Where it is in its cycle can be described by one number, the **phase** $\theta$, which runs from $0$ to $2\pi$ over one cycle and then starts again. A rhythm left to itself advances its phase at a steady rate, its **natural angular frequency** $\omega$:

$$\dot\theta = \omega, \qquad \omega = 2\pi f = \frac{2\pi}{T}.$$

A resting heart at $1.2\,\mathrm{Hz}$, for example, has $\omega = 2\pi\times1.2 = 7.5\,\mathrm{rad\,s^{-1}}$. The description throws away the size and shape of each cycle and keeps only its timing. This is a good approximation for a **self-sustained oscillator**, one that has its own energy supply and returns to its preferred cycle after a disturbance, unlike the damped oscillators of @ch:response. When such oscillators are coupled weakly, the coupling cannot change the shape of their cycles much; it can only nudge their timing. The whole story of synchronisation is then a story about phases.

::: {.check-your-learning}
A person walks at two steps per second. What are the period and angular frequency of the stepping rhythm? (Answer: $T = 0.5\,\mathrm{s}$, $\omega = 4\pi = 12.6\,\mathrm{rad\,s^{-1}}$.)
:::

## Two oscillators: locking and slipping {#sec:groups-oscillators-locking-slipping}

::: {.learning-objectives}
- write the equation for the phase gap between two coupled oscillators;
- state the locking condition and compute the locked phase lag;
- compute the time between phase slips below threshold.
:::

Take two oscillators, A and B, with slightly different natural frequencies, and let each nudge the other towards its own phase with strength $\kappa$:

$$\dot\theta_A = \omega_A + \kappa\sin(\theta_B - \theta_A), \qquad \dot\theta_B = \omega_B + \kappa\sin(\theta_A - \theta_B).$$

Subtracting gives a single equation for the phase gap $\varphi = \theta_A - \theta_B$, known as the **Adler equation**:

$$\dot\varphi = \Delta\omega - 2\kappa\sin\varphi, \qquad \Delta\omega = \omega_A - \omega_B.$$

The detuning $\Delta\omega$ tries to open the gap; the coupling tries to close it. If $2\kappa \ge |\Delta\omega|$, the gap stops changing where $\sin\varphi^\ast = \Delta\omega/2\kappa$: the oscillators are **phase-locked**, running at a common frequency with a fixed lag, the faster one slightly ahead. If $2\kappa < |\Delta\omega|$, the gap never settles. It creeps slowly while the coupling holds it back and then jumps through a full cycle, a **phase slip**, as in the red curve of the opening figure. The slips recur with period

$$T_\text{slip} = \frac{2\pi}{\sqrt{\Delta\omega^2 - 4\kappa^2}},$$ {#eq:groups-slip}

which is longer than the uncoupled beat period $2\pi/\Delta\omega$ and grows without limit as the threshold is approached: critical slowing down again (Chapters [-@ch:cells] and [-@ch:human]).

::: {.example #ex:groups-walkers title="Two walkers"}
Two people walking side by side have natural step rates of $1.9$ and $2.0$ steps per second. Each adjusts towards the other's timing with $\kappa = 0.40\,\mathrm{rad\,s^{-1}}$. Do they fall into step, and if so with what lag?

**Strategy.** Compute $\Delta\omega$, compare with $2\kappa$, then find $\varphi^\ast$.

**Solution.** $\Delta\omega = 2\pi\times0.1 = 0.63\,\mathrm{rad\,s^{-1}}$ and $2\kappa = 0.80$, so they lock. $\sin\varphi^\ast = 0.63/0.80 = 0.79$, so $\varphi^\ast = 52^\circ$, about a seventh of a step.

**Significance.** Locking does not require identical rhythms, only coupling strong enough to bridge the difference. The price of the difference is a lag: the closer the pair is to the threshold, the larger the lag, reaching a quarter cycle ($90^\circ$) exactly at threshold.
:::

::: {.example #ex:groups-just-too-weak title="Just too weak"}
For the walkers of @ex:groups-walkers, the coupling drops to $\kappa = 0.20\,\mathrm{rad\,s^{-1}}$. How often do they slip out of step, and how does that compare with no coupling at all?

**Strategy.** Apply the slip-period formula.

**Solution.** $T_\text{slip} = 2\pi/\sqrt{0.63^2 - 0.40^2} = 2\pi/0.48 = 13\,\mathrm{s}$. With no coupling the gap grows steadily and they realign every $1/0.1 = 10\,\mathrm{s}$.

**Significance.** Even coupling below threshold leaves a mark: the walkers spend most of each slip cycle nearly in step, then fall out quickly. An observer would see long stretches of near-synchrony punctuated by stumbles.
:::

{{Visualize | eq:groups-slip | function-plot:neural | f="2*pi/sqrt(x^2 - 4*k^2)"; k=0.2; x=[0.405,1.5]; y=[0,60]; value_at=0.63; expect_value=13; expect_tol=0.01; vline=0.4; xlabel="difference in natural rates $\Delta\omega$ (rad/s)"; ylabel="time between slips (s)"; label=fig:groups-slip; height=26% }} Time between phase slips for two coupled walkers with $2\kappa = 0.40\,\mathrm{rad\,s^{-1}}$. Far from locking the slips come quickly; as the difference in natural rates approaches $2\kappa$ (dotted) they come ever more rarely, and below it the pair locks. The red point is the $13\,\mathrm{s}$ of the example.

::: {.check-your-learning}
Two locked oscillators have $\Delta\omega/2\kappa = 0.4$. What is the locked phase lag? (Answer: $\sin^{-1}0.4 = 23.6^\circ$.)
:::

## Many oscillators: the onset of collective rhythm {#sec:groups-many-oscillators-onset}

::: {.learning-objectives}
- write the Kuramoto model and define its order parameter;
- state the critical coupling and the growth of order above it;
- explain why a crowd synchronises all at once rather than pair by pair.
:::

In 1975 Yoshiki Kuramoto generalised the pair to a crowd of $N$ oscillators, each with its own natural frequency drawn from a spread, each coupled equally to all the others [@kuramoto1984chemical]:

$$\dot\theta_i = \omega_i + \frac{K}{N}\sum_{j=1}^{N}\sin(\theta_j - \theta_i).$$

How synchronised the crowd is can be measured by averaging the oscillators as arrows on a circle. The length of the average arrow is the **order parameter**

$$r = \left|\frac1N\sum_{j=1}^{N}e^{i\theta_j}\right|,$$

which is $0$ when phases are scattered evenly and $1$ when all coincide. Kuramoto's discovery was that the crowd behaves like a physical substance changing state. Below a **critical coupling** $K_c$, $r$ stays near zero: every oscillator keeps its own time. Above $K_c$ a cluster of oscillators with similar frequencies locks together, its common rhythm pulls in more members, and $r$ rises steeply. When the natural frequencies follow a bell-shaped (Lorentzian) spread of half-width $\gamma$, the result is exact:

$$K_c = 2\gamma, \qquad r = \sqrt{1 - K_c/K}\quad (K > K_c).$$ {#eq:groups-kuramoto}

{{Visualize | eq:groups-kuramoto | function-plot:neural | f="where(x > Kc, sqrt(abs(1 - Kc/x)), 0)"; Kc=1; x=[0,5]; value_at=2; expect_value=0.707; vline=1; xlabel="coupling $K/K_c$"; ylabel="synchrony $r$"; label=fig:groups-kuramoto; height=26% }} Kuramoto's transition. Below the critical coupling (dotted) the crowd stays incoherent, $r = 0$; above it synchrony grows steeply at first, reaching $r = 0.71$ at twice the critical coupling (red point), and approaches one only slowly.

Synchrony appears through the crowd as a whole, not pair by pair. Each oscillator responds to the mean rhythm, which is itself created by the oscillators that respond to it, a feedback loop that switches on at $K_c$ [@strogatz2003sync; @acebron2005kuramoto]. The figure below compares the formula with a simulation of 2000 oscillators.

![The order parameter $r$ against coupling $K$ for a crowd with critical coupling $K_c = 1$. The curve is Kuramoto's exact result; the dots are a simulation of 2000 oscillators, which follows it closely above $K_c$ and stays near zero below it.](figures/generated/ch06-kuramoto.png){width="100%"}

::: {.example #ex:groups-much-order title="How much order?"}
A population has natural frequencies spread with half-width $\gamma = 0.5\,\mathrm{rad\,s^{-1}}$. Find $K_c$, and the order parameter at $K = 1.5$ and $K = 2.0\,\mathrm{rad\,s^{-1}}$.

**Strategy.** $K_c = 2\gamma$; then $r = \sqrt{1 - K_c/K}$.

**Solution.** $K_c = 1.0\,\mathrm{rad\,s^{-1}}$. At $K = 1.5$: $r = \sqrt{1 - 0.667} = 0.58$. At $K = 2.0$: $r = \sqrt{0.5} = 0.71$.

**Significance.** The simulation in the figure gives $0.57$ and $0.71$, within the small random scatter expected for 2000 oscillators. Doubling the coupling beyond threshold takes the crowd only to $r = 0.71$: synchrony arrives suddenly but completes slowly.
:::

::: {.check-your-learning}
Phases scattered at random among $N$ oscillators still give a small $r$, of order $1/\sqrt{N}$. How large is that for $100$ and for $1000$ oscillators? (Answer: about $0.1$ and $0.03$, which is why the simulation's $r$ hovers just above zero below threshold.)
:::

## Crowds in step {#sec:groups-crowds-step}

::: {.learning-objectives}
- describe measured examples of crowd synchronisation;
- explain the applause cycle with the Kuramoto model;
- recognise when a crowd's synchrony needs a physical channel.
:::

The Kuramoto model is a caricature, but its central prediction, a threshold set by the spread of natural rates against the strength of coupling, has been seen in measured crowds.

**Applause.** Néda and colleagues recorded theatre audiences in Romania and Hungary, where enthusiastic applause often turns into rhythmic clapping [@neda2000physics]. They found that synchronised clapping is roughly twice as slow as ordinary applause, and that at the slower rate the spread of individual clapping rates is much narrower. In Kuramoto's terms, slowing down shrinks $\gamma$ and so lowers $K_c$ below the coupling supplied by hearing the hall, and the audience locks. Synchronised clapping is quieter, however, and audiences seeking more noise speed up; the spread widens, $K_c$ climbs past the coupling, and the rhythm dissolves, only to re-form when the audience slows again.

**A swaying bridge.** On its opening day in June 2000, London's Millennium Bridge began to sway sideways under the crowd. Walkers on a swaying deck adjust their steps to keep balance and so fall into step with the sway, pushing it further: a coupling that grows with the motion it causes. Engineers found the sway set in only above a critical number of walkers, about 160 on the affected span, the signature of a threshold rather than a gradual effect. The bridge was closed and fitted with dampers.

In both cases there is a physical channel, sound in the hall and motion of the deck, carrying the coupling. That requirement is the honest test for any claimed synchrony in a group: name the channel, estimate its strength, and compare it with the spread of the rhythms it must lock.

::: {.making-connections title="Making Connections — Choirs and breathing"}
Singers in a choir breathe at the phrase ends the music dictates, so their breathing, and with it their heart rates, which rise and fall with each breath, can become partly aligned. Here the channel is the score and the conductor, a shared drive rather than mutual coupling. Distinguishing a common drive from mutual coupling is the first question to ask of any group rhythm, because a common drive synchronises people who are not influencing each other at all. **Try it:** `#q=crowd-mood`.
:::

## Coupled landscapes {#sec:groups-coupled-landscapes}

::: {.learning-objectives}
- write the energy of two coupled landscapes;
- compute how coupling lowers the energy of matching states;
- distinguish coupling of states from merging of systems.
:::

Phases describe rhythms. Chapters [-@ch:cells] and [-@ch:human] described states by valleys in a landscape, and those can be coupled too. Give person A the state vector $\mathbf a$ and person B the state vector $\mathbf b$, each with the Hopfield energy of @ch:human, and add a coupling matrix $J$ between them. The combined energy is

$$H(\mathbf a, \mathbf b) = H(\mathbf a) + H(\mathbf b) - \mathbf a^{\mathsf T}J\,\mathbf b,$$

for symmetric $J$. If $J$ couples each mode of A to the same mode of B with positive strength, the last term is negative whenever the two people are active in the same modes and positive when they are active in opposite ones. Coupling deepens the valleys in which the two states match and raises the ridges between mismatched ones. The two landscapes become one landscape in twice as many dimensions, but the two state vectors stay distinct: coupling correlates two systems, it does not merge them.

::: {.example #ex:groups-shared-calm title="Shared calm"}
In the programme's dyadic model, the coupling links Safety to Safety with $J = 0.30$ and Awe to Awe with $0.35$ (in model units). Two people both have Safety $0.8$ and Awe $0.5$, and zero in the other modes. How much does the coupling lower their combined energy? What if one of them has Safety $-0.8$ instead?

**Strategy.** The coupling term is $-\sum_i J_{ii}a_ib_i$ for this diagonal $J$.

**Solution.** $-(0.30\times0.8\times0.8 + 0.35\times0.5\times0.5) = -(0.192 + 0.088) = -0.28$. With Safety $-0.8$ for one person: $-(0.30\times(-0.64) + 0.088) = +0.10$.

**Significance.** Matching states sit lower and mismatched ones higher, so a coupled pair is drawn towards shared states. The arithmetic is the same as @ex:cells-threeneuron-memory's Hopfield memory, with one person's state acting as the cue for the other's.
:::

## What the programme claims for dyads and groups {#sec:groups-programme-claims-dyads}

::: {.learning-objectives}
- state the programme's dyadic model and the status of its Lean proof;
- distinguish the group-level reading from a claim of a group mind;
- label each claim of the chapter correctly.
:::

The co-identification paper models therapeutic attunement as coupling of this kind [@P3]: two eight-mode landscapes joined by $J$ into a sixteen-dimensional one, whose response has poles both at each person's own modes and at new coupled modes that belong to the pair. In the language of @ch:atoms, the coupled poles are the pair's shared resonances; the paper reads them as co-regulated states, available to both people only through the coupling. The swarm paper extends the same propagator to many agents [@P19], and @ch:flocks follows it to flocks.

The Lean file `DyadicField.lean` states that, for non-negative states and non-negative $J$, coupling never raises the combined energy, the conclusion of @ex:groups-shared-calm. The main theorem's proof is complete except for one supporting lemma, which splits the sixteen-dimensional sum into its four blocks and is still marked `sorry`. So the result is not yet `kernel-verified`; it is ordinary algebra, true by inspection, waiting for its last formal step [@D2].

| Claim | Label |
|:--|:--|
| Coupled oscillators phase-lock above a threshold; crowds show a Kuramoto transition | `empirical-result` |
| Coupling lowers the energy of matching states in two coupled landscapes | `derived-under-assumptions` (Lean proof incomplete) |
| Interpersonal attunement is coupling between two somatic landscapes | `open-hypothesis` |
| Co-regulated states are the coupled poles of the dyadic propagator | `interpretive` |
| A crowd has a single mind or mood of its own | not claimed |

The open hypothesis predicts measurable things: physiological signals of two people in a supportive conversation should show phase relations and coupled modes that are absent between strangers, and their strength should vary with the quality of the interaction. Some studies report such interpersonal synchrony; the effects vary widely between settings and measures, and none yet measures $J$. The last row marks the boundary of the whole chapter. Sociologists since Durkheim have described the collective excitement of crowds [@durkheim1912elementary], and the Kuramoto order parameter gives a crowd a measurable rhythm. Neither makes a crowd a subject. A group can have a common rhythm and correlated states while every member remains a separate person.

::: {.soma-machine}
Open `#level=dyad&lens=on&dim=11`. The STATE panel reports the pair's detuning and coupling in the Adler form of @sec:groups-oscillators-locking-slipping, and whether the locking condition $\kappa > \Delta\omega/2$ holds. The question tour `#q=dyad-fall-into-step`, *When do two people fall into step?*, steps through the same physics and marks where the programme's reading begins. Tour stop 6: `#tour=textbook&stop=6`.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
Adler equation
: $\dot\varphi = \Delta\omega - 2\kappa\sin\varphi$, the equation for the phase gap of two coupled oscillators

critical coupling $K_c$
: the coupling above which a population of oscillators develops a common rhythm

Kuramoto model
: a population of phase oscillators, each coupled equally to all others

order parameter $r$
: the length of the average phase arrow; $0$ for scattered phases, $1$ for complete synchrony

phase
: the position of an oscillator within its cycle, from $0$ to $2\pi$

phase-locking
: a state in which coupled oscillators run at a common frequency with a fixed lag

phase slip
: a rapid jump of the phase gap through a full cycle when coupling is below threshold

self-sustained oscillator
: an oscillator with its own energy supply that returns to its preferred cycle after a disturbance
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Phase
: $\dot\theta = \omega = 2\pi f$

Adler equation and locking
: $\dot\varphi = \Delta\omega - 2\kappa\sin\varphi$; locked if $2\kappa \ge |\Delta\omega|$, with $\sin\varphi^\ast = \Delta\omega/2\kappa$

Slip period
: $T_\text{slip} = 2\pi/\sqrt{\Delta\omega^2 - 4\kappa^2}$

Kuramoto model
: $\dot\theta_i = \omega_i + \dfrac{K}{N}\sum_j\sin(\theta_j - \theta_i)$, $\quad r = \Big|\dfrac1N\sum_je^{i\theta_j}\Big|$

Onset of synchrony (Lorentzian spread)
: $K_c = 2\gamma$, $\quad r = \sqrt{1 - K_c/K}$

Coupled landscapes
: $H(\mathbf a, \mathbf b) = H(\mathbf a) + H(\mathbf b) - \mathbf a^{\mathsf T}J\mathbf b$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:groups-describing-rhythm-phase]** A self-sustained rhythm is described by its phase, which advances at its natural frequency; weak coupling only nudges phases.

**[-@sec:groups-oscillators-locking-slipping]** Two oscillators lock when $2\kappa \ge |\Delta\omega|$, with a lag that grows towards a quarter cycle at threshold; below it the gap slips.

**[-@sec:groups-many-oscillators-onset]** A crowd of oscillators synchronises all at once above a critical coupling $K_c = 2\gamma$, with order $r = \sqrt{1 - K_c/K}$.

**[-@sec:groups-crowds-step]** Applause and a swaying bridge show measured thresholds. Each needs a physical channel carrying the coupling.

**[-@sec:groups-coupled-landscapes]** Coupling two landscapes lowers the energy of matching states without merging the systems.

**[-@sec:groups-programme-claims-dyads]** The programme reads attunement as coupled landscapes and shared poles. The algebra is nearly machine-checked; the application to people is an open hypothesis; a crowd mind is not claimed.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why can weakly coupled self-sustained oscillators be described by their phases alone?
2. Two locked oscillators have a large phase lag. What does that tell you about their coupling and detuning?
3. Why does a crowd synchronise all at once rather than gradually?
4. Explain why synchronised clapping tends to break up and re-form.
5. What is the difference between a common drive and mutual coupling, and how could you tell them apart?
6. Which claim in @sec:groups-programme-claims-dyads depends on an unfinished proof, and what is missing?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:groups-locking-threshold title="The locking threshold"}
Two pendulum clocks differ in natural frequency by $\Delta\omega = 0.010\,\mathrm{rad\,s^{-1}}$. What is the smallest coupling $\kappa$ that locks them, and what is their lag when $\kappa$ is twice that?
:::

::: {.solution}
**Solution.** Locking needs $2\kappa \ge 0.010$, so $\kappa \ge 0.0050\,\mathrm{rad\,s^{-1}}$. At $\kappa = 0.010$: $\sin\varphi^\ast = 0.010/0.020 = 0.5$, so $\varphi^\ast = 30^\circ$.

**Significance.** Good clocks differ very little, so even the faint vibrations of a shared beam are enough to lock them, as Huygens found. (His clocks locked in opposition rather than with a small lag, because the beam's coupling has the opposite sign; the threshold logic is the same.) *Baseline:* Penrose, chapter 20 (small oscillations about equilibrium) [@penrose2004road].
:::

::: {.problems #pr:groups-slips-near-threshold title="Slips near threshold"}
For $\Delta\omega = 1.0\,\mathrm{rad\,s^{-1}}$, compute the slip period for $2\kappa = 0.6$ and $2\kappa = 0.9$, and compare with the uncoupled beat period.
:::

::: {.solution}
**Solution.** $2\kappa = 0.6$: $T = 2\pi/\sqrt{1 - 0.36} = 2\pi/0.8 = 7.9\,\mathrm{s}$. $2\kappa = 0.9$: $T = 2\pi/\sqrt{1 - 0.81} = 2\pi/0.44 = 14\,\mathrm{s}$. Uncoupled: $2\pi/1.0 = 6.3\,\mathrm{s}$.

**Significance.** As the coupling approaches threshold the slips become rarer and the time spent nearly locked grows; at threshold the period is infinite. **Try it:** `#q=dyad-fall-into-step`.
:::

::: {.problems #pr:groups-strong-order title="Strong order"}
For a Lorentzian population, what coupling, as a multiple of $K_c$, gives an order parameter of $0.9$?
:::

::: {.solution}
**Solution.** $0.9^2 = 1 - K_c/K$, so $K_c/K = 0.19$ and $K = 5.3\,K_c$.

**Significance.** Near-complete synchrony needs coupling several times the threshold, because the oscillators at the edges of the frequency spread are the last to be pulled in. A crowd that is just above threshold has a rhythm, but many members are still out of step. *Baseline:* Penrose, chapter 28 (spontaneous symmetry breaking), for the general idea of order appearing at a critical point [@penrose2004road].
:::

::: {.problems #pr:groups-slower-clapping title="Slower clapping"}
An audience's clapping rates have a Lorentzian spread of half-width $\gamma = 0.6\,\mathrm{rad\,s^{-1}}$ at the fast rate. Slowing down halves the spread. If the hall supplies coupling $K = 1.0\,\mathrm{rad\,s^{-1}}$, find $K_c$ and $r$ at each rate.
:::

::: {.solution}
**Solution.** Fast: $K_c = 1.2 > K$, so $r \approx 0$. Slow: $\gamma = 0.3$, $K_c = 0.6$, so $r = \sqrt{1 - 0.6} = 0.63$.

**Significance.** The same hall and the same people can be disordered or rhythmic depending only on the spread of their rates, which is the mechanism Néda and colleagues proposed for the applause cycle.
:::

::: {.problems #pr:groups-opposite-states title="Opposite states"}
In @ex:groups-shared-calm, by how much does the combined energy rise when one person's Safety is reversed, compared with the matching case?
:::

::: {.solution}
**Solution.** Matching: $-0.28$. Reversed: $+0.10$. The difference is $0.38$, which is $2\times0.30\times0.8\times0.8 = 0.384$, twice the Safety coupling term.

**Significance.** Reversing one mode flips the sign of its coupling term and leaves the others unchanged, so the energy cost of disagreement in one mode is twice that mode's coupling energy. In a coupled pair, disagreement in a strongly coupled mode is the hardest state to hold.
:::
