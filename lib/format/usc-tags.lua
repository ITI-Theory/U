-- usc-tags.lua: drop the {{usc:...}} tags of USC (sherlock/usc_tags.ebnf; ISS-126) from any build.
-- The Markdown reader has already parsed them (into Str, Space and, with +smart, Quoted inlines); a tag is the
-- run of inlines from a Str starting "{{usc:" to the first one ending "}}". Tags stand alone on their lines, so
-- a paragraph that held only tags disappears, and the soft break after a tag goes with it.

local function text(el) return pandoc.utils.stringify(el) end

local function strip(inlines)
  local out, inside, dropped = pandoc.List(), false, false
  for _, el in ipairs(inlines) do
    if not inside and el.t == "Str" and el.text:find("^{{%s*usc:") then
      inside, dropped = true, true
    end
    if inside then
      if text(el):find("}}$") then inside = false end
    elseif dropped and (el.t == "SoftBreak" or el.t == "Space") and #out == 0 then
      -- the line break after a leading tag
    else
      if dropped and el.t == "SoftBreak" and #out > 0 and out[#out].t == "SoftBreak" then
        -- a tag between two lines: keep one break
      else
        out:insert(el)
      end
    end
  end
  while #out > 0 and (out[#out].t == "SoftBreak" or out[#out].t == "Space") do out:remove(#out) end
  return out, dropped
end

local function block(b)
  local inl, dropped = strip(b.content)
  if not dropped then return nil end
  if #inl == 0 then return {} end
  b.content = inl
  return b
end

return { { Para = block, Plain = block } }
