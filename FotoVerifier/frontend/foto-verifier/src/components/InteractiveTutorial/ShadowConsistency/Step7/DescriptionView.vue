<template>
  <h5 class="title">7. Idea of Shadow Consistency Checking</h5>
  <p v-if="step == 1">
    Now we believe you have understood the concept of
    <strong style="color: rgb(250, 197, 28)">Cast Shadow</strong> and
    <strong style="color: rgb(250, 197, 28)">Attached Shadow</strong>. But how
    to use them in detecting
    <strong style="color: rgb(97, 189, 109)">edited areas</strong> in images?
    Here we will answer this question for you.
  </p>
  <p v-if="step == 1">
    In an <strong style="color: rgb(97, 189, 109)">unedited photo</strong>,
    assume that there is only one
    <strong style="color: rgb(97, 189, 109)">light source</strong>, such as the
    <strong style="color: rgb(250, 197, 28)">sun</strong> or a
    <strong style="color: rgb(250, 197, 28)">lamp</strong> in the room, there is
    always a <strong style="color: #f27289">consistency</strong> between the
    <strong style="color: rgb(250, 197, 28)">shadows</strong> in the image: If
    we connect a <strong style="color: rgb(97, 189, 109)">point</strong> in the
    <strong style="color: rgb(250, 197, 28)">shadows</strong> with the
    <strong style="color: rgb(97, 189, 109)">corresponding point</strong> in the
    <strong style="color: rgb(250, 197, 28)">objects</strong>, we will get many
    <strong style="color: rgb(97, 189, 109)">lines</strong>, which will
    intersect at the
    <strong style="color: rgb(97, 189, 109)">light source</strong>. Note that
    the <strong style="color: rgb(97, 189, 109)">intersecting point</strong> may
    be out of range of the image.
  </p>
  <p v-if="step == 1">
    For easy visualization, you can observe the image on the right. In an image
    where the only
    <strong style="color: rgb(97, 189, 109)">light source</strong> is a
    <strong style="color: rgb(250, 197, 28)">light bulb</strong>, the
    <strong style="color: rgb(97, 189, 109)">red</strong>,
    <strong style="color: rgb(97, 189, 109)">blue</strong>,
    <strong style="color: rgb(97, 189, 109)">yellow</strong>, and
    <strong style="color: rgb(97, 189, 109)">green</strong> lines are the
    <strong style="color: rgb(97, 189, 109)">lines</strong> connecting a
    <strong style="color: rgb(97, 189, 109)">point</strong> in the
    <strong style="color: rgb(250, 197, 28)">shadow</strong> with the
    <strong style="color: rgb(97, 189, 109)">corresponding point</strong> in the
    <strong style="color: rgb(250, 197, 28)">object</strong>. These lines
    intersect at the <strong style="color: rgb(250, 197, 28)">bulb</strong>.
    This shows that the
    <strong style="color: rgb(250, 197, 28)">shadows</strong> in this image are
    <strong style="color: #f27289">consistent</strong> with each other.
  </p>

  <p v-if="step == 2">
    So think about how to check if a photo has been
    <strong style="color: rgb(97, 189, 109)">edited</strong> or not? You might
    think to just connect the
    <strong style="color: rgb(97, 189, 109)">points</strong> in the
    <strong style="color: rgb(250, 197, 28)">shadows</strong> with the
    <strong style="color: rgb(97, 189, 109)">corresponding points</strong> in
    the <strong style="color: rgb(250, 197, 28)">objects</strong> to form
    <strong style="color: rgb(97, 189, 109)">lines</strong>
    and then check if they
    <strong style="color: #f27289">intersect</strong>. This idea is close to
    correct, but the problem is that with a
    <strong style="color: rgb(97, 189, 109)">point</strong> in the
    <strong style="color: rgb(250, 197, 28)">shadow</strong>, it is
    <strong style="color: #f27289">difficult</strong> to choose
    <strong style="color: #f27289">exactly</strong> a
    <strong style="color: rgb(97, 189, 109)">corresponding point</strong> in the
    <strong style="color: rgb(250, 197, 28)">object</strong>.
  </p>
  <p v-if="step == 2">
    So to solve the above problem, instead of you having to connect
    <strong style="color: rgb(97, 189, 109)">point to point</strong>, for each
    <strong style="color: rgb(97, 189, 109)">point</strong> in the
    <strong style="color: rgb(250, 197, 28)">shadow</strong> you need to draw a
    <strong style="color: #f27289">range</strong> in the
    <strong style="color: rgb(250, 197, 28)">object</strong> so that the
    <strong style="color: #f27289">range</strong>
    contains the
    <strong style="color: rgb(97, 189, 109)">corresponding point</strong> in the
    <strong style="color: rgb(250, 197, 28)">object</strong>. Thus, there will
    be no need to find the exact
    <strong style="color: rgb(97, 189, 109)">corresponding point</strong> in the
    <strong style="color: rgb(250, 197, 28)">object</strong>. Such range is
    called <strong style="color: #f27289">wedge</strong>.
  </p>
  <p v-if="step == 2">
    So instead of checking for
    <strong style="color: #f27289">intersecting lines</strong>, we need to check
    if the <strong style="color: #f27289">intersection</strong> of the
    <strong style="color: #f27289">wedges</strong> is a
    <strong style="color: rgb(97, 189, 109)">positive area</strong>. If yes,
    this region is called
    <strong style="color: rgb(97, 189, 109)">Feasible Region</strong>. Note that
    <strong style="color: rgb(97, 189, 109)">Feasible Region</strong> may be out
    of range of the image.
  </p>
  <p v-if="step == 2">
    For ease of visualization, observe the image on the right. The green areas
    are the <strong style="color: #f27289">wedges</strong>, their
    <strong style="color: #f27289">intersection</strong>
    is the
    <strong style="color: rgb(97, 189, 109)">Feasible Region</strong> located
    right at the
    <strong style="color: rgb(97, 189, 109)">light source</strong> which is the
    <strong style="color: rgb(97, 189, 109)">bulb</strong>.
  </p>
  <p v-if="step == 3">
    For <strong style="color: rgb(97, 189, 109)">edited images</strong>, the
    <strong style="color: rgb(250, 197, 28)">shadows</strong> of the
    <strong style="color: rgb(250, 197, 28)">edited objects</strong> can be
    <strong style="color: #f27289">inconsistent</strong> with other
    <strong style="color: rgb(250, 197, 28)">shadows</strong> in the image, but
    are <strong style="color: #f27289">difficult</strong> to detect with the
    naked eye. However, by plotting the
    <strong style="color: #f27289">wedges</strong>, you can detect this
    <strong style="color: #f27289">inconsistency</strong>.
  </p>
  <p v-if="step == 3">
    The image on the right is an
    <strong style="color: rgb(97, 189, 109)">image</strong> edited by
    <strong style="color: rgb(97, 189, 109)">merging</strong> oranges from
    <strong style="color: rgb(97, 189, 109)">another image</strong>. As a
    result, the <strong style="color: #f27289">wedge</strong> of the orange has
    nothing in common with the <strong style="color: #f27289">wedges</strong> of
    the <strong style="color: rgb(250, 197, 28)">objects</strong> in the
    <strong style="color: rgb(97, 189, 109)">original image</strong>.
  </p>
  <p v-if="step == 4">
    Another problem is that for
    <strong style="color: rgb(250, 197, 28)">Cast Shadow</strong>, you can
    easily draw <strong style="color: #f27289">wedges</strong> because you can
    estimate the position of the
    <strong style="color: rgb(97, 189, 109)">corresponding point</strong> on the
    <strong style="color: rgb(250, 197, 28)">object</strong>. But what about
    <strong style="color: rgb(250, 197, 28)">Attached Shadow</strong>? Actually,
    the <strong style="color: #f27289">wedge</strong> of the
    <strong style="color: rgb(250, 197, 28)">Attached Shadow</strong> is the
    <strong style="color: rgb(97, 189, 109)">half-plane</strong> perpendicular
    to the
    <strong style="color: rgb(97, 189, 109)">direction vector</strong> from the
    <strong style="color: rgb(250, 197, 28)">Attached Shadow</strong> to the
    <strong style="color: rgb(250, 197, 28)">light source</strong>.
  </p>
  <p v-if="step == 4">
    To make it easier to visualize, you can see the image on the right, the
    <strong style="color: rgb(250, 197, 28)">light</strong> is shining from
    right to left, and the
    <strong style="color: rgb(97, 189, 109)">green area</strong> is the
    <strong style="color: #f27289">wedge</strong> of the
    <strong style="color: rgb(250, 197, 28)">Attached Shadow</strong> on the
    man's left shoulder. The
    <strong style="color: rgb(97, 189, 109)">blue arrow</strong> is the
    <strong style="color: rgb(97, 189, 109)">vector</strong> pointing from the
    <strong style="color: rgb(250, 197, 28)">Attached Shadow</strong> to the
    <strong style="color: rgb(250, 197, 28)">light source</strong>.
  </p>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let step = ref(1);

    let nextDescription = function () {
      step.value++;
    };

    return { step, nextDescription };
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
