# The narrator's scripts (ISS-125): a film's scenes laid out for reading aloud, A4 (docs/BUILD.md: Make
# orchestrates, pandoc converts, a Lua filter lays out). One source page per film; the words are registry/scenes.yaml's.
#   make              every script to bld/narration/<film>.pdf
#   make clean
include ../../lib/mk/paths.mk
PANDOC  ?= pandoc
XELATEX ?= xelatex
OUT     := $(BLD)/narration
SOURCES := $(wildcard *.md)
PDFS    := $(patsubst %.md,$(OUT)/%.pdf,$(filter-out README.md,$(SOURCES)))
DEPS    := defaults/pdf.yaml filters/narrator.lua templates/narration-header.tex ../../registry/scenes.yaml $(wildcard ../../registry/tours/film-*.yaml)

all: $(PDFS)

$(OUT)/%.tex: %.md $(DEPS)
	@mkdir -p $(OUT)
	$(PANDOC) -d defaults/pdf.yaml $< -o $@

$(OUT)/%.pdf: $(OUT)/%.tex
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(OUT) $< > $(OUT)/$*.log1 || (tail -30 $(OUT)/$*.log; exit 1)
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(OUT) $< > $(OUT)/$*.log2

clean:
	rm -rf $(OUT)

.PHONY: all clean
