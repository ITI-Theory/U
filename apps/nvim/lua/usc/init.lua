-- usc.nvim (U apps/nvim; ISS-132): Sherlock, USC and the Soma Machine in Neovim, the sibling of the
-- VS Code extension (apps/vscode). Moved from U.Dot nvim/lua/sherlock.lua, which now loads this. Works inside the U repository (or any
-- folder below it):
--
--   :SherlockLoad       the ledger's findings (bld/sherlock/ledger.txt) as diagnostics
--   :SherlockQuickfix   the same findings in the quickfix list
--   :SherlockCheck      rerun the ledger (extract, judge, report; the judge takes ~20 min)
--   :SherlockReadings   sentences checked against NextKB (sherlock/readings.py check)
--   :SherlockProve [n]  ask Lean about a declaration (the name under the cursor by default):
--                       #check and #print axioms, in a terminal split; only names in the
--                       towers export (bld/sherlock/towers.json) are accepted
--   :SomaView           open the Soma Machine in the browser at this file's view: a Lean
--                       file's tower, or a document's stop
--   :SomaTower [n]      open the tower floor of a declaration (the name under the cursor)
--
--   :UscCheck           USC's findings as diagnostics (sherlock/usc.py check: tag errors, untriaged tags, open assumptions)
--   :[range]UscIdea [disp] [ref] [note]   tag the lines as an IDEA where it was said (usc_tags.ebnf;
--                       ISS-126/129): asks for what is missing; disp is queued, parked, implemented
--                       or discarded, ref an ISS-NNN, a path or a commit
--   :UscIdeas           the list of things to do from the chats (Me/chats/ideas.md)
--   :UscRecall {words}  didn't I think about ...? every thread of every chat, any state, best first, in a split
--   :UscBrowse          there was something else: what was it for, which kind, then the list; opens the chat there
--   :UscRank {0-3}      rate the thread :UscBrowse last opened (sort by cool)
--
-- The app opens on a local dev server when one runs (make app-start), else the public site.
-- On a local page a tower floor has PROVE: the MOTHER bridge (make mother-bridge) runs Lean.

local M = { app_url = "https://t-theory.org/app/", local_urls = { "http://127.0.0.1:5199/", "http://127.0.0.1:5173/" } }
local ns = vim.api.nvim_create_namespace("sherlock")

-- U itself, when the file is not inside it (a chat in Me): $USC_U or the usual place.
M.u_root = vim.env.USC_U or vim.fs.joinpath(vim.env.HOME or vim.env.USERPROFILE or "", "prj/git/ITI-Theory/U")

local function root()
  local start = vim.fn.expand("%:p:h")
  if start == "" then start = vim.fn.getcwd() end
  local found = vim.fs.find("sherlock/ledger.py", { upward = true, path = start })[1]
    or vim.fs.find("sherlock/ledger.py", { upward = true, path = vim.fn.getcwd() })[1]
  if found then return vim.fs.dirname(vim.fs.dirname(found)) end
  if vim.fn.filereadable(M.u_root .. "/sherlock/ledger.py") == 1 then return M.u_root end
  return nil
end

local function norm(p) return (vim.fs.normalize(p):gsub("\\", "/")):lower() end

-- path:line[:col]: severity: message (compiler style, as the ledger writes it)
local SEV = { error = vim.diagnostic.severity.ERROR, warning = vim.diagnostic.severity.WARN,
              note = vim.diagnostic.severity.INFO, info = vim.diagnostic.severity.INFO }

local findings = {}

