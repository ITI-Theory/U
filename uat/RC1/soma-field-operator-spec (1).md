# Soma Field Operator Application Specification
**Document ID:** SFO-SPEC-2026  
**Status:** Approved for Implementation (RC1)  
**Target Architecture:** Vite + Three.js + KaTeX  
**Authority:** GEMINI-SOMA-FIELD-OPERATOR.md [1107]

---

## 1. System Overview and Core Philosophy

The **Soma Field Operator** is the interactive presentation and exploration interface for the [T]-Theory research programme [1104]. It serves as a visual gateway, translating the mathematical and structural concepts of Soma Field Theory (SFT) into an inspectable, type-safe digital environment [1104]. 

### 1.1 Non-Medical & Educational Boundary
The application is strictly a **non-medical, educational, and research-focused visualization tool** [1105]. Under no circumstances shall the interface display medical diagnostic claims or clinically prescriptive outcomes [1105].

### 1.2 Visual Language and Aesthetics
*   **Color Palette:** Set against a dark, cosmic black space background, representing the unexcited vacuum state [1105]. The active field layers must be represented using the following specialized color schema:
    *   **Spacetime/Substrate ($M_4$):** Grey wireframe or scale-specific material [1105, 1115].
    *   **Propagator ($P_3$):** Cyan/Green response volume [1105, 1115].
    *   **Limbic Axis ($L_1$):** Violet double-well potential [1105, 1111, 1115].
    *   **Cortex/Mind Geometry ($C_3$):** Hot-pink/Gold local fractal structure [1105, 1111, 1115].
*   **Typography:** The UI must exclusively utilize **Space Mono** for numerical values and technical readouts, and **Syne** for headings and title typography [1105].
*   **Mathematical Ledger:** All equations, eigenvalues, and parameters must be dynamically rendered at runtime using **KaTeX** [1104, 1105].

### 1.3 Strict Claim-Level Badging
To maintain scientific integrity and prevent the misrepresentation of hypothetical visual mappings, every interactive scene, ledger readout, or inspector pane must display one of the following claim-level badges [1106]:
*   **`FORMAL`**: Indicates a machine-checked, source/proof-backed structural result (e.g., Lean 4 verified proofs) [1106].
*   **`SOURCED`**: Indicates a result or mechanism described in a named, peer-reviewed paper or canonical Cheat Sheet (e.g., BRECVEMA equations from Paper P9) [1106, 1116].
*   **`INTERPRETIVE`**: Indicates a visual hypothesis or cross-scale projection [1106]. **Never** use "verified" or "proven" labels for interpretive mappings [1106].

---

## 2. Dynamic Hierarchy Projection ($\pi_{11 \to 8 \to 4}$)

The application must support the **Hierarchy Projection control**, which operates independently of the scale zoom [1110, 1119]. This control projects the full 11-dimensional manifold $\mathcal{M}_{11}$ down to its lower-dimensional sub-manifolds [1110]:

$$\pi_{11 \to 8 \to 4}: \mathcal{M}_{11} \to \mathcal{M}_8 \to \mathcal{M}_4$$

The visual rules and structures for these three states at the human scale are defined below:

| Projection Level | Dimensions | Mathematical Manifold | Active Visual Elements | Claim Badge |
| :--- | :--- | :--- | :--- | :--- |
| **4D Spacetime** | $D_{1-4}$ | $M_4$ | A static grey body wireframe with gold highlighted physical brain and nervous system [1111]. The propagator, limbic well, and cortex/mind field are hidden [1111]. | `FORMAL` [1115] |
| **8D Somatic** | $D_{1-8}$ | $M_4 \times P_3 \times L_1$ | The 4D body wireframe plus one active cyan/green $P_3$ propagator response volume (not duplicate rings) and one violet $L_1$ double-well potential [1111, 1115]. | `FORMAL` at organism scale [1115] |
| **11D Cognitive** | $D_{1-11}$ | $M_4 \times P_3 \times L_1 \times C_3$ | The 8D scene plus a head-local, hot-pink/gold $C_3$ matrix/fractal geometry (WebGL Mandelbulb) representing the cortex [1111, 1115]. | `FORMAL` at organism scale [1115] |

---

## 3. The 20-Scale Zoom Operator ($\Lambda_\sigma$)

The **Zoom Operator** implements the scale-invariant morphism mapping the configuration of a substrate at scale $\sigma$ to adjacent scales [1112]:

$$\Lambda_\sigma: \operatorname{Substrate}(\sigma) \to \operatorname{Substrate}(\sigma + 1)$$

The interface must visually represent the field as a fiber bundle over the 20-scale base using the HoTT $\Sigma$-type notation [204, 205, 330]:

$$\text{SomaField} \equiv \sum_{\sigma : \text{Scale20}} \text{Substrate}(\sigma)$$

### 3.1 Retyping Constraint (Substrate Independence)
The app must never imply that human-scale biological variables retain literal units or meaning at non-human scales [1112]. Retype variables dynamically [1112]:
*   **Human/Clinical Scales ($\sigma = 7, 8, 9$):** Use human-clinical affect labels (e.g., BRECVEMA modes, trauma well depths) [1113, 1117].
*   **Non-Human Scales ($\sigma \neq 7, 8, 9$):** Substitute clinical terms with general system terms: **stability**, **forcing**, **memory**, **coupling**, **attractor basins**, and **transition rates** [1117]. Display the `INTERPRETIVE` badge prominently [1117].

