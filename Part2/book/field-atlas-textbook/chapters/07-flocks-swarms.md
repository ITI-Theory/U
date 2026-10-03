# Flocks and Swarms

Flocks and swarms show order without a central conductor. Birds turn, fish school, bacteria swarm, and robots can coordinate with local rules. The scientific baseline is active matter: agents consume energy, move, and align with neighbors. This chapter introduces Vicsek-style alignment and Toner-Tu continuum fields before interpreting the Atlas swarm levels.

::: {.learning-objectives}
This chapter prepares readers to describe local alignment, compute a Vicsek time step and neighbor count, explain why noise can disorder a flock, distinguish agent and continuum models, and label [T]-Theory swarm propagator claims accurately.
:::

![Generated Vicsek-style local alignment field. Arrows represent moving agents whose directions are influenced by neighbors and noise.](figures/generated/ch07-vicsek.png){width="66%"}

## 7.1 Local rules, global order

The Vicsek model gives each agent a position and heading. At each step, an agent points toward the average heading of neighbors within a radius, then noise is added, and the agent moves forward [@vicsek1995novel]. Despite the simple rule, the population can shift from disorder to collective motion as density, speed, and noise change. The model is important because it shows how macroscopic order can arise from local interactions.

Local rules have limits. Real birds sense visually, avoid collisions, respond to wind, and use body dynamics. Fish sense pressure waves, insects use chemical and tactile cues, and robot swarms have communication constraints. A baseline model is therefore a controlled abstraction. It earns trust by matching selected data and by failing visibly when assumptions are wrong.

::: {.example title="Example 7.1 A Vicsek step and neighborhood"}
Suppose agents move at $12\,\mathrm{m\,s^{-1}}$ with time step $0.2\,\mathrm{s}$. Each step covers $12\times0.2=2.4\,\mathrm{m}$. If 200 agents occupy a $50\,\mathrm{m}\times50\,\mathrm{m}$ square, density is $0.08\,\mathrm{m^{-2}}$. With interaction radius $3\,\mathrm{m}$, the expected neighbor count is $\pi r^2\rho=\pi\cdot9\cdot0.08=2.26$.
:::

::: {.check-your-learning}
Increasing the interaction radius to $6\,\mathrm{m}$ multiplies the expected neighbor count by four because area scales as $r^2$.
:::

## 7.2 Continuum active matter

When many agents are present, a continuum field may describe density $\rho(\mathbf x,t)$ and velocity $\mathbf v(\mathbf x,t)$. Toner-Tu equations add active driving terms to hydrodynamic-looking equations [@toner1995long]. The mathematics resembles fluid mechanics but the material is not passive. Energy enters at the agent scale, and alignment can produce long-range order that would not occur in an equilibrium fluid.

Continuum models help connect swarms to waves and response. A turn can propagate through a flock faster than any one bird crosses the group. Density waves can travel through locust bands. Perturbations, boundaries, and noise all matter. The challenge is to estimate parameters from observation rather than merely drawing arrows over a photograph.

::: {.making-connections}
Biology 2e style treatments often begin with animal behavior, while physics texts begin with fields. This chapter deliberately uses both because active matter needs organisms and equations.
:::

## 7.3 Swarm propagator claims

The [T]-Theory swarm paper states a dense propagator update $Gs$ as a candidate alternative to repeated local gossip. The proof surface includes kernel-verified arithmetic for a cost comparison under assumptions: $N^2<NK$ when $N<K$. That fact does not prove that animals use dense matrices. It says that one abstract communication model can be cheaper than another in a specified parameter regime.

A good swarm falsifier is practical. In a drone or simulation test, a dense field update should outperform a local gossip baseline for large enough $K$ without requiring unavailable global information. If it fails, the class B new-behavior claim weakens. If it succeeds only in a toy simulator, the evidence label remains `simulated` until hardware or biological data are gathered.

::: {.soma-machine}
Inspect `#level=flock&lens=on&dim=11` and `#level=animal-swarm&lens=on&dim=11`. The visual similarity between arrows and fields should trigger a modelling question, not a conclusion.
:::

::: {.key-terms}
**Active matter:** many-body system whose components consume energy to move. **Vicsek model:** agent alignment model with noise. **Toner-Tu equations:** continuum theory for flocking matter. **Order-disorder transition:** change between incoherent and aligned collective motion. **Propagator update:** matrix-like transformation from one state to another.
:::

::: {.key-equations}
A Vicsek step is $\mathbf x_i(t+\Delta t)=\mathbf x_i(t)+v\Delta t\,\hat n_i(t+\Delta t)$. A schematic flock field has $\partial_t\mathbf v+\lambda(\mathbf v\cdot\nabla)\mathbf v=-\nabla P+D\nabla^2\mathbf v+\cdots$.
:::

::: {.summary}
Flocking models show how local alignment and noise produce collective order. Continuum active-matter fields describe density and velocity at larger scales. [T]-Theory swarm claims are meaningful only with their algorithmic assumptions and tests attached.
:::

::: {.review-questions}
1. Which parameters influence order in a Vicsek model? 2. Why is active matter not an equilibrium fluid? 3. What does the cost inequality $N^2<NK$ assume about $N$ and $K$?
:::

::: {.problems}
1. At $8\,\mathrm{m\,s^{-1}}$ and $0.5\,\mathrm{s}$, how far does an agent move? 2. Compute expected neighbors for density $0.05\,\mathrm{m^{-2}}$ and radius $4\,\mathrm{m}$. 3. Give one observation that could reject a flocking model.
:::
