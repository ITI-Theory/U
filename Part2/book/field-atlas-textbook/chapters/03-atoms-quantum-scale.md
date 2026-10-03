# Atoms: Light in Packets, Energy in Steps {#ch-atoms}

![The hydrogen atom in two panels. Left: its allowed energies, crowding together towards zero, with the four jumps that end on the second level. Right: the four visible lines those jumps produce, the same four lines the Soma Machine draws at its atomic level.](figures/generated/ch03-banner.png){.opener}

Heat a thin tube of hydrogen until it glows and pass the light through a prism. Instead of a rainbow you see four sharp coloured lines on a dark background: red, blue-green, blue and violet. Every hydrogen atom in the universe produces exactly these four, which is how astronomers know what distant stars are made of. Classical physics cannot explain them. This chapter shows how two quantum ideas, light arriving in packets and electrons behaving as waves, turn the four lines into a calculation that, with two small corrections, matches measurement to one part in sixty thousand. Chapter 2's response grammar then reads a spectrum as a list of a system's natural frequencies.

**Chapter outline.** 3.1 Light arrives in packets · 3.2 The hydrogen spectrum · 3.3 Electrons are waves too · 3.4 Why atoms have a size · 3.5 Reading a spectral line · 3.6 Lines as poles

## Light arrives in packets {#sec-3-1}

::: {.learning-objectives}
- relate a photon's energy to its frequency and wavelength;
- convert between electronvolts and nanometres in one step;
- count the photons in a beam of known power.
:::

Light is an electromagnetic wave, as Chapter 1 described, but it delivers its energy in indivisible packets called **photons**. Planck introduced the idea in 1900 to explain the colour of hot objects [@planck1900quantum]; Einstein used it in 1905 to explain why light below a certain frequency cannot eject electrons from a metal however bright it is. A photon of frequency $f$ carries energy

$$E = hf = \frac{hc}{\lambda},$$

where $h = 6.626\times10^{-34}\,\mathrm{J\,s}$ is **Planck's constant**. At atomic scales the joule is inconveniently large, so energies are quoted in **electronvolts**: $1\,\mathrm{eV} = 1.602\times10^{-19}\,\mathrm{J}$, the energy an electron gains crossing one volt. In these units the product $hc$ takes a value worth memorising:

$$hc = 1240\,\mathrm{eV\,nm}.$$

A photon's energy in electronvolts is therefore $1240$ divided by its wavelength in nanometres. Visible light, from $700\,\mathrm{nm}$ (red) to $380\,\mathrm{nm}$ (violet), spans $1.8$ to $3.3\,\mathrm{eV}$. That is a hundred times the thermal energy $k_BT \approx 0.026\,\mathrm{eV}$ of a molecule at room temperature, which is why a room-temperature object does not glow but can be bleached, tanned or photographed by light that carries only a few electronvolts per packet.

::: {.example title="Example 3.1 — Photons from a laser pointer"}
A red laser pointer emits $1.0\,\mathrm{mW}$ at $633\,\mathrm{nm}$. Find the energy of one photon in eV and in joules, and the number of photons leaving the pointer each second.

**Strategy.** Use $E = 1240/\lambda$ for the photon energy, convert to joules, and divide the power by the energy per photon.

**Solution.** $E = 1240/633 = 1.96\,\mathrm{eV} = 1.96\times1.602\times10^{-19} = 3.14\times10^{-19}\,\mathrm{J}$. The photon rate is $1.0\times10^{-3}/3.14\times10^{-19} = 3.2\times10^{15}$ photons per second.

**Significance.** A beam this weak still carries three thousand million million packets a second, so its graininess is invisible to the eye. Single photons become visible only when the light is very faint: astronomical cameras and the retina's rod cells both count them one at a time.
:::

::: {.check-your-learning}
What wavelength carries photons of exactly $2.0\,\mathrm{eV}$, and what colour is it? (Answer: $1240/2.0 = 620\,\mathrm{nm}$, orange-red.)
:::

## The hydrogen spectrum {#sec-3-2}

::: {.learning-objectives}
- state the energy levels of hydrogen;
- compute the wavelength of any hydrogen line from the two levels it joins;
- explain why a spectrum identifies an element.
:::

