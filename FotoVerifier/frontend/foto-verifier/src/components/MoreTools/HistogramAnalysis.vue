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
  <div v-if="isFinished" v-html="svgstring"></div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  props: {
    imageData: String,
    color: String,
  },
  setup(props) {
    let sourceCanvas = ref(null);
    let isFinished = ref(false);
    let svgstring = ref("");

    let histogramAnalysis = function () {
      isFinished.value = false;
      let img = new Image();
      img.src = props.imageData;
      img.onload = function () {
        sourceCanvas.value.width = img.width;
        sourceCanvas.value.height = img.height;
        let sourceCtx = sourceCanvas.value.getContext("2d");
        sourceCtx.drawImage(img, 0, 0);

        let imageData = sourceCtx.getImageData(
          0,
          0,
          sourceCanvas.value.width,
          sourceCanvas.value.height
        );
        let freq = new Array(256);
        for (let i = 0; i < 256; i++) {
          freq[i] = 0;
        }
        let color = props.color;
        for (let i = 0; i < imageData.data.length; i += 4) {
          if (color == "red") {
            freq[imageData.data[i]]++;
          } else if (color == "green") {
            freq[imageData.data[i + 1]]++;
          } else if (color == "blue") {
            freq[imageData.data[i + 2]]++;
          }
        }
        let maxFreq = 0;
        for (let i = 0; i < 256; i++) {
          if (freq[i] > maxFreq) {
            maxFreq = freq[i];
          }
        }

        let histWidth = window.innerWidth / 3;
        let histHeight = window.innerHeight / 2;
        let columnWidth = 2;
        let pixelsPerUnit = histHeight / maxFreq;

        let hexColour;
        let x = 0;
        let columnHeight;

        svgstring.value = `<svg width='${histWidth}px' height='${histHeight}px' xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink'>\n`;

        for (let i = 0; i < 256; i++) {
          hexColour = i.toString(16).padStart(2, "0");

          if (color == "red") {
            hexColour = "#" + hexColour + "0000";
          } else if (color == "green") {
            hexColour = "#00" + hexColour + "00";
          } else if (color == "blue") {
            hexColour = "#0000" + hexColour;
          }

          columnHeight = freq[i] * pixelsPerUnit;

          svgstring.value += `    <rect fill='${hexColour}' stroke='${hexColour}' stroke-width='0.25px' width='${columnWidth}' height='${columnHeight}' y='${
            histHeight - columnHeight
          }' x='${x}' />\n`;

          x += columnWidth;
        }

        svgstring.value += "</svg>";

        isFinished.value = true;
      };
    };

    onMounted(histogramAnalysis);

    watch(
      () => props.color,
      () => {
        histogramAnalysis();
      }
    );

    return { sourceCanvas, isFinished, svgstring };
  },
};
</script>
