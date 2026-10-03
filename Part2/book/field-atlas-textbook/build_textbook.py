#!/usr/bin/env python3
from __future__ import annotations

import argparse, re, shutil, subprocess, sys
from pathlib import Path

TEXTBOOK = Path(__file__).resolve().parent
REPO = TEXTBOOK.parents[2]
BLD = TEXTBOOK / "bld"
BIB = REPO / "paper" / "bibliography.bib"
CSL = REPO / "paper" / "apa-7th.csl"
HEADER = TEXTBOOK / "tex" / "textbook-header.tex"
WORD_RE = re.compile(r"[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)?")


def generate_figures() -> None:
    import matplotlib.pyplot as plt
    import numpy as np
    out = TEXTBOOK / "figures" / "generated"
    out.mkdir(parents=True, exist_ok=True)
    blue, teal, orange, green, purple = "#1F5E8C", "#007C89", "#C66500", "#2E7D32", "#6A3DA3"
    x = np.linspace(-3, 3, 500)

    def finish(fig, name: str):
        fig.tight_layout(); fig.savefig(out / name, dpi=180); plt.close(fig)

    fig, ax = plt.subplots(figsize=(10,4)); ax.plot(x, np.exp(-x*x), lw=3, color=blue); ax.plot(x, np.exp(-(x-1.1)**2/0.7), lw=3, color=orange); ax.set_title("Zoom operator: grammar retained, variables replaced"); ax.set_xlabel("coordinate within scale"); ax.set_ylabel("field amplitude"); ax.grid(alpha=.25); finish(fig, "zoom_operator.png")
    fig, ax = plt.subplots(figsize=(10,4)); ax.plot(x, np.sin(5*x), color=blue, label="wave A"); ax.plot(x, .7*np.sin(5*x+1.2), color=orange, label="wave B"); ax.plot(x, np.sin(5*x)+.7*np.sin(5*x+1.2), color=purple, lw=3, label="sum"); ax.legend(); ax.set_title("Superposition and phase"); ax.set_xlabel("position"); ax.grid(alpha=.22); finish(fig, "wave_superposition.png")
    t = np.linspace(0,8,500); impulse=np.exp(-((t-1)/.12)**2); kernel=np.exp(-(t-1))* (t>=1); response=np.convolve(impulse, np.exp(-np.linspace(0,4,500)), mode='same')/35; fig, ax=plt.subplots(figsize=(10,4)); ax.plot(t, impulse, label="source", color=orange); ax.plot(t, kernel, label="kernel", color=blue); ax.plot(t, response, label="response", color=green, lw=3); ax.legend(); ax.set_title("Impulse response and convolution"); ax.set_xlabel("time"); finish(fig,"green_response.png")
    X,Y=np.meshgrid(np.linspace(-3,3,240),np.linspace(-3,3,240)); R=np.sqrt(X*X+Y*Y); Z=np.exp(-R)*(1+0.35*np.cos(3*np.arctan2(Y,X)))**2; fig,ax=plt.subplots(figsize=(7,5)); im=ax.imshow(Z,extent=[-3,3,-3,3],origin='lower',cmap='magma'); ax.set_title("Atomic probability density"); ax.set_xlabel("x"); ax.set_ylabel("y"); fig.colorbar(im,ax=ax,shrink=.78); finish(fig,"atomic_orbitals.png")
    fig, ax=plt.subplots(figsize=(9,5)); ax.add_patch(plt.Rectangle((.1,.35),.8,.3,color="#D9E2EC")); ax.add_patch(plt.Rectangle((.42,.25),.07,.5,color=teal)); ax.add_patch(plt.Rectangle((.62,.25),.05,.5,color=orange)); ax.annotate("outside",(.18,.72)); ax.annotate("inside",(.18,.2)); ax.annotate("channel",(.4,.8),arrowprops=dict(arrowstyle='->')); ax.annotate("gradient",(.66,.8),arrowprops=dict(arrowstyle='->')); ax.axis('off'); ax.set_title("Membrane, channels, gradients"); finish(fig,"cell_signalling.png")
    fig, ax=plt.subplots(figsize=(9,5)); nodes={"body":(0.15,.45),"brain":(.48,.72),"action":(.78,.45),"measure":(.48,.18)}; [ax.scatter(*v,s=1200,color=c) for v,c in zip(nodes.values(),[green,blue,orange,purple])]; [ax.text(*v,k,ha='center',va='center',color='white',weight='bold') for k,v in nodes.items()]; order=list(nodes.values());
    for a,b in zip(order,order[1:]+order[:1]): ax.annotate('',b,a,arrowprops=dict(arrowstyle='->',lw=2,color='#333'))
    ax.axis('off'); ax.set_title("Brain-body response loop"); finish(fig,"brain_body_loop.png")
    theta=np.linspace(0,2*np.pi,18,endpoint=False); fig=plt.figure(figsize=(9,4)); ax1=fig.add_subplot(121,projection='polar'); ax2=fig.add_subplot(122,projection='polar'); ax1.scatter(theta,np.ones_like(theta),color=orange); ax2.scatter(np.random.default_rng(4).normal(.4,.18,18),np.ones(18),color=blue); ax1.set_title('unsynchronised'); ax2.set_title('phase-locked'); finish(fig,"kuramoto_sync.png")
    rng=np.random.default_rng(2); fig,ax=plt.subplots(figsize=(9,5)); pts=rng.random((35,2)); vel=np.column_stack([np.ones(35),.25*rng.normal(size=35)]); ax.quiver(pts[:,0],pts[:,1],vel[:,0],vel[:,1],angles='xy',scale_units='xy',scale=8,color=blue); ax.set_title('Local alignment in a swarm'); ax.set_xticks([]); ax.set_yticks([]); finish(fig,"swarm_vectors.png")
    fig,ax=plt.subplots(figsize=(10,4)); bands=[('cosmic',0,13.8,blue),('geology',9.2,13.8,green),('life',10.0,13.8,teal),('human',13.79,13.8,orange),('philosophy',13.799,13.8,purple)];
    for i,(name,a,b,c) in enumerate(bands): ax.barh(i,b-a,left=a,color=c); ax.text(a,i,name,va='center',ha='left',color='white',weight='bold')
    ax.set_xlabel('billions of years after Big Bang (schematic)'); ax.set_yticks([]); ax.set_title('Nested eras on one time axis'); finish(fig,"history_eras.png")
    fig,ax=plt.subplots(figsize=(6,6)); radii=[1,.76,.42,.2]; cols=[blue,orange,green,purple]; labs=['crust/mantle','outer core','inner core','seed'];
    for r,c,l in zip(radii,cols,labs): ax.add_patch(plt.Circle((0,0),r,color=c,alpha=.82)); ax.text(0,r-.1,l,ha='center',color='white',weight='bold')
    ax.set_aspect('equal'); ax.axis('off'); ax.set_title('Layered planet response model'); finish(fig,"earth_layers.png")
    temp=np.linspace(30000,3000,200); lum=(temp/5800)**4; fig,ax=plt.subplots(figsize=(9,5)); ax.loglog(temp,lum,color=blue,lw=3); ax.scatter([5800,3500,12000],[1,100,0.05],color=[orange,green,purple],s=80); ax.invert_xaxis(); ax.set_xlabel('temperature K'); ax.set_ylabel('luminosity relative to Sun'); ax.set_title('Schematic H-R diagram'); ax.grid(alpha=.25); finish(fig,"hr_diagram.png")
    fig,ax=plt.subplots(figsize=(7,5)); vals=[.637,.273,.09]; labs=['$\\Omega_\\Lambda$ model','$\\Omega_{DM}$ model','ordinary matter']; ax.pie(vals,labels=labs,colors=[blue,purple,orange],autopct='%1.1f%%',startangle=90); ax.set_title('Programme-derived dark-sector fractions'); finish(fig,"density_fractions.png")


