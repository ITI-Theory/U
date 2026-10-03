# Compatibility patches for the v4.33.0 build

Applied automatically by `lean/upgrade-build.sh` after `lake update`
(skipped when already applied). One file per package under `.lake/packages/`.

| Package | Pinned commit | Change | Why |
|---|---|---|---|
| OSforGFF | fef84a82937d | `Covariance/Propagator.lean`: `le_refl 1` -> `(by norm_num)` (proves both the rc1 and the final form) | Mathlib v4.33.0 relaxed `integrableOn_rpow_mul_exp_neg_mul_rpow`'s hypothesis from `1 ≤ p` to `0 < p` (upstream targets v4.33.0-rc1) |

Upstreamable: upstream will need the same change when it moves from
v4.33.0-rc1 to a final Mathlib release.