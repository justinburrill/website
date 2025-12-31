#!/bin/bash
source "$(dirname $0)/paths.sh" "$@"

cd "$root_path" || exit 1

# npm install sorta thing
echo "--- Checking front-end dependencies... ---"
chmod +x "$install_script_path" && "$install_script_path" "$root_path" "$deno" "$pnpm"

deno="${1:-"${deno:-'deno'}"}"
pnpm="${2:-"${pnpm:-'pnpm'}"}"

# start it!
echo "--- Starting deno server... ---"
"$qstart_script_path" "$deno" "$pnpm" 
