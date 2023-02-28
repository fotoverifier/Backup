import logging
import base64
import re
import sys
import os
from flask import Flask, render_template, request, redirect, g, jsonify

from analyzer import analyze, analyze_filename, register

log = logging.getLogger(__name__)
app = Flask(__name__, static_folder='static', template_folder='templates')

def get_error_resp(msg):
  return jsonify({
    "success": False,
    "data": {
      "error": msg
    }
  })

def get_success_resp(data):
  return jsonify({
    "success": True,
    "data": data
  })

@app.errorhandler(404)
def page_not_found(e):
  return render_template('404.html'), 404

@app.route("/api/v1/filename", methods=["POST"])
def filename_input_form():
  filename = request.json.get("filename")
  if filename:
    return get_success_resp(analyze_filename(filename)), 200
  return get_error_resp("Please input filename"), 400

@app.route("/api/v1/upload_image", methods=["POST"])
def upload_image():
  if 'file' not in request.files:
    return get_error_resp("Image not found"), 400

  file = request.files["file"]
  if file.filename == '':
    return get_error_resp("File name cannot be empty"), 400

  filename = register(file)

  return get_success_resp({ "id": filename }), 200

@app.route("/api/v1/analyze", methods=["GET"])
def get_analyze_result():
  args = request.args
  analyzer_result = analyze(args.get("id"), args.get("type"))

  if type(analyzer_result) == str:
    return get_error_resp(analyzer_result), 400

  return get_success_resp(analyzer_result), 200

# @app.route("/analyze_image", methods=["GET"])
# def analyze_image_page():
#   return render_template('analyze_image.html')

# @app.route("/analyze_filename", methods=["GET"])
# def analyze_filename_page():
#   return render_template('analyze_filename.html')

@app.route("/", methods=["GET"])
def index_page():
  return render_template('analyze_filename.html')

@app.route("/about", methods=["GET"])
def about_page():
  return render_template('about.html')

if __name__ == "__main__":
  port = int(os.environ.get('PORT', 5000))
  app.run(host="0.0.0.0", port=port, debug=True)
