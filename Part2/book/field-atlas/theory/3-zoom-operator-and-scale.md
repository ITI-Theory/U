# T3 — The zoom operator and scale {#theory-zoom-scale}

## 1. Why a zoom operator is needed

![Figure T3.1 — Thirty-one registered levels arranged by characteristic length; the vertical ladder is data-driven rather than decorative.](figures/theory/T3_1_zoom_ladder.png){width=92%}

A scale atlas needs an operation that changes resolution without pretending the old variables survive unchanged. The zoom operator is that operation. It maps a description at one level to a description at another by choosing what is averaged, what is discarded, what is renamed, and what must be newly measured. P11 calls this a scale-invariant Green-function architecture; the safe mathematical statement is that several levels can be written in source-kernel-boundary notation. [derived-under-assumptions]

The registry currently contains thirty-one levels from quantum foam to cosmic web. Each level file records characteristic length scale, response time, substrate, field variable, equation, and evidence badges. The figure is generated from `registry/levels/*.yaml` and `atlas.yaml`; it is not hand-spaced. This matters because scale gaps are part of the argument. A jump from molecular chemistry to cellular synapses is not the same operation as a jump from a galactic halo to a galaxy cluster.

A zoom step has three parts. First, a coarse variable is selected, such as density, phase, voltage, displacement, or population fraction. Second, a kernel is assigned or fitted at the new resolution. Third, the evidence label is recalculated because a true statement at one scale may become an analogy at another. A Lean theorem about arithmetic in an eight-mode matrix does not become an empirical theorem about bodies. A successful statevector simulation does not become a hardware quantum result. [kernel-verified where named; simulated where run; interpretive for transfer]

## 2. Coarse-graining and effective variables

![Figure T3.2 — Response times span many orders of magnitude; slow variables are not obtained by merely enlarging a fast drawing.](figures/theory/T3_2_response_times.png){width=92%}

Coarse-graining replaces many microscopic variables by fewer effective variables. In statistical mechanics, block spins average nearby degrees of freedom. In fluid mechanics, molecular positions become density, velocity, pressure, and temperature fields. In cosmology, individual galaxies can become a density contrast $\delta(\mathbf x,t)$. The operation is useful because many details become irrelevant to the question being asked. [derived-under-assumptions]

A simple block average over cells of size $\ell$ is

$$
\bar u_\ell(X)=\frac{1}{|B_\ell(X)|}\int_{B_\ell(X)}u(x)\,dx.
$$

The averaged field $\bar u_\ell$ is smoother than $u$. If the original dynamics are nonlinear, averaging usually creates new terms that are not just the old equation with bars placed over symbols. Turbulence closures, material constitutive laws, and neural population models all face this issue. A zoom operator that keeps the same diagram while ignoring new closure terms is not a derivation.

The registry's response-time field prevents one common error. A cell signalling event, a human autonomic shift, a city-scale institutional change, and a cosmic expansion mode all have different clocks. If a proposed cross-level comparison aligns only length scale but not response time, its status weakens. The figure plots the recorded time scales so that the slow axis is visible alongside the spatial ladder. [interpretive]

## 3. What is preserved

![Figure T3.3 — Coarse-graining preserves selected invariants and retypes the rest; the output level has its own observables.](figures/theory/T3_3_coarse_graining.png){width=92%}

A disciplined zoom step preserves only named structure. Typical preserved objects include conservation laws, symmetry classes, dimensionless ratios, topology of a phase portrait, sign of a coupling, or a response kernel after rescaling. Typical retyped objects include microscopic constituents, noise sources, boundary conditions, and observables. In a membrane model, the microscopic ion channels may disappear into a conductance parameter. In cosmology, particle interactions disappear into effective fluids and perturbation variables.

Renormalisation expresses this idea in one formal setting. Couplings $g_i$ change with scale according to beta functions,

$$
\frac{dg_i}{d\log\mu}=\beta_i(g_1,g_2,\ldots),
$$

where $\mu$ is the energy or inverse-length scale. Fixed points and relevant directions determine which parameters matter at long distances. The Field Atlas does not claim that every registry transition is a renormalisation-group flow. It borrows the caution: scale change is an operation on descriptions, not a magnifying glass applied to unchanged ontology. [interpretive]

## 4. Paths and edge operations

![Figure T3.4 — Registry path edges specify operations between levels: aggregation, projection, boundary change, or substrate change.](figures/theory/T3_4_path_edges.png){width=92%}

The registry contains path-edge files such as `molecular--cellular-synaptic.md` and `galactic-halo--galaxy-cluster.md`. Each edge names a transition operation and a kernel badge. The edge is not an empirical fact by itself; it is an instruction for how one level entry is to be read after another. A path through several edges therefore records a sequence of modelling commitments.

Four edge types recur. Aggregation combines many units into a population field. Projection maps a high-dimensional state onto a lower-dimensional observable. Boundary replacement changes the domain enclosing the field. Substrate change moves from one physical carrier to another, as when biochemical kinetics become membrane excitability. These are different mathematical acts. Grouping them all under a vague word such as emergence would hide the work.

