---
title: "[T]-Theory: Mathematics"
subtitle: "Dependent Types and the Geometry of Feeling"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
abstract: |
  This volume reads [T]-Theory as a formal mathematical programme rather than as a physical or clinical manifesto. Its central objects are Lean definitions, dependent types, product decompositions, proof obligations, and explicit axioms. The book treats `ScaleUniverse.lean`, `MTheoryIsomorphism.lean`, `UniversalSomaticField.lean`, `SomaField.lean`, `FieldAxioms.lean`, and the companion proof files as the primary evidence surface. It asks what the kernel checks, what follows only by definition, what is imported from Mathlib, Physlib, or OSforGFF, what remains an axiom, and where `sorry` still marks unfinished work. The result is deliberately modest and mathematically useful: a map of typed field spaces, Green-function propagators, Hopfield energy landscapes, emotional-language interpreters, and scale-indexed structures, with each claim labelled by its evidential status. For mathematicians and type theorists, the interest is not that Lean proves experience. It does not. The interest is that it makes the programme's premises, equivalences, retractions, trivialities, and gaps inspectable.
---

# The Green Propagator

**G-ID:** *Functorial Green's Function — category-theoretic propagator between field spaces* `open-hypothesis`. In this mathematics volume the word *propagator* has two readings that must not be conflated. The first is the ordinary analytic object: a Green function or resolvent carrying an impulse at one point to a response elsewhere. The second is the type-theoretic object: a structure-preserving map between indexed field spaces, such as the `ZoomStep` in `UniversalSomaticField.lean`, whose `op` field maps `FieldEquation n` to `FieldEquation m`. The first belongs to PDE and spectral theory; the second belongs to dependent type theory and category-theoretic bookkeeping. The programme becomes mathematically intelligible only when both readings are kept visible.

The zoom note for this book is beta: proof surface to scale-indexed field surface. We work across the Lean scale index `ScaleLevel := Fin 21` and the `ScaleStep` constructors from Planck foam through `CosmicWeb`. Although the prose often calls this a twenty-scale hierarchy, the current Lean files encode twenty-one indexed positions, 0 through 20, with nineteen real `FieldLayerType` cases and two boundary tags still represented by `String`. That is not a scandal; it is exactly the kind of discrepancy a formal account should expose. `kernel-verified`

# Introduction: Dependent Types and the Geometry of Feeling

A mathematician meeting [T]-Theory for the first time should begin neither with the cosmological numerology nor with the clinical vocabulary. The right first question is: what are the objects, and in which theory do they live? The repository answers with a heterogeneous but inspectable proof surface. Some files define types and elementary maps. Some prove small theorems by `rfl`, `simp`, `ring`, `norm_num`, `linarith`, or imported library results. Some register axioms. Some leave `sorry`. Some prove a theorem whose proposition is only `True`, which is a formal closure but not a mathematical theorem of the advertised physical content. The programme is therefore not a single theorem. It is a stratified formal object.

That stratification is the reason this book is written for mathematicians and type theorists. The value of Lean here is not rhetorical certification. Lean does not certify that an emotional field exists, that a limbic amplitude is conscious above `sqrt 2`, that M-theory compactification is physically realised in an organism, or that therapy is renormalisation group flow. What Lean certifies is narrower and stronger: given declarations, definitions, imported theorems, and axioms, a term inhabits a type. The Curry-Howard lesson is familiar [@howard1980formulae; @martinlof1984intuitionistic]. The novelty of this repository is that the programme tries to place contested interdisciplinary claims in that discipline and let the type checker show where the claim actually sits. `kernel-verified`

The older generated framing for this volume spoke as though HoTT and univalence licensed an immediate ontology of feeling: equivalent somatic structures become identical, feelings are typed objects, and physically incoherent claims cannot be stated. That is too strong. Lean 4's ordinary foundation is not univalent HoTT, and the current files do not add a univalence axiom for emotional structures or a homotopy type of qualia. They contain final-tagless emotion terms, field vectors, matrices, product decompositions, scale-indexed structures, and a number of exact or trivial proofs. The lesson for a HoTT reader is therefore methodological rather than doctrinal. The programme is not yet a homotopy type theory of feeling. It is a dependent-type scaffold that may one day support one. `interpretive`

The central mathematical task is to distinguish four levels. First, there are definitions: `ScaleLevel := Fin 21`; `consciousnessThreshold : Real := Real.sqrt 2`; `isConscious phi := consciousnessThreshold <= phi`; `Spacetime4D := Fin 4 -> Real`; `CompactX7 := PropagatorSpace3D x LimbicAxis1D x CortexSpace3D`. Second, there are by-definition or elementary consequences: `consciousness_dichotomy` is `lt_or_ge phi consciousnessThreshold`; `threshold_positive` follows from positivity of a square root; `volitional_is_autonomous_when_zero` is a `simp` proof about adding zero. Third, there are substantive imported-library applications, such as Physlib's harmonic oscillator and wave-equation results in `MTheoryIsomorphism.lean`, Mathlib's Hermitian spectral machinery in `SomaField.lean`, and OSforGFF's Osterwalder-Schrader theorem in `USF_OSAxioms.lean`. Fourth, there are assumptions, placeholders, and unfinished proofs. The mathematics begins when these levels stop being blurred.

For the type theorist, the most promising object is `ScaleUniverse.lean`. It defines an inductive `ScaleStep` with constructors such as `CellularSynapse`, `BrainCEMI`, `OrganismBody`, `SwarmCrowd`, `GeologicalSeismic`, `GalacticHalo`, and `CosmicWeb`. It then defines a dependent family `FieldLayerType : ScaleStep -> Type`. At biological scales the fibre is an SFT type such as `Field8` or `CemiField`; at swarm scale it is `SwarmState 8`; at physical scales it imports Physlib or SFT-adjacent types such as `Electromagnetism.ElectricField 3`, `FluidDynamics.StressTensor 3`, and `Cosmology.FLRW`; and at Planck/string boundary scales it remains a `String` tag. Finally, `T_TheoryUniverse (sigma : ScaleStep)` packages a substrate, field layer, limbic coupling, and tensor rank. This is a genuine dependent family: changing the scale changes the type of the field layer. `UniversalSomaticField.lean` also uses a Sigma type in `usf_all_scales_inhabited`, but the current statement inhabits `Σ _ : ScaleLevel, FieldEquation n`; the equation component still depends on the outer `n`, not on the Sigma witness. That is an inhabitation fact, not a full dependent transport theorem. `kernel-verified`

That family is more modest than the slogan that turning the knob changes the laws of physics. The theorem `scale_shift_preserves_structure` proves `True` from equality hypotheses about tensor rank and limbic coupling. It records an intended invariant architecture, but its conclusion carries no additional mathematical content. `human_swarm_same_rank` is `rfl`: the two selected records have tensor rank `2` by construction. 
`nineteen_scales_have_real_types` is also `rfl`: the constant `field_layer_real_type_count` was defined to be `19`. These are useful audit points. They show that scale typing has been implemented, not that cross-scale physics has been derived.

The product geometry sits in `MTheoryIsomorphism.lean`. The file defines `SomaField11D` as a structure with four fields: spacetime, propagator, limbic, and cortex. It defines `MTheory11D` as `Spacetime4D x CompactX7`, with `CompactX7` itself a product of the propagator, limbic, and cortex spaces. The theorem `somaField_iso_mtheory` proves that `fromMTheory (toMTheory s) = s` as a function equality; `UniversalSomaticField.lean` later repackages this as a `SomaticLens`, a section-retraction pair. This is real formal content about products and records. It is not a physical derivation of M-theory. `kernel-verified`

That distinction matters because the prose of the programme often says isomorphic to M-theory. A type/product retraction is not the same as a compact Riemannian seven-manifold with G2 holonomy, nor the same as a physical compactification with moduli stabilisation. `MTheoryIsomorphism.lean` itself is careful: `X7_is_7D_product` states that the USF compact space is a well-defined 7D product, while the comment explicitly says this is not a compact G2 manifold. For a mathematical reader, the fair statement is: the repository encodes an eleven-dimensional bookkeeping structure whose product shape matches one common decomposition pattern. The stronger geometry remains outside the proved surface. `derived-under-assumptions`

The consciousness threshold is another instructive example. `UniversalSomaticField.lean` defines a limbic amplitude as a real number, sets the threshold to `Real.sqrt 2`, defines pre-conscious and conscious predicates by strict and non-strict inequality, and proves `consciousness_dichotomy` by `lt_or_ge`. This is impeccable Lean. It is also an elementary order fact about real numbers. The biological or phenomenological claim that first-person awareness is a threshold crossing of a limbic amplitude is not established by that theorem. It is an open empirical and philosophical hypothesis requiring a measurable amplitude, calibration of the threshold, and a theory of report, access, or experience. `open-hypothesis`

This book therefore treats the Lean files as an evidence ledger rather than as a triumphal appendix. A theorem may be important because it is substantively imported from an upstream library; it may be useful because it enforces a type boundary; or it may simply be a named reminder that a proposition was built into the definitions. A theorem with proposition `True` can be harmless as a placeholder, but it should never be cited as proving a Green-function identity. An axiom can be a respectable research marker, but it must be called an axiom. A `sorry` is neither shameful nor invisible; it is a proof debt. The programme is strongest when it makes those debts legible.

The five papers embedded in this volume should be read under that discipline. Mathematical co-identification gives the intended epistemic method: transfer theorems only when the relevant type signature and assumptions transfer. The Soma-Field paper gives the finite energy-landscape and BRECVEMA field vocabulary. The Universal and Zoomable USF papers give the scale-indexed Green-function architecture and the eleven-dimensional decomposition. The Lean appendix lists the proof surface, but this volume does not reproduce it inline; the builder will replace the AddPaper line with a note. The book you are reading supplies the missing connective work: how a mathematician should read the proof claims without inflating them.

