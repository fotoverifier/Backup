import cv2
import matplotlib.pyplot as plt
import numpy as np
from localisation import copy_move_localisation

image = cv2.imread('./assets/cat_copy_src.png')
mask, score, _ = copy_move_localisation(image)
bin_mask = 255 * (np.uint8(mask > 0))
plt.imshow(bin_mask, cmap='Greys')
plt.show()

masked = cv2.bitwise_and(image, image, mask=bin_mask)

cv2.imwrite('output.png', masked)
