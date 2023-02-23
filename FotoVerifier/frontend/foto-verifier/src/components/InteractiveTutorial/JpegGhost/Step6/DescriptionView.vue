<template>
  <h5 class="title">6. Detect JPEG Image Splicing with FotoVerifier</h5>
  <p>
    Now we will show you how to use the
    <strong style="color: rgb(44, 130, 201)">JPEG Ghost</strong> tool on the
    <strong style="color: rgb(44, 130, 201)">FotoVerifier</strong> site to
    detect images that have been tampered with using the
    <strong style="color: #f27289">Image Splicing</strong> method. To use the
    <strong style="color: rgb(44, 130, 201)">JPEG Ghost</strong> tool, the input
    image needs to satisfy
    <strong style="color: rgb(250, 197, 28)">2 conditions</strong>:
  </p>
  <ul>
    <li>
      <strong style="color: rgb(250, 197, 28)">Condition 1:</strong> Input image
      must be in <strong style="color: rgb(97, 189, 109)">JPEG format</strong>.
    </li>
    <li>
      <strong style="color: rgb(250, 197, 28)">Condition 2:</strong> Image has
      been tampered with by pasting the image area copied from another JPEG
      image with lower
      <strong style="color: rgb(250, 197, 28)">Quality</strong>.
    </li>
  </ul>
  <p>
    When pasting an image area from an image with a lower
    <strong style="color: rgb(250, 197, 28)">Quality</strong> and then saving
    the image, the
    <strong style="color: rgb(97, 189, 109)">pasted image area</strong> will be
    compressed twice, and the
    <strong style="color: rgb(97, 189, 109)">remaining areas</strong> will be
    compressed once. So the
    <strong style="color: rgb(44, 130, 201)">JPEG Ghost</strong> tool will
    detect pixels that are compressed twice and then find
    <strong style="color: rgb(97, 189, 109)">the pasted area</strong>.
  </p>
  <p>
    Now let's see how to access the
    <strong style="color: rgb(44, 130, 201)">JPEG Ghost</strong> tool. First,
    you need to visit our
    <strong style="color: rgb(44, 130, 201)">FotoVerifier</strong> site by
    accessing the <strong style="color: rgb(44, 130, 201)">site URL</strong> in
    <strong style="color: #f27289">our browser</strong> on the right hand.
  </p>
  <div class="card window" :class="{ 'card-shake': isShake }">
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
    let copyURL = async function () {
      await navigator.clipboard.writeText(origin.value);
    };

    let incorrectURL = function () {
      isShake.value = true;
      setTimeout(() => {
        isShake.value = false;
      }, 300);
    };

    return { origin, copyURL, incorrectURL, isShake };
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
