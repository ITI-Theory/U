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

.PHONY: help all build papers papers-html omnibus atlas atlas-html textbook textbook-html books vol1 vol2 vol3 lean app check clean \
	registry-papers registry-papers-royal registry-fractal lean-appendix \
	fractal-thesis cheatsheet uat-build uat-check uat-run remind release-build release-check \
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
	$(info   vol3            build T-Theory volume 3)
	$(info   lean            build Lean proofs)
	$(info   lean-update     update Lean dependencies, apply patches, rebuild)
	$(info   app             build the Soma Machine app)
	$(info   app-start       run the app locally (http://127.0.0.1:5173); mother-bridge for the MOTHER panel)
	$(info   relay           the screens' channel for tablets (LAN=1: the home network; prints the address and token))
	$(info   app-publish     publish the app to www.t-theory.org/app/ (DRY=1 first))
	$(info   observatory-guide  build the Observatory Guide (NotebookLM source) in bld/app/)
	$(info   ask NB=mother|hal Q="..."  ask MOTHER or H-AL one question (paced; DRY=1 shows it only))
	$(info   uat-stage-papers / uat-stage-ttheory  stage a UAT track in uat/staging/)
	$(info   remind          the author's open steps from ISSUES.md (ARGS=--titles); also HAL remind)
	$(info   wizard          the Wizard's checks (built the right thing): each book's scope covered, Cyc neighbours, never written (ISS-092); ARGS=field-atlas)
	$(info   sherlock-setup  Sherlock's local build: Mathlib cache, NextKB, OpenCyc in Lean, affidavits, ledger (several GB) (ISS-090))
	$(info   moriarty        Sherlock's adversary: plant faults (registry/moriarty.yaml), count what is caught; misses are DOTs (ISS-094))
	$(info   uat-run         the UAT step by step in a terminal (ARGS=--new|--report|--step ID); also HAL uat)
	$(info   uat-nlm TRACK=papers|ttheory  NotebookLM UAT: swap the standing notebook's sources, ask, report (DRY=1 first))
	$(info   make -C sherlock help  Sherlock: affidavits checked in Lean against OpenCyc (paper SH1))
	$(info   emotionml       export the film scores (registry/scores) as W3C EmotionML in bld/scores/)
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

vol3:
	$(MAKE) -C $(BOOKS_DIR) vol3

lean:
	LEAN_NUM_THREADS=2 lake build

# After a dependency change: lake update, re-apply lean/patches/v4.33, cache get, build
lean-update:
	bash lean/upgrade-build.sh

app:
	npm --prefix $(APP_DIR) run build

# Run the app locally (vite, http://127.0.0.1:5173). The MOTHER panel needs the
# bridge too: `make mother-bridge` in a second terminal (http://127.0.0.1:8765).
.PHONY: app-start mother-bridge relay app-publish nlm-usage
app-start:
	npm --prefix $(APP_DIR) run start

# Publish the app to https://www.t-theory.org/app/ (site repo ../t-theory.org).
app-publish:
	$(PYTHON) $(APP_DIR)/scripts/publish.py $(if $(DRY),--dry-run,)

# A DJ mix read into a cue sheet for the SHOW film (ISS-107 A1): make show-cues MIX="path/to/mix.wav"
# -> bld/show/cues.json (tempo curve, tracked beats, bars, 16-bar phrases, breakdowns, builds, drops).
# The mix is personal: only its file name goes into the cue sheet, and bld/ is not committed.
# A compiled film rendered frame by frame (ISS-117): a virtual clock, each frame drawn at 4K however
# long it takes, ffmpeg joining them. make film-render FILM=bld/film/<x>.timeline.json [FROM=s TO=s]
# [FPS=30] [AUDIO=wav]; bld/film/render/<name>/<name>.mp4. About 0.25 s a frame at 4K on this laptop.
.PHONY: film-render
film-render:
	cd $(APP_DIR) && node scripts/render-film.mjs --film "$(abspath $(FILM))" $(if $(FROM),--from $(FROM),) $(if $(TO),--to $(TO),) $(if $(FPS),--fps $(FPS),) $(if $(AUDIO),--audio "$(abspath $(AUDIO))",)

# OBS as the video desk (ISS-117): the "Soma" scene collection (the app, Live, SpaceEngine, projectM,
# the camera, and a Mix of them) built over obs-websocket. REPLACE=1 builds it again.
.PHONY: obs-soma
obs-soma:
	$(PYTHON) lib/video/obs_soma.py $(if $(REPLACE),--replace,)

.PHONY: show-cues show-film
show-cues:
	$(PYTHON) lib/show/cues.py "$(MIX)"

# The music film recorded (ISS-107 A3): the mix read into its cue sheet, then SHOW played and recorded in
# real time in a browser window on this GPU (the tab capture accepted by itself): webm and mp4 in
# bld/show. SECONDS=N ends it early; MUTE=1 keeps the speakers quiet (the sound is then silent).
show-film:
	$(PYTHON) lib/show/cues.py "$(MIX)"
	cd $(APP_DIR) && node scripts/record-show.mjs --mix "$(abspath $(MIX))" --cues "$(CURDIR)/bld/show/cues.json" --out "$(CURDIR)/bld/show" $(if $(SECONDS),--seconds $(SECONDS),) $(if $(MUTE),--mute,)

# NKS presets read (lib/audio/nks.py): make nks DIR="path/to/presets" [JSON=1] -> a library summary, or
# FILE=... for one preset's card (the knob pages: section, name, VST parameter id). The plugins'
# machine-readable manual, for the sound side (ISS-118).
# The Soma control script for Ableton Live (ISS-118): the score's CCs move named plugin parameters.
# make live-rig [NKS=<folder of NKS presets>]  registry/audio/rig.yaml -> bld/live/rig.json (NKS names checked)
# make live-install                            the script and its rig into Live's User Library (Remote Scripts)
# make live-test                               the script tested outside Live (a faked Live)
.PHONY: live-rig live-install live-test
live-rig:
	$(PYTHON) lib/audio/rig.py $(if $(NKS),--nks "$(NKS)",)
live-install: live-rig
	$(PYTHON) lib/audio/live_install.py
live-test:
	$(PYTHON) lib/audio/test_soma.py

.PHONY: nks
nks:
	@$(PYTHON) lib/audio/nks.py --self-test >/dev/null && echo "nks self-test: PASS"
	$(PYTHON) lib/audio/nks.py "$(or $(FILE),$(DIR))" $(if $(JSON),--json,)

# The home page of https://www.t-theory.org from web/home.md (pandoc, no script writes markup).
# `make web` builds bld/web/index.html to look at; `make web-publish` copies it into the site
# repo (../t-theory.org); the author commits and pushes there when it should go live.
.PHONY: web web-publish
web: bld/web/index.html

bld/web/index.html: web/home.md
	mkdir -p $(dir $@)
	pandoc $< --from=markdown --to=html5 --standalone --eol=lf --output=$@

web-publish: bld/web/index.html
	cp $< ../t-theory.org/index.html

relay:
	cd apps/instrument/mother && $(MOTHER_PY) relay.py $(if $(LAN),--lan,)

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

# The emotional scores (registry/scores, The Tensor) as W3C EmotionML 1.0: bld/scores/ (ISS-054).
.PHONY: emotionml
emotionml:
	$(PYTHON) lib/scores/emotionml.py

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

# The UAT itself, step by step in a terminal (uat/checklist.yaml; HAL uat): resumable,
# answers in uat/results/, `c` sends a finding to the VS Code chat.
# The author's open steps, read from ISSUES.md (also HAL remind, and the Maintenance deck).
remind:
	@$(PYTHON) bin/remind $(ARGS)

# The Wizard (validation: built the right thing), beside Sherlock (verification) and the
# Monster (comprehensibility, the UAT). Reports in bld/sherlock/coverage-<book>.md (ISS-092).
.PHONY: wizard
wizard:
	$(PYTHON) sherlock/coverage.py $(ARGS)

# Sherlock's local build in one step (ISS-090; the VS Code command Sherlock: Set up runs this):
# Mathlib's prebuilt cache, NextKB (checked against its SHA-256), OpenCyc in Lean, the affidavits,
# then the ledger. Several GB and an hour or more; stops at the first failure.
.PHONY: sherlock-setup
sherlock-setup:
	lake exe cache get
	$(MAKE) -C sherlock all
	$(PYTHON) sherlock/ledger.py extract
	$(PYTHON) sherlock/ledger.py report

# Moriarty, Sherlock's adversary (ISS-094): plant the faults in registry/moriarty.yaml one at a
# time and see which the checks catch; each miss is a DOT. Report in bld/sherlock/moriarty.md.
.PHONY: moriarty
moriarty:
	$(PYTHON) sherlock/moriarty.py $(ARGS)

uat-run:
	$(PYTHON) uat/scripts/uat.py $(ARGS)

uat-stage-papers: registry-papers
	$(MAKE) -C paper uat-context-papers
	$(PYTHON) paper/scripts/stage_uat.py papers

uat-stage-ttheory: registry-fractal
	$(MAKE) -C paper uat-context-papers
	$(PYTHON) paper/scripts/stage_uat.py ttheory

uat-stage-lulu-proofs: registry-papers registry-fractal
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
