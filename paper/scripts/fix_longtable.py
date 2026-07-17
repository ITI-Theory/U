#!/usr/bin/env python3
"""
fix_longtable.py — Convert longtable to table*/tabular in a LaTeX file.

Used as a post-processing step when building two-column PDFs.
longtable fatally aborts in two-column mode; this script replaces it
with table* (full-width float) + regular tabular BEFORE xelatex runs.

Usage:
    python scripts/fix_longtable.py input.tex output.tex
"""

import re
import sys
from pathlib import Path


def fix_longtable(tex: str) -> str:
    # \begin{longtable}[opt]{cols}  ->  \begin{table*}\centering\begin{tabular}{cols}
    tex = re.sub(
        r'\\begin\{longtable\}(?:\[[^\]]*\])?\{([^}]*)\}',
        r'\\begin{table*}\\centering\\begin{tabular}{\1}',
        tex
    )

    # \end{longtable}  ->  \end{tabular}\end{table*}
    tex = tex.replace(r'\end{longtable}', r'\end{tabular}\end{table*}')

    # Remove longtable section delimiters (no-ops in tabular)
    for cmd in [r'\endhead', r'\endfirsthead', r'\endfoot', r'\endlastfoot']:
        tex = tex.replace(cmd, '')

    return tex


def main() -> None:
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} input.tex output.tex")
        sys.exit(1)

    src = Path(sys.argv[1])
    dst = Path(sys.argv[2])

    tex = src.read_text(encoding='utf-8')
    fixed = fix_longtable(tex)
    dst.write_text(fixed, encoding='utf-8')

    changes = tex.count(r'\begin{longtable}')
    print(f"Fixed {changes} longtable(s): {src.name} -> {dst.name}")


if __name__ == "__main__":
    main()