## Ledger

| Claim | Label | Source |
|---|---|---|
| Lean verifies terms against definitions, imports, and axioms, not empirical adequacy. | `kernel-verified` | Lean kernel discipline; source comments |
| `ScaleUniverse.lean` implements a scale-indexed dependent family. | `kernel-verified` | `ScaleStep`, `FieldLayerType`, `T_TheoryUniverse` |
| The current scale surface uses 21 indexed positions, not a simple 20-element type. | `kernel-verified` | `ScaleLevel := Fin 21`; `ScaleStep` includes `CosmicWeb` |
| `somaField_iso_mtheory` is a type/product roundtrip, not physical compactification. | `kernel-verified` | `MTheoryIsomorphism.lean` |
| Consciousness as a threshold crossing is not proved by `consciousness_dichotomy`. | `open-hypothesis` | `UniversalSomaticField.lean` |
| Axioms, sorries, and `True` placeholders are part of the formal evidence surface. | `derived-under-assumptions` | `FieldAxioms.lean`; proof files with explicit `sorry` |

# The Proof Surface: Definitions, Theorems, Axioms, and Sorries

A formal reader should start by classifying declarations. In ordinary prose a claim can slide from definition to theorem to physical conclusion without a visible seam. Lean makes the seam visible. `FieldAxioms.lean` is the cleanest negative example: despite many rich English comments, each major item is an `axiom`. The file contains twenty axiom declarations: percept as propagator pole, attractor as Hopfield minimum, therapy as RG flow, topological trauma, Goldstone afterimage, `EmotionLang` universality, Aesop as co-identification, hypnopompic state optimisation, HRV as spectral density, co-identification as abduction, dyadic propagator existence, a c-theorem target, QUBO form, quantum winding change, two `PhysicsField` instances, topology invariance, two `SomaCategory` instances, and winding-functor preservation. They are typed. They are not proved. `derived-under-assumptions`

This is nevertheless mathematically useful. An axiom registry is superior to an unlabelled paragraph because the assumption has a name, a type, and a dependency surface. For example, `PerceptIsPropagatorPole` asserts that for a coupling matrix and emotion state there exists a complex frequency at which the somatic propagator has a pole equal to the percept. The type makes clear what must exist for the claim even to be meaningful: a `Propagator`, a `CouplingMatrix`, an `EmotionState`, a complex pole predicate, and a percept map. `FieldProofs.lean` explicitly marks this as still a gap: the final-tagless emotion algebra has been promoted, but the propagator-pole co-identification still needs the appropriate definitions and spectral proof.

The promoted part is instructive. `EmotionOntology.lean` defines `EmotionLang (r : Type)` as a final-tagless algebra with primitive emotions, `blend`, `dampen`, and `evoke`. Terms such as `awe`, `nostalgia`, and `acousticFright` are polymorphic in the interpreter. The `String` interpreter renders terms; the `List EmotionLabel` interpreter computes reachable labels; a valence interpreter classifies affective sign. `FieldProofs.lean` then proves `awe_is_universal` by `rfl`, `fear_in_awe` and `surprise_in_awe` by `decide`, and `awe_structural_universality` by a conjunction of `rfl` and decidable membership proofs. This is genuine final-tagless formalisation. It verifies consistency of the encoded emotion vocabulary, not the psychology of awe. `kernel-verified`

By-definition proofs are not trivial in the pejorative sense. They are valuable when the definition is the object under discussion. A type theorist routinely designs an interface so that important theorems collapse to `rfl`; that is a success of representation. But by-definition proofs should be described as such. `awe_is_universal` is universal because `awe` was defined as `blend fear surprise` for any interpreter satisfying `EmotionLang`. `volitional_is_autonomous_when_zero` is true because `volitional_update` adds the source term and the source is zero. `canonicalTherapeuticLens` satisfies its three lens laws because `view` and `set` are the product projection and update operations. The kernel checks these equalities exactly; it does not infer a clinical theory of volition.

Some files contain more substantive imported mathematics. `MTheoryIsomorphism.lean` imports Physlib harmonic oscillator and wave-equation modules. It defines a `SomaticOscillator` containing a Physlib `HarmonicOscillator`; `SomaticMode.equationOfMotion` is proved by `InitialConditions.trajectory_equationOfMotion`; `SomaticMode.freq_sq` and `freq_pos` use Physlib oscillator facts; and `somaticMode_waveEquation` applies `planeWave_waveEquation` under a `ContDiff Real 2 f0` hypothesis. These are not mere `rfl` facts. They show that, when the programme uses upstream formal physics, it can inherit nontrivial library theorems under explicit hypotheses. `kernel-verified`

`USF_OSAxioms.lean` is another serious imported-theorem surface. It imports `OSforGFF.OS.Master` and defines `USF_mass_identification k := k`. It then proves `USF_OS0_Analyticity`, `USF_OS3_ReflectionPositivity`, `USF_OS4_Clustering`, and `freefield_USF_satisfies_OS_axioms` by applying `gaussianFreeField_satisfies_all_OS_axioms` to `mu_GFF k` under `Fact (0 < k)`. Formally, this establishes Osterwalder-Schrader properties for the Gaussian free field at mass/wavenumber `k`. The identification of that Gaussian free field with the physically intended USF is a modelling move. The theorem is strong; the semantic bridge must remain labelled. `derived-under-assumptions`

The Hopfield files show both implementation and limitation. `Hopfield.lean` defines a pattern type `Fin D -> Real`, a weight matrix, a threshold activation `sgn`, Hebbian storage, a synchronous `step`, and energy. It proves the range of `step`, a fixed-point characterisation, equality of energy at a fixed point, a very limited non-increase result at fixed points, and a zero-weight attractor baseline. The comment explicitly says general energy descent and convergence require additional assumptions such as finite spin states with asynchronous updates or stronger matrix hypotheses. That is exactly the correct mathematical posture. `kernel-verified`

`SomaField.lean` translates the affective programme into an eight-dimensional BRECVEMA field. It defines mechanisms, the coupling matrix `W8`, symmetry lemmas, energy `energy8`, force `fieldForce8`, stored patterns, thresholds, a real matrix `W8ℝ`, proves `W8ℝ_isHermitian`, and defines `somaticPropagatorPoles` via Mathlib's Hermitian eigenvalues. This gives a concrete spectral surface for the claim that soma-field modes are propagator poles. But two important theorems still contain `sorry`: `perceptIsPropagatorPole_nostalgia` and `brainStemActivatesContagion`. The first currently asserts existence of an eigenvalue residual below one with witness `2`; the proof debt is numerical/spectral. The second asserts positive contagion activation from the startle pattern; the comment says the value is 23/25, but noncomputability blocks the present `norm_num` route. `open-hypothesis`

The project-wide `sorry` count matters because generated wrappers have previously said there were no active sorries. A direct source audit finds seven real `sorry`s, in `BRECVEMAVariational.lean` (two), `DyadicField.lean` (two), `SomaField.lean` (two), and `SomaNetwork.lean` (one). There are also many axioms outside `FieldAxioms.lean`: for example `quant_exp_1` in `LimbicTunnel.lean`, `greens_achieves_minimum_energy` in `SwarmPropagator.lean`, local GR and geometry axioms, and RG coefficient axioms. A formal mathematics volume should not hide this. In proof engineering, a labelled `sorry` is a map of future work. In public prose, ignoring it is overclaim. `open-hypothesis`

Some declarations are theorem-shaped placeholders. `greens_fn_is_SHO` in namespace `SomaField.Universal` has type `True` and proof `trivial`. Its comment explains a desired distributional Green-function identity and says physical content is supported elsewhere by OS axiom verification. But the Lean theorem itself proves only `True`. Similarly, `classical_trapped` in `LimbicTunnel.lean` currently concludes `True` after quantifying over initial state and time; it is not a Lyapunov trapping theorem. `cosmological_correspondence` in `UniversalSomaticField.lean` produces a scale-19 witness and inhabitation of `FieldEquation`, not a formal derivation of the linearised Einstein equation. These declarations are useful documentation, but they should not be promoted into mathematical facts. `derived-under-assumptions`

At the same time, a theorem can be elementary and still worth naming. `wells_at_pm1` in namespace `SomaField.LimbicTunnel`, `barrier_height`, `V_nonneg`, `deriv_V`, `gradient_traps_near_neg1`, `wkbAmplitude_pos`, and `wkbAmplitude_lt_one` encode a quartic double-well and WKB amplitude facts. The analytic content is modest but real. The quantum-experiment claim, however, is not proved by those lemmas. `quant_exp_1` is an axiom whose conclusion repeats positivity of `wkbAmplitude W`; the empirical statement about quantum and classical success rates is outside the formal proof and should be labelled as simulation output. `simulated`

The Swarm proof surface is similarly mixed. `propagator_beats_classical` proves `N * N < N * K` when `0 < N` and `N < K`; `breakeven_at_N` and `classical_wins_single_round` correctly delimit the comparison. `jam_resistant` and `jellyfish_single_step` are `rfl` restatements of one-step definitions. The global optimality claim is an axiom requiring variational calculus or PDE scaffolding. The honest reading is that the repository proves the arithmetic crossover and records the stronger Green-function optimality as a target. `kernel-verified`

This classification gives a useful mathematical standard for reading every paper in the volume. When a paper says a structure is identified with another, ask whether the Lean file proves a roundtrip isomorphism, a retraction, an inhabitation theorem, an imported-library property, an axiom, or only a proposition `True`. When a paper says a theorem is verified, inspect whether it is definitional, arithmetic, imported, assumption-dependent, or unfinished. This is not scepticism for its own sake. It is the ordinary discipline of proof. The programme becomes stronger when its ambitions are decomposed into exact proof obligations.

## Ledger

