#!/usr/bin/env python3
"""Verify the mechanical print-format contract for the Papers Omnibus."""

from __future__ import annotations

import shutil
import subprocess
import sys
import re
import yaml
from pathlib import Path

PAPER_DIR = Path(__file__).resolve().parent.parent
BODY = PAPER_DIR / "bld" / "omnibus-body.md"
PDF = PAPER_DIR / "bld" / "omnibus-a4.pdf"
BUILD_SCRIPT = PAPER_DIR / "scripts" / "build_omnibus.py"


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def page_text(pdf: Path, start: int, end: int) -> str:
    command = ["pdftotext", "-f", str(start), "-l", str(end), "-layout", str(pdf), "-"]
    return subprocess.run(command, check=True, capture_output=True, text=True).stdout


def source_abstract(slug: str) -> str:
    source = PAPER_DIR / "soma" / slug / f"{slug}.md"
    text = source.read_text(encoding="utf-8")
    match = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not match:
        return ""
    metadata = yaml.safe_load(match.group(1)) or {}
    return str(metadata.get("abstract", "")).strip()


def main() -> None:
    if not BODY.is_file():
        fail(f"missing body: {BODY}")
    if not PDF.is_file():
        fail(f"missing PDF: {PDF}")
    if shutil.which("pdftotext") is None:
        fail("pdftotext is unavailable")

    body = BODY.read_text(encoding="utf-8")
    divider_count = body.count("\\omnipaperdivider{")
    if divider_count == 0:
        fail("no paper divider commands found")
    if not re.search(r"\\cleardoublepage\s+\\part\{", body):
        fail("major parts are not preceded by cleardoublepage")
    if not re.search(r"\\cleardoublepage\s+\\appendix", body):
        fail("appendix is not preceded by cleardoublepage")

    build_namespace: dict[str, object] = {"__file__": str(BUILD_SCRIPT), "__name__": "omnibus_format"}
    exec(BUILD_SCRIPT.read_text(encoding="utf-8"), build_namespace)
    for _, slug in build_namespace["STRUCTURE"]:
        if slug:
            abstract = source_abstract(slug)
            if abstract and abstract not in body:
                fail(f"abstract missing from merged body: {slug}")

    first_pages = page_text(PDF, 1, 3).split("\f")
    if len(first_pages) < 3:
        fail("PDF has fewer than three physical pages")
    if first_pages[1].strip():
        fail("physical page 2 is not blank inside cover")
    if "Contents" not in first_pages[2]:
        fail("physical page 3 does not begin the master contents")

    divider_slugs = re.findall(r"\\omnipaperdivider\{.*?\}\{([^}]+)\}", body, re.DOTALL)
    all_pages = page_text(PDF, 1, 10000).split("\f")
    for slug in divider_slugs:
        page_number = next(
            (index + 1 for index, page in enumerate(all_pages) if slug in page and "PAPER" in page),
            None,
        )
        if page_number is None:
            fail(f"divider slug not found in PDF: {slug}")
        if page_number % 2 == 0:
            fail(f"paper divider is not recto: {slug} on page {page_number}")

    print(f"PASS  {divider_count} paper divider pages declared")
    print("PASS  title, blank inside cover, and master contents structure")
    print("PASS  recto major parts and appendix contract")
    print("PASS  every paper divider begins on an odd physical page")


if __name__ == "__main__":
    main()
