-- observatory-ids.lua: fill `::: {.observatory-ids}` with the Soma Machine ids a
-- soma-tour may use (levels, paths, questions, presets, eras, models), read from
-- the registry so the Observatory Guide never drifts from the app.
-- Run from the repository root, or set metadata `registry` to the registry path.

local REGISTRY = "registry"

local function read_file(path)
  local f = io.open(path, "rb")
  if not f then return nil end
  local s = f:read("*a")
  f:close()
  return s
end

local function list_dir(path)
  local ok, entries = pcall(pandoc.system.list_directory, path)
  if not ok then return {} end
  table.sort(entries)
  return entries
end

local function read_yaml(path)
  local s = read_file(path)
  if not s then return nil end
  return pandoc.read("---\n" .. s .. "\n---\n", "markdown").meta
end

local function text(v)
  return v == nil and "" or pandoc.utils.stringify(v)
end

local function code(s)
  return pandoc.Plain({ pandoc.Code(s) })
end

local function plain(s)
  return pandoc.Plain(pandoc.utils.blocks_to_inlines(pandoc.read(s, "markdown").blocks))
end

local function id_table(title, headers, rows)
  local head = pandoc.TableHead({ pandoc.Row((function()
    local cells = {}
    for _, h in ipairs(headers) do cells[#cells + 1] = pandoc.Cell({ pandoc.Plain({ pandoc.Str(h) }) }) end
    return cells
  end)()) })
  local body_rows = {}
  for _, row in ipairs(rows) do
    local cells = { pandoc.Cell({ code(row[1]) }) }
    for i = 2, #row do cells[#cells + 1] = pandoc.Cell({ plain(row[i]) }) end
    body_rows[#body_rows + 1] = pandoc.Row(cells)
  end
  local aligns = {}
  for i = 1, #headers do aligns[i] = { pandoc.AlignLeft, pandoc.ColWidthDefault } end
  return {
    pandoc.Header(2, pandoc.utils.blocks_to_inlines(pandoc.read(title, "markdown").blocks)),
    pandoc.Table({ long = {}, short = {} }, aligns, head, { { attr = pandoc.Attr(), body = body_rows, head = {}, row_head_columns = 0 } }, pandoc.TableFoot()),
  }
end

local function from_dir(dir, fields, pattern)
  local rows = {}
  for _, name in ipairs(list_dir(dir)) do
    if name:match(pattern or "%.yaml$") then
      local meta = read_yaml(dir .. "/" .. name)
      if meta and meta.id then
        local row = { text(meta.id) }
        for _, f in ipairs(fields) do row[#row + 1] = type(f) == "function" and f(meta) or text(meta[f]) end
        rows[#rows + 1] = row
      end
    end
  end
  return rows
end

local function build()
  local blocks = {}
  local function add(list) for _, b in ipairs(list) do blocks[#blocks + 1] = b end end
  add(id_table("Levels (`level`)", { "id", "label", "size" },
    from_dir(REGISTRY .. "/levels", { "label", function(m) return (text(m.length_scale):gsub("%^(%-?%d+)", "^%1^")) end })))
  local paths = {}
  for _, name in ipairs(list_dir(REGISTRY .. "/paths")) do
    local meta = read_yaml(REGISTRY .. "/paths/" .. name .. "/path.yaml")
    if meta then paths[#paths + 1] = { name, text(meta.label) } end
  end
  add(id_table("Paths (`path`)", { "id", "label" }, paths))
  add(id_table("Questions (`q`)", { "id", "question", "label" }, from_dir(REGISTRY .. "/questions", { "question", "badge" })))
  add(id_table("Preset tours (`tour:`)", { "id", "title", "summary" }, from_dir(REGISTRY .. "/tours", { "title", "summary" })))
  local eras = {}
  local eras_meta = read_yaml(REGISTRY .. "/eras.yaml")
  for _, era in ipairs(eras_meta and eras_meta.eras or {}) do eras[#eras + 1] = { text(era.id), text(era.label) } end
  add(id_table("Eras (`era`)", { "id", "label" }, eras))
  add(id_table("Models (`model`)", { "id", "label" }, from_dir(REGISTRY .. "/models", { "label" })))
  return blocks
end

function Pandoc(doc)
  if doc.meta.registry then REGISTRY = text(doc.meta.registry) end
  local out = {}
  for _, block in ipairs(doc.blocks) do
    if block.t == "Div" and block.classes:includes("observatory-ids") then
      for _, b in ipairs(build()) do out[#out + 1] = b end
    else
      out[#out + 1] = block
    end
  end
  doc.blocks = out
  return doc
end
