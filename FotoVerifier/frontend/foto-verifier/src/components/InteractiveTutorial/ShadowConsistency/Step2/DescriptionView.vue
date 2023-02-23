<template>
  <h5 class="title">2. Shadow in Image Forgery Detection</h5>
  <p>
    There are many methods to detect
    <strong style="color: #f27289">image forgery</strong>, some methods have
    been integrated on our
    <strong style="color: rgb(44, 130, 201)">FotoVerifier</strong> tool such as
    <strong style="color: rgb(97, 189, 109)">Copy-Move Detection</strong> to
    detect <strong style="color: #f27289">Image Cloning</strong> or
    <strong style="color: rgb(97, 189, 109)">JPEG Ghost</strong>
    to detect <strong style="color: #f27289">Image Splicing</strong>. However,
    the <strong style="color: rgb(250, 197, 28)">weakness</strong> of these
    tools is that it only works well on
    <strong style="color: rgb(97, 189, 109)">freshly tampered</strong> images,
    meaning that the images after being forged have not undergone any other
    <strong style="color: rgb(97, 189, 109)">editing steps</strong>.
  </p>
  <p>
    For example, when uploading photos to social networks, images will often be
    <strong style="color: rgb(250, 197, 28)">scaled down</strong> and
    <strong style="color: rgb(250, 197, 28)">recompressed</strong> to reduce
    their sizes, so the above tools will find it difficult to detect
    <strong style="color: rgb(97, 189, 109)">traces of editing</strong>, leading
    to <strong style="color: rgb(97, 189, 109)">reduced performance</strong> of
    the tool.
  </p>
  <p>
    However, the <strong style="color: rgb(250, 197, 28)">shadows</strong> in
    the image are often not affected by
    <strong style="color: rgb(250, 197, 28)">scaledown</strong> or
    <strong style="color: rgb(250, 197, 28)">recompress</strong>, so the shadows
    in the image are a
    <strong style="color: rgb(97, 189, 109)">good trace</strong> to detect
    forgery in the image. That's why we introduce you the
    <strong style="color: #f27289">Shadow Consistency Checking</strong>
    method. In the next step, you will learn about two types of
    <strong style="color: rgb(250, 197, 28)">shadows</strong> in an image. Let's
    continue!
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
