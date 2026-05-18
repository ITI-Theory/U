-- strip-keywords.lua
-- Removes the 'keywords' metadata field before LaTeX rendering.
-- Prevents pandoc from loading the hyperxmp package, which causes
-- \xmpquote errors on some TeX distributions.
-- Keywords are preserved in the source YAML for other uses (HTML, DOCX).
function Meta(m)
  m.keywords = nil
  return m
end
