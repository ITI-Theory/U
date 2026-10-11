"""Sherlock's delta: what an edit did to a document's affidavit (epic D8).

    python sherlock/delta.py zoomable-somatic-field                 # the working copy
    python sherlock/delta.py zoomable-somatic-field --rev HEAD~3    # a commit
    python sherlock/delta.py zoomable-somatic-field --file F.md     # any file

Re-finds every claim's quote (registry/affidavits/<id>.yaml) in the new text
and classifies it:

- unchanged: the quote is there (its lines may have moved);
- edited: a close match (the quote was changed): re-check; numbers that
  changed are listed;
- gone, after a contradicted finding: probably the fix (propose
  disposition: fixed);
- gone, after a consistent or confirmed claim: the document no longer says
  this; a warning, louder when other documents quote the same value.

Text added since the frozen version that no claim covers is listed as new,
for the extraction prompt (on the delta only). Sherlock proposes; the author
confirms. Writes bld/sherlock/delta-<id>.md and prints a summary.
"""
from __future__ import annotations

import argparse
import difflib
import re
import subprocess
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
REG = U / "registry" / "affidavits"
OUT = U / "bld" / "sherlock"
NUM = re.compile(r"-?\d+(?:\.\d+)?(?:/\d+)?")


def squash(s: str) -> str:
    return " ".join(s.split())


def git_show(rev: str, path: str) -> str:
    return subprocess.run(["git", "show", f"{rev}:{path}"], cwd=U, capture_output=True,
                          check=True).stdout.decode("utf-8")


def find(quote: str, lines: list[str]) -> tuple[str, list[int], str]:
    """('exact'|'close'|'gone', line numbers, matched text)."""
    q = squash(quote)
    n = max(1, quote.count("\n") + 1)
    for i in range(len(lines)):
        for w in range(n, n + 3):
            window = squash(" ".join(lines[i:i + w]))
            if q in window:
                return "exact", list(range(i + 1, i + w + 1)), window
    best, where = 0.0, None
    for i in range(len(lines)):
        for w in range(n, n + 3):
            window = squash(" ".join(lines[i:i + w]))
            if not window:
                continue
            m = difflib.SequenceMatcher(None, q, window)
            if m.real_quick_ratio() < 0.6:
                continue
            # best local alignment of the quote inside the window
            blocks = m.get_matching_blocks()
            matched = sum(b.size for b in blocks)
            score = matched / len(q)
            if score > best:
                start = blocks[0].b
                best, where = score, (i, w, window[start:start + len(q) + 20])
    if where and best >= 0.75:
        i, w, text = where
        return "close", list(range(i + 1, i + w + 1)), text
    return "gone", [], ""


def covered(new_lines: list[str], spans: list[list[int]]) -> set[int]:
    return {n for s in spans for n in s}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("id")
    ap.add_argument("--rev", help="compare against this commit's version")
    ap.add_argument("--file", type=Path, help="compare against this file")
    args = ap.parse_args()
    aff = yaml.safe_load((REG / f"{args.id}.yaml").read_text(encoding="utf-8"))
    src = aff["source"]
    old = git_show(src["commit"], src["file"]).splitlines()
    if args.file:
        new_text, label = args.file.read_text(encoding="utf-8"), str(args.file)
    elif args.rev:
        new_text, label = git_show(args.rev, src["file"]), f"{src['file']}@{args.rev}"
    else:
        new_text, label = (U / src["file"]).read_text(encoding="utf-8"), f"{src['file']} (working copy)"
    new = new_text.splitlines()

    shared = set()
    for other in REG.glob("*.yaml"):
        if other.stem == args.id:
            continue
        for c in yaml.safe_load(other.read_text(encoding="utf-8")).get("claims") or []:
            shared.update(v["quantity"] for v in c.get("values") or [])

    out = [f"# Delta: {aff['title']}", "", f"Frozen `{src['file']}` at `{src['commit']}` against {label}.", ""]
    counts, spans = {}, []
    for c in aff["claims"]:
        status, lines, text = find(c["quote"], new)
        spans.append(lines)
        if status == "exact":
            moved = "" if set(lines) & set(c["lines"]) else f", moved to lines {lines[0]}-{lines[-1]}"
            kind, note = "unchanged", f"quote unchanged{moved}"
        elif status == "close":
            a, b = NUM.findall(c["quote"]), NUM.findall(text)
            changed = f"; numbers {a} -> {b}" if a != b[:len(a)] else ""
            kind, note = "edited", f"quote edited at lines {lines[0]}-{lines[-1]}: re-check{changed}. Now: \"{text[:120]}\""
        elif c["verdict"] == "contradicted":
            kind, note = "fixed?", "quote gone: probably the fix; propose disposition: fixed"
        else:
            lost = [v["quantity"] for v in c.get("values") or [] if v["quantity"] in shared]
            kind = "lost"
            note = "quote gone: the document no longer says this (a supporting claim)"
            if lost:
                note += f"; other documents still quote {', '.join(lost)}"
        counts[kind] = counts.get(kind, 0) + 1
        out.append(f"- **{c['id']}** {kind}: {note}.")

    sm = difflib.SequenceMatcher(None, old, new, autojunk=False)
    cov = covered(new, spans)
    added = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag in ("insert", "replace"):
            rows = [j for j in range(j1 + 1, j2 + 1) if new[j - 1].strip() and j not in cov]
            if rows:
                added.append((rows[0], rows[-1], squash(" ".join(new[r - 1] for r in rows))[:140]))
    out += ["", "## New or changed text no claim covers (for the extraction prompt)", ""]
    out += [f"- lines {a}-{b}: {t}" for a, b, t in added] or ["- none"]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / f"delta-{args.id}.md").write_text("\n".join(out) + "\n", encoding="utf-8", newline="\n")
    print(", ".join(f"{k} {v}" for k, v in sorted(counts.items())) + f"; uncovered new text: {len(added)} hunks"
          f" -> bld/sherlock/delta-{args.id}.md")
    return 0


if __name__ == "__main__":
    sys.exit(main())
