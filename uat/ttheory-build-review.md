# [T]-Theory Build Review

## Current Facts

- C2 is a book-of-books: fifteen domain books, two filtered volumes, and the Fractal Thesis.
- Each domain book has a part opening and registered four-page cheatsheet insertion.
- Gateway is an explicit exception with a noir insertion and closing cheatsheet handout.
- The approved shared model requires every master TOC to show member title plus immediate internal chapter titles.

## Review Questions

1. Does the Fractal Thesis master TOC expose book titles plus immediate chapters without expanding into every subsection?
2. Are cheatsheet and noir placements visibly intentional rather than pagination accidents?
3. Do Volumes I/II act as filtered views of C2 rather than independent hierarchy systems?
4. Does the typography make it obvious which book a chapter belongs to?

## Engineering Observation

C2 already has explicit insertion mechanics, but its member order and hierarchy are still primarily represented in build code. The next implementation step after UAT is to move that role/insertion model into `PAPERS.yaml`, parallel to C1v2.
