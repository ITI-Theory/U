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
-- the output document sees it), lean-root (folder of the .lean files),
-- visualize-show (all | selected | none; default all): which figures appear. Hidden
-- figures are still drawn and checked (manifest); in HTML they become a collapsed
-- "Show figure" under the equation, elsewhere they are left out. `display=true` on
-- a macro marks it as selected (not `show`: the spectrum primitive uses that).

local PRIMITIVES = {
  ["function-plot"] = true, ["area-under"] = true, ["log-scale"] = true,
  ["complex-plane"] = true, ["vector-field"] = true, ["contour-map"] = true,
  ["energy-landscape"] = true, ["eigen-transform"] = true, ["distribution"] = true,
  ["spectrum"] = true, ["convolution"] = true, ["flock"] = true, ["type-decomposition"] = true, ["matrix-heatmap"] = true, ["process-diagram"] = true, ["data-points"] = true,
}
local CONCEPTS = {
  generic = true, wave = true, quantum = true, neural = true, soma = true,
  earth = true, cosmic = true,
}
local LAYOUT = { label = true, width = true, height = true, opener = true, display = true }

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

-- The source document's name (input file stem), recorded with each figure.
local function document_name()
  local input = PANDOC_STATE.input_files and PANDOC_STATE.input_files[1] or "stdin"
  return (input:match("([^/\\]+)$") or input):gsub("%.%w+$", "")
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
    params = render, caption = pandoc.utils.stringify(caption), document = document_name() }

  local attrs = {}
  if params.width then attrs.width = params.width end
  if params.height then attrs.height = params.height end
  local classes = { "visualize" }
  if params.opener == "true" then classes[#classes + 1] = "opener" end  -- chapter banner, full width
  local img = pandoc.Image(caption, src_prefix .. "/" .. id .. ".png", "", pandoc.Attr("", classes, attrs))
  return pandoc.Figure({ pandoc.Plain({ img }) }, { long = { pandoc.Plain(caption) } },
    pandoc.Attr(params.label or "", { "visualize" })), params.display == "true", context
end

-- visualize-show: all (default), selected (only display=true), none.
local show_mode = "all"
local function shown(selected)
  return show_mode == "all" or (show_mode == "selected" and selected)
end

-- A hidden figure: collapsed in HTML (one click away), left out elsewhere.
local function hidden(fig)
  if not FORMAT:match("html") then return nil end
  return pandoc.Div({
    pandoc.RawBlock("html", '<details class="visualize-more"><summary>Show figure</summary>'),
    fig,
    pandoc.RawBlock("html", "</details>"),
  }, pandoc.Attr("", { "visualize-hidden" }))
end

-- HTML (ISS-051): a display equation and the figures that follow it become one tab panel,
-- EQUATION first and shown by default, then FIGURES, LEAN (the theorem's statement, for a
-- lean: context) and READ MORE (the section the figures illustrate). Radio buttons and CSS
-- only, so it works without JavaScript; the PDF is unchanged.
local tab_count = 0
local section_of = {}   -- a label -> the section that holds it {id, title}
local current_section = nil

local function lean_statement(context)
  local module, name = context:match("^lean:([%w_.]+)%.([%w_']+)$")
  if not module or not lean_root then return nil end
  local f = io.open(lean_root .. "/" .. module:gsub("%.", "/") .. ".lean", "rb")
  if not f then return nil end
  local text = f:read("a"); f:close()
  for _, kw in ipairs({ "theorem", "lemma", "def", "structure", "inductive", "abbrev" }) do
    local s = text:find("%f[%w]" .. kw .. "%s+" .. name:gsub("%p", "%%%0") .. "%f[^%w_']")
    if s then
      local e = text:find(":=", s, true) or text:find("\n\n", s, true) or (s + 400)
      return module .. "." .. name, (text:sub(s, e - 1):gsub("%s+$", ""))
    end
  end
  return nil
end

local function tab_panel(eq, figs, contexts)
  tab_count = tab_count + 1
  local id = "vt" .. tab_count
  local tabs = { { "eq", "EQUATION", { eq } }, { "fig", "FIGURES", figs } }
  local lean_name, lean_text
  for _, c in ipairs(contexts) do
    lean_name, lean_text = lean_statement(c)
    if lean_name then break end
  end
  if lean_name then
    tabs[#tabs + 1] = { "lean", "LEAN", { pandoc.Para({ pandoc.Code(lean_name) }), pandoc.CodeBlock(lean_text, pandoc.Attr("", { "lean" })) } }
  end
  local more = {}
  for _, c in ipairs(contexts) do
    local sec = not c:match("^lean:") and section_of[c]
    if sec then
      more[#more + 1] = pandoc.Para({ pandoc.Str("These"), pandoc.Space(), pandoc.Str("figures"), pandoc.Space(), pandoc.Str("illustrate"), pandoc.Space(),
        pandoc.Link(sec.title, "#" .. sec.id), pandoc.Str(". Each is drawn by code from the equation, its numbers checked; the figure library lists every one with its source and checks.") })
      break
    end
  end
  if #more > 0 then tabs[#tabs + 1] = { "more", "READ MORE", more } end
  local out = { pandoc.RawBlock("html", '<div class="viz-tabs">') }
  for k, t in ipairs(tabs) do
    out[#out + 1] = pandoc.RawBlock("html", string.format('<input type="radio" class="viz-tab-%s" name="%s" id="%s-%s"%s><label for="%s-%s">%s</label>',
      t[1], id, id, t[1], k == 1 and " checked" or "", id, t[1], t[2]))
  end
  for _, t in ipairs(tabs) do
    out[#out + 1] = pandoc.Div(t[3], pandoc.Attr("", { "viz-panel", "viz-panel-" .. t[1] }))
  end
  out[#out + 1] = pandoc.RawBlock("html", "</div>")
  return out
end

local TAB_CSS = [[<style>
.viz-tabs { margin: 1em 0; border: 1px solid #c8ccd4; border-radius: 4px; }
.viz-tabs > input { position: absolute; opacity: 0; pointer-events: none; }
.viz-tabs > label { display: inline-block; padding: .3em .9em; font: 600 .75em/1.6 ui-monospace, monospace; letter-spacing: .06em; color: #4a5160; cursor: pointer; border-bottom: 2px solid transparent; }
.viz-tabs > input:checked + label { color: #1f4f8a; border-bottom-color: #1f4f8a; }
.viz-tabs > input:focus-visible + label { outline: 2px solid #1f4f8a; }
.viz-tabs > .viz-panel { display: none; padding: 0 1em; border-top: 1px solid #c8ccd4; }
.viz-tab-eq:checked ~ .viz-panel-eq, .viz-tab-fig:checked ~ .viz-panel-fig,
.viz-tab-lean:checked ~ .viz-panel-lean, .viz-tab-more:checked ~ .viz-panel-more { display: block; }
.viz-panel-lean pre { white-space: pre-wrap; font-size: .8em; }
</style>]]

local function is_display_eq(b)
  if b.t ~= "Para" then return false end
  for _, el in ipairs(b.content) do
    if el.t == "Math" and el.mathtype == "DisplayMath" then return true end
  end
  return false
end

local function write_manifest()
  if not manifest_path then return end
  local dir = manifest_path:match("^(.*)[/\\]")
  if dir then pandoc.system.make_directory(dir, true) end
  local f = assert(io.open(manifest_path, "wb"))
  f:write(pandoc.json.encode(specs)); f:close()
  -- Builds that share one manifest overwrite it; each document also keeps its own
  -- list in <dir>/docs/, which the figure library (lib/visualize/library.py) reads.
  if dir and #specs > 0 then
    pandoc.system.make_directory(dir .. "/docs", true)
    local g = assert(io.open(dir .. "/docs/" .. document_name() .. ".json", "wb"))
    g:write(pandoc.json.encode(specs)); g:close()
  end
end

function Pandoc(doc)
  local m = doc.meta
  if m["visualize-manifest"] then manifest_path = pandoc.utils.stringify(m["visualize-manifest"]) end
  if m["visualize-src"] then src_prefix = pandoc.utils.stringify(m["visualize-src"]) end
  if m["lean-root"] then lean_root = pandoc.utils.stringify(m["lean-root"]) end
  if m["visualize-show"] then
    show_mode = pandoc.utils.stringify(m["visualize-show"])
    if show_mode ~= "all" and show_mode ~= "selected" and show_mode ~= "none" then
      fail("visualize-show must be all, selected or none, not '" .. show_mode .. "'")
    end
  end

  -- One pass in document order: a context must be defined before it is used.
  local seen = {}
  local function note(id) if id and id ~= "" then seen[id] = true end end
  local html = FORMAT:match("html") ~= nil
  local function walk(blocks)
    local out = pandoc.Blocks({})
    -- HTML: the last display equation and the figures after it, until other content
    local eq_at, group, contexts = nil, {}, {}
    local function flush()
      if eq_at and #group > 0 then
        local eq = out[eq_at]
        out:remove(eq_at)
        for _, blk in ipairs(tab_panel(eq, group, contexts)) do out:insert(blk) end
      end
      eq_at, group, contexts = nil, {}, {}
    end
    for _, b in ipairs(blocks) do
      local fig, selected, context
      if b.t == "Para" then fig, selected, context = visualize(b, seen) end
      if html and fig and eq_at then
        group[#group + 1] = fig; contexts[#contexts + 1] = context
      else
        if html then flush() end
        if html and b.t == "Para" and not fig and is_display_eq(b) then
          out:insert(b); eq_at = #out
          for _, el in ipairs(b.content) do
            local label = el.t == "Str" and el.text:match("^{#([%w:_.-]+)}$") or (el.t == "Span" and el.identifier ~= "" and el.identifier) or nil
            if label then note(label); section_of[label] = current_section end
          end
        elseif b.t == "Header" then
          note(b.identifier)
          current_section = { id = b.identifier, title = b.content }
          section_of[b.identifier] = current_section
          out:insert(b)
        elseif b.t == "Div" then note(b.identifier); b.content = walk(b.content); out:insert(b)
        elseif b.t == "Para" then
        if fig and shown(selected) then out:insert(fig)
        elseif fig then
          local kept = hidden(fig)
          if kept then out:insert(kept) end
        else
          for _, el in ipairs(b.content) do
            if el.t == "Str" then note(el.text:match("^{#([%w:_.-]+)}$")) end
          end
          out:insert(b)
        end
        elseif b.t == "BlockQuote" then b.content = walk(b.content); out:insert(b)
        else out:insert(b) end
      end
    end
    if html then flush() end
    return out
  end
  doc.blocks = walk(doc.blocks)
  if html and tab_count > 0 then
    local hi = m["header-includes"]
    local style = pandoc.MetaBlocks({ pandoc.RawBlock("html", TAB_CSS) })
    if hi == nil then m["header-includes"] = pandoc.MetaList({ style })
    elseif pandoc.utils.type(hi) == "List" then hi:insert(style)
    else m["header-includes"] = pandoc.MetaList({ hi, style }) end
  end
  doc.meta = m
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
