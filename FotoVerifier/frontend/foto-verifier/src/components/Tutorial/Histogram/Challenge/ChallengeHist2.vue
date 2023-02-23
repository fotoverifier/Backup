<template>
  <h4><b>Requirement</b></h4>

  <p class="text">
    Can <a href="/" target="_blank">Histogram Analysis</a> help you to realize
    anything in
    <a href="/image/challenge/hist-2/pic.jpg" target="_blank">this image</a>?
  </p>

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
    <div class="card card-body">
      <b>Hint #1:</b> Check the histograms. Does the trend have anything
      unnormal?
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
        The histograms seem not to have unnormal points. Actually, the image is
        double-compressed with the same original quality.
      </p>
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
      In general, Histogram Analysis can only detect JPEG images with different
      Double JPEG compression qualities.
    </div>
  </div>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "Challenge 2: Histogram Test 2",
    });
  },
};
</script>
