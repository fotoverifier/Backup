<template>
  <SubSidebar
    @changeFunction="handleChangeFunction"
    @onNmiKernelSizeChange="handleNmiKernelSizeChange"
    @onStartGuide="handleStartGuide"
  />
  <div class="container-fluid scrollarea">
    <div class="row my-container">
      <div class="col-sm-6">
        <div class="d-flex flex-row">
          <div class="pt-2">
            <h4>
              <b>
                <p class="content-title">{{ title }}</p>
              </b>
            </h4>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="d-flex flex-row-reverse">
          <div class="p-2">
            <a :href="tutorialURL" target="_blank" class="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-question-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"
                ></path>
              </svg>
              Tutorial
            </a>
            &nbsp;
            <a href="/" target="_blank" class="btn btn-success btn-new-analyze">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-earmark-image"
                viewBox="0 0 16 16"
              >
                <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                <path
                  d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"
                ></path>
              </svg>
              Analyze new image
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-container" v-if="currentFunctionName == 'default'">
      <div class="col-sm-12 p-2">
        <div class="alert alert-primary" role="alert">
          Select a function in the left sidebar to analyze your image
        </div>
      </div>
      <div class="col-sm-12 p-2">
        <div class="alert alert-danger" role="alert">
          <strong>Note: </strong> This feature will process your images on the
          server side. Therefore, the privacy of the photo is not guaranteed.
        </div>
      </div>
    </div>
    <div class="row my-container" v-if="currentFunctionName != 'default'">
      <div class="col-sm-12 p-2">
        <div class="alert alert-danger" role="alert">
          <strong>Note:</strong> This feature will process your images on the
          server side. Therefore, the privacy of the photo is not guaranteed.
        </div>
      </div>
      <div class="col-sm-6 p-2">
        <h5>
          <b>Your image</b>
        </h5>
        <center>
          <div id="source-view">
            <ImageView
              :imageData="uploadedImage"
              :canvasWidth="imageViewWidth"
              :canvasHeight="imageViewHeight"
            />
          </div>
        </center>
      </div>
      <div class="col-sm-6 p-2">
        <h5><b>Analysis Result</b></h5>
        <center>
          <div id="error-level-analysis-result-view">
            <ErrorLevelAnalysis
              :imageData="uploadedImage"
              :canvasWidth="imageViewWidth"
              :canvasHeight="imageViewHeight"
              :jpegQuality="errorLevelAnalysisConfig.jpegQuality"
              :errorScale="errorLevelAnalysisConfig.errorScale"
              v-if="currentFunctionName == 'errorLevelAnalysis'"
            />
          </div>
          <JpegGhost
            :imageData="uploadedImage"
            :canvasWidth="imageViewWidth"
            :canvasHeight="imageViewHeight"
            :jpegQuality="jpegGhostConfig.jpegQuality"
            v-if="currentFunctionName == 'jpegGhost'"
          />
          <CopyMoveDetection
            :imageData="uploadedImage"
            :canvasWidth="imageViewWidth"
            :canvasHeight="imageViewHeight"
            :jpegQuality="jpegGhostConfig.jpegQuality"
            v-if="currentFunctionName == 'copyMoveDetection'"
          />
          <ColorFilterArrayDetection
            :imageData="uploadedImage"
            :canvasWidth="imageViewWidth"
            :canvasHeight="imageViewHeight"
            :jpegQuality="jpegGhostConfig.jpegQuality"
            v-if="currentFunctionName == 'colorFilterArrayDetection'"
          />
          <HistogramAnalysis
            :imageData="uploadedImage"
            :color="histogramAnalysisConfig.color"
            v-if="currentFunctionName == 'histogramAnalysis'"
          />
          <ReverseImageSearch
            v-if="currentFunctionName == 'reverseImageSearch'"
          />
          <NoiseMedianInconsistencies
            ref="nmiComponent"
            :imageData="uploadedImage"
            :canvasWidth="imageViewWidth"
            :canvasHeight="imageViewHeight"
            :kernelSize="noiseMedianInconsistenciesConfig.kernelSize"
            v-if="currentFunctionName == 'noiseMedianInconsistencies'"
          />
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import introJs from "intro.js";
import SubSidebar from "@/components/MoreTools/SubSidebar.vue";
import ImageView from "../components/ImageView.vue";
import ErrorLevelAnalysis from "../components/MoreTools/ErrorLevelAnalysis.vue";
import HistogramAnalysis from "../components/MoreTools/HistogramAnalysis.vue";
import JpegGhost from "../components/MoreTools/JpegGhost.vue";
import CopyMoveDetection from "../components/MoreTools/CopyMoveDetection.vue";
import ColorFilterArrayDetection from "../components/MoreTools/ColorFilterArrayDetection.vue";
import NoiseMedianInconsistencies from "@/components/MoreTools/NoiseMedianInconsistencies.vue";
import ReverseImageSearch from "@/components/MoreTools/ReverseImageSearch.vue";

