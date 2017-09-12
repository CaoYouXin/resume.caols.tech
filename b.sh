#!/usr/bin/env bash

cd webapp \
    && npm run build \
    && cd .. \
    && rm -rf ./docs/ \
    && git checkout -- docs/CNAME \
    && cp -r ./webapp/build/* ./docs/ \
    && cp ./docs/index.html ./docs/404.html