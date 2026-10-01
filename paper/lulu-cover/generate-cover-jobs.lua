-- Generate GNU Make cover jobs from the Lulu records in PAPERS.yaml.
-- Rendering remains in Lua/TeX; this only derives the registry job inventory.
local registry_path, output_path = arg[1], arg[2]
assert(registry_path and output_path, "usage: texlua generate-cover-jobs.lua PAPERS.yaml cover-jobs.mk")

local records, current = {}, nil
for line in io.lines(registry_path) do
  local id = line:match("^%s*%- id:%s*(%S+)")
  if id then
    current = {id = id}
    table.insert(records, current)
  elseif current then
    local key, quoted = line:match('^%s+([%w_]+):%s*"(.-)"%s*$')
    local bare_key, bare = line:match("^%s+([%w_]+):%s*(%S+)%s*$")
    if key then current[key] = quoted end
    if bare_key then current[bare_key] = bare end
  end
end

local function make_quote(text)
  return text:gsub("'", "'\\''")
end

local file = assert(io.open(output_path, "w"))
file:write("# Generated from Dist/PAPERS.yaml. Do not edit.\n\n")
local targets = {}
for _, record in ipairs(records) do
  if record.lulu then
    local interior
    if record.build == "fractal" then
      local filename = record.bld_file
      if not filename then filename = "book-" .. record.slug:gsub("^ttheory%-book%-", "") .. ".pdf" end
      interior = "../../books/T-Theory/bld/" .. filename
    else
      interior = "../bld/" .. (record.bld_file or (record.slug .. ".pdf"))
    end
    local target = "cover-" .. record.lulu
    table.insert(targets, target)
    file:write(".PHONY: " .. target .. "\n")
    file:write(target .. ":\n")
    file:write("\t$(MAKE) -f Makefile jacket linen-wrap COVER='" .. make_quote(record.lulu) .. "' INTERIOR='" .. interior .. "' TITLE='" .. make_quote(record.lulu_title or record.title) .. "' SUBTITLE='Hardcover Linen Wrap'\n\n")
  end
end
file:write(".PHONY: all\nall: " .. table.concat(targets, " ") .. "\n")
file:close()
print("Generated " .. #targets .. " Lulu cover jobs from the registry.")
