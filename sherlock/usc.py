#!/usr/bin/env python3
"""USC's one command for every editor (ISS-132): the findings in compiler style.

    python sherlock/usc.py check     # -> bld/sherlock/usc.txt, and printed
    python sherlock/usc.py ideas ... # the ideas list (chats.py ideas, same flags)
    python sherlock/usc.py recall WORD ...   # "didn't I think about ...?": every thread, any state, best first
    python sherlock/usc.py browse            # "there was something else": what is still open, as JSON for a picker
    python sherlock/usc.py where STAMP THREAD # the chat file and line where a thread starts
    python sherlock/usc.py rank STAMP THREAD N # the author's own rating, 0-3 ("sort by cool"); browse puts it first

Each finding is one line, `path:line: error|warning: message`, the form VS Code's problem matchers,
Vim's quickfix list and the extension (apps/vscode) read. Errors: the {{usc:...}} tags that break the
grammar (usctags.py), and the books' citations of conversations that do not hold ([...]{.chat ref="STAMP"
p="N-M"}: the chat must exist, the prompts must be in it; ISS-133). Warnings: the tags not yet triaged (a class,
no disp), and the method's open
assumptions, the bait (`.open_` and `.assumed` witnesses in the backtests and the fishing), each at its
line in the Lean. Fast (no Lean is run); `make -C sherlock chats links fishing` remain the deep checks.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import usctags  # noqa: E402

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock" / "usc.txt"
CLASSES = {"IDEA", "LOOSE_END", "DECISION", "QUESTION"}
BAIT = re.compile(r'"([^"]+)",\s*\.(open_|assumed)\s+"([^"]*)"')
LEAN = [U / "sherlock" / "Fishing", U / "sherlock" / "backtests"]


def tag_findings() -> list[str]:
    fs = usctags.files([])
    tags = [t for f in fs for t in usctags.scan(f)]
    out = [re.sub(r"^(.*?:\d+): ", r"\1: error: ", p) for p in usctags.problems(tags)]
    for t in tags:
        a = t["attrs"]
        if t["kind"] == "begin" and a.get("status") in CLASSES and not a.get("disp"):
            note = f": {a['note']}" if a.get("note") else ""
            out.append(f"{t['file'].as_posix()}:{t['line']}: warning: untriaged {a['status']} {a.get('id')}{note}")
    return out


def bait_findings() -> list[str]:
    out = []
    for d in LEAN:
        for f in sorted(d.glob("*.lean")):
            text = f.read_text(encoding="utf-8")
            for m in BAIT.finditer(text):  # a witness may wrap onto the next line
                n = text.count("\n", 0, m.start()) + 1
                how = "open assumption" if m[2] == "open_" else "assumed, not checked"
                out.append(f"{f.as_posix()}:{n}: warning: {how}: {m[1]} ({' '.join(m[3].split())})")
    return out


BOOKS = [U / "books" / "T-Theory" / "evolution", U / "books" / "T-Theory" / "background"]
CITE = re.compile(r'\]\{\.chat\s+ref="([^"]+)"(?:\s+p="([^"]+)")?\s*\}')


def citation_findings() -> list[str]:
    import chats
    out, cache = [], {}
    for d in BOOKS:
        for f in sorted(d.glob("*.md")):
            text = f.read_text(encoding="utf-8")
            for m in CITE.finditer(text):
                n = text.count("\n", 0, m.start()) + 1
                ref, p = m[1], m[2]
                hits = sorted(chats.INBOX.glob(ref + "*.md")) + sorted(chats.PHASEDOT.glob(ref + "*.md"))
                if len(hits) != 1:
                    out.append(f"{f.as_posix()}:{n}: error: cited conversation {ref} {'not found' if not hits else 'ambiguous'}")
                    continue
                if p:
                    if hits[0] not in cache:
                        cache[hits[0]] = len(chats.parse(hits[0])["prompts"])
                    nums = [int(x) for x in re.findall(r"\d+", p)]
                    bad = [x for x in nums if not 1 <= x <= cache[hits[0]]]
                    if bad:
                        out.append(f"{f.as_posix()}:{n}: error: {ref} has {cache[hits[0]]} prompts, not {bad}")
    return out


def check() -> int:
    found = tag_findings() + citation_findings() + bait_findings()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("".join(x + "\n" for x in found), encoding="utf-8", newline="\n")
    for x in found:
        print(x)
    errors = sum(": error: " in x for x in found)
    print(f"usc: {errors} errors, {len(found) - errors} warnings -> {OUT}", file=sys.stderr)
    return 1 if errors else 0


def recall(query: list[str], top: int = 12) -> int:
    """Didn't I think about ...? (author, 27 Nov): every thread of every chat and Phase Dot conversation, whatever
    became of it, scored by the query's words in its topic, id and concepts (a word matches as a prefix:
    "voyage" finds "voyages"), best first, with when, where and its fate. Private threads included: this is
    the author's own memory, printed on his machine, never built into a document."""
    import yaml
    import chats
    words = [w.lower() for q in query for w in re.findall(r"[\w-]+", q) if len(w) > 2]
    if not words:
        print("usage: usc.py recall WORD ...")
        return 2
    hits = []
    for a in chats.all_affs():
        aff = yaml.safe_load(a.read_text(encoding="utf-8")) or {}
        for t in aff.get("threads") or []:
            hay = (str(t.get("topic", "")) + " " + str(t.get("id", "")) + " " + " ".join(t.get("concepts") or [])).lower()
            toks = re.findall(r"[\w-]+", hay)
            score = sum(1 for w in words if any(x.startswith(w) or w in x for x in toks))
            if score:
                st = chats.stamp_of(a.stem)
                d, ref = t.get("disposition", "untriaged"), t.get("ref", "")
                ps = t.get("prompts") or []
                where = ("Phase Dot " if a.parent == chats.AFF_PD else "chat ") + st + (f", prompts {ps[0]}-{ps[-1]}" if ps else "")
                hits.append((score, st, f"{st[:4]}-{st[4:6]}-{st[6:8]}  {t.get('id')}: {' '.join(str(t.get('topic', '')).split())}"
                                        f"\n      {d}{(' ' + str(ref)) if ref else ''}  ({where})"))
    hits.sort(key=lambda h: (-h[0], h[1]))
    for _, _, line in hits[:top]:
        print(line)
    print(f"recall: {len(hits)} threads match {' '.join(words)!r}; best {min(top, len(hits))} shown")
    return 0


