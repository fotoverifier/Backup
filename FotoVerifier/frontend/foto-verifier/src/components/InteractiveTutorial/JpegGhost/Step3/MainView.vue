<template>
  <div class="row">
    <div class="col-md-6">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Image 1</strong>
        </div>
        <div class="card-body">
          <center>
            <canvas
              ref="image1View"
              @click="image1Click"
              @mousedown="image1Mousedown"
              @mouseup="image1Mouseup"
              @mouseout="image1Mouseout"
              @mousemove="image1Mousemove"
            ></canvas>
          </center>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Image 2</strong>
        </div>
        <div class="card-body">
          <center>
            <canvas
              ref="image2View"
              @mouseup="image2Mouseup"
              @mouseout="image2Mouseout"
              @mousemove="image2Mousemove"
            ></canvas>
          </center>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { drawImageScaled } from "../../../../utils/canvas.js";

export default {
  setup(props, context) {
    let image1View = ref(null);
    let image2View = ref(null);
    let step = ref(1);
    let isDragging = false;
    let startX = -1;
    let startY = -1;
    let manRect = {
      x1: 30,
      y1: 23,
      x2: 153,
      y2: 365,
    };
    let beachRect = {
      x1: 263,
      y1: 40,
      x2: 386,
      y2: 382,
    };

    let drawImage1 = function () {
      let img = new Image();
      img.src = "/image/interactive-tutorial/jpeg-ghost/exercise1_1.jpg";
      img.onload = function () {
        let canvasWidth = ref(window.innerWidth / 2);
        let canvasHeight = ref(window.innerHeight / 2);
        let ctx = image1View.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(img, ctx);

        if (step.value == 2) {
          drawRectangle(
            image1View,
            manRect.x1,
            manRect.y1,
            manRect.x2,
            manRect.y2,
            "#00AA00"
          );
        }
      };
    };

    let drawImage2 = function () {
      let img = new Image();
      img.src = "/image/interactive-tutorial/jpeg-ghost/exercise1_2.jpg";
      img.onload = function () {
        let canvasWidth = ref(window.innerWidth / 2);
        let canvasHeight = ref(window.innerHeight / 2);
        let ctx = image2View.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(img, ctx);

        if (step.value == 2) {
          drawRectangle(
            image2View,
            beachRect.x1,
            beachRect.y1,
            beachRect.x2,
            beachRect.y2,
            "#2C82C9"
          );
        }
      };
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

    let drawRectangle = function (canvas, x1, y1, x2, y2, color) {
      drawLine(canvas, x1, y1, x2, y1, color);
      drawLine(canvas, x2, y1, x2, y2, color);
      drawLine(canvas, x2, y2, x1, y2, color);
      drawLine(canvas, x1, y2, x1, y1, color);
    };

    let moveToStep2 = function () {
      step.value = 2;
      context.emit("moveToStep2");
    };

    let moveToStep3 = function (x, y) {
      isDragging = false;
      step.value = 3;
      drawImage1();
      drawImage2();

      let img = new Image();
      img.src = "/image/interactive-tutorial/jpeg-ghost/man.png";
      img.onload = function () {
        let canvas = image2View.value;
        let ctx = image2View.value.getContext("2d");
        let ratio;
        if (img.width <= canvas.width && img.height <= canvas.height) {
          ratio = 1;
        } else {
          let hRatio = canvas.width / img.width;
          let vRatio = canvas.height / img.height;
          ratio = Math.min(hRatio, vRatio);
        }
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          x,
          y,
          img.width * ratio,
          img.height * ratio
        );
      };
      context.emit("moveToStep3");
    };

    let image1Mousedown = function (e) {
      if (step.value != 2) {
        return;
      }

      let rect = image1View.value.getBoundingClientRect();
      let scaleX = image1View.value.width / rect.width;
      let scaleY = image1View.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      if (
        manRect.x1 <= x &&
        x <= manRect.x2 &&
        manRect.y1 <= y &&
        y <= manRect.y2
      ) {
        isDragging = true;
        startX = x;
        startY = y;
      }
    };

    let image1Mousemove = function (e) {
      if (step.value != 2 || !isDragging) {
        return;
      }

      let rect = image1View.value.getBoundingClientRect();
      let scaleX = image1View.value.width / rect.width;
      let scaleY = image1View.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      let dx = x - startX;
      let dy = y - startY;

      drawImage1();
      let img = new Image();
      img.src = "/image/interactive-tutorial/jpeg-ghost/man.png";
      img.onload = function () {
        let canvas = image1View.value;
        let ctx = image1View.value.getContext("2d");
        let ratio;
        if (img.width <= canvas.width && img.height <= canvas.height) {
          ratio = 1;
        } else {
          let hRatio = canvas.width / img.width;
          let vRatio = canvas.height / img.height;
          ratio = Math.min(hRatio, vRatio);
        }
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          manRect.x1 + dx,
          manRect.y1 + dy,
          img.width * ratio,
          img.height * ratio
        );
      };
    };

    let image2Mousemove = function (e) {
      if (step.value != 2 || !isDragging) {
        return;
      }

      let rect = image2View.value.getBoundingClientRect();
      let scaleX = image2View.value.width / rect.width;
      let scaleY = image2View.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      console.log(Math.abs(x - beachRect.x1), Math.abs(y - beachRect.y1));

      drawImage2();
      let img = new Image();
      img.src = "/image/interactive-tutorial/jpeg-ghost/man.png";
      img.onload = function () {
        let canvas = image2View.value;
        let ctx = image2View.value.getContext("2d");
        let ratio;
        if (img.width <= canvas.width && img.height <= canvas.height) {
          ratio = 1;
        } else {
          let hRatio = canvas.width / img.width;
          let vRatio = canvas.height / img.height;
          ratio = Math.min(hRatio, vRatio);
        }
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          x,
          y,
          img.width * ratio,
          img.height * ratio
        );

        if (
          Math.abs(x - beachRect.x1) <= 4 &&
          Math.abs(y - beachRect.y1) <= 4
        ) {
          moveToStep3(x, y);
        }
      };
    };

    let image1Mouseup = function () {
      if (step.value != 2 || !isDragging) {
        return;
      }
      isDragging = false;
      drawImage1();
      drawImage2();
    };

    let image1Mouseout = function () {
      if (step.value != 2 || !isDragging) {
        return;
      }
      //isDragging = false;
      drawImage1();
      drawImage2();
    };

    let image2Mouseup = function () {
      if (step.value != 2 || !isDragging) {
        return;
      }
      isDragging = false;
      drawImage1();
      drawImage2();
    };

    let image2Mouseout = function () {
      if (step.value != 2 || !isDragging) {
        return;
      }
      isDragging = false;
      drawImage1();
      drawImage2();
    };

    let image1Click = function (e) {
      let rect = image1View.value.getBoundingClientRect();
      let scaleX = image1View.value.width / rect.width;
      let scaleY = image1View.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      if (step.value == 1) {
        if (
          manRect.x1 <= x &&
          x <= manRect.x2 &&
          manRect.y1 <= y &&
          y <= manRect.y2
        ) {
          drawRectangle(
            image1View,
            manRect.x1,
            manRect.y1,
            manRect.x2,
            manRect.y2,
            "#00AA00"
          );
          drawRectangle(
            image2View,
            beachRect.x1,
            beachRect.y1,
            beachRect.x2,
            beachRect.y2,
            "#2C82C9"
          );
          moveToStep2();
        }
      }
    };

    onMounted(() => {
      drawImage1();
      drawImage2();
    });

    return {
      image1View,
      image2View,
      step,
      image1Click,
      image1Mousedown,
      image1Mouseup,
      image1Mouseout,
      image1Mousemove,
      image2Mouseup,
      image2Mouseout,
      image2Mousemove,
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
