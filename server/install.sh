#!/bin/bash

frontend_path="$1"
pnpm_path="$2"

pnpm add -D vite

deno i
(cd $frontend_path && $pnpm_path i)
