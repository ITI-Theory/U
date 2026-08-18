#!/usr/bin/env python3
"""Build the source for the Soma-Field facsimile paper collection.

The collection contains complete, independently rendered paper PDFs. It does
not merge their Markdown bodies or impose a shared chapter hierarchy.
"""

from __future__ import annotations

import re
import subprocess
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
PAPER_DIR = REPO_ROOT / "paper"
BLD_DIR = PAPER_DIR / "bld"

FRONTMATTER = """\
---
title: "Soma-Field Papers: A Facsimile Collection"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
description: "A collection of complete, independently paginated Soma-Field and Universal Somatic Field papers."
---"""

# (collection label, source slug). Labels orient the reader but do not create
# a book-style hierarchy inside the contained papers.
STRUCTURE = [
    ("Orientation", "soma-field-synthesis"),
    ("Orientation", "soma-field-book"),
    ("Orientation", "the-tensor"),
    ("Foundations", "soma-field-paper"),
    ("Foundations", "mathematical-co-identification"),
    ("Foundations", "quantum-soma-penrose"),
    ("Foundations", "soma-physical-substrate"),
    ("Foundations", "music-affect-dynamics"),
    ("Foundations", "gestalt-field-dynamics"),
    ("Clinical studies", "soma-field-patient-pov"),
    ("Clinical studies", "SFT-DEMO-CASE"),
    ("Clinical studies", "preverbal-manifold"),
    ("Applications", "missing-limbic-layer"),
    ("Applications", "swarm-propagator"),
    ("Applications", "geographic-somatic-field"),
    ("Universal theory", "universal-somatic-field"),
    ("Universal theory", "zoomable-somatic-field"),
    ("Universal theory", "experimental-validation"),
    ("Universal theory", "cosmological-constant-derivation"),
    ("Universal theory", "dark-matter-spatial-vacuum"),
    ("Universal theory", "g2-symmetry-breaking"),
    ("Gateway", "ttheory-phenomena"),
    ("Appendices", "soma-temporal-dynamics"),
    ("Appendices", "lean-proofs-appendix"),
]

_FRONTMATTER = re.compile(r"^---\n(.*?)\n---", re.DOTALL)


def get_metadata(slug: str) -> dict[str, object]:
    source = PAPER_DIR / "soma" / slug / f"{slug}.md"
    match = _FRONTMATTER.match(source.read_text(encoding="utf-8"))
    return yaml.safe_load(match.group(1)) if match else {}


def latex_text(value: object) -> str:
    return (
        str(value)
        .replace("\\", r"\textbackslash{}")
        .replace("&", r"\&")
        .replace("%", r"\%")
        .replace("_", r"\_")
    )


def raw_latex(command: str) -> str:
    return f"\n\n```{{=latex}}\n{command}\n```\n"


def pdf_page_count(slug: str) -> int:
    source = BLD_DIR / f"{slug}.pdf"
    result = subprocess.run(
        ["pdfinfo", str(source)], check=True, capture_output=True, text=True
    )
    match = re.search(r"^Pages:\s+(\d+)$", result.stdout, re.MULTILINE)
    if not match:
        raise RuntimeError(f"could not determine page count: {source}")
    return int(match.group(1))


def main() -> None:
    BLD_DIR.mkdir(exist_ok=True)
    output = [
        FRONTMATTER,
        raw_latex(r"\tableofcontents\cleardoublepage\chapter*{Collection Map}"),
        "This volume preserves each paper as a complete facsimile, including its own title pages, contents, references, and local pagination.\n",
    ]

    # The cover, blank inside cover, master contents, and collection map end
    # on physical page 8 in both editions. Track imported page counts from
    # there because pdfpages does not advance memoir's page counter.
    physical_pages = 8
    for label, slug in STRUCTURE:
        if physical_pages % 2:
            output.append(raw_latex(r"\collectionblank"))
            physical_pages += 1
        metadata = get_metadata(slug)
        title = latex_text(metadata.get("title", slug.replace("-", " ").title()))
        output.append(
            raw_latex(
                f"\\omnipaperdivider{{{latex_text(label)}}}{{{title}}}{{{latex_text(slug)}}}"
            )
        )
        output.append(
            raw_latex(
                rf"\includepdf[pages=-,artifact=false,pagecommand={{\thispagestyle{{empty}}}}]{{bld/{slug}.pdf}}"
            )
        )
        physical_pages += 1 + pdf_page_count(slug)

    target = BLD_DIR / "papers-collection.md"
    target.write_text("\n".join(output), encoding="utf-8")
    print(f"Written: {target.relative_to(REPO_ROOT)}")
    print(f"  Papers included: {len(STRUCTURE)}")
    print(f"  Physical pages: {physical_pages}")
    print("  Format: complete-PDF facsimiles with original local pagination")


if __name__ == "__main__":
    main()