local function read_findings(r)
  findings = {}
  local lines = {}
  for _, name in ipairs({ "ledger.txt", "usc.txt" }) do
    local file = r .. "/bld/sherlock/" .. name
    if vim.fn.filereadable(file) == 1 then vim.list_extend(lines, vim.fn.readfile(file)) end
  end
  local n = 0
  for _, line in ipairs(lines) do
    local f, ln, col, sev, msg = line:match("^(.-):(%d+):(%d+):%s*(%a+):%s*(.*)$")
    if not f then f, ln, sev, msg = line:match("^(.-):(%d+):%s*(%a+):%s*(.*)$") end
    if f and SEV[sev] then
      local abs = f:match("^%a:[/\\]") and f or (r .. "/" .. f)
      local key = norm(abs)
      findings[key] = findings[key] or {}
      table.insert(findings[key], { lnum = tonumber(ln) - 1, col = math.max(0, (tonumber(col) or 1) - 1),
        severity = SEV[sev], message = msg, source = "Sherlock", file = abs })
      n = n + 1
    end
  end
  return n
end

local function apply(buf)
  local name = vim.api.nvim_buf_get_name(buf)
  if name == "" then return end
  vim.diagnostic.set(ns, buf, findings[norm(name)] or {})
end

function M.load()
  local r = root()
  if not r then return vim.notify("Sherlock: not inside the U repository", vim.log.levels.WARN) end
  local n = read_findings(r)
  for _, b in ipairs(vim.api.nvim_list_bufs()) do
    if vim.api.nvim_buf_is_loaded(b) then apply(b) end
  end
  vim.notify(("Sherlock: %d findings loaded"):format(n))
end

function M.quickfix()
  local r = root()
  if not r then return end
  read_findings(r)
  local items = {}
  for _, list in pairs(findings) do
    for _, d in ipairs(list) do
      items[#items + 1] = { filename = d.file, lnum = d.lnum + 1, col = d.col + 1, text = d.message,
        type = d.severity == vim.diagnostic.severity.ERROR and "E" or "W" }
    end
  end
  vim.fn.setqflist({}, " ", { title = "Sherlock", items = items })
  vim.cmd("copen")
end

local function run(r, cmds, done)
  local i = 0
  local function step()
    i = i + 1
    if i > #cmds then return done(0) end
    vim.notify("Sherlock: " .. table.concat(cmds[i], " "))
    vim.system(cmds[i], { cwd = r, text = true }, vim.schedule_wrap(function(res)
      if res.code ~= 0 then
        vim.notify("Sherlock: failed: " .. (res.stderr or ""):sub(-400), vim.log.levels.ERROR)
        return done(res.code)
      end
      step()
    end))
  end
  step()
end

function M.check()
  local r = root()
  if not r then return end
  run(r, { { "python", "sherlock/ledger.py", "extract" }, { "python", "sherlock/ledger.py", "judge" },
           { "python", "sherlock/ledger.py", "report" } }, function(code) if code == 0 then M.load() end end)
end

function M.readings()
  local r = root()
  if not r then return end
  vim.system({ "python", "sherlock/readings.py", "check" }, { cwd = r, text = true, env = { PYTHONIOENCODING = "utf-8" } },
    vim.schedule_wrap(function(res)
      vim.cmd("botright new")
      local b = vim.api.nvim_get_current_buf()
      vim.bo[b].buftype, vim.bo[b].bufhidden, vim.bo[b].filetype = "nofile", "wipe", "markdown"
      vim.api.nvim_buf_set_lines(b, 0, -1, false, vim.split((res.stdout or "") .. (res.stderr or ""), "\n"))
    end))
end

-- the towers export: declaration name (full and short) -> module
local function towers(r)
  local file = r .. "/bld/sherlock/towers.json"
  if vim.fn.filereadable(file) == 0 then return nil end
  local ok, data = pcall(vim.json.decode, table.concat(vim.fn.readfile(file), "\n"))
  if not ok then return nil end
  local index = {}
  for _, t in ipairs(data.towers or {}) do
    for _, d in ipairs(t.declarations or {}) do
      index[d.name] = { module = t.module, full = d.name }
      local short = d.name:match("([^.]+)$")
      if not index[short] then index[short] = { module = t.module, full = d.name } end
    end
  end
  return index
end

