---
title: "The Cosmological Constant as the Vacuum Amplitude of the Universal Somatic Field"
subtitle: '$\Lambda \propto \langle\mathrm{tr}\,\Phi\rangle_0^2$ from USF Compactification'
author: "Alistair Johnson"
date: "2026"
lang: en-GB
bibliography: ../../bibliography.bib
csl: ../../apa-7th.csl
abstract: |
  Within the USF compactification model, we derive a candidate expression for
  the cosmological constant $\Lambda$ from the vacuum expectation value
  of the trace of the Universal Somatic Field tensor,
  $\Lambda \propto \langle\mathrm{tr}\,\Phi_{\mu\nu}\rangle_0^2$. The identification avoids the standard
  zero-point-energy approach (which overshoots by $10^{117}$) by treating $\Lambda$
  as a **classical background amplitude** rather than a quantum fluctuation sum.

  Numerical estimate: the required field amplitude $\Phi_0 \approx 1.4\,M_\text{Pl}$
  is a natural Planck-scale compactification value. The leading-order estimate
  gives $\Lambda_\text{USF} \approx H_0^2/c^2 \approx 0.49\,\Lambda_\text{obs}$;
  including the compact-dimension fraction (7 compact / 11 total) refines this to
  $\Lambda_\text{USF} = (21/11)H_0^2/c^2 \approx 0.93\,\Lambda_\text{obs}$ — a 7.1\%
  discrepancy attributed here to open Calabi-Yau/$G_2$ moduli geometry. Because
  $H_0$ cancels in the ratio, this is equivalently the dimensionless comparison
  $\Omega_\Lambda = 7/11$ against the observed 0.6847, given the measured $H_0$. The full
  physical cosmological correspondence requires linearised general relativity in Mathlib.
---

# The Cosmological Constant Problem — USF Reframing

The standard approach to the cosmological constant computes the zero-point
energy of all quantum fields up to a UV cutoff $k_c$:
$$\rho_\Lambda^\text{ZPE} = \frac{1}{2}\int_0^{k_c}\frac{d^3k}{(2\pi)^3}
  \sqrt{k^2+m^2} \approx \frac{k_c^4}{16\pi^2}$$

For a string-scale cutoff $k_c = \ell_s^{-1} \approx 10/\ell_P$, this gives
$\Lambda_\text{ZPE} \approx 6 \times 10^{64}$ m$^{-2}$, overshooting the observed
value $\Lambda_\text{obs} \approx 1.09 \times 10^{-52}$ m$^{-2}$ by $10^{117}$
[@planck2018cosmology].

The USF reframing abandons this calculation entirely. Instead, we identify $\Lambda$
with the **vacuum field amplitude** at the cosmological scale, not with the
zero-point energy of all modes.

**Definition.** The cosmological somatic field is the restriction of the USF
propagator to Scale 19–20 ($\sigma = 19$, observable universe). Rather than
constructing the vacuum state via the standard summation of Simple Harmonic
Oscillator (SHO) decoupling modes — which produces the $10^{117}$ ZPE
catastrophe — the USF defines the vacuum expectation value through
**non-local Green function boundary propagators**. This is mathematically
analogous to the strongly-correlated condensed-matter systems (e.g.
high-temperature superconductors) where non-local Green functions replace
the BCS phonon-SHO approximation. Its stable vacuum state is the regulated
attractor of the 11-dimensional field under cosmological boundary conditions.
The cosmological constant is:
$$\boxed{\Lambda \equiv \frac{k_\text{cosm}^2\,\langle\mathrm{tr}\,\Phi\rangle_0^2}
{M_\text{Pl}^2 c^2}}$$
where $k_\text{cosm} = H_0/c$ is the cosmic wavenumber, $\langle\mathrm{tr}\,\Phi\rangle_0$
is the vacuum amplitude of the somatic tensor trace, and $M_\text{Pl}^2 = \hbar c/G$.

---

# Numerical Estimate

## Required vacuum amplitude

