/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable class-methods-use-this */
import { flatten } from 'mathjs';
import Numjs from './Numjs';

const njs = new Numjs();
class Image {
  constructor(src, type = 'CV_8UC3', isFloat = false) {
    if (!src) return;
    if (src.constructor.name === 'Mat') {
      this.image = this.matFromArray(src);
      this.mat = src;
    } else if (src.constructor.name === 'Array') {
      this.image = src;
      this.mat = this.arrayFromMat(src, type, isFloat);
    }
  }

  /**
   * @param {Mat} src image as Mat of 3 colorspace
   */
  arrayFromMat(src) {
    const imgPxArray = njs.zeros(src.rows, src.cols);
    return imgPxArray.map((row, i) => {
      return row.map((_, j) => {
        const pixel = src.ucharPtr(i, j);
        return [pixel[0], pixel[1], pixel[2]];
      });
    });
  }

  /**
   * @param {MatVector} src MatVector of 1 colorspace
   */
  arrayFromMatVector(src) {
    const imgPxArray = njs.zeros(src.rows, src.cols);
    return imgPxArray.map((row, i) => {
      return row.map((_, j) => {
        const pixel = src.ucharPtr(i, j);
        return pixel[0];
      });
    });
  }

  /**
   * @param {number[]} imageArray image as nD array
   * @param {string} type data type of image
   * @param {boolean} isFloat check for conversion from [0-1] to [0-255]
   */
  matFromArray(imageArray, type = 'CV_8UC3', isFloat = false) {
    const { cv } = window;
    let flatArray = flatten(imageArray);
    if (isFloat) {
      flatArray = flatArray.map((f) => {
        return f >= 1.0 ? 255 : f <= 0.0 ? 0 : parseInt(Math.floor(f * 256.0));
      });
    }

    const dst = cv.matFromArray(njs.getDimensions(imageArray)[0], njs.getDimensions(imageArray)[1], cv[type], flatArray);
    return dst;
  }
}

export default Image;
