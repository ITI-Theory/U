# Shared Format Library

`U/lib/format` is the single renderer library for material assembled from
Markdown across U. Individual books and papers do not own Lua filters or CSS.

## Book Macros

Book source files use only format-neutral Markdown macros:

```markdown
{{AddPaper ../../paper/soma/example/example.md}}

{{AddPage}}
```

`macros.lua` applies this shared `AddPaper` policy:

- reads a paper as Markdown and discards its YAML front matter;
- omits a terminal `References` section from each included paper;
- namespaces included heading identifiers by paper filename;
- retains the paper title and heading hierarchy for the book-level TOC;
- resolves included code-file paths relative to their source paper.

The containing book owns its front matter, one table of contents, page order,
and bibliography. Its Markdown therefore shows the complete assembly directly.

`AddPage` becomes a page break in PDF output and a `page-break` element in HTML.
The HTML presentation is defined only in `site.css`.
