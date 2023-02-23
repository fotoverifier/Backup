<template>
  <div class="flex-shrink-0 p-3 bg-white sub-sidebar" style="width: 280px">
    <a
      href="/"
      class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
    >
      <span class="fs-5 fw-semibold">Choose a DIF Method</span>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button
          ref="copyMoveDetection"
          class="btn btn-toggle align-items-center rounded collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#copy-move-detection-collapse"
          aria-expanded="false"
          @click="changeFunction('copyMoveDetection')"
        >
          Copy-move Detection
        </button>
        <div class="collapse pt-2" id="copy-move-detection-collapse"></div>
      </li>
      <li class="mb-1">
        <button
          ref="jpegGhost"
          class="btn btn-toggle align-items-center rounded collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#jpeg-ghost-collapse"
          aria-expanded="false"
          @click="changeFunction('jpegGhost')"
        >
          JPEG Ghost
        </button>
        <div class="collapse pt-2" id="jpeg-ghost-collapse"></div>
      </li>
      <li class="mb-1">
        <button
          ref="colorFilterArrayDetection"
          class="btn btn-toggle align-items-center rounded collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#color-filter-array-detection-collapse"
          aria-expanded="false"
          @click="changeFunction('colorFilterArrayDetection')"
        >
          Color Filter Array Detection
        </button>
        <div
          class="collapse pt-2"
          id="color-filter-array-detection-collapse"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";
import { Tooltip } from "bootstrap/dist/js/bootstrap.js";

export default {
  emits: ["changeFunction"],
  setup(props, context) {
    let copyMoveDetection = ref(null);
    let colorFilterArrayDetection = ref(null);
    let errorLevelAnalysis = ref(null);
    let jpegGhost = ref(null);
    let histogramAnalysis = ref(null);
    let reverseImageSearch = ref(null);
    let noiseMedianInconsistencies = ref(null);
    let currentFunction = ref("default");
    let hasCollapse = ref(false);

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
    let reverseImageSearchConfig = reactive({});
    let noiseMedianInconsistenciesConfig = reactive({
      kernelSize: 3,
    });

    let changeFunction = function (name) {
      if (currentFunction.value != name) {
        let currentConfig = null;
        // race condition?
        if (hasCollapse.value) {
          if (currentFunction.value == "copyMoveDetection") {
            copyMoveDetection.value.click();
          } else if (currentFunction.value == "jpegGhost") {
            jpegGhost.value.click();
          } else if (currentFunction.value == "colorFilterArrayDetection") {
            colorFilterArrayDetection.value.click();
          }
        }

        hasCollapse.value = true;
        currentFunction.value = name;

        if (currentFunction.value == "copyMoveDetection") {
          currentConfig = errorLevelAnalysisConfig;
        } else if (currentFunction.value == "jpegGhost") {
          currentConfig = jpegGhostConfig;
        } else if (currentFunction.value == "colorFilterArrayDetection") {
          currentConfig = histogramAnalysisConfig;
        }

        context.emit("changeFunction", {
          name: currentFunction.value,
          config: currentConfig,
        });
      } else {
        hasCollapse.value = !hasCollapse.value;
      }
    };

    watch(errorLevelAnalysisConfig, () => {
      context.emit("changeFunction", {
        name: currentFunction.value,
        config: errorLevelAnalysisConfig,
      });
    });

    watch(jpegGhostConfig, () => {
      context.emit("changeFunction", {
        name: currentFunction.value,
        config: jpegGhostConfig,
      });
    });

    watch(histogramAnalysisConfig, () => {
      context.emit("changeFunction", {
        name: currentFunction.value,
        config: histogramAnalysisConfig,
      });
    });

    watch(noiseMedianInconsistenciesConfig, () => {
      context.emit("changeFunction", {
        name: currentFunction.value,
        config: noiseMedianInconsistenciesConfig,
      });
    });

    const nmiKernelSizeChange = function () {
      context.emit("onNmiKernelSizeChange");
    };

    const startGuide = function (name) {
      context.emit("onStartGuide", name);
    };

    return {
      copyMoveDetection,
      colorFilterArrayDetection,
      errorLevelAnalysis,
      jpegGhost,
      histogramAnalysis,
      reverseImageSearch,
      noiseMedianInconsistencies,
      currentFunction,
      changeFunction,
      startGuide,
      hasCollapse,
      errorLevelAnalysisConfig,
      jpegGhostConfig,
      histogramAnalysisConfig,
      reverseImageSearchConfig,
      noiseMedianInconsistenciesConfig,
      nmiKernelSizeChange,
    };
  },

  mounted() {
    Array.from(
      document.querySelectorAll('.guide-tooltip[data-bs-toggle="tooltip"]')
    ).forEach((tooltipNode) => new Tooltip(tooltipNode, { trigger: "hover" }));
  },
};
</script>

<style scoped>
.value-label {
  display: block;
  width: 15%;
  text-align: right;
}
</style>
