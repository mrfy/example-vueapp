#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

cd dist

git init
git add -A 
git commit -m "New deployment"

git push -f git@github.com:mrfy/ribbon-synapstry.git master:gh-pages

cd -