function M.prove(name)
  local r = root()
  if not r then return end
  name = (name and name ~= "") and name or vim.fn.expand("<cWORD>"):match("[%w_.']+") or ""
  local index = towers(r)
  if not index then return vim.notify("Sherlock: no towers export (make -C sherlock towers)", vim.log.levels.WARN) end
  local hit = index[name]
  if not hit then return vim.notify("Sherlock: " .. name .. " is not in the towers export", vim.log.levels.WARN) end
  local dir = r .. "/bld/sherlock/prove"
  vim.fn.mkdir(dir, "p")
  local file = dir .. "/Prove.lean"
  vim.fn.writefile({ "import " .. hit.module, "#check @" .. hit.full, "#print axioms " .. hit.full }, file)
  vim.cmd("botright 15split")
  vim.fn.jobstart({ "lake", "env", "lean", file }, { cwd = r, term = true })
  vim.cmd("startinsert")
end

local STOP_WORDS = {
  ureter = { "ureter", "kidney stone", "stent", "colic" }, limbic = { "limbic", "amygdala", "hippocamp", "alarm", "fear" },
  thought = { "thought", "ruminat", "adhd", "mindful" }, neuron = { "neuron", "synap", "dendrit", "axon" },
  network = { "hopfield", "memory", "attractor" }, landscape = { "landscape", "basin", "theorem", "proof" },
  dyad = { "dyad", "co-regulat", "attachment", "therapist" }, score = { "music", "score", "tempo", "tensor" },
  brain = { "brain", "cortex", "cemi", "cathedral" }, body = { "body", "vagal", "heart", "breath", "somatic" },
  flight = { "cosmo", "universe", "galax", "planck" },
}

local function view_hash()
  local file = vim.fn.expand("%:p")
  if file:match("%.lean$") then
    return "voyage=landscape&tower=" .. vim.fn.expand("%:t:r")
  end
  local text = table.concat(vim.api.nvim_buf_get_lines(0, 0, -1, false), "\n"):lower()
  local best, most = "human", 0
  for stop, words in pairs(STOP_WORDS) do
    local n = 0
    for _, w in ipairs(words) do
      local s = 1
      while true do
        local a, b = text:find(w, s, true)
        if not a then break end
        n, s = n + 1, b + 1
      end
    end
    if n > most then best, most = stop, n end
  end
  return "voyage=" .. best
end

-- a local dev server if one answers (PROVE needs a local page), else the public app
local function app()
  for _, url in ipairs(M.local_urls) do
    local code = vim.fn.system({ "curl", "-s", "-o", vim.fn.has("win32") == 1 and "NUL" or "/dev/null", "-w", "%{http_code}", "--max-time", "1", url })
    if vim.v.shell_error == 0 and code:match("^2") then return url end
  end
  return M.app_url
end

function M.view()
  vim.ui.open(app() .. "#" .. view_hash())
end

function M.tower(name)
  local r = root()
  if not r then return end
  name = (name and name ~= "") and name or vim.fn.expand("<cWORD>"):match("[%w_.']+") or ""
  local index = towers(r)
  local hit = index and index[name]
  if not hit then return vim.notify("Sherlock: " .. name .. " is not in the towers export", vim.log.levels.WARN) end
  vim.ui.open(app() .. "#voyage=landscape&tower=" .. hit.module .. "&floor=" .. hit.full:match("([^.]+)$"))
end

function M.usc_check()
  local r = root()
  if not r then return vim.notify("USC: U not found (set $USC_U)", vim.log.levels.WARN) end
  vim.system({ "python", "sherlock/usc.py", "check" }, { cwd = r, text = true, env = { PYTHONIOENCODING = "utf-8" } },
    vim.schedule_wrap(function(res)
      M.load()
      vim.notify("USC: " .. vim.trim((res.stdout or ""):match("^[^\n]*") or ""))
    end))
end

local DISP = { "queued", "parked", "implemented", "discarded" }

local function slug(s)
  local words = {}
  for w in s:lower():gmatch("[%a%d]+") do
    if #words < 3 then words[#words + 1] = w end
  end
  return table.concat(words, "-")
