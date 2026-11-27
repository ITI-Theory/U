#!/usr/bin/env python3
"""USC's one command for every editor (ISS-132): the findings in compiler style.

    python sherlock/usc.py check     # -> bld/sherlock/usc.txt, and printed
    python sherlock/usc.py ideas ... # the ideas list (chats.py ideas, same flags)
    python sherlock/usc.py recall WORD ...   # "didn't I think about ...?": every thread, any state, best first
    python sherlock/usc.py recall --text WORD ...  # the same in the chats' own text: lines with every word
    python sherlock/usc.py browse            # "there was something else": what is still open, as JSON for a picker
    python sherlock/usc.py where STAMP THREAD # the chat file and line where a thread starts
    python sherlock/usc.py rank STAMP THREAD N # the author's own rating, 0-3 ("sort by cool"); browse puts it first
    python sherlock/usc.py board [STAMP]      # the thoughts as a Kanban board -> Me/chats/board.md (or one chat's)
    python sherlock/usc.py board --apply      # the cards moved in board.md become routes (moves it cannot apply: reported)
    python sherlock/usc.py coverage          # which documents have an affidavit, group by group -> bld/sherlock/coverage.md
    python sherlock/usc.py make              # every target `make help` and the docs promise exists (static, seconds)
    python sherlock/usc.py make --stale      # which promised targets are up to date, by Make's own dry run (nothing built)
    python sherlock/usc.py make --dead       # targets nothing calls: not the help, another rule, the docs, bin/, CI or HAL
    python sherlock/usc.py git               # every repo: LF everywhere (index and working copy), .gitattributes, strays
    python sherlock/usc.py new REV1 [REV2]   # what's new between two commits or tags: issues opened, closed, boxes ticked

Each finding is one line, `path:line: error|warning: message`, the form VS Code's problem matchers,
Vim's quickfix list and the extension (apps/vscode) read. Errors: the {{usc:...}} tags that break the
grammar (usctags.py), targets that `make help` or the docs promise but no Makefile defines, and the books' citations of conversations that do not hold ([...]{.chat ref="STAMP"
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


def value_findings() -> list[str]:
    """A quantity quoted differently in two places (bld/sherlock/values.md, from `make -C sherlock check`): a warning at
    the first affidavit that quotes it, so a disagreement is in the editor and not only in a report (ISS-139)."""
    f = U / "bld" / "sherlock" / "values.md"
    if not f.exists():
        return []
    out = []
    for line in f.read_text(encoding="utf-8").split("\n"):
        m = re.match(r"- `([^`]+)` DIFFER: (.*)$", line)
        if not m:
            continue
        doc = re.search(r"\(([\w-]+) (\w+)\)", m[2])
        aff = U / "registry" / "affidavits" / f"{doc[1]}.yaml" if doc else None
        n = 1
        if aff and aff.exists():
            for k, l in enumerate(aff.read_text(encoding="utf-8").split("\n"), 1):
                if re.search(r"- id: " + re.escape(doc[2]) + r"\b", l):
                    n = k
                    break
        where = aff.as_posix() if aff and aff.exists() else f.as_posix()
        out.append(f"{where}:{n}: warning: {m[1]} is quoted differently: {m[2][:160]}")
    return out


def check() -> int:
    found = tag_findings() + citation_findings() + make_findings() + value_findings() + bait_findings()
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


def recall_text(query: list[str], top: int = 12) -> int:
    """Recall in the text itself (ISS-138): a sentence an assistant wrote is in no thread's topic. Every line of every
    chat and Phase Dot conversation that holds all the words (case-insensitive), newest chats first."""
    import chats
    words = [w.lower() for w in query if len(w) > 1]
    if not words:
        print("usage: usc.py recall --text WORD ...")
        return 2
    hits = 0
    for f in sorted(chats.chat_files([]), key=lambda p: p.name, reverse=True):
        for n, line in enumerate(f.read_text(encoding="utf-8", errors="replace").split("\n"), 1):
            low = line.lower()
            if all(w in low for w in words):
                hits += 1
                if hits <= top:
                    i = min(low.index(w) for w in words)
                    print(f"{chats.stamp_of(f.stem)}:{n}: ...{' '.join(line[max(0, i - 60):i + 140].split())}...")
    print(f"recall --text: {hits} lines hold {' '.join(words)!r}; {min(top, hits)} shown, newest chats first")
    return 0


COLUMNS = ["No status", "Backlog", "Ready", "Paused", "In progress", "Done"]
CARD = re.compile(r"^- \[[ x]\] (.*?)\s*<!-- (\S+) (\S+) -->\s*$")


def _column(t: dict, status: dict) -> str:
    d, ref = t.get("disposition", "untriaged"), str(t.get("ref", ""))
    if d in ("implemented", "discarded"):
        return "Done"
    if d == "parked":
        return "Paused"
    if d == "queued":
        if t.get("ready"):
            return "Ready"
        st = next((status[i] for i in re.findall(r"ISS-\d+", ref) if i in status), "OPEN")
        return {"IN-PROGRESS": "In progress", "PARKED": "Paused", "ON-HOLD": "Paused"}.get(st, "Backlog")
    return "No status"


def _cards(only: str = "") -> list[dict]:
    import yaml
    import chats
    status = {k: v["status"] for k, v in chats.issues().items()}
    out = []
    for a in chats.all_affs():
        st = chats.stamp_of(a.stem)
        if only and st != only:
            continue
        aff = yaml.safe_load(a.read_text(encoding="utf-8")) or {}
        for t in aff.get("threads") or []:
            if str(t.get("ref", "")).startswith("duplicate of"):
                continue
            out.append({"stamp": st, "thread": t.get("id", ""), "column": _column(t, status), "t": t,
                        "date": f"{st[:4]}-{st[4:6]}-{st[6:8]}", "topic": " ".join(str(t.get("topic", "")).split())})
    return out


def board(only: str = "") -> int:
    """Thoughts on a Kanban board (ISS-136): the author's columns, a card per thread, in the Markdown that VS Code's and
    Obsidian's Kanban views read and any editor edits. Moving a card (a line) and `board --apply` is the triage."""
    import chats
    cards = _cards(only)
    L = ["---", "kanban-plugin: basic", "---", "",
         "<!-- Generated by `python U/sherlock/usc.py board`. Move a card (its line) to another column, then run",
         "     `usc.py board --apply`: the moves become routes. Backlog and Ready need the issue on the card (ISS-NNN);",
         "     Done takes the card's ref, or `done: REF` / `dropped: REASON` written on it; In progress follows the issue. -->", ""]
    for col in COLUMNS:
        L += [f"## {col}", ""]
        for c in sorted((c for c in cards if c["column"] == col), key=lambda c: c["date"], reverse=True):
            ref = str(c["t"].get("ref", ""))
            mark = "x" if col == "Done" else " "
            L.append(f"- [{mark}] {c['date']} {c['topic']}" + (f" [{ref}]" if ref else "") + f" <!-- {c['stamp']} {c['thread']} -->")
        L.append("")
    out = chats.ME / "chats" / (f"board-{only}.md" if only else "board.md")
    out.write_text("\n".join(L), encoding="utf-8", newline="\n")
    counts = {col: sum(1 for c in cards if c["column"] == col) for col in COLUMNS}
    print(f"board: {len(cards)} cards (" + ", ".join(f"{k} {v}" for k, v in counts.items()) + f") -> {out}")
    return 0


