
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

-- {{Visualize}} macros are protected exactly as the book reader does.
local visualize_reader = dofile(path.join({ project_dir, "..", "..", "lib", "format", "visualize-reader.lua" }))

local function read_markdown_file(file)
  local source = project_file(file)
  local text = visualize_reader.protect(read_text(source))
  local doc = pandoc.read(text, "markdown", PANDOC_READER_OPTIONS)
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
  -- The two-level master TOC (paper/OMNIBUS_DOCUMENT_MODEL.md, decision 1): the paper is one
  -- chapter-level entry, its title; its own headings move one level down, so its sections
  -- appear in the book's local TOC, not among the master TOC's chapters (UAT rc3.2 TS-1).
  local first = paper[1]
  if first and first.t == "Header" and first.level == 1 and pandoc.utils.stringify(first) == title then
    paper:remove(1)
    blocks:insert(first)
  else
    blocks:insert(pandoc.Header(1, title))
  end
  blocks:extend(pandoc.walk_block(pandoc.Div(paper), {
    Header = function(h) h.level = math.min(h.level + 1, 6); return h end,
  }).content)
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
      -- the insert's first page is a TOC entry, so the cheatsheet can be found from the
      -- contents (UAT rc3.2 TS-3)
      local toc = page == 1 and (",addtotoc={1,section,1,Cheatsheet,cheatsheet-" .. booklet_id .. "}") or ""
      lines[#lines + 1] = "\\includepdf[pages=1" .. toc .. "]{" .. pdf_abs("booklet-" .. booklet_id .. "-" .. page .. ".pdf") .. "}"
    end
    return pandoc.List:new({ pandoc.RawBlock("latex", table.concat(lines, "\n")) })
  end
  return pandoc.List:new({ pandoc.Para({ pandoc.Link("Domain cheatsheet", pdf_abs("booklet-" .. booklet_id .. ".pdf")) }) })
end

-- The level ladder from the registry (registry/levels/*.yaml): id, label, length exponent.
local ladder_cache
local function ladder()
  if ladder_cache then return ladder_cache end
  ladder_cache = {}
  local dir = project_file("../../registry/levels")
  local ok, files = pcall(system.list_directory, dir)
  if not ok then return ladder_cache end
  for _, f in ipairs(files) do
    if f:match("%.yaml$") then
      local text = read_text(path.join({ dir, f }))
      local id = text:match("^id: ([%w%-]+)") or text:match("\nid: ([%w%-]+)")
      local label = text:match("\nlabel: '?([^\n']+)")
      local e = tonumber((text:match("\nlength_scale: '?10%^{?(%-?[%d%.]+)") or ""))
      if id and e then ladder_cache[#ladder_cache + 1] = { id = id, label = label or id, e = e } end
    end
  end
  table.sort(ladder_cache, function(a, b) return a.e < b.e end)
  return ladder_cache
end

local function fmt_e(e)
  return (e == math.floor(e)) and string.format("%d", e) or string.format("%.1f", e)
end

-- "61 decades of magnitude": the ladder as tick marks, the book's own levels tall (ISS-083).
local function zoom_strip(domain)
  local all = ladder()
  if #all < 2 then return nil, nil end
  local lo, hi = all[1].e, all[#all].e
  local mine = {}
  for _, id in ipairs(meta_list_values(domain.levels)) do mine[id] = true end
  local chosen, elo, ehi = {}, nil, nil
  for _, l in ipairs(all) do
    if mine[l.id] then
      chosen[#chosen + 1] = l.label
      elo = elo and math.min(elo, l.e) or l.e
      ehi = ehi and math.max(ehi, l.e) or l.e
    end
  end
  local whole = #chosen == 0
  local headline = string.format("%s decades of magnitude", fmt_e(hi - lo))
  local note = whole and string.format("This book reads the whole ladder, from 10^%s m to 10^%s m.", fmt_e(lo), fmt_e(hi))
    or string.format("This book zooms in on %s (10^%s m to 10^%s m).", table.concat(chosen, ", "), fmt_e(elo), fmt_e(ehi))
  if not FORMAT:match("latex") then return headline, note end
  local W = 150
  local x = function(e) return string.format("%.2f", (e - lo) / (hi - lo) * W) end
  local parts = { "\\setlength{\\unitlength}{1mm}\\begin{picture}(150,16)",
    "\\linethickness{0.3pt}\\put(0,6){\\line(1,0){150}}" }
  for _, l in ipairs(all) do
    if whole or mine[l.id] then
      parts[#parts + 1] = "\\linethickness{1.2pt}\\put(" .. x(l.e) .. ",3){\\line(0,1){7}}"
    else
      parts[#parts + 1] = "\\linethickness{0.4pt}\\put(" .. x(l.e) .. ",5){\\line(0,1){2}}"
    end
  end
  parts[#parts + 1] = string.format("\\put(0,0){\\makebox(0,0)[l]{\\scriptsize $10^{%s}$\\,m}}", fmt_e(lo))
  parts[#parts + 1] = string.format("\\put(150,0){\\makebox(0,0)[r]{\\scriptsize $10^{%s}$\\,m}}", fmt_e(hi))
  parts[#parts + 1] = string.format("\\put(75,14){\\makebox(0,0){\\sffamily\\bfseries %s}}", latex_text(headline))
  parts[#parts + 1] = "\\end{picture}\\par"
  local latex_note = whole
    and string.format("This book reads the whole ladder, from $10^{%s}$\\,m to $10^{%s}$\\,m.", fmt_e(lo), fmt_e(hi))
    or string.format("This book zooms in on %s ($10^{%s}$\\,m to $10^{%s}$\\,m).", latex_text(table.concat(chosen, ", ")), fmt_e(elo), fmt_e(ehi))
  return table.concat(parts, "\n"), latex_note
end

local function book_opening(domain)
  local title = meta_text(domain.title)
  local subtitle = meta_text(domain.subtitle)
  local id = meta_text(domain.id)
  local green_id = meta_text(domain.green_id)
  local audience = meta_text(domain.audience)
  local blocks = pandoc.List:new()
  local strip, note = zoom_strip(domain)
  if FORMAT:match("latex") then
    local prefix = meta_text(domain.recto_open) == "true" and "\\cleardoublepage\n" or ""
    blocks:insert(pandoc.RawBlock("latex", prefix .. string.format([[\part{%s}
\markboth{%s}{%s}
\begin{center}
{\large\itshape %s\par}
\vspace{10mm}
{\sffamily\bfseries G-ID: %s\par}
\vspace{4mm}
{\sffamily Reader: %s\par}
\vspace{14mm}
%s
\vspace{4mm}
{\small\itshape %s\par}
\end{center}
\clearpage]], latex_text(title), latex_text(title), latex_text(title), latex_text(subtitle), latex_text(green_id), latex_text(audience), strip or "", note or "")))
  else
    blocks:insert(pandoc.Header(1, title))
    if subtitle ~= "" then blocks:insert(pandoc.Para({ pandoc.Emph({ pandoc.Str(subtitle) }) })) end
    if strip then blocks:insert(pandoc.Para({ pandoc.Strong({ pandoc.Str(strip) }), pandoc.Str(". "), pandoc.Str(note) })) end
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

-- Unique section ids across an assembled volume (ISS-001): books share headings such as
-- "Introduction" and "Conclusion", whose automatic ids then repeat. An id already used by an
-- earlier book (or earlier in the same book) gets the book's slug as a prefix, and the book's
-- own links to it ("#conclusion") follow, so no link is ambiguous.
local function unique_ids(blocks, slug, used)
  local renamed = {}
  local function fresh(id)
    if id == "" then return id end
    if not used[id] then used[id] = true; return id end
    local base = slug .. "-" .. id
    local new, n = base, 2
    while used[new] do new = base .. "-" .. n; n = n + 1 end
    used[new] = true
    if renamed[id] == nil then renamed[id] = new end
    return new
  end
  local defs = {
    Header = function(el) el.identifier = fresh(el.identifier); return el end,
    Div = function(el) el.identifier = fresh(el.identifier); return el end,
    Span = function(el) el.identifier = fresh(el.identifier); return el end,
  }
  local out = pandoc.walk_block(pandoc.Div(blocks), defs).content
  local links = {
    Link = function(el)
      local target = el.target:match("^#(.+)$")
      if target and renamed[target] then el.target = "#" .. renamed[target] end
      return el
    end,
  }
  return pandoc.walk_block(pandoc.Div(out), links).content
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
  local used = {}
  blocks = pandoc.List:new(unique_ids(blocks, "volume", used))
  for _, domain_id in ipairs(meta_list_values(volume.domains)) do
    local domain = domain_by_id(domain_id)
    local part = pandoc.List:new()
    part:extend(book_opening(domain))
    part:extend(transform_source_book(domain))
    part:extend(book_closing(domain))
    blocks:extend(unique_ids(part, domain_id, used))
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
    blocks:extend(unique_ids(strip_references(closing.blocks), "phenomena", used))
  end
  if FORMAT:match("latex") then
    blocks:insert(pandoc.RawBlock("latex", [[\clearpage
\null\thispagestyle{empty}\clearpage]]))
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
