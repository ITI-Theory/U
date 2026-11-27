-- chronicle.lua: The Evolution's chronicle (ISS-133), laid out from data.
--
-- `python sherlock/chats.py chronicle` writes the threads of the chats, month by month, to
-- bld/sherlock/chronicle.json (metadata `chronicle-data`). A fenced div
--
--   ::: {.chronicle from="202605" to="202608"}
--   :::
--
-- becomes, for each month in the range: a heading, a generated summary (counts, never typed) and the
-- threads by product, each with what became of it. `open="true"` lists only what is still open (not yet
-- triaged, or queued to an issue). `concept="Physics,Einstein"` keeps the threads with any of those concepts
-- (Background, ISS-134); `flat="true"` lists them as one dated list, without the month headings. Nothing is
-- quoted from the chats: a thread is its affidavit's topic.
--
-- In the prose, a citation of a conversation is a span: [the first README]{.chat ref="20260516_11" p="3-5"}
-- becomes the text, then "(Phase Dot 20260516_11, prompts 3-5)" (or "chat ..."). `python sherlock/usc.py check`
-- fails when the conversation does not exist or a prompt is out of range.

local MONTHS = { "January", "February", "March", "April", "May", "June", "July", "August",
                 "September", "October", "November", "December" }
local PRODUCTS = { { "USF", "The theory (USF)" }, { "USM", "The Soma Machine (USM)" }, { "USC", "The compiler (USC)" } }

local data = nil

local function load(meta)
  local path = meta["chronicle-data"] and pandoc.utils.stringify(meta["chronicle-data"])
  if not path then return end
  local f = io.open(path, "r")
  if not f then
    error("chronicle.lua: no data at " .. path .. " (run: python sherlock/chats.py chronicle)")
  end
  data = pandoc.json.decode(f:read("a"), false)
  f:close()
end

local function inlines(text)
  local doc = pandoc.read(text, "markdown-smart")
  if #doc.blocks == 0 then return pandoc.Inlines {} end
  return doc.blocks[1].content or pandoc.Inlines { pandoc.Str(text) }
end

local function month_name(m)
  return MONTHS[tonumber(m:sub(5, 6))] .. " " .. m:sub(1, 4)
end

local function is_open(t)
  return t.disposition == "untriaged" or t.disposition == "queued"
end

local function fate(t)
  local d, ref = t.disposition, t.ref or ""
  local out = pandoc.Inlines {}
  local word = ({ implemented = "done", queued = "queued", parked = "parked", discarded = "dropped",
                  untriaged = "not yet triaged" })[d] or d
  out:insert(pandoc.Emph { pandoc.Str(word) })
  if ref ~= "" then
    out:extend { pandoc.Str(":"), pandoc.Space(), pandoc.Str(ref) }
  end
  return out
end

local function item(t)
  local line = pandoc.Inlines { pandoc.Strong { pandoc.Str(t.date) }, pandoc.Space() }
  line:extend(inlines(t.topic))
  line:extend { pandoc.Str(";"), pandoc.Space() }
  line:extend(fate(t))
  local where = (t.origin == "Phase Dot" and "Phase Dot " or "chat ") .. t.chat
  if #t.prompts == 2 then
    local a, b = string.format("%d", t.prompts[1]), string.format("%d", t.prompts[2])  -- JSON numbers decode as floats
    where = where .. (a == b and (", prompt " .. a) or (", prompts " .. a .. "–" .. b))
  end
  line:extend { pandoc.Space(), pandoc.Str("(" .. where .. ")") }
  return { pandoc.Plain(line) }
end

