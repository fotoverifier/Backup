<template>
  <canvas id="source-canvas" ref="sourceCanvas" style="display: none"></canvas>
  <canvas id="result-canvas" ref="resultCanvas" style="display: none"></canvas>

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
      <label for="quality">Kernel Size</label>
      <div class="row">
        <div class="col-md-11">
          <input
            @change="filterMedian"
            type="range"
            class="form-range"
            min="1"
            max="11"
            step="2"
            id="quality"
            v-model="kernelSize"
          />
        </div>
        <div class="col-md-1">
          <span>{{ kernelSize }}</span>
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
import { ref, onMounted, inject } from "vue";
import ImageView from "@/components/ImageView.vue";

export default {
  setup() {
    let isLoading = ref(false);
    let kernelSize = ref(1);
    let sourceCanvas = ref(null);
    let resultCanvas = ref(null);
    let resultImageData = ref("");
    let canvasWidth = ref(window.innerWidth / 2);
    let canvasHeight = ref(window.innerHeight / 2);
    let isFinished = ref(false);

    let $cv = inject("$cv");

    let filterMedian = () => {
      isLoading.value = true;
      isFinished.value = false;
      let recompressImg = new Image();
      recompressImg.src = sourceCanvas.value.toDataURL("image/jpeg");

      const matSrc = $cv.imread("source-canvas");
      const matDst = new $cv.Mat();
      $cv.medianBlur(matSrc, matDst, parseInt(kernelSize.value));

      $cv.imshow("result-canvas", matDst);

      matSrc.delete();
      matDst.delete();

      recompressImg.onload = function () {
        resultImageData.value = resultCanvas.value.toDataURL("image/jpeg");
        isLoading.value = false;
        isFinished.value = true;
      };
    };

    onMounted(() => {
      let img = new Image();
      img.src =
        "/image/tutorial/noise-median-inconsistencies/median-filter-demo.png";
      img.onload = function () {
        sourceCanvas.value.width = img.width;
        sourceCanvas.value.height = img.height;
        let sourceCtx = sourceCanvas.value.getContext("2d");
        sourceCtx.drawImage(img, 0, 0);
        filterMedian();
      };
    });

    return {
      isLoading,
      kernelSize,
      sourceCanvas,
      resultCanvas,
      resultImageData,
      filterMedian,
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
