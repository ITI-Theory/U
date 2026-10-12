"""Sherlock's front end, checked: readings of sentences against NextKB (ISS-088).

    python sherlock/readings.py check [<doc>]   # validate registry/readings/<doc>.yaml (all by default)
    python sherlock/readings.py qp               # signs of influence across documents: conflicts
    python sherlock/readings.py report           # -> bld/sherlock/readings.md
    python sherlock/readings.py lean             # -> bld/sherlock/lean/CycReadings/Slice.lean (make -C sherlock readings-lean)
    python sherlock/readings.py coverage         # how much of the affidavits' claim language NextKB can read

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

`qp` collects the influences: those read from sentences (licensed by the sense, or the
reader's where the verb has no translation) and those the documents state as data, the
coupling matrices of their figures (`matrix-heatmap` with emotion rows; W_ij > 0: j amplifies
i, P1). A sentence and a matrix of the same document with opposite signs for the same pair is a
finding; two documents' matrices that differ in sign are listed for the author's judgement (a
figure's second matrix is a deliberate modification and is not compared). The KB's own errors found on the way (a translation whose type contradicts
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


def fits(kb: dict, typ: str, need: str) -> tuple[str, str, dict]:
    """proved | refuted | unproved, the evidence in words, and the chains (for Lean)."""
    up = ancestors(kb, typ)
    if need in up:
        chain = path(up, need)
        return "proved", " genls ".join(chain), {"chain": chain}
    need_up = ancestors(kb, need)
    orig = set(kb.get("disjointOrig", []))
    for a in up:
        for d in kb["disjointWith"].get(a, []):
            if d in need_up:
                return ("refuted", f"{typ} genls {a}, disjointWith {d}, which {need} genls",
                        {"chain": path(up, a), "need_chain": path(need_up, d), "disjoint": [a, d] if f"{a}|{d}" in orig else [d, a]})
    return "unproved", f"no genls path from {typ} to {need} in NextKB", {}


def sense_sign(kb: dict, sense: dict) -> str | None:
    for _, t in sense["types"]:
        for a in ancestors(kb, t):
            if a in POLARITY:
                return POLARITY[a]
    return None


def check_one(r: dict, docname: str, lines: list[str], st: dict, kb: dict, constants: set[str],
              kb_findings: list[str], file_: str, commit: str) -> dict:
    res = {"doc": docname, "id": r["id"], "line": r["line"], "quote": r["quote"], "word": r.get("word"),
           "checks": [], "status": "ok", "evidence": []}

    def note(code: str, level: str, msg: str) -> None:
        res["checks"].append({"code": code, "level": level, "msg": msg})
        if level == "error":
            res["status"] = "error"
        elif level == "warn" and res["status"] == "ok":
            res["status"] = "warn"
    # R1 the quote, in the frozen document
    near = " ".join(lines[max(0, r["line"] - 2): r["line"] + 1]).replace("*", "")
    if " ".join(r["quote"].split()) not in " ".join(near.split()):
        note("R1", "error", f"quote not at line {r['line']} of {file_}@{commit[:8]}")
    if r.get("none"):
        res["status"] = "no translation"
        note("R2", "info", r["none"])
        if r.get("qp"):
            res["qp"] = {**r["qp"], "licensed": False}
        return res
    # R2 the sense
    senses = st["words"].get(r["word"].lower(), [])
    if not senses:
        res["status"] = "no translation"
        note("R2", "info", f"NextKB has no FrameNet translation for {r['word']!r}")
        return res
    if not (0 <= r["sense"] < len(senses)):
        note("R2", "error", f"{r['word']!r} has senses 0-{len(senses) - 1}, not {r['sense']}")
        return res
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
        verdict, why, ev = fits(kb, f["type"], need)
        if ev:
            res["evidence"].append({"verdict": verdict, "type": f["type"], "need": need, "pred": base, **ev})
        note("R5", {"proved": "info", "refuted": "error", "unproved": "warn"}[verdict],
             f"{f['type']} as {need} ({base}): {verdict}: {why}")
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
        res["qp"] = {**r["qp"], "licensed": licensed == r["qp"]["sign"]}
    return res


def check_doc(path_: Path, st: dict, kb: dict) -> tuple[list[dict], list[str]]:
    doc = yaml.safe_load(path_.read_text(encoding="utf-8"))
    rows, kb_findings = [], []
    text = frozen(doc["file"], doc["commit"])
    sha = hashlib.sha256(text.encode("utf-8")).hexdigest()
    lines = text.splitlines()
    constants = set(kb["constants"])
    for r in doc.get("readings") or []:
        res = check_one(r, doc["document"], lines, st, kb, constants, kb_findings, doc["file"], doc["commit"])
        if doc.get("sha256") and doc["sha256"] != sha:
            res["checks"].append({"code": "R1", "level": "error", "msg": f"the frozen file's SHA-256 is {sha[:12]}, not {doc['sha256'][:12]}"})
            res["status"] = "error"
        # the reader's own mistakes, kept as tests: each must stay refuted
        res["rejected"] = []
        for k, alt in enumerate(r.get("rejected") or []):
            a = check_one({**alt, "id": f"{r['id']}-rejected{k}", "line": r["line"], "quote": r["quote"]},
                          doc["document"], lines, st, kb, constants, [], doc["file"], doc["commit"])
            res["rejected"].append(a)
            if a["status"] != "error":
                res["checks"].append({"code": "R0", "level": "warn", "msg": f"rejected reading {k} now validates ({alt.get('why', '')})"})
                if res["status"] == "ok":
                    res["status"] = "warn"
            else:
                res["checks"].append({"code": "R0", "level": "info", "msg": f"rejected reading {k} still refused: "
                                      + "; ".join(c["msg"] for c in a["checks"] if c["level"] == "error")})
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


# matrix row labels that are OpenCyc constants (checked in check_labels); others are skipped,
# never guessed (Freeze would be OpenCyc's Freezing, a thermal process)
LABELS = {"fear": "Fear", "shame": "Shame", "anger": "Anger", "calm": "Calm", "awe": "Awe"}


def matrix_influences() -> list[dict]:
    """The influences the documents state as data: their figures' coupling matrices."""
    out = []
    files = [p for p in list((U / "paper" / "soma").rglob("*.md")) + list((U / "books" / "T-Theory").rglob("*.md"))
             if not any(x in p.as_posix() for x in ("archive", "translations", "OBSOLETE"))]
    for p in sorted(files):
        for i, line in enumerate(p.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
            if "matrix-heatmap" not in line or "rows=" not in line:
                continue
            labels = [x.strip().lower() for x in re.search(r'rows="([^"]+)"', line).group(1).split(",")]
            m = re.search(r'(?<![\w])matrix="(\[\[[^"]+\]\])"', line)
            if not m or not any(l in LABELS for l in labels):
                continue
            w = json.loads(m.group(1))
            for a, row in enumerate(w):
                for b, v in enumerate(row):
                    if a != b and v and a < len(labels) and b < len(labels) and labels[a] in LABELS and labels[b] in LABELS:
                        out.append({"doc": p.stem, "file": p.relative_to(U).as_posix(), "line": i,
                                    "constrainer": LABELS[labels[b]], "constrained": LABELS[labels[a]],
                                    "sign": "+" if v > 0 else "-", "value": v})
    return out


def qp_findings(rows: list[dict]) -> tuple[list[str], list[str], int]:
    """(sentence against matrix in one document, matrices that differ across documents, influences)."""
    data = matrix_influences()
    found, differs = [], []
    for r in rows:
        if not r.get("qp") or r["status"] == "error":
            continue
        q = r["qp"]
        for d in data:
            if d["doc"] == r["doc"] and (d["constrainer"], d["constrained"]) == (q["constrainer"], q["constrained"]) and d["sign"] != q["sign"]:
                found.append(f"{r['doc']}:{r['line']} \"{r['quote']}\" reads {q['constrainer']} -> {q['constrained']} {q['sign']}"
                             f"{'' if q.get('licensed') else ' (the reader' + chr(39) + 's sign)'}, but its matrix at line {d['line']} has W = {d['value']}")
    by_pair = defaultdict(list)
    for d in data:
        by_pair[(d["constrainer"], d["constrained"])].append(d)
    for (a, b), ds in sorted(by_pair.items()):
        if len({d["sign"] for d in ds}) > 1:
            differs.append(f"{a} -> {b}: " + "; ".join(f"{d['sign']} ({d['value']}) {d['doc']}:{d['line']}" for d in ds))
    return found, differs, len(data)


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


def lean_id(text: str) -> str:
    return re.sub(r"\W", "_", text)


def lean(rows: list[dict]) -> int:
    """The R5 verdicts as Lean theorems over Sherlock's OpenCyc core. Slice mode: the NextKB
    facts used are axioms (stated in one microtheory, NextKB), so the module builds in seconds
    and the kernel checks the reasoning; proving the facts from the full KB is the release step."""
    facts: dict[str, str] = {}
    thms: list[str] = []

    def g(a: str, b: str) -> str:
        n = f"g_{lean_id(a)}__{lean_id(b)}"
        facts[n] = f'axiom {n} : Holds NK (genls (.c "{a}") (.c "{b}"))'
        return n

    def climb(var: str, chain: list[str], tag: str, body: list[str]) -> str:
        cur = var
        for k in range(len(chain) - 1):
            nxt = f"{tag}{k + 1}"
            body.append(f"  have {nxt} := isa_genls {cur} {g(chain[k], chain[k + 1])}")
            cur = nxt
        return cur

    seen = set()
    for r in rows:
        for which, res in [("", r)] + [(f"_rejected{k}", a) for k, a in enumerate(r.get("rejected") or [])]:
            for e in res.get("evidence") or []:
                name = lean_id(f"{r['doc']}_{r['line']}_{r['id']}{which}_{e['type']}_{e['pred']}")
                if name in seen:
                    continue
                seen.add(name)
                doc = f'/-- {r["doc"]}:{r["line"]} "{r["quote"]}"{", rejected reading" if which else ""}: {e["type"]} as {e["need"]} ({e["pred"]}). -/'
                if e["verdict"] == "refuted":
                    body: list[str] = []
                    hx = climb("h", e["chain"], "h", body)
                    kx = climb("k", e["need_chain"], "k", body)
                    a, d = e["disjoint"]
                    dn = f"d_{lean_id(a)}__{lean_id(d)}"
                    facts[dn] = f'axiom {dn} : Holds NK (disjointWith (.c "{a}") (.c "{d}"))'
                    top_t, top_n = e["chain"][-1], e["need_chain"][-1]
                    args = (hx, kx) if (a, d) == (top_t, top_n) else (kx, hx)
                    thms += [doc, f'theorem {name} (x : Term) (h : Holds NK (isa x (.c "{e["type"]}")))',
                             f'    (k : Holds NK (isa x (.c "{e["need"]}"))) : Holds NK .falsum := by', *body,
                             f"  exact disjoint {dn} {args[0]} {args[1]}", ""]
                elif e["verdict"] == "proved":
                    ch = e["chain"]
                    term = g(ch[0], ch[1])
                    for k in range(1, len(ch) - 1):
                        term = f"(genls_trans {term} {g(ch[k], ch[k + 1])})"
                    thms += [doc, f'theorem {name} : Holds NK (genls (.c "{ch[0]}") (.c "{ch[-1]}")) := {term}', ""]
    out = OUT / "lean" / "CycReadings"
    out.mkdir(parents=True, exist_ok=True)
    text = ["import Cyc.Core", "", "/-!", "# Sherlock's readings, the type verdicts (ISS-088; generated by sherlock/readings.py lean)", "",
            "Slice mode: the NextKB facts used are axioms in one microtheory, `NextKB`; the kernel checks",
            "each verdict's reasoning from them with Cyc.Core's rules. Never committed: rebuild from the",
            "registry. The full check proves the facts from the knowledge base (release step).", "-/", "",
            "namespace CycReadings", "", "open Cyc Cyc.Sentence", "", 'abbrev NK : Mt := .c "NextKB"', "",
            *sorted(facts.values()), "", *thms, "end CycReadings", ""]
    (out / "Slice.lean").write_text("\n".join(text), encoding="utf-8", newline="\n")
    print(f"bld/sherlock/lean/CycReadings/Slice.lean: {len(facts)} NextKB facts, {sum(1 for t in thms if t.startswith('theorem'))} theorems")
    return 0


STOP = set("""a an the and or but if then than that this these those of in on at to for from by with as is are was
were be been being it its it's not no nor so such into onto over under between within without about above below
can could may might must shall should will would do does did has have had he she they we you i his her their our
your my me him them us which who whom whose what when where why how all any each every some most more less very
also only just one two three four five six seven eight nine ten per via its there here both either neither""".split())
# the programme's evidence labels annotate a claim; they are not its language
STOP |= {"interpretive", "open-hypothesis", "derived-under-assumptions", "kernel-verified", "simulated", "empirical-result", "sourced"}


def lemmas(word: str) -> list[str]:
    w = word.lower()
    out = [w]
    for suf, rep in (("ies", "y"), ("es", ""), ("s", ""), ("ed", ""), ("ed", "e"), ("ing", ""), ("ing", "e")):
        if w.endswith(suf) and len(w) > len(suf) + 2:
            out.append(w[: -len(suf)] + rep)
    return out


def coverage() -> int:
    """The claims of every affidavit: which content words NextKB's FrameNet can read at all
    (a word with a translation; a crude lemma, no parser). A measure of how far the front end
    can be checked, not a reading."""
    st, _ = load()
    words = st["words"]
    per_doc = defaultdict(lambda: [0, 0, 0, 0])  # content words, translatable, claims, claims fully translatable
    missing = defaultdict(int)
    for f in sorted((U / "registry" / "affidavits").glob("*.yaml")):
        a = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
        if not a.get("document"):
            continue
        for c in a.get("claims") or []:
            toks = [t for t in re.findall(r"[A-Za-z][A-Za-z'-]+", str(c.get("quote", ""))) if t.lower() not in STOP and len(t) > 2]
            if not toks:
                continue
            ok = [any(l in words for l in lemmas(t)) for t in toks]
            d = per_doc[a["id"]]
            d[0] += len(toks); d[1] += sum(ok); d[2] += 1; d[3] += all(ok)
            for t, k in zip(toks, ok):
                if not k:
                    missing[t.lower()] += 1
    tot = [sum(v[i] for v in per_doc.values()) for i in range(4)]
    lines = ["# How much of the programme's claim language NextKB's FrameNet can read", "",
             f"{tot[2]} claims in {len(per_doc)} affidavits: {tot[1]} of {tot[0]} content words have a FrameNet "
             f"translation ({100 * tot[1] / max(tot[0], 1):.0f}%); {tot[3]} claims ({100 * tot[3] / max(tot[2], 1):.0f}%) "
             "have one for every content word.", "", "| affidavit | claims | words read | claims fully readable |", "|---|---|---|---|"]
    for k, v in sorted(per_doc.items()):
        lines.append(f"| {k} | {v[2]} | {100 * v[1] / max(v[0], 1):.0f}% | {v[3]} |")
    lines += ["", "The words most often without a translation: " + ", ".join(f"{w} ({n})" for w, n in sorted(missing.items(), key=lambda kv: -kv[1])[:40])]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "readings-coverage.md").write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    print(lines[2])
    print(lines[-1][:400])
    return 0


