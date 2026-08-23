local function is_html()
  return FORMAT:match("html")
end

function Header(element)
  if element.level == 1 and is_html() then
    element.classes:insert("gateway-section")
  end
  return element
end