end

-- Tag lines line1..line2 as an IDEA: a begin line above, an end line below, each alone on its line.
function M.idea(line1, line2, args)
  local disp, ref, note = args[1], args[2], table.concat(vim.list_slice(args, 3), " ")
  local function finish()
    local id = ("IDEA-%s-%s"):format(os.date("%Y%m%d"), slug(note ~= "" and note or "idea"))
    local attrs = ('id="%s" status="IDEA" disp="%s"'):format(id, disp)
    if ref and ref ~= "" and ref ~= "-" then attrs = attrs .. (' ref="%s"'):format(ref) end
    if note ~= "" then attrs = attrs .. (' note="%s"'):format(note:gsub('"', "'")) end
    vim.api.nvim_buf_set_lines(0, line2, line2, false, { ('{{usc:end id="%s"}}'):format(id) })
    vim.api.nvim_buf_set_lines(0, line1 - 1, line1 - 1, false, { "{{usc:begin " .. attrs .. "}}" })
    vim.notify("USC: tagged " .. id)
  end
  local function ask_note()
    if note ~= "" then return finish() end
    vim.ui.input({ prompt = "USC note: " }, function(v) note = v or ""; finish() end)
  end
  local function ask_ref()
    if ref or disp == "parked" or disp == "discarded" then return ask_note() end
    vim.ui.input({ prompt = "USC ref (ISS-NNN, path or commit): " }, function(v) ref = v or ""; ask_note() end)
  end
  if disp and vim.tbl_contains(DISP, disp) then return ask_ref() end
  vim.ui.select(DISP, { prompt = "USC: what becomes of it?" }, function(choice)
    if not choice then return end
    disp = choice
    ask_ref()
  end)
end

function M.ideas()
  local r = root()
  local file = r and vim.fs.normalize(r .. "/../../Me/chats/ideas.md")
  if not file or vim.fn.filereadable(file) == 0 then
    return vim.notify("USC: no ideas list (python sherlock/chats.py ideas)", vim.log.levels.WARN)
  end
  vim.cmd.edit(vim.fn.fnameescape(file))
end

-- Didn't I think about ...? (ISS-136): sherlock/usc.py recall, its answer in a scratch split.
function M.recall(words)
  local r = root()
  if not r then return vim.notify("USC: not inside the U repository (set $USC_U)", vim.log.levels.WARN) end
  if #words == 0 then return vim.notify("USC: :UscRecall WORD ...", vim.log.levels.WARN) end
  local cmd = { "python", "sherlock/usc.py", "recall" }
  vim.list_extend(cmd, words)
  local out = vim.system(cmd, { cwd = r, text = true, env = { PYTHONIOENCODING = "utf-8" } }):wait()
  local lines = vim.split((out.stdout or "") .. (out.stderr or ""), "\n", { trimempty = true })
  vim.cmd("botright new")
  local buf = vim.api.nvim_get_current_buf()
  vim.bo[buf].buftype, vim.bo[buf].bufhidden, vim.bo[buf].swapfile = "nofile", "wipe", false
  vim.api.nvim_buf_set_lines(buf, 0, -1, false, lines)
  vim.bo[buf].modifiable = false
  vim.api.nvim_buf_set_name(buf, "usc-recall: " .. table.concat(words, " "))
  return lines
end

-- I'm sure there was something else (ISS-136): narrow by product, then kind, then pick; the chat opens there.
local PRODUCT_NAMES = { USF = "the theory (USF)", USM = "the Soma Machine (USM)", USC = "the compiler (USC)",
                        Ops = "the practical (Ops)", Personal = "personal" }

