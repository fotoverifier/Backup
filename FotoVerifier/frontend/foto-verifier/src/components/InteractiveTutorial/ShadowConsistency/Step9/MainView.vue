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
  emits: ["hideHint", "incorrectImage", "nextStep"],

  setup(props, context) {
    let origin = ref(window.location.origin);
    let src = ref(origin.value + "/demo-shadow-consistency/upload");
    let url = ref("");
    let isLoading = ref(true);

    let hideHint = function () {
      context.emit("hideHint");
    };

    let showHint = function () {
      let wn = document.getElementById("browser-iframe").contentWindow;
      wn.postMessage("step-9-show-hint", window.location.origin);
    };

    let iframeLoaded = function () {
      isLoading.value = false;
    };

    let iframeEvent = function (event) {
      if (typeof event.data !== "undefined" && event.data !== null) {
        if (event.data == "step-9-hide-hint") {
          context.emit("hideHint");
        } else if (event.data == "step-9-incorrect-image") {
          context.emit("incorrectImage");
        } else if (event.data == "step-9-correct-image") {
          context.emit("nextStep");
        }
      }
    };

    onMounted(() => {
      window.addEventListener("message", iframeEvent, false);
    });

    return {
      origin,
      hideHint,
      showHint,
      url,
      iframeLoaded,
      isLoading,
      src,
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
