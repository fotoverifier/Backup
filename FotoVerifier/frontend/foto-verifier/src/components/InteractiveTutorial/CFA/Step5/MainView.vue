<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Image</strong>
        </div>
        <div class="card-body">
          <center>
            <canvas
              ref="imageView"
              @mousemove="mouseMove"
              @click="mouseClick"
              @mouseout="mouseOut"
            ></canvas>
          </center>
        </div>
      </div>
    </div>
  </div>
  <div class="row pt-2" v-if="showRGB">
    <div class="col-md-12">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Current Pixel Information</strong>
        </div>
        <div class="card-body">
          <center>
            <p>
              Red: <strong style="color: rgb(250, 197, 28)">{{ red }}</strong>
            </p>
            <p>
              Green:
              <strong style="color: rgb(250, 197, 28)">{{ green }}</strong>
            </p>
            <p>
              Blue:
              <strong style="color: rgb(250, 197, 28)">{{ blue }}</strong>
            </p>
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
    let imageView = ref(null);
    let showRGB = ref(false);
    let curX = ref(0);
    let curY = ref(0);
    let red = ref(0);
    let green = ref(0);
    let blue = ref(0);

    let drawImage = function () {
      let img = new Image();
      img.src = "/image/interactive-tutorial/cfa/exercise1.jpg";
      img.onload = function () {
        let canvasWidth = ref(window.innerWidth / 2);
        let canvasHeight = ref(window.innerHeight / 2);
        let ctx = imageView.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(img, ctx);
      };
    };

    let mouseMove = function (e) {
      showRGB.value = true;
      let rect = imageView.value.getBoundingClientRect();
      let scaleX = imageView.value.width / rect.width;
      let scaleY = imageView.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;
      let ctx = imageView.value.getContext("2d");
      let rgb = ctx.getImageData(x, y, 1, 1).data;
      red.value = rgb[0];
      green.value = rgb[1];
      blue.value = rgb[2];
    };

    let mouseClick = function (e) {
      showRGB.value = true;
      let rect = imageView.value.getBoundingClientRect();
      let scaleX = imageView.value.width / rect.width;
      let scaleY = imageView.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;
      let ctx = imageView.value.getContext("2d");
      let rgb = ctx.getImageData(x, y, 1, 1).data;
      red.value = rgb[0];
      green.value = rgb[1];
      blue.value = rgb[2];

      if (red.value == 0 && blue.value > 200) {
        context.emit("doneImage");
      }
    };

    let mouseOut = function () {
      showRGB.value = false;
    };

    onMounted(() => {
      drawImage();
    });

    return {
      imageView,
      mouseMove,
      mouseOut,
      showRGB,
      curX,
      curY,
      red,
      green,
      blue,
      mouseClick,
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
