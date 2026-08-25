---
fields: issue=ISS-027
---

# Soma Field Operator stereoscopic projection

**Issue:** [ISS-027](../../../ISSUES.md#iss-027-soma-field-operator-stereoscopic-projection)

## Scope

Add a projector-facing stereoscopic mode for the Soma Field Operator's existing
Three.js scene, targeting the Dangbei Atom and DLP-Link active shutter glasses.
The existing browser interface remains the normal display mode.

## Projection Contract

- The PC sends a stereoscopic Side-by-Side (SbS) or Top-and-Bottom image over
  HDMI; the projector converts that signal for DLP-Link glasses.
- Confirm the Atom's accepted 3D input format before implementing the output
  mode. The chosen browser mode and projector setting must match.
- Use Three.js `StereoEffect` or an equivalent two-eye render path. It renders
  the scene from left and right eye positions into the selected stereoscopic
  layout.
- Add a selectable normal/stereo output mode. Stereo requires full-screen
  projection, adjustable eye separation/convergence, and a display-safe
  calibration view.
- Calibrate with the installed projector and DLP-Link glasses. Do not treat a
  desktop-only SbS image as validation of the physical 3D output.

## Sub-Issues

Keep independently actionable work here as sub-issues. This file remains the
context and decision record for the epic.
