/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { reshape, std, mean, transpose } from 'mathjs';
import Numjs from '../Numjs';
import Image from '../Image';
/** *************************** */
/** ***** Main Functions ****** */
/** *************************** */
const njs = new Numjs();
const image = new Image();

class CFAArtifact {
  constructor(method) {
    this.method = method;
  }

  CFATamperDetection(w2 = 1) {
    let w1 = w2;
    w1 = 1;
    const { cv } = window;

    const src = cv.imread('originalImage');
    let imgPxArray = image.arrayFromMat(src);
    const std_thresh = 5;
    const depth = 1;

    const dimOne = njs.getDimensions([...imgPxArray]);
    const limitCol = Number(Math.round(Math.floor(dimOne[1] / 2 ** depth)) * 2 ** depth);
    const limitRow = Number(Math.round(Math.floor(dimOne[0] / 2 ** depth)) * 2 ** depth);
    imgPxArray = imgPxArray.slice(0, limitRow);
    const dimTwo = njs.getDimensions([...imgPxArray]);

    for (let i = 0; i < dimTwo[0]; i += 1) {
      imgPxArray[i] = [...imgPxArray][i].slice(0, limitCol);
    }

    const small_cfa_list = new Array([
      [
        [2, 1],
        [3, 2],
      ],
      [
        [2, 3],
        [1, 2],
      ],
      [
        [3, 2],
        [2, 1],
      ],
      [
        [1, 2],
        [2, 3],
      ],
    ]);
    const small_cfa_list_shape = njs.getDimensions([...small_cfa_list][0]); // [row, col]
    const cfa_list = [...small_cfa_list];
    const cfa_list_shape = [...small_cfa_list_shape];

    // eslint-disable-next-line no-param-reassign
    w1 = Number(w1);
    const dimThree = njs.getDimensions([...imgPxArray]);
    let f1_map = null;
    let cfa_detected = null;

    if (dimThree[0] < w1 || dimThree[1] < w1) {
      f1_map = njs.zeros(dimThree[0], dimThree[1]);
      cfa_detected = [0, 0, 0, 0];
      return;
    }

    const mean_error = njs.ones(small_cfa_list_shape[0], 1);
    let diffs = [];
    const f1_maps = [];

    for (let i = 0; i < cfa_list_shape[0]; i += 1) {
      let bin_filter = njs.zeros(dimThree[0], dimThree[1], 3);
      let proc_im = njs.zeros(dimThree[0], dimThree[1], 6);
      const cfa = cfa_list[0][i];
      const r = njs.checkEqualIn2DArray(cfa, 1);
      const g = njs.checkEqualIn2DArray(cfa, 2);
      const b = njs.checkEqualIn2DArray(cfa, 3);

      const repMatR = njs.repmat2By2(r, njs.getDimensions(r), Math.floor(dimThree[0] / 2), Math.floor(dimThree[1] / 2));
      const repMatG = njs.repmat2By2(g, njs.getDimensions(r), Math.floor(dimThree[0] / 2), Math.floor(dimThree[1] / 2));
      const repMatB = njs.repmat2By2(b, njs.getDimensions(r), Math.floor(dimThree[0] / 2), Math.floor(dimThree[1] / 2));

      bin_filter = njs.assignRowAtColIndex([...bin_filter], repMatR, 0, true);

      bin_filter = njs.assignRowAtColIndex([...bin_filter], repMatG, 1, true);
      bin_filter = njs.assignRowAtColIndex([...bin_filter], repMatB, 2, true);

      const cfa_im = njs.arithmeticArrayOnArray([...imgPxArray], bin_filter, 'mul');
      const bilin_im = this.bilinInterpolation([...cfa_im], bin_filter, [...cfa]);

      proc_im = njs.assignColumnAtColIndex([...proc_im], imgPxArray, 0, 0);
      proc_im = njs.assignColumnAtColIndex([...proc_im], imgPxArray, 1, 1);
      proc_im = njs.assignColumnAtColIndex([...proc_im], imgPxArray, 2, 2);
      proc_im = njs.assignColumnAtColIndex([...proc_im], bilin_im, 3, 0);
      proc_im = njs.assignColumnAtColIndex([...proc_im], bilin_im, 4, 1);
      proc_im = njs.assignColumnAtColIndex([...proc_im], bilin_im, 5, 2);
      const proc_im_shape = njs.getDimensions([...proc_im]);
      const block_result = njs.zeros(Math.floor(proc_im_shape[0] / w1), Math.floor(proc_im_shape[1] / w1), 6);

      for (let h = 0; h < proc_im_shape[0]; h += w1) {
        if (h + w1 >= proc_im_shape[0]) break;
        for (let k = 0; k < proc_im_shape[1]; k += w1) {
          if (k + w1 >= proc_im_shape[1]) break;
          const out = this.eval_block(njs.slice(proc_im, [h, h + w1], [k, k + w1]));
          block_result[Math.floor(h / w1)][Math.floor(k / w1)] = out;
        }
      }

      const block_result_shape = njs.getDimensions([...block_result]);
      let stds = njs.zeros(block_result_shape[0], block_result_shape[1], 3);
      stds = njs.assignColumnAtColIndex([...stds], block_result, 0, 3);
      stds = njs.assignColumnAtColIndex([...stds], block_result, 1, 4);
      stds = njs.assignColumnAtColIndex([...stds], block_result, 2, 5);

      let block_diffs = njs.zeros(block_result_shape[0], block_result_shape[1], 3);
      block_diffs = njs.assignColumnAtColIndex([...block_diffs], block_result, 0, 0);
      block_diffs = njs.assignColumnAtColIndex([...block_diffs], block_result, 1, 1);
      block_diffs = njs.assignColumnAtColIndex([...block_diffs], block_result, 2, 2);

      let non_smooth = njs.zeros(block_result_shape[0], block_result_shape[1], 3);
      non_smooth = njs.compare(stds, std_thresh, 'lt');

      const bdnm = njs.equalOneDArray(block_diffs, non_smooth, true);
      const bdnm_shape = njs.getDimensions([...bdnm]);

      mean_error[i] = mean(reshape([...bdnm], [1, bdnm_shape[0]]));
      const temp = njs.sumByAxis([...block_diffs], 2);
      const temp_shape = njs.getDimensions(temp);
      let rep_mat = njs.zeros(temp_shape[0], temp_shape[1], 3);

      rep_mat = njs.assignRowAtColIndex([...rep_mat], temp, 0);
      rep_mat = njs.assignRowAtColIndex([...rep_mat], temp, 1);
      rep_mat = njs.assignRowAtColIndex([...rep_mat], temp, 2);
      block_diffs = njs.arithmeticArrayOnArray(block_diffs, rep_mat, 'div');

      const block_diffs_axisOne = njs.getColumnAtIndex(block_diffs, 1);
      const block_diffs_axisOne_shape = njs.getDimensions(block_diffs_axisOne);
      const block_diffs_axisOne_size = block_diffs_axisOne_shape[0] * block_diffs_axisOne_shape[1];
      diffs.push(reshape(block_diffs_axisOne, [1, block_diffs_axisOne_size])[0]);
      f1_maps.push(block_diffs_axisOne);
    }

    const diffs_shape = njs.getDimensions([...diffs]);
    diffs = reshape(diffs, [diffs_shape[0], diffs_shape[1]]);
    for (let h = 0; h < diffs_shape[0]; h += 1) {
      for (let k = 0; k < diffs_shape[1]; k += 1) {
        if (Number.isNaN(diffs[h][k])) diffs[h][k] = 0;
        if (Number.isNaN(diffs[h][k])) diffs[h][k] = 0;
      }
    }
    const val = mean_error.indexOf(Math.min(...mean_error));
    let U = njs.sumByAxis(njs.absolute(njs.arithmeticOnArray(diffs, 0.25, 'sub')));
    const U_shape = njs.getDimensions([...U]);
    U = reshape(U, [1, U_shape[0]]);
    console.log(U);
    // let F1 = median(U)
    // let CFADetected = cfa_list[val, :, :] == 2
    const F1Map = f1_maps[val];
    cv.imshow('imageCanvas', image.matFromArray(F1Map, 'CV_8UC1', true));

    src.delete();
  }

