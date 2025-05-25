#!/bin/bash


pnpm add -D vite

deno i
(cd ../frontend/ && pnpm i)
