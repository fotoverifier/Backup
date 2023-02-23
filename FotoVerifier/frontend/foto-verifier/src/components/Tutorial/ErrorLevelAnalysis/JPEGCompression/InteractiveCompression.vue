<template>
  <canvas ref="sourceCanvas" style="display: none"></canvas>

  <center>
    <ImageView
      :imageData="resultImageData"
      :canvasWidth="canvasWidth"
      :canvasHeight="canvasHeight"
      v-if="isFinished"
    />
  </center>

  <form>
    <div class="form-group">
      <label for="quality">JPEG Quality</label>
      <div class="row">
        <div class="col-md-11">
          <input
            @change="recompressImage"
            type="range"
            class="form-range"
            min="1"
            max="100"
            id="quality"
            v-model="jpegQuality"
          />
        </div>
        <div class="col-md-1">
          <span>{{ jpegQuality }}</span
          >%
        </div>
      </div>
    </div>
  </form>

  <div class="upload-loading pt-2 pb-2" v-if="isLoading">
    <center>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </center>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ImageView from "@/components/ImageView.vue";

export default {
  setup() {
    let isLoading = ref(false);
    let jpegQuality = ref(80);
    let sourceCanvas = ref(null);
    let resultImageData = ref("");
    let canvasWidth = ref(window.innerWidth / 2);
    let canvasHeight = ref(window.innerHeight / 2);
    let isFinished = ref(false);

    let recompressImage = () => {
      isLoading.value = true;
      isFinished.value = false;
      let recompressImg = new Image();
      recompressImg.src = sourceCanvas.value.toDataURL(
        "image/jpeg",
        jpegQuality.value * 0.01
      );
      recompressImg.onload = function () {
        resultImageData.value = recompressImg.src;
        isLoading.value = false;
        isFinished.value = true;
      };
    };

    onMounted(() => {
      let img = new Image();
      img.src = "/image/landscape.jpg";
      img.onload = function () {
        sourceCanvas.value.width = img.width;
        sourceCanvas.value.height = img.height;
        let sourceCtx = sourceCanvas.value.getContext("2d");
        sourceCtx.drawImage(img, 0, 0);
        recompressImage();
      };
    });

    return {
      isLoading,
      jpegQuality,
      sourceCanvas,
      resultImageData,
      recompressImage,
      canvasWidth,
      canvasHeight,
      isFinished,
    };
  },
  components: {
    ImageView,
  },
};
</script>
