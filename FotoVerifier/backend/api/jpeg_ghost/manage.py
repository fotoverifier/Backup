from algorithm import *
from image_tools import *

# save_self_tampered('singleton/f8k1fuk32.jpg', t6984, q0=50, q1=89, box=(184, 210, 274, 320))

# data/f8k1fuk32.jpg -- fake    data/zhx7p.png -- true
# data/c0ck12.jpg -- fake

def open_img(p):
    return Image.open(p).convert('RGB')


def predict_img(p, w=64):
    img = Image.open(p).convert('RGB')
    print('\t %%%%%% \t plotting inputed image \t %%%%%% \t')
    # plot(img)
    print('\t %%%%%% \t starting analisys process \t %%%%%% \t')
    result = predict(img, w)
    print('\t %%%%%% \t done \t %%%%%% \t')
    return result


def plot(image: Image):
    plt.imshow(np.array(image))
    plt.show()
