<template>
  <div class="row">
    <div class="col-md-12" v-if="step == 1">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Example Image</strong>
        </div>
        <div class="card-body">
          <center>
            <canvas ref="imageView"></canvas>
          </center>
        </div>
      </div>
    </div>
    <div class="col-md-6" v-if="step == 2">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Image 1</strong>
        </div>
        <div class="card-body">
          <center>
            <canvas ref="image1View"></canvas>
            <p>
              <strong style="color: rgb(97, 189, 109)">4 patterns</strong> of
              <strong style="color: rgb(44, 130, 201)"
                >Bayer Color Filter Array</strong
              >
            </p>
          </center>
        </div>
      </div>
    </div>
    <div class="col-md-6" v-if="step == 2">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Image 2</strong>
        </div>
        <div class="card-body">
          <center>
            <canvas ref="image2View"></canvas>
            <p>
              A
              <strong style="color: rgb(44, 130, 201)"
                >Color Filter Array</strong
              >
              created from
              <strong style="color: rgb(97, 189, 109)">RGGB</strong> pattern
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
  setup() {
    let step = ref(1);
    let imageView = ref(null);
    let image1View = ref(null);
    let image2View = ref(null);

    let drawImage = function () {
      let img = new Image();
      img.src = "/image/interactive-tutorial/cfa/example2.png";
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
      let img = new Image();
      img.src = "/image/interactive-tutorial/cfa/example3_1.png";
      img.onload = function () {
        let canvasWidth = ref(window.innerWidth / 2);
        let canvasHeight = ref(window.innerHeight / 2);
        let ctx = image1View.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(img, ctx);
      };

      let img1 = new Image();
      img1.src = "/image/interactive-tutorial/cfa/example3_2.png";
      img1.onload = function () {
        let canvasWidth = ref(window.innerWidth / 2);
        let canvasHeight = ref(window.innerHeight / 2);
        let ctx = image2View.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(img1, ctx);
      };
    };

    let nextImage = function () {
      step.value = 2;
      drawNextImage();
    };

    onMounted(() => {
      drawImage();
    });

    return { imageView, step, nextImage, image1View, image2View };
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
