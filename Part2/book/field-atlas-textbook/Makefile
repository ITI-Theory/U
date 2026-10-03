include ../../../lib/mk/paths.mk
BLD := $(TEXTBOOK_BLD)
HTML := $(BLD)/html
PANDOC ?= pandoc
XELATEX ?= xelatex

CHAPTERS := $(wildcard chapters/*.md)
APPENDICES := $(wildcard appendices/*.md)
SOURCES := textbook.md textbook.yaml $(CHAPTERS) $(APPENDICES)
REGISTRY := $(wildcard $(ROOT)/registry/levels/*.yaml) $(wildcard $(ROOT)/registry/levels/*.md) $(wildcard $(ROOT)/registry/examples/*.yaml) $(wildcard $(ROOT)/registry/questions/*.yaml) $(ROOT)/registry/eras.yaml
FILTERS := $(ROOT)/lib/format/registry.lua $(ROOT)/lib/format/plates.lua $(ROOT)/lib/format/columns.lua filters/textbook-boxes.lua
DEFAULTS := defaults/a3.yaml defaults/html.yaml $(ROOT)/lib/defaults/base-pdf.yaml $(ROOT)/lib/defaults/base-html.yaml
TEMPLATES := templates/textbook-a3-header.tex templates/textbook.css
FIGURES := $(wildcard figures/generated/*.png) $(wildcard figures/reused/*.png) $(wildcard ../field-atlas/figures/theory/*.png) $(wildcard ../field-atlas/figures/plates/*.png)
PDF := $(BLD)/field-atlas-textbook-a3.pdf
TEX := $(BLD)/field-atlas-textbook-a3.tex
LOG := $(BLD)/field-atlas-textbook-a3.log
HTML_INDEX := $(HTML)/index.html

.PHONY: all a3 pdf html check clean help figures

all: a3
pdf: a3

$(BLD):
	mkdir -p "$@"

figures: figures/generated/ch01-zoom-response.png

figures/generated/ch01-zoom-response.png: figures/build_figures.py
	$(PYTHON) figures/build_figures.py

$(TEX): $(SOURCES) $(REGISTRY) $(FILTERS) $(DEFAULTS) $(TEMPLATES) figures | $(BLD)
	$(PANDOC) --defaults=defaults/a3.yaml --eol=lf

$(PDF): $(TEX)
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $(TEX)
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $(TEX)

a3: $(PDF)

html: $(HTML_INDEX)

$(HTML_INDEX): $(SOURCES) $(REGISTRY) $(FILTERS) $(DEFAULTS) $(TEMPLATES) figures
	mkdir -p "$(HTML)"
	cp -R figures "$(HTML)/"
	cp templates/textbook.css "$(HTML)/textbook.css"
	$(PANDOC) --defaults=defaults/html.yaml --eol=lf

check: a3
	$(PYTHON) scripts/check_prose.py
	$(PYTHON) scripts/verify_answers.py
	test -f "$(LOG)"
	! grep -q -e 'Float(s) lost' -e 'Floats and marginpars not allowed' "$(LOG)"
	! grep -q -i -e 'not found' -e 'missing character' -e 'cannot find file' "$(LOG)"
	@echo "field-atlas-textbook check: PASS"

clean:
	rm -rf "$(BLD)"

help:
	@echo "Field Atlas Textbook targets:"
	@echo "  all/a3/pdf  Build A3 landscape PDF at $(PDF)"
	@echo "  html        Build HTML edition at $(HTML_INDEX)"
	@echo "  check       Run prose, answer, and LaTeX log checks"
	@echo "  clean       Remove $(BLD)"