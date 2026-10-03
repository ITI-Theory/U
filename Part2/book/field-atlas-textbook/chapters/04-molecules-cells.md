# Molecules and Cells

Molecules introduce shape, charge distribution, binding energy, and thermal motion. Cells add membranes, pumps, channels, cytoskeleton, metabolism, and signalling. A cell is not a bag of quantum states waiting to be read psychologically; it is a maintained nonequilibrium system. This chapter uses the cable equation and the action potential to show how a living boundary turns molecular machinery into an electrical field variable.

::: {.learning-objectives}
Readers should be able to describe membrane potential, compute a passive cable length constant, distinguish passive spread from an action potential, connect molecular channels to cellular excitability, and identify the cellular demo as a visual model rather than empirical proof.
:::

![Figure 4.1. Passive cable attenuation generated for four times. Voltage decays across distance and time unless active channels regenerate the signal.](figures/generated/ch04-cable.png){width="78%"}

## 4.1 From molecules to membranes

A phospholipid membrane separates charge and concentration. Ion channels and pumps make the separation dynamic: sodium, potassium, chloride, and calcium gradients store electrochemical energy. The membrane potential is a voltage difference across a very thin insulating layer, so a small number of open channels can change the local field strongly. Molecular events therefore become a mesoscopic electrical variable.

The passive cable equation is a first approximation for voltage spread along a neurite. In one common form, $C_m\partial_tV=D\partial_x^2V-V/R_m+I(x,t)$, where $C_m$ is membrane capacitance, $R_m$ is membrane resistance per area, and $D$ packages geometry and axial resistance. The equation says that voltage diffuses along the cable while leaking through the membrane.

::: {.example title="Example 4.1 A passive length constant"}
For a cylindrical neurite with radius $a=5\,\mu\mathrm{m}$, membrane resistance $R_m=1\,\Omega\,\mathrm{m^2}$, and internal resistivity $R_i=1\,\Omega\,\mathrm{m}$, a standard estimate is $\lambda=\sqrt{aR_m/(2R_i)}$. Substitution gives $\lambda=\sqrt{5\times10^{-6}/2}=1.58\times10^{-3}\,\mathrm{m}$, or $1.58\,\mathrm{mm}$.
:::

::: {.check-your-learning}
If $R_m=1\,\Omega\,\mathrm{m^2}$ and $C_m=0.01\,\mathrm{F\,m^{-2}}$, the membrane time constant is $\tau=R_mC_m=0.01\,\mathrm{s}=10\,\mathrm{ms}$.
:::

## 4.2 Action potentials are regenerated waves

Passive spread fades. An action potential travels because voltage-gated sodium and potassium channels open and close in sequence, regenerating the signal along the membrane. Hodgkin and Huxley modelled this process with coupled differential equations for voltage and channel gates [@hodgkin1952quantitative]. The spike is all-or-none in a practical sense: below threshold the perturbation decays, while above threshold active conductances produce a stereotyped travelling pulse.

Threshold language must be used carefully. A neuronal threshold is not a single magic voltage for all cells; it depends on channel densities, recent history, temperature, and morphology. The field lesson is that a local boundary with active components can turn graded molecular events into a macroscopic signal. That lesson becomes important when later chapters discuss attractor basins and collective phase locking.

::: {.making-connections}
Biology textbooks introduce membranes before neurons because excitability is built from molecular transport. The Atlas follows the same order: molecules set the parts, the cell establishes a maintained boundary, and the wave becomes meaningful only inside that boundary.
:::

## 4.3 The cellular demo and evidence label

The Soma Machine cellular plate shows a membrane-like domain, local sources, and response contours. It is a teaching visualization. Unless paired with an experiment, it should be labelled `interpretive` or `simulated` depending on the exact panel. The underlying biology of action potentials is empirical science; the Atlas overlay that reads cellular response as part of an eleven-dimensional somatic lens is an open modelling proposal.

Useful falsifiers can still be stated. If a proposed cellular field model predicts a measurable relation between channel distribution and response timing, patch-clamp or imaging data can test it. If the model only renames known electrophysiology without new predictions, it remains a class D reinterpretation. Open science practice prefers the first path because data can improve or reject the model.

::: {.soma-machine}
Open `#level=cellular-synaptic&lens=on&dim=11` to compare the visual cell demo with the cable equation. The deep link is a prompt to ask which variables are measured and which are illustrative.
:::

::: {.key-terms}
**Membrane potential:** voltage difference across a cell membrane. **Cable equation:** diffusion-leak approximation for voltage along a neurite. **Length constant:** distance over which passive voltage falls by a factor of $e$. **Action potential:** actively regenerated electrical pulse. **Ion channel:** membrane protein that conducts selected ions.
:::

::: {.key-equations}
A passive form is $C_m\partial_tV=D\partial_x^2V-V/R_m+I$. The length constant estimate is $\lambda=\sqrt{aR_m/(2R_i)}$. The time constant is $\tau=R_mC_m$.
:::

::: {.summary}
Cells convert molecular transport into maintained electrical boundaries. Passive cable theory gives measurable length and time constants, while action potentials require active channels. The cellular Atlas demo is a labelled visual model, not proof of a biological [T]-Theory mechanism.
:::

::: {.review-questions}
1. Why does passive voltage spread decay? 2. What makes an action potential regenerative? 3. Which evidence label fits a visualization without new measurements?
:::

::: {.problems}
1. Double the radius in Example 4.1 while keeping other values fixed. By what factor does $\lambda$ change? 2. A passive signal travels one length constant. What fraction of voltage remains? 3. Name two channel types in the Hodgkin-Huxley model.
:::