  bilinInterpolation(cfa_im, bin_filter, cfa) {
    const mask_min = njs.arithmeticOnArray(
      [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1],
      ],
      4.0,
      'div'
    );
    let mask_max = njs.arithmeticOnArray(
      [
        [0, 1, 0],
        [1, 4, 1],
        [0, 1, 0],
      ],
      4.0,
      'div'
    );
    if (njs.argwhere(njs.diffAxis2By2(cfa), 0).size !== 0 || njs.argwhere(njs.diffAxis2By2(transpose(cfa)), 0).size !== 0) {
      mask_max = njs.arithmeticOnArray(mask_max, 2, 'mul');
    }
    let mask = njs.zeros(mask_min.length, mask_min[0].length, 3);

    mask = njs.assignRowAtColIndex([...mask], mask_min, 0);
    mask = njs.assignRowAtColIndex([...mask], mask_min, 1);
    mask = njs.assignRowAtColIndex([...mask], mask_min, 2);

    const sum_bin_filter = njs.sumByAxis(njs.sumByAxis([...bin_filter]));
    const a = Math.max(...sum_bin_filter);
    const maj = sum_bin_filter.indexOf(a);

    mask = njs.assignRowAtColIndex([...mask], mask_max, maj);

    const cfa_im_shape = njs.getDimensions([...cfa_im]);
    let out_im = njs.zeros(cfa_im_shape[0], cfa_im_shape[1], 3);

