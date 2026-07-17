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
  -V monofont="Consolas" \
  --highlight-style=tango \
  --include-in-header=journal.tex \
  --lua-filter=strip-keywords.lua

# Core pandoc flags — factor the shared options first, then compose per target
PANDOC_BASE := $(RENDER_COMMON) \
  -V fontsize=12pt \
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
