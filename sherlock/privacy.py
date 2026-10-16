"""privacy.py: what is private stays private (author, 16 Oct: "the Phase Dot stuff will not be
published, it all stays private ... and we need to check that").

Private material lives only in the private repository, Me: Phase Dot (Me/books/phase-dot: the
author's own turns in the conversations, since the machines' answers echo the public drafts), H-AL's
private answers (Me/notebooklm/hal-answers), the film notes (Me/film). This check reads them, and
reads every public place (U's tracked text, Dist, the web site, the organisation's page), and
reports:
  1. leaks: a public file sharing at least MIN 12-word runs with the private material that the
     published sources (papers, books, the Atlas, the level texts, the tours) do not also contain,
     unless that file is cleared (reviewed: public by design);
  2. markers: a word or phrase the author listed as never public, in any public file.
The list of cleared files and the markers are themselves private (Me/Ops/privacy.yaml): a list of
what must not be said would say it. Without Me checked out the check cannot run, and says so.

    python sherlock/privacy.py      # -> Me/Ops/privacy-report.md (private); exit 1 on a leak
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
ROOT = U.parent                       # ITI-Theory
ME = ROOT.parent / "Me"
W, MIN = 12, 5
TEXT = re.compile(r"\.(md|yaml|yml|js|mjs|py|tex|lua|html|txt|json|bib|csv)$", re.I)
PUBLISHED = re.compile(r"^(paper/soma/|paper/[^/]+\.md$|books/|Part2/|registry/(levels|paths|concepts|tours|examples|questions)/)")
PUBLIC = [("U", U), ("Dist", ROOT / "Dist"), ("t-theory.org", ROOT / "t-theory.org"), (".github", ROOT / ".github")]


def shingles(text: str) -> set[int]:
    w = re.findall(r"[a-z0-9']+", text.lower())
    return {hash(" ".join(w[i:i + W])) for i in range(len(w) - W + 1)}


# In a conversation, what is private is what the author said: his turns ("## Author (date)",
# "# you asked", "Your prompt"), not the machines' answers, which echo the public drafts.
AUTHOR_TURN = re.compile(r"^(#{1,4} Author\b|# you asked\b|#{1,4} \*\*Your prompt)", re.I)
OTHER_TURN = re.compile(r"^(#{1,4} Assistant\b|# [\w ]*response\b|#{1,4} \*\*(Response|Answer|Gemini|ChatGPT|Claude|Copilot)\b)", re.I)


def author_turns(text: str) -> str:
    keep, on = [], False
    for line in text.split("\n"):
        if AUTHOR_TURN.match(line):
            on = True
            continue
        if OTHER_TURN.match(line):
            on = False
            continue
        if on:
            keep.append(line)
    return "\n".join(keep)


def tracked(repo: Path) -> list[str]:
    r = subprocess.run(["git", "ls-files"], cwd=repo, capture_output=True, text=True)
    return [f for f in r.stdout.split("\n") if f and TEXT.search(f) and "node_modules" not in f]


def read(p: Path) -> str:
    try:
        return p.read_text(encoding="utf-8", errors="replace") if p.stat().st_size < 6_000_000 else ""
    except OSError:
        return ""


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    cfg_path = ME / "Ops" / "privacy.yaml"
    if not cfg_path.exists():
        print(f"privacy: {cfg_path} not found (the private repository is not checked out here); not checked")
        return 0
    cfg = yaml.safe_load(cfg_path.read_text(encoding="utf-8")) or {}
    private = set()
    for entry in cfg.get("private", []):
        g, turns = (entry, False) if isinstance(entry, str) else (entry["glob"], entry.get("author_turns", False))
        for p in ME.glob(g):
            if p.is_file():
                private |= shingles(author_turns(read(p)) if turns else read(p))
    published = set()
    for f in tracked(U):
        if PUBLISHED.match(f):
            published |= shingles(read(U / f))
    only = private - published
    cleared = set(cfg.get("cleared", []))
    markers = [(m, re.compile(r"\b" + re.escape(m) + r"\b", re.I)) for m in cfg.get("markers", [])]
    leaks, marked, scanned = [], [], 0
    for name, repo in PUBLIC:
        if not (repo / ".git").exists():
            continue
        for f in tracked(repo):
            rel = f"{name}/{f}" if name != "U" else f
            text = read(repo / f)
            if not text:
                continue
            scanned += 1
            for m, rx in markers:
                for k, line in enumerate(text.split("\n"), 1):
                    if rx.search(line):
                        marked.append(f"{rel}:{k}: [{m}]")
            if name == "U" and PUBLISHED.match(f):
                continue
            n = len(shingles(text) & only)
            if n >= MIN and rel not in cleared:
                leaks.append(f"{rel}: {n} runs of {W} words from the private material")
    out = ME / "Ops" / "privacy-report.md"
    out.write_text("# Private stays private (sherlock/privacy.py)\n\n"
                   f"{scanned} public files read; {len(private)} private runs, {len(only)} not in the published sources.\n\n"
                   "## Possible leaks (not cleared)\n\n" + ("\n".join(f"- {x}" for x in leaks) or "None.") +
                   "\n\n## Markers found\n\n" + ("\n".join(f"- {x}" for x in marked) or "None.") + "\n", encoding="utf-8")
    print(f"privacy: {scanned} public files; {len(leaks)} possible leaks, {len(marked)} markers (report: Me/Ops/privacy-report.md)")
    for x in leaks + marked:
        print(f"  FAIL {x}")
    return 1 if leaks or marked else 0


if __name__ == "__main__":
    raise SystemExit(main())
