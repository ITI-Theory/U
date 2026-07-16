"""Generate grey placeholder PNG images for all figures that don't have real artwork yet.
Each placeholder shows the figure ID and a brief description.

Run from repo root: python paper/soma/wave-atlas/figures/generate_placeholders.py
"""
from __future__ import annotations
from pathlib import Path
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import textwrap

OUT = Path(__file__).parent

# Map: stem (without -placeholder) → short description shown in the grey box
PLACEHOLDERS = {
    "11d-body-schematic": "11D body: 4 subspaces\nD1–4 (spacetime) + D5–7 (EMF)\n+ D8 (limbic) + D9–11 (cortex)",
    "20-step-dial": "The 20-step scale dial\n(use FA_universal_dial.png\nfor the real version)",
    "biotensegrity": "Biotensegrity body model\nSkeleton + fascia tensegrity",
    "branching-tree-s0": "Quantum branching tree\nEverett many-worlds decoherence",
    "city-night": "Aerial city at night\nLight traces = coupling matrix",
    "cosmic-web": "Large-scale structure simulation\nFilaments + voids (Illustris)",
    "coupling-matrix": "2×2 propagator matrix heatmap\nOff-diagonal = empathy terms",
    "crowd-entrainment": "Crowd before/after music\nHeart rate synchrony r=0.12 → 0.71",
    "dna-helix": "DNA double helix\nHydrogen bonds between strands",
    "dna-helix-s4": "DNA helix (Scale 4)\nX-ray crystallography view",
    "earth-cross-section": "Earth interior cross-section\nInner core / mantle / crust",
    "electron-density-maps-s4": "Electron density maps\nH₂, H₂O, benzene",
    "estuary-english-spread": "Estuary English isogloss map\nThames Valley propagation",
    "foam-vs-water-s0": "Still water vs quantum foam\nClassical smooth vs Planck rough",
    "friendship-coupling": "Friendship coupling strength\n|G_AB| vs interaction history",
    "glarus-thrust": "Glarus Hauptüberschiebung\nVertical overthrust cliff face",
    "guitar-impulse": "An electric guitar\nDelta-function impulse at 2:49",
    "hv-two-branes": "Horava-Witten two-brane geometry\nPerson A // orbifold // Person B",
    "hydrogen-atom-s3": "Hydrogen atom\nProton + 1s orbital cloud",
    "hydrogen-orbitals-s3": "Hydrogen orbitals 1s,2s,2p,3d\nEigenfunctions of Coulomb G",
    "hydrogen-spectrum-s3": "Hydrogen emission spectrum\nBalmer series lines",
    "invariant-equation-all-scales": "The master equation:\n(∇²+k²)G=δ\nwith 20 thumbnail images",
    "klontalersee": "Klöntalersee, Glarus\nGlacially carved parabolic bowl",
    "klontalersee-ripples": "Ripples on the Klöntalersee\nThe field in action — author photo",
    "meg-cemi": "MEG brain scan\nCEMI field pattern outside skull",
    "methane-tetrahedral-s4": "Methane CH₄ tetrahedral geometry\nBond angle 109.5°",
    "milky-way-edge-on": "Milky Way edge-on\nDark rift + galactic plane",
    "m-theory-web-s1": "M-theory duality web\nFive string theories → M-theory",
    "murmuration": "Starling murmuration\nSwarm intelligence Scale 7",
    "murmuration-scale7": "Murmuration Scale 7\nActive-matter velocity field",
    "neurodivergent-parameter-space": "ADHD/ASD/CPTSD in (β,W) space\nThree distinct dynamical regimes",
    "neuron-structure": "Neuron structure\nSoma + dendrites + axon + synapse",
    "nuclear-binding-energy-s2": "Nuclear binding energy curve\nPeaks at Fe-56",
    "parakeets-roost": "Ring-necked parakeets at dusk\nStaines Reservoir roost",
    "path-integral-s0": "Feynman path integral\nSum over all paths x'→x",
    "periodic-table-energy-s3": "Periodic table as energy landscape\nIonisation energy topographic map",
    "periodic-table-s2": "The periodic table\nAll elements from Scale 2",
    "proton-quarks-s2": "Proton: 3 quarks + gluon flux tubes\nColour confinement",
    "quantum-foam": "Quantum foam (artistic)\nPlanck-scale spacetime fluctuations",
    "quantum-foam-s0": "Quantum foam Scale 0\n(∇²+k_P²)G=δ at Planck scale",
    "quark-gluon": "Quark-gluon plasma\nHeavy-ion collision state",
    "rhodopsin-conformations-s4": "Rhodopsin chromophore\n11-cis (dark) vs all-trans (light)",
    "sho-string-identification-s1": "SHO = G identification\n(see FS1_sho_string.png)",
    "six-greens-functions": "Six G(x,x') contexts\nSpeaker/seismograph/EM/Feynman\n/cortex/Klöntalersee",
    "soap-bubble-foam-comparison-s0": "Soap film Newton rings\nvs quantum foam interference",
    "soap-bubbles": "Two touching soap bubbles\nShared boundary = relational field",
    "speaker-room-greens": "Speaker in a room\nG = impulse response of the room",
    "string-coulomb-comparison-s1": "String log propagator\nvs Coulomb 1/r\n(see FS2_yukawa_vs_coulomb.png)",
    "thames-comparison": "Thames Valley dual maps\nIsogloss + parakeet density overlay",
    "thames-waveguide": "Thames Basin aerial schematic\nChilterns/N.Downs as wave-guide walls",
    "therapy-coupling": "Therapy coupling diagram\nClient trauma well + therapist field",
    "yukawa-galaxy-comparison-s2": "Yukawa (nuclear) vs galaxy cluster\nSame exp(-mr)/r form",
    "zoom-dial-horizontal": "Horizontal zoom dial\n(use FA_universal_dial.png)",
}


def make_placeholder(stem: str, description: str) -> None:
    out_path = OUT / f"{stem}-placeholder.png"
    if out_path.exists():
        return  # don't overwrite existing real figures

    fig, ax = plt.subplots(figsize=(6, 3))
    ax.set_facecolor("#e8e8e8")
    fig.patch.set_facecolor("#e8e8e8")

    # Grey border
    rect = mpatches.FancyBboxPatch((0.02, 0.02), 0.96, 0.96,
                                    boxstyle="round,pad=0.02",
                                    linewidth=1.5, edgecolor="#999",
                                    facecolor="#ececec", transform=ax.transAxes)
    ax.add_patch(rect)

    # Figure ID top-left
    ax.text(0.05, 0.88, stem.replace("-", " ").upper(),
            transform=ax.transAxes, fontsize=7, color="#666",
            fontfamily="monospace", va="top")

    # Description centred
    wrapped = textwrap.fill(description, 40)
    ax.text(0.5, 0.5, wrapped, transform=ax.transAxes,
            ha="center", va="center", fontsize=9,
            color="#444", multialignment="center")

    # Placeholder watermark
    ax.text(0.95, 0.05, "[PLACEHOLDER]",
            transform=ax.transAxes, fontsize=7, color="#aaa",
            ha="right", va="bottom", style="italic")

    ax.set_xticks([])
    ax.set_yticks([])
    for s in ax.spines.values():
        s.set_visible(False)

    fig.savefig(out_path, dpi=150, bbox_inches="tight")
    plt.close(fig)
    print(f"  wrote {out_path.name}")


def main() -> None:
    print(f"Generating placeholder PNGs in {OUT}")
    for stem, desc in PLACEHOLDERS.items():
        make_placeholder(stem, desc)
    print("Done.")


if __name__ == "__main__":
    main()
