# Flocks and Swarms: Order Without a Leader {#ch:flocks}

{{Visualize | ch:flocks | flock:generic | n=400; box=10; radius=1; v0=0.03; steps=500; seed=4; low=0.5; high=4.0; eta=[0.25,5.5]; points=10; curve_steps=300; expect_order_low=0.99; expect_order_high=0.17; expect_tol=0.005; opener=true }} The Vicsek model: 400 simulated agents, each moving at constant speed and steering towards the average heading of its neighbours, with some random error. Left: with little noise the crowd moves as one, although no agent knows where the others are going. Centre: with much noise the order is lost. Right: the degree of order against the noise; the crowd changes from ordered to disordered over a narrow range.

On a winter evening over Rome, a flock of several thousand starlings wheels, folds and splits like a single liquid body, and then turns all at once. No bird leads. Each one sees only a handful of others, reacts in about a tenth of a second, and knows nothing of the flock's overall shape. How a crowd of individuals, each following simple local rules, produces a coherent whole is one of the central questions of modern physics, and flocks are its most beautiful example. This chapter gives the measured answers: what rules a starling follows, when local alignment produces global order, and how a turn crosses a flock faster than any bird could pass it on by imitation alone. It then looks at engineered swarms, where the programme behind this Atlas makes a specific claim about coordinating many agents, and labels that claim carefully.

**Chapter outline.** [-@sec:flocks-rules-without-leader] Rules without a leader · [-@sec:flocks-order-noise] Order from noise · [-@sec:flocks-who-listens-whom] Who listens to whom · [-@sec:flocks-turn-crosses-flock] How a turn crosses a flock · [-@sec:flocks-swarms-design] Swarms by design · [-@sec:flocks-programme-claims-flocks] What the programme claims for flocks and swarms

::: {.maths-you-need}
Vectors and the dot product (@sec:m-vec-vectors); averages and spread (@sec:m-chance-averages); random walks (@sec:m-chance-random-walk).
:::

## Rules without a leader {#sec:flocks-rules-without-leader}

::: {.learning-objectives}
- state the three classic flocking rules;
- write the Vicsek update rule and its order parameter;
- count the neighbours within a fixed radius at a given density.
:::

In 1987 the computer-graphics researcher Craig Reynolds animated convincing flocks of artificial birds, called *boids*, with three rules applied by each bird to its neighbours alone: keep a minimum distance (**separation**), steer towards their average heading (**alignment**), and steer towards their average position (**cohesion**) [@reynolds1987flocks]. In 1995 the physicist Tamás Vicsek stripped the problem down to alignment alone [@vicsek1995novel]. In his model every agent moves at the same speed $v_0$; at each step it adopts the average heading of all agents within a radius $R$, plus a random error drawn uniformly from an interval of width $\eta$:

$$\theta_i(t + \Delta t) = \langle\theta\rangle_{|\mathbf x_j - \mathbf x_i| < R} + \xi_i, \qquad \xi_i \in [-\tfrac{\eta}{2}, \tfrac{\eta}{2}].$$

How well the crowd moves together is measured by the **polarisation**, the length of the average velocity divided by the speed,

$$\phi = \frac{1}{Nv_0}\left|\sum_{i=1}^{N}\mathbf v_i\right|,$$

which is $1$ when all agents move in the same direction and close to $0$ when their headings are random. It is the order parameter of @ch:groups's Kuramoto model, with headings in place of phases.

