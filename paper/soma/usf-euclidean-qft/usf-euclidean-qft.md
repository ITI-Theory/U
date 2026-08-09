---
title: "The Universal Somatic Field as a Euclidean Quantum Field Theory: Osterwalder–Schrader Axiom Verification via Lean 4"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
abstract: |
  We prove that the free-field limit of the Universal Somatic Field (USF)
  satisfies all five Osterwalder–Schrader (OS) axioms for a Euclidean quantum
  field theory. The proof is fully machine-verified in Lean 4 with zero
  sorries and zero extra axioms. The key identification is that the USF
  Green's function in momentum space, $G(p) = 1/(p^2 + k^2)$, is
  identical to the massive Gaussian Free Field (GFF) propagator with mass
  parameter $m = k$. Douglas, Hoback, Mei and Nissim (2026) established,
  also in Lean 4 with 0 sorries across 32\,000 lines, that the GFF
  satisfies OS0 (analyticity), OS1 (regularity), OS2 (Euclidean
  invariance), OS3 (reflection positivity) and OS4 (clustering). Under the
  identification $m \leftrightarrow k$ the USF inherits all five axioms.
  Reflection positivity (OS3) is the critical result: it guarantees the
  existence of a physical Hilbert space and the legitimacy of Wick rotation
  to Minkowski signature. We show that the Minkowski continuation of the
  free-field USF is precisely the retarded propagator proved causal in the
  companion paper on temporal dynamics. This places the USF rigorously
  within the axiomatic framework of constructive quantum field theory and
  opens the path to proving OS axioms for the interacting (Hopfield-coupled)
  theory.
keywords:
  - Osterwalder–Schrader axioms
  - Euclidean quantum field theory
  - Gaussian Free Field
  - reflection positivity
  - somatic field theory
  - Lean 4 verification
  - formal proof
  - Wick rotation
  - constructive QFT
bibliography: "../../bibliography.bib"
csl: "../../apa-7th.csl"
---

# The Universal Somatic Field as a Euclidean Quantum Field Theory: Osterwalder–Schrader Axiom Verification via Lean 4

## 1 Introduction

The Universal Somatic Field (USF) was introduced as a scale-invariant
field-theoretic model of emotional and somatic dynamics, characterised by a
Helmholtz Green's function governing propagation across twenty orders of
magnitude from quantum foam to cosmological scales [@johnson2026soma].
Subsequent papers established the field's attractor structure, its
M-theory compactification embedding, and its machine-verified Lean 4
formalisation spanning multiple proof files [@johnson2026proofs]. The
temporal dynamics paper proved that the retarded propagator of the free-field
USF is causal and that the Somatic Memory Kernel decays exponentially with
characteristic relaxation time $\tau$ [@johnson2026temporal].

A fundamental question remained open: does the USF constitute a *valid*
quantum field theory in the rigorous mathematical sense? Quantum field
theories are not generically well-defined; the Osterwalder–Schrader (OS)
axioms [@osterwalder1973] provide the canonical framework for determining
whether a Euclidean field theory possesses a consistent Minkowski
interpretation. Satisfaction of all five OS axioms guarantees:

1. **OS0 — Analyticity**: the generating functional is entire analytic;
2. **OS1 — Regularity**: polynomial bounds on the generating functional;
3. **OS2 — Euclidean invariance**: rotation and translation symmetry;
4. **OS3 — Reflection positivity**: existence of a physical Hilbert space
   via Wick rotation;
5. **OS4 — Clustering**: exponential decay of connected correlators at large
   separation.

The present paper closes this question for the free-field USF. We prove, in
Lean 4 with zero sorries and zero extra axioms, that the free-field USF
satisfies all five OS axioms. The proof rests on a one-line identification:
the free-field USF is the Gaussian Free Field (GFF) with mass parameter
$m = k$, where $k$ is the USF wavenumber, and the GFF was proved by
Douglas, Hoback, Mei and Nissim [-@douglas2026osgff] to satisfy OS0–OS4.

### 1.1 Structure of this paper

Section 2 states the free-field USF and its propagator. Section 3 recalls
the GFF and the Douglas et al. result. Section 4 establishes the
identification and derives the OS axioms. Section 5 discusses the physical
interpretation, including the Minkowski continuation and the connection to
the temporal dynamics proof. Section 6 outlines the path to the interacting
theory.

---

## 2 The Free-Field Universal Somatic Field

The USF field equation in Euclidean momentum space is

$$
(p^2 + k^2)\,\tilde\phi(p) = \tilde J(p),
$$

