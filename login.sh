#!/bin/bash
# example use:
#
# $ sh login.sh db
#
# logs into the database ec2 instance

DIRECTORY='ssh -i "'$PWD'/trip-me.pem"'

USER='ubuntu@'

LOGINDB='ec2-184-72-30-37.us-west-1.compute.amazonaws.com'

if [[ $1 = db ]]
then
  eval $DIRECTORY $USER$LOGINDB
else
  echo '\nUnknown login entered.\n'
fi