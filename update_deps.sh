#!/bin/bash

mydir="$(dirname "$0")"

pushd "$mydir/frontend" || exit 1
pnpm update
deno update
popd || exit 1

pushd "$mydir/server" || exit 1
deno update
popd || exit 1


