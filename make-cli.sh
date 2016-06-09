#!/bin/bash
rm -fR dist
tsc
bin/mblend "$@"