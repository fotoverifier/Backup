<template>
  <h5 class="title">4. RGB Color in Image</h5>
  <p>
    Before learning about the concept of
    <strong style="color: rgb(97, 189, 109)">Color Filter Array</strong>, you
    need to know about how
    <strong style="color: rgb(250, 197, 28)">images</strong> are represented on
    a computer. Each <strong style="color: rgb(250, 197, 28)">image</strong> on
    the computer is viewed as a
    <strong style="color: #f27289">2-dimensional grid</strong> with the number
    of rows being the
    <strong style="color: rgb(250, 197, 28)">height</strong> of the image and
    the number of columns the
    <strong style="color: rgb(250, 197, 28)">width</strong> of the image. Each
    grid cell is called a
    <strong style="color: rgb(250, 197, 28)">pixel</strong>, and each
    <strong style="color: rgb(250, 197, 28)">pixel</strong>
    contains three numbers <strong style="color: rgb(97, 189, 109)">R</strong>,
    <strong style="color: rgb(97, 189, 109)">G</strong>,
    <strong style="color: rgb(97, 189, 109)">B</strong> representing the amount
    of <strong style="color: rgb(97, 189, 109)">red</strong>,
    <strong style="color: rgb(97, 189, 109)">green</strong>, and
    <strong style="color: rgb(97, 189, 109)">blue</strong> light needed to color
    that <strong style="color: rgb(250, 197, 28)">pixel</strong>. Each number is
    an <strong style="color: rgb(97, 189, 109)">integer</strong> between
    <strong style="color: rgb(97, 189, 109)">0-255</strong>, the larger the
    <strong style="color: rgb(97, 189, 109)">R</strong>
    value, the more <strong style="color: rgb(97, 189, 109)">red</strong> the
    <strong style="color: rgb(250, 197, 28)">pixel</strong> has, and the smaller
    the <strong style="color: rgb(250, 197, 28)">R</strong> value, the less
    <strong style="color: rgb(97, 189, 109)">red</strong>
    it is. The same applies to the two colors
    <strong style="color: rgb(97, 189, 109)">green</strong> and
    <strong style="color: rgb(97, 189, 109)">blue</strong>. So this
    representation is called
    <strong style="color: rgb(97, 189, 109)">RGB Color System</strong>.
  </p>
  <p>
    For better understanding, you can observe the example in the
    <strong style="color: rgb(250, 197, 28)">right image</strong>. This is an
    image of
    <strong style="color: rgb(97, 189, 109)">a squirrel</strong> represented as
    <strong style="color: rgb(250, 197, 28)">a grid</strong>. Its pixel is made
    up of <strong style="color: rgb(44, 130, 201)">75%</strong> of its
    <strong style="color: rgb(97, 189, 109)">red</strong> value,
    <strong style="color: rgb(44, 130, 201)">31%</strong> of its
    <strong style="color: rgb(97, 189, 109)">green</strong> value, and
    <strong style="color: rgb(44, 130, 201)">5%</strong> of its
    <strong style="color: rgb(97, 189, 109)">blue</strong> value.
  </p>
</template>

<script>
export default {
  setup() {},
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
