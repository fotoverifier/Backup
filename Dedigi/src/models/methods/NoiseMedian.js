/* eslint-disable no-console */
import Numjs from '../Numjs';
import Image from '../Image';
/** *************************** */
/** ***** Main Functions ****** */
/** *************************** */
const njs = new Numjs();
const image = new Image();

class NoiseMedian {
  constructor(method) {
    this.method = method;
  }

  // eslint-disable-next-line class-methods-use-this
  async execMethod(args) {
    const { cv } = window;
    const { nSize } = args;
    console.time('Execution Time');

    const flatten = true;
    const multiplier = 3;
    const src = cv.imread('originalImage');
    const dst = new cv.Mat();
    const imgPxArray = image.arrayFromMat(src);
    let imgFiltered = [...imgPxArray];
    cv.medianBlur(src, dst, nSize % 2 === 1 ? nSize : 3);
    imgFiltered = image.arrayFromMat(dst);
    let noiseMap = njs.arithmeticOnImgArray(njs.absolute(njs.arithmeticImgArrayOnArray(imgPxArray, imgFiltered, 'sub')), multiplier, 'mul');

    const noiseMat = new cv.Mat();
    if (flatten) {
      noiseMap = image.matFromArray(noiseMap);
      cv.cvtColor(noiseMap, noiseMat, cv.COLOR_RGB2GRAY);
    }

    cv.imshow('imageCanvas', noiseMat);
    console.timeEnd('Execution Time');
  }
}

export default NoiseMedian;
