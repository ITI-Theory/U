# Sherlock: a document's claims (an affidavit) checked against its own numbers
# and against OpenCyc, in Lean 4 + Aesop (ISS-055; paper SH1).
#
# OpenCyc comes from NextKB (Northwestern QRG, CC BY 4.0): CycL with one file
# per microtheory. gen_krf.py writes one Lean module per microtheory into
# bld/sherlock/lean/CycKB (generated, never committed); each microtheory stays
# a scope, so a contradiction stays inside it. The OWL route (OpenCyc repaired
# to OWL 2 DL) lives in the private U.Ops repo.

include ../lib/mk/paths.mk

KB  := $(BLD)/sherlock/lean
RAW := $(BLD)/sherlock/raw
LOG := $(BLD)/sherlock/lake.log
NEXTKB_URL := https://www.qrg.northwestern.edu/nextkb/nextkb_files_20190107.zip
NEXTKB_ZIP := $(RAW)/nextkb_files_20190107.zip
NEXTKB_SHA := 5489856b64c9db1c69965ecb6a9a82382ddffd3fdf76c571b8bbde97405d7b79

.PHONY: help fetch lean-gen lean affidavits all clean check ledger delta rules-gen types towers readings readings-lean skyline clinical level-types leakage grammar impact presence model rivals bofh standalone gallery

