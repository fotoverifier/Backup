from PIL import Image, IptcImagePlugin
from PIL.ExifTags import TAGS
import requests
import re
import datetime
from urllib.parse import unquote
import os
from iptc_keywords import iptc_keywords
import unicodedata
import base64
from Crypto.Util.number import bytes_to_long
import json
import cloudscraper

#for caching images
RESULT_CACHE = {}
UPLOAD_FOLDER = "./images"

#for sending requests
HEADERS = {
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
}

RE_PATTERNS = {
  "FACEBOOK_WITH_PHOTO_ID":    r'[0-9]+_[0-9]+_[0-9]+_[a-z]{1}_([0-9]+)',
  "FACEBOOK_WITHOUT_PHOTO_ID": r'[0-9]+_([0-9]+)_[0-9]+_[a-z]{1}',

  "FLICKR_ID_GROUP_1":         r'([0-9]+)_.*?_o',
  "FLICKR_ID_GROUP_2":         r'.*?_([0-9]+)_o',

  "TWITTER_PHOTO_ID":          r'([A-Za-z0-9\-]{15})[\.]*',

  "REDDIT_PHOTO_ID":           r'([a-z0-9]{13}\.)',

  "9GAG_PHOTO_ID":             r'([a-zA-Z0-9]{7})_[0-9]{3}[a-z0-9]*\.[a-z0-9]*',

  "4CHAN_PHOTO_ID":            r'([0-9]*)\.[a-zA-Z0-9]*',
}

URL_TEMPLATES = {
  "FACEBOOK_PHOTO":       "https://www.facebook.com/photo/?fbid=",

  "FLICKR_PHOTO":         "https://www.flickr.com/photo.gne?id=",

  "TWITTER_PHOTO_FIRST":  "https://pbs.twimg.com/media/",
  "TWITTER_PHOTO_SECOND": "?format=jpg",

  "REDDIT_PHOTO":         "https://www.reddit.com/search.json?q=site:redd.it+url:redd.it/",

  "9GAG_PHOTO_BACKUP":    "https://images-cdn.9gag.com/photo/",
  "9GAG_PHOTO_BACKUP_2":  "https://img-9gag-fun.9cache.com/photo/",
  "9GAG_PHOTO_BACKUP_3":  "https://miscmedia-9gag-fun.9cache.com/",
  "9GAG_PHOTO":           "https://9gag.com/gag/",

  "4CHAN_PHOTO":          "https://i.4cdn.org/"
}

def analyze(image_id, analyze_type):
  if image_id not in RESULT_CACHE:
    return "Image id not uploaded"

  if analyze_type in RESULT_CACHE[image_id]:
    return RESULT_CACHE[image_id][analyze_type]

  image = Image.open(os.path.join(UPLOAD_FOLDER, image_id))

  # Metadata
  if (analyze_type == "metadata"):
    analyze_result = {}

    # EXIF
    analyze_result["exif"] = {}
    exifdata = image.getexif()
    for tag_id in exifdata:
      if tag_id not in TAGS:
        continue
      tag = TAGS[tag_id]
      data = exifdata.get(tag_id)
      if isinstance(data, bytes):
          data = data.decode()
      analyze_result["exif"][tag] = data

    #IPTC
    analyze_result["iptc"] = {}
    iptc = IptcImagePlugin.getiptcinfo(image)
    if iptc:
      for k, v in iptc.items():
        if k[1] in iptc_keywords:
          analyze_result["iptc"][iptc_keywords[k[1]]] = v.decode()

    #XMP
    analyze_result["xmp"] = {}
    image_raw = open(os.path.join(UPLOAD_FOLDER, image_id), 'rb').read()
    xmp_start = image_raw.find(b'<x:xmpmeta')
    xmp_end = image_raw.find(b'</x:xmpmeta')
    xmp_str = image_raw[xmp_start:xmp_end+12].decode()

    matched_version = re.findall(r"x:xmptk='(.*?)'", xmp_str)

    if len(matched_version) > 0:
      analyze_result["xmp"]["version"] = matched_version[0]

    analyze_result["xmp"]["xml"] = xmp_str

  # Resolution
  elif (analyze_type == "resolution"):
    analyze_result = {
      "height": image.height,
      "width": image.width
    }

  # Facebook filename
  elif (analyze_type == "facebook_filename"):
    analyze_result = analyze_facebook_filename(image_id)

  # Flickr filename
  elif (analyze_type == "flickr_filename"):
    analyze_result = analyze_flickr_filename(image_id)

  # Twitter filename
  elif (analyze_type == "twitter_filename"):
    analyze_result = analyze_twitter_filename(image_id)

  # Reddit filename
  elif (analyze_type == "reddit_filename"):
    analyze_result = analyze_reddit_filename(image_id)

  # Reddit filename
  elif (analyze_type == "9gag_filename"):
    analyze_type = analyze_9gag_filename(image_id)

  elif (analyze_type == "4chan_filename"):
    analyze_result = analyze_4chan_filename(image_id)

  # Invalid type
  else:
    return "Invalid analyze type"

  if image_id not in RESULT_CACHE:
    return False # Image not uploaded

  RESULT_CACHE[image_id][analyze_type] = analyze_result
  print(analyze_type, analyze_result)
  return analyze_result

