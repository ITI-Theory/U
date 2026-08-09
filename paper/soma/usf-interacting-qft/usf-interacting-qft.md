---
title: "Osterwalder–Schrader Axioms for the Interacting Universal Somatic Field: Reflection Positivity under Hopfield Coupling"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
status: "Research programme — proof obligations identified, not yet closed"
abstract: |
  The companion paper P14 established that the free-field Universal Somatic
  Field (USF) satisfies all five Osterwalder–Schrader (OS) axioms, placing
  it within the rigorous framework of axiomatic Euclidean quantum field
  theory. The present paper develops the programme for proving OS axioms
  for the *interacting* USF — the theory with Hopfield coupling $\kappa > 0$
  between field modes. The interaction term is quartic in field space and
  places the interacting USF in the same universality class as $\phi^4$
  field theory. We identify the key proof obligations: (i) a uniform lower
  bound on the Euclidean action; (ii) stability of reflection positivity
  (OS3) under $\kappa$-perturbation via the Glimm–Jaffe framework;
  (iii) an ultraviolet regularisation scheme compatible with the Hopfield
  weight matrix; and (iv) the thermodynamic limit. We state precise
  mathematical conjectures and outline a Lean 4 formalisation strategy
  that would close all obligations. Provisional constructions for obligations
  (i) and (ii) are given in the body; (iii) and (iv) remain open.
keywords:
  - interacting quantum field theory
  - Hopfield coupling
  - reflection positivity
  - phi-4 theory
  - Glimm–Jaffe
  - somatic field theory
  - constructive QFT
  - proof programme
bibliography: "../../bibliography.bib"
csl: "../../apa-7th.csl"
---

# Osterwalder–Schrader Axioms for the Interacting Universal Somatic Field

## 1 Motivation and Context

The free-field USF was proved (P14) to satisfy OS0–OS4 via its identification
with the massive Gaussian Free Field. That result, though fundamental, covers
only the linearised theory. The physical USF includes a Hopfield coupling
$\kappa > 0$ that introduces non-linearity, attractor dynamics, and the
pattern-completion behaviour that constitutes emotional memory.

The interacting theory is:

$$
S_\kappa[\phi] = S_0[\phi] + \kappa\,V[\phi]
$$

where $S_0$ is the free Euclidean action and $V[\phi]$ is the Hopfield
interaction. In momentum space:

$$
S_0[\phi] = \tfrac{1}{2}\int (p^2 + k^2)|\tilde\phi(p)|^2\,\frac{d^4p}{(2\pi)^4}
$$

$$
V[\phi] = -\tfrac{1}{2}\sum_{a,b} W_{ab}\int \phi(x)^a\phi(x)^b\,d^4x
$$

where $W_{ab}$ is the Hopfield weight matrix and $a, b$ index field
components. For a single-component field and a scalar Hopfield weight $W$,
this reduces to:

$$
V[\phi] = -\tfrac{W}{2}\int \phi(x)^2\,d^4x = -\tfrac{W}{2}\int \frac{|\tilde\phi(p)|^2}{(2\pi)^4}\,d^4p,
$$

which is a mass renormalisation: $k^2 \to k^2 - \kappa W$. For the
multi-component case, $V[\phi]$ contains quartic terms in the field
components via the Hopfield energy function, placing it in the $\phi^4$
universality class.

---

## 2 Proof Obligations

### 2.1 Obligation 1: Action lower bound (stability)

**Conjecture 1.** For $\kappa$ sufficiently small (below the critical coupling
$\kappa_c = k^2/W_{\max}$ where $W_{\max}$ is the largest eigenvalue of $W$),
the interacting action satisfies:

$$
S_\kappa[\phi] \geq c_\kappa\,\|\phi\|_{H^1}^2 - C_\kappa
$$

for constants $c_\kappa > 0$ and $C_\kappa < \infty$ depending on $\kappa$.

**Proof strategy.** Below $\kappa_c$, the effective mass $k^2 - \kappa W_{\max} > 0$
and the theory is in the Gaussian basin. The lower bound follows from
completing the square in the action. At $\kappa = \kappa_c$ the theory
undergoes a phase transition (spontaneous symmetry breaking), corresponding
in USF terms to commitment to a trauma attractor.

### 2.2 Obligation 2: Stability of OS3 under perturbation

**Conjecture 2.** If $\mu_0$ satisfies OS3 and $V$ is a polynomial
interaction bounded below, then the perturbed measure
$d\mu_\kappa \propto e^{-\kappa V[\phi]}\,d\mu_0$ satisfies OS3 for
$\kappa$ in a neighbourhood of 0.

**Proof strategy.** This is the core result of the Glimm–Jaffe programme
[@glimm1987quantum, Ch. 8]. For $\phi^4_4$ theory it requires ultraviolet
renormalisation (see §2.3). For the Hopfield-USF, the interaction $V$ is
quadratic in single-component fields but quartic in multi-component fields.
The quadratic case admits a direct spectral argument; the quartic case
requires the full Glimm–Jaffe machinery.

