# Print Spec — [T]-Theory Phase 1 Tetralogy

**Status:** v2.1 LOCKED — 2026-06-02
**Author:** Alistair Johnson · ORCID 0009-0007-2194-0850 · Zürich
**Scope:** AJ multilingual archive (16 books) + 6 give-away copies = 22 books
**No retail edition. No handout tier. No ISBN.**

**Changes from v2.0 → v2.1 (2026-06-02, same day):**
- Binding: casewrap (printed boards) → **Hardcover Linen Wrap** (real cloth, confirmed available in Lulu's A4 Premium HC config). Restores the v1.0 cloth-DNA. Foil stamping still not offered — deboss/print on linen replaces foil.
- Paper tier split: **Premium colour** for Atlas + Omnibus (figures, equations) / **Standard colour** for Phase Dot I + II (prose-only, no figures). Saves ~€50/Phase-Dot-volume.
- Cost table replaced with **real Lulu EUR quotes** (not USD estimates).

**Changes from v1.0 → v2.0 (also 2026-06-02):**
- Trim: mixed Crown/Royal → **A4 (210×297mm) across all volumes**
- Printer: Blurb ProLine Pearl → **Lulu Premium Hardcover Linen Wrap**
- Paper: Mohawk Eggshell 148gsm uncoated → **80# (~118gsm) coated white** (Premium or Standard colour per volume)
- Volumes: 6 (with Phase Dot ×4) → **4 (with Phase Dot ×2)**
- Body type: Latin Modern + STIX Two → **IBM Plex stack** (Serif Light body, Plex Math, Plex Sans display, Plex Mono code) via Layout C template
- Editions: 18 books across 3 buckets → **22 books: 16-book AJ multilingual + 6 give-aways (3 recipients × Atlas + Omnibus)**
- Brand identity (sticker, dust jacket, [T] mark, microdot, palettes) — **unchanged**

---

## 1. The Four-Volume Tetralogy

| # | Volume | Source PDF | Projected A4 pp | Role |
|---|---|---|---|---|
| I    | **The Wave Atlas**            | `bld/wave-atlas-FULL-C.pdf` rebuilt at A4 | ~420 | the wave — figures, fields, public-facing |
| II.1 | **Phase Dot — Volume I**      | (split from `phase-dot-a4.pdf`)           | ~550 | the dot — chats, hidden, personal |
| II.2 | **Phase Dot — Volume II**     | (split)                                   | ~550 | the dot — second half |
| III  | **Soma-Field: The Omnibus**   | `bld/omnibus-a4.pdf` rebuilt with Layout C | ~245 | the unification — collected papers, citable, formal |

**Phase Dot 2-vol split:** 1098 → 2×549. Splits on natural Phase block
boundary (`Me/chats/assemble_book.py` to emit `phase-dot-vol-1.md` and
`phase-dot-vol-2.md`). 80# coated cap is 480pp so each volume fits with
~30pp safety margin; final split point chosen to keep both volumes inside
that budget once Layout C overhead is measured.

### The Wave/Dot Duality (unchanged from v1.0)

The titles encode the project's central physics: **wave–particle complementarity**.

- *Wave Atlas* shows the field — flowing, visible, distributed.
- *Phase Dot* is the singularity — discrete, hidden, the scalar reduction.
  Split into I + II as matched twins; identical from the front, distinguished
  only by spine numeral. The split is structural, not narrative — the dot
  is one object that exceeds a single binding.
- *Omnibus* is the unification — the formal apparatus where both
  descriptions become a single object. Collects the 11 papers (P1–P11)
  under one cover.

This is not decorative. It is the brand's claim: the same theory describes
the smooth manifold and the compactified point. The tetralogy is the proof,
in book form.

---

## 2. Editions (locked)

| Bucket | Recipient | Tier | Composition | Books |
|---|---|---|---|---|
| **A** | AJ — full multilingual archive | Museum | 4 vols × 4 langs (EN/DE/FR/IT) | 16 |
| **B** | 3 give-away recipients | Museum | (Atlas EN + Omnibus EN) × 3 ppl | 6 |
| | | | **TOTAL** | **22** |

Bucket B is locked: each recipient gets **the pair** — the public-facing
Atlas (figures, the wave) plus the citable Omnibus (formal apparatus,
the unification). The pair carries the wave/unified duality on its own;
Phase Dot stays in the museum bucket (it is the personal layer).

---

## 3. Brand identity — unchanged from v1.0

Sourced from `paper/soma/phase-dot/phase-dot.md` §M-Theory Logo and
`paper/soma/t-theory/t-theory.md` (manifesto).

### The Movement — Field Realism

The books belong to a named art movement, declared in `t-theory.md` on 28 May 2026:

> Da Vinci said geometry is real. The Surrealists said the unconscious is real.
> The Field Realists say the field is real.

The tetralogy is the **founding corpus of Field Realism**. The colophon of
every volume must carry the line *"First-edition artefact of the Field Realist
movement, Zürich 2026."* The series statement page is a 1-page distillation
of `t-theory.md`.

### The Mark — `[T]`

> "Three characters representing a single letter. The brackets serve as the
> boundary of our observable universe, while the [T]—specifically the
> microdot within it—is the singularity. You aren't just showing a letter;
> you are showing a Calabi-Yau manifold projected into a 2D symbol."
> — phase-dot.md, 6 May 2026

- The mark is **`[T]`** — bracketed Tau in IBM Plex Serif Bold.
- Inside the crossbar/stem intersection: a **0.5pt circular void (microdot)**,
  visible only under magnification. Foil-stamped covers retain this microdot
  as a tiny knockout in the foil die; it is part of the artwork, not a defect.
- The microdot is the steganographic core. It is **always there**, always
  invisible at normal viewing distance. Without it, the mark is incomplete.

### The Sticker

The full brand sticker (`paper/figures/t-theory-sticker.svg`) is:

- Black filled circle
- White `[T]` mark, top half
- White QR code, bottom half → **https://github.com/ITI-Theory**

**Sticker placement policy:**

- **NOT foil-stamped on the cloth cover.** The cloth bears the [T] mark *only*
  (no QR, no circle). Foil-stamping a QR is unreliable and the QR's URL has
  a shorter half-life than the foil. The cloth cover is the eternal layer.
- **YES on the dust jacket — as the dust jacket.** See §4 Dust Jacket.
  The jacket *is* the sticker, blown up to book scale. All four volumes.
- **YES on the frontispiece.** First inside page of every volume: the full
  sticker, printed in black on the recto, ~80mm diameter, centred.
- **YES on the colophon.** Small mono version (~25mm) bottom-left next to
  the copyright statement.

### Palette assignment per volume (new mapping for tetralogy)

| Vol | Palette | Cover cloth | Accent | Spine foil | Headline rule colour |
|---|---|---|---|---|---|
| I.   Wave Atlas       | **Event Horizon** (the dance, visible field) | charcoal black | Electric Cyan `#00F0FF` (jacket only) | copper | cyan, 0.5pt rule under chapter titles |
| II.1 Phase Dot I      | **Axiomatic** (B/W, the hidden) | linen black | none — pure B/W interior | copper | black, 0.5pt rule |
| II.2 Phase Dot II     | **Axiomatic** (B/W, the hidden) | linen black | none — pure B/W interior | copper | black, 0.5pt rule — *identical to Phase Dot I* |
| III. Omnibus          | **Sovereign Singularity** (gold/black, the prestige) | deep void black | Quantum Gold `#D4AF37` | gold (only volume in gold) | gold rule, 0.5pt |

**Phase Dot I and II are deliberately identical from the front and on the cloth.**
The volumes are twins; only the spine numeral and the language tag distinguish
them physically. This enacts the "one object that exceeds a single binding"
principle.

Translation editions use the same per-volume palette as EN. Language is
encoded **only** in the printed language tag on the back cover bottom:
`DE` / `FR` / `IT` / (none = EN), 6pt, in the accent colour.

---

## 4. Physical specifications

### Printer & product (real Lulu config, confirmed 2026-06-02)

- **Lulu Hardcover Linen Wrap, A4 (210×297mm), 80# White Coated, Matte cover finish.**
  - Native A4 trim in Lulu's catalogue
  - 80# (~118gsm) white coated interior — gallery-grade for figures
  - **Real linen cloth wrap** over the boards (not printed casewrap) — restores
    the v1.0 cloth-cover DNA
  - Matte cover finish (over the linen — applies to the printed cover area)
  - Colour tier set **per volume** based on figure density:
    - **Premium Colour:** Wave Atlas, Omnibus (figures, plots, equations)
    - **Standard Colour:** Phase Dot I, Phase Dot II (prose, chats, no figures)
  - 480pp cap on 80# coated (drove Phase Dot 2-vol split; safe with ~30pp slack)
  - Foil stamping NOT offered → cover design uses **deboss on linen + printed
    accent + the dust jacket** as the primary visible layer (see Dust Jacket below)
  - EU printer fulfillment (typically Czech Republic / Poland) — short ship to Zürich

### Binding
- Hardback linen wrap, perfect-bound (Lulu does not offer Smyth-sewn at this tier)
- Square spine, no rounding
- Endpapers: white (Lulu default — no coloured endpaper option at this tier)

### Cover layout — Casewrap (printed boards)

Because Lulu's Premium HC is casewrap (printed boards) rather than true
cloth-wrap, the v1.0 cloth design adapts:

**The casewrap IS the cover art** — printed full-bleed in the per-volume
palette. The dust jacket then sits over it as the "loud" layer (see below).
Take the jacket off and you get the printed-board "monastic" layer:

**Restrained classical** (Wave Atlas, Omnibus):
- Full-bleed cloth-texture pattern in the volume's cloth-equivalent colour
  (charcoal black for Atlas, deep void black for Omnibus)
- Centred deep-debossed [T] mark, **40 mm tall** (~⅓ down from top edge)
  — printed in subtle off-tone of the field colour
- Below the mark, 20mm gap, then title in small caps in palette accent
  colour (copper/gold tone, printed not foiled):
  - `THE WAVE ATLAS` (I) or `SOMA-FIELD: THE OMNIBUS` (III)
- Below title, 10mm gap, `ALISTAIR JOHNSON` tiny (8pt) in same accent

**Monastic** (Phase Dot I, Phase Dot II):
- Full-bleed linen-black cloth-texture pattern
- Centred [T] mark only, 40mm, printed in subtle off-tone
- No title text. No author. No volume number on front.
- The two volumes are visually identical from the front. Only the spine
  distinguishes them.

### Cover layout — Spine (all 4 vols)

Top → bottom, European reading direction (rotated 90° clockwise from front):
1. Small [T] mark (~12 mm), 15mm from head, printed in palette accent
2. 25mm gap
3. **Title** in small caps palette accent colour:
   - `THE WAVE ATLAS` / `PHASE DOT` / `SOMA-FIELD: THE OMNIBUS`
4. For Phase Dot only: 8mm gap, then **volume number**: `I` `II` in copper roman, 14pt
5. *Empty space* (most of the spine — let the field breathe)
6. `JOHNSON` in accent, 8pt small caps, 15mm from foot

### Cover layout — Back

- Full-bleed cloth-texture in the volume's field colour
- Exception: 8pt language tag bottom-right, 12mm in from each edge:
  - EN: no tag
  - DE: `DE`
  - FR: `FR`
  - IT: `IT`
- That is the only mark on the back. The field is the statement.

### Dust jacket — all 4 volumes (the sticker, book-scale)

**Core idea unchanged from v1.0:** the dust jacket *is* the wall sticker,
scaled up. Same artwork, same QR, same mystery. Pick the book up and you
see the sticker from across the room. Take the jacket off (or wear it
through) and you're left with the printed-board "monastic" layer underneath
— a tiny [T] and nothing else. Two mysteries, one book. The jacket is the
loud version; the board is the quiet version.

Jackets are cheap. If a jacket gets cracked or battered, throw it away —
the book is still a book. That disposability is part of the move: the
sticker has always been a thing that gets stuck somewhere and eventually
falls off. The jacket honours that.

**Spec (identical across all 4 volumes, sized to A4 + per-volume spine width):**

- Printed colour wrap over the casewrap, 1/0 (black ink only on white stock),
  matte laminate — single colour to keep the sticker DNA pure
- **Front:** black field, full bleed. Centred over the front panel: the full
  sticker artwork from `paper/figures/t-theory-sticker.svg` — white `[T]`
  top half, white QR code bottom half, no other marks. Roughly 60% of the
  front-panel width. This is the same artwork that goes on walls; the only
  thing that changes is scale.
- **Spine:** thin white `[T]` mark at head, thin white `JOHNSON` at foot,
  nothing else. No title on the jacket spine — the title lives on the
  printed-board spine underneath.
- **Back:** the QR alone, smaller (~40mm), bottom-right. No blurb, no text,
  no ISBN. The QR is its own back-cover statement.
- **Inside front flap:** one line in white on black, IBM Plex Sans light,
  10pt centred: *"[T] — the field is real."* Nothing else.
- **Inside back flap:** ORCID + Zenodo concept-DOI of the volume + URL
  `github.com/ITI-Theory`, all in 8pt white on black, bottom-aligned. The
  bookkeeping. Out of the way.

No per-volume variation on the jacket. All four look identical from across
the room. Differentiation lives on the boards underneath (spine title +
volume number for Phase Dot).

---

## 5. Interior typography — Layout C (IBM Plex stack)

Layout C is defined in `paper/sandbox/atlas-design/header-C.tex` (~225 lines)
and will be promoted to `paper/templates/tt-atlas.tex` before printing.
Replaces v1.0's Latin Modern + STIX Two plan.

| Role | Typeface | Size/leading | Notes |
|---|---|---|---|
| Body | **IBM Plex Serif Light** | 11pt / 1.42 leading | luxe — luxurious whitespace, monograph-grade |
| Display (chapter, title) | **IBM Plex Sans Thin** | 48pt SemiBold for chapter title, 60pt for book title | airy, "Knuth Weighted" cousin |
| Section headers | **IBM Plex Serif Bold** | Large, atlasdeep colour | |
| Subsection | **IBM Plex Sans Bold** | large, atlas colour | |
| Math | **IBM Plex Math** | via `\setmathfont{IBM Plex Math}` bare — Path-mode breaks unicode-math | sharper than Plex Serif's italic at equation sizes |
| Monospace | **IBM Plex Mono Regular** | 9.5pt | |
| Folios (page numbers) | **IBM Plex Sans**, lining figures, 28pt atlas (outer corner) | | dramatic margin folios |
| Running heads | **IBM Plex Sans Light**, sans footnotesize atlassoft chaptermark | small caps via fancyhdr | |
| Captions | small sans, atlas label, italic text | | |

**Palette (atlas-cyan family — see `header-C.tex`):**
- `atlas` = `#00B4D8` (cyan)
- `atlasdeep` = `#004858` (cyan deep)
- `atlassoft` = `#8FBFCC` (cyan soft)

For Omnibus (gold palette), the same template will accept a `\colorscheme{gold}`
swap that retargets atlas → Quantum Gold `#D4AF37`, atlasdeep → deep gold-black,
atlassoft → muted gold. For Phase Dot (B&W), the colours collapse to greys.

### Layout C macros (provided by header)

`\tsticker` `\halftitle{title}` `\atlastitlepage{title}{subtitle}{author}{place,year}`
`\marginpullquote{...}` `\pullquote{...}` `\attrquote{body}{source}`
`\begin{plate}{caption}` `\chapterend` `\colophon`

`\part` is redefined as a tikz full-page atlas-cyan fill with 300pt white
Roman numeral. Chapter openers carry a 260pt ghost numeral in `atlassoft!30`
at the NE corner, tsticker at NW, 48pt SemiBold atlasdeep title.

### Book apparatus (every volume) — unchanged from v1.0

Order, front → back:
1. **Half-title** (recto only): just `[T]` mark, 60mm, centred, nothing else
2. *Verso blank*
3. **Frontispiece**: the full sticker, ~80mm, printed black, centred (recto)
4. **Title page**: `[T]` mark small at top, full title, subtitle, author, year, place; horizontal accent rule at base — produced by `\atlastitlepage{}{}{}{}` macro
5. **Title verso (copyright page)**: copyright, ORCID, Zenodo DOI of source, edition statement (`First edition · Zürich · 2026`), CC-BY-4.0 statement, printer (`Printed by Lulu Press on 80# matte coated white`)
6. **Series statement** page: `[T]-Theory Phase 1 · Volume N of 4` + a one-page distillation of `paper/soma/t-theory/t-theory.md` (Field Realism manifesto — Vitruvian parallel, tensor/trance pun, sticker as cultural seed, this volume's place in the wave/dot/unified triad)
7. **Dedication** (recto, italic, single line — TBD)
8. *Verso blank*
9. **Table of contents**
10. **Preface** (if any)
11. **Body**
12. **References / Bibliography** (where applicable)
13. **Index** (Atlas + Omnibus only)
14. **Colophon** (verso, last page) — produced by `\colophon`: typeface statement (IBM Plex + Plex Math), paper, printer, edition, small sticker mark, year, ORCID

### Chapter openings (Layout C handles automatically)

Set in `\@makechapterhead`:
- tikz overlay 260pt ghost numeral atlassoft!30 at NE corner
- `\tsticker` at NW
- 95mm vspace
- sans 8.5pt atlas "CHAPTER N" eyebrow
- 45mm atlas hairline
- 48pt SemiBold atlasdeep title

---

## 6. Implementation plan

### Template promotion
- Move `paper/sandbox/atlas-design/header-C.tex` → `paper/templates/tt-atlas.tex`
- Parameterise palette switch: `\colorscheme{cyan|gold|bw}`
- Parameterise `\ifchapbook` switch (wider outer margin for thin papers — not
  needed for tetralogy, kept for future small-volume reuse)

### Geometry (all 4 volumes)

```
paperwidth=210mm, paperheight=297mm, twoside,
inner=25mm, outer=45mm, top=32mm, bottom=38mm,
fontsize=11pt, classoption=openany,twoside
```

Body block: ~140×227mm. Pleasant. Not crowded.

### Makefile changes — DO NOT TOUCH UNTIL TRANSLATIONS FINISH

After translations complete:
1. Add `templates/tt-atlas.tex` (promoted from sandbox)
2. Update Make targets for A4 geometry + Layout C template, all 4 books
3. Add per-volume palette metadata
4. Rebuild all 16 print PDFs (4 vols × EN/DE/FR/IT)
5. Sanity-proof page counts → recalculate spine widths for cover templates
6. Build cover artwork via Lulu's per-trim templates (A4 + measured spine widths)

### Build sequence (for the print order)

```
1. Translations finish (queue running; ~4-5 days)
2. Split phase-dot.md into 2 vols on natural Phase boundary
3. Promote header-C → templates/tt-atlas.tex
4. Rebuild all 16 print PDFs at A4 with Layout C template
5. Generate sticker → [T]-only deboss die for casewrap board art
6. Render Wave Atlas dust jacket art via apps/instrument/
7. Lay out covers in Lulu's per-trim templates (A4 + spine widths)
8. Upload, soft-proof, hard-proof (order 1 sample volume first — likely Phase Dot I as cheapest test of binding tolerance at ~550pp), revise
9. Place full order (22 books)
```

---

## 7. QR target — locked (unchanged from v1.0)

**https://github.com/ITI-Theory**

This is the public org landing. It must:
- Stay alive forever (the QR is printed in 22 books; URL rot is the failure mode)
- Carry a pinned README pointing to current Zenodo DOIs of all papers
- Carry a `STICKER.md` documenting the QR's purpose (so future maintainers
  don't redirect it)

**Open action:** before printing, write `.github/profile/README.md` to
confirm the landing experience for a stranger arriving via the QR.

---

## 8. Cost (real Lulu EUR quotes, 2026-06-02)

Quotes pulled directly from Lulu's calculator for the confirmed config:
A4 Hardcover Linen Wrap, 80# White Coated, Matte cover finish.

| Volume | Pages | Colour tier | Unit price (€) |
|---|---|---|---|
| Wave Atlas | 420 | Premium | **€93.00** |
| Phase Dot I | ~550 | Standard | **€44.10** |
| Phase Dot II | ~550 | Standard | **€44.10** |
| Omnibus | ~245 | Premium | **€59.45** |
| **One complete 4-book set (EN)** | ~1,765 | mixed | **€240.65** |

| Bucket | Composition | Books | Subtotal (€) |
|---|---|---|---|
| A — AJ multilingual archive | 4 vols × 4 langs (EN/DE/FR/IT) | 16 | **€962.60** |
| B — Give-aways | (Atlas + Omnibus) × 3 recipients | 6 | **€459.00** |
| **Books subtotal** | | **22** | **€1,421.60** |
| EU → Zürich shipping (~35 kg expedited) | | | ~€180 |
| Swiss VAT on printed books (2.6% reduced rate) | | | ~€42 |
| **Grand total** | | | **≈ €1,644 ≈ CHF 1,550** |

Add ~CHF 90 (1× Phase Dot I as hard proof) before final order →
**budget CHF 1,650 all-in.**

Notes:
- Phase Dot per-volume price (€44.10) was quoted at 550pp Standard Colour.
  If post-Layout-C rebuild lands at 600pp the volume cost rises to ~€48
  and the total to ~CHF 1,580 — still inside budget.
- All page counts are projections until Wave Atlas + Phase Dot are rebuilt
  at A4 with Layout C. Final order placed only after those numbers lock.
- Total is **~CHF 100 under v1.0's CHF 1,600 estimate** even with 22 books
  (vs 18), thanks to the standard/premium colour split on Phase Dot.

---

## 9. Open decisions / actions (countdown to order)

- [ ] Confirm **dedication line** (single line, italic, recto title-verso side)
- [ ] Phase Dot split — define the 2-volume break point (`assemble_book.py` change)
- [ ] [T] deboss die vector — extract `[T]`-only path from `t-theory-sticker.svg`,
      strip the circle background and QR, outline text, export as 100% K
      vector PDF for Lulu casewrap board art
- [ ] Generate the 4 dust-jacket layouts — same sticker artwork scaled to A4
      + per-volume spine width, 1/0 black on white, matte laminate
- [ ] Promote `header-C.tex` → `paper/templates/tt-atlas.tex`
- [ ] Add `palette` (cyan/bw/gold), `volume_number`, `volume_role` (`wave`
      / `dot` / `unified`) metadata fields to each volume's source YAML
- [ ] Distil `paper/soma/t-theory/t-theory.md` into a 1-page **series statement**
      (wave/dot/unified + Field Realism declaration). `t-theory.md` is a
      **bridge document to Phase 2** — it is referenced, not enshrined.
      Do NOT print the full manifesto as a preface; the 1-page distillation
      plus the colophon line is enough.
- [ ] Update `.github/profile/README.md` for the QR landing
- [ ] Finalise give-away allocation (B bucket) — default 6× Atlas EN
- [ ] Order one **hard proof** of Phase Dot I (~550pp, max binding stress
      test) before placing full order
- [ ] (Optional) Decide if **give-away recipients** want their names printed
      inside the cover (e.g. "For Anna — A.J. Zürich 2026") — would require
      per-recipient PDF variant

---

## 10. What is NOT in scope

- No retail edition. No ISBN registration. No bookshop distribution.
- No handout tier.
- No language-coloured cloth (per-volume palette carries the identity).
- No QR on cover linen (printed on frontispiece + colophon + dust jacket only).
- No Smyth-sewn binding (Lulu HC Linen Wrap is perfect-bound; trade-off
  accepted in exchange for native A4 + coated paper + real linen + EU fulfillment).
- No foil stamping (Lulu does not offer it at this tier; deboss on linen +
  printed accent + dust jacket as primary visible layer replaces foil DNA).
- No T.Live / Phase 2 / live-event print materials (separate project).

---

*This file lives in `paper/PRINT-SPEC.md` and is the single source of truth
for the print order. Update with versioned changes when decisions land.*

*v1.0 — 2026-06-01 — initial lock (Blurb ProLine Pearl, mixed trims, 6 vols, 18 books)*
*v2.0 — 2026-06-02 — pivot to Lulu Premium HC A4 coated, 4 vols, 22 books, IBM Plex Layout C*
*v2.1 — 2026-06-02 — linen wrap restored (Lulu has it after all); standard/premium colour split per volume; real EUR pricing; bucket B = 3×(Atlas+Omnibus) pairs; total CHF 1,550*
