---
type: ttheory_task
task_id: 0001
title: "Soma Field Operator Hardening and Scale Integration"
assigned_to: "Lead Developer (Alistair)"
ingest_date: 2026-08-20T11:59:00Z
status: "Active"
authority_ref: "GEMINI-SOMA-FIELD-OPERATOR.md"
---

# Task 0001: Soma Field Operator Hardening

Implement the interactive presentation and exploration layer above the [T]-Theory Cheat Sheets using Vite, Three.js, and KaTeX, strictly adhering to the post-doctoral technical application specification.

## 1. Technical Requirements & Deliverables

### 1.1 WebGL Scene Architecture & Scale Families
*   Refactor `main.js` to establish the 20-step Scale Dial ($\sigma \in [0, 19]$) [1112, 1113].
*   Implement smooth visual transitions and distinct camera framings across the 7 visual families [1112, 1114]:
    *   **Family 1 (Sigma 0-3):** Unitary field lattices and compactified manifold wireframes [1114].
    *   **Family 2 (Sigma 4-6):** Local network nodes (synaptic/columnar) with pulsing EMF wave simulations [1114].
    *   **Family 3 (Sigma 7-8):** 11D biological body with gold-glowing brainstem and neural structures [1111, 1114].
    *   **Family 4 (Sigma 9-11):** Relational dual-wire coupling structures and Kuramoto phase-locking visualizers [1114].
    *   **Family 5 (Sigma 12-14):** Institutional attractor basins showing continuous landscape flows [1114].
    *   **Family 6 (Sigma 15-17):** Tectonic fault lines and elastic planetary modes [1114].
    *   **Family 7 (Sigma 18-19):** Cosmological cosmic web filaments displaying dark matter halo geometries [1114].
*   *Constraint:* Ensure there are no blank scenes or generic fallback models at extreme scale coordinates [1119].

### 1.2 Hierarchy Projection System ($\pi_{11\to8\to4}$)
*   Code independent sub-manifold projection controls [1119]:
    *   **4D Active State:** Render static grey mesh with glowing gold brain and nervous system [1111].
    *   **8D Active State:** Append a single, glowing cyan/green volumetric $P_3$ propagator response field and a violet $L_1$ double-well potential [1111, 1115].
    *   **11D Active State:** Instantiation of a hot-pink WebGL Mandelbulb shader mapped locally around the head mesh ($C_3$) [1111, 1115].

### 1.3 Dynamic KaTeX HUD & Badging
*   Render the active scale parameters ($\ell$, $N$, $k$, $T$) and master wave equations using KaTeX [1105, 1112].
*   Integrate the dynamic cross-scale retyping modes (`OFF`, `INTERPRETIVE`, `HUMAN-CLINICAL`) [1117]:
    *   Hide clinical emotion labels at all non-human scales ($\sigma \neq 7, 8, 9$) and substitute general system metrics (stability, memory, coupling, attractor basins) [1117].
*   Apply appropriate color-coded claim badges (`FORMAL`, `SOURCED`, `INTERPRETIVE`) across all scene components [1106]:
    *   Set `FORMAL` for elements verified by Lean 4 (e.g., $M_4$ and $P_3$ structures) [1115].
    *   Set `SOURCED` for literature-backed mechanisms (e.g., BRECVEMA P9 details) [1116].
    *   Set `INTERPRETIVE` for macro-scale mappings [1106, 1114].

### 1.4 BRECVEMA Inspector Integration
*   Build a dedicated inspector panel for the 8 mechanisms on the organism scale ($\sigma = 8$) [1113, 1116].
*   Track the 16-dimensional affect state vector $\mathbf{e}(t) \in [0, 1]^{16}$ split into somatic and cognitive registers [1116].
*   For each selected mechanism, render its specific parameter, mathematical forcing relation, `SOURCED` badge, and draw a highlighted visual pathway showing energy routing into the $L_1$ limbic well [1116].

### 1.5 Cheat Sheet sliding Drawer
*   Develop a sliding panel control triggered by the `CHEAT SHEET` selector [1118].
*   Retrieve and populate content dynamically from local markdown paths (e.g. `Part2/fractal-programme/cheatsheets/*.md`) [1107, 1118].
*   Each drawer view must output: Title, plain-language text, key KaTeX formulas, repository deep link, claim badge, and the one-sentence scale delta [1118].

## 2. Validation & Hardening Tests

*   **Scale Invariance Verification:** Confirm that zooming from $\sigma = 0 \to 19$ executes without runtime crashes, demonstrating smooth transition curves between families [1119].
*   **Decoupled State Integrity:** Verify that changing the projection toggle from 11D $\to$ 4D successfully strips non-spacetime field geometry while keeping the active zoom level constant [1111, 1119].
*   **Compile-Time Quality:** Validate that all custom mathematical formatting is successfully parsed by the KaTeX engine without blank placeholders or syntax errors [1119].
