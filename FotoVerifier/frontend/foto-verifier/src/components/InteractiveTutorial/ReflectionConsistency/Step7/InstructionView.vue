<template>
  <div class="row">
    <div class="col-md-12 pt-2">
      <p v-if="step == 1">
        Click on
        <strong style="color: #f27289">Check reflection consistency</strong> on
        the <strong style="color: rgb(97, 189, 109)">left sidebar</strong>.
      </p>
      <p
        v-if="
          step == 2 ||
          step == 3 ||
          step == 7 ||
          step == 8 ||
          step == 13 ||
          step == 14 ||
          step == 15 ||
          step == 17 ||
          step == 19
        "
      >
        When you are ready, click <strong class="text-warning">Next</strong> to
        continue.
      </p>

      <p v-if="step == 4">
        Click on
        <strong style="color: rgb(97, 189, 109)"> Add New</strong> button under
        <strong style="color: rgb(97, 189, 109)">Reflection Constraint</strong>
        section in the
        <strong style="color: rgb(97, 189, 109)">toolbar</strong>.
      </p>

      <p v-if="step == 5">
        Select a point <strong style="color: rgb(250, 197, 28)">A</strong> in
        border of the <strong style="color: #f27289">white truck</strong> by
        clicking at
        <strong style="color: rgb(250, 197, 28)">blinking yellow circle</strong>
        in <strong style="color: rgb(97, 189, 109)">image view</strong>.
      </p>

      <p v-if="step == 6">
        Select a point <strong style="color: rgb(250, 197, 28)">B</strong> which
        is the point corresponding to point
        <strong style="color: rgb(250, 197, 28)">A</strong> in the
        <strong style="color: rgb(250, 197, 28)">reflection image</strong> of
        the object by clicking at
        <strong style="color: rgb(250, 197, 28)">blinking yellow circle</strong>
        in <strong style="color: rgb(97, 189, 109)">image view</strong>.
      </p>

      <p v-if="step == 9">
        Click on
        <strong style="color: rgb(97, 189, 109)"> Add New</strong> button under
        <strong style="color: rgb(97, 189, 109)">Cast Shadow Constraint</strong>
        section in the
        <strong style="color: rgb(97, 189, 109)">toolbar</strong>.
      </p>

      <p v-if="step == 10">
        Select a point <strong style="color: rgb(250, 197, 28)">A</strong> in
        <strong style="color: rgb(250, 197, 28)">cast shadow</strong> of the
        <strong style="color: #f27289">blue signboards</strong> by clicking at
        <strong style="color: rgb(250, 197, 28)">blinking yellow circle</strong>
        in <strong style="color: rgb(97, 189, 109)">image view</strong>.
      </p>

      <p v-if="step == 11">
        Select a point <strong style="color: rgb(250, 197, 28)">B</strong> in
        border of the <strong style="color: #f27289">blue signboards</strong> by
        clicking at
        <strong style="color: rgb(250, 197, 28)">blinking yellow circle</strong>
        in <strong style="color: rgb(97, 189, 109)">image view</strong>.
      </p>

      <p v-if="step == 12">
        Select a point <strong style="color: rgb(250, 197, 28)">C</strong> in
        border of the
        <strong style="color: #f27289">blue signboards</strong> such that
        <strong style="color: #f27289">range</strong> form by scanning line
        segment <strong style="color: rgb(250, 197, 28)">AB</strong> to
        <strong style="color: rgb(250, 197, 28)">AC</strong>
        contains the
        <strong style="color: rgb(250, 197, 28)">corresponding point</strong> on
        the <strong style="color: #f27289">blue signboards</strong> with the
        point <strong style="color: rgb(250, 197, 28)">A</strong> by clicking at
        <strong style="color: rgb(250, 197, 28)">blinking yellow circle</strong>
        in <strong style="color: rgb(97, 189, 109)">image view</strong>.
      </p>

      <p v-if="step == 16">
        Click on
        <strong style="color: rgb(97, 189, 109)">
          Check Reflection Consistency</strong
        >
        button in the
        <strong style="color: rgb(97, 189, 109)">toolbar</strong> to check if
        drawn
        <strong style="color: rgb(250, 197, 28)">reflection constraints</strong>
        are <strong style="color: #f27289">consistent</strong> or not.
      </p>

      <p v-if="step == 18 || step == 20">
        Click on
        <strong style="color: rgb(97, 189, 109)">
          Check Reflection Consistency</strong
        >
        button in the
        <strong style="color: rgb(97, 189, 109)">toolbar</strong> to check if
        drawn
        <strong style="color: rgb(250, 197, 28)">reflection constraints</strong>
        are <strong style="color: #f27289">consistent</strong> or not.
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
        v-if="!isShowHint4 && step == 4"
        @click="showHint4"
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
        v-if="!isShowHint9 && step == 9"
        @click="showHint9"
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
        v-if="!isShowHint16 && step == 16"
        @click="showHint16"
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
        v-if="!isShowHint17 && step == 17"
        @click="showHint17"
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
        v-if="!isShowHint18 && step == 18"
        @click="showHint18"
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
        v-if="!isShowHint20 && step == 20"
        @click="showHint20"
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
    <div class="col-md-6" v-if="step == 21">
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
    <div
      class="col-md-6"
      v-if="
        step == 2 ||
        step == 3 ||
        step == 7 ||
        step == 8 ||
        step == 13 ||
        step == 14 ||
        step == 15 ||
        step == 17 ||
        step == 19
      "
    >
      <button
        type="button"
        class="btn btn-warning float-end"
        v-on:click="nextSmallStep()"
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
  emits: ["nextStep", "showHint1"],

  setup(props, context) {
    let step = ref(1);
    let isShowHint1 = ref(true);
    let isShowHint4 = ref(true);
    let isShowHint9 = ref(true);
    let isShowHint16 = ref(true);
    let isShowHint17 = ref(true);
    let isShowHint18 = ref(true);
    let isShowHint20 = ref(true);
    let accessedFotoVerifier = ref(false);

    let nextStep = function () {
      context.emit("nextStep");
    };

    let hideHint1 = function () {
      isShowHint1.value = false;
    };

    let hideHint4 = function () {
      isShowHint4.value = false;
    };

    let hideHint9 = function () {
      isShowHint9.value = false;
    };

    let hideHint16 = function () {
      isShowHint16.value = false;
    };

    let hideHint17 = function () {
      isShowHint17.value = false;
    };

    let hideHint18 = function () {
      isShowHint18.value = false;
    };

    let hideHint20 = function () {
      isShowHint20.value = false;
    };

    let showHint1 = function () {
      isShowHint1.value = true;
      context.emit("showHint1");
    };

    let showHint4 = function () {
      isShowHint4.value = true;
      context.emit("showHint4");
    };

    let showHint9 = function () {
      isShowHint9.value = true;
      context.emit("showHint9");
    };

    let showHint16 = function () {
      isShowHint16.value = true;
      context.emit("showHint16");
    };

    let showHint17 = function () {
      isShowHint17.value = true;
      context.emit("showHint17");
    };

    let showHint18 = function () {
      isShowHint18.value = true;
      context.emit("showHint18");
    };

    let showHint20 = function () {
      isShowHint20.value = true;
      context.emit("showHint20");
    };

    let moveToStep2 = function () {
      step.value = 2;
    };

    let moveToStep3 = function () {
      step.value = 3;
      context.emit("moveToStep3");
    };

    let moveToStep4 = function () {
      isShowHint4.value = true;
      step.value = 4;
      context.emit("moveToStep4");
    };

    let moveToStep5 = function () {
      step.value = 5;
    };

    let moveToStep6 = function () {
      step.value = 6;
    };

    let moveToStep7 = function () {
      step.value = 7;
    };

    let moveToStep8 = function () {
      step.value = 8;
      context.emit("moveToStep8");
    };

    let moveToStep14 = function () {
      step.value = 14;
      context.emit("moveToStep14");
    };

    let moveToStep15 = function () {
      step.value = 15;
      context.emit("moveToStep15");
    };

    let moveToStep16 = function () {
      step.value = 16;
      context.emit("moveToStep16");
    };

    let moveToStep17 = function () {
      step.value = 17;
    };

    let moveToStep18 = function () {
      step.value = 18;
      context.emit("moveToStep18");
    };

    let moveToStep20 = function () {
      step.value = 20;
      context.emit("moveToStep20");
    };

    let moveToStep21 = function () {
      step.value = 21;
    };

    let moveToStep10 = function () {
      step.value = 10;
    };

    let moveToStep11 = function () {
      step.value = 11;
    };

    let moveToStep12 = function () {
      step.value = 12;
    };

    let moveToStep13 = function () {
      step.value = 13;
    };

    let moveToStep19 = function () {
      step.value = 19;
    };

    let finishTutorial = function () {
      context.emit("finishTutorial");
    };

    let nextSmallStep = function () {
      step.value++;
      if (step.value == 3) {
        moveToStep3();
      } else if (step.value == 4) {
        moveToStep4();
      } else if (step.value == 8) {
        moveToStep8();
      } else if (step.value == 9) {
        moveToStep15();
      } else if (step.value == 14) {
        moveToStep14();
      } else if (step.value == 15) {
        moveToStep15();
      } else if (step.value == 16) {
        moveToStep16();
      } else if (step.value == 18) {
        moveToStep18();
      } else if (step.value == 20) {
        moveToStep20();
      }
    };

    return {
      nextStep,
      accessedFotoVerifier,
      isShowHint1,
      hideHint1,
      showHint1,
      step,
      moveToStep2,
      moveToStep3,
      moveToStep4,
      finishTutorial,
      nextSmallStep,
      hideHint4,
      showHint4,
      isShowHint4,
      moveToStep5,
      moveToStep6,
      moveToStep7,
      hideHint9,
      isShowHint9,
      showHint9,
      moveToStep10,
      moveToStep11,
      moveToStep12,
      moveToStep13,
      moveToStep14,
      moveToStep16,
      hideHint16,
      showHint16,
      isShowHint16,
      moveToStep17,
      isShowHint17,
      hideHint17,
      showHint17,
      moveToStep18,
      showHint18,
      hideHint18,
      isShowHint18,
      moveToStep19,
      moveToStep20,
      hideHint20,
      showHint20,
      isShowHint20,
      moveToStep21,
    };
  },
};
</script>
