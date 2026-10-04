include ../../../lib/mk/paths.mk
BLD := $(TEXTBOOK_BLD)
HTML := $(BLD)/html
ATLAS := ../field-atlas
PANDOC ?= pandoc
# pandoc-crossref must be on PATH and built for the same pandoc minor version (docs/BUILD.md)
CROSSREF ?= pandoc-crossref
# {{Visualize}} figures: the filter writes the manifest, render.py draws (docs/VISUALIZE.md)
VISUALIZE := $(ROOT)/lib/visualize/render.py
VIZ_MANIFEST := $(BLD)/visualize/manifest.json
XELATEX ?= xelatex

CHAPTERS := $(wildcard chapters/*.md)
APPENDICES := $(wildcard appendices/*.md)
PARTS := $(wildcard parts/*.md)
SOURCES := textbook.md textbook.yaml $(PARTS) $(CHAPTERS) $(APPENDICES)
REGISTRY := $(wildcard $(ROOT)/registry/levels/*.yaml) $(wildcard $(ROOT)/registry/levels/*.md) $(wildcard $(ROOT)/registry/examples/*.yaml) $(wildcard $(ROOT)/registry/questions/*.yaml) $(ROOT)/registry/eras.yaml
FILTERS := $(ROOT)/lib/format/registry.lua $(ROOT)/lib/format/unicode-glyphs.lua $(ROOT)/lib/format/programme-refs.lua $(ROOT)/registry/papers.yaml $(ROOT)/lib/format/plates.lua $(ROOT)/lib/format/columns.lua filters/course-numbering.lua $(ROOT)/lib/format/visualize.lua $(ROOT)/lib/format/visualize-reader.lua $(VISUALIZE) filters/textbook-layout.lua filters/textbook-boxes.lua
DEFAULTS := defaults/a4.yaml defaults/html.yaml $(ROOT)/lib/defaults/base-pdf.yaml $(ROOT)/lib/defaults/base-html.yaml
TEMPLATES := templates/textbook-a4-header.tex templates/textbook.css
# Generated figures: one stamp for everything figures/build_figures.py writes.
FIGURE_STAMP := figures/generated/.stamp
ATLAS_FIGURES := $(wildcard $(ATLAS)/figures/theory/*.png) $(wildcard $(ATLAS)/figures/plates/*.png)
PDF := $(BLD)/ttheory-course.pdf
TEX := $(BLD)/ttheory-course.tex
LOG := $(BLD)/ttheory-course.log
HTML_INDEX := $(HTML)/index.html

.PHONY: all a4 pdf html figures check clean help

all: a4
pdf: a4
a4: $(PDF)
figures: $(FIGURE_STAMP)

$(BLD):
	mkdir -p "$@"

$(FIGURE_STAMP): figures/build_figures.py $(wildcard $(ROOT)/registry/levels/*.yaml)
	$(PYTHON) figures/build_figures.py
	touch "$@"

$(TEX): $(SOURCES) $(REGISTRY) $(FILTERS) $(DEFAULTS) $(TEMPLATES) $(FIGURE_STAMP) $(ATLAS_FIGURES) | $(BLD)
	@command -v $(CROSSREF) >/dev/null || { echo "$(CROSSREF) not found on PATH (docs/BUILD.md)"; exit 1; }
	$(PANDOC) --defaults=defaults/a4.yaml --eol=lf

$(PDF): $(TEX)
	$(PYTHON) $(VISUALIZE) $(VIZ_MANIFEST)
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $(TEX)
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $(TEX)

html: $(HTML_INDEX)

# Image paths are relative to this folder (figures/...) and to the Atlas
# (../field-atlas/figures/...); mirror both next to the HTML.
$(HTML_INDEX): $(SOURCES) $(REGISTRY) $(FILTERS) $(DEFAULTS) $(TEMPLATES) $(FIGURE_STAMP) $(ATLAS_FIGURES)
	mkdir -p "$(HTML)" "$(BLD)/field-atlas/figures"
	cp -R figures "$(HTML)/"
	cp -R $(ATLAS)/figures/theory "$(BLD)/field-atlas/figures/"
	if [ -d $(ATLAS)/figures/plates ]; then cp -R $(ATLAS)/figures/plates "$(BLD)/field-atlas/figures/"; fi
	cp templates/textbook.css "$(HTML)/textbook.css"
	@command -v $(CROSSREF) >/dev/null || { echo "$(CROSSREF) not found on PATH (docs/BUILD.md)"; exit 1; }
	$(PANDOC) --defaults=defaults/html.yaml --eol=lf
	$(PYTHON) $(VISUALIZE) $(VIZ_MANIFEST)

check: a4
	$(PYTHON) $(ATLAS)/scripts/check_prose.py $(CHAPTERS)
	$(PYTHON) scripts/verify_answers.py
	@test -f "$(LOG)" || { echo "missing $(LOG)"; exit 1; }
	@grep -q 'Output written on' "$(LOG)" || { echo "ttheory-course check: FAIL (LaTeX run incomplete; delete $(PDF) and rebuild)"; exit 1; }
	@if grep -n -e 'Float(s) lost' -e 'Floats and marginpars not allowed' -e 'Missing character' -e 'LaTeX Warning: File .* not found' -e 'LaTeX Warning: .*eference .* undefined' -e '^! ' "$(LOG)"; then echo "ttheory-course check: FAIL (see $(LOG))"; exit 1; fi
	@echo "ttheory-course check: PASS"

clean:
	rm -rf "$(BLD)"

help:
	@echo "[T]-Theory: A Course (A4 portrait + HTML):"
	@echo "  all/a4/pdf  build $(PDF)"
	@echo "  html        build $(HTML_INDEX)"
	@echo "  figures     regenerate figures/generated/"
	@echo "  check       prose checker, numeric answers, LaTeX log (incl. undefined refs)"
	@echo "  clean       remove $(BLD)"