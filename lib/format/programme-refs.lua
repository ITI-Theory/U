-- programme-refs.lua: make references to programme papers stand on their own
-- (docs/BUILD.md). Every record in registry/papers.yaml (a mirror of
-- Dist/PAPERS.yaml, refreshed by `make generate`) becomes a reference-list
-- entry with its id as the citation key, so sources can write [@P21] or
-- [@P21; @P22]. Legacy bare ids in running text ("P21", "(P21)", "P20's",
-- "P21/P22-style") are turned into citations as well, except where "P3" is
-- the dimension block of the M4 x P3 x L1 x C3 notation. Only P ids are
-- converted automatically; datasets and collections (D1, C1, ...) need [@D1].
--
-- Metadata: programme-papers: <path to papers.yaml> (relative to the
-- directory pandoc runs in). Requires citeproc after this filter.

local papers = {}      -- id -> CSL item
local ids = {}         -- set of known ids

local function text(v)
  if v == nil then return nil end
  local s = pandoc.utils.stringify(v)
  if s == "" or s == "null" then return nil end
  return s
end

-- Titles are rendered by citeproc after other filters have run, so give it
-- pandoc inlines with real Subscript elements (G₂, Ω_DM) rather than text.
local SUB = { ["₀"]="0", ["₁"]="1", ["₂"]="2", ["₃"]="3", ["₄"]="4", ["₅"]="5",
  ["₆"]="6", ["₇"]="7", ["₈"]="8", ["₉"]="9" }
local function csl_title(s)
  s = s:gsub("_(%w+)", "~%1~")
  for u, d in pairs(SUB) do s = s:gsub(u, "~" .. d .. "~") end
  s = s:gsub("~~", "")
  local blocks = pandoc.read(s, "markdown").blocks
  if #blocks == 0 then return s end
  return pandoc.MetaInlines(pandoc.utils.blocks_to_inlines(blocks))
end

local function unquote(v)
  v = v:gsub("%s+#.*$", ""):gsub("^%s+", ""):gsub("%s+$", "")
  if v == "" or v == "null" or v == "~" then return nil end
  return (v:gsub('^"(.*)"$', "%1"):gsub("^'(.*)'$", "%1"))
end

-- Read id / title / doi from the registry's list entries. The file is a
-- plain list of records ("  - id: P21" then indented fields), so a line
-- reader is enough and avoids YAML features pandoc's metadata parser rejects.
local function read_registry(path)
  local f = io.open(path, "rb")
  if not f then
    io.stderr:write("programme-refs.lua: cannot read " .. path .. "\n")
    return
  end
  local current
  local function finish()
    if current and current.id then
      papers[current.id] = {
        id = current.id,
        type = current.doi and "report" or "manuscript",
        title = csl_title(current.title or current.id),
        author = { { family = "Johnson", given = "Alistair" } },
        issued = "2026",
        publisher = current.doi and "Zenodo" or nil,
        DOI = current.doi,
        genre = (not current.doi) and "Manuscript in preparation" or nil,
      }
      ids[current.id] = true
    end
  end
  for line in f:lines() do
    local id = line:match("^%s*%-%s+id:%s*(.-)%s*$")
    if id then
      finish()
      current = { id = unquote(id) }
    elseif current then
      local key, value = line:match("^%s+([%w_]+):%s*(.*)$")
      if key == "title" then current.title = unquote(value)
      elseif key == "doi" then current.doi = unquote(value) end
    end
  end
  finish()
  f:close()
end
local function cite(id, mode)
  return pandoc.Cite({ pandoc.Str("[@" .. id .. "]") },
    { pandoc.Citation(id, mode or "AuthorInText") })
end

-- "P3" next to M4 / L1 / C3 / x is the dimension block, not the paper.
local DIM = { M4 = true, L1 = true, C3 = true, ["×"] = true, ["x"] = true,
  ["M4,"] = true, ["L1,"] = true, ["C3,"] = true }

local function is_dimension(inlines, i)
  for j = math.max(1, i - 4), math.min(#inlines, i + 4) do
    local el = inlines[j]
    if j ~= i and el.t == "Str" then
      local w = el.text:gsub("[%(%)%.,;:]", "")
      if DIM[w] or DIM[el.text] then return true end
    end
    if el.t == "Math" and el.text:match("[MLC]_?%{?%d") then return true end
  end
  return false
end

-- Split one Str into inlines, replacing known ids with citations.
local function convert(str, inlines, i)
  local s = str.text
  if not s:find("[PDCE]%d") then return nil end
  local out = pandoc.Inlines({})
  local pos, changed = 1, false
  while true do
    local a, b, id = s:find("%f[A-Za-z0-9](%u%d%d?)%f[^A-Za-z0-9]", pos)
    if not a then break end
    -- only paper ids (P..) are converted automatically; D1, C1 ... need [@D1]
    if ids[id] and id:match("^P") and not (id == "P3" and is_dimension(inlines, i)) then
      local before = s:sub(pos, a - 1)
      local after2 = s:sub(b + 1, b + 2)
      local possessive = after2 == "'s" or s:sub(b + 1, b + 4) == "’s"
      local paren = before:sub(-1) == "(" and s:sub(b + 1, b + 1) == ")"
      if paren then
        before = before:sub(1, -2)
        if before ~= "" then out:insert(pandoc.Str(before)) end
        out:insert(cite(id, "NormalCitation"))
        b = b + 1
      elseif possessive then
        if before ~= "" then out:insert(pandoc.Str(before)) end
        out:insert(pandoc.Str("Johnson’s"))
        out:insert(pandoc.Space())
        out:insert(cite(id, "SuppressAuthor"))
        b = b + (s:sub(b + 1, b + 4) == "’s" and 4 or 2)
      else
        if before ~= "" then out:insert(pandoc.Str(before)) end
        out:insert(cite(id, "AuthorInText"))
      end
      changed = true
      pos = b + 1
    else
      out:insert(pandoc.Str(s:sub(pos, b)))
      pos = b + 1
    end
  end
  if not changed then return nil end
  if pos <= #s then out:insert(pandoc.Str(s:sub(pos))) end
  return out
end

local function walk_inlines(inlines)
  local out = pandoc.Inlines({})
  local changed = false
  for i, el in ipairs(inlines) do
    local replacement = el.t == "Str" and convert(el, inlines, i) or nil
    if replacement then
      out:extend(replacement)
      changed = true
    else
      out:insert(el)
    end
  end
  if changed then return out end
end

function Pandoc(doc)
  local path = text(doc.meta["programme-papers"]) or "registry/papers.yaml"
  read_registry(path)
  if next(papers) == nil then return nil end

  -- Convert bare ids in running text (not in code, maths or link targets).
  doc = doc:walk({ Inlines = walk_inlines })

  -- Add every cited programme paper to the reference list.
  local used = {}
  doc:walk({ Cite = function(c)
    for _, citation in ipairs(c.citations) do
      if papers[citation.id] then used[citation.id] = true end
    end
  end })
  local refs = doc.meta.references or pandoc.List({})
  for id in pairs(used) do refs:insert(papers[id]) end
  if #refs > 0 then doc.meta.references = refs end
  return doc
end
