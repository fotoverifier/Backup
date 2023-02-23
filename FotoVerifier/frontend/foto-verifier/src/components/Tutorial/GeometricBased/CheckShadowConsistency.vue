<template>
  <b
    >Note: Some images and definitions in this tutorial are taken from paper
    <a href="https://farid.berkeley.edu/downloads/publications/tog13/tog13.pdf"
      >Exposing Photo Manipulation with Inconsistent Shadows</a
    ></b
  >
  <br />
  <br />

  <h4><b>What is Shadow Consistency?</b></h4>

  <p class="text">
    For an authentic image there must be a location in the infinite plane that
    satisfies all cast and attached shadow constraints. That is, the
    intersection of all the constraints should define a non-empty region. That
    region is position of a light source in image when project to 2D plane.
  </p>

  <h4><b>Where to check Shadow Consistency in our site?</b></h4>

  <p class="text">
    After uploading image, click on "Geometric-based Analysis" icon on the left
    sidebar. To draw a shadow constraints, you click at "Shadow Constraint"
    button.
  </p>

  <center>
    <img src="/image/shadow_tool.png" alt="" />
  </center>

  <p class="text">
    Then you need to select 3 points on your image, one point at the shadow and
    other 2 points at the object which casts the shadow. After that you can see
    your shadow constraint as a Wedge on the image. For example, picture below
    has 2 shadow contraints.
  </p>

  <center>
    <img src="/image/shadow_constraint.png" alt="" />
  </center>

  <p class="text">
    After adding all the shadow constraints you want, click the button "Check
    Shadow Consistency" to check if there is any light source that sastify all
    the added shadow constraints.
  </p>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "How to check Shadow Consistency in an image?",
    });
  },
};
</script>