In 1885 the schoolteacher Johann Balmer found a formula that fitted the four visible hydrogen lines, without knowing why it worked. Bohr supplied the reason in 1913 [@bohr1913]: the electron in hydrogen can only have certain energies,

$$E_n = -\frac{13.6\,\mathrm{eV}}{n^2}, \qquad n = 1, 2, 3, \ldots$$

The negative sign means the electron is bound: $13.6\,\mathrm{eV}$ must be supplied to free it from the lowest level, $n = 1$, which is called the **ground state**. Higher levels crowd together towards zero, as the left panel of the opening figure shows. When the electron drops from level $n_i$ to a lower level $n_f$, the atom emits one photon carrying the difference:

$$hf = E_{n_i} - E_{n_f} = 13.6\,\mathrm{eV}\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right).$$

The same photon, absorbed, lifts the electron back up. The visible lines are the **Balmer series**, the jumps that end on $n_f = 2$. Jumps ending on $n_f = 1$ release more energy and form the **Lyman series** in the ultraviolet. Each element has its own set of levels and therefore its own pattern of lines, a fingerprint that can be read from a lamp in a laboratory or from a star a thousand light-years away.

::: {.example title="Example 3.2 — The red line of hydrogen"}
Find the energy and wavelength of the photon emitted in the jump from $n = 3$ to $n = 2$, and compare with the measured wavelength, $656.28\,\mathrm{nm}$ in air.

**Strategy.** Compute the energy difference, then $\lambda = 1240/E$ with more figures than usual, since the comparison is precise.

**Solution.** $E = 13.606\,(1/4 - 1/9) = 13.606\times0.13889 = 1.8897\,\mathrm{eV}$, so $\lambda = 1239.84/1.8897 = 656.11\,\mathrm{nm}$.

**Significance.** The formula is within $0.03\,\%$ of the measurement, and the remaining gap has two known causes. The proton is not infinitely heavy, so the electron and proton orbit their common centre; this lowers every energy by the factor $1/(1 + m_e/m_p) = 1/1.000545$ and moves the line to $656.47\,\mathrm{nm}$ in vacuum. Light travels slightly slower in air, refractive index $1.000277$, which shortens the measured wavelength to $656.47/1.000277 = 656.29\,\mathrm{nm}$. The calculation now agrees with the measurement to one part in sixty thousand.
:::

::: {.check-your-learning}
Find the wavelength of the strongest Lyman line, the jump from $n = 2$ to $n = 1$. Can you see it? (Answer: $E = 13.6\times3/4 = 10.2\,\mathrm{eV}$, $\lambda = 121.5\,\mathrm{nm}$; no, it lies in the far ultraviolet and is absorbed by air.)
:::

## Electrons are waves too {#sec-3-3}

::: {.learning-objectives}
- compute the de Broglie wavelength of an electron of given energy;
- explain how electron diffraction confirmed matter waves;
- explain discrete levels as standing waves.
:::

Bohr's rule worked but did not say why only certain energies are allowed. In 1924 Louis de Broglie proposed that if light waves behave as particles, particles might behave as waves, with wavelength set by their momentum $p$:

$$\lambda = \frac{h}{p}.$$

For an electron with kinetic energy $E$, $p = \sqrt{2m_eE}$, and the numbers combine into a convenient form:

$$\lambda = \frac{1.226\,\mathrm{nm}}{\sqrt{E/\mathrm{eV}}}.$$

An electron of a few electronvolts therefore has a wavelength of about a nanometre, comparable with the size of atoms, and that is exactly where wave effects should show. In 1927 Davisson and Germer fired electrons at a nickel crystal and found that they bounced off strongly only at particular angles, the signature of diffraction from the regular rows of atoms.

::: {.example title="Example 3.3 — Electrons diffracting from nickel"}
Davisson and Germer used $54\,\mathrm{eV}$ electrons. The surface rows of their nickel crystal are $d = 0.215\,\mathrm{nm}$ apart. Find the electron wavelength and the angle at which the first diffraction peak should appear, using $d\sin\theta = \lambda$.

**Strategy.** Compute $\lambda$ from the energy, then solve the grating condition for $\theta$.

**Solution.** $\lambda = 1.226/\sqrt{54} = 1.226/7.35 = 0.167\,\mathrm{nm}$. Then $\sin\theta = 0.167/0.215 = 0.776$, so $\theta = 51^\circ$.

