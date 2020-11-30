#!/bin/bash

echo What should the version be?
read VERSION

docker login
docker build -t henrikgeissler/fullstackfun:$VERSION .
docker push henrikgeissler/fullstackfun:$VERSION
ssh root@104.248.251.75 "docker pull henrikgeissler/fullstackfun:$VERSION && docker tag henrikgeissler/fullstackfun:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"