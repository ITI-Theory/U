# Introduction: When Feeling Has a Type

Homotopy Type Theory (HoTT) introduced a striking philosophical claim alongside its technical machinery: that mathematical *equality* is not a flat, binary relation but a space — that two things can be equal in multiple ways, and that the topology of those equalities is mathematically significant. The univalence axiom, in Voevodsky's formulation, says that equivalent structures are *identical* — not merely isomorphic, but literally the same object from the perspective of the type theory. This is not just a technical convenience; it is a philosophical claim about the nature of mathematical objects.

The Universal Somatic Field framework makes an analogous claim about felt experience: that experience is not a flat, undifferentiated phenomenon but a *typed* object — that there is a type of awe, a type of grief, a type of contentment, and that the relationships between these types have a topology that can be expressed in dependent type theory and verified by a proof assistant. This book develops that claim and its mathematical consequences.

## The ScaleUniverse Type

The most distinctive mathematical object in the USF framework is the `ScaleUniverse` type — a dependent type parameterised by a discrete scale index ranging from 0 (quantum, sub-cellular) to 19 (cosmological, civilisational). At each scale, the somatic field has a different instantiation: the field at scale 3 is the single-neuron electromagnetic field; at scale 7, it is the whole-brain somatic field; at scale 12, it is the inter-personal relational field; at scale 17, it is the civilisational attractor structure.

The `ScaleUniverse` type is not a metaphor for scale-invariance. It is a precise Lean 4 inductive type, and the claim that the same field equation governs all 20 scales is expressed as a Lean 4 theorem: a function from any scale index to a proof that the canonical somatic field equation holds at that scale, with appropriate dimension-adjusted coupling constants. The proof is machine-checked. The scale-invariance is not an empirical observation about pattern similarity; it is a mathematical identity.

This places the USF framework in a tradition that algebraic topology and HoTT have made precise: that the deep structure of a phenomenon is captured by the *map* between its manifestations at different scales, not by any single manifestation. The `ScaleUniverse` type is the USF's answer to the ∞-groupoid: the object that tracks not just what exists at each scale but how the scales are related.

## The Consciousness Threshold Theorem

One of the formal results in this volume is what we call the **consciousness threshold theorem**: a sharp dichotomy, proved in Lean 4, stating that for any somatic field configuration $\Phi$, either the field amplitude exceeds a critical threshold $T_c$ (in which case the system supports a stable phenomenal attractor, and there is something it is like to be that system) or it does not (in which case there is not). The dichotomy is sharp: there is no continuum of partial consciousness, no gradation between experience and non-experience. The threshold is the phase transition.

The proof proceeds by showing that the attractor stability condition is equivalent to a strict inequality on the spectral gap of the somatic field operator. Below the threshold, the spectral gap closes, and the field dynamics become diffusive rather than attractive — there are no stable experiential states. Above the threshold, the gap is open, attractors are stable, and the phenomenological interpretation is that the field is doing something that merits the name *experience*.

For the type theorist, the consciousness threshold theorem is an application of a dichotomy type — a `Sum` type in Lean 4 — to a physically measurable quantity. The proof that consciousness is a phase transition is simultaneously a proof that the relevant type is inhabited.

## Dependent Types as Proof Architecture

The USF framework's use of dependent types goes beyond verification of specific theorems. The architecture of the Lean 4 proofs is designed so that the type signatures carry the physical content: a proof that the somatic propagator reduces to the EM propagator is a term of a specific dependent type, and the type signature *is* the mathematical claim. This means that the type system enforces the physical constraints automatically: it is impossible to state a physically incoherent claim as a Lean 4 theorem, because the type checker will reject it before the proof attempt begins.

This is the formal mathematics ideal applied to physics: not just rigour after the fact, but rigour built into the structure of the formalism. The papers in this volume develop the type architecture in detail, showing how the physical constraints of the somatic field — energy positivity, covariance, the compactification boundary conditions — become type constraints in the Lean 4 development.

## The Algebraic Topology of Emotion

One further strand of mathematical development in this volume concerns the topological invariants of the somatic field's attractor landscape. The attractor basins form a simplicial complex: basins that share a saddle point are joined by an edge; clusters of basins form higher-dimensional faces. The homology groups of this complex are topological invariants of the emotional landscape — they do not change under continuous deformations of the landscape, only under topological changes such as basin mergers (two emotions becoming indistinguishable) or bifurcations (one emotion splitting into two).

The persistent homology of the somatic attractor complex is therefore a mathematical invariant of a person's emotional landscape — one that changes only through significant life events, therapeutic interventions, or pathological processes. This connects the USF framework to the active field of topological data analysis, where persistent homology is already used to analyse high-dimensional datasets.

## What This Book Offers the Mathematician

The papers assembled here are written for the reader comfortable with dependent type theory, algebraic topology, and formal verification. No physics or neuroscience background is assumed beyond what is introduced. The intended reader might be a type theorist curious about physical applications of HoTT, or an algebraic topologist interested in persistent homology applied to field theories, or a logician interested in the formal structure of phenomenological claims.

Chapter 2 presents the mathematical co-identification paper: the core identification of the somatic field with a family of well-known mathematical objects, with Lean 4 proofs. Chapter 3 develops the field equation and its properties from the perspective of nonlinear functional analysis. Chapters 4 and 5 (the universal and zoomable somatic field papers) develop the scale-invariance structure and the `ScaleUniverse` type in full. The final chapter draws out the mathematical research questions the framework opens: the spectral theory of the somatic operator, the persistent homology of the attractor complex, and the homotopy-theoretic interpretation of emotional transitions.

The type checks. The proof is constructive. Read on.
