"""Sherlock's ledger: what documents say about the programme's own Lean.

    python sherlock/ledger.py extract [paper/soma/<doc>/<doc>.md ...] # -> bld/sherlock/ledger-claims.json
                                       # (no files: every document with an affidavit)
    python sherlock/ledger.py judge                                    # -> bld/sherlock/ledger/<Module>.json
    python sherlock/ledger.py report                                   # -> bld/sherlock/ledger.md

The extractor finds every backticked Lean-looking name in a document and what
the document says about it on that line (in the data files, DATA_FILES, also the
programme's declaration names written without backticks) ("axiom", "kernel-checked",
"theorem", "def", "sorry"). The judge (Lean, root package, one process per
programme module that may declare a cited name) resolves each name, gives its kind and the axioms it rests on (sorryAx shows a sorry). The
report lists, per document, the names whose claimed status disagrees with
the Lean, and names that do not exist. Python extracts, Lean decides (D5).
"""
from __future__ import annotations

import json
import re
import shutil
import sys
from pathlib import Path

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock"
NAME = re.compile(r"`((?:[A-Z][A-Za-z0-9_]*\.)*[A-Za-z_][A-Za-z0-9_']*(?:\.[A-Za-z_][A-Za-z0-9_']*)*)`")
ABSENT = re.compile(r"does not (exist|have)|doesn't (exist|have)|no such|not in (current )?Mathlib|not in the (programme's )?Lean|does not contain", re.I)
CLAIMS = [("axiom", re.compile(r"\baxiom", re.I)), ("sorry", re.compile(r"\bsorry", re.I)),
          ("kernel-checked", re.compile(r"kernel[- ]checked|kernel[- ]verified|proved in Lean|Lean 4 kernel", re.I)),
          ("theorem", re.compile(r"\btheorem\b", re.I)), ("def", re.compile(r"\bdef(inition)?\b", re.I))]


NOT_LEAN = re.compile(r"^(scipy|numpy|np|torch|matplotlib|pandas|sympy|math|os|sys)\.|\.(md|lean|py|yaml|yml|pdf|tex|bib|json|csv|png|toml|tql|mdl|mlean|js|ts|sh|ps1|txt|ipynb)$"
                      r"|^[A-Z0-9_]+$")  # file names; ALL_CAPS strings (constants, generated tokens) are not Lean names
# A line the author marks as naming no Lean (generated output, quoted code): <!-- not-lean -->
NOT_LEAN_LINE = "<!-- not-lean -->"
# "a theorem called `x` could ...": a hypothetical, not a claim about the programme's Lean
HYPOTHETICAL = re.compile(r"\b(theorem|lemma|definition|axiom)\s+(called|named)\s+`", re.I)
MODULES = {".".join(f.relative_to(d).with_suffix("").parts)
           for d in (U / "sherlock", U / "paper" / "proofs") for f in d.rglob("*.lean") if ".lake" not in f.parts}
SHERLOCK_SRC = "\n".join(p.read_text(encoding="utf-8") for p in (U / "sherlock").rglob("*.lean")
                         if ".lake" not in p.parts)


def looks_lean(n: str) -> bool:
    # snake_case with an underscore, or Module.name; not files, Python modules or symbols like T_c
    return (("_" in n or "." in n) and not NOT_LEAN.search(n) and not n.startswith(".")
            and not re.fullmatch(r"[A-Za-z]_[A-Za-z0-9]{1,3}", n))


def clause(text: str, name: str) -> str:
    """The clause (between ; or sentence ends) that mentions the name."""
    for part in re.split(r";|(?<=\.)\s", text):
        if name in part:
            return part
    return text


TACTICS = {"fin_cases", "norm_num", "simp", "decide", "omega", "linarith", "nlinarith", "positivity",
           "aesop", "rfl", "field_simp", "ring", "ring_nf", "native_decide", "exact_mod_cast", "push_cast",
           "interval_cases", "gcongr", "polyrith", "continuity", "measurability", "fun_prop", "fail_if_success"}


def said_in(text: str) -> str | None:
    """What a piece of text says about a declaration; "was X ... now Y" means Y."""
    m = re.search(r"\bnow\b(.*)", text, re.I) if re.search(r"\bwas\b", text, re.I) else None
    if m:
        text = m.group(1)
    if ABSENT.search(text):
        return "absent"
    if re.search(r"placeholder|proving `?True`?|proves (only )?`?True`?|:= trivial", text, re.I):
        return "placeholder"
    if re.search(r"proof obligations?|obligations? pending|pending real|not yet (proved|written)|\bplanned\b|to be proved", text, re.I):
        return "planned"
    if re.search(r"closes with|by `?(rfl|decide|norm_num|simp|omega)`?\b", text, re.I):
        return "kernel-checked"
    for k, rx in CLAIMS:
        if rx.search(text):
            return k
    if re.search(r"\bproved\b|\bproven\b|closes with|by `?(rfl|decide|norm_num|simp|omega)", text, re.I):
        return "kernel-checked"
    return None


