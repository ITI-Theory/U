-- Convert simple Unicode box-drawing callouts at render time.
-- Complex diagrams remain literal code blocks; simple boxes become block quotes.

local art_chars = {
  ["─"] = true, ["│"] = true, ["┌"] = true, ["┐"] = true,
  ["└"] = true, ["┘"] = true, ["├"] = true, ["┤"] = true,
  ["┬"] = true, ["┴"] = true, ["┼"] = true, ["╔"] = true,
  ["╗"] = true, ["╚"] = true, ["╝"] = true, ["║"] = true,
  ["═"] = true, ["╠"] = true, ["╣"] = true, ["╦"] = true,
  ["╩"] = true, ["╬"] = true, ["◄"] = true, ["►"] = true,
  ["▲"] = true, ["▼"] = true, ["←"] = true, ["→"] = true,
  ["↑"] = true, ["↓"] = true, ["/"] = true, ["\\"] = true,
  ["*"] = true, ["#"] = true, ["@"] = true,
}

local function trim(s)
  return s:gsub("^%s+", ""):gsub("%s+$", "")
end

local function strip_border(line)
  line = trim(line)
  line = line:gsub("^│%s*", ""):gsub("%s*│$", "")
  return trim(line)
end

local function art_count(lines)
  local n = 0
  for _, line in ipairs(lines) do
    for _, c in utf8.codes(line) do
      if art_chars[utf8.char(c)] then n = n + 1 end
    end
  end
  return n
end

function CodeBlock(el)
  if not el.classes:includes("box-callout") then return nil end
  if not el.text:match("[╭╰│]") then return nil end
  local content = {}
  for line in (el.text .. "\n"):gmatch("(.-)\n") do
    if not line:match("[╭╰]") then
      local stripped = strip_border(line)
      if stripped ~= "" and not stripped:match("^[-─═%s]+$") then
        table.insert(content, stripped)
      end
    end
  end
  if #content == 0 or art_count(content) > 3 then return nil end
  return pandoc.BlockQuote({pandoc.Para(pandoc.Inlines(content))})
end
