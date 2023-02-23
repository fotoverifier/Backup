"""
Copyright (c) 2021 Quentin Bammey <quentin.bammey@ens-paris-saclay.fr>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <http://www.gnu.org/licenses/>

This files is the proper implementation of the method.
"""
import numpy as np
import scipy as sp
from scipy.ndimage import filters
from skimage import measure
from skimage.util import view_as_windows


def is_intermediate(img, isotropic=False):
    """
    This function implements Algorithms 1 and 2.
    It marks whether each pixel is an intermediate value.
    :input img: array-like, shape (Y, X, 3)
    :param isotropic: bool. if True, uses the originally-proposed isotropic intermediate values computation, shown in Algorithm 1. If False (default), uses bidirectional filters for computation, as shown in Algorithm 2. Bidirectional filters usually provide better results, except if the input image was demosaiced with basic algorithms such as bilinear interpolation.
    :return is_intermediate_value: float np.ndarray, shape (Y-4, X-4, 3). Values are in [0, 1]
    """

    def _is_intermediate(img, footprint):
        min_ = filters.minimum_filter(img, footprint=footprint)
        max_ = filters.maximum_filter(img, footprint=footprint)
        is_intermediate_value = (min_ <= img) * (img <= max_)
        is_intermediate_value = is_intermediate_value.astype(int)
        return is_intermediate_value[2:-2, 2:-2]

    if isotropic:
        footprint = np.array([[0, 1, 0], [1, 0, 1],
                              [0, 1, 0]])[:, :, None].astype(bool)
        is_intermediate_value = _is_intermediate(img, footprint)
    else:
        footprint_h = np.array([[1, 0, 1]])[:, :, None].astype(bool)
        intermediate_h = _is_intermediate(img, footprint_h)
        intermediate_v = _is_intermediate(img, footprint_h.transpose(1, 0, 2))
        is_intermediate_value = .5 * (intermediate_h + intermediate_v)
    return is_intermediate_value