def cells(line: str) -> list[str]:
    return [c.strip() for c in line.strip().strip("|").split("|")]


def registry_documents() -> list[str]:
    """The source file of every affidavit in registry/affidavits (that exists in the repo)."""
    import yaml
    files = []
    for f in sorted((U / "registry" / "affidavits").glob("*.yaml")):
        src = ((yaml.safe_load(f.read_text(encoding="utf-8")) or {}).get("source") or {}).get("file")
        if src and (U / src).exists() and src not in files:
            files.append(src)
    return files


# Data the books and the app are built from also make claims about the Lean ("kernel-verified
# (ScaleUniverse.lean, scale_shift_preserves_structure)"), often without backticks.
DATA_FILES = ["books/T-Theory/books.yaml", "books/T-Theory/defaults/fractal-manifest.yaml",
              "registry/concepts/*.yaml", "registry/tours/*.yaml", "registry/levels/*.yaml",
              "apps/instrument/visuals/soma-field-operator/cheat-sheet-registry.js"]


def data_documents() -> list[str]:
    files = []
    for pattern in DATA_FILES:
        files += sorted(p.relative_to(U).as_posix() for p in U.glob(pattern))
    return files


def known_names() -> set[str]:
    """The programme's declarations (short and full names) from the towers export; plain
    words in data files count only if they are one of these and look like Lean names."""
    path = OUT / "towers.json"
    if not path.exists():
        return set()
    names = set()
    for t in json.loads(path.read_text(encoding="utf-8")).get("towers", []):
        for d in t["declarations"]:
            for n in (d["name"], d["name"].split(".")[-1]):
                if looks_lean(n) and "_" in n:
                    names.add(n)
    return names


def extract(files: list[str]) -> int:
    files = files or (registry_documents() + data_documents())
    data = set(data_documents())
    plain = known_names()
    PLAIN = re.compile(r"(?<![`\w.])(" + "|".join(sorted(map(re.escape, plain), key=len, reverse=True)) + r")(?![\w`])") if plain else None
    items = []
    for f in files:
        path = U / f
        doc = path.stem if f not in data else f.replace("/", ":")
        lines = path.read_text(encoding="utf-8").splitlines()
        header: list[str] | None = None
        for i, line in enumerate(lines, 1):
            is_row = line.lstrip().startswith("|")
            if is_row and i < len(lines) and re.match(r"^\s*\|[\s:|-]+\|\s*$", lines[i]):
                header = cells(line)  # the next line is the separator: this is a header row
                continue
            if not is_row:
                header = None
            if NOT_LEAN_LINE in line:
                continue
            found = list(NAME.finditer(line))
            if f in data and PLAIN:  # plain declaration names in data files
                found += [m for m in PLAIN.finditer(line)]
            for m in found:
                n = m.group(1)
                if not looks_lean(n):
                    continue
                said = None
                if is_row and header:
                    row = cells(line)
                    col = next((k for k, c in enumerate(row) if m.group(0) in c), None)
                    if col is not None and col < len(header) and "/" not in header[col]:
                        said = said_in(header[col])  # a column headed "Axiom"; "paper/file/theorem" lists kinds, claims none
                    if said is None and col is not None:
                        said = said_in(clause(row[col], m.group(0)))  # the name's own clause in its cell
                    if said is None:  # a status column ("Status", "Proof", "Lean", "Result", "Label")
                        status = [c for k, c in enumerate(row) if k != col and k < len(header)
                                  and re.search(r"status|proof|lean|result|label", header[k], re.I)]
                        said = said_in(" ".join(status)) if status else None
                if said is None and f in data:
                    # data: "<claim>: <status> (<File>.lean, <name>)": the status is what precedes the name
                    st_m = re.search(rf":\s*([^:()]*?)\s*\([^()]*\b{re.escape(n)}\b", line)
                    if st_m:
                        said = said_in(st_m.group(1)) or "cited"
                if said is None:
                    now = re.search(r"\bnow\b(.*)", line, re.I) if re.search(r"\bwas\b", line, re.I) else None
                    said = said_in(now.group(1)) if now else said_in(clause(line, m.group(0)))
                # a table row that discloses a placeholder, whatever its column heading says
                if said in ("theorem", "kernel-checked") and is_row and re.search(r"placeholder|proves only `?True", line, re.I):
                    said = "placeholder"
                # a sentence that continues: "theorem `x`, currently a / placeholder proving True"
                if said in ("theorem", "kernel-checked") and f not in data and i < len(lines) and re.search(r"placeholder|proving `?True`?", lines[i], re.I) \
                        and not lines[i].lstrip().startswith(("|", "#")):
                    said = "placeholder"
                if re.search(rf"\b(theorem|lemma|def|axiom)\s+{re.escape(n.split('.')[-1])}\b", SHERLOCK_SRC):
                    said = "sherlock"  # Sherlock's own theorems (SH1), checked by make -C sherlock check
                if said in (None, "cited") and i >= 2 and re.search(r"proof obligations?|obligations? pending", lines[i - 2] + " " + line, re.I):
                    said = "planned"
                if HYPOTHETICAL.search(clause(line, m.group(0))):
                    said = "hypothetical"
                if n in TACTICS:
                    said = "tactic"
                if n in MODULES:
                    said = "module"
                items.append({"doc": doc, "file": f, "line": i, "name": n, "said": said or "cited", "text": line.strip()[:200]})
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "ledger-claims.json").write_text(json.dumps(items, indent=1, ensure_ascii=False),
                                            encoding="utf-8", newline="\n")
    print(f"bld/sherlock/ledger-claims.json: {len(items)} citations of Lean names in {len(files)} documents")
    return 0

