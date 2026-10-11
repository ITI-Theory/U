"""Fit a viewer preset from two films: who would see film A as film B? (the twin view)

    python scripts/fit_viewer.py                      # river-film seen as fis-2021 -> registry/viewers/v2021.yaml
    python scripts/fit_viewer.py BASE TARGET OUT_ID   # any two scores

The Tensor's rendering function S(t) = R(e*, kappa, e_V): the twin view shows one film to two
viewers. Given the film as it is now (BASE, the River Film) and the same journey as it was told
(TARGET, the 2021 film), find the viewer preset p whose transform of BASE comes closest to
TARGET, over the phases the two films share (story-time up to SHARED: Sherlock's structure
mapping river-vs-fis maps departure, descent, threshold and encounter; after them the films
are different stories). The transform is score.js viewerTransform, mirrored here exactly:
baseline offsets per mode (the instrument's knobs; a film gives one value per mode, so the
somatic and cognitive halves are set equal), the C-PTSD barrier (safety -0.3c, fear and grief
+0.2c), ASD monotropism (the two strongest modes x(1+0.3a), the others x(1-0.6a)). ADHD is
the temperature above T0, read from how much rougher the target's trajectory is than the
base's (mean absolute second difference). Writes the preset with its fit (residual RMS before
and after), a model reading, not a diagnosis.
"""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
import yaml

U = Path(__file__).resolve().parents[5]
SCORES = U / "registry" / "scores"
VIEWERS = U / "registry" / "viewers"
SHARED = 0.6
KD = 0.7  # the default depth (score.js shape)


def load(score_id: str) -> dict:
    return yaml.safe_load((SCORES / f"{score_id}.yaml").read_text(encoding="utf-8"))


def curve(score: dict, ts: np.ndarray) -> dict[str, np.ndarray]:
    """score.js at() (smoothstep between keyframes), then shape() (coupling, depth), per mode."""
    keys = sorted(((float(t), [float(x) for x in v]) for t, v in score["keyframes"]), key=lambda k: k[0])
    ids = [m["id"] for m in score["modes"]]
    vals = np.zeros((len(ts), len(ids)))
    for n, t in enumerate(ts):
        if t <= keys[0][0]:
            vals[n] = keys[0][1]
            continue
        for (ta, va), (tb, vb) in zip(keys, keys[1:]):
            if t <= tb:
                s = (t - ta) / ((tb - ta) or 1)
                e = s * s * (3 - 2 * s)
                vals[n] = [a + (b - a) * e for a, b in zip(va, vb)]
                break
        else:
            vals[n] = keys[-1][1]
    raw = {i: vals[:, k] for k, i in enumerate(ids)}
    out = {i: raw[i].copy() for i in ids}
    for c in score.get("coupling") or []:
        if c["from"] in raw and c["to"] in out:
            out[c["to"]] += float(c["weight"]) * raw[c["from"]]
    if "PV" in out:
        out["PV"] *= 0.3 + 0.7 * KD
    return {i: np.clip(v, 0, 1) for i, v in out.items()}


def transform(m: dict[str, np.ndarray], off: dict[str, float], cptsd: float, asd: float) -> dict[str, np.ndarray]:
    """score.js viewerTransform, vectorised over story-time."""
    out = {i: np.clip(v + off.get(i, 0.0), 0, 1) for i, v in m.items()}
    if "S" in out: out["S"] = np.clip(out["S"] - 0.3 * cptsd, 0, 1)
    if "F" in out: out["F"] = np.clip(out["F"] + 0.2 * cptsd, 0, 1)
    if "G" in out: out["G"] = np.clip(out["G"] + 0.2 * cptsd, 0, 1)
    if asd > 0:
        ids = list(out)
        stack = np.stack([out[i] for i in ids])            # modes x time
        rank = np.argsort(np.argsort(-stack, axis=0), axis=0)  # 0 = strongest at each time
        top = rank < 2
        stack = np.where(top, np.clip(stack * (1 + 0.3 * asd), 0, 1), stack * (1 - 0.6 * asd))
        out = {i: stack[k] for k, i in enumerate(ids)}
    return out


