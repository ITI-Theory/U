# Scale 4 — Molecular / Chemical Bond ($10^{-9}$ m)

\begin{tcolorbox}[colback=gray!8, colframe=gray!40,
  title=\textbf{Scale 4 — Molecular / Chemical Bond ($10^{-9}$ m)}]

\textbf{The equation (always):}
$$(\nabla^2 + k^2)\, G(x, x') = \delta(x - x')$$

\begin{tabular}{ll}
\textbf{$k$ at this scale:} & $k = \sqrt{2m_e E}/\hbar \approx 10^{10}$ m$^{-1}$ (electron) \\
\textbf{Physical substrate:} & Atoms, covalent bonds, crystal lattices \\
\textbf{Propagator $G$:} & Schrödinger Green's function; electron density propagator \\
\textbf{Mind matrix rank $N$:} & Molecular orbital basis: $\sim 10^2$–$10^4$ per molecule \\
\textbf{Boundary conditions:} & Molecular geometry; periodic (crystal) or free (gas) \\
\textbf{Characteristic energy:} & $\sim 1$–$10$ eV (bond energy, photon energy of visible light) \\
\end{tabular}

\end{tcolorbox}

\vspace{1em}

---

![A DNA double helix at atomic resolution, visualised by X-ray
crystallography. The two strands are held by hydrogen bonds (pale blue
dashed lines). The regular spacing of the base pairs — the periodicity
of the helix — is the ground state of the molecular mind matrix:
the lowest-energy spatial configuration the system can adopt.
*(OpenStax Biology 2e, Figure 3.9; crystallography data: PDB 1BNA)*](figures/dna-helix-s4-placeholder.png){width=85%}

---

## PHYSICAL

A carbon atom has 6 protons, 6 neutrons, and 6 electrons. At Scale 4,
what matters is not the nucleus (that was Scale 2) but the **electron
cloud**: the quantum-mechanical probability distribution of the 6
electrons around the nucleus. The shape of this cloud determines
everything about how carbon interacts with other atoms.

Carbon forms four bonds. It can bond with hydrogen (to make methane,
CH₄), with oxygen (to make carbon dioxide, CO₂), with other carbons
(to make graphite, diamond, buckyballs, graphene). The variety of
carbon chemistry — the entire foundation of organic chemistry and
therefore life — arises from the geometry of the electron density
distribution.

The physical substrate at Scale 4:
- **Covalent bonds**: shared electron pairs between atoms
- **Hydrogen bonds**: electrostatic attraction between polar molecules
  (water, DNA base pairing)
- **Van der Waals forces**: induced dipole interactions
- **Crystal lattices**: periodic repeating arrangements (salt, ice,
  quartz, silicon)

The material world at Scales 5–8 (life, brains, bodies) is built
from the combinatorics of Scale 4. Every protein, every membrane,
every enzyme is a specific molecular geometry — a specific
configuration of the electron density field.

---

![The tetrahedral geometry of a methane molecule (CH₄). The central
carbon atom (grey) bonds to four hydrogen atoms (white) with a
bond angle of 109.5°. This geometry is not arbitrary; it is the
energy minimum of the electron density wave function under the
constraint of four bond pairs. Geometry is physics.
*(OpenStax Chemistry 2e, Figure 7.5)*](figures/methane-tetrahedral-s4-placeholder.png){width=70%}

---

## FIELD

The propagator at Scale 4 is the **Schrödinger Green's function**:
the electron's quantum amplitude for propagating from $x'$ to $x$.

