<template>
  <div class="container-fluid min-vh-100 d-flex flex-column main-content">
    <!-- <div class="row">
      <div class="col">Top Bar</div>
    </div> -->
    <div class="row flex-grow-1">
      <div class="col-md-3 left-part">
        <div class="row pt-2">
          <div class="col-md-1" v-if="step > 1">
            <button type="button" class="btn btn-warning" v-on:click="step--">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="col-md-8" v-if="step > 1">
            <h4 class="title" style="padding-left: 10px">
              Detect Image Splicing
            </h4>
          </div>
          <div class="col-md-9" v-if="step == 1">
            <h4 class="title" style="padding-left: 10px">
              Detect Image Splicing
            </h4>
          </div>
          <div class="col-md-3">
            <div class="dropdown float-end">
              <button
                class="btn btn-warning dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ step }} / 10
              </button>
              <ul
                class="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
                style="cursor: pointer"
              >
                <li
                  class="dropdown-item"
                  :class="{ active: step == 1 }"
                  v-on:click="step = 1"
                >
                  Introduction
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 2 }"
                  v-on:click="step = 2"
                >
                  Image Splicing
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 3 }"
                  v-on:click="step = 3"
                >
                  Check Your Understanding
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 4 }"
                  v-on:click="step = 4"
                >
                  RGB Color in Image
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 5 }"
                  v-on:click="step = 5"
                >
                  Check Your Understanding
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 6 }"
                  v-on:click="step = 6"
                >
                  Color Filter Array
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 7 }"
                  v-on:click="step = 7"
                >
                  Check Your Understanding
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 8 }"
                  v-on:click="step = 8"
                >
                  Color Filter Array Detection
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 9 }"
                  v-on:click="step = 9"
                >
                  Upload Image
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 10 }"
                  v-on:click="step = 10"
                >
                  Use "Color Filter Array Detection" tool
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row pt-2">
          <div class="col-md-12">
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                role="progressbar"
                :style="{ width: step * (100.0 / 10) + '%' }"
              ></div>
            </div>
          </div>
        </div>
        <hr />
        <div class="row pt-2">
          <Step1DescriptionView v-if="step == 1" ref="step1DescriptionView" />
          <Step2DescriptionView v-if="step == 2" ref="step2DescriptionView" />
          <Step3DescriptionView v-if="step == 3" ref="step3DescriptionView" />
          <Step4DescriptionView v-if="step == 4" ref="step4DescriptionView" />
          <Step5DescriptionView v-if="step == 5" ref="step5DescriptionView" />
          <Step6DescriptionView v-if="step == 6" ref="step6DescriptionView" />
          <Step7DescriptionView v-if="step == 7" ref="step7DescriptionView" />
          <Step8DescriptionView v-if="step == 8" ref="step8DescriptionView" />
          <Step9DescriptionView v-if="step == 9" ref="step9DescriptionView" />
          <Step10DescriptionView
            v-if="step == 10"
            ref="step10DescriptionView"
          />
        </div>
        <div class="fixed-bottom col-md-3 text-brown instruction">
          <div class="row">
            <div class="col-md-12">
              <center><h5>Instruction</h5></center>
            </div>
          </div>
          <div class="instruction-divider"></div>
          <Step1InstructionView
            v-if="step == 1"
            @nextStep="step++"
            ref="step1InstructionView"
          />
          <Step2InstructionView
            v-if="step == 2"
            @nextStep="step++"
            ref="step2InstructionView"
          />
          <Step3InstructionView
            v-if="step == 3"
            @nextStep="step++"
            ref="step3InstructionView"
          />
          <Step4InstructionView
            v-if="step == 4"
            @nextStep="step++"
            ref="step4InstructionView"
          />
          <Step5InstructionView
            v-if="step == 5"
            @nextStep="step++"
            ref="step5InstructionView"
          />
          <Step6InstructionView
            v-if="step == 6"
            @nextStep="step++"
            ref="step6InstructionView"
            @nextDescription="step6_nextDescription"
          />
          <Step7InstructionView
            v-if="step == 7"
            @nextStep="step++"
            ref="step7InstructionView"
            @nextQuestion="step7_nextQuestion"
          />
          <Step8InstructionView
            v-if="step == 8"
            @nextStep="step++"
            ref="step8InstructionView"
            @nextDescription="step8_nextDescription"
            @showHint="step8_showHint"
          />
          <Step9InstructionView
            v-if="step == 9"
            @nextStep="step++"
            ref="step9InstructionView"
            @showHint="step9_showHint"
          />
          <Step10InstructionView
            v-if="step == 10"
            @nextStep="step++"
            ref="step10InstructionView"
            @finishTutorial="finishTutorial"
            @showHint1="step10_showHint1"
            @showHint2="step10_showHint2"
            @showHint3="step10_showHint3"
          />
        </div>
      </div>
      <div class="col-md-9 right-part">
        <Step1MainView v-if="step == 1" ref="step1MainView" />
        <Step2MainView v-if="step == 2" ref="step2MainView" />
        <Step3MainView
          v-if="step == 3"
          ref="step3MainView"
          @moveToStep2="step3_moveToStep2"
          @moveToStep3="step3_moveToStep3"
        />
        <Step4MainView v-if="step == 4" ref="step4MainView" />
        <Step5MainView
          v-if="step == 5"
          ref="step5MainView"
          @doneImage="step5_doneImage"
        />
        <Step6MainView v-if="step == 6" ref="step6MainView" />
        <Step7MainView
          v-if="step == 7"
          ref="step7MainView"
          @correctAnswer="step7_correctAnswer"
        />
        <Step8MainView
          v-if="step == 8"
          ref="step8MainView"
          @hideHint="step8_hideHint"
          @incorrectURL="step8_incorrectURL"
          @nextStep="step++"
        />
        <Step9MainView
          v-if="step == 9"
          ref="step9MainView"
          @hideHint="step9_hideHint"
          @incorrectImage="step9_incorrectImage"
          @nextStep="step++"
        />
        <Step10MainView
          v-if="step == 10"
          ref="step10MainView"
          @hideHint1="step10_hideHint1"
          @hideHint2="step10_hideHint2"
          @hideHint3="step10_hideHint3"
          @moveToStep2="step10_moveToStep2"
          @moveToStep3="step10_moveToStep3"
          @nextStep="step++"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import Step1DescriptionView from "@/components/InteractiveTutorial/CFA/Step1/DescriptionView.vue";
import Step1InstructionView from "@/components/InteractiveTutorial/CFA/Step1/InstructionView.vue";
import Step1MainView from "@/components/InteractiveTutorial/CFA/Step1/MainView.vue";
import Step2DescriptionView from "@/components/InteractiveTutorial/CFA/Step2/DescriptionView.vue";
import Step2InstructionView from "@/components/InteractiveTutorial/CFA/Step2/InstructionView.vue";
import Step2MainView from "@/components/InteractiveTutorial/CFA/Step2/MainView.vue";
import Step3DescriptionView from "@/components/InteractiveTutorial/CFA/Step3/DescriptionView.vue";
import Step3InstructionView from "@/components/InteractiveTutorial/CFA/Step3/InstructionView.vue";
import Step3MainView from "@/components/InteractiveTutorial/CFA/Step3/MainView.vue";
import Step4DescriptionView from "@/components/InteractiveTutorial/CFA/Step4/DescriptionView.vue";
import Step4InstructionView from "@/components/InteractiveTutorial/CFA/Step4/InstructionView.vue";
import Step4MainView from "@/components/InteractiveTutorial/CFA/Step4/MainView.vue";
import Step5DescriptionView from "@/components/InteractiveTutorial/CFA/Step5/DescriptionView.vue";
import Step5InstructionView from "@/components/InteractiveTutorial/CFA/Step5/InstructionView.vue";
import Step5MainView from "@/components/InteractiveTutorial/CFA/Step5/MainView.vue";
import Step6DescriptionView from "@/components/InteractiveTutorial/CFA/Step6/DescriptionView.vue";
import Step6InstructionView from "@/components/InteractiveTutorial/CFA/Step6/InstructionView.vue";
import Step6MainView from "@/components/InteractiveTutorial/CFA/Step6/MainView.vue";
import Step7DescriptionView from "@/components/InteractiveTutorial/CFA/Step7/DescriptionView.vue";
import Step7InstructionView from "@/components/InteractiveTutorial/CFA/Step7/InstructionView.vue";
import Step7MainView from "@/components/InteractiveTutorial/CFA/Step7/MainView.vue";
import Step8DescriptionView from "@/components/InteractiveTutorial/CFA/Step8/DescriptionView.vue";
import Step8InstructionView from "@/components/InteractiveTutorial/CFA/Step8/InstructionView.vue";
import Step8MainView from "@/components/InteractiveTutorial/CFA/Step8/MainView.vue";
import Step9DescriptionView from "@/components/InteractiveTutorial/CFA/Step9/DescriptionView.vue";
import Step9InstructionView from "@/components/InteractiveTutorial/CFA/Step9/InstructionView.vue";
import Step9MainView from "@/components/InteractiveTutorial/CFA/Step9/MainView.vue";
import Step10DescriptionView from "@/components/InteractiveTutorial/CFA/Step10/DescriptionView.vue";
import Step10InstructionView from "@/components/InteractiveTutorial/CFA/Step10/InstructionView.vue";
import Step10MainView from "@/components/InteractiveTutorial/CFA/Step10/MainView.vue";
import Swal from "sweetalert2";

export default {
  setup() {
    let step = ref(1);
    let step1InstructionView = ref(null);
    let step1MainView = ref(null);
    let step1DescriptionView = ref(null);
    let step2InstructionView = ref(null);
    let step2MainView = ref(null);
    let step2DescriptionView = ref(null);
    let step3InstructionView = ref(null);
    let step3MainView = ref(null);
    let step3DescriptionView = ref(null);
    let step4InstructionView = ref(null);
    let step4MainView = ref(null);
    let step4DescriptionView = ref(null);
    let step5InstructionView = ref(null);
    let step5MainView = ref(null);
    let step5DescriptionView = ref(null);
    let step6InstructionView = ref(null);
    let step6MainView = ref(null);
    let step6DescriptionView = ref(null);
    let step7InstructionView = ref(null);
    let step7MainView = ref(null);
    let step7DescriptionView = ref(null);
    let step8InstructionView = ref(null);
    let step8MainView = ref(null);
    let step8DescriptionView = ref(null);
    let step9InstructionView = ref(null);
    let step9MainView = ref(null);
    let step9DescriptionView = ref(null);
    let step10InstructionView = ref(null);
    let step10MainView = ref(null);
    let step10DescriptionView = ref(null);

    let finishTutorial = function () {
      Swal.fire({
        icon: "success",
        title: "Lesson Completed",
        html: "Congratulations on completing the <strong style='color: #f27289'>Detect Image Splicing</strong> lesson. We now believe that you have mastered the <strong style='color: #f27289'>Detect Image Splicing</strong> technique for photo spoofing and how to use our <strong style='color: rgb(44, 130, 201)'>FotoVerifier tool</strong> to spot those fake spots. Let's continue with other lessons!",
        confirmButtonText:
          '<a href="/tutorial-home" style="color: white; text-decoration: none;">Go back to Tutorial Home</a>',
      });
    };

    let step3_moveToStep2 = function () {
      step3InstructionView.value.moveToStep2();
    };

    let step3_moveToStep3 = function () {
      step3InstructionView.value.moveToStep3();
    };

    let step5_doneImage = function () {
      step5InstructionView.value.doneImage();
    };

    let step6_nextDescription = function () {
      step6DescriptionView.value.nextDescription();
      step6MainView.value.nextImage();
    };

    let step7_correctAnswer = function () {
      step7InstructionView.value.correctAnswer();
    };

    let step7_nextQuestion = function () {
      step7MainView.value.nextQuestion();
    };

    let step8_nextDescription = function () {
      step8DescriptionView.value.nextDescription();
      step8MainView.value.showBrowser();
    };

    let step8_showHint = function () {
      step8MainView.value.showHint();
    };

    let step8_hideHint = function () {
      step8InstructionView.value.hideHint();
    };

    let step8_incorrectURL = function () {
      step8DescriptionView.value.incorrectURL();
    };

    let step9_showHint = function () {
      step9MainView.value.showHint();
    };

    let step9_hideHint = function () {
      step9InstructionView.value.hideHint();
    };

    let step9_incorrectImage = function () {
      step9DescriptionView.value.incorrectImage();
    };

    let step10_showHint1 = function () {
      step10MainView.value.showHint1();
    };

    let step10_showHint2 = function () {
      step10MainView.value.showHint2();
    };

    let step10_showHint3 = function () {
      step10MainView.value.showHint3();
    };

    let step10_hideHint1 = function () {
      step10InstructionView.value.hideHint1();
    };

    let step10_hideHint2 = function () {
      step10InstructionView.value.hideHint2();
    };

    let step10_hideHint3 = function () {
      step10InstructionView.value.hideHint3();
    };

    let step10_moveToStep2 = function () {
      step10InstructionView.value.moveToStep2();
    };

    let step10_moveToStep3 = function () {
      step10InstructionView.value.moveToStep3();
      step10DescriptionView.value.moveToStep3();
    };

    return {
      step,
      step1InstructionView,
      step1MainView,
      step1DescriptionView,
      finishTutorial,
      step2InstructionView,
      step2MainView,
      step2DescriptionView,
      step3InstructionView,
      step3MainView,
      step3DescriptionView,
      step3_moveToStep2,
      step3_moveToStep3,
      step4InstructionView,
      step4MainView,
      step4DescriptionView,
      step5InstructionView,
      step5MainView,
      step5DescriptionView,
      step5_doneImage,
      step6InstructionView,
      step6MainView,
      step6DescriptionView,
      step6_nextDescription,
      step7InstructionView,
      step7MainView,
      step7DescriptionView,
      step7_correctAnswer,
      step7_nextQuestion,
      step8InstructionView,
      step8MainView,
      step8DescriptionView,
      step8_nextDescription,
      step8_showHint,
      step8_hideHint,
      step8_incorrectURL,
      step9InstructionView,
      step9MainView,
      step9DescriptionView,
      step9_showHint,
      step9_hideHint,
      step9_incorrectImage,
      step10InstructionView,
      step10MainView,
      step10DescriptionView,
      step10_showHint1,
      step10_showHint2,
      step10_showHint3,
      step10_hideHint1,
      step10_hideHint2,
      step10_hideHint3,
      step10_moveToStep2,
      step10_moveToStep3,
    };
  },

  components: {
    Step1DescriptionView,
    Step1InstructionView,
    Step1MainView,
    Step2DescriptionView,
    Step2InstructionView,
    Step2MainView,
    Step3DescriptionView,
    Step3InstructionView,
    Step3MainView,
    Step4DescriptionView,
    Step4InstructionView,
    Step4MainView,
    Step5DescriptionView,
    Step5InstructionView,
    Step5MainView,
    Step6DescriptionView,
    Step6InstructionView,
    Step6MainView,
    Step7DescriptionView,
    Step7InstructionView,
    Step7MainView,
    Step8DescriptionView,
    Step8InstructionView,
    Step8MainView,
    Step9DescriptionView,
    Step9InstructionView,
    Step9MainView,
    Step10DescriptionView,
    Step10InstructionView,
    Step10MainView,
  },
};
</script>

<style scoped>
.left-part {
  background-color: #232e55;
  border-right: 1px solid rgba(128, 152, 255, 0.22);
  padding: 20px 20px 20px 20px;
}

.right-part {
  background-color: #26315b;
  padding: 20px 20px 20px 20px;
}

.instruction {
  background-color: #2c3967;
  padding: 10px 10px 10px 10px;
  font-size: 0.875rem;
  border-right: 1px solid rgba(128, 152, 255, 0.22);
  border-top: 1px solid rgba(128, 152, 255, 0.22);
}

.main-content {
  color: #8a9cd1;
  font-weight: 400;
  font-family: Roboto, sans-serif;
}

.title {
  color: #c0cbeb;
}

.instruction-divider {
  height: 1px;
  color: inherit;
  background-color: currentColor;
  border: 0;
  opacity: 0.25;
}

/* The browser window */
.browser-container {
  border: 3px solid #564d7a;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

/* Container for columns and the top "toolbar" */
.browser-row {
  padding: 10px;
  background: #564d7a;
}

/* Create three unequal columns that floats next to each other */
.browser-column {
  float: left;
}

.browser-left {
  width: 15%;
}

.browser-right {
  width: 10%;
}

.browser-middle {
  width: 75%;
}

/* Clear floats after the columns */
.browser-row:after {
  content: "";
  display: table;
  clear: both;
}

/* Three dots */
.browser-dot {
  margin-top: 4px;
  height: 12px;
  width: 12px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

/* Three bars (hamburger menu) */
.browser-bar {
  width: 17px;
  height: 3px;
  background-color: #aaa;
  margin: 3px 0;
  display: block;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
