"""Where could [T]-Theory have an impact? (the author, 15 Oct: "casino style, worth a shot")

    python sherlock/impact.py        # writes bld/sherlock/impact.md; always exits 0 (a survey)

Crosses the Penrose catalogue (registry/catalogues/penrose-road-to-reality.yaml: for each chapter
of The Road to Reality, the programme's levels and their difference class: A new number, B new
behaviour, C cross-scale unification, D reinterpretation, E identical in the limit) with the
evidence: the concept registry's labels (registry/concepts), the Lean behind each concept (a
theorem, or an axiom; a `sorry`), and the programme's numbers against observation
(CosmologicalConstant.lean). A candidate is a place where the programme says something physics
does not already say (A or B) and has something behind it. Each candidate carries the reasons it
might not be an impact (the casino's odds): an axiom assumed rather than derived, a number off
by more than the observational error, a label below derived. Penrose is a baseline only; nothing
here claims his endorsement or any confirmation.
"""
from __future__ import annotations

import re
import sys
from collections import defaultdict
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock" / "impact.md"
CLASS_SCORE = {"A": 3, "B": 2, "C": 1, "D": 0, "E": 0}
LABEL_SCORE = {"kernel-verified": 3, "empirical-result": 3, "simulated": 2, "derived-under-assumptions": 1, "interpretive": 0, "open-hypothesis": 0}

# the programme's numbers against observation (CosmologicalConstant.lean; Planck 2018 values and
# their published 1-sigma errors)
NUMBERS = [
    ("Omega_Lambda (dark energy)", 7 / 11, 0.6847, 0.0073, "CosmologicalConstant.lean: Omega_Lambda_USF = 7/11"),
    ("Omega_DM (dark matter)", 3 / 11, 0.2645, 0.0057, "CosmologicalConstant.lean: Omega_DM_USF = 3/11"),
    ("Omega_b (baryons)", 1 / 22, 0.0493, 0.0006, "CosmologicalConstant.lean: Omega_b_USF = 1/22"),
]

# the programme's predictions that an experiment could break, with the latest data checked
# (15 Oct 2026); a null result never confirms, it only fails to refute
PREDICTIONS = [
    ("w = -1 exactly, no drift of the dark-energy density (P21)",
     "DESI DR2 BAO with CMB and supernovae prefers evolving dark energy at 2.8 to 4.2 sigma, depending on the supernova sample "
     "(DESI 2025, arXiv:2503.14738; arXiv:2507.09981); below 2 sigma with non-Planck CMB. Not a detection yet: if it reaches "
     "5 sigma, P21's own falsifier is met",
     "under pressure"),
    ("no non-gravitational dark-matter detection, ever (P22)",
     "no direct detection so far; consistent, but the same is predicted by every dark-matter model that couples only by gravity, "
     "so a null does not single the programme out",
     "consistent, not distinctive"),
    ("the free field satisfies the Osterwalder-Schrader axioms (P14)",
     "USF_OSAxioms.lean applies OSforGFF's gaussianFreeField_satisfies_all_OS_axioms_dim4 (Douglas, Hoback, Mei, Nissim 2026) "
     "with the mass renamed k: a correct reuse of their theorem, not a new result",
     "not new"),
]


def lean_kind(module: str, name: str) -> str:
    f = U / "paper" / "proofs" / f"{module}.lean"
    if not f.exists():
        return "missing"
    t = f.read_text(encoding="utf-8")
    m = re.search(rf"^\s*(axiom|theorem|lemma|def|noncomputable def|structure|inductive|class)\s+{re.escape(name)}\b", t, re.M)
    if not m:
        return "missing"
    kind = m.group(1).replace("noncomputable ", "")
    if kind in ("theorem", "lemma"):
        body = t[m.end():m.end() + 4000].split("\ntheorem ")[0]
        if "sorry" in body:
            return "sorry"
    return kind