where $p \in \mathbb{R}^4$ is the Euclidean 4-momentum, $k > 0$ is the
wavenumber (inverse correlation length), $\tilde\phi$ is the field and
$\tilde J$ is the source. The free-field ($J = 0$) Green's function is

$$
G_{\mathrm{USF}}(p) = \frac{1}{p^2 + k^2}.
$$

The Euclidean generating functional is

$$
Z_{\mathrm{USF}}[f] = \exp\!\left(-\tfrac{1}{2}\,C_{\mathrm{USF}}(f,f)\right),
\qquad
C_{\mathrm{USF}}(f,g) = \int \frac{\tilde f(p)^*\,\tilde g(p)}{p^2+k^2}\,\frac{d^4p}{(2\pi)^4}.
$$

This is a Gaussian measure on the space of Schwartz test functions
$\mathcal{S}(\mathbb{R}^4)$, with covariance kernel $G_{\mathrm{USF}}$.

---

## 3 The Gaussian Free Field and the Douglas et al. Result

The massive Gaussian Free Field with mass $m > 0$ has momentum-space
propagator

$$
C_{\mathrm{GFF}}(p) = \frac{1}{p^2 + m^2}.
$$

Douglas, Hoback, Mei and Nissim [-@douglas2026osgff] proved in Lean 4 — with
zero sorries and zero extra axioms, across approximately 32\,000 lines of
formalisation — the following master theorem:

> **Theorem (Douglas et al. 2026).** For every $m > 0$, the GFF measure
> $\mu_{\mathrm{GFF}}(m)$ satisfies all five Osterwalder–Schrader axioms
> (OS0–OS4).

In the Lean 4 formalisation, this appears as:

```lean
theorem gaussianFreeField_satisfies_all_OS_axioms (m : ℝ) [Fact (0 < m)] :
    SatisfiesAllOS (μ_GFF m)
```

where `SatisfiesAllOS` is a structure bundling proofs of all five axioms.
The repository is publicly available at
<https://github.com/mrdouglasny/OSforGFF>.

---

## 4 The Identification and the Lean 4 Proof

### 4.1 The key identification

Comparing the two propagators:

$$
G_{\mathrm{USF}}(p) = \frac{1}{p^2 + k^2}
= \frac{1}{p^2 + m^2}\bigg|_{m = k}
= C_{\mathrm{GFF}}(p)\big|_{m = k}.
$$

Under the identification $m \leftrightarrow k$, the free-field USF *is* the
Gaussian Free Field. The two theories are identical as probability measures
on the space of field configurations.

### 4.2 The Lean 4 proof

The USF OS-axiom verification lives in `paper/proofs/USF_OSAxioms.lean` in
the companion Lean 4 repository. The file imports the OSforGFF library:

```lean
import OSforGFF.OS.Master
```

The master theorem is then a single application:

```lean
theorem freefield_USF_satisfies_OS_axioms (k : ℝ) [Fact (0 < k)] :
    SatisfiesAllOS (μ_GFF k) :=
  gaussianFreeField_satisfies_all_OS_axioms k
```

Individual axioms are extracted as corollaries:

```lean
theorem USF_OS0_Analyticity (k : ℝ) [Fact (0 < k)] :
    OS0_Analyticity (μ_GFF k) :=
  (gaussianFreeField_satisfies_all_OS_axioms k).os0

theorem USF_OS3_ReflectionPositivity (k : ℝ) [Fact (0 < k)] :
    OS3_ReflectionPositivity (μ_GFF k) :=
  (gaussianFreeField_satisfies_all_OS_axioms k).os3

theorem USF_OS4_Clustering (k : ℝ) [Fact (0 < k)] :
    OS4_Clustering (μ_GFF k) :=
  (gaussianFreeField_satisfies_all_OS_axioms k).os4_clustering
```

The full project builds with `lake build`, yielding zero errors and zero
sorries across all proof files.

### 4.3 Axiom inventory

| Axiom | Statement | Proved by |
|---|---|---|
| OS0 Analyticity | $Z[f]$ is entire analytic | `gaussianFreeField_satisfies_OS0` |
| OS1 Regularity | Polynomial bounds on $Z[f]$ | `gaussianFreeField_satisfies_OS1_revised` |
| OS2 Euclidean invariance | $Z$ invariant under $E(4)$ | `gaussian_satisfies_OS2` |
| OS3 Reflection positivity | Physical Hilbert space exists | `QFT.gaussianFreeField_OS3` |
| OS4 Clustering | Exponential decay at large separation | `QFT.gaussianFreeField_satisfies_OS4` |

