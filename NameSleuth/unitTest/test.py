import requests
import json 
from datetime import datetime
import os 
import random

import sys
sys.path.append("./../")
from analyzer import analyze_facebook_filename

HEADERS = {
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
}
DOWNLOAD_LOCATION = "img\\"
FILE_FORMAT = "png"
TEST_DATA = {
    "FACEBOOK_PAGE_POST": "./facebook/page_post/data.json",
    "FACEBOOK_PAGE_COMMENT": "./facebook/page_comment/data.json",
    "FACEBOOK_GROUP_POST": "./facebook/group_post/data.json",
    "FACEBOOK_GROUP_POST_ANONYMOUS": "./facebook/group_post_anonymous/data.json",
    "FACEBOOK_GROUP_COMMENT": "./facebook/group_comment/data.json",
}
TEST_REPORT = "test_report.txt"


def download_file(url, filename):
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192): 
                f.write(chunk)

def bulk_download_files(url):
    a = requests.get(url, headers=HEADERS)
    imglist = json.loads(a.text)
    if len(imglist) > 0:
        parent_dir = os.path.dirname(os.path.realpath(__file__))
        today = datetime.now().strftime("%Y.%m.%d.%H.%M.%S")
        path = os.path.join(parent_dir, DOWNLOAD_LOCATION + today)
        if not os.path.exists(path):
            os.mkdir(path)

        counter = 1
        for img in imglist:
            print(f"Downloading... ({counter}/{len(imglist)})")
            download_file(img["download_url"], filename=f'{DOWNLOAD_LOCATION}/{today}/{img["id"]}_{img["author"]}_{img["width"]}_{img["height"]}.{FILE_FORMAT}')
            counter += 1
    else: 
        print("No images found")
    return f'{DOWNLOAD_LOCATION}/{today}/'

def test_facebook(verbose=False, output_res_to_file=False):
    #txt2json(TEST_DATA["FACEBOOK_PAGE_POST"][:-4] + "txt")
    #txt2json(TEST_DATA["FACEBOOK_PAGE_COMMENT"][:-4] + "txt")
    #txt2json(TEST_DATA["FACEBOOK_GROUP_POST"][:-4] + "txt")
    #txt2json(TEST_DATA["FACEBOOK_GROUP_COMMENT"][:-4] + "txt")
    #txt2json(TEST_DATA["FACEBOOK_GROUP_POST_ANONYMOUS"][:-4] + "txt")

    test_analyze_facebook_filename(TEST_DATA["FACEBOOK_PAGE_POST"], "Test Facebook Page Post", verbose=verbose, output_res_to_file=output_res_to_file)
    test_analyze_facebook_filename(TEST_DATA["FACEBOOK_PAGE_COMMENT"], "Test Facebook Page Comment", verbose=verbose, output_res_to_file=output_res_to_file)
    test_analyze_facebook_filename(TEST_DATA["FACEBOOK_GROUP_POST"], "Test Facebook Group Post", verbose=verbose, output_res_to_file=output_res_to_file)
    test_analyze_facebook_filename(TEST_DATA["FACEBOOK_GROUP_COMMENT"], "Test Facebook Group Comment", verbose=verbose, output_res_to_file=output_res_to_file)
    test_analyze_facebook_filename(TEST_DATA["FACEBOOK_GROUP_POST_ANONYMOUS"], "Test Facebook Group Post Anonymous", verbose=verbose, output_res_to_file=output_res_to_file)
    
def test_analyze_facebook_filename(data_path, report_str, verbose=False, output_res_to_file=False, start_at=-1, stop_at=-1):
    data = json.loads(open(data_path).readline())
    
    Time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    open(TEST_REPORT, "a").write(Time + f"  {report_str}\n") 

    count_succ = 0
    counter = 1
    for i, (k, v) in enumerate(data.items()):
        
        if start_at != -1 and i < start_at:
            continue

        if stop_at != -1 and i > stop_at:
            break
        print(f"Testing... ({counter}/{len(data.items())})")
        res = analyze_facebook_filename(k, verbose, output_res_to_file)
        counter += 1
        if res["url"] == v:
            open(TEST_REPORT, "a").write(f'\t\t{k}, {v}: Passed\n')
            count_succ += 1
            continue
        if res["url"] == "Not found":
            open(TEST_REPORT, "a").write(f'\t\t{k}, {v}: Failed: Not found\n')
            continue
        if res["url"] != v:
            open(TEST_REPORT, "a").write(f'\t\t{k}, {v}: Failed: Found {res["url"]} instead\n')
            continue
        open(TEST_REPORT, "a").write(f'\t\t{k}, {v}: Failed {res}\n')
        counter += 1
        
    open(TEST_REPORT, "a").write(f"\t\tTest completed: Passed {count_succ}/{len(data.items())}\n")

def txt2json(txt_path):
    json_data = {}
    for d in open(txt_path).readlines():
        d = d.strip().split(" ")
        json_data[d[0]] = d[1]
    
    with open(txt_path[:-3] + "json", "w") as f:
        f.write(json.dumps(json_data))

if __name__ == "__main__":
    imgFolder = bulk_download_files(f"https://picsum.photos/v2/list?page={random.randrange(1, 10)}&limit=100")
    #test_facebook(True, True)
    #print(analyze_facebook_filename("314622355_116778894561230_954534338628351257_n.jpg", True, True))

    
