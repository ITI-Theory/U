-- narrator.lua: the narrator's script (ISS-125). A film's scenes (registry/tours/<film>.yaml, its steps `scene:`)
-- laid out for reading aloud, from registry/scenes.yaml: per scene the cue (what the screen and the music do), how to
-- say it, the words one breath to a line (a lone `/` a short pause, `//` a longer one, *a word* stressed: underlined
-- here), the hook, and the source. A running order with the time each scene takes comes first. The source page
-- holds one div:  ::: {.narration film="film-be-the-size" user="u"}  and this filter fills it.
-- Format-specific markup only behind FORMAT checks (docs/BUILD.md): LaTeX environments from the header template,
-- HTML classes otherwise.

local ROOT = "../.."
local WPM = 130

local function read_meta(path)
  local f = io.open(path, "rb")
  if not f then error("missing " .. path) end
  local s = f:read("*a")
  f:close()
  return pandoc.read("---\n" .. s .. "\n---\n", "markdown").meta
end

local S = pandoc.utils.stringify
local latex = FORMAT:match("latex")

local function raw(tex) return latex and pandoc.RawBlock("latex", tex) or nil end

-- an environment in LaTeX, a classed div elsewhere
local function box(class, blocks)
  if latex then
    local out = { pandoc.RawBlock("latex", "\\begin{" .. class .. "}") }
    for _, b in ipairs(blocks) do out[#out + 1] = b end
    out[#out + 1] = pandoc.RawBlock("latex", "\\end{" .. class .. "}")
    return out
  end
  return { pandoc.Div(blocks, { class = class }) }
end

-- the reading marks: a pause is a grey stroke, a stressed word underlined
local function marked(inlines)
  return pandoc.Inlines(inlines):walk({
    Str = function(s)
      if s.text == "/" or s.text == "//" then
        if latex then return pandoc.RawInline("latex", s.text == "/" and "\\pausemark{}" or "\\longpause{}") end
        return pandoc.Span({ pandoc.Str(s.text) }, { class = s.text == "/" and "pause" or "long-pause" })
      end
    end,
    Emph = function(e) return pandoc.Underline(e.content) end,
  })
end

-- the words as breath lines: each source line one line here (pandoc reads them as soft breaks)
local function breath_lines(value)
  local lines, cur = {}, {}
  local function flush() if #cur > 0 then lines[#lines + 1] = marked(cur); cur = {} end end
  for _, b in ipairs(value) do
    if b.t == "Para" or b.t == "Plain" then
      for _, el in ipairs(b.content) do
        if el.t == "SoftBreak" or el.t == "LineBreak" then flush() else cur[#cur + 1] = el end
      end
      flush()
    end
  end
  return lines
end

local function words_of(value)
  local n = 0
  for w in S(value):gsub("(%s)/+(%s)", "%1%2"):gmatch("%S+") do
    if w ~= "/" and w ~= "//" then n = n + 1 end
  end
  return n
end

local function title_of(id)
  local t = id:gsub("%-", " ")
  return t:sub(1, 1):upper() .. t:sub(2)
end

local function labelled(label, value)
  local inl = { pandoc.Strong({ pandoc.Str(label) }), pandoc.Space() }
  for _, el in ipairs(pandoc.Inlines(value)) do inl[#inl + 1] = el end
  return pandoc.Para(inl)
end

-- a hook line's lead: "Q" or "A" on its first line, the same width blank on the second
local function lead(letter, i)
  if i == 1 then return pandoc.Span({ pandoc.Strong({ pandoc.Str(letter) }), pandoc.Space() }) end
  if latex then return pandoc.RawInline("latex", "\\phantom{\\textbf{" .. letter .. "}}\\ ") end
  return pandoc.Span({ pandoc.Str("\u{2003}") })
end

local function seconds(n) return math.floor(n / WPM * 60 + 0.5) end
local function clock(s) return string.format("%d:%02d", math.floor(s / 60), math.floor(s % 60)) end

local function narration(div)
  local film = div.attributes.film
  local user = div.attributes.user or "u"
  local tour = read_meta(ROOT .. "/registry/tours/" .. film .. ".yaml")
  local scenes = {}
  for _, sc in ipairs(read_meta(ROOT .. "/registry/scenes.yaml").scenes) do scenes[S(sc.id)] = sc end
  local act_of = {}
  for _, act in ipairs(tour.acts or {}) do
    for _, id in ipairs(act.scenes) do act_of[S(id)] = S(act.title) end
  end
  local out, rows, total = {}, {}, 0
  local order = {}
  for k, step in ipairs(tour.steps) do
    local id = S(step.scene)
    local sc = scenes[id] or error("no scene " .. id)
    local w = sc[user]
    if type(w) ~= "table" or not w.say then error("scene " .. id .. " has no words for " .. user) end
    local n = words_of(w.say)
    local speak = seconds(n)
    local pause = tonumber(S(step.pause or "4")) or 4
    order[#order + 1] = { k = k, id = id, sc = sc, w = w, n = n, speak = speak, pause = pause, act = act_of[id] or "" }
    rows[#rows + 1] = { { pandoc.Plain({ pandoc.Str(tostring(k)) }) }, { pandoc.Plain({ pandoc.Str(title_of(id)) }) },
      { pandoc.Plain({ pandoc.Str(act_of[id] or "") }) }, { pandoc.Plain({ pandoc.Str(tostring(n)) }) },
      { pandoc.Plain({ pandoc.Str(clock(speak)) }) }, { pandoc.Plain({ pandoc.Str(clock(total)) }) } }
    total = total + 1.5 + speak + pause
  end
  -- the running order
  out[#out + 1] = pandoc.Header(1, { pandoc.Str("The running order") }, { class = "unnumbered" })
  out[#out + 1] = pandoc.Para({ pandoc.Str(string.format("%d scenes, about %s in all: the speaking time at %d words a minute, a breath before each scene and its pause after. Your own pace sets the film's: once a scene is recorded, its take times it.", #order, clock(total), WPM)) })
  local head = { { pandoc.Plain({ pandoc.Str("#") }) }, { pandoc.Plain({ pandoc.Str("Scene") }) }, { pandoc.Plain({ pandoc.Str("Act") }) },
    { pandoc.Plain({ pandoc.Str("Words") }) }, { pandoc.Plain({ pandoc.Str("Speaking") }) }, { pandoc.Plain({ pandoc.Str("Starts") }) } }
  out[#out + 1] = pandoc.utils.from_simple_table(pandoc.SimpleTable({}, { "AlignRight", "AlignLeft", "AlignLeft", "AlignRight", "AlignRight", "AlignRight" },
    { 0, 0, 0, 0, 0, 0 }, head, rows))
  -- the scenes, one to a page
  local act = nil
  for _, o in ipairs(order) do
    local b = {}
    if latex then b[#b + 1] = raw("\\clearpage") end
    if o.act ~= act then
      act = o.act
      b[#b + 1] = pandoc.Para({ pandoc.SmallCaps({ pandoc.Str(act) }) })
    end
    b[#b + 1] = pandoc.Header(2, { pandoc.Str(string.format("%d. %s", o.k, title_of(o.id))) }, { class = "unnumbered" })
    b[#b + 1] = pandoc.Para({ pandoc.Emph({ pandoc.Str(string.format("About %s spoken (%d words), then a pause of %d s. Label: %s.", clock(o.speak), o.n, o.pause, S(o.w.label))) }) })
    local cue = {}
    if o.w.cue and o.w.cue.screen then cue[#cue + 1] = labelled("SCREEN", o.w.cue.screen) end
    if o.w.cue and o.w.cue.music then cue[#cue + 1] = labelled("MUSIC", o.w.cue.music) end
    if o.sc.poke then cue[#cue + 1] = labelled("EVENT", { pandoc.Str("the poke (" .. S(o.sc.poke) .. ")") }) end
    if #cue > 0 then for _, x in ipairs(box("cuebox", cue)) do b[#b + 1] = x end end
    if o.w.how then for _, x in ipairs(box("howbox", { labelled("HOW", o.w.how) })) do b[#b + 1] = x end end
    for _, x in ipairs(box("words", { pandoc.LineBlock(breath_lines(o.w.say)) })) do b[#b + 1] = x end
    if o.w.hook then
      local h = { pandoc.Para({ pandoc.Strong({ pandoc.Str("THE HOOK") }), pandoc.Space(), pandoc.Emph({ pandoc.Str("its own take, after the words: spoken, then half-sung, then sung (Me/music/hook.py)") }) }) }
      local lines = {}
      for i, q in ipairs(o.w.hook.question) do lines[#lines + 1] = { lead("Q", i), table.unpack(pandoc.Inlines(q)) } end
      for i, a in ipairs(o.w.hook.answer) do lines[#lines + 1] = { lead("A", i), table.unpack(pandoc.Inlines(a)) } end
      h[#h + 1] = pandoc.LineBlock(lines)
      for _, x in ipairs(box("hookbox", h)) do b[#b + 1] = x end
    end
    if o.w.source then for _, x in ipairs(box("sourcenote", { labelled("Source.", o.w.source) })) do b[#b + 1] = x end end
    for _, x in ipairs(b) do out[#out + 1] = x end
  end
  return out
end

return { { Div = function(div) if div.classes:includes("narration") then return narration(div) end end } }