def summary(rows: list[dict]) -> str:
    n = len(rows)
    c = defaultdict(int)
    for r in rows:
        c[r["status"]] += 1
    return f"{n} readings: {c['ok']} ok, {c['warn']} with warnings, {c['error']} errors, {c['no translation']} no translation"


def main() -> int:
    cmd = sys.argv[1] if len(sys.argv) > 1 else "check"
    if cmd not in ("check", "qp", "report", "lean", "coverage"):
        print(__doc__)
        return 2
    if cmd == "coverage":
        return coverage()
    rows, kbf = all_rows(sys.argv[2] if cmd == "check" and len(sys.argv) > 2 else None)
    if cmd == "lean":
        return lean(rows)
    if cmd == "qp":
        conflicts = qp_conflicts(rows)
        found, differs, n = qp_findings(rows)
        for c in conflicts:
            print(f"conflict  {c}")
        for f in found:
            print(f"finding   {f}")
        for d in differs:
            print(f"differs   {d}")
        print(f"{sum(1 for r in rows if r.get('qp'))} influences read, {n} in the documents' coupling matrices; "
              f"{len(conflicts)} read pairs with opposite signs, {len(found)} sentences against their own matrix, "
              f"{len(differs)} pairs whose matrices differ across documents")
        return 1 if conflicts or found else 0
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
    found, differs, _ = qp_findings(rows)
    out += ["", "## Influences read with opposite signs", ""] + ([f"- {c}" for c in conflicts] or ["- none"])
    out += ["", "## Sentences against their own document's coupling matrix", ""] + ([f"- {f}" for f in found] or ["- none"])
    out += ["", "## Coupling matrices that differ in sign across documents (for the author)", ""] + ([f"- {d}" for d in differs] or ["- none"])
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
