# Papers Build Context

Generated from active Papers build sources for UAT discussion. Labeled code blocks are source snapshots for this candidate.

## Build Map

1. `Dist/PAPERS.yaml` owns release identity, reference policy, C1v2 metadata, member order, and part openings.
2. `paper/scripts/build_omnibus.py` reads C1v2 and writes merged `bld/omnibus-body.md`.
3. `paper/Makefile` renders `omnibus-body.md` and invokes quality gates.
4. `paper/scripts/stage_uat.py` copies PDFs and context into the hash manifest.

## `paper/FORMAT.md`

```markdown
# Omnibus Format Standard

This is the source of truth for physical-format behavior in the Papers
Omnibus and the [T]-Theory Omnibus. Build scripts implement this contract;
format checks enforce the parts that can be verified automatically.

## Shared Rules

- The title page is physical page 1.
- A blank inside-cover is physical page 2.
- For an individual paper, the abstract begins recto on physical page 3.
- A blank abstract verso is physical page 4; the table of contents begins
  recto on physical page 5 and begins its own printed folio sequence at 1.
- Deliberately inserted blank pages contain no text and occur only on even
  physical pages.
- The master table of contents begins on physical page 3.
- Master contents lists only major containers, not every internal heading.
- Every contained work begins recto (an odd physical page).
- A contained work begins with a divider page that names the work clearly.
- Major appendices begin recto and have a prose-to-proof separation page.
- The omnibus carries one continuous pagination and one master table of
  contents; it does not reproduce individual-paper front matter or local TOCs.
- Mathematical Unicode in prose and code listings is rendered through TeX math;
  the monospaced code font must not be relied on for mathematical glyphs.

## Papers Omnibus Profile

- `omnibus-a4.pdf` and `omnibus-royal.pdf` are a single merged manuscript.
- C1v2 in `Dist/PAPERS.yaml` owns its title, front matter, ordered members, and
  part openings; the build script contains no duplicate collection inventory.
- The master contents lists the merged hierarchy once; included paper-local
  covers, abstracts, TOCs, pagination, and reference sections are not repeated.
- Each canonical paper gets a named recto divider before its merged body.
- The Lean proof appendix is merged as the final registered appendix.

## Individual Paper Profile

- A title/cover page with the [T] sticker is followed by an explicit blank
  inside-cover page.
- The abstract occupies the following recto page without contents material.
- A blank verso follows the abstract; the table of contents begins recto.
- The table of contents begins at printed page 1, independently of the cover
  and preliminary physical leaves.
- After the table of contents, the first numbered section begins recto.
- This rule applies to every individual paper rendered through `journal.tex`.

## [T]-Theory Omnibus Profile

- The Fractal Thesis and Volumes I/II use master TOC depth 1.
- Each contained domain book gets a named recto part-opening page.
- Each domain book includes its own four-page cheatsheet immediately after
  the opening page.
- The Gateway is the only book with a noir page and may place its cheatsheet
  at the end as a retrospective map.
- Domain-book details stay in their individual book TOCs; they do not expand
  the master volume TOC.

## Verification

Run the relevant format check after an omnibus build:

```bash
cd U/paper
make check-omnibus-format
make check-individual-format PAPER=soma-field-synthesis
make check-glyph-warnings
```

The checker verifies source-level break and divider contracts plus the first
three physical pages and recto paper-divider parity. The [T]-Theory profile is
specified here and will receive its checker when that build is revised. Visual
review remains required for typography, images, and binding quality.

`check-glyph-warnings` also rejects unresolved-reference diagnostics. Pandoc
may echo latexmk's intermediate "Label(s) may have changed" line even after
latexmk settles the final PDF; it is not an unresolved-reference failure.
```

## `paper/Makefile`

