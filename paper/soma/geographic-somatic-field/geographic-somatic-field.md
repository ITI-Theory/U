---
title: "The Geographic Somatic Field: Scale-Invariant Wave Propagation in Human Landscapes"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
abstract: |
  We demonstrate that the same Green's function equation governing neural field
  propagation at the biological scale ($10^{-1}$ m) also governs the propagation
  of cultural and biological patterns through geographic substrates at the societal
  scale ($10^3$–$10^5$ m). Two worked examples from the Thames Valley, United
  Kingdom, are presented: the spread of Estuary English as a structural contagion
  wave through a coupled population, and the formation and migration of ring-necked
  parakeet murmurations as an active-matter velocity field. Both phenomena occupy
  Scales 7–9 on the Universal Somatic Field scale dial and are governed by the
  same $(\nabla^2 + k^2)G = \delta$ propagator equation with substrate-appropriate
  boundary conditions. The Thames Valley acts as a geographic wave-guide: its
  north-south topographic boundaries (Chilterns, North Downs) channel propagation
  along the east-west axis, selecting which patterns can survive long-range
  transmission and which decay. A third example — the Klöntalersee basin in Glarus,
  Switzerland — demonstrates the parabolic resonator structure of a glacially
  carved valley as an acoustic Green's function evaluator at the geological scale
  ($10^5$ m). The framework extends the Universal Somatic Field to geography and
  demonstrates that the theory is not confined to biological or cosmological substrates:
  the same equation governs wherever fields propagate through bounded media.
---


# Introduction

The Universal Somatic Field [@johnsonzsf2026] establishes that the Helmholtz
Green's function equation:

$$(\nabla^2 + k^2)\, G(x, x') = \delta(x - x') \tag{1}$$

governs field propagation at twenty scales from quantum foam to the observable
universe. Scales 7–9 on the USF dial correspond to animal swarms, human
organisms, and societal-scale dynamics. This paper presents worked examples at
exactly these scales, drawn from human geography.

The question is not whether the equation applies — that is a theorem
[@johnsonzsf2026, §2] — but what the physical substrate, propagator, and
boundary conditions look like at each scale, and whether the predictions match
observable patterns. Two examples from the same geographic corridor (the
Thames Valley, England) and one from the Swiss Alps are examined.

---

# The Thames Valley as a Geographic Wave-Guide

## 2.1  The Substrate

A wave-guide is a physical medium whose boundary conditions preferentially
support certain propagation modes and suppress others. A metal microwave
wave-guide, an optical fibre, and a submarine canyon are all wave-guides at
different scales. The Thames Valley between Heathrow Airport and central London
is a geographic wave-guide at Scale 9 ($10^3$ m).

Its boundary conditions are:
- **North wall**: the Chiltern Hills, rising 200–260 m above the valley floor,
  extending from Oxfordshire to Hertfordshire
- **South wall**: the North Downs, rising 150–250 m, extending from Surrey
  to Kent
- **Corridor**: the valley floor along the Thames, 20–40 km wide, containing
  the highest population density in the United Kingdom outside central London

The Green's function of the corridor selects which propagation modes survive.
Patterns with a characteristic wavelength shorter than the corridor width decay
within a few kilometres. Patterns with a wavelength matched to the corridor
geometry propagate with low loss to the east and west.

## 2.2  Estuary English: A Structural Contagion Wave

