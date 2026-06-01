# Print Spec — [T]-Theory Phase 1 Trilogy

**Status:** v1.0 LOCKED — 2026-06-01
**Author:** Alistair Johnson · ORCID 0009-0007-2194-0850 · Zürich
**Scope:** AJ personal museum set + EU partials + 3-recipient gift set
**No retail edition. No handout tier.**

---

## 1. The Six-Volume Trilogy

| # | Volume | Source PDF | EN pages | Trim | Role |
|---|---|---|---|---|---|
| I    | **The Wave Atlas**                         | `bld/wave-atlas-crown.pdf`     | 433  | Crown Quarto 189×246 mm | the wave — figures, fields, public-facing |
| II.1 | **Phase Dot — Volume 1**                   | (split from `phase-dot.pdf`)   | ~453 | Royal 156×234 mm        | the dot — chats, hidden, personal |
| II.2 | **Phase Dot — Volume 2**                   | (split)                        | ~453 | Royal                    | the dot |
| II.3 | **Phase Dot — Volume 3**                   | (split)                        | ~453 | Royal                    | the dot |
| II.4 | **Phase Dot — Volume 4**                   | (split)                        | ~453 | Royal                    | the dot |
| III  | **The Soma-Field: Collected Works**        | `bld/omnibus-royal.pdf`        | 294  | Royal                    | the unification — citable, formal |

**Phase Dot splits into 4 vols** (1813 → 4×453, fits Blurb ProLine Pearl 480pp cap).
Splits along Phase block boundaries (`Me/chats/assemble_book.py` to emit
`phase-dot-vol-1/2/3/4.md`).

### The Wave/Dot Duality

The titles encode the project's central physics: **wave–particle complementarity**.

- *Wave Atlas* shows the field — flowing, visible, distributed.
- *Phase Dot* is the singularity — discrete, hidden, the scalar reduction.
- *Collected Works* is the unification — the formal apparatus where both
  descriptions become a single object.

This is not decorative. It is the brand's claim: the same theory describes
the smooth manifold and the compactified point. The trilogy is the proof,
in book form.

---

## 2. Editions (locked — no handout tier)

| Bucket | Recipient | Tier | Vols | Books |
|---|---|---|---|---|
| **A** | AJ — EN full set | Museum | 6 (I + II.1–4 + III)             | 6 |
| **B** | AJ — EU partials | Museum | (I + III) × DE, FR, IT          | 6 |
| **C** | Daughters (×2) + therapist (×1) | Museum | (I + III) × 3 ppl    | 6 |
| | | | **TOTAL** | **18 books** |

---

## 3. Brand identity — sourced from `paper/soma/phase-dot/phase-dot.md` §M-Theory Logo

### The Mark — `[T]`

> "Three characters representing a single letter. The brackets serve as the
> boundary of our observable universe, while the [T]—specifically the
> microdot within it—is the singularity. You aren't just showing a letter;
> you are showing a Calabi-Yau manifold projected into a 2D symbol."
> — phase-dot.md, 6 May 2026

- The mark is **`[T]`** — bracketed Tau in IBM Plex Serif Bold (or Concrete Roman Bold).
- Inside the crossbar/stem intersection: a **0.5pt circular void (microdot)**,
  visible only under magnification.  Foil-stamped covers retain this microdot
  as a tiny knockout in the foil die; it is part of the artwork, not a defect.
- The microdot is the steganographic core. It is **always there**, always
  invisible at normal viewing distance. Without it, the mark is incomplete.

### The Sticker

The full brand sticker (`paper/figures/t-theory-sticker.svg`) is:

- Black filled circle
- White `[T]` mark, top half
- White QR code, bottom half → **https://github.com/ITI-Theory**

**Sticker placement policy:**

- **NOT on the cover.** The cloth cover bears the [T] mark *only* (no QR, no
  circle, no white background). Foil stamping a QR is unreliable and the
  QR's URL has a shorter half-life than the foil.
- **YES on the frontispiece.** First inside page of every volume: the full
  sticker, printed in black on the recto, ~80mm diameter, centred.
