-- Build the registry-driven C1v2 omnibus in Pandoc's document tree.

local collection_id = "C1v2"
local registry_path = "../../Dist/PAPERS.yaml"
local paper_dir = "soma"

local function trim(value)
  return (value or ""):gsub("^%s+", ""):gsub("%s+$", "")
end

local function scalar(value)
  value = trim(value)
  value = value:gsub("^['\"]", ""):gsub("['\"]$", "")
  if value == "~" or value == "null" then return nil end
  if value == "true" then return true end
  if value == "false" then return false end
  return value
end

local function push_entry(entries, entry)
  if entry and entry.slug then entries[entry.slug] = entry end
end

local function load_registry()
  local entries, collections = {}, {}
  local section, entry, in_members = nil, nil, false
  for line in io.lines(registry_path) do
    local heading = line:match("^([%a_]+):%s*$")
    if heading == "canonical_papers" or heading == "datasets" or heading == "collections" then
      if section == "collections" and entry and entry.id then collections[entry.id] = entry else push_entry(entries, entry) end
      section, entry, in_members = heading, nil, false
    else
      local id = line:match("^  %- id:%s*(.+)$")
      if id then
        if section == "collections" and entry and entry.id then collections[entry.id] = entry else push_entry(entries, entry) end
        entry, in_members = { id = scalar(id), members = {} }, false
      elseif entry then
        if line:match("^    members:%s*$") then
          in_members = true
        elseif in_members then
          local slug = line:match("^      %- slug:%s*(.+)$")
          if slug then
            table.insert(entry.members, { slug = scalar(slug) })
          else
            local key, value = line:match("^        ([%w_]+):%s*(.-)%s*$")
            if key and #entry.members > 0 then
              entry.members[#entry.members][key] = scalar(value)
            end
          end
        else
          local key, value = line:match("^    ([%w_]+):%s*(.-)%s*$")
          if key then entry[key] = scalar(value) end
        end
      end
    end
  end
  if section == "collections" and entry and entry.id then collections[entry.id] = entry else push_entry(entries, entry) end
  return collections[collection_id], entries
end

local visualize_reader = dofile((PANDOC_SCRIPT_FILE:match("^(.*)[/\\]") or ".") .. "/../../lib/format/visualize-reader.lua")

local function read_member(slug)
  local path = paper_dir .. "/" .. slug .. "/" .. slug .. ".md"
  local file = io.open(path, "r")
  if not file then error("missing omnibus member source: " .. path) end
  local text = file:read("*a")
  file:close()
  -- {{Visualize}} macros are protected exactly as the paper reader does (ISS-051).
  return pandoc.read(visualize_reader.protect(text), "markdown")
end

local function stringify(inlines)
  return pandoc.utils.stringify(inlines)
end

local function without_references(blocks)
  local out = {}
  for _, block in ipairs(blocks) do
    if block.t == "Header" and block.level <= 3 and stringify(block.content):match("^References$") then
      break
    end
    table.insert(out, block)
  end
  return out
end

local function shift_headers(blocks)
  return pandoc.Blocks(blocks):walk({
    Header = function(header)
      header.level = math.min(header.level + 1, 6)
      return header
    end
  })
end

local function latex_text(value)
  value = tostring(value or "")
  value = value:gsub("\\", "\\textbackslash{}")
  value = value:gsub("([&%%_#])", "\\%1")
  return value
end

local function part_blocks(member)
  if not member.part then return {} end
  if FORMAT:match("latex") then
    local prefix = "\\cleardoublepage\n\n"
    if member.appendix then prefix = prefix .. "\\appendix\n\n" end
    return {pandoc.RawBlock("latex", prefix .. "\\part{" .. latex_text(member.part) .. "}\n")}
  end
  return {pandoc.Header(1, pandoc.Inlines(member.part))}
end

local function divider_blocks(title, slug)
  if FORMAT:match("latex") then
    return {pandoc.RawBlock("latex", "\\omnipaperdivider{" .. latex_text(title) .. "}{" .. latex_text(slug) .. "}\n")}
  end
  return {pandoc.HorizontalRule(), pandoc.Header(1, pandoc.Inlines(title))}
end

local function abstract_blocks(value)
  if not value or value == "" then return {} end
  return pandoc.read("## Abstract\n\n" .. value, "markdown").blocks
end

local function meta_string(value)
  return value and pandoc.MetaString(tostring(value)) or nil
end

function Pandoc(doc)
  local collection, entries = load_registry()
  if not collection then error("collection not found in registry: " .. collection_id) end

  doc.meta.title = meta_string(collection.title)
  doc.meta.author = meta_string(collection.author)
  doc.meta.orcid = meta_string(collection.orcid)
  doc.meta.institute = meta_string(collection.institute)
  doc.meta.date = meta_string(collection.date)
  doc.meta.description = meta_string(collection.description)
  doc.meta.bibliography = meta_string("bibliography.bib")
  doc.meta.csl = meta_string("apa-7th.csl")

  local blocks = {}
  for _, member in ipairs(collection.members or {}) do
    local slug = member.slug
    local entry = entries[slug]
    if not entry then error("registry member not found: " .. tostring(slug)) end
    for _, b in ipairs(part_blocks(member)) do table.insert(blocks, b) end
    for _, b in ipairs(divider_blocks(entry.title, slug)) do table.insert(blocks, b) end
    for _, b in ipairs(abstract_blocks(entry.abstract)) do table.insert(blocks, b) end
    table.insert(blocks, pandoc.Header(1, pandoc.Inlines(entry.title)))
    local member_doc = read_member(slug)
    for _, b in ipairs(shift_headers(without_references(member_doc.blocks))) do table.insert(blocks, b) end
  end
  doc.blocks = blocks
  return doc
end
