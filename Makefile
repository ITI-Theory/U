# Top-level U/ build orchestrator
# mk/dist.mk -- distribution cp rules -- GENERATED, run: make generate

PAPER := paper/bld
FRAC  := Part2/fractal-programme/bld
DIST  := ../Dist

include mk/dist.mk

.PHONY: all lean lean-appendix omnibus fractal-thesis cheatsheet dist generate list

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

generate:
	py paper/scripts/generate_mk.py
	@echo Regenerated mk/dist.mk

list:
	@grep "^[a-z][a-z-]*:" mk/dist.mk
