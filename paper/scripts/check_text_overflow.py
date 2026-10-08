#!/usr/bin/env python3
"""Find text that does not fit: words past the text block, and overlapping words.

For each PDF, `pdftotext -bbox-layout` gives every word's box. Per page side
(recto/verso), the text block's right edge is the most common line end
(justified lines end there); a word ending more than TOLERANCE points past it
sticks out (an overfull line, a too-wide table cell or verbatim run). Two words
on the same line whose boxes overlap mean text running into other text (a cell
spilling into the next column). Exit 1 if anything is found.

    python paper/scripts/check_text_overflow.py [PDF ...]   # default: all built PDFs
"""
from __future__ import annotations

import collections
import html
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TOLERANCE = 9.0      # points past the text block (about 3 mm)
OVERLAP = 2.0        # points of horizontal overlap between neighbouring words
GS = next((str(p) for p in [*Path("C:/Program Files/gs").glob("gs*/bin/gswin64c.exe"), Path("/usr/bin/gs")] if p.exists()), "gs")
SPAN = re.compile(r'<span bbox="(\d+) (\d+) (\d+) (\d+)"[^>]*size="([\d.]+)">(.*?)</span>', re.S)
WORDLIKE = re.compile(r"[A-Za-z0-9]{3,}")
CHAR = re.compile(r'c="((?:[^"\\]|&quot;)*)"')


def page_width(pdf: Path) -> float:
    info = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True, errors="replace").stdout
    match = re.search(r"Page size:\s+([\d.]+) x", info)
    return float(match.group(1)) if match else 595.0


def pages(pdf: Path):
    """Yield (page number, width, lines); a line is a list of (x0, y0, x1, y1, text) runs."""
    width = page_width(pdf)
    xml = subprocess.run([GS, "-q", "-dNOPAUSE", "-dBATCH", "-dSAFER", "-sDEVICE=txtwrite", "-dTextFormat=0",
                          "-sOutputFile=-", str(pdf)], capture_output=True, text=True, encoding="utf-8",
                         errors="replace").stdout
    for number, body in enumerate(xml.split("<page>")[1:], 1):
        rows = collections.defaultdict(list)
        for x0, y0, x1, y1, size, chars in SPAN.findall(body):
            text = html.unescape("".join(CHAR.findall(chars)))
            if text.strip():
                rows[round(int(y0) / 3)].append((float(x0), float(y0) - float(size), float(x1), float(y1), text))
        yield number, width, [sorted(row) for _, row in sorted(rows.items())]


def check(pdf: Path) -> list[str]:
    data = list(pages(pdf))
    ends = {0: collections.Counter(), 1: collections.Counter()}
    for number, _, lines in data:
        for words in lines:
            if sum(len(w[4].split()) for w in words) >= 8:  # full prose lines
                ends[number % 2][round(words[-1][2])] += 1
    edge = {side: (counter.most_common(1)[0][0] if counter else None) for side, counter in ends.items()}
    findings = []
    for number, width, lines in data:
        local = collections.Counter(round(words[-1][2]) for words in lines
                                    if sum(len(w[4].split()) for w in words) >= 8)
        side = edge[number % 2]
        right = max(local.most_common(1)[0][0], side or 0) if sum(local.values()) >= 5 else side
        for words in lines:
            if right is not None:
                for x0, _, x1, _, text in words:
                    if x1 > right + TOLERANCE and x1 <= width + 50 and not text.strip().isdigit():
                        findings.append(f"p{number}: past the text block by {x1 - right:.0f} pt: {text[:40]!r}")
                        break
            ordered = sorted(words)
            for (a0, ay0, a1, ay1, at), (b0, by0, b1, by1, bt) in zip(ordered, ordered[1:]):
                if a1 - b0 > OVERLAP and WORDLIKE.search(at) and WORDLIKE.search(bt):
                    findings.append(f"p{number}: overlapping text: {at[:25]!r} / {bt[:25]!r}")
                    break
    return findings


def default_pdfs() -> list[Path]:
    bld = ROOT / "bld"
    skip = re.compile(r"(cover|-royal|-10pt|booklet-.*-\d)$")
    return [p for folder in ("papers", "books", "textbook", "atlas") for p in sorted((bld / folder).glob("*.pdf"))
            if not skip.search(p.stem)]


def main(args: list[str]) -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    pdfs = [Path(a) for a in args] or default_pdfs()
    bad = 0
    for pdf in pdfs:
        findings = check(pdf)
        if findings:
            bad += 1
            name = pdf.resolve().relative_to(ROOT).as_posix() if pdf.resolve().is_relative_to(ROOT) else str(pdf)
            print(f"FAIL {name}: {len(findings)} line(s)")
            for finding in findings[:6]:
                print(f"     {finding}")
            if len(findings) > 6:
                print(f"     ... {len(findings) - 6} more")
    print(f"{len(pdfs)} PDFs checked, {bad} with text that does not fit")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
