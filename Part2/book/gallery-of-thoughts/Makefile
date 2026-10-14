include ../../../lib/mk/paths.mk
BLD := $(BLD)/gallery
PLATES := $(BLD)/plates
PANDOC ?= pandoc
XELATEX ?= xelatex

# A Gallery of Thoughts (ISS-097): the plates are rendered from registry/gallery.yaml by
# lib/art/gallery.py, one set per format; the book is laid out by filters/gallery.lua.
FORMATS := lulu-a4 a3 projector
REGISTRY := $(ROOT)/registry/gallery.yaml
ART := $(ROOT)/lib/art/filters.py $(ROOT)/lib/art/gallery.py
SOURCES := gallery.md $(wildcard rooms/*.md) $(REGISTRY)
LAYOUT := filters/gallery.lua templates/gallery-header.tex $(ROOT)/lib/format/licence.lua $(ROOT)/registry/licences.yaml $(ROOT)/lib/defaults/base-pdf.yaml
SRC_IMAGES := $(shell $(PYTHON) -c "import yaml;r=yaml.safe_load(open('$(REGISTRY)',encoding='utf-8'));print(' '.join(sorted({'$(ROOT)/'+p['src'] for p in [r['cover']]+[q for x in r['rooms'] for q in x['plates']] if not p['src'].startswith('hires:')})))")

.PHONY: all lulu a3 projector plates contact hires captures check clean help
.SECONDARY:

all: lulu

lulu: $(BLD)/gallery-of-thoughts-lulu-a4.pdf
	@pdfinfo "$<" | grep -E '^(Pages|Page size):'
a3: $(BLD)/gallery-of-thoughts-a3.pdf
	@pdfinfo "$<" | grep -E '^(Pages|Page size):'
projector: $(BLD)/gallery-of-thoughts-projector.pdf
	@pdfinfo "$<" | grep -E '^(Pages|Page size):'

plates: $(foreach f,$(FORMATS),$(PLATES)/$(f)/tones.json)

# The curator's cut: every plate numbered on one sheet ($(BLD)/contact-lulu-a4.jpg).
contact: $(PLATES)/lulu-a4/tones.json
	$(PYTHON) $(ROOT)/lib/art/gallery.py $(PLATES) --format lulu-a4 --contact

# The Gallery's own views (registry/gallery.yaml `captures`: the fractals) at 4K; slow.
captures:
	cd $(ROOT)/apps/instrument/visuals/soma-field-operator && npm run capture -- --only gallery --scale 2 --out $(BLD)/hires

# The app's views recaptured at 3840 x 2160 (theirs are 1920 wide, soft at A3); the plates
# use them when present. Slow (software WebGL); not committed.
hires:
	cd $(ROOT)/apps/instrument/visuals/soma-field-operator && npm run capture -- --only voyage --scale 2 --out $(BLD)/hires

$(PLATES)/%/tones.json: $(REGISTRY) $(ART) $(SRC_IMAGES)
	$(PYTHON) $(ROOT)/lib/art/gallery.py $(PLATES) --format $*

# lulu-a4 reads defaults/lulu.yaml, a3 defaults/a3.yaml, projector defaults/projector.yaml
.SECONDEXPANSION:
$(BLD)/gallery-of-thoughts-%.tex: defaults/$$(firstword $$(subst -, ,$$*)).yaml $(SOURCES) $(LAYOUT) $(PLATES)/%/tones.json
	$(PANDOC) --defaults=$< --eol=lf

$(BLD)/gallery-of-thoughts-%.pdf: $(BLD)/gallery-of-thoughts-%.tex
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $<
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $<

check: lulu
	@if grep -n -e 'Missing character' -e 'LaTeX Warning: File .* not found' -e '^! ' "$(BLD)/gallery-of-thoughts-lulu-a4.log"; then echo "gallery check: FAIL"; exit 1; fi
	@echo "gallery check: PASS"

clean:
	rm -rf "$(BLD)"

help:
	@echo "A Gallery of Thoughts targets:"
	@echo "  lulu       the Lulu A4-landscape proof (default): $(BLD)/gallery-of-thoughts-lulu-a4.pdf"
	@echo "  a3         the A3-landscape edition"
	@echo "  projector  the 16:9 projector edition"
	@echo "  plates     render the plates for every format (lib/art/gallery.py)"
	@echo "  contact    a numbered contact sheet of every plate, for the curator's cut"
	@echo "  hires      recapture the app's views at 4K for A3 (slow)"
	@echo "  captures   capture the Gallery's own views (the fractals) at 4K (slow)"
	@echo "  check      build the Lulu proof and check its log"
	@echo "  clean      remove $(BLD)"