## Handoff Summary

- Continuing workflow setup: simple Diary.md, one file for all notes/tasks.
- Workflow rules: max 5 bullets, first step only, no long prose.
- Parked ideas: Universe workspace as hub, multi-project management.
- Last actions: Discussed handoff, context switching, and diary continuity.
- Next step: Keep logging here, use “STOP AND PARK” for context switches.


---
# 16 May 2026

Looked at Bass-OMatic https://www.youtube.com/watch?v=eVdR2RfXGUw 

I remember that well.
---

# 19 May 2026 — STOP AND PARK

## What got done today

- Main soma-field paper: figures (matplotlib + TikZ sources), bibliography complete, affiliations, abstract checked (304 words).
- Patient-POV paper: synced with 4 new sections.
- FIELD-NOTES: brainstorm on 7 new theoretical threads (RG flow, topological trauma, holonomy, Einstein coefficients, emotional ħ, Schwarzschild radius, SQ dyadic propagator).
- **Methodology paper written and committed:** `paper/mathematical-co-identification.md` — "Mathematical Co-identification: A Method for Structural Import Across Scientific Domains" — full draft, ~700 lines, 7 historical precedents, 5 soma-field worked examples, 6-class typeverse map, failure modes, epistemological section.
- All committed and pushed. HEAD: `d4a8234`. Repo clean.

## Next steps (morning)

### 1. Compile TikZ figures (10 min)
```bash
cd ~/prj/git/U/paper/figures
lualatex --interaction=nonstopmode fig1_architecture.tex
lualatex --interaction=nonstopmode fig4_instrument.tex
lualatex --interaction=nonstopmode figA2_functors.tex
```
MiKTeX 25.4 / lualatex confirmed installed. Then commit the PDFs.

### 2. Submit soma-field paper to bioRxiv (first time — follow these steps)

bioRxiv is the standard preprint server for biology/neuroscience. Free. No peer review. Immediate posting. DOI assigned. This is how you get the paper visible while it's under journal review.

1. Go to **https://www.biorxiv.org/submit**
2. Click **"Submit a New Manuscript"**
3. Create an account (or log in) — use your ORCID `0009-0007-2194-0850` to link
4. Subject area: **Neuroscience** (primary); you can add "Systems Biology" as secondary
5. Upload files:
   - Main manuscript: you'll need a PDF. Build it first: `cd ~/prj/git/U/paper && pandoc soma-field-paper.md --bibliography bibliography.bib --citeproc -o soma-field-paper.pdf`
   - Figures: upload the PDFs or PNGs from `paper/figures/`
6. Fill in: title, abstract (copy from YAML front matter), author (Alistair Johnson), ORCID, affiliation (Independent Researcher, Zurich, Switzerland)
7. **Cover letter field**: brief — "Submitted for consideration as a preprint. No conflicts of interest."
8. Submit. You get a DOI immediately (format: `10.1101/YYYY.MM.DD.NNNNNN`). It goes live within ~24h after basic screening.

Note: bioRxiv v2 means you already have v1 posted (BIORXIV/2026/725970). To update: log in → "Manage Submissions" → find the paper → "Revise" → upload the new PDF. The DOI stays the same; v2 is clearly labelled.

### 3. Submit to Frontiers in Computational Neuroscience (journal submission)

Frontiers is open-access, peer-reviewed, suitable for this work.

1. Go to **https://www.frontiersin.org/journals/computational-neuroscience**
2. Click **"Submit your research"** → "Submit manuscript"
3. Article type: **"Original Research"** or **"Hypothesis and Theory"** (the latter fits better — it's a theoretical framework paper)
4. Follow the wizard:
   - Upload manuscript (Word .docx preferred by Frontiers, OR LaTeX zip). To generate .docx: `pandoc soma-field-paper.md --bibliography bibliography.bib --citeproc -o soma-field-paper.docx`
   - Upload figures separately (they want high-res TIFFs or PDFs — use the PDFs from `paper/figures/`)
   - Fill in all author details, ORCID, affiliation
   - Ethics statement: "No human subjects or animal experiments were conducted."
   - Conflict of interest: "None."
   - Data availability: "All code and source files at https://github.com/Alistair-Johnson/U"
5. You'll get an acknowledgement email. Typical timeline: 1–4 weeks to first decision.

### 4. Submit methodology paper to arXiv (optional but good)

The methodology paper (`paper/mathematical-co-identification.md`) is better suited to **arXiv** than a biology journal — it's a methods/philosophy of science paper.

1. Go to **https://arxiv.org/submit**
2. Create account → Submit
3. Primary category: **math-ph** (Mathematical Physics) or **q-bio.NC** (Neurons and Cognition)
4. Build PDF: `pandoc paper/mathematical-co-identification.md --bibliography paper/bibliography.bib --citeproc -o mathematical-co-identification.pdf`
5. Upload PDF, fill in metadata (title, abstract from YAML front matter, author, ORCID)
6. Posts next business day. Free. DOI via arXiv.

### 5. (Optional) Compile soma-field paper to PDF to check it looks right before submitting
```bash
cd ~/prj/git/U/paper
pandoc soma-field-paper.md --bibliography bibliography.bib --citeproc --pdf-engine=lualatex -o soma-field-paper.pdf
```

---

