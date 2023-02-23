<template>
  <div class="card window">
    <div class="card-header window-header">
      <strong class="text-warning">{{ title }}</strong>
    </div>
    <div class="card-body">
      <center><canvas ref="imageView" @click="handleClick"></canvas></center>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { drawImageScaled } from "../../../../utils/canvas.js";

export default {
  emits: ["doneImage1", "doneImage2"],

  setup(props, context) {
    let imageView = ref(null);
    let title = ref("Image 1");
    let currentImage = 1;
    let originalRect = {
      x1: 553,
      y1: 387,
      x2: 584,
      y2: 437,
      hasClicked: false,
    };
    let copyRect = {
      x1: 441,
      y1: 380,
      x2: 467,
      y2: 430,
      hasClicked: false,
    };
    let ratio = 0;

    let drawFirstImage = function () {
      let img = new Image();
      img.src = "/image/interactive-tutorial/copy-move/exercise1_1.jpg";
      img.onload = function () {
        let canvasWidth = ref(window.innerWidth);
        let canvasHeight = ref(window.innerHeight);
        let ctx = imageView.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        ratio = drawImageScaled(img, ctx);
      };
    };

    let drawSecondImage = function () {
      currentImage = 2;
      originalRect = {
        x1: 50,
        y1: 43,
        x2: 149,
        y2: 171,
        hasClicked: false,
      };
      copyRect = {
        x1: 165,
        y1: 60,
        x2: 206,
        y2: 165,
        hasClicked: false,
      };
      title.value = "Image 2";

      let img = new Image();
      img.src = "/image/interactive-tutorial/copy-move/exercise1_2.png";
      img.onload = function () {
        let canvasWidth = ref(window.innerWidth);
        let canvasHeight = ref(window.innerHeight);
        let ctx = imageView.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        ratio = drawImageScaled(img, ctx);
      };
    };

    onMounted(() => {
      drawFirstImage();
    });

    let drawLine = function (x1, y1, x2, y2) {
      let ctx = imageView.value.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#00AA00";
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    let drawRectangle = function (x1, y1, x2, y2) {
      drawLine(x1, y1, x2, y1);
      drawLine(x2, y1, x2, y2);
      drawLine(x2, y2, x1, y2);
      drawLine(x1, y2, x1, y1);
    };

    let drawText = function (x, y, text) {
      let ctx = imageView.value.getContext("2d");
      ctx.font = "20px Arial";
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#fff";
      ctx.strokeText(text, x, y);
    };

    let handleClick = function (e) {
      let rect = imageView.value.getBoundingClientRect();
      let scaleX = imageView.value.width / rect.width;
      let scaleY = imageView.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      if (!originalRect.hasClicked) {
        if (
          originalRect.x1 * ratio <= x &&
          x <= originalRect.x2 * ratio &&
          originalRect.y1 * ratio <= y &&
          y <= originalRect.y2 * ratio
        ) {
          originalRect.hasClicked = true;
          drawRectangle(
            originalRect.x1 * ratio,
            originalRect.y1 * ratio,
            originalRect.x2 * ratio,
            originalRect.y2 * ratio
          );
          drawText(
            originalRect.x1 * ratio - 30,
            originalRect.y1 * ratio - 10,
            "Original Part"
          );
        }
      }

      if (!copyRect.hasClicked) {
        if (
          copyRect.x1 * ratio <= x &&
          x <= copyRect.x2 * ratio &&
          copyRect.y1 * ratio <= y &&
          y <= copyRect.y2 * ratio
        ) {
          copyRect.hasClicked = true;
          drawRectangle(
            copyRect.x1 * ratio,
            copyRect.y1 * ratio,
            copyRect.x2 * ratio,
            copyRect.y2 * ratio
          );
          drawText(
            copyRect.x1 * ratio - 40,
            copyRect.y1 * ratio - 40,
            "Copied Part"
          );
        }
      }

      if (originalRect.hasClicked && copyRect.hasClicked) {
        if (currentImage == 1) {
          context.emit("doneImage1");
        } else {
          context.emit("doneImage2");
        }
      }
    };

    return {
      imageView,
      currentImage,
      handleClick,
      drawSecondImage,
      title,
    };
  },
};
</script>

<style scoped>
.window {
  background-color: transparent;
  border: 1px solid rgba(128, 152, 255, 0.22);
  box-shadow: 0 0.1875rem 1px -2px rgba(0, 0, 0, 0.2),
    0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 1px 0.3125rem 0 rgba(0, 0, 0, 0.12);
  border-radius: 0;
}

.window-header {
  background-color: #28335e;
  box-shadow: 0 0.1875rem 1px -2px rgba(0, 0, 0, 0.2),
    0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 1px 0.3125rem 0 rgba(0, 0, 0, 0.12);
}
</style>