- **YES on the colophon.** Small mono version (~25mm) bottom-left next to
  the copyright statement.
- **YES on the dust jacket flap.** Wave Atlas only, small inset.

### Palette assignment per volume

The doc defines three palettes. The trilogy uses one each:

| Vol | Palette | Cover cloth | Accent | Spine foil | Headline rule colour |
|---|---|---|---|---|---|
| I.   Wave Atlas       | **Event Horizon** (the dance, visible field) | charcoal black | Electric Cyan `#00F0FF` printed on jacket only | copper | cyan, 0.5pt rule under chapter titles |
| II.  Phase Dot ×4     | **Axiomatic** (B/W, the hidden)            | linen black | none — pure B/W interior | copper | black, 0.5pt rule |
| III. Collected Works  | **Sovereign Singularity** (gold/black, the prestige) | deep void black | Quantum Gold `#D4AF37` | gold (only volume to use gold not copper) | gold rule, 0.5pt |

Translation editions use the same per-volume palette as EN. Language is
encoded **only** in the foil-stamped language tag on the back cover bottom:
`DE` / `FR` / `IT` / (none = EN), 6pt, in the same metal as the spine foil.

(Earlier plan of language-colour cloth dropped — over-determined the design.
The volume identity carries the palette; the language is a footnote.)

---

## 4. Physical specifications

### Printer
- **Blurb ProLine Pearl** — single printer for the whole museum run.
  - Real cloth wrap (not paper-wrap-with-linen-print)
  - 148gsm Mohawk Eggshell text stock (cream, uncoated)
  - Foil stamping on cover + spine
  - Dust jackets supported for any trim
  - 480pp cap per volume (drove Phase Dot 4-vol split)

### Binding
- Smyth-sewn case-bound
- Square spine, no rounding
- Head/foot bands: black on Phase Dot + Collected Works; cyan on Wave Atlas
- Endpapers:
  - Wave Atlas: plain black
  - Phase Dot ×4: plain off-white
  - Collected Works: plain off-white

### Cover layout — Front

Two schools, by volume role:

**Restrained classical** (I, III):
- Cloth field
- Centred [T] foil mark, **40 mm tall** (~⅓ down from top edge)
- Below the mark, 20mm gap, then title in small caps copper/gold foil:
  - `THE WAVE ATLAS` (I) or `THE SOMA-FIELD: COLLECTED WORKS` (III)
- Below title, 10mm gap, `ALISTAIR JOHNSON` tiny (8pt) foil

**Monastic** (II.1–II.4):
- Cloth field
- Centred [T] foil mark only, 40 mm
- No title text. No author. No volume number on front.
- The four volumes are visually identical from the front. Only the spine
  distinguishes them.

### Cover layout — Spine (all 6 vols)

Top → bottom, European reading direction (rotated 90° clockwise from front):
1. Small [T] foil mark (~12 mm), 15mm from head
2. 25mm gap
3. **Title** in small caps copper/gold foil:
   - `THE WAVE ATLAS` / `PHASE DOT` / `SOMA-FIELD: COLLECTED WORKS`
4. For Phase Dot only: 8mm gap, then **volume number**: `I` `II` `III` `IV` in copper roman, 14pt
5. *Empty space* (most of the spine — let the cloth breathe)
6. `JOHNSON` in copper, 8pt small caps, 15mm from foot

### Cover layout — Back

- Empty cloth (per AJ design lock)
- Exception: 8pt foil language tag bottom-right, 12mm in from each edge:
  - EN: no tag
  - DE: `DE`
  - FR: `FR`
  - IT: `IT`
- That is the only mark on the back. The cloth is the statement.

### Dust jacket — Wave Atlas only
- Printed colour wrap over the cloth (5/0 process colour, matte laminate)
- Front: full-bleed neon-mesh field-art (TBD — render from
  `apps/instrument/` field engine at 300 dpi, 219×276 mm trim + 15 mm bleed
  each side for Crown Quarto)
- Back: trilogy series statement, ISBN-style identifier, copyright,
  edition note, blurb (~120 words)
