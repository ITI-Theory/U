ENGINE ?= xelatex
LUA ?= texlua
BUILD ?= ../bld/lulu-covers
COVER ?=
INTERIOR ?=
TITLE ?=
SUBTITLE ?=

.PHONY: jacket linen-wrap proof-set all-covers check-inputs

jacket: check-inputs | $(BUILD)
	$(LUA) generate-config.lua --cover "$(COVER)" --interior "$(INTERIOR)" --title "$(TITLE)" --subtitle "$(SUBTITLE)" --output "$(BUILD)/$(COVER)-dust-jacket-config.tex"
	cd $(dir $(lastword $(MAKEFILE_LIST))) && $(ENGINE) -interaction=nonstopmode -halt-on-error -output-directory=$(abspath $(BUILD)) "\def\CoverConfig{$(BUILD)/$(COVER)-dust-jacket-config.tex}\input{dust-jacket.tex}"
	@mv $(BUILD)/dust-jacket.pdf $(BUILD)/$(COVER)-dust-jacket.pdf

linen-wrap: check-inputs | $(BUILD)
	$(LUA) generate-config.lua --cover "$(COVER)" --interior "$(INTERIOR)" --title "$(TITLE)" --subtitle "$(SUBTITLE)" --output "$(BUILD)/$(COVER)-dust-jacket-config.tex"
	cd $(dir $(lastword $(MAKEFILE_LIST))) && $(ENGINE) -interaction=nonstopmode -halt-on-error -output-directory=$(abspath $(BUILD)) "\def\CoverConfig{$(BUILD)/$(COVER)-dust-jacket-config.tex}\input{linen-wrap-proof.tex}"
	@mv $(BUILD)/linen-wrap-proof.pdf $(BUILD)/$(COVER)-linen-wrap-proof.pdf

proof-set:
	$(MAKE) jacket linen-wrap COVER=01-omnibus-v2 INTERIOR=../bld/omnibus-a4.pdf TITLE="The Soma-Field: Collected Works" SUBTITLE="Second Edition"
	$(MAKE) jacket linen-wrap COVER=03-ttheory-vol1-foundation INTERIOR=../../Part2/fractal-programme/bld/ttheory-vol1.pdf TITLE="[T]-Theory Vol I: Foundation" SUBTITLE="Universal Somatic Field"
	$(MAKE) jacket linen-wrap COVER=ttheory-book-gateway INTERIOR=../../Part2/fractal-programme/bld/book-gateway.pdf TITLE="[T]-Theory: Gateway" SUBTITLE="Universal Somatic Field"

all-covers:
	$(LUA) generate-cover-jobs.lua ../../../Dist/PAPERS.yaml cover-jobs.mk
	$(MAKE) -f cover-jobs.mk all

check-inputs:
	@test -n "$(COVER)" || (echo "Set COVER to the Lulu artifact identifier."; exit 2)
	@test -f "$(INTERIOR)" || (echo "Missing interior PDF: $(INTERIOR)"; exit 2)
	@test -n "$(TITLE)" || (echo "Set TITLE from the registered Lulu record."; exit 2)

$(BUILD):
	mkdir -p $@
