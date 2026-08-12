# Fractal Programme Makefile — 15 domain books
PYTHON  := /c/Users/alist/.env/Scripts/python.exe
PANDOC  := pandoc
ENGINE  := xelatex
BUILDDIR := bld

BOOK_FLAGS := \
  --pdf-engine=$(ENGINE) --standalone --toc --toc-depth=2 \
  -V colorlinks=true -V linkcolor=NavyBlue -V urlcolor=NavyBlue \
  -V monofont="Consolas" --highlight-style=tango \
  --include-in-header=../../paper/journal.tex \
  --lua-filter=../../paper/strip-keywords.lua \
  --citeproc --bibliography=../../paper/bibliography.bib \
  --csl=../../paper/apa-7th.csl \
  -V "geometry=a4paper,twoside,inner=22mm,outer=20mm,top=20mm,bottom=22mm" \
  -V fontsize=11pt -V linestretch=1.4 \
  -V header-includes="\usepackage{amsmath}\usepackage{amssymb}"

DOMAINS := gateway physics neuroscience clinical-psychology computer-science \
           formal-mathematics consciousness complex-systems music-arts \
           geophysics social-science economics law ppe psychiatry-asd

$(BUILDDIR)/book-%-body.md: FORCE | $(BUILDDIR)
	$(PYTHON) build_fractal_books.py $*

$(BUILDDIR)/book-%.pdf: $(BUILDDIR)/book-%-body.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS)
	@echo "Built: $@"

$(addprefix book-, $(DOMAINS)): book-%: $(BUILDDIR)/book-%.pdf

all: $(addprefix $(BUILDDIR)/book-, $(addsuffix .pdf, $(DOMAINS)))
	@echo "All 15 fractal books built."

omnibus: $(BUILDDIR)/ttheory-omnibus.pdf
	@echo "T-Theory omnibus built."

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
  --pdf-engine=$(ENGINE) --standalone --toc --toc-depth=2 \
  -V colorlinks=true -V linkcolor=NavyBlue -V urlcolor=NavyBlue \
  -V monofont="Consolas" --highlight-style=tango \
  --include-in-header=../../paper/journal.tex \
  --include-in-header=ttheory-titlepage.tex \
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

.PHONY: all omnibus vol1 vol2 kappas bodies clean FORCE $(addprefix book-, $(DOMAINS))
FORCE:
