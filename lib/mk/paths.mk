# Shared build output paths. Include from any project Makefile.
ROOT := $(abspath $(dir $(realpath $(lastword $(MAKEFILE_LIST))))../..)
BLD := $(ROOT)/bld
PAPERS_BLD := $(BLD)/papers
BOOKS_BLD := $(BLD)/books
ATLAS_BLD := $(BLD)/atlas
