#!/bin/bash
# deploy to now
URL=$(now ./web/client/dist -e NODE_ENV=production --npm --token ${NOW_TOKEN})
# alias to now
now --token ${NOW_TOKEN} alias set ${URL} ${TRAVIS_PULL_REQUEST_SLUG}.now.sh
