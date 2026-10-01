# [T]-Theory books Makefile
PANDOC  := pandoc
PYTHON  ?= python
PANDOC_EOL := --eol=lf
ENGINE  := xelatex
GS      ?= gswin64c
BUILDDIR := bld
FORMAT_DIR := ../../lib/format
BOOKLET_HEADER := format/cheatsheet-header.tex
FORMAT_FILTERS := --lua-filter=$(FORMAT_DIR)/macros.lua
FORMAT_CSS := $(FORMAT_DIR)/site.css
BOOKLET_SOURCES := $(wildcard */booklet-*.md)
BOOK_SOURCES := $(wildcard */book-*.md)

define MKDIR_P
mkdir -p "$(1)"
endef

BOOK_FLAGS := \
  --pdf-engine=$(ENGINE) --standalone --toc-depth=2 \
	--resource-path=../../paper \
  -V colorlinks=true -V linkcolor=NavyBlue -V urlcolor=NavyBlue \
  -V monofont="Consolas" --highlight-style=tango \
  --include-in-header=../../paper/journal.tex \
  --include-in-header=ttheory-titlepage.tex \
  --include-in-header=ttheory-packages.tex \
  --lua-filter=../../paper/strip-keywords.lua \
  --citeproc --bibliography=../../paper/bibliography.bib \
  --csl=../../paper/apa-7th.csl \
  -V "geometry=a4paper,twoside,inner=22mm,outer=20mm,top=20mm,bottom=22mm" \
  -V fontsize=11pt -V linestretch=1.4 \
  -V header-includes="\usepackage{amsmath}\usepackage{amssymb}"

DOMAINS := gateway physics complex-systems formal-mathematics \
           neuroscience consciousness computer-science \
           music-arts clinical-psychology psychiatry-asd \
           social-science geophysics law ppe economics

# The consciousness domain is the source-owned philosophy book; its cheat
# sheet is the philosophy booklet.
BOOKLET_DOMAINS := $(subst consciousness,philosophy,$(DOMAINS))

ALL_BOOKLET_PAGES := $(foreach domain,$(BOOKLET_DOMAINS),$(addprefix $(BUILDDIR)/booklet-$(domain)-,$(addsuffix .pdf,1 2 3 4)))

.SECONDARY: $(addprefix $(BUILDDIR)/booklet-, $(addsuffix .pdf, $(BOOKLET_DOMAINS)))

NOIR_FLAGS := \
  --pdf-engine=$(ENGINE) --standalone \
  --include-in-header=noir-header.tex \
  -V "geometry=a4paper,margin=0.5in" \
  -V mainfont="TeX Gyre Pagella"

# Noir standalone — the art-deco red-pill page, pre-built so it can be \includepdf'd
bld/noir-page.pdf: noir-page.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(NOIR_FLAGS)
	@echo "Built: $@"

define BOOKLET_PAGE_RULE
$(filter %-$(1).pdf,$(ALL_BOOKLET_PAGES)): bld/booklet-%-$(1).pdf: bld/booklet-%.pdf | $(BUILDDIR)
	$(GS) -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dNOPAUSE -dBATCH \
		-dFirstPage=$(1) -dLastPage=$(1) -sOutputFile=$$@ $$<
	@echo "Prepared booklet page $(1): $$@"
endef
$(foreach page,1 2 3 4,$(eval $(call BOOKLET_PAGE_RULE,$(page))))

.SECONDEXPANSION:
$(BOOKLET_DOMAINS:%=bld/booklet-%.pdf): bld/booklet-%.pdf: $$(wildcard */booklet-$$*.md) books.yaml booklet/booklet_body.md $(BOOKLET_HEADER) $(FORMAT_DIR)/macros.lua | $(BUILDDIR)
	$(PANDOC) $< -o $@ \
		--pdf-engine=$(ENGINE) --standalone \
		--metadata-file=books.yaml \
		--include-in-header=$(BOOKLET_HEADER) \
		--include-in-header=../../paper/unicode-math-text.tex \
		--lua-filter=$(FORMAT_DIR)/macros.lua \
		-V "geometry=a4paper,margin=16mm" \
		-V fontsize=10pt -V linestretch=1.2 \
		-V mainfont="TeX Gyre Pagella"
	@echo "Built domain booklet: $@"

bld/booklet-%.html: $$(wildcard */booklet-$$*.md) $(FORMAT_DIR)/macros.lua $(FORMAT_CSS) | $(BUILDDIR)
	$(PANDOC) $< -o $@ --standalone --embed-resources --mathjax $(PANDOC_EOL) \
		--lua-filter=$(FORMAT_DIR)/macros.lua \
		--css=$(FORMAT_DIR)/site.css
	@echo "Built domain booklet HTML: $@"

# Source-owned books (`<domain>/book-<id>.md`) are built directly. A static
# pattern keeps this rule from capturing generated books, which are assembled
# by build_fractal_books.py through `bld/book-%-body.md`.
SOURCE_BOOK_IDS := $(patsubst book-%.md,%,$(notdir $(filter-out bld/%,$(wildcard */book-*.md))))
SOURCE_BOOK_PDFS := $(filter-out bld/book-gateway.pdf,$(SOURCE_BOOK_IDS:%=bld/book-%.pdf))

$(SOURCE_BOOK_PDFS): bld/book-%.pdf: $$(wildcard */book-$$*.md) bld/booklet-%.pdf $(FORMAT_DIR)/macros.lua | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS) --toc --lua-filter=$(FORMAT_DIR)/macros.lua
	@echo "Built domain book: $@"

# The registry names the philosophy volume by its original domain id.
bld/book-consciousness.pdf: bld/book-philosophy.pdf
	$(PYTHON) -c "import shutil, sys; shutil.copyfile(sys.argv[1], sys.argv[2])" $< $@
	@echo "Built: $@ (from $<)"

