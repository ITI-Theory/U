# Top-level U/ build orchestrator
# mk/dist.mk -- distribution cp rules -- GENERATED, run: make generate

PAPER := paper/bld
FRAC  := Part2/fractal-programme/bld
DIST  := ../Dist

include mk/dist.mk

.PHONY: all build registry-papers registry-papers-royal registry-fractal lean lean-appendix omnibus \
	fractal-thesis cheatsheet uat-build uat-check release-build release-check \
	uat-stage-papers uat-stage-ttheory dist generate list

lean:
	LEAN_NUM_THREADS=2 lake build

lean-appendix:
	python paper/scripts/build_lean_appendix.py
	$(MAKE) -C paper lean-appendix

omnibus:
	$(MAKE) -C paper omnibus

cheatsheet:
	$(MAKE) -C Part2/fractal-programme bld/booklet-gateway.pdf

fractal-thesis:
	$(MAKE) -C Part2/fractal-programme fractal-thesis

registry-papers:
	$(MAKE) -C paper $(REGISTRY_PAPER_TARGETS)

registry-papers-royal:
	$(MAKE) -C paper $(REGISTRY_PAPER_ROYAL_TARGETS)

registry-fractal:
	$(MAKE) -C Part2/fractal-programme $(REGISTRY_FRACTAL_PREREQUISITES) $(REGISTRY_FRACTAL_TARGETS)

# PAPERS.yaml is adopted explicitly through `make generate`; these targets
# build the resulting U candidate snapshot without promoting anything to Dist.
build: registry-papers registry-fractal

all: build

# Release candidates are built and checked in U. Dist is only the destination
# for an explicitly approved release.
uat-build:
	$(MAKE) build

uat-check:
	bin/release-check

# Copy the selected candidate PDFs into ignored UAT staging directories and
# record their SHA-256 hashes. The manifest is U/uat/manifest.yaml.
uat-stage-papers: registry-papers
	$(MAKE) -C paper uat-context-papers
	py paper/scripts/stage_uat.py papers

uat-stage-ttheory: registry-fractal
	py paper/scripts/stage_uat.py ttheory

# Familiar release names remain aliases for the UAT gate.
release-build: uat-build

release-check: uat-check

generate:
	py paper/scripts/generate_mk.py
	@echo Regenerated mk/dist.mk

list:
	@grep "^[a-z][a-z-]*:" mk/dist.mk
