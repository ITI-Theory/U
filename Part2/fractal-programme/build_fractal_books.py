#!/usr/bin/env python3
"""
build_fractal_books.py — Build domain-specific books for the [T]-Theory Fractal Programme.

Each book = kappa (AI-generated, domain-specific) + 3-4 canonical papers + conclusion.
The same canonical papers appear in multiple books; only the framing changes.

Usage:
    python build_fractal_books.py                  # assemble all book bodies
    python build_fractal_books.py --domain physics # assemble one book body
    python build_fractal_books.py --kappas         # generate kappas via API (requires key)
"""

import re
import sys
import os
from pathlib import Path

import yaml

REPO_ROOT   = Path(__file__).resolve().parent.parent.parent
PAPER_DIR   = REPO_ROOT / "paper"
FRACTAL_DIR = Path(__file__).resolve().parent
BLD_DIR     = FRACTAL_DIR / "bld"
KAPPA_DIR   = FRACTAL_DIR / "kappas"
CONC_DIR    = FRACTAL_DIR / "conclusions"
REGISTRY    = REPO_ROOT.parent / "Dist" / "PAPERS.yaml"

# PDF paths for includepdf injection (— absolute paths required; xelatex runs in temp dir)
_BLD_ABS = str(BLD_DIR.resolve()).replace("\\", "/")

def _booklet_cheatsheet_pdf(domain_id: str) -> str:
    """Return the four-page booklet assigned to a specific domain book."""
    return f"{_BLD_ABS}/booklet-{domain_id}.pdf"

def _booklet_pages(domain_id: str) -> str:
    return "\n".join(
        f"\\includepdf[pages=1]{{{_BLD_ABS}/booklet-{domain_id}-{page}.pdf}}"
        for page in range(1, 5)
    )

def _noir_block() -> str:
    return (
        "\n\n```{=latex}\n"
        "\\clearpage\n"
        "\\null\\thispagestyle{empty}\\clearpage\n"
        f"\\includepdf{{{_BLD_ABS}/noir-page.pdf}}\n"
        "\\null\\thispagestyle{empty}\\clearpage\n"
        "```\n\n"
    )

def _cheatsheet_toc(domain_id: str) -> str:
    return (
        "\n\n```{=latex}\n"
        "\\clearpage\n"
        "\\null\\thispagestyle{empty}\\clearpage\n"
        f"{_booklet_pages(domain_id)}\n"
        "\\setcounter{page}{1}\n"
        "\\tableofcontents\n"
        "\\clearpage\n"
        "```\n\n"
    )

def _toc_only() -> str:
    return "\n\n```{=latex}\n\\setcounter{tocdepth}{-1}\n\\tableofcontents\n\\clearpage\n```\n\n"

def _latex_text(text: str) -> str:
    """Escape registry and domain text inserted into raw LaTeX blocks."""
    return (text.replace("\\", r"\\textbackslash{}")
                .replace("&", r"\\&")
                .replace("%", r"\\%")
                .replace("_", r"\\_"))

def _book_part_opening(domain_id: str) -> str:
    """Create a navigable opening page before a book inside a composite volume."""
    domain = get_domain(domain_id)
    registry_book = get_registry_book(domain_id)
    title = _latex_text(domain["title"])
    subtitle = _latex_text(domain["subtitle"])
    green_id = _latex_text(registry_book["green_id"])
    audience = _latex_text(registry_book["audience"])
    return (
        "\n\n```{=latex}\n"
        f"\\part{{{title}}}\n"
        f"\\markboth{{{title}}}{{{title}}}\n"
        "\\begin{center}\n"
        f"{{\\large\\itshape {subtitle}\\par}}\n"
        "\\vspace{10mm}\n"
        f"{{\\sffamily\\bfseries G-ID: {green_id}\\par}}\n"
        "\\vspace{4mm}\n"
        f"{{\\sffamily Reader: {audience}\\par}}\n"
        "\\end{center}\n"
        "\\clearpage\n"
        f"{_booklet_pages(domain_id)}\n"
        "\\clearpage\n"
        "```\n\n"
    )

def _gateway_cheatsheet_note() -> str:
    return (
        "\n\n## A Note on the Cheatsheet\n\n"
        "The four-page [T]-Theory Cheatsheet appears at the end of this Gateway. "
        "It is the programme's standalone public summary: a pre-reading map "
        "for the Fractal Programme, the academic papers, and the wider cultural "
        "work. Read it now as a preview, or return to it after this book as a "
        "compact record of what the Gateway has opened.\n"
    )

# Strips YAML frontmatter from canonical papers (same as build_omnibus.py)
_FM_RE  = re.compile(r"^---\n[\s\S]*?\n---\n\n?", re.MULTILINE)
_REF_RE = re.compile(r"\n#{1,3}\s+References\b[\s\S]*$", re.IGNORECASE)

DEFAULT_BOOKLET_WHY = (
    "a disturbance in one place changes what is possible somewhere else. "
    "[T]-Theory asks what becomes testable when propagation, memory, and "
    "collective coordination are treated as one field problem — across matter, "
    "minds, markets, and the cosmos."
)

