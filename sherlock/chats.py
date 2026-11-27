#!/usr/bin/env python3
"""Sherlock's chats: each chat as a Lean model (the Universal Semantic Compiler, iteration 1).

The design is the author's, in his AI Mode chats of 20-26 Nov 2026 (Me/chats): a chat is one
realised path through his prompts; the threads it opens are kept with what became of each, and
a chat is triaged when every thread is routed (implemented, queued, parked, discarded). The LLM
pass (the coding agent) reads a chat and writes its affidavit, Me/chats/affidavits/<chat>.aff
(YAML; the concepts it may name are in Me/chats/affidavits/concepts.yaml). This script parses
the chat and compiles the chat and its affidavit into one Lean module (Chat/Basic.lean), so the
chats are queried in Lean (Chat/Query.lean) instead of grepped.

    python sherlock/chats.py parse FILE ...     # the prompts and offers found, as JSON
    python sherlock/chats.py lean [FILE ...]    # -> bld/sherlock/lean/Chats/*.lean and Chats.lean
    python sherlock/chats.py todo [FILE ...]    # the chats with no affidavit yet
    python sherlock/chats.py triage             # fishing: errors (witnesses that do not hold), warnings
                                                # (possible witnesses, loose ends), links -> Me/chats/triage.md
    python sherlock/chats.py route STAMP THREAD DISPOSITION [REF]   # the author's triage of a thread
        (STAMP: the chat's time stamp, e.g. 20261126_140957; DISPOSITION: implemented REF (a path or
        commit), queued REF (ISS-NNN), parked, discarded REF (the reason), untriaged)
    python sherlock/chats.py issues             # U's ISSUES.md as Lean (bld/sherlock/lean/Issues.lean)
    python sherlock/chats.py ideas [--grep WORD] [--by kind|product|date]
                                                # what the chats leave behind, by kind -> Me/chats/ideas.md;
                                                # with --grep or --by, searched and printed instead
    python sherlock/chats.py tag                # a {{usc:...}} tag in the original for every routed thread
    python sherlock/chats.py chronicle          # The Evolution's data, month by month -> bld/sherlock/chronicle.json

FILE defaults to every chat in Me/chats/Inbox and Me/chats/phase-dot. The chats are private: the generated modules are
built in bld/ (ignored) and never committed.
"""
from __future__ import annotations

import argparse
import html
import json
import re
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
ME = U.parent.parent / "Me"
INBOX = ME / "chats" / "Inbox"
# Phase Dot's conversations (April-May 2026), split from the book (Me/chats/scripts/split_phasedot.py): a second
# source of chats beside the Inbox, read by every tool here but never by Phase Dot 2's collation (ISS-133).
PHASEDOT = ME / "chats" / "phase-dot"
AFF = ME / "chats" / "affidavits"
OUT = U / "bld" / "sherlock" / "lean"
AFF_PD = ME / "chats" / "affidavits" / "phase-dot"


def aff_for(chat_file: Path) -> Path:
    """A chat's affidavit: Me/chats/affidavits/<stem>.aff, or affidavits/phase-dot/<stem>.aff."""
    return (AFF_PD if chat_file.parent == PHASEDOT else AFF) / (chat_file.stem + ".aff")


def chat_for(aff: Path) -> Path:
    return (PHASEDOT if aff.parent == AFF_PD else INBOX) / (aff.stem + ".md")


def all_affs() -> list[Path]:
    return sorted(AFF.glob("*.aff")) + sorted(AFF_PD.glob("*.aff"))


def stamp_of(stem: str) -> str:
    """The chat's stamp: 20261126_140957 for an export, 20260428_03 for a Phase Dot conversation."""
    m = re.match(r"\d{8}_\d+", stem)
    return m[0] if m else stem[:15]

ENTRY = re.compile(r"^## Author \(([^)]+)\)[ \t]*$", re.M)
TURN = re.compile(r"^## (Author|User|Assistant)\b(.*)$", re.M)  # User: Copilot's export ("## User - <time>")
NLM_TURN = re.compile(r"^(USER|MODEL):[ \t]*", re.M)            # an older NotebookLM history
STAMP = re.compile(r"(\d{4}-\d\d-\d\dT\d\d:\d\d(?::\d\d)?(?:\.\d+)?Z?|\d{4}-\d\d-\d\d \d\d:\d\d)")
# A prompt holding Markdown is exported under a heading: "### **Your prompt:**".
PROMPT = re.compile(r"^(?:#+[ \t]*)?\*\*Your prompt:\*\*[ \t]*$", re.M)
RESPONSE = re.compile(r"^(?:#+[ \t]*)?\*\*Search(?:'|&#39;)s response:\*\*[ \t]*$", re.M)
PASTED_DATE = re.compile(r"^(\d{1,2} (?:January|February|March|April|May|June|July|August|September|October|November|"
                         r"December) 20\d\d)[ \t]*$", re.M)
ACTION = re.compile(r'<ActionUnit query="([^"]*)"')
STATUS = {"pursued": ".pursued", "deferred": ".deferred", "drifted": ".drifted", "unexplored_fork": ".unexploredFork"}
DISPOSITIONS = ("implemented", "queued", "parked", "discarded", "untriaged")


