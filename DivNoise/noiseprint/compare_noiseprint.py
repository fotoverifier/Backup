import argparse
from noiseprint.noiseprint import genNoiseprint
from noiseprint.utility.utilityRead import imread2f
from noiseprint.utility.utilityRead import jpeg_qtableinv
from noiseprint.utility.functions import cut_ctr
import numpy as np
import glob
import os
os.environ['TF_CPP_MIN_LOG_LEVEL']='2'

#import prnu
#import cv2 as cv


APP_ROOT = os.path.dirname(os.path.abspath(__file__))

def load_noiseprints():
    print("Loading noiseprints...")
    k = []
    #noiseprints_dirlist = np.array(sorted(glob.glob('../noiseprints/*')))
    # Get the list of noiseprint files
    noiseprints_dirlist = np.array(sorted(glob.glob(os.path.join(APP_ROOT, '../noiseprints/*'))))
    for noise in noiseprints_dirlist:
        k+=[np.load(noise)]
    return k

def test(k, img_name, crop_size):
    dist_values = []
    # Read and preprocess the input image
    img, mode = imread2f("./images/"+img_name, channel=1)
    img = cut_ctr(img, crop_size)
    try:
        QF = jpeg_qtableinv(strimgfilenameeam)
    except:
        QF = 200
    # Generate noiseprint for the input image
    w = [genNoiseprint(img,QF)]

    #nat_dirlist = np.array(sorted(glob.glob('../noiseprints/*')))
    # Get the list of noiseprint files and corresponding device names
    nat_dirlist = np.array(sorted(glob.glob(os.path.join(APP_ROOT, '../noiseprints/*'))))
    nat_device = np.array([i.split('_', 1)[1].rsplit('.', 1)[0] for i in nat_dirlist])

    for fingerprint_idx, fingerprint_k in enumerate(k):
        # Compute the distance between the input noiseprint and each noiseprint in the database
        dist = np.linalg.norm(fingerprint_k-w)
        dist_values.append(dist)

    # Find the device with the minimum distance (closest match)
    device = nat_device[dist_values.index(min(dist_values))]
    device = device.replace('_', ' ')
    return device

def analyse_images(k, img_names, crop_size):
    #nat_dirlist = np.array(sorted(glob.glob('../noiseprints/*')))
    # Get the list of noiseprint files and corresponding device names
    nat_dirlist = np.array(sorted(glob.glob(os.path.join(APP_ROOT, '../noiseprints/*'))))
    nat_device = np.array([i.split('_', 1)[1].rsplit('.', 1)[0] for i in nat_dirlist])
    devices = []
    for img_name in img_names:
        dist_values = []
        # Read and preprocess each input image
        img, mode = imread2f("./images/"+img_name, channel=1)
        img = cut_ctr(img, crop_size)
        try:
            QF = jpeg_qtableinv(strimgfilenameeam)
        except:
            QF = 200
        # Generate noiseprint for the input image
        w = [genNoiseprint(img,QF)]

        for fingerprint_idx, fingerprint_k in enumerate(k):
            # Compute the distance between the input noiseprint and each noiseprint in the database
            dist = np.linalg.norm(fingerprint_k-w)
            dist_values.append(dist)

        # Find the device with the minimum distance (closest match)
        device = nat_device[dist_values.index(min(dist_values))]
        device = device.replace('_', ' ')
        devices.append((img_name, device))
        
    return devices

def camera_matching_noiseprint(img_names, query, crop_size):
    #compute fingerprint of group
    noises = []
    for img_name in img_names:
        dist_values = []
        # Read and preprocess each input image
        img, mode = imread2f("./images/"+img_name, channel=1)
        img = cut_ctr(img, crop_size)
        try:
            QF = jpeg_qtableinv(strimgfilenameeam)
        except:
            QF = 200
        # Generate noiseprint for the input image
        w = genNoiseprint(img,QF)
        noises.append(w)
    fingerprint = np.average(noises, axis=0)

    #test whether the query image belongs to the same camera model
    img, mode = imread2f("./images/"+query, channel=1)
    img = cut_ctr(img, crop_size)
    try:
        QF = jpeg_qtableinv(strimgfilenameeam)
    except:
        QF = 200
    # Generate noiseprint for the query image
    w_query = genNoiseprint(img,QF)

    dist = np.linalg.norm(fingerprint-w_query)
    return dist


'''def camera_matching_prnu(img_names, query):
    imgs = []
    k = []   #fingerprints of the cameras
    for img in img_names:
        im = Image.open("./images/"+img)
        im_arr = np.asarray(im)
        if im_arr.dtype != np.uint8:
            print('Error while reading image: {}'.format(img))
            continue
        if im_arr.ndim != 3:
            print('Image is not RGB: {}'.format(img))
            continue
        im_cut = prnu.cut_ctr(im_arr, (512, 512, 3))
        imgs += [im_cut]
    k = prnu.extract_multiple_aligned(imgs, processes=cpu_count())
    k = np.stack(k, 0)

    img_query = prnu.cut_ctr(np.asarray(Image.open("./images/"+query)), (512, 512, 3))
    w = prnu.extract_single(img_query)  #w contains the noise residual of the query image
    w = np.stack(w, 0)

    cc2d = prnu.crosscorr_2d(k, w)
    prnu_pce = prnu.pce(cc2d)['pce']

    return prnu_pce'''