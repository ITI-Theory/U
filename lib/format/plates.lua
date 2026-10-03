local function has_class(el, class)
  if not el.classes then return false end
  for _, c in ipairs(el.classes) do
    if c == class then return true end
  end
  return false
end

local function latex_escape(text)
  text = text:gsub("\\", "\\textbackslash{}")
  text = text:gsub("&", "\\&"):gsub("%%", "\\%%"):gsub("#", "\\#")
  text = text:gsub("_", "\\_"):gsub("{", "\\{"):gsub("}", "\\}")
  return text
end

local function only_image(block)
  if (block.t ~= "Para" and block.t ~= "Plain") or #block.content ~= 1 then return nil end
  if block.content[1].t == "Image" then return block.content[1] end
  return nil
end

local function width_for(img)
  if img.attributes and img.attributes.width then
    local w = img.attributes.width
    if w == "100%" then return "\\textwidth" end
    if w == "90%" then return "0.9\\textwidth" end
    if w == "80%" then return "0.8\\textwidth" end
    if w == "45%" then return "0.45\\textwidth" end
  end
  return "0.95\\textwidth"
end

function Para(block)
  local img = only_image(block)
  if not img then return nil end
  local src = img.src
  local caption = pandoc.utils.stringify(img.caption or {})
  local class = has_class(img, "plate") and "plate-figure" or "atlas-figure"
  if has_class(img, "full-page") then
    if FORMAT:match("latex") then
      local cap = latex_escape(caption)
      return pandoc.RawBlock("latex", "\\clearpage\\thispagestyle{empty}\n\\AddToShipoutPictureBG*{\\AtPageLowerLeft{\\color[RGB]{5,7,14}\\rule{\\paperwidth}{\\paperheight}}}\n\\AddToShipoutPictureBG*{\\AtPageUpperLeft{\\raisebox{-\\height}{\\includegraphics[width=\\paperwidth]{" .. src .. "}}}}\n\\AddToShipoutPictureBG*{\\AtPageLowerLeft{\\hspace*{14mm}\\raisebox{13mm}{\\color[RGB]{120,220,240}\\ttfamily\\large " .. cap .. "}}}\n\\mbox{}\\clearpage")
    elseif FORMAT:match("html") then
      return pandoc.RawBlock("html", "<figure class=\"full-page-plate " .. class .. "\"><img src=\"" .. src .. "\" alt=\"" .. caption:gsub('"', '&quot;') .. "\"><figcaption>" .. caption .. "</figcaption></figure>")
    end
  end
  if FORMAT:match("latex") then
    local cap = latex_escape(caption)
    return pandoc.RawBlock("latex", "\\begin{center}\n\\includegraphics[width=" .. width_for(img) .. "]{" .. src .. "}\n" .. (caption ~= "" and "\\captionof{figure}{" .. cap .. "}\n" or "") .. "\\end{center}")
  elseif FORMAT:match("html") then
    return pandoc.RawBlock("html", "<figure class=\"" .. class .. "\"><img src=\"" .. src .. "\" alt=\"" .. caption:gsub('"', '&quot;') .. "\"><figcaption>" .. caption .. "</figcaption></figure>")
  end
  return nil
end

Plain = Para
