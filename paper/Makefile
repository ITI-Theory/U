# Soma-Field Papers -- PDF Build System.  Run: make help

include mk/common.mk

# vpath for registered docs injected by register macro (soma/<id>/).
# Residual: non-registered source dirs.
vpath %.md soma/SFT-DEMO-CASE soma/t-theory ai-method

# --- Document registry (one line per document) ---
# $(eval $(call register, id, class, langs, alias))
#   class: paper | citeproc | book
#   langs: en | multi (translation tooling is retained but deferred; release
#   candidates are English-only until translations are explicitly re-enabled)
#   alias: short make target (auto-generates .PHONY + rule)
$(eval $(call register, soma-field-paper,               paper,    multi, main    ))
$(eval $(call register, soma-field-patient-pov,         paper,    multi, pov     ))
$(eval $(call register, quantum-soma-penrose,            paper,    multi, quantum ))
$(eval $(call register, preverbal-manifold,              paper,    en,    preverbal))
$(eval $(call register, gestalt-field-dynamics,         citeproc, en,    gestalt ))
$(eval $(call register, missing-limbic-layer,           citeproc, en,    limbic  ))
$(eval $(call register, swarm-propagator,               citeproc, en,    swarm   ))
$(eval $(call register, universal-somatic-field,        citeproc, en,    usf     ))
$(eval $(call register, zoomable-somatic-field,         citeproc, en,    zsf     ))
$(eval $(call register, experimental-validation,        citeproc, en,    exp     ))
$(eval $(call register, geographic-somatic-field,       citeproc, en,    geo     ))
$(eval $(call register, mathematical-co-identification, citeproc, multi, method  ))
$(eval $(call register, music-affect-dynamics,          citeproc, multi, music   ))
$(eval $(call register, soma-field-synthesis,           citeproc, multi, synthesis))
$(eval $(call register, soma-physical-substrate,        citeproc, multi, substrate))
$(eval $(call register, soma-field-book,                book,     multi, book    ))
$(eval $(call register, the-tensor,                     book,     multi, tensor  ))
$(eval $(call register, soma-temporal-dynamics,         citeproc, en,    temporal))
$(eval $(call register, usf-euclidean-qft,              citeproc, en,    osqft   ))
$(eval $(call register, usf-interacting-qft,           citeproc, en,    intqft  ))
$(eval $(call register, cosmological-constant-derivation, citeproc, en,  cosconst))
$(eval $(call register, dark-matter-spatial-vacuum,       citeproc, en,  darkmatter))
$(eval $(call register, g2-symmetry-breaking,             citeproc, en,  g2break  ))
$(eval $(call register, ttheory-phenomena,                citeproc, en,  phenomena))
$(eval $(call register, SFT-DEMO-CASE,                     citeproc, en,  demo-case))

# Derived target lists (computed from registry)
_ALL_EN_PDFS := $(addprefix $(BUILDDIR)/, $(addsuffix .pdf, $(ALL_DOCS)))
_ALL_EN_HTML := $(addprefix $(BUILDDIR)/, $(addsuffix .html, $(ALL_DOCS)))
_MULTI_DOCS  := $(foreach d,$(ALL_DOCS),$(if $(filter multi,$($(d).langs)),$(d),))
PDFS_DE := $(addprefix $(BUILDDIR)/, $(addsuffix .de.pdf, $(_MULTI_DOCS)))
PDFS_FR := $(addprefix $(BUILDDIR)/, $(addsuffix .fr.pdf, $(_MULTI_DOCS)))
PDFS_IT := $(addprefix $(BUILDDIR)/, $(addsuffix .it.pdf, $(_MULTI_DOCS)))

# -----------------------------------------------------------------------------

