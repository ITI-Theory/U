ROOT := $(abspath ../../..)
BLD := $(ROOT)/bld/textbook
HTML := $(BLD)/html
PANDOC ?= pandoc
XELATEX ?= xelatex
PYTHON ?= $(ROOT)/.venv/Scripts/python.exe

CHAPTERS := $(wildcard chapters/*.md)
APPENDICES := $(wildcard appendices/*.md)
SOURCES := textbook.md textbook.yaml $(CHAPTERS) $(APPENDICES)
REGISTRY := $(wildcard $(ROOT)/registry/levels/*.yaml) $(wildcard $(ROOT)/registry/levels/*.md) $(wildcard $(ROOT)/registry/examples/*.yaml) $(wildcard $(ROOT)/registry/questions/*.yaml) $(ROOT)/registry/eras.yaml
FILTERS := $(ROOT)/lib/format/registry.lua $(ROOT)/lib/format/plates.lua $(ROOT)/lib/format/columns.lua filters/textbook-boxes.lua
DEFAULTS := defaults/a3.yaml defaults/html.yaml $(ROOT)/lib/defaults/base-pdf.yaml $(ROOT)/lib/defaults/base-html.yaml
TEMPLATES := templates/textbook-a3-header.tex templates/textbook.css
FIGURES := $(wildcard figures/generated/*.png) $(wildcard ../field-atlas/figures/theory/*.png) $(wildcard ../field-atlas/figures/plates/*.png)
PDF := $(BLD)/field-atlas-textbook-a3.pdf
TEX := $(BLD)/field-atlas-textbook-a3.tex
LOG := $(BLD)/field-atlas-textbook-a3.log
HTML_INDEX := $(HTML)/index.html
WIN_LOG := $(subst /,\,$(LOG))

.PHONY: all a3 pdf html check clean help figures

all: a3
pdf: a3

$(BLD):
	@if not exist "$@" mkdir "$@"

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
	@if not exist "$(HTML)" mkdir "$(HTML)"
	@if not exist "$(HTML)\figures" mkdir "$(HTML)\figures"
	@xcopy /E /I /Y figures "$(HTML)\figures" >nul
	@if not exist "$(HTML)\..\field-atlas" mkdir "$(HTML)\..\field-atlas"
	@copy /Y templates\textbook.css "$(HTML)\textbook.css" >nul
	$(PANDOC) --defaults=defaults/html.yaml --eol=lf

check: a3
	$(PYTHON) scripts/check_prose.py
	$(PYTHON) scripts/verify_answers.py
	@if not exist "$(WIN_LOG)" exit /b 1
	@findstr /C:"Float(s) lost" /C:"Floats and marginpars not allowed" "$(WIN_LOG)" >nul && exit /b 1 || exit /b 0
	@findstr /I /C:"not found" /C:"missing character" /C:"cannot find file" "$(WIN_LOG)" >nul && exit /b 1 || exit /b 0
	@echo "field-atlas-textbook check: PASS"

clean:
	@if exist "$(BLD)" rmdir /S /Q "$(BLD)"

help:
	@echo "Field Atlas Textbook targets:"
	@echo "  all/a3/pdf  Build A3 landscape PDF at $(PDF)"
	@echo "  html        Build HTML edition at $(HTML_INDEX)"
	@echo "  check       Run prose, answer, and LaTeX log checks"
	@echo "  clean       Remove $(BLD)"