**Significance.** The measured peak was at $50^\circ$. A particle with no wavelength would scatter smoothly in all directions; the sharp peak at the predicted angle is direct evidence that electrons diffract. Electron microscopes exploit the same fact: their short wavelengths resolve detail far finer than light can.
:::

A wave confined to a region can only take shapes that fit it. Chapter 1 showed this for a string fixed at both ends, where only whole numbers of half-wavelengths fit (the figure below recalls it). An electron bound to a nucleus is a wave confined in three dimensions, so it too has a discrete set of allowed patterns, each with its own energy. In Bohr's simplified picture a circular orbit of radius $r_n$ must hold a whole number of wavelengths, $2\pi r_n = n\lambda$; this gives orbits of radius $r_n = n^2 a_0$, with $a_0 = 0.0529\,\mathrm{nm}$, and exactly the energies of Section 3.2. The picture of definite orbits is wrong in detail, since Schrödinger's equation of 1926 replaces them with **orbitals**, standing-wave patterns of probability that have no path [@schrodinger1926]. But the energies it predicts for hydrogen are the same, and the reason for discreteness is the same: only waves that fit are allowed.

![Standing-wave modes on a string fixed at both ends. The atom is the same idea in three dimensions: the boundary conditions select a discrete set of patterns and energies.](../field-atlas/figures/theory/T1_3_string_modes.png){width="100%"}

::: {.check-your-learning}
In the $n = 2$ level the electron's kinetic energy is $3.40\,\mathrm{eV}$. Show that its wavelength fits exactly twice around a circle of radius $r_2 = 4a_0$. (Answer: $\lambda = 1.226/\sqrt{3.40} = 0.665\,\mathrm{nm}$; $2\pi\times0.212 = 1.33\,\mathrm{nm} = 2\lambda$.)
:::

## Why atoms have a size {#sec-3-4}

::: {.learning-objectives}
- state the uncertainty principle and estimate a confinement energy;
- derive the size and binding energy of hydrogen from a balance of two energies;
- compare atomic and nuclear energy scales.
:::

Why does the electron not simply fall into the proton, which attracts it? The answer is a property of waves. A wave squeezed into a region of size $\Delta x$ must contain a spread of wavelengths, and therefore a spread of momenta, of at least

$$\Delta x\,\Delta p \ge \frac{\hbar}{2}, \qquad \hbar = \frac{h}{2\pi}.$$

This is Heisenberg's **uncertainty principle** of 1927 [@griffiths2018qm]. It is not a limit on measuring instruments; it describes what a wave is. Squeezing a particle costs kinetic energy of order $\hbar^2/2mr^2$, the **confinement energy**, which grows rapidly as the region shrinks.

The hydrogen atom settles where this cost balances the Coulomb attraction of Chapter 2. Writing the electrical energy as $-ke^2/r$, with $ke^2 = 1.440\,\mathrm{eV\,nm}$, the total energy at radius $r$ is roughly

$$E(r) \approx \frac{\hbar^2}{2m_er^2} - \frac{ke^2}{r}.$$

Too small a radius and the first term wins; too large and the attraction is wasted. Setting $dE/dr = 0$ gives the minimum at

$$a_0 = \frac{\hbar^2}{m_eke^2} = \frac{(\hbar c)^2}{m_ec^2\,ke^2} = \frac{(197.3\,\mathrm{eV\,nm})^2}{(511\,000\,\mathrm{eV})(1.440\,\mathrm{eV\,nm})} = 0.0529\,\mathrm{nm},$$

where the energy is $E(a_0) = -ke^2/2a_0 = -13.6\,\mathrm{eV}$. The estimate lands exactly on the ground-state radius and energy. That exactness is partly luck, because the confinement term was only estimated; the full Schrödinger calculation confirms both numbers and shows that $a_0$ is the radius at which the electron is most likely to be found. Both curves appear in the figure below.

![Left: the confinement cost and the Coulomb gain, and their sum, which has its minimum at $a_0$ with energy $-13.6\,\mathrm{eV}$. Right: the probability of finding the ground-state electron at each radius, which peaks at the same $a_0$.](figures/generated/ch03-hydrogen.png){width="100%"}

