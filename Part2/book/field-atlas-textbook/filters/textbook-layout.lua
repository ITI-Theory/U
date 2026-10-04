-- textbook-layout.lua: page design for the course book (LaTeX only;
-- the HTML edition keeps a single readable column).
--   * A chapter (level-1 heading) opens with its title and an optional
--     full-width banner image marked {.opener}; everything else runs in
--     three columns (\colsbegin / \colsend from the template header).
--   * Anything that cannot sit inside multicols breaks out to full width:
--     tables, divs containing tables, and images marked {.wide}.
-- Runs before textbook-boxes.lua, while boxes are still divs.

if not FORMAT:match("latex") then return {} end

local function raw(text) return pandoc.RawBlock("latex", text) end

local function has_table(block)
  local found = false
  pandoc.walk_block(pandoc.Div({ block }), { Table = function() found = true end })
  return found
end

local function is_wide(block)
  if block.t == "Table" then return true end
  if block.t == "Div" and (has_table(block) or block.classes:includes("level-registry-table")) then return true end
  if block.t == "Figure" or block.t == "Para" or block.t == "Plain" then
    local wide = false
    pandoc.walk_block(pandoc.Div({ block }), {
      Image = function(img) if img.classes:includes("wide") then wide = true end end,
    })
    return wide
  end
  return false
end

local function is_opener(block)
  local found = false
  if block.t == "Figure" or block.t == "Para" then
    pandoc.walk_block(pandoc.Div({ block }), {
      Image = function(img) if img.classes:includes("opener") then found = true end end,
    })
  end
  return found
end

-- A4 single column: a figure sized as a fraction of the column would fill
-- most of the page, so in-flow figures are capped in height (aspect kept).
local function cap_height(block)
  return pandoc.walk_block(block, {
    Image = function(img)
      if not img.classes:includes("opener") and not img.attributes.height then
        img.attributes.height = "32%"
        return img
      end
    end,
  })
end

function Pandoc(doc)
  local out = pandoc.Blocks({})
  local open = false
  local function close() if open then out:insert(raw("\\colsend")); open = false end end
  local function begin() if not open then out:insert(raw("\\colsbegin")); open = true end end

  for _, block in ipairs(doc.blocks) do
    if (block.t == "Header" and block.level == 1) or is_opener(block) or is_wide(block) then
      close()
      if block.t == "Table" then
        -- keep a short full-width table on one page with its header row
        local rows = 0
        for _, body in ipairs(block.bodies) do rows = rows + #body.body end
        out:insert(raw(string.format("\\needspace{%d\\baselineskip}", rows + 4)))
      end
      out:insert(block)
    else
      begin()
      out:insert(cap_height(block))
    end
  end
  close()
  doc.blocks = out
  return doc
end