```makefile
# Soma-Field Papers -- PDF Build System.  Run: make help

include mk/common.mk

# vpath for registered docs injected by register macro (soma/<id>/).
# Residual: non-registered source dirs.
vpath %.md soma/SFT-DEMO-CASE soma/t-theory ai-method

# --- Document registry (one line per document) ---
# $(eval $(call register, id, class, langs, alias))
#   class: paper | citeproc | book
#   langs: en | multi (translation tooling is retained but deferred; release
#   candidates are English-only until translations are explicitly re-enabled)
#   alias: short make target (auto-generates .PHONY + rule)
$(eval $(call register, soma-field-paper,               paper,    multi, main    ))
$(eval $(call register, soma-field-patient-pov,         paper,    multi, pov     ))
$(eval $(call register, quantum-soma-penrose,            paper,    multi, quantum ))
$(eval $(call register, preverbal-manifold,              paper,    en,    preverbal))
$(eval $(call register, gestalt-field-dynamics,         citeproc, en,    gestalt ))
$(eval $(call register, missing-limbic-layer,           citeproc, en,    limbic  ))
$(eval $(call register, swarm-propagator,               citeproc, en,    swarm   ))
$(eval $(call register, universal-somatic-field,        citeproc, en,    usf     ))
$(eval $(call register, zoomable-somatic-field,         citeproc, en,    zsf     ))
$(eval $(call register, experimental-validation,        citeproc, en,    exp     ))
$(eval $(call register, geographic-somatic-field,       citeproc, en,    geo     ))
$(eval $(call register, mathematical-co-identification, citeproc, multi, method  ))
$(eval $(call register, music-affect-dynamics,          citeproc, multi, music   ))
$(eval $(call register, soma-field-synthesis,           citeproc, multi, synthesis))
$(eval $(call register, soma-physical-substrate,        citeproc, multi, substrate))
$(eval $(call register, soma-field-book,                book,     multi, book    ))
$(eval $(call register, the-tensor,                     book,     multi, tensor  ))
$(eval $(call register, soma-temporal-dynamics,         citeproc, en,    temporal))
$(eval $(call register, usf-euclidean-qft,              citeproc, en,    osqft   ))
$(eval $(call register, usf-interacting-qft,           citeproc, en,    intqft  ))
$(eval $(call register, cosmological-constant-derivation, citeproc, en,  cosconst))
$(eval $(call register, dark-matter-spatial-vacuum,       citeproc, en,  darkmatter))
$(eval $(call register, g2-symmetry-breaking,             citeproc, en,  g2break  ))
$(eval $(call register, ttheory-phenomena,                citeproc, en,  phenomena))
$(eval $(call register, ttheory-cheatsheet,               citeproc, en,  cheatsheet))
$(eval $(call register, SFT-DEMO-CASE,                     citeproc, en,  demo-case))

# Derived target lists (computed from registry)
_ALL_EN_PDFS := $(addprefix $(BUILDDIR)/, $(addsuffix .pdf, $(ALL_DOCS)))
_MULTI_DOCS  := $(foreach d,$(ALL_DOCS),$(if $(filter multi,$($(d).langs)),$(d),))
PDFS_DE := $(addprefix $(BUILDDIR)/, $(addsuffix .de.pdf, $(_MULTI_DOCS)))
PDFS_FR := $(addprefix $(BUILDDIR)/, $(addsuffix .fr.pdf, $(_MULTI_DOCS)))
PDFS_IT := $(addprefix $(BUILDDIR)/, $(addsuffix .it.pdf, $(_MULTI_DOCS)))

# -----------------------------------------------------------------------------

.PHONY: all help omnibus omnibus-royal omnibus-a4 glyph-papers uat-context-papers check-omnibus-format check-individual-format check-paper-references check-glyph-warnings \
	omnibus-translations translate-omnibus translate-omnibus-deepl \
	lean-appendix \
	clean check setup freeze \
	de fr it translations translations-clean translate translate-deepl everything-bundle

all: $(_ALL_EN_PDFS) omnibus | $(BUILDDIR)

glyph-papers: $(_ALL_EN_PDFS) lean-appendix

uat-context-papers:
	$(PYTHON) $(SCRIPTS)/generate_uat_context.py

help:
	@echo "Soma-Field Papers -- PDF Build System"
	@echo ""
	@echo "  make             build all English PDFs"
	@echo "  make omnibus     both omnibus editions (Royal + A4)"
	@echo "  make lean-appendix  standalone PDF of all Lean 4 proofs"
#	@echo "  make thesis      thesis edition (Royal + A4) [disabled — use omnibus]"
	@echo "  English-only release builds are active; translations are deferred"
	@echo "  make clean       remove English PDFs"
	@echo "  make check       verify pandoc + xelatex"
	@echo ""
	@echo "Registered documents (make <alias>):"
	@printf '%s\n' $(foreach d,$(ALL_DOCS),'  $($(d).alias)  [$($(d).class), $($(d).langs)]  $(d)')

# (alias targets generated by register macro in mk/common.mk)

# Omnibus render core — independent of RENDER_COMMON.
# memoir class is incompatible with titlesec/fancyhdr in journal.tex;
# omnibus.tex provides the memoir-native equivalents.
_OMNIBUS_CORE := \
	--pdf-engine=latexmk \
	--pdf-engine-opt=-xelatex \
	--pdf-engine-opt=-silent \
  --standalone \
  --toc \
  -V colorlinks=true \
  -V linkcolor=NavyBlue \
  -V urlcolor=NavyBlue \
  -V toccolor=NavyBlue \
  -V hyperxmp=false \
	-V monofont="JetBrains Mono" \
	--syntax-highlighting=tango \
  --include-in-header=omnibus.tex \
  --lua-filter=strip-keywords.lua

OMNIBUS_BASE := $(_OMNIBUS_CORE) \
	--toc-depth=1 \
	-V documentclass=memoir \
	-V classoption=openany \
	-V classoption=a4paper \
	-V header-includes="\usepackage{amsmath}\usepackage{amssymb}" \
  $(CITEPROC)

# Omnibus — Royal (156×234 mm), sewn case-bound
# Print spec: 115–120 gsm cream offset | sewn case bound | matte cover
# bindingoffset=6mm: inner+binding ≈ 28 mm at gutter
OMNIBUS_ROYAL_FLAGS := $(OMNIBUS_BASE) \
  -V "geometry=paperwidth=156mm,paperheight=234mm,twoside,inner=22mm,outer=18mm,top=22mm,bottom=25mm,bindingoffset=6mm" \
  -V fontsize=10pt

# Omnibus — A4 duplex, punched for Filofax ring binder
# Compact 10pt layout — same density as two-column without longtable breakage
OMNIBUS_A4_FLAGS := $(OMNIBUS_BASE) \
  -V "geometry=a4paper,twoside,inner=22mm,outer=20mm,top=20mm,bottom=22mm" \
  -V fontsize=10pt

omnibus-royal: omnibus.tex unicode-math-text.tex lean-appendix | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/build_omnibus.py
	$(PANDOC) $(BUILDDIR)/omnibus-body.md -o $(BUILDDIR)/omnibus-royal.pdf $(OMNIBUS_ROYAL_FLAGS)
	@echo "Built: $(BUILDDIR)/omnibus-royal.pdf"

omnibus-a4: omnibus.tex unicode-math-text.tex lean-appendix | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/build_omnibus.py
	$(PANDOC) $(BUILDDIR)/omnibus-body.md -o $(BUILDDIR)/omnibus-a4.pdf $(OMNIBUS_A4_FLAGS)
	@echo "Built: $(BUILDDIR)/omnibus-a4.pdf"

omnibus: omnibus-a4

check-omnibus-format: omnibus-a4
	$(PYTHON) $(SCRIPTS)/check_omnibus_format.py

PAPER ?= soma-field-synthesis
check-individual-format: $(BUILDDIR)/$(PAPER).pdf
	$(PYTHON) $(SCRIPTS)/check_individual_format.py $(BUILDDIR)/$(PAPER).pdf

check-paper-figures: $(BUILDDIR)/$(PAPER).pdf
	$(PYTHON) $(SCRIPTS)/check_paper_figures.py $(PAPER) --pdf $(BUILDDIR)/$(PAPER).pdf

check-paper-references: $(BUILDDIR)/$(PAPER).pdf
	$(PYTHON) $(SCRIPTS)/check_paper_references.py $(PAPER) --pdf $(BUILDDIR)/$(PAPER).pdf

check-glyph-warnings:
	$(PYTHON) $(SCRIPTS)/check_glyph_warnings.py

# ---------------------------------------------------------------------------
# Lean appendix — standalone PDF of all Lean 4 proof files
# Re-run this whenever a .lean file in paper/proofs/ changes.
# The build_omnibus.py and build_thesis.py scripts also call this
# automatically, so 'make omnibus' and 'make thesis' are always current.
# ---------------------------------------------------------------------------

lean-appendix: | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/build_lean_appendix.py
	$(PANDOC) soma/lean-proofs-appendix/lean-proofs-appendix.md \
		-o $(BUILDDIR)/lean-proofs-appendix.pdf \
		$(PANDOC_A4) --syntax-highlighting=tango
	@echo "Built: $(BUILDDIR)/lean-proofs-appendix.pdf"

# ---------------------------------------------------------------------------
# Thesis targets disabled — omnibus is the canonical release format.
# Sources (build_thesis.py, preamble) and flags kept for reference.
# To re-enable: uncomment below and add thesis targets back to .PHONY.
# ---------------------------------------------------------------------------

# THESIS_FLAGS_BASE := $(RENDER_COMMON) \
# 	--toc-depth=3 \
# 	-V header-includes="\usepackage{amsmath}\usepackage{amssymb}"
#
# THESIS_ROYAL_FLAGS := $(THESIS_FLAGS_BASE) \
# 	$(CITEPROC) \
# 	-V "geometry=paperwidth=156mm,paperheight=234mm,twoside,inner=22mm,outer=18mm,top=22mm,bottom=25mm,bindingoffset=8mm" \
# 	-V fontsize=10pt \
# 	-V linestretch=1.3
#
# THESIS_A4_FLAGS := $(THESIS_FLAGS_BASE) \
# 	$(CITEPROC) \
# 	-V "geometry=a4paper,twoside,inner=28mm,outer=20mm,top=20mm,bottom=22mm" \
# 	-V fontsize=11pt \
# 	-V linestretch=1.4
#
# THESIS_A4_COMPACT_FLAGS := $(THESIS_FLAGS_BASE) \
# 	$(CITEPROC) \
# 	-V "geometry=a4paper,twoside,inner=22mm,outer=20mm,top=20mm,bottom=22mm" \
# 	-V fontsize=10pt \
# 	-V linestretch=1.35
#
# thesis-royal: | $(BUILDDIR)
# 	$(PYTHON) $(SCRIPTS)/build_thesis.py
# 	$(PANDOC) $(BUILDDIR)/thesis-body.md -o $(BUILDDIR)/thesis-royal.pdf $(THESIS_ROYAL_FLAGS)
#
# thesis-a4: | $(BUILDDIR)
# 	$(PYTHON) $(SCRIPTS)/build_thesis.py
# 	$(PANDOC) $(BUILDDIR)/thesis-body.md -o $(BUILDDIR)/thesis-a4.pdf $(THESIS_A4_FLAGS)
#
# thesis-a4-compact: | $(BUILDDIR)
# 	$(PYTHON) $(SCRIPTS)/build_thesis.py
# 	$(PANDOC) $(BUILDDIR)/thesis-body.md -o $(BUILDDIR)/thesis-a4-compact.pdf $(THESIS_A4_COMPACT_FLAGS)
#
# thesis-a4-2col: thesis-a4-compact
# thesis: thesis-royal thesis-a4 thesis-a4-compact

translate-omnibus: | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/translate_papers.py omnibus-body --model gpt-4o-mini

translate-omnibus-deepl: | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/translate_papers.py omnibus-body --backend deepl

# ---------------------------------------------------------------------------
# Per-language translate-and-build convenience targets
#   make omnibus-translate-de   — translate to German, build A4 PDF
#   make omnibus-translate-fr   — translate to French,  build A4 PDF
#   make omnibus-translate-it   — translate to Italian, build A4 PDF
#   make omnibus-translate-en   — EN only (redundant alias for 'make omnibus')
#   make omnibus-translate      — all four languages
# Each target runs translation then builds the A4 PDF in one command.
# ---------------------------------------------------------------------------
.PHONY: omnibus-translate-de omnibus-translate-fr omnibus-translate-it omnibus-translate-en omnibus-translate

omnibus-translate-de: | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/translate_papers.py omnibus-body --langs de
	$(PANDOC) $(BUILDDIR)/omnibus-body.de.md -o $(BUILDDIR)/omnibus-a4.de.pdf $(OMNIBUS_A4_FLAGS) -V lang=de
	@echo "Built: $(BUILDDIR)/omnibus-a4.de.pdf"

omnibus-translate-fr: | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/translate_papers.py omnibus-body --langs fr
	$(PANDOC) $(BUILDDIR)/omnibus-body.fr.md -o $(BUILDDIR)/omnibus-a4.fr.pdf $(OMNIBUS_A4_FLAGS) -V lang=fr
	@echo "Built: $(BUILDDIR)/omnibus-a4.fr.pdf"

omnibus-translate-it: | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/translate_papers.py omnibus-body --langs it
	$(PANDOC) $(BUILDDIR)/omnibus-body.it.md -o $(BUILDDIR)/omnibus-a4.it.pdf $(OMNIBUS_A4_FLAGS) -V lang=it
	@echo "Built: $(BUILDDIR)/omnibus-a4.it.pdf"

omnibus-translate-en: omnibus
	@echo "(EN omnibus is 'make omnibus' — already up to date)"

omnibus-translate: omnibus omnibus-translate-de omnibus-translate-fr omnibus-translate-it

define BUILD_OMNIBUS_TRANS_RULE
.PHONY: omnibus-royal-$(1) omnibus-a4-$(1)
omnibus-royal-$(1): | $(BUILDDIR)
	$(PANDOC) $(BUILDDIR)/omnibus-body.$(1).md -o $(BUILDDIR)/omnibus-royal.$(1).pdf $(OMNIBUS_ROYAL_FLAGS) -V lang=$(1)
	@echo "Built: $(BUILDDIR)/omnibus-royal.$(1).pdf"
omnibus-a4-$(1): | $(BUILDDIR)
	$(PANDOC) $(BUILDDIR)/omnibus-body.$(1).md -o $(BUILDDIR)/omnibus-a4.$(1).pdf $(OMNIBUS_A4_FLAGS) -V lang=$(1)
	@echo "Built: $(BUILDDIR)/omnibus-a4.$(1).pdf"
endef
$(foreach l,de fr it,$(eval $(call BUILD_OMNIBUS_TRANS_RULE,$(l))))
omnibus-translations: omnibus-royal-de omnibus-royal-fr omnibus-royal-it omnibus-a4-de omnibus-a4-fr omnibus-a4-it

# --- Rule generation from registry ---
# EN rule: source via vpath; flags + citeproc derived from doc class
define BUILD_EN_RULE
$(BUILDDIR)/$(1).pdf: $(1).md journal.tex unicode-math-text.tex strip-keywords.lua $(if $(filter citeproc,$($(1).class)),$(BIB),) | $(BUILDDIR)
	$(PANDOC) $$< -o $$@ $(if $(filter book,$($(1).class)),$(BOOK_FLAGS),$(FLAGS)) $(if $(filter citeproc,$($(1).class)),$(CITEPROC),)
	@echo "Built: $$@"
endef

# Translation rule: source from bld/; flags derived from doc class × lang
define BUILD_TRANS_RULE
$(BUILDDIR)/$(1).$(2).pdf: $(BUILDDIR)/$(1).$(2).md $(if $(filter citeproc,$($(1).class)),$(BIB),) | $(BUILDDIR)
	$(PANDOC) $$< -o $$@ $(if $(filter book,$($(1).class)),$(BOOK_FLAGS_$(2)),$(FLAGS_$(2))) $(if $(filter citeproc,$($(1).class)),$(CITEPROC),)
	@echo "Built: $$@"
endef

# Translations are retained as dormant tooling, but only English is currently
# supported for candidate and release builds. Set explicitly when translation
# work resumes.
TRANS_LANGS ?=
$(foreach d,$(ALL_DOCS),$(eval $(call BUILD_EN_RULE,$(d))))
$(foreach d,$(ALL_DOCS),$(foreach l,$(TRANS_LANGS),$(if $(filter multi,$($(d).langs)),$(eval $(call BUILD_TRANS_RULE,$(d),$(l))),)))

# The cheatsheet is a self-contained booklet with its own palette and column
# environment; it must not inherit the journal-paper renderer.
$(BUILDDIR)/ttheory-cheatsheet.pdf: soma/ttheory-cheatsheet/ttheory-cheatsheet.md \
	soma/ttheory-cheatsheet/cheatsheet-header.tex | $(BUILDDIR)
	$(PANDOC) $< -o $@ \
		--pdf-engine=$(ENGINE) --standalone \
		--include-in-header=soma/ttheory-cheatsheet/cheatsheet-header.tex \
		--include-in-header=unicode-math-text.tex \
		-V "geometry=a4paper,margin=16mm" \
		-V fontsize=10pt -V linestretch=1.2 \
		-V mainfont="TeX Gyre Pagella"
	@echo "Built: $@"

include mk/utils.mk

# Individual-paper translations — run make translate (LLM) or make translate-deepl first.

translate:
	$(PYTHON) $(SCRIPTS)/translate_papers.py --backend llm

translate-deepl:
	$(PYTHON) $(SCRIPTS)/translate_papers.py --backend deepl

.PHONY: translate translate-deepl

translations: $(PDFS_DE) $(PDFS_FR) $(PDFS_IT)

de: $(PDFS_DE)

fr: $(PDFS_FR)

it: $(PDFS_IT)

translations-clean:
	rm -f $(PDFS_DE) $(PDFS_FR) $(PDFS_IT)

everything-bundle:
	cd .. && ./.venv/Scripts/python.exe scripts/package_everything.py --version v1.0.0

# --- Standard papers (FLAGS only) — pattern rules ---

$(BUILDDIR)/%.de.pdf: $(BUILDDIR)/%.de.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_DE)
	@echo "Built: $@"

$(BUILDDIR)/%.fr.pdf: $(BUILDDIR)/%.fr.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_FR)
	@echo "Built: $@"

$(BUILDDIR)/%.it.pdf: $(BUILDDIR)/%.it.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_IT)
	@echo "Built: $@"
```

