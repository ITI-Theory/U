# Shared tool/runtime vars for the papers build.
include ../lib/mk/paths.mk

PANDOC ?= pandoc
ENGINE ?= xelatex
PYTHON ?= python
SCRIPTS := scripts
BIB := bibliography.bib
CSL := apa-7th.csl
BUILDDIR := $(PAPERS_BLD)
DEFAULTS := defaults

-include local.mk

# API keys — stored in paper/.keys.local (gitignored, never commit this file).
# Format of .keys.local:
#   OPENAI_API_KEY  := sk-...
#   DEEPL_API_KEY   := your-key
#   OPENAI_BASE_URL := https://models.inference.ai.azure.com  # optional
-include .keys.local
export OPENAI_API_KEY
export OPENAI_BASE_URL
export DEEPL_API_KEY

PDF_A4_DEFAULTS := --defaults=$(DEFAULTS)/pdf-a4.yaml
PDF_2COL_DEFAULTS := --defaults=$(DEFAULTS)/pdf-2col.yaml
BOOK_DEFAULTS := --defaults=$(DEFAULTS)/book.yaml
OMNIBUS_DEFAULTS := --defaults=$(DEFAULTS)/omnibus.yaml
HTML_DEFAULTS := --defaults=$(DEFAULTS)/html.yaml

FLAGS := $(PDF_A4_DEFAULTS)
BOOK_FLAGS := $(BOOK_DEFAULTS)
FLAGS_A4 := $(PDF_A4_DEFAULTS)
BOOK_FLAGS_A4 := $(BOOK_DEFAULTS)
FLAGS_LETTER := $(PDF_A4_DEFAULTS)
BOOK_FLAGS_LETTER := $(BOOK_DEFAULTS)

FLAGS_DE := $(PDF_A4_DEFAULTS) --metadata=lang:de
FLAGS_FR := $(PDF_A4_DEFAULTS) --metadata=lang:fr
FLAGS_IT := $(PDF_A4_DEFAULTS) --metadata=lang:it
BOOK_FLAGS_DE := $(BOOK_DEFAULTS) --metadata=lang:de
BOOK_FLAGS_FR := $(BOOK_DEFAULTS) --metadata=lang:fr
BOOK_FLAGS_IT := $(BOOK_DEFAULTS) --metadata=lang:it
FLAGS_de := $(FLAGS_DE)
FLAGS_fr := $(FLAGS_FR)
FLAGS_it := $(FLAGS_IT)
BOOK_FLAGS_de := $(BOOK_FLAGS_DE)
BOOK_FLAGS_fr := $(BOOK_FLAGS_FR)
BOOK_FLAGS_it := $(BOOK_FLAGS_IT)

define NL


endef

# --- Document registry ---
# $(eval $(call register, id, class, langs, alias))
#   class: paper | citeproc | book
#   langs: en | multi
#   alias: short make target (generates .PHONY + alias → bld/papers/id.pdf)
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