PROOFS = U / "paper" / "proofs"


def judge() -> int:
    """One Lean process per programme module that may declare a cited name:
    the Module. prefix if given, else modules whose source declares it."""
    import os
    import subprocess
    claims = json.loads((OUT / "ledger-claims.json").read_text(encoding="utf-8"))
    sources = {f.stem: f.read_text(encoding="utf-8") for f in PROOFS.glob("*.lean")}
    mods = set()
    for c in claims:
        parts = c["name"].split(".")
        if len(parts) > 1 and parts[0] in sources:
            mods.add(parts[0])
        decl = re.compile(rf"^\s*(?:private\s+|noncomputable\s+)*(?:theorem|lemma|def|abbrev|axiom|structure|inductive|instance)\s+(?:[\w.]*\.)?{re.escape(parts[-1])}\b", re.M)
        mods.update(m for m, src in sources.items() if decl.search(src))
    if not mods:
        mods = {"UniversalSomaticField"}  # still resolve library names
    shutil.rmtree(OUT / "ledger", ignore_errors=True)
    for m in sorted(mods):
        env = dict(os.environ, SHERLOCK_MODULE=m, LEAN_NUM_THREADS="2")
        r = subprocess.run(["lake", "env", "lean", "sherlock/Ledger/Judge.lean"], cwd=U, env=env,
                           capture_output=True, text=True)
        lines = [l for l in (r.stdout + r.stderr).splitlines() if "OSforGFF" not in l]
        print("\n".join(lines[-3:]))
        if r.returncode:
            return r.returncode
    return 0


def trivial_names() -> set[str]:
    """Declarations whose statement is only `True` (bld/sherlock/towers.json, make -C sherlock towers)."""
    path = OUT / "towers.json"
    if not path.exists():
        return set()
    data = json.loads(path.read_text(encoding="utf-8"))
    return {d["name"] for t in data.get("towers", []) for d in t["declarations"] if d.get("trivial")}


TRIVIAL: set[str] = set()


def disagrees(said: str, r: dict) -> str | None:
    kind, axioms = r.get("kind"), r.get("axioms", [])
    if said in ("kernel-checked", "theorem") and r.get("resolved") in TRIVIAL:
        return f"called {said}, but it proves only True (a placeholder)"
    if said in ("tactic", "sherlock", "module", "hypothetical", "planned") or kind in ("namespace", "module"):
        return None
    if said == "placeholder":  # the document says it proves only True: the Lean must agree
        return None  # an honest disclosure of a weak or empty statement
    if said == "absent":  # the document says the name does not exist: the Lean must agree
        return None if kind == "missing" else f"said not to exist, but is a {kind}"
    if kind == "missing":
        return "no such declaration"
    if said == "axiom" and kind != "axiom":
        return f"called an axiom, is a {kind}"
    if said == "kernel-checked":
        if kind == "axiom":
            return "called kernel-checked, is an axiom"
        if "sorryAx" in axioms:
            return "called kernel-checked, rests on sorry"
        own = [a for a in axioms if a not in ("propext", "Classical.choice", "Quot.sound")]
        if own:
            return f"called kernel-checked, rests on axioms {own}"
    if said == "theorem" and kind not in ("theorem",):
        return f"called a theorem, is a {kind}"
    return None


