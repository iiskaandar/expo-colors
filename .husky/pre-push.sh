#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

git commit . -m 'pre-push-commit'