A short example makes the distinction concrete. The move from `cellular-synaptic` to `local-circuit` aggregates many cellular variables into circuit-level activity and introduces network coupling. The move from `galactic-disc` to `galactic-halo` changes the dominant gravitational source and boundary assumptions. Both can be drawn as upward arrows, but the preserved quantities differ. Any claim that a pattern is the same across those arrows is `interpretive` unless the edge file supplies equations and tests. [interpretive]

## 5. Zooming without category errors

![Figure T3.5 — Preserved, retyped, and discarded data are separated so that analogy does not masquerade as identity.](figures/theory/T3_5_preserve_retype.png){width=92%}

Category errors appear when a property of one description is asserted in another without a map. A microscopic particle has a position; a fluid parcel has a velocity field; a city has traffic density and institutional response. The word field can apply to all three, but the value spaces and measurement procedures are not interchangeable. This is why the evidence label is attached to the claim, not merely to the chapter.

The zoom operator can be summarised as

$$
Z_{a\to b}: (D_a,V_a,L_a,B_a,J_a,O_a)\longrightarrow(D_b,V_b,L_b,B_b,J_b,O_b),
$$

where $D$ is domain, $V$ value space, $L$ operator, $B$ boundary, $J$ source, and $O$ observable. A strong formal transfer requires a defined map for each component that matters. A weak analogy may carry only the diagrammatic role of source, kernel, and response. Both uses are allowed when labelled, but they should never be confused.

The practical payoff is falsifiability. A zoom claim can fail because an observable is missing, because the response time is wrong, because the proposed kernel has the wrong range, or because the receiving level has a boundary condition that destroys the pattern. P11's programme survives only by stating these possible failures. [open-hypothesis]

## 6. Dimensionless quantities and similarity

Scale comparisons become stronger when they use dimensionless numbers. The Reynolds number $Re=\rho vL/\eta$ compares inertial and viscous terms in fluid motion. The Peclet number compares advection and diffusion. A Strouhal number compares oscillation time with transit time. These numbers work because units have cancelled; two systems with the same dimensionless controls can share behaviour even if their metres, seconds, and kilograms differ. [derived-under-assumptions]

The same strategy can be used for response models. A damped oscillator is controlled by ratios such as $\omega/\omega_0$ and $Q$, not by raw frequency alone. A screened kernel is controlled by $r/\lambda$, where $\lambda$ is a response length. A diffusion problem is controlled by $x/\sqrt{Dt}$. The zoom operator should therefore prefer dimensionless comparisons over direct visual resemblance. If no dimensionless control has been specified, the comparison remains suggestive rather than structural.

A registry level can be audited by asking which dimensionless quantities survive the transition edge. Molecular reaction rates may preserve a Damkohler number when moved into a cell-scale reaction-diffusion model. Neural rhythms may preserve a phase-coupling ratio when projected to a circuit. Galactic dynamics may preserve virial ratios when individual stars become a mass density. These are not the same invariants, and a valid path can change which invariants matter.

## 7. What the registry adds to ordinary scale diagrams

A conventional scale diagram orders objects by size. The registry adds response time, substrate, field variable, equation, path membership, and evidence labels. That extra information prevents a misleading inference: proximity on a length ladder does not imply proximity of dynamics. A molecular system and a cell are close compared with a galaxy, yet their model variables and clocks can differ sharply.

The path files supply direction. A level may appear on multiple paths, and the incoming edge determines what has just been preserved or retyped. For example, `human-group` sits between dyadic and social levels on one path, while animal collectives follow another route through swarm and flock entries. The same node can therefore receive different modelling pressure depending on the path. This is a graph, not a single chain. [interpretive]

The practical verification rule is to inspect the edge before accepting a level-to-level statement. If an edge names aggregation, the review asks what is averaged. If it names projection, the review asks what information is lost. If it names boundary change, the review asks which modes enter or leave the spectrum. If it names substrate change, the review asks which physical carrier has been replaced. A scale claim that cannot answer those questions has not yet earned a strong label. [open-hypothesis]

## 8. Sampling, aliasing, and resolution limits

Zooming downward is limited by sampling. A spatial grid with spacing $\Delta x$ cannot resolve wavelengths shorter than $2\Delta x$ without aliasing. A time series sampled every $\Delta t$ cannot resolve frequencies above the Nyquist frequency $1/(2\Delta t)$. If a level transition relies on modes beyond those limits, the receiving description can invent patterns that are numerical artefacts. [derived-under-assumptions]

Coarse data can also erase causal order. A process with millisecond events may look instantaneous in a seconds-scale record. A city-scale dataset aggregated by month may hide daily rhythms. A cosmological map projected onto a sky sphere loses radial information unless redshift is included. The zoom operator therefore needs an observation model as well as a theoretical map. It should state not only what the level is, but what resolution the evidence has.

This point applies directly to figures. Smooth curves in a diagram may represent analytic functions, numerical interpolation, or artistic schematics. Only the caption and surrounding equation decide which. A contact sheet can verify that a figure appears in print; it cannot verify that the figure is a measurement. The evidence label must come from the underlying source, not from the polish of the graphic. [interpretive]
