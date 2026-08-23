ENGINE := xelatex
OUT := bld

.PHONY: all subfiles clean

all: subfiles

subfiles: $(OUT)/subfiles-master.pdf $(OUT)/subfiles-paper-a.pdf $(OUT)/subfiles-book-b.pdf

$(OUT):
	mkdir -p $(OUT)

$(OUT)/subfiles-master.pdf: subfiles/master.tex subfiles/paper-a.tex subfiles/book-b.tex | $(OUT)
	cd subfiles && $(ENGINE) -interaction=nonstopmode -jobname=subfiles-master -output-directory=../$(OUT) master.tex
	cd subfiles && $(ENGINE) -interaction=nonstopmode -jobname=subfiles-master -output-directory=../$(OUT) master.tex

$(OUT)/subfiles-paper-a.pdf: subfiles/paper-a.tex subfiles/master.tex | $(OUT)
	cd subfiles && $(ENGINE) -interaction=nonstopmode -jobname=subfiles-paper-a -output-directory=../$(OUT) paper-a.tex

$(OUT)/subfiles-book-b.pdf: subfiles/book-b.tex subfiles/master.tex | $(OUT)
	cd subfiles && $(ENGINE) -interaction=nonstopmode -jobname=subfiles-book-b -output-directory=../$(OUT) book-b.tex

clean:
	rm -rf $(OUT)
