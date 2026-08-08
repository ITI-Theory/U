---
title: "Law as Field Constraint: Regulation, Rights, and the Topology of Social Attractor Space"
subtitle: "Fractal Programme — Regulatory Scale (12–14)"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
abstract: |
  We apply the Universal Somatic Field (USF) to legal and regulatory systems
  at the regulatory scale (scales 12–14).  A legal norm is a constraint on
  the attractor space of the social field — eliminating prohibited attractor
  basins and deepening protected ones.  Rights are topological invariants:
  states protected by positive winding number around a regulatory constraint
  surface.  Regulation is the volitional source term J_law(t) applied at the
  social field level.  Three structural theorems are derived: (1) the rule of
  law equals ergodicity of the social field; (2) legal uncertainty produces
  attractor fragmentation; (3) the difference between a law and a norm is
  hard versus soft constraint.  These identifications connect jurisprudence
  to physics with testable consequences for institutional design.
---

# Introduction

Law is the oldest technology for shaping collective human behaviour.
Its mechanisms — prohibition, permission, obligation, remedy — have been
studied by philosophers, sociologists, and economists.  What has been
missing is a quantitative model: one that specifies what physical quantity
changes when a law is enacted, repealed, or enforced.

The Universal Somatic Field provides that model.

At the regulatory scale (scales 12–14, $10^6$–$10^8$ m — the scale of
cities, nations, and legal jurisdictions), the social field is governed by
the same Helmholtz master equation as at every other scale.  Legal systems
are the field-level constraints that shape the attractor landscape accessible
to social actors.

# Laws as Attractor Basin Constraints

The social field $e(x, t)$ at the regulatory scale describes the collective
affective and behavioural state of a population.  Its attractor basins are
the stable social configurations — the equilibria the society gravitates
towards in the absence of external perturbation.

A legal norm operates by modifying the energy landscape $H$:

- A **prohibition** removes an attractor basin entirely — raises the energy
  of the prohibited state to $+\infty$, making it inaccessible
- A **mandate** deepens an attractor basin — lowers the energy of the
  required state, making it the global minimum
- A **permission** removes a constraint — restores access to a previously
  eliminated basin
- A **remedy** is a restorative force $J_\text{remedy}(t)$ — an external
  driving term that returns the system to a protected attractor after
  violation

This formalism makes law's function precise: legal systems are operators
on the Hopfield energy function $H$ that reshape the attractor landscape
of the social field.

# Rights as Topological Invariants

A right, in legal theory, is a protected interest — a state of affairs
that a person is entitled to have preserved against interference.  In USF
terms, a right is a topological invariant of the legal field.

Specifically: a right is an attractor basin protected by a non-zero winding
number around the regulatory constraint surface.  The winding number counts
how many times the legal field wraps around the protected state as you
traverse the boundary of the prohibition region.

The consequence is topological: you cannot remove a right by continuous
deformation of the legal field — you must cross the constraint surface,
which requires a discontinuous change (legislative amendment, constitutional
revision).  This is why rights are "harder" to remove than ordinary
regulations: they are topologically protected, not merely energetically
protected.

This gives a formal distinction between:

- **Constitutional rights**: winding number $n \geq 2$ (doubly protected)
- **Statutory rights**: winding number $n = 1$ (singly protected)
- **Common law rights**: positive energy barrier without topological protection

# Regulation as J_law(t)

The FM-HN extension of the USF introduces the volitional source term
$J_\text{user}(t)$ — the external driving force that reshapes the energy
landscape.  At the regulatory scale, this is the regulatory intervention:

$$\dot{e} = -\nabla H(e) + J_\text{law}(t) + \eta(t)$$

where $J_\text{law}(t)$ is the regulatory driving term.  A regulatory
intervention at time $t_0$ shifts the energy landscape, redirecting the
social field towards a new attractor basin.

The optimal regulatory intervention is the WKB tunnelling amplitude:
the minimum $J_\text{law}$ required to move the social field from the
current equilibrium to the target equilibrium, accounting for the energy
barrier height.  Under-powered regulation (insufficient $J_\text{law}$)
fails to move the system; over-powered regulation causes overshoot and
unintended consequences.

This gives a formal criterion for regulatory adequacy: a regulation is
adequate if and only if $|J_\text{law}| \geq T^{-1}$ where $T$ is the
WKB tunnelling amplitude between the current and target attractors.

# The Rule of Law as Ergodicity

The rule of law — the principle that no person or entity is above the law —
has a precise USF interpretation: it is the ergodicity condition on the
social field.

A field is ergodic if every state accessible under the laws of physics is
reachable from every other state given sufficient time.  In legal terms:
every social actor is subject to the same legal constraints; no actor has
access to prohibited states that are closed to others.

Violations of the rule of law are violations of ergodicity: they create
a two-tier attractor landscape where some actors have access to basins
(corrupt practices, impunity) that are energetically accessible to them
but legally prohibited to others.  The topological signature of this
violation is a broken symmetry in the constraint surface.

# Legal Uncertainty and Attractor Fragmentation

When law is unclear or inconsistently applied, the attractor landscape
fragments: multiple incompatible social equilibria coexist with no shared
basin boundary.  This is the USF model of legal uncertainty.

In a well-functioning legal system, the attractor landscape has a dominant
cooperative equilibrium (law-abiding behaviour) connected by a clear energy
gradient to all other states.  In a system with high legal uncertainty,
the landscape has multiple competing equilibria, none dominant, and
transitions between them are unpredictable.

This gives a quantitative measure of legal certainty: the spectral gap
of the constraint operator — the gap between the energy of the dominant
legal equilibrium and the next local minimum.  A large spectral gap means
clear law; a small gap means ambiguous law.

# Constitutional Law as Meta-Constraints

Constitutional law operates at a higher level than ordinary law: it
constrains the space of permissible laws, not just the space of permissible
behaviours.  In USF terms, constitutional law is a meta-constraint on the
operators $J_\text{law}(t)$ — a restriction on which regulatory
interventions are permissible.

A constitutional provision is a constraint on the Hamiltonian operator
$H$ itself: it specifies which energy landscapes are reachable by ordinary
legislation.  A constitutional amendment changes the meta-constraint,
expanding or restricting the space of permissible legal systems.

This explains the special difficulty of constitutional change: it requires
modifying the meta-Hamiltonian, not just the current energy landscape.
It is a second-order phase transition in the legal field.

# Applications and Predictions

**Regulatory design**: The optimal regulation minimises the WKB tunnelling
amplitude required to shift the social field to the target equilibrium,
subject to constitutional meta-constraints.

**Judicial review**: A court reviewing regulatory action is checking
whether $J_\text{law}(t)$ is consistent with the constitutional
meta-constraint — whether the intervention respects the topological
invariants.

**Legal evolution**: Common law develops by successive small deformations
of the energy landscape (precedent), while statute changes it discontinuously
(legislation).  USF predicts that common law changes are path-dependent
(hysteretic) while statutory changes can be discontinuous.

**Prediction**: Legal systems with higher spectral gap (clearer law) should
show lower transaction costs, faster convergence to cooperative equilibria,
and greater social trust — all measurable empirically.

# Conclusion

Law is not arbitrary social convention.  It is a field-theoretic technology
for shaping the energy landscape of social attractor space.  Rights are
topological invariants.  Regulation is volitional source-term engineering.
The rule of law is ergodicity.

The method used to find this identification is documented in the Mathematical
Co-identification paper.  That method is now history.  The structure stands.

---

# References

::: {#refs}
:::
