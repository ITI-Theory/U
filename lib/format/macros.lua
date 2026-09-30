local replacements = {
  ["{{check}}"] = { latex = "\\checkmark", html = "&#x2705;" },
  ["{{cross}}"] = { latex = "\\times", html = "&#x274C;" },
  ["{{eg}}"] = { latex = "\\emph{e.g.}", html = "<em>e.g.</em>" },
  ["{{ie}}"] = { latex = "\\emph{i.e.}", html = "<em>i.e.</em>" },
}

local path = require "pandoc.path"
local system = require "pandoc.system"
local current_book

local function single_text(block)
  if block.t ~= "Para" then
    return nil
  end
  return pandoc.utils.stringify(block)
end

local function block_markdown(block)
  return pandoc.write(pandoc.Pandoc({ block }), "markdown")
end

local function paper_id(file)
  return path.filename(file):gsub("%.md$", ""):gsub("[^%w]+", "-")
end

local function heading_id(header)
  local identifier = header.identifier
  if identifier == "" then
    identifier = pandoc.utils.stringify(header):lower():gsub("[^%w]+", "-")
  end
  return identifier:gsub("^-", ""):gsub("-$", "")
end

local function format_paper(blocks, file)
  local prefix = paper_id(file) .. "-"

  local filter = {
    Header = function(header)
      header.identifier = prefix .. heading_id(header)
      return header
    end,
    CodeBlock = function(code)
      if code.attributes.include and path.is_relative(code.attributes.include) then
        code.attributes.include = path.normalize(
          path.join({ path.directory(file), code.attributes.include })
        )
      end
      return code
    end,
    Image = function(image)
      if path.is_relative(image.src) then
        local source = path.normalize(path.join({ path.directory(file), image.src }))
        local handle = io.open(source)
        if handle then
          handle:close()
        elseif image.src:match("^figures/") then
          source = path.normalize(
            path.join({ path.directory(file), "..", "..", image.src })
          )
        end
        image.src = source:gsub("\\", "/")
      end
      return image
    end,
  }

  local result = pandoc.List:new()
  for _, block in ipairs(blocks) do
    if block.t == "Header" and block.level <= 2
      and pandoc.utils.stringify(block) == "References" then
      break
    end
    result:insert(block)
  end
  return pandoc.walk_block(pandoc.Div(result), filter).content
end

local function add_paper(file)
  local handle, message = io.open(file)
  if not handle then
    error("Cannot read AddPaper source " .. file .. ": " .. message)
  end

  local content = handle:read("*a")
  handle:close()

  local document = system.with_working_directory(path.directory(file), function()
    return pandoc.read(content, "markdown", PANDOC_READER_OPTIONS)
  end)

  local title = pandoc.utils.stringify(document.meta.title or paper_id(file))
  local blocks = pandoc.List:new({ pandoc.Header(1, title) })
  blocks:extend(format_paper(document.blocks, file))
  return blocks
end

local function add_file(file)
  local input = PANDOC_STATE.input_files[1]
  local source = path.normalize(path.join({ path.directory(input), file }))
  local handle, message = io.open(source)
  if not handle then
    error("Cannot read AddFile source " .. source .. ": " .. message)
  end

  local content = handle:read("*a")
  handle:close()
  return system.with_working_directory(path.directory(source), function()
    return pandoc.read(content, "markdown", PANDOC_READER_OPTIONS).blocks
  end)
end

local function insert_pdf(file, recto)
  if not FORMAT:match("latex") then
    return pandoc.List:new()
  end

  local input = PANDOC_STATE.input_files[1]
  local source = path.normalize(path.join({ path.directory(input), file }))
  if path.is_relative(source) then
    source = path.normalize(path.join({ pandoc.system.get_working_directory(), source }))
  end
  local handle, message = io.open(source)
  if not handle then
    error("Cannot read PDF insert " .. source .. ": " .. message)
  end
  handle:close()

  local before = "\\clearpage\n"
  if recto then
    before = before .. "\\ifodd\\value{page}\\else\\null\\thispagestyle{empty}\\clearpage\\fi\n"
  end
  return pandoc.RawBlock("latex", before
    .. "\\includepdf[pages=-,pagecommand={\\thispagestyle{empty}}]{"
    .. source:gsub("\\", "/") .. "}")
