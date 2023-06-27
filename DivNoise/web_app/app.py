from flask import Flask, request, render_template, send_from_directory, send_file
from flask import Flask, session, redirect, url_for, jsonify
import os
import random
from PIL import Image
from PIL.ExifTags import TAGS
from PIL import ExifTags
import sys
#sys.path.append("/Users/mmm/Desktop/Source Camera Identification/FotoVerifier")
from noiseprint.compare_noiseprint import *
import shutil

app = Flask(__name__)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

def getEXIF(img_path):
    # Function to extract EXIF metadata from an image file
    img = Image.open(img_path)
    info_dict = {
        "Image Size": img.size,
        "Image Height": img.height,
        "Image Width": img.width,
        "Image Format": img.format,
        "Image Mode": img.mode,
        "Image is Animated": getattr(img, "is_animated", False),
        "Frames in Image": getattr(img, "n_frames", 1)
    }
    try:
        exif = { ExifTags.TAGS[k]: v for k, v in img._getexif().items() if k in ExifTags.TAGS }
        # iterating over all EXIF data fields
        for tag_id in exif:
            # get the tag name, instead of human unreadable tag id
            tag = TAGS.get(tag_id, tag_id)
            data = exif.get(tag_id)
            # decode bytes 
            if isinstance(data, bytes):
                data = data.decode()
            info_dict.update({tag: data})
    except:
        print("Error while reading image metadata...")
    return info_dict

# Cleanup function to delete images in the "images" folder
def cleanup_images():
    images_folder = os.path.join(APP_ROOT, 'images/')
    user_imgs = session.get("images")
    user_img = session.get("filename")
    if user_imgs != None:
        for filename in user_imgs:
            file_path = os.path.join(images_folder, filename)
            os.remove(file_path)

    if user_img != None:
        file_path = os.path.join(images_folder, user_img)
        os.remove(file_path)
    session["filename"] = None
    session["images"] = None

    user_query_img = session.get("query")
    user_imgs_group = session.get("group")
    if user_imgs_group != None:
        for filename in user_imgs_group:
            file_path = os.path.join(images_folder, filename)
            os.remove(file_path)

    if user_query_img != None:
        file_path = os.path.join(images_folder, user_query_img)
        os.remove(file_path)
    session["query"] = None
    session["group"] = None


# Route to handle the cleanup request
@app.route('/cleanup', methods=['POST'])
def cleanup():
    cleanup_images()
    return jsonify(message='Images cleaned up')

#index web app
@app.route("/")
def index():
    #check user session
    if not session.get('user') is None:
        print("Session already existing for the current user")
    else:
        print("New user, create session")
        session["user"] = random.random()
    return render_template("upload.html")

#upload image to the server
@app.route("/", methods=["POST"])
def upload():
    if request.method == 'POST':
        target = os.path.join(APP_ROOT, 'images/')
        #create images folder if not present
        if not os.path.isdir(target):
            os.mkdir(target)

        if(request.form.get('image_name')!=None):
            img_name = request.form.get('image_name')
            destination_folder = '/images'  # Replace with the path to the destination folder
            shutil.copy('./static/'+img_name, '.'+destination_folder)
            metadata = getEXIF('./images/'+img_name)
            session["filename"] = img_name
            session["metadata"] = metadata
            return redirect(url_for("results"))
        else:
            #save uploaded images to destination (images folder)
            if (len(request.files.getlist("file"))==1):
                for upload in request.files.getlist("file"):
                    print("The file uploaded is {}".format(upload.filename))
                    filename = upload.filename
                    
                    destination = "".join([target, filename])
                    upload.save(destination)
                    metadata = getEXIF(destination)
                    session["filename"] = filename
                    session["metadata"] = metadata
                return redirect(url_for("results"))
            elif(len(request.files.getlist("file1"))>1):
                images = []
                for upload in request.files.getlist("file1"):
                    print("The file uploaded is {}".format(upload.filename))
                    filename = upload.filename
                    destination = "".join([target, filename])
                    upload.save(destination)
                    images.append(filename)
                session["images"] = images
                return redirect(url_for("multiple"))
            elif(len(request.files.getlist("file2"))>0):
                images = []
                for upload in request.files.getlist("file2"):
                    print("The file uploaded is {}".format(upload.filename))
                    filename = upload.filename
                    destination = "".join([target, filename])
                    upload.save(destination)
                    images.append(filename)
                for query_img in request.files.getlist("file3"):
                    print("The file uploaded is {}".format(query_img.filename))
                    filename = query_img.filename
                    destination = "".join([target, filename])
                    query_img.save(destination)
                    session["query"] = filename
                session["group"] = images
                return redirect(url_for("matching"))
    return redirect(url_for("index"))


@app.route('/results')
def results():
    if session.get("filename") != None:
        return render_template("results.html", filename=session.get("filename"), metadata=session.get("metadata"), device=session.get("device"))
    else:
        return redirect(url_for("upload"))

@app.route('/multiple')
def multiple():
    if session.get("images") != None:
        k = load_noiseprints()
        crop_size = (256, 256)
        devices = analyse_images(k, img_names=session.get("images"), crop_size=crop_size)
        session["devices"] = devices
        return render_template("multiple.html", devices=session.get("devices"))
    else:
        return redirect(url_for("upload"))
    
@app.route('/images/<filename>')
def send_image(filename):
    source = "images"  # Folder where the images are stored
    return send_from_directory(source, filename)
    
@app.route('/matching')
def matching():
    if session.get("query")!=None:
        crop_size = (256, 256)
        dist = camera_matching_noiseprint(session.get("group"), session.get("query"), crop_size=crop_size)
        #pce = camera_matching_prnu(session.get("group"), session.get("query"))
        #return render_template("cam_matching.html", filename = session.get("query"), image_group=session.get("group")[0], noiseprint_distance=int(dist), prnu_distance = int(pce))
        return render_template("cam_matching.html", filename = session.get("query"), image_group=session.get("group")[0], noiseprint_distance=int(dist))
    else:
        return redirect(url_for("upload"))

@app.route('/dynamic_model', methods = ['POST'])
def dynamic_model():
    if(session.get("filename")!=None):
        k = load_noiseprints()
        crop_size = (256, 256)
        device = test(k, img_name=session.get("filename"), crop_size=crop_size)
        session["device"] = device
        return jsonify(message=device)
    else:
        return redirect(url_for("index"))


if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(host='0.0.0.0', port=3004, debug=True, use_reloader=True)