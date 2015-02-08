#!/bin/bash
for i in *.html; do
    sed -i 's/back\.png/..\/img\/back.png/g' $i
done
