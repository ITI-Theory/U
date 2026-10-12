"""Sherlock's front end, checked: readings of sentences against NextKB (ISS-088).

    python sherlock/readings.py check [<doc>]   # validate registry/readings/<doc>.yaml (all by default)
    python sherlock/readings.py qp               # signs of influence across documents: conflicts
    python sherlock/readings.py report           # -> bld/sherlock/readings.md

A reading is a language model's proposal of what a sentence says, written as OpenCyc facts
through one of NextKB's FrameNet semantic translations (semtrans.py): the word, which of its
senses, and for each participant the grammatical slot, the predicate that binds it, and its
OpenCyc type. Nothing in it is taken on trust. The validator checks, without guessing:

  R1 the quote is in the document, at its line, in the frozen version (commit, SHA-256);
  R2 the word has that sense in NextKB (else: no translation, reported, not invented);
  R3 each slot is in the sense's binding template, and the predicate is one it allows;
  R4 each type is an OpenCyc constant;
  R5 each type fits the predicate's argument type (`argNIsa`): a `genls` path in OpenCyc
     proves it; a `disjointWith` above both refutes it; neither is "unproved";
  R6 a sign of influence ("X raises Y": qprop+) is licensed by the sense's own type
     (genls IncreaseEvent: +, DecreaseEvent: -), not by the reader.

`qp` collects the influences across all documents and reports the same pair read with
opposite signs. The KB's own errors found on the way (a translation whose type contradicts
its word) are reported as such.
"""
from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
from collections import defaultdict, deque
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent))
from semtrans import load  # noqa: E402

U = Path(__file__).resolve().parents[1]
READINGS = U / "registry" / "readings"
OUT = U / "bld" / "sherlock"
POLARITY = {"IncreaseEvent": "+", "IncreaseAction": "+", "StrengtheningEvent": "+",
            "DecreaseEvent": "-", "DecreaseAction": "-", "WeakeningEvent": "-"}
SIGN_WORDS = {"+": ("increas", "rais", "ris", "grow", "strengthen", "amplif", "heighten", "boost", "deepen"),
              "-": ("decreas", "reduc", "lower", "drop", "fall", "weaken", "dampen", "soften", "lessen", "calm")}


def frozen(file: str, commit: str) -> str:
    return subprocess.run(["git", "show", f"{commit}:{file}"], cwd=U, capture_output=True, text=True,
                          encoding="utf-8", check=True).stdout


def ancestors(kb: dict, c: str) -> dict[str, str]:
    """Every collection above c by genls (and isa for a collection's own type), with the step that reached it."""
    seen, todo = {c: ""}, deque([c])
    while todo:
        x = todo.popleft()
        for g in kb["genls"].get(x, []):
            if g not in seen:
                seen[g] = x
                todo.append(g)
    return seen


def path(seen: dict[str, str], top: str) -> list[str]:
    out = [top]
    while seen.get(out[-1]):
        out.append(seen[out[-1]])
    return out[::-1]


def arg_type(kb: dict, pred: str) -> tuple[str | None, str]:
    """The argument type a binding predicate gives its filler: arg2 for (pred :EVENT :FILLER), arg1
    for (InverseBinaryPredicateFn pred)."""
    m = re.fullmatch(r"\(InverseBinaryPredicateFn ([\w-]+)\)", pred)
    if m:
        return kb["argIsa"].get(m.group(1), {}).get("1"), m.group(1)
    return kb["argIsa"].get(pred, {}).get("2"), pred


def fits(kb: dict, typ: str, need: str) -> tuple[str, str]:
    """proved | refuted | unproved, with the evidence."""
    up = ancestors(kb, typ)
    if need in up:
        return "proved", " genls ".join(path(up, need))
    need_up = ancestors(kb, need)
    for a in up:
        for d in kb["disjointWith"].get(a, []):
            if d in need_up:
                return "refuted", f"{typ} genls {a}, disjointWith {d}, which {need} genls"
    return "unproved", f"no genls path from {typ} to {need} in NextKB"


