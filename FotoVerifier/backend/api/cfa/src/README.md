
Image Forgeries detection through Mosaic Analysis: the Intermediate Values Algorithm
=======
Version 1.0.0, July 2021

# Description

Find inconsistencies in images through mosaic analysis with the Intermediate Values Algorithm.

This program is linked to the [IPOL](https://www.ipol.im) article: Image Forgeries detection through Mosaic Analysis: the Intermediate Values Algorithm.

The authors of the article are Quentin Bammey <quentin.bammey@ens-paris-saclay.fr>, Rafael Grompone <grompone@gmail.com> and Jean-Michel Morel <moreljeanmichel@gmail.com>.

Choi, C., Choi, J., & Lee, H. (2011). CFA pattern identification of digital cameras using intermediate value counting. MM&Sec '11.

# Copyright

Copyright (c) 2021 Quentin Bammey <quentin.bammey@ens-paris-saclay.fr>

# License

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <http://www.gnu.org/licenses/>

# Installation
This program can run on python 3.6 or later. Dependencies are listed in `requirements.txt` and can be installed automatically with pip. We recommend using a virtual environment to install them.

# Contents
* `main.py` is the launcher of the method, that reads the inputs, load the method and saves results.
* `intermediate_value.py` implements said method, it contains all algorithms presented in the article.
* `postprocessing.py` contains functions to add post-processing to the image, and test the method's robustness to them.
* `LICENSE.txt` contains the terms of this program's license.
* `requirements.txt` indicate the dependencies of this program
* `img.png` is a forged example image from the Trace Database: https://arxiv.org/abs/2105.02700

# Usage:

To run the program on an image `img.png` with the default parameters, simply call `./main.py img.png`. 

```bash
usage: ./main.py [-h] [-o OUT] [-W WINDOW] [-S STRIDE] [--isotropic | --bidirectional]
               [--threshold THRESHOLD] [--noise NOISE] [--gray] [--gamma GAMMA]
               [--jpeg JPEG] [--median]
               image

With the default output value `out`, this will produce the following files:
* `out_inconsistent_full.png`: final detection on the image.
* `out_inconsistent_grid.png`, `out_inconsistent_diag.png`: detections respectively on the grid patterns and diagonals.
* `out_inconsistent_full_con.png`,  `out_inconsistent_diag_con.png`, ``out_inconsistent_diag_con.png`: Confidence that each region is forged.
* `out_inconsistent_full_raw.png`, `out_inconsistent_grid_raw.png`, `out_inconsistent_diag_raw.png`: blocks whose detection do not correspond to the main pattern.
* `out_diag.png`: detected diagonals in each block.
* `out_grids.png`: detected grid patterns in each block.
* `out_diff_diag.png`, `out_diff_main.png`, `out_diff_grbg_gbrg.png`, `out_diff_rggb_bggr.png`: difference between the two compared patterns in each block.


```
# Arguments

|short|long|default|help|
| :--- | :--- | :--- | :--- |
|`-h`|`--help`||show this help message and exit|
|`-o`|`--out`|`out`|Where to store the results.|
|`-W`|`--window`|`32`|Sliding window size.|
|`-S`|`--stride`|`None`|Stride of the window. Must be a multiple of two. Smaller values yield a finer map but are more costly.|
||`--isotropic`|False|Use isotropic intermediate values (original article).|
||`--bidirectional`|True|Use bidirectional intermediate values, which usually provide better results except on images demosaiced with very simple algorithms.|
||`--threshold`|`0.1`|Detection threshold|
||`--noise`|`None`|Additive White Gaussian Noise (AWGN) of specified std|
||`--gray`||If specified, the added noise will be gray (equal in all channels)|
||`--gamma`|`None`|Gamma correction of the image.|
||`--jpeg`|`None`|Compress the image with JPEG before processing.|
||`--median`||Apply a median filter to the image before processing it.|
