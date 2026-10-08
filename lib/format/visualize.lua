-- visualize.lua: the {{Visualize}} macro (docs/VISUALIZE.md).
--
--   {{Visualize | context | primitive:concept | key=value; key=value }} Caption text.
--
-- Needs the reader lib/format/visualize-reader.lua, which keeps the macro text
-- out of pandoc's inline parser.
--
-- A figure is declared in the text and drawn by code from the equation it
-- illustrates; no figure is drawn by hand or by an image generator.
--   * context   what the figure visualises, and it must already exist earlier
--               in the document: a section, box or equation label (sec:...,
--               ex:..., eq:...), or a Lean theorem (lean:Module.theorem).
--   * primitive the drawing (function-plot, area-under, ...): one renderer each
--               in lib/visualize/render.py.
--   * concept   the physical domain; it sets the palette (generic, wave,
--               quantum, neural, soma, earth, cosmic).
--   * params    renderer parameters; `label=fig:x` makes the figure
--               numbered and referable as @fig:x; `width=` / `height=`
--               (percent) size it on the page.
-- The filter replaces the macro with an image <visualize-src>/viz-<hash>.png
-- and writes every spec to <visualize-manifest> (JSON); render.py draws the
-- missing images from that manifest before LaTeX runs. Any error fails the build.
--
-- Metadata: visualize-render (Python interpreter: draw the figures now, for
--           one-step PDF builds), visualize-manifest (path), visualize-src (image path prefix as
-- the output document sees it), lean-root (folder of the .lean files).

local PRIMITIVES = {
  ["function-plot"] = true, ["area-under"] = true, ["log-scale"] = true,
  ["complex-plane"] = true, ["vector-field"] = true, ["contour-map"] = true,
  ["energy-landscape"] = true, ["eigen-transform"] = true, ["distribution"] = true,
  ["spectrum"] = true, ["convolution"] = true,
}
local CONCEPTS = {
  generic = true, wave = true, quantum = true, neural = true, soma = true,
  earth = true, cosmic = true,
}
local LAYOUT = { label = true, width = true, height = true, opener = true }

local manifest_path, src_prefix, lean_root = nil, "visualize", nil
local specs = {}

local function fail(msg) error("visualize: " .. msg, 0) end

local function trim(s) return (s:gsub("^%s+", ""):gsub("%s+$", "")) end
local function unquote(s)
  s = trim(s)
  while true do
    local q = s:match('^"(.*)"$') or s:match("^'(.*)'$")
    if not q then return s end
    s = q
  end
end

