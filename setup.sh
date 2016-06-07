#!/bin/bash
echo Updating package dependencies
npm update

if [ -n $HTTP_PROXY ]; then
    echo Setting HTTP_PROXY values
    echo proxy=$HTTP_PROXY > .typingsrc
fi

echo Installing typings
typings install