::: {.example title="Example 3.4 — The price of squeezing"}
Estimate the confinement energy $\hbar^2/2mL^2$ of an electron held within $L = 0.1\,\mathrm{nm}$, a typical atomic size. Repeat for a proton held within a nucleus, $L = 5\,\mathrm{fm}$, using $m_pc^2 = 938.3\,\mathrm{MeV}$ and $\hbar c = 197.3\,\mathrm{MeV\,fm}$.

**Strategy.** Write the energy as $(\hbar c)^2/2mc^2L^2$ so that the units are energies and lengths.

**Solution.** Electron: $(197.3)^2/(2\times511\,000\times0.01) = 38\,930/10\,220 = 3.8\,\mathrm{eV}$. Proton: $(197.3)^2/(2\times938.3\times25) = 38\,930/46\,920 = 0.83\,\mathrm{MeV}$.

**Significance.** The electron's answer is a few electronvolts, the scale of chemistry, of visible light and of every reaction in a living cell. The nuclear answer is about a million electronvolts, which is why nuclear reactions release roughly a million times more energy per atom than chemical ones. The two scales are set by the same rule applied to different masses and sizes.
:::

## Reading a spectral line {#sec-3-5}

::: {.learning-objectives}
- compute the Doppler shift of a line from a moving source;
- relate the width of a line to the lifetime of the level that produces it;
- recognise the atom as the highest-$Q$ oscillator in this book.
:::

A spectral line carries more than an element's name. Its position, width and strength each report a physical quantity.

**Position: motion.** A source moving away at speed $v$ stretches the wavelength it emits by the **Doppler shift** $\Delta\lambda = \lambda v/c$ (for $v \ll c$); a source approaching compresses it. Measuring the shift of a known line gives the speed along the line of sight. Chapter 9 uses this to weigh galaxies and Chapter 10 to measure the expansion of the universe [@hubble1929relation].

**Width: lifetime.** An excited level does not last for ever; the electron drops within a typical **lifetime** $\tau$, a few to a hundred nanoseconds for the levels of hydrogen that make visible lines. In the language of Chapter 2, the atom is an oscillator that rings for a time $\tau$ after being kicked, so its resonance has a width of about $1/\tau$ in angular frequency. Using $Q = \omega_0\tau$ for the energy decay time, a visible line ringing for $10\,\mathrm{ns}$ has

$$Q = 2\pi f\tau = 2\pi\times(4.57\times10^{14}\,\mathrm{Hz})\times(10^{-8}\,\mathrm{s}) \approx 3\times10^{7}.$$

A tuning fork has $Q \approx 1000$, the ringing Earth about 500. Atoms are the sharpest natural resonators known, which is why the world's clocks are now atomic.

**Strength: population.** A line is strong only if many atoms sit in the level it starts from. In thermal equilibrium the fraction in a higher level falls as $e^{-\Delta E/k_BT}$, so the strength of a line is a thermometer.

::: {.example title="Example 3.5 — The line from a moving planet"}
The Earth orbits the Sun at $30\,\mathrm{km\,s^{-1}}$. Find the largest Doppler shift of the red hydrogen line, $656.3\,\mathrm{nm}$, in light from a source fixed in the sky in the plane of the Earth's orbit, as the Earth moves towards it and away from it during the year.

**Strategy.** Apply $\Delta\lambda = \lambda v/c$.

**Solution.** $\Delta\lambda = 656.3\times(3.0\times10^4)/(3.0\times10^8) = 0.066\,\mathrm{nm}$, so the line swings by $\pm0.066\,\mathrm{nm}$ over the year.

**Significance.** The swing is almost a thousand times smaller than the gaps between the Balmer lines but easily measured with a good spectrograph. Astronomers remove it before quoting a star's own velocity; the same technique, at a precision of metres per second, finds planets by the wobble they give their stars.
:::

::: {.check-your-learning}
Why do two lines from the same atom, at almost the same wavelength, sometimes have very different widths? (Answer: their upper levels have different lifetimes; the shorter-lived level gives the wider line.)
:::

## Lines as poles {#sec-3-6}

::: {.learning-objectives}
- describe a spectrum as the set of poles of a response function;
- state the standard sense in which a particle is a pole of a propagator;
- label each part of the programme's percept-as-pole reading correctly.
:::

Chapter 2 wrote the response of a damped oscillator to a steady drive of angular frequency $\omega$ as

