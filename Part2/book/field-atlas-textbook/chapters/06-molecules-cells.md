# Molecules and Cells: From Bonds to Spikes {#ch:cells}

![A model nerve membrane kicked four times, each kick lasting one millisecond. The two smaller kicks die away. The two larger ones fire a full spike to about $+40\,\mathrm{mV}$, however large the kick. Right: the peak voltage against kick size jumps at one value, the threshold. The curves are a simulation of the Hodgkin–Huxley equations.](figures/generated/ch04-banner.png){.opener}

A living cell is a small bag of salt water wrapped in an oily film five nanometres thick. Across that film it holds a voltage of about seventy millivolts, and by opening and closing molecular pores it can send a pulse of voltage along a fibre a metre long in a few hundredths of a second. Every thought, heartbeat and movement depends on this. This chapter climbs from the chemical bond to the nerve impulse using only ideas already in the book: the energy scales of @ch:atoms, the response kernels of @ch:response, and one new ingredient, a threshold. It ends with networks of threshold cells that store memories, which is where the programme behind this Atlas makes its proposal.

**Chapter outline.** [-@sec:cells-strong-bonds-weak] Strong bonds, weak bonds and the thermal bath · [-@sec:cells-membrane-charged-capacitor] The membrane: a charged capacitor · [-@sec:cells-passive-spread-cable] Passive spread: the cable · [-@sec:cells-action-potential-all] The action potential: all or none · [-@sec:cells-cells-networks-memory] From cells to networks: memory as a landscape · [-@sec:cells-field-that-tunes] A field that tunes the landscape

## Strong bonds, weak bonds and the thermal bath {#sec:cells-strong-bonds-weak}

::: {.learning-objectives}
- compare bond energies with the thermal energy $k_BT$;
- convert between electronvolts per molecule and kilojoules per mole;
- explain why living matter depends on weak bonds.
:::

@ch:atoms showed that squeezing an electron into an atom costs a few electronvolts. When two atoms share electrons in a **covalent bond**, the energy gained is of the same order: $4.5\,\mathrm{eV}$ for the hydrogen molecule, $3$ to $4\,\mathrm{eV}$ for the carbon–carbon and carbon–hydrogen bonds of organic matter. Chemists quote the same energies per mole of bonds; since $1\,\mathrm{eV}$ per molecule is $96.5\,\mathrm{kJ\,mol^{-1}}$, a $4.5\,\mathrm{eV}$ bond is $430\,\mathrm{kJ\,mol^{-1}}$.

What matters for life is how these energies compare with the random jostling of molecules at body temperature, $k_BT = 0.0267\,\mathrm{eV}$ at $310\,\mathrm{K}$. A covalent bond is about 170 times larger, and the chance that a thermal collision supplies that much energy is of order $e^{-170}$: effectively zero. Covalent bonds hold the molecule's shape. Much weaker interactions hold molecules to each other. A **hydrogen bond**, the attraction between a hydrogen atom on one molecule and an oxygen or nitrogen atom on another, is about $0.2\,\mathrm{eV}$, only seven or eight times $k_BT$. In water such bonds break and re-form within a few trillionths of a second. They zip the two strands of DNA together, fold proteins into working shapes and let enzymes grip and release their targets. Life operates in the narrow band where bonds are strong enough to hold a structure for a while and weak enough to let it change.