- Spine: mirrors the cloth spine underneath, in cyan on black process,
  with optional white [T] mark
- Inside flaps:
  - Front flap: book blurb, ~80 words
  - Back flap: author bio, ORCID, link to https://github.com/ITI-Theory,
    the full sticker (small, inset)

---

## 5. Interior typography — OpenStax-tier upgrade

> "Use Computer Modern for body text. Context: Use this for the technical
> specs. It mimics the Principia Mathematica layout."
> — phase-dot.md, 6 May 2026

The current pandoc/xelatex default IS Computer Modern (Latin Modern), so
the body is correct in spirit. The upgrade is the surrounding typesetting.

| Role | Typeface | Size/leading | Notes |
|---|---|---|---|
| Body | **Latin Modern Roman** (= Computer Modern, native) | 10.5/14pt Royal, 11/15pt Crown | already in use; do not change |
| Headlines (chapter, section) | **IBM Plex Serif Bold** | scaled cascade | "Knuth Weighted" — matches the [T] mark itself |
| Sub-headlines | **IBM Plex Serif SemiBold** | | |
| Display / part-openers | **IBM Plex Serif ExtraBold**, all caps, letter-spaced 100 units | 18pt | |
| Math | **STIX Two Math** via `unicode-math` | matches body weight | sharper than Latin Modern Math at print sizes |
| Monospace | **IBM Plex Mono** | 9.5pt | replaces Consolas; pairs with Plex Serif |
| Folios (page numbers) | **IBM Plex Sans**, lining figures | 9pt | sans counterpoint to the serif body |
| Running heads | **IBM Plex Sans Light**, small caps, letter-spaced 80 units | 8pt | |

Microtype enabled globally. `unicode-math` for proper Unicode math glyphs.
`\usepackage{microtype, unicode-math, plex-serif, plex-sans, plex-mono, stix2}`.

### Book apparatus (every volume)

Order, front → back:
1. **Half-title** (recto only): just `[T]` mark, 60mm, centred, nothing else
2. *Verso blank*
3. **Frontispiece**: the full sticker, ~80mm, printed black, centred (recto)
4. **Title page**: `[T]` mark small at top, full title, subtitle, author, year, place; horizontal copper/gold rule at base
5. **Title verso (copyright page)**: copyright, ORCID, Zenodo DOI of source, edition statement (`First edition · Zürich · 2026 · Set N of 4`), CC-BY-4.0 statement, ISBN if any, printer (`Printed and bound by Blurb, Inc. on Mohawk Eggshell 148gsm`)
6. **Series statement** page: `[T]-Theory Phase 1 · Volume N of 6` + a one-paragraph statement of the wave/dot duality and where this volume sits in it
7. **Dedication** (recto, italic, single line — TBD)
8. *Verso blank*
9. **Table of contents**
10. **Preface** (if any)
11. **Body**
12. **References / Bibliography** (where applicable)
13. **Index** (Wave Atlas + Collected Works only)
14. **Colophon** (verso, last page): typeface statement, paper, printer, edition, small sticker mark, year, ORCID

### Chapter openings
- Drop cap on first paragraph, 3 lines deep, IBM Plex Serif Bold
- Chapter number in roman numerals above title, IBM Plex Sans small caps,
  letter-spaced
- Horizontal foil-colour rule (cyan/black/gold per palette), 0.5pt,
  centred, 40mm wide, beneath the title
- 3-line gap before body

---

## 6. Implementation plan

### Template
A custom LaTeX template `paper/templates/tt-book.tex` will:
- Set up the IBM Plex + STIX Two + Latin Modern font stack
- Define the chapter-opening macro with drop cap + rule
- Define title page, half-title, frontispiece, series statement, colophon macros
- Take YAML metadata: `palette` (cyan/bw/gold), `volume_number`, `volume_role` (`wave` / `dot` / `unified`)

Pandoc invocation gains: `--template=templates/tt-book.tex`.

The template is **future work** — not blocking the translation queue, which
is currently rebuilding all .md sources for DE/FR/IT.

