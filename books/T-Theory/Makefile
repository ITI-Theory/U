# [T]-Theory books Makefile: Make + pandoc defaults + Lua filters
ROOT := $(abspath ../..)
BLD := $(ROOT)/bld/books
PANDOC ?= pandoc
GS ?= gswin64c

DOMAINS := gateway physics complex-systems formal-mathematics \
           neuroscience consciousness computer-science \
           music-arts clinical-psychology psychiatry-asd \
           social-science geophysics law ppe economics
BOOKLET_DOMAINS := $(subst consciousness,philosophy,$(DOMAINS))
SOURCE_BOOK_IDS := gateway physics complex-systems formal-mathematics \
                   neuroscience computer-science music-arts clinical-psychology \
                   psychiatry-asd social-science geophysics law ppe economics \
                   philosophy
SOURCE_BOOK_PDFS := $(SOURCE_BOOK_IDS:%=$(BLD)/book-%.pdf)
ALL_BOOKLET_PAGES := $(foreach domain,$(BOOKLET_DOMAINS),$(addprefix $(BLD)/booklet-$(domain)-,$(addsuffix .pdf,1 2 3 4)))

.PHONY: all pdf html booklets fractal-thesis omnibus vol1 vol1-10pt vol2 \
        check clean help FORCE $(DOMAINS:%=book-%)
.SECONDARY: $(ALL_BOOKLET_PAGES)
.SECONDEXPANSION:

all: pdf

pdf: $(DOMAINS:%=$(BLD)/book-%.pdf)
	@echo "All 15 fractal books built in $(BLD)."

booklets: $(BOOKLET_DOMAINS:%=$(BLD)/booklet-%.pdf)
	@echo "All domain booklets built in $(BLD)."

html: $(BLD)/book-gateway.html $(BLD)/book-physics.html $(BLD)/booklet-gateway.html
	@echo "HTML samples built in $(BLD)."

fractal-thesis: omnibus
	@echo "T-Theory fractal thesis built."

omnibus: $(BLD)/ttheory-omnibus.pdf
	@echo "T-Theory omnibus built."

vol1: $(BLD)/ttheory-vol1.pdf
	@echo "T-Theory Vol I: Foundation built."

vol1-10pt: $(BLD)/ttheory-vol1-10pt.pdf
	@echo "T-Theory Vol I: Foundation 10pt comparison built."

vol2: $(BLD)/ttheory-vol2.pdf
	@echo "T-Theory Vol II: Application built."

$(DOMAINS:%=book-%): book-%: $(BLD)/book-%.pdf
	@echo "Built: $<"

$(BLD):
	if not exist "$(subst /,\,$@)" mkdir "$(subst /,\,$@)"

$(BLD)/noir-page.pdf: noir-page.md defaults/noir-pdf.yaml noir-header.tex | $(BLD)
	$(PANDOC) $< --defaults=defaults/noir-pdf.yaml --output=$@
	@echo "Built: $@"

$(BLD)/booklet-%.pdf: $$(wildcard */booklet-$$*.md) books.yaml booklet/booklet_body.md format/cheatsheet-header.tex defaults/booklet-pdf.yaml ../../lib/format/macros.lua | $(BLD)
	$(PANDOC) $< --defaults=defaults/booklet-pdf.yaml --output=$@
	@echo "Built domain booklet: $@"

$(BLD)/booklet-%.html: $$(wildcard */booklet-$$*.md) books.yaml booklet/booklet_body.md defaults/booklet-html.yaml ../../lib/format/macros.lua ../../lib/format/site.css | $(BLD)
	$(PANDOC) $< --defaults=defaults/booklet-html.yaml --output=$@
	@echo "Built domain booklet HTML: $@"

define BOOKLET_PAGE_RULE
$(filter %-$(1).pdf,$(ALL_BOOKLET_PAGES)): $(BLD)/booklet-%-$(1).pdf: $(BLD)/booklet-%.pdf | $(BLD)
	$(GS) -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dNOPAUSE -dBATCH -dFirstPage=$(1) -dLastPage=$(1) -sOutputFile=$$@ $$<
	@echo "Prepared booklet page $(1): $$@"
endef
$(foreach page,1 2 3 4,$(eval $(call BOOKLET_PAGE_RULE,$(page))))