$$G(\omega) \propto \frac{1}{\omega_0^2 - \omega^2 - 2i\gamma\omega}.$$

This expression becomes infinite at two complex frequencies, $\omega = \pm\omega_d - i\gamma$, called the **poles** of the response. Their real part is the frequency at which the system rings; their imaginary part is its damping rate. The figure below plots them. A system with several natural frequencies has several pairs of poles, and its whole response can be rebuilt from them. An atom's response to light has this form, with one pair of poles for each transition: the positions give the line wavelengths and the distances below the real axis give the line widths. Reading a spectrum is reading off the poles of the atom's response.

![Poles of a damped oscillator in the complex frequency plane. Heavier damping moves them further below the real axis, which on a spectrum means a wider line. A pole in the shaded upper half would grow without limit instead of ringing down.](../field-atlas/figures/theory/T2_4_poles_damping.png){width="100%"}

Quantum field theory takes the idea one step further. The response of a field to a disturbance is called its **propagator**, and for a free field of mass $m$ it has a pole at the energy–momentum combination of a particle of that mass. In this precise sense a particle *is* a pole of its field's propagator: an electron is the place where the electron field responds without limit. This is standard physics, surveyed in Penrose's chapters 24–26 [@penrose2004road], and it is `empirical-result` through every particle mass measured to date.

The programme behind this Atlas proposes the same structure one level up. Its first paper makes this the central identification [@P1]: an eight-component somatic state $\mathbf{e}$ evolves under a coupling matrix $W_8$, its response is $(\lambda I - W_8)^{-1}$, the poles of that response are the eigenvalues of $W_8$, and a **percept**, a feeling that reaches awareness, corresponds to a pole whose mode is excited above threshold. The co-identification paper lists the claim with its falsifier: it fails if repeated measurements of mode responses show no stable pole structure [@P3]. Each piece carries a different label:

| Claim | Label |
|:--|:--|
| A spectrum is the pole set of an atom's response | `empirical-result` |
| A particle is a pole of its field's propagator | `empirical-result` |
| The programme's nostalgia pattern lies near an eigenvector of its $W_8$ with eigenvalue 2; the Lean theorem `perceptIsPropagatorPole_nostalgia` checks residual $673/2500$ | `kernel-verified` [@D2] |
| The entries of $W_8$ describe the couplings in a human body | `open-hypothesis` |
| A percept *is* a pole of a somatic propagator | `interpretive` |

The middle row deserves a careful reading, because it is the kind of claim a proof checker can and cannot support. The theorem verifies arithmetic: for one specified $8\times8$ matrix and one specified pattern, the squared residual $\lVert W_8\mathbf{e} - 2\mathbf{e}\rVert^2$ is $0.27$, against a squared length $\lVert\mathbf{e}\rVert^2 = 1.68$, so the pattern is an approximate eigenvector, off by about 16 %. The proof is complete and checked by machine. It says nothing about whether the matrix describes anyone; that is the job of the measurements proposed for the open hypothesis. Nor does it claim that atoms feel, or that a feeling is a hydrogen line. The claim is narrower and testable: if the somatic response has this form, then its strongest, most persistent states should behave like sharp lines, with frequencies, widths and strengths that can be measured.

::: {.making-connections title="Making Connections — The Sun's weak hydrogen lines"}
The Balmer lines start on $n = 2$, which lies $10.2\,\mathrm{eV}$ above the ground state. At the Sun's surface temperature, $5800\,\mathrm{K}$, only about five atoms in a thousand million are in that level ($4e^{-10.2/0.50} \approx 5\times10^{-9}$, the factor 4 counting the states in level 2). At $10\,000\,\mathrm{K}$ the fraction rises to $3\times10^{-5}$, five thousand times more. That is why hydrogen lines are strongest not in the Sun but in hotter white stars such as Sirius and Vega, and it is the key to the stellar classification of Chapter 9: the same line used as a thermometer.
:::

::: {.soma-machine}
Open `#level=atomic&lens=on&compare=1`. The atomic view draws the four Balmer lines at $410$, $434$, $486$ and $656\,\mathrm{nm}$, the numbers of Section 3.2, under a cloud of points sampled from the electron's probability pattern rather than an orbit. Then open the question tour `#q=hydrogen-feeling`, *Is a hydrogen atom like a feeling?*, which steps through the three readings of this section and labels each one.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
de Broglie wavelength
: the wavelength $h/p$ of a particle of momentum $p$

