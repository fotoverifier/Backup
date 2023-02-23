<template>
  <h4><b>Requirement</b></h4>

  <p class="text">
    <a href="/image/challenge/multiple-resaved/pic.jpg" target="_blank"
      >This image</a
    >
    has been modified. Can you use <a href="/" target="_blank">ELA</a> to prove
    that?
    <br />
    <b>Challenge idea:</b> Base on
    <a
      href="https://fotoforensics.com/messages.php?read=1435197312116&challenge=1"
      target="_blank"
      >FotoForensics</a
    >
  </p>
  <br />

  <h4><b>Hints</b></h4>

  <p>If you can't solve, let's see some hints.</p>

  <p class="text">
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#hint-1"
      aria-expanded="false"
      aria-controls="hint-1"
    >
      Hint #1
    </button>
  </p>

  <div class="collapse pt-2" id="hint-1">
    <center>
      <ErrorLevelAnalysis
        :imageData="imageData"
        :canvasWidth="canvasWidth"
        :canvasHeight="canvasHeight"
        :jpegQuality="quality"
        :errorScale="scale"
        :key="componentKey"
      />
    </center>
    <div class="card card-body">
      <b>Hint #1:</b> Why almost pixels has dark ELA result? When an image was
      resaved multiple times, ELA result become darker because error level moves
      to near zero. You can try it below.

      <canvas ref="sourceCanvas" style="display: none"></canvas>
      <canvas ref="currentCanvas" style="display: none"></canvas>

      <form>
        <label
          >Resaved Count:
          <span id="resaved-count">{{ resavedCount }}</span></label
        >
        <div class="input-group">
          <button
            type="button"
            class="btn btn-secondary mr-2"
            id="reset"
            @click="reset"
          >
            Reset
          </button>
          <button
            type="button"
            class="btn btn-primary"
            id="resave"
            @click="resave"
          >
            Resave
          </button>
        </div>
      </form>
    </div>
  </div>

  <h4><b>Answer</b></h4>

  <p>
    In case you can't solve it, even after going through all hints, you can try
    to see our answer.
  </p>

  <p class="text">
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#answer"
      aria-expanded="false"
      aria-controls="answer"
    >
      Answer
    </button>
  </p>

  <div class="collapse pt-2" id="answer">
    <div class="card card-body">
      <p class="card-text">
        At first, ELA result give almost pixels dark because the image has been
        resaved many times.
      </p>
      <center>
        <img
          src="/image/challenge/multiple-resaved/answer-1.png"
          width="400"
          height="400"
        />
      </center>
      <br />
      <p class="card-text">
        So we need to decrease quality value, at value 88 there is something
        strange:
      </p>
      <center>
        <img
          src="/image/challenge/multiple-resaved/answer-2.png"
          width="400"
          height="400"
        />
      </center>
      <br />
      <p class="card-text">
        The mask the man is wearing has extremely bright ELA result, while other
        pixels are dark due to multiple resaved. So we can conclude where the
        photo was edited: The mask was added after image was resaved many times.
      </p>
      <br />
    </div>
  </div>

  <h4><b>What you should learn after solving this challenge</b></h4>

  <p class="text">
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#objective"
      aria-expanded="false"
      aria-controls="answer"
    >
      Click to see
    </button>
  </p>

  <div class="collapse pt-2" id="objective">
    <div class="card card-body">
      This challenge shows you the weakness of ELA: If an image was resaved many
      times, the ELA result becomes dark so ELA can't help you this time, and
      you need to try another forensics method.
    </div>
  </div>
</template>

<script>
import ErrorLevelAnalysis from "@/components/MoreTools/ErrorLevelAnalysis.vue";
import { ref, onMounted, watch } from "vue";

export default {
  emits: ["setTitle"],
  setup(props, context) {
    let imageData = ref("");
    let sourceCanvas = ref(null);
    let currentCanvas = ref(null);
    let resavedCount = ref(0);
    let quality = ref(90);
    let scale = ref(80);
    let canvasWidth = ref(window.innerWidth / 2);
    let canvasHeight = ref(window.innerHeight / 2);
    let componentKey = ref(0);

    let updateCurrentCanvas = () => {
      let img = new Image();
      img.src = imageData.value;
      img.onload = function () {
        currentCanvas.value.width = img.width;
        currentCanvas.value.height = img.height;
        let currentCtx = currentCanvas.value.getContext("2d");
        currentCtx.drawImage(img, 0, 0);
      };
    };

    onMounted(() => {
      let img = new Image();
      img.src = "/image/challenge/multiple-resaved/landscape.jpg";
      img.onload = function () {
        sourceCanvas.value.width = img.width;
        sourceCanvas.value.height = img.height;
        let sourceCtx = sourceCanvas.value.getContext("2d");
        sourceCtx.drawImage(img, 0, 0);
        imageData.value = sourceCanvas.value.toDataURL("image/jpeg");
      };
    });

    let resave = function () {
      resavedCount.value++;
      imageData.value = currentCanvas.value.toDataURL(
        "image/jpeg",
        quality.value * 0.01
      );
    };

    let reset = function () {
      resavedCount.value = 0;
      imageData.value = sourceCanvas.value.toDataURL("image/jpeg");
    };

    watch(
      () => imageData.value,
      () => {
        updateCurrentCanvas();
        componentKey.value++;
      }
    );

    context.emit("setTitle", {
      title:
        "Challenge 2: Error Level Analysis with Multiple Compression image",
    });

    return {
      imageData,
      sourceCanvas,
      currentCanvas,
      resavedCount,
      resave,
      reset,
      quality,
      scale,
      canvasWidth,
      canvasHeight,
      componentKey,
    };
  },
  components: {
    ErrorLevelAnalysis,
  },
};
</script>
