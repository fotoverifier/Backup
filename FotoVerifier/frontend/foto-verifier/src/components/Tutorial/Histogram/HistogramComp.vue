<template>
  <h4><b>Overview</b></h4>

  <p class="text">
    According to
    <a href="https://www.geeksforgeeks.org/histogram-of-an-image/"
      >geeksforgeeks</a
    >, there are some points about Histogram:
  </p>
  <ul>
    <li>
      Histogram of an image provides a global description of the appearance of
      an image.
    </li>
    <li>Information obtained from histogram is very large in quality.</li>
    <li>
      Histogram of an image represents the relative frequency of occurrence of
      various gray levels in an image.
    </li>
  </ul>
  <p class="text">
    In the RGB color space, color histogram is divided into three histograms
    corresponding to three gray levels red, green, and blue:
  </p>
  <ul>
    <li>
      Red histogram: Represents the color value distribution of the red channel
      in a pixel.
    </li>
    <li>
      Green histogram: Represents the color value distribution of the green
      channel in a pixel.
    </li>
    <li>
      Blue histogram: Represents the color value distribution of the blue
      channel in a pixel.
    </li>
  </ul>
  <h4><b>Example</b></h4>

  <p class="text">Consider this image:</p>

  <center>
    <img
      src="/image/tutorial/histogram/hist-tut-pic.jpg"
      alt=""
      style="width: 60%"
    />
  </center>

  <p class="text">
    Using our Histogram Analysis tool, these are three color histograms
    corresponding to three channels red, green, and blue of the image: the
    x-axis represents the gray level (integers in range 0 to 255), while the
    y-axis represents the probability of occurrence of that gray level.
  </p>

  <center>
    <img src="/image/tutorial/histogram/red.PNG" alt="" />
  </center>

  <center>
    <img src="/image/tutorial/histogram/green.PNG" alt="" />
  </center>

  <center>
    <img src="/image/tutorial/histogram/blue.PNG" alt="" />
  </center>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "What is Histogram of Image?",
    });
  },
};
</script>
