"""USC on the Soma Machine: what the app should show, what it shows, checked in Lean (ISS-127).

The author's design (AI Mode, 26 Nov, thread visual-audit): the rules come from the code and the theory,
the observations from the screen. Sherlock reads the app's code (main.js: the shell's places and buttons)
and the registry (registry/levels: each level's label and its claims, physical at 4D, field at 8D, mind at
11D); the app's capture (npm run capture -- --only audit) gives, per level and dimension, the screenshot
(the black box) and the DOM's visible text (the white box); Windows' OCR reads the screenshot
(Tools/ocr.ps1). This script matches the rules' labels against both and writes bld/sherlock/lean/AppAudit.lean;
Lean decides, in AppQueries.lean, what is missing, what leaks, and where the screen and the DOM disagree.

  python sherlock/appaudit.py capture [LEVEL ...]   screenshots and DOM text into bld/app-audit/audit
  python sherlock/appaudit.py ocr                   OCR every screenshot (Windows PowerShell 5.1)
  python sherlock/appaudit.py lean                  rules and observations -> AppAudit.lean
  python sherlock/appaudit.py features              the USM as a model (options, rows, papers) -> UsmData.lean
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
APP = U / "apps" / "instrument" / "visuals" / "soma-field-operator"
SHOTS = U / "bld" / "app-audit" / "audit"
OUT = U / "bld" / "sherlock" / "lean"
ROW = {4: "physical", 8: "field", 11: "mind"}
CLAIMS = ["FORMAL", "SOURCED", "SIMULATED", "INTERPRETIVE", "OPEN"]


def norm(s: str) -> str:
    return " " + re.sub(r"[^A-Z0-9]+", " ", s.upper()).strip() + " "


def shell_labels() -> list[str]:
    """Sherlock on the code: the levels bar of main.js (its places, its groups, the dimensions, SETTINGS)."""
    js = (APP / "main.js").read_text(encoding="utf-8")
    stops = js[js.index("const STOPS = ["):]
    stops = stops[:stops.index("]]]];") + 5]
    labels = re.findall(r"\['[\w-]+', '([A-Z][A-Z ]+)'\]", stops) + re.findall(r"\['([A-Z]+)', \[\[", stops)
    title = re.search(r'levels-bar__title">([^<]+)<', js)
    return sorted(set(labels + ([title[1]] if title else []) + ["SETTINGS", "4D", "8D", "11D"]))


def levels() -> dict[str, dict]:
    return {y["id"]: y for y in (yaml.safe_load(p.read_text(encoding="utf-8")) for p in sorted((U / "registry" / "levels").glob("*.yaml")))}


def capture(ids: list[str]) -> int:
    cmd = ["npm", "run", "capture", "--", "--only", "audit", "--out", str(SHOTS.parent), "--width", "1600", "--height", "900", "--scale", "2"]
    if ids:
        cmd += ["--levels", ",".join(ids)]
    return subprocess.call(cmd, cwd=APP, shell=sys.platform == "win32")


def ocr() -> int:
    pngs = [str(p) for p in sorted(SHOTS.glob("*--*D.png"))]
    return subprocess.call(["powershell.exe", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(U / "sherlock" / "Tools" / "ocr.ps1"), *pngs])


def seen_in(label: str, text: str, tokens: set[str]) -> bool:
    """A label is read if its words are, a long word also by a long prefix (OCR clips: INTERPRE for INTERPRETIVE)."""
    n = norm(label)
    return n in text or all(w in tokens or (len(w) >= 8 and any(len(x) >= 6 and w.startswith(x) for x in tokens)) for w in n.split())


def s(x) -> str:
    return '"' + str(x).replace("\\", "\\\\").replace('"', '\\"') + '"'


def strs(xs) -> str:
    return "[" + ", ".join(s(x) for x in xs) + "]"


def lean() -> int:
    lv, shell = levels(), shell_labels()
    rules, forbidden, obs, omissions = [], [], [], []
    for lab in shell:
        rules.append(f'{{ label := {s(lab)}, layer := "shell" }}')
    for stem in sorted({p.name.split("--")[0] for p in SHOTS.glob("*--*D.png")}):
        if stem not in lv:
            continue
        level = lv[stem]
        rules.append(f'{{ label := {s(level["label"].upper())}, level := {s(stem)}, layer := "floor" }}')
        for dim in (4, 8, 11):
            claim = str(level.get("claims", {}).get(ROW[dim], "")).upper()
            rules.append(f'{{ label := {s(claim)}, level := {s(stem)}, minDim := {dim}, maxDim := {dim}, layer := {s(ROW[dim])} }}')
            # Soundness: at this dimension, a claim word that belongs only to a higher row must not show.
            below = {str(level.get("claims", {}).get(ROW[d], "")).upper() for d in (4, 8, 11) if d <= dim}
            for d in (8, 11):
                w = str(level.get("claims", {}).get(ROW[d], "")).upper()
                # Only INTERPRETIVE: SOURCED and FORMAL also badge other panels on every screen.
                if d > dim and w == "INTERPRETIVE" and w not in below:
                    forbidden.append(f'{{ label := {s(w)}, level := {s(stem)}, dim := {dim}, layer := {s(ROW[d])} }}')
        vocab = shell + [level["label"].upper()] + CLAIMS
        for dim in (4, 8, 11):
            png = SHOTS / f"{stem}--{dim}D.png"
            o, d = png.with_suffix(".ocr.json"), png.with_suffix(".dom.json")
            if not (o.exists() and d.exists()):
                continue
            oj = json.loads(o.read_text(encoding="utf-8-sig"))
            dj = json.loads(d.read_text(encoding="utf-8"))
            otext = norm(" | ".join(l["text"] for l in oj["lines"]))
            otok = set(otext.split())
            dtext = norm(" | ".join(i["text"] for i in dj["items"]))
            dtok = set(dtext.split())
            rendered = (dj.get("render") or {}).get("dimension") or dim
            if dim == 11 and rendered == 8:
                # The app's own rule, as code: below sigma 7 there is no 11D (main.js elevenDimensionalAvailable).
                mind = str(level.get("claims", {}).get("mind", "")).upper()
                omissions.append(f'{{ label := {s(mind)}, level := {s(stem)}, dim := 11, '
                                 f'reason := "11D is not available below sigma 7 (main.js elevenDimensionalAvailable): the app shows 8D" }}')
            obs.append(f'{{ level := {s(stem)}, dim := {dim}, rendered := {rendered}, '
                       f'seen := {strs(sorted({v for v in vocab if v and seen_in(v, otext, otok)}))}, '
                       f'dom := {strs(sorted({v for v in vocab if v and seen_in(v, dtext, dtok)}))} }}')
    out = ["import App.Basic", "", "/-! Generated by sherlock/appaudit.py from the app's code, the registry and the capture. -/", "",
           "namespace AppAudit", "", "open App", "",
           "def rules : List Rule := [\n  " + ",\n  ".join(rules) + "\n]", "",
           "def forbidden : List Forbidden := [\n  " + ",\n  ".join(forbidden) + "\n]", "",
           "def observations : List Observation := [\n  " + ",\n  ".join(obs) + "\n]", "",
           "def omissions : List Omission := [\n  " + ",\n  ".join(omissions) + "\n]", "", "end AppAudit", ""]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "AppAudit.lean").write_text("\n".join(out), encoding="utf-8", newline="\n")
    print(f"app audit: {len(rules)} rules, {len(forbidden)} soundness rules, {len(obs)} screens -> {OUT / 'AppAudit.lean'}")
    return 0


def features() -> int:
    """The USM as a model (ISS-127): the page's controls, the levels with their rows and papers, all papers."""
    html = (APP / "index.html").read_text(encoding="utf-8")
    boxes = re.findall(r'<input id="([\w-]+)" type="checkbox"([^>]*)/?>\s*([^<]{0,40})', html)
    toggles = [(i, "checked" in attrs, label.strip() or i) for i, attrs, label in boxes]
    toggles.append(("t-theory", 'aria-pressed="true"' in html.split('id="t-theory-toggle"', 1)[1][:200], "T-THEORY"))
    js = (APP / "main.js").read_text(encoding="utf-8")
    default_dim = int(re.search(r"\n  level: (\d+),", js)[1])
    papers = yaml.safe_load((U.parent / "Dist" / "PAPERS.yaml").read_text(encoding="utf-8"))["canonical_papers"]
    lv = levels()
    L = ["import Usm.Basic", "", "/-! Generated by sherlock/appaudit.py features from the app (index.html, main.js), registry/levels and",
         "    Dist/PAPERS.yaml (ISS-127). -/", "", "namespace UsmData", "", "open Usm", "",
         f"/-- The app's start today: main.js `state.level`, and the page's checked boxes. -/",
         f"def appDefault : Options := {{ dim := {default_dim}, on := {strs(sorted(i for i, c, _ in toggles if c))} }}", "",
         "def toggles : List (String × String) := [" + ", ".join(f"({s(i)}, {s(lab)})" for i, _, lab in toggles) + "]", "",
         "def rows : List Row := ["]
    rows = []
    for lid, y in lv.items():
        for row, dim in (("physical", 4), ("field", 8), ("mind", 11)):
            gate = '"t-theory"' if row != "physical" else '""'
            rows.append(f'  {{ level := {s(lid)}, row := {s(row)}, dim := {dim}, gate := {gate}, '
                        f'claim := {s(str(y.get("claims", {}).get(row, "")).upper())}, papers := {strs(str(x) for x in y.get("sources") or [])} }}')
    concepts = []
    for cp in sorted((U / "registry" / "concepts").glob("*.yaml")):
        c = yaml.safe_load(cp.read_text(encoding="utf-8")) or {}
        concepts.append(f'  ({s(c.get("id", cp.stem))}, {s(c.get("label", ""))}, {strs(c.get("levels") or [])}, {strs(str(x) for x in c.get("papers") or [])})')
    L += [",\n".join(rows), "]", "",
          "/-- The concept registry, shown on its levels in the Sherlock panel: (id, label, levels, papers). -/",
          "def concepts : List (String × String × List String × List String) := [\n" + ",\n".join(concepts) + "\n]", "",
          "/-- Other things the app shows that cite papers: its questions and tours, (kind/id, papers). -/",
          "def others : List (String × List String) := [\n" + ",\n".join(
              f'  ({s(kind + "/" + q.stem)}, {strs(sorted(set(re.findall(r"\b(P\d+|SH1)\b", q.read_text(encoding="utf-8")))))})'
              for kind in ("questions", "tours") for q in sorted((U / "registry" / kind).glob("*.yaml"))) + "\n]", "",
          "def papers : List (String × String × String) := [" + ",\n  ".join(
              f"({s(pp['id'])}, {s(pp.get('title', ''))}, {s(pp.get('discipline', ''))})" for pp in papers) + "]", "", "end UsmData", ""]
    (OUT / "UsmData.lean").write_text("\n".join(L), encoding="utf-8", newline="\n")
    print(f"usm: {len(toggles)} toggles, {len(rows)} rows of {len(lv)} levels, {len(papers)} papers -> {OUT / 'UsmData.lean'}")
    return 0


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "capture":
        return capture(sys.argv[2:])
    if cmd == "ocr":
        return ocr()
    if cmd == "lean":
        return lean()
    if cmd == "features":
        return features()
    print(__doc__)
    return 1


if __name__ == "__main__":
    sys.exit(main())