KINDS = {"unexplored_fork": "a loose end", "deferred": "a loose end", "drifted": "an offer left", "pursued": "talked through"}


def browse() -> int:
    """I'm sure there was something else (ISS-136): every open thread (not yet triaged, or queued to an issue) with
    its product and kind, for a picker that narrows: what was it for, which kind, then the list. JSON on stdout."""
    import json
    import yaml
    import chats
    items = []
    for a in chats.all_affs():
        aff = yaml.safe_load(a.read_text(encoding="utf-8")) or {}
        for t in aff.get("threads") or []:
            d = t.get("disposition", "untriaged")
            if d not in ("untriaged", "queued"):
                continue
            own = set(t.get("concepts") or [])
            cs = own | set(aff.get("concepts") or [])
            product = next((k for k, v in chats.PRODUCTS.items() if own & v), None) or next(
                (k for k, v in chats.PRODUCTS.items() if cs & v), "Ops")
            if own & chats.PRIVATE:
                product = "Personal"
            kind = f"queued ({t.get('ref', '')})" if d == "queued" else KINDS.get(t.get("status"), "talked through")
            st = chats.stamp_of(a.stem)
            items.append({"product": product, "kind": kind, "date": f"{st[:4]}-{st[4:6]}-{st[6:8]}", "stamp": st,
                          "thread": t.get("id", ""), "topic": " ".join(str(t.get("topic", "")).split()),
                          "rank": t.get("rank", 0)})
    items.sort(key=lambda i: (-int(i["rank"] or 0), i["date"]), reverse=False)
    print(json.dumps(items, ensure_ascii=False))
    return 0


def where(stamp: str, thread: str) -> int:
    """The chat file and the line of a thread's first prompt (for an editor to open)."""
    import yaml
    import chats
    for a in chats.all_affs():
        if chats.stamp_of(a.stem) != stamp:
            continue
        aff = yaml.safe_load(a.read_text(encoding="utf-8")) or {}
        t = next((t for t in aff.get("threads") or [] if t.get("id") == thread), None)
        if not t:
            continue
        f = chats.chat_for(a)
        ps = t.get("prompts") or []
        line = 1
        if ps and f.exists():
            prompts = chats.parse(f)["prompts"]
            if 1 <= ps[0] <= len(prompts):
                line = prompts[ps[0] - 1]["line"]
        print(f"{f.as_posix()}:{line}")
        return 0
    print(f"usc: no thread {thread} in {stamp}", file=sys.stderr)
    return 1


def rank(stamp: str, thread: str, n: str) -> int:
    """Sort by cool (ISS-136): the author's rating of a thread, 0 to 3, kept in its affidavit (`rank: N`)."""
    import chats
    if n not in ("0", "1", "2", "3"):
        print("usage: usc.py rank STAMP THREAD 0-3")
        return 2
    for a in chats.all_affs():
        if chats.stamp_of(a.stem) != stamp:
            continue
        L = a.read_text(encoding="utf-8").split("\n")
        for i, l in enumerate(L):
            if re.search(r"\{id: " + re.escape(thread) + ",", l):
                l = re.sub(r",\s*rank:\s*\d", "", l)
                L[i] = l[:l.rindex("}")].rstrip() + (f", rank: {n}" if n != "0" else "") + "}"
                a.write_text("\n".join(L), encoding="utf-8", newline="\n")
                print(f"{a.name}: {thread} rank {n}")
                return 0
    print(f"usc: no thread {thread} in {stamp}", file=sys.stderr)
    return 1


def main() -> int:
    if len(sys.argv) >= 2 and sys.argv[1] == "recall":
        return recall(sys.argv[2:])
    if len(sys.argv) >= 2 and sys.argv[1] == "browse":
        return browse()
    if len(sys.argv) == 5 and sys.argv[1] == "rank":
        return rank(sys.argv[2], sys.argv[3], sys.argv[4])
    if len(sys.argv) == 4 and sys.argv[1] == "where":
        return where(sys.argv[2], sys.argv[3])
    if len(sys.argv) < 2 or sys.argv[1] not in ("check", "ideas"):
        print(__doc__)
        return 2
    if sys.argv[1] == "ideas":
        import chats
        sys.argv = [sys.argv[0], "ideas"] + sys.argv[2:]
        return chats.main()
    return check()


if __name__ == "__main__":
    sys.exit(main())
