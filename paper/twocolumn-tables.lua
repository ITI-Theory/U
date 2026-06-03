-- twocolumn-tables.lua
-- In twocolumn documents, LaTeX's longtable package refuses to run inside
-- a two-column environment.  This filter wraps every Table block in a
-- \onecolumn / \twocolumn pair so tables render at full page width and
-- two-column layout resumes immediately after.
-- Also wraps display-math Para blocks the same way, so wide equations get
-- the full page width instead of being squeezed into one column.
-- Safe to include in any build: the raw LaTeX blocks are no-ops in HTML/DOCX.

function Table(el)
  local before = pandoc.RawBlock('latex', '\\onecolumn')
  local after  = pandoc.RawBlock('latex', '\\twocolumn')
  return { before, el, after }
end

-- Wrap a Para that contains only display math in onecolumn/twocolumn.
function Para(el)
  if #el.content == 1 and el.content[1].t == 'Math'
      and el.content[1].mathtype == 'DisplayMath' then
    local before = pandoc.RawBlock('latex', '\\onecolumn')
    local after  = pandoc.RawBlock('latex', '\\twocolumn')
    return { before, pandoc.Para(el.content), after }
  end
end
