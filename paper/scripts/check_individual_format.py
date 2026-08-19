#!/usr/bin/env python3
"""Verify the physical title-page/abstract contract for an individual paper."""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

PAPER_DIR = Path(__file__).resolve().parent.parent


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def page_text(pdf: Path, start: int, end: int | None = None) -> str:
    end = start if end is None else end
    command = ["pdftotext", "-f", str(start), "-l", str(end), "-layout", str(pdf), "-"]
    return subprocess.run(command, check=True, capture_output=True, text=True).stdout


def physical_pages(pdf: Path) -> list[str]:
    info = subprocess.run(["pdfinfo", str(pdf)], check=True, capture_output=True, text=True).stdout
    match = re.search(r"^Pages:\s+(\d+)$", info, re.MULTILINE)
    if not match:
        fail(f"could not determine PDF page count: {pdf}")
    return [page_text(pdf, page_number) for page_number in range(1, int(match.group(1)) + 1)]


def first_heading(pdf: Path) -> str:
    source = PAPER_DIR / "soma" / pdf.stem / f"{pdf.stem}.md"
    text = source.read_text(encoding="utf-8")
    text = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.DOTALL)
    match = re.search(r"^# ([^\n]+)", text, re.MULTILINE)
    if not match:
        fail(f"no level-one heading found in source: {source}")
    return match.group(1).strip()


def headings(source: Path, level: int) -> list[str]:
    text = source.read_text(encoding="utf-8")
    text = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.DOTALL)
    pattern = rf"^{'#' * level} ([^\n]+)"
    return re.findall(pattern, text, re.MULTILINE)


def heading_text(heading: str) -> str:
    heading = re.sub(r"^\d+(?:\.\d+)*\s+", "", heading)
    heading = heading.replace("—", "--").replace("–", "--")
    heading = heading.replace("→", "").replace("⇒", "")
    heading = heading.replace("δ", "").replace("Δ", "")
    heading = heading.translate(str.maketrans("₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹", "01234567890123456789"))
    heading = re.sub(r"\s*\[@[^]]+\]", "", heading)
    heading = re.sub(r"\$.*?\$", "", heading)
    return heading.strip()


def body_heading_specs(source: Path) -> list[tuple[int, str]]:
    """Return structural body headings, excluding a duplicated title H1."""
    text = source.read_text(encoding="utf-8")
    frontmatter = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    title_match = re.search(r"^title:\s*[\"']?(.+?)[\"']?\s*$", frontmatter.group(1), re.MULTILINE) if frontmatter else None
    metadata_title = heading_text(title_match.group(1)) if title_match else ""
    text = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.DOTALL)
    entries = [
        (len(marker), heading)
        for marker, heading in re.findall(r"^(#{1,3}) ([^\n]+)", text, re.MULTILINE)
    ]
    if entries and entries[0][0] == 1 and heading_text(entries[0][1]) == metadata_title:
        return entries[1:]
    return entries


def normalized_page(page: str) -> str:
    return (
        page.replace("\u00ad", "--")
        .replace("—", "--")
        .replace("–", "--")
        .replace("→", "")
        .replace("⇒", "")
        .replace("δ", "")
        .replace("Δ", "")
        .translate(str.maketrans("₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹", "01234567890123456789"))
    )


def heading_in_page(heading: str, page: str) -> bool:
    page = normalized_page(page)
    if heading in page:
        return True
    words = re.findall(r"[A-Za-z]{3,}", heading)
    return bool(words) and all(word in page for word in words)


def structural_heading_in_page(heading: str, page: str) -> bool:
    opening = "\n".join(normalized_page(page).splitlines()[:35])
    blocks = re.split(r"\n\s*\n", opening)
    for block_index in range(len(blocks)):
        wrapped = " ".join(blocks[block_index : block_index + 3])
        candidate = " ".join(line.strip() for line in wrapped.splitlines() if line.strip())
        candidate = re.sub(r"\s+", " ", candidate)
        candidate = re.sub(r"^(?:\d+(?:\.\d+)*\s+)+", "", candidate)
        if heading in candidate:
            return True
        if heading_in_page(heading, candidate):
            words = re.findall(r"[A-Za-z]{3,}", heading)
            if "  " in heading and words and all(word in candidate for word in words):
                return True
    return False


