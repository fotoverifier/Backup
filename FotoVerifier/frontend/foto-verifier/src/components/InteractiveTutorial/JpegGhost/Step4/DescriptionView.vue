<template>
  <h5 class="title">4. JPEG Image Compression</h5>
  <p v-if="step == 1">
    Since the method of detecting
    <strong style="color: #f27289">Image Splicing</strong> on images that we
    introduce to you in this tutorial is called
    <strong style="color: rgb(44, 130, 201)">JPEG Ghost</strong>, it only
    detects on <strong style="color: rgb(97, 189, 109)">JPEG images</strong>, so
    you need to understand the concept of
    <strong style="color: rgb(97, 189, 109)">JPEG format</strong> of image.
  </p>
  <p v-if="step == 1">
    After taking a photo, the camera needs to compress the captured image to
    <strong style="color: rgb(97, 189, 109)">reduce the size</strong> and then
    save it to memory, thus saving memory and saving more photos. There are
    <strong style="color: rgb(250, 197, 28)">two types</strong> of image
    compression methods:
  </p>
  <ul v-if="step == 1">
    <li>
      <strong style="color: rgb(250, 197, 28)">Lossless Compression:</strong>
      This method compresses by looking for similar patterns, so that the
      compressed image still retains the original data.
    </li>
    <li>
      <strong style="color: rgb(250, 197, 28)">Lossy Compression:</strong> The
      image is compressed by removing the details that are not important or
      difficult to detect with the naked eye, so the compressed image will lack
      some details compared to the original image.
    </li>
  </ul>
  <p v-if="step == 2">
    <strong style="color: rgb(97, 189, 109)">JPEG format</strong> is a
    <strong style="color: rgb(250, 197, 28)">Lossy Compression</strong> format
    that omits details in an image based on two principles:
  </p>
  <ul v-if="step == 2">
    <li>
      Changes in <strong style="color: rgb(97, 189, 109)">light</strong> are
      easier to detect by the human eye than changes in
      <strong style="color: rgb(97, 189, 109)">color</strong>.
    </li>
    <li>
      Changes in
      <strong style="color: rgb(97, 189, 109)">low-frequency parts</strong> are
      easier to detect by the human eye than changes in
      <strong style="color: rgb(97, 189, 109)">high-frequency parts</strong>.
    </li>
  </ul>
  <p v-if="step == 2">
    There is a parameter when compressing with
    <strong style="color: rgb(97, 189, 109)">JPEG</strong> called
    <strong style="color: rgb(250, 197, 28)">Quality</strong>, is an integer
    between <strong style="color: rgb(250, 197, 28)">1</strong> and
    <strong style="color: rgb(250, 197, 28)">100</strong>, the
    <strong style="color: rgb(44, 130, 201)">smaller</strong> the
    <strong style="color: rgb(250, 197, 28)">Quality</strong>, the more
    compression, ie, more details are removed and the capacity is reduced more
    but when decompressing will be more blurred. The
    <strong style="color: rgb(44, 130, 201)">higher</strong> the
    <strong style="color: rgb(250, 197, 28)">Quality</strong>, the less
    compressed the image and the clearer the image after decompression.
  </p>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let step = ref(1);

    let nextDescription = function () {
      step.value = 2;
    };

    return { step, nextDescription };
  },
};
</script>

<style scoped>
.title {
  color: #c0cbeb;
}

ul {
  padding-left: 20px;
}
</style>
