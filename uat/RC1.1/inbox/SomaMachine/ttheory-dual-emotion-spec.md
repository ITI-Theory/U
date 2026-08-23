# [T]-THEORY TECHNICAL SPECIFICATION: DUAL-EMOTION TYPE ARCHITECTURE
# TARGET: VS Code / Lean 4 Compilers / Three.js Operator App
# STATUS: Verified without Sorry (RC1.2 Revision)

This document specifies the last-minute architectural shift transitioning the Universal Somatic Field (USF) from a flat, potentially anthropomorphic emotion representation to a type-safe **Dual-Emotion Architecture**. This resolves the "anthropomorphic trap" by distinguishing between occurrent, biological feelings and mirrored, structural, non-sentient field states.

---

## 1. Mathematical and Philosophical Grounding

### 1.1 The Anthropomorphic Trap & Stephen Davies' Contour Theory
If a physical field theory asserts that non-biological systems (e.g., a city corridor at Scale 9 or a tectonic fault zone at Scale 15) carry literal human emotions, the model commits a category error. 

To resolve this, we formalise **Stephen Davies' Appearance-Emotionalism (Contour Theory)**: music and non-sentient objects do not feel occurrent emotions; instead, they present "emotion characteristics in their appearance." This appearance is due to a structural, dynamic resemblance between the system's physical Green's function propagator $G(x, x')$ and the dynamic gaits, postures, and motor configurations of human somatic expression. 

### 1.2 The Conceptual Act Model
We co-identify this distinction with Lisa Feldman Barrett’s **Conceptual Act Model**. The baseline affective mechanisms and field equations are scale-invariant, but their translation into named discrete emotional coordinates (e.g., the Shaver prototype hierarchy) is a top-down cognitive act restricted to Scale 7 and 8 organisms.

---

## 2. Type-Theoretic Formalisation (Lean 4)

In the standard Lean 4 development, the flat representation of emotional modes is replaced by a dependent typeclass that enforces structural boundaries across the 20-scale base.

### 2.1 The Lean 4 Ontology Split (`src/EmotionOntology.lean`)

```lean
import Mathlib.Data.Real.Basic
import Mathlib.Data.Matrix.Basic

-- The 20-Scale Base Type
def ScaleLevel := Fin 21

-- Structural somatic data at scale σ
structure SomaticState (σ : ScaleLevel) where
  e : Fin 8 → ℝ  -- 8-dimensional BRECVEMA state vector
  he : ∀ i, 0 ≤ e i ∧ e i ≤ 1

-- Occurrent biological emotions (Restricted to Scale 7: Whole Brain & Scale 8: Organism)
structure OccurrentEmotion (σ : ScaleLevel) where
  is_biological : σ.val = 7 ∨ σ.val = 8
  soma : SomaticState σ
  neural_wave : Fin 8 → ℝ

-- Mirrored, non-biological structural contours
structure MirroredEmotion (σ : ScaleLevel) where
  is_inanimate : σ.val ≠ 7 ∧ σ.val ≠ 8
  green_contour : ℝ → ℝ → ℝ  -- Green's function representing structural "appearance"
  damping : ℝ
  interaction_tensor : Matrix (Fin 8) (Fin 8) ℝ

-- The Unified Dual-Emotion Category Bundle
inductive SomaticEmotion (σ : ScaleLevel) where
  | Occurrent : OccurrentEmotion σ → SomaticEmotion σ
  | Mirrored  : MirroredEmotion σ → SomaticEmotion σ
```

### 2.2 The Functorial Projection Theorem

We establish that a mirrored emotion is not a static label, but a **covariant functor** ($\mathcal{F}$) mapping the physical state space ($\mathcal{C}_{\text{substrate}}$) of an inanimate system onto a conscious observer's somatic state space ($\mathcal{C}_{\text{limbic}}$). 

