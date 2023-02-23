<template>
  <div class="card window">
    <div class="card-header window-header">
      <strong style="color: rgb(44, 130, 201)">{{ title }}</strong>
    </div>
    <div class="card-body">
      <center>
        <div class="row">
          <div class="col-md-6">
            <center>
              <canvas ref="originalView"></canvas>
            </center>
            <h5>
              <b>Original Image</b>
            </h5>
          </div>
          <div class="col-md-6">
            <center>
              <canvas ref="fakedView"></canvas>
            </center>
            <h5>
              <b>Faked Image</b>
            </h5>
          </div>
        </div>
      </center>
      <p class="pt-2">
        <strong style="color: #f27289">Question:</strong> What is the purpose of
        the image cloning on the photo above?
      </p>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          value="purpose1"
          v-model="answer"
        />
        <label class="form-check-label" for="flexRadioDefault1">
          Hide something on orignal image
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          value="purpose2"
          v-model="answer"
        />
        <label class="form-check-label" for="flexRadioDefault2">
          Rely on the details available in the image to create new details
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { drawImageScaled } from "../../../../utils/canvas.js";

export default {
  emits: ["doneImage1", "doneImage2"],

  setup(props, context) {
    let originalView = ref(null);
    let fakedView = ref(null);
    let title = ref("Pair of Images 1");
    let currentImage = 1;
    let answer = ref("");

    let drawFirstPair = function () {
      let img = new Image();
      img.src = "/image/interactive-tutorial/copy-move/exercise2_1.png";
      img.onload = function () {
        let canvasWidth = ref(window.innerWidth / 3);
        let canvasHeight = ref(window.innerHeight / 2);
        let ctx = originalView.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(img, ctx);
      };

      let img1 = new Image();
      img1.src = "/image/interactive-tutorial/copy-move/exercise2_1_fake.png";
      img1.onload = function () {
        let canvasWidth = ref(window.innerWidth / 3);
        let canvasHeight = ref(window.innerHeight / 2);
        let ctx = fakedView.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(img1, ctx);
      };
    };

    let drawSecondPair = function () {
      currentImage = 2;
      title.value = "Pair of Images 2";
      answer.value = "";

      let img = new Image();
      img.src = "/image/interactive-tutorial/copy-move/exercise2_2.jpg";
      img.onload = function () {
        let canvasWidth = ref(window.innerWidth / 3);
        let canvasHeight = ref(window.innerHeight / 2);
        let ctx = originalView.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(img, ctx);
      };

      let img1 = new Image();
      img1.src = "/image/interactive-tutorial/copy-move/exercise2_2_fake.jpg";
      img1.onload = function () {
        let canvasWidth = ref(window.innerWidth / 3);
        let canvasHeight = ref(window.innerHeight / 2);
        let ctx = fakedView.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(img1, ctx);
      };
    };

    onMounted(() => {
      drawFirstPair();
    });

    watch(
      () => answer.value,
      () => {
        if (currentImage == 1 && answer.value == "purpose1") {
          context.emit("doneImage1");
        }
        console.log(currentImage + " " + answer.value);
        if (currentImage == 2 && answer.value == "purpose2") {
          context.emit("doneImage2");
        }
      }
    );

    return {
      originalView,
      fakedView,
      currentImage,
      drawSecondPair,
      title,
      answer,
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