def main(argv: list[str]) -> int:
    cat = yaml.safe_load((U / "registry" / "catalogues" / "penrose-road-to-reality.yaml").read_text(encoding="utf-8"))
    concepts = [yaml.safe_load(p.read_text(encoding="utf-8")) for p in sorted((U / "registry" / "concepts").glob("*.yaml"))]
    by_level = defaultdict(list)
    for c in concepts:
        for lv in c.get("levels") or []:
            by_level[lv].append(c)
    # one row per level: the chapters it answers, the concepts behind it, and the doubts
    levels = {}
    for ch in cat["chapters"]:
        for lv in ch.get("levels") or []:
            cls = lv["difference_class"]
            if CLASS_SCORE[cls] == 0:
                continue
            row = levels.setdefault((lv["id"], cls), {"label": lv.get("class_label", ""), "chapters": []})
            row["chapters"].append(f"{ch['chapter']}")
    rows = []
    for (lv, cls), row in levels.items():
        ev, doubts, backing = 0, [], []
        for c in sorted(by_level.get(lv, []), key=lambda c: -LABEL_SCORE.get(c.get("label") or "", 0)):
            lab = c.get("label") or "open-hypothesis"
            lk = lean_kind(c["lean"]["module"], c["lean"]["name"]) if c.get("lean") else "none"
            ev = max(ev, LABEL_SCORE.get(lab, 0) + (1 if lk == "theorem" else 0))
            backing.append(f"{c['concept']} ({lab}; Lean {lk})")
            if lk == "axiom":
                doubts.append(f"`{c['lean']['name']}` is an axiom: assumed, not derived")
            if lk == "sorry":
                doubts.append(f"`{c['lean']['name']}` rests on a sorry")
            if c.get("notes") and LABEL_SCORE.get(lab, 0) >= 2:
                doubts.append(f"{c['concept']}: {c['notes'].strip()}")
        if not backing:
            doubts.append("no concept in the registry backs this level yet")
        if lv == "observable-universe":
            for name, tt, obs, err, _ in NUMBERS:
                sig = abs(tt - obs) / err
                if sig > 3:
                    doubts.append(f"{name} {tt:.4f} vs observed {obs}: {sig:.1f} sigma off")
            ev = min(ev, 1)  # a number several sigma off is not yet evidence
        if cls == "C":
            doubts.append("a unification is a claim of the same form, not a new prediction")
        rows.append((CLASS_SCORE[cls] * (1 + ev), lv, cls, row["label"], row["chapters"], backing, doubts))
    rows.sort(key=lambda r: (-r[0], r[1]))
    out = ["# Where could [T]-Theory have an impact? (a survey, ISS-106)", "",
           "The levels where the programme claims, against Penrose's Road to Reality, a new number (A), new",
           "behaviour (B) or a cross-scale unification (C); ranked by the class times the evidence behind",
           "the level, each with the reasons it might not be an impact. A survey to choose where to look,",
           "not a finding. Kernel-verified means the Lean statement is proved; it says nothing about",
           "whether the statement is the right physics.", "",
           "## The numbers against observation", "",
           "| quantity | [T]-Theory | observed (Planck 2018) | off by | in sigma | source |", "|---|---|---|---|---|---|"]
    for name, tt, obs, err, src in NUMBERS:
        out.append(f"| {name} | {tt:.4f} | {obs} ± {err} | {100 * (tt - obs) / obs:+.1f}% | {abs(tt - obs) / err:.1f} σ | {src} |")
    out += ["", "A difference of several sigma is a disagreement, not a near miss: as predictions these numbers",
            "are already ruled out at the precision of the data, unless a correction is derived (the papers",
            "call them model-derived comparisons that depend on named axioms: THEORY-STATUS.md).", "",
            "## The predictions on the line", "", "| prediction | the latest data | verdict |", "|---|---|---|"]
    out += [f"| {pr} | {data} | {v} |" for pr, data, v in PREDICTIONS]
    out += ["", "## The ranked levels", "", "| score | level | class | Penrose chapters | backing | why it might not be |", "|---|---|---|---|---|---|"]
    for score, lv, cls, cl, chs, backing, doubts in rows:
        out.append(f"| {score} | {lv} | {cls} ({cl}) | {', '.join(chs)} | {'; '.join(backing[:3]) or '-'} | {'; '.join(dict.fromkeys(doubts)) or '-'} |")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(out) + "\n", encoding="utf-8")
    top = [r for r in rows if r[0] >= 6]
    print(f"bld/sherlock/impact.md: {len(rows)} levels claim more than the textbook; {len(top)} with evidence behind them")
    for name, tt, obs, err, _ in NUMBERS:
        print(f"  {name}: {tt:.4f} vs {obs} ± {err}: {abs(tt - obs) / err:.1f} sigma")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