from usctags import OWN_LINE, TAG  # noqa: E402


def header(text: str) -> dict:
    m = re.match(r"\A---\n(.*?)\n---\n", text, re.S)
    found = {}
    for line in (m.group(1).splitlines() if m else []):
        k, _, v = line.partition(":")
        v = v.strip()
        if v.startswith('"'):
            try:
                v = json.loads(v)
            except json.JSONDecodeError:
                v = v.strip('"')
        found[k.strip()] = v
    return found


def clean(s: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def parse(path: Path) -> dict:
    """The author's prompts (in order, repeats dropped) and the assistant's offered follow-ups."""
    text = path.read_text(encoding="utf-8", errors="replace").replace("\r\n", "\n")  # a few old exports are not UTF-8
    # The author's {{usc:...}} tags (usc_tags.ebnf) are not prose: dropped in place, so lines keep their numbers.
    text = OWN_LINE.sub(lambda m: TAG.sub("", m[0]), text)
    head = header(text)
    prompts: list[dict] = []
    index: dict[str, int] = {}
    offers: list[dict] = []

    def line(pos: int) -> int:
        return text.count("\n", 0, pos) + 1

    def add(body: str, time: str, pos: int) -> int:
        body = clean(body)
        if not body:
            return 0
        if body not in index:
            prompts.append({"index": len(prompts) + 1, "time": time, "line": line(pos), "text": body})
            index[body] = len(prompts)
        return index[body]

    if PROMPT.search(text):
        # AI Mode: each activity entry holds the thread so far; its prompts are inside the answer.
        entries = list(ENTRY.finditer(text))
        for i, e in enumerate(entries):
            start, end = e.end(), entries[i + 1].start() if i + 1 < len(entries) else len(text)
            seg = text[start:end]
            inner = list(PROMPT.finditer(seg))
            if not inner:
                a = TURN.search(seg)
                add(seg[: a.start() if a else len(seg)], e.group(1), start)
            for j, p in enumerate(inner):
                r = RESPONSE.search(seg, p.end())
                nxt = inner[j + 1].start() if j + 1 < len(inner) else len(seg)
                k = add(seg[p.end(): r.start() if r and r.start() < nxt else nxt], e.group(1), start + p.start())
                for q in ACTION.findall(seg[(r.end() if r else p.end()): nxt]):
                    q = clean(q)
                    if k and not any(o["after"] == k and o["text"] == q for o in offers):
                        offers.append({"after": k, "text": q})
    elif text.startswith("<!-- Phase Dot"):
        # Phase Dot's conversations (Me/chats/phase-dot; ISS-133): Google's activity, pasted. A prompt is the line
        # just before a bare date line ("28 April 2026"); the answer follows the date.
        for m in PASTED_DATE.finditer(text):
            before = text[:m.start()].rstrip("\n")
            cut = before.rfind("\n") + 1
            add(before[cut:], m.group(1), cut)
    else:
        # One turn per heading (VS Code, Copilot, NotebookLM) or per USER:/MODEL: line; the brainstorm
        # dumps have no speakers, so no prompts (their affidavits are read from the text).
        # USER:/MODEL: only where no heading marks the author (answers quote old chats, USER: and all).
        marks = [(t.start(), t.end(), t.group(1) in ("Author", "User"), t.group(2)) for t in TURN.finditer(text)]
        if not any(m[2] for m in marks):
            marks = sorted(marks + [(t.start(), t.end(), t.group(1) == "USER", "") for t in NLM_TURN.finditer(text)])
        for i, (start, end, author, rest) in enumerate(marks):
            if author:
                stop = marks[i + 1][0] if i + 1 < len(marks) else len(text)
                when = STAMP.search(rest or "")
                add(text[end: stop], when.group(1) if when else "", start)
    return {"file": path.name, "path": str(path), "date": str(head.get("date", "")), "source": str(head.get("source", "")),
            "account": str(head.get("account", "")), "title": str(head.get("title", "")),
            "prompts": prompts, "offers": offers}


def vocabulary() -> set[str]:
    path = AFF / "concepts.yaml"
    return set((yaml.safe_load(path.read_text(encoding="utf-8")) or {}).get("concepts", {})) if path.exists() else set()


def affidavit(chat: dict, vocab: set[str]) -> tuple[dict | None, list[str]]:
    path = aff_for(Path(chat["path"]))
    if not path.exists():
        return None, []
    try:
        aff = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    except yaml.YAMLError as error:
        return None, [f"{path.name}: not YAML ({str(error).splitlines()[0]})"]
    problems = []
    names = list(aff.get("concepts") or []) + [c for t in aff.get("threads") or [] for c in t.get("concepts") or []]
    problems += [f"{path.name}: unknown concept {c!r} (add it to concepts.yaml)" for c in dict.fromkeys(names) if c not in vocab]
    for t in aff.get("threads") or []:
        if t.get("status") not in STATUS:
            problems.append(f"{path.name}: thread {t.get('id')}: status {t.get('status')!r}")
        if t.get("disposition") not in DISPOSITIONS:
            problems.append(f"{path.name}: thread {t.get('id')}: disposition {t.get('disposition')!r}")
        bad = [n for n in t.get("prompts") or [] if not 1 <= n <= len(chat["prompts"])]
        if bad:
            problems.append(f"{path.name}: thread {t.get('id')}: no prompt {bad}")
    return aff, problems


def s(x: str) -> str:
    x = "".join(ch for ch in str(x) if ch >= " " or ch in "\n\t")
    return '"' + x.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n").replace("\t", "\\t") + '"'


def strs(xs) -> str:
    return "[" + ", ".join(s(x) for x in xs or []) + "]"


def disposition(t: dict) -> str:
    d, ref = t.get("disposition", "untriaged"), t.get("ref", "")
    return {"implemented": f"(.implemented {s(ref)})", "queued": f"(.queued {s(ref)})",
            "discarded": f"(.discarded {s(ref)})", "parked": ".parked"}.get(d, ".untriaged")


def module_name(file: str, taken: set[str]) -> str:
    base = "C" + re.sub(r"\W", "_", file[:15])
    name, n = base, 1
    while name in taken:
        n += 1
        name = f"{base}_{n}"
    taken.add(name)
    return name


def lean_module(name: str, chat: dict, aff: dict | None) -> str:
    aff = aff or {}
    L = ["import Chat.Basic", "", f"/-! Generated by sherlock/chats.py from `{chat['file']}` (private; never commit). -/",
         f"namespace Chats.{name}", ""]
    # Long chats (over a thousand prompts) exceed Lean's recursion depth as one list literal: chunks of 100.
    chunks = [chat["prompts"][i:i + 100] for i in range(0, len(chat["prompts"]), 100)] or [[]]
    for k, chunk in enumerate(chunks):
        L += [f"def prompts{k} : List Chat.Prompt := ["]
        L += [f"  {{ index := {p['index']}, time := {s(p['time'])}, line := {p['line']}, text := {s(p['text'])} }}"
              + ("," if i < len(chunk) - 1 else "") for i, p in enumerate(chunk)]
        L += ["]", ""]
    L += ["def chat : Chat.Chat where",
         f"  file := {s(chat['file'])}", f"  date := {s(chat['date'])}", f"  source := {s(chat['source'])}",
         f"  account := {s(chat['account'])}", f"  summary := {s(aff.get('summary', ''))}",
         f"  concepts := {strs(aff.get('concepts'))}",
         "  prompts := " + " ++ ".join(f"prompts{k}" for k in range(len(chunks)))]
    L += ["  offers := ["]
    L += [f"    {{ after := {o['after']}, text := {s(o['text'])} }}" + ("," if i < len(chat["offers"]) - 1 else "")
          for i, o in enumerate(chat["offers"])]
    L += ["  ]", "  threads := ["]
    ts = aff.get("threads") or []
    L += [f"    {{ id := {s(t.get('id', ''))}, topic := {s(t.get('topic', ''))}, status := {STATUS.get(t.get('status'), '.pursued')},"
          f" prompts := {list(t.get('prompts') or [])}, disposition := {disposition(t)}, concepts := {strs(t.get('concepts'))} }}"
          + ("," if i < len(ts) - 1 else "") for i, t in enumerate(ts)]
    L += ["  ]", f"  read := {'true' if aff else 'false'}", "", f"end Chats.{name}", ""]
    return "\n".join(L)


def route(stamp: str, thread: str, disposition: str, ref: str) -> int:
    """Set one thread's disposition in a chat's affidavit (the line is edited, the rest kept)."""
    affs = sorted(AFF.glob(f"{stamp}*.aff")) + sorted(AFF_PD.glob(f"{stamp}*.aff"))
    if len(affs) != 1:
        print(f"route: {len(affs)} affidavits match {stamp!r}")
        return 1
    if disposition not in DISPOSITIONS:
        print(f"route: disposition must be one of {', '.join(DISPOSITIONS)}")
        return 1
    if disposition in ("implemented", "queued", "discarded") and not ref:
        print(f"route: {disposition} needs a REF (a path or commit, ISS-NNN, or the reason)")
        return 1
    path = affs[0]
    lines = path.read_text(encoding="utf-8").splitlines()
    hits = [i for i, l in enumerate(lines) if re.search(r"\{id: " + re.escape(thread) + r",", l)]
    if len(hits) != 1:
        print(f"route: {path.name} has no thread {thread!r}; threads: "
              + ", ".join(re.findall(r"\{id: ([\w-]+),", "\n".join(lines))))
        return 1
    line = re.sub(r', ref: "(?:[^"\\]|\\.)*"', "", lines[hits[0]])
    line = re.sub(r"disposition: \w+", f"disposition: {disposition}" + (f", ref: {json.dumps(ref, ensure_ascii=False)}" if ref else ""), line)
    lines[hits[0]] = line
    path.write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    print(f"{path.name}: {thread} -> {disposition}" + (f" ({ref})" if ref else ""))
    return 0


STOP = set("""the and for with from that this into over what when where which their there then than them they have has had
not but are was were its his her him our your you all any can could would should will about after before between through
under also only just more most other such some very each every both same one two three how why who whose does done like
""".split())
REPOS = [U, U.parent / "T", U.parent / "T.Ops", U.parent / "T.Dot", U.parent / "U.Dot", U.parent / "Dist", ME]


def words(text: str) -> list[str]:
    return [w for w in re.findall(r"[a-z][a-z0-9-]{2,}", text.lower()) if w not in STOP]


def issues() -> dict[str, dict]:
    """U's issues: id -> title, status and words (title weighted three times)."""
    text = (U / "ISSUES.md").read_text(encoding="utf-8")
    found = {}
    parts = re.split(r"(?m)^## (ISS-\d+): (.*?) — (\w[\w-]*(?: \([^)]*\))?)\s*$", text)
    for i in range(1, len(parts) - 3, 4):
        iid, title, status, body = parts[i], parts[i + 1], parts[i + 2], parts[i + 3]
        found[iid] = {"title": title, "status": status, "words": words(title) * 3 + words(body[:4000])}
    return found


def witness_holds(ref: str) -> bool:
    """A ref is a witness if some part of it exists: an issue, a commit or tag, a path in a repo."""
    import subprocess
    known = issues()
    for token in re.findall(r"ISS-\d+", ref):
        if token in known:
            return True
    for token in re.findall(r"\b[0-9a-f]{7,40}\b", ref):
        for repo in REPOS:
            if (repo / ".git").exists() and subprocess.run(["git", "-C", str(repo), "cat-file", "-e", token + "^{commit}"],
                                                           capture_output=True).returncode == 0:
                return True
    for token in re.findall(r"tag ([\w.-]+)", ref):
        for repo in REPOS:
            if (repo / ".git").exists() and subprocess.run(["git", "-C", str(repo), "rev-parse", "-q", "--verify", f"refs/tags/{token}"],
                                                           capture_output=True).returncode == 0:
                return True
    for token in re.findall(r"[\w.-]+/[\w./-]+", ref):
        if any((repo / token).exists() for repo in REPOS):
            return True
    for token in re.findall(r"(?<![/\w])[\w-]+\.(?:md|py|lean|yaml|json|lua|js)\b", ref):  # a file at a repo's root
        if any((repo / token).is_file() for repo in REPOS):
            return True
    return False


def triage() -> int:
    """Go fishing: errors first (a witness that does not hold), then warnings (an untriaged thread that looks
    like an issue: a possible witness; a loose end no issue covers), then links (one idea in several chats).
    Suggestions only: nothing is routed (the author routes, `route`). Report: Me/chats/triage.md."""
    import math
    from collections import Counter
    known = issues()
    threads = []
    for path in all_affs():
        lines = path.read_text(encoding="utf-8").splitlines()
        aff = yaml.safe_load("\n".join(lines)) or {}
        for t in aff.get("threads") or []:
            line = next((i + 1 for i, l in enumerate(lines) if re.search(r"\{id: " + re.escape(str(t.get("id"))) + ",", l)), 1)
            threads.append({"aff": path, "line": line, "stamp": stamp_of(path.stem), **t,
                            "words": words(t.get("topic", "")) + [c.lower() for c in t.get("concepts") or []]})
    docs = [t["words"] for t in threads] + [i["words"] for i in known.values()]
    df = Counter(w for d in docs for w in set(d))
    n = len(docs)

    def vec(ws):
        tf = Counter(ws)
        v = {w: c * math.log(n / df[w]) for w, c in tf.items() if df[w]}
        norm = math.sqrt(sum(x * x for x in v.values())) or 1.0
        return {w: x / norm for w, x in v.items()}

    def cos(a, b):
        return sum(x * b.get(w, 0.0) for w, x in a.items())

    ivec = {iid: vec(i["words"]) for iid, i in known.items()}
    for t in threads:
        t["vec"] = vec(t["words"])
    errors, warnings, loose = [], [], []
    for t in threads:
        where = f"{t['aff'].name}:{t['line']}"
        disp, ref = t.get("disposition", "untriaged"), str(t.get("ref", ""))
        if disp in ("implemented", "queued") and not witness_holds(ref):
            errors.append(f"{where}: error: {t['id']}: {disp}, but the witness does not hold: {ref!r}")
        for iid in re.findall(r"ISS-\d+", ref):
            if disp == "queued" and iid in known and known[iid]["status"] == "CLOSED":
                warnings.append(f"{where}: warning: {t['id']}: queued on {iid}, which is CLOSED: implemented now?")
        if disp != "untriaged":
            continue
        best = sorted(((cos(t["vec"], v), iid) for iid, v in ivec.items()), reverse=True)[:2]
        if best and best[0][0] >= 0.25:
            score, iid = best[0]
            guess = "implemented" if known[iid]["status"] == "CLOSED" else "queued"
            warnings.append(f"{where}: warning: {t['id']}: untriaged; witness? {iid} ({known[iid]['status']}, {score:.2f}) "
                            f"\"{known[iid]['title'][:70]}\" -> {guess} {iid}")
        elif t.get("status") in ("unexplored_fork", "deferred"):
            loose.append(f"{where}: warning: {t['id']}: a loose end no issue covers ({t['status']}): {t.get('topic', '')[:90]}")
    # links: the same idea in several chats
    links, seen = [], set()
    for i, a in enumerate(threads):
        if i in seen:
            continue
        group = [j for j in range(i + 1, len(threads)) if j not in seen and threads[j]["stamp"] != a["stamp"]
                 and cos(a["vec"], threads[j]["vec"]) >= 0.45]
        if len(group) >= 1:
            seen.update(group)
            links.append([a] + [threads[j] for j in group])
    # The chats stay alive (author, 27 Nov): an idea decided in one chat decides its twin in another, so an
    # untriaged twin of a routed thread is flagged with the decision it may share.
    for g in links:
        decided = [t for t in g if t.get("disposition", "untriaged") != "untriaged"
                   and not str(t.get("ref", "")).startswith("duplicate of")]
        for t in g:
            if t.get("disposition", "untriaged") == "untriaged" and decided:
                d = decided[0]
                warnings.append(f"{t['aff'].name}:{t['line']}: warning: {t['id']}: the same idea as {d['stamp']} {d['id']}, "
                                f"{d['disposition']} {d.get('ref', '')}: the same here?")
    out = ["# Chat triage (fishing)", "", f"Generated by `python sherlock/chats.py triage` from {len(threads)} threads and "
           f"{len(known)} issues. Suggestions only: the author routes (`chats.py route`).", "",
           f"## Errors ({len(errors)}): a witness that does not hold", ""] + [f"- {e}" for e in errors] + [
           "", f"## Warnings ({len(warnings)}): an untriaged thread that looks like an issue, or a twin of a decided one", ""] + [f"- {w}" for w in warnings] + [
           "", f"## Loose ends ({len(loose)}): deferred or unexplored, and no issue covers them", ""] + [f"- {w}" for w in loose] + [
           "", f"## Links ({len(links)}): one idea in several chats", ""]
    for g in sorted(links, key=len, reverse=True):
        out.append(f"- {len(g)} chats: " + "; ".join(f"{t['stamp']} {t['id']}" for t in g))
    (ME / "chats" / "triage.md").write_text("\n".join(out) + "\n", encoding="utf-8", newline="\n")
    for e in errors:
        print(e)
    print(f"triage: {len(errors)} errors, {len(warnings)} possible witnesses, {len(loose)} loose ends, "
          f"{len(links)} links -> {ME / 'chats' / 'triage.md'}")
    return 1 if errors else 0


ISTATUS = {"OPEN": ".open_", "IN-PROGRESS": ".inProgress", "SOMEDAY": ".someday", "PARKED": ".parked", "CLOSED": ".closed"}
BOX = {"x": ".done", "-": ".dropped", " ": ".empty"}


def issues_lean() -> int:
    """ISSUES.md as Lean (bld/sherlock/lean/Issues.lean): the issues, their boxes and the tag vocabulary."""
    lines = (U / "ISSUES.md").read_text(encoding="utf-8").splitlines()
    vocab = next((l.split(":", 1)[1] for l in lines[:10] if l.startswith("tags:")), "")
    vocab = [v.strip() for v in vocab.split(",") if v.strip()]
    head = re.compile(r"^## ISS-(\d+): (.*?) — (\w[\w-]*)(?: \(([^)]*)\))?\s*$")
    item = re.compile(r"^(\s*)- \[([ x-])\] (.*)$")
    found, cur, it = [], None, None
    for n, l in enumerate(lines, 1):
        m = head.match(l)
        if m:
            cur = {"id": int(m[1]), "title": m[2], "status": m[3], "trigger": m[4] or "", "line": n,
                   "tags": [], "fields": {}, "items": [], "refs": set()}
            found.append(cur)
            it = None
            continue
        if cur is None:
            continue
        cur["refs"].update(int(r) for r in re.findall(r"ISS-(\d+)", l))
        if l.startswith("{{Tags "):
            cur["tags"] = [x.strip() for x in l[7:].rstrip("}").split(",") if x.strip()]
        elif l.startswith("{{Fields "):
            cur["fields"] = dict(kv.strip().split("=", 1) for kv in l[9:].rstrip("}").split(",") if "=" in kv)
        elif (m := item.match(l)):
            body = m[3]
            note = ""
            if (q := re.match(r"\(([^)]*)\)\s*", body)):
                note, body = q[1], body[q.end():]
            it = {"box": BOX[m[2]], "indent": len(m[1]), "note": note, "line": n, "text": body}
            cur["items"].append(it)
        elif it and l.strip() and len(l) - len(l.lstrip()) > it["indent"] and not l.lstrip().startswith(("- ", "#")):
            it["text"] += " " + l.strip()
        else:
            it = None
    out = ["import Issue.Basic", "", "/-! Generated by sherlock/chats.py from ISSUES.md (`make -C sherlock issues`). -/",
           "", "namespace Issues", "", "open Issue", "", f"def vocabulary : List String := {strs(vocab)}", ""]
    for i in found:
        st = f"(.onHold {s(i['trigger'])})" if i["status"] == "ON-HOLD" else ISTATUS.get(i["status"], ".open_")
        f = i["fields"]
        out += [f"def iss{i['id']:03d} : Issue where", f"  id := {i['id']}", f"  title := {s(i['title'])}",
                f"  status := {st}", f"  tags := {strs(i['tags'])}", f"  created := {s(f.get('date.created', ''))}",
                f"  start := {s(f.get('date.start', ''))}", f"  end_ := {s(f.get('date.end', ''))}",
                f"  epic := {s(f.get('epic', ''))}", f"  line := {i['line']}",
                f"  refs := {sorted(i['refs'] - {i['id']})}", "  items := ["]
        out += [f"    {{ box := {x['box']}, author := {'true' if re.match(r"(AUTHOR\b|Author:)", x['text'].lstrip()) else 'false'},"
                f" note := {s(x['note'])}, line := {x['line']}, text := {s(x['text'][:400])} }}"
                + ("," if k < len(i["items"]) - 1 else "") for k, x in enumerate(i["items"])]
        out += ["  ]", ""]
    out += ["def all : List Issue := ["] + [f"  iss{i['id']:03d}" + ("," if k < len(found) - 1 else "") for k, i in enumerate(found)]
    out += ["]", "", "end Issues", ""]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "Issues.lean").write_text("\n".join(out), encoding="utf-8", newline="\n")
    print(f"issues: {len(found)} issues, {sum(len(i['items']) for i in found)} boxes -> {OUT / 'Issues.lean'}")
    return 0


