"""dictate.py: speak a UAT finding, get it as text (ISS-111, author 16 Oct: "speech to text in HAL,
need that for UAT").

    python uat/scripts/dictate.py            # record until Enter, print the text
    python uat/scripts/dictate.py file.wav   # transcribe a WAV file

Local only: faster-whisper on the CPU (the audio never leaves the machine). The model downloads
once into the Hugging Face cache (`small.en`, about 480 MB; SOMA_WHISPER=base.en for a smaller,
rougher one). Needs: pip install faster-whisper sounddevice.
"""
from __future__ import annotations

import os
import sys
import threading

os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")
RATE = 16000
MODEL = os.environ.get("SOMA_WHISPER", "small.en")
_model = None


def available() -> str | None:
    """None when dictation can run, else what is missing."""
    try:
        import faster_whisper  # noqa: F401
        import sounddevice  # noqa: F401
    except ImportError as e:
        return f"{e.name} is not installed (pip install faster-whisper sounddevice)"
    return None


def _whisper():
    global _model
    if _model is None:
        from faster_whisper import WhisperModel
        _model = WhisperModel(MODEL, device="cpu", compute_type="int8")
    return _model


def read_wav(path: str):
    """A WAV file as float32 mono at 16 kHz (the standard library and numpy; no ffmpeg)."""
    import wave
    import numpy as np
    with wave.open(path, "rb") as w:
        n, ch, width, rate = w.getnframes(), w.getnchannels(), w.getsampwidth(), w.getframerate()
        raw = w.readframes(n)
    a = np.frombuffer(raw, dtype={1: np.uint8, 2: np.int16, 4: np.int32}[width]).astype("float32")
    a = (a - 128) / 128 if width == 1 else a / float(2 ** (8 * width - 1))
    a = a.reshape(-1, ch).mean(axis=1)
    if rate != RATE:
        a = np.interp(np.arange(0, len(a), rate / RATE), np.arange(len(a)), a).astype("float32")
    return a


def transcribe(audio) -> str:
    """audio: a float32 mono array at 16 kHz, or a path to a WAV file."""
    if isinstance(audio, str):
        audio = read_wav(audio)
    segments, _ = _whisper().transcribe(audio, language="en", vad_filter=True, beam_size=5)
    return " ".join(s.text.strip() for s in segments).strip()


def record() -> "object":
    """Record from the default microphone until Enter; return a float32 mono array."""
    import numpy as np
    import sounddevice as sd
    chunks, stop = [], threading.Event()

    def take(indata, frames, time, status):  # noqa: ARG001
        chunks.append(indata[:, 0].copy())

    with sd.InputStream(samplerate=RATE, channels=1, dtype="float32", callback=take):
        threading.Thread(target=lambda: (input(), stop.set()), daemon=True).start()
        print("  ● recording: speak, then press Enter", flush=True)
        stop.wait()
    return np.concatenate(chunks) if chunks else np.zeros(0, dtype="float32")


def dictate() -> str:
    """Record, then transcribe; '' if nothing was said or dictation is not available."""
    missing = available()
    if missing:
        print(f"  (no dictation: {missing})")
        return ""
    audio = record()
    if len(audio) < RATE // 2:
        return ""
    print("  … transcribing", flush=True)
    return transcribe(audio)


def main(argv: list[str]) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    missing = available()
    if missing:
        print(missing)
        return 1
    print(transcribe(argv[0]) if argv else dictate())
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
