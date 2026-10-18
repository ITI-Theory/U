#!/usr/bin/env python3
"""nks.py: read Native Instruments' NKS presets (.nksf, .nksfx) into what a program can act on.

The author's plugins speak NKS, Native Instruments' Komplete Kontrol standard (some natively, some
through third-party NKS wrappers). An NKS preset is a RIFF file of form `NIKS` whose chunks are each a
4-byte id, a 32-bit little-endian size, a 32-bit version (1), then MessagePack:

  NISI  the summary: name, author, vendor, deviceType (INST or FX), bankchain, types (category pairs),
        modes (character tags: Dark, Warm, Aggressive ...), comment, uuid
  NICA  the controller assignments: pages of eight knobs, each with a section, a name and the
        plugin parameter's id (the index the host automates)
  PLID  the plugin: a VST2 magic number or a VST3 class id
  PCHK  the plugin's own state (opaque; not read)

So a preset says, in a machine-readable way, which of a plugin's parameters matter, what they are
called and where they sit: a manual a program can read. The sound side uses it to choose what the
score's feelings drive (a named parameter, not a guessed CC) and to choose presets by their tags.
Unofficial: the layout is the community's reading (github.com/alset333/NKS-Rewrite-Meta), checked by
the self-test against files this script writes; NKS is Native Instruments' trademark.

  python lib/audio/nks.py <file.nksf | folder> [--json]     a card per preset, or a library summary
  python lib/audio/nks.py --self-test                        write a preset, read it back
"""

from __future__ import annotations

import json
import struct
import sys
from collections import Counter
from pathlib import Path

# ---------------------------------------------------------------- MessagePack, the subset NKS uses


class _Reader:
    def __init__(self, data: bytes):
        self.b, self.i = data, 0

    def take(self, n: int) -> bytes:
        out = self.b[self.i:self.i + n]
        if len(out) < n:
            raise ValueError("msgpack: truncated")
        self.i += n
        return out

    def u(self, fmt: str):
        return struct.unpack(fmt, self.take(struct.calcsize(fmt)))[0]

    def value(self):
        t = self.take(1)[0]
        if t <= 0x7F:
            return t
        if 0x80 <= t <= 0x8F:
            return self._map(t & 0x0F)
        if 0x90 <= t <= 0x9F:
            return [self.value() for _ in range(t & 0x0F)]
        if 0xA0 <= t <= 0xBF:
            return self.take(t & 0x1F).decode("utf-8", "replace")
        if t >= 0xE0:
            return t - 0x100
        simple = {0xC0: None, 0xC2: False, 0xC3: True}
        if t in simple:
            return simple[t]
        if t in (0xC4, 0xC5, 0xC6):
            return self.take(self.u({0xC4: ">B", 0xC5: ">H", 0xC6: ">I"}[t]))
        if t == 0xCA:
            return self.u(">f")
        if t == 0xCB:
            return self.u(">d")
        ints = {0xCC: ">B", 0xCD: ">H", 0xCE: ">I", 0xCF: ">Q", 0xD0: ">b", 0xD1: ">h", 0xD2: ">i", 0xD3: ">q"}
        if t in ints:
            return self.u(ints[t])
        if t in (0xD9, 0xDA, 0xDB):
            return self.take(self.u({0xD9: ">B", 0xDA: ">H", 0xDB: ">I"}[t])).decode("utf-8", "replace")
        if t in (0xDC, 0xDD):
            return [self.value() for _ in range(self.u(">H" if t == 0xDC else ">I"))]
        if t in (0xDE, 0xDF):
            return self._map(self.u(">H" if t == 0xDE else ">I"))
        raise ValueError(f"msgpack: type 0x{t:02x} not read")

    def _map(self, n: int) -> dict:
        out = {}
        for _ in range(n):
            k = self.value()
            out[k if isinstance(k, (str, int)) else str(k)] = self.value()
        return out


def unpack(data: bytes):
    return _Reader(data).value()