| Claim | Label | Source |
|---|---|---|
| `FieldAxioms.lean` is an axiom registry, not a theorem file. | `derived-under-assumptions` | `paper/FieldAxioms.lean` |
| The final-tagless `EmotionLang` results are proved by `rfl` and `decide`. | `kernel-verified` | `EmotionOntology.lean`; `FieldProofs.lean` |
| Physlib supplies real theorem content for oscillator and wave-equation modes. | `kernel-verified` | `MTheoryIsomorphism.lean` |
| OSforGFF theorems apply to `mu_GFF k`; USF=GFF is the modelling bridge. | `derived-under-assumptions` | `USF_OSAxioms.lean` |
| `SomaField.lean` proves Hermitian structure but leaves two spectral/dynamical sorries. | `open-hypothesis` | `SomaField.lean` |
| `greens_fn_is_SHO` as currently stated proves `True`. | `kernel-verified` | `UniversalSomaticField.lean` |
| QUANT-EXP-1 is simulation evidence, not a Lean proof of clinical or hardware quantum advantage. | `simulated` | `LimbicTunnel.lean`; quantum paper |
| Swarm arithmetic crossover is proved; global minimum-energy coordination is axiomatic. | `derived-under-assumptions` | `SwarmPropagator.lean` |

# Scale, Product, and Threshold

The formal programme has three recurrent mathematical forms: scale-indexed dependent families, product decompositions, and threshold predicates. Each is legitimate; each is also easy to overread. This chapter states them as mathematical objects.

The scale family begins with `ScaleStep`, an inductive type. It is not merely a list in prose: it is a finite enumeration whose constructors constrain pattern matching and dependent return types. `FieldLayerType` is a function from that enumeration to `Type`. Thus the type checker knows that the field layer at `BrainCEMI` is not the field layer at `SolarSystem`. A term of type `T_TheoryUniverse ScaleStep.BrainCEMI` cannot silently substitute a `ClassicalMechanics.VisViva` field layer; it must supply a `CemiField`. This is the genuine dependent-type contribution of `ScaleUniverse.lean`. `kernel-verified`

The mathematical cost is that the scale family is still a designed interface. Its fibres are not derived from a universal physical theorem. Nineteen of the twenty-one positions are assigned real types by import or local definition; two are string tags. Some assignments are natural, such as organism scale to `Field8` or swarm scale to `SwarmState 8`. Others are proxies: `StellarNeighbour`, `GalacticDisc`, and similar positions use available wave-vector or fluid/cosmology types. A type family can enforce consistency once the assignment is made; it does not prove the assignment is the unique or empirically correct one. `derived-under-assumptions`

The most exact statement is: `ScaleUniverse.lean` constructs a dependent product of scale-specific modelling choices. It is a formal atlas, not yet a theorem of scale invariance in the sense a renormalisation theorist would require. A future theorem might define an explicit functor or fibration over a scale category, prove coherence of transition maps, preserve equations under zoom, and state invariants stable under refinement. The current file has the beginnings of this in `ZoomStep`, with `factor`, positivity, and an operation between field equations. `ZoomStep.comp` and `ZoomStep.refl` supply categorical composition and identities at the record level. That is the right direction. `open-hypothesis`

`UniversalSomaticField.lean` has a parallel scale representation: `ScaleLevel := Fin 21`, `characteristicLength`, `FieldEquation n`, `scale_invariance_inhabited`, and `field_at_every_scale`. The theorem `scale_invariance_inhabited` constructs a dummy equation with `k=1` and `G=fun _ _ => 0`. It proves that the record type is inhabited for every scale. This is a useful sanity check: the dependent index does not make the field-equation type empty. It is not a proof that the physical Green function at each scale has been derived or that couplings transform correctly. `kernel-verified`

The product geometry is more concrete. In `MTheoryIsomorphism.lean`, the components are simple function types over finite index sets and real numbers. `SomaField11D` is a record; `MTheory11D` is a nested product. `toMTheory` and `fromMTheory` rearrange fields. The theorem `somaField_iso_mtheory` proves one roundtrip by function extensionality and simplification. In a categorical idiom, this is a retraction of the record presentation through the product presentation; in namespace `SomaField.Lens`, it becomes a `SomaticLens` with `viewReview`. This is exact and illuminating: the claimed eleven-dimensional architecture is represented by a reversible packaging map on the encoded data. `kernel-verified`

However, the term isomorphism should be used carefully. A mathematician usually expects both composites, or an equivalence structure with inverse laws. The Lean theorem as written states `(fun s => fromMTheory (toMTheory s)) = id` on `SomaField11D`; the other direction is not the named theorem, though it would likely be a straightforward product extensionality proof. More importantly, even a full type equivalence would still be an equivalence of encodings, not of physical theories. The field spaces are finite function types and products of reals, not compact smooth manifolds with metrics, connections, spin structures, or holonomy data. `derived-under-assumptions`

The file itself acknowledges the geometry gap. `X7_is_7D_product` proves existence of a `CompactX7` inhabitant and records that the space is a flat product of field-theoretic spaces, not a compact G2 manifold. `G2Compactification.lean`, `LocalGeometry.lean`, and `LocalGR.lean` introduce axioms for topological partition, Horava-Witten compactification, zero-mode coupling, linearised Einstein equations, and related steps. These may be valid research targets, but the product proof does not discharge them. A book for mathematicians should say this plainly because G2 geometry is not decorative; it is the difference between dimension counting and a compactification theorem. `open-hypothesis`

The threshold predicate is the smallest and sharpest example. It uses no biology. It says: a real number is either less than `sqrt 2` or at least `sqrt 2`. The proof is `lt_or_ge`. `consciousness_monotone` then says if `sqrt 2 <= phi1 <= phi2`, then `sqrt 2 <= phi2`, proved by `linarith`. `threshold_positive` follows from `Real.sqrt_pos`. These are correct and useful as a formal skeleton. They give the programme a precise predicate that can be manipulated, negated, and composed. But the word conscious in the identifier is semantic annotation, not theorem content. `kernel-verified`

A mathematical reader may object that this is too easy. But easy predicates often matter. A theory of phase transition needs an order parameter and threshold before it can state hysteresis, noise, finite-size effects, and critical scaling. The current Lean file supplies a normalised predicate. The open work is to connect it to a measurable field amplitude, define empirical equivalence classes of conscious report or behaviour, and prove or test stability under perturbation. Until then, the formal theorem should be cited as predicate dichotomy rather than consciousness theorem. `open-hypothesis`

The programme's Green-function claims also sit between these three forms. Analytically, a Green function is an inverse or fundamental solution. Formally in the current source, `FieldEquation n` contains a `G : Real -> Real -> Real` and a positive `k`; no PDE property is included in the record. `greens_fn_is_SHO` is `True`. The stronger Green-function identity appears in paper prose and in the OSforGFF bridge, where the Gaussian free field covariance kernel has the appropriate form. To make the claim a Lean theorem internal to `FieldEquation`, the structure would need to include the differential equation or distributional property, and Mathlib would need enough Schwartz/distribution infrastructure. `open-hypothesis`

For type theorists, this suggests a research programme. Replace prose identifications by structures whose fields state the required laws. A future HelmholtzGreen structure might carry an operator, boundary conditions, a distributional identity, uniqueness up to appropriate function spaces, and positivity or decay assumptions. A future ScaleFunctor might map one such structure to another while preserving a theorem class. A future ConsciousThresholdModel might separate the ordered amplitude, the chosen threshold, an observation map, and empirical calibration evidence. Then theorem transfer would occur through explicit morphisms rather than through overloaded names. `interpretive`

The existing code already gestures towards this. `SomaticLens` and `TherapeuticLens` are record-level optics; `ZoomStep` has identity and composition; `EmotionLang` is final-tagless; `PhysicsField` and `SomaCategory` in `FieldAxioms.lean` are typeclass sketches. The next mathematical step is not to add more grand claims but to enrich these interfaces until the theorems that matter can no longer be stated as `True`. That is how dependent types turn a research programme into a proof programme. `open-hypothesis`

## Ledger

| Claim | Label | Source |
|---|---|---|
| `FieldLayerType` is a genuine dependent family over `ScaleStep`. | `kernel-verified` | `ScaleUniverse.lean` |
| Nineteen of twenty-one scale positions have non-`String` field-layer types. | `kernel-verified` | `nineteen_scales_have_real_types` |
| Current scale invariance is inhabitation and interface coherence, not RG invariance. | `derived-under-assumptions` | `scale_invariance_inhabited`; `ZoomStep` |
| `somaField_iso_mtheory` proves an encoded product roundtrip. | `kernel-verified` | `MTheoryIsomorphism.lean` |
| Full G2 compactification is not proved. | `open-hypothesis` | `G2Compactification.lean`; local geometry axioms |
| `consciousness_dichotomy` is a real-number threshold dichotomy. | `kernel-verified` | `UniversalSomaticField.lean` |
| Consciousness as biological/phenomenal threshold crossing is not formally or empirically closed. | `open-hypothesis` | `UniversalSomaticField.lean`; threshold-model interpretation |
| The Green-function-to-SHO identity needs a stronger formal structure than the current `True` theorem. | `open-hypothesis` | `greens_fn_is_SHO`; `USF_OSAxioms.lean` |

# Mathematical Co-identification as Typed Abduction

The methodology paper calls its central move mathematical co-identification: find the known mathematical object that has the same type signature as the unknown one, then import theorems that depend only on that signature. For mathematicians this is familiar in parts. We routinely identify heat kernels across contexts, recognise variational forms, pass through equivalences of categories, or use representation theorems to replace a concrete problem by a canonical object. The danger lies in the word same. Type identity, isomorphism, equivalence, homeomorphism, Morita equivalence, adjunction, weak equivalence, and analogy do not license the same imports. `interpretive`

