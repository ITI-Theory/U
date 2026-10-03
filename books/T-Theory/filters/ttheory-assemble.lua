
local path = require "pandoc.path"
local system = require "pandoc.system"

local project_dir = system.get_working_directory()
local manifest
local seen = {}

local function meta_text(value)
  if value == nil then return "" end
  return pandoc.utils.stringify(value)
end

local function latex_text(value)
  return tostring(value)
    :gsub("\\", "\\textbackslash{}")
    :gsub("([%%#$&_{}])", "\\%1")
    :gsub("%^^", "\\textasciicircum{}")
    :gsub("~", "\\textasciitilde{}")
end

local function project_file(file)
  if path.is_relative(file) then
    return path.normalize(path.join({ project_dir, file }))
  end
  return path.normalize(file)
end

local function read_text(file)
  local handle, message = io.open(file, "r")
  if not handle then error("Cannot read " .. file .. ": " .. tostring(message)) end
  local text = handle:read("*a")
  handle:close()
  return text:gsub("\r\n", "\n")
end

local function load_manifest(doc)
  if manifest then return manifest end
  local manifest_path = meta_text(doc.meta["fractal-manifest"])
  if manifest_path == "" then manifest_path = "defaults/fractal-manifest.yaml" end
  local yaml = read_text(project_file(manifest_path))
  local parsed = pandoc.read("---\n" .. yaml .. "\n---", "markdown", PANDOC_READER_OPTIONS)
  manifest = parsed.meta.fractal_manifest
  if not manifest then error("Missing fractal_manifest in " .. manifest_path) end
  return manifest
end

