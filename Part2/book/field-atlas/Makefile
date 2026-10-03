include ../../../lib/mk/paths.mk
BLD := $(ATLAS_BLD)
HTML := $(BLD)/html
PANDOC ?= pandoc
XELATEX ?= xelatex

SOURCES := atlas.md atlas.yaml README.md $(wildcard front/*.md) $(wildcard theory/*.md) $(wildcard sectors/*.md) $(wildcard back/*.md)
REGISTRY := $(wildcard $(ROOT)/registry/levels/*.yaml) $(wildcard $(ROOT)/registry/levels/*.md) $(wildcard $(ROOT)/registry/models/*.yaml) $(wildcard $(ROOT)/registry/examples/*.yaml) $(wildcard $(ROOT)/registry/questions/*.yaml) $(wildcard $(ROOT)/registry/paths/*/path.yaml) $(wildcard $(ROOT)/registry/paths/*/edges/*.md) $(ROOT)/registry/eras.yaml
FILTERS := $(ROOT)/lib/format/registry.lua $(ROOT)/lib/format/plates.lua $(ROOT)/lib/format/columns.lua
DEFAULTS := defaults/a3.yaml defaults/html.yaml $(ROOT)/lib/defaults/base-pdf.yaml $(ROOT)/lib/defaults/base-html.yaml
TEMPLATES := templates/a3-header.tex templates/field-atlas.css
FIGURES := $(wildcard figures/plates/*.png) $(wildcard figures/theory/*.png) $(wildcard figures/app/questions/*.png)
PDF := $(BLD)/field-atlas-a3.pdf
TEX := $(BLD)/field-atlas-a3.tex
LOG := $(BLD)/field-atlas-a3.log
HTML_INDEX := $(HTML)/index.html

.PHONY: all a3 pdf html check clean help

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

html: $(HTML_INDEX)

$(HTML_INDEX): $(SOURCES) $(REGISTRY) $(FILTERS) $(DEFAULTS) $(TEMPLATES) $(FIGURES)
	mkdir -p "$(HTML)"
	cp -R figures "$(HTML)/"
	cp templates/field-atlas.css "$(HTML)/field-atlas.css"
	$(PANDOC) --defaults=defaults/html.yaml --eol=lf

check: a3
	$(PYTHON) scripts/check_prose.py
	test -f "$(LOG)"
	! grep -q -e 'Float(s) lost' -e 'Floats and marginpars not allowed' "$(LOG)"
	! grep -q -i -e 'not found' -e 'missing character' -e 'cannot find file' "$(LOG)"
	@echo "field-atlas check: PASS"

clean:
	rm -rf "$(BLD)"

help:
	@echo "Field Atlas targets:"
	@echo "  all/a3/pdf  Build A3 landscape PDF at $(PDF)"
	@echo "  html        Build HTML edition at $(HTML_INDEX)"
	@echo "  check       Run prose validator and LaTeX log checks"
	@echo "  clean       Remove $(BLD)"