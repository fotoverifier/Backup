<template>
  <h5 class="title">6. Color Filter Array</h5>
  <p v-if="step == 1">
    Now let's learn about the concept of
    <strong style="color: rgb(97, 189, 109)">Color Filter Array</strong>. During
    digital photography,
    <strong style="color: rgb(250, 197, 28)">light from the scene</strong> is
    transmitted through the
    <strong style="color: rgb(250, 197, 28)">camera's lens</strong> and then
    passed through
    <strong style="color: rgb(250, 197, 28)">a filter layer</strong> called the
    <strong style="color: rgb(97, 189, 109)">Color Filter Array</strong> before
    being picked up by the
    <strong style="color: rgb(250, 197, 28)">camera sensor</strong>.
  </p>
  <p v-if="step == 1">
    A <strong style="color: rgb(97, 189, 109)">Color Filter Array</strong> is a
    <strong style="color: #f27289">two-dimensional array</strong> where each
    <strong style="color: rgb(250, 197, 28)">cell</strong> of the array contains
    <strong style="color: rgb(97, 189, 109)">one of the 3 colors</strong>
    corresponding to the three color channels in a digital image:
    <strong style="color: rgb(250, 197, 28)">red</strong>,
    <strong style="color: rgb(250, 197, 28)">green</strong>, or
    <strong style="color: rgb(250, 197, 28)">blue</strong>. When light passes
    through a <strong style="color: rgb(250, 197, 28)">cell</strong> of the
    <strong style="color: rgb(97, 189, 109)">Color Filter Array</strong>, the
    <strong style="color: rgb(250, 197, 28)">output</strong> will be a
    <strong style="color: rgb(250, 197, 28)">value</strong>
    corresponding to the
    <strong style="color: rgb(250, 197, 28)">color</strong> of that
    <strong style="color: rgb(250, 197, 28)">cell</strong>, and the
    <strong style="color: rgb(250, 197, 28)">value</strong> of the
    <strong style="color: rgb(250, 197, 28)">remaining colors</strong> will be
    <strong style="color: rgb(97, 189, 109)">filtered</strong>.
  </p>
  <p v-if="step == 1">
    This means that each
    <strong style="color: rgb(250, 197, 28)">pixel</strong> in the
    <strong style="color: rgb(97, 189, 109)">received image</strong> will have
    <strong style="color: #f27289">2 missing color channel</strong> values, so
    these <strong style="color: #f27289">missing values</strong> will then be
    calculated by
    <strong style="color: rgb(97, 189, 109)">interpolation</strong> based on the
    <strong style="color: #f27289">neighboring values</strong> which are
    obtained with a
    <strong style="color: rgb(97, 189, 109)">Color Filter Array</strong> to get
    a complete image.
  </p>
  <p v-if="step == 1">
    To make it easier to understand, look at the
    <strong style="color: rgb(250, 197, 28)">image on the right</strong>, it
    describes the process of
    <strong style="color: rgb(97, 189, 109)">taking an image</strong> from the
    camera from when the
    <strong style="color: rgb(97, 189, 109)">camera's sensor</strong> receives
    <strong style="color: rgb(97, 189, 109)">light</strong> until a
    <strong style="color: rgb(97, 189, 109)">complete image</strong> is
    obtained.
  </p>
  <p v-if="step == 2">
    There are many types of
    <strong style="color: rgb(44, 130, 201)">Color Filter Array</strong>, but
    the most common type used in digital cameras is the
    <strong style="color: rgb(44, 130, 201)">Bayer Color Filter Array</strong>.
    This array consists of
    <strong style="color: rgb(97, 189, 109)">4 patterns</strong>, where each
    <strong style="color: rgb(97, 189, 109)">pattern</strong> is a
    <strong style="color: #f27289">2x2 2-dimensional array</strong> consisting
    of 2 <strong style="color: rgb(97, 189, 109)">green</strong> cells, 1
    <strong style="color: rgb(97, 189, 109)">red</strong> cell and 1
    <strong style="color: rgb(97, 189, 109)">blue</strong> cell.
  </p>
  <p v-if="step == 2">
    When <strong style="color: rgb(97, 189, 109)">taking pictures</strong>, the
    <strong style="color: rgb(250, 197, 28)">camera</strong> will rely on the
    received
    <strong style="color: rgb(250, 197, 28)">light intensity</strong> to choose
    a suitable <strong style="color: rgb(97, 189, 109)">pattern</strong> from 4
    <strong style="color: rgb(97, 189, 109)">patterns</strong>, and then build a
    <strong style="color: rgb(97, 189, 109)">Color Filter Array</strong> by
    stitching that
    <strong style="color: rgb(97, 189, 109)">pattern</strong> together many
    times. We specify the name of each
    <strong style="color: rgb(97, 189, 109)">pattern</strong> to be the English
    abbreviation of each
    <strong style="color: rgb(97, 189, 109)">color</strong> in the
    <strong style="color: rgb(97, 189, 109)">pattern</strong> in the cells in
    order from left to right, from top to bottom:
    <strong style="color: rgb(44, 130, 201)">R</strong> is
    <strong style="color: rgb(44, 130, 201)">red</strong>,
    <strong style="color: rgb(44, 130, 201)">G</strong> is
    <strong style="color: rgb(44, 130, 201)">green</strong> and
    <strong style="color: rgb(44, 130, 201)">B</strong> is
    <strong style="color: rgb(44, 130, 201)">blue</strong>. So we have
    <strong style="color: rgb(97, 189, 109)">4 patterns</strong>:
    <strong style="color: rgb(97, 189, 109)">RGGB</strong>,
    <strong style="color: rgb(97, 189, 109)">GRBG</strong>,
    <strong style="color: rgb(97, 189, 109)">GBRG</strong>,
    <strong style="color: rgb(97, 189, 109)">BGGR</strong>
  </p>
  <p v-if="step == 2">
    For easy visualization, you can observe 2
    <strong style="color: rgb(250, 197, 28)">example images</strong> in the
    right, <strong style="color: rgb(250, 197, 28)">Image 1</strong> is
    <strong style="color: rgb(97, 189, 109)">4 patterns</strong> of
    <strong style="color: rgb(44, 130, 201)">Bayer Color Filter Array</strong>
    and <strong style="color: rgb(250, 197, 28)">Image 2</strong> is a
    <strong style="color: rgb(44, 130, 201)">Color Filter Array</strong> created
    from <strong style="color: rgb(97, 189, 109)">RGGB</strong> pattern.
  </p>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let step = ref(1);
    let nextDescription = function () {
      step.value = 2;
    };
    return {
      step,
      nextDescription,
    };
  },
};
</script>

<style scoped>
.title {
  color: #c0cbeb;
}

ul {
  padding-left: 20px;
}
</style>
