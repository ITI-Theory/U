-- visualize-reader.lua: Markdown reader that protects {{Visualize ...}} macros
-- (docs/VISUALIZE.md). Pandoc's inline parser would read the parameters as
-- prose (smart quotes, *emphasis*, ^superscript^), so each macro is wrapped as
-- a raw inline of format "visualize" first; lib/format/visualize.lua then sees
-- exactly what the author wrote. Everything else is read as ordinary Markdown.
--
-- Use in a defaults file:  from: <path>/lib/format/visualize-reader.lua

-- Superset of the extensions used by every defaults file that names this reader
-- (pdf-a4.yaml, html.yaml, book.yaml): raw_tex/raw_html/fenced_divs/bracketed_spans/
-- pipe_tables/implicit_figures are needed by the book-class sources (\newpage,
-- fenced boxes); adding them is a no-op for sources that do not use that syntax.
local FORMAT = "markdown+yaml_metadata_block+tex_math_dollars+citations+smart" ..
  "+raw_tex+raw_html+fenced_divs+bracketed_spans+pipe_tables+implicit_figures"

local function wrap(macro)
  local fence = "`"
  while macro:find(fence, 1, true) do fence = fence .. "`" end
  return fence .. " " .. macro .. " " .. fence .. "{=visualize}"
end

-- A macro ends where its braces balance, so LaTeX in a parameter such as
-- ylabel="$x_{\text{a}}$" (which contains "}}") cannot end it early; an
-- unbalanced macro is an error, not a silently truncated figure.
local function protect(text)
  local out, pos = {}, 1
  while true do
    local s, e = text:find("{{%s*Visualize", pos)
    if not s then break end
    local depth, i = 2, e + 1
    while i <= #text and depth > 0 do
      local c = text:sub(i, i)
      if c == "{" then depth = depth + 1 elseif c == "}" then depth = depth - 1 end
      i = i + 1
    end
    if depth > 0 then
      error("visualize-reader: unbalanced braces in the macro starting " .. text:sub(s, s + 60):gsub("\n", " "))
    end
    out[#out + 1] = text:sub(pos, s - 1)
    out[#out + 1] = wrap(text:sub(s, i - 1))
    pos = i
  end
  out[#out + 1] = text:sub(pos)
  return table.concat(out)
end

function Reader(input, opts)
  local parts = {}
  for _, source in ipairs(input) do parts[#parts + 1] = protect(source.text) end
  return pandoc.read(table.concat(parts, "\n\n"), FORMAT, opts)
end

-- Also usable as a module (dofile) by filters that read Markdown themselves,
-- e.g. books/T-Theory/filters/ttheory-assemble.lua.
return { protect = protect }