# The products (T.Ops naming standard): which concepts belong to which. Private concepts are counted, never listed.
PRODUCTS = {
    "USC": {"USC", "Sherlock", "MTC", "Moriarty", "SheerLuck", "UscTags", "EpistemicGrades", "ChatModel", "ChatTriage",
            "LeanModelOfDocument", "CombineModels", "TTheoryCore", "Einstein", "EinsteinBacktest", "NextKB", "OpenCyc",
            "OpenCycInLean", "Equations", "Lake", "NotebookLM", "PeerReview", "VSCodePlugin", "ChatWorkflow", "Neovim"},
    "USM": {"SomaMachine", "Televator", "VisualAudit", "Music", "HAL", "UAT"},
    "USF": {"TTheory", "Physics", "Philosophy", "Clinical", "Teaching", "History"},
    "Ops": {"Publishing", "Copyright", "Hardware", "Engineering"},
}
PRIVATE = {"Personal", "Health", "Finance", "Politics"}


def ideas(by: str = "", grep: str = "") -> int:
    """What the chats leave behind, classified (Me/chats/ideas.md), or searched (--by, --grep: printed).

    Kinds: loose ends (a fork not taken, an idea deferred), drift (an offer left), pursued but not yet routed,
    and the {{usc:...}} tags in the originals that are not yet triaged. Every untriaged thread is listed once,
    with its product, date, chat and prompts; route it (`chats.py route`) and it leaves the list."""
    import yaml
    from usctags import files as tag_files, scan as tag_scan
    KIND = {"unexplored_fork": "Loose ends", "deferred": "Loose ends", "drifted": "Drift", "pursued": "Pursued, not yet routed"}
    rows, private = [], 0
    for path in sorted(all_affs(), key=lambda a: a.stem, reverse=True):
        aff = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        for th in aff.get("threads") or []:
            if th.get("disposition", "untriaged") != "untriaged":
                continue
            own = set(th.get("concepts") or [])
            cs = own | set(aff.get("concepts") or [])
            if own & PRIVATE or not (cs - PRIVATE):
                private += 1
                continue
            product = next((k for k, v in PRODUCTS.items() if own & v), None) or next(
                (k for k, v in PRODUCTS.items() if cs & v), "Ops")
            ps = th.get("prompts") or []
            span = f"{ps[0]}-{ps[-1]}" if len(ps) > 1 else (str(ps[0]) if ps else "-")
            rows.append({"kind": KIND.get(th.get("status"), "Pursued, not yet routed"), "product": product,
                         "date": f"{path.stem[:4]}-{path.stem[4:6]}-{path.stem[6:8]}", "id": th.get("id"),
                         "topic": th.get("topic", "").strip(), "where": f"{stamp_of(path.stem)}, prompts {span}"})
    tags = [tg for f in tag_files([]) for tg in tag_scan(f)
            if tg["kind"] == "begin" and tg["attrs"].get("status") in ("IDEA", "LOOSE_END", "DECISION", "QUESTION")
            and not tg["attrs"].get("disp")]
    line = lambda r: f"- [ ] {r['date']} `{r['id']}` ({r['product']}): {r['topic']} ({r['where']})"
    if by or grep:
        hits = [r for r in rows if not grep or grep.lower() in (r["topic"] + r["id"]).lower()]
        key = {"kind": "kind", "product": "product", "date": "date"}.get(by or "kind", "kind")
        for k in sorted({r[key] for r in hits}, reverse=(key == "date")):
            group = [r for r in hits if r[key] == k]
            print(f"## {k} ({len(group)})")
            print("\n".join(line(r) for r in group))
        print(f"{len(hits)} of {len(rows)} threads")
        return 0
    out = ["# What the chats leave behind", "",
           "Generated by `python U/sherlock/chats.py ideas` from the affidavits and the tags (never edit by hand: route",
           "the thread, `chats.py route STAMP THREAD DISPOSITION [REF]`, or triage the tag, and it leaves this list).",
           "Search: `chats.py ideas --grep WORD [--by kind|product|date]`.", "",
           f"{len(rows)} untriaged threads ({private} personal ones counted, not listed); {len(tags)} tags not yet triaged.", ""]
    for kind, gloss in (("Loose ends", "a fork not taken, an idea deferred"), ("Drift", "an offer the chat moved past"),
                        ("Pursued, not yet routed", "talked through; is it done, queued, parked or dropped?")):
        group = [r for r in rows if r["kind"] == kind]
        out += [f"## {kind}: {gloss} ({len(group)})", ""]
        for prod in ("USF", "USC", "USM", "Ops"):
            sub = [r for r in group if r["product"] == prod]
            if sub:
                out += [f"### {prod} ({len(sub)})", ""] + [line(r) for r in sub] + [""]
    out += [f"## Tagged where it was said, not yet triaged ({len(tags)})", ""]
    out += [f"- [ ] {tg['attrs'].get('status')} `{tg['attrs'].get('id')}`: {tg['attrs'].get('note', '')} "
            f"({tg['file'].name}:{tg['line']})" for tg in tags] or ["(none)"]
    (ME / "chats" / "ideas.md").write_text("\n".join(out) + "\n", encoding="utf-8", newline="\n")
    print(f"ideas: {len(rows)} threads (" + ", ".join(f"{k} {sum(1 for r in rows if r['kind'] == k)}" for k in
          ("Loose ends", "Drift", "Pursued, not yet routed")) + f"; {private} private); {len(tags)} untriaged tags -> {ME / 'chats' / 'ideas.md'}")
    return 0