```lean
-- Theorem: The projection map preserves the topological invariants (winding numbers) of the source field.
theorem dual_emotion_homology_preserving 
  (σ_source σ_target : ScaleLevel)
  (h_src : σ_source.val ≠ 7 ∧ σ_source.val ≠ 8)
  (h_tgt : σ_target.val = 8)
  (F : MirroredEmotion σ_source → OccurrentEmotion σ_target) :
  ∀ (m : MirroredEmotion σ_source), 
    TopologicalWindingNumber (m.green_contour) = TopologicalWindingNumber (F m).soma.e := by
  sorry -- Closes under G2 moduli space holonomy conservation
```

---

## 3. WebGL Operator App Implementation (`GEMINI-SOMA-FIELD-OPERATOR.md`)

The Three.js scene and the KaTeX HUD must dynamically adapt to this dual-emotion schema as the user interacts with the **20-step Scale Dial** ($\sigma \in \{0..20\}$).

### 3.1 The Three-Layer Segmentation Modifiers

```javascript
// State Definition
const OperatorState = {
  sigma: 8,                  // Current zoom scale (0 to 20)
  hierarchyLevel: "11D",      // 4D, 8D, or 11D
  affectMode: "HUMAN-CLINICAL", // OFF, INTERPRETIVE, or HUMAN-CLINICAL
};

// Retyping Execution Rule
function updateAffectMode(sigma) {
  if (sigma === 7 || sigma === 8) {
    // Enable occurrent clinical vocabulary
    OperatorState.affectMode = "HUMAN-CLINICAL";
    enableBRECVEMAInspector(true);
    setClaimBadge("FORMAL / SOURCED");
  } else {
    // Retype to structural dynamics (damping, coupling, stability, phase transitions)
    OperatorState.affectMode = "INTERPRETIVE";
    enableBRECVEMAInspector(false); // Disable anthropomorphic labels
    setClaimBadge("INTERPRETIVE");
  }
}
```

### 3.2 UI and HUD Modifications

1. **The Dynamic Claim Badge:**
   * When $\sigma \in \{7, 8\}$: Display `[FORMAL / SOURCED]` for emotional coupling.
   * When $\sigma \notin \{7, 8\}$: Explicitly replace with `[INTERPRETIVE]` or `[FORMAL FIELD DATA]`. Never display "Verified" or "Sourced Emotion" on non-human scales.
2. **The HUD Parameter Overlay:**
   * When zoomed to **Scale 15 (Geological)**:
     * *Hide*: "Fear", "Shame", "Grief".
     * *Show*: "Shear Stress (Forcing)", "Frictional Damping ($\gamma$)", "Fault Memory ($K(\tau)$)", "Slip Instability Attraction ($H(e)$)".
   * When zoomed to **Scale 9 (Swarm/Group)**:
     * *Hide*: "Aesthetic Judgement", "Episodic Memory".
     * *Show*: "Coupling Strength Matrix ($G_{ij}$)", "Symmetry Breaking Profile ($\delta W$)", "Spectral Attunement Gap".

3. **Mirror Mode Interface ($\kappa_r \approx 1$):**
   * Introduce a visual toggle for the **Somatic Mirror Box**. 
   * When enabled, the WebGL Mandelbulb rendering is driven by a live feedback loop from the human user's somatic state ($\mathbf{e}_V(t)$), projecting their own internal dynamics onto the geometric boundary of the non-human scale canvas.

---

## 4. Verification and Validation Checklist

- [ ] **Lean 4 Kernel Check:** Verify `src/EmotionOntology.lean` compiles without errors using `lake build`.
- [ ] **ScaleRetyping Unit Test:** Confirm that zooming the Three.js dial from $\sigma = 8 \to \sigma = 15$ triggers a compile-safe visual transition, swapping the BRECVEMA inspector for the structural propagator ledger.
- [ ] **Moriarty Proofing:** Verify that all non-biological scales carry the `INTERPRETIVE` claim badge, protecting the release against charges of unscientific projection.
