# Two People and Groups

Coordination can be visible before anyone explains it. Two walkers fall into step, a choir aligns entrances, and applause sometimes becomes rhythmic. Phase models offer a compact way to study these events without pretending that people are identical oscillators. This chapter uses Adler and Kuramoto equations to teach synchronization, then places dyads and groups in the Atlas with evidence labels.

::: {.learning-objectives}
Students should be able to define phase, write a two-oscillator locking condition, compute a fixed phase difference, describe the Kuramoto order parameter, and separate measured synchrony from interpretive claims about attunement.
:::

![Figure 6.1. Generated dyadic phase curves. Stronger coupling reduces phase difference more quickly in this illustrative model.](figures/generated/ch06-kuramoto.png){width="72%"}

## 6.1 Phase and locking

An oscillator phase records where a repeating process is in its cycle. For two weakly coupled oscillators, the phase difference $\phi$ can obey an Adler equation, $\dot\phi=\Delta\omega-K\sin\phi$, where $\Delta\omega$ is the natural frequency mismatch and $K$ is coupling strength. If $|\Delta\omega|<K$, a stable fixed phase difference can exist. If the mismatch is too large, the phase drifts.

This model deliberately ignores many human details. It does not know why two people coordinate, whether coordination is desired, or what meaning it carries. Its value is narrower: it predicts timing relations from mismatch and coupling. In experiments, phase can be estimated from gait, speech envelope, respiration, tapping, or neural rhythms, depending on the question.

::: {.example title="Example 6.1 Dyadic lock angle"}
Two rhythms differ by $\Delta\omega=0.4\,\mathrm{rad\,s^{-1}}$ and have coupling $K=0.7\,\mathrm{rad\,s^{-1}}$. A locked solution satisfies $\sin\phi=\Delta\omega/K=0.5714$. Therefore $\phi=\sin^{-1}(0.5714)=34.85^\circ$. Because the mismatch is smaller than the coupling, locking is possible in this model.
:::

::: {.check-your-learning}
If $\Delta\omega=1.1$ and $K=0.8$ in the same units, locking is not possible because the mismatch exceeds the coupling.
:::

## 6.2 Many oscillators

The Kuramoto model extends phase coupling to many oscillators: $\dot\theta_i=\omega_i+K/N\sum_j\sin(\theta_j-\theta_i)$. The order parameter $r$ ranges from near 0 for dispersed phases to near 1 for strong alignment. As coupling increases, the population can pass through a synchronization transition. This model has been used for chemical oscillators, circadian rhythms, power grids, and social timing [@kuramoto1984chemical; @strogatz2003sync].

Groups add network structure. Not everyone couples to everyone else equally, and leaders, delays, attention, and fatigue matter. A choir, a protest march, a therapy group, and a city crowd have different channels and ethical stakes. The mathematical baseline helps ask whether timing data show coupling; it does not by itself define health, truth, or collective feeling.

::: {.making-connections}
Psychology and neuroscience often distinguish synchrony, mimicry, rapport, and shared attention. The phase model touches only the timing layer. A good Atlas panel should state what layer is being measured.
:::

## 6.3 Dyad and group Atlas readings

The dyad level in the registry uses phase locking as its baseline equation. The [T]-Theory reading of therapeutic attunement is class B or C depending on the claim: new behavior when a model predicts measurable transitions, cross-scale unification when the same response grammar is reused. Much of the current dyadic language remains `interpretive` until pre-registered measurements link coupling parameters to outcomes.

For human groups, the caution grows. Synchronization can support cooperation, but it can also support coercion or panic. Open science requires neutral variables, consent-aware experiments, and falsifiers. If a group-field model predicts that coupling strength changes before a collective transition, time-series data should test that prediction against simpler contagion or network models.

::: {.soma-machine}
The dyad demo uses `#level=dyad&lens=on&dim=11`. Compare it with `#level=human-group&lens=on&dim=11` to see how the same phase vocabulary changes when network size grows.
:::

::: {.key-terms}
**Phase:** position within an oscillatory cycle. **Frequency mismatch:** difference between natural angular frequencies. **Phase locking:** stable phase relation. **Order parameter:** summary of population synchrony. **Attunement:** interpretive or measured coordination depending on operational definition.
:::

::: {.key-equations}
The Adler equation is $\dot\phi=\Delta\omega-K\sin\phi$. A Kuramoto population uses $\dot\theta_i=\omega_i+\frac{K}{N}\sum_j\sin(\theta_j-\theta_i)$.
:::

::: {.summary}
Phase models show how coupling can overcome frequency mismatch. Dyadic and group Atlas panels should treat synchrony as a measurable timing relation first and only then discuss interpretive attunement with labels.
:::

::: {.review-questions}
1. What condition allows two-oscillator locking? 2. What does the Kuramoto order parameter measure? 3. Why can synchrony be ethically ambiguous in groups?
:::

::: {.problems}
1. Find the lock angle for $\Delta\omega=0.2$ and $K=0.5$. 2. What happens to $r$ when phases are uniformly spread around the circle? 3. Name one variable that could serve as phase in a dyad study.
:::