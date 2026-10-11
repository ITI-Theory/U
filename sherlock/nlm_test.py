"""Can a language model do Sherlock's job from an uploaded source? (ISS-055)

Asks the Sherlock-UAT notebook the same five questions about The Tensor (P8)
and P11 with different amounts of OpenCyc selected as sources (EXPERIMENTS:
none, all of NextKB, Sherlock's slice, one microtheory): the slicing
question, measured. Questions 1-3 need common-sense typing (Sherlock's
OpenCyc findings); 4-5 are controls on the papers' own numbers (Sherlock's
arithmetic findings), which OpenCyc should not change. Answers are scored
against the registry (registry/affidavits/).

Run with the MOTHER bridge's Python (its NotebookLM login):
    apps/instrument/mother/.venv/Scripts/python.exe sherlock/nlm_test.py --exp N [--q 3,4,5] [--dry-run]

Each experiment adds to bld/sherlock/nlm-exp<N>.json (answers already there for a question and
condition are kept), so a run cut short by the rate limit can be finished later.
"""
from __future__ import annotations

import asyncio
import json
import sys
import time
from pathlib import Path

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock"
NOTEBOOK = "924056c7-8ea9-4ac3-aa38-39bbb5ba2f11"  # Sherlock-UAT (Me/notebooklm/Sherlock-UAT/sources.yaml)
PAPERS = ["The Tensor (P8, frozen 2d36eaf)", "The Zoomable Universal Somatic Field (P11, frozen 3c97a44)"]
EXPERIMENTS = {  # how much OpenCyc the model gets: the slicing question, measured
    0: {"papers only": [], "papers + all of OpenCyc": ["OpenCyc (NextKB) part"]},       # 0 / 10.6M words
    1: {"papers + Sherlock slice": ["OpenCyc pack (Sherlock slice)"]},                   # 32k words
    2: {"papers + UniversalVocabularyMt": ["OpenCyc UniversalVocabularyMt part"]},       # 3.6M words, one microtheory
}
PAUSE = 25  # seconds between questions (the bridge's pace)

QUESTIONS = [
    "In The Tensor, the seven primary axes are called emotional modes. Using only the selected sources, "
    "is each of the seven actually an emotion? If any of them is a different kind of thing, say what kind, "
    "and whether calling it an emotional mode leads to a logical contradiction. Cite the facts you use.",
    "The Tensor says the River Film score can be realised in three containers and that 'All three are the same "
    "film'. Is that literally coherent? Which relation between the three container films and the score would "
    "make the claim true, and which reading would make it false? Cite the facts you use.",
    "P11 says 'A conscious percept is a pole in the propagator'. Taken literally, is that a category error? "
    "What kind of thing is a percept, and what kind of thing is a pole? Cite the facts you use.",
    "Check The Tensor's own statements and numbers: is 'Two operating modes' right? Does Threshold 1's "
    "condition 'F > 0.7' ever hold on the Appendix keyframes? Does Threshold 2's condition hold at its "
    "declared t = 0.74?",
    "Check P11's own statements and numbers: how many scale levels does the catalogue cover, and does the "
    "text say the same everywhere? Is 'twenty-five orders of magnitude' between Scale 4 and Scale 6 "
    "consistent with their stated length scales? Is the scale dial monotone in length?",
]


async def main(exp: int, qs: list[int], dry: bool) -> int:
    from notebooklm import NotebookLMClient
    # answers grounded in 24 large sources come back as replies of several hundred MB
    async with NotebookLMClient.from_storage(chat_response_max_bytes=1536 * 1024 * 1024) as client:
        sources = {getattr(s, "title", ""): s.id for s in await client.sources.list(NOTEBOOK)}
        wanted = PAPERS + [t for ts in EXPERIMENTS[exp].values() for t in ts]
        missing = [t for t in wanted if not any(t in k for k in sources)]
        if missing:
            print("missing sources:", missing)
            return 1
        ids = lambda titles: [v for k, v in sources.items() if any(t in k for t in titles)]
        conditions = {c: ids(PAPERS + ts) for c, ts in EXPERIMENTS[exp].items()}
        if dry:
            print({k: len(v) for k, v in conditions.items()})
            return 0
        store = OUT / f"nlm-exp{exp}.json"
        results = json.loads(store.read_text(encoding="utf-8")) if store.exists() else []
        done = {(r["q"], r["condition"]) for r in results if not r["answer"].startswith("(no answer")}
        results = [r for r in results if (r["q"], r["condition"]) in done]
        for qi, q in enumerate(QUESTIONS, 1):
            if qi not in qs:
                continue
            for cond, sids in conditions.items():
                if (qi, cond) in done:
                    continue
                try:
                    r = await client.chat.ask(NOTEBOOK, q, source_ids=sids)
                    answer = getattr(r, "answer", str(r))
                except Exception as e:  # keep going: one failed ask must not lose the others
                    r, answer = None, f"(no answer: {type(e).__name__}: {str(e)[:200]})"
                results.append({"q": qi, "question": q, "condition": cond, "answer": answer})
                print(f"Q{qi} [{cond}]: {len(answer)} chars", flush=True)
                OUT.mkdir(parents=True, exist_ok=True)
                store.write_text(json.dumps(results, indent=1, ensure_ascii=False), encoding="utf-8")
                conv = getattr(r, "conversation_id", None) if r else None
                if conv:  # a fresh conversation for every ask: no carry-over between conditions
                    try:
                        await client.chat.delete_conversation(NOTEBOOK, conv)
                    except Exception:
                        pass
                time.sleep(PAUSE)
    OUT.mkdir(parents=True, exist_ok=True)
    md = [f"# Can NotebookLM do Sherlock's job? Sherlock-UAT, experiment {exp}", ""]
    for qi, q in enumerate(QUESTIONS, 1):
        md += [f"## Q{qi}", "", f"> {q}", ""]
        for r in results:
            if r["q"] == qi:  # every condition answered so far
                md += [f"### {r['condition']}", "", r["answer"], ""]
    (OUT / f"nlm-exp{exp}.md").write_text("\n".join(md), encoding="utf-8", newline="\n")
    print(f"bld/sherlock/nlm-exp{exp}.md")
    return 0


if __name__ == "__main__":
    args = sys.argv[1:]
    exp = int(args[args.index("--exp") + 1]) if "--exp" in args else 0
    qs = [int(x) for x in args[args.index("--q") + 1].split(",")] if "--q" in args else list(range(1, 6))
    sys.exit(asyncio.run(main(exp, qs, "--dry-run" in args)))
