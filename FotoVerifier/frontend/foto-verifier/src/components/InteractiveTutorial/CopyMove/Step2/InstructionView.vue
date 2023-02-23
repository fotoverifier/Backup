<template>
  <div class="row">
    <div class="col-md-12 pt-2">
      <p v-if="step == 1 || step == 2">
        Click on
        <strong style="color: rgb(97, 189, 109)">original part</strong> and
        <strong style="color: rgb(97, 189, 109)">copied part</strong> in
        <strong class="text-warning">Image 1</strong>
      </p>
      <p v-if="step == 3 || step == 4">
        Click on
        <strong style="color: rgb(97, 189, 109)">original part</strong> and
        <strong style="color: rgb(97, 189, 109)">copied part</strong> on
        <strong class="text-warning">Image 2</strong>
      </p>
    </div>
  </div>
  <div class="row pt-2">
    <div class="col-md-6"></div>
    <div class="col-md-6">
      <button
        type="button"
        class="btn btn-warning float-end"
        v-if="step == 2"
        v-on:click="nextImage()"
      >
        Go to Image 2
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
      </button>
      <button
        type="button"
        class="btn btn-warning float-end"
        v-on:click="nextStep()"
        v-if="step == 4"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  emits: ["nextStep", "nextImage"],

  setup(props, context) {
    let step = ref(1);

    let nextStep = function () {
      context.emit("nextStep");
    };

    let nextImage = function () {
      context.emit("nextImage");
      step.value++;
    };

    let doneImage1 = function () {
      step.value++;
    };

    let doneImage2 = function () {
      step.value++;
    };

    return {
      nextStep,
      step,
      doneImage1,
      doneImage2,
      nextImage,
    };
  },
};
</script>
