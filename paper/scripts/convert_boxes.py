#!/usr/bin/env python3
"""
convert_boxes.py — Convert Unicode box-drawing blocks in markdown to modern equivalents.

Simple quote boxes  → pandoc blockquote (> lines), rendered as styled mdframed box
Complex ASCII art   → ```text fenced block, rendered in Consolas monospace

Usage:
    python scripts/convert_boxes.py soma/soma-field-book/soma-field-book.md
    python scripts/convert_boxes.py soma/soma-field-paper/soma-field-paper.md
"""

import re
import sys
from pathlib import Path

# Box-drawing characters that indicate complex ASCII art (not a simple quote)
ART_CHARS = set('─│┌┐└┘├┤┬┴┼╔╗╚╝║═╠╣╦╩╬◄►▲▼←→↑↓/\\*#@')

def is_complex_art(lines):
    """Return True if box contains ASCII art (graphs, diagrams, waveforms)."""
    content = ' '.join(lines)
    art_count = sum(1 for c in content if c in ART_CHARS)
    return art_count > 3  # more than 3 art chars = complex diagram

def strip_box_border(line):
    """Remove leading/trailing │ and whitespace from a box content line."""
    # Remove leading whitespace, then │, then up to 3 spaces
    line = line.lstrip()
    if line.startswith('│'):
        line = line[1:]
        if line.startswith('  '):
            line = line[2:]
    # Remove trailing │ and whitespace
    line = line.rstrip()
    if line.endswith('│'):
        line = line[:-1].rstrip()
    return line

def convert_boxes(text):
    lines = text.splitlines(keepends=True)
    result = []
    i = 0
    changes = 0

    while i < len(lines):
        line = lines[i]
        # Detect start of box: line containing ╭───
        if '╭' in line and '─' in line:
            # Collect all lines until ╰
            box_lines = []
            j = i + 1
            while j < len(lines) and '╰' not in lines[j]:
                box_lines.append(lines[j])
                j += 1
            # j now points to the ╰ closing line

            # Extract content lines (those with │)
            content_lines = []
            for bl in box_lines:
                stripped = strip_box_border(bl.rstrip('\n'))
                # Skip purely decorative lines (─────) and empty border lines
                if set(stripped.strip()) <= {'─', '═', ' ', ''}:
                    continue
                content_lines.append(stripped)

            if is_complex_art(content_lines):
                # Complex ASCII art → plain text fenced block (Consolas monospace)
                result.append('```text\n')
                for cl in [lines[i]] + box_lines + ([lines[j]] if j < len(lines) else []):
                    s = cl.rstrip('\n')
                    if s.startswith('  '):
                        s = s[2:]
                    result.append(s + '\n')
                result.append('```\n')
            else:
                # Simple quote box → pandoc blockquote
                non_empty = [l for l in content_lines if l.strip()]
                for cl in non_empty:
                    cl = cl.strip()
                    if cl:
                        result.append(f'> {cl}\n')
                result.append('>\n')

            changes += 1
            i = j + 1  # skip past the ╰ line
        else:
            result.append(line)
            i += 1

    return ''.join(result), changes


def main():
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} file.md [file2.md ...]")
        sys.exit(1)

    for path_str in sys.argv[1:]:
        path = Path(path_str)
        if not path.exists():
            print(f"  SKIP (not found): {path}")
            continue
        text = path.read_text(encoding='utf-8')
        converted, n = convert_boxes(text)
        path.write_text(converted, encoding='utf-8')
        print(f"  Converted {n} box(es): {path.name}")


if __name__ == "__main__":
    main()
