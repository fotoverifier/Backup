<template>
  <form @submit.prevent="handleUploadImage" class="pb-2">
    <label for="constract-image">Choose an image</label>
    <div class="input-group">
      <input type="file" class="form-control" id="fileInput" name="fileInput" />
      <button type="submit" class="btn btn-primary">Find edge</button>
    </div>
  </form>

  <canvas ref="blackWhiteCanvas" style="display: none"></canvas>
  <canvas ref="edgeCanvas" style="display: none"></canvas>

  <center>
    <ImageView
      :imageData="imageData"
      :canvasWidth="canvasWidth"
      :canvasHeight="canvasHeight"
      v-if="isFinished"
    />
    <ImageView
      :imageData="resultImageData"
      :canvasWidth="canvasWidth"
      :canvasHeight="canvasHeight"
      v-if="isFinished"
    />
  </center>

  <div class="upload-loading pt-2 pb-2" v-if="isLoading">
    <center>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </center>
  </div>
</template>

<script>
import { isImage } from "@/utils/image.js";
import Swal from "sweetalert2";
import { ref } from "vue";
import ImageView from "@/components/ImageView.vue";

export default {
  setup() {
    let isLoading = ref(false);
    let imageData = ref("");
    let blackWhiteCanvas = ref(null);
    let edgeCanvas = ref(null);
    let resultImageData = ref("");
    let canvasWidth = ref(window.innerWidth / 2);
    let canvasHeight = ref(window.innerHeight / 2);
    let isFinished = ref(false);

    let convertToBlackWhite = function () {
      let blackWhiteCtx = blackWhiteCanvas.value.getContext("2d");
      let sourceData = blackWhiteCtx.getImageData(
        0,
        0,
        blackWhiteCanvas.value.width,
        blackWhiteCanvas.value.height
      );
      for (let y = 0; y < blackWhiteCanvas.value.height; y++) {
        for (let x = 0; x < blackWhiteCanvas.value.width; x++) {
          let i = y * 4 * blackWhiteCanvas.value.width + x * 4;
          let avg =
            (sourceData.data[i] +
              sourceData.data[i + 1] +
              sourceData.data[i + 2]) /
            3;
          sourceData.data[i] = avg;
          sourceData.data[i + 1] = avg;
          sourceData.data[i + 2] = avg;
        }
      }

      blackWhiteCtx.putImageData(sourceData, 0, 0);
    };

    let findEdge = function () {
      isLoading.value = true;
      isFinished.value = false;
      let img = new Image();
      img.src = imageData.value;
      img.onload = function () {
        blackWhiteCanvas.value.width = img.width;
        blackWhiteCanvas.value.height = img.height;
        let blackWhiteCtx = blackWhiteCanvas.value.getContext("2d");
        blackWhiteCtx.drawImage(img, 0, 0);

        convertToBlackWhite();

        edgeCanvas.value.width = img.width;
        edgeCanvas.value.height = img.height;
        let edgeCtx = edgeCanvas.value.getContext("2d");
        edgeCtx.fillStyle = "black";
        edgeCtx.fillRect(0, 0, edgeCanvas.value.width, edgeCanvas.value.height);

        let sourceData = blackWhiteCtx.getImageData(
          0,
          0,
          blackWhiteCanvas.value.width,
          blackWhiteCanvas.value.height
        );
        let edgeData = edgeCtx.getImageData(
          0,
          0,
          edgeCanvas.value.width,
          edgeCanvas.value.height
        );
        let threshold = 30;

        for (let y = 0; y < blackWhiteCanvas.value.height; y++) {
          for (let x = 0; x < blackWhiteCanvas.value.width; x++) {
            let i = y * 4 * blackWhiteCanvas.value.width + x * 4;
            let maxDiff = 0;
            if (y - 1 >= 0) {
              let j = (y - 1) * 4 * blackWhiteCanvas.value.width + x * 4;
              maxDiff = Math.max(
                maxDiff,
                Math.abs(sourceData.data[i] - sourceData.data[j])
              );
            }
            if (y + 1 < blackWhiteCanvas.value.height) {
              let j = (y + 1) * 4 * blackWhiteCanvas.value.width + x * 4;
              maxDiff = Math.max(
                maxDiff,
                Math.abs(sourceData.data[i] - sourceData.data[j])
              );
            }
            if (x - 1 >= 0) {
              let j = y * 4 * blackWhiteCanvas.value.width + (x - 1) * 4;
              maxDiff = Math.max(
                maxDiff,
                Math.abs(sourceData.data[i] - sourceData.data[j])
              );
            }
            if (x + 1 < blackWhiteCanvas.value.width) {
              let j = y * 4 * blackWhiteCanvas.value.width + (x + 1) * 4;
              maxDiff = Math.max(
                maxDiff,
                Math.abs(sourceData.data[i] - sourceData.data[j])
              );
            }

            if (maxDiff > threshold) {
              edgeData.data[i] = 255;
              edgeData.data[i + 1] = 255;
              edgeData.data[i + 2] = 255;
            }
          }
        }

        edgeCtx.putImageData(edgeData, 0, 0);
        resultImageData.value = edgeCanvas.value.toDataURL("image/jpeg");

        isFinished.value = true;
        isLoading.value = false;
      };
    };

    let handleUploadImage = function (e) {
      isLoading.value = true;
      if (e.target.elements.fileInput.files.length == 0) {
        isLoading.value = false;
        Swal.fire({
          icon: "error",
          title: "No image selected",
          text: "Please select an image to analyze!",
        });
      } else {
        let file = e.target.elements.fileInput.files[0];
        let reader = new FileReader();
        reader.onload = async function (e) {
          let isValidImage = await isImage(e.target.result);
          isLoading.value = false;
          if (!isValidImage) {
            Swal.fire({
              icon: "error",
              title: "Invalid image",
              text: "Not a valid image. Please select another file!",
            });
          } else {
            imageData.value = e.target.result;
            findEdge();
          }
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      isLoading,
      handleUploadImage,
      imageData,
      blackWhiteCanvas,
      edgeCanvas,
      resultImageData,
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
