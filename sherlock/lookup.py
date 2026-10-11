"""Sherlock's mapping assistant: which OpenCyc constant does a word mean?

    python sherlock/lookup.py percept
    python sherlock/lookup.py "pole"

Lists candidate constants from NextKB, best evidence first: FrameNet noun and
verb semantic translations (`FNNounSemtrans`: Word-TheWord to `(isa :NOUN X)`),
canonical names (`prettyString-Canonical`), and constant names containing the
word; each with its `comment`, `isa` and direct `genls` in
UniversalVocabularyMt. The affidavit's author chooses; the choice goes into
the claim's `mapping` in the registry. Index cached in bld/sherlock/lexicon.json.
"""
from __future__ import annotations

import json
import re
import sys
import zipfile
from collections import defaultdict
from pathlib import Path

U = Path(__file__).resolve().parents[1]
ZIP = U / "bld" / "sherlock" / "raw" / "nextkb_files_20190107.zip"
CACHE = U / "bld" / "sherlock" / "lexicon.json"


def build() -> dict:
    sem, pretty = defaultdict(set), defaultdict(set)
    comment, isa, genls = {}, defaultdict(list), defaultdict(list)
    with zipfile.ZipFile(ZIP) as z:
        for n in z.namelist():
            if not n.endswith(".krf"):
                continue
            t = z.read(n).decode("utf-8", "replace")
            for m in re.finditer(r"\(FN(?:Noun|Verb|Adj)Semtrans \(TheList[^)]*\) ([\w-]+)-TheWord(.{0,400}?)\n\n", t, re.S):
                for c in re.findall(r"\(isa :(?:NOUN|ACTION|SUBJECT|OBJECT)\s+([\w-]+)\)", m.group(2)):
                    sem[m.group(1).lower()].add(c)
            for c, s in re.findall(r'\(prettyString-Canonical ([\w-]+) "([^"]+)"\)', t):
                pretty[s.lower()].add(c)
            if n.endswith("UniversalVocabularyMt.krf") or "/UniversalVocabularyMt" in n:
                for c, s in re.findall(r'\(comment ([\w-]+) "((?:[^"\\]|\\.)*)"\)', t):
                    comment[c] = " ".join(s.replace("#$", "").split())[:220]
                for p, a, b in re.findall(r"\((isa|genls) ([\w-]+) ([\w-]+)\)", t):
                    (isa if p == "isa" else genls)[a].append(b)
    idx = {"sem": {k: sorted(v) for k, v in sem.items()}, "pretty": {k: sorted(v) for k, v in pretty.items()},
           "comment": comment, "isa": isa, "genls": genls}
    CACHE.parent.mkdir(parents=True, exist_ok=True)
    CACHE.write_text(json.dumps(idx), encoding="utf-8")
    return idx


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    word = " ".join(sys.argv[1:]).lower()
    idx = json.loads(CACHE.read_text(encoding="utf-8")) if CACHE.exists() else build()
    stem = word.split()[-1].rstrip("s")
    found: dict[str, str] = {}
    for c in idx["sem"].get(word, []) + idx["sem"].get(stem, []):
        found.setdefault(c, "semtrans")
    for c in idx["pretty"].get(word, []):
        found.setdefault(c, "pretty name")
    rx = re.compile(rf"(^|[-A-Z]){re.escape(stem.capitalize())}|{re.escape(stem)}", re.I)
    for c in idx["comment"]:
        if rx.search(c) and len(found) < 40:
            found.setdefault(c, "name")
    if not found:
        print(f"no candidates for {word!r}")
        return 1
    order = {"semtrans": 0, "pretty name": 1, "name": 2}
    for c, why in sorted(found.items(), key=lambda kv: (order[kv[1]], len(kv[0]))):
        print(f"{c}  [{why}]")
        if c in idx["comment"]:
            print(f"    {idx['comment'][c]}")
        print(f"    isa {', '.join(idx['isa'].get(c, [])[:4]) or '-'}; genls {', '.join(idx['genls'].get(c, [])[:5]) or '-'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
