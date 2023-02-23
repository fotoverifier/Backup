<template>
  <div class="row">
    <div class="col-md-12 pt-2">
      <p v-if="step == 1">
        Click on the
        <strong style="color: rgb(250, 197, 28)">leftmost man</strong> in
        <strong style="color: rgb(97, 189, 109)">Image 1</strong>.
      </p>
      <p v-if="step == 2 || step == 3">
        Drag <strong style="color: rgb(250, 197, 28)">him</strong> to
        <strong style="color: rgb(44, 130, 201)">the blue rectangle</strong> in
        <strong style="color: rgb(97, 189, 109)">Image 2</strong>.
      </p>
    </div>
  </div>
  <div class="row pt-2">
    <div class="col-md-6"></div>
    <div class="col-md-6">
      <button
        type="button"
        class="btn btn-warning float-end"
        v-on:click="nextStep()"
        v-if="step == 3"
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

    let moveToStep2 = function () {
      step.value = 2;
    };

    let moveToStep3 = function () {
      step.value = 3;
    };

    return {
      nextStep,
      step,
      moveToStep2,
      moveToStep3,
    };
  },
};
</script>
