<template>
  <div class="card window">
    <div class="card-header window-header">
      <strong class="text-warning">Image</strong>
    </div>
    <div class="card-body">
      <center>
        <canvas
          ref="imageView"
          @mousedown="mouseDown"
          @mouseup="mouseUp"
          @mouseout="mouseOut"
          @mousemove="mouseMove"
        ></canvas>
      </center>
      <center>
        <button type="button" class="btn btn-warning" v-on:click="undo()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
          Undo
        </button>
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
    let isDragging = false;
    let redID = -1;
    let lines = [];
    let redCircle = [
      { x: 216, y: 333, match: -1 },
      { x: 301, y: 323, match: -1 },
      { x: 234, y: 524, match: -1 },
    ];
    let blueCircle = [
      {
        x: 152,
        y: 218,
        match: -1,
      },
      {
        x: 261,
        y: 265,
        match: -1,
      },
      {
        x: 93,
        y: 189,
        match: -1,
      },
    ];
    let ratio = 0;
    let tempLine = [];

    let checkCorrect = function () {
      for (let i = 0; i < redCircle.length; ++i) {
        if (redCircle[i].match != i) {
          return false;
        }
      }
      for (let i = 0; i < blueCircle.length; ++i) {
        if (blueCircle[i].match != i) {
          return false;
        }
      }
      return true;
    };

    let drawCircle = function (centerX, centerY, radius, color) {
      let ctx = imageView.value.getContext("2d");
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    let drawLine = function (canvas, x1, y1, x2, y2, color) {
      let ctx = canvas.value.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    let drawImage = function () {
      let img = new Image();
      img.src =
        "/image/interactive-tutorial/reflection-consistency/exercise1.jpg";
      img.onload = function () {
        let canvasWidth = ref(window.innerWidth);
        let canvasHeight = ref(window.innerHeight);
        let ctx = imageView.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        ratio = drawImageScaled(img, ctx);

        for (let i = 0; i < redCircle.length; ++i) {
          drawCircle(redCircle[i].x * ratio, redCircle[i].y * ratio, 6, "red");
        }

        for (let i = 0; i < blueCircle.length; ++i) {
          drawCircle(
            blueCircle[i].x * ratio,
            blueCircle[i].y * ratio,
            6,
            "blue"
          );
        }

        for (let i = 0; i < lines.length; ++i) {
          drawLine(
            imageView,
            redCircle[lines[i].redID].x * ratio,
            redCircle[lines[i].redID].y * ratio,
            blueCircle[lines[i].blueID].x * ratio,
            blueCircle[lines[i].blueID].y * ratio,
            "green"
          );
        }

        for (let i = 0; i < tempLine.length; ++i) {
          drawLine(
            imageView,
            tempLine[i].x1,
            tempLine[i].y1,
            tempLine[i].x2,
            tempLine[i].y2,
            "green"
          );
        }
      };
    };

    let dist = function (x1, y1, x2, y2) {
      return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };

    let mouseDown = function (e) {
      let rect = imageView.value.getBoundingClientRect();
      let scaleX = imageView.value.width / rect.width;
      let scaleY = imageView.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      for (let i = 0; i < redCircle.length; ++i) {
        if (
          redCircle[i].match == -1 &&
          dist(x, y, redCircle[i].x * ratio, redCircle[i].y * ratio) <= 6
        ) {
          isDragging = true;
          redID = i;
          break;
        }
      }
    };

    let mouseUp = function (e) {
      if (!isDragging) {
        return;
      }

      tempLine = [];
      drawImage();

      let rect = imageView.value.getBoundingClientRect();
      let scaleX = imageView.value.width / rect.width;
      let scaleY = imageView.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      isDragging = false;
      for (let i = 0; i < blueCircle.length; ++i) {
        if (
          blueCircle[i].match == -1 &&
          dist(x, y, blueCircle[i].x * ratio, blueCircle[i].y * ratio) <= 6
        ) {
          blueCircle[i].match = redID;
          redCircle[redID].match = i;
          lines.push({ redID: redID, blueID: i });
          drawImage();
          if (checkCorrect()) {
            context.emit("correctAnswer");
          }
          break;
        }
      }
    };

    let mouseMove = function (e) {
      if (!isDragging) {
        return;
      }

      let rect = imageView.value.getBoundingClientRect();
      let scaleX = imageView.value.width / rect.width;
      let scaleY = imageView.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      tempLine = [
        {
          x1: redCircle[redID].x * ratio,
          y1: redCircle[redID].y * ratio,
          x2: x,
          y2: y,
        },
      ];

      drawImage();
    };

    let mouseOut = function () {
      if (!isDragging) {
        return;
      }

      isDragging = false;
      tempLine = [];
      drawImage();
    };

    let undo = function () {
      if (lines.length) {
        let obj = lines.pop();
        redCircle[obj.redID].match = -1;
        blueCircle[obj.blueID].match = -1;
        drawImage();
      }
    };

    onMounted(() => {
      drawImage();
    });

    return {
      imageView,
      mouseDown,
      mouseUp,
      mouseOut,
      mouseMove,
      undo,
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