## `paper/mk/common.mk`

```makefile
# Shared tool/runtime vars
PANDOC    := pandoc
ENGINE    := xelatex
BIB       := bibliography.bib
CSL       := apa-7th.csl
BUILDDIR  := bld
CITEPROC  := --citeproc --bibliography=$(BIB) --csl=$(CSL)
PYTHON    := /c/Users/alist/.env/Scripts/python.exe
SCRIPTS   := scripts

# API keys — stored in paper/.keys.local (gitignored, never commit this file).
# Format of .keys.local:
#   OPENAI_API_KEY  := sk-...
#   DEEPL_API_KEY   := your-key
#   OPENAI_BASE_URL := https://models.inference.ai.azure.com  # optional
-include .keys.local
export OPENAI_API_KEY
export OPENAI_BASE_URL
export DEEPL_API_KEY

# Shared render core for document-like targets
RENDER_COMMON := \
  --pdf-engine=$(ENGINE) \
  --standalone \
  --toc \
  -V colorlinks=true \
  -V linkcolor=NavyBlue \
  -V urlcolor=NavyBlue \
  -V toccolor=NavyBlue \
  -V hyperxmp=false \
  -V monofont="JetBrains Mono" \
  --syntax-highlighting=tango \
  --include-in-header=journal.tex \
  --lua-filter=strip-keywords.lua

# Core pandoc flags — factor the shared options first, then compose per target
PANDOC_BASE := $(RENDER_COMMON) \
  -V fontsize=11pt \
  -V linestretch=1.6 \
  -V header-includes="\usepackage{amsmath}\usepackage{amssymb}"

PANDOC_NUMBERED    := $(PANDOC_BASE) --number-sections
PANDOC_UNNUMBERED  := $(PANDOC_BASE)
PANDOC_A4          := $(PANDOC_NUMBERED) -V "geometry=a4paper,margin=25mm"
PANDOC_LETTER      := $(PANDOC_NUMBERED) -V "geometry=letterpaper,margin=1.2in"
PANDOC_BOOK        := $(PANDOC_UNNUMBERED) -V "geometry=margin=1.2in"
PANDOC_BOOK_A4     := $(PANDOC_UNNUMBERED) -V "geometry=a4paper,margin=25mm"
PANDOC_BOOK_LETTER := $(PANDOC_UNNUMBERED) -V "geometry=letterpaper,margin=1.2in"

# Two-column journal style for individual papers
# Uses classoption=twocolumn; longtable fix in journal.tex activates automatically
PANDOC_2COL_A4     := $(PANDOC_NUMBERED) \
  -V "geometry=a4paper,twoside,inner=18mm,outer=14mm,top=18mm,bottom=20mm" \
  -V classoption=twocolumn \
  -V fontsize=10pt \
  -V linestretch=1.2

FLAGS := $(PANDOC_A4)

# Book-specific flags — defaults to A4 and includes --number-sections
# so structural numbering comes from pandoc, not heading text.
BOOK_FLAGS := $(PANDOC_BOOK_A4) --number-sections

# Explicit paper-size variants
FLAGS_A4 := $(PANDOC_A4)
FLAGS_LETTER := $(PANDOC_LETTER)
BOOK_FLAGS_A4 := $(PANDOC_BOOK_A4) --number-sections
BOOK_FLAGS_LETTER := $(PANDOC_BOOK_LETTER) --number-sections

# Translation language overlays
FLAGS_DE := $(FLAGS) -V lang=de
FLAGS_FR := $(FLAGS) -V lang=fr
FLAGS_IT := $(FLAGS) -V lang=it

BOOK_FLAGS_DE := $(BOOK_FLAGS) -V lang=de
BOOK_FLAGS_FR := $(BOOK_FLAGS) -V lang=fr
BOOK_FLAGS_IT := $(BOOK_FLAGS) -V lang=it

# Lowercase aliases for rule-generation macros keyed by language codes.
FLAGS_de := $(FLAGS_DE)
FLAGS_fr := $(FLAGS_FR)
FLAGS_it := $(FLAGS_IT)

BOOK_FLAGS_de := $(BOOK_FLAGS_DE)
BOOK_FLAGS_fr := $(BOOK_FLAGS_FR)
BOOK_FLAGS_it := $(BOOK_FLAGS_IT)

# Newline helper — used in foreach-in-recipe to emit one shell command per iteration
define NL


endef

# --- Document registry ---
# $(eval $(call register, id, class, langs, alias))
#   class: paper | citeproc | book
#   langs: en | multi
#   alias: short make target (generates .PHONY + alias → bld/id.pdf)
ALL_DOCS :=

define register
ALL_DOCS += $(strip $(1))
$(strip $(1)).class := $(strip $(2))
$(strip $(1)).langs := $(strip $(3))
$(strip $(1)).alias := $(strip $(4))
vpath %.md soma/$(strip $(1))
$(if $(strip $(4)),.PHONY: $(strip $(4))
$(strip $(4)): $$(BUILDDIR)/$(strip $(1)).pdf)
endef
```

