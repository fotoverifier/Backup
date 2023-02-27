python -m pip install -r requirements.txt

$env:FLASK_APP = "server.py"
$env:FLASK_ENV = "development"
$env:UPLOAD_FOLDER = "./"

python -m flask run --port 8080