end

local function meta_text(value)
  return pandoc.utils.stringify(value)
end

local function latex_text(value)
  return meta_text(value)
    :gsub("\\", "\\textbackslash{}")
    :gsub("([%%#$&_{}])", "\\%1")
    :gsub("%^", "\\textasciicircum{}")
    :gsub("~", "\\textasciitilde{}")
end

local function selected_book()
  if current_book then
    return current_book
  end
  local input = PANDOC_STATE.input_files[1]
  local input_handle, input_message = io.open(input)
  if not input_handle then
    error("Cannot read booklet source " .. input .. ": " .. input_message)
  end
  local input_document = pandoc.read(input_handle:read("*a"), "markdown", PANDOC_READER_OPTIONS)
  input_handle:close()
  local book_id = meta_text(input_document.meta.book_id)
  local registry_path = path.normalize(path.join({ path.directory(input), "..", "books.yaml" }))
  local registry_handle, registry_message = io.open(registry_path)
  if not registry_handle then
    error("Cannot read books registry " .. registry_path .. ": " .. registry_message)
  end
  local registry_document = pandoc.read("---\n" .. registry_handle:read("*a") .. "\n---", "markdown", PANDOC_READER_OPTIONS)
  registry_handle:close()
  local book = registry_document.meta.books[book_id]
  if not book then
    error("Missing books.yaml record for " .. book_id)
  end
  current_book = book
  return current_book
end

local function labeled_paragraph(label, value)
  return pandoc.Para({ pandoc.Strong({ pandoc.Str(label .. ":") }), pandoc.Space(), pandoc.Str(meta_text(value)) })
end

local function booklet_header(book)
  if FORMAT:match("latex") then
    return pandoc.List:new({ pandoc.RawBlock("latex", [[
\begin{center}
{\LARGE\bfseries\sffamily [T]-Theory: A Universal Theory of Everything}\\[6pt]
{\large\sffamily\color{heading} One Equation.\enspace 61 Decades.\enspace Mind, Body, and Cosmos.}
\end{center}
\vspace{4pt}
]]) })
  end
  return pandoc.List:new({
    pandoc.Header(1, "[T]-Theory: A Universal Theory of Everything"),
    pandoc.Para({ pandoc.Emph({ pandoc.Str("One Equation. 61 Decades. Mind, Body, and Cosmos.") }) }),
  })
end

local function booklet_why(book)
  local why = book.why
  if FORMAT:match("latex") then
    return pandoc.List:new({ pandoc.RawBlock("latex", string.format(
      "\\noindent\\textit{The gap:} %s\\par\\noindent\\textit{The solution:} %s\\par\\vspace{5pt}",
      latex_text(why.the_gap), latex_text(why.the_solution)
    )) })
  end
  return pandoc.List:new({
    pandoc.Para({
      pandoc.Emph({ pandoc.Str("The gap: " .. meta_text(why.the_gap) .. " ") }),
      pandoc.Emph({ pandoc.Str("The solution: " .. meta_text(why.the_solution)) }),
    }),
  })
end

local function claim_panel(block)
  if not FORMAT:match("latex") then
    return block
  end

  local columns = {}
  for _, child in ipairs(block.content) do
    if child.t == "Div" then
      table.insert(columns, pandoc.write(pandoc.Pandoc(child.content), "latex"))
    end
  end
  if #columns ~= 2 then
    error("claim-panel requires exactly two child divs")
  end

  return pandoc.RawBlock("latex", string.format([[
\noindent\colorbox{ghost}{\begin{minipage}{\dimexpr\textwidth-2\fboxsep\relax}
\vspace{4pt}
\begin{minipage}[t]{0.48\textwidth}
\color{heading}%s
\end{minipage}\hfill
\begin{minipage}[t]{0.48\textwidth}
\color{heading}%s
\end{minipage}
\vspace{3pt}
\end{minipage}}
]], columns[1], columns[2]))
end