def accepted() -> dict[tuple[str, int, str], str]:
    """The author's dispositions (registry/ledger-accepted.yaml): findings read and accepted as
    not an error, each with a reason. {(doc, line, name): reason}; axiom omissions use line 0."""
    import yaml
    path = U / "registry" / "ledger-accepted.yaml"
    if not path.exists():
        return {}
    rows = (yaml.safe_load(path.read_text(encoding="utf-8")) or {}).get("accepted") or []
    return {(r["doc"], int(r.get("line", 0)), r["name"]): r["reason"] for r in rows}


def report() -> int:
    TRIVIAL.update(trivial_names())
    ok = accepted()
    errors: list[str] = []  # compiler style: path:line: error: message (VS Code links them)
    claims = json.loads((OUT / "ledger-claims.json").read_text(encoding="utf-8"))
    results: dict[str, dict] = {}
    module_axioms: dict[str, list[str]] = {}
    for f in sorted((OUT / "ledger").glob("*.json")):
        for r in json.loads(f.read_text(encoding="utf-8")):
            if r.get("kind") == "module-axiom":
                module_axioms.setdefault(r["module"], []).append(r["name"])
                continue
            if r["name"] not in results or results[r["name"]].get("module") == "library":
                results[r["name"]] = r
    out, bad = ["# Sherlock ledger: documents against the programme's Lean", ""], 0
    for doc in sorted({c["doc"] for c in claims}):
        rows = [c for c in claims if c["doc"] == doc]
        out += [f"## {doc}", "", f"{len(rows)} citations of Lean names.", ""]
        for c in rows:
            r = results.get(c["name"], {"kind": "missing"})
            why = disagrees(c["said"], r)
            if why and (c["doc"], c["line"], c["name"]) in ok:
                out.append(f"- line {c['line']} `{c['name']}`: accepted ({ok[(c['doc'], c['line'], c['name'])]})")
                continue
            if why:
                bad += 1
                errors.append(f"{c.get('file', c['doc'])}:{c['line']}: error: `{c['name']}` ({c['said']}): {why}"
                              + (f" [{r['resolved']}]" if r.get("resolved") else ""))
                out.append(f"- line {c['line']} `{c['name']}` ({c['said']}): **{why}**"
                           + (f" [{r['resolved']}]" if r.get("resolved") else ""))
        mods = {results[c["name"]]["module"] for c in rows if results.get(c["name"], {}).get("module") in module_axioms}
        named = {results[c["name"]].get("resolved") for c in rows if c["said"] == "axiom" and c["name"] in results}
        lists_axioms = any(c["said"] == "axiom" for c in rows)  # only a document that lists axioms omits some
        # the axioms the cited declarations rest on (not every axiom of their modules): a
        # document need not mention an axiom nothing it cites depends on
        rests = {a for c in rows for a in results.get(c["name"], {}).get("axioms", [])}
        silent = [a for m in sorted(mods) for a in module_axioms[m] if a not in named and a in rests] if lists_axioms else []
        silent = [a for a in silent if (doc, 0, a) not in ok]
        if silent:
            first = next((c for c in rows if c["said"] == "axiom"), rows[0])
            errors.append(f"{first.get('file', doc)}:{first['line']}: warning: the document lists axioms but not "
                          + ", ".join(f"`{a}`" for a in silent))
            bad += len(silent)
            out.append(f"- axioms in the cited modules the document never calls axioms: "
                       + ", ".join(f"`{a}`" for a in silent))
        out.append("")
    (OUT / "ledger.md").write_text("\n".join(out), encoding="utf-8", newline="\n")
    (OUT / "ledger.txt").write_text("\n".join(errors) + ("\n" if errors else ""), encoding="utf-8", newline="\n")
    for e in errors:
        print(e)
    print(f"bld/sherlock/ledger.md: {len(claims)} citations, {bad} disagree with the Lean")
    return 0


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "extract":
        sys.exit(extract(sys.argv[2:]))
    if cmd == "judge":
        sys.exit(judge())
    if cmd == "report":
        sys.exit(report())
    print(__doc__)
    sys.exit(2)