def cost(a: dict, b: dict) -> float:
    return float(np.sqrt(np.mean([np.mean((a[i] - b[i]) ** 2) for i in a if i in b])))


def roughness(m: dict[str, np.ndarray]) -> float:
    return float(np.mean([np.mean(np.abs(np.diff(v, 2))) for v in m.values()]))


def fit(base_id: str, target_id: str) -> dict:
    ts = np.linspace(0, SHARED, 61)
    base, target = curve(load(base_id), ts), curve(load(target_id), ts)
    ids = [i for i in base if i in target]
    best = (float("inf"), None)
    grid = np.round(np.arange(-1, 1.0001, 0.05), 2)
    for cptsd in np.round(np.arange(0, 1.0001, 0.1), 2):
        for asd in np.round(np.arange(0, 1.0001, 0.1), 2):
            off = {i: float(np.mean(target[i] - base[i])) for i in ids}  # a start: the mean difference
            for _ in range(3):  # coordinate descent on the offsets
                for i in ids:
                    trials = [(cost(transform(base, {**off, i: g}, cptsd, asd), target), g) for g in grid]
                    off[i] = min(trials)[1]
                    fine = np.round(np.arange(off[i] - 0.05, off[i] + 0.0501, 0.01), 3)
                    off[i] = min((cost(transform(base, {**off, i: g}, cptsd, asd), target), g) for g in fine)[1]
            c = cost(transform(base, off, cptsd, asd), target)
            if c < best[0]:
                best = (c, (dict(off), float(cptsd), float(asd)))
    c, (off, cptsd, asd) = best
    t_all = np.linspace(0, 1, 101)
    b_all, g_all = curve(load(base_id), t_all), curve(load(target_id), t_all)
    adhd = float(np.clip((roughness(target) - roughness(base)) / 0.01, 0, 1))
    return {
        "off": {i: round(float(v), 2) for i, v in off.items()}, "cptsd": cptsd, "asd": asd, "adhd": round(adhd, 2),
        "rms_before": round(cost(base, target), 3), "rms_after": round(c, 3),
        "rms_whole_before": round(cost(b_all, g_all), 3),
        "rms_whole_after": round(cost(transform(b_all, off, cptsd, asd), g_all), 3),
    }


def main() -> int:
    base_id, target_id, out_id = (sys.argv[1:4] if len(sys.argv) >= 4 else ("river-film", "fis-2021", "v2021"))
    r = fit(base_id, target_id)
    baseline = {i: [v, v] for i, v in r["off"].items()}
    lines = [
        f"# As I was in 2021: a viewer preset fitted by scripts/fit_viewer.py ({base_id} seen as {target_id}).",
        "# The twin view (?tw=1) plays any film twice: left, the viewer of now (the knobs at neutral);",
        "# right, this viewer. The fit: the transform of the River Film that comes closest to the 2021",
        f"# film over the shared phases (story-time up to {SHARED}): RMS {r['rms_before']} -> {r['rms_after']}",
        f"# (whole film {r['rms_whole_before']} -> {r['rms_whole_after']}; after the encounter the two films are",
        "# different stories). A film gives one value per mode, so the somatic and cognitive knobs are",
        "# equal. A model reading of two scores, not a diagnosis; the author tunes it (and asks H-AL).",
        f"id: {out_id}",
        "title: As I was in 2021",
        "order: 10",
        f"fitted: {{base: {base_id}, target: {target_id}, shared: {SHARED}, rms_before: {r['rms_before']}, "
        f"rms_after: {r['rms_after']}, rms_whole_before: {r['rms_whole_before']}, rms_whole_after: {r['rms_whole_after']}}}",
        "baseline:   # per mode [somatic, cognitive]",
    ]
    lines += [f"  {i}: {v}" for i, v in baseline.items()]
    lines += ["conditions:   # model operators (P13): hypotheses, not diagnoses",
              f"  adhd: {r['adhd']}", f"  asd: {r['asd']}", f"  cptsd: {r['cptsd']}"]
    VIEWERS.mkdir(parents=True, exist_ok=True)
    (VIEWERS / f"{out_id}.yaml").write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    print(f"registry/viewers/{out_id}.yaml:", r)
    return 0


if __name__ == "__main__":
    sys.exit(main())