### Makefile changes — DO NOT TOUCH UNTIL TRANSLATIONS FINISH

After translations complete:
1. Add `templates/tt-book.tex`
2. Add per-volume Make targets that pass `palette` + `volume_number` metadata
3. Rebuild all 18 print PDFs (6 vols × EN, plus 2 vols × 3 langs for B+C)
4. Sanity-proof page counts → recalculate spine widths
5. Build cover artwork via separate template per volume (Blurb cover template
   downloaded per trim and spine width)

### Build sequence (for the print order)

```
1. Translations finish (queue running; ~4-5 days)
2. Split phase-dot.md into 4 vols on natural Phase boundaries
3. Build templates/tt-book.tex
4. Rebuild all 18 print PDFs with the template
5. Generate sticker → [T]-only foil die (vector SVG → PDF, 100% K, outlined)
6. Render Wave Atlas dust jacket art via apps/instrument/
7. Lay out covers in Blurb's per-trim templates
8. Upload, soft-proof, hard-proof (order 1 sample volume first), revise
9. Place full order (18 books)
```

---

## 7. QR target — locked

**https://github.com/ITI-Theory**

This is the public org landing. It must:
- Stay alive forever (the QR is printed in 18 books; URL rot is the failure mode)
- Carry a pinned README pointing to current Zenodo DOIs of all papers
- Carry a `STICKER.md` documenting the QR's purpose (so future maintainers
  don't redirect it)

**Open action:** before printing, write `.github/profile/README.md` to
confirm the landing experience for a stranger arriving via the QR.

---

## 8. Cost estimate (all-in)

Blurb ProLine Pearl indicative pricing (USD, 2026):

| Bucket | Books | Avg per book | Subtotal USD |
|---|---|---|---|
| A (full EN, 6 vols) | 6 | ~$72 | $430 |
| B (EU partial, 6 vols = WA+CW × DE+FR+IT) | 6 | ~$78 | $470 |
| C (gift partial, 6 vols = WA+CW × 3 ppl) | 6 | ~$78 | $470 |
| **Subtotal** | **18** | | **$1370** |
| International shipping to Zürich | | | ~$120 |
| Swiss customs/VAT (~8%) | | | ~$120 |
| **Grand total** | | | **~$1610 ≈ CHF 1450** |

Add ~CHF 150 for one or two hard-proof sample volumes before final order →
**budget CHF 1600 all-in.**

---

## 9. Open decisions / actions (countdown to order)

- [ ] Confirm **dedication line** (single line, italic, recto title-verso side)
- [ ] Phase Dot split — define the 4 break points (`assemble_book.py` change)
- [ ] [T] foil die vector — extract `[T]`-only path from `t-theory-sticker.svg`,
      strip the circle background and QR, outline text, export as
      100% K vector PDF for Blurb
- [ ] Wave Atlas dust jacket art — render from `apps/instrument/` field engine
- [ ] Write `templates/tt-book.tex`
- [ ] Add `palette`, `volume_number`, `volume_role` metadata fields to each
      volume's source YAML
- [ ] Compose **series statement** paragraph (wave/dot/unified)
- [ ] Update `.github/profile/README.md` for the QR landing
- [ ] Order one **hard proof** of Phase Dot Vol I before placing full order
- [ ] (Optional) Decide if **gift recipients** want their names foil-stamped
      inside the cover (e.g. "For Anna — A.J. Zürich 2026")

---

## 10. What is NOT in scope

- No retail edition. No ISBN registration. No bookshop distribution.
- No handout tier (earlier "pleb" Lulu plan dropped — 18 museum books only).
- No language-coloured cloth (earlier plan dropped; per-volume palette
  carries the identity instead).
- No QR on cover (printed on frontispiece + colophon only).
- No T.Live / Phase 2 / live-event print materials (separate project).

---

*This file lives in `paper/PRINT-SPEC.md` and is the single source of truth
for the print order. Update with versioned changes when decisions land.*

*v1.0 — 2026-06-01 — initial lock*
