#!/bin/bash

FILE='database.yml'
CMD='docker-compose -f '$PWD'/Docker/'$FILE' up -d'

if [[ $1 = db ]]
then
  eval $CMD
else
  echo '\nUnknown input entered.\n'
fi
