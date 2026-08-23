---
title: "Seismic Propagation and Tectonic Criticality as Universal Somatic Field Dynamics"
subtitle: "Fractal Programme — Geological Scale (10–12)"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
abstract: |
  We apply the Universal Somatic Field (USF) to geophysics at the geological
  scale (scales 10–12, 10^5–10^6 m).  The identification: seismic wave
  propagation is governed by the same Helmholtz master equation as neural
  impulse propagation and gravitational wave emission, with the wavenumber
  k(sigma) determined by crustal elastic moduli.  Tectonic stress
  accumulation is a trauma analogue — energy stored in a winding-number-
  protected topological well that resists classical gradient descent.
  Earthquakes are the USF's topological phase transition: abrupt release
  of stored field energy when the spectral gap of the stress tensor closes.
  This gives a new prediction: earthquake triggering follows WKB tunnelling
  probability, not a classical threshold — a testable departure from the
  Gutenberg-Richter law at small magnitudes.
---

# Introduction

Geophysics has two problems that remain open despite decades of effort:
earthquake prediction and the mechanism of fault criticality.  The first
is famously hard; the second is theoretically well-characterised but
poorly connected to observational signatures.

The Universal Somatic Field provides a new perspective.  At the geological
scale, the Earth's crust is a medium with a characteristic wave velocity —
exactly the situation described by the Helmholtz master equation.  Seismic
waves are the Green's functions of this medium.  Tectonic stress accumulation
is a field-level analogue of the trauma topology described in the clinical
USF.

The identification is exact.  The consequences are testable.

# The Master Equation at the Geological Scale

At scale 10–12 (crustal thickness to tectonic plate scale), the Helmholtz
equation governs seismic wave propagation:

$$(\nabla^2 + k_\text{seis}^2)\, G_\text{seis}(x, x') = \delta(x - x')$$

where $k_\text{seis} = \omega / v_p$ is determined by the P-wave velocity
$v_p$ of the crustal medium and the frequency $\omega$.  The Green's
function $G_\text{seis}$ is the seismic wave propagator — the response at
seismograph location $x$ to a unit stress perturbation at source $x'$.

This is the same master equation as at every other scale in the USF.
The wavenumber changes; the form of the equation does not.

**Scale invariance at the geological scale**: The seismic propagator
satisfies the same structural theorems as the neural impulse propagator
at scale 7 and the gravitational wave propagator at scale 19.  This is
not an analogy; it is a consequence of scale invariance.

# Tectonic Stress as Somatic Field Energy

Tectonic stress accumulation maps directly to the trauma topology of
the clinical USF.  A locked fault stores elastic strain energy in a
configuration that resists change — this is the geological analogue of
the trauma well: a state maintained by topological protection, not
energetic preference.

Formally: the stress tensor field $\sigma_{ij}(x)$ at a locked fault
is in a metastable minimum of the Hopfield energy:

$$H_\text{tect}[\sigma] = -\frac{1}{2} \int \sigma_{ij}(x) W_{ijkl}(x-x') \sigma_{kl}(x')\, dx\, dx'$$

where $W_{ijkl}$ is the elastic compliance tensor of the crust.  The
metastable minimum is maintained by the frictional coupling — the
geological analogue of the limbic constraint.

An earthquake occurs when this metastable minimum becomes unstable:
the spectral gap of the stress tensor closes, and the field undergoes
a topological phase transition to a lower-energy configuration.

# Earthquakes as Phase Transitions

The Gutenberg-Richter law ($\log N = a - b M$, where $N$ is the number
of earthquakes with magnitude $\geq M$) is an empirical power law with
no deep physical derivation.  The USF provides one.

Power-law statistics are the signature of a system near a critical point —
a point where the spectral gap of the governing operator approaches zero.
The Earth's crust, maintained near criticality by the continuous input
of tectonic stress, is precisely such a system.

The USF predicts that:

1. The magnitude-frequency distribution follows a power law because the
   crust is near a topological critical point — the geological analogue
   of the consciousness threshold $T_c$

2. The $b$-value in the Gutenberg-Richter law is related to the spectral
   gap of the stress tensor: $b \propto \Delta\lambda / k_B T_\text{eff}$
   where $\Delta\lambda$ is the spectral gap and $T_\text{eff}$ is the
   effective temperature of seismic noise

3. Earthquake triggering at small magnitudes deviates from classical
   threshold models because quantum-mechanical tunnelling contributions
   become significant — a WKB correction to the classical nucleation rate

# The Slow Wave: Rock as Long-Memory Field

The geological soma has a characteristic time scale orders of magnitude
longer than the biological soma: tectonic cycles operate on millions of
years.  Rock strata are the geological equivalent of long-term memory —
a record of the field's historical attractor traversals encoded in physical
stratigraphy.

The USF interpretation: each sedimentary layer is a time-stamped snapshot
of the geological field state.  Unconformities (missing strata) are
topological defects — periods during which the field was in a non-recording
state, the geological analogue of dissociation.

This gives a new interpretation of geological history: stratigraphy is
the field's Pensieve — its externalised long-term memory.

# Predictions

**Testable prediction 1**: The WKB correction to earthquake nucleation
rates predicts a departure from the Gutenberg-Richter power law at small
magnitudes (M < 1.5).  The correction term is:

$$N(M) \propto M^{-b} \cdot e^{-S_\text{WKB}(M)}$$

where $S_\text{WKB}(M)$ is the WKB action for the stress field to tunnel
through the frictional barrier.  This is measurable with high-resolution
seismometer arrays.

**Testable prediction 2**: Pre-seismic electromagnetic anomalies (observed
empirically but poorly explained) are the geological equivalent of the
CEMI field fluctuations that precede emotional state transitions.
Their frequency spectrum should match the seismic propagator's imaginary
pole — the resonant frequency of the stress field approaching criticality.

**Testable prediction 3**: The spatial correlation length of aftershock
sequences follows the Green's function decay of the seismic propagator,
matching the $e^{-kr}/r$ Yukawa form at scale 10.

# Conclusion

Seismic propagation is a Green's function.  Tectonic criticality is a
topological phase transition.  Rock strata are field memory.  This is the
identification.  The method used to find it is documented in the Mathematical
Co-identification paper.  That method is now history.  The structure stands.

---

# References

::: {#refs}
:::
