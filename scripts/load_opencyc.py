#!/usr/bin/env python3
"""
load_opencyc.py — Download OpenCyc OWL and load the full KB into TypeDB.

Prerequisites
─────────────
  1. Start TypeDB:          docker compose up -d
  2. Install dependencies:  pip install -r scripts/requirements.txt
  3. Run this script:       python scripts/load_opencyc.py

What gets loaded
────────────────
  • ~239 000 cyc-class entities          (owl:Class)
  • ~500 000 subclass-of relations       (rdfs:subClassOf)
  • ~69 000  same-as attribute values    (owl:sameAs → DBpedia, WordNet, UMBEL)
  • Labels and comments for all classes

After loading, open TypeDB Studio at http://localhost:1729 and query away.
"""

import gzip
import os
import sys
import time
import urllib.request
from pathlib import Path

TYPEDB_URI  = "localhost:1729"
DB_NAME     = "opencyc"
OWL_URL     = ("https://github.com/asanchez75/opencyc/raw/master/"
               "opencyc-latest.owl.gz")
OWL_PATH    = Path("data/opencyc-latest.owl.gz")
SCHEMA_PATH = Path("scripts/schema.tql")
BATCH_SIZE  = 500       # TypeDB transaction size — tune up if RAM allows

# ── dependency bootstrap ──────────────────────────────────────────────────────

def _pip(*packages: str) -> None:
    import subprocess
    subprocess.check_call(
        [sys.executable, "-m", "pip", "install", "--quiet", *packages]
    )

try:
    from rdflib import Graph, RDF, RDFS, OWL, URIRef
    from rdflib.namespace import OWL as OWLns
except ImportError:
    print("Installing rdflib …"); _pip("rdflib")
    from rdflib import Graph, RDF, RDFS, OWL, URIRef

try:
    from typedb.driver import TypeDB, SessionType, TransactionType
except ImportError:
    print("Installing typedb-driver …"); _pip("typedb-driver")
    from typedb.driver import TypeDB, SessionType, TransactionType

# ── helpers ───────────────────────────────────────────────────────────────────

def _esc(s: str) -> str:
    """Escape a string for a TypeQL literal (max 500 chars)."""
    return (s.replace("\\", "\\\\")
             .replace('"',  '\\"')
             .replace("\n", " ")
             .replace("\r", ""))[:500]

def _progress(label: str, n: int, total: int | None = None) -> None:
    if total:
        bar = int(30 * n / total)
        pct = f"{100*n//total:3d}%  [{'█'*bar}{'░'*(30-bar)}]"
        print(f"\r  {label}: {n:>7,} / {total:,}  {pct}", end="", flush=True)
    else:
        print(f"\r  {label}: {n:>7,} …", end="", flush=True)

def _flush(session, batch: list[str], label: str, n: int) -> int:
    if not batch:
        return n
    with session.transaction(TransactionType.WRITE) as tx:
        for q in batch:
            try:
                tx.query.insert(q)
            except Exception:
                pass          # skip any individual malformed query
        tx.commit()
    n += len(batch)
    return n

# ── download ──────────────────────────────────────────────────────────────────

def download_owl() -> None:
    if OWL_PATH.exists():
        mb = OWL_PATH.stat().st_size / 1_048_576
        print(f"OWL already cached at {OWL_PATH}  ({mb:.1f} MB)")
        return
    OWL_PATH.parent.mkdir(parents=True, exist_ok=True)
    print(f"Downloading {OWL_URL}")
    print("  (this is ~4 MB compressed / ~50 MB uncompressed)")
    t0 = time.time()

    def _hook(count, block, total):
        done = count * block
        mb   = done / 1_048_576
        if total > 0:
            _progress("download", done, total)
        else:
            print(f"\r  {mb:.1f} MB …", end="", flush=True)

    urllib.request.urlretrieve(OWL_URL, OWL_PATH, reporthook=_hook)
    mb = OWL_PATH.stat().st_size / 1_048_576
    print(f"\n  → {mb:.1f} MB in {time.time()-t0:.0f}s")

# ── parse ─────────────────────────────────────────────────────────────────────

def parse_owl() -> Graph:
    print("Parsing OWL (rdflib, ~30–60 s for 2 M triples) …")
    t0 = time.time()
    g  = Graph()
    with gzip.open(OWL_PATH, "rb") as f:
        g.parse(f, format="xml")
    print(f"  → {len(g):,} triples in {time.time()-t0:.0f}s")
    return g

# ── schema ────────────────────────────────────────────────────────────────────

def load_schema(driver) -> None:
    print("Defining schema …")
    schema = SCHEMA_PATH.read_text(encoding="utf-8")
    with driver.session(DB_NAME, SessionType.SCHEMA) as session:
        with session.transaction(TransactionType.WRITE) as tx:
            tx.query.define(schema)
            tx.commit()
    print("  → schema defined")

# ── classes ───────────────────────────────────────────────────────────────────

