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
              Detect Image Cloning
            </h4>
          </div>
          <div class="col-md-9" v-if="step == 1">
            <h4 class="title" style="padding-left: 10px">
              Detect Image Cloning
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
                  Image Cloning
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 2 }"
                  v-on:click="step = 2"
                >
                  Check Your Understanding
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 3 }"
                  v-on:click="step = 3"
                >
                  Purposes of Image Cloning
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 4 }"
                  v-on:click="step = 4"
                >
                  Check Your Understanding
                </li>
                <li
                  class="dropdown-item"
                  :class="{ active: step == 5 }"
                  v-on:click="step = 5"
                >
                  Check Image Cloning with FotoVerifier
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
                  Use "Copy-move Detection" tool
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
          <Step1DescriptionView v-if="step == 1" />
          <Step2DescriptionView v-if="step == 2" />
          <Step3DescriptionView v-if="step == 3" />
          <Step4DescriptionView v-if="step == 4" />
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
          <Step1InstructionView v-if="step == 1" @nextStep="step++" />
          <Step2InstructionView
            v-if="step == 2"
            ref="step2InstructionView"
            @nextImage="nextImage"
            @nextStep="step++"
          />
          <Step3InstructionView v-if="step == 3" @nextStep="step++" />
          <Step4InstructionView
            v-if="step == 4"
            ref="step4InstructionView"
            @nextImage="nextImageStep4"
            @nextStep="step++"
          />
          <Step5InstructionView
            v-if="step == 5"
            @nextStep="step++"
            ref="step5InstructionView"
            @showHint="showHint"
          />
          <Step6InstructionView
            v-if="step == 6"
            @nextStep="step++"
            ref="step6InstructionView"
            @showHint="showHintStep6"
          />
          <Step7InstructionView
            v-if="step == 7"
            @finishTutorial="finishTutorial"
            ref="step7InstructionView"
            @showHint1="showHint1Step7"
            @showHint2="showHint2Step7"
            @showHint3="showHint3Step7"
          />
        </div>
      </div>
      <div class="col-md-9 right-part">
        <Step1MainView v-if="step == 1" />
        <Step2MainView
          ref="step2MainView"
          v-if="step == 2"
          @doneImage1="doneImage1"
          @doneImage2="doneImage2"
        />
        <Step3MainView v-if="step == 3" />
        <Step4MainView
          v-if="step == 4"
          ref="step4MainView"
          @doneImage1="doneImage1Step4"
          @doneImage2="doneImage2Step4"
        />
        <Step5MainView
          ref="step5MainView"
          v-if="step == 5"
          @hideHint="hideHint"
          @incorrectURL="incorrectURL"
          @nextStep="step++"
        />
        <Step6MainView
          ref="step6MainView"
          v-if="step == 6"
          @hideHint="hideHintStep6"
          @incorrectImage="incorrectImage"
          @nextStep="step++"
        />
        <Step7MainView
          ref="step7MainView"
          v-if="step == 7"
          @hideHint1="hideHint1Step7"
          @hideHint2="hideHint2Step7"
          @hideHint3="hideHint3Step7"
          @moveToStep2="moveToStep2"
          @moveToStep3="moveToStep3"
          @nextStep="step++"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import Step1DescriptionView from "@/components/InteractiveTutorial/CopyMove/Step1/DescriptionView.vue";
import Step1InstructionView from "@/components/InteractiveTutorial/CopyMove/Step1/InstructionView.vue";
import Step1MainView from "@/components/InteractiveTutorial/CopyMove/Step1/MainView.vue";
import Step2DescriptionView from "@/components/InteractiveTutorial/CopyMove/Step2/DescriptionView.vue";
import Step2InstructionView from "@/components/InteractiveTutorial/CopyMove/Step2/InstructionView.vue";
import Step2MainView from "@/components/InteractiveTutorial/CopyMove/Step2/MainView.vue";
import Step3DescriptionView from "@/components/InteractiveTutorial/CopyMove/Step3/DescriptionView.vue";
import Step3InstructionView from "@/components/InteractiveTutorial/CopyMove/Step3/InstructionView.vue";
import Step3MainView from "@/components/InteractiveTutorial/CopyMove/Step3/MainView.vue";
import Step4DescriptionView from "@/components/InteractiveTutorial/CopyMove/Step4/DescriptionView.vue";
import Step4InstructionView from "@/components/InteractiveTutorial/CopyMove/Step4/InstructionView.vue";
import Step4MainView from "@/components/InteractiveTutorial/CopyMove/Step4/MainView.vue";
import Step5DescriptionView from "@/components/InteractiveTutorial/CopyMove/Step5/DescriptionView.vue";
import Step5InstructionView from "@/components/InteractiveTutorial/CopyMove/Step5/InstructionView.vue";
import Step5MainView from "@/components/InteractiveTutorial/CopyMove/Step5/MainView.vue";
import Step6DescriptionView from "@/components/InteractiveTutorial/CopyMove/Step6/DescriptionView.vue";
import Step6InstructionView from "@/components/InteractiveTutorial/CopyMove/Step6/InstructionView.vue";
import Step6MainView from "@/components/InteractiveTutorial/CopyMove/Step6/MainView.vue";
import Step7DescriptionView from "@/components/InteractiveTutorial/CopyMove/Step7/DescriptionView.vue";
import Step7InstructionView from "@/components/InteractiveTutorial/CopyMove/Step7/InstructionView.vue";
import Step7MainView from "@/components/InteractiveTutorial/CopyMove/Step7/MainView.vue";
import Swal from "sweetalert2";