def sense_sign(kb: dict, sense: dict) -> str | None:
    for _, t in sense["types"]:
        for a in ancestors(kb, t):
            if a in POLARITY:
                return POLARITY[a]
    return None


def check_doc(path_: Path, st: dict, kb: dict) -> tuple[list[dict], list[str]]:
    doc = yaml.safe_load(path_.read_text(encoding="utf-8"))
    rows, kb_findings = [], []
    text = frozen(doc["file"], doc["commit"])
    sha = hashlib.sha256(text.encode("utf-8")).hexdigest()
    lines = text.splitlines()
    constants = set(kb["constants"])
    for r in doc.get("readings") or []:
        res = {"doc": doc["document"], "id": r["id"], "line": r["line"], "quote": r["quote"], "word": r.get("word"),
               "checks": [], "status": "ok"}

        def note(code: str, level: str, msg: str) -> None:
            res["checks"].append({"code": code, "level": level, "msg": msg})
            if level == "error":
                res["status"] = "error"
            elif level == "warn" and res["status"] == "ok":
                res["status"] = "warn"
        # R1 the quote, in the frozen document
        if doc.get("sha256") and doc["sha256"] != sha:
            note("R1", "error", f"the frozen file's SHA-256 is {sha[:12]}, not {doc['sha256'][:12]}")
        near = " ".join(lines[max(0, r["line"] - 2): r["line"] + 1]).replace("*", "")
        if " ".join(r["quote"].split()) not in " ".join(near.split()):
            note("R1", "error", f"quote not at line {r['line']} of {doc['file']}@{doc['commit'][:8]}")
        if r.get("none"):
            res["status"] = "no translation"
            note("R2", "info", r["none"])
            rows.append(res)
            continue
        # R2 the sense
        senses = st["words"].get(r["word"].lower(), [])
        if not senses:
            res["status"] = "no translation"
            note("R2", "info", f"NextKB has no FrameNet translation for {r['word']!r}")
            rows.append(res)
            continue
        if not (0 <= r["sense"] < len(senses)):
            note("R2", "error", f"{r['word']!r} has senses 0-{len(senses) - 1}, not {r['sense']}")
            rows.append(res)
            continue
        s = senses[r["sense"]]
        res["meaning"] = f"{s['frame']}; " + ", ".join(f"{a} isa {t}" for a, t in s["types"])
        # R3 R4 R5 the participants
        for slot, f in (r.get("fillers") or {}).items():
            allowed = sorted({p for alt in s["slots"].get(slot, []) for p in alt["preds"]})
            if slot not in s["slots"]:
                note("R3", "error", f"{slot} is not in the binding template of {r['word']} [{r['sense']}]")
                continue
            if f["pred"] not in allowed:
                note("R3", "error", f"{slot} binds {', '.join(allowed)}, not {f['pred']}")
            if f["type"] not in constants:
                note("R4", "error", f"{f['type']} is not an OpenCyc constant")
                continue
            need, base = arg_type(kb, f["pred"])
            if not need:
                note("R5", "info", f"{base} has no argument type in NextKB: {f['type']} accepted untyped")
                continue
            verdict, why = fits(kb, f["type"], need)
            note("R5", {"proved": "info", "refuted": "error", "unproved": "warn"}[verdict], f"{f['type']} as {need} ({base}): {verdict}: {why}")
        # R6 the sign of influence
        if r.get("qp"):
            licensed = sense_sign(kb, s)
            stem = r["word"].lower()
            word_sign = next((k for k, ws in SIGN_WORDS.items() if stem.startswith(ws)), None)
            if licensed and word_sign and licensed != word_sign:
                kb_findings.append(f"NextKB: {r['word']} [{r['sense']}] ({s['frame']}) is typed "
                                   f"{', '.join(t for _, t in s['types'])}, sign {licensed}, but the word means {word_sign}")
            if licensed is None:
                note("R6", "warn", f"the sense's type does not license a sign; {r['qp']['sign']} is the reader's")
            elif licensed != r["qp"]["sign"]:
                note("R6", "error", f"the sense licenses {licensed}, the reading says {r['qp']['sign']}")
            else:
                note("R6", "info", f"sign {licensed} licensed by the sense's type")
            for k in ("constrainer", "constrained"):
                if r["qp"][k] not in constants:
                    note("R4", "error", f"{r['qp'][k]} is not an OpenCyc constant")
            res["qp"] = r["qp"]
        rows.append(res)
    return rows, kb_findings


