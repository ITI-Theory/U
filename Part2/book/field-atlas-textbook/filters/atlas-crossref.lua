-- atlas-crossref.lua: the "Reading with the Field Atlas" table (docs/BUILD.md).
-- A div {.atlas-crossref} becomes a table of the thirty-one Atlas levels in
-- Atlas order, with each level's size from registry/levels/<id>.yaml and the
-- course chapters that teach it from atlas-map.yaml. Chapter cells are
-- citations (@ch:...), so filters/course-numbering.lua, which runs next,
-- turns them into numbered links. A level missing from the map, or a map
-- entry with no registry file, fails the build.

local MAP = "atlas-map.yaml"
local REGISTRY = "../../../registry/levels/"

local function read_yaml(path)
  local f = io.open(path, "rb")
  if not f then error("atlas-crossref: cannot read " .. path) end
  local text = f:read("a")
  f:close()
  return pandoc.read("---\n" .. text .. "\n---\n", "markdown").meta
end

local function cell(inlines) return pandoc.Cell({ pandoc.Plain(inlines) }) end
local function text(s) return pandoc.Inlines({ pandoc.Str(s) }) end

local function table_block()
  local map = read_yaml(MAP).levels
  if not map or #map ~= 31 then error("atlas-crossref: atlas-map.yaml must list 31 levels") end
  local rows = {}
  for i, entry in ipairs(map) do
    local id = pandoc.utils.stringify(entry.id)
    local level = read_yaml(REGISTRY .. id .. ".yaml")
    if not level.label then error("atlas-crossref: no registry label for " .. id) end
    local chapters = pandoc.Inlines({})
    for k, ch in ipairs(entry.chapters or {}) do
      if k > 1 then chapters:extend({ pandoc.Str(","), pandoc.Space() }) end
      chapters:insert(pandoc.Cite({}, { pandoc.Citation(pandoc.utils.stringify(ch), "NormalCitation") }))
    end
    if #chapters == 0 then error("atlas-crossref: no chapters for " .. id) end
    -- "10^-3 to 10^-1 m" -> superscripts (gsub returns two values: keep the first)
    local size = (pandoc.utils.stringify(level.length_scale):gsub("%^(%-?%d+)", "^%1^"))
    local size_inlines = pandoc.read(size, "markdown").blocks[1].content
    local label = pandoc.Inlines({ pandoc.Str(pandoc.utils.stringify(level.label)) })
    rows[#rows + 1] = pandoc.Row({ cell(text(tostring(i))), cell(label), cell(size_inlines), cell(chapters) })
  end
  local header = pandoc.Row({ cell(text("Atlas level")), cell(text("Level")), cell(text("Size")),
    cell(text("Taught in")) })
  local specs = {}
  for _, w in ipairs({ 0.12, 0.34, 0.2, 0.34 }) do specs[#specs + 1] = { pandoc.AlignLeft, w } end
  return pandoc.Table({ long = { pandoc.Plain(text("The thirty-one Field Atlas levels and the course chapters that teach them.")) } },
    specs, pandoc.TableHead({ header }), { pandoc.TableBody(rows) }, pandoc.TableFoot())
end

function Div(div)
  if div.classes:includes("atlas-crossref") then return table_block() end
  return nil
end
