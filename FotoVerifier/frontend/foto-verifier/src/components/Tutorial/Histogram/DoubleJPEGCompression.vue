<template>
  <h4><b>What is JPEG Compression?</b></h4>

  <p class="text">
    For the definition and example of JPEG Compression, please visit
    <a href="/tutorial/ela/jpeg-compression">What is JPEG Compression</a>
    article.
  </p>

  <h4><b>What is Double JPEG Compression?</b></h4>

  <p class="text">
    Double JPEG Compression is when an image is decompressed from the original
    quality, then resaved with another quality, which occurs lossy compression.
    This affects the color histograms of the image.
  </p>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "What is Double JPEG Compression?",
    });
  },
};
</script>