BOOKLET_WHY = {
    "gateway": (
        "the same question links a guitar string, a felt emotion, a social "
        "encounter, and the night sky: if something happens here, what is felt "
        "there? [T]-Theory treats that question as a field problem and gives a "
        "reader one equation from which to enter the whole programme."
    ),
    "physics": (
        "a Green's function is not just a technical solution; it is the most "
        "direct account of how a disturbance becomes an effect. [T]-Theory "
        "uses that common response law to connect field theory, compactification, "
        "and the cosmological questions of dark energy and dark matter."
    ),
    "complex-systems": (
        "complex systems become intelligible when their many local interactions "
        "are read as one evolving field. [T]-Theory treats emergence, criticality, "
        "and long-range coordination as different expressions of a shared "
        "propagator and attractor landscape."
    ),
    "formal-mathematics": (
        "a good formal system does more than describe an idea: it makes invalid "
        "moves impossible. [T]-Theory uses dependent types, proofs, and field "
        "geometry to ask which claims about propagation survive machine checking."
    ),
    "neuroscience": (
        "neural activity is not only a collection of neurons firing; it is also "
        "a field that integrates activity across tissue and time. [T]-Theory "
        "treats the cortical electromagnetic field as a testable bridge between "
        "local signals, global coordination, and felt state."
    ),
    "consciousness": (
        "the hard problem changes shape when consciousness is approached as a "
        "transition in an integrated physical field. [T]-Theory asks what happens "
        "when correlation, propagation, and regulation cross the threshold from "
        "local processing to a unified point of view."
    ),
    "computer-science": (
        "software, proof, and coordination all depend on how information moves "
        "through a structured system. [T]-Theory treats propagators as computational "
        "objects: they can be verified in Lean, tested in networks, and used to "
        "reason about collective action."
    ),
    "music-arts": (
        "music makes a field audible: rhythm, expectation, memory, and bodily "
        "response become one moving pattern. [T]-Theory treats art as an instrument "
        "for exploring affective propagation, not as decoration added after the science."
    ),
    "clinical-psychology": (
        "a person is not their trauma; trauma can be modelled as a constrained "
        "path through an energy landscape. [T]-Theory asks how field temperature, "
        "memory, and safe intervention change the chances of leaving a deep attractor."
    ),
    "psychiatry-asd": (
        "different nervous systems need not be reduced to deficits or labels. "
        "[T]-Theory treats attention, sensory regulation, memory, and social "
        "coupling as field architectures with distinct costs, affordances, and paths to support."
    ),
    "social-science": (
        "society is made of relations that carry trust, attention, fear, and "
        "meaning across people. [T]-Theory treats rapport, contagion, and collective "
        "coordination as propagating patterns that can be described without erasing "
        "individual agency."
    ),
    "geophysics": (
        "the Earth records disturbances as waves, faults, and long-lived material "
        "memory. [T]-Theory treats seismic propagation as a physical instance of "
        "the same Green's-function grammar used to study memory and response at other scales."
    ),
    "law": (
        "law asks which social commitments remain stable when power and circumstance "
        "change. [T]-Theory treats rights, precedent, and institutional constraint as "
        "patterns of propagation and invariance in a collective field."
    ),
    "ppe": (
        "philosophy, politics, and economics meet wherever individual choices become "
        "collective outcomes. [T]-Theory treats minds, markets, and mandates as coupled "
        "fields, asking which structures create stable cooperation and which trap a society."
    ),
    "economics": (
        "an equilibrium tells us where a market can settle, but not how it "
        "gets there, why it becomes trapped, or what intervention can move it. "
        "[T]-Theory treats markets as field dynamics: shocks, prices, policy, "
        "and coordination become forces acting on an economic landscape."
    ),
}

HUD_HEADERS = {
    "economics": "ECONOMIC SCAN",
    "law": "LEGAL INFERENCE",
}

def get_registry_book(domain_id: str) -> dict:
    """Return the authoritative Dist registry record for a Fractal book."""
    registry = yaml.safe_load(REGISTRY.read_text(encoding="utf-8"))
    slug = f"ttheory-book-{domain_id}"
    for record in registry["collections"]:
        if record["slug"] == slug:
            return record
    raise ValueError(f"Missing registry record for {slug}")

def field_notes_block(domain_id: str) -> str:
    domain = get_domain(domain_id)
    hud_header = HUD_HEADERS.get(domain_id, "FIELD SCAN")
    registry_book = get_registry_book(domain_id)

    identity = {
        "G-ID": registry_book["green_id"],
        "DOMAIN": domain["field"],
        "READER": registry_book["audience"],
        "SCALE": registry_book["hud_scale"],
        "EQUATION": registry_book["hud_equation"],
        "OPERATOR": registry_book["hud_operator"],
    }
    notes = {
        "INVARIANT": registry_book["hud_invariant"],
        "OBSERVABLE": registry_book["hud_observable"],
        "PENDING": registry_book["hud_status"],
    }

    def render_lines(items: dict[str, str], markers: bool) -> str:
        lines = []
        for key, value in items.items():
            label = f"\\texttt{{\\textbf{{{key}:>}}}}"
            if markers and key == "PENDING":
                value = "\\textcolor{ledorange}{[ ~ AWAITING ]} " + value
            elif markers and key in {"EVIDENCE", "ABDUCE", "DEDUCE"}:
                value = "\\textcolor{hudok}{[ + ]} " + value
            lines.append(f"{label} {value}")
        return "\\\\\n".join(lines)

    identity_content = render_lines(identity, False)
    analysis_content = render_lines(notes, True)
    if not analysis_content:
        analysis_content = "\\textbf{READING} Use the shared mathematics as a domain lens; this flyer identifies the relevant propagator."

    return (
        "\n\n\\finishbookletcolumns\n"
        "\\begin{center}\\includegraphics[width=20mm]{figures/t-theory-sticker.png}\\end{center}\n"
        "\\vfill\n"
        "\\noindent\\textcolor{hudline}{\\rule{\\textwidth}{0.35pt}}\n"
        "\\vspace{1pt}\\noindent{\\sffamily\\tiny\\color{hudtext}"
        f"\\textcolor{{white}}{{[}} FIELD NOTES / {hud_header} \\textcolor{{white}}{{]}}\\hfill"
        "\\textcolor{ledorange}{[ ~ AWAITING VALIDATION ]}}\\par\n"
        "\\vspace{2pt}\\noindent\\textcolor{hudline}{\\rule{\\textwidth}{0.25pt}}\\par\\vspace{2pt}"
        "\\noindent{\\scriptsize\\color{hudtext}\\raggedright "
        + identity_content + "}\n"
        "\\par\\vspace{3pt}\\noindent\\textcolor{hudline}{\\rule{\\textwidth}{0.25pt}}\\par\\vspace{2pt}"
        "\\noindent{\\sffamily\\tiny\\color{hudtext}\\textcolor{white}{[} ABDUCTING:> \\textcolor{white}{]}}\\par\n"
        "\\vspace{1pt}\\noindent{\\scriptsize\\color{hudtext}\\raggedright "
        + analysis_content + "}\n"
        "\\vspace{2pt}\\noindent\\textcolor{hudline}{\\rule{\\textwidth}{0.35pt}}\n"
    )

