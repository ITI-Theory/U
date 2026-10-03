local function has_class(el, class)
  if not el.classes then return false end
  for _, c in ipairs(el.classes) do
    if c == class then return true end
  end
  return false
end

function Div(div)
  if not has_class(div, "columns") then
    return nil
  end
  if FORMAT:match("latex") then
    local out = {pandoc.RawBlock("latex", "\\colsbegin")}
    for _, block in ipairs(div.content) do
      out[#out + 1] = block
    end
    out[#out + 1] = pandoc.RawBlock("latex", "\\colsend")
    return out
  end
  if FORMAT:match("html") then
    div.classes:insert("field-atlas-columns")
    return div
  end
  return div.content
end
