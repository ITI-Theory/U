# The Human Level

Human-scale models must be humble because subjective life, physiology, memory, language, and social context all interact. A textbook treatment can still teach useful mathematics. This chapter introduces a Langevin equation for a noisy state variable, a double-well energy landscape, and a memory kernel. It then states exactly what QUANT-EXP-1 does and does not establish.

::: {.learning-objectives}
After studying this chapter, readers should be able to write a simple Langevin equation, explain wells and barriers, compute a Kramers-style escape ratio, describe a memory kernel, and identify QUANT-EXP-1 as a simulated model-class result rather than a clinical or hardware claim.
:::

![A generated double-well energy landscape. Two basins are separated by a barrier; noise, forcing, or changed dynamics can alter transition rates.](figures/generated/ch05-double-well.png){width="72%"}

## 5.1 Langevin dynamics and basins

A Langevin equation describes a variable pushed by deterministic forces and random fluctuations. A schematic affect coordinate $e(t)$ might be written as $\gamma\dot e=-\nabla H(e)+\sqrt{2D}\,\xi(t)+J(t)$. Here $H$ is an energy-like landscape, $D$ sets noise strength, $\xi$ is idealized white noise, and $J(t)$ is an external or internal drive. The equation is a model, not a diagnosis.

A double well has two locally stable regions. If the state starts near one minimum, small noise tends to keep it there. Larger perturbations can cross the barrier. Basins make path dependence visible: a present state may persist not because it is globally best, but because nearby changes are pulled back into the same well. This language is common in physics and dynamical systems; using it for affect requires operational variables and data.

::: {.example title="Example 5.1 Barrier sensitivity"}
Suppose a transition rate is proportional to $\exp(-\Delta H/D)$. Compare barriers $\Delta H=6$ and $\Delta H=3$ with the same noise level $D=0.75$. The high-barrier rate divided by the low-barrier rate is $\exp[-(6-3)/0.75]=\exp(-4)=0.0183$. In this simple model, doubling the barrier from 3 to 6 reduces transitions to about 1.8 percent of the lower-barrier rate.
:::

::: {.check-your-learning}
If the barrier difference is $2$ and $D=1$, the rate ratio is $e^{-2}=0.135$. The exponential form makes barrier estimates highly consequential.
:::

## 5.2 Memory kernels

A Markov model uses only the current state. Human response often depends on history, so a memory kernel can be added. A simple kernel is $K(\tau)=K_0e^{-\tau/\tau_m}\theta(\tau)$, where $\tau_m$ is a memory time and $\theta$ prevents future influence. The current force can then include an integral over past states. Such a model can express after-effects, priming, extinction, and delayed recovery.

Memory kernels are not automatically psychological truth. They are a way to test whether history improves prediction beyond a current-state model. If physiology, report, or behavior show no improvement when lagged terms are added, the kernel should be rejected or simplified. The [T]-Theory temporal paper treats retarded response as `derived-under-assumptions`; empirical validation remains separate.

::: {.making-connections}
Physics uses memory kernels in viscoelasticity and open systems. Neuroscience and psychology use related ideas when past stimulation changes present thresholds. The shared mathematics is useful, but each domain needs its own measurements.
:::

## 5.3 QUANT-EXP-1 as simulation

QUANT-EXP-1 is an exact 8-qubit statevector simulation over 256 states. The repository ledger states that quantum annealing reached the Awe basin in three of three tested barrier cases, while a cold classical baseline reached it in zero of 48 attempts. Those numbers are `simulated`. They are not evidence that quantum hardware was run, that therapy works by quantum computation, or that consciousness has been measured.

The useful teaching point is model comparison. A cold classical process can be trapped by a barrier in the chosen landscape, while a simulated annealing schedule using quantum amplitudes can have different reachability. The next scientific steps are fixed-seed tables, negative controls, noise-equivalence curves, and hardware or classical alternative baselines. Open claims must survive those comparisons.

::: {.soma-machine}
The human-level demo can be opened with `#level=human-vertebrate&lens=on&dim=11`. Read the basins as a visual explanation of a model; do not read them as clinical advice.
:::

::: {.key-terms}
**Langevin equation:** stochastic differential equation with deterministic and noise terms. **Basin:** region attracted toward a stable state. **Barrier:** energy difference that limits transitions. **Memory kernel:** weighted influence of past states. **Statevector simulation:** exact numerical representation of quantum amplitudes for a small system.
:::

::: {.key-equations}
$\gamma\dot e=-\nabla H(e)+\sqrt{2D}\,\xi(t)+J(t)$ is the schematic human-scale field equation. $K(\tau)=K_0e^{-\tau/\tau_m}\theta(\tau)$ is a causal exponential memory kernel.
:::

::: {.summary}
Human-level dynamics can be modelled with noisy basins and memory, but the variables must be operationalized. QUANT-EXP-1 is a simulated reachability result inside a small attractor model and carries the `simulated` evidence label.
:::

::: {.review-questions}
1. What does the noise strength $D$ control in a Langevin model? 2. Why does a memory kernel need causality? 3. Which claims does QUANT-EXP-1 explicitly not establish?
:::

::: {.problems}
1. Evaluate $e^{-3}$ to two significant figures. 2. A memory kernel has $\tau_m=5\,\mathrm{s}$. What fraction remains after $10\,\mathrm{s}$? 3. Describe one measurement that could test a human-scale basin model.
:::
