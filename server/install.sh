#!/bin/bash

parent_path="$1"
frontend="$parent_path/frontend"
server="$parent_path/server"

deno_path="$2"
pnpm_path="$3"

$pnpm_path add -D vite

$deno_path i
(cd $frontend && $pnpm_path i)