def build_booklet_source(domain_id: str) -> None:
    """Create a domain booklet by replacing only the default elevator pitch."""
    source = PAPER_DIR / "soma/ttheory-cheatsheet/ttheory-cheatsheet.md"
    text = source.read_text(encoding="utf-8")
    pitch = BOOKLET_WHY.get(domain_id, DEFAULT_BOOKLET_WHY)
    pattern = r"\\noindent\\textit\{Why this exists:\}.*?\n\n\\vspace\{5pt\}"
    replacement = "\\noindent\\textit{Why:} " + pitch + "\n\n\\vspace{5pt}"
    output, count = re.subn(pattern, lambda _: replacement, text, count=1, flags=re.DOTALL)
    if count != 1:
        raise ValueError("Default booklet elevator pitch marker not found")
    footer = "\n\\vfill\\begin{center}\\includegraphics[width=28mm]{figures/t-theory-sticker.png}\\end{center}"
    output = output.replace(footer, field_notes_block(domain_id), 1)
    out_path = BLD_DIR / f"booklet-{domain_id}.md"
    out_path.write_text(output, encoding="utf-8")
    print(f"  -> {out_path.name}")

def get_canonical_body(paper_name: str) -> str:
    """Load a paper from paper/soma/ (the canonical 19)."""
    path = PAPER_DIR / "soma" / paper_name / f"{paper_name}.md"
    if not path.exists():
        print(f"  WARNING: canonical paper not found: {paper_name}", file=sys.stderr)
        return ""
    text = path.read_text(encoding="utf-8")
    text = _FM_RE.sub("", text, count=1)
    text = _REF_RE.sub("", text)
    return text.strip()

def get_fractal_body(paper_name: str) -> str:
    """Load a paper from Part2/fractal-programme/ (new anchor papers)."""
    path = FRACTAL_DIR / paper_name / f"{paper_name}.md"
    if not path.exists():
        print(f"  WARNING: fractal paper not found: {paper_name}", file=sys.stderr)
        return ""
    text = path.read_text(encoding="utf-8")
    text = _FM_RE.sub("", text, count=1)
    text = _REF_RE.sub("", text)
    return text.strip()

def get_paper_body(paper_ref: str) -> str:
    """Load a paper by reference (canonical: 'c:name', fractal: 'f:name')."""
    if paper_ref.startswith("c:"):
        return get_canonical_body(paper_ref[2:])
    elif paper_ref.startswith("f:"):
        return get_fractal_body(paper_ref[2:])
    else:
        # Auto-detect
        body = get_canonical_body(paper_ref)
        if body:
            return body
        return get_fractal_body(paper_ref)


# ---------------------------------------------------------------------------
# Domain definitions — 15 books total
# Each entry: id, title, subtitle, audience, field, papers, kappa_prompt_extra
# ---------------------------------------------------------------------------