## `paper/journal.tex`

```tex
% journal.tex — Professional journal typography for the SFT / USF papers
% Included via --include-in-header=journal.tex

% 1. Better typography
\usepackage{microtype}
\usepackage{graphicx}

% 2. Fonts (XeLaTeX fontspec)
\setmainfont{TeX Gyre Pagella}[Ligatures=TeX,Numbers=OldStyle]
\setsansfont{Lato}[Ligatures=TeX,BoldFont=Lato Bold]
\setmonofont{JetBrains Mono}
\input{unicode-math-text.tex}

% 3. Colours
\usepackage{xcolor}
\definecolor{heading}{RGB}{26,63,110}
\definecolor{accent}{RGB}{0,160,120}
\definecolor{rulecolor}{RGB}{180,190,200}
% Pre-mixed solid: 4% heading on white — avoids PDF transparency from xcolor mixing
\definecolor{headingbg}{RGB}{246,247,249}

% Defer hyperref colour override
\makeatletter
\AtBeginDocument{\@ifpackageloaded{hyperref}{\hypersetup{linkcolor=heading,citecolor=heading,urlcolor=accent}}{}}
\makeatother

% 4. Section headings  (\needspace prevents orphaned headers at bottom of page)
\usepackage{needspace}
\usepackage{titlesec}
\titleformat{\part}[display]{\needspace{12\baselineskip}\LARGE\bfseries\sffamily\color{heading}\centering}{Part \thepart}{12pt}{\Huge\bfseries}
\titleformat{\chapter}{\needspace{12\baselineskip}\huge\bfseries\sffamily\color{heading}}{\thechapter.}{0.5em}{}[{\color{rulecolor}\hrule height 0.6pt}]
\titleformat{\section}{\needspace{10\baselineskip}\Large\bfseries\sffamily\color{heading}}{\thesection}{0.8em}{{\color{rulecolor}\hrule height 0.6pt}\vspace{3pt}}[]
\titleformat{\subsection}{\needspace{7\baselineskip}\large\bfseries\sffamily\color{heading}}{\thesubsection}{0.8em}{}
\titleformat{\subsubsection}{\needspace{5\baselineskip}\normalsize\itshape\sffamily\color{heading}}{\thesubsubsection}{0.8em}{}
\titlespacing*{\chapter}{0pt}{20pt plus 6pt minus 4pt}{10pt}
\titlespacing*{\section}{0pt}{16pt plus 4pt minus 2pt}{6pt}
\titlespacing*{\subsection}{0pt}{12pt plus 3pt minus 2pt}{3pt}
\titlespacing*{\subsubsection}{0pt}{8pt plus 2pt minus 2pt}{2pt}

% Widow/orphan protection — prevents isolated lines at page top/bottom
\widowpenalty=9999
\clubpenalty=9999
\displaywidowpenalty=9999
\brokenpenalty=10000
\predisplaypenalty=10000
\usepackage{float}
\floatplacement{figure}{H}

% 5. Running headers
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{}
\fancyhead[LE,RO]{\footnotesize\thepage}
\fancyhead[RE]{\footnotesize\sffamily\color{heading}\nouppercase{\leftmark}}
\fancyhead[LO]{\footnotesize\sffamily\color{heading}\nouppercase{\rightmark}}
\renewcommand{\headrulewidth}{0.4pt}
\makeatletter\renewcommand{\headrule}{{\color{rulecolor}\hrule width\headwidth height\headrulewidth}}\makeatother
\setlength{\headheight}{14pt}
\fancypagestyle{plain}{\fancyhf{}\fancyfoot[C]{\footnotesize\thepage}\renewcommand{\headrulewidth}{0pt}}

% 7. Code blocks — syntax colours from tango; no full-width grey background
%    (Background makes narrow columns look wide; colours are enough.)
\makeatletter
\AtBeginDocument{%
  \@ifpackageloaded{fancyvrb}{\fvset{fontsize=\small}}{}%
  \@ifpackageloaded{framed}{%
    \renewenvironment{Shaded}{}{}%   % colours yes, background box no
  }{}%
}
\makeatother

% ---------------------------------------------------------------------------
% 8. Custom title page — minimal, elegant, [T]-Theory branded
%    Sticker: figures/t-theory-sticker.png (60mm, upper right)
%    Layout: sticker | thick rule | title | thin rule | subtitle | author/date
% ---------------------------------------------------------------------------
\usepackage{graphicx}
\makeatletter
\let\old@maketitle\maketitle
\renewcommand{\maketitle}{%
  \begin{titlepage}
    \thispagestyle{empty}
    % Sticker — upper right
    \begin{flushright}
      \IfFileExists{figures/t-theory-sticker-print.png}{%
        \includegraphics[width=55mm]{figures/t-theory-sticker-print.png}%
      }{\IfFileExists{figures/t-theory-sticker.png}{%
        \includegraphics[width=55mm]{figures/t-theory-sticker.png}%
      }{%
        {\sffamily\bfseries\color{heading}\huge[T]}%
      }}
    \end{flushright}
    \vfill
    % Title block
    {\color{heading}\hrule height 2pt}
    \vspace{6mm}
    {\Huge\bfseries\sffamily\color{heading}\@title\par}
    \vspace{4mm}
    {\color{rulecolor}\hrule height 0.6pt}
    \vspace{4mm}
    \@ifundefined{@subtitle}{}{%
      {\large\itshape\color{black!70}\@subtitle\par}%
      \vspace{8mm}%
    }
    \vfill
    {\large\sffamily \@author\par}
    \vspace{2mm}
    {\small\sffamily\color{black!60} Independent Researcher, Zurich, Switzerland\par}
    \vspace{1mm}
    {\small\sffamily\color{accent} ORCID: 0009-0007-2194-0850\par}
    \vspace{4mm}
    {\color{rulecolor}\hrule height 0.4pt}
    \vspace{3mm}
    {\small\sffamily\color{black!60}\@date\par}
  \end{titlepage}
  \clearpage
  \thispagestyle{empty}\null\clearpage
}
\makeatother

% ---------------------------------------------------------------------------
% 9. Physical paper opening sequence
%    Title recto → blank verso → abstract recto → blank verso → TOC recto
%    → first numbered section recto. This is intentionally print-facing.
% ---------------------------------------------------------------------------
\makeatletter
\newcommand{\usfrectostart}{%
  \clearpage
  \ifodd\value{page}
  \else
    \thispagestyle{empty}\null\clearpage
  \fi
}
\let\usf@endabstract\endabstract
\let\usf@abstract\abstract
\renewcommand{\abstract}{\usf@abstract\thispagestyle{empty}}
\AtBeginEnvironment{abstract}{\thispagestyle{empty}}
\AtEndEnvironment{abstract}{\thispagestyle{empty}}
\renewcommand{\endabstract}{%
  \usf@endabstract
  \clearpage
  \thispagestyle{empty}\null\clearpage
}
\let\usf@tableofcontents\tableofcontents
\renewcommand{\tableofcontents}{%
  \pagenumbering{arabic}%
  \setcounter{page}{1}%
  \usf@tableofcontents
  \usfrectostart
}
\usepackage{etoolbox}
\makeatother

% ---------------------------------------------------------------------------
% 10. Lean appendix page-break configuration
%    \leanappendixstart — call once at the start of the Lean proofs appendix.
%    Each \subsection (= each embedded proof file) starts on a new page.
%    Defined here (style/config layer); called from lean-proofs-appendix.md.
% ---------------------------------------------------------------------------
\makeatletter
\newcommand{\leanappendixstart}{%
  \let\lean@subsection\subsection
  \renewcommand{\subsection}[1]{\clearpage\lean@subsection{##1}}%
}
\makeatother

% ---------------------------------------------------------------------------
% 11. Modern blockquote / callout box styling
%     Replaces ASCII box-drawing borders.
%     pandoc `> ` blockquotes render as \begin{quote}...\end{quote}.
%     We restyle these with a navy left rule + italic text.
% ---------------------------------------------------------------------------
\usepackage{mdframed}
\surroundwithmdframed[
  linewidth=2pt,
  linecolor=heading,
  topline=false,
  bottomline=false,
  rightline=false,
  backgroundcolor=headingbg,
  skipabove=10pt,
  skipbelow=10pt,
  innerleftmargin=12pt,
  innerrightmargin=8pt,
  innertopmargin=6pt,
  innerbottommargin=6pt
]{quote}
```

