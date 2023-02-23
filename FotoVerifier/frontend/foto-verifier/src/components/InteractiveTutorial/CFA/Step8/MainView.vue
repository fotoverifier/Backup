<template>
  <div class="browser-container" v-if="step == 2">
    <div class="browser-row">
      <div class="browser-column browser-left">
        <span class="browser-dot" style="background: #ed594a"></span>
        &nbsp;
        <span class="browser-dot" style="background: #fdd800"></span>
        &nbsp;
        <span class="browser-dot" style="background: #5ac05a"></span>
      </div>
      <div class="browser-column browser-middle">
        <input
          type="text"
          class="form-control"
          :class="{ 'active-animation': !isLoading && isShowHint }"
          @keyup="handleKeyup"
          @mouseover="hideHint()"
          v-model="url"
        />
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
  emits: ["hideHint", "incorrectURL", "nextStep"],

  setup(props, context) {
    let step = ref(1);
    let origin = ref(window.location.origin);
    let src = ref(origin.value + "/demo-default");
    let isShowHint = ref(true);
    let url = ref("");
    let isLoading = ref(true);

    let hideHint = function () {
      isShowHint.value = false;
      context.emit("hideHint");
    };

    let showHint = function () {
      isShowHint.value = true;
    };

    let handleKeyup = function (event) {
      if (event.key === "Enter" || event.keyCode === 13) {
        if (url.value == origin.value) {
          context.emit("nextStep");
        } else {
          context.emit("incorrectURL");
        }
      }
    };

    let iframeLoaded = function () {
      isLoading.value = false;
    };

    let iframeEvent = function () {
      //Verify App Domain
      // if (event.origin !== "https://www.xyz.com") return;
      /*const childWindow = document.getElementById("bla").contentWindow;
      if (event.source !== childWindow) {
        console.log("none");
        return;
      }
      console.log(event.origin);
      console.log(event.data);
      console.log(event.source);*/
      //console.log(event);
    };
    onMounted(() => {
      window.addEventListener("message", iframeEvent, false);
    });

    let showBrowser = function () {
      step.value = 2;
    };

    return {
      origin,
      isShowHint,
      hideHint,
      showHint,
      handleKeyup,
      url,
      iframeLoaded,
      isLoading,
      src,
      step,
      showBrowser,
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