From the Friedmann equation:
$$\Lambda_\text{obs} = \frac{3\Omega_\Lambda H_0^2}{c^2}
  \approx 1.09\times10^{-52}\,\text{m}^{-2} \quad (\Omega_\Lambda = 0.6847,\;
  H_0 = 67.36\;\text{km/s/Mpc})$$

Setting $\Lambda_\text{USF} = \Lambda_\text{obs}$ and solving for $\Phi_0$:
$$\Phi_0 = \sqrt{\frac{\Lambda_\text{obs}\,M_\text{Pl}^2 c^2}{k_\text{cosm}^2}}
  \approx 8.9\times10^{34}\;\text{m}^{-1}$$

In Planck units:
$$\ell_P\,\Phi_0 \approx 8.9\times10^{34}\times 1.616\times10^{-35} \approx 1.43
  = \sqrt{3\,\Omega_\Lambda}$$

**This is order-of-magnitude unity.** The required vacuum amplitude is approximately
$1.4\,M_\text{Pl}$ — a natural Planck-scale value at the compactification boundary.

## Derivation of $\Phi_0 \sim M_\text{Pl}$ from compactification

The USF is a tensor field on $M_{11} = M_4 \times X_7$, following the
eleven-dimensional compactification setting of M-theory [@witten1995] and its
manifold-with-boundary extension [@horava1996]. The USF scale architecture and
Zoom Operator are developed in [@johnson2026usf]. At the Planck scale
($\sigma = 0$), the field amplitude is set by the compactification scale:
$$\Phi_0^{(\sigma=0)} \sim \ell_P^{-1} = M_\text{Pl}/(\hbar c)$$

The Zoom Operator $\Lambda_Z:\sigma\mapsto k(\sigma)$ (written $\Lambda$ in the
zoom papers; subscripted here to keep it apart from the cosmological constant)
acts on the field by
the geometric RG flow (kernel-checked in `RenormalisationGroup.lean` as
`geometricFlow_waveEquation`):
$$k(\sigma) = k_0\,/\,\Lambda_Z^\sigma$$

where $\Lambda_Z$ is the scale factor of the zoom step. At $\sigma=19$:
$$k_{19} = k_P / \Lambda_Z^{19} = H_0/c$$

The **field amplitude** transforms under the zoom as:
$$\Phi_0^{(\sigma)} = \Phi_0^{(0)} \cdot (k_\sigma/k_0)^{\Delta_\Phi}$$

where $\Delta_\Phi = 1$ (canonical dimension of a scalar field). But $\Phi$ here is
a background field (classical condensate), not a quantum fluctuation — its
vacuum value is pinned to the attractor of the regulated calm state. At the
cosmological scale, the regulated calm attractor has:
$$\Phi_0^{(19)} \sim \Phi_0^{(0)} \cdot (H_0/k_P)^0 = \Phi_0^{(0)}$$

(the classical background amplitude does **not** scale with the quantum
fluctuation dimension — it is set by the boundary condition at the compactification
surface). Hence $\Phi_0 \sim M_\text{Pl}$ at all scales, and the cosmological
constant is:
$$\Lambda_\text{USF} \sim k_\text{cosm}^2\cdot M_\text{Pl}^2 / M_\text{Pl}^2 = k_\text{cosm}^2 = H_0^2/c^2$$

**What is input and what is predicted.** The numbers below use the measured
$H_0$, and $k_\text{cosm} = H_0/c$ enters through the zoom: nineteen steps of
$10^{3.207}$ span $\log_{10}(k_P c/H_0) = 60.93$ decades, so unless the zoom step
is fixed independently of $H_0$, $k_\text{cosm}$ is an input. $H_0$ then cancels
in $\Lambda_\text{USF}/\Lambda_\text{obs}$: the quantitative content of this paper
is the dimensionless prediction $\Omega_\Lambda = 7/11$ given the measured $H_0$,
not an independent value of $\Lambda$. A derivation of the zoom step that does not
use $H_0$ would turn this consistency check into a prediction of $H_0$.

## Preliminary first-order estimate

