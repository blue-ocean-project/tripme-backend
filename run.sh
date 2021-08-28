#!/bin/bash

if [[ $1 = tripme ]]
then
  eval pm2 start npm --name="tripme" -- run "server"
else
  echo Unknown input entered.
fi