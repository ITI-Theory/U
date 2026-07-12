# Scale 2 — Nuclear / Quark-Gluon ($10^{-15}$ m)

\begin{tcolorbox}[colback=gray!8, colframe=gray!40,
  title=\textbf{Scale 2 — Nuclear / Quark-Gluon ($10^{-15}$ m)}]

\textbf{The equation (always):}
$$(\nabla^2 + k^2)\, G(x, x') = \delta(x - x')$$

\begin{tabular}{ll}
\textbf{$k$ at this scale:} & $k_\text{nuc} \approx 1/r_p \approx 10^{15}$ m$^{-1}$ (proton radius) \\
\textbf{Physical substrate:} & Quarks and gluons; atomic nuclei \\
\textbf{Propagator $G$:} & Yukawa kernel: $G(r) = e^{-m_\pi r}/(4\pi r)$ \\
\textbf{Mind matrix rank $N$:} & S-matrix: $\sim 10^2$ nuclear energy levels per nucleus \\
\textbf{Boundary conditions:} & Confinement radius $r \lesssim 1$ fm; colour neutrality \\
\textbf{Characteristic energy:} & $\sim 1$ GeV (strong force binding energy) \\
\end{tabular}
\end{tcolorbox}

\vspace{1em}

---

![A false-colour visualisation of a proton: three quarks (red, green,
blue) connected by tubes of gluon field (the "flux tubes"). The quarks
cannot be isolated; the energy cost of separating them exceeds the
energy needed to create a new quark-antiquark pair. Confinement.
The gluon field tubes are G at nuclear scale.
*(OpenStax University Physics 3, Figure 44.9; colour added)*](figures/proton-quarks-s2-placeholder.png){width=85%}

---

## PHYSICAL

The proton has a diameter of approximately $1.7 \times 10^{-15}$ m —
one femtometre. Inside it, three quarks are bound together by the
**strong nuclear force**, carried by massless particles called gluons.
Unlike electromagnetism (where the field between two charges weakens
with distance), the strong force gets *stronger* as quarks are pulled
apart. The energy stored in the gluon field grows linearly with
separation. This is **confinement**: quarks cannot exist in isolation.

At Scale 2, the physical substrate is:
- **Quarks**: fractionally charged fermions ($+2/3$ and $-1/3$ charge)
  bound in triplets (baryons: protons, neutrons) or pairs (mesons)
- **Gluons**: massless bosons carrying the strong force
- **Nuclei**: arrangements of protons and neutrons held together by
  the residual strong force (the Yukawa interaction)

The periodic table — all 118 known elements — is built from
rearrangements of just three quarks (up, down, strange) in different
nuclear configurations. The entire material world that supports
biological life at Scale 5–8 is built on the combinatorics of
Scale 2.

---

![The periodic table of elements arranged by nuclear charge (proton
number Z) from hydrogen (Z=1) at top-left to oganesson (Z=118).
Every element is a different nuclear configuration at Scale 2.
The diversity of the material world at Scales 4–8 is entirely
determined by which nuclear configurations are stable.
*(OpenStax Chemistry 2e, Figure 6.1)*](figures/periodic-table-s2-placeholder.png){width=90%}

---

## FIELD

The propagator at Scale 2 is the **Yukawa Green's function**:

$$G_\text{nuc}(r) = \frac{e^{-m_\pi r}}{4\pi r}$$

where $m_\pi \approx 140$ MeV/$c^2$ is the pion mass (the lightest
meson, which mediates the residual strong force between nucleons)
and $r = |x - x'|$.

Compare this to the Coulomb Green's function from Scale 3
(electromagnetism):

$$G_\text{EM}(r) = \frac{1}{4\pi r}$$

The Yukawa function has an extra exponential damping factor
$e^{-m_\pi r}$. This encodes the fact that the nuclear force is
**short-ranged**: it drops to negligible strength for $r \gg 1/m_\pi
\approx 1.4$ fm. At larger distances, only the long-range
electromagnetic and gravitational forces matter.

This is the first time in the atlas that the propagator deviates
from the pure $1/r$ form. It is not the last: at every scale, the
boundary conditions and the effective mass $k = m_\pi c/\hbar$ modify
the shape of $G$. The equation is the same; the kernel changes.

The "poke" at Scale 2 is a **nucleon–nucleon collision**: a proton
or neutron struck by another nucleon. The "response" is the exchange
of pions and the resulting nuclear force. $G_\text{nuc}$ is the
answer to: *given a nucleon source at $x'$, what is the strong force
field at $x$?*

---

![The Yukawa potential $e^{-mr}/r$ (solid, nuclear force — Scale 2)
vs the Coulomb potential $1/r$ (dashed, EM force — Scale 3), both
on a log scale. The exponential factor makes the nuclear force short-ranged;
removing it (setting $m=0$, massless photon) gives the Coulomb propagator.
Same master equation; different wavenumber $k$.
*(Generated: `FS2_yukawa_vs_coulomb.png`)*](figures/FS2_yukawa_vs_coulomb.png){width=80%}

---

## MIND

The mind matrix at Scale 2 is the **nuclear S-matrix**: the complete
table of outcomes for all possible nucleon-nucleon scattering events.

$N_2 \approx$ (number of nuclear energy levels per nucleus)
$\times$ (number of distinct nuclei) $\approx 10^2 \times 3000 \approx 10^5$

This is the smallest "mind" in the atlas. The nuclear S-matrix is
small and well-defined: nuclear physicists have measured most of
its entries to high precision using particle accelerators. This is
the first scale at which the mind matrix is practically computable
— small enough to fit in a computer, large enough to encode the
structure of all elements.

The "information processing" at this scale is **nuclear fusion and
fission**: two nuclei interact, exchange quantum numbers, and separate
into new configurations. The nuclear S-matrix records the probability
of each outcome. The universe "processes" this information at stellar
cores (Scale 14), where fusion of hydrogen into helium powers every
star.

---

![A table of nuclear binding energies per nucleon across the periodic
table — the "nuclear binding energy curve". This curve is the
eigenvalue spectrum of the mind matrix at Scale 2: each value
is the energy of a stable nuclear configuration. The curve peaks at
iron-56 (most stable nucleus). Everything lighter can fuse; everything
heavier can fission. The curve is the mind's memory of which
configurations persist.
*(OpenStax University Physics 3, Figure 43.2)*](figures/nuclear-binding-energy-s2-placeholder.png){width=85%}

---

## SAME AS ALWAYS

---

![Side by side: (left) the Yukawa force between two nucleons — an
exponentially decaying field confined within $10^{-15}$ m. (right)
the gravitational force between two galaxy clusters — an exponentially
decaying perturbation in the dark-energy-dominated universe, confined
to the local gravitational well. Both are Yukawa-type propagators:
$G(r) = e^{-mr}/(4\pi r)$. Different mass parameter $m$. Different
physical scale. Same equation.
*(Schematic; see Scale 18 for cosmic comparison)*](figures/yukawa-galaxy-comparison-s2-placeholder.png){width=90%}

---

> *The equation has not changed. Only the substrate has.*

The nucleus is a world in itself: a miniature solar system of bound
particles, held together by the strongest force in nature. Yet the
mathematics that governs it is a special case of the same equation
that governs the Klöntalersee's seismic Green's function at
Scale 10, the brain's CEMI field at Scale 6, and the cosmic web's
gravitational propagator at Scale 20.

Turn the dial.
