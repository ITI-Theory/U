-- licence.lua (ISS-086): every book and paper states its copyright and licence, built from
-- registry/licences.yaml, never typed per document. The line goes into a `::: licence`
-- placeholder if the document has one (the Field Atlas colophon), else at the end of the
-- document. `licence: none` in the metadata opts out (single art pages, cheat sheets).
-- List it last among the filters, after citeproc, so it follows the references.

local stringify = pandoc.utils.stringify

local function registry()
  local dir = pandoc.path.directory(PANDOC_SCRIPT_FILE)
  local path = pandoc.path.join({ dir, '..', '..', 'registry', 'licences.yaml' })
  local f = io.open(path, 'r')
  if not f then
    error('licence.lua: cannot read ' .. path)
  end
  local text = f:read('a')
  f:close()
  return pandoc.read('---\n' .. text .. '\n---\n', 'markdown').meta
end

local function line()
  local reg = registry()
  local docs = reg.documents
  local text = reg.licences[stringify(docs.text)]
  local code = reg.licences[stringify(docs.code)]
  local values = {
    year = stringify(reg.year), holder = stringify(reg.holder),
    text_name = stringify(text.name), text_short = stringify(text.short), text_url = stringify(text.url),
    code_name = stringify(code.name), code_url = stringify(code.url),
  }
  local out = stringify(docs.line):gsub('{([%w_]+)}', function(k)
    return values[k] or error('licence.lua: unknown field {' .. k .. '} in documents.line')
  end)
  return out
end

function Pandoc(doc)
  if doc.meta.licence and stringify(doc.meta.licence) == 'none' then
    return nil
  end
  local blocks = pandoc.read(line(), 'markdown+autolink_bare_uris').blocks
  local placed = false
  doc.blocks = doc.blocks:walk({
    Div = function(div)
      if div.classes:includes('licence') then
        placed = true
        return pandoc.Div(blocks, div.attr)
      end
    end,
  })
  if not placed then
    local tail = pandoc.Blocks({ pandoc.HorizontalRule() })
    tail:extend(blocks)
    doc.blocks:insert(pandoc.Div(tail, pandoc.Attr('', { 'licence' })))
  end
  return doc
end
