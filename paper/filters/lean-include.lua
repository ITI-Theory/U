-- lean-include.lua: reproduce Lean proof files in the Lean proofs appendix
-- (docs/BUILD.md). A div
--   ::: {.lean-include dir="proofs" order="A.lean,B.lean" catalogue="..."}
-- becomes, per file: a heading with the file's title, the file name, its
-- description (Markdown) and the full source as a `lean` code block. Titles
-- and descriptions live in a YAML catalogue next to the appendix source
-- (default soma/lean-proofs-appendix/catalogue.yaml), read through pandoc.

local function split_order(value)
  local result = {}
  for item in tostring(value or ""):gmatch("([^,]+)") do
    item = item:gsub("^%s+", ""):gsub("%s+$", "")
    if item ~= "" then table.insert(result, item) end
  end
  return result
end

local function read_all(path)
  local file = io.open(path, "rb")
  if not file then error("cannot read " .. path) end
  local text = file:read("a")
  file:close()
  return text
end

local function read_catalogue(path)
  local meta = pandoc.read("---\n" .. read_all(path) .. "\n---\n", "markdown").meta
  local catalogue = {}
  for name, entry in pairs(meta) do catalogue[name] = entry end
  return catalogue
end

function Div(div)
  if not div.classes:includes("lean-include") then return nil end
  local dir = div.attributes.dir or "proofs"
  local order = split_order(div.attributes.order)
  if #order == 0 then error("lean-include requires an order attribute") end
  local catalogue = read_catalogue(div.attributes.catalogue or "soma/lean-proofs-appendix/catalogue.yaml")

  local blocks = pandoc.Blocks({})
  for _, filename in ipairs(order) do
    local entry = catalogue[filename]
    if not entry then error("lean-include: no catalogue entry for " .. filename) end
    blocks:insert(pandoc.Header(2, pandoc.utils.blocks_to_inlines(pandoc.Blocks(entry.title))))
    blocks:insert(pandoc.Header(3, pandoc.Inlines({ pandoc.Code(filename) })))
    blocks:extend(pandoc.Blocks(entry.description))
    blocks:insert(pandoc.CodeBlock(read_all(dir .. "/" .. filename), { "", { "lean" }, {} }))
  end
  return blocks
end