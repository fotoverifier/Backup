from flask import Flask, request, session, render_template, url_for, redirect, flash, send_file
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import os
import subprocess
import time
import hashlib
import cv2
import numpy as np
import sys
sys.path.insert(0, './copy_move')
sys.path.insert(1, './jpeg_ghost')
import localisation
import manage

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.before_request
def require_image():
    if request.method != "POST":
        return None
    if 'image' not in request.files:
        return "No image uploaded"
    file = request.files['image']
    if file.filename == '':
        return "No image uploaded"

def save_image():
    file = request.files['image']
    filename = secure_filename(str(time.time()) + "_" + file.filename)
    filepath = os.path.join("./upload", filename)
    output_path = os.path.join("./output", filename)
    file.save(filepath)
    return filepath, output_path

@app.route('/api/copy-move', methods=['POST'])
@cross_origin()
def copy_move():
    image_path, output_path = save_image()
    image = cv2.imread(image_path)
    mask, score, _ = localisation.copy_move_localisation(image)
    bin_mask = 255 * (np.uint8(mask > 0))
    masked = cv2.bitwise_and(image, image, mask=bin_mask)
    cv2.imwrite(output_path, masked)
    return send_file(output_path, mimetype="image/png")

@app.route('/api/jpeg-ghost', methods=['POST'])
@cross_origin()
def jpeg_ghost():
    image_path, output_path = save_image()
    result = manage.predict_img(image_path, w=16)
    cv2.imwrite(output_path, result)
    return send_file(output_path, mimetype="image/png")

@app.route('/api/cfa', methods=['POST'])
@cross_origin()
def cfa():
    image_path, output_path = save_image()
    subprocess.call(["python3", "./cfa/src/main.py", "-o", output_path, image_path])
    image = cv2.imread(image_path)
    mask = cv2.imread(output_path + "_inconsistent_full.png", cv2.IMREAD_GRAYSCALE)
    bin_mask = 255 * (np.uint8(mask > 0))
    masked = cv2.bitwise_and(image, image, mask=mask)
    cv2.imwrite(output_path, masked)
    return send_file(output_path, mimetype="image/png")

if __name__ == '__main__':
	app.run(host="0.0.0.0", port=8888, debug=True)