$$\Lambda_\text{USF}^\text{(1)} = H_0^2/c^2 \approx 5.30\times10^{-53}\,\text{m}^{-2}$$
$$\frac{\Lambda_\text{USF}^\text{(1)}}{\Lambda_\text{obs}} = \frac{1}{3\Omega_\Lambda} \approx 0.49$$

This unrefined calculation captures 49\% of the observed value. The factor
$3\Omega_\Lambda \approx 2.05$ is resolved in \S2.4 by compact-dimension
counting, bringing the estimate to 93\%.

## Dark energy fraction from compact-dimension counting

The factor $3\Omega_\Lambda$ has a natural 11D interpretation. Of the 11
total dimensions:

- **7 compact** ($X_7$): vacuum energy cannot propagate in 4D; it
  contributes entirely to the 4D cosmological constant.
- **4 non-compact** ($M_4$): vacuum fluctuations distribute across
  matter, radiation, and curvature.

The leading-order vacuum energy partition fraction is:
$$\Omega_\text{vac}^\text{USF} = \frac{N_\text{compact}}{N_\text{total}} = \frac{7}{11} \approx 0.6364$$

The complementary non-compact spatial-sector accounting is developed in the
companion dark-matter analysis [@johnson2026darkmatter].

**Origin of the factor of 3.** The standard definition of critical density,
$\rho_\text{crit} = 3H^2/(8\pi G)$, introduces a factor of 3 relative to bare
energy densities. The cosmological constant inherits this factor:
$\Lambda = 8\pi G \rho_\Lambda / c^2 = 3\Omega_\Lambda H_0^2/c^2$.
With $\rho_\Lambda = (7/11)\rho_\text{vac}$ and the assumption that the total
vacuum energy equals the critical density of a flat universe,
$\rho_\text{vac} = \rho_\text{crit} = 3H_0^2/(8\pi G)$, the factor of 3 from the
Friedmann normalisation appears directly:
$$\Lambda_\text{USF} = 3 \times \frac{7}{11} \times \frac{H_0^2}{c^2}
  = \frac{21}{11}\,\frac{H_0^2}{c^2} \approx 1.01\times10^{-52}\;\text{m}^{-2}$$

$$\frac{\Lambda_\text{USF}}{\Lambda_\text{obs}} = \frac{7/11}{\Omega_\Lambda}
  = \frac{0.6364}{0.6847} = 0.929 \approx 0.93 \quad (93\%\text{ of observed})$$

This uses the exact Planck 2018 TT,TE,EE+lowE+lensing baseline and is 7.1\% low.

