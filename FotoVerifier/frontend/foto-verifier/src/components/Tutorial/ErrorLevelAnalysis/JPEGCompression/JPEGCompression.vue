<template>
  <h4><b>Overview</b></h4>

  <p class="text">
    The Error Level Analysis technique that can detect modifications in JPEG
    images is based on the working principle of a JPEG image compression
    technique called JPEG Compression. Therefore, in this tutorial, we will help
    you understand how this mechanism works.
  </p>

  <h4><b>JPEG Compression</b></h4>

  <p class="card-text">
    Raw digital image can be respresent as a 2D array where each element is a
    pixel. Each pixel can be respresent as a tuple of 3 numbers, each range from
    0 to 255, is a value for 3 chanel Red, Green, Blue. But sometimes image size
    is large, so we need to compress it to get smaller size but still has a good
    quality. JPEG compression is a commonly used method. In a compression, JPEG
    removes some informations from image to reduce file size, so it is called a
    lossy compression method.
  </p>

  <br />

  <p class="card-text">
    When we use JPEG compression, we need to provide an integer number called
    "Quality", range from 1 to 100 - the quality of image after compression.
    Higher quality equals to lower compression level and vice versa. To easy
    understanding, you can test JPEG compression with picture below.
  </p>

  <InteractiveCompression />
</template>

<script>
import InteractiveCompression from "./InteractiveCompression.vue";

export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "What is JPEG Compression?",
    });
  },
  components: {
    InteractiveCompression,
  },
};
</script>