def board_apply(path: str = "") -> int:
    import subprocess
    import chats
    f = Path(path) if path else chats.ME / "chats" / "board.md"
    now = {(c["stamp"], c["thread"]): c for c in _cards()}
    status = {k: v["status"] for k, v in chats.issues().items()}
    col, applied, refused = None, 0, []
    for line in f.read_text(encoding="utf-8").split("\n"):
        if line.startswith("## "):
            col = line[3:].strip()
            continue
        m = CARD.match(line)
        if not m or col not in COLUMNS:
            continue
        text, key = m[1], (m[2], m[3])
        c = now.get(key)
        if not c or c["column"] == col:
            continue
        args = None
        iss = re.findall(r"ISS-\d+", text)
        done = re.search(r"\bdone:\s*(\S+)", text)
        dropped = re.search(r"\bdropped:\s*(.+?)\s*(\[|$)", text)
        ref = str(c["t"].get("ref", ""))
        if col == "No status":
            args = ["untriaged"]
        elif col in ("Backlog", "Ready"):
            args = ["queued", iss[-1]] if iss else None
        elif col == "Paused":
            args = ["parked"]
        elif col == "Done":
            # The card's own ref witnesses Done only if it is a path or a CLOSED issue: an open issue is not done.
            open_issue = any(status.get(i, "OPEN") != "CLOSED" for i in re.findall(r"ISS-\d+", ref))
            args = (["implemented", done[1]] if done else ["discarded", dropped[1]] if dropped
                    else ["implemented", ref] if ref and not open_issue else None)
        if not args:
            refused.append(f"{key[0]} {key[1]} -> {col}: " + ("In progress follows its issue" if col == "In progress"
                           else "write the issue (ISS-NNN) on the card" if col in ("Backlog", "Ready")
                           else "write done: REF or dropped: REASON on the card"))
            continue
        r = subprocess.run([sys.executable, str(Path(__file__).with_name("chats.py")), "route", key[0], key[1], *args],
                           capture_output=True, text=True, encoding="utf-8")
        print(r.stdout.strip() or r.stderr.strip())
        applied += 1
    for x in refused:
        print("board: not applied:", x)
    print(f"board --apply: {applied} moves applied, {len(refused)} reported")
    return 1 if refused else 0


