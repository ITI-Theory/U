-- equations-writer.lua: every math element of a document, as JSON (USC, ISS-128).
-- Read with source positions so each equation keeps its line:
--   pandoc -f commonmark_x+sourcepos -t lib/format/equations-writer.lua FILE.md
-- Output: [{"line": N, "display": true|false, "tex": "..."}, ...]. No markup is written.

local out = {}

local function pos_line(attr)
  local p = attr and attr.attributes and attr.attributes["data-pos"]
  if not p then return nil end
  return tonumber(p:match("@?(%d+):%d+%-")) or tonumber(p:match("(%d+):"))
end

local function walk_inlines(inlines, line)
  for _, el in ipairs(inlines) do
    if el.t == "Math" then
      out[#out + 1] = { line = line or 0, display = el.mathtype == "DisplayMath", tex = el.text }
    elseif el.t == "Span" then
      walk_inlines(el.content, pos_line(el.attr) or line)
    elseif el.content and type(el.content) == "table" and el.t ~= "Note" then
      local ok = pcall(function() walk_inlines(el.content, line) end)
      if not ok then end
    end
  end
end

local function walk_blocks(blocks, line)
  for _, b in ipairs(blocks) do
    local here = (b.attr and pos_line(b.attr)) or line
    if b.t == "Div" then
      walk_blocks(b.content, here)
    elseif b.t == "Para" or b.t == "Plain" or b.t == "Header" then
      walk_inlines(b.content, here)
    elseif b.t == "BulletList" or b.t == "OrderedList" then
      for _, item in ipairs(b.content) do walk_blocks(item, here) end
    elseif b.t == "BlockQuote" then
      walk_blocks(b.content, here)
    end
  end
end

function Writer(doc, opts)
  walk_blocks(doc.blocks, 0)
  return pandoc.json.encode(out)
end