The paper's strongest contribution is therefore its failure protocol. It asks for units, domain and codomain, pole structure, symmetries, variational principles, conservation laws, assumptions, predictions, and disconfirmation criteria. In proof-engineering terms, it asks for the missing context and hypotheses. A theorem is not transported by resemblance; it is transported by a map preserving the structure used in the proof. If the imported theorem uses positivity, compactness, locality, differentiability, or self-adjointness, the target must supply those properties. `derived-under-assumptions`

Lean can enforce this discipline only where the structures are encoded. If a theorem's type requires `Matrix.IsHermitian`, Lean will demand a proof. `SomaField.lean` supplies such a proof for `W8ℝ`, and therefore Mathlib eigenvalue machinery becomes available. That is real theorem transfer. If a theorem's English comment says Green's function of the field substrate but its Lean proposition is `True`, there is no theorem transfer. The system has no access to the intended mathematics unless the intended mathematics is in the type. `kernel-verified`

This distinction clarifies the relation between co-identification and HoTT. Homotopy Type Theory teaches that equality itself may have structure and that equivalences can be promoted under univalence [@hottbook]. But the present repository, written in ordinary Lean 4, does not use univalence to identify emotional structures. Its equivalence claims are ordinary Lean functions, records, and theorems. That is not a defect. It means the project currently lives closer to dependent record design and formalised applied mathematics than to univalent foundations. The HoTT vocabulary is suggestive; the Lean code is more elementary. `interpretive`

The Aesop claim is especially delicate. `FieldAxioms.lean` contains `AesopImplementsCoIdentification`, asserting that for a target type there exists a candidate type and an equivalence, with a trivial body comment. This is an axiom, not a theorem about Aesop. Actual Aesop is a proof-search tactic over registered rules; it can be part of a co-identification workflow when the relevant lemmas and structures are formalised. It does not by itself search the scientific typeverse or validate cross-domain imports. `derived-under-assumptions`

A type theorist might recast co-identification as a fibration problem. There is a base of signatures and a fibre of models realising each signature. The method first maps a phenomenon to a signature, then searches for another object in the same fibre, then transports propositions invariant under the relevant morphisms. The open mathematical work is to state that base and its morphisms. Are signatures syntactic records? Categories with structure? First-order theories? Typeclasses? Ontologies linked to Lean declarations? Each choice changes what same can mean. `open-hypothesis`

The final-tagless emotion DSL is a small but concrete instance. `EmotionLang` specifies operations; each interpreter realises the algebra differently. The term `awe` is one syntax with multiple semantics. Theorems about the label-list interpreter do not automatically become theorems about the valence interpreter unless their statements are polymorphic or a relation between interpreters is proved. That is the exact local version of the global co-identification rule. It is also a warning: one syntax can have many semantics, and theorem transfer must track which semantics the theorem used. `kernel-verified`

The Hopfield co-identification is more mathematical. Hopfield's classical network already has a quadratic energy landscape [@hopfield1982; @ramsauer2020hopfield]. The Soma-Field finite model defines `energy8`, a symmetric coupling matrix, force, thresholds, and stored patterns. It is therefore reasonable to import the language of energy landscapes, attractors, and fixed points under stated assumptions. But the general Hopfield convergence theorem is not proved for `energy8`; `Hopfield.lean` explicitly limits its result to a zero-weight baseline and fixed-point equality. The correct label is not proved clinical attractor theory but finite Hopfield-style model with partial formal backing. `derived-under-assumptions`

The M-theory co-identification is weaker still. The type/product decomposition has a formal roundtrip; the physical theory requires far more structure. A co-identification ledger should therefore have separate rows: dimension count and product retraction, G2 holonomy, compactness, moduli-space metric, field equations, and empirical consequences. The first row is proved in the encoding; several later rows are axioms or open. Treating the whole stack as one identity is the kind of over-identification the methodology paper itself warns against. `open-hypothesis`

The OSforGFF bridge is stronger in a different way. The source theorem is an actual formal theorem about the Gaussian free field satisfying OS axioms. The target claim says the free-field USF at wavenumber `k` is the GFF at mass `k`. If the USF free field is defined as that GFF, then the theorem transfers by definition. If the USF is an independently specified physical field merely similar to the GFF, then the transfer requires an isomorphism theorem. The repository currently chooses the first route in the formal file and the broader route in prose. A mathematical reader should keep them separate. `derived-under-assumptions`

Co-identification therefore has a rigorous future in the programme if it becomes a typed registry. Each row should name a source structure, target structure, morphism, theorem class, hypotheses used, Lean declarations, empirical observables, and falsifiers. The existing claim ledgers in the papers point in this direction. The type-theoretic contribution would be to make the registry itself checkable: no paper sentence saying therefore all QFT machinery imports unless the theorem class and assumptions have a declared transport map. `open-hypothesis`

## Ledger

| Claim | Label | Source |
|---|---|---|
| Co-identification is useful only when theorem assumptions transfer. | `interpretive` | Mathematical co-identification paper |
| Lean enforces theorem transfer only for encoded hypotheses. | `kernel-verified` | general Lean discipline; examples in `SomaField.lean` |
| `AesopImplementsCoIdentification` is an axiom, not a proof about Aesop. | `derived-under-assumptions` | `FieldAxioms.lean` |
| `EmotionLang` demonstrates final-tagless polymorphism across interpreters. | `kernel-verified` | `EmotionOntology.lean`; `FieldProofs.lean` |
| Hopfield import is model-supported but not a general convergence proof for SFT. | `derived-under-assumptions` | `Hopfield.lean`; `SomaField.lean` |
| M-theory import is product-level unless additional geometric structures are proved. | `open-hypothesis` | `MTheoryIsomorphism.lean`; `G2Compactification.lean` |
| OSforGFF import is formal for `mu_GFF k`; semantic USF identification remains a modelling step. | `derived-under-assumptions` | `USF_OSAxioms.lean` |

# Worked Mathematical Objects

We now assemble the main formal objects in one place, not as a proof of the programme but as a map for further work.

First is the finite affect field. `SomaField.lean` defines `N8 := 8`, maps BRECVEMA mechanisms to indices, and defines an exact rational coupling matrix `W8`. The matrix has diagonal self-amplification 6/5 and specified off-diagonal couplings such as positive BrainStem-Contagion and MusicalExpectancy-AestheticJudgement terms, plus inhibitory BrainStem-AestheticJudgement and EvaluativeConditioning-VisualImagery terms. `W8_symm` proves symmetry by case analysis using `min` and `max`. This is concrete finite mathematics. `kernel-verified`

From `W8` the file defines `energy8(e) = -1/2 sum_i sum_j e_i W_ij e_j` and `fieldForce8(e)_i = sum_j W_ij e_j`. The dynamics `step8` and `runField8` are discrete and deterministic in the file; noise and continuous-time Langevin claims live in prose or external code. Stored patterns such as `nostalgiaPattern`, `startlePattern`, `musicalAwePattern`, and `entrainmentPattern` are exact functions from `Fin 8` to `Real`. They form a finite laboratory for spectral and attractor claims, but the general stability theory is not yet proved. `derived-under-assumptions`

The spectral bridge is promising. The file defines `W8ℝ` as a `Matrix (Fin 8) (Fin 8) Real`, proves `W8ℝ_isHermitian`, and obtains `somaticPropagatorPoles` as eigenvalues. This is exactly the kind of move the co-identification method needs: the target structure has the hypothesis required for the source theorem. The remaining proof debts are local and plausible: compute or bound the residual for a pattern and prove a particular activation inequality. These are theorems a Lean mathematician could attack with computable rational matrices, interval arithmetic, or more direct finite enumeration. `open-hypothesis`

Second is the emotion-language algebra. Its mathematical status is less analytic but cleaner as type theory. A final-tagless signature gives a syntax of emotional constructions independent of interpretation. Theorems about `awe`, `nostalgia`, and `acousticFright` become tests of the interpreters. The DSL also helps separate ontology from dynamics. The term `nostalgia` can be rendered, labelled, or given valence without claiming that the Hopfield field will converge to a nostalgia attractor. This separation is a useful design principle for the whole project: syntax, semantics, dynamics, and empirical instantiation should remain separate layers. `kernel-verified`

Third is the organism/product architecture. `MTheoryIsomorphism.lean` defines finite-dimensional components by functions from finite index sets to reals. It also defines `Organism4D`, `Organism7D`, and `Organism11D` projections. `organism_hierarchy` proves that projecting an `Organism11D` to seven and then four dimensions recovers the same spacetime component. `boundary_not_interior` proves the two limbic boundary points of `limbicBoundary` are not in the open interval (-1,1). These are small facts, but they make the record geometry precise. `kernel-verified`

Fourth is the limbic tunnel. `LimbicTunnel.lean` defines a barrier parameter and a quartic potential `V(x)=W(x^2-1)^2`. It proves wells at plus and minus one, barrier height at zero, non-negativity, derivative formula, local trapping direction near -1, and WKB amplitude positivity and boundedness below one for positive `W`. This is standard one-dimensional calculus encoded in Lean today, explicitly and reproducibly. The claims about empirical simulation and quantum advantage are outside these lemmas. A future formalisation would define a stochastic process, classical and quantum transition probabilities, and a theorem comparing them under explicit parameters. `kernel-verified`

Fifth is the field-modulated Hopfield network in `LimbicHopfield.lean`, not read here as a clinical proof but as algebra. The file contains the correspondence principle that, at zero field/stress, the modified network reduces to the classical Hopfield form; it also encodes temperature comparisons for ADHD and ASC operators as arithmetic inequalities. These are useful formal tests of a proposed parameterisation. They are not psychiatric facts. A valid mathematics volume must be careful because the names of the operators refer to clinical categories; the theorems prove consequences of numeric encodings. `derived-under-assumptions`

