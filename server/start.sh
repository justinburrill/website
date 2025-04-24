#!/bin/bash

# build frontend
echo "--- Building front-end... ---"
cd ../frontend && pnpm run build && cd - || exit

# start it!
echo "--- Starting deno server... ---"
deno --allow-read --allow-net ./src/server.ts