### 3.2 Transition Scenes & Visual Families
Rather than using a generic rock or blank fallback for high scales, the app must transition through distinct, rich visual families [1105, 1114, 1119]:

1.  **Micro-Physical Sector ($\sigma = 0$ to $3$):** Quantum field lattices, compactification geometries, nuclear shells, and atomic orbital fields [1113, 1114].
2.  **Network Sector ($\sigma = 4$ to $6$):** Molecular folding landscapes, cellular networks, synaptic propagation, and cortical column local EMFs [1113, 1114].
3.  **Organismal Sector ($\sigma = 7$ to $8$):** The 11D biological body, global somatic CEMI field, and clinical trauma-well landscapes [1113, 1114].
4.  **Collective Social Sector ($\sigma = 9$ to $11$):** Two-person dyadic co-regulation, swarm dynamics (spectral gaps), and community trust networks [1113, 1114].
5.  **High-Scale Systemic Sector ($\sigma = 12$ to $14$):** Regional memory flows, civilisational attractor landscapes, and evolutionary memory graphs [1113, 1114].
6.  **Planetary & Geological Sector ($\sigma = 15$ to $17$):** Tectonic fault memory, planetary modes, and stellar helioseismic oscillations [1113, 1114].
7.  **Macro-Cosmological Sector ($\sigma = 18$ to $19$):** Galactic lensing kernels and the cosmic web, displaying the cosmological constant ledger ($\Lambda_{USF}$) [1113, 1114].

---

## 4. BRECVEMA Inspector & Affect Dynamics

The **BRECVEMA Inspector** serves as the primary clinical/musical interface at the organism scale ($\sigma = 8$) [1113]. It models musical mechanisms as forcing functions acting on a 16-dimensional somatic state vector [1115, 1116]:

$$\mathbf{e}(t) \in [0, 1]^{16}$$

This vector consists of **8 somatic affect intensities** and **8 cognitive affect intensities** [1116]. The inspector must display the following data for each of the eight mechanisms [1116]:

| ID | Mechanism | Parameter | Field Action | KaTeX Equation / Governing Relation | Badge |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **B** | Brainstem reflex | $J(t)$ | Transient source injection | $\gamma\dot{\mathbf{e}} = -\nabla H(\mathbf{e}) + J(t)$ | `SOURCED` (P9) [1116] |
| **R** | Rhythmic entrainment | $\gamma$ | Damping and phase-locking modulation | $|\omega_{ext} - \omega_0| < \Delta\omega_{lock}(\kappa)$ | `SOURCED` (P9) [1116] |
| **E1** | Evaluative conditioning | $\mathbf{b}$ | Learned bias-vector shift | $H(\mathbf{e}) = \frac{1}{2}\mathbf{e}^\top W \mathbf{e} - \mathbf{b}^\top\mathbf{e}$ | `SOURCED` (P9) [1116] |
| **C** | Emotional contagion | $\kappa$ | External-field coupling | $\dot{\phi}_1 - \dot{\phi}_2 \to 0$ | `SOURCED` (P9) [1116] |
| **V** | Visual imagery | $J_{internal}(t)$ | Endogenous source trajectory | $\Phi = \Phi^{(0)} + G_R * (J_{external} + J_{internal})$ | `SOURCED` (P9) [1116] |
| **E2** | Episodic memory | $K(\tau)$ | Memory-kernel reweighting | $K(\tau) = K_0 e^{-\tau/\tau_m}\theta(\tau)$ | `SOURCED` (P9) [1116] |
| **M** | Musical expectancy | $\Delta V$ | Transient wells and barriers | $\langle T\rangle \propto e^{\Delta V / D}$ | `SOURCED` (P9) [1116] |
| **A** | Aesthetic judgement | $\mathbf{b}$ | Cognitive appraisal/bias shift | $H(\mathbf{e}) \mapsto H(\mathbf{e}) - \Delta\mathbf{b}^\top\mathbf{e}$ | `SOURCED` (P9) [1116] |

The UI must visually trace and highlight how each selected mechanism routes its forcing amplitude down the **Limbic Axis ($L_1$)** to alter the global attractor landscape [1116].

---

## 5. Cheat Sheet Drawer Specifications

A sliding panel control labeled **`CHEAT SHEET`** must be accessible at every scale level ($\sigma \in [0, 19]$) and active layer ($M_4, P_3, L_1, C_3$) [1118]. The drawer must dynamically populate the side panel with:

1.  **Title:** Derived from the corresponding Domain Book (e.g., *Book 8: The Physics of Music and Affect*) [324, 1118].
2.  **Short Explanation:** Plain-language text contextualizing the physical substrate [1118].
3.  **Mathematical Core:** Beautifully rendered KaTeX equations defining the local operator [1118].
4.  **Local Source Path:** Explicit file references linking to the ITI-Theory repository (e.g., `Part2/fractal-programme/cheatsheets/book-music.md`) [1107, 1118].
5.  **Claim Badge:** Appropriate level matching the authority (e.g., `FORMAL` for proven theorems, `SOURCED` for literature) [1106, 1118].
6.  **The Scale Delta Statement:** Exactly one sentence stating: *What changes at this scale.* [1118]
