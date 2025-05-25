#!/bin/bash
parent_path="$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )/.."
install_script_path="$parent_path/server/install.sh"

# npm install sorta thing
echo "--- Checking front-end dependencies... ---"
[ -d "$parent_path/frontend/node_modules" ] && chmod +x $install_script_path && $install_script_path "$parent_path/frontend"

# build frontend
echo "--- Building front-end... ---"
cd "$parent_path/frontend" && pnpm run build && cd - || exit

# start it!
echo "--- Starting deno server... ---"
deno --allow-read --allow-net $parent_path/server/src/server.ts
