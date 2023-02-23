<template>
  <h5 class="title">8. Color Filter Array Detection</h5>
  <p v-if="step == 1">
    After going through the previous steps, we believe you have a good grasp of
    the concept of <strong style="color: #f27289">Image Splicing</strong> and
    <strong style="color: rgb(44, 130, 201)">Color Filter Array</strong>. In
    this step we will show you the idea of using
    <strong style="color: rgb(44, 130, 201)">Color Filter Array</strong> to
    detect a <strong style="color: rgb(97, 189, 109)">fake image</strong> using
    <strong style="color: #f27289">Image Splicing</strong>.
  </p>
  <p v-if="step == 1">
    This technique is based on the observation that when you
    <strong style="color: rgb(97, 189, 109)">paste a copied area</strong>
    into an image, it is likely that the
    <strong style="color: rgb(44, 130, 201)">Color Filter Array</strong> of the
    <strong style="color: rgb(97, 189, 109)">pasted area</strong> does not match
    the <strong style="color: rgb(44, 130, 201)">Color Filter Array</strong> of
    the <strong style="color: rgb(97, 189, 109)">entire image</strong>. So we
    can rely on this signal to detect the
    <strong style="color: rgb(97, 189, 109)">pasted area</strong>.
  </p>
  <p v-if="step == 1">More specifically, our tool will:</p>
  <ul v-if="step == 1">
    <li>
      1. Identify the
      <strong style="color: rgb(44, 130, 201)">Color Filter Array</strong> of
      the entire <strong style="color: rgb(97, 189, 109)">input image</strong>
    </li>
    <li>
      2. Split the <strong style="color: rgb(97, 189, 109)">image</strong> into
      <strong style="color: rgb(250, 197, 28)">square blocks</strong>, then
      identify the
      <strong style="color: rgb(44, 130, 201)">Color Filter Array</strong> of
      each <strong style="color: rgb(250, 197, 28)">block</strong> in the
      <strong style="color: rgb(97, 189, 109)">input image</strong>
    </li>
    <li>
      3. If the
      <strong style="color: rgb(44, 130, 201)">Color Filter Array</strong> of a
      <strong style="color: rgb(250, 197, 28)">block</strong> is different from
      the
      <strong style="color: rgb(44, 130, 201)">Color Filter Array</strong> of
      the <strong style="color: rgb(97, 189, 109)">entire image</strong>, this
      is most likely an
      <strong style="color: rgb(97, 189, 109)">edited area</strong>.
    </li>
  </ul>
  <p v-if="step == 2">
    To detect <strong style="color: rgb(97, 189, 109)">fake images</strong> by
    <strong style="color: #f27289">Image Splicing</strong> method using
    <strong style="color: rgb(44, 130, 201)">Color Filter Array</strong>
    technique, you can use
    <strong style="color: rgb(44, 130, 201)"
      >Color Filter Array Detection</strong
    >
    tool on our
    <strong style="color: rgb(44, 130, 201)">FotoVerifier</strong> site.
  </p>
  <p v-if="step == 2">
    First, you need to visit our
    <strong style="color: rgb(44, 130, 201)">FotoVerifier tool</strong> by
    accessing the <strong style="color: rgb(44, 130, 201)">site URL</strong> in
    <strong style="color: #f27289">our browser</strong> on the right hand.
  </p>
  <div class="card window" :class="{ 'card-shake': isShake }" v-if="step == 2">
    <div class="card-body">
      <div class="d-flex flex-row align-items-center flex-wrap">
        <div class="col-md-9">
          <strong>URL: </strong>
          <strong style="color: #f27289">{{ origin }}</strong>
        </div>
        <div class="col-md-3">
          <button
            type="button"
            class="btn btn-outline-warning btn-sm float-end btn-copy"
            @click="copyURL"
          >
            COPY
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let origin = ref(window.location.origin);
    let isShake = ref(false);
    let step = ref(1);

    let copyURL = async function () {
      await navigator.clipboard.writeText(origin.value);
    };

    let incorrectURL = function () {
      isShake.value = true;
      setTimeout(() => {
        isShake.value = false;
      }, 300);
    };

    let nextDescription = function () {
      step.value = 2;
    };
    return {
      step,
      nextDescription,
      copyURL,
      incorrectURL,
      origin,
      isShake,
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

.card-shake {
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