def coverage() -> int:
    """The web's coverage (ISS-139): every document that makes claims, by group, with or without an affidavit
    (registry/affidavits: a document is covered when an affidavit freezes it). A list, not a memory."""
    import yaml
    covered = set()
    for f in (U / "registry" / "affidavits").glob("*.yaml"):
        source = (yaml.safe_load(f.read_text(encoding="utf-8")) or {}).get("source") or {}
        if source.get("file"):
            covered.add((f"{source['repo']}:" if source.get("repo") else "") + source["file"].replace("\\", "/"))
    reg = yaml.safe_load((U / "registry" / "papers.yaml").read_text(encoding="utf-8"))
    rel = lambda ps: sorted(p.relative_to(U).as_posix() for p in ps)
    groups = [
        ("The papers", [f"paper/soma/{p['slug']}/{p['slug']}.md" for p in reg["canonical_papers"]]),
        ("The books", rel((U / "books" / "T-Theory").glob("*/book-*.md"))),
        ("The course", rel((U / "Part2" / "book" / "field-atlas-textbook" / "chapters").glob("*.md"))),
        ("The Field Atlas", rel(list((U / "Part2" / "book" / "field-atlas").glob("front/*.md"))
                                + list((U / "Part2" / "book" / "field-atlas").glob("theory/*.md"))
                                + list((U / "Part2" / "book" / "field-atlas").glob("sectors/**/*.md")))),
        ("The front doors", [p for p in ["README.md", "docs/BUILD.md", "docs/SHERLOCK.md", "apps/vscode/README.md",
                                          "apps/nvim/README.md", "web/home.md", "web/PITCH.md"] if (U / p).exists()]),
        ("The registry", ["registry/papers.yaml"]),
        ("Dist (the distribution)", ["Dist:" + p.relative_to(U.parent / "Dist").as_posix()
                                     for p in sorted((U.parent / "Dist").glob("**/README.md")) if ".git" not in p.parts]),
    ]
    out = ["# What Sherlock covers (ISS-139)", "", "Generated by `python sherlock/usc.py coverage`: a document is covered when an "
           "affidavit in registry/affidavits freezes it (Dist's files by `repo: Dist`). Not yet here: the org page (.github).", ""]
    total = done = 0
    for title, docs in groups:
        have = [d for d in docs if d in covered]
        total += len(docs); done += len(have)
        out += [f"## {title}: {len(have)} of {len(docs)}", ""] + [f"- [ ] {d}" for d in docs if d not in covered] + [""]
        print(f"coverage: {title}: {len(have)} of {len(docs)}")
    out.insert(4, f"{done} of {total} documents covered.\n")
    (U / "bld" / "sherlock").mkdir(parents=True, exist_ok=True)
    (U / "bld" / "sherlock" / "coverage.md").write_text("\n".join(out) + "\n", encoding="utf-8", newline="\n")
    print(f"coverage: {done} of {total} documents -> {U / 'bld' / 'sherlock' / 'coverage.md'}")
    return 0


