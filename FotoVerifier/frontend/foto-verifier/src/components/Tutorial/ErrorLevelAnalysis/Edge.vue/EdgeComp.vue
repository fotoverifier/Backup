<template>
  <h4><b>Overview</b></h4>
  <p class="card-text">
    Edge is also a concept in image processing, and it is especially important
    to help you understand the results of Error Level Analysis. Here we present
    the concept of edge, you can interact by uploading a photo, we will show
    what are the edges of that image.
  </p>
  <br />

  <h4><b>Edge</b></h4>
  <p class="card-text">
    An edge in image is a subset of pixels, where at each pixel, the difference
    between it and its neighbor pixels is more higher than other pixels. For
    example, look at this picture:
  </p>
  <center>
    <img src="/image/edge.png" />
  </center>
  <p class="card-text">
    All pixels that lie next to the red line is edge, because there is a huge
    change when move from it to neighbour pixels. For more understanding, you
    can upload your image in the form below and we will point out where is edge
    in your image.
  </p>

  <EdgeDetector />

  <br />
</template>

<script>
import EdgeDetector from "./EdgeDetector.vue";

export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "What is Edge in an image?",
    });
  },
  components: {
    EdgeDetector,
  },
};
</script>