def load_classes(driver, g: Graph) -> None:
    """Insert every owl:Class as a cyc-class entity."""
    print("Inserting classes …")
    batch: list[str] = []
    n = 0
    classes = list(g.subjects(RDF.type, OWL.Class))
    total   = len(classes)

    with driver.session(DB_NAME, SessionType.DATA) as session:
        for cls in classes:
            uri = str(cls)
            if not uri.startswith("http"):
                continue

            label   = _esc(str(g.value(cls, RDFS.label,   default="")))
            comment = _esc(str(g.value(cls, RDFS.comment, default="")))

            q = f'insert $x isa cyc-class, has cyc-uri "{_esc(uri)}"'
            if label:
                q += f', has cyc-label "{label}"'
            if comment:
                q += f', has cyc-comment "{comment}"'

            # owl:sameAs links (DBpedia, WordNet, UMBEL …)
            same_as_uris = [str(t) for t in g.objects(cls, OWL.sameAs)
                            if str(t).startswith("http")]
            for sa in same_as_uris[:5]:        # cap at 5 per concept
                q += f', has cyc-same-as "{_esc(sa)}"'

            q += ";"
            batch.append(q)
            _progress("classes", len(batch) + n, total)

            if len(batch) >= BATCH_SIZE:
                n = _flush(session, batch, "classes", n)
                batch = []

        n = _flush(session, batch, "classes", n)

    print(f"\n  → {n:,} classes inserted")

# ── subClassOf ────────────────────────────────────────────────────────────────

def load_subclassof(driver, g: Graph) -> None:
    """Insert rdfs:subClassOf as subclass-of relations."""
    print("Inserting subclass-of relations …")
    pairs = [
        (str(sub), str(sup))
        for sub, sup in g.subject_objects(RDFS.subClassOf)
        if str(sub).startswith("http") and str(sup).startswith("http")
    ]
    total = len(pairs)
    batch: list[str] = []
    n = 0

    with driver.session(DB_NAME, SessionType.DATA) as session:
        for sub_uri, sup_uri in pairs:
            q = (
                f'match '
                f'$sub isa cyc-class, has cyc-uri "{_esc(sub_uri)}"; '
                f'$sup isa cyc-class, has cyc-uri "{_esc(sup_uri)}"; '
                f'insert (sub-class: $sub, super-class: $sup) isa subclass-of;'
            )
            batch.append(q)
            _progress("subClassOf", len(batch) + n, total)

            if len(batch) >= BATCH_SIZE:
                n = _flush(session, batch, "subClassOf", n)
                batch = []

        n = _flush(session, batch, "subClassOf", n)

    print(f"\n  → {n:,} subclass-of relations inserted")

# ── emotion-domain object properties ─────────────────────────────────────────

EMOTION_PROPS = {
    "http://sw.opencyc.org/2012/05/10/concept/en/emotionalBlend":       ("emotional-blend",       "input",      "output"),
    "http://sw.opencyc.org/2012/05/10/concept/en/emotionalInhibition":  ("emotional-inhibition",  "inhibitor",  "inhibited"),
    "http://sw.opencyc.org/2012/05/10/concept/en/causes":               ("causes",                "cause",      "effect"),
}

def load_emotion_props(driver, g: Graph) -> None:
    """Insert Cyc emotion object-property triples as typed relations."""
    print("Inserting emotion-domain relations …")
    n = 0
    with driver.session(DB_NAME, SessionType.DATA) as session:
        for prop_uri, (rel_type, role1, role2) in EMOTION_PROPS.items():
            prop = URIRef(prop_uri)
            batch: list[str] = []
            for subj, obj in g.subject_objects(prop):
                s_uri = str(subj)
                o_uri = str(obj)
                if not (s_uri.startswith("http") and o_uri.startswith("http")):
                    continue
                q = (
                    f'match '
                    f'$a isa cyc-class, has cyc-uri "{_esc(s_uri)}"; '
                    f'$b isa cyc-class, has cyc-uri "{_esc(o_uri)}"; '
                    f'insert ({role1}: $a, {role2}: $b) isa {rel_type};'
                )
                batch.append(q)
                if len(batch) >= BATCH_SIZE:
                    n = _flush(session, batch, rel_type, n)
                    batch = []
            n = _flush(session, batch, rel_type, n)

    print(f"\n  → {n:,} emotion-domain relations inserted")

# ── main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    t_start = time.time()

    download_owl()
    g = parse_owl()

    with TypeDB.core_driver(TYPEDB_URI) as driver:
        if driver.databases.contains(DB_NAME):
            ans = input(f"Database '{DB_NAME}' already exists. Re-create? [y/N] ")
            if ans.lower() != "y":
                print("Aborted.")
                return
            driver.databases.get(DB_NAME).delete()

        driver.databases.create(DB_NAME)
        print(f"Created database '{DB_NAME}'")

        load_schema(driver)
        load_classes(driver, g)
        load_subclassof(driver, g)
        load_emotion_props(driver, g)

    elapsed = time.time() - t_start
    print(f"\nDone in {elapsed/60:.0f} min {elapsed%60:.0f} s")
    print("Connect with TypeDB Studio → localhost:1729  database: opencyc")

if __name__ == "__main__":
    main()
