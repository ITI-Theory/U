local path = require "pandoc.path"

local function trim(value)
  return value:match("^%s*(.-)%s*$")
end

local function split(value, separator)
  local values = {}
  for item in value:gmatch("[^" .. separator .. "]+") do
    table.insert(values, trim(item))
  end
  return values
end

local function read_file(filename)
  local handle, message = io.open(filename)
  if not handle then
    return nil, message
  end
  local content = handle:read("*a")
  handle:close()
  return content
end

local function front_matter(content)
  return content:match("^%-%-%-[\r\n]+(.-)[\r\n]+%-%-%-")
end

local function front_matter_value(content, key)
  local metadata = front_matter(content)
  if not metadata then
    return nil
  end
  return metadata:match("\n" .. key .. ":%s*([^\r\n]*)")
    or metadata:match("^" .. key .. ":%s*([^\r\n]*)")
end

local function metadata_set(content, key, separator)
  local value = front_matter_value(content, key) or ""
  local result = {}
  for _, item in ipairs(split(value, separator)) do
    result[item] = true
  end
  return result
end

local function field_value(content, field_name)
  local fields = front_matter_value(content, "fields") or ""
  for _, assignment in ipairs(split(fields, ",")) do
    local key, value = assignment:match("^([^=]+)=(.*)$")
    if key and trim(key) == field_name then
      return trim(value)
    end
  end
  return nil
end

local function macro_values(content, name)
  local values = {}
  for value in content:gmatch("{{" .. name .. "%s+([^}]+)}}") do
    table.insert(values, value)
  end
  return values
end

local function issue_ids(content)
  local ids = {}
  for identifier in content:gmatch("##%s+(ISS%-%d%d%d):") do
    ids[identifier] = true
  end
  return ids
end

local failures = {}

local function fail(message)
  table.insert(failures, message)
end

function Pandoc(document)
  local issues_file = PANDOC_STATE.input_files[1]
  local issues_content, issues_error = read_file(issues_file)
  if not issues_content then
    error("issues-check: cannot read " .. issues_file .. ": " .. issues_error)
  end

  local allowed_tags = metadata_set(issues_content, "tags", ",")
  local allowed_fields = metadata_set(issues_content, "fields", ",")
  local known_issues = issue_ids(issues_content)
  local issues_dir = path.join({ path.directory(issues_file), "prj", ".adm", "issues" })

  for _, value in ipairs(macro_values(issues_content, "Tags")) do
    for _, tag in ipairs(split(value, ",")) do
      if not allowed_tags[tag] then
        fail("unknown tag: " .. tag)
      end
    end
  end

  local epic_values = {}
  for _, value in ipairs(macro_values(issues_content, "Fields")) do
    for _, assignment in ipairs(split(value, ",")) do
      local key, field_value = assignment:match("^([^=]+)=(.*)$")
      if not key then
        fail("invalid field assignment: " .. assignment)
      else
        key = trim(key)
        field_value = trim(field_value)
        if not allowed_fields[key] then
          fail("unknown field: " .. key)
        elseif key == "epic" and field_value ~= "" then
          table.insert(epic_values, field_value)
        end
      end
    end
  end

  for _, epic in ipairs(epic_values) do
    local filename = path.join({ issues_dir, epic .. ".md" })
    local content = read_file(filename)
    if not content then
      fail("epic file missing: " .. filename)
    end
  end

  local files = pandoc.system.list_directory(issues_dir)
  for _, filename in ipairs(files) do
    if filename:match("%.md$") then
      local full_path = path.join({ issues_dir, filename })
      local content, detail_error = read_file(full_path)
      if not content then
        fail("cannot read detail file: " .. full_path .. ": " .. detail_error)
      else
        local issue = field_value(content, "issue")
        if not issue or trim(issue) == "" then
          fail("detail file missing fields.issue: " .. full_path)
        elseif not known_issues[trim(issue)] then
          fail("detail file references unknown issue " .. trim(issue) .. ": " .. full_path)
        end
      end
    end
  end

  if #failures > 0 then
    for _, message in ipairs(failures) do
      io.stderr:write("FAIL  " .. message .. "\n")
    end
    error("issues-check: " .. #failures .. " validation failure(s)")
  end

  io.stderr:write("PASS  issues registry validated\n")
  return document
end
