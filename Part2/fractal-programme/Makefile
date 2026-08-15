# Fractal Programme Makefile — 15 domain books
PYTHON  := /c/Users/alist/.env/Scripts/python.exe
PANDOC  := pandoc
ENGINE  := xelatex
BUILDDIR := bld

BOOK_FLAGS := \
  --pdf-engine=$(ENGINE) --standalone --toc-depth=2 \
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

# Cheatsheet flags — standalone per-domain reference card with parchment style
CHEATSHEET_FLAGS := \
  --pdf-engine=$(ENGINE) --standalone \
  --include-in-header=../../paper/soma/ttheory-cheatsheet/cheatsheet-header.tex \
  --include-in-header=ttheory-packages.tex \
  -V "geometry=a4paper,margin=16mm" \
  -V fontsize=10pt -V linestretch=1.2 \
  -V mainfont="TeX Gyre Pagella"

NOIR_FLAGS := \
  --pdf-engine=$(ENGINE) --standalone \
  --include-in-header=noir-header.tex \
  -V "geometry=a4paper,margin=0.5in" \
  -V mainfont="TeX Gyre Pagella"

# Noir standalone — the art-deco red-pill page, pre-built so it can be \includepdf'd
bld/noir-page.pdf: noir-page.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(NOIR_FLAGS)
	@echo "Built: $@"

bld/cheatsheet-%.pdf: cheatsheets/cheatsheet-%.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(CHEATSHEET_FLAGS)
	@echo "Built cheatsheet: $@"

# Domain book depends on its pre-built cheatsheet (and noir for gateway)
bld/book-gateway.pdf: bld/book-gateway-body.md bld/noir-page.pdf bld/cheatsheet-gateway.pdf | $(BUILDDIR)
	$(PANDOC) bld/book-gateway-body.md -o $@ $(BOOK_FLAGS)
	@echo "Built: $@"

bld/book-%.pdf: bld/book-%-body.md bld/cheatsheet-%.pdf | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS)
	@echo "Built: $@"

$(BUILDDIR)/book-%-body.md: FORCE | $(BUILDDIR)
	$(PYTHON) build_fractal_books.py $*

all: $(addprefix $(BUILDDIR)/book-, $(addsuffix .pdf, $(DOMAINS)))
	@echo "All 15 fractal books built."

fractal-thesis: $(BUILDDIR)/ttheory-omnibus.pdf
	@echo "T-Theory fractal thesis built."

vol1: $(BUILDDIR)/ttheory-vol1.pdf
	@echo "T-Theory Vol I: Foundation built."

vol2: $(BUILDDIR)/ttheory-vol2.pdf
	@echo "T-Theory Vol II: Application built."

$(BUILDDIR)/ttheory-vol1-body.md: FORCE | $(BUILDDIR)
	$(PYTHON) build_fractal_books.py --vol1

$(BUILDDIR)/ttheory-vol2-body.md: FORCE | $(BUILDDIR)
	$(PYTHON) build_fractal_books.py --vol2

$(BUILDDIR)/ttheory-vol1.pdf: $(BUILDDIR)/ttheory-vol1-body.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(VOLUME_FLAGS)
	@echo "Built: $@"

$(BUILDDIR)/ttheory-vol2.pdf: $(BUILDDIR)/ttheory-vol2-body.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(VOLUME_FLAGS)
	@echo "Built: $@"

$(BUILDDIR)/ttheory-omnibus-body.md: FORCE | $(BUILDDIR)
	$(PYTHON) build_fractal_books.py --omnibus

# Omnibus flags — TOC confirmed working despite document size
OMNIBUS_FLAGS := \
  --pdf-engine=$(ENGINE) --standalone --toc-depth=2 \
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

# Volume flags — same as omnibus (TOC already included)
VOLUME_FLAGS := $(OMNIBUS_FLAGS)

$(BUILDDIR)/ttheory-omnibus.pdf: $(BUILDDIR)/ttheory-omnibus-body.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(OMNIBUS_FLAGS)
	@echo "Built: $@"

kappas:
	export OPENAI_API_KEY=$$(gh auth token) && \
	export OPENAI_BASE_URL=https://models.inference.ai.azure.com && \
	$(PYTHON) build_fractal_books.py --kappas

bodies:
	$(PYTHON) build_fractal_books.py

$(BUILDDIR):
	mkdir -p $(BUILDDIR)

clean:
	rm -f $(BUILDDIR)/book-*.pdf $(BUILDDIR)/book-*-body.md $(BUILDDIR)/ttheory-omnibus* $(BUILDDIR)/ttheory-vol*

.PHONY: all fractal-thesis vol1 vol2 kappas bodies clean FORCE $(addprefix book-, $(DOMAINS))
FORCE:
