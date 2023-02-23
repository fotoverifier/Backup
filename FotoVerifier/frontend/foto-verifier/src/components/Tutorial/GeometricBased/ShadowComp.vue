<template>
  <b
    >Note: Some images and definitions in this tutorial are taken from paper
    <a href="https://farid.berkeley.edu/downloads/publications/tog13/tog13.pdf"
      >Exposing Photo Manipulation with Inconsistent Shadows</a
    ></b
  >
  <br />
  <br />

  <h4><b>Definition</b></h4>

  <p class="text">
    In an image, a shadow is a dark area where light from a light source is
    blocked by an opaque object. It occupies all of the three-dimensional volume
    behind an object with light in front of it.
  </p>

  <h4><b>Type of shadow</b></h4>

  <p class="text">
    In image processing, shadows are divided into 2 types: "Cast Shadow" and
    "Attached Shadow". In section below we will give a definition so you can
    distinguish between these 2 types of shadows in the image.
  </p>

  <h5><b>Cast Shadow</b></h5>

  <p class="text">
    Cast shadow is a shadow cast by an object in a image. We usually use
    Wedge-shaped constraints to describe the directions from a point in shadow
    to points on an object that may have cast the shadow. For example, in below
    image, The wedge labeled 1 corresponds to a cast shadow on the roof and the
    wedge labeled 2 corresponds to a cast shadow on the garage roof.
  </p>

  <center>
    <img src="/image/cast_shadow.png" alt="" />
  </center>

  <h5><b>Attached Shadow</b></h5>

  <p class="text">
    Attached shadows occur when objects occlude the light from themselves,
    leaving a portion of the object in shadow. For example, shown in image below
    is a cylinder and sphere illuminated by a distant point light source
    positioned to the left. Points are in shadow if the surface normal makes an
    angle greater than 90 degrees with the direction toward the light.
  </p>

  <center>
    <img src="/image/attached_shadow.png" alt="" />
  </center>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "What is Shadow in an image?",
    });
  },
};
</script>
