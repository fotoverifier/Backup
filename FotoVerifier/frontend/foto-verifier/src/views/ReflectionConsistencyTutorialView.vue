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
              Check Reflection Consistency
            </h4>
          </div>
          <div class="col-md-9" v-if="step == 1">
            <h4 class="title" style="padding-left: 10px">
              Check Reflection Consistency
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
                {{ step }} / 7
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
                  Reflection Vanishing Point
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
                  Idea of Reflection Consistency Checking
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 5 }"
                  v-on:click="step = 5"
                >
                  Check Reflection Consistency with FotoVerifier
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 6 }"
                  v-on:click="step = 6"
                >
                  Upload Image
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 7 }"
                  v-on:click="step = 7"
                >
                  Use "Check Reflection Consistency" tool
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
                :style="{ width: step * (100.0 / 7) + '%' }"
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
            @showHint="step5_showHint"
          />
          <Step6InstructionView
            v-if="step == 6"
            @nextStep="step++"
            ref="step6InstructionView"
            @showHint="step6_showHint"
          />
          <Step7InstructionView
            v-if="step == 7"
            @nextStep="step++"
            ref="step7InstructionView"
            @finishTutorial="finishTutorial"
            @showHint1="step7_showHint1"
            @moveToStep3="step7_moveToStep3"
            @moveToStep4="step7_moveToStep4"
            @showHint4="step7_showHint4"
            @moveToStep8="step7_moveToStep8"
            @moveToStep9="step7_moveToStep9"
            @showHint9="step7_showHint9"
            @moveToStep14="step7_moveToStep14"
            @moveToStep15="step7_moveToStep15"
            @moveToStep16="step7_moveToStep16"
            @showHint16="step7_showHint16"
            @showHint17="step7_showHint17"
            @showHint18="step7_showHint18"
            @moveToStep18="step7_moveToStep18"
            @moveToStep20="step7_moveToStep20"
            @showHint20="step7_showHint20"
          />
        </div>
      </div>
      <div class="col-md-9 right-part">
        <Step1MainView v-if="step == 1" ref="step1MainView" />
        <Step2MainView v-if="step == 2" ref="step2MainView" />
        <Step3MainView
          v-if="step == 3"
          ref="step2MainView"
          @correctAnswer="step3_correctAnswer"
        />
        <Step4MainView v-if="step == 4" ref="step4MainView" />
        <Step5MainView
          v-if="step == 5"
          ref="step5MainView"
          @hideHint="step5_hideHint"
          @incorrectURL="step5_incorrectURL"
          @nextStep="step++"
        />
        <Step6MainView
          v-if="step == 6"
          ref="step6MainView"
          @hideHint="step6_hideHint"
          @incorrectImage="step6_incorrectImage"
          @nextStep="step++"
        />
        <Step7MainView
          v-if="step == 7"
          ref="step7MainView"
          @hideHint1="step7_hideHint1"
          @hideHint4="step7_hideHint4"
          @moveToStep2="step7_moveToStep2"
          @nextStep="step++"
          @moveToStep5="step7_moveToStep5"
          @moveToStep6="step7_moveToStep6"
          @moveToStep7="step7_moveToStep7"
          @hideHint9="step7_hideHint9"
          @moveToStep10="step7_moveToStep10"
          @moveToStep11="step7_moveToStep11"
          @moveToStep12="step7_moveToStep12"
          @moveToStep13="step7_moveToStep13"
          @hideHint16="step7_hideHint16"
          @moveToStep17="step7_moveToStep17"
          @hideHint17="step7_hideHint17"
          @hideHint18="step7_hideHint18"
          @moveToStep19="step7_moveToStep19"
          @hideHint20="step7_hideHint20"
          @moveToStep21="step7_moveToStep21"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import Step1DescriptionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step1/DescriptionView.vue";
