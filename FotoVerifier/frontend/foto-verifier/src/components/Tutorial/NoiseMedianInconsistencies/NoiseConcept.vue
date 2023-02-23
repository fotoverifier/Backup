<template>
  <h4><b>Overview</b></h4>

  <p class="text">
    The source of the image noise is mostly referred as camera sensors and
    associated internal electronic components. These components in the cameras
    introduce the anomalies or imperfections in the image which certainly
    degrades the quality of the image. These imperfections are referred as image
    noise.
  </p>

  <h4><b>Type of Noise</b></h4>

  <p class="text">
    Noise can be divided into three types: Photo-Electronic Noise, Impulse
    Noise, Structure Noise. You can see the example images of each type in the
    following chart.
  </p>

  <center>
    <img
      src="/image/tutorial/noise-median-inconsistencies/type-of-noise.png"
      alt=""
      style="width: 80%"
    />
  </center>

  <p class="text">
    We just concentrate on Impulse Noise, as it relates to Noise Median
    Inconsistencies tool. Image impulse noise is mainly arising due to the miss
    transmission of signals. This type of noise can also be caused due to
    malfunctioning of the pixels in the sensors of the camera or memory location
    faults.
  </p>

  <p class="text">
    Salt and Pepper Noise is a kind of Impulse Noise. Images would get the dark
    pixels in the bright region and bright pixels in the dark regions. Bit
    transmission errors and analog to digital converter errors cause Salt and
    Pepper Noise. You can look at the difference between the image without noise
    and the image with Salt and Pepper Noise.
  </p>

  <center>
    <img
      src="/image/tutorial/noise-median-inconsistencies/image-without-noise.png"
      alt=""
    />
    <p>Image without Noise</p>
    <img
      src="/image/tutorial/noise-median-inconsistencies/image-with-salt-pepper.png"
      alt=""
    />
    <p>Image with Salt and Pepper Noise</p>
  </center>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "What is Noise?",
    });
  },
};
</script>
