# [T]-Theory Sticker Assets

This directory is the canonical destination for sticker and QR assets. The
legacy sticker files remain in their current source locations until their
references and migration have been verified separately.

## Current Custom-Domain QR Assets

All three files encode `https://www.t-theory.org/`:

- `tt-qr-t-theory-org.svg` -- editable SVG master.
- `tt-qr-t-theory-org.png` -- 800x800 sRGB screen variant.
- `tt-qr-t-theory-org-print.png` -- 800x800 sRGB opaque print variant.

The SVG was generated with the maintained `qrcode` npm package using a
four-module quiet zone and black modules on white. PNG variants were rendered
from that SVG with `rsvg-convert` and ImageMagick. A local ZXing decode of the
screen PNG confirmed the exact payload `https://www.t-theory.org/`; it does not
yet replace any live sticker artwork.

## Related Work

- [Current print specification](../../../paper/archive/PRINT-SPEC.md) records
  the original sticker design and its former GitHub-organization QR target.
- [ISS-032](../../../ISSUES.md#iss-032-t-theoryorg-landing-page-and-sticker-qr-destination--open)
  tracks the custom-domain landing page, scan validation, and later migration
  of legacy sticker assets into this directory.
- [ISS-033](../../../ISSUES.md#iss-033-archive-publication-and-print-context-curation--open)
  tracks curation of useful durable material currently held in the paper
  archive.