bld/book-gateway.pdf: gateway/book-gateway.md bld/noir-page.pdf bld/booklet-gateway.pdf format/gateway-template.tex $(FORMAT_DIR)/macros.lua | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS) --toc --template=format/gateway-template.tex \
		-V gateway-noir="$(abspath bld/noir-page.pdf)" --lua-filter=$(FORMAT_DIR)/macros.lua
	@echo "Built Gateway book: $@"

bld/book-%.html: $$(wildcard */book-$$*.md) $(FORMAT_DIR)/macros.lua $(FORMAT_CSS) | $(BUILDDIR)
	$(PANDOC) $< -o $@ --standalone --embed-resources --mathjax $(PANDOC_EOL) \
		--lua-filter=$(FORMAT_DIR)/macros.lua \
		--css=$(FORMAT_DIR)/site.css
	@echo "Built domain book HTML: $@"

bld/book-%.pdf: bld/book-%-body.md bld/booklet-%-1.pdf \
  bld/booklet-%-2.pdf bld/booklet-%-3.pdf bld/booklet-%-4.pdf | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS)
	@echo "Built: $@"

define BOOK_ALIAS
.PHONY: book-$(1)
book-$(1): bld/book-$(1).pdf
endef
$(foreach domain,$(DOMAINS),$(eval $(call BOOK_ALIAS,$(domain))))

$(BUILDDIR)/book-%-body.md: FORCE | $(BUILDDIR)
	$(PYTHON) build_fractal_books.py $*

all: $(addprefix $(BUILDDIR)/book-, $(addsuffix .pdf, $(DOMAINS)))
	@echo "All 15 fractal books built."

fractal-thesis: $(BUILDDIR)/ttheory-omnibus.pdf
	@echo "T-Theory fractal thesis built."

vol1: $(BUILDDIR)/ttheory-vol1.pdf
	@echo "T-Theory Vol I: Foundation built."

vol1-10pt: $(BUILDDIR)/ttheory-vol1-10pt.pdf
	@echo "T-Theory Vol I: Foundation 10pt comparison built."

vol2: $(BUILDDIR)/ttheory-vol2.pdf
	@echo "T-Theory Vol II: Application built."

$(BUILDDIR)/ttheory-vol1-body.md: FORCE | $(BUILDDIR)
	$(PYTHON) build_fractal_books.py --vol1

$(BUILDDIR)/ttheory-vol2-body.md: FORCE | $(BUILDDIR)
	$(PYTHON) build_fractal_books.py --vol2

$(BUILDDIR)/ttheory-vol1.pdf: $(BUILDDIR)/ttheory-vol1-body.md $(ALL_BOOKLET_PAGES) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(VOLUME_FLAGS)
	@echo "Built: $@"

$(BUILDDIR)/ttheory-vol1-10pt.pdf: $(BUILDDIR)/ttheory-vol1-body.md $(ALL_BOOKLET_PAGES) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(VOLUME_10PT_FLAGS)
	@echo "Built: $@"

$(BUILDDIR)/ttheory-vol2.pdf: $(BUILDDIR)/ttheory-vol2-body.md $(ALL_BOOKLET_PAGES) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(VOLUME_FLAGS)
	@echo "Built: $@"

$(BUILDDIR)/ttheory-omnibus-body.md: FORCE | $(BUILDDIR)
	$(PYTHON) build_fractal_books.py --omnibus

# Omnibus flags — TOC confirmed working despite document size
OMNIBUS_FLAGS := \
  --pdf-engine=$(ENGINE) --standalone --toc-depth=2 \
	--resource-path=../../paper \
  -V colorlinks=true -V linkcolor=NavyBlue -V urlcolor=NavyBlue \
  -V monofont="Consolas" --highlight-style=tango \
  --include-in-header=../../paper/journal.tex \
  --include-in-header=ttheory-titlepage.tex \
  --include-in-header=ttheory-packages.tex \
  --lua-filter=../../paper/strip-keywords.lua \
  --citeproc --bibliography=../../paper/bibliography.bib \
  --csl=../../paper/apa-7th.csl \
  -V "geometry=a4paper,twoside,inner=22mm,outer=20mm,top=20mm,bottom=22mm" \
  -V fontsize=11pt -V linestretch=1.39 \
  -V header-includes="\usepackage{amsmath}\usepackage{amssymb}\usepackage{placeins}"

# Print volumes use 10pt for a denser A4 book format. The Fractal omnibus,
# individual domain books, and all Papers outputs retain their 11pt profiles.
VOLUME_FLAGS := $(subst -V fontsize=11pt,-V fontsize=10pt,$(OMNIBUS_FLAGS))
VOLUME_10PT_FLAGS := $(VOLUME_FLAGS)

$(BUILDDIR)/ttheory-omnibus.pdf: $(BUILDDIR)/ttheory-omnibus-body.md $(ALL_BOOKLET_PAGES) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(OMNIBUS_FLAGS)
	@echo "Built: $@"

kappas:
	export OPENAI_API_KEY=$$(gh auth token) && \
	export OPENAI_BASE_URL=https://models.inference.ai.azure.com && \
	$(PYTHON) build_fractal_books.py --kappas

bodies:
	$(PYTHON) build_fractal_books.py

$(BUILDDIR):
	$(call MKDIR_P,$(BUILDDIR))

clean:
	rm -f $(BUILDDIR)/book-*.pdf $(BUILDDIR)/book-*-body.md $(BUILDDIR)/ttheory-omnibus* $(BUILDDIR)/ttheory-vol*

.PHONY: all fractal-thesis vol1 vol1-10pt vol2 kappas bodies clean FORCE
FORCE:
