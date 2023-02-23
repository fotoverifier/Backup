<template>
  <h4><b>What is Error Level Analysis?</b></h4>

  <p class="text">
    Error Level Analysis (ELA) is a digital forensics method that works on lossy
    compression images, such as JPEG. It can identify areas within an image that
    are at different compression levels. A compressed image after decompression
    will have a slight deviation from the original image. If the image is not
    edited, the error difference between pixels is approximately the same. But
    if some section of image has significantly different error level, most
    likely that area has been modified. By observing the ELA result, we can know
    the error of each pixel in the image.
  </p>

  <h4><b>Where is Error Level Analysis tool on our site?</b></h4>

  <p class="text">
    To access Error Level Analysis tool, after uploading an image, click on
    "Advanced Analysis" icon in the sidebar on the left, then you will see
    "Error Level Analysis" section.
  </p>

  <h4><b>How to read ELA Result?</b></h4>

  <p class="text">
    First, we need to determine edge, texture and surface in our image. Then we
    should check in ELA result:
  </p>
  <ul>
    <li>
      <b>Edge</b>: All high-contrast edges must have similar brightness and all
      low-contrast edges must have similar brightness
    </li>
    <li>
      <b>Texture</b>: Area with more texture details will have brighter ELA
      result that low texture
    </li>
    <li>
      <b>Surface</b>: All smooth surface have same ELA brightness, regardless of
      the actual color of the surface
    </li>
  </ul>
  <h4>
    <b>What are the meaning of "JPEG Quality" and "Error Scale" in ELA?</b>
  </h4>

  <center>
    <img src="/image/ela.png" alt="" />
  </center>

  <ul>
    <li>
      <b>JPEG Quality</b>: If you don't see any areas in ELA result which have
      different brightness, you can try adjusting this value
    </li>
    <li>
      <b>Error Scale</b>: Adjust this value until you can see the ELA result
      easily. If ELA result is too dark, increase this value to make result
      lighter, otherwise decrease this value to make result darker
    </li>
  </ul>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "How to use Error Level Analysis?",
    });
  },
};
</script>