def pack(v) -> bytes:
    """A small MessagePack writer (for the self-test, and for writing NKS metadata later)."""
    if v is None:
        return b"\xc0"
    if v is True or v is False:
        return b"\xc3" if v else b"\xc2"
    if isinstance(v, int):
        if 0 <= v <= 0x7F:
            return bytes([v])
        if -32 <= v < 0:
            return bytes([v + 0x100])
        return b"\xd2" + struct.pack(">i", v) if -2**31 <= v < 2**31 else b"\xd3" + struct.pack(">q", v)
    if isinstance(v, float):
        return b"\xcb" + struct.pack(">d", v)
    if isinstance(v, str):
        raw = v.encode("utf-8")
        if len(raw) < 32:
            return bytes([0xA0 | len(raw)]) + raw
        return (b"\xd9" + struct.pack(">B", len(raw)) if len(raw) < 256 else b"\xda" + struct.pack(">H", len(raw))) + raw
    if isinstance(v, (bytes, bytearray)):
        return b"\xc4" + struct.pack(">B", len(v)) + bytes(v)
    if isinstance(v, (list, tuple)):
        head = bytes([0x90 | len(v)]) if len(v) < 16 else b"\xdc" + struct.pack(">H", len(v))
        return head + b"".join(pack(x) for x in v)
    if isinstance(v, dict):
        head = bytes([0x80 | len(v)]) if len(v) < 16 else b"\xde" + struct.pack(">H", len(v))
        return head + b"".join(pack(k) + pack(x) for k, x in v.items())
    raise TypeError(type(v))

# ---------------------------------------------------------------- the RIFF container


def chunks(data: bytes) -> dict[str, bytes]:
    if data[:4] != b"RIFF" or data[8:12] != b"NIKS":
        raise ValueError("not an NKS preset (RIFF/NIKS)")
    out, i = {}, 12
    while i + 8 <= len(data):
        cid = data[i:i + 4].decode("latin-1")
        size = struct.unpack("<I", data[i + 4:i + 8])[0]
        out[cid] = data[i + 8:i + 8 + size]
        i += 8 + size + (size & 1)   # RIFF pads to an even length
    return out


def read(path: Path) -> dict:
    """A preset's card: the summary, the plugin, and the knob pages."""
    c = chunks(path.read_bytes())
    meta = lambda cid: unpack(c[cid][4:]) if cid in c and len(c[cid]) > 4 else {}
    nisi, nica, plid = meta("NISI"), meta("NICA"), meta("PLID")
    pages = []
    for page in (nica.get("ni8") or []):
        pages.append([{"section": k.get("section", ""), "name": k.get("name", ""), "id": k.get("id")} for k in page if isinstance(k, dict)])
    # a section name carries onto the knobs after it, as Komplete Kontrol shows it; an unassigned
    # slot (no parameter) stays empty
    for page in pages:
        section = ""
        for k in page:
            section = k["section"] or section
            k["section"] = section if k["id"] is not None else ""
    if "VST3.uid" in plid:
        # the VST3 class id, four 32-bit words, as hosts print it
        plugin = {"vst3": "".join(f"{w & 0xFFFFFFFF:08X}" for w in plid["VST3.uid"])}
    else:
        plugin = {"vst2": plid.get("VST.magic")} if plid else {}
    return {
        "file": str(path),
        "name": nisi.get("name", path.stem),
        "vendor": nisi.get("vendor", ""),
        "author": nisi.get("author", ""),
        "device": nisi.get("deviceType", ""),
        "bank": [b for b in (nisi.get("bankchain") or []) if b],
        "types": [" / ".join(t) if isinstance(t, list) else str(t) for t in (nisi.get("types") or [])],
        "modes": list(nisi.get("modes") or []),
        "plugin": plugin,
        "pages": pages,
        "state_bytes": len(c.get("PCHK", b"")),
    }


def summarise(cards: list[dict]) -> dict:
    """A library: per plugin (vendor and bank's first entry), its presets, tags and one knob layout."""
    by: dict[str, dict] = {}
    for card in cards:
        key = f"{card['vendor']} · {card['bank'][0] if card['bank'] else '?'}"
        e = by.setdefault(key, {"presets": 0, "types": Counter(), "modes": Counter(), "pages": None, "plugin": card["plugin"]})
        e["presets"] += 1
        e["types"].update(card["types"])
        e["modes"].update(card["modes"])
        if card["pages"] and (e["pages"] is None or len(card["pages"]) > len(e["pages"])):
            e["pages"] = card["pages"]
    return {k: {**v, "types": dict(v["types"].most_common(12)), "modes": dict(v["modes"].most_common(12))} for k, v in by.items()}


