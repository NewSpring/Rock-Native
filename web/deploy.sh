#!/bin/bash
# deploy to now
URL=$(now ./web/client/dist -e NODE_ENV=production --token ${NOW_TOKEN})
# alias to now
now --token ${NOW_TOKEN} alias set ${URL} ${TRAVIS_PULL_REQUEST_BRANCH}.now.sh
