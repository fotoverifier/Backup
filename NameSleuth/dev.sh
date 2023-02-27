#!/bin/bash
python3 -m pip install -r requirements.txt

export FLASK_APP=server.py
export FLASK_ENV=development
export UPLOAD_FOLDER=./

python3 -m flask run --port 8080