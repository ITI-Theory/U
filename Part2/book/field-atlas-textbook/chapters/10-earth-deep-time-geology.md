# The Earth: Deep Time and a Planet That Remembers {#ch:earth}

![Deep time and its clocks. Left: events in Earth's history on a logarithmic scale, where each step to the right is ten times further back; a human life and the age of the Earth sit at opposite ends of the same axis. Right: three radioactive clocks. Each decays by half in its own half-life, so each measures ages over its own range.](figures/generated/ch08-banner.png){.opener}

Above the village of Elm in the canton of Glarus, a sharp line runs across the face of the mountains. Above it lies reddish rock some 250 to 300 million years old; below it lies grey rock about 40 million years old. The older rock sits on top of the younger because it was pushed there, sliding tens of kilometres over it as Africa pressed into Europe and the Alps were built. The line, the Glarus thrust, is a record. Rocks keep records of the forces they have felt, the temperatures they have reached and the time that has passed, and geologists read them as a historian reads documents. This chapter introduces the clocks that measure geological time, the slow motions of the plates, the friction that makes rocks stick and slip, and the climate's own landscape of stable states. It ends with the programme's reading of geological memory and its limits.

**Chapter outline.** [-@sec:earth-radioactive-clocks] Radioactive clocks · [-@sec:earth-moving-plates] Moving plates · [-@sec:earth-rock-that-remembers] Rock that remembers · [-@sec:earth-ringing-shaking-planet] A ringing, shaking planet · [-@sec:earth-climate-states-tipping] Climate states and tipping points · [-@sec:earth-programme-claims-earth] What the programme claims for the Earth

## Radioactive clocks {#sec:earth-radioactive-clocks}

::: {.learning-objectives}
- write the law of radioactive decay and relate the decay constant to the half-life;
- date a sample from the fraction of a parent isotope remaining;
- choose a clock suited to a given range of ages.
:::

Some atomic nuclei are unstable. Each has a fixed probability per unit time of decaying into another nucleus, independent of temperature, pressure, chemistry or age. A large number $N$ of such nuclei therefore decreases as

$$N(t) = N_0\,e^{-\lambda t} = N_0\,2^{-t/T_{1/2}}, \qquad T_{1/2} = \frac{\ln2}{\lambda},$$

where $\lambda$ is the **decay constant** and $T_{1/2}$ the **half-life**, the time in which half of any sample decays. It is the same exponential as every damped response in this book, with one difference: it cannot be sped up or slowed down. That makes it a clock. Measure the fraction of a parent isotope that remains, or the amount of daughter that has accumulated, and the elapsed time follows.

Each clock suits its own range. Carbon-14, with a half-life of $5730$ years, dates wood, bone and charcoal up to about $50\,000$ years old; beyond that too little remains to measure. Potassium-40 ($1.25$ billion years) and uranium-238 ($4.47$ billion years) date volcanic rocks and minerals across the whole history of the Earth. In 1956 Clair Patterson used the decay of uranium to lead in meteorites to measure the age of the Solar System, and with it the Earth: $4.54$ billion years, a value that has changed by less than one per cent since.

::: {.example #ex:earth-dating-charcoal title="Dating charcoal"}
Charcoal from an ancient hearth contains $30\,\%$ of the carbon-14 found in living wood. How old is it? What age would $25\,\%$ give?

**Strategy.** Solve $2^{-t/T_{1/2}} = f$ for $t$: $t = T_{1/2}\log_2(1/f)$.

**Solution.** $f = 0.30$: $t = 5730\times\log_2(3.33) = 5730\times1.74 = 9950$ years. $f = 0.25$: exactly two half-lives, $11\,460$ years.

**Significance.** The fire burned about ten thousand years ago, near the end of the last ice age. Radiocarbon ages are corrected with calibration curves, because the production of carbon-14 in the atmosphere has varied; the correction is a few per cent at this age.
:::

::: {.check-your-learning}
What fraction of the Earth's original uranium-238 is left today? (Answer: $2^{-4.54/4.47} = 0.49$, about half: the Earth is almost exactly one uranium-238 half-life old.)
:::

## Moving plates {#sec:earth-moving-plates}

::: {.learning-objectives}
- convert plate speeds between centimetres per year and kilometres per million years;
- estimate how far plates move over geological time;
- describe the evidence that the plates move.
:::

The Earth's outer shell is broken into a dozen large **plates**, each about $100\,\mathrm{km}$ thick, which move over the hotter, weaker rock beneath at a few centimetres per year, about as fast as fingernails grow. New ocean floor forms at mid-ocean ridges, where plates separate, and sinks back into the interior at ocean trenches, where they converge. Where continents collide, as Africa and Europe have been doing for the last fifty million years, the crust crumples and thickens into mountains such as the Alps.

The evidence is direct. As new ocean floor cools at a ridge it records the direction of the Earth's magnetic field, which reverses at irregular intervals; the ocean floor on both sides of every ridge carries the same symmetric stripes of reversed and normal magnetisation, like a tape recording played out in both directions. Satellite positioning now measures the motions year by year, and they agree with the speeds recorded in the stripes over millions of years.

::: {.example #ex:earth-opening-ocean title="Opening an ocean"}
The central Atlantic, between North America and north-west Africa, has been widening at an average of about $2.5\,\mathrm{cm}$ per year since it began to open, roughly $180$ million years ago. How wide should it be?

**Strategy.** Convert to kilometres per year and multiply by the time.

**Solution.** $2.5\,\mathrm{cm\,yr^{-1}} = 2.5\times10^{-5}\,\mathrm{km\,yr^{-1}}$; times $1.8\times10^{8}$ years gives $4500\,\mathrm{km}$.

**Significance.** That is the same order as the width of the central Atlantic today, roughly $5000\,\mathrm{km}$. Motions too slow to notice in a lifetime build oceans in geological time; the same is true in reverse for the mountains of Glarus.
:::

::: {.check-your-learning}
A plate moving at $3\,\mathrm{cm}$ per year travels how far in a million years? (Answer: $30\,\mathrm{km}$, about the displacement on the Glarus thrust.)
:::

## Rock that remembers {#sec:earth-rock-that-remembers}

::: {.learning-objectives}
- apply the Coulomb criterion for slip on a fault, including fluid pressure;
- describe rate-and-state friction and its memory length;
- explain why velocity weakening leads to earthquakes.
:::

A fault slips when the shear stress across it exceeds its frictional strength. For dry rock the strength is well described by the **Coulomb criterion**

$$\tau = C + \mu\,(\sigma_n - P_f),$$

where $\sigma_n$ is the stress pressing the two sides together, $P_f$ is the pressure of fluid in the pores, which pushes them apart, $C$ is a small cohesion and $\mu$ is the friction coefficient, about $0.6$ to $0.85$ for most rocks. The fluid term solved a long-standing puzzle about Glarus. A slab of rock tens of kilometres long seemed far too strong to push over its base without crumbling. In 1959 Hubbert and Rubey showed that water at high pressure in the fault zone can carry most of the weight of the overlying rock, cutting the friction to a fraction of its dry value.

::: {.example #ex:earth-water-weakens-fault title="Why water weakens a fault"}
At $3\,\mathrm{km}$ depth, rock of density $2700\,\mathrm{kg\,m^{-3}}$ presses on a fault. Taking $\mu = 0.6$ and neglecting $C$, find the shear strength when the pore water is at ordinary (hydrostatic) pressure and when it reaches $90\,\%$ of the rock's weight.

**Strategy.** $\sigma_n = \rho gz$; hydrostatic $P_f = \rho_wgz$; then apply the criterion.

**Solution.** $\sigma_n = 2700\times9.81\times3000 = 79\,\mathrm{MPa}$. Hydrostatic: $P_f = 1000\times9.81\times3000 = 29\,\mathrm{MPa}$, so $\tau = 0.6\times(79 - 29) = 30\,\mathrm{MPa}$. Overpressured: $P_f = 72\,\mathrm{MPa}$, so $\tau = 0.6\times7.9 = 4.8\,\mathrm{MPa}$.

**Significance.** Raising the pore pressure makes the fault six times weaker without changing the rock at all. The same effect explains earthquakes triggered by injecting fluid underground, as in some geothermal and waste-disposal projects.
:::

Friction is not a fixed number. Laboratory experiments by Dieterich and Ruina showed that it depends on how fast the surfaces slide and on how long they have been in contact [@dieterich1979modeling; @ruina1983slip]. In their **rate-and-state** description, the friction coefficient carries a state variable that records the history of sliding, and it forgets that history over a characteristic slip distance $D_c$, typically a few to a hundred micrometres in the laboratory. Two numbers, $a$ and $b$, set the size of the effects. A surface held still grows stronger by about $b\ln10$ for every tenfold increase in the time at rest: rock literally remembers how long it has been resting. A step change in sliding speed from $V_1$ to $V_2$ changes the steady friction by

$$\Delta\mu_\text{ss} = (a - b)\ln\frac{V_2}{V_1}.$$

If $b > a$, faster sliding means *lower* friction, **velocity weakening**. A weakening fault is unstable: once it starts to slip it slips faster and weakens further, releasing stored strain in a sudden jump. That jump is an earthquake. Between earthquakes the fault heals and stores strain again, so the fault cycles between sticking and slipping, a landscape that is rebuilt after every escape.

::: {.check-your-learning}
With $a = 0.008$ and $b = 0.010$, by how much does steady friction change when the sliding speed rises tenfold? (Answer: $(0.008 - 0.010)\ln10 = -0.0046$; the fault weakens.)
:::

## A ringing, shaking planet {#sec:earth-ringing-shaking-planet}

::: {.learning-objectives}
- use the Gutenberg–Richter law to compare earthquake numbers and energies;
- recall how a great earthquake sets the whole Earth ringing;
- connect seismic waves to the response grammar.
:::

Earthquakes come in all sizes, and small ones are far more common than large ones. Over many regions and many decades, the number of earthquakes of magnitude $M$ or larger follows the **Gutenberg–Richter law**,

$$\log_{10}N(\ge M) = a - bM, \qquad b \approx 1,$$

so each step of one magnitude unit is ten times rarer. Each unit also releases about $10^{1.5} = 32$ times more energy. The law has no characteristic size: there is no typical earthquake, only a straight line on a logarithmic plot, the same kind of scale-free behaviour met in starling flocks in @ch:flocks.

The largest earthquakes do more than shake the ground near them. @ch:response described how the 2004 Sumatra earthquake set the whole Earth ringing in its free oscillations, the slowest of which, ${}_0S_2$, has a period of $54$ minutes and a quality factor of about $500$, so it rings for days [@dahlen1998theoretical; @park2005earth]. Seismic waves travelling through the interior are the main evidence for the Earth's structure: a liquid outer core, which shear waves cannot cross, and a solid inner core inside it. The planet is read through its response to kicks, as every system in this book is.

::: {.example #ex:earth-great-earthquake-large title="A great earthquake and a large one"}
Compare a magnitude 9 earthquake with a magnitude 7 in energy released and in how often each occurs.

**Strategy.** Energy scales as $10^{1.5\Delta M}$, frequency as $10^{-b\Delta M}$ with $b = 1$.

**Solution.** Energy: $10^{1.5\times2} = 1000$ times more. Frequency: $10^{-2}$, a hundred times rarer.

**Significance.** A hundred magnitude 7 earthquakes together release only a tenth of the energy of one magnitude 9. Most of the energy is in the rare giants, which is why seismic hazard is dominated by events that may not occur in a given century.
:::

## Climate states and tipping points {#sec:earth-climate-states-tipping}

::: {.learning-objectives}
- compute the Earth's effective radiating temperature;
- explain how ice–albedo feedback can create two stable climates;
- describe tipping elements and the early-warning signals of @ch:human in the climate.
:::

The Earth absorbs sunlight and radiates heat to space. At the Earth's distance the Sun delivers $S = 1361\,\mathrm{W\,m^{-2}}$; averaged over the rotating sphere that is $S/4$, of which a fraction $\alpha$, the **albedo**, is reflected straight back. Balancing the rest against the Stefan–Boltzmann law for the heat radiated, $\sigma T^4$, gives the temperature at which the planet radiates:

$$T_\text{eff} = \left[\frac{S(1 - \alpha)}{4\sigma}\right]^{1/4}.$$ {#eq:earth-teff}

With today's albedo of $0.30$ this is $255\,\mathrm{K}$, about $-18\,^\circ\mathrm{C}$. The measured average surface temperature is $288\,\mathrm{K}$; the $33\,\mathrm{K}$ difference is the greenhouse effect of water vapour, carbon dioxide and other gases.

{{Visualize | eq:earth-teff | function-plot:earth | f="(1361*(1 - x)/(4*5.670e-8))^0.25"; x=[0,0.9]; value_at=0.30; expect_value=255; expect_tol=0.005; hline=288; xlabel="albedo $\alpha$ (fraction of sunlight reflected)"; ylabel="effective temperature (K)"; label=fig:earth-teff; height=26% }} The Earth's effective temperature against its albedo, from @eq:earth-teff. Today's albedo, $0.30$, gives $255\,\mathrm{K}$ (red point); the measured surface average, $288\,\mathrm{K}$ (dotted), is higher by the greenhouse effect. A snow-covered Earth reflecting $60\,\%$ would sit near $220\,\mathrm{K}$.

Albedo is not fixed. Ice and snow reflect far more sunlight than ocean and land, so a colder Earth with more ice absorbs less sunlight and cools further, a positive feedback. The figure below draws the absorbed and radiated power against temperature for a simple model with this feedback. They cross three times: a warm stable state near today's $288\,\mathrm{K}$, a cold stable state with ice to low latitudes near $249\,\mathrm{K}$, and an unstable state between them at about $260\,\mathrm{K}$. This is @ch:human's double well, with temperature as the coordinate. Geological evidence indicates that the Earth fell into the cold state at least twice, about $700$ and $650$ million years ago, the episodes known as Snowball Earth, and escaped as volcanic carbon dioxide slowly built up.

![Absorbed sunlight and radiated heat against global temperature for a simple model with ice–albedo feedback. Filled circles mark the two stable climates, where a small warming increases radiation more than absorption; the open circle between them is unstable.](figures/generated/ch08-climate.png){width="100%"}

Parts of today's climate system may have their own smaller double wells: the Greenland and West Antarctic ice sheets, the overturning circulation of the Atlantic, the Amazon rainforest. Lenton and colleagues called these **tipping elements**, parts of the system that a modest change could switch into a different state that is hard to reverse [@lenton2008tipping]. The early-warning signals of @ch:human, rising autocorrelation and variance as a valley flattens, have been found in records before several abrupt climate changes of the past [@scheffer2009early], and are now monitored in some present-day systems. The limits stated in @ch:human apply: the signals indicate a flattening valley, not a date.

::: {.example #ex:earth-whiter-earth title="A whiter Earth"}
Find the effective radiating temperature if the Earth's albedo rose from $0.30$ to $0.62$, as for a planet largely covered in ice. Use $\sigma = 5.67\times10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}$.

**Strategy.** Substitute into $T_\text{eff}$.

**Solution.** $T = \big[1361\times0.38/(4\times5.67\times10^{-8})\big]^{1/4} = (2.28\times10^{9})^{1/4} = 219\,\mathrm{K}$.

**Significance.** The extra reflection alone cools the planet by $36\,\mathrm{K}$, more than the whole present greenhouse effect. That is why the ice–albedo feedback is strong enough to create a second stable state.
:::

## What the programme claims for the Earth {#sec:earth-programme-claims-earth}

::: {.learning-objectives}
- distinguish physical memory in rocks from the language of feeling;
- describe the programme's geographic extension and its own stated limit;
- label each claim of the chapter correctly.
:::

Every kind of memory in this chapter is physical and measurable: isotopes that record time, magnetic stripes that record the field, folded strata that record stress, friction that records how long a fault has rested. The programme reads such path dependence as a very slow memory kernel, the long-tailed version of @ch:human's $K(\tau)$. The geographic paper goes further and models the spread of a regional accent and the movements of parakeet flocks in the Thames Valley, and the acoustics of the Klöntalersee valley in Glarus, with the same propagator equation used at the neural scale [@P16]. That paper states its own limit plainly: the same operator can be evaluated wherever fields propagate through bounded media, but the equivalence of the substrates remains a hypothesis.

| Claim | Label |
|:--|:--|
| Radiometric ages, plate motions, rate-and-state friction, Gutenberg–Richter statistics | `empirical-result` |
| Ice–albedo feedback can make two stable climates; Snowball Earth episodes occurred | `empirical-result` |
| Climate tipping elements show critical slowing before abrupt change | `open-hypothesis` (supported in past records) |
| Geological path dependence is a slow memory kernel in the programme's grammar | `interpretive` |
| The same propagator describes accents, flocks and valleys in one landscape | `open-hypothesis` |
| A rock feels or experiences anything | not claimed |

The phrase "a rock remembers" is used in two senses in this chapter, and the difference matters. In @sec:earth-rock-that-remembers it is literal: rate-and-state friction has a state variable that records history and decays over a measured slip distance. In the programme's reading it is a metaphor that places geological records alongside neural and emotional ones in a common grammar. The first can be measured in a laboratory; the second is a way of organising comparisons, and is useful only when it predicts something.

::: {.soma-machine}
Take the question tour `#q=rock-memory`, *Can a rock remember?*: it opens the geological level with compare and contours on, starting from the Glarus thrust, and labels each step. The geological view draws a seismogram beside its block of folded rock. Then move one level up to `#level=planetary&lens=on`, the whole planet whose free oscillations @sec:earth-ringing-shaking-planet describes. Tour stop 8: `#tour=textbook&stop=8`.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
albedo
: the fraction of incoming sunlight a planet reflects

Coulomb criterion
: $\tau = C + \mu(\sigma_n - P_f)$, the shear stress needed to make a fault slip

decay constant and half-life
: $\lambda$ and $T_{1/2} = \ln2/\lambda$, the rate and time scale of radioactive decay

Gutenberg–Richter law
: $\log_{10}N(\ge M) = a - bM$; each magnitude unit is about ten times rarer

rate-and-state friction
: friction that depends on sliding speed and on a state variable recording the history of contact

tipping element
: a part of the climate system that could switch to a different, hard-to-reverse state

velocity weakening
: friction that falls as sliding speeds up, the condition for earthquakes
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Radioactive decay
: $N = N_0e^{-\lambda t} = N_02^{-t/T_{1/2}}$, $\quad t = T_{1/2}\log_2(N_0/N)$

Coulomb criterion
: $\tau = C + \mu(\sigma_n - P_f)$, $\quad \sigma_n \approx \rho gz$

Rate-and-state velocity step
: $\Delta\mu_\text{ss} = (a - b)\ln(V_2/V_1)$

Gutenberg–Richter law and energy
: $\log_{10}N = a - bM$, $\quad E \propto 10^{1.5M}$

Effective radiating temperature
: $T_\text{eff} = \big[S(1 - \alpha)/4\sigma\big]^{1/4}$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:earth-radioactive-clocks]** Radioactive decay is an unchangeable exponential, so isotopes are clocks; the Earth is $4.54$ billion years old.

**[-@sec:earth-moving-plates]** Plates move a few centimetres a year, enough to open oceans and raise mountains over millions of years.

**[-@sec:earth-rock-that-remembers]** Faults slip by the Coulomb criterion, weakened by fluid pressure. Rate-and-state friction remembers its history, and velocity weakening produces earthquakes.

**[-@sec:earth-ringing-shaking-planet]** Earthquake sizes follow a scale-free law; great earthquakes set the planet ringing.

**[-@sec:earth-climate-states-tipping]** Ice–albedo feedback can give the climate two stable states; tipping elements may show critical slowing before abrupt change.

**[-@sec:earth-programme-claims-earth]** Physical memory in rocks is measured; the programme's reading of it as a slow memory kernel is interpretive, and rocks are not said to feel.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why is radioactive decay a reliable clock when chemical reactions are not?
2. What do the magnetic stripes on the ocean floor record, and why are they symmetric about the ridges?
3. How can water make a strong rock fault slip?
4. In what literal sense can a fault be said to remember?
5. Why does ice–albedo feedback make a second stable climate possible?
6. In the table of @sec:earth-programme-claims-earth, which claims are measured and which are readings? What would make the geographic hypothesis testable?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:earth-old-granite title="An old granite"}
A granite crystal contains potassium-40 that has decayed to $8.1\,\%$ of its original amount. How old is the granite?
:::

::: {.solution}
**Solution.** $t = 1.25\times\log_2(1/0.081)$ billion years $= 1.25\times3.63 = 4.5$ billion years.

**Significance.** The crystal formed in the first hundred million years of the Earth's history. Ages this old come only from minerals that have stayed closed to their daughter products since they formed, which is what geochronologists test before quoting an age. *Baseline:* Penrose, chapter 25 (the weak interaction behind beta decay) [@penrose2004road].
:::

::: {.problems #pr:earth-glarus-slab title="The Glarus slab"}
The Glarus thrust carried rock about $35\,\mathrm{km}$. At plate-boundary speeds of $0.5$ to $3\,\mathrm{cm}$ per year, how long would that take?
:::

::: {.solution}
**Solution.** At $3\,\mathrm{cm\,yr^{-1}}$: $35\,\mathrm{km}/(3\times10^{-5}\,\mathrm{km\,yr^{-1}}) = 1.2$ million years. At $0.5\,\mathrm{cm\,yr^{-1}}$: $7$ million years.

**Significance.** A displacement that seems impossible for solid rock takes only a few million years at the speed fingernails grow, a small fraction of the time the Alps have been forming. **Try it:** `#q=rock-memory`.
:::

::: {.problems #pr:earth-long-has-fault title="How long has the fault rested?"}
A laboratory fault with $b = 0.010$ is held at rest. By how much does its static friction grow between $1\,\mathrm{s}$ and $10^4\,\mathrm{s}$ of rest?
:::

::: {.solution}
**Solution.** Four tenfold increases, each adding $b\ln10 = 0.023$: in total $0.092$.

**Significance.** The growth is logarithmic: as much strengthening between one second and ten seconds as between three hours and thirty. A fault's strength therefore carries a record of how long ago it last slipped, which is one reason earthquake recurrence is so hard to predict.
:::

::: {.problems #pr:earth-greenhouse-gap title="The greenhouse gap"}
The Earth's effective radiating temperature is $255\,\mathrm{K}$ and its mean surface temperature $288\,\mathrm{K}$. By what factor does the surface radiate more power per square metre than the planet radiates to space?
:::

::: {.solution}
**Solution.** $(288/255)^4 = 1.63$.

**Significance.** The surface radiates $63\,\%$ more than escapes to space; the atmosphere absorbs the difference and returns much of it downwards. The effective emissivity of $0.61$ used in the climate figure is $1/1.63$, the same number. *Baseline:* Penrose, chapter 27 (the Earth's low-entropy energy budget from the Sun) [@penrose2004road].
:::

::: {.problems #pr:earth-small-earthquakes-add title="Small earthquakes add up?"}
In a region with $b = 1$, how many magnitude 5 earthquakes release as much energy as one magnitude 8?
:::

::: {.solution}
**Solution.** $10^{1.5\times3} = 10^{4.5} = 32\,000$.

**Significance.** Such a region has about $1000$ magnitude 5 earthquakes for each magnitude 8 ($10^{3}$), which release only a thirtieth of the energy. Small earthquakes cannot relieve the strain that builds up for great ones; the strain must be released by the rare large events.
:::