local function meta_list_values(list)
  local values = {}
  if not list then return values end
  for _, item in ipairs(list) do values[#values + 1] = meta_text(item) end
  return values
end

local function domain_by_id(id)
  for _, domain in ipairs(manifest.domains) do
    if meta_text(domain.id) == id then return domain end
  end
  error("Unknown domain " .. id)
end

local function volume_by_id(id)
  local volume = manifest.volumes[id]
  if not volume then error("Unknown volume " .. id) end
  return volume
end

local function pdf_abs(name)
  return path.normalize(path.join({ project_dir, "..", "..", "bld", "books", name })):gsub("\\", "/")
end

local function pagebreak()
  if FORMAT:match("latex") then return pandoc.RawBlock("latex", "\\clearpage") end
  if FORMAT:match("html") then return pandoc.RawBlock("html", '<div class="page-break"></div>') end
  return pandoc.Div({}, pandoc.Attr("", { "page-break" }))
end

local function plain_emph(text)
  return pandoc.Para({ pandoc.Emph({ pandoc.Str(text) }) })
end

local function rewrite_relative_assets(blocks, base_dir)
  local filter = {
    Image = function(image)
      if path.is_relative(image.src) then
        local source = path.normalize(path.join({ base_dir, image.src }))
        local handle = io.open(source, "r")
        if handle then
          handle:close()
        elseif image.src:match("^figures/") then
          source = path.normalize(path.join({ base_dir, "..", "..", image.src }))
        end
        image.src = source:gsub("\\", "/")
      end
      return image
    end,
    CodeBlock = function(code)
      if code.attributes.include and path.is_relative(code.attributes.include) then
        code.attributes.include = path.normalize(path.join({ base_dir, code.attributes.include }))
      end
      return code
    end,
  }
  return pandoc.walk_block(pandoc.Div(blocks), filter).content
end

local function read_markdown_file(file)
  local source = project_file(file)
  local text = read_text(source)
  local doc = system.with_working_directory(path.directory(source), function()
    return pandoc.read(text, "markdown", PANDOC_READER_OPTIONS)
  end)
  doc.blocks = rewrite_relative_assets(doc.blocks, path.directory(source))
  return doc, source
end

local function paper_title(doc, file)
  local title = meta_text(doc.meta.title)
  if title ~= "" then return title end
  return path.filename(file):gsub("%.md$", "")
end

local function strip_references(blocks)
  local out = pandoc.List:new()
  for _, block in ipairs(blocks) do
    if block.t == "Header" and block.level <= 3 and pandoc.utils.stringify(block) == "References" then
      break
    end
    out:insert(block)
  end
  return out
end

local function paper_path(ref)
  local kind, name = ref:match("^([^:]+):(.+)$")
  if kind == "f" then return name .. "/" .. name .. ".md" end
  if kind == "c" then return "../../paper/soma/" .. name .. "/" .. name .. ".md" end
  return ref
end

local function paper_blocks(file, book_title, dedupe)
  local source = project_file(file)
  local key = source:lower()
  local stem = path.filename(source):gsub("%.md$", "")
  local doc = read_markdown_file(file)
  local title = paper_title(doc, source)
  local blocks = pandoc.List:new({ pagebreak() })

  if dedupe and stem == "lean-proofs-appendix" then
    blocks:insert(pandoc.Header(1, title, pandoc.Attr("", { "unnumbered" })))
    blocks:insert(plain_emph("The Lean 4 proof appendix is published separately as dataset D2 and is not reprinted in this volume."))
    return blocks
  end

  if dedupe and seen[key] then
    blocks:insert(pandoc.Header(1, title, pandoc.Attr("", { "unnumbered" })))
    blocks:insert(plain_emph("This paper is printed in full in " .. seen[key] .. ". It is read here through the lens of this book; see the surrounding chapters."))
    return blocks
  end

  if dedupe then seen[key] = "*" .. book_title .. "*" end
  local paper = strip_references(doc.blocks)
  local first = paper[1]
  if not (first and first.t == "Header" and first.level == 1) then
    blocks:insert(pandoc.Header(1, title))
  end
  blocks:extend(paper)
  return blocks
end

local function toc_only()
  if FORMAT:match("latex") then
    return pandoc.List:new({ pandoc.RawBlock("latex", "\\setcounter{tocdepth}{1}\n\\tableofcontents\n\\clearpage") })
  end
  return pandoc.List:new({ pandoc.Header(1, "Contents", pandoc.Attr("contents", { "unnumbered" })) })
end

local function local_book_toc()
  if FORMAT:match("latex") then
    return pandoc.List:new({ pandoc.RawBlock("latex", "\\clearpage\n\\begingroup\n\\setcounter{tocdepth}{2}\n\\etocsettocstyle{\\section*{Book Contents}}{}\n\\localtableofcontents\n\\endgroup\n\\clearpage") })
  end
  return pandoc.List:new({ pandoc.Header(2, "Book Contents", pandoc.Attr("book-contents", { "unnumbered" })) })
end

local function noir_block()
  if FORMAT:match("latex") then
    return pandoc.List:new({ pandoc.RawBlock("latex", "\\clearpage\n\\null\\thispagestyle{empty}\\clearpage\n\\includepdf{" .. pdf_abs("noir-page.pdf") .. "}\n\\null\\thispagestyle{empty}\\clearpage") })
  end
  return pandoc.List:new({ pandoc.Div({ pandoc.Para({ pandoc.Link("Noir gateway page", pdf_abs("noir-page.pdf")) }) }, pandoc.Attr("", { "noir-page" })) })
end

local function booklet_pages(domain)
  local booklet_id = meta_text(domain.booklet_id)
  if booklet_id == "" then booklet_id = meta_text(domain.id) end
  if FORMAT:match("latex") then
    local lines = {}
    for page = 1, 4 do
      lines[#lines + 1] = "\\includepdf[pages=1]{" .. pdf_abs("booklet-" .. booklet_id .. "-" .. page .. ".pdf") .. "}"
    end
    return pandoc.List:new({ pandoc.RawBlock("latex", table.concat(lines, "\n")) })
  end
  return pandoc.List:new({ pandoc.Para({ pandoc.Link("Domain cheatsheet", pdf_abs("booklet-" .. booklet_id .. ".pdf")) }) })
end

local function book_opening(domain)
  local title = meta_text(domain.title)
  local subtitle = meta_text(domain.subtitle)
  local id = meta_text(domain.id)
  local blocks = pandoc.List:new()
  if FORMAT:match("latex") then
    blocks:insert(pandoc.RawBlock("latex", string.format([[\part{%s}
\markboth{%s}{%s}
\begin{center}
{\large\itshape %s\par}
\vspace{10mm}
\end{center}
\clearpage]], latex_text(title), latex_text(title), latex_text(title), latex_text(subtitle))))
  else
    blocks:insert(pandoc.Header(1, title))
    if subtitle ~= "" then blocks:insert(pandoc.Para({ pandoc.Emph({ pandoc.Str(subtitle) }) })) end
  end
  if id == "gateway" then
    blocks:extend(noir_block())
    blocks:extend(local_book_toc())
  else
    blocks:extend(booklet_pages(domain))
    blocks:insert(pagebreak())
    blocks:extend(local_book_toc())
  end
  return blocks
end

local function gateway_cheatsheet_note()
  return pandoc.List:new({ pandoc.Header(2, "A Note on the Cheatsheet"), pandoc.Para({ pandoc.Str("The four-page [T]-Theory Cheatsheet appears at the end of this Gateway. It is the programme's standalone public summary: a pre-reading map for the Fractal Programme, the academic papers, and the wider cultural work. Read it now as a preview, or return to it after this book as a compact record of what the Gateway has opened.") }) })
end

local function book_closing(domain)
  if meta_text(domain.id) ~= "gateway" then return pandoc.List:new() end
  local blocks = pandoc.List:new({ pagebreak(), pandoc.Header(1, "[T]-Theory Cheatsheet") })
  blocks:extend(gateway_cheatsheet_note())
  blocks:extend(booklet_pages(domain))
  blocks:insert(pagebreak())
  return blocks
end

local function transform_source_book(domain)
  local source_book = meta_text(domain.source_book)
  if source_book == "" then source_book = meta_text(domain.id) .. "/book-" .. meta_text(domain.id) .. ".md" end
  local doc = read_markdown_file(source_book)
  local blocks = pandoc.List:new()
  local skipping_cheatsheet = false
  for _, block in ipairs(doc.blocks) do
    local text = block.t == "Para" and pandoc.utils.stringify(block) or ""
    if block.t == "Header" and block.level == 1 and pandoc.utils.stringify(block) == "[T]-Theory Cheatsheet" then
      skipping_cheatsheet = true
    elseif skipping_cheatsheet then
      if text:match("^{{AddBooklet") then skipping_cheatsheet = false end
    elseif block.t == "RawBlock" and block.format == "latex" then
      local part = block.text:match("^\\part{(.-)}%s*$")
      if part then blocks:insert(pandoc.Header(1, "Part: " .. part, pandoc.Attr("", { "unnumbered" })))
      else blocks:insert(block) end
    elseif text:match("^{{AddPaper%s+(.+)}}$") then
      local file = text:match("^{{AddPaper%s+(.+)}}$")
      blocks:extend(paper_blocks(file, meta_text(domain.title), true))
    elseif text == "{{AddPage}}" then
      blocks:insert(pagebreak())
    elseif text:match("^{{AddBooklet") or text:match("^{{AddPDF") then
      -- composite volumes supply booklet/PDF inserts at book boundaries
    else
      blocks:insert(block)
    end
  end
  return blocks
end

local function volume_blocks(target)
  local volume = volume_by_id(target)
  seen = {}
  local blocks = pandoc.List:new()
  blocks:extend(toc_only())
  if target == "omnibus" and meta_text(volume.opening) ~= "" then
    local opening = read_markdown_file(meta_text(volume.opening))
    blocks:extend(opening.blocks)
  end
  for _, domain_id in ipairs(meta_list_values(volume.domains)) do
    local domain = domain_by_id(domain_id)
    blocks:extend(book_opening(domain))
    blocks:extend(transform_source_book(domain))
    blocks:extend(book_closing(domain))
  end
  if meta_text(volume.closing_paper) ~= "" then
    local ref = meta_text(volume.closing_paper)
    if target == "omnibus" and meta_text(volume.closing_part) ~= "" then
      if FORMAT:match("latex") then
        blocks:insert(pandoc.RawBlock("latex", "\\newpage\n\\part{" .. latex_text(meta_text(volume.closing_part)) .. "}\n\\markboth{The [T]-Phenomena}{}"))
      else
        blocks:insert(pandoc.Header(1, meta_text(volume.closing_part)))
      end
      blocks:insert(pandoc.Header(1, meta_text(volume.closing_title)))
    else
      blocks:insert(pagebreak())
      if FORMAT:match("latex") then blocks:insert(pandoc.RawBlock("latex", "\\markboth{The [T]-Phenomena}{}")) end
      blocks:insert(pandoc.Header(1, meta_text(volume.closing_title)))
    end
    local closing = read_markdown_file(paper_path(ref))
    blocks:extend(strip_references(closing.blocks))
  end
  return blocks, volume
end

function Pandoc(doc)
  load_manifest(doc)
  local target = meta_text(doc.meta["fractal-target"])
  if target == "" then return doc end
  local blocks, volume = volume_blocks(target)
  doc.blocks = blocks
  doc.meta.title = pandoc.MetaInlines(pandoc.utils.blocks_to_inlines({ pandoc.Plain({ pandoc.Str(meta_text(volume.title)) }) }))
  doc.meta.subtitle = pandoc.MetaInlines(pandoc.utils.blocks_to_inlines({ pandoc.Plain({ pandoc.Str(meta_text(volume.subtitle)) }) }))
  doc.meta.author = pandoc.MetaInlines({ pandoc.Str("Alistair Johnson") })
  doc.meta.date = pandoc.MetaInlines({ pandoc.Str("2026") })
  doc.meta.lang = pandoc.MetaInlines({ pandoc.Str("en-GB") })
  return doc
end
