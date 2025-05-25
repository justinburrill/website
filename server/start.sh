#!/bin/bash
parent_path="$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )/.."

# npm install sorta thing
[ -d "$parent_path/frontend/node_modules" ] && ./install.sh

# build frontend
echo "--- Building front-end... ---"
cd "$parent_path/frontend" && pnpm run build && cd - || exit

# start it!
echo "--- Starting deno server... ---"
deno --allow-read --allow-net ./src/server.ts
