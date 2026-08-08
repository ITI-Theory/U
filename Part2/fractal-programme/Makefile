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

$(BUILDDIR)/ttheory-omnibus-body.md: FORCE | $(BUILDDIR)
	$(PYTHON) build_fractal_books.py --omnibus

# Omnibus uses simpler flags — no TOC (too large for single-pass XeLaTeX)
OMNIBUS_FLAGS := \
  --pdf-engine=$(ENGINE) --standalone \
  -V colorlinks=true -V linkcolor=NavyBlue -V urlcolor=NavyBlue \
  -V monofont="Consolas" --highlight-style=tango \
  --include-in-header=../../paper/journal.tex \
  --lua-filter=../../paper/strip-keywords.lua \
  --citeproc --bibliography=../../paper/bibliography.bib \
  --csl=../../paper/apa-7th.csl \
  -V "geometry=a4paper,twoside,inner=22mm,outer=20mm,top=20mm,bottom=22mm" \
  -V fontsize=11pt -V linestretch=1.4 \
  -V header-includes="\usepackage{amsmath}\usepackage{amssymb}\usepackage{placeins}"

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
	rm -f $(BUILDDIR)/book-*.pdf $(BUILDDIR)/book-*-body.md $(BUILDDIR)/ttheory-omnibus*

.PHONY: all omnibus kappas bodies clean FORCE $(addprefix book-, $(DOMAINS))
FORCE:
