# Local patches to upstream Lean libraries

The proofs build against Lean, Mathlib and physlib v4.33.0, with OSforGFF
(and its dependencies GaussianField and BochnerMinlos) at an upstream commit.
Lake does not apply patches, so `lean/upgrade-build.sh` applies the files in
`v4.33/` after `lake update` (and skips any already applied).

See `v4.33/README.md` for the current patch. It is submitted upstream as
mrdouglasny/OSforGFF#22; once merged, pin a commit that contains it and
delete the patch. (The larger v4.31.0-era patches were retired with the
upgrade on 2026-10-03; they remain in git history.)