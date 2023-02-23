<template>
  <h5 class="title">1. Image Cloning</h5>
  <p>
    One of the classic methods to fake an image is
    <strong style="color: #f27289">Image Cloning</strong> (also known as
    <strong style="color: #f27289">Copy-Move</strong>). There are 2 steps in
    this method:
  </p>
  <ul>
    <li>
      <strong>Step 1:</strong> People copy part of the image
      <strong style="color: rgb(97, 189, 109)">(copy-step)</strong>
    </li>
    <li>
      <strong>Step 2:</strong> People paste the copied part over another area of
      the same image
      <strong style="color: rgb(97, 189, 109)">(move-step)</strong>
    </li>
  </ul>
  <p>
    To make the fake photo more convincing, the pasted area needs to be edited
    to match the content of the image such as rotate, zoom in, zoom out,
    reflect, or change in light on the image to avoid detection by the naked
    eye.
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
