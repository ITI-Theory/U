# Top-level U/ build orchestrator
# lib/mk/dist.mk -- distribution cp rules -- GENERATED, run: make generate

PAPER := paper/bld
BOOKS_DIR := books/T-Theory
FRAC := $(BOOKS_DIR)/bld
DIST := ../Dist
ADM := prj/.adm
ADM_SITE := $(ADM)/site
ADM_ISSUE_MD := $(wildcard $(ADM)/issues/*.md)
ADM_CHAT_MD := $(wildcard $(ADM)/chats/*.md)
ISSUES_HTML := $(ADM_SITE)/Issues.html

include lib/mk/dist.mk

.PHONY: all build registry-papers registry-papers-royal registry-fractal lean lean-appendix omnibus \
	fractal-thesis cheatsheet uat-build uat-check release-build release-check \
	uat-stage-papers uat-stage-ttheory uat-stage-lulu-proofs uat-stage-full uat-stage-mirror dist generate list issues-html issues adm

lean:
	LEAN_NUM_THREADS=2 lake build

lean-appendix:
	python paper/scripts/build_lean_appendix.py
	$(MAKE) -C paper lean-appendix

omnibus:
	$(MAKE) -C paper omnibus

cheatsheet:
	$(MAKE) -C $(BOOKS_DIR) bld/booklet-gateway.pdf

fractal-thesis:
	$(MAKE) -C $(BOOKS_DIR) fractal-thesis

registry-papers:
	$(MAKE) -C paper $(REGISTRY_PAPER_TARGETS)

registry-papers-royal:
	$(MAKE) -C paper $(REGISTRY_PAPER_ROYAL_TARGETS)

registry-fractal:
	$(MAKE) -C $(BOOKS_DIR) $(REGISTRY_FRACTAL_PREREQUISITES) $(REGISTRY_FRACTAL_TARGETS)

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
	$(MAKE) -C paper uat-context-papers
	py paper/scripts/stage_uat.py ttheory

uat-stage-lulu-proofs: registry-papers registry-fractal
	$(MAKE) -C $(BOOKS_DIR) vol1-10pt
	$(MAKE) -C paper/lulu-cover proof-set
	py paper/scripts/stage_uat.py lulu-proofs

uat-stage-mirror:
	py paper/scripts/stage_uat_mirror.py

uat-stage-full: uat-stage-papers uat-stage-ttheory
	@echo Full UAT packages staged: papers + ttheory

# Familiar release names remain aliases for the UAT gate.
release-build: uat-build

release-check: uat-check

generate:
	py paper/scripts/generate_mk.py
	@echo Regenerated lib/mk/dist.mk

list:
	@grep "^[a-z][a-z-]*:" lib/mk/dist.mk

issues-html: $(ISSUES_HTML)

issues: issues-html

adm: issues

$(ISSUES_HTML): ISSUES.md $(ADM_ISSUE_MD) $(ADM_CHAT_MD) $(ADM_SITE)/issues-template.html $(ADM_SITE)/issues-index.lua $(ADM_SITE)/issues.css $(ADM_SITE)/issues.js
	@mkdir -p $(ADM_SITE)
	pandoc ISSUES.md --from=markdown+task_lists+lists_without_preceding_blankline --to=html5 --standalone --eol=lf \
		--template=$(ADM_SITE)/issues-template.html \
		--lua-filter=$(ADM_SITE)/issues-index.lua \
		--output=$@