MAKE_DIRS = ["", "sherlock", "paper", "books/T-Theory", "Part2/book/field-atlas-textbook", "Part2/book/field-atlas"]


def _targets(d: str) -> set[str]:
    """The targets a directory's Makefile defines: its rules, its includes' rules, and the registry's aliases."""
    base = U / d if d else U
    mk = base / "Makefile"
    if not mk.exists():
        return set()
    texts = [mk.read_text(encoding="utf-8")]
    for inc in re.findall(r"(?m)^-?include\s+(.+)$", texts[0]):
        for name in inc.split():
            if "$(" in name:
                continue
            for p in base.glob(name):
                texts.append(p.read_text(encoding="utf-8"))
    out = set()
    for t in texts:
        for m in re.finditer(r"(?m)^([\w./%-]+(?:\s+[\w./%-]+)*)\s*:(?!=)", t):
            out.update(x for x in m[1].split() if "%" not in x and "$" not in x)
        for m in re.finditer(r"(?m)^REGISTRY_PAPER_TARGETS\s*:?=\s*(.+)$", t):
            out.update(m[1].split())
        for m in re.finditer(r"\$\(call register,\s*\S+\s+\S+\s+\S+\s+(\S+)\s*\)", t):
            out.add(m[1])
    return out


def make_check() -> int:
    found = make_findings()
    for x in found:
        print(x)
    print(f"usc make: {len(found)} promised targets missing; {sum(len(_targets(d)) for d in MAKE_DIRS)} targets defined in {len(MAKE_DIRS)} Makefiles")
    return 1 if found else 0


def make_findings() -> list[str]:
    """USC on the Makefiles, step 1 (ISS-139): what `make help` and the docs promise exists. A help line or a
    `make [-C DIR] TARGET` in README.md, docs/*.md or a Makefile's help whose target is not defined is an error."""
    found = []
    defined = {d: _targets(d) for d in MAKE_DIRS}
    for d in MAKE_DIRS:
        mk = (U / d / "Makefile") if d else U / "Makefile"
        if not mk.exists():
            continue
        for n, line in enumerate(mk.read_text(encoding="utf-8").split("\n"), 1):
            m = re.match(r"\t\$\(info\s{2,}([\w.-]+)\s", line)
            if m and m[1] not in ("make",) and m[1] not in defined[d]:
                found.append(f"{mk.as_posix()}:{n}: error: help names target {m[1]!r}, which is not defined")
    docs = [U / "README.md"] + sorted((U / "docs").glob("*.md")) + [U / "docs" / "agent" / "CURRENT.md"]
    for f in docs:
        if not f.exists():
            continue
        for n, line in enumerate(f.read_text(encoding="utf-8").split("\n"), 1):
            for m in re.finditer(r"`make(?:\s+-C\s+([\w./-]+))?\s+([a-z][\w.-]*)", line):
                d, t = (m[1] or "").rstrip("/"), m[2]
                if d.startswith("../") or d not in defined or t.startswith("-"):
                    continue
                if t not in defined[d]:
                    found.append(f"{f.as_posix()}:{n}: error: `make {('-C ' + d + ' ') if d else ''}{t}`: no such target")
    return found


# Targets that start a server, publish, ask a notebook or need arguments: never dry-run.
NO_DRY_RUN = {"app-start", "relay", "app-publish", "ask", "uat-run", "uat-nlm", "uat-stage-papers", "remind", "clean",
              "generate", "explorer", "sherlock-setup", "lean-update", "release-check", "check", "moriarty", "wizard"}


