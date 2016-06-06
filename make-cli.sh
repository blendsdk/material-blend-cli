#!/bin/bash
reset
rm -fR dist
tsc
bin/mblend $1 $2 $3