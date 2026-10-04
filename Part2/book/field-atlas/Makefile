include ../../../lib/mk/paths.mk
BLD := $(ATLAS_BLD)
HTML := $(BLD)/html
PANDOC ?= pandoc
XELATEX ?= xelatex

SOURCES := atlas.md atlas.yaml README.md $(wildcard front/*.md) $(wildcard theory/*.md) $(wildcard sectors/*.md) $(wildcard back/*.md)
REGISTRY := $(wildcard $(ROOT)/registry/levels/*.yaml) $(wildcard $(ROOT)/registry/levels/*.md) $(wildcard $(ROOT)/registry/models/*.yaml) $(wildcard $(ROOT)/registry/examples/*.yaml) $(wildcard $(ROOT)/registry/questions/*.yaml) $(wildcard $(ROOT)/registry/paths/*/path.yaml) $(wildcard $(ROOT)/registry/paths/*/edges/*.md) $(ROOT)/registry/eras.yaml
FILTERS := $(ROOT)/lib/format/registry.lua $(ROOT)/lib/format/plates.lua $(ROOT)/lib/format/columns.lua $(ROOT)/lib/format/unicode-glyphs.lua $(ROOT)/lib/format/programme-refs.lua $(ROOT)/registry/papers.yaml
DEFAULTS := defaults/a3.yaml defaults/bookfactory.yaml defaults/html.yaml $(ROOT)/lib/defaults/base-pdf.yaml $(ROOT)/lib/defaults/base-html.yaml
TEMPLATES := templates/a3-header.tex templates/even-pages.tex templates/field-atlas.css
FIGURES := $(wildcard figures/plates/*.png) $(wildcard figures/theory/*.png) $(wildcard figures/app/questions/*.png)
PDF := $(BLD)/field-atlas-a3.pdf
TEX := $(BLD)/field-atlas-a3.tex
LOG := $(BLD)/field-atlas-a3.log
BF_PDF := $(BLD)/field-atlas-bookfactory.pdf
BF_TEX := $(BLD)/field-atlas-bookfactory.tex
HTML_INDEX := $(HTML)/index.html

.PHONY: all a3 pdf html check bookfactory clean help

all: a3

pdf: a3

a3: $(PDF)

$(BLD):
	mkdir -p "$@"

$(TEX): $(SOURCES) $(REGISTRY) $(FILTERS) $(DEFAULTS) $(TEMPLATES) $(FIGURES) | $(BLD)
	$(PANDOC) --defaults=defaults/a3.yaml --eol=lf

$(PDF): $(TEX)
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $(TEX)
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $(TEX)

# bookfactory.ch Premium Plus Jumbo (400 x 294 mm trim + 3 mm bleed). The printer wants an
# even page count; the check reports the page size and count.
bookfactory: $(BF_PDF)
	@pdfinfo "$(BF_PDF)" | grep -E '^(Pages|Page size):'
	@pages=$$(pdfinfo "$(BF_PDF)" | awk '/^Pages:/ {print $$2}'); \
	if [ $$((pages % 2)) -ne 0 ]; then echo "bookfactory: odd page count $$pages (add a blank page)"; exit 1; fi; \
	if [ $$pages -gt 400 ]; then echo "bookfactory: $$pages pages exceeds the 400-page maximum"; exit 1; fi; \
	echo "bookfactory: PASS ($$pages pages)"

$(BF_TEX): $(SOURCES) $(REGISTRY) $(FILTERS) $(DEFAULTS) $(TEMPLATES) $(FIGURES) | $(BLD)
	$(PANDOC) --defaults=defaults/bookfactory.yaml --eol=lf

$(BF_PDF): $(BF_TEX)
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $(BF_TEX)
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $(BF_TEX)

html: $(HTML_INDEX)

$(HTML_INDEX): $(SOURCES) $(REGISTRY) $(FILTERS) $(DEFAULTS) $(TEMPLATES) $(FIGURES)
	mkdir -p "$(HTML)"
	cp -R figures "$(HTML)/"
	cp templates/field-atlas.css "$(HTML)/field-atlas.css"
	$(PANDOC) --defaults=defaults/html.yaml --eol=lf

check: a3
	$(PYTHON) scripts/check_prose.py
	@test -f "$(LOG)" || { echo "missing $(LOG)"; exit 1; }
	@if grep -n -e 'Float(s) lost' -e 'Floats and marginpars not allowed' -e 'Missing character' -e 'LaTeX Warning: File .* not found' -e '^! ' "$(LOG)"; then echo "field-atlas check: FAIL (see $(LOG))"; exit 1; fi
	@echo "field-atlas check: PASS"

clean:
	rm -rf "$(BLD)"

help:
	@echo "Field Atlas targets:"
	@echo "  all/a3/pdf  Build A3 landscape PDF at $(PDF)"
	@echo "  bookfactory Build the bookfactory.ch print edition at $(BF_PDF)"
	@echo "  html        Build HTML edition at $(HTML_INDEX)"
	@echo "  check       Run prose validator and LaTeX log checks"
	@echo "  clean       Remove $(BLD)"