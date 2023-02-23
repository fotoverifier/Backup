<template>
  <h4><b>Overview</b></h4>

  <p class="text">
    Median filtering is a process using in reducing impulsive, or
    salt-and-pepper noise. The median filter is also used to preserve edge
    properties while reducing the noise.
  </p>

  <h4><b>What is Kernel Size?</b></h4>

  <p class="text">
    Kernel is a square matrix k * k, where k is called Kernel Size and it is an
    odd number. Kernel is used in convolution in image processing for image
    blurring, sharpening, embossing, edge detection, etc.
  </p>

  <p class="text">
    To put it simply, Kernel Size is a feature of the noise reduction filter.
    Using larger Kernel Size in Median Filter leads to higher blurring level in
    output image.
  </p>

  <h4><b>Example of Median Filter with Kernel Size</b></h4>

  <p class="text">
    You can adjust Kernel Size for more understanding. The image is original
    when Kernel Size is 1.
  </p>

  <InteractiveMedianFilter />
</template>

<script>
import InteractiveMedianFilter from "./InteractiveMedianFilter.vue";

export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "What is Median Filter?",
    });
  },
  components: {
    InteractiveMedianFilter,
  },
};
</script>
