"""
Copyright (c) 2021 Quentin Bammey <quentin.bammey@ens-paris-saclay.fr>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <http://www.gnu.org/licenses/>

This file contains different post-processing options, that can be used to test the robustness of the algorithm.
"""

import io

import numpy as np
import PIL

from scipy.ndimage import median_filter


def add_gaussian_noise(img, σ, gray=False):
    Y, X, C = img.shape
    σ = σ / 255
    if σ < 0.:
        gray = True
        σ = -σ
    noise = np.random.normal(0, σ, (Y, X, 1 if gray else 3))
    img = img / 255 + noise
    img[img > 1] = 1
    img[img < 0] = 0
    img = (255 * img).astype(np.uint8)
    return img


def gamma_correct(img, γ):
    img = (img / 255)**(1 / γ)
    img = np.clip(img, 0, 1)
    img = (255 * img).astype(np.uint8)
    return img


def jpeg_compress(img, quality):
    pimg = PIL.Image.fromarray(img)
    out = io.BytesIO()
    pimg.save(out, format='JPEG', quality=quality)
    out.seek(0)
    result = np.array(PIL.Image.open(out))
    return result


def apply_median_filter(img):
    footprint = np.array([[0, 1, 0], [1, 1, 1], [0, 1, 0]])[:, :, None]
    return median_filter(img, footprint=footprint)
