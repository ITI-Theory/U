#!/usr/bin/env bash
# Upgrade build for the Lean proofs (branch lean-v4.33, worktree ../U-lean-v433).
# Run from Git Bash in the worktree root:   bash lean/upgrade-build.sh
# Everything is logged to bld/lean-upgrade.log; a summary is printed at the end.
#
# Steps: install the toolchain (elan does this automatically), resolve the new
# dependency versions, download Mathlib's prebuilt files, build every proof.
set -u -o pipefail
cd "$(dirname "$0")/.."
mkdir -p bld
LOG=bld/lean-upgrade.log
: > "$LOG"
say() { echo "== $*" | tee -a "$LOG"; }

say "toolchain: $(cat lean-toolchain)"
say "0/3 reset dependency checkouts with local edits (they are re-downloadable;"
say "    our compatibility patches are re-applied in step 1b)"
for dir in .lake/packages/*/; do
  [ -d "$dir/.git" ] || continue
  if [ -n "$(git -C "$dir" status --porcelain 2>/dev/null)" ]; then
    git -C "$dir" reset --hard -q && git -C "$dir" clean -fdq
    say "   reset $(basename "$dir")"
  fi
done

say "1/3 lake update (resolves physlib, mathlib, OSforGFF and their dependencies)"
lake update 2>&1 | tee -a "$LOG"
[ "${PIPESTATUS[0]}" -eq 0 ] || { say "lake update FAILED - see $LOG"; exit 1; }

say "1b  apply compatibility patches from lean/patches/v4.33/ (skipped if already applied)"
for patch in lean/patches/v4.33/*.patch; do
  [ -e "$patch" ] || continue
  pkg=$(basename "$patch" .patch)
  dir=".lake/packages/$pkg"
  if git -C "$dir" apply --reverse --check "$(pwd)/$patch" 2>/dev/null; then
    say "   $pkg: already applied"
  elif git -C "$dir" apply "$(pwd)/$patch"; then
    say "   $pkg: applied"
  else
    say "   $pkg: patch does not apply (upstream changed?) - see $patch"; exit 1
  fi
done

say "2/3 lake exe cache get (prebuilt Mathlib, saves hours)"
lake exe cache get 2>&1 | tee -a "$LOG" || say "cache get failed; the build will compile Mathlib from source (slow)"

say "3/3 lake build (all proof libraries)"
start=$(date +%s)
LEAN_NUM_THREADS="${LEAN_NUM_THREADS:-4}" lake build 2>&1 | tee -a "$LOG"
status=${PIPESTATUS[0]}
mins=$(( ($(date +%s) - start) / 60 ))

echo | tee -a "$LOG"
say "SUMMARY (build took ${mins} min, exit status ${status})"
grep -E "^error: " "$LOG" | sed -E 's/^error: ([^:]+):.*/\1/' | sort | uniq -c | sort -rn | tee -a "$LOG"
errors=$(grep -c -E "^error: " "$LOG")
sorries=$(grep -c "declaration uses 'sorry'" "$LOG")
say "errors: ${errors}   sorry warnings: ${sorries}"
if [ "$status" -eq 0 ]; then
  say "BUILD OK - tell Copilot; it will check the log and commit the manifest"
else
  say "BUILD FAILED - tell Copilot; it will read bld/lean-upgrade.log and fix the files listed above"
fi
exit "$status"
