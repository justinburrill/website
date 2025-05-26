#!/bin/bash

deno="${1:-'deno'}"

pnpm="${2:-'pnpm'}"

parent_path="$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )/.."
server_path="$parent_path/server"
frontend_path="$parent_path/frontend"
install_script_path="$server_path/install.sh"

cd $parent_path

# npm install sorta thing
echo "--- Checking front-end dependencies... ---"
chmod +x $install_script_path && $install_script_path "$parent_path" "$deno" "$pnpm"

# build frontend
echo "--- Building front-end... ---"
cd "$frontend_path" && $pnpm build && cd - || exit

# start it!
echo "--- Starting deno server... ---"
cd $server
$deno --allow-read --allow-net $parent_path/server/src/server.ts
