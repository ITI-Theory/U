-- spreads.lua (ISS-095): the rooted Atlas's spreads, one per `atlas` entry of registry/rooted.yaml
-- (the metadata file): each picture across two facing pages (\rootedspread, templates/header.tex). A
-- picture not yet captured gets a page that says so (`make captures`; `make check` fails on it).
-- Also the title page and the intro's layout.

local stringify = pandoc.utils.stringify

local function exists(path)
  local f = io.open(path, 'rb')
  if f then f:close() return true end
  return false
end

function Div(el)
  if el.classes:includes('rooted-title') then
    return pandoc.RawBlock('latex', '\\rootedtitle')
  end
  if el.classes:includes('rooted-intro') then
    local out = { pandoc.RawBlock('latex', '\\begin{rootedintro}') }
    for _, b in ipairs(el.content) do table.insert(out, b) end
    table.insert(out, pandoc.RawBlock('latex', '\\end{rootedintro}'))
    return out
  end
end

function Pandoc(doc)
  local dir = stringify(doc.meta['plate-dir'] or '../../../bld/rooted-atlas/voyage')
  local blocks = {}
  local licenceAt = nil
  for i, b in ipairs(doc.blocks) do
    if b.t == 'Div' and b.classes:includes('licence') then licenceAt = i end
  end
  local spreads = {}
  for _, item in ipairs(doc.meta.atlas or {}) do
    local id = stringify(item.id)
    local title = stringify(item.title or id)
    local file = dir .. '/' .. id .. '.png'
    if exists(file) then
      table.insert(spreads, pandoc.RawBlock('latex', string.format('\\rootedspread{%s}{%s}', file, title)))
    else
      table.insert(spreads, pandoc.RawBlock('latex', string.format('\\rootedmissing{%s}{%s}', id, title)))
    end
  end
  for i, b in ipairs(doc.blocks) do
    if i == licenceAt then
      for _, s in ipairs(spreads) do table.insert(blocks, s) end
      table.insert(blocks, pandoc.RawBlock('latex', '\\rootedcolophon'))
    end
    table.insert(blocks, b)
  end
  if not licenceAt then for _, s in ipairs(spreads) do table.insert(blocks, s) end end
  doc.blocks = blocks
  return doc
end
