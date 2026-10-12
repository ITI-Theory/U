"""Sherlock's lexicon of meanings: NextKB's FrameNet semantic translations (ISS-088).

    python sherlock/semtrans.py build          # -> bld/sherlock/semtrans.json, bld/sherlock/kb-index.json
    python sherlock/semtrans.py show increase  # the senses of a word: frame, type, role bindings

Each FrameNet translation in NextKB (`FNVerbSemtrans`, `FNNounSemtrans`, `FNAdjSemtrans` in
FrameNetSemTransMt) says what a word means in OpenCyc: the type of the thing it names
(`(isa :ACTION IncreaseAction)`), its FrameNet frame, and a binding template: which
grammatical slot (:SUBJECT, :OBJECT, :OBLIQUE-OBJECT with its preposition, ...) is bound by
which OpenCyc predicate. Those are the only readings a word may have: a reading of a sentence
that uses another meaning, slot or predicate is not a reading NextKB licenses.

The KB index holds what the validator needs to check a reading against OpenCyc: which
constants exist, each predicate's arity and argument types (`arg1Isa` ...), and the `isa` /
`genls` graph. Python reads; the facts are NextKB's, the decisions are the validator's and,
for types, Lean's (readings.py).

The programme's own vocabulary (registry/vocabulary.yaml, TTheoryVocabularyMt; ISS-089) is
merged in: its constants under their OpenCyc anchors, its words as senses after NextKB's (so
NextKB's sense numbers do not move), each marked with its source. The merge refuses an anchor
OpenCyc does not have, a name OpenCyc already uses, a template that does not exist, and a
constant under two disjoint collections.
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
OUT = U / "bld" / "sherlock"
SEMTRANS = OUT / "semtrans.json"
KB = OUT / "kb-index.json"
HEADS = {"FNVerbSemtrans": "verb", "FNNounSemtrans": "noun", "FNAdjSemtrans": "adj"}


# ---- a small CycL reader ---------------------------------------------------------------

TOKEN = re.compile(r'\s*(?:(;[^\n]*)|(\()|(\))|("(?:[^"\\]|\\.)*")|([^\s()";]+))')


def read_all(text: str) -> list:
    """Every top-level s-expression in the text, as nested lists of strings."""
    stack: list[list] = [[]]
    for m in TOKEN.finditer(text):
        comment, open_, close, string, atom = m.groups()
        if comment:
            continue
        if open_:
            stack.append([])
        elif close:
            if len(stack) > 1:
                done = stack.pop()
                stack[-1].append(done)
        elif string is not None:
            stack[-1].append(string)
        elif atom is not None:
            stack[-1].append(atom)
    return stack[0]


def show(x) -> str:
    return x if isinstance(x, str) else "(" + " ".join(show(y) for y in x) + ")"


# ---- the semantic translations ---------------------------------------------------------

def lemma(word: str) -> str:
    """Increase-TheWord -> increase; Give_up-TheWord -> give up."""
    return word.removesuffix("-TheWord").replace("_", " ").lower()


def denotation(form) -> tuple[list[list[str]], list[str]]:
    """(and (isa :ACTION IncreaseAction) ...) -> [[":ACTION", "IncreaseAction"]], other conjuncts."""
    conj = form[1:] if isinstance(form, list) and form and form[0] == "and" else [form]
    types, other = [], []
    for c in conj:
        if isinstance(c, list) and len(c) == 3 and c[0] == "isa" and isinstance(c[2], str):
            types.append([c[1], c[2]])
        else:
            other.append(show(c))
    return types, other


def slots(template) -> dict[str, list[dict]]:
    """(bindingTemplate (TheList (:SUBJECT (NP doneBy ...)) ...)) -> {":SUBJECT": [{"phrase", "preds"}]}."""
    out: dict[str, list[dict]] = {}
    if not (isinstance(template, list) and len(template) == 2 and isinstance(template[1], list)):
        return out
    for slot in template[1][1:]:  # skip TheList
        if not (isinstance(slot, list) and slot and isinstance(slot[0], str)):
            continue
        out[slot[0]] = [{"phrase": show(alt[0]), "preds": [show(p) for p in alt[1:]]}
                        for alt in slot[1:] if isinstance(alt, list) and alt]
    return out


def build_semtrans(z: zipfile.ZipFile) -> dict:
    words: dict[str, list[dict]] = defaultdict(list)
    frames: dict[str, int] = defaultdict(int)
    for name in z.namelist():
        if not name.endswith("Semtranses.krf"):
            continue
        for form in read_all(z.read(name).decode("utf-8", "replace")):
            if not (isinstance(form, list) and form and form[0] in HEADS) or len(form) < 4:
                continue
            particles = [lemma(p) for p in form[1][1:]] if isinstance(form[1], list) else []
            word = form[2]
            types, other = denotation(form[3])
            sense = {"pos": HEADS[form[0]], "word": word, "particles": particles, "types": types, "other": other,
                     "frame": None, "slots": {}}
            for part in form[4:]:
                if isinstance(part, list) and part and part[0] == "frame":
                    sense["frame"] = part[1]
                elif isinstance(part, list) and part and part[0] == "bindingTemplate":
                    sense["slots"] = slots(part)
            frames[sense["frame"] or "-"] += 1
            words[lemma(word)].append(sense)
    for senses in words.values():
        for k, s in enumerate(senses):
            s["sense"] = k
    return {"source": ZIP.name, "senses": sum(len(v) for v in words.values()), "frames": len(frames),
            "words": dict(sorted(words.items()))}


# ---- the KB index ----------------------------------------------------------------------

def build_kb(z: zipfile.ZipFile) -> dict:
    constants: set[str] = set()
    isa, genls = defaultdict(set), defaultdict(set)
    arity, argisa, genlpreds = {}, defaultdict(dict), defaultdict(set)
    disjoint = defaultdict(set)
    disjoint_orig: set[str] = set()
    for name in z.namelist():
        if not name.endswith(".krf"):
            continue
        for form in read_all(z.read(name).decode("utf-8", "replace")):
            if not (isinstance(form, list) and len(form) == 3 and all(isinstance(x, str) for x in form)):
                continue
            p, a, b = form
            if p == "isa":
                isa[a].add(b); constants.update((a, b))
            elif p == "genls":
                genls[a].add(b); constants.update((a, b))
            elif p == "arity" and b.isdigit():
                arity[a] = int(b); constants.add(a)
            elif re.fullmatch(r"arg[1-5]Isa", p):
                argisa[a][p[3]] = b; constants.update((a, b))
            elif p == "argIsa":
                pass
            elif p == "genlPreds":
                genlpreds[a].add(b)
            elif p == "disjointWith":
                disjoint[a].add(b); disjoint[b].add(a); disjoint_orig.add(f"{a}|{b}")
            elif p in ("comment", "prettyString-Canonical"):
                constants.add(a)
    return {"constants": sorted(c for c in constants if re.fullmatch(r"[A-Za-z][\w-]*", c)),
            "isa": {k: sorted(v) for k, v in isa.items()}, "genls": {k: sorted(v) for k, v in genls.items()},
            "arity": arity, "argIsa": argisa, "genlPreds": {k: sorted(v) for k, v in genlpreds.items()},
            "disjointWith": {k: sorted(v) for k, v in disjoint.items()}, "disjointOrig": sorted(disjoint_orig)}


VOCAB = U / "registry" / "vocabulary.yaml"


def merge_vocabulary(st: dict, kb: dict) -> list[str]:
    """The programme's vocabulary into both indexes; returns the problems (empty: merged)."""
    import yaml
    v = yaml.safe_load(VOCAB.read_text(encoding="utf-8"))
    mt = v["microtheory"]
    opencyc = set(kb["constants"])
    errors: list[str] = []
    new = {c["name"] for c in v.get("constants") or []}
    for c in v.get("constants") or []:
        if c["name"] in opencyc:
            errors.append(f"{c['name']}: OpenCyc already has this name")
        for g in c["genls"]:
            if g not in opencyc and g not in new:
                errors.append(f"{c['name']}: anchor {g} is not in OpenCyc")
    for w in v.get("words") or []:
        if w["constant"] not in opencyc:
            errors.append(f"word {w['word']}: {w['constant']} is not in OpenCyc")
    if errors:
        return errors
    vocab_genls = []
    for c in v.get("constants") or []:
        kb["genls"].setdefault(c["name"], [])
        for g in c["genls"]:
            kb["genls"][c["name"]].append(g)
            vocab_genls.append(f"{c['name']}|{g}")
        kb["isa"].setdefault(c["name"], []).append("Collection")
    kb["constants"] = sorted(opencyc | new)
    kb["vocabGenls"] = vocab_genls
    kb["vocabComment"] = {c["name"]: c.get("comment", "") for c in v.get("constants") or []}
    # disjointness: no new constant under two disjoint collections
    for c in v.get("constants") or []:
        seen, todo = {c["name"]}, [c["name"]]
        while todo:
            x = todo.pop()
            for g in kb["genls"].get(x, []):
                if g not in seen:
                    seen.add(g); todo.append(g)
        for a in seen:
            for d in kb["disjointWith"].get(a, []):
                if d in seen:
                    errors.append(f"{c['name']}: falls under {a} and {d}, which OpenCyc says are disjoint")
    def sense(word: str, typ: str, src: dict, pos: str, slots_: dict, frame: str) -> dict:
        return {"pos": pos, "word": word, "particles": [], "types": [[":ACTION" if pos == "verb" else ":NOUN", typ]],
                "other": [], "frame": frame, "slots": slots_, "source": mt, "comment": src.get("comment", "")}
    for c in v.get("constants") or []:
        for w in c.get("words") or []:
            st["words"].setdefault(w, []).append(sense(w, c["name"], c, "noun", {}, f"TT_{c['name']}"))
    for w in v.get("words") or []:
        st["words"].setdefault(w["word"], []).append(sense(w["word"], w["constant"], w, "noun", {}, f"TT_{w['constant']}"))
    for vb in v.get("verbs") or []:
        lem, k = vb["template"].split("/")
        tmpl = (st["words"].get(lem) or [])
        if not (0 <= int(k) < len(tmpl)) or tmpl[int(k)]["pos"] != "verb":
            errors.append(f"verb {vb['word']}: template {vb['template']} is not a verb sense")
            continue
        if vb["type"] not in opencyc:
            errors.append(f"verb {vb['word']}: {vb['type']} is not in OpenCyc")
            continue
        st["words"].setdefault(vb["word"], []).append(
            sense(vb["word"], vb["type"], vb, "verb", tmpl[int(k)]["slots"], f"TT_{vb['word']} (template {tmpl[int(k)]['frame']})"))
    for senses in st["words"].values():
        for k, s_ in enumerate(senses):
            s_["sense"] = k
    st["senses"] = sum(len(x) for x in st["words"].values())
    st["vocabulary"] = {"microtheory": mt, "constants": len(new), "words": len(v.get("words") or []), "verbs": len(v.get("verbs") or [])}
    return errors


