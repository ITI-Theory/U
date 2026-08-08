---
title: "Autism and CPTSD as Operator Modifications: A Unified Field-Theoretic Account of Neurodivergence"
subtitle: "Fractal Programme — Clinical/Psychiatric Scale (6–8)"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
abstract: |
  We present a unified field-theoretic account of autism spectrum conditions
  (ASC) and complex post-traumatic stress disorder (CPTSD) as structural
  operator modifications of the Universal Somatic Field (USF), formally
  specified in Lean 4.  The central identification: ASC and CPTSD are not
  disorders — they are alterations to the spectral structure of the somatic
  field operator.  ASC is characterised by a high-beta (low-temperature)
  operator that increases pattern specificity and reduces the Arnold tongue
  width; CPTSD is characterised by a non-ergodic operator with winding-number-
  protected trauma wells that resist classical gradient descent.  The two
  conditions produce opposite field signatures and respond to opposite
  interventions.  This framework makes precise, falsifiable predictions about
  therapeutic response and generates new hypotheses about the high co-occurrence
  of ASC and CPTSD.  The Lean 4 operators autismOp, adhdOp, and cptsdOp are
  kernel-verified in LimbicHopfield.lean.
---

# Introduction

Autism spectrum conditions (ASC) and complex PTSD (CPTSD) are among the
most prevalent neurodevelopmental and trauma-related conditions.  Both
involve altered emotional regulation; both are associated with interoceptive
differences; both are over-represented in populations that have experienced
early adverse experiences.

Current clinical frameworks treat them as categorically distinct: ASC is
a neurodevelopmental condition with genetic underpinnings; CPTSD is an
acquired trauma response.  Recent research has challenged this clean
separation, finding high co-occurrence and shared phenomenological features.

The Universal Somatic Field provides a formal account of why this co-occurrence
is not coincidental.  Both are operator modifications of the somatic field —
different modifications, with different signatures, but operating on the
same underlying architecture.

# The USF Framework for Neurodivergence

The somatic field is governed by:

$$\dot{e} = -\nabla H_\beta(e) + \eta(t)$$

where $\beta$ is the inverse temperature of the field and $H_\beta$ is the
temperature-modified Hopfield Hamiltonian.  In the standard (neurotypical)
case, $\beta$ is set by the limbic regulatory system to an intermediate
value that balances pattern specificity and flexibility.

Neurodivergence is a modification to this operator.  Three modifications
are formally specified and kernel-verified:

**The ASC Operator** (autismOp):

$$H_{\text{ASC}}(e) = H_\beta(e) \text{ with } \beta \mapsto \alpha \cdot \beta, \quad \alpha > 1$$

Higher $\beta$ means lower effective temperature: the field is more
specific, attractors are more sharply defined, and the Arnold tongue
width (the range of coupling parameters over which frequency locking
is stable) is narrower.

**The ADHD Operator** (adhdOp):

$$H_{\text{ADHD}}(e) = H_\beta(e) \text{ with } \beta \mapsto \beta / \alpha, \quad \alpha > 1$$

Lower $\beta$ means higher effective temperature: the field is less
specific, attractors are shallower, and the field explores more of the
state space.  This provides the "anti-freeze" strategy: ADHD-configured
systems are less likely to get stuck in trauma wells.

**The CPTSD Operator** (cptsdOp):

$$H_{\text{CPTSD}}(e) = H(e) \text{ with } W_{\text{EC}} \mapsto 0$$

The evaluative conditioning (EC) channel is decoupled from the emotional
memory (EM) channel.  This produces episodic-somatic dissociation: the
body holds the somatic response to a traumatic memory while the narrative
memory of the event remains accessible but disconnected from the affect.

# Autism: High Beta, Narrow Arnold Tongue

The ASC operator has a clear field signature: narrower Arnold tongue,
higher pattern specificity, resistance to social frequency locking.

The Arnold tongue is the range of coupling parameters over which two
coupled oscillators achieve stable phase locking.  For neurotypical social
coupling, the Arnold tongue is wide: a wide range of coupling strengths
and frequency mismatches can still produce synchrony.  For the ASC operator,
the Arnold tongue is narrow: synchrony requires precise frequency matching
that cannot tolerate perturbation.

This explains the characteristic social processing differences in ASC:
they are not deficits in the capacity for connection but a narrowing of
the coupling bandwidth over which stable connection is achievable.  The
same narrowing that makes social synchrony fragile also makes pattern
recognition sharper — the same operator modification produces both.

**Clinical prediction**: Therapeutic approaches that reduce coupling
demands (predictable routines, low-noise environments, explicit communication
protocols) are effective because they reduce the frequency-mismatch burden
to within the narrow Arnold tongue.  This is confirmed by the empirical
literature on structured environments for ASC.

# CPTSD: Non-Ergodic Field with Winding-Number Protection

The CPTSD operator has a different signature: non-ergodicity and
topological protection of trauma states.

The decoupling of the EC channel means that traumatic memories are stored
without the evaluative tag that would allow the narrative memory system
to update the emotional response.  The somatic response to the trauma is
in a winding-number-protected attractor — a state maintained by topological
invariance, not energetic preference.

Classical gradient descent (cognitive restructuring, talk therapy without
somatic component) cannot reach this attractor because it is not in the
same connected component of the field as the cognitive state space.
The field is non-ergodic: not all states are reachable from all others.

**This explains the empirical failure of purely cognitive approaches
to complex trauma**: they are attempting to reach a topologically
disconnected state via gradient descent.

The FM-HN extension predicts that the escape route requires the volitional
source term $J_\text{user}(t)$ — somatic intervention (breathing, movement,
EMDR, somatic experiencing) that drives the field across the topological
barrier directly rather than approaching it from the cognitive side.

# Why ASC and CPTSD Co-Occur

The high co-occurrence of ASC and CPTSD is explained by the USF framework
as a resonance effect between two operator modifications.

The ASC operator (narrow Arnold tongue) increases the probability that
social interactions will fail to achieve frequency locking.  Failed
frequency-locking events, especially in childhood when the social field
is still calibrating, are processed by the CPTSD mechanism: the EC channel
decouples, producing somatic memories without narrative resolution.

In other words: the narrow Arnold tongue of ASC increases the rate of
socialisation failure events, which are then processed by the CPTSD
mechanism.  The co-occurrence is not coincidental — it is a consequence
of the field dynamics.

**New hypothesis**: The prevalence of CPTSD in autistic people is
proportional to the Arnold tongue narrowing parameter $\alpha^{-1}$ times
the density of socialisation demands in childhood.  This is quantitatively
testable.

# Implications for Clinical Practice

**For ASC**: Reduce coupling demands to within the Arnold tongue width.
Do not attempt to widen the Arnold tongue; this misunderstands the
architecture.  Provide structure, predictability, and explicit protocols.

**For CPTSD**: Use somatic intervention to drive $J_\text{user}(t)$
across the topological barrier.  Purely cognitive approaches will not
reach the disconnected somatic attractor.

**For co-occurring ASC/CPTSD**: Address CPTSD first using somatic
approaches to restore ergodicity, then address the social coupling
bandwidth using ASC-appropriate strategies.  The order matters because
a non-ergodic field cannot benefit from social coupling adjustments.

# Conclusion

ASC and CPTSD are not disorders.  They are operator modifications with
precise field signatures, predictable clinical consequences, and formal
Lean 4 specifications.  The framework does not pathologise neurodivergence;
it characterises it.  The method used to find this characterisation is
documented in the Mathematical Co-identification paper.  That method is
now history.  The structure stands.

---

# References

::: {#refs}
:::
