<template>
  <h5 class="title">6. Upload Image</h5>
  <p>
    Then you need to
    <strong style="color: rgb(250, 197, 28)">upload the photo</strong> you want
    to check on the
    <strong style="color: rgb(44, 130, 201)">FotoVerifier tool</strong>. You can
    upload photos from <strong style="color: #f27289">your computer</strong> or
    from <strong style="color: #f27289">an URL</strong>. To help you get started
    with uploading photos, we've included a sample photo below. Please
    <strong style="color: rgb(97, 189, 109)">drag and drop</strong> this photo
    into <strong style="color: rgb(44, 130, 201)">upload form</strong> on
    <strong style="color: rgb(44, 130, 201)">FotoVerifier tool</strong> and then
    click <strong style="color: rgb(97, 189, 109)">Analyze</strong> button.
  </p>

  <div class="sample-image" :class="{ shake: isShake }">
    <img
      src="/image/interactive-tutorial/jpeg-ghost/sample.jpg"
      class="img-fluid"
    />
    <center>
      <p><strong style="color: #f27289">sample.jpg</strong></p>
    </center>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let origin = ref(window.location.origin);
    let isShake = ref(false);
    let copyURL = async function () {
      await navigator.clipboard.writeText(origin.value);
    };

    let incorrectImage = function () {
      isShake.value = true;
      setTimeout(() => {
        isShake.value = false;
      }, 300);
    };

    return { origin, copyURL, incorrectImage, isShake };
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
