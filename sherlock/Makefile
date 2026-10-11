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

.PHONY: help fetch lean-gen lean affidavits all clean

help:
	$(info Sherlock (ISS-055), outputs in bld/sherlock/)
	$(info   fetch       download NextKB into bld/sherlock/raw and check SHA-256)
	$(info   lean-gen    NextKB to Lean, one module per microtheory (MT="BiologyMt ..." limits it))
	$(info   lean        build the core and all microtheories, one Lean process at a time (hours, several GB))
	$(info   affidavits  check the affidavits (Affidavits/), after lean)
	$(info   all         fetch lean-gen lean affidavits)
	@:

all: fetch lean-gen lean affidavits

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

clean:
	rm -rf "$(BLD)/sherlock" .lake/build