#!/usr/bin/env python3
"""Check textbook prose for repeated padding.

Fails when:
- any two paragraphs longer than 25 words share their first 12 words;
- any two such paragraphs have Jaccard similarity over word 5-grams > 0.6;
- any 10-word sequence appears at least three times across textbook chapters;
- any two paragraphs longer than 25 words share their first 8 words.
"""
from __future__ import annotations

import re
import sys
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
THEORY = ROOT / "chapters"
WORD_RE = re.compile(r"[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)?")


@dataclass(frozen=True)
class Paragraph:
    file: Path
    index: int
    text: str
    words: tuple[str, ...]


def words(text: str) -> tuple[str, ...]:
    return tuple(w.lower().replace("’", "'") for w in WORD_RE.findall(text))


def strip_markdown_noise(text: str) -> str:
    text = re.sub(r"```.*?```", " ", text, flags=re.S)
    text = re.sub(r"^\s*\|.*\|\s*$", " ", text, flags=re.M)
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)(?:\{[^}]*\})?", " ", text)
    text = re.sub(r"\$\$.*?\$\$", " ", text, flags=re.S)
    return text


def load_paragraphs() -> list[Paragraph]:
    paras: list[Paragraph] = []
    for path in sorted(THEORY.glob("*.md")):
        raw = strip_markdown_noise(path.read_text(encoding="utf-8"))
        chunks = re.split(r"\n\s*\n", raw)
        for idx, chunk in enumerate(chunks, start=1):
            chunk = re.sub(r"\s+", " ", chunk).strip()
            if not chunk or chunk.startswith("#"):
                continue
            ws = words(chunk)
            if ws:
                paras.append(Paragraph(path, idx, chunk, ws))
    return paras


def ngrams(seq: tuple[str, ...], n: int) -> set[tuple[str, ...]]:
    if len(seq) < n:
        return set()
    return {tuple(seq[i : i + n]) for i in range(len(seq) - n + 1)}


def main() -> int:
    paragraphs = load_paragraphs()
    failures: list[str] = []

    long_paras = [p for p in paragraphs if len(p.words) > 25]
    for n in (12, 8):
        by_prefix: dict[tuple[str, ...], list[Paragraph]] = defaultdict(list)
        for p in long_paras:
            if len(p.words) >= n:
                by_prefix[p.words[:n]].append(p)
        for prefix, ps in by_prefix.items():
            if len(ps) > 1:
                locs = ", ".join(f"{p.file.name}:{p.index}" for p in ps)
                failures.append(f"shared first {n} words at {locs}: {' '.join(prefix)}")

    grams5 = {p: ngrams(p.words, 5) for p in long_paras}
    for i, left in enumerate(long_paras):
        a = grams5[left]
        if not a:
            continue
        for right in long_paras[i + 1 :]:
            b = grams5[right]
            if not b:
                continue
            sim = len(a & b) / len(a | b)
            if sim > 0.6:
                failures.append(
                    f"5-gram Jaccard {sim:.2f} between {left.file.name}:{left.index} and {right.file.name}:{right.index}"
                )

    seq10: dict[tuple[str, ...], list[str]] = defaultdict(list)
    for p in paragraphs:
        for i in range(max(0, len(p.words) - 9)):
            gram = tuple(p.words[i : i + 10])
            seq10[gram].append(f"{p.file.name}:{p.index}")
    for gram, locs in seq10.items():
        if len(locs) >= 3:
            failures.append(f"10-word sequence appears {len(locs)} times at {', '.join(locs[:8])}: {' '.join(gram)}")

    if failures:
        print("check_prose.py: FAIL")
        for item in failures[:80]:
            print("-", item)
        if len(failures) > 80:
            print(f"... {len(failures) - 80} more")
        return 1
    total_words = sum(len(p.words) for p in paragraphs)
    print(f"check_prose.py: PASS ({len(paragraphs)} paragraphs, {total_words} checked words)")
    return 0


if __name__ == "__main__":
    sys.exit(main())