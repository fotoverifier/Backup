<template>
  <div class="row">
    <div class="col-md-6">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Original Image</strong>
        </div>
        <div class="card-body">
          <center>
            <canvas ref="image1View"></canvas>
            <p>
              File size:
              <strong style="color: rgb(250, 197, 28)">{{ size1 }} KB</strong>
            </p>
          </center>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Compressed Image</strong>
        </div>
        <div class="card-body">
          <center>
            <canvas ref="image2View"></canvas>
            <p>
              File size:
              <strong style="color: rgb(250, 197, 28)">{{ size2 }} KB</strong>
            </p>
          </center>
        </div>
      </div>
    </div>
  </div>
  <div class="row pt-4">
    <div class="col-md-12">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">JPEG Compression Setting</strong>
        </div>
        <div class="card-body">
          <label for="customRange2" class="form-label"
            >Quality:
            <strong style="color: rgb(250, 197, 28)">{{
              quality
            }}</strong></label
          >
          <div class="row">
            <div class="col-md-1">
              <p class="float-end">1</p>
            </div>
            <div class="col-md-10">
              <input
                type="range"
                class="form-range"
                min="1"
                max="100"
                id="customRange2"
                v-model="quality"
              />
            </div>
            <div class="col-md-1">100</div>
          </div>
          <center>
            <button
              type="button"
              class="btn btn-warning"
              @click="compressImage"
            >
              <svg
                v-if="!isLoading"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-seam-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003 6.97 2.789ZM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461L10.404 2Z"
                />
              </svg>
              <div
                class="spinner-border spinner-border-sm"
                role="status"
                v-if="isLoading"
              ></div>
              Compress Image
            </button>
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
    let size1 = ref(0);
    let size2 = ref(0);
    let quality = ref(100);
    let isLoading = ref(false);

    let drawImage2 = function () {
      let recompressImg = new Image();
      recompressImg.src = image1View.value.toDataURL(
        "image/jpeg",
        quality.value * 0.01
      );
      recompressImg.onload = function () {
        let canvasWidth = ref(window.innerWidth / 3);
        let canvasHeight = ref(window.innerHeight / 2);
        let ctx = image2View.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(recompressImg, ctx);
        size2.value = Math.round(
          image2View.value.toDataURL("image/jpeg").length / 1024
        );
        if (quality.value == 100) {
          size2.value = size1.value;
        }
        isLoading.value = false;
        if (size2.value == 37) {
          context.emit("doneImage");
        }
      };
    };

    let drawImage1 = function () {
      let img = new Image();
      img.src = "/image/interactive-tutorial/jpeg-ghost/exercise2_1.jpg";
      img.onload = function () {
        let canvasWidth = ref(window.innerWidth / 3);
        let canvasHeight = ref(window.innerHeight / 2);
        let ctx = image1View.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = canvasWidth.value;
        canvas.height = canvasHeight.value;
        drawImageScaled(img, ctx);
        size1.value = Math.round(
          image1View.value.toDataURL("image/jpeg").length / 1024
        );
        drawImage2();
      };
    };

    let compressImage = function () {
      isLoading.value = true;
      drawImage2();
    };

    onMounted(() => {
      drawImage1();
    });

    return {
      image1View,
      image2View,
      size1,
      size2,
      quality,
      isLoading,
      compressImage,
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