## `paper/omnibus.tex`

```tex
% omnibus.tex — memoir-class header for the USF collected works omnibus.
% Used by: make omnibus-royal / omnibus-a4
% Individual papers use journal.tex (article class) — this file does not affect them.
% memoir replaces titlesec + fancyhdr with its own native systems.

% ── 1. Typography ─────────────────────────────────────────────────────────────
\usepackage{microtype}
\usepackage{graphicx}
\usepackage{needspace}
% Line spacing handled natively by memoir — \linespread needs no package.
% (Avoids the setspace/\setstretch ordering conflict with pandoc's template.)
\linespread{1.32}

% ── 2. Fonts ──────────────────────────────────────────────────────────────────
\setmainfont{TeX Gyre Pagella}[Ligatures=TeX,Numbers=OldStyle]
\setsansfont{Lato}[Ligatures=TeX,BoldFont=Lato Bold]
\setmonofont{JetBrains Mono}
\input{unicode-math-text.tex}

% ── 3. Colour palette ─────────────────────────────────────────────────────────
\usepackage{xcolor}
\definecolor{heading}{RGB}{26,63,110}
\definecolor{accent}{RGB}{0,160,120}
\definecolor{rulecolor}{RGB}{180,190,200}
% Pre-mixed solid: 4% heading on white — avoids PDF transparency from xcolor mixing
\definecolor{headingbg}{RGB}{246,247,249}

\makeatletter
\AtBeginDocument{\@ifpackageloaded{hyperref}{\hypersetup{linkcolor=heading,citecolor=heading,urlcolor=accent}}{}}
\makeatother

% ── 4. Chapter style (memoir native) ──────────────────────────────────────────
% No "Chapter N" label — just number + title + rule, matching journal.tex section style
\makechapterstyle{usf}{%
  \setlength{\beforechapskip}{24pt}%
  \setlength{\afterchapskip}{14pt}%
  \renewcommand{\printchaptername}{}%
  \renewcommand{\chapternamenum}{}%
  \renewcommand{\chapnumfont}{\large\bfseries\sffamily\color{heading}}%
  \renewcommand{\printchapternum}{\chapnumfont\thechapter.\enspace}%
  \renewcommand{\chaptitlefont}{\LARGE\bfseries\sffamily\color{heading}}%
  \renewcommand{\printchaptertitle}[1]{%
    \needspace{6\baselineskip}\chaptitlefont ##1%
    \par\nobreak\vskip 6pt{\color{rulecolor}\hrule height 0.6pt}\vskip 8pt%
  }%
  \renewcommand{\afterchaptertitle}{}%
}
\chapterstyle{usf}

% ── 5. Section / subsection headings ──────────────────────────────────────────
\setsecheadstyle{\needspace{5\baselineskip}\Large\bfseries\sffamily\color{heading}}
\setbeforesecskip{-16pt plus -4pt minus -2pt}
\setaftersecskip{6pt}
\setsubsecheadstyle{\needspace{4\baselineskip}\large\bfseries\sffamily\color{heading}}
\setbeforesubsecskip{-12pt plus -3pt minus -2pt}
\setaftersubsecskip{3pt}
\setsubsubsecheadstyle{\needspace{3\baselineskip}\normalsize\itshape\sffamily\color{heading}}
\setbeforesubsubsecskip{-8pt plus -2pt minus -2pt}
\setaftersubsubsecskip{2pt}

% ── 6. Part style ─────────────────────────────────────────────────────────────
\renewcommand{\partnamefont}{\Large\bfseries\sffamily\color{heading}}
\renewcommand{\partnumfont}{\Large\bfseries\sffamily\color{heading}}
\renewcommand{\parttitlefont}{\Huge\bfseries\sffamily\color{heading}}

% ── 7. Running headers (memoir page style engine) ─────────────────────────────
% Even pages: page# left, PAPER TITLE right
% Odd  pages: SECTION TITLE left, page# right
\setlength{\headheight}{14pt}
\makepagestyle{usf}
\makerunningwidth{usf}{\textwidth}
\makeheadrule{usf}{\textwidth}{0.4pt}
\makeheadfootruleprefix{usf}{\color{rulecolor}}{}
\makeevenhead{usf}{\footnotesize\thepage}{}{\footnotesize\sffamily\textcolor{heading}{\leftmark}}
\makeoddhead{usf}{\footnotesize\sffamily\textcolor{heading}{\rightmark}}{}{\footnotesize\thepage}
% chapter → leftmark (paper title on even pages — "which paper am I in?")
% section → rightmark (section title on odd pages — "where in the paper?")
\createmark{chapter}{left}{nonumber}{}{}
\createmark{section}{right}{nonumber}{}{}
\pagestyle{usf}
\aliaspagestyle{chapter}{usf}
\aliaspagestyle{part}{usf}

% ── 8. Custom title page — [T]-Theory branded (matches journal.tex) ──────────
\makeatletter
\let\omni@old@maketitle\maketitle
\renewcommand{\maketitle}{%
  \begin{titlingpage}
    \thispagestyle{empty}
    \begin{flushright}
      \IfFileExists{figures/t-theory-sticker-print.png}{%
        \includegraphics[width=55mm]{figures/t-theory-sticker-print.png}%
      }{%
        {\sffamily\bfseries\textcolor{heading}{\huge[T]}}%
      }
    \end{flushright}
    \vfill
    {\textcolor{heading}{\hrule height 2pt}}
    \vspace{6mm}
    {\Huge\bfseries\sffamily\textcolor{heading}{\@title}\par}
    \vspace{4mm}
    {\textcolor{rulecolor}{\hrule height 0.6pt}}
    \vspace{4mm}
    \@ifundefined{@subtitle}{}{%
      {\large\itshape\color{black!70}\@subtitle\par}\vspace{8mm}%
    }
    \vfill
    {\large\sffamily\@author\par}
    \vspace{2mm}
    {\small\sffamily\color{black!60}Independent Researcher, Zurich, Switzerland\par}
    \vspace{1mm}
    {\small\sffamily\textcolor{accent}{ORCID: 0009-0007-2194-0850}\par}
    \vspace{4mm}
    {\textcolor{rulecolor}{\hrule height 0.4pt}}
    \vspace{3mm}
    {\small\sffamily\color{black!60}\@date\par}
  \end{titlingpage}
  \cleardoublepage
}
\makeatother

% ── 9. Visible opening for each merged paper ────────────────────────────────
\newcommand{\omnipaperdivider}[2]{%
  \cleardoublepage
  \thispagestyle{empty}%
  \vspace*{0.30\textheight}%
  \begin{center}%
    {\small\sffamily\color{accent}PAPER\par}%
    \vspace{8mm}%
    {\Huge\bfseries\sffamily\color{heading}#1\par}%
    \vspace{7mm}%
    {\color{rulecolor}\rule{0.72\textwidth}{0.6pt}\par}%
    \vspace{5mm}%
    {\small\sffamily\color{black!60}#2\par}%
  \end{center}%
  \clearpage
}

% ── 10. Blockquote styling (left-rule callout, matching journal.tex) ──────────
\usepackage{mdframed}
\surroundwithmdframed[%
  linewidth=2pt, linecolor=heading,
  topline=false, bottomline=false, rightline=false,
  backgroundcolor=headingbg,
  skipabove=10pt, skipbelow=10pt,
  innerleftmargin=12pt, innerrightmargin=8pt,
  innertopmargin=6pt, innerbottommargin=6pt]{quote}

% ── 11. Widow / orphan ───────────────────────────────────────────────────────
\widowpenalty=9999
\clubpenalty=9999
\displaywidowpenalty=9999

% ── 12. Code blocks ───────────────────────────────────────────────────────────
\makeatletter
\AtBeginDocument{%
  \@ifpackageloaded{fancyvrb}{\fvset{fontsize=\small}}{}%
  \@ifpackageloaded{framed}{\renewenvironment{Shaded}{}{}}{}%
}
\makeatother

% ── 13. Lean appendix helper (used by lean-proofs-appendix content) ──────────
% In the omnibus, single-column — the column-switch is a no-op.
\newcommand{\leanappendixstart}{}
```

