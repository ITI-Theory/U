include ../../../lib/mk/paths.mk
BLD := $(BLD)/rooted-atlas
PANDOC ?= pandoc
XELATEX ?= xelatex

# The rooted Atlas (ISS-095): ROOTED's art edition, the app's fractals as two-page spreads. No science
# claims; outside the publication registry. The spreads are registry/rooted.yaml `atlas`, captured from
# the app at 4K (`make captures`, slow), laid out by filters/spreads.lua.
.PHONY: all pdf captures check clean help
all: pdf
help:
	@echo "make -C Part2/book/rooted-atlas captures   the spreads' pictures, 4K from the app (slow)"
	@echo "make -C Part2/book/rooted-atlas pdf        the edition: $(BLD)/rooted-atlas.pdf"
	@echo "make -C Part2/book/rooted-atlas check      no missing characters or pictures; an even page count"

pdf: $(BLD)/rooted-atlas.pdf
	@pdfinfo "$<" | grep -E '^(Pages|Page size):'

captures:
	cd $(ROOT)/apps/instrument/visuals/soma-field-operator && npm run capture -- --only rooted --scale 2 --out $(BLD)

$(BLD)/rooted-atlas.tex: rooted-atlas.md defaults/rooted.yaml filters/spreads.lua templates/header.tex $(ROOT)/registry/rooted.yaml $(wildcard $(BLD)/voyage/*.png)
	@mkdir -p "$(BLD)"
	$(PANDOC) --defaults=defaults/rooted.yaml --eol=lf

$(BLD)/rooted-atlas.pdf: $(BLD)/rooted-atlas.tex
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $<
	$(XELATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(BLD) $<

check: pdf
	@if grep -n -e 'Missing character' -e 'LaTeX Warning: File .* not found' -e '^! ' "$(BLD)/rooted-atlas.log"; then echo "rooted atlas check: FAIL"; exit 1; fi
	@if grep -q '^\\rootedmissing{' "$(BLD)/rooted-atlas.tex"; then echo "rooted atlas check: FAIL (pictures not captured: make captures)"; exit 1; fi
	@pages=$$(pdfinfo "$(BLD)/rooted-atlas.pdf" | sed -n 's/^Pages: *//p'); if [ $$((pages % 2)) -ne 0 ]; then echo "rooted atlas check: FAIL ($$pages pages, odd)"; exit 1; fi
	@echo "rooted atlas check: PASS"

clean:
	rm -rf "$(BLD)"