DOMAINS = [
    {
        "id": "gateway",
        "title": "[T]-Theory: A Universal Field Theory of Mind, Body, and Cosmos",
        "subtitle": "An Introduction to the Fractal Programme",
        "audience": "curious educated reader with no specialist background",
        "field": "general public / science communication",
        "papers": ["c:soma-field-synthesis", "c:soma-field-book", "c:soma-field-paper"],
        "prompt_extra": "Write for an intelligent non-specialist. No equations required. Use the elevator pitch style. The book should be the one a geophysicist could hand to their partner to explain what they're reading about.",
        "green_id": "The Universal Propagator — G(x,x’) at the Hubble scale",
        "green_narrative": "The Green Propagator answers the most fundamental question in physics: if something happens here, what is felt there? In this gateway book, it is the invisible thread connecting every chapter — from the vibration of a guitar string to the emotional state of a person in crisis to the expansion of the observable universe. You do not need the mathematics to feel it. Look for the moments when the book shows two very different things behaving in exactly the same way: that sameness is the propagator at work. The whole programme has one equation; this book shows you what it means.",
        "noir_page": True,
    },
    {
        "id": "physics",
        "title": "Field Equations of Mind: A Physics Perspective on the Universal Somatic Field",
        "subtitle": "[T]-Theory Volume: Mathematical Physics",
        "audience": "physicists and astrophysicists",
        "field": "mathematical physics, astrophysics, quantum field theory",
        "papers": ["c:soma-field-paper", "c:quantum-soma-penrose", "c:universal-somatic-field",
                   "c:zoomable-somatic-field", "c:cosmological-constant-derivation",
                   "c:dark-matter-spatial-vacuum", "c:g2-symmetry-breaking"],
        "prompt_extra": "Assume fluency with QFT, GR, and M-theory. Lead with the Green's function identification and the cosmological limit. Mention that the SHO of string theory is derived here, not postulated.",
        "green_id": "The Master Green’s Function — (∇²+k²)G=δ in relativistic field theory",
        "green_narrative": "The Master Green’s Function is the generating object of the entire theory — the fundamental solution to $(\\nabla^2 + k^2)G = -\\delta^3(x-x’)$ that encodes all causal propagation from source to field point. In this book you will see it at every scale from the SHO at scale 1 to the gravitational wave propagator at scale 20, always the same functional form, always the same equation. The cosmological predictions — $\\Omega_\\Lambda = 7/11$, $\\Omega_c = 3/11$ — emerge as boundary conditions on this function at the compactification scale. Follow the propagator through every chapter: every major result is either a special case of $G$, a pole of $G$, or a symmetry of $G$.",
    },
    {
        "id": "neuroscience",
        "title": "The Electromagnetic Nervous System: A Field-Theoretic Account of Neural Dynamics",
        "subtitle": "[T]-Theory Volume: Neuroscience",
        "audience": "neuroscientists, cognitive scientists",
        "field": "neuroscience, cognitive neuroscience, computational neuroscience",
        "papers": ["c:soma-physical-substrate", "c:missing-limbic-layer", "c:preverbal-manifold", "c:soma-field-paper"],
        "prompt_extra": "Lead with the CEMI field identification and the FM-HN result. Connect to McFadden and the existing CEMI literature. The Arnold tongue width as the neural analogue of attentional bandwidth.",
        "green_id": "The Cortical EMF Propagator — macroscopic field from synchronised neural firing",
        "green_narrative": "The Cortical EMF Propagator is the macroscopic electromagnetic field generated by synchronised neural firing — the field that carries the causal power of conscious experience. In this book it is the bridge between the microscale (synaptic transfer functions, individual neurons) and the mesoscale (gamma-band coherence, global workspace dynamics). Each paper in this collection uses a different instrument — EEG, fMRI, TMS, psychophysics — to probe the same underlying field from a different angle. The BRECVEMA mechanisms are the eight basis vectors of this field; the cortical EMF propagator is what moves excitation from one basis direction to another. Watch for the moments when the book shows synchronisation arising spontaneously: that is the propagator’s correlation length $\\ell = 1/k$ growing large enough to couple distant regions.",
    },
    {
        "id": "clinical-psychology",
        "title": "Trauma as Topology: A Field-Theoretic Manual for Clinical Practice",
        "subtitle": "[T]-Theory Volume: Clinical Psychology and Psychotherapy",
        "audience": "clinical psychologists, therapists, psychiatrists",
        "field": "clinical psychology, psychotherapy, trauma studies",
        "papers": ["c:soma-field-patient-pov", "c:SFT-DEMO-CASE", "c:missing-limbic-layer", "c:preverbal-manifold",
                   "c:soma-field-synthesis", "c:experimental-validation", "c:soma-field-paper"],
        "prompt_extra": "Write for practitioners. Lead with the clinical implications: trauma wells, somatic injection, the God-Knob as therapeutic intervention. No excessive physics. The DEMO-CASE paper should be presented as illustrating the framework in action.",
        "green_id": "Trauma-Well Resolution — escape probability from a somatic attractor basin",
        "green_narrative": "The Trauma-Well Resolution is the escape probability from a deep, narrow attractor basin in somatic field space — the mathematical answer to the clinical question: how likely is this person to recover? In this book, every chapter is organised around this central object. The assessment tools measure the well's depth and width; the intervention protocols are designed to raise the field temperature or reshape the basin geometry; the case studies show what the trajectory through the landscape looks like in real clinical time. As you read, hold in mind that the trauma is not the person — it is a feature of the energy landscape the person is navigating, and landscapes can be changed.",
    },
    {
        "id": "computer-science",
        "title": "Verified Emotional Computing: The Universal Somatic Field as Software Architecture",
        "subtitle": "[T]-Theory Volume: Computer Science and AI",
        "audience": "computer scientists, AI researchers, software engineers",
        "field": "computer science, artificial intelligence, formal verification",
        "papers": ["c:swarm-propagator", "c:experimental-validation", "c:soma-field-synthesis",
                   "c:mathematical-co-identification", "c:lean-proofs-appendix", "c:soma-field-paper"],
        "prompt_extra": "Lead with the Lean 4 kernel verification and the O(N^2) result. The Benchmark.lean timing comparison is the concrete deliverable. The swarm coordination result has immediate applications in multi-agent AI.",
        "green_id": "Affective State Propagator — computational kernel for agent field dynamics",
        "green_narrative": "The Affective State Propagator is the computational kernel that maps external stimuli to internal agent states — the software-level description of what happens inside a Lean 4 proof when an axiom is discharged, inside an AI agent when a reward signal arrives, and inside a human when a musical phrase resolves. In this book you will see it in three guises: as the Lean 4 type system’s path from hypothesis to conclusion, as the multi-agent coordination function in swarm algorithms, and as the formal description of emotional state transitions in BRECVEMA space. The verified proofs in this book are not separate from the physics — they ARE the physics, instantiated in Lean’s type theory. The propagator is the proof.",
    },
    {
        "id": "formal-mathematics",
        "title": "Dependent Types and the Geometry of Feeling: A Mathematical Account",
        "subtitle": "[T]-Theory Volume: Formal Logic and Mathematics",
        "audience": "mathematicians, logicians, type theorists",
        "field": "formal mathematics, type theory, algebraic topology, HoTT",
        "papers": ["c:mathematical-co-identification", "c:soma-field-paper", "c:universal-somatic-field",
                   "c:zoomable-somatic-field", "c:lean-proofs-appendix"],
        "prompt_extra": "Lead with the HoTT formulation and the dependent type architecture. The 20-scale ScaleUniverse type is a mathematical object. The consciousness threshold theorem as a sharp dichotomy. Lean 4 proofs as primary evidence.",
        "green_id": "Functorial Green’s Function — category-theoretic propagator between field spaces",
        "green_narrative": "The Functorial Green’s Function is the natural transformation that makes the USF a mathematically rigorous object: a morphism in the category of field configurations that preserves the structural equations across the 20-level scale hierarchy. In this book you will see the same abstract pattern — a $\\Sigma$-type over a scale base with functorial transition maps — instantiated at every scale. The Lean 4 proofs are not decoration; they are the primary evidence. Each theorem you encounter is a node in a proof tree whose root is the gate theorem \\texttt{calabi\\_yau\\_moduli\\_static}, itself derived from the RigidAttractor axiom in LocalGR.lean. The propagator here is not just a physics object; it is a type-theoretic witness.",
    },
    {
        "id": "consciousness",
        "title": "The Hard Problem Dissolved: Consciousness as a Phase Transition in a Physical Field",
        "subtitle": "[T]-Theory Volume: Consciousness Studies and Philosophy of Mind",
        "audience": "philosophers of mind, consciousness researchers",
        "field": "philosophy of mind, consciousness studies, phenomenology",
        "papers": ["c:universal-somatic-field", "c:quantum-soma-penrose", "c:soma-physical-substrate",
                   "c:preverbal-manifold", "c:soma-field-synthesis", "c:soma-field-paper", "c:missing-limbic-layer"],
        "prompt_extra": "Lead with the consciousness threshold T_c as a phase transition. The hard problem is not mysterious; it is mis-stated. Qualia are the internal view of the field crossing T_c. Connect to Chalmers, IIT, and CEMI. The Penrose quantum tunnelling connection.",
        "green_id": "Conscious Percept Propagator Pole — singularity at phase transition threshold Tᴄ",
        "green_narrative": "The Conscious Percept Propagator Pole is the mathematical singularity at scale 7 where the field’s correlation length becomes infinite — the precise point at which the local becomes global, and subjectivity begins. In this book, this pole is the answer to the hard problem: not a mystery to be explained away, but a structural feature of any sufficiently integrated field. As you read, notice how each philosophical position explored — IIT, GWT, CEMI, phenomenology — is trying to describe a different aspect of the same pole. The hard problem was never about explaining experience; it was about finding the right singularity. This book locates it.",
    },
    {
        "id": "complex-systems",
        "title": "Scale-Free Dynamics: The Universal Somatic Field as a Complex Systems Framework",
        "subtitle": "[T]-Theory Volume: Complex Systems and Emergence",
        "audience": "complex systems researchers, network scientists",
        "field": "complex systems, emergence, self-organisation, network science",
        "papers": ["c:zoomable-somatic-field", "c:geographic-somatic-field", "c:swarm-propagator",
                   "c:gestalt-field-dynamics", "c:soma-field-paper", "c:soma-field-synthesis"],
        "prompt_extra": "Lead with the 20-scale invariance and what it means for emergence: the same dynamics at every scale. The geographic somatic field paper shows the same equation governing dialect spread and bird murmurations. Power-law statistics as signatures of criticality.",
        "green_id": "Scale-Invariant Propagator — G invariant under renormalisation group flow",
        "green_narrative": "The Scale-Invariant Propagator is the fixed point of the renormalisation group: the function $G$ that remains structurally unchanged when you zoom in or zoom out. In this book, that invariance is the explanation for power laws, long-range correlations, and the emergence of complexity — not as mysterious phenomena, but as consequences of operating near a fixed point in function space. As you read, watch for the places where apparently unrelated systems (neural networks, city dialects, financial markets) exhibit the same scaling behaviour. That is the propagator asserting itself across substrates. Every chapter in this book is a different substrate; the propagator is the same object in each.",
    },
    {
        "id": "music-arts",
        "title": "The Physics of Music and Affect: A Field-Theoretic Account of Aesthetic Experience",
        "subtitle": "[T]-Theory Volume: Music, Arts, and Aesthetics",
        "audience": "musicologists, music psychologists, artists, composers",
        "field": "music psychology, musicology, aesthetics, cognitive science of art",
        "papers": ["c:music-affect-dynamics", "c:the-tensor", "c:soma-field-book", "c:soma-field-synthesis"],
        "prompt_extra": "Lead with the BRECVEMA mechanisms and what it means that music is a field perturbation. The Tensor film as the artistic output of the framework. The Strandberg guitar as a closed-loop somatic feedback instrument. Music as the art of engineering attractor traversal.",
        "green_id": "Aesthetic Field Perturbation — BRECVEMA impulse response to musical stimulus",
        "green_narrative": "The Aesthetic Field Perturbation is what happens to the 8-dimensional BRECVEMA emotional field when a musical stimulus arrives: the brainstem reflex fires, the rhythm-entrained body starts to move, the memory of a lost person surfaces, and the aesthetic judgement integrates it all into a single felt response. In this book, each paper illuminates a different mechanism in that chain. The propagator is the impulse response — how strongly, how long, and through which pathways the music moves through you. The ‘chills’ response is the field briefly crossing the consciousness threshold $T_c$; the musical climax is the field approaching its maximum correlation length. As you read, the music you have loved all your life will acquire a geometry.",
    },
    {
        "id": "geophysics",
        "title": "The Geological Soma: Seismic Propagation and Tectonic Criticality",
        "subtitle": "[T]-Theory Volume: Geophysics and Earth Sciences",
        "audience": "geophysicists, seismologists, Earth scientists",
        "field": "geophysics, seismology, tectonics, Earth sciences",
        "papers": ["c:geographic-somatic-field", "c:zoomable-somatic-field", "f:soma-geophysics",
                   "c:soma-field-paper", "c:soma-field-synthesis", "c:universal-somatic-field"],
        "prompt_extra": "Lead with the seismic propagator as an instance of the master Green's function. The WKB prediction for earthquake nucleation as the main testable result. Rock strata as geological memory. Contrast with standard Gutenberg-Richter without theoretical derivation.",
        "green_id": "Seismic Memory Propagator — elastic Green’s function for crustal wave propagation",
        "green_narrative": "The Seismic Memory Propagator is Earth’s elastic Green’s function — the fundamental solution that encodes how a tectonic disturbance at one location is felt at another, minutes or hours later. In this book you will see that this propagator is not merely analogous to the USF master equation: it is a specific instance of it, evaluated at scale 10 with Earth’s physical parameters. The WKB predictions for earthquake nucleation, the normal-mode spectrum of the planet’s free oscillations, the seismic memory of past events encoded in the rock — all are features of the same Green’s function you would compute in quantum mechanics or neural dynamics, just at a different scale. The Earth remembers; the propagator is the memory.",
    },
    {
        "id": "social-science",
        "title": "The Physics of Society: Collective Dynamics, Rapport, and Social Field Theory",
        "subtitle": "[T]-Theory Volume: Social Science and Sociology",
        "audience": "sociologists, social psychologists, anthropologists",
        "field": "sociology, social psychology, anthropology, political science",
        "papers": ["c:geographic-somatic-field", "c:swarm-propagator", "f:soma-social-intelligence",
                   "c:gestalt-field-dynamics", "c:soma-field-synthesis", "c:soma-field-paper"],
        "prompt_extra": "Lead with rapport as Huygens frequency locking and the SQ definition. The geographic somatic field paper shows real geographic social phenomena. The swarm O(N^2) result applies to organisational coordination. Social trust as spectral gap.",
        "green_id": "The Rapport Propagator — social interaction kernel for coordination and contagion waves",
        "green_narrative": "The Rapport Propagator is the two-point correlation function between two agents’ emotional fields — it measures how much of what one person feels, the other comes to feel, and over what timescale. In this book it is the basic building block of social cohesion, cultural transmission, and institutional memory. Each paper in the collection examines a different manifestation of the same kernel: linguistic innovation spreading across geographic space, collective behaviour coordinating in cities, social norms stabilising as attractor configurations. As you read, look for the moment when individual psychology (one person, one field) becomes collective dynamics (a population, one shared field). That transition — always happening at the same mathematical threshold — is the rapport propagator becoming dominant.",
    },
    {
        "id": "economics",
        "title": "Economic Criticality: Game Theory, Market Dynamics, and the Somatic Field",
        "subtitle": "[T]-Theory Volume: Economics and Game Theory",
        "audience": "economists, game theorists, financial mathematicians",
        "field": "economics, game theory, financial mathematics, mechanism design",
        "papers": ["c:swarm-propagator", "c:experimental-validation", "f:soma-game-theory",
                   "c:soma-field-synthesis", "c:mathematical-co-identification", "c:soma-field-paper"],
        "prompt_extra": "Lead with Nash equilibrium = Hopfield minimum. Market crashes as topological phase transitions. The WKB prediction for minimum regulatory intervention strength. The prisoner's dilemma as topological obstruction. O(N^2) coordination as market efficiency target.",
        "green_id": "The Nash Attractor Resolvent — (H-λ)⁻¹ determining market equilibrium",
        "green_narrative": "The Nash Attractor Resolvent is the operator $(H_\\mathrm{market} - \\lambda I)^{-1}$ — the mathematical object that determines which Nash equilibria exist, how stable they are, and which one a market will settle into from a given initial condition. In this book you will see that every major result in classical and behavioural economics can be re-expressed as a statement about the spectrum of this resolvent: Arrow-Debreu as the existence of a stable pole, market failure as a degenerate eigenvalue, Keynes’s animal spirits as field temperature fluctuations destabilising shallow basins. As you read, the question at the centre of every chapter is the same: given the coupling matrix $W_\\mathrm{market}$, where do the poles lie, and which one dominates?",
    },
    {
        "id": "law",
        "title": "Topology of Justice: Law, Rights, and the Geometry of Social Constraint",
        "subtitle": "[T]-Theory Volume: Law and Jurisprudence",
        "audience": "legal scholars, jurisprudents, political scientists, policymakers",
        "field": "law, jurisprudence, political theory, regulatory studies",
        "papers": ["c:soma-field-synthesis", "c:universal-somatic-field", "f:soma-law",
                   "c:mathematical-co-identification", "c:soma-field-paper", "c:soma-physical-substrate"],
        "prompt_extra": "Lead with rights as topological invariants. The rule of law as ergodicity. Legal uncertainty as attractor fragmentation. Do not assume physics background; introduce the key concepts through legal analogies first. The constitutional meta-constraint argument is the most accessible entry point.",
        "green_id": "The Rights Invariant — topological propagator for legal precedent and norm diffusion",
        "green_narrative": "The Rights Invariant is the topological propagator for legal norm diffusion — the mathematical object that determines whether a right can be removed by ordinary legislative change or whether it is protected by a non-trivial topological charge. In this book you will see that this is not merely a metaphor: the mathematical structure of constitutional law — amendments, judicial review, constitutional moments — precisely mirrors the structure of topological field theory. As you read, ask of each legal doctrine: what is its winding number? Does precedent preserve or deform it? The Rights Invariant answers these questions geometrically, making explicit what legal intuition has always known: some things are deeper than statute.",
    },
    {
        "id": "ppe",
        "title": "Mind, Market, and Mandate: A Field-Theoretic Synthesis for PPE",
        "subtitle": "[T]-Theory Volume: Philosophy, Politics, and Economics",
        "audience": "PPE students and scholars, political economists, philosophers",
        "field": "philosophy, politics, economics (Oxford PPE tradition)",
        "papers": ["c:soma-field-synthesis", "f:soma-game-theory", "f:soma-law", "c:soma-field-patient-pov",
                   "c:universal-somatic-field", "c:mathematical-co-identification", "c:soma-field-paper"],
        "prompt_extra": "This is the edge-case test book. PPE covers philosophy (consciousness, mind-body), politics (governance, regulation), and economics (game theory, markets). Show that the same master equation governs all three. The patient-perspective paper grounds the abstraction in lived experience.",
        "green_id": "The Mandate Consensus Propagator — collective decision kernel in democratic field theory",
        "green_narrative": "The Mandate Consensus Propagator is the collective decision kernel — the mathematical description of how individual preferences aggregate into a shared political will, how long that will persists, and under what conditions it dissolves. In this book you will encounter three disciplines that have historically spoken past each other: philosophy (what is the good?), politics (who decides?), and economics (at what cost?). The propagator is the common language. Watch for how the same mathematical object — a Green’s function with characteristic timescale $\\tau_\\mathrm{mandate}$ — appears in Rawlsian deliberation, in Arrow’s impossibility theorem, and in market mechanism design. The question of collective action is, at its mathematical core, a question about the topology of this propagator.",
    },
    {
        "id": "psychiatry-asd",
        "title": "Rewiring the Field: A Formal Account of Neurodivergence and Trauma",
        "subtitle": "[T]-Theory Volume: Psychiatry, ASD, and Trauma",
        "audience": "psychiatrists, psychologists, neurodivergent people and their families",
        "field": "psychiatry, clinical psychology, neurodevelopmental conditions",
        "papers": ["c:missing-limbic-layer", "c:preverbal-manifold", "c:soma-field-patient-pov", "f:soma-asd-unified",
                   "c:experimental-validation", "c:quantum-soma-penrose", "c:soma-physical-substrate"],
        "prompt_extra": "Lead with the operator modification framing: ASC and CPTSD are not disorders but field modifications. The ASD operator (high beta, narrow Arnold tongue) and the CPTSD operator (non-ergodic, EC decoupled). Why they co-occur. Clinical implications for therapeutic order. Write with care for the lived experience of neurodivergent readers.",
        "green_id": "Clinical Operator Propagator — resolvent of the Hopfield Hamiltonian in the clinical regime",
        "green_narrative": "The Clinical Operator Propagator is the resolvent of the Hopfield Hamiltonian evaluated in the clinical parameter regime — the mathematical object that tells you which attractor basin the patient's emotional system will settle into, given its current coupling matrix $W_8$. In this book, every diagnostic category is a different topology of this resolvent: ASD is a coupling matrix with altered off-diagonal structure, ADHD is one operating at elevated field temperature, CPTSD is one with an anomalously deep trauma well. The pharmacological interventions you know are perturbations to the parameters of the resolvent. As you read, the clinical pictures will become geometrically legible. The book's aim is not to reduce persons to equations, but to give the equations enough precision that the person's complexity is visible, not obscured.",
    },
]


