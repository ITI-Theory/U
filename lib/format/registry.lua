local ATLAS = "."
local ROOT = "../../.."
local REGISTRY = ROOT .. "/registry"
local PLATES = ATLAS .. "/figures/plates"

local function read_file(path)
  local f = io.open(path, "rb")
  if not f then return nil end
  local s = f:read("*a")
  f:close()
  return s
end

local function exists(path)
  local f = io.open(path, "rb")
  if f then f:close(); return true end
  return false
end

local function list_dir(path)
  local ok, entries = pcall(pandoc.system.list_directory, path)
  if not ok then return {} end
  table.sort(entries)
  return entries
end

local function stringify(x)
  if x == nil then return "" end
  if type(x) == "string" then return x end
  if type(x) == "number" or type(x) == "boolean" then return tostring(x) end
  return pandoc.utils.stringify(x)
end

local function inlines_to_source(inlines)
  local out = {}
  local function add(s) out[#out + 1] = s end
  for _, el in ipairs(inlines) do
    if el.t == "Str" then add(el.text or el.c or "") end
    if el.t == "Space" or el.t == "SoftBreak" or el.t == "LineBreak" then add(" ") end
    if el.t == "RawInline" then add(el.text or el.c and el.c[2] or "") end
    if el.t == "Math" then
      local text = el.text or el.c and el.c[2] or ""
      if el.mathtype == "DisplayMath" or (el.c and el.c[1] == "DisplayMath") then add("$$" .. text .. "$$") else add("$" .. text .. "$") end
    end
    if el.t == "Code" then add(el.text or el.c or "") end
    if el.t == "Emph" or el.t == "Strong" or el.t == "Span" or el.t == "Quoted" then add(inlines_to_source(el.content or el.c or {})) end
    if el.t == "Link" then add(inlines_to_source(el.content or el.c and el.c[1] or {})) end
  end
  return table.concat(out)
end

local function meta_to_lua(v)
  if v == nil then return nil end
  local tv = type(v)
  if tv == "string" or tv == "number" or tv == "boolean" then return v end
  if tv ~= "table" then return stringify(v) end
  local pt = pandoc.utils.type(v)
  if pt == "Inlines" then return inlines_to_source(v) end
  if pt == "Blocks" then return stringify(v) end
  if pt == "List" then
    local out = {}
    for i, item in ipairs(v) do out[i] = meta_to_lua(item) end
    return out
  end
  if v.t == "MetaBool" then return v.c end
  if v.t == "MetaString" then return v.text or v.c or stringify(v) end
  if v.t == "MetaInlines" or v.t == "MetaBlocks" then return stringify(v) end
  if v[1] ~= nil and type(v[1]) == "table" and v[1].t and
      (v[1].t == "Str" or v[1].t == "Space" or v[1].t == "SoftBreak" or
       v[1].t == "LineBreak" or v[1].t == "Math" or v[1].t == "Code" or
       v[1].t == "Emph" or v[1].t == "Strong" or v[1].t == "Link" or
       v[1].t == "Quoted" or v[1].t == "Span") then
    return stringify(v)
  end
  if v.t == "MetaList" then
    local out = {}
    for i, item in ipairs(v.c or v) do out[i] = meta_to_lua(item) end
    return out
  end
  if v.t == "MetaMap" then
    local out = {}
    for k, item in pairs(v.c or v) do if k ~= "t" and k ~= "c" then out[k] = meta_to_lua(item) end end
    return out
  end
  if v[1] ~= nil then
    local out = {}
    for i, item in ipairs(v) do out[i] = meta_to_lua(item) end
    return out
  end
  local out = {}
  for k, item in pairs(v) do if k ~= "t" then out[k] = meta_to_lua(item) end end
  return out
end

local function read_yaml(path)
  local s = read_file(path)
  if not s then error("missing YAML file: " .. path) end
  local doc = pandoc.read("---\n" .. s .. "\n---\n", "markdown")
  return meta_to_lua(doc.meta)
end

local function raw_equations(path)
  local s = read_file(path) or ""
  local out = {}
  for line in s:gmatch("[^\r\n]+") do
    local eq = line:match("^%s*equation:%s*'(.-)'%s*$") or
      line:match('^%s*equation:%s*"(.-)"%s*$') or
      line:match("^%s*equation:%s*(.-)%s*$")
    if eq and eq ~= "" then out[#out + 1] = eq end
  end
  return out
end

local function read_markdown_doc(path)
  local s = read_file(path)
  if not s then error("missing Markdown file: " .. path) end
  return pandoc.read(s, "markdown+yaml_metadata_block+tex_math_dollars+citations+smart")
end

local function parse_inlines(s)
  local doc = pandoc.read(tostring(s or ""), "markdown+tex_math_dollars+citations+smart")
  if #doc.blocks == 1 and (doc.blocks[1].t == "Para" or doc.blocks[1].t == "Plain") then
    return doc.blocks[1].content
  end
  return {pandoc.Str(tostring(s or ""))}
end

local function parse_blocks(s)
  return pandoc.read(tostring(s or ""), "markdown+tex_math_dollars+citations+smart").blocks
end

local function attr(id, classes, attrs)
  return pandoc.Attr(id or "", classes or {}, attrs or {})
end

local function header(level, text, id, classes)
  return pandoc.Header(level, parse_inlines(text), attr(id or "", classes or {}, {}))
end

local function para(text)
  return pandoc.Para(parse_inlines(text))
end

local function raw_latex(text)
  if FORMAT:match("latex") then return pandoc.RawBlock("latex", text) end
  return nil
end

local function page_break()
  if FORMAT:match("latex") then return pandoc.RawBlock("latex", "\\newpage") end
  return pandoc.Div({}, attr("", {"page-break"}, {}))
end

local function powers(text)
  return tostring(text or ""):gsub("10%^(-?%d+)", "$10^{%1}$")
end

local function demote_blocks(blocks, levels)
  local out = {}
  for _, b in ipairs(blocks) do
    local c = b:clone()
    if c.t == "Header" then c.level = math.min(6, c.level + levels) end
    out[#out + 1] = c
  end
  return out
end

local function is_image_block(b)
  return (b.t == "Para" or b.t == "Plain") and #b.content == 1 and b.content[1].t == "Image"
end

local function has_table(blocks)
  for _, b in ipairs(blocks) do if b.t == "Table" then return true end end
  return false
end

local function columns_div(blocks)
  if #blocks == 0 then return nil end
  return pandoc.Div(blocks, attr("", {"columns"}, {}))
end

local function split_columns(blocks)
  local out, chunk = {}, {}
  local function flush()
    if #chunk > 0 then
      out[#out + 1] = columns_div(chunk)
      chunk = {}
    end
  end
  for _, b in ipairs(blocks) do
    if is_image_block(b) or b.t == "Table" then
      flush(); out[#out + 1] = b
    else
      chunk[#chunk + 1] = b
    end
  end
  flush()
  return out
end

local function maybe_columns(blocks)
  if has_table(blocks) then return blocks end
  return split_columns(blocks)
end

local function append(dst, src)
  for _, v in ipairs(src or {}) do if v then dst[#dst + 1] = v end end
end

local function image_block(caption, src, classes, attrs)
  return pandoc.Para({pandoc.Image(parse_inlines(caption), src, "", attr("", classes or {}, attrs or {width="100%"}))})
end

local function link(label, target)
  return pandoc.Link(parse_inlines(label), target)
end

local function join_inlines(parts, sep)
  local out = {}
  for i, p in ipairs(parts) do
    if i > 1 and sep then append(out, parse_inlines(sep)) end
    local pt = type(p) == "table" and pandoc.utils.type(p) or nil
    if pt == "Inline" then
      out[#out + 1] = p
    elseif pt == "Inlines" or (type(p) == "table" and p[1]) then
      append(out, p)
    else
      append(out, parse_inlines(tostring(p or "")))
    end
  end
  return out
end

local function cell_blocks(value)
  local inls
  if type(value) == "table" and value[1] then inls = value else inls = parse_inlines(tostring(value or "")) end
  return {pandoc.Plain(inls)}
end

local function table_row(values)
  local cells = {}
  for _, value in ipairs(values) do
    cells[#cells + 1] = pandoc.Cell(cell_blocks(value), pandoc.AlignDefault, 1, 1, attr())
  end
  return pandoc.Row(cells, attr())
end

local function simple_table(headers, rows)
  local colspecs = {}
  for i = 1, #headers do
    local width = 1 / math.max(#headers, 1)
    if #headers == 2 and headers[1] == "" and headers[2] == "" then
      width = (i == 1) and 0.20 or 0.80
    end
    colspecs[#colspecs + 1] = {pandoc.AlignLeft, width}
  end
  local head = pandoc.TableHead({table_row(headers)})
  local body_rows = {}
  for _, r in ipairs(rows) do body_rows[#body_rows + 1] = table_row(r) end
  local bodies = {pandoc.TableBody(body_rows)}
  local foot = pandoc.TableFoot({})
  return pandoc.Table(pandoc.Caption({}, {}), colspecs, head, bodies, foot, attr())
end

local level_cache = nil
local function load_levels()
  if level_cache then return level_cache end
  level_cache = {}
  for _, name in ipairs(list_dir(REGISTRY .. "/levels")) do
    if name:match("%.yaml$") then
      local path = REGISTRY .. "/levels/" .. name
      local data = read_yaml(path)
      data.equation = raw_equations(path)[1] or data.equation
      if data.id then level_cache[data.id] = data end
    end
  end
  return level_cache
end

local function load_edges()
  local edges = {}
  for _, path_id in ipairs(list_dir(REGISTRY .. "/paths")) do
    local edges_dir = REGISTRY .. "/paths/" .. path_id .. "/edges"
    for _, name in ipairs(list_dir(edges_dir)) do
      if name:match("%.md$") then
        local doc = read_markdown_doc(edges_dir .. "/" .. name)
        local front = meta_to_lua(doc.meta)
        if front.from and front.to then
          local key = front.from .. "\t" .. front.to
          if not edges[key] or path_id == "full-atlas" then
            edges[key] = {front=front, blocks=doc.blocks, path_id=path_id}
          end
        end
      end
    end
  end
  return edges
end

local function load_models_and_paths()
  local models, paths = {}, {}
  for _, name in ipairs(list_dir(REGISTRY .. "/models")) do
    if name:match("%.yaml$") then models[#models + 1] = read_yaml(REGISTRY .. "/models/" .. name) end
  end
  for _, path_id in ipairs(list_dir(REGISTRY .. "/paths")) do
    local p = REGISTRY .. "/paths/" .. path_id .. "/path.yaml"
    if exists(p) then paths[#paths + 1] = read_yaml(p) end
  end
  return models, paths
end

local function load_examples()
  local examples = {}
  for _, name in ipairs(list_dir(REGISTRY .. "/examples")) do
    if name:match("%.yaml$") then
      local path = REGISTRY .. "/examples/" .. name
      local ex = read_yaml(path)
      local eqs = raw_equations(path)
      for i, step in ipairs(ex.steps or {}) do
        if eqs[i] then step.equation = eqs[i] end
      end
      if ex.level then
        examples[ex.level] = examples[ex.level] or {}
        examples[ex.level][#examples[ex.level] + 1] = ex
      end
    end
  end
  return examples
end

local function load_questions()
  local questions = {}
  for _, name in ipairs(list_dir(REGISTRY .. "/questions")) do
    if name:match("%.yaml$") then questions[#questions + 1] = read_yaml(REGISTRY .. "/questions/" .. name) end
  end
  return questions
end

local function load_plate_captions()
  local s = read_file(PLATES .. "/plates.json")
  if not s or not pandoc.json or not pandoc.json.decode then return {} end
  local ok, data = pcall(pandoc.json.decode, s)
  if not ok or not data then return {} end
  return data.levels or {}
end

local function figure_caption(captions, level_id, kind, fallback)
  if captions[level_id] and captions[level_id][kind] and captions[level_id][kind].caption then
    return captions[level_id][kind].caption
  end
  return fallback
end

local axis_titles = {
  ["4d-baseline"] = "4D / physics baseline",
  ["8d-life"] = "8D / life and regulation",
  ["11d-mind"] = "11D / mind",
}

local function level_link(level_id, labels)
  return link(labels[level_id] or level_id, "#level-" .. level_id)
end

local function atlas_plate_blocks(level_id, label, ordinal, captions, missing)
  local out = {}
  local triptych = PLATES .. "/" .. level_id .. "-triptych.png"
  local callouts = PLATES .. "/" .. level_id .. "-callouts.png"
  if exists(triptych) then
    out[#out + 1] = image_block("Figure L" .. ordinal .. ".1 — " .. figure_caption(captions, level_id, "triptych", label .. ": aligned 4D, 8D, and 11D atlas views."), "figures/plates/" .. level_id .. "-triptych.png", {"plate"}, {width="100%"})
  else
    missing[#missing + 1] = "triptych plate for " .. level_id
  end
  if exists(callouts) then
    out[#out + 1] = image_block("Figure L" .. ordinal .. ".2 — " .. figure_caption(captions, level_id, "callouts", label .. ": magnified atlas callouts."), "figures/plates/" .. level_id .. "-callouts.png", {"plate"}, {width="100%"})
  else
    missing[#missing + 1] = "callout plate for " .. level_id
  end
  return out
end

local function front_or_back(path)
  local doc = read_markdown_doc(path)
  if #doc.blocks <= 1 then return doc.blocks end
  local out = {doc.blocks[1]}
  local rest = {}
  for i = 2, #doc.blocks do rest[#rest + 1] = doc.blocks[i] end
  append(out, maybe_columns(rest))
  return out
end

local function theory_chapter(path)
  local doc = read_markdown_doc(path)
  if #doc.blocks <= 1 then return doc.blocks end
  local out = {doc.blocks[1]}
  local rest = {}
  for i = 2, #doc.blocks do rest[#rest + 1] = doc.blocks[i] end
  append(out, split_columns(rest))
  return out
end

local function models_part(models, labels)
  local out = {
    header(1, "Models", "part-models"),
    para("A model is a named way of reading the ladder: its own coordinates over the shared levels. The same level can carry different coordinates in different models; the level itself does not change.")
  }
  for _, model in ipairs(models) do
    out[#out + 1] = header(2, model.label or model.id, "model-" .. model.id)
    if model.description then out[#out + 1] = para(model.description) end
    local rows = {}
    for _, entry in ipairs(model.levels or {}) do
      local ids = entry.levels or {entry.level}
      local links = {}
      for _, id in ipairs(ids) do if id then links[#links + 1] = level_link(id, labels) end end
      rows[#rows + 1] = {entry.coordinate or "", entry.label or "", join_inlines(links, ", ")}
    end
    out[#out + 1] = simple_table({"Coordinate", "Name", "Levels"}, rows)
    local pls = {}
    for _, p in ipairs(model.paths or {}) do pls[#pls + 1] = link(p, "#path-" .. p) end
    out[#out + 1] = pandoc.Para(join_inlines({"Paths in this model: ", join_inlines(pls, ", "), "."}, ""))
  end
  return out
end

local function paths_part(paths, labels, edges, examples, missing)
  local out = {
    header(1, "Paths", "part-paths"),
    para("A path is an ordered route through the levels, one transition per step. Paths are how the app moves between levels, and how a single system (a body, a flock, a city, a planet) is followed up the ladder.")
  }
  for _, path in ipairs(paths) do
    out[#out + 1] = header(2, path.label or path.id, "path-" .. path.id)
    local purpose = path.purpose or ""
    if purpose == "" or purpose:match("^Migrated") then
      missing[#missing + 1] = "reader-facing purpose for path " .. path.id
    else
      out[#out + 1] = para(purpose)
    end
    local items = {}
    for _, level_id in ipairs(path.nodes or {}) do items[#items + 1] = {pandoc.Plain({level_link(level_id, labels)})} end
    out[#out + 1] = pandoc.OrderedList(items)
    local rows = {}
    for i = 1, #(path.nodes or {}) - 1 do
      local source, target = path.nodes[i], path.nodes[i + 1]
      local edge = (edges[source .. "\t" .. target] or {}).front or {}
      rows[#rows + 1] = {
        (labels[source] or source) .. " to " .. (labels[target] or target),
        edge.label or "-",
        edge.kernel or "-",
        edge.claim or "-"
      }
    end
    if #rows > 0 then out[#out + 1] = simple_table({"Step", "Operation", "Kernel", "Badge"}, rows) end
    local exs = {}
    for _, group in pairs(examples) do
      for _, ex in ipairs(group) do
        for _, pid in ipairs(ex.paths or {}) do if pid == path.id then exs[#exs + 1] = ex end end
      end
    end
    if #exs > 0 then
      local chunks = {"Worked examples on this path: "}
      for i, ex in ipairs(exs) do
        if i > 1 then chunks[#chunks + 1] = "; " end
        chunks[#chunks + 1] = ex.label .. " (at "
        chunks[#chunks + 1] = level_link(ex.level, labels)
        chunks[#chunks + 1] = ")"
      end
      chunks[#chunks + 1] = "."
      out[#out + 1] = pandoc.Para(join_inlines(chunks, ""))
    end
  end
  return out
end

local function time_axis_part(eras, labels)
  local band_titles = {
    cosmic = "Cosmic",
    geological = "Geological",
    palaeontology = "Life / palaeontology",
    human = "Human",
    philosophy = "Philosophy"
  }
  local order = {"cosmic", "geological", "palaeontology", "human", "philosophy"}
  local out = {
    header(1, "Time Axis", "part-time-axis"),
    para("The time axis is a second way to drive the same registry. It moves through sourced cosmology, Earth history, life history, human history, and the Philosophy Appendix C ledger while keeping the level ladder unchanged.")
  }
  for _, band in ipairs(order) do
    local rows = {}
    for _, era in ipairs(eras or {}) do
      if era.band == band then
        rows[#rows + 1] = {
          (era.time and era.time.display) or "",
          era.label or era.id or "",
          {level_link(era.level, labels)},
          era.badge or ""
        }
      end
    end
    if #rows > 0 then
      out[#out + 1] = header(2, band_titles[band], "time-axis-" .. band)
      out[#out + 1] = simple_table({"Time", "Era", "Level", "Badge"}, rows)
    end
  end
  return out
end

local function questions_part(questions, labels)
  if #questions == 0 then return {} end
  local out = {
    header(1, "What's Different?", "part-whats-different"),
    para("Curated question tours contrast ordinary science with the programme's added claims. Each answer names the evidence label so visual comparison does not become overclaim.")
  }
  for _, q in ipairs(questions) do
    out[#out + 1] = header(2, q.question or q.id, "question-" .. q.id)
    out[#out + 1] = pandoc.Para(join_inlines({"**Label:** `" .. (q.badge or "-") .. "`  ", "**Level:** ", level_link(q.level, labels)}, ""))
    if q.short_answer then append(out, parse_blocks(q.short_answer)) end
    local image = "figures/app/questions/" .. q.id .. ".png"
    if exists(ATLAS .. "/" .. image) then out[#out + 1] = image_block("", image, {"question-image"}, {width="90%"}) end
    if q.next then out[#out + 1] = para("**Next:** [question-" .. q.next .. "](#question-" .. q.next .. ")") end
    if q.sources and #q.sources > 0 then
        -- programme ids (P21) and bibliography keys both become citations
        local keys = {}
        for _, s in ipairs(q.sources) do keys[#keys + 1] = "@" .. s end
        out[#out + 1] = para("Sources: [" .. table.concat(keys, "; ") .. "].")
      end
  end
  return split_columns(out)
end

local function level_spread(level_id, ordinal, labels, edges, examples, missing, paths, captions)
  local data = load_levels()[level_id]
  if not data then error("unknown level " .. level_id) end
  local entry_path = REGISTRY .. "/levels/" .. level_id .. ".md"
  local entry_doc = exists(entry_path) and read_markdown_doc(entry_path) or pandoc.Pandoc({para("Entry text not yet written.")}, {})
  local front = meta_to_lua(entry_doc.meta)
  local claims = data.claims or {}
  local out = {page_break(), header(2, data.label or level_id, "level-" .. level_id)}
  local path_links = {}
  for _, p in ipairs(paths or {}) do
    for _, node in ipairs(p.nodes or {}) do
      if node == level_id then path_links[#path_links + 1] = link(p.label or p.id, "#path-" .. p.id); break end
    end
  end
  local path_cell = #path_links > 0 and join_inlines(path_links, ", ") or parse_inlines("none yet")
  out[#out + 1] = simple_table({"", ""}, {
    {"Scale", powers(data.length_scale or "")},
    {"Response time", powers(data.response_time or "not set") .. ": " .. (data.response_time_basis or "")},
    {"Substrate", data.substrate or ""},
    {"Field", data.field or ""},
    {"Equation", "$" .. (data.equation or "") .. "$"},
    {"Badges", "physical " .. (claims.physical or "-") .. ", field " .. (claims.field or "-") .. ", mind " .. (claims.mind or "-")},
    {"Paths", path_cell},
  })
  append(out, atlas_plate_blocks(level_id, data.label or level_id, ordinal, captions, missing))
  local body_plus = demote_blocks(entry_doc.blocks, 1)
  for _, fig in ipairs(front.figures or {}) do
    body_plus[#body_plus + 1] = image_block("", "figures/" .. fig, {"theory-figure"}, {width="80%"})
  end
  for _, ex in ipairs(examples[level_id] or {}) do
    body_plus[#body_plus + 1] = header(3, "Worked example: " .. ex.label)
    if ex.summary then body_plus[#body_plus + 1] = para(ex.summary) end
    for _, step in ipairs(ex.steps or {}) do
      body_plus[#body_plus + 1] = pandoc.Para(join_inlines({"**" .. (axis_titles[step.axis] or step.axis or "Axis") .. ": " .. (step.title or "") .. "** (" .. (step.badge or "-") .. ")"}, ""))
      append(body_plus, parse_blocks(step.body or ""))
      if step.equation then body_plus[#body_plus + 1] = pandoc.Para({pandoc.Math("DisplayMath", step.equation)}) end
    end
  end
  for key, edge in pairs(edges) do
    local source, target = key:match("^(.-)\t(.+)$")
    if source == level_id then
      body_plus[#body_plus + 1] = header(3, "Transition: " .. (data.label or level_id) .. " to " .. (labels[target] or target))
      append(body_plus, edge.blocks)
    end
  end
  append(out, split_columns(body_plus))
  return out
end

local function build_atlas(meta)
  local atlas = meta_to_lua(meta)
  local levels = load_levels()
  local labels = {}
  for id, data in pairs(levels) do labels[id] = data.label or id end
  local listed = {}
  for _, sector in ipairs(atlas.sectors or {}) do for _, level in ipairs(sector.levels or {}) do listed[#listed + 1] = level end end
  local listed_set = {}; for _, id in ipairs(listed) do listed_set[id] = true end
  for id, _ in pairs(labels) do if not listed_set[id] then error("levels in registry but not in atlas.yaml: " .. id) end end

  local edges = load_edges()
  local examples = load_examples()
  local models, paths = load_models_and_paths()
  local eras_meta = read_yaml(REGISTRY .. "/eras.yaml")
  local captions = load_plate_captions()
  local missing = {}
  local out = {}
  local fm = raw_latex("\\frontmatter"); if fm then out[#out + 1] = fm end
  for _, name in ipairs(atlas.front or {}) do append(out, front_or_back(ATLAS .. "/" .. name)) end
  local mm = raw_latex("\\mainmatter"); if mm then out[#out + 1] = mm end
  if atlas.theory then
    out[#out + 1] = header(1, "Part I: Theory", "part-i-theory")
    append(out, split_columns(parse_blocks("A field theory starts by naming a domain, a value space, an operator, boundary data, sources, and the observable projection. Waves, Green functions, scale changes, compact dimensions, and cosmological density fractions are then different uses of the same response grammar, with each physical claim carrying its own evidence label.")))
    for _, name in ipairs(atlas.theory or {}) do append(out, theory_chapter(ATLAS .. "/" .. name)) end
    out[#out + 1] = header(1, "Part II: Field Atlas", "part-ii-field-atlas")
  end
  local ordinal = {}; for i, id in ipairs(listed) do ordinal[id] = i end
  for number, sector in ipairs(atlas.sectors or {}) do
    local doc = read_markdown_doc(ATLAS .. "/" .. sector.file)
    local front = meta_to_lua(doc.meta)
    out[#out + 1] = header(1, "Sector " .. tostring(front.sector or number) .. ": " .. tostring(front.title or ""))
    append(out, maybe_columns(doc.blocks))
    for _, level_id in ipairs(sector.levels or {}) do append(out, level_spread(level_id, ordinal[level_id], labels, edges, examples, missing, paths, captions)) end
  end
  if atlas.questions ~= false then append(out, questions_part(load_questions(), labels)) end
  append(out, models_part(models, labels))
  append(out, paths_part(paths, labels, edges, examples, missing))
  append(out, time_axis_part(eras_meta.eras or {}, labels))
  local on_paths = {}; for _, p in ipairs(paths) do for _, id in ipairs(p.nodes or {}) do on_paths[id] = true end end
  for _, id in ipairs(listed) do if not on_paths[id] then missing[#missing + 1] = "level " .. id .. " is on no path" end end
  local bm = raw_latex("\\backmatter"); if bm then out[#out + 1] = bm end
  for _, name in ipairs(atlas.back or {}) do append(out, front_or_back(ATLAS .. "/" .. name)) end
  out[#out + 1] = header(1, "References", "", {"unnumbered"})
  out[#out + 1] = pandoc.Div({}, attr("refs", {}, {}))
  if #missing > 0 then io.stderr:write("atlas registry notes:\n- " .. table.concat(missing, "\n- ") .. "\n") end
  return out
end

function Pandoc(doc)
  local out = {}
  for _, block in ipairs(doc.blocks) do
    if block.t == "Div" then
      local found = false
      for _, c in ipairs(block.classes or {}) do if c == "field-atlas-registry" then found = true end end
      if found then append(out, build_atlas(doc.meta)) else out[#out + 1] = block end
    else
      out[#out + 1] = block
    end
  end
  doc.blocks = out
  doc.meta.author = doc.meta.author or pandoc.MetaInlines({pandoc.Str("Alistair Johnson")})
  doc.meta.date = doc.meta.date or pandoc.MetaInlines({pandoc.Str("2026")})
  return doc
end
