-- unicode-glyphs.lua: turn Unicode characters that text fonts often lack into
-- pandoc elements every writer handles (docs/BUILD.md, rule 3).
--   CO₂, x²  ->  Subscript / Superscript
--   ℝ, ℂ ... ->  inline math (\mathbb{R}) for LaTeX; left as text elsewhere

local sub = { ["₀"]="0", ["₁"]="1", ["₂"]="2", ["₃"]="3", ["₄"]="4", ["₅"]="5",
              ["₆"]="6", ["₇"]="7", ["₈"]="8", ["₉"]="9", ["₊"]="+", ["₋"]="-",
              ["₌"]="=", ["₍"]="(", ["₎"]=")" }
local sup = { ["⁰"]="0", ["¹"]="1", ["²"]="2", ["³"]="3", ["⁴"]="4", ["⁵"]="5",
              ["⁶"]="6", ["⁷"]="7", ["⁸"]="8", ["⁹"]="9", ["⁺"]="+", ["⁻"]="-",
              ["⁼"]="=", ["⁽"]="(", ["⁾"]=")", ["ⁿ"]="n" }
local blackboard = { ["ℝ"]="R", ["ℂ"]="C", ["ℕ"]="N", ["ℤ"]="Z", ["ℚ"]="Q" }

local function flush(out, kind, buf)
  if buf == "" then return end
  if kind == "sub" then out:insert(pandoc.Subscript(buf))
  elseif kind == "sup" then out:insert(pandoc.Superscript(buf))
  else out:insert(pandoc.Str(buf)) end
end

function Str(el)
  local text = el.text
  if not text:find("[\226\194]") then return nil end -- no candidate bytes
  local out, kind, buf, changed = pandoc.List(), "text", "", false
  for _, cp in utf8.codes(text) do
    local ch = utf8.char(cp)
    local k, v
    if sub[ch] then k, v = "sub", sub[ch]
    elseif sup[ch] then k, v = "sup", sup[ch]
    elseif blackboard[ch] and FORMAT:match("latex") then k, v = "bb", blackboard[ch]
    else k, v = "text", ch end
    if k == "bb" then
      flush(out, kind, buf); buf, kind = "", "text"
      out:insert(pandoc.Math("InlineMath", "\\mathbb{" .. v .. "}"))
      changed = true
    else
      if k ~= kind then flush(out, kind, buf); buf, kind = "", k end
      if k ~= "text" then changed = true end
      buf = buf .. v
    end
  end
  flush(out, kind, buf)
  if changed then return out end
end
