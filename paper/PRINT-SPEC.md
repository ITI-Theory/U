# Print Spec — [T]-Theory Phase 1 Trilogy

**Status:** DRAFT v0.1 — 2026-06-01 — awaiting AJ final sign-off then quote
**Author:** Alistair Johnson · ORCID 0009-0007-2194-0850
**Edition target:** private deposit + gift run, not retail

---

## 1. The Trilogy

| # | Title | Source file (EN) | EN pages | Trim |
|---|---|---|---|---|
| I | **The Wave Atlas** | `bld/wave-atlas-crown.pdf` | 433 | Crown Quarto 189×246 mm |
| II | **Phase Dot** | `bld/phase-dot.pdf` | **1813** ⚠ split needed | Royal 156×234 mm |
| III | **The Soma-Field: Collected Works** | `bld/omnibus-royal.pdf` | 294 | Royal 156×234 mm |

Translation languages (DE, FR, IT) build under the same Makefile targets — page
counts will be ±5 % of EN.

---

## 2. Phase Dot — The Volume Problem

Phase Dot is 1813 Royal pages. **No mainstream hardcover printer accepts that
in one bind.** The honest options:

| Option | Vols | Pages/vol | Printer choice |
|---|---|---|---|
| **A. Split into 3 (recommended)** | 3 | ~605 | Lulu Premium hardcover (≤800pp cream 60# linen wrap) |
| B. Split into 4 | 4 | ~455 | Blurb ProLine Pearl hardcover (≤480pp) |
| C. Single slipcased deluxe | 1 | 1813 | Custom bindery (Burdach, ZH) — quote individually |
| D. Saddle-stitched softcover, single | 1 | 1813 | Impossible — softcover caps ~700pp |

**Decision (A):** Phase Dot ships as **3 volumes per language**. Each volume
covers a natural Phase block — let `Me/chats/assemble_book.py` emit
`phase-dot-vol-1/2/3.md` split on chapter boundaries near the 600pp mark.

Trilogy thus becomes a **5-volume set per language**:
- I. Wave Atlas (1 vol)
- II.a / II.b / II.c. Phase Dot (3 vols)
- III. Collected Works (1 vol)

× 4 languages (EN, DE, FR, IT) = **20 hardcover books per full set**.

---

## 3. Edition Plan

| Edition | Set count | Cloth | Purpose |
|---|---|---|---|
| Museum (EN-only) | 4 sets × 5 vols = 20 books | EN-black | one each: AJ + 3 deposit/gift |
| Polyglot | 3 sets × 5 vols × 3 langs (DE/FR/IT) = 45 books? | — | see §4 |

The earlier "4 EN + 3 polyglot trilogies" plan was based on 4 vols/set
(28 books total). With 5-vol sets that becomes:

- **Tight:** 1 EN + 1 DE + 1 FR + 1 IT = **20 books, 1 set per language** (~CHF 2200)
- **Generous:** 2 EN + 1 DE + 1 FR + 1 IT = **25 books** (~CHF 2750)

Recommend **tight** — it's already a lot of paper and the EN extras can be
print-on-demand later if you need more copies.

---

## 4. Final Spec (locked)

### Printer
- **Lulu Premium hardcover, casebound**
  ([https://www.lulu.com/](https://www.lulu.com/))
- Single printer for the whole run (simplifies cover templates, foil dies,
  spine math, shipping consolidation)
- Alternative if Lulu trim doesn't fit: **Blurb ProLine Pearl** for Wave Atlas
  + Collected Works (≤480pp both); Lulu only for Phase Dot. Adds complexity,
  not recommended.

### Paper
- Body: **60# cream uncoated** (Lulu default for premium hardcover)
- Wave Atlas only: **80# white coated** (figures + photographs need it)

### Binding
- Sewn case-bound (Smyth-sewn signatures, glued head/foot bands)
- Square spine, no rounding
- Endpapers: **plain off-white wove**

### Cover material — Cloth wrap, language-coloured
| Language | Cloth | Notes |
|---|---|---|
| EN | **Black** | linen weave |
| DE | **Oxblood** (deep burgundy) | linen weave |
| FR | **French navy** | linen weave |
| IT | **Forest green** | linen weave |

Foil: **copper** on all cloths (warm, mid-luminance, reads on every base).

### Cover layout
- **Front:** cloth only, centred [T] foil mark **40 mm tall** (~⅓ down from
  top edge). No title text. No author. Mark only.
- **Spine:** small [T] foil mark near head (15 mm), title in **small-caps**
  copper foil below it, author surname (`JOHNSON`) tiny near foot in copper.
- **Back:** cloth only. Optional: tiny ORCID + year `0009-0007-2194-0850 · 2026`
  in copper foil, bottom-right, 6pt.

### Dust jacket (Wave Atlas only)
- Printed colour wrap over the cloth
- Front: neon-mesh field art (TBD — generate from `apps/instrument/` field
  renderer at 300dpi, 200×257 mm trim + 15 mm bleed each side)
- Back: trilogy title, author, ORCID, copyright, edition note (e.g.
  `Set 01 of 04 · Zürich · 2026`)
- Spine: same as cloth spine underneath
- Inside flaps: blank cream

### [T] foil die
- Vector source: `???` — **OPEN ACTION:** locate or recreate. Likely lives in
  `T/`, `T.Ops/docs/standards/`, or as appendix figure in
  `paper/soma/the-tensor/the-tensor.md` (Tau Cross).
- Format required by Lulu/most printers: single-colour vector PDF or AI,
  100 % black on white, no anti-aliasing, no strokes (filled paths only),
  outline all text.

### Colophon (each volume, last page)
```
Set in [body typeface] · [headline typeface]
Printed on [paper]
Bound by Lulu Press · Raleigh, NC
[T]-Theory Phase 1 · First edition, May 2026
ORCID 0009-0007-2194-0850
Set NN of 04
```
**OPEN ACTION:** pick typefaces. Suggested: body = Crimson Pro / EB Garamond,
headline = Inter / IBM Plex Sans. Already in Pandoc defaults? — verify in
Makefile `FLAGS`.

### Dedication (each volume, after frontispiece, before TOC)
**OPEN ACTION:** write one line. e.g.
> *For the body that knew first.*
> *For the field that holds us.*
> *For the friends who waited.*

---

## 5. Per-volume specs (final once translations done)

Each translated PDF triggers a fresh page count → fresh spine width.
Spine width formula (Lulu cream 60#):

$$ \text{spine}_{\text{mm}} = \frac{\text{pages}}{17.48} + 3.0 $$

Indicative for EN:

| Vol | Pages | Spine | ISBN | Status |
|---|---|---|---|---|
| I.   Wave Atlas | 433 | 27.8 mm | (private, no ISBN) | EN ✅ DE ✅ FR 🔄 IT ⏸ |
| II.a Phase Dot vol 1 | ~605 | 37.6 mm | — | ⏸ awaits split |
| II.b Phase Dot vol 2 | ~605 | 37.6 mm | — | ⏸ |
| II.c Phase Dot vol 3 | ~605 | 37.6 mm | — | ⏸ |
| III. Collected Works | 294 | 19.8 mm | — | EN ✅ DE ⏸ FR ⏸ IT ⏸ |

---

## 6. Cost Estimate (revised — 5-vol sets)

Lulu Premium hardcover indicative pricing (USD, 2026):

| Vol | Pages | Unit cost | × 4 langs |
|---|---|---|---|
| Wave Atlas (Crown) | 433 + jacket | ~$45 | $180 |
| Phase Dot ×3 (Royal) | ~605 each | ~$50 ×3 | $600 |
| Collected Works (Royal) | 294 | ~$30 | $120 |
| **Per-language set** | — | — | **$225** |

**Single-set-per-language print run:** 4 × $225 = **$900 (≈ CHF 800)**
plus international shipping to CH (~CHF 100–150) plus customs (~5 %) =
**CHF ~1000 all-in.**

That's significantly under the earlier CHF 2200 estimate because 5-vol
splitting reduces per-book cost dramatically.

If you want **2 EN + 1 of each other** (the "tight" plan): add one extra
EN set = +CHF 250 → **~CHF 1250 total**. Recommended.

---

## 7. Order checklist (when ready)

1. ✅ Finalise translations (queue running)
2. ⏸ Split Phase Dot EN into 3 markdown sources, rebuild PDFs, get final page counts
3. ⏸ Translate splits (DE/FR/IT × 3 vols)
4. ⏸ Build per-language PDFs at final spine width
5. ⏸ Locate / recreate [T] foil die vector
6. ⏸ Pick body + headline typefaces, rebuild
7. ⏸ Write colophon block, edition number, dedication line
8. ⏸ Generate Wave Atlas dust jacket art (use `apps/instrument/`)
9. ⏸ Download Lulu cover template per trim, lay out spines + dust jacket
10. ⏸ Upload, proof, order

---

## 8. Open decisions for AJ

- [ ] Confirm: **Lulu single-printer** (not Blurb)?  → simpler, slightly less luxe paper than ProLine Pearl
- [ ] Confirm: **Phase Dot in 3 vols** (not 2, not 4)?
- [ ] Confirm: **tight edition (4 sets, 1 per language)** or **+1 extra EN**?
- [ ] Confirm: **copper foil** on all four cloth colours (vs. e.g. gold on black, silver on navy)?
- [ ] Pick body + headline typefaces
- [ ] Write dedication
- [ ] Decide: dust jacket on Wave Atlas only, or all volumes?
- [ ] [T] foil die — exists already, or recreate?

---

*This file lives in `paper/PRINT-SPEC.md` and is the single source of truth
for the print order.  Update it as decisions land; commit alongside.*
