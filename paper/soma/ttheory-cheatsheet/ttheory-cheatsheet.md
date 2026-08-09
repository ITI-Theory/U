---
title: "[T]-Theory — Reference Card"
author: "Alistair Johnson · ORCID 0009-0007-2194-0850"
date: "2026"
lang: en-GB
geometry: "a4paper,landscape,margin=12mm"
fontsize: 9pt
linestretch: 1.1
header-includes: |
  \usepackage{amsmath}\usepackage{amssymb}\usepackage{multicol}
  \usepackage{booktabs}\usepackage{array}\usepackage{xcolor}
  \AtBeginDocument{\begin{multicols}{3}}
  \AtEndDocument{\end{multicols}}
  \setlength{\columnsep}{8mm}
  \setlength{\columnseprule}{0.3pt}
---

# I · Master Field Equation

**Stationary (Helmholtz):**
$$(\nabla^2 + k^2)\,G(x,x') = -\delta^3(x-x')$$

**Time-dependent (d'Alembertian):**
$$\!\left(\tfrac{1}{v_s^2}\partial_t^2 - \nabla^2 + k^2\right)\Phi_{\mu\nu}(x,t) = -J_{\mu\nu}(x,t)$$

**Retarded propagator** ($\tau = t-t'>0$, $r=|x-x'|$):
$$G_R(r,\tau) = \tfrac{v_s}{4\pi r}e^{-kv_s\tau}\,\delta(\tau-r/v_s)\,\theta(\tau)$$

**Memory kernel** ($\tau_m = 1/kv_s$):
$$K(\tau) = K_0\,e^{-\tau/\tau_m}\,\theta(\tau)$$

**General solution** (field = integral of past):
$$\Phi(x,t) = \Phi^{(0)} + \int_{-\infty}^t\!\!dt'\!\int\! d^3x'\; G_R\,J$$

# II · Type-Theoretic Architecture

**Σ-type** (soma-field as fiber bundle over Scale):
$$\text{SomaField} \equiv \textstyle\sum_{(\sigma:\,\mathrm{Scale}_{20})} \mathrm{Substrate}(\sigma)$$

**Zoom Operator** (dependent type constructor):
$$\Lambda : (\sigma:\mathrm{Scale}_{20}) \to \mathrm{Sub}(\sigma) \to \mathrm{Sub}(\sigma{+}1)$$

**Retarded propagator type** (causality as proof argument):
$$G_R:(t\;t':\mathrm{Time})\to(t'<t)\to\mathrm{Sp}\to\mathrm{Sp}\to\mathrm{Field}$$

**BFSS cortex** (coordinates emerge from eigenvalues):
$$\mathrm{CortexCoords} \equiv \mathrm{eigenvalues}(X),\quad X^\dagger=X,\;X\in M_{3\times3}(\mathbb{C})$$

**Full USF type:**
$$\mathrm{USF} \equiv \textstyle\sum_{(\sigma:\,\mathrm{Scale}_{20})} \bigl(\mathrm{Sub}(\sigma)\times G_R(\sigma)\bigr)$$

# III · Attractor Dynamics

**Hopfield energy:**
$$H(\mathbf{e}) = -\tfrac{1}{2}\mathbf{e}^\top W\mathbf{e}$$

**FM-HN inverse temperature** (Lean 4 verified):
$$\beta(t) = \beta_0 + \kappa|\Phi(t)|^2 \;\xrightarrow{\Phi\to 0}\; \beta_0$$

**Consciousness threshold** $T_c$: spectral gap opens at $|\phi|>T_c$

**Kramers mean first-passage time:**
$$\langle T\rangle = \tfrac{2\pi}{\omega_A\omega_B}\,e^{\Delta V/D}$$

**Trauma asymmetry:**  $T_\mathrm{form} \ll T_\mathrm{dissolve}$ because crossing barrier from above vs below

**WKB tunnelling amplitude:**
$$P\approx\exp\!\left(-\tfrac{2}{\hbar_\mathrm{geo}}\!\int_{q_1}^{q_2}\!\sqrt{V(q)-E}\;dq\right)$$

**Arnold tongue** (Huygens locking, width = social/attentional bandwidth):
$$|\omega_\mathrm{ext}-\omega_0|<\Delta\omega_\mathrm{lock}(\kappa)$$

**SHO frequency** (physlib $\omega\_sq$):
$$\omega^2 = k/m \qquad\text{(dispersion: }\omega^2=v^2k^2\text{)}$$

# IV · 11D Decomposition

$$M_{11} = M_4\times X_7,\quad X_7 = D_{5\text{–}7}\times D_8\times D_{9\text{–}11}$$

- $D_{1\text{–}4}$ **Spacetime** — body in 3+1D Lorentzian space
- $D_{5\text{–}7}$ **Propagator** — somatic EM field / D3-brane gauge field
- $D_8$ **Limbic** — Hořava-Witten orbifold $S^1/\mathbb{Z}_2$, $[-1,+1]$
- $D_{9\text{–}11}$ **Cortex** — BFSS matrix eigenvalues (emergent geometry)

**Organism hierarchy:**
$$11\text{D}\xrightarrow{\text{project}} 7\text{D}\xrightarrow{\text{project}} 4\text{D}$$

# V · Key Identifications

- **SHO $\equiv$ Green's fn** — string vibration = field impulse response
- **Nash $\equiv$ Hopfield min** — $\mathrm{Nash}(G)=\arg\min H(\mathbf{e})$
- **Rights $\equiv$ topo. invariants** — stable under cts. landscape deformation
- **Rule of law $\equiv$ ergodicity** — $\bar{f}_\mathrm{time}=\bar{f}_\mathrm{ensemble}$
- **Rapport $\equiv$ Huygens locking** — $\dot\phi_1-\dot\phi_2\to 0$
- **SQ $\equiv$ spectral gap** — $\lambda_1(\hat{L}_{ij})$
- **Crash $\equiv$ phase transition** — $T\to T_c^+$, $\xi\to\infty$
- **$b\approx1$ $\equiv$ universality** — Gutenberg-Richter from symmetry group
- **Groove $\equiv$ Arnold tongue entry** — $\eta_\mathrm{lock}$
- **Somatic therapy** — $\eta_\mathrm{som}/\eta_\mathrm{cog}\approx\kappa_\mathrm{EC}^{-1}$

# VI · Clinical Operators

**ASC** — high $\beta$, narrow Arnold tongue, deep stable attractors

**CPTSD** — non-ergodic field, $\kappa_\mathrm{EC}\ll 1$ (EC decoupled)

**ADHD** — high field temperature $T$, flat landscape, rapid transitions

**Co-occurrence** (ASC∩CPTSD): high $\beta$ → deeper trauma wells on adverse input

**Window of tolerance** = temporal bandwidth of $G_R$:
$$T_\mathrm{field}\in[T_\mathrm{min},T_\mathrm{max}]\;\Leftrightarrow\;\text{processing possible}$$

**Somatic injection** bypasses EC junction, acts directly on $\Phi$

# VII · Scale Map (20 levels, $\sigma\in\{0,\ldots,19\}$)

- $\sigma$ 0–2: Quantum/atomic — $\hbar_\mathrm{geo}$, nuclear
- $\sigma$ 3–5: Molecular/cellular — ion channels, neurons
- $\sigma$ 6–7: Organism — whole brain, somatic field
- $\sigma$ 8–9: Dyadic/group — rapport, swarm O(N²)
- $\sigma$ 10: Geographic/geological — dialect spread, tectonics
- $\sigma$ 11–14: Social/civilisational — culture, economy, law
- $\sigma$ 19: Cosmological — CMB, $\Lambda\equiv\langle\mathrm{tr}\,\Phi\rangle_0$

**Cosmological limit:** $\kappa_\mathrm{bio}\to 0 \Rightarrow$ linearised Einstein eq.

# VIII · Lean 4 Status (2026-08-09)

- `MTheoryIsomorphism` $\omega^2=k/m$ ✓ physlib `trajectory_equationOfMotion`
- `MTheoryIsomorphism` wave equation ✓ physlib `planeWave_waveEquation`
- `LimbicHopfield` FM-HN Correspondence ✓ kernel
- `SwarmPropagator` $O(N^2)$ bound ✓ kernel
- `LimbicTunnel` WKB amplitude $\Theta(W)$ ✓ `native_decide`
- `ScaleUniverse` consciousness threshold ✓ kernel
- `BFSSIsomorphism` cortex eigenvalue emergence ✓ Mathlib
- G₂ holonomy of $X_7$ ✗ axiom (needs Riemannian geometry)
- Zoom Operator covariance ✗ axiom (needs tensor field formalism)

---

*GitHub: ITI-Theory/U · Zenodo: doi.org/10.5281/zenodo.20460771*
