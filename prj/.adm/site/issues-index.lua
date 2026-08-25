local function escape_html(value)
  return value:gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;")
    :gsub('"', "&quot;")
end

local function stringify(inlines)
  return pandoc.utils.stringify(inlines)
end

local function raw(html)
  return pandoc.RawBlock("html", html)
end

local function parse_metadata(blocks)
  local tags = {}
  local fields = {}
  local content = {}

  for _, block in ipairs(blocks) do
    local text = block.t == "Para" and stringify(block.content) or ""
    local has_metadata = false
    for tag_values in text:gmatch("{{Tags%s+([^}]+)}}") do
      has_metadata = true
      for tag in tag_values:gmatch("[^,]+") do
        table.insert(tags, tag:match("^%s*(.-)%s*$"))
      end
    end
    for field_values in text:gmatch("{{Fields%s+([^}]+)}}") do
      has_metadata = true
      for field in field_values:gmatch("[^,]+") do
        local name, value = field:match("^%s*([^=]+)=(.-)%s*$")
        if name then fields[name] = value end
      end
    end
    if not has_metadata then
      table.insert(content, block)
    end
  end

  return tags, fields, content
end

local function issue_heading(text)
  local identifier, title, status = text:match("^(ISS%-%d+):%s*(.-)%s*—%s*([A-Z%-]+)$")
  return identifier, title, status
end

local function issue_summary(identifier, title, status, tags, fields)
  local chips = {}
  for _, tag in ipairs(tags) do
    table.insert(chips, '<span class="tag">' .. escape_html(tag) .. "</span>")
  end

  local dates = {}
  for _, name in ipairs({ "date.created", "date.start", "date.end" }) do
    if fields[name] and fields[name] ~= "" then
      table.insert(dates, "<span>" .. escape_html(name:sub(6) .. "=" .. fields[name]) .. "</span>")
    end
  end

  return table.concat({
    '<details class="issue" data-tags="' .. escape_html(table.concat(tags, ",")) .. '">',
    "<summary>",
    '<span class="issue-toggle" aria-hidden="true"></span>',
    '<span class="issue-id">' .. escape_html(identifier) .. "</span>",
    '<span class="issue-title">' .. escape_html(title) .. "</span>",
    '<span class="status status-' .. status:lower() .. '">' .. escape_html(status) .. "</span>",
    '<span class="issue-tags">' .. table.concat(chips) .. "</span>",
    '<span class="issue-dates">' .. table.concat(dates) .. "</span>",
    "</summary>",
    '<div class="issue-content">',
  }, "\n")
end

local function epic_blocks(slug)
  if not slug or slug == "" then return {} end

  local handle = io.open("prj/.adm/issues/" .. slug .. ".md", "r")
  if not handle then return {} end
  local document = pandoc.read(handle:read("*a"), "markdown+task_lists")
  handle:close()

  local title = slug
  if document.blocks[1] and document.blocks[1].t == "Header" then
    title = stringify(document.blocks[1].content)
    table.remove(document.blocks, 1)
  end

  local blocks = { raw('<details class="epic-body"><summary><span class="epic-mark">Epic</span> ' .. escape_html(title) .. "</summary><div class=\"epic-content\">") }
  for _, block in ipairs(document.blocks) do table.insert(blocks, block) end
  table.insert(blocks, raw("</div></details>"))
  return blocks
end

function Pandoc(document)
  local output = {
    pandoc.Header(1, "[T]-Theory Issue Index"),
    pandoc.Para({ pandoc.Str("Static local view. The canonical issue register remains "), pandoc.Link({ pandoc.Code("ISSUES.md") }, "../../../ISSUES.md") }),
    pandoc.Header(2, "Open Issues"),
    raw('<div class="issue-toolbar" aria-label="Issue filters"><span>Filter tags</span><div id="tag-filters" class="tag-filters"></div><button id="clear-filters" type="button" hidden>Clear</button></div>'),
    raw('<div id="issue-list" class="issue-list">'),
  }

  local current = nil
  local function finish_issue()
    if not current then return end
    local tags, fields, content = parse_metadata(current.blocks)
    table.insert(output, raw(issue_summary(current.identifier, current.title, current.status, tags, fields)))
    for _, block in ipairs(content) do table.insert(output, block) end
    for _, block in ipairs(epic_blocks(fields.epic)) do table.insert(output, block) end
    table.insert(output, raw("</div></details>"))
    current = nil
  end

  for _, block in ipairs(document.blocks) do
    if block.t == "Header" and block.level == 2 then
      local identifier, title, status = issue_heading(stringify(block.content))
      finish_issue()
      if identifier and status == "OPEN" then
        current = { identifier = identifier, title = title, status = status, blocks = {} }
      end
    elseif current then
      table.insert(current.blocks, block)
    end
  end
  finish_issue()

  table.insert(output, raw("</div>"))
  return pandoc.Pandoc(output, { title = pandoc.MetaString("[T]-Theory Issue Index") })
end
