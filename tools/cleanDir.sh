#!/bin/bash

if [ -z $1 ]; then
  echo "I need a vaild folder in the Music folder."
  exit
fi

v=$1
p="/home/owner/Music/${v}"

if [ -d $v ]; then
  cd $v
  ls -al  

  for f in *; do 
    mv "$f" "$(echo "$f" | (sed -r 's/\<./\U&/g'))"; done #Cap letter after space,dash,and punc

  for f in *; do 
    mv "$f" "$(echo "$f" | (sed -r 's/_./\U&/g'))"; done #Cap letter after underscore

  for f in *; do 
    mv "$f" "$(echo "$f" | (sed 's/[ %$#_\x27\x2C=-]//g'))"; done #Remove most unwanted chars

  for f in *; do
    mv "$f" "$(echo "$f" | (sed 's/&/And/g'))"; done #swap ands
 
  for f in *; do
    mv "$f" "$(echo "$f" | (sed 's/Mp3/mp3/g'))"; done #fix extention

  
  #  Used to remove leading numbers
  for i in *; do
    mv "$i" "${i#${i%%[!0-9 ]*}}"
  done

  ls -al
  cd /home/owner/Music

else
  echo "Invalid dir.. $1"
fi











