local box_classes = {
  ["learning-objectives"] = {"Learning Objectives", "textbookteal"},
  ["example"] = {"Example", "textbookgold"},
  ["check-your-learning"] = {"Check Your Learning", "textbookgreen"},
  ["link-to-learning"] = {"Link to Learning", "textbookpurple"},
  ["making-connections"] = {"Making Connections", "textbookblue"},
  ["soma-machine"] = {"In the Soma Machine", "textbookpurple"},
  ["key-terms"] = {"Key Terms", "textbookblue"},
  ["key-equations"] = {"Key Equations", "textbookteal"},
  ["summary"] = {"Summary", "textbookgreen"},
  ["review-questions"] = {"Review Questions", "textbookgold"},
  ["problems"] = {"Problems", "textbookpurple"},
  ["answer-key"] = {"Answer Key", "textbookblue"},
  ["figure-credits"] = {"Figure Credits", "textbookblue"},
}

local ROOT = "../../.."
local LEVEL_DIR = ROOT .. "/registry/levels"
local level_order = {
  "quantum-foam", "string-boundary", "nuclear", "atomic", "molecular",
  "cellular-synaptic", "local-circuit", "whole-brain-cemi", "human-vertebrate",
  "dyad", "human-group", "animal-swarm", "bird", "flock", "colony-roost",
  "society-city", "regional-institutional", "civilisational-solar",
  "species-stellar", "geological", "planetary", "orbital-system", "stellar",
  "compact-object", "stellar-cluster", "galactic-disc", "galactic-halo",
  "galaxy-cluster", "cosmic-filaments", "observable-universe", "cosmic-web"
}

local function has_class(el, class)
  for _, c in ipairs(el.classes or {}) do if c == class then return true end end
  return false
end

local function attr(id, classes, attrs)
  return pandoc.Attr(id or "", classes or {}, attrs or {})
end

local function stringify_title(div, fallback)
  if div.attributes and div.attributes.title and div.attributes.title ~= "" then return div.attributes.title end
  return fallback
end

local function latex_escape(text)
  text = tostring(text or "")
  text = text:gsub("\\", "\\textbackslash{}")
  text = text:gsub("&", "\\&"):gsub("%%", "\\%%"):gsub("#", "\\#")
  text = text:gsub("_", "\\_"):gsub("{", "\\{"):gsub("}", "\\}")
  return text
end

local function html_escape(text)
  text = tostring(text or "")
  text = text:gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;")
  return text
end

local function read_file(path)
  local f = io.open(path, "rb")
  if not f then return nil end
  local s = f:read("*a")
  f:close()
  return s
end

local function yaml_field(text, key)
  return (text or ""):match("\n" .. key .. ":%s*([^\n]+)") or (text or ""):match("^" .. key .. ":%s*([^\n]+)") or ""
end

local function cell_blocks(text)
  return {pandoc.Plain({pandoc.Str(tostring(text or ""))})}
end

local function table_row(values)
  local cells = {}
  for _, value in ipairs(values) do
    cells[#cells + 1] = pandoc.Cell(cell_blocks(value), pandoc.AlignDefault, 1, 1, attr())
  end
  return pandoc.Row(cells, attr())
end

local function registry_level_table()
  local rows = {}
  for i, id in ipairs(level_order) do
    local y = read_file(LEVEL_DIR .. "/" .. id .. ".yaml") or ""
    rows[#rows + 1] = {
      tostring(i),
      (yaml_field(y, "label"):gsub('^"', ''):gsub('"$', '')),
      id,
      yaml_field(y, "length_scale"),
      yaml_field(y, "response_time"),
      yaml_field(y, "field")
    }
  end
  local widths = {0.05, 0.18, 0.21, 0.16, 0.16, 0.24}
  local colspecs = {}
  for _, w in ipairs(widths) do colspecs[#colspecs + 1] = {pandoc.AlignLeft, w} end
  local head = pandoc.TableHead({table_row({"No.", "Label", "Registry id", "Length scale", "Response time", "Field"})})
  local body_rows = {}
  for _, r in ipairs(rows) do body_rows[#body_rows + 1] = table_row(r) end
  local bodies = {pandoc.TableBody(body_rows)}
  local foot = pandoc.TableFoot({})
  return pandoc.Table(pandoc.Caption({pandoc.Plain({pandoc.Str("Thirty-one registry levels loaded from registry/levels/*.yaml")})}, {}), colspecs, head, bodies, foot, attr())
end

function Div(div)
  if has_class(div, "level-registry-table") then
    return registry_level_table()
  end
  for class, spec in pairs(box_classes) do
    if has_class(div, class) then
      local title = stringify_title(div, spec[1])
      if FORMAT:match("latex") then
        local out = {pandoc.RawBlock("latex", "\\begin{textbookbox}[" .. latex_escape(title) .. "]{" .. spec[2] .. "}")}
        for _, block in ipairs(div.content) do out[#out+1] = block end
        out[#out+1] = pandoc.RawBlock("latex", "\\end{textbookbox}")
        return out
      elseif FORMAT:match("html") then
        local out = {pandoc.RawBlock("html", "<div class=\"textbook-box " .. class .. "\"><span class=\"box-title\">" .. html_escape(title) .. "</span>")}
        for _, block in ipairs(div.content) do out[#out+1] = block end
        out[#out+1] = pandoc.RawBlock("html", "</div>")
        return out
      end
      return div
    end
  end
  return nil
end