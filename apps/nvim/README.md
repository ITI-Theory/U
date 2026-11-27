# usc.nvim

Sherlock, USC (the Universal Semantic Compiler) and the Soma Machine in Neovim: the sibling of the VS
Code extension in `apps/vscode`. Its findings appear as diagnostics; it tags lines where things were said;
it opens a file's view in the Soma Machine. Help: `:help usc`.

It needs a clone of [ITI-Theory/U](https://github.com/ITI-Theory/U) (the commands run its `sherlock/`
tools) and Neovim 0.10 or later. No AI model is involved.

## Install

From the clone, with any plugin manager:

```lua
-- lazy.nvim
{ dir = "~/prj/git/ITI-Theory/U/apps/nvim", name = "usc.nvim" }
```

```vim
" vim-plug, straight from GitHub
Plug 'ITI-Theory/U', { 'rtp': 'apps/nvim' }
```

Or with no plugin manager, in `init.lua`:

```lua
vim.opt.runtimepath:append(vim.fn.expand("~/prj/git/ITI-Theory/U/apps/nvim"))
```

Then `:UscCheck` in any file of the clone. Set `$USC_U` to the clone to use the commands on files
outside it (the chats).

© Alistair Johnson. Code Apache-2.0.