def chronicle() -> int:
    """The Evolution's and Background's data (ISS-133, ISS-134): every thread of the USF, USM and USC chats, month by
    month, with its concepts and what
    became of it, as JSON for the book's Lua filter (books/T-Theory/filters/chronicle.lua). Public by design
    (author, 27 Nov: "phase dot ... raw ... private ... condensed ... public"): personal threads are counted,
    never listed (PRIVATE, as `ideas`), Ops threads are left out, and nothing is quoted from the chats: a
    thread is its affidavit's topic, its date, its prompts and its disposition."""
    import yaml
    months: dict[str, list] = {}
    private = ops = dupes = 0
    # The chats, and Phase Dot's conversations (Me/chats/affidavits/phase-dot: the origin, April-May 2026).
    sources = [(a, "Phase Dot" if a.parent == AFF_PD else "chat") for a in all_affs()]
    for path, origin in sources:
        if not (stamp := re.match(r"\d{8}_\d+", path.stem)):
            continue
        aff = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        for th in aff.get("threads") or []:
            own = set(th.get("concepts") or [])
            cs = own | set(aff.get("concepts") or [])
            if own & PRIVATE or not (cs - PRIVATE):
                private += 1
                continue
            product = next((k for k, v in PRODUCTS.items() if own & v), None) or next(
                (k for k, v in PRODUCTS.items() if cs & v), "Ops")
            if product == "Ops":
                ops += 1
                continue
            if str(th.get("ref", "")).startswith("duplicate of"):
                dupes += 1
                continue
            ps = th.get("prompts") or []
            d = th.get("disposition", "untriaged")
            ref = ""
            if isinstance(d, dict):
                d, ref = next(iter(d.items()))
            elif isinstance(d, str) and " " in d:
                d, ref = d.split(" ", 1)
            months.setdefault(path.stem[:6], []).append({
                "date": f"{path.stem[:4]}-{path.stem[4:6]}-{path.stem[6:8]}", "chat": stamp[0], "origin": origin,
                "thread": th.get("id", ""), "topic": " ".join(str(th.get("topic", "")).split()),
                "product": product, "status": th.get("status", ""), "disposition": d, "ref": str(ref or th.get("ref", "") or ""),
                "concepts": sorted((own or cs) - PRIVATE), "prompts": [ps[0], ps[-1]] if ps else []})
    data = {"generated_by": "python sherlock/chats.py chronicle", "private_counted": private, "ops_left_out": ops,
            "duplicates_left_out": dupes,
            "months": [{"month": m, "threads": months[m]} for m in sorted(months)]}
    out = U / "bld" / "sherlock" / "chronicle.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8", newline="\n")
    n = sum(len(v) for v in months.values())
    print(f"chronicle: {n} threads in {len(months)} months ({private} personal counted, {ops} Ops and {dupes} duplicates left out) -> {out}")
    return 0


