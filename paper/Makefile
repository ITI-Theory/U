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
#   make               # build all English PDFs (default)
#   make main          # build main academic paper only
#   make pov           # build patient-POV paper only
#   make book          # build coffee-table book
#   make clean         # remove generated English PDFs
#   make check         # verify dependencies
#
# Translations (stub files — full translations in progress):
#   make de            # build all 6 German PDFs
#   make fr            # build all 6 French PDFs
#   make it            # build all 6 Italian PDFs
#   make translations  # build all 18 translation PDFs
#   make translations-clean  # remove translation PDFs
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

SOURCES := soma-field-paper.md soma-field-patient-pov.md quantum-soma-penrose.md
PDFS    := $(SOURCES:.md=.pdf)

# -----------------------------------------------------------------------------

.PHONY: all main pov book tensor method music clean check setup freeze \
	de fr it translations translations-clean everything-bundle

all: $(PDFS) soma-field-book.pdf the-tensor.pdf mathematical-co-identification.pdf music-affect-dynamics.pdf

main: soma-field-paper.pdf

pov: soma-field-patient-pov.pdf

book: soma-field-book.pdf

tensor: the-tensor.pdf

method: mathematical-co-identification.pdf

music: music-affect-dynamics.pdf

music-affect-dynamics.pdf: music-affect-dynamics.md $(BIB)
	$(PANDOC) $< -o $@ $(FLAGS) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

mathematical-co-identification.pdf: mathematical-co-identification.md $(BIB)
	$(PANDOC) $< -o $@ $(FLAGS) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

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
	rm -f $(PDFS) soma-field-book.pdf the-tensor.pdf mathematical-co-identification.pdf music-affect-dynamics.pdf

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
# =============================================================================
# Translations — DE / FR / IT
# =============================================================================
# Stub .md files live alongside the English sources:
#   soma-field-paper.de.md, soma-field-paper.fr.md, soma-field-paper.it.md etc.
# Run: make translations   (all 18 PDFs)
#      make de             (6 German PDFs)
#      make fr             (6 French PDFs)
#      make it             (6 Italian PDFs)
#      make translations-clean
# =============================================================================

FLAGS_DE := $(FLAGS) -V lang=de
FLAGS_FR := $(FLAGS) -V lang=fr
FLAGS_IT := $(FLAGS) -V lang=it

BOOK_FLAGS_DE := $(BOOK_FLAGS) -V lang=de
BOOK_FLAGS_FR := $(BOOK_FLAGS) -V lang=fr
BOOK_FLAGS_IT := $(BOOK_FLAGS) -V lang=it

PDFS_DE := soma-field-paper.de.pdf soma-field-book.de.pdf soma-field-patient-pov.de.pdf \
		   mathematical-co-identification.de.pdf the-tensor.de.pdf music-affect-dynamics.de.pdf \
		   quantum-soma-penrose.de.pdf

PDFS_FR := soma-field-paper.fr.pdf soma-field-book.fr.pdf soma-field-patient-pov.fr.pdf \
		   mathematical-co-identification.fr.pdf the-tensor.fr.pdf music-affect-dynamics.fr.pdf \
		   quantum-soma-penrose.fr.pdf

PDFS_IT := soma-field-paper.it.pdf soma-field-book.it.pdf soma-field-patient-pov.it.pdf \
		   mathematical-co-identification.it.pdf the-tensor.it.pdf music-affect-dynamics.it.pdf \
		   quantum-soma-penrose.it.pdf

translations: $(PDFS_DE) $(PDFS_FR) $(PDFS_IT)

de: $(PDFS_DE)

fr: $(PDFS_FR)

it: $(PDFS_IT)

translations-clean:
	rm -f $(PDFS_DE) $(PDFS_FR) $(PDFS_IT)

everything-bundle:
	cd .. && ./.venv/Scripts/python.exe scripts/package_everything.py --version v1.0.0

# --- German ---

soma-field-paper.de.pdf: soma-field-paper.de.md
	$(PANDOC) $< -o $@ $(FLAGS_DE)
	@echo "Built: $@"

soma-field-book.de.pdf: soma-field-book.de.md
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_DE)
	@echo "Built: $@"

soma-field-patient-pov.de.pdf: soma-field-patient-pov.de.md
	$(PANDOC) $< -o $@ $(FLAGS_DE)
	@echo "Built: $@"

mathematical-co-identification.de.pdf: mathematical-co-identification.de.md $(BIB)
	$(PANDOC) $< -o $@ $(FLAGS_DE) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

the-tensor.de.pdf: the-tensor.de.md
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_DE)
	@echo "Built: $@"

music-affect-dynamics.de.pdf: music-affect-dynamics.de.md $(BIB)
	$(PANDOC) $< -o $@ $(FLAGS_DE) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

quantum-soma-penrose.de.pdf: quantum-soma-penrose.de.md
	$(PANDOC) $< -o $@ $(FLAGS_DE)
	@echo "Built: $@"

# --- French ---

soma-field-paper.fr.pdf: soma-field-paper.fr.md
	$(PANDOC) $< -o $@ $(FLAGS_FR)
	@echo "Built: $@"

soma-field-book.fr.pdf: soma-field-book.fr.md
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_FR)
	@echo "Built: $@"

soma-field-patient-pov.fr.pdf: soma-field-patient-pov.fr.md
	$(PANDOC) $< -o $@ $(FLAGS_FR)
	@echo "Built: $@"

mathematical-co-identification.fr.pdf: mathematical-co-identification.fr.md $(BIB)
	$(PANDOC) $< -o $@ $(FLAGS_FR) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

the-tensor.fr.pdf: the-tensor.fr.md
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_FR)
	@echo "Built: $@"

music-affect-dynamics.fr.pdf: music-affect-dynamics.fr.md $(BIB)
	$(PANDOC) $< -o $@ $(FLAGS_FR) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

quantum-soma-penrose.fr.pdf: quantum-soma-penrose.fr.md
	$(PANDOC) $< -o $@ $(FLAGS_FR)
	@echo "Built: $@"

# --- Italian ---

soma-field-paper.it.pdf: soma-field-paper.it.md
	$(PANDOC) $< -o $@ $(FLAGS_IT)
	@echo "Built: $@"

soma-field-book.it.pdf: soma-field-book.it.md
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_IT)
	@echo "Built: $@"

soma-field-patient-pov.it.pdf: soma-field-patient-pov.it.md
	$(PANDOC) $< -o $@ $(FLAGS_IT)
	@echo "Built: $@"

mathematical-co-identification.it.pdf: mathematical-co-identification.it.md $(BIB)
	$(PANDOC) $< -o $@ $(FLAGS_IT) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

the-tensor.it.pdf: the-tensor.it.md
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_IT)
	@echo "Built: $@"

music-affect-dynamics.it.pdf: music-affect-dynamics.it.md $(BIB)
	$(PANDOC) $< -o $@ $(FLAGS_IT) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

quantum-soma-penrose.it.pdf: quantum-soma-penrose.it.md
	$(PANDOC) $< -o $@ $(FLAGS_IT)
	@echo "Built: $@"
