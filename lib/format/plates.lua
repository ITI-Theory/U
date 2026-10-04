-- plates.lua: figures and full-page plates for the A3 Atlas (docs/BUILD.md).
-- Captions stay pandoc inlines and are written by pandoc's own writers, so
-- escaping, sub/superscripts and maths work in every output format.
-- LaTeX: figures are non-floating (they sit inside multicols), captioned with
-- \captionof* (captions carry their own "Figure T4.2" numbers); `.full-page` images become dark full-bleed pages. HTML: a
-- normal <figure> with a class.

local function has_class(el, class)
  return el.classes ~= nil and el.classes:includes(class)
end

local function only_image(block)
  if (block.t ~= "Para" and block.t ~= "Plain") or #block.content ~= 1 then return nil end
  if block.content[1].t == "Image" then return block.content[1] end
  return nil
end

local function first_image(blocks)
  for _, block in ipairs(blocks or {}) do
    local img = only_image(block)
    if img then return img end
  end
  return nil
end

local function width_for(img, default)
  local w = img.attributes and img.attributes.width
  local pct = w and tonumber(w:match("^(%d+)%%$"))
  if pct then return string.format("%.2f\\columnwidth", pct / 100) end
  return default
end

-- Raw LaTeX before and after, pandoc-written caption in between.
local function wrap(before, inlines, after)
  local content = pandoc.Inlines({ pandoc.RawInline("latex", before) })
  content:extend(inlines)
  content:insert(pandoc.RawInline("latex", after))
  return pandoc.Plain(content)
end

local function latex_figure(img, caption, ident)
  if has_class(img, "full-page") then
    return {
      pandoc.RawBlock("latex", "\\clearpage\\thispagestyle{empty}\n"
        .. "\\AddToShipoutPictureBG*{\\AtPageLowerLeft{\\color[RGB]{5,7,14}\\rule{\\paperwidth}{\\paperheight}}}\n"
        .. "\\AddToShipoutPictureBG*{\\AtPageUpperLeft{\\raisebox{-\\height}{\\includegraphics[width=\\paperwidth]{" .. img.src .. "}}}}"),
      wrap("\\AddToShipoutPictureBG*{\\AtPageLowerLeft{\\hspace*{14mm}\\raisebox{13mm}{\\color[RGB]{120,220,240}\\ttfamily\\large ",
        caption, "}}}"),
      pandoc.RawBlock("latex", "\\mbox{}\\clearpage"),
    }
  end
  local options
  if has_class(img, "opener") then
    -- chapter banner: full width, at most a third of the page tall
    options = "width=\\textwidth,height=0.33\\textheight,keepaspectratio"
  elseif has_class(img, "plate") or has_class(img, "wide") then
    options = "width=" .. width_for(img, "\\textwidth"):gsub("columnwidth", "textwidth")
  else
    options = "width=" .. width_for(img, "\\columnwidth")
  end
  -- optional height cap as a percentage of the text height (aspect kept)
  local hpct = img.attributes and img.attributes.height and tonumber(img.attributes.height:match("^(%d+)%%$"))
  if hpct and not has_class(img, "opener") then
    options = options .. string.format(",height=%.2f\\textheight,keepaspectratio", hpct / 100)
  end
  local blocks = {
    pandoc.RawBlock("latex", "\\begin{center}\n\\includegraphics[" .. options .. "]{" .. img.src .. "}"),
  }
  if ident and ident ~= "" then
    -- labelled (pandoc-crossref @fig:...): numbered caption and a \label
    table.insert(blocks, wrap("\\captionof{figure}{", caption, "}\\label{" .. ident .. "}"))
  elseif #caption > 0 then
    table.insert(blocks, wrap("\\captionof*{figure}{", caption, "}"))
  end
  table.insert(blocks, pandoc.RawBlock("latex", "\\end{center}"))
  return blocks
end

local function html_figure(img, caption, ident)
  local classes = { has_class(img, "plate") and "plate-figure" or "atlas-figure" }
  if has_class(img, "full-page") then table.insert(classes, 1, "full-page-plate") end
  local image = pandoc.Image(caption, img.src, img.title, img.attr)
  return pandoc.Figure({ pandoc.Plain({ image }) }, { long = { pandoc.Plain(caption) } },
    pandoc.Attr(ident or "", classes, {}))
end

local function render(img, caption, ident)
  if FORMAT:match("latex") then return latex_figure(img, caption, ident) end
  if FORMAT:match("html") then return html_figure(img, caption, ident) end
  return nil
end

local function image_para(block)
  local img = only_image(block)
  if not img then return nil end
  return render(img, img.caption or pandoc.Inlines({}))
end

local function figure(fig)
  local img = first_image(fig.content)
  if not img then return nil end
  local caption = pandoc.utils.blocks_to_inlines(fig.caption.long or {})
  if #caption == 0 then caption = img.caption or pandoc.Inlines({}) end
  return render(img, caption, fig.identifier)
end

-- Two passes: Figures first (so their inner image paragraph is still intact),
-- then standalone image paragraphs.
return {
  { Figure = figure },
  { Para = image_para, Plain = image_para },
}