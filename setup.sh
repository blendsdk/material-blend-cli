#!/bin/bash
echo Updating package dependencies
npm update

if [ -n "$HTTP_PROXY" ]; then
    echo Setting HTTP_PROXY values
    echo proxy=$HTTP_PROXY > .typingsrc
fi

echo Installing typings
typings install
rm -fR dist
curl --proxy "$HTTP_PROXY" -o ./src/Utility.ts "https://raw.githubusercontent.com/blendsdk/material-blend/master/builder/src/Utility.ts"
tsc