import Step1InstructionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step1/InstructionView.vue";
import Step1MainView from "@/components/InteractiveTutorial/ReflectionConsistency/Step1/MainView.vue";
import Step2DescriptionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step2/DescriptionView.vue";
import Step2InstructionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step2/InstructionView.vue";
import Step2MainView from "@/components/InteractiveTutorial/ReflectionConsistency/Step2/MainView.vue";
import Step3DescriptionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step3/DescriptionView.vue";
import Step3InstructionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step3/InstructionView.vue";
import Step3MainView from "@/components/InteractiveTutorial/ReflectionConsistency/Step3/MainView.vue";
import Step4DescriptionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step4/DescriptionView.vue";
import Step4InstructionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step4/InstructionView.vue";
import Step4MainView from "@/components/InteractiveTutorial/ReflectionConsistency/Step4/MainView.vue";
import Step5DescriptionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step5/DescriptionView.vue";
import Step5InstructionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step5/InstructionView.vue";
import Step5MainView from "@/components/InteractiveTutorial/ReflectionConsistency/Step5/MainView.vue";
import Step6DescriptionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step6/DescriptionView.vue";
import Step6InstructionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step6/InstructionView.vue";
import Step6MainView from "@/components/InteractiveTutorial/ReflectionConsistency/Step6/MainView.vue";
import Step7DescriptionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step7/DescriptionView.vue";
import Step7InstructionView from "@/components/InteractiveTutorial/ReflectionConsistency/Step7/InstructionView.vue";
import Step7MainView from "@/components/InteractiveTutorial/ReflectionConsistency/Step7/MainView.vue";
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

    let finishTutorial = function () {
      Swal.fire({
        icon: "success",
        title: "Lesson Completed",
        html: "Congratulations on completing the <strong style='color: #f27289'>Check Reflection Consistency</strong> lesson. We now believe that you have mastered the <strong style='color: #f27289'>Check Reflection Consistency</strong> technique for photo spoofing and how to use our <strong style='color: rgb(44, 130, 201)'>FotoVerifier tool</strong> to spot those fake spots. Let's continue with other lessons!",
        confirmButtonText:
          '<a href="/tutorial-home" style="color: white; text-decoration: none;">Go back to Tutorial Home</a>',
      });
    };

    let step3_correctAnswer = function () {
      step3InstructionView.value.correctAnswer();
    };

    let step5_hideHint = function () {
      step5InstructionView.value.hideHint();
    };

    let step5_showHint = function () {
      step5MainView.value.showHint();
    };

    let step5_incorrectURL = function () {
      step5DescriptionView.value.incorrectURL();
    };

    let step6_showHint = function () {
      step6MainView.value.showHint();
    };

    let step6_hideHint = function () {
      step6InstructionView.value.hideHint();
    };

    let step6_incorrectImage = function () {
      step6DescriptionView.value.incorrectImage();
    };

    let step7_showHint1 = function () {
      step7MainView.value.showHint1();
    };

    let step7_showHint4 = function () {
      step7MainView.value.showHint4();
    };

    let step7_showHint9 = function () {
      step7MainView.value.showHint9();
    };

    let step7_showHint16 = function () {
      step7MainView.value.showHint16();
    };

    let step7_showHint17 = function () {
      step7MainView.value.showHint17();
    };

    let step7_showHint18 = function () {
      step7MainView.value.showHint18();
    };

    let step7_showHint20 = function () {
      step7MainView.value.showHint20();
    };

    let step7_hideHint1 = function () {
      step7InstructionView.value.hideHint1();
    };

    let step7_hideHint4 = function () {
      step7InstructionView.value.hideHint4();
    };

    let step7_hideHint9 = function () {
      step7InstructionView.value.hideHint9();
    };

    let step7_hideHint16 = function () {
      step7InstructionView.value.hideHint16();
    };

    let step7_hideHint17 = function () {
      step7InstructionView.value.hideHint17();
    };

    let step7_hideHint18 = function () {
      step7InstructionView.value.hideHint18();
    };

    let step7_hideHint20 = function () {
      step7InstructionView.value.hideHint20();
    };

    let step7_moveToStep2 = function () {
      step7DescriptionView.value.moveToStep2();
      step7InstructionView.value.moveToStep2();
    };

    let step7_moveToStep5 = function () {
      step7DescriptionView.value.moveToStep5();
      step7InstructionView.value.moveToStep5();
    };

    let step7_moveToStep6 = function () {
      step7DescriptionView.value.moveToStep6();
      step7InstructionView.value.moveToStep6();
    };

    let step7_moveToStep7 = function () {
      step7DescriptionView.value.moveToStep7();
      step7InstructionView.value.moveToStep7();
    };

    let step7_moveToStep10 = function () {
      step7DescriptionView.value.moveToStep10();
      step7InstructionView.value.moveToStep10();
    };

    let step7_moveToStep3 = function () {
      step7DescriptionView.value.moveToStep3();
      step7MainView.value.moveToStep3();
    };

    let step7_moveToStep4 = function () {
      step7DescriptionView.value.moveToStep4();
      step7MainView.value.moveToStep4();
    };

    let step7_moveToStep8 = function () {
      step7DescriptionView.value.moveToStep8();
      step7MainView.value.moveToStep8();
    };

    let step7_moveToStep9 = function () {
      step7DescriptionView.value.moveToStep9();
      step7MainView.value.moveToStep9();
    };

    let step7_moveToStep11 = function () {
      step7DescriptionView.value.moveToStep11();
      step7InstructionView.value.moveToStep11();
    };

    let step7_moveToStep12 = function () {
      step7DescriptionView.value.moveToStep12();
      step7InstructionView.value.moveToStep12();
    };

    let step7_moveToStep13 = function () {
      step7DescriptionView.value.moveToStep13();
      step7InstructionView.value.moveToStep13();
    };

    let step7_moveToStep14 = function () {
      step7DescriptionView.value.moveToStep14();
      step7MainView.value.moveToStep14();
    };

    let step7_moveToStep15 = function () {
      step7DescriptionView.value.moveToStep15();
      step7MainView.value.moveToStep15();
    };

    let step7_moveToStep16 = function () {
      step7DescriptionView.value.moveToStep16();
      step7MainView.value.moveToStep16();
    };

    let step7_moveToStep17 = function () {
      step7DescriptionView.value.moveToStep17();
      step7InstructionView.value.moveToStep17();
    };

    let step7_moveToStep18 = function () {
      step7DescriptionView.value.moveToStep18();
      step7MainView.value.moveToStep18();
    };

    let step7_moveToStep20 = function () {
      step7DescriptionView.value.moveToStep20();
      step7MainView.value.moveToStep20();
    };

    let step7_moveToStep19 = function () {
      step7DescriptionView.value.moveToStep19();
      step7InstructionView.value.moveToStep19();
    };

    let step7_moveToStep21 = function () {
      step7DescriptionView.value.moveToStep21();
      step7InstructionView.value.moveToStep21();
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
      step3_correctAnswer,
      step4InstructionView,
      step4MainView,
      step4DescriptionView,
      step5InstructionView,
      step5MainView,
      step5DescriptionView,
      step5_hideHint,
      step5_showHint,
      step5_incorrectURL,
      step6InstructionView,
      step6MainView,
      step6DescriptionView,
      step6_showHint,
      step6_hideHint,
      step6_incorrectImage,
      step7InstructionView,
      step7MainView,
      step7DescriptionView,
      step7_showHint1,
      step7_showHint4,
      step7_hideHint1,
      step7_hideHint4,
      step7_moveToStep2,
      step7_moveToStep3,
      step7_moveToStep4,
      step7_moveToStep5,
      step7_moveToStep6,
      step7_moveToStep7,
      step7_moveToStep8,
      step7_moveToStep9,
      step7_hideHint9,
      step7_showHint9,
      step7_moveToStep10,
      step7_moveToStep11,
      step7_moveToStep12,
      step7_moveToStep13,
      step7_moveToStep14,
      step7_moveToStep15,
      step7_moveToStep16,
      step7_hideHint16,
      step7_showHint16,
      step7_moveToStep17,
      step7_showHint17,
      step7_hideHint17,
      step7_moveToStep18,
      step7_hideHint18,
      step7_showHint18,
      step7_moveToStep19,
      step7_moveToStep20,
      step7_hideHint20,
      step7_showHint20,
      step7_moveToStep21,
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
