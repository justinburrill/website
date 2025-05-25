#!/bin/bash


pnpm add -D vite

deno i
# $1 here should be the path to the front end dir
(cd $1 && pnpm i)