def tag_routed() -> int:
    """Tag the originals from the model: every routed thread gets a {{usc:...}} span around its first prompt,
    with its disposition and ref (ISS-126: "tag the originals, we have git"). Idempotent; a file whose prompts
    would change is left as it was."""
    import yaml
    MARK = re.compile(r"^\s*(?:#+ )?\*\*Your prompt:\*\*|^## (?:User|Author)\b")
    NEXT = re.compile(r"^\s*(?:#+ )?\*\*(?:Your prompt|Search's response):\*\*|^## ")
    done = skipped = 0
    for a in all_affs():
        aff = yaml.safe_load(a.read_text(encoding="utf-8")) or {}
        routed = [th for th in aff.get("threads") or [] if th.get("disposition", "untriaged") != "untriaged" and th.get("prompts")]
        f = chat_for(a)
        if not routed or not f.exists():
            continue
        text = f.read_text(encoding="utf-8")
        before = [(q["index"], q["text"]) for q in parse(f)["prompts"]]
        lines = text.split("\n")
        prompts = {q["index"]: q["line"] for q in parse(f)["prompts"]}
        inserts = []
        for th in routed:
            tid = f"THREAD-{stamp_of(a.stem)}-{th['id']}"
            if f'id="{tid}"' in text or th["prompts"][0] not in prompts:
                continue
            ln = prompts[th["prompts"][0]] - 1
            start = next((j for j in range(ln, -1, -1) if MARK.match(lines[j])), ln)
            end = next((j for j in range(ln + 1, len(lines)) if NEXT.match(lines[j])), len(lines))
            cls = "LOOSE_END" if th.get("status") in ("deferred", "unexplored_fork") else "IDEA"
            attrs = f'id="{tid}" status="{cls}" disp="{th["disposition"]}"'
            if th.get("ref"):
                attrs += f' ref="{str(th["ref"]).replace(chr(34), chr(39))}"'
            attrs += f' note="{str(th.get("topic", "")).replace(chr(34), chr(39))[:120]}"'
            inserts += [(start, "{{usc:begin " + attrs + "}}"), (end, f'{{{{usc:end id="{tid}"}}}}')]
        if not inserts:
            continue
        new = list(lines)
        for pos, tag in sorted(inserts, key=lambda x: x[0], reverse=True):
            new.insert(pos, tag)
        f.write_text("\n".join(new), encoding="utf-8", newline="\n")
        if [(q["index"], q["text"]) for q in parse(f)["prompts"]] != before:
            f.write_text(text, encoding="utf-8", newline="\n")
            skipped += 1
            print(f"  !! {f.name}: the prompts would change; left as it was")
            continue
        done += len(inserts) // 2
    print(f"tag: {done} routed threads tagged in the originals; {skipped} files left as they were")
    return 1 if skipped else 0


