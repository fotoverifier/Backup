<template>
  <div class="browser-container">
    <div class="browser-row">
      <div class="browser-column browser-left">
        <span class="browser-dot" style="background: #ed594a"></span>
        &nbsp;
        <span class="browser-dot" style="background: #fdd800"></span>
        &nbsp;
        <span class="browser-dot" style="background: #5ac05a"></span>
      </div>
      <div class="browser-column browser-middle">
        <input type="text" class="form-control" :value="origin" disabled />
      </div>
    </div>
    <div class="browser-content">
      <div class="row pt-4 pb-4" v-if="isLoading">
        <div class="col-sm-12">
          <center>
            <div class="spinner-border text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </center>
        </div>
      </div>
      <center>
        <iframe
          id="browser-iframe"
          class="browser-iframe"
          :src="src"
          width="1366"
          height="768"
          @load="iframeLoaded"
          v-show="!isLoading"
        ></iframe>
      </center>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  emits: ["hideHint", "nextStep"],

  setup(props, context) {
    let step = ref(1);
    let origin = ref(window.location.origin);
    let src = ref(origin.value + "/demo-shadow-consistency/image-information");
    let url = ref("");
    let isLoading = ref(true);
    let cnt = 0;

    let showHint1 = function () {
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-show-hint-1", window.location.origin);
    };

    let showHint4 = function () {
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-show-hint-4", window.location.origin);
    };

    let showHint9 = function () {
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-show-hint-9", window.location.origin);
    };

    let showHint16 = function () {
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-show-hint-16", window.location.origin);
    };

    let showHint17 = function () {
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-show-hint-17", window.location.origin);
    };

    let showHint18 = function () {
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-show-hint-18", window.location.origin);
    };

    let showHint20 = function () {
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-show-hint-20", window.location.origin);
    };

    let moveToStep3 = function () {
      step.value = 3;
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-move-to-step-3", window.location.origin);
    };

    let moveToStep4 = function () {
      step.value = 4;
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-move-to-step-4", window.location.origin);
    };

    let moveToStep8 = function () {
      step.value = 8;
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-move-to-step-8", window.location.origin);
    };

    let moveToStep9 = function () {
      step.value = 9;
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-move-to-step-9", window.location.origin);
    };

    let moveToStep14 = function () {
      step.value = 14;
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-move-to-step-14", window.location.origin);
    };

    let moveToStep15 = function () {
      step.value = 15;
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-move-to-step-15", window.location.origin);
    };

    let moveToStep16 = function () {
      step.value = 16;
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-move-to-step-16", window.location.origin);
    };

    let moveToStep18 = function () {
      step.value = 18;
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-move-to-step-18", window.location.origin);
    };

    let moveToStep20 = function () {
      step.value = 20;
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-10-move-to-step-20", window.location.origin);
    };

    let iframeLoaded = function () {
      cnt++;
      if (cnt == 1) {
        isLoading.value = false;
        setTimeout(() => {
          console.log("reloading");
          document
            .getElementById("browser-iframe")
            .contentWindow.location.reload();
        }, 100);
      } else {
        isLoading.value = false;
      }
    };

    let iframeEvent = function (event) {
      if (typeof event.data !== "undefined" && event.data !== null) {
        if (event.data == "step-10-hide-hint-1") {
          context.emit("hideHint1");
        } else if (event.data == "step-10-move-to-step-2") {
          step.value = 2;
          context.emit("moveToStep2");
        } else if (event.data == "step-10-move-to-step-3") {
          step.value = 3;
          context.emit("moveToStep3");
        } else if (event.data == "step-10-hide-hint-4") {
          context.emit("hideHint4");
        } else if (event.data == "step-10-move-to-step-5") {
          step.value = 5;
          context.emit("moveToStep5");
        } else if (event.data == "step-10-move-to-step-6") {
          step.value = 6;
          context.emit("moveToStep6");
        } else if (event.data == "step-10-move-to-step-7") {
          step.value = 7;
          context.emit("moveToStep7");
        } else if (event.data == "step-10-hide-hint-9") {
          context.emit("hideHint9");
        } else if (event.data == "step-10-move-to-step-10") {
          step.value = 10;
          context.emit("moveToStep10");
        } else if (event.data == "step-10-move-to-step-11") {
          step.value = 11;
          context.emit("moveToStep11");
        } else if (event.data == "step-10-move-to-step-12") {
          step.value = 12;
          context.emit("moveToStep12");
        } else if (event.data == "step-10-move-to-step-13") {
          step.value = 13;
          context.emit("moveToStep13");
        } else if (event.data == "step-10-hide-hint-16") {
          context.emit("hideHint16");
        } else if (event.data == "step-10-move-to-step-17") {
          step.value = 17;
          context.emit("moveToStep17");
        } else if (event.data == "step-10-hide-hint-17") {
          context.emit("hideHint17");
        } else if (event.data == "step-10-hide-hint-18") {
          context.emit("hideHint18");
        } else if (event.data == "step-10-move-to-step-19") {
          step.value = 19;
          context.emit("moveToStep19");
        } else if (event.data == "step-10-hide-hint-20") {
          context.emit("hideHint20");
        } else if (event.data == "step-10-move-to-step-21") {
          step.value = 21;
          context.emit("moveToStep21");
        }
      }
    };

    onMounted(() => {
      window.addEventListener("message", iframeEvent, false);
    });

    return {
      origin,
      showHint1,
      url,
      iframeLoaded,
      isLoading,
      src,
      step,
      moveToStep3,
      moveToStep4,
      showHint4,
      moveToStep8,
      moveToStep9,
      showHint9,
      moveToStep14,
      moveToStep15,
      moveToStep16,
      showHint16,
      showHint17,
      moveToStep18,
      showHint18,
      moveToStep20,
      showHint20,
    };
  },
};
</script>

<style scoped>
.browser-iframe {
  background-color: #e5e5e5;
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

.active-animation {
  background-image: linear-gradient(90deg, #cc217f 50%, transparent 50%),
    linear-gradient(90deg, #cc217f 50%, transparent 50%),
    linear-gradient(0deg, #cc217f 50%, transparent 50%),
    linear-gradient(0deg, #cc217f 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 30px 2px, 30px 2px, 2px 30px, 2px 30px;
  background-position: left top, right bottom, left bottom, right top;
  animation: border-dance 0.5s infinite linear;
}
@keyframes border-dance {
  0% {
    background-position: left top, right bottom, left bottom, right top;
  }
  100% {
    background-position: left 30px top, right 30px bottom, left bottom 30px,
      right top 30px;
  }
}
</style>