electronvolt (eV)
: the energy an electron gains crossing one volt, $1.602\times10^{-19}\,\mathrm{J}$

energy level
: one of the discrete energies an electron may have in an atom

ground state
: the lowest energy level of an atom

orbital
: a standing-wave probability pattern for an electron in an atom; it has no path

photon
: an indivisible packet of light with energy $hf$

pole
: a complex frequency at which a response function becomes infinite; its real part is a ringing frequency and its imaginary part a damping rate

propagator
: the response function of a field; its poles correspond to particles

uncertainty principle
: $\Delta x\,\Delta p \ge \hbar/2$; confining a wave costs momentum and energy
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Photon energy
: $E = hf = hc/\lambda$, $\quad hc = 1240\,\mathrm{eV\,nm}$

Hydrogen levels and lines
: $E_n = -13.6\,\mathrm{eV}/n^2$, $\quad hf = 13.6\,\mathrm{eV}\,(1/n_f^2 - 1/n_i^2)$

de Broglie wavelength
: $\lambda = h/p$; for an electron $\lambda = 1.226\,\mathrm{nm}/\sqrt{E/\mathrm{eV}}$

Uncertainty and confinement
: $\Delta x\,\Delta p \ge \hbar/2$, $\quad E_\text{conf} \approx \hbar^2/2mL^2$

Bohr radius
: $a_0 = \hbar^2/m_eke^2 = 0.0529\,\mathrm{nm}$, $\quad r_n = n^2a_0$

Doppler shift
: $\Delta\lambda/\lambda = v/c$ for $v \ll c$

Line quality factor
: $Q = \omega_0\tau$
:::

## Summary {.unnumbered}

::: {.summary}
**3.1** Light delivers energy in photons of $E = hf$; with $hc = 1240\,\mathrm{eV\,nm}$, visible photons carry $1.8$ to $3.3\,\mathrm{eV}$.

**3.2** Hydrogen's levels are $E_n = -13.6\,\mathrm{eV}/n^2$. Jumps between them produce its lines; with small known corrections the red line is predicted to one part in sixty thousand.

**3.3** Electrons have wavelength $h/p$, confirmed by diffraction. Confined waves have discrete patterns, which is why levels are discrete.

**3.4** Confinement costs energy. Balancing that cost against Coulomb attraction gives the size of hydrogen, $0.0529\,\mathrm{nm}$, and its binding energy, $13.6\,\mathrm{eV}$.

**3.5** A line's position measures motion, its width the lifetime of a level, its strength the temperature. Atoms ring with $Q$ near $10^{7}$.

**3.6** A spectrum is the pole set of an atom's response, and a particle is a pole of a field's propagator. The programme's percept-as-pole proposal reuses this structure; its arithmetic is machine-checked, its application to people is open.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why can a bright beam of red light fail to do something that a faint beam of ultraviolet light does?
2. Why does each element have its own set of spectral lines?
3. What experiment showed that electrons are waves, and what did it measure?
4. Explain in words why an electron does not fall into the nucleus.
5. A spectral line is unusually wide. Give two possible physical reasons.
6. In the table of Section 3.6, which claims has a machine checked, which have experiments confirmed, and which still need evidence? What measurement would move the open hypothesis?
:::

## Worked Homework {.unnumbered}

::: {.problems title="Problem 3.1 — The four visible lines"}
Compute the wavelengths of the jumps from $n = 4$, $5$ and $6$ to $n = 2$, and compare them with the lines in the Soma Machine's atomic view.
:::

::: {.example title="Solution 3.1"}
**Strategy.** $E = 13.606\,(1/4 - 1/n^2)$, then $\lambda = 1239.84/E$.

**Solution.** $n = 4$: $E = 2.551\,\mathrm{eV}$, $\lambda = 486.0\,\mathrm{nm}$. $n = 5$: $E = 2.857\,\mathrm{eV}$, $\lambda = 433.9\,\mathrm{nm}$. $n = 6$: $E = 3.024\,\mathrm{eV}$, $\lambda = 410.1\,\mathrm{nm}$.