::: {.example #ex:flocks-many-neighbours title="How many neighbours?"}
Agents are spread over a plane at an average density of $0.05$ per square metre, and each aligns with all agents within $R = 4\,\mathrm{m}$. How many neighbours does a typical agent have? What if the density doubles?

**Strategy.** The expected count is density times the area of the interaction circle, $\rho\pi R^2$.

**Solution.** $0.05\times\pi\times4^2 = 2.5$ neighbours. At double the density, $5.0$.

**Significance.** With a fixed radius, every change in density changes how many voices each agent hears. At the sparse edges of a real flock a bird would hear almost nobody, and the flock would fray. @sec:flocks-who-listens-whom shows that real starlings avoid this problem.
:::

## Order from noise {#sec:flocks-order-noise}

::: {.learning-objectives}
- describe the order–disorder transition in the Vicsek model;
- relate it to the synchronisation transition of @ch:groups;
- explain why moving agents can order where static ones cannot.
:::

The opening figure shows Vicsek's central result. At low noise the agents line up and the polarisation approaches one; at high noise it falls towards zero. In between, over a narrow range of noise, the crowd changes from one state to the other: an **order–disorder transition**, the flocking counterpart of Kuramoto's onset of synchrony and of a magnet losing its magnetism when heated. The same transition occurs at fixed noise when the density is raised, since more neighbours average out more of each agent's error.

There is a surprise in this result. For a large two-dimensional system of *stationary* compasses each aligning with its neighbours, a classic theorem of statistical physics forbids true long-range order: thermal fluctuations at long wavelengths always win. Moving agents escape the theorem. Because each agent carries its heading to new neighbours, information about direction is transported through the crowd as well as diffused, and Toner and Tu showed in 1995 that this is enough to stabilise genuine long-range order [@toner1995long]. A flock is not just a magnet that happens to move; motion is what makes the order possible.

::: {.check-your-learning}
In the opening figure the polarisation is about $0.99$ at noise $0.5$ and $0.17$ at noise $4.0$. If the agents' headings were completely random, roughly what polarisation would 400 agents show? (Answer: about $1/\sqrt{400} = 0.05$, close to the value at the highest noise in the figure.)
:::

## Who listens to whom {#sec:flocks-who-listens-whom}

::: {.learning-objectives}
- distinguish metric from topological interaction;
- describe the evidence that starlings track a fixed number of neighbours;
- explain why topological interaction makes a flock robust.
:::

Do real birds align with everything within a fixed distance, as in Vicsek's model, or with a fixed number of nearest neighbours whatever their distance? The question was answered by the STARFLAG project in Rome, which filmed flocks of up to a few thousand starlings with synchronised cameras and reconstructed every bird's position in three dimensions [@ballerini2008interaction]. If interaction were **metric**, a bird's influence on its neighbours would fall off at a fixed distance, which would change as the flock spreads or contracts. Instead, the influence fell off after the sixth or seventh nearest neighbour, at whatever distance that neighbour happened to be. Starlings interact **topologically**, with about seven neighbours.

The advantage is robustness. A flock that thins out, at its edges or after a predator's attack, keeps the same number of interaction partners per bird and so keeps its cohesion. A metric flock would break into pieces as soon as its density fell, which is exactly what simulations of metric models show and what real flocks do not do.

::: {.example #ex:flocks-seven-neighbours-any title="Seven neighbours at any density"}
For the density of @ex:flocks-many-neighbours, $0.05\,\mathrm{m^{-2}}$, what interaction radius would give each agent seven neighbours? What happens to that radius if the density doubles?

**Strategy.** Solve $\rho\pi R^2 = 7$ for $R$.

**Solution.** $R = \sqrt{7/(\pi\times0.05)} = 6.7\,\mathrm{m}$. At double density the radius falls by $\sqrt2$ to $4.7\,\mathrm{m}$.

**Significance.** A topological bird effectively adjusts its interaction range to the local density, widening it when the flock spreads. Nothing in the rule needs a sense of distance at all, only the ability to pick out the nearest few.
:::

## How a turn crosses a flock {#sec:flocks-turn-crosses-flock}

::: {.learning-objectives}
- compare the spread of a turn by imitation with its spread as a wave;
- estimate crossing times for both mechanisms;
- relate the measured turn waves to the response grammar of @ch:response.
:::

When a starling flock turns, the turn starts with a few birds and sweeps across the flock. Attanasi and colleagues tracked these turns bird by bird and measured how the start of the turn travelled [@attanasi2014information]. It crossed the flock at a constant speed of $20$ to $40\,\mathrm{m\,s^{-1}}$, losing almost no strength on the way, and the speed was higher in more strongly ordered flocks.

That observation rules out the simplest explanation. If each bird merely copied the average heading of its neighbours, as in Vicsek's rule, the turn would spread by **diffusion**: @ch:cells's cable without the leak. A diffusive signal spreads a distance $x$ in a time proportional to $x^2$ and weakens as it spreads, so a turn would crawl across a large flock and arrive faint. A constant speed and an undiminished amplitude are the signature of a **wave**, which needs inertia: each bird's turning must have momentum, so that it keeps turning after it starts, rather than relaxing straight to the local average. The difference is the same as between @ch:response's underdamped and overdamped oscillators, and between @ch:cells's passive spread and active spike. The figure below shows both mechanisms in a simulated line of birds.

![A turn started by the first bird in a line, spreading by imitation (diffusion, red) and with turning inertia (wave, blue). The diffusive arrival time grows with the square of distance; the wave arrives at constant speed.](figures/generated/ch07-turn-wave.png){width="100%"}

::: {.example #ex:flocks-diffusion-or-wave title="Diffusion or wave?"}
A flock is $40\,\mathrm{m}$ across. Neighbouring birds are about $a = 1\,\mathrm{m}$ apart and react in about $\tau = 0.1\,\mathrm{s}$, so imitation alone would spread a turn with a diffusion constant of order $D \approx a^2/\tau = 10\,\mathrm{m^2\,s^{-1}}$. Estimate the crossing time by diffusion, $L^2/2D$, and by a wave at $30\,\mathrm{m\,s^{-1}}$.

**Strategy.** Substitute into each expression.

**Solution.** Diffusion: $40^2/(2\times10) = 80\,\mathrm{s}$. Wave: $40/30 = 1.3\,\mathrm{s}$.

**Significance.** Real flocks complete a turn in about a second. Diffusion would take more than a minute, by which time the flock would have torn apart, so the measured speed requires inertial turning. The estimate is rough, but a factor of sixty is not.
:::

The same research group found a second sign of a coherent medium. The fluctuations of each bird's velocity about the flock's mean are correlated with those of birds far away, over a distance that grows in proportion to the flock's size, however large the flock [@cavagna2010scale]. Such **scale-free correlations** mean that a disturbance anywhere can be felt everywhere: a flock behaves as a system poised near a critical point, maximally responsive to its surroundings [@bialek2012statistical].

## Swarms by design {#sec:flocks-swarms-design}

::: {.learning-objectives}
- compare the cost of iterative consensus with a single propagator step;
- identify what the propagator protocol assumes;
- account for the cost of computing the propagator.
:::

Engineers who coordinate drones, robots or computers face the starlings' problem without the starlings' millions of years of evolution. The usual approach is iterative: each agent repeatedly averages its state with its neighbours' until all agree. With $N$ agents and $K$ rounds the work is of order $NK$, and $K$ can be large when information must cross a large network.

The programme's swarm paper proposes a shortcut [@P19]. If the swarm's interactions are linear and fixed, the final agreed state is a fixed linear function of the starting state: a matrix $G$, the system's Green's function in the sense of @ch:response. Given $G$, the whole $K$-round process can be replaced by a single multiplication, $\mathbf s_\text{final} = G\,\mathbf s$, costing $N^2$ operations. The propagator wins when $N^2 < NK$, that is when $K > N$; at $N = 100$ agents and $K = 5000$ rounds it is fifty times cheaper. The Lean file `SwarmPropagator.lean` proves this arithmetic, including the break-even point $K = N$ [@D2].

The paper is explicit about the conditions. The protocol assumes that $G$ has been computed and distributed before coordination begins, which is feasible when agents' positions and links are known in advance, as in a pre-planned drone display, and needs adaptation when agents join, leave or move unpredictably. It is exact only for linear interactions. And computing $G$ is itself a cost: for a general network it means inverting an $N\times N$ matrix, of order $N^3$ operations. The question for any application is how many times the same $G$ will be reused.

::: {.example #ex:flocks-paying-propagator title="Paying for the propagator"}
For $N = 100$ agents, computing $G$ costs about $N^3 = 10^6$ operations. How many coordinations does it take to repay that cost when each would otherwise need $K = 5000$ rounds? When it would need only $K = 200$?

**Strategy.** Each use saves $NK - N^2$ operations; divide the set-up cost by the saving.

**Solution.** $K = 5000$: saving $500\,000 - 10\,000 = 490\,000$ per use, repaid after $10^6/490\,000 = 2$ uses. $K = 200$: saving $20\,000 - 10\,000 = 10\,000$ per use, repaid after $100$ uses.

**Significance.** The single-step protocol is a large win for slow-converging networks reused many times, and a poor one for fast-converging networks used once. The Lean theorem compares the per-use costs; the full accounting, including set-up, depends on the application.
:::

## What the programme claims for flocks and swarms {#sec:flocks-programme-claims-flocks}

::: {.learning-objectives}
- separate the measured science of flocks from its programme reading;
- state precisely what the swarm Lean file proves;
- label each claim of the chapter correctly.
:::

The flock is the programme's clearest example of its central picture: a disturbance (a bird starting to turn) propagating through a medium (the flock's coupled headings) according to a response kernel (inertial alignment), and read out at a boundary (the flock's changing shape). Every element of that description is measured science. The programme's addition is to say that the same grammar describes the human, dyadic and group levels of earlier chapters [@P19; @P20], and to propose the propagator as a design principle for engineered swarms.

| Claim | Label |
|:--|:--|
| Starlings interact with about seven neighbours; turns cross flocks as waves at $20$–$40\,\mathrm{m\,s^{-1}}$ | `empirical-result` |
| Vicsek-type models order below a critical noise; moving agents can order in two dimensions | `derived-under-assumptions` |
| A single propagator step costs $N^2$ against $NK$, with break-even at $K = N$ | `kernel-verified` [@D2] |
| Propagator coordination outperforms iterative consensus in deployed swarms | `open-hypothesis` |
| A flock's turn and a person's emotional response share one response grammar | `interpretive` |
| A flock is one mind | not claimed |

The third row is true and modest: it compares two operation counts. The fourth is the engineering claim, and it depends on the set-up cost of @ex:flocks-paying-propagator, on how often $G$ must be recomputed as a swarm moves, and on how linear the real interactions are. No flight test is reported in the paper, so it remains open. The last row is the same boundary as @ch:groups's crowd: the starlings behave as one medium, and every one of them is still a separate bird.

::: {.soma-machine}
The question tour `#q=starling-turn`, *Why do starlings turn together?*, opens the swarm level with compare and contours on and walks through the measured turn, the response-kernel reading and its label. The bird and flock levels are on their own path: open `#path=bird-flock&level=flock&lens=on` and compare the single bird's view with the flock's. Tour stop 7: `#tour=textbook&stop=7`.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
order–disorder transition
: a sharp change from collective order to disorder as noise rises or density falls

polarisation
: the length of a crowd's average velocity divided by the agents' speed

propagator protocol
: coordination by one multiplication with a precomputed Green's function matrix

scale-free correlation
: correlation whose range grows in proportion to the size of the system

topological interaction
: interaction with a fixed number of nearest neighbours, whatever their distance

Vicsek model
: agents moving at constant speed that adopt their neighbours' average heading, with noise

wave versus diffusion
: a wave crosses distance $x$ in time $\propto x$ without fading; diffusion takes time $\propto x^2$ and fades
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Vicsek update
: $\theta_i \to \langle\theta\rangle_{R} + \xi_i$, $\quad \xi_i \in [-\eta/2, \eta/2]$

Polarisation
: $\phi = \dfrac{1}{Nv_0}\Big|\sum_i\mathbf v_i\Big|$

Neighbour count (metric, two dimensions)
: $n = \rho\pi R^2$

Crossing times
: diffusion $t \approx L^2/2D$, $\ D \approx a^2/\tau$; $\quad$ wave $t = L/c$

Coordination cost
: iterative $NK$; $\quad$ propagator $N^2$ per use, plus about $N^3$ to compute $G$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:flocks-rules-without-leader]** Flocking can be produced by local rules; Vicsek's model keeps only alignment with noise, measured by the polarisation.

**[-@sec:flocks-order-noise]** Alignment produces an order–disorder transition; because the agents move, true long-range order is possible even in two dimensions.

**[-@sec:flocks-who-listens-whom]** Starlings align with about seven nearest neighbours regardless of distance, which keeps thinning flocks cohesive.

**[-@sec:flocks-turn-crosses-flock]** Turns cross flocks as waves at $20$–$40\,\mathrm{m\,s^{-1}}$, which requires turning inertia; correlations span the whole flock.

**[-@sec:flocks-swarms-design]** A precomputed propagator replaces $K$ rounds of consensus with one step when $K > N$; computing $G$ costs about $N^3$.

**[-@sec:flocks-programme-claims-flocks]** The propagator arithmetic is machine-checked; its engineering advantage and the cross-level grammar are open or interpretive; a flock mind is not claimed.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why is no leader needed for a flock to turn together?
2. What does the polarisation measure, and what value would a random crowd give?
3. Why does topological interaction keep a thinning flock together?
4. What feature of measured starling turns shows that they are waves rather than diffusion?
5. What does the swarm protocol assume, and which of its costs does the Lean theorem leave out?
6. Which claims in @sec:flocks-programme-claims-flocks are measured, which are proved, and which are open?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:flocks-sparser-flock title="A sparser flock"}
At the edge of a flock the density falls to a quarter of its value in the core, where agents have seven neighbours. How many neighbours does an edge agent have under metric interaction with the core's radius, and under topological interaction?
:::

::: {.solution}
**Solution.** Metric: the count scales with density, so $7/4 = 1.75$ neighbours. Topological: still $7$.

**Significance.** With fewer than two neighbours an edge agent under metric rules would barely align with anyone, and the edge would peel away; under topological rules it is as well connected as an agent in the core. **Try it:** `#q=starling-turn`.
:::

::: {.problems #pr:flocks-far-does-turn title="How far does a turn diffuse?"}
With $D = 10\,\mathrm{m^2\,s^{-1}}$ as in @ex:flocks-diffusion-or-wave, how far does a diffusive turn spread in $1\,\mathrm{s}$, using $x \approx \sqrt{2Dt}$? How far does a $30\,\mathrm{m\,s^{-1}}$ wave travel in the same time?
:::

::: {.solution}
**Solution.** Diffusion: $\sqrt{2\times10\times1} = 4.5\,\mathrm{m}$, four or five birds. Wave: $30\,\mathrm{m}$.

**Significance.** In the second it takes a flock to turn, imitation alone would reach only the nearest few birds. *Baseline:* Penrose, chapter 19 (the wave equation of a field) [@penrose2004road].
:::

::: {.problems #pr:flocks-random-headings title="Random headings"}
A crowd of $N$ agents has random headings. Its polarisation is then roughly $1/\sqrt N$. How large must the crowd be for a random polarisation below $0.01$?
:::

::: {.solution}
**Solution.** $1/\sqrt N < 0.01$ requires $N > 10\,000$.

**Significance.** In small simulations random alignment produces noticeable apparent order. Before concluding that a small group is ordered, compare its polarisation with $1/\sqrt N$. *Baseline:* Penrose, chapter 27 (statistical fluctuations and the second law) [@penrose2004road].
:::

::: {.problems #pr:flocks-breakeven-swarm title="The break-even swarm"}
A network of $N = 400$ agents converges by iteration in $K = 300$ rounds. Is the single-step protocol cheaper per use? What if a larger network of the same type needs $K = 1200$ rounds for $N = 800$ agents?
:::

::: {.solution}
**Solution.** $N = 400$, $K = 300$: $K < N$, so iteration is cheaper ($120\,000$ against $160\,000$). $N = 800$, $K = 1200$: $K > N$, so the propagator is cheaper ($640\,000$ against $960\,000$), a factor of $1.5$.

**Significance.** Whether the propagator helps depends on how $K$ grows with $N$ for a given network; this is what the Lean break-even theorem states in general. Set-up costs come on top.
:::

::: {.problems #pr:flocks-wave-speed-line title="The wave speed in the line of birds"}
In the simulated line of birds of @sec:flocks-turn-crosses-flock the wave reaches bird $40$ at time $5.9$ (model units). What is its speed, and how does it compare with the value $\sqrt{50} = 7.1$ expected from the simulation's coupling?
:::

::: {.solution}
**Solution.** $40/5.9 = 6.8$ birds per unit time, about $4\,\%$ below $7.1$.

**Significance.** The arrival time is measured at half the final turn, which lags the leading edge slightly, and a discrete line of birds disperses short wavelengths; both make the measured speed a little lower than the ideal wave speed. The linear growth of arrival time with distance is the robust result.
:::
