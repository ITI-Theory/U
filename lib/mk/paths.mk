# Shared build settings. Include from every project Makefile:
#   include <relative path>/lib/mk/paths.mk

# Recipes are POSIX sh everywhere (docs/BUILD.md). On Windows, use the sh that
# ships with Git for Windows whichever terminal make is started from;
# override GIT_USR_BIN in an ignored local.mk if Git lives elsewhere.
ifeq ($(OS),Windows_NT)
GIT_USR_BIN ?= C:/Program Files/Git/usr/bin
export PATH := $(GIT_USR_BIN);$(PATH)
SHELL := sh.exe
endif

ROOT := $(abspath $(dir $(realpath $(lastword $(MAKEFILE_LIST))))../..)
BLD := $(ROOT)/bld
PAPERS_BLD := $(BLD)/papers
BOOKS_BLD := $(BLD)/books
ATLAS_BLD := $(BLD)/atlas
TEXTBOOK_BLD := $(BLD)/textbook

PYTHON ?= python