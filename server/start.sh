#!/bin/bash
parent_path="$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )/.."

# npm install sorta thing
echo "--- Checking front-end dependencies... ---"
[ -d "$parent_path/frontend/node_modules" ] && $parent_path/server/install.sh

# build frontend
echo "--- Building front-end... ---"
cd "$parent_path/frontend" && pnpm run build && cd - || exit

# start it!
echo "--- Starting deno server... ---"
deno --allow-read --allow-net $parent_path/server/src/server.ts