def build() -> int:
    with zipfile.ZipFile(ZIP) as z:
        st = build_semtrans(z)
        kb = build_kb(z)
    problems = merge_vocabulary(st, kb)
    if problems:
        for e in problems:
            print(f"FAIL  vocabulary: {e}")
        return 1
    OUT.mkdir(parents=True, exist_ok=True)
    SEMTRANS.write_text(json.dumps(st, ensure_ascii=False), encoding="utf-8")
    KB.write_text(json.dumps(kb, ensure_ascii=False), encoding="utf-8")
    print(f"{SEMTRANS.relative_to(U).as_posix()}: {len(st['words'])} words, {st['senses']} senses, {st['frames']} frames")
    print(f"{KB.relative_to(U).as_posix()}: {len(kb['constants'])} constants, {len(kb['arity'])} predicates with an arity, "
          f"{len(kb['argIsa'])} with argument types")
    voc = st["vocabulary"]
    print(f"vocabulary ({voc['microtheory']}): {voc['constants']} constants, {voc['words']} words for OpenCyc constants, {voc['verbs']} verbs")
    return 0


def load() -> tuple[dict, dict]:
    if not (SEMTRANS.exists() and KB.exists()):
        build()
    return json.loads(SEMTRANS.read_text(encoding="utf-8")), json.loads(KB.read_text(encoding="utf-8"))


def main() -> int:
    if len(sys.argv) < 2 or sys.argv[1] not in ("build", "show"):
        print(__doc__)
        return 2
    if sys.argv[1] == "build":
        return build()
    st, _ = load()
    word = " ".join(sys.argv[2:]).lower()
    senses = st["words"].get(word, [])
    if not senses:
        print(f"no FrameNet translation for {word!r}")
        return 1
    for s in senses:
        print(f"{word} [{s['pos']} {s['sense']}] {s['frame']}: " + ", ".join(f"{r} isa {t}" for r, t in s["types"])
              + (f"  ({s['source']}: {s['comment']})" if s.get("source") else ""))
        for slot, alts in s["slots"].items():
            print(f"    {slot}: " + "; ".join(f"{a['phrase']} -> {' | '.join(a['preds']) or '-'}" for a in alts))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
