function drawImageScaled(img, ctx) {
  let canvas = ctx.canvas;
  let ratio;
  if (img.width <= canvas.width && img.height <= canvas.height) {
    ratio = 1;
  } else {
    let hRatio = canvas.width / img.width;
    let vRatio = canvas.height / img.height;
    ratio = Math.min(hRatio, vRatio);
  }
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;

  let centerShiftX = (canvas.width - img.width * ratio) / 2;
  let centerShiftY = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShiftX,
    centerShiftY,
    img.width * ratio,
    img.height * ratio
  );
  return ratio;
}

export { drawImageScaled };