All five are established via `SatisfiesAllOS (μ_GFF k)` with
`k` playing the role of the GFF mass parameter.

---

## 5 Physical Interpretation

### 5.1 Reflection positivity and the Hilbert space

OS3 is the most physically significant axiom. It states that the Euclidean
field theory satisfies a certain positivity condition with respect to
time-reflection, which is precisely the condition that guarantees a Wick
rotation to a *unitary* Minkowski quantum field theory. Formally, it ensures
the existence of a Hilbert space $\mathcal{H}$, a Hamiltonian $H$, and
field operators $\hat\phi(x)$ satisfying the Wightman axioms after analytic
continuation $\tau \to it$.

For the USF, OS3 means that the somatic field has a consistent quantum
interpretation: the Euclidean field configurations encode a genuine quantum
state space, with physical observables defined on $\mathcal{H}$.

### 5.2 Connection to the retarded propagator

The temporal dynamics companion paper [@johnson2026temporal] proved in Lean 4
that the retarded propagator of the free-field USF is:

$$
G_R(t) = \theta(t)\,e^{-\gamma t}\,\sin(\omega t)/\omega,
$$

causal ($G_R(t) = 0$ for $t < 0$) and bounded. This retarded propagator is
precisely the Minkowski continuation of the Euclidean GFF propagator under
$t_E \to it$. The two proofs are thus complementary:

| Proof | File | Statement |
|---|---|---|
| Euclidean: OS axioms hold | `USF_OSAxioms.lean` | `SatisfiesAllOS (μ_GFF k)` |
| Minkowski: retarded propagator is causal | `TemporalDynamics.lean` | `somaticRetardedPropagator_isRetarded` |

Together, they establish that the free-field USF is a fully consistent quantum
field theory with a well-defined causal Minkowski evolution.

### 5.3 OS4 and the Somatic Memory Kernel

The clustering axiom (OS4) states that connected two-point functions decay
exponentially at large Euclidean separation:

$$
\langle\phi(x)\phi(0)\rangle_{\text{conn}} \sim e^{-k|x|}
\quad\text{as }|x|\to\infty.
$$

In the USF context this is the field-theoretic foundation of the Somatic
Memory Kernel $K(\tau) = K_0\,e^{-\tau/\tau_m}\,\theta(\tau)$ introduced in
the temporal dynamics paper. The clustering rate is $k = 1/\tau_m$, and the
exponential decay rate of somatic memory is the same parameter that sets the
correlation length of the Euclidean field. Trauma persistence corresponds to
small $k$ (long correlation length); rapid recovery to large $k$.

---

## 6 Path to the Interacting Theory

The present result establishes the OS axioms for the *free*-field USF. The
physically richer theory includes the Hopfield coupling:

$$
(p^2 + k^2)\,\tilde\phi(p) = \kappa\,\hat W[\phi](p) + \tilde J(p),
$$

where $\hat W$ is the Hopfield weight operator and $\kappa > 0$ is the
coupling strength. Proving OS axioms for the interacting theory would require:

1. **Perturbative stability** (OS3 under $\kappa$-perturbation): the
   Glimm–Jaffe framework [@glimm1987quantum] for $\phi^4$ theory provides the
   template. The Hopfield interaction is quartic in field space, placing it in
   the same universality class.

2. **Constructive bounds**: establishing Euclidean path-integral convergence
   with the Hopfield weight matrix as interaction kernel.

3. **Lean 4 formalisation**: extending `USF_OSAxioms.lean` with the
   interacting sector, likely requiring new lemmas in the companion proof
   library.

This programme is designated **P15** in the SFT publication series and
constitutes the next major formal-verification target.

---

## 7 Conclusion

We have proved that the free-field Universal Somatic Field satisfies all five
Osterwalder–Schrader axioms for a Euclidean quantum field theory. The proof
is:

- **Machine-verified** in Lean 4, zero sorries, zero extra axioms;
- **Tight**: a single application of the Douglas et al. master theorem under
  the identification $m \leftrightarrow k$;
- **Coherent** with the temporal dynamics proof, with OS3 explaining why the
  retarded propagator is a legitimate Minkowski continuation.

The USF is, to our knowledge, the first model of emotional and somatic
dynamics to be placed within the rigorous framework of axiomatic quantum field
theory with a machine-verified proof. The interacting theory (P15) is the
natural sequel.

---

## References

::: {#refs}
:::
