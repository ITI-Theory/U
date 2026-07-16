# Scale 3 — Atomic / Electromagnetic ($10^{-10}$ m)

\begin{tcolorbox}[colback=gray!8, colframe=gray!40,
  title=\textbf{Scale 3 — Atomic / Electromagnetic ($10^{-10}$ m)}]

\textbf{The equation (always):}
$$(\nabla^2 + k^2)\, G(x, x') = \delta(x - x')$$

\begin{tabular}{ll}
\textbf{$k$ at this scale:} & $k = 0$ (Coulomb: massless photon) or $k = \omega/c$ (radiation) \\
\textbf{Physical substrate:} & Atoms: nucleus + electron cloud; periodic table \\
\textbf{Propagator $G$:} & Coulomb kernel: $G_\text{EM}(r) = 1/(4\pi r)$ (static) \\
                          & Radiation: $G(r) = e^{ikr}/(4\pi r)$ (propagating) \\
\textbf{Mind matrix rank $N$:} & Atomic orbital basis: $\sim 10^2$ per atom \\
\textbf{Boundary conditions:} & Atomic orbital extent $\sim 10^{-10}$ m; periodicity (crystal) \\
\textbf{Key property:} & $k=0$ gives infinite range: first long-range force in atlas \\
\end{tabular}
\end{tcolorbox}

\vspace{1em}

---

![The hydrogen atom: a proton (red) surrounded by a probability cloud
representing the 1s electron orbital. The cloud is not a picture of the
electron's position — it is a picture of G: the probability amplitude for
finding the electron at each point, given the proton as the source.
*(OpenStax University Physics 3, Figure 8.2)*](figures/hydrogen-atom-s3-placeholder.png){width=75%}

---

## PHYSICAL

The atom is the smallest unit of a chemical element. For hydrogen
(the simplest): one proton at the centre, one electron in a cloud
around it. For uranium (the heaviest stable element): 92 protons,
92 electrons in a complex nested shell structure.

The key transition at Scale 3 is the appearance of the
**Coulomb propagator** — the Green's function of the electrostatic
field with $k = 0$ (the photon is massless). This is the first
propagator in the atlas with **infinite range**: $G_\text{EM}(r) = 1/(4\pi r)$
never reaches zero. Electromagnetism reaches across the entire universe.

Compare with the nuclear Yukawa propagator (Scale 2):
$G_\text{nuc}(r) = e^{-m_\pi r}/(4\pi r)$. The exponential factor
makes the nuclear force short-ranged. Remove the exponential — set
$m=0$ (massless carrier) — and you get the Coulomb propagator.
The transition from Scale 2 to Scale 3 is the transition from
a massive to a massless propagator.

At Scale 3, the physical substrate is the **electron cloud**: the
quantum-mechanical probability distribution of electrons around
the nucleus, governed by the Schrödinger equation with the Coulomb
potential as the source term.

---

![The first four hydrogen orbitals (1s, 2s, 2p, 3d) shown as
probability density surfaces. Each orbital is an eigenfunction of the
Hamiltonian with the Coulomb Green's function as the interaction kernel.
The shape of each orbital is a resonant mode of G evaluated at the
atomic boundary conditions — the nuclear Coulomb potential.
*(OpenStax University Physics 3, Figure 8.6)*](figures/hydrogen-orbitals-s3-placeholder.png){width=85%}

---

## FIELD

The Coulomb propagator at Scale 3 is:

$$G_\text{EM}(r) = \frac{1}{4\pi r}, \qquad r = |x - x'|$$

This is $G$ for the equation $\nabla^2 G = \delta$ (Laplace equation,
$k=0$). The "poke" is a point charge at $x'$; the "response" is the
electrostatic potential at $x$.

For a propagating electromagnetic wave (radiation):

$$G_\text{rad}(r, t) = \frac{e^{i(kr - \omega t)}}{4\pi r},
\qquad k = \omega/c$$

This is the retarded Green's function of the wave equation
$(\nabla^2 - c^{-2}\partial_t^2) G = \delta$. It is exactly the
master equation with $k = \omega/c$.

**The transition from static to radiation:**

When a charge accelerates, it radiates. The static Coulomb field
($k=0$) develops a radiation component ($k = \omega/c$). This is
the origin of light: an accelerating charge couples the static
Coulomb mode to the radiation mode. The emission rate is:

$$P = \frac{q^2 a^2}{6\pi \epsilon_0 c^3} \quad \text{(Larmor formula)}$$

Every photon ever emitted — every quantum of light in the universe —
is this transition from static to dynamic in the Coulomb Green's
function. Scale 3 is where light is born.

---

![Emission spectrum of hydrogen: discrete lines at 410, 434, 486,
and 656 nm (the Balmer series). Each line corresponds to a transition
between atomic energy levels — a jump between eigenmodes of the
Coulomb Green's function. The frequency of each photon emitted is
the frequency difference between two resonant modes of G. The spectrum
is a direct readout of G's eigenvalue structure.
*(OpenStax Chemistry 2e, Figure 6.3)*](figures/hydrogen-spectrum-s3-placeholder.png){width=85%}

---

## MIND

The mind matrix at Scale 3 is the **atomic orbital basis**: the
complete set of electron states available to the atom.

For hydrogen: $N = \infty$ in principle (infinite series of orbitals
1s, 2s, 2p, 3s, ...), but practically $N \approx 10^2$ bound states
below the ionisation threshold.

For a many-electron atom (say, carbon): the orbital basis is the
product of single-electron states — exponentially large in principle
($N \sim 2^Z$ for $Z$ electrons), but the ground state configuration
plus low-lying excited states provide effective $N \approx 10^3$.

The mind at Scale 3 is **chemical memory**: the discrete set of
electron configurations the atom can adopt. The ground state is the
"calm" attractor — the lowest-energy configuration. Excited states
are higher attractors. Ionisation is the escape from all attractors.

This is the first scale where the mind matrix is exactly computable
and fully understood. Quantum chemistry can calculate the complete
energy spectrum of small atoms to arbitrary precision. Scale 3 is
where physics becomes chemistry — and where the mind matrix can,
for the first time, be measured with exact numbers.

---

![The periodic table reorganised as a 3D energy landscape: height = ionisation
energy (barrier to removing an electron). Noble gases are deep valleys
(strongly bound, chemically inert). Alkali metals are shallow peaks
(easily ionised, chemically reactive). The periodic table IS the mind
matrix of Scale 3, rendered as a topographic map.
*(OpenStax Chemistry 2e, Figure 7.13 adapted)*](figures/periodic-table-energy-s3-placeholder.png){width=90%}

---

## SAME AS ALWAYS

---

![The $1/r$ propagator at four different physical scales: electrostatic
field between charges (Scale 3, Å), sound intensity vs distance from a
speaker (Scale 8, m), seismic far-field amplitude (Scale 10, km), and
gravitational field between bodies (Scale 12, AU). All four are
$G(r)\propto 1/r$. The equation has not changed. Only the substrate has.
*(Generated: `FS3_four_one_over_r.png`)*](figures/FS3_four_one_over_r.png){width=95%}

---

> *The equation has not changed. Only the substrate has.*

The $1/r$ Coulomb propagator is the most familiar Green's function
in physics. It is also, as the panels above show, not unique to
electromagnetism. Gravity, acoustics, seismology — anywhere a
disturbance propagates outward from a point source in 3D space,
the amplitude falls as $1/r$. This is not coincidence. It is the
same equation, with $k=0$, evaluated at different scales.

Turn the dial.