def all_rows(only: str | None = None) -> tuple[list[dict], list[str]]:
    st, kb = load()
    rows, kbf = [], []
    for p in sorted(READINGS.glob("*.yaml")):
        if only and p.stem != only:
            continue
        r, k = check_doc(p, st, kb)
        rows += r
        kbf += k
    return rows, sorted(set(kbf))


def qp_conflicts(rows: list[dict]) -> list[str]:
    by_pair = defaultdict(list)
    for r in rows:
        if r.get("qp") and r["status"] != "error":
            by_pair[(r["qp"]["constrainer"], r["qp"]["constrained"])].append(r)
    out = []
    for (a, b), rs in sorted(by_pair.items()):
        signs = {r["qp"]["sign"] for r in rs}
        if len(signs) > 1:
            out.append(f"{a} -> {b}: " + "; ".join(f"{r['qp']['sign']} in {r['doc']}:{r['line']} \"{r['quote']}\"" for r in rs))
    return out


def summary(rows: list[dict]) -> str:
    n = len(rows)
    c = defaultdict(int)
    for r in rows:
        c[r["status"]] += 1
    return f"{n} readings: {c['ok']} ok, {c['warn']} with warnings, {c['error']} errors, {c['no translation']} no translation"


def main() -> int:
    cmd = sys.argv[1] if len(sys.argv) > 1 else "check"
    if cmd not in ("check", "qp", "report"):
        print(__doc__)
        return 2
    rows, kbf = all_rows(sys.argv[2] if cmd == "check" and len(sys.argv) > 2 else None)
    if cmd == "qp":
        conflicts = qp_conflicts(rows)
        for c in conflicts:
            print(f"conflict  {c}")
        print(f"{sum(1 for r in rows if r.get('qp'))} influences read; {len(conflicts)} pairs with opposite signs")
        return 1 if conflicts else 0
    bad = 0
    out = ["# Sherlock's readings: sentences checked against NextKB", "", summary(rows), ""]
    for r in rows:
        mark = {"ok": "ok", "warn": "warn", "error": "ERROR", "no translation": "none"}[r["status"]]
        out.append(f"- `{r['doc']}:{r['line']}` [{mark}] \"{r['quote']}\"" + (f" — {r['word']}: {r['meaning']}" if r.get("meaning") else ""))
        for ch in r["checks"]:
            if cmd == "report" or ch["level"] != "info":
                out.append(f"  - {ch['code']} {ch['level']}: {ch['msg']}")
        bad += r["status"] == "error"
    conflicts = qp_conflicts(rows)
    out += ["", "## Influences read with opposite signs", ""] + ([f"- {c}" for c in conflicts] or ["- none"])
    out += ["", "## Errors in NextKB found on the way", ""] + ([f"- {k}" for k in kbf] or ["- none"])
    if cmd == "report":
        OUT.mkdir(parents=True, exist_ok=True)
        (OUT / "readings.md").write_text("\n".join(out) + "\n", encoding="utf-8", newline="\n")
        print(f"bld/sherlock/readings.md: {summary(rows)}")
    else:
        print("\n".join(out))
    return 1 if bad else 0


if __name__ == "__main__":
    raise SystemExit(main())