.PHONY: all html help omnibus omnibus-royal omnibus-a4 glyph-papers lulu-cover uat-context-papers check-registry-hooks check-unicode-diagrams check-lulu-pages check-omnibus-format check-individual-format check-paper-references check-glyph-warnings \
	omnibus-translations translate-omnibus translate-omnibus-deepl \
	lean-appendix \
	clean check setup freeze \
	de fr it translations translations-clean translate translate-deepl everything-bundle

all: $(_ALL_EN_PDFS) omnibus | $(BUILDDIR)

html: $(_ALL_EN_HTML) | $(BUILDDIR)

glyph-papers: $(_ALL_EN_PDFS) lean-appendix

uat-context-papers:
	$(PYTHON) $(SCRIPTS)/generate_uat_context.py

check-registry-hooks:
	$(PYTHON) $(SCRIPTS)/check_registry_hooks.py

check-unicode-diagrams:
	$(PYTHON) $(SCRIPTS)/check_unicode_diagrams.py $(if $(STRICT),--strict)

check-lulu-pages:
	$(PYTHON) $(SCRIPTS)/check_lulu_pages.py

lulu-cover:
	$(MAKE) -C lulu-cover $(LULU_COVER_TARGET) COVER=$(COVER) INTERIOR=$(INTERIOR) TITLE="$(TITLE)" SUBTITLE="$(SUBTITLE)"

help:
	@echo "Soma-Field Papers -- PDF Build System"
	@echo ""
	@echo "  make             build all English PDFs"
	@echo "  make html        build English paper HTML files"
	@echo "  make omnibus     build the A4 omnibus"
	@echo "  make lean-appendix  standalone PDF of all Lean 4 proofs"
#	@echo "  make thesis      thesis edition (Royal + A4) [disabled — use omnibus]"
	@echo "  English-only release builds are active; translations are deferred"
	@echo "  make clean       remove paper outputs"
	@echo "  make check       verify pandoc + xelatex"
	@echo ""
	@echo "Registered documents (make <alias>):"
	@printf '%s\n' $(foreach d,$(ALL_DOCS),'  $($(d).alias)  [$($(d).class), $($(d).langs)]  $(d)')

# (alias targets generated by register macro in mk/common.mk)

# Omnibus builds are assembled by filters/omnibus.lua from Dist/PAPERS.yaml.
omnibus-royal: omnibus.md omnibus.tex unicode-math-text.tex filters/omnibus.lua lean-appendix | $(BUILDDIR)
	$(PANDOC) omnibus.md -o $(BUILDDIR)/omnibus-royal.pdf --defaults=$(DEFAULTS)/omnibus-royal.yaml
	@echo "Built: $(BUILDDIR)/omnibus-royal.pdf"

omnibus-a4: omnibus.md omnibus.tex unicode-math-text.tex filters/omnibus.lua lean-appendix | $(BUILDDIR)
	$(PANDOC) omnibus.md -o $(BUILDDIR)/omnibus-a4.pdf $(OMNIBUS_DEFAULTS)
	@echo "Built: $(BUILDDIR)/omnibus-a4.pdf"

omnibus: omnibus-a4

check-omnibus-format: omnibus-a4
	$(PYTHON) $(SCRIPTS)/check_omnibus_format.py

PAPER ?= soma-field-synthesis
check-individual-format: $(BUILDDIR)/$(PAPER).pdf
	$(PYTHON) $(SCRIPTS)/check_individual_format.py $(BUILDDIR)/$(PAPER).pdf

check-paper-figures: $(BUILDDIR)/$(PAPER).pdf
	$(PYTHON) $(SCRIPTS)/check_paper_figures.py $(PAPER) --pdf $(BUILDDIR)/$(PAPER).pdf

check-paper-references: $(BUILDDIR)/$(PAPER).pdf
	$(PYTHON) $(SCRIPTS)/check_paper_references.py $(PAPER) --pdf $(BUILDDIR)/$(PAPER).pdf

check-glyph-warnings:
	$(PYTHON) $(SCRIPTS)/check_glyph_warnings.py

