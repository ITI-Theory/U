# Compatibility patches for the v4.33.0 build

Applied automatically by `lean/upgrade-build.sh` after `lake update`
(skipped when already applied). One file per package under `.lake/packages/`.

| Package | Pinned commit | Change | Why |
|---|---|---|---|
| OSforGFF | fef84a82937d | `le_refl 1` -> `(by norm_num)` at the four call sites in `Covariance/Propagator.lean`, `Covariance/ParsevalGeneric.lean`, `OS/OS3_MixedRepInfra.lean` (proves both the rc1 and the final form); submitted upstream as mrdouglasny/OSforGFF#22 | Mathlib v4.33.0 relaxed `integrableOn_rpow_mul_exp_neg_mul_rpow`'s hypothesis from `1 ≤ p` to `0 < p` (upstream targets v4.33.0-rc1) |

Remove this patch once mrdouglasny/OSforGFF#22 is merged and the pin moves to a commit that contains it.