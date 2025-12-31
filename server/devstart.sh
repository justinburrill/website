#!/bin/bash

source "$(dirname $0)/paths.sh" "$@"


# build frontend
echo "--- Building front-end... ---"
cd "$frontend_path" && $pnpm build --minify false && cd - || exit 1
echo "--- Done building front-end ---"

# start it!
echo "--- Starting deno server... ---"
cd "$server_path" || exit 1
"$deno" --allow-write --allow-read --allow-net --allow-run "$root_path/server/src/server.ts"
