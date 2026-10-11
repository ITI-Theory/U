#!/usr/bin/env python3
"""
validate_cycrefs.py — Cross-check every CycRef string in EmotionOntology.lean
                      against the live TypeDB knowledge base.

Reports:
  ✓  found in TypeDB (with URI and first parent class)
  ✗  NOT found — the string needs fixing in EmotionOntology.lean
  ?  suggestion — closest match found in KB

Usage
─────
  python scripts/validate_cycrefs.py
  python scripts/validate_cycrefs.py --fix    # show suggested replacements
"""

import sys
from query_cyc import cyc_lookup, cyc_search

# ── All CycRef strings used in EmotionOntology.lean ──────────────────────────
# Grouped by role.  Strip '#$' to get the TypeDB cyc-label search term.

EMOTION_PRIMITIVES = [
    "#$Joy-Emotion",
    "#$Sadness-Emotion",
    "#$Fear-Emotion",
    "#$Anger-Emotion",
    "#$Disgust-Emotion",
    "#$Surprise-Emotion",
    "#$Trust-Emotion",
    "#$Anticipation-Emotion",
]

MECHANISM_REFS = [
    "#$AcousticStartleResponse",
    "#$RhythmicEntrainmentPsychological",
    "#$ClassicalConditioning",
    "#$EmotionalContagion",
    "#$MentalImagery",
    "#$EpisodicMemoryRetrieval",
    "#$ExpectancyViolation",
    "#$AestheticAppraisal",
]

PREDICATE_REFS = [
    "#$emotionalBlend",
    "#$emotionalInhibition",
    "#$causes",
]

ALL_REFS = EMOTION_PRIMITIVES + MECHANISM_REFS + PREDICATE_REFS

# ── run ───────────────────────────────────────────────────────────────────────

def validate(fix: bool = False) -> None:
    print("Validating CycRef strings in EmotionOntology.lean against TypeDB …\n")

    ok = 0; missing = 0

    for group, refs in [
        ("Emotion primitives",  EMOTION_PRIMITIVES),
        ("Mechanism references", MECHANISM_REFS),
        ("Predicate references", PREDICATE_REFS),
    ]:
        print(f"── {group} " + "─" * (55 - len(group)))
        for ref in refs:
            label = ref.lstrip("#$")
            data  = cyc_lookup(label)

            if "error" in data:
                missing += 1
                print(f"  ✗  {ref}")
                if "suggestions" in data and data["suggestions"]:
                    best = data["suggestions"]
                    print(f"     → suggestions: {', '.join(best[:3])}")
                    if fix:
                        print(f"     → replace with: #${best[0]}")
                else:
                    # Try a broader search
                    word = label.replace("-", "").replace("Emotion", "").strip()
                    if word:
                        hits = cyc_search(word[:12], limit=3)
                        if hits:
                            print(f"     → search '{word[:12]}': "
                                  + ", ".join(h["label"] for h in hits))
            else:
                ok += 1
                uri_short = data["uri"].split("/")[-1]
                parent    = data["parents"][0] if data["parents"] else "—"
                comment   = data["comment"][:60] + "…" if data["comment"] else ""
                print(f"  ✓  {ref:<42s}  isa {parent}")
                if comment:
                    print(f"     \"{comment}\"")
        print()

    print(f"Result: {ok} found, {missing} missing out of {len(ALL_REFS)} refs")
    if missing == 0:
        print("All CycRef strings validated — EmotionOntology.lean is in sync with TypeDB.")
    else:
        print("Fix: update the ✗ entries in the CycRef interpreter instance.")
        print("     Run with --fix for suggested replacements.")

    return missing


def main() -> None:
    fix = "--fix" in sys.argv
    # Run from the repo root so relative imports work
    import os
    os.chdir(os.path.join(os.path.dirname(__file__), ".."))
    sys.path.insert(0, "scripts")
    n_missing = validate(fix=fix)
    sys.exit(1 if n_missing else 0)


if __name__ == "__main__":
    main()
