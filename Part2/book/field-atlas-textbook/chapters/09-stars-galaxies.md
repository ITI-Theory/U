# Stars and Galaxies: Reading Light From Far Away {#ch:stars}

![Two things starlight tells us. Left: the spectra of three stars, each scaled to its peak. A hotter star peaks at a shorter wavelength, so its colour is a thermometer. Right: the orbital speed of stars in a model spiral galaxy against distance from its centre. The visible stars and gas alone would give the dashed curve, falling at large distance; real spiral galaxies show the flat solid curve, which requires much more mass than can be seen.](figures/generated/ch09-banner.png){.opener}

Every fact we know about the stars has arrived as light. No probe has visited another star, yet we know their temperatures, sizes, masses, ages, compositions and speeds, and we know that the galaxies they belong to are dominated by something that gives no light at all. This chapter shows how. It uses the tools of the earlier chapters directly: the photons and spectral lines of @ch:atoms, the Doppler shift and line widths of @sec:atoms-reading-spectral-line, the Boltzmann factor of @ch:cells and the ringing of @ch:response. The stars are the most distant laboratory in this book and, in some ways, the best understood.

**Chapter outline.** 9.1 Starlight as a thermometer · 9.2 How far, how bright · 9.3 How stars live and die · 9.4 Gravity bends time · 9.5 Weighing galaxies · 9.6 What the programme claims for stars and galaxies

## Starlight as a thermometer {#sec:stars-starlight-thermometer}

::: {.learning-objectives}
- use Wien's law to find a star's temperature from its colour;
- use the Stefan–Boltzmann law to relate luminosity, radius and temperature;
- explain why the strength of hydrogen lines depends on temperature, not composition.
:::

A star's surface glows like any hot dense body, with a spectrum close to that of an ideal **blackbody**. Two laws describe it. The wavelength of peak brightness falls as the temperature rises, **Wien's law**:

$$\lambda_\text{max}T = 2.898\times10^{-3}\,\mathrm{m\,K}.$$

The total power radiated from each square metre rises as the fourth power of temperature, the **Stefan–Boltzmann law** met for the Earth in @ch:earth, so a star of radius $R$ and surface temperature $T$ has **luminosity**

$$L = 4\pi R^2\sigma T^4.$$

The Sun, at $5772\,\mathrm{K}$, peaks at $502\,\mathrm{nm}$, in the green, though its light as a whole looks white. A cool red giant at $3500\,\mathrm{K}$ peaks in the infrared; Sirius, at nearly $10\,000\,\mathrm{K}$, peaks in the ultraviolet and looks blue-white.

Spectral lines carry more information. At Harvard in the early 1900s, Annie Jump Cannon classified the spectra of hundreds of thousands of stars and arranged them in the sequence O, B, A, F, G, K, M, along which the hydrogen lines rise to a maximum at class A and then fade [@cannon1929organization]. In 1925 Cecilia Payne showed in her doctoral thesis what the sequence means [@payne1925stellar]. @ch:atoms noted that the visible Balmer lines start on hydrogen's second level, which needs atoms excited by about $10\,\mathrm{eV}$. In a cool star almost no atoms are excited. In a very hot star almost all the hydrogen is ionised, with no electron left to absorb anything. Combining the Boltzmann factor for excitation with a matching law for ionisation, due to Saha, Payne found that the Balmer lines must be strongest near $10\,000\,\mathrm{K}$, as the figure below shows. The classes are a temperature sequence, not a sequence of compositions. Corrected for temperature, the line strengths showed that stars are made mostly of hydrogen and helium, a conclusion so unexpected that she was persuaded to describe the hydrogen abundance in print as "almost certainly not real". It was real.