def create_sliding_windows(x, W, stride):
    """
    Creates a sliding window view of the array, and returns the coordinates corresponding to each window.
    :param x: array-like, shape (Y, X, C)
    :return windows: np.ndarray, shape (n_windows, W, W, C)
    :return cuts_y: np.ndarray, shape (n_windows,): Y coordinate of the centre of each window
    :return cuts_x: np.ndarray, shape (n_windows,)
    """
    Y, X, C = x.shape
    windows = view_as_windows(x, (W, W, 3), stride).reshape(-1, W, W, 3)
    cuts_y = np.arange(W // 2, Y - W // 2 + 1)[::stride] - 0.5
    cuts_x = np.arange(W // 2, X - W // 2 + 1)[::stride] - 0.5
    return windows, cuts_y, cuts_x


def find_grid(x):
    """
    This function implements Algorithm 3 of the article, it can process an arbitrary number of windows simultaneously.
    Finds the diagonal and main pattern of windows.
    To use on a full image, simply add an empty dimension to it (eg. img[None])
    :param x: array-like, shape (n, W_Y, W_X, C). Intermediate value masks on each window.
    :return best_grid: np.ndarray, shape (n_windows,): Identified grid in each window. 0: RGGB, 1: BGGR, 2: GRBG, 3: GBRG, -1: no grid detected
    :return best_diag: np.ndarray, shape (n_windows,): Identified diagonal in each window. 0: *GG*, 1: G**G, -1: no grid detected
    :return Δ_grid: np.ndarray, shape (n_windows, ): Difference of count of intermediate values between the two patterns sharing the same diagonal. Negative means RGGB or GRBG is detected, positive is for BGGR or GBRG
    :return Δ_diag: np.ndarray, shape (n_windows, ): Difference of count of intermediate values between the two diagonal patterns. Negative means *GG* is detected, positive is for G**G
    :return Δ_rggb_bggr: np.ndarray, shape (n_windows, ): Difference of count of intermediate values between RGGB and BGGR. Negative means RGGB is detected, positive is for BGGR.
    :return Δ_grbg_gbrg: np.ndarray, shape (n_windows, ): Difference of count of intermediate values between GRBG and GBRG. Negative means GRBG is detected, positive is for GBRG.
    """
    n, W_Y, W_X, C = x.shape
    count_diag_xggx = np.sum(x[:, ::2, 1::2, 1], axis=(1, 2)) + np.sum(
        x[:, 1::2, ::2, 1], axis=(1, 2))
    count_diag_gxxg = np.sum(x[:, ::2, ::2, 1], axis=(1, 2)) + np.sum(
        x[:, 1::2, 1::2, 1], axis=(1, 2))
    Δ_diag = 2 * (count_diag_xggx - count_diag_gxxg) / (W_Y * W_X)
    best_diag = (Δ_diag > 0).astype(int)  # 0 if XGGX, 1 if GXXG

    count_rggb = np.sum(x[:, ::2, ::2, 0] + x[:, 1::2, 1::2, 2], axis=(1, 2))
    count_grbg = np.sum(x[:, ::2, 1::2, 0] + x[:, 1::2, ::2, 2], axis=(1, 2))
    count_gbrg = np.sum(x[:, 1::2, ::2, 0] + x[:, ::2, 1::2, 2], axis=(1, 2))
    count_bggr = np.sum(x[:, 1::2, 1::2, 0] + x[:, ::2, ::2, 2], axis=(1, 2))

    Δ_rggb_bggr = 2 / (W_Y * W_X) * (count_rggb - count_bggr)
    Δ_grbg_gbrg = 2 / (W_Y * W_X) * (count_grbg - count_gbrg)

    Δ_grid = best_diag * Δ_grbg_gbrg + (1 - best_diag) * Δ_rggb_bggr
    best_rb = (Δ_grid > 0).astype(int)  # 0: RGGB or GRBG, 1:BGGR or GBRG
    best_grid = 2 * best_diag + best_rb  # 0: RGGB, 1: BGGR, 2: GRBG, 3: GBRG

    return best_grid, best_diag, Δ_grid, Δ_diag, Δ_rggb_bggr, Δ_grbg_gbrg


def _connected_confidence(pattern, global_pattern, abs_Δ, shape):
    """
    Compute the confidence of connected components.
    :input pattern: int np.ndarray, shape (cY*cX)
    :input global_pattern: int
    :input abs_Δ: float np.ndarray, shape (cY*cX)
    :param shape: (cY, cX): int tuple
    """
    labels, n_regions = measure.label(pattern.reshape(*shape),
                                      background=global_pattern,
                                      return_num=True)
    labels = labels.ravel()
    inconsistent_con = np.zeros_like(abs_Δ)
    for i_region in range(1, n_regions + 1):
        mask = labels == i_region
        max_ = np.max(abs_Δ[mask])
        inconsistent_con[mask] = max_
    return inconsistent_con


def find_forgeries(img, W=32, stride=8, isotropic=False, threshold=.1):
    """
    This function implements Algorithm 4 of the article.
    Given an image, detects the forgeries in it.
    If the input image is of shape (Y, X, 3), all outputs are np.ndarray of shape (Y, X), with the exception of main_grid (scalar).
    Values between window centres are interpolated with nearest neighbours interpolation for discrete or binary data (grids, binary outputs) and linear interpolation for continuous data (Δ and confidences).
    :input img: array-like, shape (Y, X, 3). If Y or X are odd, one row/column will be removed at the end of the image to even the sizes.
    :param W: int, window size. Larger values will yield better estimations of each grid, at the cost of potentially missing smaller forgeries.
    :param stride: int, stride. Defines the distance between the left/top border of two successive window. A smaller value will yield a more refined map, but will require more time and memory to compute.
    :param isotropic: passed to is_intermediate.
    :param threshold: threshold on the confidence for the final detection. See Section 2.4 of the article.
    :return grid: Identified grid in each window. 0: RGGB, 1: BGGR, 2: GRBG, 3: GBRG, -1: no grid detected
    :return diag: Identified diagonal in each window. 0: *GG*, 1: G**G, -1: no grid detected
    :return main_grid: Identified grid in the whole image.
    :return inconsistent_grid, inconsistent_diag, inconsistent_full: Regions that are confidently detected as forged at the grid/diagonal/combined level. Binary output.
    :return inconsistent_grid_con, inconsistent_diag_con, inconsistent_full_con: Confidence on each pixel being part of a forged region at the grid/diagonal/combined level. Values in [0, 1], with higher values expressing a higher confidence.
    :return inconsistent_grid_raw, inconsistent_diag_raw, inconsistent_full_raw: Pixels whose detected grid/pattern/any of the two is not the one of the main image.
    :return Δ_main, Δ_diag, Δ_rggb_bggr, Δ_grbg_gbrg: see function find_grid
    """
    Y, X, C = img.shape
    img = img[:Y - Y % 2, :X - X % 2]
    intermediate = is_intermediate(img, isotropic=isotropic)
    windows, cuts_y, cuts_x = create_sliding_windows(intermediate, W, stride)

    def to_fullsize(data, method, fill=None):
        interpolator = sp.interpolate.RegularGridInterpolator(
            (cuts_y, cuts_x),
            data.reshape(len(cuts_y), len(cuts_x)),
            method=method,
            bounds_error=False,
            fill_value=fill)
        target_coords = np.asarray(
            np.meshgrid(np.arange(0, Y), np.arange(0, X)))
        result = interpolator(target_coords.reshape(2, -1).T).reshape(X, Y).T
        return result

    cuts_y += 2
    cuts_x += 2
    cY, cX = len(cuts_y), len(cuts_x)
    grid, diag, Δ_main, Δ_diag, Δ_rggb_bggr, Δ_grbg_gbrg = find_grid(windows)

    main_grid, main_diag = find_grid(intermediate[None])[:2]
    main_grid = main_grid[0]
    main_diag = main_diag[0]

    diag[Δ_diag == 0] = -1
    grid[Δ_main == 0] = -1

    # connected maximum
    inconsistent_diag_con = _connected_confidence(diag, main_diag, np.abs(Δ_diag), (cY, cX))
    inconsistent_grid_con = _connected_confidence(grid, main_grid, np.abs(Δ_main), (cY, cX))

    inconsistent_diag_raw = (diag != main_diag) * (Δ_diag != 0)

    inconsistent_grid_raw = (grid != main_grid) * (Δ_main != 0) * (Δ_diag != 0)
    inconsistent_full_raw = np.maximum(inconsistent_diag_raw,
                                       inconsistent_grid_raw)
    inconsistent_full_con = np.maximum(inconsistent_diag_con,
                                       inconsistent_grid_con)

    inconsistent_grid = inconsistent_grid_con > threshold
    inconsistent_diag = inconsistent_diag_con > threshold
    inconsistent_full = inconsistent_full_con > threshold

    grid = to_fullsize(grid, 'nearest')
    diag = to_fullsize(diag, 'nearest')
    inconsistent_grid = to_fullsize(inconsistent_grid, 'nearest', 0)
    inconsistent_diag = to_fullsize(inconsistent_diag, 'nearest', 0)
    inconsistent_full = to_fullsize(inconsistent_full, 'nearest', 0)
    inconsistent_grid_con = to_fullsize(inconsistent_grid_con, 'linear', 0)
    inconsistent_diag_con = to_fullsize(inconsistent_diag_con, 'linear', 0)
    inconsistent_full_con = to_fullsize(inconsistent_full_con, 'linear', 0)
    inconsistent_grid_raw = to_fullsize(inconsistent_grid_raw, 'nearest', 0)
    inconsistent_diag_raw = to_fullsize(inconsistent_diag_raw, 'nearest', 0)
    inconsistent_full_raw = to_fullsize(inconsistent_full_raw, 'nearest', 0)
    Δ_main = to_fullsize(Δ_main, 'linear', 0)
    Δ_rggb_bggr = to_fullsize(Δ_rggb_bggr, 'linear', 0)
    Δ_grbg_gbrg = to_fullsize(Δ_grbg_gbrg, 'linear', 0)
    Δ_diag = to_fullsize(Δ_diag, 'linear', 0)

    return grid, diag, main_grid, inconsistent_grid, inconsistent_diag, inconsistent_full, inconsistent_grid_con, inconsistent_diag_con, inconsistent_full_con, inconsistent_grid_raw, inconsistent_diag_raw, inconsistent_full_raw, Δ_main, Δ_diag, Δ_rggb_bggr, Δ_grbg_gbrg
