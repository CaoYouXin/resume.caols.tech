#!/usr/bin/env bash

cd webapp \
    && npm run build \
    && cd .. \
    && rm -rf ./docs/ \
    && cp -r ./webapp/build/ ./docs/ \
    && cp ./docs/index.html ./docs/404.html


    # && git checkout -- docs/CNAME \