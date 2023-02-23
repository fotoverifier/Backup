<template>
  <div class="row">
    <div class="col-md-12 pt-2">
      <p v-if="step == 1">
        Click on <strong style="color: #f27289">More tools</strong> on the
        <strong style="color: rgb(97, 189, 109)">left sidebar</strong>.
      </p>
      <p v-if="step == 2">
        Click on
        <strong style="color: #f27289">Copy-move Detection</strong> below the
        text <strong style="color: #f27289">Choose a DIF Method</strong>.
      </p>
      <p v-if="step == 3">
        When you are ready, click <strong class="text-warning">Next</strong> to
        continue.
      </p>
    </div>
  </div>
  <div class="row pt-2">
    <div class="col-md-6">
      <button
        type="button"
        class="btn btn-secondary"
        v-if="!isShowHint1 && step == 1"
        @click="showHint1"
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
      <button
        type="button"
        class="btn btn-secondary"
        v-if="!isShowHint2 && step == 2"
        @click="showHint2"
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
      <button
        type="button"
        class="btn btn-secondary"
        v-if="!isShowHint3 && step == 3"
        @click="showHint3"
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
    <div class="col-md-6" v-if="step == 3">
      <button
        type="button"
        class="btn btn-warning float-end"
        v-on:click="finishTutorial"
      >
        Finish
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
  emits: ["nextStep", "showHint1"],

  setup(props, context) {
    let step = ref(1);
    let isShowHint1 = ref(true);
    let isShowHint2 = ref(false);
    let isShowHint3 = ref(false);
    let accessedFotoVerifier = ref(false);
    let nextStep = function () {
      context.emit("nextStep");
    };

    let hideHint1 = function () {
      isShowHint1.value = false;
    };

    let showHint1 = function () {
      isShowHint1.value = true;
      context.emit("showHint1");
    };

    let hideHint2 = function () {
      isShowHint2.value = false;
    };

    let showHint2 = function () {
      isShowHint2.value = true;
      context.emit("showHint2");
    };

    let showHint3 = function () {
      isShowHint3.value = true;
      context.emit("showHint3");
    };

    let moveToStep2 = function () {
      isShowHint2.value = true;
      step.value = 2;
    };

    let moveToStep3 = function () {
      isShowHint3.value = true;
      step.value = 3;
    };

    let hideHint3 = function () {
      isShowHint3.value = false;
    };

    let finishTutorial = function () {
      context.emit("finishTutorial");
    };

    return {
      nextStep,
      accessedFotoVerifier,
      isShowHint1,
      hideHint1,
      showHint1,
      step,
      moveToStep2,
      hideHint2,
      showHint2,
      isShowHint2,
      moveToStep3,
      hideHint3,
      showHint3,
      isShowHint3,
      finishTutorial,
    };
  },
};
</script>
