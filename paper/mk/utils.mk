# Utility targets
$(BUILDDIR):
	@mkdir -p $@

clean:
	rm -rf $(BUILDDIR)

# Download APA 7th edition CSL from the official CSL repository (run once)
setup: $(CSL)

$(CSL):
	curl -fsSL \
	  https://raw.githubusercontent.com/citation-style-language/styles/master/apa.csl \
	  -o $(CSL)
	@echo "Downloaded: $(CSL)"

# Freeze working files as a dated snapshot (e.g. make freeze FILE=soma-field-paper.md)
freeze:
	@test -n "$(FILE)" || (echo "Usage: make freeze FILE=soma-field-paper.md"; exit 1)
	cp $(FILE) $(FILE:.md=.V$(shell date +%Y%m%d).md)
	@echo "Frozen: $(FILE:.md=.V$(shell date +%Y%m%d).md)"

check:
	@command -v $(PANDOC) >/dev/null 2>&1 \
	  && echo "OK: pandoc $$(pandoc --version | head -1)" \
	  || (echo "MISSING: pandoc — https://pandoc.org/installing.html"; exit 1)
	@command -v $(ENGINE) >/dev/null 2>&1 \
	  && echo "OK: $(ENGINE)" \
	  || (echo "MISSING: $(ENGINE) — install texlive-xetex (Linux) or MiKTeX (Windows)"; exit 1)
	@test -f $(BIB) \
	  && echo "OK: $(BIB)" \
	  || echo "WARN: $(BIB) not found — citations will not resolve"
	@test -f $(CSL) \
	  && echo "OK: $(CSL)" \
	  || echo "WARN: $(CSL) not found — run 'make setup' to download"
