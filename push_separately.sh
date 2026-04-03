#!/bin/bash
# Get modified files
modified_files=$(git ls-files -m)
# Get untracked files
untracked_files=$(git ls-files --others --exclude-standard)

all_files="$modified_files
$untracked_files"

for file in $all_files; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    git add "$file"
    git commit -m "feat: update $file"
    git push origin main
  fi
done
