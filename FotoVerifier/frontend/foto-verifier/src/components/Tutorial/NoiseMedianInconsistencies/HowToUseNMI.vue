<template>
  <h4><b>What is Noise Median Inconsistencies?</b></h4>

  <p class="text">
    Images usually contain noise, so manipulating a region causes noise
    inconsistencies. These inconsistencies can be difficult to see with normal
    eyes. The Median-filter noise residue inconsistency can be used to detect
    forgeries.
  </p>

  <p class="text">
    This technique is based on the noise inconsistency that remains when an
    image has been manipulated. The output image is acquired by applying a noise
    reduction filter (Median filter) and reversing the result. In other words,
    instead of removing the noise, this technique removes the rest of the image.
  </p>

  <p class="text">
    The region which contains too much noise, or too little noise can be doubted
    to be tampered with.
  </p>

  <h4><b>Where is Noise Median Inconsistencies tool on our site?</b></h4>

  <p class="text">
    To access Noise Median Inconsistencies, after uploading an image, click on
    "Advanced Analysis" icon in the sidebar on the left, then you will see
    "Noise Median Inconsistencies" section.
  </p>

  <h4>
    <b>What is the meaning of "Kernel Size" in Noise Median Inconsistencies?</b>
  </h4>

  <p class="text">
    To put it simply, Kernel Size is a feature of the noise reduction filter
    which is applied to this technique. When using larger Kernel Size, the
    output image will contain more noise.
  </p>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "How to use Noise Median Inconsistencies?",
    });
  },
};
</script>
