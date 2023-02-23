#!/usr/bin/env python3
"""
Copyright (c) 2021 Quentin Bammey <quentin.bammey@ens-paris-saclay.fr>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <http://www.gnu.org/licenses/>

This program is an implementation of
Choi, C., Choi, J., & Lee, H. (2011). CFA pattern identification of digital cameras using intermediate value counting. MM&Sec '11.

This file serves as launcher to the method, it reads the input, calls intermediate_values.py to run the method, and saves the results.
"""

import argparse
import sys
from multiprocessing import Pool  # used to speed up saving the results
from time import time

import imageio
import matplotlib as mpl
import numpy as np
import seaborn as sns
from matplotlib import pyplot as plt
from matplotlib.colors import ListedColormap
from mpl_toolkits.axes_grid1 import Size, Divider

from intermediate_values import find_forgeries
from postprocessing import (add_gaussian_noise, apply_median_filter,
                            gamma_correct, jpeg_compress)

grid_cmap_colours = ['black', '#da8bc3', '#8c8c8c', '#8172b3', '#64b5cd']
cmap_grid = ListedColormap(sns.color_palette(grid_cmap_colours).as_hex())
cmap_diag = ListedColormap(
    sns.color_palette(grid_cmap_colours[:3]).as_hex())


def get_parser():
    parser = argparse.ArgumentParser(
        description=
        "Find image inconsistencies through mosaic analysis with the Intermediate Values Algorithm."
    )
    parser.add_argument("image", type=str, help="Input image.")
    parser.add_argument("-o",
                        "--out",
                        default='out',
                        type=str,
                        help="Where to store the results.")
    parser.add_argument('-W',
                        '--window',
                        type=int,
                        default=32,
                        help="Sliding window size.")
    parser.add_argument(
        '-S',
        '--stride',
        type=int,
        default=None,
        help=
        "Stride of the window. Must be a multiple of two. Smaller values yield a finer map but are more costly."
    )

    directions = parser.add_mutually_exclusive_group()
    directions.add_argument(
        '--isotropic',
        action='store_true',
        dest='isotropic',
        help="Use isotropic intermediate values (original article).")
    directions.add_argument(
        '--bidirectional',
        action='store_false',
        dest='isotropic',
        help=
        "Use bidirectional intermediate values, which usually provide better results except on images demosaiced with very simple algorithms."
    )
    parser.set_defaults(isotropic=True)

    parser.add_argument('--threshold',
                        default=.1,
                        type=float,
                        help="Detection threshold")

    postprocessing = parser.add_argument_group(
        "Postprocessing to test the robustness of the method.")
    postprocessing.add_argument(
        "--noise",
        default=None,
        type=float,
        help="Additive White Gaussian Noise (AWGN) of specified std")
    postprocessing.add_argument(
        "--gray",
        action='store_true',
        default=False,
        help=
        "If specified, the added noise will be gray (equal in all channels)")
    postprocessing.add_argument("--gamma",
                                default=None,
                                type=float,
                                help="Gamma correction of the image.")
    postprocessing.add_argument(
        "--jpeg",
        default=None,
        type=int,
        help="Compress the image with JPEG before processing.")
    postprocessing.add_argument(
        "--median",
        action='store_true',
        default=False,
        help="Apply a median filter to the image before processing it.")
    return parser


def process_image(img, args):
    """Performs postprocessing of an image"""
    img = img[:, :, :3]
    if args.gamma is not None:
        img = gamma_correct(img, args.gamma)
    if args.median:
        img = apply_median_filter(img)
    if args.noise is not None:
        img = add_gaussian_noise(img, args.noise, args.gray)
    if args.jpeg is not None:
        img = jpeg_compress(img, args.jpeg)
    return img


def create_fig(figsize):
    """Creates a figure, axis and colorbar axis such that the main axis has the specified size after saving."""
    px = 1 / plt.rcParams['figure.dpi']
    sY, sX = figsize

    pad = sX * 0.05
    cbsz = sX * 0.05
    fig = plt.figure(figsize=((sX + pad + cbsz) * px, sY * px))

    # The first items are for padding and the second items are for the axes.
    # sizes are in inch.
    h = [Size.Fixed(0 * px), Size.Fixed(sX * px)]
    v = [Size.Fixed(0 * px), Size.Fixed(sY * px)]
    divider = Divider(fig, (0, 0, 1 - (pad + cbsz) / (sY + pad + cbsz), 1), h, v, aspect=False)
    # The width and height of the rectangle are ignored.
    ax = fig.add_axes(divider.get_position(),
                      axes_locator=divider.new_locator(nx=1, ny=1))
    h = [Size.Fixed(0 * px), Size.Fixed(cbsz * px)]
    v = [Size.Fixed(0 * px), Size.Fixed(sY * px)]
    divider = Divider(fig, (1 - (pad + cbsz) / (sX + pad + cbsz), 0, 1, 1), h, v, aspect=False)
    cax = fig.add_axes(divider.get_position(),
                       axes_locator=divider.new_locator(nx=1, ny=1))
    return fig, ax, cax


# Function to save results
def save_grid(out, grid, figsize):
    fig, ax, cax = create_fig(figsize)
    plot = ax.matshow(grid, cmap=cmap_grid, vmin=-1, vmax=3)
    cb = plt.colorbar(plot, cax=cax)
    cax.tick_params(labelsize=35)
    cb.set_ticks([-.6, .2, 1, 1.8, 2.6])
    cb.set_ticklabels(['/', 'RGGB', 'BGGR', 'GRBG', 'GBRG'])
    ax.axis('off')
    plt.savefig(out,
                bbox_inches='tight',
                pad_inches=0,
                transparent=False)


