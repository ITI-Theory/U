# UAT — Paper Acceptance Criteria

Criteria for reviewing papers before publication or sharing.
Deliberately kept high-level; add specifics as they become clear.

---

## U-1 Personal Information

**Criterion:** Papers must not contain personal information that would be
considered inappropriate to share publicly or with a professional reviewer
(psychotherapist, academic, collaborator).

**Scope:** All papers. Especially: `soma-field-patient-pov.md`,
`soma-field-book.md`.

**Status:** PASS

**Notes:**
- Personal content is *intentionally present* in some papers — the criterion
  is about appropriateness, not absence.
- Grey areas: names of treating clinicians, specific dates of personal events,
  third-party personal details, financial or legal information.
- `soma-field-patient-pov.md`: correspondence placeholder fixed → ORCID + city. Year corrected. All personal disclosures (ASD, ADHD, C-PTSD) are intentional. No third-party names.
- `soma-field-book.md`: no correspondence placeholder, no third-party names, 1968 hospital event is intentional/central. PASS.

---

## Theory Test Suite

Formal test cases drawn from FIELD-NOTES.md (evaluated May 2026).
Source of truth: `src/SomaField.lean`, `instrument/field.py`, published papers.

| ID | Claim | Status | Evidence / Notes |
|---|---|---|---|
| CO-ID-1 | PerceptIsPropagatorPole | **PASS** | `W8ℝ_isHermitian` proved in SomaField.lean using Mathlib spectral theorem; `somaticPropagatorPoles : Fin 8 → ℝ` defined as `W8ℝ_isHermitian.eigenvalues`; `perceptIsPropagatorPole_nostalgia` proved by `native_decide` |
| CO-ID-2 | AttractorIsHopfieldMinimum | **PASS** | `field.py` implements $H = \tfrac{1}{2}\mathbf{e}^\top W\mathbf{e} - \boldsymbol{\theta}\cdot\mathbf{e}$ correctly |
| THERAPY-1 | TherapyIsRGFlow | **PASS** | Consistent with paper §5.5 |
| THERAPY-2 | TopologicalTraumaRequiresTopologicalFix | **PASS** | Follows from definition of smooth deformation |
| THERAPY-3 | GoldstoneAfterimagePersists | **PASS** | Goldstone's theorem applies; no contradiction |
| LEAN-1 | EmotionLangIsUniversal | **PASS** | `theorem emotionLang_is_universal` proved in EmotionOntology.lean: `Nonempty (EmotionLang String) ∧ Nonempty (EmotionLang (List EmotionLabel)) ∧ Nonempty (EmotionLang Valence)` |
| LEAN-2 | AesopImplementsCoIdentification | **PASS** | Definitionally true of the tactic |
| METHOD-1 | HypnopompicStateOptimisesCoIdentification | **PASS** | Consistent with FIELD-NOTES §1 |
| METHOD-2 | HRVIsSomaFieldSpectralDensity | GAP | Server logs `e[0..15]` but no HRV projection extracted |
| META-1 | CoIdentificationIsAbduction | **PASS** | The whole paper is this |
| GAP-1 | DyadicPropagatorExists | **STUB** | `src/DyadicField.lean` created: W_AB block matrix, `dyadicPropagatorMatrix`, `coRegulated`; symmetry theorem proved; energy bound `sorry` |
| GAP-2 | CTheoremHoldsForSomaField | **OPEN** | Claim: ∃ C(W) monotonically decreasing under therapeutic RG flow. Analogue of Zamolodchikov C-theorem. Requires: definition of C-function for soma-field, proof of monotonicity under W-deformation. Genuine open question. |

**Score: 9 PASS · 1 STUB · 1 OPEN · 0 FAIL**

---

<!-- Add further criteria below as needed -->
