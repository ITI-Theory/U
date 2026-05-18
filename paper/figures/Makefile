# Makefile for paper/figures
# Run from within paper/figures/
#   make all       — build every figure
#   make matplotlib — python figures only
#   make tikz      — LaTeX figures only
#   make clean     — remove generated PDFs + PNGs

PYTHON   := python
LUALATEX := lualatex --interaction=nonstopmode --halt-on-error

PY_SCRIPTS := fig0_field_mode.py fig2_threshold.py \
              fig3a_energy_landscape.py fig3b_energy_profile.py \
              fig5_neurotype_landscapes.py figB1_attractor_basins.py

TEX_SOURCES := fig1_architecture.tex fig4_instrument.tex figA2_functors.tex

PY_PDFS  := $(PY_SCRIPTS:.py=.pdf)
TEX_PDFS := $(TEX_SOURCES:.tex=.pdf)

.PHONY: all matplotlib tikz clean

all: matplotlib tikz

matplotlib: $(PY_PDFS)

tikz: $(TEX_PDFS)

%.pdf: %.py
	$(PYTHON) $<

%.pdf: %.tex
	$(LUALATEX) $<

clean:
	rm -f *.pdf *.png *.aux *.log