def make_stale() -> int:
    """Never built, or stale (ISS-139): Make's dry run (`make -n TARGET`) for every target the root's help promises,
    read for the files it would write (`-o`, `--output`): those outputs are missing or older than their sources.
    A target whose commands write no file (a Lean build, a check) always runs and is reported as such. Nothing is
    built; the stale outputs go to bld/sherlock/stale.txt."""
    import subprocess
    mk = (U / "Makefile").read_text(encoding="utf-8")
    help_targets = [t for t in re.findall(r"(?m)^\t\$\(info\s{2,}([a-z][\w.-]*)\s", mk) if t != "make"]
    out_rx = re.compile(r"(?:\s-o\s+|--output[= ])(\S+?\.(?:pdf|html|json|vsix|epub))\b")
    stale_all, lines = set(), []
    for t in help_targets:
        if t in NO_DRY_RUN:
            continue
        try:
            r = subprocess.run(["make", "-n", "--no-print-directory", t], cwd=U, capture_output=True, text=True,
                               encoding="utf-8", errors="replace", timeout=180)
        except subprocess.TimeoutExpired:
            lines.append(f"  {t:17} timeout")
            continue
        outs = sorted(set(out_rx.findall(r.stdout)))
        cmds = [l for l in r.stdout.split("\n") if l.strip() and not re.match(r"\s*(@?echo|\S*make(\.exe)?\b|#|:)", l)]
        stale_all.update(outs)
        if outs:
            names = ", ".join(Path(o).name for o in outs[:3]) + (f" and {len(outs) - 3} more" if len(outs) > 3 else "")
            lines.append(f"  {t:17} {len(outs)} stale or missing: {names}")
        elif cmds:
            lines.append(f"  {t:17} always runs ({len(cmds)} commands, no file written)")
        else:
            lines.append(f"  {t:17} up to date")
    print("\n".join(lines))
    (U / "bld" / "sherlock").mkdir(parents=True, exist_ok=True)
    (U / "bld" / "sherlock" / "stale.txt").write_text("".join(o + "\n" for o in sorted(stale_all)), encoding="utf-8", newline="\n")
    print(f"usc make --stale: {len(stale_all)} outputs stale or missing -> {U / 'bld' / 'sherlock' / 'stale.txt'}")
    return 0


def make_dead() -> int:
    """Dead targets (ISS-139): a root target named nowhere but its own rule: not in a help line, another Makefile's
    rules or prerequisites, README/docs, bin/, the UAT checklist, CI (.github) or HAL (T.Dot). A candidate to delete
    or to document, never deleted here."""
    defined = _targets("")
    corpus = []
    texts = list((U / "lib" / "mk").glob("*.mk")) + [U / d / "Makefile" for d in MAKE_DIRS if d and (U / d / "Makefile").exists()]
    texts += [U / "README.md", U / "docs" / "agent" / "CURRENT.md", U / "uat" / "checklist.yaml"] + sorted((U / "docs").glob("*.md"))
    texts += [p for p in (U / "bin").glob("*") if p.is_file()] + sorted((U / ".github").rglob("*.y*ml"))
    tdot = U.parent / "T.Dot"
    if tdot.exists():
        texts += [p for p in tdot.rglob("*") if p.is_file() and p.suffix in ("", ".sh", ".py", ".md", ".yaml", ".ps1") and ".git" not in p.parts]
    for p in texts:
        try:
            corpus.append(re.sub(r"(?m)^\.PHONY:.*(?:\\\n.*)*", "", p.read_text(encoding="utf-8", errors="replace")))
        except OSError:
            pass
    root = (U / "Makefile").read_text(encoding="utf-8")
    root = re.sub(r"(?m)^\.PHONY:.*(?:\\\n.*)*", "", root)  # .PHONY names every target: not a call
    root_wo_defs = re.sub(r"(?m)^([\w./-]+(?:\s+[\w./-]+)*)\s*:(?!=)", "", root)
    corpus.append(root_wo_defs)
    blob = "\n".join(corpus)
    dead = sorted(t for t in defined if "/" not in t and "." not in t and not re.search(r"(?<![\w-])" + re.escape(t) + r"(?![\w-])", blob))
    for t in dead:
        print(f"  {t}")
    print(f"usc make --dead: {len(dead)} of {len(defined)} root targets named nowhere but their own rule")
    return 0


