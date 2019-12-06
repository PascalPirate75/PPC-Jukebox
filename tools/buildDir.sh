#!/bin/bash

#  This is use to build the list of folders for Jukebox uses buildDir.py

for d in $(find * -maxdepth 7 -type d); do echo "$d"; done > test.lst 

# the folders following test.lst are excluded add as needed

python3 buildDir.py test.lst images tools > dir.lst

rm test.lst