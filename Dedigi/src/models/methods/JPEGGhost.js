class JPEGGhost {
  constructor(method) {
    this.method = method;
  }

  // eslint-disable-next-line class-methods-use-this
  async execMethod(args) {
    const { cv } = window;
    const { quality } = args;
    // Init
    const img = document.getElementById('originalImage');
    // create 1st canvas
    const canvas = document.createElement('CANVAS');
    canvas.id = 'canvas';
    const ctx = canvas.getContext('2d');
    // create 2nd canvas
    const canvasConverted = document.createElement('CANVAS');
    canvasConverted.id = 'canvasConverted';
    const ctxConverted = canvasConverted.getContext('2d');
    // Resize: image->canvasResult
    const nw = 263;
    const nh = 350;

    canvas.width = nw;
    canvas.height = nh;
    canvasConverted.width = nw;
    canvasConverted.height = nh;
    ctx.drawImage(img, 0, 0, nw, nh);

    // Save image with new JPEG quality
    const dataURI = canvas.toDataURL('image/jpeg', quality /* Thong so jpeg quality 0 ~ 1 */);
    const imgObj = new Image();
    imgObj.src = dataURI;
    if (imgObj) {
      await new Promise((r) => setTimeout(r, 100));
      await ctxConverted.drawImage(imgObj, 0, 0, nw, nh);
    }
    // Get the ImageData from 2 canvases
    const originalImgData = await ctx.getImageData(0, 0, nw, nh);
    const compressedImgData = await ctxConverted.getImageData(0, 0, nw, nh);

    // JPEG-Ghost
    const src = cv.matFromImageData(originalImgData);
    const dst = cv.matFromImageData(compressedImgData);
    const mask = new cv.Mat();
    const dtype = -1;
    const tmp = new cv.Mat();

    // Compute the square different between original image and the resaved image
    cv.subtract(dst, src, tmp, mask, dtype);
    cv.multiply(tmp, tmp, tmp);
    const SMOOTHING_B = 17;

    // let offset = (smoothing_b - 1) / 2;
    // Take the average by kernel size b
    const kernel = new cv.Mat(SMOOTHING_B, SMOOTHING_B, cv.CV_32F, new cv.Scalar(1.0 / SMOOTHING_B ** 2));
    cv.filter2D(tmp, tmp, -1, kernel);

    // Take the average of 3 channels
    const rgbaPlanes = new cv.MatVector();
    cv.split(tmp, rgbaPlanes);
    const R = rgbaPlanes.get(0);
    const G = rgbaPlanes.get(1);
    const B = rgbaPlanes.get(2);
    const result = cv.Mat.zeros(tmp.rows, tmp.cols, cv.CV_8U);
    const constThree = new cv.Mat(tmp.rows, tmp.cols, cv.CV_8U, new cv.Scalar(3));
    cv.add(R, G, result);
    cv.add(result, B, result);
    cv.divide(result, constThree, result);

    // Compute the nomalized component
    const minMax = cv.minMaxLoc(result);
    const normalizedVal = minMax.minVal / (minMax.maxVal - minMax.minVal);

    // Nomalization
    const constNomalizedVal = new cv.Mat(tmp.rows, tmp.cols, cv.CV_8U, new cv.Scalar(normalizedVal));
    cv.subtract(result, constNomalizedVal, result, mask, dtype);
    cv.imshow('imageCanvas', result);

    // Release Mem
    rgbaPlanes.delete();
    R.delete();
    G.delete();
    B.delete();
    src.delete();
    dst.delete();
    mask.delete();
    tmp.delete();
    kernel.delete();
    constNomalizedVal.delete();
    result.delete();
  }
}

export default JPEGGhost;
