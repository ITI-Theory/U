# Local patches to upstream Lean libraries

The proofs build against Lean and Mathlib v4.31.0. Three upstream libraries
were written for older versions (Lean v4.29.0) and needed small compatibility
fixes (renamed lemmas, changed `simp` behaviour). Lake does not apply patches,
so these fixes currently live only in `.lake/packages/` on the build machine:
a fresh clone or `lake update` loses them. They are recorded here so they can
be re-applied (`git -C .lake/packages/<name> apply ../../../lean/patches/<file>`).

| Library | Upstream | Pinned commit | Patch |
|---|---|---|---|
| OSforGFF | github.com/mrdouglasny/OSforGFF | 60ab679e09b7 | 19 files, +110/-86 lines |
| GaussianField | github.com/mrdouglasny/gaussian-field | 36ae6dd2918e | 5 files, +28/-21 lines |
| BochnerMinlos | github.com/mrdouglasny/bochner | 1b56973aff9b | 3 files, +12/-11 lines |

Upstream has since moved to Lean v4.33.0-rc1 and rewritten the affected
lines, so these patches are not upstreamable as they stand.