#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Main ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
#vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv Helper vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

#general
def register(image_file):
  if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

  filename = image_file.filename
  image_file.save(os.path.join(UPLOAD_FOLDER, filename))

  if filename not in RESULT_CACHE:
    RESULT_CACHE[filename] = {}

  return filename

def format_filename(filename):
  res = ""
  for c in filename:
    char_category = unicodedata.category(c)[0]
    if char_category != "C" and char_category != "Z": #C are control chars, Z are separator chars https://www.unicode.org/reports/tr44/#GC_Values_Table
      res += c
  return res

def cache_filename(filename):
  if filename in RESULT_CACHE:
    if 'filename' in RESULT_CACHE[filename]:
      return RESULT_CACHE[filename]['filename']
    else:
      RESULT_CACHE[filename]['filename'] = {}
  else:
    RESULT_CACHE[filename] = {}


#facebook
def analyze_facebook_filename(filename):
  analyze_result = {
    "url": "Not found"
  }

  if is_photoID_in_filename(filename):
    analyze_result = find_facebook_url_with_exposed_photoID(filename)
  else:
    analyze_result = find_facebook_url_by_bruteforce(filename)

  return analyze_result

def is_photoID_in_filename(filename):
  return len(re.findall(RE_PATTERNS["FACEBOOK_WITH_PHOTO_ID"], filename)) > 0

def find_facebook_url_with_exposed_photoID(filename):
  res = {"url": "Not found"}

  fbid = re.findall(RE_PATTERNS["FACEBOOK_WITH_PHOTO_ID"], filename)[0]
  r = requests.get(f'{URL_TEMPLATES["FACEBOOK_PHOTO"]}{fbid}', headers=HEADERS)

  find_result = find_facebook_posted_date(fbid, r.text)

  if find_result != None:
    res["url"] = f'{URL_TEMPLATES["FACEBOOK_PHOTO"]}{fbid}'
    res["posted_at"] = find_result
  return res

def find_facebook_url_by_bruteforce(filename):
  res = {
    "url": "Not found"
  }

  id = re.findall(RE_PATTERNS["FACEBOOK_WITHOUT_PHOTO_ID"], filename)
  if len(id) > 0:
    id = int(id[0])
    magics = [
      3333333,
      40001,
      5000,
      4990
    ]
    factors = [
      0,
      1, -1, 2, -2, 3, -3, 4, -4, 5, -5,
      6, -6, 7, -7, 8, -8, 9, -9, 10, -10
    ]
    for magic in magics:
      for i in factors:
        fbid = str(id + magic * i)
        print(f"Trying... {fbid}")
        url = f'{URL_TEMPLATES["FACEBOOK_PHOTO"]}{fbid}'
        r = requests.get(url, headers=HEADERS)
        if filename not in r.text:
          continue

        posted_date = find_facebook_posted_date(fbid, r.text)

        if posted_date != None:
          res["url"] = f'{URL_TEMPLATES["FACEBOOK_PHOTO"]}{fbid}'
          res["posted_at"] = posted_date

          return res

  return res

def find_facebook_posted_date(fbid, content):
  match_line = ''
  for line in content.split("\n"):
    if "creation_story" in line and fbid in line and "creation_time" in line:
      match_line = line
      break

  if match_line == '':
    return None

  res = None
  created_timestamp = re.findall(r'"creation_time":([0-9]+)', match_line)
  date = datetime.datetime.utcfromtimestamp(int(created_timestamp[0]))
  #print(date)
  res = date

  return res


