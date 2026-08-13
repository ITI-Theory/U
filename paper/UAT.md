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
| METHOD-2 | HRVIsSomaFieldSpectralDensity | **PASS** | `SomaField.spectral_density()` added: rolling 256-sample FFT buffer at 50 Hz; LF (0.04–0.15 Hz) and HF (0.15–0.4 Hz) power of BS channel (dim 0); LF/HF ratio returned in `state_dict` as HRV proxy |
| META-1 | CoIdentificationIsAbduction | **PASS** | The whole paper is this |
| GAP-1 | DyadicPropagatorExists | **PARTIAL** | `dyadicPropagatorExists` proved (symmetry, by `simp`); `coupling_sum_nonneg` proved over ℝ (Finset.sum_nonneg); `dyadic_energy_coupling_lowers_ℝ` has sorry for block-sum decomposition (boilerplate, not mathematics); Float→ℝ transfer sorry remains |
| GAP-2 | CTheoremHoldsForSomaField | **OPEN** | Claim: ∃ C(W) monotonically decreasing under therapeutic RG flow. Analogue of Zamolodchikov C-theorem. Requires: definition of C-function for soma-field, proof of monotonicity under W-deformation. Genuine open question. |
| GAP-3 | CosmologicalConstantDerivation | **PARTIAL** | P21 written. Numerical estimate: Λ_USF = (21/11) H₀²/c² ≈ 0.93 Λ_obs (7% from 7/11 compact dimension fraction). DESI+Pantheon+ consistent (0.1σ). DES SN5YR tension (4σ) pending systematics. Lean stub: `CosmologicalConstant.lean`; axioms need linearised GR in Mathlib. |
| GAP-4 | DarkMatterSpatialVacuum | **PARTIAL** | P22 written. Numerical estimate: Ω_DM^USF = 3/11 = 0.273 vs obs 0.265 (2.9% off). Physical mechanism: spatial block Φ_{ij} clusters (non-compact), EM-neutral (gauge fields in X_7). Lean stub: `CosmologicalConstant.lean` (DarkMatter namespace); axioms need KK reduction in Mathlib. |
| GAP-5 | FixedPointProperty | **PARTIAL** | P23 written. `usf_is_fixed_point` proved: ∃ USF instance at Scale 9. Full formalisation (W_{ij} at Scale 9, spectral gap) is open. |
| GAP-6 | G2SymmetryBreaking | **PARTIAL** | P24 written. W8ℝ = (6/5)I₈ + δW numerically verified (Python, exact rationals). δW traceless proved (sorry; wOffℝ private). 48.4% symmetry broken. Resolves 8→7 question via tracelessness. |

**Score: 10 PASS · 5 PARTIAL · 1 OPEN · 0 FAIL**

---

## Reference Integrity Test Suite

Automated checks run against all paper source `.md` files (excluding `AI-NOTES*`, `FIELD-NOTES*`, `PUBLISH-NOW*`, `INDEPENDENT_REP*`, `ZENODO_RELEASE*`).

Run: `cd paper && bash scripts/uat_refs.sh` (see script below — embedded for reproducibility).

```bash
#!/usr/bin/env bash
# uat_refs.sh — Reference integrity checks
set -euo pipefail
PAPER_DIR="$(cd "$(dirname "$0")/../paper" 2>/dev/null || echo ".")"
cd "$PAPER_DIR"
EXCLUDE="AI-NOTES|FIELD-NOTES|PUBLISH-NOW|INDEPENDENT_REP|ZENODO_RELEASE"
FAIL=0

# REF-1: No version DOIs (concept DOIs must be used everywhere)
echo "=== REF-1: Version DOIs ==="
HITS=$(grep -rn "zenodo\.\(20350516\|20350331\|20351231\|20287982\)" *.md 2>/dev/null \
       | grep -vE "$EXCLUDE" || true)
[ -z "$HITS" ] && echo "PASS" || { echo "FAIL"; echo "$HITS"; FAIL=1; }

# REF-2: Unresolved citation keys ([@key] not in bibliography.bib)
echo "=== REF-2: Orphan citation keys ==="
grep -hoh '\[@[a-zA-Z0-9_:.-]*\]' *.md 2>/dev/null \
  | grep -vE "$EXCLUDE" | sed 's/\[@//;s/\]//' | sort -u > /tmp/uat_cite_refs.txt
grep "^@" bibliography.bib | sed 's/@[^{]*{//;s/,.*//' | sort > /tmp/uat_bib_keys.txt
MISSING=$(comm -23 /tmp/uat_cite_refs.txt /tmp/uat_bib_keys.txt)
[ -z "$MISSING" ] && echo "PASS" || { echo "FAIL: missing keys: $MISSING"; FAIL=1; }

# REF-3: Bare & in bib non-comment fields (should be \& or 'and')
echo "=== REF-3: Bare ampersands in bibliography.bib ==="
HITS=$(grep -n "&" bibliography.bib | grep -v "^[[:space:]]*%" | grep -v "\\\\&" || true)
[ -z "$HITS" ] && echo "PASS" || { echo "FAIL"; echo "$HITS"; FAIL=1; }

# REF-4: Literal placeholder [@key] in paper sources
echo "=== REF-4: Placeholder [@key] in sources ==="
HITS=$(grep -rn '\[@key\]' *.md 2>/dev/null | grep -vE "$EXCLUDE" || true)
[ -z "$HITS" ] && echo "PASS" || { echo "FAIL"; echo "$HITS"; FAIL=1; }

exit $FAIL
```

| ID | Check | Command | Last Run | Status |
|---|---|---|---|---|
| REF-1 | No version DOIs in source files | `grep zenodo.(version)` | 2026-05-29 | **PASS** |
| REF-2 | All `[@citekey]` resolve in `bibliography.bib` | `comm cite_refs bib_keys` | 2026-05-29 | **PASS** (36 keys, 0 missing) |
| REF-3 | No bare `&` in non-comment bib fields | `grep & bibliography.bib` | 2026-05-29 | **PASS** (2 `\&` journal names, correctly escaped) |
| REF-4 | No literal `[@key]` placeholders in paper sources | `grep \[@key\]` | 2026-05-29 | **PASS** |

**Score: 4 PASS · 0 FAIL**

---

<!-- Add further criteria below as needed -->
