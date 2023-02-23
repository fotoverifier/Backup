<template>
  <h4><b>Overview</b></h4>
  <p class="text">
    Brightness and Contrast are two concepts in image processing. Understanding
    these two concepts helps you to read Error Level Analysis results. However,
    it is often easy to get confused for newcomers. So in this tutorial, we will
    give their definitions and show the difference between these two concepts.
    You can interact with the examples in the article for better understanding.
  </p>

  <h4><b>Brightness</b></h4>
  <p class="text">
    Brightness is the overall lightness or darkness of the image. When you
    increase brightness, every pixel in the image gets lighter and when you
    decrease the brightness, every pixel in the image gets darker. You can
    select the image in the form below and change the brightness to see what
    happens.
  </p>

  <ImageBrightnessControl />

  <div class="brightness-loading pt-2" style="display: none">
    <center>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </center>
  </div>

  <h4><b>Contrast</b></h4>
  <p class="card-text">
    Contrast is the difference in brightness between objects in image. Increase
    contrast means increase the difference, then the result is light areas
    become lighter and dark areas become darker. In opposite, decrease the
    contrast makes light areas become darker and dark areas become lighter. You
    can examine with your picture in the form below for more understanding.
  </p>

  <ImageContrastControl />
  <br />
</template>

<script>
import ImageBrightnessControl from "./ImageBrightnessControl.vue";
import ImageContrastControl from "./ImageContrastControl.vue";

export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "What is Brightness & Contrast in an image?",
    });
  },
  components: {
    ImageBrightnessControl,
    ImageContrastControl,
  },
};
</script>
