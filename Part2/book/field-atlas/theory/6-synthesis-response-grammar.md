# T6 — Synthesis: one response grammar {#theory-synthesis-response-grammar}

## 1. Source, kernel, boundary, projection

![Figure T6.1 — Response grammar: source J, operator L, kernel G, boundary B, projection O, and observed data y.](figures/theory/T6_1_response_grammar.png){width=92%}

The theory chapters reduce to one grammar. A source $J$ disturbs a system. An operator $L$ and boundary condition $B$ define a kernel $G_B$. The response is integrated or summed against that kernel. A projection $O$ turns the internal state into what an observer can record:

$$
y=O\left[\int G_B(x,x')J(x')\,dx'\right]+\epsilon.
$$

The noise term $\epsilon$ covers measurement error, unresolved variables, and model mismatch. When $L$ is linear, the equation is exact. When $L$ is nonlinear, the equation may describe a linearisation around a state. When no operator is supplied, the diagram is only a hypothesis. [derived-under-assumptions]

This grammar is deliberately modest. It does not say that all levels are one physical field. It says that many systems can be analysed by asking the same questions: what is the source, what carries response, what boundary shapes the modes, what gets measured, and what evidence label attaches to the answer. The synthesis is formal identity of slots, not automatic identity of substance. [interpretive]

## 2. Cross-level table

![Figure T6.2 — Cross-level examples of the response grammar; each row changes the substrate and measurement map.](figures/theory/T6_2_cross_level_table.png){width=92%}

| Level | Source | Kernel or operator | Boundary | Projection | Label |
|---|---|---|---|---|---|
| String | pluck force | wave operator | fixed endpoints | displacement or sound | `derived-under-assumptions` |
| Membrane | local impulse | Laplacian modes | clamped edge | nodal pattern | `derived-under-assumptions` |
| Neural field | input current | conductance/network response | tissue and coupling limits | voltage, rate, spectrum | `open-hypothesis` when biological claims exceed model |
| Flock | local alignment cue | dense update or active-matter kernel | sensing radius and environment | velocity field | `kernel-verified` for named arithmetic, otherwise modelled |
| Cosmology | density perturbation | Einstein-Boltzmann response | background metric | CMB/lensing spectra | `derived-under-assumptions` plus observations |
| Dark-sector programme | sector count | LocalGR-gated Friedmann comparison | cosmological model assumptions | Planck comparison | `derived-under-assumptions` |

The table is intentionally heterogeneous. It preserves the grammar while changing almost every physical object. The row label is not inherited from the row above. A formal theorem in the flock row proves a statement about a defined algorithm or inequality. A cosmological fit uses observational data and a background model. A somatic claim needs physiological observables before it can leave hypothesis status. This row-by-row discipline is the main safeguard against inflated synthesis.

## 3. Identity, derivation, simulation, analogy

![Figure T6.3 — Strength of relation decreases from formal equality and derivation through simulation to analogy; labels prevent sliding.](figures/theory/T6_3_identity_vs_analogy.png){width=92%}

Four relation types should not be blended. Formal identity means two descriptions are connected by a defined isomorphism, equality, or equivalence. Derivation means a result follows from assumptions. Simulation means code or numerical evolution produced an output. Analogy means a structure helps organise thought without carrying proof. Each relation can be useful; none should borrow authority from another.

The retired language around waves, M-theory, and somatic dynamics often moved too quickly from analogy to identity. The corrected form is stricter. A wave equation may be identical across two ideal systems. A Green-function notation may be derived for a model. A quantum reachability result may be simulated. A proposed somatic interpretation may remain open until measured. The sentence should carry the label where the claim is made, not in a distant legend.

Difference classes A-E from `docs/agent/DIFFERENCES.md` sharpen the same point. Class A claims introduce new numbers, such as $7/11$ or $3/11$. Class B claims introduce new behaviour. Class C claims offer cross-scale unification. Class D claims reinterpret phenomena. Class E claims preserve the standard limit. Strong review asks first which class is being asserted and then whether the evidence label is strong enough for that class.

## 4. What survives contact with standard physics

![Figure T6.4 — Map of the six theory chapters: waves, kernels, zooming, dimensions, dark sectors, and synthesis.](figures/theory/T6_4_synthesis_map.png){width=92%}

Several parts are simply standard mathematics and physics. Wave equations, boundary-value spectra, Green functions, Kaluza-Klein towers, holonomy definitions, and the Friedmann equation are ordinary baseline material. Those sections teach the tools. They do not depend on the programme being correct.

Several parts are formal programme constructions. The zoom operator, the eleven-part sector budget, the dark-sector fractions, and the $W_8$ decomposition are meaningful inside their definitions. They deserve `derived-under-assumptions` or `kernel-verified where named` only as far as the files and assumptions go. Their physical status depends on external calibration.

Several parts remain open research proposals. The biological interpretation of the eight-to-seven fold, the claim that a common response grammar will predict across levels, and any somatic or cultural field interpretation require data. The strongest version of the programme would fail if its kernels do not improve prediction over domain-specific baselines, if its numbers drift under precision tests, or if its variables cannot be operationalised. [open-hypothesis]

The durable synthesis is therefore narrower and stronger than a universal slogan: source, kernel, boundary, and projection form a disciplined way to compare systems. Where two systems share a real operator, the comparison can be mathematical. Where a programme supplies only a suggestive diagram, the comparison stays interpretive. This is enough structure to support the level entries without padding them with claims they cannot bear.

## 5. Worked classification of claims

A sentence such as "the fixed string has modes $n\pi/L$" is a derived result of a specified boundary-value problem. A sentence such as "the Lean theorem `omega_dm_fraction` proves $\Omega_{DM}=3/11$ inside the declared model" is kernel-level evidence about that formal file if the theorem compiles. A sentence such as "an exact statevector run reached the Awe basin in the tested cases" is simulated evidence tied to the code, seeds, and model. A sentence such as "a somatic transition behaves like tunnelling" is interpretive or open until observables and alternatives are fixed.

This classification is not bureaucracy. It changes how errors are found. A derivation is checked by assumptions and algebra. A theorem is checked by kernel build and statement audit. A simulation is checked by reproducibility, controls, and parameter sensitivity. An empirical claim is checked by instruments, protocols, statistics, and independent replication. An interpretation is checked by clarity, usefulness, and refusal to steal stronger labels.

## 6. Minimal acceptance tests for a level claim

A level claim should satisfy six questions. What is the state variable? What operator or update rule acts on it? What boundary or environment closes the model? What source drives the response? What observable is compared with data or with another model? What result would make the claim weaker? Answers need not be complete at the start of a programme, but missing answers determine the label.

The grammar can therefore support both conservative and ambitious work. Conservative rows keep standard physics unchanged and use the diagrams for teaching. Ambitious rows propose new numbers or behaviours, such as the dark-sector fractions or an eight-mode coupling structure. The ambitious rows are allowed precisely because their assumptions are visible. If those assumptions fail, the row can be revised without damaging the baseline material around it. [open-hypothesis]

The synthesis is strongest when it remains local. A source-kernel-boundary analysis can be correct for one level even if a distant analogy fails. A compactification sketch can teach Kaluza-Klein towers even if a proposed biological reading changes. A dark-sector fraction can be arithmetically well-defined even if cosmological data later reject it. This modularity makes the theory part usable: it separates tools, formal programme claims, and open empirical bets.

## 7. How the figures should be read

The figures in the theory part are original schematics generated from code. Some plot exact formulae, such as oscillator response, dispersion curves, Yukawa screening, and Kaluza-Klein towers. Some visualise registry data, such as the length and response-time ladders. Others are diagrams of relationships, such as the duality web and response grammar. The caption and nearby equation determine which kind of figure is present.

This distinction prevents a common visual fallacy. A neat graph of a proposed relation can make an interpretive claim feel as firm as a plotted equation. Conversely, a schematic can be valuable even when it is not data, because it names the slots that a future derivation or experiment must fill. The safe rule is that a figure inherits the evidence status of the claim it depicts. It does not upgrade the claim by being printable. [interpretive]

## 8. Final compact statement

The most compact mathematical statement of the programme's safe core is not "everything is the same wave." It is: many systems can be tested for a source-kernel-boundary-projection description, and transfer between systems is legitimate only to the extent that the maps between those slots are defined. Standard physics supplies examples where the maps are exact. The programme supplies proposed extensions whose labels range from kernel-verified arithmetic to open hypotheses.

The strongest scientific path is therefore cumulative. Keep ordinary field theory ordinary. Use Green functions where an operator really has an inverse. Treat scale changes as retyping operations. Separate physical compactification from dimensional bookkeeping. Compare dark-sector fractions honestly against precision cosmology. Then ask, level by level, whether the response grammar predicts something that a domain baseline does not. [open-hypothesis]

## 9. Review protocol for future additions

A future addition should be checked in a fixed order. First, classify the claim as baseline teaching, formal programme construction, simulation, empirical result, interpretation, or open hypothesis. Second, identify the variables and units. Third, inspect the operator and boundary assumptions. Fourth, name the observable and comparison baseline. Fifth, state the falsifier or at least the condition that would force relabelling.

This order keeps prose from drifting. If the variables cannot be named, the claim is not ready for equations. If the operator is absent, a Green function should not be asserted. If the observable is absent, an empirical label is unavailable. If the falsifier is absent, the claim may still be a useful interpretation but not a discriminating scientific proposal. The checklist is intentionally stricter for new-number claims than for teaching analogies.

The same protocol applies to figures and tables. A redrawn duality web must show the edges it claims. A dark-sector chart must include the observed comparator and discrepancy. A compactification sketch must say whether it is physical geometry, programme bookkeeping, or a matrix fold. A scale ladder must read from registry data rather than hand placement. These are production rules, but their purpose is mathematical honesty. [interpretive]
