# Top-level U build orchestrator.

include lib/mk/paths.mk

PYTHON ?= python
BOOKS_DIR := books/T-Theory
ATLAS_DIR := Part2/book/field-atlas
TEXTBOOK_DIR := Part2/book/field-atlas-textbook
APP_DIR := apps/instrument/visuals/soma-field-operator
DIST := ../Dist
ADM := prj/.adm
ADM_SITE := $(ADM)/site
ADM_ISSUE_MD := $(wildcard $(ADM)/issues/*.md)
ADM_CHAT_MD := $(wildcard $(ADM)/chats/*.md)
ISSUES_HTML := $(ADM_SITE)/Issues.html

-include local.mk
include lib/mk/dist.mk

.DEFAULT_GOAL := help

.PHONY: help all build papers papers-html omnibus atlas atlas-html textbook textbook-html books vol1 vol2 lean app check clean \
	registry-papers registry-papers-royal registry-fractal lean-appendix \
	fractal-thesis cheatsheet uat-build uat-check release-build release-check \
	uat-stage-papers uat-stage-ttheory uat-stage-lulu-proofs uat-stage-full uat-stage-mirror dist generate operator-generate list issues-html issues adm

help:
	$(info U build targets (outputs in bld/, see docs/BUILD.md))
	$(info   all             papers, books and the Field Atlas)
	$(info   papers          build all papers and the A4 omnibus)
	$(info   papers-html     build paper HTML files)
	$(info   omnibus         build the papers omnibus)
	$(info   atlas           build the Field Atlas A3 edition)
	$(info   atlas-html      build the Field Atlas HTML edition)
	$(info   textbook        build [T]-Theory: A Course (A4 course book))
	$(info   textbook-html   build the course book HTML edition)
	$(info   books           build all T-Theory books)
	$(info   vol1            build T-Theory volume 1)
	$(info   vol2            build T-Theory volume 2)
	$(info   lean            build Lean proofs)
	$(info   lean-update     update Lean dependencies, apply patches, rebuild)
	$(info   app             build the Soma Machine app)
	$(info   app-start       run the app locally (http://127.0.0.1:5173); mother-bridge for the MOTHER panel)
	$(info   app-publish     publish the app to www.t-theory.org/app/ (DRY=1 first))
	$(info   observatory-guide  build the Observatory Guide (NotebookLM source) in bld/app/)
	$(info   ask NB=mother|hal Q="..."  ask MOTHER or H-AL one question (paced; DRY=1 shows it only))
	$(info   uat-stage-papers / uat-stage-ttheory  stage a UAT track in uat/staging/)
	$(info   uat-nlm TRACK=papers|ttheory  NotebookLM UAT: swap the standing notebook's sources, ask, report (DRY=1 first))
	$(info   check           run the papers, books and Atlas validators)
	$(info   clean           remove repo-root bld/)
	$(info   generate        regenerate lib/mk/dist.mk from Dist/PAPERS.yaml)
	@:

all: papers books atlas

papers:
	$(MAKE) -C paper all

papers-html:
	$(MAKE) -C paper html

omnibus:
	$(MAKE) -C paper omnibus

atlas:
	$(MAKE) -C $(ATLAS_DIR) a3

atlas-html:
	$(MAKE) -C $(ATLAS_DIR) html

textbook:
	$(MAKE) -C $(TEXTBOOK_DIR) a4

textbook-html:
	$(MAKE) -C $(TEXTBOOK_DIR) html

books:
	$(MAKE) -C $(BOOKS_DIR) all

vol1:
	$(MAKE) -C $(BOOKS_DIR) vol1

vol2:
	$(MAKE) -C $(BOOKS_DIR) vol2

lean:
	LEAN_NUM_THREADS=2 lake build

# After a dependency change: lake update, re-apply lean/patches/v4.33, cache get, build
lean-update:
	bash lean/upgrade-build.sh

app:
	npm --prefix $(APP_DIR) run build

# Run the app locally (vite, http://127.0.0.1:5173). The MOTHER panel needs the
# bridge too: `make mother-bridge` in a second terminal (http://127.0.0.1:8765).
.PHONY: app-start mother-bridge app-publish nlm-usage
app-start:
	npm --prefix $(APP_DIR) run start

# Publish the app to https://www.t-theory.org/app/ (site repo ../t-theory.org).
app-publish:
	$(PYTHON) $(APP_DIR)/scripts/publish.py $(if $(DRY),--dry-run,)

mother-bridge:
	cd apps/instrument/mother && $(MOTHER_PY) bridge.py

# Sherlock concept registry (registry/concepts): references, real proof status, gaps.
.PHONY: concepts
concepts:
	$(PYTHON) paper/scripts/check_concepts.py $(if $(FETCH),--fetch-cyc,)

# Every {{Visualize}} figure in one file for custom chats (ISS-051): bld/visualize/library.pdf.
.PHONY: visualize-library
visualize-library:
	$(PYTHON) lib/visualize/library.py

# Which display equations have a figure (bld/visualize/coverage.md; ISS-051).
.PHONY: visualize-coverage
visualize-coverage:
	$(PYTHON) lib/visualize/coverage.py

# NotebookLM compute left (five-hour and weekly windows, about how many questions).
nlm-usage:
	cd apps/instrument/mother && $(MOTHER_PY) nlm_usage.py

# Observatory Guide: the soma-tour spec with registry ids, a source for the
# MOTHER and H-AL notebooks (upload bld/app/observatory-guide.md).
OBSERVATORY_GUIDE := $(BLD)/app/observatory-guide.md
# MOTHER / H-AL from the command line: same Bridge and pace as the app (HAL mother ask)
ifeq ($(OS),Windows_NT)
MOTHER_PY := .venv/Scripts/python.exe
else
MOTHER_PY := .venv/bin/python
endif
.PHONY: ask
ask:
	@test -n "$(NB)" || { echo "usage: make ask NB=mother|hal Q=\"question\" [COMPARE=1] [DRY=1]"; exit 1; }
	cd apps/instrument/mother && $(MOTHER_PY) ask.py $(NB) "$$Q" $(if $(COMPARE),--compare,) $(if $(DRY),--dry-run,)

observatory-guide: $(OBSERVATORY_GUIDE)
$(OBSERVATORY_GUIDE): docs/TOUR-LANGUAGE.md lib/format/observatory-ids.lua $(wildcard registry/levels/*.yaml registry/questions/*.yaml registry/tours/*.yaml registry/models/*.yaml) registry/eras.yaml
	$(PYTHON) $(APP_DIR)/scripts/generate.py
	mkdir -p $(dir $@)
	pandoc docs/TOUR-LANGUAGE.md --lua-filter=lib/format/observatory-ids.lua --standalone -t gfm --eol=lf -o $@

check:
	$(MAKE) -C paper check
	$(MAKE) -C $(BOOKS_DIR) check
	$(MAKE) -C $(ATLAS_DIR) check

clean:
	rm -rf $(BLD)

lean-appendix:
	$(MAKE) -C paper lean-appendix

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

build: registry-papers registry-fractal

uat-build:
	$(MAKE) build

uat-check:
	bin/release-check

uat-stage-papers: registry-papers
	$(MAKE) -C paper uat-context-papers
	$(PYTHON) paper/scripts/stage_uat.py papers

uat-stage-ttheory: registry-fractal
	$(MAKE) -C paper uat-context-papers
	$(PYTHON) paper/scripts/stage_uat.py ttheory

uat-stage-lulu-proofs: registry-papers registry-fractal
	$(MAKE) -C $(BOOKS_DIR) vol1-10pt
	$(MAKE) -C paper/lulu-cover proof-set
	$(PYTHON) paper/scripts/stage_uat.py lulu-proofs

uat-stage-mirror:
	$(PYTHON) paper/scripts/stage_uat_mirror.py

uat-stage-full: uat-stage-papers uat-stage-ttheory
	@echo Full UAT packages staged: papers + ttheory

# NotebookLM UAT in the track's standing notebook: swap its sources for
# uat/staging/<TRACK>/, ask the worksheet, report to uat/results/.
.PHONY: uat-nlm
uat-nlm:
	@test -n "$(TRACK)" || { echo "usage: make uat-nlm TRACK=papers|ttheory [DRY=1] [KEEP=1] [ITEMS=S-1,H-2]"; exit 1; }
	apps/instrument/mother/$(MOTHER_PY) uat/scripts/nlm_uat.py $(TRACK) $(if $(KEEP),,--replace) $(if $(DRY),--dry-run,) $(if $(ITEMS),--items $(ITEMS),)

release-build: uat-build

release-check: uat-check

generate:
	$(PYTHON) paper/scripts/generate_mk.py
	@echo Regenerated lib/mk/dist.mk
	{ echo '# MIRROR of Dist/PAPERS.yaml - do not edit here. Refresh with: make generate'; cat $(DIST)/PAPERS.yaml; } > registry/papers.yaml
	@echo Refreshed registry/papers.yaml from $(DIST)/PAPERS.yaml

operator-generate:
	$(PYTHON) $(APP_DIR)/scripts/generate.py

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
