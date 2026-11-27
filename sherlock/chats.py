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
    python sherlock/chats.py route STAMP THREAD DISPOSITION [REF]   # the author's triage of a thread
        (STAMP: the chat's time stamp, e.g. 20261126_140957; DISPOSITION: implemented REF (a path or
        commit), queued REF (ISS-NNN), parked, discarded REF (the reason), untriaged)

FILE defaults to every chat in Me/chats/Inbox. The chats are private: the generated modules are
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
AFF = ME / "chats" / "affidavits"
OUT = U / "bld" / "sherlock" / "lean"

ENTRY = re.compile(r"^## Author \(([^)]+)\)[ \t]*$", re.M)
TURN = re.compile(r"^## (Author|User|Assistant)\b(.*)$", re.M)  # User: Copilot's export ("## User - <time>")
NLM_TURN = re.compile(r"^(USER|MODEL):[ \t]*", re.M)            # an older NotebookLM history
STAMP = re.compile(r"(\d{4}-\d\d-\d\dT\d\d:\d\d(?::\d\d)?(?:\.\d+)?Z?|\d{4}-\d\d-\d\d \d\d:\d\d)")
# A prompt holding Markdown is exported under a heading: "### **Your prompt:**".
PROMPT = re.compile(r"^(?:#+[ \t]*)?\*\*Your prompt:\*\*[ \t]*$", re.M)
RESPONSE = re.compile(r"^(?:#+[ \t]*)?\*\*Search(?:'|&#39;)s response:\*\*[ \t]*$", re.M)
ACTION = re.compile(r'<ActionUnit query="([^"]*)"')
STATUS = {"pursued": ".pursued", "deferred": ".deferred", "drifted": ".drifted", "unexplored_fork": ".unexploredFork"}
DISPOSITIONS = ("implemented", "queued", "parked", "discarded", "untriaged")


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
    return {"file": path.name, "date": str(head.get("date", "")), "source": str(head.get("source", "")),
            "account": str(head.get("account", "")), "title": str(head.get("title", "")),
            "prompts": prompts, "offers": offers}


def vocabulary() -> set[str]:
    path = AFF / "concepts.yaml"
    return set((yaml.safe_load(path.read_text(encoding="utf-8")) or {}).get("concepts", {})) if path.exists() else set()


def affidavit(chat: dict, vocab: set[str]) -> tuple[dict | None, list[str]]:
    path = AFF / (Path(chat["file"]).stem + ".aff")
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
         f"namespace Chats.{name}", "", "def chat : Chat.Chat where",
         f"  file := {s(chat['file'])}", f"  date := {s(chat['date'])}", f"  source := {s(chat['source'])}",
         f"  account := {s(chat['account'])}", f"  summary := {s(aff.get('summary', ''))}",
         f"  concepts := {strs(aff.get('concepts'))}", "  prompts := ["]
    L += [f"    {{ index := {p['index']}, time := {s(p['time'])}, line := {p['line']}, text := {s(p['text'])} }}"
          + ("," if i < len(chat["prompts"]) - 1 else "") for i, p in enumerate(chat["prompts"])]
    L += ["  ]", "  offers := ["]
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
    affs = sorted(AFF.glob(f"{stamp}*.aff"))
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


def chat_files(given: list[str]) -> list[Path]:
    return [Path(f).resolve() for f in given] if given else sorted(INBOX.glob("*.md"))


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("command", choices=["parse", "lean", "todo", "route"])
    ap.add_argument("files", nargs="*")
    a = ap.parse_args()
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
            if not (AFF / (Path(c["file"]).stem + ".aff")).exists():
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
    read = sum(1 for c in chats if (AFF / (Path(c["file"]).stem + ".aff")).exists())
    print(f"chats: {len(chats)} chats ({read} with an affidavit), {sum(len(c['prompts']) for c in chats)} prompts -> {OUT / 'Chats'}")
    for p in problems:
        print("  !!", p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
