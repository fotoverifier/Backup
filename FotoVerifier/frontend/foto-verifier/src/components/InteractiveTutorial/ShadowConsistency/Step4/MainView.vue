<template>
  <div class="card window">
    <div class="card-header window-header">
      <strong class="text-warning">{{ title }}</strong>
    </div>
    <div class="card-body">
      <center>
        <canvas ref="imageView" @click="handleClick"></canvas>
        <p>
          Cast Shadow Found:
          <strong style="color: rgb(250, 197, 28)">{{ foundCnt }}</strong> /
          <strong style="color: rgb(250, 197, 28)">5</strong>
        </p>
      </center>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { drawImageScaled } from "../../../../utils/canvas.js";

export default {
  setup(props, context) {
    let imageView = ref(null);
    let title = ref("Image");
    let foundCnt = ref(0);
    let shadows = [
      {
        x1: 225,
        y1: 344,
        x2: 477,
        y2: 471,
        hasClicked: false,
      },
      {
        x1: 1,
        y1: 196,
        x2: 286,
        y2: 342,
        hasClicked: false,
      },
      {
        x1: 559,
        y1: 260,
        x2: 639,
        y2: 327,
        hasClicked: false,
      },
      {
        x1: 301,
        y1: 151,
        x2: 376,
        y2: 181,
        hasClicked: false,
      },
      {
        x1: 219,
        y1: 102,
        x2: 283,
        y2: 124,
        hasClicked: false,
      },
      {
        x1: 215,
        y1: 95,
        x2: 230,
        y2: 101,
        hasClicked: false,
      },
      {
        x1: 202,
        y1: 89,
        x2: 225,
        y2: 95,
        hasClicked: false,
      },
      {
        x1: 194,
        y1: 83,
        x2: 209,
        y2: 89,
        hasClicked: false,
      },
      {
        x1: 402,
        y1: 239,
        x2: 422,
        y2: 265,
        hasClicked: false,
      },
    ];

    let drawImage = function () {
      let img = new Image();
      img.src = "/image/interactive-tutorial/shadow-consistency/exercise1.jpg";
      img.onload = function () {
        let canvasWidth = ref(window.innerWidth);
        let canvasHeight = ref(window.innerHeight);
        let ctx = imageView.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(img, ctx);
      };
    };

    onMounted(() => {
      drawImage();
    });

    let drawLine = function (x1, y1, x2, y2) {
      let ctx = imageView.value.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineWidth = 2;
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

    let handleClick = function (e) {
      let rect = imageView.value.getBoundingClientRect();
      let scaleX = imageView.value.width / rect.width;
      let scaleY = imageView.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      for (let i = 0; i < 9; ++i) {
        if (!shadows[i].hasClicked) {
          if (
            shadows[i].x1 <= x &&
            x <= shadows[i].x2 &&
            shadows[i].y1 <= y &&
            y <= shadows[i].y2
          ) {
            shadows[i].hasClicked = true;
            drawRectangle(
              shadows[i].x1,
              shadows[i].y1,
              shadows[i].x2,
              shadows[i].y2
            );
            foundCnt.value++;
            break;
          }
        }
      }

      if (foundCnt.value == 5) {
        context.emit("doneExercise");
      }
    };

    return {
      imageView,
      handleClick,
      title,
      foundCnt,
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