def get_domain(domain_id: str) -> dict:
    for d in DOMAINS:
        if d["id"] == domain_id:
            return d
    raise ValueError(f"Unknown domain: {domain_id}")


def assemble_book_body(domain_id: str) -> str:
    domain = get_domain(domain_id)
    BLD_DIR.mkdir(exist_ok=True)

    frontmatter = f"""\
---
title: "{domain['title']}"
subtitle: "{domain['subtitle']}"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
---"""

    sections = [frontmatter]

    # Noir page (gateway only) — pre-built PDF, blank verso before and after
    if domain.get("noir_page"):
        sections.append(_noir_block())
        print("  + noir-page")
        sections.append(_toc_only())
        sections.append(_gateway_cheatsheet_note())
    else:  # all other books: cheatsheet then TOC
        sections.append(_cheatsheet_toc(domain_id))
        print("  + four-page booklet")

    # G-ID narrative section — injected before kappa so it opens every book
    green_id        = domain.get("green_id", "")
    green_narrative = domain.get("green_narrative", "")
    if green_id or green_narrative:
        gid_block = "\n\n## The Green Propagator\n\n"
        if green_id:
            gid_block += f"**G-ID:** *{green_id}*\n\n"
        if green_narrative:
            gid_block += f"{green_narrative}\n"
        sections.append(gid_block)

    # Load kappa
    kappa_path = KAPPA_DIR / f"kappa-{domain_id}.md"
    if kappa_path.exists():
        sections.append(f"\n\n{kappa_path.read_text(encoding='utf-8').strip()}\n")
        print(f"  + kappa-{domain_id}")
    else:
        sections.append(f"\n\n# Introduction\n\n*(Kappa not yet generated — run with --kappas)*\n")

    # Load papers
    for paper_ref in domain["papers"]:
        body = get_paper_body(paper_ref)
        if body:
            paper_name = paper_ref.split(":", 1)[-1] if ":" in paper_ref else paper_ref
            sections.append(f"\n\n\\newpage\n\n{body}\n")
            print(f"  + {paper_name}")

    # Load conclusion
    conc_path = CONC_DIR / f"conclusion-{domain_id}.md"
    if conc_path.exists():
        sections.append(f"\n\n\\newpage\n\n{conc_path.read_text(encoding='utf-8').strip()}\n")
        print(f"  + conclusion-{domain_id}")

    if domain_id == "gateway":
        rosetta = get_canonical_body("zoomable-somatic-field")
        if rosetta:
            sections.append(
                "\n\n\\newpage\n\n\\appendix\n\n"
                "# Technical Foundation: The Zoomable Universal Somatic Field\n\n"
                "*The academic Rosetta Stone for the [T]-Theory Fractal Programme.*\n\n"
                f"{rosetta}\n"
            )
            print("  + zoomable-somatic-field (Gateway technical foundation)")

        sections.append(
            "\n\n\\newpage\n\n# [T]-Theory Cheatsheet\n\n"
            "```{=latex}\n"
            f"{_booklet_pages(domain_id)}\n"
            "```\n"
        )
        print("  + default cheatsheet (Gateway closing handout)")

    return "\n".join(sections)