## `paper/scripts/build_omnibus.py`

```python
#!/usr/bin/env python3
"""Build the C1v2 merged omnibus from Dist/PAPERS.yaml.

PAPERS.yaml owns the collection's identity, ordered membership, and part
openings. This script only turns that registry data and paper sources into a
single merged Markdown manuscript for Pandoc.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
PAPER_DIR = REPO_ROOT / "paper"
BLD_DIR = PAPER_DIR / "bld"
REGISTRY_PATH = REPO_ROOT.parent / "Dist" / "PAPERS.yaml"
COLLECTION_ID = "C1v2"

_FRONTMATTER = re.compile(r"^---\n[\s\S]*?\n---\n\n?", re.MULTILINE)
_REFERENCES = re.compile(r"\n#{1,3}\s+References\b[\s\S]*$", re.IGNORECASE)


def fail(message: str) -> None:
    print(f"ERROR  {message}", file=sys.stderr)
    raise SystemExit(1)


def load_registry() -> tuple[dict[str, object], dict[str, dict[str, object]]]:
    registry = yaml.safe_load(REGISTRY_PATH.read_text(encoding="utf-8")) or {}
    collection = next(
        (entry for entry in registry.get("collections", []) if entry.get("id") == COLLECTION_ID),
        None,
    )
    if not collection:
        fail(f"collection not found in registry: {COLLECTION_ID}")
    entries = {
        entry["slug"]: entry
        for section in ("canonical_papers", "datasets")
        for entry in registry.get(section, [])
        if entry.get("slug")
    }
    members = collection.get("members")
    if not isinstance(members, list) or not members:
        fail(f"{COLLECTION_ID} requires a non-empty members list in PAPERS.yaml")
    slugs = [member.get("slug") for member in members]
    if any(not slug for slug in slugs) or len(slugs) != len(set(slugs)):
        fail(f"{COLLECTION_ID} members must have unique non-empty slugs")
    missing = [slug for slug in slugs if slug not in entries]
    if missing:
        fail(f"registry members not found in canonical records: {', '.join(missing)}")
    return collection, entries


def collection_frontmatter(collection: dict[str, object]) -> str:
    required = ("title", "author", "orcid", "institute", "date", "description")
    missing = [field for field in required if not collection.get(field)]
    if missing:
        fail(f"{COLLECTION_ID} missing front-matter fields: {', '.join(missing)}")
    metadata = {field: collection[field] for field in required}
    metadata.update({"bibliography": "bibliography.bib", "csl": "apa-7th.csl"})
    return "---\n" + yaml.safe_dump(
        metadata, allow_unicode=True, default_flow_style=False, sort_keys=False
    ) + "---"


def source_path(slug: str) -> Path:
    return PAPER_DIR / "soma" / slug / f"{slug}.md"


def body(slug: str) -> str:
    path = source_path(slug)
    if not path.is_file():
        fail(f"missing omnibus member source: {path}")
    text = _FRONTMATTER.sub("", path.read_text(encoding="utf-8"), count=1)
    text = _REFERENCES.sub("", text)
    return re.sub(r"^(#{1,5})(?= )", r"#\1", text, flags=re.MULTILINE).strip()


def latex_text(value: object) -> str:
    return str(value).replace("\\", r"\textbackslash{}").replace("&", r"\&").replace("%", r"\%").replace("_", r"\_")


def divider(title: str, slug: str) -> str:
    return "\n\n```{=latex}\n" + f"\\omnipaperdivider{{{latex_text(title)}}}{{{latex_text(slug)}}}\n" + "```\n"


def abstract(value: object) -> str:
    return f"\n\n## Abstract\n\n{str(value).strip()}\n" if value else ""


def main() -> None:
    BLD_DIR.mkdir(exist_ok=True)
    collection, entries = load_registry()
    sections = [collection_frontmatter(collection)]

    for member in collection["members"]:
        slug = member["slug"]
        entry = entries[slug]
        part = member.get("part")
        if part:
            prefix = "\\cleardoublepage\n\n"
            if member.get("appendix"):
                prefix += "\\appendix\n\n"
            sections.append(prefix + f"\\part{{{latex_text(part)}}}\n")
        source_body = body(slug)
        sections.append(divider(str(entry["title"]), slug))
        sections.append(abstract(entry.get("abstract")))
        sections.append(f"\n\n# {entry['title']}\n\n{source_body}\n")
        print(f"  + {slug}")

    output = "\n".join(sections)
    target = BLD_DIR / "omnibus-body.md"
    target.write_text(output, encoding="utf-8")
    print(f"Written: {target.relative_to(REPO_ROOT)}")
    print(f"  Papers merged: {len(collection['members'])}")
    print(f"  Registry: {COLLECTION_ID} ({REGISTRY_PATH.name})")


if __name__ == "__main__":
    main()
```

## `paper/scripts/check_omnibus_format.py`

```python
#!/usr/bin/env python3
"""Verify the registry-driven merged C1v2 omnibus format contract."""

from __future__ import annotations

import re
import shutil
import subprocess
from pathlib import Path

import yaml

PAPER_DIR = Path(__file__).resolve().parent.parent
U_ROOT = PAPER_DIR.parent
REGISTRY = U_ROOT.parent / "Dist" / "PAPERS.yaml"
BODY = PAPER_DIR / "bld" / "omnibus-body.md"
PDF = PAPER_DIR / "bld" / "omnibus-a4.pdf"


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def page_text(page: int) -> str:
    return subprocess.run(
        ["pdftotext", "-f", str(page), "-l", str(page), "-layout", str(PDF), "-"],
        check=True,
        capture_output=True,
        text=True,
    ).stdout


def collection() -> dict[str, object]:
    registry = yaml.safe_load(REGISTRY.read_text(encoding="utf-8")) or {}
    value = next((entry for entry in registry.get("collections", []) if entry.get("id") == "C1v2"), None)
    if not value:
        fail("C1v2 collection missing from PAPERS.yaml")
    return value


def main() -> None:
    if not BODY.is_file() or not PDF.is_file():
        fail("missing merged omnibus source or PDF")
    if shutil.which("pdftotext") is None:
        fail("pdftotext is unavailable")

    c1v2 = collection()
    members = c1v2.get("members")
    if not isinstance(members, list) or not members:
        fail("C1v2 has no registered members")

    body = BODY.read_text(encoding="utf-8")
    if "\\includepdf[" in body or "papers-collection.md" in body:
        fail("facsimile PDF inclusion remains in merged omnibus source")
    if body.count("\\tableofcontents") != 0:
        fail("merged source must not inject a second master table of contents")
    if str(c1v2["title"]) not in body:
        fail("registry C1v2 title missing from merged source")

    dividers = re.findall(r"\\omnipaperdivider\{.*?\}\{([^}]+)\}", body, re.DOTALL)
    slugs = [member["slug"] for member in members]
    if dividers != slugs:
        fail("paper divider order differs from C1v2 members")
    for member in members:
        if member.get("part") and f"\\part{{{member['part']}}}" not in body:
            fail(f"registered part opening missing: {member['part']}")

    if page_text(2).strip():
        fail("physical page 2 is not a blank inside cover")
    if "Contents" not in page_text(3):
        fail("physical page 3 does not begin the sole master contents")
    if "Contents" in page_text(5):
        fail("master contents repeats after its initial run")

    print(f"PASS  C1v2 registry title and {len(slugs)} ordered members drive merged source")
    print("PASS  no facsimile imports or duplicate master contents")
    print("PASS  registered parts and paper dividers match registry order")
    print("PASS  title, blank inside cover, and sole master contents structure")


if __name__ == "__main__":
    main()
```

## `paper/scripts/check_individual_format.py`

