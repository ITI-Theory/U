---
id: atomic-molecular
from: atomic
to: molecular
label: BOND / CONFIGURE
claim: INTERPRETIVE
source: registry/levels/atomic.md
preserves:
- response grammar
- declared source boundary
adds:
- target-scale variables
integrates_out:
- source-scale display priority
kernel: electron-density response
render_operation: 'BOND / CONFIGURE: retype atomic to molecular.'
---
Zooming from atomic to molecular scales turns isolated electron clouds into shared, polarised, and constrained electron density across several nuclei. Atomic charge, mass, spin, and orbital structure survive as inputs `empirical-result`. What is averaged away is the full isolated-atom basis whenever chemists use effective bonds, angles, torsions, partial charges, and reaction coordinates `derived-under-assumptions`. The upper level needs new variables because function depends on geometry: two systems with the same atoms can differ by conformation, stereochemistry, solvent, or crystal packing. The atlas reads this as bond/configure: an electromagnetic response field becomes a molecular energy surface with local minima and transition paths `interpretive`.
