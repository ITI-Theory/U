-- gallery.lua (ISS-097): lays out A Gallery of Thoughts from registry/gallery.yaml (read as
-- the document's metadata). The cover opens the book; `::: rooms` becomes the rooms, each a
-- room page (its title, its date on the programme's clock or the era's, and its text from
-- rooms/) followed by its plates, printed to the edge with a small label. The plates are
-- images rendered by lib/art/gallery.py into the format's plate-dir; their tones.json says
-- whether the label's corner is light or dark. LaTeX markup only behind a format check.

local stringify = pandoc.utils.stringify

local function is_latex()
  return FORMAT:match('latex') ~= nil
end

local function to_latex(blocks)
  return (pandoc.write(pandoc.Pandoc(blocks), 'latex'):gsub('%s+$', ''))
end

local function md_latex(text)
  return to_latex(pandoc.read(text, 'markdown').blocks)
end

local function read_file(path)
  local f = io.open(path, 'r')
  if not f then error('gallery.lua: cannot read ' .. path) end
  local s = f:read('a'); f:close(); return s
end

-- The room's ground: cream paper while the programme is drawn in pencil, night once the app's
-- pictures arrive; an era room names its own.
local function hex(r, g, b)
  return string.format('%02X%02X%02X', math.floor(r + 0.5), math.floor(g + 0.5), math.floor(b + 0.5))
end

local function ground(room)
  if room.ground then return stringify(room.ground) end
  local t = tonumber(stringify(room.t or '0'))
  local w = math.max(0, math.min(1, (t - 0.55) / 0.45))
  w = w * w * (3 - 2 * w)
  local a, b = { 0xF4, 0xF0, 0xE6 }, { 0x05, 0x08, 0x0F }
  return hex(a[1] + (b[1] - a[1]) * w, a[2] + (b[2] - a[2]) * w, a[3] + (b[3] - a[3]) * w)
end

local function ink(bg)
  local r, g, b = tonumber(bg:sub(1, 2), 16), tonumber(bg:sub(3, 4), 16), tonumber(bg:sub(5, 6), 16)
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 128 and '1C1A17' or 'ECE8E0'
end

local plate_dir, tones = nil, {}
local count = 0

local function plate(p)
  count = count + 1
  local id = stringify(p.id)
  local path = plate_dir .. '/' .. id .. '.jpg'
  local caption = stringify(p.caption or '')
  if is_latex() then
    local light = tones[id] == 'light'
    return pandoc.RawBlock('latex', string.format('\\galleryplate{%s}{%s}{%s}{%s}{%d}{%s}',
      path, light and 'F4F0E6' or '000000', light and '1C1A17' or 'ECE8E0',
      light and '0.78' or '0.55', count, md_latex(caption)))
  end
  return pandoc.Figure(pandoc.Plain({ pandoc.Image({}, path) }),
    { pandoc.Plain({ pandoc.Str(tostring(count) .. '. '), table.unpack(pandoc.read(caption, 'markdown').blocks[1].content) }) },
    { id = 'plate-' .. id })
end

local function room(r)
  local body = pandoc.read(read_file(stringify(r.file)), 'markdown').blocks
  local title, when = stringify(r.title), stringify(r.when)
  local out = {}
  if is_latex() then
    local bg = ground(r)
    table.insert(out, pandoc.RawBlock('latex', string.format('\\begin{galleryroom}{%s}{%s}{%s}{%s}',
      bg, ink(bg), md_latex(title), md_latex(when))))
    for _, b in ipairs(body) do table.insert(out, b) end
    table.insert(out, pandoc.RawBlock('latex', '\\end{galleryroom}'))
  else
    table.insert(out, pandoc.Header(1, title, { id = 'room-' .. stringify(r.id) }))
    table.insert(out, pandoc.Para({ pandoc.Emph(when) }))
    for _, b in ipairs(body) do table.insert(out, b) end
  end
  for _, p in ipairs(r.plates or {}) do table.insert(out, plate(p)) end
  return out
end

function Pandoc(doc)
  local meta = doc.meta
  plate_dir = stringify(meta['plate-dir'])
  local ok, s = pcall(read_file, plate_dir .. '/tones.json')
  if ok then tones = pandoc.json.decode(s) end
  local blocks = {}
  -- The cover: the title on the first plate; the metadata title is moved off so the template
  -- adds no title page of its own.
  local title, subtitle, author = stringify(meta.title), stringify(meta.subtitle or ''), stringify(meta.author or '')
  if is_latex() then
    local light = tones.cover == 'light'
    table.insert(blocks, pandoc.RawBlock('latex', string.format('\\gallerycover{%s}{%s}{%s}{%s}',
      plate_dir .. '/cover.jpg', md_latex(title), md_latex(subtitle), md_latex(author))))
    meta.title, meta.subtitle, meta.author = nil, nil, nil
    meta.pagetitle = title
  end
  for _, b in ipairs(doc.blocks) do
    if b.t == 'Div' and b.classes:includes('rooms') then
      for _, r in ipairs(meta.rooms) do
        for _, x in ipairs(room(r)) do table.insert(blocks, x) end
      end
    elseif b.t == 'Div' and (b.classes:includes('gallery-intro') or b.classes:includes('colophon')) and is_latex() then
      local env = b.classes:includes('colophon') and 'gallerycolophon' or 'galleryintro'
      table.insert(blocks, pandoc.RawBlock('latex', '\\begin{' .. env .. '}'))
      for _, x in ipairs(b.content) do table.insert(blocks, x) end
      table.insert(blocks, pandoc.RawBlock('latex', '\\end{' .. env .. '}'))
    else
      table.insert(blocks, b)
    end
  end
  return pandoc.Pandoc(blocks, meta)
end
