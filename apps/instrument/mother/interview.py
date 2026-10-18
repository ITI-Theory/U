"""interview.py: voice both ways at the author's desk (ISS-111). A question is spoken, his answer
is heard and written down.

    .venv\\Scripts\\python interview.py "<question>" [--id ISS-115] [--voice ...] [--model large-v3]
                                        [--input N] [--max 120] [--say-only]

Speaking: Azure's neural voices when AZURE_SPEECH_KEY and AZURE_SPEECH_REGION are set (in the
environment only, never in a file; the free tier, 0.5 million characters a month, is plenty;
default en-GB-RyanNeural), else Kokoro on this machine (bm_george). Hearing: Whisper large-v3 on
this machine (the GPU when it can, else the CPU), so the author's voice never leaves it. A beep
starts the listening; two and a half seconds of quiet after speech end it. Answers are private:
Me/todo/answers/<date>.md (the question, the transcript, the time).
"""
from __future__ import annotations

import argparse
import datetime as dt
import io
import os
import sys
import time
import urllib.request
import wave
from pathlib import Path
from xml.sax.saxutils import escape

import numpy as np
import sounddevice as sd

HERE = Path(__file__).resolve().parent
ME = HERE.parents[4] / "Me"
SR_IN = 16000
# words Whisper would otherwise mishear
PROMPT = ("[T]-Theory, the Soma Machine, H-AL, MOTHER, Sherlock, the River Film, The Tensor, "
          "Lean, Zenodo, Lulu, the Field Atlas, ROOTED, ISS, NKS, Ableton Live, Dorico.")


def wav_to_array(data: bytes):
    with wave.open(io.BytesIO(data)) as w:
        rate = w.getframerate()
        a = np.frombuffer(w.readframes(w.getnframes()), dtype="<i2").astype("float32") / 32768
    return a, rate


def tts_azure(text: str, voice: str) -> bytes:
    key, region = os.environ["AZURE_SPEECH_KEY"], os.environ["AZURE_SPEECH_REGION"]
    lang = "-".join(voice.split("-")[:2])
    ssml = (f"<speak version='1.0' xml:lang='{lang}'><voice name='{voice}'>"
            f"{escape(text)}</voice></speak>").encode("utf-8")
    req = urllib.request.Request(
        f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1", data=ssml, method="POST",
        headers={"Ocp-Apim-Subscription-Key": key, "Content-Type": "application/ssml+xml",
                 "X-Microsoft-OutputFormat": "riff-24khz-16bit-mono-pcm", "User-Agent": "soma-interview"})
    return urllib.request.urlopen(req, timeout=30).read()


def speak(text: str, voice: str | None) -> str:
    if os.environ.get("AZURE_SPEECH_KEY") and os.environ.get("AZURE_SPEECH_REGION"):
        data, engine = tts_azure(text, voice or "en-GB-RyanNeural"), "azure"
    else:
        sys.path.insert(0, str(HERE))
        from bridge import synthesize_kokoro
        data, engine = synthesize_kokoro(text, voice if voice and "Neural" not in voice else "bm_george"), "kokoro"
    a, rate = wav_to_array(data)
    sd.play(a, rate)
    sd.wait()
    return engine


def beep(freq: float, secs: float = 0.15):
    t = np.arange(int(44100 * secs)) / 44100
    sd.play(0.25 * np.sin(2 * np.pi * freq * t) * np.minimum(1, (secs - t) / 0.03), 44100)
    sd.wait()


def listen(device: int | None, max_secs: float) -> np.ndarray:
    """Record until 2.5 s of quiet after speech (or max_secs); the noise floor from the first 0.5 s."""
    block = int(SR_IN * 0.03)
    chunks, floor, spoke, quiet = [], [], 0.0, 0.0
    with sd.InputStream(samplerate=SR_IN, channels=1, dtype="float32", device=device, blocksize=block) as s:
        t0 = time.time()
        while time.time() - t0 < max_secs:
            x, _ = s.read(block)
            x = x[:, 0]
            chunks.append(x.copy())
            rms = float(np.sqrt(np.mean(x ** 2)))
            if time.time() - t0 < 0.5:
                floor.append(rms)
                continue
            gate = max(3 * (np.median(floor) if floor else 0.003), 0.008)
            if rms > gate:
                spoke += 0.03
                quiet = 0.0
            else:
                quiet += 0.03
            if spoke > 0.5 and quiet > 2.5:
                break
    return np.concatenate(chunks) if chunks else np.zeros(1, "float32")


def load_model(name: str):
    """Whisper on the GPU when CUDA really runs (a one-second test), else on the CPU."""
    from faster_whisper import WhisperModel
    import glob
    # the CUDA libraries come as pip wheels (nvidia-cublas-cu12, nvidia-cudnn-cu12); Windows must be told where
    for d in glob.glob(str(Path(sys.prefix) / "Lib" / "site-packages" / "nvidia" / "*" / "bin")):
        os.add_dll_directory(d)
        os.environ["PATH"] = d + os.pathsep + os.environ["PATH"]
    try:
        m = WhisperModel(name, device="cuda", compute_type="int8_float16")
        list(m.transcribe(np.zeros(SR_IN, "float32"), language="en")[0])
        return m, "cuda"
    except Exception as e:
        print(f"(GPU not used: {str(e)[:80]})")
        return WhisperModel(name, device="cpu", compute_type="int8"), "cpu"


def transcribe(model, audio: np.ndarray) -> str:
    segs, _ = model.transcribe(audio, language="en", initial_prompt=PROMPT, vad_filter=True, beam_size=5)
    return " ".join(s.text.strip() for s in segs).strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("question")
    ap.add_argument("--id", default="")
    ap.add_argument("--voice")
    ap.add_argument("--model", default="large-v3")
    ap.add_argument("--input", type=int)
    ap.add_argument("--max", type=float, default=120)
    ap.add_argument("--say-only", action="store_true")
    a = ap.parse_args()
    model, where = (None, None) if a.say_only else load_model(a.model)
    engine = speak(a.question, a.voice)
    if a.say_only:
        print(f"spoken ({engine})")
        return
    beep(880)
    audio = listen(a.input, a.max)
    beep(440)
    t = time.time()
    text = transcribe(model, audio)
    print(f"[{engine} voice; Whisper {a.model} on {where}, {len(audio) / SR_IN:.0f} s heard, "
          f"{time.time() - t:.1f} s to transcribe]")
    print(f"ANSWER: {text}")
    out = ME / "todo" / "answers" if ME.exists() else HERE / "answers"
    out.mkdir(parents=True, exist_ok=True)
    f = out / f"{dt.date.today():%Y-%m-%d}.md"
    with f.open("a", encoding="utf-8") as fh:
        fh.write(f"\n## {dt.datetime.now():%H:%M} {a.id}\n\nQ: {a.question}\n\nA (spoken, transcribed): {text}\n")
    print(f"written: {f}")


if __name__ == "__main__":
    main()
