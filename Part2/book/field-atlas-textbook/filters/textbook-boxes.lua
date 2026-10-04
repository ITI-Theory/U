-- textbook-boxes.lua: coloured boxes in the style of open science textbooks
-- (docs/BUILD.md). A box is a fenced div, e.g. ::: {.example title="..."}.
-- Titles are parsed as Markdown and written by pandoc (no hand escaping).
-- LaTeX: a tcolorbox defined in templates/textbook-a4-header.tex.
-- HTML: a div.textbook-box with a span.box-title (styled in textbook.css).

local BOXES = {
  ["learning-objectives"] = { "Learning Objectives", "textbookteal",
    lead = "By the end of this section, you will be able to:" },
  ["example"] = { "Example", "textbookgold" },
  ["check-your-learning"] = { "Check Your Learning", "textbookgreen" },
  ["link-to-learning"] = { "Link to Learning", "textbookpurple" },
  ["making-connections"] = { "Making Connections", "textbookblue" },
  ["soma-machine"] = { "In the Soma Machine", "textbookpurple" },
  ["going-further"] = { "Going Further", "textbookslate" },
  ["maths-you-need"] = { "Maths You Need", "textbookteal" },
  ["key-terms"] = { "Key Terms", "textbookblue" },
  ["key-equations"] = { "Key Equations", "textbookteal" },
  ["summary"] = { "Summary", "textbookgreen" },
  ["review-questions"] = { "Review Questions", "textbookgold" },
  ["problems"] = { "Problems", "textbookpurple" },
  ["answer-key"] = { "Answer Key", "textbookblue" },
  ["figure-credits"] = { "Figure Credits", "textbookblue" },
}

local LEVELS = {
  "quantum-foam", "string-boundary", "nuclear", "atomic", "molecular",
  "cellular-synaptic", "local-circuit", "whole-brain-cemi", "human-vertebrate",
  "dyad", "human-group", "animal-swarm", "bird", "flock", "colony-roost",
  "society-city", "regional-institutional", "civilisational-solar",
  "species-stellar", "geological", "planetary", "orbital-system", "stellar",
  "compact-object", "stellar-cluster", "galactic-disc", "galactic-halo",
  "galaxy-cluster", "cosmic-filaments", "observable-universe", "cosmic-web",
}

local function markdown_inlines(text)
  local doc = pandoc.read(text, "markdown")
  return pandoc.utils.blocks_to_inlines(doc.blocks)
end

-- YAML via pandoc's own reader: wrap the file as a metadata block.
local function read_yaml(path)
  local f = io.open(path, "rb")
  if not f then return {} end
  local text = f:read("a")
  f:close()
  return pandoc.read("---\n" .. text .. "\n---\n", "markdown").meta
end

local function cell(value)
  if value == nil then return pandoc.Cell({}) end
  local inlines = pandoc.utils.type(value) == "Inlines" and value
    or markdown_inlines(pandoc.utils.stringify(value))
  return pandoc.Cell({ pandoc.Plain(inlines) })
end

local function level_table()
  local header = pandoc.Row({ cell("No."), cell("Level"), cell("Registry id"),
    cell("Size"), cell("Response time"), cell("Field") })
  local rows = {}
  for i, id in ipairs(LEVELS) do
    local m = read_yaml("../../../registry/levels/" .. id .. ".yaml")
    rows[#rows + 1] = pandoc.Row({ cell(tostring(i)), cell(m.label), cell("`" .. id .. "`"),
      cell(m.length_scale), cell(m.response_time), cell(m.field) })
  end
  local specs = {}
  for _, w in ipairs({ 0.05, 0.17, 0.2, 0.15, 0.13, 0.3 }) do
    specs[#specs + 1] = { pandoc.AlignLeft, w }
  end
  return pandoc.Table(
    { long = { pandoc.Plain(markdown_inlines("The thirty-one registry levels (from `registry/levels/`).")) } },
    specs, pandoc.TableHead({ header }), { pandoc.TableBody(rows) }, pandoc.TableFoot())
end

local function box(div, class, spec)
  local title = markdown_inlines(div.attributes.title or spec[1])
  local content = pandoc.Blocks({})
  if spec.lead then content:insert(pandoc.Para(markdown_inlines(spec.lead))) end
  content:extend(div.content)
  if FORMAT:match("latex") then
    local open = pandoc.Inlines({ pandoc.RawInline("latex", "\\begin{textbookbox}[") })
    open:extend(title)
    open:insert(pandoc.RawInline("latex", "]{" .. spec[2] .. "}"))
    if div.identifier ~= "" then
      open:insert(pandoc.RawInline("latex", "\\phantomsection\\label{" .. div.identifier .. "}"))
    end
    local out = pandoc.Blocks({ pandoc.Plain(open) })
    out:extend(content)
    out:insert(pandoc.RawBlock("latex", "\\end{textbookbox}"))
    return out
  end
  local heading = pandoc.Para({ pandoc.Span(title, pandoc.Attr("", { "box-title" })) })
  content:insert(1, heading)
  return pandoc.Div(content, pandoc.Attr(div.identifier, { "textbook-box", class }))
end

function Div(div)
  if div.classes:includes("level-registry-table") then return level_table() end
  for class, spec in pairs(BOXES) do
    if div.classes:includes(class) then return box(div, class, spec) end
  end
  return nil
end