::: {.example #ex:cells-cells-energy-currency title="The cell's energy currency"}
Inside a cell, splitting one molecule of ATP releases about $50\,\mathrm{kJ\,mol^{-1}}$. Express this per molecule in electronvolts and in units of $k_BT$ at body temperature.

**Strategy.** Divide by $96.5\,\mathrm{kJ\,mol^{-1}}$ per eV, then by $0.0267\,\mathrm{eV}$.

**Solution.** $50/96.5 = 0.52\,\mathrm{eV}$ per molecule, and $0.52/0.0267 = 19$, so one ATP delivers about $19\,k_BT$.

**Significance.** The packet is well matched to its jobs: large enough to drive a molecular motor or pump one ion uphill against the thermal bath, small enough to be made and spent by the billion each second. It is about a quarter of the energy of one visible photon.
:::

::: {.check-your-learning}
Carbon dioxide absorbs infrared radiation at a wavelength of $15\,\mu\mathrm{m}$ by vibrating. What is the photon energy, and how does it compare with $k_BT$? (Answer: $1240/15\,000 = 0.083\,\mathrm{eV}$, about $3\,k_BT$; molecular vibrations sit just above the thermal scale, which is why warm objects radiate in the infrared.)
:::

## The membrane: a charged capacitor {#sec:cells-membrane-charged-capacitor}

::: {.learning-objectives}
- model a cell membrane as a capacitor;
- compute an equilibrium (Nernst) potential from ion concentrations;
- estimate how many ions it takes to charge a cell.
:::

Every cell is enclosed by a **lipid bilayer**, two layers of oily molecules about $5\,\mathrm{nm}$ thick. Ions cannot cross it except through protein **channels** and **pumps**. The pumps spend ATP to keep potassium concentrated inside the cell (about $140\,\mathrm{mmol\,L^{-1}}$ against $5$ outside) and sodium concentrated outside ($145$ against $12$). The bilayer is an insulator between two conducting salt solutions, so electrically it is a **capacitor**, with capacitance close to $C_m = 1\,\mu\mathrm{F\,cm^{-2}} = 0.01\,\mathrm{F\,m^{-2}}$ for every cell membrane ever measured.

Suppose only potassium channels are open. Potassium leaks out down its concentration gradient, carrying positive charge, and the inside becomes negative. The growing voltage pulls potassium back in. The flows balance when the electrical energy $eV$ matches the thermal tendency to spread out, at the **Nernst potential**

$$E_\text{ion} = \frac{k_BT}{ze}\ln\frac{c_\text{out}}{c_\text{in}},$$ {#eq:cells-nernst}

where $z$ is the ion's charge number. At body temperature $k_BT/e = 26.7\,\mathrm{mV}$. A real resting cell has some sodium and chloride channels open too, and settles between the individual Nernst potentials, usually near $-70\,\mathrm{mV}$, closest to potassium's.

::: {.example #ex:cells-nernst-potentials title="Two Nernst potentials"}
Compute the Nernst potentials for potassium ($5$ outside, $140$ inside) and sodium ($145$ outside, $12$ inside) at $310\,\mathrm{K}$.

**Strategy.** Both ions have $z = +1$; apply the formula with $k_BT/e = 26.7\,\mathrm{mV}$.

**Solution.** $E_\mathrm{K} = 26.7\ln(5/140) = 26.7\times(-3.33) = -89\,\mathrm{mV}$. $E_\mathrm{Na} = 26.7\ln(145/12) = 26.7\times2.49 = +67\,\mathrm{mV}$.

**Significance.** The two ions pull the membrane towards opposite voltages $156\,\mathrm{mV}$ apart. Whichever set of channels is more open wins. At rest potassium wins and the cell sits near $-70\,\mathrm{mV}$; @sec:cells-action-potential-all shows what happens when sodium briefly wins.
:::

{{Visualize | ex:cells-nernst-potentials | function-plot:neural | f="26.7*log(x)"; x=[0.01,100]; logx=true; value_at=5/140; expect_value=-89; hline="-70, 67"; vline="12.08"; xlabel="concentration ratio, outside / inside"; ylabel="equilibrium potential (mV)"; label=fig:cells-nernst; height=28% }} The Nernst potential of @eq:cells-nernst against the concentration ratio: a straight line on a logarithmic axis, $61.5\,\mathrm{mV}$ for every factor of ten. Potassium (ratio $1/28$, red point) sits at $-89\,\mathrm{mV}$; sodium (ratio $12$, dotted) at $+67\,\mathrm{mV}$. The resting cell, at $-70\,\mathrm{mV}$ (lower dotted line), lies between them, nearer potassium.

::: {.example #ex:cells-few-ions title="How few ions?"}
A spherical cell of radius $10\,\mu\mathrm{m}$ rests at $-70\,\mathrm{mV}$. How many ions must cross its membrane to set up this voltage, and what fraction is that of the potassium ions inside?

**Strategy.** The charge is $Q = C_mAV$; divide by $e$. Count potassium from the concentration and volume.

**Solution.** $A = 4\pi(10^{-5})^2 = 1.26\times10^{-9}\,\mathrm{m^2}$, so $C = 0.01\times1.26\times10^{-9} = 1.26\times10^{-11}\,\mathrm{F}$ and $Q = 1.26\times10^{-11}\times0.070 = 8.8\times10^{-13}\,\mathrm{C}$, which is $5.5\times10^{6}$ ions. The cell's volume is $4.19\times10^{-12}\,\mathrm{L}$, holding $0.140\times4.19\times10^{-12}\times6.02\times10^{23} = 3.5\times10^{11}$ potassium ions. The fraction is $1.6\times10^{-5}$, one ion in sixty thousand.

**Significance.** The voltage is set by a vanishingly thin sheet of charge at the membrane; the bulk of the cell stays electrically neutral. That is why a cell can fire thousands of impulses without measurably changing its concentrations, and why the pumps have time to restore them.
:::

::: {.check-your-learning}
What is the electric field inside a $5\,\mathrm{nm}$ membrane at $-70\,\mathrm{mV}$? (Answer: $0.070/5\times10^{-9} = 1.4\times10^{7}\,\mathrm{V\,m^{-1}}$, the value met in @ch:fields, about five times the field at which air breaks down into sparks.)
:::

## Passive spread: the cable {#sec:cells-passive-spread-cable}

::: {.learning-objectives}
- write the cable equation and identify its length and time constants;
- compute how far a steady voltage spreads along a fibre;
- recognise the cable's response as a @ch:response Green's function.
:::

A nerve fibre is a long thin tube of salt water inside a leaky insulating membrane, like an undersea telegraph cable with poor insulation; the mathematics is the same, and is called **cable theory** [@rall1962theory]. Current injected at one point flows along the inside, but some leaks out through the membrane at every step. The voltage obeys

$$\tau\frac{\partial V}{\partial t} = \lambda^2\frac{\partial^2V}{\partial x^2} - V + R_mI(x,t),$$

with a **time constant** $\tau = R_mC_m$ and a **length constant**

$$\lambda = \sqrt{\frac{aR_m}{2R_i}},$$

where $a$ is the fibre's radius, $R_m$ the membrane's resistance times area, and $R_i$ the resistivity of the fluid inside. A steady injection gives $V(x) = V_0e^{-|x|/\lambda}$: the voltage falls by a factor $e$ in every length constant. This is the short-range response of @sec:response-response-space-far, with $\lambda$ playing the part of the range. A single brief kick spreads out and leaks away at the same time, as the figure below shows: the cable's Green's function.

![Left: the cable's response to one brief kick of current at $x = 0$, at four times. The voltage spreads like heat and leaks through the membrane. Right: a steady injection gives an exponential fall with distance; one length constant leaves 37 %.](figures/generated/ch04-cable.png){width="100%"}

::: {.example #ex:cells-length-constant title="A length constant"}
A dendrite of radius $a = 5\,\mu\mathrm{m}$ has $R_m = 1\,\Omega\,\mathrm{m^2}$ and $R_i = 1\,\Omega\,\mathrm{m}$, typical values. Find $\lambda$ and $\tau$, and the fraction of a steady voltage that survives $1\,\mathrm{mm}$ along the fibre.

**Strategy.** Substitute into the two formulas, then use $e^{-x/\lambda}$.

**Solution.** $\lambda = \sqrt{5\times10^{-6}\times1/(2\times1)} = 1.58\times10^{-3}\,\mathrm{m} = 1.58\,\mathrm{mm}$. $\tau = 1\times0.01 = 0.01\,\mathrm{s} = 10\,\mathrm{ms}$. At $1\,\mathrm{mm}$, $e^{-1/1.58} = 0.53$ survives.

**Significance.** Passive spread works over a millimetre or so, enough to carry signals across a single neuron's branches, but a metre-long fibre would attenuate any passive signal by a factor of $e^{-600}$. Long-distance signalling needs something better: a signal that is rebuilt as it goes.
:::

::: {.check-your-learning}
How much of a steady voltage survives three length constants along a cable? (Answer: $e^{-3} = 0.050$, five per cent.)
:::

## The action potential: all or none {#sec:cells-action-potential-all}

::: {.learning-objectives}
- describe the sequence of channel events in an action potential;
- explain the threshold, all-or-none response and refractory period;
- relate conduction speed to fibre structure.
:::

The cell's answer is the **action potential**, a pulse of about $100\,\mathrm{mV}$ lasting a millisecond that regenerates itself as it travels. Hodgkin and Huxley worked out its mechanism in 1952 by measuring the currents through the giant nerve fibre of a squid and fitting them with four coupled equations [@hodgkin1952quantitative]. The sequence is:

1. A small depolarisation opens some voltage-gated sodium channels.
2. Sodium rushes in, pulling the voltage towards $E_\mathrm{Na} = +67\,\mathrm{mV}$, which opens more sodium channels: positive feedback.
3. Within a millisecond the sodium channels shut themselves (**inactivation**) and slower potassium channels open, pulling the voltage back down past rest.
4. For a millisecond or two the sodium channels cannot reopen. This is the **refractory period**.

The positive feedback in step 2 is what makes the response all-or-none. The opening figure shows the Hodgkin–Huxley equations kicked by one-millisecond pulses. A kick of $6.5\,\mu\mathrm{A\,cm^{-2}}$ raises the voltage by about $6\,\mathrm{mV}$ and dies away like any damped response of @ch:response. A kick of $7\,\mu\mathrm{A\,cm^{-2}}$, eight per cent larger, fires a full spike to $+36\,\mathrm{mV}$; a kick three times larger fires a spike barely taller. Below **threshold** the leak wins; above it the sodium feedback wins and the rest of the response is set by the channels, not by the kick.

The threshold has a signature worth noticing in the figure. The spike from the $7\,\mu\mathrm{A\,cm^{-2}}$ kick arrives about $5\,\mathrm{ms}$ after the kick, the one from $20\,\mu\mathrm{A\,cm^{-2}}$ after one and a half. Near the threshold, feedback and leak almost cancel, so the voltage hesitates before deciding which way to go. In the language of @ch:atoms, a small disturbance about rest decays because the poles of its response lie below the real axis; the feedback moves the dominant pole towards the axis, and the closer it comes, the slower the decay or growth. This **critical slowing down** appears wherever a system approaches a tipping point. It will reappear in @ch:human for switches between emotional states and in @ch:earth for the climate.

The impulse travels because the inrushing sodium current spreads passively a short way ahead, as in @sec:cells-passive-spread-cable, and lifts the next patch of membrane over threshold. The refractory patch behind stops it turning back. The squid fibre, $0.5\,\mathrm{mm}$ thick, conducts at about $21\,\mathrm{m\,s^{-1}}$; Hodgkin and Huxley's equations predicted $18.8$. Vertebrates do better by wrapping fibres in **myelin**, an insulating sheath interrupted every millimetre or so. The impulse jumps from gap to gap at up to $120\,\mathrm{m\,s^{-1}}$ in a fibre twenty-five times thinner than the squid's.

::: {.example #ex:cells-reflex title="A reflex"}
A tap below the knee sends an impulse along a sensory fibre $1.0\,\mathrm{m}$ long to the spinal cord at $60\,\mathrm{m\,s^{-1}}$. A motor command returns along a similar fibre. Ignoring the time spent at the synapses and in the muscle, how long does the round trip take?

**Strategy.** Time is distance over speed, for each leg.

**Solution.** One leg: $1.0/60 = 0.017\,\mathrm{s} = 17\,\mathrm{ms}$. Round trip: $33\,\mathrm{ms}$.

**Significance.** The measured knee-jerk delay is a little longer, because the synapse and the muscle add a few milliseconds each. It is still far faster than any deliberate response, which needs the brain and takes a fifth of a second or more. The difference between a reflex and a decision is partly a matter of how many kernels the signal passes through.
:::

::: {.check-your-learning}
If the refractory period is $2\,\mathrm{ms}$, what is the highest rate at which a fibre can fire? (Answer: $1/0.002 = 500$ impulses per second.)
:::

## From cells to networks: memory as a landscape {#sec:cells-cells-networks-memory}

::: {.learning-objectives}
- describe a Hopfield network and its energy function;
- show by hand how a network recovers a stored pattern;
- state the approximate capacity of a Hopfield network.
:::

A neuron passes its spike to others through **synapses**, junctions whose strength can change with use. In 1949 Donald Hebb proposed that a synapse strengthens when the cells on both sides are active together, which is summarised as "cells that fire together wire together". In 1982 John Hopfield showed what such a rule achieves in a network [@hopfield1982].

Represent each of $N$ neurons by $s_i = +1$ (firing) or $-1$ (silent), and each synapse by a weight $w_{ij}$. Each neuron in turn takes the sign of its total input, $s_i \to \operatorname{sign}\big(\sum_j w_{ij}s_j\big)$. With symmetric weights, every such update can only lower the network's **energy**

$$E = -\frac12\sum_{i \ne j}w_{ij}s_is_j,$$

so the network rolls downhill until it reaches a minimum and stops. To store a pattern $\xi$ (a list of $\pm1$ values), set the weights by Hebb's rule, $w_{ij} = \xi_i\xi_j/N$. The pattern then sits at the bottom of a valley of the energy landscape, and any nearby state, a corrupted or partial version of the pattern, rolls back into it. Memory becomes geography: remembering is falling into the right valley. Several patterns can be stored by adding their weights; the valleys stay distinct until about $0.14N$ patterns are stored, after which they merge and recall fails.

::: {.example #ex:cells-threeneuron-memory title="A three-neuron memory"}
Store the pattern $\xi = (+1, -1, +1)$ in a three-neuron network. Start the network in the corrupted state $(+1, +1, +1)$, update neuron 2, and compare the energies before and after.

**Strategy.** Build the weights with Hebb's rule, compute the input to neuron 2, then evaluate $E$, which for three neurons is $-(w_{12}s_1s_2 + w_{13}s_1s_3 + w_{23}s_2s_3)$.

**Solution.** $w_{12} = (+1)(-1)/3 = -\tfrac13$, $w_{13} = +\tfrac13$, $w_{23} = -\tfrac13$. Neuron 2's input is $w_{21}s_1 + w_{23}s_3 = -\tfrac13 - \tfrac13 = -\tfrac23$, so it flips to $-1$ and the network holds the stored pattern. Energy before: $-(-\tfrac13 + \tfrac13 - \tfrac13) = +\tfrac13$. After: $-(\tfrac13 + \tfrac13 + \tfrac13) = -1$.

**Significance.** One update repaired the error and lowered the energy from $+\tfrac13$ to $-1$, the bottom of the valley. A network of $10^{11}$ neurons does this with millions of patterns, which is one leading model of how partial cues recall whole memories.
:::

::: {.making-connections title="Making Connections — Two neurons firing together"}
@ch:response showed that two kicks reinforce or cancel depending on their timing. At a synapse the timing is everything: an input arriving while the receiving cell is already near threshold can tip it over, and the same input during its refractory period does nothing. Hebb's rule turns this into memory, because repeated coincidences strengthen the connection. @ch:groups takes the same arithmetic up two levels, to people who fall into step.
:::

## A field that tunes the landscape {#sec:cells-field-that-tunes}

::: {.learning-objectives}
- state the programme's field-modulated network and its two coupling equations;
- explain what the Lean correspondence theorem does and does not establish;
- label each part of the cellular reading correctly.
:::

Everything up to @sec:cells-cells-networks-memory is standard science. The Missing Limbic Layer paper [@P13] adds one assumption to the Hopfield network. The landscape is not fixed: a slowly varying somatic field $\Phi(t)$, representing the state of the body, changes both the shape of the valleys and how sharply the network falls into them. In its notation the weights and a temperature become

$$W(t) = W_0 + \gamma\,\Phi(t)\,J, \qquad T(t) = T_0 + \sigma\,\Phi(t),$$

where $W_0$ are the stored memories, $J$ is a fixed coupling pattern, and $\gamma$ and $\sigma$ set the strength of the effect. The update uses a modern, smooth form of Hopfield's rule whose sharpness is set by $\beta = 1/T$. The paper calls the result the **Field-Modulated Hopfield Network** (FM-HN). In plain terms: a body under stress (large $\Phi$) recalls with a different landscape and less precision than a calm body, so the same cue can fall into a different valley.

The paper also checks that the extension does not discard the science it extends, which it calls a **correspondence principle** after Bohr's. With $\Phi = 0$ the coupling terms vanish and the network is the standard one; as $\beta \to \infty$ the smooth rule becomes Hopfield's sign rule of 1982. The first statement is machine-checked in Lean as `LimbicHopfield.correspondence_principle` [@D2]. It is true by substitution, and the checker confirms that the definitions say what the paper says they say, nothing more. The second is standard mathematics, but its Lean proof is still listed as an open obligation.

| Claim | Label |
|:--|:--|
| Nernst potentials, cable spread and the all-or-none spike | `empirical-result` |
| A Hopfield network stores patterns as energy minima, up to about $0.14N$ | `derived-under-assumptions` |
| The FM-HN reduces to the standard network when $\Phi = 0$ | `kernel-verified` [@D2] |
| The smooth update tends to Hopfield's sign rule as $\beta \to \infty$ | `derived-under-assumptions` (Lean proof open) |
| A body-wide somatic field modulates the weights and temperature of limbic memory | `open-hypothesis` |

The open hypothesis is testable in principle: if measured arousal plays the role of $\Phi$, recall under arousal should shift in the direction and by the amount the coupling equations predict, and the shift should vanish as arousal returns to baseline. The reading makes no claim that a single cell feels anything. The membrane supplies a threshold and a memory; whatever experience is, the programme places it several levels higher (@ch:human).

::: {.soma-machine}
Open `#level=cellular-synaptic&lens=on&dim=4` and press **Poke field**: the 4D view runs the passive cable equation of @sec:cells-passive-spread-cable, and the poke spreads and fades. Switch to `dim=8`: the model becomes a leaky neuron with a threshold. Poke once and it spikes; poke again at once and the refractory bar is still red, so the identical poke does nothing. The question tour `#q=neuron-all-or-none` walks through the same steps with their labels. Tour stop 4: `#tour=textbook&stop=4`.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
action potential
: a self-regenerating voltage pulse of about $100\,\mathrm{mV}$ that travels along a nerve fibre

critical slowing down
: the slow response of a system close to a tipping point

Hopfield network
: a network of threshold units with symmetric weights whose dynamics lowers an energy, storing patterns as minima

hydrogen bond
: a weak attraction of about $0.2\,\mathrm{eV}$ between molecules, easily broken by thermal motion

length constant $\lambda$
: the distance over which a steady voltage falls by a factor $e$ in a passive cable

Nernst potential
: the membrane voltage at which an ion's electrical and diffusive flows balance

refractory period
: the interval after a spike during which a fibre cannot fire again

threshold
: the input size above which a system's own feedback, not the input, sets the response
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Thermal energy
: $k_BT = 0.0267\,\mathrm{eV}$ at $310\,\mathrm{K}$; $\ 1\,\mathrm{eV} = 96.5\,\mathrm{kJ\,mol^{-1}}$

Nernst potential
: $E = \dfrac{k_BT}{ze}\ln\dfrac{c_\text{out}}{c_\text{in}}$, $\quad k_BT/e = 26.7\,\mathrm{mV}$ at $310\,\mathrm{K}$

Membrane charge
: $Q = C_mAV$, $\quad C_m \approx 0.01\,\mathrm{F\,m^{-2}}$

Cable equation
: $\tau\,\partial_tV = \lambda^2\,\partial_x^2V - V + R_mI$, $\quad \tau = R_mC_m$, $\ \lambda = \sqrt{aR_m/2R_i}$

Hopfield network
: $s_i \to \operatorname{sign}\big(\sum_j w_{ij}s_j\big)$, $\quad E = -\tfrac12\sum_{i\ne j}w_{ij}s_is_j$, $\quad w_{ij} = \xi_i\xi_j/N$

Field-modulated network
: $W = W_0 + \gamma\Phi J$, $\quad T = T_0 + \sigma\Phi$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:cells-strong-bonds-weak]** Covalent bonds (a few eV) are far above $k_BT$ and hold shapes; hydrogen bonds (about $8\,k_BT$) constantly break and re-form, and life runs on them.

**[-@sec:cells-membrane-charged-capacitor]** A membrane is a capacitor charged by ion gradients. Nernst potentials set the limits; one ion in sixty thousand sets the resting voltage.

**[-@sec:cells-passive-spread-cable]** Passive voltage spreads with length constant $\lambda \approx 1\,\mathrm{mm}$ and time constant $\tau \approx 10\,\mathrm{ms}$: the cable's Green's function.

**[-@sec:cells-action-potential-all]** Sodium feedback makes the spike all-or-none above a threshold; near threshold the response slows. Myelin speeds conduction to $120\,\mathrm{m\,s^{-1}}$.

**[-@sec:cells-cells-networks-memory]** A Hopfield network stores patterns as valleys of an energy landscape and recalls by rolling downhill.

**[-@sec:cells-field-that-tunes]** The programme's FM-HN lets a somatic field reshape the landscape. Its reduction to the standard network is machine-checked; its application to bodies is an open hypothesis.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why must the bonds that hold a protein's working shape be only a few times $k_BT$?
2. Why is the resting potential closer to the potassium Nernst potential than to sodium's?
3. Why can a cell fire many impulses without changing its ion concentrations?
4. What limits passive signalling to about a millimetre, and how does the action potential overcome the limit?
5. A kick slightly above threshold produces a delayed spike. Explain the delay.
6. In the table of @sec:cells-field-that-tunes, which row did a machine check, and why does that check not test the open hypothesis?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:cells-chloride title="Chloride"}
Chloride ions ($z = -1$) are $110\,\mathrm{mmol\,L^{-1}}$ outside a neuron and $10$ inside. Find the chloride Nernst potential at $310\,\mathrm{K}$.
:::

::: {.solution}
**Solution.** $E_\mathrm{Cl} = \dfrac{26.7}{-1}\ln(110/10) = -26.7\times2.40 = -64\,\mathrm{mV}$.

**Significance.** The chloride potential lies close to rest, so opening chloride channels holds the cell near rest and makes it harder to excite. Many inhibitory synapses work this way: they do not push the voltage far but clamp it, shunting excitatory input. *Baseline:* Penrose, chapter 27 (entropy and the second law) [@penrose2004road].
:::

::: {.problems #pr:cells-thin-thick-fibres title="Thin and thick fibres"}
Using the values of @ex:cells-length-constant, find $\lambda$ for a fine dendrite of radius $0.5\,\mu\mathrm{m}$, and the fraction of a steady voltage that survives $1\,\mathrm{mm}$ along it.
:::

::: {.solution}
**Solution.** $\lambda = \sqrt{0.5\times10^{-6}/2} = 5.0\times10^{-4}\,\mathrm{m} = 0.50\,\mathrm{mm}$. At $1\,\mathrm{mm}$, two length constants: $e^{-2} = 0.14$.

**Significance.** $\lambda$ grows only as $\sqrt{a}$: ten times thinner gives a length constant $\sqrt{10} = 3.2$ times shorter. Inputs at the far tips of fine dendrites arrive at the cell body much weakened, which is part of how a neuron weighs its inputs by where they land. **Try it:** `#level=cellular-synaptic&lens=on&dim=4`.
:::

::: {.problems #pr:cells-charge-spike title="The charge in one spike"}
During a spike the membrane voltage swings by about $100\,\mathrm{mV}$. How many sodium ions per square centimetre must enter to produce this swing, with $C_m = 1\,\mu\mathrm{F\,cm^{-2}}$?
:::

::: {.solution}
**Solution.** $Q = C_mV = 10^{-6}\times0.1 = 10^{-7}\,\mathrm{C\,cm^{-2}}$, which is $10^{-7}/1.602\times10^{-19} = 6.2\times10^{11}$ ions per square centimetre.

**Significance.** That is about $6000$ ions per square micrometre (a square micrometre is $10^{-8}\,\mathrm{cm^2}$), while one cubic micrometre of the fluid outside holds about ninety million sodium ions: a negligible change to the concentrations. *Baseline:* Penrose, chapter 19 (Maxwell's equations and the electric field) [@penrose2004road].
:::

::: {.problems #pr:cells-threshold-charge title="The threshold as a charge"}
In the opening figure the threshold for a one-millisecond kick is $6.9\,\mu\mathrm{A\,cm^{-2}}$. What charge per square centimetre does that kick deliver, and roughly how much would it raise the voltage if none leaked away?
:::

::: {.solution}
**Solution.** $Q = 6.9\,\mu\mathrm{A\,cm^{-2}}\times1\,\mathrm{ms} = 6.9\,\mathrm{nC\,cm^{-2}}$. The voltage rise is $Q/C_m = 6.9\times10^{-9}/10^{-6} = 6.9\,\mathrm{mV}$.

**Significance.** In this model a nerve membrane fires when it is lifted about $7\,\mathrm{mV}$ above rest in a millisecond. The figure's $6.5\,\mu\mathrm{A\,cm^{-2}}$ kick reached about $6\,\mathrm{mV}$, a little less than the no-leak estimate, because some charge leaked during the kick. The threshold is a property of the cell, which is why the same kick fires one neuron and not another.
:::

::: {.problems #pr:cells-many-memories title="How many memories?"}
Using the capacity $0.14N$, how many patterns can a Hopfield network of $100$ neurons store? Of $1000$? What does this suggest about storing memories in small networks?
:::

::: {.solution}
**Solution.** $0.14\times100 = 14$ patterns; $0.14\times1000 = 140$.

**Significance.** Capacity grows only in proportion to $N$, while the number of synapses grows as $N^2$; most of the wiring holds each memory redundantly, which is why such networks tolerate damage. A network small enough to draw, like @ex:cells-threeneuron-memory, holds one pattern at most. The programme's eight-component somatic model of @ch:atoms is small on purpose: it describes a few body-wide modes, not a store of memories.
:::