def body_lines(page: str) -> list[str]:
    return [line.strip() for line in page.splitlines() if line.strip()]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path, help="PDF path, relative to paper/ or absolute")
    args = parser.parse_args()

    pdf = args.pdf if args.pdf.is_absolute() else PAPER_DIR / args.pdf
    if not pdf.is_file():
        fail(f"missing PDF: {pdf}")
    if shutil.which("pdftotext") is None:
        fail("pdftotext is unavailable")

    page_1 = page_text(pdf, 1)
    page_2 = page_text(pdf, 2)
    page_3 = page_text(pdf, 3)
    page_4 = page_text(pdf, 4)
    page_5 = page_text(pdf, 5)
    if not page_1.strip():
        fail("physical page 1 has no title-page content")
    if page_2.strip():
        fail("physical page 2 is not a blank inside cover")
    if "Abstract" not in page_3:
        fail("physical page 3 does not begin the abstract")
    if "Contents" in page_3:
        fail("physical page 3 mixes abstract with contents")
    first_abstract_line = next((line.strip() for line in page_3.splitlines() if line.strip()), "")
    if re.fullmatch(r"\d+", first_abstract_line):
        fail("abstract recto has a visible printed folio")
    if page_4.strip():
        fail("physical page 4 is not a blank abstract verso")
    if "Contents" not in page_5:
        fail("physical page 5 does not begin the contents")
    if not re.search(r"\bContents\s+1\b|\b1\s+Contents\b", page_5):
        fail("contents does not begin its own printed page sequence at 1")
    source = PAPER_DIR / "soma" / pdf.stem / f"{pdf.stem}.md"
    heading = first_heading(pdf)
    all_pages = physical_pages(pdf)
    last_contents_page = 5
    for page_number in range(6, len(all_pages) + 1):
        if "Contents" not in all_pages[page_number - 1]:
            break
        last_contents_page = page_number
    body_start_page = last_contents_page + 1
    body_pages = all_pages[body_start_page - 1 :]
    specs = body_heading_specs(source)
    first_level, first_heading_text = specs[0]
    first_text = heading_text(first_heading_text)
    section_page = next(
        (index + body_start_page for index, page in enumerate(body_pages) if structural_heading_in_page(first_text, page)),
        None,
    )
    if section_page is None:
        fail(f"first section heading not found in PDF: {first_text}")
    if section_page % 2 == 0:
        fail(f"first numbered section is not recto: page {section_page}")

    for level, heading in specs:
        if level > 2:
            continue
        text = heading_text(heading)
        if text.lower() in {"references", "bibliography"}:
            continue
        page = next((page for page in body_pages if heading_in_page(text, page)), None)
        if page is None:
            fail(f"heading not found in PDF: {text}")
        normalized = normalized_page(page)
        following = normalized.split(text, 1)[1].strip() if text in normalized else normalized
        if len(re.sub(r"\s+", "", following)) < 80:
            fail(f"heading is orphaned at page bottom: {text}")

    for page_number, (previous, current) in enumerate(zip(all_pages, all_pages[1:]), 1):
        if page_number < body_start_page:
            continue
        previous_lines = [line for line in body_lines(previous) if not re.fullmatch(r"\d+", line)]
        current_lines = [line for line in body_lines(current) if not re.fullmatch(r"\d+", line)]
        if not previous_lines or not current_lines:
            continue
        if previous_lines[-1].endswith("-") and re.match(r"^[a-z]", current_lines[0]):
            fail(f"hyphenated word crosses physical pages {page_number} and {page_number + 1}")
        if re.fullmatch(r"[A-Za-z]{1,12}", previous_lines[-1]) and re.match(r"^[a-z]", current_lines[0]):
            fail(f"one-word paragraph continuation crosses physical pages {page_number} and {page_number + 1}")

    for page_number, page in enumerate(all_pages[section_page - 1 :], section_page):
        if not page.strip():
            fail(f"blank page inside paper body: physical page {page_number}")

    print("PASS  cover, blank verso, unnumbered abstract recto, blank verso, and contents recto")
    print("PASS  contents begins its own printed page sequence at 1")
    print("PASS  first body section begins recto")
    print("PASS  level-one and level-two headings retain body text on their page")
    print("PASS  no hyphenated or one-word paragraph continuation crosses a physical page boundary")
    print("PASS  no blank page occurs inside the paper body")


if __name__ == "__main__":
    main()