```python
#!/usr/bin/env python3
"""Verify the physical title-page/abstract contract for an individual paper."""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

PAPER_DIR = Path(__file__).resolve().parent.parent


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def page_text(pdf: Path, start: int, end: int | None = None) -> str:
    end = start if end is None else end
    command = ["pdftotext", "-f", str(start), "-l", str(end), "-layout", str(pdf), "-"]
    return subprocess.run(command, check=True, capture_output=True, text=True).stdout


def physical_pages(pdf: Path) -> list[str]:
    info = subprocess.run(["pdfinfo", str(pdf)], check=True, capture_output=True, text=True).stdout
    match = re.search(r"^Pages:\s+(\d+)$", info, re.MULTILINE)
    if not match:
        fail(f"could not determine PDF page count: {pdf}")
    return [page_text(pdf, page_number) for page_number in range(1, int(match.group(1)) + 1)]


def first_heading(pdf: Path) -> str:
    source = PAPER_DIR / "soma" / pdf.stem / f"{pdf.stem}.md"
    text = source.read_text(encoding="utf-8")
    text = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.DOTALL)
    match = re.search(r"^# ([^\n]+)", text, re.MULTILINE)
    if not match:
        fail(f"no level-one heading found in source: {source}")
    return match.group(1).strip()


def headings(source: Path, level: int) -> list[str]:
    text = source.read_text(encoding="utf-8")
    text = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.DOTALL)
    pattern = rf"^{'#' * level} ([^\n]+)"
    return re.findall(pattern, text, re.MULTILINE)


def heading_text(heading: str) -> str:
    heading = re.sub(r"^\d+(?:\.\d+)*\s+", "", heading)
    heading = heading.replace("—", "--").replace("–", "--")
    heading = heading.replace("→", "").replace("⇒", "")
    heading = heading.replace("δ", "").replace("Δ", "")
    heading = heading.translate(str.maketrans("₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹", "01234567890123456789"))
    heading = re.sub(r"\s*\[@[^]]+\]", "", heading)
    heading = re.sub(r"\$.*?\$", "", heading)
    return heading.strip()


def body_heading_specs(source: Path) -> list[tuple[int, str]]:
    """Return structural body headings, excluding a duplicated title H1."""
    text = source.read_text(encoding="utf-8")
    frontmatter = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    title_match = re.search(r"^title:\s*[\"']?(.+?)[\"']?\s*$", frontmatter.group(1), re.MULTILINE) if frontmatter else None
    metadata_title = heading_text(title_match.group(1)) if title_match else ""
    text = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.DOTALL)
    entries = [
        (len(marker), heading)
        for marker, heading in re.findall(r"^(#{1,3}) ([^\n]+)", text, re.MULTILINE)
    ]
    if entries and entries[0][0] == 1 and heading_text(entries[0][1]) == metadata_title:
        return entries[1:]
    return entries


def normalized_page(page: str) -> str:
    return (
        page.replace("\u00ad", "--")
        .replace("—", "--")
        .replace("–", "--")
        .replace("→", "")
        .replace("⇒", "")
        .replace("δ", "")
        .replace("Δ", "")
        .translate(str.maketrans("₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹", "01234567890123456789"))
    )


def heading_in_page(heading: str, page: str) -> bool:
    page = normalized_page(page)
    if heading in page:
        return True
    words = re.findall(r"[A-Za-z]{3,}", heading)
    return bool(words) and all(word in page for word in words)


def structural_heading_in_page(heading: str, page: str) -> bool:
    opening = "\n".join(normalized_page(page).splitlines()[:35])
    blocks = re.split(r"\n\s*\n", opening)
    for block_index in range(len(blocks)):
        wrapped = " ".join(blocks[block_index : block_index + 3])
        candidate = " ".join(line.strip() for line in wrapped.splitlines() if line.strip())
        candidate = re.sub(r"\s+", " ", candidate)
        candidate = re.sub(r"^(?:\d+(?:\.\d+)*\s+)+", "", candidate)
        if heading in candidate:
            return True
        if heading_in_page(heading, candidate):
            words = re.findall(r"[A-Za-z]{3,}", heading)
            if "  " in heading and words and all(word in candidate for word in words):
                return True
    return False


def body_lines(page: str) -> list[str]:
    return [line.strip() for line in page.splitlines() if line.strip()]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path, help="PDF path, relative to paper/ or absolute")
    args = parser.parse_args()

    pdf = args.pdf if args.pdf.is_absolute() else PAPER_DIR / args.pdf
    if not pdf.is_file():
        fail(f"missing PDF: {pdf}")
    if shutil.which("pdftotext") is None:
        fail("pdftotext is unavailable")

    page_1 = page_text(pdf, 1)
    page_2 = page_text(pdf, 2)
    page_3 = page_text(pdf, 3)
    page_4 = page_text(pdf, 4)
    page_5 = page_text(pdf, 5)
    if not page_1.strip():
        fail("physical page 1 has no title-page content")
    if page_2.strip():
        fail("physical page 2 is not a blank inside cover")
    if "Abstract" not in page_3:
        fail("physical page 3 does not begin the abstract")
    if "Contents" in page_3:
        fail("physical page 3 mixes abstract with contents")
    first_abstract_line = next((line.strip() for line in page_3.splitlines() if line.strip()), "")
    if re.fullmatch(r"\d+", first_abstract_line):
        fail("abstract recto has a visible printed folio")
    if page_4.strip():
        fail("physical page 4 is not a blank abstract verso")
    if "Contents" not in page_5:
        fail("physical page 5 does not begin the contents")
    if not re.search(r"\bContents\s+1\b|\b1\s+Contents\b", page_5):
        fail("contents does not begin its own printed page sequence at 1")
    source = PAPER_DIR / "soma" / pdf.stem / f"{pdf.stem}.md"
    heading = first_heading(pdf)
    all_pages = physical_pages(pdf)
    last_contents_page = 5
    for page_number in range(6, len(all_pages) + 1):
        if "Contents" not in all_pages[page_number - 1]:
            break
        last_contents_page = page_number
    body_start_page = last_contents_page + 1
    body_pages = all_pages[body_start_page - 1 :]
    specs = body_heading_specs(source)
    first_level, first_heading_text = specs[0]
    first_text = heading_text(first_heading_text)
    section_page = next(
        (index + body_start_page for index, page in enumerate(body_pages) if structural_heading_in_page(first_text, page)),
        None,
    )
    if section_page is None:
        fail(f"first section heading not found in PDF: {first_text}")
    if section_page % 2 == 0:
        fail(f"first numbered section is not recto: page {section_page}")

    for level, heading in specs:
        if level > 2:
            continue
        text = heading_text(heading)
        if text.lower() in {"references", "bibliography"}:
            continue
        page = next((page for page in body_pages if heading_in_page(text, page)), None)
        if page is None:
            fail(f"heading not found in PDF: {text}")
        normalized = normalized_page(page)
        following = normalized.split(text, 1)[1].strip() if text in normalized else normalized
        if len(re.sub(r"\s+", "", following)) < 80:
            fail(f"heading is orphaned at page bottom: {text}")

    for page_number, (previous, current) in enumerate(zip(all_pages, all_pages[1:]), 1):
        if page_number < body_start_page:
            continue
        previous_lines = [line for line in body_lines(previous) if not re.fullmatch(r"\d+", line)]
        current_lines = [line for line in body_lines(current) if not re.fullmatch(r"\d+", line)]
        if not previous_lines or not current_lines:
            continue
        if previous_lines[-1].endswith("-") and re.match(r"^[a-z]", current_lines[0]):
            fail(f"hyphenated word crosses physical pages {page_number} and {page_number + 1}")
        if re.fullmatch(r"[A-Za-z]{1,12}", previous_lines[-1]) and re.match(r"^[a-z]", current_lines[0]):
            fail(f"one-word paragraph continuation crosses physical pages {page_number} and {page_number + 1}")

    for page_number, page in enumerate(all_pages[section_page - 1 :], section_page):
        if not page.strip():
            fail(f"blank page inside paper body: physical page {page_number}")

    print("PASS  cover, blank verso, unnumbered abstract recto, blank verso, and contents recto")
    print("PASS  contents begins its own printed page sequence at 1")
    print("PASS  first body section begins recto")
    print("PASS  level-one and level-two headings retain body text on their page")
    print("PASS  no hyphenated or one-word paragraph continuation crosses a physical page boundary")
    print("PASS  no blank page occurs inside the paper body")


if __name__ == "__main__":
    main()
```

## `paper/scripts/check_paper_references.py`

