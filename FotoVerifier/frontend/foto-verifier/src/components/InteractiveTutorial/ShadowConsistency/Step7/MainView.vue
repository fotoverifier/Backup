<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Example Image</strong>
        </div>
        <div class="card-body">
          <center>
            <canvas ref="imageView"></canvas>
          </center>
          <center v-if="!myImage">
            <a
              href="https://www.forensicfocus.com/articles/how-to-detect-tampered-images-on-social-media-via-shadows-analysis/"
              >Image Source</a
            >
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
  setup() {
    let imageView = ref(null);
    let step = ref(1);
    let myImage = ref(false);

    let drawImage = function () {
      let img = new Image();
      img.src =
        "/image/interactive-tutorial/shadow-consistency/shadow-consistency.jpg";
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

    let drawSecondImage = function () {
      let img = new Image();
      img.src = "/image/interactive-tutorial/shadow-consistency/wedge.png";
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

    let drawThirdImage = function () {
      let img = new Image();
      img.src =
        "/image/interactive-tutorial/shadow-consistency/inconsistent.png";
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

    let drawFourthImage = function () {
      let img = new Image();
      img.src =
        "/image/interactive-tutorial/shadow-consistency/attached-shadow-wedge.png";
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

    let drawNextImage = function () {
      step.value++;
      if (step.value == 2) {
        drawSecondImage();
      } else if (step.value == 3) {
        drawThirdImage();
      } else if (step.value == 4) {
        drawFourthImage();
        myImage.value = true;
      }
    };

    onMounted(() => {
      drawImage();
    });

    return { imageView, drawNextImage, myImage };
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
