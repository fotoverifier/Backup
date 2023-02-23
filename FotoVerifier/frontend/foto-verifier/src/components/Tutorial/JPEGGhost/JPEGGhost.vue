<template>
  <p class="text">
    <b
      ><i
        >Note: You should approach concepts of Error Level Analysis before
        reading this article.</i
      ></b
    >
  </p>

  <h4><b>What is JPEG Ghost?</b></h4>

  <p class="text">
    Similar to Error Level Analysis (ELA), JPEG-Ghost is also a technique that
    uses artifacts left behind after the digital image is resaved using the JPEG
    format. The output image will produce a GHOST which is regions that suggest
    tampering.
  </p>

  <h4><b>Where is JPEG Ghost tool on our site?</b></h4>

  <p class="text">
    To access JPEG Ghost, after uploading an image, click on "Advanced Analysis"
    icon in the sidebar on the left, then you will see "JPEG Ghost" section.
  </p>

  <h4><b>How to read JPEG Ghost Result?</b></h4>

  <p class="text">
    Consider JPEG Ghost result to find which areas have different brightness
    from the others, and these areas can suggest tampering. If you don't see any
    areas like that, you can try adjusting JPEG Quality.
  </p>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "How to use JPEG Ghost?",
    });
  },
};
</script>