Sixth is the swarm propagator. It is a simple complexity model: classical message passing costs `N * K`; the propagator step costs `N * N`. The theorem `propagator_beats_classical` correctly states the crossover condition `N < K` with `0 < N`. This is not an $O(N^2)$ lower bound for all coordination, nor a proof that a Green-function matrix solves every swarm task. It is an arithmetic comparison between two cost models. The file's honesty is useful because it also states the stronger variational optimum as an axiom. `kernel-verified`

Seventh is the OS/QFT surface. In the formal file, the free-field USF is treated by identifying the wavenumber with GFF mass. Under that identification, all five OS axioms follow from the imported theorem. This is one of the strongest formal imports in the repository, provided the reader understands its scope. It says the formal object `mu_GFF k` satisfies OS axioms. It does not say the full interacting soma-field with Hopfield coupling has been constructed, nor that the clinical or cosmological interpretations are thereby established. `derived-under-assumptions`

These objects can be organised by how a mathematician might contribute. A finite-matrix specialist can close the `SomaField.lean` sorries. A category theorist can replace typeclass sketches of `SomaCategory` with actual category, monoidal, dagger, or lens structures. A PDE analyst can formulate a real Helmholtz Green structure and state the SHO claim in distributions. A stochastic analyst can formalise QUANT-EXP-1 transition probabilities. A geometer can separate the flat product `CompactX7` from compact G2 targets. A proof engineer can build the claim registry tying prose, Lean declarations, and evidence labels. `open-hypothesis`

The common requirement is precision about evidence labels. A by-definition proof is not an embarrassment. A substantive imported theorem is not a licence to import unproved semantics. An axiom is not a failure. A `sorry` is a proof debt. A simulation is not a theorem. An interpretation is not an empirical result. The mathematical contribution of this repository lies in making those distinctions workable inside an ambitious cross-domain theory. The formal surface is not finished; it is sufficiently explicit for serious work to begin. `interpretive`

## Ledger

| Claim | Label | Source |
|---|---|---|
| `W8` and `W8ℝ` give a finite exact coupling model. | `kernel-verified` | `SomaField.lean` |
| `somaticPropagatorPoles` uses Hermitian eigenvalues after proving symmetry. | `kernel-verified` | `W8ℝ_isHermitian` |
| Pattern residual and contagion activation still have proof debts. | `open-hypothesis` | `perceptIsPropagatorPole_nostalgia`; `brainStemActivatesContagion` |
| `EmotionLang` separates syntax from multiple interpreters. | `kernel-verified` | `EmotionOntology.lean` |
| Limbic tunnel calculus facts are proved; probability comparison is not. | `derived-under-assumptions` | `LimbicTunnel.lean` |
| Swarm crossover theorem proves only the stated `K>N` arithmetic. | `kernel-verified` | `SwarmPropagator.lean` |
| OS axioms apply to the imported Gaussian free field object. | `derived-under-assumptions` | `USF_OSAxioms.lean` |
| Many advertised stronger claims are credible proof targets rather than finished results. | `open-hypothesis` | cross-file proof obligations |

# Proof Status as Mathematical Content

The formal proof status is not an administrative detail appended to the science. In this repository it is itself mathematical content. The same English phrase can name at least five different proof situations: a definitional equality, an elementary arithmetic theorem, an imported library theorem, an axiom, or an unfinished proof. A reader who collapses those situations will misunderstand the programme even if every formula is copied correctly.

The first class is by-definition mathematics. These are proofs where the theorem becomes true because the relevant structure was deliberately encoded that way. Examples include `awe_is_universal`, `awe_string`, and the lens laws for `canonicalTherapeuticLens`. This is not a defect. In type-theoretic design, good definitions make intended laws judgmental or nearly judgmental. The important caveat is semantic: if `awe` is defined as `blend fear surprise`, Lean can prove that equality for every interpreter, but it cannot prove that the human experience called awe has only those constituents. The definition is a formal choice; the theorem confirms its consequences. `kernel-verified`

The second class is elementary but non-definitional mathematics. `consciousness_dichotomy` uses the linear order on real numbers; `threshold_positive` uses square-root positivity; `propagator_beats_classical` uses arithmetic on natural numbers; `barrier_height` simplifies a polynomial potential; `wkbAmplitude_pos` uses positivity of the exponential. These theorems are often rhetorically overused because their names are ambitious. Mathematically, their value lies in making exact the assumptions on which later claims depend. A threshold model must at least have a threshold predicate; a complexity comparison must state its crossover condition; a WKB story must at least know that the formal amplitude is positive. `kernel-verified`

The third class is imported substantive mathematics. The Physlib harmonic-oscillator results, Physlib wave-equation results, Mathlib Hermitian eigenvalue machinery, and OSforGFF theorem are not created by the SFT prose. They are inherited by presenting objects that satisfy their hypotheses. This is where co-identification becomes most rigorous. If the target object supplies the typeclass instances or proof arguments demanded by the source theorem, theorem transfer occurs through ordinary proof application. The reader should give these results more weight than slogans but still inspect the bridge: what exactly is the object to which the external theorem is applied? `kernel-verified`

The fourth class is axiomatic mathematics. Axioms are not illegitimate. Modern formal developments often use axioms for classical choice, quotient principles, extensionality, or domain-specific postulates. But an axiom is not evidence that the postulated proposition is true of the intended world. `FieldAxioms.lean` is explicit about this. It is a typed claim registry and future-work surface. It says, in effect: here are the propositions the programme wants to make precise. If a later theorem depends on them, the correct label is `derived-under-assumptions`, not `kernel-verified` as an independent result. `derived-under-assumptions`

The fifth class is the unfinished proof. The repository contains seven real `sorry`s. They are concentrated in files whose claims are mathematically nontrivial: variational BRECVEMA/G2 material, dyadic field transfer, spectral/numerical facts in `SomaField.lean`, and one network comparison in `SomaNetwork.lean`. A `sorry` temporarily inhabits a type so the file can continue to elaborate. It is a hole, not a theorem. A published mathematical volume should name such holes because they are the exact points at which outside mathematicians can contribute. `open-hypothesis`

There is also a sixth quasi-class: theorem-shaped documentation. Theorems of `True` and placeholders with trivial proofs are useful in a research repository because they reserve a name, locate a claim, and keep the narrative in the source. They are dangerous in prose because they look like completed formalisation. `greens_fn_is_SHO` is the central example. The surrounding comment gives a serious intended claim about the Green function and harmonic oscillator; the formal proposition is `True`. The conclusion for the reader is neither to dismiss the intended mathematics nor to count it as proved. It is a named proof obligation. `open-hypothesis`

A robust reading protocol follows. First, inspect the exact proposition, not only the theorem name. Second, inspect the proof term or tactic: `rfl`, `simp`, `ring`, `linarith`, imported theorem application, axiom, or `sorry` carry different epistemic weights. Third, inspect dependencies: a theorem using an axiom or a local assumption inherits that assumption. Fourth, separate formal theorem from semantic naming. A declaration called `universe_is_11D_organism` can be a definition inhabiting a record; the name does not make it a cosmological result. Fifth, when a file imports a library theorem, identify the bridge object and hypotheses. This is ordinary mathematical hygiene, but it is unusually important in interdisciplinary formalisation.

This protocol is also a way to avoid cynicism. It would be easy to say that because the programme contains axioms and sorries, nothing has been done. That is false. The code contains genuine definitions, exact finite structures, dependency-indexed families, product maps, imported proof applications, and proof obligations precise enough to attack. It would also be easy to say that because some files type-check, the programme is verified. That is false too. A serious reader must inhabit the middle: formal work has begun and has value, but its status is local and typed.

The distinction between `kernel-verified` and `derived-under-assumptions` is therefore the book's main mathematical ethic. A kernel-verified theorem compiles without `sorry` in the named surface and does not rely on an unadvertised local axiom for the main claim. A derived-under-assumptions result may be perfectly good mathematics, but the assumptions must be part of the theorem's public name. A simulation result may be excellent evidence for a model class, but it remains simulation. An interpretation may be philosophically fruitful, but it is not a proof. These labels are not bureaucratic; they are the typed boundary between discovery and justification.

## Ledger

| Claim | Label | Source |
|---|---|---|
| By-definition proofs can be valuable but prove consequences of chosen encodings. | `kernel-verified` | `FieldProofs.lean`; lens definitions |
| Arithmetic theorems with ambitious names remain arithmetic theorems. | `kernel-verified` | `UniversalSomaticField.lean`; `SwarmPropagator.lean`; `LimbicTunnel.lean` |
| Imported theorems carry weight only through their stated hypotheses. | `kernel-verified` | Physlib, Mathlib, OSforGFF uses |
| Axioms are typed assumptions and should be labelled as such. | `derived-under-assumptions` | `FieldAxioms.lean` |
| Sorries are proof debts, not established results. | `open-hypothesis` | seven project-wide `sorry`s |
| Theorems of `True` are documentation unless strengthened. | `open-hypothesis` | `greens_fn_is_SHO`; placeholder-style results |

# Open Problems for Type Theorists and Mathematicians

The most productive mathematical work on this project will be unglamorous. It will not begin by proving that experience is a field. It will begin by replacing comments with structures, replacing axioms with hypotheses, and replacing slogans with transport lemmas. This chapter lists the main routes.

The first route is finite exact computation. `SomaField.lean` already has rational entries for the BRECVEMA matrix. A natural next step is to introduce a computable rational matrix parallel to the real matrix, prove transfer to the real version, and close finite inequalities by exact computation. The two current sorries in that file look susceptible to this approach. If the nostalgia residual is really about 0.27 for a specified witness, an exact rational or interval proof should be possible. If the startle-to-contagion activation is 23/25, the proof should not depend on informal arithmetic in a comment. `open-hypothesis`

