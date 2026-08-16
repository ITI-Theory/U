# Top-level U/ build orchestrator
# mk/dist.mk -- distribution cp rules -- GENERATED, run: make generate

PAPER := paper/bld
FRAC  := Part2/fractal-programme/bld
DIST  := ../Dist

include mk/dist.mk

.PHONY: all lean lean-appendix omnibus fractal-thesis cheatsheet \
	uat-build uat-check release-build release-check dist generate list

lean:
	LEAN_NUM_THREADS=2 lake build

lean-appendix:
	python paper/scripts/build_lean_appendix.py
	$(MAKE) -C paper lean-appendix

omnibus:
	$(MAKE) -C paper omnibus

cheatsheet:
	$(MAKE) -C paper cheatsheet

fractal-thesis:
	$(MAKE) -C Part2/fractal-programme fractal-thesis

all: lean-appendix omnibus fractal-thesis cheatsheet

# Release candidates are built and checked in U. Dist is only the destination
# for an explicitly approved release.
uat-build:
	bin/release-build

uat-check:
	bin/release-check

# Familiar release names remain aliases for the UAT gate.
release-build: uat-build

release-check: uat-check

generate:
	py paper/scripts/generate_mk.py
	@echo Regenerated mk/dist.mk

list:
	@grep "^[a-z][a-z-]*:" mk/dist.mk