def main():
    BLD_DIR.mkdir(exist_ok=True)
    KAPPA_DIR.mkdir(exist_ok=True)
    CONC_DIR.mkdir(exist_ok=True)

    if "--kappas" in sys.argv:
        generate_kappas()
        return

    if "--booklet" in sys.argv:
        domain_id = sys.argv[sys.argv.index("--booklet") + 1]
        build_booklet_source(domain_id)
        return

    if "--omnibus" in sys.argv:
        build_omnibus()
        return

    if "--vol1" in sys.argv:
        build_volume(VOL1_IDS, "vol1",
                     "[T]-Theory: The Fractal Programme — Volume I: Foundation",
                     "Gateway · Physics · Formal Mathematics · Neuroscience · Consciousness · Complex Systems · Computer Science")
        return

    if "--vol2" in sys.argv:
        build_volume(VOL2_IDS, "vol2",
                     "[T]-Theory: The Fractal Programme — Volume II: Application",
                     "Music & Arts · Geophysics · Social Science · Economics · Law · PPE · Clinical Psychology · Psychiatry / ASD")
        return

    target_ids = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not target_ids:
        target_ids = [d["id"] for d in DOMAINS]

    for domain_id in target_ids:
        print(f"\nAssembling book: {domain_id}")
        body = assemble_book_body(domain_id)
        out_path = BLD_DIR / f"book-{domain_id}-body.md"
        out_path.write_text(body, encoding="utf-8")
        lines = body.count("\n")
        size_kb = out_path.stat().st_size / 1024
        print(f"  -> {out_path.name}  ({lines:,} lines, {size_kb:.0f} KB)")

    print(f"\nAll done. Run 'make all' to build PDFs.")


