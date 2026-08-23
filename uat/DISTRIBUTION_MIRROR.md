# UAT Distribution Mirror

`uat/staging/full/` is a byte-for-byte rehearsal of the future `Dist/` tree.
The only permitted differences are:

- UAT-only review material is under `_context/` and never promoted.
- `MANIFEST.md` records source paths, SHA-256 hashes, and known gaps.
- An artifact may be staged for review while still blocked from public or print
  promotion. It must be labelled as such in the manifest.

## Canonical distribution layout

| Directory | Required contents |
|---|---|
| `papers/` | All papers, datasets, Lean appendix, C1v2 Papers omnibus, and C2 Fractal omnibus. No Fractal volumes or individual domain books. |
| `lulu/` | C1v2, Volumes I and II, and all 15 individual domain books. Each print product requires its interior, Linen Wrap artwork, and Dust Jacket spread. Vol II may enter UAT but is blocked from Lulu promotion above its registry `lulu_page_limit`. |
| `nlm-min/` | C1v2 Papers omnibus and C2 Fractal omnibus only. |
| `nlm-max/` | All selectable papers, datasets, Lean appendix, both omnibuses, Volumes I/II, all 15 domain books, and cheatsheets. Names are prefixed for source selection. |
| `zenodo/` | Only registry records with `zenodo_file`, preserving the current deposit scope. |
| `stuff/` | Existing supplementary material plus every domain cheatsheet. |

## Ownership

`Dist/PAPERS.yaml` owns release membership, identity, build source, and public
destination names. The UAT stager reads that registry and writes an equivalent
tree below `U/uat/staging/full/`; it never copies a candidate into `Dist/`.

## Print contract

The selected product is Lulu **Hardcover Linen Wrap with Dust Jacket**, Standard
Color, 80# White, Matte, for all print books. A product consists of an interior
PDF, a Linen Wrap artwork proof, and a one-page Dust Jacket spread. The Lulu
Hardcover Linen Wrap limit is 800 pages; the canonical 10pt Volumes I and II
currently fit within that limit.
