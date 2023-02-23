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
  <canvas ref="imageView" @mousemove="showZoom" @mouseout="hideZoom"></canvas>
  <canvas
    ref="imageZoom"
    width="200"
    height="200"
    style="position: absolute; top: 0; left: 0; display: none"
  ></canvas>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { drawImageScaled } from "../utils/canvas.js";

export default {
  props: {
    imageData: String,
    canvasWidth: Number,
    canvasHeight: Number,
  },
  setup(props) {
    let imageView = ref(null);
    let imageZoom = ref(null);
    let isFinished = ref(false);

    onMounted(() => {
      let img = new Image();
      img.src = props.imageData;

      img.onload = function () {
        let ctx = imageView.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = props.canvasWidth;
        canvas.height = props.canvasHeight;
        drawImageScaled(img, ctx);

        isFinished.value = true;
      };
    });

    let showZoom = function (e) {
      if (!isFinished.value) {
        return;
      }

      let zoomCanvas = imageZoom.value;
      let zoomCtx = zoomCanvas.getContext("2d");

      zoomCtx.fillStyle = "white";
      zoomCtx.fillRect(0, 0, zoomCanvas.width, zoomCanvas.height);

      let imageCanvas = imageView.value;
      let rect = imageCanvas.getBoundingClientRect();
      let scaleX = imageCanvas.width / rect.width;
      let scaleY = imageCanvas.height / rect.height;

      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      zoomCtx.drawImage(imageCanvas, x, y, 100, 100, 0, 0, 200, 200);
      zoomCanvas.style.top = e.pageY + 10 + "px";
      zoomCanvas.style.left = e.pageX + 10 + "px";
      zoomCanvas.style.display = "block";
      zoomCanvas.style.border = "2px solid #fff";
    };

    let hideZoom = function () {
      let zoomCanvas = imageZoom.value;
      zoomCanvas.style.display = "none";
    };

    watch(
      () => props.imageData,
      (newVal) => {
        console.log("imageData changed " + newVal);
      }
    );

    return {
      imageView,
      imageZoom,
      isFinished,
      showZoom,
      hideZoom,
    };
  },
};
</script>