# ---------------------------------------------------------------------------
# Lean appendix — standalone PDF of all Lean 4 proof files
# Re-run this whenever a .lean file in paper/proofs/ changes.
# The omnibus target depends on this appendix so it is current before rendering.
# ---------------------------------------------------------------------------

LEAN_PROOFS := $(wildcard proofs/*.lean)

lean-appendix: soma/lean-proofs-appendix/lean-proofs-appendix.md soma/lean-proofs-appendix/catalogue.yaml filters/lean-include.lua $(DEFAULTS)/lean-appendix.yaml $(LEAN_PROOFS) | $(BUILDDIR)
	$(PANDOC) soma/lean-proofs-appendix/lean-proofs-appendix.md -o $(BUILDDIR)/lean-proofs-appendix.pdf --defaults=$(DEFAULTS)/lean-appendix.yaml
	@echo "Built: $(BUILDDIR)/lean-proofs-appendix.pdf"

translate-omnibus: | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/translate_papers.py omnibus-body --model gpt-4o-mini

translate-omnibus-deepl: | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/translate_papers.py omnibus-body --backend deepl

# ---------------------------------------------------------------------------
# Per-language translate-and-build convenience targets
#   make omnibus-translate-de   — translate to German, build A4 PDF
#   make omnibus-translate-fr   — translate to French,  build A4 PDF
#   make omnibus-translate-it   — translate to Italian, build A4 PDF
#   make omnibus-translate-en   — EN only (redundant alias for 'make omnibus')
#   make omnibus-translate      — all four languages
# Each target runs translation then builds the A4 PDF in one command.
# ---------------------------------------------------------------------------
.PHONY: omnibus-translate-de omnibus-translate-fr omnibus-translate-it omnibus-translate-en omnibus-translate

omnibus-translate-de: | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/translate_papers.py omnibus-body --langs de
	$(PANDOC) $(BUILDDIR)/omnibus-body.de.md -o $(BUILDDIR)/omnibus-a4.de.pdf $(OMNIBUS_DEFAULTS) --metadata=lang:de
	@echo "Built: $(BUILDDIR)/omnibus-a4.de.pdf"

omnibus-translate-fr: | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/translate_papers.py omnibus-body --langs fr
	$(PANDOC) $(BUILDDIR)/omnibus-body.fr.md -o $(BUILDDIR)/omnibus-a4.fr.pdf $(OMNIBUS_DEFAULTS) --metadata=lang:fr
	@echo "Built: $(BUILDDIR)/omnibus-a4.fr.pdf"

omnibus-translate-it: | $(BUILDDIR)
	$(PYTHON) $(SCRIPTS)/translate_papers.py omnibus-body --langs it
	$(PANDOC) $(BUILDDIR)/omnibus-body.it.md -o $(BUILDDIR)/omnibus-a4.it.pdf $(OMNIBUS_DEFAULTS) --metadata=lang:it
	@echo "Built: $(BUILDDIR)/omnibus-a4.it.pdf"

omnibus-translate-en: omnibus
	@echo "(EN omnibus is 'make omnibus' — already up to date)"

omnibus-translate: omnibus omnibus-translate-de omnibus-translate-fr omnibus-translate-it

define BUILD_OMNIBUS_TRANS_RULE
.PHONY: omnibus-royal-$(1) omnibus-a4-$(1)
omnibus-royal-$(1): | $(BUILDDIR)
	$(PANDOC) $(BUILDDIR)/omnibus-body.$(1).md -o $(BUILDDIR)/omnibus-royal.$(1).pdf --defaults=$(DEFAULTS)/omnibus-royal.yaml --metadata=lang:$(1)
	@echo "Built: $(BUILDDIR)/omnibus-royal.$(1).pdf"
omnibus-a4-$(1): | $(BUILDDIR)
	$(PANDOC) $(BUILDDIR)/omnibus-body.$(1).md -o $(BUILDDIR)/omnibus-a4.$(1).pdf $(OMNIBUS_DEFAULTS) --metadata=lang:$(1)
	@echo "Built: $(BUILDDIR)/omnibus-a4.$(1).pdf"
endef
$(foreach l,de fr it,$(eval $(call BUILD_OMNIBUS_TRANS_RULE,$(l))))
omnibus-translations: omnibus-royal-de omnibus-royal-fr omnibus-royal-it omnibus-a4-de omnibus-a4-fr omnibus-a4-it

# --- Rule generation from registry ---
# EN rule: source via vpath; flags + citeproc derived from doc class
define BUILD_EN_RULE
$(BUILDDIR)/$(1).pdf: $(1).md journal.tex unicode-math-text.tex filters/strip-keywords.lua filters/boxes.lua $(BIB) $(CSL) $(DEFAULTS)/pdf-a4.yaml $(DEFAULTS)/book.yaml | $(BUILDDIR)
	$(PANDOC) $$< -o $$@ $(if $(filter book,$($(1).class)),$(BOOK_FLAGS),$(FLAGS))
	@echo "Built: $$@"
endef

define BUILD_HTML_RULE
$(BUILDDIR)/$(1).html: $(1).md filters/strip-keywords.lua filters/boxes.lua $(BIB) $(CSL) $(DEFAULTS)/html.yaml | $(BUILDDIR)
	$(PANDOC) $$< -o $$@ $(HTML_DEFAULTS)
	@echo "Built: $$@"
endef

# Translation rule: source from bld/; flags derived from doc class × lang
define BUILD_TRANS_RULE
$(BUILDDIR)/$(1).$(2).pdf: $(BUILDDIR)/$(1).$(2).md $(if $(filter citeproc,$($(1).class)),$(BIB),) | $(BUILDDIR)
	$(PANDOC) $$< -o $$@ $(if $(filter book,$($(1).class)),$(BOOK_FLAGS_$(2)),$(FLAGS_$(2))) $(if $(filter citeproc,$($(1).class)),$(CITEPROC),)
	@echo "Built: $$@"
endef

# Translations are retained as dormant tooling, but only English is currently
# supported for candidate and release builds. Set explicitly when translation
# work resumes.
TRANS_LANGS ?=
$(foreach d,$(ALL_DOCS),$(eval $(call BUILD_EN_RULE,$(d))))
$(foreach d,$(ALL_DOCS),$(eval $(call BUILD_HTML_RULE,$(d))))
$(foreach d,$(ALL_DOCS),$(foreach l,$(TRANS_LANGS),$(if $(filter multi,$($(d).langs)),$(eval $(call BUILD_TRANS_RULE,$(d),$(l))),)))

include mk/utils.mk

# Individual-paper translations — run make translate (LLM) or make translate-deepl first.

translate:
	$(PYTHON) $(SCRIPTS)/translate_papers.py --backend llm

translate-deepl:
	$(PYTHON) $(SCRIPTS)/translate_papers.py --backend deepl

.PHONY: translate translate-deepl

translations: $(PDFS_DE) $(PDFS_FR) $(PDFS_IT)

de: $(PDFS_DE)

fr: $(PDFS_FR)

it: $(PDFS_IT)

translations-clean:
	rm -f $(PDFS_DE) $(PDFS_FR) $(PDFS_IT)

everything-bundle:
	$(PYTHON) $(SCRIPTS)/package_everything.py --version v1.0.0

# --- Standard papers (FLAGS only) — pattern rules ---

$(BUILDDIR)/%.de.pdf: $(BUILDDIR)/%.de.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_DE)
	@echo "Built: $@"

$(BUILDDIR)/%.fr.pdf: $(BUILDDIR)/%.fr.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_FR)
	@echo "Built: $@"

$(BUILDDIR)/%.it.pdf: $(BUILDDIR)/%.it.md | $(BUILDDIR)
	$(PANDOC) $< -o $@ $(FLAGS_IT)
	@echo "Built: $@"