export default {
  setup() {
    let step = ref(1);
    let step2InstructionView = ref(null);
    let step2MainView = ref(null);
    let step4InstructionView = ref(null);
    let step4MainView = ref(null);
    let step5InstructionView = ref(null);
    let step5MainView = ref(null);
    let step5DescriptionView = ref(null);
    let step6InstructionView = ref(null);
    let step6MainView = ref(null);
    let step6DescriptionView = ref(null);
    let step7InstructionView = ref(null);
    let step7MainView = ref(null);
    let step7DescriptionView = ref(null);

    let doneImage1 = function () {
      step2InstructionView.value.doneImage1();
    };

    let doneImage2 = function () {
      step2InstructionView.value.doneImage2();
    };

    let nextImage = function () {
      step2MainView.value.drawSecondImage();
    };

    let doneImage1Step4 = function () {
      step4InstructionView.value.doneImage1();
    };

    let doneImage2Step4 = function () {
      step4InstructionView.value.doneImage2();
    };

    let nextImageStep4 = function () {
      step4MainView.value.drawSecondPair();
    };

    let showHint = function () {
      step5MainView.value.showHint();
    };

    let showHintStep6 = function () {
      step6MainView.value.showHint();
    };

    let showHint1Step7 = function () {
      step7MainView.value.showHint1();
    };

    let showHint2Step7 = function () {
      step7MainView.value.showHint2();
    };

    let showHint3Step7 = function () {
      step7MainView.value.showHint3();
    };

    let hideHint = function () {
      step5InstructionView.value.hideHint();
    };

    let hideHintStep6 = function () {
      step6InstructionView.value.hideHint();
    };

    let hideHint1Step7 = function () {
      step7InstructionView.value.hideHint1();
    };

    let hideHint2Step7 = function () {
      step7InstructionView.value.hideHint2();
    };

    let hideHint3Step7 = function () {
      step7InstructionView.value.hideHint3();
    };

    let incorrectURL = function () {
      step5DescriptionView.value.incorrectURL();
    };

    let incorrectImage = function () {
      step6DescriptionView.value.incorrectImage();
    };

    let moveToStep2 = function () {
      step7InstructionView.value.moveToStep2();
    };

    let moveToStep3 = function () {
      step7InstructionView.value.moveToStep3();
      step7DescriptionView.value.moveToStep3();
    };

    let finishTutorial = function () {
      Swal.fire({
        icon: "success",
        title: "Lesson Completed",
        html: "Congratulations on completing the <strong style='color: #f27289'>Image Cloning</strong> lesson. We now believe that you have mastered the <strong style='color: #f27289'>Image Cloning</strong> technique for photo spoofing and how to use our <strong style='color: rgb(44, 130, 201)'>FotoVerifier tool</strong> to spot those fake spots. Let's continue with other lessons!",
        confirmButtonText:
          '<a href="/tutorial-home" style="color: white; text-decoration: none;">Go back to Tutorial Home</a>',
      });
    };

    return {
      step,
      step2InstructionView,
      doneImage1,
      doneImage2,
      step2MainView,
      nextImage,
      step4InstructionView,
      step4MainView,
      nextImageStep4,
      doneImage1Step4,
      doneImage2Step4,
      step5InstructionView,
      step5MainView,
      showHint,
      hideHint,
      step5DescriptionView,
      incorrectURL,
      step6DescriptionView,
      step6InstructionView,
      step6MainView,
      hideHintStep6,
      showHintStep6,
      incorrectImage,
      step7DescriptionView,
      step7InstructionView,
      step7MainView,
      hideHint1Step7,
      showHint1Step7,
      moveToStep2,
      hideHint2Step7,
      showHint2Step7,
      moveToStep3,
      hideHint3Step7,
      showHint3Step7,
      finishTutorial,
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