local function booklet_body_blocks()
  local input = PANDOC_STATE.input_files[1]
  local body_path = path.normalize(path.join({ path.directory(input), "..", "booklet", "booklet_body.md" }))
  local handle, message = io.open(body_path)
  if not handle then
    error("Cannot read shared booklet body " .. body_path .. ": " .. message)
  end
  local document = pandoc.read(handle:read("*a"), "markdown", PANDOC_READER_OPTIONS)
  handle:close()

  local blocks = pandoc.List:new()
  for _, block in ipairs(document.blocks) do
    local heading = block.t == "Header" and pandoc.utils.stringify(block) or ""
    if block.t == "Div" and block.classes:includes("claim-panel") then
      blocks:insert(claim_panel(block))
    else
      if heading == "I · The Master Field Equation" and FORMAT:match("latex") then
        blocks:insert(pandoc.RawBlock("latex", "\\startcolumns"))
      end
      blocks:insert(block)
    end
  end
  return blocks
end

function Div(element)
  if element.classes:includes("claim-panel") then
    return claim_panel(element)
  end
  return element
end

local function booklet_field_notes(book)
  local notes = book.field_notes
  if FORMAT:match("latex") then
    local function line(label, value)
      return string.format("\\texttt{\\textbf{%s:>}} %s\\\\\n", label, latex_text(value))
    end
    local identity = line("G-ID", notes.g_id) .. line("READER", notes.reader)
      .. line("SCALE", notes.scale) .. line("EQUATION", notes.equation) .. line("OPERATOR", notes.operator)
    local analysis = line("INVARIANT", notes.invariant) .. line("OBSERVABLE", notes.observable)
    return pandoc.List:new({ pandoc.RawBlock("latex", string.format([[
\finishbookletcolumns
\begin{center}\includegraphics[width=20mm]{../../lib/images/sticker/tt-qr-t-theory-org.png}\end{center}
\vfill
\noindent\textcolor{hudline}{\rule{\textwidth}{0.35pt}}
\vspace{1pt}\noindent{\sffamily\tiny\color{hudtext}\textcolor{white}{[} FIELD NOTES / FIELD SCAN \textcolor{white}{]}\hfill\textcolor{ledorange}{[ ~ AWAITING VALIDATION ]}}\par
\vspace{2pt}\noindent\textcolor{hudline}{\rule{\textwidth}{0.25pt}}\par\vspace{2pt}
\noindent{\scriptsize\color{hudtext}\raggedright %s}\par
\vspace{3pt}\noindent\textcolor{hudline}{\rule{\textwidth}{0.25pt}}\par\vspace{2pt}
\noindent{\sffamily\tiny\color{hudtext}\textcolor{white}{[} ABDUCTING:> \textcolor{white}{]}}\par
\vspace{1pt}\noindent{\scriptsize\color{hudtext}\raggedright %s}
\vspace{2pt}\noindent\textcolor{hudline}{\rule{\textwidth}{0.35pt}}
]], identity, analysis)) })
  end
  local labels = {
    { "G-ID", "g_id" }, { "Reader", "reader" }, { "Scale", "scale" },
    { "Equation", "equation" }, { "Operator", "operator" },
    { "Invariant", "invariant" }, { "Observable", "observable" },
    { "Historical observation", "historical_observation" },
  }
  local blocks = pandoc.List:new()
  if FORMAT:match("latex") then
    blocks:insert(pandoc.RawBlock("latex", "\\finishbookletcolumns"))
    blocks:insert(pandoc.RawBlock("latex", "\\small"))
  end
  blocks:insert(pandoc.Header(2, "Field Notes"))
  for _, item in ipairs(labels) do
    if notes[item[2]] then
      blocks:insert(labeled_paragraph(item[1], notes[item[2]]))
    end
  end
  return blocks
end

