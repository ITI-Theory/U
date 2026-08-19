# Modular Omnibus Prototypes

These non-release fixtures test two LaTeX document-boundary approaches for
ISS-022. They do not participate in C1v2/C2 builds.

- `subfiles/`: a shared master preamble plus child documents that compile both
  individually and as one continuous master document.
- `combine/`: independent child documents imported by a `combine` master.

Run `make` in this directory. Acceptance is structural: master builds, child
builds, one master TOC, continuous master pagination, and no hard-coded C1v2
or C2 member inventory.