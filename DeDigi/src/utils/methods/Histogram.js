/* eslint-disable new-cap */
export default function Histogram() {
  const { cv } = window;
  const src = cv.imread('originalImage');
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  const srcVec = new cv.MatVector();
  srcVec.push_back(src);
  const accumulate = false;
  const channels = [0];
  const histSize = [256];
  const ranges = [0, 255];
  const hist = new cv.Mat();
  const mask = new cv.Mat();
  const color = new cv.Scalar(255, 255, 255);
  const scale = 2;
  // You can try more different parameters
  cv.calcHist(srcVec, channels, mask, hist, histSize, ranges, accumulate);
  const result = cv.minMaxLoc(hist, mask);
  const max = result.maxVal;
  const dst = new cv.Mat.zeros(src.rows, histSize[0] * scale, cv.CV_8UC3);
  // draw histogram
  for (let i = 0; i < histSize[0]; i += 1) {
    const binVal = (hist.data32F[i] * src.rows) / max;
    const point1 = new cv.Point(i * scale, src.rows - 1);
    const point2 = new cv.Point((i + 1) * scale - 1, src.rows - binVal);
    cv.rectangle(dst, point1, point2, color, cv.FILLED);
  }
  cv.imshow('imageCanvas', dst);
  src.delete();
  dst.delete();
  srcVec.delete();
  mask.delete();
  hist.delete();
}
