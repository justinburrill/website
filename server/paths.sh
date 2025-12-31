#!/bin/bash

root_path="$(realpath "$(dirname "$(dirname "$0")")")"
export server_path="$root_path/server"
export frontend_path="$root_path/frontend"
export install_script_path="$server_path/install.sh"
export qstart_script_path="$server_path/quickstart.sh"

if [ -f "/home/justin/.deno/bin/deno" ]; then
    export deno="/home/justin/.deno/bin/deno"
fi

if [ -f "/home/justin/.local/share/pnpm/pnpm" ]; then
    export pnpm="/home/justin/.local/share/pnpm/pnpm"
fi