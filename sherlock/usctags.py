"""The {{usc:...}} tags (sherlock/usc_tags.ebnf): scan, check, and compile to Lean (ISS-126).

  python sherlock/usctags.py check [FILES]   the checks; the default files are U/ISSUES.md and Me/chats/Inbox
  python sherlock/usctags.py lean  [FILES]   bld/sherlock/lean/Tags.lean (private: the chats' tags)
  python sherlock/usctags.py strip FILE      print FILE without its tags (what the builds see)

A tag stands alone on its line; a tag inside a line of prose or code is a mention (an example quoted in a
chat, a name in an issue) and is ignored, as are the example lines listed in MENTIONS.
Tags are allowed only where nothing builds them into a document yet (ALLOWED): the chats and ISSUES.md.
Papers and books follow when every reader strips them (lib/format/visualize-reader.lua does).
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

U = Path(__file__).resolve().parents[1]
ME = U.parent.parent / "Me"
OUT = U / "bld" / "sherlock" / "lean"
KINDS = {"begin", "end", "fork", "branch", "jump"}
KEYS = {"id", "ref", "status", "domain", "lean", "choice", "prob", "opts", "disp", "note"}
STATUS = {"ESTABLISHED", "LEAN_VERIFIED", "PEER_REVIEWED", "EMPIRICAL_SIM", "PREPRINT", "SPECULATIVE_BRIDGE",
          "REALIZED", "COUNTERFACTUAL", "WILDCARD", "IDEA"}
DISP = {"implemented", "queued", "parked", "discarded"}
TAG = re.compile(r'\{\{\s*usc:(\w+)((?:\s+\w+\s*=\s*"[^"]*")*)\s*\}\}')
ATTR = re.compile(r'(\w+)\s*=\s*"([^"]*)"')
ALLOWED = [U / "ISSUES.md", ME / "chats"]
OWN_LINE = re.compile(r'^[ \t*>-]*(\{\{\s*usc:\w+(?:\s+\w+\s*=\s*"[^"]*")*\s*\}\})[^\n]*$', re.M)
# Examples quoted in chats (the grammar's own, 26 Nov), by their ids: mentions, not tags. By id, not by line,
# since tags added later move the lines.
MENTIONS = {"20261126_140957_aimode_nextkb_dataset_also_supports_sketching_via_another_app_does.md":
            {"P14-OS3", "P14-BR1", "N10", "N10-A", "N10-B", "N11"}}


def scan(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8", errors="replace")
    skip = MENTIONS.get(path.name, set())
    tags = []
    for line_no, line in enumerate(text.split("\n"), 1):
        if "usc:" not in line:
            continue
        own = OWN_LINE.match(line)
        if own:
            for m in TAG.finditer(own[0]):
                attrs = dict(ATTR.findall(m[2]))
                if attrs.get("id") in skip or attrs.get("ref") in skip:
                    continue
                tags.append({"file": path, "line": line_no, "kind": m[1], "attrs": attrs})
        elif re.match(r"^[ \t*>-]*\{\{\s*usc:", line):
            tags.append({"file": path, "line": line_no, "kind": "?", "attrs": {}, "stray": 1})
    return tags


def strip(text: str) -> str:
    return TAG.sub("", text)


def problems(tags: list[dict]) -> list[str]:
    out, ids, opened, forks = [], {}, {}, set()
    for t in tags:
        where = f"{t['file'].as_posix()}:{t['line']}"
        if t["kind"] == "?":
            out.append(f"{t['file'].as_posix()}:{t['line']}: a malformed {{{{usc:...}}}} tag")
            continue
        a = t["attrs"]
        if not any(str(t["file"]).startswith(str(p)) for p in ALLOWED):
            out.append(f"{where}: tags are not allowed here yet (only ISSUES.md and Me/chats)")
        if t["kind"] not in KINDS:
            out.append(f"{where}: unknown kind {t['kind']!r}")
        for k in a:
            if k not in KEYS:
                out.append(f"{where}: unknown key {k!r}")
        if "status" in a and a["status"] not in STATUS:
            out.append(f"{where}: unknown status {a['status']!r}")
        if "disp" in a and a["disp"] not in DISP:
            out.append(f"{where}: unknown disposition {a['disp']!r}")
        if a.get("disp") in ("implemented", "queued") and not a.get("ref"):
            out.append(f"{where}: disp={a['disp']} needs a ref (ISS-NNN, a path or a commit)")
        key = (t["file"], a.get("id"))
        if t["kind"] in ("begin", "fork", "jump"):
            if not a.get("id"):
                out.append(f"{where}: {t['kind']} needs an id")
            elif key in ids:
                out.append(f"{where}: id {a['id']!r} already used at line {ids[key]}")
            else:
                ids[key] = t["line"]
            if t["kind"] in ("begin", "jump"):
                opened[key] = t["line"]
            if t["kind"] == "fork":
                forks.add(key)
        elif t["kind"] == "end":
            if key not in opened:
                if not any(k[0] == t["file"] and a.get("id", "").startswith(str(k[1]) + "-") for k in forks):
                    out.append(f"{where}: end {a.get('id')!r} closes nothing")
            else:
                del opened[key]
        elif t["kind"] == "branch" and (t["file"], a.get("ref")) not in forks:
            out.append(f"{where}: branch ref {a.get('ref')!r} names no fork")
    for (f, i), line in opened.items():
        out.append(f"{f.as_posix()}:{line}: {i!r} is never ended")
    return out


def files(given: list[str]) -> list[Path]:
    if given:
        return [Path(g).resolve() for g in given]
    return [U / "ISSUES.md"] + sorted((ME / "chats" / "Inbox").glob("*.md"))


def s(x: str) -> str:
    return '"' + str(x).replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n") + '"'


def lean(tags: list[dict]) -> str:
    L = ["import Tag.Basic", "", "/-! Generated by sherlock/usctags.py (private: the chats' tags; never commit). -/", "",
         "def Tags.all : List Tag.Tag := ["]
    rows = []
    for t in tags:
        if t["kind"] == "?":
            continue
        a = t["attrs"]
        try:
            rel = t["file"].relative_to(ME).as_posix()
        except ValueError:
            rel = t["file"].relative_to(U).as_posix()
        rows.append("  { " + ", ".join([f"file := {s(rel)}", f"line := {t['line']}", f"kind := .{t['kind']}"]
                    + [f"{k} := {s(a[k])}" for k in sorted(a)]) + " }")
    L += [",\n".join(rows), "]", ""]
    return "\n".join(L)


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) < 2 or sys.argv[1] not in ("check", "lean", "strip"):
        print(__doc__)
        return 1
    if sys.argv[1] == "strip":
        sys.stdout.write(strip(Path(sys.argv[2]).read_text(encoding="utf-8")))
        return 0
    fs = files(sys.argv[2:])
    tags = [t for f in fs for t in scan(f)]
    ps = problems(tags)
    if sys.argv[1] == "lean":
        OUT.mkdir(parents=True, exist_ok=True)
        (OUT / "Tags.lean").write_text(lean(tags), encoding="utf-8", newline="\n")
        print(f"tags: {len(tags)} tags in {len({t['file'] for t in tags})} files -> {OUT / 'Tags.lean'}")
    else:
        print(f"tags: {len(tags)} tags in {len(fs)} files")
    for p in ps:
        print("  !!", p)
    # The findings in compiler style, for editors (U.Dot nvim sherlock.lua; ISS-129): path:line: error: message.
    OUT.parent.mkdir(parents=True, exist_ok=True)
    (OUT.parent / "usc.txt").write_text("".join(re.sub(r"^(.*?:\d+): ", r"\1: error: ", q) + "\n" for q in ps),
                                       encoding="utf-8", newline="\n")
    return 1 if ps else 0


if __name__ == "__main__":
    sys.exit(main())