# Vol I: Foundation — abstract/theoretical books + Phase 2 gateway
VOL1_IDS = ["gateway", "physics", "formal-mathematics", "neuroscience",
             "consciousness", "complex-systems", "computer-science"]

# Vol II: Application — domain/clinical books
VOL2_IDS = ["music-arts", "geophysics", "social-science", "economics",
             "law", "ppe", "clinical-psychology", "psychiatry-asd"]


def build_volume(domain_ids: list, vol_tag: str, title: str, subtitle: str):
    """Assemble a volume of the [T]-Theory Fractal Programme."""
    print(f"\nBuilding [T]-Theory {vol_tag.upper()}...")

    OMNIBUS_EXCLUDE = {"lean-proofs-appendix"}

    frontmatter = f"""\
---
title: "{title}"
subtitle: "{subtitle}"
author: "Alistair Johnson"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
---"""

    sections = [frontmatter, _toc_only()]

    for domain_id in domain_ids:
        domain = get_domain(domain_id)
        print(f"\n  Assembling: {domain_id}")
        book_sections = []
        kappa_path = KAPPA_DIR / f"kappa-{domain_id}.md"
        if kappa_path.exists():
            book_sections.append(kappa_path.read_text(encoding="utf-8").strip())
            print(f"    + kappa-{domain_id}")
        dom_papers = [p for p in domain["papers"]
                      if p.split(":", 1)[-1] not in OMNIBUS_EXCLUDE]
        for paper_ref in dom_papers:
            body = get_paper_body(paper_ref)
            if body:
                pname = paper_ref.split(":", 1)[-1] if ":" in paper_ref else paper_ref
                book_sections.append(f"\\newpage\n\n{body}")
                print(f"    + {pname}")
        conc_path = CONC_DIR / f"conclusion-{domain_id}.md"
        if conc_path.exists():
            book_sections.append(f"\\newpage\n\n{conc_path.read_text(encoding='utf-8').strip()}")
            print(f"    + conclusion-{domain_id}")
        book_body = "\n\n".join(book_sections)
        sections.append(_book_part_opening(domain_id) + book_body + "\n")

    # P23 closing chapter: Vol I (Foundation) ends with the gateway to Phase 2
    if vol_tag == "vol1":
        p23 = get_canonical_body("ttheory-phenomena")
        if p23:
            sections.append(f"\n\n\\newpage\n\n\\markboth{{The [T]-Phenomena}}{{}}\n\n# Closing: The Gateway to Phase 2\n\n{p23}\n")
            print(f"  + ttheory-phenomena (Vol I closing chapter)")

    sections.append(
        "\n\n\\newpage\n\n# [T]-Theory Cheatsheet\n\n"
        "```{=latex}\n"
        f"{_booklet_pages('gateway')}\n"
        "```\n"
    )
    print("  + default cheatsheet (volume closing handout)")

    full_text = "\n".join(sections)
    out_path = BLD_DIR / f"ttheory-{vol_tag}-body.md"
    out_path.write_text(full_text, encoding="utf-8")
    size_mb = out_path.stat().st_size / (1024 * 1024)
    lines = full_text.count("\n")
    print(f"\n  -> {out_path.name}  ({lines:,} lines, {size_mb:.1f} MB)")
    print(f"  Run 'make {vol_tag}' to build the PDF.")


