local box_classes = {
  ["learning-objectives"] = {"Learning Objectives", "textbookteal"},
  ["example"] = {"Example", "textbookgold"},
  ["check-your-learning"] = {"Check Your Learning", "textbookgreen"},
  ["link-to-learning"] = {"Link to Learning", "textbookpurple"},
  ["making-connections"] = {"Making Connections", "textbookblue"},
  ["soma-machine"] = {"In the Soma Machine", "textbookpurple"},
  ["key-terms"] = {"Key Terms", "textbookblue"},
  ["key-equations"] = {"Key Equations", "textbookteal"},
  ["summary"] = {"Summary", "textbookgreen"},
  ["review-questions"] = {"Review Questions", "textbookgold"},
  ["problems"] = {"Problems", "textbookpurple"},
  ["answer-key"] = {"Answer Key", "textbookblue"},
  ["figure-credits"] = {"Figure Credits", "textbookblue"},
}

local function has_class(el, class)
  for _, c in ipairs(el.classes or {}) do if c == class then return true end end
  return false
end

local function stringify_title(div, fallback)
  if div.attributes and div.attributes.title and div.attributes.title ~= "" then return div.attributes.title end
  return fallback
end

local function latex_escape(text)
  text = tostring(text or "")
  text = text:gsub("\\", "\\textbackslash{}")
  text = text:gsub("&", "\\&"):gsub("%%", "\\%%"):gsub("#", "\\#")
  text = text:gsub("_", "\\_"):gsub("{", "\\{"):gsub("}", "\\}")
  return text
end

local function html_escape(text)
  text = tostring(text or "")
  text = text:gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;")
  return text
end

function Div(div)
  for class, spec in pairs(box_classes) do
    if has_class(div, class) then
      local title = stringify_title(div, spec[1])
      if FORMAT:match("latex") then
        local out = {pandoc.RawBlock("latex", "\\begin{textbookbox}[" .. latex_escape(title) .. "]{" .. spec[2] .. "}")}
        for _, block in ipairs(div.content) do out[#out+1] = block end
        out[#out+1] = pandoc.RawBlock("latex", "\\end{textbookbox}")
        return out
      elseif FORMAT:match("html") then
        local out = {pandoc.RawBlock("html", "<div class=\"textbook-box " .. class .. "\"><span class=\"box-title\">" .. html_escape(title) .. "</span>")}
        for _, block in ipairs(div.content) do out[#out+1] = block end
        out[#out+1] = pandoc.RawBlock("html", "</div>")
        return out
      end
      return div
    end
  end
  return nil
end