local function parse_params(text)
  local params, order = {}, {}
  -- split on ; outside quotes and brackets
  local depth, quote, buf, parts = 0, nil, {}, {}
  for ch in text:gmatch(utf8.charpattern) do
    if quote then
      if ch == quote then quote = nil end
      buf[#buf + 1] = ch
    elseif ch == '"' or ch == "'" then quote = ch; buf[#buf + 1] = ch
    elseif ch == "[" or ch == "(" then depth = depth + 1; buf[#buf + 1] = ch
    elseif ch == "]" or ch == ")" then depth = depth - 1; buf[#buf + 1] = ch
    elseif ch == ";" and depth == 0 then parts[#parts + 1] = table.concat(buf); buf = {}
    else buf[#buf + 1] = ch end
  end
  parts[#parts + 1] = table.concat(buf)
  for _, part in ipairs(parts) do
    if trim(part) ~= "" then
      local k, v = part:match("^%s*([%a_][%w_]*)%s*=%s*(.-)%s*$")
      if not k then fail("bad parameter '" .. trim(part) .. "' (expected key=value)") end
      if params[k] ~= nil then fail("parameter '" .. k .. "' given twice") end
      params[k] = unquote(v); order[#order + 1] = k
    end
  end
  return params, order
end

local function lean_theorem_exists(module, name)
  if not lean_root then fail("lean context '" .. module .. "." .. name .. "' but no lean-root metadata") end
  local f = io.open(lean_root .. "/" .. module:gsub("%.", "/") .. ".lean", "rb")
  if not f then fail("lean context: no file " .. module .. ".lean under " .. lean_root) end
  local text = f:read("a"); f:close()
  for _, kw in ipairs({ "theorem", "lemma", "def", "structure", "inductive", "abbrev" }) do
    if text:find("%f[%w]" .. kw .. "%s+" .. name:gsub("%p", "%%%0") .. "%f[^%w_']") then return true end
  end
  return false
end

-- The reader (visualize-reader.lua) wraps each macro as a raw inline of
-- format "visualize"; the caption is everything after it in the paragraph.
local function split_macro(inlines)
  local first = inlines[1]
  if first and first.t == "Str" and first.text:match("^{{%s*Visualize") then
    fail("{{Visualize}} read as prose: use the visualize reader (from: lib/format/visualize-reader.lua)")
  end
  if not first or first.t ~= "RawInline" or first.format ~= "visualize" then return nil end
  local caption = pandoc.Inlines({})
  for j = 2, #inlines do caption:insert(inlines[j]) end
  while #caption > 0 and (caption[1].t == "Space" or caption[1].t == "SoftBreak") do caption:remove(1) end
  return first.text, caption
end

local function parse_macro(text)
  local body = text:match("^{{%s*Visualize%s*|(.*)}}$")
  if not body then fail("not a Visualize macro: " .. text:sub(1, 80)) end
  local fields, rest = {}, body
  for _ = 1, 2 do
    local a, b = rest:match("^([^|]*)|(.*)$")
    if not a then fail("expected {{Visualize | context | primitive:concept | params}}: " .. text:sub(1, 80)) end
    fields[#fields + 1] = trim(a); rest = b
  end
  fields[#fields + 1] = rest
  return fields[1], fields[2], fields[3]
end

local function visualize(para, seen)
  local text, caption = split_macro(para.content)
  if not text then return nil end
  local context, kind, ptext = parse_macro(trim(text))
  local primitive, concept = kind:match("^([%w-]+):([%w-]+)$")
  if not primitive then primitive, concept = kind:match("^([%w-]+)$"), "generic" end
  if not primitive or not PRIMITIVES[primitive] then fail("unknown primitive '" .. kind .. "'") end
  if not CONCEPTS[concept] then fail("unknown concept '" .. concept .. "' in '" .. kind .. "'") end

  local module, thm = context:match("^lean:([%w_.]+)%.([%w_']+)$")
  if module then
    if not lean_theorem_exists(module, thm) then fail("lean context '" .. context .. "' not found") end
  elseif not seen[context] then
    fail("context '" .. context .. "' must label something earlier in the document (a section, box or equation)")
  end
  if #caption == 0 then fail("figure for '" .. context .. "' has no caption (write it after the closing }})") end

  local params, order = parse_params(ptext)
  local render = {}
  local keys = {}
  for _, k in ipairs(order) do if not LAYOUT[k] then keys[#keys + 1] = k; render[k] = params[k] end end
  table.sort(keys)
  local canon = { primitive, concept }
  for _, k in ipairs(keys) do canon[#canon + 1] = k .. "=" .. render[k] end
  local id = "viz-" .. pandoc.utils.sha1(table.concat(canon, "\n")):sub(1, 12)
  specs[#specs + 1] = { id = id, context = context, primitive = primitive, concept = concept,
    params = render, caption = pandoc.utils.stringify(caption) }

  local attrs = {}
  if params.width then attrs.width = params.width end
  if params.height then attrs.height = params.height end
  local classes = { "visualize" }
  if params.opener == "true" then classes[#classes + 1] = "opener" end  -- chapter banner, full width
  local img = pandoc.Image(caption, src_prefix .. "/" .. id .. ".png", "", pandoc.Attr("", classes, attrs))
  return pandoc.Figure({ pandoc.Plain({ img }) }, { long = { pandoc.Plain(caption) } },
    pandoc.Attr(params.label or "", { "visualize" }))
end

local function write_manifest()
  if not manifest_path then return end
  local dir = manifest_path:match("^(.*)[/\\]")
  if dir then pandoc.system.make_directory(dir, true) end
  local f = assert(io.open(manifest_path, "wb"))
  f:write(pandoc.json.encode(specs)); f:close()
end

function Pandoc(doc)
  local m = doc.meta
  if m["visualize-manifest"] then manifest_path = pandoc.utils.stringify(m["visualize-manifest"]) end
  if m["visualize-src"] then src_prefix = pandoc.utils.stringify(m["visualize-src"]) end
  if m["lean-root"] then lean_root = pandoc.utils.stringify(m["lean-root"]) end

  -- One pass in document order: a context must be defined before it is used.
  local seen = {}
  local function note(id) if id and id ~= "" then seen[id] = true end end
  local function walk(blocks)
    local out = pandoc.Blocks({})
    for _, b in ipairs(blocks) do
      if b.t == "Header" then note(b.identifier); out:insert(b)
      elseif b.t == "Div" then note(b.identifier); b.content = walk(b.content); out:insert(b)
      elseif b.t == "Para" then
        local fig = visualize(b, seen)
        if fig then out:insert(fig)
        else
          for _, el in ipairs(b.content) do
            if el.t == "Str" then note(el.text:match("^{#([%w:_.-]+)}$")) end
          end
          out:insert(b)
        end
      elseif b.t == "BlockQuote" then b.content = walk(b.content); out:insert(b)
      else out:insert(b) end
    end
    return out
  end
  doc.blocks = walk(doc.blocks)
  write_manifest()
  -- One-step builds (pandoc straight to PDF, e.g. the Fractal Thesis books) draw
  -- the figures here, before pandoc runs LaTeX: metadata visualize-render names
  -- the Python interpreter, render.py sits beside this filter's library.
  if m["visualize-render"] and manifest_path and #specs > 0 then
    local python = pandoc.utils.stringify(m["visualize-render"])
    local here = PANDOC_SCRIPT_FILE:match("^(.*)[/\\]") or "."
    pandoc.pipe(python, { here .. "/../visualize/render.py", manifest_path }, "")
  end
  return doc
end
