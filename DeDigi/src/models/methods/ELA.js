class ELA {
  constructor(method) {
    this.method = method;
  }

  // eslint-disable-next-line class-methods-use-this
  async execMethod(args) {
    const { quality, errorScale } = args;
    const opacity = 255;
    const img = document.getElementById('originalImage');
    const canvasResult = document.getElementById('imageCanvas');
    const ctxResult = canvasResult.getContext('2d');

    const canvas = document.createElement('CANVAS');
    canvas.id = 'canvas';
    const ctx = canvas.getContext('2d');

    const canvasConverted = document.createElement('CANVAS');
    canvasConverted.id = 'canvasConverted';
    const ctxConverted = canvasConverted.getContext('2d');

    const nw = canvasResult.width;
    const nh = canvasResult.height;
    canvas.width = nw;
    canvas.height = nh;
    canvasConverted.width = nw;
    canvasConverted.height = nh;

    ctx.drawImage(img, 0, 0, nw, nh);

    const dataURI = canvas.toDataURL('image/jpeg', quality /* Thong so jpeg quality 0 ~ 1 */);
    const imgObj = new Image();
    imgObj.src = dataURI;

    if (imgObj) {
      await new Promise((r) => setTimeout(r, 100));
      ctxConverted.drawImage(imgObj, 0, 0, nw, nh);
      const originalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const compressedImgData = ctxConverted.getImageData(0, 0, canvasConverted.width, canvasConverted.height);

      const arrSource = originalImgData.data;
      const arrDes = compressedImgData.data;

      for (let i = 0, l = arrSource.length; i < l; i += 4) {
        for (let j = 0; j <= 3; j += 1) {
          if (j === 3) {
            arrSource[i + j] = opacity;
          } else {
            const error = Math.abs(arrSource[i + j] - arrDes[i + j]);
            arrSource[i + j] = error * errorScale;
          }
        }
      }
      ctxResult.putImageData(originalImgData, 0, 0);
    }
  }
}

export default ELA;
