ROOT := $(abspath ../../..)
BLD := $(ROOT)/bld/atlas
HTML := $(BLD)/html
PANDOC ?= pandoc
XELATEX ?= xelatex
PYTHON ?= $(ROOT)/.venv/Scripts/python.exe

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
WIN_LOG := $(subst /,\,$(LOG))

.PHONY: all a3 pdf html check clean help

all: a3

pdf: a3

a3: $(PDF)

$(BLD):
	@if not exist "$@" mkdir "$@"

$(TEX): $(SOURCES) $(REGISTRY) $(FILTERS) $(DEFAULTS) $(TEMPLATES) $(FIGURES) | $(BLD)
	$(PANDOC) --defaults=defaults/a3.yaml --eol=lf

$(PDF): $(TEX)
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $(TEX)
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $(TEX)

html: $(HTML_INDEX)

$(HTML_INDEX): $(SOURCES) $(REGISTRY) $(FILTERS) $(DEFAULTS) $(TEMPLATES) $(FIGURES)
	@if not exist "$(HTML)" mkdir "$(HTML)"
	@xcopy /E /I /Y figures "$(HTML)\figures" >nul
	@copy /Y templates\field-atlas.css "$(HTML)\field-atlas.css" >nul
	$(PANDOC) --defaults=defaults/html.yaml --eol=lf

check: a3
	$(PYTHON) scripts/check_prose.py
	@if not exist "$(WIN_LOG)" exit /b 1
	@findstr /C:"Float(s) lost" /C:"Floats and marginpars not allowed" "$(WIN_LOG)" >nul && exit /b 1 || exit /b 0
	@findstr /I /C:"not found" /C:"missing character" /C:"cannot find file" "$(WIN_LOG)" >nul && exit /b 1 || exit /b 0
	@echo "field-atlas check: PASS"

clean:
	@if exist "$(BLD)" rmdir /S /Q "$(BLD)"

help:
	@echo "Field Atlas targets:"
	@echo "  all/a3/pdf  Build A3 landscape PDF at $(PDF)"
	@echo "  html        Build HTML edition at $(HTML_INDEX)"
	@echo "  check       Run prose validator and LaTeX log checks"
	@echo "  clean       Remove $(BLD)"