```python
#!/usr/bin/env python3
"""Enforce registry-owned citation and bibliography requirements for one paper."""

from __future__ import annotations

import argparse
import re
import subprocess
from pathlib import Path

import yaml

PAPER_DIR = Path(__file__).resolve().parent.parent
U_ROOT = PAPER_DIR.parent
REGISTRY = U_ROOT.parent / "Dist" / "PAPERS.yaml"


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def registry_entry(slug: str) -> dict[str, object]:
    registry = yaml.safe_load(REGISTRY.read_text(encoding="utf-8")) or {}
    for section in registry.values():
        if isinstance(section, list):
            for entry in section:
                if entry.get("slug") == slug:
                    return entry
    fail(f"paper is not registered: {slug}")


def pdf_text(pdf: Path) -> str:
    return subprocess.run(
        ["pdftotext", "-layout", str(pdf), "-"], check=True, capture_output=True, text=True
    ).stdout


def cited_keys(source_text: str) -> set[str]:
    keys: set[str] = set()
    for citation in re.findall(r"\[(-?@[^\]]+)\]", source_text):
        for key in re.findall(r"-?@([A-Za-z0-9:_-]+)", citation):
            keys.add(key)
    return keys


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paper", help="registered paper slug")
    parser.add_argument("--pdf", type=Path, required=True)
    args = parser.parse_args()

    entry = registry_entry(args.paper)
    if entry.get("references") == "none":
        print(f"PASS  registry explicitly exempts {args.paper} from references")
        return
    minimum = int(entry.get("references_minimum", 5))

    pdf = args.pdf if args.pdf.is_absolute() else PAPER_DIR / args.pdf
    if not pdf.is_file():
        fail(f"missing PDF: {pdf}")

    text = pdf_text(pdf)
    match = re.search(r"(?im)^\s*(?:\d+(?:\.\d+)*\s+)?References\s*$([\s\S]*)", text)
    if not match:
        fail(f"rendered PDF has no References heading: {pdf.relative_to(U_ROOT)}")
    entries = [line.strip() for line in match.group(1).splitlines() if line.strip()]
    entries = [line for line in entries if not re.fullmatch(r"\d+|REFERENCES", line)]
    if len(entries) < minimum:
        fail(
            f"rendered References section has {len(entries)} content line(s); "
            f"registry requires at least {minimum}: {pdf.relative_to(U_ROOT)}"
        )

    print(f"PASS  {args.paper} has {len(entries)} rendered reference content line(s) (minimum {minimum})")


if __name__ == "__main__":
    main()
```

## `paper/scripts/check_paper_figures.py`

```python
#!/usr/bin/env python3
"""Reject missing or placeholder PNG figures referenced by one paper source."""

from __future__ import annotations

import argparse
import re
import struct
import subprocess
import tempfile
from pathlib import Path

PAPER_DIR = Path(__file__).resolve().parent.parent
PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def png_dimensions(path: Path) -> tuple[int, int]:
    with path.open("rb") as image:
        header = image.read(24)
    if header[:8] != PNG_SIGNATURE or header[12:16] != b"IHDR":
        fail(f"not a valid PNG: {path}")
    return struct.unpack(">II", header[16:24])


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paper", help="paper source slug")
    parser.add_argument("--pdf", type=Path, help="rendered PDF to inspect")
    args = parser.parse_args()

    source = PAPER_DIR / "soma" / args.paper / f"{args.paper}.md"
    if not source.is_file():
        fail(f"missing source: {source}")

    references = re.findall(r"\]\((figures/[^)\s]+)", source.read_text(encoding="utf-8"))
    if not references:
        fail(f"no figure references in source: {source.name}")

    for reference in references:
        asset = PAPER_DIR / reference
        if not asset.is_file():
            fail(f"missing figure asset: {reference}")
        width, height = png_dimensions(asset)
        if width < 100 or height < 100:
            fail(f"placeholder-sized figure asset: {reference} ({width}x{height})")
        print(f"PASS  {reference} ({width}x{height})")

    if args.pdf:
        pdf = args.pdf if args.pdf.is_absolute() else PAPER_DIR / args.pdf
        with tempfile.TemporaryDirectory() as temporary_directory:
            result = subprocess.run(
                ["pdfimages", "-list", str(pdf), str(Path(temporary_directory) / "figure")],
                check=True,
                capture_output=True,
                text=True,
            )
        embedded_pages = {
            int(page)
            for page, width, height in re.findall(
                r"page=(\d+)\s+width=(\d+)\s+height=(\d+)", result.stdout
            )
            if int(width) >= 100 and int(height) >= 100
        }
        if len(embedded_pages) < len(references):
            fail(
                f"only {len(embedded_pages)} rendered pages have full-size images; "
                f"expected at least {len(references)}"
            )
        print(f"PASS  {len(embedded_pages)} rendered PDF pages contain full-size figures")

    print(f"PASS  {len(references)} referenced figures are renderable PNG assets")


if __name__ == "__main__":
    main()
```

## `paper/scripts/check_stale_problem_labels.py`

```python
#!/usr/bin/env python3
"""Reject stale numbered-problem labels for resolved implementation work."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path

PAPER_DIR = Path(__file__).resolve().parent.parent
REPO_ROOT = PAPER_DIR.parent

STALE_LABELS = (
    "Open Problem 3",
    "open_problem_3_progress",
    "Problem 3: The `FieldLayerType` Functor Upgrade",
    "Problem 4: Path-Dependence in Moduli Space",
    "4 of 21 scales upgraded",
    "pending Open Problem 3 closure",
)


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def check_text(path: Path, text: str) -> None:
    for label in STALE_LABELS:
        if label in text:
            fail(f"stale resolved-problem label in {path.relative_to(REPO_ROOT)}: {label}")


def pdf_text(path: Path) -> str:
    return subprocess.run(
        ["pdftotext", "-layout", str(path), "-"],
        check=True,
        capture_output=True,
        text=True,
    ).stdout


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", type=Path, action="append", default=[])
    args = parser.parse_args()

    source_paths = [
        PAPER_DIR / "soma" / "zoomable-somatic-field" / "zoomable-somatic-field.md",
        PAPER_DIR / "proofs" / "ScaleUniverse.lean",
    ]
    for path in source_paths:
        check_text(path, path.read_text(encoding="utf-8"))
        print(f"PASS  no stale resolved-problem labels in {path.relative_to(REPO_ROOT)}")

    for candidate in args.pdf:
        if candidate.is_absolute():
            pdf = candidate
        elif (PAPER_DIR / candidate).is_file():
            pdf = PAPER_DIR / candidate
        else:
            pdf = REPO_ROOT / candidate
        if not pdf.is_file():
            fail(f"missing candidate PDF: {pdf}")
        check_text(pdf, pdf_text(pdf))
        print(f"PASS  no stale resolved-problem labels in {pdf.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
```

## `paper/scripts/stage_uat.py`

```python
#!/usr/bin/env python3
"""Stage explicit UAT candidate PDFs and record their hashes."""

from __future__ import annotations

import argparse
import hashlib
import shutil
from pathlib import Path

import yaml

U_ROOT = Path(__file__).resolve().parent.parent.parent
MANIFEST = U_ROOT / "uat" / "manifest.yaml"
STAGING_ROOT = U_ROOT / "uat" / "staging"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for block in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("track", choices=("papers", "ttheory"))
    args = parser.parse_args()

    manifest = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))
    track = manifest[args.track]
    staging_dir = STAGING_ROOT / args.track
    staging_dir.mkdir(parents=True, exist_ok=True)

    staged = []
    source_paths = [("PDF", relative_path) for relative_path in track["files"]]
    if track.get("worksheet"):
        source_paths.append(("Worksheet", track["worksheet"]))
    if track.get("readme"):
        source_paths.append(("Instructions", track["readme"]))
    for relative_path in track.get("context_files", []):
        source_paths.append(("Context", relative_path))

    for kind, relative_path in source_paths:
        source = U_ROOT / relative_path
        if not source.is_file():
            raise FileNotFoundError(f"Missing candidate: {relative_path}")
        destination = staging_dir / source.name
        shutil.copy2(source, destination)
        staged.append((kind, relative_path, destination.name, sha256(destination)))

    lines = [
        f"# UAT Staging: {args.track}",
        "",
        track["purpose"],
        "",
        "| Type | Source | Staged file | SHA-256 |",
        "|---|---|---|---|",
    ]
    lines.extend(
        f"| {kind} | `{source}` | `{name}` | `{digest}` |"
        for kind, source, name, digest in staged
    )
    (staging_dir / "MANIFEST.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Staged {len(staged)} artifact(s): {staging_dir.relative_to(U_ROOT)}")


if __name__ == "__main__":
    main()
```