The second route is typed Green-function analysis. The current `FieldEquation` record lacks the equation it names. A stronger structure should include a domain, operator, function space, boundary condition, distributional delta, and proof that `G` is a fundamental solution. Only then can a theorem called `greens_fn_is_SHO` state the desired identity. This may require Mathlib distribution theory, Sobolev-space infrastructure, or a deliberately finite/discrete Green-function surrogate. Any of those choices would be better than a theorem of `True`, because the assumptions would become inspectable.

The third route is categorical scale theory. `ZoomStep` has the right shape: source scale, target scale, positive factor, and operation on equations. To become a serious scale-invariance theorem it needs laws beyond record composition. Does a zoom preserve solution spaces? Does it preserve a chosen class of observables? Are there natural transformations between substrate interpretations? Is the scale index a poset, a category, or a groupoid of resolutions? A categorical presentation could also resolve the 20/21-scale naming tension by distinguishing positions, intervals, and transitions.

The fourth route is geometric honesty. The product `CompactX7` is formally useful, but it is not a compact G2 manifold. A geometer can help by building a tower of increasingly strong structures: seven-dimensional product vector space; smooth manifold; Riemannian manifold; compact manifold; G2-structure; torsion-free G2 holonomy; compactification satisfying physical constraints. The programme can then state exactly which layer each theorem uses. This would prevent dimension-counting facts from being mistaken for holonomy theorems. `open-hypothesis`

The fifth route is a formal claim ledger. The repository already has informal ledgers and evidence labels. A Lean-adjacent or external typed database could link a prose claim to Lean declarations, proof status, dependencies, source papers, simulations, and falsifiers. Such a ledger would be a mathematical instrument in its own right. It would allow a reader to query: which claims depend on `FieldAxioms.lean`? Which claims use OSforGFF? Which claims are blocked by `sorry`? Which claims have simulation evidence but no theorem? This is the natural substrate for a future Sherlock-style auditor, but it should be presented as a tool to be built, not as a completed judge.

The sixth route is probabilistic dynamics. QUANT-EXP-1 currently sits between numerical simulation and WKB intuition. A formal version would define the finite state space, Hamiltonian or transition kernel, annealing schedule, measurement distribution, and classical comparator. It would then state a probability inequality corresponding to the reported result. The exact 8-qubit statevector simulation is useful evidence for this target, but the theorem should be separate from the script output. `simulated`

The seventh route is semantics for clinical and phenomenological names. Many Lean identifiers contain terms such as awe, trauma, consciousness, ADHD, ASC, therapy, and organism. The formal content is often algebraic or arithmetic. A mathematically careful project can preserve these names for provenance while also supplying neutral internal structures: thresholds, fields, matrices, kernels, operators, and predicates. Clinical or phenomenological interpretation should be a separate layer with its own evidence rules. This separation protects both the mathematics and the human subject matter.

These open problems are not peripheral. They are the route by which the programme could become genuinely formal rather than formally decorated. The strongest thing the current repository offers is not a finished theory of mind but a surprisingly detailed scaffold: enough definitions to locate the questions, enough proofs to show the method, enough axioms to reveal the ambitions, and enough holes to invite mathematical work.

## Ledger

| Claim | Label | Source |
|---|---|---|
| Finite BRECVEMA matrix claims are plausible targets for exact computation. | `open-hypothesis` | `SomaField.lean` |
| Green-function claims need stronger structures than current records. | `open-hypothesis` | `UniversalSomaticField.lean` |
| Scale theory should distinguish positions, transitions, and invariants. | `open-hypothesis` | `ScaleUniverse.lean`; `ZoomStep` |
| G2 claims require a hierarchy of geometric structures, not just dimension count. | `open-hypothesis` | `MTheoryIsomorphism.lean`; `G2Compactification.lean` |
| A typed claim ledger would make evidence status queryable. | `interpretive` | repository evidence-label discipline |
| QUANT-EXP-1 needs a formal probability model to become a theorem. | `simulated` | `LimbicTunnel.lean`; quantum simulation paper |

# The Axiom Registry and the Appendix Problem

`FieldAxioms.lean` deserves its own mathematical discussion because it is easy to misread. It is not a failed proof file. It is a deliberate register of propositions the programme wants to track. In informal mathematics, a conjecture may live in prose for years; here it has a Lean name and a Lean type. That is progress, provided the word axiom remains visible. The danger begins when later prose quotes an axiom as though it had been promoted.

The file's first two co-identification axioms are a useful pair. `PerceptIsPropagatorPole` says that the percept appears as a pole of the somatic propagator. `AttractorIsHopfieldMinimum` says that being an attractor is equivalent to being a local minimum of a Hopfield energy. These are natural mathematical targets. They are also precisely the claims a reader should expect to be hard: they require definitions of percept, propagator, pole, energy, local minimum, and a bridge from finite affective vectors to spectral objects. `SomaField.lean` has begun the finite spectral side, but the registry claim itself remains an assumption. `derived-under-assumptions`

The therapy axioms are even more assumption-heavy. `TherapyIsRGFlow`, `TopologicalTraumaRequiresTopologicalIntervention`, and `GoldstoneAfterimagePersists` import language from renormalisation, topology, and symmetry breaking into clinical or phenomenological interpretation. They can be meaningful model hypotheses, but they are not mathematical consequences of the existing files. A rigorous route would first define a state space, topology, class of smooth interventions, winding number, energy functional, and transition relation. Only then could a theorem say which operations preserve which invariants. Until then these declarations should be read as formalised conjectures or model axioms. `open-hypothesis`

The methodology axioms are similarly instructive. `AesopImplementsCoIdentification` and `CoIdentificationIsAbduction` are not theorems about proof search, Peircean logic, or the scientific method. They are high-level proposals encoded as propositions. A mathematically serious version might define a category of signatures, a search relation over known structures, a scoring function, and a correctness theorem for theorem transfer under equivalence. That would be a beautiful project. The current axiom is a signpost, not the project itself. `interpretive`

The later `PhysicsField` and `SomaCategory` sections sketch a path towards abstraction. `PhysicsField` has a Hamiltonian, quantum parameter, and topological invariant. `SomaCategory` has state spaces, processes, identity, composition, tensor-like pairing, and a dagger. These are recognisably categorical ambitions, but `SomaCategory` is not a Mathlib category instance and does not state associativity, unit, monoidal, compact, or dagger laws. The instances `classicalPhysicsField`, `quantumPhysicsField`, `classicalCSFT`, and `quantumCSFT` are axioms. A category theorist should therefore read them as proposed interfaces. The mathematical work would be to instantiate them from concrete structures and prove the laws that the current record omits or leaves implicit. `open-hypothesis`

This axiom registry also explains why the Lean appendix must not be embedded as authority without source inspection. The appendix prose, like any appendix prose, can lag behind the files. It may describe a file as kernel-verified while the current source contains a `sorry`, or it may summarise a theorem by its intended interpretation rather than its exact statement. For a formal mathematics volume, the source files are primary. The appendix is an index into them. The correct workflow is: read the appendix entry, open the named Lean file, inspect the declaration, inspect its dependencies, then decide the evidence label.

A robust future appendix would be generated rather than written. It would run a Lean-aware extraction pass that lists every theorem, axiom, `sorry`, imported theorem dependency, and proof-body category. It would mark propositions whose conclusion is `True`; it would distinguish declarations proved by `rfl` from those using imported theorems; it would show which named theorems depend on local axioms. Such an appendix would be more boring than the present prose and much more useful. It would turn the repository into an auditable mathematical object.

The reader can already do a rough version of that audit. The exact `sorry` locations are visible by search. The axiom declarations are visible by search. `#print axioms` can expose dependencies for individual Lean declarations when the project builds. Even without a full build, reading the files reveals the proof style: `rfl`, `simp`, `norm_num`, `linarith`, imported theorem application, axiom, or `sorry`. This book has followed that rough audit rather than relying on generated wrappers.

The appendix problem is therefore also a publishing problem. Mathematical prose naturally wants smoothness; proof status naturally wants rough edges. A volume for specialists should preserve the rough edges. It should say "this theorem is definitional", "this theorem is arithmetic", "this theorem imports OSforGFF", "this claim is an axiom", and "this line is still a `sorry`". That is not defensive writing. It is the style in which formal mathematics becomes trustworthy.

## Ledger

| Claim | Label | Source |
|---|---|---|
| `FieldAxioms.lean` is useful as a typed conjecture and assumption registry. | `derived-under-assumptions` | `paper/FieldAxioms.lean` |
| Percept-pole and Hopfield-minimum claims remain assumptions at registry level. | `derived-under-assumptions` | `PerceptIsPropagatorPole`; `AttractorIsHopfieldMinimum` |
| Therapy/topology/RG declarations require substantial future formal structures. | `open-hypothesis` | therapy axioms in `FieldAxioms.lean` |
| `PhysicsField` and `SomaCategory` are proposed interfaces with axiomatic instances. | `open-hypothesis` | `FieldAxioms.lean` |
| The Lean appendix is an index; current Lean source is authoritative. | `interpretive` | appendix versus proof files |
| A generated appendix could expose axioms, sorries, and proof categories directly. | `open-hypothesis` | proof-audit workflow |

# Notation Discipline for This Volume

Because the repository crosses mathematics, physics, computation, and phenomenology, notation must do extra work. This book uses `USF` for the Universal Somatic Field programme, `SFT` for the finite soma-field engine, `Field8` for the Lean eight-component BRECVEMA vector, `W8` for the rational coupling matrix, and `W8ℝ` for the real matrix used with Mathlib's spectral theorem. It uses `ScaleStep` for the inductive scale constructors and `ScaleLevel` for the `Fin 21` index in `UniversalSomaticField.lean`. Keeping these separate prevents a common error: treating a paper's conceptual hierarchy, a Lean finite index, and a physical scale catalogue as one object.

