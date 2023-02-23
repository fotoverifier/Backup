<template>
  <h4><b>Overview</b></h4>

  <p class="text">
    Histogram Analysis is the tool that help user consider color histograms of
    the image in three channels red, green, and blue, in order to detect Double
    JPEG Compression.
  </p>

  <h4><b>Where is Histogram Analysis tool on our site?</b></h4>

  <p class="text">
    After uploading image, click on "Advanced Analysis" icon on the left
    sidebar. Choose "Histogram Analysis" menu, then click on "Red", "Green", or
    "Blue" button to see the corresponding color histogram of the image.
  </p>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "How to use Histogram Analysis?",
    });
  },
};
</script>
