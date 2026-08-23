# Unix Task Makefile Specification
**Document ID:** UT-MAKE-2026  
**Status:** In Production  
**Target Editor:** Neovim / Command Line  
**Authority:** GEMINI-SOMA-FIELD-OPERATOR.md [1107]

---

This document contains the source code and instructions for the zero-overhead Unix Task Makefile. By saving this specification to `/workspace/scratch/Makefile` or using the CLI targets, you can create, list, edit, and archive your [T]-Theory development tasks directly from within Neovim.

## 1. Makefile Source Code

```makefile
# [T]-THEORY RESEARCH PROGRAMME :: LOCAL TASK ENGINE
# Zero-overhead Task Management for Neovim / CLI

TASK_DIR := tasks
TASKS_MD := $(wildcard $(TASK_DIR)/*.md)

.PHONY: help list status clean

help:
	@echo "=================================================================="
	@echo " [T]-THEORY PROGRAMME :: LOCAL TASK BUILD ENGINE"
	@echo "=================================================================="
	@echo "  make create ID=xxxx TITLE=\"Your Task\"  - Initialize a new Task"
	@echo "  make list                             - List all active tasks"
	@echo "  make edit ID=xxxx                     - Open a task in Neovim"
	@echo "  make close ID=xxxx                    - Archive / Close a task"
	@echo "  make status                           - Print program metrics"
	@echo "=================================================================="

# Ensure tasks directory exists
$(TASK_DIR):
	@mkdir -p $(TASK_DIR)

# Target to create a task
create: $(TASK_DIR)
ifndef ID
	@echo "Error: Please specify task ID (e.g., ID=0002)"
	@exit 1
endif
ifndef TITLE
	@echo "Error: Please specify task TITLE (e.g., TITLE=\"Task Title\")"
	@exit 1
endif
	@if [ -f "$(TASK_DIR)/$(ID)-task.md" ]; then \
		echo "Error: Task $(ID) already exists."; \
		exit 1; \
	fi
	@echo "---" > $(TASK_DIR)/$(ID)-task.md
	@echo "type: ttheory_task" >> $(TASK_DIR)/$(ID)-task.md
	@echo "task_id: $(ID)" >> $(TASK_DIR)/$(ID)-task.md
	@echo "title: \"$(TITLE)\"" >> $(TASK_DIR)/$(ID)-task.md
	@echo "assigned_to: \"Lead Developer (Alistair)\"" >> $(TASK_DIR)/$(ID)-task.md
	@echo "ingest_date: $$(date -u +'%Y-%m-%dT%H:%M:%SZ')" >> $(TASK_DIR)/$(ID)-task.md
	@echo "status: \"Active\"" >> $(TASK_DIR)/$(ID)-task.md
	@echo "---" >> $(TASK_DIR)/$(ID)-task.md
	@echo "" >> $(TASK_DIR)/$(ID)-task.md
	@echo "# Task $(ID): $(TITLE)" >> $(TASK_DIR)/$(ID)-task.md
	@echo "" >> $(TASK_DIR)/$(ID)-task.md
	@echo "## Description & Requirements" >> $(TASK_DIR)/$(ID)-task.md
	@echo "Enter requirements here..." >> $(TASK_DIR)/$(ID)-task.md
	@echo "Task $(ID) created at $(TASK_DIR)/$(ID)-task.md"

# Target to edit a task in Neovim
edit:
ifndef ID
	@echo "Error: Please specify task ID (e.g., ID=0001)"
	@exit 1
endif
	@if [ ! -f "$(TASK_DIR)/$(ID)-task.md" ]; then \
		if [ -f "$(TASK_DIR)/task-$(ID)-operator-hardening.md" ]; then \
			nvim "$(TASK_DIR)/task-$(ID)-operator-hardening.md"; \
		elif [ -f "$(TASK_DIR)/task-$(ID)-*.md" ]; then \
			nvim $$(ls $(TASK_DIR)/task-$(ID)-*.md | head -n 1); \
		else \
			echo "Error: Task $(ID) not found."; \
			exit 1; \
		fi \
	else \
		nvim "$(TASK_DIR)/$(ID)-task.md"; \
	fi

# Target to close/complete a task
close:
ifndef ID
	@echo "Error: Please specify task ID (e.g., ID=0001)"
	@exit 1
endif
	@for file in $$(find $(TASK_DIR) -name "*$(ID)*.md"); do \
		sed -i "s/status: \"Active\"/status: \"Closed\"/g" $$file; \
		sed -i "s/status: \"Pending\"/status: \"Closed\"/g" $$file; \
		echo "Successfully marked $$file as Closed."; \
	done

# List all tasks with their current metadata
list:
	@echo "=================================================================="
	@echo "  ID   | STATUS  | TITLE "
	@echo "=================================================================="
	@for file in $$(find $(TASK_DIR) -name "*.md" | sort); do \
		id=$$(grep "task_id:" $$file | sed 's/task_id://g' | tr -d ' "'); \
		status=$$(grep "status:" $$file | sed 's/status://g' | tr -d ' "'); \
		title=$$(grep "title:" $$file | sed 's/title://g' | tr -d '"'); \
		printf "  %-4s | %-7s | %s\n" "$$id" "$$status" "$$title"; \
	done
	@echo "=================================================================="

# General status metrics
status:
	@echo "=================================================================="
	@echo " [T]-THEORY PROGRAMME STATUS REPORT"
	@echo "=================================================================="
	@echo "  Total Registered Tasks: $$(find $(TASK_DIR) -name "*.md" | wc -l)"
	@echo "  Active Tasks:           $$(grep -r "status: \"Active\"" $(TASK_DIR) | wc -l)"
	@echo "  Closed Tasks:           $$(grep -r "status: \"Closed\"" $(TASK_DIR) | wc -l)"
	@echo "=================================================================="
```

## 2. Neovim Keybinding Tips

To fully optimize your workflow with this local build engine, add these zero-overhead keybindings to your Neovim config (`init.lua` or `init.vim`):

```lua
-- Execute make list in a floating terminal
vim.keymap.set('n', '<leader>tl', ':split | terminal make list<CR>', { desc = 'List Tasks' })

-- Quick edit task (asks for ID)
vim.keymap.set('n', '<leader>te', function()
  local id = vim.fn.input('Task ID: ')
  if id ~= "" then
    vim.cmd('split | terminal make edit ID=' .. id)
  end
end, { desc = 'Edit Task' })
```
