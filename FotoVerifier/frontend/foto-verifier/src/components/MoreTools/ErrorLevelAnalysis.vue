<template>
  <div class="container" v-if="!isFinished">
    <div class="row">
      <div class="col-sm-12">
        <center>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </center>
      </div>
    </div>
  </div>
  <canvas ref="sourceCanvas" style="display: none"></canvas>
  <canvas ref="resultCanvas" style="display: none"></canvas>
  <ImageView
    :imageData="resultImageData"
    :canvasWidth="canvasWidth"
    :canvasHeight="canvasHeight"
    v-if="isFinished"
  />
</template>

<script>
import { ref, onMounted, watch } from "vue";
import ImageView from "../ImageView.vue";

export default {
  props: {
    imageData: String,
    canvasWidth: Number,
    canvasHeight: Number,
    jpegQuality: Number,
    errorScale: Number,
  },
  setup(props) {
    let sourceCanvas = ref(null);
    let resultCanvas = ref(null);
    let resultImageData = ref("");
    let isFinished = ref(false);

    let errorLevelAnalysis = function () {
      isFinished.value = false;

      let img = new Image();
      img.src = props.imageData;
      img.onload = function () {
        sourceCanvas.value.width = img.width;
        sourceCanvas.value.height = img.height;
        let sourceCtx = sourceCanvas.value.getContext("2d");
        sourceCtx.drawImage(img, 0, 0);

        let recompressImg = new Image();
        recompressImg.src = sourceCanvas.value.toDataURL(
          "image/jpeg",
          props.jpegQuality * 0.01
        );

        recompressImg.onload = function () {
          let resultCtx = resultCanvas.value.getContext("2d");
          let sourceCtx = sourceCanvas.value.getContext("2d");

          resultCanvas.value.width = recompressImg.width;
          resultCanvas.value.height = recompressImg.height;
          resultCtx.drawImage(recompressImg, 0, 0);

          let sourceData = sourceCtx.getImageData(
            0,
            0,
            recompressImg.width,
            recompressImg.height
          );
          let recompressData = resultCtx.getImageData(
            0,
            0,
            recompressImg.width,
            recompressImg.height
          );
          let errorScale = props.errorScale; // access to props multiple time is slow
          for (let i = 0; i < recompressData.data.length; i += 4) {
            for (let j = 0; j < 3; j++) {
              recompressData.data[i + j] =
                Math.abs(sourceData.data[i + j] - recompressData.data[i + j]) *
                errorScale;
            }
          }

          resultCtx.putImageData(recompressData, 0, 0);
          resultImageData.value = resultCanvas.value.toDataURL("image/jpeg");

          isFinished.value = true;
        };
      };
    };

    onMounted(errorLevelAnalysis);

    watch(
      () => props.jpegQuality,
      () => {
        errorLevelAnalysis();
      }
    );

    watch(
      () => props.errorScale,
      () => {
        errorLevelAnalysis();
      }
    );

    return {
      sourceCanvas,
      resultCanvas,
      resultImageData,
      isFinished,
    };
  },
  components: {
    ImageView,
  },
};
</script>