![The fraction of hydrogen atoms able to absorb the Balmer lines against the surface temperature of a star, from the Boltzmann law for excitation and the Saha law for ionisation at a typical atmospheric pressure. The peak lies near $9900\,\mathrm{K}$. The Sun's hydrogen lines are weak not because it has little hydrogen but because it is too cool.](figures/generated/ch09-balmer.png){width="100%"}

::: {.example #ex:stars-sirius title="Sirius"}
Sirius A has a surface temperature of $9940\,\mathrm{K}$ and a radius of $1.71$ times the Sun's. Find its peak wavelength and its luminosity in units of the Sun's.

**Strategy.** Wien's law for the peak; for the luminosity, ratios cancel the constants: $L/L_\odot = (R/R_\odot)^2(T/T_\odot)^4$.

**Solution.** $\lambda_\text{max} = 2.898\times10^{-3}/9940 = 292\,\mathrm{nm}$. $L/L_\odot = 1.71^2\times(9940/5772)^4 = 2.92\times8.8 = 26$.

**Significance.** Sirius is the brightest star in the night sky partly because it is twenty-six times as luminous as the Sun and partly because it is near, $8.6$ light-years away. Its temperature puts it at the peak of the curve above, and its Balmer lines are among the strongest of any bright star.
:::

::: {.check-your-learning}
@ch:atoms estimated that at $10\,000\,\mathrm{K}$ about $3\times10^{-5}$ of hydrogen atoms sit in level 2. The figure above uses a smaller number. What did @ch:atoms leave out? (Answer: ionisation. At that temperature about two-thirds of the hydrogen is ionised, and only neutral atoms can be in level 2.)
:::

## How far, how bright {#sec:stars-far-bright}

::: {.learning-objectives}
- find a star's distance from its parallax;
- relate observed brightness to luminosity and distance by the inverse-square law;
- use the distance modulus.
:::

As the Earth orbits the Sun, a nearby star appears to shift against the distant background, by an angle $p$ called its **parallax**. A star with a parallax of one second of arc is at a distance of one **parsec**, $3.26$ light-years, and in general

$$d\,[\mathrm{pc}] = \frac{1}{p\,[\mathrm{arcsec}]}.$$

The European Space Agency's Gaia satellite has measured parallaxes for more than a billion stars, with precisions down to a few hundred-thousandths of a second of arc [@gaia2018dr2]. With the distance known, the **flux** received, the power per square metre at the telescope, gives the luminosity by the inverse-square law

$$F = \frac{L}{4\pi d^2}.$$

Astronomers express brightness in **magnitudes**, a logarithmic scale in which a difference of $5$ magnitudes is a factor of $100$ in flux and larger magnitudes are fainter. The **distance modulus**, the difference between a star's apparent magnitude $m$ and the absolute magnitude $M$ it would have at $10\,\mathrm{pc}$, depends only on distance: $m - M = 5\log_{10}(d/10\,\mathrm{pc})$.

::: {.example #ex:stars-nearest-star title="The nearest star"}
Proxima Centauri has a parallax of $0.768$ seconds of arc. How far away is it in parsecs and in light-years?

**Strategy.** $d = 1/p$; multiply by $3.26$ for light-years.

**Solution.** $d = 1/0.768 = 1.30\,\mathrm{pc} = 4.25$ light-years.

**Significance.** Even the nearest star shifts by less than a second of arc, the width of a coin seen from four kilometres away. The method needs no assumption about the star at all, which is why it anchors every other distance scale in astronomy.
:::

::: {.check-your-learning}
A star twice as luminous as another is twice as far away. How do their fluxes compare? (Answer: $2/2^2 = \tfrac12$; the more luminous star appears half as bright.)
:::

## How stars live and die {#sec:stars-stars-live-die}

::: {.learning-objectives}
- compute the rate at which the Sun converts mass to energy;
- use the mass–luminosity relation to estimate stellar lifetimes;
- describe the endpoints of stellar evolution and the Schwarzschild radius.
:::

A star shines by nuclear fusion in its core, where hydrogen nuclei combine, in several steps, into helium. The helium nucleus is $0.7\,\%$ lighter than the four hydrogen nuclei that made it, and the missing mass leaves as energy, $E = mc^2$. The Sun's luminosity of $3.83\times10^{26}\,\mathrm{W}$ corresponds to converting over four million tonnes of mass into energy every second. It has done so for $4.6$ billion years and is about halfway through its hydrogen-burning life.

Stars on the **main sequence**, burning hydrogen in their cores, obey a steep **mass–luminosity relation**, roughly $L \propto M^{3.5}$. A star twice the Sun's mass is about eleven times as luminous. Since its fuel is proportional to its mass and its spending to its luminosity, the lifetime scales as $M/L \propto M^{-2.5}$: massive stars live fast and die young.

How they die depends on their mass. A star like the Sun swells into a red giant, sheds its outer layers and leaves a **white dwarf**, a carbon-and-oxygen ember the size of the Earth. A star above about eight solar masses ends in a supernova explosion, leaving a **neutron star**, a solar mass of matter compressed into a ball twenty kilometres across, or, for the most massive, a **black hole**. A black hole of mass $M$ has an event horizon at the **Schwarzschild radius**

$$R_s = \frac{2GM}{c^2},$$

about $3\,\mathrm{km}$ per solar mass. @ch:response measured the ringing of two such holes after they merged: GW150914, a $Q$ of about three [@abbott2016gw].

::: {.example #ex:stars-suns-mass-loss title="The Sun's mass loss"}
At what rate does the Sun convert mass into energy?

**Strategy.** The rate is $L/c^2$.

**Solution.** $3.83\times10^{26}/(3.00\times10^{8})^2 = 4.3\times10^{9}\,\mathrm{kg\,s^{-1}}$.

**Significance.** Four million tonnes a second sounds enormous, but over the Sun's whole $10$-billion-year main-sequence life it adds up to less than a thousandth of the Sun's mass. Fusion is efficient, and the Sun is large.
:::

::: {.check-your-learning}
The Sun will spend about $10$ billion years on the main sequence. Roughly how long will a star of ten solar masses last? (Answer: $10\times10^{-2.5}\,\mathrm{Gyr} = 32$ million years.)
:::

## Gravity bends time {#sec:stars-gravity-bends-time}

::: {.learning-objectives}
- compute the gravitational slowing of clocks in a weak field;
- combine gravitational and velocity effects for satellite clocks;
- state where general relativity is tested.
:::

Einstein's general relativity predicts that clocks deeper in a gravitational field run slower. In a weak field the fractional slowing at distance $r$ from a mass $M$, relative to a clock far away, is

$$\frac{\Delta t}{t} \approx \frac{GM}{rc^2}.$$

At the Earth's surface this is $7\times10^{-10}$, less than a nanosecond per second, yet it matters every day. The clocks on GPS satellites, $20\,000\,\mathrm{km}$ up, sit higher in the Earth's field and run fast relative to clocks on the ground; their orbital speed makes them run slow by the time dilation of special relativity. Without correcting for both, positions computed by GPS would drift by about ten kilometres a day. Near a neutron star or black hole the same effect becomes enormous, and at the event horizon a distant observer would see a falling clock stop altogether.

General relativity has passed every test made of it, from the bending of starlight by the Sun to the orbits of pulsars and the gravitational waves of merging black holes. Penrose's survey gives its geometry in chapters 17 to 19 [@penrose2004road].

::: {.example #ex:stars-gps-clocks title="GPS clocks"}
GPS satellites orbit at $r = 2.656\times10^{7}\,\mathrm{m}$ from the Earth's centre, where the orbital speed is $3.87\,\mathrm{km\,s^{-1}}$. Using $GM_\oplus = 3.986\times10^{14}\,\mathrm{m^3\,s^{-2}}$ and $R_\oplus = 6.371\times10^{6}\,\mathrm{m}$, find the daily gain from gravity, the daily loss from speed, and the net effect.

**Strategy.** Gravity: $\frac{GM}{c^2}\big(\frac{1}{R_\oplus} - \frac1r\big)$ per second. Speed: $v^2/2c^2$ per second. Multiply each by $86\,400\,\mathrm{s}$.

**Solution.** Gravity: $4.43\times10^{-3}\,\mathrm{m}\times(1.570 - 0.377)\times10^{-7}\,\mathrm{m^{-1}} = 5.29\times10^{-10}$, which is $45.7\,\mu\mathrm{s}$ per day. Speed: $(3874)^2/(2\times(3.00\times10^8)^2) = 8.35\times10^{-11}$, which is $7.2\,\mu\mathrm{s}$ per day. Net: the satellite clocks gain $38.5\,\mu\mathrm{s}$ per day.

**Significance.** Light travels $11.5\,\mathrm{km}$ in $38.5\,\mu\mathrm{s}$. The satellite clocks are therefore set to tick slightly slow before launch, so that in orbit they keep time with the ground. Relativity is an engineering requirement.
:::

## Weighing galaxies {#sec:stars-weighing-galaxies}

::: {.learning-objectives}
- use orbital speed and radius to find an enclosed mass;
- measure orbital speeds with the Doppler shift of the 21 cm line;
- explain why flat rotation curves imply unseen mass.
:::

A star orbiting in a galaxy at radius $r$ with speed $v$ moves under the pull of all the mass inside its orbit. For a circular orbit, $v^2/r = GM(<r)/r^2$, so

$$M(<r) = \frac{v^2r}{G}.$$

Speeds come from the Doppler shift of @sec:atoms-reading-spectral-line. The best tracer is the 21 cm line of cold hydrogen gas (@pr:atoms-radio-line-hydrogen), which extends far beyond the visible stars and is not blocked by dust. If most of a galaxy's mass were in its bright central regions, orbital speeds would fall with distance beyond them, as $v \propto 1/\sqrt r$ for the planets around the Sun. In the 1970s Vera Rubin and others measured the rotation of spiral galaxies and found that they do not [@rubin1980rotation]. The speeds stay roughly constant out to the edge of the visible disc and, in the 21 cm data, well beyond it. A flat curve, $v$ constant, means $M(<r)$ grows in proportion to $r$: mass keeps accumulating where there is almost no light. This is the most direct evidence for **dark matter**, mass detected only by its gravity. Gravitational lensing and the cosmic microwave background, met in @ch:cosmology, independently require about five times as much of it as of ordinary matter.

::: {.example #ex:stars-mass-inside-suns title="The mass inside the Sun's orbit"}
The Sun orbits the centre of the Milky Way at about $230\,\mathrm{km\,s^{-1}}$, at a distance of $8.2\,\mathrm{kpc}$ ($1\,\mathrm{kpc} = 3.09\times10^{19}\,\mathrm{m}$). Find the mass inside its orbit.

**Strategy.** Apply $M = v^2r/G$ in SI units, then divide by the Sun's mass, $1.99\times10^{30}\,\mathrm{kg}$.

**Solution.** $M = (2.3\times10^5)^2\times8.2\times3.09\times10^{19}/6.67\times10^{-11} = 2.0\times10^{41}\,\mathrm{kg}$, which is $1.0\times10^{11}$ solar masses.

**Significance.** A hundred billion suns' worth of mass lies inside the Sun's orbit. The rotation curve stays roughly flat well beyond it, so the Galaxy's total mass is several times larger, most of it dark.
:::

::: {.check-your-learning}
A gas cloud in a distant galaxy moves away from us at $200\,\mathrm{km\,s^{-1}}$ relative to the galaxy's centre. By how much is its 21 cm line, at $1420.4\,\mathrm{MHz}$, shifted? (Answer: $1420.4\times200/300\,000 = 0.95\,\mathrm{MHz}$, to a lower frequency.)
:::

## What the programme claims for stars and galaxies {#sec:stars-programme-claims-stars}

::: {.learning-objectives}
- describe stars and black holes as resonators in the book's response grammar;
- state how the programme treats general relativity locally;
- label each claim of the chapter correctly.
:::

Stars ring. Turbulent convection below the Sun's surface excites millions of sound waves trapped inside it, and the whole surface rises and falls in a pattern of modes with periods near five minutes. Measuring these oscillations, a field called **helioseismology**, has mapped the Sun's interior, including how fast each layer rotates, as precisely as seismology of @ch:earth maps the Earth. Black holes ring once and fall silent (@ch:response). Galaxies respond to their dark mass in every orbit. At the scale of stars and galaxies the book's grammar of source, kernel, boundary and observable is ordinary astrophysics.

The programme does not alter that astrophysics. Its papers keep Einstein's gravity wherever it is tested: time dilation, light bending and orbits use the same general-relativistic limit [@P20]. What it adds is a proposal about the dark sectors, in which dark matter and the cosmological constant are read as properties of the vacuum of the universal somatic field [@P21; @P22]. Those claims are cosmological, and @ch:cosmology states and labels them.

| Claim | Label |
|:--|:--|
| Stellar temperatures, distances, lifetimes, GPS clock corrections, black-hole ringdowns | `empirical-result` |
| Spiral galaxies have flat rotation curves that require unseen mass | `empirical-result` |
| The programme's field equations reduce to general relativity where gravity has been tested | `derived-under-assumptions` |
| Stars, black holes and galaxies are resonators in one response grammar | `interpretive` |
| Stars or black holes are alive or aware | not claimed |

::: {.soma-machine}
Take the question tour `#q=black-hole-ringdown`, *What happens when black holes merge?*, which opens the compact-object level and steps from the measured ringdown to its labelled reading. Then try `#q=gravity-time-bending`, *How does the programme's view of gravity compare with Einstein's?*, which opens the galactic halo with compare and contours on and shows where the two agree. Tour stop 9: `#tour=textbook&stop=9`.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
blackbody
: an ideal body that absorbs all light and emits a spectrum set only by its temperature

dark matter
: mass detected only by its gravity, required by rotation curves, lensing and the cosmic microwave background

helioseismology
: the study of the Sun's interior through its oscillation modes

luminosity
: the total power a star radiates

main sequence
: the long stage of a star's life during which it burns hydrogen in its core

parallax
: the apparent annual shift of a nearby star; $d\,[\mathrm{pc}] = 1/p\,[\mathrm{arcsec}]$

rotation curve
: orbital speed against distance from a galaxy's centre

Schwarzschild radius
: $2GM/c^2$, the radius of a black hole's event horizon
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Wien's law
: $\lambda_\text{max}T = 2.898\times10^{-3}\,\mathrm{m\,K}$

Luminosity
: $L = 4\pi R^2\sigma T^4$, $\quad L/L_\odot = (R/R_\odot)^2(T/T_\odot)^4$

Parallax and inverse square
: $d = 1/p$, $\quad F = L/4\pi d^2$, $\quad m - M = 5\log_{10}(d/10\,\mathrm{pc})$

Mass–luminosity and lifetime
: $L \propto M^{3.5}$, $\quad t \propto M^{-2.5}$

Gravitational time dilation (weak field)
: $\Delta t/t \approx GM/rc^2$; $\quad$ velocity: $v^2/2c^2$

Enclosed mass from orbits
: $M(<r) = v^2r/G$
:::

## Summary {.unnumbered}

::: {.summary}
**9.1** A star's colour gives its temperature; its hydrogen-line strength peaks near $10\,000\,\mathrm{K}$ because of excitation and ionisation, which showed that stars are mostly hydrogen.

**9.2** Parallax gives distance without assumptions; with distance, flux gives luminosity.

**9.3** Fusion converts mass to energy; lifetimes fall steeply with mass; stars end as white dwarfs, neutron stars or black holes.

**9.4** Clocks deeper in gravity run slow; GPS corrects $38.5\,\mu\mathrm{s}$ a day.

**9.5** Flat rotation curves, measured with the 21 cm line, show that galaxies are dominated by dark matter.

**9.6** The programme keeps tested gravity unchanged; its dark-sector proposals are cosmological and are labelled in @ch:cosmology.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. How can a star's colour tell you its temperature?
2. Why are the Sun's hydrogen lines weaker than those of Sirius, although both stars are mostly hydrogen?
3. Why does parallax anchor all other distance measurements in astronomy?
4. Why do more massive stars have shorter lives?
5. What would a galaxy's rotation curve look like if all its mass were in its bright centre?
6. In @sec:stars-programme-claims-stars, which claims are measured and which are the programme's? Where does the programme depart from standard physics?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:stars-red-giant title="A red giant"}
Betelgeuse has a surface temperature of about $3500\,\mathrm{K}$ and a radius of about $760$ solar radii. Find its peak wavelength and its luminosity relative to the Sun.
:::

::: {.solution}
**Solution.** $\lambda_\text{max} = 2.898\times10^{-3}/3500 = 828\,\mathrm{nm}$, in the near infrared. $L/L_\odot = 760^2\times(3500/5772)^4 = 577\,600\times0.135 = 78\,000$.

**Significance.** Betelgeuse is cool but vast: its radius would reach beyond the orbit of Mars. Luminosity depends on size as strongly as on temperature, which is why the coolest stars can be among the brightest. *Baseline:* Penrose, chapter 27 (blackbody radiation and the second law) [@penrose2004road].
:::

::: {.problems #pr:stars-suns-luminosity title="The Sun's luminosity"}
From $R_\odot = 6.957\times10^{8}\,\mathrm{m}$ and $T = 5772\,\mathrm{K}$, compute the Sun's luminosity.
:::

::: {.solution}
**Solution.** $L = 4\pi(6.957\times10^{8})^2\times5.670\times10^{-8}\times5772^4 = 3.83\times10^{26}\,\mathrm{W}$.

**Significance.** The value matches the measured solar luminosity to within a fraction of a per cent, which shows how close to a blackbody the Sun's surface is.
:::

::: {.problems #pr:stars-massive-stars-life title="A massive star's life"}
Using $L \propto M^{3.5}$, how luminous is a star of three solar masses, and how long does it stay on the main sequence if the Sun stays for $10$ billion years?
:::

::: {.solution}
**Solution.** $L = 3^{3.5} = 47$ solar luminosities. Lifetime $= 10\times3^{-2.5} = 0.64$ billion years.

**Significance.** Tripling the mass shortens the life fifteenfold. Stars massive enough to explode as supernovae live only tens of millions of years, which is why they are found near where they were born, in young spiral arms.
:::

::: {.problems #pr:stars-black-holes-size title="A black hole's size"}
Find the Schwarzschild radius of a black hole of $36$ solar masses, one of the two that merged in GW150914, using $R_s = 2.95\,\mathrm{km}$ per solar mass.
:::

::: {.solution}
**Solution.** $R_s = 36\times2.95 = 106\,\mathrm{km}$.

**Significance.** Thirty-six suns' worth of mass inside a sphere smaller than a large city. The two holes orbited each other nearly a hundred times a second just before merging, and the ringdown's frequency of about $250\,\mathrm{Hz}$ (@pr:response-blackhole-ringdown) reflects that size. **Try it:** `#q=black-hole-ringdown`. *Baseline:* Penrose, chapter 27 (black holes) [@penrose2004road].
:::

::: {.problems #pr:stars-flat-rotation-curve title="A flat rotation curve"}
A spiral galaxy's rotation speed is $200\,\mathrm{km\,s^{-1}}$ at $10\,\mathrm{kpc}$ and still $200\,\mathrm{km\,s^{-1}}$ at $30\,\mathrm{kpc}$. How much mass is enclosed at each radius, and how much lies between them?
:::

::: {.solution}
**Solution.** $M(<10) = (2\times10^5)^2\times3.09\times10^{20}/6.67\times10^{-11} = 1.85\times10^{41}\,\mathrm{kg}$, or $9.3\times10^{10}$ solar masses. At $30\,\mathrm{kpc}$ it is three times as much, $2.8\times10^{11}$. The shell between holds $1.9\times10^{11}$ solar masses.

**Significance.** Twice as much mass lies in the faint outer shell as inside the bright disc. Most of the galaxy is where almost nothing shines.
:::
