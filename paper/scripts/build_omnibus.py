#!/usr/bin/env python3
"""
build_omnibus.py — Assemble all papers into a single omnibus document.

Structure of the output
-----------------------
  [Unified YAML frontmatter]
  Synthesis / Kappa Introduction       <- soma-field-synthesis
  Part I: The Body Knows               <- soma-field-book
  Interlude: The Tensor                <- the-tensor
  Part II: The Formal Apparatus:
    The Soma-Field (core model)        <- soma-field-paper
    Mathematical Co-identification     <- mathematical-co-identification
    Quantum Experiment                 <- quantum-soma-penrose
    The Physical Substrate             <- soma-physical-substrate
    Music and Affect                   <- music-affect-dynamics
    The Patient Perspective            <- soma-field-patient-pov
  [Unified bibliography — citeproc]

Output
------
  paper/bld/omnibus-body.md    (merged source)
  paper/bld/omnibus-royal.pdf  (built by 'make omnibus-royal' — 156×234mm sewn)
  paper/bld/omnibus-a4.pdf     (built by 'make omnibus-a4'    — A4 duplex ring-binder)

Usage
-----
  make omnibus          (builds both PDF variants via Makefile)
  python scripts/build_omnibus.py   (generates merged .md only)
"""

import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
PAPER_DIR = REPO_ROOT / "paper"
BLD_DIR   = PAPER_DIR / "bld"

# ---------------------------------------------------------------------------
# Unified YAML frontmatter for the omnibus
# ---------------------------------------------------------------------------

FRONTMATTER = """\
---
title: "The Soma-Field: Collected Works"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
description: "A complete collection of the Soma-Field research programme: from lay introduction to formal proofs, quantum experiment, and clinical applications."
bibliography: bibliography.bib
csl: apa-7th.csl
---"""

# ---------------------------------------------------------------------------
# Document structure
# Each entry: (part_divider | None, paper_name | None)
# part_divider = raw LaTeX \part{} command inserted before the paper
# paper_name   = source file to merge (strips its YAML + References)
# ---------------------------------------------------------------------------

STRUCTURE = [
    # Kappa / editorial introduction (no part divider — flows before Part I)
    (None,
     "soma-field-synthesis"),

    # Part I: The lay book
    (r"\newpage" "\n\n" r"\part{Part I: The Body Knows}",
     "soma-field-book"),

    # Interlude: The Tensor — bridge to Phase 2 / Art
    (r"\newpage" "\n\n" r"\part{Interlude: The Tensor --- A Film in Fields}",
     "the-tensor"),

    # Part II: The six formal papers
    (r"\newpage" "\n\n" r"\part{Part II: The Formal Apparatus}",
     "soma-field-paper"),

    (r"\newpage",
     "mathematical-co-identification"),

    (r"\newpage",
     "quantum-soma-penrose"),

    (r"\newpage",
     "soma-physical-substrate"),

    (r"\newpage",
     "music-affect-dynamics"),

    (r"\newpage",
     "soma-field-patient-pov"),

    # Part III: Clinical case study — closing chapter
    (r"\newpage" "\n\n" r"\part{Part III: Clinical Demonstration}",
     "SFT-DEMO-CASE"),
]

# ---------------------------------------------------------------------------
# Regex patterns
# ---------------------------------------------------------------------------

# Matches YAML frontmatter block at start of file
_FM_RE  = re.compile(r"^---\n[\s\S]*?\n---\n\n?", re.MULTILINE)

# Matches a References section at the end (manual refs — citeproc handles [@key])
_REF_RE = re.compile(r"\n#{1,3}\s+References\b[\s\S]*$", re.IGNORECASE)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def get_body(paper_name: str) -> str:
    """Read a source paper and return its body (YAML and References stripped)."""
    path = PAPER_DIR / "soma" / paper_name / f"{paper_name}.md"
    if not path.exists():
        print(f"  WARNING: {path.name} not found — skipping", file=sys.stderr)
        return ""
    text = path.read_text(encoding="utf-8")
    text = _FM_RE.sub("", text, count=1)   # strip YAML frontmatter
    text = _REF_RE.sub("", text)            # strip trailing References section
    return text.strip()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    BLD_DIR.mkdir(exist_ok=True)
    out_path = BLD_DIR / "omnibus-body.md"

    sections: list[str] = [FRONTMATTER]

    for part_divider, paper_name in STRUCTURE:
        if part_divider:
            sections.append(f"\n\n{part_divider}\n")
        if paper_name:
            body = get_body(paper_name)
            if body:
                sections.append(f"\n\n{body}\n")
                print(f"  + {paper_name}")

    output = "\n".join(sections)
    out_path.write_text(output, encoding="utf-8")

    lines    = output.count("\n")
    size_kb  = out_path.stat().st_size / 1024
    papers   = sum(1 for _, p in STRUCTURE if p is not None)

    print(f"\nWritten: {out_path.relative_to(REPO_ROOT)}")
    print(f"  Papers merged : {papers}")
    print(f"  Lines         : {lines:,}")
    print(f"  Size          : {size_kb:.0f} KB")
    print(f"\nRun 'make omnibus' in paper/ to build the PDF.")


if __name__ == "__main__":
    main()
