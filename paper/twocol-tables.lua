-- twocol-tables.lua
-- Pandoc Lua filter: convert longtable → table* + tabular in LaTeX output.
-- Applied when building with classoption=twocolumn (see THESIS_A4_2COL_FLAGS).
-- This runs BEFORE xelatex, so the longtable package never sees two-column mode.
--
-- Transformations:
--   \begin{longtable}[opt]{cols} → \begin{table*}\centering\begin{tabular}{cols}
--   \end{longtable}              → \end{tabular}\end{table*}
--   \endhead, \endfirsthead,
--   \endfoot, \endlastfoot       → (removed)

function RawBlock(el)
  if el.format ~= "latex" then return el end

  local t = el.text

  -- Replace \begin{longtable}[...]{cols} or \begin{longtable}{cols}
  t = t:gsub("\\begin{longtable}%[?[^{]*%]?{([^}]*)}", function(cols)
    return "\\begin{table*}\\centering\\begin{tabular}{" .. cols .. "}"
  end)

  -- Replace \end{longtable}
  t = t:gsub("\\end{longtable}", "\\end{tabular}\\end{table*}")

  -- Remove longtable section markers (now no-ops in tabular)
  t = t:gsub("\\endhead%s*\n?", "")
  t = t:gsub("\\endfirsthead%s*\n?", "")
  t = t:gsub("\\endfoot%s*\n?", "")
  t = t:gsub("\\endlastfoot%s*\n?", "")

  el.text = t
  return el
end