    const bin_filter_dim = njs.getDimensions([...bin_filter]);
    for (let i = 0; i < 3; i += 1) {
      const mixed_im = njs.zeros(cfa_im_shape[0], cfa_im_shape[1]);
      const orig_layer = njs.getColumnAtIndex([...cfa_im], i); // cfa_im: float => orig_layer: float
      const interp_layer = njs.correlate(orig_layer, njs.getColumnAtIndex(mask, i));

      for (let k = 0; k < bin_filter_dim[0]; k += 1) {
        for (let h = 0; h < bin_filter_dim[1]; h += 1) {
          if (bin_filter[k][h][i] === 0) {
            mixed_im[k][h] = interp_layer[k][h];
          } else {
            mixed_im[k][h] = parseFloat(orig_layer[k][h]);
          }
        }
      }
      out_im = njs.assignRowAtColIndex(out_im, mixed_im, i);
      out_im = njs.round(out_im, 'round');
    }
    return out_im;
  }

  eval_block(data) {
    const im = data;
    const Out = Array(6).fill(0);

    Out[0] = mean(njs.power(njs.arithmeticArrayOnArray(njs.getColumnAtIndex(data, 0), njs.getColumnAtIndex(data, 3), 'sub'), 2.0));
    Out[1] = mean(njs.power(njs.arithmeticArrayOnArray(njs.getColumnAtIndex(data, 1), njs.getColumnAtIndex(data, 4), 'sub'), 2.0));
    Out[2] = mean(njs.power(njs.arithmeticArrayOnArray(njs.getColumnAtIndex(data, 2), njs.getColumnAtIndex(data, 5), 'sub'), 2.0));

    Out[3] = std(
      reshape(njs.getColumnAtIndex(im, 0), [1, njs.getDimensions(njs.getColumnAtIndex(im, 1))[0] * njs.getDimensions(njs.getColumnAtIndex(im, 1))[1]])
    );
    Out[4] = std(
      reshape(njs.getColumnAtIndex(im, 2), [1, njs.getDimensions(njs.getColumnAtIndex(im, 2))[0] * njs.getDimensions(njs.getColumnAtIndex(im, 2))[1]])
    );
    Out[5] = std(
      reshape(njs.getColumnAtIndex(im, 2), [1, njs.getDimensions(njs.getColumnAtIndex(im, 3))[0] * njs.getDimensions(njs.getColumnAtIndex(im, 3))[1]])
    );
    return Out;
  }

  // eslint-disable-next-line class-methods-use-this
  async execMethod(args) {
    const { weight } = args;
    console.time('Execution Time');
    this.CFATamperDetection(weight);
    console.timeEnd('Execution Time');
  }
}

export default CFAArtifact;
