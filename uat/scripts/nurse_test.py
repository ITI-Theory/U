#!/usr/bin/env python3
"""The nurse test through the Gemini API (UAT, uat/RC3/nurse-test.md).

    python uat/scripts/nurse_test.py --dry-run                 # show what would be asked
    python uat/scripts/nurse_test.py [--levels 0,1,2] [--personas nurse,gp] [--model gemini-2.5-flash]

For each persona and level of context, one conversation of the six questions, through the
Gemini API (the key from the environment, GEMINI_API_KEY; never printed or written). Calls are
throttled (--pause, default 8 s). Each conversation is scored automatically against the score
sheet as a first pass for a person to read: core, proof, clinical, quantum, invented, jargon.
Writes uat/results/nurse-api-<date>.md and .json.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

U = Path(__file__).resolve().parents[2]
HERE = U / "uat" / "RC3" / "nurse"
OUT = U / "uat" / "results"
API = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

PERSONAS = {
    "nurse": "I'm a nurse on a ward. A patient's friend told me he's done this thing called [T]-Theory",
    "gp": "I'm a GP in a busy surgery. A patient brought in something called [T]-Theory",
    "therapist": "I'm a psychotherapist. A client mentioned something called [T]-Theory in a session",
    "teenager": "I'm 16. My uncle keeps talking about something called [T]-Theory",
    "physicist": "I'm a physicist. Someone sent me something called [T]-Theory",
    "journalist": "I'm a science journalist and might write about something called [T]-Theory",
}
QUESTIONS = [
    "What is [T]-Theory, in two sentences?",
    "How would you explain it to a friend over coffee?",
    "What is its most surprising claim?",
    "Is any of it proven? What exactly?",
    "Should I use it with a patient, or tell people it works?",
    "What is wrong with it, or what should I be careful about?",
]
LEVELS = {0: None, 1: "level1-pitch.txt", 2: "level2-cheatsheet.txt"}
JARGON = ["11D", "eleven-dimensional", "Green's function", "propagator", "Lean", "BRECVEMA", "Hopfield",
          "attractor", "co-identification", "orbifold", "G2", "G₂", "WKB", "renormalisation", "Osterwalder"]
NEG = re.compile(r"\b(not|no|never|isn't|aren't|unproven|unverified|hypothes\w*|model|machine-checked|formal|Lean|"
                 r"verified in|should not|shouldn't|don't|do not|cannot)\b", re.I)


def first_prompt(persona: str, level: int) -> str:
    head = PERSONAS[persona]
    if LEVELS[level]:
        text = (HERE / LEVELS[level]).read_text(encoding="utf-8").strip()
        return f"{head}, and here is what I was given:\n\n{text}\n\n{QUESTIONS[0]}"
    return f"{head}. {QUESTIONS[0]}"


def ask(model: str, key: str, contents: list[dict]) -> str:
    req = urllib.request.Request(API.format(model=model), method="POST",
                                 data=json.dumps({"contents": contents}).encode("utf-8"),
                                 headers={"Content-Type": "application/json", "x-goog-api-key": key})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                data = json.loads(r.read().decode("utf-8"))
            parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
            return "".join(p.get("text", "") for p in parts).strip() or "(empty answer)"
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 3:
                time.sleep(30 * (attempt + 1))
                continue
            return f"(HTTP {e.code}: {e.read().decode('utf-8', 'replace')[:300]})"
    return "(rate limited)"


def sentences_with(text: str, rx: str) -> list[str]:
    return [s for s in re.split(r"(?<=[.!?])\s+", text) if re.search(rx, s, re.I)]


def score(level: int, answers: list[str]) -> dict:
    allt = "\n".join(answers)
    core = bool(re.search(r"\bfield\b", " ".join(answers[:2]), re.I) and
                re.search(r"emotion|feeling|affect|mind", " ".join(answers[:2]), re.I))
    proof = [s for s in sentences_with(allt, r"\bprov(en|es|ed)\b") if not NEG.search(s)]
    clinical_ok = bool(re.search(r"\b(no|not|shouldn't|should not|don't|do not|wouldn't|avoid|caution)\b", answers[4], re.I))
    quantum = [s for s in sentences_with(allt, r"quantum advantage|D-Wave|quantum computer") if not NEG.search(s)]
    knows_not = bool(re.search(r"not familiar|don't have (any )?information|no (reliable )?information|not aware|"
                               r"couldn't find|can't find|unknown|not a (widely )?recogni[sz]ed|no record", answers[0], re.I))
    jargon = sorted({j for j in JARGON if re.search(re.escape(j), allt, re.I)})
    return {"core": core, "proof_overclaims": proof, "clinical_ok": clinical_ok, "quantum_overclaims": quantum,
            "invented_risk": level == 0 and not knows_not, "jargon": jargon}


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--levels", default="0,1,2")
    ap.add_argument("--personas", default=",".join(PERSONAS))
    ap.add_argument("--model", default="gemini-2.5-flash")
    ap.add_argument("--pause", type=float, default=8.0)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args(argv)
    levels = [int(x) for x in a.levels.split(",")]
    personas = a.personas.split(",")
    runs = [(p, lv) for lv in levels for p in personas]
    if a.dry_run:
        for p, lv in runs:
            print(f"--- {p}, level {lv}: {len(QUESTIONS)} turns; first prompt {len(first_prompt(p, lv))} chars")
        print(f"{len(runs)} conversations, {len(runs) * len(QUESTIONS)} calls")
        return 0
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        print("GEMINI_API_KEY is not set (user environment, like the Zenodo tokens)", file=sys.stderr)
        return 1
    results = []
    for p, lv in runs:
        contents, answers = [], []
        for i, q in enumerate(QUESTIONS):
            contents.append({"role": "user", "parts": [{"text": first_prompt(p, lv) if i == 0 else q}]})
            ans = ask(a.model, key, contents)
            contents.append({"role": "model", "parts": [{"text": ans}]})
            answers.append(ans)
            time.sleep(a.pause)
        s = score(lv, answers)
        results.append({"persona": p, "level": lv, "answers": answers, "score": s})
        flags = [k for k, v in (("core missing", not s["core"]), ("proof", s["proof_overclaims"]), ("clinical", not s["clinical_ok"]),
                                ("quantum", s["quantum_overclaims"]), ("invented?", s["invented_risk"])) if v]
        print(f"{p:11} level {lv}: {'; '.join(flags) or 'pass'}; jargon {', '.join(s['jargon']) or '-'}", flush=True)
    stamp = dt.datetime.now().strftime("%Y%m%d-%H%M")
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / f"nurse-api-{stamp}.json").write_text(json.dumps({"model": a.model, "results": results}, indent=1, ensure_ascii=False),
                                                 encoding="utf-8", newline="\n")
    lines = [f"# The nurse test through the API ({a.model}, {stamp})", "",
             "First-pass scores for a person to read (uat/RC3/nurse-test.md); every answer is below.", "",
             "| persona | level | core | proof | clinical | quantum | invented? | jargon |", "|---|---|---|---|---|---|---|---|"]
    for r in results:
        s = r["score"]
        lines.append(f"| {r['persona']} | {r['level']} | {'yes' if s['core'] else '**no**'} | {len(s['proof_overclaims']) or '-'} | "
                     f"{'ok' if s['clinical_ok'] else '**check**'} | {len(s['quantum_overclaims']) or '-'} | "
                     f"{'**check**' if s['invented_risk'] else '-'} | {', '.join(s['jargon']) or '-'} |")
    for r in results:
        lines += ["", f"## {r['persona']}, level {r['level']}", ""]
        for q, ans in zip(QUESTIONS, r["answers"]):
            lines += [f"**{q}**", "", ans, ""]
        for k in ("proof_overclaims", "quantum_overclaims"):
            for snt in r["score"][k]:
                lines.append(f"> flagged ({k}): {snt}")
    (OUT / f"nurse-api-{stamp}.md").write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    print(f"uat/results/nurse-api-{stamp}.md")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