Estuary English is a phonological variety characterised by TH-fronting
('th' → 'f'), T-glottalling ('bottle' → 'bo'le'), and L-vocalisation
('milk' → 'miuk'). It has been documented propagating outward from the Thames
Estuary since the late twentieth century, moving both geographically along
transport corridors and socially upward through the class hierarchy.

On the USF model, this is a **structural contagion wave**: a pattern propagating
through a coupled population substrate. Define a population of $N$ speakers,
each with a phonological state $s_i \in \{0,1\}$ (0 = RP, 1 = Estuary). The
update probability:

$$P(s_i \to 1) = \sigma\!\left(\sum_j G_{ij} \cdot s_j - \theta\right) \tag{2}$$

where $G_{ij}$ is the social interaction kernel (how frequently speakers $i$
and $j$ encounter one another), $\theta$ is a social prestige threshold, and
$\sigma$ is a sigmoid function.

This is a **social Hopfield network** with the Thames Valley Green's function
as its propagator. The corridor's geometry selects which phonological modes
propagate: variants associated with high-interaction-rate relay nodes
(Heathrow, Staines, Richmond, central London) propagate with low loss; variants
without these relay stations decay. The documented propagation speed —
approximately 30 km per decade along the rail and motorway corridors — is
consistent with a diffusion constant set by the interaction frequency at
those nodes.

**Equation parameters:** $k \approx 10^{-3}$ m$^{-1}$ (social interaction
radius $\sim 1$ km); boundary conditions: Chilterns (north), North Downs
(south), class prestige gradient (asymmetric coupling in the social dimension);
$N \approx 10^6$ (Greater London population); $N$ (mind matrix) = cultural
attractor count.

## 2.3  Ring-Necked Parakeets: An Active-Matter Velocity Field

The ring-necked parakeet (*Psittacula krameri*) is now the most numerous
parrot species in Britain, with a population exceeding 50,000 concentrated
in the Thames Valley west of London. Their pre-roost murmurations above the
Staines and King George VI reservoirs are large-scale collective phenomena
exhibiting the same global coherence as starling murmurations: fluid,
topologically connected shapes with no central controller.

On the USF model, this is **Scale 7** (Animal Swarms): the regime where
discrete agents dissolve into a continuous active-matter velocity field.
The governing equation is the Toner-Tu model:

$$\frac{\partial \mathbf{v}}{\partial t} + \lambda(\mathbf{v}\cdot\nabla)\mathbf{v}
= -\nabla P + D_T \nabla^2\mathbf{v} + \eta\hat{\mathbf{n}} \tag{3}$$

where $\mathbf{v}$ is the local velocity field, $P$ an effective pressure
preventing overlap, and $\hat{\mathbf{n}}$ the local orientation field. The
formation shape emerges from the Green's function of the alignment propagation
with the reservoir geometry as boundary conditions.

The Heathrow/Staines reservoir complex acts as a **geographic resonator**: flat
water surfaces provide low-turbulence updrafts; surrounding industrial
infrastructure supplies the thermal gradients the birds exploit. The roost
trajectories are the resonant modes of the active-matter Green's function
evaluated under these boundary conditions. No individual bird stores the
formation shape; it is the field's configuration.

**Equation parameters:** $k \sim r_\text{align}^{-1}$ (alignment radius
$\approx 7$ m for parakeets); boundary: reservoir perimeter and surrounding
vegetation; $N$ = flock size ($\sim 10^4$ at peak roost).

## 2.4  The Same Equation: Two Scales, One Corridor

Both Estuary English (Scale 9, $10^3$ m) and the parakeet murmuration
(Scale 7, $10^0$–$10^1$ m) are governed by equation (1) with different
wavenumbers and boundary conditions:

| Feature | Estuary English | Parakeet murmuration |
|---|---|---|
| Scale | 9 (societal) | 7 (animal swarm) |
| Characteristic length | ~30 km propagation | ~100 m formation |
| Physical agents | Individual speakers | Individual birds |
| State variable | Phonological variant $s_i$ | Velocity vector $\mathbf{v}_i$ |
| Propagator | Social interaction kernel $G_{ij}$ | Alignment force kernel |
| Global pattern | Isogloss wave front | Flock formation shape |
| Boundary conditions | Chilterns/North Downs + prestige gradient | Reservoir perimeter + thermal gradient |
| Mind matrix | Cultural attractors | Swarm intelligence (distributed) |

The Thames Valley selects and amplifies both patterns by the same mechanism:
its topographic boundary conditions channel propagation along the east-west
axis and suppress transverse modes. Whether the agents are speakers or birds
is irrelevant to the propagator equation. Only $k$ and the physical
interpretation of $G$ change.

*The equation has not changed. Only the substrate has.*

---

# The Klöntalersee: A Parabolic Acoustic Resonator

The Klöntalersee is a glacially carved lake in Canton Glarus, eastern
Switzerland. Its geometry approximates a parabolic bowl — approximately 3 km
long, 0.5 km wide — with near-vertical limestone walls rising 1,000 m on the
south side (the Glärnisch massif). The north side descends more gradually toward
the Glarus valley floor.

At Scale 10 (geological, $10^5$ m), the lake basin is a **natural acoustic
Green's function evaluator**. A parabolic boundary reflects incoming waves and
focuses them at the focal point of the parabola. Acoustic measurements in such
valleys consistently show anomalously long reverberation times compared to
open terrain — the boundary conditions confine the acoustic field and sustain
resonant modes that would otherwise decay.

The Glarus Hauptüberschiebung (Glarus Overthrust), the UNESCO World Heritage
geological formation immediately adjacent to the lake, provides the seismic
counterpart: 250 Ma Verrucano sandstone resting on 35 Ma Eocene flysch, with
35 km of northward transport recorded. This is a seismic wave with a
ten-million-year period — the same Green's function at Scale 10 ($10^5$ m)
with a period of geological time rather than acoustic time.

**Equation parameters:** acoustic: $k = \omega/c_\text{air} \approx 2\pi f/340$
m$^{-1}$ (e.g., $f=100$ Hz: $k \approx 1.8$ m$^{-1}$); seismic: $k = \omega/v_P$
($v_P \approx 6000$ m/s); boundary: valley walls (limestone, high acoustic
impedance); $N$ (mind matrix) = crustal stress mode count.

Both the acoustic resonator and the seismic record are instantiations of the
same Green's function equation with different wavenumber $k$ and different
physical interpretation of "source" and "response."

---

# Discussion

## 4.1  Geographic Boundary Conditions as Scale Selectors

The central insight of this paper is that geographic features function as
boundary conditions on the Green's function equation at Scale 7–10. Mountain
ranges, valley floors, coastlines, and reservoir complexes select which
propagation modes survive long-range transmission. This is not a metaphor; it
is the same mathematical mechanism as the boundary conditions of a microwave
cavity or an optical fibre.

The implications for cultural geography are direct. The propagation of
languages, species ranges, technological adoption curves, and disease vectors
all follow patterns consistent with equation (1) evaluated under the boundary
conditions of the underlying geographic substrate. The rate and direction of
propagation are determined by the Green's function of the landscape, not by
the intrinsic properties of the propagating pattern.

## 4.2  Relation to the Universal Somatic Field

This paper adds Scales 7–10 to the USF's empirical base. The existing papers
in this collection establish the framework at Scale 5 (cellular/neural),
Scale 6 (brain/CEMI), Scale 8 (organism), and Scales 13–20 (stellar to
cosmological). The geographic scale (7–10) was the missing middle — the regime
where biological agents aggregate into collective phenomena and where physical
geography provides the boundary conditions.

The conclusion of the USF framework — that the same equation governs all
twenty scales — gains additional support from the examples presented here.
The Thames Valley corridor is not a special case; it is a particularly
legible one. The same physics operates in every geographic feature. The
parabolic bowl of the Klöntalersee, the Thames Valley wave-guide, and the
Himalayan watershed are all Green's function evaluators at different scales,
with different $k$ values and different physical substrates.

## 4.3  Neurodivergent Pattern Recognition

The identification of structural similarity across wildly different scales —
parakeet murmurations and dialect spread in the same geographic corridor,
governed by the same equation — is an example of the cross-domain pattern
recognition that characterises atypical cognitive profiles (ASC Level 2, ADHD)
as described in the companion paper on the pre-verbal manifold [@johnsonpreverbal2026].

Neurotypical processing compresses the high-dimensional state of perception
into a low-dimensional narrative, discarding cross-domain structural parallels
as noise. Less-compressing processing retains these parallels as signal.
The connection between a dialect wave and a bird swarm is not obvious to
sequential, narrative-linear processing; it is immediate to field-theoretic,
parallel processing. This is not a character trait; it is a parameter setting
in the FM-HN architecture [@johnsonlimbic2026].

---

# Conclusion

The Thames Valley supports two simultaneous examples of scale-invariant field
propagation: Estuary English as a structural contagion wave at Scale 9, and
ring-necked parakeet murmurations as an active-matter velocity field at Scale 7.
Both are governed by the Green's function of the valley's geographic
wave-guide, evaluated at their respective wavenumbers. The Klöntalersee basin
provides a third example at Scale 10: a parabolic acoustic resonator whose
seismic counterpart records a ten-million-year wave.

In all three cases, the equation is the same. Only the substrate, the
wavenumber, and the physical interpretation of source and response differ.

The geographic somatic field is not a new theory. It is the Universal Somatic
Field evaluated at geographic boundary conditions. The field is always there.
The geography makes it visible.

---

# References

::: {#refs}
:::

---
nocite: |
  @johnsonzsf2026
  @johnsonlimbic2026
  @johnsonpreverbal2026
...