def save_diag(out, diag, figsize):
    fig, ax, cax = create_fig(figsize)
    plot = ax.matshow(diag, cmap=cmap_diag, vmin=-1, vmax=1)
    cb = plt.colorbar(plot, cax=cax)
    cax.tick_params(labelsize=35)
    cb.set_ticks([-2 / 3, 0, 2 / 3])
    cb.set_ticklabels(['/', '*GG*', 'G**G'])
    ax.axis('off')
    plt.savefig(out,
                bbox_inches='tight',
                pad_inches=0,
                transparent=False)


def save_confidence(out, conf, vmax, figsize):
    fig, ax, cax = create_fig(figsize)
    plot = ax.matshow(conf,
                      cmap='mako',
                      vmin=0,
                      vmax=vmax)
    ax.axis('off')
    cb = plt.colorbar(plot, cax=cax)
    cax.tick_params(labelsize=35)
    plt.savefig(out,
                bbox_inches='tight',
                pad_inches=0,
                transparent=False)


def save_Δ(out, diff, figsize):
    norm = mpl.colors.CenteredNorm()
    cmap = 'icefire'
    fig, ax, cax = create_fig(figsize)
    plot = ax.matshow(diff, norm=norm, cmap=cmap)
    cb = plt.colorbar(plot, cax=cax)
    cax.tick_params(labelsize=35)
    ax.axis('off')
    plt.savefig(out,
                bbox_inches='tight',
                pad_inches=0,
                transparent=False)


def main():
    # Read arguments
    t0 = time()
    parser = get_parser()
    args = parser.parse_args(sys.argv[1:])
    img = imageio.imread(args.image)
    assert img.ndim == 3
    img = process_image(img, args)  # postprocessing
    out = args.out
    W = args.window
    stride = args.stride
    if stride is None:
        stride = W // 2 - W // 2 % 2
    t1 = time()
    # Get the results
    grid, diag, main_grid, inconsistent_grid, inconsistent_diag, inconsistent_full, inconsistent_grid_con, inconsistent_diag_con, inconsistent_full_con, inconsistent_grid_raw, inconsistent_diag_raw, inconsistent_full_raw, diff, diff_diag, diff_rggb_bggr, diff_grbg_gbrg = find_forgeries(
        img,
        W=W,
        stride=stride,
        isotropic=args.isotropic,
        threshold=args.threshold)
    open(f"{out}_main_grid.txt", 'w').write(["RGGB", "BGGR", "GRBG",
                                             "GBRG"][main_grid])
    # Save the results
    png_kwargs = {'optimize': False, 'compress_level': 7}
    t2 = time()
    figsize = img.shape[:2]
    with Pool(16) as p:
        p.apply_async(save_grid, (f"{out}_grids.png", grid, figsize))
        p.apply_async(save_diag, (f"{out}_diag.png", diag, figsize))
        vmax = inconsistent_full_con.max()
        p.apply_async(save_confidence, (f"{out}_inconsistent_grid_con.png", inconsistent_grid_con, vmax, figsize))
        p.apply_async(save_confidence, (f"{out}_inconsistent_diag_con.png", inconsistent_diag_con, vmax, figsize))
        p.apply_async(save_confidence, (f"{out}_inconsistent_full_con.png", inconsistent_full_con, vmax, figsize))
        p.apply_async(save_Δ, (f"{out}_diff_main.png", diff, figsize))
        p.apply_async(save_Δ, (f"{out}_diff_diag.png", diff_diag, figsize))
        p.apply_async(save_Δ, (f"{out}_diff_grbg_gbrg.png", diff_grbg_gbrg, figsize))
        p.apply_async(save_Δ, (f"{out}_diff_rggb_bggr.png", diff_rggb_bggr, figsize))

        # Potentially post-processed input image
        # cloning into np.array is necessary if there was an alpha channel. why?
        p.apply_async(imageio.imsave, (f"{out}_input.png", np.array(img)), png_kwargs)
        # Final, thresholded detections
        p.apply_async(imageio.imsave, (f"{out}_inconsistent_full.png",
                                       (inconsistent_full * 255).astype(np.uint8)), png_kwargs)
        p.apply_async(imageio.imsave, (f"{out}_inconsistent_grid.png",
                                       (inconsistent_grid * 255).astype(np.uint8)), png_kwargs)
        p.apply_async(imageio.imsave, (f"{out}_inconsistent_diag.png",
                                       (inconsistent_diag * 255).astype(np.uint8)), png_kwargs)
        # Raw inconsistent grids
        p.apply_async(imageio.imsave, (f"{out}_inconsistent_grid_raw.png",
                                       (inconsistent_grid_raw * 255).astype(np.uint8)),
                      png_kwargs)
        p.apply_async(imageio.imsave, (f"{out}_inconsistent_diag_raw.png",
                                       (inconsistent_diag_raw * 255).astype(np.uint8)),
                      png_kwargs)
        p.apply_async(imageio.imsave, (f"{out}_inconsistent_full_raw.png",
                                       (inconsistent_full_raw * 255).astype(np.uint8)),
                      png_kwargs)
        p.close()
        p.join()
    t3 = time()
    print(
        f'Preprocessing done in {t1 - t0:.1f}s.\nAlgorithm running time: {t2 - t1:.1f}s.\nFigures saving time: {t3 - t2:.1f}s.'
    )


if __name__ == "__main__":
    main()