For a free electron with energy $E$:
$$G_e(x, x') = \frac{e^{ik|x-x'|}}{4\pi|x-x'|}, \qquad
k = \frac{\sqrt{2m_e E}}{\hbar}$$

This is the same form as the nuclear Yukawa propagator (Scale 2),
except now $k$ is set by the electron mass and energy, not the pion
mass. The electron is lighter than the pion; its de Broglie wavelength
is longer; the field is longer-ranged.

In a molecule, the boundary conditions on $G$ are set by the nuclear
positions (the positively charged nuclei attract the electron cloud).
The **molecular orbitals** — the actual electron distribution in a
molecule — are the eigenfunctions of the Schrödinger operator with
these nuclear boundary conditions. They are the resonant modes
of the molecular propagator.

A **chemical bond** is where the electron density propagator $G$
develops a local maximum between two nuclei: the electrons are
"shared", the energy is lowered, and the atoms are attracted.
The bond is a pattern in $G$. It is the field's answer to:
*given nuclei at positions $\{R_i\}$, what is the electron density
at $x$?*

---

![Electron density maps of three molecules: (left) H₂ (hydrogen
molecule) — density concentrated in the bond region between nuclei;
(centre) H₂O (water) — asymmetric density creating a dipole;
(right) benzene (C₆H₆) — delocalised ring density (the famous
aromatic system). Each map is a direct visualisation of G evaluated
at the molecular boundary conditions.
*(OpenStax Chemistry 2e; electron density data from DFT calculations)*](figures/electron-density-maps-s4-placeholder.png){width=90%}

---

## MIND

The mind matrix at Scale 4 is the **molecular orbital basis**:
the complete set of electronic states available to the molecule.

For a simple diatomic (two atoms): $N \approx 10$.
For a small protein (a few hundred atoms): $N \approx 10^3$.
For DNA (a few thousand base pairs): $N \approx 10^4$.

The mind at Scale 4 is **molecular memory**: the set of stable
conformational states a molecule can adopt. For an enzyme, this
includes the open and closed forms of the active site — the two
"memories" that determine whether the enzyme catalyses its reaction
or not. For a DNA double helix, it includes the B-form (normal)
and Z-form (stress-induced) configurations. For a rhodopsin molecule
(the visual pigment in the retina), it includes the 11-cis (dark)
and all-trans (light-activated) retinal configurations.

Molecular conformation is molecular memory. The protein "knows"
its folded state. The enzyme "knows" its active configuration.
The photoreceptor "knows" whether it has been struck by a photon.
This is not metaphor. It is the lowest-energy stable state of the
electron density wave function — a minimum in the molecular
Hamiltonian.

At Scale 4, the mind matrix is small enough to be computed
ab initio (from first principles). This is the domain of
**computational chemistry**: density functional theory, Hartree-Fock,
molecular dynamics. The mind is calculable here.

---

![The two conformations of the rhodopsin chromophore: 11-cis-retinal
(dark state, bent shape) and all-trans-retinal (light-activated,
extended shape). A single photon absorbed by the chromophore provides
just enough energy to flip the molecule from one attractor to the
other. This is a Scale-4 attractor transition. The same mathematics
governs the Scale-8 trauma attractor transition — the barrier
heights are different, but the equation is the same.
*(OpenStax Biology 2e, Figure 35.13 adapted)*](figures/rhodopsin-conformations-s4-placeholder.png){width=80%}

---

## SAME AS ALWAYS

---

![Left: the retinal chromophore double-well (Scale 4, $10^{-9}$ m,
$W\approx4$ eV) — two conformational minima separated by a barrier.
Right: the limbic trauma attractor (Scale 8, $10^{0}$ m, $W=10$) —
two attractor basins separated by a higher barrier. Same double-well
shape $V(x)=W(x^2-1)^2$, 25 orders of magnitude apart.
*(Generated: `FS4_molecular_limbic.png`)*](figures/FS4_molecular_limbic.png){width=90%}

---

> *The equation has not changed. Only the substrate has.*

The retinal chromophore flipping from dark to light — a conformation
change triggered by a single photon — is the same mathematical event
as a trauma attractor giving way under therapeutic pressure. A single
photon of the right energy. A single musical impulse at the right
moment. The barrier height differs by 25 orders of magnitude. The
equation is the same.

Turn the dial.
