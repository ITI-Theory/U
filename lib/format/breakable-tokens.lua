-- breakable-tokens.lua: long unbreakable tokens get line-break opportunities
-- (LaTeX only). Code (Lean names, file paths) and long plain words (DOIs,
-- URLs written as text) may break after / _ . - : and at camelCase joins,
-- including acronym-word joins,
-- so they wrap inside the text block and inside table cells instead of
-- sticking out. Pieces stay ordinary Code/Str elements, so pandoc still does
-- all escaping. Table cells start with a zero-width space, because TeX never
-- hyphenates the first word of a paragraph (a long first word in a narrow
-- column would otherwise run into the next column). Checked by
-- paper/scripts/check_text_overflow.py.

if not FORMAT:match("latex") then return {} end

local MIN = 10  -- tokens shorter than this never need breaking
local BREAK = pandoc.RawInline("latex", "\\allowbreak{}")

-- Split after a break character, between a lowercase letter and a capital, or
-- where an acronym meets a word (BRECVEMA|Variational).
local function pieces(text)
  local out, start = {}, 1
  for i = 1, #text do
    local c, n, nn = text:sub(i, i), text:sub(i + 1, i + 1), text:sub(i + 2, i + 2)
    if i < #text and (c:match("[/_%.%-:]") or (c:match("%l") and n:match("%u"))
        or (c:match("%u") and n:match("%u") and nn:match("%l"))) then
      out[#out + 1] = text:sub(start, i)
      start = i + 1
    end
  end
  out[#out + 1] = text:sub(start)
  return out
end

local function split(text, make)
  if #text < MIN then return nil end
  local parts = pieces(text)
  if #parts < 2 then return nil end
  local result = pandoc.Inlines({})
  for i, part in ipairs(parts) do
    if i > 1 then result:insert(BREAK) end
    result:insert(make(part))
  end
  return result
end

local function cell_start(cell)
  local first = cell.contents[1]
  if first and (first.t == "Plain" or first.t == "Para") then
    first.content:insert(1, pandoc.RawInline("latex", "\\hspace{0pt}"))
  end
  return cell
end

local function table_cells(tbl)
  local function rows(list)
    for _, row in ipairs(list) do
      for _, cell in ipairs(row.cells) do cell_start(cell) end
    end
  end
  rows(tbl.head.rows)
  for _, body in ipairs(tbl.bodies) do rows(body.head); rows(body.body) end
  rows(tbl.foot.rows)
  return tbl
end

return {
  { Table = table_cells },
  {
    Code = function(code)
      return split(code.text, function(part) return pandoc.Code(part, code.attr) end)
    end,
    Str = function(str)
      return split(str.text, pandoc.Str)
    end,
  },
}
