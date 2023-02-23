<template>
  <div class="card window">
    <div class="card-header window-header">
      <strong class="text-warning">{{ title }}</strong>
    </div>
    <div class="card-body">
      <center>
        <canvas ref="imageView" @click="handleClick"></canvas>
        <p>
          Attached Shadow Found:
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
        x1: 341,
        y1: 93,
        x2: 385,
        y2: 145,
        hasClicked: false,
      },
      {
        x1: 455,
        y1: 184,
        x2: 519,
        y2: 233,
        hasClicked: false,
      },
      {
        x1: 294,
        y1: 185,
        x2: 368,
        y2: 329,
        hasClicked: false,
      },
      {
        x1: 322,
        y1: 326,
        x2: 370,
        y2: 513,
        hasClicked: false,
      },
      {
        x1: 400,
        y1: 311,
        x2: 438,
        y2: 502,
        hasClicked: false,
      },
    ];

    let drawImage = function () {
      let img = new Image();
      img.src = "/image/interactive-tutorial/shadow-consistency/exercise2.jpg";
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
