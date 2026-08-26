# [T]-Theory books Makefile
PANDOC  := pandoc
PANDOC_EOL := --eol=lf
ENGINE  := xelatex
GS      ?= gswin64c
BUILDDIR := bld
FORMAT_DIR := ../../lib/format
BOOKLET_HEADER := format/cheatsheet-header.tex
GATEWAY_SOURCE := gateway/gateway.md
FORMAT_FILTERS := --lua-filter=$(FORMAT_DIR)/macros.lua
FORMAT_CSS := $(FORMAT_DIR)/site.css
COMPLEX_SYSTEMS_SOURCE := complex-systems/book-complex-systems.md
BOOKLET_SOURCES := $(wildcard */booklet-*.md)

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

ALL_BOOKLET_PAGES := $(foreach domain,$(DOMAINS),$(addprefix $(BUILDDIR)/booklet-$(domain)-,$(addsuffix .pdf,1 2 3 4)))

.SECONDARY: $(addprefix $(BUILDDIR)/booklet-, $(addsuffix .pdf, $(DOMAINS)))

NOIR_FLAGS := \
  --pdf-engine=$(ENGINE) --standalone \
  --include-in-header=noir-header.tex \
  -V "geometry=a4paper,margin=0.5in" \
  -V mainfont="TeX Gyre Pagella"

# Noir standalone — the art-deco red-pill page, pre-built so it can be \includepdf'd
bld/noir-page.pdf: noir-page.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(NOIR_FLAGS)
	@echo "Built: $@"

# The public Gateway is rendered directly from its canonical Markdown source.
bld/booklet-gateway.pdf: $(GATEWAY_SOURCE) $(FORMAT_DIR)/macros.lua | $(BUILDDIR)
	$(PANDOC) $< -o $@ \
		--pdf-engine=$(ENGINE) --standalone \
		--include-in-header=../../paper/unicode-math-text.tex \
		$(FORMAT_FILTERS) \
		-V "geometry=a4paper,margin=16mm" \
		-V fontsize=10pt -V linestretch=1.2 \
		-V mainfont="TeX Gyre Pagella" \
		--pdf-engine-opt="-output-directory=$(abspath $(BUILDDIR))"
	@echo "Built domain booklet: $@"

.PHONY: gateway-html
gateway-html: $(BUILDDIR)/booklet-gateway.html

$(BUILDDIR)/booklet-gateway.html: $(GATEWAY_SOURCE) $(FORMAT_DIR)/macros.lua $(FORMAT_CSS) | $(BUILDDIR)
	$(PANDOC) $< -o $@ --standalone --embed-resources --mathjax $(PANDOC_EOL) \
		$(FORMAT_FILTERS) \
				--css=../../lib/format/site.css \
		-M title="[T]-Theory: A Universal Theory of Everything"
	@echo "Built Gateway HTML: $@"

define BOOKLET_PAGE_RULE
bld/booklet-%-$(1).pdf: bld/booklet-%.pdf | $(BUILDDIR)
	$(GS) -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dNOPAUSE -dBATCH \
		-dFirstPage=$(1) -dLastPage=$(1) -sOutputFile=$$@ $$<
	@echo "Prepared booklet page $(1): $$@"
endef
$(foreach page,1 2 3 4,$(eval $(call BOOKLET_PAGE_RULE,$(page))))

# Gateway alone includes the noir page. Every domain book uses its own booklet.
bld/book-gateway.pdf: bld/book-gateway-body.md bld/noir-page.pdf \
  bld/booklet-gateway-1.pdf bld/booklet-gateway-2.pdf \
  bld/booklet-gateway-3.pdf bld/booklet-gateway-4.pdf | $(BUILDDIR)
	$(PANDOC) bld/book-gateway-body.md -o $@ $(BOOK_FLAGS)
	@echo "Built: $@"

# First Make/Pandoc-native book: its source visibly defines its complete order.
bld/book-complex-systems.pdf: $(COMPLEX_SYSTEMS_SOURCE) $(FORMAT_DIR)/macros.lua | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS) --toc --lua-filter=$(FORMAT_DIR)/macros.lua
	@echo "Built: $@"


.SECONDEXPANSION:
bld/booklet-%.pdf: $$(wildcard */booklet-$$*.md) books.yaml booklet/booklet_body.md $(BOOKLET_HEADER) $(FORMAT_DIR)/macros.lua | $(BUILDDIR)
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
