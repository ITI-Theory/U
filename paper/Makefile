# =============================================================================
# Soma-Field Papers — PDF Build System
# =============================================================================
# Dependencies:
#   pandoc  >= 3.0     (https://pandoc.org)
#   xelatex            (texlive-xetex or miktex)
#   curl               (for 'make setup')
#
# Quick start:
#   make setup         # download APA 7th CSL (once only)
#   make               # build all PDFs
#   make main          # build main academic paper only
#   make pov           # build patient-POV paper only
#   make book          # build coffee-table book
#   make clean         # remove generated PDFs
#   make check         # verify dependencies
#
# Citation management:
#   Bibliography data : bibliography.bib  (BibTeX format)
#   Citation style    : apa-7th.csl       (CSL/XML — APA 7th edition)
#   Inline format     : [@damasio1994]    (pandoc citeproc syntax)
#
#   The papers currently use manually-formatted references. To switch to
#   automatic citation management, convert inline citations to [@key] format
#   and uncomment CITE_FLAGS below.
# =============================================================================

PANDOC  := pandoc
ENGINE  := xelatex
BIB     := bibliography.bib
CSL     := apa-7th.csl

# Core pandoc flags — applied to both papers
FLAGS := \
  --pdf-engine=$(ENGINE) \
  --standalone \
  --toc \
  --number-sections \
  -V geometry:margin=1.2in \
  -V fontsize=12pt \
  -V linestretch=1.6 \
  -V colorlinks=true \
  -V linkcolor=NavyBlue \
  -V urlcolor=NavyBlue \
  -V toccolor=NavyBlue \
  -V hyperxmp=false \
  -V monofont="Consolas" \
  -V header-includes="\usepackage{amsmath}\usepackage{amssymb}" \
  --lua-filter=strip-keywords.lua

# Uncomment when inline citations are converted to [@key] format:
# CITE_FLAGS := --citeproc --bibliography=$(BIB) --csl=$(CSL)

# Book-specific flags — same as FLAGS but without --number-sections
# (chapter/part headings already carry their own numbering)
BOOK_FLAGS := \
  --pdf-engine=$(ENGINE) \
  --standalone \
  --toc \
  -V geometry:margin=1.2in \
  -V fontsize=12pt \
  -V linestretch=1.6 \
  -V colorlinks=true \
  -V linkcolor=NavyBlue \
  -V urlcolor=NavyBlue \
  -V toccolor=NavyBlue \
  -V hyperxmp=false \
  -V monofont="Consolas" \
  -V header-includes="\usepackage{amsmath}\usepackage{amssymb}" \
  --lua-filter=strip-keywords.lua

SOURCES := soma-field-paper.md soma-field-patient-pov.md
PDFS    := $(SOURCES:.md=.pdf)

# -----------------------------------------------------------------------------

.PHONY: all main pov book tensor clean check setup freeze

all: $(PDFS) soma-field-book.pdf the-tensor.pdf

main: soma-field-paper.pdf

pov: soma-field-patient-pov.pdf

book: soma-field-book.pdf

tensor: the-tensor.pdf

soma-field-book.pdf: soma-field-book.md
	$(PANDOC) $< -o $@ $(BOOK_FLAGS)
	@echo "Built: $@"

the-tensor.pdf: the-tensor.md
	$(PANDOC) $< -o $@ $(BOOK_FLAGS)
	@echo "Built: $@"

%.pdf: %.md $(BIB)
	$(PANDOC) $< -o $@ $(FLAGS) # $(CITE_FLAGS)
	@echo "Built: $@"

# -----------------------------------------------------------------------------
# Utility targets

clean:
	rm -f $(PDFS) soma-field-book.pdf the-tensor.pdf

# Download APA 7th edition CSL from the official CSL repository (run once)
setup: $(CSL)

$(CSL):
	curl -fsSL \
	  https://raw.githubusercontent.com/citation-style-language/styles/master/apa.csl \
	  -o $(CSL)
	@echo "Downloaded: $(CSL)"

# Freeze working files as a dated snapshot (e.g. make freeze FILE=soma-field-paper.md)
freeze:
	@test -n "$(FILE)" || (echo "Usage: make freeze FILE=soma-field-paper.md"; exit 1)
	cp $(FILE) $(FILE:.md=.V$(shell date +%Y%m%d).md)
	@echo "Frozen: $(FILE:.md=.V$(shell date +%Y%m%d).md)"

check:
	@command -v $(PANDOC) >/dev/null 2>&1 \
	  && echo "OK: pandoc $$(pandoc --version | head -1)" \
	  || (echo "MISSING: pandoc — https://pandoc.org/installing.html"; exit 1)
	@command -v $(ENGINE) >/dev/null 2>&1 \
	  && echo "OK: $(ENGINE)" \
	  || (echo "MISSING: $(ENGINE) — install texlive-xetex (Linux) or MiKTeX (Windows)"; exit 1)
	@test -f $(BIB) \
	  && echo "OK: $(BIB)" \
	  || echo "WARN: $(BIB) not found — citations will not resolve"
	@test -f $(CSL) \
	  && echo "OK: $(CSL)" \
	  || echo "WARN: $(CSL) not found — run 'make setup' to download"
