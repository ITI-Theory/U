#!/usr/bin/env bash
# translate_queue.sh — run the full translation queue for the trilogy.
#
# Each job calls translate_papers.py with a comma-separated model fallback list.
# translate_papers rotates models on 429 and sleeps until UTC midnight when all
# daily buckets are exhausted, then resumes.  Chunk cache means restarts are
# free.  Completion is recorded in bld/.queue_state so this script is idempotent
# and can be re-run after reboot.
#
# Usage:
#   nohup bash scripts/translate_queue.sh > bld/queue.log 2>&1 &
#
set -uo pipefail
cd "$(dirname "$0")/.."

export PYTHONIOENCODING=utf-8
export PYTHONUTF8=1
export OPENAI_API_KEY="$(gh auth token)"
export OPENAI_BASE_URL="https://models.inference.ai.azure.com"

PY=/c/Users/alist/.env/Scripts/python.exe
STATE=bld/.queue_state
mkdir -p bld
touch "$STATE"

# Model rotation pool — each has its own daily bucket on GitHub Models free tier.
# Order: small/fast first, big/slow as fallback.
MODELS="gpt-4o-mini,gpt-4o,Mistral-large-2411,Meta-Llama-3.3-70B-Instruct,Phi-3.5-MoE-instruct,Cohere-command-r-plus-08-2024"

# Queue: paper-stem (translate_papers.py figures out langs by checking bld/)
# But translate_papers translates ALL three langs per invocation by default.
# So one entry per paper is enough.
QUEUE=(
  "wave-atlas-body"
  "phase-dot"
  "omnibus-body"
)

for paper in "${QUEUE[@]}"; do
  if grep -qx "$paper" "$STATE"; then
    echo "[skip] $paper already done"
    continue
  fi
  echo ""
  echo "================================================================"
  echo "[queue] starting $paper at $(date -u +%FT%TZ)"
  echo "================================================================"
  if "$PY" scripts/translate_papers.py "$paper" --model "$MODELS"; then
    echo "$paper" >> "$STATE"
    echo "[queue] DONE $paper at $(date -u +%FT%TZ)"
  else
    echo "[queue] FAILED $paper at $(date -u +%FT%TZ) — leaving for next run"
    exit 1
  fi
done

echo ""
echo "================================================================"
echo "[queue] all translations complete — building PDFs"
echo "================================================================"

# Build all translated PDFs
make wave-atlas-translations    || echo "[queue] wave-atlas PDFs partial"
make phase-dot-translations     || echo "[queue] phase-dot PDFs partial"
make omnibus-translations       || echo "[queue] omnibus PDFs partial"

echo "[queue] ALL DONE at $(date -u +%FT%TZ)"