REPOS = ["U", "Dist", "T", "T.Ops", "T.Dot", "U.Dot", "U.Ops", ".github"]
RESERVED = re.compile(r"(?i)^(CON|PRN|AUX|NUL|COM\d|LPT\d)(\..*)?$")


def git_findings() -> list[str]:
    """Sherlock on git (ISS-139): in every repo, a tracked text file with CRLF in the index or the working copy
    (`git ls-files --eol`), a repo without `* text=auto eol=lf`, and a file or folder with a Windows reserved name or
    an option-like name (`-p`) anywhere in the working tree. Me (beside U) is included."""
    import subprocess
    out = []
    roots = [U.parent / r for r in REPOS] + [U.parent.parent / "Me"]
    for root in roots:
        if not (root / ".git").exists():
            continue
        ga = root / ".gitattributes"
        if not ga.exists() or "eol=lf" not in ga.read_text(encoding="utf-8", errors="replace"):
            out.append(f"{root.as_posix()}/.gitattributes:1: error: no `* text=auto eol=lf` (LF everywhere)")
        r = subprocess.run(["git", "-C", str(root), "ls-files", "--eol"], capture_output=True, text=True, encoding="utf-8", errors="replace")
        for line in r.stdout.split("\n"):
            m = re.match(r"i/(\S+)\s+w/(\S+)\s+attr/(.*?)\t(.+)$", line)
            if m and ("crlf" in (m[1], m[2])) and "-text" not in m[3]:
                where = "index" if m[1] == "crlf" else "working copy"
                out.append(f"{(root / m[4]).as_posix()}:1: error: CRLF in the {where} (LF everywhere; refresh: delete it, git checkout -- it)")
        for p in root.rglob("*"):
            if ".git" in p.parts or "node_modules" in p.parts or ".lake" in p.parts:
                continue
            if RESERVED.match(p.name) or p.name.startswith("-"):
                out.append(f"{p.as_posix()}:1: warning: a stray name (a Windows device name or an option): remove it")
    return out


def git_check() -> int:
    found = git_findings()
    for x in found:
        print(x)
    print(f"usc git: {sum(': error:' in x for x in found)} errors, {sum(': warning:' in x for x in found)} warnings in the repos")
    return 1 if any(": error:" in x for x in found) else 0


def _issues_at(rev: str) -> dict:
    import subprocess
    text = subprocess.run(["git", "show", f"{rev}:ISSUES.md"], cwd=U, capture_output=True, text=True,
                          encoding="utf-8", errors="replace").stdout
    out = {}
    parts = re.split(r"(?m)^## (ISS-\d+): (.*?) — (\S[^\n]*)$", text)
    for k in range(1, len(parts) - 3, 4):
        body = parts[k + 3]
        out[parts[k]] = {"title": parts[k + 1].strip(), "status": parts[k + 2].strip(),
                         "open": len(re.findall(r"(?m)^\s*- \[ \]", body)), "done": len(re.findall(r"(?m)^\s*- \[x\]", body))}
    return out


def whats_new(rev1: str, rev2: str = "HEAD") -> int:
    """Before and after (ISS-140): the issues model at two commits or tags, compared. The models are generated, not
    stored, but their sources are in git, so any two versions can be compared without keeping snapshots."""
    a, b = _issues_at(rev1), _issues_at(rev2)
    new = [i for i in b if i not in a]
    closed = [i for i in b if i in a and b[i]["status"].startswith("CLOSED") and not a[i]["status"].startswith("CLOSED")]
    moved = [i for i in b if i in a and b[i]["status"] != a[i]["status"] and i not in closed]
    ticked = sum(max(0, b[i]["done"] - a[i]["done"]) for i in b if i in a) + sum(b[i]["done"] for i in new)
    added = sum(max(0, (b[i]["open"] + b[i]["done"]) - (a[i]["open"] + a[i]["done"])) for i in b if i in a) + sum(b[i]["open"] + b[i]["done"] for i in new)
    print(f"What's new, {rev1} to {rev2}:")
    print(f"  {len(new)} issues opened" + "".join(f"\n    {i}: {b[i]['title'][:90]} ({b[i]['status']})" for i in new))
    print(f"  {len(closed)} closed" + "".join(f"\n    {i}: {b[i]['title'][:90]}" for i in closed))
    print(f"  {len(moved)} changed status" + "".join(f"\n    {i}: {a[i]['status']} -> {b[i]['status']}" for i in moved))
    print(f"  {added} boxes added, {ticked} ticked")
    _chats_new(rev1, rev2)
    return 0


