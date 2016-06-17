#!/bin/bash

rm -fR node_modules
rm -fR typings

echo Updating package dependencies
npm update

if [ -n "$HTTP_PROXY" ]; then
    echo Setting HTTP_PROXY values
    echo proxy=$HTTP_PROXY > .typingsrc
fi

echo Installing typings
typings install
rm -fR dist