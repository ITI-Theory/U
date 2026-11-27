-- usc.nvim: set up on load unless the user calls require("usc").setup() themselves (vim.g.usc_setup = false).
if vim.g.loaded_usc then return end
vim.g.loaded_usc = true
if vim.g.usc_setup ~= false then
  require("usc").setup()
end