**Significance.** With $656.1\,\mathrm{nm}$ from Example 3.2 these are the four lines the app draws, rounded to $410$, $434$, $486$ and $656\,\mathrm{nm}$. **Try it:** `#level=atomic&lens=on&compare=1`. *Baseline:* Penrose, chapter 21 (the quantum particle) [@penrose2004road].
:::

::: {.problems title="Problem 3.2 — Ionising from an excited level"}
What is the longest wavelength that can ionise a hydrogen atom already in the $n = 2$ level? And from the ground state?
:::

::: {.example title="Solution 3.2"}
**Solution.** From $n = 2$ the binding energy is $13.6/4 = 3.40\,\mathrm{eV}$, so $\lambda = 1240/3.40 = 365\,\mathrm{nm}$, just beyond violet. From $n = 1$: $\lambda = 1240/13.6 = 91.2\,\mathrm{nm}$.

**Significance.** Ordinary near-ultraviolet light can ionise excited hydrogen, but only hard ultraviolet can ionise it from the ground state. The $91.2\,\mathrm{nm}$ limit marks a sharp edge in the spectra of hot stars and young galaxies.
:::

::: {.problems title="Problem 3.3 — A slower electron"}
Find the de Broglie wavelength of electrons of $1\,\mathrm{eV}$, $100\,\mathrm{eV}$ and $1000\,\mathrm{eV}$. Which would diffract from a crystal with atomic spacing $0.2\,\mathrm{nm}$?
:::

::: {.example title="Solution 3.3"}
**Solution.** $1.226/\sqrt{1} = 1.23\,\mathrm{nm}$; $1.226/\sqrt{100} = 0.123\,\mathrm{nm}$; $1.226/\sqrt{1000} = 0.0388\,\mathrm{nm}$.

**Significance.** Diffraction needs $\lambda \le d$ to give a peak ($\sin\theta = \lambda/d \le 1$) and is clearest when $\lambda$ is not much smaller than $d$: the $100\,\mathrm{eV}$ electrons are best. The $1\,\mathrm{eV}$ electrons are too long to diffract from this spacing at all. *Baseline:* Penrose, chapter 21 [@penrose2004road].
:::

::: {.problems title="Problem 3.4 — The radio line of hydrogen"}
The spin of hydrogen's electron can flip relative to the proton's, emitting a photon at $1420.4\,\mathrm{MHz}$. Find its wavelength and its energy in eV. The upper state lasts on average about eleven million years; find $Q$.
:::

::: {.example title="Solution 3.4"}
**Solution.** $\lambda = c/f = 3.00\times10^8/1.4204\times10^9 = 0.211\,\mathrm{m}$, the famous **21 cm line**. $E = hf = 4.136\times10^{-15}\,\mathrm{eV\,s}\times1.4204\times10^9\,\mathrm{Hz} = 5.87\times10^{-6}\,\mathrm{eV}$. $Q = 2\pi f\tau = 2\pi\times1.42\times10^9\times(1.1\times10^7\times3.16\times10^7\,\mathrm{s}) \approx 3\times10^{24}$.

**Significance.** The energy is far too small to need a hot gas, so cold hydrogen between the stars glows faintly at 21 cm, and radio telescopes use it to map the spiral arms of the Milky Way (Chapter 9). Each atom is the sharpest oscillator in this book, but it emits so rarely that the line is visible only because galaxies hold so many atoms. *Baseline:* Penrose, chapter 22 (spin) [@penrose2004road].
:::

::: {.problems title="Problem 3.5 — The second orbit"}
Find the Bohr radii $r_2$ and $r_3$, and the wavelength of the photon emitted in the jump from $n = 3$ to $n = 1$.
:::

::: {.example title="Solution 3.5"}
**Solution.** $r_2 = 4\times0.0529 = 0.212\,\mathrm{nm}$; $r_3 = 9\times0.0529 = 0.476\,\mathrm{nm}$. $E = 13.6\,(1 - 1/9) = 12.09\,\mathrm{eV}$, so $\lambda = 1240/12.09 = 102.5\,\mathrm{nm}$.

**Significance.** The atom's size grows as $n^2$, so highly excited atoms are enormous: at $n = 100$ the radius is half a micrometre, ten thousand times the ground state. Such **Rydberg atoms** are now used as sensitive detectors of radio-frequency fields. *Baseline:* Penrose, chapter 21 [@penrose2004road].
:::