$(BLD)/book-gateway.pdf: gateway/book-gateway.md $(BLD)/noir-page.pdf $(BLD)/booklet-gateway.pdf defaults/gateway-pdf.yaml filters/ttheory-direct.lua ../../lib/format/macros.lua format/gateway-template.tex | $(BLD)
	$(PANDOC) $< --defaults=defaults/gateway-pdf.yaml --variable=gateway-noir="$(abspath $(BLD)/noir-page.pdf)" --output=$@
	@echo "Built Gateway book: $@"

$(filter-out $(BLD)/book-gateway.pdf $(BLD)/book-philosophy.pdf,$(SOURCE_BOOK_PDFS)): $(BLD)/book-%.pdf: $$(wildcard */book-$$*.md) $(BLD)/booklet-%.pdf defaults/book-pdf.yaml filters/ttheory-direct.lua ../../lib/format/macros.lua | $(BLD)
	$(PANDOC) $< --defaults=defaults/book-pdf.yaml --toc --output=$@
	@echo "Built domain book: $@"

$(BLD)/book-philosophy.pdf: philosophy/book-philosophy.md $(BLD)/booklet-philosophy.pdf defaults/book-pdf.yaml filters/ttheory-direct.lua ../../lib/format/macros.lua | $(BLD)
	$(PANDOC) $< --defaults=defaults/book-pdf.yaml --toc --output=$@
	@echo "Built domain book: $@"

$(BLD)/book-consciousness.pdf: $(BLD)/book-philosophy.pdf | $(BLD)
	cp -f $< $@
	@echo "Built: $@ (from $<)"

$(BLD)/book-%.html: $$(wildcard */book-$$*.md) defaults/book-html.yaml filters/ttheory-direct.lua ../../lib/format/macros.lua ../../lib/format/site.css | $(BLD)
	$(PANDOC) $< --defaults=defaults/book-html.yaml --output=$@
	@echo "Built domain book HTML: $@"

$(BLD)/ttheory-vol1.pdf: defaults/assembly.md defaults/vol1.yaml defaults/volume-pdf.yaml defaults/fractal-manifest.yaml filters/ttheory-assemble.lua $(BLD)/noir-page.pdf $(ALL_BOOKLET_PAGES) | $(BLD)
	$(PANDOC) defaults/assembly.md --defaults=defaults/vol1.yaml --output=$@
	@echo "Built: $@"

$(BLD)/ttheory-vol1-10pt.pdf: defaults/assembly.md defaults/vol1.yaml defaults/volume-pdf.yaml defaults/fractal-manifest.yaml filters/ttheory-assemble.lua $(BLD)/noir-page.pdf $(ALL_BOOKLET_PAGES) | $(BLD)
	$(PANDOC) defaults/assembly.md --defaults=defaults/vol1.yaml --output=$@
	@echo "Built: $@"

$(BLD)/ttheory-vol2.pdf: defaults/assembly.md defaults/vol2.yaml defaults/volume-pdf.yaml defaults/fractal-manifest.yaml filters/ttheory-assemble.lua $(ALL_BOOKLET_PAGES) | $(BLD)
	$(PANDOC) defaults/assembly.md --defaults=defaults/vol2.yaml --output=$@
	@echo "Built: $@"

$(BLD)/ttheory-omnibus.pdf: defaults/assembly.md defaults/omnibus.yaml defaults/omnibus-pdf.yaml defaults/fractal-manifest.yaml filters/ttheory-assemble.lua $(BLD)/noir-page.pdf $(ALL_BOOKLET_PAGES) | $(BLD)
	$(PANDOC) defaults/assembly.md --defaults=defaults/omnibus.yaml --output=$@
	@echo "Built: $@"

# Compatibility target names for callers that have not yet been repointed to $(BLD).
bld/%.pdf: $(BLD)/%.pdf
	@echo "Built: $<"

check:
	$(PANDOC) --version
	@echo "T-Theory build toolchain available."

clean:
	if exist "$(subst /,\,$(BLD))" rmdir /S /Q "$(subst /,\,$(BLD))"

help:
	@echo "Targets: all pdf html booklets vol1 vol1-10pt vol2 omnibus fractal-thesis book-<domain> check clean"
	@echo "Outputs are written to $(BLD)"

FORCE:
