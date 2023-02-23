<template>
  <div class="row">
    <div class="col-md-12 pt-2">
      <p v-if="step == 1">
        When you are ready, click <strong class="text-warning">Next</strong> to
        continue
      </p>
      <p v-if="step == 2">
        Enter the <strong style="color: rgb(44, 130, 201)">URL</strong> of the
        <strong style="color: rgb(44, 130, 201)">FotoVerifier tool</strong> in
        the <strong style="color: #f27289">address bar</strong> of
        <strong style="color: #f27289">our browser</strong> then press
        <strong style="color: rgb(97, 189, 109)">Enter</strong> to access
        <strong style="color: rgb(44, 130, 201)">FotoVerifier</strong>
      </p>
    </div>
  </div>
  <div class="row pt-2">
    <div class="col-md-6">
      <button
        type="button"
        class="btn btn-secondary"
        v-if="!isShowHint && step == 2"
        @click="showHint"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-question-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
          />
        </svg>
        Show Hint
      </button>
    </div>
    <div class="col-md-6">
      <button
        type="button"
        class="btn btn-warning float-end"
        v-on:click="nextDescription()"
        v-if="step == 1"
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
      <button
        type="button"
        class="btn btn-warning float-end"
        v-on:click="nextStep()"
        v-if="accessedFotoVerifier && step == 2"
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
  emits: ["nextStep"],

  setup(props, context) {
    let step = ref(1);
    let isShowHint = ref(true);
    let accessedFotoVerifier = ref(false);

    let nextStep = function () {
      context.emit("nextStep");
    };

    let nextDescription = function () {
      step.value = 2;
      context.emit("nextDescription");
    };

    let hideHint = function () {
      isShowHint.value = false;
    };

    let showHint = function () {
      isShowHint.value = true;
      context.emit("showHint");
    };

    return {
      nextStep,
      step,
      nextDescription,
      isShowHint,
      accessedFotoVerifier,
      hideHint,
      showHint,
    };
  },
};
</script>
