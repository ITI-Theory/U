-- visualize-reader.lua: Markdown reader that protects {{Visualize ...}} macros
-- (docs/VISUALIZE.md). Pandoc's inline parser would read the parameters as
-- prose (smart quotes, *emphasis*, ^superscript^), so each macro is wrapped as
-- a raw inline of format "visualize" first; lib/format/visualize.lua then sees
-- exactly what the author wrote. Everything else is read as ordinary Markdown.
--
-- Use in a defaults file:  from: <path>/lib/format/visualize-reader.lua

local FORMAT = "markdown+yaml_metadata_block+tex_math_dollars+citations+smart"

local function protect(text)
  return (text:gsub("{{%s*Visualize.-}}", function(macro)
    local fence = "`"
    while macro:find(fence, 1, true) do fence = fence .. "`" end
    return fence .. " " .. macro .. " " .. fence .. "{=visualize}"
  end))
end

function Reader(input, opts)
  local parts = {}
  for _, source in ipairs(input) do parts[#parts + 1] = protect(source.text) end
  return pandoc.read(table.concat(parts, "\n\n"), FORMAT, opts)
end

-- Also usable as a module (dofile) by filters that read Markdown themselves,
-- e.g. books/T-Theory/filters/ttheory-assemble.lua.
return { protect = protect }
