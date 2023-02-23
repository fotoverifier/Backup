<template>
  <h5 class="title">8. Use "JPEG Ghost" tool</h5>
  <p v-if="step == 1">
    Once you have uploaded the image, you need to move to the
    <strong style="color: #f27289">Image Splicing</strong>
    detection tool to investigate on the
    <strong style="color: rgb(97, 189, 109)">uploaded JPEG image</strong>,
    called <strong style="color: #f27289">JPEG Ghost</strong>. Now we will guide
    you step by step to open this tool.
  </p>

  <p v-if="step == 3">
    Now you can see the <strong style="color: #f27289">result</strong> in the
    <strong style="color: #f27289">image on the right</strong>, areas that are
    highlighted in <strong style="color: rgb(97, 189, 109)">green</strong> mean
    that it is
    <strong style="color: rgb(250, 197, 28)">compressed once</strong>, i.e.
    <strong style="color: rgb(97, 189, 109)">unmodified areas</strong>. The
    areas shaded in <strong style="color: rgb(44, 130, 201)">blue</strong> are
    <strong style="color: rgb(250, 197, 28)">double-compressed</strong> areas,
    most likely areas pasted from another JPEG of lower
    <strong style="color: rgb(250, 197, 28)">Quality</strong>. Observing the
    results, we can see that the cat is copied from another image and then
    merged with the
    <strong style="color: #f27289">Image Splicing</strong> technique. You can
    see more clearly by moving the mouse over an area and the area will be
    enlarged.
  </p>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let step = ref(1);

    let moveToStep3 = function () {
      step.value = 3;
    };

    return { origin, step, moveToStep3 };
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

.btn-copy:focus {
  outline: none;
  box-shadow: none;
}

.window {
  background-color: #2c3967;
  border: 1px solid rgba(128, 152, 255, 0.22);
  box-shadow: 0 0.1875rem 1px -2px rgba(0, 0, 0, 0.2),
    0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 1px 0.3125rem 0 rgba(0, 0, 0, 0.12);
  border-radius: 0;
}

.shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.btn-copy:active {
  animation: shake 0.1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
