# Response: Green Functions, Resonance, and Damping

A response model asks what a system does after a source acts on it. Pushing a swing, tapping a wineglass, injecting current into a cell, and perturbing density in the early universe are different experiments, yet each can be described by a rule that converts input into output. The Green function is the response to an idealized impulse. Once that response is known, more complicated forcing can often be built by adding delayed and shifted copies.

::: {.learning-objectives}
After working through this chapter, students should be able to define an impulse response, read a damped oscillator equation, compute natural frequency and damping ratio, interpret resonance curves, and state why [T]-Theory response grammar is a modelling language rather than a universal proof.
:::

![Resonance curves generated for three damping ratios. A lightly damped oscillator responds sharply near its natural frequency; heavy damping spreads and lowers the peak.](figures/generated/ch02-resonance.png){width="78%"}

## 2.1 Impulses and Green functions

For a linear operator $L$, a Green function $G$ solves $LG=\delta$, where $\delta$ is an ideal impulse. If an external source $J(t)$ is spread over time, the output can be written as a convolution, $\phi(t)=\int G(t-t')J(t')\,dt'$. The equation is compact, but the physical interpretation depends on the domain. A heat kernel smooths temperature, a retarded electromagnetic Green function respects light-cone timing, and a membrane kernel attenuates voltage over distance.

Causality matters. A retarded Green function is zero before the source acts, so it does not let the future change the past. That point is essential for the Atlas. When a later chapter discusses memory kernels in affect or geology, the kernel must specify what earlier states are allowed to influence and how quickly the effect decays.

::: {.example title="Example 2.1 Damped oscillator constants"}
A mass-spring system has $m=1\,\mathrm{kg}$, spring constant $k=16\,\mathrm{N\,m^{-1}}$, and damping coefficient $c=2\,\mathrm{kg\,s^{-1}}$. The natural angular frequency is $\omega_0=\sqrt{k/m}=4\,\mathrm{rad\,s^{-1}}$. The damping ratio is $\zeta=c/(2\sqrt{km})=2/(2\cdot4)=0.25$. The damped angular frequency is $\omega_d=\omega_0\sqrt{1-\zeta^2}=4\sqrt{0.9375}=3.873\,\mathrm{rad\,s^{-1}}$.
:::

::: {.check-your-learning}
If $k=9\,\mathrm{N\,m^{-1}}$ and $m=1\,\mathrm{kg}$, then $\omega_0=3\,\mathrm{rad\,s^{-1}}$. If $c=3$, the damping ratio is $3/(2\cdot3)=0.5$.
:::

## 2.2 Resonance is selective response

Resonance occurs when forcing efficiently transfers energy into a mode. The phenomenon is not mystical amplification; it is a match between the drive and the system's allowed motion. Damping prevents unlimited growth by converting organized motion into heat or other degrees of freedom. Engineering therefore treats resonance as both useful and dangerous: musical instruments need it, bridges and turbine blades must survive it, and seismology uses it to infer Earth's interior.

Quality factor $Q$ summarizes how narrow a resonance is. For a lightly damped oscillator, $Q\approx1/(2\zeta)$. The example above gives $Q=2$. That value is not extremely sharp; a tuning fork may have a much larger $Q$, while a heavily damped shock absorber has a smaller one. Numbers keep the word resonance from becoming a generic synonym for sympathy.

::: {.making-connections}
Open science textbooks often introduce resonance with sound, circuits, and mechanical oscillators before moving to quantum or astrophysical examples. This edition follows that route because [T]-Theory uses response grammar across scales; the safest bridge is a concrete equation with units.
:::

## 2.3 Evidence-labelled response grammar

The Field Atlas uses the response pattern $L\phi=J$ as a cross-scale grammar. In the Differences Ledger this is class C when it unifies notation across domains and class B when a specific model predicts new behavior. The grammar itself is `derived-under-assumptions`: it follows from choosing variables, operators, and boundaries, not from a measurement that all systems are physically identical.

A proposed [T]-Theory response claim should therefore include a falsifier. If a dyadic timing model says that a coupling kernel predicts phase locking, data with no timing improvement over a no-coupling baseline would count against that model. If a cosmology overlay predicts a fixed density ratio, improved observational constraints can move the discrepancy meter. Response language earns its place by making such tests easier to state.

::: {.soma-machine}
The response panels can be compared with `#level=human-vertebrate&lens=on&dim=11` and `#level=stellar&lens=on&dim=11`. Users should look for source, operator, boundary, and observable before reading the interpretive overlay.
:::

::: {.key-terms}
**Impulse response:** output caused by an ideal brief input. **Green function:** mathematical object that builds responses to general sources. **Resonance:** enhanced response near a mode frequency. **Damping:** loss of organized energy from a mode. **Quality factor:** measure of resonance sharpness.
:::

::: {.key-equations}
$LG=\delta$ defines a Green function. $\phi(t)=\int G(t-t')J(t')\,dt'$ gives a convolution response. For a damped oscillator, $m\ddot x+c\dot x+kx=F(t)$ and $\zeta=c/(2\sqrt{km})$.
:::

::: {.summary}
Green functions turn impulse response into a reusable calculation. Resonance describes selective amplification, while damping limits and broadens the response. [T]-Theory adopts this response grammar under stated modelling assumptions and must attach evidence labels to each cross-scale use.
:::

::: {.review-questions}
1. Why does a retarded Green function vanish before the source time? 2. How does damping change a resonance peak? 3. What information is missing from a claim that merely says two systems resonate?
:::

::: {.problems}
1. Compute $Q$ for $\zeta=0.05$. 2. A kernel decays as $e^{-t/4}$ seconds. What fraction remains after $8\,\mathrm{s}$? 3. Explain why convolution assumes linear superposition.
:::
