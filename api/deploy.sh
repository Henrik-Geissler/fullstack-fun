#!/bin/bash

echo What should the version be?
read VERSION

IMAGE="henrikgeissler/fullstackfun:$VERSION"

docker login
docker build -t $IMAGE .
docker push $IMAGE
ssh root@104.248.251.75 "docker pull $IMAGE && docker tag $IMAGE dokku/api:$VERSION && dokku tags:deploy api $VERSION" 