<template>
  <h4><b>What is a Thumbnail?</b></h4>

  <p class="text">
    A thumbnail is a compressed preview image of the original which is often
    embedded in an image's JPEG header and is used as a placeholder. Therefore,
    the thumbnail can be used as a signature for image authentication.
    Sometimes, when the original image is edited, the thumbnail is left
    untouched. We can compare the image and its thumbnail to detect modification
    by using Thumbnail Analysis.
  </p>

  <h4><b>Where is Thumbnail Analysis tool on our site?</b></h4>
  <p class="text">
    To access Thumbnail Analysis tool, after uploading an image, you will be at
    Format-based Analysis section. Click on "Thumbnail Analysis" to see the
    result.
  </p>

  <p class="text">
    If you are not at the Thumbnail Analysis tool, click on "Format-based
    Analysis", then click on "Thumbnail Analysis" tab.
  </p>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "How to use Thumbnail Analysis?",
    });
  },
};
</script>
