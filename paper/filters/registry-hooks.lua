-- registry-hooks.lua
-- Resolve a deliberately small registry hook vocabulary during Pandoc rendering.
-- Supported hooks: {{papers.count}}, {{paper:ID.title}}, {{paper:ID.doi}},
-- {{paper:ID.status}}, {{collection:ID.title}}, {{collection:ID.status}}.

local registry_path = "../../Dist/PAPERS.yaml"
local registry = { papers = {}, collections = {}, canonical_count = 0 }

local function scalar(value)
  value = value:gsub("^%s+", ""):gsub("%s+$", "")
  value = value:gsub("^['\"]", ""):gsub("['\"]$", "")
  if value == "null" or value == "~" then
    return "pending"
  end
  return value
end

local function index_entry(entry)
  if not entry or not entry.id or not entry.slug then
    return
  end
  if entry.section == "canonical_papers" or entry.section == "datasets" then
    registry.papers[entry.id] = entry
    registry.papers[entry.slug] = entry
  elseif entry.section == "collections" then
    registry.collections[entry.id] = entry
    registry.collections[entry.slug] = entry
  end
end

local function load_registry()
  local file = assert(io.open(registry_path, "r"), "cannot read " .. registry_path)
  local section, entry = nil, nil
  for line in file:lines() do
    local heading = line:match("^([%a_]+):%s*$")
    if heading == "canonical_papers" or heading == "datasets" or heading == "collections" then
      index_entry(entry)
      section = heading
      entry = nil
    else
      local id = line:match("^  %- id:%s*(.+)$")
      if id then
        index_entry(entry)
        entry = { id = scalar(id), section = section }
        if section == "canonical_papers" then
          registry.canonical_count = registry.canonical_count + 1
        end
      elseif entry then
        local key, value = line:match("^    ([%w_]+):%s*(.-)%s*$")
        if key then
          entry[key] = scalar(value)
        end
      end
    end
  end
  index_entry(entry)
  file:close()
end

local function resolve(hook)
  if hook == "papers.count" then
    return tostring(registry.canonical_count)
  end
  local kind, id, field = hook:match("^(paper):([^%.]+)%.([%w_]+)$")
  if kind then
    local entry = registry.papers[id]
    return entry and entry[field] or nil
  end
  kind, id, field = hook:match("^(collection):([^%.]+)%.([%w_]+)$")
  if kind then
    local entry = registry.collections[id]
    return entry and entry[field] or nil
  end
  return nil
end

function Pandoc(document)
  load_registry()
  return document:walk({
    Str = function(element)
      local hook = element.text:match("^{{([%w%._:%-]+)}}$")
      if not hook then
        return nil
      end
      local value = resolve(hook)
      if not value then
        error("unknown registry hook: " .. hook)
      end
      return pandoc.Str(value)
    end,
  })
end
