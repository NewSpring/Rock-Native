#!/bin/bash -e
# build the project
npm run web-build
# deploy to now
URL=$(now ./web --docker -e NODE_ENV=production --token ${NOW_TOKEN})
# alias to now
now --token ${NOW_TOKEN} alias set ${URL} ${TRAVIS_BRANCH}.now.sh
# respond to github with link
commit-status "success" "web-deploy" "PR deployed succesfully!" https://${TRAVIS_BRANCH}.now.sh