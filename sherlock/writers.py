"""writers.py: the Writers' Room (ISS-123): text as a 4x4, four authors by four reader levels.

Author, 19 Oct 2026: "if we have the 4x4 reMIDI, we could do the same for text: like having four authors, the top
scorer right at the top"; the authors: the author, H-AL (NotebookLM, his chats), Copilot, MOTHER (NotebookLM, the
papers); the levels: the reader levels (cookie, general, specialist) and the film's one line; "the answer of the
tool goes to the writers' room" (the app's room, through MOTHER's bridge).

A passage is a folder (private: Me/writers/<id>/, since H-AL's versions draw on the author's chats):
    passage.yaml   id, title, brief (what the passage must say), target (a U file and a marker), picks
    <author>.<level>.md   one version (author: author, hal, copilot, mother; level: cookie, general, specialist, line)

    python sherlock/writers.py check                       # every passage well formed
    python sherlock/writers.py report [<id>]               # scores and differences -> <dir>/<id>/report.json
    python sherlock/writers.py ask <id> --author hal|mother [--level <l>]   # NotebookLM writes its versions
    python sherlock/writers.py pick <id> <level> <author>  # the author's choice, with the date
    python sherlock/writers.py apply <id>                  # the picks into the target, between its markers
    ... --dir <folder>                                     # another passages folder (default ../Me/writers)

The score is a guide for the author, never a verdict: four measures, each 0 to 1, and their mean:
    length     the words within the level's band (falling off outside it)
    sentences  the mean sentence length within the level's limit
    bridges    below specialist, no hard term (registry/bofh.yaml's jargon list) without a plain-words bridge
    labels     at specialist, a model claim carries its evidence label (THEORY-STATUS)
The differences: each version against the level's top scorer, word by word (what it keeps, adds, drops).
AI is one author of four; the author picks, and the pick keeps its author (the credit).
"""
from __future__ import annotations

import datetime as dt
import difflib
import json
import re
import subprocess
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
DIR = U.parents[1] / "Me" / "writers"
AUTHORS = {"author": "the author", "hal": "H-AL (NotebookLM, the author's chats)", "copilot": "Copilot", "mother": "MOTHER (NotebookLM, the papers)"}
LEVELS = {
    "cookie": {"words": (25, 70), "sentence": 14, "say": "a child or a newcomer: plain words, one idea"},
    "general": {"words": (70, 180), "sentence": 20, "say": "a general reader: plain words, the idea and why it matters"},
    "specialist": {"words": (120, 350), "sentence": 30, "say": "a specialist: the terms, the claim and its evidence label"},
    "line": {"words": (6, 24), "sentence": 24, "say": "the film's one line: no jargon, said aloud"},
}
LABELS = re.compile(r"`?(kernel-verified|derived-under-assumptions|simulated|empirical-result|interpretive|open-hypothesis)`?")
SENT = re.compile(r"(?<=[.!?])\s+")
WORD = re.compile(r"[\w'’-]+")


def load(p: Path) -> dict:
    return yaml.safe_load(p.read_text(encoding="utf-8")) or {}


def passages(root: Path) -> list[Path]:
    return sorted(p.parent for p in root.glob("*/passage.yaml"))


def versions(folder: Path) -> dict[str, dict[str, str]]:
    out: dict[str, dict[str, str]] = {lv: {} for lv in LEVELS}
    for f in folder.glob("*.md"):
        a, _, lv = f.stem.partition(".")
        if a in AUTHORS and lv in LEVELS:
            text = f.read_text(encoding="utf-8")
            out[lv][a] = re.sub(r"(?s)^<!--.*?-->\s*", "", text).strip()   # a provenance comment is not text
    return out


def jargon_spec() -> dict:
    spec = load(U / "registry" / "bofh.yaml")
    return spec.get("jargon") or spec


