"""cues.py: read a DJ mix into a cue sheet for the SHOW film (ISS-107 A1).

    python lib/show/cues.py <mix.wav> [--out bld/show/cues.json]

Tempo per minute, beats tracked along the tempo curve (a mix drifts), bars, 16-bar phrases, and sections: groove (the kick is in),
breakdown (the kick is out for at least four bars), build (the end of a breakdown where the
high band rises), drop (the bar where the kick comes back). numpy only. The mix is personal and
is never copied: the cue sheet keeps its file name and duration, nothing of the audio.
"""
from __future__ import annotations

import argparse
import json
import sys
import wave
from pathlib import Path

import numpy as np

U = Path(__file__).resolve().parents[2]
SR = 11025          # analysis rate (the mix is decimated to it)
HOP, WIN = 256, 1024


def read_mono(path: Path) -> tuple[np.ndarray, float]:
    """The mix as mono float32 at about 11 kHz, read in chunks (a 90-minute WAV is ~1 GB)."""
    with wave.open(str(path), "rb") as w:
        ch, width, rate, n = w.getnchannels(), w.getsampwidth(), w.getframerate(), w.getnframes()
        if width != 2:
            raise SystemExit(f"{path.name}: {8 * width}-bit WAV; 16-bit expected")
        step = max(1, round(rate / SR))
        out, block = [], rate * 30
        for _ in range(0, n, block):
            a = np.frombuffer(w.readframes(block), dtype="<i2").astype("float32").reshape(-1, ch).mean(axis=1) / 32768
            a = a[: len(a) // step * step].reshape(-1, step).mean(axis=1)   # box filter + decimate
            out.append(a)
    return np.concatenate(out), rate / step


def bands(x: np.ndarray, sr: float) -> tuple[np.ndarray, np.ndarray]:
    """Per-frame energy in the kick band (40-120 Hz) and the high band (2-5 kHz)."""
    f = np.fft.rfftfreq(WIN, 1 / sr)
    kick, high = (f >= 40) & (f <= 120), (f >= 2000) & (f <= 5000)
    win = np.hanning(WIN).astype("float32")
    frames = (len(x) - WIN) // HOP
    k, h = np.empty(frames, "float32"), np.empty(frames, "float32")
    for s in range(0, frames, 8192):
        idx = np.arange(s, min(frames, s + 8192))[:, None] * HOP + np.arange(WIN)[None, :]
        spec = np.abs(np.fft.rfft(x[idx] * win, axis=1)) ** 2
        k[s: s + len(idx)] = spec[:, kick].sum(axis=1)
        h[s: s + len(idx)] = spec[:, high].sum(axis=1)
    return k, h


def tempo(onset: np.ndarray, fps: float, lo: float = 120, hi: float = 160) -> float:
    o = onset - onset.mean()
    ac = np.correlate(o, o, "full")[len(o) - 1:]
    lags = np.arange(int(fps * 60 / hi), int(fps * 60 / lo) + 1)
    i = float(lags[np.argmax(ac[lags])])
    k = int(i)
    if 1 <= k < len(ac) - 1:   # parabolic refinement
        a, b, c = ac[k - 1], ac[k], ac[k + 1]
        if a - 2 * b + c:
            i = k + 0.5 * (a - c) / (a - 2 * b + c)
    return 60 * fps / i


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("mix")
    ap.add_argument("--out", default=str(U / "bld" / "show" / "cues.json"))
    args = ap.parse_args(argv)
    mix = Path(args.mix)
    x, sr = read_mono(mix)
    fps = sr / HOP
    kick, high = bands(x, sr)
    lk = np.log1p(kick / (np.median(kick) + 1e-9))
    onset = np.maximum(0, np.diff(lk, prepend=lk[0]))
    # tempo per minute, then the mix's typical tempo
    per_min = []
    for s in range(0, len(onset) - int(fps * 30), int(fps * 60)):
        seg = onset[s: s + int(fps * 60)]
        if seg.std() > 1e-6:
            per_min.append({"t": round(s / fps, 1), "bpm": round(float(tempo(seg, fps)), 2)})
    bpm = float(np.median([p["bpm"] for p in per_min])) if per_min else 140.0
    # the tempo drifts through a mix: a curve, its outliers (an intro, a mix-in) held to the median
    tt = np.array([p["t"] + 30 for p in per_min]) if per_min else np.array([0.0])
    tb = np.array([p["bpm"] for p in per_min]) if per_min else np.array([bpm])
    med = np.array([np.median(tb[max(0, i - 2): i + 3]) for i in range(len(tb))])
    tb = np.where(np.abs(tb - med) > 2, med, tb)
    period_at = lambda sec: 60 * fps / float(np.interp(sec, tt, tb))  # noqa: E731
    # beat phase at the start: the offset whose grid collects the most onset over the first minute
    p0 = period_at(0)
    first = onset[: int(fps * 60)]
    phases = np.linspace(0, p0, 64, endpoint=False)
    score = [first[np.round(np.arange(q, len(first), p0)).astype(int).clip(0, len(first) - 1)].sum() for q in phases]
    # a beat tracker (a phase-locked loop): predict the next beat from the tempo curve, then pull
    # it a third of the way toward the strongest kick onset within 15% of a beat
    smooth = np.convolve(onset, np.ones(3) / 3, "same")
    beats, b = [], float(phases[int(np.argmax(score))])
    while b < len(onset) - 1:
        beats.append(b)
        per = period_at(b / fps)
        pred = b + per
        lo, hi = int(pred - 0.15 * per), int(pred + 0.15 * per) + 1
        if hi < len(smooth) and smooth[lo:hi].max() > 0:
            pred += 0.33 * (lo + int(np.argmax(smooth[lo:hi])) - pred)
        b = pred
    beat_t = np.array(beats) / fps
    beat0 = float(beat_t[0])
    bar_t = beat_t[::4]
    nbars = len(bar_t) - 1
    bar = float(np.median(np.diff(bar_t)))

    def bar_mean(e):
        return np.array([e[int(bar_t[i] * fps): int(bar_t[i + 1] * fps)].mean() for i in range(nbars)])
    kb, hb = bar_mean(kick), bar_mean(high)
    # per bar: is the kick in? (its energy against the median of the surrounding two minutes)
    ref = np.array([np.median(kb[max(0, i - 28): i + 28]) for i in range(nbars)])
    kick_in = kb > 0.35 * ref
    sections, i = [], 0
    while i < nbars:
        j = i
        while j < nbars and kick_in[j] == kick_in[i]:
            j += 1
        kind = "groove" if kick_in[i] else ("breakdown" if j - i >= 4 else "groove")
        if sections and sections[-1]["kind"] == kind:
            sections[-1]["end_bar"] = j
        else:
            sections.append({"kind": kind, "start_bar": i, "end_bar": j})
        i = j
    drops, builds = [], []
    for s in sections:
        if s["kind"] != "breakdown":
            continue
        a, b = s["start_bar"], s["end_bar"]
        if b < nbars:
            drops.append(b)
        tail = hb[max(a, b - 8): b]
        if len(tail) >= 4 and np.polyfit(np.arange(len(tail)), tail, 1)[0] > 0:
            builds.append({"start_bar": max(a, b - 8), "end_bar": b})
    # phrases: 16 bars, anchored on the first drop (drops land on phrase starts)
    anchor = drops[0] % 16 if drops else 0
    phrases = list(range(anchor, nbars, 16))

    def t(b):
        return round(float(bar_t[min(b, nbars)]), 2)
    out = {
        "source": mix.name, "duration": round(len(x) / sr, 1), "bpm": round(bpm, 2), "beat0": round(float(beat0), 3),
        "bar_seconds": round(bar, 4), "bars": nbars, "tempo_per_minute": per_min,
        "bar_times": [round(float(x), 3) for x in bar_t],
        "phrases": [t(b) for b in phrases],
        "sections": [{**s, "start": t(s["start_bar"]), "end": t(s["end_bar"])} for s in sections],
        "builds": [{**b, "start": t(b["start_bar"]), "end": t(b["end_bar"])} for b in builds],
        "drops": [{"bar": b, "t": t(b)} for b in drops],
        "note": "Read by lib/show/cues.py (ISS-107 A1): kick band 40-120 Hz, high band 2-5 kHz; a breakdown is at least four bars without the kick. Estimates, not a DJ's cue list.",
    }
    p = Path(args.out)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(out, indent=1), encoding="utf-8")
    bd = [s for s in sections if s["kind"] == "breakdown"]
    print(f"{p}: {out['duration'] / 60:.1f} min, {bpm:.2f} BPM, {nbars} bars, {len(phrases)} phrases, {len(bd)} breakdowns, {len(builds)} builds, {len(drops)} drops")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