def build_omnibus():
    """Assemble all 15 books into one T-Theory omnibus file."""
    print("\nBuilding T-Theory Omnibus...")

    # Papers excluded from the omnibus (too large / code-heavy for single-pass PDF)
    OMNIBUS_EXCLUDE = {"lean-proofs-appendix"}

    opening_path = FRACTAL_DIR / "ttheory-opening.md"
    if not opening_path.exists():
        print("  WARNING: ttheory-opening.md not found", file=sys.stderr)
        opening_text = ""
    else:
        opening_text = opening_path.read_text(encoding="utf-8").strip()

    # ttheory-titlepage.tex overrides \maketitle to show sticker + styled title page.
    frontmatter = """\
---
title: "[T]-Theory: The Complete Fractal Programme"
subtitle: "Fifteen Domain Books on the Universal Somatic Field"
author: "Alistair Johnson"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
---"""

    sections = [frontmatter, _toc_only(), f"\n\n{opening_text}\n"]

    for domain in DOMAINS:
        print(f"\n  Assembling: {domain['id']}")
        # Build a filtered version of the book (excluding omnibus_exclude papers)
        dom_copy = dict(domain)
        dom_copy["papers"] = [p for p in domain["papers"]
                              if p.split(":", 1)[-1] not in OMNIBUS_EXCLUDE]
        # Inline assembly (kappa + filtered papers + conclusion)
        book_sections = []
        kappa_path = KAPPA_DIR / f"kappa-{domain['id']}.md"
        if kappa_path.exists():
            book_sections.append(kappa_path.read_text(encoding="utf-8").strip())
            print(f"    + kappa-{domain['id']}")
        for paper_ref in dom_copy["papers"]:
            body = get_paper_body(paper_ref)
            if body:
                pname = paper_ref.split(":", 1)[-1] if ":" in paper_ref else paper_ref
                book_sections.append(f"\\newpage\n\n{body}")
                print(f"    + {pname}")
        conc_path = CONC_DIR / f"conclusion-{domain['id']}.md"
        if conc_path.exists():
            book_sections.append(f"\\newpage\n\n{conc_path.read_text(encoding='utf-8').strip()}")
            print(f"    + conclusion-{domain['id']}")
        book_body = "\n\n".join(book_sections)
        sections.append(_book_part_opening(domain["id"]) + book_body + "\n")

    # P23 as the closing chapter of the complete omnibus
    p23 = get_canonical_body("ttheory-phenomena")
    if p23:
        sections.append(f"\n\n\\newpage\n\n\\part{{The Gateway to Phase 2}}\n\n\\markboth{{The [T]-Phenomena}}{{}}\n\n# The [T]-Theory Phenomena\n\n{p23}\n")
        print(f"  + ttheory-phenomena (omnibus closing)")

    sections.append(
        "\n\n\\newpage\n\n# [T]-Theory Cheatsheet\n\n"
        "```{=latex}\n"
        f"{_booklet_pages('gateway')}\n"
        "```\n"
    )
    print("  + default cheatsheet (Fractal Thesis closing handout)")

    full_text = "\n".join(sections)
    out_path = BLD_DIR / "ttheory-omnibus-body.md"
    out_path.write_text(full_text, encoding="utf-8")
    size_mb = out_path.stat().st_size / (1024 * 1024)
    lines = full_text.count("\n")
    print(f"\n  -> {out_path.name}  ({lines:,} lines, {size_mb:.1f} MB)")
    print("  Run 'make omnibus' to build the PDF.")


def generate_kappas():
    """Generate kappas for all domains using GitHub Models API."""
    import json
    try:
        from openai import OpenAI
    except ImportError:
        print("ERROR: pip install openai first", file=sys.stderr)
        sys.exit(1)

    api_key = os.environ.get("OPENAI_API_KEY")
    base_url = os.environ.get("OPENAI_BASE_URL", "https://models.inference.ai.azure.com")
    if not api_key:
        print("ERROR: OPENAI_API_KEY not set. Run: export OPENAI_API_KEY=$(gh auth token)", file=sys.stderr)
        sys.exit(1)

    client = OpenAI(api_key=api_key, base_url=base_url)

    # Load canonical kappa as source text
    source_path = PAPER_DIR / "soma/soma-field-synthesis/soma-field-synthesis.md"
    source_text = source_path.read_text(encoding="utf-8")[:8000] if source_path.exists() else ""

    for domain in DOMAINS:
        kappa_path = KAPPA_DIR / f"kappa-{domain['id']}.md"
        if kappa_path.exists():
            print(f"  SKIP (exists): kappa-{domain['id']}")
            continue

        print(f"  Generating kappa for: {domain['id']} ...", end="", flush=True)

        prompt = f"""You are writing the introduction chapter of a self-contained academic book.

The book is part of the [T]-Theory Fractal Programme — a set of books that each apply
the Universal Somatic Field (USF) framework to a specific academic domain.

This book is: "{domain['title']}"
Subtitle: "{domain['subtitle']}"
Target audience: {domain['audience']}
Academic field: {domain['field']}

Write a 1500-word introduction chapter that:
1. Opens with a question or problem that this specific audience cares about
2. Explains the Universal Somatic Field framework in terms natural to this field
3. States what this book specifically offers this audience
4. Does NOT describe how the USF was developed (do not mention "Mathematical
   Co-identification" as a method — present the USF as a finished result)
5. Uses technical vocabulary from {domain['field']} throughout
6. Frames the work as part of the [T]-Theory programme
7. Ends with an overview of what the reader will find in the subsequent chapters

Additional context for this book: {domain['prompt_extra']}

Background source material (USF canonical introduction):
{source_text}

Write the introduction now. Use markdown formatting with ## subheadings where appropriate.
Do not include a YAML header. Start directly with the introduction text."""

        try:
            response = client.chat.completions.create(
                model="gpt-4.1",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=2000,
                temperature=0.7,
            )
            kappa_text = response.choices[0].message.content
            kappa_path.write_text(kappa_text, encoding="utf-8")
            print(f" done ({len(kappa_text)} chars)")
        except Exception as e:
            print(f" ERROR: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()