def card_text(card: dict) -> str:
    lines = [f"{card['name']}  ({card['vendor']}, {card['device'] or '?'}; {' > '.join(card['bank'])})",
             f"  types: {', '.join(card['types']) or '-'}", f"  modes: {', '.join(card['modes']) or '-'}",
             f"  plugin: {card['plugin']}"]
    for n, page in enumerate(card["pages"], 1):
        lines.append(f"  page {n}: " + " | ".join("(empty)" if k["id"] is None else f"{k['section'] + ': ' if k['section'] else ''}{k['name']} #{k['id']}" for k in page))
    return "\n".join(lines)

# ---------------------------------------------------------------- self-test


def write(path: Path, nisi: dict, nica: dict, plid: dict, state: bytes = b"") -> None:
    def chunk(cid: str, body: bytes) -> bytes:
        return cid.encode("latin-1") + struct.pack("<I", len(body)) + body + (b"\0" if len(body) & 1 else b"")
    body = b"NIKS" + chunk("NISI", struct.pack("<I", 1) + pack(nisi)) + chunk("NICA", struct.pack("<I", 1) + pack(nica)) \
        + chunk("PLID", struct.pack("<I", 1) + pack(plid)) + chunk("PCHK", struct.pack("<I", 1) + state)
    path.write_bytes(b"RIFF" + struct.pack("<I", len(body)) + body)


def self_test() -> int:
    import tempfile
    with tempfile.TemporaryDirectory() as d:
        p = Path(d) / "Test Pad.nksf"
        nisi = {"UUID": "0000-TEST", "author": "Copilot", "bankchain": ["Test Synth", "Factory", ""], "comment": "", "deviceType": "INST",
                "modes": ["Dark", "Warm", "Evolving"], "name": "Test Pad", "types": [["Pad", "Warm Pad"]], "uuid": "", "vendor": "Test Vendor"}
        nica = {"ni8": [[{"autoname": False, "id": 12, "name": "Cutoff", "section": "Filter", "vflag": False},
                         {"autoname": False, "id": 13, "name": "Resonance", "section": "", "vflag": False},
                         {"autoname": False, "id": 40, "name": "Attack", "section": "Amp Env", "vflag": False}]]}
        write(p, nisi, nica, {"VST3.uid": [1, 2, 3, 4]}, b"opaque state, 33 bytes long!!!!!")
        card = read(p)
        assert card["name"] == "Test Pad" and card["vendor"] == "Test Vendor" and card["device"] == "INST", card
        assert card["types"] == ["Pad / Warm Pad"] and card["modes"] == ["Dark", "Warm", "Evolving"], card
        assert card["pages"][0][1] == {"section": "Filter", "name": "Resonance", "id": 13}, card["pages"]
        assert card["plugin"] == {"vst3": "00000001000000020000000300000004"} and card["state_bytes"] == 36, card
        assert unpack(pack({"a": [1, -5, 300, 2.5, "x" * 40, None, True]})) == {"a": [1, -5, 300, 2.5, "x" * 40, None, True]}
        lib = summarise([card, card])
        assert lib["Test Vendor · Test Synth"]["presets"] == 2 and lib["Test Vendor · Test Synth"]["modes"]["Dark"] == 2, lib
        print(card_text(card))
        print("nks self-test: PASS")
    return 0


def main(argv: list[str]) -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        return 0
    if argv[0] == "--self-test":
        return self_test()
    target, as_json = Path(argv[0]), "--json" in argv
    files = [target] if target.is_file() else sorted(p for ext in ("*.nksf", "*.nksfx") for p in target.rglob(ext))
    cards, problems = [], []
    for f in files:
        try:
            cards.append(read(f))
        except Exception as e:  # a damaged or unusual file is reported, never fatal
            problems.append(f"{f}: {e}")
    if target.is_file() and cards:
        print(json.dumps(cards[0], indent=1, ensure_ascii=False) if as_json else card_text(cards[0]))
    elif cards:
        lib = summarise(cards)
        print(json.dumps(lib, indent=1, ensure_ascii=False) if as_json else "\n".join(
            f"{k}: {v['presets']} presets; types {', '.join(v['types'])}; modes {', '.join(v['modes'])}" for k, v in sorted(lib.items())))
    print(f"{len(cards)} presets read, {len(problems)} problems", file=sys.stderr)
    for p in problems[:10]:
        print("!!", p, file=sys.stderr)
    return 0 if cards or not problems else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