def score(text: str, level: str, spec: dict) -> dict:
    lv = LEVELS[level]
    words = WORD.findall(text)
    n = len(words)
    lo, hi = lv["words"]
    length = 1.0 if lo <= n <= hi else max(0.0, 1 - (lo - n) / lo) if n < lo else max(0.0, 1 - (n - hi) / hi)
    sents = [s for s in SENT.split(text) if WORD.search(s)]
    mean = n / max(1, len(sents))
    sentences = 1.0 if mean <= lv["sentence"] else lv["sentence"] / mean
    bridges, traps = 1.0, []
    if level != "specialist" and spec.get("terms"):
        bridge, window = re.compile(spec["bridge"], re.I), int(spec.get("window", 240))
        for t in spec["terms"]:
            m = re.search(t, text, re.I)
            if m and not bridge.search(text[m.end(): m.end() + window]):
                traps.append(m.group(0))
        bridges = 1 / (1 + len(traps))
    labels = 1.0 if level != "specialist" or LABELS.search(text) else 0.5
    parts = {"length": round(length, 2), "sentences": round(sentences, 2), "bridges": round(bridges, 2), "labels": round(labels, 2)}
    return {"score": round(sum(parts.values()) / 4, 2), "parts": parts, "words": n, "mean_sentence": round(mean, 1), "traps": traps}


def diff(a: str, b: str) -> list[list[str]]:
    """b against a, word by word: [op, text] with op = same | add | drop."""
    wa, wb = a.split(), b.split()
    out = []
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(a=wa, b=wb, autojunk=False).get_opcodes():
        if op == "equal":
            out.append(["same", " ".join(wb[j1:j2])])
        else:
            if i2 > i1:
                out.append(["drop", " ".join(wa[i1:i2])])
            if j2 > j1:
                out.append(["add", " ".join(wb[j1:j2])])
    return out


def report(folder: Path) -> dict:
    meta = load(folder / "passage.yaml")
    spec = jargon_spec()
    rows = {}
    for level, by in versions(folder).items():
        cells = [{"author": a, "name": AUTHORS[a], "text": t, **score(t, level, spec)} for a, t in by.items()]
        cells.sort(key=lambda c: -c["score"])
        if cells:
            top = cells[0]["text"]
            for c in cells:
                c["agreement"] = round(difflib.SequenceMatcher(a=top.split(), b=c["text"].split(), autojunk=False).ratio(), 2)
                c["diff"] = diff(top, c["text"]) if c is not cells[0] else []
        rows[level] = {"say": LEVELS[level]["say"], "band": LEVELS[level]["words"], "cells": cells,
                       "pick": (meta.get("picks") or {}).get(level)}
    out = {"id": meta.get("id", folder.name), "title": meta.get("title", ""), "brief": meta.get("brief", ""),
           "target": meta.get("target") or {}, "authors": AUTHORS, "levels": rows,
           "made": dt.datetime.now().isoformat(timespec="seconds")}
    (folder / "report.json").write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8", newline="\n")
    return out


def check(root: Path) -> int:
    problems = []
    for folder in passages(root):
        meta = load(folder / "passage.yaml")
        if meta.get("id") != folder.name:
            problems.append(f"{folder.name}: id is {meta.get('id')!r}, the folder's name is the id")
        if not meta.get("brief"):
            problems.append(f"{folder.name}: no brief (what the passage must say)")
        for f in folder.glob("*.md"):
            a, _, lv = f.stem.partition(".")
            if a not in AUTHORS or lv not in LEVELS:
                problems.append(f"{folder.name}/{f.name}: not <author>.<level>.md ({', '.join(AUTHORS)} x {', '.join(LEVELS)})")
        for lv, a in (meta.get("picks") or {}).items():
            if lv not in LEVELS or str(a).split()[0] not in AUTHORS:
                problems.append(f"{folder.name}: pick {lv}: {a} is not a level and an author")
        target = meta.get("target") or {}
        if target.get("file") and not (U / target["file"]).exists():
            problems.append(f"{folder.name}: target {target['file']} is not in U")
    for p in problems:
        print(p)
    print(f"{len(passages(root))} passages in {root}; {len(problems)} problems")
    return 1 if problems else 0