The same discipline applies to equality language. In this volume, identity means definitional or propositional equality in Lean today, explicitly and reproducibly. Isomorphism means an explicit pair of maps with appropriate roundtrip laws, or the weaker named theorem actually present. Retraction means a section-retraction pair such as `SomaticLens.viewReview`. Analogy means an interpretive comparison with no theorem transfer. Co-identification means a proposed theorem-transfer relation under stated assumptions; unless encoded, it remains a methodological claim. `interpretive`

Finally, theorem names are not evidence labels. `consciousness_dichotomy` contains the word consciousness but proves an order dichotomy. `universe_is_11D_organism` contains the word universe but constructs a record. `cosmological_correspondence` contains cosmology but witnesses scale-19 inhabitation. Conversely, a bland name such as `freefield_USF_satisfies_OS_axioms` may be the stronger theorem, because it imports a serious upstream result. Readers should train themselves to distrust names and inspect types.

This notation discipline is not pedantry. It is the condition under which the programme can be discussed by mathematicians without becoming either advertisement or dismissal. A slogan can motivate; a type can be checked; a theorem can be transported; an axiom can be isolated; a simulation can be reproduced; an interpretation can be debated. Confusing these modes is the fastest way to lose the mathematical content.

## Ledger

| Claim | Label | Source |
|---|---|---|
| `ScaleStep` and `ScaleLevel` are different formal objects. | `kernel-verified` | `ScaleUniverse.lean`; `UniversalSomaticField.lean` |
| Equality, isomorphism, retraction, analogy, and co-identification license different imports. | `interpretive` | proof/status discipline |
| Theorem names must be checked against theorem types. | `kernel-verified` | examples across proof files |
| Consistent notation is a mathematical guardrail in cross-domain work. | `interpretive` | this volume's reading protocol |

# Reading Mathematical Co-identification

The paper "Mathematical Co-identification" should be read as a methodological proposal: a discipline for moving between mathematical domains without collapsing into metaphor. For this volume, its most important sentence is not the strongest claim that two objects are the same. It is the weaker and more useful rule: import only those theorems whose assumptions are preserved by the identified structure. That rule is compatible with dependent type theory, category theory, and ordinary model theory.

Read the paper with a proof engineer's pencil. When it lists type signatures, ask which fields of the signature have Lean definitions. When it invokes historical precedents, ask what the transport map preserved. When it discusses Aesop or abductive search, distinguish between a search heuristic and a proof. The paper is most valuable as an epistemic protocol for the rest of the programme: every co-identification should become a table row with source, target, theorem class, assumptions, evidence label, and failure mode. `interpretive`

{{AddPaper ../../paper/soma/mathematical-co-identification/mathematical-co-identification.md}}

{{AddPage}}

# Reading The Soma-Field

The Soma-Field paper is the finite dynamical heart of the programme. It supplies the field vocabulary, Hopfield energy picture, sub-threshold activity, coupling matrix, thresholded conscious percept, and clinical language. A mathematician should not begin by accepting the clinical claims. Begin with the formal objects: an eight-dimensional vector, a symmetric rational matrix, an energy functional, thresholds, stored patterns, and a proposed resolvent.

The Lean surface partly backs that reading. `SomaField.lean` proves matrix symmetry and Hermitian structure, defines spectral poles, and leaves concrete spectral/dynamical claims as `sorry`. `Hopfield.lean` gives the classical ancestor but deliberately does not prove general convergence. Therefore the paper should be read as a model proposal with partial finite formalisation. Its clinical language is an interpretation of the model, not a theorem. `derived-under-assumptions`

{{AddPaper ../../paper/soma/soma-field-paper/soma-field-paper.md}}

{{AddPage}}

# Reading The Universal Somatic Field

The Universal Somatic Field paper is where the programme scales from finite affective dynamics to Green functions, eleven-dimensional bookkeeping, and threshold consciousness. Its mathematical centre is the claim that the same response structure appears across scales and that the soma-field decomposition matches an eleven-dimensional product structure.

Read this paper against `MTheoryIsomorphism.lean` and `UniversalSomaticField.lean`. The product/retraction facts are real. The threshold dichotomy is real but elementary. The scale-inhabitation theorem is real but weak. The SHO theorem currently proves `True`; the distributional identity remains future work. The universe-as-organism definition inhabits a structure by construction; the cosmological interpretation is in the paper's argument, not in the Lean line. `derived-under-assumptions`

{{AddPaper ../../paper/soma/universal-somatic-field/universal-somatic-field.md}}

{{AddPage}}

# Reading The Zoomable Universal Somatic Field

The Zoomable USF paper is the most ambitious statement of scale invariance. Its Lean counterpart is split between `ScaleUniverse.lean`, `UniversalSomaticField.lean`, and related files. For mathematicians, the key object is the dependent scale family: a scale index selects a field-layer type, and the universe record packages substrate, field layer, coupling, and tensor rank. That is formal structure worth studying.

But the paper's broader claims must be disaggregated. The `Fin 21` scale index and `ScaleStep` constructors are formal. The assignment of physical meaning to each scale is a modelling choice. The dark-energy and dark-matter fractions are model-derived comparisons, not independent confirmation. The FM-HN and swarm results have local formal theorems but also axioms and gaps. The paper is best read as a research atlas with typed coordinates. `open-hypothesis`

{{AddPaper ../../paper/soma/zoomable-somatic-field/zoomable-somatic-field.md}}

{{AddPage}}

# Reading Appendix: Formal Lean 4 Verifications

The appendix is listed for the volume because readers need a route into the proof files. This book does not reproduce the appendix inline; the volume builder replaces the AddPaper line with a note. The correct way to use the appendix is as an index, not as a blanket certificate. Check each named theorem against the current source. In particular, do not rely on old prose that says there are no active sorries; the current source contains seven real `sorry`s. Do not treat an axiom or a theorem of `True` as an established mathematical result.

For a type theorist, the appendix's value is practical. It tells you which files carry by-definition DSL facts, which use imported libraries, which are finite matrix problems, which are axiomatic, and which are unfinished. The next mathematical work should happen in those source files, not in stronger prose around them. `kernel-verified`

{{AddPaper ../../paper/soma/lean-proofs-appendix/lean-proofs-appendix.md}}

{{AddPage}}

# How the Mathematics Could Fail

A formal programme is credible only if its failure modes are as explicit as its aspirations. [T]-Theory's mathematical layer can fail in several ordinary ways. The first is definitional failure: a structure may be well typed but too weak to carry the intended theorem. `FieldEquation` currently illustrates this risk because it contains a positive wavenumber and a function `G`, but not the PDE that would make `G` a Green function. The file type-checks; the intended theorem still lacks a formal home. `open-hypothesis`

The second is transport failure. A source theorem may use assumptions the target does not preserve. Hopfield convergence theorems are sensitive to update scheme, symmetry, diagonals, finite spin states, and energy definition. Importing the language of attractors is harmless; importing a convergence theorem requires those hypotheses. Similarly, OS axioms transfer cleanly to the Gaussian free field object, but not automatically to an interacting Hopfield-coupled field. `derived-under-assumptions`

The third is scale failure. A dependent family over `ScaleStep` can enforce that each scale has a selected type, but the selected types may not be connected by meaningful morphisms. A scale theory fails if it merely lists heterogeneous models. It succeeds only when transitions preserve stated invariants or explain how invariants change. This is where future categorical and renormalisation work must bear weight.

The fourth is semantic failure. A theorem may be formally correct and semantically misnamed. If the biological variable called limbic amplitude cannot be measured, or if its threshold has no relation to report or experience, then `consciousness_dichotomy` remains a correct theorem about a predicate but fails as a model of consciousness. Formalisation prevents one class of error; it does not prevent bad interpretation. `open-hypothesis`

The fifth is empirical failure. The simulation results may fail under hardware implementation, different schedules, noise models, or stronger classical baselines. The cosmological fractions may fail under better observations or under a more detailed compactification model. The finite affect matrix may fail to predict measured dynamics. These failures would not invalidate the Lean code; they would invalidate particular interpretations or model choices. That separation is exactly why evidence labels matter. `simulated`

These failure modes give the mathematics its seriousness. A claim that cannot fail is not a theorem, a model, or an experiment; it is a slogan. A typed proof surface makes failure local. If the finite matrix theorem fails, the product decomposition may remain. If the cosmology fails, the final-tagless emotion DSL may remain. If the threshold interpretation fails, the order-theoretic predicate remains available for some other model. The programme should be evaluated as a network of labelled claims, not as an all-or-nothing doctrine.

## Ledger

| Claim | Label | Source |
|---|---|---|
| A weak structure can type-check while failing to express the intended theorem. | `open-hypothesis` | `FieldEquation`; `greens_fn_is_SHO` |
| Theorem transport can fail when target hypotheses differ from source hypotheses. | `derived-under-assumptions` | Hopfield and OS/GFF examples |
| Scale indexing needs coherent morphisms, not only a list of fibres. | `open-hypothesis` | `ScaleUniverse.lean`; `ZoomStep` |
| Correct formal predicates can fail as interpretations of empirical phenomena. | `open-hypothesis` | `consciousness_dichotomy` example |
| Simulation and cosmology claims can fail without invalidating independent Lean facts. | `simulated` | QUANT-EXP-1; cosmology papers |

# Conclusion: What Formal Mathematics Can Honestly Add

Formal mathematics adds three things to [T]-Theory. It adds syntax with boundaries: a scale-indexed object must live in the fibre assigned to its scale; an emotion term must be interpreted by an instance; a record must supply its fields. It adds proof obligations: if the programme says that a propagator has poles, there must be a resolvent, a spectrum, and hypotheses sufficient for the spectral theorem. It adds auditability: a reader can distinguish `rfl`, arithmetic, imported theorems, axioms, `sorry`, and simulations.