function M.browse()
  local r = root()
  if not r then return vim.notify("USC: not inside the U repository (set $USC_U)", vim.log.levels.WARN) end
  local out = vim.system({ "python", "sherlock/usc.py", "browse" }, { cwd = r, text = true, env = { PYTHONIOENCODING = "utf-8" } }):wait()
  local ok, items = pcall(vim.json.decode, out.stdout or "")
  if not ok or type(items) ~= "table" then return vim.notify("USC: browse failed", vim.log.levels.ERROR) end
  local function count(key, val) local n = 0 for _, i in ipairs(items) do if i[key] == val then n = n + 1 end end return n end
  local products = {}
  for _, p in ipairs({ "USF", "USM", "USC", "Ops", "Personal" }) do
    if count("product", p) > 0 then products[#products + 1] = p end
  end
  vim.ui.select(products, { prompt = "What was it for?", format_item = function(p) return PRODUCT_NAMES[p] .. " (" .. count("product", p) .. ")" end },
    function(product)
      if not product then return end
      local kinds, seen = {}, {}
      for _, i in ipairs(items) do
        local k = i.kind:match("^queued") and "queued to an issue" or i.kind
        if i.product == product and not seen[k] then seen[k] = true; kinds[#kinds + 1] = k end
      end
      table.sort(kinds)
      vim.ui.select(kinds, { prompt = "Which kind?" }, function(kind)
        if not kind then return end
        local list = {}
        for _, i in ipairs(items) do
          local k = i.kind:match("^queued") and "queued to an issue" or i.kind
          if i.product == product and k == kind then list[#list + 1] = i end
        end
        vim.ui.select(list, { prompt = "Which one?", format_item = function(i)
          return i.date .. "  " .. i.topic .. (i.kind:match("^queued") and ("  [" .. i.kind .. "]") or "") end },
          function(it)
            if not it then return end
            M.last_item = it
            local w = vim.system({ "python", "sherlock/usc.py", "where", it.stamp, it.thread }, { cwd = r, text = true }):wait()
            local file, line = (w.stdout or ""):match("^(.+):(%d+)%s*$")
            if file then vim.cmd("edit +" .. line .. " " .. vim.fn.fnameescape(file)) end
          end)
      end)
    end)
end

-- Sort by cool (ISS-136): rate the thread :UscBrowse last opened, 0 to 3 (the picker lists the highest first).
function M.rank(n)
  local r, it = root(), M.last_item
  if not (r and it) then return vim.notify("USC: browse to a thread first (:UscBrowse)", vim.log.levels.WARN) end
  local w = vim.system({ "python", "sherlock/usc.py", "rank", it.stamp, it.thread, tostring(n) }, { cwd = r, text = true }):wait()
  vim.notify(vim.trim(w.stdout or w.stderr or ""))
end

function M.setup(opts)
  M.app_url = (opts or {}).app_url or M.app_url
  local cmd = vim.api.nvim_create_user_command
  cmd("SherlockLoad", M.load, {})
  cmd("SherlockQuickfix", M.quickfix, {})
  cmd("SherlockCheck", M.check, {})
  cmd("SherlockReadings", M.readings, {})
  cmd("SherlockProve", function(a) M.prove(a.args) end, { nargs = "?" })
  cmd("SomaView", M.view, {})
  cmd("SomaTower", function(a) M.tower(a.args) end, { nargs = "?" })
  cmd("UscCheck", M.usc_check, {})
  cmd("UscIdea", function(a) M.idea(a.line1, a.line2, a.fargs) end, { nargs = "*", range = true })
  cmd("UscIdeas", M.ideas, {})
  cmd("UscRecall", function(a) M.recall(a.fargs) end, { nargs = "+" })
  cmd("UscBrowse", M.browse, {})
  cmd("UscRank", function(a) M.rank(a.args) end, { nargs = 1, complete = function() return { "0", "1", "2", "3" } end })
  vim.api.nvim_create_autocmd("BufReadPost", {
    group = vim.api.nvim_create_augroup("sherlock", { clear = true }),
    callback = function(ev)
      if next(findings) == nil then
        local r = root()
        if r then read_findings(r) end
      end
      apply(ev.buf)
    end,
  })
end

return M
