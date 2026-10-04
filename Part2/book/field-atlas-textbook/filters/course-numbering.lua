-- course-numbering.lua: numbers chapters and boxes so the sources carry
-- labels, never typed numbers (docs/BUILD.md). Runs before pandoc-crossref,
-- which numbers sections, figures, tables and equations from the chapter
-- labels set here.
--
--   # Atoms {#ch:atoms}                       chapter, label "3" (or "M1" in Part 0)
--   ::: {.example #ex:laser title="..."}      "Example 3.1 — ..."
--   ::: {.problems #pr:lines title="..."}     "Problem 3.1 — ..."
--   ::: {.solution}                           "Solution 3.1" (of the problem before it)
--   ::: {.course-part chapters="M"}           Part 0: chapters M1, M2, ...
--   ::: {.course-part chapters="arabic"}      restart at 1 (Part I)
--
-- References: @ch:x -> "Chapter 3", @ex:x -> "Example 3.1", @pr:x ->
-- "Problem 3.1"; [-@ch:x] gives the bare number. An unknown label fails the build.

local PREFIX = { ch = "Chapter", ex = "Example", pr = "Problem" }

local labels = {}  -- id -> number text, e.g. "3" or "3.1"

local function latex(text)
  if FORMAT:match("latex") then return pandoc.RawBlock("latex", text) end
  return nil
end

local function number_blocks(blocks)
  local scheme, chapter, chapter_label = "", 0, nil
  local example, problem = 0, 0
  local out = pandoc.Blocks({})

  local function boxes(block)
    -- walk_block visits children only, so wrap the block to reach a top-level box
    return pandoc.walk_block(pandoc.Div({ block }), {
      Div = function(div)
        local function need_chapter()
          if not chapter_label then
            error("course-numbering: box before the first chapter: " .. (div.attributes.title or ""))
          end
        end
        if div.classes:includes("solution") then
          need_chapter()
          div.classes = div.classes:filter(function(c) return c ~= "solution" end)
          div.classes:insert("example")
          div.attributes.title = "Solution " .. chapter_label .. "." .. problem
          return div
        elseif div.classes:includes("example") then
          need_chapter()
          example = example + 1
          local n = chapter_label .. "." .. example
          if div.identifier ~= "" then labels[div.identifier] = n end
          div.attributes.title = "Example " .. n .. " — " .. (div.attributes.title or "")
          return div
        elseif div.classes:includes("problems") then
          need_chapter()
          problem = problem + 1
          local n = chapter_label .. "." .. problem
          if div.identifier ~= "" then labels[div.identifier] = n end
          div.attributes.title = "Problem " .. n .. " — " .. (div.attributes.title or "")
          return div
        end
      end,
    }).content[1]
  end

  for _, block in ipairs(blocks) do
    if block.t == "Div" and block.classes:includes("course-part") then
      local mode = block.attributes.chapters
      if mode == "M" or mode == "arabic" then
        scheme = (mode == "M") and "M" or ""
        chapter = 0
        local raw = latex("\\setcounter{chapter}{0}\\renewcommand{\\thechapter}{"
          .. scheme .. "\\arabic{chapter}}")
        if raw then out:insert(raw) end
      end
      out:extend(block.content)
    elseif block.t == "Header" and block.level == 1 and not block.classes:includes("unnumbered") then
      chapter = chapter + 1
      chapter_label = scheme .. chapter
      example, problem = 0, 0
      block.attributes.label = chapter_label
      if block.identifier ~= "" then labels[block.identifier] = chapter_label end
      out:insert(block)
    else
      out:insert(boxes(block))
    end
  end
  return out
end

local function resolve(cite)
  if #cite.citations ~= 1 then return nil end
  local c = cite.citations[1]
  local kind = c.id:match("^(%a+):")
  if not PREFIX[kind] then return nil end
  local n = labels[c.id]
  if not n then error("course-numbering: unknown label @" .. c.id) end
  local text = (c.mode == "SuppressAuthor") and n or (PREFIX[kind] .. "\u{a0}" .. n)
  return pandoc.Link(text, "#" .. c.id)
end

return {
  { Pandoc = function(doc) doc.blocks = number_blocks(doc.blocks); return doc end },
  { Cite = resolve },
}
