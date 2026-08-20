# Gemini Brief: Soma Field Operator v2

## Assignment

Turn the current Three.js `Soma Field Operator` from a single 11D organism visual into the interactive presentation layer above the [T]-Theory Cheat Sheets.

This app is **not a simulation or model of the universe**. It is a visual interface to the research programme: it must make the theory's hierarchy, equations, sources, claims, and open hypotheses inspectable.

Read `operator-theory.yaml` before proposing code. It is the new UI/theory contract. Do not modify `Dist/PAPERS.yaml`: that is the publication-release registry, not an application data model.

## Current State and Defect

The present app has a visually successful 4D / 8D / 11D organism hierarchy, but the 20-position zoom control does not genuinely zoom. It changes text, then hides the organism from scale 12 upward and substitutes a generic rock/worldline. This makes it a label switch rather than a scale operator.

The existing organism scene should become the `sigma: 8` mode:

- 4D: static grey physical body, gold brain and nervous system; no propagator, limbic, or cortex/mind field.
- 8D: physical body plus one green `P3` propagator volume and one violet `L1` double-well/trauma barrier. No cortex/fractal field.
- 11D: physical body, propagator, limbic well, and pink head-local `C3` matrix/fractal geometry.

Hierarchy projection and zoom are different operations. Do not couple them accidentally.

$$\pi_{11\to8\to4}: \mathcal{M}_{11}\to\mathcal{M}_8\to\mathcal{M}_4$$

is a complexity projection, while

$$\Lambda_\sigma:\operatorname{Substrate}(\sigma)\to\operatorname{Substrate}(\sigma+1)$$

is the scale morphism.

## Deliverable

Produce a technically specific implementation proposal first, then implement only after approval. Keep the existing visual style: black space, cyan/pink/violet/green field language, Space Mono/Syne UI, KaTeX equation ledger, and no decorative card clutter.

### 1. Make All 20 Zoom Levels Real

Drive the dial from `operator-theory.yaml` rather than a hard-coded JavaScript list. Each `sigma` must have a distinct:

- substrate
- visual composition / geometry
- camera framing
- time behavior
- selected field observable
- equation ledger
- source and claim-status badge

Use a continuous morphing transition between adjacent scales. The selection must never become a blank scene or a generic rock merely because it passes a threshold.

Suggested scenes:

| Range | Scene intent |
| --- | --- |
| 0-3 | field lattice, compactification, nuclear/atomic response |
| 4-6 | molecular/cellular/circuit networks and local propagation |
| 7-8 | brain and organism, using the existing 4D/8D/11D architecture |
| 9-11 | dyadic coupling, swarm, and network coherence |
| 12-14 | regional/civilisational/species field flows and attractor landscapes |
| 15-17 | tectonic memory, planetary modes, stellar oscillation |
| 18-19 | galactic field and cosmic web / cosmological ledger |

These are presentation-level geometric metaphors, not claims of literal visual identity. The UI must say when a mapping is interpretive.

### 2. Create a Cheat Sheet Drawer

At every scale and layer, users need a `CHEAT SHEET` control that opens a side panel containing:

- source Cheat Sheet title
- relevant short explanation
- key equation(s), rendered in KaTeX
- source path / deep link
- claim badge: `FORMAL`, `SOURCED`, or `INTERPRETIVE`
- a short `What changes at this scale` sentence

This makes the app the navigational layer and the Cheat Sheets the explanatory layer.

### 3. Add Affect Dynamics as an Explicit Mode

The user wants BRECVEMA-like emotion/regulation dynamics to be available across scale, but the semantics must remain disciplined.

Add a segmented mode control:

- `OFF`: formal field and scale data only
- `INTERPRETIVE`: visualise retyped variables that are meaningful at the selected substrate: stability, forcing, memory, coupling, attractor basin, and transition rate
- `HUMAN-CLINICAL`: enable BRECVEMA mechanism labels and clinical vocabulary only on scales declared safe for that language in the YAML contract

Do **not** state that a city, planet, or universe literally has human emotions. At non-human scales, use `regulation`, `memory`, `coupling`, `stability`, and `attractor dynamics`; show an `INTERPRETIVE` badge.

`GREGMA` was mentioned verbally but has no confirmed canonical spelling or source in the repository. Treat it as a pending term in the UI contract rather than defining it. Ask for its source/meaning before naming a formal operator after it.

### 4. Replace the BRECVEMA Toggle with an Inspector

The current BRECVEMA overlay is opaque: it shows eight abbreviated nodes without explaining their names, their action, or their relation to the limbic attractor field. Replace it with an expandable inspector that keeps the scene uncluttered until the user opts in.

The inspector must have eight named selectable mechanisms. Selecting one highlights only its route into $L_1$ and displays a concise field card with the full name, a plain-language description, the affected parameter, and a rendered equation or field action.

| ID | Mechanism | Field parameter | Field action |
| --- | --- | --- | --- |
| B | Brainstem reflex | $J(t)$ | transient source injection |
| R | Rhythmic entrainment | $\gamma$ | damping and phase-locking modulation |
| E1 | Evaluative conditioning | $\mathbf{b}$ | learned bias-vector shift |
| C | Emotional contagion | $\kappa$ | external-field coupling |
| V | Visual imagery | $J_{\mathrm{internal}}(t)$ | endogenous source trajectory |
| E2 | Episodic memory | $K(\tau)$ | memory-kernel reweighting |
| M | Musical expectancy | $\Delta V$ | temporary wells and barriers |
| A | Aesthetic judgement | $\mathbf{b}$ | cognitive appraisal/bias shift |

All eight mechanisms are sourced from P9 / `music-affect-dynamics`; the inspector must show a `SOURCED` badge. The broader affect overlay remains `INTERPRETIVE` outside the human/clinical scales.

### 5. Make Theory Status Legible

The app must distinguish:

- `FORMAL`: source/proof-backed structural result
- `SOURCED`: described in a named Cheat Sheet/paper
- `INTERPRETIVE`: cross-scale display hypothesis

Do not use `verified` casually for visual mappings.

## Constraints

- Preserve existing app files and use incremental changes.
- Keep the 4D/8D/11D organism interaction working at `sigma: 8`.
- Retain the rendered KaTeX mathematics ledger.
- Do not alter publication records or `Dist/PAPERS.yaml`.
- Avoid medical diagnostic claims; this is non-medical educational/research visualisation.
- Do not call remote APIs for theory content. Contract data and source links are local.
- Add focused validation: screen checks for sigma 0, 8, 12, and 19; check hierarchy at sigma 8; validate controls and source badges.

## Question to Resolve Before Final Code

Should `GREGMA` be a renamed/extended affect-operator framework, a hierarchy of emotional dimensions, or a separate named theory? Its source, spelling, dimensions, and formal status must be supplied before it can enter the canonical contract.
