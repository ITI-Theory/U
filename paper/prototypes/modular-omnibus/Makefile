ENGINE := xelatex
OUT := bld

.PHONY: all subfiles combine clean

all: subfiles combine

subfiles: $(OUT)/subfiles-master.pdf $(OUT)/subfiles-paper-a.pdf $(OUT)/subfiles-book-b.pdf

combine: $(OUT)/combine-master.pdf $(OUT)/combine-paper-a.pdf $(OUT)/combine-book-b.pdf

$(OUT):
	mkdir -p $(OUT)

$(OUT)/subfiles-master.pdf: subfiles/master.tex subfiles/paper-a.tex subfiles/book-b.tex | $(OUT)
	cd subfiles && $(ENGINE) -interaction=nonstopmode -jobname=subfiles-master -output-directory=../$(OUT) master.tex
	cd subfiles && $(ENGINE) -interaction=nonstopmode -jobname=subfiles-master -output-directory=../$(OUT) master.tex

$(OUT)/subfiles-paper-a.pdf: subfiles/paper-a.tex subfiles/master.tex | $(OUT)
	cd subfiles && $(ENGINE) -interaction=nonstopmode -jobname=subfiles-paper-a -output-directory=../$(OUT) paper-a.tex

$(OUT)/subfiles-book-b.pdf: subfiles/book-b.tex subfiles/master.tex | $(OUT)
	cd subfiles && $(ENGINE) -interaction=nonstopmode -jobname=subfiles-book-b -output-directory=../$(OUT) book-b.tex

$(OUT)/combine-master.pdf: combine/master.tex combine/paper-a.tex combine/book-b.tex | $(OUT)
	cd combine && $(ENGINE) -interaction=nonstopmode -jobname=combine-master -output-directory=../$(OUT) master.tex
	cd combine && $(ENGINE) -interaction=nonstopmode -jobname=combine-master -output-directory=../$(OUT) master.tex

$(OUT)/combine-paper-a.pdf: combine/paper-a.tex | $(OUT)
	cd combine && $(ENGINE) -interaction=nonstopmode -jobname=combine-paper-a -output-directory=../$(OUT) paper-a.tex

$(OUT)/combine-book-b.pdf: combine/book-b.tex | $(OUT)
	cd combine && $(ENGINE) -interaction=nonstopmode -jobname=combine-book-b -output-directory=../$(OUT) book-b.tex

clean:
	rm -rf $(OUT)