The 7.1\% discrepancy is assigned here to an open compactification-geometry
correction: the actual metric data on $X_7$ may depart from simple
dimension-counting by $\sim 7\%$, consistent with possible
$\mathcal{O}(\alpha')$ corrections in string compactifications.
This is the content of the open axiom `calabi_yau_rg_coefficients`, not a
computed correction.

**Note on $\Omega_\Lambda(t)$.** The parameter
$\Omega_\Lambda(t) = \rho_\Lambda/\rho_\text{crit}(t)$ is time-dependent.
The ratio 7/11 is the constant topological partition of vacuum energy,
not the dynamic density ratio. The 7.1\% agreement between 7/11 and the
current $\Omega_\Lambda^\text{obs} = 0.6847$ is an empirical consistency
check: $\rho_\Lambda$ is constant while $\rho_\text{crit}(t)$ varies.

---

# Formal Status

## Lean 4 formalisation mapping

The structural claims of this paper are formalised in
`paper/proofs/CosmologicalConstant.lean` and `UniversalSomaticField.lean`,
using Lean 4 [@leanprover2021]:

| Statement | Lean name | Status |
|---|---|---|
| 7/11 vacuum partition | `omega_lambda_fraction` | **proved** (`norm_num`) |
| Planck 2018 discrepancy bound | `omega_lambda_discrepancy_small` | **proved for exact Planck 2018 values** (`norm_num`) |
| Positive vacuum amplitude witness | `cosmological_constant_identification` | **proved weak form** (`∃ Phi0 > 0`) |
| $\Lambda$ exists at scale 19 | `cosmological_correspondence` | **proved weak form** (field-equation inhabitance) |
| Geometric RG flow consistency | `geometricFlow_waveEquation` | **proved** |
| Calabi-Yau moduli coefficients | `calabi_yau_rg_coefficients` | axiom in `RenormalisationGroup.lean` |
| Universe satisfies 11D structure | `universe_is_11D_organism` | definition |
| $w = -1$ equation of state | `usf_equation_of_state` | type-level placeholder: states only that some $w = -1$ and some constant function with value 7/11 exist; the physics ($w = -1$ for the USF condensate) is not formalised |

## Remaining proof obligations

1. **Linearised GR in Mathlib.** The equation
   $\Box h_{\mu\nu} = -16\pi G T_{\mu\nu}$ needs to be formalised. Mathlib's
   differential geometry infrastructure (`Manifold`, `MetricSpace`) is
   approaching readiness; the linearised GR result is on the Mathlib roadmap.

2. **Moduli geometry coefficients.** The factor $3\Omega_\Lambda \approx 2.05$
   requires computing the projection of the 11D USF onto $M_4$ through the
   Calabi-Yau fibre. This is the content of the open axiom
   `calabi_yau_rg_coefficients`.

3. **Renormalisation and propagator finiteness.** The USF 1-loop effective
   action needs to be shown UV-finite at the compactification cutoff
   $k_c = \ell_s^{-1}$. Because the framework replaces standard SHO mode-sums
   with non-local Green function propagators, UV-finiteness is naturally
   enforced via boundary-condition regulation rather than counter-term
  subtraction. For the free field, the current repository applies imported
  OSforGFF/Osterwalder--Schrader structure to the Gaussian free-field model
  [@osterwalder1973]. Extending this to a USF interaction and deriving
  UV-finiteness from it is the open programme of *Osterwalder–Schrader Axioms
  for the Interacting Universal Somatic Field*.

---

# Discussion

## Why this avoids the cosmological constant problem

The standard problem arises from computing $\rho_\Lambda = \frac{1}{2}\int
\omega_k\,d^3k/(2\pi)^3$ — the sum of zero-point energies of all modes up to
the cutoff. This requires fine-tuning $\rho_\Lambda$ to $\sim 10^{-123}$ of
its natural value.

The USF approach does not sum vacuum fluctuations. Instead, $\Lambda$ is the
trace of a **classical background condensate** — the somatic field in its
regulated calm vacuum state. The value of this condensate is fixed by the
boundary condition at the Planck compactification scale, which gives
$\Phi_0 \sim M_\text{Pl}$, and the cosmological frequency $k_\text{cosm} = H_0/c$
sets the scale of the result.

As an image (`interpretive`): the cosmological constant is the steady
background amplitude of the somatic field of the empty universe, the
11-dimensional field at Hubble frequency. It is not zero (the universe is not
truly empty — the somatic field has a non-zero vacuum) and it is not large
(the amplitude is Planck-scale but the frequency is Hubble-scale).

## The factor $3\Omega_\Lambda$

The first-order factor $\sim 2$ ($3\Omega_\Lambda \approx 2.05$) is accounted for
in \S2.4 up to the remaining 7.1\%. In the USF framework:

- The factor of 3 is the Friedmann normalisation of the critical density,
  $\rho_\text{crit} = 3H^2/(8\pi G)$ (\S2.4), under the assumption that the
  vacuum energy equals the critical density.
- $\Omega_\Lambda \approx 0.6847$ is the fraction of critical density in the
  cosmological constant. In the USF, this corresponds to the fraction of the
  somatic field vacuum energy that couples to the 4D metric (the rest couples
  to the compact dimensions and is not observable as $\Lambda$).

A precise derivation requires the Calabi-Yau moduli metric, which determines
how the 11D energy density projects onto $M_4$.

## Testable predictions and current observational status

**Equation of state (w = −1 exactly).** A classical background condensate in
its regulated vacuum has $w = p/\rho = -1$ — de Sitter expansion, no phantom
energy. Any detection of $w \neq -1$ would **falsify this paper's claim** that
$\Lambda$ is a classical USF condensate; it would require either a dynamical
(quintessence) field or a modification to the USF framework at Scale 19–20.

*Current status (DESI 2025, arXiv:2503.14738 [@desi2025dr1]):* The tension is
**strongly dataset-dependent**:

| Dataset combination | $w_0$ | $\sigma$ from $w_0=-1$ | Consistent with USF? |
|---|---|---|---|
| DESI BAO only | $-0.990\pm0.050$ | $0.2\sigma$ | **YES** |
| DESI + CMB + Pantheon+ | $-0.990\pm0.130$ | $0.1\sigma$ | **YES** |
| DESI + CMB + Union3 | $-0.640\pm0.110$ | $3.3\sigma$ | Tension |
| DESI + CMB + DES SN5YR | $-0.727\pm0.067$ | $4.1\sigma$ | **NO** (1:4029 odds) |

In this table the strongest tension appears in the DES SN5YR supernova
combination, while Pantheon+ gives $w_0 = -0.990$, indistinguishable from
$-1$. This pattern is consistent with, but does not prove, a systematic offset
or modelling difference in one supernova compilation. Independent future
supernova and BAO samples can test whether the tension persists.

**Current verdict:** USF is *consistent* with DESI BAO + Pantheon+ (the
more mature dataset). The DES SN5YR tension, if confirmed as physical rather
than systematic, would falsify this cosmological-constant model. This is one
of the most important live tests of the proposal.

**Null variation of Λ with redshift.** The USF condensate amplitude is fixed
by the Planck-scale boundary condition at $\sigma = 0$ and does not evolve
with redshift. The prediction is that $\Lambda$ (equivalently $\rho_\Lambda$)
is constant, so the dark-energy equation of state is $w = -1$; the density
parameter $\Omega_\Lambda(z) = \rho_\Lambda/\rho_\text{crit}(z)$ still evolves
because $\rho_\text{crit}$ does. This is testable to better than 1\% by Stage
IV surveys. Any detection of $d\rho_\Lambda/dz \neq 0$ would similarly falsify
the condensate picture.

**Scope of falsification.** The predictions test the Scale 19–20 (cosmological)
limit of the USF. If they fail, the USF framework at clinical, biological, and
quantum scales (Scales 5–8, as tested by QUANT-EXP-1 and the benchmark suite)
remains unaffected. The falsification is specific to the claim that the
cosmological constant is a USF condensate; it does not extend to the
Osterwalder–Schrader axiom verification, the swarm coordination theorem, or
the FM-HN correspondence principle.

---

# Conclusion

The cosmological constant is the vacuum expectation value of the somatic tensor
trace, $\Lambda = k_\text{cosm}^2\,\Phi_0^2/M_\text{Pl}^2$, where $\Phi_0 \approx
1.4\,M_\text{Pl}$ is a natural Planck-scale background amplitude of the 11D
somatic field. With $\Phi_0 = M_\text{Pl}$ this gives $\Lambda_\text{USF} \approx H_0^2/c^2$,
within a factor of 2 of $\Lambda_\text{obs}$; the compact-dimension fraction
accounts for that factor up to 7.1\%.

The derivation sidesteps the fine-tuning problem: $\Lambda$ is not
the sum of vacuum fluctuations but the amplitude of a compactification-scale
classical condensate. The compact-dimension fraction $7/11$ brings the
estimate to 93\% of $\Lambda_\text{obs}$, a 7.1\% discrepancy attributed to the
open Calabi-Yau moduli correction. Since $H_0$ cancels, this is the prediction
$\Omega_\Lambda = 7/11$ given the measured $H_0$.

The primary remaining formal obligation is linearised GR in Mathlib.

$$\boxed{\Lambda_\text{USF} = \frac{21}{11}\,\frac{H_0^2}{c^2}
  \approx 1.01\times10^{-52}\;\text{m}^{-2}
  \quad\text{vs}\quad
  \Lambda_\text{obs} \approx 1.09\times10^{-52}\;\text{m}^{-2} \;(7.1\%\text{ low})}$$

---

# References
