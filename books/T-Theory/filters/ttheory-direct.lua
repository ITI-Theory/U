
local function single_text(block)
  if block.t ~= "Para" then return nil end
  return pandoc.utils.stringify(block)
end

function Para(block)
  local text = single_text(block)
  if not text then return block end
  local macro, pdf, placement = text:match("^{{(AddBooklet)%s+%.%./bld/([^%s}]+)%s*(%S*)}}$")
  if not macro then
    macro, pdf, placement = text:match("^{{(AddPDF)%s+%.%./bld/([^%s}]+)%s*(%S*)}}$")
  end
  if macro then
    local rewritten = string.format("{{%s ../../../bld/books/%s%s}}", macro, pdf, placement ~= "" and (" " .. placement) or "")
    return pandoc.Para({ pandoc.Str(rewritten) })
  end
  return block
end
