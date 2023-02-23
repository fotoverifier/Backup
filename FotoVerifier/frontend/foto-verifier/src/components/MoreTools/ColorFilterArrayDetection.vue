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
import { ref, onMounted, watch } from "vue";
import ImageView from "../ImageView.vue";

export default {
  props: {
    imageData: String,
    canvasWidth: Number,
    canvasHeight: Number,
    jpegQuality: Number,
  },
  setup(props) {
    let sourceCanvas = ref(null);
    let resultCanvas = ref(null);
    let resultImageData = ref("");
    let isFinished = ref(false);

    let colorFilterArrayDetection = function () {
      isFinished.value = false;

      let sourceImg = new Image();
      sourceImg.src = props.imageData;
      sourceImg.onload = async function () {
        sourceCanvas.value.width = sourceImg.width;
        sourceCanvas.value.height = sourceImg.height;
        let sourceCtx = sourceCanvas.value.getContext("2d");
        sourceCtx.drawImage(sourceImg, 0, 0);

        let blob = await fetch(props.imageData).then((res) => res.blob());
        let formData = new FormData();
        formData.append("image", blob, "image.jpg");

        let requestOptions = {
          method: "POST",
          body: formData,
        };
        fetch("/api/cfa", requestOptions)
          .then((response) => response.blob())
          .then((blob) => {
            let url = URL.createObjectURL(blob);
            resultImageData.value = url;
            isFinished.value = true;
          });
      };
    };

    onMounted(colorFilterArrayDetection);

    watch(
      () => props.jpegQuality,
      () => {
        colorFilterArrayDetection();
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
