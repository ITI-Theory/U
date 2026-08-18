#!/usr/bin/env python3
"""
build_omnibus.py — Assemble all papers into a single omnibus document.

Calls build_lean_appendix.py first to ensure the Lean appendix source
(soma/lean-proofs-appendix/lean-proofs-appendix.md) is current.

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

import yaml

# Lean appendix generator — run before assembly to keep proofs current.
# Import is deferred to main() to avoid circular-import issues when
# build_thesis.py imports from this module.
def _regenerate_lean_appendix() -> None:
    import importlib.util, os
    here = Path(__file__).parent
    spec = importlib.util.spec_from_file_location(
        "build_lean_appendix", here / "build_lean_appendix.py")
    mod = importlib.util.module_from_spec(spec)  # type: ignore[arg-type]
    spec.loader.exec_module(mod)  # type: ignore[union-attr]
    mod.main()

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
PAPER_DIR = REPO_ROOT / "paper"
BLD_DIR   = PAPER_DIR / "bld"

# ---------------------------------------------------------------------------
# Unified YAML frontmatter for the omnibus
# ---------------------------------------------------------------------------

FRONTMATTER = """\
---
title: "The Soma-Field: Collected Works — Second Edition"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
description: "Complete collected works of the Soma-Field and Universal Somatic Field research programme: from lay introduction to formal proofs, quantum experiment, clinical applications, AI extensions, the universal scale-invariant theory, and the [T]-Theory gateway."
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
    (r"\cleardoublepage" "\n\n" r"\part{Part I: The Body Knows}",
     "soma-field-book"),

    # Interlude: The Tensor — bridge to Phase 2 / Art
    (r"\cleardoublepage" "\n\n" r"\part{Interlude: The Tensor --- A Film in Fields}",
     "the-tensor"),

    # Part II: The formal apparatus — original six plus gestalt (P10)
    (r"\cleardoublepage" "\n\n" r"\part{Part II: The Formal Apparatus}",
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
     "gestalt-field-dynamics"),

    # Part III: Clinical demonstrations — patient perspective, demo case, pre-verbal
    (r"\cleardoublepage" "\n\n" r"\part{Part III: Clinical Demonstrations}",
     "soma-field-patient-pov"),

    (r"\newpage",
     "SFT-DEMO-CASE"),

    (r"\newpage",
     "preverbal-manifold"),

    # Part IV: Extensions and applications
    # The FM-HN paper unifies 1982 and 2020 Hopfield networks via the soma field.
    # The swarm paper shows the same Green's function governs drone coordination.
    # The geographic paper shows the same equation governs dialect spread and bird swarms.
    # The reader may find the swarm and geography papers surprising; that surprise is the point.
    (r"\cleardoublepage" "\n\n" r"\part{Part IV: Extensions and Applications}",
     "missing-limbic-layer"),

    (r"\newpage",
     "swarm-propagator"),

    (r"\newpage",
     "geographic-somatic-field"),

    # Part V: The universal theory — the capstone papers
    (r"\cleardoublepage" "\n\n" r"\part{Part V: The Universal Theory}",
     "universal-somatic-field"),

    (r"\newpage",
     "zoomable-somatic-field"),

    (r"\newpage",
     "experimental-validation"),

    (r"\newpage",
     "cosmological-constant-derivation"),

    (r"\newpage",
     "dark-matter-spatial-vacuum"),

    (r"\newpage",
     "g2-symmetry-breaking"),

    (r"\cleardoublepage" "\n\n" r"\part{Part VI: The Gateway}",
     "ttheory-phenomena"),

    # Appendix: Lean 4 formal proofs — included in the body so any reader
    # (human or AI) sees the actual type-checked code, not a pointer to it.
    (r"\cleardoublepage" "\n\n" r"\appendix" "\n\n" r"\part{Appendix A: Temporal Dynamics}",
     "soma-temporal-dynamics"),

    (r"\cleardoublepage" "\n\n" r"\part{Appendix B: Formal Lean 4 Verifications}",
     "lean-proofs-appendix"),
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

def get_title(paper_name: str) -> str:
    """Extract display title from a paper's YAML frontmatter."""
    path = PAPER_DIR / "soma" / paper_name / f"{paper_name}.md"
    if not path.exists():
        return paper_name.replace("-", " ").title()
    text = path.read_text(encoding="utf-8")
    for pat in [r'^title:\s*"([^"]+)"', r"^title:\s*'([^']+)'", r'^title:\s*(.+?)\s*$']:
        m = re.search(pat, text, re.MULTILINE)
        if m:
            return m.group(1).strip()
    return paper_name


def get_metadata(paper_name: str) -> dict:
    """Read the YAML front matter for a canonical paper."""
    path = PAPER_DIR / "soma" / paper_name / f"{paper_name}.md"
    if not path.exists():
        return {}
    match = _FM_RE.match(path.read_text(encoding="utf-8"))
    if not match:
        return {}
    return yaml.safe_load(match.group(0).removeprefix("---\n").rsplit("\n---", 1)[0]) or {}


def get_body(paper_name: str) -> str:
    """Read a source paper and return its body (YAML and References stripped).
    Headings shifted down one level so injected chapter title doesn't clash."""
    path = PAPER_DIR / "soma" / paper_name / f"{paper_name}.md"
    if not path.exists():
        print(f"  WARNING: {path.name} not found — skipping", file=sys.stderr)
        return ""
    text = path.read_text(encoding="utf-8")
    text = _FM_RE.sub("", text, count=1)
    text = _REF_RE.sub("", text)
    # Shift headings down 1 level: # → ##, ## → ###, etc.
    text = re.sub(r'^(#{1,5})(?= )', r'#\1', text, flags=re.MULTILINE)
    return text.strip()


def _latex_text(text: str) -> str:
    """Escape plain titles inserted into the raw-LaTeX paper divider."""
    return (text.replace("\\", r"\textbackslash{}")
                .replace("&", r"\&")
                .replace("%", r"\%")
                .replace("_", r"\_"))


def paper_divider(title: str, slug: str) -> str:
    """Return the visible recto opening page for an included paper."""
    return (
        "\n\n```{=latex}\n"
        f"\\omnipaperdivider{{{_latex_text(title)}}}{{{_latex_text(slug)}}}\n"
        "```\n"
    )


def paper_abstract(abstract: object) -> str:
    """Return a visible abstract block when the source supplies one."""
    if not abstract:
        return ""
    return f"\n\n## Abstract\n\n{str(abstract).strip()}\n"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    BLD_DIR.mkdir(exist_ok=True)

    # Keep lean appendix source current before assembling the omnibus.
    print("Generating lean-proofs-appendix.md …")
    _regenerate_lean_appendix()

    out_path = BLD_DIR / "omnibus-body.md"

    sections: list[str] = [FRONTMATTER]

    for part_divider, paper_name in STRUCTURE:
        if part_divider:
            sections.append(f"\n\n{part_divider}\n")
        if paper_name:
            metadata = get_metadata(paper_name)
            title = metadata.get("title", get_title(paper_name))
            body  = get_body(paper_name)
            if body:
                sections.append(paper_divider(title, paper_name))
                sections.append(paper_abstract(metadata.get("abstract")))
                sections.append(f"\n\n# {title}\n\n{body}\n")
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