def _routes_at(me_rev: str) -> dict:
    """Every thread's disposition in Me's affidavits at a commit of Me."""
    import subprocess
    import yaml
    me = U.parent.parent / "Me"
    names = subprocess.run(["git", "-C", str(me), "ls-tree", "-r", "--name-only", me_rev, "chats/affidavits"],
                           capture_output=True, text=True, encoding="utf-8").stdout.split()
    out = {}
    for n in names:
        if not n.endswith(".aff"):
            continue
        text = subprocess.run(["git", "-C", str(me), "show", f"{me_rev}:{n}"], capture_output=True, text=True,
                              encoding="utf-8", errors="replace").stdout
        try:
            aff = yaml.safe_load(text) or {}
        except yaml.YAMLError:
            continue
        for t in aff.get("threads") or []:
            out[(Path(n).stem, t.get("id"))] = t.get("disposition", "untriaged")
    return out


def _chats_new(rev1: str, rev2: str) -> None:
    """The chats' side of what's new (ISS-140): Me's commit as of each U commit's date, the routes compared."""
    import collections
    import subprocess
    me = U.parent.parent / "Me"
    def me_at(rev):
        when = subprocess.run(["git", "log", "-1", "--format=%cI", rev], cwd=U, capture_output=True, text=True).stdout.strip()
        return subprocess.run(["git", "-C", str(me), "rev-list", "-1", f"--before={when}", "HEAD"],
                              capture_output=True, text=True).stdout.strip()
    a, b = me_at(rev1), me_at(rev2)
    if not (a and b):
        return
    ra, rb = _routes_at(a), _routes_at(b)
    new_threads = [k for k in rb if k not in ra]
    moved = collections.Counter(rb[k] for k in rb if k in ra and ra[k] == "untriaged" and rb[k] != "untriaged")
    fates = collections.Counter(rb[k] for k in new_threads)
    print(f"  chats (Me {a[:7]} to {b[:7]}): {len(new_threads)} threads recorded ("
          + ", ".join(f"{v} {k}" for k, v in fates.most_common()) + f"); {sum(moved.values())} earlier threads routed"
          + (" (" + ", ".join(f"{v} {k}" for k, v in moved.most_common()) + ")" if moved else ""))


def main() -> int:
    if len(sys.argv) >= 3 and sys.argv[1] == "recall" and sys.argv[2] == "--text":
        return recall_text(sys.argv[3:])
    if len(sys.argv) >= 2 and sys.argv[1] == "recall":
        return recall(sys.argv[2:])
    if len(sys.argv) >= 3 and sys.argv[1] == "make" and sys.argv[2] == "--dead":
        return make_dead()
    if len(sys.argv) >= 3 and sys.argv[1] == "make" and sys.argv[2] == "--stale":
        return make_stale()
    if len(sys.argv) >= 2 and sys.argv[1] == "make":
        return make_check()
    if len(sys.argv) >= 3 and sys.argv[1] == "new":
        return whats_new(sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else "HEAD")
    if len(sys.argv) >= 2 and sys.argv[1] == "git":
        return git_check()
    if len(sys.argv) >= 2 and sys.argv[1] == "coverage":
        return coverage()
    if len(sys.argv) >= 2 and sys.argv[1] == "board":
        if len(sys.argv) >= 3 and sys.argv[2] == "--apply":
            return board_apply(sys.argv[3] if len(sys.argv) > 3 else "")
        return board(sys.argv[2] if len(sys.argv) > 2 else "")
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
