#!/bin/bash

docker container stop sniff
docker container rm sniff
docker build -t sniff . && docker run --name sniff -dp 3002:5000 -e PORT=5000 sniff
