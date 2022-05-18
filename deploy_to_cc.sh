#!/bin/bash

docker pull clevercloud/clever-tools

echo 'link CC app to Travis repo'
docker run --rm --name clevercontainer -e CLEVER_TOKEN=${CLEVER_TOKEN} -e CLEVER_SECRET=${CLEVER_SECRET} -v $(pwd):/actions clevercloud/clever-tools link ${CC_APP_ID}
echo 'deploy app to CC'
docker run --rm --name clevercontainer -e CLEVER_TOKEN=${CLEVER_TOKEN} -e CLEVER_SECRET=${CLEVER_SECRET} -v $(pwd):/actions clevercloud/clever-tools deploy --alias ${CC_APP_NAME} --force
