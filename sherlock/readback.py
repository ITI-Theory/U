"""readback.py: does a recording carry the score? (ISS-115, the third of Sherlock's tests for a piece
that externalises the author's emotions: provenance, a declared mapping, read-back, recognition).

    python sherlock/readback.py <recording.wav> <score id> [--start S] [--end E]

The score (registry/scores/<id>.yaml) runs over the recording, from S to E seconds (default: all of
it). For each heard channel of the sound grammar that read-back can measure, the expected curve
(from the score, through the channel's declared mapping) is compared with the measured one, window
by window (Pearson r): brightness (the spectral centroid; the `brightness` channel: awe and curiosity
up, grief down) and note density (onsets a second; the `note-rate` channel: curiosity up, grief down).
A channel carries the score at r >= 0.5. Channels it cannot measure yet are listed, not passed.
Read-back is evidence that the mapping was followed, not that anyone felt anything.
"""
from __future__ import annotations

import argparse
import sys
import wave
from pathlib import Path

import numpy as np
import yaml

U = Path(__file__).resolve().parents[1]
WIN = 2.0     # seconds per window
MODES = ["S", "F", "C", "A", "G", "L", "PV"]
# expected curve per measurable channel, from the mapping in explorer-music.js (sound-grammar.yaml)
EXPECTED = {
    "brightness": lambda m: 400 + 2200 * m["A"] + 600 * m["C"] - 300 * m["G"],
    "note-rate": lambda m: 1 / (1.5 + 5 * (1 - m["C"]) + 3 * m["G"]),
}
NOT_YET = ["fear-tritone (pitch content)", "safety-reverb (decay time)", "language-triad (harmony)", "preverbal-grains (noise texture)", "cathedral-echo (echo length)"]


def read(path: Path):
    with wave.open(str(path), "rb") as w:
        ch, width, rate, n = w.getnchannels(), w.getsampwidth(), w.getframerate(), w.getnframes()
        a = np.frombuffer(w.readframes(n), dtype={2: "<i2", 4: "<i4"}[width]).astype("float32")
    a = a.reshape(-1, ch).mean(axis=1) / float(2 ** (8 * width - 1))
    return a, rate


def measure(a, rate):
    """Per window: the spectral centroid (Hz) and the onset rate (onsets a second)."""
    hop, win = 512, 2048
    frames = (len(a) - win) // hop
    f = np.fft.rfftfreq(win, 1 / rate)
    spec = np.empty((frames, len(f)), "float32")
    w = np.hanning(win).astype("float32")
    for s in range(0, frames, 4096):
        idx = np.arange(s, min(frames, s + 4096))[:, None] * hop + np.arange(win)[None, :]
        spec[s: s + len(idx)] = np.abs(np.fft.rfft(a[idx] * w, axis=1))
    energy = spec.sum(axis=1) + 1e-9
    centroid = (spec * f).sum(axis=1) / energy
    flux = np.maximum(0, np.diff(np.log1p(spec), axis=0)).sum(axis=1)
    thresh = np.median(flux) + 2 * flux.std()
    peaks = (flux[1:-1] > thresh) & (flux[1:-1] > flux[:-2]) & (flux[1:-1] >= flux[2:])
    onset_t = (np.nonzero(peaks)[0] + 1) * hop / rate
    fps = rate / hop
    n_win = int(len(a) / rate // WIN)
    cen, rate_w = [], []
    for k in range(n_win):
        lo, hi = int(k * WIN * fps), int((k + 1) * WIN * fps)
        loud = energy[lo:hi]
        cen.append(float(np.average(centroid[lo:hi], weights=loud)) if loud.sum() > 0 else 0.0)
        rate_w.append(float(((onset_t >= k * WIN) & (onset_t < (k + 1) * WIN)).sum() / WIN))
    return {"brightness": np.array(cen), "note-rate": np.array(rate_w)}


def score_at(score: dict, t: np.ndarray) -> dict:
    keys = np.array([k[0] for k in score["keyframes"]])
    vals = np.array([k[1] for k in score["keyframes"]])
    return {m: np.interp(t, keys, vals[:, i]) for i, m in enumerate(MODES)}


def main(argv: list[str]) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser()
    ap.add_argument("recording")
    ap.add_argument("score")
    ap.add_argument("--start", type=float, default=0.0)
    ap.add_argument("--end", type=float, default=None)
    args = ap.parse_args(argv)
    score = yaml.safe_load((U / "registry" / "scores" / f"{args.score}.yaml").read_text(encoding="utf-8"))
    a, rate = read(Path(args.recording))
    measured = measure(a, rate)
    n = len(measured["brightness"])
    mid = (np.arange(n) + 0.5) * WIN
    end = args.end if args.end is not None else len(a) / rate
    inside = (mid >= args.start) & (mid <= end)
    t = np.clip((mid - args.start) / max(1e-9, end - args.start), 0, 1)
    modes = score_at(score, t)
    print(f"read-back: {Path(args.recording).name} against {args.score}, {inside.sum()} windows of {WIN:.0f} s")
    carried = 0
    for ch, f in EXPECTED.items():
        exp, got = f(modes)[inside], measured[ch][inside]
        r = float(np.corrcoef(exp, got)[0, 1]) if exp.std() > 0 and got.std() > 0 else 0.0
        verdict = "carries the score" if r >= 0.5 else "does not carry it"
        carried += r >= 0.5
        print(f"  {ch:11} r = {r:+.2f}  {verdict}")
    print(f"  not measured yet: {', '.join(NOT_YET)}")
    return 0 if carried == len(EXPECTED) else 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
