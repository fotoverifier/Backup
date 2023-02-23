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
  <canvas ref="sourceCanvas" id="source-canvas" style="display: none"></canvas>
  <canvas ref="resultCanvas" id="result-canvas" style="display: none"></canvas>
  <ImageView
    :imageData="resultImageData"
    :canvasWidth="canvasWidth"
    :canvasHeight="canvasHeight"
    v-if="isFinished"
  />
</template>

<script>
import { ref, onMounted, inject } from "vue";
//import { ref, onMounted, watch, inject } from "vue";
import ImageView from "../ImageView.vue";

export default {
  props: {
    imageData: String,
    canvasWidth: Number,
    canvasHeight: Number,
    kernelSize: Number,
  },
  setup(props) {
    let $cv = inject("$cv");
    let sourceCanvas = ref(null);
    let resultCanvas = ref(null);
    let resultImageData = ref("");
    let isFinished = ref(false);

    let noiseMedianInconsistencies = function () {
      isFinished.value = false;

      let sourceImg = new Image();
      sourceImg.src = props.imageData;
      sourceImg.onload = function () {
        sourceCanvas.value.width = sourceImg.width;
        sourceCanvas.value.height = sourceImg.height;
        let sourceCtx = sourceCanvas.value.getContext("2d");
        sourceCtx.drawImage(sourceImg, 0, 0);

        let recompressImg = new Image();
        recompressImg.src = sourceCanvas.value.toDataURL(
          "image/jpeg",
          props.jpegQuality * 0.01
        );

        recompressImg.onload = function () {
          let resultCtx = resultCanvas.value.getContext("2d");

          resultCanvas.value.width = recompressImg.width;
          resultCanvas.value.height = recompressImg.height;
          resultCtx.drawImage(recompressImg, 0, 0);

          console.time("Execution Time");

          const matSrc = $cv.imread("source-canvas");

          const kernelSize = parseInt(props.kernelSize);
          const matDst = new $cv.Mat();
          $cv.medianBlur(matSrc, matDst, kernelSize);

          const matDif = new $cv.Mat();
          const multiplier = 10;
          $cv.absdiff(matSrc, matDst, matDif);
          for (var i = 0; i < matDif.data.length; i += 4) {
            for (var j = 0; j < 3; j++) {
              matDif.data[i + j] = Math.min(
                255,
                matDif.data[i + j] * multiplier
              );
            }
          }

          const matDifGray = new $cv.Mat();
          $cv.cvtColor(matDif, matDifGray, $cv.COLOR_RGBA2GRAY);
          $cv.imshow("result-canvas", matDifGray);

          matSrc.delete();
          matDst.delete();
          matDif.delete();
          matDifGray.delete();

          console.timeEnd("Execution Time");

          resultImageData.value = resultCanvas.value.toDataURL("image/jpeg");

          isFinished.value = true;
        };
      };
    };

    onMounted(noiseMedianInconsistencies);

    // watch(
    //   () => props.kernelSize,
    //   () => {
    //     noiseMedianInconsistencies();
    //   }
    // );

    return {
      sourceCanvas,
      resultCanvas,
      resultImageData,
      isFinished,
      //adding for replacing "watch"
      noiseMedianInconsistencies,
    };
  },
  components: {
    ImageView,
  },
};
</script>
