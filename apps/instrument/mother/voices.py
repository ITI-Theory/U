"""voices.py: the same lines in every voice, to choose by ear (ISS-111: "Kokoro alongside Piper;
choose by ear").

    .venv/Scripts/python voices.py          # -> U/bld/voice/compare/*.wav and index.md

Piper (the private H-AL model, if installed) and a set of Kokoro voices (Apache-2.0), each with
the H-AL-ifier's delivery (slower, even, a pause after each sentence). Choose, then set
local_config "voice_engine" and "kokoro_voice" (README, the voice).
"""
from __future__ import annotations

import sys
from pathlib import Path

import bridge

U = Path(__file__).resolve().parents[3]
OUT = U / "bld" / "voice" / "compare"
LINES = ("Good evening. The field is calm, and the cathedral is quiet tonight. "
         "Raise the field, and watch the stone light up. This is a picture of a model, not a reading of you.")
KOKORO = ["bm_george", "bm_lewis", "bm_daniel", "bm_fable", "bf_emma", "bf_isabella", "am_michael", "am_onyx"]


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    made = []
    if bridge.PiperVoice is not None and bridge.voice_model().exists():
        (OUT / "piper-hal.wav").write_bytes(bridge.synthesize_piper(LINES))
        made.append(("piper-hal.wav", "Piper, the private H-AL model (private use only)"))
    if bridge.kokoro_available():
        for v in KOKORO:
            (OUT / f"kokoro-{v}.wav").write_bytes(bridge.synthesize_kokoro(LINES, v))
            made.append((f"kokoro-{v}.wav", f"Kokoro {v} (Apache-2.0: fine for a public voice)"))
    lines = ["# The voices, to choose by ear (ISS-111)", "", f"Each says: \"{LINES}\"", ""]
    lines += [f"- [{f}]({f}): {what}" for f, what in made]
    lines += ["", "Then, in the bridge's local config: `voice_engine: kokoro` and `kokoro_voice: <name>`,",
              "or `voice_engine: piper` for the H-AL model."]
    (OUT / "index.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"{OUT}: {len(made)} voices")
    return 0 if made else 1


if __name__ == "__main__":
    sys.exit(main())
