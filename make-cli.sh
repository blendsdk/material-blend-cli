#!/bin/bash
tsc
cat copyright.txt \
    build/Utility.js  \
    build/BlendClient.js \
    |  uglifyjs > bin/blend-cli.js