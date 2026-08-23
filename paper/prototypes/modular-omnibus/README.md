# Modular Omnibus Prototypes

This non-release fixture tests the viable LaTeX document-boundary approach for
ISS-022. It does not participate in C1v2/C2 builds.

- `subfiles/`: a shared master preamble plus child documents that compile both
  individually and as one continuous master document.

`combine` was installed and tested, then removed: it fails under the active
XeLaTeX stack and its local TOC/bibliography model conflicts with C1v2/C2.

Run `make` in this directory. Acceptance is structural: master builds, child
builds, one master TOC, continuous master pagination, and no hard-coded C1v2
or C2 member inventory.
