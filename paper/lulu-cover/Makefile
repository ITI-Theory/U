ENGINE ?= xelatex
LUA ?= texlua
include ../../lib/mk/paths.mk
BUILD ?= $(BLD)/lulu-covers
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
	$(MAKE) jacket linen-wrap COVER=01-omnibus-v2 INTERIOR=$(PAPERS_BLD)/omnibus-a4.pdf TITLE="The Soma-Field: Collected Works" SUBTITLE="Second Edition"
	$(MAKE) jacket linen-wrap COVER=03-ttheory-vol1-cosmos-matter INTERIOR=$(BOOKS_BLD)/ttheory-vol1.pdf TITLE="[T]-Theory: The Fractal Programme" SUBTITLE="Volume I: Cosmos and Matter"
	$(MAKE) jacket linen-wrap COVER=04-ttheory-vol2-mind-body INTERIOR=$(BOOKS_BLD)/ttheory-vol2.pdf TITLE="[T]-Theory: The Fractal Programme" SUBTITLE="Volume II: Mind and Body"
	$(MAKE) jacket linen-wrap COVER=05-ttheory-vol3-culture-society INTERIOR=$(BOOKS_BLD)/ttheory-vol3.pdf TITLE="[T]-Theory: The Fractal Programme" SUBTITLE="Volume III: Culture and Society"
	$(MAKE) jacket linen-wrap COVER=ttheory-book-gateway INTERIOR=$(BOOKS_BLD)/book-gateway.pdf TITLE="[T]-Theory: Gateway" SUBTITLE="Universal Somatic Field"

all-covers:
	$(LUA) generate-cover-jobs.lua ../../../Dist/PAPERS.yaml cover-jobs.mk
	$(MAKE) -f cover-jobs.mk all

check-inputs:
	@test -n "$(COVER)" || (echo "Set COVER to the Lulu artifact identifier."; exit 2)
	@test -f "$(INTERIOR)" || (echo "Missing interior PDF: $(INTERIOR)"; exit 2)
	@test -n "$(TITLE)" || (echo "Set TITLE from the registered Lulu record."; exit 2)

$(BUILD):
	mkdir -p $@