def assemble() -> str:
    chapters = sorted((TEXTBOOK / "chapters").glob("*.md"))
    appendices = sorted((TEXTBOOK / "appendices").glob("*.md"))
    meta = ["---", "title: '[T]-Theory Field Atlas: A Textbook Edition'", "subtitle: 'Fields, response, and scale from atoms to cosmology'", "author: 'Alistair Johnson'", "date: 2026", "documentclass: book", "classoption: [openany]", "toc: true", "toc-depth: 2", "link-citations: true", "---", ""]
    parts = meta + ["\\frontmatter", "", "# How to Use This Text", "", "This separate textbook edition introduces the Field Atlas as a sequence of field ideas, worked examples, review questions, and evidence labels. It borrows the open-textbook convention of objectives, examples, checks, summaries, and problem sets while remaining a distinct [T]-Theory publication.", "", "\\mainmatter", ""]
    for p in chapters:
        parts.append(p.read_text(encoding="utf-8")); parts.append("")
    parts += ["\\appendix", ""]
    for p in appendices:
        parts.append(p.read_text(encoding="utf-8")); parts.append("")
    parts += ["# References {.unnumbered}", "", "::: {#refs}", ":::", ""]
    return "\n".join(parts)


def build(md_only: bool = False) -> int:
    generate_figures(); BLD.mkdir(exist_ok=True)
    markdown = assemble()
    md_path = BLD / "field-atlas-textbook-a3.md"; md_path.write_text(markdown, encoding="utf-8", newline="\n")
    words = len(WORD_RE.findall(markdown)); print(f"wrote {md_path} ({words} words)")
    if md_only: return 0
    tex_path = BLD / "field-atlas-textbook-a3.tex"; pdf_path = BLD / "field-atlas-textbook-a3.pdf"
    resource_path = f"{TEXTBOOK};{REPO}"
    cmd = ["pandoc", str(md_path), "-o", str(tex_path), "--standalone", "--from", "markdown+raw_tex", "--citeproc", f"--bibliography={BIB}", f"--csl={CSL}", f"--resource-path={resource_path}", "-H", str(HEADER), "-V", "geometry=paperwidth=420mm,paperheight=297mm,landscape,margin=14mm,top=16mm,bottom=16mm", "-V", "fontsize=10pt", "-V", "mainfont=TeX Gyre Heros", "-V", "monofont=Consolas", "-V", "colorlinks=true", "-V", "linkcolor=textbookblue", "-V", "urlcolor=textbookteal"]
    r = subprocess.run(cmd, cwd=TEXTBOOK, text=True, capture_output=True, encoding="utf-8", errors="replace")
    if r.returncode: print(r.stderr[-4000:], file=sys.stderr); return r.returncode
    for _ in range(2):
        x = subprocess.run(["xelatex", "-interaction=nonstopmode", "-halt-on-error", f"-output-directory={BLD}", str(tex_path)], cwd=TEXTBOOK, text=True, capture_output=True, encoding="utf-8", errors="replace")
        if x.returncode:
            print(x.stdout[-4000:], file=sys.stderr); print(x.stderr[-4000:], file=sys.stderr); return x.returncode
    log = (BLD / "field-atlas-textbook-a3.log").read_text(encoding="utf-8", errors="replace") if (BLD / "field-atlas-textbook-a3.log").exists() else ""
    lost = log.count("Float(s) lost")
    overfull = len(re.findall(r"Overfull \\hbox", log))
    print(f"wrote {pdf_path}; Float(s) lost={lost}; Overfull hbox={overfull}")
    if lost: return 2
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(); ap.add_argument("--md-only", action="store_true"); ap.add_argument("--clean", action="store_true")
    args = ap.parse_args()
    if args.clean: shutil.rmtree(BLD, ignore_errors=True); shutil.rmtree(TEXTBOOK / "figures" / "generated", ignore_errors=True); return 0
    return build(args.md_only)
if __name__ == "__main__": sys.exit(main())
