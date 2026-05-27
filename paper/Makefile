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
BUILDDIR := bld

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
PDFS    := $(addprefix $(BUILDDIR)/, $(SOURCES:.md=.pdf))

# -----------------------------------------------------------------------------

.PHONY: all main pov book tensor method music synthesis clean check setup freeze \
	de fr it translations translations-clean everything-bundle

all: $(BUILDDIR) $(PDFS) $(BUILDDIR)/soma-field-book.pdf $(BUILDDIR)/the-tensor.pdf $(BUILDDIR)/mathematical-co-identification.pdf $(BUILDDIR)/music-affect-dynamics.pdf $(BUILDDIR)/soma-field-synthesis.pdf

main: $(BUILDDIR)/soma-field-paper.pdf

pov: $(BUILDDIR)/soma-field-patient-pov.pdf

book: $(BUILDDIR)/soma-field-book.pdf

tensor: $(BUILDDIR)/the-tensor.pdf

method: $(BUILDDIR)/mathematical-co-identification.pdf

music: $(BUILDDIR)/music-affect-dynamics.pdf

synthesis: $(BUILDDIR)/soma-field-synthesis.pdf

$(BUILDDIR)/music-affect-dynamics.pdf: music-affect-dynamics.md $(BIB) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

$(BUILDDIR)/soma-field-synthesis.pdf: soma-field-synthesis.md $(BIB) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

$(BUILDDIR)/mathematical-co-identification.pdf: mathematical-co-identification.md $(BIB) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

$(BUILDDIR)/soma-field-book.pdf: soma-field-book.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS)
	@echo "Built: $@"

$(BUILDDIR)/the-tensor.pdf: the-tensor.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS)
	@echo "Built: $@"

$(BUILDDIR)/%.pdf: %.md $(BIB) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS) # $(CITE_FLAGS)
	@echo "Built: $@"

# -----------------------------------------------------------------------------
# Utility targets

$(BUILDDIR):
	@mkdir -p $@

clean:
	rm -rf $(BUILDDIR)

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

PDFS_DE := $(addprefix $(BUILDDIR)/, \
		   soma-field-paper.de.pdf soma-field-book.de.pdf soma-field-patient-pov.de.pdf \
		   mathematical-co-identification.de.pdf the-tensor.de.pdf music-affect-dynamics.de.pdf \
		   quantum-soma-penrose.de.pdf)

PDFS_FR := $(addprefix $(BUILDDIR)/, \
		   soma-field-paper.fr.pdf soma-field-book.fr.pdf soma-field-patient-pov.fr.pdf \
		   mathematical-co-identification.fr.pdf the-tensor.fr.pdf music-affect-dynamics.fr.pdf \
		   quantum-soma-penrose.fr.pdf)

PDFS_IT := $(addprefix $(BUILDDIR)/, \
		   soma-field-paper.it.pdf soma-field-book.it.pdf soma-field-patient-pov.it.pdf \
		   mathematical-co-identification.it.pdf the-tensor.it.pdf music-affect-dynamics.it.pdf \
		   quantum-soma-penrose.it.pdf)

translations: $(PDFS_DE) $(PDFS_FR) $(PDFS_IT)

de: $(PDFS_DE)

fr: $(PDFS_FR)

it: $(PDFS_IT)

translations-clean:
	rm -f $(PDFS_DE) $(PDFS_FR) $(PDFS_IT)

everything-bundle:
	cd .. && ./.venv/Scripts/python.exe scripts/package_everything.py --version v1.0.0

# --- German ---

$(BUILDDIR)/soma-field-paper.de.pdf: soma-field-paper.de.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_DE)
	@echo "Built: $@"

$(BUILDDIR)/soma-field-book.de.pdf: soma-field-book.de.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_DE)
	@echo "Built: $@"

$(BUILDDIR)/soma-field-patient-pov.de.pdf: soma-field-patient-pov.de.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_DE)
	@echo "Built: $@"

$(BUILDDIR)/mathematical-co-identification.de.pdf: mathematical-co-identification.de.md $(BIB) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_DE) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

$(BUILDDIR)/the-tensor.de.pdf: the-tensor.de.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_DE)
	@echo "Built: $@"

$(BUILDDIR)/music-affect-dynamics.de.pdf: music-affect-dynamics.de.md $(BIB) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_DE) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

$(BUILDDIR)/quantum-soma-penrose.de.pdf: quantum-soma-penrose.de.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_DE)
	@echo "Built: $@"

# --- French ---

$(BUILDDIR)/soma-field-paper.fr.pdf: soma-field-paper.fr.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_FR)
	@echo "Built: $@"

$(BUILDDIR)/soma-field-book.fr.pdf: soma-field-book.fr.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_FR)
	@echo "Built: $@"

$(BUILDDIR)/soma-field-patient-pov.fr.pdf: soma-field-patient-pov.fr.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_FR)
	@echo "Built: $@"

$(BUILDDIR)/mathematical-co-identification.fr.pdf: mathematical-co-identification.fr.md $(BIB) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_FR) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

$(BUILDDIR)/the-tensor.fr.pdf: the-tensor.fr.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_FR)
	@echo "Built: $@"

$(BUILDDIR)/music-affect-dynamics.fr.pdf: music-affect-dynamics.fr.md $(BIB) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_FR) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

$(BUILDDIR)/quantum-soma-penrose.fr.pdf: quantum-soma-penrose.fr.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_FR)
	@echo "Built: $@"

# --- Italian ---

$(BUILDDIR)/soma-field-paper.it.pdf: soma-field-paper.it.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_IT)
	@echo "Built: $@"

$(BUILDDIR)/soma-field-book.it.pdf: soma-field-book.it.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_IT)
	@echo "Built: $@"

$(BUILDDIR)/soma-field-patient-pov.it.pdf: soma-field-patient-pov.it.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_IT)
	@echo "Built: $@"

$(BUILDDIR)/mathematical-co-identification.it.pdf: mathematical-co-identification.it.md $(BIB) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_IT) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

$(BUILDDIR)/the-tensor.it.pdf: the-tensor.it.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(BOOK_FLAGS_IT)
	@echo "Built: $@"

$(BUILDDIR)/music-affect-dynamics.it.pdf: music-affect-dynamics.it.md $(BIB) | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_IT) --citeproc --bibliography=$(BIB) --csl=$(CSL)
	@echo "Built: $@"

$(BUILDDIR)/quantum-soma-penrose.it.pdf: quantum-soma-penrose.it.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_IT)
	@echo "Built: $@"