def ask(folder: Path, author: str, levels: list[str]) -> int:
    """H-AL or MOTHER writes its versions through mother/ask.py (one NotebookLM path, paced)."""
    meta = load(folder / "passage.yaml")
    mother = U / "apps" / "instrument" / "mother"
    py = next((p for p in (mother / ".venv" / "Scripts" / "python.exe", mother / ".venv" / "bin" / "python") if p.exists()), None)
    if not py:
        print("no MOTHER venv (apps/instrument/mother/.venv)")
        return 1
    for lv in levels:
        lo, hi = LEVELS[lv]["words"]
        prompt = (f"Write one passage for the reader level '{lv}' ({LEVELS[lv]['say']}), between {lo} and {hi} words, "
                  f"in plain British English, no headings, no lists, no citations in brackets. "
                  f"The passage must say: {meta.get('brief', '').strip()}"
                  + (" Mark a model claim with its evidence label in backticks (interpretive, open-hypothesis, derived-under-assumptions)." if lv == "specialist" else "")
                  + " Answer with the passage only.")
        r = subprocess.run([str(py), "ask.py", author, prompt], cwd=mother, capture_output=True, text=True, encoding="utf-8", timeout=600)
        text = r.stdout.strip()
        if r.returncode or not text:
            print(f"{author}.{lv}: no answer ({(r.stderr or r.stdout).strip()[-300:]})")
            return 1
        head = f"<!-- written by {AUTHORS[author]} on {dt.datetime.now().isoformat(timespec='minutes')}, asked through mother/ask.py -->\n"
        (folder / f"{author}.{lv}.md").write_text(head + text + "\n", encoding="utf-8", newline="\n")
        print(f"{author}.{lv}.md: {len(WORD.findall(text))} words")
    return 0


def pick(folder: Path, level: str, author: str) -> int:
    if level not in LEVELS or author not in AUTHORS:
        print(f"a level ({', '.join(LEVELS)}) and an author ({', '.join(AUTHORS)})")
        return 1
    if not (folder / f"{author}.{level}.md").exists():
        print(f"no {author}.{level}.md in {folder.name}")
        return 1
    p = folder / "passage.yaml"
    meta = load(p)
    meta.setdefault("picks", {})[level] = f"{author} ({dt.date.today().isoformat()})"
    p.write_text(yaml.safe_dump(meta, sort_keys=False, allow_unicode=True, width=110), encoding="utf-8", newline="\n")
    print(f"{folder.name} {level}: {AUTHORS[author]}")
    return 0


def apply(folder: Path) -> int:
    """Each picked level's text into the target, between <!-- writers:<id>:<level> --> and its closing marker; the
    credit inside the opening marker. A level without markers in the target is reported, never guessed."""
    meta = load(folder / "passage.yaml")
    target = U / (meta.get("target") or {}).get("file", "")
    if not target.is_file():
        print("no target file")
        return 1
    text = target.read_text(encoding="utf-8")
    vs = versions(folder)
    done = 0
    for lv, who in (meta.get("picks") or {}).items():
        a = str(who).split()[0]
        open_re = re.compile(rf"<!-- writers:{re.escape(meta['id'])}:{lv}( [^>]*)? -->.*?<!-- /writers:{re.escape(meta['id'])}:{lv} -->", re.S)
        if not open_re.search(text):
            print(f"{lv}: no markers <!-- writers:{meta['id']}:{lv} --> ... <!-- /writers:{meta['id']}:{lv} --> in {target.relative_to(U)}")
            continue
        body = f"<!-- writers:{meta['id']}:{lv} by {AUTHORS[a]}, picked {who.split('(')[-1].rstrip(')') if '(' in str(who) else ''} -->\n{vs[lv][a]}\n<!-- /writers:{meta['id']}:{lv} -->"
        text = open_re.sub(lambda _: body, text, count=1)
        done += 1
    target.write_text(text, encoding="utf-8", newline="\n")
    print(f"{done} picked level(s) written into {target.relative_to(U)}")
    return 0


def main(argv: list[str]) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    root = DIR
    if "--dir" in argv:
        i = argv.index("--dir")
        root = Path(argv[i + 1]).resolve()
        del argv[i:i + 2]
    cmd = argv[0] if argv else "check"
    if cmd == "check":
        return check(root)
    if cmd == "report":
        folders = [root / argv[1]] if len(argv) > 1 else passages(root)
        for f in folders:
            r = report(f)
            print(f"{f.name}: " + "; ".join(f"{lv} {', '.join(f'{c['author']} {c['score']}' for c in row['cells'])}" for lv, row in r['levels'].items() if row['cells']))
        return 0
    if cmd == "ask":
        author = argv[argv.index("--author") + 1] if "--author" in argv else ""
        if author not in ("hal", "mother"):
            print("--author hal or mother")
            return 1
        levels = [argv[argv.index("--level") + 1]] if "--level" in argv else list(LEVELS)
        return ask(root / argv[1], author, levels)
    if cmd == "pick":
        return pick(root / argv[1], argv[2], argv[3])
    if cmd == "apply":
        return apply(root / argv[1])
    print(__doc__)
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
