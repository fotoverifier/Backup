<template>
  <form @submit.prevent="handleUploadImage" class="pb-2">
    <label for="constract-image">Choose an image</label>
    <div class="input-group">
      <input type="file" class="form-control" id="fileInput" name="fileInput" />
      <button type="submit" class="btn btn-primary">Control contrast</button>
    </div>
  </form>

  <canvas ref="canvas" style="display: none"></canvas>

  <center>
    <ImageView
      :imageData="resultImageData"
      :canvasWidth="canvasWidth"
      :canvasHeight="canvasHeight"
      v-if="isFinished"
    />
  </center>

  <form v-if="hasImage">
    <div class="form-group">
      <label for="brightness">Brightness</label>
      <div class="row">
        <div class="col-md-11">
          <input
            @change="changeBrightness"
            type="range"
            class="form-range"
            min="0"
            max="4"
            step="0.01"
            id="brightness"
            v-model="brightness"
          />
        </div>
        <div class="col-md-1">
          <span>{{ Math.floor(100 * parseFloat(brightness)) }}</span
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
import { isImage } from "@/utils/image.js";
import Swal from "sweetalert2";
import { ref } from "vue";
import ImageView from "@/components/ImageView.vue";

export default {
  setup() {
    let isLoading = ref(false);
    let hasImage = ref(false);
    let brightness = ref(1);
    let imageData = ref("");
    let canvas = ref(null);
    let resultImageData = ref("");
    let canvasWidth = ref(window.innerWidth / 2);
    let canvasHeight = ref(window.innerHeight / 2);
    let isFinished = ref(false);

    let showImage = function () {
      isLoading.value = true;
      isFinished.value = false;
      let img = new Image();
      img.src = imageData.value;
      img.onload = function () {
        canvas.value.width = img.width;
        canvas.value.height = img.height;
        let ctx = canvas.value.getContext("2d");
        ctx.drawImage(img, 0, 0);

        let realBrightness = brightness.value;
        let canvasData = ctx.getImageData(
          0,
          0,
          canvas.value.width,
          canvas.value.height
        );
        for (let y = 0; y < canvas.value.height; y++) {
          for (let x = 0; x < canvas.value.width; x++) {
            let i = y * 4 * canvas.value.width + x * 4;
            canvasData.data[i] = Math.min(
              255,
              Math.floor(canvasData.data[i] * realBrightness)
            );
            canvasData.data[i + 1] = Math.min(
              255,
              Math.floor(canvasData.data[i + 1] * realBrightness)
            );
            canvasData.data[i + 2] = Math.min(
              255,
              Math.floor(canvasData.data[i + 2] * realBrightness)
            );
          }
        }

        ctx.putImageData(canvasData, 0, 0);
        resultImageData.value = canvas.value.toDataURL("image/jpeg");
        hasImage.value = true;
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
            brightness.value = 1;
            showImage();
          }
        };
        reader.readAsDataURL(file);
      }
    };

    let changeBrightness = function () {
      showImage();
    };

    return {
      isLoading,
      hasImage,
      handleUploadImage,
      imageData,
      brightness,
      canvas,
      resultImageData,
      canvasWidth,
      canvasHeight,
      isFinished,
      changeBrightness,
    };
  },
  components: {
    ImageView,
  },
};
</script>