export default {
  props: {
    uploadedImage: String,
  },
  setup() {
    let imageViewWidth = ref(window.innerWidth / 3);
    let imageViewHeight = ref(window.innerHeight / 2);
    let currentFunctionName = ref("default");
    let title = ref("More Tools");
    let tutorialURL = ref("/tutorial");

    let errorLevelAnalysisConfig = reactive({
      jpegQuality: 90,
      errorScale: 20,
    });
    let jpegGhostConfig = reactive({
      jpegQuality: 60,
    });
    let histogramAnalysisConfig = reactive({
      color: "red",
    });
    let noiseMedianInconsistenciesConfig = reactive({
      kernelSize: 3,
    });

    let handleChangeFunction = function (func) {
      console.log(func.name);
      if (func.name == "errorLevelAnalysis") {
        errorLevelAnalysisConfig.jpegQuality = func.config.jpegQuality;
        errorLevelAnalysisConfig.errorScale = func.config.errorScale;
        title.value = "Error Level Analysis";
      } else if (func.name == "jpegGhost") {
        jpegGhostConfig.jpegQuality = func.config.jpegQuality;
        title.value = "JPEG Ghost";
        tutorialURL.value = "/jpeg-ghost-tutorial";
      } else if (func.name == "histogramAnalysis") {
        histogramAnalysisConfig.color = func.config.color;
        title.value = "Histogram Analysis";
      } else if (func.name == "reverseImageSearch") {
        title.value = "Reverse Image Search";
      } else if (func.name == "noiseMedianInconsistencies") {
        noiseMedianInconsistenciesConfig.kernelSize = func.config.kernelSize;
        title.value = "Noise Median Inconsistencies";
      } else if (func.name == "colorFilterArrayDetection") {
        title.value = "Color Filter Array Detection";
        tutorialURL.value = "/cfa-tutorial";
      } else if (func.name == "copyMoveDetection") {
        title.value = "Copy-move Detection";
        tutorialURL.value = "/copy-move-tutorial";
      }
      currentFunctionName.value = func.name;
    };

    //adding for replacing "watch"
    let nmiComponent = ref(null);
    const handleNmiKernelSizeChange = function () {
      nmiComponent.value.noiseMedianInconsistencies();
    };

    const handleStartGuide = function (name) {
      let intro = introJs();
      intro.setOptions({
        showBullets: false,
        hidePrev: true,
        showProgress: true,
        scrollToElement: true,
        disableInteraction: true,
      });

      if (name == "errorLevelAnalysis") {
        intro.setOptions({
          steps: [
            {
              element: document.querySelector("#error-level-analysis-btn"),
              intro: `<p>This method helps identify areas within an image that are at different compression levels.</p>
                <p>For detail explanation, please read <a href="/tutorial/ela/brightness-contrast" target="_blank">How to use Error Level Analysis</a>.</p>
                <p>For quick step-by-step introduction, click on Next button.</p>`,
            },
            {
              element: document.querySelector("#source-view"),
              intro: `<p>The upload image is here for you to compare to the result of the method.</p>`,
            },
            {
              element: document.querySelector(
                "#error-level-analysis-result-view"
              ),
              intro: `<p>This is the result of Error Level Analysis of the upload picture.</p>`,
            },
            {
              element: document.querySelector(
                "#error-level-analysis-jpeg-quality-guide"
              ),
              intro: `<p>If you don't see any areas in ELA result which have different brightness, you can try adjusting JPEG Quality value.</p>`,
            },
            {
              element: document.querySelector(
                "#error-level-analysis-error-scale-guide"
              ),
              intro: `<p>Adjust Error Scale value until you can see the ELA result easily. If ELA result is too dark, increase this value to make result lighter, otherwise decrease this value to make result darker.</p>`,
            },
            {
              intro: `<p>For more understanding, you should know some concepts related to this method. You can read them <a href="/tutorial/ela/brightness-contrast" target="_blank">here</a>.</p>
                <p>Then, you can try some challenges <a href="/tutorial/ela/challenge/normal" target="_blank">here</a>.<p>`,
            },
            {
              intro: `<p>Congratulations! You have completed the guide of Error Level Analysis!<p>`,
            },
          ],
        });
      }

      intro.start();
    };

    return {
      title,
      imageViewWidth,
      imageViewHeight,
      currentFunctionName,
      handleChangeFunction,
      handleStartGuide,
      errorLevelAnalysisConfig,
      jpegGhostConfig,
      histogramAnalysisConfig,
      noiseMedianInconsistenciesConfig,
      //adding for replacing "watch"
      nmiComponent,
      handleNmiKernelSizeChange,
      tutorialURL,
    };
  },

  components: {
    SubSidebar,
    ImageView,
    ErrorLevelAnalysis,
    HistogramAnalysis,
    JpegGhost,
    CopyMoveDetection,
    ColorFilterArrayDetection,
    NoiseMedianInconsistencies,
    ReverseImageSearch,
  },
};
</script>
