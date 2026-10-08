#!/usr/bin/env python3
"""List every `sorry` in Lean proof files, ignoring comments and strings.

Prints `file:line: text` per occurrence and a total; exit 0 always (the caller
decides whether sorries are a warning or a failure).

    python paper/scripts/count_sorries.py paper/proofs/*.lean
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

TOKEN = re.compile(r"(?<![\w.'])sorry(?![\w'])")


def code_only(text: str) -> str:
    """Blank out block comments (nested), line comments and strings, keeping line breaks."""
    out, depth, i, n = [], 0, 0, len(text)
    in_string = False
    while i < n:
        two = text[i:i + 2]
        if in_string:
            if text[i] == "\\":
                out.append("  "); i += 2; continue
            if text[i] == '"':
                in_string = False
            out.append("\n" if text[i] == "\n" else " "); i += 1; continue
        if two == "/-":
            depth += 1; out.append("  "); i += 2; continue
        if depth and two == "-/":
            depth -= 1; out.append("  "); i += 2; continue
        if depth:
            out.append("\n" if text[i] == "\n" else " "); i += 1; continue
        if two == "--":
            end = text.find("\n", i)
            end = n if end < 0 else end
            out.append(" " * (end - i)); i = end; continue
        if text[i] == '"':
            in_string = True
        out.append(text[i]); i += 1
    return "".join(out)


def main(paths: list[str]) -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    total = 0
    for name in paths:
        path = Path(name)
        text = path.read_text(encoding="utf-8")
        original = text.splitlines()
        for number, line in enumerate(code_only(text).splitlines(), 1):
            if TOKEN.search(line):
                total += 1
                print(f"{path.as_posix()}:{number}: {original[number - 1].strip()[:100]}")
    print(f"total: {total}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
