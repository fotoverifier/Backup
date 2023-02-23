<template>
  <h5 class="title">4. Idea of Reflection Consistency Checking</h5>
  <p>
    The idea of using
    <strong style="color: #f27289">Reflection Consistency Checking</strong> to
    check if an <strong style="color: rgb(97, 189, 109)">image</strong> has been
    <strong style="color: rgb(97, 189, 109)">edited</strong> is very simple. If
    more than one
    <strong style="color: #f27289">Reflection Vanishing Point</strong> is found
    with the same
    <strong style="color: rgb(97, 189, 109)">plane of reflection</strong>, the
    <strong style="color: rgb(250, 197, 28)">reflections</strong> in the image
    are <strong style="color: #f27289">inconsistent</strong>, leading to the
    conclusion that the
    <strong style="color: rgb(97, 189, 109)">image</strong> has been
    <strong style="color: rgb(97, 189, 109)">edited</strong>.
  </p>
  <p>
    For example, in the image on the right, this image was
    <strong style="color: rgb(97, 189, 109)">edited</strong> by adding a
    <strong style="color: rgb(97, 189, 109)">dinosaur</strong> to the
    <strong style="color: rgb(97, 189, 109)">right side</strong>. If you look at
    it with the naked eye, it is difficult to detect the
    <strong style="color: #f27289">inconsistency</strong>, but when drawing
    <strong style="color: rgb(250, 197, 28)">straight lines</strong> we can see
    that they form 2
    <strong style="color: #f27289">Reflection Vanishing Points</strong>.
  </p>
  <p>
    One note is that choosing a
    <strong style="color: rgb(97, 189, 109)">corresponding point</strong> on the
    <strong style="color: rgb(250, 197, 28)">object's reflection</strong> may
    have <strong style="color: #f27289">small errors</strong>, resulting in the
    formation of many
    <strong style="color: #f27289">Reflection Vanishing Points</strong>. But if
    the <strong style="color: rgb(250, 197, 28)">distance</strong> between these
    <strong style="color: rgb(97, 189, 109)">points</strong> is
    <strong style="color: rgb(97, 189, 109)">small</strong> enough, we consider
    them a single
    <strong style="color: #f27289">Reflection Vanishing Point</strong>.
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
