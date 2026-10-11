#!/usr/bin/env python3
"""
query_cyc.py — Query the OpenCyc TypeDB knowledge base.

Usage
─────
  # What does Cyc know about a concept?
  python scripts/query_cyc.py Nostalgia
  python scripts/query_cyc.py Joy-Emotion
  python scripts/query_cyc.py "Fear"

  # List all direct subclasses of EmotionalState
  python scripts/query_cyc.py --subtypes EmotionalState

  # Search concepts whose label contains a word
  python scripts/query_cyc.py --search emotion

  # JSON output (for piping / Lean IO.Process.output)
  python scripts/query_cyc.py --json Nostalgia

Also importable as a library:
  from scripts.query_cyc import cyc_lookup, cyc_subtypes, cyc_search
"""

import json
import sys
from typing import Any

TYPEDB_URI = "localhost:1729"
DB_NAME    = "opencyc"

# ── driver bootstrap ──────────────────────────────────────────────────────────

def _driver():
    try:
        from typedb.driver import TypeDB
        return TypeDB.core_driver(TYPEDB_URI)
    except ImportError:
        print("typedb-driver not installed.  Run: pip install typedb-driver", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Cannot connect to TypeDB at {TYPEDB_URI}: {e}", file=sys.stderr)
        print("Is TypeDB running?  Run: docker compose up -d", file=sys.stderr)
        sys.exit(1)

# ── helpers ───────────────────────────────────────────────────────────────────

def _attrs(tx, entity) -> dict[str, list[str]]:
    """Return all attributes of a TypeDB entity as {type: [values]}."""
    result: dict[str, list[str]] = {}
    for attr in entity.get_has(tx):
        k = attr.get_type().get_label().name
        v = str(attr.get_value())
        result.setdefault(k, []).append(v)
    return result

# ── core queries ──────────────────────────────────────────────────────────────

def cyc_lookup(label: str) -> dict[str, Any]:
    """
    Return everything TypeDB knows about a concept by its rdfs:label.
    Also tries stripping the '#$' prefix if passed Lean CycRef notation.
    """
    # Strip Lean CycRef prefix if present
    clean = label.lstrip("#$").strip()

    from typedb.driver import SessionType, TransactionType

    with _driver() as driver:
        with driver.session(DB_NAME, SessionType.DATA) as session:
            with session.transaction(TransactionType.READ) as tx:

                # ── find the concept ──────────────────────────────────────────
                q = (f'match $c isa cyc-class, has cyc-label $l; '
                     f'$l = "{clean}"; get $c;')
                hits = list(tx.query.match(q))
                if not hits:
                    # Try partial match
                    q2 = (f'match $c isa cyc-class, has cyc-label $l; '
                          f'$l contains "{clean}"; get $c, $l; limit 5;')
                    hits2 = list(tx.query.match(q2))
                    if hits2:
                        suggestions = [h.get("l").as_attribute().get_value()
                                       for h in hits2]
                        return {"error": f"Not found: '{clean}'",
                                "suggestions": suggestions}
                    return {"error": f"Not found: '{clean}'"}

                entity = hits[0].get("c").as_entity()
                attrs  = _attrs(tx, entity)

                # ── direct superclasses ───────────────────────────────────────
                q_sup = (
                    f'match $c isa cyc-class, has cyc-label "{clean}"; '
                    f'(sub-class: $c, super-class: $p) isa subclass-of; '
                    f'$p has cyc-label $pl; get $pl;'
                )
                parents = [r.get("pl").as_attribute().get_value()
                           for r in tx.query.match(q_sup)]

                # ── direct subclasses ─────────────────────────────────────────
                q_sub = (
                    f'match $p isa cyc-class, has cyc-label "{clean}"; '
                    f'(sub-class: $c, super-class: $p) isa subclass-of; '
                    f'$c has cyc-label $cl; get $cl; limit 30;'
                )
                children = [r.get("cl").as_attribute().get_value()
                            for r in tx.query.match(q_sub)]

                # ── emotion-domain relations ──────────────────────────────────
                q_blend = (
                    f'match $c isa cyc-class, has cyc-label "{clean}"; '
                    f'(input: $c, output: $o) isa emotional-blend; '
                    f'$o has cyc-label $ol; get $ol;'
                )
                blends = [r.get("ol").as_attribute().get_value()
                          for r in tx.query.match(q_blend)]

                q_causes = (
                    f'match $c isa cyc-class, has cyc-label "{clean}"; '
                    f'(cause: $c, effect: $e) isa causes; '
                    f'$e has cyc-label $el; get $el;'
                )
                causes = [r.get("el").as_attribute().get_value()
                          for r in tx.query.match(q_causes)]

                q_caused_by = (
                    f'match $c isa cyc-class, has cyc-label "{clean}"; '
                    f'(cause: $cause, effect: $c) isa causes; '
                    f'$cause has cyc-label $cl; get $cl;'
                )
                caused_by = [r.get("cl").as_attribute().get_value()
                             for r in tx.query.match(q_caused_by)]

                return {
                    "label":    clean,
                    "uri":      attrs.get("cyc-uri",     ["?"])[0],
                    "comment":  attrs.get("cyc-comment", [""])[0][:200],
                    "same_as":  attrs.get("cyc-same-as", [])[:5],
                    "parents":  parents,
                    "children": children,
                    "blends_to":   blends,
                    "causes":      causes,
                    "caused_by":   caused_by,
                }


def cyc_subtypes(label: str, depth: int = 1) -> list[str]:
    """Return all subclasses of a concept (one level deep)."""
    from typedb.driver import SessionType, TransactionType
    with _driver() as driver:
        with driver.session(DB_NAME, SessionType.DATA) as session:
            with session.transaction(TransactionType.READ) as tx:
                q = (
                    f'match $p isa cyc-class, has cyc-label "{label}"; '
                    f'(sub-class: $c, super-class: $p) isa subclass-of; '
                    f'$c has cyc-label $cl; get $cl;'
                )
                return sorted(set(
                    r.get("cl").as_attribute().get_value()
                    for r in tx.query.match(q)
                ))


def cyc_search(word: str, limit: int = 20) -> list[dict]:
    """Full-text search on cyc-label (case-insensitive contains)."""
    from typedb.driver import SessionType, TransactionType
    with _driver() as driver:
        with driver.session(DB_NAME, SessionType.DATA) as session:
            with session.transaction(TransactionType.READ) as tx:
                q = (
                    f'match $c isa cyc-class, has cyc-label $l, has cyc-uri $u; '
                    f'$l contains "{word}"; get $c, $l, $u; limit {limit};'
                )
                return [
                    {"label": r.get("l").as_attribute().get_value(),
                     "uri":   r.get("u").as_attribute().get_value()}
                    for r in tx.query.match(q)
                ]


# ── CLI rendering ─────────────────────────────────────────────────────────────

def _render(data: dict) -> str:
    if "error" in data:
        lines = [f"ERROR: {data['error']}"]
        if "suggestions" in data:
            lines.append("Did you mean: " + ", ".join(data["suggestions"]))
        return "\n".join(lines)

    lines = [
        f"── {data['label']} ──────────────────────────────────────",
        f"URI:       {data['uri']}",
    ]
    if data["same_as"]:
        lines.append("sameAs:    " + "  |  ".join(data["same_as"][:3]))
    if data["comment"]:
        lines.append(f"Comment:   {data['comment']}")
    if data["parents"]:
        lines.append("Parents:   " + "  →  ".join(data["parents"]))
    if data["children"]:
        n = len(data["children"])
        shown = data["children"][:10]
        lines.append("Children:  " + ",  ".join(shown) +
                     (f"  … (+{n-10} more)" if n > 10 else ""))
    if data["blends_to"]:
        lines.append("Blends→:   " + ",  ".join(data["blends_to"]))
    if data["causes"]:
        lines.append("Causes:    " + ",  ".join(data["causes"]))
    if data["caused_by"]:
        lines.append("CausedBy:  " + ",  ".join(data["caused_by"]))
    return "\n".join(lines)


def main() -> None:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return

    as_json  = "--json"   in args; args = [a for a in args if a != "--json"]
    subtypes = "--subtypes" in args; args = [a for a in args if a != "--subtypes"]
    search   = "--search"   in args; args = [a for a in args if a != "--search"]

    target = " ".join(args)

    if search:
        results = cyc_search(target)
        if as_json:
            print(json.dumps(results, indent=2))
        else:
            for r in results:
                print(f"  {r['label']:40s}  {r['uri']}")
    elif subtypes:
        children = cyc_subtypes(target)
        if as_json:
            print(json.dumps({"parent": target, "subtypes": children}, indent=2))
        else:
            print(f"Subtypes of '{target}' ({len(children)}):")
            for c in children:
                print(f"  {c}")
    else:
        data = cyc_lookup(target)
        if as_json:
            print(json.dumps(data, indent=2))
        else:
            print(_render(data))


if __name__ == "__main__":
    main()
