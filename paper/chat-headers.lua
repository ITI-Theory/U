-- chat-headers.lua
-- Converts ## User [...timestamp...] and ## Assistant [...timestamp...] headings
-- into H4 (subsubsection in book class).
-- H4 is below toc-depth=1, so these never appear in the TOC.
-- The real text structure (paragraph breaks, page breaks) is preserved.
-- Styling is handled by titlesec in chat-head.tex.

function Header(el)
  if el.level ~= 2 then return nil end

  local text = pandoc.utils.stringify(el)
  local speaker
  if text:match("^User") then
    speaker = "User"
  elseif text:match("^Assistant") then
    speaker = "AI"
  else
    return nil  -- leave real H2 sections intact
  end

  local h, m = text:match("T(%d%d):(%d%d):")
  local label = h and (speaker .. " \xC2\xB7 " .. h .. ":" .. m) or speaker
  -- \xC2\xB7 = UTF-8 middle dot ·

  return pandoc.Header(4, label)
end
