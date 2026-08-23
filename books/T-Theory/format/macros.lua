local replacements = {
  ["{{check}}"] = { latex = "\\checkmark", html = "&#x2705;" },
  ["{{cross}}"] = { latex = "\\times", html = "&#x274C;" },
  ["{{eg}}"] = { latex = "\\emph{e.g.}", html = "<em>e.g.</em>" },
  ["{{ie}}"] = { latex = "\\emph{i.e.}", html = "<em>i.e.</em>" },
}

function Str(element)
  local format = FORMAT:match("html") and "html" or FORMAT:match("latex") and "latex"
  local replacement = replacements[element.text]

  if replacement and format then
    return pandoc.RawInline(format, replacement[format])
  end

  return element
end
