#!/bin/bash

docker build -t sniff . && docker run --name sniff -dp 3002:5000 -e PORT=5000 sniff
