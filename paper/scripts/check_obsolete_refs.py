#!/usr/bin/env python3
"""Check that nothing live depends on a `.OBSOLETE` file (T.Ops naming.md).

A name ending `.OBSOLETE` (file or directory) is kept for history only: do not
read, build or cite it.

1. No live code or build file (anything except Markdown) mentions
   `.OBSOLETE`, apart from the search-exclusion settings and the checks
   themselves (ALLOWED).
   Markdown may name an `.OBSOLETE` file as a history pointer but must not
   link to it.
2. No live tracked file refers to the old name of something that is now
   `.OBSOLETE` (a dangling reference), unless that old name exists again.
   Append-only logs in APPEND_ONLY are skipped.

Exit 1 on failure.
"""
from __future__ import annotations

import collections
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SUFFIX = ".OBSOLETE"
ALLOWED = {".ignore", ".vscode/settings.json", "bin/release-check",
           "paper/scripts/check_obsolete_refs.py"}
APPEND_ONLY = {"paper/FIELD-NOTES.md"}
TEXT = {".md", ".py", ".lua", ".sh", ".js", ".mjs", ".ts", ".yaml", ".yml",
        ".tex", ".json", ".toml", ".txt", ".html", ".css", ".lean", ".mk", ""}
MAX_BYTES = 3_000_000
MD_LINK = re.compile(r"\]\([^)\s]*\.OBSOLETE[^)]*\)")


def tracked() -> list[str]:
    out = subprocess.run(["git", "ls-files", "-z"], cwd=ROOT, capture_output=True,
                         text=True, encoding="utf-8", check=True).stdout
    return [f for f in out.split("\0") if f]


def read(rel: str) -> str | None:
    p = ROOT / rel
    if p.suffix.lower() not in TEXT or not p.is_file() or p.stat().st_size > MAX_BYTES:
        return None
    try:
        return p.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return None


def old_names(obsolete: list[str]) -> set[str]:
    """Old paths of `.OBSOLETE` items whose old name no longer exists."""
    names: set[str] = set()
    for rel in obsolete:
        parts = rel.split("/")
        for i, part in enumerate(parts):
            if part.endswith(SUFFIX):
                head = parts[:i] + [part[: -len(SUFFIX)]]
                names.add("/".join(head + parts[i + 1:]))
                names.add("/".join(head))
                break
    return {n for n in names if not (ROOT / n).exists()}


def main() -> int:
    files = tracked()
    obsolete = [f for f in files if SUFFIX in f]
    live = [f for f in files if SUFFIX not in f]
    live_names = collections.Counter(Path(f).name for f in live)
    failures: list[str] = []

    tokens: dict[str, str] = {}
    for old in sorted(old_names(obsolete)):
        tokens[old] = old
        name = Path(old).name
        # A bare file name counts only if no live file has the same name.
        if "." in name and live_names[name] == 0:
            tokens.setdefault(name, old)
    rx = None
    if tokens:
        alts = "|".join(re.escape(t) for t in sorted(tokens, key=len, reverse=True))
        rx = re.compile(r"(?<![\w.-])(?:" + alts + r")(?![\w.-])")

    for rel in live:
        text = read(rel)
        if text is None:
            continue
        if rel not in ALLOWED and not rel.endswith(".md") and SUFFIX in text:
            line = text[: text.index(SUFFIX)].count("\n") + 1
            failures.append(f"{rel}:{line}: code or build file uses a {SUFFIX} path")
        if rel.endswith(".md"):
            for m in MD_LINK.finditer(text):
                line = text[: m.start()].count("\n") + 1
                failures.append(f"{rel}:{line}: links to a {SUFFIX} file (name it, do not link it)")
        if rel in APPEND_ONLY or rx is None:
            continue
        for m in rx.finditer(text):
            line = text[: m.start()].count("\n") + 1
            failures.append(f"{rel}:{line}: refers to {tokens[m.group(0)]}, now {SUFFIX}")

    for f in failures:
        print(f)
    if failures:
        print(f"{len(failures)} reference(s) to {SUFFIX} material")
        return 1
    print(f"{len(obsolete)} {SUFFIX} file(s); no live file depends on them")
    return 0


if __name__ == "__main__":
    sys.exit(main())