help:
	$(info Sherlock (ISS-055), outputs in bld/sherlock/)
	$(info   fetch       download NextKB into bld/sherlock/raw and check SHA-256)
	$(info   lean-gen    NextKB to Lean, one module per microtheory (MT="BiologyMt ..." limits it))
	$(info   lean        build the core and all microtheories, one Lean process at a time (hours, several GB))
	$(info   affidavits  check the affidavits in Affidavits/, after lean; then check and ledger; reports in bld/sherlock/)
	$(info   check       the claims registry: sources, quotes, cited theorems; affidavits.md, values.md)
	$(info   ledger      documents' claims about the programme's Lean (all affidavits' documents, or LEDGER_DOCS=...); ledger.md)
	$(info   delta       ID=<affidavit> [REV=...]: what an edit did to its claims; delta-<ID>.md)
	$(info   rules-gen   OpenCyc's Horn rules to Lean (CycRules), no facts rebuild)
	$(info   types       the concept registry's OpenCyc classes as Lean types (SLICE=1: axioms, seconds; else proofs from the KB))
	$(info   level-types the levels as OpenCyc classes; concepts typed against them (WRITE=1: recompute the verdicts))
	$(info   leakage     model objects said to be body parts (OpenCyc's), no map stated (ISS-094))
	$(info   grammar     the app's pictures against the model, both ways: the chocolate-bar test (ISS-104))
	$(info   impact      where the programme could have an impact: Penrose's chapters x evidence x doubts (bld/sherlock/impact.md; ISS-106))
	$(info   presence    the web site, GitHub, the app and the notebook link to each other (registry/presence.yaml; ISS-109))
	$(info   rivals      the Dark Matter Lord: claims whose simpler rival is never named (registry/rivals.yaml; ISS-094))
	$(info   bofh        the BOFH: feelings on levels that cannot feel; jargon with no bridge for the general reader (ISS-094))
	$(info   standalone  every cheat sheet stands on its own: identity, its own words, its own references)
	$(info   gallery     every picture in A Gallery of Thoughts is the programme's own (ISS-097))
	$(info   model       the high-level model of [T]-Theory: its pointers resolve, its labels hold (registry/model.yaml; ISS-108))
	$(info   neighbours  the Wizard: OpenCyc neighbours of the concepts that no paper or book names (ISS-092))
	$(info   towers      the programme's Lean exported for the city of code (bld/sherlock/towers.json; about 25 min))
	$(info   clinical    sentences claiming a clinical effect with no hedge or evidence label (bld/sherlock/clinical.md; seconds))
	$(info   readings    sentences read as OpenCyc facts through NextKB's FrameNet translations, checked (bld/sherlock/readings.md; ISS-088))
	$(info   skyline     OpenCyc's facts per microtheory for the city's horizon (bld/sherlock/skyline.json; after lean-gen, seconds))
	$(info   all         fetch lean-gen rules-gen lean affidavits)
	@:

all: fetch lean-gen rules-gen lean affidavits

fetch:
	mkdir -p "$(RAW)"
	[ -f "$(NEXTKB_ZIP)" ] || curl -sSL -o "$(NEXTKB_ZIP)" "$(NEXTKB_URL)"
	echo "$(NEXTKB_SHA)  $(NEXTKB_ZIP)" | sha256sum -c -

lean-gen:
	$(PYTHON) gen_krf.py "$(NEXTKB_ZIP)" "$(KB)" $(MT)

# One Lean process at a time (Lake has no job limit, and the big microtheories
# need several GB each): modules smallest first (big microtheories come in parts
# of 8,000 facts), then the part-importing modules, the root and the queries.
lean:
	lake build Cyc CycKB.Mts
	@for f in $$(ls -Sr "$(KB)/CycKB"/*.lean); do \
	  head -n 1 $$f | grep -q '^-- parts' && continue; \
	  m=CycKB.$$(basename $$f .lean); \
	  [ -f .lake/build/lib/lean/CycKB/$$(basename $$f .lean).olean ] && continue; \
	  echo "lean $$m ($$(du -h $$f | cut -f1))"; \
	  LEAN_NUM_THREADS=2 lake build $$m > "$(LOG)" 2>&1 || { tail -n 30 "$(LOG)"; exit 1; }; tail -n 1 "$(LOG)"; \
	done
	lake build CycKB Queries

# One affidavit at a time: each imports all of UniversalVocabularyMt.
affidavits:
	@for f in $$(find Affidavits -name '*.lean' | sort); do \
	  m=$$(echo $${f%.lean} | tr / .); echo "lean $$m"; \
	  LEAN_NUM_THREADS=2 lake build $$m > "$(LOG)" 2>&1 || { tail -n 30 "$(LOG)"; exit 1; }; tail -n 1 "$(LOG)"; \
	done
	lake build Affidavits
	$(MAKE) check
	$(MAKE) ledger

# The claims registry (registry/affidavits): schema, frozen sources, quotes; every cited
# theorem exists in the compiled affidavits; the template checks (numbers as data,
# kernel-checked); reports (affidavits.md, values.md, palace.json).
check:
	cd .. && $(PYTHON) sherlock/registry.py check
	cd .. && $(PYTHON) sherlock/equations.py
	LEAN_NUM_THREADS=2 lake env lean Tools/Names.lean
	LEAN_NUM_THREADS=2 lake env lean Tools/Checks.lean
	cd .. && $(PYTHON) sherlock/registry.py report

# Documents' claims about the programme's own Lean: every document with an affidavit
# (registry/affidavits), or LEDGER_DOCS=... paper sources.
LEDGER_DOCS ?=
ledger:
	cd .. && $(PYTHON) sherlock/ledger.py extract $(patsubst ../%,%,$(LEDGER_DOCS))
	cd .. && $(PYTHON) sherlock/ledger.py judge
	cd .. && $(PYTHON) sherlock/ledger.py report

# What an edit did to an affidavit: make delta ID=zoomable-somatic-field [REV=...]
delta:
	cd .. && $(PYTHON) sherlock/delta.py $(ID) $(if $(REV),--rev $(REV),)

# The programme's Lean for the Soma Machine's city of code (ISS-071): one Lean process per module.
towers:
	cd .. && $(PYTHON) sherlock/towers.py

skyline:
	cd .. && $(PYTHON) sherlock/skyline.py

readings:
	cd .. && $(PYTHON) sherlock/semtrans.py build
	cd .. && $(PYTHON) sherlock/readings.py report
	cd .. && $(PYTHON) sherlock/readings.py qp

readings-lean:
	cd .. && $(PYTHON) sherlock/readings.py lean
	LEAN_NUM_THREADS=2 lake build CycReadings.Slice

clinical:
	cd .. && $(PYTHON) sherlock/clinical.py

# One set of types (ISS-063): each level's OpenCyc class and what it can bear; the app reads the verdicts.
neighbours:
	$(PYTHON) neighbours.py

leakage:
	$(PYTHON) leakage.py

grammar:
	$(PYTHON) visual_grammar.py

impact:
	$(PYTHON) impact.py

presence:
	$(PYTHON) presence.py

rivals:
	$(PYTHON) rivals.py

bofh:
	$(PYTHON) bofh.py

standalone:
	$(PYTHON) standalone.py

gallery:
	$(PYTHON) gallery_sources.py

model:
	$(PYTHON) model.py

level-types:
	$(PYTHON) level_types.py $(if $(WRITE),--write,)

# The concept registry's OpenCyc classes as Lean types (ISS-063, D12): SLICE=1 for the fast loop.
types:
	$(PYTHON) gen_types.py $(if $(SLICE),--slice,)
	LEAN_NUM_THREADS=2 lake build CycTypes.Concepts

# OpenCyc's Horn rules (bld/sherlock/lean/CycRules.lean); importing only Cyc.Rules, they never rebuild the facts.
rules-gen:
	$(PYTHON) gen_rules.py "$(NEXTKB_ZIP)" "$(KB)"
	lake build CycRules

clean:
	rm -rf "$(BLD)/sherlock" .lake/build