#flickr
def analyze_flickr_filename(filename):
  analyze_result = {
    "url": "Not found"
  }
  matched_ids = re.findall(RE_PATTERNS["FLICKR_ID_GROUP_1"], filename) + re.findall(RE_PATTERNS["FLICKR_ID_GROUP_2"], filename)

  if len(matched_ids) > 0:
    flkrid = matched_ids[0]
    r = requests.get(f'{URL_TEMPLATES["FLICKR_PHOTO"]}{flkrid}', headers=HEADERS)
    res = find_flickr_posted_date(r.text)
    if res != None:
      analyze_result = res
      analyze_result["url"] = f'{URL_TEMPLATES["FLICKR_PHOTO"]}{flkrid}'

  return analyze_result

def find_flickr_posted_date(content):
  matched_taken_date = re.findall(r'"dateTaken":"(.*?)"', content)
  matched_posted_date = re.findall(r'"datePosted":"(.*?)"', content)

  if len(matched_posted_date) == 0:
    return None # Not posted == non-existent

  res = {
    "posted_date": datetime.datetime.utcfromtimestamp(int(matched_posted_date[0]))
  }

  if len(matched_taken_date) != 0:
    res["taken_date"] = unquote(matched_taken_date[0])

  return res

#twitter
def analyze_twitter_filename(full_filename):
  analyze_result = {
    "url": "Not found"
  }

  filename = full_filename.split('.')[0]
  #print(filename)

  url = f"{URL_TEMPLATES['TWITTER_PHOTO_FIRST']}{filename}{URL_TEMPLATES['TWITTER_PHOTO_SECOND']}"
  r = requests.get(url, headers=HEADERS)
  if (r.status_code != 200):
    return analyze_result
  else:
    analyze_result["url"] = url

  try:
    filename = filename + "=" * (16 - (len(filename) % 16))
    decoded = base64.urlsafe_b64decode(filename)
    assert len(decoded) == 11
    num = bytes_to_long(decoded)
    timestamp_bit_length = 42 - (88 - num.bit_length())
    num_bitstring = bin(num)[2:]
    TimeStamp = num_bitstring[: timestamp_bit_length]
    # MachineID = num_bitstring[timestamp_bit_length : timestamp_bit_length + 10]
    # SequenceNum = num_bitstring[timestamp_bit_length + 10 : timestamp_bit_length + 22]
    # offset = num_bitstring[timestamp_bit_length + 22 :]
    # print("TS ", TimeStamp)
    # print("MID", MachineID)
    # print("SN ", SequenceNum)
    # print("OS ", offset)

    TWITTER_EPOCH = 1288834974657
    timestamp = (int(TimeStamp, 2) + TWITTER_EPOCH)/1000
    date = datetime.datetime.utcfromtimestamp(timestamp)
    #print(date)

    analyze_result["uploaded_date"] = date
  except:
    pass

  return analyze_result

#reddit
def analyze_reddit_filename(filename):
  analyze_result = {
    "url": "Not found"
  }

  filename = re.findall(RE_PATTERNS["REDDIT_PHOTO_ID"], filename)

  if len(filename) > 0:
    filename = filename[-1]
    url = f'{URL_TEMPLATES["REDDIT_PHOTO"]}{filename}'

    r = requests.get(url, headers=HEADERS)
    while '"error": 429' in r.text:
      r = requests.get(url, headers=HEADERS)
      #print("Error retrieving results from Reddit, retrying...")

    analyze_result = find_reddit_posted_date(r.text)

  return analyze_result

def find_reddit_posted_date(content):
  res = {
    "results": [],
    "numOfResults": 0
  }
  content = json.loads(content)
  res['numOfResults'] = len(content["data"]["children"])

  for i in range(res["numOfResults"]):
    result = {
      "url": "https://www.reddit.com" + content["data"]["children"][i]["data"]["permalink"],
      "postedDate": int(content["data"]["children"][i]["data"]["created_utc"])
    }

    res['results'].append(result)

  res['results'].sort(key=lambda x: x['postedDate'])

  for i in range(res["numOfResults"]):
    res['results'][i]['postedDate'] = str(datetime.datetime.utcfromtimestamp(res['results'][i]['postedDate']))

  return res