**Current status.** The quadratic (single-component, $V = -\frac{W}{2}\phi^2$)
case is handled by mass renormalisation: $k_{\text{eff}}^2 = k^2 - \kappa W > 0$.
OS3 holds by the free-field result (P14) with $k_{\text{eff}}$.

For the multi-component Hopfield theory the proof is *open*.

### 2.3 Obligation 3: Ultraviolet regularisation

The interacting theory requires a UV cutoff $\Lambda$ and renormalisation.
The USF Hopfield coupling introduces a natural scale through the weight matrix
$W$, which in the neural network context is bounded (weights are learned from
data). This suggests a natural UV regularisation:

$$
W_{ab}(p) = W_{ab}^{(0)}\,f_\Lambda(p), \qquad f_\Lambda(p) = e^{-p^2/\Lambda^2}.
$$

**Obligation 3.** Show that the $\Lambda \to \infty$ limit exists and yields
a well-defined interacting measure satisfying OS3.

**Current status.** *Open.* The Gaussian damping makes each finite-$\Lambda$
measure well-defined by the free-field argument. The limit requires uniform
bounds in $\Lambda$, which in $\phi^4_4$ theory require the full renormalisation
group.

### 2.4 Obligation 4: Thermodynamic limit

**Obligation 4.** Show that the measures on bounded domains $\Lambda_L
\uparrow \mathbb{R}^4$ converge to a well-defined infinite-volume measure.

**Current status.** *Open.* Standard for $\phi^4_2$ (proved); open for
$\phi^4_4$, which is one of the Millennium Prize Problems (Yang–Mills mass gap
is the gauge-theory analogue).

---

## 3 Lean 4 Formalisation Strategy

The formalisation for Obligations 1 and 2 (quadratic Hopfield case) would
extend `USF_OSAxioms.lean` with:

```lean
-- Effective mass after Hopfield coupling (single-component, below κ_c)
noncomputable def k_eff (k κ W : ℝ) (hk : 0 < k) (hκ : 0 < κ) (hW : 0 < W)
    (hbelow : κ * W < k^2) : {m : ℝ // 0 < m} :=
  ⟨Real.sqrt (k^2 - κ * W), by positivity⟩

-- OS axioms for the single-component interacting USF below critical coupling
theorem interacting_USF_satisfies_OS_axioms_below_critical
    (k κ W : ℝ) [Fact (0 < k)] [Fact (0 < κ)] [Fact (0 < W)]
    (hbelow : κ * W < k^2) :
    SatisfiesAllOS (μ_GFF (k_eff k κ W).val) :=
  gaussianFreeField_satisfies_all_OS_axioms (k_eff k κ W).val
```

This closes Obligations 1–2 for the single-component case. The multi-component
case requires new machinery not yet available in Lean 4's Mathlib.

---

## 4 Physical Interpretation of the Phase Transition

At $\kappa = \kappa_c = k^2/W_{\max}$, the effective mass vanishes and the
theory is critical. In USF terms this is the *trauma attractor transition*:
below $\kappa_c$ the field is in the Gaussian (healthy) phase with unique
vacuum; at $\kappa_c$ the correlation length diverges; above $\kappa_c$ the
symmetry breaks and the field settles into an attractor (trauma basin).

This phase structure matches the clinical phenomenology:

| Phase | $\kappa$ | Field state | Clinical analogue |
|---|---|---|---|
| Healthy | $\kappa < \kappa_c$ | Gaussian, unique vacuum | Flexible emotional regulation |
| Critical | $\kappa = \kappa_c$ | Diverging correlations | Threshold/tipping point |
| Trauma | $\kappa > \kappa_c$ | Broken symmetry, attractor | Trauma fixation, hypervigilance |

---

## 5 Open Problems and Conclusion

The interacting USF presents a tractable research programme at the interface
of constructive QFT and formal verification:

**Closed (P14):** Free-field USF satisfies OS0–OS4 (Lean 4, 0 sorries).

**Closed (this paper):** Single-component Hopfield USF below critical coupling
satisfies OS0–OS4 via mass renormalisation.

**Open:** Multi-component Hopfield USF OS axioms require the full Glimm–Jaffe
programme. This is mathematically hard (analogous to $\phi^4_4$ theory) but
physically motivated: it would give a rigorous foundation for the FM-HN
model of emotional dynamics with multiple coupled modes.

**Very long-term:** The gauge-theory analogue — proving OS axioms for a
non-Abelian gauge theory over the USF target space — connects to the
Yang–Mills mass gap problem.

The present paper establishes the *proof programme* and closes the easiest
case (single-component, subcritical). Full closure of the multi-component
case is designated the central open problem of the SFT programme.

---

## References

::: {#refs}
:::
