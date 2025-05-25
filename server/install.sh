#!/bin/bash

frontend_path="$1"
deno_path="$2"
pnpm_path="$3"

$pnpm_path add -D vite

$deno_path i
(cd $frontend_path && $pnpm_path i)