It does not add empirical truth by itself. This is the central conclusion of the volume. A Lean theorem about a normalised threshold does not solve the hard problem. A product decomposition does not derive M-theory. An OS theorem about `mu_GFF k` does not construct an interacting clinical field. A finite Hopfield model does not prove therapeutic efficacy. If the programme succeeds, it will succeed because formal definitions, simulations, experiments, and interpretations converge under disciplined labels, not because one proof assistant can certify all of reality. `interpretive`

For mathematicians, the repository is interesting precisely because it is unfinished. Completed formal theories often conceal their design history; this one exposes it. The `FieldAxioms.lean` registry shows which claims the author wants to promote. The sorries show local proof debts. The product maps show where prose claims have been reduced to record rearrangements. The OS file shows how serious theorem import can work. The ScaleUniverse file shows a genuine dependent-family architecture that could be enriched into a categorical scale theory. The SomaField file shows concrete finite spectral work awaiting closure. `open-hypothesis`

The next mathematical programme should be conservative. First, close finite proof debts: make `W8ℝ` computable over rationals where possible, prove the residual bounds, and discharge the contagion activation theorem. Second, strengthen Green-function structures: replace `True` statements with PDE or distributional identities. Third, separate equivalence levels: record product retractions, type equivalences, homeomorphisms, smooth manifolds, compactification data, and physical interpretations as different structures. Fourth, formalise the co-identification ledger itself so that a paper cannot import theorem classes without naming the preserved hypotheses. `open-hypothesis`

A careful mathematical treatment may also soften the philosophical ambition in productive ways. Instead of saying that experience is a type, say that the programme has begun to type some formal representations of affective dynamics. Instead of saying that equivalent somatic structures are identical by univalence, say that some encoded structures have definitional equalities, retractions, or theorem-bearing morphisms. Instead of saying that consciousness is proved to be a phase transition, say that a threshold predicate has been formalised and its interpretation is testable. The weaker claims are more valuable because they can be worked on. `interpretive`

The most promising bridge to type theory is the final-tagless pattern. `EmotionLang` demonstrates how one syntax can be interpreted in multiple semantic domains while preserving polymorphic terms. A larger [T]-Theory kernel could generalise that architecture: a signature for field equations, interpreters into finite matrices, PDEs, stochastic processes, clinical measurement schemas, and visual instruments, with theorems parameterised over the signature rather than tied to one substrate. That would realise, in sober form, the typeverse idea from the co-identification paper. `open-hypothesis`

The most promising bridge to geometry is the lens/retraction pattern. `SomaticLens` and `TherapeuticLens` show how projections and updates can be made explicit. Rather than claiming a global physical identity, the programme can prove local sections, retractions, and invariance properties. This is mathematically congenial: it allows partial theorem import without overclaiming full equivalence. It also fits the field's own interdisciplinary status. The soma-field may be a sector, a model, a projection, or an analogy under different assumptions; the morphism should tell the reader which. `interpretive`

The most promising bridge to analysis is the OS/GFF result. There the programme has a clean formal theorem imported from a serious upstream development. If future files define an interacting field with Hopfield potential and prove perturbative or constructive properties, the mathematical status of the theory will improve dramatically. Until then, the free-field result should be presented as a formal anchor, not as completion of the physical theory. `derived-under-assumptions`

Finally, the most promising bridge to empirical work is the discipline of not calling simulations experiments beyond their scope. QUANT-EXP-1 is a simulated model-class result. It may motivate formal probability models and hardware tests. It does not prove therapy, consciousness, or speed-up. A mathematics volume can help here by specifying the exact theorem that would correspond to the simulation: a state space, dynamics, distributions over trajectories, barrier parameters, and inequalities comparing transition probabilities. Once that statement exists, the path from numerical evidence to proof obligation is clear. `simulated`


One further consequence follows for readers who want to build on the work. Do not start by strengthening the metaphysics. Start by strengthening the declarations. Replace an English phrase with a structure; replace a structure with laws; replace a law with a theorem; replace a theorem's hidden assumptions with explicit parameters. If the programme is right, this procedure will make it stronger. If it is wrong, the procedure will show where. That is the advantage of formal mathematics over persuasive synthesis: it gives both agreement and refusal a precise address. `interpretive`

This is also why the book has kept the `lean-proofs-appendix` out of the prose flow. The appendix is useful when it sends the reader back to source; it becomes misleading when it substitutes for source. A formal mathematics volume should train the habit of checking declarations directly. That habit is not hostile to the author. It is the form of respect appropriate to formal work: take the claim seriously enough to ask for its type, its proof term, its dependencies, and its exact remaining obligations. Only then can later papers cite the result without repeating the surrounding uncertainty. This is how a speculative research programme becomes a shared mathematical workspace rather than a private vocabulary. It also gives critics a fair target: reject the assumption, refute the bridge, close the hole differently, test the model against data, or contribute a sharper formalisation for the next reader and the next proof attempt in Lean today, explicitly and reproducibly.
The book's answer to its title is therefore austere. There is not yet a complete dependent type theory of feeling. There is a set of dependent types, records, finite matrices, imported theorem applications, and labelled assumptions that make such a theory thinkable. The geometry of feeling, if it is ever formalised, will not be produced by prose certainty. It will be produced by many small acts of definition, transport, computation, and proof, each carrying the evidence label it deserves.

# Evidence Ledger

| Claim | Label | Source |
|---|---|---|
| `ScaleStep` is an inductive scale enumeration with twenty-one constructors/positions. | `kernel-verified` | `paper/proofs/ScaleUniverse.lean` |
| `FieldLayerType : ScaleStep -> Type` makes field layers scale-dependent. | `kernel-verified` | `ScaleUniverse.lean` |
| Nineteen scale positions currently use real Physlib/SFT types; two remain `String`. | `kernel-verified` | `field_layer_real_type_count`; `nineteen_scales_have_real_types` |
| `T_TheoryUniverse sigma` packages substrate, field layer, limbic coupling, and tensor rank. | `kernel-verified` | `ScaleUniverse.lean` |
| `scale_shift_preserves_structure` proves only `True` under equality hypotheses. | `kernel-verified` | `ScaleUniverse.lean` |
| `somaField_iso_mtheory` proves a product/record roundtrip for encoded structures. | `kernel-verified` | `MTheoryIsomorphism.lean` |
| Physical M-theory compactification is not established by that product theorem. | `open-hypothesis` | `MTheoryIsomorphism.lean`; `G2Compactification.lean` |
| Physlib oscillator and wave-equation theorems are applied under explicit hypotheses. | `kernel-verified` | `SomaticMode.equationOfMotion`; `somaticMode_waveEquation` |
| `consciousness_dichotomy` is `lt_or_ge` for a real threshold `sqrt 2`. | `kernel-verified` | `UniversalSomaticField.lean` |
| Consciousness as a biological or phenomenal threshold crossing remains uncalibrated. | `open-hypothesis` | `UniversalSomaticField.lean`; threshold-model interpretation |
| `greens_fn_is_SHO` as currently written has proposition `True` and proof `trivial`. | `kernel-verified` | `UniversalSomaticField.lean` |
| `USF_OSAxioms.lean` imports OSforGFF results for `mu_GFF k`. | `kernel-verified` | `freefield_USF_satisfies_OS_axioms` |
| Identifying the physical USF with that Gaussian free field is a modelling assumption. | `derived-under-assumptions` | `USF_OSAxioms.lean` comments |
| `EmotionLang` is a final-tagless algebra with multiple interpreters. | `kernel-verified` | `EmotionOntology.lean` |
| `awe_is_universal` is true by definition for every `EmotionLang` interpreter. | `kernel-verified` | `FieldProofs.lean` |
| `W8ℝ_isHermitian` proves the exact BRECVEMA coupling matrix is Hermitian. | `kernel-verified` | `SomaField.lean` |
| `somaticPropagatorPoles` uses Mathlib eigenvalues of the Hermitian matrix. | `kernel-verified` | `SomaField.lean` |
| `perceptIsPropagatorPole_nostalgia` remains a `sorry`. | `open-hypothesis` | `SomaField.lean` |
| `brainStemActivatesContagion` remains a `sorry`. | `open-hypothesis` | `SomaField.lean` |
| `FieldAxioms.lean` contains twenty explicit axiom declarations. | `derived-under-assumptions` | `paper/FieldAxioms.lean` |
| Seven real sorries remain project-wide in four proof files. | `open-hypothesis` | `BRECVEMAVariational.lean`; `DyadicField.lean`; `SomaField.lean`; `SomaNetwork.lean` |
| `LimbicTunnel` proves quartic-potential and WKB positivity facts. | `kernel-verified` | `LimbicTunnel.lean` |
| `quant_exp_1` is an axiom; QUANT-EXP-1 evidence is simulation output. | `simulated` | `LimbicTunnel.lean`; quantum paper |
| `propagator_beats_classical` proves `N * N < N * K` for `0 < N` and `N < K`. | `kernel-verified` | `SwarmPropagator.lean` |
| `greens_achieves_minimum_energy` is an axiom, not a proved variational theorem. | `derived-under-assumptions` | `SwarmPropagator.lean` |
| Cosmological density fractions are model-derived comparisons under assumptions. | `derived-under-assumptions` | cosmology papers and LocalGR/geometry axioms |
| Co-identification is a protocol for theorem transfer, not automatic validation. | `interpretive` | Mathematical co-identification paper |

# [T]-Theory Cheatsheet

The cheat sheet should be read as a compact glossary, not as a proof certificate. For this mathematics volume, every slogan on the sheet must be routed back to one of four surfaces: a named Lean theorem, an explicit axiom, a simulation/model result, or an open interpretation.

{{AddBooklet ../bld/booklet-formal-mathematics.pdf recto}}