def chat_files(given: list[str]) -> list[Path]:
    return [Path(f).resolve() for f in given] if given else sorted(INBOX.glob("*.md")) + sorted(PHASEDOT.glob("*.md"))


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("command", choices=["parse", "lean", "todo", "route", "triage", "issues", "ideas", "tag", "chronicle"])
    ap.add_argument("files", nargs="*")
    ap.add_argument("--by", default="", help="ideas: group the search by kind, product or date")
    ap.add_argument("--grep", default="", help="ideas: only threads whose topic or id contains this")
    a = ap.parse_args()
    if a.command == "triage":
        return triage()
    if a.command == "issues":
        return issues_lean()
    if a.command == "ideas":
        return ideas(a.by, a.grep)
    if a.command == "tag":
        return tag_routed()
    if a.command == "chronicle":
        return chronicle()
    if a.command == "route":
        if len(a.files) not in (3, 4):
            print("usage: chats.py route STAMP THREAD DISPOSITION [REF]")
            return 1
        return route(*a.files[:3], a.files[3] if len(a.files) == 4 else "")
    chats = [parse(f) for f in chat_files(a.files)]
    if a.command == "parse":
        print(json.dumps(chats, ensure_ascii=False, indent=1))
        return 0
    if a.command == "todo":
        for c in chats:
            if not aff_for(Path(c["path"])).exists():
                print(f"{c['file']}  ({len(c['prompts'])} prompts)")
        return 0
    vocab, problems, taken, names = vocabulary(), [], set(), []
    (OUT / "Chats").mkdir(parents=True, exist_ok=True)
    for old in (OUT / "Chats").glob("C*.lean"):
        old.unlink()
    for c in chats:
        aff, p = affidavit(c, vocab)
        problems += p
        name = module_name(c["file"], taken)
        names.append(name)
        (OUT / "Chats" / f"{name}.lean").write_text(lean_module(name, c, aff), encoding="utf-8", newline="\n")
    root = [f"import Chats.{n}" for n in names] + ["", "/-! Every chat, generated by sherlock/chats.py (private; never commit). -/",
            "def Chats.all : List Chat.Chat := ["] + [f"  Chats.{n}.chat" + ("," if i < len(names) - 1 else "") for i, n in enumerate(names)] + ["]", ""]
    (OUT / "Chats.lean").write_text("\n".join(root), encoding="utf-8", newline="\n")
    read = sum(1 for c in chats if aff_for(Path(c["path"])).exists())
    print(f"chats: {len(chats)} chats ({read} with an affidavit), {sum(len(c['prompts']) for c in chats)} prompts -> {OUT / 'Chats'}")
    for p in problems:
        print("  !!", p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