local function summary(threads)
  local n, by, done, queued, rest = #threads, {}, 0, 0, 0
  for _, t in ipairs(threads) do
    by[t.product] = (by[t.product] or 0) + 1
    if t.disposition == "implemented" then done = done + 1
    elseif t.disposition == "queued" then queued = queued + 1
    elseif t.disposition == "untriaged" then rest = rest + 1 end
  end
  local parts = {}
  for _, p in ipairs(PRODUCTS) do
    if by[p[1]] then parts[#parts + 1] = by[p[1]] .. " " .. p[1] end
  end
  return pandoc.Para(inlines(string.format(
    "%d thread%s (%s): %d done, %d queued to an issue, %d not yet triaged.",
    n, n == 1 and "" or "s", table.concat(parts, ", "), done, queued, rest)))
end

local function has_concept(t, wanted)
  if not wanted then return true end
  for _, c in ipairs(t.concepts or {}) do
    if wanted[c] then return true end
  end
  return false
end

local function render(div)
  if not data then
    error("chronicle.lua: a .chronicle div needs the metadata field chronicle-data")
  end
  local from = div.attributes["from"] or "000000"
  local to = div.attributes["to"] or "999999"
  local only_open = div.attributes["open"] == "true"
  local wanted = nil
  if div.attributes["concept"] then
    wanted = {}
    for c in div.attributes["concept"]:gmatch("[^,%s]+") do wanted[c] = true end
  end
  local keep = function(t) return (not only_open or is_open(t)) and has_concept(t, wanted) end
  if div.attributes["flat"] == "true" then
    local all = {}
    for _, m in ipairs(data.months) do
      if m.month >= from and m.month <= to then
        for _, t in ipairs(m.threads) do
          if keep(t) then all[#all + 1] = t end
        end
      end
    end
    if #all == 0 then return pandoc.Blocks { pandoc.Para(inlines("No thread in the record yet.")) } end
    local items = {}
    for _, t in ipairs(all) do items[#items + 1] = item(t) end
    return pandoc.Blocks { summary(all), pandoc.BulletList(items) }
  end
  local blocks = pandoc.Blocks {}
  for _, m in ipairs(data.months) do
    if m.month >= from and m.month <= to then
      local threads = {}
      for _, t in ipairs(m.threads) do
        if keep(t) then threads[#threads + 1] = t end
      end
      if #threads > 0 then
        blocks:insert(pandoc.Header(2, month_name(m.month), pandoc.Attr("", { "unnumbered" })))
        blocks:insert(summary(threads))
        for _, p in ipairs(PRODUCTS) do
          local items = {}
          for _, t in ipairs(threads) do
            if t.product == p[1] then items[#items + 1] = item(t) end
          end
          if #items > 0 then
            blocks:insert(pandoc.Header(3, p[2], pandoc.Attr("", { "unnumbered" })))
            blocks:insert(pandoc.BulletList(items))
          end
        end
      end
    end
  end
  return blocks
end

local function cite(span)
  if not span.classes:includes("chat") then return nil end
  local ref = span.attributes["ref"] or ""
  local p = span.attributes["p"]
  local label = (ref:match("^%d%d%d%d%d%d%d%d_%d%d$") and "Phase Dot " or "chat ") .. ref
  if p then
    label = label .. (p:find("[-,]") and ", prompts " or ", prompt ") .. p:gsub("-", "–")
  end
  local out = pandoc.Inlines(span.content)
  out:extend { pandoc.Space(), pandoc.Str("(" .. label .. ")") }
  return out
end

-- ::: {.chronicle-totals} ::: : the record's totals in one generated paragraph (the closing chapter).
local function totals()
  local n, by, fate, first, last = 0, {}, {}, nil, nil
  for _, m in ipairs(data.months) do
    for _, t in ipairs(m.threads) do
      n = n + 1
      by[t.product] = (by[t.product] or 0) + 1
      fate[t.disposition] = (fate[t.disposition] or 0) + 1
    end
    first = first or m.month
    last = m.month
  end
  local text = string.format(
    "From %s to %s the record holds %d threads in the three products (%d on the theory, %d on the Soma Machine, %d on the compiler). "
    .. "%d are done, %d queued to an issue, %d parked, %d dropped with a reason, and %d not yet triaged. %d personal threads are counted "
    .. "and not listed, and %d practical ones are left out.",
    month_name(first), month_name(last), n, by.USF or 0, by.USM or 0, by.USC or 0,
    fate.implemented or 0, fate.queued or 0, fate.parked or 0, fate.discarded or 0, fate.untriaged or 0,
    data.private_counted or 0, data.ops_left_out or 0)
  return pandoc.Blocks { pandoc.Para(inlines(text)) }
end

return {
  { Meta = function(meta) load(meta) end },
  { Span = cite },
  { Div = function(div) if div.classes:includes("chronicle-totals") then return totals() end end },
  { Div = function(div) if div.classes:includes("chronicle") then return render(div) end end },
}