#9gag
def analyze_9gag_filename(full_filename):
  analyze_result = {
    "url": "Not found"
  }

  filenames = re.findall(RE_PATTERNS["9GAG_PHOTO_ID"], full_filename)

  if len(filenames) > 0:
    filename = filenames[0]
    url = f'{URL_TEMPLATES["9GAG_PHOTO"]}{filename}'

    try:
      scraper = cloudscraper.create_scraper(
        browser={
          'browser': 'chrome',
          'platform': 'android',
          'desktop': False
        }
      )
      r = scraper.get(url, headers=HEADERS)
      #open("log.txt", "w").write(r.text)
      result = find_9gag_posted_date(r.text)
      if result != None:
        analyze_result = result
        analyze_result["url"] = url
      #print("Found photo info on 9GAG with conventional method, bypassed cloudflare")
    except:
      if backup_9gag(full_filename):
        analyze_result = {
          "url": url,
        }
        #print("Found by backup method, could not bypassed cloudflare version 2 captcha")
      #else:
        #print("Something is wrong.")
  #print(analyze_result)
  return analyze_result

def find_9gag_posted_date(content):
  matched_posted_date = re.findall(r'creationTs\\":([0-9])*,', content)

  if len(matched_posted_date) == 0:
    return None

  date = datetime.datetime.utcfromtimestamp(int(matched_posted_date[0]))

  res = {
    "posted_date": date
  }

  return res

def backup_9gag(full_filename):
  url = f"{URL_TEMPLATES['9GAG_PHOTO_BACKUP']}{full_filename}"
  r = requests.get(url, headers=HEADERS)
  #print(f"Trying... {url}")
  if (r.status_code == 200):
    return True


  url = f"{URL_TEMPLATES['9GAG_PHOTO_BACKUP_2']}{full_filename}"
  r = requests.get(url, headers=HEADERS)
  #print(f"Trying... {url}")
  if (r.status_code == 200):
    return True

  url = f"{URL_TEMPLATES['9GAG_PHOTO_BACKUP_3']}{full_filename}"
  r = requests.get(url, headers=HEADERS)
  #print(f"Trying... {url}")
  if (r.status_code == 200):
    return True
  return False

#4chan
def analyze_4chan_filename(full_filename):
  analyze_result = {
    "url": "Not found"
  }

  boards = ['a', 'c', 'g', 'k', 'm', 'o', 'p', 'v', 'vg', 'vm', 'vmg', 'vr', 'vrpg', 'vst', 'w', 'vip', 'qa', 'cm', 'lgbt', '3', 'adv', 'an', 'biz', 'cgl', 'ck', 'co', 'diy', 'fa', 'fit', 'gd', 'his', 'int', 'jp', 'lit', 'mlp', 'mu', 'n', 'news', 'out', 'po', 'pw', 'qst', 'sci', 'sp', 'tg', 'toy', 'trv', 'tv', 'vp', 'vt', 'wsg', 'wsr', 'x', 'xs']

  for b in boards:
    url = f"{URL_TEMPLATES['4CHAN_PHOTO']}{b}/{full_filename}"
    r = requests.get(url, headers=HEADERS)
    if (r.status_code == 200):
      analyze_result["url"] = url
      
      try:
        ts = re.findall(r'([0-9]+)\.', full_filename)
        if len(ts) > 0:
          timestamp = ts[0]
          timestamp = int(timestamp) / 1000000
          date = datetime.datetime.utcfromtimestamp(timestamp)
          analyze_result["uploaded_date"] = date
      except:
        pass

      break
      
  return analyze_result

def analyze_filename(filename):
  filename = format_filename(filename)
  cache_filename(filename)

  res = {}
  res['facebook'] = analyze_facebook_filename(filename)
  res['flickr'] = analyze_flickr_filename(filename)
  res['twitter'] = analyze_twitter_filename(filename)
  res['reddit'] = analyze_reddit_filename(filename)
  res['9gag'] = analyze_9gag_filename(filename)
  # res['4chan'] = analyze_4chan_filename(filename)

  RESULT_CACHE[filename]['filename'] = res
  return res

if __name__ == "__main__":
  filename = "319215965_671994327935328_6727973423313150380_n.jpg"
  print("facebook  ", analyze_facebook_filename(filename))

  # filename = "52559443829_c2e3e73b6b_o.jpg"
  # print("flickr    ", analyze_flickr_filename(filename))

  # filename = "Ff6NsJAWQAMJySG.jpg"
  # print("twitter   ", analyze_twitter_filename(filename))

  # filename = "vjqhgaomxt5a1.jpg"
  # print("reddit    ", analyze_reddit_filename(filename))

  # filename = "aNwYeNA_700b.jpg"
  # print("9gag      ", analyze_9gag_filename(filename))

  # filename = "1670982518930276.png"
  # print("4chan     ", analyze_4chan_filename(filename))
