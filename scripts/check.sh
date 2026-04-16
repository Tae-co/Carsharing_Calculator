#!/usr/bin/env bash
set -e

npm run lint 2>&1
npm run build 2>&1
npm test 2>&1
