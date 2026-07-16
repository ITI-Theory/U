# Wave Atlas coffee-table sandbox Makefile
# Builds three layout variants from the same sample.md, side-by-side.

PANDOC ?= pandoc
ENGINE ?= xelatex
BLD    := bld

SRC    := sample.md

# Crown Quarto trim — same as the real Atlas
GEOM   := paperwidth=189mm,paperheight=246mm,twoside

# Layout A: tufte-book — asymmetric margins, wide outer for notes
# tufte-book defines its own geometry; do NOT pass -V geometry (clash)
FLAGS_A := --pdf-engine=$(ENGINE) --standalone --toc --toc-depth=1 \
  -V documentclass=tufte-book \
  -V classoption=openany,a4paper \
  -V fontsize=10pt \
  -V colorlinks=true -V linkcolor=NavyBlue -V urlcolor=NavyBlue -V toccolor=NavyBlue \
  --include-in-header=header-A.tex

# Layout B: KOMA scrbook with sidenotes — modern monograph
GEOM_B := $(GEOM),inner=20mm,outer=50mm,top=22mm,bottom=30mm,marginparwidth=38mm,marginparsep=6mm
FLAGS_B := --pdf-engine=$(ENGINE) --standalone --toc --toc-depth=1 \
  -V documentclass=scrbook \
  -V classoption=openany,twoside,headings=small \
  -V "geometry=$(GEOM_B)" \
  -V fontsize=10.5pt \
  -V colorlinks=true -V linkcolor=NavyBlue -V urlcolor=NavyBlue -V toccolor=NavyBlue \
  --include-in-header=header-B.tex

# Layout C: maximalist coffee-table — big openers, big folios, big air
GEOM_C := $(GEOM),inner=24mm,outer=40mm,top=30mm,bottom=35mm
FLAGS_C := --pdf-engine=$(ENGINE) --standalone --toc --toc-depth=1 \
  -V documentclass=book \
  -V classoption=openany,twoside \
  -V "geometry=$(GEOM_C)" \
  -V fontsize=11pt \
  -V colorlinks=true -V linkcolor=NavyBlue -V urlcolor=NavyBlue -V toccolor=NavyBlue \
  --include-in-header=header-C.tex

.PHONY: all A B C clean
all: A B C

$(BLD):
	mkdir -p $(BLD)

A: | $(BLD)
	$(PANDOC) $(SRC) -o $(BLD)/atlas-A.pdf $(FLAGS_A) || echo "A failed — check header-A.tex"
	@echo "Built: $(BLD)/atlas-A.pdf"

B: | $(BLD)
	$(PANDOC) $(SRC) -o $(BLD)/atlas-B.pdf $(FLAGS_B) || echo "B failed — check header-B.tex"
	@echo "Built: $(BLD)/atlas-B.pdf"

C: | $(BLD)
	$(PANDOC) $(SRC) -o $(BLD)/atlas-C.pdf $(FLAGS_C) || echo "C failed — check header-C.tex"
	@echo "Built: $(BLD)/atlas-C.pdf"

clean:
	rm -rf $(BLD)