local function booklet_evidence_audit(book)
  local audit = book.sherlock_audit
  if FORMAT:match("latex") then
    local induction_lines = {}
    for _, induction in ipairs(audit.primary_inductions) do
      table.insert(induction_lines, "\\texttt{INDUCTION:>} " .. latex_text(induction) .. "\\\\")
    end
    local layout = string.format([[
\par\vspace{4pt}\noindent\textcolor{hudline}{\rule{\textwidth}{0.35pt}}
\vspace{1pt}\noindent{\sffamily\tiny\color{hudtext}\textcolor{white}{[} SHERLOCK / EVIDENCE AUDIT \textcolor{white}{]}}\par
\vspace{2pt}\noindent{\scriptsize\color{hudtext}\raggedright
  @@TEXTTT@@{WHY:>} The opening claim is a reading guide; it is not itself a proof.\\
  @@TEXTTT@@{STATUS:>} %s\\
%s
  @@TEXTTT@@{FORMAL:>} Label only an explicitly linked Lean theorem or proof output.\\
  @@TEXTTT@@{SOURCED:>} Label claims grounded in the listed papers or this Cheat Sheet.\\
  @@TEXTTT@@{INTERPRETIVE:>} Label domain mappings, visualisations, and open hypotheses.\\
  @@TEXTTT@@{MORIARTY:>} Does this summary claim more than its linked evidence establishes?}
\vspace{2pt}\noindent\textcolor{hudline}{\rule{\textwidth}{0.35pt}}
]], latex_text(audit.status), table.concat(induction_lines, "\n"))
    layout = layout:gsub("@@TEXTTT@@", string.char(92) .. "texttt")
    return pandoc.List:new({ pandoc.RawBlock("latex", layout) })
  end
  local blocks = pandoc.List:new({
    pandoc.Header(2, "Sherlock / Evidence Audit"),
    pandoc.Para({ pandoc.Strong({ pandoc.Str("Why:") }), pandoc.Space(), pandoc.Str("The opening claim is a reading guide; it is not itself a proof.") }),
    labeled_paragraph("Status", audit.status),
    pandoc.Para({ pandoc.Strong({ pandoc.Str("Primary inductions:") }) }),
  })
  local items = pandoc.List:new()
  for _, induction in ipairs(audit.primary_inductions) do
    items:insert(pandoc.Plain({ pandoc.Str(meta_text(induction)) }))
  end
  blocks:insert(pandoc.BulletList(items))
  if audit.moriarty_check then
    blocks:insert(labeled_paragraph("Moriarty attack", audit.moriarty_check.attack))
    blocks:insert(labeled_paragraph("Counter-logic", audit.moriarty_check.counter_logic))
  end
  if FORMAT:match("latex") then
    blocks:insert(pandoc.RawBlock("latex", "\\normalsize"))
  end
  return blocks
end

function Para(element)
  local text = single_text(element)
  if not text then
    return element
  end

  local paper = text:match("^{{AddPaper%s+(.+)}}$")
  if paper then
    return add_paper(paper)
  end

  local file = text:match("^{{AddFile%s+(.+)}}$")
  if file then
    return add_file(file)
  end

  if text == "{{AddPage}}" then
    if FORMAT:match("latex") then
      return pandoc.RawBlock("latex", "\\clearpage")
    end
    if FORMAT:match("html") then
      return pandoc.RawBlock("html", '<div class="page-break"></div>')
    end
    return pandoc.Div({}, pandoc.Attr("", { "page-break" }))
  end

  local pdf, placement = text:match("^{{AddPDF%s+([^%s}]+)%s*(%S*)}}$")
  if pdf then
    if placement ~= "" and placement ~= "recto" then
      error("AddPDF placement must be recto when specified")
    end
    return insert_pdf(pdf, placement == "recto")
  end

  local booklet, booklet_placement = text:match("^{{AddBooklet%s+([^%s}]+)%s*(%S*)}}$")
  if booklet then
    if booklet_placement ~= "" and booklet_placement ~= "recto" then
      error("AddBooklet placement must be recto when specified")
    end
    return insert_pdf(booklet, booklet_placement == "recto")
  end

  if text == "{{BookletHeader}}" then
    return booklet_header(selected_book())
  end

  if text == "{{BookletBody}}" then
    return booklet_body_blocks()
  end

  if text == "{{BookletWhy}}" then
    return booklet_why(selected_book())
  end

  if text == "{{BookletFieldNotes}}" then
    return booklet_field_notes(selected_book())
  end

  if text == "{{BookletEvidenceAudit}}" then
    return booklet_evidence_audit(selected_book())
  end

  return element
end

function Str(element)
  local format = FORMAT:match("html") and "html" or FORMAT:match("latex") and "latex"
  local replacement = replacements[element.text]

  if replacement and format then
    return pandoc.RawInline(format, replacement[format])
  end

  return element
end
